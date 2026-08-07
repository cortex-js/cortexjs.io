---
title: Symbolic Computing
slug: /compute-engine/guides/symbolic-computing/
date: Last Modified
---

<Intro>
The Compute Engine essentially performs computation by applying
rewriting rules to a MathJSON expression.
</Intro>


There are three common transformations that can be applied to an expression:

<div className="symbols-table first-column-header" style={{"--first-col-width":"16ch"}}>

| Transformation    |                                                                                                                                                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expr.simplify()` | Eliminate constants and common sub-expressions. Use available assumptions to determine which rules are applicable. Limit calculations to exact results. Does not substitute assigned symbol values (that is `evaluate()`'s job). |
| `expr.evaluate()` | Calculate the exact value of an expression. Replace symbols with their value.                                               |
| `expr.N()`        | Calculate a numeric approximation of an expression using floating point numbers.                                                                                       |

</div>

A key difference between `expr.evaluate()` and `expr.N()` is that the former
will use the exact value of symbols, while the latter will use their numeric
approximation. An exact value is a rational number, an integer, the square root
of an integer and some constants such as \\(\pi\\) or \\(e\\). A numeric
approximation is a floating point number.



<div className="first-column-header">

|       &nbsp; |           `expr.simplify()`           |           `expr.evaluate()`           |              `expr.N()`               |
| :---------------------------- | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
| Use assumptions on symbols    | <Icon name="circle-check" color="green-700"/> | | |
| Substitute assigned symbol values | | <Icon name="circle-check" color="green-700"/> | <Icon name="circle-check" color="green-700"/> |
| Exact calculations            | <Icon name="circle-check" color="green-700"/> | <Icon name="circle-check" color="green-700"/> |                                       |
| Floating-point approximations |                                       |                                       | <Icon name="circle-check" color="green-700"/> |

</div>


<ReadMore path="/compute-engine/guides/simplify/" > Read more about
<strong>Simplify</strong> <Icon name="chevron-right-bold" /></ReadMore>

<ReadMore path="/compute-engine/guides/evaluate/" > Read more about
<strong>Evaluate</strong> <Icon name="chevron-right-bold" /></ReadMore>

<ReadMore path="/compute-engine/guides/numeric-evaluation/" > Read more about
<strong>Numerical Evaluation</strong> <Icon name="chevron-right-bold" /></ReadMore>

Other operations can be performed on an expression: comparing it to a pattern,
replacing part of it, and applying conditional rewrite rules.

```live show-line-numbers
const expr = ce.parse('3x^2 + 2x^2 + x + 5');
console.log(expr, '=', expr.simplify());
```

## Comparing Expressions

There are three tiers of comparison, from the strictest and cheapest to the
most powerful and most expensive:

<div className="symbols-table first-column-header" style={{"--first-col-width":"16ch"}}>

| Tier | Method | Operator | Notation | Answers |
| :--- | :--- | :--- | :--- | :--- |
| Syntactic | `isSame()` | `Same` | `===`, `≣` (Epsil) | Always `True` or `False` |
| Arithmetic | `isEqual()` | `Equal` | `=`, `==` (Epsil) | `True`, `False`, or undetermined |
| Identity | `isIdenticallyEqual()` | `IdenticallyEqual` | `\equiv`, `≡` | `True`, `False`, or undetermined |

</div>

Each tier answers a different question: "are these the same expression?",
"do these have the same value?", and "are these the same function of their
free variables?".

The operator, its LaTeX/Epsil notation and its JavaScript method share the
same semantics at each tier.

### Syntactic Equality: `isSame()`

Syntactic equality (or structural equality) considers the **symbolic structure** used
to represent an expression. 

The symbolic structure of an expression is the tree of symbols and functions
that make up the expression.

For example, the symbolic structure of \\(2 + 1\\) is a sum of two terms, 
the first term is the number `2` and the second term is the number `1`.

The symbolic structure of \\(3\\) is a number `3`.

The symbolic structure of \\(2 + 1\\) and \\(3\\) are different, even though
they represent the same mathematical object.

The `lhs.isSame(rhs)` function returns true if `lhs` and `rhs` are structurally
exactly identical, that is each sub-expression is recursively identical in `lhs`
and `rhs`. The argument can be an `Expression` or a JavaScript primitive
(`number`, `bigint`, `boolean`, `string`).

This is a fast, exact check — no evaluation is performed, and the answer is
always `true` or `false`, never undetermined.

`isSame()` is **strictly syntactic**: it compares the expressions as written
(in canonical form) and never substitutes the value of a symbol. If `x` has
been assigned the value `5`, `ce.symbol('x').isSame(5)` is `false` — one
expression is a symbol, the other a number. Use `isEqual()` to compare values.

- \\( x + x \\) and \\( 2x \\) are not structurally equal, one is a sum of two
  terms, the other a product
- \\( (x + 1)^2 \\) and \\( x^2 + 2x + 1 \\) are not structurally equal, one is a
  power of a sum, the other a sum of terms.


```live show-line-numbers
const a = ce.parse('x + x');
const b = ce.parse('2x');
console.log('isSame?', a.isSame(b));
```


By default, when parsing or boxing an expression, they are put in canonical
form. For example, fractions are automatically reduced to their simplest form,
and arguments are sorted in a standard way.

The expressions \\( \\frac{1}{10} \\) and \\( \\frac{2}{20} \\) are
structurally equal because they get put into a canonical form when parsed,
in which the fractions are reduced.

Similarly, \\( x^2 - 3x + 4 \\) and \\( 4 - 3x + x^2 \\) are structurally equal
(`isSame` returns true) because the arguments of the sum are sorted in a standard 
way.

**To compare two expressions without canonicalizing them**, parse or box 
them with the `canonical` option set to `false`.

```live show-line-numbers mark-javascript-line="5-6"
const a = ce.parse('\\frac{1}{10}');
const b = ce.parse('\\frac{2}{20}');
console.log('Canonical isSame?', a.isSame(b));

