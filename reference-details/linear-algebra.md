<!-- The detail of the entries of /reference/linear-algebra/. Format: README.md. -->

## Fill

The value is evaluated once, so `fill(random(), 3)` holds three copies of one
number. A function value is an element and is not called; to compute each
element from its indexes, use [`tabulate`](/reference/collections/#tabulate).

```epsil
fill(x => x, 2)
// ➔ [(x) => x,(x) => x]
```

An extent of 0 or less gives an empty axis, and a symbolic extent leaves the
expression unevaluated:

```epsil
fill(7, 2, 0)
// ➔ [[],[]]
fill(7, n)
// ➔ Fill(7, n)
```

A tensor with more than 10,000 elements is a lazy collection: its elements are
not created before they are read.

```epsil
fill(0, 200, 200)
// ➔ Repeat(Repeat(0, 200), 200)
```

[`zeros`](/reference/linear-algebra/#zeros) and
[`ones`](/reference/linear-algebra/#ones) are `fill` with the value 0 or 1.

Up to version 0.184.0, `fill(f, (m, n))` built an `m × n` matrix of
`f(i, j)`. That form is now an error: write `tabulate(f, m, n)`.

```epsil
fill((i, j) => i + j, (2, 3))
// ➔ error: Type error: expected `integer`, got `tuple<integer, integer>` at `(2, 3)` in `fill(Function(i + j, i, j), (2, 3))`
```

### MathJSON

`["Fill", value, d1, d2, ...]`.

```json example
["Fill", 7, 3]
// ➔ ["List", 7, 7, 7]

["Fill", 7, 2, 3]
// ➔ ["List", ["List", 7, 7, 7], ["List", 7, 7, 7]]
```

## Section: Tensors

A tensor with more than two axes is a list nested more deeply than a matrix.
A grayscale image, for example, is a matrix of gray values, and a color image
is a tensor of rank 3: a matrix of `[r, g, b]` triplets.

```epsil
let image = [[[255, 0, 0], [0, 255, 0]], [[0, 0, 255], [9, 9, 9]]]
[shape(image), rank(image), image[2, 1, 3]]
// ➔ [(2, 2, 3),3,255]
```

Some functions of this library apply to a tensor of any rank: `shape`,
`rank`, `dimension`, `flatten`, `reshape`, `zeros`, `ones` and `fill`.
`transpose`, `conjugateTranspose` and `trace` apply to the last two axes of a
tensor, that is to each matrix of a batch of matrices, or to two axes that you
name. The others, such as `determinant`, `inverse` or `eigenvalues`, need a
matrix:

```epsil
trace([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
// ➔ [5,13]
determinant([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
// ➔ error: Type error: expected `matrix`, got `tensor<integer^(2x2x2)>` at `[[[1, 2], [3, 4]], [[5, 6], [7, 8]]]` in `determinant([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])`
```

The engine stores a tensor in a format that is more compact than nested
lists, so some operations, such as `reshape` and `transpose`, do not copy
the elements.

## Section: Matrix decompositions

A decomposition factors a matrix into a product of simpler matrices. It is
used to solve linear systems, to compute inverses and determinants, and to
find least-squares solutions.

| Function | Result | Identity | Matrix |
| :-- | :-- | :-- | :-- |
| `luDecomposition` | `(P, L, U)` | `P·A = L·U` | square |
| `qrDecomposition` | `(Q, R)` | `A = Q·R` | any shape |
| `choleskyDecomposition` | `L` | `A = L·Lᵀ` | symmetric positive definite |
| `svd` | `(U, S, V)` | `A = U·S·Vᵀ` | any shape |

A decomposition that gives several factors returns a tuple: destructure it
with `let`. Multiply the factors to check the identity:

```epsil
let A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]
let (P, L, U) = luDecomposition(A)
P * A == L * U
// ➔ true
```

## Vector

A plain list such as `[1, 3, 5, 0]` is a row of values, with one axis.
`vector` makes a matrix with one column, with two axes:

```epsil
[shape([1, 3, 5, 0]), shape(vector(1, 3, 5, 0))]
// ➔ [(4),(4, 1)]
```

A matrix times a column vector is a column vector, and a matrix times a
list is a list:

```epsil
[[1, 2], [3, 4]] * vector(1, 1)
// ➔ [[3],[7]]
[[1, 2], [3, 4]] * [1, 1]
// ➔ [3,7]
```

A tuple of numbers, such as a point `(1, 2, 3)`, is also a vector for the
arithmetic operators, `dot` and `cross`. The result of an operation on tuples
is a tuple:

```epsil
(1, 2, 3) + (3, 5, 6)
// ➔ (4, 7, 9)
2 * (1, 2, 3)
// ➔ (2, 4, 6)
cross((1, 0, 0), (0, 1, 0))
// ➔ (0, 0, 1)
```

### MathJSON

`["Vector", x1, x2, ...]` is a shortcut for
`["Matrix", ["List", ["List", x1], ["List", x2], ...]]`.

```json example
["Vector", 1, 3, 5, 0]
// ➔ ["List", ["List", 1], ["List", 3], ["List", 5], ["List", 0]]
```

In LaTeX, a column vector is a matrix environment with one element per row,
`\begin{pmatrix} 1 \\ 3 \\ 5 \\ 0 \end{pmatrix}`. A row vector is a `List`
or a `Tuple`, written `[1, 3, 5, 0]`, `(1, 3, 5, 0)` or
`\begin{bmatrix} 1 & 3 & 5 & 0 \end{bmatrix}`.

## Matrix

The value of `matrix(m)` is the value of `m`. The second and third arguments,
the delimiters and the format of the columns, are strings that only change
how the matrix is written in LaTeX: the MathJSON part below lists their
characters. Every operation of the library treats the matrix as the plain
list of rows.

```epsil
determinant(matrix([[1, 2], [3, 4]], "||"))
// ➔ -2
matrix([[1, 2], [3, 4]], "[]") + 1
// ➔ [[2,3],[4,5]]
```

### MathJSON

`["Matrix", matrix]`, `["Matrix", matrix, delimiters]`,
`["Matrix", matrix, delimiters, columns]`. _matrix_ is a `List` of rows, each
row a `List` of elements.

_delimiters_ is a string of two characters: the opening delimiter and the
closing delimiter. Each is one of `(`, `)`, `[`, `]`, `{`, `}`, `<`, `>`,
`⟦` (U+27E6), `⟧` (U+27E7), `|`, `‖` (U+2016), `\`, `⌈` (U+2308), `⌉`
(U+2309), `⌊` (U+230A), `⌋` (U+230B), `⌜` (U+231C), `⌝` (U+231D), `⌞`
(U+231E), `⌟` (U+231F), `⎰` (U+23B0), `⎱` (U+23B1), or `.` for no delimiter.

Some pairs of delimiters are written with a LaTeX environment:

- `()`: `pmatrix`, $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ (the default)
- `[]`: `bmatrix`, $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$
- `{}`: `Bmatrix`, $\begin{Bmatrix} a & b \\ c & d \end{Bmatrix}$
- `||`: `vmatrix`, $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$
- `‖‖`: `Vmatrix`, $\begin{Vmatrix} a & b \\ c & d \end{Vmatrix}$

Other delimiters are written as `\left` and `\right` around an `array`
environment.

_columns_ is a string with one character per column: `<` for a column aligned
on the left, `=` for a centered column, `>` for a column aligned on the right.
Between two of them, `|` is a solid line and `:` a dashed line. With the
columns `"<|>"`, the matrix is written `\begin{pmatrix}[l|r] ... \end{pmatrix}`.

```json example
["Matrix",
  ["List", ["List", 1, 3], ["List", 5, 0]],
  "'[]'"]
```

In LaTeX, the elements of a row are separated by `&` and the rows by `\\`.
The environments `pmatrix`, `bmatrix`, `Bmatrix` and `array` are parsed as a
matrix. `vmatrix` is parsed as the determinant of the matrix, and `Vmatrix`
as its norm: `\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix}` evaluates to
`-2`. `dcases` and `rcases` are parsed as a definition by cases, not as a
matrix.

## Shape

An empty list keeps its axis: its shape is `(0)`, and a list of two empty
lists has the shape `(2, 0)`. A zero axis is never dropped. A finite range
has the shape of the list of its elements.

```epsil
[shape(5), shape([5, 2, 10, 18]), shape([[5, 2], [10, 18]])]
// ➔ [(),(4),(2, 2)]
[shape([]), shape([[], []]), shape(1..3)]
// ➔ [(0),(2, 0),(3)]
```

A set, a dictionary, an infinite collection, or a symbol with no value has
no shape, and `shape` stays unevaluated. A list whose rows have different
lengths is not a tensor: its shape is the empty shape of a scalar.

```epsil
[shape({1, 2}), shape(1..oo), shape(xs)]
// ➔ [Shape(Set(1, 2)),Shape(Range(1, +oo)),Shape(xs)]
shape([[5, 2, 10, 18], [1, 2, 3]])
// ➔ ()
```

The elements need not be numbers. A regular nested list of other values,
including calls of an unknown function, has the shape of its nesting:

```epsil
shape([[a(1), a(2)]])
// ➔ (1, 2)
```

The shape is sometimes called the "dimensions" of a matrix. That word is
ambiguous: it also names the length along one axis.

### MathJSON

`["Shape", value]`. The result is a `Tuple`.

```json example
["Shape", 5]
// ➔ ["Tuple"]

["Shape", ["List", 5, 2, 10, 18]]
// ➔ ["Tuple", 4]

["Shape", ["List", ["List"], ["List"]]]
// ➔ ["Tuple", 2, 0]

["Shape", ["Range", 1, 3]]
// ➔ ["Tuple", 3]
```

## Rank

A scalar has rank 0, a vector rank 1, a matrix rank 2 and a tensor of three
axes rank 3. An empty list has rank 1, and a list of empty lists rank 2: a
zero axis counts. A finite range has rank 1.

```epsil
[rank(5), rank([5, 2, 10, 18]), rank([[5, 2, 10], [1, 2, 3]])]
// ➔ [0,1,2]
[rank([]), rank([[], []]), rank(1..3)]
// ➔ [1,2,1]
```

As for `shape`, a set, a dictionary, an infinite collection, or a symbol with
no value leaves `rank` unevaluated.

```epsil
rank({1, 2})
// ➔ Rank(Set(1, 2))
```

### MathJSON

`["Rank", value]`.

```json example
["Rank", 5]
// ➔ 0

["Rank", ["List", ["List", 5, 2, 10], ["List", 1, 2, 3]]]
// ➔ 2

["Rank", ["List"]]
// ➔ 1
```

## MatrixRank

The number of linearly independent rows of a matrix, which is also the
number of linearly independent columns. For a matrix of symbols, it is the
rank for generic values of the symbols. When the rank cannot be decided,
`matrixRank` stays unevaluated.

```epsil
matrixRank([[1, 2], [3, 4]])
// ➔ 2
matrixRank([[1, 2, 3], [2, 4, 6], [1, 1, 1]])
// ➔ 2
[matrixRank([[a, b], [c, d]]), matrixRank([[a, b], [a, b]])]
// ➔ [2,1]
```

### MathJSON

`["MatrixRank", matrix]`. In LaTeX, `\operatorname{rank}(A)`.

```json example
["MatrixRank", ["List", ["List", 1, 2], ["List", 2, 4]]]
// ➔ 1
```

## IsSquareMatrix

A vector, a scalar, and a matrix whose number of rows is not its number of
columns are not square matrices.

```epsil
[isSquareMatrix([1, 2]), isSquareMatrix(5)]
// ➔ [false,false]
isSquareMatrix([[1, 2, 3], [4, 5, 6]])
// ➔ false
```

### MathJSON

`["IsSquareMatrix", value]`.

```json example
["IsSquareMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ "True"
```

## IsSymmetric

A matrix `A` is symmetric when it is equal to its transpose,
$A = A^\top$. The elements can be symbols. A matrix that is not square is not
symmetric.

```epsil
[isSymmetric([[1, 2], [3, 1]]), isSymmetric([[a, b], [b, c]])]
// ➔ [false,true]
isSymmetric([[1, 2, 3], [4, 5, 6]])
// ➔ false
```

### MathJSON

`["IsSymmetric", value]`.

```json example
["IsSymmetric", ["List", ["List", 1, 2], ["List", 2, 1]]]
// ➔ "True"
```

## IsDiagonal

Every element off the main diagonal must be zero. The elements of the
diagonal can be symbols. A matrix that is not square is not diagonal.

```epsil
[isDiagonal([[5, 1], [0, 3]]), isDiagonal([[a, 0], [0, b]])]
// ➔ [false,true]
isDiagonal([[1, 0, 0], [0, 2, 0]])
// ➔ false
```

### MathJSON

`["IsDiagonal", value]`.

```json example
["IsDiagonal", ["List", ["List", 5, 0], ["List", 0, 3]]]
// ➔ "True"
```

## Flatten

The elements are taken in row-major order, recursively. `flatten` applies to
any collection, and a range counts as a list. A scalar gives a list of one
element.

```epsil
flatten([[5, 2, 10, 18], [1, 2, 3]])
// ➔ [5,2,10,18,1,2,3]
[flatten(42), flatten([1..2, 3..4])]
// ➔ [[42],[1,2,3,4]]
```

The second argument is a depth: only that many levels of nesting are
flattened. Without it, or with the depth `oo`, the collection is flattened
completely.

```epsil
flatten([[1, [2]], [3]], 1)
// ➔ [1,[2],3]
flatten([[1, [2]], [3]], oo)
// ➔ [1,2,3]
```

Only lists are flattened. A string is a collection of characters, and a
tuple a collection of values, but `flatten` keeps each of them whole, at any
depth, so a point stays a point:

```epsil
flatten(["ab", "cd"])
// ➔ ["ab","cd"]
flatten([(1, 2), [3, (4, 5)]])
// ➔ [(1, 2),3,(4, 5)]
```

When the type of the collection shows which elements are lists, the type of
the result is a list of the elements that remain. Otherwise, for example
when an element has the type `any` or the depth is not a number literal, it
is `list`.

```epsil
type(flatten([[[1, 2]], [[3]]]))
// ➔ TypeFrom("list<integer>")
```

`flatten` is the APL ravel `,` and
[`numpy.ravel`](https://numpy.org/doc/stable/reference/generated/numpy.ravel.html).

### MathJSON

`["Flatten", value]`, `["Flatten", value, depth]`. Only elements with the
same head as the collection are flattened: in a `List`, other `List`
elements and `Range` elements.

```json example
["Flatten", ["List", ["List", 5, 2, 10, 18], ["List", 1, 2, 3]]]
// ➔ ["List", 5, 2, 10, 18, 1, 2, 3]

["Flatten", ["List", ["List", 1, ["List", 2]], ["List", 3]], 1]
// ➔ ["List", 1, ["List", 2], 3]

["Flatten", ["List", ["Tuple", 1, 2], ["List", 3, ["Tuple", 4, 5]]]]
// ➔ ["List", ["Tuple", 1, 2], 3, ["Tuple", 4, 5]]
```

## Reshape

The argument can be a list, a matrix, a tensor or another indexed
collection, such as a range. The shape is a tuple of integers, one per axis
of the result.

The elements are taken in row-major order, the order of `flatten`. When the
new shape has fewer elements, the last elements are dropped. When it has more,
the elements are repeated from the start, as in APL:

```epsil
reshape(1..6, (2, 2))
// ➔ [[1,2],[3,4]]
reshape([7, -2, 11, -5, 13, -7, 17], (3, 3))
// ➔ [[7,-2,11],[-5,13,-7],[17,7,-2]]
```

A scalar is repeated to fill the shape. The empty shape `Tuple()` gives the
first element:

```epsil
reshape(42, (2, 3))
// ➔ [[42,42,42],[42,42,42]]
reshape([5, 2, 10], Tuple())
// ➔ 5
```

The shape must be a tuple, also for one axis:

```epsil
reshape([1, 2], 2)
// ➔ error: Type error: expected `tuple`, got `2` at `2` in `reshape([1, 2], 2)`
```

`reshape` is the APL reshape `⍴` and
[`numpy.reshape`](https://numpy.org/doc/stable/reference/generated/numpy.reshape.html).
Other systems differ: by default, Mathematica's `ArrayReshape` fills the
missing elements with zeros.

### MathJSON

`["Reshape", value, shape]`, where _shape_ is a `Tuple`.

```json example
["Reshape", ["Range", 9], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]

["Reshape", ["List", 5, 2, 10], ["Tuple"]]
// ➔ 5
```

## Transpose

The transpose of a matrix exchanges its rows and its columns. A vector and a
scalar are their own transpose.

```epsil
[transpose([1, 2, 3]), transpose(5)]
// ➔ [[1,2,3],5]
```

A tensor with more than two axes is a batch of matrices: by default,
`transpose` exchanges its last two axes, which transposes each matrix.
With two axis numbers, starting at 1, it exchanges those axes.

```epsil
let T = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
transpose(T)
// ➔ [[[1,3],[2,4]],[[5,7],[6,8]]]
let T = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
transpose(T, 1, 2)
// ➔ [[[1,2],[5,6]],[[3,4],[7,8]]]
```

### MathJSON

`["Transpose", matrix]`, `["Transpose", tensor, axis1, axis2]`. In LaTeX,
`A^T` and `A^\top`.

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

## ConjugateTranspose

The [conjugate transpose](https://en.wikipedia.org/wiki/Conjugate_transpose),
or Hermitian transpose, is the transpose with every element replaced by its
complex conjugate. For a matrix of real numbers, it is the transpose. For a
vector, it is the conjugate of each element, without a transposition.

```epsil
conjugateTranspose([1 + i, 2 - i])
// ➔ [(1 - i),(2 + i)]
```

For a tensor with more than two axes, it exchanges the last two axes, or the
two axes that you name, starting at 1, and conjugates every element:

```epsil
let T = [[[1, i], [3, 4]], [[5, 6], [7, 8i]]]
conjugateTranspose(T)
// ➔ [[[1,3],[-i,4]],[[5,7],[6,-8i]]]
```

### MathJSON

`["ConjugateTranspose", matrix]`,
`["ConjugateTranspose", tensor, axis1, axis2]`. In LaTeX, `A^\star` and
`A^\dagger`.

```json example
["ConjugateTranspose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

## Inverse

A matrix of integers and rationals is inverted exactly. A matrix with a
decimal element, or `N`, gives decimal values. A matrix of symbols gives a
symbolic inverse.

```epsil
inverse([[2, 1], [1, 3]])
// ➔ [[3/5,-1/5],[-1/5,2/5]]
inverse([[2, 1.0], [1, 3]])
// ➔ [[0.6,-0.2],[-0.2,0.4]]
```

The matrix must be square. A singular matrix, whose determinant is 0, has no
inverse, and `inverse` stays unevaluated. A vector, a scalar, or a tensor of
more than two axes is not a matrix:

```epsil
inverse([[1, 2, 3], [4, 5, 6]])
// ➔ error: Runtime error: expected square matrix at `[[1,2,3],[4,5,6]]`
inverse(4)
// ➔ error: Type error: expected `matrix`, got `4` at `4` in `inverse(4)`
```

For the reciprocal of a number, write `1/x` or `x^(-1)`.

### MathJSON

`["Inverse", matrix]`. In LaTeX, `A^{-1}`: for a matrix, `\mathbf{A}^{-1}` is
the inverse, and for a list of ranges, the reciprocal of each element.

```json example
["Inverse", ["List", ["List", 2, 1], ["List", 1, 3]]]
// ➔ ["List",
//     ["List", ["Rational", 3, 5], ["Rational", -1, 5]],
//     ["List", ["Rational", -1, 5], ["Rational", 2, 5]]]
```

## LinearSolve

`linearSolve(A, b)` is the solution `x` of `A·x = b`. Exact elements give an
exact solution, and a decimal element gives decimal values. When `b` is a
matrix, each of its columns is a right-hand side: `linearSolve(A, I)` is the
inverse of `A`.

```epsil
linearSolve([[2, 1], [1, 3]], [1, 2])
// ➔ [1/5,3/5]
linearSolve([[2, 1.0], [1, 3]], [1, 2])
// ➔ [0.2,0.6]
linearSolve([[2, 1], [1, 3]], identityMatrix(2))
// ➔ [[3/5,-1/5],[-1/5,2/5]]
```

The product `dot(inverse(A), b)` gives the same solution. A singular matrix
leaves `linearSolve` unevaluated, and a right-hand side whose length is not
the number of rows is an error:

```epsil
dot(inverse([[2, 1], [1, 3]]), [1, 2])
// ➔ [1/5,3/5]
linearSolve([[1, 2], [2, 4]], [1, 2])
// ➔ LinearSolve([[1,2],[2,4]], [1,2])
linearSolve([[1, 2], [3, 4]], [5, 6, 7])
// ➔ error: Runtime error: incompatible dimensions at `2 vs 3`
```

### MathJSON

`["LinearSolve", matrix, vector]`, `["LinearSolve", matrix, matrix]`.

```json example
["LinearSolve",
  ["List", ["List", 2, 1], ["List", 1, 3]],
  ["List", 1, 2]]
// ➔ ["List", ["Rational", 1, 5], ["Rational", 3, 5]]
```

## PseudoInverse

The [Moore-Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse)
`A⁺` of a matrix with m rows and n columns is a matrix with n rows and m
columns. For an invertible matrix, it is the inverse. A matrix whose rank is
less than both its number of rows and its number of columns stays
unevaluated, also with `N`. A vector is not a matrix.

```epsil
pseudoInverse([[1, 2], [3, 4]])
// ➔ [[-2,1],[3/2,-1/2]]
pseudoInverse([[1, 2], [2, 4]])
// ➔ PseudoInverse([[1,2],[2,4]])
```

### MathJSON

`["PseudoInverse", matrix]`. In LaTeX, `A^+`.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", ["Rational", 3, 2], ["Rational", -1, 2]]]
```

## Diagonal

With a vector, `diagonal` makes a square matrix with the elements of the
vector on its diagonal and zeros elsewhere. With a matrix, it gives the list
of the elements of its diagonal: for a matrix that is not square, the first
`min(rows, columns)` of them. A scalar is its own diagonal, as a 1×1 matrix.

```epsil
diagonal([a, b])
// ➔ [[a,0],[0,b]]
[diagonal([[1, 2, 3], [4, 5, 6]]), diagonal(5)]
// ➔ [[1,5],5]
```

A tensor of more than two axes is an error:

```epsil
diagonal([[[1]]])
// ➔ error: Runtime error: expected square matrix at `[[[1]]]`
```

### MathJSON

`["Diagonal", vector]`, `["Diagonal", matrix]`.

```json example
["Diagonal", ["List", 1, 2, 3]]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 2, 0], ["List", 0, 0, 3]]

["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]
```

## IdentityMatrix

The [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix) has ones
on its main diagonal and zeros elsewhere. Its size must be a positive
integer. A symbolic size leaves it unevaluated.

```epsil
identityMatrix(0)
// ➔ error: Runtime error: expected positive integer at `0`
identityMatrix(n)
// ➔ IdentityMatrix(n)
```

### MathJSON

`["IdentityMatrix", n]`.

```json example
["IdentityMatrix", 2]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

## ZeroMatrix

`zeroMatrix(m, n)` has m rows and n columns. With one argument, the matrix
is square. Both sizes must be positive integers. `zeros(m, n)` gives the same
matrix, but `zeros(m)` is a list:

```epsil
zeroMatrix(3)
// ➔ [[0,0,0],[0,0,0],[0,0,0]]
zeroMatrix(0)
// ➔ error: Runtime error: expected positive integer at `0`
```

### MathJSON

`["ZeroMatrix", m]`, `["ZeroMatrix", m, n]`.

```json example
["ZeroMatrix", 2, 4]
// ➔ ["List", ["List", 0, 0, 0, 0], ["List", 0, 0, 0, 0]]
```

## Zeros

Each argument is the length of one axis: one argument gives a list, two give
a matrix, three give a tensor of rank 3. With one argument, `zeros` gives a
list, and `zeroMatrix` a square matrix:

```epsil
[zeros(3), zeroMatrix(3)]
// ➔ [[0,0,0],[[0,0,0],[0,0,0],[0,0,0]]]
zeros(2, 2, 2)
// ➔ [[[0,0],[0,0]],[[0,0],[0,0]]]
```

A length of 0 or less gives an empty axis, and a symbolic length leaves
`zeros` unevaluated. A tensor of more than 10,000 elements is a lazy
collection: its elements are not created before they are read.

```epsil
[zeros(0), zeros(-1)]
// ➔ [[],[]]
zeros(n)
// ➔ Zeros(n)
```

`zeros(d1, d2, ...)` is [`fill`](/reference/linear-algebra/#fill) with the
value 0.

### MathJSON

`["Zeros", d1, d2, ...]`.

```json example
["Zeros", 3]
// ➔ ["List", 0, 0, 0]

["Zeros", 2, 3]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0]]
```

## Ones

The arguments are those of [`zeros`](/reference/linear-algebra/#zeros), and
`ones(d1, d2, ...)` is [`fill`](/reference/linear-algebra/#fill) with the
value 1. A tensor of more than 10,000 elements is a lazy collection:

```epsil
ones(200, 200)
// ➔ Repeat(Repeat(1, 200), 200)
```

### MathJSON

`["Ones", d1, d2, ...]`.

```json example
["Ones", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

## OnesMatrix

`onesMatrix(m, n)` has m rows and n columns. With one argument, the matrix is
square. Both sizes must be positive integers.

```epsil
onesMatrix(3)
// ➔ [[1,1,1],[1,1,1],[1,1,1]]
onesMatrix(0, 2)
// ➔ error: Runtime error: expected positive integer at `0`
```

### MathJSON

`["OnesMatrix", m]`, `["OnesMatrix", m, n]`.

```json example
["OnesMatrix", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

## RowReduce

The [reduced row echelon form](https://en.wikipedia.org/wiki/Row_echelon_form)
is computed by Gauss–Jordan elimination. The matrix need not be square. A
matrix of exact elements gives an exact result. A matrix of symbols leaves
`rowReduce` unevaluated.

```epsil
[rowReduce([[1, 2], [3, 4]]), rowReduce([[1, 2], [2, 4]])]
// ➔ [[[1,0],[0,1]],[[1,2],[0,0]]]
rowReduce([[a, b], [c, d]])
// ➔ RowReduce([[a,b],[c,d]])
```

### MathJSON

`["RowReduce", matrix]`.

```json example
["RowReduce", ["List", ["List", 1, 2], ["List", 2, 4]]]
// ➔ ["List", ["List", 1, 2], ["List", 0, 0]]
```

## Determinant

The matrix must be square. A matrix that is not square is an error, and a
vector, a scalar, or a tensor of more than two axes is not a matrix:

```epsil
determinant([[1, 2, 3], [4, 5, 6]])
// ➔ error: Runtime error: expected square matrix at `[[1,2,3],[4,5,6]]`
determinant(5)
// ➔ error: Type error: expected `matrix`, got `5` at `5` in `determinant(5)`
```

`det` is another name for `determinant`. Both take one argument:

```epsil
det([[1, 2], [3, 4]], 2)
// ➔ error: Static error: unexpected argument in `det([[1, 2], [3, 4]], 2)`
```

### MathJSON

`["Determinant", matrix]`. `["Det", matrix]` is canonicalized to
`Determinant`. In LaTeX, `\det A`, and a `vmatrix` environment:
`\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix}` is `-2`.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

## AdjugateMatrix

The [adjugate](https://en.wikipedia.org/wiki/Adjugate_matrix) of a square
matrix is the transpose of its cofactor matrix. The cofactor of the element
in row i and column j is $(-1)^{i+j}$ times the determinant of the matrix
without row i and column j. The product of a matrix and its adjugate is
`determinant(A)` times the identity matrix:

```epsil
[[1, 2], [3, 4]] * adjugateMatrix([[1, 2], [3, 4]])
// ➔ [[-2,0],[0,-2]]
adjugateMatrix([[a, b], [c, d]])
// ➔ [[d,-b],[-c,a]]
```

### MathJSON

`["AdjugateMatrix", matrix]`. It is written $\operatorname{adj}(\mathbf{A})$,
but `\operatorname{adj}` is not parsed as `AdjugateMatrix`.

```json example
["AdjugateMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 4, -2], ["List", -3, 1]]
```

## Trace

The [trace](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) is the sum
of the elements of the main diagonal, which is also the sum of the
eigenvalues. It is defined for a square matrix. A scalar is its own trace,
as a 1×1 matrix. A vector is an error.

```epsil
[trace([[a, b], [c, d]]), trace(5)]
// ➔ [a + d,5]
trace([1, 2])
// ➔ error: Runtime error: expected matrix or tensor at `[1,2]`
```

For a tensor of more than two axes, `trace` gives the tensor of the traces
of the matrices on the last two axes, which must have the same length. With
two axis numbers, starting at 1, it takes the trace on those axes:

```epsil
let T = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
trace(T)
// ➔ [5,13]
let T = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
trace(T, 1, 2)
// ➔ [8,10]
```

### MathJSON

`["Trace", matrix]`, `["Trace", tensor, axis1, axis2]`. In LaTeX, `\tr A` and
`\operatorname{tr}(A)`.

```json example
["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ 5
```

## Kernel

The [kernel](https://en.wikipedia.org/wiki/Kernel_(linear_algebra)), or null
space, of a matrix `A` is the set of vectors `x` with `A·x = 0`. `kernel`
gives a basis of it, as a list of vectors. When the kernel holds only the
zero vector, the basis is the empty list.

```epsil
kernel([[1, 2, 3], [4, 5, 6]])
// ➔ [[1,-2,1]]
kernel([[1, 2], [3, 4]])
// ➔ []
```

A vector is a matrix of one row, and a scalar a 1×1 matrix:

```epsil
kernel([1, 0, 0])
// ➔ [[0,1,0],[0,0,1]]
[kernel(0), kernel(5)]
// ➔ [[[1]],[]]
```

A matrix of symbols, or with an element that is not real, leaves `kernel`
unevaluated. A tensor of more than two axes is an error.

```epsil
kernel([[a, b], [c, d]])
// ➔ Kernel([[a,b],[c,d]])
kernel([[[1]]])
// ➔ error: Runtime error: expected matrix at `[[[1]]]`
```

### MathJSON

`["Kernel", matrix]`. In LaTeX, `\ker A`.

```json example
["Kernel", ["List", ["List", 1, 0], ["List", 0, 0]]]
// ➔ ["List", ["List", 0, 1]]
```

## Dimension

For a scalar, `dimension` is 1. For a vector, a matrix or a tensor, it is the
product of the lengths of the axes, that is the number of elements. For a
finite range, it is the number of elements, and for a hom-set it is the
product of the dimensions of its domain and codomain.

```epsil
[dimension(5), dimension([1, 2, 3]), dimension(1..10)]
// ➔ [1,3,10]
dimension(hom([1, 2], [3, 4, 5]))
// ➔ 6
```

When the dimension cannot be found, `dimension` stays unevaluated:

```epsil
[dimension(x), dimension({1, 2, 3})]
// ➔ [Dimension(x),Dimension(Set(1, 2, 3))]
```

`dimension` is neither the number of axes, which is
[`rank`](/reference/linear-algebra/#rank), nor the number of linearly
independent rows, which is
[`matrixRank`](/reference/linear-algebra/#matrixrank).

### MathJSON

`["Dimension", value]`. In LaTeX, `\dim V`.

```json example
["Dimension", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ 6
```

## Degree

The total degree of a polynomial: the largest sum of the exponents of the
variables in one of its terms. A constant has degree 0. A bare symbol, which
could be a polynomial, and an expression that is not a polynomial leave
`degree` unevaluated.

```epsil
[degree(x^2 * y^3 + x), degree(42)]
// ➔ [5,0]
[degree(p), degree(sin(x))]
// ➔ [Degree(p),Degree(sin(x))]
```

### MathJSON

`["Degree", expr]`. In LaTeX, `\deg p`.

```json example
["Degree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1]]
// ➔ 3

["Degree", "p"]
// ➔ ["Degree", "p"]
```

## Hom

`hom(V, W)` is the set of morphisms from `V` to `W`. It stays symbolic: its
arguments are evaluated, and the `hom` form is kept. Its use is to give a
[`dimension`](/reference/linear-algebra/#dimension).

```epsil
hom(1 + 2, 2 * 3)
// ➔ Hom(3, 6)
```

### MathJSON

`["Hom", domain, codomain]`. In LaTeX, `\hom(V, W)`.

```json example
["Dimension", ["Hom", ["List", 1, 2], ["List", 3, 4, 5]]]
// ➔ 6
```

## MatrixMultiply

The [matrix product](https://en.wikipedia.org/wiki/Matrix_multiplication)
of a matrix with m rows and n columns and a matrix with n rows and p columns
is a matrix with m rows and p columns: its element in row i and column j is
the dot product of row i of the first matrix and column j of the second.

A vector is a column on the right of the product and a row on the left. The
product of two vectors of the same length is their dot product:

```epsil
matrixMultiply([[1, 2, 3], [4, 5, 6]], [1, 2, 3])
// ➔ [14,32]
matrixMultiply([1, 2], [[1, 2, 3], [4, 5, 6]])
// ➔ [9,12,15]
matrixMultiply([1, 2, 3], [4, 5, 6])
// ➔ 32
```

The number of columns of the first operand must be the number of rows of the
second:

```epsil
matrixMultiply([[1, 2], [3, 4]], [1, 2, 3])
// ➔ error: Runtime error: incompatible dimensions at `2 vs 3`
```

With two matrices, `*` is the same product. With two vectors, `*` multiplies
element by element, while `matrixMultiply` and `dot` give the dot product.
For the element-wise product of two matrices, use
[`hadamardProduct`](/reference/linear-algebra/#hadamardproduct).

```epsil
[[1, 2], [3, 4]] * [[5, 6], [7, 8]] * [[1, 0], [0, 1]]
// ➔ [[19,22],[43,50]]
[[1, 2], [3, 4]] * [[a], [b]]
// ➔ [[a + 2b],[3a + 4b]]
```

### MathJSON

`["MatrixMultiply", a, b]`. `["Multiply", ...]` of two or more matrices is
the matrix product too, folded from the left. In LaTeX, two matrices
written next to each other, or separated by `\cdot` or `\times`, are a
matrix product. Between two vectors, `\cdot` and `\times` multiply element
by element.

```json example
["MatrixMultiply",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 19, 22], ["List", 43, 50]]

["Multiply", 2, ["List", 1, 2, 3]]
// ➔ ["List", 2, 4, 6]
```

## HadamardProduct

The [Hadamard product](https://en.wikipedia.org/wiki/Hadamard_product_(matrices))
multiplies the elements at the same position. The two operands must have the
same shape.

```epsil
hadamardProduct([[1, 2], [3, 4]], [[a, b], [c, d]])
// ➔ [[a,2b],[3c,4d]]
hadamardProduct([1, 2, 3], [4, 5])
// ➔ error: Runtime error: incompatible dimensions at `3 vs 2`
```

It is not the [matrix product](/reference/linear-algebra/#matrixmultiply),
which `*` computes for two matrices.

### MathJSON

`["HadamardProduct", a, b]`. In LaTeX, `A \odot B`, which is also how the
product is written back.

```json example
["HadamardProduct", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ ["List", 4, 10, 18]

["HadamardProduct",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 5, 12], ["List", 21, 32]]
```

## Norm

The norm of a scalar is its absolute value. The norm of a vector `x` with the
second argument `p`:

- `p = 1`: the sum of the absolute values of the elements
- `p = 2`, the default: the Euclidean norm, the square root of the sum of the
  squares of the absolute values
- `p = oo`: the largest absolute value
- another `p`: $\left(\sum_i \lvert x_i \rvert^p\right)^{1/p}$, as a decimal
  number

```epsil
[norm(-5), norm([3, 4]), norm([3, -4], 1), norm([3, -4], oo)]
// ➔ [5,5,7,4]
norm([1 + i, 1])
// ➔ sqrt(3)
```

The general norm is a decimal number, the cube root of 91 here:

```epsil
norm([3, 4], 3)
// ➔ 4.49794144527541479639
```

The norm of a matrix:

- no `p`, or `p = "Frobenius"`: the Frobenius norm, the square root of the
  sum of the squares of the absolute values of the elements
- `p = 1`: the largest sum of the absolute values of a column
- `p = 2`: the spectral norm, the largest singular value
- `p = oo`: the largest sum of the absolute values of a row

```epsil
[norm([[1, 2], [3, 4]]), norm([[1, 2], [3, 4]], "Frobenius")]
// ➔ [sqrt(30),sqrt(30)]
[norm([[1, 2], [3, 4]], 1), norm([[1, 2], [3, 4]], oo)]
// ➔ [6,7]
norm([[1, 2], [3, 4]], 2)
// ➔ sqrt(15 + sqrt(221))
```

### MathJSON

`["Norm", value]`, `["Norm", value, p]`. _p_ is a number, the symbol
`"PositiveInfinity"` (or `"Infinity"`), or the string `"'Frobenius'"`; the
symbol `"Frobenius"` leaves `Norm` unevaluated. In LaTeX, `\Vert v \Vert` or
`\|v\|`, and `\Vert v \Vert_1` for a value of _p_.

```json example
["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], "'Frobenius'"]
// ➔ ["Sqrt", 30]

["Norm", ["List", 3, 4]]
// ➔ 5

["Norm", ["List", 3, -4], "Infinity"]
// ➔ 4

["Norm", ["List", ["List", 1, 2], ["List", 3, 4]], 1]
// ➔ 6
```

## Dot

For two vectors of the same length, `dot` is their inner product, a scalar.
The vectors can be lists or tuples. For two matrices, it is the matrix
product, as with
[`matrixMultiply`](/reference/linear-algebra/#matrixmultiply).

```epsil
[dot((1, 2, 3), (4, 5, 6)), dot([a, b], [c, d])]
// ➔ [32,a * c + b * d]
dot([[1, 2], [3, 4]], [[5, 6], [7, 8]])
// ➔ [[19,22],[43,50]]
dot([1, 2], [3, 4, 5])
// ➔ error: Runtime error: incompatible dimensions at `2 vs 3`
```

### MathJSON

`["Dot", a, b]`.

```json example
["Dot", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ 32
```

## Cross

The [cross product](https://en.wikipedia.org/wiki/Cross_product) is defined
for two vectors of length 3, lists or tuples. Its elements can be symbols.

```epsil
cross([1, 2, 3], [4, 5, 6])
// ➔ [-3,6,-3]
cross([1, 2], [3, 4])
// ➔ error: Runtime error: incompatible dimensions at `cross product requires two 3-vectors`
```

### MathJSON

`["Cross", a, b]`. In LaTeX, `\times` between two vectors multiplies them
element by element: it is not parsed as `Cross`.

```json example
["Cross", ["List", 1, 0, 0], ["List", 0, 1, 0]]
// ➔ ["List", 0, 0, 1]
```

## MatrixPower

An integer power is the repeated matrix product `A·A·…·A`. The power 0 is
the identity matrix, and a negative power is the power of the inverse,
$A^{-n} = (A^n)^{-1}$. A singular matrix has no negative power, and the
result stays unevaluated. The matrix must be square.

```epsil
matrixPower([[1, 2], [3, 4]], -2)
// ➔ [[11/2,-5/2],[-15/4,7/4]]
matrixPower([[1, 2], [2, 4]], -1)
// ➔ Inverse([[1,2],[2,4]])
matrixPower([[1, 2, 3], [4, 5, 6]], 2)
// ➔ error: Runtime error: expected square matrix at `[[1,2,3],[4,5,6]]`
```

A half-integer power of an exact 2×2 positive-semidefinite matrix uses its
principal square root. For another matrix, the result stays unevaluated.

```epsil
matrixPower([[4, 0], [0, 9]], 3/2)
// ➔ [[8,0],[0,27]]
matrixPower([[1, 2], [3, 4]], 1/2)
// ➔ MatrixPower([[1,2],[3,4]], 1/2)
```

`A ^ n` with an integer `n` is `matrixPower(A, n)`. With an exponent that is
not an integer, `^` applies to each element, as does `map`. With a symbolic
exponent, `A ^ n` stays a power, and `matrixPower(A, n)` stays unevaluated,
until `n` has a value:

```epsil
[[1, 2], [3, 4]] ^ (1/2)
// ➔ [[1,sqrt(2)],[sqrt(3),2]]
[[1, 2], [3, 4]] ^ n
// ➔ [[1,2],[3,4]]^n
matrixPower([[1, 2], [3, 4]], n)
// ➔ MatrixPower([[1,2],[3,4]], n)
map(x => x^2, [[1, 2], [3, 4]])
// ➔ [[1,4],[9,16]]
```

### MathJSON

`["MatrixPower", matrix, n]`. `["Power", matrix, n]` with an integer _n_ is
the matrix power too. In LaTeX, `A^n`:
`\begin{pmatrix}1&2\\3&4\end{pmatrix}^2` is the matrix product of the matrix
by itself.

```json example
["MatrixPower", ["List", ["List", 1, 2], ["List", 3, 4]], 2]
// ➔ ["List", ["List", 7, 10], ["List", 15, 22]]

["Power", ["List", ["List", 1, 2], ["List", 3, 4]], 2]
// ➔ ["List", ["List", 7, 10], ["List", 15, 22]]
```

## Eigenvalues

The [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalue) of a square
matrix `A` are the scalars `λ` for which `A·v = λ·v` for some vector `v`
that is not zero. They are the roots of the
[characteristic polynomial](/reference/linear-algebra/#characteristicpolynomial).
An eigenvalue of multiplicity k is listed k times.

How they are computed depends on the matrix:

- a 1×1 matrix: its element
- a triangular or diagonal matrix: the elements of the diagonal
- a 2×2 matrix: the quadratic formula on the characteristic polynomial
- a 3×3 matrix: Cardano's formula on the characteristic cubic
- a larger matrix: the QR algorithm. For a matrix of exact elements, an
  eigenvalue close to a rational number `λ` that makes `A - λ·I` singular is
  exact, and `eigenvectors` then gives exact vectors. A matrix with a decimal
  element gives decimal values.

```epsil
eigenvalues([[1, 2, 3], [0, 4, 5], [0, 0, 6]])
// ➔ [1,4,6]
eigenvalues([[1, 2], [3, 4]])
// ➔ [1/2 * (5 + sqrt(33)),1/2 * (5 - sqrt(33))]
eigenvalues([[2, 1, 0], [1, 2, 1], [0, 1, 2]])
// ➔ [2 + sqrt(2),2,2 - sqrt(2)]
let A = [[5, 4, 2, 1], [0, 1, -1, -1], [-1, -1, 3, 0], [1, 1, -1, 2]]
eigenvalues(A)
// ➔ [4,4,2,1]
```

The elements can be symbols. A closed form that cannot be found leaves
`eigenvalues` unevaluated. The matrix must be square.

```epsil
eigenvalues([[a, 0], [0, b]])
// ➔ [a,b]
eigenvalues([[1, 2, 3], [4, 5, 6]])
// ➔ error: Runtime error: expected square matrix at `[[1,2,3],[4,5,6]]`
```

### MathJSON

`["Eigenvalues", matrix]`.

```json example
["Eigenvalues", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", 5, 2]
```

## Eigenvectors

An [eigenvector](https://en.wikipedia.org/wiki/Eigenvector) of a square
matrix `A` is a vector `v`, not zero, with `A·v = λ·v` for an eigenvalue
`λ`. The eigenvector of `λ` is found from the kernel of `A - λ·I`. The
eigenvectors are in the order of the eigenvalues of `eigenvalues`, and are
not normalized: exact eigenvalues give vectors of exact elements.

```epsil
[eigenvalues([[4, 2], [1, 3]]), eigenvectors([[4, 2], [1, 3]])]
// ➔ [[5,2],[[2,1],[-1,1]]]
eigenvectors([[0, -1], [1, 0]])
// ➔ [[-1,i],[-1,-i]]
```

A matrix with a repeated eigenvalue can have fewer independent eigenvectors
than its size. The list then repeats a vector, and the computation is less
stable for decimal values:

```epsil
eigenvectors([[1, 1], [0, 1]])
// ➔ [[1,0],[1,0]]
```

### MathJSON

`["Eigenvectors", matrix]`.

```json example
["Eigenvectors", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

## Eigen

`eigen` returns the tuple `(eigenvalues, eigenvectors)`, the results of
[`eigenvalues`](/reference/linear-algebra/#eigenvalues) and
[`eigenvectors`](/reference/linear-algebra/#eigenvectors). Computing both
at once does less work than two calls. Destructure the tuple with `let`:

```epsil
let A = [[4, 2], [1, 3]]
let (values, vectors) = eigen(A)
A * vectors[1] == values[1] * vectors[1]
// ➔ true
```

### MathJSON

`["Eigen", matrix]`. The result is a `Tuple` of two lists.

```json example
["Eigen", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["Tuple",
//     ["List", 2, 3],
//     ["List", ["List", 1, 0], ["List", 0, 1]]]
```

## CharacteristicPolynomial

The [characteristic polynomial](https://en.wikipedia.org/wiki/Characteristic_polynomial)
$\det(x I - A)$ of a square matrix is monic. Its roots are the eigenvalues
of the matrix. The variable is `x` when it is not given.

```epsil
let A = [[4, 2], [1, 3]]
[characteristicPolynomial(A), eigenvalues(A)]
// ➔ [x^2 - 7x + 10,[5,2]]
characteristicPolynomial([[1, 2], [3, 4]], t)
// ➔ t^2 - 5t - 2
```

### MathJSON

`["CharacteristicPolynomial", matrix]`,
`["CharacteristicPolynomial", matrix, variable]`.

```json example
["CharacteristicPolynomial", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["Add", ["Power", "x", 2], ["Multiply", -5, "x"], -2]
```

## LUDecomposition

The **LU decomposition** with partial pivoting of a square matrix `A` is a
tuple `(P, L, U)`, with `P·A = L·U`:

- `P` is a permutation matrix
- `L` is a lower triangular matrix with ones on its diagonal
- `U` is an upper triangular matrix

A matrix of exact elements gives rational factors. A singular matrix has a
decomposition too, with a zero on the diagonal of `U`.

```epsil
luDecomposition([[4, 3], [6, 3]])
// ➔ ([[0,1],[1,0]], [[1,0],[2/3,1]], [[6,3],[0,1]])
luDecomposition([[1, 2], [2, 4]])
// ➔ ([[0,1],[1,0]], [[1,0],[1/2,1]], [[2,4],[0,0]])
```

The factors solve `A·x = b` in two triangular steps, `L·y = P·b` and then
`U·x = y`. The determinant of `A` is the product of the diagonal of `U`,
with the sign of the permutation `P`.

A matrix that is not square is an error, and a matrix of symbols leaves
`luDecomposition` unevaluated:

```epsil
luDecomposition([[1, 2, 3], [4, 5, 6]])
// ➔ error: Runtime error: expected square matrix at `[[1,2,3],[4,5,6]]`
luDecomposition([[a, b], [c, d]])
// ➔ LUDecomposition([[a,b],[c,d]])
```

### MathJSON

`["LUDecomposition", matrix]`. The result is a `Tuple` of three matrices.

## QRDecomposition

The **QR decomposition** of a matrix `A`, computed with Householder
reflections, is a tuple `(Q, R)`, with `A = Q·R`:

- `Q` is an orthogonal matrix: `transpose(Q) * Q` is the identity
- `R` is an upper triangular matrix

The matrix can have any shape. With m rows and n columns, `Q` has m rows and
m columns, and `R` has m rows and n columns.

```epsil
let A = [[12, -51, 4], [6, 167, -68], [-4, 24, -41]]
let (Q, R) = qrDecomposition(A)
R
// ➔ [[14,21,-14],[0,175,-70],[0,0,35]]
let (Q, R) = qrDecomposition([[1, 2], [3, 4], [5, 6]])
[shape(Q), shape(R)]
// ➔ [(3, 3),(3, 2)]
let (Q, R) = qrDecomposition([[1, 2], [3, 4]])
[transpose(Q) * Q, Q * R]
// ➔ [[[1,0],[0,1]],[[1,2],[3,4]]]
```

The QR decomposition is used for least-squares problems, for the
eigenvalues of a large matrix (the QR algorithm), and to orthogonalize a set
of vectors.

### MathJSON

`["QRDecomposition", matrix]`. The result is a `Tuple` of two matrices.

## CholeskyDecomposition

The **Cholesky decomposition** of a symmetric positive definite matrix `A` is
the lower triangular matrix `L` with `A = L·transpose(L)`. Exact elements
give exact factors, with square roots.

```epsil
choleskyDecomposition([[2, 1], [1, 2]])
// ➔ [[sqrt(2),0],[sqrt(2)/2,sqrt(6)/2]]
let L = choleskyDecomposition([[4, 2], [2, 2]])
[L, L * transpose(L)]
// ➔ [[[2,0],[1,1]],[[4,2],[2,2]]]
```

The matrix must be square, symmetric, and positive definite: all its
eigenvalues are positive.

```epsil
choleskyDecomposition([[1, 2], [3, 1]])
// ➔ error: Runtime error: expected symmetric matrix at `[[1,2],[3,1]]`
choleskyDecomposition([[1, 2], [2, 1]])
// ➔ error: Runtime error: expected positive definite matrix at `[[1,2],[2,1]]`
```

The Cholesky decomposition solves a symmetric positive definite system with
less work than the LU decomposition. It is also used to draw correlated
random variables in Monte Carlo simulations, and in Kalman filters.

### MathJSON

`["CholeskyDecomposition", matrix]`.

```json example
["CholeskyDecomposition", ["List", ["List", 4, 2], ["List", 2, 2]]]
// ➔ ["List", ["List", 2, 0], ["List", 1, 1]]
```

## SVD

The **singular value decomposition** of a matrix `A` is a tuple `(U, S, V)`,
with `A = U·S·transpose(V)`:

- `U` is an orthogonal matrix, whose columns are the left singular vectors
- `S` is a diagonal matrix of the singular values, which are not negative,
  in descending order
- `V` is an orthogonal matrix, whose columns are the right singular vectors

The matrix can have any shape. With m rows and n columns, `U` has m rows and
m columns, `S` has m rows and n columns, and `V` has n rows and n columns.

`svd` is computed with numeric algorithms: a matrix of exact elements stays
unevaluated until `N`. For exact singular values, use
[`singularValues`](/reference/linear-algebra/#singularvalues).

```epsil
svd([[4, 0], [3, -5]])
// ➔ SVD([[4,0],[3,-5]])
let (U, S, V) = N(svd([[1, 2, 3], [4, 5, 6]]))
[shape(U), shape(S), shape(V)]
// ➔ [(2, 2),(2, 3),(3, 3)]
```

A destructuring of an `svd` that stays unevaluated is an error, which says
to write `N`:

```epsil
let (U, S, V) = svd([[4, 0], [3, -5]])
// ➔ error: Runtime error: `SVD([[4,0],[3,-5]])` did not evaluate to a tuple, so it cannot be destructured; if `SVD` needs numeric input, write `N(…)`
```

Multiply the factors to get the matrix back:

```epsil
let A = [[4, 0], [3, -5]]
let (U, S, V) = N(svd(A))
round(U * S * transpose(V))
// ➔ [[4,0],[3,-5]]
```

The singular values of a diagonal matrix are the absolute values of its
diagonal elements:

```epsil
let (U, S, V) = N(svd([[1, 0, 0], [0, -2, 0], [0, 0, 3]]))
diagonal(S)
// ➔ [3,2,1]
```

The rank of a matrix is the number of its singular values that are not
zero, and its 2-norm is its largest singular value:

```epsil
[norm([[4, 0], [3, -5]], 2), singularValues([[4, 0], [3, -5]])]
// ➔ [2sqrt(10),[2sqrt(10),sqrt(10)]]
```

The singular value decomposition is used to compute the pseudoinverse, to
reduce the number of dimensions of data (principal component analysis), to
compress data, and to solve ill-conditioned linear systems.

### MathJSON

`["SVD", matrix]`. The result is a `Tuple` of three matrices.
