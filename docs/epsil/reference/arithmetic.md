---
title: Arithmetic Reference
sidebar_label: Arithmetic
slug: /reference/arithmetic/
description: "The arithmetic library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from arithmetic.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Arithmetic

The **arithmetic** library holds the numeric operations: the arithmetic
operators, powers and roots, exponentials and logarithms, rounding, the
number-theory predicates, sums and products, the special functions (gamma,
zeta, Bessel, Airy), the parts of a complex number, and the numeric constants.
This introduction gives the concepts you need before you read the entries.

## Operators and precedence

Most arithmetic is written with operators. You write the operator, and the
engine receives the definition. The entries list these definitions under their
MathJSON name.

| Epsil syntax | Definition  | Meaning                                  |
| :----------- | :---------- | :--------------------------------------- |
| `a + b`      | `Add`       | Sum                                      |
| `a - b`      | `Subtract`  | Difference                               |
| `-a`         | `Negate`    | Additive inverse                         |
| `a * b`      | `Multiply`  | Product                                  |
| `a / b`      | `Divide`    | Quotient                                 |
| `a % b`      | `Mod`       | Remainder of the floored division        |
| `a ^ b`, `a ** b` | `Power` | Exponentiation                          |
| `n!`         | `Factorial` | Factorial                                |
| `√x`, `∛x`   | `Sqrt`, `Root` | Square root and cube root             |

From the loosest to the tightest, the arithmetic operators group in this
order: `+` and `-`, then `*`, `/` and `%`, then the prefix `-`, then `^`, then
the postfix `!`. The operators of one tier group from the left, except `^`,
which groups from the right. A prefix `-` binds looser than `^`, so `-3^2` is
`-(3^2)`.

```epsil
[2 + 3 * 4, (2 + 3) * 4, 7 / 2 * 2, 2^3^2, -3^2, 2 * 3!]
// ➔ [14, 20, 7, 512, -9, 12]
```

An infix operator must have a space on both sides or on neither side. The
[Operators](/operators/) page gives the full table and the whitespace
rule.

## Exact and numeric evaluation

The engine keeps a value **exact** when it can. A fraction stays a fraction, a
radical stays a radical, and a function of an exact argument with no closed
form stays symbolic. `N` gives the numeric value:

```epsil
[1/3 + 1/6, sqrt(8), ln(2), ln(8, 2)]
// ➔ [1/2, 2sqrt(2), ln(2), 3]
```

```epsil
[N(1/3), N(sqrt(8)), N(ln(2))]
// ➔ [0.333333333333333333333, 2.8284271247461900976, 0.693147180559945309417]
```

A number written with a decimal point or an exponent, such as `2.5` or
`1.5e3`, is a floating-point number. A function of a floating-point argument
gives a floating-point value:

```epsil
[ln(2), ln(2.5), sqrt(2), sqrt(2.5)]
// ➔ [ln(2), 0.916290731874155065184, sqrt(2), 1.581138830084189666]
```

`N` takes an optional number of significant digits:

```epsil
N(sqrt(2), 50)
// ➔ 1.4142135623730950488016887242096980785696718753769
```

Use `rational` to change a float to the nearest simple fraction:

```epsil
[rational(0.42), rational(1.25)]
// ➔ [21/50, 5/4]
```

## Kinds of numbers

The numeric types form a chain: every `integer` is a `rational`, every
`rational` is a `real`, and every `real` is a `complex`. `number` is the widest
numeric type. It holds the finite numbers, the infinities and `NaN`. Test the
type of a value with `is`:

```epsil
[5 is integer, 1/2 is integer, 1/3 is rational, sqrt(2) is rational, sqrt(2) is real]
// ➔ [True, False, True, False, True]
```

The types `integer`, `rational`, `real` and `complex` hold **finite** values
only. An infinity is a `number`, but it is not a `real`:

```epsil
[oo is real, oo is number]
// ➔ [False, True]
```

A complex number is written with the imaginary unit `i`. The square root of a
negative number is imaginary, and the real root of a negative number is real:

```epsil
[(1 + 2i) * (3 - i), sqrt(-4), root(-8, 3)]
// ➔ [(5 + 5i), 2i, -2]
```

`re`, `im`, `abs`, `arg` and `conjugate` give the parts of a complex number:

```epsil
[re(3 + 4i), im(3 + 4i), abs(3 + 4i), conjugate(3 + 4i)]
// ➔ [3, 4, 5, (3 - 4i)]
```

## The canonical form of sums and products

The engine puts every sum and product in a **canonical form** before it
evaluates it. This has visible effects:

- The exact numbers of a sum or product are combined: `x + 2 + 3` becomes
  `x + 5`.
- Equal terms are collected, and equal factors become a power.
- The operands are sorted in a fixed order, so `x + 1` and `1 + x` are the
  same expression.

```epsil
[x + 2 + 3 + x, 2 * x + 3 * x - x, x * x * 2 * y]
// ➔ [2x + 5, 4x, 2y * x^2]
```

A product of sums stays **factored**, and a power of a sum is not expanded.
Use `expand` to multiply them out:

```epsil
[(a + b) * (c + d), expand((a + b) * (c + d))]
// ➔ [(a + b) * (c + d), a * c + b * c + a * d + b * d]
```

```epsil
[(a + b)^2, expand((a + b)^2)]
// ➔ [(a + b)^2, a^2 + b^2 + 2a * b]
```

A sum still collects like terms, and to do this it opens a factored term:

```epsil
a + b + 2 * (a + b)
// ➔ 3a + 3b
```

When `x` has no value, `x / x` becomes `1` and `x - x` becomes `0`. The
first rule assumes that `x` is not zero.

```epsil
[x / x, x - x]
// ➔ [1, 0]
```

## Infinity and NaN

A result can leave the finite numbers in two ways, and the engine keeps them
apart.

- A **pole**, such as a nonzero number divided by zero, gives complex
  infinity (`complexInfinity`, displayed as `~oo`): an infinity with no
  direction. Arithmetic on a signed
  infinity (`oo`, `-oo`) gives a signed infinity.
- An **indeterminate form**, such as `0/0`, `oo - oo` or `oo * 0`, gives
  `NaN`: a question with no value.

```epsil
[1/0, 0/0, oo + 1, oo - oo, oo * 0, 1/oo]
// ➔ [~oo, NaN, +oo, NaN, NaN, 0]
```

`NaN` propagates: a numeric function of `NaN` is `NaN`. This is true for
evaluation as well as for `N`.

```epsil
[NaN + 1, sqrt(NaN), NaN % 2]
// ➔ [NaN, NaN, NaN]
```

## Rounding and remainders

`floor` rounds down, `ceil` rounds up, `truncate` rounds toward zero, and
`round` rounds to the nearest integer, with a tie rounded away from zero (a
host can choose another rule with the engine setting `roundingTies`):

```epsil
[floor(-2.5), ceil(-2.5), truncate(-2.5), round(-2.5)]
// ➔ [-3, -2, -2, -3]
```

With a second argument, `floor`, `ceil`, `truncate` and `round` round to a
multiple of that step instead of an integer. `floor(x, step)` is the greatest
multiple of the step that is at most `x`, whatever the sign of the step, and
`round(x, step)` the nearest multiple. To round to `n` decimal places, the
step is `10^-n`:

```epsil
[floor(226, 10), ceil(226, 10), truncate(-226, 10), round(226, 10), round(3.14159, 1/100)]
// ➔ [220, 230, -220, 230, 157/50]
```

There are two remainders. `a % b` (`Mod`) takes the sign of the divisor `b`.
`remainder(a, b)` rounds the quotient to the nearest integer, so its result
can be negative when `b` is positive:

```epsil
[7 % 3, -7 % 3, 7 % -3, remainder(-7, 3)]
// ➔ [1, 2, -2, -1]
```

## Sums and products

`sum` and `product` have three forms.

With a collection, they add or multiply its elements. When some elements are
not numbers, the result is a sum or a product:

```epsil
[sum([5, 7, 11]), sum([5, 7, x, y]), product([5, 7, 11])]
// ➔ [23, x + y + 12, 385]
```

With a body and a bound `(k, lower, upper)`, they add or multiply the body
for each integer `k` from `lower` to `upper`:

```epsil
[sum(k + 1, (k, 1, 10)), product(k + 1, (k, 1, 10))]
// ➔ [65, 39916800]
```

With a body and an indexing set `k in S`, the index takes each value of the
set:

```epsil
sum(n^2, n in {1, 2, 3})
// ➔ 14
```

A sum over an infinite range has an exact value when it is a known convergent
series, such as a p-series, a geometric series or the exponential series.
Otherwise it stays symbolic, and `N` gives a numeric approximation.

