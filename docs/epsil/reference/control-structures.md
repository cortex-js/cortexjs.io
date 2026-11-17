---
title: Control structures Reference
sidebar_label: Control structures
slug: /reference/control-structures/
description: "The control structures library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from control-structures.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Control structures

The 16 definitions of the control structures library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Overview

The flow of a program is controlled by control structures: expressions
that define how a sequence of expressions is evaluated. The
[Control Flow](/control-flow/) page describes their Epsil syntax.

### Sequential control structure

A program and a block evaluate their statements one after the other. A
program is a [`Program`](/reference/core/#program), and a block `{ … }`
or `do { … }` is a [`Block`](/reference/core/#block).

### Conditional control structure

`if`, `a if c else b` and [`Which`](#which) evaluate an expression
depending on the value of a condition, and `match` depending on the
structure of a value.

### Loops

`for`, `while` and `parallel for` evaluate a body repeatedly, for effect.
[`fixedPoint`](#fixedpoint) applies a function repeatedly until its value
no longer changes.

### Controlling the flow of execution

`break` and [`Break(v)`](#break) leave a loop, and `continue` skips to its
next iteration.

## Restriction

An `if` without `else`, or the call `If(c, e)`, is a **restriction**: the
value of `e` where `c` is `true`, and the absent value of `e` where it is
`false` (`NaN` for a number, a point of `NaN` coordinates for a point,
`missing` for any other value). When `c` cannot be decided, the
restriction stays unevaluated.

```epsil
let x = 3
If(x > 0, x^2)
// ➔ 9
let x = -2
If(x > 0, x^2)
// ➔ NaN
If(x > 0, x^2)
// ➔ If(0 < x, x^2)
```

The type of a restriction is the type of `e`. The absent value is outside
that type, as `NaN` is outside `real`:

```epsil
type(If(x > 0, 5))
// ➔ TypeFrom("integer")
```

### A restriction of a collection

When `e` is a list and `c` is a single condition, the whole list is the
value: the result is the list when the condition is `true`, and `missing`
when it is `false`.

```epsil
If(true, [10, 20, 30])
// ➔ [10,20,30]
If(false, [10, 20, 30])
// ➔ missing
```

An operation that applies to each element of the list applies to the whole
restricted list: the condition stays on the outside. When the condition is
`false`, the result is `missing`, also for `2 * …` and `length`. `first` of
a false restricted list of points is the point `(NaN, NaN)`, while the
restricted list itself is `missing`.

```epsil
sin(If(0 < t, [1, 2, 3]))
// ➔ If(0 < t, [sin(1),sin(2),sin(3)])
let t = -1
sin(If(0 < t, [1, 2, 3]))
// ➔ missing
let t = -1
length(If(0 < t, [1, 2, 3]))
// ➔ missing
let t = -1
first(If(0 < t, [(1, 2), (3, 4)]))
// ➔ (NaN, NaN)
```

When `c` is a **list of conditions** (a mask), `e` is paired with the
conditions position by position, and the result is a list with one cell for
each pair. A cell is the element when its condition is `true`. When its
condition is `false`, the cell is `NaN` for a number, and a point whose
coordinates are `NaN` for a point.

```epsil
If([true, false, true], [10, 20, 30])
// ➔ [10,NaN,30]
If([true, false], [(1, 2), (3, 4)])
// ➔ [(1, 2),(NaN, NaN)]
```

The list of conditions is usually a comparison over the list itself:

```epsil
If([10, 20, 30] > 15, [10, 20, 30])
// ➔ [NaN,20,30]
```

The result keeps the positions of the elements: a masked element is not
removed. To remove the elements that do not satisfy a condition, use
[`filter`](/reference/collections/#filter).

**What is paired.** An ordered collection of numbers or points is paired
element by element: a list, a vector, a range, and a lazy collection such
as a `map` over a range. A number or a point is **one value**, repeated in
each cell: a point `(1, 2)` is not split into its coordinates. A matrix (a
list of lists), a set and a string are errors under a list of conditions.

```epsil
If([true, false], 5)
// ➔ [5,NaN]
If([true, false], (1, 2))
// ➔ [(1, 2),(NaN, NaN)]
If([true, false], {1, 2})
// ➔ error: Type error: expected `list<number | tuple> | number | tuple`, got `set<integer>` at `{1, 2}` in `If([True, False], {1, 2})`
```

**Different lengths.** When the types give both lengths and they differ,
the restriction is an `incompatible-dimensions` error, as for `+`. When a
length is known only from the value, the result has the length of the
shorter of the two operands.

```epsil
If([true, false], [10, 20, 30])
// ➔ error: Static error: incompatible dimensions at `2 vs 3` in `If([True, False], [10, 20, 30])`
If([true, false, true], filter(1..10, x => x > 8))
// ➔ [9,NaN]
```

**A collection that is infinite or of unknown length.** The collection is
paired with the conditions over the length of the list of conditions. Only
the elements that are necessary are read.

```epsil
If([true, false, true], 1..Infinity)
// ➔ [1,NaN,3]
```

**Elements that cannot be read yet.** If the elements of the collection
cannot be computed, the restriction stays unevaluated. This is the case for
a range with a bound that has no value, and for a symbol that is declared as
a list and has no value. The restriction evaluates when the elements can be
read.

```epsil
If([true, false], 1..n)
// ➔ If([true,false], Range(1, n))
let n = 5
If([true, false], 1..n)
// ➔ [1,NaN]
```

**A condition that cannot be determined.** A cell whose condition cannot be
determined stays a restriction of that one element. The other cells are
evaluated.

```epsil
If([true, 0 < t], [10, 20])
// ➔ [10,If(0 < t, 20)]
```

**Types.** The type of a restriction with a list of conditions is a list of
the element type, found from the types of the operands: `list<number>` for
numbers, because a masked number is `NaN`, and
`list<tuple<number, number>>` for points, because a masked point is a point
of `NaN` coordinates.

```epsil
type(If([true, false], [1, 2]))
// ➔ TypeFrom("list<number>")
type(If([true, false], [(1, 2), (3, 4)]))
// ➔ TypeFrom("list<tuple<number, number>>")
```

A name whose declared type admits both one value and a list of values,
such as `tuple<number, number> | list<tuple<number, number>>` (a point or
a list of points), is paired according to the value it holds: a point is
one value, and a list of points is paired element by element.

```epsil
let p: tuple<number, number> | list<tuple<number, number>> = (1, 2)
If([true, false], p)
// ➔ [(1, 2),(NaN, NaN)]
```

### Compiling a restriction

Compiled, a restriction with one condition is a ternary whose masked branch
is the absent value of the value's domain: `(cond ? e : NaN)` for a number,
on every target. On JavaScript, a restriction with a list of conditions
gives `NaN` for a masked number and `[NaN, NaN]` for a masked point: with
`V = [-1, 2]`, `If(V > 0, (1, 2))` runs to `[[NaN, NaN], [1, 2]]`.

## LaTeX syntax for control structures

Control structures are written in LaTeX with keywords. Each keyword can be
written in three equivalent ways, which may be mixed:

- `\keyword{if}`: the preferred form. It stays in math mode and renders
  with symmetric keyword spacing.
- `\text{if}`: the conventional form.
- `\operatorname{if}` (or `\mathrm{if}`): the operator-name spelling.

A keyword of several words is one token, such as `\keyword{for all}`.
`\keyword{…}` requires the rendering environment to define the `\keyword`
command; `\text{…}` and `\operatorname{…}` render everywhere.

The notation of each control structure is in the MathJSON part of its
entry: the inline `if` and the restriction braces under
[`If`](#if), `cases` under [`Which`](#which), `for … from … to … do` under
[`Loop`](#loop), the trailing `for` under
[`Comprehension`](#comprehension), and the semicolon blocks and `where`
bindings under [`Block`](/reference/core/#block). The
[compile guide](/compute-engine/guides/compiling/) describes how control
structures are compiled to JavaScript.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### AddTo

`(expression, any) scope -> any`

Compound assignment: `AddTo(s, e)` is `Assign(s, Add(s, e))`, and `AddTo(At(L, i, …), e)` is `Assign(L, ReplaceAt(L, i, …, Add(At(L, i, …), e)))`, with each position evaluated once, before `e`. In the body of a `ParallelLoop`, it adds a contribution to an accumulator, a variable declared outside the loop.

In Epsil, `AddTo` is written `s += v` and `L[i] += v`.

```epsil
let s = 1
s += 4
s
// ➔ 5
let L = [1, 2, 3]
L[2] += 10
L
// ➔ [1,12,3]
```

In the body of a [`parallel for`](/reference/control-structures/#parallelloop),
`+=` is the only way to change a variable declared outside the loop.

<MathJson name="AddTo">

`["AddTo", symbol, value]` and
`["AddTo", ["At", list, position-1, …], value]`.

```json example
["Block",
  ["Declare", "L", "'unknown'", ["List", 1, 2, 3]],
  ["AddTo", ["At", "L", 2], 10],
  "L"]
// ➔ [1, 12, 3]
```

</MathJson>

### Alternatives

`(expression+) -> nothing`

Inside a `Match` pattern, `Alternatives(p1, p2, …)` matches if any alternative matches. Alternatives must be binding-free.

### Break

`(value: any?) -> nothing`

Exit the enclosing loop immediately, optionally with a value (`Break(v)`) that becomes the loop value.

In Epsil, the bare `break` leaves the innermost loop; see
[`break` and `continue`](/control-flow/#break-and-continue). The keyword
has no value form. The call `Break(v)` leaves the loop and makes `v` the
value of the loop, in a `for`, a `while` or a `Loop`:

```epsil
let i = 0
while true { i += 1; if i > 3 { Break(i * 10) } }
// ➔ 40
```

The keyword `break` outside a loop is the `control-outside-loop`
diagnostic. The call `Break()` outside a loop does not evaluate: it is its
own value. A block that evaluates it stops there, and the value of the
block is `Break()`.

```epsil
Break()
// ➔ Break()
do { 1; Break(); 2 }
// ➔ Break()
```

<MathJson name="Break">

`["Break"]` and `["Break", value]`. The value of the enclosing `["Loop"]`
is `value`, or `Nothing` without one.

</MathJson>

### Comprehension

`(body: expression, iterators: expression+) -> list`

Value-producing comprehension: evaluate `body` in nested iteration over one or more `Element` clauses and collect the results into a list. Later clauses see earlier bindings; independent clauses produce a Cartesian product. A clause with a third operand, `Element(x, xs, cond)`, is a guard: only the elements for which `cond` evaluates to `True` are visited.

In Epsil, a comprehension is written `[body for x in xs]`. With one clause,
it is `map(x => body, xs)`.

```epsil
[x^2 for x in 1..3]
// ➔ [1,4,9]
```

Several clauses, separated by commas, run as nested loops: the first clause
is the outer loop. A later clause sees the names bound by the earlier ones,
so its collection can depend on them. Independent clauses give the Cartesian
product; dependent clauses give fewer combinations.

```epsil
[(x, y) for x in 1..2, y in 1..2]
// ➔ [(1, 1),(1, 2),(2, 1),(2, 2)]
[(x, y) for x in 1..3, y in 1..x]
// ➔ [(1, 1),(2, 1),(2, 2),(3, 1),(3, 2),(3, 3)]
```

A final `if` keeps only the combinations for which the condition is `True`.

```epsil
[x for x in 1..10 if isPrime(x)]
// ➔ [2,3,5,7]
```

The names bound by the clauses do not leak into the enclosing scope.

```epsil
let x = 5
[x^2 for x in 1..3]
x
// ➔ 5
```

A comprehension is a value, not control flow: `break`, `continue` and
`return` in the body are not caught by the comprehension. To iterate for an
effect instead of a result, use [`Loop`](/reference/control-structures/#loop).

A comprehension with `parallel` before its first `for` is a
[parallel comprehension](/reference/control-structures/#parallelcomprehension).

<MathJson name="Comprehension">

`["Comprehension", body, ["Element", x, xs], …]`. A clause with a third
operand, `["Element", x, xs, condition]`, keeps only the elements for which
the condition is `True`.

```json example
["Comprehension", ["Square", "x"], ["Element", "x", ["Range", 1, 3]]]
// ➔ ["List", 1, 4, 9]

["Comprehension",
  ["Tuple", "x", "y"],
  ["Element", "x", ["Range", 1, 3]],
  ["Element", "y", ["Range", 1, "x"]]]
// ➔ 6 tuples: (1,1), (2,1), (2,2), (3,1), (3,2), (3,3)
```

In LaTeX, a trailing `\operatorname{for}` (or `\keyword{for}`) produces a
`Comprehension`: `(x, y) \keyword{for} x = [1...3], y = [1...x]`.

The trailing `for` keyword of LaTeX binds looser than `,` and `=`, so the
body (`(x, y)` in `(x, y) \keyword{for} x = [1...3], y = [1...x]`) is
parsed before the keyword, and the clauses are parsed after it as
comma-separated `name = expr` pairs. Several clauses give a Cartesian
product, or an iteration shaped by the dependencies when a later clause
references an earlier one.

</MathJson>

### Condition

`(expression, symbol?) -> boolean`

Test whether a value satisfies one or more conditions.

### Continue

`() -> nothing`

Skip to the next iteration of the enclosing loop.

In Epsil, `continue` skips to the next iteration of the innermost loop;
see [`break` and `continue`](/control-flow/#break-and-continue). It takes
no argument.

```epsil
let s = 0
Loop(do { if k == 2 { Continue() }; s += k }, Element(k, 1..4))
s
// ➔ 8
```

The keyword `continue` outside a loop is the `control-outside-loop`
diagnostic. The call `Continue()` outside a loop does not evaluate: it is
its own value.

```epsil
Continue()
// ➔ Continue()
```

<MathJson name="Continue">

`["Continue"]`.

</MathJson>

### fixedPoint

`(function, initial: any, maxIterations: integer?) -> unknown`

Apply a function repeatedly, starting from an initial value, until two successive values are the same: `FixedPoint(f, x)` is the first of `f(x)`, `f(f(x))`, … that `f` maps to itself.

Two values are the same when they are structurally identical, or when they are numbers, one of them a float, that agree to the working precision (their difference is at most a few units of the last digit, relative to their size), or when they are lists or tuples of the same length whose elements are the same. A sequence of exact values stops only when two of them are identical.

Without a maximum, the call stays unevaluated when the iteration cannot converge: when a value contains the previous one (`FixedPoint(Cos, 1)`: `Cos(1)` is exact, and `Cos(Cos(1))` nests it), or when an exact number gains digits at each step. Start from a float (`FixedPoint(Cos, 1.0)`), or evaluate with `N`, for a numeric fixed point.

The optional third argument is the maximum number of applications, a positive integer. It defaults to the engine iteration limit, and then the call stays unevaluated if the iteration has not converged by that limit (raise `ce.iterationLimit` for a slower one). An Epsil program has no iteration limit unless the host sets one, so there an iteration that does not converge stops only at a maximum or at a time limit. When an explicit maximum is reached, the last value is returned.

```epsil
fixedPoint(x => (x + 2 / x) / 2, 1.0)
// ➔ 1.4142135623730950488
```

```epsil
fixedPoint(cos, 1.0)
// ➔ 0.739085133215160641631
```

The function can be written with the implicit argument `_`:

```epsil
fixedPoint(floor(_ / 2), 100)
// ➔ 0
```

With a maximum number of applications, the call returns the last value
when it reaches the maximum. Here `f` is applied five times to `1`:

```epsil
fixedPoint(x => x / 2 + 1, 1, 5)
// ➔ 63/32
```

[`reduce`](/reference/collections/#reduce) is the iteration over the
elements of a collection.

<MathJson name="FixedPoint">

`["FixedPoint", body, initial-value]` and
`["FixedPoint", body, initial-value, max-iterations]`. The body is a
function, or an expression that uses the implicit argument `"_"`.

</MathJson>

### If

`(expression, expression, expression?) -> any`

`If(c, e1, e2)` evaluates to `e1` when `c` is `True` and to `e2` otherwise; without `e2` it is the absent value of the domain of `e1` when `c` is `False`: `NaN` for a number, `Missing` otherwise, as for a restriction `e1\{c\}`, which parses to `If(c, e1)`. Only the selected expression is evaluated.
When `c` is a flat list of booleans (`L < 3` with `L` a list), the selection is made at each position and the value is a list: `If([True, False, True], 1, 0)` is `[1, 0, 1]`, and with `L = [1, 3, 5]`, `If(L < 3, L, 0)` is `[1, 0, 0]`. `If(c, e1, e2)` is `Which(c, e1, True, e2)`: see `Which` for the rules of element-wise selection. A condition that is a scalar selects an arm whole, also when the arm is a list.

In Epsil, `If` is written `if c { a } else { b }`, or
`a if c else b` when both branches are single expressions. The call form
`If(c, a, b)` is the same expression. A branch written in braces is a
block, so a `let` in it is local to the branch.

```epsil
let x = 2
if x > 0 { let y = x * 10; y + 1 } else { 0 }
// ➔ 21
```

Without an `else` branch, there is nothing to select when the condition is
`false`, and the value is the absent value of the branch: `NaN` for a
number, a point whose coordinates are all `NaN` for a point, and `missing`
for any other value. The type of the expression is the type of the branch.

```epsil
if false { 5 }
// ➔ NaN
if false { (1, 2) }
// ➔ (NaN, NaN)
if false { "a" }
// ➔ missing
type(If(x > 0, 5))
// ➔ TypeFrom("integer")
```

An `if` without `else` is also called a
[restriction](#restriction).

A condition with no value is `false`: the absent value `missing`, and a
comparison with an operand that has no value (`NaN`, `missing`, `1/0`).
`Which` reads its conditions the same way.

```epsil
if missing { 1 } else { 2 }
// ➔ 2
if missing > 0 { 1 } else { 2 }
// ➔ 2
```

A condition that cannot be decided, such as a comparison with a free
symbol, leaves the `if` unevaluated.

```epsil
if y > 0 { y } else { -y }
// ➔ If(0 < y, {y}, {-y})
```

Only the selected branch is evaluated. The branch that is not selected is
**dead code**: an error that its evaluation would produce never reaches the
value. Here the `else` branch would be a `match-no-case` error:

```epsil
if true { 5 } else { match 3 { 0 => 1 } }
// ➔ 5
```

The static check of a program runs before evaluation, and it checks every
branch: a type error in the branch that is not selected still stops the
program.

```epsil
if true { 5 } else { 1 / "a" }
// ➔ error: Type error: expected `number`, got `string` at `a` in `1 / "a"`
```

`if` expressions nest, and `else if` chains them. A function that returns
the absolute value of a number:

```epsil
f(x) = if x > 0 { x } else { -x }
[f(3), f(-2)]
// ➔ [3,2]
```

When the condition is a list of booleans, for example `L < 3` with `L` a
list, `if` selects **element by element** and the value is a list. See
[Element-wise selection](#element-wise-selection) under `Which`.

<MathJson name="If">

`["If", condition, expr-1]` and `["If", condition, expr-1, expr-2]`.

```json example
["If", "False", 5]
// ➔ NaN

["If", "False", ["Tuple", 1, 2]]
// ➔ (NaN, NaN)

["If", "False", "'a'"]
// ➔ Missing

["If", "Missing", 1, 2]
// ➔ 2

["If", ["Greater", "Missing", 0], 1, 2]
// ➔ 2
```

Only *evaluation* skips the branch that is not selected. The boxed
expression still carries the diagnostic of a malformed branch, so the error
is still reportable: `["If", "True", 5, ["Divide", "x"]]` evaluates to `5`
and boxes as `["If", "True", 5, ["Divide", "x", ["Error", "'missing'"]]]`.

The absolute value as a MathJSON function:

```json example
["Function", ["If", ["Greater", "n", 0], "n", ["Negate", "n"]], "n"]
```

A `["Declare"]` that is directly a branch of an `If` is the error
`declaration-below-statement`: declare the name before the `If`, or put the
declaration in a `["Block"]` branch. The Epsil braces make that block.

A single-branch `If` is a restriction. It is the parse of the restriction
braces `expr\{cond\}` and of a `where` condition:
`["If", ["Greater", "x", 0], ["Square", "x"]]` is
`x^2\text{ where }0\lt x`. A trailing `\{cond\}` after a complete
expression is a restriction: `f(x)\left\{0 < x < 2\right\}` parses to
`["If", ["Less", 0, "x", 2], ["f", "x"]]`. A standalone
`\{1, 2, 3\}` is still a `Set`. Stacked restriction braces parse to one `If`
whose condition is an `And`, in the order written:
`x\left\{x > 0\right\}\left\{x < 10\right\}` is
`["If", ["And", ["Less", 0, "x"], ["Less", "x", 10]], "x"]`. The serializer
writes a restriction with `where`, never with braces:
`x\text{ where }0\lt x, x\lt10`, which parses back to the same expression.

The inline `if` of LaTeX,
`\keyword{if} x > 0 \keyword{then} x \keyword{else} -x`, parses to
`["If", ["Less", 0, "x"], "x", ["Negate", "x"]]`. The `\keyword{else}`
part is optional.

Up to version 0.177.0 a restriction was the operator `["When", expr,
condition]`. `["When"]` is removed: in a MathJSON document it is now an
unknown operator, which does not evaluate. Write `["If", condition, expr]`
instead (the operands are in the other order).

</MathJson>

### Loop

`(body: expression, iterators: expression*) -> any`

Imperative loop, evaluated **for effect**. `Loop(body)` repeatedly evaluates `body` until it yields a `Break` or `Return`. `Loop(body, Element(x, coll), …)` iterates `body` in nested iteration over the Element clauses (later clauses see earlier bindings; independent clauses produce a Cartesian product). The loop value is `Nothing`, or the value carried by a `Break`/`Return`. For a value-producing comprehension use `Comprehension` or `Map`.

In Epsil, a `Loop` is written with `for` or `while`. `for x in xs { … }` is
`Loop(body, Element(x, xs))`. `while c { … }` is a `Loop` whose body starts
with `if !c { break }`, and `while true { … }` repeats its body until a
`break`.

```epsil
let counter = 0
while true {
  if counter >= 5 { break }
  counter += 1
}
counter
// ➔ 5
```

A loop runs **for effect**: its value is `nothing`. The bare `break` and
`continue` leave the loop and go to its next iteration. The call
`Break(v)` leaves the loop and makes `v` the value of the loop.

```epsil
let s = 0
for i in 1..6 {
  if i % 2 == 0 { continue }
  s += i
}
s
// ➔ 9
for i in 1..10 { if i > 3 { Break(i) } }
// ➔ 4
```

The loop variable does not leak into the enclosing scope.

```epsil
let x = 5
for x in 1..3 { }
x
// ➔ 5
```

A name that the body assigns is declared with a value before the loop. An
assignment to a name that no scope declares is an error. To use the result,
end the program or the block with the name:

```epsil
for i in 1..3 { t = i }
// ➔ error: Static error: `t` is not declared: write `let t = …` in `do {t := i}`
let s = 0
for i in 1..4 { s = s + i }
s
// ➔ 10
```

A `for` statement has one clause. For several clauses, nest the loops, or
write the call form with several `Element` clauses: they run as nested
loops, the first clause outermost, and a later clause sees the names that
the earlier ones bind, so its collection can depend on them.

```epsil
let s = 0
Loop(s += x * y, Element(x, 1..3), Element(y, 1..x))
s
// ➔ 25
```

A `Loop` with only a body is the `while(true)` of JavaScript and the
`While[True, …]` of Mathematica. A `Loop` with one `Element` clause is the
`forEach()` of JavaScript, and is close to the `Do[…]` of Mathematica. To
build a **list** from each pass, use a
[comprehension](/reference/control-structures/#comprehension), or
[`map`](/reference/collections/#map) and
[`filter`](/reference/collections/#filter). [`sum`](/reference/arithmetic/#sum)
and [`product`](/reference/arithmetic/#product) are specialized loops, and
[`reduce`](/reference/collections/#reduce) folds a collection without a
loop.

<MathJson name="Loop">

`["Loop", body]` evaluates `body` until it is a `["Break"]` or a
`["Return"]`. `["Loop", body, ["Element", name, collection], …]` evaluates
`body` once for each combination of the clauses. Inside `body`, `["Break"]`
or `["Break", value]` exits the loop, with `value` (or `Nothing`) as the
value of the `Loop`; `["Continue"]` skips to the next iteration; and
`["Return", value]` exits the loop and the enclosing `["Function"]`. A
`["Declare"]` that is directly the body is the error
`declaration-below-statement`.

```json example
["Loop", ["Print", ["Square", "_"]], ["Element", "_", ["Range", 5]]]
// ➔ 1 4 9 16 25 (printed); the Loop expression evaluates to Nothing

["Block",
  ["Declare", "s", "'unknown'", 0],
  ["Loop", ["Assign", "s", ["Add", "s", "i"]], ["Element", "i", ["Range", 1, 4]]],
  "s"]
// ➔ 10

["Block",
  ["Declare", "counter", "integer", 0],
  ["Loop",
    ["Block",
      ["If", ["Not", ["Less", "counter", 5]], ["Break"]],
      ["Assign", "counter", ["Add", "counter", 1]]
    ]
  ],
  "counter"
]
// ➔ 5
```

In LaTeX,
`\keyword{for} i \keyword{from} 1 \keyword{to} 10 \keyword{do} i^2`
parses to
`["Loop", ["Power", "i", 2], ["Element", "i", ["Range", 1, 10]]]`. It is an imperative loop, evaluated for effect: its value is
`Nothing`.

</MathJson>

### Match

`(expression, expression+) -> unknown`

Structural pattern match. `Match(subject, MatchCase(pattern, body), …)` evaluates `subject` once, then selects the first case whose pattern matches (structurally, `isSame`-like) and whose guard holds, applying its body to the captured values. Unlike `Which`, `Match` always decides: a symbolic subject that is not structurally a case still falls through to a wildcard case. No matching case yields `Error("match-no-case", subject)`.

The Epsil `match` expression, its patterns, guards and exhaustiveness check
are described on the [Control Flow](/control-flow/#match) page.

#### Error subjects

`match` also decides when the subject is an
[error value](/reference/core/#error): it is the construct for rescuing a
failed computation. Matching stays total, but an error is never handed to
a pattern that would pretend the failure has a shape: literal, range, pin
and structural cases all fail against an error subject, and it falls
through to `_` or to a binding.

```epsil
match RuntimeError("boom") {
  0 => "zero"
  [a] => "a list"
  _ => "rescued"
}
// ➔ "rescued"
```

An explicit `Error(…)` pattern is the exception: it takes the error apart
and binds its code and its context. This is the idiomatic rescue:

```epsil
match (match 3 { 0 => 1 }) {
  Error(code, s) => (code, s)
  _ => 0
}
// ➔ ("match-no-case", 3)
```

A guard can inspect the subject with
[`isError`](/reference/core/#iserror) or [`type`](/reference/core/#type):

```epsil
match RuntimeError("boom") {
  v if isError(v) => "failed"
  _ => "ok"
}
// ➔ "failed"
```

The trace that an error collects as it propagates is removed before
matching, so a pattern only sees the code and the context of the error.

#### Dispatch and compilation

A `match` over constant cases is dispatched in constant time, and
fixed-shape list, tuple and dictionary patterns are matched without the
general pattern matcher. Compiled to JavaScript, constant cases give a
comparison chain or a `switch` statement, and fixed-shape destructuring is
supported.

<MathJson name="Match">

`["Match", subject, case-1, …, case-n]`, where each case is
`["MatchCase", pattern, body]` or `["MatchCase", pattern, guard, body]`.

The pattern uses the wildcards of
[patterns and rules](/compute-engine/guides/patterns-and-rules/): `"_n"`
captures one value, `"__n"` a sequence, `"___n"` an optional sequence, and
`"_"` matches anything without capturing. The guard and the body reference
a capture by its **bare name** (`"n"` for `"_n"`). An Epsil binding `n` is
the wildcard `"_n"`, and the Epsil `otherwise` pattern is `"_"`.

```json example
["Match", ["List", 3, 4],
  ["MatchCase", ["List", "_a", "_b"], ["Add", "a", "b"]]
]
// ➔ 7

["Match", "x",
  ["MatchCase", 0, "'zero'"],
  ["MatchCase", "_", "'other'"]
]
// ➔ "other" — x could be 0 semantically, but is not structurally 0

["Match", 5,
  ["MatchCase", "_n", ["Greater", "n", 0], "'positive'"],
  ["MatchCase", "_", "'other'"]
]
// ➔ "positive"
```

Two auxiliary heads may appear inside a pattern: `["Pin", expr]` (the Epsil
`== expr`) matches the **value** of `expr`, evaluated when the match is
performed, and `["Alternatives", p-1, …, p-n]` (the Epsil `p1 | p2`), as a
case's pattern, matches if any alternative matches. The alternatives share
the case's guard and body and must not contain named captures.

```json example
["Match", 2,
  ["MatchCase", ["Alternatives", 1, 2, 3], "'small'"],
  ["MatchCase", ["Pin", "Pi"], "'pi'"],
  ["MatchCase", "_", "'big'"]
]
// ➔ "small"
```

A two-operand `["Range", lo, hi]` at the top level of a case's pattern, or
of one of its `["Alternatives"]`, is an inclusive numeric membership test.
The bounds must be numeric literals; `{"num": "+Infinity"}` and
`{"num": "-Infinity"}` are allowed. A `Range` with a symbolic bound or a
third *step* operand is not a membership test and keeps its ordinary
structural meaning in MathJSON; in Epsil, those spellings are parse
diagnostics. To compare a subject with a `Range` value, pin it:
`["Pin", ["Range", 1, 10]]`.

```json example
["Match", 5,
  ["MatchCase", ["Range", 1, 10], "'in range'"],
  ["MatchCase", "_", "'out of range'"]
]
// ➔ "in range"

["Match", "Pi",
  ["MatchCase", ["Range", 1, 10], "'in range'"],
  ["MatchCase", "_", "'not a number literal'"]
]
// ➔ "not a number literal"

["Match", ["Ln", "'a'"],
  ["MatchCase", ["Error", "_code"], "code"],
  ["MatchCase", "_", "'no error'"]
]
// ➔ ["ErrorCode", "'incompatible-type'", "'number'", "'string'"]

["Match", ["Ln", "'a'"],
  ["MatchCase", "_v", ["IsError", "v"], "'failed'"],
  ["MatchCase", "_", "'ok'"]
]
// ➔ "failed"
```

The trace that is removed before matching is the `["ErrorTrace"]` operand
of the error. If no case matches, the value is
`["Error", "'match-no-case'", subject]`.

Symbolic patterns, such as `["Add", "_a", 1]`, cannot be compiled: the
compilation fails with an error rather than producing incorrect code.

</MathJson>

### MatchCase

`(expression, expression, expression?) -> nothing`

A case of a `Match`: `MatchCase(pattern, body)` or `MatchCase(pattern, guard, body)`. The pattern holds engine wildcards; the body references the bound capture names.

### ParallelComprehension

`(body: expression, iterators: expression+) random -> list`

Parallel comprehension: `ParallelComprehension(body, Element(x, xs), …)` is the list that `Comprehension` with the same operands gives, but the passes of the first clause can run in any order. The other clauses run in order inside each pass. The body changes no variable declared outside it. Inside a `WithRandomSeed` frame, the comprehension consumes one draw index and each pass draws from its own frame (`docs/RANDOMNESS-MODEL.md`). Unlike `Comprehension`, it is evaluated at once to a `List`.

In Epsil, a parallel comprehension puts `parallel` before the first `for`
of a comprehension: `[f(x) parallel for x in xs]`. Its rules are described
under [Parallel loops](/control-flow/#parallel-loops).

```epsil
[k^2 parallel for k in 1..4]
// ➔ [1,4,9,16]
```

The body changes no variable declared outside it, also with `+=`:

```epsil
let s = 0
[s += k parallel for k in 1..3]
// ➔ error: The body of a parallel comprehension cannot change "s", which is declared outside it; use a "parallel for" loop with "+=" to add to a variable
```

<MathJson name="ParallelComprehension">

`["ParallelComprehension", body, ["Element", name, collection], …]`.

```json example
["ParallelComprehension", ["Square", "k"], ["Element", "k", ["Range", 1, 4]]]
// ➔ [1, 4, 9, 16]
```

</MathJson>

### parallelDomain

MathJSON `ParallelDomain` · `(collection: any) random -> any`

The domain of the passes of a parallel loop (engine-internal).

### ParallelLoop

`(body: expression, iterators: expression+) random -> any`

Parallel loop, evaluated **for effect**: `ParallelLoop(body, Element(x, coll))` evaluates `body` once for each element of `coll` (a pass), and the passes can run in any order. The body can change a variable declared outside the loop only with `AddTo` (an accumulator). A read of an accumulator in a pass gives an unspecified value. Inside a `WithRandomSeed` frame, the loop consumes one draw index and each pass draws from its own frame (`docs/RANDOMNESS-MODEL.md`). The value is `Nothing`.

In Epsil, a `ParallelLoop` is written `parallel for x in xs { … }`. Its
rules are described under
[Parallel loops](/control-flow/#parallel-loops).

```epsil
let L = [0, 0]
parallel for i in 1..5 { L[i % 2 + 1] += i }
L
// ➔ [6,9]
```

A write other than `+=` to a variable declared outside the loop, and a
`break`, `continue` or `return` that would leave the loop, are errors:

```epsil
let s = 0
parallel for k in 1..3 { s = s + k }
// ➔ error: The body of a "parallel for" loop can change "s", which is declared outside the loop, only with "+=": the passes can run in any order
```

The compiled JavaScript gives the values of the interpreter, also for a
pass that reads an accumulator. The other compile targets decline the
loop.

<MathJson name="ParallelLoop">

`["ParallelLoop", body, ["Element", name, collection]]`.

```json example
["Block",
  ["Declare", "L", "'unknown'", ["List", 0, 0]],
  ["ParallelLoop",
    ["AddTo", ["At", "L", ["Add", ["Mod", "i", 2], 1]], "i"],
    ["Element", "i", ["Range", 1, 5]]],
  "L"]
// ➔ [6, 9]
```

The draws of a lazy collection inside a pass, a `Comprehension` or a `Map`
whose function draws, are not specified. To get the draws of each pass,
build the list directly, for example as `["List", ["Random"], ["Random"]]`.

</MathJson>

### Pin

`(expression) -> nothing`

Inside a `Match` pattern, `Pin(expr)` matches the value of `expr` (evaluated at match time) rather than its structure.

### Which

`(expression+) -> unknown`

`Which(c1, e1, c2, e2, …)` evaluates to the value of the first `e` whose condition `c` is `True`, and to `Missing` when no condition is `True`. A last clause with the condition `True` is the default. Only the selected expression is evaluated.
Element-wise selection: when a condition is a flat list of booleans (`L < 3` with `L` a list), the selection is made at each position, as `numpy.select` does, and the value is a list. At each position, the first clause whose condition is `True` there gives the value: an expression that is a list gives its element at that position, any other expression gives its own value. With `L = [1, 3, 5]`, `Which(L < 2, 10, L < 4, L, True, 0)` is `[10, 3, 0]`. A selected expression whose type is a list and whose elements cannot be read yet (`foo(L)` with `foo` undeclared) keeps the `Which` symbolic.
  - A condition that is not a list applies to every position.
  - Every expression is a number, a point, or a flat list of numbers or of points with the length of the condition, and all have one kind. A nested list, a list of another length, a string and a list of strings are static errors, as is a condition that is a nested list or holds a `Missing` cell. A relation (a boolean) is accepted.
  - A position that no clause selects holds `NaN` for a number, a point whose coordinates are `NaN` for a point, and `Missing` for a boolean.

Epsil has no keyword for `Which`: write the call `Which(c1, e1, c2, e2, …)`,
or an `if`/`else if` chain. A `Which` with no condition that is `true`, the
call `Which()` included, has nothing to select, and its value is `missing`.

```epsil
let n = -10
Which(n > 0, n, n < 0, -n, true, 0)
// ➔ 10
Which(false, 1, false, 2)
// ➔ missing
Which()
// ➔ missing
type(Which(x > 0, 1, x < 0, -1))
// ➔ TypeFrom("integer | missing")
```

The expressions that are not selected are **dead code**, as for `if`: an
error that their evaluation would produce never reaches the value.

```epsil
Which(false, match 3 { 0 => 1 }, true, 7)
// ➔ 7
```

`Which(c1, e1, c2, e2, …)` is the chain
`if c1 { e1 } else if c2 { e2 } …` without a final `else`, except that
when no condition is `true` its value is `missing`, also when the
expressions are numbers. It is the `switch` statement of JavaScript and
the `Which[]` function of Mathematica.

#### Element-wise selection

A condition can also be a **list of booleans**, such as the result of a
comparison of a list with a number: with `L = [1, 3, 5]`, `L < 3` is
`[true, false, false]`. Then `Which` and `if` select **at each position of
the list**, and the value is a list of the same length.

```epsil
If([true, false, true], 1, 0)
// ➔ [1,0,1]
let L = [1, 3, 5]
If(L < 3, L, 0)
// ➔ [1,0,0]
```

At each position, the first clause whose condition is `true` at that
position gives the value of that position. The rules:

- **An expression that is a list gives its element at the position**; an
  expression that is not a list gives its own value at every position. In
  the second example, position 1 takes element 1 of `L`, and the other
  positions take `0`. When a selected expression has the type of a list
  but its elements cannot be read yet, the selection stays symbolic.
- **A condition that is not a list applies to every position.**
- **Every list has the length of the condition.** Another length is an
  `incompatible-dimensions` error, as for `+`.
- **All expressions have one kind of element**: numbers, or points
  (`(x, y)`). A number beside a point is an error. Other values are
  accepted. A position that no clause selects is `false` for a relation (a
  region is not drawn there) and a color with `NaN` channels for a color.
  For any other value it is `missing`.
- **A position that no clause selects** holds `NaN` for a number, and a
  point whose coordinates are `NaN` for a point. A plot skips a `NaN`
  point. A number cell or a point cell is never `missing`.
- **Only the selected expressions are evaluated**, each one once.

```epsil
let L = [1, 3, 5]
Which(L < 2, foo(L), true, 0)
// ➔ Which([true,false,false], foo([1,3,5]), true, 0)
Which([true, false], 1, true, 3)
// ➔ [1,3]
let L = [1, 3, 5]
If(L < 3, [10, 20], 0)
// ➔ error: Static error: incompatible dimensions at `3 vs 2` in `[10, 20] if L < 3 else 0`
If([true, false], x > 0)
// ➔ [0 < x,false]
If([true, false], Rgb(1, 0, 0))
// ➔ [Rgb(1, 0, 0),Rgb(NaN, NaN, NaN)]
let L = [1, 3, 5]
If(L < 3, L)
// ➔ [1,NaN,NaN]
If([true, false], (1, 2))
// ➔ [(1, 2),(NaN, NaN)]
```

These are errors, found from the types before any evaluation (a type error,
or `incompatible-dimensions` for two lengths):

- a condition that is a list of lists, such as the comparison of a matrix
  with a number: with `M = [[1, 2], [3, 4]]`, `If(M < 3, M, 0)`;
- a condition with a `missing` element: `If([true, missing, false], 1, 0)`;
- an expression whose elements are lists:
  `If([true, false], [[1], [2]], 0)`;
- a string, or a list of strings, under a list of conditions, because a
  string has no value for a position that is not selected:
  `If(L < 3, "small")`;
- a set under a list of conditions;
- a number beside a point.

```epsil
let L = [1, 3, 5]
Which(L < 2, (1, 2), true, 5)
// ➔ error: Type error: expected `list<tuple> | tuple`, got `5` at `5` in `Which(L < 2, (1, 2), True, 5)`
```

A relation, such as `x > 0`, is accepted under a list of conditions: it is
the region of a plot restricted at each position.

A condition that is a single `true` or `false` keeps the ordinary behavior,
even when an expression is a list. A list is selected element by element
only when the condition is a list.

```epsil
If(true, [1, 3, 5], 0)
// ➔ [1,3,5]
If(false, [10, 20, 30])
// ➔ missing
```

<MathJson name="Which" latex={["cases"]}>

`["Which", condition-1, expr-1, …, condition-n, expr-n]`.

```json example
["Block",
  ["Declare", "n", "'unknown'", -10],
  ["Which", ["Greater", "n", 0], "n", ["Less", "n", 0], ["Negate", "n"], "True", 0]
]
// ➔ 10

["Which", "False", ["Divide", "x"], "True", 7]
// ➔ 7

["If", ["Less", "L", 3], "L", 0]
// ➔ [1, 0, 0]          with L = [1, 3, 5]

["Which", ["Less", "L", 2], 10, ["Less", "L", 4], "L", "True", 0]
// ➔ [10, 3, 0]         with L = [1, 3, 5]
```

As with `If`, only *evaluation* skips an expression that is not selected;
the boxed expression still carries its diagnostic.

A `["Which"]` is equivalent to this nested `["If"]`:

```json example
["If", ["Equal", condition-1, "True"], expr-1,
    ["If", ["Equal", condition-2, "True"], expr-2,
    ... ["If", ["Equal", condition-n, "True"],
          expr-n,
          "Missing"
    ]
  ]
]
```

The `cases` environment of LaTeX parses to a `Which`, with
`\text{otherwise}` as the condition `True`:
`\begin{cases} x & \text{if } x > 0 \\ -x & \text{if } x < 0 \\ 0 & \text{otherwise} \end{cases}`
is
`["Which", ["Less", 0, "x"], "x", ["Less", "x", 0], ["Negate", "x"], "True", 0]`.

</MathJson>
