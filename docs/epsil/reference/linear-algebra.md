---
title: Linear algebra Reference
sidebar_label: Linear algebra
slug: /reference/linear-algebra/
description: "The linear algebra library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from linear-algebra.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Linear algebra

The **linear-algebra** library holds the operations on vectors, matrices and
tensors: their shape, products, inverses, linear systems, eigenvalues and
matrix decompositions. This introduction gives the concepts you need before
you read the entries.

## Vectors, matrices and tensors

There is no separate matrix value. A vector is a list, a matrix is a list of
rows, and a tensor is a list nested more deeply. Every row of a matrix must
have the same length.

```epsil
[[1, 3], [5, 0]]
// ➔ [[1,3],[5,0]]
```

A list of ranges of the same length keeps its ranges, but the functions of
this library read each range as a row:

```epsil
determinant([1..2, 3..4])
// ➔ -2
```

The operator `*` chooses from the type of its operands, and a list of ranges is
not typed as a matrix, so `*` multiplies element by element. Use
`matrixMultiply` for the matrix product:

```epsil
[1..2, 3..4] * [1..2, 3..4]
// ➔ [[1,4],[9,16]]
```

Matrices are stored in **row-major** order: the first element of the outer
list is the first row. An index reads an element. Indexes start at 1. The
first index selects the row and the second index selects the column.

```epsil
let A = [[1, 2, 3], [4, 5, 6]]
A[2, 3]
// ➔ 6
```

With one index, you get a complete row:

```epsil
let A = [[1, 2], [3, 4]]
A[2]
// ➔ [3,4]
```

Because vectors and matrices are lists, the collection operations (`map`,
`reduce`, `at`, `length`) also apply to them.

A plain list is a row of values. `vector` makes a **column vector**, that is a
matrix with one column:

```epsil
vector(1, 2, 3)
// ➔ [[1],[2],[3]]
```

`matrix` does not change the value of its argument. It only records how the
matrix is displayed, for example its delimiters.

## Shape and rank

An **axis** is one level of nesting. A vector has one axis, a matrix has two,
and a tensor has more than two.

The **shape** is the length along each axis. A matrix with 2 rows and 3
columns has the shape `(2, 3)`. A scalar has the empty shape `()`.

```epsil
shape([[1, 2, 3], [4, 5, 6]])
// ➔ (2, 3)
```

The **rank** is the number of axes, that is the length of the shape. In this
library, `rank` always has this meaning:

```epsil
rank([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
// ➔ 3
```

The number of linearly independent rows of a matrix is a different quantity.
Use `matrixRank` for it:

```epsil
matrixRank([[1, 2], [2, 4]])
// ➔ 1
```

`reshape` puts the same elements into a new shape, and `flatten` puts them
into one list, in row-major order:

```epsil
reshape(1..6, (2, 3))
// ➔ [[1,2,3],[4,5,6]]
```

## Element types

The type of a vector or matrix includes the type of its elements and its
shape. The element type is the narrowest type that includes every element.

```epsil
type([[1/2, 1], [3, 4]])
// ➔ TypeFrom("matrix<rational^(2x2)>")
```

```epsil
type([1, 2, 3])
// ➔ TypeFrom("vector<integer^3>")
```

A tensor with more than two axes has a `list` type with its full shape. An
operation that needs a matrix, such as `determinant` or `inverse`, reports an
`incompatible-type` error when its argument is not a matrix.

Elements can be symbolic. The operations then give a symbolic result:

```epsil
determinant([[a, b], [c, d]])
// ➔ -b * c + a * d
```

## Arithmetic and broadcasting

`+` and `-` operate element by element. The two operands must have the same
shape.

```epsil
[1, 2, 3] + [10, 20, 30]
// ➔ [11,22,33]
```

A scalar is **broadcast**: it combines with every element.

```epsil
10 * [[1, 2], [3, 4]]
// ➔ [[10,20],[30,40]]
```

```epsil
[[1, 2], [3, 4]] + 1
// ➔ [[2,3],[4,5]]
```

