---
title: Trigonometry Reference
sidebar_label: Trigonometry
slug: /reference/trigonometry/
description: "The trigonometry library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from trigonometry.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Trigonometry

The **trigonometry** library holds the constant `pi`, the conversions of
angles, the circular and hyperbolic functions with their inverses, the
cardinal sine and the trigonometric integrals, and three functions that
rewrite trigonometric expressions. This introduction gives the concepts you
need before you read the entries.

## The functions

Each circular function has an inverse, a hyperbolic form, and an inverse
hyperbolic form. The inverse hyperbolic functions use the ISO 80000-2 names:
`arsinh`, not `arcsinh`. The prefix "ar" stands for "area".

| Function | Inverse                | Hyperbolic | Inverse hyperbolic |
| :------- | :--------------------- | :--------- | :----------------- |
| `sin`    | `arcsin`               | `sinh`     | `arsinh`           |
| `cos`    | `arccos`               | `cosh`     | `arcosh`           |
| `tan`    | `arctan`, `arctan2`    | `tanh`     | `artanh`           |
| `cot`    | `arccot`               | `coth`     | `arcoth`           |
| `sec`    | `arcsec`               | `sech`     | `arsech`           |
| `csc`    | `arccsc`               | `csch`     | `arcsch`           |

The functions apply to each element of a list:

```epsil
sin([0, pi / 6, pi / 2])
// ➔ [0, 1/2, 1]
```

## Angles

The argument of a circular function is an angle in radians. `degrees(d)`
converts an angle in degrees to radians, and `dms(d, m, s)` converts an angle
in degrees, minutes and seconds. Both conversions are exact when their
arguments are exact.

```epsil
[degrees(180), degrees(45), dms(12, 30)]
// ➔ [pi, 1/4 * pi, 5/72 * pi]
```

```epsil
sin(degrees(30))
// ➔ 1/2
```

## Exact values and numeric values

When the argument is exact, the result is exact. If the value at the argument
is known in closed form, the function returns that value. The closed form can
contain square roots:

```epsil
[sin(pi / 6), cos(5pi / 4), tan(pi / 12)]
// ➔ [1/2, -sqrt(2)/2, 2 - sqrt(3)]
```

If no closed form is known, the result stays symbolic. `N` gives a numeric
value:

```epsil
[sin(1), N(sin(1))]
// ➔ [sin(1), 0.841470984807896506653]
```

When the argument is a floating-point number, the result is a floating-point
number:

```epsil
sin(1.2)
// ➔ 0.93203908596722634967
```

At a pole, the value is the complex infinity `~oo`:

```epsil
[tan(pi / 2), sec(pi / 2), cot(0)]
// ➔ [~oo, ~oo, ~oo]
```

## The inverse functions and their ranges

An inverse function returns the principal value. The principal value is in
the range that this table shows.

| Function         | Range of the principal value     |
| :--------------- | :------------------------------- |
| `arcsin`         | from `-pi/2` to `pi/2`           |
| `arccos`         | from `0` to `pi`                 |
| `arctan`         | between `-pi/2` and `pi/2`       |
| `arccot`         | between `0` and `pi`             |
| `arcsec`         | from `0` to `pi`, not `pi/2`     |
| `arccsc`         | from `-pi/2` to `pi/2`, not `0`  |
| `arctan2(y, x)`  | between `-pi` and `pi`, `pi` included |

```epsil
[arcsin(1), arccos(-1), arctan(-1), arcsec(-2), arccsc(-2)]
// ➔ [1/2 * pi, pi, -1/4 * pi, 2/3 * pi, -1/6 * pi]
```

The range of `arccot` is between `0` and `pi`. Thus a negative argument gives
an angle between `pi/2` and `pi`:

```epsil
N([arccot(1), arccot(-1)])
// ➔ [0.785398163397448309616, 2.35619449019234492885]
```

`arctan2(y, x)` is the angle of the point `(x, y)`. The first argument is the
`y` coordinate. The function uses the signs of both coordinates to find the
quadrant:

