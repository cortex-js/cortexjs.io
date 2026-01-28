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
const pattern = ce.box(['Add', '__a', '__b']);

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

For convenience, the _pattern_ argument can be an unboxed MathJSON expression.


### Commutativity

The commutativity of functions is taken into account when matching patterns.

```live example
const pattern = ce.box(["Add", "_", "x"]);
console.log("x+1 ➔", ce.box(["Add", 1, "x"]).match(pattern));
// ➔ { } : the expression matches the pattern

console.log("x+42 ➔", ce.box(["Add", "x", 42]).match(pattern));
// ➔ { } : the expression matches the pattern by commutativity

console.log("5*x ➔", ce.box(["Multiply", 5, "x"]).match(pattern));
// ➔ null : the expression does not match the pattern
```

### Exact Matching

By default, the `expr.match()` method will match some variants of the same
expression, for example `x+_a` and `x` are considered to match (with the
substitution `{_a : 0}`).

```live example
const pattern = ce.box(["Add", "x", "_a"]);
const expr = ce.box("x");

console.log("x ➔", expr.match(pattern));
// ➔ { _a: 0 } : the expression matches the pattern
```

**To prevent the matching of variants**, set the `exact` property to `true`.

```live example
const pattern = ce.box(["Add", "x", "_a"]);
const expr = ce.box("x");

console.log("exact: x ➔", expr.match(pattern, {exact: true}));
// ➔ null : the expression does not match the pattern
```

The variants can be applied to the whole expression or to sub-expressions.

```live example
const pattern = ce.box(["Add", ["Multiply", "_a", "x"], "_b"]);

console.log("x ➔", ce.box("x").match(pattern));
// ➔ { _a: 1, _b: 0 } : the expression matches the pattern
```


### Recursive Matching

By default, the `expr.match()` method does not consider sub-expressions: 
it is not recursive.

```live example
const pattern = ce.box(["Add", "_", "x"]);
const expr = ce.box(["Multiply", 2, ["Add", 1, "x"]]);

console.log("2(1+x) ➔", expr.match(pattern));
// ➔ null : the expression does not match the pattern
```

**To match sub-expressions recursively**, set the `recursive` property to
`true`.

```live example
const pattern = ce.box(["Add", "_", "x"]);
const expr = ce.box(["Multiply", 2, ["Add", 1, "x"]]);

console.log("recursive: 2(1+x) ➔", expr.match(pattern, {recursive: true}));
// ➔ { } : the expression matches the pattern
```


### Repeated Named Wildcards

If a named wildcard is referenced multiple times in a pattern, all its values
must match.

```live example
console.log(ce.box(["Add", 1, "x"]).match(ce.box(["Add", '_a', '_a'])));
// ➔ null

console.log(ce.box(["Add", "x", "x"]).match(ce.box(["Add", '_a', '_a'])));
// ➔ { _a: "x" }
```

### Capturing the Head of Functions

Wildcards can be used to capture the head of functions:

```live example
console.log(ce.box(["Add", 1, "x"]).match(ce.box(["_f", "__args"])));
// ➔ { _f: "Add", __args: ["Sequence", [1, "x"]] }
```


## Substitution

The return value of the `expr.match()` function is a `Substitution` object: a
mapping from wildcards to expressions.

If there is no match, `expr.match()` returns `null`.

**To apply a substitution to a pattern**, and therefore recover the expression
it was derived from, use the `subs()` function.

```live example
const expr = ce.box(["Add", 1, "x"]);
const pattern = ce.box(["Add", 1, "_a"]);
const subs = expr.match(pattern);
console.log(subs);
// ➔ { _a: "x" }

pattern.subs(subs).print();
// ➔ ["Add", 1, "x"]
```


## Applying Rewrite Rules

A rewrite rule is an object with three properties:

- `match`: a matching pattern
- `replace`: a substitution pattern
- `condition`: an optional condition predicate

**To apply a set of rules to an expression**, call the `expr.replace()`
function.

Each rule in the ruleset is applied to the expression in turn. If a rule
matches, the expression is replaced by the substitution pattern of the rule.


```live example
const squareRule = {
  match: ["Multiply", "_x", "_x"],
  replace: ["Square", "_x"],
};

const expr = ce.box(["Multiply", 7, 7], { canonical: false });
(expr.replace(squareRule) ?? expr).print();
// ➔ ["Square", 7]
```

The `expr.replace()` function continues applying all the rules in the ruleset
until no rules are applicable.

If `expr` is not canonical, the result of the replace operation is not
canonical either.

### Simplifying an Expression

The `expr.simplify()` function applies a collection of built-in rewrite rules.

You can define your own rules and apply them using `expr.replace()`.

### Substituting Symbols

If a pattern does not contain any named wildcards and only symbols, the
`expr.subs()` function can be used to replace all occurrences of matching symbols.

```live example
const expr = ce.box(["Add", ["Multiply", "a", "x"], "b"]);

expr.replace([
    { match: "a", replace: 2 }, 
    { match: "b", replace: 3 }
  ], 
  { recursive: true }
)?.print();
// ➔ 2x + 3

expr.subs({"a": 2, "b": 3}).print();
// ➔ 2x + 3
```