A vector is not broadcast along the rows of a matrix. Operands whose shapes
do not agree give an `incompatible-dimensions` error:

```epsil
[[1, 2], [3, 4]] + [[1, 2, 3], [4, 5, 6]]
// ➔ Error("incompatible-dimensions", "2x2 vs 2x3")
```

Functions of one number, such as `sqrt` or `cos`, apply to each element:

```epsil
sqrt([1, 4, 9])
// ➔ [1,2,3]
```

## Products and powers

When one operand of `*` is a matrix, `*` is the **matrix product**. The
order of the operands is kept, because the matrix product is not
commutative.

```epsil
[[1, 2], [3, 4]] * [[5, 6], [7, 8]]
// ➔ [[19,22],[43,50]]
```

A matrix times a vector is a vector:

```epsil
[[1, 2], [3, 4]] * [1, 1]
// ➔ [3,7]
```

The product of two vectors with `*` is element by element. Use `dot` for the
scalar (inner) product:

```epsil
[1, 2, 3] * [4, 5, 6]
// ➔ [4,10,18]
```

```epsil
dot([1, 2, 3], [4, 5, 6])
// ➔ 32
```

`hadamardProduct` multiplies two matrices element by element. `cross` is the
cross product of two vectors of length 3.

For a square matrix and an integer exponent, `^` is the **matrix power**. A
power of `0` gives the identity matrix and a negative power uses the inverse.

```epsil
[[1, 2], [3, 4]] ^ 2
// ➔ [[7,10],[15,22]]
```

```epsil
[[1, 2], [3, 4]] ^ -1
// ➔ [[-2,1],[3/2,-1/2]]
```

## Exact and numeric results

When all the elements are exact (integers and rationals), `determinant`,
`inverse`, `linearSolve`, `rowReduce` and `kernel` give an exact result. Use
`N` to get a decimal result:

```epsil
inverse([[1, 2], [3, 4]])
// ➔ [[-2,1],[3/2,-1/2]]
```

```epsil
N(inverse([[1, 2], [3, 4]]))
// ➔ [[-2,1],[1.5,-0.5]]
```

A matrix with a decimal element gives a decimal result.

`eigenvalues` and `eigenvectors` give exact values for a triangular matrix
and for a 2×2 matrix whose eigenvalues are rational or complex rational.
Otherwise they can give decimal values.

```epsil
eigenvalues([[0, -1], [1, 0]])
// ➔ [i,-i]
```

```epsil
eigenvalues([[2, 1], [1, 2]])
// ➔ [3,1]
```

The decompositions `luDecomposition`, `qrDecomposition` and
`choleskyDecomposition` of a matrix of exact rational entries give exact
factors: rationals for `luDecomposition`, and rationals times square roots
for `qrDecomposition` and `choleskyDecomposition`. The diagonal of the `R`
factor of `qrDecomposition` is not negative. `svd`, and these decompositions
of a matrix with a decimal entry or under `N`, use numeric algorithms, so
their factors contain decimal values. Multiply the factors to check a
decomposition:

```epsil
let (P, L, U) = luDecomposition([[4, 3], [2, 1]])
L * U
// ➔ [[4,3],[2,1]]
```

An operation that has no result for its argument stays unevaluated. For
example, a singular matrix has no inverse:

```epsil
inverse([[1, 2], [2, 4]])
// ➔ Inverse([[1,2],[2,4]])
```

## Tensors

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

## Matrix decompositions

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

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### adjugateMatrix

`(matrix) -> matrix`

Adjugate (classical adjoint) of a square matrix.

```epsil
adjugateMatrix([[1, 2], [3, 4]])
// ➔ [[4,-2],[-3,1]]
```

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

<MathJson name="AdjugateMatrix">

`["AdjugateMatrix", matrix]`. It is written $\operatorname{adj}(\mathbf{A})$,
but `\operatorname{adj}` is not parsed as `AdjugateMatrix`.

```json example
["AdjugateMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", 4, -2], ["List", -3, 1]]
```

