---
title: Polynomials Reference
sidebar_label: Polynomials
slug: /reference/polynomials/
description: "The polynomials library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from polynomials.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Polynomials

The 18 definitions of the polynomials library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## The variable of a polynomial

Most polynomial functions take an optional variable as their last argument.
When it is omitted, it is the single free variable of the arguments, or `x`
when there are several free variables and one of them is `x`. So a pipeline
works without naming the variable:

```epsil
1/((x + 1) * (x + 2)) |> apart
// ➔ -1 / (x + 2) + 1 / (x + 1)
```

The polynomial functions receive their arguments unevaluated. A symbol that
holds a polynomial is replaced by its value, and the default variable is read
from that value:

```epsil
let p = x^3 - 2x^2 - 4
let q = x - 3
[polynomialQuotient(p, q, x), polynomialRemainder(p, q, x)]
// ➔ [x^2 + x + 3,5]
```

The variable named in the call is never replaced, even when it has a value:

```epsil
let x = 5
polynomialDegree(x^2 + 1, x)
// ➔ 2
```

In Epsil, a product of two parenthesized factors needs a `*`:
`(x + 1)(x + 2)` is a call of the function `x + 1`.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### algebraicGenerator

`(list<number>) -> number`

An abstract generator of Q[t]/(m), specified by ascending rational coefficients of an irreducible polynomial m. No complex embedding is selected.

`algebraicGenerator(coefficients)` is a root `α` of the polynomial
`c0 + c1 t + … + cn t^n`, where `coefficients` is the list `[c0, c1, …, cn]`
in **ascending** order of degree. Use it as the third argument of `factor`
to factor over a field that a single radical does not describe, such as the
rationals extended by `sqrt(2) + sqrt(3)`, a root of `t^4 - 10t^2 + 1`.

The coefficients must be exact rational numbers, and the polynomial must be
irreducible over the rationals, of degree 1 to 128. Otherwise the result is
an `invalid-algebraic-generator` error.

```epsil
algebraicGenerator([-1, 0, 1])
// ➔ error: Runtime error: invalid algebraic generator
factor(x^2 - 2, x, algebraicGenerator([-2, 0, 1]))
// ➔ (x - AlgebraicGenerator([-2,0,1])) * (x + AlgebraicGenerator([-2,0,1]))
```

The generator does not select **which** root of the polynomial it is:
`t^2 - 2` has two roots, `sqrt(2)` and `-sqrt(2)`, and
`algebraicGenerator([-2, 0, 1])` is one of them. Every root gives the same
field, so the factors that `factor` finds have the same degrees and
multiplicities for each choice. For the same reason, an algebraic generator
has no numeric value: `N` leaves it unchanged, and it cannot be compiled. To
work with a specific value, such as the positive square root of 2, use
`sqrt(2)`.

A power `α^k`, with `n ≤ k ≤ 128` where `n` is the degree of the polynomial,
is reduced modulo the polynomial, as `sqrt(2)^2` is `2`. This holds for every
root, so it does not choose one. A negative power is not reduced.

```epsil
algebraicGenerator([-2, 0, 1])^2
// ➔ 2
algebraicGenerator([-1, -1, 0, 1])^3
// ➔ 1 + AlgebraicGenerator([-1,-1,0,1])
N(algebraicGenerator([-2, 0, 1]))
// ➔ AlgebraicGenerator([-2,0,1])
```

<MathJson name="AlgebraicGenerator">

`["AlgebraicGenerator", ["List", c0, c1, ...]]`.

```json example
["Factor",
  ["Add", ["Power", "x", 4], ["Multiply", -10, ["Power", "x", 2]], 1],
  "x",
  ["AlgebraicGenerator", ["List", 1, 0, -10, 0, 1]]]
// ➔ four linear factors in α = AlgebraicGenerator([1, 0, -10, 0, 1])
["Power", ["AlgebraicGenerator", ["List", -2, 0, 1]], 2]
// ➔ 2
```

