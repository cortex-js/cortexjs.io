---
title: Logic
slug: /compute-engine/reference/logic/
date: Last Modified
---

## Constants


<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol | LaTeX |  Notation |
| :--- | :--- | :--- |
| `True` | `\top` | $$ \top $$ |
| `True` | `\mathsf{T}` | $$ \mathsf{T}$$ |
| `True` | `\operatorname{True}` | $$ \operatorname{True}$$ |
| `False` | `\bot` | $$ \bot $$ |
| `False` | `\mathsf{F}` |  $$ \mathsf{F}$$ |
| `False` | `\operatorname{False}` | $$ \operatorname{False}$$ |

</div>


## Logical Operators

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol |  LaTeX | Notation | Description |
| :--- | :--- | :--- |:---  |
| `And` | `p \land q` | $$ p \land q$$ | Conjunction |
| `And` | `p \operatorname{and} q` | $$ p \operatorname{and} q$$ | |
| `Or` | `p \lor q` | $$ p \lor q$$ | Disjunction |
| `Or` | `p \operatorname{or} q` | $$ p \operatorname{or} q$$ | |
| `Xor` | `p \veebar q` | $$ p \veebar q$$ | Exclusive OR (n-ary: true when odd count) |
| `Nand` | `p \barwedge q` | $$ p \barwedge q$$ | NAND (n-ary: NOT of AND) |
| `Nor` | `p \char"22BD q` | $$ p \char"22BD q$$ | NOR (n-ary: NOT of OR) |
| `Not` | `\lnot p` |  $$ \lnot p$$ | Negation |
| `Not` | `\operatorname{not} p` | $$ \operatorname{not} p$$ | |
| `Equivalent` | `p \iff q` | $$ p \iff q$$ | Equivalence |
| `Equivalent` | `p \Leftrightarrow q` | $$ p \Leftrightarrow q$$ | |
| `Equivalent` | `p \leftrightarrow q` | $$ p \leftrightarrow q$$ | |
| `Equivalent` | `p \Longleftrightarrow q` | $$ p \Longleftrightarrow q$$ | |
| `Equivalent` | `p \longleftrightarrow q` | $$ p \longleftrightarrow q$$ | |
| `Implies` | `p \implies q` | $$ p \implies q $$ | Implication |
| `Implies` | `p \Rightarrow q` | $$ p \Rightarrow q $$ | |
| `Implies` | `p \rightarrow q` | $$ p \rightarrow q $$ | |
| `Implies` | `p \Longrightarrow q` | $$ p \Longrightarrow q $$ | |
| `Implies` | `p \longrightarrow q` | $$ p \longrightarrow q $$ | |
| `Proves` | `p \vdash q` | $$ p \vdash q $$ | Provability |
| `Entails` | `p \vDash q` | $$ p \vDash q $$ | Entailment |
| `Satisfies` | `p \models q` | $$ p \models q $$ | Satisfaction |

</div>

### Operator Precedence

Logical operators have lower precedence than comparison and arithmetic operators,
so expressions parse naturally without requiring parentheses:

| Precedence | Operators | Example |
| :--- | :--- | :--- |
| 880 | `Not` (`\lnot`, `\neg`) | `\lnot p` binds only to `p` |
| 245 | Comparisons (`=`, `<`, `>`, `\leq`, `\geq`, `\neq`) | `x = 1` |
| 240 | Set relations (`\subset`, `\subseteq`, `\in`, etc.) | `x \in S` |
| 235 | `And` (`\land`, `\wedge`) | `p \land q` |
| 232 | `Xor`, `Nand`, `Nor` | `p \veebar q` |
| 230 | `Or` (`\lor`, `\vee`) | `p \lor q` |
| 220 | `Implies` (`\implies`, `\Rightarrow`, `\rightarrow`) | `p \implies q` |
| 219 | `Equivalent` (`\iff`, `\Leftrightarrow`, `\leftrightarrow`) | `p \iff q` |
| 200 | Quantifiers (`\forall`, `\exists`) | `\forall x, P(x)` |

