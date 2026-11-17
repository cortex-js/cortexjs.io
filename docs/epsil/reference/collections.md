---
title: Collections Reference
sidebar_label: Collections
slug: /reference/collections/
description: "The collections library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from collections.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Collections

A **collection** groups several elements into one value. This page lists
every operation on collections. This introduction gives the concepts you need
before you read the entries: the kinds of collection, indexed and non-indexed
collections, finite and infinite collections, lazy and eager collections, and
element types.

## Kinds of collection

| Kind         | Epsil literal          | Description                                                 |
| :----------- | :--------------------- | :---------------------------------------------------------- |
| list         | `[1, 2, 3]`            | Elements in order, read by index. Duplicates are allowed.  |
| set          | `{1, 2, 3}`            | Unique elements, not in order.                              |
| tuple        | `(1, "a")`             | A fixed number of elements, each with its own type.         |
| dictionary   | `{"a" -> 1, "b" -> 2}` | Key-value pairs. The keys are strings.                      |
| range        | `1..10`                | Numbers from a start to an end, with an optional step.      |
| string       | `"hello"`              | The characters of the text, in order.                       |

A set literal removes duplicates and stores its elements in the canonical
order, so two sets with the same elements are written, printed and walked
alike. The empty set is `{}`, and the empty dictionary is `{->}`:

```epsil
{3, 1, 3, 2}
// ➔ Set(1, 2, 3)
```

Collections are **immutable**. An operation never changes a collection: it
returns a new one.

```epsil
let xs = [1, 2, 3]
let ys = append(xs, 4)
xs
// ➔ [1, 2, 3]
```

A string is a collection of its characters, so `length`, `reverse`, `sort`,
`filter` and most other operations apply to it. An operation that selects or
reorders the characters of a string (`reverse`, `take`, `sort`, `unique`,
`filter`) returns a string. An operation that transforms the elements (`map`,
`flatMap`, `scan`, `zip`) returns a list.

```epsil
reverse("stressed")
// ➔ "desserts"
```

```epsil
filter("banana", c => c != "a")
// ➔ "bnn"
```

## Indexed and non-indexed collections

An **indexed** collection has its elements in a fixed order, and you can read
an element by its position. Lists, tuples, ranges and strings are indexed.

A **non-indexed** collection has no positions. You can enumerate its elements
and test membership, but you cannot read an element by index. Sets and
dictionaries are non-indexed. You read a dictionary value by its key.

The first element has index `1`. A negative index counts from the end of a
finite collection: `-1` is the last element, `-2` the element before it.

```epsil
[2, 5, 7, 11][3]
// ➔ 7
```

```epsil
[2, 5, 7, 11][-3]
// ➔ 5
```

```epsil
{a -> 1, b -> 2}["b"]
// ➔ 2
```

