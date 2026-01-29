---
title: Logic and First-Order Logic
slug: /compute-engine/guides/logic/
---

This guide covers working with logical expressions and First-Order Logic (FOL)
in the Compute Engine. You'll learn how to parse, manipulate, evaluate, and
transform Boolean and quantified expressions.

## Boolean Expressions

### Basic Logical Operators

The Compute Engine supports standard logical operators:

```js example
const ce = new ComputeEngine();

// Conjunction (AND)
ce.parse('p \\land q');           // → ["And", "p", "q"]

// Disjunction (OR)
ce.parse('p \\lor q');            // → ["Or", "p", "q"]

// Negation (NOT)
ce.parse('\\lnot p');             // → ["Not", "p"]

// Implication
ce.parse('p \\implies q');        // → ["Implies", "p", "q"]

// Equivalence (biconditional)
ce.parse('p \\iff q');            // → ["Equivalent", "p", "q"]
```

### Evaluating Boolean Expressions

Boolean expressions with concrete `True`/`False` values evaluate to their
logical result:

```js example
ce.box(['And', 'True', 'False']).evaluate();     // → False
ce.box(['Or', 'True', 'False']).evaluate();      // → True
ce.box(['Not', 'False']).evaluate();             // → True
ce.box(['Implies', 'True', 'False']).evaluate(); // → False
ce.box(['Implies', 'False', 'True']).evaluate(); // → True
```

## First-Order Logic

First-Order Logic extends propositional logic with quantifiers and predicates,
allowing you to make statements about objects in a domain.

### Predicates

In FOL, predicates are functions that return Boolean values. They are typically
written as uppercase letters followed by arguments:

```js example
// Single uppercase letters are automatically recognized as predicates
ce.parse('P(x)');           // → ["P", "x"]
ce.parse('Q(a, b)');        // → ["Q", "a", "b"]
```

For multi-letter predicate names, declare them explicitly:

```js example
ce.declare('Loves', { signature: '(value, value) -> boolean' });
ce.parse('Loves(x, y)');    // → ["Loves", "x", "y"]
```

### Quantifiers

The Compute Engine supports universal and existential quantifiers:

```js example
// Universal quantifier: "for all x"
ce.parse('\\forall x, P(x)');
// → ["ForAll", "x", ["P", "x"]]

// Existential quantifier: "there exists x"
ce.parse('\\exists x, P(x)');
// → ["Exists", "x", ["P", "x"]]

// Unique existential: "there exists exactly one x"
ce.parse('\\exists! x, P(x)');
// → ["ExistsUnique", "x", ["P", "x"]]
```

Negated quantifiers are also supported: `NotForAll` and `NotExists`.

Quantifiers can also specify a domain using set membership:

```js example
ce.parse('\\forall x \\in \\R, x^2 \\geq 0');
// → ["ForAll", ["Element", "x", "RealNumbers"], ["GreaterEqual", ["Square", "x"], 0]]
```

### Quantifier Scope

By default, quantifiers use **tight binding** following standard FOL conventions.
The scope extends only to the immediately following formula:

```js example
ce.parse('\\forall x. P(x) \\implies Q(x)');
// Parses as: (∀x. P(x)) → Q(x)
// → ["Implies", ["ForAll", "x", ["P", "x"]], ["Q", "x"]]
```

Use parentheses to extend the quantifier's scope:

```js example
ce.parse('\\forall x. (P(x) \\implies Q(x))');
// Parses as: ∀x. (P(x) → Q(x))
// → ["ForAll", "x", ["Delimiter", ["Implies", ["P", "x"], ["Q", "x"]]]]
```

You can change this behavior with the `quantifierScope` option:

```js example
// Loose binding - scope extends to end of expression
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'loose' });
// → ["ForAll", "x", ["Implies", ["P", "x"], ["Q", "x"]]]
```

## Evaluating Quantifiers

Quantifiers can be evaluated to Boolean values when the bound variable is
constrained to a finite domain.

### Finite Domain Evaluation

Specify a finite domain using `Element` with a `Set`, `List`, `Range`, or
`Interval`:

```js example
// Universal: all elements satisfy the predicate
ce.box(['ForAll',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Greater', 'x', 0]
]).evaluate();
// → True (1 > 0, 2 > 0, 3 > 0 all hold)

// Existential: at least one element satisfies the predicate
ce.box(['Exists',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Greater', 'x', 2]
]).evaluate();
// → True (3 > 2 holds)

// Unique existential: exactly one element satisfies the predicate
ce.box(['ExistsUnique',
  ['Element', 'x', ['Set', 1, 2, 3]],
  ['Equal', 'x', 2]
]).evaluate();
// → True (only 2 equals 2)
```

### Using Range Domains

For integer ranges, use `Range`:

```js example
// All integers from 1 to 100 are positive
ce.box(['ForAll',
  ['Element', 'n', ['Range', 1, 100]],
  ['Greater', 'n', 0]
]).evaluate();
// → True

// Some integer from 1 to 10 is a perfect square greater than 5
ce.box(['Exists',
  ['Element', 'n', ['Range', 1, 10]],
  ['And', ['Greater', 'n', 5], ['Equal', ['Sqrt', 'n'], ['Floor', ['Sqrt', 'n']]]]
]).evaluate();
// → True (9 is a perfect square > 5)
```

### Nested Quantifiers

Nested quantifiers are evaluated over the Cartesian product of their domains:

