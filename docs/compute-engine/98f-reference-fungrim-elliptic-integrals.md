---
title: Fungrim Identities — Elliptic integrals
slug: /compute-engine/reference/fungrim-elliptic-integrals/
---

# Elliptic integrals

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **304 identities** for elliptic integrals.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `3a299164c683`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Arithmetic-geometric mean](#arithmetic-geometric-mean) (28)
- [Carlson symmetric elliptic integrals](#carlson-symmetric-elliptic-integrals) (183)
- [Legendre elliptic integrals](#legendre-elliptic-integrals) (80)
- [Weierstrass elliptic functions](#weierstrass-elliptic-functions) (13)

## Arithmetic-geometric mean

$$\mathrm{AGM}(0, b)=0$$

**Holds when** $b\in\C$.
Used by the Compute Engine for simplification.
[`08329d` · Fungrim entry ↗](https://fungrim.org/entry/08329d)

---

$$\mathrm{AGM}(1, \sqrt{2})=\frac{2\sqrt{2}\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`0d9352` · Fungrim entry ↗](https://fungrim.org/entry/0d9352)

---

$$a\mapsto\mathrm{AGM}(a, b)^{\prime}(a)=\frac{(\pi a-2\mathrm{AGM}(a, b)\mathrm{EllipticE}((a-b)/(a+b)^2))\mathrm{AGM}(a, b)}{\pi a(a-b)}$$

**Holds when** $a\in\C\land b\in\C\land b\ne0\land a\ne b\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/09.54.20.0001.01)
[`20828c` · Fungrim entry ↗](https://fungrim.org/entry/20828c)

---

$$\mathrm{AGM}(z)=\mathrm{AGM}(1, z)=\mathrm{AGM}(z, 1)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`21f412` · Fungrim entry ↗](https://fungrim.org/entry/21f412)

---

$$\ln(\frac{1}{q})=(\pi)(\mathrm{AGM}(\mathrm{JacobiThetaQ}(2, 0, q)^2, \mathrm{JacobiThetaQ}(3, 0, q)^2))^{-1}$$

**Holds when** $q\in\lparen0, 1\rparen$.
Used by the Compute Engine for simplification.
[`26fd1b` · Fungrim entry ↗](https://fungrim.org/entry/26fd1b)

---

$$\mathrm{AGM}(1, 3+2\sqrt{2})=\frac{2(2+\sqrt{2})\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`361801` · Fungrim entry ↗](https://fungrim.org/entry/361801)

---

$$\mathrm{AGM}(a, -a)=0$$

**Holds when** $a\in\C$.
Used by the Compute Engine for simplification.
[`3e1398` · Fungrim entry ↗](https://fungrim.org/entry/3e1398)

---

$$x\mapsto\mathrm{AGM}(1, x)^{\prime}(1)=\frac{n!\mathrm{SloaneA}(60\,691, n)\times(-1)^{n}}{8^{n}}$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for expansion.
[`447541` · Fungrim entry ↗](https://fungrim.org/entry/447541)

---

$$\mathrm{AGM}(1, b)=\frac{1}{2}((b+1)\mathrm{AGM}(1, \frac{2b^{1/2}}{b+1}))$$

**Holds when** $b\in\C$.
Used by the Compute Engine for simplification.
[`46c021` · Fungrim entry ↗](https://fungrim.org/entry/46c021)

---

$$\mathrm{AGM}(1, -\imaginaryI)=\frac{\sqrt{2}(1-\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`5174ea` · Fungrim entry ↗](https://fungrim.org/entry/5174ea)

---

$$\mathrm{AGM}(a, b)=\mathrm{AGM}(b, a)$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for expansion.
[`59fab1` · Fungrim entry ↗](https://fungrim.org/entry/59fab1)

---

$$\mathrm{AGM}(1, \imaginaryI)=\frac{\sqrt{2}(1+\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`69d0a3` · Fungrim entry ↗](https://fungrim.org/entry/69d0a3)

---

$$\mathrm{AGM}(a, b)=\frac{\pi(a+b)}{4\mathrm{EllipticK}((a-b)/(a+b)^2)}$$

**Holds when** $a\in\C\land b\in\C\land b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`71a0ff` · Fungrim entry ↗](https://fungrim.org/entry/71a0ff)

---

$$\mathrm{AGM}(1, \sqrt{2})=(\mathrm{JacobiTheta}(4, 0, \imaginaryI)^2)^{-1}$$

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

**Holds when** $b\in\C\land b\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`8e80c6` · Fungrim entry ↗](https://fungrim.org/entry/8e80c6)

---

$$\mathrm{AGM}(a, 0)=0$$

**Holds when** $a\in\C$.
Used by the Compute Engine for simplification.
[`8f176c` · Fungrim entry ↗](https://fungrim.org/entry/8f176c)

---

$$\mathrm{AGM}(1+b, 1-b)=\mathrm{AGM}(1, \sqrt{1-b^2})$$

**Holds when** $b\in\C$.
Used by the Compute Engine for expansion.
[`9d84d8` · Fungrim entry ↗](https://fungrim.org/entry/9d84d8)

---

$$2a(b^2-a^2)a\mapsto\mathrm{AGM}(a, b)^{\prime}(a)^2-a\mathrm{AGM}(a, b)^2+((3a^2-b^2)a\mapsto\mathrm{AGM}(a, b)^{\prime}(a)+a(a^2-b^2)a\mapsto\mathrm{AGM}(a, b)^{\doubleprime}(a))\mathrm{AGM}(a, b)=0$$

**Holds when** $a\in\C\land b\in\C\land b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/09.54.13.0001.01)
[`a4cc5a` · Fungrim entry ↗](https://fungrim.org/entry/a4cc5a)

---

$$\mathrm{AGM}(a, a)=a$$

**Holds when** $a\in\C$.
Used by the Compute Engine for simplification.
[`b41bdd` · Fungrim entry ↗](https://fungrim.org/entry/b41bdd)

---

$$\mathrm{AGM}(a, b)=a\mathrm{AGM}(1, \frac{b}{a})$$

**Holds when** $a\in\C\land b\in\C\land a\ne0\land\frac{b}{a}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`ce2395` · Fungrim entry ↗](https://fungrim.org/entry/ce2395)

---

$$\mathrm{AGM}(a, b)=\frac{a+b}{2\mathrm{Hypergeometric2F_1}(\frac{1}{2}, \frac{1}{2}, 1, (a-b)/(a+b)^2)}$$

**Holds when** $a\in\C\land b\in\C\land b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`d6d836` · Fungrim entry ↗](https://fungrim.org/entry/d6d836)

---

$$\mathrm{EllipticK}(m)=(\pi)(2\mathrm{AGM}(1, \sqrt{1-m}))^{-1}$$

**Holds when** $m\in\C$.
Used by the Compute Engine for simplification.
[`e15f43` · Fungrim entry ↗](https://fungrim.org/entry/e15f43)

---

$$\mathrm{AGM}(1, \frac{\sqrt{2}}{2})=\frac{2\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`e3896e` · Fungrim entry ↗](https://fungrim.org/entry/e3896e)

---

$$\mathrm{AGM}(a, b)=b\mathrm{AGM}(1, \frac{a}{b})$$

**Holds when** $a\in\C\land b\in\C\land b\ne0\land\frac{a}{b}\notin\lparen-\infty, 0\rbrack$.
Used by the Compute Engine for simplification.
[`ea1d58` · Fungrim entry ↗](https://fungrim.org/entry/ea1d58)

---

$$\mathrm{AGM}(1, 1)=1$$

Used by the Compute Engine for simplification.
[`eb0661` · Fungrim entry ↗](https://fungrim.org/entry/eb0661)

---

$$\mathrm{AGM}(1, 3-2\sqrt{2})=\frac{2(2-\sqrt{2})\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`f9190b` · Fungrim entry ↗](https://fungrim.org/entry/f9190b)

---

$$\mathrm{AGM}(a, b)=\mathrm{AGM}(\frac{a+b}{2}, \begin{cases}1&(ab)^{1/2}=0\lor\Re((a+b)/2/(ab)^{1/2})\ge0\\-1&\top\end{cases}\sqrt{ab})$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`fa6ff7` · Fungrim entry ↗](https://fungrim.org/entry/fa6ff7)

---

## Carlson symmetric elliptic integrals

$$\mathrm{CarlsonRD}(0, y, z)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(-(3/2), \bigl\lbrack1/2, 3/2\bigr\rbrack, \bigl\lbrack y, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`00c331` · Fungrim entry ↗](https://fungrim.org/entry/00c331)

---

$$\mathrm{CarlsonRC}(x, -y)=\frac{\mathrm{artanh}(\sqrt{x/(x+y)})+(\frac{-1}{2}\imaginaryI)\pi}{\sqrt{x+y}}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`00cdb7` · Fungrim entry ↗](https://fungrim.org/entry/00cdb7)

---

$$\mathrm{CarlsonRD}(0, 1, 2)=\frac{3\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}\pi^{1/2}^{3}}{2\Gamma(1/4)^2}$$

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

$$\mathrm{CarlsonRJ}(x, w, w, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, w)-\frac{x^{1/2}}{w})}{2(w-x)}&x\ne w\\x^{-(3/2)}&x=w\end{cases}$$

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

**Holds when** $z\in\C\land\Im(\tau)\gt0$.
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

$$\mathrm{CarlsonRD}(0, 0, -1)=\imaginaryI\infty$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`14a365` · Fungrim entry ↗](https://fungrim.org/entry/14a365)

---

$$\mathrm{CarlsonRC}(1, 1+y)=\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, -y)$$

**Holds when** $y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
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

$$\mathrm{CarlsonRJ}(x, x, x, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, w)-\frac{1}{x^{1/2}})}{x-w}&x\ne w\\w^{-(3/2)}&x=w\end{cases}$$

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

$$\mathrm{CarlsonRF}(x, y, z)=2\mathrm{CarlsonRF}(x+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}, y+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}, z+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z})$$

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

$$\mathrm{CarlsonRC}(1, -1)=\frac{1}{2}(\sqrt{2}\ln(1+2^{1/2}))-\frac{1}{4}(\pi\sqrt{2}\imaginaryI)$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`25435b` · Fungrim entry ↗](https://fungrim.org/entry/25435b)

---

$$\mathrm{CarlsonRF}(0, x, -(cx))=\begin{cases}\mathrm{EllipticK}(c+1)&0\le\Re(x)\land\Im(x)=0\lor\Im(x)\lt0\\2\imaginaryI\mathrm{EllipticK}(-c)+\mathrm{EllipticK}(c+1)&\top\end{cases}/\sqrt{x}$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`271b73` · Fungrim entry ↗](https://fungrim.org/entry/271b73)

---

$$\mathrm{CarlsonRF}(0, 1, 2)=\frac{\Gamma(1/4)^2}{4\sqrt{2\pi}}$$

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

$$\mathrm{CarlsonRJ}(1, -1, -1, -1)=-(\frac{3}{4})-\frac{1}{8}(3\sqrt{2}\ln(1+2^{1/2}))+\frac{1}{16}(3\sqrt{2}\pi\imaginaryI)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`303827` · Fungrim entry ↗](https://fungrim.org/entry/303827)

---

$$\mathrm{CarlsonRD}(1, -1, -1)=-(\frac{3}{4})-\frac{1}{8}(3\sqrt{2}\ln(1+2^{1/2}))+\frac{1}{16}(3\sqrt{2}\pi\imaginaryI)$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3047b1` · Fungrim entry ↗](https://fungrim.org/entry/3047b1)

---

$$\mathrm{CarlsonRD}(x, y, z)=2\mathrm{CarlsonRD}(x+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}, y+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}, z+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z})+(3)(\sqrt{z}(z+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}))^{-1}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land z\ne0$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`31a3ba` · Fungrim entry ↗](https://fungrim.org/entry/31a3ba)

---

$$\arccos(\frac{x}{y})=\sqrt{y^2-x^2}\mathrm{CarlsonRC}(x^2, y^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\lbrack0, y\rbrack$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`33e034` · Fungrim entry ↗](https://fungrim.org/entry/33e034)

---

$$\mathrm{CarlsonRJ}(0, 0, -1, -1)=\imaginaryI\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3567c5` · Fungrim entry ↗](https://fungrim.org/entry/3567c5)

---

$$\mathrm{CarlsonRC}(0, -1)=-(\frac{\pi\imaginaryI}{2})$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`35cb93` · Fungrim entry ↗](https://fungrim.org/entry/35cb93)

---

$$\mathrm{CarlsonRD}(0, y, z)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(-(3/2), \bigl\lbrack1/2, 1/2, 1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z, z, z\bigr\rbrack))$$

**Holds when** $y\in\C\setminus\lparen-\infty, 0\rbrack\land z\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`37ffb7` · Fungrim entry ↗](https://fungrim.org/entry/37ffb7)

---

$$\mathrm{CarlsonRF}(x+\mathrm{lamda}, y+\mathrm{lamda}, \mathrm{lamda})+\mathrm{CarlsonRF}(x+\frac{xy}{\mathrm{lamda}}, y+\frac{xy}{\mathrm{lamda}}, \frac{xy}{\mathrm{lamda}})=\mathrm{CarlsonRF}(x, y, 0)$$

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

$$\mathrm{CarlsonRF}(0, -1, -1)=\frac{-(\pi\imaginaryI)}{2}$$

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
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`3e05c6` · Fungrim entry ↗](https://fungrim.org/entry/3e05c6)

---

$$\mathrm{CarlsonRG}(0, x, 2x)=\sqrt{x}(\frac{\Gamma(1/4)^2}{8\sqrt{2\pi}}+\frac{\sqrt{\pi}^{3}}{\sqrt{2}\Gamma(1/4)^2})$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3f1547` · Fungrim entry ↗](https://fungrim.org/entry/3f1547)

---

$$\mathrm{CarlsonRG}(0, 1, x)=\frac{\mathrm{EllipticE}(1-x)}{2}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3f6d40` · Fungrim entry ↗](https://fungrim.org/entry/3f6d40)

---

$$\mathrm{CarlsonRG}(-x, -y, z)=-(\imaginaryI\mathrm{CarlsonRG}(x, y, -z))^\star$$

**Holds when** $x\in\lbrack0, \infty\rparen\land y\in\lbrack0, \infty\rparen\land z\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`4091ad` · Fungrim entry ↗](https://fungrim.org/entry/4091ad)

---

$$\mathrm{CarlsonRF}(0, x, y)=\mathrm{EllipticK}(1-y/x)/\sqrt{x}$$

**Holds when** $x\in\C\land y\in\C\land\vert\arg(x)-\arg(y)\vert\lt\pi$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`415ff0` · Fungrim entry ↗](https://fungrim.org/entry/415ff0)

---

$$\mathrm{arsinh}(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2+x^2, y^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\R$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`423b36` · Fungrim entry ↗](https://fungrim.org/entry/423b36)

---

$$\mathrm{CarlsonRC}(x, y)=\mathrm{CarlsonHypergeometricR}(-(\frac{1}{2}), \bigl\lbrack\frac{1}{2}, \frac{1}{2}, \frac{1}{2}\bigr\rbrack, \bigl\lbrack x, y, y\bigr\rbrack)$$

**Holds when** $x\in\C\setminus\lparen-\infty, 0\rparen\land y\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`42c7f1` · Fungrim entry ↗](https://fungrim.org/entry/42c7f1)

---

$$\mathrm{CarlsonRJ}(1, 2, 2, 4)=\frac{1}{24}((9-4\sqrt{3})\pi)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`44d300` · Fungrim entry ↗](https://fungrim.org/entry/44d300)

---

$$\mathrm{CarlsonRG}(0, x, -(cx))=\frac{1}{2}(\sqrt{x}\begin{cases}\mathrm{EllipticE}(1+c)&\Im(x)\lt0\lor\Im(x)=0\land\Re(x)\ge0\\\mathrm{EllipticE}(1+c)+2\imaginaryI(\mathrm{EllipticK}(-c)-\mathrm{EllipticE}(-c))&\top\end{cases})$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
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

$$\mathrm{CarlsonRJ}(1, -1, -1, 1)=\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2}-\frac{1}{8}(3\sqrt{2}\pi\imaginaryI)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4c1db8` · Fungrim entry ↗](https://fungrim.org/entry/4c1db8)

---

$$\mathrm{CarlsonRJ}(x, x, x, x)=x^{-(\frac{3}{2})}$$

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

$$\mathrm{CarlsonRG}(1, 1, 2)=\frac{\sqrt{2}}{2}+\frac{\ln(1+\sqrt{2})}{2}$$

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

**Holds when** $y\in\C\setminus\lbrace0\rbrace\land z\in\C\land\vert\arg(y)-\arg(z)\vert\lt\pi$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4e4380` · Fungrim entry ↗](https://fungrim.org/entry/4e4380)

---

$$\mathrm{CarlsonRJ}(x+\mathrm{lamda}, y+\mathrm{lamda}, \mathrm{lamda}, w+\mathrm{lamda})+\mathrm{CarlsonRJ}(x+\frac{xy}{\mathrm{lamda}}, y+\frac{xy}{\mathrm{lamda}}, \frac{xy}{\mathrm{lamda}}, w+\frac{xy}{\mathrm{lamda}})=\mathrm{CarlsonRJ}(x, y, 0, w)-3\mathrm{CarlsonRC}(w^2(\mathrm{lamda}+\frac{xy}{\mathrm{lamda}}+x+y), w(w+\mathrm{lamda})(w+\frac{xy}{\mathrm{lamda}}))$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen\land w\in\lparen0, \infty\rparen\land\mathrm{lamda}\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`4eac3f` · Fungrim entry ↗](https://fungrim.org/entry/4eac3f)

---

$$\mathrm{CarlsonRJ}(0, 1, 1, 2)=\frac{3\pi}{4+2\sqrt{2}}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`522f54` · Fungrim entry ↗](https://fungrim.org/entry/522f54)

---

$$\mathrm{CarlsonRJ}(1, 1, -1, -1)=(\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2})\imaginaryI-\frac{1}{8}(3\sqrt{2}\pi)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`534335` · Fungrim entry ↗](https://fungrim.org/entry/534335)

---

$$\mathrm{CarlsonRF}(0, x, cx)=\frac{\mathrm{EllipticK}(1-c)}{\sqrt{x}}$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`538c8c` · Fungrim entry ↗](https://fungrim.org/entry/538c8c)

---

$$\mathrm{CarlsonRF}(0, 1, x)=\mathrm{EllipticK}(1-x)$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`53d869` · Fungrim entry ↗](https://fungrim.org/entry/53d869)

---

$$\mathrm{CarlsonRD}(1, 1, -1)=(\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2})\imaginaryI-\frac{1}{8}(3\sqrt{2}\pi)$$

**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`545e8b` · Fungrim entry ↗](https://fungrim.org/entry/545e8b)

---

$$\mathrm{CarlsonRJ}(0, 0, 0, 0)=\tilde\infty$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`55cd70` · Fungrim entry ↗](https://fungrim.org/entry/55cd70)

---

$$\mathrm{CarlsonRC}(-1, 0)=-(\imaginaryI\infty)$$

**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`56d1bc` · Fungrim entry ↗](https://fungrim.org/entry/56d1bc)

---

$$\arcsin(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2-x^2, y^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\lbrack-y, y\rbrack$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`584a61` · Fungrim entry ↗](https://fungrim.org/entry/584a61)

---

$$\mathrm{CarlsonRJ}(0, y, z, w)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(-(3/2), \bigl\lbrack1/2, 1/2, 1\bigr\rbrack, \bigl\lbrack y, z, w\bigr\rbrack))$$

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

$$\mathrm{CarlsonRC}(x, y)=\begin{cases}\frac{\arctan((y/x-1)^{1/2})}{\sqrt{y-x}}&x\lt y\\\frac{1}{\sqrt{x}}&x=y\\\frac{\mathrm{artanh}((1-y/x)^{1/2})}{\sqrt{x-y}}&x\gt y\end{cases}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`5ada5f` · Fungrim entry ↗](https://fungrim.org/entry/5ada5f)

---

$$\mathrm{CarlsonRF}(0, -1, -2)=-(((2^{1/2}/8\imaginaryI)\Gamma(1/4)^2)/\sqrt{\pi})$$

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
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
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

$$\mathrm{CarlsonRD}(x, y, z)+\mathrm{CarlsonRD}(y, z, x)+\mathrm{CarlsonRD}(z, x, y)=(3)(\sqrt{x}\sqrt{y}\sqrt{z})^{-1}$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land x\ne0\land y\ne0$ &nbsp;_or_&nbsp; $z\ne0$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`6dda7a` · Fungrim entry ↗](https://fungrim.org/entry/6dda7a)

---

$$\mathrm{CarlsonRJ}(1, 1, 2, 4)=\ln(1+\sqrt{2})-\frac{\sqrt{2}\pi}{8}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`6e9544` · Fungrim entry ↗](https://fungrim.org/entry/6e9544)

---

$$\mathrm{CarlsonRC}(x, y)=\begin{cases}\frac{\arccos(x/y^{1/2})}{\sqrt{y-x}}&x\lt y\\\frac{1}{\sqrt{x}}&x=y\\\frac{\mathrm{arcosh}(x/y^{1/2})}{\sqrt{x-y}}&x\gt y\end{cases}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`718f3a` · Fungrim entry ↗](https://fungrim.org/entry/718f3a)

---

$$\mathrm{CarlsonRC}(1, x)=\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, 1-x)$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`72b5bd` · Fungrim entry ↗](https://fungrim.org/entry/72b5bd)

---

$$\mathrm{CarlsonRJ}(0, y, z, w)=\frac{1}{4}(3\pi\mathrm{CarlsonHypergeometricR}(-(3/2), \bigl\lbrack1/2, 1/2, 1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z, w, w\bigr\rbrack))$$

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

$$\mathrm{CarlsonRD}(x, x, y)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(y, x)-\frac{1}{y^{1/2}})}{y-x}&x\ne y\\x^{-(3/2)}&x=y\end{cases}$$

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

$$\arctan(\frac{x}{y})=x\mathrm{CarlsonRC}(y^2, y^2+x^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\R$.
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

$$\mathrm{CarlsonRC}(x, 0)=\begin{cases}\mathrm{sgn}(\frac{1}{x^{1/2}})\infty&x\ne0\\\tilde\infty&x=0\end{cases}$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7cbe17` · Fungrim entry ↗](https://fungrim.org/entry/7cbe17)

---

$$\mathrm{CarlsonRG}(0, x, y)=\frac{1}{2}(\sqrt{x}\mathrm{EllipticE}(1-y/x))$$

**Holds when** $x\in\C\land y\in\C\land\vert\arg(x)-\arg(y)\vert\lt\pi$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`7cddc6` · Fungrim entry ↗](https://fungrim.org/entry/7cddc6)

---

$$\mathrm{CarlsonRC}(x, y)=\mathrm{CarlsonHypergeometricR}(-(\frac{1}{2}), \bigl\lbrack\frac{1}{2}, 1\bigr\rbrack, \bigl\lbrack x, y\bigr\rbrack)$$

**Holds when** $x\in\C\setminus\lparen-\infty, 0\rparen\land y\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonHypergeometricR** — Carlson multivariate hypergeometric function; **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`7ded8f` · Fungrim entry ↗](https://fungrim.org/entry/7ded8f)

---

$$\mathrm{CarlsonRC}(-1, 1)=\frac{\pi\sqrt{2}}{4}-\frac{1}{2}(\sqrt{2}\ln(1+2^{1/2})\imaginaryI)$$

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

$$\mathrm{CarlsonRG}(0, 1, 2)=\frac{\Gamma(1/4)^2}{8\sqrt{2\pi}}+\frac{\sqrt{\pi}^{3}}{\sqrt{2}\Gamma(1/4)^2}$$

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

$$\mathrm{CarlsonRC}(x, cx)=\begin{cases}\frac{\arctan((c-1)^{1/2})}{\sqrt{(c-1)x}}&c\gt1\\\frac{1}{\sqrt{x}}&c=1\\\frac{\mathrm{artanh}((1-c)^{1/2})}{\sqrt{(1-c)x}}&c\lt1\end{cases}$$

**Holds when** $x\in\C\land c\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`8c9ba1` · Fungrim entry ↗](https://fungrim.org/entry/8c9ba1)

---

$$\mathrm{CarlsonRD}(0, y, z)=\frac{\begin{cases}\frac{3(\mathrm{EllipticK}(1-y/z)-\mathrm{EllipticE}(1-y/z))}{1-y/z}&y\ne z\\\frac{3\pi}{4}&y=z\end{cases}}{\sqrt{z}^{3}}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace\land y\in\C\land\vert\arg(y)-\arg(z)\vert\lt\pi$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`8d0629` · Fungrim entry ↗](https://fungrim.org/entry/8d0629)

---

$$\mathrm{CarlsonRF}(x, y, z)=\mathrm{CarlsonRF}(\frac{1}{4}(x+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}), \frac{1}{4}(y+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}), \frac{1}{4}(z+\sqrt{x}\sqrt{y}+\sqrt{y}\sqrt{z}+\sqrt{x}\sqrt{z}))$$

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

$$\mathrm{CarlsonRF}(0, 0, -1)=-(\imaginaryI\infty)$$

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
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
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

$$\mathrm{CarlsonRD}(\mathrm{lamda}, x+\mathrm{lamda}, y+\mathrm{lamda})+\mathrm{CarlsonRD}(\frac{xy}{\mathrm{lamda}}, x+\frac{xy}{\mathrm{lamda}}, y+\frac{xy}{\mathrm{lamda}})=\mathrm{CarlsonRD}(0, x, y)-(3)(y\sqrt{x+y+\mathrm{lamda}+(xy)/\mathrm{lamda}})^{-1}$$

**Holds when** $x\in\lparen0, \infty\rparen\land y\in\lparen0, \infty\rparen\land\mathrm{lamda}\in\C\setminus\lparen-\infty, 0\rbrack$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`a203e9` · Fungrim entry ↗](https://fungrim.org/entry/a203e9)

---

$$\mathrm{CarlsonRG}(0, x, cx)=\frac{1}{2}(\sqrt{x}\mathrm{EllipticE}(1-c))$$

**Holds when** $x\in\C\land c\in\lbrack0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
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
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
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
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
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

$$\mathrm{CarlsonRJ}(0, 1, 2, 2)=\frac{3\sqrt{2}\Gamma(1/4)^2}{16\sqrt{\pi}}-\frac{3\sqrt{2}\pi^{1/2}^{3}}{2\Gamma(1/4)^2}$$

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

$$\mathrm{CarlsonRD}(x, y, y)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, y)-\frac{x^{1/2}}{y})}{2(y-x)}&x\ne y\\x^{-(3/2)}&x=y\end{cases}$$

**Holds when** $x\in\C\land y\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`c85c2f` · Fungrim entry ↗](https://fungrim.org/entry/c85c2f)

---

$$\mathrm{CarlsonRD}(x, x, x)=x^{-(\frac{3}{2})}$$

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

$$\mathrm{CarlsonRJ}(0, -1, -1, -1)=\frac{3\pi\imaginaryI}{4}$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`cdee01` · Fungrim entry ↗](https://fungrim.org/entry/cdee01)

---

$$\mathrm{CarlsonRF}(0, \imaginaryI, -\imaginaryI)=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`cf5caa` · Fungrim entry ↗](https://fungrim.org/entry/cf5caa)

---

$$\mathrm{CarlsonRF}(0, y, z)=\frac{1}{2}(\pi\mathrm{CarlsonHypergeometricR}(-(1/2), \bigl\lbrack1/2, 1/2\bigr\rbrack, \bigl\lbrack y, z\bigr\rbrack))$$

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

$$\mathrm{CarlsonRJ}(x, y, y, w)=\begin{cases}\frac{3(\mathrm{CarlsonRC}(x, y)-\mathrm{CarlsonRC}(x, w))}{w-y}&y\ne w\\\frac{3(\mathrm{CarlsonRC}(x, y)-\frac{x^{1/2}}{y})}{2(y-x)}&y=w\land x\ne y\\x^{-(3/2)}&x=y=w\end{cases}$$

**Holds when** $x\in\C\land y\in\C\land w\in\C$.
**Symbols:** **CarlsonRC** — Degenerate Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`d4b12e` · Fungrim entry ↗](https://fungrim.org/entry/d4b12e)

---

$$\mathrm{CarlsonRG}(1, 2, 2)=\frac{\pi}{4}+\frac{1}{2}$$

**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`d51efc` · Fungrim entry ↗](https://fungrim.org/entry/d51efc)

---

$$\mathrm{CarlsonRD}(0, -1, -1)=\frac{3\pi\imaginaryI}{4}$$

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

$$\mathrm{arcosh}(\frac{x}{y})=\sqrt{x^2-y^2}\mathrm{CarlsonRC}(x^2, y^2)$$

**Holds when** $y\in\lparen0, \infty\rparen\land x\in\lbrack y, \infty\rparen$.
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

$$\mathrm{CarlsonRJ}(1, 1, 1, -1)=\frac{1}{4}(3\times2^{1/2}\ln(1+2^{1/2}))-\frac{3}{2}-\frac{1}{8}(3\sqrt{2}\pi\imaginaryI)$$

**Symbols:** **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`e04867` · Fungrim entry ↗](https://fungrim.org/entry/e04867)

---

$$\mathrm{CarlsonRJ}(0, 0, z, w)=\begin{cases}\mathrm{sgn}(\frac{1}{z^{1/2}w})\infty&z\ne0\land w\ne0\\\tilde\infty&\top\end{cases}$$

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

$$\mathrm{CarlsonRG}(0, x, 1)=\frac{1}{4}(\pi\mathrm{Hypergeometric2F_1}(-(1/2), \frac{1}{2}, 1, 1-x))$$

**Holds when** $x\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
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

$$\mathrm{CarlsonRC}(1, 1+y)=\begin{cases}\frac{\arctan(y^{1/2})}{\sqrt{y}}&y\ne0\\1&y=0\end{cases}$$

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

$$\mathrm{CarlsonRD}(0, 0, z)=\begin{cases}\mathrm{sgn}(\frac{1}{z^{1/2}^{3}})\infty&z\ne0\\\tilde\infty&\top\end{cases}$$

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

$$\mathrm{CarlsonRG}(\mathrm{lamda}x, \mathrm{lamda}y, \mathrm{lamda}z)=\sqrt{\mathrm{lamda}}\mathrm{CarlsonRG}(x, y, z)$$

**Holds when** $x\in\C\land y\in\C\land z\in\C\land\mathrm{lamda}\in\lparen0, \infty\rparen$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f9ca94` · Fungrim entry ↗](https://fungrim.org/entry/f9ca94)

---

$$\mathrm{CarlsonRJ}(0, 0, -1, 1)=-(\imaginaryI\infty)$$

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

## Legendre elliptic integrals

$$\mathrm{IncompleteEllipticF}(\frac{-\pi}{2}, 1)=-\infty$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`04c829` · Fungrim entry ↗](https://fungrim.org/entry/04c829)

---

$$\mathrm{EllipticPi}(1, 0)=\tilde\infty$$

Used by the Compute Engine for simplification.
[`061c49` · Fungrim entry ↗](https://fungrim.org/entry/061c49)

---

$$\mathrm{IncompleteEllipticF}(\arcsin(\frac{1}{m^{1/2}}), m)=\frac{\mathrm{EllipticK}(\frac{1}{m})}{\sqrt{m}}$$

**Holds when** $m\in\C\setminus\lbrace0\rbrace$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for expansion.
[`087a7c` · Fungrim entry ↗](https://fungrim.org/entry/087a7c)

---

$$\mathrm{EllipticK}(\frac{1}{2}(1+\sqrt{3}\imaginaryI))=\frac{\exp(\frac{\imaginaryI\pi}{12})\sqrt[4]{3}\Gamma(1/3)^3}{2^{\frac{7}{3}}\pi}$$

Used by the Compute Engine for simplification.
[`0abbe1` · Fungrim entry ↗](https://fungrim.org/entry/0abbe1)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, m)=\mathrm{EllipticK}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0b8fd6` · Fungrim entry ↗](https://fungrim.org/entry/0b8fd6)

---

$$\mathrm{EllipticK}(m)=\mathrm{CarlsonRF}(0, 1-m, 1)$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`0cc11f` · Fungrim entry ↗](https://fungrim.org/entry/0cc11f)

---

$$\mathrm{EllipticPi}(\frac{1}{2}, 0)=\frac{\pi\sqrt{2}}{2}$$

Used by the Compute Engine for simplification.
[`124d02` · Fungrim entry ↗](https://fungrim.org/entry/124d02)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, 1)=\infty$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`16612f` · Fungrim entry ↗](https://fungrim.org/entry/16612f)

---

$$\mathrm{EllipticE}(m)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(-(1/2), \frac{1}{2}, 1, m))$$

**Holds when** $m\in\C$.
Used by the Compute Engine for simplification.
[`16d2e1` · Fungrim entry ↗](https://fungrim.org/entry/16d2e1)

---

$$\mathrm{EllipticK}(\frac{1}{2}(1-3^{1/2}\imaginaryI))=\frac{\exp(-((\imaginaryI\pi)/12))\sqrt[4]{3}\Gamma(1/3)^3}{2^{\frac{7}{3}}\pi}$$

Used by the Compute Engine for simplification.
[`175b7a` · Fungrim entry ↗](https://fungrim.org/entry/175b7a)

---

$$\mathrm{EllipticPi}(0, 1)=\infty$$

Used by the Compute Engine for simplification.
[`18e226` · Fungrim entry ↗](https://fungrim.org/entry/18e226)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, m)=\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`1b881e` · Fungrim entry ↗](https://fungrim.org/entry/1b881e)

---

$$\mathrm{EllipticE}(0)=\frac{\pi}{2}$$

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

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{2}, -1)=\sqrt{2}(\frac{\Gamma(1/4)^2}{8\sqrt{\pi}}+\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2})$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`2573ba` · Fungrim entry ↗](https://fungrim.org/entry/2573ba)

---

$$\mathrm{EllipticK}((3-2\times2^{1/2})^2)=\frac{(2+\sqrt{2})\Gamma(1/4)^2}{16\sqrt{\pi}}$$

Used by the Compute Engine for simplification.
[`2991b5` · Fungrim entry ↗](https://fungrim.org/entry/2991b5)

---

$$\mathrm{IncompleteEllipticE}(\frac{-\pi}{2}, m)=-\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for expansion.
[`2ef763` · Fungrim entry ↗](https://fungrim.org/entry/2ef763)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{3}, 1)=\frac{\sqrt{3}}{2}$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`3aed02` · Fungrim entry ↗](https://fungrim.org/entry/3aed02)

---

$$\mathrm{EllipticE}(\frac{1}{2})=\frac{\Gamma(1/4)^2}{8\sqrt{\pi}}+\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`3b272e` · Fungrim entry ↗](https://fungrim.org/entry/3b272e)

---

$$\mathrm{EllipticPi}(0, \frac{1}{2})=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

Used by the Compute Engine for simplification.
[`3c4979` · Fungrim entry ↗](https://fungrim.org/entry/3c4979)

---

$$\mathrm{EllipticK}(\frac{1}{2}-\frac{3^{1/2}}{4})=\frac{\sqrt[4]{3}\Gamma(1/3)^3}{4\sqrt[3]{2}\pi}$$

Used by the Compute Engine for simplification.
[`40a376` · Fungrim entry ↗](https://fungrim.org/entry/40a376)

---

$$\mathrm{EllipticE}(m)=\frac{1}{3}((1-m)(\mathrm{CarlsonRD}(0, 1-m, 1)+\mathrm{CarlsonRD}(0, 1, 1-m)))$$

**Holds when** $m\in\C\land m\ne1$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
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

Used by the Compute Engine for simplification.
[`45b157` · Fungrim entry ↗](https://fungrim.org/entry/45b157)

---

$$\mathrm{EllipticK}(\frac{1}{8}(4-3\times2^{1/2}))=\frac{\Gamma(1/4)^2}{4\sqrt[4]{2}\sqrt{\pi}}$$

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
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`55d23d` · Fungrim entry ↗](https://fungrim.org/entry/55d23d)

---

$$\mathrm{EllipticE}(2)=\frac{\sqrt{2}(1+\imaginaryI)\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`5d2c01` · Fungrim entry ↗](https://fungrim.org/entry/5d2c01)

---

$$\mathrm{EllipticPi}(n, 0)=(\pi)(2\sqrt{1-n})^{-1}$$

**Holds when** $n\in\C$.
Used by the Compute Engine for simplification.
[`5d8804` · Fungrim entry ↗](https://fungrim.org/entry/5d8804)

---

$$\mathrm{IncompleteEllipticPi}(n, \phi+k\pi, m)=\mathrm{IncompleteEllipticPi}(n, \phi, m)+2k\mathrm{EllipticPi}(n, m)$$

**Holds when** $n\in\C\land\phi\in\C\land m\in\C\land k\in\Z\land n\ne1\land m\ne1$.
**Symbols:** **IncompleteEllipticPi** — Legendre incomplete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`5f84d9` · Fungrim entry ↗](https://fungrim.org/entry/5f84d9)

---

$$\mathrm{EllipticPi}(0, 0)=\frac{\pi}{2}$$

Used by the Compute Engine for simplification.
[`618a54` · Fungrim entry ↗](https://fungrim.org/entry/618a54)

---

$$\mathrm{EllipticK}(2)=\frac{\sqrt{2}(1-\imaginaryI)\Gamma(1/4)^2}{8\sqrt{\pi}}$$

Used by the Compute Engine for simplification.
[`630eca` · Fungrim entry ↗](https://fungrim.org/entry/630eca)

---

$$\mathrm{EllipticE}(m)=2\mathrm{CarlsonRG}(0, 1-m, 1)$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRG** — Carlson symmetric elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`6520e7` · Fungrim entry ↗](https://fungrim.org/entry/6520e7)

---

$$\mathrm{IncompleteEllipticF}(\phi+k\pi, m)=\mathrm{IncompleteEllipticF}(\phi, m)+2k\mathrm{EllipticK}(m)$$

**Holds when** $\phi\in\C\land m\in\C\land k\in\Z\land m\ne1$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`685126` · Fungrim entry ↗](https://fungrim.org/entry/685126)

---

$$\mathrm{EllipticK}(m^\star)=\mathrm{EllipticK}(m)^\star$$

**Holds when** $m\in\C\setminus\lparen1, \infty\rparen$.
Used by the Compute Engine for expansion.
[`713966` · Fungrim entry ↗](https://fungrim.org/entry/713966)

---

$$2\mathrm{EllipticE}(m)-\mathrm{EllipticK}(m)=\frac{1}{2}(\pi\mathrm{Hypergeometric2F_1}(-(1/2), \frac{3}{2}, 1, m))$$

**Holds when** $m\in\C$.
Used by the Compute Engine for simplification.
[`752619` · Fungrim entry ↗](https://fungrim.org/entry/752619)

---

$$\mathrm{IncompleteEllipticF}(\frac{-\pi}{2}, m)=-\mathrm{EllipticK}(m)$$

**Holds when** $m\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
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
Used by the Compute Engine for expansion.
[`8e5c81` · Fungrim entry ↗](https://fungrim.org/entry/8e5c81)

---

$$\mathrm{IncompleteEllipticPi}(n, \phi, m)=\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)+\frac{n}{3}\sin(\phi)^3\mathrm{CarlsonRJ}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1, 1-n\sin(\phi)^2)$$

**Holds when** $n\in\C\land\phi\in\C\land m\in\C\land\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind; **IncompleteEllipticPi** — Legendre incomplete elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`8f4e31` · Fungrim entry ↗](https://fungrim.org/entry/8f4e31)

---

$$\mathrm{EllipticPi}(m, m)=\frac{\mathrm{EllipticE}(m)}{1-m}$$

**Holds when** $m\in\C$.
Used by the Compute Engine for simplification.
[`9227bf` · Fungrim entry ↗](https://fungrim.org/entry/9227bf)

---

$$\mathrm{EllipticK}(m)-\mathrm{EllipticE}(m)=\frac{1}{3}(m\mathrm{CarlsonRD}(0, 1-m, 1))$$

**Holds when** $m\in\C$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for expansion.
[`94f646` · Fungrim entry ↗](https://fungrim.org/entry/94f646)

---

$$\mathrm{EllipticE}(1)=1$$

Used by the Compute Engine for simplification.
[`958a3f` · Fungrim entry ↗](https://fungrim.org/entry/958a3f)

---

$$\mathrm{EllipticPi}(\frac{1}{2}, \frac{1}{2})=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}+\frac{2\sqrt{\pi}^{3}}{\Gamma(1/4)^2}$$

Used by the Compute Engine for simplification.
[`9b0385` · Fungrim entry ↗](https://fungrim.org/entry/9b0385)

---

$$\mathrm{EllipticPi}(n, m)=\mathrm{CarlsonRF}(0, 1-m, 1)+\frac{1}{3}(n\mathrm{CarlsonRJ}(0, 1-m, 1, 1-n))$$

**Holds when** $n\in\C\land m\in\C\land m\ne1$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **CarlsonRJ** — Carlson symmetric elliptic integral of the third kind.
Used by the Compute Engine for simplification.
[`9ccaef` · Fungrim entry ↗](https://fungrim.org/entry/9ccaef)

---

$$\mathrm{EllipticE}(-1)=\sqrt{2}(\frac{\Gamma(1/4)^2}{8\sqrt{\pi}}+\frac{\sqrt{\pi}^{3}}{\Gamma(1/4)^2})$$

Used by the Compute Engine for simplification.
[`9f3474` · Fungrim entry ↗](https://fungrim.org/entry/9f3474)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi k}{2}, m)=k\mathrm{EllipticE}(m)$$

**Holds when** $m\in\C\land k\in\Z$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
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

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`aac129` · Fungrim entry ↗](https://fungrim.org/entry/aac129)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{2}, -1)=\frac{\Gamma(1/4)^2}{4\sqrt{2\pi}}$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ace837` · Fungrim entry ↗](https://fungrim.org/entry/ace837)

---

$$\mathrm{EllipticK}(-1)=\frac{\Gamma(1/4)^2}{4\sqrt{2\pi}}$$

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
Used by the Compute Engine for simplification.
[`b760d1` · Fungrim entry ↗](https://fungrim.org/entry/b760d1)

---

$$\mathrm{IncompleteEllipticF}(\phi, 1)=\begin{cases}\ln(\frac{1+\sin(\phi)}{\cos(\phi)})&(-\pi)/2\le\Re(\phi)\le\pi/2\land\phi\notin\lbrace(-\pi)/2, \pi/2\rbrace\\\mathrm{sgn}(\phi)\infty&\phi\in\lbrace(-\pi)/2, \pi/2\rbrace\\\tilde\infty&\top\end{cases}$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`b7cfb3` · Fungrim entry ↗](https://fungrim.org/entry/b7cfb3)

---

$$\mathrm{EllipticK}(4\sqrt{3}-7)=\frac{\sqrt{3+2\sqrt{3}}\Gamma(1/3)^3}{2^{\frac{10}{3}}\pi}$$

Used by the Compute Engine for simplification.
[`b95ffa` · Fungrim entry ↗](https://fungrim.org/entry/b95ffa)

---

$$\mathrm{IncompleteEllipticF}(0, 0)=0$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`ba1965` · Fungrim entry ↗](https://fungrim.org/entry/ba1965)

---

$$\mathrm{EllipticK}(0)=\frac{\pi}{2}$$

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

$$\mathrm{IncompleteEllipticE}(\phi+k\pi, m)=\mathrm{IncompleteEllipticE}(\phi, m)+2k\mathrm{EllipticE}(m)$$

**Holds when** $\phi\in\C\land m\in\C\land k\in\Z$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`c28288` · Fungrim entry ↗](https://fungrim.org/entry/c28288)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{3}, 1)=\ln(2+\sqrt{3})$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`c584c3` · Fungrim entry ↗](https://fungrim.org/entry/c584c3)

---

$$\mathrm{EllipticK}(\frac{1}{2})=\frac{\Gamma(1/4)^2}{4\sqrt{\pi}}$$

Used by the Compute Engine for simplification.
[`cc22bf` · Fungrim entry ↗](https://fungrim.org/entry/cc22bf)

---

$$\mathrm{EllipticPi}(1, m)=\tilde\infty$$

**Holds when** $m\in\C$.
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
Used by the Compute Engine for expansion.
[`dd67fb` · Fungrim entry ↗](https://fungrim.org/entry/dd67fb)

---

$$\mathrm{IncompleteEllipticE}(\frac{-\pi}{2}, 1)=-1$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`dec0d2` · Fungrim entry ↗](https://fungrim.org/entry/dec0d2)

---

$$\mathrm{IncompleteEllipticF}(\phi, m)=\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)$$

**Holds when** $\phi\in\C\land m\in\C\land\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}$.
**Symbols:** **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`e2445d` · Fungrim entry ↗](https://fungrim.org/entry/e2445d)

---

$$\mathrm{EllipticPi}(n, 1)=\begin{cases}\frac{\infty}{1-n}&n\ne1\\\tilde\infty&n=1\end{cases}$$

**Holds when** $n\in\C$.
Used by the Compute Engine for simplification.
[`e9c797` · Fungrim entry ↗](https://fungrim.org/entry/e9c797)

---

$$\mathrm{IncompleteEllipticE}(\frac{\pi}{6}, 4)=2\mathrm{EllipticE}(\frac{1}{4})-\frac{1}{2}(3\mathrm{EllipticK}(1/4))$$

**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`eba27c` · Fungrim entry ↗](https://fungrim.org/entry/eba27c)

---

$$\mathrm{IncompleteEllipticE}(\phi, 0)=\phi$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`efc7a4` · Fungrim entry ↗](https://fungrim.org/entry/efc7a4)

---

$$\mathrm{IncompleteEllipticE}(\arcsin(\frac{1}{m^{1/2}}), m)=\sqrt{m}(\mathrm{EllipticE}(\frac{1}{m})-(1-\frac{1}{m})\mathrm{EllipticK}(\frac{1}{m}))$$

**Holds when** $m\in\C\setminus\lbrace0, 1\rbrace$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f0bcb5` · Fungrim entry ↗](https://fungrim.org/entry/f0bcb5)

---

$$\mathrm{IncompleteEllipticE}(\phi, 1)=(-1)^{\lfloor\frac{\Re(\phi)}{\pi}+\frac{1}{2}\rfloor}\sin(\phi)+2\lfloor\frac{\Re(\phi)}{\pi}+\frac{1}{2}\rfloor$$

**Holds when** $\phi\in\C$.
**Symbols:** **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f35a37` · Fungrim entry ↗](https://fungrim.org/entry/f35a37)

---

$$\mathrm{IncompleteEllipticE}(\phi, m)=\sin(\phi)\mathrm{CarlsonRF}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)-\frac{m}{3}\sin(\phi)^3\mathrm{CarlsonRD}(\cos(\phi)^2, 1-m\sin(\phi)^2, 1)$$

**Holds when** $\phi\in\C\land m\in\C\land\frac{-\pi}{2}\le\Re(\phi)\le\frac{\pi}{2}$.
**Symbols:** **CarlsonRD** — Degenerate Carlson symmetric elliptic integral of the third kind; **CarlsonRF** — Carlson symmetric elliptic integral of the first kind; **IncompleteEllipticE** — Legendre incomplete elliptic integral of the second kind.
Used by the Compute Engine for simplification.
[`f48f54` · Fungrim entry ↗](https://fungrim.org/entry/f48f54)

---

$$\mathrm{IncompleteEllipticF}(\frac{\pi}{4}, 1)=\ln(1+\sqrt{2})$$

**Symbols:** **IncompleteEllipticF** — Legendre incomplete elliptic integral of the first kind.
Used by the Compute Engine for simplification.
[`f5d489` · Fungrim entry ↗](https://fungrim.org/entry/f5d489)

---

## Weierstrass elliptic functions

$$\mathrm{WeierstrassZeta}(z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau, 1)}{\mathrm{JacobiTheta}(1, z, \tau)}-\frac{z\mathrm{JacobiTheta}(1, 0, \tau, 3)}{3\mathrm{JacobiTheta}(1, 0, \tau, 1)}$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`0207dc` · Fungrim entry ↗](https://fungrim.org/entry/0207dc)

---

$$z\mapsto\mathrm{WeierstrassSigma}(z, \tau)^{\prime}(z)=\mathrm{WeierstrassZeta}(z, \tau)\mathrm{WeierstrassSigma}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`0e649f` · Fungrim entry ↗](https://fungrim.org/entry/0e649f)

---

$$\mathrm{WeierstrassP}(-z, \tau)=\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`12a9e8` · Fungrim entry ↗](https://fungrim.org/entry/12a9e8)

---

$$\mathrm{WeierstrassSigma}(-z, \tau)=-\mathrm{WeierstrassSigma}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function.
Used by the Compute Engine for expansion.
[`23beb5` · Fungrim entry ↗](https://fungrim.org/entry/23beb5)

---

$$\mathrm{WeierstrassSigma}(z+1, \tau)=-(\exp(2(z+\frac{1}{2})\mathrm{WeierstrassZeta}(1/2, \tau))\mathrm{WeierstrassSigma}(z, \tau))$$

**Holds when** $z\in\C\land\Im(\tau)\gt0$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`35403b` · Fungrim entry ↗](https://fungrim.org/entry/35403b)

---

$$\mathrm{WeierstrassZeta}(-z, \tau)=-\mathrm{WeierstrassZeta}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for expansion.
[`72eb69` · Fungrim entry ↗](https://fungrim.org/entry/72eb69)

---

$$\mathrm{WeierstrassZeta}(z+\tau, \tau)=\mathrm{WeierstrassZeta}(z, \tau)+\mathrm{WeierstrassZeta}(\frac{\tau}{2}, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`a0c85d` · Fungrim entry ↗](https://fungrim.org/entry/a0c85d)

---

$$\mathrm{WeierstrassP}(z+m+n\tau, \tau)=\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)\land m\in\Z\land n\in\Z$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`a95b7e` · Fungrim entry ↗](https://fungrim.org/entry/a95b7e)

---

$$\mathrm{WeierstrassP}(z, \tau)=\frac{\pi\mathrm{JacobiTheta}(2, 0, \tau)\mathrm{JacobiTheta}(3, 0, \tau)\mathrm{JacobiTheta}(4, z, \tau)}{\mathrm{JacobiTheta}(1, z, \tau)}^2-\frac{1}{3}(\pi^2(\mathrm{JacobiTheta}(2, 0, \tau)^4+\mathrm{JacobiTheta}(3, 0, \tau)^4))$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function.
Used by the Compute Engine for simplification.
[`af0dfc` · Fungrim entry ↗](https://fungrim.org/entry/af0dfc)

---

$$\mathrm{WeierstrassSigma}(z, \tau)=\frac{\mathrm{JacobiTheta}(1, z, \tau)\exp(-((\mathrm{JacobiTheta}(1, 0, \tau, 3)z^2)/(6\mathrm{JacobiTheta}(1, 0, \tau, 1))))}{\mathrm{JacobiTheta}(1, 0, \tau, 1)}$$

**Holds when** $z\in\C\land\Im(\tau)\gt0$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function.
Used by the Compute Engine for simplification.
[`b96c9d` · Fungrim entry ↗](https://fungrim.org/entry/b96c9d)

---

$$\mathrm{WeierstrassSigma}(z+\tau, \tau)=-(\exp(2(z+\frac{\tau}{2})\mathrm{WeierstrassZeta}(\tau/2, \tau))\mathrm{WeierstrassSigma}(z, \tau))$$

**Holds when** $z\in\C\land\Im(\tau)\gt0$.
**Symbols:** **WeierstrassSigma** — Weierstrass sigma function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`de9f42` · Fungrim entry ↗](https://fungrim.org/entry/de9f42)

---

$$z\mapsto\mathrm{WeierstrassZeta}(z, \tau)^{\prime}(z)=-\mathrm{WeierstrassP}(z, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassP** — Weierstrass elliptic function; **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`e677fb` · Fungrim entry ↗](https://fungrim.org/entry/e677fb)

---

$$\mathrm{WeierstrassZeta}(z+1, \tau)=\mathrm{WeierstrassZeta}(z, \tau)+\mathrm{WeierstrassZeta}(\frac{1}{2}, \tau)$$

**Holds when** $z\in\C\land\Im(\tau)\gt0\land z\notin\mathrm{Lattice}(1, \tau)$.
**Symbols:** **WeierstrassZeta** — Weierstrass zeta function.
Used by the Compute Engine for simplification.
[`ffcc0f` · Fungrim entry ↗](https://fungrim.org/entry/ffcc0f)

---