```epsil
[sum(1/k^2, (k, 1, oo)), sum((1/2)^k, (k, 0, oo)), sum(x^k/k!, (k, 0, oo))]
// ➔ [1/6 * pi^2, 2, e^x]
```

A sum with a symbolic bound stays a sum when it is evaluated. `simplify`
replaces it by a closed form when it knows one:

```epsil
simplify(sum(k^2, (k, 1, n)))
// ➔ 1/6 * (2n^3 + 3n^2 + n)
```

## Constants

| Epsil          | Value                | Meaning                                         |
| :------------- | :------------------- | :---------------------------------------------- |
| `e`            | 2.718281828…         | Euler's number, the base of the natural logarithm |
| `i`            | `sqrt(-1)`           | The imaginary unit                              |
| `oo`, `-oo`    |                      | Positive and negative infinity                  |
| `complexInfinity` |                   | Complex infinity, with no direction             |
| `NaN`          |                      | Not a number                                    |
| `goldenRatio`  | 1.618033988…         | `(1 + sqrt(5)) / 2`                             |
| `eulerGamma`   | 0.577215664…         | The Euler–Mascheroni constant                   |
| `catalanConstant` | 0.915965594…      | Catalan's constant                              |
| `machineEpsilon` | 2.220446049…e-16   | The distance from 1 to the next larger machine float |

A constant is exact. `N` gives its numeric value:

```epsil
[ln(e^3), N(goldenRatio)]
// ➔ [3, 1.6180339887498948482]
```

The constant `pi` and the trigonometric functions are in the
[Trigonometry](/reference/trigonometry/) library.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### abs

`(complex | infinity | quantity) -> number`

Absolute value (magnitude) of a number.

```epsil
[abs(-3), abs(3 - 4i)]
// ➔ [3,5]
```

<MathJson name="Abs" latex={["|"]} />

### absArg

MathJSON `AbsArg` · `(complex | infinity) -> tuple<+oo | real, real>`

Tuple of magnitude and argument of a complex number.

```epsil
[absArg(1 + i), absArg(-2)]
// ➔ [(sqrt(2), 1/4 * pi),(2, pi)]
```

### Add

`(value+) -> value`

Sum of two or more values.

```epsil
1 + x + 2 + x
// ➔ 2x + 3
```

<MathJson name="Add" latex={["+"]} />

### airyAi

`(complex | infinity) -> number`

Airy function of the first kind

```epsil
N(airyAi(1))
// ➔ 0.135292416312881415524
```

<MathJson name="AiryAi" latex={["\\operatorname{Ai}"]} />

### airyAiPrime

MathJSON `AiryAiPrime` · `(complex | infinity) -> number`

Derivative of the Airy function of the first kind

```epsil
N(airyAiPrime(0))
// ➔ -0.2588194037928068
```

### airyBi

`(complex | infinity) -> number`

Airy function of the second kind

```epsil
N(airyBi(0))
// ➔ 0.614926627446000735151
```

<MathJson name="AiryBi" latex={["\\operatorname{Bi}"]} />

### airyBiPrime

MathJSON `AiryBiPrime` · `(complex | infinity) -> number`

Derivative of the Airy function of the second kind

```epsil
N(airyBiPrime(0))
// ➔ 0.4482883573538264
```

### arg

MathJSON `Arg` · `(complex | infinity) -> number`

`Arg` is an alias for `Argument`, which is the preferred name. Returns the complex argument (phase angle) of a number.

```epsil
[arg(i), arg(1 + i)]
// ➔ [1/2 * pi,1/4 * pi]
```

### argument

`(complex | infinity) -> number`

Complex argument (phase angle) of a number, in the engine's angular unit.

```epsil
[argument(1 + i), argument(-1)]
// ➔ [1/4 * pi,pi]
```

<MathJson name="Argument" latex={["\\arg"]} />

### besselI

`(order: complex, complex | infinity) -> number`

Modified Bessel function of the first kind

```epsil
N(besselI(0, 1))
// ➔ 1.2660658777520083356
```

<MathJson name="BesselI" latex={["\\operatorname{I}"]} />

### besselJ

`(order: complex, complex | infinity) -> number`

Bessel function of the first kind

```epsil
N(besselJ(0, 1))
// ➔ 0.76519768655796655145
```

<MathJson name="BesselJ" latex={["\\operatorname{J}"]} />

### besselK

`(order: complex, complex | infinity) -> number`

Modified Bessel function of the second kind (Macdonald function)

```epsil
N(besselK(0, 1))
// ➔ 0.421024438240708333336
```

<MathJson name="BesselK" latex={["\\operatorname{K}"]} />

### besselY

`(order: complex, complex | infinity) -> number`

Bessel function of the second kind (Neumann function)

```epsil
N(besselY(0, 1))
// ➔ 0.0882569642156769579829
```

<MathJson name="BesselY" latex={["\\operatorname{Y}"]} />

### beta

`(complex | infinity, complex | infinity, (complex | infinity)?, (complex | infinity)?) -> number`

Euler beta function

```epsil
[beta(2, 3), N(beta(1/2, 1/2))]
// ➔ [1/12,3.14159265358979323846]
```

```epsil
beta(1/2, 2, 3)
// ➔ 11/192
```

```epsil
beta(1/4, 1/2, 2, 3)
// ➔ 109/3072
```

<MathJson name="Beta" latex={["\\Beta"]} />

### catalanConstant

constant `real<0.915965594177219..0.9159655941772191>` = `0.915965594177219015055`

Catalan's constant G ≈ 0.9160.

```epsil
N(catalanConstant)
// ➔ 0.915965594177219015055
```

<MathJson name="CatalanConstant" latex={["\\operatorname{G}"]} />

### ceil

`(x: real | signed_infinity | ~oo, step: real?) -> real | signed_infinity | ~oo`

Rounds a number up to the next largest integer, or with a step to the least multiple of the step that is at least the number.

```epsil
[ceil(2.3), ceil(-2.7), ceil(226, 10)]
// ➔ [3,-2,230]
```

<MathJson name="Ceil" latex={["\\lceil","\\rceil"]} />

### chop

`(T, real<0..>?) -> T where T: number`

Replace tiny numeric values with zero.

```epsil
chop([1e-20, 0.5, 3 + 1e-15i])
// ➔ [0,0.5,3]
```

```epsil
chop([0.004, 0.5, 3 + 0.002i], 0.01)
// ➔ [0,0.5,3]
```

<MathJson name="Chop" latex={["chop"]} />

### clamp

`(real | signed_infinity, real | signed_infinity, real | signed_infinity) -> real | signed_infinity`

Clamp a value to the range [lo, hi] = min(max(x, lo), hi). Broadcasts over collection arguments.

```epsil
[clamp(12, 0, 10), clamp(-3, 0, 10), clamp(5, 0, 10)]
// ➔ [10,0,5]
```

`clamp(value, lower, upper)` is `lower` when the value is less than `lower`,
`upper` when it is greater than `upper`, and the value otherwise. The bounds
can be infinite. All three arguments are required.

```epsil
[clamp(4.2, -1, 1), clamp(-5, 0, oo), clamp(100, 0, 11)]
// ➔ [1,0,11]
clamp(0.42)
// ➔ error: Static error: a required argument is missing in `clamp(0.42)`
```

<MathJson name="Clamp">

`["Clamp", value, lower, upper]`.

```json example
["Clamp", 4.2, -1, 1]
// ➔ 1
["Clamp", -5, 0, "PositiveInfinity"]
// ➔ 0
```

</MathJson>

### complex

MathJSON `Complex` · `(real: number, imaginary: number) -> complex`

Construct a complex number from real and imaginary parts. Converted directly to a BoxedNumber during boxing; this entry exists so `operatorInfo("Complex")` returns a signature.

```epsil
[complex(3, 4), complex(1, -2)]
// ➔ [(3 + 4i),(1 - 2i)]
```

### complexInfinity

constant `number` = `~oo`

Complex infinity, a single unsigned infinity in the complex plane.

```epsil
[1/0, complexInfinity + 1]
// ➔ [~oo,~oo]
```

<MathJson name="ComplexInfinity" latex={["\\tilde\\infty"]} />

### complexRoots

MathJSON `ComplexRoots` · `(complex, integer) -> list<number>`

All n-th complex roots of a number.

```epsil
complexRoots(1, 4)
// ➔ [1,i,-1,-i]
```

```epsil
complexRoots(8, 3)
// ➔ [2,-1 + sqrt(3)i,-1 - sqrt(3)i]
```

### conjugate

`(T) -> T where T: number`

Complex conjugate of a number, or the pointwise conjugate of a function.

```epsil
conjugate(3 + 4i)
// ➔ (3 - 4i)
```

<MathJson name="Conjugate" latex={["\\overline"]} />

