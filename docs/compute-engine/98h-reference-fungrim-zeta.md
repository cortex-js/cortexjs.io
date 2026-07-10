---
title: Fungrim Identities — Zeta and L-functions
slug: /compute-engine/reference/fungrim-zeta/
---

# Zeta and L-functions

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **79 identities** for zeta and l-functions.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Dirichlet characters](#dirichlet-characters) (15)
- [Hurwitz zeta function](#hurwitz-zeta-function) (40)
- [Multiple zeta values](#multiple-zeta-values) (7)
- [Riemann zeta function](#riemann-zeta-function) (17)

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

$$\mathrm{DirichletCharacter}(p^{e_{var}}, \ell, n)=\exp(\frac{2\pi\imaginaryI\mathrm{DiscreteLog}(\ell, \mathrm{ConreyGenerator}(p), p^{e_{var}})\mathrm{DiscreteLog}(n, \mathrm{ConreyGenerator}(p), p^{e_{var}})}{\mathrm{Totient}(p^{e_{var}})})$$

**Holds when** $p\in\mathrm{Primes}\land p\ge3\land e_{var}\in\N^*\land\ell\in1..p^{e_{var}}-1\land n\in\Z\land\gcd(\ell, p^{e_{var}})=\gcd(n, p^{e_{var}})=1$.
**Symbols:** **ConreyGenerator** — Conrey generator; **DirichletCharacter** — Dirichlet character; **DiscreteLog** — Discrete logarithm.
Used by the Compute Engine for simplification.
[`4cf4e4` · Fungrim entry ↗](https://fungrim.org/entry/4cf4e4)

---

$$\mathrm{ConreyGenerator}(p)=\begin{cases}10&p=40\,487\\7&p=6\,692\,367\,337\\\min(\lbrace a, a\in\N^*\in\mathrm{Count}(\lbrace a^{k}\bmod p, k\in\N\rbrace)=p-1\rbrace)&\top\end{cases}$$

**Holds when** $p\in\mathrm{Primes}\land p\ge3\land p\lt10^{12}$.
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

**Holds when** $p\in\mathrm{Primes}\land p\ge3$.
**Symbols:** **ConreyGenerator** — Conrey generator.
Used by the Compute Engine for simplification.
[`75231e` · Fungrim entry ↗](https://fungrim.org/entry/75231e)

---

$$\mathrm{DirichletL}(0, \mathrm{DirichletCharacter}(q, 1))=\begin{cases}-(\frac{1}{2})&q=1\\0&\top\end{cases}$$

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

$$\mathrm{DirichletL}(1, \mathrm{DirichletCharacter}(5, 4))=\frac{2\ln(\varphi)}{\sqrt{5}}$$

**Symbols:** **DirichletCharacter** — Dirichlet character; **DirichletL** — Dirichlet L-function.
Used by the Compute Engine for simplification.
[`c9d117` · Fungrim entry ↗](https://fungrim.org/entry/c9d117)

---

$$\mathrm{DirichletL}(1, \mathrm{DirichletCharacter}(3, 2))=\frac{\pi}{\sqrt{27}}$$

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

**Holds when** $q\in\N^*\land\ell\in1..\max(q, 2)-1\land\gcd(\ell, q)=1\land n\in\Z$.
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

$$\mathrm{HurwitzZeta}(3, \frac{1}{6})=91\Zeta(3)+2\sqrt{3}\pi^3$$

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

**Holds when** $s\in\C\land s\ne1\land a\in\C\land\Re(a)\gt0$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3ba544` · Fungrim entry ↗](https://fungrim.org/entry/3ba544)

---

$$\mathrm{HurwitzZeta}(0, \frac{1}{2})=0$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3db90c` · Fungrim entry ↗](https://fungrim.org/entry/3db90c)

---

$$\mathrm{HurwitzZeta}(2, \frac{1}{4})=\pi^2+8G$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`3e82c3` · Fungrim entry ↗](https://fungrim.org/entry/3e82c3)

---

$$\mathrm{HurwitzZeta}(4, \frac{1}{2})=\frac{\pi^4}{6}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`4064f5` · Fungrim entry ↗](https://fungrim.org/entry/4064f5)

---

$$a\mapsto\mathrm{HurwitzZeta}(s, a)^{\prime}(a)=\mathrm{RisingFactorial}(1-s-r, r)\mathrm{HurwitzZeta}(s+r, a)$$

**Holds when** $s\in\C\land s\ne1\land s+r\ne1\land a\in\C\land\Re(a)\gt0\land r\in\N$.
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

**Holds when** $s\in\C\land s\ne1$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for expansion.
[`4d1f6b` · Fungrim entry ↗](https://fungrim.org/entry/4d1f6b)

---

$$\mathrm{HurwitzZeta}(3, 2)=\Zeta(3)-1$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`4dd87c` · Fungrim entry ↗](https://fungrim.org/entry/4dd87c)

---

$$\operatorname{Li}_{s}(z)=\frac{(\mathrm{HurwitzZeta}(1-s, \frac{1}{\pi}((-1/2\imaginaryI)\ln(-z))+\frac{1}{2})\imaginaryI^{1-s}+\mathrm{HurwitzZeta}(1-s, \frac{1}{\pi}((1/2\imaginaryI)\ln(-z))+\frac{1}{2})\imaginaryI^{s-1})\Gamma(1-s)}{(2\pi)^{1-s}}$$

**Holds when** $s\in\C\land z\in\C\land z\notin\lbrace0, 1\rbrace\land s\notin\N$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`52ea5f` · Fungrim entry ↗](https://fungrim.org/entry/52ea5f)

---

$$\Gamma(z)=\sqrt{2\pi}\exp(\mathrm{HurwitzZeta}(0, z, 1))$$

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

$$\mathrm{HurwitzZeta}(2, a)=\mathrm{Hypergeometric3F_2}(1, a, a, a+1, a+1, 1)/a^2$$

**Holds when** $a\in\C\setminus\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`6419ac` · Fungrim entry ↗](https://fungrim.org/entry/6419ac)

---

$$\mathrm{HurwitzZeta}(s, \frac{1}{2}+n)=(2^{s}-1)\Zeta(s)-2^{s}(\sum_{k=0}^{n-1}((2k+1)^{s})^{-1})$$

**Holds when** $s\in\C\land n\in\N$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`6c3523` · Fungrim entry ↗](https://fungrim.org/entry/6c3523)

---

$$\mathrm{HurwitzZeta}(s, n)=\Zeta(s)-(\sum_{k=1}^{n-1}\frac{1}{k^{s}})$$

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

**Holds when** $s\in\C\land s\notin\lbrace0, 1\rbrace\land a\in\C\land\Re(a)\gt0$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`83065e` · Fungrim entry ↗](https://fungrim.org/entry/83065e)

---

$$\mathrm{HurwitzZeta}(2, \frac{1}{2})=\frac{\pi^2}{2}$$

**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`868061` · Fungrim entry ↗](https://fungrim.org/entry/868061)

---

$$\mathrm{HurwitzZeta}(s, \frac{1}{4})+\mathrm{HurwitzZeta}(s, \frac{3}{4})=2^{s}(2^{s}-1)\Zeta(s)$$

**Holds when** $s\in\C\land s\ne1$.
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

**Holds when** $s\in\C\land s\ne1\land a\in\C\land\Re(a)\gt0\land r\in\N$.
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

**Holds when** $s\in\C\land a\in\C\land s\ne1\land\Re(a)\gt0$.
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

$$\mathrm{HurwitzZeta}(s, 3)=\Zeta(s)-1-\frac{1}{2^{s}}$$

**Holds when** $s\in\C$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function.
Used by the Compute Engine for simplification.
[`fc6fe0` · Fungrim entry ↗](https://fungrim.org/entry/fc6fe0)

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

$$\mathrm{MultiZetaValue}(a, b)+\mathrm{MultiZetaValue}(b, a)=\Zeta(a)\Zeta(b)-\Zeta(a+b)$$

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

$$\Zeta(-n)=\frac{(-1)^{n}\mathrm{BernoulliB}(n+1)}{n+1}$$

**Holds when** $n\in\Z\land n\ge0$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`51fd98` · Fungrim entry ↗](https://fungrim.org/entry/51fd98)

---

$$\mathrm{RiemannZetaZero}(-n)=\mathrm{RiemannZetaZero}(n)^\star$$

**Holds when** $n\in\Z\land n\ne0$.
**Symbols:** **RiemannZetaZero** — Nontrivial zero of the Riemann zeta function.
Used by the Compute Engine for simplification.
[`60c2ec` · Fungrim entry ↗](https://fungrim.org/entry/60c2ec)

---

$$\mathrm{HurwitzZeta}(s, a)=\frac{1}{s-1}+\sum_{n=0}^{\infty}\frac{1}{n!}(\mathrm{StieltjesGamma}(n, a)\times(-1)^{n}(s-1)^{n})$$

**Holds when** $s\in\C\land a\in\C\land a\notin\Z_{\le0}$.
**Symbols:** **HurwitzZeta** — Hurwitz zeta function; **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`60c6da` · Fungrim entry ↗](https://fungrim.org/entry/60c6da)

---

$$\mathrm{StieltjesGamma}(n, a+1)=\mathrm{StieltjesGamma}(n, a)-\frac{\ln(a)^{n}}{a}$$

**Holds when** $n\in\N\land a\in\C\land a\notin\Z_{\le0}$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`687b4d` · Fungrim entry ↗](https://fungrim.org/entry/687b4d)

---

$$\Zeta(s^\star)=\Zeta(s)^\star$$

**Holds when** $s\in\C\land s\ne1$.
Used by the Compute Engine for expansion.
[`69348a` · Fungrim entry ↗](https://fungrim.org/entry/69348a)

---

$$\mathrm{StieltjesGamma}(1, \frac{1}{2})=\mathrm{StieltjesGamma}(1)-2\gamma\ln(2)-\ln(2)^2$$

**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`70a705` · Fungrim entry ↗](https://fungrim.org/entry/70a705)

---

$$\Zeta(2n)=\frac{(-1)^{n+1}\mathrm{BernoulliB}(2n)(2\pi)^{2n}}{2(2n)!}$$

**Holds when** $n\in\Z\land n\ge1$.
**Symbols:** **BernoulliB** — Bernoulli number.
Used by the Compute Engine for simplification.
[`72ccda` · Fungrim entry ↗](https://fungrim.org/entry/72ccda)

---

$$\Zeta(s)=(\sum_{k=1}^{N_{var}-1}\frac{1}{k^{s}}+\frac{N_{var}^{1-s}}{s-1}+\frac{\sum_{k=1}^{M}(\mathrm{RisingFactorial}(s, 2k-1)\mathrm{BernoulliB}(2k))/((2k)!N_{var}^{2k-1})+\frac{1}{2}}{N_{var}^{s}})-\int_{N_{var}}^{\infty}\!\frac{\mathrm{RisingFactorial}(s, 2M)\mathrm{BernoulliPolynomial}(2M, t-\lfloor t\rfloor)}{(2M)!t^{2M+s}}\, \mathrm{d}t$$

**Holds when** $s\in\C\land s\ne1\land N_{var}\in\Z\land M\in\Z\land\Re((s+2M)-1)\gt0\land N_{var}\ge1\land M\ge1$.
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

$$\Zeta(s)=\frac{1}{s-1}+\sum_{n=0}^{\infty}\frac{1}{n!}(\mathrm{StieltjesGamma}(n)\times(-1)^{n}(s-1)^{n})$$

**Holds when** $s\in\C$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`b1a2e1` · Fungrim entry ↗](https://fungrim.org/entry/b1a2e1)

---

$$\mathrm{StieltjesGamma}(0, a)=-\mathrm{Digamma}(a)$$

**Holds when** $a\in\C\land a\notin\Z_{\le0}$.
**Symbols:** **StieltjesGamma** — Stieltjes constant.
Used by the Compute Engine for simplification.
[`b6808d` · Fungrim entry ↗](https://fungrim.org/entry/b6808d)

---

$$\mathrm{KeiperLiLambda}(1)=(\frac{\gamma}{2}+1)-\frac{\ln(4\pi)}{2}$$

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
