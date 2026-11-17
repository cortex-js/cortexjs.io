<!-- The detail of the entries of /reference/collections/. Format: README.md. -->

## List

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

### MathJSON

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

## Set

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

### MathJSON

`["Set", ...elements]`.

```json example
["Set", 12, 15, 17, 12, 15]
// ➔ ["Set", 12, 15, 17]

["Set", 1, ["Spread", ["List", 2, 2, 3]]]
// ➔ ["Set", 1, 2, 3]
```

In LaTeX, `\lbrace 12, 15, 17 \rbrace`.

## Range

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

### MathJSON

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

## Linspace

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

### MathJSON

`["Linspace", upper]`, `["Linspace", lower, upper]`,
`["Linspace", lower, upper, count]`.

```json example
["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Count", ["Linspace", 0, "PositiveInfinity", 0]]
// ➔ 0
```

## Tabulate

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

### MathJSON

`["Tabulate", f, d1, d2, ...]`.

```json example
["Tabulate", ["Function", ["Square", "i"], "i"], 5]
// ➔ ["List", 1, 4, 9, 16, 25]

["Tabulate", ["Function", ["Add", "i", "j"], "i", "j"], 2, 3]
// ➔ ["List", ["List", 2, 3, 4], ["List", 3, 4, 5]]
```

## Table

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

### MathJSON

`["Table", f, d1, d2, ...]`, `["Table", body, spec1, ...specs]`. A spec is a
`Tuple` or a `Set`: `["Tuple", "k", 1, 5]` or `["Set", "k", 1, 5]`.

```json example
["Table", ["Square", "k"], ["Tuple", "k", 1, 5]]
// ➔ ["List", 1, 4, 9, 16, 25]

["Table", ["Multiply", "i", "j"], ["Tuple", "i", 1, 2], ["Tuple", "j", 1, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 2, 4, 6]]
```

## Repeat

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

### MathJSON

`["Repeat", value]`, `["Repeat", value, count]`.

```json example
["Repeat", 42, 5]
// ➔ ["List", 42, 42, 42, 42, 42]
```

## Cycle

