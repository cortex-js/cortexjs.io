---
title: Relations Reference
sidebar_label: Relations
slug: /reference/relop/
description: "The relations library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from relop.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Relations

The 30 definitions of the relations library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Order and absent values

An ordered comparison (`<`, `<=`, `>`, `>=`) with an operand that has no
order is `False`: `NaN`, a pole such as `1/0` (complex infinity), and a
complex number that is not real. So an `if` whose condition compares such a
value takes its other branch. `!=` is not affected, and a comparison with a
free symbol stays unevaluated. The signed infinities are ordered as usual.

```epsil
1/0 > 0
// ➔ false
if 1/0 > 0 { 1 } else { 0 }
// ➔ 0
i > 0
// ➔ false
1/0 != 0
// ➔ true
0 < oo
// ➔ true
x > 0
// ➔ 0 < x
```

A comparison with `missing` is read as with `NaN`: an ordered comparison is
`False`, and `!=` is `True`. A comparison of two lists with a `missing`
element is `False`. Any other function of `missing` gives `missing`, and
`sum`, `product`, `max` and `mean` of a list with a `missing` element are
`missing`. Read an absent value with `isMissing` or `Coalesce` before you
compute with it: see [Absent values](/reference/core/#absent-values).

```epsil
[missing < 0, missing != 0, [1, missing] == [1, missing]]
// ➔ [false,true,false]
[sum([1, missing]), max([1, missing]), mean([1, missing])]
// ➔ [missing,missing,missing]
```

The three kinds of equality, `===` (the same expression), `==` (the same
value) and identical equality (the same value for every value of the free
variables), are compared in
[Comparing expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions).

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### Approx

`(any, any*) -> boolean`

Approximate-equality relation (approximately equal).

<MathJson name="Approx" latex={["\\approx"]} />

### ApproxEqual

`(any, any*) -> boolean`

Approximately-equal relation.

<MathJson name="ApproxEqual" latex={["\\approxeq"]} />

### ApproxNotEqual

`(any, any*) -> boolean`

Approximately-not-equal relation.

### congruent

`(number, number, modulo: number) -> boolean`

Indicate that two expressions are congruent modulo a number

`congruent(a, b, m)` is `True` when `a` and `b` are congruent modulo `m`.

```epsil
congruent(26, 11, 5)
// ➔ true
```

<MathJson name="Congruent">

`["Congruent", a, b, modulus]`. In LaTeX: `26 \equiv 11 \pmod{5}`.

```json example
["Congruent", 26, 11, 5]
// ➔ True
```

</MathJson>

### Equal

`(any, any) -> boolean`

Equality comparison (equal to).

<MathJson name="Equal" latex={["="]} />

### Greater

`(any, any*) -> boolean`

Greater-than comparison (strictly greater than).

<MathJson name="Greater" latex={["\\gt"]} />

### GreaterEqual

`(any, any*) -> boolean`

Greater-than-or-equal comparison (greater than or equal to).

<MathJson name="GreaterEqual" latex={["\\ge"]} />

### identicallyEqual

`(any, any) -> boolean`

Identity comparison (`\equiv`).

True iff the operands are equal for every value of their free variables.

`identicallyEqual(a, b)` is `True` when the two expressions have the same
value for every value of their free variables. It applies symbolic
transformations, expansion and simplification, and evaluates both
expressions at sample points. A `True` that rests on sampling is a very
strong indication, not a proof: this is the only comparison that can answer
from sampling. It is three-valued: `True`, `False`, or unevaluated when the
identity can neither be shown nor refuted, which includes expressions that
only differ at the sample points.

```epsil
[identicallyEqual((x + 1)^2, x^2 + 2x + 1), identicallyEqual(1, 2)]
// ➔ [true,false]
identicallyEqual(sin(x), cos(x))
// ➔ IdenticallyEqual(sin(x), cos(x))
```

<MathJson name="IdenticallyEqual" latex={["\\equiv"]}>

`["IdenticallyEqual", a, b]`, the operator form of the
`expr.isIdenticallyEqual()` method. In LaTeX, `\equiv` or `≡`:
`(x+1)^2 \equiv x^2 + 2x + 1`. A `\equiv` followed by `\pmod{n}` is a
congruence, and parses as `Congruent`.

</MathJson>

### isSame

`(any, any) -> boolean`

Compare two expressions for structural equality

`isSame(a, b)` is `True` when the two expressions are written the same way,
without canonicalization. To compare their values, use `==`; to compare them
structurally but ignoring the order of the arguments of a commutative
function, compare their `canonicalForm(…, "Order")`.

```epsil
[isSame(2 + 3, 2 + 3), isSame(1 + 1, 2)]
// ➔ [true,false]
```

<MathJson name="IsSame">

`["IsSame", a, b]`.

</MathJson>

### Less

`(any, any*) -> boolean`

Less-than comparison (strictly less than).

<MathJson name="Less" latex={["\\lt"]} />

### LessEqual

`(any, any*) -> boolean`

Less-than-or-equal comparison (less than or equal to).

<MathJson name="LessEqual" latex={["\\le"]} />

### NotApprox

`(any, any*) -> boolean`

Negated approximate-equality relation (not approximately equal).

<MathJson name="NotApprox" latex={["\\not\\approx"]} />

### NotApproxEqual

`(any*) -> unknown`

Negated approximately-equal relation.

<MathJson name="NotApproxEqual" latex={["\\not\\approxeq"]} />

### NotApproxNotEqual

`(any, any*) -> boolean`

Negated approximately-not-equal relation.

### NotEqual

`(any, any*) -> boolean`

Inequality comparison (not equal to).

<MathJson name="NotEqual" latex={["\\ne"]} />

### NotGreater

`(any, any*) -> boolean`

Negated greater-than relation (not greater than).

<MathJson name="NotGreater" latex={["\\ngtr"]} />

### NotGreaterNotEqual

`(any, any*) -> boolean`

Neither greater than nor equal to.

<MathJson name="NotGreaterNotEqual" latex={["\\ngeqq"]} />

### NotLess

`(any, any*) -> boolean`

Negated less-than relation (not less than).

<MathJson name="NotLess" latex={["\\nless"]} />

### NotLessNotEqual

`(any, any*) -> boolean`

Neither less than nor equal to.

<MathJson name="NotLessNotEqual" latex={["\\nleqq"]} />

### NotPrecedes

`(any, any*) -> boolean`

Negated precedes relation (does not precede).

<MathJson name="NotPrecedes" latex={["\\nprec"]} />

### NotSucceeds

`(any, any*) -> boolean`

Negated succeeds relation (does not succeed).

<MathJson name="NotSucceeds" latex={["\\nsucc"]} />

### NotTilde

`(any, any*) -> boolean`

Negated similarity relation (not similar).

<MathJson name="NotTilde" latex={["\\nsim"]} />

### NotTildeEqual

`(any, any*) -> boolean`

Negated approximately/asymptotically-equal relation (not approximately equal).

### NotTildeFullEqual

`(any, any*) -> boolean`

Negated isomorphism/congruence relation (not isomorphic or congruent).

<MathJson name="NotTildeFullEqual" latex={["\\ncong"]} />

### Precedes

`(any, any*) -> boolean`

Precedes relation in an ordering (comes before).

<MathJson name="Precedes" latex={["\\prec"]} />

### Same

`(any, any*) -> boolean`

Structural identity comparison (Epsil `===`).

True iff every adjacent pair of operands is structurally identical.

`a === b`, also written `≣`, is `True` when the canonical forms of the
operands are the same expression. It always answers, with no tolerance and
no numeric approximation of an exact value. It never reads the value of a
variable: with `x` assigned `5`, `x === 5` is `False` and `x == 5` is `True`.
A parameter of a function is different: it stands for its argument, so in
the predicate of `any`, `filter` or `find`, `x => x === 2` compares each
element with `2`. Numbers compare by exact value, not by notation. With more
operands it is a chain: `a === b === c`.

```epsil
[sqrt(2) === 1.4142135623730951, sqrt(2) == 1.4142135623730951, 0.5 === 1/2]
// ➔ [false,true,true]
let x = 5
[x === 5, x == 5]
// ➔ [false,true]
[any([1, 2, 3], x => x === 2), filter([1, 2, 3, 2], x => x === 2), find([1, 2, 3], x => isSame(x, 3))]
// ➔ [true,[2,2],3]
```

`==` is the comparison of values: it can stay unevaluated when the answer is
not known, because `x == y` is a condition. Because `===` always answers, it
has no exception for `NaN`, also inside a collection, and a list is compared
as a whole, not element by element.

```epsil
[x === y, x == y]
// ➔ [false,x == y]
[NaN === NaN, NaN == NaN, [NaN] === [NaN], [NaN] == [NaN]]
// ➔ [true,false,true,false]
```

`isSame` compares the operands as written, and `===` their canonical forms:
`isSame(1 + 1, 2)` is `False`, but `1 + 1 === 2` is `True`.

<MathJson name="Same">

`["Same", a, b, ...]`, the operator form of the `expr.isSame()` method.

```json example
["Same", ["Sqrt", 2], 1.4142135623730951]
// ➔ "False"
["Same", "NaN", "NaN"]
// ➔ "True"
```

</MathJson>

### Succeeds

`(any, any*) -> boolean`

Succeeds relation in an ordering (comes after).

<MathJson name="Succeeds" latex={["\\succ"]} />

### Tilde

`(any, any*) -> boolean`

Generic similarity relation (`\sim`): similar geometric figures, asymptotic equivalence, or "is distributed as". Inert: stays symbolic.

<MathJson name="Tilde" latex={["\\sim"]} />

### TildeEqual

`(any, any*) -> boolean`

Approximately or asymptotically equal

<MathJson name="TildeEqual" latex={["\\simeq"]} />

### TildeFullEqual

`(any, any*) -> boolean`

Indicate isomorphism, congruence and homotopic equivalence

<MathJson name="TildeFullEqual" latex={["\\cong"]} />