**Examples:**

- `x = 1 \lor y = 2` parses as `(x = 1) \lor (y = 2)` — comparisons bind tighter than `Or`
- `p \land q \lor r` parses as `(p \land q) \lor r` — `And` binds tighter than `Or`
- `p \lor q \implies r` parses as `(p \lor q) \implies r` — `Or` binds tighter than `Implies`

**Important:** `Not` has very high precedence and only applies to the immediately
following atom. To negate a compound expression, use parentheses:

- `\lnot p \land q` parses as `(\lnot p) \land q`
- `\lnot(p \land q)` parses as `\lnot(p \land q)` — negates the entire conjunction

### Arrow Notation

Note that `\to` is reserved for function/set mapping notation (e.g., `f: A \to B`)
and parses as `To`, not `Implies`. Use `\rightarrow`, `\Rightarrow`, or `\implies`
for logical implication.

## Boolean Simplification

When `simplify()` is called on boolean expressions, the following algebraic laws
are applied automatically:

| Law | Rule | Example |
| :--- | :--- | :--- |
| **Absorption** | $A \land (A \lor B) \to A$ | `And(A, Or(A, B))` → `A` |
| **Absorption** | $A \lor (A \land B) \to A$ | `Or(A, And(A, B))` → `A` |
| **Idempotence** | $A \land A \to A$ | `And(A, A)` → `A` |
| **Idempotence** | $A \lor A \to A$ | `Or(A, A)` → `A` |
| **Complementation** | $A \land \lnot A \to \bot$ | `And(A, Not(A))` → `False` |
| **Complementation** | $A \lor \lnot A \to \top$ | `Or(A, Not(A))` → `True` |
| **Identity** | $A \land \top \to A$ | `And(A, True)` → `A` |
| **Identity** | $A \lor \bot \to A$ | `Or(A, False)` → `A` |
| **Domination** | $A \land \bot \to \bot$ | `And(A, False)` → `False` |
| **Domination** | $A \lor \top \to \top$ | `Or(A, True)` → `True` |
| **Double Negation** | $\lnot\lnot A \to A$ | `Not(Not(A))` → `A` |

```javascript
ce.box(['And', 'A', ['Or', 'A', 'B']]).simplify()
// → A (absorption)

ce.box(['Or', 'A', ['And', 'A', 'B']]).simplify()
// → A (absorption)

ce.box(['And', 'A', 'A', 'B']).simplify()
// → A ∧ B (idempotence)

ce.box(['And', 'A', ['Not', 'A']]).simplify()
// → False (complementation)

ce.box(['Or', 'A', ['Not', 'A']]).simplify()
// → True (complementation)

ce.box(['Not', ['Not', 'A']]).simplify()
// → A (double negation)
```

## Quantifiers


<FunctionDefinition name="ForAll">

<Signature name="ForAll">_condition_, _predicate_</Signature>

The `ForAll` function represents the **universal quantifier**.

The condition is the variable (or variables) being quantified over, or the set
of elements that the variable can take.

The predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical
bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\forall x, x + 1 > x"/>

<Latex value="\forall x: x + 1 > x"/>

<Latex value="\forall x\mid x + 1 > x"/>

<Latex value="\forall x( x + 1 > x)"/>

<Latex value="\forall x \in \R, x + 1 > x"/>


```json example
["ForAll", "x", ["Greater", ["Add", "x", 1], "x"]]

["ForAll", ["Element", "x", "RealNumbers"], ["Greater", ["Square", "x"], 0]]
```

</FunctionDefinition>


<FunctionDefinition name="Exists">

<Signature name="Exists">_condition_, _predicate_</Signature>

The `Exists` function represents the **existential quantifier**.

The condition is the variable (or variables) being quantified over, and the
predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical
bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\exists x, x^2 = 1"/>

<Latex value="\exists x: x^2 = 1"/>

