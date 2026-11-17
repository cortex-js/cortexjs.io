---
title: Combinatorics Reference
sidebar_label: Combinatorics
slug: /reference/combinatorics/
description: "The combinatorics library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from combinatorics.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Combinatorics

The 12 definitions of the combinatorics library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### bellNumber

`(integer, number?) -> number`

Compute the Bell number B(n), the number of partitions of a set of n elements. With a second operand, `BellNumber(n, x)` is the Bell (Touchard) polynomial `B_n(x)`, with `B_n(1) = BellNumber(n)`.

The Bell numbers follow the recurrence

$$
B(n) = \sum_{k=0}^{n-1} \binom{n-1}{k} B(k), \quad B(0) = 1
$$

For example, the 5 partitions of `{1, 2, 3}` are `{{1, 2, 3}}`,
`{{1, 2}, {3}}`, `{{1, 3}, {2}}`, `{{2, 3}, {1}}` and `{{1}, {2}, {3}}`.

```epsil
[bellNumber(3), bellNumber(4), bellNumber(5), bellNumber(0)]
// ➔ [5,15,52,1]
```

The Bell (Touchard) polynomial `bellNumber(n, x)` is
$\sum_k S(n, k)\, x^k$, where $S(n, k)$ is the number of partitions of a
set of `n` elements into `k` parts:

```epsil
bellNumber(4, x)
// ➔ x^4 + 6x^3 + 7x^2 + x
```

