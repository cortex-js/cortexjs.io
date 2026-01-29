---
title: Linear Algebra
slug: /compute-engine/guides/linear-algebra/
---

This guide covers working with vectors, matrices, and tensors in the Compute
Engine. You'll learn how to create, manipulate, and perform operations on
multidimensional arrays.

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

### Conjugate Transpose

For complex matrices, `ConjugateTranspose` transposes and conjugates each element:

```js example
ce.box(['ConjugateTranspose', ['List',
  ['List', ['Complex', 1, 2], ['Complex', 3, 4]],
  ['List', ['Complex', 5, 6], ['Complex', 7, 8]]
]]).evaluate();
// → [[(1 - 2i), (5 - 6i)], [(3 - 4i), (7 - 8i)]]
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
// Zero matrix (3×3)
ce.box(['Reshape', 0, ['Tuple', 3, 3]]).evaluate();
// → [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

// Identity matrix (3×3)
ce.box(['Diagonal', ['List', 1, 1, 1]]).evaluate();
// → [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

// Matrix filled with a value
ce.box(['Reshape', 7, ['Tuple', 2, 4]]).evaluate();
// → [[7, 7, 7, 7], [7, 7, 7, 7]]
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

To solve Ax = b, multiply both sides by A⁻¹:

```js example
// Solve: x + 2y = 5, 3x + 4y = 11
// Matrix form: [[1, 2], [3, 4]] * [x, y]ᵀ = [5, 11]ᵀ

const A = ['List', ['List', 1, 2], ['List', 3, 4]];
const b = ['List', 5, 11];

// x = A⁻¹ * b (conceptually - matrix multiplication not yet implemented)
const A_inv = ce.box(['Inverse', A]).evaluate();
// → [[-2, 1], [1.5, -0.5]]
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

## See Also

- [Linear Algebra Reference](/compute-engine/reference/linear-algebra/) - Complete
  list of linear algebra functions
- [Collections Reference](/compute-engine/reference/collections/) - Working with
  lists and other collections
