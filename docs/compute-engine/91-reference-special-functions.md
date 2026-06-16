---
title: Special Functions
slug: /compute-engine/reference/special-functions/
---


<FunctionDefinition name="Erf">

<Signature name="Erf">_z:complex_</Signature>

Evaluate to the **error function** of a complex number.

The error function is an odd function ( $$ \operatorname{erf} -z = -
\operatorname{erf} z$$ ) that is used in statistics to calculate probabilities
of normally distributed events.

The formula for the error function of a complex number is:

$$ \operatorname{erf} z = \frac{2}{\sqrt{\pi}} \int_0^z e^{-t^2} dt$$

where $$z$$ is a complex number.

</FunctionDefinition>

<FunctionDefinition name="Erfc">

<Signature name="Erfc">_z:complex_</Signature>

Evaluate to the **complementary error function** of a complex number.

It is defined as $$ \operatorname{erfc} z = 1 - \operatorname {erf} z $$.


</FunctionDefinition>

<FunctionDefinition name="ErfInv">

<Signature name="ErfInv">_x:real_</Signature>

Evaluate to the **inverse error function** of a real number $$ -1 < x < 1 $$

It is defined as $$ \operatorname{erf} \left(\operatorname{erf} ^{-1}x\right)
= x $$.


</FunctionDefinition>

<FunctionDefinition name="Factorial">

<Signature name="Factorial">_n_</Signature>

<Latex value="n!"/>

```json example
["Factorial", 5]
// -> 120
```

</FunctionDefinition>

<FunctionDefinition name="Factorial2">

<Signature name="Factorial2">_n_</Signature>

The double factorial of `n`: $$ n!! = n \cdot (n-2) \cdot (n-4) \times
\cdots$$, that is the product of all the positive integers up to `n` that have
the same parity (odd or even) as `n`.

<Latex value="n!!"/>

```json example
["Factorial2", 5]
// -> 15
```

It can also be written in terms of the $$ \Gamma $$ function:

$$
n!! = 2^{\frac{n}{2}+\frac{1}{4}(1-\cos(\pi n))}\pi^{\frac{1}{4}(\cos(\pi
n)-1)}\Gamma\left(\frac{n}{2}+1\right)
$$

This is not the same as the factorial of the factorial of `n` (i.e.
$$((n!)!)$$).

**Reference**

