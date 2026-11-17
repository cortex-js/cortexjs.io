---
title: Logic Reference
sidebar_label: Logic
slug: /reference/logic/
description: "The logic library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from logic.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Logic

The 27 definitions of the logic library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### And

`(boolean+) -> boolean`

Logical conjunction (AND): true when all operands are true. Short-circuits: operands are evaluated left to right and evaluation stops at the first `False`.

<MathJson name="And" latex={["\\land"]} />

### boole

`(boolean) -> integer`

Return 1 if the argument is true, 0 otherwise. Also known as the Iverson bracket

<MathJson name="Boole" latex={["[","]"]} />

### equivalent

`(boolean, boolean) -> boolean`

Logical equivalence (if and only if): true when both operands have the same truth value.

<MathJson name="Equivalent" latex={["\\iff"]} />

### exists

`(value, boolean) -> boolean`

Existential quantifier (there exists): true when the predicate holds for at least one value.

`exists` is a logical quantifier, not a collection function: it takes a
condition and a proposition, not a collection and a predicate, and it binds a
variable. To ask whether an element of a collection satisfies a predicate,
use [`any`](/reference/collections/#any).

The first argument introduces the variable: a symbol, or `x in S`. With a
finite `S`, the proposition is decided by trying each element.

```epsil
exists(x in {5, 2, 10, 18}, x > 15)
// ➔ "True"
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
exists(x, x > 15)
// ➔ Exists(x, 15 < x)
```

The variable is local to the proposition and shadows a symbol of the same
name outside it, so a value assigned to that symbol does not enter the
proposition.

```epsil
let x = 100
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
```

See also [`notExists`](/reference/logic/#notexists) and
[`existsUnique`](/reference/logic/#existsunique).

<MathJson name="Exists" latex={["\\exists"]}>

`["Exists", condition, proposition]`. The condition is a symbol or
`["Element", variable, domain]`.

```json example
["Exists", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 15]]
// ➔ "True"
```

</MathJson>

### existsUnique

`(value, boolean) -> boolean`

Unique existential quantifier (there exists exactly one value satisfying the predicate).

<MathJson name="ExistsUnique" latex={["\\exists!"]} />

### False

constant `boolean`

The boolean truth value false.

<MathJson name="False" latex={["\\bot"]} />

### forAll

`(value, boolean) -> boolean`

Universal quantifier (for all): true when the predicate holds for every value.

`forAll` is a logical quantifier, not a collection function. Like
[`exists`](/reference/logic/#exists), it binds the variable that its first
argument introduces, and with `x in S` over a finite `S` it is decided by
trying each element. To ask whether every element of a collection satisfies
a predicate, use [`all`](/reference/collections/#all).

```epsil
forAll(x in {5, 2, 10, 18}, x > 0)
// ➔ "True"
forAll(x in {5, 2, 10, 18}, x > 5)
// ➔ "False"
```

See also [`notForAll`](/reference/logic/#notforall).

<MathJson name="ForAll" latex={["\\forall"]}>

`["ForAll", condition, proposition]`.

```json example
["ForAll", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 0]]
// ➔ "True"
```

In LaTeX, `\forall x \in \{1, 2, 3\}, x > 0` parses to
`["ForAll", ["Element", "x", ["Set", 1, 2, 3]], ["Greater", "x", 0]]`.

</MathJson>

### implies

`(boolean, boolean) -> boolean`

Logical implication: false only when the antecedent is true and the consequent is false. Short-circuits: a `False` antecedent decides (`True`) without evaluating the consequent.

<MathJson name="Implies" latex={["\\implies"]} />

### isSatisfiable

MathJSON `IsSatisfiable` · `(boolean) -> boolean`

Check satisfiability using brute-force enumeration. O(2^n) complexity, max 20 variables.

### isTautology

MathJSON `IsTautology` · `(boolean) -> boolean`

Check if expression is a tautology using brute-force enumeration. O(2^n) complexity, max 20 variables.

### kroneckerDelta

`(value+) -> integer`

Return 1 if the arguments are equal, 0 otherwise. With a single argument n, this is δ_&#123;n,0&#125;: 1 if n = 0, 0 otherwise.

<MathJson name="KroneckerDelta" latex={["\\delta_"]} />

### minimalCNF

MathJSON `MinimalCNF` · `(boolean) -> boolean`

Convert to minimal CNF using Quine-McCluskey. Max 12 variables.

### minimalDNF

MathJSON `MinimalDNF` · `(boolean) -> boolean`

Convert to minimal DNF using Quine-McCluskey. Max 12 variables.

### nand

`(boolean+) -> boolean`

Logical NAND: the negation of AND (n-ary). Short-circuits: operands are evaluated left to right and evaluation stops at the first `False`.

<MathJson name="Nand" latex={["\\barwedge"]} />

### nor

`(boolean+) -> boolean`

Logical NOR: the negation of OR (n-ary). Short-circuits: operands are evaluated left to right and evaluation stops at the first `True`.

<MathJson name="Nor" latex={["⊽"]} />

### Not

`(boolean) -> boolean`

Logical negation (NOT).

<MathJson name="Not" latex={["\\lnot"]} />

### notExists

`(value, boolean) -> boolean`

Negated existential quantifier (there does not exist): true when the predicate holds for no value.

<MathJson name="NotExists" latex={["\\lnot\\exists"]} />

### notForAll

`(value, boolean) -> boolean`

Negated universal quantifier (not for all): true when the predicate fails for at least one value.

<MathJson name="NotForAll" latex={["\\lnot\\forall"]} />

### Or

`(boolean+) -> boolean`

Logical disjunction (OR): true when at least one operand is true. Short-circuits: operands are evaluated left to right and evaluation stops at the first `True`.

<MathJson name="Or" latex={["\\lor"]} />

### Predicate

`(symbol, value+) -> boolean`

Apply a predicate to arguments, returning a boolean

### primeImplicants

MathJSON `PrimeImplicants` · `(boolean) -> list`

Find all prime implicants using Quine-McCluskey. Max 12 variables.

### primeImplicates

MathJSON `PrimeImplicates` · `(boolean) -> list`

Find all prime implicates using Quine-McCluskey. Max 12 variables.

### toCNF

MathJSON `ToCNF` · `(boolean) -> boolean`

Convert a boolean expression to conjunctive normal form (CNF), an AND of ORs.

### toDNF

MathJSON `ToDNF` · `(boolean) -> boolean`

Convert a boolean expression to disjunctive normal form (DNF), an OR of ANDs.

### True

constant `boolean`

The boolean truth value true.

<MathJson name="True" latex={["\\top"]} />

### truthTable

MathJSON `TruthTable` · `(boolean) -> list`

Generate truth table for expression. O(2^n) complexity, max 10 variables.

### xor

`(boolean+) -> boolean`

Exclusive or: true when an odd number of operands are true

<MathJson name="Xor" latex={["\\veebar"]} />
