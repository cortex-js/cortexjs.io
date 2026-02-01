---
title: Linear Algebra
slug: /compute-engine/guides/linear-algebra/
---

This guide covers working with vectors, matrices, and tensors in the Compute
Engine. You'll learn how to create, manipulate, and perform operations on
multidimensional arrays.

## Quick Start: Basic Operations

If you're just getting started, here are the most common operations:

### Vector Addition

Add vectors element-wise using LaTeX parentheses notation:

```js example
const ce = new ComputeEngine();

// Parse and evaluate vector addition
ce.parse('(1,2,3) + (3,5,6)').evaluate();
// → [4,7,9]

// Or using the Add function directly
ce.box(['Add', ['List', 1, 2, 3], ['List', 3, 5, 6]]).evaluate();
// → [5,7,9]
```

### Matrix Addition

Matrices are added element-wise:

```js example
const m1 = ce.box(['List', ['List', 1, 2], ['List', 3, 4]]);
const m2 = ce.box(['List', ['List', 5, 6], ['List', 7, 8]]);
m1.add(m2).evaluate();
// → [[6,8],[10,12]]
```

### Scalar Multiplication

Multiply a scalar with a vector or matrix:

```js example
ce.parse('2(1,2,3)').evaluate();
// → [2,4,6]
```

### Element-wise vs Matrix Multiplication

**Important distinction:**
- Use `Multiply` or `*` for **element-wise** multiplication (Hadamard product)
- Use `MatrixMultiply` for **linear algebraic** matrix multiplication

```js example
// Element-wise multiplication
ce.box(['Multiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[5,12],[21,32]]  (each element multiplied independently)

// Matrix multiplication (linear algebraic product)
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[19,22],[43,50]]  (row-column dot products)
```