An index that is out of range does not stop the program. It gives an absence
marker: `NaN` when the elements are numbers, `Missing` otherwise. See
[at](#at) for the details.

Membership works on every collection:

```epsil
3 in {1, 2, 3}
// ➔ True
```

## Nested collections

The elements of a collection are its **top-level** elements. A matrix (a list
of lists) is a collection of rows. So `count` of a matrix is its number of
rows, and `first` is its first row:

```epsil
count([[2, 3, 4], [6, 7, 9]])
// ➔ 2
```

```epsil
first([[2, 3, 4], [6, 7, 9]])
// ➔ [2, 3, 4]
```

To read one entry of a nested collection, give one index per level:

```epsil
[[2, 3, 4], [6, 7, 9]][2, 3]
// ➔ 9
```

The [Linear Algebra](/reference/linear-algebra/) page has the
operations on vectors, matrices and tensors.

## Finite and infinite collections

A collection can be **finite** (it has a definite number of elements) or
**infinite**. `1..oo` is the positive integers, and the number sets such as
`integers`, `realNumbers` and `primes` are infinite sets.

```epsil
count(1..oo)
// ➔ +oo
```

## Lazy and eager collections

An **eager** collection has all its elements computed when it is made. The
list, set, tuple and dictionary literals are eager.

A **lazy** collection computes an element only when something reads it. A
range, `map`, `filter`, `take`, a comprehension, `cycle`, `iterate` and
`repeat` make lazy collections. Because of this, you can work with an
infinite collection when you read only a finite part of it:

```epsil
1..oo |> filter(isPrime) |> take(10) |> listFrom
// ➔ [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

Only the first ten primes are computed here. The elements of a lazy
collection are computed on the first read and kept, so a second read of the
same collection does not compute them again. The kept elements are computed
again when a value they depend on changes.

**To materialize** a lazy collection, that is to compute all its elements and
make an eager collection, use [listFrom](#listfrom) or [setFrom](#setfrom):

```epsil
listFrom(1..10)
// ➔ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

When a lazy collection is printed, only its first elements are computed. An
ellipsis shows that more elements follow:

```epsil
map(x => x^2, 1..oo)
// ➔ [1, 4, 9, 16, 25, …]
```

### Use a range, not a number set, as an infinite indexed source

`integers` and the other number sets are **sets**. They have no order and no
indexes. The operations that need an indexed collection (`at`, `take`,
`drop`, `first`, `second`, `third`, `last`, `rest`, `most`) reject them with
an `incompatible-type` error. `filter` keeps the kind of its source, so
`filter(integers, x => x > 0)` is a set too.

For an infinite source that you can index and take from, use `1..oo`. To test
membership in a number set, use `in`:

```epsil
filter(1..30, x => x in primes)
// ➔ [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

### The materialization cap

The engine setting `maxCollectionSize` (default `10000`) limits how many
elements a lazy collection can have when the engine changes it into a list
by itself, for example to print or evaluate a result. Such an automatic
conversion keeps the lazy form when the list would be larger. You can still
read the elements one at a time, and operations such as `length` still work.
An explicit conversion with `listFrom` or `setFrom` does not check the
setting: `listFrom(1..20000)` makes the whole list.

```epsil
repeat(7, 3)
// ➔ [7, 7, 7]
```

```epsil
repeat(7, 20000)
// ➔ Repeat(7, 20000)
```

```epsil
length(repeat(7, 20000))
// ➔ 20000
```

The cap applies only to materialization. An operation applied to each element
of a lazy collection (such as `+` over a range) is not limited by it.

## Element types

The type of a collection includes the type of its elements: `list<integer>`,
`set<string>`, `tuple<integer, string>`, `dictionary<number>`. A dictionary
with a fixed set of known keys has a record type, such as
`record{x: integer}`. A list of numbers with a known length has a vector type,
such as `vector<integer^3>`.

```epsil
(type([1, 2, 3]), type({1, 2}), type((1, "a")), type({x -> 1}))
// ➔ (TypeFrom("vector<integer^3>"), TypeFrom("set<integer>"), TypeFrom("tuple<integer, string>"), TypeFrom("record{x: integer}"))
```

When the elements have different types, the element type is their union:

```epsil
type(["a", 1])
// ➔ TypeFrom("list<integer | string>")
```

In a signature, `collection` means any collection, indexed or not, finite or
infinite. `indexed_collection` means a collection that you can read by index,
such as a list, a tuple, a range or a string.

## Functions as arguments

Many operations take a function: a predicate for `filter`, `any` or
`countIf`, a key for `sort` or `groupBy`, a reducer for `reduce`. You can
write it as an anonymous function, `x => x > 5`, or as an expression with the
placeholder `_`, `_ > 5`:

```epsil
countIf([5, 2, 10, 18], _ > 5)
// ➔ 2
```

The pipe `|>` passes a collection to the next operation, so a sequence of
operations reads from left to right. The collection fills the argument slot
the operation is missing: `xs |> filter(isPrime)` is `filter(xs, isPrime)`,
and `xs |> map(f)` is `map(f, xs)`, because the function is `map`'s first
argument. A
[comprehension](/syntax/#comprehensions) is another way to make a
filtered and transformed list:

```epsil
1..10 |> filter(isPrime) |> map(x => x^2)
// ➔ [4, 9, 25, 49]
```

```epsil
[x^2 for x in 1..10 if x % 2 == 1]
// ➔ [1, 9, 25, 49, 81]
```

See [Pipe](/operators/#pipe) for the complete rules of the pipe.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### adjoin

MathJSON `Adjoin` · `(set<any>, any+) -> set`

The ring obtained by adjoining one or more elements to a base ring.

`Adjoin(Integers, Sqrt(2))` is ℤ[√2]; `Adjoin(Integers, ["Complex", 0, 1])` is the Gaussian integers ℤ[i]; `Adjoin(Integers, "x")` is the polynomial ring ℤ[x].

Inert: the adjunction is not expanded, and membership in it is not decided.

```epsil
adjoin(integers, sqrt(2))
// ➔ Adjoin("Integers", sqrt(2))
```

### all

`(collection<T>, predicate: ((T) any -> boolean)?) -> boolean where T`

Return True if the predicate holds for every element of the collection (or if every element is True when no predicate is given).

```epsil
all([2, 4, 6], x => x % 2 == 0)
// ➔ "True"
```

Without a predicate, the elements are read as booleans. `all` stops at the
first element that fails the predicate, so it can answer `False` for an
infinite collection.

```epsil
all([1, 2, 3], x => x > 2)
// ➔ "False"
all(1..oo, x => x < 5)
// ➔ "False"
```

`all` of an empty collection is `True`. When the answer depends on elements
that cannot be decided, `all` stays unevaluated.

```epsil
all([])
// ➔ "True"
all([a, b], x => x > 0)
// ➔ All([a,b], (x) => 0 < x)
```

<MathJson name="All">

`["All", xs]`, `["All", xs, predicate]`.

```json example
["All", ["List", 1, 2, 3], ["Function", ["Greater", "x", 0], "x"]]
// ➔ "True"

["All", ["Range", 1, "PositiveInfinity"], ["Function", ["Less", "x", 5], "x"]]
// ➔ "False"
```

</MathJson>

### any

`(collection<T>, predicate: ((T) any -> boolean)?) -> boolean where T`

Return True if the predicate holds for at least one element of the collection (or if any element is True when no predicate is given).

To test membership of a specific value, use `Contains(xs, v)` — the structural-identity specialization `Any(xs, (e) => e === v)`.

```epsil
any([1, 3, 4], x => x % 2 == 0)
// ➔ "True"
```

Without a predicate, the elements are read as booleans. `any` stops at the
first element that satisfies the predicate, so it can answer `True` for an
infinite collection.

```epsil
any([False, True, False])
// ➔ "True"
any(1..oo, x => x > 5)
// ➔ "True"
```

`any` of an empty collection is `False`. When the answer depends on
elements that cannot be decided, `any` stays unevaluated.

```epsil
any([])
// ➔ "False"
any([a, b], x => x > 0)
// ➔ Any([a,b], (x) => 0 < x)
```

To test whether a collection holds one value, use
[`contains`](#contains), which compares by structural identity, not with the
tolerant `==`.

<MathJson name="Any">

`["Any", xs]`, `["Any", xs, predicate]`.

```json example
["Any", ["List", 1, 2, 3], ["Function", ["Greater", "x", 2], "x"]]
// ➔ "True"

["Any", ["Range", 1, "PositiveInfinity"], ["Function", ["Greater", "x", 5], "x"]]
// ➔ "True"
```

</MathJson>

### append

`(collection<any>, any+) -> collection`

Add one or more elements to the end of a collection.

```epsil
append([1, 2], 3, 4)
// ➔ [1,2,3,4]
```

Collections are immutable: `append` returns a new collection and does not
change its argument.

<MathJson name="Append">

`["Append", xs, element, …]`.

```json example
["Append", ["List", 1, 2], 3]
// ➔ ["List", 1, 2, 3]
```

</MathJson>

### argMax

`(indexed_collection<T>, key: ((T) any -> unknown)?) -> integer where T`

Return the 1-based index of the element that maximizes the given key function (or the element itself when no key is given).

```epsil
argMax([3, 9, 2])
// ➔ 2
```

With a key function, the keys are compared; without one, the elements. On a
tie, the first index wins. `argMax` stays unevaluated on an empty or
infinite collection, or when a comparison cannot be decided.

```epsil
[argMax([5, 2, 10, 18]), argMax([-3, 1, -2], abs)]
// ➔ [4,1]
argMax(1..oo)
// ➔ ArgMax(Range(1, +oo))
```

<MathJson name="ArgMax">

`["ArgMax", xs]`, `["ArgMax", xs, key]`.

```json example
["ArgMax", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

</MathJson>

### argMin

`(indexed_collection<T>, key: ((T) any -> unknown)?) -> integer where T`

Return the 1-based index of the element that minimizes the given key function (or the element itself when no key is given).

```epsil
argMin([3, 9, 2])
// ➔ 3
```

With a key function, the keys are compared; without one, the elements. On a
tie, the first index wins. `argMin` stays unevaluated on an empty or
infinite collection, or when a comparison cannot be decided.

```epsil
[argMin([5, 2, 10, 18]), argMin([-3, 1, -2], abs)]
// ➔ [2,2]
```

<MathJson name="ArgMin">

`["ArgMin", xs]`, `["ArgMin", xs, key]`.

```json example
["ArgMin", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 2
```

</MathJson>

### At

`(value: any, index: (boolean | character | indexed_collection<any> | number | string)+) -> unknown`

Access an element of an indexed collection.

If the index is negative, it is counted from the end.

Multiple indices can be provided to access nested collections (e.g., matrices).

If the index is a finite collection of booleans, returns the elements where the mask is True (a mask is a filter over the positions up to the shorter of the mask and the collection; a `Missing` or `NaN` member keeps nothing).

If the index is a finite collection of integers, returns the elements at those indices, preserving position: an out-of-range index yields the absence marker, it is not dropped.

Out-of-band access (an out-of-range index, or a dictionary key that is not present) yields a POSITION-PRESERVING marker: `NaN` when the collection’s elements are numeric, `Missing` otherwise. It never yields `Nothing`, which would erase the position.

An index that is provably not an integer (`2.5`, `3/2`, `5 + √17`), as a scalar or as an entry of an index list, selects no element and yields the same marker. An index that cannot be decided (an unknown, an exact constant within rounding of an integer) leaves `At` unevaluated.

```epsil
[10, 20, 30][2]
// ➔ 20
```

```epsil
[10, 20, 30][-1]
// ➔ 30
```

`xs[i]` is `At(xs, i)`. Indexes start at 1, and a negative index counts from
the end, -1 being the last element.

#### Several indexes

With several indexes, they are applied in order, one level of nesting each:
`m[2, 1]` and `m[2][1]` select the same element of a matrix. Indexing a matrix
once gives a row, which can be indexed again.

```epsil
[[1, 2], [3, 4]][2, 1]
// ➔ 3
[[1, 2], [3, 4]][2][1]
// ➔ 3
```

#### A list of indexes or a mask

When the index is a list of integers, the result is the list of the elements
at those positions. An out-of-range position gives the absence marker in its
place.

```epsil
[10, 20, 30, 40, 50][[1, 3, 5]]
// ➔ [10,30,50]
[10, 20, 30, 40, 50][[1, 3, 9]]
// ➔ [10,30,NaN]
```

When the index is a list of booleans, it is a mask: the result is the
elements where the mask is `True`, in order. The mask is read up to the
shorter of its length and the length of the collection: a shorter mask keeps
nothing past its end, and a longer one is read only as far as the collection
goes. A `Missing` or `NaN` member keeps nothing, as `False` does.

```epsil
[10, 20, 30, 40][[True, False, True, False]]
// ➔ [10,30]
[10, 20, 30, 40][[True, False, True]]
// ➔ [10,30]
[10, 20, 30][[False, True, False, True, True]]
// ➔ [20]
[10, 20, 30, 40][[True, Missing, True, NaN]]
// ➔ [10,30]
```

An index with a member that is neither a boolean nor `Missing` or `NaN` is a
list of indexes. So is an index of `Missing` and `NaN` members only: it gives
an absence marker for each member.

```epsil
[10, 20, 30][[1, Missing]]
// ➔ [10,NaN]
[10, 20, 30][[Missing, NaN]]
// ➔ [NaN,NaN]
```

#### Out-of-range index

An index outside the collection, including `0`, is not an error. The result
is an **absence marker** drawn from the element type: `NaN` for a numeric
collection, a point whose coordinates are all `NaN` for a collection of
points, and `Missing` otherwise. `first` and `last` of an empty collection
are out of range too.

```epsil
[5, 2, 10, 18][99]
// ➔ NaN
["a", "b"][99]
// ➔ "Missing"
[(1, 2), (3, 4)][5]
// ➔ (NaN, NaN)
first([])
// ➔ "Missing"
```

The marker is not part of the static type of an access: the engine cannot in
general know that an index is in range, and the type describes the values
that are present. When the index is a literal that is provably out of range,
the type is the type of the marker.

```epsil
function f(n) { type([5, 2, 10, 18][n]) }
f(1)
// ➔ TypeFrom("integer")
type([5, 2, 10, 18][99])
// ➔ TypeFrom("nan")
type(["a", "b"][99])
// ➔ TypeFrom("missing")
```

Test for an absent value with [`isMissing`](/reference/core/#ismissing), or
replace it with [`Coalesce`](/reference/core/#coalesce), before computing on
it. These, and [`AssertPresent`](/reference/core/#assertpresent), read a
point whose coordinates are all `NaN` as absent, as they read `NaN` and
`Missing`. The `x` coordinate of an absent point is `NaN`. See
[Absent values](/reference/core/#absent-values).

```epsil
Coalesce(["a", "b"][99], "none")
// ➔ "none"
let ps = [(1, 2)]; [isMissing(ps[5]), Coalesce(ps[9], (0, 0))]
// ➔ ["True",(0, 0)]
let ps = [(1, 2)]; AssertPresent(ps[5])
// ➔ error: Runtime error: expected present at `At("ps", 5)`
let ps = [(1, 2)]; pointX(ps[5])
// ➔ NaN
```

#### Filtering with a condition

A comparison of a list with a scalar (`<`, `<=`, `>`, `>=`, `==`, `!=`) is
applied to each element and gives a list of booleans. As an index, that list
is a mask, so `L[L > 0]` keeps the positive elements.

```epsil
let L = [-1, 2, -3, 4]; L > 0
// ➔ ["False","True","False","True"]
let L = [-1, 2, -3, 4]; L[L > 0]
// ➔ [2,4]
```

The condition need not be about the filtered list. It can test another list,
which is read as a mask up to the shorter of the two lengths, or the
positions, computed from a range; here, all the elements but the `k`-th:

```epsil
let L = [1, 2, 3, 4, 5]; let K = [1, 0, 1]; L[K == 1]
// ➔ [1,3]
let L = [1, 2, 3, 4, 5]; let k = 2; L[abs((1..length(L)) - k) > 0]
// ➔ [1,3,4,5]
```

A comparison of **two** collections is not elementwise: it compares the whole
values.

```epsil
[1, 2, 3] == [1, 2, 3]
// ➔ "True"
```

#### Indexing a matrix or a tensor

A matrix has one index per axis: the first selects the row and the second
the column, and a tensor of rank 3 takes three indexes. A negative index
counts from the end of its own axis, so `A[2, -1]` is the last element of
the second row, and `A[-1]` is the last row.

```epsil
let A = [[5, 2, 10, 18], [1, 2, 3, 4]]
[A[2, -1], A[-1]]
// ➔ [4,[1,2,3,4]]
[[[1, 2], [3, 4]], [[5, 6], [7, 8]]][2, 1, 2]
// ➔ 6
```

To read a column, index the transpose:

```epsil
transpose([[1, 2], [3, 4]])[2]
// ➔ [2,4]
```

<MathJson name="At" latex={["["]}>

`["At", xs, index]`, `["At", xs, ...indexes]`, `["At", xs, indexes]` (a
collection of integers), `["At", xs, mask]` (a collection of booleans).

```json example
["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10

["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3

["At", ["List", 10, 20, 30, 40], ["List", "True", "False", "True", "False"]]
// ➔ ["List", 10, 30]
```

In LaTeX, the bracket notation `v[n]` is always `["At", "v", "n"]`, and
`L[L>0]` filters `L`. When a symbol is declared with a collection type, a
subscript is an `At` too: with `v` declared `list<number>`, `v_n` is
`["At", "v", "n"]`, `v_{n+1}` is `["At", "v", ["Add", "n", 1]]` and `v_{p,q}`
is `["At", "v", "p", "q"]`. The type of the `At` expression is the element
type of the collection, so `v_n` has type `number` and can be used in
arithmetic. In LaTeX, a bare `i` is the imaginary unit: use another index
symbol, such as `k`.

```json example
["At", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3, 4]], 2, -1]
// ➔ 4
```

In LaTeX, `\mathbf{A}\lbrack 2, 3\rbrack` is `["At", "A_bold", 2, 3]`.

</MathJson>

### chunk

`((S, integer) -> list<string> where S: string) & ((indexed_collection, integer) -> list<list>)`

Split the collection into `k` nearly equal-sized groups. See `Partition` for splitting into fixed-size chunks.

```epsil
chunk([1, 2, 3, 4, 5, 6], 3)
// ➔ [[1,2],[3,4],[5,6]]
```

To split a collection into parts of a given size, use
[`partition`](#partition). From a string, each group is a string.

```epsil
chunk([1, 2, 3, 4, 5], 2)
// ➔ [[1,2,3],[4,5]]
chunk("abcdef", 2)
// ➔ ["abc","def"]
```

<MathJson name="Chunk">

`["Chunk", xs, count]`.

```json example
["Chunk", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5]]
```

</MathJson>

### chunkBy

`((S, key: (character) any -> unknown) -> list<string> where S: string) & ((indexed_collection<T>, key: (T) any -> unknown) -> list<list<T>> where T: any)`

Split the collection into maximal runs of consecutive elements over which the key function yields the same value.

Returns a list of lists. Unlike `GroupBy`, only adjacent elements are grouped, so a key value that recurs after a different run starts a new chunk.

```epsil
chunkBy([1, 3, 2, 4, 5], x => x % 2)
// ➔ [[1,3],[2,4],[5]]
```

From a string, each run is a string, so the result is a `list<string>`. The
same rule holds for `slidingWindow`, `permutations` and `combinations`.

```epsil
chunkBy([1, 1, 2, 2, 2, 1], x => x)
// ➔ [[1,1],[2,2,2],[1]]
chunkBy("aabbc", x => x)
// ➔ ["aa","bb","c"]
```

<MathJson name="ChunkBy">

`["ChunkBy", xs, key]`.

```json example
["ChunkBy", ["List", 1, 1, 2, 2, 2, 1], ["Function", "x", "x"]]
// ➔ ["List", ["List", 1, 1], ["List", 2, 2, 2], ["List", 1]]
```

</MathJson>

### closed

MathJSON `Closed` · `(number) -> number`

Closed(x): the endpoint x of an Interval, marked as included. A marker with no value of its own; Interval normalizes it away.

```epsil
1 in interval(0, closed(1))
// ➔ "True"
```

### complement

`(set<any>+) -> set`

Return the elements of the first set that are not in any of the subsequent sets.

```epsil
listFrom(complement({1, 2, 3, 4}, {2, 4}))
// ➔ [1,3]
```

<MathJson name="Complement" latex={["^{\\complement}"]} />

### complexNumbers

constant `set<complex>`

The set of all finite complex numbers.

```epsil
2 + 3i in complexNumbers
// ➔ "True"
```

<MathJson name="ComplexNumbers" latex={["\\mathbb{C}"]} />

### contains

`(collection<any>, element: any) -> boolean`

Return True if the collection contains the given element (structural identity, like `===`), False otherwise. An absent element is found where the same marker sits: `Contains([1, NaN], NaN)` is True.

Equivalent to `Any(xs, (e) => e === v)`; use `Any` to test an arbitrary predicate instead of a specific value.

```epsil
contains([1, 2, 3], 2)
// ➔ "True"
```

Over a list or a tuple, the comparison is structural identity, as for
[`isSame`](/reference/relop/#issame). To test a predicate instead of one
value, use [`any`](#any).

A symbol with no value is a different expression from a number, even when
the symbol could hold that number, so `contains` answers `False`. To leave
the answer open until the symbols have values, use `in`
([`Element`](#element)), which stays unevaluated:

```epsil
contains([a, b], 3)
// ➔ "False"
3 in [a, b]
// ➔ Element(3, [a,b])
```

Over a set, `contains` is a membership test, as `in` is: two numbers with no
unknowns are compared by value (with the engine's tolerance when one of them
is inexact), and a value with an unknown leaves the answer open.

```epsil
[contains({1, 2, 3}, e), contains({1, 2, 3}, 2.0)]
// ➔ ["False","True"]
contains({1, 2, 3}, x)
// ➔ Contains(Set(1, 2, 3), x)
```

`contains` tests for one element. To test for a run of several consecutive
elements, a sublist or a substring, use
[`containsSequence`](#containssequence).

```epsil
[contains("abc", "ab"), containsSequence("abc", "ab")]
// ➔ ["False","True"]
```

<MathJson name="Contains">

`["Contains", xs, value]`.

```json example
["Contains", ["List", 5, 2, 10, 18], 10]
// ➔ "True"

["Contains", ["Set", 1, 2, 3], "x"]
// ➔ ["Contains", ["Set", 1, 2, 3], "x"]
```

</MathJson>

### containsSequence

`(indexed_collection<T>, indexed_collection<T>) -> boolean where T`

Return `True` when `needle` occurs as a contiguous subsequence of the indexed collection.

Unlike `Contains`, which tests membership of a single element, the needle is read as a sequence: `ContainsSequence("abc", "ab")` is `True` while `Contains("abc", "ab")` is `False`.

```epsil
containsSequence([1, 2, 3, 4], [2, 3])
// ➔ "True"
```

For a needle that is not empty, `containsSequence` is `True` when
[`rangeOf`](#rangeof) does not answer `Missing`. An empty needle is `True`:
the empty sequence is a subsequence of every collection. This is the one
rule that differs from `rangeOf`, which must reject an empty needle because
it returns a span.

```epsil
containsSequence([1, 2, 3], [3, 2])
// ➔ "False"
containsSequence([1, 2, 3], [])
// ➔ "True"
```

<MathJson name="ContainsSequence">

`["ContainsSequence", xs, needle]`.

```json example
["ContainsSequence", ["List", 1, 2, 3], ["List", 2, 3]]
// ➔ "True"
```

</MathJson>

### count

`(collection<any>, any?, any?) -> infinity | integer`

`Count(xs)`: the number of elements in the collection.

`Count(xs, v)`: how many elements are structurally the same as `v`.

`Count(xs, p)`: how many elements satisfy the predicate `p`.

```epsil
count([1, 2, 1, 3, 1], 1)
// ➔ 3
```

With one argument, `count` is the number of elements, as
[`length`](#length) is. Of a matrix (a list of lists), it is the number of
rows.

```epsil
[count([[1, 2], [3, 4]]), count({1, 2}), count("abc")]
// ➔ [2,2,3]
```

#### Counting a value

With a second argument that is not a function, `count` is the number of
elements that are the same as that value. The comparison is structural
identity, as for [`isSame`](/reference/relop/#issame) and
[`contains`](#contains). Numbers compare by exact value, so `0.5` counts as
an occurrence of `1/2`.

```epsil
[count([1, 2, 2, 3, 2], 2), count([1, 2, 2, 3], 5)]
// ➔ [3,0]
count([1/2, 0.5, 1], 1/2)
// ➔ 2
```

A third argument counts the parts equal to the value at some levels of a
nested collection: `n` is the levels 1 to `n`, `[n]` the level `n` only,
`[from, to]` a range of levels, and `oo` every level.

```epsil
count([[1, 1], 1], 1, 2)
// ➔ 3
[count([[1, [1]], 1], 1, [2]), count([[1, [1]], 1], 1, oo)]
// ➔ [1,3]
```

#### Counting with a predicate

With a second argument that is a function, `count` is the number of
elements that satisfy it. The predicate must return `True` or `False` for
each element, as for [`filter`](#filter). An expression with `_` is a
predicate; a value without `_`, such as `True`, is counted as a value.

```epsil
count([1, 2, 3, 4, 5], _ > 2)
// ➔ 3
count([True, False, True], True)
// ➔ 2
```

The forms with two or three arguments need a finite collection; over an
unbounded one, `count` stays unevaluated.

```epsil
count(1..oo, 2)
// ➔ Count(Range(1, +oo), 2)
```

<MathJson name="Count">

`["Count", xs]`, `["Count", xs, value]`, `["Count", xs, value, levels]`,
`["Count", xs, predicate]`.

```json example
["Count", ["List", 1, 2, 2, 3, 2], 2]
// ➔ 3

["Count", ["List", ["List", 1, 1], 1], 1, 2]
// ➔ 3

["Count", ["List", 1, 2, 3, 4, 5], ["Greater", "_", 2]]
// ➔ 3
```

In LaTeX, `|S|`, `\#S`, `\operatorname{card}(S)` and `\operatorname{Card}(S)`
of a set or a string parse to `["Count", "S"]`, and `Count` of a set or a
string serializes as `|S|`: `["Count", ["Set", 1, 2]]` is
`\vert\lbrace1, 2\rbrace\vert`. Of a list, `|L|` is the element-wise absolute
value, and `\#` alone is the symbol `hash`.

</MathJson>

### countIf

`(collection<T>, predicate: (T) any -> boolean) -> integer where T`

Return the number of elements in the collection satisfying the predicate.

```epsil
countIf([1, 4, 9, 16], x => x > 5)
// ➔ 2
```

<MathJson name="CountIf">

`["CountIf", xs, predicate]`.

```json example
["CountIf", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
// ➔ 2
```

</MathJson>

### cycle

`(list<any>) -> list`

Produce an infinite sequence by cycling through the elements of a finite collection.

```epsil
take(cycle([1, 2]), 5)
// ➔ [1,2,1,2,1]
```

The seed collection must be finite. Use [`take`](#take) to get a finite
number of elements.

```epsil
cycle(1..3)
// ➔ [1,2,3,1,2,...]
take(cycle(1..3), 7)
// ➔ [1,2,3,1,2,3,1]
```

<MathJson name="Cycle">

`["Cycle", seed]`.

```json example
["Take", ["Cycle", ["List", 5, 7, 2]], 5]
// ➔ ["List", 5, 7, 2, 5, 7]
```

</MathJson>

### dedup

`(collection<any>) -> collection`

Return the collection with consecutive duplicate elements collapsed to a single element.

Only immediately-adjacent equal elements are removed; unlike `Unique`, a value that recurs after a different element is kept.

```epsil
dedup([1, 1, 2, 2, 1])
// ➔ [1,2,1]
```

`dedup` is lazy: the elements are computed when they are read. A string
gives a string.

```epsil
dedup("aabba")
// ➔ "aba"
```

<MathJson name="Dedup">

`["Dedup", xs]`.

```json example
["Dedup", ["List", 1, 1, 2, 2, 1]]
// ➔ ["List", 1, 2, 1]
```

</MathJson>

### deleteAt

`((T, integer) -> T where T: string) & ((indexed_collection<T>, integer) -> list<T> where T: any) & ((dictionary<V>, string) -> dictionary<V> where V: any)`

Return a copy of the indexed collection with the element at the 1-based `index` removed.

A negative index counts from the end. An out-of-range, zero, or non-integer index leaves the expression unevaluated.

Deleting from a string yields a string.

On a dictionary or a record, `DeleteAt(d, key)` returns a copy without the entry of the string `key`; `d` does not change. A key that is not there gives the value unchanged. The type of a record loses the field (`record{a: integer, b: string?}` gives `record{a: integer}`); with a key known only at evaluation, every field of the record becomes optional.

A value of a declared (nominal) record type is not a collection, so `DeleteAt` refuses it, as `At` does.

```epsil
deleteAt([1, 2, 3, 4], 2)
// ➔ [1,3,4]
```

```epsil
deleteAt({a -> 1, b -> "x"}, "b")
// ➔ {"a" -> 1}
```

The collection is not changed. An index out of range, or a symbol, leaves
the call unevaluated. The result has the kind of the source, so deleting
from a string gives a string.

```epsil
deleteAt([1, 2, 3], 7)
// ➔ DeleteAt([1,2,3], 7)
[deleteAt("abcdef", 2), deleteAt("abcdef", -1)]
// ➔ ["acdef","abcde"]
```

On a dictionary, a key that is not there gives the dictionary unchanged. A
record type loses the field.

```epsil
deleteAt({a -> 1, b -> "x"}, "zz")
// ➔ {"a" -> 1, "b" -> "x"}
type(deleteAt({a -> 1, b -> "x"}, "b"))
// ➔ TypeFrom("record{a: integer}")
```

<MathJson name="DeleteAt">

`["DeleteAt", xs, index]`, `["DeleteAt", dictionary, key]`.

```json example
["DeleteAt", ["List", 1, 2, 3], -1]
// ➔ ["List", 1, 2]

["DeleteAt", {dict: {a: 1, b: "x"}}, {str: "b"}]
// ➔ {dict: {a: 1}}
```

</MathJson>

### Dictionary

`(tuple<string, unknown>*) -> dictionary`

A collection of key -&gt; value entries with string keys (`{x -> 1, y -> 2}` in Epsil).

```epsil
{"a" -> 1, "b" -> 2}["b"]
// ➔ 2
```

### dictionaryFrom

`(collection<any>) -> dictionary`

Create a dictionary from the elements of a collection of (key, value) pairs.

```epsil
dictionaryFrom([("a", 1), ("b", 2)])
// ➔ {"a" -> 1, "b" -> 2}
```

The collection must be a finite collection of `(key, value)` pairs, each key
a string. When several pairs have the same key, the last one wins.

```epsil
dictionaryFrom([("a", 1), ("a", 9), ("b", 2)])
// ➔ {"a" -> 9, "b" -> 2}
```

This is how a dictionary literal with spread entries is evaluated: the
entries are joined and passed to `dictionaryFrom`, so a later entry,
written or spread, replaces an earlier one. `{->, ...d1, ...d2}` merges two
dictionaries. The same key written twice in one literal is an error instead.

```epsil
let defaults = {"verbose" -> False, "depth" -> 2}
{...defaults, "verbose" -> True}
// ➔ {"verbose" -> "True", "depth" -> 2}
{"a" -> 1, "a" -> 2}
// ➔ error: duplicate dictionary key: a
```

There is no `recordFrom`: a record and a dictionary differ only in their
type. The type of a `dictionaryFrom` call is `dictionary`; a literal with
the same entries is a record.

```epsil
type(dictionaryFrom([("a", 1), ("b", "x")]))
// ➔ TypeFrom("dictionary")
type({"a" -> 1, "b" -> "x"})
// ➔ TypeFrom("record{a: integer, b: string}")
```

<MathJson name="DictionaryFrom">

`["DictionaryFrom", pairs]`. A `Dictionary` literal with `["Spread", d]`
entries is evaluated as a `DictionaryFrom` of the joined entries.

```json example
["DictionaryFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ {"dict": {"a": 1, "b": 2}}
```

</MathJson>

### differences

`(indexed_collection<any>) -> indexed_collection`

Return the successive differences of a collection: a collection whose k-th element is `x(k+1) − xk`, of length one less than the input.

```epsil
differences([1, 4, 9, 16])
// ➔ [3,5,7]
```

The differences are exact: integers and rationals stay exact. `differences`
is lazy, so it also applies to an infinite collection.

```epsil
differences([1/2, 1/3, 1/4])
// ➔ [-1/6,-1/12]
take(differences(1..oo), 3)
// ➔ [1,1,1]
```

<MathJson name="Differences">

`["Differences", xs]`.

```json example
["Differences", ["List", 1, 4, 9, 16]]
// ➔ ["List", 3, 5, 7]
```

</MathJson>

### drop

`((xs: T, count: number) -> T where T: string) & ((xs: indexed_collection<T>, count: number) -> list<T> where T: any)`

Return the indexed collection without its first `n` elements.

A negative `n` counts from the end: `Drop(xs, -n)` is the collection without its last `n` elements.

A count past the length is clamped: the result is empty.

```epsil
drop([1, 2, 3, 4, 5], 2)
// ➔ [3,4,5]
```

```epsil
drop([1, 2, 3, 4, 5], -2)
// ➔ [1,2,3]
```

A count of 0 gives the whole collection, and a count past the length, in
either direction, gives the empty collection. Of a string, the result is a
string.

```epsil
drop([5, 2, 10, 18], -10)
// ➔ []
drop("hello", -2)
// ➔ "hel"
```

A negative count needs the length of the collection. When the length is not
known or is infinite, the expression stays unevaluated. A positive count
applies to an infinite collection too.

```epsil
drop(1..oo, -2)
// ➔ Drop(Range(1, +oo), -2)
drop(1..oo, 2)
// ➔ [3,4,5,6,7,...]
```

See [`take`](#take) for the first `n` elements.

<MathJson name="Drop">

`["Drop", xs, n]`.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2, 10, 18], 10]
// ➔ ["List"]
```

</MathJson>

### dropWhile

`(indexed_collection<T>, predicate: (T) any -> boolean) -> indexed_collection where T`

Return the collection with its leading elements for which the predicate returns True removed; the remaining elements are returned unfiltered.

```epsil
dropWhile([1, 2, 3, 10, 4], x => x < 5)
// ➔ [10,4]
```

`dropWhile` is lazy. Once an element fails the predicate, the predicate is not
applied again: the rest of the collection is returned as it is.

```epsil
dropWhile([1, 2, 3, 10, 1], x => x < 5)
// ➔ [10,1]
take(dropWhile(1..oo, x => x < 4), 3)
// ➔ [4,5,6]
```

See [`takeWhile`](#takewhile) for the leading elements.

<MathJson name="DropWhile">

`["DropWhile", xs, predicate]`.

```json example
["DropWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 10, 1]
```

</MathJson>

### Element

`(any, any, boolean?) -> boolean`

Test whether a value is an element of a collection. Optional third argument is a boolean expression (condition) for filtered iteration in Sum/Product.

Element supports two modes of operation:
1. Set membership: Element(3, [List, 1, 2, 3]) checks if 3 is in the list
2. Type-style membership: Element(x, integer) checks if x has type integer

Type-style membership works with:
- Mathematical sets: Integers, RealNumbers, ComplexNumbers, etc.
- Type names: integer, rational, real, number, positive_integer, etc.
- Invalid type names remain unevaluated (e.g., Element(2, "Booleans"))

```epsil
3 in {1, 2, 3}
// ➔ "True"
```

<MathJson name="Element" latex={["\\in"]} />

### emptySet

constant `set`

The empty set, a set containing no elements.

```epsil
isEmpty(emptySet)
// ➔ "True"
```

<MathJson name="EmptySet" latex={["\\emptyset"]} />

### endsWith

`(indexed_collection<T>, suffix: indexed_collection<T>) -> boolean where T`

Return `True` when the indexed collection ends with `suffix` as a contiguous subsequence.

On a string the suffix is matched character by character, so a suffix that would begin inside a grapheme cluster does not match. An empty suffix matches everything.

```epsil
endsWith([1, 2, 3], [2, 3])
// ➔ "True"
```

An empty suffix is `True`. `endsWith` reads the end of the collection, so it
needs a collection of known length; otherwise it stays unevaluated.

```epsil
endsWith(1..oo, [2, 3])
// ➔ EndsWith(Range(1, +oo), [2,3])
```

<MathJson name="EndsWith">

`["EndsWith", xs, suffix]`.

```json example
["EndsWith", ["List", 1, 2, 3], ["List", 2, 3]]
// ➔ "True"
```

</MathJson>

### extendedComplexNumbers

constant `set<complex | infinity>`

The set of all complex numbers, including infinities.

```epsil
complexInfinity in extendedComplexNumbers
// ➔ "True"
```

<MathJson name="ExtendedComplexNumbers" latex={["\\overline\\C"]} />

### extendedIntegers

constant `set<integer | signed_infinity>`

The set of all integers, including infinities.

```epsil
Infinity in extendedIntegers
// ➔ "True"
```

<MathJson name="ExtendedIntegers" latex={["\\overline\\Z"]} />

### extendedRationalNumbers

constant `set<rational | signed_infinity>`

The set of all rational numbers, including infinities.

```epsil
-Infinity in extendedRationalNumbers
// ➔ "True"
```

<MathJson name="ExtendedRationalNumbers" latex={["\\overline\\Q"]} />

### extendedRealNumbers

constant `set<real | signed_infinity>`

The set of all real numbers, including infinities.

```epsil
-Infinity in extendedRealNumbers
// ➔ "True"
```

<MathJson name="ExtendedRealNumbers" latex={["\\overline\\R"]} />

### field

`(value: any, field: string) -> unknown`

Access a named field of a value: `p.x` in Epsil.

On a record or dictionary value, `Field(d, "x")` behaves exactly as `d["x"]` (`At` semantics, including the absence marker for a key a dictionary may not have).

On a value of a NOMINAL type whose definition body has named fields (a record body, or a named-tuple body), the field is resolved through the type definition — the sanctioned accessor window of the nominal-types design (D6/§4.5b D16). This does not make the value a collection: `First(p)` and `p["x"]` keep rejecting.

A field name that is not in a record/named-tuple definition is a static defect (the result type is `error`); on an unknown-typed operand the expression stays symbolic.

Record types are closed: on an operand of a record type, a field name that the type does not list is refused when the expression is boxed (`unknown-field`). An optional field (`b: string?`) that the value leaves out reads as the absent value of its type: `Missing`, or `NaN` for a numeric field.

```epsil
{x -> 1, y -> 2}.y
// ➔ 2
```

On a value of a nominal type whose definition has named fields, a record body
or a named-tuple body, the field is read through the definition. This does not
make the value a collection: `first(p)` and `p["x"]` are still rejected. A
name that is not a field of the definition is an error.

```epsil
type Circle = tuple<radius: number>
Circle(2).radius
// ➔ 2
type Circle = tuple<radius: number>
Circle(2).area
// ➔ error: Runtime error: `area` is not a field at `Circle(2)`
type Circle = tuple<radius: number>
first(Circle(2))
// ➔ error: Type error: expected `indexed_collection`, got `Circle` at `Circle(2)` in `first(Circle(2))`
```

On an operand whose type is unknown, `Field` stays symbolic:

```epsil
q.x
// ➔ Field(q, "x")
```

<MathJson name="Field">

`["Field", value, field]`. On a record or a dictionary,
`["Field", d, "'x'"]` is `["At", d, "'x'"]`, including the absence marker for
a key that the dictionary does not have.

```json example
["Field", ["Dictionary", ["KeyValuePair", "'a'", 10]], "'a'"]
// ➔ 10
```

</MathJson>

### filter

`(collection<T>, predicate: (T) any -> boolean) -> collection where T`

Return the elements of the collection for which the predicate function returns True.

Equivalent to `[x for x in xs if p(x)]`.

```epsil
filter([1, 2, 3, 4, 5, 6], x => x % 2 == 0)
// ➔ [2,4,6]
```

An indexed collection (a list, a tuple or a range) gives a `list` of the
elements that are kept, never the shape or the length of the source, since
filtering changes the length. A set gives a set.

```epsil
[filter((5, 2, 10), _ < 10), filter(1..6, isPrime)]
// ➔ [[5,2],[2,3,5]]
filter({5, 2, 10, 18}, _ < 10)
// ➔ Set(2, 5)
```

The predicate must return a boolean:

```epsil
filter([1, 2, 3], x => x)
// ➔ error: Type error: expected `(integer) any -> boolean`, got `(x: integer) -> integer` at `Function(do {x}, x)` in `filter([1, 2, 3], Function(x, x))`
```

<MathJson name="Filter">

`["Filter", xs, predicate]`.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Less", "_", 10]]
// ➔ ["List", 5, 2]
```

</MathJson>

### find

`(indexed_collection<T>, predicate: (T) any -> boolean) -> any where T: any`

Return the first element of the collection satisfying the predicate. When no element satisfies it, return the absent value of the domain of the elements: `NaN` for numbers, a point whose coordinates are all `NaN` for points, and `Missing` otherwise.

```epsil
find([1, 4, 9, 16], x => x > 5)
// ➔ 9
```

When no element satisfies the predicate, the result is the value that a read
out of range of the same collection gives. Use
[`Coalesce`](/reference/core/#coalesce) to give a default.

```epsil
find([5, 2, 10, 18], _ > 100)
// ➔ NaN
find([(1, 2), (3, 4)], p => first(p) > 9)
// ➔ (NaN, NaN)
find(["a", "b"], s => s == "z")
// ➔ "Missing"
Coalesce(find([5, 2, 10, 18], _ > 100), 0)
// ➔ 0
```

<MathJson name="Find">

`["Find", xs, predicate]`.

```json example
["Find", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 10

["Find", ["List", 5, 2, 10, 18], ["Greater", "_", 100]]
// ➔ "NaN"
```

</MathJson>

### first

`(xs: indexed_collection<any>, default: any?) -> any`

The first element of a collection.

```epsil
first([7, 8, 9])
// ➔ 7
```

`first(xs)` is `xs[1]`. With a second argument, that argument is the value
when the collection is empty; without it, the value is the absence marker of
[`At`](#at).

```epsil
first((x, y))
// ➔ x
first([], 0)
// ➔ 0
```

<MathJson name="First">

`["First", xs]`, `["First", xs, default]`.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["List"], 0]
// ➔ 0
```

</MathJson>

### flatMap

`(collection<T>, mapping: (T) any -> U) -> list where T, U`

Map a function over a collection and concatenate the results into a single list, splicing collection-valued results and keeping scalar results as single elements.

```epsil
flatMap([1, 2, 3], x => [x, x])
// ➔ [1,1,2,2,3,3]
```

A result that is a collection is spliced into the output. A result that is
not a collection is kept as one element; it is not an error.

```epsil
flatMap([1, 2, 3], x => 1..x)
// ➔ [1,1,2,1,2,3]
flatMap([1, 2, 3], x => 2 * x)
// ➔ [2,4,6]
```

`flatMap` is lazy: the elements are computed when they are read.

<MathJson name="FlatMap">

`["FlatMap", xs, f]`.

```json example
["FlatMap", ["List", 1, 2, 3], ["Function", ["List", "x", "x"], "x"]]
// ➔ ["List", 1, 1, 2, 2, 3, 3]
```

</MathJson>

### fold

`(reducer: (unknown, T) any -> unknown, initial: value, collection<T>) -> value where T`

Fold a collection to a single value, applying a binary function f(accumulator, element) left to right from an initial value.

```epsil
fold((a, b) => a + b, 0, [1, 2, 3, 4])
// ➔ 10
```

`fold` is [`reduce`](#reduce) with the function first. Without an initial
value, it starts from the first element: `fold(f, xs)` is `reduce(xs, f)`.

```epsil
fold((acc, x) => acc * 10 + x, 0, [1, 2, 3])
// ➔ 123
fold(max, [3, 9, 2])
// ➔ 9
```

<MathJson name="Fold">

`["Fold", f, initial, xs]`, `["Fold", f, xs]`.

```json example
["Fold", "Add", 0, ["List", 1, 2, 3, 4]]
// ➔ 10

["Fold", "Add", ["Sqrt", 2], ["List"]]
// ➔ ["Sqrt", 2]
```

</MathJson>

### groupBy

`(collection<T>, key: (T) any -> unknown) -> dictionary<list> where T`

Partition the collection into a dictionary of lists based on the key returned by the function.

```epsil
groupBy(["apple", "fig", "pear", "kiwi"], length)
// ➔ {"3" -> ["fig"], "4" -> ["pear","kiwi"], "5" -> ["apple"]}
```

The keys of a dictionary are strings, so the key that the function returns
is converted to a string.

```epsil
groupBy([1, 2, 3, 4], isEven)
// ➔ {"False" -> [1,3], "True" -> [2,4]}
```

<MathJson name="GroupBy">

`["GroupBy", xs, key]`.

```json example
["GroupBy", ["List", 1, 2, 3, 4], ["IsEven", "_"]]
// ➔ {"dict": {"False": [1, 3], "True": [2, 4]}}
```

</MathJson>

### imaginaryNumbers

constant `set<imaginary>`

The set of all imaginary numbers.

```epsil
3i in imaginaryNumbers
// ➔ "True"
```

<MathJson name="ImaginaryNumbers" latex={["\\imaginaryI\\R"]} />

### indexOf

`(indexed_collection<any>, any) -> integer`

Return the 1-based index of the first occurrence of value in collection, or 0 if not found. The comparison is structural, so an absent value is found where the same marker sits: `IndexOf([1, NaN], NaN)` is 2. Stays unevaluated when the collection cannot be searched (a symbol with no value, an unbounded source with no match).

```epsil
indexOf([10, 20, 30], 20)
// ➔ 2
```

`indexOf` searches for one element, so in a list of lists the value is a
whole row. To search for a run of several consecutive elements, a sublist or
a substring, use [`rangeOf`](#rangeof).

```epsil
[indexOf([5, 2, 10, 2], 2), indexOf([5, 2, 10, 2], 42)]
// ➔ [2,0]
indexOf([[1, 2], [3, 4]], [3, 4])
// ➔ 2
```

<MathJson name="IndexOf">

`["IndexOf", xs, value]`.

```json example
["IndexOf", ["List", 5, 2, 10, 2], 2]
// ➔ 2
```

</MathJson>

### indexWhere

`(indexed_collection<T>, predicate: (T) any -> boolean) -> integer where T`

Return the 1-based index of the first element satisfying the predicate, or 0 if not found. Stays unevaluated when the collection cannot be searched (a symbol with no value, an unbounded source with no match).

```epsil
indexWhere([1, 4, 9, 16], x => x > 5)
// ➔ 3
```

```epsil
[indexWhere([5, 2, 10, 18], _ > 9), indexWhere([5, 2, 10, 18], _ > 99)]
// ➔ [3,0]
```

<MathJson name="IndexWhere">

`["IndexWhere", xs, predicate]`.

```json example
["IndexWhere", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 3
```

</MathJson>

### insert

`(indexed_collection<T>, integer, T) -> list<T> where T: any`

Return a copy of the indexed collection with `value` inserted before the 1-based `index`.

`index` may range from 1 to n+1 (n+1 appends). A negative index counts from the end, with -1 appending at the end (Elixir semantics).

An out-of-range, zero, or non-integer index leaves the expression unevaluated.

```epsil
insert([1, 2, 4], 3, 3)
// ➔ [1,2,3,4]
```

The element at the index and the elements after it move one position to the
right; the index `n + 1` appends. A negative index counts from the end:
`-1` appends, and `-2` inserts before the last element.

```epsil
[insert([1, 2, 3], 2, 99), insert([1, 2, 3], 4, 99)]
// ➔ [[1,99,2,3],[1,2,3,99]]
[insert([1, 2, 3], -1, 99), insert([1, 2, 3], -2, 99)]
// ➔ [[1,2,3,99],[1,2,99,3]]
```

The collection is not changed. An index out of range, or a symbol, leaves
the call unevaluated.

```epsil
insert([1, 2, 3], 9, 99)
// ➔ Insert([1,2,3], 9, 99)
```

<MathJson name="Insert">

`["Insert", xs, index, value]`.

```json example
["Insert", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 2, 3]
```

</MathJson>

### integers

constant `set<integer>`

The set of all finite integers.

```epsil
-7 in integers
// ➔ "True"
```

<MathJson name="Integers" latex={["\\mathbb{Z}"]} />

### intersection

`(any+) -> set`

Return the intersection of one or more collections as a set.

```epsil
intersection({1, 2, 3}, {2, 3, 4})
// ➔ Set(2, 3)
```

<MathJson name="Intersection" latex={["\\cap"]} />

### interval

MathJSON `Interval` · `(number, number) -> set<real>`

A set of real numbers between two endpoints. The endpoints may or may not be included.

```epsil
0.5 in interval(0, 1)
// ➔ "True"
```

### isEmpty

`(collection<any>) -> boolean`

Return True if the collection is empty, False otherwise.

```epsil
isEmpty([])
// ➔ "True"
```

A symbol that is not known to be a collection leaves the answer open. A
string is a collection of characters.

```epsil
[isEmpty([5, 2, 10, 18]), isEmpty("Hello"), isEmpty("")]
// ➔ ["False","False","True"]
isEmpty(x)
// ➔ IsEmpty(x)
```

<MathJson name="IsEmpty">

`["IsEmpty", xs]`.

```json example
["IsEmpty", ["List"]]
// ➔ "True"
```

</MathJson>

### iterate

`(function, initial: any?) -> list`

Produce an infinite sequence by repeatedly applying a function to the previous value, starting with an initial value.

The function is invoked as `f(index, acc)`: `index` is the 1-based position of the element being produced, and `acc` is the previous element — the `initial` value when producing element 1. Element `k` is therefore `f(k, element(k-1))`.

A function whose type says it is UNARY is applied to the accumulator alone (`Iterate(2 * _, 1)` produces `[2, 4, 8, 16, …]`); a statically-unknown arity keeps the two-argument form.

```epsil
take(iterate(x => 2x, 1), 5)
// ➔ [2,4,8,16,32]
```

The initial value is not an element of the collection: element 1 is the
function applied to it. With no initial value, it is `Nothing`. Use
[`take`](#take) to get a finite number of elements.

A function with two parameters receives the 1-based index and the previous
element; here the factorials. A function with one parameter, including the
`_` shorthand, receives the previous element only.

```epsil
take(iterate((n, acc) => n * acc, 1), 5)
// ➔ [1,2,6,24,120]
take(iterate(_ * 2, 1), 5)
// ➔ [2,4,8,16,32]
take(iterate(x => [x]), 2)
// ➔ [["Nothing"],[["Nothing"]]]
```

<MathJson name="Iterate">

`["Iterate", f]`, `["Iterate", f, initial]`.

```json example
["Take", ["Iterate", ["Add", "_", 2], 7], 5]
// ➔ ["List", 9, 11, 13, 15, 17]

["Take", ["Iterate", ["Function", ["Multiply", "n", "acc"], "n", "acc"], 1], 5]
// ➔ ["List", 1, 2, 6, 24, 120]
```

</MathJson>

### join

`((T+) -> T where T: string) & ((collection<any>*) -> collection)`

Join the elements of some collections into a flat collection.

A tuple operand is appended as a single element, not spliced.

A scalar operand is appended as a single element too: `Join([1, 2], 3)` is `[1, 2, 3]`.

When every operand is a string, the result is their concatenation as a string: `Join` is the variadic string concatenation.

```epsil
join([1, 2], [3, 4])
// ➔ [1,2,3,4]
```

```epsil
join("ab", "cd")
// ➔ "abcd"
```

Collections are immutable: `join` returns a new collection and does not
change its arguments.

When the arguments are of different kinds, the result is a list of the
elements of the first collection followed by those of the next ones. When
any argument is a set, the result is a set, and an element that occurs more
than once is kept once.

```epsil
join([5, 2, 10, 18], [1, 2, 3])
// ➔ [5,2,10,18,1,2,3]
[join({1, 2}, {2, 3}), join({1, 2}, [2, 3])]
// ➔ [Set(1, 2, 3),Set(1, 2, 3)]
```

The kind of the result depends on the arguments, not on the context. When
one argument is not a string, a string argument contributes its characters.

```epsil
join("ab", characters("cd"))
// ➔ ["a","b","c","d"]
```

To join the elements of one collection of strings into a string, with an
optional separator, use [`stringJoin`](/reference/core/#stringjoin).

<MathJson name="Join">

`["Join", xs, ys, …]`.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]

["Join", ["Set", 1, 2], ["List", 2, 3]]
// ➔ ["Set", 1, 2, 3]

["Join", {str: "ab"}, {str: "cd"}]
// ➔ "abcd"
```

</MathJson>

### KeyValuePair

`(key: string, value: T) -> tuple<string, T> where T`

A key/value pair

```epsil
Dictionary(KeyValuePair("a", 1), KeyValuePair("b", 2))
// ➔ {"a" -> 1, "b" -> 2}
```

### keys

`(dictionary<any>) -> list<string>`

Return a list of the keys of a dictionary.

```epsil
keys({"a" -> 1, "b" -> 2})
// ➔ ["a","b"]
```

The keys are in the iteration order of the dictionary, which is the order of
the entries.

```epsil
keys({"b" -> 1, "a" -> 2})
// ➔ ["b","a"]
```

<MathJson name="Keys">

`["Keys", dictionary]`.

```json example
["Keys", ["Dictionary", ["KeyValuePair", "'a'", 1], ["KeyValuePair", "'b'", 2]]]
// ➔ ["List", "'a'", "'b'"]
```

</MathJson>

### last

`(xs: indexed_collection<any>, default: any?) -> any`

The last element of a collection.

```epsil
last([7, 8, 9])
// ➔ 9
```

`last(xs)` is `xs[-1]`. With a second argument, that argument is the value
when the collection is empty.

```epsil
last([], 0)
// ➔ 0
```

<MathJson name="Last">

`["Last", xs]`, `["Last", xs, default]`.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

</MathJson>

### length

`(any) -> infinity | integer`

Number of elements in a collection. Returns +oo for an infinite collection (an unbounded Range, `Integers`, `Repeat(5)`, an interval), as `Count` does, an `incompatible-type` error for an operand that is decidably not a collection, `NaN` for an absent operand (`Missing`), and stays unevaluated for a collection whose size is not known (a `Filter` over an infinite source).

```epsil
length([5, 6, 7])
// ➔ 3
```

```epsil
length("hello")
// ➔ 5
```

An unbounded collection has an infinite length, which is why the result type
is `infinity | integer`: the type `integer` is finite. A symbol with no
value stays unevaluated, and a value that is not a collection is an error.

```epsil
length(1..oo)
// ➔ +oo
length(x)
// ➔ Length(x)
length(5)
// ➔ error: Runtime error: expected `collection`, got `5` at `5`
```

The length of `Missing` is `Missing`. A list that holds `Missing` keeps its
length.

```epsil
length(Missing)
// ➔ "Missing"
length([1, Missing])
// ➔ 2
```

For a collection, `length` and [`count`](#count) give the same result.

<MathJson name="Length">

`["Length", xs]`.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```

</MathJson>

### linspace

`(start: number, end: number?, count: number?) -> list<number>`

A sequence of evenly spaced numbers between a start and end value, both endpoints included.

```epsil
linspace(0, 1, 5)
// ➔ [0,0.25,0.5,0.75,1]
```

The name is short for "linearly spaced", after the
[MATLAB function](https://mathworks.com/help/matlab/ref/linspace.html). It is
like `Range`, but the third argument is the number of elements instead of the
step. With no count, there are 50 elements. With one argument, the argument
is the upper bound and the lower bound is 1. The bounds can be descending.

```epsil
count(linspace(3, 10))
// ➔ 50
take(linspace(2), 3)
// ➔ [1,1.0204081632653061,1.0408163265306123]
linspace(10, 1, 10)
// ➔ [10,9,8,7,6,5,4,3,2,1]
```

When a bound is an infinity or `NaN`, the samples cannot be computed and the
collection has no value: a read such as `sum`, `count`, `max`, an index or
`Element` stays unevaluated. With a count of 0 there are no samples, and the
collection is empty whatever the bounds.

```epsil
count(linspace(0, oo, 3))
// ➔ Count(Linspace(0, +oo, 3))
count(linspace(0, oo, 0))
// ➔ 0
```

Compiled code gives `NaN` for a collection that has no value.

<MathJson name="Linspace">

`["Linspace", upper]`, `["Linspace", lower, upper]`,
`["Linspace", lower, upper, count]`.

```json example
["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Count", ["Linspace", 0, "PositiveInfinity", 0]]
// ➔ 0
```

</MathJson>

### List

`(any*) -> list`

An ordered collection of elements (a list).

```epsil
List(1, 2, 3)
// ➔ [1,2,3]
```

A list is an **indexed** collection: its elements are in order, and an element
may be repeated. The type of a list is `list<T>`, where `T` is the type of its
elements; `list` is short for `list<any>`.

A **vector** is a list of numbers, and a **matrix** is a list of rows, each
row a list of numbers. See the [Linear Algebra](/reference/linear-algebra/)
library for the operations on vectors, matrices and tensors.

```epsil
[[1, 2, 3], [4, 5, 6]]
// ➔ [[1,2,3],[4,5,6]]
```

#### Spread

`...xs` in a list literal splices the elements of the collection `xs` into the
list. An element that is not spread is kept as written, also when it is a
collection.

```epsil
let xs = [1, 2]; [...take(xs, 1), 9, ...drop(xs, 1)]
// ➔ [1,9,2]
let xs = [1, 2]; [...xs, 1..3]
// ➔ [1,2,Range(1, 3)]
```

A string is an indexed collection of characters, so it spreads into its
characters. A tuple is a unit and does not spread: convert it with
[`listFrom`](/reference/collections/#listfrom) first. A scalar spreads as
itself.

```epsil
[..."ab", "c"]
// ➔ ["a","b","c"]
[...(1, 2)]
// ➔ error: Runtime error: spread tuple at `(1, 2)`
[...5, 6]
// ➔ [5,6]
```

The list becomes a plain list when every spread operand is a finite
collection and the total number of elements is within the materialization
cap. An infinite operand keeps the list lazy:

```epsil
[...(1..oo)]
// ➔ [1,2,3,4,5,...]
take([...(1..oo)], 3)
// ➔ [1,2,3]
```

A set literal accepts spread elements the same way, and removes duplicates. A
dictionary literal merges spread dictionaries; on a key that occurs twice, the
later entry wins.

```epsil
{1, ...[2, 2, 3]}
// ➔ Set(1, 2, 3)
let d = {"a" -> 1, "b" -> 2}; {...d, "a" -> 5}
// ➔ {"a" -> 5, "b" -> 2}
```

<MathJson name="List" latex={["[","]"]}>

`["List", ...elements]`. A matrix is a `List` of rows:
`["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]`.

A `["Spread", xs]` element splices `xs` at canonicalization. A literal list
splices immediately; a symbolic or lazy operand lowers to the equivalent
`ListJoin` expression (a lone spread `["List", ["Spread", "xs"]]` is
`["ListJoin", "xs"]`). When the literal is evaluated, the `ListJoin` becomes a
`List` once every spread operand is a finite collection and the total number
of elements is within `ce.maxCollectionSize`.

```json example
["List", ["Spread", ["List", 1, 2]], 3]
// ➔ ["List", 1, 2, 3]

["List", ["Spread", ["Range", 1, "PositiveInfinity"]]]
// ➔ ["ListJoin", ["Range", 1, "PositiveInfinity"]]
```

In LaTeX, a list is `\lbrack 42, 3.14, x, y \rbrack`, and an element
`Nothing` is `\mathrm{Nothing}`. A list of lists can also be written with a
`;` separator, `\lbrack 1, 2, 3 ; 4, 5, 6 \rbrack`, and a matrix with an
environment such as `\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}`. The
`Delimiter` function changes the delimiters and separator used to serialize a
list: `["Delimiter", xs, "<;>"]` serializes `["List", 5, 2, 10, 18]` as
`\langle5;2;10;18\rangle`.

</MathJson>

### listFrom

`(value*) -> list`

Create a list from the elements of a collection.

```epsil
listFrom({1, 2}, 3..4)
// ➔ [1,2,3,4]
```

Materializing a collection evaluates all its elements and stores them, so
the collection must be finite; over an infinite collection, `listFrom` stays
unevaluated. A string is a collection of characters.

```epsil
listFrom(1..3)
// ➔ [1,2,3]
listFrom("abc")
// ➔ ["a","b","c"]
listFrom(1..oo)
// ➔ ListFrom(Range(1, +oo))
```

<MathJson name="ListFrom">

`["ListFrom", xs]`.

```json example
["ListFrom", ["Range", 1, 3]]
// ➔ ["List", 1, 2, 3]
```

</MathJson>

### ListJoin

`(collection<any>*) -> list`

Join the elements of some collections into a list.

This is the canonical form of a list literal with a spread: `[...a, 0]` is `ListJoin(a, [0])`.

The result is a list whatever the kind of the operands: the elements of a set operand are included in the iteration order of the set, without deduplication.

A tuple operand is included as a single element, and so is a scalar operand.

```epsil
ListJoin(Set(3, 1), [0])
// ➔ [1,3,0]
```

### map

`(mapping: (T) any -> U, collection<T>+) -> indexed_collection where T, U`

Return the collection where each element has been transformed by the mapping function.

With a single collection, equivalent to `[f(x) for x in xs]`. With multiple collections, combines them element-wise (like `zipWith`): 

`Map(f, xs, ys) = [f(x1, y1), f(x2, y2), …]`, with the length of the shortest input. The mapping function is always the FIRST argument.

```epsil
map(x => x^2, [1, 2, 3])
// ➔ [1,4,9]
```

The function is the first argument, followed by one or more collections.
With several collections, the function receives one element of each, and the
result has the length of the shortest collection.

```epsil
map(_ * 2, [5, 2, 10, 18])
// ➔ [10,4,20,36]
map((x, y) => x + y, [1, 2, 3], [10, 20])
// ➔ [11,22]
```

#### The number of arguments of a callback

The number of collections is the number of arguments the function receives.
A function literal, or a function with a known signature, whose number of
parameters cannot match it is a `callback-arity` error before evaluation.

```epsil
map((p, q) => p + q, [1, 2, 3])
// ➔ error: Static error: Map calls its callback with 1 argument (each element of the collection); `(p, q) => p + q` declares 2 parameters in `map(Function(p + q, p, q), [1, 2, 3])`
```

The same rule holds for every function that takes a callback:

- `filter`, `any`, `all`, `count`, `takeWhile`, `flatMap` and their kin
  pass one argument, the element.
- `reduce`, `fold` and `scan` pass two, the accumulator and the element.
- `tabulate` passes one index per dimension.
- `sort` and `ordering` accept a key (one argument) or a comparator (two),
  and `iterate` accepts `f(previous)` or `f(index, previous)`.

A function with no parameter, such as `() => 42`, is a constant and is
accepted at any number of arguments. To take a pair apart, use a tuple
parameter, `((p, q)) => …`, which is one parameter.

```epsil
map(() => 42, [1, 2])
// ➔ [42,42]
map(((p, q)) => p + q, [(1, 2), (3, 4)])
// ➔ [3,7]
```

#### Elements the function cannot accept

An element that the function cannot accept is kept as an error cell, and the
other elements are mapped.

```epsil
map(sqrt, [16, "banana"])
// ➔ [4,Error(ErrorCode("incompatible-type", "number", "string"), "banana")]
```

An absent element (`Missing`) gives `Missing` under a numeric function, and
an `incompatible-type` error cell under a text function such as
`toUpperCase`. A function with a parameter declared as a number or a point
gives `Missing` for an absent element, without running its body.

```epsil
map(x => sqrt(x), [16, Missing, 81])
// ➔ [4,"Missing",9]
map((x: integer) => x > 0, [1, Missing])
// ➔ ["True","Missing"]
```

<MathJson name="Map">

`["Map", f, xs]`, `["Map", f, xs, ys, …]`. A tuple parameter is
`["Function", body, ["Tuple", "p", "q"]]`.

```json example
["Map", ["Function", ["Add", "x", 1], "x"], ["List", 5, 2, 10, 18]]
// ➔ ["List", 6, 3, 11, 19]

["Map",
  ["Function", ["Add", "x", "y"], "x", "y"],
  ["List", 1, 2, 3],
  ["List", 10, 20, 30]]
// ➔ ["List", 11, 22, 33]

["Map", ["Function", ["Add", "p", "q"], "p", "q"], ["List", 1, 2, 3]]
// ➔ ["Error", ["ErrorCode", "'callback-arity'", ...]]

["Map", "ToUpperCase", ["List", "'a'", "Missing"]]
// ➔ ["List", "'A'", ["Error", ["ErrorCode", "'incompatible-type'", ...], "Missing"]]
```

</MathJson>

### maxBy

`(collection<T>, key: (T) any -> unknown) -> value where T`

Return the element of the collection that maximizes the given key function.

```epsil
maxBy(["pear", "fig", "apple"], length)
// ➔ "apple"
```

The result is an element, not its key. On a tie, the first element wins.
`maxBy` stays unevaluated on an empty or infinite collection, or when a
comparison of keys cannot be decided.

```epsil
[maxBy([-3, 1, -2], abs), maxBy([2, -2, 1], abs)]
// ➔ [-3,2]
maxBy([a, b], abs)
// ➔ MaxBy([a,b], "Abs")
```

<MathJson name="MaxBy">

`["MaxBy", xs, key]`.

```json example
["MaxBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ -3
```

</MathJson>

### MemberCall

`(receiver: any, member: string, arguments: any*) -> unknown`

Call the member `name` of a value with the value as its first argument: `c.area(2)` in Epsil.

A parse-level node. Canonicalization rewrites it to `Apply(Field(c, "area"), 2)` when the receiver's type declares a field `area` (a stored function is called), or to the bare protocol call `area(c, 2)` when `area` is a protocol function member; a canonical expression never contains it.

### minBy

`(collection<T>, key: (T) any -> unknown) -> value where T`

Return the element of the collection that minimizes the given key function.

```epsil
minBy(["pear", "fig", "apple"], length)
// ➔ "fig"
```

The result is an element, not its key. On a tie, the first element wins.
`minBy` stays unevaluated on an empty or infinite collection, or when a
comparison of keys cannot be decided.

```epsil
minBy([-3, 1, -2], abs)
// ➔ 1
```

<MathJson name="MinBy">

`["MinBy", xs, key]`.

```json example
["MinBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

</MathJson>

### most

`((T) -> T where T: string) & ((indexed_collection<T>) -> list<T> where T: any)`

Return the collection without the last element.

If the collection has only one element, return an empty collection.

```epsil
most([7, 8, 9])
// ➔ [7,8]
```

`most(xs)` is `drop(xs, -1)`. Of a string, it is a string.

```epsil
most("hello")
// ➔ "hell"
```

<MathJson name="Most">

`["Most", xs]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

</MathJson>

### negativeIntegers

constant `set<integer>`

The set of all negative integers.

```epsil
-3 in negativeIntegers
// ➔ "True"
```

<MathJson name="NegativeIntegers" latex={["\\mathbb{Z}_{<0}"]} />

### negativeNumbers

constant `set<real>`

The set of all negative real numbers.

```epsil
-0.5 in negativeNumbers
// ➔ "True"
```

<MathJson name="NegativeNumbers" latex={["\\mathbb{R}_{<0}"]} />

### nonNegativeIntegers

constant `set<integer>`

The set of all non-negative integers.

```epsil
0 in nonNegativeIntegers
// ➔ "True"
```

<MathJson name="NonNegativeIntegers" latex={["\\mathbb{N}"]} />

### nonNegativeNumbers

constant `set<real>`

The set of all non-negative real numbers.

```epsil
0 in nonNegativeNumbers
// ➔ "True"
```

<MathJson name="NonNegativeNumbers" latex={["\\mathbb{R}_{\\geq0}"]} />

### nonPositiveIntegers

constant `set<integer>`

The set of all non-positive integers.

```epsil
0 in nonPositiveIntegers
// ➔ "True"
```

<MathJson name="NonPositiveIntegers" latex={["\\mathbb{Z}_{\\le0}"]} />

### nonPositiveNumbers

constant `set<real>`

The set of all non-positive real numbers.

```epsil
0 in nonPositiveNumbers
// ➔ "True"
```

<MathJson name="NonPositiveNumbers" latex={["\\mathbb{R}_{\\le0}"]} />

### NotElement

`(any, any) -> boolean`

Test whether a value is not an element of a collection.

```epsil
4 !in {1, 2, 3}
// ➔ "True"
```

<MathJson name="NotElement" latex={["\\notin"]} />

### NotSubset

`(lhs: any, rhs: any) -> boolean`

Test whether the first collection is not a strict subset of the second.

```epsil
NotSubset({1, 4}, {1, 2, 3})
// ➔ "True"
```

<MathJson name="NotSubset" latex={["\\nsubset"]} />

### NotSuperset

`(lhs: any, rhs: any) -> boolean`

Test whether the first collection is not a strict superset of the second.

```epsil
NotSuperset({1, 2}, {1, 2, 3})
// ➔ "True"
```

<MathJson name="NotSuperset" latex={["\\nsupset"]} />

### NotSupersetEqual

`(lhs: any, rhs: any) -> boolean`

Test whether the first collection is not a superset (possibly equal) of the second.

```epsil
NotSupersetEqual({1, 2}, {1, 2, 3})
// ➔ "True"
```

### numbers

MathJSON `Numbers` · constant `set<number>`

The set of all numbers.

```epsil
2 + 3i in numbers
// ➔ "True"
```

### open

MathJSON `Open` · `(number) -> number`

Open(x): the endpoint x of an Interval, marked as excluded. A marker with no value of its own.

```epsil
0 in interval(open(0), 1)
// ➔ "False"
```

### ordering

`(indexed_collection<T>, order: (((T) any -> unknown) | ((any, any) any -> boolean | number))?) -> list<integer> where T: any`

Return the indexes that would sort the collection.

```epsil
ordering([30, 10, 20])
// ➔ [2,3,1]
```

The optional function is a key or a comparator, as for [`sort`](#sort).
Indexing the collection with its ordering gives the sorted collection: an
index can be a list of indexes.

```epsil
ordering(["pear", "fig", "apple"], length)
// ➔ [2,1,3]
[5, 2, 10, 18][ordering([5, 2, 10, 18])]
// ➔ [2,5,10,18]
```

<MathJson name="Ordering">

`["Ordering", xs]`, `["Ordering", xs, order]`.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]

["At", ["List", 5, 2, 10, 18], ["Ordering", ["List", 5, 2, 10, 18]]]
// ➔ ["List", 2, 5, 10, 18]
```

</MathJson>

### Pair

`(first: T, second: U) -> tuple<T, U> where T, U`

A tuple of two elements

```epsil
Pair(1, 2)
// ➔ (1, 2)
```

### partition

`(indexed_collection<T>, ((T) any -> boolean) | integer, integer?) -> list<list<T>> where T: any`

Partition a collection into consecutive chunks each of size `n`; the trailing chunk may be shorter when `n` does not divide the length.

With a third argument `step`, produce sliding windows of length `n` whose starts are `step` apart, keeping only complete windows.

With a predicate function instead of an integer, split into two groups: elements for which the predicate is true, and those for which it is false.

Asymmetry: with no `step`, the trailing partial chunk is included; with an explicit `step`, only complete windows are returned.

See `Chunk` for splitting into a given number of nearly-equal groups.

```epsil
partition([1, 2, 3, 4, 5], 2)
// ➔ [[1,2],[3,4],[5]]
```

```epsil
partition([1, 2, 3, 4, 5], x => x % 2 == 0)
// ➔ [[2,4],[1,3,5]]
```

To split a collection into a given number of groups, use [`chunk`](#chunk).

```epsil
partition([1, 2, 3, 4, 5], 2, 1)
// ➔ [[1,2],[2,3],[3,4],[4,5]]
```

From a string, each part (a chunk, a window or a group) is a string, so the
result is a `list<string>`.

```epsil
[partition("abcd", 2), partition("abcde", 2, 2)]
// ➔ [["ab","cd"],["ab","cd"]]
```

<MathJson name="Partition">

`["Partition", xs, size]`, `["Partition", xs, size, step]`,
`["Partition", xs, predicate]`.

```json example
["Partition", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2], ["List", 3, 4], ["List", 5]]

["Partition", ["List", 1, 2, 3, 4, 5, 6], ["IsEven", "_"]]
// ➔ ["List", ["List", 2, 4, 6], ["List", 1, 3, 5]]
```

</MathJson>

### pointList

`(any+) -> any`

A list of points: zips collection components into a List of point-tuples (Desmos point-list idiom); a plain point when no component is a collection.

```epsil
pointList([1, 2, 3], [4, 5, 6])
// ➔ [(1, 4),(2, 5),(3, 6)]
```

<MathJson name="PointList" latex={["\\operatorname{PointList}"]} />

### pointX

MathJSON `PointX` · `(xs: collection<any> | tuple) -> any`

The x-coordinate of a point, broadcasting over a list of points.

```epsil
pointX((3, 4))
// ➔ 3
```

```epsil
pointX([(1, 2), (3, 4)])
// ➔ [1,3]
```

### pointY

MathJSON `PointY` · `(xs: collection<any> | tuple) -> any`

The y-coordinate of a point, broadcasting over a list of points.

```epsil
pointY((3, 4))
// ➔ 4
```

### pointZ

MathJSON `PointZ` · `(xs: collection<any> | tuple) -> any`

The z-coordinate of a point, broadcasting over a list of points.

```epsil
pointZ((3, 4, 5))
// ➔ 5
```

### position

`(indexed_collection<T>, predicate: (T) any -> boolean) -> list<integer> where T: any`

Return a list of indexes of elements in the collection satisfying the predicate.

```epsil
position([1, 4, 9, 16], x => x > 5)
// ➔ [3,4]
```

<MathJson name="Position">

`["Position", xs, predicate]`.

```json example
["Position", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
// ➔ ["List", 3, 4]
```

</MathJson>

### positiveIntegers

constant `set<integer>`

The set of all positive integers.

```epsil
0 in positiveIntegers
// ➔ "False"
```

<MathJson name="PositiveIntegers" latex={["\\mathbb{N}^*"]} />

### positiveNumbers

constant `set<real>`

The set of all positive real numbers.

```epsil
0 in positiveNumbers
// ➔ "False"
```

<MathJson name="PositiveNumbers" latex={["\\mathbb{R}_{>0}"]} />

### primes

constant `set<integer>`

The set of all prime numbers.

```epsil
filter(1..30, x => x in primes)
// ➔ [2,3,5,7,11,13,17,19,23,29]
```

<MathJson name="Primes" latex={["\\mathbb{P}"]} />

### quotientRing

MathJSON `QuotientRing` · `(set<any>, any) -> set`

The quotient of a ring by the ideal generated by the second argument.

`QuotientRing(Integers, n)` is ℤ/nℤ, the integers modulo `n`.

For an integer literal `n` ≥ 1 it is a finite collection with `n` elements, and `Count` answers. A symbolic modulus, or a base other than `Integers`, stays inert.

The elements of ℤ/nℤ are `ResidueClass(0, n)` … `ResidueClass(n - 1, n)`, which it lists, and the element type is `value`. `Element(ResidueClass(k, n), ℤ/nℤ)` is `True`. An integer is not an element: `Element(7, ℤ/5ℤ)` is `False`, because 7 is a representative of a class, not the class.

```epsil
quotientRing(integers, 5)
// ➔ QuotientRing("Integers", 5)
```

### randomShuffle

`((T) random -> T where T: string) & ((indexed_collection<T>) random -> list<T> where T: any)`

Randomize the order of the elements in the collection. Shuffling a string yields a string. Wrap the call in `WithRandomSeed(seed, ...)` to make it deterministic.

```epsil
randomShuffle([1, 2, 3, 4])
```

There is no seed argument: wrap the call in
[`withRandomSeed`](/reference/core/#withrandomseed) to get the same
permutation on every evaluation.

```epsil
withRandomSeed(42, randomShuffle([5, 2, 10, 18]))
// ➔ [5,18,2,10]
```

A permutation needs every element, so the collection is materialized. A
collection of more than 1,000,000 elements is refused with an `out-of-range`
error.

```epsil
randomShuffle(1..2000000)
// ➔ error: Runtime error: out of range: a collection of at most 1000000 elements, 2000000
```

A permutation of a string is a string, built from the characters of the
source, as for `reverse` and `take`. The same holds for
[`randomSample`](/reference/statistics/#randomsample).

```epsil
randomShuffle("abcdef")
```

<MathJson name="RandomShuffle">

`["RandomShuffle", xs]`. The old name `Shuffle` is no longer defined.

```json example
["WithRandomSeed", 42, ["RandomShuffle", ["List", 5, 2, 10, 18]]]
// ➔ the same permutation on every evaluation
```

</MathJson>

### Range

`(number, number?, step: number?) -> list<number>`

A sequence of numbers from a start to an end value with an optional step.

```epsil
1..5
// ➔ [1,2,3,4,5]
```

```epsil
Range(1, 10, 3)
// ➔ [1,4,7,10]
```

`a..b` is `Range(a, b)`. With one argument, the argument is the upper bound
and the lower bound is 1. With no step, the step is 1, or -1 when the lower
bound is greater than the upper bound. A step of the wrong sign gives an
empty range.

```epsil
Range(7)
// ➔ [1,2,3,4,5,6,7]
5..2
// ➔ [5,4,3,2]
Range(10, 1, -3)
// ➔ [10,7,4,1]
Range(5, 2, 1)
// ➔ []
```

#### Element type

The type of the elements follows the step. With no step or an integer step,
the range is a `list<integer>`. A step that is not an integer, or that is a
constant expression such as `pi/4`, gives a `list<real>`, and a step that is a
symbol with no value gives a `list<number>`.

```epsil
type(Range(0, 1, 0.25))
// ➔ TypeFrom("list<real>")
type(Range(0, 1, s))
// ➔ TypeFrom("list<number>")
```

An exact rational bound or step gives exact elements. A float bound or step,
or a constant expression as the step, gives floats, and `N` of the range gives
floats.

```epsil
Range(0, 1, 1/3)
// ➔ [0,1/3,2/3,1]
sum(Range(0, 1, 1/3))
// ➔ 2
Range(0, 1, pi/4)
// ➔ [0,0.7853981633974483]
N(Range(0, 1, 1/3))
// ➔ [0,0.3333333333333333,0.6666666666666666,1]
```

#### Index spans

A range whose bounds are integers, at least 1, ascending, one apart, is a
contiguous run of valid 1-based indexes: its type is the narrower `range`, an
**index span**. Every other range keeps the `list` types above.

```epsil
[type(2..5), type(Range(7))]
// ➔ [TypeFrom("range"),TypeFrom("range")]
type(Range(1, 10, 2))
// ➔ TypeFrom("list<integer>")
type(Range(5, 2))
// ➔ TypeFrom("list<integer>")
type(Range(0, 5))
// ➔ TypeFrom("list<integer>")
```

A `range` is still an `indexed_collection<integer>`, so a function that
accepts a list of integers accepts it. A function that reads an index span,
such as [`slice`](#slice), can require a `range`, and so reject a descending
or stepped range.

A `range` is an index span. It is not a mathematical interval, which is
[`interval`](/reference/collections/#interval), and not the statistical range
of a data set, which is `max(xs) - min(xs)`.

#### Infinite ranges

The upper bound can be `oo`: the range is then a lazy, unbounded collection.
Its elements are integers, but its type is not `range`, because an index span
is a finite run of positions. `length` gives its extent.

```epsil
type(1..oo)
// ➔ TypeFrom("list<integer>")
length(1..oo)
// ➔ +oo
take(1..oo, 3)
// ➔ [1,2,3]
```

<MathJson name="Range" latex={[".."]}>

`["Range", upper]`, `["Range", lower, upper]`, `["Range", lower, upper, step]`.

```json example
["Range", 3, 9]
// ➔ ["List", 3, 4, 5, 6, 7, 8, 9]

["Range", 1, 10, 2]
// ➔ ["List", 1, 3, 5, 7, 9]

["Range", 0, 1, ["Rational", 1, 3]]
// ➔ ["List", 0, ["Rational", 1, 3], ["Rational", 2, 3], 1]
```

In LaTeX, a range is `\operatorname{range}(…)`, the infix `..`, or an
ellipsis inside a list literal: `[1...9]` (the endpoints only),
`[1, 3, ..., 9]` (the step is inferred from the first two samples, here 2) or
`[0, 0.1, 0.2, ..., 1]` (an inferred float step). The ellipsis is `...`,
`\ldots` or `\dots`. Every sample before the ellipsis must agree with the
inferred step, within `ce.tolerance`; `[0, 0.1, 0.5, \ldots, 1]` is a parse
error. Outside a list literal, an ellipsis parses as the
`ContinuationPlaceholder` symbol.

</MathJson>

### rangeOf

`(indexed_collection<T>, indexed_collection<T>, from: integer?) -> missing | range where T`

Return the 1-based inclusive index span of the first occurrence of `needle` as a contiguous subsequence of the indexed collection, or `Missing` when it does not occur.

The search starts at index `from` (1 by default) and the span is always expressed in the original collection's indices, so `RangeOf(xs, needle, Last(r) + 1)` finds the next non-overlapping occurrence and the loop ends at `Missing`.

On a string the needle is matched character by character, so a match never begins or ends inside a grapheme cluster.

```epsil
rangeOf([10, 20, 30, 40], [30, 40])
// ➔ [3,4]
```

The span is a 1-based inclusive range, printed as a list of its two ends.

```epsil
rangeOf([9, 7, 5, 3], [7, 5])
// ➔ [2,3]
rangeOf([9, 7, 5, 3], [7, 3])
// ➔ "Missing"
```

`rangeOf` and its three companions [`containsSequence`](#containssequence),
[`startsWith`](#startswith) and [`endsWith`](#endswith) read their second
argument as a sequence of elements. This is what separates them from
[`contains`](#contains) and [`indexOf`](#indexof):

| Question | Function |
| :--- | :--- |
| Is `v` one of the elements? | `contains(xs, v)` |
| At what index is the element `v`? | `indexOf(xs, v)` |
| Do these elements occur consecutively? | `containsSequence(xs, needle)` |
| At what indexes? | `rangeOf(xs, needle)` |

With nested lists, one function for both questions could not tell
`indexOf([[1, 2], [3, 4]], [3, 4])`, the element equal to `[3, 4]`, from the
subsequence 3 then 4.

#### Searching from an index

The optional third argument is the index where the search starts, 1 by
default. The span is always in the indexes of the whole collection, so the
next match that does not overlap starts at `last(r) + 1` (or `first(r) + 1`
to allow overlaps), and a loop that runs until `Missing` finds all of them.

```epsil
let xs = [1, 2, 1, 2, 1]
let r = rangeOf(xs, [1, 2])
rangeOf(xs, [1, 2], last(r) + 1)
// ➔ [3,4]
```

| Case | Result |
| :--- | :--- |
| The needle does not occur | `Missing` |
| The start index is past the end | `Missing`, never an error: a match at the very end can produce `length(xs) + 1` |
| The start index is less than 1, or not an integer | An error |
| The needle is empty | An error: an empty span cannot be written (`1..0` is the descending range from 1 to 0) |
| The collection or the needle is infinite, or of unknown length | Unevaluated: the search would not end when the needle does not occur |

```epsil
rangeOf([9, 7, 5, 3], [3], 5)
// ➔ "Missing"
rangeOf([9, 7, 5, 3], [7], 0)
// ➔ error: Runtime error: out of range: an index of 1 or more, 0
rangeOf([9, 7, 5, 3], [])
// ➔ error: Runtime error: out of range: a non-empty needle, []
rangeOf(1..oo, [7, 5])
// ➔ RangeOf(Range(1, +oo), [7,5])
```

#### With slice

When the needle is found, `slice(xs, rangeOf(xs, needle))` has the elements
of the needle. [`slice`](#slice) gives `Missing` for the `Missing` of a
failed search, so the two compose without a test in between. Test the result
with [`isMissing`](/reference/core/#ismissing) or replace it with
[`Coalesce`](/reference/core/#coalesce).

```epsil
slice([9, 7, 5, 3], rangeOf([9, 7, 5, 3], [7, 5]))
// ➔ [7,5]
slice([9, 7, 5, 3], rangeOf([9, 7, 5, 3], [1]))
// ➔ "Missing"
```

On a string the elements are characters, so the search is character by
character and the span is in character indexes. The
[strings reference](/compute-engine/reference/strings/#rangeof) describes
how this case treats grapheme clusters.

```epsil
rangeOf("hello", "ll")
// ➔ [3,4]
```

<MathJson name="RangeOf">

`["RangeOf", xs, needle]`, `["RangeOf", xs, needle, from]`. The span is a
`Range`.

```json example
["RangeOf", ["List", 9, 7, 5, 3], ["List", 7, 5]]
// ➔ ["Range", 2, 3]

["Slice", ["List", 9, 7, 5, 3], ["RangeOf", ["List", 9, 7, 5, 3], ["List", 7, 5]]]
// ➔ ["List", 7, 5]
```

</MathJson>

### rationalNumbers

constant `set<rational>`

The set of all finite rational numbers.

```epsil
sqrt(2) in rationalNumbers
// ➔ "False"
```

<MathJson name="RationalNumbers" latex={["\\mathbb{Q}"]} />

### realNumbers

constant `set<real>`

The set of all finite real numbers.

```epsil
i in realNumbers
// ➔ "False"
```

<MathJson name="RealNumbers" latex={["\\mathbb{R}"]} />

### reduce

`(collection<T>, reducer: (unknown, T) any -> unknown, initial: value?) -> value where T`

Reduce (fold) a collection to a single value by repeatedly applying a binary function, with an optional initial value.

```epsil
reduce([1, 2, 3, 4], (a, b) => a * b)
// ➔ 24
```

`reduce` is a left fold: the function is applied to the first two elements,
then to that result and the next element, and so on. With an initial value,
the first step applies it to the initial value and the first element.

The initial value is evaluated once, at the first step or when the
collection is empty, and the function receives its value, not the expression
as written. Without an initial value, an empty collection gives `Nothing`.

```epsil
reduce([1, 2, 3], (a, b) => a - b, 10)
// ➔ 4
reduce([], (a, b) => a + b, 1 + 4 % 3)
// ➔ 2
reduce([], (a, b) => a + b) == Nothing
// ➔ "True"
```

The name of a function of two arguments can stand for the function.

```epsil
reduce([5, 2, 10, 18], max)
// ➔ 18
```

[`fold`](#fold) is the same fold with the function first. See also
[`fixedPoint`](/reference/control-structures/#fixedpoint), which iterates
without a collection.

<MathJson name="Reduce">

`["Reduce", xs, f]`, `["Reduce", xs, f, initial]`. The name of an operator,
such as `"Add"`, stands for the function of two arguments.

```json example
["Reduce", ["List", 5, 2, 10, 18], "Add"]
// ➔ 35

["Reduce", ["List", 5, 2, 10, 18], ["Function", ["Add", "_1", "_2"]]]
// ➔ 35

["Reduce", ["List"], "Add", ["Add", 1, ["Mod", 4, 3]]]
// ➔ 2
```

</MathJson>

### repeat

`(value: any, count: integer?) -> list`

Produce a sequence by repeating a single value. With 1 argument, returns an infinite sequence; with 2 arguments (value, count), returns a finite list of `count` copies.

```epsil
repeat(0, 3)
// ➔ [0,0,0]
```

The result has the type `list<T>`, where `T` is the type of the value.
`repeat(x)` is `cycle([x])`; see [`cycle`](#cycle).

```epsil
type(repeat(False, 3))
// ➔ TypeFrom("list<boolean>")
repeat(1)
// ➔ [1,1,1,1,1,...]
take(repeat(7), 3) == take(cycle([7]), 3)
// ➔ "True"
```

<MathJson name="Repeat">

`["Repeat", value]`, `["Repeat", value, count]`.

```json example
["Repeat", 42, 5]
// ➔ ["List", 42, 42, 42, 42, 42]
```

</MathJson>

### replaceAt

`((indexed_collection<T>, integer, T) -> list<T> where T: any) & ((indexed_collection<any>, integer, integer, any+) -> list<any>)`

Return a copy of the indexed collection with the element at the 1-based `index` replaced by `value`.

A negative index counts from the end. An out-of-range, zero, or non-integer index leaves the expression unevaluated.

With more than one position, as `At` takes them, the last operand is the value, and each position selects one level of a nested collection (e.g., a matrix).

```epsil
replaceAt([1, 2, 3], 2, 20)
// ➔ [1,20,3]
```

```epsil
replaceAt([[1, 2], [3, 4]], 2, 1, 9)
// ➔ [[1,2],[9,4]]
```

The collection is not changed. An index out of range, or a symbol, at any
level, leaves the call unevaluated. More positions than the collection has
levels is an error.

```epsil
replaceAt([[1, 2], [3, 4]], -1, -1, 9)
// ➔ [[1,2],[3,9]]
replaceAt([[1, 2], [3, 4]], 5, 1, 9)
// ➔ ReplaceAt([[1,2],[3,4]], 5, 1, 9)
replaceAt([1, 2, 3], 1, 1, 9)
// ➔ error: Runtime error: expected `indexed_collection<integer>`, got `1` at `1`
```

A replacement does not change the length of a list. When the value fits the
element type, the result has the type of the collection, so a `vector<3>`
stays a `vector<3>`. Otherwise the element type widens to include the value,
and the result type has no length.

```epsil
type(replaceAt([1, 2, 3], 2, 9))
// ➔ TypeFrom("vector<integer^3>")
type(replaceAt([1, 2, 3], 2, "a"))
// ➔ TypeFrom("list<integer | string>")
```

The form with more than one position compiles to JavaScript only, and only
when the type of the collection shows a list at each level it writes: a
`list<list<number>>` or a `matrix` compiles, and a `list<any>`, or a list
that can hold a string or `Missing` as a row, does not. See
[Compiling expressions](/compute-engine/guides/compiling/).

<MathJson name="ReplaceAt">

`["ReplaceAt", xs, index, value]`, `["ReplaceAt", xs, i, j, …, value]`.

```json example
["ReplaceAt", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 3]

["ReplaceAt", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1, 9]
// ➔ ["List", ["List", 1, 2], ["List", 9, 4]]
```

</MathJson>

### residueClass

`(any, any) -> residue`

An element of ℤ/nℤ: the class of the integer `k` modulo `n`.

The canonical form reduces `k` into 0…n−1, so `ResidueClass(7, 5)` is `ResidueClass(2, 5)`, and two classes are equal when their canonical forms are. `n` must be an exact integer literal ≥ 1, and `k` an exact integer (or a rational with a denominator that is a unit mod `n`); any other call stays inert, a float `k` or `n` included.

Sums, differences, products and integer powers of classes of one modulus are classes. An exact integer or rational next to a class is read in its ring: `ResidueClass(5, 7) + 3` is `ResidueClass(1, 7)`. A float is not. Arithmetic on classes of different moduli stays unevaluated. The inverse, a division and a negative power need a unit: when `gcd(k, n) ≠ 1` they stay unevaluated.

Classes are not ordered, and `Mod` is not this: `Mod(7, 5)` is the integer remainder 2. The elements of `QuotientRing(Integers, n)` are the classes `ResidueClass(0, n)` … `ResidueClass(n - 1, n)`.

LaTeX: `\overline{k}_{n}`, for integer literals `k` and `n ≥ 1`.

```epsil
residueClass(7, 5)
// ➔ ResidueClass(2, 5)
```

```epsil
residueClass(5, 7) + residueClass(4, 7)
// ➔ ResidueClass(2, 7)
```

```epsil
1 / residueClass(3, 7)
// ➔ ResidueClass(5, 7)
```

The canonical form reduces `k` into `[0, n)`. A rational `k` whose
denominator is coprime to `n` is read as `u · v⁻¹` in the ring. A float, a
symbolic `k` or `n`, or a modulus less than 1 stays inert.

```epsil
[residueClass(7, 5), residueClass(-1, 7)]
// ➔ [ResidueClass(2, 5),ResidueClass(6, 7)]
residueClass(1/3, 7)
// ➔ ResidueClass(5, 7)
[residueClass(2.5, 5), residueClass(x, 5)]
// ➔ [ResidueClass(2.5, 5),ResidueClass(x, 5)]
```

Two classes with the same modulus and the same reduced `k` are equal.
Classes are not ordered.

```epsil
residueClass(7, 5) == residueClass(2, 5)
// ➔ "True"
residueClass(1, 3) < residueClass(2, 3)
// ➔ ResidueClass(1, 3) < ResidueClass(2, 3)
```

#### Arithmetic

Sums, differences, products and integer powers of classes with one modulus
are classes. An exact integer, or a rational whose denominator is coprime to
the modulus, is read in the ring. An inverse, a quotient or a negative power
needs `gcd(k, n) = 1`; otherwise the expression stays symbolic.

```epsil
residueClass(5, 7) + residueClass(4, 7)
// ➔ ResidueClass(2, 7)
residueClass(5, 7) + 3
// ➔ ResidueClass(1, 7)
residueClass(3, 7)^100
// ➔ ResidueClass(4, 7)
1 / residueClass(3, 7)
// ➔ ResidueClass(5, 7)
1 / residueClass(2, 4)
// ➔ 1 / ResidueClass(2, 4)
```

A class of another modulus, a float or an infinity is never combined with a
class: the expression stays symbolic. The rules of the numbers do not apply
to a class: `c / c` is not cancelled to 1 when `c` has no inverse.

```epsil
residueClass(1, 5) + residueClass(1, 7)
// ➔ ResidueClass(1, 5) + ResidueClass(1, 7)
residueClass(3, 7) * 1.5
// ➔ 1.5 * ResidueClass(3, 7)
let c = residueClass(2, 4)
c / c
// ➔ ResidueClass(2, 4) / ResidueClass(2, 4)
```

`solve`, `D` and `integrate` stay symbolic for an expression that holds a
class.

```epsil
D(residueClass(3, 7) * x, x)
// ➔ D(x * ResidueClass(3, 7), x)
```

The ring itself, `quotientRing(Integers, n)`, is the finite collection of
its `n` classes; see
[`quotientRing`](/reference/collections/#quotientring). `a % n` is the
integer remainder, not a class: `7 % 3` is 1.

```epsil
[k for k in quotientRing(Integers, 3)]
// ➔ [ResidueClass(0, 3),ResidueClass(1, 3),ResidueClass(2, 3)]
```

<MathJson name="ResidueClass">

`["ResidueClass", k, n]`. In LaTeX, a class is written `\overline{k}_{n}`
with integer literals `k` and `n`, and it serializes back the same way. A
bare `\overline{7}` is `["Conjugate", 7]`, and `\overline{z}_1` is
`["Subscript", ["Conjugate", "z"], 1]`. The ring is written
`\mathbb{Z}/n\mathbb{Z}` or `\mathbb{Z}_n`.

```json example
["ResidueClass", 7, 5]
// ➔ ["ResidueClass", 2, 5]

["ResidueClass", -1, 7]
// ➔ ["ResidueClass", 6, 7]

["ResidueClass", ["Rational", 1, 3], 7]
// ➔ ["ResidueClass", 5, 7]

["Equal", ["ResidueClass", 7, 5], ["ResidueClass", 2, 5]]
// ➔ "True"

["Add", ["ResidueClass", 5, 7], ["ResidueClass", 4, 7]]
// ➔ ["ResidueClass", 2, 7]

["Divide", 1, ["ResidueClass", 2, 4]]
// ➔ ["Divide", 1, ["ResidueClass", 2, 4]]

["Mod", 7, 3]
// ➔ 1
```

</MathJson>

### rest

`((T) -> T where T: string) & ((indexed_collection<T>) -> list<T> where T: any)`

Return the collection without the first element.

If the collection has only one element, return an empty collection.

```epsil
rest([7, 8, 9])
// ➔ [8,9]
```

`rest(xs)` is `drop(xs, 1)`. Of a string, it is a string.

```epsil
rest("hello")
// ➔ "ello"
take(rest(1..oo), 3)
// ➔ [2,3,4]
```

<MathJson name="Rest">

`["Rest", xs]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

</MathJson>

### reverse

`((T) -> T where T: string) & ((T) -> T where T: list) & ((indexed_collection<T>) -> list<T> where T: any)`

Reverse the order of the elements of an indexed collection.

```epsil
reverse([1, 2, 3])
// ➔ [3,2,1]
```

A list keeps its type, its shape included: a `vector<3>` reversed is a
`vector<3>`. A string gives a string. Any other indexed collection, such as a
tuple or a range, gives a `list` of the same elements: a reversed tuple would
have its element types in the wrong order, and a reversed range is
descending, which the `range` type excludes.

```epsil
[reverse("abc"), reverse((1, "a", 2)), reverse(1..4)]
// ➔ ["cba",[2,"a",1],[4,3,2,1]]
type(reverse([1, 2, 3]))
// ➔ TypeFrom("vector<integer^3>")
```

`reverse` is lazy: the reversed collection is not built until its elements
are read.

<MathJson name="Reverse">

`["Reverse", xs]`.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

</MathJson>

### rotateLeft

`((T, integer?) -> T where T: string) & ((T, integer?) -> T where T: list) & ((indexed_collection<T>, integer?) -> list<T> where T: any)`

Rotate the elements of the collection to the left by n positions.

```epsil
rotateLeft([1, 2, 3, 4])
// ➔ [2,3,4,1]
```

The second argument is the number of positions, 1 by default. A string gives
a string.

```epsil
[rotateLeft([5, 2, 10, 18], 2), rotateLeft("abcd", 1)]
// ➔ [[10,18,5,2],"bcda"]
```

<MathJson name="RotateLeft">

`["RotateLeft", xs]`, `["RotateLeft", xs, count]`.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</MathJson>

### rotateRight

`((T, integer?) -> T where T: string) & ((T, integer?) -> T where T: list) & ((indexed_collection<T>, integer?) -> list<T> where T: any)`

Rotate the elements of the collection to the right by n positions.

```epsil
rotateRight([1, 2, 3, 4])
// ➔ [4,1,2,3]
```

The second argument is the number of positions, 1 by default. A string gives
a string.

```epsil
rotateRight([5, 2, 10, 18], 1)
// ➔ [18,5,2,10]
```

<MathJson name="RotateRight">

`["RotateRight", xs]`, `["RotateRight", xs, count]`.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 1]
// ➔ ["List", 18, 5, 2, 10]
```

</MathJson>

### scan

`(indexed_collection<T>, reducer: (unknown, T) any -> unknown, initial: value?) -> indexed_collection where T`

Return the cumulative fold of a collection: a same-length collection whose k-th element is the running result of applying a binary function left to right (optionally seeded by an initial value).

```epsil
scan([1, 2, 3, 4], (a, b) => a + b)
// ➔ [1,3,6,10]
```

Unlike [`reduce`](#reduce), which returns only the final value, `scan`
returns every intermediate value: its `n`-th element is the fold of the
first `n` elements. With an initial value, the first element is
`f(initial, x1)`.

```epsil
scan([3, 1, 4, 1, 5], max)
// ➔ [3,3,4,4,5]
scan([1, 2, 3, 4], (a, b) => a + b, 100)
// ➔ [101,103,106,110]
```

`scan` is lazy: the elements are computed when they are read.

<MathJson name="Scan">

`["Scan", xs, f]`, `["Scan", xs, f, initial]`.

```json example
["Scan", ["List", 1, 2, 3, 4], "Add"]
// ➔ ["List", 1, 3, 6, 10]
```

</MathJson>

### second

`(xs: indexed_collection<any>) -> any`

The second element of a collection.

```epsil
second([7, 8, 9])
// ➔ 8
```

`second(xs)` is `xs[2]`.

```epsil
second((x, y))
// ➔ y
```

<MathJson name="Second">

`["Second", xs]`.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

</MathJson>

### Set

`(any*) -> set`

An unordered collection of distinct elements (a set).

```epsil
{3, 1, 2, 1}
// ➔ Set(1, 2, 3)
```

A set is a **non-indexed** collection of distinct elements. The type of a set
is `set<T>`; `set` is short for `set<any>`. A repeated element is kept once:
two elements are the same when `IsSame` says they are.

```epsil
{12, 15, 17, 12, 15}
// ➔ Set(12, 15, 17)
```

The elements of a set have no order. An enumeration returns them in an
arbitrary order, and two enumerations may return them in different orders.
The elements of a set are counted in constant time.

`...xs` in a set literal splices the elements of `xs`, with the same rules as
in a [list literal](#list): a string spreads into its characters, and a tuple
does not spread.

```epsil
{...{1, 2}, 3}
// ➔ Set(1, 2, 3)
```

<MathJson name="Set" latex={["{","}"]}>

`["Set", ...elements]`.

```json example
["Set", 12, 15, 17, 12, 15]
// ➔ ["Set", 12, 15, 17]

["Set", 1, ["Spread", ["List", 2, 2, 3]]]
// ➔ ["Set", 1, 2, 3]
```

In LaTeX, `\lbrace 12, 15, 17 \rbrace`.

</MathJson>

### setFrom

`(value*) -> set`

Create a set from the elements of a collection.

```epsil
setFrom([1, 2, 2, 3])
// ➔ Set(1, 2, 3)
```

The collection must be finite. An element that occurs more than once is
kept once.

```epsil
setFrom(1..3)
// ➔ Set(1, 2, 3)
```

<MathJson name="SetFrom">

`["SetFrom", xs]`.

```json example
["SetFrom", ["Range", 1, 3]]
// ➔ ["Set", 1, 2, 3]
```

</MathJson>

### setMinus

`(set<any>, value*) -> set`

Return the set difference between the first set and subsequent values.

```epsil
setMinus({1, 2, 3, 4}, 2, 4)
// ➔ Set(1, 3)
```

<MathJson name="SetMinus" latex={["\\setminus"]} />

### Single

`(value: T) -> tuple<T> where T`

A tuple with a single element

```epsil
Single(5)
// ➔ (5)
```

### slice

`((value: T, span: range) -> T where T: string) & ((value: T, start: number, end: number) -> T where T: string) & ((value: indexed_collection<T>, span: range) -> list<T> where T: any) & ((value: indexed_collection<T>, start: number, end: number) -> list<T> where T: any)`

Return a contiguous run of elements from an indexed collection.

Given `start` and `end` (1-based, inclusive), a negative index is counted from the end and out-of-bounds indices are clamped.

Given a `range` (an ascending index span such as `2..4`), returns the elements at those indices: `Slice(xs, r)` is `Slice(xs, First(r), Last(r))`.

```epsil
slice([10, 20, 30, 40, 50], 2, 4)
// ➔ [20,30,40]
```

`slice` is lazy. A `start` past the end, or after `end`, gives an empty
result. Of a string, the result is a string.

```epsil
slice([5, 2, 10, 18], -3, -1)
// ➔ [2,10,18]
slice([5, 2, 10, 18], 5, 9)
// ➔ []
slice("hello", 2, 4)
// ➔ "ell"
```

#### With a range

`slice(xs, r)` is `slice(xs, first(r), last(r))`, with the same clamping. The
range must be a [`range`](#range): an ascending, finite span of 1-based
indexes with step 1. A descending or stepped range is not a `range`, and the
expression stays unevaluated: read as bounds it would contradict its own
elements, since `slice(xs, 3, 2)` is empty while `Range(3, 2)` is `[3, 2]`. To
gather elements at any indexes, in any order, index with a list of indexes
(see [`At`](#at)).

```epsil
slice([5, 2, 10, 18], 3..9)
// ➔ [10,18]
let xs = [5, 2, 10, 18]; slice(xs, Range(3, 2))
// ➔ Slice([5,2,10,18], Range(3, 2))
```

An absent span gives `Missing`, as every function of `Missing` does. A span
from [`rangeOf`](/reference/collections/#rangeof), which is `Missing` when
the needle is absent, can therefore be sliced with no test in between:

```epsil
slice([9, 7, 5, 3], rangeOf([9, 7, 5, 3], [7, 5]))
// ➔ [7,5]
slice([9, 7, 5, 3], rangeOf([9, 7, 5, 3], [1, 2]))
// ➔ "Missing"
```

<MathJson name="Slice">

`["Slice", xs, start, end]`, `["Slice", xs, span]`.

```json example
["Slice", ["List", 5, 2, 10, 18], 2, 3]
// ➔ ["List", 2, 10]

["Slice", ["List", 5, 2, 10, 18], ["Range", 2, 3]]
// ➔ ["List", 2, 10]
```

</MathJson>

### sort

`((T, order: (((character) any -> unknown) | ((character, character) any -> boolean | number))?) -> T where T: string) & ((indexed_collection<T>, order: (((T) any -> unknown) | ((any, any) any -> boolean | number))?) -> list<T> where T: any)`

Return the elements of the collection sorted according to the given comparison function.

```epsil
sort([3, 1, 2])
// ➔ [1,2,3]
```

```epsil
sort(["pear", "fig", "apple"], length)
// ➔ ["fig","pear","apple"]
```

The collection must be indexed: a set has no positions to permute, and
sorting one is an `incompatible-type` error. A string sorts its characters
and gives a string.

```epsil
sort("dcba")
// ➔ "abcd"
sort({3, 1, 2})
// ➔ error: Type error: expected `indexed_collection`, got `set<integer>` at `{1, 2, 3}` in `sort({3, 1, 2})`
```

#### The order function

The optional function is read by its number of parameters.

A **comparator** of two parameters, `(a, b) => …`, returns a negative number
when `a` comes before `b`, zero when they are equivalent, and a positive
number otherwise. It can also return a boolean: `True` means that `a` comes
first, which is what a body such as `a > b` gives.

```epsil
sort([3, 1, 2], (a, b) => b - a)
// ➔ [3,2,1]
sort([1, 2, 3], (a, b) => a > b)
// ➔ [3,2,1]
```

A **key function** of one parameter sorts the elements in ascending order of
their key. The sort is stable: elements with equal keys keep their order.

```epsil
sort([-3, 1, -2, 3, 2], abs)
// ➔ [1,-2,2,-3,3]
```

<MathJson name="Sort">

`["Sort", xs]`, `["Sort", xs, order]`.

```json example
["Sort", ["List", 18, 5, 2, 10]]
// ➔ ["List", 2, 5, 10, 18]

["Sort", ["List", 3, 1, 2], ["Function", ["Subtract", "b", "a"], "a", "b"]]
// ➔ ["List", 3, 2, 1]

["Sort", ["List", -3, 1, -2], ["Abs", "_"]]
// ➔ ["List", 1, -2, -3]
```

</MathJson>

### startsWith

`(indexed_collection<T>, prefix: indexed_collection<T>) -> boolean where T`

Return `True` when the indexed collection begins with `prefix` as a contiguous subsequence.

On a string the prefix is matched character by character, so a prefix that would end inside a grapheme cluster does not match. An empty prefix matches everything.

```epsil
startsWith([1, 2, 3], [1, 2])
// ➔ "True"
```

An empty prefix is `True`. Over an infinite collection, `startsWith` stays
unevaluated.

```epsil
startsWith("hello", "he")
// ➔ "True"
startsWith(1..oo, [1, 2])
// ➔ StartsWith(Range(1, +oo), [1,2])
```

<MathJson name="StartsWith">

`["StartsWith", xs, prefix]`.

```json example
["StartsWith", ["List", 1, 2, 3], ["List", 1, 2]]
// ➔ "True"
```

</MathJson>

### subset

`(any, any*) -> boolean`

Test whether the first collection is a strict subset of the second.

```epsil
subset({1, 2}, {1, 2, 3})
// ➔ "True"
```

<MathJson name="Subset" latex={["\\subset"]} />

### subsetEqual

`(any, any*) -> boolean`

Test whether the first collection is a subset (possibly equal) of the second.

```epsil
subsetEqual({1, 2, 3}, {1, 2, 3})
// ➔ "True"
```

<MathJson name="SubsetEqual" latex={["\\subseteq"]} />

### superset

`(any, any*) -> boolean`

Test whether the first collection is a strict superset of the second.

```epsil
superset({1, 2, 3}, {1, 2})
// ➔ "True"
```

<MathJson name="Superset" latex={["\\supset"]} />

### supersetEqual

`(any, any*) -> boolean`

Test whether the first collection is a superset (possibly equal) of the second.

```epsil
supersetEqual({1, 2}, {1, 2})
// ➔ "True"
```

<MathJson name="SupersetEqual" latex={["\\supseteq"]} />

### symmetricDifference

`(set<any>, set<any>) -> set`

Return the symmetric difference of two sets (elements in either set but not both).

```epsil
symmetricDifference({1, 2, 3}, {2, 3, 4})
// ➔ Set(1, 4)
```

<MathJson name="SymmetricDifference" latex={["\\triangle"]} />

### table

`(function, integer+) -> collection`

An alias for `Tabulate` (the preferred name) that additionally accepts Mathematica-style iterator specs, e.g. `Table(i^2, {i, n})` (`i` from 1 to `n`), `Table(i^2, {i, 1, n})` or `Table(i, {i, lo, hi, step})`, and the equivalent tuple spelling `Table(i^2, (i, 1, n))`.

```epsil
table(i^2, (i, 1, 5))
// ➔ [1,4,9,16,25]
```

Each iterator spec names an index and its bounds, and the body is evaluated
once for each value of the index. A spec is written with parentheses or with
braces: `(k, 1, 5)` and `{k, 1, 5}` are the same. A fourth element is a step.

```epsil
table(k^2, {k, 1, 5})
// ➔ [1,4,9,16,25]
table(k, (k, 1, 10, 4))
// ➔ [1,5,9]
```

Several specs iterate as nested loops, the first spec outermost, and give a
nested list:

```epsil
table(i * j, (i, 1, 2), (j, 1, 3))
// ➔ [[1,2,3],[2,4,6]]
```

With a function and no iterator spec, `table` is
[`tabulate`](#tabulate):

```epsil
table(i => i^2, 5)
// ➔ [1,4,9,16,25]
```

The two spellings of a spec are interchangeable in the other functions that
take one, step included. `integrate` has no step, so it does not read a spec
of four elements as a range in either spelling.

```epsil
[sum(k, (k, 1, 10, 2)), sum(k, {k, 1, 10, 2})]
// ➔ [25,25]
integrate(x, (x, 0, 1, 2))
// ➔ int(x)
```

<MathJson name="Table">

`["Table", f, d1, d2, ...]`, `["Table", body, spec1, ...specs]`. A spec is a
`Tuple` or a `Set`: `["Tuple", "k", 1, 5]` or `["Set", "k", 1, 5]`.

```json example
["Table", ["Square", "k"], ["Tuple", "k", 1, 5]]
// ➔ ["List", 1, 4, 9, 16, 25]

["Table", ["Multiply", "i", "j"], ["Tuple", "i", 1, 2], ["Tuple", "j", 1, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 2, 4, 6]]
```

</MathJson>

### tabulate

`(generator: function, integer+) -> list`

Create a collection by applying a function to each index in the specified dimensions.

```epsil
tabulate((i, j) => i * j, 2, 3)
// ➔ [[1,2,3],[2,4,6]]
```

Indexes start at 1. The function receives one index for each dimension, and
with several dimensions the result is a nested list. Any number of dimensions
is accepted, and a dimension of 0 gives an empty list.

```epsil
tabulate(i => i^2, 5)
// ➔ [1,4,9,16,25]
tabulate(Add, 2, 2, 3)
// ➔ [[[3,4,5],[4,5,6]],[[4,5,6],[5,6,7]]]
tabulate((i, j) => i + j, 2, 0)
// ➔ [[],[]]
```

To give every element the same value, use
[`fill`](/reference/linear-algebra/#fill).

<MathJson name="Tabulate">

`["Tabulate", f, d1, d2, ...]`.

```json example
["Tabulate", ["Function", ["Square", "i"], "i"], 5]
// ➔ ["List", 1, 4, 9, 16, 25]

["Tabulate", ["Function", ["Add", "i", "j"], "i", "j"], 2, 3]
// ➔ ["List", ["List", 2, 3, 4], ["List", 3, 4, 5]]
```

</MathJson>

### take

`((xs: T, count: number) -> T where T: string) & ((xs: indexed_collection<T>, count: number) -> list<T> where T: any)`

Return the first `n` elements of an indexed collection.

A negative `n` counts from the end: `Take(xs, -n)` is the last `n` elements.

A count past the length is clamped: the result is the whole collection.

```epsil
take([1, 2, 3, 4, 5], 2)
// ➔ [1,2]
```

```epsil
take([1, 2, 3, 4, 5], -2)
// ➔ [4,5]
```

`take` is lazy. A count of 0 gives the empty collection, and a count past the
length, in either direction, gives the whole collection. Of a string, the
result is a string.

```epsil
take([5, 2, 10, 18], -10)
// ➔ [5,2,10,18]
take("hello", -2)
// ➔ "lo"
```

A negative count needs the length of the collection. When the length is not
known or is infinite, the expression stays unevaluated.

```epsil
take(1..oo, -2)
// ➔ Take(Range(1, +oo), -2)
```

See [`drop`](#drop) for the elements after the first `n`.

<MathJson name="Take">

`["Take", xs, n]`.

```json example
["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 10, 18]

["Take", "'hello'", -2]
// ➔ "'lo'"
```

</MathJson>

### takeWhile

`(indexed_collection<T>, predicate: (T) any -> boolean) -> indexed_collection where T`

Return the leading elements of the collection for which the predicate returns True, stopping at the first element that does not.

```epsil
takeWhile([1, 2, 3, 10, 4], x => x < 5)
// ➔ [1,2,3]
```

`takeWhile` is lazy and stops at the first element that fails the predicate,
which is not included. It therefore works on an infinite collection.

```epsil
takeWhile(1..oo, x => x < 4)
// ➔ [1,2,3]
```

See [`dropWhile`](#dropwhile) for the elements that remain.

<MathJson name="TakeWhile">

`["TakeWhile", xs, predicate]`.

```json example
["TakeWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 1, 2, 3]
```

</MathJson>

### tally

`(collection<T>) -> tuple<list<T>, list<integer>> where T`

Return a tuple with the unique elements of the collection and their respective counts.

```epsil
tally(["a", "b", "a", "c", "a"])
// ➔ (["a","b","c"], [3,1,1])
```

The first list holds each distinct element once, in the order of its first
occurrence; the second list holds the number of occurrences of each.

```epsil
tally([5, 2, 10, 18, 5, 2, 5])
// ➔ ([5,2,10,18], [3,2,1,1])
```

<MathJson name="Tally">

`["Tally", xs]`.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

</MathJson>

### third

`(xs: indexed_collection<any>) -> any`

The third element of a collection.

```epsil
third([7, 8, 9])
// ➔ 9
```

`third(xs)` is `xs[3]`.

<MathJson name="Third">

`["Third", xs]`.

```json example
["Third", ["List", 5, 2, 10, 18]]
// ➔ 10
```

</MathJson>

### Triple

`(first: T, second: U, third: V) -> tuple<T, U, V> where T, U, V`

A tuple of three elements

```epsil
Triple(1, 2, 3)
// ➔ (1, 2, 3)
```

### Tuple

`(any*) -> tuple`

A fixed number of heterogeneous elements. Nothing retains its slot, and a tuple whose coordinates are all Missing remains a tuple.

```epsil
(1, "a", True)
// ➔ (1, "a", "True")
```

### tupleFrom

`(value*) -> tuple`

Create a tuple from the elements of a collection.

```epsil
tupleFrom([1, 2, 3])
// ➔ (1, 2, 3)
```

The collection must be finite.

```epsil
tupleFrom(1..3)
// ➔ (1, 2, 3)
```

<MathJson name="TupleFrom">

`["TupleFrom", xs]`.

```json example
["TupleFrom", ["Range", 1, 3]]
// ➔ ["Tuple", 1, 2, 3]
```

</MathJson>

### union

`(any+) -> set`

Return the union of two or more collections as a set.

```epsil
union({1, 2}, {2, 3})
// ➔ Set(1, 2, 3)
```

<MathJson name="Union" latex={["\\cup"]} />

### unique

`((T) -> T where T: string) & ((T, test: (character, character) any -> boolean) -> T where T: string) & ((collection<T>) -> list<T> where T: any) & ((collection<T>, test: (T, T) any -> boolean) -> list<T> where T: any)`

Return a list of the unique elements of the collection.

```epsil
unique([1, 2, 1, 3, 2])
// ➔ [1,2,3]
```

The elements keep the order of their first occurrence: `unique(xs)` is
`first(tally(xs))`.

```epsil
unique([5, 2, 10, 18, 5, 2, 5])
// ➔ [5,2,10,18]
```

With a test of two arguments, an element is kept unless the test holds
between an element kept before it and it. A string, with or without a test,
gives a string.

```epsil
unique([1, 2, 3, 4], (a, b) => a % 2 == b % 2)
// ➔ [1,2]
unique("abcab")
// ➔ "abc"
```

<MathJson name="Unique">

`["Unique", xs]`, `["Unique", xs, test]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

</MathJson>

### values

`(dictionary<any>) -> list`

Return a list of the values of a dictionary.

```epsil
values({"a" -> 1, "b" -> 2})
// ➔ [1,2]
```

The values are in the iteration order of the dictionary, the order of the
[`keys`](#keys).

<MathJson name="Values">

`["Values", dictionary]`.

```json example
["Values", ["Dictionary", ["KeyValuePair", "'a'", 1], ["KeyValuePair", "'b'", 2]]]
// ➔ ["List", 1, 2]
```

</MathJson>

### zip

`(indexed_collection<any>+) -> list`

Combine multiple collections element-wise into a list of tuples. The result has the length of the shortest input. Nothing retains its coordinate and source position; a row whose coordinates are all Missing remains a tuple.

```epsil
zip([1, 2, 3], ["a", "b", "c"])
// ➔ [(1, "a"),(2, "b"),(3, "c")]
```

The `n`-th tuple holds the `n`-th element of each collection. The result has
the length of the shortest collection. Its type is
`list<tuple<T1, …, Tn>>`, where each `Ti` is the element type of a
collection (`unknown` for a collection with no element type).

```epsil
zip([1, 2], ["a", "b"], [True, False, True])
// ➔ [(1, "a", "True"),(2, "b", "False")]
type(zip([1, 2], ["a", "b"]))
// ➔ TypeFrom("list<tuple<integer, string>>")
```

<MathJson name="Zip">

`["Zip", xs, ys, …]`.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
```

</MathJson>
