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
| `Implies` | `p \implies q` | $$ p \implies q $$ | Implication |
| `Implies` | `p \Rightarrow q` | $$ p \Rightarrow q $$ | |
| `Proves` | `p \vdash q` | $$ p \vdash q $$ | Provability |
| `Entails` | `p \vDash q` | $$ p \vDash q $$ | Entailment |
| `Satisfies` | `p \models q` | $$ p \models q $$ | Satisfaction |

</div>

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