<Latex value="\exists x\mid x^2 = 1"/>

<Latex value="\exists x( x^2 = 1)"/>

```json example
["Exists", "x", ["Equal", ["Square", "x"], 1]]

["Exists", ["Element", "x", "RealNumbers"], ["Equal", ["Square", "x"], 1]]
```

</FunctionDefinition>


<FunctionDefinition name="ExistsUnique">

<Signature name="ExistsUnique">_condition_, _predicate_</Signature>

The `ExistsUnique` function represents the **unique existential quantifier**.

<Latex value="\exists! x, x^2 = 1"/>

</FunctionDefinition>


## First-Order Logic

When working with First-Order Logic (FOL) expressions, there are several features
to be aware of:

### Predicates

In FOL, predicates are typically represented as uppercase letters followed by
arguments in parentheses, such as `P(x)` or `Q(a, b)`.

**Inside quantifier scopes** (ForAll, Exists, etc.), single uppercase letters
followed by parentheses are parsed as `Predicate` expressions to distinguish
them from regular function applications:

```javascript
ce.parse('\\forall x, P(x)')
// → ["ForAll", "x", ["Predicate", "P", "x"]]

ce.parse('\\exists x, Q(x, y)')
// → ["Exists", "x", ["Predicate", "Q", "x", "y"]]
```

**Outside quantifier scopes**, they parse as regular function applications to
maintain backward compatibility with function definitions:

```javascript
ce.parse('P(x)')           // → ["P", "x"]
ce.parse('Q(a, b)')        // → ["Q", "a", "b"]
```

For multi-letter predicate names or lowercase predicates, you should declare
them explicitly:

```javascript
ce.declare('Loves', { signature: '(value, value) -> boolean' });
ce.parse('Loves(x, y)')    // → ["Loves", "x", "y"]
```

<FunctionDefinition name="Predicate">

<Signature name="Predicate">_name_, _args..._</Signature>

The `Predicate` function explicitly represents a predicate application in
First-Order Logic. It distinguishes predicate applications from regular
function calls.

Predicates return Boolean values and are used within logical formulas,
particularly with quantifiers.

```json example
["Predicate", "P", "x"]

["Predicate", "Q", "a", "b"]
```

When serialized to LaTeX, predicates render as standard function notation:

```javascript
ce.box(['Predicate', 'P', 'x']).latex   // → "P(x)"
```

**Note:** The notations `D(f, x)` and `N(x)` in LaTeX are **not** interpreted as
their library function equivalents (derivative and numeric evaluation). Since
these are not standard mathematical notations, they parse as predicate
applications:
- `D(f, x)` → `["Predicate", "D", "f", "x"]`
- `N(x)` → `["Predicate", "N", "x"]`

For derivatives, use Leibniz notation (`\frac{d}{dx}f`) or construct directly in
MathJSON: `["D", expr, "x"]`. For numeric evaluation, use the `.N()` method or
construct directly: `["N", expr]`.

</FunctionDefinition>

### Quantifier Scope

By default, quantifiers use **tight binding**, following standard FOL conventions.
The quantifier scope extends only to the immediately following well-formed formula,
stopping at logical connectives.

<Latex value="\forall x. P(x) \implies Q(x)"/>

This parses as `(∀x. P(x)) ⇒ Q(x)`, not `∀x. (P(x) ⇒ Q(x))`.

```json example
["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]
```

Note that `P(x)` inside the quantifier becomes `["Predicate", "P", "x"]`, while
`Q(x)` outside the quantifier becomes `["Q", "x"]` (a regular function application).

To include the connective in the quantifier's scope, use explicit parentheses:

<Latex value="\forall x. (P(x) \implies Q(x))"/>

```json example
["ForAll", "x", ["Delimiter", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]]
```

### Quantifier Scope Option

You can control the quantifier scope behavior with the `quantifierScope` parsing
option:

