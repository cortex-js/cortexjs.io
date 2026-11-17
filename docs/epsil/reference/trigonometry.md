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

<MathJson name="Arccot" latex={["arcctg"]} />

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

<MathJson name="FresnelC" latex={["FresnelC"]} />

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

<MathJson name="FresnelS" latex={["FresnelS"]} />

### haversine

MathJSON `Haversine` · `(real) -> number`

Haversine function.

```epsil
haversine(pi / 3)
// ➔ 1/4
```

```epsil
haversine(x)
// ➔ 1/2 * (1 - cos(x))
```

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

MathJSON `TrigExpand` · `(value) -> value`

Expand trigonometric and hyperbolic functions of sums and integer multiples of angles. Example: TrigExpand(sin(a+b)) → sin(a)cos(b) + cos(a)sin(b), TrigExpand(sin(2x)) → 2 sin(x) cos(x)

```epsil
trigExpand(sin(a + b))
// ➔ sin(b) * cos(a) + sin(a) * cos(b)
```

```epsil
trigExpand(cos(2 * x))
// ➔ -sin(x)^2 + cos(x)^2
```

### trigReduce

MathJSON `TrigReduce` · `(value) -> value`

Rewrite products and integer powers of trigonometric and hyperbolic functions as a linear combination of functions of multiple angles (the inverse of TrigExpand). Example: TrigReduce(sin(x)^2) → (1 - cos(2x))/2

```epsil
trigReduce(sin(x)^2)
// ➔ -1/2 * cos(2x) + 1/2
```

```epsil
trigReduce(sin(x) * cos(x))
// ➔ 1/2 * sin(2x)
```

### trigToExp

MathJSON `TrigToExp` · `(value) -> value`

Rewrite trigonometric and hyperbolic functions in terms of the complex exponential, exactly. Example: TrigToExp(sin(x)) → -(i/2) e^&#123;ix&#125; + (i/2) e^&#123;-ix&#125;

```epsil
trigToExp(cos(x))
// ➔ 1/2 * (e^(i * x) + e^(-i * x))
```
