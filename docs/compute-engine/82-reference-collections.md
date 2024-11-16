---
title: Collections
slug: /compute-engine/reference/collections/
date: Last Modified
---

<Intro>
In the Compute Engine, **collections** are used to represent data structures.
They group together multiple elements into one unit. Each element in a
collection is a
[**Boxed Expression**](/compute-engine/guides/expressions/).
</Intro>

Collections are **immutable**. They cannot be modified. Operations on
collections return new collections.

A `["List"]` expression can represent an heterogeneous collection of elements.

<Latex value="\lbrack 42, 3.14, x, y \rbrack"/>

```json example
["List", 42, 3.14, "x", "y"]
```

List of numbers can be used to represent **vectors**.

<Latex value="\lbrack 1, 2, 3 \rbrack"/>

```json example
["List", 1, 2, 3]
```

A **matrix** is represented using a `List` of `List` of numbers.

<Latex value="\lbrack \lbrack 1, 2, 3 \rbrack, \lbrack 4, 5, 6 \rbrack, \lbrack 7, 8, 9 \rbrack \rbrack"/>

```json example
["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]
```

Lists of lists can also be represented using a `;` separator:

<Latex value="\lbrack 1, 2, 3 ; 4, 5, 6 ; 7, 8, 9 \rbrack"/>

And matrixes can be represented using LaTeX environments:

<Latex value="\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}"/>

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrixes and tensors.<Icon name="chevron-right-bold" />
</ReadMore>

Another common collection is the `Range` which is used to represent a sequence
of numbers from a lower bound to an upper bound. Both lower and upper bounds are
included in the range.

<Latex value="\lbrack 1..10 \rbrack"/>

```json example
["Range", 1, 10]
```

Collections operations such as `IsEmpty`, `Extract`, `IndexOf` can be applied to
any collection types.

<Latex value="\lbrack 2, 5, 7 \rbrack_{2}"/>

```json example
["Extract", ["List", 2, 5, 7], 2]
// ➔ ["List", 5]
```

<Latex value="(2..10)_5"/>

```json example
["Extract", ["Range", 2, 10], 5]
// ➔ ["List", 7]
```

## Creating Collections

This section contains functions that return a collection, but whose arguments
are not collections. They are used to create collections.

<FunctionDefinition name="List">

<Signature name="List">_x-1_, ..._x-2_</Signature>

A `List` is an **ordered**, **indexable** collection of elements. An element in
a list may be repeated.

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
ce.box(["List", 5, 2, 10, 18]).latex;
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.box(["Delimiter", ["List", 5, 2, 10, 18], "<;>"]).latex;
// ➔ "\langle5; 2; 10; 18\rangle"
```

| MathJSON                        | LaTeX                              |
| :------------------------------ | :--------------------------------- |
| `["List", "x", "y", 7, 11]`     | $$ \lbrack x, y, 7, 11\rbrack $$ |
| `["List", "x", "Nothing", "y"]` | $$ \lbrack x,,y\rbrack $$        |

</FunctionDefinition>

<FunctionDefinition name="Range">

<Signature name="Range">_upper_</Signature>

<Signature name="Range">_lower_, _upper_</Signature>

<Signature name="Range">_lower_, _upper_, _step_</Signature>

A sequence of numbers, starting with `lower`, ending with `upper`, and
incrementing by `step`.

If the `step` is not specified, it is assumed to be `1`.

If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be `1`.

```json example
["Range", 3, 9]
// ➔ ["List", 3, 4, 5, 6, 7, 8, 9]

["Range", 7]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7]

["Range", 1, 10, 2]
// ➔ ["List", 1, 3, 5, 7, 9]

["Range", 10, 1, -1]
// ➔ ["List", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

</FunctionDefinition>

<FunctionDefinition name="Linspace">

<Signature name="Linspace">_upper_</Signature>

<Signature name="Linspace">_lower_, _upper_</Signature>

<Signature name="Linspace">_lower_, _upper_, _count_</Signature>

Short for "linearly spaced", from the (MATLAB function of the same
name)[mathworks.com/help/matlab/ref/linspace.html].

A sequence of numbers. Similar to `Range` but the number of elements in the
collection is specified with `count` instead of a `step` value.

If the `count` is not specified, it is assumed to be `50`.

If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be `1`.

