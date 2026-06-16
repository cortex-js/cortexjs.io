---
title: Patterns and Rules
slug: /compute-engine/guides/patterns-and-rules/
---

Recognizing patterns and applying rules is a powerful symbolic computing tool to
identify and manipulate the structure of expressions.


## Wildcards

Wildcards are placeholders symbols in an expression. They start with a `_`.

The `"_"` universal wildcard matches anything that is in the corresponding 
position in an expression.

The `"__"` wildcard matches any sequence of 1 or more expressions in its
corresponding position. It is useful to capture the arguments of a function.

The `"___"` wildcard matches any sequence of 0 or more expressions in its
corresponding position.

A wildcard symbol may include a name which is used to **capture** the matching
expression, for example `_a`. 

When using a named wildcard, all instances of the named wildcard must match. In contrast, an un-named wildcard 
(a universal wildcard such as `"_"` `"__"` or `"___"`) can be used multiple 
times to match different values.


## Patterns

A pattern is an expression which can include one or more placeholders in the
form of wildcards.

Patterns are similar to Regular Expressions in traditional programming languages
but they are tailored to deal with MathJSON expressions instead of strings.

### Validating Patterns

Some wildcard combinations are invalid because they create ambiguity. For
example, consecutive sequence wildcards like `['Add', '__a', '__b']` are
invalid because there's no way to determine where `__a` ends and `__b` begins.

**To check if a pattern is valid**, use the `validatePattern()` function:

```js example
import { validatePattern } from 'compute-engine';

const ce = new ComputeEngine();
const pattern = ce.expr(['Add', '__a', '__b']);

try {
  validatePattern(pattern);
} catch (e) {
  console.log(e.message);
  // ➔ "Invalid pattern: consecutive sequence wildcards..."
}
```

Invalid patterns include:
- `['Add', '__a', '__b']` - consecutive sequence wildcards
- `['Add', '___a', '___b']` - consecutive optional sequence wildcards
- `['Add', '__a', '___b']` - sequence followed by optional sequence

Valid patterns with multi-element wildcards:
- `['Add', '__a', '_b']` - `_b` matches last element, `__a` gets the rest
- `['Add', '___a', '_b', '___c']` - `_b` anchors the middle

Given a pattern and an expression the goal of pattern matching is to find a
substitution for all the wildcards such that the pattern becomes the expression.

An expression is said to match a pattern if there exists a set of values such
that replacing the wildcards with those values is equal to the expression. 
This set of values is called a **substitution**.

For example, the pattern `["Add", 3, "_c"]` becomes the expression
`["Add", 3, "x"]` by replacing the wildcard `"_c"` with `"x"`. The substitution
is therefore `{_c : "x"}`.

On the other hand, the expression `["Divide", "x", 2]` does not match the
pattern `["Add", 3, "_c"]`: no substitution exists to transform the pattern
into the expression by substituting the wildcards.


## Matching an Expression to a Pattern

**To check if an expression matches a pattern**, use the
`_expression_.match(_pattern_)` method.

If there is no match, the method returns `null`.

If there is a match, a `Substitution` object literal with
keys corresponding to the matching named wildcards is returned.

If no named wildcards are used and there is a match, an empty object literal
is returned.


### Pattern Formats

The `pattern` argument can be provided in three formats:

**String (LaTeX)** — Single-character symbols are automatically treated as
wildcards. Results use clean unprefixed keys. `useVariations` and
`matchMissingTerms` default to `true`.

```live example
const expr = ce.parse('3x^2+2x+5');
console.log(expr.match('ax^2+bx+c'));
// ➔ { a: 3, b: 2, c: 5 }
```

**MathJSON array** — Passed directly, boxed automatically. Use `_`-prefixed
wildcard names explicitly.

```live example
const expr = ce.parse('3x^2+2x+5');
console.log(expr.match(["Add", ["Multiply", "_a", ["Power", "x", 2]],
  ["Multiply", "_b", "x"], "_c"]));
// ➔ { _a: 3, _b: 2, _c: 5 }
```

**BoxedExpression** — Used directly.

```live example
const expr = ce.parse('3x^2+2x+5');
const pattern = ce.expr(["Add", ["Multiply", "_a", ["Power", "x", 2]],
  ["Multiply", "_b", "x"], "_c"]);
console.log(expr.match(pattern));
// ➔ { _a: 3, _b: 2, _c: 5 }
```


### String Patterns

When a string pattern is used, several conveniences are applied:

- **Auto-wildcarding**: All single-character symbols become wildcards. In the
  pattern `'ax^2+bx+c'`, `a`, `b`, `c`, and `x` all become wildcards. Multi-
  character symbols (like `pi`) remain literal.