</MathJson>

### characteristicPolynomial

`(matrix, any?) -> expression`

Characteristic polynomial det(x·I − A) of a square matrix (monic).

```epsil
characteristicPolynomial([[2, 1], [1, 2]], x)
// ➔ x^2 - 4x + 3
```

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

<MathJson name="CharacteristicPolynomial">

`["CharacteristicPolynomial", matrix]`,
`["CharacteristicPolynomial", matrix, variable]`.

```json example
["CharacteristicPolynomial", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["Add", ["Power", "x", 2], ["Multiply", -5, "x"], -2]
```

</MathJson>

### choleskyDecomposition

`(matrix) -> matrix`

Cholesky decomposition of a positive-definite matrix.

```epsil
choleskyDecomposition([[4, 2], [2, 5]])
// ➔ [[2,0],[1,2]]
```

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

<MathJson name="CholeskyDecomposition">

`["CholeskyDecomposition", matrix]`.

```json example
["CholeskyDecomposition", ["List", ["List", 4, 2], ["List", 2, 2]]]
// ➔ ["List", ["List", 2, 0], ["List", 1, 1]]
```

</MathJson>

### conjugateTranspose

`(value, axis1: integer?, axis2: integer?) -> value`

Conjugate transpose (Hermitian adjoint) of a matrix or tensor.

```epsil
conjugateTranspose([[1, 2 + i], [3 - i, 4]])
// ➔ [[1,(3 + i)],[(2 - i),4]]
```

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

<MathJson name="ConjugateTranspose" latex={["^\\star"]}>

`["ConjugateTranspose", matrix]`,
`["ConjugateTranspose", tensor, axis1, axis2]`. In LaTeX, `A^\star` and
`A^\dagger`.