```javascript
// Tight binding (default) - quantifier binds only the next formula
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'tight' })
// → ["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]

// Loose binding - quantifier scope extends to end of expression
ce.parse('\\forall x. P(x) \\implies Q(x)', { quantifierScope: 'loose' })
// → ["ForAll", "x", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]
```

### Negated Quantifiers

The negated quantifiers `NotForAll` and `NotExists` are also supported:

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Symbol | LaTeX | Notation |
| :--- | :--- | :--- |
| `NotForAll` | `\lnot\forall x, P(x)` | $$ \lnot\forall x, P(x) $$ |
| `NotExists` | `\lnot\exists x, P(x)` | $$ \lnot\exists x, P(x) $$ |

</div>

### Quantifier Evaluation

Quantifiers can be evaluated to Boolean values when the bound variable is
constrained to a finite domain using an `Element` condition.

**Supported domains:**
- `Set` - explicit finite sets: `["Element", "x", ["Set", 1, 2, 3]]`
- `List` - explicit finite lists: `["Element", "x", ["List", 1, 2, 3]]`
- `Range` - integer ranges: `["Element", "n", ["Range", 1, 10]]`
- `Interval` - integer intervals: `["Element", "n", ["Interval", 1, 10]]`

Domains are limited to 1000 elements maximum.

```javascript
// All elements in {1, 2, 3} are greater than 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 0]]).evaluate()
// → True

// Some element in {1, 2, 3} is greater than 2
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2, 3]], ['Greater', 'x', 2]]).evaluate()
// → True (x = 3 satisfies the condition)

// Exactly one element equals 2
ce.box(['ExistsUnique', ['Element', 'x', ['Set', 1, 2, 3]], ['Equal', 'x', 2]]).evaluate()
// → True
```

**Nested quantifiers** are evaluated over the Cartesian product of domains:

```javascript
// For all (x, y) in {1, 2} × {1, 2}: x + y > 0
ce.box(['ForAll', ['Element', 'x', ['Set', 1, 2]],
  ['ForAll', ['Element', 'y', ['Set', 1, 2]],
    ['Greater', ['Add', 'x', 'y'], 0]]]).evaluate()
// → True

// Some (x, y) in {1, 2} × {1, 2} satisfies x + y = 4
ce.box(['Exists', ['Element', 'x', ['Set', 1, 2]],
  ['Exists', ['Element', 'y', ['Set', 1, 2]],
    ['Equal', ['Add', 'x', 'y'], 4]]]).evaluate()
// → True (x = 2, y = 2)
```

