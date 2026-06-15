---
title: Fungrim Identities
slug: /compute-engine/reference/fungrim-identities/
---

# Fungrim Identities

The Compute Engine ships a library of **special-function identities** derived from the [Fungrim](https://fungrim.org/) "Mathematical Functions Grimoire". These identities drive symbolic simplification, expansion, and equation solving for functions such as the elliptic integrals, Jacobi theta functions, Bessel functions, the Riemann zeta function, and many more.

This page catalogues the **1380 identities** behind the engine's **1385 Fungrim rules** (a few identities back both a simplification and a solving rule), grouped by topic. Each entry shows the identity, the conditions under which it holds, the symbols it involves, how the engine uses it, and a link to the authoritative upstream Fungrim entry (whose page carries the full prose description, proof sketch, and references).

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Airy functions](#airy-functions) (9)
- [Arithmetic-geometric mean](#arithmetic-geometric-mean) (28)
- [Barnes G-function](#barnes-g-function) (27)
- [Bell numbers](#bell-numbers) (1)
- [Bernoulli numbers and polynomials](#bernoulli-numbers-and-polynomials) (9)
- [Bessel functions](#bessel-functions) (57)
- [Beta function](#beta-function) (11)
- [Carlson symmetric elliptic integrals](#carlson-symmetric-elliptic-integrals) (183)
- [Chebyshev polynomials](#chebyshev-polynomials) (51)
- [Complex parts](#complex-parts) (21)
- [Complex plane](#complex-plane) (3)
- [Confluent hypergeometric functions](#confluent-hypergeometric-functions) (11)
- [Coulomb wave functions](#coulomb-wave-functions) (10)
- [Dedekind eta function](#dedekind-eta-function) (23)
- [Digamma function](#digamma-function) (39)
- [Dirichlet characters](#dirichlet-characters) (15)
- [Error functions](#error-functions) (12)
- [Exponential function](#exponential-function) (16)
- [Factorials and binomial coefficients](#factorials-and-binomial-coefficients) (22)
- [Fibonacci numbers](#fibonacci-numbers) (34)
- [Gamma function](#gamma-function) (24)
- [Gauss hypergeometric function](#gauss-hypergeometric-function) (16)
- [Gaussian quadrature](#gaussian-quadrature) (1)
- [Golden ratio](#golden-ratio) (5)
- [Greatest common divisor](#greatest-common-divisor) (56)
- [Hurwitz zeta function](#hurwitz-zeta-function) (40)
- [Illustrations of Eisenstein series](#illustrations-of-eisenstein-series) (41)
- [Imaginary unit](#imaginary-unit) (16)
- [Integer sequences](#integer-sequences) (8)
- [Inverse tangent](#inverse-tangent) (44)
- [Jacobi theta functions](#jacobi-theta-functions) (204)
- [Lambert W-function](#lambert-w-function) (8)
- [Legendre elliptic integrals](#legendre-elliptic-integrals) (80)
- [Legendre polynomials](#legendre-polynomials) (22)
- [Modular j-invariant](#modular-j-invariant) (19)
- [Modular lambda function](#modular-lambda-function) (24)
- [Multiple zeta values](#multiple-zeta-values) (7)
- [Natural logarithm](#natural-logarithm) (11)
- [Partition function](#partition-function) (6)
- [Pi](#pi) (4)
- [Powers](#powers) (8)
- [Prime numbers](#prime-numbers) (1)
- [Riemann zeta function](#riemann-zeta-function) (17)
- [Sinc function](#sinc-function) (24)
- [Sine](#sine) (59)
- [Square roots](#square-roots) (26)
- [Stirling numbers](#stirling-numbers) (4)
- [Totient function](#totient-function) (10)
- [Weierstrass elliptic functions](#weierstrass-elliptic-functions) (13)

## Airy functions

$$\operatorname{Ai}(z)=z\mathrm{Hypergeometric0F_1}(\frac{4}{3}, \frac{z^3}{9})z\mapsto\operatorname{Ai}(z)^{\prime}(0)+\operatorname{Ai}(0)\mathrm{Hypergeometric0F_1}(\frac{2}{3}, \frac{z^3}{9})$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`01bbb6` · Fungrim entry ↗](https://fungrim.org/entry/01bbb6)

---

$$z\mapsto\operatorname{Ai}(z)^{\prime}(z)=\frac{1}{2}(\operatorname{Ai}(0)\mathrm{Hypergeometric0F_1}(\frac{5}{3}, \frac{z^3}{9})z^2)+\mathrm{Hypergeometric0F_1}(\frac{1}{3}, \frac{z^3}{9})z\mapsto\operatorname{Ai}(z)^{\prime}(0)$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`20e530` · Fungrim entry ↗](https://fungrim.org/entry/20e530)

---

$$z\mapsto\operatorname{Bi}(z)^{\prime}(z)=\frac{1}{2}(\operatorname{Bi}(0)\mathrm{Hypergeometric0F_1}(\frac{5}{3}, \frac{z^3}{9})z^2)+\mathrm{Hypergeometric0F_1}(\frac{1}{3}, \frac{z^3}{9})z\mapsto\operatorname{Bi}(z)^{\prime}(0)$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`4d65e5` · Fungrim entry ↗](https://fungrim.org/entry/4d65e5)

---

$$z\mapsto C\operatorname{Ai}(z)+\mathrm{D_{var}}\operatorname{Bi}(z)^{\doubleprime}(z)-z(C\operatorname{Ai}(z)+\mathrm{D_{var}}\operatorname{Bi}(z))=0$$

**Holds when** $z\in\C\land C\in\C\land\mathrm{D_{var}}\in\C$.
Used by the Compute Engine for simplification.
[`51b241` · Fungrim entry ↗](https://fungrim.org/entry/51b241)

---

$$z\mapsto\operatorname{Bi}(z)^{\doubleprime}(z)=z\operatorname{Bi}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`70ec9f` · Fungrim entry ↗](https://fungrim.org/entry/70ec9f)

---

$$z\mapsto\operatorname{Ai}(z)^{\doubleprime}(z)=z\operatorname{Ai}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b2e9d0` · Fungrim entry ↗](https://fungrim.org/entry/b2e9d0)

---

$$\operatorname{Bi}(z)=z\mathrm{Hypergeometric0F_1}(\frac{4}{3}, \frac{z^3}{9})z\mapsto\operatorname{Bi}(z)^{\prime}(0)+\operatorname{Bi}(0)\mathrm{Hypergeometric0F_1}(\frac{2}{3}, \frac{z^3}{9})$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`bd319e` · Fungrim entry ↗](https://fungrim.org/entry/bd319e)

---

$$\operatorname{Ai}(z)z\mapsto\operatorname{Bi}(z)^{\prime}(z)-\operatorname{Bi}(z)z\mapsto\operatorname{Ai}(z)^{\prime}(z)=\frac{1}{\pi}$$

Used by the Compute Engine for simplification.
[`de9800` · Fungrim entry ↗](https://fungrim.org/entry/de9800)

---

$$z\mapsto C\operatorname{Ai}(z)+\mathrm{D_{var}}\operatorname{Bi}(z)^{\prime}(z)=(n-2)z\mapsto C\operatorname{Ai}(z)+\mathrm{D_{var}}\operatorname{Bi}(z)^{\prime}(z)+zz\mapsto C\operatorname{Ai}(z)+\mathrm{D_{var}}\operatorname{Bi}(z)^{\prime}(z)$$

**Holds when** $z\in\C\land C\in\C\land\mathrm{D_{var}}\in\C\land n\in3..\infty$.
Used by the Compute Engine for simplification.
[`eadca2` · Fungrim entry ↗](https://fungrim.org/entry/eadca2)

---

## Arithmetic-geometric mean

$$\mathrm{AGM}(0, b)=0$$

**Holds when** $b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`08329d` · Fungrim entry ↗](https://fungrim.org/entry/08329d)

---

$$\mathrm{AGM}(1, \sqrt{2})=\frac{2\sqrt{2}\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`0d9352` · Fungrim entry ↗](https://fungrim.org/entry/0d9352)

---

$$a\mapsto\mathrm{AGM}(a, b)^{\prime}(a)=\frac{(\pi a-2\mathrm{AGM}(a, b)\mathrm{EllipticE}((a-b)/(a+b)^2))\mathrm{AGM}(a, b)}{\pi a(a-b)}$$

**Holds when** $b\ne0\land a\ne b\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/09.54.20.0001.01)
[`20828c` · Fungrim entry ↗](https://fungrim.org/entry/20828c)

---

$$\mathrm{AGM}(z)=\mathrm{AGM}(1, z)=\mathrm{AGM}(z, 1)$$

**Holds when** $z\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for expansion.
[`21f412` · Fungrim entry ↗](https://fungrim.org/entry/21f412)

---

$$\ln(\frac{1}{q})=(\pi)(\mathrm{AGM}(\mathrm{JacobiThetaQ}(2, 0, q)^2, \mathrm{JacobiThetaQ}(3, 0, q)^2))^{-1}$$

**Holds when** $q\in\lparen0, 1\rparen$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`26fd1b` · Fungrim entry ↗](https://fungrim.org/entry/26fd1b)

---

$$\mathrm{AGM}(1, 3+2\sqrt{2})=\frac{2(2+\sqrt{2})\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`361801` · Fungrim entry ↗](https://fungrim.org/entry/361801)

---

$$\mathrm{AGM}(a, -a)=0$$

**Holds when** $a\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`3e1398` · Fungrim entry ↗](https://fungrim.org/entry/3e1398)

---

$$x\mapsto\mathrm{AGM}(1, x)^{\prime}(1)=\frac{n!\mathrm{SloaneA}(60\,691, n)\times(-1)^{n}}{8^{n}}$$

**Holds when** $n\in\N$.
**Symbols:** **AGM** — Arithmetic-geometric mean; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for expansion.
[`447541` · Fungrim entry ↗](https://fungrim.org/entry/447541)

---

$$\mathrm{AGM}(1, b)=\frac{1}{2}((b+1)\mathrm{AGM}(1, \frac{2b^{1/2}}{b+1}))$$

**Holds when** $b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`46c021` · Fungrim entry ↗](https://fungrim.org/entry/46c021)

---

$$\mathrm{AGM}(1, -\imaginaryI)=\frac{\sqrt{2}(1-\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`5174ea` · Fungrim entry ↗](https://fungrim.org/entry/5174ea)

---

$$\mathrm{AGM}(a, b)=\mathrm{AGM}(b, a)$$

**Holds when** $a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for expansion.
[`59fab1` · Fungrim entry ↗](https://fungrim.org/entry/59fab1)

---

$$\mathrm{AGM}(1, \imaginaryI)=\frac{\sqrt{2}(1+\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`69d0a3` · Fungrim entry ↗](https://fungrim.org/entry/69d0a3)

---

$$\mathrm{AGM}(a, b)=\frac{\pi(a+b)}{4\mathrm{EllipticK}((a-b)/(a+b)^2)}$$

**Holds when** $b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`71a0ff` · Fungrim entry ↗](https://fungrim.org/entry/71a0ff)

---

$$\mathrm{AGM}(1, \sqrt{2})=(\mathrm{JacobiTheta}(4, 0, \imaginaryI)^2)^{-1}$$

**Symbols:** **AGM** — Arithmetic-geometric mean; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`7b362f` · Fungrim entry ↗](https://fungrim.org/entry/7b362f)

---

$$\mathrm{AGMSequence}(0, a, b)=(a,b)$$

**Holds when** $a\in\C\land b\in\C$.
**Symbols:** **AGMSequence** — Convergents in AGM iteration.
Used by the Compute Engine for expansion.
[`84b888` · Fungrim entry ↗](https://fungrim.org/entry/84b888)

---

$$\mathrm{AGM}(1, b)=b\mathrm{AGM}(1, \frac{1}{b})$$

**Holds when** $b\notin\lparen-\infty, 0\rbrack\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`8e80c6` · Fungrim entry ↗](https://fungrim.org/entry/8e80c6)

---

$$\mathrm{AGM}(a, 0)=0$$

**Holds when** $a\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`8f176c` · Fungrim entry ↗](https://fungrim.org/entry/8f176c)

---

$$\mathrm{AGM}(b+1, 1-b)=\mathrm{AGM}(1, \sqrt{1-b^2})$$

**Holds when** $b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for expansion.
[`9d84d8` · Fungrim entry ↗](https://fungrim.org/entry/9d84d8)

---

$$(a(a^2-b^2)a\mapsto\mathrm{AGM}(a, b)^{\doubleprime}(a)+(3a^2-b^2)a\mapsto\mathrm{AGM}(a, b)^{\prime}(a))\mathrm{AGM}(a, b)+2a(b^2-a^2)a\mapsto\mathrm{AGM}(a, b)^{\prime}(a)^2-a\mathrm{AGM}(a, b)^2=0$$

**Holds when** $b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/09.54.13.0001.01)
[`a4cc5a` · Fungrim entry ↗](https://fungrim.org/entry/a4cc5a)

---

$$\mathrm{AGM}(a, a)=a$$

**Holds when** $a\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`b41bdd` · Fungrim entry ↗](https://fungrim.org/entry/b41bdd)

---

$$\mathrm{AGM}(a, b)=a\mathrm{AGM}(1, \frac{b}{a})$$

**Holds when** $a\ne0\land\frac{b}{a}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`ce2395` · Fungrim entry ↗](https://fungrim.org/entry/ce2395)

---

$$\mathrm{AGM}(a, b)=\frac{a+b}{2\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{1}{2}, 1, (a-b)/(a+b)^2)}$$

**Holds when** $b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`d6d836` · Fungrim entry ↗](https://fungrim.org/entry/d6d836)

---

$$\mathrm{EllipticK}(m)=(\pi)(2\mathrm{AGM}(1, \sqrt{1-m}))^{-1}$$

**Holds when** $m\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e15f43` · Fungrim entry ↗](https://fungrim.org/entry/e15f43)

---

$$\mathrm{AGM}(1, \frac{\sqrt{2}}{2})=\frac{2\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`e3896e` · Fungrim entry ↗](https://fungrim.org/entry/e3896e)

---

$$\mathrm{AGM}(a, b)=b\mathrm{AGM}(1, \frac{a}{b})$$

**Holds when** $b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack\land a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`ea1d58` · Fungrim entry ↗](https://fungrim.org/entry/ea1d58)

---

$$\mathrm{AGM}(1, 1)=1$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`eb0661` · Fungrim entry ↗](https://fungrim.org/entry/eb0661)

---

$$\mathrm{AGM}(1, 3-2\sqrt{2})=\frac{2(2-\sqrt{2})\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`f9190b` · Fungrim entry ↗](https://fungrim.org/entry/f9190b)

---

$$\mathrm{AGM}(a, b)=\mathrm{AGM}(\frac{a+b}{2}, \begin{cases}1&0\le\Re((a+b)/(2(ab)^{1/2}))\lor(ab)^{1/2}=0\\-1&\top\end{cases}\sqrt{ab})$$

**Holds when** $a\in\C\land b\in\C$.
**Symbols:** **AGM** — Arithmetic-geometric mean.
Used by the Compute Engine for simplification.
[`fa6ff7` · Fungrim entry ↗](https://fungrim.org/entry/fa6ff7)

---

## Barnes G-function

$$\mathrm{LogBarnesG}(z+1)=\frac{1}{2}(-(1+\gamma)z^2)+\frac{1}{2}(z(\ln(2\pi)-1))+\sum_{n=3}^{\infty}\frac{1}{n}(\Zeta(n-1)\times(-1)^{n+1}z^{n})$$

**Holds when** $\vert z\vert\lt1\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`0ad263` · Fungrim entry ↗](https://fungrim.org/entry/0ad263)

---

$$\mathrm{BarnesG}(z^\star)=\mathrm{BarnesG}(z)^\star$$

**Holds when** $z\in\C$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for expansion.
[`147db6` · Fungrim entry ↗](https://fungrim.org/entry/147db6)

---

$$\mathrm{LogBarnesG}(1-z)=-(z\ln(2\pi))+\mathrm{LogBarnesG}(z+1)+\begin{cases}\int_{0}^{\imaginaryI}\!\pi x\cot(\pi x)\, \mathrm{d}x+\int_{\imaginaryI}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x&\Re(z)\lt1\land\Im(z)=0\lor0\lt\Im(z)\lor-1\lt\Re(z)\lt1\\\int_{0}^{-\imaginaryI}\!\pi x\cot(\pi x)\, \mathrm{d}x+\int_{-\imaginaryI}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x&-1\lt\Re(z)\land\Im(z)=0\lor\Im(z)\lt0\lor-1\lt\Re(z)\lt1\end{cases}$$

**Holds when** $z\notin\Z\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`23ed69` · Fungrim entry ↗](https://fungrim.org/entry/23ed69)

---

$$\mathrm{BarnesG}(n)=\begin{cases}\prod_{k=1}^{n-2}k!&1\le n\\0&n\le0\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`33f13a` · Fungrim entry ↗](https://fungrim.org/entry/33f13a)

---

$$\mathrm{LogBarnesG}(z+1)=\mathrm{GammaLn}(z)+\mathrm{LogBarnesG}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`5261e3` · Fungrim entry ↗](https://fungrim.org/entry/5261e3)

---

$$\mathrm{BarnesG}(1-x)=\mathrm{BarnesG}(x+1)\times(-1)^{\lfloor\frac{x-1}{2}\rfloor+1}\exp(\frac{\Im(\mathrm{PolyLog}(2, \exp(2\imaginaryI\pi x)))}{2\pi})\frac{\vert\sin(\pi x)\vert}{\pi}^{x}$$

**Holds when** $x\notin-\infty..-1\land x\in\R$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1145/384101.384104)
[`541e2e` · Fungrim entry ↗](https://fungrim.org/entry/541e2e)

---

$$\mathrm{LogBarnesG}(x)=\begin{cases}\ln(\mathrm{BarnesG}(x))&0\lt x\\\ln(\vert\mathrm{BarnesG}(x)\vert)+\frac{1}{2}(\imaginaryI\pi(\lfloor x\rfloor-1)\lfloor x\rfloor)&\top\end{cases}$$

**Holds when** $x\notin\Z_{\le0}\land x\in\R$.
**Symbols:** **BarnesG** — Barnes G-function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`5a11eb` · Fungrim entry ↗](https://fungrim.org/entry/5a11eb)

---

$$z\mapsto\mathrm{BarnesG}(z)^{\prime}(z)=(-z+(z-1)\mathrm{Digamma}(z)+\frac{1}{2}(1+\ln(2\pi)))\mathrm{BarnesG}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`5babc2` · Fungrim entry ↗](https://fungrim.org/entry/5babc2)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{z^2}{4}+z\mathrm{GammaLn}(z)-\ln(\mathrm{ConstGlaisher})-\int_{0}^{\infty}\!\frac{(\frac{-x}{12}-\frac{1}{x}+\frac{1}{1-\exp(-x)}-\frac{1}{2})\exp(-(xz))}{x^2}\, \mathrm{d}x-\frac{1}{2}(\ln(z)\mathrm{BernoulliPolynomial}(2, z))$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`6395ee` · Fungrim entry ↗](https://fungrim.org/entry/6395ee)

---

$$\mathrm{LogBarnesG}(z^\star)=\begin{cases}\mathrm{LogBarnesG}(z)&z\in\lparen-\infty, 0\rbrack\\\mathrm{LogBarnesG}(z)^\star&\top\end{cases}$$

**Holds when** $z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`6c6d3e` · Fungrim entry ↗](https://fungrim.org/entry/6c6d3e)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{z^2}{4}-(\frac{z(z+1)}{2}+\frac{1}{12})\ln(z)+z\mathrm{GammaLn}(z+1)-\ln(\mathrm{ConstGlaisher})+\sum_{n=1}^{\mathrm{N_{var}}-1}\frac{\mathrm{BernoulliB}(2n+2)}{4n(n+1)(2n+1)z^{2n}}+\mathrm{LogBarnesGRemainder}(\mathrm{N_{var}}, z)$$

**Holds when** $z\notin\lparen-\infty, 0\rbrack\land z\in\C\land\mathrm{N_{var}}\in\N^*$.
**Symbols:** **BernoulliB** — Bernoulli number; **LogBarnesG** — Logarithmic Barnes G-function; **LogBarnesGRemainder** — Remainder term in asymptotic expansion of logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [dx.doi.org](https://dx.doi.org/10.1098/rspa.2014.0534)
[`6f8e14` · Fungrim entry ↗](https://fungrim.org/entry/6f8e14)

---

$$\mathrm{LogBarnesG}(1-z)=\mathrm{LogBarnesG}(z+1)+\begin{cases}\frac{1}{2}(\imaginaryI\pi(z^2-z+\frac{1}{6}))-z(\mathrm{GammaLn}(z)+\mathrm{GammaLn}(1-z))-\frac{\imaginaryI\mathrm{PolyLog}(2, \exp(2\imaginaryI\pi z))}{2\pi}&\Re(z)\lt1\land\Im(z)=0\lor0\lt\Im(z)\lor0\lt\Re(z)\lt1\\-(\frac{1}{2}(\imaginaryI\pi((-z)^2+z+1/6))+z(\mathrm{GammaLn}(-z)+\mathrm{GammaLn}(z+1))-\frac{\imaginaryI\mathrm{PolyLog}(2, \exp(-2\imaginaryI\pi z))}{2\pi})&-1\lt\Re(z)\land\Im(z)=0\lor\Im(z)\lt0\lor-1\lt\Re(z)\lt0\end{cases}$$

**Holds when** $z\notin\Z\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`82b410` · Fungrim entry ↗](https://fungrim.org/entry/82b410)

---

$$\mathrm{BarnesG}(z+1)=\Gamma(z)\mathrm{BarnesG}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`86b3ec` · Fungrim entry ↗](https://fungrim.org/entry/86b3ec)

---

$$\mathrm{BarnesG}(\frac{1}{2})=\frac{\sqrt[24]{2}\sqrt[8]{\exponentialE}}{\sqrt[4]{\pi}\sqrt{\mathrm{ConstGlaisher}}^{3}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`8b7991` · Fungrim entry ↗](https://fungrim.org/entry/8b7991)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{z(1-z)}{2}+\frac{1}{2}(z\ln(2\pi))+z\mathrm{GammaLn}(z)-\int_{0}^{z}\!\mathrm{GammaLn}(x)\, \mathrm{d}x$$

**Holds when** $z\notin\lparen-\infty, -1\rbrack\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`8c96a5` · Fungrim entry ↗](https://fungrim.org/entry/8c96a5)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{z(1-z)}{2}+\frac{1}{2}(z\ln(2\pi))+\int_{0}^{z}\!x\mathrm{Digamma}(x)\, \mathrm{d}x$$

**Holds when** $z\notin\lparen-\infty, -1\rbrack\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`95f771` · Fungrim entry ↗](https://fungrim.org/entry/95f771)

---

$$\Im(\mathrm{LogBarnesG}(x))=\frac{1}{2}(\pi(\lfloor x\rfloor-1)\lfloor x\rfloor)$$

**Holds when** $x\lt0\land x\notin\Z\land x\in\R$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`a044e1` · Fungrim entry ↗](https://fungrim.org/entry/a044e1)

---

$$z\mapsto\mathrm{LogBarnesG}(z)^{\prime}(z)=-z+(z-1)\mathrm{Digamma}(z)+\frac{1}{2}(1+\ln(2\pi))$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`af31ae` · Fungrim entry ↗](https://fungrim.org/entry/af31ae)

---

$$\mathrm{BarnesG}(z)=\exp(\mathrm{LogBarnesG}(z))$$

**Holds when** $z\in\C$.
**Symbols:** **BarnesG** — Barnes G-function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for expansion.
[`b4355e` · Fungrim entry ↗](https://fungrim.org/entry/b4355e)

---

$$\mathrm{LogBarnesG}(1-z)=-(z\ln(2\pi))+\mathrm{LogBarnesG}(z+1)+\int_{0}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x$$

**Holds when** $z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`b6017f` · Fungrim entry ↗](https://fungrim.org/entry/b6017f)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{1}{4}((2\ln(z)-3)z^2)+\frac{1}{2}(z\ln(2\pi))-\ln(\mathrm{ConstGlaisher})-\int_{0}^{\infty}\!\frac{x\ln(x^2+z^2)}{\exp(2\pi x)-1}\, \mathrm{d}x+\frac{1}{12}$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`b64782` · Fungrim entry ↗](https://fungrim.org/entry/b64782)

---

$$\mathrm{BarnesG}(\frac{1}{4})=\frac{\exp(\frac{3}{32}-\frac{G}{4\pi})}{\mathrm{ConstGlaisher}^{\frac{9}{8}}\Gamma(1/4)^{\frac{3}{4}}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`ce66a9` · Fungrim entry ↗](https://fungrim.org/entry/ce66a9)

---

$$\mathrm{LogBarnesG}(1-x)=x\ln(\frac{\vert\sin(\pi x)\vert}{\pi})+\frac{\Im(\mathrm{PolyLog}(2, \exp(2\imaginaryI\pi x)))}{2\pi}+\mathrm{LogBarnesG}(x+1)+\frac{1}{2}(\imaginaryI\pi(\lfloor x\rfloor+1)\mathrm{sgn}(x)\lfloor x\rfloor)$$

**Holds when** $x\notin\Z\land x\in\R$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`d1a0ec` · Fungrim entry ↗](https://fungrim.org/entry/d1a0ec)

---

$$\mathrm{LogBarnesG}(n)=\begin{cases}\ln(\mathrm{BarnesG}(n))&1\le n\\-\infty&n\le0\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`daef08` · Fungrim entry ↗](https://fungrim.org/entry/daef08)

---

$$\mathrm{BarnesG}(\frac{3}{4})=\frac{\exp(\frac{3}{32}+\frac{G}{4\pi})\sqrt[4]{\Gamma(1/4)}}{\sqrt[8]{2}\sqrt[4]{\pi}\mathrm{ConstGlaisher}^{\frac{9}{8}}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`dc507f` · Fungrim entry ↗](https://fungrim.org/entry/dc507f)

---

$$\mathrm{LogBarnesG}(z)=(z-1)\mathrm{GammaLn}(z)+s\mapsto\Zeta(s)^{\prime}(-1)-\mathrm{HurwitzZeta}(-1, z, 1)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`e05807` · Fungrim entry ↗](https://fungrim.org/entry/e05807)

---

$$z\mapsto\mathrm{BarnesG}(z)^{\prime}(n)=\begin{cases}0&n\lt0\\1&n=0\\\frac{1}{2}(\ln(2\pi)-1)&n=1\\((\mathrm{HarmonicNumber}(n-2)-1-\gamma)(n-1)+\frac{1}{2}+\frac{\ln(2\pi)}{2})\mathrm{BarnesG}(n)&2\le n\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`f50c74` · Fungrim entry ↗](https://fungrim.org/entry/f50c74)

---

## Bell numbers

$$\mathrm{BellNumber}(n)=\frac{2\Im(\int_{0}^{\pi}\!\sin(nx)\exp(\exp(\exp(\imaginaryI x)))\, \mathrm{d}x)n!}{\exponentialE\pi}$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/0708.3301)
[`f4e249` · Fungrim entry ↗](https://fungrim.org/entry/f4e249)

---

## Bernoulli numbers and polynomials

$$\mathrm{BernoulliPolynomial}(n, \frac{1}{2})=(2^{1-n}-1)\mathrm{BernoulliB}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`03ee0b` · Fungrim entry ↗](https://fungrim.org/entry/03ee0b)

---

$$\mathrm{BernoulliB}(2n)=\frac{2\Zeta(2n)(2n)!\times(-1)^{n+1}}{(2\pi)^{2n}}$$

**Holds when** $n\in\N^*$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`14ecc4` · Fungrim entry ↗](https://fungrim.org/entry/14ecc4)

---

$$\mathrm{BernoulliPolynomial}(n, 1)=\mathrm{BernoulliB}(n)\times(-1)^{n}$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`829185` · Fungrim entry ↗](https://fungrim.org/entry/829185)

---

$$\mathrm{BernoulliPolynomial}(n, x+1)=nx^{n-1}+\mathrm{BernoulliPolynomial}(n, x)$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`8b4f7f` · Fungrim entry ↗](https://fungrim.org/entry/8b4f7f)

---

$$\mathrm{BernoulliPolynomial}(n, 0)=\mathrm{BernoulliB}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for expansion.
[`a1d2d7` · Fungrim entry ↗](https://fungrim.org/entry/a1d2d7)

---

$$\mathrm{BernoulliB}(2n+3)=0$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`a98234` · Fungrim entry ↗](https://fungrim.org/entry/a98234)

---

$$\mathrm{BernoulliPolynomial}(n, 1-x)=\mathrm{BernoulliPolynomial}(n, x)\times(-1)^{n}$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for expansion.
[`c2dcfa` · Fungrim entry ↗](https://fungrim.org/entry/c2dcfa)

---

$$x\mapsto\mathrm{BernoulliPolynomial}(n, x)^{\prime}(x)=n\mathrm{BernoulliPolynomial}(n-1, x)$$

**Holds when** $n\in\N^*\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`e89eb5` · Fungrim entry ↗](https://fungrim.org/entry/e89eb5)

---

$$\mathrm{BernoulliPolynomial}(n, -x)=(nx^{n-1}+\mathrm{BernoulliPolynomial}(n, x))\times(-1)^{n}$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`f80439` · Fungrim entry ↗](https://fungrim.org/entry/f80439)

---

## Bessel functions

$$\operatorname{K}_{\frac{3}{2}}(z)=(\frac{1}{z}+\frac{1}{z^2})\exp(-z)\sqrt{\frac{\pi z}{2}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`0c09cc` · Fungrim entry ↗](https://fungrim.org/entry/0c09cc)

---

$$\operatorname{J}_{\frac{1}{2}}(z)=\frac{\sqrt{2}\sin(z)}{\sqrt{\pi}\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`121b21` · Fungrim entry ↗](https://fungrim.org/entry/121b21)

---

$$\operatorname{J}_{\nu}(z)=\frac{\sqrt{2}(\mathrm{HypergeometricUStar}(\nu+\frac{1}{2}, 2\nu+1, 2\imaginaryI z)\exp(\imaginaryI((\pi(2\nu+1))/4-z))+\mathrm{HypergeometricUStar}(\nu+\frac{1}{2}, 2\nu+1, -(2\imaginaryI z))\exp(-(\imaginaryI((\pi(2\nu+1))/4-z))))}{2\sqrt{\pi}\sqrt{z}}$$

**Holds when** $0\lt\Re(z)\land\nu\in\C\land z\in\C$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`127f05` · Fungrim entry ↗](https://fungrim.org/entry/127f05)

---

$$(-n^2+r^2+4r+4)z\mapsto\operatorname{J}_{n}(z)^{\prime}(0)+(r+1)(r+2)z\mapsto\operatorname{J}_{n}(z)^{\prime}(0)=0$$

**Holds when** $n\in\Z\land r\in\N$.
Used by the Compute Engine for simplification.
[`15ac84` · Fungrim entry ↗](https://fungrim.org/entry/15ac84)

---

$$\operatorname{I}_{n}(z)=\frac{\operatorname{J}_{n}(\imaginaryI z)}{\imaginaryI^{n}}$$

**Holds when** $n\in\Z\land z\in\C$.
Used by the Compute Engine for simplification.
[`15bbb1` · Fungrim entry ↗](https://fungrim.org/entry/15bbb1)

---

$$\mathrm{HankelH_2}(\nu, z)=\operatorname{J}_{\nu}(z)-\imaginaryI\operatorname{Y}_{\nu}(z)$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **HankelH2** — Hankel function of the second kind.
Used by the Compute Engine for simplification.
[`1dce21` · Fungrim entry ↗](https://fungrim.org/entry/1dce21)

---

$$\operatorname{Y}_{\nu}(z)=\frac{\cos(\pi\nu)\operatorname{J}_{\nu}(z)-\operatorname{J}_{-\nu}(z)}{\sin(\pi\nu)}$$

**Holds when** $\nu\in\C\setminus\Z\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`2a4195` · Fungrim entry ↗](https://fungrim.org/entry/2a4195)

---

$$\operatorname{J}_{\nu}(z)=\frac{\sqrt{2}(\mathrm{HypergeometricUStar}(\nu+\frac{1}{2}, 2\nu+1, 2\imaginaryI z)\exp(-(\imaginaryI z))(-(\imaginaryI z))^{-1/2-\nu}+\mathrm{HypergeometricUStar}(\nu+\frac{1}{2}, 2\nu+1, -(2\imaginaryI z))\exp(\imaginaryI z)(\imaginaryI z)^{-1/2-\nu})z^{\nu}}{2\sqrt{\pi}}$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`32e162` · Fungrim entry ↗](https://fungrim.org/entry/32e162)

---

$$z\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)=\frac{1}{2}(\operatorname{Y}_{\nu-1}(z)-\operatorname{Y}_{\nu+1}(z))$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`40aeb6` · Fungrim entry ↗](https://fungrim.org/entry/40aeb6)

---

$$\operatorname{K}_{\frac{1}{3}}(z)=\frac{\sqrt{3}\pi\operatorname{Ai}(((3z)/2)^{1/3}^2)}{\sqrt[3]{\frac{3}{2}}\sqrt[3]{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`49d754` · Fungrim entry ↗](https://fungrim.org/entry/49d754)

---

$$\operatorname{Y}_{\frac{1}{2}}(z)=-(\frac{\sqrt{2}\cos(z)}{\sqrt{\pi}\sqrt{z}})$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`4dfd41` · Fungrim entry ↗](https://fungrim.org/entry/4dfd41)

---

$$\operatorname{I}_{\nu}(z)=\frac{z(\operatorname{I}_{\nu-1}(z)-\operatorname{I}_{\nu+1}(z))}{2\nu}$$

**Holds when** $z\in\C\land\nu\in\Z\setminus\lbrace0\rbrace$ &nbsp;_or_&nbsp; $\nu\in\C\setminus\lbrace0\rbrace\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`4fb391` · Fungrim entry ↗](https://fungrim.org/entry/4fb391)

---

$$\operatorname{J}_{-n}(z)=\operatorname{J}_{n}(z)\times(-1)^{n}$$

**Holds when** $n\in\Z\land z\in\C$.
Used by the Compute Engine for simplification.
[`54bce2` · Fungrim entry ↗](https://fungrim.org/entry/54bce2)

---

$$\operatorname{Y}_{\frac{-1}{2}}(z)=\frac{\sqrt{2}\sin(z)}{\sqrt{\pi}\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`5679f2` · Fungrim entry ↗](https://fungrim.org/entry/5679f2)

---

$$z\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)=\frac{1}{2}(\operatorname{I}_{\nu-1}(z)+\operatorname{I}_{\nu+1}(z))$$

**Holds when** $\nu\in\Z\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`58d91f` · Fungrim entry ↗](https://fungrim.org/entry/58d91f)

---

$$z\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)=\frac{1}{2}(\operatorname{J}_{\nu-1}(z)-\operatorname{J}_{\nu+1}(z))$$

**Holds when** $\nu\in\Z\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`5aceb9` · Fungrim entry ↗](https://fungrim.org/entry/5aceb9)

---

$$\operatorname{I}_{\frac{-1}{2}}(z)=\frac{\sqrt{2}\cosh(z)}{\sqrt{\pi}\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`5d9c43` · Fungrim entry ↗](https://fungrim.org/entry/5d9c43)

---

$$\operatorname{J}_{\frac{-1}{2}}(z)=\frac{\sqrt{2}\cos(z)}{\sqrt{\pi}\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`621a9b` · Fungrim entry ↗](https://fungrim.org/entry/621a9b)

---

$$(z^2-\nu^2)\operatorname{Y}_{\nu}(z)+z\mapsto\operatorname{Y}_{\nu}(z)^{\doubleprime}(z)z^2+zz\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)=0$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`62f23c` · Fungrim entry ↗](https://fungrim.org/entry/62f23c)

---

$$\operatorname{I}_{\frac{3}{2}}(z)=\frac{1}{\sqrt{\pi}}(\sqrt{2}(\frac{\cosh(z)}{z}-\frac{\sinh(z)}{z^2})\sqrt{z})$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`65647f` · Fungrim entry ↗](https://fungrim.org/entry/65647f)

---

$$\operatorname{J}_{\frac{-1}{3}}(z)=\frac{3\operatorname{Ai}(-((3z)/2)^{1/3}^2)+\sqrt{3}\operatorname{Bi}(-((3z)/2)^{1/3}^2)}{2\sqrt[3]{\frac{3}{2}}\sqrt[3]{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`685892` · Fungrim entry ↗](https://fungrim.org/entry/685892)

---

$$\mathrm{HankelH_1}(\nu, z)=\imaginaryI\operatorname{Y}_{\nu}(z)+\operatorname{J}_{\nu}(z)$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **HankelH1** — Hankel function of the first kind.
Used by the Compute Engine for simplification.
[`6a6a09` · Fungrim entry ↗](https://fungrim.org/entry/6a6a09)

---

$$\frac{(r^2+7r+12)z\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)z^2}{(r+4)!}+\frac{z(2r^2+11r+15)z\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)}{(r+3)!}+\frac{(-\nu^2-z^2+r(r+4)+4)z\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)}{(r+2)!}-\frac{2zz\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)}{(r+1)!}-\frac{1}{r!}(z\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z))=0$$

**Holds when** $\nu\in\C\land r\in\N\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`7377c8` · Fungrim entry ↗](https://fungrim.org/entry/7377c8)

---

$$\operatorname{K}_{\frac{-1}{2}}(z)=\frac{\sqrt{2}\exp(-z)\sqrt{\pi}}{2\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`7ac286` · Fungrim entry ↗](https://fungrim.org/entry/7ac286)

---

$$\operatorname{I}_{\nu}(z)=\frac{1}{\pi}(\int_{0}^{\pi}\!\cos(\nu t)\exp(z\cos(t))\, \mathrm{d}t)-\frac{1}{\pi}(\sin(\pi\nu)\int_{0}^{\infty}\!\exp(-(\nu t)-z\cosh(t))\, \mathrm{d}t)$$

**Holds when** $0\lt\Re(z)\land\nu\in\C\land z\in\C$.
Used by the Compute Engine for simplification.
[`7ae3ed` · Fungrim entry ↗](https://fungrim.org/entry/7ae3ed)

---

$$\operatorname{K}_{\nu}(z)=\frac{\sqrt{2}\mathrm{HypergeometricUStar}(\nu+\frac{1}{2}, 2\nu+1, 2z)\exp(-z)\sqrt{\pi}}{2\sqrt{z}}$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`7efe21` · Fungrim entry ↗](https://fungrim.org/entry/7efe21)

---

$$\operatorname{I}_{\nu}(z)=\mathrm{Hypergeometric0F1Regularized}(\nu+1, \frac{z^2}{4})(\frac{z}{2})^{\nu}$$

**Holds when** $\nu\in\N\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`81eec6` · Fungrim entry ↗](https://fungrim.org/entry/81eec6)

---

$$z\mapsto\operatorname{K}_{0}(z)^{\prime}(z)=-\operatorname{K}_{1}(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`81ffcd` · Fungrim entry ↗](https://fungrim.org/entry/81ffcd)

---

$$\operatorname{Y}_{\frac{3}{2}}(z)=-(\frac{1}{\sqrt{\pi}}(\sqrt{2}(\frac{\sin(z)}{z}+\frac{\cos(z)}{z^2})\sqrt{z}))$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`8472cc` · Fungrim entry ↗](https://fungrim.org/entry/8472cc)

---

$$z\mapsto\operatorname{Y}_{0}(z)^{\prime}(z)=-\operatorname{Y}_{1}(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`8b6264` · Fungrim entry ↗](https://fungrim.org/entry/8b6264)

---

$$-((\nu^2+z^2)\operatorname{I}_{\nu}(z))+z\mapsto\operatorname{I}_{\nu}(z)^{\doubleprime}(z)z^2+zz\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)=0$$

**Holds when** $\nu\in\Z\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`95e561` · Fungrim entry ↗](https://fungrim.org/entry/95e561)

---

$$\operatorname{K}_{\nu}(z)=\frac{\pi(\frac{\mathrm{Hypergeometric0F1Regularized}(1-\nu, z^2/4)}{(z/2)^{\nu}}-\mathrm{Hypergeometric0F1Regularized}(\nu+1, z^2/4)(z/2)^{\nu})}{2\sin(\pi\nu)}$$

**Holds when** $\nu\in\C\setminus\Z\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`98703d` · Fungrim entry ↗](https://fungrim.org/entry/98703d)

---

$$\operatorname{J}_{\nu}(z)=\frac{\mathrm{Hypergeometric1F_1}(\nu+\frac{1}{2}, 2\nu+1, 2\imaginaryI z)\exp(-(\imaginaryI z))(\frac{z}{2})^{\nu}}{\Gamma(\nu+1)}$$

**Holds when** $\nu\in\N\land z\in\C$ &nbsp;_or_&nbsp; $\nu\notin-\infty..-1\land\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric1F1** — Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`9ad254` · Fungrim entry ↗](https://fungrim.org/entry/9ad254)

---

$$\frac{(r^2+7r+12)z\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)z^2}{(r+4)!}+\frac{z(2r^2+11r+15)z\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)}{(r+3)!}+\frac{(-\nu^2+z^2+r(r+4)+4)z\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)}{(r+2)!}+\frac{2zz\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)}{(r+1)!}+\frac{1}{r!}(z\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z))=0$$

**Holds when** $\nu\in\Z\land z\in\C\land r\in\N$ &nbsp;_or_&nbsp; $\nu\in\C\land r\in\N\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`9b2f38` · Fungrim entry ↗](https://fungrim.org/entry/9b2f38)

---

$$\operatorname{K}_{\nu}(z)=-(\frac{z(\operatorname{K}_{\nu-1}(z)-\operatorname{K}_{\nu+1}(z))}{2\nu})$$

**Holds when** $z\in\C\land\nu\in\Z\setminus\lbrace0\rbrace$ &nbsp;_or_&nbsp; $\nu\in\C\setminus\lbrace0\rbrace\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`9d98f8` · Fungrim entry ↗](https://fungrim.org/entry/9d98f8)

---

$$z\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)=-(\frac{1}{2}(\operatorname{K}_{\nu-1}(z)+\operatorname{K}_{\nu+1}(z)))$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`a0ff0b` · Fungrim entry ↗](https://fungrim.org/entry/a0ff0b)

---

$$\operatorname{J}_{\frac{3}{2}}(z)=\frac{1}{\sqrt{\pi}}(\sqrt{2}(\frac{\sin(z)}{z^2}-\frac{\cos(z)}{z})\sqrt{z})$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`a2a294` · Fungrim entry ↗](https://fungrim.org/entry/a2a294)

---

$$\operatorname{I}_{\frac{1}{2}}(z)=\frac{\sqrt{2}\sinh(z)}{\sqrt{\pi}\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`a59981` · Fungrim entry ↗](https://fungrim.org/entry/a59981)

---

$$(z^2-\nu^2)\operatorname{J}_{\nu}(z)+z\mapsto\operatorname{J}_{\nu}(z)^{\doubleprime}(z)z^2+zz\mapsto\operatorname{J}_{\nu}(z)^{\prime}(z)=0$$

**Holds when** $\nu\in\Z\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`ad9caa` · Fungrim entry ↗](https://fungrim.org/entry/ad9caa)

---

$$\operatorname{I}_{-n}(z)=\operatorname{I}_{n}(z)$$

**Holds when** $n\in\Z\land z\in\C$.
Used by the Compute Engine for simplification.
[`afbd22` · Fungrim entry ↗](https://fungrim.org/entry/afbd22)

---

$$\operatorname{Y}_{\nu}(z)=\frac{\cos(\pi\nu)\mathrm{Hypergeometric0F1Regularized}(\nu+1, -(z^2/4))(z/2)^{\nu}-\frac{\mathrm{Hypergeometric0F1Regularized}(1-\nu, -(z^2/4))}{(z/2)^{\nu}}}{\sin(\pi\nu)}$$

**Holds when** $\nu\in\C\setminus\Z\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`b049dc` · Fungrim entry ↗](https://fungrim.org/entry/b049dc)

---

$$\operatorname{Y}_{\nu}(z)=\frac{z(\operatorname{Y}_{\nu-1}(z)+\operatorname{Y}_{\nu+1}(z))}{2\nu}$$

**Holds when** $z\in\C\land\nu\in\Z\setminus\lbrace0\rbrace$ &nbsp;_or_&nbsp; $\nu\in\C\setminus\lbrace0\rbrace\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`b6d600` · Fungrim entry ↗](https://fungrim.org/entry/b6d600)

---

$$z\mapsto\operatorname{I}_{0}(z)^{\prime}(z)=\operatorname{I}_{1}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`c0247f` · Fungrim entry ↗](https://fungrim.org/entry/c0247f)

---

$$\operatorname{K}_{\frac{2}{3}}(z)=-(\frac{\sqrt{3}\pi w\mapsto\operatorname{Ai}(w)^{\prime}(((3z)/2)^{1/3}^2)}{3/2^{2/3}z^{2/3}})$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`c362e8` · Fungrim entry ↗](https://fungrim.org/entry/c362e8)

---

$$\operatorname{J}_{\nu}(z)=\frac{1}{\pi}(\int_{0}^{\pi}\!\cos(\nu t-z\sin(t))\, \mathrm{d}t)-\frac{1}{\pi}(\sin(\pi\nu)\int_{0}^{\infty}\!\exp(-(\nu t)-z\sinh(t))\, \mathrm{d}t)$$

**Holds when** $0\lt\Re(z)\land\nu\in\C\land z\in\C$.
Used by the Compute Engine for simplification.
[`cac83e` · Fungrim entry ↗](https://fungrim.org/entry/cac83e)

---

$$\operatorname{K}_{\frac{1}{2}}(z)=\frac{\sqrt{2}\exp(-z)\sqrt{\pi}}{2\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`d1f5c5` · Fungrim entry ↗](https://fungrim.org/entry/d1f5c5)

---

$$\operatorname{J}_{\frac{1}{3}}(z)=\frac{3\operatorname{Ai}(-((3z)/2)^{1/3}^2)-\sqrt{3}\operatorname{Bi}(-((3z)/2)^{1/3}^2)}{2\sqrt[3]{\frac{3}{2}}\sqrt[3]{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`d39c46` · Fungrim entry ↗](https://fungrim.org/entry/d39c46)

---

$$\operatorname{J}_{\nu}(z)=\frac{z(\operatorname{J}_{\nu-1}(z)+\operatorname{J}_{\nu+1}(z))}{2\nu}$$

**Holds when** $z\in\C\land\nu\in\Z\setminus\lbrace0\rbrace$ &nbsp;_or_&nbsp; $\nu\in\C\setminus\lbrace0\rbrace\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`d56914` · Fungrim entry ↗](https://fungrim.org/entry/d56914)

---

$$\operatorname{Y}_{n}(z)=-(\frac{1}{\pi}(2(\operatorname{K}_{n}(\imaginaryI z)\imaginaryI^{n}+(\ln(\imaginaryI z)-\ln(z))\operatorname{J}_{n}(z))))$$

**Holds when** $n\in\Z\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`d5b7e8` · Fungrim entry ↗](https://fungrim.org/entry/d5b7e8)

---

$$\frac{(r^2+7r+12)z\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)z^2}{(r+4)!}+\frac{z(2r^2+11r+15)z\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)}{(r+3)!}+\frac{(-\nu^2-z^2+r(r+4)+4)z\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)}{(r+2)!}-\frac{2zz\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z)}{(r+1)!}-\frac{1}{r!}(z\mapsto\operatorname{I}_{\nu}(z)^{\prime}(z))=0$$

**Holds when** $\nu\in\Z\land z\in\C\land r\in\N$ &nbsp;_or_&nbsp; $\nu\in\C\land r\in\N\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`e233b0` · Fungrim entry ↗](https://fungrim.org/entry/e233b0)

---

$$\operatorname{J}_{\frac{2}{3}}(z)=\frac{3w\mapsto\operatorname{Ai}(w)^{\prime}(-((3z)/2)^{1/3}^2)+\sqrt{3}w\mapsto\operatorname{Bi}(w)^{\prime}(-((3z)/2)^{1/3}^2)}{2\frac{3}{2}^{\frac{2}{3}}z^{\frac{2}{3}}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`e72e96` · Fungrim entry ↗](https://fungrim.org/entry/e72e96)

---

$$\frac{(r^2+7r+12)z\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)z^2}{(r+4)!}+\frac{z(2r^2+11r+15)z\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)}{(r+3)!}+\frac{(-\nu^2+z^2+r(r+4)+4)z\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)}{(r+2)!}+\frac{2zz\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z)}{(r+1)!}+\frac{1}{r!}(z\mapsto\operatorname{Y}_{\nu}(z)^{\prime}(z))=0$$

**Holds when** $\nu\in\C\land r\in\N\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`e85dee` · Fungrim entry ↗](https://fungrim.org/entry/e85dee)

---

$$\operatorname{J}_{\nu}(z)=\mathrm{Hypergeometric0F1Regularized}(\nu+1, -(\frac{z^2}{4}))(\frac{z}{2})^{\nu}$$

**Holds when** $\nu\in\N\land z\in\C$ &nbsp;_or_&nbsp; $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`ecd36f` · Fungrim entry ↗](https://fungrim.org/entry/ecd36f)

---

$$z\mapsto\operatorname{J}_{0}(z)^{\prime}(z)=-\operatorname{J}_{1}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f1afc0` · Fungrim entry ↗](https://fungrim.org/entry/f1afc0)

---

$$(-n^2+r^2+4r+4)z\mapsto\operatorname{I}_{n}(z)^{\prime}(0)-(r+1)(r+2)z\mapsto\operatorname{I}_{n}(z)^{\prime}(0)=0$$

**Holds when** $n\in\Z\land r\in\N$.
Used by the Compute Engine for simplification.
[`f303c9` · Fungrim entry ↗](https://fungrim.org/entry/f303c9)

---

$$-((\nu^2+z^2)\operatorname{K}_{\nu}(z))+z\mapsto\operatorname{K}_{\nu}(z)^{\doubleprime}(z)z^2+zz\mapsto\operatorname{K}_{\nu}(z)^{\prime}(z)=0$$

**Holds when** $\nu\in\C\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`fd9add` · Fungrim entry ↗](https://fungrim.org/entry/fd9add)

---

$$\operatorname{K}_{\frac{-1}{3}}(z)=\frac{\sqrt{3}\pi\operatorname{Ai}(((3z)/2)^{1/3}^2)}{\sqrt[3]{\frac{3}{2}}\sqrt[3]{z}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`fda595` · Fungrim entry ↗](https://fungrim.org/entry/fda595)

---

## Beta function

$$\Beta(m, n)=\frac{(m-1)!(n-1)!}{(m+n-1)!}$$

**Holds when** $m\in\N^*\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`082a69` · Fungrim entry ↗](https://fungrim.org/entry/082a69)

---

$$\mathrm{IncompleteBeta}(1, a, b)=\Beta(a, b)$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **IncompleteBeta** — Incomplete beta function.
Used by the Compute Engine for expansion.
[`3141e4` · Fungrim entry ↗](https://fungrim.org/entry/3141e4)

---

$$\mathrm{IncompleteBetaRegularized}(x, a, b)=1-\mathrm{IncompleteBetaRegularized}(1-x, b, a)$$

**Holds when** $a+b\notin\Z_{\le0}\land x\in\C\land a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **IncompleteBetaRegularized** — Regularized incomplete beta function.
Used by the Compute Engine for simplification.
[`315b3d` · Fungrim entry ↗](https://fungrim.org/entry/315b3d)

---

$$\Beta(a, b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`888581` · Fungrim entry ↗](https://fungrim.org/entry/888581)

---

$$\mathrm{IncompleteBeta}(0, a, b)=0$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **IncompleteBeta** — Incomplete beta function.
Used by the Compute Engine for simplification.
[`ba7baf` · Fungrim entry ↗](https://fungrim.org/entry/ba7baf)

---

$$\Beta(m, n)=(m\mathrm{Binomial}(m+n-1, m))^{-1}$$

**Holds when** $m\in\N^*\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`bb4f41` · Fungrim entry ↗](https://fungrim.org/entry/bb4f41)

---

$$(a+b)\Beta(a+1, b)=a\Beta(a, b)$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`bdea17` · Fungrim entry ↗](https://fungrim.org/entry/bdea17)

---

$$\mathrm{IncompleteBetaRegularized}(x, a, b)=\frac{\mathrm{IncompleteBeta}(x, a, b)}{\Beta(a, b)}$$

**Holds when** $a+b\notin\Z_{\le0}\land x\in\C\land a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **IncompleteBeta** — Incomplete beta function; **IncompleteBetaRegularized** — Regularized incomplete beta function.
Used by the Compute Engine for simplification.
[`c92da4` · Fungrim entry ↗](https://fungrim.org/entry/c92da4)

---

$$\Beta(a, b)=\Beta(b, a)$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`cc2ebb` · Fungrim entry ↗](https://fungrim.org/entry/cc2ebb)

---

$$\Beta(a, b)=\Beta(a+1, b)+\Beta(a, b+1)$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`e9f966` · Fungrim entry ↗](https://fungrim.org/entry/e9f966)

---

$$\Beta(a, b)\Beta(a+b, c)=\Beta(b, c)\Beta(a, b+c)$$

**Holds when** $a+b\notin\Z_{\le0}\land b+c\notin\Z_{\le0}\land a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}\land c\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`fd0e48` · Fungrim entry ↗](https://fungrim.org/entry/fd0e48)

---

## Carlson symmetric elliptic integrals

$$\mathrm{CarlsonRD}(0, y, z)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(\frac{-3}{2}, \bigl\lbrack1/2, 3/2\bigr\rbrack, \bigl\lbrack y, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`00c331` · Fungrim entry ↗](https://fungrim.org/entry/00c331)

---

$$\mathrm{CarlsonRC}(x, -y)=\frac{\mathrm{artanh}(\sqrt{x/(x+y)})-\frac{\imaginaryI\pi}{2}}{\sqrt{x+y}}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`00cdb7` · Fungrim entry ↗](https://fungrim.org/entry/00cdb7)

---

$$\mathrm{CarlsonRD}(0, 1, 2)=\frac{3\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}\sqrt{\pi}^{3}}{2\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`060366` · Fungrim entry ↗](https://fungrim.org/entry/060366)

---

$$\mathrm{CarlsonRG}(-x, -y, -z)=\imaginaryI\mathrm{CarlsonRG}(x, y, z)$$

**Holds when** $x\in\lbrack0, \infty\rparen\land y\in\lbrack0, \infty\rparen\land z\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`092716` · Fungrim entry ↗](https://fungrim.org/entry/092716)

---

$$\mathrm{CarlsonRC}(x, 2x)=\frac{\pi}{4\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`09a494` · Fungrim entry ↗](https://fungrim.org/entry/09a494)

---

$$\mathrm{CarlsonRJ}(x, w, w, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, w)-\frac{x^{1/2}}{w})}{2(w-x)}&x\ne w\\\sqrt{x}^{-3}&x=w\end{cases}$$

**Holds when** $x\in\C\land w\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`0aa9ac` · Fungrim entry ↗](https://fungrim.org/entry/0aa9ac)

---

$$\mathrm{CarlsonRF}(1, 2, 2)=\frac{\pi}{4}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0bf328` · Fungrim entry ↗](https://fungrim.org/entry/0bf328)

---

$$\mathrm{CarlsonRF}(0, x, 2x)=\frac{\sqrt{2}\Gamma(1/4)^2}{8\sqrt{\pi}\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0ed5e2` · Fungrim entry ↗](https://fungrim.org/entry/0ed5e2)

---

$$\mathrm{CarlsonRG}(x, x, y)=\frac{1}{2}(\begin{cases}x\mathrm{CarlsonRC}(y, x)+\sqrt{y}&x\ne0\\\sqrt{y}&x=0\end{cases})$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`120284` · Fungrim entry ↗](https://fungrim.org/entry/120284)

---

$$\mathrm{WeierstrassP}(\mathrm{CarlsonRF}(z-\mathrm{EllipticRootE}(1, \tau), z-\mathrm{EllipticRootE}(2, \tau), z-\mathrm{EllipticRootE}(3, \tau)), \tau)=z$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`124339` · Fungrim entry ↗](https://fungrim.org/entry/124339)

---

$$\mathrm{CarlsonRD}(-x, -y, z)=-(\imaginaryI\mathrm{CarlsonRD}(x, y, -z))^\star$$

**Holds when** $x\in\lparen0, \infty\rbrack\land y\in\lparen0, \infty\rbrack\land z\in\lparen0, \infty\rbrack$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`12b1d0` · Fungrim entry ↗](https://fungrim.org/entry/12b1d0)

---

$$\mathrm{CarlsonRF}(0, 0, x)=\begin{cases}\infty&x\ne0\\\tilde\infty&x=0\end{cases}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`13a092` · Fungrim entry ↗](https://fungrim.org/entry/13a092)

---

$$\mathrm{CarlsonRD}(0, 0, -1)=\infty\imaginaryI$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`14a365` · Fungrim entry ↗](https://fungrim.org/entry/14a365)

---

$$\mathrm{CarlsonRC}(1, y+1)=\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, -y)$$

**Holds when** $y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`157ebb` · Fungrim entry ↗](https://fungrim.org/entry/157ebb)

---

$$\mathrm{CarlsonRD}(\mathrm{lamda}x, \mathrm{lamda}y, \mathrm{lamda}z)=\frac{\mathrm{CarlsonRD}(x, y, z)}{\sqrt{\mathrm{lamda}}^{3}}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`197a91` · Fungrim entry ↗](https://fungrim.org/entry/197a91)

---

$$\mathrm{CarlsonRC}(1, 0)=\infty$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`1acb07` · Fungrim entry ↗](https://fungrim.org/entry/1acb07)

---

$$\mathrm{CarlsonRJ}(0, 0, 1, -1)=-\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`1b6362` · Fungrim entry ↗](https://fungrim.org/entry/1b6362)

---

$$\mathrm{CarlsonRD}(1, 1, 1)=1$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`1c0fee` · Fungrim entry ↗](https://fungrim.org/entry/1c0fee)

---

$$\mathrm{CarlsonRD}(x, y, z)=\mathrm{CarlsonRD}(y, x, z)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`1e8061` · Fungrim entry ↗](https://fungrim.org/entry/1e8061)

---

$$\mathrm{CarlsonRJ}(0, \imaginaryI, -\imaginaryI, 1)=\frac{3\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`1eaaed` · Fungrim entry ↗](https://fungrim.org/entry/1eaaed)

---

$$\mathrm{CarlsonRJ}(x, x, x, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, w)-\frac{1}{x^{1/2}})}{x-w}&x\ne w\\\sqrt{w}^{-3}&x=w\end{cases}$$

**Holds when** $x\in\C\land w\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`1faf7a` · Fungrim entry ↗](https://fungrim.org/entry/1faf7a)

---

$$\mathrm{CarlsonRF}(-x, -y, z)=(\imaginaryI\mathrm{CarlsonRF}(x, y, -z))^\star$$

**Holds when** $x\in\lbrack0, \infty\rparen\land y\in\lbrack0, \infty\rparen\land z\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`23e0a7` · Fungrim entry ↗](https://fungrim.org/entry/23e0a7)

---

$$\mathrm{CarlsonRF}(x, y, z)=2\mathrm{CarlsonRF}(x+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}, y+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}, z+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z})$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`2499cd` · Fungrim entry ↗](https://fungrim.org/entry/2499cd)

---

$$\mathrm{CarlsonRG}(1, 1, 1)=1$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`250ff1` · Fungrim entry ↗](https://fungrim.org/entry/250ff1)

---

$$\mathrm{CarlsonRC}(1, -1)=\frac{1}{4}(-\imaginaryI\pi\sqrt{2})+\frac{1}{2}(\sqrt{2}\ln(1+\sqrt{2}))$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`25435b` · Fungrim entry ↗](https://fungrim.org/entry/25435b)

---

$$\mathrm{CarlsonRF}(0, x, -(cx))=\frac{1}{\sqrt{x}}(\begin{cases}\mathrm{EllipticK}(c+1)&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\2\imaginaryI\mathrm{EllipticK}(-c)+\mathrm{EllipticK}(c+1)&\top\end{cases})$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`271b73` · Fungrim entry ↗](https://fungrim.org/entry/271b73)

---

$$\mathrm{CarlsonRF}(0, 1, 2)=\frac{\sqrt{2}\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`28237a` · Fungrim entry ↗](https://fungrim.org/entry/28237a)

---

$$\mathrm{artanh}(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2, y^2-x^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\lparen-y, y\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`2cdd2f` · Fungrim entry ↗](https://fungrim.org/entry/2cdd2f)

---

$$\mathrm{CarlsonRD}(0, -1, 1)=\frac{3\sqrt{2}(1-\imaginaryI)\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}(1+\imaginaryI)\pi^{1/2}^{3}}{2\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`2dcf0c` · Fungrim entry ↗](https://fungrim.org/entry/2dcf0c)

---

$$\mathrm{CarlsonRJ}(1, -1, -1, -1)=\frac{-3}{4}-\frac{1}{8}(3\sqrt{2}\ln(1+\sqrt{2}))+\frac{1}{16}(3\sqrt{2}\imaginaryI\pi)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`303827` · Fungrim entry ↗](https://fungrim.org/entry/303827)

---

$$\mathrm{CarlsonRD}(1, -1, -1)=\frac{-3}{4}-\frac{1}{8}(3\sqrt{2}\ln(1+\sqrt{2}))+\frac{1}{16}(3\sqrt{2}\imaginaryI\pi)$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3047b1` · Fungrim entry ↗](https://fungrim.org/entry/3047b1)

---

$$\mathrm{CarlsonRD}(x, y, z)=2\mathrm{CarlsonRD}(x+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}, y+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}, z+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z})+(3)((z+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z})\sqrt{z})^{-1}$$

**Holds when** $z\ne0\land x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`31a3ba` · Fungrim entry ↗](https://fungrim.org/entry/31a3ba)

---

$$\arccos(\frac{x}{y})=\mathrm{CarlsonRC}(x^2, y^2)\sqrt{y^2-x^2}$$

**Holds when** $x\in\lbrack0, y\rbrack\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`33e034` · Fungrim entry ↗](https://fungrim.org/entry/33e034)

---

$$\mathrm{CarlsonRJ}(0, 0, -1, -1)=\infty\imaginaryI$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3567c5` · Fungrim entry ↗](https://fungrim.org/entry/3567c5)

---

$$\mathrm{CarlsonRC}(0, -1)=-(\frac{\imaginaryI\pi}{2})$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`35cb93` · Fungrim entry ↗](https://fungrim.org/entry/35cb93)

---

$$\mathrm{CarlsonRD}(0, y, z)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(\frac{-3}{2}, \bigl\lbrack1/2, 1/2, 1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z, z, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`37ffb7` · Fungrim entry ↗](https://fungrim.org/entry/37ffb7)

---

$$\mathrm{CarlsonRF}(\mathrm{lamda}+x, \mathrm{lamda}+y, \mathrm{lamda})+\mathrm{CarlsonRF}(\frac{xy}{\mathrm{lamda}}+x, \frac{xy}{\mathrm{lamda}}+y, \frac{xy}{\mathrm{lamda}})=\mathrm{CarlsonRF}(x, y, 0)$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen\land\mathrm{lamda}\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`38fa65` · Fungrim entry ↗](https://fungrim.org/entry/38fa65)

---

$$\mathrm{CarlsonRJ}(1, 2, 2, 2)=\frac{3\pi}{8}-\frac{3}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`397051` · Fungrim entry ↗](https://fungrim.org/entry/397051)

---

$$\ln(\frac{x}{y})=(x-y)\mathrm{CarlsonRC}(\frac{(x+y)^2}{4}, xy)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`398bb7` · Fungrim entry ↗](https://fungrim.org/entry/398bb7)

---

$$\mathrm{CarlsonRF}(0, -1, -1)=\frac{-(\imaginaryI\pi)}{2}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`3a84d6` · Fungrim entry ↗](https://fungrim.org/entry/3a84d6)

---

$$\mathrm{CarlsonRJ}(0, y, z, \sqrt{y}\sqrt{z})=\frac{3\mathrm{CarlsonRF}(0, y, z)}{2\sqrt{y}\sqrt{z}}$$

**Holds when** $y\in\C\land z\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3b6175` · Fungrim entry ↗](https://fungrim.org/entry/3b6175)

---

$$\mathrm{CarlsonRJ}(x, y, z, z)=\mathrm{CarlsonRD}(x, y, z)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`3dd30a` · Fungrim entry ↗](https://fungrim.org/entry/3dd30a)

---

$$\mathrm{CarlsonRD}(0, y, 1)=\begin{cases}\frac{3(\mathrm{EllipticK}(1-y)-\mathrm{EllipticE}(1-y))}{1-y}&y\ne1\\\frac{3\pi}{4}&y=1\end{cases}$$

**Holds when** $y\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`3e05c6` · Fungrim entry ↗](https://fungrim.org/entry/3e05c6)

---

$$\mathrm{CarlsonRG}(0, x, 2x)=(\frac{\sqrt{2}\sqrt{\pi}^{3}}{2\Gamma(1/4)^2}+\frac{\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}})\sqrt{x}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3f1547` · Fungrim entry ↗](https://fungrim.org/entry/3f1547)

---

$$\mathrm{CarlsonRG}(0, 1, x)=\frac{\mathrm{EllipticE}(1-x)}{2}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3f6d40` · Fungrim entry ↗](https://fungrim.org/entry/3f6d40)

---

$$\mathrm{CarlsonRG}(-x, -y, z)=-(\imaginaryI\mathrm{CarlsonRG}(x, y, -z))^\star$$

**Holds when** $x\in\lbrack0, \infty\rparen\land y\in\lbrack0, \infty\rparen\land z\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`4091ad` · Fungrim entry ↗](https://fungrim.org/entry/4091ad)

---

$$\mathrm{CarlsonRF}(0, x, y)=\frac{1}{\sqrt{x}}(\mathrm{EllipticK}(1-\frac{y}{x}))$$

**Holds when** $\vert\arg(x)-\arg(y)\vert\lt\pi\land x\in\C\land y\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`415ff0` · Fungrim entry ↗](https://fungrim.org/entry/415ff0)

---

$$\mathrm{arsinh}(\frac{x}{y})=x\mathrm{CarlsonRC}(x^2+y^2, y^2)$$

**Holds when** $x\in\R\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`423b36` · Fungrim entry ↗](https://fungrim.org/entry/423b36)

---

$$\mathrm{CarlsonRC}(x, y)=\mathrm{CarlsonHypergeometricR}(\frac{-1}{2}, \bigl\lbrack\frac{1}{2}, \frac{1}{2}, \frac{1}{2}\bigr\rbrack, \bigl\lbrack x, y, y\bigr\rbrack)$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land x\in\C\setminus\lparen-\infty, 0\rparen$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`42c7f1` · Fungrim entry ↗](https://fungrim.org/entry/42c7f1)

---

$$\mathrm{CarlsonRJ}(1, 2, 2, 4)=\frac{1}{24}(\pi(9-4\sqrt{3}))$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`44d300` · Fungrim entry ↗](https://fungrim.org/entry/44d300)

---

$$\mathrm{CarlsonRG}(0, x, -(cx))=\frac{1}{2}(\begin{cases}\mathrm{EllipticE}(c+1)&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\\mathrm{EllipticE}(c+1)+2\imaginaryI(\mathrm{EllipticK}(-c)-\mathrm{EllipticE}(-c))&\top\end{cases}\sqrt{x})$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`48333c` · Fungrim entry ↗](https://fungrim.org/entry/48333c)

---

$$\mathrm{CarlsonRD}(-1, -1, -1)=\imaginaryI$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4a2403` · Fungrim entry ↗](https://fungrim.org/entry/4a2403)

---

$$\mathrm{CarlsonRC}(-x, y)=(\imaginaryI\mathrm{CarlsonRC}(x, -y))^\star$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4becdd` · Fungrim entry ↗](https://fungrim.org/entry/4becdd)

---

$$\mathrm{CarlsonRF}(0, 2, 4)=\frac{\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4c1988` · Fungrim entry ↗](https://fungrim.org/entry/4c1988)

---

$$\mathrm{CarlsonRJ}(1, -1, -1, 1)=\frac{-3}{2}-\frac{1}{8}(3\sqrt{2}\imaginaryI\pi)+\frac{1}{4}(3\sqrt{2}\ln(1+\sqrt{2}))$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4c1db8` · Fungrim entry ↗](https://fungrim.org/entry/4c1db8)

---

$$\mathrm{CarlsonRJ}(x, x, x, x)=\sqrt{x}^{-3}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4c882a` · Fungrim entry ↗](https://fungrim.org/entry/4c882a)

---

$$\mathrm{CarlsonRF}(1, 1, 2)=\ln(1+\sqrt{2})$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4cd504` · Fungrim entry ↗](https://fungrim.org/entry/4cd504)

---

$$\mathrm{CarlsonRD}(1, 2, 2)=\frac{3\pi}{8}-\frac{3}{4}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4d2c10` · Fungrim entry ↗](https://fungrim.org/entry/4d2c10)

---

$$\mathrm{CarlsonRG}(1, 1, 2)=\frac{\ln(1+\sqrt{2})}{2}+\frac{\sqrt{2}}{2}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`4d7098` · Fungrim entry ↗](https://fungrim.org/entry/4d7098)

---

$$\mathrm{CarlsonRJ}(\mathrm{lamda}x, \mathrm{lamda}y, \mathrm{lamda}z, \mathrm{lamda}w)=\frac{\mathrm{CarlsonRJ}(x, y, z, w)}{\sqrt{\mathrm{lamda}}^{3}}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land w\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4e21c7` · Fungrim entry ↗](https://fungrim.org/entry/4e21c7)

---

$$\mathrm{CarlsonRD}(0, y, z)=\frac{\begin{cases}\frac{3(\mathrm{EllipticE}(1-z/y)-(z\mathrm{EllipticK}(1-z/y))/y)}{(z(1-z/y))/y}&z\ne0\land z\ne y\\\frac{3\pi}{4}&z=y\\\tilde\infty&z=0\end{cases}}{\sqrt{y}^{3}}$$

**Holds when** $\vert\arg(y)-\arg(z)\vert\lt\pi\land z\in\C\land y\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4e4380` · Fungrim entry ↗](https://fungrim.org/entry/4e4380)

---

$$\mathrm{CarlsonRJ}(\mathrm{lamda}+x, \mathrm{lamda}+y, \mathrm{lamda}, \mathrm{lamda}+w)+\mathrm{CarlsonRJ}(\frac{xy}{\mathrm{lamda}}+x, \frac{xy}{\mathrm{lamda}}+y, \frac{xy}{\mathrm{lamda}}, \frac{xy}{\mathrm{lamda}}+w)=\mathrm{CarlsonRJ}(x, y, 0, w)-3\mathrm{CarlsonRC}((\frac{xy}{\mathrm{lamda}}+\mathrm{lamda}+x+y)w^2, w(\mathrm{lamda}+w)(\frac{xy}{\mathrm{lamda}}+w))$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen\land w\in\lparen0, \infty\rparen\land\mathrm{lamda}\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4eac3f` · Fungrim entry ↗](https://fungrim.org/entry/4eac3f)

---

$$\mathrm{CarlsonRJ}(0, 1, 1, 2)=\frac{3\pi}{2(2+\sqrt{2})}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`522f54` · Fungrim entry ↗](https://fungrim.org/entry/522f54)

---

$$\mathrm{CarlsonRJ}(1, 1, -1, -1)=\imaginaryI(\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2})-\frac{3\sqrt{2}\pi}{8}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`534335` · Fungrim entry ↗](https://fungrim.org/entry/534335)

---

$$\mathrm{CarlsonRF}(0, x, cx)=\frac{\mathrm{EllipticK}(1-c)}{\sqrt{x}}$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`538c8c` · Fungrim entry ↗](https://fungrim.org/entry/538c8c)

---

$$\mathrm{CarlsonRF}(0, 1, x)=\mathrm{EllipticK}(1-x)$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`53d869` · Fungrim entry ↗](https://fungrim.org/entry/53d869)

---

$$\mathrm{CarlsonRD}(1, 1, -1)=\imaginaryI(\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2})-\frac{3\sqrt{2}\pi}{8}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`545e8b` · Fungrim entry ↗](https://fungrim.org/entry/545e8b)

---

$$\mathrm{CarlsonRJ}(0, 0, 0, 0)=\tilde\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`55cd70` · Fungrim entry ↗](https://fungrim.org/entry/55cd70)

---

$$\mathrm{CarlsonRC}(-1, 0)=-(\infty\imaginaryI)$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`56d1bc` · Fungrim entry ↗](https://fungrim.org/entry/56d1bc)

---

$$\arcsin(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2-x^2, y^2)$$

**Holds when** $x\in\lbrack-y, y\rbrack\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`584a61` · Fungrim entry ↗](https://fungrim.org/entry/584a61)

---

$$\mathrm{CarlsonRJ}(0, y, z, w)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(\frac{-3}{2}, \bigl\lbrack1/2, 1/2, 1\bigr\rbrack, \bigl\lbrack y, z, w\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack\land w\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`5a8f57` · Fungrim entry ↗](https://fungrim.org/entry/5a8f57)

---

$$\mathrm{CarlsonRF}(-x, -y, -z)=-(\imaginaryI\mathrm{CarlsonRF}(x, y, z))$$

**Holds when** $x\in\lbrack0, \infty\rparen\land y\in\lbrack0, \infty\rparen\land z\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`5ab6bf` · Fungrim entry ↗](https://fungrim.org/entry/5ab6bf)

---

$$\mathrm{CarlsonRC}(x, y)=\begin{cases}\frac{\arctan((y/x-1)^{1/2})}{\sqrt{y-x}}&x\lt y\\\frac{1}{\sqrt{x}}&x=y\\\frac{\mathrm{artanh}((1-y/x)^{1/2})}{\sqrt{x-y}}&y\lt x\end{cases}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`5ada5f` · Fungrim entry ↗](https://fungrim.org/entry/5ada5f)

---

$$\mathrm{CarlsonRF}(0, -1, -2)=-(\frac{\sqrt{2}\imaginaryI\Gamma(1/4)^2}{8\sqrt{\pi}})$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`5c178f` · Fungrim entry ↗](https://fungrim.org/entry/5c178f)

---

$$\mathrm{CarlsonRC}(0, 0)=\tilde\infty$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`5c2b08` · Fungrim entry ↗](https://fungrim.org/entry/5c2b08)

---

$$\mathrm{CarlsonRJ}(x, x, x, w)=\mathrm{CarlsonRD}(w, w, x)$$

**Holds when** $x\in\C\land w\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`5c6f10` · Fungrim entry ↗](https://fungrim.org/entry/5c6f10)

---

$$\mathrm{CarlsonRG}(x, y, y)=\frac{1}{2}(\begin{cases}y\mathrm{CarlsonRC}(x, y)+\sqrt{x}&y\ne0\\\sqrt{x}&y=0\end{cases})$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`5d0c95` · Fungrim entry ↗](https://fungrim.org/entry/5d0c95)

---

$$\mathrm{CarlsonRD}(0, 1, z)=\begin{cases}\frac{3(\mathrm{EllipticE}(1-z)-z\mathrm{EllipticK}(1-z))}{z(1-z)}&z\ne0\land z\ne1\\\frac{3\pi}{4}&z=1\\\tilde\infty&z=0\end{cases}$$

**Holds when** $z\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`61c002` · Fungrim entry ↗](https://fungrim.org/entry/61c002)

---

$$\mathrm{CarlsonRC}(x, y)=\mathrm{CarlsonRF}(x, y, y)$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`61f98d` · Fungrim entry ↗](https://fungrim.org/entry/61f98d)

---

$$\mathrm{CarlsonRJ}(0, -1, 1, 1)=\frac{3\sqrt{2}(1-\imaginaryI)\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}(1+\imaginaryI)\pi^{1/2}^{3}}{2\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`62b0c4` · Fungrim entry ↗](https://fungrim.org/entry/62b0c4)

---

$$\mathrm{CarlsonRD}(0, 2, 1)=\frac{3\sqrt{2}\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`63644d` · Fungrim entry ↗](https://fungrim.org/entry/63644d)

---

$$\mathrm{CarlsonRJ}(0, 1, 1, 1)=\frac{3\pi}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`64a808` · Fungrim entry ↗](https://fungrim.org/entry/64a808)

---

$$\mathrm{CarlsonRJ}(-x, -y, -z, -w)=\imaginaryI\mathrm{CarlsonRJ}(x, y, z, w)$$

**Holds when** $x\in\lparen0, \infty\rbrack\land y\in\lparen0, \infty\rbrack\land z\in\lparen0, \infty\rbrack\land w\in\lparen0, \infty\rbrack$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`64d87a` · Fungrim entry ↗](https://fungrim.org/entry/64d87a)

---

$$\mathrm{CarlsonRJ}(x, y, z, w)=\mathrm{CarlsonRJ}(x, z, y, w)=\mathrm{CarlsonRJ}(y, x, z, w)=\mathrm{CarlsonRJ}(y, z, x, w)=\mathrm{CarlsonRJ}(z, x, y, w)=\mathrm{CarlsonRJ}(z, y, x, w)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land w\in\C$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`655a2b` · Fungrim entry ↗](https://fungrim.org/entry/655a2b)

---

$$\mathrm{CarlsonRF}(-1, -1, -1)=-\imaginaryI$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`6674bb` · Fungrim entry ↗](https://fungrim.org/entry/6674bb)

---

$$\mathrm{CarlsonRF}(0, \frac{\Gamma(1/4)^4}{16\pi}, \frac{\Gamma(1/4)^4}{32\pi})=1$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`67e015` · Fungrim entry ↗](https://fungrim.org/entry/67e015)

---

$$\mathrm{CarlsonRF}(0, \frac{1}{2}, 1)=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`6c4567` · Fungrim entry ↗](https://fungrim.org/entry/6c4567)

---

$$\mathrm{CarlsonRD}(y, z, x)+\mathrm{CarlsonRD}(z, x, y)+\mathrm{CarlsonRD}(x, y, z)=(3)(\sqrt{x}\sqrt{y}\sqrt{z})^{-1}$$

**Holds when** $x\ne0\land y\ne0\land x\in\C\land y\in\C\land z\in\C$ &nbsp;_or_&nbsp; $z\ne0$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`6dda7a` · Fungrim entry ↗](https://fungrim.org/entry/6dda7a)

---

$$\mathrm{CarlsonRJ}(1, 1, 2, 4)=-\pi\frac{\sqrt{2}}{8}+\ln(1+\sqrt{2})$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`6e9544` · Fungrim entry ↗](https://fungrim.org/entry/6e9544)

---

$$\mathrm{CarlsonRC}(x, y)=\begin{cases}\frac{\arccos(x/y^{1/2})}{\sqrt{y-x}}&x\lt y\\\frac{1}{\sqrt{x}}&x=y\\\frac{\mathrm{arcosh}(x/y^{1/2})}{\sqrt{x-y}}&y\lt x\end{cases}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`718f3a` · Fungrim entry ↗](https://fungrim.org/entry/718f3a)

---

$$\mathrm{CarlsonRC}(1, x)=\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, 1-x)$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`72b5bd` · Fungrim entry ↗](https://fungrim.org/entry/72b5bd)

---

$$\mathrm{CarlsonRJ}(0, y, z, w)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(\frac{-3}{2}, \bigl\lbrack1/2, 1/2, 1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z, w, w\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack\land w\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`7314c4` · Fungrim entry ↗](https://fungrim.org/entry/7314c4)

---

$$\mathrm{CarlsonRC}(x, -(cx))=\frac{\begin{cases}\mathrm{artanh}((c+1)^{1/2})&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\\mathrm{artanh}((c+1)^{1/2})+\imaginaryI\pi&\top\end{cases}}{\sqrt{x}\sqrt{c+1}}$$

**Holds when** $x\in\C\land c\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7348e3` · Fungrim entry ↗](https://fungrim.org/entry/7348e3)

---

$$\mathrm{CarlsonRD}(0, 0, 1)=\infty$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`748131` · Fungrim entry ↗](https://fungrim.org/entry/748131)

---

$$\mathrm{CarlsonRD}(x, x, y)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(y, x)-\frac{1}{y^{1/2}})}{y-x}&x\ne y\\\sqrt{x}^{-3}&x=y\end{cases}$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`771801` · Fungrim entry ↗](https://fungrim.org/entry/771801)

---

$$\mathrm{CarlsonRJ}(0, -1, -1, 1)=-(\frac{1}{4}(3\pi(1+\imaginaryI)))$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`78131f` · Fungrim entry ↗](https://fungrim.org/entry/78131f)

---

$$\mathrm{CarlsonRF}(\mathrm{lamda}x, \mathrm{lamda}y, \mathrm{lamda}z)=\frac{\mathrm{CarlsonRF}(x, y, z)}{\sqrt{\mathrm{lamda}}}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`7a168a` · Fungrim entry ↗](https://fungrim.org/entry/7a168a)

---

$$\arctan(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2, x^2+y^2)$$

**Holds when** $x\in\R\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7a9dad` · Fungrim entry ↗](https://fungrim.org/entry/7a9dad)

---

$$\mathrm{CarlsonRG}(0, x, -x)=\frac{\sqrt{2}\begin{cases}1+\imaginaryI&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\1-\imaginaryI&\top\end{cases}\sqrt{\pi}^{3}\sqrt{x}}{2\Gamma(1/4)^2}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`7c50d1` · Fungrim entry ↗](https://fungrim.org/entry/7c50d1)

---

$$\mathrm{CarlsonRC}(x, 0)=\begin{cases}\infty\mathrm{sgn}(\frac{1}{x^{1/2}})&x\ne0\\\tilde\infty&x=0\end{cases}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7cbe17` · Fungrim entry ↗](https://fungrim.org/entry/7cbe17)

---

$$\mathrm{CarlsonRG}(0, x, y)=\frac{1}{2}(\mathrm{EllipticE}(1-\frac{y}{x})\sqrt{x})$$

**Holds when** $\vert\arg(x)-\arg(y)\vert\lt\pi\land x\in\C\land y\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`7cddc6` · Fungrim entry ↗](https://fungrim.org/entry/7cddc6)

---

$$\mathrm{CarlsonRC}(x, y)=\mathrm{CarlsonHypergeometricR}(\frac{-1}{2}, \bigl\lbrack\frac{1}{2}, 1\bigr\rbrack, \bigl\lbrack x, y\bigr\rbrack)$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land x\in\C\setminus\lparen-\infty, 0\rparen$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7ded8f` · Fungrim entry ↗](https://fungrim.org/entry/7ded8f)

---

$$\mathrm{CarlsonRC}(-1, 1)=\frac{1}{2}(-\imaginaryI\sqrt{2}\ln(1+\sqrt{2}))+\frac{\pi\sqrt{2}}{4}$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7ea1ad` · Fungrim entry ↗](https://fungrim.org/entry/7ea1ad)

---

$$\mathrm{CarlsonRJ}(0, 1, 2, \sqrt{2})=\frac{3\Gamma(1/4)^2}{16\sqrt{\pi}}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`7f8a58` · Fungrim entry ↗](https://fungrim.org/entry/7f8a58)

---

$$\mathrm{CarlsonRJ}(-x, -y, -z, w)=-(\imaginaryI\mathrm{CarlsonRJ}(x, y, z, -w))^\star$$

**Holds when** $x\in\lparen0, \infty\rbrack\land y\in\lparen0, \infty\rbrack\land z\in\lparen0, \infty\rbrack\land w\in\lparen0, \infty\rbrack$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`849751` · Fungrim entry ↗](https://fungrim.org/entry/849751)

---

$$\mathrm{CarlsonRD}(0, 1, 1)=\frac{3\pi}{4}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`84ea08` · Fungrim entry ↗](https://fungrim.org/entry/84ea08)

---

$$\mathrm{CarlsonRG}(0, 1, 2)=\frac{\sqrt{2}\sqrt{\pi}^{3}}{2\Gamma(1/4)^2}+\frac{\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`84f403` · Fungrim entry ↗](https://fungrim.org/entry/84f403)

---

$$\mathrm{CarlsonRF}(0, \frac{\Gamma(1/4)^4}{32\pi}, \frac{-\Gamma(1/4)^4}{32\pi})=1-\imaginaryI$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8519dd` · Fungrim entry ↗](https://fungrim.org/entry/8519dd)

---

$$\mathrm{CarlsonRF}(0, 1, 1)=\frac{\pi}{2}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8bb972` · Fungrim entry ↗](https://fungrim.org/entry/8bb972)

---

$$\mathrm{CarlsonRC}(x, cx)=\begin{cases}\frac{\arctan((c-1)^{1/2})}{\sqrt{x(c-1)}}&1\lt c\\\frac{1}{\sqrt{x}}&c=1\\\frac{\mathrm{artanh}((1-c)^{1/2})}{\sqrt{x(1-c)}}&c\lt1\end{cases}$$

**Holds when** $x\in\C\land c\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8c9ba1` · Fungrim entry ↗](https://fungrim.org/entry/8c9ba1)

---

$$\mathrm{CarlsonRD}(0, y, z)=\frac{\begin{cases}\frac{3(\mathrm{EllipticK}(1-y/z)-\mathrm{EllipticE}(1-y/z))}{1-y/z}&y\ne z\\\frac{3\pi}{4}&y=z\end{cases}}{\sqrt{z}^{3}}$$

**Holds when** $\vert\arg(y)-\arg(z)\vert\lt\pi\land y\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8d0629` · Fungrim entry ↗](https://fungrim.org/entry/8d0629)

---

$$\mathrm{CarlsonRF}(x, y, z)=\mathrm{CarlsonRF}(\frac{1}{4}(x+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}), \frac{1}{4}(y+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}), \frac{1}{4}(z+\sqrt{x}\sqrt{y}+\sqrt{x}\sqrt{z}+\sqrt{y}\sqrt{z}))$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8e6189` · Fungrim entry ↗](https://fungrim.org/entry/8e6189)

---

$$\mathrm{CarlsonRC}(x, y)=2\mathrm{CarlsonRC}(x+y+2\sqrt{x}\sqrt{y}, y+y+2\sqrt{x}\sqrt{y})$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8f5d76` · Fungrim entry ↗](https://fungrim.org/entry/8f5d76)

---

$$\mathrm{CarlsonRF}(0, 0, -1)=-(\infty\imaginaryI)$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`90af98` · Fungrim entry ↗](https://fungrim.org/entry/90af98)

---

$$\mathrm{CarlsonRD}(0, 0, 0)=\tilde\infty$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`980014` · Fungrim entry ↗](https://fungrim.org/entry/980014)

---

$$\mathrm{CarlsonRG}(x, x, x)=\sqrt{x}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`990145` · Fungrim entry ↗](https://fungrim.org/entry/990145)

---

$$\mathrm{CarlsonRF}(0, 0, 1)=\infty$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`9a95a5` · Fungrim entry ↗](https://fungrim.org/entry/9a95a5)

---

$$\mathrm{CarlsonRF}(x, x, x)=\frac{1}{\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`9b0388` · Fungrim entry ↗](https://fungrim.org/entry/9b0388)

---

$$\mathrm{CarlsonRD}(0, x, 1)=\frac{1}{4}(3\pi\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{3}{2}, 2, 1-x))$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`9bfd88` · Fungrim entry ↗](https://fungrim.org/entry/9bfd88)

---

$$\mathrm{CarlsonRG}(0, 1, -1)=\frac{\sqrt{2}(1+\imaginaryI)\sqrt{\pi}^{3}}{2\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`9e30e7` · Fungrim entry ↗](https://fungrim.org/entry/9e30e7)

---

$$\mathrm{CarlsonRJ}(0, 1, 2, 1)=\frac{3\sqrt{2}\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`9f2b18` · Fungrim entry ↗](https://fungrim.org/entry/9f2b18)

---

$$\mathrm{CarlsonRJ}(-1, -1, -1, -1)=\imaginaryI$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`a091d1` · Fungrim entry ↗](https://fungrim.org/entry/a091d1)

---

$$\mathrm{CarlsonRJ}(1, 2, 2, 1)=3-\frac{3\pi}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`a1414f` · Fungrim entry ↗](https://fungrim.org/entry/a1414f)

---

$$\mathrm{CarlsonRC}(2, 1)=\ln(1+\sqrt{2})$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`a15c03` · Fungrim entry ↗](https://fungrim.org/entry/a15c03)

---

$$\mathrm{CarlsonRD}(\mathrm{lamda}, \mathrm{lamda}+x, \mathrm{lamda}+y)+\mathrm{CarlsonRD}(\frac{xy}{\mathrm{lamda}}, \frac{xy}{\mathrm{lamda}}+x, \frac{xy}{\mathrm{lamda}}+y)=\mathrm{CarlsonRD}(0, x, y)-(3)(y\sqrt{\frac{xy}{\mathrm{lamda}}+\mathrm{lamda}+x+y})^{-1}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen\land\mathrm{lamda}\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`a203e9` · Fungrim entry ↗](https://fungrim.org/entry/a203e9)

---

$$\mathrm{CarlsonRG}(0, x, cx)=\frac{1}{2}(\mathrm{EllipticE}(1-c)\sqrt{x})$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`a2e9dd` · Fungrim entry ↗](https://fungrim.org/entry/a2e9dd)

---

$$\mathrm{CarlsonRC}(\mathrm{lamda}x, \mathrm{lamda}y)=\frac{\mathrm{CarlsonRC}(x, y)}{\sqrt{\mathrm{lamda}}}$$

**Holds when** $x\in\C\land y\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`a839d5` · Fungrim entry ↗](https://fungrim.org/entry/a839d5)

---

$$\mathrm{CarlsonRJ}(1, 1, 2, 2)=3\ln(1+\sqrt{2})-\frac{3\sqrt{2}}{2}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`a9f190` · Fungrim entry ↗](https://fungrim.org/entry/a9f190)

---

$$\mathrm{CarlsonRF}(0, x, x)=\frac{\pi}{2\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ab5af3` · Fungrim entry ↗](https://fungrim.org/entry/ab5af3)

---

$$\mathrm{CarlsonRC}(x, x)=\frac{1}{\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ad96f4` · Fungrim entry ↗](https://fungrim.org/entry/ad96f4)

---

$$\mathrm{CarlsonRJ}(1, 1, 1, 0)=\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`b07652` · Fungrim entry ↗](https://fungrim.org/entry/b07652)

---

$$\mathrm{CarlsonRC}(2x, x)=\frac{\ln(1+\sqrt{2})}{\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`b136bd` · Fungrim entry ↗](https://fungrim.org/entry/b136bd)

---

$$\mathrm{CarlsonRJ}(1, 1, 1, 2)=3-\frac{3\pi}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`b1c84e` · Fungrim entry ↗](https://fungrim.org/entry/b1c84e)

---

$$\mathrm{CarlsonRF}(0, x, 1)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{1}{2}, 1, 1-x))$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`b2fdfe` · Fungrim entry ↗](https://fungrim.org/entry/b2fdfe)

---

$$\mathrm{CarlsonRJ}(0, 1, 1, -1)=-(\frac{1}{4}(3\pi(1+\imaginaryI)))$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`b468f3` · Fungrim entry ↗](https://fungrim.org/entry/b468f3)

---

$$\mathrm{CarlsonRG}(x, y, z)=\mathrm{CarlsonRG}(x, z, y)=\mathrm{CarlsonRG}(y, x, z)=\mathrm{CarlsonRG}(y, z, x)=\mathrm{CarlsonRG}(z, x, y)=\mathrm{CarlsonRG}(z, y, x)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for expansion.
[`b478a1` · Fungrim entry ↗](https://fungrim.org/entry/b478a1)

---

$$\mathrm{CarlsonRG}(0, y, z)=\frac{1}{4}(\pi\mathrm{CarlsonHypergeometricR}(\frac{1}{2}, \bigl\lbrack1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`b4a735` · Fungrim entry ↗](https://fungrim.org/entry/b4a735)

---

$$\mathrm{CarlsonRJ}(0, 0, 1, 1)=\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`b891d1` · Fungrim entry ↗](https://fungrim.org/entry/b891d1)

---

$$\mathrm{CarlsonRD}(0, 1, x)=\frac{3\pi\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{1}{2}, 2, 1-x)}{4x}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`bbf003` · Fungrim entry ↗](https://fungrim.org/entry/bbf003)

---

$$\mathrm{CarlsonRC}(-x, y)=\frac{\frac{\pi}{2}-\imaginaryI\mathrm{artanh}(x/(x+y)^{1/2})}{\sqrt{x+y}}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`bc2f88` · Fungrim entry ↗](https://fungrim.org/entry/bc2f88)

---

$$\mathrm{CarlsonRG}(0, 0, 0)=0$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`bcc121` · Fungrim entry ↗](https://fungrim.org/entry/bcc121)

---

$$\mathrm{CarlsonRJ}(0, 1, 2, 2)=\frac{3\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}\sqrt{\pi}^{3}}{2\Gamma(1/4)^2}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`c05ed8` · Fungrim entry ↗](https://fungrim.org/entry/c05ed8)

---

$$\mathrm{CarlsonRF}(1, 1, 1)=1$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`c166ca` · Fungrim entry ↗](https://fungrim.org/entry/c166ca)

---

$$\mathrm{CarlsonRG}(0, 16, 16)=\pi$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`c5a9cf` · Fungrim entry ↗](https://fungrim.org/entry/c5a9cf)

---

$$\mathrm{CarlsonRD}(x, y, y)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, y)-\frac{x^{1/2}}{y})}{2(y-x)}&x\ne y\\\sqrt{x}^{-3}&x=y\end{cases}$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`c85c2f` · Fungrim entry ↗](https://fungrim.org/entry/c85c2f)

---

$$\mathrm{CarlsonRD}(x, x, x)=\sqrt{x}^{-3}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`ccb4d1` · Fungrim entry ↗](https://fungrim.org/entry/ccb4d1)

---

$$\mathrm{CarlsonRG}(0, 1, 1)=\frac{\pi}{4}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`cd55cf` · Fungrim entry ↗](https://fungrim.org/entry/cd55cf)

---

$$\mathrm{CarlsonRG}(0, x, x)=\frac{\pi\sqrt{x}}{4}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`cdb587` · Fungrim entry ↗](https://fungrim.org/entry/cdb587)

---

$$\mathrm{CarlsonRJ}(0, -1, -1, -1)=\frac{3\imaginaryI\pi}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`cdee01` · Fungrim entry ↗](https://fungrim.org/entry/cdee01)

---

$$\mathrm{CarlsonRF}(0, \imaginaryI, -\imaginaryI)=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`cf5caa` · Fungrim entry ↗](https://fungrim.org/entry/cf5caa)

---

$$\mathrm{CarlsonRF}(0, y, z)=\frac{1}{2}(\pi\mathrm{CarlsonHypergeometricR}(\frac{-1}{2}, \bigl\lbrack1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`d0c9ff` · Fungrim entry ↗](https://fungrim.org/entry/d0c9ff)

---

$$\mathrm{CarlsonRC}(1, 1)=1$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`d38c27` · Fungrim entry ↗](https://fungrim.org/entry/d38c27)

---

$$\mathrm{CarlsonRJ}(x, y, y, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, y)-\mathrm{CarlsonRC}(x, w))}{w-y}&y\ne w\\\frac{3(\mathrm{CarlsonRC}(x, y)-\frac{x^{1/2}}{y})}{2(y-x)}&x\ne y\land y=w\\\sqrt{x}^{-3}&x=y=w\end{cases}$$

**Holds when** $x\in\C\land y\in\C\land w\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`d4b12e` · Fungrim entry ↗](https://fungrim.org/entry/d4b12e)

---

$$\mathrm{CarlsonRG}(1, 2, 2)=\frac{1}{2}+\frac{\pi}{4}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`d51efc` · Fungrim entry ↗](https://fungrim.org/entry/d51efc)

---

$$\mathrm{CarlsonRD}(0, -1, -1)=\frac{3\imaginaryI\pi}{4}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`d52bda` · Fungrim entry ↗](https://fungrim.org/entry/d52bda)

---

$$\mathrm{CarlsonRG}(0, 0, 1)=\frac{1}{2}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`d5ff09` · Fungrim entry ↗](https://fungrim.org/entry/d5ff09)

---

$$\mathrm{CarlsonRG}(0, 0, x)=\frac{\sqrt{x}}{2}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`d829be` · Fungrim entry ↗](https://fungrim.org/entry/d829be)

---

$$\mathrm{arcosh}(\frac{x}{y})=\mathrm{CarlsonRC}(x^2, y^2)\sqrt{x^2-y^2}$$

**Holds when** $x\in\lbrack y, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`d9765b` · Fungrim entry ↗](https://fungrim.org/entry/d9765b)

---

$$\mathrm{CarlsonRD}(0, 1, 0)=\tilde\infty$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`dbe634` · Fungrim entry ↗](https://fungrim.org/entry/dbe634)

---

$$\mathrm{CarlsonRC}(-x, -y)=-(\imaginaryI\mathrm{CarlsonRC}(x, y))$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`de0638` · Fungrim entry ↗](https://fungrim.org/entry/de0638)

---

$$\mathrm{CarlsonRJ}(1, 1, 1, -1)=\frac{-3}{2}-\frac{1}{8}(3\sqrt{2}\imaginaryI\pi)+\frac{1}{4}(3\sqrt{2}\ln(1+\sqrt{2}))$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e04867` · Fungrim entry ↗](https://fungrim.org/entry/e04867)

---

$$\mathrm{CarlsonRJ}(0, 0, z, w)=\begin{cases}\infty\mathrm{sgn}(\frac{1}{wz^{1/2}})&z\ne0\land w\ne0\\\tilde\infty&\top\end{cases}$$

**Holds when** $z\in\C\land w\in\C$.
**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e1a3cb` · Fungrim entry ↗](https://fungrim.org/entry/e1a3cb)

---

$$\mathrm{CarlsonRF}(0, 1, 12\sqrt{2}-16)=\frac{(2+\sqrt{2})\Gamma(1/4)^2}{16\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e30d7e` · Fungrim entry ↗](https://fungrim.org/entry/e30d7e)

---

$$\mathrm{CarlsonRF}(0, 0, 0)=\tilde\infty$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e39456` · Fungrim entry ↗](https://fungrim.org/entry/e39456)

---

$$\mathrm{CarlsonRC}(0, 1)=\frac{\pi}{2}$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e464ec` · Fungrim entry ↗](https://fungrim.org/entry/e464ec)

---

$$\mathrm{CarlsonRF}(0, x, -x)=\frac{\sqrt{2}\begin{cases}1-\imaginaryI&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\1+\imaginaryI&\top\end{cases}\Gamma(1/4)^2}{8\sqrt{\pi}\sqrt{x}}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e54e61` · Fungrim entry ↗](https://fungrim.org/entry/e54e61)

---

$$\mathrm{CarlsonRJ}(0, 1, 1, 0)=\tilde\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e60205` · Fungrim entry ↗](https://fungrim.org/entry/e60205)

---

$$\mathrm{CarlsonRG}(0, x, 1)=\frac{1}{4}(\pi\mathrm{Hypergeometric2F_1}(\frac{-1}{2}, \frac{1}{2}, 1, 1-x))$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`e98dd0` · Fungrim entry ↗](https://fungrim.org/entry/e98dd0)

---

$$\mathrm{CarlsonRJ}(1, 1, 1, 1)=1$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e9d5a9` · Fungrim entry ↗](https://fungrim.org/entry/e9d5a9)

---

$$\mathrm{CarlsonRC}(1, 2)=\frac{\pi}{4}$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`eac389` · Fungrim entry ↗](https://fungrim.org/entry/eac389)

---

$$\mathrm{CarlsonRC}(1, y+1)=\begin{cases}\frac{\arctan(y^{1/2})}{\sqrt{y}}&y\ne0\\1&y=0\end{cases}$$

**Holds when** $y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`eb1d4f` · Fungrim entry ↗](https://fungrim.org/entry/eb1d4f)

---

$$\mathrm{CarlsonRF}(x, x, y)=\mathrm{CarlsonRC}(y, x)$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`ebaa1a` · Fungrim entry ↗](https://fungrim.org/entry/ebaa1a)

---

$$\mathrm{CarlsonRD}(2, 2, 1)=3-\frac{3\pi}{4}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`eda57d` · Fungrim entry ↗](https://fungrim.org/entry/eda57d)

---

$$\mathrm{CarlsonRD}(0, 0, z)=\begin{cases}\infty\mathrm{sgn}(z^{1/2}^{-3})&z\ne0\\\tilde\infty&\top\end{cases}$$

**Holds when** $z\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`f07e9d` · Fungrim entry ↗](https://fungrim.org/entry/f07e9d)

---

$$\mathrm{CarlsonRF}(0, 1, -1)=\frac{\sqrt{2}(1-\imaginaryI)\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`f1dd8a` · Fungrim entry ↗](https://fungrim.org/entry/f1dd8a)

---

$$\mathrm{CarlsonRJ}(0, 0, 0, 1)=\tilde\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`f1fd51` · Fungrim entry ↗](https://fungrim.org/entry/f1fd51)

---

$$\mathrm{CarlsonRF}(x, y, z)=\mathrm{CarlsonRF}(x, z, y)=\mathrm{CarlsonRF}(y, x, z)=\mathrm{CarlsonRF}(y, z, x)=\mathrm{CarlsonRF}(z, x, y)=\mathrm{CarlsonRF}(z, y, x)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`f29729` · Fungrim entry ↗](https://fungrim.org/entry/f29729)

---

$$\mathrm{CarlsonRD}(1, 1, 2)=3\ln(1+\sqrt{2})-\frac{3\sqrt{2}}{2}$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`f47947` · Fungrim entry ↗](https://fungrim.org/entry/f47947)

---

$$\mathrm{CarlsonRD}(-x, -y, -z)=\imaginaryI\mathrm{CarlsonRD}(x, y, z)$$

**Holds when** $x\in\lparen0, \infty\rbrack\land y\in\lparen0, \infty\rbrack\land z\in\lparen0, \infty\rbrack$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`f68409` · Fungrim entry ↗](https://fungrim.org/entry/f68409)

---

$$\mathrm{CarlsonRG}(\mathrm{lamda}x, \mathrm{lamda}y, \mathrm{lamda}z)=\mathrm{CarlsonRG}(x, y, z)\sqrt{\mathrm{lamda}}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f9ca94` · Fungrim entry ↗](https://fungrim.org/entry/f9ca94)

---

$$\mathrm{CarlsonRJ}(0, 0, -1, 1)=-(\infty\imaginaryI)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`fd3017` · Fungrim entry ↗](https://fungrim.org/entry/fd3017)

---

$$\mathrm{CarlsonRG}(x, y, z)=\mathrm{CarlsonHypergeometricR}(\frac{1}{2}, \bigl\lbrack\frac{1}{2}, \frac{1}{2}, \frac{1}{2}\bigr\rbrack, \bigl\lbrack x, y, z\bigr\rbrack)$$

**Holds when** $x\in\C\setminus\lparen-\infty, 0\rparen\land y\in\C\setminus\lparen-\infty, 0\rparen\land z\in\C\setminus\lparen-\infty, 0\rparen$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`fda084` · Fungrim entry ↗](https://fungrim.org/entry/fda084)

---

$$\mathrm{CarlsonRC}(0, y)=\begin{cases}\frac{\pi}{2\sqrt{y}}&y\ne0\\\tilde\infty&y=0\end{cases}$$

**Holds when** $y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ff58cf` · Fungrim entry ↗](https://fungrim.org/entry/ff58cf)

---

## Chebyshev polynomials

$$x\mapsto\mathrm{ChebyshevT}(n, x)^{\doubleprime}(x)=\frac{n(n\mathrm{ChebyshevT}(n, x)-x\mathrm{ChebyshevU}(n-1, x))}{x^2-1}$$

**Holds when** $n\in\Z\land x\in\C\setminus\lbrace-1, 1\rbrace$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`05fe07` · Fungrim entry ↗](https://fungrim.org/entry/05fe07)

---

$$\mathrm{ChebyshevT}(n, x)=\frac{1}{2}(\mathrm{ChebyshevU}(n, x)-\mathrm{ChebyshevU}(n-2, x))$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`0649c9` · Fungrim entry ↗](https://fungrim.org/entry/0649c9)

---

$$\mathrm{ChebyshevT}(n, x)=\frac{1}{2}({(x-(x^2-1)^{1/2})}^{n}+{(x+\sqrt{x^2-1})}^{n})$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for expansion.
[`0cbe75` · Fungrim entry ↗](https://fungrim.org/entry/0cbe75)

---

$$x\mapsto\mathrm{ChebyshevT}(n, x)^{\prime}(x)=n\mathrm{ChebyshevU}(n-1, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`1a0d11` · Fungrim entry ↗](https://fungrim.org/entry/1a0d11)

---

$$\mathrm{ChebyshevT}(n, -1)=(-1)^{n}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`2760e7` · Fungrim entry ↗](https://fungrim.org/entry/2760e7)

---

$$\mathrm{ChebyshevU}(2n, 0)=(-1)^{n}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`2a5337` · Fungrim entry ↗](https://fungrim.org/entry/2a5337)

---

$$\mathrm{ChebyshevT}(n, x)=\cosh(n\mathrm{arcosh}(x))$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`2fc479` · Fungrim entry ↗](https://fungrim.org/entry/2fc479)

---

$$\mathrm{ChebyshevU}(n, x)=2x\mathrm{ChebyshevU}(n+1, x)-\mathrm{ChebyshevU}(n+2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`303204` · Fungrim entry ↗](https://fungrim.org/entry/303204)

---

$$x\mapsto\mathrm{ChebyshevU}(n, x)^{\prime}(x)=\frac{(n+1)\mathrm{ChebyshevT}(n+1, x)-x\mathrm{ChebyshevU}(n, x)}{x^2-1}$$

**Holds when** $n\in\Z\land x\in\C\setminus\lbrace-1, 1\rbrace$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`35e13b` · Fungrim entry ↗](https://fungrim.org/entry/35e13b)

---

$$\mathrm{ChebyshevT}(n, x)=\mathrm{Hypergeometric2F_1}(-n, n, \frac{1}{2}, \frac{1-x}{2})$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`382679` · Fungrim entry ↗](https://fungrim.org/entry/382679)

---

$$\mathrm{ChebyshevT}(2n+1, 0)=0$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`42102c` · Fungrim entry ↗](https://fungrim.org/entry/42102c)

---

$$(x^2-1)\mathrm{ChebyshevU}(n-1, x)^2+\mathrm{ChebyshevT}(n, x)^2=1$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`42eb01` · Fungrim entry ↗](https://fungrim.org/entry/42eb01)

---

$$\mathrm{ChebyshevU}(0, x)=1$$

**Holds when** $x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`48765b` · Fungrim entry ↗](https://fungrim.org/entry/48765b)

---

$$\mathrm{ChebyshevT}(2n, x)=2\mathrm{ChebyshevT}(n, x)^2-1$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`4b83c6` · Fungrim entry ↗](https://fungrim.org/entry/4b83c6)

---

$$\sin(x)\mathrm{ChebyshevU}(n, \cos(x))=\sin(nx)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`4c7aeb` · Fungrim entry ↗](https://fungrim.org/entry/4c7aeb)

---

$$\mathrm{ChebyshevT}(n, \frac{x+\frac{1}{x}}{2})=\frac{1}{2}(x^{n}+x^{-n})$$

**Holds when** $n\in\Z\land x\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for expansion.
[`5bd0ec` · Fungrim entry ↗](https://fungrim.org/entry/5bd0ec)

---

$$\mathrm{ChebyshevU}(2n, x)=\mathrm{ChebyshevU}(n-1, 2x^2-1)+\mathrm{ChebyshevT}(n, 2x^2-1)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`5f09f4` · Fungrim entry ↗](https://fungrim.org/entry/5f09f4)

---

$$\mathrm{ChebyshevU}(n-1, x)\sqrt{x^2-1}=\frac{1}{2}({(x+(x^2-1)^{1/2})}^{n}-{(x-(x^2-1)^{1/2})}^{n})$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`61375f` · Fungrim entry ↗](https://fungrim.org/entry/61375f)

---

$$x\mapsto\mathrm{ChebyshevT}(n, x)^{\prime}(x)=\frac{\mathrm{Hypergeometric3F2Regularized}(1, -n, n, \frac{1}{2}, 1-r, \frac{1-x}{2})\sqrt{\pi}}{(x-1)^{r}}$$

**Holds when** $n\in\Z\land r\in\N\land x\in\C\setminus\lbrace-1, 1\rbrace$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for expansion.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/Polynomials/ChebyshevT/20/02/01/0002/)
[`6582c4` · Fungrim entry ↗](https://fungrim.org/entry/6582c4)

---

$$\mathrm{ChebyshevT}(n, -x)=\mathrm{ChebyshevT}(n, x)\times(-1)^{n}$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`6a24ab` · Fungrim entry ↗](https://fungrim.org/entry/6a24ab)

---

$$\mathrm{ChebyshevU}(1, x)=2x$$

**Holds when** $x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`75eacb` · Fungrim entry ↗](https://fungrim.org/entry/75eacb)

---

$$\mathrm{ChebyshevU}(-n, x)=-\mathrm{ChebyshevU}(n-2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`78f5bb` · Fungrim entry ↗](https://fungrim.org/entry/78f5bb)

---

$$\mathrm{ChebyshevT}(n, x)=x\mathrm{ChebyshevT}(n-1, x)-(1-x^2)\mathrm{ChebyshevU}(n-2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`7b2c26` · Fungrim entry ↗](https://fungrim.org/entry/7b2c26)

---

$$\mathrm{ChebyshevU}(2n+1, 0)=0$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`7d111e` · Fungrim entry ↗](https://fungrim.org/entry/7d111e)

---

$$\mathrm{ChebyshevT}(m, \mathrm{ChebyshevT}(n, x))=\mathrm{ChebyshevT}(mn, x)$$

**Holds when** $m\in\Z\land n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`7e882c` · Fungrim entry ↗](https://fungrim.org/entry/7e882c)

---

$$\mathrm{ChebyshevT}(2n, x)=\mathrm{ChebyshevT}(n, 2x^2-1)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`82288c` · Fungrim entry ↗](https://fungrim.org/entry/82288c)

---

$$\mathrm{ChebyshevT}(n, x)=\mathrm{ChebyshevU}(n, x)-x\mathrm{ChebyshevU}(n-1, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`844561` · Fungrim entry ↗](https://fungrim.org/entry/844561)

---

$$\mathrm{ChebyshevU}(n, -x)=\mathrm{ChebyshevU}(n, x)\times(-1)^{n}$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`88aeb6` · Fungrim entry ↗](https://fungrim.org/entry/88aeb6)

---

$$\mathrm{ChebyshevT}(n, x)=2x\mathrm{ChebyshevT}(n+1, x)-\mathrm{ChebyshevT}(n+2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`8a785a` · Fungrim entry ↗](https://fungrim.org/entry/8a785a)

---

$$\mathrm{ChebyshevU}(-1, x)=0$$

**Holds when** $x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`9001e6` · Fungrim entry ↗](https://fungrim.org/entry/9001e6)

---

$$\mathrm{ChebyshevT}(-n, x)=\mathrm{ChebyshevT}(n, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`9093a3` · Fungrim entry ↗](https://fungrim.org/entry/9093a3)

---

$$\mathrm{ChebyshevT}(2n+1, \sin(x))=\sin(x(2n+1))\times(-1)^{n}$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`9789ee` · Fungrim entry ↗](https://fungrim.org/entry/9789ee)

---

$$\mathrm{ChebyshevT}(2n, 0)=(-1)^{n}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`a46d91` · Fungrim entry ↗](https://fungrim.org/entry/a46d91)

---

$$x\mapsto\mathrm{ChebyshevT}(n, x)^{\prime}(1)=\frac{\mathrm{RisingFactorial}(n, r)\mathrm{RisingFactorial}(n-r+1, r)}{(2r-1)!!}$$

**Holds when** $n\in\Z\land r\in\N$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`a68f0e` · Fungrim entry ↗](https://fungrim.org/entry/a68f0e)

---

$$x\mapsto\mathrm{ChebyshevU}(n, x)^{\prime}(1)=\frac{\mathrm{RisingFactorial}(n+1, r+1)\mathrm{RisingFactorial}(n-r+1, r)}{(2r+1)!!}$$

**Holds when** $n\in\Z\land r\in\N$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`b6b014` · Fungrim entry ↗](https://fungrim.org/entry/b6b014)

---

$$\mathrm{ChebyshevU}(n-1, x)\sqrt{1-x^2}=\sin(n\arccos(x))$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`b8fdcd` · Fungrim entry ↗](https://fungrim.org/entry/b8fdcd)

---

$$\mathrm{ChebyshevT}(1, x)=x$$

**Holds when** $x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`be5652` · Fungrim entry ↗](https://fungrim.org/entry/be5652)

---

$$\mathrm{ChebyshevU}(n, -1)=(n+1)\times(-1)^{n}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for expansion.
[`be9a45` · Fungrim entry ↗](https://fungrim.org/entry/be9a45)

---

$$\mathrm{ChebyshevT}(0, x)=1$$

**Holds when** $x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`c76e72` · Fungrim entry ↗](https://fungrim.org/entry/c76e72)

---

$$\mathrm{ChebyshevU}(n, x)=x\mathrm{ChebyshevU}(n-1, x)+\mathrm{ChebyshevT}(n, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`ce5e03` · Fungrim entry ↗](https://fungrim.org/entry/ce5e03)

---

$$\mathrm{ChebyshevU}(n, x)=(n+1)\mathrm{Hypergeometric2F_1}(-n, n+2, \frac{3}{2}, \frac{1-x}{2})$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`ce9a39` · Fungrim entry ↗](https://fungrim.org/entry/ce9a39)

---

$$\mathrm{ChebyshevU}(n, x)=2x\mathrm{ChebyshevU}(n-1, x)-\mathrm{ChebyshevU}(n-2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`d1ef91` · Fungrim entry ↗](https://fungrim.org/entry/d1ef91)

---

$$\mathrm{ChebyshevT}(2n+1, x)=2\mathrm{ChebyshevT}(n, x)\mathrm{ChebyshevT}(n+1, x)-x$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`de0968` · Fungrim entry ↗](https://fungrim.org/entry/de0968)

---

$$\mathrm{ChebyshevU}(n, 1)=n+1$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`e03fa4` · Fungrim entry ↗](https://fungrim.org/entry/e03fa4)

---

$$x\mapsto\mathrm{ChebyshevU}(n, x)^{\prime}(x)=\frac{(n+1)\mathrm{Hypergeometric3F2Regularized}(1, -n, n+2, \frac{3}{2}, 1-r, \frac{1-x}{2})\sqrt{\pi}}{2(x-1)^{r}}$$

**Holds when** $n\in\Z\land r\in\N\land x\in\C\setminus\lbrace-1, 1\rbrace$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/Polynomials/ChebyshevU/20/02/01/0002/)
[`e1797b` · Fungrim entry ↗](https://fungrim.org/entry/e1797b)

---

$$\mathrm{ChebyshevT}(m, x)\mathrm{ChebyshevT}(n, x)=\frac{1}{2}(\mathrm{ChebyshevT}(m+n, x)+\mathrm{ChebyshevT}(\vert m-n\vert, x))$$

**Holds when** $m\in\Z\land n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`ed5222` · Fungrim entry ↗](https://fungrim.org/entry/ed5222)

---

$$\mathrm{ChebyshevT}(n, \cos(x))=\cos(nx)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`f4b3fa` · Fungrim entry ↗](https://fungrim.org/entry/f4b3fa)

---

$$\mathrm{ChebyshevT}(n, x)=2x\mathrm{ChebyshevT}(n-1, x)-\mathrm{ChebyshevT}(n-2, x)$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`faeed9` · Fungrim entry ↗](https://fungrim.org/entry/faeed9)

---

$$\mathrm{ChebyshevT}(n, 1)=1$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`fc5d42` · Fungrim entry ↗](https://fungrim.org/entry/fc5d42)

---

$$\mathrm{ChebyshevT}(n, x)=\cos(n\arccos(x))$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`fda800` · Fungrim entry ↗](https://fungrim.org/entry/fda800)

---

$$\mathrm{ChebyshevT}(n, x)+\mathrm{ChebyshevU}(n-1, x)\sqrt{x^2-1}={(x+\sqrt{x^2-1})}^{n}$$

**Holds when** $n\in\Z\land x\in\C$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind; **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`fdf80d` · Fungrim entry ↗](https://fungrim.org/entry/fdf80d)

---

## Complex parts

$$\arg(-\imaginaryI)=-(\frac{\pi}{2})$$

Used by the Compute Engine for simplification.
[`089f85` · Fungrim entry ↗](https://fungrim.org/entry/089f85)

---

$$\mathrm{sgn}(x)=\begin{cases}1&0\lt x\\-1&x\lt0\\0&x=0\end{cases}$$

**Holds when** $x\in\R$.
Used by the Compute Engine for simplification.
[`18d335` · Fungrim entry ↗](https://fungrim.org/entry/18d335)

---

$$\mathrm{sgn}(z)=\frac{z}{\vert z\vert}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`26565c` · Fungrim entry ↗](https://fungrim.org/entry/26565c)

---

$$\Re(z)=\frac{z+z^\star}{2}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`3866dc` · Fungrim entry ↗](https://fungrim.org/entry/3866dc)

---

$$\vert x+\imaginaryI y\vert=\sqrt{x^2+y^2}$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`4f0049` · Fungrim entry ↗](https://fungrim.org/entry/4f0049)

---

$$\mathrm{sgn}(z)=\exp(\imaginaryI\arg(z))$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`54340e` · Fungrim entry ↗](https://fungrim.org/entry/54340e)

---

$$\mathrm{Csgn}(z)=\begin{cases}\mathrm{sgn}(\Im(z))&\Re(z)=0\\\mathrm{sgn}(\Re(z))&\top\end{cases}$$

**Holds when** $z\in\C$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`59a5d6` · Fungrim entry ↗](https://fungrim.org/entry/59a5d6)

---

$$\arg(z)=-(\imaginaryI\ln(\mathrm{sgn}(z)))$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`60772e` · Fungrim entry ↗](https://fungrim.org/entry/60772e)

---

$$\vert z^\star\vert=\vert z\vert$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`6a894d` · Fungrim entry ↗](https://fungrim.org/entry/6a894d)

---

$$\arg(\imaginaryI)=\frac{\pi}{2}$$

Used by the Compute Engine for simplification.
[`735409` · Fungrim entry ↗](https://fungrim.org/entry/735409)

---

$$\arg(cz)=\arg(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace\land c\in\lparen0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`8cac46` · Fungrim entry ↗](https://fungrim.org/entry/8cac46)

---

$$\Re(x+\imaginaryI y)=x$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`8e6867` · Fungrim entry ↗](https://fungrim.org/entry/8e6867)

---

$$\vert ab\vert=\vert a\vert\vert b\vert$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`98efc1` · Fungrim entry ↗](https://fungrim.org/entry/98efc1)

---

$$\arg(-1)=\pi$$

Used by the Compute Engine for simplification.
[`a8b41c` · Fungrim entry ↗](https://fungrim.org/entry/a8b41c)

---

$$(x+\imaginaryI y)^\star=x-\imaginaryI y$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`acda23` · Fungrim entry ↗](https://fungrim.org/entry/acda23)

---

$$\arg(x+\imaginaryI y)=\mathrm{Arctan_2}(y, x)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`b2a880` · Fungrim entry ↗](https://fungrim.org/entry/b2a880)

---

$$\Im(x+\imaginaryI y)=y$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`ba6d81` · Fungrim entry ↗](https://fungrim.org/entry/ba6d81)

---

$$zz^\star=\vert z\vert^2$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`bcd22f` · Fungrim entry ↗](https://fungrim.org/entry/bcd22f)

---

$$\arg(1)=0$$

Used by the Compute Engine for simplification.
[`c423d2` · Fungrim entry ↗](https://fungrim.org/entry/c423d2)

---

$$\mathrm{Csgn}(z)=\frac{\sqrt{z^2}}{z}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`e9465d` · Fungrim entry ↗](https://fungrim.org/entry/e9465d)

---

$$\Im(z)=\frac{z-z^\star}{2\imaginaryI}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f1a29b` · Fungrim entry ↗](https://fungrim.org/entry/f1a29b)

---

## Complex plane

$$\mathrm{BernsteinEllipse}(\rho)=\lbrace\frac{1}{2}(\rho\exp(\imaginaryI\theta)+\frac{\exp(-(\imaginaryI\theta))}{\rho}), \theta\in\lbrack0, 2\pi\rparen\rbrace$$

**Holds when** $1\lt\rho\land\rho\in\R$.
Used by the Compute Engine for simplification.
[`40baa9` · Fungrim entry ↗](https://fungrim.org/entry/40baa9)

---

$$\mathrm{OpenDisk}(z, r)=\lbrace t, t\in\C\in\vert z-t\vert\lt r\rbrace$$

**Holds when** $0\lt r\land z\in\C\land r\in\R$.
Used by the Compute Engine for simplification.
[`c98bad` · Fungrim entry ↗](https://fungrim.org/entry/c98bad)

---

$$\mathrm{ClosedDisk}(z, r)=\lbrace t, t\in\C\in\vert z-t\vert\le r\rbrace$$

**Holds when** $0\le r\land z\in\C\land r\in\R$.
Used by the Compute Engine for simplification.
[`d1cf0c` · Fungrim entry ↗](https://fungrim.org/entry/d1cf0c)

---

## Confluent hypergeometric functions

$$\mathrm{Hypergeometric0F1Regularized}(a, z)=\operatorname{I}_{a-1}(2\sqrt{z})z^{\frac{1-a}{2}}$$

**Holds when** $z\ne0\land a\in\C\land z\in\C$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`00dfd1` · Fungrim entry ↗](https://fungrim.org/entry/00dfd1)

---

$$\mathrm{Hypergeometric0F_1}(a, z)=\mathrm{Hypergeometric1F_1}(a-\frac{1}{2}, 2a-1, 4\sqrt{z})\exp(-(2\sqrt{z}))$$

**Holds when** $2a\notin-\infty..1\land a\in\C\land z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function; **Hypergeometric1F1** — Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`2df3e3` · Fungrim entry ↗](https://fungrim.org/entry/2df3e3)

---

$$\mathrm{Hypergeometric0F1Regularized}(a, z)=\operatorname{J}_{a-1}(2\sqrt{-z})(-z)^{\frac{1-a}{2}}$$

**Holds when** $z\ne0\land a\in\C\land z\in\C$.
**Symbols:** **Hypergeometric0F1Regularized** — Regularized confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`325a0e` · Fungrim entry ↗](https://fungrim.org/entry/325a0e)

---

$$\mathrm{HypergeometricUStar}(a, b, z)=\mathrm{Hypergeometric2F_0}(a, a-b+1, -(\frac{1}{z}))$$

**Holds when** $z\ne0\land a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F0** — Tricomi confluent hypergeometric function, alternative notation; **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`4cf1e9` · Fungrim entry ↗](https://fungrim.org/entry/4cf1e9)

---

$$\mathrm{HypergeometricU}(a, b, z)=\frac{1}{\Gamma(a)}(\Gamma(b-1)\mathrm{Hypergeometric1F_1}(a-b+1, 2-b, z)z^{1-b})+\frac{\Gamma(1-b)\mathrm{Hypergeometric1F_1}(a, b, z)}{\Gamma(a-b+1)}$$

**Holds when** $z\ne0\land b\notin\Z\land a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **Hypergeometric1F1** — Kummer confluent hypergeometric function; **HypergeometricU** — Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`6cf802` · Fungrim entry ↗](https://fungrim.org/entry/6cf802)

---

$$\mathrm{HypergeometricU}(a, b, z)=\mathrm{HypergeometricU}(a-b+1, 2-b, z)z^{1-b}$$

**Holds when** $z\ne0\land a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **HypergeometricU** — Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`9d3147` · Fungrim entry ↗](https://fungrim.org/entry/9d3147)

---

$$\mathrm{Hypergeometric1F1Regularized}(a, b, z)=\mathrm{Hypergeometric1F1Regularized}(b-a, b, -z)\exponentialE^{z}$$

**Holds when** $a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **Hypergeometric1F1Regularized** — Regularized Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`a047eb` · Fungrim entry ↗](https://fungrim.org/entry/a047eb)

---

$$\mathrm{Hypergeometric1F_1}(a, b, z)=\mathrm{Hypergeometric1F_1}(b-a, b, -z)\exponentialE^{z}$$

**Holds when** $a\in\C\land z\in\C\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **Hypergeometric1F1** — Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`be533c` · Fungrim entry ↗](https://fungrim.org/entry/be533c)

---

$$\mathrm{HypergeometricUStar}(a, b, z)=\mathrm{HypergeometricU}(a, b, z)z^{a}$$

**Holds when** $z\ne0\land a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **HypergeometricU** — Tricomi confluent hypergeometric function; **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`c8fcc7` · Fungrim entry ↗](https://fungrim.org/entry/c8fcc7)

---

$$\mathrm{HypergeometricUStar}(a, b, z)=\sum_{k=0}^{n-1}\frac{\mathrm{RisingFactorial}(a, k)\mathrm{RisingFactorial}(a-b+1, k)}{k!(-z)^{k}}+\mathrm{HypergeometricUStarRemainder}(n, a, b, z)$$

**Holds when** $z\ne0\land a\in\C\land b\in\C\land z\in\C\land n\in\N$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function; **HypergeometricUStarRemainder** — Error term in asymptotic expansion of Tricomi confluent hypergeometric function; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`d1b3b5` · Fungrim entry ↗](https://fungrim.org/entry/d1b3b5)

---

$$\mathrm{Hypergeometric1F1Regularized}(a, b, z)=\frac{\frac{\mathrm{HypergeometricUStar}(a, b, z)}{(-z)^{a}}}{\Gamma(b-a)}+\frac{1}{\Gamma(a)}(\mathrm{HypergeometricUStar}(b-a, b, -z)\exponentialE^{z}z^{a-b})$$

**Holds when** $z\ne0\land a\in\C\land b\in\C\land z\in\C$.
**Symbols:** **Hypergeometric1F1Regularized** — Regularized Kummer confluent hypergeometric function; **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`f7f84e` · Fungrim entry ↗](https://fungrim.org/entry/f7f84e)

---

## Coulomb wave functions

$$\mathrm{CoulombF}(\ell, \eta, z)=\frac{\mathrm{CoulombH}(1, \ell, \eta, z)-\mathrm{CoulombH}(-1, \ell, \eta, z)}{2\imaginaryI}$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CoulombF** — Regular Coulomb wave function; **CoulombH** — Outgoing and ingoing Coulomb wave function.
Used by the Compute Engine for simplification.
[`192a3e` · Fungrim entry ↗](https://fungrim.org/entry/192a3e)

---

$$\mathrm{CoulombF}(\ell, \eta, z)=(\frac{\mathrm{HypergeometricUStar}(\ell-\imaginaryI\eta+1, 2\ell+2, 2\imaginaryI z)\exp(-(\imaginaryI z))}{\Gamma(\ell+\imaginaryI\eta+1)(-(2\imaginaryI z))^{\ell-\imaginaryI\eta+1}}+\frac{\mathrm{HypergeometricUStar}(\ell+\imaginaryI\eta+1, 2\ell+2, -(2\imaginaryI z))\exp(\imaginaryI z)}{\Gamma(\ell-\imaginaryI\eta+1)(2\imaginaryI z)^{\ell+\imaginaryI\eta+1}})\times2^{\ell}\exp(\frac{1}{2}(-(\pi\eta)+\mathrm{GammaLn}(\ell+\imaginaryI\eta+1)+\mathrm{GammaLn}(\ell-\imaginaryI\eta+1)))z^{\ell+1}$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CoulombF** — Regular Coulomb wave function; **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`1976e1` · Fungrim entry ↗](https://fungrim.org/entry/1976e1)

---

$$z\mapsto\mathrm{CoulombG}(\ell, \eta, z)^{\prime}(z)=(\frac{\eta}{\ell+1}+\frac{\ell+1}{z})\mathrm{CoulombG}(\ell, \eta, z)-\frac{\mathrm{CoulombG}(\ell+1, \eta, z)\sqrt{\ell+\imaginaryI\eta+1}\sqrt{\ell-\imaginaryI\eta+1}}{\ell+1}$$

**Holds when** $\ell\ne-1\land\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CoulombG** — Irregular Coulomb wave function.
Used by the Compute Engine for simplification.
[`2fec14` · Fungrim entry ↗](https://fungrim.org/entry/2fec14)

---

$$\mathrm{CoulombC}(\ell, \eta)=\frac{2^{\ell}\exp(\frac{1}{2}(-(\pi\eta)+\mathrm{GammaLn}(\ell+\imaginaryI\eta+1)+\mathrm{GammaLn}(\ell-\imaginaryI\eta+1)))}{\Gamma(2\ell+2)}$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C$.
**Symbols:** **CoulombC** — Coulomb wave function Gamow factor.
Used by the Compute Engine for simplification.
[`4a4739` · Fungrim entry ↗](https://fungrim.org/entry/4a4739)

---

$$\mathrm{CoulombG}(\ell, \eta, z)z\mapsto\mathrm{CoulombF}(\ell, \eta, z)^{\prime}(z)-\mathrm{CoulombF}(\ell, \eta, z)z\mapsto\mathrm{CoulombG}(\ell, \eta, z)^{\prime}(z)=1$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CoulombF** — Regular Coulomb wave function; **CoulombG** — Irregular Coulomb wave function.
Used by the Compute Engine for simplification.
[`74274a` · Fungrim entry ↗](https://fungrim.org/entry/74274a)

---

$$\mathrm{CoulombG}(\ell, \eta, z)=\frac{1}{2}(\mathrm{CoulombH}(1, \ell, \eta, z)+\mathrm{CoulombH}(-1, \ell, \eta, z))$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CoulombG** — Irregular Coulomb wave function; **CoulombH** — Outgoing and ingoing Coulomb wave function.
Used by the Compute Engine for simplification.
[`8547ab` · Fungrim entry ↗](https://fungrim.org/entry/8547ab)

---

$$z\mapsto\mathrm{CoulombF}(\ell, \eta, z)^{\prime}(z)=(\frac{\eta}{\ell+1}+\frac{\ell+1}{z})\mathrm{CoulombF}(\ell, \eta, z)-\frac{\mathrm{CoulombF}(\ell+1, \eta, z)\sqrt{\ell+\imaginaryI\eta+1}\sqrt{\ell-\imaginaryI\eta+1}}{\ell+1}$$

**Holds when** $\ell\ne-1\land\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CoulombF** — Regular Coulomb wave function.
Used by the Compute Engine for simplification.
[`a51a4b` · Fungrim entry ↗](https://fungrim.org/entry/a51a4b)

---

$$\mathrm{CoulombG}(\ell, \eta, z)=\frac{\cos(-(\pi(\ell+1/2))-\mathrm{CoulombSigma}((-1)-\ell, \eta)+\mathrm{CoulombSigma}(\ell, \eta))\mathrm{CoulombF}(\ell, \eta, z)-\mathrm{CoulombF}((-1)-\ell, \eta, z)}{\sin(-(\pi(\ell+1/2))-\mathrm{CoulombSigma}((-1)-\ell, \eta)+\mathrm{CoulombSigma}(\ell, \eta))}$$

**Holds when** $2\ell\notin\Z\land\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\imaginaryI\eta-\ell\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land-\ell-\imaginaryI\eta\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CoulombF** — Regular Coulomb wave function; **CoulombG** — Irregular Coulomb wave function; **CoulombSigma** — Coulomb wave function phase shift.
Used by the Compute Engine for simplification.
[`e20938` · Fungrim entry ↗](https://fungrim.org/entry/e20938)

---

$$\mathrm{CoulombG}(\ell, \eta, z)=\frac{1}{2}(\frac{\mathrm{HypergeometricUStar}(\ell+\imaginaryI\eta+1, 2\ell+2, -(2\imaginaryI z))\exp(\imaginaryI((-\pi\ell)/2+z+\mathrm{CoulombSigma}(\ell, \eta)))}{(2z)^{\imaginaryI\eta}}+\mathrm{HypergeometricUStar}(\ell-\imaginaryI\eta+1, 2\ell+2, 2\imaginaryI z)\exp(-(\imaginaryI((-\pi\ell)/2+z+\mathrm{CoulombSigma}(\ell, \eta))))(2z)^{\imaginaryI\eta})$$

**Holds when** $0\lt\Re(z)\land\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **CoulombG** — Irregular Coulomb wave function; **CoulombSigma** — Coulomb wave function phase shift; **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`e2efbf` · Fungrim entry ↗](https://fungrim.org/entry/e2efbf)

---

$$\mathrm{CoulombSigma}(\ell, \eta)=\frac{\mathrm{GammaLn}(\ell+\imaginaryI\eta+1)-\mathrm{GammaLn}(\ell-\imaginaryI\eta+1)}{2\imaginaryI}$$

**Holds when** $\ell+\imaginaryI\eta+1\notin\Z_{\le0}\land\ell-\imaginaryI\eta+1\notin\Z_{\le0}\land\ell\in\C\land\eta\in\C$.
**Symbols:** **CoulombSigma** — Coulomb wave function phase shift.
Used by the Compute Engine for simplification.
[`ed2bf6` · Fungrim entry ↗](https://fungrim.org/entry/ed2bf6)

---

## Dedekind eta function

$$36\tau\mapsto\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)/\mathrm{DedekindEta}(\tau)^{\prime}(\tau)^2+\tau\mapsto\frac{1}{\mathrm{DedekindEta}(\tau)}(\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau))^{\tripleprime}(\tau)-\frac{1}{\mathrm{DedekindEta}(\tau)}(24\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)\tau\mapsto\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)/\mathrm{DedekindEta}(\tau)^{\doubleprime}(\tau))=0$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/EllipticFunctions/DedekindEta/13/01/0002/)
[`02d14f` · Fungrim entry ↗](https://fungrim.org/entry/02d14f)

---

$$\mathrm{DedekindEta}(16\imaginaryI)=\frac{\mathrm{DedekindEta}(\imaginaryI)\times2^{\frac{-113}{64}}\sqrt[4]{2^{1/4}-1}\sqrt{(1+2^{1/2})^{1/2}-2^{5/8}}}{\sqrt[16]{1+\sqrt{2}}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`0701dc` · Fungrim entry ↗](https://fungrim.org/entry/0701dc)

---

$$\mathrm{DedekindEta}(\tau+1)=\mathrm{DedekindEta}(\tau)\exp(\frac{\imaginaryI\pi}{12})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`1bae52` · Fungrim entry ↗](https://fungrim.org/entry/1bae52)

---

$$\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)=\frac{\imaginaryI\mathrm{DedekindEta}(\tau)\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)}{2\pi}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`1c25d3` · Fungrim entry ↗](https://fungrim.org/entry/1c25d3)

---

$$\mathrm{DedekindEta}(\exp(\frac{2\imaginaryI\pi}{3}))=\frac{\sqrt[8]{3}\exp(-((\imaginaryI\pi)/24))\sqrt{\Gamma(1/3)}^{3}}{2\pi}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`204acd` · Fungrim entry ↗](https://fungrim.org/entry/204acd)

---

$$\mathrm{DedekindEta}(4\imaginaryI)=(\mathrm{DedekindEta}(\imaginaryI))(2^{\frac{13}{16}}\sqrt[4]{1+\sqrt{2}})^{-1}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`3a56d8` · Fungrim entry ↗](https://fungrim.org/entry/3a56d8)

---

$$\mathrm{DedekindEta}(-(\frac{1}{\tau}))=\mathrm{DedekindEta}(\tau)\sqrt{-(\imaginaryI\tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`3b806f` · Fungrim entry ↗](https://fungrim.org/entry/3b806f)

---

$$\mathrm{DedekindEta}(6\imaginaryI)=\mathrm{DedekindEta}(\imaginaryI)\times6^{\frac{-3}{8}}\sqrt[6]{\frac{5-3^{1/2}}{2}-\frac{1}{2}(\sqrt{2}\times3^{3/4})}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`62ffb3` · Fungrim entry ↗](https://fungrim.org/entry/62ffb3)

---

$$\mathrm{DedekindEta}(\tau)=\mathrm{JacobiTheta}(3, \frac{\tau+1}{2}, 3\tau)\exp(\frac{\imaginaryI\pi\tau}{12})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`737805` · Fungrim entry ↗](https://fungrim.org/entry/737805)

---

$$\mathrm{DedekindEta}(7\imaginaryI)=\frac{1}{7}(\sqrt{7}\mathrm{DedekindEta}(\imaginaryI)\sqrt[4]{\frac{-7}{2}+\sqrt{7}+\frac{1}{2}((4\times7^{1/2}-7)^{1/2})})$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`7cc3d3` · Fungrim entry ↗](https://fungrim.org/entry/7cc3d3)

---

$$\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)=\frac{1}{12}(\imaginaryI\pi\mathrm{DedekindEta}(\tau)\mathrm{EisensteinE}(2, \tau))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`871996` · Fungrim entry ↗](https://fungrim.org/entry/871996)

---

$$\mathrm{DedekindEta}(2\imaginaryI)=\frac{\mathrm{DedekindEta}(\imaginaryI)}{2^{\frac{3}{8}}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`87e9ed` · Fungrim entry ↗](https://fungrim.org/entry/87e9ed)

---

$$\mathrm{DedekindEtaEpsilon}(a, b, c, d)=\exp(\imaginaryI\pi(\frac{a+d}{12c}-\mathrm{DedekindSum}(d, c)-\frac{1}{4}))$$

**Holds when** $0\lt c\land ad-bc=1\land a\in\Z\land b\in\Z\land c\in\Z\land d\in\Z$.
**Symbols:** **DedekindEtaEpsilon** — Root of unity in the functional equation of the Dedekind eta function; **DedekindSum** — Dedekind sum.
Used by the Compute Engine for expansion.
[`921ef0` · Fungrim entry ↗](https://fungrim.org/entry/921ef0)

---

$$\mathrm{DedekindEta}(\imaginaryI)=\frac{\Gamma(\frac{1}{4})}{2\pi^{\frac{3}{4}}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`9b8c9f` · Fungrim entry ↗](https://fungrim.org/entry/9b8c9f)

---

$$\mathrm{DedekindEta}(3\imaginaryI)=(\mathrm{DedekindEta}(\imaginaryI))(3^{\frac{3}{8}}\sqrt[12]{2+\sqrt{3}})^{-1}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`9ce413` · Fungrim entry ↗](https://fungrim.org/entry/9ce413)

---

$$\mathrm{DedekindEta}(\tau+\frac{1}{2})=\frac{\exp(\frac{\imaginaryI\pi}{24})\mathrm{DedekindEta}(2\tau)^3}{\mathrm{DedekindEta}(\tau)\mathrm{DedekindEta}(4\tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`a1a3d4` · Fungrim entry ↗](https://fungrim.org/entry/a1a3d4)

---

$$\mathrm{DedekindEta}(\tau+24)=\mathrm{DedekindEta}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
[`acee1a` · Fungrim entry ↗](https://fungrim.org/entry/acee1a)

---

$$\mathrm{DedekindEta}(8\imaginaryI)=\frac{\mathrm{DedekindEta}(\imaginaryI)\times2^{\frac{-41}{32}}\sqrt{2^{1/4}-1}}{\sqrt[8]{1+\sqrt{2}}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`be2f32` · Fungrim entry ↗](https://fungrim.org/entry/be2f32)

---

$$\mathrm{DedekindEta}(5\imaginaryI)=\frac{\sqrt{5}\mathrm{DedekindEta}(\imaginaryI)}{5\sqrt{\varphi}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`d2900f` · Fungrim entry ↗](https://fungrim.org/entry/d2900f)

---

$$-18{\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)}^4-28\tau\mapsto\mathrm{DedekindEta}(\tau)^{\tripleprime}(\tau)\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)\mathrm{DedekindEta}(\tau)^2+12\mathrm{DedekindEta}(\tau)\tau\mapsto\mathrm{DedekindEta}(\tau)^{\doubleprime}(\tau)\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)^2+(33\tau\mapsto\mathrm{DedekindEta}(\tau)^{\doubleprime}(\tau)^2+\mathrm{DedekindEta}(\tau)\tau\mapsto\mathrm{DedekindEta}(\tau)^{(4)}(\tau))\mathrm{DedekindEta}(\tau)^2=0$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/EllipticFunctions/DedekindEta/13/01/0001/)
[`df5f38` · Fungrim entry ↗](https://fungrim.org/entry/df5f38)

---

$$\mathrm{DedekindEta}(\sqrt{3}\imaginaryI)=\frac{\sqrt[8]{3}\sqrt{\Gamma(1/3)}^{3}}{\pi\times2^{\frac{4}{3}}}$$

**Symbols:** **DedekindEta** — Dedekind eta function.
Used by the Compute Engine for simplification.
**Reference:** [math.stackexchange.com](https://math.stackexchange.com/questions/1334684/what-is-the-exact-value-of-eta6i/1334940)
[`e3e4c5` · Fungrim entry ↗](https://fungrim.org/entry/e3e4c5)

---

$$\mathrm{DedekindEtaEpsilon}(1, b, 0, 1)=\exp(\frac{\imaginaryI\pi b}{12})$$

**Symbols:** **DedekindEtaEpsilon** — Root of unity in the functional equation of the Dedekind eta function.
Used by the Compute Engine for simplification.
[`f04e01` · Fungrim entry ↗](https://fungrim.org/entry/f04e01)

---

$$\mathrm{DedekindEta}(\tau)=\mathrm{EulerQSeries}(\exp(2\imaginaryI\pi\tau))\exp(\frac{\imaginaryI\pi\tau}{12})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EulerQSeries** — Euler's q-series.
Used by the Compute Engine for simplification.
[`ff587a` · Fungrim entry ↗](https://fungrim.org/entry/ff587a)

---

## Digamma function

$$\mathrm{Digamma}(n)=\mathrm{HarmonicNumber}(n-1)-\gamma$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`00c02a` · Fungrim entry ↗](https://fungrim.org/entry/00c02a)

---

$$\Im(\mathrm{Digamma}(\imaginaryI y))=\frac{1}{2}(\pi\coth(\pi y))+\frac{1}{2y}$$

**Holds when** $y\ne0\land y\in\R$.
Used by the Compute Engine for simplification.
[`03e2a6` · Fungrim entry ↗](https://fungrim.org/entry/03e2a6)

---

$$\mathrm{Digamma}(z+1)=\frac{1}{z}+\mathrm{Digamma}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
Used by the Compute Engine for simplification.
[`11dfd2` · Fungrim entry ↗](https://fungrim.org/entry/11dfd2)

---

$$\mathrm{Digamma}(\frac{1}{6})=-2\ln(2)-\frac{3\ln(3)}{2}-\gamma-\frac{\pi\sqrt{3}}{2}$$

Used by the Compute Engine for simplification.
[`177de7` · Fungrim entry ↗](https://fungrim.org/entry/177de7)

---

$$\Im(\mathrm{Digamma}(\imaginaryI y+1))=\frac{1}{2}(\pi\coth(\pi y))-\frac{1}{2y}$$

**Holds when** $y\ne0\land y\in\R$.
Used by the Compute Engine for simplification.
[`22a9cd` · Fungrim entry ↗](https://fungrim.org/entry/22a9cd)

---

$$\mathrm{DigammaFunctionZero}(n)=\mathrm{UniqueZero}(x\mapsto\mathrm{Digamma}(x), \begin{cases}\lparen0, \infty\rparen&n=0\\\lparen-n, 1-n\rparen&n\lt0\end{cases})$$

**Holds when** $n\in\N$.
**Symbols:** **DigammaFunctionZero** — Zero of the digamma function; **UniqueZero** — Unique zero (root) of function.
Used by the Compute Engine for simplification.
[`233814` · Fungrim entry ↗](https://fungrim.org/entry/233814)

---

$$\mathrm{Digamma}(\mathrm{DigammaFunctionZero}(n))=0$$

**Holds when** $n\in\N$.
**Symbols:** **DigammaFunctionZero** — Zero of the digamma function.
Used by the Compute Engine for simplification.
[`3f15eb` · Fungrim entry ↗](https://fungrim.org/entry/3f15eb)

---

$$\mathrm{Digamma}(\frac{p}{q})=-\ln(2q)+2(\sum_{k=1}^{\lfloor\frac{q-1}{2}\rfloor}\cos(\frac{2\pi kp}{q})\ln(\sin((\pi k)/q)))-\frac{1}{2}(\pi\cot(\frac{\pi p}{q}))-\gamma$$

**Holds when** $q\in2..\infty\land p\in1..q-1$.
Used by the Compute Engine for simplification.
[`3fe553` · Fungrim entry ↗](https://fungrim.org/entry/3fe553)

---

$$\mathrm{Digamma}(-n)=\tilde\infty$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`42c1f5` · Fungrim entry ↗](https://fungrim.org/entry/42c1f5)

---

$$\mathrm{Digamma}(\frac{2}{3})=\frac{-3\ln(3)}{2}+\frac{\pi\sqrt{3}}{6}-\gamma$$

Used by the Compute Engine for simplification.
[`45a969` · Fungrim entry ↗](https://fungrim.org/entry/45a969)

---

$$\mathrm{Digamma}(z)=z\mapsto\mathrm{GammaLn}(z)^{\prime}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
Used by the Compute Engine for simplification.
[`4b6ccb` · Fungrim entry ↗](https://fungrim.org/entry/4b6ccb)

---

$$\mathrm{Digamma}(z)=-\int_{0}^{\infty}\!(\frac{-1}{t}+\frac{1}{\exponentialE^{t}-1}+\frac{1}{2})\exp(-(tz))\, \mathrm{d}t-\frac{1}{2z}+\ln(z)$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
[`4f5575` · Fungrim entry ↗](https://fungrim.org/entry/4f5575)

---

$$\mathrm{Digamma}(z-n)=\mathrm{Digamma}(z)-(\sum_{k=1}^{n}\frac{1}{z-k})$$

**Holds when** $z-n\notin\Z_{\le0}\land z\in\C\land n\in\N$.
Used by the Compute Engine for simplification.
[`554ac2` · Fungrim entry ↗](https://fungrim.org/entry/554ac2)

---

$$\mathrm{Digamma}(z)=(\sum_{n=0}^{\infty}\frac{1}{n+1}-\frac{1}{n+z})-\gamma$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
Used by the Compute Engine for simplification.
[`686524` · Fungrim entry ↗](https://fungrim.org/entry/686524)

---

$$\Im(\mathrm{Digamma}(\imaginaryI y+\frac{1}{2}))=\frac{1}{2}(\pi\tanh(\pi y))$$

**Holds when** $y\ne0\land y\in\R$.
Used by the Compute Engine for simplification.
[`6f3fec` · Fungrim entry ↗](https://fungrim.org/entry/6f3fec)

---

$$\mathrm{Digamma}(3)=\frac{3}{2}-\gamma$$

Used by the Compute Engine for simplification.
[`75f9bf` · Fungrim entry ↗](https://fungrim.org/entry/75f9bf)

---

$$\mathrm{Digamma}(\frac{1}{4})=-3\ln(2)-\gamma-\frac{\pi}{2}$$

Used by the Compute Engine for simplification.
[`7ec4f0` · Fungrim entry ↗](https://fungrim.org/entry/7ec4f0)

---

$$\mathrm{Digamma}(z)=\frac{1}{\Gamma(z)}(z\mapsto\Gamma(z)^{\prime}(z))$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
Used by the Compute Engine for simplification.
[`8415c7` · Fungrim entry ↗](https://fungrim.org/entry/8415c7)

---

$$\mathrm{Digamma}(\frac{1}{2})=-\gamma-2\ln(2)$$

Used by the Compute Engine for simplification.
[`89bed3` · Fungrim entry ↗](https://fungrim.org/entry/89bed3)

---

$$\mathrm{Digamma}(\frac{1}{8})=-4\ln(2)-\frac{1}{2}(\sqrt{2}(\ln(2+2^{1/2})-\ln(2-2^{1/2})))-\gamma-\frac{1}{2}(\pi(1+\sqrt{2}))$$

Used by the Compute Engine for simplification.
[`8c368f` · Fungrim entry ↗](https://fungrim.org/entry/8c368f)

---

$$\mathrm{Digamma}(\frac{5}{6})=-2\ln(2)-\frac{3\ln(3)}{2}+\frac{\pi\sqrt{3}}{2}-\gamma$$

Used by the Compute Engine for simplification.
[`967bbb` · Fungrim entry ↗](https://fungrim.org/entry/967bbb)

---

$$\mathrm{Digamma}(\frac{1}{3})=\frac{-3\ln(3)}{2}-\gamma-\frac{\pi\sqrt{3}}{6}$$

Used by the Compute Engine for simplification.
[`98f642` · Fungrim entry ↗](https://fungrim.org/entry/98f642)

---

$$\mathrm{Digamma}(n+z)=\sum_{k=0}^{n-1}\frac{1}{k+z}+\mathrm{Digamma}(z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C\land n\in\N$.
Used by the Compute Engine for simplification.
[`9f32fe` · Fungrim entry ↗](https://fungrim.org/entry/9f32fe)

---

$$\mathrm{Digamma}(z)=\sum_{n=1}^{\infty}\Zeta(n+1)\times(-1)^{n+1}z^{n}-\frac{1}{z}-\gamma$$

**Holds when** $\vert z\vert\lt1\land z\in\C$.
Used by the Compute Engine for simplification.
[`a2675b` · Fungrim entry ↗](https://fungrim.org/entry/a2675b)

---

$$\mathrm{Digamma}(z)=\int_{0}^{1}\!\frac{1-t^{z-1}}{1-t}\, \mathrm{d}t-\gamma$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
[`a4cc3b` · Fungrim entry ↗](https://fungrim.org/entry/a4cc3b)

---

$$\mathrm{Digamma}(z)=-\mathrm{StieltjesGamma}(0, z)$$

**Holds when** $z\notin\Z_{\le0}\land z\in\C$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`a6bdf5` · Fungrim entry ↗](https://fungrim.org/entry/a6bdf5)

---

$$\mathrm{Digamma}(z^\star)=\mathrm{Digamma}(z)^\star$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`aa47cd` · Fungrim entry ↗](https://fungrim.org/entry/aa47cd)

---

$$\mathrm{Digamma}(2)=1-\gamma$$

Used by the Compute Engine for simplification.
[`ada157` · Fungrim entry ↗](https://fungrim.org/entry/ada157)

---

$$\mathrm{Digamma}(1-z)=\pi\cot(\pi z)+\mathrm{Digamma}(z)$$

**Holds when** $z\notin\Z\land z\in\C$.
Used by the Compute Engine for simplification.
[`adf5e2` · Fungrim entry ↗](https://fungrim.org/entry/adf5e2)

---

$$\mathrm{Digamma}(z-n)=\sum_{k=1}^{\infty}(\Zeta(k+1)\times(-1)^{k+1}+\sum_{j=1}^{n}j^{(-1)-k})z^{k}+\mathrm{Digamma}(n+1)-\frac{1}{z}$$

**Holds when** $\vert z\vert\lt1\land n\in\N\land z\in\C$.
Used by the Compute Engine for simplification.
[`b4825b` · Fungrim entry ↗](https://fungrim.org/entry/b4825b)

---

$$\mathrm{Digamma}(z+1)=(\sum_{n=1}^{\infty}\Zeta(n+1)\times(-1)^{n+1}z^{n})-\gamma$$

**Holds when** $\vert z\vert\lt1\land z\in\C$.
Used by the Compute Engine for simplification.
[`c76eaf` · Fungrim entry ↗](https://fungrim.org/entry/c76eaf)

---

$$\mathrm{Digamma}(z)=-(\sum_{n=1}^{\mathrm{N_{var}}-1}\frac{\mathrm{BernoulliB}(2n)}{2nz^{2n}})-\frac{1}{2z}+\ln(z)+z\mapsto\mathrm{StirlingSeriesRemainder}(\mathrm{N_{var}}, z)^{\prime}(z)$$

**Holds when** $\mathrm{N_{var}}\in\N\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **BernoulliB** — Bernoulli number; **StirlingSeriesRemainder** — Remainder term in the Stirling series for the logarithmic gamma function.
Used by the Compute Engine for simplification.
[`cf5355` · Fungrim entry ↗](https://fungrim.org/entry/cf5355)

---

$$\mathrm{Digamma}(z)=\int_{0}^{\infty}\!(\frac{1}{t}-\frac{1}{1-\exp(-t)})\exp(-(tz))\, \mathrm{d}t+\ln(z)$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
[`cfb999` · Fungrim entry ↗](https://fungrim.org/entry/cfb999)

---

$$\mathrm{Digamma}(z)=-2\int_{0}^{\infty}\!(t)((t^2+z^2)(\exp(2\pi t)-1))^{-1}\, \mathrm{d}t-\frac{1}{2z}+\ln(z)$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
[`d9c818` · Fungrim entry ↗](https://fungrim.org/entry/d9c818)

---

$$\mathrm{Digamma}(1)=-\gamma$$

Used by the Compute Engine for simplification.
[`ea2482` · Fungrim entry ↗](https://fungrim.org/entry/ea2482)

---

$$\mathrm{Digamma}(z)=(z-1)\mathrm{Hypergeometric3F_2}(1, 1, 2-z, 2, 2, 1)-\gamma$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/GammaBetaErf/PolyGamma/26/01/01/0001/)
[`ee3dc5` · Fungrim entry ↗](https://fungrim.org/entry/ee3dc5)

---

$$\mathrm{Digamma}(nz)=\ln(n)+\frac{1}{n}(\sum_{k=0}^{n-1}\mathrm{Digamma}(k/n+z))$$

**Holds when** $nz\notin\Z_{\le0}\land n\in\N^*\land z\in\C$.
Used by the Compute Engine for simplification.
[`eec21a` · Fungrim entry ↗](https://fungrim.org/entry/eec21a)

---

$$\mathrm{Digamma}(\frac{3}{4})=-3\ln(2)+\frac{\pi}{2}-\gamma$$

Used by the Compute Engine for simplification.
[`f93bae` · Fungrim entry ↗](https://fungrim.org/entry/f93bae)

---

$$\mathrm{Digamma}(z)=\int_{0}^{\infty}\!\frac{\exp(-t)-\exp(-(tz))}{1-\exp(-t)}\, \mathrm{d}t-\gamma$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
Used by the Compute Engine for simplification.
[`f946a5` · Fungrim entry ↗](https://fungrim.org/entry/f946a5)

---

## Dirichlet characters

$$\mathrm{DirichletL}(1, \mathrm{DirichletCharacter}(4, 3))=\frac{\pi}{4}$$

**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`3b8c97` · Fungrim entry ↗](https://fungrim.org/entry/3b8c97)

---

$$\mathrm{DirichletGroup}(q)=\lbrace\mathrm{DirichletCharacter}(q, \ell), \ell\in1..\max(q, 2)-1\in\gcd(\ell, q)=1\rbrace$$

**Holds when** $q\in\N^*$.
**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletGroup** — Dirichlet characters with given modulus.
Used by the Compute Engine for simplification.
[`47d430` · Fungrim entry ↗](https://fungrim.org/entry/47d430)

---

$$\mathrm{DirichletCharacter}(p^{\mathrm{e_{var}}}, \ell, n)=\exp(\frac{2\imaginaryI\pi\mathrm{DiscreteLog}(\ell, \mathrm{ConreyGenerator}(p), p^{\mathrm{e_{var}}})\mathrm{DiscreteLog}(n, \mathrm{ConreyGenerator}(p), p^{\mathrm{e_{var}}})}{\mathrm{Totient}(p^{\mathrm{e_{var}}})})$$

**Holds when** $3\le p\land\gcd(\ell, p^{\mathrm{e_{var}}})=\gcd(n, p^{\mathrm{e_{var}}})=1\land p\in\mathrm{Primes}\land\mathrm{e_{var}}\in\N^*\land n\in\Z\land\ell\in1..p^{\mathrm{e_{var}}}-1$.
**Symbols:** **ConreyGenerator** — Conrey generator; **DirichletCharacter** — Dirichlet character; **DiscreteLog** — Discrete logarithm.
Used by the Compute Engine for simplification.
[`4cf4e4` · Fungrim entry ↗](https://fungrim.org/entry/4cf4e4)

---

$$\mathrm{ConreyGenerator}(p)=\begin{cases}10&p=40\,487\\7&p=6\,692\,367\,337\\\min(\lbrace a, a\in\N^*\in\mathrm{Count}(\lbrace a^{k}\bmod p, k\in\N\rbrace)=p-1\rbrace)&\top\end{cases}$$

**Holds when** $3\le p\land p\lt1\,000\,000\,000\,000\land p\in\mathrm{Primes}$.
**Symbols:** **ConreyGenerator** — Conrey generator.
Used by the Compute Engine for simplification.
[`540931` · Fungrim entry ↗](https://fungrim.org/entry/540931)

---

$$\mathrm{Count}(\mathrm{DirichletGroup}(q))=\mathrm{Totient}(q)$$

**Holds when** $q\in\N^*$.
**Symbols:** **DirichletGroup** — Dirichlet characters with given modulus.
Used by the Compute Engine for simplification.
[`62f7d5` · Fungrim entry ↗](https://fungrim.org/entry/62f7d5)

---

$$\mathrm{ConreyGenerator}(p)=\min(\lbrace a, a\in\N^*\in(\mathrm{Count}(\lbrace a^{k}\bmod p, k\in\N\rbrace)=p-1\land\mathrm{Count}(\lbrace a^{k}\bmod p^2, k\in\N\rbrace)=p(p-1))\rbrace)$$

**Holds when** $3\le p\land p\in\mathrm{Primes}$.
**Symbols:** **ConreyGenerator** — Conrey generator.
Used by the Compute Engine for simplification.
[`75231e` · Fungrim entry ↗](https://fungrim.org/entry/75231e)

---

$$\mathrm{DirichletL}(0, \mathrm{DirichletCharacter}(q, 1))=\begin{cases}\frac{-1}{2}&q=1\\0&\top\end{cases}$$

**Holds when** $q\in\N^*$.
**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`a07d28` · Fungrim entry ↗](https://fungrim.org/entry/a07d28)

---

$$\mathrm{DirichletL}(s, \mathrm{DirichletCharacter}(1, 1))=\Zeta(s)$$

**Holds when** $s\in\C$.
**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`a9337b` · Fungrim entry ↗](https://fungrim.org/entry/a9337b)

---

$$\mathrm{DirichletL}(1, \mathrm{DirichletCharacter}(5, 4))=\frac{1}{5}(2\sqrt{5}\ln(\varphi))$$

**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`c9d117` · Fungrim entry ↗](https://fungrim.org/entry/c9d117)

---

$$\mathrm{DirichletL}(1, \mathrm{DirichletCharacter}(3, 2))=\frac{\pi\sqrt{3}}{9}$$

**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`d83109` · Fungrim entry ↗](https://fungrim.org/entry/d83109)

---

$$\mathrm{DirichletCharacter}(q, 1, n)=\begin{cases}1&\gcd(n, q)=1\\0&\top\end{cases}$$

**Holds when** $q\in\N^*\land n\in\Z$.
**Symbols:** **DirichletCharacter** — Dirichlet character.
Used by the Compute Engine for simplification.
[`d8c6d1` · Fungrim entry ↗](https://fungrim.org/entry/d8c6d1)

---

$$\mathrm{DirichletCharacter}(q, \ell)\lhd n=\mathrm{DirichletCharacter}(q, \ell, n)$$

**Holds when** $\gcd(\ell, q)=1\land q\in\N^*\land n\in\Z\land\ell\in1..\max(q, 2)-1$.
**Symbols:** **DirichletCharacter** — Dirichlet character.
Used by the Compute Engine for simplification.
[`d9a187` · Fungrim entry ↗](https://fungrim.org/entry/d9a187)

---

$$\mathrm{PrimitiveDirichletCharacters}(q)=\lbrace\chi, \chi\in\mathrm{DirichletGroup}(q)\in(\forall d\in1..q-1, (d\mid q)\implies(\exists a\in0..q-1, \mathrm{CongruentMod}(a, 1, d)\land\gcd(a, q)=1\land\chi(a)\ne1))\rbrace$$

**Holds when** $q\in\N^*$.
**Symbols:** **DirichletGroup** — Dirichlet characters with given modulus; **PrimitiveDirichletCharacters** — Primitive Dirichlet characters with given modulus.
Used by the Compute Engine for simplification.
**Reference:** T. Apostol (1976), Introduction to Analytic Number Theory, Springer. Chapter 8.7.
[`ed65c8` · Fungrim entry ↗](https://fungrim.org/entry/ed65c8)

---

$$\mathrm{DirichletCharacter}(4, 3, n)=\begin{cases}1&\mathrm{CongruentMod}(n, 1, 4)\\-1&\mathrm{CongruentMod}(n, 3, 4)\\0&\top\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **DirichletCharacter** — Dirichlet character.
Used by the Compute Engine for simplification.
[`fc4f6a` · Fungrim entry ↗](https://fungrim.org/entry/fc4f6a)

---

$$\mathrm{DirichletL}(s, \mathrm{DirichletCharacter}(2^{n}, 1))=(1-2^{-s})\Zeta(s)$$

**Holds when** $n\in\N^*\land s\in\C$.
**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for expansion.
[`ff8254` · Fungrim entry ↗](https://fungrim.org/entry/ff8254)

---

## Error functions

$$\mathrm{Erfi}(z)=-(\imaginaryI\mathrm{Erf}(\imaginaryI z))$$

**Holds when** $z\in\C$.
**Symbols:** **Erfi** — Imaginary error function.
Used by the Compute Engine for simplification.
[`01440f` · Fungrim entry ↗](https://fungrim.org/entry/01440f)

---

$$\mathrm{Erfi}(-z)=-\mathrm{Erfi}(z)$$

**Holds when** $z\in\C$.
**Symbols:** **Erfi** — Imaginary error function.
Used by the Compute Engine for expansion.
[`603a49` · Fungrim entry ↗](https://fungrim.org/entry/603a49)

---

$$\mathrm{Erfc}(z)+\mathrm{Erf}(z)=1$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`7f355d` · Fungrim entry ↗](https://fungrim.org/entry/7f355d)

---

$$\mathrm{Erf}(-z)=-\mathrm{Erf}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`94db18` · Fungrim entry ↗](https://fungrim.org/entry/94db18)

---

$$\mathrm{Erf}(z)=\frac{1}{\sqrt{\pi}}(2z\mathrm{Hypergeometric1F_1}(1, \frac{3}{2}, z^2)\exp(-z^2))$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric1F1** — Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`98688d` · Fungrim entry ↗](https://fungrim.org/entry/98688d)

---

$$\mathrm{Erf}(z)=\frac{1}{\sqrt{\pi}}(2z\mathrm{Hypergeometric1F_1}(\frac{1}{2}, \frac{3}{2}, -z^2))$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric1F1** — Kummer confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`abadc7` · Fungrim entry ↗](https://fungrim.org/entry/abadc7)

---

$$\mathrm{Erfc}(z)=\frac{\mathrm{HypergeometricUStar}(\frac{1}{2}, \frac{1}{2}, z^2)\exp(-z^2)}{z\sqrt{\pi}}$$

**Holds when** $0\lt\Re(z)\land z\in\C$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`ae3110` · Fungrim entry ↗](https://fungrim.org/entry/ae3110)

---

$$z\mapsto\mathrm{Erf}(z)^{\prime}(z)=\frac{1}{\sqrt{\pi}}(2\exp(-z^2))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b5bd5d` · Fungrim entry ↗](https://fungrim.org/entry/b5bd5d)

---

$$\mathrm{Erfc}(z)=1-\mathrm{Erf}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`bfc86e` · Fungrim entry ↗](https://fungrim.org/entry/bfc86e)

---

$$\mathrm{Erf}(z)=\frac{z}{\sqrt{z^2}}-\frac{\mathrm{HypergeometricUStar}(1/2, 1/2, z^2)\exp(-z^2)}{z\sqrt{\pi}}$$

**Holds when** $z\ne0\land z\in\C$.
**Symbols:** **HypergeometricUStar** — Scaled Tricomi confluent hypergeometric function.
Used by the Compute Engine for simplification.
[`cb93ea` · Fungrim entry ↗](https://fungrim.org/entry/cb93ea)

---

$$\mathrm{Erfc}(-z)=2-\mathrm{Erfc}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`ec0205` · Fungrim entry ↗](https://fungrim.org/entry/ec0205)

---

$$z\mapsto\mathrm{Erf}(z)^{\prime}(z)=\frac{1}{\sqrt{\pi}}(2\mathrm{HermitePolynomial}(n-1, z)\times(-1)^{n+1}\exp(-z^2))$$

**Holds when** $z\in\C\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`fae9d3` · Fungrim entry ↗](https://fungrim.org/entry/fae9d3)

---

## Exponential function

$$\exponentialE^{z}=\sinh(z)+\cosh(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1568e1` · Fungrim entry ↗](https://fungrim.org/entry/1568e1)

---

$$\vert\exponentialE^{z}\vert=\exp(\Re(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1b3014` · Fungrim entry ↗](https://fungrim.org/entry/1b3014)

---

$$\exp(2\imaginaryI\pi n+z)=\exponentialE^{z}$$

**Holds when** $z\in\C\land n\in\Z$.
Used by the Compute Engine for simplification.
[`1fa6b7` · Fungrim entry ↗](https://fungrim.org/entry/1fa6b7)

---

$$\exp(\ln(z))=z$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification and equation solving.
[`296627` · Fungrim entry ↗](https://fungrim.org/entry/296627)

---

$$z\mapsto\exponentialE^{z}^{\prime}(z)=\exponentialE^{z}$$

**Holds when** $z\in\C\land n\in\N$.
Used by the Compute Engine for simplification.
[`4491b8` · Fungrim entry ↗](https://fungrim.org/entry/4491b8)

---

$$\exp(z^\star)=\exponentialE^{z}^\star$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`52d827` · Fungrim entry ↗](https://fungrim.org/entry/52d827)

---

$$\exp(\imaginaryI\pi)=-1$$

Used by the Compute Engine for simplification.
[`54aaf1` · Fungrim entry ↗](https://fungrim.org/entry/54aaf1)

---

$$\exp(a+\imaginaryI b)=(\imaginaryI\sin(b)+\cos(b))\exponentialE^{a}$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`77d6bf` · Fungrim entry ↗](https://fungrim.org/entry/77d6bf)

---

$$\exp(a+b)=\exponentialE^{a}\exponentialE^{b}$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`812707` · Fungrim entry ↗](https://fungrim.org/entry/812707)

---

$$z\mapsto\exponentialE^{z}^{\prime}(z)=\exponentialE^{z}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`96af56` · Fungrim entry ↗](https://fungrim.org/entry/96af56)

---

$$\exp(\imaginaryI\pi n+z)=(-1)^{n}\exponentialE^{z}$$

**Holds when** $z\in\C\land n\in\Z$.
Used by the Compute Engine for simplification.
[`97ba8d` · Fungrim entry ↗](https://fungrim.org/entry/97ba8d)

---

$$\arg(\exponentialE^{z})=\Im(z)$$

**Holds when** $z\in\C\land\Im(z)\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for expansion.
[`a0d93c` · Fungrim entry ↗](https://fungrim.org/entry/a0d93c)

---

$$\exp(\frac{\imaginaryI\pi}{2})=\imaginaryI$$

Used by the Compute Engine for simplification.
[`a90f35` · Fungrim entry ↗](https://fungrim.org/entry/a90f35)

---

$$\Re(\exponentialE^{z})=\cos(\Im(z))\exp(\Re(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b7d62b` · Fungrim entry ↗](https://fungrim.org/entry/b7d62b)

---

$$\mathrm{sgn}(\exponentialE^{z})=\exp(\imaginaryI\Im(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`caf706` · Fungrim entry ↗](https://fungrim.org/entry/caf706)

---

$$\Im(\exponentialE^{z})=\sin(\Im(z))\exp(\Re(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`e2fac7` · Fungrim entry ↗](https://fungrim.org/entry/e2fac7)

---

## Factorials and binomial coefficients

$$\mathrm{RisingFactorial}(z, k+m)=\mathrm{RisingFactorial}(z, k)\mathrm{RisingFactorial}(k+z, m)$$

**Holds when** $z\in\C\land k\in\N\land m\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`02ee06` · Fungrim entry ↗](https://fungrim.org/entry/02ee06)

---

$$\mathrm{Binomial}(2n, n)=\frac{(2n)!}{n!^2}$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`0d92f6` · Fungrim entry ↗](https://fungrim.org/entry/0d92f6)

---

$$\mathrm{RisingFactorial}(1, k)=k!$$

**Holds when** $k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for expansion.
[`0feb19` · Fungrim entry ↗](https://fungrim.org/entry/0feb19)

---

$$\mathrm{Binomial}(n, k)=\mathrm{Binomial}(n, n-k)$$

**Holds when** $n\in\N\land k\in0..n$.
Used by the Compute Engine for simplification.
[`2362af` · Fungrim entry ↗](https://fungrim.org/entry/2362af)

---

$$\mathrm{RisingFactorial}(n, k)=\frac{(k+n-1)!}{(n-1)!}$$

**Holds when** $n\in\N^*\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`30652c` · Fungrim entry ↗](https://fungrim.org/entry/30652c)

---

$$\mathrm{Binomial}(n, k)=(n!)(k!(n-k)!)^{-1}$$

**Holds when** $n\in\N\land k\in\N$.
Used by the Compute Engine for simplification.
[`332721` · Fungrim entry ↗](https://fungrim.org/entry/332721)

---

$$\mathrm{FallingFactorial}(k, k)=k!$$

**Holds when** $k\in\N$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for expansion.
[`355c22` · Fungrim entry ↗](https://fungrim.org/entry/355c22)

---

$$\mathrm{RisingFactorial}(z+1, k)=\frac{1}{z}((k+z)\mathrm{RisingFactorial}(z, k))$$

**Holds when** $k\in\N\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`41f950` · Fungrim entry ↗](https://fungrim.org/entry/41f950)

---

$$\mathrm{Binomial}(n, m+n)=0$$

**Holds when** $n\in\N\land m\in\N^*$.
Used by the Compute Engine for simplification.
[`471485` · Fungrim entry ↗](https://fungrim.org/entry/471485)

---

$$n!=n(n-1)!$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`4f20ff` · Fungrim entry ↗](https://fungrim.org/entry/4f20ff)

---

$$\mathrm{FallingFactorial}(z, 0)=1$$

**Holds when** $z\in\C$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for simplification.
[`5b414d` · Fungrim entry ↗](https://fungrim.org/entry/5b414d)

---

$$n!=\Gamma(n+1)$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`62c6c9` · Fungrim entry ↗](https://fungrim.org/entry/62c6c9)

---

$$\mathrm{Binomial}(n, n)=1$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`8c21f5` · Fungrim entry ↗](https://fungrim.org/entry/8c21f5)

---

$$\mathrm{RisingFactorial}(z, 1)=z$$

**Holds when** $z\in\C$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`973b2c` · Fungrim entry ↗](https://fungrim.org/entry/973b2c)

---

$$\mathrm{FallingFactorial}(z, 1)=z$$

**Holds when** $z\in\C$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for simplification.
[`a7b330` · Fungrim entry ↗](https://fungrim.org/entry/a7b330)

---

$$\mathrm{RisingFactorial}(-z, k)=\mathrm{RisingFactorial}(-k+z+1, k)\times(-1)^{k}$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`c640bf` · Fungrim entry ↗](https://fungrim.org/entry/c640bf)

---

$$\mathrm{RisingFactorial}(z, k)=\frac{\Gamma(k+z)}{\Gamma(z)}$$

**Holds when** $k+z\notin\Z_{\le0}\land z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`c733f7` · Fungrim entry ↗](https://fungrim.org/entry/c733f7)

---

$$\mathrm{RisingFactorial}(z, 2k)=\mathrm{RisingFactorial}(\frac{z}{2}, k)\mathrm{RisingFactorial}(\frac{z+1}{2}, k)\times4^{k}$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`d651d1` · Fungrim entry ↗](https://fungrim.org/entry/d651d1)

---

$$0!=1$$

Used by the Compute Engine for simplification.
[`d8c274` · Fungrim entry ↗](https://fungrim.org/entry/d8c274)

---

$$\mathrm{RisingFactorial}(z, 0)=1$$

**Holds when** $z\in\C$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`e78084` · Fungrim entry ↗](https://fungrim.org/entry/e78084)

---

$$\mathrm{RisingFactorial}(z, k)=\mathrm{FallingFactorial}(k+z-1, k)$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **FallingFactorial** — Falling factorial; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`e78989` · Fungrim entry ↗](https://fungrim.org/entry/e78989)

---

$$\mathrm{RisingFactorial}(z, k+1)=(k+z)\mathrm{RisingFactorial}(z, k)$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`fe9fb7` · Fungrim entry ↗](https://fungrim.org/entry/fe9fb7)

---

## Fibonacci numbers

$$\mathrm{Fibonacci}(n)=\lfloor\frac{1}{5}(\sqrt{5}\varphi^{n})+\frac{1}{2}\rfloor$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`050fdb` · Fungrim entry ↗](https://fungrim.org/entry/050fdb)

---

$$\mathrm{Fibonacci}(n)^2=\mathrm{Fibonacci}(n-1)\mathrm{Fibonacci}(n+1)-(-1)^{n}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`073466` · Fungrim entry ↗](https://fungrim.org/entry/073466)

---

$$\mathrm{Fibonacci}(n+2)=\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(n+1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`10165f` · Fungrim entry ↗](https://fungrim.org/entry/10165f)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{5}(\sqrt{5}(\exp(n\ln(\varphi))-\cos(\pi n)\exp(-(n\ln(\varphi)))))$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`12b336` · Fungrim entry ↗](https://fungrim.org/entry/12b336)

---

$$\mathrm{Fibonacci}(n)=\frac{n\mathrm{Hypergeometric2F_1}(\frac{1-n}{2}, \frac{2-n}{2}, \frac{3}{2}, 5)}{2^{n-1}}$$

**Holds when** $n\in\Z$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/IntegerFunctions/Fibonacci/26/01/01/0007/)
[`1c90fb` · Fungrim entry ↗](https://fungrim.org/entry/1c90fb)

---

$$\mathrm{Fibonacci}(2n+1)=\frac{1}{\sqrt{5}}(2\mathrm{ChebyshevT}(2n+1, \frac{5^{1/2}}{2}))$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`223ce1` · Fungrim entry ↗](https://fungrim.org/entry/223ce1)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(n-2)+\mathrm{Fibonacci}(n-1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`22dc6e` · Fungrim entry ↗](https://fungrim.org/entry/22dc6e)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{5}(\sqrt{5}(\varphi^{n}-(-\varphi)^{-n}))$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`24107d` · Fungrim entry ↗](https://fungrim.org/entry/24107d)

---

$$\mathrm{Fibonacci}(2n)=(\mathrm{Fibonacci}(n-1)+\mathrm{Fibonacci}(n+1))\mathrm{Fibonacci}(n)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`2ca869` · Fungrim entry ↗](https://fungrim.org/entry/2ca869)

---

$$\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n+1)-\mathrm{Fibonacci}(n)\mathrm{Fibonacci}(m+1)=\mathrm{Fibonacci}(m-n)\times(-1)^{n}$$

**Holds when** $n\in\Z\land m\in\Z$.
Used by the Compute Engine for simplification.
[`301081` · Fungrim entry ↗](https://fungrim.org/entry/301081)

---

$$\mathrm{Fibonacci}(2n)=\mathrm{Fibonacci}(n+1)^2-\mathrm{Fibonacci}(n-1)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`35956b` · Fungrim entry ↗](https://fungrim.org/entry/35956b)

---

$$\mathrm{Count}(\lbrace k, k\in\Z\in(n\mid\mathrm{Fibonacci}(k))\rbrace)=\mathrm{Count}(\Z)$$

**Holds when** $n\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`4ec333` · Fungrim entry ↗](https://fungrim.org/entry/4ec333)

---

$$\mathrm{Fibonacci}(2n)=-2\mathrm{Fibonacci}(n)^2-\mathrm{Fibonacci}(n+1)^2+\mathrm{Fibonacci}(n+2)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`5745bd` · Fungrim entry ↗](https://fungrim.org/entry/5745bd)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(-m+n-1)+\mathrm{Fibonacci}(m+1)\mathrm{Fibonacci}(n-m)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`5cb57e` · Fungrim entry ↗](https://fungrim.org/entry/5cb57e)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(n+2)-\mathrm{Fibonacci}(n+1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`6d437c` · Fungrim entry ↗](https://fungrim.org/entry/6d437c)

---

$$\mathrm{Fibonacci}(m+n-1)=\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(m-1)\mathrm{Fibonacci}(n-1)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`70878b` · Fungrim entry ↗](https://fungrim.org/entry/70878b)

---

$$\gcd(\mathrm{Fibonacci}(n), \mathrm{Fibonacci}(n+1))=1$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`7b0abf` · Fungrim entry ↗](https://fungrim.org/entry/7b0abf)

---

$$\mathrm{Fibonacci}(n)=2\mathrm{Fibonacci}(n-2)+\mathrm{Fibonacci}(n-3)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`7ef2c7` · Fungrim entry ↗](https://fungrim.org/entry/7ef2c7)

---

$$\begin{pmatrix}1 & 1\\
1 & 0\end{pmatrix}^{n}=\begin{pmatrix}\mathrm{Fibonacci}(n+1) & \mathrm{Fibonacci}(n)\\
\mathrm{Fibonacci}(n) & \mathrm{Fibonacci}(n-1)\end{pmatrix}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`8a548e` · Fungrim entry ↗](https://fungrim.org/entry/8a548e)

---

$$\mathrm{Fibonacci}(\mathrm{i_{var}}+n)\mathrm{Fibonacci}(j+n)-\mathrm{Fibonacci}(n)\mathrm{Fibonacci}(\mathrm{i_{var}}+j+n)=\mathrm{Fibonacci}(\mathrm{i_{var}})\mathrm{Fibonacci}(j)\times(-1)^{n}$$

**Holds when** $n\in\Z\land\mathrm{i_{var}}\in\Z\land j\in\Z$.
Used by the Compute Engine for simplification.
[`8db61e` · Fungrim entry ↗](https://fungrim.org/entry/8db61e)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Hypergeometric2F_1}(\frac{1-n}{2}, \frac{2-n}{2}, 1-n, -4)$$

**Holds when** $n\in\N^*$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`90c290` · Fungrim entry ↗](https://fungrim.org/entry/90c290)

---

$$\mathrm{Fibonacci}(m+n)=\mathrm{Fibonacci}(n)\mathrm{Fibonacci}(m-1)+\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n+1)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`a104b0` · Fungrim entry ↗](https://fungrim.org/entry/a104b0)

---

$$\mathrm{Fibonacci}(n+1)=\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(n-1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`a8f2ac` · Fungrim entry ↗](https://fungrim.org/entry/a8f2ac)

---

$$\gcd(\mathrm{Fibonacci}(n), \mathrm{Fibonacci}(n+2))=1$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`aaa244` · Fungrim entry ↗](https://fungrim.org/entry/aaa244)

---

$$\mathrm{Fibonacci}(2n)=\mathrm{ChebyshevU}(n-1, \frac{3}{2})$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`aadf90` · Fungrim entry ↗](https://fungrim.org/entry/aadf90)

---

$$\mathrm{Fibonacci}(n)^2=(-1)^{m+n}\mathrm{Fibonacci}(m)^2+\mathrm{Fibonacci}(m+n)\mathrm{Fibonacci}(n-m)$$

**Holds when** $n\in\Z\land m\in\Z$.
Used by the Compute Engine for simplification.
[`ab563e` · Fungrim entry ↗](https://fungrim.org/entry/ab563e)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{5}(\sqrt{5}(\varphi^{n}-\frac{\cos(\pi n)}{\varphi^{n}}))$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`ad0d7a` · Fungrim entry ↗](https://fungrim.org/entry/ad0d7a)

---

$$\mathrm{Fibonacci}(n)=\mathrm{ChebyshevU}(n-1, -(\frac{\imaginaryI}{2}))\imaginaryI^{n-1}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`ae76a3` · Fungrim entry ↗](https://fungrim.org/entry/ae76a3)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{5}(\sqrt{5}((1-\cos(\pi n))\cosh(n\ln(\varphi))+(\cos(\pi n)+1)\sinh(n\ln(\varphi))))$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`bceed4` · Fungrim entry ↗](https://fungrim.org/entry/bceed4)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{\sqrt{5}}(2\sinh(n(\frac{\imaginaryI\pi}{2}+\ln(\varphi)))(-\imaginaryI)^{n})$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`c4d78a` · Fungrim entry ↗](https://fungrim.org/entry/c4d78a)

---

$$\mathrm{Fibonacci}(n)=2\mathrm{Fibonacci}(n-4)+3\mathrm{Fibonacci}(n-3)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`cbfe21` · Fungrim entry ↗](https://fungrim.org/entry/cbfe21)

---

$$\mathrm{Fibonacci}(-n)=\mathrm{Fibonacci}(n)\times(-1)^{n+1}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`ce6dd0` · Fungrim entry ↗](https://fungrim.org/entry/ce6dd0)

---

$$\mathrm{Fibonacci}(2n+1)=\mathrm{Fibonacci}(n)^2+\mathrm{Fibonacci}(n+1)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`fc4fd1` · Fungrim entry ↗](https://fungrim.org/entry/fc4fd1)

---

$$\mathrm{Fibonacci}(n)=\frac{1}{\sqrt{5}}(2\begin{cases}\sinh(n\ln(\varphi))&\lnot\mathrm{IsOdd}(n)\\\cosh(n\ln(\varphi))&\mathrm{IsOdd}(n)\end{cases})$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`fd732d` · Fungrim entry ↗](https://fungrim.org/entry/fd732d)

---

## Gamma function

$$\Gamma(z-1)=\frac{\Gamma(z)}{z-1}$$

**Holds when** $z\in\C\setminus-\infty..1$.
Used by the Compute Engine for simplification.
[`14af98` · Fungrim entry ↗](https://fungrim.org/entry/14af98)

---

$$\vert\Gamma(\imaginaryI y)\vert=\sqrt{(\pi)(y\sinh(\pi y))^{-1}}$$

**Holds when** $y\in\R\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`1976db` · Fungrim entry ↗](https://fungrim.org/entry/1976db)

---

$$\Gamma(2)=1$$

Used by the Compute Engine for simplification.
[`19d480` · Fungrim entry ↗](https://fungrim.org/entry/19d480)

---

$$\mathrm{GammaLn}(z)=-z+(z-\frac{1}{2})\ln(z)+\sum_{k=1}^{n-1}\frac{\mathrm{BernoulliB}(2k)}{2k(2k-1)z^{2k-1}}+\mathrm{StirlingSeriesRemainder}(n, z)+\frac{\ln(2\pi)}{2}$$

**Holds when** $z\notin\lparen-\infty, 0\rbrack\land z\in\C\land n\in\N^*$.
**Symbols:** **BernoulliB** — Bernoulli number; **StirlingSeriesRemainder** — Remainder term in the Stirling series for the logarithmic gamma function.
Used by the Compute Engine for simplification.
[`37a95a` · Fungrim entry ↗](https://fungrim.org/entry/37a95a)

---

$$\Gamma(\frac{3}{2})=\frac{\sqrt{\pi}}{2}$$

Used by the Compute Engine for simplification.
[`48ac55` · Fungrim entry ↗](https://fungrim.org/entry/48ac55)

---

$$\Gamma(n+z)=\Gamma(z)\mathrm{RisingFactorial}(z, n)$$

**Holds when** $n\in\N\land z\in\C\setminus\Z_{\le0}$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`56d710` · Fungrim entry ↗](https://fungrim.org/entry/56d710)

---

$$\Gamma(z)=(z-1)\Gamma(z-1)$$

**Holds when** $z\in\C\setminus-\infty..1$.
Used by the Compute Engine for simplification.
[`639d91` · Fungrim entry ↗](https://fungrim.org/entry/639d91)

---

$$\exp(\pi z)=\pi((z)(\Gamma(\imaginaryI z+1)\Gamma(1-\imaginaryI z))^{-1}+(\Gamma(\imaginaryI z+\frac{1}{2})\Gamma(1/2-\imaginaryI z))^{-1})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`6430cc` · Fungrim entry ↗](https://fungrim.org/entry/6430cc)

---

$$\mathrm{GammaLn}(z+1)=(\sum_{k=2}^{\infty}\frac{1}{k}(\Zeta(k)(-z)^{k}))-\gamma z$$

**Holds when** $\vert z\vert\lt1\land z\in\C$.
Used by the Compute Engine for simplification.
[`661054` · Fungrim entry ↗](https://fungrim.org/entry/661054)

---

$$\Gamma(z)=\exp(-z)\exp(\sum_{n=1}^{\infty}(n+z-1/2)\ln((n+z)/(n+z-1))-1)z^{z-\frac{1}{2}}\sqrt{2\pi}$$

**Holds when** $z\notin\lparen-\infty, 0\rbrack\land z\in\C$.
Used by the Compute Engine for simplification.
**Reference:** B. C. Carlson (1977), Special functions of applied mathematics, Academic Press. Proposition 3.8-1.
[`6d0a95` · Fungrim entry ↗](https://fungrim.org/entry/6d0a95)

---

$$\mathrm{GammaLn}(z+1)=\ln(z)+\mathrm{GammaLn}(z)$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`774d37` · Fungrim entry ↗](https://fungrim.org/entry/774d37)

---

$$\Gamma(z+1)=z\Gamma(z)$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`78f1f4` · Fungrim entry ↗](https://fungrim.org/entry/78f1f4)

---

$$\vert\Gamma(\imaginaryI y+1)\vert=\sqrt{\frac{\pi y}{\sinh(\pi y)}}$$

**Holds when** $y\in\R\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`94db60` · Fungrim entry ↗](https://fungrim.org/entry/94db60)

---

$$\Gamma(z)=\exp(\mathrm{GammaLn}(z))$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`a26ac7` · Fungrim entry ↗](https://fungrim.org/entry/a26ac7)

---

$$\Gamma(z)\Gamma(z+\frac{1}{2})=\Gamma(2z)\times2^{1-2z}\sqrt{\pi}$$

**Holds when** $2z\notin\Z_{\le0}\land z\in\C$.
Used by the Compute Engine for expansion.
[`a787eb` · Fungrim entry ↗](https://fungrim.org/entry/a787eb)

---

$$\Gamma(z)=(\pi)(\sin(\pi z)\Gamma(1-z))^{-1}$$

**Holds when** $z\in\C\setminus\Z$.
Used by the Compute Engine for simplification.
[`b510b6` · Fungrim entry ↗](https://fungrim.org/entry/b510b6)

---

$$\cos(\pi z)=(\pi)(\Gamma(z+\frac{1}{2})\Gamma(1/2-z))^{-1}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b7a578` · Fungrim entry ↗](https://fungrim.org/entry/b7a578)

---

$$\vert\Gamma(\imaginaryI y+\frac{1}{2})\vert=\sqrt{\frac{\pi}{\cosh(\pi y)}}$$

**Holds when** $y\in\R$.
Used by the Compute Engine for simplification.
[`c7b921` · Fungrim entry ↗](https://fungrim.org/entry/c7b921)

---

$$\mathrm{sinc}(\pi z)=(\Gamma(z+1)\Gamma(1-z))^{-1}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`d16cb4` · Fungrim entry ↗](https://fungrim.org/entry/d16cb4)

---

$$\Gamma(z^\star)=\Gamma(z)^\star$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`d7d2a0` · Fungrim entry ↗](https://fungrim.org/entry/d7d2a0)

---

$$\Gamma(1)=1$$

Used by the Compute Engine for simplification.
[`e68d11` · Fungrim entry ↗](https://fungrim.org/entry/e68d11)

---

$$\tan(\pi z)=\frac{\Gamma(z+\frac{1}{2})\Gamma(1/2-z)}{\Gamma(z)\Gamma(1-z)}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`ee56b9` · Fungrim entry ↗](https://fungrim.org/entry/ee56b9)

---

$$\Gamma(n)=(n-1)!$$

**Holds when** $n\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`f1d31a` · Fungrim entry ↗](https://fungrim.org/entry/f1d31a)

---

$$\Gamma(\frac{1}{2})=\sqrt{\pi}$$

Used by the Compute Engine for simplification.
[`f826a6` · Fungrim entry ↗](https://fungrim.org/entry/f826a6)

---

## Gauss hypergeometric function

$$\mathrm{Hypergeometric2F_1}(a, b, c, z)=\mathrm{Hypergeometric2F_1}(b, a, c, z)$$

**Holds when** $a\in\C\land b\in\C\land z\in\C\land c\in\C\setminus\Z_{\le0}$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for expansion.
[`0e0393` · Fungrim entry ↗](https://fungrim.org/entry/0e0393)

---

$$\mathrm{Hypergeometric2F_1}(a, b, c, 0)=1$$

**Holds when** $a\in\C\land b\in\C\land c\in\C\setminus\Z_{\le0}$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`18d955` · Fungrim entry ↗](https://fungrim.org/entry/18d955)

---

$$\mathrm{Hypergeometric2F_1}(a, b, b, z)=(1-z)^{-a}$$

**Holds when** $a\in\C\land b\in\C\setminus\Z_{\le0}\land z\in\C\setminus\lbrace0, 1\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`20bf69` · Fungrim entry ↗](https://fungrim.org/entry/20bf69)

---

$$\frac{1}{\pi}(\sin(\pi(b-a))\mathrm{Hypergeometric2F1Regularized}(a, b, c, z))=\frac{\frac{\mathrm{Hypergeometric2F1Regularized}(a, c-b, a-b+1, 1/(1-z))}{(1-z)^{a}}}{\Gamma(b)\Gamma(c-a)}-\frac{\frac{\mathrm{Hypergeometric2F1Regularized}(b, c-a, -a+b+1, 1/(1-z))}{(1-z)^{b}}}{\Gamma(a)\Gamma(c-b)}$$

**Holds when** $z\notin\lbrack0, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`27bc34` · Fungrim entry ↗](https://fungrim.org/entry/27bc34)

---

$$\mathrm{Hypergeometric2F_1}(a, b, c, z)=\mathrm{Hypergeometric2F_1}(a^\star, b^\star, c^\star, z^\star)^\star$$

**Holds when** $a\in\C\land b\in\C\land c\in\C\setminus\Z_{\le0}\land z\in\C\setminus\lbrack1, \infty\rparen$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`3d6d7e` · Fungrim entry ↗](https://fungrim.org/entry/3d6d7e)

---

$$\mathrm{Hypergeometric2F1Regularized}(a, b, c, z)=\frac{\mathrm{Hypergeometric2F1Regularized}(c-a, b, c, \frac{z}{z-1})}{(1-z)^{b}}$$

**Holds when** $z\notin\lbrack1, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`504717` · Fungrim entry ↗](https://fungrim.org/entry/504717)

---

$$\mathrm{Hypergeometric2F1Regularized}(a, b, c, z)=\mathrm{Hypergeometric2F1Regularized}(c-a, c-b, c, z)(1-z)^{-a-b+c}$$

**Holds when** $z\ne1\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`651a4a` · Fungrim entry ↗](https://fungrim.org/entry/651a4a)

---

$$\mathrm{Hypergeometric2F1Regularized}(a, b, -n, z)=\frac{\mathrm{Hypergeometric2F_1}(a+n+1, b+n+1, n+2, z)\mathrm{RisingFactorial}(a, n+1)\mathrm{RisingFactorial}(b, n+1)z^{n+1}}{(n+1)!}$$

**Holds when** $a\in\C\land b\in\C\land n\in\N\land z\in\C\setminus\lbrace1\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function; **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`65693e` · Fungrim entry ↗](https://fungrim.org/entry/65693e)

---

$$\mathrm{Hypergeometric2F_1}(a, b, c, 1)=\frac{\Gamma(c)\Gamma(-a-b+c)}{\Gamma(c-a)\Gamma(c-b)}$$

**Holds when** $0\lt\Re(-a-b+c)\land a\in\C\land b\in\C\land c\in\C\setminus\Z_{\le0}$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`659ce8` · Fungrim entry ↗](https://fungrim.org/entry/659ce8)

---

$$\frac{1}{\pi}(\sin(\pi(b-a))\mathrm{Hypergeometric2F1Regularized}(a, b, c, z))=\frac{\frac{\mathrm{Hypergeometric2F1Regularized}(a, a-c+1, a-b+1, 1/z)}{(-z)^{a}}}{\Gamma(b)\Gamma(c-a)}-\frac{\frac{\mathrm{Hypergeometric2F1Regularized}(b, b-c+1, -a+b+1, 1/z)}{(-z)^{b}}}{\Gamma(a)\Gamma(c-b)}$$

**Holds when** $z\notin\lbrack0, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`90ac58` · Fungrim entry ↗](https://fungrim.org/entry/90ac58)

---

$$\mathrm{Hypergeometric2F_1}(1, 1, 2, z)=-(\frac{\ln(1-z)}{z})$$

**Holds when** $z\in\C\setminus\lbrace0, 1\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`a85994` · Fungrim entry ↗](https://fungrim.org/entry/a85994)

---

$$\mathrm{Hypergeometric2F1Regularized}(a, b, c, z)=\frac{\mathrm{Hypergeometric2F1Regularized}(a, c-b, c, \frac{z}{z-1})}{(1-z)^{a}}$$

**Holds when** $z\notin\lbrack1, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`b25089` · Fungrim entry ↗](https://fungrim.org/entry/b25089)

---

$$\frac{1}{\pi}(\sin(\pi(-a-b+c))\mathrm{Hypergeometric2F1Regularized}(a, b, c, z))=\frac{\frac{\mathrm{Hypergeometric2F1Regularized}(a, a-c+1, a+b-c+1, 1-1/z)}{z^{a}}}{\Gamma(c-a)\Gamma(c-b)}-\frac{\mathrm{Hypergeometric2F1Regularized}(c-a, 1-a, -a-b+c+1, 1-1/z)z^{a-c}(1-z)^{-a-b+c}}{\Gamma(a)\Gamma(b)}$$

**Holds when** $z\notin\lparen-\infty, 0\rbrack\land z\notin\lbrack1, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`ca9123` · Fungrim entry ↗](https://fungrim.org/entry/ca9123)

---

$$\frac{1}{\pi}(\sin(\pi(-a-b+c))\mathrm{Hypergeometric2F1Regularized}(a, b, c, z))=\frac{\mathrm{Hypergeometric2F1Regularized}(a, b, a+b-c+1, 1-z)}{\Gamma(c-a)\Gamma(c-b)}-\frac{\mathrm{Hypergeometric2F1Regularized}(c-a, c-b, -a-b+c+1, 1-z)(1-z)^{-a-b+c}}{\Gamma(a)\Gamma(b)}$$

**Holds when** $z\notin\lparen-\infty, 0\rbrack\land z\notin\lbrack1, \infty\rparen\land a\in\C\land b\in\C\land c\in\C\land z\in\C$.
**Symbols:** **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`db3eb9` · Fungrim entry ↗](https://fungrim.org/entry/db3eb9)

---

$$(c-z(a+b+1))z\mapsto\mathrm{Hypergeometric2F_1}(a, b, c, z)^{\prime}(z)-ab\mathrm{Hypergeometric2F_1}(a, b, c, z)+z(1-z)z\mapsto\mathrm{Hypergeometric2F_1}(a, b, c, z)^{\doubleprime}(z)=0$$

**Holds when** $a\in\C\land b\in\C\land c\in\C\setminus\Z_{\le0}\land z\in\C\setminus\lbrack1, \infty\rparen$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`f1bd89` · Fungrim entry ↗](https://fungrim.org/entry/f1bd89)

---

$$\mathrm{Hypergeometric2F1Regularized}(a, b, c, z)=\frac{\mathrm{Hypergeometric2F_1}(a, b, c, z)}{\Gamma(c)}$$

**Holds when** $a\in\C\land b\in\C\land z\in\C\land c\in\C\setminus\Z_{\le0}$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function; **Hypergeometric2F1Regularized** — Regularized Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`fe6e74` · Fungrim entry ↗](https://fungrim.org/entry/fe6e74)

---

## Gaussian quadrature

$$\mathrm{GaussLegendreWeight}(n, k)=(2)((1-\mathrm{LegendrePolynomialZero}(n, k)^2)t\mapsto\mathrm{LegendrePolynomial}(n, t)^{\prime}(\mathrm{LegendrePolynomialZero}(n, k))^2)^{-1}$$

**Holds when** $n\in\N^*\land k\in1..n$.
Used by the Compute Engine for simplification.
[`ea4754` · Fungrim entry ↗](https://fungrim.org/entry/ea4754)

---

## Golden ratio

$$\varphi^{n+1}=\varphi^{n}+\varphi^{n-1}$$

**Holds when** $n\in\C$.
Used by the Compute Engine for simplification.
[`0cd1a4` · Fungrim entry ↗](https://fungrim.org/entry/0cd1a4)

---

$$\frac{1}{\varphi}=\varphi-1$$

Used by the Compute Engine for simplification.
[`31f52c` · Fungrim entry ↗](https://fungrim.org/entry/31f52c)

---

$$\varphi^{n}=\varphi\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(n-1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`6a11ce` · Fungrim entry ↗](https://fungrim.org/entry/6a11ce)

---

$$-1-\varphi+\varphi^2=0$$

Used by the Compute Engine for simplification.
[`b464d3` · Fungrim entry ↗](https://fungrim.org/entry/b464d3)

---

$$\mathrm{Spectrum}(\begin{pmatrix}1 & 1\\
1 & 0\end{pmatrix})=\lbrace\varphi, 1-\varphi\rbrace$$

Used by the Compute Engine for simplification.
[`ebfcd8` · Fungrim entry ↗](https://fungrim.org/entry/ebfcd8)

---

## Greatest common divisor

$$\gcd(p, q)=1$$

**Holds when** $p\ne q\land p\in\mathrm{Primes}\land q\in\mathrm{Primes}$.
Used by the Compute Engine for simplification.
[`062423` · Fungrim entry ↗](https://fungrim.org/entry/062423)

---

$$\gcd(bn+a, b)=\gcd(a, b)$$

**Holds when** $a\in\Z\land b\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`07ac4a` · Fungrim entry ↗](https://fungrim.org/entry/07ac4a)

---

$$\lcm(a, 0)=0$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`0a7aff` · Fungrim entry ↗](https://fungrim.org/entry/0a7aff)

---

$$\mathrm{XGCD}(a, -a)=(\vert a\vert,0,-\mathrm{sgn}(a))$$

**Holds when** $a\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`0bb73e` · Fungrim entry ↗](https://fungrim.org/entry/0bb73e)

---

$$\gcd(a, a)=\vert a\vert$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`0f26cc` · Fungrim entry ↗](https://fungrim.org/entry/0f26cc)

---

$$\mathrm{XGCD}(a, 1)=(1,0,1)$$

**Holds when** $a\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for expansion.
[`13ed5e` · Fungrim entry ↗](https://fungrim.org/entry/13ed5e)

---

$$\lcm(a, b)=\lcm(b, a)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for expansion.
[`14b96c` · Fungrim entry ↗](https://fungrim.org/entry/14b96c)

---

$$\lcm(a, 2)=(\frac{1-(-1)^{a}}{2}+1)\vert a\vert$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`157c33` · Fungrim entry ↗](https://fungrim.org/entry/157c33)

---

$$\gcd(0, 0)=0$$

Used by the Compute Engine for simplification.
[`19ceaa` · Fungrim entry ↗](https://fungrim.org/entry/19ceaa)

---

$$\mathrm{XGCD}(-1, b)=(1,-\vert\mathrm{sgn}((b-1)(b+1))\vert,(\mathrm{sgn}(b+1)-\mathrm{sgn}(b-1))\mathrm{sgn}(b))$$

**Holds when** $b\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`1b47db` · Fungrim entry ↗](https://fungrim.org/entry/1b47db)

---

$$\lcm(bn+a, b)=\frac{1}{\vert a\vert}(\lcm(a, b)\vert bn+a\vert)$$

**Holds when** $b\in\Z\land n\in\Z\land a\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`1bbdaf` · Fungrim entry ↗](https://fungrim.org/entry/1bbdaf)

---

$$\lcm(a, \lcm(b, c))=\lcm(\lcm(a, b), c)$$

**Holds when** $a\in\Z\land b\in\Z\land c\in\Z$.
Used by the Compute Engine for expansion.
[`1cde02` · Fungrim entry ↗](https://fungrim.org/entry/1cde02)

---

$$\gcd(a, \lcm(a, b))=\vert a\vert$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`1d1653` · Fungrim entry ↗](https://fungrim.org/entry/1d1653)

---

$$\lcm(r, s)=\vert rs\vert$$

**Holds when** $\gcd(r, s)=1\land r\in\Z\land s\in\Z$.
Used by the Compute Engine for expansion.
[`250a45` · Fungrim entry ↗](https://fungrim.org/entry/250a45)

---

$$\gcd(a, b)=\gcd(b, a)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for expansion.
[`258fc7` · Fungrim entry ↗](https://fungrim.org/entry/258fc7)

---

$$\lcm(1, 1)=1$$

Used by the Compute Engine for simplification.
[`34378a` · Fungrim entry ↗](https://fungrim.org/entry/34378a)

---

$$\gcd(a, \gcd(b, c))=\gcd(\gcd(a, b), c)$$

**Holds when** $a\in\Z\land b\in\Z\land c\in\Z$.
Used by the Compute Engine for expansion.
[`4366b2` · Fungrim entry ↗](https://fungrim.org/entry/4366b2)

---

$$\gcd(p^{m}, q^{n})=1$$

**Holds when** $p\ne q\land p\in\mathrm{Primes}\land q\in\mathrm{Primes}\land m\in\N\land n\in\N$.
Used by the Compute Engine for simplification.
[`499cfc` · Fungrim entry ↗](https://fungrim.org/entry/499cfc)

---

$$\lcm(a, b)\gcd(a, b)=\vert ab\vert$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`4d3127` · Fungrim entry ↗](https://fungrim.org/entry/4d3127)

---

$$\gcd(1, 1)=1$$

Used by the Compute Engine for simplification.
[`554b2e` · Fungrim entry ↗](https://fungrim.org/entry/554b2e)

---

$$\lcm(a+b, b)=\frac{1}{\vert a\vert}(\lcm(a, b)\vert a+b\vert)$$

**Holds when** $b\in\Z\land a\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`5781de` · Fungrim entry ↗](https://fungrim.org/entry/5781de)

---

$$\gcd(a, 2)=\frac{(-1)^{a}+1}{2}+1$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for expansion.
[`5fb5e2` · Fungrim entry ↗](https://fungrim.org/entry/5fb5e2)

---

$$\gcd(\frac{a}{d}, \frac{b}{d})=\frac{\gcd(a, b)}{\vert d\vert}$$

**Holds when** $a\in\Z\land b\in\Z\land d\in\Z\land(d\mid a)\land(d\mid b)$.
Used by the Compute Engine for simplification.
[`646745` · Fungrim entry ↗](https://fungrim.org/entry/646745)

---

$$\gcd(a, b)=\frac{\vert ab\vert}{\lcm(a, b)}$$

**Holds when** $a\ne0\land b\ne0\land a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`6572c5` · Fungrim entry ↗](https://fungrim.org/entry/6572c5)

---

$$\mathrm{XGCD}(0, b)=(\vert b\vert,0,\mathrm{sgn}(b))$$

**Holds when** $b\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`6fd925` · Fungrim entry ↗](https://fungrim.org/entry/6fd925)

---

$$\lcm(a, \gcd(a, b))=\vert a\vert$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`7009cc` · Fungrim entry ↗](https://fungrim.org/entry/7009cc)

---

$$\gcd(a, 1)=1$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`720766` · Fungrim entry ↗](https://fungrim.org/entry/720766)

---

$$\lcm(a, a-2)=\frac{1}{2}((\frac{1-(-1)^{a}}{2}+1)\vert a(a-2)\vert)$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`7a1799` · Fungrim entry ↗](https://fungrim.org/entry/7a1799)

---

$$\mathrm{Count}(\lbrace k, k\in1..n\in\gcd(n, k)=1\rbrace)=\mathrm{Totient}(n)$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`7b27cd` · Fungrim entry ↗](https://fungrim.org/entry/7b27cd)

---

$$\lcm(a, b)=\min(\lbrace m, m\in\N^*\in((a\mid m)\land(b\mid m))\rbrace)$$

**Holds when** $a\in\Z\setminus\lbrace0\rbrace\land b\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`805c7a` · Fungrim entry ↗](https://fungrim.org/entry/805c7a)

---

$$\gcd(a, a-2)=\frac{(-1)^{a}+1}{2}+1$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`80f20f` · Fungrim entry ↗](https://fungrim.org/entry/80f20f)

---

$$\gcd(rs, c)=\gcd(r, c)\gcd(s, c)$$

**Holds when** $\gcd(r, s)=1\land r\in\Z\land s\in\Z\land c\in\Z$.
Used by the Compute Engine for simplification.
[`8621f6` · Fungrim entry ↗](https://fungrim.org/entry/8621f6)

---

$$\lcm(a, 1)=\vert a\vert$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`8d90e9` · Fungrim entry ↗](https://fungrim.org/entry/8d90e9)

---

$$\gcd(a, \lcm(b, c))=\lcm(\gcd(a, b), \gcd(a, c))$$

**Holds when** $a\in\Z\land b\in\Z\land c\in\Z$.
Used by the Compute Engine for simplification.
[`8dc1c9` · Fungrim entry ↗](https://fungrim.org/entry/8dc1c9)

---

$$\mathrm{XGCD}(a, a)=(\vert a\vert,0,\mathrm{sgn}(a))$$

**Holds when** $a\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`945be9` · Fungrim entry ↗](https://fungrim.org/entry/945be9)

---

$$\lcm(an, bn)=\lcm(a, b)\vert n\vert$$

**Holds when** $a\in\Z\land b\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`9500d3` · Fungrim entry ↗](https://fungrim.org/entry/9500d3)

---

$$\gcd(a\bmod b, b)=\gcd(a, b)$$

**Holds when** $b\ne0\land a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`959a25` · Fungrim entry ↗](https://fungrim.org/entry/959a25)

---

$$\lcm(0, 0)=0$$

Used by the Compute Engine for simplification.
[`af512f` · Fungrim entry ↗](https://fungrim.org/entry/af512f)

---

$$\gcd(a-b, b)=\gcd(a, b)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`b36dba` · Fungrim entry ↗](https://fungrim.org/entry/b36dba)

---

$$\mathrm{XGCD}(a, -1)=(1,0,-1)$$

**Holds when** $a\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for expansion.
[`b66d1e` · Fungrim entry ↗](https://fungrim.org/entry/b66d1e)

---

$$\mathrm{XGCD}(1, b)=(1,\vert\mathrm{sgn}((b-1)(b+1))\vert,(\mathrm{sgn}(b+1)-\mathrm{sgn}(b-1))\mathrm{sgn}(b))$$

**Holds when** $b\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`bf877e` · Fungrim entry ↗](https://fungrim.org/entry/bf877e)

---

$$\gcd(a, 0)=\vert a\vert$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`c40be0` · Fungrim entry ↗](https://fungrim.org/entry/c40be0)

---

$$\lcm(a, \gcd(b, c))=\gcd(\lcm(a, b), \lcm(a, c))$$

**Holds when** $a\in\Z\land b\in\Z\land c\in\Z$.
Used by the Compute Engine for simplification.
[`c4a892` · Fungrim entry ↗](https://fungrim.org/entry/c4a892)

---

$$\lcm(a, a)=\vert a\vert$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`c6631e` · Fungrim entry ↗](https://fungrim.org/entry/c6631e)

---

$$\gcd(a, a-1)=1$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`c70178` · Fungrim entry ↗](https://fungrim.org/entry/c70178)

---

$$\lcm(\frac{a}{d}, \frac{b}{d})=\frac{\lcm(a, b)}{\vert d\vert}$$

**Holds when** $a\in\Z\land b\in\Z\land d\in\Z\land(d\mid a)\land(d\mid b)$.
Used by the Compute Engine for simplification.
[`cb9f61` · Fungrim entry ↗](https://fungrim.org/entry/cb9f61)

---

$$\gcd(an, bn)=\gcd(a, b)\vert n\vert$$

**Holds when** $a\in\Z\land b\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`d4852c` · Fungrim entry ↗](https://fungrim.org/entry/d4852c)

---

$$\gcd(\mathrm{Fibonacci}(m), \mathrm{Fibonacci}(n))=\mathrm{Fibonacci}(\gcd(m, n))$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`da45c0` · Fungrim entry ↗](https://fungrim.org/entry/da45c0)

---

$$\lcm(a, b)=\lcm(-a, b)=\lcm(a, -b)=\lcm(-a, -b)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`dc0823` · Fungrim entry ↗](https://fungrim.org/entry/dc0823)

---

$$\lcm(a, a-1)=a(a-1)$$

**Holds when** $a\in\Z$.
Used by the Compute Engine for simplification.
[`e19e40` · Fungrim entry ↗](https://fungrim.org/entry/e19e40)

---

$$\mathrm{XGCD}(a, 0)=(\vert a\vert,\mathrm{sgn}(a),0)$$

**Holds when** $a\in\Z$.
**Symbols:** **XGCD** — Extended greatest common divisor.
Used by the Compute Engine for simplification.
[`e352ca` · Fungrim entry ↗](https://fungrim.org/entry/e352ca)

---

$$\gcd(a+b, b)=\gcd(a, b)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`e65763` · Fungrim entry ↗](https://fungrim.org/entry/e65763)

---

$$\lcm(a-b, b)=\frac{1}{\vert a\vert}(\lcm(a, b)\vert a-b\vert)$$

**Holds when** $b\in\Z\land a\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`e74d86` · Fungrim entry ↗](https://fungrim.org/entry/e74d86)

---

$$\gcd(a, b)=\gcd(-a, b)=\gcd(a, -b)=\gcd(-a, -b)$$

**Holds when** $a\in\Z\land b\in\Z$.
Used by the Compute Engine for simplification.
[`f1817f` · Fungrim entry ↗](https://fungrim.org/entry/f1817f)

---

$$\lcm(rs, c)=\frac{1}{\vert c\vert}(\lcm(r, c)\lcm(s, c))$$

**Holds when** $c\ne0\land\gcd(r, s)=1\land r\in\Z\land s\in\Z\land c\in\Z$.
Used by the Compute Engine for simplification.
[`fbe121` · Fungrim entry ↗](https://fungrim.org/entry/fbe121)

---

$$\gcd(n^{a}-1, n^{b}-1)=n^{\gcd(a, b)}-1$$

**Holds when** $a\in\N\land b\in\N\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`fdae67` · Fungrim entry ↗](https://fungrim.org/entry/fdae67)

---

## Hurwitz zeta function

$$\mathrm{HurwitzZeta}(0, 0)=\frac{1}{2}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`150b3e` · Fungrim entry ↗](https://fungrim.org/entry/150b3e)

---

$$\mathrm{HurwitzZeta}(4, 1)=\frac{\pi^4}{90}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`2d4828` · Fungrim entry ↗](https://fungrim.org/entry/2d4828)

---

$$\mathrm{HurwitzZeta}(3, \frac{1}{6})=2\sqrt{3}\pi^3+91\Zeta(3)$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`2fabeb` · Fungrim entry ↗](https://fungrim.org/entry/2fabeb)

---

$$\mathrm{HurwitzZeta}(4, 2)=\frac{\pi^4}{90}-1$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`33690e` · Fungrim entry ↗](https://fungrim.org/entry/33690e)

---

$$s\mapsto\mathrm{HurwitzZeta}(s, a)^{\prime}(s)=\mathrm{HurwitzZeta}(s, a, 1)$$

**Holds when** $s\ne1\land0\lt\Re(a)\land s\in\C\land a\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3ba544` · Fungrim entry ↗](https://fungrim.org/entry/3ba544)

---

$$\mathrm{HurwitzZeta}(0, \frac{1}{2})=0$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3db90c` · Fungrim entry ↗](https://fungrim.org/entry/3db90c)

---

$$\mathrm{HurwitzZeta}(2, \frac{1}{4})=8G+\pi^2$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3e82c3` · Fungrim entry ↗](https://fungrim.org/entry/3e82c3)

---

$$\mathrm{HurwitzZeta}(4, \frac{1}{2})=\frac{\pi^4}{6}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`4064f5` · Fungrim entry ↗](https://fungrim.org/entry/4064f5)

---

$$a\mapsto\mathrm{HurwitzZeta}(s, a)^{\prime}(a)=\mathrm{RisingFactorial}(-r-s+1, r)\mathrm{HurwitzZeta}(r+s, a)$$

**Holds when** $s\ne1\land r+s\ne1\land0\lt\Re(a)\land s\in\C\land a\in\C\land r\in\N$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`40c3e2` · Fungrim entry ↗](https://fungrim.org/entry/40c3e2)

---

$$\mathrm{BernoulliPolynomial}(n, z)=-(n\mathrm{HurwitzZeta}(1-n, z))$$

**Holds when** $n\in\N^*\land z\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial; **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`4228cd` · Fungrim entry ↗](https://fungrim.org/entry/4228cd)

---

$$\mathrm{HurwitzZeta}(s, \frac{1}{6})+\mathrm{HurwitzZeta}(s, \frac{5}{6})=(2^{s}-1)(3^{s}-1)\Zeta(s)$$

**Holds when** $s\ne1\land s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for expansion.
[`4d1f6b` · Fungrim entry ↗](https://fungrim.org/entry/4d1f6b)

---

$$\mathrm{HurwitzZeta}(3, 2)=\Zeta(3)-1$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`4dd87c` · Fungrim entry ↗](https://fungrim.org/entry/4dd87c)

---

$$\mathrm{PolyLog}(s, z)=\frac{(\mathrm{HurwitzZeta}(1-s, \frac{\ln(-z)}{2\imaginaryI\pi}+\frac{1}{2})\imaginaryI^{1-s}+\mathrm{HurwitzZeta}(1-s, \frac{1}{2}-\frac{\ln(-z)}{2\imaginaryI\pi})\imaginaryI^{s-1})\Gamma(1-s)}{(2\pi)^{1-s}}$$

**Holds when** $s\notin\N\land z\notin\lbrace0, 1\rbrace\land s\in\C\land z\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`52ea5f` · Fungrim entry ↗](https://fungrim.org/entry/52ea5f)

---

$$\Gamma(z)=\exp(\mathrm{HurwitzZeta}(0, z, 1))\sqrt{2\pi}$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`53026a` · Fungrim entry ↗](https://fungrim.org/entry/53026a)

---

$$\mathrm{HurwitzZeta}(1, a)=\tilde\infty$$

**Holds when** $a\in\C\setminus\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`532f31` · Fungrim entry ↗](https://fungrim.org/entry/532f31)

---

$$\mathrm{HurwitzZeta}(2, 1)=\frac{\pi^2}{6}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`575b8f` · Fungrim entry ↗](https://fungrim.org/entry/575b8f)

---

$$\mathrm{HurwitzZeta}(-n, a)=-(\frac{\mathrm{BernoulliPolynomial}(n+1, a)}{n+1})$$

**Holds when** $n\in\N\land a\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial; **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`5bdba2` · Fungrim entry ↗](https://fungrim.org/entry/5bdba2)

---

$$\mathrm{HurwitzZeta}(2, a)=\frac{\mathrm{Hypergeometric3F_2}(1, a, a, a+1, a+1, 1)}{a^2}$$

**Holds when** $a\in\C\setminus\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`6419ac` · Fungrim entry ↗](https://fungrim.org/entry/6419ac)

---

$$\mathrm{HurwitzZeta}(s, n+\frac{1}{2})=(2^{s}-1)\Zeta(s)-(\sum_{k=0}^{n-1}(2k+1)^{-s})\times2^{s}$$

**Holds when** $s\in\C\land n\in\N$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`6c3523` · Fungrim entry ↗](https://fungrim.org/entry/6c3523)

---

$$\mathrm{HurwitzZeta}(s, n)=\Zeta(s)-(\sum_{k=1}^{n-1}k^{-s})$$

**Holds when** $s\in\C\land n\in\N^*$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`6e69fc` · Fungrim entry ↗](https://fungrim.org/entry/6e69fc)

---

$$\mathrm{HurwitzZeta}(-n, 0)=-(\frac{\mathrm{BernoulliB}(n+1)}{n+1})$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`7dab87` · Fungrim entry ↗](https://fungrim.org/entry/7dab87)

---

$$a\mapsto\mathrm{HurwitzZeta}(s, a)^{\prime}(a)=-(s\mathrm{HurwitzZeta}(s+1, a))$$

**Holds when** $0\lt\Re(a)\land s\notin\lbrace0, 1\rbrace\land s\in\C\land a\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`83065e` · Fungrim entry ↗](https://fungrim.org/entry/83065e)

---

$$\mathrm{HurwitzZeta}(2, \frac{1}{2})=\frac{\pi^2}{2}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`868061` · Fungrim entry ↗](https://fungrim.org/entry/868061)

---

$$\mathrm{HurwitzZeta}(s, \frac{1}{4})+\mathrm{HurwitzZeta}(s, \frac{3}{4})=(2^{s}-1)\Zeta(s)\times2^{s}$$

**Holds when** $s\ne1\land s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`8bbb6f` · Fungrim entry ↗](https://fungrim.org/entry/8bbb6f)

---

$$\mathrm{HurwitzZeta}(3, \frac{1}{2})=7\Zeta(3)$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`9417f4` · Fungrim entry ↗](https://fungrim.org/entry/9417f4)

---

$$\mathrm{HurwitzZeta}(2, \frac{3}{4})=\pi^2-8G$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`951f86` · Fungrim entry ↗](https://fungrim.org/entry/951f86)

---

$$\mathrm{HurwitzZeta}(2, 2)=\frac{\pi^2}{6}-1$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`ac8d3c` · Fungrim entry ↗](https://fungrim.org/entry/ac8d3c)

---

$$\mathrm{HurwitzZeta}(s, 1)=\Zeta(s)$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for expansion.
[`af23f7` · Fungrim entry ↗](https://fungrim.org/entry/af23f7)

---

$$\mathrm{HurwitzZeta}(s, \frac{1}{2})=(2^{s}-1)\Zeta(s)$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`af7d3d` · Fungrim entry ↗](https://fungrim.org/entry/af7d3d)

---

$$\mathrm{HurwitzZeta}(3, \frac{3}{4})=28\Zeta(3)-\pi^3$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`b347d3` · Fungrim entry ↗](https://fungrim.org/entry/b347d3)

---

$$\mathrm{HurwitzZeta}(3, 1)=\Zeta(3)$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`b4ed44` · Fungrim entry ↗](https://fungrim.org/entry/b4ed44)

---

$$\mathrm{HurwitzZeta}(s, 2)=\Zeta(s)-1$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`b721b4` · Fungrim entry ↗](https://fungrim.org/entry/b721b4)

---

$$\mathrm{HurwitzZeta}(s, \frac{3}{2})=(2^{s}-1)\Zeta(s)-2^{s}$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`c6d6e2` · Fungrim entry ↗](https://fungrim.org/entry/c6d6e2)

---

$$s\mapsto\mathrm{HurwitzZeta}(s, a)^{\prime}(s)=\mathrm{HurwitzZeta}(s, a, r)$$

**Holds when** $s\ne1\land0\lt\Re(a)\land s\in\C\land a\in\C\land r\in\N$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`d0d03b` · Fungrim entry ↗](https://fungrim.org/entry/d0d03b)

---

$$\mathrm{HurwitzZeta}(0, a)=\frac{1}{2}-a$$

**Holds when** $a\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`d99808` · Fungrim entry ↗](https://fungrim.org/entry/d99808)

---

$$\mathrm{HurwitzZeta}(s, a)=\frac{\mathrm{HurwitzZeta}(s, \frac{a}{2})+\mathrm{HurwitzZeta}(s, \frac{a+1}{2})}{2^{s}}$$

**Holds when** $s\ne1\land0\lt\Re(a)\land s\in\C\land a\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`ebc49c` · Fungrim entry ↗](https://fungrim.org/entry/ebc49c)

---

$$\mathrm{HurwitzZeta}(3, \frac{1}{4})=28\Zeta(3)+\pi^3$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`eda0f3` · Fungrim entry ↗](https://fungrim.org/entry/eda0f3)

---

$$\mathrm{HurwitzZeta}(3, \frac{5}{6})=91\Zeta(3)-2\sqrt{3}\pi^3$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`edad97` · Fungrim entry ↗](https://fungrim.org/entry/edad97)

---

$$\mathrm{GammaLn}(z)=\mathrm{HurwitzZeta}(0, z, 1)+\frac{\ln(2\pi)}{2}$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`f3b870` · Fungrim entry ↗](https://fungrim.org/entry/f3b870)

---

$$\mathrm{HurwitzZeta}(s, 3)=-2^{-s}+\Zeta(s)-1$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`fc6fe0` · Fungrim entry ↗](https://fungrim.org/entry/fc6fe0)

---

## Illustrations of Eisenstein series

$$\mathrm{EisensteinE}(2, \tau)=-(\frac{12\imaginaryI\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)}{\pi\mathrm{DedekindEta}(\tau)})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`03ad5a` · Fungrim entry ↗](https://fungrim.org/entry/03ad5a)

---

$$\mathrm{EisensteinE}(8, \tau)=\mathrm{EisensteinE}(4, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`044128` · Fungrim entry ↗](https://fungrim.org/entry/044128)

---

$$\mathrm{EisensteinE}(2k, \tau)=\frac{\mathrm{EisensteinG}(2k, \tau)}{2\Zeta(2k)}$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`0a2120` · Fungrim entry ↗](https://fungrim.org/entry/0a2120)

---

$$\mathrm{EisensteinE}(6, \tau)=-480\mathrm{DedekindEta}(2\tau)^{12}+\frac{8\,192\mathrm{DedekindEta}(4\tau)^{24}}{\mathrm{DedekindEta}(2\tau)^{12}}+\frac{\mathrm{DedekindEta}(\tau)^{24}}{\mathrm{DedekindEta}(2\tau)^{12}}-\frac{16\,896\mathrm{DedekindEta}(2\tau)^{12}\mathrm{DedekindEta}(4\tau)^8}{\mathrm{DedekindEta}(\tau)^8}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
**Reference:** K. Ono (2004), Web of Modularity: Arithmetic of the Coefficients of Modular Forms and q-series, American Mathematical Society. Theorem 1.67.
[`0a5ef4` · Fungrim entry ↗](https://fungrim.org/entry/0a5ef4)

---

$$\mathrm{EisensteinG}(6, \exp(\frac{2\imaginaryI\pi}{3}))=\frac{\Gamma(1/3)^{18}}{8\,960\pi^6}$$

**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`0fda1b` · Fungrim entry ↗](https://fungrim.org/entry/0fda1b)

---

$$\mathrm{EisensteinE}(6, \tau)=\frac{1}{2}(\mathrm{JacobiTheta}(3, 0, \tau)^{12}+\mathrm{JacobiTheta}(4, 0, \tau)^{12}-3(\mathrm{JacobiTheta}(3, 0, \tau)^4+\mathrm{JacobiTheta}(4, 0, \tau)^4)\mathrm{JacobiTheta}(2, 0, \tau)^8)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`10f3b2` · Fungrim entry ↗](https://fungrim.org/entry/10f3b2)

---

$$\mathrm{EisensteinE}(2k, \tau)=1-\frac{4k(\sum_{n=1}^{\infty}\sum_{m=1}^{\infty}\exp(2\imaginaryI\pi mn\tau)n^{2k-1})}{\mathrm{BernoulliB}(2k)}$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}$.
**Symbols:** **BernoulliB** — Bernoulli number; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`15b347` · Fungrim entry ↗](https://fungrim.org/entry/15b347)

---

$$\mathrm{EisensteinE}(6, \tau)=63(\sum_{m=1}^{\infty}\frac{2\cos(\pi m\tau)^4+11\cos(\pi m\tau)^2+2}{\sin(\pi m\tau)^6})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`171724` · Fungrim entry ↗](https://fungrim.org/entry/171724)

---

$$\mathrm{EisensteinE}(2, \tau)=6(\sum_{m=1}^{\infty}(\sin(\pi m\tau)^2)^{-1})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`18a4d1` · Fungrim entry ↗](https://fungrim.org/entry/18a4d1)

---

$$\mathrm{EisensteinG}(2k, n+\tau)=\mathrm{EisensteinG}(2k, \tau)$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`23a5e0` · Fungrim entry ↗](https://fungrim.org/entry/23a5e0)

---

$$\mathrm{EisensteinE}(2, \exp(\frac{2\imaginaryI\pi}{3}))=\frac{2\sqrt{3}}{\pi}$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`30a054` · Fungrim entry ↗](https://fungrim.org/entry/30a054)

---

$$\mathrm{EisensteinG}(4, \exp(\frac{2\imaginaryI\pi}{3}))=\mathrm{EisensteinE}(4, \exp(\frac{2\imaginaryI\pi}{3}))=0$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series; **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`3102a7` · Fungrim entry ↗](https://fungrim.org/entry/3102a7)

---

$$\mathrm{EisensteinE}(12, \tau)=\frac{1}{691}(250\mathrm{EisensteinE}(6, \tau)^2+441\mathrm{EisensteinE}(4, \tau)^3)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`36fff2` · Fungrim entry ↗](https://fungrim.org/entry/36fff2)

---

$$\mathrm{EisensteinE}(2, \tau)=\frac{6\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)}{\pi^2}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`3bf702` · Fungrim entry ↗](https://fungrim.org/entry/3bf702)

---

$$\tau\mapsto\mathrm{EisensteinE}(6, \tau)^{\prime}(\tau)=\imaginaryI\pi(\mathrm{EisensteinE}(2, \tau)\mathrm{EisensteinE}(6, \tau)-\mathrm{EisensteinE}(4, \tau)^2)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
**Reference:** B. C. Berndt and A. J. Yee (2002) Ramanujan's Contributions to Eisenstein Series, Especially in His Lost Notebook. In: Kanemitsu S., Jia C. (eds) Number Theoretic Methods. Developments in Mathematics, vol 8. Springer, Boston, MA. [https://doi.org/10.1007/978-1-4757-3675-5_3](https://doi.org/10.1007/978-1-4757-3675-5_3)
[`3bfced` · Fungrim entry ↗](https://fungrim.org/entry/3bfced)

---

$$\mathrm{EisensteinE}(4, \tau)=\frac{256\mathrm{DedekindEta}(2\tau)^{16}}{\mathrm{DedekindEta}(\tau)^8}+\frac{\mathrm{DedekindEta}(\tau)^{16}}{\mathrm{DedekindEta}(2\tau)^8}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
**Reference:** K. Ono (2004), Web of Modularity: Arithmetic of the Coefficients of Modular Forms and q-series, American Mathematical Society. Theorem 1.67.
[`4da2cd` · Fungrim entry ↗](https://fungrim.org/entry/4da2cd)

---

$$\mathrm{EisensteinE}(4, \imaginaryI)=\frac{3\Gamma(1/4)^8}{64\pi^6}$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`53fcdd` · Fungrim entry ↗](https://fungrim.org/entry/53fcdd)

---

$$\mathrm{EisensteinG}(2, \imaginaryI)=\pi$$

**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`570399` · Fungrim entry ↗](https://fungrim.org/entry/570399)

---

$$\mathrm{EisensteinE}(6, \exp(\frac{2\imaginaryI\pi}{3}))=\frac{27\Gamma(1/3)^{18}}{512\pi^{12}}$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`6c71c0` · Fungrim entry ↗](https://fungrim.org/entry/6c71c0)

---

$$\mathrm{EisensteinE}(8, \tau)=\frac{1}{2}(\mathrm{JacobiTheta}(2, 0, \tau)^{16}+\mathrm{JacobiTheta}(3, 0, \tau)^{16}+\mathrm{JacobiTheta}(4, 0, \tau)^{16})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`6d2880` · Fungrim entry ↗](https://fungrim.org/entry/6d2880)

---

$$\mathrm{EisensteinE}(2, \tau)=1-12(\sum_{m=1}^{\infty}(\cos(2\pi m\tau)-1)^{-1})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`7b62e4` · Fungrim entry ↗](https://fungrim.org/entry/7b62e4)

---

$$\mathrm{EisensteinE}(2k, \tau)=1-\frac{4k(\sum_{n=1}^{\infty}\mathrm{DivisorSigma}(2k-1, n)\exp(2\imaginaryI\pi n\tau))}{\mathrm{BernoulliB}(2k)}$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}$.
**Symbols:** **BernoulliB** — Bernoulli number; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`7c00e6` · Fungrim entry ↗](https://fungrim.org/entry/7c00e6)

---

$$\tau\mapsto\mathrm{EisensteinE}(2, \tau)^{\prime}(\tau)=\frac{1}{6}(\imaginaryI\pi(\mathrm{EisensteinE}(2, \tau)^2-\mathrm{EisensteinE}(4, \tau)))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
**Reference:** B. C. Berndt and A. J. Yee (2002) Ramanujan's Contributions to Eisenstein Series, Especially in His Lost Notebook. In: Kanemitsu S., Jia C. (eds) Number Theoretic Methods. Developments in Mathematics, vol 8. Springer, Boston, MA. [https://doi.org/10.1007/978-1-4757-3675-5_3](https://doi.org/10.1007/978-1-4757-3675-5_3)
[`7cda09` · Fungrim entry ↗](https://fungrim.org/entry/7cda09)

---

$$\mathrm{EisensteinE}(2k, \tau)=1-\frac{4k(\sum_{n=1}^{\infty}(\exp(2\imaginaryI\pi n\tau)n^{2k-1})/(1-\exp(2\imaginaryI\pi n\tau)))}{\mathrm{BernoulliB}(2k)}$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}$.
**Symbols:** **BernoulliB** — Bernoulli number; **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`848d97` · Fungrim entry ↗](https://fungrim.org/entry/848d97)

---

$$\mathrm{EisensteinE}(14, \tau)=\mathrm{EisensteinE}(4, \tau)\mathrm{EisensteinE}(10, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`9e1f83` · Fungrim entry ↗](https://fungrim.org/entry/9e1f83)

---

$$\mathrm{EisensteinG}(2, \exp(\frac{2\imaginaryI\pi}{3}))=\frac{2\sqrt{3}\pi}{3}$$

**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`9ea739` · Fungrim entry ↗](https://fungrim.org/entry/9ea739)

---

$$\mathrm{EisensteinE}(6, \tau)^2=\frac{1}{8}({(\mathrm{JacobiTheta}(2, 0, \tau)^8+\mathrm{JacobiTheta}(3, 0, \tau)^8+\mathrm{JacobiTheta}(4, 0, \tau)^8)}^3-54(\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau))^8)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a0dff6` · Fungrim entry ↗](https://fungrim.org/entry/a0dff6)

---

$$\mathrm{EisensteinG}(6, \imaginaryI)=\mathrm{EisensteinE}(6, \imaginaryI)=0$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series; **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`a4109c` · Fungrim entry ↗](https://fungrim.org/entry/a4109c)

---

$$\mathrm{EisensteinE}(2, \imaginaryI)=\frac{3}{\pi}$$

**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`a691b3` · Fungrim entry ↗](https://fungrim.org/entry/a691b3)

---

$$\mathrm{EisensteinE}(4, \tau)=30(\sum_{m=1}^{\infty}\frac{\cos(\pi m\tau)^2+1}{\sin(\pi m\tau)^4})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`a92c1a` · Fungrim entry ↗](https://fungrim.org/entry/a92c1a)

---

$$\mathrm{EisensteinE}(10, \tau)=\mathrm{EisensteinE}(4, \tau)\mathrm{EisensteinE}(6, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`adaf5a` · Fungrim entry ↗](https://fungrim.org/entry/adaf5a)

---

$$\tau\mapsto\mathrm{EisensteinE}(4, \tau)^{\prime}(\tau)=\frac{1}{3}(2\imaginaryI\pi(\mathrm{EisensteinE}(2, \tau)\mathrm{EisensteinE}(4, \tau)-\mathrm{EisensteinE}(6, \tau)))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for expansion.
**Reference:** B. C. Berndt and A. J. Yee (2002) Ramanujan's Contributions to Eisenstein Series, Especially in His Lost Notebook. In: Kanemitsu S., Jia C. (eds) Number Theoretic Methods. Developments in Mathematics, vol 8. Springer, Boston, MA. [https://doi.org/10.1007/978-1-4757-3675-5_3](https://doi.org/10.1007/978-1-4757-3675-5_3)
[`af2ea9` · Fungrim entry ↗](https://fungrim.org/entry/af2ea9)

---

$$\mathrm{EisensteinG}(2k, \tau)=2\Zeta(2k)+2(\sum_{m=1}^{\infty}\sum_{n\in \Z}(m\tau+n)^{-2k})$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`b07750` · Fungrim entry ↗](https://fungrim.org/entry/b07750)

---

$$\mathrm{EisensteinG}(2, \tau)=2\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinG** — Eisenstein series; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`b52b6f` · Fungrim entry ↗](https://fungrim.org/entry/b52b6f)

---

$$\mathrm{EisensteinE}(4, \tau)^3-\mathrm{EisensteinE}(6, \tau)^2=\frac{1}{4}(27(\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau))^8)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`bd7d8e` · Fungrim entry ↗](https://fungrim.org/entry/bd7d8e)

---

$$\mathrm{EisensteinE}(4, \tau)=\frac{1}{2}(\mathrm{JacobiTheta}(2, 0, \tau)^8+\mathrm{JacobiTheta}(3, 0, \tau)^8+\mathrm{JacobiTheta}(4, 0, \tau)^8)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cc579c` · Fungrim entry ↗](https://fungrim.org/entry/cc579c)

---

$$\mathrm{EisensteinE}(2k, n+\tau)=\mathrm{EisensteinE}(2k, \tau)$$

**Holds when** $k\in\N^*\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`d56eb6` · Fungrim entry ↗](https://fungrim.org/entry/d56eb6)

---

$$\mathrm{EisensteinG}(2, \tau)=-(\frac{1}{\mathrm{DedekindEta}(\tau)}(4\imaginaryI\pi\tau\mapsto\mathrm{DedekindEta}(\tau)^{\prime}(\tau)))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`dbf388` · Fungrim entry ↗](https://fungrim.org/entry/dbf388)

---

$$\mathrm{EisensteinG}(4, \imaginaryI)=\frac{\Gamma(1/4)^8}{960\pi^2}$$

**Symbols:** **EisensteinG** — Eisenstein series.
Used by the Compute Engine for simplification.
[`e03b7c` · Fungrim entry ↗](https://fungrim.org/entry/e03b7c)

---

$$\mathrm{EisensteinE}(14, \tau)=\mathrm{EisensteinE}(6, \tau)\mathrm{EisensteinE}(4, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`e60fd4` · Fungrim entry ↗](https://fungrim.org/entry/e60fd4)

---

$$\mathrm{EisensteinE}(14, \tau)=\mathrm{EisensteinE}(6, \tau)\mathrm{EisensteinE}(8, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series.
Used by the Compute Engine for simplification.
[`feb95e` · Fungrim entry ↗](https://fungrim.org/entry/feb95e)

---

## Imaginary unit

$$\mathrm{sgn}(\imaginaryI)=\imaginaryI$$

Used by the Compute Engine for simplification.
[`09c107` · Fungrim entry ↗](https://fungrim.org/entry/09c107)

---

$$\imaginaryI^{z}=\imaginaryI\sin(\frac{\pi z}{2})+\cos(\frac{\pi z}{2})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`15f92d` · Fungrim entry ↗](https://fungrim.org/entry/15f92d)

---

$$\mathrm{PolyLog}(2, \imaginaryI)=\imaginaryI G-\frac{\pi^2}{48}$$

Used by the Compute Engine for simplification.
[`208da7` · Fungrim entry ↗](https://fungrim.org/entry/208da7)

---

$$\Re(\imaginaryI)=0$$

Used by the Compute Engine for simplification.
[`249fd6` · Fungrim entry ↗](https://fungrim.org/entry/249fd6)

---

$$\imaginaryI^2=-1$$

Used by the Compute Engine for simplification.
[`31b0df` · Fungrim entry ↗](https://fungrim.org/entry/31b0df)

---

$$\Im(\mathrm{Digamma}(\imaginaryI))=\frac{1}{2}(1+\pi\coth(\pi))$$

Used by the Compute Engine for simplification.
[`3ac0ce` · Fungrim entry ↗](https://fungrim.org/entry/3ac0ce)

---

$$\imaginaryI^\star=-\imaginaryI$$

Used by the Compute Engine for simplification.
[`44ae4a` · Fungrim entry ↗](https://fungrim.org/entry/44ae4a)

---

$$\Im(\imaginaryI)=1$$

Used by the Compute Engine for simplification.
[`61784f` · Fungrim entry ↗](https://fungrim.org/entry/61784f)

---

$$\vert\imaginaryI\vert=1$$

Used by the Compute Engine for simplification.
[`65bbd6` · Fungrim entry ↗](https://fungrim.org/entry/65bbd6)

---

$$\frac{1}{\imaginaryI}=-\imaginaryI$$

Used by the Compute Engine for simplification.
[`67c262` · Fungrim entry ↗](https://fungrim.org/entry/67c262)

---

$$\imaginaryI^3=-\imaginaryI$$

Used by the Compute Engine for simplification.
[`8be138` · Fungrim entry ↗](https://fungrim.org/entry/8be138)

---

$$\vert\Gamma(\imaginaryI)\vert=\sqrt{\frac{\pi}{\sinh(\pi)}}$$

Used by the Compute Engine for simplification.
[`9c93bb` · Fungrim entry ↗](https://fungrim.org/entry/9c93bb)

---

$$\imaginaryI^{\imaginaryI}=\exp(-(\frac{\pi}{2}))$$

Used by the Compute Engine for simplification.
[`a39534` · Fungrim entry ↗](https://fungrim.org/entry/a39534)

---

$$\imaginaryI^{n}=\begin{cases}1&\mathrm{CongruentMod}(n, 0, 4)\\\imaginaryI&\mathrm{CongruentMod}(n, 1, 4)\\-1&\mathrm{CongruentMod}(n, 2, 4)\\-\imaginaryI&\mathrm{CongruentMod}(n, 3, 4)\end{cases}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`c12a41` · Fungrim entry ↗](https://fungrim.org/entry/c12a41)

---

$$\imaginaryI^4=1$$

Used by the Compute Engine for simplification.
[`e0425a` · Fungrim entry ↗](https://fungrim.org/entry/e0425a)

---

$$\imaginaryI^{z}=\exp(\frac{\imaginaryI\pi z}{2})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f8a56f` · Fungrim entry ↗](https://fungrim.org/entry/f8a56f)

---

## Integer sequences

$$\mathrm{Fibonacci}(n)=\mathrm{SloaneA}(\text{A000045}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`373aa1` · Fungrim entry ↗](https://fungrim.org/entry/373aa1)

---

$$\mathrm{PrimePi}(n)=\mathrm{SloaneA}(\text{A000720}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **PrimePi** — Prime counting function; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`4fa169` · Fungrim entry ↗](https://fungrim.org/entry/4fa169)

---

$$\mathrm{BellNumber}(n)=\mathrm{SloaneA}(\text{A000110}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`60dc3e` · Fungrim entry ↗](https://fungrim.org/entry/60dc3e)

---

$$\mathrm{LandauG}(n)=\mathrm{SloaneA}(\text{A000793}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **LandauG** — Landau's function; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`6af603` · Fungrim entry ↗](https://fungrim.org/entry/6af603)

---

$$\mathrm{NPartition}(n)=\mathrm{SloaneA}(\text{A000041}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`8eed2c` · Fungrim entry ↗](https://fungrim.org/entry/8eed2c)

---

$$\mathrm{PrimeNumber}(n)=\mathrm{SloaneA}(\text{A000040}, n)$$

**Holds when** $n\in\N^*$.
**Symbols:** **PrimeNumber** — nth prime number; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`9d0839` · Fungrim entry ↗](https://fungrim.org/entry/9d0839)

---

$$\mathrm{BernoulliB}(n)=\frac{\mathrm{SloaneA}(\text{A027641}, n)}{\mathrm{SloaneA}(\text{A027642}, n)}$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`b6111c` · Fungrim entry ↗](https://fungrim.org/entry/b6111c)

---

$$n!=\mathrm{SloaneA}(\text{A000142}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`d12aa0` · Fungrim entry ↗](https://fungrim.org/entry/d12aa0)

---

## Inverse tangent

$$\arctan(x)-\arctan(y)=\mathrm{Arctan_2}(x-y, xy+1)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for expansion.
[`00e608` · Fungrim entry ↗](https://fungrim.org/entry/00e608)

---

$$\arctan(\imaginaryI z)=\imaginaryI\mathrm{artanh}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`072166` · Fungrim entry ↗](https://fungrim.org/entry/072166)

---

$$\cos(\arctan(z))=\frac{1}{\sqrt{z^2+1}}$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
Used by the Compute Engine for simplification.
[`0b829e` · Fungrim entry ↗](https://fungrim.org/entry/0b829e)

---

$$\arctan(-z)=-\arctan(z)$$

**Holds when** $z\in\C\cup\lbrace-\infty, \infty\rbrace$.
Used by the Compute Engine for expansion.
[`0ee626` · Fungrim entry ↗](https://fungrim.org/entry/0ee626)

---

$$\arctan(z)=-(\frac{1}{2}(\imaginaryI\ln((\imaginaryI z+1)/(1-\imaginaryI z))))$$

**Holds when** $\imaginaryI z\notin\lbrack1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for simplification.
[`12765e` · Fungrim entry ↗](https://fungrim.org/entry/12765e)

---

$$\arctan(1)=\frac{\pi}{4}$$

Used by the Compute Engine for simplification.
[`157c6c` · Fungrim entry ↗](https://fungrim.org/entry/157c6c)

---

$$\tan(\arctan(z))=z$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification and equation solving.
[`1f026d` · Fungrim entry ↗](https://fungrim.org/entry/1f026d)

---

$$\mathrm{Arctan_2}(y, x)=\begin{cases}0&x=y=0\\\arctan(\frac{y}{x})&0\lt x\\\frac{\pi\mathrm{sgn}(y)}{2}-\arctan(x/y)&y\ne0\\\pi&x\lt0\land y=0\end{cases}$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`22fb4a` · Fungrim entry ↗](https://fungrim.org/entry/22fb4a)

---

$$\arctan(x+y)=\arctan(x)+\arctan((y)(x(x+y)+1)^{-1})$$

**Holds when** $\vert x\vert\lt1\land\vert x+y\vert\lt1\land x\in\C\land y\in\C$ &nbsp;_or_&nbsp; $-1\lt x(x+y)\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`268c9e` · Fungrim entry ↗](https://fungrim.org/entry/268c9e)

---

$$\arctan(z)=z\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, -z^2)$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`34ff28` · Fungrim entry ↗](https://fungrim.org/entry/34ff28)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{((z+\imaginaryI)^{-n}-(z-\imaginaryI)^{-n})(n-1)!\times(-1)^{n}}{2\imaginaryI}$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land n\in\N^*\land z\in\C$.
Used by the Compute Engine for expansion.
[`36171f` · Fungrim entry ↗](https://fungrim.org/entry/36171f)

---

$$\arctan(\frac{\sqrt{3}}{3})=\frac{\pi}{6}$$

Used by the Compute Engine for simplification.
[`3c1021` · Fungrim entry ↗](https://fungrim.org/entry/3c1021)

---

$$\arctan(x)+\arctan(y)=\arctan(\frac{x+y}{1-xy})$$

**Holds when** $\vert x\vert\lt1\land\vert y\vert\lt1\land x\in\C\land y\in\C$ &nbsp;_or_&nbsp; $xy\lt1\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`3ea11b` · Fungrim entry ↗](https://fungrim.org/entry/3ea11b)

---

$$\vert\arctan(x+y)-\arctan(x)\vert=\mathrm{Arctan_2}(\vert y\vert, x(x+y)+1)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`47331d` · Fungrim entry ↗](https://fungrim.org/entry/47331d)

---

$$\arctan(z)=\frac{1}{2}(\imaginaryI\ln(\frac{1-\imaginaryI z}{\imaginaryI z+1}))$$

**Holds when** $-(\imaginaryI z)\notin\lbrack1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for simplification.
[`500c0a` · Fungrim entry ↗](https://fungrim.org/entry/500c0a)

---

$$\arctan(x)-\arctan(y)=\arctan(\frac{x-y}{xy+1})$$

**Holds when** $\vert x\vert\lt1\land\vert y\vert\lt1\land x\in\C\land y\in\C$ &nbsp;_or_&nbsp; $-1\lt xy\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`503d4d` · Fungrim entry ↗](https://fungrim.org/entry/503d4d)

---

$$\arctan(z^\star)=\arctan(z)^\star$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rparen\cup\lparen1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for expansion.
[`632063` · Fungrim entry ↗](https://fungrim.org/entry/632063)

---

$$\arctan(0)=0$$

Used by the Compute Engine for simplification.
[`645e30` · Fungrim entry ↗](https://fungrim.org/entry/645e30)

---

$$\arctan(z)=2\arctan((z)(\sqrt{z^2+1}+1)^{-1})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`67c0be` · Fungrim entry ↗](https://fungrim.org/entry/67c0be)

---

$$\arctan(\sqrt{3})=\frac{\pi}{3}$$

Used by the Compute Engine for simplification.
[`706783` · Fungrim entry ↗](https://fungrim.org/entry/706783)

---

$$\arctan(-\infty)=-(\frac{\pi}{2})$$

Used by the Compute Engine for simplification.
[`7295b5` · Fungrim entry ↗](https://fungrim.org/entry/7295b5)

---

$$\mathrm{Arctan_2}(y, 0)=\frac{\pi\mathrm{sgn}(y)}{2}$$

**Holds when** $y\in\R$.
Used by the Compute Engine for simplification.
[`77e519` · Fungrim entry ↗](https://fungrim.org/entry/77e519)

---

$$\arctan(z)=\arcsin(\frac{z}{\sqrt{z^2+1}})$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for simplification.
[`7954ad` · Fungrim entry ↗](https://fungrim.org/entry/7954ad)

---

$$\arctan(2-\sqrt{3})=\frac{\pi}{12}$$

Used by the Compute Engine for simplification.
[`7dd050` · Fungrim entry ↗](https://fungrim.org/entry/7dd050)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{1}{z^2+1}$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for simplification.
[`8fbf69` · Fungrim entry ↗](https://fungrim.org/entry/8fbf69)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{(n-1)!\mathrm{ChebyshevU}(n-1, -(z/(z^2+1)^{1/2}))}{{(z^2+1)}^{\frac{n+1}{2}}}$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land n\in\N^*\land z\in\C$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
**Reference:** M. A. Boutiche and M. Rahmani (2017), On the higher derivatives of the inverse tangent function, [https://arxiv.org/abs/1712.03521,](https://arxiv.org/abs/1712.03521,) Theorem 9
[`90631b` · Fungrim entry ↗](https://fungrim.org/entry/90631b)

---

$$\arctan(-\imaginaryI)=-\infty\imaginaryI$$

Used by the Compute Engine for simplification.
[`9b0994` · Fungrim entry ↗](https://fungrim.org/entry/9b0994)

---

$$\mathrm{Arctan_2}(y, x)=-(\imaginaryI\ln(\mathrm{sgn}(x+\imaginaryI y)))$$

**Holds when** $x+\imaginaryI y\ne0\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`9dec3e` · Fungrim entry ↗](https://fungrim.org/entry/9dec3e)

---

$$\arctan(z)=\frac{1}{2}(\imaginaryI(\ln(1-\imaginaryI z)-\ln(\imaginaryI z+1)))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`a18b77` · Fungrim entry ↗](https://fungrim.org/entry/a18b77)

---

$$\arctan(\imaginaryI)=\infty\imaginaryI$$

Used by the Compute Engine for simplification.
[`a2d208` · Fungrim entry ↗](https://fungrim.org/entry/a2d208)

---

$$z\mapsto\arctan(z)^{\doubleprime}(z)=-(\frac{2z}{(z^2+1)^2})$$

**Holds when** $\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land z\in\C$.
Used by the Compute Engine for simplification.
[`a4eb86` · Fungrim entry ↗](https://fungrim.org/entry/a4eb86)

---

$$\mathrm{Arctan_2}(0, x)=\begin{cases}0&0\le x\\\pi&x\lt0\end{cases}$$

**Holds when** $x\in\R$.
Used by the Compute Engine for simplification.
[`a6776b` · Fungrim entry ↗](https://fungrim.org/entry/a6776b)

---

$$\arctan(\sqrt{2}-1)=\frac{\pi}{8}$$

Used by the Compute Engine for simplification.
[`a9ecff` · Fungrim entry ↗](https://fungrim.org/entry/a9ecff)

---

$$\arctan(2+\sqrt{3})=\frac{5\pi}{12}$$

Used by the Compute Engine for simplification.
[`b0049f` · Fungrim entry ↗](https://fungrim.org/entry/b0049f)

---

$$\Im(\arctan(x+\imaginaryI y))=\frac{1}{4}(\ln(\frac{x^2+(y+1)^2}{x^2+(1-y)^2}))$$

**Holds when** $x+\imaginaryI y\notin\lbrace-\imaginaryI, \imaginaryI\rbrace\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`b65d19` · Fungrim entry ↗](https://fungrim.org/entry/b65d19)

---

$$\arctan(\frac{1}{z})=\frac{1}{2}(\pi\mathrm{Csgn}(1/z))-\arctan(z)$$

**Holds when** $\imaginaryI z\notin\lbrace0\rbrace\cup\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen\land z\in\C$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`bfc13f` · Fungrim entry ↗](https://fungrim.org/entry/bfc13f)

---

$$\arctan(z)=\mathrm{arcctg}(\frac{1}{z})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`c580f4` · Fungrim entry ↗](https://fungrim.org/entry/c580f4)

---

$$\arctan(1+\sqrt{2})=\frac{3\pi}{8}$$

Used by the Compute Engine for simplification.
[`c6c92a` · Fungrim entry ↗](https://fungrim.org/entry/c6c92a)

---

$$\arctan(x)+\arctan(y)=\mathrm{Arctan_2}(x+y, 1-xy)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`cf64b3` · Fungrim entry ↗](https://fungrim.org/entry/cf64b3)

---

$$\arctan(\infty)=\frac{\pi}{2}$$

Used by the Compute Engine for simplification.
[`d418d3` · Fungrim entry ↗](https://fungrim.org/entry/d418d3)

---

$$\sin(\arctan(z))=\frac{z}{\sqrt{z^2+1}}$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
Used by the Compute Engine for simplification.
[`d4b0b6` · Fungrim entry ↗](https://fungrim.org/entry/d4b0b6)

---

$$\arctan(z)=\arccos(\frac{1}{\sqrt{z^2+1}})\mathrm{Csgn}(z)$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`ec7f2d` · Fungrim entry ↗](https://fungrim.org/entry/ec7f2d)

---

$$\mathrm{Arctan_2}(y, x)=\Im(\ln(x+\imaginaryI y))$$

**Holds when** $x+\imaginaryI y\ne0\land x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`eca4ce` · Fungrim entry ↗](https://fungrim.org/entry/eca4ce)

---

$$\arctan(\tan(\theta))=\theta$$

**Holds when** $-(\frac{\pi}{2})\lt\Re(\theta)\lt\frac{\pi}{2}\land\theta\in\C$.
Used by the Compute Engine for simplification and equation solving.
[`f516e3` · Fungrim entry ↗](https://fungrim.org/entry/f516e3)

---

## Jacobi theta functions

$$\mathrm{JacobiTheta}(3, 4z, 4\tau)=\frac{\mathrm{JacobiTheta}(3, z+\frac{1}{8}, \tau)\mathrm{JacobiTheta}(3, z+\frac{3}{8}, \tau)\mathrm{JacobiTheta}(3, 1/8-z, \tau)\mathrm{JacobiTheta}(3, 3/8-z, \tau)}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, \frac{1}{4}, \tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0096a8` · Fungrim entry ↗](https://fungrim.org/entry/0096a8)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(3, z, \tau)}{\mathrm{JacobiTheta}(1, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}{\mathrm{JacobiTheta}(1, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0373dc` · Fungrim entry ↗](https://fungrim.org/entry/0373dc)

---

$$\mathrm{JacobiTheta}(4, 0, \tau, 2r+1)=0$$

**Holds when** $\tau\in\mathrm{HH}\land r\in\N$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`055b0a` · Fungrim entry ↗](https://fungrim.org/entry/055b0a)

---

$$\mathrm{JacobiTheta}(2, z, \frac{-1}{\tau})=\mathrm{JacobiTheta}(4, \tau z, \tau)\exp(\imaginaryI\pi\tau z^2)\sqrt{\frac{\tau}{\imaginaryI}}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`06319a` · Fungrim entry ↗](https://fungrim.org/entry/06319a)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^2=4(\sum_{n=1}^{\infty}\frac{\exp(\imaginaryI\pi n\tau)}{\exp(2\imaginaryI\pi n\tau)+1})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0650f8` · Fungrim entry ↗](https://fungrim.org/entry/0650f8)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)=\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(3, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)-\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(2, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`077394` · Fungrim entry ↗](https://fungrim.org/entry/077394)

---

$$\mathrm{JacobiTheta}(2, z, \tau)=\mathrm{JacobiTheta}(3, \frac{\tau}{2}+z, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0878a4` · Fungrim entry ↗](https://fungrim.org/entry/0878a4)

---

$$\mathrm{JacobiTheta}(1, z, \tau)^4+\mathrm{JacobiTheta}(3, z, \tau)^4=\mathrm{JacobiTheta}(2, z, \tau)^4+\mathrm{JacobiTheta}(4, z, \tau)^4$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`08822c` · Fungrim entry ↗](https://fungrim.org/entry/08822c)

---

$$\mathrm{JacobiTheta}(3, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(3, z+\frac{1}{4}, \tau)\mathrm{JacobiTheta}(3, 1/4-z, \tau)}{\mathrm{JacobiTheta}(4, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0a9ec2` · Fungrim entry ↗](https://fungrim.org/entry/0a9ec2)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2=\mathrm{JacobiTheta}(2, 0, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2-\mathrm{JacobiTheta}(4, 0, \tau)^2\mathrm{JacobiTheta}(1, z, \tau)^2$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`0e2635` · Fungrim entry ↗](https://fungrim.org/entry/0e2635)

---

$$\mathrm{JacobiTheta}(3, \tau+z, \tau)=\mathrm{JacobiTheta}(3, z, \tau)\exp(-(\imaginaryI\pi(\tau+2z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`103bfb` · Fungrim entry ↗](https://fungrim.org/entry/103bfb)

---

$$\mathrm{JacobiTheta}(4, z, \tau)=\imaginaryI\mathrm{JacobiTheta}(2, \frac{\tau}{2}+z+\frac{1}{2}, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`10ca40` · Fungrim entry ↗](https://fungrim.org/entry/10ca40)

---

$$\mathrm{JacobiTheta}(3, 0, \imaginaryI)=\frac{\sqrt{2}\Gamma(\frac{1}{4})}{2\pi^{\frac{3}{4}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1403b5` · Fungrim entry ↗](https://fungrim.org/entry/1403b5)

---

$$\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)=\mathrm{JacobiTheta}(3, w+z, 2\tau)\mathrm{JacobiTheta}(2, z-w, 2\tau)-\mathrm{JacobiTheta}(2, w+z, 2\tau)\mathrm{JacobiTheta}(3, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1792a9` · Fungrim entry ↗](https://fungrim.org/entry/1792a9)

---

$$\mathrm{JacobiTheta}(4, z, 2n+\tau)=\mathrm{JacobiTheta}(4, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`19acd8` · Fungrim entry ↗](https://fungrim.org/entry/19acd8)

---

$$(\mathrm{JacobiTheta}(1, z, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2)\mathrm{JacobiTheta}(2, 0, 2\tau)=(\mathrm{JacobiTheta}(4, z, \tau)^2-\mathrm{JacobiTheta}(3, z, \tau)^2)\mathrm{JacobiTheta}(3, 0, 2\tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`1c67c8` · Fungrim entry ↗](https://fungrim.org/entry/1c67c8)

---

$$\mathrm{JacobiTheta}(4, 0, \tau)^4-\mathrm{JacobiTheta}(2, 0, \tau)^4=1-24(\sum_{n=0}^{\infty}\frac{(2n+1)\exp(\imaginaryI\pi\tau(2n+1))}{\exp(\imaginaryI\pi\tau(2n+1))+1})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1cec67` · Fungrim entry ↗](https://fungrim.org/entry/1cec67)

---

$$\mathrm{JacobiTheta}(1, z, n+\tau)=\mathrm{JacobiTheta}(1, z, \tau)\exp(\frac{\imaginaryI\pi n}{4})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1fa8e7` · Fungrim entry ↗](https://fungrim.org/entry/1fa8e7)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^4=\mathrm{JacobiTheta}(2, 0, \tau)^4+\mathrm{JacobiTheta}(4, 0, \tau)^4$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1fbc09` · Fungrim entry ↗](https://fungrim.org/entry/1fbc09)

---

$$\mathrm{JacobiTheta}(2, w+z, \tau)\mathrm{JacobiTheta}(2, z-w, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`1feda6` · Fungrim entry ↗](https://fungrim.org/entry/1feda6)

---

$$\mathrm{JacobiTheta}(3, 2z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)^4+\mathrm{JacobiTheta}(3, z, \tau)^4}{\mathrm{JacobiTheta}(3, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`20d581` · Fungrim entry ↗](https://fungrim.org/entry/20d581)

---

$$2\mathrm{JacobiTheta}(2, 0, 2\tau)^2=\mathrm{JacobiTheta}(3, 0, \tau)^2-\mathrm{JacobiTheta}(4, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`21c2f7` · Fungrim entry ↗](https://fungrim.org/entry/21c2f7)

---

$$\mathrm{JacobiTheta}(4, 2z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2+\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2}{\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`21dc98` · Fungrim entry ↗](https://fungrim.org/entry/21dc98)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(3, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}{\mathrm{JacobiTheta}(3, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`23077c` · Fungrim entry ↗](https://fungrim.org/entry/23077c)

---

$$\mathrm{JacobiTheta}(3, z, \tau)=\mathrm{JacobiTheta}(1, \frac{\tau}{2}+z+\frac{1}{2}, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`235d0d` · Fungrim entry ↗](https://fungrim.org/entry/235d0d)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2=\mathrm{JacobiTheta}(3, 0, \tau)^2\mathrm{JacobiTheta}(1, z, \tau)^2+\mathrm{JacobiTheta}(4, 0, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`265d9c` · Fungrim entry ↗](https://fungrim.org/entry/265d9c)

---

$$\frac{\mathrm{JacobiTheta}(1, 0, \tau, 3)}{\mathrm{JacobiTheta}(1, 0, \tau, 1)}=\frac{\mathrm{JacobiTheta}(2, 0, \tau, 2)}{\mathrm{JacobiTheta}(2, 0, \tau)}+\frac{\mathrm{JacobiTheta}(3, 0, \tau, 2)}{\mathrm{JacobiTheta}(3, 0, \tau)}+\frac{\mathrm{JacobiTheta}(4, 0, \tau, 2)}{\mathrm{JacobiTheta}(4, 0, \tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`278274` · Fungrim entry ↗](https://fungrim.org/entry/278274)

---

$$\mathrm{JacobiTheta}(1, 4z, 4\tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(1, z+\frac{1}{4}, \tau)\mathrm{JacobiTheta}(1, 1/4-z, \tau)}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, \frac{1}{4}, \tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`27b169` · Fungrim entry ↗](https://fungrim.org/entry/27b169)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(3, z, \tau)}{\mathrm{JacobiTheta}(2, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}{\mathrm{JacobiTheta}(2, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`2853d4` · Fungrim entry ↗](https://fungrim.org/entry/2853d4)

---

$$\mathrm{JacobiTheta}(3, z, n+\tau)=\begin{cases}\mathrm{JacobiTheta}(3, z, \tau)&\lnot\mathrm{IsOdd}(n)\\\mathrm{JacobiTheta}(4, z, \tau)&\mathrm{IsOdd}(n)\end{cases}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`28b4c3` · Fungrim entry ↗](https://fungrim.org/entry/28b4c3)

---

$$\mathrm{JacobiTheta}(3, \frac{\tau}{2}+z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\exp(-(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`2d2dde` · Fungrim entry ↗](https://fungrim.org/entry/2d2dde)

---

$$\mathrm{JacobiTheta}(3, n\tau+m+z, \tau)=\mathrm{JacobiTheta}(3, z, \tau)\exp(-(\imaginaryI\pi(\tau n^2+2nz)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land m\in\Z\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`2e4da0` · Fungrim entry ↗](https://fungrim.org/entry/2e4da0)

---

$$\mathrm{JacobiTheta}(1, \frac{n}{4}, \imaginaryI)=\begin{cases}0&\mathrm{CongruentMod}(n, 0, 4)\\\mathrm{JacobiTheta}(4, 0, \imaginaryI)\times(-1)^{\lfloor n/4\rfloor}&\mathrm{CongruentMod}(n, 2, 4)\\\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times(-1)^{\lfloor n/4\rfloor}\times2^{\frac{-7}{16}}\sqrt{2^{1/2}-1}\sqrt[4]{1+\sqrt{2}}&\top\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`2f3ed3` · Fungrim entry ↗](https://fungrim.org/entry/2f3ed3)

---

$$\mathrm{JacobiTheta}(1, 2n+z, \tau)=\mathrm{JacobiTheta}(1, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`2faeb9` · Fungrim entry ↗](https://fungrim.org/entry/2faeb9)

---

$$\mathrm{JacobiTheta}(3, 0, 1+\frac{\imaginaryI}{2})=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI){(2^{1/2}-1)}^{\frac{2}{3}}\sqrt[12]{4+3\sqrt{2}}}{2^{\frac{7}{24}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`324483` · Fungrim entry ↗](https://fungrim.org/entry/324483)

---

$$\mathrm{JacobiTheta}(3, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)^2+\mathrm{JacobiTheta}(2, z, \tau)^2}{2\mathrm{JacobiTheta}(2, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`3479be` · Fungrim entry ↗](https://fungrim.org/entry/3479be)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(2, z-w, \tau)=\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)+\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(2, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`34d1c6` · Fungrim entry ↗](https://fungrim.org/entry/34d1c6)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(3, z, \tau)}{\mathrm{JacobiTheta}(4, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}{\mathrm{JacobiTheta}(4, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`378949` · Fungrim entry ↗](https://fungrim.org/entry/378949)

---

$$\tau\mapsto\mathrm{JacobiTheta}(j, z, \tau, s)^{\prime}(\tau)=\frac{\mathrm{JacobiTheta}(j, z, \tau, 2r+s)}{(4\imaginaryI\pi)^{r}}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land r\in\N\land s\in\N\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`37e644` · Fungrim entry ↗](https://fungrim.org/entry/37e644)

---

$$\mathrm{JacobiTheta}(3, -z, \tau)=\mathrm{JacobiTheta}(3, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`380076` · Fungrim entry ↗](https://fungrim.org/entry/380076)

---

$$\mathrm{JacobiTheta}(3, 0, 1+10\imaginaryI)=\frac{\sqrt{5}\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{7}{8}}}{5(\sqrt[4]{5}-1)\sqrt{1+\sqrt{5}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`390158` · Fungrim entry ↗](https://fungrim.org/entry/390158)

---

$$\mathrm{JacobiTheta}(2, 2z, \tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^4-\mathrm{JacobiTheta}(1, z, \tau)^4}{\mathrm{JacobiTheta}(2, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`3a77e0` · Fungrim entry ↗](https://fungrim.org/entry/3a77e0)

---

$$\mathrm{JacobiTheta}(4, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2+\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2+\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`3cac28` · Fungrim entry ↗](https://fungrim.org/entry/3cac28)

---

$$\mathrm{JacobiTheta}(3, \frac{n}{4}, \imaginaryI)=\begin{cases}\mathrm{JacobiTheta}(3, 0, \imaginaryI)&\mathrm{CongruentMod}(n, 0, 4)\\\mathrm{JacobiTheta}(4, 0, \imaginaryI)&\mathrm{CongruentMod}(n, 2, 4)\\\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{-7}{16}}\sqrt[4]{1+\sqrt{2}}&\top\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`3fb309` · Fungrim entry ↗](https://fungrim.org/entry/3fb309)

---

$$\mathrm{JacobiTheta}(3, 0, \frac{\imaginaryI}{2})=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[4]{2}\sqrt{\frac{1+\sqrt{2}}{2}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`4256f0` · Fungrim entry ↗](https://fungrim.org/entry/4256f0)

---

$$\mathrm{JacobiTheta}(4, \frac{\tau}{2}+z, \tau)=\imaginaryI\mathrm{JacobiTheta}(1, z, \tau)\exp(-(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`429093` · Fungrim entry ↗](https://fungrim.org/entry/429093)

---

$$\mathrm{JacobiTheta}(1, n\tau+m+z, \tau)=\mathrm{JacobiTheta}(1, z, \tau)\times(-1)^{m+n}\exp(-(\imaginaryI\pi(\tau n^2+2nz)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land m\in\Z\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`43fa0e` · Fungrim entry ↗](https://fungrim.org/entry/43fa0e)

---

$$\mathrm{JacobiTheta}(4, n+z, \tau)=\mathrm{JacobiTheta}(4, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`4448f1` · Fungrim entry ↗](https://fungrim.org/entry/4448f1)

---

$$\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(1, z-w, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`45165c` · Fungrim entry ↗](https://fungrim.org/entry/45165c)

---

$$\mathrm{JacobiTheta}(4, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`45a130` · Fungrim entry ↗](https://fungrim.org/entry/45a130)

---

$$2\mathrm{JacobiTheta}(4, 0, 2\tau)\mathrm{JacobiTheta}(1, 0, 2\tau, 1)=\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(1, 0, \tau, 1)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`46f244` · Fungrim entry ↗](https://fungrim.org/entry/46f244)

---

$$\mathrm{JacobiTheta}(2, 0, \tau, 2r+1)=0$$

**Holds when** $\tau\in\mathrm{HH}\land r\in\N$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`474c51` · Fungrim entry ↗](https://fungrim.org/entry/474c51)

---

$$\mathrm{JacobiTheta}(3, 0, \frac{\tau}{2})\mathrm{JacobiTheta}(4, 0, \frac{\tau}{2})=\mathrm{JacobiTheta}(4, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`476642` · Fungrim entry ↗](https://fungrim.org/entry/476642)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(3, z-w, \tau)=\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)+\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(3, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`47e587` · Fungrim entry ↗](https://fungrim.org/entry/47e587)

---

$$\mathrm{JacobiTheta}(2, 0, \imaginaryI y)=\frac{1}{\sqrt{y}}(\mathrm{JacobiTheta}(3, 0, \frac{\imaginaryI}{y}+1))$$

**Holds when** $y\in\lparen0, \infty\rparen$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`47f4ba` · Fungrim entry ↗](https://fungrim.org/entry/47f4ba)

---

$$\mathrm{JacobiTheta}(2, z+\frac{1}{2}, \tau)=-\mathrm{JacobiTheta}(1, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`47f6dd` · Fungrim entry ↗](https://fungrim.org/entry/47f6dd)

---

$$\mathrm{JacobiTheta}(3, 0, 5\imaginaryI)=\frac{\sqrt{5}\mathrm{JacobiTheta}(3, 0, \imaginaryI)}{5\sqrt{5^{1/2}-2}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`483e7e` · Fungrim entry ↗](https://fungrim.org/entry/483e7e)

---

$$\mathrm{JacobiTheta}(2, w+z, \tau)\mathrm{JacobiTheta}(2, z-w, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2-\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`48a1c6` · Fungrim entry ↗](https://fungrim.org/entry/48a1c6)

---

$$\mathrm{JacobiTheta}(1, z, \tau)=-(\imaginaryI\mathrm{JacobiTheta}(4, \frac{\tau}{2}+z, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`4c462b` · Fungrim entry ↗](https://fungrim.org/entry/4c462b)

---

$$\mathrm{JacobiTheta}(3, 0, 1+\imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[-4]{2}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`4c8873` · Fungrim entry ↗](https://fungrim.org/entry/4c8873)

---

$$\mathrm{JacobiTheta}(2, z, 4n+\tau)=\mathrm{JacobiTheta}(2, z, \tau)\times(-1)^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`4cf228` · Fungrim entry ↗](https://fungrim.org/entry/4cf228)

---

$$\mathrm{JacobiTheta}(4, 0, \tau)^8=16(\sum_{n=1}^{\infty}\frac{n^3\times(-1)^{n}\exp(\imaginaryI\pi n\tau)}{1-\exp(\imaginaryI\pi n\tau)})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`4d26ec` · Fungrim entry ↗](https://fungrim.org/entry/4d26ec)

---

$$\mathrm{JacobiTheta}(4, -z, \tau)=\mathrm{JacobiTheta}(4, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`4f939e` · Fungrim entry ↗](https://fungrim.org/entry/4f939e)

---

$$\mathrm{JacobiTheta}(3, 0, \frac{\imaginaryI}{3})=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[4]{3+2\sqrt{3}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`52302f` · Fungrim entry ↗](https://fungrim.org/entry/52302f)

---

$$\mathrm{JacobiTheta}(3, 0, 1+6\imaginaryI)=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[3]{1+\sqrt{3}+\sqrt{2}\sqrt[4]{27}}}{2^{\frac{11}{24}}\times3^{\frac{3}{8}}\sqrt[6]{3^{1/2}-1}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`5384f3` · Fungrim entry ↗](https://fungrim.org/entry/5384f3)

---

$$\mathrm{JacobiTheta}(3, 2z, 4\tau)=\frac{1}{2}(\mathrm{JacobiTheta}(3, z, \tau)+\mathrm{JacobiTheta}(4, z, \tau))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`53fef4` · Fungrim entry ↗](https://fungrim.org/entry/53fef4)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)=2\mathrm{DedekindEta}(\tau)^3$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`557b19` · Fungrim entry ↗](https://fungrim.org/entry/557b19)

---

$$\mathrm{JacobiTheta}(1, z+\frac{1}{2}, \tau)=\mathrm{JacobiTheta}(2, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`563d18` · Fungrim entry ↗](https://fungrim.org/entry/563d18)

---

$$\mathrm{JacobiTheta}(3, w+z, \tau)\mathrm{JacobiTheta}(3, z-w, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`5752b8` · Fungrim entry ↗](https://fungrim.org/entry/5752b8)

---

$$\mathrm{JacobiTheta}(2, 0, \frac{\tau}{2})\mathrm{JacobiTheta}(1, 0, \frac{\tau}{2}, 1)=2\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(1, 0, \tau, 1)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`59184e` · Fungrim entry ↗](https://fungrim.org/entry/59184e)

---

$$\mathrm{JacobiTheta}(1, -z, \tau)=-\mathrm{JacobiTheta}(1, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`59f8e1` · Fungrim entry ↗](https://fungrim.org/entry/59f8e1)

---

$$\mathrm{JacobiTheta}(2, 0, \frac{\tau}{2})^2=2\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`59fd23` · Fungrim entry ↗](https://fungrim.org/entry/59fd23)

---

$$\mathrm{JacobiTheta}(1, z, \tau)^4-\mathrm{JacobiTheta}(2, z, \tau)^4=\mathrm{JacobiTheta}(4, z, \tau)^4-\mathrm{JacobiTheta}(3, z, \tau)^4$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`5a3ebf` · Fungrim entry ↗](https://fungrim.org/entry/5a3ebf)

---

$$\mathrm{JacobiTheta}(1, n+z, \tau)=\mathrm{JacobiTheta}(1, z, \tau)\times(-1)^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`5cdae6` · Fungrim entry ↗](https://fungrim.org/entry/5cdae6)

---

$$\mathrm{JacobiTheta}(4, z, \tau)=\mathrm{JacobiTheta}(3, z+\frac{1}{2}, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`5d41b1` · Fungrim entry ↗](https://fungrim.org/entry/5d41b1)

---

$$\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)=\mathrm{JacobiTheta}(1, w+z, 2\tau)\mathrm{JacobiTheta}(4, z-w, 2\tau)+\mathrm{JacobiTheta}(4, w+z, 2\tau)\mathrm{JacobiTheta}(1, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`5f9e54` · Fungrim entry ↗](https://fungrim.org/entry/5f9e54)

---

$$\mathrm{JacobiTheta}(1, 2z, \tau)=\frac{2\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`5fe58d` · Fungrim entry ↗](https://fungrim.org/entry/5fe58d)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(2, z, \tau)}{\mathrm{JacobiTheta}(3, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}{\mathrm{JacobiTheta}(3, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`64b65d` · Fungrim entry ↗](https://fungrim.org/entry/64b65d)

---

$$\mathrm{JacobiTheta}(4, z, n+\tau)=\begin{cases}\mathrm{JacobiTheta}(4, z, \tau)&\lnot\mathrm{IsOdd}(n)\\\mathrm{JacobiTheta}(3, z, \tau)&\mathrm{IsOdd}(n)\end{cases}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`64f0a5` · Fungrim entry ↗](https://fungrim.org/entry/64f0a5)

---

$$\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(1, z-w, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2-\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`663a02` · Fungrim entry ↗](https://fungrim.org/entry/663a02)

---

$$\mathrm{JacobiTheta}(3, 0, 6\imaginaryI)=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[3]{-4+2\sqrt{2}\times3^{3/4}+2\sqrt{3}+3\sqrt{2}-3^{3/4}+3^{5/4}}}{2\times3^{\frac{3}{8}}\sqrt[6]{2^{1/2}-1}\sqrt[6]{3^{1/2}-1}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`669765` · Fungrim entry ↗](https://fungrim.org/entry/669765)

---

$$\mathrm{JacobiTheta}(1, z, \frac{\tau}{2})=\frac{2\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(2, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`66eb8b` · Fungrim entry ↗](https://fungrim.org/entry/66eb8b)

---

$$\mathrm{JacobiTheta}(3, w+z, \tau)\mathrm{JacobiTheta}(3, z-w, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2+\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2+\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`66efb8` · Fungrim entry ↗](https://fungrim.org/entry/66efb8)

---

$$\mathrm{JacobiTheta}(3, 0, 1+12\imaginaryI)=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{-19}{48}}\times3^{\frac{-3}{8}}\sqrt[3]{2-3\sqrt{2}+3^{5/4}+3^{3/4}}}{\sqrt[3]{-1+\sqrt{2}\times3^{3/4}-\sqrt{3}}\sqrt[12]{2^{1/2}-1}\sqrt[6]{1+\sqrt{3}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`675f23` · Fungrim entry ↗](https://fungrim.org/entry/675f23)

---

$$\mathrm{JacobiTheta}(4, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(4, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`686ce0` · Fungrim entry ↗](https://fungrim.org/entry/686ce0)

---

$$\mathrm{JacobiTheta}(3, z, \frac{\tau}{2})=\frac{\mathrm{JacobiTheta}(2, z, \tau)^2+\mathrm{JacobiTheta}(3, z, \tau)^2}{\mathrm{JacobiTheta}(3, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`69b32e` · Fungrim entry ↗](https://fungrim.org/entry/69b32e)

---

$$\mathrm{JacobiTheta}(2, z, \tau)=\mathrm{JacobiTheta}(4, \frac{\tau}{2}+z+\frac{1}{2}, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`6a7704` · Fungrim entry ↗](https://fungrim.org/entry/6a7704)

---

$$\mathrm{JacobiTheta}(3, 0, 45\imaginaryI)=\frac{\sqrt{10}(3+\sqrt{5}+(\sqrt{3}+\sqrt{5}+\sqrt[4]{60})\sqrt[3]{2+\sqrt{3}})\mathrm{JacobiTheta}(3, 0, \imaginaryI)}{30\sqrt{1+\sqrt{5}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`6ade92` · Fungrim entry ↗](https://fungrim.org/entry/6ade92)

---

$$\mathrm{JacobiTheta}(1, z, \tau+1)=\mathrm{JacobiTheta}(1, z, \tau)\exp(\frac{\imaginaryI\pi}{4})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`6b2078` · Fungrim entry ↗](https://fungrim.org/entry/6b2078)

---

$$\mathrm{JacobiTheta}(3, 0, 1+4\imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{-7}{16}}\sqrt[4]{1+\sqrt{2}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`6cbce8` · Fungrim entry ↗](https://fungrim.org/entry/6cbce8)

---

$$\mathrm{JacobiTheta}(4, z, \tau)=-(\imaginaryI\mathrm{JacobiTheta}(1, \frac{\tau}{2}+z, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`6d918c` · Fungrim entry ↗](https://fungrim.org/entry/6d918c)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2=\mathrm{JacobiTheta}(4, 0, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2+\mathrm{JacobiTheta}(2, 0, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`6fad93` · Fungrim entry ↗](https://fungrim.org/entry/6fad93)

---

$$\mathrm{JacobiTheta}(4, 2z, \tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)^4-\mathrm{JacobiTheta}(2, z, \tau)^4}{\mathrm{JacobiTheta}(4, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`7131cd` · Fungrim entry ↗](https://fungrim.org/entry/7131cd)

---

$$\mathrm{JacobiTheta}(2, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2}{2\mathrm{JacobiTheta}(3, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`7137a2` · Fungrim entry ↗](https://fungrim.org/entry/7137a2)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(2, z, \tau)}{\mathrm{JacobiTheta}(1, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}{\mathrm{JacobiTheta}(1, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`713b6b` · Fungrim entry ↗](https://fungrim.org/entry/713b6b)

---

$$\mathrm{JacobiTheta}(3, z, \tau)=\mathrm{JacobiTheta}(2, \frac{\tau}{2}+z, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`71d5ee` · Fungrim entry ↗](https://fungrim.org/entry/71d5ee)

---

$$\mathrm{JacobiTheta}(3, 0, 7\imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt{\frac{1}{14}((\sqrt{7+3\times7^{1/2}}+\sqrt{13+7^{1/2}})\sqrt[8]{28})}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`72f583` · Fungrim entry ↗](https://fungrim.org/entry/72f583)

---

$$\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(4, w, \tau)=\mathrm{JacobiTheta}(3, w+z, 2\tau)\mathrm{JacobiTheta}(3, z-w, 2\tau)-\mathrm{JacobiTheta}(2, w+z, 2\tau)\mathrm{JacobiTheta}(2, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`73eb5d` · Fungrim entry ↗](https://fungrim.org/entry/73eb5d)

---

$$\mathrm{JacobiTheta}(4, 0, \frac{\tau}{2})^2=\mathrm{JacobiTheta}(3, 0, \tau)^2-\mathrm{JacobiTheta}(2, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`7527f1` · Fungrim entry ↗](https://fungrim.org/entry/7527f1)

---

$$\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(1, z-w, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`75cb8c` · Fungrim entry ↗](https://fungrim.org/entry/75cb8c)

---

$$\mathrm{JacobiTheta}(3, z, 2n+\tau)=\mathrm{JacobiTheta}(3, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`772c88` · Fungrim entry ↗](https://fungrim.org/entry/772c88)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(2, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}{\mathrm{JacobiTheta}(2, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`775637` · Fungrim entry ↗](https://fungrim.org/entry/775637)

---

$$\mathrm{JacobiTheta}(3, 2z, \tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2+\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`794106` · Fungrim entry ↗](https://fungrim.org/entry/794106)

---

$$\mathrm{JacobiTheta}(3, 0, \sqrt{6}\imaginaryI)=\sqrt{\frac{1}{\pi}(2\mathrm{EllipticK}((2-3^{1/2})^2(2^{1/2}-3^{1/2})^2))}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [mathworld.wolfram.com](http://mathworld.wolfram.com/PolyasRandomWalkConstants.html)
[`799b5e` · Fungrim entry ↗](https://fungrim.org/entry/799b5e)

---

$$\mathrm{JacobiTheta}(2, 0, \imaginaryI)=\mathrm{JacobiTheta}(4, 0, \imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[-4]{2}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`7d7c65` · Fungrim entry ↗](https://fungrim.org/entry/7d7c65)

---

$$\mathrm{JacobiTheta}(3, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)^2+\mathrm{JacobiTheta}(4, z, \tau)^2}{2\mathrm{JacobiTheta}(3, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`7e0002` · Fungrim entry ↗](https://fungrim.org/entry/7e0002)

---

$$\mathrm{JacobiTheta}(3, 0, \frac{\imaginaryI}{4})=\frac{\sqrt{2}(1+\sqrt[-4]{2})\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt{\frac{1+2^{1/2}}{2}}}{\sqrt{1+\sqrt{2}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`7f9273` · Fungrim entry ↗](https://fungrim.org/entry/7f9273)

---

$$\mathrm{JacobiTheta}(4, 0, \imaginaryI y+1)=\mathrm{JacobiTheta}(3, 0, \imaginaryI y)$$

**Holds when** $y\in\lparen0, \infty\rparen$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`81550a` · Fungrim entry ↗](https://fungrim.org/entry/81550a)

---

$$\mathrm{JacobiTheta}(3, 0, 9\imaginaryI)=\frac{1}{3}((1+\sqrt[3]{2(1+\sqrt{3})})\mathrm{JacobiTheta}(3, 0, \imaginaryI))$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`8356db` · Fungrim entry ↗](https://fungrim.org/entry/8356db)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)=\frac{\mathrm{DedekindEta}((\tau+1)/2)^2}{\mathrm{DedekindEta}(\tau+1)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`85b2ff` · Fungrim entry ↗](https://fungrim.org/entry/85b2ff)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(2, z, \tau)}{\mathrm{JacobiTheta}(4, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}{\mathrm{JacobiTheta}(4, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`89985a` · Fungrim entry ↗](https://fungrim.org/entry/89985a)

---

$$\mathrm{JacobiTheta}(2, w+z, \tau)\mathrm{JacobiTheta}(2, z-w, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2-\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`89c9e4` · Fungrim entry ↗](https://fungrim.org/entry/89c9e4)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^4=8(\sum_{n=0}^{\infty}\frac{(2n+1)\exp(\imaginaryI\pi\tau(2n+1))}{1-\exp(\imaginaryI\pi\tau(2n+1))})+8(\sum_{n=0}^{\infty}\frac{2n\exp(2\imaginaryI\pi n\tau)}{\exp(2\imaginaryI\pi n\tau)+1})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`8a316c` · Fungrim entry ↗](https://fungrim.org/entry/8a316c)

---

$$\mathrm{JacobiTheta}(4, z, \tau)=2(\sum_{n=1}^{\infty}\cos(2\pi nz)\times(-1)^{n}\exp(\imaginaryI\pi\tau n^2))+1$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`8a34d1` · Fungrim entry ↗](https://fungrim.org/entry/8a34d1)

---

$$\mathrm{JacobiTheta}(4, 2z, \tau)=\frac{\mathrm{JacobiTheta}(4, z, \tau)^4-\mathrm{JacobiTheta}(1, z, \tau)^4}{\mathrm{JacobiTheta}(4, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`8b825c` · Fungrim entry ↗](https://fungrim.org/entry/8b825c)

---

$$\mathrm{JacobiTheta}(4, \frac{n}{4}, \imaginaryI)=\begin{cases}\mathrm{JacobiTheta}(4, 0, \imaginaryI)&\mathrm{CongruentMod}(n, 0, 4)\\\mathrm{JacobiTheta}(3, 0, \imaginaryI)&\mathrm{CongruentMod}(n, 2, 4)\\\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{-7}{16}}\sqrt[4]{1+\sqrt{2}}&\top\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`8c4ab4` · Fungrim entry ↗](https://fungrim.org/entry/8c4ab4)

---

$$\mathrm{JacobiTheta}(4, n\tau+m+z, \tau)=\mathrm{JacobiTheta}(4, z, \tau)\times(-1)^{n}\exp(-(\imaginaryI\pi(\tau n^2+2nz)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land m\in\Z\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`8d6a1d` · Fungrim entry ↗](https://fungrim.org/entry/8d6a1d)

---

$$\mathrm{JacobiTheta}(1, 0, \tau)=0$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`8f43ab` · Fungrim entry ↗](https://fungrim.org/entry/8f43ab)

---

$$\mathrm{JacobiTheta}(4, 2z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2+\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2}{\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`931201` · Fungrim entry ↗](https://fungrim.org/entry/931201)

---

$$32{(\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{(0)}(\tau)\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\doubleprime}(\tau)-3\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\prime}(\tau)^2)}^3+\pi^2(\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{(0)}(\tau)\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\doubleprime}(\tau)-3\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\prime}(\tau)^2)^2{\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{(0)}(\tau)}^{10}+(30{\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\prime}(\tau)}^3+\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\tripleprime}(\tau)\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{(0)}(\tau)^2-15\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{(0)}(\tau)\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\prime}(\tau)\tau\mapsto\mathrm{JacobiTheta}(j, 0, \tau)^{\doubleprime}(\tau))^2=0$$

**Holds when** $\tau\in\mathrm{HH}\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`936694` · Fungrim entry ↗](https://fungrim.org/entry/936694)

---

$$\mathrm{JacobiTheta}(4, 0, \tau)=\frac{1}{\mathrm{DedekindEta}(\tau)}(\mathrm{DedekindEta}(\tau/2)^2)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9448f2` · Fungrim entry ↗](https://fungrim.org/entry/9448f2)

---

$$\mathrm{JacobiTheta}(1, z, \tau)=-\mathrm{JacobiTheta}(2, z+\frac{1}{2}, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`95988c` · Fungrim entry ↗](https://fungrim.org/entry/95988c)

---

$$\mathrm{JacobiTheta}(4, z, \frac{\tau}{2})=\frac{\mathrm{JacobiTheta}(3, z, \tau)^2-\mathrm{JacobiTheta}(2, z, \tau)^2}{\mathrm{JacobiTheta}(4, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`95e508` · Fungrim entry ↗](https://fungrim.org/entry/95e508)

---

$$\mathrm{JacobiTheta}(3, 0, 4\imaginaryI)=\frac{1}{2}((1+\sqrt[-4]{2})\mathrm{JacobiTheta}(3, 0, \imaginaryI))$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`95e9e4` · Fungrim entry ↗](https://fungrim.org/entry/95e9e4)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(2, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)-\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(3, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9973ef` · Fungrim entry ↗](https://fungrim.org/entry/9973ef)

---

$$2\mathrm{JacobiTheta}(2, 0, 2\tau)\mathrm{JacobiTheta}(3, 0, 2\tau)=\mathrm{JacobiTheta}(2, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9a2054` · Fungrim entry ↗](https://fungrim.org/entry/9a2054)

---

$$\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)=\mathrm{JacobiTheta}(2, w+z, 2\tau)\mathrm{JacobiTheta}(3, z-w, 2\tau)+\mathrm{JacobiTheta}(3, w+z, 2\tau)\mathrm{JacobiTheta}(2, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9a9487` · Fungrim entry ↗](https://fungrim.org/entry/9a9487)

---

$$\mathrm{JacobiTheta}(3, w+z, \tau)\mathrm{JacobiTheta}(3, z-w, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2+\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2=\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2+\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9aa437` · Fungrim entry ↗](https://fungrim.org/entry/9aa437)

---

$$\mathrm{JacobiTheta}(3, z, \tau+1)=\mathrm{JacobiTheta}(4, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`9c1e9a` · Fungrim entry ↗](https://fungrim.org/entry/9c1e9a)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(1, z, \tau)}^{\prime}(z)=-(\frac{\pi\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}{\mathrm{JacobiTheta}(1, z, \tau)^2})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a0552b` · Fungrim entry ↗](https://fungrim.org/entry/a0552b)

---

$$\mathrm{JacobiTheta}(2, 2z, 4\tau)=\frac{1}{2}(\mathrm{JacobiTheta}(3, z, \tau)-\mathrm{JacobiTheta}(4, z, \tau))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a0a1ee` · Fungrim entry ↗](https://fungrim.org/entry/a0a1ee)

---

$$\mathrm{JacobiTheta}(3, 0, \tau, 2r+1)=0$$

**Holds when** $\tau\in\mathrm{HH}\land r\in\N$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a19141` · Fungrim entry ↗](https://fungrim.org/entry/a19141)

---

$$z\mapsto\mathrm{JacobiTheta}(j, z, \tau)^{\prime}(z)=\mathrm{JacobiTheta}(j, z, \tau, r)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land r\in\N\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a222ed` · Fungrim entry ↗](https://fungrim.org/entry/a222ed)

---

$$\mathrm{JacobiTheta}(2, 4z, 4\tau)=\frac{\mathrm{JacobiTheta}(2, z+\frac{1}{8}, \tau)\mathrm{JacobiTheta}(2, z+\frac{3}{8}, \tau)\mathrm{JacobiTheta}(2, 1/8-z, \tau)\mathrm{JacobiTheta}(2, 3/8-z, \tau)}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, \frac{1}{4}, \tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a255e1` · Fungrim entry ↗](https://fungrim.org/entry/a255e1)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(1, z, \tau)}{\mathrm{JacobiTheta}(4, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}{\mathrm{JacobiTheta}(4, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a4eecf` · Fungrim entry ↗](https://fungrim.org/entry/a4eecf)

---

$$\mathrm{JacobiTheta}(4, z, \tau+1)=\mathrm{JacobiTheta}(3, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a5c258` · Fungrim entry ↗](https://fungrim.org/entry/a5c258)

---

$$\mathrm{JacobiTheta}(j, z^\star, \tau)=\mathrm{JacobiTheta}(j, z, -\tau^\star)^\star$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a891da` · Fungrim entry ↗](https://fungrim.org/entry/a891da)

---

$$\mathrm{JacobiTheta}(3, 2z, \tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a94b43` · Fungrim entry ↗](https://fungrim.org/entry/a94b43)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)=\frac{1}{\mathrm{DedekindEta}(\tau)}(2\mathrm{DedekindEta}(2\tau)^2)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a9c825` · Fungrim entry ↗](https://fungrim.org/entry/a9c825)

---

$$\mathrm{JacobiTheta}(2, z, \frac{\tau}{2})=\frac{2\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)}{\mathrm{JacobiTheta}(2, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`a9cdda` · Fungrim entry ↗](https://fungrim.org/entry/a9cdda)

---

$$\mathrm{JacobiTheta}(2, 2z, \tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2}{\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`aaa582` · Fungrim entry ↗](https://fungrim.org/entry/aaa582)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2=\mathrm{JacobiTheta}(2, 0, \tau)^2\mathrm{JacobiTheta}(1, z, \tau)^2+\mathrm{JacobiTheta}(4, 0, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`abbe42` · Fungrim entry ↗](https://fungrim.org/entry/abbe42)

---

$$\mathrm{JacobiTheta}(1, z, 8n+\tau)=\mathrm{JacobiTheta}(1, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`abc1e7` · Fungrim entry ↗](https://fungrim.org/entry/abc1e7)

---

$$\mathrm{JacobiTheta}(2, 2z, \tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(4, z, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2}{\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`b1d07b` · Fungrim entry ↗](https://fungrim.org/entry/b1d07b)

---

$$\mathrm{JacobiTheta}(1, 0, \tau, 2r)=0$$

**Holds when** $\tau\in\mathrm{HH}\land r\in\N$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`b3c440` · Fungrim entry ↗](https://fungrim.org/entry/b3c440)

---

$$\mathrm{JacobiTheta}(3, z, \tau)=\mathrm{JacobiTheta}(4, z+\frac{1}{2}, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`b3fc6d` · Fungrim entry ↗](https://fungrim.org/entry/b3fc6d)

---

$$\mathrm{JacobiTheta}(2, 2n+z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`b46534` · Fungrim entry ↗](https://fungrim.org/entry/b46534)

---

$$\mathrm{JacobiTheta}(3, 0, 1+2\imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt[-8]{2}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`b58070` · Fungrim entry ↗](https://fungrim.org/entry/b58070)

---

$$\mathrm{JacobiTheta}(4, \tau+z, \tau)=-(\mathrm{JacobiTheta}(4, z, \tau)\exp(-(\imaginaryI\pi(\tau+2z))))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`b83f63` · Fungrim entry ↗](https://fungrim.org/entry/b83f63)

---

$$\mathrm{JacobiTheta}(1, z, 2n+\tau)=\mathrm{JacobiTheta}(1, z, \tau)\imaginaryI^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`b978f0` · Fungrim entry ↗](https://fungrim.org/entry/b978f0)

---

$$\mathrm{JacobiTheta}(1, z, 4n+\tau)=\mathrm{JacobiTheta}(1, z, \tau)\times(-1)^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`b9c650` · Fungrim entry ↗](https://fungrim.org/entry/b9c650)

---

$$2\mathrm{JacobiTheta}(3, 0, 2\tau)^2=\mathrm{JacobiTheta}(3, 0, \tau)^2+\mathrm{JacobiTheta}(4, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`c3d8c2` · Fungrim entry ↗](https://fungrim.org/entry/c3d8c2)

---

$$\mathrm{JacobiTheta}(3, z, \frac{-1}{\tau})=\mathrm{JacobiTheta}(3, \tau z, \tau)\exp(\imaginaryI\pi\tau z^2)\sqrt{\frac{\tau}{\imaginaryI}}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`c4b16c` · Fungrim entry ↗](https://fungrim.org/entry/c4b16c)

---

$$\mathrm{JacobiTheta}(3, 0, \sqrt{6}\imaginaryI)=\sqrt[4]{\frac{\sqrt{6}\Gamma(1/24)\Gamma(5/24)\Gamma(7/24)\Gamma(11/24)}{96(18-10\sqrt{3}-7\sqrt{6}+12\sqrt{2})\pi^3}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [mathworld.wolfram.com](http://mathworld.wolfram.com/PolyasRandomWalkConstants.html)
[`c60033` · Fungrim entry ↗](https://fungrim.org/entry/c60033)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)^4=8(\sum_{n=0}^{\infty}\frac{(2n+1)\exp(\imaginaryI\pi\tau(2n+1))}{\exp(\imaginaryI\pi\tau(2n+1))+1})+8(\sum_{n=0}^{\infty}\frac{(2n+1)\exp(\imaginaryI\pi\tau(2n+1))}{1-\exp(\imaginaryI\pi\tau(2n+1))})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`c743eb` · Fungrim entry ↗](https://fungrim.org/entry/c743eb)

---

$$\mathrm{JacobiTheta}(4, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2=\mathrm{JacobiTheta}(4, z, \tau)^2\mathrm{JacobiTheta}(2, w, \tau)^2+\mathrm{JacobiTheta}(3, z, \tau)^2\mathrm{JacobiTheta}(1, w, \tau)^2=\mathrm{JacobiTheta}(1, z, \tau)^2\mathrm{JacobiTheta}(3, w, \tau)^2+\mathrm{JacobiTheta}(2, z, \tau)^2\mathrm{JacobiTheta}(4, w, \tau)^2$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`c891a1` · Fungrim entry ↗](https://fungrim.org/entry/c891a1)

---

$$\mathrm{JacobiTheta}(4, z, \frac{\tau}{2})=\frac{\mathrm{JacobiTheta}(4, z, \tau)^2+\mathrm{JacobiTheta}(1, z, \tau)^2}{\mathrm{JacobiTheta}(3, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`c92a6f` · Fungrim entry ↗](https://fungrim.org/entry/c92a6f)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(1, z, \tau)}{\mathrm{JacobiTheta}(2, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(2, 0, \tau)^2}{\mathrm{JacobiTheta}(2, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cb493d` · Fungrim entry ↗](https://fungrim.org/entry/cb493d)

---

$$\mathrm{JacobiTheta}(3, 0, 5\imaginaryI)=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt{5+2\sqrt{5}}}{5^{\frac{3}{4}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`cb6c9c` · Fungrim entry ↗](https://fungrim.org/entry/cb6c9c)

---

$$\mathrm{JacobiTheta}(2, \frac{\tau}{2}+z, \tau)=\mathrm{JacobiTheta}(3, z, \tau)\exp(-(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cc6d21` · Fungrim entry ↗](https://fungrim.org/entry/cc6d21)

---

$$\mathrm{JacobiTheta}(2, \tau+z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\exp(-(\imaginaryI\pi(\tau+2z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cd5f45` · Fungrim entry ↗](https://fungrim.org/entry/cd5f45)

---

$$\mathrm{JacobiTheta}(2, z, \tau+1)=\mathrm{JacobiTheta}(2, z, \tau)\exp(\frac{\imaginaryI\pi}{4})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cde93e` · Fungrim entry ↗](https://fungrim.org/entry/cde93e)

---

$$\mathrm{JacobiTheta}(3, 0, 2\imaginaryI)=\frac{1}{2}(\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt{2+\sqrt{2}})$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`cf3c8e` · Fungrim entry ↗](https://fungrim.org/entry/cf3c8e)

---

$$\mathrm{JacobiTheta}(4, 0, \imaginaryI y)=\mathrm{JacobiTheta}(3, 0, \imaginaryI y+1)$$

**Holds when** $y\in\lparen0, \infty\rparen$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`cf7ee3` · Fungrim entry ↗](https://fungrim.org/entry/cf7ee3)

---

$$\mathrm{JacobiTheta}(2, z, n+\tau)=\mathrm{JacobiTheta}(2, z, \tau)\exp(\frac{\imaginaryI\pi n}{4})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d0dfba` · Fungrim entry ↗](https://fungrim.org/entry/d0dfba)

---

$$\mathrm{JacobiTheta}(2, z, 2n+\tau)=\mathrm{JacobiTheta}(2, z, \tau)\imaginaryI^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`d11b7f` · Fungrim entry ↗](https://fungrim.org/entry/d11b7f)

---

$$\mathrm{JacobiTheta}(3, 0, \imaginaryI)=\frac{\sqrt[4]{\pi}}{\Gamma(\frac{3}{4})}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d15f11` · Fungrim entry ↗](https://fungrim.org/entry/d15f11)

---

$$\mathrm{JacobiTheta}(2, n\tau+m+z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\times(-1)^{m}\exp(-(\imaginaryI\pi(\tau n^2+2nz)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land m\in\Z\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d29148` · Fungrim entry ↗](https://fungrim.org/entry/d29148)

---

$$\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, w, \tau)=\mathrm{JacobiTheta}(4, w+z, 2\tau)\mathrm{JacobiTheta}(4, z-w, 2\tau)-\mathrm{JacobiTheta}(1, w+z, 2\tau)\mathrm{JacobiTheta}(1, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d36e97` · Fungrim entry ↗](https://fungrim.org/entry/d36e97)

---

$$z\mapsto\frac{\mathrm{JacobiTheta}(1, z, \tau)}{\mathrm{JacobiTheta}(3, z, \tau)}^{\prime}(z)=\frac{\pi\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(3, 0, \tau)^2}{\mathrm{JacobiTheta}(3, z, \tau)^2}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d41a95` · Fungrim entry ↗](https://fungrim.org/entry/d41a95)

---

$$\mathrm{JacobiTheta}(1, \frac{\tau}{2}+z, \tau)=\imaginaryI\mathrm{JacobiTheta}(4, z, \tau)\exp(-(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d5a29e` · Fungrim entry ↗](https://fungrim.org/entry/d5a29e)

---

$$\mathrm{JacobiTheta}(1, \tau+z, \tau)=-(\mathrm{JacobiTheta}(1, z, \tau)\exp(-(\imaginaryI\pi(\tau+2z))))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`d989cd` · Fungrim entry ↗](https://fungrim.org/entry/d989cd)

---

$$\mathrm{JacobiTheta}(2, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)^2-\mathrm{JacobiTheta}(4, z, \tau)^2}{2\mathrm{JacobiTheta}(2, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`db4e29` · Fungrim entry ↗](https://fungrim.org/entry/db4e29)

---

$$\mathrm{JacobiTheta}(4, 0, \tau)^4=-8(\sum_{n=0}^{\infty}\frac{(2n+1)\exp(\imaginaryI\pi\tau(2n+1))}{\exp(\imaginaryI\pi\tau(2n+1))+1})+8(\sum_{n=0}^{\infty}\frac{2n\exp(2\imaginaryI\pi n\tau)}{\exp(2\imaginaryI\pi n\tau)+1})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`dc7c83` · Fungrim entry ↗](https://fungrim.org/entry/dc7c83)

---

$$\mathrm{JacobiTheta}(2, \frac{n}{4}, \imaginaryI)=\begin{cases}\mathrm{JacobiTheta}(4, 0, \imaginaryI)\times(-1)^{\lfloor(n+1)/4\rfloor}&\mathrm{CongruentMod}(n, 0, 4)\\0&\mathrm{CongruentMod}(n, 2, 4)\\\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times(-1)^{\lfloor(n+1)/4\rfloor}\times2^{\frac{-7}{16}}\sqrt{2^{1/2}-1}\sqrt[4]{1+\sqrt{2}}&\top\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`dd5f43` · Fungrim entry ↗](https://fungrim.org/entry/dd5f43)

---

$$\mathrm{JacobiTheta}(3, 0, \frac{\tau}{2})^2=\mathrm{JacobiTheta}(2, 0, \tau)^2+\mathrm{JacobiTheta}(3, 0, \tau)^2$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`de7918` · Fungrim entry ↗](https://fungrim.org/entry/de7918)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(2, w+z, \tau)\mathrm{JacobiTheta}(3, z-w, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)\mathrm{JacobiTheta}(3, w, \tau)-\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`dfea7d` · Fungrim entry ↗](https://fungrim.org/entry/dfea7d)

---

$$\mathrm{JacobiTheta}(1, z, \tau)^4-\mathrm{JacobiTheta}(4, z, \tau)^4=\mathrm{JacobiTheta}(2, z, \tau)^4-\mathrm{JacobiTheta}(3, z, \tau)^4$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`e08bb4` · Fungrim entry ↗](https://fungrim.org/entry/e08bb4)

---

$$\mathrm{JacobiTheta}(1, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(2, z, \tau)}{\mathrm{JacobiTheta}(4, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e13fe9` · Fungrim entry ↗](https://fungrim.org/entry/e13fe9)

---

$$\mathrm{JacobiTheta}(2, 0, \imaginaryI y+1)=\frac{\sqrt{2}(1+\imaginaryI)\mathrm{JacobiTheta}(3, 0, \frac{\imaginaryI}{y}+1)}{2\sqrt{y}}$$

**Holds when** $y\in\lparen0, \infty\rparen$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e2288d` · Fungrim entry ↗](https://fungrim.org/entry/e2288d)

---

$$\mathrm{JacobiTheta}(3, 0, 1+8\imaginaryI)=\mathrm{JacobiTheta}(3, 0, \imaginaryI)\times2^{\frac{-7}{8}}\sqrt[8]{16+9\sqrt[4]{8}+12\sqrt{2}+15\sqrt[4]{2}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`e2bc80` · Fungrim entry ↗](https://fungrim.org/entry/e2bc80)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)=2(\sum_{n=1}^{\infty}\frac{\mathrm{LiouvilleLambda}(n)\exp(\imaginaryI\pi n\tau)}{1-\exp(\imaginaryI\pi n\tau)})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e4e707` · Fungrim entry ↗](https://fungrim.org/entry/e4e707)

---

$$\mathrm{JacobiTheta}(3, n+z, \tau)=\mathrm{JacobiTheta}(3, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e56f77` · Fungrim entry ↗](https://fungrim.org/entry/e56f77)

---

$$\mathrm{JacobiTheta}(3, z, \frac{\tau}{2})=\frac{\mathrm{JacobiTheta}(4, z, \tau)^2-\mathrm{JacobiTheta}(1, z, \tau)^2}{\mathrm{JacobiTheta}(4, 0, \frac{\tau}{2})}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e6d333` · Fungrim entry ↗](https://fungrim.org/entry/e6d333)

---

$$\mathrm{JacobiTheta}(2, 2z, \tau)=\frac{\mathrm{JacobiTheta}(3, z, \tau)^4-\mathrm{JacobiTheta}(4, z, \tau)^4}{\mathrm{JacobiTheta}(2, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for expansion.
[`e6dc09` · Fungrim entry ↗](https://fungrim.org/entry/e6dc09)

---

$$\mathrm{JacobiTheta}(1, z, \frac{-1}{\tau})=-(\imaginaryI\mathrm{JacobiTheta}(1, \tau z, \tau)\exp(\imaginaryI\pi\tau z^2)\sqrt{\frac{\tau}{\imaginaryI}})$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`e8ce0b` · Fungrim entry ↗](https://fungrim.org/entry/e8ce0b)

---

$$\mathrm{JacobiTheta}(j, z, \tau, 2)-4\imaginaryI\pi\tau\mapsto\mathrm{JacobiTheta}(j, z, \tau)^{\prime}(\tau)=0$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`ebc673` · Fungrim entry ↗](https://fungrim.org/entry/ebc673)

---

$$\mathrm{JacobiTheta}(1, z, \tau)=-(\imaginaryI\mathrm{JacobiTheta}(3, \frac{\tau}{2}+z+\frac{1}{2}, \tau)\exp(\imaginaryI\pi(\frac{\tau}{4}+z)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`ed0756` · Fungrim entry ↗](https://fungrim.org/entry/ed0756)

---

$$\mathrm{JacobiTheta}(3, 2z, \tau)=\frac{\mathrm{JacobiTheta}(2, z, \tau)^4+\mathrm{JacobiTheta}(4, z, \tau)^4}{\mathrm{JacobiTheta}(3, 0, \tau)^3}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`ed3ff9` · Fungrim entry ↗](https://fungrim.org/entry/ed3ff9)

---

$$\mathrm{JacobiTheta}(4, z, \frac{-1}{\tau})=\mathrm{JacobiTheta}(2, \tau z, \tau)\exp(\imaginaryI\pi\tau z^2)\sqrt{\frac{\tau}{\imaginaryI}}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`ed8ba7` · Fungrim entry ↗](https://fungrim.org/entry/ed8ba7)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(1, w+z, \tau)\mathrm{JacobiTheta}(4, z-w, \tau)=\mathrm{JacobiTheta}(1, z, \tau)\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(2, w, \tau)\mathrm{JacobiTheta}(3, w, \tau)+\mathrm{JacobiTheta}(2, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(1, w, \tau)\mathrm{JacobiTheta}(4, w, \tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`ee8617` · Fungrim entry ↗](https://fungrim.org/entry/ee8617)

---

$$\mathrm{JacobiTheta}(2, 2z, 2\tau)=\frac{\mathrm{JacobiTheta}(1, z+\frac{1}{4}, \tau)\mathrm{JacobiTheta}(1, 1/4-z, \tau)}{\mathrm{JacobiTheta}(4, 0, 2\tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f12569` · Fungrim entry ↗](https://fungrim.org/entry/f12569)

---

$$\mathrm{JacobiTheta}(3, 0, 3\imaginaryI)=\frac{\mathrm{JacobiTheta}(3, 0, \imaginaryI)\sqrt{1+\sqrt{3}}}{\sqrt[4]{2}\times3^{\frac{3}{8}}}$$

**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1016/j.jmaa.2003.12.009)
[`f12e20` · Fungrim entry ↗](https://fungrim.org/entry/f12e20)

---

$$\mathrm{JacobiTheta}(4, 0, 2\tau)^2=\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f14471` · Fungrim entry ↗](https://fungrim.org/entry/f14471)

---

$$\mathrm{JacobiTheta}(1, 0, \tau, 1)=\pi\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f2e28a` · Fungrim entry ↗](https://fungrim.org/entry/f2e28a)

---

$$\mathrm{JacobiTheta}(3, z, \tau)=2(\sum_{n=1}^{\infty}\cos(2\pi nz)\exp(\imaginaryI\pi\tau n^2))+1$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f3e75c` · Fungrim entry ↗](https://fungrim.org/entry/f3e75c)

---

$$\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(3, w, \tau)=\mathrm{JacobiTheta}(3, w+z, 2\tau)\mathrm{JacobiTheta}(3, z-w, 2\tau)+\mathrm{JacobiTheta}(2, w+z, 2\tau)\mathrm{JacobiTheta}(2, z-w, 2\tau)$$

**Holds when** $z\in\C\land w\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f4554f` · Fungrim entry ↗](https://fungrim.org/entry/f4554f)

---

$$\mathrm{JacobiTheta}(2, n+z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)\times(-1)^{n}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f697d5` · Fungrim entry ↗](https://fungrim.org/entry/f697d5)

---

$$\mathrm{JacobiTheta}(3, 0, \tau)^2=2(\sum_{n=1}^{\infty}\frac{1}{\cos(\pi n\tau)})+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`f8cd8f` · Fungrim entry ↗](https://fungrim.org/entry/f8cd8f)

---

$$\mathrm{JacobiTheta}(2, 0, \tau)^2\mathrm{JacobiTheta}(3, z, \tau)^2=\mathrm{JacobiTheta}(4, 0, \tau)^2\mathrm{JacobiTheta}(1, z, \tau)^2+\mathrm{JacobiTheta}(3, 0, \tau)^2\mathrm{JacobiTheta}(2, z, \tau)^2$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`fa7251` · Fungrim entry ↗](https://fungrim.org/entry/fa7251)

---

$$\mathrm{JacobiTheta}(2, z, 8n+\tau)=\mathrm{JacobiTheta}(2, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land n\in\Z$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`fb4b1b` · Fungrim entry ↗](https://fungrim.org/entry/fb4b1b)

---

$$\mathrm{JacobiTheta}(2, -z, \tau)=\mathrm{JacobiTheta}(2, z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`fb55cb` · Fungrim entry ↗](https://fungrim.org/entry/fb55cb)

---

$$\mathrm{JacobiTheta}(4, 4z, 4\tau)=\frac{\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(3, z, \tau)\mathrm{JacobiTheta}(4, z+\frac{1}{4}, \tau)\mathrm{JacobiTheta}(4, 1/4-z, \tau)}{\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau)\mathrm{JacobiTheta}(3, \frac{1}{4}, \tau)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`fc3c44` · Fungrim entry ↗](https://fungrim.org/entry/fc3c44)

---

$$\mathrm{JacobiTheta}(j, z, -\tau^\star)=\mathrm{JacobiTheta}(j, z^\star, \tau)^\star$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}\land j\in\lbrace1, 2, 3, 4\rbrace$.
**Symbols:** **JacobiTheta** — Jacobi theta function.
Used by the Compute Engine for simplification.
[`fe1b96` · Fungrim entry ↗](https://fungrim.org/entry/fe1b96)

---

## Lambert W-function

$$\operatorname{W}(0)=0$$

Used by the Compute Engine for simplification.
[`0be17d` · Fungrim entry ↗](https://fungrim.org/entry/0be17d)

---

$$\operatorname{W}(x\ln(x))=\ln(x)$$

**Holds when** $x\in\lbrack\frac{1}{\exponentialE}, \infty\rparen$.
Used by the Compute Engine for simplification.
[`30bd5b` · Fungrim entry ↗](https://fungrim.org/entry/30bd5b)

---

$$\operatorname{W}(x\exponentialE^{x})=x$$

**Holds when** $x\in\lbrack-1, \infty\rparen$.
Used by the Compute Engine for simplification and equation solving.
[`8654a3` · Fungrim entry ↗](https://fungrim.org/entry/8654a3)

---

$$z\mapsto\operatorname{W}(z)^{\prime}(0)=(-r)^{r-1}$$

**Holds when** $r\in\N^*$.
Used by the Compute Engine for simplification.
[`8e8a59` · Fungrim entry ↗](https://fungrim.org/entry/8e8a59)

---

$$\operatorname{W}(-(\frac{1}{\exponentialE}))=-1$$

Used by the Compute Engine for simplification.
[`b93d09` · Fungrim entry ↗](https://fungrim.org/entry/b93d09)

---

$$\operatorname{W}(\exponentialE)=1$$

Used by the Compute Engine for simplification.
[`c95c4f` · Fungrim entry ↗](https://fungrim.org/entry/c95c4f)

---

$$\mathrm{LambertWPuiseuxCoefficient}(k)=\frac{(k-1)(2\mathrm{LambertWPuiseuxCoefficient}(k-2)+\begin{cases}2&k-2=0\\-1&k-2=1\\\sum_{j=2}^{k-3}\mathrm{LambertWPuiseuxCoefficient}(j)\mathrm{LambertWPuiseuxCoefficient}(-j+k-1)&\top\end{cases})}{4(k+1)}-\frac{1}{2}(\begin{cases}2&k=0\\-1&k=1\\\sum_{j=2}^{k-1}\mathrm{LambertWPuiseuxCoefficient}(j)\mathrm{LambertWPuiseuxCoefficient}(-j+k+1)&\top\end{cases})-\frac{\mathrm{LambertWPuiseuxCoefficient}(k-1)}{k+1}$$

**Holds when** $k\in2..\infty$.
**Symbols:** **LambertWPuiseuxCoefficient** — Coefficient in scaled Puiseux expansion of Lambert W-function.
Used by the Compute Engine for simplification.
[`d37d0f` · Fungrim entry ↗](https://fungrim.org/entry/d37d0f)

---

$$\operatorname{W}(-(\frac{\pi}{2}))=\frac{\imaginaryI\pi}{2}$$

Used by the Compute Engine for simplification.
[`e1dd64` · Fungrim entry ↗](https://fungrim.org/entry/e1dd64)

---

## Legendre elliptic integrals

$$\mathrm{IncompleteEllipticF}(\frac{-\pi}{2}, 1)=-\infty$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`04c829` · Fungrim entry ↗](https://fungrim.org/entry/04c829)

---

$$\mathrm{EllipticPi}(1, 0)=\tilde\infty$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`061c49` · Fungrim entry ↗](https://fungrim.org/entry/061c49)

---

$$\mathrm{IncompleteEllipticF}(\arcsin(\frac{1}{m^{1/2}}), m)=\frac{\mathrm{EllipticK}(\frac{1}{m})}{\sqrt{m}}$$

**Holds when** $m\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`087a7c` · Fungrim entry ↗](https://fungrim.org/entry/087a7c)

---

$$\mathrm{EllipticK}(\frac{1}{2}(1+\sqrt{3}\imaginaryI))=\frac{\sqrt[4]{3}\exp(\frac{\imaginaryI\pi}{12})\Gamma(1/3)^3}{\pi\times2^{\frac{7}{3}}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0abbe1` · Fungrim entry ↗](https://fungrim.org/entry/0abbe1)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, m)=\mathrm{EllipticK}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0b8fd6` · Fungrim entry ↗](https://fungrim.org/entry/0b8fd6)

---

$$\mathrm{EllipticK}(m)=\mathrm{CarlsonRF}(0, 1-m, 1)$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0cc11f` · Fungrim entry ↗](https://fungrim.org/entry/0cc11f)

---

$$\mathrm{EllipticPi}(\frac{1}{2}, 0)=\frac{\pi\sqrt{2}}{2}$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`124d02` · Fungrim entry ↗](https://fungrim.org/entry/124d02)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, 1)=\infty$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`16612f` · Fungrim entry ↗](https://fungrim.org/entry/16612f)

---

$$\mathrm{EllipticE}(m)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(\frac{-1}{2}, \frac{1}{2}, 1, m))$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`16d2e1` · Fungrim entry ↗](https://fungrim.org/entry/16d2e1)

---

$$\mathrm{EllipticK}(\frac{1}{2}(1-\imaginaryI\sqrt{3}))=\frac{\sqrt[4]{3}\exp(-((\imaginaryI\pi)/12))\Gamma(1/3)^3}{\pi\times2^{\frac{7}{3}}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`175b7a` · Fungrim entry ↗](https://fungrim.org/entry/175b7a)

---

$$\mathrm{EllipticPi}(0, 1)=\infty$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`18e226` · Fungrim entry ↗](https://fungrim.org/entry/18e226)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, m)=\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`1b881e` · Fungrim entry ↗](https://fungrim.org/entry/1b881e)

---

$$\mathrm{EllipticE}(0)=\frac{\pi}{2}$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`1d62a7` · Fungrim entry ↗](https://fungrim.org/entry/1d62a7)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi k}{2}, 1)=k$$

**Holds when** $k\in\Z$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`2245df` · Fungrim entry ↗](https://fungrim.org/entry/2245df)

---

$$\mathrm{IncompleteEllipticPi}(n, -\phi, m)=-\mathrm{IncompleteEllipticPi}(n, \phi, m)$$

**Holds when** $n\in\C\land\phi\in\C\land m\in\C$.
**Symbols:** **IncompleteEllipticPi** — Legendre incomplete elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`255d81` · Fungrim entry ↗](https://fungrim.org/entry/255d81)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, -1)=\sqrt{2}(\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2}+\frac{\Gamma(1/4)^2}{8\sqrt{\pi}})$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`2573ba` · Fungrim entry ↗](https://fungrim.org/entry/2573ba)

---

$$\mathrm{EllipticK}((3-2\sqrt{2})^2)=\frac{(2+\sqrt{2})\Gamma(1/4)^2}{16\sqrt{\pi}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`2991b5` · Fungrim entry ↗](https://fungrim.org/entry/2991b5)

---

$$\mathrm{IncompleteEllipticE}(\frac{-\pi}{2}, m)=-\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for expansion.
[`2ef763` · Fungrim entry ↗](https://fungrim.org/entry/2ef763)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{3}, 1)=\frac{\sqrt{3}}{2}$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3aed02` · Fungrim entry ↗](https://fungrim.org/entry/3aed02)

---

$$\mathrm{EllipticE}(\frac{1}{2})=\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2}+\frac{\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3b272e` · Fungrim entry ↗](https://fungrim.org/entry/3b272e)

---

$$\mathrm{EllipticPi}(0, \frac{1}{2})=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3c4979` · Fungrim entry ↗](https://fungrim.org/entry/3c4979)

---

$$\mathrm{EllipticK}(\frac{1}{2}-\frac{3^{1/2}}{4})=\frac{\sqrt[4]{3}\Gamma(1/3)^3}{4\pi\sqrt[3]{2}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`40a376` · Fungrim entry ↗](https://fungrim.org/entry/40a376)

---

$$\mathrm{EllipticE}(m)=\frac{1}{3}((1-m)(\mathrm{CarlsonRD}(0, 1-m, 1)+\mathrm{CarlsonRD}(0, 1, 1-m)))$$

**Holds when** $m\ne1\land m\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`41cf8e` · Fungrim entry ↗](https://fungrim.org/entry/41cf8e)

---

$$\mathrm{IncompleteEllipticF}(0, m)=0$$

**Holds when** $m\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4268fc` · Fungrim entry ↗](https://fungrim.org/entry/4268fc)

---

$$\mathrm{EllipticK}(1)=\infty$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`45b157` · Fungrim entry ↗](https://fungrim.org/entry/45b157)

---

$$\mathrm{EllipticK}(\frac{1}{8}(4-3\sqrt{2}))=\frac{\Gamma(1/4)^2}{4\sqrt[4]{2}\sqrt{\pi}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`4b040d` · Fungrim entry ↗](https://fungrim.org/entry/4b040d)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{4}, 2)=\frac{\sqrt{2}\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`4dabda` · Fungrim entry ↗](https://fungrim.org/entry/4dabda)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, 0)=\frac{\pi}{2}$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`51a946` · Fungrim entry ↗](https://fungrim.org/entry/51a946)

---

$$\mathrm{EllipticE}(m)-(1-m)\mathrm{EllipticK}(m)=\frac{1}{3}(m(1-m)\mathrm{CarlsonRD}(0, 1, 1-m))$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`55d23d` · Fungrim entry ↗](https://fungrim.org/entry/55d23d)

---

$$\mathrm{EllipticE}(2)=\frac{\sqrt{2}(1+\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`5d2c01` · Fungrim entry ↗](https://fungrim.org/entry/5d2c01)

---

$$\mathrm{EllipticPi}(n, 0)=(\pi)(2\sqrt{1-n})^{-1}$$

**Holds when** $n\in\C$.
**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`5d8804` · Fungrim entry ↗](https://fungrim.org/entry/5d8804)

---

$$\mathrm{IncompleteEllipticPi}(n, \pi k+\phi, m)=2k\mathrm{EllipticPi}(n, m)+\mathrm{IncompleteEllipticPi}(n, \phi, m)$$

**Holds when** $n\ne1\land m\ne1\land n\in\C\land\phi\in\C\land m\in\C\land k\in\Z$.
**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind; **IncompleteEllipticPi** — Legendre incomplete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`5f84d9` · Fungrim entry ↗](https://fungrim.org/entry/5f84d9)

---

$$\mathrm{EllipticPi}(0, 0)=\frac{\pi}{2}$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`618a54` · Fungrim entry ↗](https://fungrim.org/entry/618a54)

---

$$\mathrm{EllipticK}(2)=\frac{\sqrt{2}(1-\imaginaryI)\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`630eca` · Fungrim entry ↗](https://fungrim.org/entry/630eca)

---

$$\mathrm{EllipticE}(m)=2\mathrm{CarlsonRG}(0, 1-m, 1)$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind; **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`6520e7` · Fungrim entry ↗](https://fungrim.org/entry/6520e7)

---

$$\mathrm{IncompleteEllipticF}(\pi k+\phi, m)=2k\mathrm{EllipticK}(m)+\mathrm{IncompleteEllipticF}(\phi, m)$$

**Holds when** $m\ne1\land\phi\in\C\land m\in\C\land k\in\Z$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`685126` · Fungrim entry ↗](https://fungrim.org/entry/685126)

---

$$\mathrm{EllipticK}(m^\star)=\mathrm{EllipticK}(m)^\star$$

**Holds when** $m\in\C\setminus\lparen1, \infty\rparen$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`713966` · Fungrim entry ↗](https://fungrim.org/entry/713966)

---

$$2\mathrm{EllipticE}(m)-\mathrm{EllipticK}(m)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(\frac{-1}{2}, \frac{3}{2}, 1, m))$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`752619` · Fungrim entry ↗](https://fungrim.org/entry/752619)

---

$$\mathrm{IncompleteEllipticF}(\frac{-\pi}{2}, m)=-\mathrm{EllipticK}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`81f7db` · Fungrim entry ↗](https://fungrim.org/entry/81f7db)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{4}, 2)=\frac{\sqrt{2}\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8b4be6` · Fungrim entry ↗](https://fungrim.org/entry/8b4be6)

---

$$\mathrm{EllipticE}(m^\star)=\mathrm{EllipticE}(m)^\star$$

**Holds when** $m\in\C\setminus\lparen1, \infty\rparen$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for expansion.
[`8e5c81` · Fungrim entry ↗](https://fungrim.org/entry/8e5c81)

---

$$\mathrm{IncompleteEllipticPi}(n, \phi, m)=\frac{1}{3}(n\mathrm{CarlsonRJ}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1, 1-n\sin(\phi)^2)\sin(\phi)^3)+\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)$$

**Holds when** $\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}\land n\in\C\land\phi\in\C\land m\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind; **IncompleteEllipticPi** — Legendre incomplete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`8f4e31` · Fungrim entry ↗](https://fungrim.org/entry/8f4e31)

---

$$\mathrm{EllipticPi}(m, m)=\frac{\mathrm{EllipticE}(m)}{1-m}$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`9227bf` · Fungrim entry ↗](https://fungrim.org/entry/9227bf)

---

$$\mathrm{EllipticK}(m)-\mathrm{EllipticE}(m)=\frac{1}{3}(m\mathrm{CarlsonRD}(0, 1-m, 1))$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`94f646` · Fungrim entry ↗](https://fungrim.org/entry/94f646)

---

$$\mathrm{EllipticE}(1)=1$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`958a3f` · Fungrim entry ↗](https://fungrim.org/entry/958a3f)

---

$$\mathrm{EllipticPi}(\frac{1}{2}, \frac{1}{2})=\frac{2\sqrt{\pi}^{3}}{\Gamma(1/4)^2}+\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`9b0385` · Fungrim entry ↗](https://fungrim.org/entry/9b0385)

---

$$\mathrm{EllipticPi}(n, m)=\frac{1}{3}(n\mathrm{CarlsonRJ}(0, 1-m, 1, 1-n))+\mathrm{CarlsonRF}(0, 1-m, 1)$$

**Holds when** $m\ne1\land n\in\C\land m\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind; **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`9ccaef` · Fungrim entry ↗](https://fungrim.org/entry/9ccaef)

---

$$\mathrm{EllipticE}(-1)=\sqrt{2}(\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2}+\frac{\Gamma(1/4)^2}{8\sqrt{\pi}})$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`9f3474` · Fungrim entry ↗](https://fungrim.org/entry/9f3474)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi k}{2}, m)=k\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C\land k\in\Z$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`a14442` · Fungrim entry ↗](https://fungrim.org/entry/a14442)

---

$$\mathrm{IncompleteEllipticE}(0, 0)=0$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`a6c07e` · Fungrim entry ↗](https://fungrim.org/entry/a6c07e)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{6}, 1)=\frac{\ln(3)}{2}$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`a91f8d` · Fungrim entry ↗](https://fungrim.org/entry/a91f8d)

---

$$\mathrm{IncompleteEllipticE}(-\phi, m)=-\mathrm{IncompleteEllipticE}(\phi, m)$$

**Holds when** $\phi\in\C\land m\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for expansion.
[`aa1b8e` · Fungrim entry ↗](https://fungrim.org/entry/aa1b8e)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{6}, 4)=\frac{\mathrm{EllipticK}(\frac{1}{4})}{2}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`aac129` · Fungrim entry ↗](https://fungrim.org/entry/aac129)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, -1)=\frac{\sqrt{2}\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ace837` · Fungrim entry ↗](https://fungrim.org/entry/ace837)

---

$$\mathrm{EllipticK}(-1)=\frac{\sqrt{2}\Gamma(1/4)^2}{8\sqrt{\pi}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`afb22a` · Fungrim entry ↗](https://fungrim.org/entry/afb22a)

---

$$\mathrm{IncompleteEllipticF}(-\phi, m)=-\mathrm{IncompleteEllipticF}(\phi, m)$$

**Holds when** $\phi\in\C\land m\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`b0eb37` · Fungrim entry ↗](https://fungrim.org/entry/b0eb37)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, 1)=1$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`b62aae` · Fungrim entry ↗](https://fungrim.org/entry/b62aae)

---

$$\mathrm{EllipticK}(m)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{1}{2}, 1, m))$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`b760d1` · Fungrim entry ↗](https://fungrim.org/entry/b760d1)

---

$$\mathrm{IncompleteEllipticF}(\phi, 1)=\begin{cases}\ln(\frac{\sin(\phi)+1}{\cos(\phi)})&(-\pi)/2\le\Re(\phi)\le\pi/2\land\phi\notin\lbrace(-\pi)/2, \pi/2\rbrace\\\infty\mathrm{sgn}(\phi)&\phi\in\lbrace(-\pi)/2, \pi/2\rbrace\\\tilde\infty&\top\end{cases}$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`b7cfb3` · Fungrim entry ↗](https://fungrim.org/entry/b7cfb3)

---

$$\mathrm{EllipticK}(4\sqrt{3}-7)=\frac{\sqrt{3+2\sqrt{3}}\Gamma(1/3)^3}{\pi\times2^{\frac{10}{3}}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`b95ffa` · Fungrim entry ↗](https://fungrim.org/entry/b95ffa)

---

$$\mathrm{IncompleteEllipticF}(0, 0)=0$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ba1965` · Fungrim entry ↗](https://fungrim.org/entry/ba1965)

---

$$\mathrm{EllipticK}(0)=\frac{\pi}{2}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`bb4501` · Fungrim entry ↗](https://fungrim.org/entry/bb4501)

---

$$\mathrm{IncompleteEllipticE}(0, m)=0$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`be3e09` · Fungrim entry ↗](https://fungrim.org/entry/be3e09)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, 0)=\frac{\pi}{2}$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`c0ad12` · Fungrim entry ↗](https://fungrim.org/entry/c0ad12)

---

$$\mathrm{IncompleteEllipticE}(\pi k+\phi, m)=2k\mathrm{EllipticE}(m)+\mathrm{IncompleteEllipticE}(\phi, m)$$

**Holds when** $\phi\in\C\land m\in\C\land k\in\Z$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`c28288` · Fungrim entry ↗](https://fungrim.org/entry/c28288)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{3}, 1)=\ln(2+\sqrt{3})$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`c584c3` · Fungrim entry ↗](https://fungrim.org/entry/c584c3)

---

$$\mathrm{EllipticK}(\frac{1}{2})=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`cc22bf` · Fungrim entry ↗](https://fungrim.org/entry/cc22bf)

---

$$\mathrm{EllipticPi}(1, m)=\tilde\infty$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`ce4df4` · Fungrim entry ↗](https://fungrim.org/entry/ce4df4)

---

$$\mathrm{IncompleteEllipticF}(\phi, 0)=\phi$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`d2adb6` · Fungrim entry ↗](https://fungrim.org/entry/d2adb6)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{6}, 1)=\frac{1}{2}$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`d88dd1` · Fungrim entry ↗](https://fungrim.org/entry/d88dd1)

---

$$\mathrm{EllipticPi}(0, m)=\mathrm{EllipticK}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`dd67fb` · Fungrim entry ↗](https://fungrim.org/entry/dd67fb)

---

$$\mathrm{IncompleteEllipticE}(\frac{-\pi}{2}, 1)=-1$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`dec0d2` · Fungrim entry ↗](https://fungrim.org/entry/dec0d2)

---

$$\mathrm{IncompleteEllipticF}(\phi, m)=\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)$$

**Holds when** $\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}\land\phi\in\C\land m\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e2445d` · Fungrim entry ↗](https://fungrim.org/entry/e2445d)

---

$$\mathrm{EllipticPi}(n, 1)=\begin{cases}\frac{\infty}{1-n}&n\ne1\\\tilde\infty&n=1\end{cases}$$

**Holds when** $n\in\C$.
**Symbols:** **EllipticPi** — Legendre complete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e9c797` · Fungrim entry ↗](https://fungrim.org/entry/e9c797)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{6}, 4)=2\mathrm{EllipticE}(\frac{1}{4})-\frac{1}{2}(3\mathrm{EllipticK}(\frac{1}{4}))$$

**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`eba27c` · Fungrim entry ↗](https://fungrim.org/entry/eba27c)

---

$$\mathrm{IncompleteEllipticE}(\phi, 0)=\phi$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`efc7a4` · Fungrim entry ↗](https://fungrim.org/entry/efc7a4)

---

$$\mathrm{IncompleteEllipticE}(\arcsin(\frac{1}{m^{1/2}}), m)=(\mathrm{EllipticE}(\frac{1}{m})-(1-\frac{1}{m})\mathrm{EllipticK}(\frac{1}{m}))\sqrt{m}$$

**Holds when** $m\in\C\setminus\lbrace0, 1\rbrace$.
**Symbols:** **EllipticE** — Legendre complete elliptic integral of the second kind; **EllipticK** — Legendre complete elliptic integral of the first kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f0bcb5` · Fungrim entry ↗](https://fungrim.org/entry/f0bcb5)

---

$$\mathrm{IncompleteEllipticE}(\phi, 1)=2\lfloor\frac{\Re(\phi)}{\pi}+\frac{1}{2}\rfloor+\sin(\phi)\times(-1)^{\lfloor\frac{\Re(\phi)}{\pi}+\frac{1}{2}\rfloor}$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f35a37` · Fungrim entry ↗](https://fungrim.org/entry/f35a37)

---

$$\mathrm{IncompleteEllipticE}(\phi, m)=\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)-\frac{1}{3}(m\mathrm{CarlsonRD}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)\sin(\phi)^3)$$

**Holds when** $\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}\land\phi\in\C\land m\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f48f54` · Fungrim entry ↗](https://fungrim.org/entry/f48f54)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{4}, 1)=\ln(1+\sqrt{2})$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`f5d489` · Fungrim entry ↗](https://fungrim.org/entry/f5d489)

---

## Legendre polynomials

$$\mathrm{LegendrePolynomial}(n, -z)=\mathrm{LegendrePolynomial}(n, z)\times(-1)^{n}$$

**Holds when** $n\in\N\land z\in\C$.
Used by the Compute Engine for simplification.
[`0010f3` · Fungrim entry ↗](https://fungrim.org/entry/0010f3)

---

$$\mathrm{LegendrePolynomial}(5, z)=\frac{1}{8}(63z^5-70z^3+15z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`13f971` · Fungrim entry ↗](https://fungrim.org/entry/13f971)

---

$$\mathrm{LegendrePolynomial}(1, z)=z$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`217521` · Fungrim entry ↗](https://fungrim.org/entry/217521)

---

$$(1-z^2)z\mapsto\mathrm{LegendrePolynomial}(n, z)^{\doubleprime}(z)+n(n+1)\mathrm{LegendrePolynomial}(n, z)-2zz\mapsto\mathrm{LegendrePolynomial}(n, z)^{\prime}(z)=0$$

**Holds when** $n\in\N\land z\in\C$.
Used by the Compute Engine for simplification.
[`27688e` · Fungrim entry ↗](https://fungrim.org/entry/27688e)

---

$$-(z(2n+1)\mathrm{LegendrePolynomial}(n, z))+n\mathrm{LegendrePolynomial}(n-1, z)+(n+1)\mathrm{LegendrePolynomial}(n+1, z)=0$$

**Holds when** $n\in\N^*\land z\in\C$.
Used by the Compute Engine for simplification.
[`367ac2` · Fungrim entry ↗](https://fungrim.org/entry/367ac2)

---

$$\mathrm{LegendrePolynomial}(n, z)=\mathrm{Hypergeometric2F_1}(-n, -n, 1, \frac{z+1}{z-1})(\frac{z-1}{2})^{n}$$

**Holds when** $n\in\N\land z\in\C\setminus\lbrace1\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`3c87b9` · Fungrim entry ↗](https://fungrim.org/entry/3c87b9)

---

$$\mathrm{LegendrePolynomial}(n, -1)=(-1)^{n}$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`3df748` · Fungrim entry ↗](https://fungrim.org/entry/3df748)

---

$$\mathrm{Count}(\mathrm{Zeros}(z\mapsto\mathrm{LegendrePolynomial}(n, z), \C))=n$$

**Holds when** $n\in\N$.
**Symbols:** **Zeros** — Zeros (roots) of function.
Used by the Compute Engine for simplification.
[`415911` · Fungrim entry ↗](https://fungrim.org/entry/415911)

---

$$\mathrm{LegendrePolynomial}(n, z)=\frac{t\mapsto{(t^2-1)}^{n}^{\prime}(z)}{n!\times2^{n}}$$

**Holds when** $n\in\N$ &nbsp;_or_&nbsp; $z\in\C$.
Used by the Compute Engine for simplification.
[`4cfeac` · Fungrim entry ↗](https://fungrim.org/entry/4cfeac)

---

$$\mathrm{LegendrePolynomial}(2n, 0)=\frac{\mathrm{Binomial}(2n, n)\times(-1)^{n}}{4^{n}}$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`674afa` · Fungrim entry ↗](https://fungrim.org/entry/674afa)

---

$$\mathrm{LegendrePolynomial}(2n, z)=\frac{\mathrm{Hypergeometric2F_1}(-n, n+\frac{1}{2}, \frac{1}{2}, z^2)\mathrm{Binomial}(2n, n)\times(-1)^{n}}{4^{n}}$$

**Holds when** $n\in\N\land z\in\C$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`6cd4a1` · Fungrim entry ↗](https://fungrim.org/entry/6cd4a1)

---

$$\mathrm{LegendrePolynomial}(2n+1, z)=\frac{z(2n+1)\mathrm{Hypergeometric2F_1}(-n, n+\frac{3}{2}, \frac{3}{2}, z^2)\mathrm{Binomial}(2n, n)\times(-1)^{n}}{4^{n}}$$

**Holds when** $n\in\N\land z\in\C$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`859445` · Fungrim entry ↗](https://fungrim.org/entry/859445)

---

$$\mathrm{LegendrePolynomial}(2n+1, 0)=0$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`85eebc` · Fungrim entry ↗](https://fungrim.org/entry/85eebc)

---

$$(1-z^2)z\mapsto\mathrm{LegendrePolynomial}(n, z)^{\prime}(z)+nz\mathrm{LegendrePolynomial}(n, z)-n\mathrm{LegendrePolynomial}(n-1, z)=0$$

**Holds when** $n\in\N^*\land z\in\C$.
Used by the Compute Engine for simplification.
[`925fdf` · Fungrim entry ↗](https://fungrim.org/entry/925fdf)

---

$$\mathrm{LegendrePolynomial}(n, z)=\mathrm{Hypergeometric2F_1}(-n, n+1, 1, \frac{1-z}{2})$$

**Holds when** $n\in\N\land z\in\C$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`9395fc` · Fungrim entry ↗](https://fungrim.org/entry/9395fc)

---

$$\mathrm{LegendrePolynomial}(3, z)=\frac{1}{2}(5z^3-3z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`9b7f05` · Fungrim entry ↗](https://fungrim.org/entry/9b7f05)

---

$$\mathrm{LegendrePolynomial}(0, z)=1$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`9bdf22` · Fungrim entry ↗](https://fungrim.org/entry/9bdf22)

---

$$\mathrm{LegendrePolynomial}(4, z)=\frac{1}{8}(35z^4-30z^2+3)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`a17386` · Fungrim entry ↗](https://fungrim.org/entry/a17386)

---

$$\mathrm{LegendrePolynomial}(n, 1)=1$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`a7ac51` · Fungrim entry ↗](https://fungrim.org/entry/a7ac51)

---

$$\mathrm{LegendrePolynomial}(n, z^\star)=\mathrm{LegendrePolynomial}(n, z)^\star$$

**Holds when** $n\in\N\land z\in\C$.
Used by the Compute Engine for expansion.
[`b2d723` · Fungrim entry ↗](https://fungrim.org/entry/b2d723)

---

$$\mathrm{LegendrePolynomial}(2, z)=\frac{1}{2}(3z^2-1)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`d77f0a` · Fungrim entry ↗](https://fungrim.org/entry/d77f0a)

---

$$\mathrm{LegendrePolynomial}(n, z)=\mathrm{Hypergeometric2F_1}(-(\frac{n}{2}), \frac{1-n}{2}, \frac{1}{2}-n, \frac{1}{z^2})\mathrm{Binomial}(2n, n)(\frac{z}{2})^{n}$$

**Holds when** $n\in\N\land z\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`f55f0a` · Fungrim entry ↗](https://fungrim.org/entry/f55f0a)

---

## Modular j-invariant

$$\mathrm{ModularJ}(\sqrt{2}\imaginaryI)=8\,000=8\,000$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`1356e4` · Fungrim entry ↗](https://fungrim.org/entry/1356e4)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{163}\imaginaryI))=-640\,320^3$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`1cb24e` · Fungrim entry ↗](https://fungrim.org/entry/1cb24e)

---

$$\mathrm{ModularJ}(2\imaginaryI)=287\,496=287\,496$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`229c97` · Fungrim entry ↗](https://fungrim.org/entry/229c97)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{7}\imaginaryI))=-3\,375$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`29c095` · Fungrim entry ↗](https://fungrim.org/entry/29c095)

---

$$\mathrm{ModularJ}(4\imaginaryI)=27(724+513\sqrt{2})^3$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`3189b9` · Fungrim entry ↗](https://fungrim.org/entry/3189b9)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{19}\imaginaryI))=-884\,736$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`3ee358` · Fungrim entry ↗](https://fungrim.org/entry/3ee358)

---

$$\mathrm{ModularJ}(-(\frac{1}{\tau}))=\mathrm{ModularJ}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`42a909` · Fungrim entry ↗](https://fungrim.org/entry/42a909)

---

$$\mathrm{Count}(\mathrm{Solutions}(\tau\mapsto\mathrm{ModularJ}(\tau)=z, \mathrm{ModularGroupFundamentalDomain}))=1$$

**Holds when** $z\in\C$.
**Symbols:** **ModularGroupFundamentalDomain** — Fundamental domain for action of the modular group; **ModularJ** — Modular j-invariant; **Solutions** — Solution set.
Used by the Compute Engine for simplification.
[`441301` · Fungrim entry ↗](https://fungrim.org/entry/441301)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{43}\imaginaryI))=-884\,736\,000$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`5b108e` · Fungrim entry ↗](https://fungrim.org/entry/5b108e)

---

$$\mathrm{ModularJ}(\tau)={(\frac{256\mathrm{DedekindEta}(2\tau)^{16}}{\mathrm{DedekindEta}(\tau)^{16}}+\frac{\mathrm{DedekindEta}(\tau)}{\mathrm{DedekindEta}(2\tau)}^8)}^3$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **ModularJ** — Modular j-invariant.
Used by the Compute Engine for expansion.
[`664b4c` · Fungrim entry ↗](https://fungrim.org/entry/664b4c)

---

$$\mathrm{ModularJ}(3\imaginaryI)=64(2+\sqrt{3})^2(21+20\sqrt{3})^3$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`8be46c` · Fungrim entry ↗](https://fungrim.org/entry/8be46c)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{67}\imaginaryI))=-147\,197\,952\,000$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`951017` · Fungrim entry ↗](https://fungrim.org/entry/951017)

---

$$\mathrm{ModularJ}(\exp(\frac{\imaginaryI\pi}{3}))=0$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`9aa62c` · Fungrim entry ↗](https://fungrim.org/entry/9aa62c)

---

$$\mathrm{ModularJ}(\frac{1}{2}(1+\sqrt{11}\imaginaryI))=-32\,768$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`a498dd` · Fungrim entry ↗](https://fungrim.org/entry/a498dd)

---

$$\mathrm{ModularJ}(\tau+1)=\mathrm{ModularJ}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`a997f2` · Fungrim entry ↗](https://fungrim.org/entry/a997f2)

---

$$\mathrm{ModularJ}(\imaginaryI)=1\,728$$

**Symbols:** **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`ad228f` · Fungrim entry ↗](https://fungrim.org/entry/ad228f)

---

$$\mathrm{ModularJ}(\tau)=\frac{32{(\mathrm{JacobiTheta}(2, 0, \tau)^8+\mathrm{JacobiTheta}(3, 0, \tau)^8+\mathrm{JacobiTheta}(4, 0, \tau)^8)}^3}{(\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, 0, \tau))^8}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`cedcfc` · Fungrim entry ↗](https://fungrim.org/entry/cedcfc)

---

$$\mathrm{ModularJ}(\tau)=\frac{\mathrm{EisensteinE}(4, \tau)^3}{\mathrm{DedekindEta}(\tau)^{24}}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series; **ModularJ** — Modular j-invariant.
Used by the Compute Engine for expansion.
[`dc8251` · Fungrim entry ↗](https://fungrim.org/entry/dc8251)

---

$$\tau\mapsto\mathrm{ModularJ}(\tau)^{\prime}(\tau)=-(\frac{2\imaginaryI\pi\mathrm{EisensteinE}(14, \tau)}{\mathrm{DedekindEta}(\tau)^{24}})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **EisensteinE** — Normalized Eisenstein series; **ModularJ** — Modular j-invariant.
Used by the Compute Engine for simplification.
[`f0f53b` · Fungrim entry ↗](https://fungrim.org/entry/f0f53b)

---

## Modular lambda function

$$\frac{1}{\mathrm{ModularLambda}(\tau)}=\frac{\mathrm{DedekindEta}(\tau/2)^8}{16\mathrm{DedekindEta}(2\tau)^8}+1$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`033d39` · Fungrim entry ↗](https://fungrim.org/entry/033d39)

---

$$1-\mathrm{ModularLambda}(\tau)=\frac{\mathrm{JacobiTheta}(4, 0, \tau)^4}{\mathrm{JacobiTheta}(3, 0, \tau)^4}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`04d3a6` · Fungrim entry ↗](https://fungrim.org/entry/04d3a6)

---

$$\mathrm{ModularLambda}(\frac{1+\imaginaryI}{2})=2$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`078869` · Fungrim entry ↗](https://fungrim.org/entry/078869)

---

$$\mathrm{ModularLambda}(-(\frac{1}{\tau}))=1-\mathrm{ModularLambda}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`07bf27` · Fungrim entry ↗](https://fungrim.org/entry/07bf27)

---

$$\mathrm{ModularLambda}(\tau)=\frac{\mathrm{WeierstrassP}((\tau+1)/2, \tau)-\mathrm{WeierstrassP}(\tau/2, \tau)}{\mathrm{WeierstrassP}(1/2, \tau)-\mathrm{WeierstrassP}(\tau/2, \tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function; **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`166402` · Fungrim entry ↗](https://fungrim.org/entry/166402)

---

$$\tau\mapsto\mathrm{ModularLambda}(\tau)^{\prime}(\tau)=\frac{1}{3}(\imaginaryI\pi(-6\mathrm{EisensteinE}(2, \tau)+8\mathrm{EisensteinE}(2, 2\tau)+\mathrm{EisensteinE}(2, \frac{\tau}{2}))\mathrm{ModularLambda}(\tau))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **EisensteinE** — Normalized Eisenstein series; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`27b2c7` · Fungrim entry ↗](https://fungrim.org/entry/27b2c7)

---

$$\mathrm{ModularLambda}(\frac{1}{1-\tau})=\frac{1}{1-\mathrm{ModularLambda}(\tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for expansion.
[`2ba627` · Fungrim entry ↗](https://fungrim.org/entry/2ba627)

---

$$\mathrm{ModularLambda}(2\imaginaryI)=17-12\sqrt{2}$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`35c85f` · Fungrim entry ↗](https://fungrim.org/entry/35c85f)

---

$$\mathrm{ModularLambda}(\frac{\tau-1}{\tau})=\frac{\mathrm{ModularLambda}(\tau)-1}{\mathrm{ModularLambda}(\tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`3a7a0b` · Fungrim entry ↗](https://fungrim.org/entry/3a7a0b)

---

$$\mathrm{ModularJ}(\tau)=\frac{256{(-\mathrm{ModularLambda}(\tau)+\mathrm{ModularLambda}(\tau)^2+1)}^3}{(1-\mathrm{ModularLambda}(\tau))^2\mathrm{ModularLambda}(\tau)^2}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularJ** — Modular j-invariant; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`44a529` · Fungrim entry ↗](https://fungrim.org/entry/44a529)

---

$$\mathrm{ModularLambda}(\frac{\imaginaryI}{2})=12\sqrt{2}-16$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`4877f2` · Fungrim entry ↗](https://fungrim.org/entry/4877f2)

---

$$\mathrm{ModularLambda}(\tau)=\frac{\mathrm{JacobiTheta}(2, 0, \tau)^4}{\mathrm{JacobiTheta}(3, 0, \tau)^4}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for expansion.
[`5b9c02` · Fungrim entry ↗](https://fungrim.org/entry/5b9c02)

---

$$\mathrm{ModularLambda}(\tau)=\frac{16\mathrm{DedekindEta}(2\tau)^{16}\mathrm{DedekindEta}(\tau/2)^8}{\mathrm{DedekindEta}(\tau)^{24}}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **DedekindEta** — Dedekind eta function; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`5dd24a` · Fungrim entry ↗](https://fungrim.org/entry/5dd24a)

---

$$\mathrm{ModularLambda}(\tau+2)=\mathrm{ModularLambda}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`6678af` · Fungrim entry ↗](https://fungrim.org/entry/6678af)

---

$$\mathrm{ModularLambdaFundamentalDomain}=\lbrace\tau, \tau\in\mathrm{HH}\in(1/2\lt\min(\vert\tau-1/2\vert, \vert z+1/2\vert)\land\Re(\tau)\in\lparen-1, 1\rparen\lor\Re(\tau)=-1\lor\vert\tau+1/2\vert=1/2)\rbrace$$

**Symbols:** **HH** — Upper complex half-plane; **ModularLambdaFundamentalDomain** — Fundamental domain of the modular lambda function.
Used by the Compute Engine for simplification.
**Reference:** J. M. Borwein and P. B. Borwein. Pi and the AGM. Wiley, New York, 1987. p. 113.
[`737f2b` · Fungrim entry ↗](https://fungrim.org/entry/737f2b)

---

$$\frac{\mathrm{ModularLambda}(\tau)}{\mathrm{ModularLambda}(\tau)-1}=-(\frac{\mathrm{JacobiTheta}(2, 0, \tau)^4}{\mathrm{JacobiTheta}(4, 0, \tau)^4})$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`903962` · Fungrim entry ↗](https://fungrim.org/entry/903962)

---

$$\mathrm{ModularLambda}(\imaginaryI)=\frac{1}{2}$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`a35b3c` · Fungrim entry ↗](https://fungrim.org/entry/a35b3c)

---

$$\mathrm{ModularLambda}(\exp(\frac{2\imaginaryI\pi}{3}))=-\exp(\frac{2\imaginaryI\pi}{3})$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`b0e1cb` · Fungrim entry ↗](https://fungrim.org/entry/b0e1cb)

---

$$\tau=\frac{\imaginaryI\mathrm{EllipticK}(1-\mathrm{ModularLambda}(\tau))}{\mathrm{EllipticK}(\mathrm{ModularLambda}(\tau))}$$

**Holds when** $\tau\in\mathrm{Interior}(\mathrm{ModularLambdaFundamentalDomain})\cup\lbrace\tau, \tau\in\mathrm{HH}\in\Re(\tau)=1\rbrace$.
**Symbols:** **EllipticK** — Legendre complete elliptic integral of the first kind; **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`b7174d` · Fungrim entry ↗](https://fungrim.org/entry/b7174d)

---

$$\mathrm{ModularLambda}(\tau+1)=\frac{\mathrm{ModularLambda}(\tau)}{\mathrm{ModularLambda}(\tau)-1}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`bbfb6c` · Fungrim entry ↗](https://fungrim.org/entry/bbfb6c)

---

$$\tau\mapsto\mathrm{ModularLambda}(\tau)^{\prime}(\tau)=\frac{1}{\pi}(2\imaginaryI(-6\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)+8\mathrm{WeierstrassZeta}(\frac{1}{2}, 2\tau)+\mathrm{WeierstrassZeta}(\frac{1}{2}, \frac{\tau}{2}))\mathrm{ModularLambda}(\tau))$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`c18c95` · Fungrim entry ↗](https://fungrim.org/entry/c18c95)

---

$$\mathrm{ModularLambda}(\frac{\tau}{1-\tau})=\frac{1}{\mathrm{ModularLambda}(\tau)}$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`e9f0c8` · Fungrim entry ↗](https://fungrim.org/entry/e9f0c8)

---

$$\mathrm{ModularLambda}(\frac{\tau}{2\tau+1})=\mathrm{ModularLambda}(\tau)$$

**Holds when** $\tau\in\mathrm{HH}$.
**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`ec5a44` · Fungrim entry ↗](https://fungrim.org/entry/ec5a44)

---

$$\mathrm{ModularLambda}(1+\imaginaryI)=-1$$

**Symbols:** **ModularLambda** — Modular lambda function.
Used by the Compute Engine for simplification.
[`fe2627` · Fungrim entry ↗](https://fungrim.org/entry/fe2627)

---

## Multiple zeta values

$$\mathrm{MultiZetaValue}(3, 3)=\frac{1}{2}(\Zeta(3)^2-\Zeta(6))$$

**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`3a5167` · Fungrim entry ↗](https://fungrim.org/entry/3a5167)

---

$$\mathrm{MultiZetaValue}(2, 2)=\frac{3\Zeta(4)}{4}$$

**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`62de01` · Fungrim entry ↗](https://fungrim.org/entry/62de01)

---

$$\mathrm{MultiZetaValue}(2, 3)=\frac{9\Zeta(5)}{2}-2\Zeta(2)\Zeta(3)$$

**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`856317` · Fungrim entry ↗](https://fungrim.org/entry/856317)

---

$$\mathrm{MultiZetaValue}(3, 2)=3\Zeta(2)\Zeta(3)-\frac{11\Zeta(5)}{2}$$

**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`a5e52e` · Fungrim entry ↗](https://fungrim.org/entry/a5e52e)

---

$$\mathrm{MultiZetaValue}(b, a)+\mathrm{MultiZetaValue}(a, b)=\Zeta(a)\Zeta(b)-\Zeta(a+b)$$

**Holds when** $a\in2..\infty\land b\in2..\infty$.
**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`da71d3` · Fungrim entry ↗](https://fungrim.org/entry/da71d3)

---

$$\mathrm{MultiZetaValue}(4, 2)=\Zeta(3)^2-\frac{4\Zeta(6)}{3}$$

**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`ef2c71` · Fungrim entry ↗](https://fungrim.org/entry/ef2c71)

---

$$\mathrm{MultiZetaValue}(s, s)=\frac{1}{2}(\Zeta(s)^2-\Zeta(2s))$$

**Holds when** $s\in2..\infty$.
**Symbols:** **MultiZetaValue** — Multiple zeta value (MZV).
Used by the Compute Engine for simplification.
[`ef8b17` · Fungrim entry ↗](https://fungrim.org/entry/ef8b17)

---

## Natural logarithm

$$\Re(\ln(z))=\ln(\vert z\vert)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`099b19` · Fungrim entry ↗](https://fungrim.org/entry/099b19)

---

$$\ln(z^\star)=\ln(z)^\star$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for expansion.
[`13895b` · Fungrim entry ↗](https://fungrim.org/entry/13895b)

---

$$\ln(-1)=\imaginaryI\pi$$

Used by the Compute Engine for simplification.
[`2f1f7b` · Fungrim entry ↗](https://fungrim.org/entry/2f1f7b)

---

$$\ln(\exponentialE^{z})=z$$

**Holds when** $z\in\C\land\Im(z)\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification and equation solving.
[`4c1e1e` · Fungrim entry ↗](https://fungrim.org/entry/4c1e1e)

---

$$\ln(\exponentialE)=1$$

Used by the Compute Engine for simplification.
[`699c83` · Fungrim entry ↗](https://fungrim.org/entry/699c83)

---

$$\ln(\exponentialE^{z})=z-2\imaginaryI\pi\lceil\frac{\Im(z)}{2\pi}-\frac{1}{2}\rceil$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`a3a253` · Fungrim entry ↗](https://fungrim.org/entry/a3a253)

---

$$\ln(\imaginaryI)=\frac{\imaginaryI\pi}{2}$$

Used by the Compute Engine for simplification.
[`c331da` · Fungrim entry ↗](https://fungrim.org/entry/c331da)

---

$$\ln(z)=\imaginaryI\arg(z)+\ln(\vert z\vert)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`c43533` · Fungrim entry ↗](https://fungrim.org/entry/c43533)

---

$$\vert\ln(z)\vert=\sqrt{\arg(z)^2+\ln(\vert z\vert)^2}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`dcc1e5` · Fungrim entry ↗](https://fungrim.org/entry/dcc1e5)

---

$$\ln(cz)=\ln(c)+\ln(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace\land c\in\lparen0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`f67fa2` · Fungrim entry ↗](https://fungrim.org/entry/f67fa2)

---

$$\Im(\ln(z))=\arg(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`fbfb81` · Fungrim entry ↗](https://fungrim.org/entry/fbfb81)

---

## Partition function

$$\mathrm{NPartition}(4)=\mathrm{Count}(\lbrace\bigl\lbrack4\bigr\rbrack, \bigl\lbrack3, 1\bigr\rbrack, \bigl\lbrack2, 2\bigr\rbrack, \bigl\lbrack2, 1, 1\bigr\rbrack, \bigl\lbrack1, 1, 1, 1\bigr\rbrack\rbrace)=5$$

Used by the Compute Engine for simplification.
[`6018a4` · Fungrim entry ↗](https://fungrim.org/entry/6018a4)

---

$$\mathrm{NPartition}(3)=\mathrm{Count}(\lbrace\bigl\lbrack3\bigr\rbrack, \bigl\lbrack2, 1\bigr\rbrack, \bigl\lbrack1, 1, 1\bigr\rbrack\rbrace)=3$$

Used by the Compute Engine for simplification.
[`7ef291` · Fungrim entry ↗](https://fungrim.org/entry/7ef291)

---

$$\mathrm{NPartition}(2)=\mathrm{Count}(\lbrace\bigl\lbrack2\bigr\rbrack, \bigl\lbrack1, 1\bigr\rbrack\rbrace)=2$$

Used by the Compute Engine for simplification.
[`b2583f` · Fungrim entry ↗](https://fungrim.org/entry/b2583f)

---

$$\mathrm{NPartition}(-n)=0$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`cd3013` · Fungrim entry ↗](https://fungrim.org/entry/cd3013)

---

$$\mathrm{NPartition}(0)=\mathrm{Count}(\lbrace\bigl\lbrack \bigr\rbrack\rbrace)=1$$

Used by the Compute Engine for simplification.
[`cebe1b` · Fungrim entry ↗](https://fungrim.org/entry/cebe1b)

---

$$\mathrm{NPartition}(1)=\mathrm{Count}(\lbrace\bigl\lbrack1\bigr\rbrack\rbrace)=1$$

Used by the Compute Engine for simplification.
[`e84642` · Fungrim entry ↗](https://fungrim.org/entry/e84642)

---

## Pi

$$1+\exp(\imaginaryI\pi)=0$$

Used by the Compute Engine for simplification.
[`271314` · Fungrim entry ↗](https://fungrim.org/entry/271314)

---

$$\frac{1}{\pi}=\frac{1}{9}(2\sqrt{3}\mathrm{Hypergeometric2F_1}(\frac{-1}{3}, \frac{1}{3}, 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`68b73d` · Fungrim entry ↗](https://fungrim.org/entry/68b73d)

---

$$\frac{1}{\pi}=\frac{1}{2}(\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{-1}{2}, 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`a7095f` · Fungrim entry ↗](https://fungrim.org/entry/a7095f)

---

$$\frac{1}{\pi}=\frac{1}{4}(\mathrm{Hypergeometric2F_1}(\frac{-1}{2}, \frac{-1}{2}, 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`c6c108` · Fungrim entry ↗](https://fungrim.org/entry/c6c108)

---

## Powers

$$(a+\imaginaryI b)^{c+\imaginaryI d}=(\imaginaryI\sin(c\arg(a+\imaginaryI b)+d\ln(\vert a+\imaginaryI b\vert))+\cos(c\arg(a+\imaginaryI b)+d\ln(\vert a+\imaginaryI b\vert)))\exp(-(d\arg(a+\imaginaryI b)))\vert a+\imaginaryI b\vert^{c}$$

**Holds when** $a+\imaginaryI b\ne0\land a\in\R\land b\in\R\land c\in\R\land d\in\R$.
Used by the Compute Engine for simplification.
[`0aac97` · Fungrim entry ↗](https://fungrim.org/entry/0aac97)

---

$$\Im((a+\imaginaryI b)^{c+\imaginaryI d})=\sin(c\arg(a+\imaginaryI b)+d\ln(\vert a+\imaginaryI b\vert))\exp(-(d\arg(a+\imaginaryI b)))\vert a+\imaginaryI b\vert^{c}$$

**Holds when** $a+\imaginaryI b\ne0\land a\in\R\land b\in\R\land c\in\R\land d\in\R$.
Used by the Compute Engine for simplification.
[`18873d` · Fungrim entry ↗](https://fungrim.org/entry/18873d)

---

$$(xy)^{a}=\exp(2\imaginaryI\pi a\lfloor\frac{-\arg(x)-\arg(y)+\pi}{2\pi}\rfloor)x^{a}y^{a}$$

**Holds when** $a\in\C\land x\in\C\setminus\lbrace0\rbrace\land y\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`2090c3` · Fungrim entry ↗](https://fungrim.org/entry/2090c3)

---

$$z^0=1$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`310f36` · Fungrim entry ↗](https://fungrim.org/entry/310f36)

---

$$a^{b}=\exp(b\ln(a))$$

**Holds when** $b\in\C\land a\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`4d6416` · Fungrim entry ↗](https://fungrim.org/entry/4d6416)

---

$$z^{n+1}=zz^{n}$$

**Holds when** $z\in\C\land n\in\N$ &nbsp;_or_&nbsp; $z\in R\land R\in\mathrm{Rings}\land n\in\N$.
Used by the Compute Engine for simplification.
[`6c2b31` · Fungrim entry ↗](https://fungrim.org/entry/6c2b31)

---

$$\vert(a+\imaginaryI b)^{c+\imaginaryI d}\vert=\exp(-(d\arg(a+\imaginaryI b)))\vert a+\imaginaryI b\vert^{c}$$

**Holds when** $a+\imaginaryI b\ne0\land a\in\R\land b\in\R\land c\in\R\land d\in\R$.
Used by the Compute Engine for simplification.
[`bc4d0a` · Fungrim entry ↗](https://fungrim.org/entry/bc4d0a)

---

$$\Re((a+\imaginaryI b)^{c+\imaginaryI d})=\cos(c\arg(a+\imaginaryI b)+d\ln(\vert a+\imaginaryI b\vert))\exp(-(d\arg(a+\imaginaryI b)))\vert a+\imaginaryI b\vert^{c}$$

**Holds when** $a+\imaginaryI b\ne0\land a\in\R\land b\in\R\land c\in\R\land d\in\R$.
Used by the Compute Engine for simplification.
[`caf8cf` · Fungrim entry ↗](https://fungrim.org/entry/caf8cf)

---

## Prime numbers

$$\mathrm{PrimePi}(x)=\mathrm{Count}(\lbrace p, p\in\mathrm{Primes}\in p\le x\rbrace)$$

**Holds when** $x\in\R$.
**Symbols:** **PrimePi** — Prime counting function.
Used by the Compute Engine for simplification.
[`04427b` · Fungrim entry ↗](https://fungrim.org/entry/04427b)

---

## Riemann zeta function

$$\mathrm{KeiperLiLambda}(0)=0$$

**Symbols:** **KeiperLiLambda** — Keiper-Li coefficient.
Used by the Compute Engine for simplification.
[`081205` · Fungrim entry ↗](https://fungrim.org/entry/081205)

---

$$\mathrm{StieltjesGamma}(n, 1)=\mathrm{StieltjesGamma}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for expansion.
[`51206a` · Fungrim entry ↗](https://fungrim.org/entry/51206a)

---

$$\Zeta(-n)=\frac{\mathrm{BernoulliB}(n+1)\times(-1)^{n}}{n+1}$$

**Holds when** $0\le n\land n\in\Z$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`51fd98` · Fungrim entry ↗](https://fungrim.org/entry/51fd98)

---

$$\mathrm{RiemannZetaZero}(-n)=\mathrm{RiemannZetaZero}(n)^\star$$

**Holds when** $n\ne0\land n\in\Z$.
**Symbols:** **RiemannZetaZero** — Nontrivial zero of the Riemann zeta function.
Used by the Compute Engine for simplification.
[`60c2ec` · Fungrim entry ↗](https://fungrim.org/entry/60c2ec)

---

$$\mathrm{HurwitzZeta}(s, a)=\sum_{n=0}^{\infty}\frac{1}{n!}(\mathrm{StieltjesGamma}(n, a)\times(-1)^{n}(s-1)^{n})+\frac{1}{s-1}$$

**Holds when** $a\notin\Z_{\le0}\land s\in\C\land a\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function; **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`60c6da` · Fungrim entry ↗](https://fungrim.org/entry/60c6da)

---

$$\mathrm{StieltjesGamma}(n, a+1)=\mathrm{StieltjesGamma}(n, a)-\frac{\ln(a)^{n}}{a}$$

**Holds when** $a\notin\Z_{\le0}\land n\in\N\land a\in\C$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`687b4d` · Fungrim entry ↗](https://fungrim.org/entry/687b4d)

---

$$\Zeta(s^\star)=\Zeta(s)^\star$$

**Holds when** $s\ne1\land s\in\C$.
Used by the Compute Engine for expansion.
[`69348a` · Fungrim entry ↗](https://fungrim.org/entry/69348a)

---

$$\mathrm{StieltjesGamma}(1, \frac{1}{2})=-2\gamma\ln(2)-\ln(2)^2+\mathrm{StieltjesGamma}(1)$$

**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`70a705` · Fungrim entry ↗](https://fungrim.org/entry/70a705)

---

$$\Zeta(2n)=\frac{\mathrm{BernoulliB}(2n)\times(-1)^{n+1}(2\pi)^{2n}}{2(2n)!}$$

**Holds when** $1\le n\land n\in\Z$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`72ccda` · Fungrim entry ↗](https://fungrim.org/entry/72ccda)

---

$$\Zeta(s)=\sum_{k=1}^{\mathrm{N_{var}}-1}k^{-s}-\int_{\mathrm{N_{var}}}^{\infty}\!\frac{\mathrm{RisingFactorial}(s, 2M)\mathrm{BernoulliPolynomial}(2M, t-\lfloor t\rfloor)}{(2M)!t^{2M+s}}\, \mathrm{d}t+\frac{\sum_{k=1}^{M}\frac{\mathrm{RisingFactorial}(s, 2k-1)\mathrm{BernoulliB}(2k)}{(2k)!\mathrm{N_{var}}^{2k-1}}+\frac{1}{2}}{\mathrm{N_{var}}^{s}}+\frac{\mathrm{N_{var}}^{1-s}}{s-1}$$

**Holds when** $s\ne1\land1\le\mathrm{N_{var}}\land1\le M\land0\lt\Re(2M+s-1)\land s\in\C\land\mathrm{N_{var}}\in\Z\land M\in\Z$.
**Symbols:** **BernoulliB** — Bernoulli number; **BernoulliPolynomial** — Bernoulli polynomial; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
**References:**
- F. Johansson (2015), Rigorous high-precision computation of the Hurwitz zeta function and its derivatives, Numerical Algorithms 69:253, DOI: 10.1007/s11075-014-9893-1
- F. W. J. Olver, Asymptotics and Special Functions, AK Peters, 1997. Chapter 8.
[`792f7b` · Fungrim entry ↗](https://fungrim.org/entry/792f7b)

---

$$\mathrm{StieltjesGamma}(0, 1)=\mathrm{StieltjesGamma}(0)=\gamma$$

**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`8ae153` · Fungrim entry ↗](https://fungrim.org/entry/8ae153)

---

$$\Zeta(2)=\frac{\pi^2}{6}$$

Used by the Compute Engine for simplification.
[`a01b6e` · Fungrim entry ↗](https://fungrim.org/entry/a01b6e)

---

$$\Zeta(s)=\sum_{n=0}^{\infty}\frac{1}{n!}(\mathrm{StieltjesGamma}(n)\times(-1)^{n}(s-1)^{n})+\frac{1}{s-1}$$

**Holds when** $s\in\C$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`b1a2e1` · Fungrim entry ↗](https://fungrim.org/entry/b1a2e1)

---

$$\mathrm{StieltjesGamma}(0, a)=-\mathrm{Digamma}(a)$$

**Holds when** $a\notin\Z_{\le0}\land a\in\C$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`b6808d` · Fungrim entry ↗](https://fungrim.org/entry/b6808d)

---

$$\mathrm{KeiperLiLambda}(1)=1-\frac{\ln(4\pi)}{2}+\frac{\gamma}{2}$$

**Symbols:** **KeiperLiLambda** — Keiper-Li coefficient.
Used by the Compute Engine for simplification.
[`d8d820` · Fungrim entry ↗](https://fungrim.org/entry/d8d820)

---

$$\mathrm{KeiperLiLambda}(n)=\frac{1}{n!}(s\mapsto\ln(2\mathrm{RiemannXi}(s/(s-1)))^{\prime}(0))$$

**Holds when** $n\in\N$.
**Symbols:** **KeiperLiLambda** — Keiper-Li coefficient.
Used by the Compute Engine for simplification.
[`fcab61` · Fungrim entry ↗](https://fungrim.org/entry/fcab61)

---

$$\Zeta(-2n)=0$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
`zeta-trivial-zeros` · _curated identity (not in the upstream Fungrim corpus)_

---

## Sinc function

$$\mathrm{sinc}(z)=\begin{cases}\frac{\sin(z)}{z}&z\ne0\\1&z=0\end{cases}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`01422b` · Fungrim entry ↗](https://fungrim.org/entry/01422b)

---

$$\mathrm{sinc}(z)=\frac{\sqrt{2}\operatorname{J}_{\frac{1}{2}}(z)\sqrt{\pi}}{2\sqrt{z}}$$

**Holds when** $z\ne0\land z\in\C$.
Used by the Compute Engine for simplification.
[`19d7d9` · Fungrim entry ↗](https://fungrim.org/entry/19d7d9)

---

$$z\mapsto\mathrm{sinc}(z)^{\prime}(0)=\begin{cases}\frac{(-1)^{\lfloor n/2\rfloor}}{n+1}&\lnot\mathrm{IsOdd}(n)\\0&\mathrm{IsOdd}(n)\end{cases}$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`1c3766` · Fungrim entry ↗](https://fungrim.org/entry/1c3766)

---

$$\mathrm{ArgMin}(x\mapsto\mathrm{sinc}(x), \R)=\lbrace-\mathrm{BesselJZero}(3/2, 1), \mathrm{BesselJZero}(\frac{3}{2}, 1)\rbrace$$

**Symbols:** **ArgMin** — Locations of minimum value.
Used by the Compute Engine for simplification.
[`1e6344` · Fungrim entry ↗](https://fungrim.org/entry/1e6344)

---

$$\mathrm{sinc}(\frac{\pi}{3})=\frac{3\sqrt{3}}{2\pi}$$

Used by the Compute Engine for simplification.
[`340936` · Fungrim entry ↗](https://fungrim.org/entry/340936)

---

$$\mathrm{sinc}(z^\star)=\mathrm{sinc}(z)^\star$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`3a428f` · Fungrim entry ↗](https://fungrim.org/entry/3a428f)

---

$$\mathrm{sinc}(\frac{\pi}{6})=\frac{3}{\pi}$$

Used by the Compute Engine for simplification.
[`45740a` · Fungrim entry ↗](https://fungrim.org/entry/45740a)

---

$$z\mapsto\mathrm{sinc}(z)^{\prime}(z)=-(\frac{1}{3}(z\mathrm{Hypergeometric0F_1}(5/2, -(z^2/4))))$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`50f72f` · Fungrim entry ↗](https://fungrim.org/entry/50f72f)

---

$$\mathrm{sinc}(\pi n)=\begin{cases}1&n=0\\0&n\ne0\end{cases}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`593e63` · Fungrim entry ↗](https://fungrim.org/entry/593e63)

---

$$\max(\lbrace\mathrm{sinc}(x), x\in\R\rbrace)=1$$

Used by the Compute Engine for simplification.
[`632d1c` · Fungrim entry ↗](https://fungrim.org/entry/632d1c)

---

$$z\mapsto\mathrm{sinc}(z)^{\prime}(z)=\begin{cases}\frac{\cos(z)}{z}-\frac{\sin(z)}{z^2}&z\ne0\\0&z=0\end{cases}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`768c77` · Fungrim entry ↗](https://fungrim.org/entry/768c77)

---

$$z\mapsto\mathrm{sinc}(z)^{\doubleprime}(z)=\begin{cases}(\frac{2}{z^3}-\frac{1}{z})\sin(z)-\frac{2\cos(z)}{z^2}&z\ne0\\\frac{-1}{3}&z=0\end{cases}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`90c66a` · Fungrim entry ↗](https://fungrim.org/entry/90c66a)

---

$$\mathrm{sinc}(0)=1$$

Used by the Compute Engine for simplification.
[`b18020` · Fungrim entry ↗](https://fungrim.org/entry/b18020)

---

$$\mathrm{ArgMaxUnique}(x\mapsto\mathrm{sinc}(x), \R)=0$$

**Symbols:** **ArgMaxUnique** — Unique location of maximum value.
Used by the Compute Engine for simplification.
[`b1a260` · Fungrim entry ↗](https://fungrim.org/entry/b1a260)

---

$$\mathrm{sinc}(\imaginaryI z)=\frac{\sinh(z)}{z}$$

**Holds when** $z\ne0\land z\in\C$.
Used by the Compute Engine for expansion.
[`b41d08` · Fungrim entry ↗](https://fungrim.org/entry/b41d08)

---

$$z\mathrm{sinc}(z)+zz\mapsto\mathrm{sinc}(z)^{\doubleprime}(z)+2z\mapsto\mathrm{sinc}(z)^{\prime}(z)=0$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`c6e6b2` · Fungrim entry ↗](https://fungrim.org/entry/c6e6b2)

---

$$\mathrm{sinc}(\frac{\pi}{4})=\frac{2\sqrt{2}}{\pi}$$

Used by the Compute Engine for simplification.
[`c9ead2` · Fungrim entry ↗](https://fungrim.org/entry/c9ead2)

---

$$\mathrm{sinc}(2z)=\cos(z)\mathrm{sinc}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`d5000a` · Fungrim entry ↗](https://fungrim.org/entry/d5000a)

---

$$\min(\lbrace\mathrm{sinc}(x), x\in\R\rbrace)=\mathrm{sinc}(\mathrm{BesselJZero}(\frac{3}{2}, 1))$$

Used by the Compute Engine for simplification.
[`da7fb1` · Fungrim entry ↗](https://fungrim.org/entry/da7fb1)

---

$$\mathrm{sinc}(z)=\mathrm{Hypergeometric0F_1}(\frac{3}{2}, -(\frac{z^2}{4}))$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`e2878f` · Fungrim entry ↗](https://fungrim.org/entry/e2878f)

---

$$\mathrm{sinc}(-z)=\mathrm{sinc}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f19e0a` · Fungrim entry ↗](https://fungrim.org/entry/f19e0a)

---

$$\mathrm{sinc}(z)=\frac{\sin(z)}{z}$$

**Holds when** $z\ne0\land z\in\C$.
Used by the Compute Engine for simplification.
[`fa9283` · Fungrim entry ↗](https://fungrim.org/entry/fa9283)

---

$$\mathrm{sinc}(\frac{\pi}{2})=\frac{2}{\pi}$$

Used by the Compute Engine for simplification.
[`fdc94c` · Fungrim entry ↗](https://fungrim.org/entry/fdc94c)

---

$$\frac{z(n^2+5n+6)z\mapsto\mathrm{sinc}(z)^{\prime}(z)}{(n+3)!}+\frac{(n^2+5n+6)z\mapsto\mathrm{sinc}(z)^{\prime}(z)}{(n+2)!}+\frac{zz\mapsto\mathrm{sinc}(z)^{\prime}(z)}{(n+1)!}+\frac{1}{n!}(z\mapsto\mathrm{sinc}(z)^{\prime}(z))=0$$

**Holds when** $z\in\C\land n\in\N$.
Used by the Compute Engine for simplification.
[`ff5e82` · Fungrim entry ↗](https://fungrim.org/entry/ff5e82)

---

## Sine

$$\sin(a)\cos(b)=\frac{1}{2}(\sin(a+b)+\sin(a-b))$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`012eba` · Fungrim entry ↗](https://fungrim.org/entry/012eba)

---

$$\Im(\sin(x+\imaginaryI y))=\cos(x)\sinh(y)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`037a6e` · Fungrim entry ↗](https://fungrim.org/entry/037a6e)

---

$$\sin(z)=\operatorname{J}_{\frac{1}{2}}(z)\sqrt{\frac{\pi z}{2}}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`0fbd15` · Fungrim entry ↗](https://fungrim.org/entry/0fbd15)

---

$$\sin(z)=\frac{\exp(\imaginaryI z)-\exp(-(\imaginaryI z))}{2\imaginaryI}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`18f40c` · Fungrim entry ↗](https://fungrim.org/entry/18f40c)

---

$$\sin(2z)=2\sin(z)\cos(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1b11be` · Fungrim entry ↗](https://fungrim.org/entry/1b11be)

---

$$\sin(z+\pi)=-\sin(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`1c22f1` · Fungrim entry ↗](https://fungrim.org/entry/1c22f1)

---

$$\sin(z)+z\mapsto\sin(z)^{\doubleprime}(z)=0$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`21f156` · Fungrim entry ↗](https://fungrim.org/entry/21f156)

---

$$\sin(a)^2-\sin(b)^2=\sin(a+b)\sin(a-b)$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`2392f5` · Fungrim entry ↗](https://fungrim.org/entry/2392f5)

---

$$\sin(z)^2=1-\cos(z)^2$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`244127` · Fungrim entry ↗](https://fungrim.org/entry/244127)

---

$$\min(\lbrace\sin(x), x\in\R\rbrace)=-1$$

Used by the Compute Engine for simplification.
[`27766c` · Fungrim entry ↗](https://fungrim.org/entry/27766c)

---

$$z\mapsto\sin(z)^{\doubleprime}(z)=-\sin(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`297b3c` · Fungrim entry ↗](https://fungrim.org/entry/297b3c)

---

$$\sin(x)=\Im(\exp(\imaginaryI x))$$

**Holds when** $x\in\R$.
Used by the Compute Engine for simplification.
[`299209` · Fungrim entry ↗](https://fungrim.org/entry/299209)

---

$$\sin(z)^3=\frac{1}{4}(3\sin(z)-\sin(3z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`2a6702` · Fungrim entry ↗](https://fungrim.org/entry/2a6702)

---

$$\sin(\pi k+z)=\sin(z)\times(-1)^{k}$$

**Holds when** $z\in\C\land k\in\Z$.
Used by the Compute Engine for simplification.
[`393b62` · Fungrim entry ↗](https://fungrim.org/entry/393b62)

---

$$\sin(a+\imaginaryI b)=\imaginaryI\cos(a)\sinh(b)+\sin(a)\cosh(b)$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`3b839c` · Fungrim entry ↗](https://fungrim.org/entry/3b839c)

---

$$\sin(\frac{\pi}{3})=\frac{\sqrt{3}}{2}$$

Used by the Compute Engine for simplification.
[`3c833f` · Fungrim entry ↗](https://fungrim.org/entry/3c833f)

---

$$\sin(z)^2+\cos(z)^2=1$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`4948ea` · Fungrim entry ↗](https://fungrim.org/entry/4948ea)

---

$$\sin(\pi k+\frac{\pi}{2})=(-1)^{k}$$

**Holds when** $k\in\Z$.
Used by the Compute Engine for simplification.
[`506d0c` · Fungrim entry ↗](https://fungrim.org/entry/506d0c)

---

$$\sin(a-b)=\sin(a)\cos(b)-\sin(b)\cos(a)$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`508e2c` · Fungrim entry ↗](https://fungrim.org/entry/508e2c)

---

$$\sin(z)=z\mathrm{Hypergeometric0F_1}(\frac{3}{2}, \frac{-z^2}{4})$$

**Holds when** $z\in\C$.
**Symbols:** **Hypergeometric0F1** — Confluent hypergeometric limit function.
Used by the Compute Engine for simplification.
[`54daa9` · Fungrim entry ↗](https://fungrim.org/entry/54daa9)

---

$$\sin(z)^{2n}=\frac{2(\sum_{k=0}^{n-1}\cos(2z(n-k))\mathrm{Binomial}(2n, k)\times(-1)^{k+n})}{4^{n}}+\frac{\mathrm{Binomial}(2n, n)}{4^{n}}$$

**Holds when** $z\in\C\land n\in\N$.
Used by the Compute Engine for simplification.
[`54f420` · Fungrim entry ↗](https://fungrim.org/entry/54f420)

---

$$\sin(\frac{3\pi}{2})=-1$$

Used by the Compute Engine for simplification.
[`56667c` · Fungrim entry ↗](https://fungrim.org/entry/56667c)

---

$$\sin(\frac{\pi}{4})=\frac{\sqrt{2}}{2}$$

Used by the Compute Engine for simplification.
[`5fc688` · Fungrim entry ↗](https://fungrim.org/entry/5fc688)

---

$$z\mapsto\sin(z)^{\prime}(z)=\sin(\frac{\pi r}{2}+z)$$

**Holds when** $z\in\C\land r\in\N$.
Used by the Compute Engine for simplification.
[`612b21` · Fungrim entry ↗](https://fungrim.org/entry/612b21)

---

$$\sin(\frac{\pi}{2})=1$$

Used by the Compute Engine for simplification.
[`69c5ef` · Fungrim entry ↗](https://fungrim.org/entry/69c5ef)

---

$$\sin(2\pi k+z)=\sin(z)$$

**Holds when** $z\in\C\land k\in\Z$.
Used by the Compute Engine for simplification.
[`6a8889` · Fungrim entry ↗](https://fungrim.org/entry/6a8889)

---

$$\sin(z)-\cos(z)=\sqrt{2}\sin(z-\frac{\pi}{4})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`6c3ba9` · Fungrim entry ↗](https://fungrim.org/entry/6c3ba9)

---

$$\sin(3z)=3\sin(z)-4\sin(z)^3$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`729215` · Fungrim entry ↗](https://fungrim.org/entry/729215)

---

$$\Re(\sin(x+\imaginaryI y))=\sin(x)\cosh(y)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`729b70` · Fungrim entry ↗](https://fungrim.org/entry/729b70)

---

$$\sin(a+b)=\sin(b)\cos(a)+\sin(a)\cos(b)$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`742943` · Fungrim entry ↗](https://fungrim.org/entry/742943)

---

$$\sin(\imaginaryI z)=\imaginaryI\sinh(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`755655` · Fungrim entry ↗](https://fungrim.org/entry/755655)

---

$$\sin(z^\star)=\sin(z)^\star$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`82c83f` · Fungrim entry ↗](https://fungrim.org/entry/82c83f)

---

$$\sin(z)=\cos(\frac{\pi}{2}-z)=\cos(z-\frac{\pi}{2})=-\cos(z+\frac{\pi}{2})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`925e5b` · Fungrim entry ↗](https://fungrim.org/entry/925e5b)

---

$$\sin(z)^2-\cos(z)^2=-\cos(2z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`954066` · Fungrim entry ↗](https://fungrim.org/entry/954066)

---

$$\sin(\pi-z)=\sin(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`9cc0f2` · Fungrim entry ↗](https://fungrim.org/entry/9cc0f2)

---

$$\sin(-z)=-\sin(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`a2a30d` · Fungrim entry ↗](https://fungrim.org/entry/a2a30d)

---

$$z\mapsto\sin(z)^{\prime}(z)=-z\mapsto\sin(z)^{\prime}(z)$$

**Holds when** $z\in\C\land r\in\N$.
Used by the Compute Engine for expansion.
[`a6667d` · Fungrim entry ↗](https://fungrim.org/entry/a6667d)

---

$$\vert\sin(x+\imaginaryI y)\vert=\sqrt{\sin(x)^2+\sinh(y)^2}$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`abaf91` · Fungrim entry ↗](https://fungrim.org/entry/abaf91)

---

$$\mathrm{ArgMin}(x\mapsto\sin(x), \R)=\lbrace\pi(2n-\frac{1}{2}), n\in\Z\rbrace$$

**Symbols:** **ArgMin** — Locations of minimum value.
Used by the Compute Engine for simplification.
[`ad04bd` · Fungrim entry ↗](https://fungrim.org/entry/ad04bd)

---

$$\sin(\frac{\pi}{6})=\frac{1}{2}$$

Used by the Compute Engine for simplification.
[`ad6b74` · Fungrim entry ↗](https://fungrim.org/entry/ad6b74)

---

$$\sin(a)\sin(b)=\frac{1}{2}(\cos(a-b)-\cos(a+b))$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`ad6c1c` · Fungrim entry ↗](https://fungrim.org/entry/ad6c1c)

---

$$\imaginaryI\sin(z)+\cos(z)=\exp(\imaginaryI z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`adbc1a` · Fungrim entry ↗](https://fungrim.org/entry/adbc1a)

---

$$\sin(z+\frac{\pi}{2})=\cos(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`bae475` · Fungrim entry ↗](https://fungrim.org/entry/bae475)

---

$$\max(\lbrace\sin(x), x\in\R\rbrace)=1$$

Used by the Compute Engine for simplification.
[`bfe28b` · Fungrim entry ↗](https://fungrim.org/entry/bfe28b)

---

$$\sin(0)=0$$

Used by the Compute Engine for simplification.
[`c52772` · Fungrim entry ↗](https://fungrim.org/entry/c52772)

---

$$\mathrm{ArgMax}(x\mapsto\sin(x), \R)=\lbrace\pi(2n+\frac{1}{2}), n\in\Z\rbrace$$

**Symbols:** **ArgMax** — Locations of maximum value.
Used by the Compute Engine for simplification.
[`c5bdcc` · Fungrim entry ↗](https://fungrim.org/entry/c5bdcc)

---

$$\sin(\pi k)=0$$

**Holds when** $k\in\Z$.
Used by the Compute Engine for simplification.
[`c62afa` · Fungrim entry ↗](https://fungrim.org/entry/c62afa)

---

$$\sin(z)^2=\frac{1}{2}(1-\cos(2z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`cf6e35` · Fungrim entry ↗](https://fungrim.org/entry/cf6e35)

---

$$\sin(z)=-(\imaginaryI\sinh(\imaginaryI z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`cfc5c3` · Fungrim entry ↗](https://fungrim.org/entry/cfc5c3)

---

$$(\imaginaryI\sin(z)+\cos(z))^{n}=\imaginaryI\sin(nz)+\cos(nz)$$

**Holds when** $z\in\C\land n\in\Z$.
Used by the Compute Engine for simplification.
[`d0505f` · Fungrim entry ↗](https://fungrim.org/entry/d0505f)

---

$$\sin(\pi z)=(\pi)(\Gamma(z)\Gamma(1-z))^{-1}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`d38a03` · Fungrim entry ↗](https://fungrim.org/entry/d38a03)

---

$$\sin(a)+\sin(b)=2\sin(\frac{a+b}{2})\cos(\frac{a-b}{2})$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`d59bd9` · Fungrim entry ↗](https://fungrim.org/entry/d59bd9)

---

$$z\mapsto\sin(z)^{\prime}(z)=z\mapsto\sin(z)^{\prime}(z)$$

**Holds when** $z\in\C\land r\in\N$.
Used by the Compute Engine for expansion.
[`d81355` · Fungrim entry ↗](https://fungrim.org/entry/d81355)

---

$$\sin(\frac{\pi}{2}-z)=\cos(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`da58f7` · Fungrim entry ↗](https://fungrim.org/entry/da58f7)

---

$$\sin(\pi)=0$$

Used by the Compute Engine for simplification.
[`e2161b` · Fungrim entry ↗](https://fungrim.org/entry/e2161b)

---

$$\sin(a)-\sin(b)=2\sin(\frac{a-b}{2})\cos(\frac{a+b}{2})$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`e69cf6` · Fungrim entry ↗](https://fungrim.org/entry/e69cf6)

---

$$\sin(z)+\cos(z)=\sqrt{2}\sin(z+\frac{\pi}{4})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`f183d0` · Fungrim entry ↗](https://fungrim.org/entry/f183d0)

---

$$\sin(a)^2-\cos(b)^2=-(\cos(a+b)\cos(a-b))$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`f6d0c6` · Fungrim entry ↗](https://fungrim.org/entry/f6d0c6)

---

$$z\mapsto\sin(z)^{\prime}(z)=\cos(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f7ab32` · Fungrim entry ↗](https://fungrim.org/entry/f7ab32)

---

## Square roots

$$\sqrt{z}^2=z$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`0984ef` · Fungrim entry ↗](https://fungrim.org/entry/0984ef)

---

$$\sqrt{\imaginaryI}=\frac{1}{2}(\sqrt{2}(1+\imaginaryI))$$

Used by the Compute Engine for simplification.
[`0ad836` · Fungrim entry ↗](https://fungrim.org/entry/0ad836)

---

$$\sqrt{\frac{a}{b}}=\frac{\sqrt{a}}{\sqrt{b}}$$

**Holds when** $a\in\C\land b\in\lparen0, \infty\rparen$ &nbsp;_or_&nbsp; $a\in\lbrack0, \infty\rparen\land b\in\C\setminus\lparen-\infty, 0\rbrack$ &nbsp;_or_&nbsp; $a\in\C\land b\in\C\setminus\lbrace0\rbrace\land\arg(a)-\arg(b)\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification.
[`0d8e03` · Fungrim entry ↗](https://fungrim.org/entry/0d8e03)

---

$$\sqrt{r\exp(\imaginaryI\theta)}=\exp(\frac{\imaginaryI\theta}{2})\sqrt{r}$$

**Holds when** $r\in\lbrack0, \infty\rparen\land\theta\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification.
[`1232f7` · Fungrim entry ↗](https://fungrim.org/entry/1232f7)

---

$$\sqrt{\frac{z}{c-z}}=\sqrt{z}\sqrt{\frac{1}{c-z}}$$

**Holds when** $c-z\ne0\land z\in\R\land c\in\lbrack0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`185efc` · Fungrim entry ↗](https://fungrim.org/entry/185efc)

---

$$\arg(\sqrt{z})=\frac{\arg(z)}{2}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`22e0be` · Fungrim entry ↗](https://fungrim.org/entry/22e0be)

---

$$z\mapsto\sqrt{z}^{\prime}(z)=\frac{1}{2\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`2a11ab` · Fungrim entry ↗](https://fungrim.org/entry/2a11ab)

---

$$\sqrt{-1}=\imaginaryI$$

Used by the Compute Engine for simplification.
[`2eb54a` · Fungrim entry ↗](https://fungrim.org/entry/2eb54a)

---

$$\sqrt{\tilde\infty}=\tilde\infty$$

Used by the Compute Engine for simplification.
[`31a8ca` · Fungrim entry ↗](https://fungrim.org/entry/31a8ca)

---

$$\sqrt{x^2}=\vert x\vert$$

**Holds when** $x\in\R$.
Used by the Compute Engine for simplification.
[`3cc884` · Fungrim entry ↗](https://fungrim.org/entry/3cc884)

---

$$z\mapsto\sqrt{z}^{\doubleprime}(z)=-((4z^{1/2}^{3})^{-1})$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`3e71f4` · Fungrim entry ↗](https://fungrim.org/entry/3e71f4)

---

$$\Re(\sqrt{z})=\sqrt{\frac{\Re(z)+\vert z\vert}{2}}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`4ed6a8` · Fungrim entry ↗](https://fungrim.org/entry/4ed6a8)

---

$$\sqrt{\frac{z}{2}}=\frac{\sqrt{2}\sqrt{z}}{2}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`616bcb` · Fungrim entry ↗](https://fungrim.org/entry/616bcb)

---

$$\sqrt{z}=\exp(\frac{\ln(z)}{2})$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`627c9c` · Fungrim entry ↗](https://fungrim.org/entry/627c9c)

---

$$\sqrt{\frac{z}{z-c}}=\frac{\sqrt{-z}}{\sqrt{c-z}}$$

**Holds when** $z-c\ne0\land z\in\C\land c\in\lbrack0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`6f63dd` · Fungrim entry ↗](https://fungrim.org/entry/6f63dd)

---

$$z\mapsto\sqrt{z}^{\prime}(z)=\mathrm{RisingFactorial}(\frac{-1}{2}, r)\times(-1)^{r}z^{r-\frac{1}{2}}$$

**Holds when** $r\in\N\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`83abff` · Fungrim entry ↗](https://fungrim.org/entry/83abff)

---

$$\mathrm{sgn}(\sqrt{z})=\sqrt{\mathrm{sgn}(z)}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`8c1ee5` · Fungrim entry ↗](https://fungrim.org/entry/8c1ee5)

---

$$\sqrt{z-cz^2}=\sqrt{z}\sqrt{1-cz}$$

**Holds when** $z\in\C\land c\in\lbrack0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`99c0b3` · Fungrim entry ↗](https://fungrim.org/entry/99c0b3)

---

$$\sqrt{\infty}=\infty$$

Used by the Compute Engine for simplification.
[`9dec73` · Fungrim entry ↗](https://fungrim.org/entry/9dec73)

---

$$\vert\sqrt{z}\vert=\sqrt{\vert z\vert}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`ac54c7` · Fungrim entry ↗](https://fungrim.org/entry/ac54c7)

---

$$\sqrt{z^\star}=\sqrt{z}^\star$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rparen$.
Used by the Compute Engine for expansion.
[`c58f46` · Fungrim entry ↗](https://fungrim.org/entry/c58f46)

---

$$\sqrt{\frac{1}{z}}=\frac{1}{\sqrt{z}}$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for expansion.
[`d0a331` · Fungrim entry ↗](https://fungrim.org/entry/d0a331)

---

$$\sqrt{\frac{z}{c+z}}=\frac{\sqrt{z}}{\sqrt{c+z}}$$

**Holds when** $c+z\ne0\land z\in\C\land c\in\lbrack0, \infty\rparen$.
Used by the Compute Engine for simplification.
[`d40229` · Fungrim entry ↗](https://fungrim.org/entry/d40229)

---

$$\sqrt{z^2}=z$$

**Holds when** $z\in\C\land\arg(z)\in\lparen\frac{-\pi}{2}, \frac{\pi}{2}\rbrack$.
Used by the Compute Engine for simplification.
[`d8791e` · Fungrim entry ↗](https://fungrim.org/entry/d8791e)

---

$$\Im(\sqrt{z})=\mathrm{sgn}(\Im(z))\sqrt{\frac{\vert z\vert-\Re(z)}{2}}$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rparen$.
Used by the Compute Engine for simplification.
[`e722ca` · Fungrim entry ↗](https://fungrim.org/entry/e722ca)

---

$$\sqrt{\infty\exp(\imaginaryI\theta)}=\infty\exp(\frac{\imaginaryI\theta}{2})$$

**Holds when** $\theta\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification.
[`f9f31d` · Fungrim entry ↗](https://fungrim.org/entry/f9f31d)

---

## Stirling numbers

$$\mathrm{StirlingS_1}(n, k)=\mathrm{StirlingCycle}(n, k)\times(-1)^{k+n}$$

**Holds when** $n\in\N\land k\in\N$.
**Symbols:** **StirlingCycle** — Unsigned Stirling number of the first kind; **StirlingS1** — Signed Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`071a94` · Fungrim entry ↗](https://fungrim.org/entry/071a94)

---

$$\mathrm{StirlingS_1}(n+1, k)=\mathrm{StirlingS_1}(n, k-1)-n\mathrm{StirlingS_1}(n, k)$$

**Holds when** $n\in\N\land k\in\N^*$.
**Symbols:** **StirlingS1** — Signed Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`18ec99` · Fungrim entry ↗](https://fungrim.org/entry/18ec99)

---

$$\mathrm{Stirling}(n+1, k)=k\mathrm{Stirling}(n, k)+\mathrm{Stirling}(n, k-1)$$

**Holds when** $n\in\N\land k\in\N^*$.
Used by the Compute Engine for simplification.
[`9fbe4f` · Fungrim entry ↗](https://fungrim.org/entry/9fbe4f)

---

$$\mathrm{StirlingCycle}(n+1, k)=n\mathrm{StirlingCycle}(n, k)+\mathrm{StirlingCycle}(n, k-1)$$

**Holds when** $n\in\N\land k\in\N^*$.
**Symbols:** **StirlingCycle** — Unsigned Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`f0d72c` · Fungrim entry ↗](https://fungrim.org/entry/f0d72c)

---

## Totient function

$$\mathrm{Totient}(m^{n})=\mathrm{Totient}(m)m^{n-1}$$

**Holds when** $m\in\N\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`05e9ae` · Fungrim entry ↗](https://fungrim.org/entry/05e9ae)

---

$$\mathrm{Totient}(2^{n})=2^{n-1}$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`081abd` · Fungrim entry ↗](https://fungrim.org/entry/081abd)

---

$$\mathrm{Totient}(n)=n-(\sum_{d\in \mathrm{Divisors}(n)}\mathrm{Totient}(d))$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`08ff0b` · Fungrim entry ↗](https://fungrim.org/entry/08ff0b)

---

$$\mathrm{Totient}(-n)=\mathrm{Totient}(n)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`11a56b` · Fungrim entry ↗](https://fungrim.org/entry/11a56b)

---

$$\mathrm{Totient}(p^{k})=(p-1)p^{k-1}$$

**Holds when** $p\in\mathrm{Primes}\land k\in\N^*$.
Used by the Compute Engine for simplification.
[`1d731f` · Fungrim entry ↗](https://fungrim.org/entry/1d731f)

---

$$\mathrm{Totient}(mn)=\frac{\gcd(m, n)\mathrm{Totient}(m)\mathrm{Totient}(n)}{\mathrm{Totient}(\gcd(m, n))}$$

**Holds when** $m\in\N^*\land n\in\N^*$.
Used by the Compute Engine for simplification.
[`56d7fe` · Fungrim entry ↗](https://fungrim.org/entry/56d7fe)

---

$$\mathrm{Totient}(2n)=\begin{cases}2\mathrm{Totient}(n)&\lnot\mathrm{IsOdd}(n)\\\mathrm{Totient}(n)&\mathrm{IsOdd}(n)\end{cases}$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`c0e088` · Fungrim entry ↗](https://fungrim.org/entry/c0e088)

---

$$\mathrm{Totient}(p)=p-1$$

**Holds when** $p\in\mathrm{Primes}$.
Used by the Compute Engine for simplification.
[`cb410e` · Fungrim entry ↗](https://fungrim.org/entry/cb410e)

---

$$\mathrm{SequenceLimitSuperior}(n\mapsto\frac{\mathrm{Totient}(n)}{n}, \infty)=1$$

**Symbols:** **SequenceLimitSuperior** — Limit superior of sequence.
Used by the Compute Engine for simplification.
[`cd7877` · Fungrim entry ↗](https://fungrim.org/entry/cd7877)

---

$$\mathrm{Totient}(\lcm(m, n))\mathrm{Totient}(\gcd(m, n))=\mathrm{Totient}(m)\mathrm{Totient}(n)$$

**Holds when** $m\in\N\land n\in\N$.
Used by the Compute Engine for simplification.
[`d1ea57` · Fungrim entry ↗](https://fungrim.org/entry/d1ea57)

---

## Weierstrass elliptic functions

$$\mathrm{WeierstrassZeta}(z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau, 1)}{\mathrm{JacobiTheta}(1, z, \tau)}-\frac{z\mathrm{JacobiTheta}(1, 0, \tau, 3)}{3\mathrm{JacobiTheta}(1, 0, \tau, 1)}$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`0207dc` · Fungrim entry ↗](https://fungrim.org/entry/0207dc)

---

$$z\mapsto\mathrm{WeierstrassSigma}(z, \tau)^{\prime}(z)=\mathrm{WeierstrassZeta}(z, \tau)\mathrm{WeierstrassSigma}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`0e649f` · Fungrim entry ↗](https://fungrim.org/entry/0e649f)

---

$$\mathrm{WeierstrassP}(-z, \tau)=\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`12a9e8` · Fungrim entry ↗](https://fungrim.org/entry/12a9e8)

---

$$\mathrm{WeierstrassSigma}(-z, \tau)=-\mathrm{WeierstrassSigma}(z, \tau)$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function.
Used by the Compute Engine for expansion.
[`23beb5` · Fungrim entry ↗](https://fungrim.org/entry/23beb5)

---

$$\mathrm{WeierstrassSigma}(z+1, \tau)=-(\mathrm{WeierstrassSigma}(z, \tau)\exp(2(z+\frac{1}{2})\mathrm{WeierstrassZeta}(1/2, \tau)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`35403b` · Fungrim entry ↗](https://fungrim.org/entry/35403b)

---

$$\mathrm{WeierstrassZeta}(-z, \tau)=-\mathrm{WeierstrassZeta}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for expansion.
[`72eb69` · Fungrim entry ↗](https://fungrim.org/entry/72eb69)

---

$$\mathrm{WeierstrassZeta}(\tau+z, \tau)=\mathrm{WeierstrassZeta}(\frac{\tau}{2}, \tau)+\mathrm{WeierstrassZeta}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`a0c85d` · Fungrim entry ↗](https://fungrim.org/entry/a0c85d)

---

$$\mathrm{WeierstrassP}(n\tau+m+z, \tau)=\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}\land m\in\Z\land n\in\Z$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`a95b7e` · Fungrim entry ↗](https://fungrim.org/entry/a95b7e)

---

$$\mathrm{WeierstrassP}(z, \tau)=\frac{\pi\mathrm{JacobiTheta}(4, z, \tau)\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)}{\mathrm{JacobiTheta}(1, z, \tau)}^2-\frac{1}{3}((\mathrm{JacobiTheta}(2, 0, \tau)^4+\mathrm{JacobiTheta}(3, 0, \tau)^4)\pi^2)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`af0dfc` · Fungrim entry ↗](https://fungrim.org/entry/af0dfc)

---

$$\mathrm{WeierstrassSigma}(z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)\exp(-((\mathrm{JacobiTheta}(1, 0, \tau, 3)z^2)/(6\mathrm{JacobiTheta}(1, 0, \tau, 1))))}{\mathrm{JacobiTheta}(1, 0, \tau, 1)}$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **JacobiTheta** — Jacobi theta function; **WeierstrassSigma** — Weierstrass sigma function.
Used by the Compute Engine for simplification.
[`b96c9d` · Fungrim entry ↗](https://fungrim.org/entry/b96c9d)

---

$$\mathrm{WeierstrassSigma}(\tau+z, \tau)=-(\mathrm{WeierstrassSigma}(z, \tau)\exp(2(\frac{\tau}{2}+z)\mathrm{WeierstrassZeta}(\tau/2, \tau)))$$

**Holds when** $z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`de9f42` · Fungrim entry ↗](https://fungrim.org/entry/de9f42)

---

$$z\mapsto\mathrm{WeierstrassZeta}(z, \tau)^{\prime}(z)=-\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`e677fb` · Fungrim entry ↗](https://fungrim.org/entry/e677fb)

---

$$\mathrm{WeierstrassZeta}(z+1, \tau)=\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)+\mathrm{WeierstrassZeta}(z, \tau)$$

**Holds when** $z\notin\mathrm{Lattice}(1, \tau)\land z\in\C\land\tau\in\mathrm{HH}$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`ffcc0f` · Fungrim entry ↗](https://fungrim.org/entry/ffcc0f)

---
