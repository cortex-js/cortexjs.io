---
title: Sequences
slug: /compute-engine/guides/sequences/
---

<Intro>
Mathematical sequences like the Fibonacci numbers, arithmetic progressions, or
Pascal's triangle can be defined declaratively using recurrence relations.
The Compute Engine provides tools to define, evaluate, and analyze sequences.
</Intro>

Sequences are defined by specifying:
- **Base cases**: Initial values that anchor the sequence
- **Recurrence relation**: A formula expressing each term in terms of previous terms

Once defined, sequences can be evaluated at any index, used in summations and
products, and even compared against the Online Encyclopedia of Integer Sequences (OEIS).

## Defining Sequences

There are two ways to define sequences: using the `declareSequence()` method
or using LaTeX assignment notation.

### Using declareSequence()

The `declareSequence()` method provides a structured way to define sequences:

```javascript
// Fibonacci sequence: F_n = F_{n-1} + F_{n-2}
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

ce.parse('F_{10}').evaluate();
// ➔ 55

ce.parse('F_{20}').evaluate();
// ➔ 6765
```

#### Options

The `declareSequence()` method accepts the following options:

| Option | Type | Description |
|:-------|:-----|:------------|
| `base` | `Record<number, number>` | Initial values as index → value pairs |
| `recurrence` | `string \| BoxedExpression` | The recurrence formula |
| `variable` | `string` | Index variable name (default: `'n'`) |
| `memoize` | `boolean` | Enable caching of computed values (default: `true`) |
| `domain` | `{ min?: number, max?: number }` | Valid index range |

#### Examples

**Arithmetic sequence** (adding a constant):

```javascript
ce.declareSequence('A', {
  base: { 0: 1 },
  recurrence: 'A_{n-1} + 2',
});

ce.parse('A_{5}').evaluate();
// ➔ 11  (1, 3, 5, 7, 9, 11)
```

**Geometric sequence** (multiplying by a constant):

```javascript
ce.declareSequence('G', {
  base: { 0: 1 },
  recurrence: '2 \\cdot G_{n-1}',
});

ce.parse('G_{5}').evaluate();
// ➔ 32  (1, 2, 4, 8, 16, 32)
```

**Factorial via recurrence**:

```javascript
ce.declareSequence('H', {
  base: { 0: 1 },
  recurrence: 'n \\cdot H_{n-1}',
});

ce.parse('H_{5}').evaluate();
// ➔ 120
```

### Using LaTeX Assignment Notation

Sequences can also be defined naturally using LaTeX assignment syntax:

```javascript
// Define base cases
ce.parse('F_0 := 0').evaluate();
ce.parse('F_1 := 1').evaluate();

// Define recurrence
ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();

// Use the sequence
ce.parse('F_{10}').evaluate();
// ➔ 55
```

Base cases and the recurrence can be defined in any order. The sequence becomes
usable once all necessary components are present.

```javascript
// Define recurrence first
ce.parse('L_n := L_{n-1} + 2').evaluate();

// Then add base case
ce.parse('L_0 := 1').evaluate();

// Now it works
ce.parse('L_{5}').evaluate();
// ➔ 11
```

## Using Sequences

### Evaluation

Subscripted sequence symbols evaluate to their computed values:

```javascript
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Single value
ce.parse('F_{10}').evaluate();
// ➔ 55

// In expressions
ce.parse('F_{10} + F_{5}').evaluate();
// ➔ 60

// Symbolic subscripts stay symbolic
ce.parse('F_k').evaluate();
// ➔ F_k (unevaluated)
```

### Sum and Product

Sequences work with `Sum` and `Product`:

```javascript
// Sum of first 11 Fibonacci numbers
ce.parse('\\sum_{k=0}^{10} F_k').evaluate();
// ➔ 143

// Product of sequence terms
ce.parse('\\prod_{k=1}^{5} A_k').evaluate();
```

### Generating Terms

Use `getSequenceTerms()` to generate a list of terms:

```javascript
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

ce.getSequenceTerms('F', 0, 10);
// ➔ [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// With step parameter (every other term)
ce.getSequenceTerms('F', 0, 10, 2);
// ➔ [0, 1, 3, 8, 21, 55]
```

## Custom Evaluation with subscriptEvaluate

For sequences that don't fit a simple recurrence pattern, use `subscriptEvaluate`
to define a custom evaluation function:

```javascript
// Define a sequence with custom evaluation logic
ce.declare('P', {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;

    // Return nth prime number
    return engine.number(getNthPrime(n));
  },
});

ce.parse('P_{5}').evaluate();
// ➔ 11 (the 5th prime)

ce.parse('P_k').evaluate();
// ➔ P_k (stays symbolic when subscript is not numeric)
```