```epsil
[arctan2(1, 1), arctan2(1, -1), arctan2(-1, -1), arctan2(0, -1)]
// ➔ [1/4 * pi, 3/4 * pi, -3/4 * pi, pi]
```

When the argument is exact and no real value exists, the result stays
symbolic. `N` then gives the complex principal value:

```epsil
[arcsin(2), N(arcsin(2))]
// ➔ [arcsin(2), (1.57079632679489661923 - 1.31695789692481670863i)]
```

`inverseFunction` returns the inverse of a function:

```epsil
[inverseFunction(sin), inverseFunction(cosh)]
// ➔ [arcsin, arcosh]
```

## Trigonometric transformations

Three functions rewrite a trigonometric or hyperbolic expression. They keep
exact values exact.

`trigExpand` expands a function of a sum, or of an integer multiple of an
angle:

```epsil
trigExpand(sin(a + b))
// ➔ sin(b) * cos(a) + sin(a) * cos(b)
```

```epsil
trigExpand(cos(2x))
// ➔ -sin(x)^2 + cos(x)^2
```

`trigReduce` does the opposite operation. It changes products and integer
powers into a sum of functions of multiple angles:

```epsil
trigReduce(cos(x)^3)
// ➔ 1/4 * cos(3x) + 3/4 * cos(x)
```

`trigToExp` writes the functions with the complex exponential:

```epsil
trigToExp(cosh(x))
// ➔ 1/2 * (e^x + e^(-x))
```

`simplify` uses the trigonometric identities, for example the Pythagorean
identities and the double-angle formulas:

```epsil
simplify(sin(x)^2 + cos(x)^2)
// ➔ 1
```

```epsil
simplify(1 + tan(x)^2)
// ➔ sec(x)^2
```

## Trigonometric functions

### Complex values

With `N`, an inverse circular or inverse hyperbolic function returns its
complex principal value when no real value exists. A floating-point
argument gives the complex value without `N`. Complex arguments are also
accepted:

```epsil
[arcsin(2), N(arcsin(2))]
// ➔ [arcsin(2),(1.57079632679489661923 - 1.31695789692481670863i)]
arcosh(0.5)
// ➔ 1.04719755119659774615i
N(arsinh(1 + i))
// ➔ (1.0612750619050357 + 0.6662394324925153i)
```

### Hyperbolic functions of a logarithm

A hyperbolic function of `ln(q)`, for a rational `q`, is a rational
number, since $\cosh(\ln q) = \frac{1}{2}(q + q^{-1})$:

```epsil
[cosh(ln(2)), sinh(ln(3)), tanh(ln(2)), coth(ln(2))]
// ➔ [5/4,4/3,3/5,5/3]
```

### A function of its inverse

A function of its own inverse is its argument, for each circular and
hyperbolic function. An inverse of its own function gives the principal
value when the argument is an exact real number. `arcsin(sin(x))` stays,
because it is not `x` outside $[-\pi/2, \pi/2]$.

```epsil
[sin(arcsin(x)), cosh(arcosh(x)), tan(arctan(x))]
// ➔ [x,x,x]
[arcsin(sin(3)), arccos(cos(5)), arcsin(sin(x))]
// ➔ [-3 + pi,-5 + 2pi,arcsin(sin(x))]
```

`simplify` also rewrites a function of a different inverse, and an
inverse of a negated argument:

```epsil
[simplify(cos(arcsin(x))), simplify(tan(arcsin(x)))]
// ➔ [sqrt(1 - x^2),x / sqrt(1 - x^2)]
[simplify(arccos(-x)), simplify(arccot(-x))]
// ➔ [-arccos(x) + pi,-arccot(x) + pi]
```

## Trigonometric simplification

