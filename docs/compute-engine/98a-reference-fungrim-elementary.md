---
title: Fungrim Identities — Elementary functions
slug: /compute-engine/reference/fungrim-elementary/
---

# Elementary functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **208 identities** for elementary functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Exponential function](#exponential-function) (16)
- [Golden ratio](#golden-ratio) (5)
- [Inverse tangent](#inverse-tangent) (44)
- [Lambert W-function](#lambert-w-function) (11)
- [Natural logarithm](#natural-logarithm) (11)
- [Pi](#pi) (4)
- [Powers](#powers) (8)
- [Sinc function](#sinc-function) (24)
- [Sine](#sine) (59)
- [Square roots](#square-roots) (26)

## Exponential function

$$\exponentialE^{z}=\cosh(z)+\sinh(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1568e1` · Fungrim entry ↗](https://fungrim.org/entry/1568e1)

---

$$\vert\exponentialE^{z}\vert=\exp(\Re(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1b3014` · Fungrim entry ↗](https://fungrim.org/entry/1b3014)

---

$$\exp(z+2n\pi\imaginaryI)=\exponentialE^{z}$$

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

$$\exp(\pi\imaginaryI)=-1$$

Used by the Compute Engine for simplification.
[`54aaf1` · Fungrim entry ↗](https://fungrim.org/entry/54aaf1)

---

$$\exp(a+b\imaginaryI)=\exponentialE^{a}(\cos(b)+\sin(b)\imaginaryI)$$

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

$$\exp(z+n\pi\imaginaryI)=(-1)^{n}\exponentialE^{z}$$

**Holds when** $z\in\C\land n\in\Z$.
Used by the Compute Engine for simplification.
[`97ba8d` · Fungrim entry ↗](https://fungrim.org/entry/97ba8d)

---

$$\arg(\exponentialE^{z})=\Im(z)$$

**Holds when** $z\in\C\land\Im(z)\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for expansion.
[`a0d93c` · Fungrim entry ↗](https://fungrim.org/entry/a0d93c)

---

$$\exp(\frac{\pi\imaginaryI}{2})=\imaginaryI$$

Used by the Compute Engine for simplification.
[`a90f35` · Fungrim entry ↗](https://fungrim.org/entry/a90f35)

---

$$\Re(\exponentialE^{z})=\exp(\Re(z))\cos(\Im(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`b7d62b` · Fungrim entry ↗](https://fungrim.org/entry/b7d62b)

---

$$\mathrm{sgn}(\exponentialE^{z})=\exp(\Im(z)\imaginaryI)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`caf706` · Fungrim entry ↗](https://fungrim.org/entry/caf706)

---

$$\Im(\exponentialE^{z})=\exp(\Re(z))\sin(\Im(z))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`e2fac7` · Fungrim entry ↗](https://fungrim.org/entry/e2fac7)

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

$$\varphi^{n}=\mathrm{Fibonacci}(n)\varphi+\mathrm{Fibonacci}(n-1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`6a11ce` · Fungrim entry ↗](https://fungrim.org/entry/6a11ce)

---

$$\varphi^2-\varphi-1=0$$

Used by the Compute Engine for simplification.
[`b464d3` · Fungrim entry ↗](https://fungrim.org/entry/b464d3)

---

$$\mathrm{Spectrum}(\begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix})=\lbrace\varphi, 1-\varphi\rbrace$$

Used by the Compute Engine for simplification.
[`ebfcd8` · Fungrim entry ↗](https://fungrim.org/entry/ebfcd8)

---

## Inverse tangent

$$\arctan(x)-\arctan(y)=\mathrm{Arctan_2}(x-y, 1+xy)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for expansion.
[`00e608` · Fungrim entry ↗](https://fungrim.org/entry/00e608)

---

$$\arctan(\imaginaryI z)=\imaginaryI\mathrm{artanh}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`072166` · Fungrim entry ↗](https://fungrim.org/entry/072166)

---

$$\cos(\arctan(z))=\frac{1}{\sqrt{1+z^2}}$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
Used by the Compute Engine for simplification.
[`0b829e` · Fungrim entry ↗](https://fungrim.org/entry/0b829e)

---

$$\arctan(-z)=-\arctan(z)$$

**Holds when** $z\in\C\cup\lbrace-\infty, \infty\rbrace$.
Used by the Compute Engine for expansion.
[`0ee626` · Fungrim entry ↗](https://fungrim.org/entry/0ee626)

---

$$\arctan(z)=-\frac{\imaginaryI}{2}\ln(\frac{1+\imaginaryI z}{1-\imaginaryI z})$$

**Holds when** $z\in\C\land z\imaginaryI\notin\lbrack1, \infty\rparen$.
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

$$\mathrm{Arctan_2}(y, x)=\begin{cases}0&x=y=0\\\arctan(\frac{y}{x})&x\gt0\\\frac{\pi\mathrm{sgn}(y)}{2}-\arctan(x/y)&y\ne0\\\pi&y=0\land x\lt0\end{cases}$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`22fb4a` · Fungrim entry ↗](https://fungrim.org/entry/22fb4a)

---

$$\arctan(x+y)=\arctan(x)+\arctan((y)(1+x(x+y))^{-1})$$

**Holds when** $x\in\C\land y\in\C\land\vert x+y\vert\lt1\land\vert x\vert\lt1$ &nbsp;_or_&nbsp; $x\in\R\land y\in\R\land x(x+y)\gt-1$.
Used by the Compute Engine for simplification.
[`268c9e` · Fungrim entry ↗](https://fungrim.org/entry/268c9e)

---

$$\arctan(z)=z\mathrm{Hypergeometric2F_1}(1, \frac{1}{2}, \frac{3}{2}, -z^2)$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`34ff28` · Fungrim entry ↗](https://fungrim.org/entry/34ff28)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{(-1)^{n}(n-1)!(\frac{1}{(z+\imaginaryI)^{n}}-\frac{1}{(z-\imaginaryI)^{n}})}{2\imaginaryI}$$

**Holds when** $n\in\N^*\land z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
Used by the Compute Engine for simplification.
[`36171f` · Fungrim entry ↗](https://fungrim.org/entry/36171f)

---

$$\arctan(\frac{1}{\sqrt{3}})=\frac{\pi}{6}$$

Used by the Compute Engine for simplification.
[`3c1021` · Fungrim entry ↗](https://fungrim.org/entry/3c1021)

---

$$\arctan(x)+\arctan(y)=\arctan(\frac{x+y}{1-xy})$$

**Holds when** $x\in\C\land y\in\C\land\vert x\vert\lt1\land\vert y\vert\lt1$ &nbsp;_or_&nbsp; $x\in\R\land y\in\R\land xy\lt1$.
Used by the Compute Engine for simplification.
[`3ea11b` · Fungrim entry ↗](https://fungrim.org/entry/3ea11b)

---

$$\vert\arctan(x+y)-\arctan(x)\vert=\mathrm{Arctan_2}(\vert y\vert, 1+x(x+y))$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`47331d` · Fungrim entry ↗](https://fungrim.org/entry/47331d)

---

$$\arctan(z)=\frac{1}{2}(\imaginaryI\ln(\frac{1-\imaginaryI z}{1+\imaginaryI z}))$$

**Holds when** $z\in\C\land-z\imaginaryI\notin\lbrack1, \infty\rparen$.
Used by the Compute Engine for simplification.
[`500c0a` · Fungrim entry ↗](https://fungrim.org/entry/500c0a)

---

$$\arctan(x)-\arctan(y)=\arctan(\frac{x-y}{1+xy})$$

**Holds when** $x\in\C\land y\in\C\land\vert x\vert\lt1\land\vert y\vert\lt1$ &nbsp;_or_&nbsp; $x\in\R\land y\in\R\land xy\gt-1$.
Used by the Compute Engine for simplification.
[`503d4d` · Fungrim entry ↗](https://fungrim.org/entry/503d4d)

---

$$\arctan(z^\star)=\arctan(z)^\star$$

**Holds when** $z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rparen\cup\lparen1, \infty\rparen$.
Used by the Compute Engine for expansion.
[`632063` · Fungrim entry ↗](https://fungrim.org/entry/632063)

---

$$\arctan(0)=0$$

Used by the Compute Engine for simplification.
[`645e30` · Fungrim entry ↗](https://fungrim.org/entry/645e30)

---

$$\arctan(z)=2\arctan((z)(1+\sqrt{1+z^2})^{-1})$$

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

$$\arctan(z)=\arcsin(\frac{z}{\sqrt{1+z^2}})$$

**Holds when** $z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
Used by the Compute Engine for simplification.
[`7954ad` · Fungrim entry ↗](https://fungrim.org/entry/7954ad)

---

$$\arctan(2-\sqrt{3})=\frac{\pi}{12}$$

Used by the Compute Engine for simplification.
[`7dd050` · Fungrim entry ↗](https://fungrim.org/entry/7dd050)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{1}{1+z^2}$$

**Holds when** $z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
Used by the Compute Engine for simplification.
[`8fbf69` · Fungrim entry ↗](https://fungrim.org/entry/8fbf69)

---

$$z\mapsto\arctan(z)^{\prime}(z)=\frac{(n-1)!\mathrm{ChebyshevU}(n-1, -(z/(z^2+1)^{1/2}))}{{(z^2+1)}^{\frac{n+1}{2}}}$$

**Holds when** $n\in\N^*\land z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
**Reference:** M. A. Boutiche and M. Rahmani (2017), On the higher derivatives of the inverse tangent function, [https://arxiv.org/abs/1712.03521,](https://arxiv.org/abs/1712.03521,) Theorem 9
[`90631b` · Fungrim entry ↗](https://fungrim.org/entry/90631b)

---

$$\arctan(-\imaginaryI)=-\imaginaryI\infty$$

Used by the Compute Engine for simplification.
[`9b0994` · Fungrim entry ↗](https://fungrim.org/entry/9b0994)

---

$$\mathrm{Arctan_2}(y, x)=-\imaginaryI\ln(\mathrm{sgn}(x+y\imaginaryI))$$

**Holds when** $x\in\R\land y\in\R\land x+y\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`9dec3e` · Fungrim entry ↗](https://fungrim.org/entry/9dec3e)

---

$$\arctan(z)=\frac{1}{2}(\imaginaryI(\ln(1-\imaginaryI z)-\ln(1+\imaginaryI z)))$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`a18b77` · Fungrim entry ↗](https://fungrim.org/entry/a18b77)

---

$$\arctan(\imaginaryI)=\imaginaryI\infty$$

Used by the Compute Engine for simplification.
[`a2d208` · Fungrim entry ↗](https://fungrim.org/entry/a2d208)

---

$$z\mapsto\arctan(z)^{\doubleprime}(z)=-(\frac{2z}{(1+z^2)^2})$$

**Holds when** $z\in\C\land\imaginaryI z\notin\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
Used by the Compute Engine for simplification.
[`a4eb86` · Fungrim entry ↗](https://fungrim.org/entry/a4eb86)

---

$$\mathrm{Arctan_2}(0, x)=\begin{cases}0&x\ge0\\\pi&x\lt0\end{cases}$$

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

$$\Im(\arctan(x+y\imaginaryI))=\frac{1}{4}(\ln(\frac{x^2+(1+y)^2}{x^2+(1-y)^2}))$$

**Holds when** $x\in\R\land y\in\R\land x+y\imaginaryI\notin\lbrace-\imaginaryI, \imaginaryI\rbrace$.
Used by the Compute Engine for simplification.
[`b65d19` · Fungrim entry ↗](https://fungrim.org/entry/b65d19)

---

$$\arctan(\frac{1}{z})=\frac{1}{2}(\pi\mathrm{Csgn}(1/z))-\arctan(z)$$

**Holds when** $z\in\C\land\imaginaryI z\notin\lbrace0\rbrace\cup\lparen-\infty, -1\rbrack\cup\lbrack1, \infty\rparen$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`bfc13f` · Fungrim entry ↗](https://fungrim.org/entry/bfc13f)

---

$$\arctan(z)=\mathrm{arcctg}(\frac{1}{z})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`c580f4` · Fungrim entry ↗](https://fungrim.org/entry/c580f4)

---

$$\arctan(\sqrt{2}+1)=\frac{3\pi}{8}$$

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

$$\sin(\arctan(z))=\frac{z}{\sqrt{1+z^2}}$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
Used by the Compute Engine for simplification.
[`d4b0b6` · Fungrim entry ↗](https://fungrim.org/entry/d4b0b6)

---

$$\arctan(z)=\mathrm{Csgn}(z)\arccos(\frac{1}{\sqrt{1+z^2}})$$

**Holds when** $z\in\C\setminus\lbrace-\imaginaryI, \imaginaryI\rbrace$.
**Symbols:** **Csgn** — Real-valued sign function for complex numbers.
Used by the Compute Engine for simplification.
[`ec7f2d` · Fungrim entry ↗](https://fungrim.org/entry/ec7f2d)

---

$$\mathrm{Arctan_2}(y, x)=\Im(\ln(x+y\imaginaryI))$$

**Holds when** $x\in\R\land y\in\R\land x+y\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`eca4ce` · Fungrim entry ↗](https://fungrim.org/entry/eca4ce)

---

$$\arctan(\tan(\theta))=\theta$$

**Holds when** $\theta\in\C\land-(\frac{\pi}{2})\lt\Re(\theta)\lt\frac{\pi}{2}$.
Used by the Compute Engine for simplification and equation solving.
[`f516e3` · Fungrim entry ↗](https://fungrim.org/entry/f516e3)

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

$$\operatorname{W}_{-1}(-(\frac{1}{\exponentialE}))=-1$$

Used by the Compute Engine for simplification.
[`d09380` · Fungrim entry ↗](https://fungrim.org/entry/d09380)

---

$$\mathrm{LambertWPuiseuxCoefficient}(k)=\frac{(k-1)(2\mathrm{LambertWPuiseuxCoefficient}(k-2)+\begin{cases}2&k-2=0\\-1&k-2=1\\\sum_{j=2}^{k-3}\mathrm{LambertWPuiseuxCoefficient}(j)\mathrm{LambertWPuiseuxCoefficient}(-j+k-1)&\top\end{cases})}{4(k+1)}-\frac{1}{2}(\begin{cases}2&k=0\\-1&k=1\\\sum_{j=2}^{k-1}\mathrm{LambertWPuiseuxCoefficient}(j)\mathrm{LambertWPuiseuxCoefficient}((k+1)-j)&\top\end{cases})-\frac{\mathrm{LambertWPuiseuxCoefficient}(k-1)}{k+1}$$

**Holds when** $k\in2..\infty$.
**Symbols:** **LambertWPuiseuxCoefficient** — Coefficient in scaled Puiseux expansion of Lambert W-function.
Used by the Compute Engine for simplification.
[`d37d0f` · Fungrim entry ↗](https://fungrim.org/entry/d37d0f)

---

$$\operatorname{W}(-(\frac{\pi}{2}))=\frac{\imaginaryI\pi}{2}$$

Used by the Compute Engine for simplification.
[`e1dd64` · Fungrim entry ↗](https://fungrim.org/entry/e1dd64)

---

$$\operatorname{W}_{-1}(x\exponentialE^{x})=x$$

**Holds when** $x\in\lparen-\infty, -1\rbrack$.
Used by the Compute Engine for simplification and equation solving.
[`ed7dac` · Fungrim entry ↗](https://fungrim.org/entry/ed7dac)

---

$$\operatorname{W}_{k}(0)=-\infty$$

**Holds when** $k\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`f372e9` · Fungrim entry ↗](https://fungrim.org/entry/f372e9)

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

$$\ln(-1)=\pi\imaginaryI$$

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

$$\ln(\exponentialE^{z})=z-2\pi\imaginaryI\lceil\Im(z)/(2\pi)-1/2\rceil$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`a3a253` · Fungrim entry ↗](https://fungrim.org/entry/a3a253)

---

$$\ln(\imaginaryI)=\frac{\pi\imaginaryI}{2}$$

Used by the Compute Engine for simplification.
[`c331da` · Fungrim entry ↗](https://fungrim.org/entry/c331da)

---

$$\ln(z)=\ln(\vert z\vert)+\arg(z)\imaginaryI$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`c43533` · Fungrim entry ↗](https://fungrim.org/entry/c43533)

---

$$\vert\ln(z)\vert=\sqrt{\ln(\vert z\vert)^2+\arg(z)^2}$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`dcc1e5` · Fungrim entry ↗](https://fungrim.org/entry/dcc1e5)

---

$$\ln(cz)=\ln(c)+\ln(z)$$

**Holds when** $c\in\lparen0, \infty\rparen\land z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`f67fa2` · Fungrim entry ↗](https://fungrim.org/entry/f67fa2)

---

$$\Im(\ln(z))=\arg(z)$$

**Holds when** $z\in\C\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`fbfb81` · Fungrim entry ↗](https://fungrim.org/entry/fbfb81)

---

## Pi

$$\exp(\pi\imaginaryI)+1=0$$

Used by the Compute Engine for simplification.
[`271314` · Fungrim entry ↗](https://fungrim.org/entry/271314)

---

$$\frac{1}{\pi}=\frac{1}{9}(2\sqrt{3}\mathrm{Hypergeometric2F_1}(-(1/3), \frac{1}{3}, 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`68b73d` · Fungrim entry ↗](https://fungrim.org/entry/68b73d)

---

$$\frac{1}{\pi}=\frac{1}{2}(\mathrm{Hypergeometric2F_1}(\frac{1}{2}, -(1/2), 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`a7095f` · Fungrim entry ↗](https://fungrim.org/entry/a7095f)

---

$$\frac{1}{\pi}=\frac{1}{4}(\mathrm{Hypergeometric2F_1}(-(1/2), -(1/2), 1, 1))$$

**Symbols:** **Hypergeometric2F1** — Gauss hypergeometric function.
Used by the Compute Engine for simplification.
[`c6c108` · Fungrim entry ↗](https://fungrim.org/entry/c6c108)

---

## Powers

$$(a+b\imaginaryI)^{c+d\imaginaryI}=\vert a+b\imaginaryI\vert^{c}\exp(-(d\arg(a+b\imaginaryI)))(\cos(c\arg(a+b\imaginaryI)+d\ln(\vert a+b\imaginaryI\vert))+\imaginaryI\sin(c\arg(a+b\imaginaryI)+d\ln(\vert a+b\imaginaryI\vert)))$$

**Holds when** $a\in\R\land b\in\R\land c\in\R\land d\in\R\land a+b\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`0aac97` · Fungrim entry ↗](https://fungrim.org/entry/0aac97)

---

$$\Im((a+b\imaginaryI)^{c+d\imaginaryI})=\vert a+b\imaginaryI\vert^{c}\exp(-(d\arg(a+b\imaginaryI)))\sin(c\arg(a+b\imaginaryI)+d\ln(\vert a+b\imaginaryI\vert))$$

**Holds when** $a\in\R\land b\in\R\land c\in\R\land d\in\R\land a+b\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`18873d` · Fungrim entry ↗](https://fungrim.org/entry/18873d)

---

$$(xy)^{a}=x^{a}y^{a}\exp(2\pi\imaginaryI a\lfloor\frac{\pi-\arg(x)-\arg(y)}{2\pi}\rfloor)$$

**Holds when** $x\in\C\setminus\lbrace0\rbrace\land y\in\C\setminus\lbrace0\rbrace\land a\in\C$.
Used by the Compute Engine for simplification.
[`2090c3` · Fungrim entry ↗](https://fungrim.org/entry/2090c3)

---

$$z^0=1$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`310f36` · Fungrim entry ↗](https://fungrim.org/entry/310f36)

---

$$a^{b}=\exp(b\ln(a))$$

**Holds when** $a\in\C\setminus\lbrace0\rbrace\land b\in\C$.
Used by the Compute Engine for simplification.
[`4d6416` · Fungrim entry ↗](https://fungrim.org/entry/4d6416)

---

$$z^{n+1}=z^{n}z$$

**Holds when** $z\in\C\land n\in\N$ &nbsp;_or_&nbsp; $z\in R\land R\in\mathrm{Rings}\land n\in\N$.
Used by the Compute Engine for simplification.
[`6c2b31` · Fungrim entry ↗](https://fungrim.org/entry/6c2b31)

---

$$\vert(a+b\imaginaryI)^{c+d\imaginaryI}\vert=\vert a+b\imaginaryI\vert^{c}\exp(-(d\arg(a+b\imaginaryI)))$$

**Holds when** $a\in\R\land b\in\R\land c\in\R\land d\in\R\land a+b\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`bc4d0a` · Fungrim entry ↗](https://fungrim.org/entry/bc4d0a)

---

$$\Re((a+b\imaginaryI)^{c+d\imaginaryI})=\vert a+b\imaginaryI\vert^{c}\exp(-(d\arg(a+b\imaginaryI)))\cos(c\arg(a+b\imaginaryI)+d\ln(\vert a+b\imaginaryI\vert))$$

**Holds when** $a\in\R\land b\in\R\land c\in\R\land d\in\R\land a+b\imaginaryI\ne0$.
Used by the Compute Engine for simplification.
[`caf8cf` · Fungrim entry ↗](https://fungrim.org/entry/caf8cf)

---

## Sinc function

$$\mathrm{sinc}(z)=\begin{cases}\frac{\sin(z)}{z}&z\ne0\\1&z=0\end{cases}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`01422b` · Fungrim entry ↗](https://fungrim.org/entry/01422b)

---

$$\mathrm{sinc}(z)=\frac{\operatorname{J}_{\frac{1}{2}}(z)}{\sqrt{\frac{2z}{\pi}}}$$

**Holds when** $z\in\C\land z\ne0$.
Used by the Compute Engine for simplification.
[`19d7d9` · Fungrim entry ↗](https://fungrim.org/entry/19d7d9)

---

$$z\mapsto\mathrm{sinc}(z)^{\prime}(0)=\begin{cases}\frac{(-1)^{\lfloor n/2\rfloor}}{n+1}&\mathrm{IsEven}(n)\\0&\mathrm{IsOdd}(n)\end{cases}$$

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

$$z\mapsto\mathrm{sinc}(z)^{\doubleprime}(z)=\begin{cases}(2/z^3-1/z)\sin(z)-\frac{2\cos(z)}{z^2}&z\ne0\\-(\frac{1}{3})&z=0\end{cases}$$

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

**Holds when** $z\in\C\land z\ne0$.
Used by the Compute Engine for expansion.
[`b41d08` · Fungrim entry ↗](https://fungrim.org/entry/b41d08)

---

$$zz\mapsto\mathrm{sinc}(z)^{\doubleprime}(z)+2z\mapsto\mathrm{sinc}(z)^{\prime}(z)+z\mathrm{sinc}(z)=0$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`c6e6b2` · Fungrim entry ↗](https://fungrim.org/entry/c6e6b2)

---

$$\mathrm{sinc}(\frac{\pi}{4})=\frac{2\sqrt{2}}{\pi}$$

Used by the Compute Engine for simplification.
[`c9ead2` · Fungrim entry ↗](https://fungrim.org/entry/c9ead2)

---

$$\mathrm{sinc}(2z)=\mathrm{sinc}(z)\cos(z)$$

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

**Holds when** $z\in\C\land z\ne0$.
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

$$\sin(z)=\sqrt{\frac{\pi z}{2}}\operatorname{J}_{\frac{1}{2}}(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`0fbd15` · Fungrim entry ↗](https://fungrim.org/entry/0fbd15)

---

$$\sin(z)=\frac{\exp(\imaginaryI z)-\exp(-\imaginaryI z)}{2\imaginaryI}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`18f40c` · Fungrim entry ↗](https://fungrim.org/entry/18f40c)

---

$$\sin(2z)=2\sin(z)\cos(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`1b11be` · Fungrim entry ↗](https://fungrim.org/entry/1b11be)

---

$$\sin(\pi+z)=-\sin(z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`1c22f1` · Fungrim entry ↗](https://fungrim.org/entry/1c22f1)

---

$$z\mapsto\sin(z)^{\doubleprime}(z)+\sin(z)=0$$

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

$$\sin(z+\pi k)=(-1)^{k}\sin(z)$$

**Holds when** $z\in\C\land k\in\Z$.
Used by the Compute Engine for simplification.
[`393b62` · Fungrim entry ↗](https://fungrim.org/entry/393b62)

---

$$\sin(a+b\imaginaryI)=\sin(a)\cosh(b)+\imaginaryI\cos(a)\sinh(b)$$

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

$$\sin(\frac{\pi}{2}+\pi k)=(-1)^{k}$$

**Holds when** $k\in\Z$.
Used by the Compute Engine for simplification.
[`506d0c` · Fungrim entry ↗](https://fungrim.org/entry/506d0c)

---

$$\sin(a-b)=\sin(a)\cos(b)-\cos(a)\sin(b)$$

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

$$\sin(z)^{2n}=\frac{\binom{2n}{n}}{4^{n}}+\frac{2(\sum_{k=0}^{n-1}\cos(2z(n-k))\binom{2n}{k}\times(-1)^{k+n})}{4^{n}}$$

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

$$z\mapsto\sin(z)^{\prime}(z)=\sin(z+\frac{\pi r}{2})$$

**Holds when** $z\in\C\land r\in\N$.
Used by the Compute Engine for simplification.
[`612b21` · Fungrim entry ↗](https://fungrim.org/entry/612b21)

---

$$\sin(\frac{\pi}{2})=1$$

Used by the Compute Engine for simplification.
[`69c5ef` · Fungrim entry ↗](https://fungrim.org/entry/69c5ef)

---

$$\sin(z+2\pi k)=\sin(z)$$

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

$$\sin(a+b)=\sin(a)\cos(b)+\cos(a)\sin(b)$$

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

$$\cos(z)+\imaginaryI\sin(z)=\exp(\imaginaryI z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`adbc1a` · Fungrim entry ↗](https://fungrim.org/entry/adbc1a)

---

$$\sin(\frac{\pi}{2}+z)=\cos(z)$$

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

$$\sin(z)=-\imaginaryI\sinh(\imaginaryI z)$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`cfc5c3` · Fungrim entry ↗](https://fungrim.org/entry/cfc5c3)

---

$$(\cos(z)+\imaginaryI\sin(z))^{n}=\cos(nz)+\imaginaryI\sin(nz)$$

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

$$\sin(a)-\sin(b)=2\cos(\frac{a+b}{2})\sin(\frac{a-b}{2})$$

**Holds when** $a\in\C\land b\in\C$.
Used by the Compute Engine for simplification.
[`e69cf6` · Fungrim entry ↗](https://fungrim.org/entry/e69cf6)

---

$$\sin(z)+\cos(z)=\sqrt{2}\sin(z+\frac{\pi}{4})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for expansion.
[`f183d0` · Fungrim entry ↗](https://fungrim.org/entry/f183d0)

---

$$\sin(a)^2-\cos(b)^2=-\cos(a+b)\cos(a-b)$$

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

$$\sqrt{\imaginaryI}=\frac{1+\imaginaryI}{\sqrt{2}}$$

Used by the Compute Engine for simplification.
[`0ad836` · Fungrim entry ↗](https://fungrim.org/entry/0ad836)

---

$$\sqrt{\frac{a}{b}}=\frac{\sqrt{a}}{\sqrt{b}}$$

**Holds when** $a\in\C\land b\in\lparen0, \infty\rparen$ &nbsp;_or_&nbsp; $a\in\lbrack0, \infty\rparen\land b\in\C\setminus\lparen-\infty, 0\rbrack$ &nbsp;_or_&nbsp; $a\in\C\land b\in\C\setminus\lbrace0\rbrace\land\arg(a)-\arg(b)\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification.
[`0d8e03` · Fungrim entry ↗](https://fungrim.org/entry/0d8e03)

---

$$\sqrt{r\exp(\imaginaryI\theta)}=\sqrt{r}\exp(\frac{\imaginaryI\theta}{2})$$

**Holds when** $r\in\lbrack0, \infty\rparen\land\theta\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for simplification.
[`1232f7` · Fungrim entry ↗](https://fungrim.org/entry/1232f7)

---

$$\sqrt{\frac{z}{c-z}}=\sqrt{z}\sqrt{\frac{1}{c-z}}$$

**Holds when** $z\in\R\land c\in\lbrack0, \infty\rparen\land c-z\ne0$.
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

$$\Re(\sqrt{z})=\sqrt{\frac{\vert z\vert+\Re(z)}{2}}$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`4ed6a8` · Fungrim entry ↗](https://fungrim.org/entry/4ed6a8)

---

$$\sqrt{\frac{z}{2}}=\frac{\sqrt{z}}{\sqrt{2}}$$

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

**Holds when** $z\in\C\land c\in\lbrack0, \infty\rparen\land z-c\ne0$.
Used by the Compute Engine for simplification.
[`6f63dd` · Fungrim entry ↗](https://fungrim.org/entry/6f63dd)

---

$$z\mapsto\sqrt{z}^{\prime}(z)=(-1)^{r}\mathrm{RisingFactorial}(-(\frac{1}{2}), r)z^{r-\frac{1}{2}}$$

**Holds when** $z\in\C\setminus\lparen-\infty, 0\rbrack\land r\in\N$.
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

$$\sqrt{\frac{z}{z+c}}=\frac{\sqrt{z}}{\sqrt{z+c}}$$

**Holds when** $z\in\C\land c\in\lbrack0, \infty\rparen\land z+c\ne0$.
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

$$\sqrt{\exp(\imaginaryI\theta)\infty}=\exp(\frac{\imaginaryI\theta}{2})\infty$$

**Holds when** $\theta\in\lparen-\pi, \pi\rbrack$.
Used by the Compute Engine for expansion.
[`f9f31d` · Fungrim entry ↗](https://fungrim.org/entry/f9f31d)

---
