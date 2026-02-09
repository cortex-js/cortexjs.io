---
title: Custom Functions and Symbols
slug: /compute-engine/guides/augmenting/
---

The [MathJSON Standard Library](/compute-engine/standard-library/) is a
collection of definitions for **symbols** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own symbols.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When a symbol such as `Pi` or `Sin` is encountered in an expression, the 
Compute Engine will look up its definition in the set of known 
symbols, including the Standard Library.

### Automatic Declaration

If a matching definition is found, it will be bound to the symbol and 
used later to evaluate the expression.

If no definition is found, an automatic declaration will be made of the
symbol with a type `unknown` or a more specific type if the context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the symbol, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` method.

### Declarations are Scoped

The declaration of a symbol is done within a **lexical scope**. A scope 
is a hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
ce.parse("m").value.print();
// ➔ 42
```

**Note**: the assignment expression must be evaluated to take effect.

To define a new function $f$ that multiplies its argument by $2$, use
the following LaTeX expression:

```js
ce.parse("f(x) := 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```


The `\mapsto` operator is an alternative syntax to define a function:

```js
ce.parse("f := x \\mapsto 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```

**To define multiletter symbols**, use the `\operatorname{}` command:

```js
ce.parse('\\operatorname{double}(x) := 2x').evaluate().print();
ce.parse('\\operatorname{double}(3)').evaluate().print();
// ➔ 6
```

**Note**: you can also use the `\mathrm{}` or `\mathit{}` commands to wrap
multiletter symbols.

The LaTeX identifiers are mapped to MathJSON symbols. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON symbol `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## Explicit Declarations

**To have more control over the definition of a symbol** use
the `ce.declare()` method.

When declaring a symbol, you can specify the type of the symbol, its value
and other properties.

```js
// Declaring a symbol "m"
ce.declare("m",  "integer");

