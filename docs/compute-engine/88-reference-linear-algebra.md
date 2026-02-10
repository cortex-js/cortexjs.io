---
title: Linear Algebra
slug: /compute-engine/reference/linear-algebra/
---

<Intro>
[Linear algebra](https://en.wikipedia.org/wiki/Linear_algebra) is the branch of 
mathematics that studies vector spaces and linear transformations between them 
like adding and scaling. It uses matrices to represent linear maps. 
Linear algebra is widely used in science and engineering. 
</Intro>

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

In the Compute Engine matrices are represented as lists of lists.

For example the matrix above is represented as the following list of lists:

```json example
["List", ["List", 1, 3], ["List", 5, 0]]
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
matrices are `List` collections, some **collection operations**
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

Matrices are represented as lists of lists.

Tensors (multi-dimensional matrices) are represented as nested lists.

:::info[Note]
Tensors are represented internally using an optimized format that is more
efficient than nested lists. Because of this, some operations on tensors
such as `Reshape` and `Transpose` can be done in O(1) time.
:::

## Basic Operations: Quick Start

This section shows common matrix and vector operations to get started quickly.

### Vector Addition

Vectors can be added element-wise using the `+` operator or the `Add` function.
In LaTeX, vectors can be written using parentheses `(1,2,3)` or square brackets `[1,2,3]`.

```typescript example
ce.parse('(1,2,3) + (3,5,6)').evaluate()
// ➔ [4,7,9]
```

```json example
["Add", ["List", 1, 2, 3], ["List", 3, 5, 6]]
// ➔ ["List", 4, 7, 9]
```

### Matrix Addition

Matrices are added element-wise. Both matrices must have the same dimensions.

```typescript example
const m1 = ce.box(['List', ['List', 1, 2], ['List', 3, 4]]);
const m2 = ce.box(['List', ['List', 5, 6], ['List', 7, 8]]);
m1.add(m2).evaluate()
// ➔ [[6,8],[10,12]]
```

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 6, 8], ["List", 10, 12]]
```

### Scalar Multiplication

A scalar can be multiplied with a vector or matrix. The scalar is broadcast
to all elements.

```typescript example
ce.parse('2(1,2,3)').evaluate()
// ➔ [2,4,6]
```

```json example
["Multiply", 2, ["List", 1, 2, 3]]
// ➔ ["List", 2, 4, 6]
```

### Element-wise vs Matrix Multiplication

**Important**: The `Multiply` function and `*` operator perform **element-wise**
(Hadamard) multiplication. For matrix multiplication, use the `MatrixMultiply` function.

**Element-wise multiplication** (each element multiplied independently):

```json example
["Multiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 5, 12], ["List", 21, 32]]
// Each position: [1×5, 2×6], [3×7, 4×8]
```

**Matrix multiplication** (linear algebraic product):

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 19, 22], ["List", 43, 50]]
// Matrix product: [[1×5+2×7, 1×6+2×8], [3×5+4×7, 3×6+4×8]]
```

```typescript example
const m1 = ce.box(['List', ['List', 1, 2], ['List', 3, 4]]);
const m2 = ce.box(['List', ['List', 5, 6], ['List', 7, 8]]);
ce.function('MatrixMultiply', [m1, m2]).evaluate()
// ➔ [[19,22],[43,50]]
```

### LaTeX Matrix Syntax

Matrices can be parsed from LaTeX using standard matrix environments:

```typescript example
ce.parse('\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}')
// Creates a 2×2 matrix
```

```typescript example
ce.parse('\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix} + \\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}')
// Matrix addition in LaTeX notation
```

`Vector` is a convenience function that interprets a list of elements as a
column vector.

`Matrix` is an optional "tag" inert function that is used to influence the visual
representation of a matrix. It has no impact on the value of the matrix.

In LaTeX notation, a matrix is represented with "environments" (with command
`\begin` and `\end`) such as `pmatrix` or `bmatrix`:

<Latex value="\begin{pmatrix} 1 & 3 \\ 5 & 0 \end{pmatrix}"/>

<Latex value="\begin{bmatrix} 1 & 3 \\ 5 & 0 \end{bmatrix}"/>

In LaTeX, each column is separated by an `&` and each row is separated by
`\`.


<nav className="hidden">
### Vector
</nav>
<FunctionDefinition name="Vector">

<Signature name="Vector">_x-1_, ..._x-n_</Signature>

`Vector` interprets the elements _x-1_... as a column vector

This is essentially a shortcut for `["Matrix", ["List", ["List", _x-1_], ["List", _x-2_], ...]]]`.

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

Some common combinations may be represented using some 
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

A character of `|` indicates a solid line between two
columns and `:` indicates a dashed line between two columns.

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






## Transforming Matrices

<nav className="hidden">
### Flatten
</nav>
<FunctionDefinition name="Flatten">

<Signature name="Flatten">_value_</Signature>

Returns a list of all the elements of the matrix, recursively, in row-major
order.

This function can also be applied to any collection.

Only elements with the same head as the collection are flattened.
Matrices have a head of `List`, so only other `List` elements
are flattened.

```json example
["Flatten", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]
```

**Scalar**: A scalar is wrapped in a single-element list.

```json example
["Flatten", 42]
// ➔ ["List", 42]
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
element list. If the result has more elements, the list of elements
is filled cyclically (APL-style ravel cycling).

