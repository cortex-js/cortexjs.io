<!-- The detail of the entries of /reference/trigonometry/. Format: README.md. -->

## Section: Trigonometric functions

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

## Section: Trigonometric simplification

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

## InverseFunction

`inverseFunction(f)` is the inverse of the function `f`, such as `arcsin` for
`sin`. It is an operator: it takes a function and gives a function.

```epsil
inverseFunction(sin)(x)
// ➔ arcsin(x)
```

### MathJSON

`["InverseFunction", f]`. In LaTeX: `\sin^{-1}(x)`.

```json example
[["InverseFunction", "Sin"], "x"]
```

## FresnelS

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

### MathJSON

`["FresnelS", x]`. In LaTeX: `\operatorname{FresnelS}(x)`.

```json example
["N", ["FresnelS", 1]]
// ➔ 0.438259147390354766077
```

## FresnelC

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

### MathJSON

`["FresnelC", x]`. In LaTeX: `\operatorname{FresnelC}(x)`.

```json example
["N", ["FresnelC", 1]]
// ➔ 0.779893400376822829474
```

## Arccot

On the real line, `arccot` takes its values between `0` and `pi`. For a
complex argument, $\operatorname{arccot}(z) = \frac{\pi}{2} -
\operatorname{arctan}(z)$.

```epsil
[arccot(-1), arccot(0)]
// ➔ [3/4 * pi,1/2 * pi]
N(arccot(1 + i)) == N(pi/2 - arctan(1 + i))
// ➔ true
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

### MathJSON

`["Arccot", z]`.

```json example
["Arccot", -1]
// ➔ ["Multiply", ["Rational", 3, 4], "Pi"]
```

## Haversine

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

### MathJSON

`["Haversine", z]`, `["InverseHaversine", z]`.

```json example
["Haversine", ["Divide", "Pi", 2]]
// ➔ ["Rational", 1, 2]
```

## TrigExpand

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

### MathJSON

`["TrigExpand", expr]`.

```json example
["TrigExpand", ["Sin", ["Add", "a", "b"]]]
// ➔ ["Add", ["Multiply", ["Sin", "b"], ["Cos", "a"]], ["Multiply", ["Sin", "a"], ["Cos", "b"]]]
["TrigExpand", ["Cos", ["Multiply", 2, "x"]]]
// ➔ ["Add", ["Negate", ["Power", ["Sin", "x"], 2]], ["Power", ["Cos", "x"], 2]]
```

## TrigReduce

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

### MathJSON

`["TrigReduce", expr]`.

```json example
["TrigReduce", ["Power", ["Sin", "x"], 2]]
// ➔ ["Add", ["Multiply", ["Rational", -1, 2], ["Cos", ["Multiply", 2, "x"]]], ["Rational", 1, 2]]
["TrigReduce", ["Multiply", ["Sin", "x"], ["Cos", "x"]]]
// ➔ ["Multiply", ["Rational", 1, 2], ["Sin", ["Multiply", 2, "x"]]]
```

## TrigToExp

`trigToExp` exposes the exponential structure of an expression, which can
make it easier to manipulate algebraically. A hyperbolic function becomes
a real exponential:

```epsil
trigToExp(sinh(x))
// ➔ 1/2 * (-e^(-x) + e^x)
trigToExp(tan(x))
// ➔ -i * (-e^(-i * x) + e^(i * x)) / (e^(i * x) + e^(-i * x))
```

### MathJSON

`["TrigToExp", expr]`.

```json example
["TrigToExp", ["Cos", "x"]]
// ➔ ["Multiply", ["Rational", 1, 2], ["Add", ["Power", "ExponentialE", ["Multiply", ["Complex", 0, 1], "x"]], ["Power", "ExponentialE", ["Multiply", ["Complex", 0, -1], "x"]]]]
```