- **Clean results**: Only unprefixed keys are returned (`{a: 3}` not
  `{_a: 3}`), and self-matches are filtered out (e.g. wildcard `x` capturing
  symbol `x` is omitted).

- **Flexible defaults**: `useVariations` and `matchMissingTerms` default to
  `true`, enabling matching of structurally equivalent variants and expressions
  with missing terms.

- **Unprefixed substitution keys**: The `substitution` option accepts
  unprefixed keys:

```live example
const expr = ce.parse('3y^2+5');
console.log(expr.match('ax^2+bx+c', { substitution: { x: ce.expr('y') } }));
// ➔ { a: 3, b: 0, c: 5 }
```


### Matching Missing Terms

When `matchMissingTerms` is enabled (default for string patterns), expressions
with fewer operands than the pattern can still match. Missing terms in an
`Add` are treated as `0`, and missing factors in a `Multiply` are treated
as `1`.

```live example
// 3x^2+5 has no bx term, but still matches with b=0
const expr = ce.parse('3x^2+5');
console.log(expr.match('ax^2+bx+c'));
// ➔ { a: 3, b: 0, c: 5 }

// Works with MathJSON patterns too (opt in explicitly)
console.log(expr.match(
  ["Add", ["Multiply", "_a", ["Power", "x", 2]], ["Multiply", "_b", "x"], "_c"],
  { matchMissingTerms: true }
));
// ➔ { _a: 3, _b: 0, _c: 5 }
```

For MathJSON and BoxedExpression patterns, set `matchMissingTerms: true`
explicitly to enable this behavior.


### Commutativity

The commutativity of functions is taken into account when matching patterns.

```live example
const pattern = ce.expr(["Add", "_", "x"]);
console.log("x+1 ➔", ce.expr(["Add", 1, "x"]).match(pattern));
// ➔ { } : the expression matches the pattern

console.log("x+42 ➔", ce.expr(["Add", "x", 42]).match(pattern));
// ➔ { } : the expression matches the pattern by commutativity

console.log("5*x ➔", ce.expr(["Multiply", 5, "x"]).match(pattern));
// ➔ null : the expression does not match the pattern
```

### Exact Matching

By default, the `expr.match()` method will match some variants of the same
expression, for example `x+_a` and `x` are considered to match (with the
substitution `{_a : 0}`).

```live example
const pattern = ce.expr(["Add", "x", "_a"]);
const expr = ce.expr("x");

console.log("x ➔", expr.match(pattern));
// ➔ { _a: 0 } : the expression matches the pattern
```

**To prevent the matching of variants**, set the `exact` property to `true`.

```live example
const pattern = ce.expr(["Add", "x", "_a"]);
const expr = ce.expr("x");

console.log("exact: x ➔", expr.match(pattern, {exact: true}));
// ➔ null : the expression does not match the pattern
```

The variants can be applied to the whole expression or to sub-expressions.

```live example
const pattern = ce.expr(["Add", ["Multiply", "_a", "x"], "_b"]);

console.log("x ➔", ce.expr("x").match(pattern));
// ➔ { _a: 1, _b: 0 } : the expression matches the pattern
```


### Recursive Matching

By default, the `expr.match()` method does not consider sub-expressions: 
it is not recursive.

```live example
const pattern = ce.expr(["Add", "_", "x"]);
const expr = ce.expr(["Multiply", 2, ["Add", 1, "x"]]);

console.log("2(1+x) ➔", expr.match(pattern));
// ➔ null : the expression does not match the pattern
```

**To match sub-expressions recursively**, set the `recursive` property to
`true`.

```live example
const pattern = ce.expr(["Add", "_", "x"]);
const expr = ce.expr(["Multiply", 2, ["Add", 1, "x"]]);

console.log("recursive: 2(1+x) ➔", expr.match(pattern, {recursive: true}));
// ➔ { } : the expression matches the pattern
```


### Repeated Named Wildcards

If a named wildcard is referenced multiple times in a pattern, all its values
must match.

```live example
console.log(ce.expr(["Add", 1, "x"]).match(ce.expr(["Add", '_a', '_a'])));
// ➔ null

console.log(ce.expr(["Add", "x", "x"]).match(ce.expr(["Add", '_a', '_a'])));
// ➔ { _a: "x" }
```

### Capturing the Head of Functions

Wildcards can be used to capture the head of functions:

```live example
console.log(ce.expr(["Add", 1, "x"]).match(ce.expr(["_f", "__args"])));
// ➔ { _f: "Add", __args: ["Sequence", [1, "x"]] }
```


## Substitution

The return value of the `expr.match()` function is a `Substitution` object: a
mapping from wildcards to expressions.

If there is no match, `expr.match()` returns `null`.

**To apply a substitution to a pattern**, and therefore recover the expression
it was derived from, use the `subs()` function.