</MathJson>

### apart

MathJSON `Apart` · `(value, symbol?) -> value`

Alias for PartialFraction. Decompose a rational expression into partial fractions.

### cancel

`(value, symbol?) -> value`

Cancel common polynomial factors in the numerator and denominator of a rational expression. Example: Cancel((x² - 1)/(x - 1), x) → x + 1

The like terms of the result are collected. With no variable and no single
free variable, nothing is canceled, but the like terms are still collected.

```epsil
[cancel((x^2 - 1)/(x - 1)), cancel(a + a)]
// ➔ [x + 1,2a]
```

<MathJson name="Cancel">

`["Cancel", expr]`, `["Cancel", expr, var]`.

```json example
["Cancel", ["Divide", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1]], "x"]
// ➔ ["Add", "x", 1]
```

</MathJson>

### coefficientList

`(value, symbol?) -> list<value>`

Return the list of coefficients of a polynomial, from highest to lowest degree. Example: CoefficientList(x³ + 2x + 1, x) → [1, 0, 2, 1]

The first element is the leading coefficient, and the last is the constant
term. `polynomial` is the inverse: `polynomial(coefficientList(p, x), x)` is
`p`.

```epsil
[coefficientList(x^3 + 2x + 1), polynomial([1, 0, 2, 1], x)]
// ➔ [[1,0,2,1],x^3 + 2x + 1]
```