```json example
// Reshape a 7-element vector to a 3x3 matrix (9 elements needed)
// Elements cycle: 7, -2, 11, -5, 13, -7, 17, 7, -2
["Reshape", ["List", 7, -2, 11, -5, 13, -7, 17], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 7, -2, 11], ["List", -5, 13, -7], ["List", 17, 7, -2]]
```

**Scalar input**: A scalar can be reshaped to any shape. The scalar value is
replicated to fill the entire result:

```json example
["Reshape", 42, ["Tuple", 2, 3]]
// ➔ ["List", ["List", 42, 42, 42], ["List", 42, 42, 42]]
```

**Empty shape**: Reshaping to an empty shape `["Tuple"]` returns the first
element as a scalar:

```json example
["Reshape", ["List", 5, 2, 10], ["Tuple"]]
// ➔ 5
```

This is the same behavior as APL, but other environments may behave differently.
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

<Signature name="Transpose">_tensor_</Signature>

For tensors with rank > 2, swaps the last two axes by default (batch transpose).
This is useful for transposing each matrix "slice" in a batch of matrices.

```json example
// 2×2×2 tensor (two 2×2 matrices)
["Transpose", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                       ["List", ["List", 5, 6], ["List", 7, 8]]]]
// ➔ [[[1,3],[2,4]],[[5,7],[6,8]]] (each matrix transposed)
```

<Signature name="Transpose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the tensor. Note that axis
indexes start at 1.

```json example
// Swap axes 1 and 2 of a rank-3 tensor
["Transpose", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                       ["List", ["List", 5, 6], ["List", 7, 8]]], 1, 2]
// Rearranges the tensor by swapping the first two axes
```

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

<Signature name="ConjugateTranspose">_tensor_</Signature>

For tensors with rank > 2, swaps the last two axes by default (batch conjugate transpose)
and conjugates all elements. This is useful for computing the Hermitian adjoint of each
matrix "slice" in a batch.

For vectors (rank 1), returns the element-wise conjugate without transposition.

<Signature name="ConjugateTranspose">_tensor_, _axis-1_, _axis-2_</Signature>

Swap the two specified axes of the _tensor_. Note that axis
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

The matrix must be square and non-singular (determinant ≠ 0). For vectors
or tensors (rank > 2), an `expected-square-matrix` error is returned.

```json example
["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", 1.5, -0.5]]
```

**Scalar**: The inverse of a scalar is its reciprocal (1/scalar).

```json example
["Inverse", 4]
// ➔ 0.25
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

<Signature name="Diagonal">_value_</Signature>

`Diagonal` has bidirectional behavior depending on the input:

**Vector → Matrix**: When given a vector, creates a square diagonal matrix with
the vector elements along the diagonal and zeros elsewhere.

```json example
["Diagonal", ["List", 1, 2, 3]]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 2, 0], ["List", 0, 0, 3]]
```

**Matrix → Vector**: When given a matrix, extracts the diagonal elements as a
vector. For non-square matrices, extracts min(rows, cols) diagonal elements.

```json example
["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]

["Diagonal", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", 1, 5]
```

**Scalar**: Returns the scalar unchanged (can be thought of as a 1×1 matrix).

```json example
["Diagonal", 5]
// ➔ 5
```

**Tensor (rank > 2)**: Returns an error. `Diagonal` is only defined for
vectors and 2D matrices.

</FunctionDefinition>

<nav className="hidden">
### IdentityMatrix
</nav>
<FunctionDefinition name="IdentityMatrix">

<Signature name="IdentityMatrix">_n_</Signature>

Creates an n×n [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix),
a square matrix with ones on the main diagonal and zeros elsewhere.

```json example
["IdentityMatrix", 3]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 1, 0], ["List", 0, 0, 1]]

