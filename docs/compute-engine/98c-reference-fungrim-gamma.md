---
title: Fungrim Identities — Gamma and related functions
slug: /compute-engine/reference/fungrim-gamma/
---

# Gamma and related functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **135 identities** for gamma and related functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Barnes G-function](#barnes-g-function) (27)
- [Beta function](#beta-function) (13)
- [Digamma function](#digamma-function) (39)
- [Factorials and binomial coefficients](#factorials-and-binomial-coefficients) (32)
- [Gamma function](#gamma-function) (24)

## Barnes G-function

$$\mathrm{LogBarnesG}(1+z)=\frac{1}{2}((\ln(2\pi)-1)z)-\frac{1}{2}((1+\gamma)z^2)+\sum_{n=3}^{\infty}\frac{1}{n}(\Zeta(n-1)\times(-1)^{n+1}z^{n})$$

**Holds when** $z\in\C\land\vert z\vert\lt1$.
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

$$\mathrm{LogBarnesG}(1-z)=\mathrm{LogBarnesG}(1+z)-\ln(2\pi)z+\begin{cases}\int_{0}^{\imaginaryI}\!\pi x\cot(\pi x)\, \mathrm{d}x+\int_{\imaginaryI}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x&-1\lt\Re(z)\lt1\lor\Im(z)\gt0\lor\Im(z)=0\land\Re(z)\lt1\\\int_{0}^{-\imaginaryI}\!\pi x\cot(\pi x)\, \mathrm{d}x+\int_{-\imaginaryI}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x&-1\lt\Re(z)\lt1\lor\Im(z)\lt0\lor\Im(z)=0\land\Re(z)\gt-1\end{cases}$$

**Holds when** $z\in\C\land z\notin\Z$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`23ed69` · Fungrim entry ↗](https://fungrim.org/entry/23ed69)

---

$$\mathrm{BarnesG}(n)=\begin{cases}\prod_{k=1}^{n-2}k!&n\ge1\\0&n\le0\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`33f13a` · Fungrim entry ↗](https://fungrim.org/entry/33f13a)

---

$$\mathrm{LogBarnesG}(z+1)=\mathrm{GammaLn}(z)+\mathrm{LogBarnesG}(z)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`5261e3` · Fungrim entry ↗](https://fungrim.org/entry/5261e3)

---

$$\mathrm{BarnesG}(1-x)=(-1)^{\lfloor\frac{x-1}{2}\rfloor+1}\mathrm{BarnesG}(1+x)\frac{\vert\sin(\pi x)\vert}{\pi}^{x}\exp(\frac{\Im(\operatorname{Li}_{2}(\exp(2\imaginaryI\pi x)))}{2\pi})$$

**Holds when** $x\in\R\land x\notin-\infty..-1$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [doi.org](https://doi.org/10.1145/384101.384104)
[`541e2e` · Fungrim entry ↗](https://fungrim.org/entry/541e2e)

---

$$\mathrm{LogBarnesG}(x)=\begin{cases}\ln(\mathrm{BarnesG}(x))&x\gt0\\\ln(\vert\mathrm{BarnesG}(x)\vert)+\frac{\lfloor x\rfloor}{2}(\lfloor x\rfloor-1)\pi\imaginaryI&\top\end{cases}$$

**Holds when** $x\in\R\land x\notin\Z_{\le0}$.
**Symbols:** **BarnesG** — Barnes G-function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`5a11eb` · Fungrim entry ↗](https://fungrim.org/entry/5a11eb)

---

$$z\mapsto\mathrm{BarnesG}(z)^{\prime}(z)=\mathrm{BarnesG}(z)((z-1)\mathrm{Digamma}(z)-z+\frac{1}{2}(\ln(2\pi)+1))$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`5babc2` · Fungrim entry ↗](https://fungrim.org/entry/5babc2)

---

$$\mathrm{LogBarnesG}(z+1)=(z\mathrm{GammaLn}(z)+z^2/4)-(\ln(z)\mathrm{BernoulliPolynomial}(2, z))/2-\ln(\mathrm{ConstGlaisher})-\int_{0}^{\infty}\!(((-x)/12-1/x+1/(1-\exp(-x))-1/2)\exp(-(xz)))/x^2\, \mathrm{d}x$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
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

$$\mathrm{LogBarnesG}(z+1)=(\frac{z^2}{4}+z\mathrm{GammaLn}(z+1))-(\frac{z(z+1)}{2}+\frac{1}{12})\ln(z)-\ln(\mathrm{ConstGlaisher})+\sum_{n=1}^{N_{var}-1}\frac{\mathrm{BernoulliB}(2n+2)}{2n(2n+1)(2n+2)z^{2n}}+\mathrm{LogBarnesGRemainder}(N_{var}, z)$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, 0\rbrack\land N_{var}\in\N^*$.
**Symbols:** **BernoulliB** — Bernoulli number; **LogBarnesG** — Logarithmic Barnes G-function; **LogBarnesGRemainder** — Remainder term in asymptotic expansion of logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [dx.doi.org](https://dx.doi.org/10.1098/rspa.2014.0534)
[`6f8e14` · Fungrim entry ↗](https://fungrim.org/entry/6f8e14)

---

$$\mathrm{LogBarnesG}(1-z)=\mathrm{LogBarnesG}(1+z)+\begin{cases}(\pi\imaginaryI(z^2-z+1/6))/2-z(\mathrm{GammaLn}(z)+\mathrm{GammaLn}(1-z))-\frac{1}{\pi}((1/2\imaginaryI)\operatorname{Li}_{2}(\exp(2\imaginaryI\pi z)))&0\lt\Re(z)\lt1\lor\Im(z)\gt0\lor\Im(z)=0\land\Re(z)\lt1\\-((\pi\imaginaryI((-z)^2-(-z)+1/6))/2-(-z(\mathrm{GammaLn}(-z)+\mathrm{GammaLn}(1-(-z))))-((1/2\imaginaryI)\operatorname{Li}_{2}(\exp(-2\imaginaryI\pi z)))/\pi)&-1\lt\Re(z)\lt0\lor\Im(z)\lt0\lor\Im(z)=0\land\Re(z)\gt-1\end{cases}$$

**Holds when** $z\in\C\land z\notin\Z$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`82b410` · Fungrim entry ↗](https://fungrim.org/entry/82b410)

---

$$\mathrm{BarnesG}(z+1)=\Gamma(z)\mathrm{BarnesG}(z)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`86b3ec` · Fungrim entry ↗](https://fungrim.org/entry/86b3ec)

---

$$\mathrm{BarnesG}(\frac{1}{2})=\frac{\sqrt[24]{2}\exp(\frac{1}{8})}{\sqrt[4]{\pi}\sqrt{\mathrm{ConstGlaisher}}^{3}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`8b7991` · Fungrim entry ↗](https://fungrim.org/entry/8b7991)

---

$$\mathrm{LogBarnesG}(z+1)=(\frac{z(1-z)}{2}+\frac{1}{2}(z\ln(2\pi))+z\mathrm{GammaLn}(z))-\int_{0}^{z}\!\mathrm{GammaLn}(x)\, \mathrm{d}x$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, -1\rbrack$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`8c96a5` · Fungrim entry ↗](https://fungrim.org/entry/8c96a5)

---

$$\mathrm{LogBarnesG}(z+1)=\frac{z(1-z)}{2}+\frac{1}{2}(z\ln(2\pi))+\int_{0}^{z}\!x\mathrm{Digamma}(x)\, \mathrm{d}x$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, -1\rbrack$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`95f771` · Fungrim entry ↗](https://fungrim.org/entry/95f771)

---

$$\Im(\mathrm{LogBarnesG}(x))=\frac{1}{2}(\lfloor x\rfloor(\lfloor x\rfloor-1)\pi)$$

**Holds when** $x\in\R\land x\lt0\land x\notin\Z$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`a044e1` · Fungrim entry ↗](https://fungrim.org/entry/a044e1)

---

$$z\mapsto\mathrm{LogBarnesG}(z)^{\prime}(z)=(z-1)\mathrm{Digamma}(z)-z+\frac{1}{2}(\ln(2\pi)+1)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
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

$$\mathrm{LogBarnesG}(1-z)=\mathrm{LogBarnesG}(1+z)-\ln(2\pi)z+\int_{0}^{z}\!\pi x\cot(\pi x)\, \mathrm{d}x$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`b6017f` · Fungrim entry ↗](https://fungrim.org/entry/b6017f)

---

$$\mathrm{LogBarnesG}(z+1)=(\frac{1}{4}(z^2(2\ln(z)-3))+\frac{1}{2}(z\ln(2\pi))+\frac{1}{12})-\ln(\mathrm{ConstGlaisher})-\int_{0}^{\infty}\!\frac{x\ln(x^2+z^2)}{\exp(2\pi x)-1}\, \mathrm{d}x$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/math/0308086)
[`b64782` · Fungrim entry ↗](https://fungrim.org/entry/b64782)

---

$$\mathrm{BarnesG}(\frac{1}{4})=\frac{\exp(3/32-G/(4\pi))}{\mathrm{ConstGlaisher}^{\frac{9}{8}}\Gamma(1/4)^{\frac{3}{4}}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`ce66a9` · Fungrim entry ↗](https://fungrim.org/entry/ce66a9)

---

$$\mathrm{LogBarnesG}(1-x)=\mathrm{LogBarnesG}(1+x)+x\ln(\frac{\vert\sin(\pi x)\vert}{\pi})+\frac{\Im(\operatorname{Li}_{2}(\exp(2\imaginaryI\pi x)))}{2\pi}+\frac{1}{2}(\mathrm{sgn}(x)\lfloor x\rfloor(\lfloor x\rfloor+1)\pi\imaginaryI)$$

**Holds when** $x\in\R\land x\notin\Z$.
**Symbols:** **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`d1a0ec` · Fungrim entry ↗](https://fungrim.org/entry/d1a0ec)

---

$$\mathrm{LogBarnesG}(n)=\begin{cases}\ln(\mathrm{BarnesG}(n))&n\ge1\\-\infty&n\le0\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`daef08` · Fungrim entry ↗](https://fungrim.org/entry/daef08)

---

$$\mathrm{BarnesG}(\frac{3}{4})=\frac{\exp(\frac{3}{32}+\frac{G}{4\pi})\sqrt[4]{\Gamma(\frac{1}{4})}}{\sqrt[8]{2}\sqrt[4]{\pi}\mathrm{ConstGlaisher}^{\frac{9}{8}}}$$

**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`dc507f` · Fungrim entry ↗](https://fungrim.org/entry/dc507f)

---

$$\mathrm{LogBarnesG}(z)=(z-1)\mathrm{GammaLn}(z)-\mathrm{HurwitzZeta}(-1, z, 1)+s\mapsto\Zeta(s)^{\prime}(-1)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function; **LogBarnesG** — Logarithmic Barnes G-function.
Used by the Compute Engine for simplification.
[`e05807` · Fungrim entry ↗](https://fungrim.org/entry/e05807)

---

$$z\mapsto\mathrm{BarnesG}(z)^{\prime}(n)=\begin{cases}0&n\lt0\\1&n=0\\\frac{1}{2}(\ln(2\pi)-1)&n=1\\\mathrm{BarnesG}(n)(\frac{\ln(2\pi)}{2}+(n-1)(\mathrm{HarmonicNumber}(n-2)-\gamma-1)+\frac{1}{2})&n\ge2\end{cases}$$

**Holds when** $n\in\Z$.
**Symbols:** **BarnesG** — Barnes G-function.
Used by the Compute Engine for simplification.
[`f50c74` · Fungrim entry ↗](https://fungrim.org/entry/f50c74)

---

## Beta function

$$\Beta(m, n)=\frac{(m-1)!(n-1)!}{((m+n)-1)!}$$

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

**Holds when** $x\in\C\land a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}\land a+b\notin\Z_{\le0}$.
**Symbols:** **IncompleteBetaRegularized** — Regularized incomplete beta function.
Used by the Compute Engine for simplification.
[`315b3d` · Fungrim entry ↗](https://fungrim.org/entry/315b3d)

---

$$\Beta(n, b)=\begin{cases}\tilde\infty&-b\in0..n-1\\(n\binom{(n+b)-1}{n})^{-1}&\top\end{cases}$$

**Holds when** $n\in\N^*\land b\in\C$.
Used by the Compute Engine for simplification.
[`72db94` · Fungrim entry ↗](https://fungrim.org/entry/72db94)

---

$$\Beta(a, b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`888581` · Fungrim entry ↗](https://fungrim.org/entry/888581)

---

$$\Beta(-n, b)=\begin{cases}\frac{(-1)^{b}}{b\binom{n}{b}}&b\in1..n\\\tilde\infty&\top\end{cases}$$

**Holds when** $n\in\N\land b\in\C$.
Used by the Compute Engine for simplification.
[`a7dbf6` · Fungrim entry ↗](https://fungrim.org/entry/a7dbf6)

---

$$\mathrm{IncompleteBeta}(0, a, b)=0$$

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}$.
**Symbols:** **IncompleteBeta** — Incomplete beta function.
Used by the Compute Engine for simplification.
[`ba7baf` · Fungrim entry ↗](https://fungrim.org/entry/ba7baf)

---

$$\Beta(m, n)=(m\binom{(m+n)-1}{m})^{-1}$$

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

**Holds when** $x\in\C\land a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}\land a+b\notin\Z_{\le0}$.
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

**Holds when** $a\in\C\setminus\Z_{\le0}\land b\in\C\setminus\Z_{\le0}\land c\in\C\setminus\Z_{\le0}\land a+b\notin\Z_{\le0}\land b+c\notin\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`fd0e48` · Fungrim entry ↗](https://fungrim.org/entry/fd0e48)

---

## Digamma function

$$\mathrm{Digamma}(n)=\mathrm{HarmonicNumber}(n-1)-\gamma$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`00c02a` · Fungrim entry ↗](https://fungrim.org/entry/00c02a)

---

$$\Im(\mathrm{Digamma}(\imaginaryI y))=\frac{1}{2}(\pi\coth(\pi y))+\frac{1}{2y}$$

**Holds when** $y\in\R\land y\ne0$.
Used by the Compute Engine for simplification.
[`03e2a6` · Fungrim entry ↗](https://fungrim.org/entry/03e2a6)

---

$$\mathrm{Digamma}(z+1)=\mathrm{Digamma}(z)+\frac{1}{z}$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`11dfd2` · Fungrim entry ↗](https://fungrim.org/entry/11dfd2)

---

$$\mathrm{Digamma}(\frac{1}{6})=-((3^{1/2}\pi)/2)-\gamma-2\ln(2)-\frac{3\ln(3)}{2}$$

[`177de7` · Fungrim entry ↗](https://fungrim.org/entry/177de7)

---

$$\Im(\mathrm{Digamma}(1+\imaginaryI y))=\frac{1}{2}(\pi\coth(\pi y))-\frac{1}{2y}$$

**Holds when** $y\in\R\land y\ne0$.
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

$$\mathrm{Digamma}(\frac{p}{q})=-\gamma-\ln(2q)-\frac{1}{2}(\pi\cot((\pi p)/q))+2(\sum_{k=1}^{\lfloor\frac{q-1}{2}\rfloor}\cos(\frac{1}{q}(2\pi kp))\ln(\sin((\pi k)/q)))$$

**Holds when** $q\in2..\infty\land p\in1..q-1$.
Used by the Compute Engine for simplification.
[`3fe553` · Fungrim entry ↗](https://fungrim.org/entry/3fe553)

---

$$\mathrm{Digamma}(-n)=\tilde\infty$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`42c1f5` · Fungrim entry ↗](https://fungrim.org/entry/42c1f5)

---

$$\mathrm{Digamma}(\frac{2}{3})=\frac{3^{1/2}\pi}{6}-\gamma-\frac{3\ln(3)}{2}$$

[`45a969` · Fungrim entry ↗](https://fungrim.org/entry/45a969)

---

$$\mathrm{Digamma}(z)=z\mapsto\mathrm{GammaLn}(z)^{\prime}(z)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`4b6ccb` · Fungrim entry ↗](https://fungrim.org/entry/4b6ccb)

---

$$\mathrm{Digamma}(z)=\ln(z)-\frac{1}{2z}-\int_{0}^{\infty}\!\exp(-(zt))(1/2-1/t+\frac{1}{\exponentialE^{t}-1})\, \mathrm{d}t$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
[`4f5575` · Fungrim entry ↗](https://fungrim.org/entry/4f5575)

---

$$\mathrm{Digamma}(z-n)=\mathrm{Digamma}(z)-(\sum_{k=1}^{n}\frac{1}{z-k})$$

**Holds when** $z\in\C\land n\in\N\land z-n\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`554ac2` · Fungrim entry ↗](https://fungrim.org/entry/554ac2)

---

$$\mathrm{Digamma}(z)=(\sum_{n=0}^{\infty}1/(n+1)-1/(n+z))-\gamma$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`686524` · Fungrim entry ↗](https://fungrim.org/entry/686524)

---

$$\Im(\mathrm{Digamma}(\frac{1}{2}+\imaginaryI y))=\frac{1}{2}(\pi\tanh(\pi y))$$

**Holds when** $y\in\R\land y\ne0$.
Used by the Compute Engine for simplification.
[`6f3fec` · Fungrim entry ↗](https://fungrim.org/entry/6f3fec)

---

$$\mathrm{Digamma}(3)=\frac{3}{2}-\gamma$$

Used by the Compute Engine for simplification.
[`75f9bf` · Fungrim entry ↗](https://fungrim.org/entry/75f9bf)

---

$$\mathrm{Digamma}(\frac{1}{4})=-(\pi/2)-\gamma-3\ln(2)$$

[`7ec4f0` · Fungrim entry ↗](https://fungrim.org/entry/7ec4f0)

---

$$\mathrm{Digamma}(z)=\frac{1}{\Gamma(z)}(z\mapsto\Gamma(z)^{\prime}(z))$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`8415c7` · Fungrim entry ↗](https://fungrim.org/entry/8415c7)

---

$$\mathrm{Digamma}(\frac{1}{2})=-(2\ln(2))-\gamma$$

[`89bed3` · Fungrim entry ↗](https://fungrim.org/entry/89bed3)

---

$$\mathrm{Digamma}(\frac{1}{8})=-((\pi(2^{1/2}+1))/2)-\gamma-4\ln(2)-(\ln(2+2^{1/2})-\ln(2-2^{1/2}))/\sqrt{2}$$

[`8c368f` · Fungrim entry ↗](https://fungrim.org/entry/8c368f)

---

$$\mathrm{Digamma}(\frac{5}{6})=(3^{1/2}\pi)/2-\gamma-2\ln(2)-\frac{3\ln(3)}{2}$$

[`967bbb` · Fungrim entry ↗](https://fungrim.org/entry/967bbb)

---

$$\mathrm{Digamma}(\frac{1}{3})=-((3^{1/2}\pi)/6)-\gamma-\frac{3\ln(3)}{2}$$

[`98f642` · Fungrim entry ↗](https://fungrim.org/entry/98f642)

---

$$\mathrm{Digamma}(z+n)=\mathrm{Digamma}(z)+\sum_{k=0}^{n-1}\frac{1}{z+k}$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}\land n\in\N$.
Used by the Compute Engine for simplification.
[`9f32fe` · Fungrim entry ↗](https://fungrim.org/entry/9f32fe)

---

$$\mathrm{Digamma}(z)=-(\frac{1}{z})-\gamma+\sum_{n=1}^{\infty}(-1)^{n+1}\Zeta(n+1)z^{n}$$

**Holds when** $z\in\C\land\vert z\vert\lt1$.
Used by the Compute Engine for simplification.
[`a2675b` · Fungrim entry ↗](https://fungrim.org/entry/a2675b)

---

$$\mathrm{Digamma}(z)=\int_{0}^{1}\!\frac{1-t^{z-1}}{1-t}\, \mathrm{d}t-\gamma$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
[`a4cc3b` · Fungrim entry ↗](https://fungrim.org/entry/a4cc3b)

---

$$\mathrm{Digamma}(z)=-\mathrm{StieltjesGamma}(0, z)$$

**Holds when** $z\in\C\land z\notin\Z_{\le0}$.
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

$$\mathrm{Digamma}(1-z)=\mathrm{Digamma}(z)+\pi\cot(\pi z)$$

**Holds when** $z\in\C\land z\notin\Z$.
Used by the Compute Engine for simplification.
[`adf5e2` · Fungrim entry ↗](https://fungrim.org/entry/adf5e2)

---

$$\mathrm{Digamma}(z-n)=\mathrm{Digamma}(n+1)-\frac{1}{z}+\sum_{k=1}^{\infty}((-1)^{k+1}\Zeta(k+1)+\sum_{j=1}^{n}\frac{1}{j^{k+1}})z^{k}$$

**Holds when** $n\in\N\land z\in\C\land\vert z\vert\lt1$.
Used by the Compute Engine for simplification.
[`b4825b` · Fungrim entry ↗](https://fungrim.org/entry/b4825b)

---

$$\mathrm{Digamma}(1+z)=(\sum_{n=1}^{\infty}(-1)^{n+1}\Zeta(n+1)z^{n})-\gamma$$

**Holds when** $z\in\C\land\vert z\vert\lt1$.
Used by the Compute Engine for simplification.
[`c76eaf` · Fungrim entry ↗](https://fungrim.org/entry/c76eaf)

---

$$\mathrm{Digamma}(z)=\ln(z)-\frac{1}{2z}-(\sum_{n=1}^{N_{var}-1}\frac{\mathrm{BernoulliB}(2n)}{2nz^{2n}})+z\mapsto\mathrm{StirlingSeriesRemainder}(N_{var}, z)^{\prime}(z)$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack\land N_{var}\in\N$.
**Symbols:** **BernoulliB** — Bernoulli number; **StirlingSeriesRemainder** — Remainder term in the Stirling series for the logarithmic gamma function.
Used by the Compute Engine for simplification.
[`cf5355` · Fungrim entry ↗](https://fungrim.org/entry/cf5355)

---

$$\mathrm{Digamma}(z)=\ln(z)+\int_{0}^{\infty}\!\exp(-(zt))(\frac{1}{t}-\frac{1}{1-\exp(-t)})\, \mathrm{d}t$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
[`cfb999` · Fungrim entry ↗](https://fungrim.org/entry/cfb999)

---

$$\mathrm{Digamma}(z)=\ln(z)-\frac{1}{2z}-2\int_{0}^{\infty}\!(t)((t^2+z^2)(\exp(2\pi t)-1))^{-1}\, \mathrm{d}t$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
[`d9c818` · Fungrim entry ↗](https://fungrim.org/entry/d9c818)

---

$$\mathrm{Digamma}(1)=-\gamma$$

Used by the Compute Engine for simplification.
[`ea2482` · Fungrim entry ↗](https://fungrim.org/entry/ea2482)

---

$$\mathrm{Digamma}(z)=(z-1)\mathrm{Hypergeometric3F_2}(1, 1, 2-z, 2, 2, 1)-\gamma$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/GammaBetaErf/PolyGamma/26/01/01/0001/)
[`ee3dc5` · Fungrim entry ↗](https://fungrim.org/entry/ee3dc5)

---

$$\mathrm{Digamma}(nz)=\ln(n)+\frac{1}{n}(\sum_{k=0}^{n-1}\mathrm{Digamma}(k/n+z))$$

**Holds when** $n\in\N^*\land z\in\C\land nz\notin\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`eec21a` · Fungrim entry ↗](https://fungrim.org/entry/eec21a)

---

$$\mathrm{Digamma}(\frac{3}{4})=\frac{\pi}{2}-\gamma-3\ln(2)$$

[`f93bae` · Fungrim entry ↗](https://fungrim.org/entry/f93bae)

---

$$\mathrm{Digamma}(z)=\int_{0}^{\infty}\!\frac{\exp(-t)-\exp(-(zt))}{1-\exp(-t)}\, \mathrm{d}t-\gamma$$

**Holds when** $z\in\C\land\Re(z)\gt0$.
Used by the Compute Engine for simplification.
[`f946a5` · Fungrim entry ↗](https://fungrim.org/entry/f946a5)

---

## Factorials and binomial coefficients

$$\mathrm{RisingFactorial}(z, k+m)=\mathrm{RisingFactorial}(z, k)\mathrm{RisingFactorial}(z+k, m)$$

**Holds when** $z\in\C\land k\in\N\land m\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`02ee06` · Fungrim entry ↗](https://fungrim.org/entry/02ee06)

---

$$\binom{z+1}{k+1}=\binom{z}{k}+\binom{z}{k+1}$$

**Holds when** $z\in\C\land k\in\N$.
Used by the Compute Engine for simplification.
[`081188` · Fungrim entry ↗](https://fungrim.org/entry/081188)

---

$$\binom{2n}{n}=\frac{(2n)!}{n!^2}$$

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

$$\binom{z}{k}=\frac{\mathrm{FallingFactorial}(z, k)}{k!}$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for simplification.
[`1d5e92` · Fungrim entry ↗](https://fungrim.org/entry/1d5e92)

---

$$\binom{z}{2}=\frac{z(z-1)}{2}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1df686` · Fungrim entry ↗](https://fungrim.org/entry/1df686)

---

$$\binom{z}{k+1}=\frac{(z-k)\binom{z}{k}}{k+1}$$

**Holds when** $z\in\C\land k\in\N$.
Used by the Compute Engine for simplification.
[`209fc8` · Fungrim entry ↗](https://fungrim.org/entry/209fc8)

---

$$\binom{z}{k}=\frac{1}{k!}(\mathrm{RisingFactorial}(z-k+1, k))$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`22ee07` · Fungrim entry ↗](https://fungrim.org/entry/22ee07)

---

$$\binom{n}{k}=\binom{n}{n-k}$$

**Holds when** $n\in\N\land k\in0..n$.
Used by the Compute Engine for simplification.
[`2362af` · Fungrim entry ↗](https://fungrim.org/entry/2362af)

---

$$\mathrm{RisingFactorial}(n, k)=\frac{((n+k)-1)!}{(n-1)!}$$

**Holds when** $n\in\N^*\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`30652c` · Fungrim entry ↗](https://fungrim.org/entry/30652c)

---

$$\binom{n}{k}=(n!)(k!(n-k)!)^{-1}$$

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

**Holds when** $z\in\C\setminus\lbrace0\rbrace\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`41f950` · Fungrim entry ↗](https://fungrim.org/entry/41f950)

---

$$\binom{n}{n+m}=0$$

**Holds when** $n\in\N\land m\in\N^*$.
Used by the Compute Engine for simplification.
[`471485` · Fungrim entry ↗](https://fungrim.org/entry/471485)

---

$$n!=n(n-1)!$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`4f20ff` · Fungrim entry ↗](https://fungrim.org/entry/4f20ff)

---

$$\binom{z}{k}=(-1)^{k}\binom{k-z-1}{k}$$

**Holds when** $z\in\C\land k\in\N$.
Used by the Compute Engine for simplification.
[`56d4ff` · Fungrim entry ↗](https://fungrim.org/entry/56d4ff)

---

$$\mathrm{FallingFactorial}(z, 0)=1$$

**Holds when** $z\in\C$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for simplification.
[`5b414d` · Fungrim entry ↗](https://fungrim.org/entry/5b414d)

---

$$\binom{z}{1}=z$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`5b85bf` · Fungrim entry ↗](https://fungrim.org/entry/5b85bf)

---

$$n!=\Gamma(n+1)$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`62c6c9` · Fungrim entry ↗](https://fungrim.org/entry/62c6c9)

---

$$\binom{z+1}{k+1}=\frac{(z+1)\binom{z}{k}}{k+1}$$

**Holds when** $z\in\C\land k\in\N$.
Used by the Compute Engine for simplification.
[`6e1f13` · Fungrim entry ↗](https://fungrim.org/entry/6e1f13)

---

$$\binom{n}{n}=1$$

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

$$\binom{n}{0}=1$$

**Holds when** $n\in\C$.
Used by the Compute Engine for simplification.
[`988310` · Fungrim entry ↗](https://fungrim.org/entry/988310)

---

$$\mathrm{FallingFactorial}(z, 1)=z$$

**Holds when** $z\in\C$.
**Symbols:** **FallingFactorial** — Falling factorial.
Used by the Compute Engine for simplification.
[`a7b330` · Fungrim entry ↗](https://fungrim.org/entry/a7b330)

---

$$\mathrm{RisingFactorial}(-z, k)=(-1)^{k}\mathrm{RisingFactorial}(z-k+1, k)$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`c640bf` · Fungrim entry ↗](https://fungrim.org/entry/c640bf)

---

$$\mathrm{RisingFactorial}(z, k)=\frac{\Gamma(z+k)}{\Gamma(z)}$$

**Holds when** $z\in\C\land k\in\N\land z+k\notin\Z_{\le0}$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`c733f7` · Fungrim entry ↗](https://fungrim.org/entry/c733f7)

---

$$\mathrm{RisingFactorial}(z, 2k)=4^{k}\mathrm{RisingFactorial}(\frac{z}{2}, k)\mathrm{RisingFactorial}(\frac{z+1}{2}, k)$$

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

$$\mathrm{RisingFactorial}(z, k)=\mathrm{FallingFactorial}((z+k)-1, k)$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **FallingFactorial** — Falling factorial; **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`e78989` · Fungrim entry ↗](https://fungrim.org/entry/e78989)

---

$$\binom{z}{k}=\frac{\Gamma(z+1)}{\Gamma(k+1)\Gamma(z-k+1)}$$

**Holds when** $z\in\C\land k\in\N\land z-k\notin-\infty..-1$.
Used by the Compute Engine for simplification.
[`e87c43` · Fungrim entry ↗](https://fungrim.org/entry/e87c43)

---

$$\mathrm{RisingFactorial}(z, k+1)=(z+k)\mathrm{RisingFactorial}(z, k)$$

**Holds when** $z\in\C\land k\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`fe9fb7` · Fungrim entry ↗](https://fungrim.org/entry/fe9fb7)

---

## Gamma function

$$\Gamma(z-1)=\frac{\Gamma(z)}{z-1}$$

**Holds when** $z\in\C\setminus-\infty..1$.
Used by the Compute Engine for simplification.
[`14af98` · Fungrim entry ↗](https://fungrim.org/entry/14af98)

---

$$\vert\Gamma(y\imaginaryI)\vert=\sqrt{(\pi)(y\sinh(\pi y))^{-1}}$$

**Holds when** $y\in\R\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`1976db` · Fungrim entry ↗](https://fungrim.org/entry/1976db)

---

$$\Gamma(2)=1$$

Used by the Compute Engine for simplification.
[`19d480` · Fungrim entry ↗](https://fungrim.org/entry/19d480)

---

$$\mathrm{GammaLn}(z)=(z-\frac{1}{2})\ln(z)-z+\frac{\ln(2\pi)}{2}+\sum_{k=1}^{n-1}\frac{\mathrm{BernoulliB}(2k)}{2k(2k-1)z^{2k-1}}+\mathrm{StirlingSeriesRemainder}(n, z)$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, 0\rbrack\land n\in\N^*$.
**Symbols:** **BernoulliB** — Bernoulli number; **StirlingSeriesRemainder** — Remainder term in the Stirling series for the logarithmic gamma function.
Used by the Compute Engine for simplification.
[`37a95a` · Fungrim entry ↗](https://fungrim.org/entry/37a95a)

---

$$\Gamma(\frac{3}{2})=\frac{\sqrt{\pi}}{2}$$

Used by the Compute Engine for simplification.
[`48ac55` · Fungrim entry ↗](https://fungrim.org/entry/48ac55)

---

$$\Gamma(z+n)=\mathrm{RisingFactorial}(z, n)\Gamma(z)$$

**Holds when** $z\in\C\setminus\Z_{\le0}\land n\in\N$.
**Symbols:** **RisingFactorial** — Rising factorial.
Used by the Compute Engine for simplification.
[`56d710` · Fungrim entry ↗](https://fungrim.org/entry/56d710)

---

$$\Gamma(z)=(z-1)\Gamma(z-1)$$

**Holds when** $z\in\C\setminus-\infty..1$.
Used by the Compute Engine for simplification.
[`639d91` · Fungrim entry ↗](https://fungrim.org/entry/639d91)

---

$$\exp(\pi z)=\pi((\Gamma(\frac{1}{2}+\imaginaryI z)\Gamma(1/2-\imaginaryI z))^{-1}+(z)(\Gamma(1+\imaginaryI z)\Gamma(1-\imaginaryI z))^{-1})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`6430cc` · Fungrim entry ↗](https://fungrim.org/entry/6430cc)

---

$$\mathrm{GammaLn}(1+z)=(\sum_{k=2}^{\infty}\frac{1}{k}(\Zeta(k)(-z)^{k}))-\gamma z$$

**Holds when** $z\in\C\land\vert z\vert\lt1$.
Used by the Compute Engine for simplification.
[`661054` · Fungrim entry ↗](https://fungrim.org/entry/661054)

---

$$\Gamma(z)=\sqrt{2\pi}z^{z-\frac{1}{2}}\exp(-z)\exp(\sum_{n=1}^{\infty}((z+n)-1/2)\ln((z+n)/((z+n)-1))-1)$$

**Holds when** $z\in\C\land z\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
**Reference:** B. C. Carlson (1977), Special functions of applied mathematics, Academic Press. Proposition 3.8-1.
[`6d0a95` · Fungrim entry ↗](https://fungrim.org/entry/6d0a95)

---

$$\mathrm{GammaLn}(z+1)=\mathrm{GammaLn}(z)+\ln(z)$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`774d37` · Fungrim entry ↗](https://fungrim.org/entry/774d37)

---

$$\Gamma(z+1)=z\Gamma(z)$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for simplification.
[`78f1f4` · Fungrim entry ↗](https://fungrim.org/entry/78f1f4)

---

$$\vert\Gamma(1+y\imaginaryI)\vert=\sqrt{\frac{\pi y}{\sinh(\pi y)}}$$

**Holds when** $y\in\R\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`94db60` · Fungrim entry ↗](https://fungrim.org/entry/94db60)

---

$$\Gamma(z)=\exp(\mathrm{GammaLn}(z))$$

**Holds when** $z\in\C\setminus\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`a26ac7` · Fungrim entry ↗](https://fungrim.org/entry/a26ac7)

---

$$\Gamma(z)\Gamma(z+\frac{1}{2})=2^{1-2z}\sqrt{\pi}\Gamma(2z)$$

**Holds when** $z\in\C\land2z\notin\Z_{\le0}$.
Used by the Compute Engine for expansion.
[`a787eb` · Fungrim entry ↗](https://fungrim.org/entry/a787eb)

---

$$\Gamma(z)=(\pi)(\sin(\pi z)\Gamma(1-z))^{-1}$$

**Holds when** $z\in\C\setminus\Z$.
Used by the Compute Engine for simplification.
[`b510b6` · Fungrim entry ↗](https://fungrim.org/entry/b510b6)

---

$$\cos(\pi z)=(\pi)(\Gamma(\frac{1}{2}+z)\Gamma(1/2-z))^{-1}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b7a578` · Fungrim entry ↗](https://fungrim.org/entry/b7a578)

---

$$\vert\Gamma(\frac{1}{2}+y\imaginaryI)\vert=\sqrt{\frac{\pi}{\cosh(\pi y)}}$$

**Holds when** $y\in\R$.
Used by the Compute Engine for simplification.
[`c7b921` · Fungrim entry ↗](https://fungrim.org/entry/c7b921)

---

$$\mathrm{sinc}(\pi z)=(\Gamma(1+z)\Gamma(1-z))^{-1}$$

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

$$\tan(\pi z)=\frac{\Gamma(\frac{1}{2}+z)\Gamma(1/2-z)}{\Gamma(z)\Gamma(1-z)}$$

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
