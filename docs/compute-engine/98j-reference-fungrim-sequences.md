---
title: Fungrim Identities — Combinatorial and integer sequences
slug: /compute-engine/reference/fungrim-sequences/
---

# Combinatorial and integer sequences

Part of the [Fungrim Identities](/compute-engine/reference/fungrim/) reference — **65 identities** for combinatorial and integer sequences.

:::info[Generated reference]
This page is generated from the compiled Fungrim artifact by `scripts/fungrim/gen-reference-doc.ts` (upstream snapshot `3a299164c683`, translator `grim2mathjson 0.1.0`). Do not edit it by hand. The corpus is MIT-licensed; see `data/fungrim/LICENSE`.
:::

## Contents

- [Bell numbers](#bell-numbers) (1)
- [Bernoulli numbers and polynomials](#bernoulli-numbers-and-polynomials) (9)
- [Fibonacci numbers](#fibonacci-numbers) (37)
- [Integer sequences](#integer-sequences) (8)
- [Partition function](#partition-function) (6)
- [Stirling numbers](#stirling-numbers) (4)

## Bell numbers

$$\mathrm{BellNumber}(n)=\frac{2\Im(\int_{0}^{\pi}\!\sin(nx)\exp(\exp(\exp(\imaginaryI x)))\, \mathrm{d}x)n!}{\exponentialE\pi}$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
**Reference:** [arxiv.org](https://arxiv.org/abs/0708.3301)
[`f4e249` · Fungrim entry ↗](https://fungrim.org/entry/f4e249)

---

## Bernoulli numbers and polynomials

$$\mathrm{BernoulliPolynomial}(n, \frac{1}{2})=(2^{1-n}-1)\mathrm{BernoulliB}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`03ee0b` · Fungrim entry ↗](https://fungrim.org/entry/03ee0b)

---

$$\mathrm{BernoulliB}(2n)=\frac{2\Zeta(2n)(2n)!\times(-1)^{n+1}}{(2\pi)^{2n}}$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`14ecc4` · Fungrim entry ↗](https://fungrim.org/entry/14ecc4)

---

$$\mathrm{BernoulliPolynomial}(n, 1)=(-1)^{n}\mathrm{BernoulliB}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`829185` · Fungrim entry ↗](https://fungrim.org/entry/829185)

---

$$\mathrm{BernoulliPolynomial}(n, x+1)=\mathrm{BernoulliPolynomial}(n, x)+nx^{n-1}$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`8b4f7f` · Fungrim entry ↗](https://fungrim.org/entry/8b4f7f)

---

$$\mathrm{BernoulliPolynomial}(n, 0)=\mathrm{BernoulliB}(n)$$

**Holds when** $n\in\N$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for expansion.
[`a1d2d7` · Fungrim entry ↗](https://fungrim.org/entry/a1d2d7)

---

$$\mathrm{BernoulliB}(2n+3)=0$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`a98234` · Fungrim entry ↗](https://fungrim.org/entry/a98234)

---

$$\mathrm{BernoulliPolynomial}(n, 1-x)=(-1)^{n}\mathrm{BernoulliPolynomial}(n, x)$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for expansion.
[`c2dcfa` · Fungrim entry ↗](https://fungrim.org/entry/c2dcfa)

---

$$x\mapsto\mathrm{BernoulliPolynomial}(n, x)^{\prime}(x)=n\mathrm{BernoulliPolynomial}(n-1, x)$$

**Holds when** $n\in\N^*\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`e89eb5` · Fungrim entry ↗](https://fungrim.org/entry/e89eb5)

---

$$\mathrm{BernoulliPolynomial}(n, -x)=(-1)^{n}(\mathrm{BernoulliPolynomial}(n, x)+nx^{n-1})$$

**Holds when** $n\in\N\land x\in\C$.
**Symbols:** **BernoulliPolynomial** — Bernoulli polynomial.
Used by the Compute Engine for simplification.
[`f80439` · Fungrim entry ↗](https://fungrim.org/entry/f80439)

---

## Fibonacci numbers

$$\mathrm{Fibonacci}(n)=\lfloor\frac{\varphi^{n}}{\sqrt{5}}+\frac{1}{2}\rfloor$$

**Holds when** $n\in\N$.
Used by the Compute Engine for simplification.
[`050fdb` · Fungrim entry ↗](https://fungrim.org/entry/050fdb)

---

$$\mathrm{Fibonacci}(n)^2=\mathrm{Fibonacci}(n+1)\mathrm{Fibonacci}(n-1)-(-1)^{n}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`073466` · Fungrim entry ↗](https://fungrim.org/entry/073466)

---

$$\begin{pmatrix}\mathrm{Fibonacci}(n+1)\\ \mathrm{Fibonacci}(n)\end{pmatrix}=\begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix}\begin{pmatrix}\mathrm{Fibonacci}(n)\\ \mathrm{Fibonacci}(n-1)\end{pmatrix}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`0e2425` · Fungrim entry ↗](https://fungrim.org/entry/0e2425)

---

$$\mathrm{Fibonacci}(n+2)=\mathrm{Fibonacci}(n+1)+\mathrm{Fibonacci}(n)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`10165f` · Fungrim entry ↗](https://fungrim.org/entry/10165f)

---

$$\mathrm{Fibonacci}(n)=(\exp(n\ln(\varphi))-\cos(\pi n)\exp(-n\ln(\varphi)))/\sqrt{5}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`12b336` · Fungrim entry ↗](https://fungrim.org/entry/12b336)

---

$$\mathrm{Fibonacci}(n)=\frac{n\mathrm{Hypergeometric2F_1}(\frac{1-n}{2}, \frac{2-n}{2}, \frac{3}{2}, 5)}{2^{n-1}}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
**Reference:** [functions.wolfram.com](http://functions.wolfram.com/IntegerFunctions/Fibonacci/26/01/01/0007/)
[`1c90fb` · Fungrim entry ↗](https://fungrim.org/entry/1c90fb)

---

$$\mathrm{Fibonacci}(2n+1)=(2\mathrm{ChebyshevT}(2n+1, \frac{5^{1/2}}{2}))/\sqrt{5}$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevT** — Chebyshev polynomial of the first kind.
Used by the Compute Engine for simplification.
[`223ce1` · Fungrim entry ↗](https://fungrim.org/entry/223ce1)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(n-1)+\mathrm{Fibonacci}(n-2)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`22dc6e` · Fungrim entry ↗](https://fungrim.org/entry/22dc6e)

---

$$\mathrm{Fibonacci}(n)=(\varphi^{n}-(-\varphi)^{-n})/\sqrt{5}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`24107d` · Fungrim entry ↗](https://fungrim.org/entry/24107d)

---

$$\mathrm{Fibonacci}(2n)=(\mathrm{Fibonacci}(n+1)+\mathrm{Fibonacci}(n-1))\mathrm{Fibonacci}(n)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`2ca869` · Fungrim entry ↗](https://fungrim.org/entry/2ca869)

---

$$\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n+1)-\mathrm{Fibonacci}(m+1)\mathrm{Fibonacci}(n)=(-1)^{n}\mathrm{Fibonacci}(m-n)$$

**Holds when** $n\in\Z\land m\in\Z$.
Used by the Compute Engine for simplification.
[`301081` · Fungrim entry ↗](https://fungrim.org/entry/301081)

---

$$\mathrm{Fibonacci}(2n)=\mathrm{Fibonacci}(n+1)^2-\mathrm{Fibonacci}(n-1)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`35956b` · Fungrim entry ↗](https://fungrim.org/entry/35956b)

---

$$\begin{pmatrix}\mathrm{Fibonacci}(n+m)\\ \mathrm{Fibonacci}((n+m)-1)\end{pmatrix}=\begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix}^{m}\begin{pmatrix}\mathrm{Fibonacci}(n)\\ \mathrm{Fibonacci}(n-1)\end{pmatrix}$$

**Holds when** $n\in\Z\land m\in\Z$.
Used by the Compute Engine for expansion.
[`3a9c67` · Fungrim entry ↗](https://fungrim.org/entry/3a9c67)

---

$$\mathrm{Count}(\mathrm{Filter}(\Z, k\mapsto n\mid\mathrm{Fibonacci}(k)))=\mathrm{Count}(\Z)$$

**Holds when** $n\in\Z\setminus\lbrace0\rbrace$.
Used by the Compute Engine for simplification.
[`4ec333` · Fungrim entry ↗](https://fungrim.org/entry/4ec333)

---

$$\mathrm{Fibonacci}(2n)=\mathrm{Fibonacci}(n+2)^2-\mathrm{Fibonacci}(n+1)^2-2\mathrm{Fibonacci}(n)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`5745bd` · Fungrim entry ↗](https://fungrim.org/entry/5745bd)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(m+1)\mathrm{Fibonacci}(n-m)+\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n-m-1)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`5cb57e` · Fungrim entry ↗](https://fungrim.org/entry/5cb57e)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Fibonacci}(n+2)-\mathrm{Fibonacci}(n+1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`6d437c` · Fungrim entry ↗](https://fungrim.org/entry/6d437c)

---

$$\mathrm{Fibonacci}((m+n)-1)=\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(m-1)\mathrm{Fibonacci}(n-1)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`70878b` · Fungrim entry ↗](https://fungrim.org/entry/70878b)

---

$$\gcd(\mathrm{Fibonacci}(n), \mathrm{Fibonacci}(n+1))=1$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`7b0abf` · Fungrim entry ↗](https://fungrim.org/entry/7b0abf)

---

$$\mathrm{Fibonacci}(n)=2\mathrm{Fibonacci}(n-2)+\mathrm{Fibonacci}(n-3)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`7ef2c7` · Fungrim entry ↗](https://fungrim.org/entry/7ef2c7)

---

$$\begin{pmatrix}1 & 1\\ 1 & 0\end{pmatrix}^{n}=\begin{pmatrix}\mathrm{Fibonacci}(n+1) & \mathrm{Fibonacci}(n)\\ \mathrm{Fibonacci}(n) & \mathrm{Fibonacci}(n-1)\end{pmatrix}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`8a548e` · Fungrim entry ↗](https://fungrim.org/entry/8a548e)

---

$$\mathrm{Fibonacci}(n+i_{var})\mathrm{Fibonacci}(n+j)-\mathrm{Fibonacci}(n)\mathrm{Fibonacci}(n+i_{var}+j)=(-1)^{n}\mathrm{Fibonacci}(i_{var})\mathrm{Fibonacci}(j)$$

**Holds when** $n\in\Z\land i_{var}\in\Z\land j\in\Z$.
Used by the Compute Engine for simplification.
[`8db61e` · Fungrim entry ↗](https://fungrim.org/entry/8db61e)

---

$$\mathrm{Fibonacci}(n)=\mathrm{Hypergeometric2F_1}(\frac{1-n}{2}, \frac{2-n}{2}, 1-n, -4)$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`90c290` · Fungrim entry ↗](https://fungrim.org/entry/90c290)

---

$$\mathrm{Map}(\mathrm{Filter}(\N, n\mapsto\mathrm{Fibonacci}(n)^{1/2}\in\Z), n\mapsto\mathrm{Fibonacci}(n))=\lbrace\mathrm{Fibonacci}(0), \mathrm{Fibonacci}(1), \mathrm{Fibonacci}(2), \mathrm{Fibonacci}(12)\rbrace=\lbrace0, 1, 144\rbrace$$

Used by the Compute Engine for simplification.
[`9d26d2` · Fungrim entry ↗](https://fungrim.org/entry/9d26d2)

---

$$\mathrm{Fibonacci}(m+n)=\mathrm{Fibonacci}(m)\mathrm{Fibonacci}(n+1)+\mathrm{Fibonacci}(m-1)\mathrm{Fibonacci}(n)$$

**Holds when** $m\in\Z\land n\in\Z$.
Used by the Compute Engine for simplification.
[`a104b0` · Fungrim entry ↗](https://fungrim.org/entry/a104b0)

---

$$\mathrm{Fibonacci}(n+1)=\mathrm{Fibonacci}(n)+\mathrm{Fibonacci}(n-1)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`a8f2ac` · Fungrim entry ↗](https://fungrim.org/entry/a8f2ac)

---

$$\gcd(\mathrm{Fibonacci}(n), \mathrm{Fibonacci}(n+2))=1$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`aaa244` · Fungrim entry ↗](https://fungrim.org/entry/aaa244)

---

$$\mathrm{Fibonacci}(2n)=\mathrm{ChebyshevU}(n-1, \frac{3}{2})$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`aadf90` · Fungrim entry ↗](https://fungrim.org/entry/aadf90)

---

$$\mathrm{Fibonacci}(n)^2=\mathrm{Fibonacci}(n+m)\mathrm{Fibonacci}(n-m)+(-1)^{n+m}\mathrm{Fibonacci}(m)^2$$

**Holds when** $n\in\Z\land m\in\Z$.
Used by the Compute Engine for simplification.
[`ab563e` · Fungrim entry ↗](https://fungrim.org/entry/ab563e)

---

$$\mathrm{Fibonacci}(n)=(\varphi^{n}-\frac{\cos(\pi n)}{\varphi^{n}})/\sqrt{5}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`ad0d7a` · Fungrim entry ↗](https://fungrim.org/entry/ad0d7a)

---

$$\mathrm{Fibonacci}(n)=\imaginaryI^{n-1}\mathrm{ChebyshevU}(n-1, -(\frac{\imaginaryI}{2}))$$

**Holds when** $n\in\Z$.
**Symbols:** **ChebyshevU** — Chebyshev polynomial of the second kind.
Used by the Compute Engine for simplification.
[`ae76a3` · Fungrim entry ↗](https://fungrim.org/entry/ae76a3)

---

$$\mathrm{Fibonacci}(n)=((1+\cos(\pi n))\sinh(n\ln(\varphi))+(1-\cos(\pi n))\cosh(n\ln(\varphi)))/\sqrt{5}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`bceed4` · Fungrim entry ↗](https://fungrim.org/entry/bceed4)

---

$$\mathrm{Fibonacci}(n)=(2(-\imaginaryI)^{n})/\sqrt{5}\sinh(n(\ln(\varphi)+\frac{\pi}{2}\imaginaryI))$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`c4d78a` · Fungrim entry ↗](https://fungrim.org/entry/c4d78a)

---

$$\mathrm{Fibonacci}(n)=3\mathrm{Fibonacci}(n-3)+2\mathrm{Fibonacci}(n-4)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`cbfe21` · Fungrim entry ↗](https://fungrim.org/entry/cbfe21)

---

$$\mathrm{Fibonacci}(-n)=(-1)^{n+1}\mathrm{Fibonacci}(n)$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`ce6dd0` · Fungrim entry ↗](https://fungrim.org/entry/ce6dd0)

---

$$\mathrm{Fibonacci}(2n+1)=\mathrm{Fibonacci}(n+1)^2+\mathrm{Fibonacci}(n)^2$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`fc4fd1` · Fungrim entry ↗](https://fungrim.org/entry/fc4fd1)

---

$$\mathrm{Fibonacci}(n)=(2\begin{cases}\sinh(n\ln(\varphi))&\mathrm{IsEven}(n)\\\cosh(n\ln(\varphi))&\mathrm{IsOdd}(n)\end{cases})/\sqrt{5}$$

**Holds when** $n\in\Z$.
Used by the Compute Engine for simplification.
[`fd732d` · Fungrim entry ↗](https://fungrim.org/entry/fd732d)

---

## Integer sequences

$$\mathrm{Fibonacci}(n)=\mathrm{SloaneA}(\text{A000045}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`373aa1` · Fungrim entry ↗](https://fungrim.org/entry/373aa1)

---

$$\mathrm{PrimePi}(n)=\mathrm{SloaneA}(\text{A000720}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`4fa169` · Fungrim entry ↗](https://fungrim.org/entry/4fa169)

---

$$\mathrm{BellNumber}(n)=\mathrm{SloaneA}(\text{A000110}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`60dc3e` · Fungrim entry ↗](https://fungrim.org/entry/60dc3e)

---

$$\mathrm{LandauG}(n)=\mathrm{SloaneA}(\text{A000793}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **LandauG** — Landau's function; **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`6af603` · Fungrim entry ↗](https://fungrim.org/entry/6af603)

---

$$\mathrm{NPartition}(n)=\mathrm{SloaneA}(\text{A000041}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`8eed2c` · Fungrim entry ↗](https://fungrim.org/entry/8eed2c)

---

$$\mathrm{PrimeNumber}(n)=\mathrm{SloaneA}(\text{A000040}, n)$$

**Holds when** $n\in\N^*$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`9d0839` · Fungrim entry ↗](https://fungrim.org/entry/9d0839)

---

$$\mathrm{BernoulliB}(n)=\frac{\mathrm{SloaneA}(\text{A027641}, n)}{\mathrm{SloaneA}(\text{A027642}, n)}$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`b6111c` · Fungrim entry ↗](https://fungrim.org/entry/b6111c)

---

$$n!=\mathrm{SloaneA}(\text{A000142}, n)$$

**Holds when** $n\in\N$.
**Symbols:** **SloaneA** — Sequence X in Sloane's OEIS.
Used by the Compute Engine for simplification.
[`d12aa0` · Fungrim entry ↗](https://fungrim.org/entry/d12aa0)

---

## Partition function

$$\mathrm{NPartition}(4)=\mathrm{Count}(\lbrace\bigl\lbrack4\bigr\rbrack, \bigl\lbrack3, 1\bigr\rbrack, \bigl\lbrack2, 2\bigr\rbrack, \bigl\lbrack2, 1, 1\bigr\rbrack, \bigl\lbrack1, 1, 1, 1\bigr\rbrack\rbrace)=5$$

Used by the Compute Engine for simplification.
[`6018a4` · Fungrim entry ↗](https://fungrim.org/entry/6018a4)

---

$$\mathrm{NPartition}(3)=\mathrm{Count}(\lbrace\bigl\lbrack3\bigr\rbrack, \bigl\lbrack2, 1\bigr\rbrack, \bigl\lbrack1, 1, 1\bigr\rbrack\rbrace)=3$$

Used by the Compute Engine for simplification.
[`7ef291` · Fungrim entry ↗](https://fungrim.org/entry/7ef291)

---

$$\mathrm{NPartition}(2)=\mathrm{Count}(\lbrace\bigl\lbrack2\bigr\rbrack, \bigl\lbrack1, 1\bigr\rbrack\rbrace)=2$$

Used by the Compute Engine for simplification.
[`b2583f` · Fungrim entry ↗](https://fungrim.org/entry/b2583f)

---

$$\mathrm{NPartition}(-n)=0$$

**Holds when** $n\in\N^*$.
Used by the Compute Engine for simplification.
[`cd3013` · Fungrim entry ↗](https://fungrim.org/entry/cd3013)

---

$$\mathrm{NPartition}(0)=\mathrm{Count}(\lbrace\bigl\lbrack \bigr\rbrack\rbrace)=1$$

Used by the Compute Engine for simplification.
[`cebe1b` · Fungrim entry ↗](https://fungrim.org/entry/cebe1b)

---

$$\mathrm{NPartition}(1)=\mathrm{Count}(\lbrace\bigl\lbrack1\bigr\rbrack\rbrace)=1$$

Used by the Compute Engine for simplification.
[`e84642` · Fungrim entry ↗](https://fungrim.org/entry/e84642)

---

## Stirling numbers

$$\mathrm{StirlingS_1}(n, k)=(-1)^{n+k}\mathrm{StirlingCycle}(n, k)$$

**Holds when** $n\in\N\land k\in\N$.
**Symbols:** **StirlingCycle** — Unsigned Stirling number of the first kind; **StirlingS1** — Signed Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`071a94` · Fungrim entry ↗](https://fungrim.org/entry/071a94)

---

$$\mathrm{StirlingS_1}(n+1, k)=\mathrm{StirlingS_1}(n, k-1)-n\mathrm{StirlingS_1}(n, k)$$

**Holds when** $n\in\N\land k\in\N^*$.
**Symbols:** **StirlingS1** — Signed Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`18ec99` · Fungrim entry ↗](https://fungrim.org/entry/18ec99)

---

$$\mathrm{Stirling}(n+1, k)=k\mathrm{Stirling}(n, k)+\mathrm{Stirling}(n, k-1)$$

**Holds when** $n\in\N\land k\in\N^*$.
Used by the Compute Engine for simplification.
[`9fbe4f` · Fungrim entry ↗](https://fungrim.org/entry/9fbe4f)

---

$$\mathrm{StirlingCycle}(n+1, k)=n\mathrm{StirlingCycle}(n, k)+\mathrm{StirlingCycle}(n, k-1)$$

**Holds when** $n\in\N\land k\in\N^*$.
**Symbols:** **StirlingCycle** — Unsigned Stirling number of the first kind.
Used by the Compute Engine for simplification.
[`f0d72c` · Fungrim entry ↗](https://fungrim.org/entry/f0d72c)

---