["IdentityMatrix", 2]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

The argument _n_ must be a positive integer. If not, an `expected-positive-integer`
error is returned.

</FunctionDefinition>

<nav className="hidden">
### ZeroMatrix
</nav>
<FunctionDefinition name="ZeroMatrix">

<Signature name="ZeroMatrix">_m_, _n?_</Signature>

Creates an m×n matrix filled with zeros. If _n_ is omitted, creates a square
m×m matrix.

```json example
["ZeroMatrix", 3]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0], ["List", 0, 0, 0]]

["ZeroMatrix", 2, 4]
// ➔ ["List", ["List", 0, 0, 0, 0], ["List", 0, 0, 0, 0]]
```

Both _m_ and _n_ must be positive integers.

</FunctionDefinition>

<nav className="hidden">
### OnesMatrix
</nav>
<FunctionDefinition name="OnesMatrix">

<Signature name="OnesMatrix">_m_, _n?_</Signature>

Creates an m×n matrix filled with ones. If _n_ is omitted, creates a square
m×m matrix.

```json example
["OnesMatrix", 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1], ["List", 1, 1, 1]]

["OnesMatrix", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

Both _m_ and _n_ must be positive integers.

</FunctionDefinition>

## Calculating with Matrices


<nav className="hidden">
### Determinant
</nav>
<FunctionDefinition name="Determinant">

<Signature name="Determinant">_matrix_</Signature>

Returns the determinant of the matrix.

The matrix must be square (same number of rows and columns). For vectors
or tensors (rank > 2), an `expected-square-matrix` error is returned.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

**Scalar**: The determinant of a scalar (thought of as a 1×1 matrix) is the
scalar itself.

```json example
["Determinant", 5]
// ➔ 5
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

**Scalar**: The trace of a scalar (thought of as a 1×1 matrix) is the
scalar itself.

**Vector**: For vectors (rank 1), an `expected-matrix-or-tensor` error is returned.

<Signature name="Trace">_tensor_</Signature>

For tensors with rank > 2 (batch trace), returns a tensor of traces computed over
the last two axes. The last two axes must have the same size (square slices).

```json example
// 2×2×2 tensor (two 2×2 matrices)
["Trace", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                   ["List", ["List", 5, 6], ["List", 7, 8]]]]
// ➔ [5, 13] (trace of first matrix: 1+4=5, trace of second: 5+8=13)
```

<Signature name="Trace">_tensor_, _axis-1_, _axis-2_</Signature>

Compute the trace over the specified axes. Both axes must have the same size.
Note that axis indexes start at 1.

```json example
// Trace over axes 1 and 2 instead of last two axes
["Trace", ["List", ["List", ["List", 1, 2], ["List", 3, 4]],
                   ["List", ["List", 5, 6], ["List", 7, 8]]], 1, 2]
// Returns a vector with traces computed over the first two axes
```

```json example
["Trace", 5]
// ➔ 5
```

</FunctionDefinition>

<nav className="hidden">
### Kernel
</nav>
<FunctionDefinition name="Kernel">

<Signature name="Kernel">_map_</Signature>

<Latex value="\ker \mathbf{A}"/>

