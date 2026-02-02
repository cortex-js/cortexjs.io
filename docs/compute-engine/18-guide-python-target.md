---
title: Python/NumPy Compilation Target
slug: /compute-engine/guides/python-target/
---

<Intro>
The Python compilation target generates NumPy-compatible Python code from mathematical expressions, enabling seamless integration with scientific Python workflows.
</Intro>

## Overview

The `PythonTarget` class compiles Compute Engine expressions to Python code that uses NumPy for numerical operations. The generated code is:
- **Vectorized**: Works with both scalars and NumPy arrays
- **Readable**: Clean, idiomatic Python code
- **Efficient**: Leverages NumPy's optimized implementations
- **Compatible**: Works with SciPy, Pandas, and other scientific Python libraries

## Basic Usage

```typescript
import { ComputeEngine, PythonTarget } from '@cortex-js/compute-engine';

const ce = new ComputeEngine();
const python = new PythonTarget();

// Compile a simple expression
const expr = ce.parse('x^2 + y^2');
const code = python.compile(expr);
console.log(code); // "x ** 2 + y ** 2"
```

## Using with expr.compile()

To use the Python target with `expr.compile()`, register it first:

```javascript
import { ComputeEngine, PythonTarget } from '@cortex-js/compute-engine';

const ce = new ComputeEngine();

// Register the Python target (only need to do this once)
ce.registerCompilationTarget('python', new PythonTarget({ includeImports: true }));

// Now you can use it throughout your code
const expr = ce.parse('\\sin(x) + \\cos(y)');
const pythonCode = expr.compile({ to: 'python' });
console.log(pythonCode.toString());
// → import numpy as np
//
//   np.sin(x) + np.cos(y)
```

## Features

### 1. Expression Compilation

Convert mathematical notation to Python code:

```typescript
const python = new PythonTarget();

// Polynomial
ce.parse('x^4 + 3x^3 + 2x^2 + x + 1');
// → "x ** 4 + 3 * x ** 3 + 2 * x ** 2 + x + 1"

// Trigonometric
ce.parse('\\sin(x) + \\cos(y)');
// → "np.sin(x) + np.cos(y)"

// Square root
ce.parse('\\sqrt{x^2 + y^2}');
// → "np.sqrt(x ** 2 + y ** 2)"

// Constants
ce.parse('2\\pi r');
// → "2 * np.pi * r"
```

### 2. Function Generation

Generate complete Python functions:

```typescript
const python = new PythonTarget({ includeImports: true });

const expr = ce.parse('\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}');
const func = python.compileFunction(
  expr,
  'euclidean_distance',
  ['x_1', 'y_1', 'x_2', 'y_2'],
  'Calculate Euclidean distance between two points'
);
```

Generates:

```python
import numpy as np

def euclidean_distance(x_1, y_1, x_2, y_2):
    """Calculate Euclidean distance between two points"""
    return np.sqrt((x_2 - x_1) ** 2 + (y_2 - y_1) ** 2)
```

### 3. Lambda Functions

Create Python lambda expressions:

```typescript
const expr = ce.parse('x^2 + 2x + 1');
const lambda = python.compileLambda(expr, ['x']);
// → "lambda x: x ** 2 + 2 * x + 1"
```

### 4. Vectorized Functions

Generate NumPy-vectorized functions:

```typescript
const expr = ce.parse('\\sin(x) * \\cos(x)');
const func = python.compileVectorized(expr, 'trig_product', ['x']);
```

Generates:

```python
import numpy as np

def _trig_product_scalar(x):
    return np.sin(x) * np.cos(x)

# Vectorized version
trig_product = np.vectorize(_trig_product_scalar)
```

## Supported Functions

### Trigonometric
- `sin`, `cos`, `tan` → `np.sin`, `np.cos`, `np.tan`
- `arcsin`, `arccos`, `arctan` → `np.arcsin`, `np.arccos`, `np.arctan`
- `sinh`, `cosh`, `tanh` → `np.sinh`, `np.cosh`, `np.tanh`

### Exponential & Logarithmic
- `exp` → `np.exp`
- `ln` → `np.log`
- `log10` → `np.log10`
- `log2` → `np.log2`

### Power & Roots
- `x^n` → `x ** n`
- `sqrt` → `np.sqrt`
- `power` → `np.power`

### Rounding
- `abs` → `np.abs`
- `floor` → `np.floor`
- `ceiling` → `np.ceil`
- `round` → `np.round`

### Statistics
- `sum` → `np.sum`
- `mean` → `np.mean`
- `median` → `np.median`
- `std` → `np.std`

### Linear Algebra
- `dot` → `np.dot`
- `cross` → `np.cross`
- `norm` → `np.linalg.norm`
- `det` → `np.linalg.det`
- `inv` → `np.linalg.inv`

## Configuration Options

```typescript
new PythonTarget({
  includeImports: true,  // Add "import numpy as np" to output
  useScipy: false        // Include scipy.special for advanced functions
})
```

## Real-World Examples

### Physics: Kinematic Equation

```typescript
const expr = ce.parse('u \\cdot t + \\frac{1}{2} a \\cdot t^2');
const kinematics = python.compileFunction(
  expr,
  'position',
  ['u', 'a', 't'],
  'Position with initial velocity u, acceleration a, at time t'
);
```

Generates:

```python
import numpy as np

def position(u, a, t):
    """Position with initial velocity u, acceleration a, at time t"""
    return 0.5 * a * t ** 2 + t * u
```

### Mathematics: Quadratic Formula