```json example
["ConjugateTranspose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

</MathJson>

### cross

`(tuple | vector, tuple | vector) -> tuple | vector`

Cross product of two 3-vectors.

```epsil
cross([1, 0, 0], [0, 1, 0])
// ➔ [0,0,1]
```

The [cross product](https://en.wikipedia.org/wiki/Cross_product) is defined
for two vectors of length 3, lists or tuples. Its elements can be symbols.

```epsil
cross([1, 2, 3], [4, 5, 6])
// ➔ [-3,6,-3]
cross([1, 2], [3, 4])
// ➔ error: Runtime error: incompatible dimensions at `cross product requires two 3-vectors`
```

<MathJson name="Cross">

`["Cross", a, b]`. In LaTeX, `\times` between two vectors multiplies them
element by element: it is not parsed as `Cross`.

```json example
["Cross", ["List", 1, 0, 0], ["List", 0, 1, 0]]
// ➔ ["List", 0, 0, 1]
```

</MathJson>

### degree

`(value) -> integer`

Degree of an object

```epsil
degree(x^3 + 2 * x + 1)
// ➔ 3
```

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

<MathJson name="Degree" latex={["\\deg"]}>

`["Degree", expr]`. In LaTeX, `\deg p`.

```json example
["Degree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1]]
// ➔ 3

["Degree", "p"]
// ➔ ["Degree", "p"]
```

</MathJson>

### det

MathJSON `Det` · `(matrix) -> number`

`Det` is an alias for `Determinant`, which is the preferred name. Determinant of a square matrix.

```epsil
det([[1, 2], [3, 4]])
// ➔ -2
```

### determinant

`(matrix) -> number`

Determinant of a square matrix.

```epsil
determinant([[1, 2], [3, 4]])
// ➔ -2
```

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

<MathJson name="Determinant" latex={["\\det"]}>

`["Determinant", matrix]`. `["Det", matrix]` is canonicalized to
`Determinant`. In LaTeX, `\det A`, and a `vmatrix` environment:
`\begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix}` is `-2`.

```json example
["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ -2
```

</MathJson>

### diagonal

`(value) -> value`

Extract a matrix diagonal or build a diagonal matrix.

```epsil
diagonal([[1, 2], [3, 4]])
// ➔ [1,4]
```

```epsil
diagonal([1, 2, 3])
// ➔ [[1,0,0],[0,2,0],[0,0,3]]
```

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

<MathJson name="Diagonal">

`["Diagonal", vector]`, `["Diagonal", matrix]`.

```json example
["Diagonal", ["List", 1, 2, 3]]
// ➔ ["List", ["List", 1, 0, 0], ["List", 0, 2, 0], ["List", 0, 0, 3]]

["Diagonal", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", 1, 4]
```

</MathJson>

### dimension

`(value) -> integer`

Dimension of an object

```epsil
dimension([[1, 2, 3], [4, 5, 6]])
// ➔ 6
```

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

<MathJson name="Dimension" latex={["\\dim"]}>

`["Dimension", value]`. In LaTeX, `\dim V`.

```json example
["Dimension", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ 6
```

</MathJson>

### dot

`(list<tuple> | matrix | tuple | vector, list<tuple> | matrix | tuple | vector) -> value`

Dot product (vector inner product) or matrix product.

```epsil
dot([1, 2, 3], [4, 5, 6])
// ➔ 32
```

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

<MathJson name="Dot">

`["Dot", a, b]`.

```json example
["Dot", ["List", 1, 2, 3], ["List", 4, 5, 6]]
// ➔ 32
```

</MathJson>

### eigen

`(matrix) -> tuple`

Eigenvalue-eigenvector decomposition of a square matrix.

```epsil
eigen([[2, 1], [1, 2]])
// ➔ ([3,1], [[1,1],[-1,1]])
```

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

<MathJson name="Eigen">

`["Eigen", matrix]`. The result is a `Tuple` of two lists.

```json example
["Eigen", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["Tuple",
//     ["List", 2, 3],
//     ["List", ["List", 1, 0], ["List", 0, 1]]]
```

</MathJson>

### eigenvalues

`(matrix) -> list`

Eigenvalues of a square matrix.

```epsil
eigenvalues([[2, 1], [1, 2]])
// ➔ [3,1]
```

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

<MathJson name="Eigenvalues">

`["Eigenvalues", matrix]`.

```json example
["Eigenvalues", ["List", ["List", 4, 2], ["List", 1, 3]]]
// ➔ ["List", 5, 2]
```

</MathJson>

### eigenvectors

`(matrix) -> list`

Eigenvectors of a square matrix.

```epsil
eigenvectors([[2, 1], [1, 2]])
// ➔ [[1,1],[-1,1]]
```

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

<MathJson name="Eigenvectors">

`["Eigenvectors", matrix]`.

```json example
["Eigenvectors", ["List", ["List", 2, 0], ["List", 0, 3]]]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

</MathJson>

### fill

`(value: any, integer+) -> list`

List or tensor with each element equal to a value. Each operand after the value is the length of one axis.

```epsil
fill(7, 3)
// ➔ [7,7,7]
```

```epsil
fill(7, 2, 3)
// ➔ [[7,7,7],[7,7,7]]
```

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

<MathJson name="Fill">

`["Fill", value, d1, d2, ...]`.

```json example
["Fill", 7, 3]
// ➔ ["List", 7, 7, 7]

["Fill", 7, 2, 3]
// ➔ ["List", ["List", 7, 7, 7], ["List", 7, 7, 7]]
```

</MathJson>

### flatten

`(value, (+oo | integer)?) -> list`

Flatten a tensor or collection into a list.

```epsil
flatten([[1, 2], [3, 4]])
// ➔ [1,2,3,4]
```

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

<MathJson name="Flatten">

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

</MathJson>

### hadamardProduct

`(matrix | vector, matrix | vector) -> matrix | vector`

Hadamard (element-wise) product of two vectors or matrices of the same shape.

```epsil
hadamardProduct([[1, 2], [3, 4]], [[5, 6], [7, 8]])
// ➔ [[5,12],[21,32]]
```

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

<MathJson name="HadamardProduct" latex={["\\odot"]}>

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

</MathJson>

### hom

`(value*) -> value`

Hom-set of morphisms between objects

```epsil
dimension(hom([1, 2], [3, 4, 5]))
// ➔ 6
```

`hom(V, W)` is the set of morphisms from `V` to `W`. It stays symbolic: its
arguments are evaluated, and the `hom` form is kept. Its use is to give a
[`dimension`](/reference/linear-algebra/#dimension).

```epsil
hom(1 + 2, 2 * 3)
// ➔ Hom(3, 6)
```

<MathJson name="Hom" latex={["\\hom"]}>

`["Hom", domain, codomain]`. In LaTeX, `\hom(V, W)`.

```json example
["Dimension", ["Hom", ["List", 1, 2], ["List", 3, 4, 5]]]
// ➔ 6
```

</MathJson>

### identityMatrix

`(integer) -> matrix`

n-by-n identity matrix.

```epsil
identityMatrix(3)
// ➔ [[1,0,0],[0,1,0],[0,0,1]]
```

The [identity matrix](https://en.wikipedia.org/wiki/Identity_matrix) has ones
on its main diagonal and zeros elsewhere. Its size must be a positive
integer. A symbolic size leaves it unevaluated.

```epsil
identityMatrix(0)
// ➔ error: Runtime error: expected positive integer at `0`
identityMatrix(n)
// ➔ IdentityMatrix(n)
```

<MathJson name="IdentityMatrix">

`["IdentityMatrix", n]`.

```json example
["IdentityMatrix", 2]
// ➔ ["List", ["List", 1, 0], ["List", 0, 1]]
```

</MathJson>

### inverse

`(matrix) -> matrix`

Multiplicative inverse of a square matrix.

```epsil
inverse([[1, 2], [3, 4]])
// ➔ [[-2,1],[3/2,-1/2]]
```

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

<MathJson name="Inverse">

`["Inverse", matrix]`. In LaTeX, `A^{-1}`: for a matrix, `\mathbf{A}^{-1}` is
the inverse, and for a list of ranges, the reciprocal of each element.

```json example
["Inverse", ["List", ["List", 2, 1], ["List", 1, 3]]]
// ➔ ["List",
//     ["List", ["Rational", 3, 5], ["Rational", -1, 5]],
//     ["List", ["Rational", -1, 5], ["Rational", 2, 5]]]
```

</MathJson>

### isDiagonal

`(value) -> boolean`

Whether the matrix is diagonal (all off-diagonal entries are zero).

```epsil
isDiagonal([[1, 0], [0, 5]])
// ➔ true
```

Every element off the main diagonal must be zero. The elements of the
diagonal can be symbols. A matrix that is not square is not diagonal.

```epsil
[isDiagonal([[5, 1], [0, 3]]), isDiagonal([[a, 0], [0, b]])]
// ➔ [false,true]
isDiagonal([[1, 0, 0], [0, 2, 0]])
// ➔ false
```

<MathJson name="IsDiagonal">

`["IsDiagonal", value]`.

```json example
["IsDiagonal", ["List", ["List", 5, 0], ["List", 0, 3]]]
// ➔ "True"
```

</MathJson>

### isSquareMatrix

`(value) -> boolean`

Whether the value is a square matrix.

```epsil
isSquareMatrix([[1, 2], [3, 4]])
// ➔ true
```

A vector, a scalar, and a matrix whose number of rows is not its number of
columns are not square matrices.

```epsil
[isSquareMatrix([1, 2]), isSquareMatrix(5)]
// ➔ [false,false]
isSquareMatrix([[1, 2, 3], [4, 5, 6]])
// ➔ false
```

<MathJson name="IsSquareMatrix">

`["IsSquareMatrix", value]`.

```json example
["IsSquareMatrix", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ "True"
```

</MathJson>

### isSymmetric

`(value) -> boolean`

Whether the matrix is symmetric (A equals its transpose).

```epsil
isSymmetric([[1, 2], [2, 3]])
// ➔ true
```

A matrix `A` is symmetric when it is equal to its transpose,
$A = A^\top$. The elements can be symbols. A matrix that is not square is not
symmetric.

```epsil
[isSymmetric([[1, 2], [3, 1]]), isSymmetric([[a, b], [b, c]])]
// ➔ [false,true]
isSymmetric([[1, 2, 3], [4, 5, 6]])
// ➔ false
```

<MathJson name="IsSymmetric">

`["IsSymmetric", value]`.

```json example
["IsSymmetric", ["List", ["List", 1, 2], ["List", 2, 1]]]
// ➔ "True"
```

</MathJson>

### kernel

`(value) -> list`

Kernel (null space) of a linear map

```epsil
kernel([[1, 2], [2, 4]])
// ➔ [[-2,1]]
```

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

<MathJson name="Kernel" latex={["\\ker"]}>

`["Kernel", matrix]`. In LaTeX, `\ker A`.

```json example
["Kernel", ["List", ["List", 1, 0], ["List", 0, 0]]]
// ➔ ["List", ["List", 0, 1]]
```

</MathJson>

### luDecomposition

`(matrix) -> tuple`

LU decomposition of a square matrix.

```epsil
luDecomposition([[4, 3], [2, 1]])
// ➔ ([[1,0],[0,1]], [[1,0],[1/2,1]], [[4,3],[0,-1/2]])
```

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

<MathJson name="LUDecomposition">

`["LUDecomposition", matrix]`. The result is a `Tuple` of three matrices.

</MathJson>

### linearSolve

`(matrix, matrix | vector) -> value`

Solve the linear system A·x = b for x.

```epsil
linearSolve([[2, 1], [1, 3]], [3, 5])
// ➔ [4/5,7/5]
```

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

<MathJson name="LinearSolve">

`["LinearSolve", matrix, vector]`, `["LinearSolve", matrix, matrix]`.

```json example
["LinearSolve",
  ["List", ["List", 2, 1], ["List", 1, 3]],
  ["List", 1, 2]]
// ➔ ["List", ["Rational", 1, 5], ["Rational", 3, 5]]
```

</MathJson>

### matrix

`(matrix, string?, string?) -> matrix`

Matrix constructor and canonicalizer.

```epsil
matrix([[1, 2], [3, 4]])
// ➔ [[1,2],[3,4]]
```

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

<MathJson name="Matrix">

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

</MathJson>

### matrixMultiply

`(matrix | vector, matrix | vector) -> matrix | number | vector`

Matrix and vector multiplication.

```epsil
matrixMultiply([[1, 2], [3, 4]], [[5, 6], [7, 8]])
// ➔ [[19,22],[43,50]]
```

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

<MathJson name="MatrixMultiply">

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

</MathJson>

### matrixPower

`(matrix, real) -> matrix`

Square matrix raised to a power. Integer powers are the repeated matrix product; a half-integer power (e.g. 1/2) of an exact 2×2 positive-semidefinite matrix is the principal matrix square root.

```epsil
matrixPower([[1, 1], [1, 0]], 10)
// ➔ [[89,55],[55,34]]
```

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

<MathJson name="MatrixPower">

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

</MathJson>

### matrixRank

`(value) -> integer`

Rank of a matrix (number of linearly independent rows/columns).

```epsil
matrixRank([[1, 2], [2, 4]])
// ➔ 1
```

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

<MathJson name="MatrixRank" latex={["rank"]}>

`["MatrixRank", matrix]`. In LaTeX, `\operatorname{rank}(A)`.

```json example
["MatrixRank", ["List", ["List", 1, 2], ["List", 2, 4]]]
// ➔ 1
```

</MathJson>

### norm

`(list<tuple> | number | tensor | tuple, (+oo | real | string)?) -> +oo | nan | real`

Vector or matrix norm.

```epsil
norm([3, 4])
// ➔ 5
```

```epsil
norm([3, 4], 1)
// ➔ 7
```

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

<MathJson name="Norm" latex={["\\left\\Vert","\\right\\Vert"]}>

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

</MathJson>

### ones

`(integer+) -> list`

List or tensor filled with ones. Each operand is the length of one axis.

```epsil
ones(3)
// ➔ [1,1,1]
```

```epsil
ones(2, 3)
// ➔ [[1,1,1],[1,1,1]]
```

The arguments are those of [`zeros`](/reference/linear-algebra/#zeros), and
`ones(d1, d2, ...)` is [`fill`](/reference/linear-algebra/#fill) with the
value 1. A tensor of more than 10,000 elements is a lazy collection:

```epsil
ones(200, 200)
// ➔ Repeat(Repeat(1, 200), 200)
```

<MathJson name="Ones">

`["Ones", d1, d2, ...]`.

```json example
["Ones", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

</MathJson>

### onesMatrix

`(integer, integer?) -> matrix`

Matrix filled with ones.

```epsil
onesMatrix(2, 3)
// ➔ [[1,1,1],[1,1,1]]
```

`onesMatrix(m, n)` has m rows and n columns. With one argument, the matrix is
square. Both sizes must be positive integers.

```epsil
onesMatrix(3)
// ➔ [[1,1,1],[1,1,1],[1,1,1]]
onesMatrix(0, 2)
// ➔ error: Runtime error: expected positive integer at `0`
```

<MathJson name="OnesMatrix">

`["OnesMatrix", m]`, `["OnesMatrix", m, n]`.

```json example
["OnesMatrix", 2, 3]
// ➔ ["List", ["List", 1, 1, 1], ["List", 1, 1, 1]]
```

</MathJson>

### pseudoInverse

`(matrix) -> matrix`

Moore-Penrose pseudoinverse of a matrix.

```epsil
pseudoInverse([[1, 2], [3, 4], [5, 6]])
// ➔ [[-4/3,-1/3,2/3],[13/12,1/3,-5/12]]
```

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

<MathJson name="PseudoInverse" latex={["^+"]}>

`["PseudoInverse", matrix]`. In LaTeX, `A^+`.

```json example
["PseudoInverse", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["List", ["List", -2, 1], ["List", ["Rational", 3, 2], ["Rational", -1, 2]]]
```

</MathJson>

### qrDecomposition

`(matrix) -> tuple`

QR decomposition of a matrix.

```epsil
qrDecomposition([[0, 1], [1, 1]])
// ➔ ([[0,1],[1,0]], [[1,1],[0,1]])
```

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

<MathJson name="QRDecomposition">

`["QRDecomposition", matrix]`. The result is a `Tuple` of two matrices.

</MathJson>

### rank

`(value) -> integer`

The length of the shape of the expression. Note this is not the matrix rank (the number of linearly independent rows or columns in the matrix)

```epsil
rank([[1, 2, 3], [4, 5, 6]])
// ➔ 2
```

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

<MathJson name="Rank">

`["Rank", value]`.

```json example
["Rank", 5]
// ➔ 0

["Rank", ["List", ["List", 5, 2, 10], ["List", 1, 2, 3]]]
// ➔ 2

["Rank", ["List"]]
// ➔ 1
```

</MathJson>

### reshape

`(value, tuple) -> value`

Reshape a tensor or collection to a target shape.

```epsil
reshape([1, 2, 3, 4, 5, 6], (2, 3))
// ➔ [[1,2,3],[4,5,6]]
```

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

<MathJson name="Reshape">

`["Reshape", value, shape]`, where _shape_ is a `Tuple`.

```json example
["Reshape", ["Range", 9], ["Tuple", 3, 3]]
// ➔ ["List", ["List", 1, 2, 3], ["List", 4, 5, 6], ["List", 7, 8, 9]]

["Reshape", ["List", 5, 2, 10], ["Tuple"]]
// ➔ 5
```

</MathJson>

### rowReduce

`(matrix) -> matrix`

Reduced row echelon form (RREF) of a matrix.

```epsil
rowReduce([[1, 2, 3], [4, 5, 6]])
// ➔ [[1,0,-1],[0,1,2]]
```

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

<MathJson name="RowReduce">

`["RowReduce", matrix]`.

```json example
["RowReduce", ["List", ["List", 1, 2], ["List", 2, 4]]]
// ➔ ["List", ["List", 1, 2], ["List", 0, 0]]
```

</MathJson>

### svd

`(matrix) -> tuple`

Singular value decomposition of a matrix.

```epsil
N(svd([[3, 0], [0, 4]]))
// ➔ ([[0,1],[1,0]], [[4,0],[0,3]], [[0,1],[1,0]])
```

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

<MathJson name="SVD">

`["SVD", matrix]`. The result is a `Tuple` of three matrices.

</MathJson>

### shape

`(value) -> tuple`

Return the shape tuple of an expression.

```epsil
shape([[1, 2, 3], [4, 5, 6]])
// ➔ (2, 3)
```

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

<MathJson name="Shape">

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

</MathJson>

### singularValues

MathJSON `SingularValues` · `(matrix) -> list`

The singular values of a matrix, sorted in descending order (including any zero values). Exact for a matrix whose Gram matrix A^T·A (or A·A^T) is at most 2×2 with exact rational entries; numeric otherwise.

```epsil
singularValues([[3, 0], [0, 4]])
// ➔ [4,3]
```

### trace

`(number | tensor, axis1: integer?, axis2: integer?) -> number | tensor`

Trace of a matrix or pair of tensor axes.

```epsil
trace([[1, 2], [3, 4]])
// ➔ 5
```

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

<MathJson name="Trace" latex={["\\tr"]}>

`["Trace", matrix]`, `["Trace", tensor, axis1, axis2]`. In LaTeX, `\tr A` and
`\operatorname{tr}(A)`.

```json example
["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ 5
```

</MathJson>

### transpose

`(value, axis1: integer?, axis2: integer?) -> value`

Transpose a matrix or swap two tensor axes.

```epsil
transpose([[1, 2, 3], [4, 5, 6]])
// ➔ [[1,4],[2,5],[3,6]]
```

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

<MathJson name="Transpose" latex={["^T"]}>

`["Transpose", matrix]`, `["Transpose", tensor, axis1, axis2]`. In LaTeX,
`A^T` and `A^\top`.

```json example
["Transpose", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]
// ➔ ["List", ["List", 1, 4], ["List", 2, 5], ["List", 3, 6]]
```

</MathJson>

### vector

`(any+) -> vector`

Construct a column vector.

```epsil
vector(1, 2, 3)
// ➔ [[1],[2],[3]]
```

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

<MathJson name="Vector">

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

</MathJson>

### zeroMatrix

`(integer, integer?) -> matrix`

Matrix filled with zeros.

```epsil
zeroMatrix(2, 3)
// ➔ [[0,0,0],[0,0,0]]
```

`zeroMatrix(m, n)` has m rows and n columns. With one argument, the matrix
is square. Both sizes must be positive integers. `zeros(m, n)` gives the same
matrix, but `zeros(m)` is a list:

```epsil
zeroMatrix(3)
// ➔ [[0,0,0],[0,0,0],[0,0,0]]
zeroMatrix(0)
// ➔ error: Runtime error: expected positive integer at `0`
```

<MathJson name="ZeroMatrix">

`["ZeroMatrix", m]`, `["ZeroMatrix", m, n]`.

```json example
["ZeroMatrix", 2, 4]
// ➔ ["List", ["List", 0, 0, 0, 0], ["List", 0, 0, 0, 0]]
```

</MathJson>

### zeros

`(integer+) -> list`

List or tensor filled with zeros. Each operand is the length of one axis.

```epsil
zeros(3)
// ➔ [0,0,0]
```

```epsil
zeros(2, 3)
// ➔ [[0,0,0],[0,0,0]]
```

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

<MathJson name="Zeros">

`["Zeros", d1, d2, ...]`.

```json example
["Zeros", 3]
// ➔ ["List", 0, 0, 0]

["Zeros", 2, 3]
// ➔ ["List", ["List", 0, 0, 0], ["List", 0, 0, 0]]
```

</MathJson>
