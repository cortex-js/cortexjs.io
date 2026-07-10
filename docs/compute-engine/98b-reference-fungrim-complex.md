---
title: Fungrim Identities — Complex numbers
slug: /compute-engine/reference/fungrim-complex/
---

# Complex numbers

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **40 identities** for complex numbers.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Complex parts](#complex-parts) (21)
- [Complex plane](#complex-plane) (3)
- [Imaginary unit](#imaginary-unit) (16)

## Complex parts

$$\arg(-\imaginaryI)=-(\frac{\pi}{2})$$

Used by the Compute Engine for simplification.
[`089f85` · Fungrim entry ↗](https://fungrim.org/entry/089f85)

---

$$\mathrm{sgn}(x)=\begin{cases}1&x\gt0\\-1&x\lt0\\0&x=0\end{cases}$$

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

$$\vert x+y\imaginaryI\vert=\sqrt{x^2+y^2}$$

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

$$\Re(x+y\imaginaryI)=x$$

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

$$(x+y\imaginaryI)^\star=x-y\imaginaryI$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`acda23` · Fungrim entry ↗](https://fungrim.org/entry/acda23)

---

$$\arg(x+y\imaginaryI)=\mathrm{Arctan_2}(y, x)$$

**Holds when** $x\in\R\land y\in\R$.
Used by the Compute Engine for simplification.
[`b2a880` · Fungrim entry ↗](https://fungrim.org/entry/b2a880)

---

$$\Im(x+y\imaginaryI)=y$$

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

**Holds when** $\rho\in\R\land\rho\gt1$.
Used by the Compute Engine for simplification.
[`40baa9` · Fungrim entry ↗](https://fungrim.org/entry/40baa9)

---

$$\mathrm{OpenDisk}(z, r)=\lbrace t, t\in\C\in\vert z-t\vert\lt r\rbrace$$

**Holds when** $z\in\C\land r\in\R\land r\gt0$.
Used by the Compute Engine for simplification.
[`c98bad` · Fungrim entry ↗](https://fungrim.org/entry/c98bad)

---

$$\mathrm{ClosedDisk}(z, r)=\lbrace t, t\in\C\in(\vert z-t\vert\le r)\rbrace$$

**Holds when** $z\in\C\land r\in\R\land r\ge0$.
Used by the Compute Engine for simplification.
[`d1cf0c` · Fungrim entry ↗](https://fungrim.org/entry/d1cf0c)

---

## Imaginary unit

$$\mathrm{sgn}(\imaginaryI)=\imaginaryI$$

Used by the Compute Engine for simplification.
[`09c107` · Fungrim entry ↗](https://fungrim.org/entry/09c107)

---

$$\imaginaryI^{z}=\cos(\frac{\pi z}{2})+\sin(\frac{\pi z}{2})\imaginaryI$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`15f92d` · Fungrim entry ↗](https://fungrim.org/entry/15f92d)

---

$$\operatorname{Li}_{2}(\imaginaryI)=G\imaginaryI-\frac{\pi^2}{48}$$

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

$$\Im(\mathrm{Digamma}(\imaginaryI))=\frac{1}{2}(\pi\coth(\pi)+1)$$

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

$$\imaginaryI^{z}=\exp(\frac{\pi\imaginaryI z}{2})$$

**Holds when** $z\in\C$.
Used by the Compute Engine for simplification.
[`f8a56f` · Fungrim entry ↗](https://fungrim.org/entry/f8a56f)

---