`simplify` applies the trigonometric identities that make an expression
shorter. `trigExpand` and `trigReduce` apply the identities that change
its form; [Trigonometric transformations](#trigonometric-transformations)
describes them.

```epsil
[simplify(sin(x)^2 + cos(x)^2), simplify(1 - sin(x)^2)]
// ➔ [1,cos(x)^2]
[simplify(1 + tan(x)^2), simplify(2sin(x) * cos(x))]
// ➔ [sec(x)^2,sin(2x)]
[simplify(sin(x) / cos(x)), simplify(cos(x) / sin(x))]
// ➔ [tan(x),cot(x)]
```

The JavaScript API also has the Fu algorithm, a systematic search for a
simpler equivalent form, as a strategy of its `simplify` method: see
[Trigonometric simplification](/compute-engine/guides/simplify/#trigonometric-simplification).

### Supported identities

| Identity | Example | Epsil |
| :--- | :--- | :--- |
| Pythagorean | $\sin^2 x + \cos^2 x = 1$, $1 + \tan^2 x = \sec^2 x$ | `simplify` |
| Quotient | $\sin x / \cos x = \tan x$ | `simplify` |
| Double angle | $2 \sin x \cos x = \sin 2x$ | `simplify`, `trigReduce` |
| Double angle | $\cos^2 x - \sin^2 x = \cos 2x$ | `trigReduce` |
| Sum of angles | $\sin(a + b) = \sin a \cos b + \cos a \sin b$ | `trigExpand` |
| Product to sum | $\sin x \cos y = \frac{1}{2}(\sin(x + y) + \sin(x - y))$ | `trigReduce` |
| Exponential form | $\cos x = \frac{1}{2}(e^{ix} + e^{-ix})$ | `trigToExp` |

```epsil
trigReduce(cos(x)^2 - sin(x)^2)
// ➔ cos(2x)
trigReduce(sin(x) * cos(y))
// ➔ 1/2 * sin(x + y) + 1/2 * sin(x - y)
```

`simplify` and the transformation functions do not apply the reciprocal
identities, such as $\csc x \sin x = 1$, nor the sum-to-product identities,
such as $\sin x + \sin y = 2 \sin \frac{x+y}{2} \cos \frac{x-y}{2}$. The
Fu algorithm of the JavaScript API applies the reciprocal identities and
Morrie's law, for products of cosines of doubled angles.

```epsil
[simplify(csc(x) * sin(x)), trigReduce(sin(x) + sin(y))]
// ➔ [sin(x) * csc(x),sin(x) + sin(y)]
```

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### arccos

`(complex | quantity) -> number`

Arccosine, the inverse cosine function.

```epsil
arccos(1/2)
// ➔ 1/3 * pi
```

```epsil
N(arccos(1/3))
// ➔ 1.23095941734077468213
```

<MathJson name="Arccos" latex={["\\arccos"]} />

### arccot

`(complex | quantity | signed_infinity) -> number`

Arccotangent, the inverse cotangent function.

```epsil
N(arccot(1))
// ➔ 0.785398163397448309616
```

```epsil
N(arccot(-1))
// ➔ 2.35619449019234492885
```

On the real line, `arccot` takes its values between `0` and `pi`. For a
complex argument, $\operatorname{arccot}(z) = \frac{\pi}{2} -
\operatorname{arctan}(z)$.

```epsil
[arccot(-1), arccot(0)]
// ➔ [3/4 * pi,1/2 * pi]
N(arccot(1 + i)) == N(pi/2 - arctan(1 + i))
// ➔ "True"
```

`arccot` is continuous across the real line: next to `-3`, its value is
next to `arccot(-3)`. Its branch cuts are those of `arctan`: the imaginary
axis above `i` and below `-i`.

```epsil
N(arccot(-3 + 10^(-12) * i))
// ➔ (2.819842099193151 - 9.999999999999999e-14i)
N(arccot(-3))
// ➔ 2.81984209919315104506
N([arccot(2i), arccot(-2i)])
// ➔ [-0.5493061443340549i,(3.141592653589793 + 0.5493061443340549i)]
```

Some systems (Mathematica, mpmath) define the arccotangent as
$\operatorname{arctan}(1/z)$ instead. That is an odd function, and it
differs from this one by $\pi$ when $\operatorname{Re} z < 0$.

<MathJson name="Arccot" latex={["arcctg"]}>

`["Arccot", z]`.

```json example
["Arccot", -1]
// ➔ ["Multiply", ["Rational", 3, 4], "Pi"]
```

</MathJson>

### arccsc

`(complex | infinity | quantity) -> number`

Arccosecant, the inverse cosecant function.

```epsil
arccsc(2)
// ➔ 1/6 * pi
```

```epsil
N(arccsc(3))
// ➔ 0.339836909454121937096
```

<MathJson name="Arccsc" latex={["arccsc"]} />

### arcosh

`(complex | quantity | signed_infinity) -> number`

Inverse hyperbolic cosine (area hyperbolic cosine).

```epsil
arcosh(1)
// ➔ 0
```

```epsil
N(arcosh(2))
// ➔ 1.31695789692481670863
```

<MathJson name="Arcosh" latex={["arcosh"]} />

### arcoth

`(complex | infinity | quantity) -> number`

Inverse hyperbolic cotangent (area hyperbolic cotangent).

```epsil
N(arcoth(2))
// ➔ 0.549306144334054845698
```

<MathJson name="Arcoth" latex={["arcoth"]} />

### arcsch

`(complex | infinity | quantity) -> number`

Inverse hyperbolic cosecant (area hyperbolic cosecant).

```epsil
N(arcsch(1))
// ➔ 0.881373587019543025232
```

<MathJson name="Arcsch" latex={["arcsch"]} />

### arcsec

`(complex | infinity | quantity) -> number`

Arcsecant, the inverse secant function.

```epsil
arcsec(2)
// ➔ 1/3 * pi
```

```epsil
N(arcsec(3))
// ➔ 1.23095941734077468214
```

<MathJson name="Arcsec" latex={["arcsec"]} />

### arcsin

`(complex | quantity) -> number`

Arcsine, the inverse sine function.

```epsil
arcsin(1/2)
// ➔ 1/6 * pi
```

```epsil
N(arcsin(2))
// ➔ (1.57079632679489661923 - 1.31695789692481670863i)
```

<MathJson name="Arcsin" latex={["\\arcsin"]} />

### arctan

`(complex | quantity | signed_infinity) -> number`

Inverse tangent.

```epsil
arctan(1)
// ➔ 1/4 * pi
```

```epsil
N(arctan(2))
// ➔ 1.10714871779409050302
```

<MathJson name="Arctan" latex={["\\arctan"]} />

### arctan2

MathJSON `Arctan2` · `(y: real | signed_infinity, x: real | signed_infinity) -> real`

Two-argument arctangent giving the angle of a vector.

```epsil
arctan2(1, -1)
// ➔ 3/4 * pi
```

```epsil
arctan2(-1, -1)
// ➔ -3/4 * pi
```

### arsech

`(complex | quantity | signed_infinity) -> number`

Inverse hyperbolic secant (area hyperbolic secant).

```epsil
arsech(1)
// ➔ 0
```

```epsil
N(arsech(1/2))
// ➔ 1.31695789692481670863
```

<MathJson name="Arsech" latex={["arsech"]} />

### arsinh

`(complex | quantity | signed_infinity) -> number`

Inverse hyperbolic sine (area hyperbolic sine).

```epsil
arsinh(0)
// ➔ 0
```

```epsil
N(arsinh(1))
// ➔ 0.881373587019543025232
```

<MathJson name="Arsinh" latex={["arsinh"]} />

### artanh

`(complex | quantity | signed_infinity) -> number`

Inverse hyperbolic tangent (area hyperbolic tangent).

```epsil
artanh(0)
// ➔ 0
```

```epsil
N(artanh(1/2))
// ➔ 0.549306144334054845698
```

<MathJson name="Artanh" latex={["artanh"]} />

### cos

`(complex | quantity) -> number`

Cosine of an angle.

```epsil
cos(pi / 3)
// ➔ 1/2
```

```epsil
N(cos(1))
// ➔ 0.540302305868139717401
```

<MathJson name="Cos" latex={["\\cos"]} />

### cosIntegral

MathJSON `CosIntegral` · `(complex | infinity) -> number`

Cosine integral: γ + ln(x) + ∫₀ˣ (cos(t)−1)/t dt.

```epsil
N(cosIntegral(1))
// ➔ 0.33740392290096816
```

### cosh

`(complex | quantity | signed_infinity) -> number`

Hyperbolic cosine.

```epsil
cosh(0)
// ➔ 1
```

```epsil
N(cosh(1))
// ➔ 1.54308063481524377848
```

<MathJson name="Cosh" latex={["\\cosh"]} />

### coshIntegral

MathJSON `CoshIntegral` · `(complex | infinity) -> number`

Hyperbolic cosine integral: γ + ln|x| + ∫₀ˣ (cosh(t)−1)/t dt.

```epsil
N(coshIntegral(1))
// ➔ 0.8378669409802082
```

### cot

`(complex | quantity) -> number`

Cotangent, the reciprocal of tangent.

```epsil
cot(pi / 6)
// ➔ sqrt(3)
```

```epsil
N(cot(1))
// ➔ 0.642092615934330703005
```

<MathJson name="Cot" latex={["\\cot"]} />

### coth

`(complex | quantity | signed_infinity) -> number`

Hyperbolic cotangent, the reciprocal of hyperbolic tangent.

```epsil
N(coth(1))
// ➔ 1.31303528549933130364
```

<MathJson name="Coth" latex={["\\coth"]} />

### csc

`(complex | quantity) -> number`

Cosecant, the reciprocal of sine.

```epsil
csc(pi / 6)
// ➔ 2
```

```epsil
N(csc(1))
// ➔ 1.18839510577812121626
```

<MathJson name="Csc" latex={["\\csc"]} />

### csch

`(complex | quantity | signed_infinity) -> number`

Hyperbolic cosecant, the reciprocal of hyperbolic sine.

```epsil
N(csch(1))
// ➔ 0.850918128239321545136
```

<MathJson name="Csch" latex={["\\csch"]} />

### dms

MathJSON `DMS` · `(number, number?, number?) -> number`

Construct an angle from degrees, minutes, and seconds.

```epsil
dms(30, 15)
// ➔ 121/720 * pi
```

```epsil
N(dms(30, 15))
// ➔ 0.527962098728284697019
```

### degrees

`(real) -> real`

Convert an angle in degrees.

```epsil
degrees(30)
// ➔ 1/6 * pi
```

```epsil
sin(degrees(30))
// ➔ 1/2
```

<MathJson name="Degrees" latex={["\\degree"]} />

### fresnelC

`(complex | signed_infinity) -> complex`

Fresnel cosine integral.

```epsil
fresnelC(+oo)
// ➔ 1/2
```

```epsil
N(fresnelC(1))
// ➔ 0.779893400376822829474
```

$$
C(x) = \int_0^x \cos\!\left(\frac{\pi t^2}{2}\right) dt
$$

It is an odd function, $C(-x) = -C(x)$, which `simplify` applies, and
$C(\infty) = \tfrac{1}{2}$. Its derivative is the integrand:

```epsil
[simplify(fresnelC(-x)), fresnelC(-oo)]
// ➔ [-FresnelC(x),-1/2]
D(fresnelC(x), x)
// ➔ cos(1/2 * pi * x^2)
```

See also: [Fresnel integral](https://en.wikipedia.org/wiki/Fresnel_integral),
[DLMF 7.2](http://dlmf.nist.gov/7.2).

<MathJson name="FresnelC" latex={["FresnelC"]}>

`["FresnelC", x]`. In LaTeX: `\operatorname{FresnelC}(x)`.

```json example
["N", ["FresnelC", 1]]
// ➔ 0.779893400376822829474
```

</MathJson>

### fresnelS

`(complex | signed_infinity) -> complex`

Fresnel sine integral.

```epsil
fresnelS(+oo)
// ➔ 1/2
```

```epsil
N(fresnelS(1))
// ➔ 0.438259147390354766077
```

$$
S(x) = \int_0^x \sin\!\left(\frac{\pi t^2}{2}\right) dt
$$

It is an odd function, $S(-x) = -S(x)$, which `simplify` applies, and
$S(\infty) = \tfrac{1}{2}$. Its derivative is the integrand:

```epsil
[simplify(fresnelS(-x)), N(fresnelS(-1)), fresnelS(0)]
// ➔ [-FresnelS(x),-0.438259147390354766077,0]
D(fresnelS(x), x)
// ➔ sin(1/2 * pi * x^2)
N(fresnelS(1 + i))
// ➔ (-2.0618882191948398 + 2.0618882191948398i)
```

#### Fresnel integrals

The [Fresnel integrals](https://en.wikipedia.org/wiki/Fresnel_integral)
arise in the description of near-field diffraction and in the geometry of
the Cornu spiral (Euler spiral).

See also: [DLMF 7.2](http://dlmf.nist.gov/7.2).

<MathJson name="FresnelS" latex={["FresnelS"]}>

`["FresnelS", x]`. In LaTeX: `\operatorname{FresnelS}(x)`.

```json example
["N", ["FresnelS", 1]]
// ➔ 0.438259147390354766077
```

</MathJson>

### haversine

`(real) -> number`

Haversine function.

```epsil
haversine(pi / 3)
// ➔ 1/4
```

```epsil
haversine(x)
// ➔ 1/2 * (1 - cos(x))
```

$$
\operatorname{hav}(z) = \sin^2 \frac{z}{2} = \frac{1 - \cos z}{2}
$$

The [haversine](https://en.wikipedia.org/wiki/Haversine_formula) was
important in navigation: it appears in the haversine formula, which
computes the distance between two points on a sphere from their
latitudes and longitudes. `inverseHaversine(z)` is
$2 \arcsin \sqrt{z}$.

```epsil
[haversine(pi), inverseHaversine(1)]
// ➔ [1,pi]
```

<MathJson name="Haversine">

`["Haversine", z]`, `["InverseHaversine", z]`.

```json example
["Haversine", ["Divide", "Pi", 2]]
// ➔ ["Rational", 1, 2]
```

</MathJson>

### hypot

MathJSON `Hypot` · `(infinity | real, infinity | real) -> +oo | nan | real`

Hypotenuse length: sqrt(x^2 + y^2).

```epsil
hypot(3, 4)
// ➔ 5
```

```epsil
hypot(1, 1)
// ➔ sqrt(2)
```

### inverseFunction

`(function) -> function`

Inverse of a function.

```epsil
inverseFunction(sin)
// ➔ arcsin
```

```epsil
inverseFunction(tan)(1)
// ➔ 1/4 * pi
```

`inverseFunction(f)` is the inverse of the function `f`, such as `arcsin` for
`sin`. It is an operator: it takes a function and gives a function.

```epsil
inverseFunction(sin)(x)
// ➔ arcsin(x)
```

<MathJson name="InverseFunction" latex={["^{-1"]}>

`["InverseFunction", f]`. In LaTeX: `\sin^{-1}(x)`.

```json example
[["InverseFunction", "Sin"], "x"]
```

</MathJson>

### inverseHaversine

MathJSON `InverseHaversine` · `(real) -> number`

Inverse haversine function.

```epsil
inverseHaversine(1/2)
// ➔ 1/2 * pi
```

```epsil
N(inverseHaversine(1/4))
// ➔ 1.04719755119659774615
```

### pi

constant `real<3.141592653589793..3.141592653589794>` = `3.14159265358979323846`

The constant π ≈ 3.14159, the ratio of a circle's circumference to its diameter.

```epsil
N(pi)
// ➔ 3.14159265358979323846
```

```epsil
cos(pi)
// ➔ -1
```

<MathJson name="Pi" latex={["\\pi"]} />

### sec

`(complex | quantity) -> number`

Secant, the reciprocal of cosine.

```epsil
sec(pi / 3)
// ➔ 2
```

```epsil
N(sec(1))
// ➔ 1.85081571768092561791
```

<MathJson name="Sec" latex={["\\sec"]} />

### sech

`(complex | quantity | signed_infinity) -> number`

Hyperbolic secant, the reciprocal of hyperbolic cosine.

```epsil
sech(0)
// ➔ 1
```

```epsil
N(sech(1))
// ➔ 0.648054273663885399574
```

<MathJson name="Sech" latex={["sech"]} />

### sin

`(complex | quantity) -> number`

Sine of an angle.

```epsil
sin(pi / 6)
// ➔ 1/2
```

```epsil
sin(1)
// ➔ sin(1)
```

```epsil
N(sin(1))
// ➔ 0.841470984807896506653
```

<MathJson name="Sin" latex={["\\sin"]} />

### sinIntegral

MathJSON `SinIntegral` · `(complex | infinity) -> number`

Sine integral: ∫₀ˣ sin(t)/t dt.

```epsil
sinIntegral(+oo)
// ➔ 1/2 * pi
```

```epsil
N(sinIntegral(1))
// ➔ 0.946083070367183
```

### sinc

`(complex | signed_infinity) -> complex`

Unnormalized sinc function: sin(x)/x with sinc(0)=1.

```epsil
sinc(0)
// ➔ 1
```

```epsil
N(sinc(1))
// ➔ 0.841470984807896506653
```

<MathJson name="Sinc" latex={["sinc"]} />

### sinh

`(complex | quantity | signed_infinity) -> number`

Hyperbolic sine.

```epsil
sinh(0)
// ➔ 0
```

```epsil
N(sinh(1))
// ➔ 1.17520119364380145688
```

<MathJson name="Sinh" latex={["\\sinh"]} />

### sinhIntegral

MathJSON `SinhIntegral` · `(complex | infinity) -> number`

Hyperbolic sine integral: ∫₀ˣ sinh(t)/t dt.

```epsil
sinhIntegral(0)
// ➔ 0
```

```epsil
N(sinhIntegral(1))
// ➔ 1.0572508753757286
```

### tan

`(complex | quantity) -> number`

Tangent of an angle.

```epsil
tan(pi / 3)
// ➔ sqrt(3)
```

```epsil
N(tan(1))
// ➔ 1.55740772465490223051
```

<MathJson name="Tan" latex={["\\tan"]} />

### tanh

`(complex | quantity | signed_infinity) -> number`

Hyperbolic tangent.

```epsil
tanh(0)
// ➔ 0
```

```epsil
N(tanh(1))
// ➔ 0.761594155955764888119
```

<MathJson name="Tanh" latex={["\\tanh"]} />

### trigExpand

`(value) -> value`

Expand trigonometric and hyperbolic functions of sums and integer multiples of angles. Example: TrigExpand(sin(a+b)) → sin(a)cos(b) + cos(a)sin(b), TrigExpand(sin(2x)) → 2 sin(x) cos(x)

```epsil
trigExpand(sin(a + b))
// ➔ sin(b) * cos(a) + sin(a) * cos(b)
```

```epsil
trigExpand(cos(2 * x))
// ➔ -sin(x)^2 + cos(x)^2
```

`trigExpand` is the trigonometric analog of `expand`. Hyperbolic functions
are expanded with their own addition formulas. `sec`, `csc` and `cot` are
expanded as the reciprocals of the expanded `cos`, `sin` and `tan`.

```epsil
trigExpand(sinh(a + b))
// ➔ sinh(b) * cosh(a) + sinh(a) * cosh(b)
trigExpand(sin(3x))
// ➔ -sin(x)^3 + 3sin(x) * cos(x)^2
trigExpand(tan(a + b))
// ➔ (tan(a) + tan(b)) / (1 - tan(a) * tan(b))
trigExpand(sec(a + b))
// ➔ 1 / (cos(a) * cos(b) - sin(a) * sin(b))
```

Only sums and integer multiples are expanded. An exact value stays exact:

```epsil
[trigExpand(sin(x / 2)), trigExpand(sin(2.5 * x))]
// ➔ [sin(1/2 * x),sin(2.5 * x)]
trigExpand(sin(pi/6 + x))
// ➔ 1/2 * cos(x) + sqrt(3)/2 * sin(x)
```

<MathJson name="TrigExpand">

`["TrigExpand", expr]`.

```json example
["TrigExpand", ["Sin", ["Add", "a", "b"]]]
// ➔ ["Add", ["Multiply", ["Sin", "b"], ["Cos", "a"]], ["Multiply", ["Sin", "a"], ["Cos", "b"]]]
["TrigExpand", ["Cos", ["Multiply", 2, "x"]]]
// ➔ ["Add", ["Negate", ["Power", ["Sin", "x"], 2]], ["Power", ["Cos", "x"], 2]]
```

</MathJson>

### trigReduce

`(value) -> value`

Rewrite products and integer powers of trigonometric and hyperbolic functions as a linear combination of functions of multiple angles (the inverse of TrigExpand). Example: TrigReduce(sin(x)^2) → (1 - cos(2x))/2

```epsil
trigReduce(sin(x)^2)
// ➔ -1/2 * cos(2x) + 1/2
```

```epsil
trigReduce(sin(x) * cos(x))
// ➔ 1/2 * sin(2x)
```

`trigReduce` is the inverse of `trigExpand`, and the trigonometric analog
of `factor`. A product of functions of different angles becomes a sum,
and hyperbolic functions are reduced with their own formulas:

```epsil
trigReduce(-sin(x)^3 + 3sin(x) * cos(x)^2)
// ➔ sin(3x)
trigReduce(cos(x)^4)
// ➔ 1/8 * cos(4x) + 1/2 * cos(2x) + 3/8
trigReduce(sinh(x)^2)
// ➔ 1/2 * cosh(2x) - 1/2
trigReduce(cos(x) * cos(2x) * cos(4x))
// ➔ 1/4 * cos(x) + 1/4 * cos(3x) + 1/4 * cos(5x) + 1/4 * cos(7x)
```

<MathJson name="TrigReduce">

`["TrigReduce", expr]`.

```json example
["TrigReduce", ["Power", ["Sin", "x"], 2]]
// ➔ ["Add", ["Multiply", ["Rational", -1, 2], ["Cos", ["Multiply", 2, "x"]]], ["Rational", 1, 2]]
["TrigReduce", ["Multiply", ["Sin", "x"], ["Cos", "x"]]]
// ➔ ["Multiply", ["Rational", 1, 2], ["Sin", ["Multiply", 2, "x"]]]
```

</MathJson>

### trigToExp

`(value) -> value`

Rewrite trigonometric and hyperbolic functions in terms of the complex exponential, exactly. Example: TrigToExp(sin(x)) → -(i/2) e^&#123;ix&#125; + (i/2) e^&#123;-ix&#125;

```epsil
trigToExp(cos(x))
// ➔ 1/2 * (e^(i * x) + e^(-i * x))
```

`trigToExp` exposes the exponential structure of an expression, which can
make it easier to manipulate algebraically. A hyperbolic function becomes
a real exponential:

```epsil
trigToExp(sinh(x))
// ➔ 1/2 * (-e^(-x) + e^x)
trigToExp(tan(x))
// ➔ -i * (-e^(-i * x) + e^(i * x)) / (e^(i * x) + e^(-i * x))
```

<MathJson name="TrigToExp">

`["TrigToExp", expr]`.

```json example
["TrigToExp", ["Cos", "x"]]
// ➔ ["Multiply", ["Rational", 1, 2], ["Add", ["Power", "ExponentialE", ["Multiply", ["Complex", 0, 1], "x"]], ["Power", "ExponentialE", ["Multiply", ["Complex", 0, -1], "x"]]]]
```

</MathJson>
