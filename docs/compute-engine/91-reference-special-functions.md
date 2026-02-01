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

<Latex value="\\Gamma(n) = (n-1)!"/>

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

</FunctionDefinition>

<FunctionDefinition name="GammaLn">

<Signature name="GammaLn">_z_</Signature>

<Latex value="\\ln(\\Gamma(z))"/>

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

</FunctionDefinition>


<FunctionDefinition name="Zeta">

<Signature name="Zeta">_s_</Signature>

<Latex value="\\zeta(s)"/>

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

<Latex value="\\Beta(a, b)"/>

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

<Latex value="\\operatorname{W}(x)"/>

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

<Latex value="\\operatorname{Ai}(x)"/>

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

<Latex value="\\operatorname{Bi}(x)"/>

The [Airy function of the second kind](https://en.wikipedia.org/wiki/Airy_function).

It is the solution to the Airy equation that grows exponentially for
positive $x$ and oscillates for negative $x$.

```json example
["AiryBi", 0]
// ➔ 1/(3^(1/6) Γ(2/3)) ≈ 0.6149
```

- NIST: http://dlmf.nist.gov/9.2

</FunctionDefinition>


