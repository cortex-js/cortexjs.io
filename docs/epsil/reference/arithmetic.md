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
// ➔ [true, false, true, false, true]
```

The types `integer`, `rational`, `real` and `complex` hold **finite** values
only. An infinity is a `number`, but it is not a `real`:

```epsil
[oo is real, oo is number]
// ➔ [false, true]
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

## Complex numbers

The imaginary unit `i` (MathJSON `ImaginaryUnit`) is a solution of
$x^2 + 1 = 0$. A complex number $z = a + bi$ has a real part `a` and an
imaginary part `b`, which `real` and `imaginary` return. `abs` and
`argument` give its polar form: the distance from the origin to the
point that represents it in the complex plane, and the angle from the
positive real axis to that point.

```epsil
[i^2, e^(i * pi)]
// ➔ [-1,-1]
let z = 3 + 4i
real(z) + imaginary(z) * i
// ➔ (3 + 4i)
abs(1 + i) * e^(i * argument(1 + i))
// ➔ (1 + i)
```

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

The magnitude of a complex number is the distance from the origin to the
point that represents it in the complex plane:

$$
|z| = \sqrt{(\Re z)^2 + (\Im z)^2}
$$

```epsil
[abs(-3 + 4i), sqrt((-3)^2 + 4^2)]
// ➔ [5,5]
[abs(1 + i), abs(i), abs(oo)]
// ➔ [sqrt(2),1,+oo]
```

`abs` of a list is the list of the magnitudes of its elements:

```epsil
abs([3, -4])
// ➔ [3,4]
```

<MathJson name="Abs" latex={["|"]}>

`["Abs", z]`. In LaTeX: `|z|` or `\operatorname{abs}(z)`.

```json example
["Abs", ["Complex", 3, 4]]
// ➔ 5
```

</MathJson>

### absArg

`(complex | infinity) -> tuple<+oo | real, real>`

Tuple of magnitude and argument of a complex number.

```epsil
[absArg(1 + i), absArg(-2)]
// ➔ [(sqrt(2), 1/4 * pi),(2, pi)]
```

The tuple `(abs(z), argument(z))` is the polar representation of `z`. The
argument is in the angular unit of the engine, as for `argument`.

$$
3 + 4i = 5 (\cos \theta + i \sin \theta) = 5 e^{i\theta},
\quad \theta = \arctan \tfrac{4}{3} \approx 0.9273
$$

```epsil
absArg(3 + 4i)
// ➔ (5, arctan(4/3))
N(absArg(3 + 4i))
// ➔ (5, 0.927295218001612232427)
let (r, t) = absArg(3 + 4i)
r
// ➔ 5
```

<MathJson name="AbsArg">

`["AbsArg", z]` evaluates to a `Tuple`.

```json example
["AbsArg", ["Complex", 3, 4]]
// ➔ ["Tuple", 5, ["Arctan", ["Rational", 4, 3]]]
```

</MathJson>

### Add

`(value+) -> value`

Sum of two or more values.

```epsil
1 + x + 2 + x
// ➔ 2x + 3
```

#### Vectors, matrices and tensors

With a vector, a matrix or a tensor, `+` adds the elements at the same
position, and a scalar is added to every element. A sum can mix several
matrices and scalars. The operands that are not scalars must have the same
shape. See
[Arithmetic and broadcasting](/reference/linear-algebra/#arithmetic-and-broadcasting).

```epsil
[[1, 2], [3, 4]] + 10 + [[5, 6], [7, 8]]
// ➔ [[16,18],[20,22]]
[7, 11] + 3
// ➔ [10,14]
[1, 2] + [1, 2, 3]
// ➔ error: Runtime error: incompatible dimensions at `2 vs 3`
```

The elements can be symbols, and exact elements, such as rationals and
radicals, stay exact:

```epsil
[[a, b], [c, d]] + [[1, 2], [3, 4]]
// ➔ [[a + 1,b + 2],[c + 3,d + 4]]
[[1/2, sqrt(2)]] + [[1/3, sqrt(2)]]
// ➔ [[5/6,2sqrt(2)]]
```

A tuple of numbers is added element by element too, and the sum is a tuple.
A tuple and a list cannot be added:

```epsil
(1, 2, 3) + (3, 5, 6)
// ➔ (4, 7, 9)
(1, 2) + [3, 4]
// ➔ error: Type error: expected `tuple`, got `list<number>` in `(1, 2) + [3, 4]`
```

<MathJson name="Add" latex={["+"]}>

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  10,
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 16, 18], ["List", 20, 22]]

["Add",
  ["List", ["List", ["Rational", 1, 2], ["Rational", 1, 3]]],
  ["List", ["List", ["Rational", 1, 2], ["Rational", 1, 3]]]]
// ➔ ["List", ["List", 1, ["Rational", 2, 3]]]