In JavaScript, the methods
[`polynomialCoefficients()`](/compute-engine/api/#polynomialcoefficients) and
[`polynomialRoots()`](/compute-engine/api/#polynomialroots) of an expression
give the coefficients and the roots.

<MathJson name="CoefficientList">

`["CoefficientList", poly]`, `["CoefficientList", poly, var]`.

```json example
["CoefficientList", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ ["List", 1, 0, 2, 1]
```

</MathJson>

### discriminant

`(value, symbol?) -> value`

Return the discriminant of a polynomial. Example: Discriminant(x² - 5x + 6, x) → 1

`discriminant` handles polynomials of degree 2, 3 and 4, also with symbolic
coefficients. For `a x^2 + b x + c` it is `b^2 - 4ac`. A discriminant of `0`
means a repeated root, and for a quadratic with real coefficients, a negative
discriminant means no real root.

```epsil
[discriminant(x^2 - 5x + 6), discriminant(x^2 + 1)]
// ➔ [1,-4]
discriminant(a * x^2 + b * x + c, x)
// ➔ b^2 - 4a * c
discriminant(a * x^3 + b * x^2 + c * x + d, x)
// ➔ -4d * b^3 - 4a * c^3 + b^2 * c^2 - 27a^2 * d^2 + 18a * b * c * d
```

<MathJson name="Discriminant">

`["Discriminant", poly]`, `["Discriminant", poly, var]`.

```json example
["Discriminant", ["Add", ["Power", "x", 2], ["Multiply", -5, "x"], 6], "x"]
// ➔ 1
```

</MathJson>

### distribute

`(value) -> value`

Distribute multiplication over addition

```epsil
distribute(a * (b + c))
// ➔ a * b + a * c
```

<MathJson name="Distribute">

`["Distribute", expr]`.

```json example
["Distribute", ["Multiply", "a", ["Add", "b", "c"]]]
// ➔ ["Add", ["Multiply", "a", "b"], ["Multiply", "a", "c"]]
```

</MathJson>

### expand

`(value) -> value`

Expand out products and positive integer powers

`expand` multiplies out the products and positive integer powers at the top
level of an expression; `expandAll` does it in every subexpression too.

```epsil
[expand((x + 1)^2), expand(sin((x + 1)^2)), expandAll(sin((x + 1)^2))]
// ➔ [x^2 + 2x + 1,sin((x + 1)^2),sin(x^2 + 2x + 1)]
```

A fraction is expanded into a sum of fractions:

```epsil
[expand((x + 1)^2 / y), expandAll(((x + 1) * 3)^2)]
// ➔ [x^2 / y + (2x) / y + 1 / y,9x^2 + 18x + 9]
```

<MathJson name="Expand">

`["Expand", expr]`.

```json example
["Expand", ["Power", ["Add", "x", 1], 2]]
// ➔ ["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```

</MathJson>

### expandAll

`(value) -> value`

Recursively expand out products and positive integer powers

<MathJson name="ExpandAll">

`["ExpandAll", expr]`.

</MathJson>

### factor

`(value, symbol?, value?) -> value`

Factor a polynomial expression into a product of irreducible factors. Uses exact modular factorization for univariate rational polynomials within its work limits, with structural methods for other expressions. Without a variable, a factor common to every term of a sum is taken out, a term that is not a polynomial (such as sin(t)) is treated as a variable, and like terms are collected. An optional third argument selects the generator of an exact number field. Example: Factor(x² + 5x + 6) → (x+2)(x+3), Factor(x² + 2x + 1) → (x+1)²

`factor(expr)`, `factor(expr, var)` or `factor(expr, var, generator)`
writes a polynomial as a product of irreducible factors.

- **A polynomial in one variable with rational coefficients** is factored
  completely over the rationals, within the work limits of the engine, also
  when no root is rational.
- **The content**, the GCD of the integer coefficients, is taken out first,
  and so is a factor common to every term.
- **Other expressions** are factored by structure: perfect squares and
  differences of squares.

```epsil
[factor(x^4 + 4), factor(6x^2 + 12x + 6), factor(4x^2 + 12x + 9)]
// ➔ [(x^2 - 2x + 2) * (x^2 + 2x + 2),6(x + 1)^2,(2x + 3)^2]
[factor(x^2 - 4), factor(x^3 - 6x^2 + 11x - 6)]
// ➔ [(x - 2) * (x + 2),(x - 3) * (x - 2) * (x - 1)]
```

A difference of squares is factored again until its factors are
irreducible, so `x^6 - 1` gives its cyclotomic factors:

```epsil
factor(x^6 - 1)
// ➔ (x^2 + x + 1) * (x^2 - x + 1) * (x - 1) * (x + 1)
```

The factors are polynomials in the variable: `factor` never introduces a
square root or an absolute value of the variable, so `x^3 - 1` is
`(x - 1)(x^2 + x + 1)`, not `(x sqrt(x) - 1)(x sqrt(x) + 1)`. Without a
generator, the coefficients of the factors are rational.

**Several variables, and terms that are not polynomials.** Without a
variable, `factor` takes out a factor common to every term of a sum, and it
treats a term that is not a polynomial, such as `sin(t)`, as a variable of
its own. The like terms of the result are collected. A call of a function
that is not declared, such as `f(t)`, is not taken out as a common factor,
because its value could be a matrix.

```epsil
[factor(a * x + a * y), factor(sin(t) + sin(t))]
// ➔ [a * (x + y),2sin(t)]
factor(x * sin(t) + y * sin(t))
// ➔ (x + y) * sin(t)
```

`simplify` uses factoring: `simplify(sqrt(x^2 + 2x + 1))` is `|x + 1|`.
Evaluation alone leaves the square root as it is.

```epsil
[simplify(sqrt(x^2 + 2x + 1)), sqrt(x^2 + 2x + 1)]
// ➔ [|x + 1|,sqrt(x^2 + 2x + 1)]
```

#### Factoring over a number field

With a third argument, `factor(expr, var, generator)` factors over the
rationals extended by the algebraic number that the generator selects. A
polynomial that is irreducible over the rationals can split over such a
field. The generator can be:

- an exact root of a rational number, such as `sqrt(2)`, `sqrt(-3)` or
  `root(2, 3)`;
- `i`;
- an `algebraicGenerator`, for any other algebraic number, given by its
  defining polynomial.

```epsil
[factor(x^2 - 2, x, sqrt(2)), factor(x^2 + 1, x, i)]
// ➔ [(x - sqrt(2)) * (x + sqrt(2)),(x - i) * (x + i)]
factor(x^4 + 1, x, sqrt(2))
// ➔ (x^2 - sqrt(2) * x + 1) * (x^2 + sqrt(2) * x + 1)
```

The result is exact, also with `N`. The coefficients of the expression must
be exact rational numbers, the generator, and sums and products of these. The
variable must be a symbol.

A request stays unevaluated when the engine cannot answer it: a coefficient
it cannot read (another symbol, a float, an unrelated radical), a generator
that is not supported, or a request too large for the work limits. The engine
never factors over the rationals instead, and **an unevaluated result is not
a proof that the polynomial is irreducible**. A polynomial that is
irreducible over the field is returned unchanged.

```epsil
[factor(x^2 - y, x, sqrt(2)), factor(x^2 - 3, x, sqrt(2))]
// ➔ [Factor(x^2 - y, x, sqrt(2)),x^2 - 3]
```

<MathJson name="Factor">

`["Factor", expr]`, `["Factor", expr, var]`, `["Factor", expr, var, generator]`.

```json example
["Factor", ["Add", ["Power", "x", 2], ["Multiply", 5, "x"], 6]]
// ➔ ["Multiply", ["Add", "x", 2], ["Add", "x", 3]]
["Factor", ["Subtract", ["Power", "x", 2], 2], "x", ["Sqrt", 2]]
// ➔ (x-√2)(x+√2)
["Factor", ["Add", ["Power", "x", 2], 1], "x", "ImaginaryUnit"]
// ➔ (x-i)(x+i)
```

In LaTeX: `\operatorname{Factor}(x^2-2, x, \sqrt{2})`.

</MathJson>

### partialFraction

`(value, symbol?) -> value`

Decompose a rational expression into partial fractions. Example: PartialFraction(1/((x+1)(x+2)), x) → 1/(x+1) - 1/(x+2)

`partialFraction` handles distinct linear factors, repeated linear factors
and irreducible quadratic factors of the denominator. A fraction whose
numerator has the higher degree is divided first, and the proper remainder is
decomposed. An expression that is not a rational function of the variable, or
whose denominator cannot be factored, is returned unchanged.

```epsil
[partialFraction((3x + 5)/(x + 1)^2), partialFraction((x^3 + 1)/(x^2 - 1))]
// ➔ [2 / (x + 1)^2 + 3 / (x + 1),x + 1 / (x - 1)]
partialFraction(1/((x + 1) * (x^2 + 1)))
// ➔ (1 - x) / (2(x^2 + 1)) + 1 / (2(x + 1))
partialFraction(sin(x)/(x + 1))
// ➔ sin(x) / (x + 1)
```

<MathJson name="PartialFraction">

`["PartialFraction", expr]`, `["PartialFraction", expr, var]`. `Apart` is
the same function.

```json example
["PartialFraction", ["Divide", 1, ["Multiply", ["Add", "x", 1], ["Add", "x", 2]]], "x"]
// ➔ ["Add", ["Divide", 1, ["Add", "x", 1]], ["Divide", -1, ["Add", "x", 2]]]
```

</MathJson>

### polynomial

`(list<value>, symbol) -> value`

Construct a polynomial from a list of coefficients (highest to lowest degree) and a variable. Example: Polynomial([1, 0, 2, 1], x) → x³ + 2x + 1

<MathJson name="Polynomial">

`["Polynomial", coefficients, var]`, with the coefficients from the highest
degree to the lowest.

```json example
["Polynomial", ["List", 1, 0, 2, 1], "x"]
// ➔ ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1]
```

</MathJson>

### polynomialDegree

`(value, symbol?) -> integer`

Return the degree of a polynomial with respect to a variable. Example: PolynomialDegree(x³ + 2x + 1, x) → 3

<MathJson name="PolynomialDegree">

`["PolynomialDegree", poly]`, `["PolynomialDegree", poly, var]`.

```json example
["PolynomialDegree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ 3
```

</MathJson>

### polynomialGCD

`(a: value, b: value, variable: symbol?) -> value`

Return the greatest common divisor of two polynomials. Example: PolynomialGCD(x² - 1, x - 1, x) → x - 1

Unlike `gcd`, `polynomialGCD` gives `1` for coprime polynomials.

```epsil
polynomialGCD(x^2 - 1, x - 1)
// ➔ x - 1
```

<MathJson name="PolynomialGCD">

`["PolynomialGCD", a, b]`, `["PolynomialGCD", a, b, var]`.

```json example
["PolynomialGCD", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Subtract", "x", 1]
```

</MathJson>

### polynomialQuotient

`(dividend: value, divisor: value, variable: symbol?) -> value`

Return the quotient of polynomial division of dividend by divisor. Example: PolynomialQuotient(x³ - 1, x - 1, x) → x² + x + 1

<MathJson name="PolynomialQuotient">

`["PolynomialQuotient", dividend, divisor]`,
`["PolynomialQuotient", dividend, divisor, var]`.

```json example
["PolynomialQuotient", ["Subtract", ["Power", "x", 3], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Add", ["Power", "x", 2], "x", 1]
```

</MathJson>

### polynomialRemainder

`(dividend: value, divisor: value, variable: symbol?) -> value`

Return the remainder of polynomial division of dividend by divisor. Example: PolynomialRemainder(x³ + 2x + 1, x + 1, x) → -2

<MathJson name="PolynomialRemainder">

`["PolynomialRemainder", dividend, divisor]`,
`["PolynomialRemainder", dividend, divisor, var]`.

```json example
["PolynomialRemainder", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], ["Add", "x", 1], "x"]
// ➔ -2
```

</MathJson>

### polynomialRoots

`(value, symbol?) -> set<value>`

Return the roots of a polynomial expression. Example: PolynomialRoots(x² - 5x + 6, x) → &#123;2, 3&#125;

The result is a set. Roots are found exactly for polynomials of degree up to
4 with rational roots, and of degree 2 with irrational or complex roots. An
expression that is not a polynomial stays unevaluated.

```epsil
[polynomialRoots(x^2 - 5x + 6), polynomialRoots(x^2 - 2)]
// ➔ [Set(2, 3),Set(-sqrt(2), sqrt(2))]
polynomialRoots(x^2 + 1)
// ➔ Set(-i, i)
polynomialRoots(sin(x))
// ➔ PolynomialRoots(sin(x))
```

<MathJson name="PolynomialRoots">

`["PolynomialRoots", poly]`, `["PolynomialRoots", poly, var]`.

```json example
["PolynomialRoots", ["Add", ["Power", "x", 2], ["Multiply", -5, "x"], 6], "x"]
// ➔ ["Set", 2, 3]
```

</MathJson>

### resultant

MathJSON `Resultant` · `(a: value, b: value, variable: symbol?) -> value`

Return the resultant of two polynomials with respect to a variable. It is zero iff the polynomials share a common factor. Example: Resultant(x² - 1, x - 1, x) → 0

### together

`(value) -> value`

Combine rational expressions into a single fraction

The like terms of the result are collected, also when there is nothing to
combine:

```epsil
[together(1/x + 1/y), together(a + a)]
// ➔ [(x + y) / (x * y),2a]
```

<MathJson name="Together">

`["Together", expr]`.

```json example
["Together", ["Add", ["Divide", 1, "x"], ["Divide", 1, "y"]]]
// ➔ ["Divide", ["Add", "x", "y"], ["Multiply", "x", "y"]]
```

</MathJson>
