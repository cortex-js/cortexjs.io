---
title: Special functions Reference
sidebar_label: Special functions
slug: /reference/special-functions/
description: "The special functions library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from special-functions.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Special functions

The 19 definitions of the special functions library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Infinite and NaN arguments

The special functions take a `complex | infinity` argument, a type that
includes `+oo`, `-oo` and `NaN` alongside the finite numbers. They are not
restricted to finite input the way the
[number theory](/reference/number-theory/) functions are.

An infinite argument is accepted. Where the function has a limit there, that
limit is the value. Where it has none, the result is `NaN` or the call stays
symbolic:

```epsil
[erf(+oo), erfc(+oo), erf(-oo), gamma(+oo), airyAi(-oo)]
// ➔ [1,0,-1,+oo,0]
[gamma(-oo), zeta(-oo), polyLog(2, +oo)]
// ➔ [NaN,NaN,PolyLog(2, +oo)]
```

A `NaN` argument gives `NaN`, also without `N`: `NaN` is not an exact
value, so there is nothing to hold symbolically.

```epsil
[erf(NaN), gamma(NaN), besselJ(0, NaN), lambertW(NaN)]
// ➔ [NaN,NaN,NaN,NaN]
```

A function can still be infinite at a finite point, such as $K(1) = \infty$.
The result is then `+oo`, or `~oo` (complex infinity) at a pole of a
function of a complex variable:

```epsil
[ellipticK(1), logGamma(0), gamma(0), zeta(1)]
// ➔ [+oo,+oo,~oo,~oo]
```

## Elliptic integrals

The complete elliptic integrals arise in computing the arc length of an
ellipse, the period of a pendulum, and throughout number theory.

