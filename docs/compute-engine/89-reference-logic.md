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
|  ’’ | `\mathsf{T}` | $$ \mathsf{T}$$| 
|  '' | `\operatorname{True}` | $$ \operatorname{True}$$| 
| `False` | `\bot` | $$ \bot $$ | 
| ’’ | `\mathsf{F}` |  $$ \mathsf{F}$$ | 
|  ’’ | `\operatorname{False}` | $$ \operatorname{False}$$| 

</div>


## Logical Operators

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Symbol |  LaTeX | Notation| |
| :--- | :--- | :--- |:---  |
| `And` | `p \land q` | $$ p \land q$$ | Conjunction | 
| ’’ | `p \operatorname{and} q` | $$ p \operatorname{and} q$$ |  | 
| `Or` | `p \lor q` | $$ p \lor q$$ | Disjunction | 
| ’’ | `p \operatorname{or} q` | $$ p \operatorname{or} q$$ |  | 
| `Xor` | `p \veebar q` | $$ p \veebar q$$ | Exclusive Or | 
| `Nand` | `p \barwedge q` | $$ p \barwedge q$$ | Not And | 
| `Nor` | `p \char"22BD q` | $$ p \char"22BD q$$ | Not Or | 
| `Not` | `\lnot p` |  $$ \lnot p$$ | Negation | 
| ’’ | `\operatorname{not} p` | $$ \operatorname{not} p$$ |  | 
| `Equivalent` | `p \iff q` | $$ p \iff q$$ || 
| ’’ | `p \Leftrightarrow q` | $$ p \Leftrightarrow q$$ || 
| `Implies` | `p \implies q` | $$p \implies q $$ | | 
| ’’ | `p \Rightarrow q` | $$p \Rightarrow q $$ | | 
| `Proves` | `p \vdash q` | $$p \vdash q $$ | | 
| `Entails` | `p \vDash q` | $$p \vDash q $$ | | 
| `Satisfies` | `p \models q` | $$p \models q $$ | | 

</div>

## Quantifiers


<FunctionDefinition name="ForAll">

<Signature name="ForAll">_condition_, _predicate_</Signature>

The `ForAll` function represents the **universal quantifier**.

The condition is the variable or variables that are being quantified over or
the set of elements that the variable can take.

The predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical bar. The predicate can also be enclosed in parentheses after the condition.

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

The condition is the variable or variables that are being quantified over, and the predicate is the statement that is being quantified.

The condition and the predicate are separated by a comma, a colon, or a vertical bar. The predicate can also be enclosed in parentheses after the condition.

<Latex value="\exists x, x^2 = 1"/>

<Latex value="\exists x: x^2 = 1"/>

<Latex value="\exists x\mid x^2 = 1"/>

<Latex value="\exists x( x^2 = 1)"/>

```json example
["Exists", "x", ["Equal", ["Square", "x"], 1]]

["Exists", ["Element", "x", "RealNumbers"], ["Equal", ["Square", "x"], 1]]
```

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

Single uppercase letters followed by parentheses are **automatically recognized**
as function/predicate applications:

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

### Quantifier Scope

By default, quantifiers use **tight binding**, following standard FOL conventions.
The quantifier scope extends only to the immediately following well-formed formula,
stopping at logical connectives.

<Latex value="\forall x. P(x) \rightarrow Q(x)"/>

This parses as `(∀x. P(x)) → Q(x)`, not `∀x. (P(x) → Q(x))`.

```json example
["To", ["ForAll", "x", ["P", "x"]], ["Q", "x"]]
```

To include the connective in the quantifier's scope, use explicit parentheses:

<Latex value="\forall x. (P(x) \rightarrow Q(x))"/>

```json example
["ForAll", "x", ["Delimiter", ["Implies", ["P", "x"], ["Q", "x"]]]]
```

### Quantifier Scope Option

You can control the quantifier scope behavior with the `quantifierScope` parsing
option:

```javascript
// Tight binding (default) - quantifier binds only the next formula
ce.parse('\\forall x. P(x) \\rightarrow Q(x)', { quantifierScope: 'tight' })
// → ["To", ["ForAll", "x", ["P", "x"]], ["Q", "x"]]

// Loose binding - quantifier scope extends to end of expression
ce.parse('\\forall x. P(x) \\rightarrow Q(x)', { quantifierScope: 'loose' })
// → ["ForAll", "x", ["To", ["P", "x"], ["Q", "x"]]]
```

### Negated Quantifiers

The negated quantifiers `NotForAll` and `NotExists` are also supported:

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Symbol | LaTeX | Notation |
| :--- | :--- | :--- |
| `NotForAll` | `\lnot\forall x, P(x)` | $$ \lnot\forall x, P(x) $$ |
| `NotExists` | `\lnot\exists x, P(x)` | $$ \lnot\exists x, P(x) $$ |

</div>