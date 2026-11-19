---
title: Number theory Reference
sidebar_label: Number theory
slug: /reference/number-theory/
description: "The number theory library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from number-theory.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Number theory

The 62 definitions of the number theory library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Finite arguments

The functions of this library give finite results: there is no meaningful
$φ(\infty)$ or $\sqrt{\mathrm{NaN}}$ to return. The parameter types of their
signatures say so. `integer` and `real` denote finite values, so `+oo`, `-oo`
and `NaN` are not members of either. Where a signature declares one of them,
a non-finite argument is a type error, not a symbolic or an infinite result:

```epsil
nthPrime(+oo)
// ➔ error: Type error: expected `integer`, got `+oo` at `positiveInfinity` in `nthPrime(Infinity)`
integerSqrt(NaN)
// ➔ error: Type error: expected `integer`, got `NaN` at ``NaN`` in `integerSqrt(NaN)`
```

This is the check that rejects a non-integer, and it reports the same error.
The argument has to be a member of the declared type before the function is
applied.

```epsil
integerSqrt(2.5)
// ➔ error: Type error: expected `integer`, got `2.5` at `2.5` in `integerSqrt(2.5)`
```

## Congruences

A congruence `a ≡ b (mod n)` is written `congruent(a, b, n)` (see
[`congruent`](/reference/relop/#congruent)). It is `True` when `a` and `b`
leave the same remainder modulo `n`. Like `divides`, it stays symbolic until
its three operands are integers.

```epsil
congruent(7, 1, 3)
// ➔ true
congruent(x, 1, 3)
// ➔ Congruent(x, 1, 3)
```

The remainder itself is `a % n`, the `Mod` function. In LaTeX, `\bmod` is
the operator (`a \bmod n` is `Mod(a, n)`), and `\pmod{n}` is the annotation
of a congruence: `a \equiv b \pmod{n}` is `Congruent(a, b, n)`.

### Reduction of large integers

`%` and `congruent` reduce an integer expression in ℤ/mℤ without computing
its value, which can have millions of digits. Powers, sums, products,
negations and factorials are reduced this way:

```epsil
2^(3^20) % 100
// ➔ 52
congruent(2^(3^20), 52, 100)
// ➔ true
2 * 3^5000000 % 7
// ➔ 4
50! % 101
// ➔ 91
```

The result keeps the sign convention of `%`: it has the sign of the divisor.

```epsil
[2^(3^20) % 7, 2^(3^20) % -7]
// ➔ [1,-6]
```

### Solving congruences

`solve` of a linear congruence returns the family of its solutions, with
`ArbitraryInteger(1)` for an arbitrary integer. A congruence with no solution
gives the empty list, and a congruence whose coefficients share a factor with
the modulus is reduced:

```epsil
solve(congruent(6n, 4, 7), n)
// ➔ [3 + 7ArbitraryInteger(1)]
solve(congruent(2x, 1, 4), x)
// ➔ []
solve(congruent(4x, 2, 6), x)
// ➔ [2 + 3ArbitraryInteger(1)]
```

A system of congruences in one unknown, joined with `&&`, is combined into
one family by the Chinese remainder theorem, also when the moduli are not
coprime. A system with no solution gives the empty list.

```epsil
solve(congruent(x, 2, 3) && congruent(x, 3, 5) && congruent(x, 2, 7), x)
// ➔ [23 + 105ArbitraryInteger(1)]
```

To compute the solution from a list of residues and a list of moduli, use
[`chineseRemainder`](/reference/number-theory/#chineseremainder).

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### bernoulliB

`(integer) -> rational`

Return the nth Bernoulli number Bₙ as an exact rational, using the convention B₁ = -1/2. Odd `n > 1` give 0.

```epsil
bernoulliB(2)
// ➔ 1/6
```

```epsil
[bernoulliB(0), bernoulliB(1), bernoulliB(3), bernoulliB(12)]
// ➔ [1,-1/2,0,-691/2730]
```

See also: [Bernoulli number](https://en.wikipedia.org/wiki/Bernoulli_number).

<MathJson name="BernoulliB">

`["BernoulliB", n]`.

```json example
["BernoulliB", 12]
// ➔ -691/2730
```

</MathJson>

### carmichaelLambda

`(integer) -> integer`

Return the Carmichael function λ(n) (the reduced totient): the smallest positive integer `m` such that `a^m ≡ 1 (mod n)` for every `a` coprime to `n`. Defined for `n ≥ 1`.

```epsil
carmichaelLambda(15)
// ➔ 4
```

λ(n) divides φ(n), and can be smaller:

```epsil
[carmichaelLambda(8), totient(8)]
// ➔ [2,4]
carmichaelLambda(1)
// ➔ 1
```

See also: [Carmichael function](https://en.wikipedia.org/wiki/Carmichael_function).

<MathJson name="CarmichaelLambda">

`["CarmichaelLambda", n]`.

```json example
["CarmichaelLambda", 15]
// ➔ 4
```

</MathJson>

### catalanNumber

`(real) -> number`

Return the nth Catalan number `C(n) = (2n)! / ((n+1)! · n!)`: 1, 1, 2, 5, 14, 42, … Defined for `n ≥ 0`. A positive rational `n` is taken through the Gamma function, `C(n) = Γ(2n+1) / (Γ(n+1) Γ(n+2))`: `CatalanNumber(1/2)` is `8/(3π)`.

```epsil
catalanNumber(5)
// ➔ 42
```

```epsil
catalanNumber(1/2)
// ➔ 8 / (3pi)
```

A positive half-integer gives an exact value, and a float gives a float.
Another exact rational stays unevaluated, and `N` evaluates it numerically
from Γ(2n+1) / (Γ(n+1) Γ(n+2)). A negative non-integer stays unevaluated.

```epsil
[catalanNumber(3/2), catalanNumber(5/2)]
// ➔ [64 / (15pi),1024 / (105pi)]
catalanNumber(2.5)
// ➔ 3.1042792709733490253
[catalanNumber(1/3), catalanNumber(-1/2)]
// ➔ [CatalanNumber(1/3),CatalanNumber(-1/2)]
N(catalanNumber(1/3))
// ➔ 0.849070020544739550675
```

See also: [Catalan number](https://en.wikipedia.org/wiki/Catalan_number).

<MathJson name="CatalanNumber">

`["CatalanNumber", n]`.

```json example
["CatalanNumber", 5]
// ➔ 42
```

</MathJson>

### chineseRemainder

`(collection<any>, collection<any>, integer?) -> integer`

Solve a system of simultaneous congruences: return the smallest non-negative integer `x` such that `x ≡ residues[i] (mod moduli[i])` for every `i`. With a third argument `d`, return the smallest solution `x ≥ d`. Undefined if the system is inconsistent or the two lists differ in length.

```epsil
chineseRemainder([2, 3, 2], [3, 5, 7])
// ➔ 23
```

```epsil
chineseRemainder([2, 3, 2], [3, 5, 7], 100)
// ➔ 128
```

The moduli do not have to be coprime. An inconsistent system leaves the
expression unevaluated:

```epsil
chineseRemainder([1, 3], [4, 6])
// ➔ 9
chineseRemainder([1, 2], [4, 6])
// ➔ ChineseRemainder([1,2], [4,6])
```

To solve a system of congruences written with `congruent`, see
[Solving congruences](#solving-congruences).

See also: [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem).

<MathJson name="ChineseRemainder">

`["ChineseRemainder", residues, moduli]`,
`["ChineseRemainder", residues, moduli, d]`.

```json example
["ChineseRemainder", ["List", 2, 3, 2], ["List", 3, 5, 7]]
// ➔ 23

["ChineseRemainder", ["List", 2, 3, 2], ["List", 3, 5, 7], 100]
// ➔ 128
```

</MathJson>

### continuedFraction

`(real, integer?) -> list<integer | list<integer>>`

Return the continued-fraction expansion of `x` as a list of integer terms `[a0, a1, …]`. An exact rational is expanded fully. An exact quadratic irrational (`Sqrt(2)`) is expanded to its periodic form `[a0, …, [period]]` (`[1, [2]]`), or to the optional `n` terms. Another exact real (`ExponentialE`) is expanded to `n` terms (default 20), each computed at a precision that vouches for it. An inexact value is expanded as its best rational approximation at working precision (see `Rationalize`), truncated to `n` terms (default 20).

```epsil
continuedFraction(43/19)
// ➔ [2,3,1,4]
```

```epsil
continuedFraction(sqrt(2))
// ➔ [1,[2]]
```

With `n`, a quadratic irrational is expanded to exactly `n` terms:

```epsil
continuedFraction(sqrt(2), 5)
// ➔ [1,2,2,2,2]
continuedFraction(sqrt(7))
// ➔ [2,[1,1,1,4]]
```

Another exact real, such as `e` or `pi`, is expanded to `n` terms (20 by
default). Each term is checked at double the working precision; when one
cannot be confirmed, the expression stays unevaluated.

```epsil
continuedFraction(e, 8)
// ➔ [2,1,2,1,1,4,1,1]
continuedFraction(pi, 5)
// ➔ [3,7,15,1,292]
```

For a float, the round-off of the value can put large terms in the tail of
the expansion.

```epsil
continuedFraction(3.14159)
// ➔ [3,7,15,1,25,1,7,4]
```

See also: [Continued fraction](https://en.wikipedia.org/wiki/Continued_fraction).

<MathJson name="ContinuedFraction">

`["ContinuedFraction", x]`, `["ContinuedFraction", x, n]`.

```json example
["ContinuedFraction", ["Rational", 43, 19]]
// ➔ [2, 3, 1, 4]

["ContinuedFraction", ["Sqrt", 2]]
// ➔ [1, [2]]
```

</MathJson>

### digitCount

`(integer, integer?, integer?, integer?) -> integer | list<integer>`

Count digits of `n` in the given `base` (default 10); the sign of `n` is ignored. With a third argument `digit`, return how many times that digit occurs. Otherwise return a list `[count of 1, count of 2, …, count of base-1, count of 0]`. With a fourth argument `length`, the digits are first zero-padded on the left (or cut to their last `length`), so `DigitCount(5, 2, 0, 8)` is 6.

```epsil
digitCount(122, 10, 2)
// ➔ 2
```

```epsil
digitCount(5, 2, 0, 8)
// ➔ 6
```

The list has one count for each digit of the base, the count of 0 last.
1223 has one 1, two 2s and one 3; 10 is `1010` in base 2.

```epsil
digitCount(1223)
// ➔ [1,2,1,0,0,0,0,0,0,0]
digitCount(10, 2)
// ➔ [2,2]
```

`length` is at most 1,000,000. A larger length leaves the expression
unevaluated.

<MathJson name="DigitCount">

`["DigitCount", n, base]`, `["DigitCount", n, base, digit]`,
`["DigitCount", n, base, digit, length]`.

```json example
["DigitCount", 122, 10, 2]
// ➔ 2

["DigitCount", 5, 2, 0, 8]
// ➔ 6
```

</MathJson>

### digitSum

`(integer, integer?, integer?) -> integer`

Return the sum of the digits of `n` in the given `base` (default 10). The sign of `n` is ignored. With a third argument `k`, sum only the first `k` digits (most-significant first), or the last `|k|` when `k` is negative; `k` past the digit count sums them all.

```epsil
digitSum(1234)
// ➔ 10
```

```epsil
digitSum(1234, 10, 2)
// ➔ 3
```

```epsil
digitSum(255, 16)
// ➔ 30
[digitSum(1234, 10, -2), digitSum(1234, 10, 9)]
// ➔ [7,10]
```

<MathJson name="DigitSum">

`["DigitSum", n]`, `["DigitSum", n, base]`, `["DigitSum", n, base, k]`.

```json example
["DigitSum", 1234]
// ➔ 10

["DigitSum", 1234, 10, 2]
// ➔ 3
```

</MathJson>

### dirichletCharacter

`(integer, integer, integer) -> number`

The Dirichlet character χ_j(n) modulo `k`, the `j`-th of the φ(k) characters (Wolfram's indexing, `j = 1` the principal character). Zero where gcd(n, k) &gt; 1; otherwise a root of unity.

```epsil
dirichletCharacter(5, 2, 2)
// ➔ i
```

```epsil
dirichletCharacter(7, 3, 3)
// ➔ e^(2/3 * i * pi)
```

`j` runs from 1, the principal character, to $\varphi(k)$. An index outside
that range stays unevaluated. The function threads over a list:

```epsil
dirichletCharacter(5, 2, [1, 2, 3, 4, 5])
// ➔ [1,i,-i,-1,0]
[dirichletCharacter(4, 1, [1, 2, 3]), dirichletCharacter(5, 5, 2)]
// ➔ [[1,0,1],DirichletCharacter(5, 5, 2)]
```

<MathJson name="DirichletCharacter">

`["DirichletCharacter", k, j, n]`.

```json example
["DirichletCharacter", 5, 2, 2]
// ➔ "ImaginaryUnit"

["DirichletCharacter", 5, 2, 5]
// ➔ 0
```

</MathJson>

### dirichletL

`(integer, integer, number) -> number`

The Dirichlet L-function L(s, χ) = Σ χ(n)/nˢ (n ≥ 1) of the character χ_j modulo `k` (`DirichletCharacter(k, j, ·)`): `k^(−s) Σ_{r=1}^{k} χ(r) ζ(s, r/k)`. Entire for a non-principal character; the principal one is `ζ(s) Π_{p|k} (1 − p^(−s))`.

```epsil
dirichletL(1, 1, 2)
// ➔ 1/6 * pi^2
```

```epsil
dirichletL(3, 2, -2)
// ➔ -2/9
```

```epsil
dirichletL(5, 2, 0)
// ➔ (3/5 + 1/5 * i)
```

The value at a non-positive integer `s` is exact. For a real character, the
value at $s = 1$ is exact, from the class number formula. The principal
character has a pole at $s = 1$.

```epsil
[dirichletL(4, 2, 1), dirichletL(3, 2, 1), dirichletL(5, 1, 1)]
// ➔ [1/4 * pi,sqrt(3)/9 * pi,~oo]
```

A real `s` of a real character is computed to the engine precision. A
character with complex values is computed in double precision. A modulus
above 1000 stays unevaluated.

```epsil
N(dirichletL(3, 2, 1.5))
// ➔ 0.703968244868733261668
N(dirichletL(5, 2, 2))
// ➔ (0.9587161227168831 + 0.1455658767850896i)
dirichletL(1009, 2, 2)
// ➔ DirichletL(1009, 2, 2)
```

<MathJson name="DirichletL">

`["DirichletL", k, j, s]`.

```json example
["DirichletL", 4, 2, 1]
// ➔ ["Multiply", ["Rational", 1, 4], "Pi"]

["N", ["DirichletL", 3, 2, 1.5]]
// ➔ 0.703968244868733261668
```

</MathJson>

### divides

`(integer, integer) -> boolean`

`Divides(a, b)` returns `True` if `a` divides `b` (i.e. `b` is an integer multiple of `a`), corresponding to the notation `a ∣ b`. Both operands are integers; a symbolic operand keeps the relation unevaluated.

```epsil
divides(3, 12)
// ➔ true
```

Every integer divides 0, and 0 divides only 0. `notDivides(a, b)` is the
negation, `a ∤ b`.

```epsil
[divides(4, 10), notDivides(4, 10)]
// ➔ [false,true]
[divides(5, 0), divides(0, 0), divides(0, 5)]
// ➔ [true,true,false]
```

A symbolic operand keeps the relation unevaluated. A number that is not an
integer is a type error.

```epsil
divides(a, b)
// ➔ Divides(a, b)
divides(2.5, 5)
// ➔ error: Type error: expected `integer`, got `2.5` at `2.5` in `divides(2.5, 5)`
```

<MathJson name="Divides" latex={["\\mid"]}>

`["Divides", a, b]`, `["NotDivides", a, b]`. In LaTeX, `a \mid b` is
`["Divides", a, b]`, and `a \nmid b` is `["Not", ["Divides", a, b]]`.

```json example
["Divides", 3, 12]
// ➔ "True"

["Divides", 4, 10]
// ➔ "False"

["NotDivides", 4, 10]
// ➔ "True"
```

</MathJson>

### divisorSigma

`(integer, integer) -> rational`

The divisor function σ_k(n) = Σ_&#123;d | n&#125; dᵏ over the positive divisors of `n`. σ₀ counts divisors, σ₁ sums them. A negative `k` sums reciprocal powers, a rational: `DivisorSigma(-1, 12)` is 7/3. The sign of `n` is ignored, as for `Divisors` and `PrimeOmega`; `DivisorSigma(k, 0)` is undefined.

```epsil
divisorSigma(2, 6)
// ➔ 50
```

```epsil
divisorSigma(-1, 12)
// ➔ 7/3
```

`divisorSigma(0, n)` is `sigma0(n)` and `divisorSigma(1, n)` is
`sigma1(n)`. A negative `k` gives σ₋ₖ(n) / nᵏ.

```epsil
[divisorSigma(0, 12), divisorSigma(1, 12), divisorSigma(3, 6)]
// ➔ [6,28,252]
[divisorSigma(1, -12), divisorSigma(1, 0)]
// ➔ [28,DivisorSigma(1, 0)]
divisorSigma(-2, 6)
// ➔ 25/18
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

<MathJson name="DivisorSigma">

`["DivisorSigma", k, n]`.

```json example
["DivisorSigma", 2, 6]
// ➔ 50
```

</MathJson>

### divisors

`(integer) -> list<integer>`

Return the sorted list of positive divisors of an integer `n`. The sign of `n` is ignored.

```epsil
divisors(12)
// ➔ [1,2,3,4,6,12]
```

`divisors(0)` stays unevaluated: every integer divides 0.

```epsil
divisors(-12)
// ➔ [1,2,3,4,6,12]
divisors(0)
// ➔ Divisors(0)
```

See also: [Divisor](https://en.wikipedia.org/wiki/Divisor).

<MathJson name="Divisors">

`["Divisors", n]`.

```json example
["Divisors", 12]
// ➔ [1, 2, 3, 4, 6, 12]
```

</MathJson>

### eulerE

`(integer, number?) -> number`

Return the nth Euler number Eₙ (1, 0, -1, 0, 5, 0, -61, …) for `EulerE(n)`, or the Euler polynomial Eₙ(x) for `EulerE(n, x)`. Odd-index Euler numbers are 0. Eₙ = 2ⁿ·Eₙ(1/2). A negative or non-integer `n` stays symbolic.

```epsil
eulerE(4)
// ➔ 5
```

```epsil
eulerE(2, x)
// ➔ x^2 - x
```

`eulerE(n)` is an exact integer for an integer `n ≥ 0`.

```epsil
[eulerE(0), eulerE(1), eulerE(2), eulerE(6)]
// ➔ [1,0,-1,-61]
eulerE(-1)
// ➔ EulerE(-1)
```

`eulerE(n, x)` is exact at an exact `x` and a float at a float `x`, real or
complex in both cases. At a symbol, it is the expanded polynomial.

```epsil
[eulerE(2, 1/3), eulerE(2, 0.5)]
// ➔ [-2/9,-0.25]
eulerE(3, 1 + 2i)
// ➔ (-25/4 - 8i)
```

See also: [Euler numbers](https://en.wikipedia.org/wiki/Euler_numbers).

<MathJson name="EulerE">

`["EulerE", n]`, `["EulerE", n, x]`.

```json example
["EulerE", 4]
// ➔ 5

["EulerE", 2, "x"]
// ➔ x^2 - x

["EulerE", 3, ["Complex", 1, 2]]
// ➔ -25/4 - 8i
```

</MathJson>

### eulerPhi

MathJSON `EulerPhi` · `(integer) -> integer`

`EulerPhi` is an alias for `Totient`, which is the preferred name. Euler's totient function φ(n): count of positive integers ≤ n that are coprime to n, for n ≥ 1; φ(0) = 0 and φ(−n) = φ(n).

```epsil
eulerPhi(12)
// ➔ 4
```

### eulerian

`(integer, integer) -> integer`

Eulerian number A(n, m): number of permutations of &#123;1..n&#125; with exactly m ascents.

An ascent is a position where the next number is greater than the one
before it. Of the 24 permutations of 1, 2, 3, 4, eleven have exactly two
ascents.

```epsil
[eulerian(4, 0), eulerian(4, 1), eulerian(4, 2), eulerian(4, 3)]
// ➔ [1,11,11,1]
```

Outside the triangle the value is 0: `eulerian(n, m)` is 0 for `m ≥ n > 0`.
`eulerian(0, 0)` is 1. A negative or symbolic operand leaves the expression
unevaluated.

```epsil
[eulerian(3, 5), eulerian(3, 3), eulerian(0, 0)]
// ➔ [0,0,1]
[eulerian(-1, 0), eulerian(n, 2)]
// ➔ [Eulerian(-1, 0),Eulerian(n, 2)]
```

See also: [Eulerian number](https://en.wikipedia.org/wiki/Eulerian_number).

<MathJson name="Eulerian">

`["Eulerian", n, m]`.

```json example
["Eulerian", 4, 2]
// ➔ 11

["Eulerian", 3, 5]
// ➔ 0
```

</MathJson>

### extendedGCD

`(integer, integer, integer*) -> tuple`

Return the extended GCD of `a` and `b` as a tuple `(g, x, y)` where `g = gcd(a, b)` is non-negative and `a·x + b·y = g` (Bézout coefficients). With more operands, `ExtendedGCD(a₁, …, aₙ)` is the tuple `(g, x₁, …, xₙ)` with `g = gcd(a₁, …, aₙ)` and `Σ aᵢ·xᵢ = g`.

```epsil
extendedGCD(12, 18)
// ➔ (6, -1, 1)
```

```epsil
extendedGCD(12, 18, 27)
// ➔ (3, 4, -4, 1)
```

240 · (-9) + 46 · 47 is 2, the GCD of 240 and 46:

```epsil
extendedGCD(240, 46)
// ➔ (2, -9, 47)
extendedGCD(-12, 18)
// ➔ (6, 1, 1)
```

See also: [Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm).

<MathJson name="ExtendedGCD">

`["ExtendedGCD", a, b, ...rest]`.

```json example
["ExtendedGCD", 12, 18]
// ➔ (6, -1, 1)

["ExtendedGCD", 12, 18, 27]
// ➔ (3, 4, -4, 1)
```

</MathJson>

### factorInteger

`(rational) -> list<tuple<integer, integer>>`

Return the prime factorization of an integer `n` as a list of `[prime, exponent]` tuples, ordered by ascending prime. For a negative `n`, a leading `[-1, 1]` tuple carries the sign. A rational `p/q` is factored as `p` and `q`, the exponents of the primes of `q` being negative.

```epsil
factorInteger(360)
// ➔ [(2, 3),(3, 2),(5, 1)]
```

```epsil
factorInteger(12/35)
// ➔ [(2, 2),(3, 1),(5, -1),(7, -1)]
```

360 is 2³ · 3² · 5, so its factorization is the list of the tuples
`(2, 3)`, `(3, 2)` and `(5, 1)`.

```epsil
factorInteger(-360)
// ➔ [(-1, 1),(2, 3),(3, 2),(5, 1)]
[factorInteger(1), factorInteger(0)]
// ➔ [[(1, 1)],[(0, 1)]]
```

See also: [Integer factorization](https://en.wikipedia.org/wiki/Integer_factorization).

<MathJson name="FactorInteger">

`["FactorInteger", n]`.

```json example
["FactorInteger", 360]
// ➔ [(2, 3), (3, 2), (5, 1)]

["FactorInteger", ["Rational", 12, 35]]
// ➔ [(2, 2), (3, 1), (5, -1), (7, -1)]
```

</MathJson>

### fromContinuedFraction

`(collection<any>) -> number`

Reconstruct the value of a continued fraction given its list of integer terms `[a0, a1, …]`. A last element that is a list is the repeating period, `[1, [2]]`: the quadratic irrational `Sqrt(2)`.

```epsil
fromContinuedFraction([2, 3, 1, 4])
// ➔ 43/19
```

```epsil
fromContinuedFraction([1, [2]])
// ➔ sqrt(2)
```

It is the inverse of `continuedFraction`:

```epsil
fromContinuedFraction([3, 7, 15, 1])
// ➔ 355/113
fromContinuedFraction([2, [1, 1, 1, 4]])
// ➔ sqrt(7)
```

<MathJson name="FromContinuedFraction">

`["FromContinuedFraction", terms]`.

```json example
["FromContinuedFraction", ["List", 2, 3, 1, 4]]
// ➔ 43/19

["FromContinuedFraction", ["List", 1, ["List", 2]]]
// ➔ ["Sqrt", 2]
```

</MathJson>

### fromDigits

`(collection<any>, number?) -> number`

Reconstruct a number from its digits (most-significant first) in the given `base` (default 10). The inverse of `IntegerDigits`. Digits outside `[0, base)` are combined positionally, and the base may be any number or symbol: `FromDigits([1, 1, 0], -2)` is 2 and `FromDigits([a, b, c], x)` is `a x^2 + b x + c`.

```epsil
fromDigits([1, 2, 3, 4])
// ➔ 1234
```

```epsil
fromDigits([1, 1, 0], -2)
// ➔ 2
```

```epsil
fromDigits([a, b, c], x)
// ➔ a * x^2 + b * x + c
```

An integer base of any sign gives an exact integer. Another base gives the
sum of `d_k · base^k`, which is exact; `N` evaluates it numerically.

```epsil
fromDigits([1, 0, 1, 1], 2)
// ➔ 11
fromDigits([1, 12], 10)
// ➔ 22
fromDigits([1, 2, 3], 1/2)
// ➔ 17/4
fromDigits([1, 2, 3], pi)
// ➔ 3 + 2pi + pi^2
N(fromDigits([1, 2, 3], pi))
// ➔ 19.1527897082689450958
```

<MathJson name="FromDigits">

`["FromDigits", digits]`, `["FromDigits", digits, base]`.

```json example
["FromDigits", ["List", 1, 2, 3, 4]]
// ➔ 1234

["FromDigits", ["List", 1, 1, 0], -2]
// ➔ 2

["FromDigits", ["List", "a", "b", "c"], "x"]
// ➔ a x^2 + b x + c
```

</MathJson>

### integerDigits

`(integer, integer?, integer?) -> list<integer>`

Return the digits of `n` in the given `base` (default 10), most-significant first. The sign of `n` is ignored. With a third argument `length`, the result is zero-padded on the left (or truncated to its least-significant digits) to that length.

```epsil
integerDigits(255, 16)
// ➔ [15,15]
```

```epsil
integerDigits(-255, 16)
// ➔ [15,15]
integerDigits(5, 2, 8)
// ➔ [0,0,0,0,0,1,0,1]
integerDigits(1234, 10, 2)
// ➔ [3,4]
```

`length` is at most 1,000,000. A larger length leaves the expression
unevaluated.

```epsil
integerDigits(5, 2, 2000000)
// ➔ IntegerDigits(5, 2, 2000000)
```

<MathJson name="IntegerDigits">

`["IntegerDigits", n]`, `["IntegerDigits", n, base]`,
`["IntegerDigits", n, base, length]`.

```json example
["IntegerDigits", 255, 16]
// ➔ [15, 15]
```

</MathJson>

### integerSqrt

`(integer) -> integer`

Return the integer square root of `n`, i.e. the largest integer `m` such that `m² ≤ n`. Undefined for negative `n`.

```epsil
integerSqrt(17)
// ➔ 4
```

For a negative `n`, the expression stays unevaluated.

```epsil
[integerSqrt(26), integerSqrt(123456789)]
// ➔ [5,11111]
integerSqrt(-4)
// ➔ IntegerSqrt(-4)
```

See also: [Integer square root](https://en.wikipedia.org/wiki/Integer_square_root).

<MathJson name="IntegerSqrt">

`["IntegerSqrt", n]`.

```json example
["IntegerSqrt", 17]
// ➔ 4
```

</MathJson>

### isAbundant

`(integer) -> boolean`

True if n is an abundant number (sum of divisors &gt; 2n).

The sum of the divisors of 12 other than itself, 1 + 2 + 3 + 4 + 6, is 16,
more than 12. 945 is the smallest odd abundant number. For `n < 1` the
result is `False`.

```epsil
[isAbundant(12), isAbundant(6), isAbundant(945)]
// ➔ [true,false,true]
```

See also: [Abundant number](https://en.wikipedia.org/wiki/Abundant_number).

<MathJson name="IsAbundant">

`["IsAbundant", n]`.

```json example
["IsAbundant", 12]
// ➔ "True"
```

</MathJson>

### isCenteredSquare

`(integer) -> boolean`

True if n is a centered square number, n = t² + (t + 1)² for an integer t ≥ 0: 1, 5, 13, 25, 41, ...

The `k`th centered square number is `k² + (k+1)²`: a dot in the center and
the square layers of dots around it.

```epsil
[isCenteredSquare(5), isCenteredSquare(6), isCenteredSquare(25)]
// ➔ [true,false,true]
filter(1..100, isCenteredSquare)
// ➔ [1,5,13,25,41,61,85]
```

See also: [Centered square numbers, OEIS A001844](https://oeis.org/A001844).

<MathJson name="IsCenteredSquare">

`["IsCenteredSquare", n]`.

```json example
["IsCenteredSquare", 5]
// ➔ "True"
```

</MathJson>

### isHappy

`(integer) -> boolean`

True if n is a happy number, a number which eventually reaches 1 when the number is replaced by the sum of the square of each digit

19 is happy: 1² + 9² is 82, 8² + 2² is 68, 6² + 8² is 100, and
1² + 0² + 0² is 1.

```epsil
[n for n in 1..50 if isHappy(n)]
// ➔ [1,7,10,13,19,23,28,31,32,44,49]
```

See also: [Happy number](https://en.wikipedia.org/wiki/Happy_number).

<MathJson name="IsHappy">

`["IsHappy", n]`.

```json example
["IsHappy", 19]
// ➔ "True"
```

</MathJson>

### isOctahedral

`(integer) -> boolean`

True if n is an octahedral number.

The `k`th octahedral number is `k(2k² + 1)/3`, the number of spheres in an
octahedron: 19 is 3 · 19 / 3.

```epsil
[n for n in 1..200 if isOctahedral(n)]
// ➔ [1,6,19,44,85,146]
[isOctahedral(19), isOctahedral(20)]
// ➔ [true,false]
```

See also: [Octahedral number](https://en.wikipedia.org/wiki/Octahedral_number).

<MathJson name="IsOctahedral">

`["IsOctahedral", n]`.

```json example
["IsOctahedral", 19]
// ➔ "True"
```

</MathJson>

### isPerfect

`(integer) -> boolean`

Returns "True" if n is a perfect number, a positive integer which equals the sum of all its divisors.

A perfect number is the sum of its positive divisors other than itself: 28
is 1 + 2 + 4 + 7 + 14. For `n < 1` the result is `False`.

```epsil
[isPerfect(28), isPerfect(12), isPerfect(-6)]
// ➔ [true,false,false]
[n for n in 1..10000 if isPerfect(n)]
// ➔ [6,28,496,8128]
```

See also: [Perfect number](https://en.wikipedia.org/wiki/Perfect_number).

<MathJson name="IsPerfect">

`["IsPerfect", n]`.

```json example
["IsPerfect", 28]
// ➔ "True"
```

</MathJson>

### isPerfectPower

`(integer) -> boolean`

Return `"True"` if `n` is a perfect power `a^b` for integers `a` and `b ≥ 2` (a negative `n` requires an odd exponent). The smallest perfect power is 4.

```epsil
isPerfectPower(64)
// ➔ true
```

-8 is (-2)³, but -4 is not a perfect power: its square roots are not real.
1 is not a perfect power.

```epsil
[isPerfectPower(-8), isPerfectPower(-4), isPerfectPower(1)]
// ➔ [true,false,false]
[n for n in 1..70 if isPerfectPower(n)]
// ➔ [4,8,9,16,25,27,32,36,49,64]
```

See also: [Perfect power](https://en.wikipedia.org/wiki/Perfect_power).

<MathJson name="IsPerfectPower">

`["IsPerfectPower", n]`.

```json example
["IsPerfectPower", 64]
// ➔ "True"
```

</MathJson>

### isSquare

`(integer) -> boolean`

True if n is a perfect square.

A perfect square is the square of an integer: 16 is 4². 0 is a perfect
square, and a negative number is not.

```epsil
isSquare([0, 2, 4, 9, -4])
// ➔ [true,false,true,true,false]
isSquare(x)
// ➔ IsSquare(x)
```

See also: [Square number](https://en.wikipedia.org/wiki/Square_number).

<MathJson name="IsSquare">

`["IsSquare", n]`.

```json example
["IsSquare", 16]
// ➔ "True"
```

</MathJson>

### isSquareFree

`(rational) -> boolean`

Return `"True"` if `n` is square-free (not divisible by any perfect square &gt; 1). The sign of `n` is ignored. A rational is square-free when its numerator and denominator are.

```epsil
isSquareFree(30)
// ➔ true
```

```epsil
isSquareFree(6/35)
// ➔ true
```

```epsil
[isSquareFree(2/3), isSquareFree(2/9)]
// ➔ [true,false]
```

<MathJson name="IsSquareFree">

`["IsSquareFree", n]`.

```json example
["IsSquareFree", 30]
// ➔ "True"
```

</MathJson>

### isTriangular

`(integer) -> boolean`

True if n is a triangular number.

The `k`th triangular number is `k(k+1)/2`, the number of objects in a
triangle with `k` rows: 15 is 5 · 6 / 2. 0 is not counted.

```epsil
[n for n in 1..60 if isTriangular(n)]
// ➔ [1,3,6,10,15,21,28,36,45,55]
[isTriangular(15), isTriangular(16), isTriangular(0)]
// ➔ [true,false,false]
```

Like the other predicates of this library, `isTriangular` applies to each
element of a list, and stays unevaluated for a symbol.

See also: [Triangular number](https://en.wikipedia.org/wiki/Triangular_number).

<MathJson name="IsTriangular">

`["IsTriangular", n]`.

```json example
["IsTriangular", 15]
// ➔ "True"
```

</MathJson>

### jacobiSymbol

`(integer, integer) -> integer`

The Jacobi symbol (a/n) for an odd `n > 0`. Returns -1, 0, or 1. Undefined when `n` is even or non-positive.

```epsil
jacobiSymbol(5, 21)
// ➔ 1
```

For an even or a negative `n`, the expression stays unevaluated.

```epsil
[jacobiSymbol(2, 15), jacobiSymbol(3, 9)]
// ➔ [1,0]
[jacobiSymbol(5, 20), jacobiSymbol(5, -21)]
// ➔ [JacobiSymbol(5, 20),JacobiSymbol(5, -21)]
```

See also: [Jacobi symbol](https://en.wikipedia.org/wiki/Jacobi_symbol).

<MathJson name="JacobiSymbol">

`["JacobiSymbol", a, n]`.

```json example
["JacobiSymbol", 5, 21]
// ➔ 1
```

</MathJson>

### legendreSymbol

`(integer, integer) -> integer`

The Legendre symbol (a/p) for an odd prime `p`. Returns -1, 0, or 1. Undefined when `p` is not an odd prime.

```epsil
legendreSymbol(3, 7)
// ➔ -1
```

2 is a square modulo 7 (3² is 9), and 14 is a multiple of 7. When `p` is not
an odd prime, the expression stays unevaluated.

```epsil
[legendreSymbol(2, 7), legendreSymbol(14, 7)]
// ➔ [1,0]
[legendreSymbol(3, 9), legendreSymbol(3, 2)]
// ➔ [LegendreSymbol(3, 9),LegendreSymbol(3, 2)]
```

See also: [Legendre symbol](https://en.wikipedia.org/wiki/Legendre_symbol).

<MathJson name="LegendreSymbol">

`["LegendreSymbol", a, p]`.

```json example
["LegendreSymbol", 3, 7]
// ➔ -1
```

</MathJson>

### lucas

MathJSON `Lucas` · `(integer) -> integer`

`Lucas` is an alias for `LucasL`, which is the preferred name. Returns the nth Lucas number.

### lucasL

`(integer) -> integer`

Return the nth Lucas number: `LucasL(0)` is 2, `LucasL(1)` is 1, and `LucasL(n) = LucasL(n-1) + LucasL(n-2)`. Negative indices follow `LucasL(-n) = (-1)^n · LucasL(n)`.

```epsil
lucasL(10)
// ➔ 123
```

`lucas` is an alias: it becomes `LucasL`.

```epsil
[lucasL(0), lucasL(1), lucasL(2), lucasL(3)]
// ➔ [2,1,3,4]
[lucasL(-5), lucasL(-4)]
// ➔ [-11,7]
lucas(n)
// ➔ LucasL(n)
```

See also: [Lucas number](https://en.wikipedia.org/wiki/Lucas_number).

<MathJson name="LucasL">

`["LucasL", n]`. `["Lucas", n]` is the same function.

```json example
["LucasL", 10]
// ➔ 123
```

</MathJson>

### modularInverse

`(integer, integer) -> integer`

Return the modular multiplicative inverse of `a` modulo `m`: the integer `x` with `a·x ≡ 1 (mod m)`. The sign of `x` follows the sign of `m` (the same floored-division convention as `Mod`). Undefined when `a` and `m` are not coprime.

```epsil
modularInverse(3, 7)
// ➔ 5
```

```epsil
modularInverse(3, -7)
// ➔ -2
```

For `m > 0`, the inverse is in the range `[0, m)`. When `a` and `m` are not
coprime, the inverse does not exist and the expression stays unevaluated.

```epsil
[modularInverse(10, 7), modularInverse(-3, 7)]
// ➔ [5,2]
modularInverse(4, 6)
// ➔ ModularInverse(4, 6)
```

See also: [Modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse).

<MathJson name="ModularInverse">

`["ModularInverse", a, m]`.

```json example
["ModularInverse", 3, 7]
// ➔ 5

["ModularInverse", 4, 6]
// ➔ ["ModularInverse", 4, 6]
```

</MathJson>

### moebiusMu

`(integer) -> integer`

Return the Möbius function μ(n): 0 if `n` is divisible by a perfect square &gt; 1, otherwise (-1) raised to the number of distinct prime factors. The sign of `n` is ignored.

```epsil
moebiusMu(30)
// ➔ -1
```

12 is divisible by 4, and 30 is 2 · 3 · 5, a product of three distinct
primes:

```epsil
[moebiusMu(1), moebiusMu(12), moebiusMu(30)]
// ➔ [1,0,-1]
```

See also: [Möbius function](https://en.wikipedia.org/wiki/M%C3%B6bius_function).

<MathJson name="MoebiusMu">

`["MoebiusMu", n]`.

```json example
["MoebiusMu", 30]
// ➔ -1
```

</MathJson>

### multiplicativeOrder

`(integer, integer, list<integer>?) -> integer`

The multiplicative order of `a` modulo `n`: the smallest `k > 0` such that `a^k ≡ 1 (mod n)`. Undefined unless `a` and `n` are coprime. With a list of residues, `MultiplicativeOrder(a, n, [r1, r2, …])` is the smallest `k > 0` such that `a^k ≡ r_i (mod n)` for some `i` (a discrete logarithm), and is undefined when no `r_i` is a power of `a`. The sign of `n` is ignored. Undefined for `n = 0`.

```epsil
multiplicativeOrder(2, 7)
// ➔ 3
```

```epsil
multiplicativeOrder(5, 7, [3, 11])
// ➔ 2
```

The sign of `n` is ignored, because the unit group modulo `-n` is the unit
group modulo `n`. When `a` and `n` are not coprime, or `n` is 0, the
expression stays unevaluated.

```epsil
multiplicativeOrder(3, -7)
// ➔ 6
[multiplicativeOrder(2, 6), multiplicativeOrder(2, 0)]
// ➔ [MultiplicativeOrder(2, 6),MultiplicativeOrder(2, 0)]
```

With a list of residues, the expression stays unevaluated when no element of
the list is a power of `a`. The powers of 2 modulo 7 are 2, 4 and 1:

```epsil
multiplicativeOrder(2, 7, [3, 5])
// ➔ MultiplicativeOrder(2, 7, [3,5])
```

See also: [Multiplicative order](https://en.wikipedia.org/wiki/Multiplicative_order).

<MathJson name="MultiplicativeOrder">

`["MultiplicativeOrder", a, n]`, `["MultiplicativeOrder", a, n, residues]`.

```json example
["MultiplicativeOrder", 2, 7]
// ➔ 3

["MultiplicativeOrder", 3, -7]
// ➔ 6

["MultiplicativeOrder", 5, 7, ["List", 3, 11]]
// ➔ 2
```

</MathJson>

### nPartition

`(integer) -> integer`

Number of integer partitions of n, for n ≥ 0; it is 0 for n &lt; 0.

The number of ways to write `n` as a sum of positive integers, without
regard to their order. 5 has 7 partitions: 5, 4+1, 3+2, 3+1+1, 2+2+1,
2+1+1+1 and 1+1+1+1+1.
[`integerPartitions`](/reference/combinatorics/#integerpartitions) lists
them.

```epsil
nPartition(5)
// ➔ 7
nPartition(5) == length(integerPartitions(5))
// ➔ true
[nPartition(100), nPartition(-3)]
// ➔ [190569292,0]
```

`partitionsP`, the Wolfram Language name, is an alias: it becomes
`NPartition`.

```epsil
partitionsP(n)
// ➔ NPartition(n)
```

See also: [Partition (number theory)](https://en.wikipedia.org/wiki/Partition_(number_theory)).

<MathJson name="NPartition">

`["NPartition", n]`. `["PartitionsP", n]` is the same function.

```json example
["NPartition", 5]
// ➔ 7

["NPartition", -3]
// ➔ 0
```

</MathJson>

### nextPrime

`(real, integer?) -> integer`

Return the smallest prime greater than `n`. With a second argument `k`, return the kth prime after `n` (`k < 0` returns the |k|th prime before `n`). A non-integer real or rational `n` is allowed: `NextPrime(7/2)` is 5.

```epsil
nextPrime(10)
// ➔ 11
```

```epsil
nextPrime(10, -1)
// ➔ 7
```

```epsil
nextPrime(7/2)
// ➔ 5
```

`nextPrime(n, -1)` is the largest prime less than `n`. When there is no such
prime, the expression stays unevaluated.

```epsil
[nextPrime(10, 3), nextPrime(-5)]
// ➔ [17,2]
nextPrime(2, -1)
// ➔ NextPrime(2, -1)
```

See also: [Prime number](https://en.wikipedia.org/wiki/Prime_number).

<MathJson name="NextPrime">

`["NextPrime", n]`, `["NextPrime", n, k]`.

```json example
["NextPrime", 10]
// ➔ 11

["NextPrime", 10, 3]
// ➔ 17

["NextPrime", 10, -1]
// ➔ 7
```

</MathJson>

### notDivides

`(integer, integer) -> boolean`

`NotDivides(a, b)` returns `True` if `a` does not divide `b`, corresponding to the notation `a ∤ b`.

<MathJson name="NotDivides" latex={["\\nmid"]} />

### nthPrime

`(integer) -> integer`

Return the nth prime number (1-based): `NthPrime(1)` is 2, `NthPrime(2)` is 3, …

```epsil
nthPrime(10)
// ➔ 29
```

The function is named `nthPrime`, not `prime`, because `Prime` is the
derivative notation of the Compute Engine (as in `f'`). `primeNumber` is an
alias: it becomes `NthPrime`. For `n < 1` the expression stays unevaluated.

```epsil
[nthPrime(1), nthPrime(2), nthPrime(1000)]
// ➔ [2,3,7919]
[nthPrime(0), primeNumber(n)]
// ➔ [NthPrime(0),NthPrime(n)]
```

See also: [Prime number](https://en.wikipedia.org/wiki/Prime_number).

<MathJson name="NthPrime">

`["NthPrime", n]`. `["PrimeNumber", n]` is the same function.

```json example
["NthPrime", 10]
// ➔ 29
```

</MathJson>

### partitionsP

MathJSON `PartitionsP` · `(integer) -> integer`

`PartitionsP` is an alias for `NPartition`, which is the preferred name. Number of integer partitions of n, for n ≥ 0; it is 0 for n &lt; 0.

```epsil
partitionsP(5)
// ➔ 7
```

### partitionsQ

`(integer) -> integer`

Number of partitions of n into distinct parts (equivalently, into odd parts), q(n); it is 0 for n &lt; 0. The Wolfram Language `PartitionsQ`.

```epsil
partitionsQ(10)
// ➔ 10
```

By Euler's theorem, the partitions into distinct parts and the partitions
into odd parts are equally many (OEIS A000009). 5 has 3 of each: 5, 4+1 and
3+2, or 5, 3+1+1 and 1+1+1+1+1.

```epsil
[partitionsQ(5), partitionsQ(-3)]
// ➔ [3,0]
```

<MathJson name="PartitionsQ">

`["PartitionsQ", n]`.

```json example
["PartitionsQ", 10]
// ➔ 10
```

</MathJson>

### powerMod

`(list<rational> | rational, list<rational> | rational, integer | list<integer>) -> integer | list<integer>`

Return `a^b mod m` (modular exponentiation). A negative `b` uses the modular inverse of `a`; the result is undefined when that inverse does not exist (i.e. when `a` and `m` are not coprime). The result is in the range [0, m). A rational base `p/q` is `p` times the modular inverse of `q`, so `PowerMod(1/2, 2, 7)` is 2. A rational exponent `s/r` gives the least `x` with `x^r ≡ a^s (mod m)`, the first entry of `PowerModList(a, s/r, m)`. It is undefined when there is none, when `m` cannot be factored, or when there are too many roots to list and none of them is less than 100000. A list operand threads: `PowerMod([2, 3], 2, 7)` is `[4, 2]`.

```epsil
powerMod(2, 10, 1000)
// ➔ 24
```

```epsil
powerMod(4, 1/2, 7)
// ➔ 2
```

```epsil
powerMod(1/2, 2, 7)
// ➔ 2
```

When the modular inverse that a negative exponent or a rational base needs
does not exist, the expression stays unevaluated. So does a rational
exponent `s/r` when no `x` has `x^r ≡ a^s (mod m)`.

```epsil
powerMod(3, -1, 7)
// ➔ 5
powerMod(2, -1, 4)
// ➔ PowerMod(2, -1, 4)
powerMod(1/2, 2, 4)
// ➔ PowerMod(1/2, 2, 4)
powerMod(3, 1/2, 7)
// ➔ PowerMod(3, 1/2, 7)
```

A list operand threads:

```epsil
powerMod([2, 3], 2, 7)
// ➔ [4,2]
```

The rational exponent follows the Wolfram Language. The function works on
big integers. It stays unevaluated, rather than give a wrong answer, when the
modulus cannot be factored or a discrete logarithm is out of reach.

See also: [Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation).

<MathJson name="PowerMod">

`["PowerMod", a, b, m]`.

```json example
["PowerMod", 2, 10, 1000]
// ➔ 24

["PowerMod", ["Rational", 1, 2], 2, 7]
// ➔ 2

["PowerMod", ["List", 2, 3], 2, 7]
// ➔ [4, 2]

["PowerMod", 4, ["Rational", 1, 2], 7]
// ➔ 2
```

</MathJson>

### powerModList

`(list<rational> | rational, list<rational> | rational, integer | list<integer>) -> list<integer> | list<list<integer>>`

Return the sorted list of every `x` in [0, m) with `x^r ≡ a^s (mod m)`, for the exponent `s/r`. An integer exponent gives the single value `a^s mod m`, a negative one using the modular inverse of `a`. A rational base is read as `p` times the inverse of `q`. A list operand threads: `PowerModList([2, 3], 2, 7)` is `[[4], [2]]`. The list is empty when `a^s` is not an `r`-th power mod `m`. Undefined for a modulus `m < 1`, when the inverse of `a` does not exist, or when `m` cannot be factored or there are too many roots to list.

```epsil
powerModList(3, 1/2, 11)
// ➔ [5,6]
```

```epsil
powerModList(1, 1/3, 7)
// ➔ [1,2,4]
```

3 is not a square modulo 7, so it has no square root there. Modulo 8, 1 has
four square roots.

```epsil
powerModList(3, 1/2, 7)
// ➔ []
powerModList(1, 1/2, 8)
// ➔ [1,3,5,7]
```

As for `powerMod`, a rational base `p/q` is `p` times the inverse of `q`
modulo `m`, and a list operand threads:

```epsil
powerModList(1/2, 2, 7)
// ➔ [2]
powerModList([2, 3], 2, 7)
// ➔ [[4],[2]]
```

The expression stays unevaluated when the modulus cannot be factored or the
list would have more than 100000 entries.

<MathJson name="PowerModList">

`["PowerModList", a, e, m]`.

```json example
["PowerModList", 3, ["Rational", 1, 2], 11]
// ➔ [5, 6]

["PowerModList", ["List", 2, 3], 2, 7]
// ➔ [[4], [2]]
```

</MathJson>

### primeFactors

`(integer) -> list<integer>`

Return the sorted list of distinct prime factors of an integer `n`. The sign of `n` is ignored; `PrimeFactors(1)` is the empty list.

```epsil
primeFactors(360)
// ➔ [2,3,5]
```

<MathJson name="PrimeFactors">

`["PrimeFactors", n]`.

```json example
["PrimeFactors", 360]
// ➔ [2, 3, 5]
```

</MathJson>

### primeNu

`(integer) -> integer`

Return ω(n), the number of distinct prime factors of `n`. The sign of `n` is ignored; `PrimeNu(1)` is 0.

```epsil
primeNu(360)
// ➔ 3
```

`primeNu` counts each prime factor once, `primeOmega` counts it as many times
as it divides `n`. 360 is 2³ · 3² · 5:

```epsil
[primeNu(360), primeOmega(360)]
// ➔ [3,6]
```

See also: [Prime omega function](https://en.wikipedia.org/wiki/Prime_omega_function).

<MathJson name="PrimeNu">

`["PrimeNu", n]`.

```json example
["PrimeNu", 360]
// ➔ 3
```

</MathJson>

### primeNumber

MathJSON `PrimeNumber` · `(integer) -> integer`

The nth prime number. `PrimeNumber` is an alias for `NthPrime`, which is the preferred name.

### primeOmega

`(integer) -> integer`

Return Ω(n), the number of prime factors of `n` counted with multiplicity. The sign of `n` is ignored; `PrimeOmega(1)` is 0.

```epsil
primeOmega(360)
// ➔ 6
```

See also: [Prime omega function](https://en.wikipedia.org/wiki/Prime_omega_function).

<MathJson name="PrimeOmega">

`["PrimeOmega", n]`.

```json example
["PrimeOmega", 360]
// ➔ 6
```

</MathJson>

### primePi

`(real) -> integer`

Return π(n), the prime-counting function: the number of primes less than or equal to `n`.

```epsil
primePi(10)
// ➔ 4
```

`n` can be any real number:

```epsil
[primePi(10.5), primePi(-3)]
// ➔ [4,0]
```

See also: [Prime-counting function](https://en.wikipedia.org/wiki/Prime-counting_function).

<MathJson name="PrimePi">

`["PrimePi", n]`.

```json example
["PrimePi", 10]
// ➔ 4
```

</MathJson>

### primitiveRoot

`(integer) -> integer`

The smallest primitive root modulo `n` (a generator of the multiplicative group of integers mod `n`), or undefined if none exists (which happens unless `n` is 1, 2, 4, pᵏ, or 2pᵏ for an odd prime p). The sign of `n` is ignored, and `PrimitiveRoot(1)` is 0. Undefined for `n = 0`.

```epsil
primitiveRoot(7)
// ➔ 3
```

The sign of `n` is ignored, because the unit group modulo `-n` is the unit
group modulo `n`. When there is no primitive root, the expression stays
unevaluated.

```epsil
[primitiveRoot(-7), primitiveRoot(1)]
// ➔ [3,0]
[primitiveRoot(8), primitiveRoot(0)]
// ➔ [PrimitiveRoot(8),PrimitiveRoot(0)]
```

See also: [Primitive root modulo n](https://en.wikipedia.org/wiki/Primitive_root_modulo_n).

<MathJson name="PrimitiveRoot">

`["PrimitiveRoot", n]`.

```json example
["PrimitiveRoot", 7]
// ➔ 3

["PrimitiveRoot", -7]
// ➔ 3
```

</MathJson>

### primitiveRootList

`(integer) -> list<integer>`

The sorted list of all primitive roots modulo `n`: the generators of the multiplicative group of integers mod `n`. The list is empty when there is none (unless `n` is 1, 2, 4, pᵏ, or 2pᵏ for an odd prime p), and for `n = 0`. `PrimitiveRootList(1)` is `[0]`, as `PrimitiveRoot(1)` is 0. The sign of `n` is ignored. Undefined when `n` cannot be factored or there are too many roots to list.

```epsil
primitiveRootList(7)
// ➔ [3,5]
```

```epsil
primitiveRootList(8)
// ➔ []
```

```epsil
primitiveRootList(25)
// ➔ [2,3,8,12,13,17,22,23]
[primitiveRootList(1), primitiveRootList(0), primitiveRootList(-7)]
// ➔ [[0],[],[3,5]]
```

<MathJson name="PrimitiveRootList">

`["PrimitiveRootList", n]`.

```json example
["PrimitiveRootList", 25]
// ➔ [2, 3, 8, 12, 13, 17, 22, 23]

["PrimitiveRootList", 8]
// ➔ []
```

</MathJson>

### radical

`(integer) -> integer`

Return the radical of `n` (its square-free kernel): the product of its distinct prime factors. The sign of `n` is ignored; `Radical(1)` is 1.

```epsil
radical(360)
// ➔ 30
```

<MathJson name="Radical">

`["Radical", n]`.

```json example
["Radical", 360]
// ➔ 30
```

</MathJson>

### randomPrime

`(integer, integer?) random -> integer`

Return a random prime. `RandomPrime(n)` draws a prime in [2, n]; `RandomPrime(m, n)` draws a prime in [m, n]. Undefined if the range contains no prime.

```epsil
randomPrime(100)
```

A range that holds no prime leaves the expression unevaluated:

```epsil
randomPrime(24, 28)
// ➔ RandomPrime(24, 28)
randomPrime(10, 20)
```

<MathJson name="RandomPrime">

`["RandomPrime", n]`, `["RandomPrime", m, n]`.

```json example
["RandomPrime", 100]
// ➔ 47 (for example)
```

</MathJson>

### rationalReconstruction

`(integer, integer) -> rational`

The rational `p/q` with `p ≡ a·q (mod m)` and `|p|, q ≤ ⌊√((m − 1)/2)⌋`, the unique such fraction in lowest terms when it exists (Wang's algorithm). Undefined for `m < 1` or when there is none.

```epsil
rationalReconstruction(6, 11)
// ➔ 1/2
```

The function works on big integers. A result whose denominator is 1 is an
integer.

```epsil
rationalReconstruction(123456789, 1000000007)
// ➔ -161/81
rationalReconstruction(2, 11)
// ➔ 2
```

<MathJson name="RationalReconstruction">

`["RationalReconstruction", a, m]`.

```json example
["RationalReconstruction", 6, 11]
// ➔ 1/2
```

</MathJson>

### sigma0

`(integer) -> integer`

Number of positive divisors of n.

The number of positive integers that divide `n` with no remainder. The
divisors of 6 are 1, 2, 3 and 6, so `sigma0(6)` is 4. It is
`divisorSigma(0, n)`. For `n ≤ 0`, `sigma0` stays unevaluated, while
`divisorSigma` ignores the sign of `n`:

```epsil
[sigma0(-6), divisorSigma(0, -6)]
// ➔ [Sigma0(-6),4]
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

<MathJson name="Sigma0">

`["Sigma0", n]`.

```json example
["Sigma0", 6]
// ➔ 4
```

</MathJson>

### sigma1

`(integer) -> integer`

Sum of positive divisors of n.

The sum of the positive divisors of `n`. The divisors of 6 are 1, 2, 3 and
6, so `sigma1(6)` is 12. It is `divisorSigma(1, n)`.

```epsil
sigma1(6)
// ➔ 12
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

<MathJson name="Sigma1">

`["Sigma1", n]`.

```json example
["Sigma1", 6]
// ➔ 12
```

</MathJson>

### sigmaMinus1

`(integer) -> rational`

Sum of reciprocals of positive divisors of n.

The sum of the reciprocals of the positive divisors of `n`, an exact
rational. For `n = 6` it is 1 + 1/2 + 1/3 + 1/6, which is 2: 6 is a perfect
number, and the sum is 2 for every perfect number. It is
`divisorSigma(-1, n)`.

```epsil
[sigmaMinus1(6), sigmaMinus1(12)]
// ➔ [2,7/3]
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

<MathJson name="SigmaMinus1">

`["SigmaMinus1", n]`.

```json example
["SigmaMinus1", 6]
// ➔ 2
```

</MathJson>

### stirling

`(integer, integer) -> integer`

Stirling number of the second kind S(n, m): ways to partition n elements into m non-empty subsets.

There are 15 ways to split a set of 5 objects into 2 groups, none of them
empty.

```epsil
stirling(5, 2)
// ➔ 15
```

Outside the triangle (`m > n`) the value is 0, as for `binomial`, and so is
the value of `stirlingS1`. A negative or symbolic operand leaves the
expression unevaluated.

```epsil
[stirling(3, 5), stirlingS1(3, 5)]
// ➔ [0,0]
[stirling(-1, 2), stirling(n, 2)]
// ➔ [Stirling(-1, 2),Stirling(n, 2)]
```

`stirlingS2`, the Wolfram Language name, is an alias: it becomes `Stirling`.

```epsil
stirlingS2(n, k)
// ➔ Stirling(n, k)
```

See also: [Stirling numbers of the second kind](https://en.wikipedia.org/wiki/Stirling_numbers_of_the_second_kind).

<MathJson name="Stirling">

`["Stirling", n, m]`. `["StirlingS2", n, m]` is the same function.

```json example
["Stirling", 5, 2]
// ➔ 15

["StirlingS2", 6, 3]
// ➔ 90
```

</MathJson>

### stirlingS1

MathJSON `StirlingS1` · `(integer, integer) -> integer`

Signed Stirling number of the first kind s(n, m): the coefficient of x^m in the falling factorial x(x−1)…(x−n+1). Its absolute value counts the permutations of n elements with exactly m disjoint cycles.

```epsil
stirlingS1(5, 2)
// ➔ -50
```

### stirlingS2

MathJSON `StirlingS2` · `(integer, integer) -> integer`

`StirlingS2` is an alias for `Stirling`, which is the preferred name. Returns the Stirling number of the second kind S(n, k).

```epsil
stirlingS2(6, 3)
// ➔ 90
```

### totient

`(integer) -> integer`

Euler's totient function φ(n): count of positive integers ≤ n that are coprime to n, for n ≥ 1; φ(0) = 0 and φ(−n) = φ(n).

`totient(n)` counts the integers from 1 to `n` that have no common factor
with `n` other than 1. For `n = 9`, these are 1, 2, 4, 5, 7 and 8, so
φ(9) is 6.

```epsil
totient(9)
// ➔ 6
[totient(0), totient(-12)]
// ➔ [0,4]
```

`eulerPhi`, the Wolfram Language name, is an alias: it becomes `Totient`.

```epsil
eulerPhi(n)
// ➔ Totient(n)
```

See also: [Euler's totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function).

<MathJson name="Totient">

`["Totient", n]`. `["EulerPhi", n]` is the same function.

```json example
["Totient", 9]
// ➔ 6

["Totient", -12]
// ➔ 4

["EulerPhi", 12]
// ➔ 4
```

</MathJson>