These functions use the **parameter** $m = k^2$, where $k$ is the modulus.
This is the convention of Mathematica, mpmath and
[Fungrim](https://fungrim.org). To evaluate in terms of the modulus $k$,
pass $k^2$.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### agm

`(complex | infinity, (complex | infinity)?) -> number`

Arithmetic-geometric mean. AGM(z) is shorthand for AGM(1, z) (Fungrim convention).

The arithmetic-geometric mean of `a` and `b` is the common limit of the
sequences $a_{n+1} = \frac{a_n + b_n}{2}$ and $b_{n+1} = \sqrt{a_n b_n}$.
`agm(z)` is `agm(1, z)`. The value is numeric: use `N`.

```epsil
[agm(2), N(agm(2)), N(agm(1, 2))]
// ➔ [AGM(2),1.45679103104690686918,1.45679103104690686918]
N(agm(1, i))
// ➔ (0.5990701173677961 + 0.5990701173677961i)
```

See also: [Arithmetic–geometric mean](https://en.wikipedia.org/wiki/Arithmetic%E2%80%93geometric_mean),
[DLMF 19.8](http://dlmf.nist.gov/19.8).

<MathJson name="AGM">

`["AGM", a, b]` and `["AGM", z]`. In LaTeX: `\operatorname{agm}(a, b)`.

```json example
["N", ["AGM", 1, 2]]
// ➔ 1.45679103104690686918
```

</MathJson>

### appellF1

MathJSON `AppellF1` · `(complex | infinity, complex | infinity, complex | infinity, complex | infinity, complex | infinity, complex | infinity) -> number`

Appell hypergeometric function F₁(a; b₁, b₂; c; x, y), double series for |x|, |y| &lt; 1.

### barnesG

`(complex | infinity) -> number`

The Barnes G-function, the double gamma function G(z+1) = Γ(z)·G(z), G(1) = 1. G(n) is the superfactorial 1!·2!⋯(n−2)! at a positive integer n; G is entire, with zeros at the non-positive integers.

```epsil
barnesG(5)
// ➔ 12
```

```epsil
N(barnesG(1/2))
// ➔ 0.603244281209446206191
```

At a positive integer `n`, `barnesG(n)` is the superfactorial
$\prod_{k=0}^{n-2} k!$, an exact integer. A real argument is computed to
the engine precision, a complex argument in double precision.

```epsil
[barnesG(10), barnesG(0), barnesG(-2)]
// ➔ [5056584744960000,0,0]
N(barnesG(1 + i))
// ➔ (1.8038767269253262 + 0.006717570579723474i)
```

<MathJson name="BarnesG">

`["BarnesG", z]`.

```json example
["BarnesG", 5]
// ➔ 12

["N", ["BarnesG", ["Rational", 1, 2]]]
// ➔ 0.603244281209446206191
```

</MathJson>

### clausenCl

`(integer, real) -> number`

Clausen function Clₙ(θ) of integer order n ≥ 1 and real θ: Im Liₙ(e^&#123;iθ&#125;) = Σ sin(kθ)/kⁿ for even n, Re Liₙ(e^&#123;iθ&#125;) = Σ cos(kθ)/kⁿ for odd n. A real θ follows the engine precision.

```epsil
[clausenCl(2, 1), clausenCl(3, 0), N(clausenCl(2, 1))]
// ➔ [ClausenCl(2, 1),Zeta(3),1.01395913236076850429]
```

The Clausen functions are the `clsin` and `clcos` functions of mpmath:

$$
\operatorname{Cl}_n(\theta) = \sum_{k=1}^{\infty} \frac{\sin(k\theta)}{k^n}
\text{ for even } n, \qquad
\operatorname{Cl}_n(\theta) = \sum_{k=1}^{\infty} \frac{\cos(k\theta)}{k^n}
\text{ for odd } n
$$

Some values at special points are exact:

```epsil
[clausenCl(2, pi/2), clausenCl(2, pi), clausenCl(4, pi/2)]
// ➔ ["CatalanConstant",0,DirichletBeta(4)]
```

A real θ is computed to the engine precision for an order up to 40. An
order above 40, an order of 0 or less, and a symbolic θ stay unevaluated. A
non-integer order is a type error.

```epsil
[clausenCl(41, 1), clausenCl(0, 1), clausenCl(2, x)]
// ➔ [ClausenCl(41, 1),ClausenCl(0, 1),ClausenCl(2, x)]
clausenCl(1/2, 1)
// ➔ error: Type error: expected `integer`, got `rational<0.5..0.5>` at `1 / 2` in `clausenCl(1 / 2, 1)`
```

A value is given only when all its digits reach the engine precision. At a
zero of the function, such as θ = π/3 and θ = 5π/3 for `clausenCl(1, θ)`, they
cannot, and the call stays unevaluated, also with `N`. Close to a zero, the
value is given:

```epsil
[clausenCl(1, 1.05), N(clausenCl(1, pi/3))]
// ➔ [-0.00242307133771859470069,ClausenCl(1, 1.04719755119659774615)]
```

<MathJson name="ClausenCl">

`["ClausenCl", n, theta]`. In LaTeX: `\operatorname{Cl}_n(\theta)`.

```json example
["ClausenCl", 2, ["Divide", "Pi", 2]]
// ➔ CatalanConstant

["ClausenCl", 3, 0]
// ➔ Zeta(3)

["N", ["ClausenCl", 2, 1]]
// ➔ 1.01395913236076850429
```

</MathJson>

### dedekindEta

`(complex | infinity) -> number`

Dedekind eta function η(τ), Im(τ) &gt; 0.

On the upper half-plane, $\operatorname{Im}(\tau) > 0$:

$$
\eta(\tau) = e^{i\pi\tau/12} \prod_{k=1}^{\infty} \left(1 - e^{2\pi i k
\tau}\right)
$$

It is a modular form of weight $\frac12$, central to the theory of modular
functions and of integer partitions.

`N` computes a `τ` with $\operatorname{Im}(\tau) \ge 0.001$ to the engine
precision. $\eta(i)$ is $\Gamma(1/4)/(2\pi^{3/4})$:

```epsil
[N(dedekindEta(i)), N(gamma(1/4) / (2 * pi^(3/4)))]
// ➔ [0.768225422326056659003,0.768225422326056659002]
N(dedekindEta(1/2 + i))
// ➔ (0.764503166797142301409 + 0.100648751322317266587i)
```

Above machine precision, a `τ` closer to the real axis stays unevaluated,
and so does a `τ` in the lower half-plane:

```epsil
[N(dedekindEta(0.0009i)), N(dedekindEta(-i))]
// ➔ [DedekindEta(0.0009i),DedekindEta(-i)]
```

See also: [Dedekind eta function](https://en.wikipedia.org/wiki/Dedekind_eta_function),
[DLMF 23.15](http://dlmf.nist.gov/23.15).

<MathJson name="DedekindEta">

`["DedekindEta", tau]`. In LaTeX: `\eta(\tau)`.

```json example
["N", ["DedekindEta", "ImaginaryUnit"]]
// ➔ 0.768225422326056659003
```

</MathJson>

### eisensteinE

MathJSON `EisensteinE` · `(number, complex | infinity) -> number`

Normalized Eisenstein series Eₛ(τ) of even weight s ≥ 2, Im(τ) &gt; 0.

### ellipticE

`(complex | infinity, (complex | infinity)?) -> number`

Elliptic integral of the second kind: complete E(m) with one argument, incomplete E(φ|m) with two (amplitude first, parameter convention m = k², as in Mathematica).

The complete integral is

$$
E(m) = \int_0^{\pi/2} \sqrt{1 - m \sin^2\theta} \, d\theta
$$

The perimeter of an ellipse with semi-major axis $a$ and eccentricity $e$
is $4aE(e^2)$. For $a = 1$ and $e = 0.6$:

```epsil
N(4 * ellipticE(0.6^2))
// ➔ 5.67233357779489692628
```

$E(0) = \pi/2$ and $E(1) = 1$. For $m > 1$ the value is complex.

```epsil
[ellipticE(0), ellipticE(1)]
// ➔ [1/2 * pi,1]
N(ellipticE(2))
// ➔ (0.5990701173677957 + 0.5990701173677964i)
```

See also: [Complete elliptic integral of the second kind](https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind),
[DLMF 19.2](http://dlmf.nist.gov/19.2).

<MathJson name="EllipticE">

`["EllipticE", m]` and `["EllipticE", phi, m]`. In LaTeX: `E(m)`.

```json example
["N", ["EllipticE", 0.5]]
// ➔ 1.35064388104767550252
```

</MathJson>

### ellipticF

MathJSON `EllipticF` · `(complex | infinity, complex | infinity) -> number`

Incomplete elliptic integral of the first kind F(φ|m) (amplitude first, parameter convention m = k², as in Mathematica). F(π/2|m) = K(m).

### ellipticK

`(complex | infinity) -> number`

Complete elliptic integral of the first kind K(m), parameter convention m = k².

$$
K(m) = \int_0^{\pi/2} \frac{d\theta}{\sqrt{1 - m \sin^2\theta}}
$$

It is computed with the arithmetic-geometric mean:
$K(m) = \dfrac{\pi}{2\operatorname{agm}(1, \sqrt{1-m})}$.

```epsil
[N(ellipticK(0.5)), N(pi / (2 * agm(1, sqrt(1 - 0.5))))]
// ➔ [1.85407467730137191843,1.85407467730137191843]
```

$K(0) = \pi/2$ and $K(1) = \infty$. For $m > 1$ the value is complex.

```epsil
[ellipticK(0), ellipticK(1)]
// ➔ [1/2 * pi,+oo]
N(ellipticK(2))
// ➔ (1.3110287771460598 - 1.3110287771460598i)
```

See also: [Complete elliptic integral of the first kind](https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind),
[DLMF 19.2](http://dlmf.nist.gov/19.2).

<MathJson name="EllipticK">

`["EllipticK", m]`. In LaTeX: `K(m)`.

```json example
["N", ["EllipticK", 0.5]]
// ➔ 1.85407467730137191843
```

</MathJson>

### ellipticPi

MathJSON `EllipticPi` · `(complex | infinity, complex | infinity, (complex | infinity)?) -> number`

Elliptic integral of the third kind: complete Π(n|m) with two arguments, incomplete Π(n; φ|m) with three (characteristic first, amplitude second, parameter convention m = k², as in Mathematica).

### expIntegralEi

MathJSON `ExpIntegralEi` · `(complex | infinity) -> number`

Exponential integral Ei(x) = PV ∫_&#123;−∞&#125;^x eᵗ/t dt.

### hypergeometric1F1

`(complex | infinity, complex | infinity, complex | infinity) -> number`

Kummer confluent hypergeometric function ₁F₁(a; b; z) = M(a, b, z).

$M(a, b, z)$ is another notation for this function:

$$
{}_1F_1(a; b; z) = \sum_{n=0}^{\infty} \frac{(a)_n}{(b)_n} \frac{z^n}{n!}
$$

It is an entire function of `z`, and `N` evaluates it at any real or
complex `z`. With a repeated parameter, `hypergeometric1F1(a, a, z)` is
$e^z$.

```epsil
hypergeometric1F1(a, a, z)
// ➔ e^z
[N(hypergeometric1F1(1, 2, 2)), N((e^2 - 1)/2)]
// ➔ [3.19452804946532511362,3.19452804946532511362]
N(hypergeometric1F1(1, 2, 3 + 4i))
// ➔ (-4.127579483866333 + 0.43651115746579056i)
```

See also: [Confluent hypergeometric function](https://en.wikipedia.org/wiki/Confluent_hypergeometric_function),
[DLMF 13.2](http://dlmf.nist.gov/13.2).

<MathJson name="Hypergeometric1F1">

`["Hypergeometric1F1", a, b, z]`. In LaTeX: `{}_1F_1(a; b; z)`.

```json example
["N", ["Hypergeometric1F1", 1, 2, 2]]
// ➔ 3.19452804946532511362
```

</MathJson>

### hypergeometric2F1

`(complex | infinity, complex | infinity, complex | infinity, complex | infinity) -> number`

Gauss hypergeometric function ₂F₁(a, b; c; z).

For $|z| < 1$ the function is the series

$$
{}_2F_1(a, b; c; z) = \sum_{n=0}^{\infty} \frac{(a)_n (b)_n}{(c)_n}
\frac{z^n}{n!}
$$

where $(q)_n$ is the Pochhammer symbol (rising factorial). Elsewhere it is
continued analytically.

Many elementary and special functions are particular cases, such as
$\ln(1+z) = z \cdot {}_2F_1(1, 1; 2; -z)$ and
$K(m) = \frac{\pi}{2} \, {}_2F_1\big(\frac12, \frac12; 1; m\big)$:

```epsil
[N(hypergeometric2F1(1, 1, 2, 0.5)), N(2 * ln(2))]
// ➔ [1.38629436111989061883,1.38629436111989061883]
N(pi/2 * hypergeometric2F1(1/2, 1/2, 1, 0.5))
// ➔ 1.85407467730137191844
```

With `z = 0` the value is 1, and with a repeated parameter,
`hypergeometric2F1(a, b, b, z)` is $(1 - z)^{-a}$:

```epsil
[hypergeometric2F1(a, b, c, 0), hypergeometric2F1(a, b, b, z)]
// ➔ [1,(1 - z)^(-a)]
```

When `a` or `b` is a non-positive integer, the series ends and the function
is a polynomial in `z`: `N` evaluates it at any `z`. Otherwise `N` evaluates
it for a real `z` and for a complex `z` in the unit disk and the region of
the Pfaff transformation. At `z = 1` it can diverge.

```epsil
[N(hypergeometric2F1(-2, 1, 1, 5)), N(hypergeometric2F1(1, 1, 2, 1))]
// ➔ [16,+oo]
N(hypergeometric2F1(1, 1, 2, 0.9i))
// ➔ (0.8142390019850076 + 0.32962602515429684i)
```

See also: [Hypergeometric function](https://en.wikipedia.org/wiki/Hypergeometric_function),
[DLMF 15.2](http://dlmf.nist.gov/15.2).

<MathJson name="Hypergeometric2F1">

`["Hypergeometric2F1", a, b, c, z]`. In LaTeX: `{}_2F_1(a, b; c; z)`.

```json example
["N", ["Hypergeometric2F1", 1, 1, 2, 0.5]]
// ➔ 1.38629436111989061883
```

</MathJson>

### jacobiTheta

`(number, complex | infinity, complex | infinity, number?) -> number`

Jacobi theta function θⱼ(z, τ), j ∈ &#123;1,2,3,4&#125;, nome q = e^&#123;iπτ&#125; (Fungrim convention).

For $\operatorname{Im}(\tau) > 0$,

$$
\theta_3(z, \tau) = 1 + 2\sum_{n=1}^{\infty} q^{n^2} \cos(2n\pi z)
$$

and similarly for $\theta_1$, $\theta_2$ and $\theta_4$.

The trigonometric argument is a multiple of $\pi z$, so the functions have
period 1 in `z`. This is the convention of [Fungrim](https://fungrim.org)
and mpmath, not the classical convention with period $\pi$.

`N` computes the value in double precision. At `τ = i`, $\theta_3(0, i)$
is $\pi^{1/4}/\Gamma(3/4)$:

```epsil
[N(jacobiTheta(3, 0, i)), N(pi^(1/4) / gamma(3/4))]
// ➔ [1.086434811213308,1.08643481121330801458]
```

The optional fourth argument is the order of differentiation with respect
to `z`. Only order 0 evaluates numerically. A `τ` with
$\operatorname{Im}(\tau) \le 0$, or an index other than 1 to 4, stays
unevaluated.

```epsil
[N(jacobiTheta(3, 0, i, 1)), N(jacobiTheta(3, 0, -i))]
// ➔ [JacobiTheta(3, 0, i, 1),JacobiTheta(3, 0, -i)]
```

See also: [Theta function](https://en.wikipedia.org/wiki/Theta_function),
[DLMF 20.2](http://dlmf.nist.gov/20.2).

<MathJson name="JacobiTheta">

`["JacobiTheta", j, z, tau]` and `["JacobiTheta", j, z, tau, order]`. In
LaTeX: `\theta_j(z, \tau)`.

```json example
["N", ["JacobiTheta", 3, 0, "ImaginaryUnit"]]
// ➔ 1.086434811213308
```

</MathJson>

### logBarnesG

`(complex | infinity) -> number`

The logarithm of the Barnes G-function, continued analytically with `LogGamma`: its imaginary part is not principal on the negative axis. −∞ at the zeros of G, the non-positive integers.

```epsil
logBarnesG(5)
// ➔ 2ln(2) + ln(3)
```

```epsil
N(logBarnesG(-1/2))
// ➔ (-1.7709451779743404 + 3.141592653589793i)
```

The continuation with `logGamma` is the one of Mathematica.
`logBarnesG(0)` is `-oo`:

```epsil
[logBarnesG(1), logBarnesG(0)]
// ➔ [0,-oo]
N(logBarnesG(-2.5))
// ➔ (-2.574748476853131 + 18.84955592153876i)
```

<MathJson name="LogBarnesG">

`["LogBarnesG", z]`.

```json example
["N", ["LogBarnesG", -2.5]]
// ➔ -2.574748476853131 + 18.84955592153876i
```

</MathJson>

### logGamma

`(complex | infinity) -> number`

The analytic continuation of ln Γ(z), with its branch cut on (−∞, 0]; not `GammaLn`, the principal logarithm of Γ(z), which jumps by 2πi across the zeros of Im Γ.

```epsil
logGamma(5)
// ➔ 3ln(2) + ln(3)
```

```epsil
N(logGamma(-2.5 + 1.5i))
// ➔ (-3.7175134511917927 - 7.713065525834192i)
```

`logGamma(z)` is the `LogGamma` of Mathematica and the `loggamma` of
mpmath. It is exact where `gamma` is exact, and its poles at the
non-positive integers are `+oo`. A real argument is computed to the engine
precision, a complex argument in double precision.

```epsil
[logGamma(1/2), logGamma(0), logGamma(-2)]
// ➔ [1/2 * ln(pi),+oo,+oo]
N(logGamma(1 + i))
// ➔ (-0.6509231993018556 - 0.30164032046753286i)
```

For a positive real argument `logGamma` and
[`gammaLn`](/reference/arithmetic/#gammaln) agree. Elsewhere they differ by
a multiple of $2\pi i$:

```epsil
N(gammaLn(-1.5))
// ➔ 0.860047015376481014511
N(logGamma(-1.5))
// ➔ (0.8600470153764792 - 6.283185307179586i)
```

`polyGamma(-1, z)` is `logGamma(z)`:

```epsil
polyGamma(-1, z)
// ➔ LogGamma(z)
```

<MathJson name="LogGamma">

`["LogGamma", z]`.

```json example
["LogGamma", 5]
// ➔ 3ln(2) + ln(3)

["LogGamma", ["Rational", 1, 2]]
// ➔ 1/2 * ln(pi)

["N", ["LogGamma", ["Complex", -2.5, 1.5]]]
// ➔ -3.7175134511917927 - 7.713065525834192i
```

</MathJson>

### logIntegral

`(complex | infinity) -> number`

Logarithmic integral li(x) = PV ∫₀ˣ dt/ln t = Ei(ln x).

<MathJson name="LogIntegral" latex={["\\operatorname{li}"]} />

### polyLog

`(complex | infinity, complex | infinity) -> number`

Polylogarithm Liₛ(z) = Σ_&#123;k≥1&#125; zᵏ/kˢ, at any real or complex order s.

<MathJson name="PolyLog" latex={["\\operatorname{Li}"]} />

### stieltjesGamma

`(integer, number?) -> number`

Generalized Stieltjes constants γₙ(a), the Laurent coefficients of ζ(s, a) at s = 1: ζ(s, a) = 1/(s−1) + Σₙ (−1)ⁿ γₙ(a)(s−1)ⁿ/n!. StieltjesGamma(n) is γₙ = γₙ(1), and γ₀ is Euler's constant.

```epsil
stieltjesGamma(0)
// ➔ "EulerGamma"
```

```epsil
N(stieltjesGamma(1))
// ➔ -0.0728158454836767248606
```

```epsil
N(stieltjesGamma(2, 1/2))
// ➔ 0.968864475220290711422
```

`stieltjesGamma(n)` is $\gamma_n(1)$, the Stieltjes constant of the Riemann
zeta function. `stieltjesGamma(0, a)` is `-polyGamma(0, a)`.

```epsil
stieltjesGamma(0, a)
// ➔ -PolyGamma(0, a)
```

A non-positive integer `a` is a pole. A real `a > 0` is computed to the
engine precision. A complex `a`, or a negative non-integer `a`, is computed
in double precision. An order above 30 stays unevaluated.

```epsil
[stieltjesGamma(1, 0), stieltjesGamma(31)]
// ➔ [~oo,StieltjesGamma(31)]
N(stieltjesGamma(1, 1 + i))
// ➔ (0.5610186810578666 - 0.13447351896987797i)
```

<MathJson name="StieltjesGamma">

`["StieltjesGamma", n]` and `["StieltjesGamma", n, a]`. In LaTeX:
`\gamma_n(a)`.

```json example
["StieltjesGamma", 0]
// ➔ EulerGamma

["N", ["StieltjesGamma", 1]]
// ➔ -0.0728158454836767248606

["StieltjesGamma", 0, "a"]
// ➔ -PolyGamma(0, a)
```

</MathJson>