```json example
["Linspace", 3, 9]
// ➔ ["List", 3, 3.163265306122449, 3.326530612244898, 3.489795918367347, 3.653061224489796, 3.816326530612245, 3.979591836734694, 4.142857142857143, 4.3061224489795915, 4.469387755102041, 4.63265306122449, 4.795918367346939, 4.959183673469388, 5.122448979591837, 5.285714285714286, 5.448979591836735, 5.612244897959184, 5.775510204081633, 5.938775510204081, 6.1020408163265305, 6.26530612244898, 6.428571428571429, 6.591836734693878, 6.755102040816326, 6.918367346938775, 7.081632653061225, 7.244897959183673, 7.408163265306122, 7.571428571428571, 7.73469387755102, 7.8979591836734695, 8.061224489795919, 8.224489795918368, 8.387755102040817, 8.551020408163266, 8.714285714285714, 8.877551020408163, 9.040816326530612, 9.204081632653061, 9.36734693877551, 9.53061224489796, 9.693877551020408, 9.857142857142858, 10]

["Linspace", 7]
// ➔ ["List", 1, 1.1428571428571428, 1.2857142857142858, 1.4285714285714286, 1.5714285714285714, 1.7142857142857142, 1.8571428571428572, 2]

["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Linspace", 10, 1, 10]
// ➔ ["List", 10, 9.11111111111111, 8.222222222222221, 7.333333333333333, 6.444444444444445, 5.555555555555555, 4.666666666666666, 3.7777777777777777, 2.888888888888889, 2]

```

</FunctionDefinition>

<FunctionDefinition name="Set">

<Signature name="Set">_expr-1_, ..._expr-2_</Signature>

An **unordered** collection of unique elements.

<Latex value="\lbrace 12, 15, 17 \rbrace"/>

```json example
["Set", 12, 15, 17]
```

</FunctionDefinition>

<FunctionDefinition name="Fill">

<Signature name="Fill">_dimensions_, _value_</Signature>

<Signature name="Fill">_dimensions_, _function_</Signature>

Create a list of the specified dimensions.

If a `value` is provided, the elements of the list are all set to that value.

If a `function` is provided, the elements of the list are computed by applying
the function to the index of the element.

If `dimensions` is a number, a list of that length is created.

```json example
["Fill", 3, 0]
// ➔ ["List", 0, 0, 0]
```

If dimension is a tuple, a matrix of the specified dimensions is created.

```json example
["Fill", ["Tuple", 2, 3], 0]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0]]
```

If a `function` is specified, it is applied to the index of the element to
compute the value of the element.

```json example
["Fill", ["Tuple", 2, 3], ["Function", ["Add", "i", "j"], "i", "j"]]
// ➔ ["List", ["List", 0, 1, 2], ["List", 1, 2, 3]]
```

</FunctionDefinition>

<FunctionDefinition name="Repeat">

<Signature name="Repeat">_expr_</Signature>

An infinite collection of the same element.

```json example
["Repeat", 0]
// ➔ ["List", 0, 0, 0, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Repeat", 42], 3]
// ➔ ["List", 42, 42, 42]
```

**Note:** `["Repeat", n]` is equivalent to `["Cycle", ["List", n]]`.

</FunctionDefinition>

<FunctionDefinition name="Cycle">

<Signature name="Cycle">_seed_</Signature>

A collection that repeats the elements of the `seed` collection. The input
collection must be finite.

```json example
["Cycle", ["List", 5, 7, 2]]
// ➔ ["List", 5, 7, 2, 5, 7, 2, 5, 7, ...]

["Cycle", ["Range", 3]]
// ➔ ["List", 1, 2, 3, 1, 2, 3, 1, 2, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Cycle", ["List", 5, 7, 2]], 5]
// ➔ ["List", 5, 7, 2, 5, 7]
```

</FunctionDefinition>

<FunctionDefinition name="Iterate">

<Signature name="Iterate">_function_</Signature>

<Signature name="Iterate">_function_, _initial_</Signature>

An infinite collection of the results of applying `function` to the initial
value.

If the `initial` value is not specified, it is assumed to be `0`

```json example
["Iterate", ["Function", ["Multiply", "_", 2]], 1]


// ➔ ["List", 1, 2, 4, 8, 16, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Iterate", ["Function", ["Add", "_", 2]], 7], 5]
// ➔ ["List", 7, 9, 11, 13, 15]
```

</FunctionDefinition>

## Transforming Collections

This section contains functions whose argument is a collection and which return
a collection made of a subset of the elements of the input.

<FunctionDefinition name="Drop">

<Signature name="Drop">_collection_, _n_</Signature>

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2], -2]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<FunctionDefinition name="Exclude">

<Signature name="Exclude">_collection_, _index_</Signature>