const aPrime = ce.parse('\\frac{1}{10}', {form: 'raw'});
const bPrime = ce.parse('\\frac{2}{20}', {form: 'raw'});
console.log('Non-canonical isSame?', aPrime.isSame(bPrime));
```


In some cases you may want to compare two expressions with a weak form 
of canonicalization, for example to ignore the order of the arguments of a sum.

You can achieve this by comparing the expressions in their canonical order:

```json example
ce.expr(["CanonicalForm", ["Add", 1, "x"], "Order"]).isSame(
  ["CanonicalForm", ["Add", "x", 1], "Order"]
)
```



### Arithmetic Equality: `isEqual()`

The `lhs.isEqual(rhs)` function answers "do these two expressions have the same
value?". It is the JavaScript counterpart of the `=` operator (`==` in Epsil).

The comparison is deliberately **cheap and predictable**:

1. Both operands are evaluated (so assigned symbol values are substituted).
2. If the results are structurally identical, they are equal.
3. Otherwise, if the difference between them has no unknowns, it is evaluated
   numerically: they are equal if the absolute value of the difference is less
   than `ce.tolerance`.
4. Otherwise the answer is `undefined`.

No expansion, no simplification and no sampling is attempted. In particular,
`isEqual()` does **not** attempt to prove a symbolic identity: the expressions
\\( (x+1)^2 \\) and \\( x^2 + 2x + 1 \\) have the same value for every \\( x
\\), but `isEqual()` returns `undefined` for them. Use
[`isIdenticallyEqual()`](#identity-isidenticallyequal) for that question.

Note that unlike `expr.isSame()`, `expr.isEqual()` can return `true`, `false` or
`undefined`. The latter value indicates that there is not enough information to
determine if the two expressions have the same value.

The corresponding `Equal` expression is **inert** when the answer is
`undefined`: it stays unevaluated, since \\( x = y \\) is a *condition*, not a
claim that is false until proven. This is what makes an equation usable as an
argument to `Solve`.

```live show-line-numbers
const a = ce.parse('1 + 2');
const b = ce.parse('3');
console.log('isEqual?', a.isEqual(b));