```js example
// For all pairs (x, y) in {1,2} × {1,2}: x + y > 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2]],
  ['ForAll', ['Element', 'y', ['Set', 1, 2]],
    ['Greater', ['Add', 'x', 'y'], 0]
  ]
]).evaluate();
// → True (checks all 4 pairs: (1,1), (1,2), (2,1), (2,2))

// There exist x, y in {1,2,3} such that x + y = 5
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2, 3]],
  ['Exists', ['Element', 'y', ['Set', 1, 2, 3]],
    ['Equal', ['Add', 'x', 'y'], 5]
  ]
]).evaluate();
// → True (x=2, y=3 or x=3, y=2)
```

### Symbolic Simplification

Quantifiers simplify automatically in certain cases:

```js example
// Constant body
ce.box(['ForAll', 'x', 'True']).evaluate();   // → True
ce.box(['ForAll', 'x', 'False']).evaluate();  // → False
ce.box(['Exists', 'x', 'True']).evaluate();   // → True
ce.box(['Exists', 'x', 'False']).evaluate();  // → False

// Body doesn't contain the quantified variable
ce.box(['ForAll', 'x', ['Greater', 'y', 0]]).evaluate();
// → y > 0 (the quantifier is eliminated)
```

## Normal Forms

The Compute Engine can convert Boolean expressions to standard normal forms,
useful for automated reasoning and satisfiability checking.

### Conjunctive Normal Form (CNF)

CNF is a conjunction (AND) of disjunctions (OR) of literals:

```js example
// Convert (A ∧ B) ∨ C to CNF
ce.box(['ToCNF', ['Or', ['And', 'A', 'B'], 'C']]).evaluate();
// → (A ∨ C) ∧ (B ∨ C)

// Convert implication to CNF
ce.box(['ToCNF', ['Implies', 'A', 'B']]).evaluate();
// → ¬A ∨ B

// De Morgan's law is applied automatically
ce.box(['ToCNF', ['Not', ['And', 'A', 'B']]]).evaluate();
// → ¬A ∨ ¬B
```

### Disjunctive Normal Form (DNF)

DNF is a disjunction (OR) of conjunctions (AND) of literals:

```js example
// Convert (A ∨ B) ∧ C to DNF
ce.box(['ToDNF', ['And', ['Or', 'A', 'B'], 'C']]).evaluate();
// → (A ∧ C) ∨ (B ∧ C)

// De Morgan's law
ce.box(['ToDNF', ['Not', ['Or', 'A', 'B']]]).evaluate();
// → ¬A ∧ ¬B
```

### How Conversion Works

The conversion process:
1. **Eliminate implications**: `A → B` becomes `¬A ∨ B`
2. **Eliminate equivalences**: `A ↔ B` becomes `(¬A ∨ B) ∧ (¬B ∨ A)`
3. **Push negations inward** (De Morgan's laws): `¬(A ∧ B)` becomes `¬A ∨ ¬B`
4. **Distribute** to get the target form:
   - For CNF: distribute OR over AND
   - For DNF: distribute AND over OR

## Practical Examples

### Validating Logical Arguments

Check if an argument is valid by verifying the conclusion follows from premises:

```js example
// Modus Ponens: If P → Q and P, then Q
// Check: for all truth values, (P → Q) ∧ P → Q is a tautology

ce.box(['ForAll', ['Element', 'p', ['Set', 'True', 'False']],
  ['ForAll', ['Element', 'q', ['Set', 'True', 'False']],
    ['Implies',
      ['And', ['Implies', 'p', 'q'], 'p'],
      'q'
    ]
  ]
]).evaluate();
// → True (Modus Ponens is valid)
```

### Checking Properties Over Domains

Verify mathematical properties:

```js example
// Commutativity of addition for small integers
ce.box(['ForAll', ['Element', 'a', ['Range', -5, 5]],
  ['ForAll', ['Element', 'b', ['Range', -5, 5]],
    ['Equal', ['Add', 'a', 'b'], ['Add', 'b', 'a']]
  ]
]).evaluate();
// → True

// Check if a function is injective over a domain
// f(x) = x² is not injective on {-2, -1, 0, 1, 2}
ce.box(['Exists', ['Element', 'x', ['Set', -2, -1, 0, 1, 2]],
  ['Exists', ['Element', 'y', ['Set', -2, -1, 0, 1, 2]],
    ['And',
      ['NotEqual', 'x', 'y'],
      ['Equal', ['Square', 'x'], ['Square', 'y']]
    ]
  ]
]).evaluate();
// → True (x=-1, y=1 both give 1)
```

### Database-Style Queries

Use quantifiers for set-based queries:

```js example
// Define a "database" of people and their ages
const people = ['Set',
  ['List', 'Alice', 25],
  ['List', 'Bob', 30],
  ['List', 'Carol', 22]
];

// Check if someone is over 28
ce.box(['Exists', ['Element', 'person', people],
  ['Greater', ['At', 'person', 2], 28]
]).evaluate();
// → True (Bob is 30)
```

## Performance Considerations

- **Domain size**: Evaluation iterates through all domain elements. Keep domains
  under 1000 elements.
- **Nested quantifiers**: With n quantifiers over domains of size k, evaluation
  checks k^n combinations. Use sparingly.
- **Short-circuit evaluation**: `ForAll` stops at the first `False`, `Exists`
  stops at the first `True`.

## See Also

- [Logic Reference](/compute-engine/reference/logic/) - Complete list of logic
  operators and their signatures
- [Sets Reference](/compute-engine/reference/sets/) - Working with sets and
  set operations
