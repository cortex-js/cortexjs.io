---
title: Custom Functions and Symbols
slug: /compute-engine/guides/augmenting/
---

The [MathJSON Standard Library](/compute-engine/standard-library/) is a
collection of definitions for **symbols** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own symbols.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When a symbol such as `Pi` or `Sin` is encountered in an expression, the 
Compute Engine will look up its definition in the set of known 
symbols, including the Standard Library.

### Automatic Declaration

If a matching definition is found, it will be bound to the symbol and 
used later to evaluate the expression.

If no definition is found, an automatic declaration will be made of the
symbol with a type `unknown` or a more specific type if the context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the symbol, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` method.

### Declarations are Scoped

The declaration of a symbol is done within a **lexical scope**. A scope 
is a hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
console.log(ce.parse("m").value);
// ➔ 42
```

**Note**: the assignment expression must be evaluated to take effect.

To define a new function $f$ that multiplies its argument by $2$, use
the following LaTeX expression:

```js
ce.parse("f(x) := 2x").evaluate();
console.log(ce.parse("f(3)").evaluate());
// ➔ 6
```


The `\mapsto` operator is an alternative syntax to define a function:

```js
ce.parse("f := x \\mapsto 2x").evaluate();
console.log(ce.parse("f(3)").evaluate());
// ➔ 6
```

**To define multiletter symbols**, use the `\operatorname{}` command:

```js
console.log(ce.parse('\\operatorname{double}(x) := 2x').evaluate());
console.log(ce.parse('\\operatorname{double}(3)').evaluate());
// ➔ 6
```

**Note**: you can also use the `\mathrm{}` or `\mathit{}` commands to wrap
multiletter symbols.

The LaTeX identifiers are mapped to MathJSON symbols. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON symbol `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## When Is the Value Captured?

An assignment evaluates its right-hand side **eagerly**, when the assignment
itself is evaluated. Any symbol that has a value at that moment is replaced by
its value, permanently:

```js
ce.parse("p := 1").evaluate();
ce.parse("a := p + 5").evaluate(); // a is 6: the value of p was captured
ce.parse("p := 2").evaluate();     // changing p has no effect on a
console.log(ce.parse("a").evaluate());
// ➔ 6
```

A symbol that has **no value** at that moment is an unknown: it remains in the
stored value as a symbol. The value of `a` below is the expression $p + 5$,
and evaluating `a` evaluates that expression — so `p` resolves to whatever its
value is **at evaluation time**:

```js
ce.parse("a := p + 5").evaluate(); // p is unknown: a is the expression p + 5
ce.parse("p := 2").evaluate();
console.log(ce.parse("a").evaluate());
// ➔ 7
```

The stored value itself never changes; what changes is the result of
evaluating it. This is the usual convention in computer algebra systems (it
matches `Set`, i.e. `=`, in Mathematica): defining a symbol in terms of an
unknown means the symbol's value _is_ that symbolic expression. There is no
way to "snapshot" an unknown other than as the symbol itself.

**Assigning a symbol to another symbol captures its current value — it does
not create an alias.**

```js
ce.parse("a := p + 5").evaluate();
ce.parse("b := a").evaluate();   // b is the expression p + 5, not a reference to a
ce.parse("p := 1").evaluate();
ce.parse("a := 100").evaluate(); // no effect on b
console.log(ce.parse("b").evaluate());
// ➔ 6
```

**Self-referential and mutually referential values are allowed.** Because
assignment is eager, a cycle can end up baked into a stored value: evaluating
the right-hand side of `q := p + 1` when `p` is already `q + 1` stores the
self-referential expression $q + 2$ as the value of `q`. Evaluating a symbol
whose value refers back to itself — directly or through other symbols —
returns the stored expression rather than recursing:

```js
ce.parse("s := s + 1").evaluate();
console.log(ce.parse("s").evaluate());
// ➔ s + 1
```

**To store an expression as inert data**, without capturing or resolving
anything, wrap it in `Hold`: the value of the symbol is then the held
expression itself, which stays unchanged under evaluation.

```js
ce.assign("a", ce.box(["Hold", ["Add", "p", 5]]));
ce.parse("p := 2").evaluate();
console.log(ce.parse("a").evaluate());
// ➔ Hold(p + 5)
```

**To resolve a held expression**, apply `ReleaseHold`, which removes one
layer of `Hold` and evaluates the result:

```js
console.log(ce.box(["ReleaseHold", "a"]).evaluate());
// ➔ 7
```

## Explicit Declarations

**To have more control over the definition of a symbol** use
the `ce.declare()` method.

When declaring a symbol, you can specify the type of the symbol, its value
and other properties.

```js
// Declaring a symbol "m"
ce.declare("m",  "integer");