### ContinuationPlaceholder

constant `unknown`

This symbol indicates that some elements in a collection have been omitted, for example in a long list of numbers, or in an infinite set

```epsil
[1, 2, ContinuationPlaceholder, 10]
// ➔ [1,2,...,10]
```

<MathJson name="ContinuationPlaceholder" latex={["\\dots"]} />

### denominator

`(number) -> nothing | number`

Denominator of an expression

```epsil
[denominator(3/4), denominator(x / y)]
// ➔ [4,y]
```

A fraction written in the call is not reduced first: `denominator(4/8)` is
`8`.

```epsil
denominator(4/8)
// ➔ 8
```

<MathJson name="Denominator">

`["Denominator", expr]`. The argument can be in a non-canonical form.

```json example
["Denominator", ["Rational", 4, 5]]
// ➔ 5
```

</MathJson>

### digamma

MathJSON `Digamma` · `(complex | infinity) -> number`

Digamma function, the logarithmic derivative of the gamma function

```epsil
[digamma(1), N(digamma(1))]
// ➔ [-"EulerGamma",-0.577215664901532860607]
```

### dirichletBeta

MathJSON `DirichletBeta` · `(complex | infinity) -> number`

Dirichlet beta function β(s) = Σ_&#123;n≥0&#125; (−1)^n/(2n+1)^s = 4^(−s) (ζ(s, 1/4) − ζ(s, 3/4)), entire; β(1) = π/4, β(2) = G, β(+∞) = 1.

```epsil
[dirichletBeta(1), dirichletBeta(3), N(dirichletBeta(1/2))]
// ➔ [1/4 * pi,1/32 * pi^3,0.667691457189609176659]
```

### dirichletEta

MathJSON `DirichletEta` · `(complex | infinity) -> number`

Dirichlet eta function η(s) = Σ_&#123;n≥1&#125; (−1)^(n−1)/n^s = (1 − 2^(1−s)) ζ(s), entire; η(1) = ln 2, η(+∞) = 1.

```epsil
[dirichletEta(2), dirichletEta(1), N(dirichletEta(1/2))]
// ➔ [1/12 * pi^2,ln(2),0.604898643421630370247]
```

### distance

`(list<list<number>> | list<number> | list<tuple> | tuple, list<list<number>> | list<number> | list<tuple> | tuple) -> number`

Euclidean distance between two points, broadcasting over a list of points.

```epsil
[distance((0, 0), (3, 4)), distance([1, 2, 3], [4, 6, 3])]
// ➔ [5,5]
```

<MathJson name="Distance" latex={["\\operatorname{distance}"]} />

### Divide

`(complex | infinity, (complex | infinity)+) -> number`

Quotient of a numerator and one or more denominators.

```epsil
[6 / 4, x / 2]
// ➔ [3/2,1/2 * x]
```

<MathJson name="Divide" latex={["\\frac"]} />

### elementMax

MathJSON `ElementMax` · `(real | signed_infinity, (real | signed_infinity)+) -> real | signed_infinity`

Element-wise maximum: broadcasts scalars over collections (and zips collections), returning a collection; all-scalar arguments give a scalar. Variadic.

```epsil
elementMax([1, 5, 3], [4, 2, 6])
// ➔ [4,5,6]
```

### elementMin

MathJSON `ElementMin` · `(real | signed_infinity, (real | signed_infinity)+) -> real | signed_infinity`

Element-wise minimum: broadcasts scalars over collections (and zips collections), returning a collection; all-scalar arguments give a scalar. Variadic.

```epsil
elementMin([1, 5, 3], [4, 2, 6])
// ➔ [1,2,3]
```

### enclosure

MathJSON `Enclosure` · `(nan | real | set<real> | signed_infinity, (nan | real | signed_infinity)?) -> enclosure | nan`

A closed interval [lo, hi] that encloses one real number, with interval arithmetic.

```epsil
enclosure(0, 1) + enclosure(1/3, 2)
// ➔ Enclosure(1/3, 3)
```

```epsil
sin(enclosure(0, pi))
// ➔ Enclosure(0, 1)
```

```epsil
N(enclosure(0, pi))
// ➔ Enclosure(0, 3.1415926535897936)
```

### eulerGamma

constant `real<0.5772156649015328..0.5772156649015329>` = `0.577215664901532860607`

The Euler–Mascheroni constant γ ≈ 0.5772.

```epsil
N(eulerGamma)
// ➔ 0.577215664901532860607
```

<MathJson name="EulerGamma" latex={["\\gamma"]} />

### exp

MathJSON `Exp` · `(number) -> number`

Natural exponential function: e^x. Applied to a matrix (or any collection), it broadcasts ELEMENTWISE — it is NOT the matrix exponential e^M (which is not currently implemented).

```epsil
[exp(1), exp(ln(x)), N(exp(2))]
// ➔ [e,x,7.38905609893065022723]
```

Applied to a matrix, `exp` applies to each element. It is not the matrix
exponential.

```epsil
exp([[0, 0], [0, ln(2)]])
// ➔ [[1,1],[1,2]]
```

### exp2

MathJSON `Exp2` · `(number) -> number`

Base-2 exponential: 2^x

```epsil
[exp2(10), exp2(1/2)]
// ➔ [1024,sqrt(2)]
```

### exponentialE

constant `real<2.718281828459045..2.718281828459046>` = `2.71828182845904523536`

Euler's number e ≈ 2.71828, the base of the natural logarithm.

```epsil
[ln(exponentialE^2), N(exponentialE)]
// ➔ [2,2.71828182845904523536]
```

<MathJson name="ExponentialE" latex={["\\exponentialE"]} />

### Factorial

`(complex | infinity) -> number`

Factorial function: the product of all positive integers less than or equal to n

```epsil
[5!, 20!]
// ➔ [120,2432902008176640000]
```

<MathJson name="Factorial" latex={["!"]} />

### factorial2

`(complex | infinity) -> number`

Double Factorial Function

```epsil
[factorial2(7), factorial2(8)]
// ➔ [105,384]
```

<MathJson name="Factorial2" latex={["!!"]} />

### floor

`(x: real | signed_infinity | ~oo, step: real?) -> real | signed_infinity | ~oo`

Rounds a number down to the nearest integer, or with a step to the greatest multiple of the step that is at most the number.

```epsil
[floor(2.7), floor(-2.3), floor(226, 10)]
// ➔ [2,-3,220]
```

<MathJson name="Floor" latex={["\\lfloor","\\rfloor"]} />

### fract

MathJSON `Fract` · `(real | signed_infinity | ~oo) -> real<0..1>`

Fractional part of a number: x - floor(x)

```epsil
[fract(3.75), fract(-3.25)]
// ➔ [0.75,0.75]
```

### gcd

`(any*) -> number`

Greatest Common Divisor

```epsil
[gcd(12, 18), gcd(12, 18, 27)]
// ➔ [6,3]
```

`gcd` also gives the greatest common divisor of **polynomials**. When the
arguments are polynomials in the same variable that share a factor, the
variable is inferred, and the result is a monic polynomial. When the
polynomial GCD would be a constant, the expression stays unevaluated, so a
bare symbol keeps its reading as an unknown integer: `gcd(x, 6)` stays as it
is. Use `polynomialGCD` with a variable to get `1` for coprime polynomials.

```epsil
[gcd(60, 12, 18), gcd(x^2 + 3x + 2, x^2 + 4x + 3), gcd(x, 6)]
// ➔ [6,x + 1,gcd(6, x)]
```

<MathJson name="GCD" latex={["\\gcd"]}>

`["GCD", x1, x2, ...]`.

```json example
["GCD", 60, 12, 18]
// ➔ 6
["GCD",
  ["Add", ["Power", "x", 2], ["Multiply", 3, "x"], 2],
  ["Add", ["Power", "x", 2], ["Multiply", 4, "x"], 3]]
// ➔ ["Add", "x", 1]
```

</MathJson>

### gamma

`(complex | infinity, (complex | infinity)?, (complex | infinity)?) -> number`

Gamma function Γ(z); with two arguments, the upper incomplete gamma Γ(s, z) = ∫_z^∞ tˢ⁻¹ e⁻ᵗ dt; with three, Γ(s, z0) − Γ(s, z1).

```epsil
[gamma(1/2), N(gamma(1/2)), N(gamma(5))]
// ➔ [sqrt(pi),1.7724538509055160273,24]
```

```epsil
N(gamma(2, 1))
// ➔ 0.735758882342884643191
```

```epsil
N(gamma(2, 1, 3))
// ➔ 0.536610608871428871274
```

<MathJson name="Gamma" latex={["\\Gamma"]} />

### gammaLn

MathJSON `GammaLn` · `(complex | infinity) -> number`