["Add",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["Error", "'incompatible-dimensions'", "'2x2 vs 2x3'"]
```

In LaTeX, a vector can be written `(1, 2, 3)` or `[1, 2, 3]`:
`(1,2,3)+(3,5,6)` is `(4, 7, 9)`.

</MathJson>

### airyAi

`(complex | infinity) -> number`

Airy function of the first kind

```epsil
N(airyAi(1))
// ➔ 0.135292416312881415524
```

$\operatorname{Ai}$ is the solution of the Airy equation that decays
exponentially for a positive $x$ and oscillates for a negative $x$. Its
value at 0 is exact:

```epsil
airyAi(0)
// ➔ 1 / (Gamma(2/3) * 3^(2/3))
[N(airyAi(-2)), airyAi(+oo), airyAi(-oo)]
// ➔ [0.227407428201685575992,0,0]
```

#### Airy functions

Airy functions are solutions of the Airy differential equation:

$$
\frac{d^2 y}{dx^2} - xy = 0
$$

They arise in physics, in particular in quantum mechanics and optics.

`airyAi`, `airyBi`, `airyAiPrime` and `airyBiPrime` evaluate numerically
at a real or a complex argument with `N`, and without `N` when the argument
is a float. Compiled code computes them for a real argument only.

```epsil
[airyAi(0.0), airyAi(1.0)]
// ➔ [0.35502805388781723926,0.135292416312881415524]
N(airyAi(1 + i))
// ➔ (0.060458308371838146 - 0.15188956587718141i)
```

Above machine precision, `airyAi` and `airyBi` of a real argument are
computed to the engine precision. Past $|x| = 10^4$, and for `airyBi` past
about $x = 130$, the call stays unevaluated.

```epsil
[N(airyAi(20000)), N(airyBi(140))]
// ➔ [AiryAi(20000),AiryBi(140)]
N(airyBi(100))
// ➔ 6.04122399667020139901e+288
```

The derivative of an Airy function stays within the Airy family:

```epsil
[D(airyAi(x), x), D(airyAiPrime(x), x), D(airyBiPrime(x), x)]
// ➔ [AiryAiPrime(x),x * AiryAi(x),x * AiryBi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

<MathJson name="AiryAi" latex={["\\operatorname{Ai}"]}>

`["AiryAi", x]`. In LaTeX: `\operatorname{Ai}(x)`.

```json example
["N", ["AiryAi", ["Complex", 1, 1]]]
// ➔ 0.060458308371838146 - 0.15188956587718141i
```

</MathJson>

### airyAiPrime

`(complex | infinity) -> number`

Derivative of the Airy function of the first kind

```epsil
N(airyAiPrime(0))
// ➔ -0.2588194037928068
```

$\operatorname{Ai}'$ satisfies $\operatorname{Ai}''(x) = x\operatorname{Ai}(x)$,
so the derivative of an Airy expression stays within the Airy family. Its
value at 0 is exact:

```epsil
[airyAiPrime(0), D(airyAiPrime(x), x)]
// ➔ [-1 / (Gamma(1/3) * root(3)(3)),x * AiryAi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

<MathJson name="AiryAiPrime">

`["AiryAiPrime", x]`. In LaTeX: `\operatorname{Ai}'(x)`.

```json example
["N", ["AiryAiPrime", 0]]
// ➔ -0.2588194037928068
```

</MathJson>

### airyBi

`(complex | infinity) -> number`

Airy function of the second kind

```epsil
N(airyBi(0))
// ➔ 0.614926627446000735151
```

$\operatorname{Bi}$ is the solution of the Airy equation that grows
exponentially for a positive $x$ and oscillates for a negative $x$. Its
value at 0 is exact:

```epsil
airyBi(0)
// ➔ 1 / (Gamma(2/3) * root(6)(3))
[N(airyBi(-2)), airyBi(+oo)]
// ➔ [-0.412302587956398488083,+oo]
```

See [Airy functions](/reference/arithmetic/#airy-functions) for the
evaluation of the four Airy functions.

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

<MathJson name="AiryBi" latex={["\\operatorname{Bi}"]}>

`["AiryBi", x]`. In LaTeX: `\operatorname{Bi}(x)`.

```json example
["N", ["AiryBi", 0]]
// ➔ 0.614926627446000735151
```

</MathJson>

### airyBiPrime

`(complex | infinity) -> number`

Derivative of the Airy function of the second kind

```epsil
N(airyBiPrime(0))
// ➔ 0.4482883573538264
```

$\operatorname{Bi}'$ satisfies $\operatorname{Bi}''(x) = x\operatorname{Bi}(x)$.
Its value at 0 is exact:

```epsil
[airyBiPrime(0), D(airyBiPrime(x), x)]
// ➔ [root(6)(3) / Gamma(1/3),x * AiryBi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

<MathJson name="AiryBiPrime">

`["AiryBiPrime", x]`. In LaTeX: `\operatorname{Bi}'(x)`.

```json example
["N", ["AiryBiPrime", 0]]
// ➔ 0.4482883573538264
```

</MathJson>

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

The argument of a complex number is the angle between the positive real
axis and the line from the origin to the point that represents it in the
complex plane. It is `arctan2(imaginary(z), real(z))`, between `-pi` and
`pi`, with `pi` included. An exact argument stays exact; `N` gives its
numeric value.

```epsil
[argument(3 + 4i), N(argument(3 + 4i))]
// ➔ [arctan(4/3),0.927295218001612232427]
argument(3 + 4i) == arctan2(4, 3)
// ➔ "True"
[argument(-1), argument(-i), argument(-1 - i), argument(0)]
// ➔ [pi,-1/2 * pi,-3/4 * pi,0]
```

The angle is in the angular unit of the engine, as the result of the
inverse trigonometric functions is. The unit is radians unless the program
that hosts the engine sets another one: see
[Angular units](/compute-engine/guides/numeric-evaluation/#angular-units).

<MathJson name="Argument" latex={["\\arg"]}>

`["Argument", z]`, and its alias `["Arg", z]`. In LaTeX: `\arg(z)`.

```json example
["Argument", ["Complex", 3, 4]]
// ➔ ["Arctan", ["Rational", 4, 3]]
["N", ["Arg", ["Complex", 3, 4]]]
// ➔ 0.927295218001612232427
```

</MathJson>

### besselI

`(order: complex, complex | infinity) -> number`

Modified Bessel function of the first kind

```epsil
N(besselI(0, 1))
// ➔ 1.2660658777520083356
```

The modified Bessel function of the first kind of order $n$. Its
derivative with respect to $x$ is

$$
\frac{d}{dx} I_n(x) = \frac{1}{2}(I_{n-1}(x) + I_{n+1}(x))
$$

```epsil
D(besselI(n, x), x)
// ➔ 1/2 * BesselI(n - 1, x) + 1/2 * BesselI(n + 1, x)
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Modified Bessel functions](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions),
[DLMF 10.25](http://dlmf.nist.gov/10.25).

<MathJson name="BesselI" latex={["\\operatorname{I}"]}>

`["BesselI", n, x]`. In LaTeX: `I_n(x)`.

```json example
["N", ["BesselI", 0, 1]]
// ➔ 1.2660658777520083356
```

</MathJson>

### besselJ

`(order: complex, complex | infinity) -> number`

Bessel function of the first kind

```epsil
N(besselJ(0, 1))
// ➔ 0.76519768655796655145
```

The Bessel function of the first kind of order $n$. Its derivative with
respect to $x$ is

$$
\frac{d}{dx} J_n(x) = \frac{1}{2}(J_{n-1}(x) - J_{n+1}(x))
$$

```epsil
D(besselJ(n, x), x)
// ➔ -1/2 * BesselJ(n + 1, x) + 1/2 * BesselJ(n - 1, x)
```

#### Bessel functions

Bessel functions are solutions of Bessel's differential equation:

$$
x^2 \frac{d^2 y}{dx^2} + x \frac{dy}{dx} + (x^2 - n^2)y = 0
$$

They arise in problems with cylindrical or spherical symmetry.

`besselJ`, `besselY`, `besselI` and `besselK` of an integer order evaluate
numerically at a real or a complex argument with `N`, and without `N` when
the argument is a float:

```epsil
[besselJ(0, 1), besselJ(0, 1.0)]
// ➔ [BesselJ(0, 1),0.76519768655796655145]
N(besselJ(3, 0.7i))
// ➔ -0.007367373607628006i
```

The negative real axis is their branch cut. There, `besselY` and `besselK`
take the limit from above, as `ln(-2)` does:

```epsil
N(besselY(0, -2))
// ➔ (0.5103756726497453 + 0.44778155828247124i)
N(ln(-2))
// ➔ (0.693147180559945309417 + 3.14159265358979323846i)
```

A real non-integer order evaluates at a positive real argument. At a
negative or a complex argument it stays symbolic.

```epsil
N(besselJ(1/2, 1))
// ➔ 0.671396707141803090416
[N(besselJ(1/2, -1)), N(besselJ(1/2, i))]
// ➔ [BesselJ(0.5, -1),BesselJ(0.5, i)]
```

Above machine precision, a real argument gives the digits of the engine
precision. A call that cannot reach them stays unevaluated:

```epsil
N(besselI(0, 5000))
// ➔ BesselI(0, 5000)
```

Compiled code computes these functions for a real argument only.

See also: [Bessel function](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_first_kind),
[DLMF 10.2](http://dlmf.nist.gov/10.2).

<MathJson name="BesselJ" latex={["\\operatorname{J}"]}>

`["BesselJ", n, x]`. In LaTeX: `J_n(x)`.

```json example
["N", ["BesselJ", 0, 1]]
// ➔ 0.76519768655796655145

["N", ["BesselJ", 3, ["Complex", 0, 0.7]]]
// ➔ -0.007367373607628006i
```

</MathJson>

### besselK

`(order: complex, complex | infinity) -> number`

Modified Bessel function of the second kind (Macdonald function)

```epsil
N(besselK(0, 1))
// ➔ 0.421024438240708333336
```

The modified Bessel function of the second kind of order $n$, also called
the Macdonald function. Its derivative with respect to $x$ is

$$
\frac{d}{dx} K_n(x) = -\frac{1}{2}(K_{n-1}(x) + K_{n+1}(x))
$$

```epsil
D(besselK(n, x), x)
// ➔ -1/2 * BesselK(n - 1, x) - 1/2 * BesselK(n + 1, x)
[besselK(0, 0), N(besselK(1/2, 2))]
// ➔ [+oo,0.119937771968061447368]
N(besselK(0, -2))
// ➔ (0.11389387274953343 - 7.161528439050256i)
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Modified Bessel functions](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions),
[DLMF 10.25](http://dlmf.nist.gov/10.25).

<MathJson name="BesselK" latex={["\\operatorname{K}"]}>

`["BesselK", n, x]`. In LaTeX: `K_n(x)`.

```json example
["N", ["BesselK", 0, 1]]
// ➔ 0.421024438240708333336
```

</MathJson>

### besselY

`(order: complex, complex | infinity) -> number`

Bessel function of the second kind (Neumann function)

```epsil
N(besselY(0, 1))
// ➔ 0.0882569642156769579829
```

The Bessel function of the second kind of order $n$, also called the
Neumann function. Its derivative with respect to $x$ is

$$
\frac{d}{dx} Y_n(x) = \frac{1}{2}(Y_{n-1}(x) - Y_{n+1}(x))
$$

```epsil
D(besselY(n, x), x)
// ➔ -1/2 * BesselY(n + 1, x) + 1/2 * BesselY(n - 1, x)
besselY(0, 0)
// ➔ -oo
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Bessel function of the second kind](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_second_kind),
[DLMF 10.2](http://dlmf.nist.gov/10.2).

<MathJson name="BesselY" latex={["\\operatorname{Y}"]}>

`["BesselY", n, x]`. In LaTeX: `Y_n(x)`.

```json example
["N", ["BesselY", 0, -2]]
// ➔ 0.5103756726497453 + 0.44778155828247124i
```

</MathJson>

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

$$
\operatorname{B}(a, b) = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
= \int_0^1 t^{a-1}(1-t)^{b-1} \, dt
$$

At a complex argument, `N` gives $\Gamma(a)\Gamma(b)/\Gamma(a+b)$ as a
double.

```epsil
N(beta(1 + i, 2))
// ➔ (0.10000000000000012 - 0.3000000000000001i)
```

#### Incomplete beta function

`beta(z, a, b)` is the incomplete beta function $\operatorname{B}_z(a, b)$,
and `beta(z0, z1, a, b)` the generalized form
$\operatorname{B}_{z_1}(a, b) - \operatorname{B}_{z_0}(a, b)$. For a
rational `z` and positive integers `a` and `b` the value is exact.

```epsil
[beta(0, 1/2, 2, 3), N(beta(0.1, 0.5, 2, 3))]
// ➔ [11/192,0.0529333333333333333333]
```

See also: [Beta function](https://en.wikipedia.org/wiki/Beta_function),
[DLMF 5.12](http://dlmf.nist.gov/5.12).

<MathJson name="Beta" latex={["\\Beta"]}>

`["Beta", a, b]`, `["Beta", z, a, b]` and `["Beta", z0, z1, a, b]`. In
LaTeX: `\Beta(a, b)`.

```json example
["Beta", 2, 3]
// ➔ ["Rational", 1, 12]

["Beta", ["Rational", 1, 2], 2, 3]
// ➔ ["Rational", 11, 192]
```

</MathJson>

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

`(complex, integer) -> list<number>`

All n-th complex roots of a number.

```epsil
complexRoots(1, 4)
// ➔ [1,i,-1,-i]
```

```epsil
complexRoots(8, 3)
// ➔ [2,-1 + sqrt(3)i,-1 - sqrt(3)i]
```

The `n` roots of `z` are the `n` solutions `w` of $w^n = z$. The first one
is the principal root, and the others follow it counterclockwise around
the origin. The roots of unity, `complexRoots(1, n)`, are the vertices of
a regular polygon with `n` sides.

```epsil
complexRoots(1, 3)
// ➔ [1,-1/2 + sqrt(3)/2i,-1/2 - sqrt(3)/2i]
[complexRoots(16, 4), complexRoots(-4, 2)]
// ➔ [[2,2i,-2,-2i],[2i,-2i]]
complexRoots(-8, 3)
// ➔ [1 + sqrt(3)i,-2,1 - sqrt(3)i]
```

`n` must be a positive integer. When `z` is a complex number that is not
real, the roots are floating-point numbers. A symbolic `z` stays
unevaluated.

```epsil
complexRoots(1, 0)
// ➔ error: Runtime error: evaluation error: the arguments do not satisfy the precondition of ComplexRoots
complexRoots(i, 2)
// ➔ [(0.7071067811865476 + 0.7071067811865475i),(-0.7071067811865477 - 0.7071067811865475i)]
complexRoots(x, 2)
// ➔ ComplexRoots(x, 2)
```

See also: [n-th root](https://en.wikipedia.org/wiki/Nth_root),
[Root of unity](https://en.wikipedia.org/wiki/Root_of_unity),
[n-th root (MathWorld)](http://mathworld.wolfram.com/nthRoot.html).

<MathJson name="ComplexRoots">

`["ComplexRoots", z, n]`. In LaTeX: `\operatorname{ComplexRoots}(z, n)`.

```json example
["ComplexRoots", 1, 3]
```

</MathJson>

### conjugate

`(T) -> T where T: number`

Complex conjugate of a number, or the pointwise conjugate of a function.

```epsil
conjugate(3 + 4i)
// ➔ (3 - 4i)
```

The conjugate of a complex number is its mirror image across the real
axis:

$$
\overline{z} = \Re z - i \Im z
$$

The product of a number and its conjugate is the square of its magnitude,
and the conjugate of a product is the product of the conjugates:

```epsil
[conjugate(3 + 4i), conjugate(5), conjugate(2i)]
// ➔ [(3 - 4i),5,-2i]
let z = 3 + 4i
z * conjugate(z) == abs(z)^2
// ➔ "True"
conjugate((1 + 2i) * (3 - i))
// ➔ (5 - 5i)
conjugate(1 + 2i) * conjugate(3 - i)
// ➔ (5 - 5i)
```

<MathJson name="Conjugate" latex={["\\overline"]}>

`["Conjugate", z]`. In LaTeX: `\overline{z}`. `z^\ast` is read as
`ConjugateTranspose`, which is the conjugate for a number.

```json example
["Conjugate", ["Complex", 3, 4]]
// ➔ ["Complex", 3, -4]
```

</MathJson>

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
// ➔ [-eulerGamma,-0.577215664901532860607]
```

### dirichletBeta

`(complex | infinity) -> number`

Dirichlet beta function β(s) = Σ_&#123;n≥0&#125; (−1)^n/(2n+1)^s = 4^(−s) (ζ(s, 1/4) − ζ(s, 3/4)), entire; β(1) = π/4, β(2) = G, β(+∞) = 1.

```epsil
[dirichletBeta(1), dirichletBeta(3), N(dirichletBeta(1/2))]
// ➔ [1/4 * pi,1/32 * pi^3,0.667691457189609176659]
```

The values at the integers are exact. A real `s` is computed to the engine
precision, a complex `s` in double precision.

```epsil
[dirichletBeta(2), dirichletBeta(5)]
// ➔ ["CatalanConstant",5/1536 * pi^5]
[dirichletBeta(0), dirichletBeta(-1)]
// ➔ [1/2,0]
N(dirichletBeta(1 + i))
// ➔ (0.8616306241992917 + 0.1764491519835i)
```

<MathJson name="DirichletBeta">

`["DirichletBeta", s]`. In LaTeX: `\beta(s)`.

```json example
["DirichletBeta", 1]
// ➔ ["Multiply", ["Rational", 1, 4], "Pi"]

["DirichletBeta", 2]
// ➔ "CatalanConstant"
```

</MathJson>

### dirichletEta

`(complex | infinity) -> number`

Dirichlet eta function η(s) = Σ_&#123;n≥1&#125; (−1)^(n−1)/n^s = (1 − 2^(1−s)) ζ(s), entire; η(1) = ln 2, η(+∞) = 1.

```epsil
[dirichletEta(2), dirichletEta(1), N(dirichletEta(1/2))]
// ➔ [1/12 * pi^2,ln(2),0.604898643421630370247]
```

The values at the integers are exact. A real `s` is computed to the engine
precision, also next to $s = 1$. A complex `s` is computed in double
precision.

```epsil
[dirichletEta(0), dirichletEta(-1), N(dirichletEta(1.001))]
// ➔ [1/2,1/4,0.693307016778961202313]
N(dirichletEta(1 + i))
// ➔ (0.7265597750624632 + 0.15809586390120733i)
```

<MathJson name="DirichletEta">

`["DirichletEta", s]`. In LaTeX: `\eta(s)`.

```json example
["DirichletEta", 2]
// ➔ ["Multiply", ["Rational", 1, 12], ["Power", "Pi", 2]]

["DirichletEta", 1]
// ➔ ["Ln", 2]
```

</MathJson>

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

For a non-integer `n`, `n!` is `gamma(n + 1)`. An exact non-integer
argument stays symbolic, and `N` or a float argument gives the value to the
engine precision:

```epsil
[(5/2)!, N((5/2)!), 2.5!]
// ➔ [(5/2)!,3.32335097044784255118,3.32335097044784255118]
```

At a negative integer, `n!` is a pole:

```epsil
[0!, (-1)!]
// ➔ [1,~oo]
```

Above machine precision, a factorial too large for an exact integer is a
big decimal under `N`:

```epsil
N((10^6)!)
// ➔ 8.26393168833124006238e+5565708
```

<MathJson name="Factorial" latex={["!"]}>

`["Factorial", n]`. In LaTeX: `n!`.

```json example
["Factorial", 5]
// ➔ 120

["Factorial", ["Rational", 5, 2]]
// ➔ (5/2)!

["Factorial", 2.5]
// ➔ 3.32335097044784255118
```

</MathJson>

### factorial2

`(complex | infinity) -> number`

Double Factorial Function

```epsil
[factorial2(7), factorial2(8)]
// ➔ [105,384]
```

The double factorial of `n` is $n!! = n \cdot (n-2) \cdot (n-4) \cdots$,
the product of the positive integers up to `n` that have the same parity
as `n`. It can also be written with the $\Gamma$ function:

$$
n!! = 2^{\frac{n}{2}+\frac{1}{4}(1-\cos(\pi n))}\pi^{\frac{1}{4}(\cos(\pi
n)-1)}\Gamma\left(\frac{n}{2}+1\right)
$$

It is not the factorial of the factorial of `n`:

```epsil
[factorial2(6), (3!)!]
// ➔ [48,720]
[factorial2(0), factorial2(-1), factorial2(-3)]
// ➔ [1,1,-1]
```

Epsil has no `!!` operator: write `factorial2(n)`.

```epsil
5!!
// ➔ error: Unexpected symbol "!!"
```

See also: [Double factorial](https://en.wikipedia.org/wiki/Double_factorial).

<MathJson name="Factorial2" latex={["!!"]}>

`["Factorial2", n]`. In LaTeX: `n!!`.

```json example
["Factorial2", 5]
// ➔ 15
```

</MathJson>

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

The gamma function extends the factorial, with its argument shifted by 1,
to real and complex numbers:

$$
\Gamma(z) = \int_0^{\infty} t^{z-1} e^{-t} \, \mathrm{d}t
$$

A half-integer argument gives a rational multiple of $\sqrt{\pi}$, and the
non-positive integers are poles:

```epsil
[gamma(5), gamma(-3/2), gamma(0)]
// ➔ [24,4/3 * sqrt(pi),~oo]
```

#### Incomplete gamma function

With two arguments, `gamma(s, z)` is the **upper incomplete gamma
function**: the lower limit of the integral is `z` instead of 0.

$$
\Gamma(s, z) = \int_z^{\infty} t^{s-1} e^{-t} \, \mathrm{d}t
$$

The order `s` and the lower limit `z` can be real or complex, including
negative and fractional orders. For a positive integer order the value is
a closed form, $\Gamma(\frac12, z)$ is $\sqrt{\pi}\operatorname{erfc}\sqrt{z}$,
and $\Gamma(s, 0)$ is $\Gamma(s)$. This is the `Gamma[s, z]` convention of
Mathematica.

```epsil
[gamma(2, 1), gamma(2, x), gamma(s, 0)]
// ➔ [2 / e,(x + 1) * e^(-x),Gamma(s)]
gamma(1/2, z)
// ➔ Erfc(sqrt(z)) * sqrt(pi)
```

Other exact arguments stay symbolic; `N` gives their value:

```epsil
N(gamma(-1/2, 1))
// ➔ 0.178147711781560690193
N(gamma(1 + i, 2))
// ➔ (0.06463204417295909 + 0.11284029404942608i)
```

With three arguments, `gamma(s, z0, z1)` is the **generalized incomplete
gamma function** $\Gamma(s, z_0) - \Gamma(s, z_1)$, the integral from $z_0$
to $z_1$.

See also: [Gamma function](https://en.wikipedia.org/wiki/Gamma_function),
[DLMF 5.2.E1](http://dlmf.nist.gov/5.2.E1),
[DLMF 8.2.E2](http://dlmf.nist.gov/8.2.E2).

<MathJson name="Gamma" latex={["\\Gamma"]}>

`["Gamma", z]`, `["Gamma", s, z]` and `["Gamma", s, z0, z1]`. In LaTeX:
`\Gamma(z)` and `\Gamma(s, z)`. `\Gamma(n)` is `(n-1)!`.

```json example
["Gamma", 5]
// ➔ 24

["Gamma", ["Rational", 1, 2]]
// ➔ ["Sqrt", "Pi"]

["Gamma", 2, 1]
// ➔ ["Divide", 2, "ExponentialE"]

["N", ["Gamma", 2, 1, 3]]
// ➔ 0.536610608871428871274
```

</MathJson>

### gammaLn

`(complex | infinity) -> number`

Natural logarithm of the gamma function.

```epsil
N(gammaLn(100))
// ➔ 359.134205369575398776
```

`gammaLn(z)` is the principal logarithm of $\Gamma(z)$, as `gammaln` in
MATLAB and SciPy. It is not the `LogGamma` of Mathematica, the analytic
continuation of $\ln\Gamma$, which is
[`logGamma`](/reference/special-functions/#loggamma) here. The two agree
for a positive real argument and differ by a multiple of $2\pi i$
elsewhere:

```epsil
[N(gammaLn(5)), N(logGamma(5))]
// ➔ [3.17805383034794561965,3.17805383034794561965]
N(gammaLn(-1.5))
// ➔ 0.860047015376481014511
N(logGamma(-1.5))
// ➔ (0.8600470153764792 - 6.283185307179586i)
```

<MathJson name="GammaLn">

`["GammaLn", z]`. In LaTeX: `\ln(\Gamma(z))`.

```json example
["N", ["GammaLn", -1.5]]
// ➔ 0.860047015376481014511
```

</MathJson>

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

`(complex | infinity, (complex | infinity)?) -> number`

Harmonic number H_n = Σ_&#123;k=1&#125;^n 1/k, exact at a non-negative integer and continued by ψ(n+1) + γ; with a second argument r, the generalized H_n^(r) = Σ_&#123;k=1&#125;^n 1/k^r = ζ(r) − ζ(r, n+1).

```epsil
[harmonicNumber(10), harmonicNumber(10, 2), N(harmonicNumber(1/2))]
// ➔ [7381/2520,1968329/1270080,0.613705638880109381166]
```

For a non-negative integer `n` and an integer `r`, the value is an exact
rational. For a rational `n` with a denominator from 2 to 4, and `r = 1`,
the value is exact, from $H_n = \psi(n+1) + \gamma$. Another rational stays
unevaluated.

```epsil
[harmonicNumber(3, 2), harmonicNumber(4, -1), harmonicNumber(1/2)]
// ➔ [49/36,10,2 - 2ln(2)]
[harmonicNumber(1/4), harmonicNumber(1/5)]
// ➔ [4 - 3ln(2) - 1/2 * pi,HarmonicNumber(1/5)]
```

Elsewhere `N` gives the continuation $\psi(n+1) + \gamma$, or
$\zeta(r) - \zeta(r, n+1)$ for $r \ne 1$. A negative integer `n` is a pole.

```epsil
[N(harmonicNumber(0.5)), N(harmonicNumber(2, 1/2)), harmonicNumber(-2)]
// ➔ [0.613705638880109381166,1.7071067811865475244,~oo]
```

<MathJson name="HarmonicNumber">

`["HarmonicNumber", n]` and `["HarmonicNumber", n, r]`.

```json example
["HarmonicNumber", 10]
// ➔ ["Rational", 7381, 2520]

["HarmonicNumber", 3, 2]
// ➔ ["Rational", 49, 36]
```

</MathJson>

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

The imaginary part of a real number is 0.

```epsil
[imaginary(3 + 4i), imaginary(pi), imaginary(sqrt(-4))]
// ➔ [4,0,2]
imaginary(e^(i * pi / 3))
// ➔ sqrt(3)/2
```

<MathJson name="Imaginary" latex={["\\Im"]}>

`["Imaginary", z]`. In LaTeX: `\Im(z)`.

```json example
["Imaginary", ["Complex", 3, 4]]
// ➔ 4
["Imaginary", "Pi"]
// ➔ 0
```

</MathJson>

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
// ➔ [true,false]
```

### isEven

MathJSON `IsEven` · `(number) -> boolean`

`IsEven(n)` returns `True` if `n` is an even number

```epsil
[isEven(7), isEven(8)]
// ➔ [false,true]
```

### isOdd

MathJSON `IsOdd` · `(number) -> boolean`

`IsOdd(n)` returns `True` if `n` is an odd number

```epsil
[isOdd(7), isOdd(8)]
// ➔ [true,false]
```

### isPrime

MathJSON `IsPrime` · `(number) -> boolean`

`IsPrime(n)` returns `True` if `n` is a prime number

```epsil
[isPrime(17), isPrime(21)]
// ➔ [true,false]
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

The Lambert W function, also called the product logarithm, is the inverse
of $f(w) = w e^w$. For a value $x$, $W_k(x)$ is the value $w$ on branch $k$
such that $w e^w = x$. The branch $k$ is an integer. When it is not given,
it is 0, the principal branch $W_0$.

$W_k(x)$ is real only on the two real branches:

- $W_0(x)$ for $x \ge -1/e$
- $W_{-1}(x)$ for $-1/e \le x < 0$

On the other branches, and for other arguments, the value is complex.

```epsil
[lambertW(-1/e), N(lambertW(-0.3)), N(lambertW(-0.3, -1))]
// ➔ [-1,-0.489402227180214969036,-1.78133702342162761197]
N(lambertW(-1))
// ➔ (-0.3181315052047641 + 1.3372357014306895i)
N(lambertW(-0.3, 1))
// ➔ (-3.3002378364383755 + 7.436294411632747i)
```

`lambertW(-1/e)` is exact. Other values with a simple closed form, such as
W(0) = 0 and W(e) = 1, are given by `N`:

```epsil
[lambertW(0), N(lambertW(0)), N(lambertW(e))]
// ➔ [LambertW(0),0,1]
```

#### Argument order

The branch is the **second** argument: `lambertW(x, k)`. This is the order
of mpmath (`lambertw(z, k)`), SciPy, SymPy, Julia and Fungrim. Mathematica
(`ProductLog[k, z]`, or `LambertW[k, z]` in Wolfram|Alpha), Maple, Sage and
MATLAB put the branch **first**. When you copy an expression from one of
these systems, swap the two arguments.

A branch that is not an integer is a type error. When both arguments are
integers, a swap is not an error: `lambertW(1, 2)` is $W_2(1)$ and
`lambertW(2, 1)` is $W_1(2)$.

```epsil
lambertW(-1, -0.1)
// ➔ error: Type error: expected `integer`, got `-0.1` at `-0.1` in `lambertW(-1, -0.1)`
N(lambertW(1, 2))
// ➔ (-2.401585104868003 + 10.77629951611507i)
N(lambertW(2, 1))
// ➔ (-0.83431036663111 + 4.5302659985550084i)
```

To make the order clear, name the branch. The parameters are named `z` and
`branch`, and named arguments can be in any order:

```epsil
N(lambertW(branch: -1, z: -0.1))
// ➔ -3.57715206395729721841
```

#### Derivative

$$
\frac{d}{dx} W_k(x) = \frac{W_k(x)}{x(1 + W_k(x))}
$$

```epsil
D(lambertW(x), x)
// ➔ LambertW(x) / (x * (LambertW(x) + 1))
```

See also: [Lambert W function](https://en.wikipedia.org/wiki/Lambert_W_function),
[DLMF 4.13](http://dlmf.nist.gov/4.13).

<MathJson name="LambertW" latex={["\\operatorname{W}"]}>

`["LambertW", z]` and `["LambertW", z, k]`, with the branch second. In
LaTeX: `\operatorname{W}(x)` and `\operatorname{W}_{k}(x)`.

```json example
["N", ["LambertW", -0.1, -1]]
// ➔ -3.57715206395729721841

["N", ["LambertW", -0.1, ["NamedArgument", "'branch'", -1]]]
// ➔ -3.57715206395729721841

["N", ["LambertW", ["NamedArgument", "'branch'", -1],
  ["NamedArgument", "'z'", -0.1]]]
// ➔ -3.57715206395729721841
```

</MathJson>

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
// ➔ [-oo,true]
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
// ➔ [+oo,true]
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

A real number is its own real part. The real part of a symbol of unknown
type stays unevaluated.

```epsil
[real(3 + 4i), real(pi), real(2i), real(x)]
// ➔ [3,pi,0,Real(x)]
real(e^(i * pi / 3))
// ➔ 1/2
```

<MathJson name="Real" latex={["\\Re"]}>

`["Real", z]`. In LaTeX: `\Re(z)`.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

</MathJson>

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

For a complex `s` with a real part greater than 1, the Riemann zeta
function is

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$

and it is extended to other values by analytic continuation. At a complex
`s`, `N` gives a double. Above $|\operatorname{Im} s| \approx 12\,868$ the
call stays unevaluated.

```epsil
[zeta(0), zeta(-2), zeta(1)]
// ➔ [-1/2,0,~oo]
N(zeta(1/2 + 12000i))
// ➔ (-0.03313149368569025 - 0.11149640109324212i)
N(zeta(1/2 + 13000i))
// ➔ Zeta((0.5 + 13000i))
```

#### Generalized zeta function

`zeta(s, a)` is the generalized zeta function as Mathematica defines it:

$$
\zeta(s, a) = \sum_{n=0}^{\infty} \frac{1}{|n + a|^s}
$$

with the term where $n + a = 0$ omitted, except at $s = 0$, where every
term is 1 and $\zeta(0, a) = \frac12 - a$ for every numeric $a$.

```epsil
[zeta(2, -1), zeta(0, 3), zeta(s, 1)]
// ➔ [1 + 1/6 * pi^2,-5/2,Zeta(s)]
```

For $a > 0$ it is equal to the Hurwitz zeta function
[`hurwitzZeta(s, a)`](/reference/arithmetic/#hurwitzzeta), which sums
$(n + a)^{-s}$ with the principal power. For $a \le 0$ the two differ:

```epsil
N(zeta(2.976, -2.664))
// ➔ 29.9024396938557276849
N(hurwitzZeta(2.976, -2.664))
// ➔ (22.600262690249576 - 0.275416075811198i)
```

See also: [Riemann zeta function](https://en.wikipedia.org/wiki/Riemann_zeta_function),
[DLMF 25.2](http://dlmf.nist.gov/25.2).

<MathJson name="Zeta" latex={["\\Zeta"]}>

`["Zeta", s]` and `["Zeta", s, a]`. In LaTeX: `\zeta(s)`.

```json example
["Zeta", 2]
// ➔ ["Multiply", ["Rational", 1, 6], ["Power", "Pi", 2]]

["Zeta", 0, 3]
// ➔ ["Rational", -5, 2]
```

</MathJson>

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