**Symbolic simplifications** are applied when possible:
- `∀x. True` → `True`
- `∀x. False` → `False`
- `∃x. True` → `True`
- `∃x. False` → `False`
- `∀x. P` (where P doesn't contain x) → `P`
- `∃x. P` (where P doesn't contain x) → `P`


## Normal Forms

<FunctionDefinition name="ToCNF">

<Signature name="ToCNF">_expression_</Signature>

Converts a boolean expression to **Conjunctive Normal Form** (CNF).

CNF is a conjunction (And) of disjunctions (Or) of literals. A literal is
either a variable or its negation.

Example: $(A \lor B) \land (\lnot A \lor C)$

The conversion applies:
- De Morgan's laws: $\lnot(A \land B) \equiv \lnot A \lor \lnot B$
- Distribution: $(A \land B) \lor C \equiv (A \lor C) \land (B \lor C)$
- Implication elimination: $A \to B \equiv \lnot A \lor B$
- Equivalence elimination: $A \leftrightarrow B \equiv (\lnot A \lor B) \land (\lnot B \lor A)$

```javascript
ce.box(['ToCNF', ['Or', ['And', 'A', 'B'], 'C']]).evaluate()
// → (A ∨ C) ∧ (B ∨ C)

ce.box(['ToCNF', ['Implies', 'A', 'B']]).evaluate()
// → ¬A ∨ B

ce.box(['ToCNF', ['Not', ['And', 'A', 'B']]]).evaluate()
// → ¬A ∨ ¬B  (De Morgan's law)
```

</FunctionDefinition>


<FunctionDefinition name="ToDNF">

<Signature name="ToDNF">_expression_</Signature>

Converts a boolean expression to **Disjunctive Normal Form** (DNF).

DNF is a disjunction (Or) of conjunctions (And) of literals. A literal is
either a variable or its negation.

Example: $(A \land B) \lor (\lnot A \land C)$

The conversion applies:
- De Morgan's laws: $\lnot(A \lor B) \equiv \lnot A \land \lnot B$
- Distribution: $(A \lor B) \land C \equiv (A \land C) \lor (B \land C)$
- Implication and equivalence elimination (same as CNF)

```javascript
ce.box(['ToDNF', ['And', ['Or', 'A', 'B'], 'C']]).evaluate()
// → (A ∧ C) ∨ (B ∧ C)

ce.box(['ToDNF', ['Not', ['Or', 'A', 'B']]]).evaluate()
// → ¬A ∧ ¬B  (De Morgan's law)
```

</FunctionDefinition>


## Satisfiability and Tautology

<FunctionDefinition name="IsSatisfiable">

<Signature name="IsSatisfiable">_expression_</Signature>

Checks if a Boolean expression is **satisfiable** — that is, whether there exists
an assignment of truth values to variables that makes the expression true.

Returns `True` if the expression is satisfiable, `False` otherwise.

```javascript
// A contradiction is not satisfiable
ce.box(['IsSatisfiable', ['And', 'A', ['Not', 'A']]]).evaluate()
// → False

// Most formulas are satisfiable
ce.box(['IsSatisfiable', ['Or', 'A', 'B']]).evaluate()
// → True

// A tautology is also satisfiable
ce.box(['IsSatisfiable', ['Or', 'A', ['Not', 'A']]]).evaluate()
// → True
```

Limited to expressions with at most 20 variables (2^20 = 1,048,576 combinations).

</FunctionDefinition>


<FunctionDefinition name="IsTautology">

<Signature name="IsTautology">_expression_</Signature>

Checks if a Boolean expression is a **tautology** — that is, whether it is true
for all possible assignments of truth values to variables.

Returns `True` if the expression is a tautology, `False` otherwise.

```javascript
// Law of excluded middle
ce.box(['IsTautology', ['Or', 'A', ['Not', 'A']]]).evaluate()
// → True

// Double negation elimination
ce.box(['IsTautology', ['Equivalent', ['Not', ['Not', 'A']], 'A']]).evaluate()
// → True

// De Morgan's law
ce.box(['IsTautology', ['Equivalent',
  ['Not', ['And', 'A', 'B']],
  ['Or', ['Not', 'A'], ['Not', 'B']]
]]).evaluate()
// → True

// A simple variable is not a tautology
ce.box(['IsTautology', 'A']).evaluate()
// → False
```

Limited to expressions with at most 20 variables.

</FunctionDefinition>


<FunctionDefinition name="TruthTable">

<Signature name="TruthTable">_expression_</Signature>

Generates a complete **truth table** for a Boolean expression.

Returns a `List` of `List`s, where the first row contains the variable names
followed by "Result", and subsequent rows contain the truth values for each
combination of inputs.

```javascript
ce.box(['TruthTable', ['And', 'A', 'B']]).evaluate()
// → [["A", "B", "Result"],
//    ["False", "False", "False"],
//    ["False", "True", "False"],
//    ["True", "False", "False"],
//    ["True", "True", "True"]]

ce.box(['TruthTable', ['Xor', 'P', 'Q']]).evaluate()
// → [["P", "Q", "Result"],
//    ["False", "False", "False"],
//    ["False", "True", "True"],
//    ["True", "False", "True"],
//    ["True", "True", "False"]]
```

Limited to expressions with at most 10 variables (1024 rows).

</FunctionDefinition>


## Prime Implicants and Minimal Normal Forms

The following functions use the **Quine-McCluskey algorithm** to find minimal
representations of Boolean expressions.

<FunctionDefinition name="PrimeImplicants">

<Signature name="PrimeImplicants">_expression_</Signature>

Finds all **prime implicants** of a Boolean expression.

A prime implicant is a product term (conjunction of literals) that:
1. Implies the original expression (covers some minterms)
2. Cannot be reduced further (removing any literal would make it not an implicant)

Returns a `List` of expressions, each representing a prime implicant.

```javascript
// AB ∨ A¬B has one prime implicant: A
ce.box(['PrimeImplicants', ['Or', ['And', 'A', 'B'], ['And', 'A', ['Not', 'B']]]]).evaluate()
// → [A]

// A ∨ B has two prime implicants
ce.box(['PrimeImplicants', ['Or', 'A', 'B']]).evaluate()
// → [A, B]

// XOR has two prime implicants
ce.box(['PrimeImplicants', ['Xor', 'A', 'B']]).evaluate()
// → [¬A ∧ B, A ∧ ¬B]
```

Limited to expressions with at most 12 variables.

</FunctionDefinition>


<FunctionDefinition name="PrimeImplicates">

<Signature name="PrimeImplicates">_expression_</Signature>

Finds all **prime implicates** of a Boolean expression.

A prime implicate is a sum term (disjunction of literals) that:
1. Is implied by the original expression (is true whenever the expression is true)
2. Cannot be reduced further (removing any literal would make it not an implicate)

Prime implicates are the dual of prime implicants and represent the minimal
clauses in CNF.

Returns a `List` of expressions, each representing a prime implicate.

```javascript
// A ∧ B implies both A and B separately
ce.box(['PrimeImplicates', ['And', 'A', 'B']]).evaluate()
// → [A, B]

// A ∨ B has one prime implicate
ce.box(['PrimeImplicates', ['Or', 'A', 'B']]).evaluate()
// → [A ∨ B]
```

Limited to expressions with at most 12 variables.

</FunctionDefinition>


<FunctionDefinition name="MinimalDNF">

<Signature name="MinimalDNF">_expression_</Signature>

Converts a Boolean expression to **minimal Disjunctive Normal Form** (DNF).

Uses the Quine-McCluskey algorithm to find prime implicants, then selects a
minimal cover. The result is a disjunction of conjunctions with the fewest
terms possible.

Unlike `ToDNF` which may produce a non-minimal DNF, `MinimalDNF` guarantees
the result has the minimum number of product terms.

```javascript
// AB ∨ A¬B ∨ ¬AB simplifies to A ∨ B
ce.box(['MinimalDNF', ['Or',
  ['And', 'A', 'B'],
  ['And', 'A', ['Not', 'B']],
  ['And', ['Not', 'A'], 'B']
]]).evaluate()
// → A ∨ B (3 terms reduced to 2)

// AB ∨ A¬B simplifies to A
ce.box(['MinimalDNF', ['Or', ['And', 'A', 'B'], ['And', 'A', ['Not', 'B']]]]).evaluate()
// → A (2 terms reduced to 1)
```

Limited to expressions with at most 12 variables.

</FunctionDefinition>


<FunctionDefinition name="MinimalCNF">

<Signature name="MinimalCNF">_expression_</Signature>

Converts a Boolean expression to **minimal Conjunctive Normal Form** (CNF).

Uses the Quine-McCluskey algorithm to find prime implicates, then selects a
minimal cover. The result is a conjunction of disjunctions with the fewest
clauses possible.

Unlike `ToCNF` which may produce a non-minimal CNF, `MinimalCNF` guarantees
the result has the minimum number of clauses.

```javascript
// (A ∨ B) ∧ (A ∨ ¬B) simplifies to A
ce.box(['MinimalCNF', ['And', ['Or', 'A', 'B'], ['Or', 'A', ['Not', 'B']]]]).evaluate()
// → A (2 clauses reduced to 1)
```

Limited to expressions with at most 12 variables.

</FunctionDefinition>
