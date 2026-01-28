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