Natural logarithm of the gamma function.

```epsil
N(gammaLn(100))
// ➔ 359.134205369575398776
```

### goldenRatio

constant `real<1.618033988749894..1.618033988749895>` = `1/2 * (1 + sqrt(5))`

The golden ratio φ = (1+√5)/2 ≈ 1.618.

```epsil
N(goldenRatio)
// ➔ 1.6180339887498948482
```

<MathJson name="GoldenRatio" latex={["\\varphi"]} />

### half

MathJSON `Half` · constant `rational` = `1/2`

The rational number one half (1/2).

```epsil
[half, half + 1]
// ➔ [1/2,3/2]
```

### harmonicNumber

MathJSON `HarmonicNumber` · `(complex | infinity, (complex | infinity)?) -> number`

Harmonic number H_n = Σ_&#123;k=1&#125;^n 1/k, exact at a non-negative integer and continued by ψ(n+1) + γ; with a second argument r, the generalized H_n^(r) = Σ_&#123;k=1&#125;^n 1/k^r = ζ(r) − ζ(r, n+1).

```epsil
[harmonicNumber(10), harmonicNumber(10, 2), N(harmonicNumber(1/2))]
// ➔ [7381/2520,1968329/1270080,0.613705638880109381166]
```

### heaviside

`(real | signed_infinity) -> rational<0..1>`

Heaviside step function.

```epsil
[heaviside(-2), heaviside(0), heaviside(3)]
// ➔ [0,1/2,1]
```

<MathJson name="Heaviside" latex={["Heaviside"]} />

### hurwitzZeta

MathJSON `HurwitzZeta` · `(complex | infinity, complex | infinity, integer?) -> number`

Hurwitz zeta function ζ(s,a) = Σ_&#123;n=0&#125;^∞ (n+a)^&#123;-s&#125;

```epsil
hurwitzZeta(2, 2)
// ➔ -1 + 1/6 * pi^2
```

### im

MathJSON `Im` · `(complex | infinity) -> number`

`Im` is an alias for `Imaginary`, which is the preferred name. Returns the imaginary part of a complex number.

```epsil
im(3 + 4i)
// ➔ 4
```

### imaginary

`(complex | infinity) -> number`

Imaginary part of a complex number.

```epsil
imaginary(3 + 4i)
// ➔ 4
```

<MathJson name="Imaginary" latex={["\\Im"]} />

### imaginaryUnit

constant `imaginary` = `i`

The imaginary unit, whose square is −1.

```epsil
[imaginaryUnit^2, sqrt(-9)]
// ➔ [-1,3i]
```

<MathJson name="ImaginaryUnit" latex={["\\imaginaryI"]} />

### Indeterminate

constant `number` = `NaN`

An input spelling of NaN.

```epsil
[Indeterminate, Indeterminate + 1]
// ➔ [NaN,NaN]
```

### infimum

`(value*) -> number`

Like Min, but defined for open sets.

```epsil
[infimum(1, 3, 2), infimum(interval(0, 1))]
// ➔ [1,0]
```

<MathJson name="Infimum" latex={["\\inf"]} />

### interpret

`(any) -> any`

Interpret a notational expression as its mathematical meaning. In v1: a continuation-bearing `Add`/`Multiply` (e.g. `1 + 2 + \dots + n`) becomes a `Sum`/`Product`. Returns the argument unchanged when the (strict) inference gate does not pass

```epsil
interpret(1 + 2 + ContinuationPlaceholder + n)
// ➔ sum_(k=1)^(n)(k)
```

`interpret` gives a meaning to a sum or product written with an ellipsis,
such as `1 + 2 + … + n`, by turning it into a `sum` or `product`. Such an
expression is otherwise an inert notation, and evaluation returns it
unchanged.

Interpretation is an explicit request: evaluation never guesses. The
recognizer handles arithmetic progressions, polynomial general terms (found
by finite differences), geometric patterns and linear recurrences. An
ambiguous or unproven pattern is returned unchanged rather than interpreted
wrongly. The result is a `sum` or `product`, which a later evaluation
computes.

```epsil
interpret(2 * 4 * ContinuationPlaceholder * (2n))
// ➔ prod_(k=1)^(n)(2k)
interpret(1 + 1 + 2 + 3 + 5 + 8 + ContinuationPlaceholder + 55)
// ➔ sum_(k=1)^(10)(Fibonacci(k))
let s = interpret(1 + 2 + ContinuationPlaceholder + 100)
s + 0
// ➔ 5050
```

