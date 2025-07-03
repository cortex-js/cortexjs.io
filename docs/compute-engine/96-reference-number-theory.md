---
title: Number Theory
slug: /compute-engine/reference/number-theory/
---

# Number Theory

The functions in this section provide tools for number-theoretic computations:  
divisor functions, partitions, polygonal numbers, perfect/happy numbers, and special combinatorial counts (Eulerian, Stirling).


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
### Eulerian
</nav>

<FunctionDefinition name="Eulerian">
<Signature name="Eulerian" returns="integer">n: integer, m: integer</Signature>
Returns the <b>Eulerian number</b> A(n, m), counting permutations of {1..n} with exactly m ascents.

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
