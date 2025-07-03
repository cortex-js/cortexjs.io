---
title: Linear Algebra
slug: /compute-engine/reference/linear-algebra/
---

<Intro>
[Linear algebra](https://en.wikipedia.org/wiki/Linear_algebra) is the branch of 
mathematics that studies vector spaces and linear transformations between them 
like adding and scaling. It uses matrixes to represent linear maps. 
Linear algebra is widely used in science and engineering. 
</Intro>

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

In the Compute Engine matrices are represented as lists of lists.

For example the matrix above is represented as the following list of lists:

```json example
["List", ["List", 1, 3, ["List", 5, 0]]]
```

An **axis** is a dimension of a tensor. A vector has one axis, a matrix has two
axes, a tensor (multi-dimensional matrix) has more than two axes.

The **shape** of a tensor is the length of each of its axes. For example, a
matrix with 3 rows and 4 columns has a shape of `(3, 4)`.

The **rank** of a tensor is the number of axes of the tensor. For example, a
matrix has a rank of 2. Note that rank is sometimes used with a different
meaning. For example, the rank of a matrix can also be defined as the maximum
number of linearly independent rows or columns of the matrix. In the Compute
Engine, **rank** is always used with the meaning of the number of axes.


In the Compute Engine, matrices are stored in **row-major** order. This means that
the first element of the outer axis is the first row of the matrix, the second element
of the list is the second row of the matrix, etc.


<ReadMore path="/compute-engine/reference/collections/" >Since
matrixes are `List` collections, some **collection operations**
can also be applied to them such as `At`, `Reduce` and `Map`. </ReadMore>


An extension of linear algebra is [tensor algebra](https://en.wikipedia.org/wiki/Tensor_algebra) 
which studies tensors, which are multidimensional arrays. 

For example, a grayscale image can be represented by a matrix of grayscale 
values. But a color image is represented by a rank 3 tensor, an array of RGB 
triplets. Tensors are also represented as nested lists.

The Compute Engine provides a number of functions for working with matrices.

## Representing Matrices

Vectors (row vectors) are represented as lists, that is an expression with the 
head `List`.

Matrixes are represented as lists of lists.

Tensors (multi-dimensional matrixes) are represented as nested lists.

:::info[Note]
Tensors are represented internally using an optimized format that is more
efficient than nested lists. Because of this, some operations on tensors 
such as `Reshape` and `Transpose` can be done in O(1) time. 
:::


`Vector` is a convenience function that interprets a list of elements as a
column vector.

`Matrix` is an optional "tag" inert function that is used to influence the visual
representation of a matrix. It has not impact on the value of the matrix.

In LaTeX notation, a matrix is represented with "environments" (with command
`\begin` and `\end`) such as  `pmatrix` or `bmatrix`.:

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

<Latex value="\begin{bmatrix} 1 & 3 \\ 5 & 0 \end{bmatrix}"/>

In LaTeX, each column is separated by an `&` and each row is separated by
`\`.


<nav className="hidden">
### Vector
</nav>
<FunctionDefinition name="Vector">

<Signature name="Vector">_x-1_, ..._x-2_</Signature>

`Vector` interprets the elements _x-1_... as a column vector

This is essentially a shortcut for `["Matrix", ["List", ["List", _x-1_], ["List, _x-2_], ...]]]`.

```json example
["Vector", 1, 3, 5, 0]
```

<Latex value="\begin{pmatrix} 1 \\ 3 \\ 5 \\ 0 \end{pmatrix}"/>

A row vector can be represented with a simple list or a tuple.

```json example
["List", 1, 3, 5, 0]
```

<Latex value="\begin{bmatrix} 1 & 3 & 5 & 0 \end{bmatrix}"/>


</FunctionDefinition>



<nav className="hidden">
### Matrix
</nav>
<FunctionDefinition name="Matrix">

<Signature name="Matrix">_matrix_</Signature>

<Signature name="Matrix">_matrix_, _delimiters_, _columns-format_</Signature>

`Matrix` is an inert function: its value is the value of its first argument. 
It influences the visual representation of a matrix.

_matrix_ is a matrix represented by a list of rows. Each row is represented 
by a list of elements.

_delimiters_ is an optional string of two characters. 
The first character represent the opening delimiter and the second character 
represents the closing delimiter.

The delimiters can be any of the following characters: 
  - `(`, `)`, `[`, `]`, `{`, `}`, `<`, `>`
  - `⟦` (`U+27E6`), `⟧` (`U+27E7`)
  - `|`, `‖` (`U+2016`)
  - `\`
  - `⌈` (`U+2308`), `⌉` (`U+2309`), `⌊` (`U+230A`), `⌋` (`U+230B`)
  - `⌜` (`U+231C`), `⌝` (`U+231D`), `⌞` (`U+231E`), `⌟` (`U+231F`)
  - `⎰` (`U+23B0`), `⎱` (`U+23B1`). 

In addition, the character `.` can be used to indicate no delimiter.

Some commom combinations may be represented using some 
standard LaTeX environments:

| Delimiters | LaTeX Environment | Example |
| :-- | :-- | :-- |
| `()` | `pmatrix` | $$ \begin{pmatrix} a & b \\ c & d \end{pmatrix} $$ |
| `[]` | `bmatrix` | $$ \begin{bmatrix} a & b \\ c & d \end{bmatrix} $$ |
| `{}` | `Bmatrix` | $$ \begin{Bmatrix} a & b \\ c & d \end{Bmatrix} $$ |
| `||` | `vmatrix` | $$ \begin{vmatrix} a & b \\ c & d \end{vmatrix} $$ |
| `‖‖` | `Vmatrix` | $$ \begin{Vmatrix} a & b \\ c & d \end{Vmatrix} $$ |
| `{.` | `dcases` | $$ \begin{dcases} a & b \\ c & d \end{dcases} $$ |
| `.}` | `rcases` | $$ \begin{rcases} a & b \\ c & d \end{rcases} $$ |

_columns_format_ is an optional string indicating the format of each column. 
A character `=` indicates a centered column, `<` indicates a left-aligned 
column, and `>` indicates a right-aligned column. 

A character of `|` indicate a solid line between two
columns and `:` indicate a dashed lines between two columns.

</FunctionDefinition>



## Matrix Properties


<nav className="hidden">
### Shape
</nav>
<FunctionDefinition name="Shape">

<Signature name="Shape">_matrix_</Signature>

Returns the shape of a matrix, a tuple of the lengths of the
matrix along each of its axis.

A list (or vector) has a single axis. A matrix has two axes. A tensor has more
than two axes.

For a scalar, `Shape` returns an empty tuple.

```json example
["Shape", 5]
// ➔ ["Tuple"]

["Shape", ["List", 5, 2, 10, 18]]
// ➔ ["Tuple", 4]

["Shape", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["Tuple", 2, 4]
```

**Note:** The shape of a matrix is also sometimes called "dimensions".
However, this terminology is ambiguous because the word "dimension" is also
used to refer to the length of a matrix along a specific axis.

</FunctionDefinition>

<nav className="hidden">
### Rank
</nav>
<FunctionDefinition name="Rank">

<Signature name="Rank">_matrix_</Signature>

Returns the number of axes of a matrix.

A scalar (a number, for example) has **rank 0**.

A vector or list has **rank 1**.

A matrix has **rank 2**, a tensor has **rank 3**, etc.

The rank is the length of the shape of the tensor.

```json example
["Rank", 5]
// ➔ 0

["Rank", ["List", 5, 2, 10, 18]]
// ➔ 1

["Rank", ["List", ["List", 5, 2, 10], ["List", 1, 2, 3]]]
// ➔ 2
```

</FunctionDefinition>


## Accessing the content of Tensors

<nav className="hidden">
### At
</nav>
<FunctionDefinition name="At">

<Signature name="At">_matrix_, _index-1_, _index-2_, ...</Signature>

Returns the element of the matrix at the specified indexes.

_index-1_, ... is a sequence of integers, one for each axis of the matrix.

Indexes start at 1. Negative indexes count elements from the end. A negative 
index is equivalent to adding the length of the axis to the index. So `-1` is
the last element of the axis, `-2` is the second to last element, etc.

```json example
["At", ["List", 5, 2, 10, 18], 3]
// ➔ 10

["At", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]], 2, 3]
// ➔ 3

["At", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]], 2, -1]
// ➔ 3
```


In a list (or vector), there is only one axis, so there is only one index.

In a matrix, the first index is the row, the second is the column.

In LaTeX, accessing the element of a matrix is done with a subscript or
square brackets following a matrix.

<Latex value="\mathbf{A}_{2,3}"/>

<Latex value="\mathbf{A}\lbrack2,3\rbrack"/>

</FunctionDefinition>






## Transforming Matrixes

<nav className="hidden">
### Flatten
</nav>
<FunctionDefinition name="Flatten">

<Signature name="Flatten">_matrix_</Signature>

Returns a list of all the elements of the matrix, recursively, in row-major
order.

This function can also be applied to any collection.

Only elements with the same head as the collection are flattened.
Matrixes have a head of `List`, so only other `List` elements
are flattened.


```json example
["Flatten", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

`Flatten` is similar to the APL `,` Ravel operator or `numpy.ravel`
[Numpy](https://numpy.org/doc/stable/reference/generated/numpy.ravel.html).

</FunctionDefinition>

<nav className="hidden">
### Reshape
</nav>
<FunctionDefinition name="Reshape">

<Signature name="Reshape">_matrix_, _shape_</Signature>

Returns a matrix with the specified shape.

_matrix_ can be a list, a matrix, a tensor or a collection.

_shape_ is a tuple of integers, one for each axis of the result matrix.

`Reshape` can be used to convert a list or collection into a matrix.

```json example
["Reshape", ["Range", 9], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]
```

This is similar to the APL `⍴` Reshape operator or `numpy.reshape`
[Numpy](https://numpy.org/doc/stable/reference/generated/numpy.reshape.html).

The result may have fewer or more elements than the original tensor.

When reshaping, the elements are taken from the original tensor in row-major
order, that is the order of elements as returned by `Flatten`.

If the result has fewer elements, the elements are dropped from the end of the
element list. If the result has more elements, the lists of elements
is filled cyclically. 

This is the same behavior as APL, but other environment may behave differently.
For example, by default Mathematica `ArrayReshape` will fill the missing elements
with zeros.


</FunctionDefinition>

<nav className="hidden">
### Transpose
</nav>
<FunctionDefinition name="Transpose">

<Signature name="Transpose">_matrix_</Signature>

Returns the transpose of the matrix.

<Latex value="\mathbf{A}^T"/>

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

<Signature name="Transpose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the tensor. Note that axis
indexes start at 1.

</FunctionDefinition>


<nav className="hidden">
### ConjugateTranspose
</nav>
<FunctionDefinition name="ConjugateTranspose">

<Signature name="ConjugateTranspose">_matrix_</Signature>

<Latex value="A^\star"/>

Returns the [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose) of the matrix, that is
the transpose of the matrix with all its (complex) elements conjugated. 
Also known as the Hermitian transpose.

```json example
["ConjugateTranspose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

<Signature name="ConjugateTranspose">_matrix_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the _matrix_. Note that axis
indexes start at 1. In addition, all the (complex) elements
of the tensor are conjugated.


</FunctionDefinition>

<nav className="hidden">
### Inverse
</nav>
<FunctionDefinition name="Inverse">

<Signature name="Inverse">_matrix_</Signature>

Returns the inverse of the matrix.

<Latex value="\mathbf{A}^{-1}"/>

```json example
["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

</FunctionDefinition>

<nav className="hidden">
### PseudoInverse
</nav>
<FunctionDefinition name="PseudoInverse">

<Signature name="PseudoInverse">_matrix_</Signature>

<Latex value="\mathbf{A}^+"/>

Returns the [Moore-Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse) of the matrix.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

</FunctionDefinition>
  
<nav className="hidden">
### Diagonal
</nav>
<FunctionDefinition name="Diagonal">

<Signature name="Diagonal">_matrix_</Signature>

Returns the diagonal of the matrix, that is the list of all the elements
on the diagonal of the matrix.

```json example
["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]
```

</FunctionDefinition>

## Calculating with Matrixes


<nav className="hidden">
### Determinant
</nav>
<FunctionDefinition name="Determinant">

<Signature name="Determinant">_matrix_</Signature>

Returns the determinant of the matrix.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

</FunctionDefinition>



<nav className="hidden">
### AdjugateMatrix
</nav>
<FunctionDefinition name="AdjugateMatrix">

<Signature name="AdjugateMatrix">_matrix_</Signature>

<Latex value="\operatorname{adj}(\mathbf{A})"/>

Returns the [adjugate matrix](https://en.wikipedia.org/wiki/Adjugate_matrix) of
the input matrix, that is the inverse of the cofactor matrix.

The cofactor matrix is a matrix of the determinants of the minors of the matrix
multiplied by $$ (-1)^{i+j} $$. That is, for each element of the matrix, 
the cofactor is the determinant of the matrix without the row and column of 
the element.


```json example
["AdjugateMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 4, -2], ["List", -3, 1]]
```

</FunctionDefinition>


<nav className="hidden">
### Trace
</nav>
<FunctionDefinition name="Trace">

<Signature name="Trace">_matrix_</Signature>

<Latex value="\operatorname{tr}(\mathbf{A})"/>

Returns the [trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) of 
the matrix, the sum of the elements on the diagonal of the matrix. The trace 
is only defined for square matrices. The trace is also the sum of the 
eigenvalues of the matrix.

```json example
["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ 5
```

</FunctionDefinition>

