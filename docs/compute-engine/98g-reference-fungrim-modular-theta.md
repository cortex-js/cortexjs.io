---
title: Fungrim Identities — Modular forms and theta functions
slug: /compute-engine/reference/fungrim-modular-theta/
---

# Modular forms and theta functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **311 identities** for modular forms and theta functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Dedekind eta function](#dedekind-eta-function) (23)
- [Illustrations of Eisenstein series](#illustrations-of-eisenstein-series) (41)
- [Jacobi theta functions](#jacobi-theta-functions) (204)
- [Modular j-invariant](#modular-j-invariant) (19)
- [Modular lambda function](#modular-lambda-function) (24)

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
