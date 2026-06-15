---
title: Fungrim Identities — Bessel and hypergeometric functions
slug: /compute-engine/reference/fungrim-bessel-hypergeometric/
---

# Bessel and hypergeometric functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **115 identities** for bessel and hypergeometric functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Airy functions](#airy-functions) (9)
- [Bessel functions](#bessel-functions) (57)
- [Confluent hypergeometric functions](#confluent-hypergeometric-functions) (11)
- [Coulomb wave functions](#coulomb-wave-functions) (10)
- [Error functions](#error-functions) (12)
- [Gauss hypergeometric function](#gauss-hypergeometric-function) (16)

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