```live example
const expr = ce.expr(["Add", 1, "x"]);
const pattern = ce.expr(["Add", 1, "_a"]);
const subs = expr.match(pattern);
console.log(subs);
// ➔ { _a: "x" }

console.log(pattern.subs(subs));
// ➔ ["Add", 1, "x"]
```


## Applying Rewrite Rules

A rewrite rule is an object with these properties:

- `match`: a matching pattern
- `replace`: a substitution pattern
- `condition`: an optional condition predicate
- `useVariations`: an optional boolean (default `false`); when `true` the rule
  may match equivalent variants, e.g. matching `x` against `a + x`
- `operators`: an optional dispatch hint — a list of operators this rule can
  apply to. It does not change the rule's semantics (the rule is simply never
  tried against expressions with a different operator), but it lets the engine
  index large rule sets efficiently
- `purpose`: optional, see [**Rule Purpose**](#rule-purpose) below
- `id`: an optional identifier, surfaced in the `because` field of simplify
  steps for debugging

**To apply a set of rules to an expression**, call the `expr.replace()`
function.

Each rule in the ruleset is applied to the expression in turn. If a rule
matches, the expression is replaced by the substitution pattern of the rule.


```live example
const squareRule = {
  match: ["Multiply", "_x", "_x"],
  replace: ["Square", "_x"],
};

const expr = ce.expr(["Multiply", 7, 7], { form: 'raw' });
console.log(expr.replace(squareRule) ?? expr);
// ➔ ["Square", 7]
```

The `expr.replace()` function continues applying all the rules in the ruleset
until no rules are applicable.

If `expr` is not canonical, the result of the replace operation is not
canonical either.

### Rule Purpose

The optional `purpose` property controls how `simplify()` treats a rule. It
does not affect `replace()`, which always applies every rule.

<div className="symbols-table">

| `purpose`     |                                                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------------------------------- |
| `'simplify'`  | **(default)** Subject to the cost gate: the rewrite is kept only if the result is "simpler" (lower cost).         |
| `'transform'` | A mathematically-preferred rewrite that is **exempt** from the cost gate — applied even if it does not lower cost. |
| `'expand'`    | Grows the expression by design (e.g. expanding a definition). **Excluded** from `simplify()`'s scan, but still reachable through `expr.replace()`. |

</div>

So a rule tagged `'expand'` will fire with `expr.replace(rules)` but will be
ignored by `expr.simplify()` — which is how a rewrite like
`Γ(z+1) → z·Γ(z)` (useful on demand, but not a simplification) is kept out of
the automatic simplifier.

### Simplifying an Expression

The `expr.simplify()` function applies a collection of built-in rewrite rules.

You can define your own rules and apply them using `expr.replace()`.

### Substituting Symbols

If a pattern does not contain any named wildcards and only symbols, the
`expr.subs()` function can be used to replace all occurrences of matching symbols.

```live example
const expr = ce.expr(["Add", ["Multiply", "a", "x"], "b"]);

console.log(expr.replace([
    { match: "a", replace: 2 }, 
    { match: "b", replace: 3 }
  ], 
  { recursive: true }
));
// ➔ 2x + 3

console.log(expr.subs({"a": 2, "b": 3}));
// ➔ 2x + 3
```

## Extending `solve()`

`expr.solve()` finds the roots of an equation using two extensible rule sets on
the engine, both of which follow the same push/replace pattern as
`ce.simplificationRules`:

- `ce.solveRules` — **root templates**. Each matches an equation normalized to
  `expression = 0` and produces a root. By convention the unknown is the
  wildcard `_x`, and a condition ensures the other wildcards do not themselves
  capture the unknown.
- `ce.harmonizationRules` — rewrites that transform an equation into an
  equivalent, easier-to-solve form *before* root-finding (for example
  `ln(f(x)) = 0 → f(x) − 1 = 0`).

```live example
const ce = new ComputeEngine();

// sinh(x) + b = 0  →  x = arsinh(−b)
ce.solveRules.push({
  match: ["Add", ["Sinh", "_x"], "__b"],
  replace: ["Arsinh", ["Negate", "__b"]],
  condition: (sub) => !sub.__b.has("_x"),
});

console.log(ce.parse("\\sinh(x) - 3 = 0").solve("x"));
// ➔ [Arsinh(3)]
```

Pushed root templates are **safe**: `solve()` validates every candidate root
against the original equation (`validateRoots`), so an over-broad or incorrect
template contributes no roots — it degrades to a no-op rather than returning a
wrong answer.

The Fungrim-derived
[identities library](/compute-engine/guides/identities/) ships a curated
set of these templates (LambertW, inverse trigonometric and exponential
forms); load them with `loadIdentities(ce, { solve: true })` to solve, e.g.,
`x·eˣ = 3 → W(3)`.