See also: [Bell number](https://en.wikipedia.org/wiki/Bell_number).

<MathJson name="BellNumber">

`["BellNumber", n]`, `["BellNumber", n, x]`.

```json example
["BellNumber", 3]
// ➔ 5
```

</MathJson>

### binomial

`(complex | infinity, complex | infinity) -> number`

Compute the binomial coefficient C(n, k) = n! / (k! (n-k)!). Agrees with Choose for all defined values.

$$
\binom{n}{k} = \frac{n!}{k!\,(n-k)!}
$$

It is 0 when `k` is below 0 or above `n`, and 1 when `k` is 0 or `n`. For
a symbolic `n`, `binomial(n, n)` is 1 and `binomial(n, n - 1)` is `n`.

```epsil
[binomial(6, 2), binomial(6, 7), binomial(6, -1), binomial(6, 6)]
// ➔ [15,0,0,1]
binomial(6, 2) == 6! / (2! * 4!)
// ➔ "True"
[binomial(n, n), binomial(n, n - 1)]
// ➔ [1,n]
```

See also: [Binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient).

<MathJson name="Binomial" latex={["\\binom"]}>

`["Binomial", n, k]`. In LaTeX: `\binom{n}{k}`.

```json example
["Binomial", 6, 2]
// ➔ 15
```

</MathJson>

### cartesianProduct

`(set<any>+) -> set`

Return the Cartesian product of input sets.

The Cartesian product $A \times B$ is the set of the ordered tuples
`(a, b)` with `a` in `A` and `b` in `B`; with more sets, a tuple has one
component for each set. Each operand must be a set: a list or a range is
a type error.

The product is a lazy collection: it stays as written, and its elements
are computed when they are read. `count` and `in` answer without listing
the elements, and the spread `...` lists them:

```epsil
[...cartesianProduct({1, 2}, {a, b})]
// ➔ [(1, a),(1, b),(2, a),(2, b)]
[count(cartesianProduct({1, 2}, {3, 4}, {5, 6, 7}))]
// ➔ [12]
(1, 3) in cartesianProduct({1, 2}, {3, 4})
// ➔ "True"
cartesianProduct([1, 2], [3, 4])
// ➔ error: Type error: expected `set`, got `vector<integer^2>` at `[1, 2]` in `cartesianProduct([1, 2], [3, 4])`
```

See also: [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product).

<MathJson name="CartesianProduct">

`["CartesianProduct", set1, set2, ...]`. In LaTeX, `A \times B` is read as
a `Multiply`, not as a Cartesian product; `CartesianProduct` is written
`\mathrm{CartesianProduct}(A, B)`.

```json example
["Count", ["CartesianProduct", ["Set", 1, 2], ["Set", "a", "b"]]]
// ➔ 4
```

</MathJson>

### choose

`(n: complex | infinity, m: complex | infinity) -> number`

Binomial coefficient: number of ways to choose k items from n. Agrees with Binomial for all defined values.

The **binomial coefficient** "n choose m" is the number of ways to select
`m` elements from a set of `n` elements, without regard to order:

$$
\binom{n}{m} = \frac{n!}{m!\,(n-m)!}
$$

```epsil
choose(5, 2)
// ➔ 10
```

`choose` is the generalized binomial coefficient. For a non-negative
integer `n`, an `m` below 0 or above `n` gives 0. A negative `n` follows
the falling-factorial extension, a symbolic `n` gives a polynomial in `n`,
and a floating-point `n` gives a floating-point number:

```epsil
[choose(5, 7), choose(5, -1), choose(-1, 0), choose(-3, 2)]
// ➔ [0,0,1,6]
choose(n, 2)
// ➔ (n * (n - 1)) / 2
choose(5.5, 2)
// ➔ 12.375
```

See also: [Binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient).

<MathJson name="Choose">

`["Choose", n, m]`. In LaTeX, `\binom{n}{m}` is read as `Binomial`, which
has the same values; `Choose` is written `\mathrm{Choose}(n, m)`.

```json example
["Choose", 5, 2]
// ➔ 10
```

</MathJson>

### combinations

`((S, integer) -> list<string> where S: string) & ((collection, integer) -> list<list>)`

Return all k-element combinations of a collection.

A combination is a subset in which order does not matter. The elements of
each combination keep their order in the collection. A `k` above the
length gives no combination, and a `k` of 0 gives one empty combination.
The combinations of a string are strings.

```epsil
combinations([1, 2, 3], 2)
// ➔ [[1,2],[1,3],[2,3]]
combinations("abcd", 2)
// ➔ ["ab","ac","ad","bc","bd","cd"]
[combinations([1, 2, 3], 4), combinations([1, 2, 3], 0)]
// ➔ [[],[[]]]
```

The result is a lazy collection: `count` and an index do not list the
combinations.

```epsil
count(combinations(1..52, 5))
// ➔ 2598960
[combinations(1..10, 3)[1], combinations(1..10, 3)[120]]
// ➔ [[1,2,3],[8,9,10]]
```

See also: [Combination](https://en.wikipedia.org/wiki/Combination).

<MathJson name="Combinations">

`["Combinations", collection, k]`.

```json example
["Combinations", ["List", 1, 2, 3], 2]
```

</MathJson>

### fibonacci

`(integer, number?) -> number`

Compute the nth Fibonacci number. With a second operand, `Fibonacci(n, x)` is the Fibonacci polynomial `F_n(x)`, with `F_n(1) = Fibonacci(n)`.

The Fibonacci numbers start with $F_0 = 0$ and $F_1 = 1$, and each next
number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, …

```epsil
[fibonacci(7), fibonacci(10), fibonacci(100)]
// ➔ [13,55,354224848179261915075]
```

A negative index follows the standard extension to the negative
integers, $F_{-n} = (-1)^{n+1} F_n$:

```epsil
[fibonacci(-7), fibonacci(-8)]
// ➔ [13,-21]
```

The **Fibonacci polynomials** of `fibonacci(n, x)` follow the recurrence
$F_n(x) = x F_{n-1}(x) + F_{n-2}(x)$, with $F_0 = 0$ and $F_1 = 1$. A
polynomial of an index above 1000 stays unevaluated:

```epsil
fibonacci(5, x)
// ➔ x^4 + 3x^2 + 1
fibonacci(1001, x)
// ➔ Fibonacci(1001, x)
```

See also: [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

<MathJson name="Fibonacci">

`["Fibonacci", n]`, `["Fibonacci", n, x]`. In LaTeX:
`\mathrm{Fibonacci}(n)`.

```json example
["Fibonacci", 7]
// ➔ 13
["Fibonacci", 5, "x"]
// ➔ ["Add", ["Power", "x", 4], ["Multiply", 3, ["Power", "x", 2]], 1]
```

</MathJson>

### integerPartitions

`(integer, any?, list<integer>?, integer?) -> list<list<integer>>`

Return the partitions of n, each a list of its positive parts in non-increasing order, in reverse lexicographic order. The second operand limits the number of parts: `IntegerPartitions(n, k)` keeps those of at most k parts, a list `[k]` exactly k parts, and `[kmin, kmax]` or `[kmin, kmax, step]` a range of numbers of parts (kmax may be `Infinity`, and `All` is no limit). `IntegerPartitions(n, kspec, [s1, s2, ...])` draws the parts from the given positive integers, and a fourth operand m keeps the first m partitions. There is no partition of a negative n, and the only one of 0 is the empty list.

```epsil
integerPartitions(4)
// ➔ [[4],[3,1],[2,2],[2,1,1],[1,1,1,1]]
```

```epsil
integerPartitions(8, [3])
// ➔ [[6,1,1],[5,2,1],[4,3,1],[4,2,2],[3,3,2]]
```

```epsil
count(integerPartitions(100, 100, [1, 5, 10, 25, 50]))
// ➔ 292
```

A bound on the number of parts, or a part size, that is not an integer
leaves the call unevaluated:

```epsil
integerPartitions(6, 2.5)
// ➔ IntegerPartitions(6, 2.5)
integerPartitions(6, oo, [1, 2], 2)
// ➔ [[2,2,2],[2,2,1,1]]
```

The result is a lazy collection. `count` of the partitions of `n` is
`nPartition(n)`, computed without listing the partitions, and an index
reads a position directly:

```epsil
[count(integerPartitions(100)), nPartition(100)]
// ➔ [190569292,190569292]
integerPartitions(100)[1000]
// ➔ [83,8,3,3,3]
```

See also: [Integer partition](https://en.wikipedia.org/wiki/Integer_partition),
[`nPartition`](/reference/number-theory/#npartition).

<MathJson name="IntegerPartitions">

`["IntegerPartitions", n]`, `["IntegerPartitions", n, kspec]`,
`["IntegerPartitions", n, kspec, parts]`,
`["IntegerPartitions", n, kspec, parts, m]`. In `kspec`, `PositiveInfinity`
or `All` is no limit.

```json example
["IntegerPartitions", 6, ["List", 2]]
```

</MathJson>

### multinomial

`(integer+) -> integer`

Compute the multinomial coefficient for multiple integers.

The multinomial coefficient of the group sizes $k_1, k_2, \ldots$ is the
number of ways to divide a set of $n = k_1 + k_2 + \cdots$ elements into
groups of these sizes. It extends the binomial coefficient to more than
two groups.

$$
\binom{k_1 + \cdots + k_m}{k_1, \ldots, k_m} = \frac{(k_1 + \cdots + k_m)!}{k_1! \cdots k_m!}
$$

```epsil
[multinomial(2, 1), multinomial(2, 2, 1), multinomial(1, 1, 1)]
// ➔ [3,30,6]
multinomial(2, 2, 1) == 5! / (2! * 2! * 1!)
// ➔ "True"
```

See also: [Multinomial theorem](https://en.wikipedia.org/wiki/Multinomial_theorem).

<MathJson name="Multinomial">

`["Multinomial", k1, k2, ...]`.

```json example
["Multinomial", 2, 1]
// ➔ 3
```

</MathJson>

### permutations

`((S, integer?) -> list<string> where S: string) & ((collection, integer?) -> list<list>)`

Return all permutations of length k (default full length) of a collection.

A permutation is an ordered arrangement of elements. Without `k`, the
permutations have the length of the collection. A `k` above that length
gives no permutation, and a `k` of 0 gives one empty permutation. The
permutations of a string are strings. Equal elements are not merged: each
arrangement is listed once for each position the elements come from.

```epsil
permutations([1, 2, 3])
// ➔ [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
permutations("abc")
// ➔ ["abc","acb","bac","bca","cab","cba"]
[permutations([1, 2, 3], 4), permutations([1, 2, 3], 0)]
// ➔ [[],[[]]]
permutations([1, 1, 2])
// ➔ [[1,1,2],[1,2,1],[1,1,2],[1,2,1],[2,1,1],[2,1,1]]
```

The result is a lazy collection: `count`, an index and `indexOf` compute
their answer from the position, without listing the arrangements, so they
work on collections with factorially many elements:

```epsil
[count(permutations(1..20)), count(permutations(1..10, 3))]
// ➔ [2432902008176640000,720]
indexOf(permutations([1, 2, 3]), [2, 3, 1])
// ➔ 4
```

See also: [Permutation](https://en.wikipedia.org/wiki/Permutation).

<MathJson name="Permutations">

`["Permutations", collection]`, `["Permutations", collection, k]`.

```json example
["Permutations", ["List", 1, 2, 3], 2]
```

</MathJson>

### pochhammer

MathJSON `Pochhammer` · `(complex | infinity, complex | infinity) -> number`

Rising factorial (Pochhammer symbol) (a)_k = a(a+1)…(a+k-1).

### powerSet

`(set<any>) -> set`

Return the power set of a set (set of all subsets).

The power set of a set is the set of all its subsets, including the empty
set and the set itself. A set of `n` elements has $2^n$ subsets.

The power set is a lazy collection: it stays as written, and `count` and
`in` answer without listing the $2^n$ subsets. A subset is a member
whatever the order of its elements:

```epsil
[count(powerSet({1, 2, 3})), count(powerSet({}))]
// ➔ [8,1]
[{2, 1} in powerSet({1, 2, 3}), {4} in powerSet({1, 2, 3})]
// ➔ ["True","False"]
```

See also: [Power set](https://en.wikipedia.org/wiki/Power_set).

<MathJson name="PowerSet">

`["PowerSet", set]`. The empty subset is the symbol `EmptySet`. In LaTeX:
`\mathrm{PowerSet}(A)`; `\mathcal{P}(A)` is not read as a power set.

```json example
["Count", ["PowerSet", ["Set", "a", "b"]]]
// ➔ 4
```

</MathJson>

### subfactorial

`(integer) -> integer`

Compute the number of derangements (subfactorial) of n items.

A derangement is a permutation in which no element stays in its original
position, as in the hat-check problem. The number of derangements of `n`
elements is

$$
!n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}
$$

```epsil
[subfactorial(4), subfactorial(5), subfactorial(0), subfactorial(1)]
// ➔ [9,44,1,0]
subfactorial(5) == 5! * (1 - 1 + 1/2 - 1/6 + 1/24 - 1/120)
// ➔ "True"
```

A negative or symbolic `n` stays unevaluated:

```epsil
[subfactorial(-1), subfactorial(n)]
// ➔ [Subfactorial(-1),Subfactorial(n)]
```

See also: [Derangement](https://en.wikipedia.org/wiki/Derangement).

<MathJson name="Subfactorial">

`["Subfactorial", n]`. The LaTeX `!n` is not read as a subfactorial.

```json example
["Subfactorial", 4]
// ➔ 9
```

</MathJson>