```typescript
const expr = ce.parse('\\frac{-b + \\sqrt{b^2 - 4ac}}{2a}');
const quadratic = python.compileFunction(
  expr,
  'quadratic_root',
  ['a', 'b', 'c'],
  'Calculate one root of a quadratic equation'
);
```

Generates:

```python
import numpy as np

def quadratic_root(a, b, c):
    """Calculate one root of a quadratic equation"""
    return (-b + np.sqrt(b ** 2 + -(4 * a * c))) / (2 * a)
```

### Statistics: Gaussian Function

```typescript
const expr = ce.parse('e^{-x^2}');
const gaussian = python.compileFunction(
  expr,
  'gaussian',
  ['x'],
  'Unnormalized Gaussian function'
);
```

Generates:

```python
import numpy as np

def gaussian(x):
    """Unnormalized Gaussian function"""
    return np.e ** (-x ** 2)
```

## Use Cases

### 1. Scientific Computing
Generate NumPy code for numerical analysis and simulations:

```python
# Generated function works with arrays
import numpy as np

# ... generated function here ...

x = np.linspace(0, 10, 100)
y = gaussian(x)  # Vectorized operation
```

### 2. Machine Learning
Create feature engineering functions:

```typescript
const expr = ce.parse('\\frac{x - \\mu}{\\sigma}');
const normalize = python.compileFunction(expr, 'z_score', ['x', 'mu', 'sigma']);
// Use in ML pipeline for feature normalization
```

### 3. Data Analysis
Convert formulas to vectorized Pandas operations:

```python
import pandas as pd
# Generated function
def calculate_metric(x, y):
    return np.sqrt(x ** 2 + y ** 2)

# Use with DataFrames
df['result'] = calculate_metric(df['col1'], df['col2'])
```

### 4. Education
Show Python equivalents of mathematical notation:

```typescript
// Students see: ∑(xᵢ - μ)²/n
const expr = ce.parse('\\frac{\\sum(x - \\mu)^2}{n}');
const code = python.compile(expr);
// Students learn: np.sum((x - mu) ** 2) / n
```

### 5. Code Generation
Automated function creation from specifications:

```typescript
// Read formulas from config/database
const formulas = loadFormulas();
formulas.forEach(formula => {
  const expr = ce.parse(formula.latex);
  const code = python.compileFunction(expr, formula.name, formula.params);
  writeToFile(`generated/${formula.name}.py`, code);
});
```

## Integration Examples

### With Jupyter Notebooks

```python
# Cell 1: Generated functions
%load generated_functions.py

# Cell 2: Use with data
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 1000)
y = gaussian(x)

plt.plot(x, y)
plt.title('Generated Gaussian Function')
plt.show()
```

### With SciPy

```typescript
// Generate function using SciPy special functions
const python = new PythonTarget({ includeImports: true, useScipy: true });
const expr = ce.parse('\\Gamma(x)');
const code = python.compile(expr);
// → Uses scipy.special.gamma
```

### Complete Pipeline

```typescript
// 1. Parse LaTeX from document
const latex = extractLatexFromDocument('paper.tex');

// 2. Compile to Python
const python = new PythonTarget({ includeImports: true });
const functions = latex.formulas.map(f =>
  python.compileFunction(ce.parse(f.equation), f.name, f.variables)
);

// 3. Generate Python module
const module = functions.join('\n\n');
fs.writeFileSync('generated_math.py', module);

// 4. Use in Python
// from generated_math import *
```

## Comparison with Other Targets

| Feature | JavaScript | GLSL | Python |
|---------|-----------|------|--------|
| **Execution** | Node.js/Browser | GPU (WebGL) | Python Runtime |
| **Use Case** | CPU Computation | Graphics/Parallel | Scientific Computing |
| **Output** | Executable Function | Shader Code (String) | Python Code (String) |
| **Performance** | Fast (JIT) | Very Fast (Parallel) | Fast (NumPy/C) |
| **Integration** | Direct in JS | WebGL Context | Import in Python |

## Best Practices

### 1. Choose the Right Target
- **JavaScript**: Browser/Node.js execution, immediate use
- **Python**: Scientific workflows, NumPy integration
- **GLSL**: GPU parallel computation, graphics

### 2. Handle Imports Properly
```typescript
// For standalone scripts
const python = new PythonTarget({ includeImports: true });

// For modules (import at top of file separately)
const python = new PythonTarget({ includeImports: false });
```

### 3. Vectorization
Generated functions work with both scalars and arrays:

```python
# Scalar
result = euclidean_distance(1, 2, 4, 6)  # Single value

# Arrays (element-wise)
x1 = np.array([1, 2, 3])
y1 = np.array([1, 2, 3])
x2 = np.array([4, 5, 6])
y2 = np.array([4, 5, 6])
result = euclidean_distance(x1, y1, x2, y2)  # Array of distances
```

### 4. Type Safety
Remember that generated Python code is untyped. Add type hints manually if needed:

```python
def euclidean_distance(x_1: float, y_1: float, x_2: float, y_2: float) -> float:
    return np.sqrt((x_2 - x_1) ** 2 + (y_2 - y_1) ** 2)
```

## Limitations

1. **Not Executable in JavaScript**: Python code must be run in a Python environment
2. **Type Information Lost**: Generated code is untyped (can add hints manually)
3. **Some Simplifications**: Expressions are canonicalized (e.g., `x/2` → `0.5 * x`)
4. **Requires NumPy**: Most functions need NumPy to be installed

## See Also

- [Compiling Expressions Guide](/compute-engine/guides/compiling/)
- [Custom Compilation Targets](/compute-engine/guides/compiling/#plugin-architecture-registering-custom-targets)