<Signature name="Exclude">_collection_, _index1_, _index2_</Signature>

<Signature name="Exclude">_collection_, _range_</Signature>

`Exclude` is the opposite of `Extract`. It returns a list of the elements that
are not at the specified indexes.

The elements are returned in the same order as they appear in the collection.

```json example
["Exclude", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 10, 18]

["Exclude", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 2, 18]

["Exclude", ["List", 5, 2, 10, 18], ["Range", 2, 3]]
// ➔ ["List", 5, 2]

["Exclude", ["List", 5, 2, 10, 18], ["Range", 1, -1, 2]]

// ➔ ["List", 2, 18]
```

An index may be repeated, but the corresponding element will only be dropped
once.

```json example
["Exclude", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 2, 18]
```

</FunctionDefinition>



<FunctionDefinition name="Extract">

<Signature name="Extract">_collection_, _index_</Signature>

<Signature name="Extract">_collection_, _index1_, _index2_</Signature>

<Signature name="Extract">_collection_, _range_</Signature>

Returns a list of the elements at the specified indexes.

`Extract` is a flexible function that can be used to extract a single element, a
range of elements, or a list of elements.

`Extract` always return a list, even if the result is a single element. If no
elements match, an empty list is returned.

```json example
["Extract", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10]

["Extract", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 10, 5]


["Extract", ["List", 5, 2, 10, 18], 17]
// ➔ ["List"]
```