The seed collection must be finite. Use [`take`](#take) to get a finite
number of elements.

```epsil
cycle(1..3)
// ➔ [1,2,3,1,2,...]
take(cycle(1..3), 7)
// ➔ [1,2,3,1,2,3,1]
```

### MathJSON

`["Cycle", seed]`.

```json example
["Take", ["Cycle", ["List", 5, 7, 2]], 5]
// ➔ ["List", 5, 7, 2, 5, 7]
```

## Iterate

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

### MathJSON

`["Iterate", f]`, `["Iterate", f, initial]`.

```json example
["Take", ["Iterate", ["Add", "_", 2], 7], 5]
// ➔ ["List", 9, 11, 13, 15, 17]

["Take", ["Iterate", ["Function", ["Multiply", "n", "acc"], "n", "acc"], 1], 5]
// ➔ ["List", 1, 2, 6, 24, 120]
```

## At

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

### MathJSON

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

## Keys

The keys are in the iteration order of the dictionary, which is the order of
the entries.

```epsil
keys({"b" -> 1, "a" -> 2})
// ➔ ["b","a"]
```

### MathJSON

`["Keys", dictionary]`.

```json example
["Keys", ["Dictionary", ["KeyValuePair", "'a'", 1], ["KeyValuePair", "'b'", 2]]]
// ➔ ["List", "'a'", "'b'"]
```

## Values

The values are in the iteration order of the dictionary, the order of the
[`keys`](#keys).

### MathJSON

`["Values", dictionary]`.

```json example
["Values", ["Dictionary", ["KeyValuePair", "'a'", 1], ["KeyValuePair", "'b'", 2]]]
// ➔ ["List", 1, 2]
```

## Field

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

### MathJSON

`["Field", value, field]`. On a record or a dictionary,
`["Field", d, "'x'"]` is `["At", d, "'x'"]`, including the absence marker for
a key that the dictionary does not have.

```json example
["Field", ["Dictionary", ["KeyValuePair", "'a'", 10]], "'a'"]
// ➔ 10
```

## First

`first(xs)` is `xs[1]`. With a second argument, that argument is the value
when the collection is empty; without it, the value is the absence marker of
[`At`](#at).

```epsil
first((x, y))
// ➔ x
first([], 0)
// ➔ 0
```

### MathJSON

`["First", xs]`, `["First", xs, default]`.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["List"], 0]
// ➔ 0
```

## Second

`second(xs)` is `xs[2]`.

```epsil
second((x, y))
// ➔ y
```

### MathJSON

`["Second", xs]`.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

## Third

`third(xs)` is `xs[3]`.

### MathJSON

`["Third", xs]`.

```json example
["Third", ["List", 5, 2, 10, 18]]
// ➔ 10
```

## Last

`last(xs)` is `xs[-1]`. With a second argument, that argument is the value
when the collection is empty.

```epsil
last([], 0)
// ➔ 0
```

### MathJSON

`["Last", xs]`, `["Last", xs, default]`.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

## Most

`most(xs)` is `drop(xs, -1)`. Of a string, it is a string.

```epsil
most("hello")
// ➔ "hell"
```

### MathJSON

`["Most", xs]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

## Rest

`rest(xs)` is `drop(xs, 1)`. Of a string, it is a string.

```epsil
rest("hello")
// ➔ "ello"
take(rest(1..oo), 3)
// ➔ [2,3,4]
```

### MathJSON

`["Rest", xs]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

## Take

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

### MathJSON

`["Take", xs, n]`.

```json example
["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 10, 18]

["Take", "'hello'", -2]
// ➔ "'lo'"
```

## Drop

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

### MathJSON

`["Drop", xs, n]`.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2, 10, 18], 10]
// ➔ ["List"]
```

## Slice

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

### MathJSON

`["Slice", xs, start, end]`, `["Slice", xs, span]`.

```json example
["Slice", ["List", 5, 2, 10, 18], 2, 3]
// ➔ ["List", 2, 10]

["Slice", ["List", 5, 2, 10, 18], ["Range", 2, 3]]
// ➔ ["List", 2, 10]
```

## TakeWhile

`takeWhile` is lazy and stops at the first element that fails the predicate,
which is not included. It therefore works on an infinite collection.

```epsil
takeWhile(1..oo, x => x < 4)
// ➔ [1,2,3]
```

See [`dropWhile`](#dropwhile) for the elements that remain.

### MathJSON

`["TakeWhile", xs, predicate]`.

```json example
["TakeWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 1, 2, 3]
```

## DropWhile

`dropWhile` is lazy. Once an element fails the predicate, the predicate is not
applied again: the rest of the collection is returned as it is.

```epsil
dropWhile([1, 2, 3, 10, 1], x => x < 5)
// ➔ [10,1]
take(dropWhile(1..oo, x => x < 4), 3)
// ➔ [4,5,6]
```

See [`takeWhile`](#takewhile) for the leading elements.

### MathJSON

`["DropWhile", xs, predicate]`.

```json example
["DropWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 10, 1]
```

## Reverse

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

### MathJSON

`["Reverse", xs]`.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

## RotateLeft

The second argument is the number of positions, 1 by default. A string gives
a string.

```epsil
[rotateLeft([5, 2, 10, 18], 2), rotateLeft("abcd", 1)]
// ➔ [[10,18,5,2],"bcda"]
```

### MathJSON

`["RotateLeft", xs]`, `["RotateLeft", xs, count]`.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

## RotateRight

The second argument is the number of positions, 1 by default. A string gives
a string.

```epsil
rotateRight([5, 2, 10, 18], 1)
// ➔ [18,5,2,10]
```

### MathJSON

`["RotateRight", xs]`, `["RotateRight", xs, count]`.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 1]
// ➔ ["List", 18, 5, 2, 10]
```

## RandomShuffle

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

### MathJSON

`["RandomShuffle", xs]`. The old name `Shuffle` is no longer defined.

```json example
["WithRandomSeed", 42, ["RandomShuffle", ["List", 5, 2, 10, 18]]]
// ➔ the same permutation on every evaluation
```

## Sort

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

### MathJSON

`["Sort", xs]`, `["Sort", xs, order]`.

```json example
["Sort", ["List", 18, 5, 2, 10]]
// ➔ ["List", 2, 5, 10, 18]

["Sort", ["List", 3, 1, 2], ["Function", ["Subtract", "b", "a"], "a", "b"]]
// ➔ ["List", 3, 2, 1]

["Sort", ["List", -3, 1, -2], ["Abs", "_"]]
// ➔ ["List", 1, -2, -3]
```

## Ordering

The optional function is a key or a comparator, as for [`sort`](#sort).
Indexing the collection with its ordering gives the sorted collection: an
index can be a list of indexes.

```epsil
ordering(["pear", "fig", "apple"], length)
// ➔ [2,1,3]
[5, 2, 10, 18][ordering([5, 2, 10, 18])]
// ➔ [2,5,10,18]
```

### MathJSON

`["Ordering", xs]`, `["Ordering", xs, order]`.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]

["At", ["List", 5, 2, 10, 18], ["Ordering", ["List", 5, 2, 10, 18]]]
// ➔ ["List", 2, 5, 10, 18]
```

## MaxBy

The result is an element, not its key. On a tie, the first element wins.
`maxBy` stays unevaluated on an empty or infinite collection, or when a
comparison of keys cannot be decided.

```epsil
[maxBy([-3, 1, -2], abs), maxBy([2, -2, 1], abs)]
// ➔ [-3,2]
maxBy([a, b], abs)
// ➔ MaxBy([a,b], "Abs")
```

### MathJSON

`["MaxBy", xs, key]`.

```json example
["MaxBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ -3
```

## MinBy

The result is an element, not its key. On a tie, the first element wins.
`minBy` stays unevaluated on an empty or infinite collection, or when a
comparison of keys cannot be decided.

```epsil
minBy([-3, 1, -2], abs)
// ➔ 1
```

### MathJSON

`["MinBy", xs, key]`.

```json example
["MinBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

## ArgMax

With a key function, the keys are compared; without one, the elements. On a
tie, the first index wins. `argMax` stays unevaluated on an empty or
infinite collection, or when a comparison cannot be decided.

```epsil
[argMax([5, 2, 10, 18]), argMax([-3, 1, -2], abs)]
// ➔ [4,1]
argMax(1..oo)
// ➔ ArgMax(Range(1, +oo))
```

### MathJSON

`["ArgMax", xs]`, `["ArgMax", xs, key]`.

```json example
["ArgMax", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

## ArgMin

With a key function, the keys are compared; without one, the elements. On a
tie, the first index wins. `argMin` stays unevaluated on an empty or
infinite collection, or when a comparison cannot be decided.

```epsil
[argMin([5, 2, 10, 18]), argMin([-3, 1, -2], abs)]
// ➔ [2,2]
```

### MathJSON

`["ArgMin", xs]`, `["ArgMin", xs, key]`.

```json example
["ArgMin", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 2
```

## Length

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

### MathJSON

`["Length", xs]`.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```

## Count

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

### MathJSON

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

## IsEmpty

A symbol that is not known to be a collection leaves the answer open. A
string is a collection of characters.

```epsil
[isEmpty([5, 2, 10, 18]), isEmpty("Hello"), isEmpty("")]
// ➔ ["False","False","True"]
isEmpty(x)
// ➔ IsEmpty(x)
```

### MathJSON

`["IsEmpty", xs]`.

```json example
["IsEmpty", ["List"]]
// ➔ "True"
```

## Contains

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

### MathJSON

`["Contains", xs, value]`.

```json example
["Contains", ["List", 5, 2, 10, 18], 10]
// ➔ "True"

["Contains", ["Set", 1, 2, 3], "x"]
// ➔ ["Contains", ["Set", 1, 2, 3], "x"]
```

## IndexOf

`indexOf` searches for one element, so in a list of lists the value is a
whole row. To search for a run of several consecutive elements, a sublist or
a substring, use [`rangeOf`](#rangeof).

```epsil
[indexOf([5, 2, 10, 2], 2), indexOf([5, 2, 10, 2], 42)]
// ➔ [2,0]
indexOf([[1, 2], [3, 4]], [3, 4])
// ➔ 2
```

### MathJSON

`["IndexOf", xs, value]`.

```json example
["IndexOf", ["List", 5, 2, 10, 2], 2]
// ➔ 2
```

## RangeOf

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

### MathJSON

`["RangeOf", xs, needle]`, `["RangeOf", xs, needle, from]`. The span is a
`Range`.

```json example
["RangeOf", ["List", 9, 7, 5, 3], ["List", 7, 5]]
// ➔ ["Range", 2, 3]

["Slice", ["List", 9, 7, 5, 3], ["RangeOf", ["List", 9, 7, 5, 3], ["List", 7, 5]]]
// ➔ ["List", 7, 5]
```

## ContainsSequence

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

### MathJSON

`["ContainsSequence", xs, needle]`.

```json example
["ContainsSequence", ["List", 1, 2, 3], ["List", 2, 3]]
// ➔ "True"
```

## StartsWith

An empty prefix is `True`. Over an infinite collection, `startsWith` stays
unevaluated.

```epsil
startsWith("hello", "he")
// ➔ "True"
startsWith(1..oo, [1, 2])
// ➔ StartsWith(Range(1, +oo), [1,2])
```

### MathJSON

`["StartsWith", xs, prefix]`.

```json example
["StartsWith", ["List", 1, 2, 3], ["List", 1, 2]]
// ➔ "True"
```

## EndsWith

An empty suffix is `True`. `endsWith` reads the end of the collection, so it
needs a collection of known length; otherwise it stays unevaluated.

```epsil
endsWith(1..oo, [2, 3])
// ➔ EndsWith(Range(1, +oo), [2,3])
```

### MathJSON

`["EndsWith", xs, suffix]`.

```json example
["EndsWith", ["List", 1, 2, 3], ["List", 2, 3]]
// ➔ "True"
```

## IndexWhere

```epsil
[indexWhere([5, 2, 10, 18], _ > 9), indexWhere([5, 2, 10, 18], _ > 99)]
// ➔ [3,0]
```

### MathJSON

`["IndexWhere", xs, predicate]`.

```json example
["IndexWhere", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 3
```

## Find

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

### MathJSON

`["Find", xs, predicate]`.

```json example
["Find", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 10

["Find", ["List", 5, 2, 10, 18], ["Greater", "_", 100]]
// ➔ "NaN"
```

## CountIf

### MathJSON

`["CountIf", xs, predicate]`.

```json example
["CountIf", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
// ➔ 2
```

## Position

### MathJSON

`["Position", xs, predicate]`.

```json example
["Position", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
// ➔ ["List", 3, 4]
```

## Any

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

### MathJSON

`["Any", xs]`, `["Any", xs, predicate]`.

```json example
["Any", ["List", 1, 2, 3], ["Function", ["Greater", "x", 2], "x"]]
// ➔ "True"

["Any", ["Range", 1, "PositiveInfinity"], ["Function", ["Greater", "x", 5], "x"]]
// ➔ "True"
```

## All

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

### MathJSON

`["All", xs]`, `["All", xs, predicate]`.

```json example
["All", ["List", 1, 2, 3], ["Function", ["Greater", "x", 0], "x"]]
// ➔ "True"

["All", ["Range", 1, "PositiveInfinity"], ["Function", ["Less", "x", 5], "x"]]
// ➔ "False"
```

## Filter

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

### MathJSON

`["Filter", xs, predicate]`.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Less", "_", 10]]
// ➔ ["List", 5, 2]
```

## Map

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

### MathJSON

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

## FlatMap

A result that is a collection is spliced into the output. A result that is
not a collection is kept as one element; it is not an error.

```epsil
flatMap([1, 2, 3], x => 1..x)
// ➔ [1,1,2,1,2,3]
flatMap([1, 2, 3], x => 2 * x)
// ➔ [2,4,6]
```

`flatMap` is lazy: the elements are computed when they are read.

### MathJSON

`["FlatMap", xs, f]`.

```json example
["FlatMap", ["List", 1, 2, 3], ["Function", ["List", "x", "x"], "x"]]
// ➔ ["List", 1, 1, 2, 2, 3, 3]
```

## Reduce

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

### MathJSON

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

## Scan

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

### MathJSON

`["Scan", xs, f]`, `["Scan", xs, f, initial]`.

```json example
["Scan", ["List", 1, 2, 3, 4], "Add"]
// ➔ ["List", 1, 3, 6, 10]
```

## Differences

The differences are exact: integers and rationals stay exact. `differences`
is lazy, so it also applies to an infinite collection.

```epsil
differences([1/2, 1/3, 1/4])
// ➔ [-1/6,-1/12]
take(differences(1..oo), 3)
// ➔ [1,1,1]
```

### MathJSON

`["Differences", xs]`.

```json example
["Differences", ["List", 1, 4, 9, 16]]
// ➔ ["List", 3, 5, 7]
```

## Tally

The first list holds each distinct element once, in the order of its first
occurrence; the second list holds the number of occurrences of each.

```epsil
tally([5, 2, 10, 18, 5, 2, 5])
// ➔ ([5,2,10,18], [3,2,1,1])
```

### MathJSON

`["Tally", xs]`.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

## Zip

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

### MathJSON

`["Zip", xs, ys, …]`.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
```

## Partition

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

### MathJSON

`["Partition", xs, size]`, `["Partition", xs, size, step]`,
`["Partition", xs, predicate]`.

```json example
["Partition", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2], ["List", 3, 4], ["List", 5]]

["Partition", ["List", 1, 2, 3, 4, 5, 6], ["IsEven", "_"]]
// ➔ ["List", ["List", 2, 4, 6], ["List", 1, 3, 5]]
```

## Chunk

To split a collection into parts of a given size, use
[`partition`](#partition). From a string, each group is a string.

```epsil
chunk([1, 2, 3, 4, 5], 2)
// ➔ [[1,2,3],[4,5]]
chunk("abcdef", 2)
// ➔ ["abc","def"]
```

### MathJSON

`["Chunk", xs, count]`.

```json example
["Chunk", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5]]
```

## GroupBy

The keys of a dictionary are strings, so the key that the function returns
is converted to a string.

```epsil
groupBy([1, 2, 3, 4], isEven)
// ➔ {"False" -> [1,3], "True" -> [2,4]}
```

### MathJSON

`["GroupBy", xs, key]`.

```json example
["GroupBy", ["List", 1, 2, 3, 4], ["IsEven", "_"]]
// ➔ {"dict": {"False": [1, 3], "True": [2, 4]}}
```

## ChunkBy

From a string, each run is a string, so the result is a `list<string>`. The
same rule holds for `slidingWindow`, `permutations` and `combinations`.

```epsil
chunkBy([1, 1, 2, 2, 2, 1], x => x)
// ➔ [[1,1],[2,2,2],[1]]
chunkBy("aabbc", x => x)
// ➔ ["aa","bb","c"]
```

### MathJSON

`["ChunkBy", xs, key]`.

```json example
["ChunkBy", ["List", 1, 1, 2, 2, 2, 1], ["Function", "x", "x"]]
// ➔ ["List", ["List", 1, 1], ["List", 2, 2, 2], ["List", 1]]
```

## Join

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

### MathJSON

`["Join", xs, ys, …]`.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]

["Join", ["Set", 1, 2], ["List", 2, 3]]
// ➔ ["Set", 1, 2, 3]

["Join", {str: "ab"}, {str: "cd"}]
// ➔ "abcd"
```

## Append

Collections are immutable: `append` returns a new collection and does not
change its argument.

### MathJSON

`["Append", xs, element, …]`.

```json example
["Append", ["List", 1, 2], 3]
// ➔ ["List", 1, 2, 3]
```

## Insert

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

### MathJSON

`["Insert", xs, index, value]`.

```json example
["Insert", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 2, 3]
```

## DeleteAt

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

### MathJSON

`["DeleteAt", xs, index]`, `["DeleteAt", dictionary, key]`.

```json example
["DeleteAt", ["List", 1, 2, 3], -1]
// ➔ ["List", 1, 2]

["DeleteAt", {dict: {a: 1, b: "x"}}, {str: "b"}]
// ➔ {dict: {a: 1}}
```

## ReplaceAt

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

### MathJSON

`["ReplaceAt", xs, index, value]`, `["ReplaceAt", xs, i, j, …, value]`.

```json example
["ReplaceAt", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 3]

["ReplaceAt", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1, 9]
// ➔ ["List", ["List", 1, 2], ["List", 9, 4]]
```

## Fold

`fold` is [`reduce`](#reduce) with the function first. Without an initial
value, it starts from the first element: `fold(f, xs)` is `reduce(xs, f)`.

```epsil
fold((acc, x) => acc * 10 + x, 0, [1, 2, 3])
// ➔ 123
fold(max, [3, 9, 2])
// ➔ 9
```

### MathJSON

`["Fold", f, initial, xs]`, `["Fold", f, xs]`.

```json example
["Fold", "Add", 0, ["List", 1, 2, 3, 4]]
// ➔ 10

["Fold", "Add", ["Sqrt", 2], ["List"]]
// ➔ ["Sqrt", 2]
```

## Unique

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

### MathJSON

`["Unique", xs]`, `["Unique", xs, test]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

## Dedup

`dedup` is lazy: the elements are computed when they are read. A string
gives a string.

```epsil
dedup("aabba")
// ➔ "aba"
```

### MathJSON

`["Dedup", xs]`.

```json example
["Dedup", ["List", 1, 1, 2, 2, 1]]
// ➔ ["List", 1, 2, 1]
```

## ListFrom

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

### MathJSON

`["ListFrom", xs]`.

```json example
["ListFrom", ["Range", 1, 3]]
// ➔ ["List", 1, 2, 3]
```

## SetFrom

The collection must be finite. An element that occurs more than once is
kept once.

```epsil
setFrom(1..3)
// ➔ Set(1, 2, 3)
```

### MathJSON

`["SetFrom", xs]`.

```json example
["SetFrom", ["Range", 1, 3]]
// ➔ ["Set", 1, 2, 3]
```

## TupleFrom

The collection must be finite.

```epsil
tupleFrom(1..3)
// ➔ (1, 2, 3)
```

### MathJSON

`["TupleFrom", xs]`.

```json example
["TupleFrom", ["Range", 1, 3]]
// ➔ ["Tuple", 1, 2, 3]
```

## DictionaryFrom

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

### MathJSON

`["DictionaryFrom", pairs]`. A `Dictionary` literal with `["Spread", d]`
entries is evaluated as a `DictionaryFrom` of the joined entries.

```json example
["DictionaryFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ {"dict": {"a": 1, "b": 2}}
```

## ResidueClass

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

### MathJSON

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
