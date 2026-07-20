---
title: Collections
slug: /compute-engine/reference/collections/
date: Last Modified
---

<Intro>
In the Compute Engine, **collections** group together multiple elements
into one unit. Each element in a collection is a
[**Expression**](/compute-engine/guides/expressions/).
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




### Indexed Collections and Non-indexed Collections

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

### Nested Collections

The elements of a collection are its **top-level** elements: a nested
collection such as a matrix (a list of lists) is a collection of its rows.

Collection operations apply to those top-level elements. For example
`Count` of a 3×3 matrix is 3 (the number of rows), `First` is its first
row, and `Take`, `Drop` and `Slice` select rows.

```json example
["Count", ["List", ["List", 2, 3, 4], ["List", 6, 7, 9]]]
// ➔ 2

["First", ["List", ["List", 2, 3, 4], ["List", 6, 7, 9]]]
// ➔ ["List", 2, 3, 4]
```

To access a scalar entry of a nested collection, use `At` with multiple
indexes (e.g. `["At", matrix, i, j]`), and to operate on the scalar
entries, flatten the collection first with
[`Flatten`](/compute-engine/reference/linear-algebra/#flatten).


### Finite and Infinite Collections

Collections may be:
- **Finite**: containing a definite number of elements
- **Infinite**: continuing indefinitely (for example, a sequence of all natural numbers)
- **Indeterminate**: containing an unknown number of elements, such as a stream of data that may end at some point

Compute Engine supports **lazy evaluation** to make working with infinite collections possible.

### Lazy Collections and Eager Collections

Collections can be:
- **Eager**: elements are fully evaluated when the collection is created.
- **Lazy**: elements are evaluated only as they are accessed.

Lazy collections are useful when working with expensive computations
and necessary when working with infinite collections.

Some operations like `Range`, `Cycle`, `Iterate`, `Repeat` create **lazy collections**.

Materializing a lazy collection involves evaluating all its elements and storing 
them in memory, resulting in an **eager collection**. This is also known as 
**realizing** the collection.

**To materialize a collection** use [`ListFrom`](#listfrom) 
or [`SetFrom`](#setfrom). These functions enumerate all elements of a finite 
collection and produce a matching eager collection.

```json example
["ListFrom", ["Range", 1, 10]]
// ➔ ["List", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Lazy infinite collections provide a natural way to model mathematical 
sequences, iterative processes, or cyclic patterns, with minimal memory use.

Common examples include:
- Natural numbers (`["Range"]`)
- Cyclic patterns (`["Cycle"]`)
- Iterative computations (`["Iterate"]`)

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
const expr = ce.expr(["Map", "Integers", ["Square", "_"]]);
expr.print();
// ➔ [1, 4, 9, 16, 25...]
```

#### Materialization Cap

The `ce.maxCollectionSize` property (default `10_000`) bounds how many
elements a lazy collection may have when it is converted to a concrete
`List`. Sites that would otherwise build an oversize list — such as
`Repeat(value, count)` with a large `count`, or the eager-materialization
path for a finite indexed collection — leave the expression in its lazy
form instead. Elements remain individually accessible via `.at()` and
the iterator.

```js example
ce.maxCollectionSize = 5;
ce.expr(['Repeat', 7, 100]).evaluate();
// ➔ ["Repeat", 7, 100]  (stays lazy; would exceed the cap)

ce.expr(['Repeat', 7, 3]).evaluate();
// ➔ ["List", 7, 7, 7]
```

Set `ce.maxCollectionSize` to `Infinity` (or to `0` / a negative number)
to disable the cap. The setter normalizes any non-positive value to
`Infinity`, mirroring `ce.iterationLimit` and `ce.recursionLimit`.

The cap applies to materialization specifically. Element-wise operations
on lazy collections (broadcasting an operator like `Add` over a `Range`,
or applying a user-defined lambda to a list) are not currently bounded
by `maxCollectionSize`; use a finite, explicitly-materialized list if
strict size enforcement is required throughout the evaluation pipeline.


#### Eager Collections

Eager collections are fully materialized when they are created. This means that 
all elements are computed and stored in memory, making them immediately 
available for access. 

Some of the eager collections include:

- [**List**](#list): indexed collections of elements, which are also used to represent
  **vectors** and **matrices**. Elements in a list are accessed by their
  index, which starts at 1. Lists can contain duplicate elements and they can 
  contain an infinite number of elements.
  
  **Type:** `list<T>` where `T` is the type of the elements.

- **Sequence**: a sequence is a list but it is handled differently in the
  Compute Engine. It is used to splice elements into an expression where an element
  is expected. The `Nothing` symbol is a synonym for the empty sequence.
  
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
- [**Fill**](#fill) and [**Tabulate**](#tabulate): collections of a specified
  size, where each element is computed by a function or set to a specific value.

### Types

- The type `collection` represents any collection, whether indexed or not, finite or infinite.
- The type `indexed_collection` applies to collections that support index-based access, such as `List`, and `Tuple`.



### Operations on Collections

Operations on all collections, whether indexed or not, include:
- [**Filter**](#filter), [**Map**](#map), and [**Reduce**](#reduce): operations that create new collections by applying a function to each element of an existing collection.
- [**Count**](#count), [**IsEmpty**](#isempty): check the number of elements of a collection.
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
const xs = ce.expr(["List", 5, 2, 10, 18]);

xs.latex
// ➔ "\lbrack 5, 2, 10, 18 \rbrack"

ce.expr(["Delimiter", xs, "<;>"]).latex;
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

<nav className="hidden">
### IndexedSequence
</nav>

<FunctionDefinition name="IndexedSequence">

<Signature name="IndexedSequence">_term_, _index_, _lower_</Signature>

<Signature name="IndexedSequence">_term_, _index_, _lower_, _upper_</Signature>

The **sequence-braces** notation $\{a_n\}_{n=1}^{\infty}$ parses to an
`IndexedSequence`: the indexed family whose _term_ is $a_n$, with _index_ symbol
`n` ranging from _lower_ (optionally up to _upper_).

<Latex value="\{a_n\}_{n=1}^{\infty}"/>

```json example
["IndexedSequence", ["a_", "n"], "n", 1, "PositiveInfinity"]
```

The _term_ uses the operator-call form (`["a_", "n"]`) so that the index binding
survives. A set-membership subscript maps the set's least element to the lower
bound:

```json example
// \{a_n\}_{n\in\mathbb{N}}
["IndexedSequence", ["a_", "n"], "n", 0]
```

`IndexedSequence` is currently **inert**: it is unchanged by `evaluate()` and
`simplify()`, and round-trips through LaTeX (it does not yet carry collection
semantics).

Note that the bare braces $\{a_n\}$ remain a [`Set`](#Set), and the
parenthesized form $(a_n)_{n\in\mathbb{N}}$ is unchanged.

</FunctionDefinition>


## Creating Lazy Collections


<nav className="hidden">
### Range
</nav>

<FunctionDefinition name="Range">

<Signature name="Range" returns="indexed_collection<integer>">_upper_:number</Signature>

<Signature name="Range" returns="indexed_collection<integer>">_lower_:number, _upper_:number</Signature>

<Signature name="Range" returns="indexed_collection<number>">_lower_:number, _upper_:number, _step_:number</Signature>

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

**Element type narrows by step.** When the step is omitted or is an integer
literal, the result is `indexed_collection<integer>`. When the step is
non-integer (e.g. `0.1`) or a symbolic expression, the result widens to
`indexed_collection<number>`.

```json example
["Range", 0, 1, 0.1]
// type: indexed_collection<number>
// ➔ ["List", 0, 0.1, 0.2, 0.3, ..., 1.0]
```

### LaTeX Syntax

In addition to `\operatorname{range}(...)` and the `..` infix form, `Range`
can be authored inside a list literal using ellipsis notation:

```latex
[1...9]                 % endpoint-only form
[1, 3, ..., 9]          % inferred-step form (step = 3 - 1 = 2)
[0, 0.1, 0.2, ..., 1]   % inferred float step
```

The ellipsis token can be `...` (three periods), `\ldots`, or `\dots`. In
the inferred-step form, the step is computed from the first sample pair and
all intermediate samples are validated against the inferred step within
`ce.tolerance`. Inconsistent samples (e.g. `[0, 0.1, 0.5, ..., 1]`) produce
a parse error.

Outside `[...]` brackets, the ellipsis tokens continue to parse as the
`ContinuationPlaceholder` symbol.

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
### Tabulate
</nav>

<FunctionDefinition name="Tabulate">

<Signature name="Tabulate" returns="collection">_f_:function, _dimension_:integer</Signature>

<Signature name="Tabulate" returns="collection">_f_:function, _rows_:integer, _columns_:integer</Signature>

Create a collection by applying a function to every index in the specified
dimensions. Indices start at 1.

```json example
["Tabulate", ["Function", ["Square", "i"], "i"], 5]
// ➔ ["List", 1, 4, 9, 16, 25]
```

With multiple dimensions, the function receives one index for each dimension
and the result is a nested list.

```json example
["Tabulate", ["Function", ["Add", "i", "j"], "i", "j"], 2, 3]
// ➔ ["List", ["List", 2, 3, 4], ["List", 3, 4, 5]]
```

Unlike [`Fill`](#fill), `Tabulate` takes each dimension as a separate argument.

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

Applying `At` repeatedly is equivalent to supplying several indexes at once.
In Cortex syntax, both `m[2][1]` and `m[2, 1]` select the same matrix element.
Indexing a matrix once returns a row with its collection type preserved, so the
result can be indexed again.

<Signature name="At">_xs_: indexed_collection, _indices_: indexed_collection&lt;integer&gt;</Signature>

When the index is a collection of integers, `At` returns a new list
containing the elements of `xs` at those positions. Out-of-range
positions are silently filtered.

```json example
["At", ["List", 10, 20, 30, 40, 50], ["List", 1, 3, 5]]
// ➔ ["List", 10, 30, 50]
```

<Signature name="At">_xs_: indexed_collection, _mask_: indexed_collection&lt;boolean&gt;</Signature>

When the index is a collection of `True`/`False` values, `At` returns
the elements of `xs` where the mask is `True`. If the mask is shorter
than `xs`, the iteration stops at the end of the mask.

```json example
["At", ["List", 10, 20, 30, 40], ["List", "True", "False", "True", "False"]]
// ➔ ["List", 10, 30]
```

#### Filtering with a Condition

A boolean condition in index position filters the collection: relational
operators (`<`, `<=`, `>`, `>=`, `=`, `!=`) broadcast elementwise over a list
operand, producing the boolean mask that `At` then applies.

<Latex value="L[L>0]"/>

```js
ce.assign("L", ce.parse("[-1, 2, -3, 4]"));
ce.parse("L[L>0]").evaluate();
// ➔ ["List", 2, 4]
```

The condition does not have to reference the filtered list itself — it can be
another list of the same length (`L[d=4]` where `d` is a list), or a positional
mask computed from a `Range`:

```js
// Remove the i-th element of L:
ce.parse("L[|[1...\\operatorname{length}(L)]-i|>0]");
// ➔ ["At", "L", ["Less", 0, ["Abs", ["Add", ["Negate", "i"], ["Range", 1, ["Length", "L"]]]]]]
```

The mask is applied positionally and truncates to the shorter of the
collection and the mask. A comparison between **two** collections is not
elementwise — `[1,2,3] = [1,2,3]` evaluates to `True` (whole-value equality);
only a collection-versus-scalar comparison broadcasts.

#### Subscript Notation

When a symbol is declared as a collection type, subscripts in LaTeX are
automatically converted to `At` expressions:

```javascript
ce.declare('v', 'list<number>');
ce.parse('v_n');      // → ["At", "v", "n"]
ce.parse('v_{n+1}');  // → ["At", "v", ["Add", "n", 1]]
ce.parse('v_{i,j}');  // → ["At", "v", ["Tuple", "i", "j"]]
```

You can also use bracket notation, which always produces `At` regardless
of the symbol's type:

<Latex value="v[n]"/>

```json
["At", "v", "n"]
```

The type of the `At` expression is inferred from the collection's element type,
so `v_n` where `v` is `list<number>` has type `number` and can be used in
arithmetic expressions.

</FunctionDefinition>

<FunctionDefinition name="Keys">

<Signature name="Keys" returns="list&lt;string&gt;">_dictionary_: dictionary</Signature>

Return the dictionary keys as strings, in dictionary iteration order.

```json example
["Keys", ["Dictionary", ["KeyValuePair", "a", 1], ["KeyValuePair", "b", 2]]]
// ➔ ["List", "a", "b"]
```

</FunctionDefinition>

<FunctionDefinition name="Values">

<Signature name="Values" returns="list">_dictionary_: dictionary</Signature>

Return the dictionary values in dictionary iteration order.

```json example
["Values", ["Dictionary", ["KeyValuePair", "a", 1], ["KeyValuePair", "b", 2]]]
// ➔ ["List", 1, 2]
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
### Third
</nav>

<FunctionDefinition name="Third">

<Signature name="Third">_xs_: indexed_collection</Signature>

Return the third element of the collection.

```json example
["Third", ["List", 5, 2, 10, 18]]
// ➔ 10
```

It's equivalent to `["At", xs, 3]`.

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

<nav className="hidden">
### Slice
</nav>

<FunctionDefinition name="Slice">

<Signature name="Slice" returns="list">_xs_:indexed_collection, _start_:integer, _end_:integer</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Return the elements from the 1-based `start` index through the `end` index,
inclusive. Negative indices are counted from the end of the collection.

```json example
["Slice", ["List", 5, 2, 10, 18], 2, 3]
// ➔ ["List", 2, 10]

["Slice", ["List", 5, 2, 10, 18], -3, -1]
// ➔ ["List", 2, 10, 18]
```

</FunctionDefinition>

<nav className="hidden">
### TakeWhile
</nav>

<FunctionDefinition name="TakeWhile">

<Signature name="TakeWhile" returns="collection">_xs_:collection, _predicate_:function</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Returns the leading elements of `xs` for as long as the predicate is `True`,
stopping at (and excluding) the first element for which the predicate is not
`True`.

```json example
["TakeWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 1, 2, 3]
```

Because it is lazy and stops early, `TakeWhile` composes with infinite
collections.

```json example
["TakeWhile", ["Range", 1, "Infinity"], ["Function", ["Less", "x", 4], "x"]]
// ➔ ["List", 1, 2, 3]
```

See [**DropWhile**](#dropwhile) for the complementary operation.

</FunctionDefinition>

<nav className="hidden">
### DropWhile
</nav>

<FunctionDefinition name="DropWhile">

<Signature name="DropWhile" returns="collection">_xs_:collection, _predicate_:function</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Skips the leading elements of `xs` for as long as the predicate is `True`, then
yields the remaining elements. Once an element fails the predicate, the rest of
the collection is returned unchanged (the predicate is not applied again).

```json example
["DropWhile", ["List", 1, 2, 3, 10, 1], ["Function", ["Less", "x", 5], "x"]]
// ➔ ["List", 10, 1]
```

See [**TakeWhile**](#takewhile) for the complementary operation.

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

The optional function is interpreted by its **arity**:

- A **two-argument comparator** `f(a, b)` returns a negative number when `a`
  should come before `b`, zero when they are equivalent, and a positive number
  otherwise (like a conventional `compare` function).

  ```json example
  ["Sort", ["List", 3, 1, 2], ["Function", ["Subtract", "b", "a"], "a", "b"]]
  // ➔ ["List", 3, 2, 1]
  ```

- A **one-argument key function** `f(x)` sorts the elements **ascending** by
  the key value `f(x)`. The sort is **stable**: elements with equal keys keep
  their original relative order.

  ```json example
  ["Sort", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
  // ➔ ["List", 1, -2, -3]
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

<nav className="hidden">
### MaxBy
</nav>

<FunctionDefinition name="MaxBy">

<Signature name="MaxBy" returns="value">_xs_: collection, _f_: function</Signature>

Return the **element** of `xs` for which the key `f(x)` is largest. The first
occurrence wins on ties.

```json example
["MaxBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ -3
```

`MaxBy` stays unevaluated on an empty or infinite collection, or when a key
comparison is undetermined.

</FunctionDefinition>

<nav className="hidden">
### MinBy
</nav>

<FunctionDefinition name="MinBy">

<Signature name="MinBy" returns="value">_xs_: collection, _f_: function</Signature>

Return the **element** of `xs` for which the key `f(x)` is smallest. The first
occurrence wins on ties.

```json example
["MinBy", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

`MinBy` stays unevaluated on an empty or infinite collection, or when a key
comparison is undetermined.

</FunctionDefinition>

<nav className="hidden">
### ArgMax
</nav>

<FunctionDefinition name="ArgMax">

<Signature name="ArgMax" returns="integer">_xs_: indexed_collection</Signature>

<Signature name="ArgMax" returns="integer">_xs_: indexed_collection, _f_: function</Signature>

Return the **1-based index** of the element of `xs` for which the key `f(x)` is
largest. When no key function is given, the elements themselves are compared.
The first occurrence wins on ties.

```json example
["ArgMax", ["List", 5, 2, 10, 18]]
// ➔ 4

["ArgMax", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 1
```

`ArgMax` stays unevaluated on an empty or infinite collection, or when a key
comparison is undetermined.

</FunctionDefinition>

<nav className="hidden">
### ArgMin
</nav>

<FunctionDefinition name="ArgMin">

<Signature name="ArgMin" returns="integer">_xs_: indexed_collection</Signature>

<Signature name="ArgMin" returns="integer">_xs_: indexed_collection, _f_: function</Signature>

Return the **1-based index** of the element of `xs` for which the key `f(x)` is
smallest. When no key function is given, the elements themselves are compared.
The first occurrence wins on ties.

```json example
["ArgMin", ["List", 5, 2, 10, 18]]
// ➔ 2

["ArgMin", ["List", -3, 1, -2], ["Function", ["Abs", "x"], "x"]]
// ➔ 2
```

`ArgMin` stays unevaluated on an empty or infinite collection, or when a key
comparison is undetermined.

</FunctionDefinition>


## Operating On Collections

<nav className="hidden">
### Length
</nav>

<FunctionDefinition name="Length">

<Signature name="Length" returns="integer">_xs_:any</Signature>

Return the number of elements in a finite collection. If the argument is not a
collection or is infinite, the expression remains unevaluated.

```json example
["Length", ["List", 5, 2, 10, 18]]
// ➔ 4
```

For collections, `Length` and [`Count`](#count) produce the same result;
`Count` is restricted to collection arguments by its signature.

</FunctionDefinition>




<nav className="hidden">
### Count
</nav>



<FunctionDefinition name="Count">

<Signature name="Count" returns="integer">_xs_: collection</Signature>

Returns the number of elements in the collection.

When the collection is a matrix (list of lists), `Count` returns the number of
rows.

```json example
["Count", ["List", 5, 2, 10, 18]]
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

<nav className="hidden">
### IndexOf
</nav>

<FunctionDefinition name="IndexOf">

<Signature name="IndexOf" returns="integer">_xs_:collection, _value_:any</Signature>

Return the 1-based index of the first occurrence of `value`, or 0 if it is not
present.

```json example
["IndexOf", ["List", 5, 2, 10, 2], 2]
// ➔ 2

["IndexOf", ["List", 5, 2, 10, 2], 42]
// ➔ 0
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
### Any
</nav>

<FunctionDefinition name="Any">

<Signature name="Any" returns="boolean">_xs_: collection</Signature>

<Signature name="Any" returns="boolean">_xs_: collection, _predicate_: function</Signature>

Returns `True` if at least one element of the collection satisfies the
predicate, `False` otherwise.

When no predicate is given, the elements themselves are treated as booleans.

```json example
["Any", ["List", 1, 2, 3], ["Function", ["Greater", "x", 2], "x"]]
// ➔ "True"

["Any", ["List", "False", "True", "False"]]
// ➔ "True"
```

`Any` **short-circuits**: it stops at the first element that satisfies the
predicate, so it can return a definite answer even for an infinite collection.

```json example
["Any", ["Range", 1, "Infinity"], ["Function", ["Greater", "x", 5], "x"]]
// ➔ "True"
```

`Any` of an empty collection is `False`. When the answer depends on symbolic or
undetermined elements, the expression stays unevaluated.

```json example
["Any", ["List"]]
// ➔ "False"

["Any", ["List", "a", "b"], ["Function", ["Greater", "x", 0], "x"]]
// ➔ ["Any", ["List", "a", "b"], ["Function", ["Greater", "x", 0], "x"]]
```

</FunctionDefinition>

<nav className="hidden">
### All
</nav>

<FunctionDefinition name="All">

<Signature name="All" returns="boolean">_xs_: collection</Signature>

<Signature name="All" returns="boolean">_xs_: collection, _predicate_: function</Signature>

Returns `True` if every element of the collection satisfies the predicate,
`False` otherwise.

When no predicate is given, the elements themselves are treated as booleans.

```json example
["All", ["List", 1, 2, 3], ["Function", ["Greater", "x", 0], "x"]]
// ➔ "True"

["All", ["List", 1, 2, 3], ["Function", ["Greater", "x", 2], "x"]]
// ➔ "False"
```

`All` **short-circuits**: it stops at the first element that fails the
predicate, so it can return `False` even for an infinite collection.

```json example
["All", ["Range", 1, "Infinity"], ["Function", ["Less", "x", 5], "x"]]
// ➔ "False"
```

`All` of an empty collection is `True`. When the answer depends on symbolic or
undetermined elements, the expression stays unevaluated.

```json example
["All", ["List"]]
// ➔ "True"
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

<Signature name="Map" returns="collection">..._xss_:collection, _f_:function</Signature>

Returns a collection where _f_ is applied to each element of _xs_.

```json example
["Map", ["List", 5, 2, 10, 18], ["Function", ["Add", "x", 1], "x"]]
// ➔ ["List", 6, 3, 11, 19]
```

```json example
["Map", ["List", 5, 2, 10, 18], ["Multiply", "_", 2]]
// ➔ ["List", 10, 4, 20, 36]
```

`Map` is **variadic**: when several collections are given, _f_ is applied
element-wise across them (a `zipWith`). The function is always the **last**
argument, and it receives one element from each collection. The result has the
length of the **shortest** input collection.

```json example
["Map",
  ["List", 1, 2, 3],
  ["List", 10, 20, 30],
  ["Function", ["Add", "x", "y"], "x", "y"]]
// ➔ ["List", 11, 22, 33]
```

</FunctionDefinition>

<nav className="hidden">
### FlatMap
</nav>

<FunctionDefinition name="FlatMap">

<Signature name="FlatMap" returns="list">_xs_:collection, _f_:function</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Applies _f_ to each element of _xs_ and concatenates the results into a single
list. When _f_ returns a collection, its elements are **spliced** into the
output; a non-collection result is included as a single element.

```json example
["FlatMap", ["List", 1, 2, 3], ["Function", ["List", "x", "x"], "x"]]
// ➔ ["List", 1, 1, 2, 2, 3, 3]
```

```json example
["FlatMap", ["List", 1, 2, 3], ["Function", ["Range", 1, "x"], "x"]]
// ➔ ["List", 1, 1, 2, 1, 2, 3]
```

A scalar result is kept as a single element rather than raising an error.

```json example
["FlatMap", ["List", 1, 2, 3], ["Function", ["Multiply", "x", 2], "x"]]
// ➔ ["List", 2, 4, 6]
```

</FunctionDefinition>


<nav className="hidden">
### Comprehension
</nav>

<FunctionDefinition name="Comprehension">

<Signature name="Comprehension" returns="list">_body_, _element-1_, _element-2_, ...</Signature>

The **list-comprehension** operator. Evaluates `body` once for each
combination of one or more `["Element", _name_, _collection_]` clauses and
collects the results into a `List`.

```json example
["Comprehension", ["Square", "x"], ["Element", "x", ["Range", 1, 3]]]
// ➔ ["List", 1, 4, 9]
```

`Comprehension(body, Element(x, xs))` is equivalent to
`Map(xs, x ↦ body)`. `Comprehension` additionally supports multiple,
possibly dependent, clauses.

Bindings are evaluated as nested loops, outermost = first `Element` clause.
Later clauses see earlier bindings in scope, so a clause's collection can
depend on a name bound by an earlier clause.

When all clauses are independent, the result is the Cartesian product:

```json example
["Comprehension",
  ["Tuple", "x", "y"],
  ["Element", "x", ["Range", 1, 2]],
  ["Element", "y", ["Range", 1, 2]]]
// ➔ [(1,1), (1,2), (2,1), (2,2)]  — 4 tuples
```

When a later clause depends on an earlier binding, the iteration follows
the dependency (and the Cartesian product collapses):

```json example
["Comprehension",
  ["Tuple", "x", "y"],
  ["Element", "x", ["Range", 1, 3]],
  ["Element", "y", ["Range", 1, "x"]]]
// ➔ [(1,1), (2,1), (2,2), (3,1), (3,2), (3,3)]  — 6 tuples (triangle)
```

`Comprehension` is scope-hygienic: bound names do not leak into the
enclosing scope.

`Comprehension` is a **value expression**, not control flow: `Break`,
`Continue` and `Return` inside `body` are not intercepted by
`Comprehension`. To filter elements, use [`Filter`](#filter) or [`Map`](#map)
instead.

The trailing `\operatorname{for}` LaTeX syntax produces a `Comprehension`:

```latex
(x, y) \keyword{for} x = [1...3], y = [1...x]
```

<ReadMore path="/compute-engine/reference/control-structures/#loop" >
See also the **`Loop`** function, which iterates for effect instead of
collecting a result.<Icon name="chevron-right-bold" />
</ReadMore>

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
### Scan
</nav>

<FunctionDefinition name="Scan">

<Signature name="Scan" returns="collection">_xs_:collection, _f_:function</Signature>

<Signature name="Scan" returns="collection">_xs_:collection, _f_:function, _initial_:value</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Returns the **running fold** of _f_ over _xs_: a collection of the same length as
_xs_ whose $n$-th element is the accumulated result of _f_ applied through the
first $n$ elements. Unlike [`Reduce`](#reduce), which returns only the final
value, `Scan` returns every intermediate value.

```json example
["Scan", ["List", 1, 2, 3, 4], "Add"]
// ➔ ["List", 1, 3, 6, 10]
```

When an `initial` value is provided, the accumulation starts from it and the
first output is `f(initial, x1)`.

```json example
["Scan", ["List", 1, 2, 3, 4], "Add", 100]
// ➔ ["List", 101, 103, 106, 110]
```

</FunctionDefinition>

<nav className="hidden">
### Differences
</nav>

<FunctionDefinition name="Differences">

<Signature name="Differences" returns="collection">_xs_:collection</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Returns the collection of **successive differences** of `xs`, that is
$x_{n+1} - x_n$. The result has one fewer element than the input.

Differences are computed exactly, preserving the type of the operands
(integers, rationals, etc.).

```json example
["Differences", ["List", 1, 4, 9, 16]]
// ➔ ["List", 3, 5, 7]
```

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
<Signature name="Partition">_collection_, _size_:integer</Signature>
<Signature name="Partition">_collection_, _size_:integer, _step_:integer</Signature>
<Signature name="Partition">_collection_, _predicate_:function</Signature>

Partitions a collection into chunks of `size` elements. The trailing chunk may
be shorter when `size` does not divide the length of the collection.

With a `step`, returns sliding windows of `size` elements whose starting
positions are `step` apart; only complete windows are included.

If a predicate function is given, splits into two groups: elements for which
the predicate is true, and those for which it is false.

To split a collection into a given _number_ of groups, use `Chunk` instead.

```json example
["Partition", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2], ["List", 3, 4], ["List", 5]]
["Partition", ["List", 1, 2, 3, 4, 5], 2, 1]
// ➔ ["List", ["List", 1, 2], ["List", 2, 3], ["List", 3, 4], ["List", 4, 5]]
["Partition", ["List", 1, 2, 3, 4, 5, 6], ["Function", ["Even", "_"]]]
// ➔ ["List", ["List", 2, 4, 6], ["List", 1, 3, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="Chunk">
<Signature name="Chunk">_collection_, _count_:integer</Signature>

Splits the collection into `count` nearly equal-sized groups.

To split a collection into chunks of a given _size_, use `Partition` instead.

```json example
["Chunk", ["List", 1, 2, 3, 4, 5], 2]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5]]
```
</FunctionDefinition>

<FunctionDefinition name="GroupBy">
<Signature name="GroupBy">_collection_, _function_:function</Signature>

Partitions the collection into groups according to the value of the grouping function applied to each element. Returns a dictionary mapping group keys to lists of elements. Dictionary keys are strings: the key value returned by the function is stringified.

```json example
["GroupBy", ["List", 1, 2, 3, 4], ["Function", ["IsEven", "x"], "x"]]
// ➔ {"dict": {"False": [1, 3], "True": [2, 4]}}
```
</FunctionDefinition>

<nav className="hidden">
### ChunkBy
</nav>

<FunctionDefinition name="ChunkBy">
<Signature name="ChunkBy" returns="list">_collection_, _function_:function</Signature>

Splits the collection into maximal **runs of consecutive elements** that share
the same key value `f(x)`. Unlike [`GroupBy`](#groupby), which gathers all
elements with the same key regardless of position, `ChunkBy` only groups
elements that are adjacent.

```json example
["ChunkBy", ["List", 1, 1, 2, 2, 2, 1], ["Function", "x", "x"]]
// ➔ ["List", ["List", 1, 1], ["List", 2, 2, 2], ["List", 1]]
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

<FunctionDefinition name="Append">

<Signature name="Append" returns="collection">_collection_, _element_</Signature>

Return a collection with _element_ added at the end. Collections are immutable;
the input is not modified.

```json example
["Append", ["List", 1, 2], 3]
// ➔ ["List", 1, 2, 3]
```

</FunctionDefinition>

<nav className="hidden">
### Insert
</nav>

<FunctionDefinition name="Insert">

<Signature name="Insert" returns="collection">_collection_, _index_:integer, _value_:any</Signature>

Return a new collection with `value` inserted at the 1-based `index`. The
element previously at that index and everything after it shift right. An index
equal to $n+1$ (one past the end) appends.

```json example
["Insert", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 2, 3]

["Insert", ["List", 1, 2, 3], 4, 99]
// ➔ ["List", 1, 2, 3, 99]
```

**Negative indices** count from the end, Elixir-style: `-1` appends at the very
end, `-2` inserts before the last element, and so on.

```json example
["Insert", ["List", 1, 2, 3], -1, 99]
// ➔ ["List", 1, 2, 3, 99]

["Insert", ["List", 1, 2, 3], -2, 99]
// ➔ ["List", 1, 2, 99, 3]
```

Collections are immutable; the input is not modified. An out-of-range or
symbolic index leaves the expression unevaluated.

</FunctionDefinition>

<nav className="hidden">
### DeleteAt
</nav>

<FunctionDefinition name="DeleteAt">

<Signature name="DeleteAt" returns="collection">_collection_, _index_:integer</Signature>

Return a new collection with the element at the 1-based `index` removed.
Negative indices count from the end (`-1` is the last element).

```json example
["DeleteAt", ["List", 1, 2, 3], 2]
// ➔ ["List", 1, 3]

["DeleteAt", ["List", 1, 2, 3], -1]
// ➔ ["List", 1, 2]
```

Collections are immutable; the input is not modified. An out-of-range or
symbolic index leaves the expression unevaluated.

</FunctionDefinition>

<nav className="hidden">
### ReplaceAt
</nav>

<FunctionDefinition name="ReplaceAt">

<Signature name="ReplaceAt" returns="collection">_collection_, _index_:integer, _value_:any</Signature>

Return a new collection with the element at the 1-based `index` replaced by
`value`. Negative indices count from the end (`-1` is the last element).

```json example
["ReplaceAt", ["List", 1, 2, 3], 2, 99]
// ➔ ["List", 1, 99, 3]

["ReplaceAt", ["List", 1, 2, 3], -1, 99]
// ➔ ["List", 1, 2, 99]
```

Collections are immutable; the input is not modified. An out-of-range or
symbolic index leaves the expression unevaluated.

</FunctionDefinition>

<FunctionDefinition name="Fold">

<Signature name="Fold">_function_, _initial_, _collection_</Signature>

Apply _function_ from left to right, starting with _initial_. `Fold` is the
function-first form of a left fold.

```json example
["Fold", "Add", 0, ["List", 1, 2, 3, 4]]
// ➔ 10
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

<nav className="hidden">
### Dedup
</nav>

<FunctionDefinition name="Dedup">

<Signature name="Dedup" returns="collection">_xs_: collection</Signature>

<div className="tags"><span className="tag">lazy</span></div>

Collapses **consecutive** runs of duplicate elements into a single element.
Unlike [`Unique`](#unique), which removes every later duplicate anywhere in the
collection, `Dedup` only removes duplicates that are adjacent, so a value that
reappears after a different value is kept.

```json example
["Dedup", ["List", 1, 1, 2, 2, 1]]
// ➔ ["List", 1, 2, 1]
```

</FunctionDefinition>

## Materializing Collections

Materializing a collection means converting it from a lazy representation to 
an eager one. This involves evaluating all elements of the collection and 
storing them in memory.

<nav className="hidden">
### ListFrom
### SetFrom
### TupleFrom
</nav>


<FunctionDefinition>

<Signature name="ListFrom" returns="list">_xs_: collection</Signature>
<Signature name="SetFrom" returns="set">_xs_: collection</Signature>
<Signature name="TupleFrom" returns="tuple">_xs_: collection</Signature>

Returns a materialized list, set or tuple containing the elements of the 
collection `xs`.

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
### DictionaryFrom
</nav>

<FunctionDefinition>
<Signature name="RecordFrom" returns="record">_xs_: collection</Signature>
<Signature name="DictionaryFrom" returns="map">_xs_: collection</Signature>

Returns a record or map containing the elements of the collection `xs`.

The collection `xs` should be a finite collection of key-value pairs, each key being
a string.

```json example
["RecordFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ ["Record", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]

["DictionaryFrom", ["List", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]]
// ➔ ["Dictionary", ["Tuple", "'a'", 1], ["Tuple", "'b'", 2]]
```

</FunctionDefinition>