For detailed information on matrix multiplication, see the [Matrix Multiplication](#matrix-multiplication) section below.

## LaTeX Matrix Notation

The Compute Engine supports standard LaTeX matrix environments. Here's a quick
reference:

### Matrix Environments

| LaTeX Environment | Delimiters | Example |
|-------------------|------------|---------|
| `matrix` | None | $\begin{matrix} a & b \\ c & d \end{matrix}$ |
| `pmatrix` | Parentheses ( ) | $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ |
| `bmatrix` | Brackets [ ] | $\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ |
| `vmatrix` | Vertical bars \| \| | $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$ (determinant) |
| `Vmatrix` | Double bars ‖ ‖ | $\begin{Vmatrix} a & b \\ c & d \end{Vmatrix}$ (norm) |

```js example
const ce = new ComputeEngine();

// All these create the same 2×2 matrix internally
ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
ce.parse('\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}');
ce.parse('\\begin{matrix} 1 & 2 \\\\ 3 & 4 \\end{matrix}');
// → ["List", ["List", 1, 2], ["List", 3, 4]]

// vmatrix is parsed as a determinant
ce.parse('\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}');
// → ["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]
```

### LaTeX Syntax Rules

- Use `&` to separate columns
- Use `\\` to separate rows
- Spaces are optional but improve readability

```latex
% Row vector (1×3)
\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}

% Column vector (3×1)
\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}

% 2×3 matrix
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6
\end{bmatrix}

% Symbolic matrix
\begin{pmatrix}
  a & b \\
  c & d
\end{pmatrix}
```

### Common Operations in LaTeX

```js example
// Transpose using superscript T
ce.parse('A^T');
// → ["Transpose", "A"]

ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^T');
// → ["Transpose", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Determinant using vertical bars
ce.parse('\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}');
// → ["Determinant", ["List", ["List", "a", "b"], ["List", "c", "d"]]]

// Determinant using \det command
ce.parse('\\det\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
// → ["Determinant", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Inverse using superscript -1
ce.parse('A^{-1}');
// → ["Inverse", "A"]

ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^{-1}');
// → ["Inverse", ["List", ["List", 1, 2], ["List", 3, 4]]]

// Trace using \operatorname
ce.parse('\\operatorname{tr}\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
// → ["Trace", ["List", ["List", 1, 2], ["List", 3, 4]]]
```

## Creating Vectors and Matrices

### Vectors

A vector is a one-dimensional array represented as a `List`:

```js example
const ce = new ComputeEngine();

// Row vector
const v = ce.box(['List', 1, 2, 3]);
console.log(v.toString());  // → [1, 2, 3]

// Parse from LaTeX
ce.parse('\\begin{bmatrix} 1 & 2 & 3 \\end{bmatrix}');
// → ["List", 1, 2, 3]
```

For column vectors, use `Vector`:

```js example
// Column vector
ce.box(['Vector', 1, 2, 3]);
// Internally becomes: ["Matrix", ["List", ["List", 1], ["List", 2], ["List", 3]]]

// Parse from LaTeX
ce.parse('\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}');
```

### Matrices

A matrix is a two-dimensional array represented as a nested `List`:

```js example
// 2×3 matrix
const M = ce.box(['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]);
console.log(M.toString());  // → [[1, 2, 3], [4, 5, 6]]

// Parse from LaTeX
ce.parse('\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}');
```

### Tensors

Higher-dimensional arrays (tensors) use deeper nesting:

```js example
// 2×2×2 tensor
const T = ce.box(['List',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]);
```

## Understanding Shape and Rank

### Shape

The **shape** of an array is a tuple of dimensions along each axis:

```js example
// Scalar: empty shape
ce.box(['Shape', 5]).evaluate();  // → ()

// Vector: single dimension
ce.box(['Shape', ['List', 1, 2, 3]]).evaluate();  // → (3)

// 2×3 Matrix
ce.box(['Shape', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();  // → (2, 3)

// 2×3×4 Tensor
ce.box(['Shape', ['List',
  ['List', ['List', 1, 2, 3, 4], ['List', 5, 6, 7, 8], ['List', 9, 10, 11, 12]],
  ['List', ['List', 13, 14, 15, 16], ['List', 17, 18, 19, 20], ['List', 21, 22, 23, 24]]
]]).evaluate();  // → (2, 3, 4)
```

### Rank

The **rank** is the number of dimensions (length of the shape):

```js example
ce.box(['Rank', 5]).evaluate();                  // → 0 (scalar)
ce.box(['Rank', ['List', 1, 2, 3]]).evaluate();  // → 1 (vector)
ce.box(['Rank', ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();  // → 2 (matrix)
```

## Transforming Arrays

### Flatten

`Flatten` converts any array to a 1D list in row-major order:

```js example
// Flatten a matrix
ce.box(['Flatten', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → [1, 2, 3, 4, 5, 6]

// Flatten a scalar (returns single-element list)
ce.box(['Flatten', 42]).evaluate();
// → [42]
```

### Reshape

`Reshape` changes the dimensions of an array. Elements are taken in row-major
order and cycle if needed (APL-style):

```js example
// Reshape a vector to a matrix
ce.box(['Reshape', ['List', 1, 2, 3, 4, 5, 6], ['Tuple', 2, 3]]).evaluate();
// → [[1, 2, 3], [4, 5, 6]]

// Reshape with cycling (7 elements → 9 needed for 3×3)
ce.box(['Reshape', ['List', 1, 2, 3, 4, 5, 6, 7], ['Tuple', 3, 3]]).evaluate();
// → [[1, 2, 3], [4, 5, 6], [7, 1, 2]]

// Create a matrix filled with a single value
ce.box(['Reshape', 0, ['Tuple', 3, 3]]).evaluate();
// → [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Reshape to scalar (takes first element)
ce.box(['Reshape', ['List', 5, 10, 15], ['Tuple']]).evaluate();
// → 5
```

### Transpose

`Transpose` swaps rows and columns (or specified axes):

```js example
ce.box(['Transpose', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → [[1, 4], [2, 5], [3, 6]]

// Transpose of a scalar is itself
ce.box(['Transpose', 42]).evaluate();
// → 42
```

**LaTeX:** Use superscript `T` for transpose:

```js example
ce.parse('\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix}^T').evaluate();
// → [[1, 4], [2, 5], [3, 6]]

// Or with a named matrix
ce.parse('A^T');  // → ["Transpose", "A"]
```

### Conjugate Transpose

For complex matrices, `ConjugateTranspose` transposes and conjugates each element:

```js example
ce.box(['ConjugateTranspose', ['List',
  ['List', ['Complex', 1, 2], ['Complex', 3, 4]],
  ['List', ['Complex', 5, 6], ['Complex', 7, 8]]
]]).evaluate();
// → [[(1 - 2i), (5 - 6i)], [(3 - 4i), (7 - 8i)]]
```

**LaTeX:** Use superscript `*`, `†` (dagger), or `H` (Hermitian):

```js example
ce.parse('A^*');   // → ["ConjugateTranspose", "A"]
ce.parse('A^\\dagger');  // → ["ConjugateTranspose", "A"]
```

## Working with Diagonals

The `Diagonal` function has bidirectional behavior:

### Extract Diagonal from Matrix

```js example
ce.box(['Diagonal', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6],
  ['List', 7, 8, 9]
]]).evaluate();
// → [1, 5, 9]
```

### Create Diagonal Matrix from Vector

```js example
ce.box(['Diagonal', ['List', 1, 2, 3]]).evaluate();
// → [[1, 0, 0], [0, 2, 0], [0, 0, 3]]

// Create an identity matrix
ce.box(['Diagonal', ['List', 1, 1, 1]]).evaluate();
// → [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
```

## Matrix Computations

### Determinant

The determinant is defined for square matrices:

```js example
ce.box(['Determinant', ['List',
  ['List', 1, 2],
  ['List', 3, 4]
]]).evaluate();
// → -2

// Symbolic determinant
ce.box(['Determinant', ['List',
  ['List', 'a', 'b'],
  ['List', 'c', 'd']
]]).evaluate();
// → a*d - b*c
```

**LaTeX:** Use `vmatrix` environment or `\det` command:

```js example
// Using vmatrix (vertical bars denote determinant)
ce.parse('\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}').evaluate();
// → -2

// Using \det command
ce.parse('\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}').evaluate();
// → a*d - b*c

// Symbolic determinant
ce.parse('\\det(A)');  // → ["Determinant", "A"]
```

### Trace

The trace is the sum of diagonal elements:

```js example
ce.box(['Trace', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6],
  ['List', 7, 8, 9]
]]).evaluate();
// → 15  (1 + 5 + 9)
```

**LaTeX:** Use `\operatorname{tr}` or `\mathrm{tr}`:

```js example
ce.parse('\\operatorname{tr}\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{pmatrix}').evaluate();
// → 15

ce.parse('\\operatorname{tr}(A)');  // → ["Trace", "A"]
```

### Inverse

```js example
ce.box(['Inverse', ['List',
  ['List', 1, 2],
  ['List', 3, 4]
]]).evaluate();
// → [[-2, 1], [1.5, -0.5]]

// Inverse of a scalar is its reciprocal
ce.box(['Inverse', 4]).evaluate();
// → 0.25
```

**LaTeX:** Use superscript `-1`:

```js example
ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}^{-1}').evaluate();
// → [[-2, 1], [1.5, -0.5]]

ce.parse('A^{-1}');  // → ["Inverse", "A"]
```

### Norm

The `Norm` function computes various norms for vectors and matrices.

**Vector Norms:**

```js example
// L2 norm (Euclidean, default): √(|3|² + |4|²) = 5
ce.box(['Norm', ['List', 3, 4]]).evaluate();
// → 5

// L1 norm: |3| + |-4| = 7
ce.box(['Norm', ['List', 3, -4], 1]).evaluate();
// → 7

// L-infinity norm: max(|3|, |-4|) = 4
ce.box(['Norm', ['List', 3, -4], 'Infinity']).evaluate();
// → 4

// General Lp norm: (|3|³ + |4|³)^(1/3)
ce.box(['Norm', ['List', 3, 4], 3]).evaluate();
// → ≈4.498
```

**Matrix Norms:**

```js example
// Frobenius norm (default): √(1² + 2² + 3² + 4²) = √30
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();
// → √30 ≈ 5.477

// L1 norm: max column sum = max(4, 6) = 6
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]], 1]).evaluate();
// → 6

// L-infinity norm: max row sum = max(3, 7) = 7
ce.box(['Norm', ['List', ['List', 1, 2], ['List', 3, 4]], 'Infinity']).evaluate();
// → 7
```

**Scalar:** The norm of a scalar is its absolute value.

```js example
ce.box(['Norm', -5]).evaluate();
// → 5
```

## Eigenvalues and Eigenvectors

Eigenvalues and eigenvectors are fundamental concepts in linear algebra, used
in applications ranging from principal component analysis to solving differential
equations.

### Computing Eigenvalues

The `Eigenvalues` function returns the eigenvalues of a square matrix:

```js example
// Diagonal matrix: eigenvalues are the diagonal elements
ce.box(['Eigenvalues', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → [2, 3]

// General 2×2 matrix
ce.box(['Eigenvalues', ['List',
  ['List', 4, 2],
  ['List', 1, 3]
]]).evaluate();
// → [5, 2]

// 3×3 matrix
ce.box(['Eigenvalues', ['List',
  ['List', 1, 2, 0],
  ['List', 0, 3, 0],
  ['List', 2, -4, 2]
]]).evaluate();
// → [3, 2, 1]
```

### Computing Eigenvectors

The `Eigenvectors` function returns the eigenvectors corresponding to each
eigenvalue:

```js example
// Eigenvectors of a diagonal matrix are the standard basis vectors
ce.box(['Eigenvectors', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → [[1, 0], [0, 1]]

// General matrix eigenvectors
ce.box(['Eigenvectors', ['List',
  ['List', 4, 2],
  ['List', 1, 3]
]]).evaluate();
// → [[0.894, 0.447], [-0.707, 0.707]]
```

### Getting Both at Once

Use `Eigen` to compute both eigenvalues and eigenvectors in a single operation:

```js example
const result = ce.box(['Eigen', ['List',
  ['List', 2, 0],
  ['List', 0, 3]
]]).evaluate();
// → Dictionary with 'Eigenvalues' and 'Eigenvectors' keys

// Access the components
ce.box(['At', result, 'Eigenvalues']).evaluate();
// → [2, 3]

ce.box(['At', result, 'Eigenvectors']).evaluate();
// → [[1, 0], [0, 1]]
```

### Practical Example: Diagonalization

A matrix A can be diagonalized as A = PDP⁻¹ where D is a diagonal matrix of
eigenvalues and P is the matrix of eigenvectors:

```js example
const A = ['List',
  ['List', 4, 2],
  ['List', 1, 3]
];

// Get eigenvalues and eigenvectors
const eigenvalues = ce.box(['Eigenvalues', A]).evaluate();
// → [5, 2]

const eigenvectors = ce.box(['Eigenvectors', A]).evaluate();
// → [[0.894, 0.447], [-0.707, 0.707]]

// The eigenvalues form the diagonal of D
const D = ce.box(['Diagonal', eigenvalues]).evaluate();
// → [[5, 0], [0, 2]]
```

## Matrix Decompositions

Matrix decompositions factor a matrix into products of simpler matrices. They are
fundamental tools for solving linear systems, computing eigenvalues, and performing
numerical computations efficiently.

### LU Decomposition

LU decomposition factors a matrix A into a lower triangular matrix L and an upper
triangular matrix U, with a permutation matrix P for numerical stability:

```js example
// LU decomposition returns [P, L, U] where PA = LU
const result = ce.box(['LUDecomposition', ['List',
  ['List', 2, 3, 1],
  ['List', 4, 7, 5],
  ['List', 6, 18, 10]
]]).evaluate();

// Extract components
const [P, L, U] = result.ops;
// P: permutation matrix
// L: lower triangular with 1s on diagonal
// U: upper triangular
```

**Use Cases:**
- Solving systems of linear equations (Ax = b)
- Computing matrix determinants efficiently
- Matrix inversion

### QR Decomposition

QR decomposition factors a matrix A into an orthogonal matrix Q and an upper
triangular matrix R:

```js example
// QR decomposition returns [Q, R] where A = QR
const result = ce.box(['QRDecomposition', ['List',
  ['List', 1, 2],
  ['List', 3, 4],
  ['List', 5, 6]
]]).evaluate();

const [Q, R] = result.ops;
// Q: orthogonal matrix (Q^T × Q = I)
// R: upper triangular matrix
```

**Use Cases:**
- Solving least squares problems
- Computing eigenvalues (QR algorithm)
- Orthogonalization of vectors

### Cholesky Decomposition

Cholesky decomposition factors a symmetric positive-definite matrix A into
the product of a lower triangular matrix L and its transpose:

```js example
// Cholesky decomposition returns L where A = L × L^T
const L = ce.box(['CholeskyDecomposition', ['List',
  ['List', 4, 2],
  ['List', 2, 5]
]]).evaluate();
// → [[2, 0], [1, 2]]

// Verify: L × L^T = A
ce.box(['MatrixMultiply', L, ['Transpose', L]]).evaluate();
// → [[4, 2], [2, 5]]
```

**Requirements:** The input matrix must be symmetric and positive-definite.
The function returns an error for matrices that don't meet these criteria.

**Use Cases:**
- Efficient solving of symmetric positive-definite systems
- Monte Carlo simulations
- Kalman filters

### Singular Value Decomposition (SVD)

SVD factors any matrix A into three matrices: U (left singular vectors),
Σ (diagonal matrix of singular values), and V (right singular vectors):

```js example
// SVD returns [U, Σ, V] where A = U × Σ × V^T
const result = ce.box(['SVD', ['List',
  ['List', 1, 2],
  ['List', 3, 4],
  ['List', 5, 6]
]]).evaluate();

const [U, Sigma, V] = result.ops;
// U: m×m orthogonal matrix
// Σ: m×n diagonal matrix of singular values
// V: n×n orthogonal matrix
```

**Use Cases:**
- Principal Component Analysis (PCA)
- Image compression
- Pseudoinverse computation
- Dimensionality reduction
- Solving ill-conditioned linear systems

### Practical Example: Solving Linear Systems with LU

Using LU decomposition to solve Ax = b is more efficient than computing A⁻¹
directly, especially when solving multiple systems with the same matrix A:

```js example
const A = ['List',
  ['List', 2, 1, 1],
  ['List', 4, 3, 3],
  ['List', 8, 7, 9]
];
const b = ['List', 4, 10, 24];

// Get LU decomposition
const [P, L, U] = ce.box(['LUDecomposition', A]).evaluate().ops;

// The solution process:
// 1. Solve Ly = Pb for y (forward substitution)
// 2. Solve Ux = y for x (back substitution)
// This is implemented internally when using Inverse
```

## Matrix Multiplication

Use `MatrixMultiply` to perform matrix multiplication. The function supports
multiple combinations of operands:

### Matrix × Matrix

```js example
// 2×3 matrix times 3×2 matrix → 2×2 matrix
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', ['List', 7, 8], ['List', 9, 10], ['List', 11, 12]]
]).evaluate();
// → [[58, 64], [139, 154]]

// Symbolic matrix multiplication
ce.box(['MatrixMultiply',
  ['List', ['List', 'a', 'b'], ['List', 'c', 'd']],
  ['List', ['List', 'e', 'f'], ['List', 'g', 'h']]
]).evaluate();
// → [[a*e + b*g, a*f + b*h], [c*e + d*g, c*f + d*h]]
```

### Matrix × Vector

When multiplying a matrix by a vector, the vector is treated as a column vector:

```js example
// 2×3 matrix times 3-vector → 2-vector
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', 1, 2, 3]
]).evaluate();
// → [14, 32]
```

### Vector × Matrix

When a vector multiplies a matrix, it's treated as a row vector:

```js example
// 2-vector times 2×3 matrix → 3-vector
ce.box(['MatrixMultiply',
  ['List', 1, 2],
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]]
]).evaluate();
// → [9, 12, 15]
```

### Dot Product (Vector × Vector)

Multiplying two vectors of the same length computes their dot product:

```js example
ce.box(['MatrixMultiply',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]).evaluate();
// → 32  (1*4 + 2*5 + 3*6)
```

### Dimension Validation

`MatrixMultiply` validates that dimensions are compatible and returns an error
if they don't match:

```js example
// 2×2 matrix times 3-vector: incompatible (2 ≠ 3)
ce.box(['MatrixMultiply',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', 1, 2, 3]
]).evaluate();
// → Error("incompatible-dimensions", "2 vs 3")
```

### LaTeX Serialization

`MatrixMultiply` expressions serialize using the `\cdot` notation:

```js example
const A = ['Matrix', ['List', ['List', 1, 2], ['List', 3, 4]]];
const B = ['Matrix', ['List', ['List', 5, 6], ['List', 7, 8]]];
ce.box(['MatrixMultiply', A, B]).latex;
// → "\begin{pmatrix}1 & 2\\ 3 & 4\end{pmatrix} \cdot \begin{pmatrix}5 & 6\\ 7 & 8\end{pmatrix}"
```

## Matrix Addition and Scalar Broadcasting

The `Add` function supports element-wise addition of matrices and vectors,
as well as scalar broadcasting.

### Matrix + Matrix

Add two matrices of the same shape element-wise:

```js example
// 2×2 matrix + 2×2 matrix
ce.box(['Add',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[6, 8], [10, 12]]

// Symbolic matrix addition
ce.box(['Add',
  ['List', ['List', 'a', 'b'], ['List', 'c', 'd']],
  ['List', ['List', 1, 2], ['List', 3, 4]]
]).evaluate();
// → [[a + 1, b + 2], [c + 3, d + 4]]
```

### Scalar + Matrix

Add a scalar to every element of a matrix:

```js example
// Scalar + 2×2 matrix
ce.box(['Add', 10, ['List', ['List', 1, 2], ['List', 3, 4]]]).evaluate();
// → [[11, 12], [13, 14]]

// Multiple operands: scalar + matrix + matrix
ce.box(['Add',
  ['List', ['List', 1, 2], ['List', 3, 4]],
  10,
  ['List', ['List', 5, 6], ['List', 7, 8]]
]).evaluate();
// → [[16, 18], [20, 22]]
```

### Vector Addition

Vectors also support element-wise addition and scalar broadcasting:

```js example
// Vector + vector
ce.box(['Add', ['List', 1, 2, 3], ['List', 4, 5, 6]]).evaluate();
// → [5, 7, 9]

// Scalar + vector
ce.box(['Add', ['List', 7, 11], 3]).evaluate();
// → [10, 14]
```

### Dimension Validation

`Add` validates that all matrices have compatible dimensions:

```js example
// 2×3 matrix + 2×2 matrix: incompatible shapes
ce.box(['Add',
  ['List', ['List', 1, 2, 3], ['List', 4, 5, 6]],
  ['List', ['List', 1, 2], ['List', 3, 4]]
]).evaluate();
// → Error("incompatible-dimensions", "2x2 vs 2x3")
```

## Accessing Elements

Use `At` to access elements by index (1-based):

```js example
const M = ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
];

// Access element at row 2, column 3
ce.box(['At', M, 2, 3]).evaluate();
// → 6

// Negative indices count from the end
ce.box(['At', M, -1, -1]).evaluate();
// → 6 (last row, last column)
```

## Practical Examples

### Creating Special Matrices

```js example
// Identity matrix (3×3)
ce.box(['IdentityMatrix', 3]).evaluate();
// → [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

// Zero matrix (3×3) - square
ce.box(['ZeroMatrix', 3]).evaluate();
// → [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Zero matrix (2×4) - rectangular
ce.box(['ZeroMatrix', 2, 4]).evaluate();
// → [[0, 0, 0, 0], [0, 0, 0, 0]]

// Ones matrix (2×3)
ce.box(['OnesMatrix', 2, 3]).evaluate();
// → [[1, 1, 1], [1, 1, 1]]

// Matrix filled with a specific value using Reshape
ce.box(['Reshape', 7, ['Tuple', 2, 4]]).evaluate();
// → [[7, 7, 7, 7], [7, 7, 7, 7]]

// Diagonal matrix from vector
ce.box(['Diagonal', ['List', 1, 2, 3]]).evaluate();
// → [[1, 0, 0], [0, 2, 0], [0, 0, 3]]
```

### Matrix Properties

```js example
const M = ['List',
  ['List', 'a', 'b'],
  ['List', 'c', 'd']
];

// Check if square: compare shape dimensions
const shape = ce.box(['Shape', M]).evaluate();
// → (2, 2) - equal dimensions means square
```

### Solving Linear Systems

The most direct way to solve systems of linear equations is using the `solve()`
method on a system parsed from LaTeX `\begin{cases}` notation:

```js example
// Solve the system: x + y = 70, 2x - 4y = 80
const system = ce.parse('\\begin{cases}x+y=70\\\\2x-4y=80\\end{cases}');
const result = system.solve(['x', 'y']);

console.log(result.x.json);  // 60
console.log(result.y.json);  // 10
```

The `solve()` method returns an object mapping variable names to their solutions,
or `null` if the system has no unique solution (inconsistent or under-determined).

```js example
// 3x3 system: x + y + z = 6, 2x + y - z = 1, x - y + 2z = 5
const system3 = ce.parse('\\begin{cases}x+y+z=6\\\\2x+y-z=1\\\\x-y+2z=5\\end{cases}');
const result3 = system3.solve(['x', 'y', 'z']);
// → { x: 1, y: 2, z: 3 }

// Inconsistent system returns null
const bad = ce.parse('\\begin{cases}x+y=1\\\\x+y=2\\end{cases}');
bad.solve(['x', 'y']);  // → null

// Non-linear systems also return null
const nonlinear = ce.parse('\\begin{cases}xy=6\\\\x+y=5\\end{cases}');
nonlinear.solve(['x', 'y']);  // → null (contains product xy)
```

#### Matrix Method

Alternatively, you can solve Ax = b by multiplying both sides by A⁻¹:

```js example
// Solve: x + 2y = 5, 3x + 4y = 11
// Matrix form: [[1, 2], [3, 4]] * [x, y]ᵀ = [5, 11]ᵀ

const A = ['List', ['List', 1, 2], ['List', 3, 4]];
const b = ['List', 5, 11];

// x = A⁻¹ * b
const A_inv = ce.box(['Inverse', A]).evaluate();
// → [[-2, 1], [1.5, -0.5]]

const solution = ce.box(['MatrixMultiply', A_inv, b]).evaluate();
// → [1, 2]
// Solution: x = 1, y = 2
```

## Performance Considerations

Tensors are stored internally in an optimized format:

- **Memory efficient**: Uses flat arrays with stride calculations
- **O(1) reshaping**: `Reshape` and `Transpose` often just change metadata
- **Lazy evaluation**: Operations are computed on demand

For large matrices, avoid creating intermediate results when possible:

```js example
// Instead of multiple reshape operations, compute the final shape first
const data = ['Range', 1, 24];
ce.box(['Reshape', data, ['Tuple', 2, 3, 4]]).evaluate();
```

## Error Handling

Operations that require specific matrix properties return errors when those
properties aren't met:

```js example
// Determinant requires a square matrix
ce.box(['Determinant', ['List', 1, 2, 3]]).evaluate();
// → Error("expected-square-matrix", "[1, 2, 3]")

// Inverse requires a square matrix
ce.box(['Inverse', ['List',
  ['List', 1, 2, 3],
  ['List', 4, 5, 6]
]]).evaluate();
// → Error("expected-square-matrix", "[[1, 2, 3], [4, 5, 6]]")
```

## Serializing to LaTeX

After performing computations, you can convert results back to LaTeX for display:

```js example
const ce = new ComputeEngine();

// Create and evaluate a matrix operation
const M = ce.parse('\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}');
const inv = ce.box(['Inverse', M]).evaluate();

// Convert back to LaTeX
console.log(inv.latex);
// → "\begin{pmatrix}-2 & 1\\ \frac{3}{2} & -\frac{1}{2}\end{pmatrix}"

// Transpose example
const T = ce.box(['Transpose', M]).evaluate();
console.log(T.latex);
// → "\begin{pmatrix}1 & 3\\ 2 & 4\end{pmatrix}"

// Determinant (returns a scalar)
const det = ce.parse('\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}').evaluate();
console.log(det.latex);
// → "ad - bc"
```

### Controlling Matrix Delimiters

By default, matrices serialize with parentheses (`pmatrix`). The delimiter style
is preserved from the original parse when possible.

## See Also

- [Linear Algebra Reference](/compute-engine/reference/linear-algebra/) - Complete
  list of linear algebra functions
- [Collections Reference](/compute-engine/reference/collections/) - Working with
  lists and other collections
