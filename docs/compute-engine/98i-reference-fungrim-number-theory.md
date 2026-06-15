---
title: Fungrim Identities — Number theory
slug: /compute-engine/reference/fungrim-number-theory/
---

# Number theory

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **67 identities** for number theory.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `953c2afd2822`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Greatest common divisor](#greatest-common-divisor) (56)
- [Prime numbers](#prime-numbers) (1)
- [Totient function](#totient-function) (10)

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

## Prime numbers

$$\mathrm{PrimePi}(x)=\mathrm{Count}(\lbrace p, p\in\mathrm{Primes}\in p\le x\rbrace)$$

**Holds when** $x\in\R$.
**Symbols:** **PrimePi** — Prime counting function.
Used by the Compute Engine for simplification.
[`04427b` · Fungrim entry ↗](https://fungrim.org/entry/04427b)

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