Returns a basis for the [kernel (null space)](https://en.wikipedia.org/wiki/Kernel_(linear_algebra))
of a linear map.

For numeric real vectors and matrices, `Kernel` returns a list of basis vectors.
Each basis vector is represented as a `List`.

```json example
["Kernel", ["List", ["List", 1, 0], ["List", 0, 0]]]
// ➔ ["List", ["List", 0, 1]]
```

If the kernel is trivial, the result is an empty list:

```json example
["Kernel", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List"]
```

Vectors are interpreted as 1×n linear maps:

```json example
["Kernel", ["List", 1, 0, 0]]
// ➔ ["List", ["List", 0, 1, 0], ["List", 0, 0, 1]]
```

Scalars are treated as 1×1 maps:

```json example
["Kernel", 0]
// ➔ ["List", ["List", 1]]

["Kernel", 5]
// ➔ ["List"]
```

**Edge cases**
- Rank > 2 tensors return `Error("expected-matrix", ...)`.
- Non-numeric/symbolic inputs, or complex entries with non-zero imaginary part,
  remain unevaluated.

</FunctionDefinition>

<nav className="hidden">
### Dimension
</nav>
<FunctionDefinition name="Dimension">

<Signature name="Dimension">_value_</Signature>

<Latex value="\dim V"/>

Returns the finite dimension of an object when it can be inferred.

For concrete tensors/collections, `Dimension` returns the product of axis sizes
(or the element count for finite indexed collections).

```json example
["Dimension", 5]
// ➔ 1

["Dimension", ["List", 1, 2, 3]]
// ➔ 3

["Dimension", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ 6
```

For hom-sets with inferable finite dimensions:

```json example
["Dimension", ["Hom", ["List", 1, 2], ["List", 3, 4, 5]]]
// ➔ 6
```

**Note:** This is not matrix rank (number of linearly independent rows/columns).
Use `Rank` for tensor rank (number of axes), and other specialized tools for
row/column rank.

If the dimension cannot be inferred, the expression remains unevaluated.

</FunctionDefinition>

<nav className="hidden">
### Degree
</nav>
<FunctionDefinition name="Degree">

<Signature name="Degree">_expr_</Signature>

<Latex value="\deg p"/>

Returns the polynomial degree (total degree) of polynomial-form expressions.

```json example
["Degree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1]]
// ➔ 3
```

Constants have degree 0:

```json example
["Degree", 42]
// ➔ 0
```

**Edge cases**
- Bare symbols are ambiguous and remain symbolic:

```json example
["Degree", "p"]
// ➔ ["Degree", "p"]
```

- Non-polynomial expressions remain unevaluated:

```json example
["Degree", ["Sin", "x"]]
// ➔ ["Degree", ["Sin", "x"]]
```

</FunctionDefinition>

<nav className="hidden">
### Hom
</nav>
<FunctionDefinition name="Hom">

<Signature name="Hom">_domain_, _codomain_</Signature>

<Latex value="\hom(V, W)"/>

Represents the hom-set of morphisms from _domain_ to _codomain_.

`Hom` is symbolic: it preserves the `Hom(...)` form, but evaluates/simplifies
its arguments.

```json example
["Hom", ["Add", 1, 2], ["Multiply", 2, 3]]
// ➔ ["Hom", 3, 6]
```

`Hom` is commonly used with `Dimension`:

```json example
["Dimension", ["Hom", ["List", 1, 2], ["List", 3, 4, 5]]]
// ➔ 6
```

</FunctionDefinition>

<nav className="hidden">
### MatrixMultiply
</nav>
<FunctionDefinition name="MatrixMultiply">

<Signature name="MatrixMultiply">_A_, _B_</Signature>

<Latex value="\mathbf{A} \cdot \mathbf{B}"/>

Returns the [matrix product](https://en.wikipedia.org/wiki/Matrix_multiplication)
of two matrices, vectors, or a combination thereof.

:::info[Element-wise vs Matrix Multiplication]
**Important**: Use `MatrixMultiply` for linear algebraic matrix multiplication.
The `Multiply` function performs element-wise (Hadamard) multiplication where
corresponding elements are multiplied: `[1,2,3] * [4,5,6]` → `[4,10,18]`.

For matrix multiplication where the result is computed using row-column dot products,
always use `MatrixMultiply`. See the [Quick Start](#basic-operations-quick-start)
section for examples.
:::

**Matrix × Matrix**: If _A_ is an m×n matrix and _B_ is an n×p matrix, the result
is an m×p matrix where each element (i,j) is the dot product of row i of _A_
and column j of _B_.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 19, 22], ["List", 43, 50]]
```

**Matrix × Vector**: If _A_ is an m×n matrix and _B_ is an n-element vector
(treated as a column vector), the result is an m-element vector.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", 1, 2, 3]]
// ➔ ["List", 14, 32]
```

**Vector × Matrix**: If _A_ is an m-element vector (treated as a row vector)
and _B_ is an m×n matrix, the result is an n-element vector.

```json example
["MatrixMultiply",
  ["List", 1, 2],
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", 9, 12, 15]
```

**Vector × Vector (Dot Product)**: If both _A_ and _B_ are vectors of the same
length, the result is their dot product (a scalar).

```json example
["MatrixMultiply",
  ["List", 1, 2, 3],
  ["List", 4, 5, 6]]
// ➔ 32
```

**Dimension Validation**: The inner dimensions must match. For matrix × matrix,
the number of columns in _A_ must equal the number of rows in _B_. If dimensions
are incompatible, an `incompatible-dimensions` error is returned.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", 1, 2, 3]]
// ➔ Error("incompatible-dimensions", "2 vs 3")
```

**Symbolic Operations**: `MatrixMultiply` works with symbolic matrices:

```json example
["MatrixMultiply",
  ["List", ["List", "a", "b"], ["List", "c", "d"]],
  ["List", ["List", "e", "f"], ["List", "g", "h"]]]
// ➔ ["List", ["List", ["Add", ["Multiply", "a", "e"], ["Multiply", "b", "g"]], ...], ...]
```

</FunctionDefinition>

<nav className="hidden">
### Matrix Addition (Add)
</nav>
<FunctionDefinition name="Add">

<Signature name="Add">_A_, _B_, ...</Signature>

The `Add` function supports element-wise addition of matrices and vectors,
as well as scalar broadcasting.

**Matrix + Matrix**: If all matrix operands have the same shape, elements are
added position by position.

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 6, 8], ["List", 10, 12]]
```

**Scalar + Matrix**: A scalar is broadcast to all elements of the matrix.

```json example
["Add", 10, ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 11, 12], ["List", 13, 14]]
```

**Vector + Vector**: Vectors of the same length are added element-wise.

```json example
["Add", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", 5, 7, 9]
```

**Scalar + Vector**: A scalar is broadcast to all elements of the vector.

```json example
["Add", ["List", 7, 11], 3]
// ➔ ["List", 10, 14]
```

**Multiple Operands**: Multiple matrices and scalars can be combined in a
single `Add` operation.

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  10,
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 16, 18], ["List", 20, 22]]
```

**Symbolic Operations**: `Add` works with symbolic matrices:

```json example
["Add",
  ["List", ["List", "a", "b"], ["List", "c", "d"]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", ["Add", "a", 1], ["Add", "b", 2]], ["List", ["Add", "c", 3], ["Add", "d", 4]]]
```

**Dimension Validation**: All matrices must have the same shape. If shapes
are incompatible, an `incompatible-dimensions` error is returned.

```json example
["Add",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ Error("incompatible-dimensions", "2x2 vs 2x3")
```

</FunctionDefinition>

<nav className="hidden">
### Norm
</nav>
<FunctionDefinition name="Norm">

<Signature name="Norm">_value_</Signature>

<Signature name="Norm">_value_, _p_</Signature>

<Latex value="\| \mathbf{v} \|"/>

Returns the [norm](https://en.wikipedia.org/wiki/Norm_(mathematics)) of a vector
or matrix.

**Scalar**: The norm of a scalar is its absolute value.

```json example
["Norm", -5]
// ➔ 5
```

**Vector Norms**:

The default is the L2 (Euclidean) norm: sqrt(sum of |xi|^2)

```json example
["Norm", ["List", 3, 4]]
// ➔ 5
```

The second argument specifies the norm type:

- **L1 norm** (_p_ = 1): Sum of absolute values: sum of |xi|

```json example
["Norm", ["List", 3, -4], 1]
// ➔ 7
```

- **L2 norm** (_p_ = 2, default): Euclidean norm: sqrt(sum of |xi|^2)

```json example
["Norm", ["List", 3, 4], 2]
// ➔ 5
```

- **L-infinity norm** (_p_ = `"Infinity"`): Maximum absolute value: max(|xi|)

```json example
["Norm", ["List", 3, -4], "Infinity"]
// ➔ 4
```

- **General Lp norm**: (sum of |xi|^p)^(1/p)

```json example
["Norm", ["List", 3, 4], 3]
// ➔ 4.498 (the cube root of 91)
```

**Matrix Norms**:

For matrices, the default is the Frobenius norm: sqrt(sum of |aij|^2)

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ sqrt(30) ≈ 5.477
```

- **Frobenius norm** (_p_ = 2 or `"Frobenius"`): Square root of sum of squared elements

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], "Frobenius"]
// ➔ sqrt(30) ≈ 5.477
```

- **L1 norm** (_p_ = 1): Maximum column sum of absolute values

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], 1]
// ➔ 6 (max of column sums: 4 and 6)
```

- **L-infinity norm** (_p_ = `"Infinity"`): Maximum row sum of absolute values

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], "Infinity"]
// ➔ 7 (max of row sums: 3 and 7)
```

</FunctionDefinition>


## Eigenvalues and Eigenvectors

<nav className="hidden">
### Eigenvalues
</nav>
<FunctionDefinition name="Eigenvalues">

<Signature name="Eigenvalues">_matrix_</Signature>

Returns the [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalue) of a square matrix as a list.

Eigenvalues are the scalars λ such that Av = λv for some non-zero vector v (the eigenvector).

The matrix must be square. For non-square matrices, an `expected-square-matrix` error is returned.

```json example
["Eigenvalues", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", 2, 3]

["Eigenvalues", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", 5, 2]  (roots of characteristic polynomial)
```

**Computation Methods**:
- **1×1 matrices**: Returns the single element
- **Diagonal/triangular matrices**: Returns the diagonal elements (fast path)
- **2×2 matrices**: Uses the quadratic formula on the characteristic polynomial
- **3×3 matrices**: Uses Cardano's formula for the cubic characteristic polynomial
- **Larger matrices**: Uses the QR algorithm for numerical computation

**Symbolic matrices**: For symbolic matrices, the eigenvalue computation may be returned unevaluated if closed-form solutions cannot be determined.

```json example
["Eigenvalues", ["List", ["List", "a", 0], ["List", 0, "b"]]]
// ➔ ["List", "a", "b"]  (diagonal matrix)
```

</FunctionDefinition>

<nav className="hidden">
### Eigenvectors
</nav>
<FunctionDefinition name="Eigenvectors">

<Signature name="Eigenvectors">_matrix_</Signature>

Returns the [eigenvectors](https://en.wikipedia.org/wiki/Eigenvector) of a square matrix as a list of vectors.

An eigenvector v is a non-zero vector such that Av = λv for some eigenvalue λ.

The eigenvectors are returned in the same order as the eigenvalues from `Eigenvalues`.
Each eigenvector is normalized.

```json example
["Eigenvectors", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]

["Eigenvectors", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", ["List", 0.894, 0.447], ["List", -0.707, 0.707]]
```

**Computation**: For each eigenvalue λ, the eigenvector is found by solving the null space of (A - λI), where I is the identity matrix.

**Numerical precision**: For matrices with repeated or nearly-repeated eigenvalues, eigenvector computation may be less numerically stable.

</FunctionDefinition>

<nav className="hidden">
### Eigen
</nav>
<FunctionDefinition name="Eigen">

<Signature name="Eigen">_matrix_</Signature>

Returns both the eigenvalues and eigenvectors of a square matrix as a dictionary with keys `Eigenvalues` and `Eigenvectors`.

This is more efficient than calling `Eigenvalues` and `Eigenvectors` separately when both are needed.

```json example
["Eigen", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["Dictionary",
//     ["KeyValuePair", "Eigenvalues", ["List", 2, 3]],
//     ["KeyValuePair", "Eigenvectors", ["List", ["List", 1, 0], ["List", 0, 1]]]]
```

**Usage**: Access the components using dictionary operations:

```json example
["At", ["Eigen", matrix], "Eigenvalues"]
// Returns just the eigenvalues

["At", ["Eigen", matrix], "Eigenvectors"]
// Returns just the eigenvectors
```

</FunctionDefinition>


## Matrix Decompositions

Matrix decompositions factor a matrix into products of simpler matrices. These are
fundamental operations in numerical linear algebra, used for solving linear systems,
computing inverses, and many other applications.

### LUDecomposition

<FunctionDefinition name="LUDecomposition">

<Signature name="LUDecomposition">_matrix_</Signature>

Compute the **LU decomposition** of a square matrix with partial pivoting.

Returns a tuple `[P, L, U]` where:
- **P** is a permutation matrix
- **L** is a lower triangular matrix with 1s on the diagonal
- **U** is an upper triangular matrix

The decomposition satisfies: **PA = LU**

```json example
["LUDecomposition", ["List", ["List", 4, 3], ["List", 6, 3]]]
// ➔ ["Tuple", P, L, U] where PA = LU
```

```json example
["LUDecomposition", ["List", ["List", 2, 1, 1], ["List", 4, 3, 3], ["List", 8, 7, 9]]]
// ➔ ["Tuple", P, L, U] for 3×3 matrix
```

**Applications:**
- Solving linear systems: Solve Ax = b by solving Ly = Pb, then Ux = y
- Computing determinant: det(A) = det(U) = product of diagonal elements (with sign from P)
- Computing matrix inverse

**Note:** Returns an error for non-square matrices.

</FunctionDefinition>


### QRDecomposition

<FunctionDefinition name="QRDecomposition">

<Signature name="QRDecomposition">_matrix_</Signature>

Compute the **QR decomposition** of a matrix using Householder reflections.

Returns a tuple `[Q, R]` where:
- **Q** is an orthogonal matrix (Q^T Q = I)
- **R** is an upper triangular matrix

The decomposition satisfies: **A = QR**

Works with both square and rectangular (m×n) matrices.

```json example
["QRDecomposition", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["Tuple", Q, R] where A = QR
```

```json example
["QRDecomposition", ["List", ["List", 12, -51, 4], ["List", 6, 167, -68], ["List", -4, 24, -41]]]
// ➔ ["Tuple", Q, R] for 3×3 matrix
```

For a rectangular m×n matrix:
```json example
["QRDecomposition", ["List", ["List", 1, 2], ["List", 3, 4], ["List", 5, 6]]]
// ➔ Q is 3×3, R is 3×2
```

**Applications:**
- Solving least squares problems
- Computing eigenvalues (QR algorithm)
- Orthogonalization of vectors

</FunctionDefinition>


### CholeskyDecomposition

<FunctionDefinition name="CholeskyDecomposition">

<Signature name="CholeskyDecomposition">_matrix_</Signature>

Compute the **Cholesky decomposition** of a symmetric positive definite matrix.

Returns a lower triangular matrix **L** such that: **A = LL^T**

```json example
["CholeskyDecomposition", ["List", ["List", 4, 2], ["List", 2, 2]]]
// ➔ ["List", ["List", 2, 0], ["List", 1, 1]]
// Verify: L * L^T = [[4,2],[2,2]] ✓
```

```json example
["CholeskyDecomposition", ["List", ["List", 1, 0], ["List", 0, 1]]]
// ➔ Identity matrix (Cholesky of identity is identity)
```

**Requirements:** The input matrix must be:
- Square
- Symmetric (A = A^T)
- Positive definite (all eigenvalues > 0)

Returns error `'expected-positive-definite-matrix'` if the matrix is not positive definite.

```json example
["CholeskyDecomposition", ["List", ["List", 1, 2], ["List", 2, 1]]]
// ➔ Error: not positive definite (determinant = -3 < 0)
```

**Applications:**
- Efficient solving of symmetric positive definite systems
- Monte Carlo simulations (generating correlated random variables)
- Kalman filters

</FunctionDefinition>


### SVD (Singular Value Decomposition)

<FunctionDefinition name="SVD">

<Signature name="SVD">_matrix_</Signature>

Compute the **Singular Value Decomposition** of a matrix.

Returns a tuple `[U, Σ, V]` where:
- **U** is an orthogonal matrix (left singular vectors)
- **Σ** (Sigma) is a diagonal matrix with non-negative singular values
- **V** is an orthogonal matrix (right singular vectors)

The decomposition satisfies: **A = UΣV^T**

Works with both square and rectangular (m×n) matrices.

```json example
["SVD", ["List", ["List", 4, 0], ["List", 3, -5]]]
// ➔ ["Tuple", U, Σ, V]
// Σ contains the singular values on the diagonal
```

For a diagonal matrix, singular values equal the absolute values of diagonal elements:
```json example
["SVD", ["List", ["List", 1, 0, 0], ["List", 0, 2, 0], ["List", 0, 0, 3]]]
// ➔ Singular values are [3, 2, 1] (or permutation thereof)
```

For a rectangular m×n matrix with m > n:
```json example
["SVD", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ U is 2×2, Σ is 2×3, V is 3×3
```

**Applications:**
- Computing the pseudoinverse (Moore-Penrose inverse)
- Dimensionality reduction (PCA)
- Data compression
- Computing matrix rank (count of non-zero singular values)
- Solving ill-conditioned linear systems

**Properties:**
- Singular values are always non-negative
- The rank of the matrix equals the number of non-zero singular values
- The 2-norm of a matrix equals its largest singular value

</FunctionDefinition>