// Declaring a function "f"
ce.declare("f", {
  signature: "number -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Declaring a Symbol

**To declare a symbol** use the `ce.declare()` method with the name of the
symbol as the first argument and a type as the second argument.

```js
ce.declare("n", "integer");
```

<ReadMore path="/compute-engine/guides/types" >The type specifies the 
valid values of the symbol. For example, `boolean`, `integer`, `rational`, `function`, `string`, etc. Learn more about **types**.<Icon name="chevron-right-bold" /></ReadMore>

Alternatively, you can provide an object literal with the additional properties
`value`, `type`, `isConstant`, and more.

```js
ce.declare("m", {
  type: "integer",
  value: 42,
});
```

If you do not provide a `type` property for a symbol, the type will be
inferred from the value of the symbol. If no type and no value are
provided, the type of the symbol will be `unknown`.


As a shorthand, a symbol can be declared by assigning it a value using `ce.assign()`:

```js
ce.assign("m", 42);
```

If the symbol was not previously defined, this is equivalent to:

```js
ce.declare("m", { value: 42 });
```

Alternatively, you can set the value of a symbol using the `value` property:

```js
ce.box("m").value = 42;
```

**To prevent the value of a symbol from being changed**, set the `isConstant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  isConstant: true,
});
```


### Declaring a Function

**To declare a function**, associate an `evaluate` handler, which 
is the body of the function, with a symbol.

```js
ce.declare("double", { 
  evaluate: ce.parse("x \\mapsto 2x") 
});
```

:::caution[Caution]
The first argument of `declare()` is a MathJSON symbol, not a LaTeX command.
For example, use `double` instead of `\operatorname{double}`.
:::

The evaluate handler can be either a MathJSON expression as above or 
a JavaScript function.

```js
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

The signature of the `evaluate` handler is `(args[], options)`, where:

- `args`: an array of the arguments that have been applied to the function. Each
  argument is a boxed expression. The array may be empty if there are no
  arguments.
- `options`: an object literal which includes an `engine` property that is the
  Compute Engine instance that is evaluating the expression and a `numericApproximation` property that is true if the result should be a numeric approximation.

Since `args` is an array, you can use destructuring to get the arguments:

```js
ce.declare("double", { evaluate: (args) => args[0].mul(2) });

// or
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

In addition to the `evaluate` handler the function definition can include
a `signature` type that describes the arguments and return value of the
function.

```js
ce.declare("double", {
  signature: "number -> number",
  evaluate: ([x]) => x.mul(2),
});
```

See `FunctionDefinition` for more details on the other handlers and
properties that can be provided when defining a function.

**To define a function without specifying a body for it**, specify
the signature of the function as the second argument of `ce.declare()` or
use the `"function"` type.

```js
ce.declare("double", "function");
```



Functions that do not have an evaluate handler or a function literal as a 
value remain unchanged when evaluated.

You can set the body of the function later using `ce.assign()`:


When using `ce.assign()` to define a function, the value can be a JavaScript
function, a MathJSON expression or a LaTeX expression.

```js
ce.assign("double", ([x]) => x.mul(2));

ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);

ce.assign("double",ce.parse("x \\mapsto 2x"));
```


<ReadMore path="/compute-engine/reference/functions/" >
Learn more about the standard operator to manipulate **functions**. <Icon name="chevron-right-bold" />
</ReadMore>

### Declaring a Sequence with Subscript Evaluation

Mathematical sequences like Fibonacci numbers ($F_n$), indexed coefficients
($a_n$), or matrix elements ($M_{i,j}$) are commonly written using subscript
notation. You can define custom evaluation logic for subscripted symbols using
the `subscriptEvaluate` handler.

```js
// Define a sequence of squares: S_n = n²
ce.declare("S", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(n * n);
  },
});

ce.parse("S_{5}").evaluate();   // → 25
ce.parse("S_3").evaluate();     // → 9
ce.parse("S_n").evaluate();     // → stays as Subscript(S, n)
```

The `subscriptEvaluate` handler receives:
- `subscript`: the subscript expression (already evaluated)
- `options`: an object with `engine` (the ComputeEngine) and `numericApproximation`
  (true when called from `.N()`)

**Return `undefined`** to keep the expression symbolic. This is useful when the
subscript contains unknowns or is outside the valid range.

```js
// Fibonacci sequence with memoization
const fibMemo = new Map();
const fib = (n) => {
  if (n <= 1) return n;
  if (fibMemo.has(n)) return fibMemo.get(n);
  const result = fib(n - 1) + fib(n - 2);
  fibMemo.set(n, result);
  return result;
};

ce.declare("F", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(fib(n));
  },
});

ce.parse("F_{10}").evaluate();  // → 55
ce.parse("F_n").evaluate();     // → Subscript(F, n) - stays symbolic
```

**Multi-index subscripts** (like matrix elements) receive the subscript as a
`Tuple` expression:

```js
import { isBoxedFunction } from '@cortex-js/compute-engine';

const matrix = [[1,2,3], [4,5,6], [7,8,9]];

ce.declare("M", {
  subscriptEvaluate: (subscript, { engine }) => {
    if (isBoxedFunction(subscript) && subscript.operator === "Tuple") {
      const [i, j] = subscript.ops;
      const row = matrix[i.re - 1];  // 1-indexed
      if (row && row[j.re - 1] !== undefined) {
        return engine.number(row[j.re - 1]);
      }
    }
    return undefined;
  },
});

ce.parse("M_{2,3}").evaluate();  // → 6
```

Subscripted expressions with `subscriptEvaluate` have type `number` and can be
used in arithmetic:

```js
ce.parse("S_{5} + S_{3}").evaluate();  // → 34 (25 + 9)
ce.parse("2 * F_{10}").evaluate();     // → 110 (2 × 55)
```

### Declarative Sequence Definitions

For common mathematical sequences defined by recurrence relations, the
`declareSequence()` method provides a simpler declarative API:

```js
// Fibonacci sequence: F_n = F_{n-1} + F_{n-2}, with F_0 = 0, F_1 = 1
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

ce.parse('F_{10}').evaluate();  // → 55
ce.parse('F_{20}').evaluate();  // → 6765
```

The `SequenceDefinition` object accepts:

| Property | Type | Description |
|----------|------|-------------|
| `base` | `Record<number, number \| BoxedExpression>` | **Required.** Base cases as index → value mapping |
| `recurrence` | `string \| BoxedExpression` | **Required.** Recurrence relation (LaTeX string or expression) |
| `variable` | `string` | Index variable name (default: `'n'`) |
| `memoize` | `boolean` | Cache computed values (default: `true`) |
| `domain` | `{ min?: number, max?: number }` | Valid index range |

**Examples:**

```js
// Arithmetic sequence: a_n = a_{n-1} + 2
ce.declareSequence('A', {
  base: { 0: 1 },
  recurrence: 'A_{n-1} + 2',
});
ce.parse('A_{5}').evaluate();  // → 11

// Factorial via recurrence: n! = n × (n-1)!
ce.declareSequence('H', {
  base: { 0: 1 },
  recurrence: 'n \\cdot H_{n-1}',
});
ce.parse('H_{5}').evaluate();  // → 120

// Triangular numbers: T_n = T_{n-1} + n
ce.declareSequence('T', {
  base: { 0: 0 },
  recurrence: 'T_{n-1} + n',
});
ce.parse('T_{5}').evaluate();  // → 15

// Using a custom index variable
ce.declareSequence('W', {
  variable: 'k',
  base: { 0: 1 },
  recurrence: 'W_{k-1} + k',
});
ce.parse('W_{5}').evaluate();  // → 16

// With domain constraints (only valid for n ≥ 1)
ce.declareSequence('X', {
  base: { 1: 1 },
  recurrence: 'X_{n-1} + 1',
  domain: { min: 1 },
});
ce.parse('X_{5}').evaluate();  // → 5
ce.parse('X_{0}').evaluate();  // → stays symbolic (outside domain)
```

**Symbolic behavior:** When the subscript is symbolic or non-integer, the
expression stays symbolic:

```js
ce.parse('F_k').evaluate();     // → Subscript(F, k) - stays symbolic
ce.parse('F_{1.5}').evaluate(); // → Subscript(F, 1.5) - stays symbolic
```

**Memoization:** By default, computed values are cached for efficiency. This is
especially important for sequences like Fibonacci that have exponential
complexity without memoization:

```js
// Fast even for large indices thanks to memoization
ce.parse('F_{30}').evaluate();  // → 832040 (computed quickly)
```

To disable memoization (e.g., for memory-constrained environments):

```js
ce.declareSequence('O', {
  base: { 0: 1 },
  recurrence: 'O_{n-1} + 1',
  memoize: false,
});
```

### LaTeX-Based Sequence Definitions

Sequences can also be defined using natural LaTeX assignment notation. This is
especially useful in interactive environments or when working with mathematical
notation directly:

```js
// Arithmetic sequence via LaTeX
ce.parse('L_0 := 1').evaluate();
ce.parse('L_n := L_{n-1} + 2').evaluate();
ce.parse('L_{5}').evaluate();  // → 11

// Fibonacci via LaTeX
ce.parse('F_0 := 0').evaluate();
ce.parse('F_1 := 1').evaluate();
ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.parse('F_{10}').evaluate();  // → 55

// Factorial via LaTeX
ce.parse('D_0 := 1').evaluate();
ce.parse('D_n := n \\cdot D_{n-1}').evaluate();
ce.parse('D_{5}').evaluate();  // → 120
```

**Order independence:** Base cases and recurrence can be defined in any order.
The sequence is finalized when both a base case and a recurrence relation are
present:

```js
// Recurrence first, then base case
ce.parse('K_n := K_{n-1} + 1').evaluate();
ce.parse('K_0 := 0').evaluate();  // Sequence finalized here
ce.parse('K_{5}').evaluate();  // → 5
```

**How it works:** The system detects sequence definitions by checking if the
right-hand side contains self-references (like `L_{n-1}` when defining `L_n`).
Assignments without self-references are treated as function definitions instead:

```js
// This defines a function f(x) = x², not a sequence
ce.parse('f_x := x^2').evaluate();
ce.parse('f_{3}').evaluate();  // → 9
```

### Sequence Status and Introspection

You can query the status of sequence definitions and inspect defined sequences:

```js
// Check if a sequence is fully defined
ce.parse('F_0 := 0').evaluate();
ce.getSequenceStatus('F');
// → { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }

ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.getSequenceStatus('F');
// → { status: 'complete', hasBase: true, hasRecurrence: true, baseIndices: [0] }

// For non-sequences:
ce.getSequenceStatus('x');
// → { status: 'not-a-sequence', hasBase: false, hasRecurrence: false }
```

**Introspection methods** let you examine and manage defined sequences:

```js
// Get detailed information about a sequence
ce.getSequence('F');
// → { name: 'F', variable: 'n', baseIndices: [0, 1], memoize: true, cacheSize: 5 }

// List all defined sequences
ce.listSequences();  // → ['F', 'A', 'T']

// Check if a symbol is a sequence
ce.isSequence('F');  // → true
ce.isSequence('x');  // → false

// Manage memoization cache
ce.getSequenceCache('F');  // → Map { 2 => 1, 3 => 2, 5 => 5, ... }
ce.clearSequenceCache('F');  // Clear cache for specific sequence
ce.clearSequenceCache();     // Clear all sequence caches
```

### Generating Sequence Terms

Generate a list of sequence terms with `getSequenceTerms()`:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Get terms from index 0 to 10 (inclusive)
ce.getSequenceTerms('F', 0, 10);
// → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// With a step parameter (every other term)
ce.getSequenceTerms('F', 0, 10, 2);
// → [0, 1, 3, 8, 21, 55]

// Starting from a non-zero index
ce.getSequenceTerms('F', 5, 10);
// → [5, 8, 13, 21, 34, 55]
```

### Sum and Product over Sequences

`Sum` and `Product` work seamlessly with user-defined sequences:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Sum of Fibonacci terms from k=0 to 10
ce.parse('\\sum_{k=0}^{10} F_k').evaluate();  // → 143

// Product over sequence terms
ce.declareSequence('A', {
  base: { 1: 1 },
  recurrence: 'A_{n-1} + 1',
});
ce.parse('\\prod_{k=1}^{5} A_k').evaluate();  // → 120 (factorial)
```

### OEIS Integration

The [Online Encyclopedia of Integer Sequences (OEIS)](https://oeis.org) contains
over 350,000 integer sequences. You can look up sequences and verify your
definitions against known mathematical sequences:

```js
// Look up a sequence by its terms
const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
// → [{ id: 'A000045', name: 'Fibonacci numbers', terms: [...], url: '...' }]

// Each result contains:
// - id: OEIS sequence ID (e.g., 'A000045')
// - name: Sequence description
// - terms: First several terms
// - formula: Formula if available
// - url: Link to OEIS page
```

**Verify your sequences** against OEIS:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

const result = await ce.checkSequenceOEIS('F', 10);
// → {
//     matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }],
//     terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
//   }

if (result.matches.length > 0) {
  console.log(`Your sequence matches ${result.matches[0].name}!`);
}
```

**Options:**

```js
// Limit number of results
await ce.lookupOEIS([1, 2, 3, 4, 5], { maxResults: 3 });

// Set timeout (in milliseconds)
await ce.lookupOEIS([1, 2, 3, 4, 5], { timeout: 5000 });
```

> **Note:** OEIS lookups require network access to oeis.org.

## Overloading Functions

**Overloading** is the ability to define multiple functions with the same name.

**To overload a function**, use the `ce.declare()` methods.

For example, to overload the `Sqrt` function to return `NaN` for
non-real numbers, use the following code:

```js
const originalSqrtDefinition = ce.box('Sqrt').operatorDefinition!;
ce.declare('Sqrt', {
  ...originalSqrtDefinition,
  evaluate: (x, options) => {
    const y = originalSqrtDefinition.evaluate!(x, options);
    return y?.isReal ? y : ce.NaN;
  },
});
```

In general, re-declaring a function in the same scope is not allowed and 
will throw an error. However, the standard functions are in a `system` scope
so a new declaration in the `global` scope or a child scope will
override the original declaration.


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
symbols, not LaTeX commands. For example, if you have a symbol `α`, use
`alpha`, not `\alpha` 
:::

```js
ce.declare({
  m: { type: "number", value: 5 },
  f: { type: "function" },
  g: { type: "function" },
  Smallfrac: {
    signature: "(number, number) -> number",
    evaluate: ([x,y]) => x.div(y),
  },
});
```

**To assign multiple functions and symbols**, use the `ce.assign()` method with
a dictionary of values.

```js
ce.assign({
  "m": 10,
  "f": ce.parse("x \\mapsto x^2 + x + 41"),
  "g": ce.parse("t \\mapsto t^3 + t^2 + 17"),
});
```