- WikiPedia: [Double Factorial](https://en.wikipedia.org/wiki/Double_factorial)

</FunctionDefinition>

<FunctionDefinition name="Gamma">

<Signature name="Gamma">_z_</Signature>

<Latex value="\Gamma(n) = (n-1)!"/>

The [Gamma Function](https://en.wikipedia.org/wiki/Gamma_function) is an
extension of the factorial function, with its argument shifted by 1, to real and
complex numbers.

$$
\operatorname{\Gamma}\left(z\right) = \int\limits_{0}^{\infty} t^{z-1}
\mathrm{e}^{-t} \, \mathrm{d}t
$$

- Wikidata: [Q190573](https://www.wikidata.org/wiki/Q190573)
- NIST: http://dlmf.nist.gov/5.2.E1

```json example
["Gamma", 5]
// 24
```

<Signature name="Gamma">_s_, _z_</Signature>

<Latex value="\Gamma(s, z)"/>

With two arguments, `Gamma` is the **upper incomplete Gamma function**. The lower
limit of the integral is the second argument `z` instead of `0`:

$$
\operatorname{\Gamma}\left(s, z\right) = \int\limits_{z}^{\infty} t^{s-1}
\mathrm{e}^{-t} \, \mathrm{d}t
$$

The order `s` and the lower limit `z` may be real or complex, including negative
and fractional orders. The two-argument form is evaluated numerically with
`.N()` and otherwise stays symbolic; $$ \Gamma(s, 0) $$ reduces to $$ \Gamma(s) $$.
(This matches the `Gamma[s, z]` convention of Mathematica.)

- NIST: http://dlmf.nist.gov/8.2.E2

```json example
["N", ["Gamma", 2, 1]]
// 0.7357588823428849
```

</FunctionDefinition>

<FunctionDefinition name="GammaLn">

<Signature name="GammaLn">_z_</Signature>

<Latex value="\ln(\Gamma(z))"/>

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

</FunctionDefinition>


<FunctionDefinition name="Zeta">

<Signature name="Zeta">_s_</Signature>

<Latex value="\zeta(s)"/>

The [Riemann zeta function](https://en.wikipedia.org/wiki/Riemann_zeta_function),
defined for complex numbers with real part greater than 1 as:

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$

and extended to other values by analytic continuation.

```json example
["Zeta", 2]
// ➔ π²/6
```

- Wikidata: [Q187235](https://www.wikidata.org/wiki/Q187235)
- NIST: http://dlmf.nist.gov/25.2

</FunctionDefinition>


<FunctionDefinition name="Beta">

<Signature name="Beta">_a_, _b_</Signature>

<Latex value="\Beta(a, b)"/>

The [Euler beta function](https://en.wikipedia.org/wiki/Beta_function), defined as:

$$
\operatorname{B}(a, b) = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

It can also be expressed as an integral:

$$
\operatorname{B}(a, b) = \int_0^1 t^{a-1}(1-t)^{b-1} \, dt
$$

```json example
["Beta", 2, 3]
// ➔ 1/12
```

- Wikidata: [Q192828](https://www.wikidata.org/wiki/Q192828)
- NIST: http://dlmf.nist.gov/5.12

</FunctionDefinition>


<FunctionDefinition name="LambertW">

<Signature name="LambertW">_x_</Signature>

<Latex value="\operatorname{W}(x)"/>

The [Lambert W function](https://en.wikipedia.org/wiki/Lambert_W_function),
also called the product logarithm. It is the inverse function of
$$ f(w) = w e^w $$.

For a given value $x$, $W(x)$ is the value $w$ such that $w e^w = x$.

The derivative of the Lambert W function is:

$$
\frac{d}{dx} W(x) = \frac{W(x)}{x(1 + W(x))}
$$

```json example
["LambertW", 1]
// ➔ Ω ≈ 0.5671 (the Omega constant)
```

- Wikidata: [Q429963](https://www.wikidata.org/wiki/Q429963)
- NIST: http://dlmf.nist.gov/4.13

</FunctionDefinition>


## Fresnel Integrals

The [Fresnel integrals](https://en.wikipedia.org/wiki/Fresnel_integral) arise in
the description of near-field diffraction and in the geometry of the Cornu
spiral (Euler spiral).


<FunctionDefinition name="FresnelS">

<Signature name="FresnelS">_x_</Signature>

<Latex value="\operatorname{FresnelS}(x)"/>

The Fresnel S integral:

$$
S(x) = \int_0^x \sin\!\left(\frac{\pi t^2}{2}\right) dt
$$

It is an odd function ($S(-x) = -S(x)$) with asymptotic value
$S(\infty) = \tfrac{1}{2}$.

```json example
["FresnelS", 1]
// ➔ 0.4383
```

- Wikipedia: [Fresnel integral](https://en.wikipedia.org/wiki/Fresnel_integral)
- NIST: http://dlmf.nist.gov/7.2

</FunctionDefinition>


<FunctionDefinition name="FresnelC">

<Signature name="FresnelC">_x_</Signature>

<Latex value="\operatorname{FresnelC}(x)"/>

The Fresnel C integral:

$$
C(x) = \int_0^x \cos\!\left(\frac{\pi t^2}{2}\right) dt
$$

It is an odd function ($C(-x) = -C(x)$) with asymptotic value
$C(\infty) = \tfrac{1}{2}$.

```json example
["FresnelC", 1]
// ➔ 0.7799
```

- Wikipedia: [Fresnel integral](https://en.wikipedia.org/wiki/Fresnel_integral)
- NIST: http://dlmf.nist.gov/7.2

</FunctionDefinition>


## Bessel Functions

Bessel functions are solutions to Bessel's differential equation:

$$
x^2 \frac{d^2 y}{dx^2} + x \frac{dy}{dx} + (x^2 - n^2)y = 0
$$

They arise in problems with cylindrical or spherical symmetry.


<FunctionDefinition name="BesselJ">

<Signature name="BesselJ">_n_, _x_</Signature>

<Latex value="J_n(x)"/>

The [Bessel function of the first kind](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_first_kind)
of order $n$.

The derivative with respect to $x$ is:

$$
\frac{d}{dx} J_n(x) = \frac{1}{2}(J_{n-1}(x) - J_{n+1}(x))
$$

```json example
["BesselJ", 0, 1]
// ➔ J₀(1) ≈ 0.7652
```

- NIST: http://dlmf.nist.gov/10.2

</FunctionDefinition>


<FunctionDefinition name="BesselY">

<Signature name="BesselY">_n_, _x_</Signature>

<Latex value="Y_n(x)"/>

The [Bessel function of the second kind](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_second_kind)
of order $n$, also called the Neumann function.

The derivative with respect to $x$ is:

$$
\frac{d}{dx} Y_n(x) = \frac{1}{2}(Y_{n-1}(x) - Y_{n+1}(x))
$$

```json example
["BesselY", 0, 1]
// ➔ Y₀(1) ≈ 0.0883
```

- NIST: http://dlmf.nist.gov/10.2

</FunctionDefinition>


<FunctionDefinition name="BesselI">

<Signature name="BesselI">_n_, _x_</Signature>

<Latex value="I_n(x)"/>

The [modified Bessel function of the first kind](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions)
of order $n$.

The derivative with respect to $x$ is:

$$
\frac{d}{dx} I_n(x) = \frac{1}{2}(I_{n-1}(x) + I_{n+1}(x))
$$

```json example
["BesselI", 0, 1]
// ➔ I₀(1) ≈ 1.2661
```

- NIST: http://dlmf.nist.gov/10.25

</FunctionDefinition>


<FunctionDefinition name="BesselK">

<Signature name="BesselK">_n_, _x_</Signature>

<Latex value="K_n(x)"/>

The [modified Bessel function of the second kind](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions)
of order $n$, also called the MacDonald function.

The derivative with respect to $x$ is:

$$
\frac{d}{dx} K_n(x) = -\frac{1}{2}(K_{n-1}(x) + K_{n+1}(x))
$$

```json example
["BesselK", 0, 1]
// ➔ K₀(1) ≈ 0.4210
```

- NIST: http://dlmf.nist.gov/10.25

</FunctionDefinition>


## Airy Functions

Airy functions are solutions to the Airy differential equation:

$$
\frac{d^2 y}{dx^2} - xy = 0
$$

They arise in physics, particularly in quantum mechanics and optics.


<FunctionDefinition name="AiryAi">

<Signature name="AiryAi">_x_</Signature>

<Latex value="\operatorname{Ai}(x)"/>

The [Airy function of the first kind](https://en.wikipedia.org/wiki/Airy_function).

It is the solution to the Airy equation that decays exponentially for
positive $x$ and oscillates for negative $x$.

```json example
["AiryAi", 0]
// ➔ 1/(3^(2/3) Γ(2/3)) ≈ 0.3550
```

- NIST: http://dlmf.nist.gov/9.2

</FunctionDefinition>


<FunctionDefinition name="AiryBi">

<Signature name="AiryBi">_x_</Signature>

<Latex value="\operatorname{Bi}(x)"/>

The [Airy function of the second kind](https://en.wikipedia.org/wiki/Airy_function).

It is the solution to the Airy equation that grows exponentially for
positive $x$ and oscillates for negative $x$.

```json example
["AiryBi", 0]
// ➔ 1/(3^(1/6) Γ(2/3)) ≈ 0.6149
```

- NIST: http://dlmf.nist.gov/9.2

</FunctionDefinition>


## Elliptic Integrals

The complete elliptic integrals arise in computing the arc length of an
ellipse, the period of a pendulum, and throughout number theory.

**Convention:** these functions use the **parameter** $m = k^2$, where $k$
is the modulus. This matches Mathematica, mpmath and
[Fungrim](https://fungrim.org). To evaluate in terms of the modulus $k$,
pass $k^2$.


<FunctionDefinition name="EllipticK">

<Signature name="EllipticK">_m_</Signature>

<Latex value="K(m)"/>

The [complete elliptic integral of the first kind](https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind):

$$
K(m) = \int_0^{\pi/2} \frac{d\theta}{\sqrt{1 - m \sin^2\theta}}
$$

It is computed via the arithmetic-geometric mean: $K(m) =
\dfrac{\pi}{2\operatorname{agm}(1, \sqrt{1-m})}$.

$K(1) = \infty$. For $m > 1$ the value is complex.

```json example
["EllipticK", 0.5]
// ➔ 1.85407467730137
```

- Wikidata: [Q1080993](https://www.wikidata.org/wiki/Q1080993)
- NIST: http://dlmf.nist.gov/19.2

</FunctionDefinition>


<FunctionDefinition name="EllipticE">

<Signature name="EllipticE">_m_</Signature>

<Latex value="E(m)"/>

The [complete elliptic integral of the second kind](https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind):

$$
E(m) = \int_0^{\pi/2} \sqrt{1 - m \sin^2\theta} \, d\theta
$$

The perimeter of an ellipse with semi-major axis $a$ and eccentricity $e$
is $4aE(e^2)$.

$E(1) = 1$. For $m > 1$ the value is complex.

```json example
["EllipticE", 0.5]
// ➔ 1.35064388104768
```

- Wikidata: [Q1375529](https://www.wikidata.org/wiki/Q1375529)
- NIST: http://dlmf.nist.gov/19.2

</FunctionDefinition>


<FunctionDefinition name="AGM">

<Signature name="AGM">_a_, _b_</Signature>

<Signature name="AGM">_z_</Signature>

<Latex value="\operatorname{agm}(a, b)"/>

The [arithmetic-geometric mean](https://en.wikipedia.org/wiki/Arithmetic%E2%80%93geometric_mean)
of two numbers: the common limit of the sequences $a_{n+1} = \frac{a_n +
b_n}{2}$ and $b_{n+1} = \sqrt{a_n b_n}$.

With a single argument, $\operatorname{agm}(z)$ is shorthand for
$\operatorname{agm}(1, z)$.

```json example
["AGM", 1, 2]
// ➔ 1.45679103104691
```

- Wikidata: [Q360074](https://www.wikidata.org/wiki/Q360074)
- NIST: http://dlmf.nist.gov/19.8

</FunctionDefinition>


## Hypergeometric Functions

<FunctionDefinition name="Hypergeometric2F1">

<Signature name="Hypergeometric2F1">_a_, _b_, _c_, _z_</Signature>

<Latex value="{}_2F_1(a, b; c; z)"/>

The [Gauss hypergeometric function](https://en.wikipedia.org/wiki/Hypergeometric_function),
defined for $|z| < 1$ by the series:

$$
{}_2F_1(a, b; c; z) = \sum_{n=0}^{\infty} \frac{(a)_n (b)_n}{(c)_n}
\frac{z^n}{n!}
$$

where $(q)_n$ is the Pochhammer symbol (rising factorial), and extended
elsewhere by analytic continuation.

Many elementary and special functions are particular cases. For example
$\ln(1+z) = z \cdot {}_2F_1(1, 1; 2; -z)$ and
$K(m) = \frac{\pi}{2} \, {}_2F_1\big(\frac12, \frac12; 1; m\big)$.

If $a$ or $b$ is a non-positive integer the series terminates and the
function is a polynomial in $z$, evaluable for any $z$. Otherwise the
function evaluates numerically for $z \le 1$ (real) and for complex $z$
within the unit disk and the Pfaff-transform region.

```json example
["Hypergeometric2F1", 1, 1, 2, 0.5]
// ➔ 1.38629436111989  (= 2 ln 2)
```

- Wikidata: [Q672619](https://www.wikidata.org/wiki/Q672619)
- NIST: http://dlmf.nist.gov/15.2

</FunctionDefinition>


<FunctionDefinition name="Hypergeometric1F1">

<Signature name="Hypergeometric1F1">_a_, _b_, _z_</Signature>

<Latex value="{}_1F_1(a; b; z)"/>

The [Kummer confluent hypergeometric function](https://en.wikipedia.org/wiki/Confluent_hypergeometric_function),
also written $M(a, b, z)$:

$$
{}_1F_1(a; b; z) = \sum_{n=0}^{\infty} \frac{(a)_n}{(b)_n} \frac{z^n}{n!}
$$

It is an entire function of $z$ and evaluates numerically for any real or
complex $z$.

```json example
["Hypergeometric1F1", 1, 2, 2]
// ➔ 3.19452804946533  (= (e² − 1)/2)
```

- Wikidata: [Q1331447](https://www.wikidata.org/wiki/Q1331447)
- NIST: http://dlmf.nist.gov/13.2

</FunctionDefinition>


## Theta and Modular Functions

<FunctionDefinition name="JacobiTheta">

<Signature name="JacobiTheta">_j_, _z_, _&tau;_</Signature>

<Latex value="\theta_j(z, \tau)"/>

The [Jacobi theta functions](https://en.wikipedia.org/wiki/Theta_function)
$\theta_j(z, \tau)$ for $j \in \{1, 2, 3, 4\}$, with nome $q = e^{i\pi\tau}$
and $\operatorname{Im}(\tau) > 0$:

$$
\theta_3(z, \tau) = 1 + 2\sum_{n=1}^{\infty} q^{n^2} \cos(2n\pi z)
$$

and similarly for $\theta_1$, $\theta_2$, $\theta_4$.

**Convention:** the trigonometric argument is a multiple of $\pi z$ (the
functions have period 1 in $z$), matching [Fungrim](https://fungrim.org)
and mpmath — not the classical convention with period $\pi$.

An optional fourth argument indicates the order of differentiation with
respect to $z$; only order 0 currently evaluates numerically.

```json example
["JacobiTheta", 3, 0, "ImaginaryUnit"]
// ➔ 1.08643481121331  (= π^(1/4)/Γ(3/4))
```

- Wikidata: [Q1154532](https://www.wikidata.org/wiki/Q1154532)
- NIST: http://dlmf.nist.gov/20.2

</FunctionDefinition>


<FunctionDefinition name="DedekindEta">

<Signature name="DedekindEta">_&tau;_</Signature>

<Latex value="\eta(\tau)"/>

The [Dedekind eta function](https://en.wikipedia.org/wiki/Dedekind_eta_function),
defined on the upper half-plane ($\operatorname{Im}(\tau) > 0$) by:

$$
\eta(\tau) = e^{i\pi\tau/12} \prod_{k=1}^{\infty} \left(1 - e^{2\pi i k
\tau}\right)
$$

It is a modular form of weight $\frac12$, central to the theory of modular
functions and integer partitions.

```json example
["DedekindEta", "ImaginaryUnit"]
// ➔ 0.768225422326057  (= Γ(1/4)/(2π^(3/4)))
```

- Wikidata: [Q1187208](https://www.wikidata.org/wiki/Q1187208)
- NIST: http://dlmf.nist.gov/23.15

</FunctionDefinition>


