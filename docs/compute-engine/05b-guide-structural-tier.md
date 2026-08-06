---
title: The Structural Tier
slug: /compute-engine/guides/structural-tier/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
---

<Intro>
The **structural tier** is the middle ground between a raw parse and a
canonical expression: the tree keeps the shape it was parsed with, but its
operator definitions are resolved, so it has a type and can be transformed.
This page collects the contracts a pipeline built on that tier can rely on.
</Intro>

Most applications never need this page: parse, canonicalize, evaluate. It is
written for consumers that carry an expression through several
transformation passes — an expansion fixpoint, a classifier tuned on parse
shape, an incremental editor — and need to know exactly what survives each
pass and what the engine may change underneath them.

## The Three Tiers

<div className="symbols-table first-column-header" style={{"--first-col-width":"22ch"}}>

|  | raw <br/>`{ form: 'raw' }` | **structural** <br/>`{ form: 'structural' }` | canonical <br/>(default) |
| :--- | :---: | :---: | :---: |
| Parse vocabulary preserved | yes | **yes** | no (rewritten) |
| Operator definitions resolved (bound) | no | **yes** | yes |
| `expr.type` answers | `unknown` | **yes** | yes |
| Usable in `.add()`, `.mul()`, … | no | **yes** | yes |
| `.subs()` / `.map()` shape-preserving | yes | **yes** | no (result re-canonicalizes) |
| Arity and type errors checked | no | **no** | yes |
| Scope processing, binder shadowing | no | **no** | yes |

</div>

**To create a structural expression** use `ce.parse(s, { form: 'structural' })`,
`ce.expr(json, { form: 'structural' })` or
`ce.function(op, ops, { form: 'structural' })`. Note that `ce._fn()` does
**not** accept the option. The legacy spellings `{ canonical: false }` (raw)
and `{ structural: true }` still work at runtime, but are no longer part of
the typed API surface — new code should use `form`.

```ts
const expr = ce.parse('2x - (a+b)', { form: 'structural' });
console.log(expr.json);
// ➔ ["Subtract", ["InvisibleOperator", 2, "x"], ["Delimiter", ["Add", "a", "b"]]]

console.log(expr.isStructural, expr.isCanonical);
// ➔ true false

console.log(expr.type.toString());
// ➔ "broadcastable<number>"

console.log(expr.subs({ a: ce.expr(3) }).json);
// ➔ ["Subtract", ["InvisibleOperator", 2, "x"], ["Delimiter", ["Add", 3, "b"]]]
// still structural: the sugar survived the substitution
```

Structural boxing **preserves** the shape it is given; it does not recover
one. A structural box of an already-canonical tree leaves it canonical
(`Add(a, Negate(b))` stays `Add(a, Negate(b))`) — there is no projection back
from canonical to parse shape. A tree that must stay in parse vocabulary has
to be non-canonical from the parse onward.

:::warning[`.evaluate()` leaves the tier]
`.evaluate()` and `.N()` always answer with a **canonical** value. On a
structural or raw tree they evaluate the expression's canonical form, so
every tier agrees on the value — including binders (`Sum`, `Integrate`, `D`,
a function literal), whose bound variables are declared by canonicalization
and would otherwise be evaluated unbound:

```ts
console.log(ce.parse('\\sum_{n=1}^{3} n', { form: 'structural' }).evaluate());
// ➔ 6        (same as the canonical tree)

console.log(ce.parse('\\sum_{n=1}^{3} n', { form: 'raw' }).evaluate());
// ➔ 6

console.log(ce.parse('\\sum_{n=1}^{3} n').evaluate());
// ➔ 6
```

A bare symbol behaves the same way. A structural or raw symbol is not bound
to a definition, so it is resolved in the current scope before being
evaluated: it answers with its assigned value, not with itself. A symbol with
no value evaluates to itself (as a canonical symbol).

```ts
ce.assign('x', 5);

console.log(ce.box('x', { form: 'raw' }).evaluate());
// ➔ 5       (same as the canonical symbol)

console.log(ce.box('zzz', { form: 'raw' }).evaluate());
// ➔ zzz     (no value: the symbol itself)
```

The receiver itself is not changed — it stays on its tier — but the
**result** is canonical: it is in canonical vocabulary, and it is not a
structural expression. A pipeline that must stay on the structural tier
should not route through `.evaluate()`.
:::