// Declaring a function "f"
ce.declare("f", {
  signature: "(number) -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Declaring a Symbol

**To declare a symbol** use the `ce.declare()` method with the name of the
symbol as the first argument and a type as the second argument.

```js
ce.declare("n", "integer");
```

<ReadMore path="/compute-engine/guides/types" >The type specifies the 
valid values of the symbol. For example, `boolean`, `integer`, `rational`, `function`, `string`, etc. Learn more about **types**.<Icon name="chevron-right-bold" /></ReadMore>

Alternatively, you can provide an object literal with the additional properties
`value`, `type`, `isConstant`, and more.

```js
ce.declare("m", {
  type: "integer",
  value: 42,
});
```

If you do not provide a `type` property for a symbol, the type will be
inferred from the value of the symbol. If no type and no value are
provided, the type of the symbol will be `unknown`.


As a shorthand, a symbol can be declared by assigning it a value using `ce.assign()`:

```js
ce.assign("m", 42);
```

If the symbol was not previously defined, this is equivalent to:

```js
ce.declare("m", { value: 42 });
```

Alternatively, you can set the value of a symbol using the `value` property:

```js
ce.expr("m").value = 42;
```

**To prevent the value of a symbol from being changed**, set the `isConstant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  isConstant: true,
});
```


### Declaring a Function

**To declare a function**, associate an `evaluate` handler, which 
is the body of the function, with a symbol.

```js
ce.declare("double", { 
  evaluate: ce.parse("x \\mapsto 2x") 
});
```

:::caution[Caution]
The first argument of `declare()` is a MathJSON symbol, not a LaTeX command.
For example, use `double` instead of `\operatorname{double}`.
:::

The evaluate handler can be either a MathJSON expression as above or 
a JavaScript function.

```js
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

The signature of the `evaluate` handler is `(args[], options)`, where:

- `args`: an array of the arguments that have been applied to the function. Each
  argument is a expression. The array may be empty if there are no
  arguments.
- `options`: an object literal which includes an `engine` property that is the
  Compute Engine instance that is evaluating the expression, a `numericApproximation` property that is true if the result should be a numeric approximation, and an `expression` property that is the expression being evaluated.

Since `args` is an array, you can use destructuring to get the arguments:

```js
ce.declare("double", { evaluate: (args) => args[0].mul(2) });

// or
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

### The `expression` option

The `expression` option is the canonical expression node being evaluated. Its
operands (`expression.ops`, `expression.op1`, ...) are the **raw** arguments:
canonical and bound, but not yet evaluated. The `args` array, by contrast,
holds the **evaluated** arguments — and when `numericApproximation` is true,
those have already been turned into floating point numbers. When your handler
needs to know something about an argument that evaluation destroys — above all
whether it was *exact* — `expression` is where to look. Treat it as read-only.

The `Power` operator uses it to pick the right branch for a negative base. The
convention is that a rational exponent `p/q` in lowest terms with an **odd**
`q` has a real value — `(-8)^(2/3) = 4` — while everything else takes the
principal complex value. Under `.N()` the exponent reaches the handler as a
double, from which `p/q` can only be guessed back; reading it from
`expression.op2` instead keeps the exact terms, so `.N()`, the type and the
compiled code all decide the same branch.

`expression` is optional: a handler called outside the evaluation driver may
not receive one, so guard for `undefined` and fall back to what `args` tells
you. The operand accessors `op1`/`op2`/`ops` and the number properties such as
`isExact` live on narrowed interfaces, so reach them through the `isFunction()`
and `isNumber()` guards — the same narrowing the `Power` handler uses.

**`expression.ops[i]` is not always the provenance of `args[i]`.** The
evaluated arguments are produced by a pass that reindexes them: it flattens an
**associative** operator (`f(a, f(b, c))` arrives as three arguments, one more
than the node has), it unwraps `ReleaseHold` (so `expression.ops[i]` is the
wrapper rather than what was evaluated), and it drops an argument whose
evaluation yields nothing. The positional correspondence holds only for a
non-associative operator with no `ReleaseHold` and no dropped argument. If your
handler indexes into `expression.ops`, treat
`expression.ops.length !== args.length` as "no provenance available" and fall
back.

**On a `lazy: true` operator the contrast does not exist**: held operands are
passed through untouched, so `args` is raw and held as well. Such a handler
must canonicalize each held operand it consumes — on the `ce.box()` and
`ce.parse()` routes the held operands are not even canonical.

```js
import { isFunction, isNumber } from "@cortex-js/compute-engine";

ce.declare("IsExactArgument", {
  signature: "(number) -> boolean",
  evaluate: ([x], { expression, engine }) => {
    // `x` may have been numericized; the raw operand never is.
    const raw =
      expression !== undefined && isFunction(expression) ? expression.op1 : x;
    return isNumber(raw) && raw.isExact ? engine.True : engine.False;
  },
});

ce.box(["IsExactArgument", ["Rational", 1, 3]]).N();  // → True
ce.box(["IsExactArgument", 0.3333]).N();              // → False
```

In addition to the `evaluate` handler the function definition can include
a `signature` type that describes the arguments and return value of the
function.

```js
ce.declare("double", {
  signature: "(number) -> number",
  description: "Multiply a number by two",
  keywords: ["twice", "doubling"],
  evaluate: ([x]) => x.mul(2),
});
```

The optional `description` and `keywords` properties make a definition easier
to discover with `ce.searchDefinitions()`. The search includes definition
names, descriptions, synonyms, keywords, and associated LaTeX commands:

```js
ce.searchDefinitions("average");
// ➔ [{ id: "Mean", kind: "function" }, ...]

ce.searchDefinitions("doubling", { limit: 5 });
// ➔ [{ id: "double", kind: "function" }]
```

The optional `limit` setting limits the number of results and defaults to `10`.
Pass a returned `id` to `ce.lookupDefinition(id)` to inspect the complete
definition.

See `FunctionDefinition` for more details on the other handlers and
properties that can be provided when defining a function.

### Declaring the Effects of a Function

If your function does something besides returning a value — draws a random
number, writes a symbol, calls the network, prints — say so. The Compute Engine
uses that information to decide what it may cache, share or re-evaluate, and a
function that quietly lies about it will produce stale results.

**To declare effects**, use the `effects` property, an array of labels (or the
string `'any'` for "unknown effects"):

```js
ce.assign("lastId", 0);

ce.declare("nextId", {
  signature: "() -> integer",
  effects: ["scope"],
  evaluate: (_ops, { engine }) => {
    const n = engine.box("lastId").evaluate().re + 1;
    engine.assign("lastId", n);
    return engine.number(n);
  },
});

ce.lookupDefinition("nextId").operator.signature.toString();
// ➔ "() scope -> integer"

ce.box(["nextId"]).evaluate();  // ➔ 1
ce.box(["nextId"]).evaluate();  // ➔ 2
```

Equivalently, write the effects directly in the signature string, in the slot
between the argument list and the arrow:

```js
ce.declare("now", {
  signature: "() time -> number",
  evaluate: (_ops, { engine }) => engine.number(Date.now()),
});

ce.box(["now"]).isPure;
// ➔ false
```

The nine labels and the `any` and `pure` keywords are described in
[Effect Specifiers](/compute-engine/guides/types/#effect-specifiers).

The older `pure` and `drawsRandom` flags are still accepted as shorthand —
`drawsRandom: true` is `effects: ["random"]`, and a bare `pure: false` means
`effects: 'any'` — and both are now *derived* from the effect set rather than
stored separately. Declarations that contradict themselves are rejected at
registration rather than resolved silently:

```js
ce.declare("bad", { signature: "(number) -> number", pure: true, drawsRandom: true });
// ➔ throws: the 'pure' and 'drawsRandom' flags are contradictory

ce.declare("bad", { signature: "(number) random -> number", pure: true });
// ➔ throws: the declared effects and the 'pure'/'drawsRandom' flags disagree
```

For a function defined by a body rather than a JavaScript handler, effects are
**inferred** from the body unless you state them. Stating them makes them a
contract: every body later assigned to that symbol must stay within the
declared set, or the assignment fails with an `incompatible-type` error. See
[Inferred and Declared Effects](/compute-engine/guides/types/#inferred-and-declared-effects).

**To require an effect-free argument**, give the parameter a function signature
with a bare arrow — `signature: "((any) -> number, real, real) -> real"` says
"the first argument must be a pure callback", and it is checked when the
operator is applied.

Alternatively, an `evaluate` handler can inspect its operands at run time and
decline. Which property to read depends on what the handler will do with the
operand — the difference between *invoking* a value and *evaluating* an
expression:

- **A callback the handler will invoke**: read `op.type.effects`, the latent
  set on the operand's arrow. It resolves through symbol bindings, so a symbol
  bound to a drawing function reports `["random"]`. The value is `undefined`
  (no effects), `[]` (declared pure), `'any'` (unknown), or the labels.

```js
ce.declare("sampleWith", {
  signature: "(function, integer) -> number",
  evaluate: ([f, n], { engine }) => {
    const latent = f.type.effects;
    if (latent === "any" || (latent !== undefined && latent.length > 0))
      return engine.error([
        "incompatible-type",
        "a pure callback",
        `a callback with ${latent === "any" ? "unknown" : latent} effects`,
      ]);
    let sum = 0;
    for (let i = 1; i <= n.re; i++)
      sum += engine.function("Apply", [f, i]).N().re;
    return engine.number(sum);
  },
});

ce.box(["sampleWith", ["Function", ["Multiply", "x", 2], "x"], 3]).evaluate();
// ➔ 12

ce.box(["sampleWith", ["Function", ["Random"], "x"], 3]).evaluate();
// ➔ ["Error", ["ErrorCode", "'incompatible-type'", "'a pure callback'",
//                 "'a callback with random effects'"]]
```

- **A held expression the handler will evaluate**: read `expr.effects`, the
  effects of evaluating it. (`expr.isPure` is the boolean summary of the same
  answer; `effects` says *which*, so the error message can name them.)

```js
ce.declare("assertPure", {
  signature: "(any) -> any",
  lazy: true,
  evaluate: ([body], { engine }) => {
    const effects = body.canonical.effects;
    if (effects === undefined) return body.canonical.evaluate();
    return engine.error([
      "incompatible-type",
      "a pure operand",
      `an operand with ${effects === "any" ? "unknown" : effects} effects`,
    ]);
  },
});

ce.box(["assertPure", ["Add", 1, 2]]).evaluate();
// ➔ 3

ce.box(["assertPure", ["Assign", "q", 1]]).evaluate();
// ➔ ["Error", ["ErrorCode", "'incompatible-type'", "'a pure operand'",
//                 "'an operand with scope effects'"]]
```

### Declaring an Operator that Binds a Variable

Some operators own a **bound variable**: the `k` of a summation, the `x` of a
derivative or an integral. A bound variable is not an ordinary argument — it
must be a *new* variable belonging to the operator, shadowing any same-named
symbol outside it, and it must stay symbolic even if a symbol of the same name
has a value.

**To declare a binder**, give the `scoped` property a **binding-site
selector** instead of `true`. The selector tells the engine which operands are
binding sites; the engine then declares those variables in the operator's own
scope before your operands are canonicalized, and makes every occurrence in
the other operands refer to that binding — consistently across the LaTeX,
MathJSON, and `ce.function()` routes.

The prebuilt selectors cover the common shapes:

- `operandSites(...indices)` — the operands at these positions are bare
  bound-variable symbols (like `Series`' expansion variable).
- `operandsFrom(first)` — every operand from position `first` on is a bound
  variable (like `D`'s variadic differentiation variables).
- `indexingSetSites(first)` — the first element of each `Element`- or
  `Limits`-shaped operand from position `first` on is a bound variable (like
  `Sum`, `Product`, or a comprehension: `["Element", "k", collection]`).
- `limitsIndexSites(op)` — the index inside the single `Limits` operand at
  position `op`.

For example, an operator that computes the maximum of an expression over an
indexing set:

```js
import { ComputeEngine, indexingSetSites } from "@cortex-js/compute-engine";

const ce = new ComputeEngine();

ce.declare("MaxOver", {
  lazy: true,
  scoped: indexingSetSites(1),
  signature: "(expression, expression) -> number",
  evaluate: (ops, { engine }) => {
    // A lazy operator receives its operands unevaluated: canonicalize
    // the ones you consume.
    const body = ops[0].canonical;
    const elem = ops[1].canonical; // Element(k, collection)
    const k = elem.op1.symbol;
    const coll = elem.op2.evaluate();
    let best;
    for (const v of coll.each()) {
      const val = body.subs({ [k]: v }).evaluate().re;
      if (best === undefined || val > best) best = val;
    }
    return best === undefined ? undefined : engine.number(best);
  },
});
```

The engine guarantees the binding behavior without further work in the
handler. Even with a same-named global that has a value, the bound variable is
the operator's own:

```js
ce.parse("k := 100").evaluate();

const e = ce.box([
  "MaxOver",
  ["Subtract", ["Multiply", "k", 6], ["Power", "k", 2]],
  ["Element", "k", ["List", 1, 2, 3, 4, 5]],
]);
console.log(e.evaluate());
// ➔ 9        (max of 6k - k² over {1…5}, at k = 3 — not affected by k := 100)
console.log(ce.parse("k").evaluate());
// ➔ 100      (the global k is untouched)
```

A few notes:

- `scoped: true` (without a selector) still means "this operator has a scope,
  but no syntactic bound variables" — appropriate for `Block`-like operators
  whose scope holds declarations.
- With multiple indexing clauses, **later clauses see earlier bindings**: a
  collection expression in clause 2 may reference the index of clause 1, and a
  collection in clause 1 that mentions the *name* of clause 2's index refers
  to the enclosing scope, not the later clause.
- A parameter or index named after a library constant (`Pi`, `e`, `i`) is
  bound like any other variable inside the operator; the constant is
  unaffected outside it.

**To define a function without specifying a body for it**, specify
the signature of the function as the second argument of `ce.declare()` or
use the `"function"` type.

```js
ce.declare("double", "function");
```



Functions that do not have an evaluate handler or a function literal as a 
value remain unchanged when evaluated.

You can set the body of the function later using `ce.assign()`:


When using `ce.assign()` to define a function, the value can be a JavaScript
function, a MathJSON expression or a LaTeX expression.

```js
ce.assign("double", ([x]) => x.mul(2));

ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);

ce.assign("double",ce.parse("x \\mapsto 2x"));
```

If the function literal declares the types of its parameters (and, optionally,
its return value), the assigned function is given that typed signature, and in
strict mode its arguments are checked at each call:

```js
ce.assign("double", ["Function",
  ["Typed", ["Multiply", "x", 2], "'integer'"],
  ["Typed", "x", "'integer'"]]);
// double now has the signature (x: integer) -> integer
```

A function assignment may refer to the function being defined; a separate
declaration is not required for recursion:

```js
ce.parse("factorial(n) := n \\cdot factorial(n-1)").evaluate();
```

Numeric evaluation also continues through user-defined functions. For example,
after `f(x) := x/3`, `f(2).evaluate()` is the exact value `2/3`, while
`f(2).N()` is its numeric approximation. The approximation is evaluated in the
function's own lexical scope.


<ReadMore path="/compute-engine/reference/functions/" >
Learn more about the standard operator to manipulate **functions**. <Icon name="chevron-right-bold" />
</ReadMore>

### Declaring a Sequence with Subscript Evaluation

Mathematical sequences like Fibonacci numbers ($F_n$), indexed coefficients
($a_n$), or matrix elements ($M_{i,j}$) are commonly written using subscript
notation. You can define custom evaluation logic for subscripted symbols using
the `subscriptEvaluate` handler.

```js
// Define a sequence of squares: S_n = n²
ce.declare("S", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(n * n);
  },
});

ce.parse("S_{5}").evaluate();   // → 25
ce.parse("S_3").evaluate();     // → 9
ce.parse("S_n").evaluate();     // → stays as Subscript(S, n)
```

The `subscriptEvaluate` handler receives:
- `subscript`: the subscript expression (already evaluated)
- `options`: an object with `engine` (the ComputeEngine) and `numericApproximation`
  (true when called from `.N()`)

**Return `undefined`** to keep the expression symbolic. This is useful when the
subscript contains unknowns or is outside the valid range.

```js
// Fibonacci sequence with memoization
const fibMemo = new Map();
const fib = (n) => {
  if (n <= 1) return n;
  if (fibMemo.has(n)) return fibMemo.get(n);
  const result = fib(n - 1) + fib(n - 2);
  fibMemo.set(n, result);
  return result;
};

ce.declare("F", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(fib(n));
  },
});

ce.parse("F_{10}").evaluate();  // → 55
ce.parse("F_n").evaluate();     // → Subscript(F, n) - stays symbolic
```

**Multi-index subscripts** (like matrix elements) receive the subscript as a
`Tuple` expression:

```js
import { isFunction } from '@cortex-js/compute-engine';

const matrix = [[1,2,3], [4,5,6], [7,8,9]];

ce.declare("M", {
  subscriptEvaluate: (subscript, { engine }) => {
    if (isFunction(subscript, "Tuple")) {
      const [i, j] = subscript.ops;
      const row = matrix[i.re - 1];  // 1-indexed
      if (row && row[j.re - 1] !== undefined) {
        return engine.number(row[j.re - 1]);
      }
    }
    return undefined;
  },
});

ce.parse("M_{2,3}").evaluate();  // → 6
```

Subscripted expressions with `subscriptEvaluate` have type `number` and can be
used in arithmetic:

```js
ce.parse("S_{5} + S_{3}").evaluate();  // → 34 (25 + 9)
ce.parse("2 * F_{10}").evaluate();     // → 110 (2 × 55)
```

### Declarative Sequence Definitions

For common mathematical sequences defined by recurrence relations, the
`declareSequence()` method provides a simpler declarative API:

```js
// Fibonacci sequence: F_n = F_{n-1} + F_{n-2}, with F_0 = 0, F_1 = 1
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

ce.parse('F_{10}').evaluate();  // → 55
ce.parse('F_{20}').evaluate();  // → 6765
```

The `SequenceDefinition` object accepts:

| Property | Type | Description |
|----------|------|-------------|
| `base` | `Record<number, number \| Expression>` | **Required.** Base cases as index → value mapping |
| `recurrence` | `string \| Expression` | **Required.** Recurrence relation (LaTeX string or expression) |
| `variable` | `string` | Index variable name (default: `'n'`) |
| `memoize` | `boolean` | Cache computed values (default: `true`) |
| `domain` | `{ min?: number, max?: number }` | Valid index range |

**Examples:**

```js
// Arithmetic sequence: a_n = a_{n-1} + 2
ce.declareSequence('A', {
  base: { 0: 1 },
  recurrence: 'A_{n-1} + 2',
});
ce.parse('A_{5}').evaluate();  // → 11

// Factorial via recurrence: n! = n × (n-1)!
ce.declareSequence('H', {
  base: { 0: 1 },
  recurrence: 'n \\cdot H_{n-1}',
});
ce.parse('H_{5}').evaluate();  // → 120

// Triangular numbers: T_n = T_{n-1} + n
ce.declareSequence('T', {
  base: { 0: 0 },
  recurrence: 'T_{n-1} + n',
});
ce.parse('T_{5}').evaluate();  // → 15

// Using a custom index variable
ce.declareSequence('W', {
  variable: 'k',
  base: { 0: 1 },
  recurrence: 'W_{k-1} + k',
});
ce.parse('W_{5}').evaluate();  // → 16

// With domain constraints (only valid for n ≥ 1)
ce.declareSequence('X', {
  base: { 1: 1 },
  recurrence: 'X_{n-1} + 1',
  domain: { min: 1 },
});
ce.parse('X_{5}').evaluate();  // → 5
ce.parse('X_{0}').evaluate();  // → stays symbolic (outside domain)
```

**Symbolic behavior:** When the subscript is symbolic or non-integer, the
expression stays symbolic:

```js
ce.parse('F_k').evaluate();     // → Subscript(F, k) - stays symbolic
ce.parse('F_{1.5}').evaluate(); // → Subscript(F, 1.5) - stays symbolic
```

**Memoization:** By default, computed values are cached for efficiency. This is
especially important for sequences like Fibonacci that have exponential
complexity without memoization:

```js
// Fast even for large indices thanks to memoization
ce.parse('F_{30}').evaluate();  // → 832040 (computed quickly)
```

To disable memoization (e.g., for memory-constrained environments):

```js
ce.declareSequence('O', {
  base: { 0: 1 },
  recurrence: 'O_{n-1} + 1',
  memoize: false,
});
```

### LaTeX-Based Sequence Definitions

Sequences can also be defined using natural LaTeX assignment notation. This is
especially useful in interactive environments or when working with mathematical
notation directly:

```js
// Arithmetic sequence via LaTeX
ce.parse('L_0 := 1').evaluate();
ce.parse('L_n := L_{n-1} + 2').evaluate();
ce.parse('L_{5}').evaluate();  // → 11

// Fibonacci via LaTeX
ce.parse('F_0 := 0').evaluate();
ce.parse('F_1 := 1').evaluate();
ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.parse('F_{10}').evaluate();  // → 55

// Factorial via LaTeX
ce.parse('D_0 := 1').evaluate();
ce.parse('D_n := n \\cdot D_{n-1}').evaluate();
ce.parse('D_{5}').evaluate();  // → 120
```

**Order independence:** Base cases and recurrence can be defined in any order.
The sequence is finalized when both a base case and a recurrence relation are
present:

```js
// Recurrence first, then base case
ce.parse('K_n := K_{n-1} + 1').evaluate();
ce.parse('K_0 := 0').evaluate();  // Sequence finalized here
ce.parse('K_{5}').evaluate();  // → 5
```

**How it works:** The system detects sequence definitions by checking if the
right-hand side contains self-references (like `L_{n-1}` when defining `L_n`).
Assignments without self-references are treated as function definitions instead:

```js
// This defines a function f(x) = x², not a sequence
ce.parse('f_x := x^2').evaluate();
ce.parse('f_{3}').evaluate();  // → 9
```

### Sequence Status and Introspection

You can query the status of sequence definitions and inspect defined sequences:

```js
// Check if a sequence is fully defined
ce.parse('F_0 := 0').evaluate();
ce.getSequenceStatus('F');
// → { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }

ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.getSequenceStatus('F');
// → { status: 'complete', hasBase: true, hasRecurrence: true, baseIndices: [0] }

// For non-sequences:
ce.getSequenceStatus('x');
// → { status: 'not-a-sequence', hasBase: false, hasRecurrence: false }
```

**Introspection methods** let you examine and manage defined sequences:

```js
// Get detailed information about a sequence
ce.getSequence('F');
// → { name: 'F', variable: 'n', baseIndices: [0, 1], memoize: true, cacheSize: 5 }

// List all defined sequences
ce.listSequences();  // → ['F', 'A', 'T']

// Check if a symbol is a sequence
ce.isSequence('F');  // → true
ce.isSequence('x');  // → false

// Manage memoization cache
ce.getSequenceCache('F');  // → Map { 2 => 1, 3 => 2, 5 => 5, ... }
ce.clearSequenceCache('F');  // Clear cache for specific sequence
ce.clearSequenceCache();     // Clear all sequence caches
```

### Generating Sequence Terms

Generate a list of sequence terms with `getSequenceTerms()`:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Get terms from index 0 to 10 (inclusive)
ce.getSequenceTerms('F', 0, 10);
// → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// With a step parameter (every other term)
ce.getSequenceTerms('F', 0, 10, 2);
// → [0, 1, 3, 8, 21, 55]

// Starting from a non-zero index
ce.getSequenceTerms('F', 5, 10);
// → [5, 8, 13, 21, 34, 55]
```

### Sum and Product over Sequences

`Sum` and `Product` work seamlessly with user-defined sequences:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Sum of Fibonacci terms from k=0 to 10
ce.parse('\\sum_{k=0}^{10} F_k').evaluate();  // → 143

// Product over sequence terms
ce.declareSequence('A', {
  base: { 1: 1 },
  recurrence: 'A_{n-1} + 1',
});
ce.parse('\\prod_{k=1}^{5} A_k').evaluate();  // → 120 (factorial)
```

### OEIS Integration

The [Online Encyclopedia of Integer Sequences (OEIS)](https://oeis.org) contains
over 350,000 integer sequences. You can look up sequences and verify your
definitions against known mathematical sequences:

```js
// Look up a sequence by its terms
const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
// → [{ id: 'A000045', name: 'Fibonacci numbers', terms: [...], url: '...' }]

// Each result contains:
// - id: OEIS sequence ID (e.g., 'A000045')
// - name: Sequence description
// - terms: First several terms
// - formula: Formula if available
// - url: Link to OEIS page
```

**Verify your sequences** against OEIS:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

const result = await ce.checkSequenceOEIS('F', 10);
// → {
//     matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }],
//     terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
//   }

if (result.matches.length > 0) {
  console.log(`Your sequence matches ${result.matches[0].name}!`);
}
```

**Options:**

```js
// Limit number of results
await ce.lookupOEIS([1, 2, 3, 4, 5], { maxResults: 3 });

// Set timeout (in milliseconds)
await ce.lookupOEIS([1, 2, 3, 4, 5], { timeout: 5000 });
```

> **Note:** OEIS lookups require network access to oeis.org.

## Overloading Functions

**Overloading** is the ability to define multiple functions with the same name.

**To overload a function**, use the `ce.declare()` methods.

For example, to overload the `Sqrt` function to return `NaN` for
non-real numbers, use the following code:

```js
const originalSqrtDefinition = ce.expr('Sqrt').operatorDefinition!;
ce.declare('Sqrt', {
  ...originalSqrtDefinition,
  evaluate: (x, options) => {
    const y = originalSqrtDefinition.evaluate!(x, options);
    return y?.isReal ? y : ce.NaN;
  },
});
```

In general, re-declaring a function in the same scope is not allowed and 
will throw an error. However, the standard functions are in a `system` scope
so a new declaration in the `global` scope or a child scope will
override the original declaration.


## Multi-Clause Function Definitions

**To define a function by cases** — separate definitions for particular
argument values, plus a general fallback — use the `DefineFunction`
operator. Unlike `Assign`, which replaces a binding wholesale,
`DefineFunction` **accumulates**: each statement adds a *clause*, and a
call dispatches to the most specific clause admitting its arguments
(declaration order only breaks ties between equally specific clauses).

```js
ce.box(['DefineFunction', 'fib',
  ['Function', 0, ['Typed', 'z', { str: '0' }]]]).evaluate();
ce.box(['DefineFunction', 'fib',
  ['Function', 1, ['Typed', 'o', { str: '1' }]]]).evaluate();
ce.box(['DefineFunction', 'fib',
  ['Function',
    ['Add', ['fib', ['Subtract', 'n', 1]], ['fib', ['Subtract', 'n', 2]]],
    ['Typed', 'n', { str: 'integer' }]]]).evaluate();

console.log(ce.box(['fib', 10]).evaluate().toString());
// ➔ 55
```

A parameter constrained to a single value (`{ str: '0' }` above) uses a
**value type**: the clause admits exactly that value. In Epsil, literal
parameters provide the same thing directly: `fib(0) = 0`.

The clause rules:

- A new clause with the **same parameter types** replaces the earlier
  clause in place (so re-running an edited definition behaves as
  expected); any other parameter list appends a clause.
- A plain assignment (`Assign`, `ce.assign()`) still **replaces the whole
  binding**, clauses and all.
- If a symbolic argument leaves dispatch undecided — a more specific
  clause *might* apply once the value is known — the call stays inert
  (symbolic) rather than committing to a fallback.
- If the evaluated arguments match **no** clause, the call is a
  `no-matching-clause` error value.
- Effects must be uniform across clauses: there is one effect row per
  function. An explicit specifier on one clause establishes the row;
  another clause's explicit specifier must agree, or the definition is
  rejected with `incompatible-clause-effects`.

**To inspect the clause set**, use `About`: it lists one line per clause
in declaration order, and annotates overlapping equal-specificity clauses
and clauses made unreachable by more specific ones covering their whole
(finite) domain.


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
symbols, not LaTeX commands. For example, if you have a symbol `α`, use
`alpha`, not `\alpha` 
:::

```js
ce.declare({
  m: { type: "number", value: 5 },
  f: { type: "function" },
  g: { type: "function" },
  Smallfrac: {
    signature: "(number, number) -> number",
    evaluate: ([x,y]) => x.div(y),
  },
});
```

**To assign multiple functions and symbols**, use the `ce.assign()` method with
a dictionary of values.

```js
ce.assign({
  "m": 10,
  "f": ce.parse("x \\mapsto x^2 + x + 41"),
  "g": ce.parse("t \\mapsto t^3 + t^2 + 17"),
});
```
