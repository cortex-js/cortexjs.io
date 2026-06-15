---
title: Fungrim Identities — Orthogonal polynomials
slug: /compute-engine/reference/fungrim-orthogonal-polynomials/
---

# Orthogonal polynomials

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **74 identities** for orthogonal polynomials.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Chebyshev polynomials](#chebyshev-polynomials) (51)
- [Gaussian quadrature](#gaussian-quadrature) (1)
- [Legendre polynomials](#legendre-polynomials) (22)

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

## Gaussian quadrature

$$\mathrm{GaussLegendreWeight}(n, k)=(2)((1-\mathrm{LegendrePolynomialZero}(n, k)^2)t\mapsto\mathrm{LegendrePolynomial}(n, t)^{\prime}(\mathrm{LegendrePolynomialZero}(n, k))^2)^{-1}$$

**Holds when** $n\in\N^*\land k\in1..n$.
Used by the Compute Engine for simplification.
[`ea4754` · Fungrim entry ↗](https://fungrim.org/entry/ea4754)

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