When `subscriptEvaluate` returns `undefined`, the expression stays symbolic.

Subscripted expressions with `subscriptEvaluate` have type `number` and can
participate in arithmetic:

```javascript
ce.parse('P_{5} + P_{3}').evaluate();
// ➔ 16 (11 + 5)
```

## Multi-Index Sequences

Sequences can have multiple indices, useful for structures like Pascal's triangle
or grid-based recurrences:

```javascript
// Pascal's Triangle: P_{n,k} = P_{n-1,k-1} + P_{n-1,k}
ce.declareSequence('P', {
  variables: ['n', 'k'],
  base: { 'n,0': 1, 'n,n': 1 },  // Pattern-based base cases
  recurrence: 'P_{n-1,k-1} + P_{n-1,k}',
  domain: { n: { min: 0 }, k: { min: 0 } },
  constraints: 'k <= n',
});

ce.parse('P_{5,2}').evaluate();
// ➔ 10

ce.parse('P_{10,5}').evaluate();
// ➔ 252
```

### Multi-Index Options

| Option | Type | Description |
|:-------|:-----|:------------|
| `variables` | `string[]` | Names of index variables (e.g., `['n', 'k']`) |
| `base` | `Record<string, number>` | Pattern-based base cases |
| `constraints` | `string` | Constraint expression (e.g., `'k <= n'`) |

### Pattern-Based Base Cases

Base case keys support patterns:

| Pattern | Matches |
|:--------|:--------|
| `'0,0'` | Only (0, 0) |
| `'n,0'` | Any (n, 0) - first column |
| `'n,n'` | Any (n, n) - diagonal |
| `'0,k'` | Any (0, k) - first row |

Exact matches take priority over patterns.

## Sequence Introspection

### Checking Sequence Status

Use `getSequenceStatus()` to check if a sequence definition is complete:

```javascript
ce.parse('F_0 := 0').evaluate();
ce.getSequenceStatus('F');
// ➔ { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }

ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.getSequenceStatus('F');
// ➔ { status: 'complete', hasBase: true, hasRecurrence: true, baseIndices: [0] }

ce.getSequenceStatus('x');
// ➔ { status: 'not-a-sequence', hasBase: false, hasRecurrence: false }
```

### Sequence Information

```javascript
// Get sequence details
ce.getSequence('F');
// ➔ { name: 'F', variable: 'n', baseIndices: [0, 1], memoize: true, cacheSize: 5 }

// List all defined sequences
ce.listSequences();
// ➔ ['F', 'A', 'H']

// Check if a symbol is a sequence
ce.isSequence('F');
// ➔ true

ce.isSequence('x');
// ➔ false
```

### Cache Management

Sequences with `memoize: true` (the default) cache computed values:

```javascript
// View cached values
ce.getSequenceCache('F');
// ➔ Map { 2 => 1, 3 => 2, 4 => 3, ... }

// Clear cache for a specific sequence
ce.clearSequenceCache('F');

// Clear all sequence caches
ce.clearSequenceCache();
```

## OEIS Integration

The Compute Engine can look up sequences in the
[Online Encyclopedia of Integer Sequences (OEIS)](https://oeis.org/).

### Looking Up Sequences

```javascript
// Look up a sequence by its terms
const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
// ➔ [{ id: 'A000045', name: 'Fibonacci numbers', terms: [...], url: '...' }]
```

### Verifying Your Sequences

Check if your defined sequence matches a known OEIS sequence:

```javascript
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

const result = await ce.checkSequenceOEIS('F', 10);
// ➔ {
//     matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }],
//     terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
//   }
```

:::info[Note]
OEIS lookups require network access to oeis.org.
:::

## Text Subscripts

For descriptive subscript names, use `\text{}` in LaTeX:

```javascript
ce.parse('x_{\\text{max}}');
// ➔ symbol "x_max"

ce.parse('v_{\\text{initial}}');
// ➔ symbol "v_initial"
```

This creates a single symbol with the text as part of its name.

## Type-Aware Subscripts

When a symbol is declared as a collection type, subscripts automatically
convert to `At()` indexing operations:

```javascript
ce.declare('v', 'list<number>');
ce.parse('v_n');
// ➔ ["At", "v", "n"]

ce.parse('v_{n+1}');
// ➔ ["At", "v", ["Add", "n", 1]]

ce.parse('v_{i,j}');
// ➔ ["At", "v", ["Tuple", "i", "j"]]
```

The type of the resulting expression is inferred from the collection's element
type, allowing subscripted elements to be used in arithmetic.

<ReadMore path="/compute-engine/reference/collections/" >
Read more about **Collections** and the `At` function <Icon name="chevron-right-bold" />
</ReadMore>
