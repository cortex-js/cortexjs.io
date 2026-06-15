---
title: Fungrim Identities — Gamma and related functions
slug: /compute-engine/reference/fungrim-gamma/
---

# Gamma and related functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **123 identities** for gamma and related functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Barnes G-function](#barnes-g-function) (27)
- [Beta function](#beta-function) (11)
- [Digamma function](#digamma-function) (39)
- [Factorials and binomial coefficients](#factorials-and-binomial-coefficients) (22)
- [Gamma function](#gamma-function) (24)

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