// Undetermined: the `Equal` expression stays unevaluated
console.log(ce.parse('x = y').evaluate());
```

Following IEEE 754, `NaN` is not equal to anything, including itself: `NaN =
NaN` is `False`, and so is the comparison of two collections that contain it,
`["Equal", ["List", "NaN"], ["List", "NaN"]]`. Only the syntactic tier reports
those as identical (`["Same", "NaN", "NaN"]` is `True`).

### Identity: `isIdenticallyEqual()`

Comparing two arbitrary symbolic expressions is a hard problem. In fact,
[Richardson's Theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem)
proves that it is impossible in general to determine if two symbolic
expressions are identical.

However, there are many cases where it is possible to decide it in practice.
The `lhs.isIdenticallyEqual(rhs)` function asks whether `lhs` and `rhs` are the
same function of their free variables, that is whether they have the same value
for **every** value of those variables. It is the JavaScript counterpart of the
`IdenticallyEqual` operator, written \\( \\equiv \\) in LaTeX.

```live show-line-numbers
console.log(ce.parse('(x+1)^2').isIdenticallyEqual(ce.parse('x^2+2x+1')));
console.log(ce.parse('\\sin^2 x + \\cos^2 x \\equiv 1').evaluate());
```

Like `isEqual()`, it is three-valued: `true`, `false` or `undefined` when the
question could not be settled, in which case an `IdenticallyEqual` expression
stays unevaluated. A `false` requires a definite disagreement of values:
expressions that merely differ at the sampled points, such as \\( x \\) and
\\( x + 1 \\), are `undefined`, since an assumption could still constrain them
to be equal.

:::warning[Stochastic verdicts]
To settle an identity, this tier uses symbolic transformations (expansion and
simplification) **and** numerical sampling: the two expressions are evaluated
at a number of pseudo-random points. A `true` answer obtained by sampling is
therefore a very strong indication, not a formal proof. This is the only tier
that can answer from sampling; `isSame()` and `isEqual()` never do.
:::


### Smart Comparison: `is()`

The `lhs.is(rhs)` method provides a convenient middle ground between `isSame()`
and `isEqual()`. It first tries an exact structural check (like `isSame()`), and
if that fails and the expression is **constant** (no free variables), it
evaluates numerically and compares within `engine.tolerance`.

This is useful when checking whether an expression evaluates to a known value
without the overhead of a full `isEqual()` call:

```live show-line-numbers
console.log(ce.parse('\\cos(\\frac{\\pi}{2})').is(0));   // true
console.log(ce.parse('\\sin(\\pi)').is(0));               // true
console.log(ce.parse('\\cos(0)').is(1));                  // true
console.log(ce.number(1e-17).is(0));                      // false (literal)
console.log(ce.parse('x + 1').is(1));                     // false (not constant)
```

For **literal numbers** (created with `ce.number()`), `is()` behaves identically
to `isSame()` — no tolerance is applied. Tolerance only kicks in for expressions
that require evaluation, such as `\sin(\pi)`.


### Other Comparisons

<div>

|                                          |                                        |
| :--------------------------------------- | :------------------------------------- |
| `lhs === rhs`                            | If true, same box expression instances |
| `lhs.isSame(rhs)`                        | Syntactic equality (fast, exact, no evaluation). Accepts primitives. |
| `lhs.is(rhs)`                            | Smart check: structural first, then numeric evaluation fallback for constant expressions (within `engine.tolerance`). For literal numbers, same as `isSame()`. |
| `lhs.isEqual(rhs)`                       | Arithmetic equality (evaluation and tolerance compare). May return `undefined`. |
| `lhs.isIdenticallyEqual(rhs)`            | Identity in all free variables (expansion, simplification, sampling). May return `undefined`. |
| `lhs.match(rhs) !== null`                | Pattern match                          |
| `ce.expr(["Equal", lhs, rhs]).evaluate()` | Synonym for `lhs.isEqual(rhs)`                |
| `ce.expr(["IdenticallyEqual", lhs, rhs]).evaluate()` | Synonym for `lhs.isIdenticallyEqual(rhs)` |
| `ce.expr(["IsSame", lhs, rhs]).evaluate()` | Synonym for `lhs.isSame(rhs)`, comparing the operands as written (they are not canonicalized) |
| `ce.expr(["Same", lhs, rhs]).evaluate()`  | Synonym for `lhs.isSame(rhs)` (Epsil `===`). Always decides. |

</div>

:::info[Choosing the Right Comparison]
- Use **`isSame()`** when you know the exact expression you're comparing against
  (e.g., checking if an operand is `0` or `1` in a simplification rule).
- Use **`is()`** when the expression might need evaluation to reveal its value
  (e.g., checking user input like `\cos(\pi/2)` against `0`).
- Use **`isEqual()`** to compare values, including expressions that must be
  evaluated first.
- Use **`isIdenticallyEqual()`** to check a symbolic identity, i.e. an equality
  that must hold for every value of the free variables.
:::

## Replacing a Symbol in an Expression

**To replace a symbol in an expression** use the `subs()` function.

The argument of the `subs()` function is an object literal. Each key/value 
pair is a symbol and the value to be substituted with. The value can be either
a number or a expression.

```live show-line-numbers mark-javascript-line="4"

let expr = ce.parse('\\sqrt{\\frac{1}{x+1}}');
console.log(expr.json);

expr = expr.subs({x: 3});

console.log("Substitute x -> 3\n", expr.json);
console.log("Numerical Evaluation:", expr.N());
```

## Other Symbolic Manipulation

There are a number of operations that can be performed on an expression:

- creating an expression from a raw MathJSON expression or from a LaTeX string
- simplifying an expression
- evaluating an expression
- applying a substitution to an expression
- applying conditional rewrite rules to an expression
- checking if an expression matches a pattern
- checking if an expression is a number, a symbol, a function, etc...
- checking if an expression is zero, positive, negative, etc...
- checking if an expression is an integer, a rational, etc...
- and more...

We've introduced some of these operations in this guide, but there are many more
that are available.

<ReadMore path="/compute-engine/guides/expressions/" > Read more about
<strong>Expressions</strong>, their properties and methods <Icon name="chevron-right-bold" /></ReadMore>

**To check if an expression matches a pattern**, apply a substitution to some
elements in an expression or apply conditional rewriting rules to an expression.

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > Read more about
<strong>Patterns and Rules</strong> for these operations <Icon name="chevron-right-bold" /></ReadMore>
