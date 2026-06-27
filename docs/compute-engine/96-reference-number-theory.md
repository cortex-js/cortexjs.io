---
title: Number Theory
slug: /compute-engine/reference/number-theory/
---

# Number Theory

The functions in this section provide tools for number-theoretic computations:  
prime numbers and integer factorization, divisor functions, partitions, polygonal numbers, perfect/happy numbers, and special combinatorial counts (Eulerian, Stirling).


## Function Definitions

<nav className="hidden">
### Totient
</nav>

<FunctionDefinition name="Totient">
<Signature name="Totient" returns="integer">n: integer</Signature>
Returns Euler’s <b>totient function</b> $φ(n)$: the number of integers $1 ≤ k ≤ n$ that are coprime to $n$.

This function counts how many integers up to $n$ share no common factors with $n$ other than 1. For example, for $n=9$, the integers coprime to 9 are 1, 2, 4, 5, 7, and 8, so $φ(9) = 6$.

See also: [Euler's totient function - Wikipedia](https://en.wikipedia.org/wiki/Euler%27s_totient_function)

```json
["Totient", 9]
// ➔ 6
```

</FunctionDefinition>


<nav className="hidden">
### Sigma0
</nav>

<FunctionDefinition name="Sigma0">
<Signature name="Sigma0" returns="integer">n: integer</Signature>
Returns the number of positive divisors of $n$.

This function counts how many positive integers divide $n$ without a remainder. For example, for $n=6$, the divisors are 1, 2, 3, and 6, so the count is 4.

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["Sigma0", 6]
// ➔ 4
```
</FunctionDefinition>


<nav className="hidden">
### Sigma1
</nav>

<FunctionDefinition name="Sigma1">
<Signature name="Sigma1" returns="integer">n: integer</Signature>
Returns the sum of positive divisors of $n$.

This function sums all positive divisors of $n$. For example, for $n=6$, the divisors are 1, 2, 3, and 6, and their sum is 12.

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["Sigma1", 6]
// ➔ 12
```
</FunctionDefinition>


<nav className="hidden">
### SigmaMinus1
</nav>

<FunctionDefinition name="SigmaMinus1">
<Signature name="SigmaMinus1" returns="number">n: integer</Signature>
Returns the sum of reciprocals of the positive divisors of $n$.

This function sums the reciprocals of all positive divisors of $n$. For example, for $n=6$, the divisors are 1, 2, 3, and 6, and the sum of reciprocals is 1 + 1/2 + 1/3 + 1/6 = 2.333...

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["SigmaMinus1", 6]
// ➔ 2.333...
```
</FunctionDefinition>


<nav className="hidden">
### NthPrime
</nav>

<FunctionDefinition name="NthPrime">
<Signature name="NthPrime" returns="integer">n: integer</Signature>
Returns the $n$th prime number (1-based): `NthPrime(1)` is 2, `NthPrime(2)` is 3, and so on.

For example, the 10th prime number is 29.

The function is named `NthPrime` rather than `Prime` because `Prime` denotes derivative notation (such as $f'$) in the Compute Engine. `PrimeNumber` is accepted as an alias and canonicalizes to `NthPrime`.

See also: [Prime number - Wikipedia](https://en.wikipedia.org/wiki/Prime_number)

```json
["NthPrime", 10]
// ➔ 29
```
</FunctionDefinition>


<nav className="hidden">
### NextPrime
</nav>

<FunctionDefinition name="NextPrime">
<Signature name="NextPrime" returns="integer">n: integer</Signature>
<Signature name="NextPrime" returns="integer">n: integer, k: integer</Signature>
Returns the smallest prime number greater than $n$.

With a second argument $k$, returns the $k$th prime after $n$. A negative $k$ returns the $|k|$th prime before $n$, so `NextPrime(n, -1)` is the largest prime less than $n$.

See also: [Prime number - Wikipedia](https://en.wikipedia.org/wiki/Prime_number)

```json
["NextPrime", 10]
// ➔ 11

["NextPrime", 10, 3]
// ➔ 17

["NextPrime", 10, -1]
// ➔ 7
```
</FunctionDefinition>


<nav className="hidden">
### FactorInteger
</nav>

<FunctionDefinition name="FactorInteger">
<Signature name="FactorInteger" returns="list<tuple<integer, integer>>">n: integer</Signature>
Returns the prime factorization of $n$ as a list of `[prime, exponent]` tuples, ordered by ascending prime.

For example, $360 = 2^3 \times 3^2 \times 5$, so the factorization is the list of tuples $(2, 3)$, $(3, 2)$, and $(5, 1)$. The sign of a negative $n$ is carried in a leading $(-1, 1)$ tuple.

See also: [Integer factorization - Wikipedia](https://en.wikipedia.org/wiki/Integer_factorization)

```json
["FactorInteger", 360]
// ➔ [(2, 3), (3, 2), (5, 1)]
```
</FunctionDefinition>


<nav className="hidden">
### Divisors
</nav>

<FunctionDefinition name="Divisors">
<Signature name="Divisors" returns="list<integer>">n: integer</Signature>
Returns the sorted list of positive divisors of $n$.

For example, the divisors of 12 are 1, 2, 3, 4, 6, and 12. The sign of $n$ is ignored; `Divisors(0)` is left unevaluated since 0 has infinitely many divisors.

See also: [Divisor - Wikipedia](https://en.wikipedia.org/wiki/Divisor)

```json
["Divisors", 12]
// ➔ [1, 2, 3, 4, 6, 12]
```
</FunctionDefinition>


<nav className="hidden">
### PrimeFactors
</nav>

<FunctionDefinition name="PrimeFactors">
<Signature name="PrimeFactors" returns="list<integer>">n: integer</Signature>
Returns the sorted list of distinct prime factors of $n$.

The sign of $n$ is ignored; `PrimeFactors(1)` is the empty list.

```json
["PrimeFactors", 360]
// ➔ [2, 3, 5]
```
</FunctionDefinition>


<nav className="hidden">
### Radical
</nav>

<FunctionDefinition name="Radical">
<Signature name="Radical" returns="integer">n: integer</Signature>
Returns the radical of $n$ (its square-free kernel): the product of its distinct prime factors.

```json
["Radical", 360]
// ➔ 30
```
</FunctionDefinition>


<nav className="hidden">
### PrimeNu
</nav>

<FunctionDefinition name="PrimeNu">
<Signature name="PrimeNu" returns="integer">n: integer</Signature>
Returns $ω(n)$, the number of **distinct** prime factors of $n$.

See also: [Prime omega function - Wikipedia](https://en.wikipedia.org/wiki/Prime_omega_function)

```json
["PrimeNu", 360]
// ➔ 3
```
</FunctionDefinition>


<nav className="hidden">
### PrimeOmega
</nav>

<FunctionDefinition name="PrimeOmega">
<Signature name="PrimeOmega" returns="integer">n: integer</Signature>
Returns $Ω(n)$, the number of prime factors of $n$ counted **with multiplicity**.

See also: [Prime omega function - Wikipedia](https://en.wikipedia.org/wiki/Prime_omega_function)

```json
["PrimeOmega", 360]
// ➔ 6
```
</FunctionDefinition>


<nav className="hidden">
### MoebiusMu
</nav>

<FunctionDefinition name="MoebiusMu">
<Signature name="MoebiusMu" returns="integer">n: integer</Signature>
Returns the Möbius function $μ(n)$: 0 if $n$ is divisible by a perfect square greater than 1, otherwise $(-1)^k$ where $k$ is the number of distinct prime factors.

See also: [Möbius function - Wikipedia](https://en.wikipedia.org/wiki/M%C3%B6bius_function)

```json
["MoebiusMu", 30]
// ➔ -1
```
</FunctionDefinition>


<nav className="hidden">
### IsSquareFree
</nav>

<FunctionDefinition name="IsSquareFree">
<Signature name="IsSquareFree" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is square-free, i.e. not divisible by any perfect square greater than 1.

```json
["IsSquareFree", 30]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsPerfectPower
</nav>

<FunctionDefinition name="IsPerfectPower">
<Signature name="IsPerfectPower" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a perfect power $a^b$ for integers $a$ and $b ≥ 2$. A negative $n$ requires an odd exponent; the smallest perfect power is 4.

See also: [Perfect power - Wikipedia](https://en.wikipedia.org/wiki/Perfect_power)

```json
["IsPerfectPower", 64]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### PrimePi
</nav>

<FunctionDefinition name="PrimePi">
<Signature name="PrimePi" returns="integer">n: real</Signature>
Returns $π(n)$, the prime-counting function: the number of primes less than or equal to $n$.

See also: [Prime-counting function - Wikipedia](https://en.wikipedia.org/wiki/Prime-counting_function)

```json
["PrimePi", 10]
// ➔ 4
```
</FunctionDefinition>


<nav className="hidden">
### RandomPrime
</nav>

<FunctionDefinition name="RandomPrime">
<Signature name="RandomPrime" returns="integer">n: integer</Signature>
<Signature name="RandomPrime" returns="integer">m: integer, n: integer</Signature>
Returns a random prime. `RandomPrime(n)` draws a prime in the interval $[2, n]$; `RandomPrime(m, n)` draws a prime in $[m, n]$. Undefined if the range contains no prime.

```json
["RandomPrime", 100]
// ➔ 47 (for example)
```
</FunctionDefinition>


<nav className="hidden">
### PowerMod
</nav>

<FunctionDefinition name="PowerMod">
<Signature name="PowerMod" returns="integer">a: integer, b: integer, m: integer</Signature>
Returns $a^b \bmod m$ (modular exponentiation), in the range $[0, m)$.

A negative exponent $b$ uses the modular inverse of $a$; the result is undefined when that inverse does not exist (i.e. when $a$ and $m$ are not coprime).

See also: [Modular exponentiation - Wikipedia](https://en.wikipedia.org/wiki/Modular_exponentiation)

```json
["PowerMod", 2, 10, 1000]
// ➔ 24
```
</FunctionDefinition>


<nav className="hidden">
### ExtendedGCD
</nav>

<FunctionDefinition name="ExtendedGCD">
<Signature name="ExtendedGCD" returns="tuple<integer, integer, integer>">a: integer, b: integer</Signature>
Returns the extended GCD of $a$ and $b$ as a tuple $(g, x, y)$, where $g = \gcd(a, b)$ is non-negative and $a·x + b·y = g$ (the Bézout coefficients).

See also: [Extended Euclidean algorithm - Wikipedia](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm)

```json
["ExtendedGCD", 12, 18]
// ➔ (6, -1, 1)
```
</FunctionDefinition>


<nav className="hidden">
### ChineseRemainder
</nav>

<FunctionDefinition name="ChineseRemainder">
<Signature name="ChineseRemainder" returns="integer">residues: collection, moduli: collection</Signature>
Returns the smallest non-negative integer $x$ such that $x ≡ \mathrm{residues}_i \pmod{\mathrm{moduli}_i}$ for every $i$. The moduli need not be coprime. Undefined if the system is inconsistent or the two lists differ in length.

See also: [Chinese remainder theorem - Wikipedia](https://en.wikipedia.org/wiki/Chinese_remainder_theorem)

```json
["ChineseRemainder", [2, 3, 2], [3, 5, 7]]
// ➔ 23
```
</FunctionDefinition>


<nav className="hidden">
### IntegerSqrt
</nav>

<FunctionDefinition name="IntegerSqrt">
<Signature name="IntegerSqrt" returns="integer">n: integer</Signature>
Returns the integer square root of $n$: the largest integer $m$ such that $m^2 ≤ n$. Undefined for negative $n$.

See also: [Integer square root - Wikipedia](https://en.wikipedia.org/wiki/Integer_square_root)

```json
["IntegerSqrt", 17]
// ➔ 4
```
</FunctionDefinition>


<nav className="hidden">
### CarmichaelLambda
</nav>

<FunctionDefinition name="CarmichaelLambda">
<Signature name="CarmichaelLambda" returns="integer">n: integer</Signature>
Returns the Carmichael function $λ(n)$ (the reduced totient): the smallest positive integer $m$ such that $a^m ≡ 1 \pmod n$ for every $a$ coprime to $n$. Defined for $n ≥ 1$.

See also: [Carmichael function - Wikipedia](https://en.wikipedia.org/wiki/Carmichael_function)

```json
["CarmichaelLambda", 15]
// ➔ 4
```
</FunctionDefinition>


<nav className="hidden">
### LucasL
</nav>

<FunctionDefinition name="LucasL">
<Signature name="LucasL" returns="integer">n: integer</Signature>
Returns the $n$th Lucas number: `LucasL(0)` is 2, `LucasL(1)` is 1, and $L_n = L_{n-1} + L_{n-2}$. Negative indices follow $L_{-n} = (-1)^n L_n$.

See also: [Lucas number - Wikipedia](https://en.wikipedia.org/wiki/Lucas_number)

```json
["LucasL", 10]
// ➔ 123
```
</FunctionDefinition>


<nav className="hidden">
### CatalanNumber
</nav>

<FunctionDefinition name="CatalanNumber">
<Signature name="CatalanNumber" returns="integer">n: integer</Signature>
Returns the $n$th Catalan number $C_n = \frac{(2n)!}{(n+1)!\,n!}$: 1, 1, 2, 5, 14, 42, … Defined for $n ≥ 0$.

See also: [Catalan number - Wikipedia](https://en.wikipedia.org/wiki/Catalan_number)

```json
["CatalanNumber", 5]
// ➔ 42
```
</FunctionDefinition>


<nav className="hidden">
### BernoulliB
</nav>

<FunctionDefinition name="BernoulliB">
<Signature name="BernoulliB" returns="rational">n: integer</Signature>
Returns the $n$th Bernoulli number $B_n$ as an exact rational, using the convention $B_1 = -\frac{1}{2}$. Odd $n > 1$ give 0.

See also: [Bernoulli number - Wikipedia](https://en.wikipedia.org/wiki/Bernoulli_number)

```json
["BernoulliB", 12]
// ➔ -691/2730
```
</FunctionDefinition>


<nav className="hidden">
### ContinuedFraction
</nav>

<FunctionDefinition name="ContinuedFraction">
<Signature name="ContinuedFraction" returns="list<integer>">x: number</Signature>
<Signature name="ContinuedFraction" returns="list<integer>">x: number, n: integer</Signature>
Returns the continued-fraction expansion of $x$ as a list of integer terms $[a_0, a_1, …]$.

An exact rational is expanded fully. For an inexact value the expansion is truncated to the optional $n$ terms (default 20); note that floating-point round-off can introduce spurious large terms in the tail.

See also: [Continued fraction - Wikipedia](https://en.wikipedia.org/wiki/Continued_fraction)

```json
["ContinuedFraction", ["Rational", 43, 19]]
// ➔ [2, 3, 1, 4]
```
</FunctionDefinition>


<nav className="hidden">
### FromContinuedFraction
</nav>

<FunctionDefinition name="FromContinuedFraction">
<Signature name="FromContinuedFraction" returns="number">terms: collection</Signature>
Reconstructs the (rational) value of a continued fraction from its list of integer terms $[a_0, a_1, …]$.

```json
["FromContinuedFraction", [2, 3, 1, 4]]
// ➔ 43/19
```
</FunctionDefinition>


<nav className="hidden">
### IntegerDigits
</nav>

<FunctionDefinition name="IntegerDigits">
<Signature name="IntegerDigits" returns="list<integer>">n: integer</Signature>
<Signature name="IntegerDigits" returns="list<integer>">n: integer, base: integer</Signature>
<Signature name="IntegerDigits" returns="list<integer>">n: integer, base: integer, length: integer</Signature>
Returns the digits of $n$ in the given `base` (default 10), most-significant first. The sign of $n$ is ignored.

With a third argument `length`, the result is zero-padded on the left (or truncated to its least-significant digits) to that length.

```json
["IntegerDigits", 255, 16]
// ➔ [15, 15]
```
</FunctionDefinition>


<nav className="hidden">
### DigitCount
</nav>

<FunctionDefinition name="DigitCount">
<Signature name="DigitCount" returns="list<integer>">n: integer, base: integer</Signature>
<Signature name="DigitCount" returns="integer">n: integer, base: integer, digit: integer</Signature>
Counts digits of $n$ in the given `base` (default 10); the sign of $n$ is ignored.

With a third argument `digit`, returns how many times that digit occurs. Otherwise returns a list `[count of 1, count of 2, …, count of base-1, count of 0]`.

```json
["DigitCount", 122, 10, 2]
// ➔ 2
```
</FunctionDefinition>


<nav className="hidden">
### FromDigits
</nav>

<FunctionDefinition name="FromDigits">
<Signature name="FromDigits" returns="integer">digits: collection</Signature>
<Signature name="FromDigits" returns="integer">digits: collection, base: integer</Signature>
Reconstructs an integer from its list of digits (most-significant first) in the given `base` (default 10). The inverse of `IntegerDigits`.

Digits outside $[0, base)$ are combined positionally (Horner evaluation), so `FromDigits` is well-defined for any integer terms.

```json
["FromDigits", [1, 2, 3, 4]]
// ➔ 1234
```
</FunctionDefinition>


<nav className="hidden">
### DigitSum
</nav>

<FunctionDefinition name="DigitSum">
<Signature name="DigitSum" returns="integer">n: integer</Signature>
<Signature name="DigitSum" returns="integer">n: integer, base: integer</Signature>
Returns the sum of the digits of $n$ in the given `base` (default 10). The sign of $n$ is ignored.

```json
["DigitSum", 1234]
// ➔ 10
```
</FunctionDefinition>


<nav className="hidden">
### DivisorSigma
</nav>

<FunctionDefinition name="DivisorSigma">
<Signature name="DivisorSigma" returns="integer">k: integer, n: integer</Signature>
Returns the divisor function $σ_k(n) = \sum_{d \mid n} d^k$ over the positive divisors of $n$. $σ_0$ counts divisors (like `Sigma0`) and $σ_1$ sums them (like `Sigma1`). Defined for $n ≥ 1$.

See also: [Divisor function - Wikipedia](https://en.wikipedia.org/wiki/Divisor_function)

```json
["DivisorSigma", 2, 6]
// ➔ 50
```
</FunctionDefinition>


<nav className="hidden">
### JacobiSymbol
</nav>

<FunctionDefinition name="JacobiSymbol">
<Signature name="JacobiSymbol" returns="integer">a: integer, n: integer</Signature>
Returns the Jacobi symbol $\left(\frac{a}{n}\right)$ for an odd $n > 0$, with value -1, 0, or 1. Undefined when $n$ is even or non-positive.

See also: [Jacobi symbol - Wikipedia](https://en.wikipedia.org/wiki/Jacobi_symbol)

```json
["JacobiSymbol", 5, 21]
// ➔ 1
```
</FunctionDefinition>


<nav className="hidden">
### LegendreSymbol
</nav>

<FunctionDefinition name="LegendreSymbol">
<Signature name="LegendreSymbol" returns="integer">a: integer, p: integer</Signature>
Returns the Legendre symbol $\left(\frac{a}{p}\right)$ for an odd prime $p$, with value -1, 0, or 1. Undefined when $p$ is not an odd prime.

See also: [Legendre symbol - Wikipedia](https://en.wikipedia.org/wiki/Legendre_symbol)

```json
["LegendreSymbol", 3, 7]
// ➔ -1
```
</FunctionDefinition>


<nav className="hidden">
### MultiplicativeOrder
</nav>

<FunctionDefinition name="MultiplicativeOrder">
<Signature name="MultiplicativeOrder" returns="integer">a: integer, n: integer</Signature>
Returns the multiplicative order of $a$ modulo $n$: the smallest $k > 0$ such that $a^k ≡ 1 \pmod n$. Undefined unless $a$ and $n$ are coprime.

See also: [Multiplicative order - Wikipedia](https://en.wikipedia.org/wiki/Multiplicative_order)

```json
["MultiplicativeOrder", 2, 7]
// ➔ 3
```
</FunctionDefinition>


<nav className="hidden">
### PrimitiveRoot
</nav>

<FunctionDefinition name="PrimitiveRoot">
<Signature name="PrimitiveRoot" returns="integer">n: integer</Signature>
Returns the smallest primitive root modulo $n$ (a generator of the multiplicative group of integers mod $n$), or undefined if none exists — which happens unless $n$ is 1, 2, 4, $p^k$, or $2p^k$ for an odd prime $p$.

See also: [Primitive root modulo n - Wikipedia](https://en.wikipedia.org/wiki/Primitive_root_modulo_n)

```json
["PrimitiveRoot", 7]
// ➔ 3
```
</FunctionDefinition>


<nav className="hidden">
### Eulerian
</nav>

<FunctionDefinition name="Eulerian">
<Signature name="Eulerian" returns="integer">n: integer, m: integer</Signature>
Returns the <b>Eulerian number</b> A(n, m), counting permutations of `{1..n}` with exactly m ascents.

Eulerian numbers count the permutations of the numbers 1 through $n$ that have exactly $m$ ascents (positions where the next number is greater than the previous one). For example, for $n=4$ and $m=2$, there are 11 such permutations.

See also: [Eulerian number - Wikipedia](https://en.wikipedia.org/wiki/Eulerian_number)

```json
["Eulerian", 4, 2]
// ➔ 11
```

</FunctionDefinition>


<nav className="hidden">
### Stirling
</nav>

<FunctionDefinition name="Stirling">
<Signature name="Stirling" returns="integer">n: integer, m: integer</Signature>
Returns the <b>Stirling number of the second kind</b> $S(n, m)$, counting the number of ways to partition $n$ elements into $m$ non-empty subsets.

Stirling numbers of the second kind count how many ways to split a set of $n$ objects into $m$ groups, none empty. For example, with $n=5$ and $m=2$, there are 15 ways.

See also: [Stirling number of the second kind - Wikipedia](https://en.wikipedia.org/wiki/Stirling_numbers_of_the_second_kind)

```json
["Stirling", 5, 2]
// ➔ 15
```

</FunctionDefinition>

<nav className="hidden">
### NPartition
</nav>

<FunctionDefinition name="NPartition">
<Signature name="NPartition" returns="integer">n: integer</Signature>
Returns the number of integer partitions of $n$.

This function counts how many ways $n$ can be expressed as a sum of positive integers, disregarding order. For example, 5 can be partitioned into 7 distinct sums: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, and 1+1+1+1+1.

See also: [Partition function (number theory) - Wikipedia](https://en.wikipedia.org/wiki/Partition_(number_theory))

```json
["NPartition", 5]
// ➔ 7
```
</FunctionDefinition>


<nav className="hidden">
### IsTriangular
</nav>

<FunctionDefinition name="IsTriangular">
<Signature name="IsTriangular" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a triangular number.

Triangular numbers count objects arranged in an equilateral triangle. The $k$th triangular number is $k(k+1)/2$. For example, 15 is triangular because $5 \times 6 / 2 = 15$.

See also: [Triangular number - Wikipedia](https://en.wikipedia.org/wiki/Triangular_number)

```json
["IsTriangular", 15]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsSquare
</nav>

<FunctionDefinition name="IsSquare">
<Signature name="IsSquare" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a perfect square.

A perfect square is an integer that is the square of another integer. For example, 16 is a perfect square since $4^2 = 16$.

See also: [Square number - Wikipedia](https://en.wikipedia.org/wiki/Square_number)

```json
["IsSquare", 16]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsPentagonal
</nav>

<FunctionDefinition name="IsPentagonal">
<Signature name="IsPentagonal" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a pentagonal number.

Pentagonal numbers represent dots forming a pentagon. The $k$th pentagonal number is given by $k(3k-1)/2$. For example, 22 is pentagonal because it matches the formula for some integer $k$.

See also: [Pentagonal number - Wikipedia](https://en.wikipedia.org/wiki/Pentagonal_number)

```json
["IsPentagonal", 22]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsOctahedral
</nav>

<FunctionDefinition name="IsOctahedral">
<Signature name="IsOctahedral" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is an octahedral number.

Octahedral numbers count objects arranged in an octahedron shape. The $k$th octahedral number is given by $k(2k^2 + 1)/3$. For example, 19 is not octahedral.

See also: [Octahedral number - Wikipedia](https://en.wikipedia.org/wiki/Octahedral_number)

```json
["IsOctahedral", 19]
// ➔ "False"
```
</FunctionDefinition>


<nav className="hidden">
### IsCenteredSquare
</nav>

<FunctionDefinition name="IsCenteredSquare">
<Signature name="IsCenteredSquare" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a centered square number.

Centered square numbers count dots arranged in a square with a dot in the center. The $k$th centered square number is $(2k+1)^2$. For example, 25 is centered square as it equals $5^2$.

See also: [Centered square number - OEIS A001844](https://oeis.org/A001844)

```json
["IsCenteredSquare", 25]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsPerfect
</nav>

<FunctionDefinition name="IsPerfect">
<Signature name="IsPerfect" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a perfect number.

A perfect number is one that equals the sum of its positive divisors excluding itself. For example, 28 is perfect since 1 + 2 + 4 + 7 + 14 = 28.

See also: [Perfect number - Wikipedia](https://en.wikipedia.org/wiki/Perfect_number)

```json
["IsPerfect", 28]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsHappy
</nav>

<FunctionDefinition name="IsHappy">
<Signature name="IsHappy" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is a happy number.

A happy number is defined by iterating the sum of the squares of its digits; if this process eventually reaches 1, the number is happy. For example, 19 is happy because: 1²+9²=82; 8²+2²=68; 6²+8²=100; 1²+0²+0²=1.

See also: [Happy number - Wikipedia](https://en.wikipedia.org/wiki/Happy_number)

```json
["IsHappy", 19]
// ➔ "True"
```
</FunctionDefinition>


<nav className="hidden">
### IsAbundant
</nav>

<FunctionDefinition name="IsAbundant">
<Signature name="IsAbundant" returns="boolean">n: integer</Signature>
Returns `"True"` if $n$ is an abundant number.

An abundant number is one where the sum of its proper divisors exceeds the number itself. For example, 12 is abundant since 1 + 2 + 3 + 4 + 6 = 16 > 12.

See also: [Abundant number - Wikipedia](https://en.wikipedia.org/wiki/Abundant_number)

```json
["IsAbundant", 12]
```
</FunctionDefinition>