Also note that `.subs()` is not capture-avoiding on **any** tier. If a
substitution reaches into a binder body, avoiding name collisions is the
caller's responsibility.

## Parse Vocabulary vs Canonical Vocabulary

The vocabulary a fresh parse produces and the vocabulary canonicalization
produces differ in a bounded set of ways, listed below.

:::info[Notice guarantee]
The raw parse vocabulary is a **documented interchange vocabulary**, not an
implementation detail: consumers pattern-match these spellings and we will
not respell them silently. Any change to a spelling on this page lands as a
called-out **BREAKING** entry in the CHANGELOG — never slipped into a release
unannounced. Build on the current spellings; watch the changelog line, not
the trees.

The vocabulary is *versioned*, not *frozen*: this is a notice guarantee, not
a promise that it never changes.
:::

### What Differs

1. **Sugar heads are rewritten.** `InvisibleOperator` becomes `Multiply`, a
   function application or `At`, depending on context; `Delimiter` is erased;
   `Subtract` becomes `Add(…, Negate(…))`; `Sequence` is spliced.

   ```ts
   ce.parse('2x', { form: 'raw' }).json;   // ➔ ["InvisibleOperator", 2, "x"]
   ce.parse('2x').json;                         // ➔ ["Multiply", 2, "x"]

   ce.parse('a - b', { form: 'raw' }).json; // ➔ ["Subtract", "a", "b"]
   ce.parse('a - b').json;                       // ➔ ["Add", "a", ["Negate", "b"]]

   ce.parse('(a+b)', { form: 'raw' }).json; // ➔ ["Delimiter", ["Add", "a", "b"]]
   ce.parse('(a+b)').json;                       // ➔ ["Add", "a", "b"]

   ce.parse('f(1,2)', { form: 'raw' }).json;
   // ➔ ["InvisibleOperator", "f", ["Delimiter", ["Sequence", 1, 2], "'(,)'"]]
   ce.parse('f(1,2)').json;                      // ➔ ["f", 1, 2]
   ```

2. **Operand order.** `Add` and `Multiply` sort their operands canonically.

   ```ts
   ce.parse('-2+x', { form: 'raw' }).json;  // ➔ ["Add", ["Negate", 2], "x"]
   ce.parse('-2+x').json;                        // ➔ ["Add", "x", -2]

   ce.parse('\\pi x 2', { form: 'raw' }).json;
   // ➔ ["InvisibleOperator", "Pi", "x", 2]
   ce.parse('\\pi x 2').json;                    // ➔ ["Multiply", 2, "Pi", "x"]
   ```

3. **Flattening.** Associative operators flatten, and the fence goes with
   them.

   ```ts
   ce.parse('(a+b)+c', { form: 'raw' }).json;
   // ➔ ["Add", ["Delimiter", ["Add", "a", "b"]], "c"]
   ce.parse('(a+b)+c').json;                     // ➔ ["Add", "a", "b", "c"]
   ```

4. **Exact literal folding.** Integers, rationals and radicals fold in `Add`
   and `Multiply`. Machine floats, infinities and `NaN` deliberately do not.

   ```ts
   ce.parse('2+x+5', { form: 'raw' }).json; // ➔ ["Add", 2, "x", 5]
   ce.parse('2+x+5').json;                       // ➔ ["Add", "x", 7]
   ```

5. **Generic-symbol folds.** `x/x` becomes `1` and `1^x` becomes `1` at
   canonicalization. This is a documented engine convention, not a bug: the
   operands are gone entirely.

   ```ts
   ce.parse('\\frac{x}{x}', { form: 'raw' }).json; // ➔ ["Divide", "x", "x"]
   ce.parse('\\frac{x}{x}').json;                       // ➔ 1
   ce.parse('1^x').json;                                // ➔ 1
   ```

6. **Literal normalization.** `Negate(2)` becomes `-2`; a literal
   a literal `a + bi` becomes `Complex(a, b)`. The `Complex` fold
   requires **both** parts to be literal — a symbolic imaginary term stays a
   product.

   ```ts
   ce.parse('-2', { form: 'raw' }).json;    // ➔ ["Negate", 2]
   ce.parse('-2').json;                          // ➔ -2

   ce.parse('2+3\\imaginaryI').json;             // ➔ ["Complex", 2, 3]
   ce.parse('\\imaginaryI b').json;              // ➔ ["Multiply", "ImaginaryUnit", "b"]
   ```