When using a range, it is specified as a [`Range`](#Range) expression.

```json example
// Elements 2 to 3
["Extract", ["List", 5, 2, 10, 18], ["Range", 2, 4]]
// ➔ ["List", 2, 10, 18]

// From start to end, every other element
["Extract", ["List", 5, 2, 10, 18], ["Range", 1, -1, 2]]
// ➔ ["List", 5, 10]
```

The elements are returned in the order in which they're specified. Using
negative indexes (or ranges) reverses the order of the elements.

```json example
// From last to first = reverse
["Extract", ["List", 5, 2, 10, 18], ["Range", -1, 1]]
// ➔ ["List", 18, 10, 2, 5]

// From last to first = reverse
["Extract", ""desserts"", ["Range", -1, 1]]
// ➔ ""stressed""
```

An index can be repeated to extract the same element multiple times.

```json example
["Extract", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 10, 10, 5]
```

</FunctionDefinition>


<FunctionDefinition name="First">

<Signature name="First">_collection_</Signature>

Return the first element of the collection.

It's equivalent to `["Take", _collection_, 1]`.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["Tuple", "x", "y"]]
// ➔ "x"
```

</FunctionDefinition>



<FunctionDefinition name="Join">

<Signature name="Join">_collection-1_, _collection-2_, ...</Signature>

Returns a collection that contains the elements of the first collection followed
by the elements of the second collection.

All the collections should have the same head.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

</FunctionDefinition>

<FunctionDefinition name="Take">

<Signature name="Take">_collection_, _n_</Signature>

Return a list of the first `n` elements of the collection.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

</FunctionDefinition>

<FunctionDefinition name="Last">

<Signature name="Last">_collection_</Signature>

Return the last element of the collection.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

<Signature name="Last">_collection_, _n_</Signature>

Return the last _n_ elements of the collection.

```json example
["Last", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]
```

</FunctionDefinition>


<FunctionDefinition name="Most">

<Signature name="Most">_collection_</Signature>

Return everything but the last element of the collection.

It's equivalent to `["Drop", _collection_, -1]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

</FunctionDefinition>

<FunctionDefinition name="Rest">

<Signature name="Rest">_collection_</Signature>

Return everything but the first element of the collection.

It's equivalent to `["Drop", _collection_, 1]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

</FunctionDefinition>


<FunctionDefinition name="Reverse">

<Signature name="Reverse">_collection_</Signature>

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", _collection_, ["Tuple", -1, 1]]`.

</FunctionDefinition>

<FunctionDefinition name="RotateLeft">

<Signature name="RotateLeft">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<FunctionDefinition name="RotateRight">

<Signature name="RotateRight">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<FunctionDefinition name="Second">

<Signature name="Second">_collection_</Signature>

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

</FunctionDefinition>



<FunctionDefinition name="Shuffle">

<Signature name="Shuffle">_collection_</Signature>

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

</FunctionDefinition>

<FunctionDefinition name="Sort">

<Signature name="Sort">_collection_</Signature>

<Signature name="Sort">_collection_, _order-function_</Signature>

Return the collection in sorted order.

```json example
["Sort", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>

<FunctionDefinition name="Unique">

<Signature name="Unique">_collection_</Signature>

Returns a list of the elements in `collection` without duplicates.

This is equivalent to the first element of the result of `Tally`:
`["First", ["Tally", _collection_]]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

</FunctionDefinition>

## Operating On Collections

The section contains functions whose argument is a collection, but whose return
value is not a collection.

<FunctionDefinition name="At">

<Signature name="At">_collection_, _index_</Signature>

<Signature name="At">_collection_, _index1_, _index2_, ...</Signature>

Returns the element at the specified index.

There can be multiple indexes, up to the rank of the collection.

```json example
["At", ["List", 5, 2, 10, 18], 2]
// ➔ 10

["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10

["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3
```

</FunctionDefinition>

<FunctionDefinition name="Filter">

<Signature name="Filter">_collection_, _function_</Signature>

Returns a collection where _function_ is applied to each element of the
collection. Only the elements for which the function returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<FunctionDefinition name="Fold">

<Signature name="Fold">_collection_, _fn_</Signature>

<Signature name="Fold">_collection_, _fn_, _initial_</Signature>

Returns a collection where the reducing function _fn_ is applied to each element
of the collection.

`Fold` performs a _left fold_ operation: the reducing function is applied to the
first two elements, then to the result of the previous application and the next
element, etc...

When an `initial` value is provided, the reducing function is applied to the
initial value and the first element of the collection, then to the result of the
previous application and the next element, etc...

```json example
[
  "Fold",
  ["List", 5, 2, 10, 18]
  ["Function", ["Add", "_1", "_2"]],
]
// ➔ 35
```

The name of a function can be used as a shortcut for a function that takes two
arguments.

```json example
["Fold", ["List", 5, 2, 10, 18], "Add"]
// ➔ 35
```

<ReadMore path="/compute-engine/reference/control-structures/#FixedPoint" >
See also the **`FixedPoint` function** which operates without a collection.<Icon name="chevron-right-bold" />
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Length">

<Signature name="Length">_collection_</Signature>

Returns the number of elements in the collection.

When the collection is a matrix (list of lists), `Length` returns the number of
rows.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```

When the collection is a string, `Length` returns the number of characters in
the string.

```json example
["Length", { "str": "Hello" }]
// ➔ 5
```

</FunctionDefinition>

<FunctionDefinition name="IsEmpty">

<Signature name="IsEmpty">_collection_</Signature>

Returns the symbol `True` if the collection is empty.

```json example
["IsEmpty", ["List", 5, 2, 10, 18]]
// ➔ "False"

["IsEmpty", ["List"]]
// ➔ "True"

["IsEmpty", "x"]
// ➔ "True"


["IsEmpty", {str: "Hello"]
// ➔ "False"
```

</FunctionDefinition>

<FunctionDefinition name="Map">

<Signature name="Map">_collection_, _function_</Signature>

Returns a collection where _function_ is applied to each element of the input
collection.

```json example
["Map", ["Function", ["Add", "x", 1], "x"], ["List", 5, 2, 10, 18]]
// ➔ ["List", 6, 3, 11, 19]
```

```json example
["Map", ["List", 5, 2, 10, 18], ["Function", ["Add", "_", 1]]]
// ➔ ["List", 6, 3, 11, 19]
```

</FunctionDefinition>




<FunctionDefinition name="Ordering">

<Signature name="Ordering">_collection_</Signature>

<Signature name="Ordering">_collection_, _order-function_</Signature>

Return the indexes of the collection in sorted order.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]
```

To get the values in sorted order, use `Extract`:

```json example
["Assign", "l", ["List", 5, 2, 10, 18]]
["Extract", "l", ["Ordering", "l"]]
// ➔ ["List", 2, 5, 10, 18]

// Same as Sort:
["Sort", "l"]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>

<FunctionDefinition name="Tally">

<Signature name="Tally">_collection_</Signature>

Returns a tuples of two lists:

- The first list contains the unique elements of the collection.
- The second list contains the number of times each element appears in the
  collection.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

</FunctionDefinition>

<FunctionDefinition name="Zip">

<Signature name="Zip">_collection-1_, _collection-2_, ...</Signature>

Returns a collection of tuples where the first element of each tuple is the
first element of the first collection, the second element of each tuple is the
second element of the second collection, etc.

The length of the resulting collection is the length of the shortest collection.

```json example
["Zip", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", ["Tuple", 1, 4], ["Tuple", 2, 5], ["Tuple", 3, 6]]
```

</FunctionDefinition>
