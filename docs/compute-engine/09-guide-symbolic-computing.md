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
| `expr.simplify()` | Eliminate constants and common sub-expressions. Use available assumptions to determine which rules are applicable. Limit calculations to exact results. |
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

There are two useful ways to compare symbolic expressions:

- structural equality
- mathematical equality

### Structural Equality: `isSame()`

Structural equality (or syntactic equality) considers the **symbolic structure** used
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
and `rhs`.

- \\(1 + 1 \\) and \\( 2 \\) are not structurally equal, one is a sum of two
  integers, the other is an integer
- \\( (x + 1)^2 \\) and \\( x^2 + 2x + 1 \\) are not structurally equal, one is a
  power of a sum, the other a sum of terms.


```live show-line-numbers
const a = ce.parse('2 + 1');
const b = ce.parse('3');
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

const aPrime = ce.parse('\\frac{1}{10}', {canonical: false});
const bPrime = ce.parse('\\frac{2}{20}', {canonical: false});
console.log('Non-canonical isSame?', aPrime.isSame(bPrime));
```


In some cases you may want to compare two expressions with a weak form 
of canonicalization, for example to ignore the order of the arguments of a sum.

You can achieve this by comparing the expressions in their canonical order:

```json example
ce.box(["CanonicalForm", ["Add", 1, "x"], "Order"]).isSame(
  ["CanonicalForm", ["Add", "x", 1], "Order"]
)
```



### Mathematical Equality: `isEqual()`

It turns out that comparing two arbitrary mathematical expressions is a complex
problem. 

In fact, [Richardson's Theorem](https://en.wikipedia.org/wiki/Richardson%27s_theorem)
proves that it is impossible to determine if two symbolic expressions are
identical in general.

However, there are many cases where it is possible to make a comparison between
two expressions to check if they represent the same mathematical object.

The `lhs.isEqual(rhs)` function returns true if `lhs` and `rhs` represent the
same mathematical object. 

If `lhs` and `rhs` are numeric expressions, they are evaluated before being 
compared. They are considered equal if the absolute value of the difference 
between them is less than `ce.tolerance`.

The expressions \\( x^2 - 3x + 4 \\) and \\( 4 - 3x + x^2 \\) will be considered
equal (`isEqual` returns true) because the difference between them is zero, 
i.e. \\( (x^2 - 3x + 4) - (4 - 3x + x^2) \\) is zero once the expression has 
been simplified.

Note that unlike `expr.isSame()`, `expr.isEqual()` can return `true`, `false` or
`undefined`. The latter value indicates that there is not enough information to
determine if the two expressions are mathematically equal.

```live show-line-numbers
const a = ce.parse('1 + 2');
const b = ce.parse('3');
console.log('isEqual?', a.isEqual(b));
```



### Other Comparisons

<div>

|                                          |                                        |
| :--------------------------------------- | :------------------------------------- |
| `lhs === rhs`                            | If true, same box expression instances |
| `lhs.isSame(rhs)`                        | Structural equality                    |
| `lhs.isEqual(rhs)`                       | Mathematical equality                  |
| `lhs.match(rhs) !== null`                | Pattern match                          |
| `lhs.is(rhs)`                            | Synonym for `lhs.isSame(rhs)`, but the argument of `is()` can be a boolean or number.                 |
| `ce.box(["Equal", lhs, rhs]).evaluate()` | Synonym for `lhs.isEqual(rhs)`                |
| `ce.box(["Same", lhs, rhs]).evaluate()`  | Synonym for `lhs.isSame(rhs)`                 |

</div>

## Replacing a Symbol in an Expression

**To replace a symbol in an expression** use the `subs()` function.

The argument of the `subs()` function is an object literal. Each key/value 
pair is a symbol and the value to be substituted with. The value can be either
a number or a boxed expression.

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
