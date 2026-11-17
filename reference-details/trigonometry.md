<!-- The detail of the entries of /reference/trigonometry/. Format: README.md. -->

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