7. **Symbol resolution.** Constant symbols resolve at canonicalization, not
   at parse time: on a raw or structural tree `e` is still the symbol `e`.

   ```ts
   ce.parse('e', { form: 'raw' }).json;     // ➔ "e"
   ce.parse('e').json;                           // ➔ "ExponentialE"
   ```

   To ask whether a name *would* resolve to a constant — and to get the
   answer for the current scope chain, so a user redeclaration is respected —
   use `ce.lookupDefinition(name)`. It returns `undefined` for an undeclared
   name and has no auto-declare side effect, so it is safe to call
   speculatively:

   ```ts
   const v = ce.lookupDefinition('i')?.value;
   const isImaginaryUnit = v?.isConstant === true && v.value?.im === 1;
   ```

   Two traps. A symbol-level query cannot see **binder** shadowing (a `\sum`
   over `i` rebinds `i` inside its body), so mask binder-bound names first.
   And the query key is the *post-parse* symbol name: the LaTeX→symbol
   mapping is a parse step, so `\pi` is already the symbol `Pi` on a raw
   tree — `lookupDefinition('pi')` finds nothing.

8. **Binder rewrites.** Scoped operators normalize their bound variables and
   canonicalize their bodies. See [below](#binder-spellings).

### What Does Not Differ

These constructs read the same on both routes, so a walk tuned on parse trees
needs no defensive re-parse for them:

```ts
ce.parse('\\frac{x}{y}', { form: 'raw' }).json; // ➔ ["Divide", "x", "y"]
ce.parse('\\frac{x}{y}').json;                       // ➔ ["Divide", "x", "y"]

ce.parse('a<b<c', { form: 'raw' }).json;        // ➔ ["Less", "a", "b", "c"]
ce.parse('a<b<c').json;                              // ➔ ["Less", "a", "b", "c"]

ce.parse('\\sqrt{x}', { form: 'raw' }).json;    // ➔ ["Sqrt", "x"]
ce.parse('\\sqrt{x}').json;                          // ➔ ["Sqrt", "x"]

ce.parse('x_1', { form: 'raw' }).json;          // ➔ "x_1"
ce.parse('x_1').json;                                // ➔ "x_1"
```

One case to keep in mind rather than delete: the `v_1` → `At(v, 1)`
projection over a declared list happens at **parse** time, so both routes
agree — but that means parse shape is **declaration-sensitive**. The same
source parses differently depending on what is in scope:

```ts
ce.parse('v_1', { form: 'raw' }).json;  // ➔ "v_1"
ce.declare('v', 'list<number>');
ce.parse('v_1', { form: 'raw' }).json;  // ➔ ["At", "v", 1]
```

A walk tuned on parse trees inherits that sensitivity whether or not it ever
touches a canonical tree.

### Binder Spellings

Binder limits are carried as a `Tuple` on the raw and structural routes and
as `Limits` on the canonical route:

```ts
ce.parse('\\sum_{n=1}^{10} n^2', { form: 'structural' }).json;
// ➔ ["Sum", ["Power", "n", 2], ["Tuple", "n", 1, 10]]
ce.parse('\\sum_{n=1}^{10} n^2').json;
// ➔ ["Sum", ["Power", "n", 2], ["Limits", "n", 1, 10]]

ce.parse('\\prod_{k=1}^{5} k', { form: 'structural' }).json;
// ➔ ["Product", "k", ["Tuple", "k", 1, 5]]
ce.parse('\\prod_{k=1}^{5} k').json;
// ➔ ["Product", "k", ["Limits", "k", 1, 5]]
```

A structural `Function` body carries **no `Block` wrapper**; the canonical
form adds one:

```ts
ce.parse('x \\mapsto x^2 + 1', { form: 'structural' }).json;
// ➔ ["Function", ["Add", ["Power", "x", 2], 1], "x"]
ce.parse('x \\mapsto x^2 + 1').json;
// ➔ ["Function", ["Block", ["Add", ["Power", "x", 2], 1]], "x"]
```

`D` **retains** its `Delimiter`; canonicalization erases it:

```ts
ce.parse('\\frac{d}{dx}(x^2+1)', { form: 'structural' }).json;
// ➔ ["D", ["Delimiter", ["Add", ["Power", "x", 2], 1]], "x"]
ce.parse('\\frac{d}{dx}(x^2+1)').json;
// ➔ ["D", ["Add", ["Power", "x", 2], 1], "x"]
```

`Integrate` combines both rewrites — the `Tuple` becomes `Limits` *and* the
integrand is lifted into a `Function`/`Block`:

```ts
ce.parse('\\int_0^1 x^2 dx', { form: 'structural' }).json;
// ➔ ["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 1]]
ce.parse('\\int_0^1 x^2 dx').json;
// ➔ ["Integrate", ["Function", ["Block", ["Power", "x", 2]], "x"],
//                 ["Limits", "x", 0, 1]]
```

## Undeclared Call Heads Bind Vacuously

A structural box of a function expression whose head is **undeclared**
succeeds. There is no error, no auto-declare, and no operator definition:

```ts
const expr = ce.expr(['myHead', 1, 2], { form: 'structural' });

console.log(expr.isValid);              // ➔ true
console.log(expr.errors);               // ➔ []
console.log(expr.operatorDefinition);   // ➔ undefined
console.log(ce.lookupDefinition('myHead')); // ➔ undefined
```

The head is simply not bound — the node is inert. This is the intended
behavior, and it is covered by the notice guarantee above.

The **canonical** route does the opposite: it auto-declares the head as a
`function` with an inferred type, a write to the current lexical scope.

```ts
const ce2 = new ComputeEngine();
ce2.expr(['myHead', 1, 2]);   // canonical

const def = ce2.lookupDefinition('myHead');
console.log(def.value.type.toString());   // ➔ "function"
console.log(def.value.inferredType);      // ➔ true
```

Inert versus declaring is precisely the structural/canonical split. If the
head *is* declared as an operator, the structural box binds it normally:

```ts
ce.expr(['Sin', 1], { form: 'structural' }).operatorDefinition?.name;
// ➔ "Sin"
```

## Bound-Symbol Equality

This section describes the **Structural** tier of comparison — `Same` and
`expr.isSame()`. See
[Comparing Expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions)
for the three tiers and how they differ. This contract is a property of
binder identity, not of value following, so it is **unchanged** by the
equality-tier semantics: the arithmetic and prover tiers do not enter into
it.

**Bound-symbol equality is per-binder-instance.** Each canonicalization of a
binder mints fresh bindings, so the `n` of one `Sum` and the `n` of a
separately built `Sum` are *different variables*, deliberately.

**Compare at, or below, a common root.** Whole-tree comparison handles the
bound occurrences correctly:

```ts
const a = ce.parse('\\sum_{n=1}^{10} n^2');
const b = ce.parse('\\sum_{n=1}^{10} n^2');

console.log(a.isSame(b));          // ➔ true
```

**Detached cross-tree leaf comparison is out of contract.** A bound leaf
lifted out of its tree carries no binder context to be equivalent *under*, so
comparing it against the same-position leaf of another tree is not a
meaningful question — and answers `false`:

```ts
console.log(a.op1.op1.isSame(b.op1.op1));   // ➔ false — out of contract
```

Comparing roots first is not a workaround; it is the sanctioned pattern.

**Reflexivity is guaranteed.** The identical object always compares equal to
itself, bound or not:

```ts
const leaf = a.op1.op1;
console.log(leaf.isSame(leaf));    // ➔ true
```

:::info[Not full alpha-equivalence]
`isSame()` compares occurrences under a common binder by *name*, so it is
alpha-*aware* — fresh binding identity does not defeat it. It is not
alpha-*equivalent*: renaming a bound variable changes the answer.

```ts
ce.parse('\\sum_{n=1}^{10} n^2').isSame(ce.parse('\\sum_{m=1}^{10} m^2'));
// ➔ false
```
:::

## Error Attachment and Incremental Validity

A pipeline that edits a tree in place wants to re-check only what it changed.
Two properties bound what that is allowed to mean.

### An Error Attaches at the Nearest Constraining Ancestor

An `incompatible-type` error attaches at the nearest ancestor whose signature
or canonical handler actually **constrains** the propagated type. That is not
"the immediate parent": broadcasting and type-transparent operators pass the
change through without erroring, so the attachment point can be arbitrarily
far above the edit.

```ts
const mk = (leaf) =>
  ce.expr(['Sum', ['Power', 'n', 2], ['Limits', 'n', 1, ['Sin', ['Sqrt', leaf]]]]);

console.log(mk(4).isValid);              // ➔ true

console.log(mk(['List', 1, 2]).isValid); // ➔ false
console.log(mk(['List', 1, 2]).json);
// ➔ ["Sum", ["Power", "n", 2],
//     ["Limits", "n", 1,
//       ["Error", ["ErrorCode", "'incompatible-type'", "'number'", "'vector<2>'"]]]]
```

The edit is at the operand of `Sqrt`, three levels down. Both the edited
subtree and its parent probe as valid on their own —

```ts
console.log(ce.expr(['Sqrt', ['List', 1, 2]]).isValid);          // ➔ true
console.log(ce.expr(['Sin', ['Sqrt', ['List', 1, 2]]]).isValid); // ➔ true
```

— and the error materializes only at the `Sum` bound, the first ancestor that
requires a `number`.

### `isValid` Is Not a Complete Oracle

A scalar→collection change frequently produces **no box-time error at all**.
Broadcastable lift at applications defers collection mismatches to runtime by
design:

```ts
ce.declare('g', '(string) -> number');

console.log(ce.expr(['g', 42]).isValid);
// ➔ false  — ["g", ["Error", ["ErrorCode", "'incompatible-type'", "'string'", "'finite_integer'"]]]

console.log(ce.expr(['g', ['List', 1, 2]]).isValid);
// ➔ true   — the lift makes it a broadcast application
console.log(ce.expr(['g', ['List', 1, 2]]).type.toString());
// ➔ "vector<2>"
```

Only operators that constrain collections inside their canonical handlers —
`Sum` bounds, above — fire at box time. Part of this class surfaces only at
evaluate or compile time. Do not treat `.isValid` as a complete validity
oracle for a type-changing edit.

### The Sound Incremental Rule

Compare the changed subtree's **type** before and after the edit.

- **Type unchanged** ⇒ no ancestor's validity can change. Probing the subtree
  alone suffices.
- **Type changed** ⇒ re-probe from the root, or walk upward re-boxing one
  ancestor at a time and stop as soon as a node's recomputed type equals its
  pre-edit type.

```ts
ce.declare('k', '(number) -> number');

ce.expr(['k', 'x']).type.toString();            // ➔ "number"
ce.expr(['k', ['List', 1, 2]]).type.toString(); // ➔ "vector<2>"
// type changed ⇒ ancestors must be re-probed
```

Validity itself is compositional, and `Error` nodes attach at the offending
operator, so a subtree probe (`ce.expr(changedSubtreeJson).isValid`, then
discard the tree) costs work proportional to the change rather than to the
whole expression. Note that a canonical probe **writes to scope** — it
auto-declares undeclared heads and free symbols. Contain those writes with a
per-call scope (below), or with `ce.pushScope()`/`ce.popScope()`.

## Per-Call Scope Control

:::warning[Unreleased]
The API described in this section is **not yet released**. It is documented
here as a contract; the spellings are subject to the notice guarantee only
once it ships. Check the CHANGELOG for the release that carries it.
:::

Canonical parsing and boxing write to the engine's current lexical scope:
free symbols are declared by usage inference, undeclared call heads are
auto-declared, the subscript fold resolves names, and an `Assign` left-hand
side is pre-declared. A consumer parsing untrusted or out-of-order input
needs to contain those writes.

### The `scope` Option

```ts
ce.parse(latex, { scope });
ce.expr(json,   { scope });
```

When a `scope` is supplied, the parse or box runs with it as the current
lexical scope. Lookups walk `scope → parents`, and **all auto-declares and
inference land rooted at the supplied scope**. Discarding the scope discards
the writes.

:::warning[Behavior change]
`ce.expr`'s existing `scope` option steers *lookup only* today —
auto-declares still land in the engine's current scope. Receiving the writes
is a semantic change to a shipped option, and lands as a called-out BREAKING
CHANGELOG entry.
:::

### `ce.createScope()`

There is deliberately no separate `bindings` option: the declarations table
is the *scope's initializer*, so `scope` stays the single per-call option and
no option-interaction rules exist.

```ts
ce.createScope(
  bindings?: Record<string, Type | TypeString | BoxedDefinition>,
  parent?: Scope
): InspectableScope;

const scope = ce.createScope({ h: 'function', p: 'tuple<3>' });
const expr = ce.parse(row, { scope });
```

`parent` defaults to the engine's current lexical scope **at call time**;
callers with ordering discipline should pass their document scope explicitly.
Each entry is declared into the fresh scope, shadowing outer declarations
innermost-wins. Reusing one scope across several calls is supported and
useful — parsing every row of a document into the same scope accumulates the
harvest across rows.

With the caller supplying every free name, a parse becomes a function of
(latex, dictionary, declarations) plus the engine's standard library.

**`BoxedDefinition` initializer values.** A harvested definition re-installs
the **same definition object**, not a fresh holder: binding identity and
write-version continuity are preserved, so seeding pass *N+1* from pass *N*'s
harvest keeps write-version-keyed caches warm by construction. Two
constraints: definitions are engine-bound, so this works within one engine
only; and installing one definition in two live scopes makes it **shared
mutable state** — a type narrowing through either scope is visible in both.
That aliasing is the intended semantics for sequential pass-seeding, and is
documented rather than prevented.

### Reading Back What a Parse Declared

`createScope()` returns an `InspectableScope` — structurally a `Scope`,
assignable anywhere a `Scope` is accepted, plus a read surface. A scope's
content is opaque by design (`Scope.bindings` is publicly
`Map<string, unknown>`, holding internal records whose shape is not API), so
these methods are the supported decode.

```ts
interface InspectableScope extends Scope {
  declarations(): ReadonlyArray<{
    name: string;
    type: BoxedType;
    inferred: boolean;
    def: BoxedDefinition;
  }>;

  narrowings(): ReadonlyArray<{
    name: string;
    from: BoxedType;
    to: BoxedType;
    def: BoxedDefinition;
  }>;

  dispose(): void;
}
```

`declarations()` reports the scope's own bindings — the initializer's entries
with their post-inference types, alongside anything auto-declared during the
call. `inferred` is true when the type was auto-declared or inferred from
usage rather than stated by the caller; an initializer entry declared with an
explicit type reports `false` even if inference later narrowed it. For an
operator definition, `type` is its signature. Types are answered as
`BoxedType` — the same boxed form as `expr.type` — so `entry.type.toString()`
is the canonical type spelling and `entry.type.matches(…)` works directly.
Both listings are sorted **lexicographically by name**, deterministically and
independently of the order in which declares interleaved; a fingerprint over
`[name, type.toString()]` pairs is stable.

```ts
const scope = ce.createScope(heads);
const expr = ce.parse(row, { scope });
const harvested = scope.declarations();
// … read inferred parameter types; drop `scope` when done
```

One known boundary: the engine's interned common symbols (`Pi`, `e`, `i`,
`True`, …) resolve ahead of the lexical scope chain, so a binding for one of
those names is recorded in `declarations()` but does not shadow the constant
during boxing — the same behavior as `ce.declare` of the same name.

Callers that want no harvest simply drop the scope reference; there is no
separate discard path. A caller-owned scope is never pushed through the
engine's scope-discard path, so its definitions are **not** auto-disposed:
holding a harvested definition after the parse, or after dropping the scope,
is supported.

`dispose()` is a deterministic release of the event subscriptions held by
constant- and dynamic-valued definitions. It is idempotent, and definitions
stay data-readable afterwards; re-installing a **disposed** definition is out
of contract.

:::warning[Dispose between passes, not mid-pass]
`dispose()` bumps each definition's write version once. Consumers whose
caches are keyed on write version must call it *between* passes.
:::

A hand-rolled `{ parent, bindings }` object literal still satisfies `Scope`
and works as the `scope` option, but only `createScope()` products are
inspectable.

### Known Residual: Outer-Scope Narrowing

An ephemeral scope contains new *declarations*; it does not contain
*narrowing* of declarations that already exist. Type inference during a
contained parse can still narrow a symbol declared in an **outer** scope.

That residual is observable rather than silent: `narrowings()` reports every
outer definition the contained parse narrowed, with its before and after
type. A caller that needs containment rather than observation can compare or
restore from that listing.
