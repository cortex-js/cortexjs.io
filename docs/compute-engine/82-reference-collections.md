---
title: Collections
slug: /compute-engine/reference/collections/
date: Last Modified
---

<Intro>
In the Compute Engine, **collections** group together multiple elements
into one unit. Each element in a collection is a
[**Boxed Expression**](/compute-engine/guides/expressions/).
</Intro>

## Introduction

Collections are **immutable**. They cannot be modified. Operations on
collections produce new collections.

There are several types of collections in the Compute Engine:
- **Lists**: ordered collections of elements, which are also used to represent
  **vectors** and **matrices**. Elements in a list are accessed by their
  index, which starts at 1.
- **Sets**: unordered collections of unique elements. The elements in a set are
  not accessed by index, they are enumerated. A set can contain an infinite number
  of elements.
- **Tuples**: ordered collections of elements, but with a fixed number of elements that have a specific type and an optional name.
- **Records**: unordered collections of key-value pairs.
- **Ranges** and **Linear Spaces (linspaces)**: ordered sequences of numbers (integers and reals, respectively) with a specified start, end and step size.


<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices and tensors.<Icon name="chevron-right-bold" />
</ReadMore>


### Operations on Collections

Operations creating new collections:
- [**List**](#list), [**Range**](#range), [**Linspace**](#linspace), [**Set**](#set): create a new collection from some values.
- [**Fill**](#fill), [**Repeat**](#repeat), [**Cycle**](#cycle), [**Iterate**](#iterate): create a new collection from a function or a value.

Operations on ordered and unordered collections:
- [**Length**](#length), [**IsEmpty**](#isempty): check the size of a collection.
- [**Filter**](#filter), [**Map**](#map), [**Reduce**](#reduce): apply a function to each element of a collection.
- [**Join**](#join), [**Zip**](#zip): combine multiple collections into one.
- [**Tally**](#tally): count the number of occurrences of each element in a collection.


Operations on ordered collections:
- [**At**](#at), [**First**](#first), [**Second**](#second), [**Last**](#last): access a specific element of a collection.
- [**Take**](#take), [**Drop**](#drop), [**Most**](#most), [**Rest**](#rest): access a subset of a collection.
- [**IndexOf**](#indexof): find the index of an element in a collection.
- [**Extract**](#extract), [**Exclude**](#exclude): access a collection of elements at specific indexes.
- [**Sort**](#sort), [**Shuffle**](#shuffle), [**Reverse**](#reverse): reorder a collection.
- [**Unique**](#unique): remove duplicates from a collection.
- [**RotateLeft**](#rotateleft), [**RotateRight**](#rotateright): rotate a collection to the left or right.


### Indexing Collections

Ordered collections (lists, tuples, ranges and linspaces) are indexed starting from 1. Negative indexes count from the end of
the collection. For example, `-1` is the last element, `-2` is the second to last
element, etc.

```json example
["At", ["List", 2, 5, 7, 11], -2]
// ➔ 7

["At", ["Range", 2, 10], -1]
// ➔ ["List", 10]
```



## Creating Collections

This section contains functions that create new collections from some values.

<div style={{visibility:"hidden"}}>
### List
</div>

<FunctionDefinition name="List">

<Signature name="List" returns="list">..._element_:any</Signature>

A `List` is an **ordered**, **indexable** collection of elements. An element in
a list may be repeated.

<Latex value="\lbrack 42, 3.14, x, y \rbrack"/>

```json example
["List", 42, 3.14, "x", "y"]
```

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
ce.box(["List", 5, 2, 10, 18]).latex;
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.box(["Delimiter", ["List", 5, 2, 10, 18], "<;>"]).latex;
// ➔ "\langle5; 2; 10; 18\rangle"
```

A **vector** is represented as a `List` of numbers.

<Latex value="\lbrack 1, 2, 3 \rbrack"/>

```json example
["List", 1, 2, 3]
```

A **matrix** is represented using a `List` of rows of numbers, where each row is
a `List` of numbers.

<Latex value="\lbrack \lbrack 1, 2, 3 \rbrack, \lbrack 4, 5, 6 \rbrack, \lbrack 7, 8, 9 \rbrack \rbrack"/>

```json example
["List", 
  ["List", 1, 2, 3], 
  ["List", 4, 5, 6], 
  ["List", 7, 8, 9]
]
```

In LaTeX, lists of lists can also be represented using a `;` separator:

<Latex value="\lbrack 1, 2, 3 ; 4, 5, 6 ; 7, 8, 9 \rbrack"/>

And matrices can be represented using LaTeX environments with the `\begin{}` and `\end{}` commands:


<Latex value="\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}"/>

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices and tensors.<Icon name="chevron-right-bold" />
</ReadMore>


| MathJSON                        | LaTeX                              |
| :------------------------------ | :--------------------------------- |
| `["List", "x", "y", 7, 11]`     | $$ \lbrack x, y, 7, 11\rbrack $$ |
| `["List", "x", "Nothing", "y"]` | $$ \lbrack x,,y\rbrack $$        |

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Range
</div>

<FunctionDefinition name="Range">

<Signature name="Range" returns="collection<integer>">_upper_:integer</Signature>

<Signature name="Range" returns="collection<integer>">_lower_:integer, _upper_:integer</Signature>

<Signature name="Range" returns="collection<integer>">_lower_:integer, _upper_:integer, _step_:integer</Signature>

A sequence of numbers, starting with `lower`, ending with `upper`, and
incrementing by `step`.

If the `step` is not specified, it is assumed to be 1.

```json example
["Range", 3, 9]
// ➔ ["List", 3, 4, 5, 6, 7, 8, 9]

["Range", 1, 10, 2]
// ➔ ["List", 1, 3, 5, 7, 9]
```


If there is a single argument, it is assumed to be the `upper` bound, and the
`lower` bound is assumed to be 1.

```json example
["Range", 7]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7]
```
If the `lower` bound is greater than the `upper` bound, the `step` must be
negative.

```json example
["Range", 10, 1, -1]
// ➔ ["List", 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Linspace
</div>

<FunctionDefinition name="Linspace">

<Signature name="Linspace" returns="collection<real>">_upper_:real</Signature>

<Signature name="Linspace" returns="collection<real>">_lower_:real, _upper_:real</Signature>

<Signature name="Linspace" returns="collection<real>">_lower_:real, _upper_:real, _count_:integer</Signature>

Short for "linearly spaced", from the [MATLAB function of the same
name](https://mathworks.com/help/matlab/ref/linspace.html).

A sequence of numbers evenly spaced between `lower` and `upper`. Similar to `Range` but the number of elements in the collection is specified with `count` instead of a `step` value.

If the `count` is not specified, it is assumed to be `50`.

If there is a single argument, it is assumed to be the `upper` bound, and the `lower` bound is assumed to be `1`.

```json example
["Linspace", 3, 10]
// ➔ ["List", 3, 3.142857142857143, 3.2857142857142856, 
// 3.4285714285714284, 3.571428571428571, 3.714285714285714, 
// 3.857142857142857, 4, 4.142857142857143, 4.285714285714286, 
// 4.428571428571429, 4.571428571428571, 4.714285714285714,
// 4.857142857142857, 5, 5.142857142857143, 5.285714285714286, 
// 5.428571428571429, 5.571428571428571, 5.714285714285714, 
// 5.857142857142857, 6, 6.142857142857143, 6.285714285714286, 
// 6.428571428571429, 6.571428571428571, 6.714285714285714, 
// 6.857142857142857, 7, 7.142857142857143, 7.285714285714286, 
// 7.428571428571429, 7.571428571428571, 7.714285714285714, 
// 7.8979591836734695, 8.061224489795919, 8.224489795918368, 
// 8.387755102040817, 8.551020408163266, 8.714285714285714, 
// 8.877551020408163, 9.040816326530612, 9.204081632653061, 
// 9.36734693877551, 9.53061224489796, 9.693877551020408, 
// 9.857142857142858, 10]

["Linspace", 2]
// ➔ ["List", 1, 1.1428571428571428, 1.2857142857142858, 
// 1.4285714285714286, 1.5714285714285714, 
// 1.7142857142857142, 1.8571428571428572, 2]

["Linspace", 1, 10, 5]
// ➔ ["List", 1, 3.25, 5.5, 7.75, 10]

["Linspace", 10, 1, 10]
// ➔ ["List", 10, 9.11111111111111, 8.222222222222221, 
// 7.333333333333333, 6.444444444444445, 
// 5.555555555555555, 4.666666666666666, 3.7777777777777777, 
// 2.888888888888889, 2]

```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Set
</div>

<FunctionDefinition name="Set">

<Signature name="Set" returns="set">..._elements_:any</Signature>

An **unordered** collection of unique elements.

<Latex value="\lbrace 12, 15, 17 \rbrace"/>

```json example
["Set", 12, 15, 17]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Fill
</div>

<FunctionDefinition name="Fill">

<Signature name="Fill" returns="list">_dimensions_, _value_:any</Signature>

<Signature name="Fill" returns="list">_dimensions_, _f_:function</Signature>

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

<div style={{visibility:"hidden"}}>
### Repeat
</div>


<FunctionDefinition name="Repeat">

<Signature name="Repeat" returns="list">_value_: any</Signature>

An infinite list of the same element.

<Signature name="Repeat" returns="list">_value_: any, _count_: integer?</Signature>

A list of the same element repeated `count` times.

```json example
["Repeat", 42, 5]
```


**Note:** `["Repeat", n]` is equivalent to `["Cycle", ["List", n]]`.

</FunctionDefinition>

<FunctionDefinition name="Cycle">

<Signature name="Cycle" returns="list">_seed_:collection</Signature>

A collection that repeats the elements of the `seed` collection. The `seed`
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

<div style={{visibility:"hidden"}}>
### Iterate
</div>



<FunctionDefinition name="Iterate">

<Signature name="Iterate" returns="list">_f_:function</Signature>

<Signature name="Iterate"  returns="list">_f_:function, _initial_:any</Signature>

An infinite collection of the results of applying `f` to the initial
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


## Operating On Collections

The section contains functions whose argument is a collection, but whose return
value is not a collection.

<div style={{visibility:"hidden"}}>
### At
</div>


<FunctionDefinition name="At">

<Signature name="At">_collection_, _index_</Signature>

<Signature name="At">_collection_, _index1_, _index2_, ...</Signature>

Returns the element at the specified index.

If the collection is nested, the indexes are applied in order.


```json example
["At", ["List", 5, 2, 10, 18], 2]
// ➔ 10

["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10

["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Filter
</div>



<FunctionDefinition name="Filter">

<Signature name="Filter">_collection_, _function_</Signature>

Returns a collection where _function_ is applied to each element of the
collection. Only the elements for which the function returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### First
</div>

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


<div style={{visibility:"hidden"}}>
### Last
</div>

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


<div style={{visibility:"hidden"}}>
### Length
</div>



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

<div style={{visibility:"hidden"}}>
### IsEmpty
</div>

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

<FunctionDefinition name="Contains">
<Signature name="Contains">_collection_, _value_</Signature>

Returns `True` if the collection contains the given value, `False` otherwise.

```json example
["Contains", ["List", 5, 2, 10, 18], 10]
// ➔ "True"
["Contains", ["List", 5, 2, 10, 18], 42]
// ➔ "False"
```
</FunctionDefinition>

<FunctionDefinition name="IndexWhere">
<Signature name="IndexWhere">_collection_, _predicate_:function</Signature>

Returns the 1-based index of the first element in the collection that satisfies the predicate, or 0 if not found.

```json example
["IndexWhere", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 9]]]
// ➔ 3
```
</FunctionDefinition>

<FunctionDefinition name="Find">
<Signature name="Find">_collection_, _predicate_:function</Signature>

Returns the first element in the collection that satisfies the predicate, or `Nothing` if none found.

```json example
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 9]]]
// ➔ 10
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 100]]]
// ➔ "Nothing"
```
</FunctionDefinition>

<FunctionDefinition name="CountIf">
<Signature name="CountIf">_collection_, _predicate_:function</Signature>

Returns the number of elements in the collection that satisfy the predicate.

```json example
["CountIf", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 5]]]
// ➔ 2
```
</FunctionDefinition>

<FunctionDefinition name="Position">
<Signature name="Position">_collection_, _predicate_:function</Signature>

Returns a list of indexes of elements in the collection that satisfy the predicate.

```json example
["Position", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 5]]]
// ➔ ["List", 3, 4]
```
</FunctionDefinition>

<FunctionDefinition name="Exists">
<Signature name="Exists">_collection_, _predicate_:function</Signature>

Returns `True` if any element of the collection satisfies the predicate, `False` otherwise.

```json example
["Exists", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 15]]]
// ➔ "True"
["Exists", ["List", 5, 2, 10], ["Function", ["Greater", "_", 15]]]
// ➔ "False"
```
</FunctionDefinition>

<FunctionDefinition name="ForAll">
<Signature name="ForAll">_collection_, _predicate_:function</Signature>

Returns `True` if all elements of the collection satisfy the predicate, `False` otherwise.

```json example
["ForAll", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 0]]]
// ➔ "True"
["ForAll", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 5]]]
// ➔ "False"
```
</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Map
</div>


<FunctionDefinition name="Map">

<Signature name="Map" returns="collection">_xs_:collection, _f_:function</Signature>

Returns a collection where _f_ is applied to each element of _xs_.

```json example
["Map", ["List", 5, 2, 10, 18], ["Function", ["Add", "x", 1], "x"]]
// ➔ ["List", 6, 3, 11, 19]
```

```json example
["Map", ["List", 5, 2, 10, 18], ["Multiply", "_", 2]]
// ➔ ["List", 10, 4, 20, 36]
```

</FunctionDefinition>



<div style={{visibility:"hidden"}}>
### Reduce
</div>

<FunctionDefinition name="Reduce">


<Signature name="Reduce" returns="value">_xs_:collection, _fn_:function, _initial_:value?</Signature>

Returns a value by applying the reducing function _fn_ to each element
of the collection.

`Reduce` performs a _left fold_ operation: the reducing function is applied to the
first two elements, then to the result of the previous application and the next
element, etc...

When an `initial` value is provided, the reducing function is applied to the
initial value and the first element of the collection, then to the result of the
previous application and the next element, etc...

```json example
[
  "Reduce",
  ["List", 5, 2, 10, 18],
  ["Function", ["Add", "_1", "_2"]],
]
// ➔ 35
```

The name of a function can be used as a shorthand for a function that takes two
arguments.

```json example
["Reduce", ["List", 5, 2, 10, 18], "Add"]
// ➔ 35
```

<ReadMore path="/compute-engine/reference/control-structures/#FixedPoint" >
See also the **`FixedPoint` function** which operates without a collection.<Icon name="chevron-right-bold" />
</ReadMore>

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

<div style={{visibility:"hidden"}}>
### Second
</div>

<FunctionDefinition name="Second">

<Signature name="Second">_collection_</Signature>

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

</FunctionDefinition>



<div style={{visibility:"hidden"}}>
### Tally
</div>


<FunctionDefinition name="Tally">

<Signature name="Tally" returns="tuple<elements:list, counts:list>">_xs_:collection</Signature>

Evaluate to a tuple of two lists:

- The first list contains the unique elements of the collection.
- The second list contains the number of times each element appears in the
  collection.

```json example
["Tally", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["Tuple", ["List", 5, 2, 10, 18], ["List", 3, 2, 1, 1]]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Zip
</div>

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

<FunctionDefinition name="Partition">
<Signature name="Partition">_collection_, _count_:integer</Signature>
<Signature name="Partition">_collection_, _predicate_:function</Signature>

Partitions a collection into groups. If an integer is given, splits into that many groups. If a predicate function is given, splits into two groups: elements for which the predicate is true, and those for which it is false.

```json example
["Partition", ["List", 1, 2, 3, 4, 5, 6], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]
["Partition", ["List", 1, 2, 3, 4, 5, 6], ["Function", ["Even", "_"]]]
// ➔ ["List", ["List", 2, 4, 6], ["List", 1, 3, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="Chunk">
<Signature name="Chunk">_collection_, _count_:integer</Signature>

Splits the collection into `count` nearly equal-sized chunks.

```json example
["Chunk", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="GroupBy">
<Signature name="GroupBy">_collection_, _function_:function</Signature>

Partitions the collection into groups according to the value of the grouping function applied to each element. Returns a dictionary mapping group keys to lists of elements.

```json example
["GroupBy", ["List", 1, 2, 3, 4], ["Function", ["Even", "_"]]]
// ➔ ["Dictionary", ["Tuple", "True", ["List", 2, 4]], ["Tuple", "False", ["List", 1, 3]]]
```
</FunctionDefinition>



## Transforming Collections

This section contains functions whose argument is a collection and which return
a collection made of a subset of the elements of the input.

Collections are immutable. These functions do not modify the input collection, but
return a new collection.

<div style={{visibility:"hidden"}}>
### Drop
</div>

<FunctionDefinition name="Drop">
<Signature name="Drop" returns="collection">_xs_:collection, _n_:integer</Signature>

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2], -2]
// ➔ ["List", 5, 2]
```

See [**Take**](#take) for a function that returns the first `n` elements.


</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Exclude
</div>

<FunctionDefinition name="Exclude">

<Signature name="Exclude" returns="collection">_xs_:collection,, _index_:integer</Signature>

<Signature name="Exclude" returns="collection">_xs_:collection, _indexes_:collection&lt;integer&gt;</Signature>

`Exclude` is the opposite of `Extract`. It returns a list of the elements that
are not at the specified index.

The order of the elements is preserved.


```json example
["Exclude", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 10, 18]

["Exclude", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 2, 18]
```

When `indexes` is a list, it is used to specify the indexes of the elements to
be dropped.

```json example
["Exclude", ["List", 5, 2, 10, 18], ["List", 2, 3]]
// ➔ ["List", 5, 2]

["Exclude", ["List", 5, 2, 10, 18], ["List", -2, 1]]
// ➔ ["List", 2, 18]
```


An index may be repeated, but the corresponding element will only be dropped
once.

```json example
["Exclude", ["List", 5, 2, 10, 18], ["List", 3, 3, 1]]
// ➔ ["List", 2, 18]
```

</FunctionDefinition>



<div style={{visibility:"hidden"}}>
### Extract
</div>

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




<div style={{visibility:"hidden"}}>
### Join
</div>

<FunctionDefinition name="Join">

<Signature name="Join" returns="list">...collections:collection</Signature>
<Signature name="Join" returns="set">...sets:set</Signature>

If the collections are of different types, the result is a `List` 
containing the elements of the first collection followed
by the elements of the second collection.

```json example
["Join", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```


If the collections are all sets , the result is a `Set` of the
elements of the collections.


```json example
["Join", ["Set", 5, 2, 10, 18], ["Set", 1, 2, 3]]
// ➔ ["Set", 5, 2, 10, 18, 1, 3]
```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Most
</div>

<FunctionDefinition name="Most">

<Signature name="Most">_collection_</Signature>

Return everything but the last element of the collection.

It's equivalent to `["Drop", _collection_, -1]`.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Rest
</div>

<FunctionDefinition name="Rest">

<Signature name="Rest">_collection_</Signature>

Return everything but the first element of the collection.

It's equivalent to `["Drop", _collection_, 1]`.

```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Reverse
</div>

<FunctionDefinition name="Reverse">

<Signature name="Reverse">_collection_</Signature>

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", _collection_, ["Tuple", -1, 1]]`.

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### RotateLeft
</div>

<FunctionDefinition name="RotateLeft">

<Signature name="RotateLeft">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### RotateRight
</div>

<FunctionDefinition name="RotateRight">

<Signature name="RotateRight">_collection_, _count_</Signature>

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Shuffle
</div>

<FunctionDefinition name="Shuffle">

<Signature name="Shuffle" returns="list">_xs_:collection</Signature>

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

</FunctionDefinition>

<div style={{visibility:"hidden"}}>
### Sort
</div>

<FunctionDefinition name="Sort">

<Signature name="Sort">_collection_</Signature>

<Signature name="Sort">_collection_, _order-function_</Signature>

Return the collection in sorted order.

```json example
["Sort", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>


<div style={{visibility:"hidden"}}>
### Take
</div>

<FunctionDefinition name="Take">

<Signature name="Take" returns="collection">_xs_:collection, _n_:integer</Signature>

Return a list of the first `n` elements of `xs`. The collection _xs_ must be ordered.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

See [**Drop**](#drop) for a function that returns everything but the first `n` elements.


</FunctionDefinition>




<div style={{visibility:"hidden"}}>
### Unique
</div>


<FunctionDefinition name="Unique">

<Signature name="Unique" returns="collection">_xs_: collection</Signature>

Returns a list of the elements in `xs` without duplicates.

This is equivalent to the first element of the result of `Tally`:
`["First", ["Tally", xs]]`.

```json example
["Unique", ["List", 5, 2, 10, 18, 5, 2, 5]]
// ➔ ["List", 5, 2, 10, 18]
```

</FunctionDefinition>
