<!-- The detail of the entries of /reference/combinatorics/. Format: README.md. -->

## Choose

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

### MathJSON

`["Choose", n, m]`. In LaTeX, `\binom{n}{m}` is read as `Binomial`, which
has the same values; `Choose` is written `\mathrm{Choose}(n, m)`.

```json example
["Choose", 5, 2]
// ➔ 10
```

## Fibonacci

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

### MathJSON

`["Fibonacci", n]`, `["Fibonacci", n, x]`. In LaTeX:
`\mathrm{Fibonacci}(n)`.

```json example
["Fibonacci", 7]
// ➔ 13
["Fibonacci", 5, "x"]
// ➔ ["Add", ["Power", "x", 4], ["Multiply", 3, ["Power", "x", 2]], 1]
```

## Binomial

$$
\binom{n}{k} = \frac{n!}{k!\,(n-k)!}
$$

It is 0 when `k` is below 0 or above `n`, and 1 when `k` is 0 or `n`. For
a symbolic `n`, `binomial(n, n)` is 1 and `binomial(n, n - 1)` is `n`.

```epsil
[binomial(6, 2), binomial(6, 7), binomial(6, -1), binomial(6, 6)]
// ➔ [15,0,0,1]
binomial(6, 2) == 6! / (2! * 4!)
// ➔ true
[binomial(n, n), binomial(n, n - 1)]
// ➔ [1,n]
```

See also: [Binomial coefficient](https://en.wikipedia.org/wiki/Binomial_coefficient).

### MathJSON

`["Binomial", n, k]`. In LaTeX: `\binom{n}{k}`.

```json example
["Binomial", 6, 2]
// ➔ 15
```

## CartesianProduct

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
// ➔ true
cartesianProduct([1, 2], [3, 4])
// ➔ error: Type error: expected `set`, got `vector<integer^2>` at `[1, 2]` in `cartesianProduct([1, 2], [3, 4])`
```

See also: [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product).

### MathJSON

`["CartesianProduct", set1, set2, ...]`. In LaTeX, `A \times B` is read as
a `Multiply`, not as a Cartesian product; `CartesianProduct` is written
`\mathrm{CartesianProduct}(A, B)`.

```json example
["Count", ["CartesianProduct", ["Set", 1, 2], ["Set", "a", "b"]]]
// ➔ 4
```

## PowerSet

The power set of a set is the set of all its subsets, including the empty
set and the set itself. A set of `n` elements has $2^n$ subsets.

The power set is a lazy collection: it stays as written, and `count` and
`in` answer without listing the $2^n$ subsets. A subset is a member
whatever the order of its elements:

```epsil
[count(powerSet({1, 2, 3})), count(powerSet({}))]
// ➔ [8,1]
[{2, 1} in powerSet({1, 2, 3}), {4} in powerSet({1, 2, 3})]
// ➔ [true,false]
```

See also: [Power set](https://en.wikipedia.org/wiki/Power_set).

### MathJSON

`["PowerSet", set]`. The empty subset is the symbol `EmptySet`. In LaTeX:
`\mathrm{PowerSet}(A)`; `\mathcal{P}(A)` is not read as a power set.

```json example
["Count", ["PowerSet", ["Set", "a", "b"]]]
// ➔ 4
```

## Permutations

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

### MathJSON

`["Permutations", collection]`, `["Permutations", collection, k]`.

```json example
["Permutations", ["List", 1, 2, 3], 2]
```

## Combinations

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

### MathJSON

`["Combinations", collection, k]`.

```json example
["Combinations", ["List", 1, 2, 3], 2]
```

## IntegerPartitions

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

### MathJSON

`["IntegerPartitions", n]`, `["IntegerPartitions", n, kspec]`,
`["IntegerPartitions", n, kspec, parts]`,
`["IntegerPartitions", n, kspec, parts, m]`. In `kspec`, `PositiveInfinity`
or `All` is no limit.

```json example
["IntegerPartitions", 6, ["List", 2]]
```

## Multinomial

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
// ➔ true
```

See also: [Multinomial theorem](https://en.wikipedia.org/wiki/Multinomial_theorem).

### MathJSON

`["Multinomial", k1, k2, ...]`.

```json example
["Multinomial", 2, 1]
// ➔ 3
```

## Subfactorial

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
// ➔ true
```

A negative or symbolic `n` stays unevaluated:

```epsil
[subfactorial(-1), subfactorial(n)]
// ➔ [Subfactorial(-1),Subfactorial(n)]
```

See also: [Derangement](https://en.wikipedia.org/wiki/Derangement).

### MathJSON

`["Subfactorial", n]`. The LaTeX `!n` is not read as a subfactorial.

```json example
["Subfactorial", 4]
// ➔ 9
```

## BellNumber

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

### MathJSON

`["BellNumber", n]`, `["BellNumber", n, x]`.

```json example
["BellNumber", 3]
// ➔ 5
```
