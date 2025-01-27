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
|  ’’ | `\operator{True}` | $$ \operatorname{True}$$| 
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