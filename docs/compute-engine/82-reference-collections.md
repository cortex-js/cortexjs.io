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

The most common types of collection are:

| Type         | Description                                             | See                     |
|:-------------|:-------------------------------------------------------|--------------------------|
| `list`       | Collection of elements accessible by their index, duplicates allowed    | [**List**](#list)        |
| `set`        | Collection of unique elements                           | [**Set**](#set)          |
| `tuple`      | Collection with a fixed size and optional names        | [**Tuple**](#tuple)      |
| `dictionary` | Collection of key-value pairs with string keys        | [**Dictionary**](#dictionary) |
| `record`     | Structured data with a fixed set of known string keys  |                          |

Collections are **immutable**: they cannot be modified in place.  
Instead, operations on collections produce new collections.


Collections can be used to represent vectors, matrices, sets,
mappings, or records — in both finite and infinite forms.

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices, 
tensors which are a special kind of collection (lists of lists of numbers).<Icon name="chevron-right-bold" />
</ReadMore>


### Core Properties of Collections

All collections share these basic properties:
- Elements of the collection can be **enumerated**
- Elements of the collection can be **counted**
- Membership of an element can be checked
- Subset relationships with another collection can be checked

**Note:** Depending on the collection, counting and membership checking 
can be an expensive operation. See the information on specific collections for details.

In addition, indexed collections support:
- **Index-based access**: elements can be accessed by their index.
- **Finding elements**: elements matching a predicate can be found by their index.




### Indexed and Non-indexed Collections

Collections fall into two broad categories:
- **Indexed collections**, such as `List` and `Tuple`
  → Elements can be accessed by an **index**, an integer that indicates the position of the element in the collection.
- **Non-indexed collections**, such as `Set` and `Record`
  → Elements cannot be accessed by index. They can be enumerated or looked up by key.


The first element of an indexed collection has index `1`, the second element 
has index `2`, and so on. The last element has index equal to the length of the collection.

**Negative indexes** can also be used to access elements from the end of the
collection, if the collection is finite.

The last element has index `-1`, the second to last element has index `-2`,
and so on. This is useful for accessing elements without knowing the length of the
collection.

```json example
["At", ["List", 2, 5, 7, 11], 3]
// ➔ 7

["At", ["List", 2, 5, 7, 11], -3]
// ➔ 5
```


### Finite and Infinite Collections

Collections may be:
- **Finite**: containing a definite number of elements
- **Infinite**: continuing indefinitely (for example, a sequence of all natural numbers)
- **Indeterminate**: containing an unknown number of elements, such as a stream of data that may end at some point

Compute Engine supports **lazy evaluation** to make working with infinite collections possible.

### Lazy and Eager Collections

Collections can be:
- **Eager**: elements are fully evaluated when the collection is created.
- **Lazy**: elements are evaluated only as they are accessed.

Lazy collections are useful when working with with expensive computations
and necessary when working with infinite collections.

Some operations like `Range`, `Cycle`, `Iterate`, `Repeat` create **lazy collections**.

**To convert a lazy collection to an eager collection** use [`ListFrom`](#listfrom) 
or [`SetFrom`](#setfrom). These functions enumerate all elements of a finite 
collection and produce a matching eager collection. This process is called **materialization**.
or **realization**.

```json example
["ListFrom", ["Range", 1, 10]]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Lazy infinite collections provide a natural way to model mathematical 
sequences, iterative processes, or cyclic patterns, with minimal memory use.

Common examples include:
- Natural numbers (`Range`)
- Cyclic patterns (`Cycle`)
- Iterative computations (`Iterate`)

For example, let's say you want to express the first 10 prime numbers:

```json example
["ListFrom", 
  ["Take", 
    ["Filter", "Integers", ["IsPrime", "_"]], 
    10
  ]
]
// ➔ ["List", 2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

In this expression, only the first 10 prime numbers are computed, 
and only when the `ListFrom` function is called.

Lazy collections are partially materialized when converting an expression to
a string representation, such as when using the `expr.latex`, `expr.toString()` 
or `expr.print()` methods. A placeholder is inserted to indicate missing 
elements.

```js example
const expr = ce.box(["Map", "Integers", ["Square", "_"]]);
expr.print();
// ➔ [1, 4, 9, 16, 25...]
```


#### Eager Collections

Some of the eager collections include:
- [**List**](#list): indexed collections of elements, which are also used to represent
  **vectors** and **matrices**. Elements in a list are accessed by their
  index, which starts at 1. Lists can contain duplicate elements and they can 
  contain an infinite number of elements.
  
  **Type:** `list<T>` where `T` is the type of the elements.
- [**Set**](#set): non-indexed collections of unique elements. The elements in a set are
  not accessed by index, they are enumerated. A set can contain an infinite number
  of elements. 
  
  **Type:** `set<T>` where `T` is the type of the elements.
- [**Tuple**](#tuple): indexed collections of elements, but with a fixed number
  of elements that have a specific type and an optional name. 
  
  **Type:** `tuple<T1, T2, ..., Tn>` where `T1`, `T2`, ..., `Tn` are the types of the elements.
- [**Dictionary**](#dictionary): non-indexed collections of key-value pairs, 
    where each key is unique. 
    
    **Type:** either `dictionary<V>` where `V` is the 
    type of the values, the keys are strings or `record<K1: T1, K2: T2, ..., Kn: Tn>` where `K1`, `K2`, ..., `Kn` are the keys and `T1`, `T2`, ..., `Tn` are the types of the values. The `dictionary` type is used when the 
    set of keys is not known in advance, for example when a dictionary 
    is used as a cache. The `record` type is used when the set of keys is known 
    in advance and fixed, for example to represent a structured data type.

#### Lazy Collections

Some functions evaluate to a lazy collection. This is useful for creating
infinite collections or for collections that are expensive to compute. 

Examples of function evaluating to a lazy collection include:
- [**Range**](#range) and [**Linspace**](#linspace): indexed sequences of numbers (integers and reals, respectively) with a specified start, end and step size.
- [**Cycle**](#cycle): infinite collections that repeat a finite collection.
- [**Iterate**](#iterate): infinite collections that apply a function to an initial value repeatedly.
- [**Repeat**](#repeat): infinite collections that repeat a single value.
- [**Fill**](#fill): collections of a specified size, where each element is computed by a function or set to a specific value.

### Types

- The type `collection` represents any collection, whether indexed or not, finite or infinite.
- The type `indexed_collection` applies to collections that support index-based access, such as `List`, and `Tuple`.



### Operations on Collections

Operations on all collections, whether indexed or not, include:
- [**Filter**](#filter), [**Map**](#map), and [**Reduce**](#reduce): operations that create new collections by applying a function to each element of an existing collection.
- [**Length**](#length), [**IsEmpty**](#isempty): check the number of elements of a collection.
- [**Join**](#join), [**Zip**](#zip): combine multiple collections into one.
- [**Tally**](#tally): count the number of occurrences of each element in a collection.


Operations on indexed collections:
- [**At**](#at), [**First**](#first), [**Second**](#second), [**Last**](#last): access a specific element of a collection.
- [**Take**](#take), [**Drop**](#drop), [**Most**](#most), [**Rest**](#rest): access a subset of a collection.
- [**IndexOf**](#indexof): find the index of an element in a collection.
- [**Extract**](#extract), [**Exclude**](#exclude): access a collection of elements at specific indexes.
- [**Sort**](#sort), [**Shuffle**](#shuffle), [**Reverse**](#reverse): reorder a collection.
- [**Unique**](#unique): remove duplicates from a collection.
- [**RotateLeft**](#rotateleft), [**RotateRight**](#rotateright): rotate a collection to the left or right.

<ReadMore path="/compute-engine/reference/linear-algebra/" >
See also the **Linear Algebra** section for operations on vectors, matrices, tensors which are a special kind of collection.<Icon name="chevron-right-bold" />
</ReadMore>




## Creating Eager Collections

This section contains functions that create eager collections from some elements.

<nav className="hidden">
### Sequence
</nav>

<FunctionDefinition name="Sequence">
<Signature name="Sequence" returns="collection">..._elements_:any</Signature>

A sequence is a collection of elements. When a sequence is used where an element
is expected, the elements of the sequence are spliced into the expression.

```json example
["List", 1, ["Sequence", 2, 3], 4]
// ➔ ["List", 1, 2, 3, 4]
```

The `Nothing` symbol is a synonym for the empty sequence `["Sequence"]`.
When the `Nothing` symbol is used in a context where an element is expected, it is ignored.


```json example
["List", 1, "Nothing", 2]
// ➔ ["List", 1, 2]
```

</FunctionDefinition>

<nav className="hidden">
### List
</nav>

<FunctionDefinition name="List">

<Signature name="List" returns="list">..._elements_:any</Signature>

A `List` is an **indexed** collection of elements. An element in
a list may be repeated.

<Latex value="\lbrack 42, 3.14, x, y \rbrack"/>

```json example
["List", 42, 3.14, "x", "y"]
```

The type of a list is `list<T>`, where `T` is the type of the elements in the list.
The type `list` is a shorthand for `list<any>`, meaning the list can contain elements of any type.

The visual presentation of a `List` expression can be customized using the
`Delimiter` function.

```js example
const xs = ce.box(["List", 5, 2, 10, 18]);

xs.latex
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.box(["Delimiter", xs, "<;>"]).latex;
// ➔ "\langle5; 2; 10; 18\rangle"
```

A **vector** is represented using a `List` of numbers.

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


<nav className="hidden">
### Set
</nav>

<FunctionDefinition name="Set">

<Signature name="Set" returns="set">..._elements_:any</Signature>

A **non-indexed** collection of unique elements.

<Latex value="\lbrace 12, 15, 17 \rbrace"/>

```json example
["Set", 12, 15, 17]
```

The type of a set is `set<T>`, where `T` is the type of the elements in the set.

The type `set` is a shorthand for `set<any>`, meaning the set can contain elements of any type.

If the same element is repeated, it is included only once in the set. The 
elements are compared using the `IsSame` function.

```json example
["Set", 12, 15, 17, 12, 15]
// ➔ ["Set", 12, 15, 17]
```

The elements in a set are not ordered. When enumerating a set, the elements are
returned in an arbitrary order, and two successive enumerations may return the
elements in a different order.

The elements in a set are counted in constant time.

</FunctionDefinition>


## Creating Lazy Collections


<nav className="hidden">
### Range
</nav>

<FunctionDefinition name="Range">

<Signature name="Range" returns="indexed_collection<integer>">_upper_:integer</Signature>

<Signature name="Range" returns="indexed_collection<integer>">_lower_:integer, _upper_:integer</Signature>

<Signature name="Range" returns="indexed_collection<integer>">_lower_:integer, _upper_:integer, _step_:integer</Signature>

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


<nav className="hidden">
### Linspace
</nav>

<FunctionDefinition name="Linspace">

<Signature name="Linspace" returns="indexed_collection<real>">_upper_:real</Signature>

<Signature name="Linspace" returns="indexed_collection<real>">_lower_:real, _upper_:real</Signature>

<Signature name="Linspace" returns="indexed_collection<real>">_lower_:real, _upper_:real, _count_:integer</Signature>

`Linspace` is short for "linearly spaced", from the [MATLAB function of the same
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



<nav className="hidden">
### Fill
</nav>

<FunctionDefinition name="Fill">

<Signature name="Fill" returns="indexed_collection">_dimensions_, _value_:any</Signature>

<Signature name="Fill" returns="indexed_collection">_dimensions_, _f_:function</Signature>

Create an indexed collection of the specified dimensions.

If a `value` is provided, the elements of the collection are all set to that value.

If a `function` is provided, the elements of the collection are computed by applying
the function to the index of the element.

If `dimensions` is a number, a collection with that many elements is created.

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
["Fill", 
  ["Tuple", 2, 3], 
  ["Function", ["Add", "i", "j"], "i", "j"]
]
// ➔ ["List", ["List", 0, 1, 2], ["List", 1, 2, 3]]
```

</FunctionDefinition>


<nav className="hidden">
### Repeat
</nav>


<FunctionDefinition name="Repeat">

<Signature name="Repeat" returns="indexed_collection">_value_: any</Signature>

An infinite collection of the same element.

<Signature name="Repeat" returns="indexed_collection">_value_: any, _count_: integer?</Signature>

A collection of the same element repeated `count` times.

```json example
["Repeat", 42, 5]
// ➔ ["List", 42, 42, 42, 42, 42]
```

**Note:** `["Repeat", n]` is equivalent to `["Cycle", ["List", n]]`. See 
[`Cycle`](#cycle) for more information.


</FunctionDefinition>

<nav className="hidden">
### Cycle
</nav>


<FunctionDefinition name="Cycle">

<Signature name="Cycle" returns="indexed_collection">_seed_:collection</Signature>

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

<nav className="hidden">
### Iterate
</nav>

<FunctionDefinition name="Iterate">

<Signature name="Iterate" returns="indexed_collection">_f_:function</Signature>

<Signature name="Iterate"  returns="indexed_collection">_f_:function, _initial_:any</Signature>

An infinite collection of the results of applying `f` to the initial
value.

If the `initial` value is not specified, it is assumed to be `0`

```json example
["Iterate", ["Multiply", "_", 2], 1]
// ➔ ["List", 1, 2, 4, 8, 16, ...]
```

Use `Take` to get a finite number of elements.

```json example
["Take", ["Iterate", ["Add", "_", 2]], 7], 5]
// ➔ ["List", 7, 9, 11, 13, 15]
```

</FunctionDefinition>


## Accessing Elements of Collections

Elements of indexed collections can be accessed using their index.

Indexes start at `1` for the first element. Negative indexes access elements from the end of the collection, with `-1` being the last element.

<nav className="hidden">
### At
</nav>


<FunctionDefinition name="At">

<Signature name="At">_xs_: indexed_collection, _index_: integer</Signature>


Returns the element at the specified index.

```json example
["At", ["List", 5, 2, 10, 18], 2]
// ➔ 10

["At", ["List", 5, 2, 10, 18], -2]
// ➔ 10
```

<Signature name="At">_xs_: indexed_collection, ..._indexes_: integer</Signature>

If the collection is nested, the indexes are applied in order.

```json example
["At", ["List", ["List", 1, 2], ["List", 3, 4]], 2, 1]
// ➔ 3
```

</FunctionDefinition>

<nav className="hidden">
### First
</nav>

<FunctionDefinition name="First">

<Signature name="First">_xs_: indexed_collection</Signature>

Return the first element of the collection.

```json example
["First", ["List", 5, 2, 10, 18]]
// ➔ 5

["First", ["Tuple", "x", "y"]]
// ➔ "x"
```

It's equivalent to `["At", xs, 1]`.

</FunctionDefinition>

<nav className="hidden">
### Second
</nav>

<FunctionDefinition name="Second">

<Signature name="Second">_xs_: indexed_collection</Signature>

Return the second element of the collection.

```json example
["Second", ["Tuple", "x", "y"]]
// ➔ "y"
```

It's equivalent to `["At", xs, 2]`.

</FunctionDefinition>



<nav className="hidden">
### Last
</nav>

<FunctionDefinition name="Last">

<Signature name="Last">_xs_: indexed_collection</Signature>

Return the last element of the collection.

```json example
["Last", ["List", 5, 2, 10, 18]]
// ➔ 18
```

It's equivalent to `["At", xs, -1]`.

</FunctionDefinition>

<nav className="hidden">
### Most
</nav>

<FunctionDefinition name="Most">

<Signature name="Most" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return everything but the last element of the collection.

```json example
["Most", ["List", 5, 2, 10, 18]]
// ➔ ["List", 5, 2, 10]
```

It's equivalent to `["Reverse", ["Drop", ["Reverse", xs], 1]]`.


</FunctionDefinition>

<nav className="hidden">
### Rest
</nav>

<FunctionDefinition name="Rest">

<Signature name="Rest" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return everything but the first element of the collection.


```json example
["Rest", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 10, 18]
```

It's equivalent to `["Drop", xs, 1]`.

</FunctionDefinition>


<nav className="hidden">
### Take
</nav>

<FunctionDefinition name="Take">

<Signature name="Take" returns="indexed_collection">_xs_: indexed_collection, _n_: integer</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Return a list of the first `n` elements of `xs`. The collection `xs` must be indexed.

If `n` is negative, it returns the last `n` elements.

```json example
["Take", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 5, 2]

["Take", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 18, 10]
```

See [**Drop**](#drop) for a function that returns everything but the first `n` elements.

</FunctionDefinition>

<nav className="hidden">
### Drop
</nav>

<FunctionDefinition name="Drop">
<Signature name="Drop" returns="collection">_xs_:collection, _n_:integer</Signature>

Return a list without the first `n` elements.

If `n` is negative, it returns a list without the last `n` elements.

```json example
["Drop", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18]

["Drop", ["List", 5, 2, 10, 18], -2]
// ➔ ["List", 5, 2]
```

See [**Take**](#take) for a function that returns the first `n` elements.


</FunctionDefinition>


## Changing the Order of Elements


<nav className="hidden">
### Reverse
</nav>

<FunctionDefinition name="Reverse">

<Signature name="Reverse">_xs_: indexed_collection</Signature>
<div className="tags"><span className="tag">lazy</span></div>

Return the collection in reverse order.

```json example
["Reverse", ["List", 5, 2, 10, 18]]
// ➔ ["List", 18, 10, 2, 5]
```

It's equivalent to `["Extract", xs, ["Tuple", -1, 1]]`.

</FunctionDefinition>

<nav className="hidden">
### Extract
</nav>

<FunctionDefinition name="Extract">

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, _index_:integer</Signature>

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, ..._indexes_:integer</Signature>

<Signature name="Extract" returns="indexed_collection">_xs_: indexed_collection, _range_:tuple&lt;integer, integer&gt;</Signature>

Returns a list of the elements at the specified indexes.

`Extract` always return an indexed collection, even if the result is a single element. If no
elements match, an empty collection is returned.

```json example
["Extract", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10]

["Extract", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 10, 5]


["Extract", ["List", 5, 2, 10, 18], 17]
// ➔ ["List"]
```

When using a range, it is specified as a `Tuple`.

```json example
// Elements 2 to 3
["Extract", ["List", 5, 2, 10, 18], ["Tuple", 2, 4]]
// ➔ ["List", 2, 10, 18]

// From start to end, every other element
["Extract", ["List", 5, 2, 10, 18], ["Tuple", 1, -1, 2]]
// ➔ ["List", 5, 10]
```

The elements are returned in the order in which they're specified. Using
negative indexes (or ranges) reverses the order of the elements.

```json example
// From last to first = reverse
["Extract", ["List", 5, 2, 10, 18], ["Tuple", -1, 1]]
// ➔ ["List", 18, 10, 2, 5]

// From last to first = reverse
["Extract", ""desserts"", ["Tuple", -1, 1]]
// ➔ ""stressed""
```

An index can be repeated to extract the same element multiple times.

```json example
["Extract", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 10, 10, 5]
```

</FunctionDefinition>


<nav className="hidden">
### Exclude
</nav>

<FunctionDefinition name="Exclude">

<Signature name="Exclude" returns="indexed_collection">_xs_:indexed_collection,, _index_:integer</Signature>

<Signature name="Exclude" returns="indexed_collection">_xs_:indexed_collection, _indexes_:tuple&lt;integer&gt;</Signature>

`Exclude` is the opposite of `Extract`. It returns a list of the elements that
are not at the specified indexes.

The order of the elements is preserved.


```json example
["Exclude", ["List", 5, 2, 10, 18], 3]
// ➔ ["List", 5, 2, 18]

["Exclude", ["List", 5, 2, 10, 18], -2, 1]
// ➔ ["List", 2, 18]
```


An index may be repeated, but the corresponding element will only be dropped
once.

```json example
["Exclude", ["List", 5, 2, 10, 18], 3, 3, 1]
// ➔ ["List", 2, 18]
```

</FunctionDefinition>

<nav className="hidden">
### RotateLeft
</nav>

<FunctionDefinition name="RotateLeft">

<Signature name="RotateLeft" returns="indexed_collection">_xs_: indexed_collection, _count_: integer</Signature>

Returns a collection where the elements are rotated to the left by the specified
count.

```json example
["RotateLeft", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>

<nav className="hidden">
### RotateRight
</nav>

<FunctionDefinition name="RotateRight">

<Signature name="RotateRight" returns="indexed_collection">_xs_: indexed_collection, _count_: integer</Signature>

Returns a collection where the elements are rotated to the right by the
specified count.

```json example
["RotateRight", ["List", 5, 2, 10, 18], 2]
// ➔ ["List", 10, 18, 5, 2]
```

</FunctionDefinition>


<nav className="hidden">
### Shuffle
</nav>

<FunctionDefinition name="Shuffle">

<Signature name="Shuffle" returns="indexed_collection">_xs_: indexed_collection</Signature>

Return the collection in random order.

```json example
["Shuffle", ["List", 5, 2, 10, 18]]
// ➔ ["List", 10, 18, 5, 5]
```

</FunctionDefinition>

<nav className="hidden">
### Sort
</nav>

<FunctionDefinition name="Sort">

<Signature name="Sort" returns="indexed_collection">_xs_: collection</Signature>

<Signature name="Sort" returns="indexed_collection">_xs_: collection, _order-function_: function</Signature>

Return the collection in sorted order.

```json example
["Sort", ["Set", 18, 5, 2, 10]]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>


<nav className="hidden">
### Ordering
</nav>

<FunctionDefinition name="Ordering">

<Signature name="Ordering" returns="indexed_collection">_collection_</Signature>

<Signature name="Ordering" returns="indexed_collection">_collection_, _order-function_</Signature>

Return the indexes of the collection in sorted order.

```json example
["Ordering", ["List", 5, 2, 10, 18]]
// ➔ ["List", 2, 1, 3, 4]
```

To get the values in sorted order, use `Extract`:

```json example
["Assign", "xs", ["List", 5, 2, 10, 18]]
["Extract", "xs", ["Ordering", "xs"]]
// ➔ ["List", 2, 5, 10, 18]

// Same as Sort:
["Sort", "xs"]
// ➔ ["List", 2, 5, 10, 18]
```

</FunctionDefinition>


## Operating On Collections





<nav className="hidden">
### Length
</nav>



<FunctionDefinition name="Length">

<Signature name="Length" returns="integer">_xs_: collection</Signature>

Returns the number of elements in the collection.

When the collection is a matrix (list of lists), `Length` returns the number of
rows.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```


</FunctionDefinition>

<nav className="hidden">
### IsEmpty
</nav>

<FunctionDefinition name="IsEmpty">

<Signature name="IsEmpty" returns="boolean">_xs_: collection</Signature>

Returns the symbol `True` if the collection has no elements.

```json example
["IsEmpty", ["List", 5, 2, 10, 18]]
// ➔ "False"

["IsEmpty", ["List"]]
// ➔ "True"

["IsEmpty", "x"]
// ➔ "True"

["IsEmpty", {str: "Hello"}]
// ➔ "False"
```

</FunctionDefinition>

<FunctionDefinition name="Contains">
<Signature name="Contains" returns="boolean">_xs_: collection, _value_: any</Signature>

Returns `True` if the collection contains the given value, `False` otherwise. The value is compared using the `IsSame` function.


```json example
["Contains", ["List", 5, 2, 10, 18], 10]
// ➔ "True"

["Contains", ["List", 5, 2, 10, 18], 42]
// ➔ "False"
```
</FunctionDefinition>

<FunctionDefinition name="IndexWhere">
<Signature name="IndexWhere" returns="number">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the 1-based index of the first element in the collection that satisfies the predicate, or 0 if not found.

```json example
["IndexWhere", ["List", 5, 2, 10, 18], ["Greater", "_", 9]]
// ➔ 3
```
</FunctionDefinition>

<FunctionDefinition name="Find">
<Signature name="Find">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the first element in the collection that satisfies the predicate, or `Nothing` if none found.

```json example
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 9]]]
// ➔ 10
["Find", ["List", 5, 2, 10, 18], ["Function", ["Greater", "_", 100]]]
// ➔ "Nothing"
```
</FunctionDefinition>

<FunctionDefinition name="CountIf">
<Signature name="CountIf" returns="number">_xs_: indexed_collection, _predicate_:function</Signature>

Returns the number of elements in the collection that satisfy the predicate.

```json example
["CountIf", ["List", 5, 2, 10, 18], ["Greater", "_", 5]]
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

<nav className="hidden">
### Filter
</nav>

<FunctionDefinition name="Filter">

<Signature name="Filter" returns="collection">_xs_: collection, _pred_: function</Signature>

Returns a collection where _pred_ is applied to each element of the
collection. Only the elements for which the predicate returns `"True"` are kept.

```json example
["Filter", ["List", 5, 2, 10, 18], ["Function", ["Less", "_", 10]]]
// ➔ ["List", 5, 2]
```

</FunctionDefinition>


<nav className="hidden">
### Map
</nav>


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



<nav className="hidden">
### Reduce
</nav>

<FunctionDefinition name="Reduce">


<Signature name="Reduce" returns="value">_xs_:indexed_collection, _fn_:function, _initial_:value?</Signature>

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






<nav className="hidden">
### Tally
</nav>


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

<nav className="hidden">
### Zip
</nav>

<FunctionDefinition name="Zip">

<Signature name="Zip" return="indexed_collection">..._xss_: indexed_collection</Signature>

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





<nav className="hidden">
### Join
</nav>

<FunctionDefinition name="Join">

<Signature name="Join" returns="list">...collection</Signature>
<Signature name="Join" returns="set">...set</Signature>

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










<nav className="hidden">
### Unique
</nav>


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

## Converting Lazy Collections to Eager Collections

<nav className="hidden">
### ListFrom
### SetFrom
### TupleFrom
</nav>


<FunctionDefinition>

<Signature name="ListFrom" returns="list">_xs_: collection</Signature>
<Signature name="SetFrom" returns="set">_xs_: collection</Signature>
<Signature name="TupleFrom" returns="tuple">_xs_: collection</Signature>

Returns an eager list, set or tuple containing the elements of the collection `xs`.

The collection `xs` should be a finite collection.

```json example
["ListFrom", ["Range", 1, 3]]
// ➔ ["List", 1, 2, 3]

["SetFrom", ["Range", 1, 3]]
// ➔ ["Set", 1, 2, 3]

["TupleFrom", ["Range", 1, 3]]
// ➔ ["Tuple", 1, 2, 3]
```
</FunctionDefinition>

<nav className="hidden">
### RecordFrom
### MapFrom
</nav>

<FunctionDefinition>
<Signature name="RecordFrom" returns="record">_xs_: collection</Signature>
<Signature name="MapFrom" returns="map">_xs_: collection</Signature>

Returns a record or map containing the elements of the collection `xs`.

The collection `xs` should be a finite collection of key-value pairs, each key being
a string.

```json example
["RecordFrom", ["List", ["Tuple", "a", 1], ["Tuple", "b", 2]]]
// ➔ ["Record", ["Tuple", "a", 1], ["Tuple", "b", 2]]

["MapFrom", ["List", ["Tuple", "a", 1], ["Tuple", "b", 2]]]
// ➔ ["Map", ["Tuple", "a", 1], ["Tuple", "b", 2]]
```

</FunctionDefinition>
