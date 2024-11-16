---
title: Special Functions
slug: /compute-engine/reference/special-functions/
---

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

<Latex value="\\ln(\\gamma(z))"/>

This function is called `gammaln` in MatLab and SciPy and `LogGamma` in
Mathematica.

</FunctionDefinition>


<ReadMore path="/compute-engine/reference/statistics/" > See also Statistics for
the <strong>Error Functions</strong> </ReadMore>