The [Sequences guide](/compute-engine/guides/sequences/#interpreting-elliptical-notation)
describes the families the recognizer knows.

<MathJson name="Interpret">

`["Interpret", expr]`. The ellipsis is the symbol
`ContinuationPlaceholder`, which LaTeX `\dots` and `\cdots` parse to.

```json example
["Interpret", ["Add", 1, 2, "ContinuationPlaceholder", "n"]]
// ➔ ["Sum", "k", ["Limits", "k", 1, "n"]]
["Interpret", ["Multiply", 2, 4, "ContinuationPlaceholder", ["Multiply", 2, "n"]]]
// ➔ ["Product", ["Multiply", 2, "k"], ["Limits", "k", 1, "n"]]
```

</MathJson>

### isComposite

MathJSON `IsComposite` · `(number) -> boolean`

`IsComposite(n)` returns `True` if `n` is a composite number

```epsil
[isComposite(21), isComposite(7)]
// ➔ ["True","False"]
```

### isEven

MathJSON `IsEven` · `(number) -> boolean`

`IsEven(n)` returns `True` if `n` is an even number

```epsil
[isEven(7), isEven(8)]
// ➔ ["False","True"]
```

### isOdd

MathJSON `IsOdd` · `(number) -> boolean`

`IsOdd(n)` returns `True` if `n` is an odd number

```epsil
[isOdd(7), isOdd(8)]
// ➔ ["True","False"]
```

### isPrime

MathJSON `IsPrime` · `(number) -> boolean`

`IsPrime(n)` returns `True` if `n` is a prime number

```epsil
[isPrime(17), isPrime(21)]
// ➔ ["True","False"]
```

### lcm

MathJSON `LCM` · `(any*) -> number`

Least Common Multiple

```epsil
[lcm(4, 6), lcm(4, 6, 10)]
// ➔ [12,60]
```

### lambertW

`(z: complex | infinity, branch: integer?) -> number`

Lambert W function (product logarithm)

```epsil
[lambertW(1), N(lambertW(1))]
// ➔ [LambertW(1),0.567143290409783872999]
```

```epsil
N(lambertW(-0.1, branch: -1))
// ➔ -3.57715206395729721841
```

<MathJson name="LambertW" latex={["\\operatorname{W}"]} />

### lb

`(number) -> number`

Base-2 Logarithm

```epsil
[lb(8), N(lb(3))]
// ➔ [3,1.58496250072115618145]
```

<MathJson name="Lb" latex={["\\lb"]} />

### lerchPhi

MathJSON `LerchPhi` · `(complex, complex, complex) -> number`

Lerch transcendent Φ(z,s,a) = Σ_&#123;k=0&#125;^∞ zᵏ(k+a)^&#123;-s&#125;

### lg

`(number) -> number`

Base-10 Logarithm

```epsil
[lg(100), N(lg(2))]
// ➔ [2,0.301029995663981195214]
```

<MathJson name="Lg" latex={["\\lg"]} />

### ln

`(complex | infinity, base: (complex | infinity)?) -> complex | infinity`

Natural Logarithm

```epsil
[ln(1), ln(2), N(ln(2))]
// ➔ [0,ln(2),0.693147180559945309417]
```

```epsil
ln(8, 2)
// ➔ 3
```

<MathJson name="Ln" latex={["\\ln"]} />

### log

`(complex | infinity, base: (complex | infinity)?) -> number`

Log(z, b = 10) = Logarithm of base b

```epsil
[log(1000), log(8, 2)]
// ➔ [3,3]
```

`log(x)` is the logarithm in base 10, and `log(x, b)` in base `b`. `ln` is
the natural logarithm, `lb` the logarithm in base 2 and `lg` in base 10.

```epsil
[log(100), log(8, 2), lb(8), lg(1000)]
// ➔ [2,3,3,3]
```

<MathJson name="Log" latex={["\\log"]}>

`["Log", x]`, `["Log", x, base]`.

</MathJson>

### log10

MathJSON `Log10` · `(number) -> number`

Base-10 Logarithm

```epsil
[log10(1000), N(log10(2))]
// ➔ [3,0.301029995663981195214]
```

### log2

MathJSON `Log2` · `(number) -> number`

Base-2 Logarithm

```epsil
[log2(32), N(log2(3))]
// ➔ [5,1.58496250072115618145]
```

### machineEpsilon

MathJSON `MachineEpsilon` · constant `real` = `2.220446049250313e-16`

The difference between 1 and the next larger floating point number (machine epsilon).

```epsil
N(machineEpsilon)
// ➔ 2.220446049250313e-16
```

### max

`(value*) -> number`

Maximum of two or more numbers.

```epsil
[max(3, 7, 2), max([3, 7, 2])]
// ➔ [7,7]
```

If all the arguments are numbers, `max` is the largest of them. The
infinities take part in the comparison like any other value. A `NaN`
argument makes the whole expression `NaN`, even when other arguments are
still unknown: no ordering could rule it out.

Otherwise the expression is simplified: the values smaller than or equal to
the largest known number are removed.

A dictionary is not a collection of numbers. `max`, `min`, `supremum` and
`infimum` of a dictionary that has an entry give the `incompatible-type`
error that `sum` gives, and the error names the first entry.

```epsil
[max(5, 2, -1), max(1, ∞)]
// ➔ [5,+oo]
[max(0, 7.1, x, 3), max(0, 7.1, NaN, x, 3)]
// ➔ [max(7.1, x),NaN]
```

<MathJson name="Max" latex={["\\max"]}>

`["Max", x1, x2, ...]` or `["Max", list]`. An empty dictionary contributes
no value, as an empty list does.

```json example
["Max", 5, 2, -1]
// ➔ 5
["Max", 1, "PositiveInfinity"]
// ➔ "PositiveInfinity"
["Max", 0, 7.1, "x", 3]
// ➔ ["Max", 7.1, "x"]
["Max", 0, 7.1, "NaN", "x", 3]
// ➔ "NaN"
```

</MathJson>

### measurement

`(value, value) -> measurement`

A nominal value carrying a 1σ absolute uncertainty.

```epsil
measurement(9.81, 0.02)
// ➔ 9.810 ± 0.020
```

```epsil
N(measurement(5, 0.2) * measurement(3, 0.4))
// ➔ 15.0 ± 2.1
```

<MathJson name="Measurement" latex={["\\pm"]} />

### min

`(value+) -> number`

Minimum of two or more numbers.

```epsil
[min(3, 7, 2), min([3, 7, 2])]
// ➔ [2,2]
```

If all the arguments are numbers, `min` is the smallest of them. As with
`max`, the infinities take part in the comparison, and a `NaN` argument makes
the whole expression `NaN`.

Otherwise the expression is simplified: the values greater than or equal to
the smallest known number are removed.

```epsil
[min(5, 2, -1), min(1, -∞), min(0, 7.1, x, 3)]
// ➔ [-1,-oo,min(0, x)]
```

<MathJson name="Min" latex={["\\min"]}>

`["Min", x1, x2, ...]` or `["Min", list]`.

<Latex value=" \min(0, 7.1, 3) = 0"/>

```json example
["Min", 5, 2, -1]
// ➔ -1
["Min", 1, "NegativeInfinity"]
// ➔ "NegativeInfinity"
["Min", 0, 7.1, "x", 3]
// ➔ ["Min", 0, "x"]
["Min", 0, 7.1, "NaN", "x", 3]
// ➔ "NaN"
```

</MathJson>

### Mod

`(real, real) -> real`

Modulo: the remainder of the floored division of x by y. The sign of the result follows the sign of the divisor y (floored-division convention, matching most CAS). For a truncated/round-to-nearest remainder, see `Remainder`.

```epsil
[7 % 3, -7 % 3]
// ➔ [1,2]
```

`Mod(a, b)` is the modulus of `a` by `b`. The operator `a % b` is the same
function. The result has the sign of `b`, or is `0`.

When `a` and `b` are positive integers, this is the remainder of the
division of `a` by `b`, as with the `%` operator of JavaScript. When they are
not, the result differs: in Epsil `(-7) % 5` is `3`, in JavaScript `-2`.

```epsil
[Mod(7, 5), Mod(-7, 5), Mod(7, -5), Mod(-7, -5)]
// ➔ [2,3,-3,-2]
```

`Mod` of exact operands is exact. A radical dividend is reduced without
rounding, and `N()` gives the floating-point value.

```epsil
Mod(sqrt(2), 1)
// ➔ -1 + sqrt(2)
```

<MathJson name="Mod" latex={["\\bmod"]}>

`["Mod", a, b]`.

```json example
["Mod", 7, 5]
// ➔ 2
["Mod", -7, 5]
// ➔ 3
["Mod", 7, -5]
// ➔ -3
["Mod", -7, -5]
// ➔ -2
["Mod", ["Sqrt", 2], 1]
// ➔ ["Add", -1, ["Sqrt", 2]]
```

</MathJson>

### Multiply

`(number*) -> number`

Product of two or more values.

```epsil
2 * x * 3 * x
// ➔ 6x^2
```

<MathJson name="Multiply" latex={["\\times"]} />

### NaN

constant `number` = `NaN`

Not a Number, the result of a floating-point operation that is undefined or unrepresentable, such as 0.0/0.0, or of an exact form with no value, such as 0/0.

```epsil
[NaN + 1, 0.0/0.0, 0/0]
// ➔ [NaN,NaN,NaN]
```

### Negate

`(complex | infinity) -> number`

Additive Inverse

```epsil
-(x - 1)
// ➔ 1 - x
```

<MathJson name="Negate" latex={["-"]} />

### negativeInfinity

MathJSON `NegativeInfinity` · constant `-oo` = `-oo`

Negative infinity (−∞).

```epsil
[negativeInfinity - 1, negativeInfinity < -10^100]
// ➔ [-oo,"True"]
```

### numerator

`(number) -> nothing | number`

Numerator of an expression

```epsil
[numerator(3/4), numerator(x / y)]
// ➔ [3,x]
```

A fraction written in the call is not reduced first: `numerator(4/8)` is `4`.

```epsil
numerator(4/8)
// ➔ 4
```

<MathJson name="Numerator">

`["Numerator", expr]`. The argument can be in a non-canonical form.

```json example
["Numerator", ["Rational", 4, 5]]
// ➔ 4
```

</MathJson>

### numeratorDenominator

`(number) -> nothing | tuple<number, number>`

Sequence of Numerator and Denominator of an expression

```epsil
numeratorDenominator(3/4)
// ➔ (3, 4)
```

A fraction written in the call is not reduced first. With `gcd`, this tells
whether a fraction is in lowest terms:

```epsil
[gcd(numeratorDenominator(4/5)), gcd(numeratorDenominator(8/10))]
// ➔ [1,2]
```

<MathJson name="NumeratorDenominator">

`["NumeratorDenominator", expr]` is a `Sequence` of the numerator and the
denominator, so it can be the arguments of another function.

```json example
["NumeratorDenominator", ["Rational", 4, 5]]
// ➔ ["Sequence", 4, 5]
["GCD", ["NumeratorDenominator", ["Rational", 8, 10]]]
// ➔ 2
```

</MathJson>

### PlusMinus

`(T, U) -> tuple<T, U> where T: value, U: value`

Plus or Minus

```epsil
PlusMinus(1, 0.1)
// ➔ (0.9, 1.1)
```

### polyGamma

MathJSON `PolyGamma` · `(order: integer, complex | infinity) -> number`

Polygamma function, the n-th derivative of the digamma function

```epsil
N(polyGamma(2, 1))
// ➔ -2.4041138063191885708
```

```epsil
N(polyGamma(1))
// ➔ -0.577215664901532860607
```

### positiveInfinity

MathJSON `PositiveInfinity` · constant `+oo` = `+oo`

Positive infinity (+∞).

```epsil
[positiveInfinity + 1, positiveInfinity > 10^100]
// ➔ [+oo,"True"]
```

### Power

`(complex | infinity, complex | signed_infinity) -> number`

Exponentiation: raise a base to a power.

```epsil
[2^10, 2^(1/2), x^2 * x^3]
// ➔ [1024,sqrt(2),x^5]
```

`a^b` raises `a` to the power `b`. A power of exact numbers evaluates to an
exact number. When the result would be too large, the power stays
unevaluated, and `N()` gives its floating-point value. The engine estimates
the size of the result as the number of decimal digits of the base times the
exponent, and the limit is 1,000,000 digits.

```epsil
[2^10, 2^10000000, N(2^10000000)]
// ➔ [1024,2^(10000000),9.0498173063608003014e+3010299]
```

A power of `0`, `1`, `-1`, `i` or `-i` to an integer exponent of any size is
evaluated. A power of `i` uses the exponent modulo 4.

```epsil
[(-1)^10000000, i^(10^30 + 1)]
// ➔ [1,i]
```

A power with an infinite operand gives its limit. A base whose absolute value
is more than 1 raised to `∞` gives `∞`, and a base whose absolute value is
less than 1 gives `0`. The engine compares the base with 1 by its exact
value, so a base very near 1 also gives the limit. A symbolic base raised to
an infinity stays unevaluated until the base has a value, because the limit
depends on that value.

```epsil
[2^∞, 0.5^(-∞), (1/2)^∞, 1^∞, z^∞]
// ➔ [+oo,+oo,0,NaN,z^(+oo)]
```

<MathJson name="Power" latex={["^"]}>

`["Power", a, b]`. When an operand is a floating-point number, the limit `0`
is the floating-point `0.0`, as for `2.5/∞`. When the operands are exact, it
is the exact `0`.

```json example
["Power", 2, 10]
// ➔ 1024
["Power", 2, 10000000]
// ➔ ["Power", 2, 10000000]  (unevaluated)
["Power", "ImaginaryUnit", ["Add", ["Power", 10, 30], 1]]
// ➔ ["Complex", 0, 1]
["Power", 0.5, "PositiveInfinity"]
// ➔ 0.0  (a floating-point number)
["Power", ["Rational", 1, 2], "PositiveInfinity"]
// ➔ 0
```

</MathJson>

### PreDecrement

`(number) -> number`

Decrement a number by one.

```epsil
PreDecrement(5)
// ➔ 4
```

### PreIncrement

`(number) -> number`

Increment a number by one.

```epsil
PreIncrement(5)
// ➔ 6
```

### product

`(any, tuple*) -> number`

`Product(f, a, b)` computes the product of `f` from `a` to `b`.

```epsil
product(k, (k, 1, 5))
// ➔ 120
```

```epsil
product(1 - 1/k^2, (k, 2, 10))
// ➔ 11/20
```

`product` has the same forms as `sum`, and an empty product is `1`.

```epsil
[product([5, x, 11]), product(5), product(x^k)]
// ➔ [55x,5,prod(x^k)]
[product(k, k, 1, 5), product(k^2, k in {1, 2, 3})]
// ➔ [120,36]
```

To keep only some values of the index, multiply a filtered comprehension:

```epsil
product([k for k in [1, -2, 3, -4] if k < 0])
// ➔ 8
```

#### Closed forms

`simplify` replaces a product with a symbolic bound by a closed form when its
body matches one of these patterns. A bound that is not an integer gets no
closed form, as for `sum`.

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\prod_{n=1}^{b} c$$ | $$c^b$$ | Constant body |
| $$\prod_{n=1}^{b} n$$ | $$b!$$ | Factorial |
| $$\prod_{n=1}^{b} (n+c)$$ | $$\frac{(b+c)!}{c!}$$ | Shifted factorial |
| $$\prod_{n=1}^{b} (2n-1)$$ | $$(2b-1)!!$$ | Odd double factorial |
| $$\prod_{n=1}^{b} 2n$$ | $$2^b \cdot b!$$ | Even double factorial |
| $$\prod_{k=0}^{n-1} (x+k)$$ | $$(x)_n$$ | Rising factorial (Pochhammer) |
| $$\prod_{k=0}^{n-1} (x-k)$$ | $$\frac{x!}{(x-n)!}$$ | Falling factorial |
| $$\prod_{k=1}^{n} \frac{k+1}{k}$$ | $$n+1$$ | Telescoping product |
| $$\prod_{k=2}^{n} (1 - \frac{1}{k^2})$$ | $$\frac{n+1}{2n}$$ | Wallis-like product |
| $$\prod_{n=1}^{b} c \cdot f(n)$$ | $$c^b \cdot \prod_{n=1}^{b} f(n)$$ | Factor out constant |

```epsil
[simplify(product(k, (k, 1, n))), simplify(product(3, (k, 1, n)))]
// ➔ [n!,3^n]
```

An empty range gives `1`, or a vector of `1` when the body is a vector of a
known length, and a single iteration gives the body at that value.

Evaluation also gives the Wallis-like product its closed form, for any
positive integer lower bound `a`: the product of `1 - 1/k^2` from `a` to `n`
is `(a - 1)(n + 1) / (a n)`. The body is compared as a rational function, so
`(k^2 - 1)/k^2` is recognized too.

```epsil
product(1 - 1/k^2, (k, 3, n))
// ➔ (2(n + 1)) / (3n)
```

#### Infinite products

A product to `oo` has an exact value when its body is one of these known
convergent families, or the reciprocal of one. The body is compared
algebraically, so any spelling of the same rational function is recognized.
A body that matches no family stays symbolic, a body with a float gives a
float, and a body whose numerator and denominator share a factor stays
symbolic.

| Product | Value | Name |
| :------ | :---- | :--- |
| $$\prod_{k=a}^{\infty} \left(1 - \frac{1}{k^2}\right), \; a \ge 2$$ | $$\frac{a-1}{a}$$ | Telescoping |
| $$\prod_{k=1}^{\infty} \left(1 - \frac{1}{(2k)^2}\right)$$ | $$\frac{2}{\pi}$$ | Wallis product |
| $$\prod_{k=1}^{\infty} \left(1 - \frac{1}{(2k+1)^2}\right)$$ | $$\frac{\pi}{4}$$ | Odd Wallis analog |
| $$\prod_{k=1}^{\infty} \left(1 + \frac{1}{k^2}\right)$$ | $$\frac{\sinh \pi}{\pi}$$ | From the $\sin$ product formula |

```epsil
[product(4n^2/(4n^2 - 1), (n, 1, oo)), product(k^2/(k^2 + 1), (k, 1, oo))]
// ➔ [1/2 * pi,pi / sinh(pi)]
```

<MathJson name="Product" latex={["\\prod"]}>

`["Product", xs]`, `["Product", body, ...bounds]`, with the bounds of `Sum`.
`["Product", xs]` is equivalent to `["Reduce", xs, "Multiply"]`.

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385
["Product", ["Add", "x", 1], ["Tuple", "x", 1, 10]]
// ➔ 39916800
["Product", "k", "k", 1, 5]
// ➔ 120
["Product", "k", ["Element", "k", ["Set", 1, -2, 3, -4], ["Less", "k", 0]]]
// ➔ 8
```

</MathJson>

### rational

`((integer, integer) -> rational) | ((real) -> rational)`

Construct a rational number from a numerator and denominator.

```epsil
[rational(3, 6), rational(1.25)]
// ➔ [1/2,5/4]
```

<MathJson name="Rational">

`["Rational", n]` is the rational number nearest to the number `n` with a
small denominator. `["Rational", numerator, denominator]` is the rational
number `numerator/denominator`.

```json example
["Rational", 0.42]
// ➔ ["Rational", 21, 50]
```

</MathJson>

### rationalize

MathJSON `Rationalize` · `(real, real<0..>?) -> rational`

Approximate a real number by a rational. With a second argument `tolerance`, return the rational with the smallest denominator that approximates the number to within `tolerance` (a continued-fraction convergent); with no tolerance, rationalize at full working precision, as single-argument `Rational`.

```epsil
rationalize(1.75)
// ➔ 7/4
```

```epsil
rationalize(sqrt(3), 1/500)
// ➔ 26/15
```

### re

MathJSON `Re` · `(complex | infinity) -> number`

`Re` is an alias for `Real`, which is the preferred name. Returns the real part of a complex number.

```epsil
re(3 + 4i)
// ➔ 3
```

### real

`(complex | infinity) -> number`

Real part of a complex number.

```epsil
real(3 + 4i)
// ➔ 3
```

<MathJson name="Real" latex={["\\Re"]} />

### remainder

MathJSON `Remainder` · `(T, T) -> T where T: number`

IEEE remainder: the signed remainder after dividing x by y, with the quotient rounded to the nearest integer (ties round toward +Infinity, matching JavaScript `Math.round`)

```epsil
[remainder(7, 3), remainder(-7, 3)]
// ➔ [1,-1]
```

### root

MathJSON `Root` · `(complex | infinity, complex | infinity) -> number`

n-th root of a value.

```epsil
[root(8, 3), N(root(2, 3))]
// ➔ [2,1.25992104989487316477]
```

### round

`(x: real | signed_infinity | ~oo, step: real?) -> real | signed_infinity | ~oo`

Rounds a number to the nearest integer, or with a step to the nearest multiple of the step.

```epsil
[round(2.5), round(-2.5), round(226, 10), round(3.14159, 1/100)]
// ➔ [3,-3,230,157/50]
```

A step of `0` gives `NaN`. A step can be any exact number:

```epsil
[round(5, 0), floor(2.7, 1/2)]
// ➔ [NaN,5/2]
```

A tie, a value exactly halfway between two multiples, is rounded with the
engine's `roundingTies` rule, by default away from zero. See
[Rounding ties](/compute-engine/guides/numeric-evaluation/#rounding-ties).

<MathJson name="Round" latex={["round"]}>

`["Round", x]`, `["Round", x, step]`. `Floor`, `Ceil` and `Truncate` take the
same arguments.

```json example
["Floor", 226, 10]
// ➔ 220
["Floor", 2.7, ["Rational", 1, 2]]
// ➔ 5/2
["Round", 3.14159, ["Rational", 1, 100]]
// ➔ 157/50
```

</MathJson>

### sign

`(complex | signed_infinity | ~oo) -> complex`

Sign of a number: -1, 0, or 1 for a real; `z/|z|`, the point of the unit circle in its direction, for a complex `z`.

```epsil
[sign(-3), sign(0), sign(3 + 4i)]
// ➔ [-1,0,(3/5 + 4/5i)]
```

<MathJson name="Sign" latex={["sgn"]} />

### smoothstep

`(real | signed_infinity, real | signed_infinity, real | signed_infinity) -> nan | real`

Smooth Hermite interpolation between 0 and 1 as x goes from e0 to e1: t²(3 − 2t) with t = Clamp((x − e0)/(e1 − e0), 0, 1). Broadcasts over collection arguments.

```epsil
[smoothstep(0, 1, -1), smoothstep(0, 1, 1/2), smoothstep(0, 1, 2)]
// ➔ [0,1/2,1]
```

`smoothstep(e0, e1, x)` goes smoothly from 0 to 1 as `x` goes from `e0` to
`e1`: it is `t^2 (3 - 2t)`, with `t = clamp((x - e0)/(e1 - e0), 0, 1)`. This
is the formula of the GLSL built-in `smoothstep`, with the arguments in the
same order. The result is exact for exact arguments.

- When `e0 = e1`, the result is a step: `0` when `x < e0`, otherwise `1`.
- When `e0 > e1`, the formula applies as written, and the result goes from 1
  to 0.
- Every compile target gives these results. The GLSL built-in has no defined
  result when `e0 ≥ e1`, so the shader target writes the formula out instead
  of calling it.

```epsil
[smoothstep(0, 1, 1/3), smoothstep(1, 0, 1/4)]
// ➔ [7/27,27/32]
[smoothstep(1, 1, 0.5), smoothstep(1, 1, 2)]
// ➔ [0,1]
```

<MathJson name="Smoothstep">

`["Smoothstep", e0, e1, x]`.

```json example
["Smoothstep", 0, 1, ["Rational", 1, 3]]
// ➔ 7/27
["Smoothstep", 1, 1, 0.5]
// ➔ 0
```

</MathJson>

### sqrt

`(complex | infinity) -> complex | infinity`

Square Root

```epsil
[sqrt(8), sqrt(-4), N(sqrt(2))]
// ➔ [2sqrt(2),2i,1.4142135623730950488]
```

<MathJson name="Sqrt" latex={["\\sqrt"]} />

### Square

`(number) -> number`

Square of a number: x^2.

```epsil
[Square(3), Square(x + 1)]
// ➔ [9,(x + 1)^2]
```

### Subtract

`(number+) -> number`

Difference between two or more values.

```epsil
5 - 3 - x
// ➔ 2 - x
```

<MathJson name="Subtract" latex={["-"]} />

### sum

`(any, tuple*) -> number`

`Sum(f, [a, b])` computes the sum of `f` from `a` to `b`; `Sum(L)` sums the elements of a collection `L`.

```epsil
sum(k^2, (k, 1, 10))
// ➔ 385
```

```epsil
sum(1/k^2, (k, 1, oo))
// ➔ pi^2 / 6
```

`sum` has three forms, shown in [Sums and products](#sums-and-products)
above: a collection, a body with a range, and a body with an indexing set.

**A collection.** A list of points (tuples) sums to a point, and a list of
rows to the row of the column sums. An element that is not a number, a point
or a row, such as a boolean or a dictionary, is an `incompatible-type` error,
also when it is the only element.

```epsil
[sum([(1, 2), (3, 4)]), sum([[1, 2], [3, 4]])]
// ➔ [(4, 6),[4,6]]
sum([True])
// ➔ error: Runtime error: expected `number`, got `boolean` at `True`
```

An argument that is not a collection, with no index, is one term. With no
free variable, it is its own sum. With a free variable, the sum stays
unevaluated, because no index is given: in `sum(x^k)` the index could be `x`
or `k`.

```epsil
[sum(5), sum(x^k)]
// ➔ [5,sum(x^k)]
```

**A range.** The bound `(k, lower, upper)` can also be written flat after
the body, as for `integrate`: the index, the lower bound, the upper bound.

```epsil
sum(k, k, 1, 10)
// ➔ 55
```

**An indexing set.** With `k in S`, the index takes each element of a finite
set, list or range. A list of exactly two integers is read as a range, so
`n in [1, 5]` runs over the integers from 1 to 5. An interval is enumerated
by its integers, and an open end leaves out its bound. The set can have at
most 1,000 elements; a sum over an infinite set stays symbolic.

```epsil
[sum(n, n in {1, 2, 3}), sum(n, n in [1, 5])]
// ➔ [6,15]
sum(n, n in interval(open(0), 5))
// ➔ 15
```

#### Multiple indexing sets

Several indexing sets give a multiple sum, and an indexing set and a range
can be mixed:

```epsil
sum(n * m, n in {1, 2}, m in {3, 4})
// ➔ 21
sum(n + m, n in {1, 2}, (m, 1, 2))
// ➔ 12
```

To keep only some values of the index, sum a filtered comprehension:

```epsil
sum([n for n in {1, 2, 3, -1, -2} if n > 0])
// ➔ 6
```

#### Closed forms

`simplify` replaces a sum with a symbolic bound by a closed form when its
body matches one of these patterns:

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\sum_{n=1}^{b} c$$ | $$b \cdot c$$ | Constant body |
| $$\sum_{n=a}^{b} n$$ | $$\frac{b(b+1) - a(a-1)}{2}$$ | Triangular number (general bounds) |
| $$\sum_{n=1}^{b} n^2$$ | $$\frac{b(b+1)(2b+1)}{6}$$ | Sum of squares |
| $$\sum_{n=1}^{b} n^3$$ | $$\left[\frac{b(b+1)}{2}\right]^2$$ | Sum of cubes |
| $$\sum_{n=0}^{b} r^n$$ | $$\frac{1-r^{b+1}}{1-r}$$ | Geometric series |
| $$\sum_{n=0}^{b} (-1)^n$$ | $$\frac{1+(-1)^b}{2}$$ | Alternating unit series |
| $$\sum_{n=0}^{b} (-1)^n \cdot n$$ | $$(-1)^b \lfloor\frac{b+1}{2}\rfloor$$ | Alternating linear series |
| $$\sum_{n=0}^{b} (a + dn)$$ | $$(b+1)\left(a + \frac{db}{2}\right)$$ | Arithmetic progression |
| $$\sum_{k=0}^{n} \binom{n}{k}$$ | $$2^n$$ | Sum of binomial coefficients |
| $$\sum_{k=0}^{n} (-1)^k \binom{n}{k}$$ | $$0$$ | Alternating binomial sum |
| $$\sum_{k=0}^{n} k \binom{n}{k}$$ | $$n \cdot 2^{n-1}$$ | Weighted binomial sum |
| $$\sum_{k=1}^{n} \frac{1}{k(k+1)}$$ | $$\frac{n}{n+1}$$ | Partial fractions (telescoping) |
| $$\sum_{k=2}^{n} \frac{1}{k(k-1)}$$ | $$\frac{n-1}{n}$$ | Partial fractions (telescoping) |
| $$\sum_{k=0}^{n} k^2 \binom{n}{k}$$ | $$n(n+1) \cdot 2^{n-2}$$ | Weighted squared binomial sum |
| $$\sum_{k=0}^{n} k^3 \binom{n}{k}$$ | $$n^2(n+3) \cdot 2^{n-3}$$ | Weighted cubed binomial sum |
| $$\sum_{k=0}^{n} (-1)^k k \binom{n}{k}$$ | $$0$$ | Alternating weighted binomial sum (n ≥ 2) |
| $$\sum_{k=0}^{n} \binom{n}{k}^2$$ | $$\binom{2n}{n}$$ | Sum of binomial squares |
| $$\sum_{k=1}^{n} k(k+1)$$ | $$\frac{n(n+1)(n+2)}{3}$$ | Sum of consecutive products |
| $$\sum_{n=m}^{b} (a + dn)$$ | $$(b-m+1)\left(a + \frac{d(m+b)}{2}\right)$$ | Arithmetic progression (general bounds) |
| $$\sum_{n=1}^{b} c \cdot f(n)$$ | $$c \cdot \sum_{n=1}^{b} f(n)$$ | Factor out constant |

```epsil
[simplify(sum(k, (k, 1, n))), simplify(sum(3, (k, 1, n)))]
// ➔ [1/2 * (n^2 + n),3n]
```

A bound that is not an integer gets no closed form, and the sum stays
symbolic: a bound such as `2.5`, a bound that holds a symbol declared with a
type that is not an integer type (for example `real`), or a bound whose
symbols are all declared and whose type is not an integer type (`n/2` with
`n` declared `integer`). The enumeration rounds such a bound down, and a
closed form would not. An undeclared symbol is a generic value, and its bound
gets the closed form.

- An empty range (upper bound less than the lower bound, both numbers) gives
  `0`, or a vector of `0` when the body is a vector of a known length.
- A single iteration (equal bounds) gives the body at that value.
- In nested sums, the inner sum is simplified first.

A closed form with a symbolic upper bound is the generic answer, as in
Mathematica. It applies with no proof that the range is not reversed, and it
is the value of the sum when the upper bound is an integer at least the lower
bound minus 1. For another value it can differ from evaluation:
`sum(3, (k, 1, n))` simplifies to `3n`, which is `-12` at `n = -4`, where the
sum is the empty sum `0`. If the bound can have such a value, do not simplify
the sum.

#### Infinite series

A sum to `oo` has an exact value when its body matches a known convergent
family. Otherwise it stays symbolic, and `N` gives a numeric approximation.

| Series | Value | Name |
| :----- | :---- | :--- |
| $$\sum_{k=a}^{\infty} k^{-s}, \; s > 1$$ | $$\zeta(s) - \sum_{k<a} k^{-s}$$ | p-series ($\zeta(2) = \pi^2/6$, …) |
| $$\sum_{k=n_0}^{\infty} c\,r^k, \; \|r\| < 1$$ | $$\frac{c\,r^{n_0}}{1-r}$$ | Geometric series |
| $$\sum_{k=1}^{\infty} \frac{(-1)^{k+1}}{k^s}$$ | $$\eta(s)$$ | Alternating p-series ($\eta(1) = \ln 2$, $\eta(2) = \pi^2/12$) |
| $$\sum_{k=1}^{\infty} \frac{1}{(2k-1)^s}, \; s > 1$$ | $$(1 - 2^{-s})\,\zeta(s)$$ | Odd p-series ($\pi^2/8$ for $s=2$) |
| $$\sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)^s}$$ | $$\beta(s)$$ | Dirichlet beta ($\pi/4$, Catalan's constant, $\pi^3/32$, $5\pi^5/1536$ for $s = 1, 2, 3, 5$) |
| $$\sum_{k=a}^{\infty} \frac{r^k}{k!}$$ | $$e^r - \sum_{k<a} \frac{r^k}{k!}$$ | Exponential series (symbolic $r$ allowed) |
| $$\sum_{k=a}^{\infty} \frac{k^n r^k}{k!}$$ | $$e^r\,T_n(r) - \sum_{k<a} \frac{k^n r^k}{k!}$$ | Touchard / Dobiński ($T_n$ the Touchard polynomial; $n \le 200$) |
| $$\sum_{k=1}^{\infty} k\,r^k, \; \|r\| < 1$$ | $$\frac{r}{(1-r)^2}$$ | First-moment geometric |
| $$\sum_{k=1}^{\infty} \frac{r^k}{k}, \; \|r\| < 1$$ | $$-\ln(1-r)$$ | Logarithmic series |

The body is compared with each pattern as a rational function of the index,
so an equivalent spelling is recognized, and a polynomial in `k` over `k!` is
summed term by term:

```epsil
[sum(k/k^3, (k, 1, oo)), sum(1/(k + 1)^2, (k, 1, oo))]
// ➔ [1/6 * pi^2,-1 + 1/6 * pi^2]
[sum(1/(k^2 + k), (k, 1, oo)), sum((k^2 + k)/k!, (k, 0, oo))]
// ➔ [1,3e]
```

The comparison runs only for a body whose denominator, as written, is zero at
no integer index of the domain; a pole there keeps the sum symbolic. For a
symbolic ratio, the families with a convergence region give an `If` that
records the region:

```epsil
sum(k * x^k, (k, 1, oo))
// ➔ If(|x| < 1, x / (1 - x)^2)
```

A series that the engine can prove divergent evaluates to its infinity. The
proof is a limit comparison with the harmonic series. A series with no value
stays symbolic:

```epsil
[sum(1/n, (n, 1, oo)), sum(-3/n, (n, 1, oo))]
// ➔ [+oo,-oo]
sum((-1)^n, (n, 1, oo))
// ➔ sum_(n=1)^(+oo)((-1)^n)
```

<MathJson name="Sum" latex={["\\sum"]}>

`["Sum", xs]`, `["Sum", body, ...bounds]`, where a bound is
`["Limits", index, lower, upper]` (or a `Tuple`) or
`["Element", index, collection]`.

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
["Sum", ["List", 5, 7, "x", "y"]]
// ➔ ["Add", 12, "x", "y"]
["Sum", ["Add", "i", 1], ["Tuple", "i", 1, 10]]
// ➔ 65
["Sum", "k", "k", 1, 10]
// ➔ 55
["Sum", ["Power", "n", 2], ["Element", "n", ["Set", 1, 2, 3]]]
// ➔ 14
```

`["Sum", xs]` is equivalent to `["Reduce", xs, "Add"]`.

An `Element` bound takes a condition as its fourth operand, which filters the
values of the index:

```json example
["Sum", "n", ["Element", "n", ["Set", 1, 2, 3, -1, -2], ["Greater", "n", 0]]]
// ➔ 6
```

In LaTeX, the bounds can be a `\le` (or `\ge`) range in the subscript:
`\sum_{1 \le i \le 10} i^2` is `385`, and `\sum_{i \le 10} i`, with the lower
bound 1 by default, is `55`. Only this form implies a bound: a sum with one
explicit bound in the `i=1` and superscript form, such as `\sum_{k=1} k`,
stays unevaluated, and its bound is `["Limits", "k", 1, "Nothing"]`.

The items of the superscript are the upper bounds, in order, of the ranges
that have no upper bound in the subscript. A clause `n \in S` and its
conditions take no superscript item, so `\sum_{n \in \{1,2\}, m=1}^{2} (n+m)`
is `12`.

After a clause `n \in S`, an item is a condition of it when it is a relation
(`n > 0`), a logical expression (`n > 1 \land n < 5`), a predicate
(`\mathrm{IsPrime}(n)`), an equation (`n \bmod 2 = 0`) or a membership of the
same index (`n \in T`). Two or more conditions are joined with `And`:
`\sum_{n \in \{1,2,3\}, n > 1, n < 3} n` is `2`. An item that binds another
index, such as `m \in T` or `m = 1`, starts a new indexing set.

</MathJson>

### supremum

`(value*) -> number`

Like Max, but defined for open sets.

```epsil
[supremum(1, 3, 2), supremum(interval(0, 1))]
// ➔ [3,1]
```

<MathJson name="Supremum" latex={["\\sup"]} />

### trigamma

MathJSON `Trigamma` · `(complex | infinity) -> number`

Trigamma function, the derivative of the digamma function

```epsil
N(trigamma(1))
// ➔ 1.64493406684822643647
```

### truncate

MathJSON `Truncate` · `(x: real | signed_infinity | ~oo, step: real?) -> real | signed_infinity | ~oo`

Rounds a number towards zero (removes the fractional part), or with a step to the multiple of the step nearest to the number in the direction of zero.

```epsil
[truncate(2.7), truncate(-2.7), truncate(-226, 10)]
// ➔ [2,-2,-220]
```

### zeta

`(complex | infinity, (complex | infinity)?) -> number`

Riemann zeta function; with two arguments, Wolfram's generalized zeta: for a real a, ζ(s,a) = Σ_&#123;n=0&#125;^∞ |n+a|^&#123;-s&#125; (a term with n+a = 0 omitted, except at s = 0, where ζ(0,a) = 1/2 - a), which is HurwitzZeta(s,a) for a &gt; 0; for a complex a, the Hurwitz sum.

```epsil
[zeta(2), zeta(-1), N(zeta(3))]
// ➔ [1/6 * pi^2,-1/12,1.2020569031595942854]
```

<MathJson name="Zeta" latex={["\\Zeta"]} />

### e

constant `real<2.718281828459045..2.718281828459046>` = `e`

Euler's number e ≈ 2.71828, the base of the natural logarithm.

```epsil
[ln(e^3), N(e)]
// ➔ [3,2.71828182845904523536]
```

### i

constant `imaginary` = `i`

The imaginary unit, whose square is −1.

```epsil
[i^2, (1 + i)^2]
// ➔ [-1,2i]
```
