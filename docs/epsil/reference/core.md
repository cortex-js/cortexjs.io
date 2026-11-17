---
title: Core Reference
sidebar_label: Core
slug: /reference/core/
description: "The core library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from core.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Core

The **core** library holds the operations that every program uses: the
markers for absent values, declarations and assignments, the inspection and
control of evaluation, comparison, errors, types as values, strings, and the
conversion to and from LaTeX. This introduction gives the concepts you need
before you read the entries.

## Syntax and library names

Many core definitions are the engine form of an Epsil construct. You write
the construct, and the engine receives the definition. The entries list these
definitions under their MathJSON name.

| Epsil syntax                          | Definition           |
| :------------------------------------ | :------------------- |
| `let x = 3`, `const c = 1`            | `Declare`            |
| `x = x + 1`                           | `Assign`             |
| `f(x) = x^2`, `function f(x) { … }`   | `DefineFunction`     |
| `x => x^2`                            | `Function`           |
| `xs \|> sort`                         | `Pipe`               |
| `f(...t)`                             | `Spread`             |
| `f(rate: 0.05)`                       | `NamedArgument`      |
| `x is integer`                        | `MatchesType`        |
| `type point = tuple<x: number, y: number>` | `DeclareType`   |
| `type shape = circle(r: number) \| square(s: number)` | `DeclareSumType` |
| `protocol Area { … }`                 | `DeclareProtocol`    |
| `type string is Copyable`             | `DeclareConformance` |

A library name with a lowercase Epsil spelling (`head` for `Head`,
`simplify` for `Simplify`, `missing` for `Missing`) is shown with that
spelling. A name without one (`Hold`, `HoldValues`, `Subtype`, `Latex`, `N`)
keeps its MathJSON spelling.

## Absent values

Three values mark that a value is absent. They do not behave the same way.

| Value       | Meaning                                                                   |
| :---------- | :------------------------------------------------------------------------ |
| `nothing`   | The value of an empty block or of a statement with no value. It is kept where it is written. |
| `missing`   | A position exists, but its value is absent (R `NA`, Julia `missing`).      |
| `NaN`       | A number that is not defined (Not a Number).                              |

`nothing` is kept where it is written, and an arithmetic operation on it is a
type error. `missing` keeps its position, and an arithmetic operation on it
gives `missing`:

```epsil
[12, nothing, 34]
// ➔ [12,"Nothing",34]
```

```epsil
[missing + 1, 2]
// ➔ ["Missing",2]
```

`isMissing` is true for `missing` and `NaN`. `Coalesce` returns
the first operand that is not absent:

```epsil
Coalesce(missing, NaN, 3, 4)
// ➔ 3
```

## Declaring, assigning and assuming

`let` declares a name whose value can change, and `const` declares a name
whose value cannot change. The `=` operator gives a new value to a name that
`let` declared. The value is evaluated when the assignment is evaluated.

```epsil
const c = 299792458
let t = 2
t = t + 1
c * t
// ➔ 899377374
```

Once a name has a type, a new value must be compatible with that type. A
name that has no value is a free symbol: it stays symbolic in expressions.

`assume` records a fact about a symbol, for example that it is positive. It
does not declare the symbol. It evaluates to a string that reports the
outcome: `"ok"` when the fact was recorded, `"tautology"` when the known
facts already imply it, `"contradiction"` when it conflicts with them, and
`"not-a-predicate"` when the argument is not a condition.

```epsil
[assume(x > 0), assume(x > -1), assume(x < 0), assume(42)]
// ➔ ["ok", "tautology", "contradiction", "not-a-predicate"]
```

`HoldValues` evaluates an expression as if some names had no value. The
declared type and the assumptions of each name still apply. With one
argument, every name that has a value is held. With a list as the second
argument, only the names in the list are held:

```epsil
let x = 5
let y = 2
(x + y, HoldValues(x + y), HoldValues(x + y, [y]))
// ➔ (7, x + y, y + 5)
```

## The structure of an expression

An expression has a **head**, the name of its operator, and a **tail**, its
operands. `head` and `tail` read the expression as it is written, before
the operands are evaluated:

```epsil
head(x^2)
// ➔ "Power"
```

```epsil
[tail(1 + x)]
// ➔ [1, x]
```

`Hold` keeps an expression in its written form: the expression is not
evaluated until `ReleaseHold` removes the `Hold`.

```epsil
Hold(1 + 2)
// ➔ Hold(1 + 2)
```

```epsil
ReleaseHold(Hold(1 + 2))
// ➔ 3
```

A function declared with `hold` receives each argument as it is written, not
its value. Its body can then inspect the expression:

```epsil
let a = 3
hold f(e) = head(e)
f(a + 1)
// ➔ "Add"
```

## Comparing expressions

The `==` operator compares **values**. It can use a tolerance, and it
approximates an exact value when that is necessary. The `===` operator
compares the expressions as they are **written** (after canonicalization).
It never uses a tolerance and never reads the value of a name.

```epsil
(sqrt(2) == 1.4142135623730951, sqrt(2) === 1.4142135623730951)
// ➔ (True, False)
```

```epsil
let x = 5
(x == 5, x === 5)
// ➔ (True, False)
```

`===` always gives `True` or `False`. `==` can stay unevaluated when the
answer is not known, for example `x == y` with two free symbols. `NaN` is not
equal to itself with `==`, but it is the same as itself with `===`:

```epsil
(NaN == NaN, NaN === NaN)
// ➔ (False, True)
```

## Exact evaluation and approximation

Evaluation is **exact**. A result that has no exact decimal form stays
symbolic:

```epsil
ln(2)
// ➔ ln(2)
```

`N` gives a numeric approximation. A second argument sets the number of
significant digits:

```epsil
N(ln(2))
// ➔ 0.693147180559945309417
```

```epsil
N(pi, 20)
// ➔ 3.1415926535897932385
```

`simplify` changes an expression to a simpler form, and `solve` finds the
values of an unknown that make an equation true:

```epsil
simplify(sin(x)^2 + cos(x)^2)
// ➔ 1
```

```epsil
solve(x^2 - 5x + 6 == 0, x)
// ➔ [3, 2]
```

## Errors are values

A problem at run time, such as an argument of the wrong type, does not stop
the program. It gives an `Error` value. The error goes up through the
expressions that contain it, and becomes their value. `isError` tests for an
error value:

```epsil
isError(ln("a"))
// ➔ True
```

To make an error value of your own, use `RuntimeError`. Its argument is a
code string, or an `ErrorCode("code", details…)` expression when the error
carries data. Do not write `Error(…)` for this: a written `Error` marks the
program itself as wrong.

```epsil
function reciprocal(x) {
  if x == 0 { RuntimeError("zero-has-no-reciprocal") } else { 1 / x }
}
[reciprocal(4), reciprocal(0)]
// ➔ [1/4, Error("zero-has-no-reciprocal")]
```

`NaN` is not an error. It is a number.

## Types as values

`type` gives the static type of an expression as a **type value**. The type
is as precise as the engine can make it: the type of `3` is the literal type
`3`, a subtype of `integer`.

```epsil
type(3)
// ➔ TypeFrom("3")
```

`typeFrom` makes a type value from its text, and `stringFrom` gives the text
of a type value. The `is` operator tests whether a value has a type, and
`Subtype` tests whether one type is a subtype of another:

```epsil
(3 is integer, 3 is string)
// ➔ (True, False)
```

```epsil
Subtype("integer", "real")
// ➔ True
```

## Strings

A string is a sequence of **characters**. A character is what a reader sees
as one character (a grapheme cluster), even when Unicode encodes it with
several code points. `length`, `characters` and the other string operations
count characters. `unicodeScalars`, `utf8` and `utf16` give the encoded
integers.

```epsil
characters("naïve")
// ➔ ["n", "a", "ï", "v", "e"]
```

Indexing a string gives a character. A character and the one-character string
with the same content are the same value, so every string operation accepts a
character where it accepts a string, and a dictionary accepts a character as a
key. The result is the result for the one-character string:

```epsil
toUpperCase("abc"[1])
// ➔ "A"
```

A string literal can include the value of an expression with `\(…)`:

```epsil
let n = 7
"n = \(n)"
// ➔ "n = 7"
```

## LaTeX

`Latex` converts an expression to a LaTeX string, and `parse` converts a
LaTeX string to an expression. In an extended string literal (`#"…"#`), a
backslash is an ordinary character, so LaTeX commands need no escapes:

```epsil
Latex(x^2 / 2)
// ➔ "\frac{x^2}{2}"
```

```epsil
parse(#"\frac{x}{2}"#)
// ➔ 1/2 * x
```

## Random numbers

The random functions take a **domain** to draw from, never a seed. To make
the draws reproducible, wrap the work in `withRandomSeed`, which makes every
draw inside it replay identically.

| Replacement | one draw | `k` draws |
| :-- | :-- | :-- |
| with replacement | `random(xs)` | `randomChoice(xs, k)` |
| without replacement | `random(xs)` | `randomSample(xs, k)` |
| all of them | | `randomShuffle(xs)` |

`random(xs)` and `randomChoice(xs, 1)` have the same distribution: with a
single draw, with and without replacement coincide. `randomChoice` returns a
list.

The generator, the seed folding, the agreement of interpreted, compiled and
GPU code, and the number of draws each function consumes are specified in the
[Randomness Model](https://github.com/cortex-js/compute-engine/blob/main/docs/RANDOMNESS-MODEL.md)
note.

### Migrating from the previous random operators

`RandomInteger`, `RandomList`, `RandomSeed`, `Sample` and `Shuffle` have been
removed, along with the `ce.randomSeed` property of the JavaScript API and
every `seed` argument. Each removed name gives an `operator-removed` error that
names its replacement, so a stored document fails visibly rather than
silently stopping to randomize.

| Was | Now |
| :-- | :-- |
| `Random(seed)` | `withRandomSeed(seed, random())` |
| `Random(n)`, `n > 0` | `random(0..n-1)` |
| `Random(m, n)`, `m < n` | `random(m..n-1)` |
| `RandomInteger(a, b)` | `random(a..b)` |
| `RandomList(n)` | `randomChoice(interval(0, 1), n)` |
| `RandomList(n, seed)` | `withRandomSeed(seed, randomChoice(interval(0, 1), n))` |
| `RandomSeed(s)` | `withRandomSeed(s, …)` around the work |
| `Sample(xs, k)` | `randomSample(xs, k)` |
| `Shuffle(xs)` | `randomShuffle(xs)` |
| `Shuffle(xs, seed)` | `withRandomSeed(seed, randomShuffle(xs))` |
| `ce.randomSeed = s` | `withRandomSeed(s, …)` |

Note the `-1` of the `Random(n)` and `Random(m, n)` rows: the old upper bound
was excluded, and a range includes both ends. The rows hold only in the
stated cases. Rewrite the other old calls (`n ≤ 0`, `m ≥ n`) by hand, because
a range with reversed bounds is a descending range, not an empty one.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### about

`(any) -> dictionary<any>`

Return information about an expression as a dictionary: its kind (symbol, constant, function, number, string, expression), its static type and, when applicable, its name, value, signature, clause listing, attributes (the algebraic flags and `lazy`), description, examples, keywords, wikidata and url.

```epsil
about(pi)
// ➔ {"name" -> "Pi", "kind" -> "constant", "type" -> "real<3.141592653589793..3.141592653589794>", "description" -> "The constant π ≈ 3.14159, the ratio of a circle's circumference to its diameter.", "examples" -> ["N(Pi)","Cos(Pi)"], "wikidata" -> "Q167"}
```

The dictionary has these keys, when they apply:

- `kind`: `"symbol"`, `"constant"`, `"function"`,
  `"multi-clause function (n clauses)"`,
  `"hold function (arguments are bound unevaluated)"`, `"number"`,
  `"string"` or `"expression"`;
- `type`: the static type, as a string, as `type` gives it;
- `name`: the name of a symbol;
- `value`: the value, when it differs from the expression;
- `signature`: the signature of a function;
- `clauses`: the clauses of a multi-clause function, one string each, in
  declaration order, with their overlap and coverage;
- `attributes`: the algebraic attributes of a function, then `"lazy"` when
  it receives its arguments unevaluated;
- `examples`, `keywords`, `description`, `wikidata`, `url`: the
  documentation of the definition.

The type of a numeric constant is the `real` type narrowed to a range around
its value, and `real` is a finite real.

```epsil
about(pi)["type"]
// ➔ "real<3.141592653589793..3.141592653589794>"
```

<MathJson name="About">

`["About", expr]`.

```json example
["At", ["About", "Pi"], "'type'"]
// ➔ "real<3.141592653589793..3.141592653589794>"
```

</MathJson>

### angle

`(any+) -> number`

Angle mark / measure (`\angle ABC`, `\varangle XYZ`, `∠ABC`) — opaque typed head; not evaluated.

```epsil
angle(A, B, C)
// ➔ Angle(A, B, C)
```

<MathJson name="Angle" latex={["\\angle"]} />

### Annotated

`(expression, dictionary<any>) -> expression`

Attach metadata or style annotations to an expression.

```epsil
Annotated(x^2, {"color" -> "blue"})
// ➔ x^2
```

### apply

`(name: any, arguments: any*) -> unknown`

Apply a function to a list of arguments

```epsil
apply(sqrt, 16)
// ➔ 4
```

<MathJson name="Apply" latex={["apply"]} />

### applyWhole

MathJSON `ApplyWhole` · `(name: any, arguments: any*) -> unknown`

Apply a function to arguments, each bound whole (engine-internal).

### arbitraryConstant

`(integer) -> number`

ArbitraryConstant(k): an arbitrary number, the k-th of a result: a constant of integration, the free parameter of an identity. Inside one result, two calls with the same index are the same value, and two calls with different indexes are independent. It has no value.

`arbitraryConstant(k)` is any number, such as a constant of integration, and
`arbitraryInteger(k)` any integer, such as the parameter of a family of
solutions, in a result of `solve`, `dsolve` or `rsolve`. In one result, two
calls with the same index are the same value, and two calls with different
indexes are independent. A call has no value: it is not an unknown, it is not
declared in any scope, and an expression that holds one does not compile.

```epsil
[arbitraryConstant(1) - arbitraryConstant(1), arbitraryConstant(1) == arbitraryConstant(2)]
// ➔ [0,ArbitraryConstant(1) == ArbitraryConstant(2)]
```

The indexes of a result start at the first index that its input does not
use, so two separate results both use the index 1: renumber one before you
combine them.

<MathJson name="ArbitraryConstant">

`["ArbitraryConstant", k]`, `["ArbitraryInteger", k]`. In LaTeX, a call is
written in the command `\constant`, which shows only its argument:
`\constant{c_{1}}` is `ArbitraryConstant(1)` and `\constant{n_{1}}` is
`ArbitraryInteger(1)`; without it, `c_1` is a symbol. A renderer that does not
know the command needs `\newcommand{\constant}[1]{#1}`.

```json example
["Solve", ["Equal", ["Sin", "x"], 0], "x"]
// ➔ ["List", ["Multiply", "Pi", ["ArbitraryInteger", 1]]]
```

</MathJson>

### arbitraryInteger

MathJSON `ArbitraryInteger` · `(integer) -> integer`

ArbitraryInteger(k): an arbitrary integer, the k-th of a result: the parameter of a family of roots, of a diophantine or a congruence solution. Inside one result, two calls with the same index are the same value, and two calls with different indexes are independent. It has no value.

### arc

`(any+) -> number`

Arc / wide-hat accent measure (`\widehat{ABC}`) — opaque typed head; not evaluated.

```epsil
arc(A, B, C)
// ➔ Arc(A, B, C)
```

<MathJson name="Arc" latex={["\\widehat"]} />

### AssertPresent

`(any) -> unknown`

Assert that a value is present: return it unchanged, or an `expected-present` error when it is ABSENT (`Missing`, `NaN`, or a point whose coordinates are all `NaN`). `Nothing` is the value of an empty block, not an absent datum, and passes through; an error operand propagates. Epsil spells it `x?!`. Only the value itself is checked, never the cells of a collection.

```epsil
[1, 2][1]?!
// ➔ 1
```

### Assign

`(expression | symbol, any) scope -> any`

Assign a value to a symbol or define a sequence. The RHS is evaluated immediately and `ce.assign(name, val)` mutates the binding in the current scope chain. When used inside a `Block`, the assignment is visible to subsequent statements in the block (sequential semantics).

```epsil
let x = 3
x = x + 1
x
```

In Epsil, `x = v` assigns a declared variable. The value is evaluated when
the assignment is: a symbol that has a value at that moment is replaced by
the value. An assignment keeps the type of the variable, and a value of
another type is the error `assignment-type-mismatch`. An assignment to a name
that is not declared is the error `assignment-to-undeclared-variable`.

```epsil
let a = 1
let b = a
a = 2
b
// ➔ 1
let x: integer = 1
x = 2.5
// ➔ error: Static error: `x` has the type `integer`, and the value has the type `2.5` in `x := 2.5`
```

<MathJson name="Assign" latex={["\\coloneq"]}>

`["Assign", symbol, value]`. A symbol with no value stays symbolic in the
stored value, and has its current value when the assigned symbol is
evaluated: see
[When is the value captured?](/compute-engine/guides/augmenting/#when-is-the-value-captured).
The definition is looked up in the enclosing scopes. Outside every block (an
`Assign` that the host evaluates, or `ce.assign()`), an assignment to a name
with no definition declares it, with the type of the value. In a `Block`, a
function body or the body of a binder, it is the error
`assignment-to-undeclared-variable`.

An assignment is a statement, never an operand: `["f", ["Assign", "a", 2]]`
is the error `assignment-in-operand`. A block whose last statement is an
`Assign` has the value `Nothing`.

```json example
["Block", ["Assign", "x", 5], "x"]
// ➔ an assignment-to-undeclared-variable error
["Block", ["Declare", "x", "'unknown'", 5], "x"]
// ➔ 5
```

</MathJson>

### assume

`(any) scope -> string`

Record an assumption about a symbol. Evaluates to the outcome as a string: "ok", "tautology", "contradiction", "not-a-predicate" or "internal-error".

```epsil
assume(x > 0)
```

The predicate is an equality, an inequality or a membership. Its symbols can
be undeclared, and assuming does not declare them. Every outcome is a value:
an argument that is not a predicate is not an error.

| Outcome | Meaning |
| :-- | :-- |
| `"ok"` | the assumption was recorded |
| `"tautology"` | the existing assumptions imply it |
| `"contradiction"` | it conflicts with the existing assumptions |
| `"not-a-predicate"` | the argument is not a proposition |
| `"internal-error"` | the assumption could not be processed |

```epsil
[assume(x > 0), assume(1 > 0), assume(1 < 0), assume(42)]
// ➔ ["ok","tautology","contradiction","not-a-predicate"]
```

`assume` is not a pure function: it changes the state of the engine. See
[Assumptions](/compute-engine/guides/assumptions/).

<MathJson name="Assume">

`["Assume", predicate]`.

```json example
["Assume", ["Element", "x", "Integers"]]
// ➔ "ok"
```

</MathJson>

### baseForm

MathJSON `BaseForm` · `(T, (number | string)?) -> T where T: number`

`BaseForm(expr, base=10)`

### Block

`(unknown*) -> unknown`

Evaluate a sequence of expressions in a local scope, **sequentially**. Each operand is evaluated in order; later operands observe side effects (`Assign`, `Declare`) of earlier operands. The block's value is the value of the last expression. Short-circuiting heads (`Return`, `Break`, `Continue`) terminate the sequence early.

IMPORTANT — consumers translating *simultaneous* action tuples (e.g. Desmos `(a → 1, b → a + 1)` where `b` reads the *pre-action* `a`) must rewrite to a snapshot-then-commit Block: bind each RHS to a fresh temp first, then assign the temps to the LHS symbols. See https://cortexjs.io/compute-engine/reference/control-structures/ for the canonical recipe.

### BuiltinFunction

`(string | symbol) -> symbol`

Return a built-in function symbol by name.

```epsil
BuiltinFunction("Sqrt")(16)
// ➔ 4
```

### canonicalForm

`(any, symbol*) -> any`

Return the canonical form of an expression Can be used to sort arguments of an expression.

Sorting arguments of commutative functions is a weak form of canonicalization that can be useful in some cases, for example to accept "x+1" and "1+x" while rejecting "x+1" and "2x-x+1"

```epsil
canonicalForm(Hold(1 + x), "Order")
// ➔ Hold(x + 1)
```

With no form, `canonicalForm(expr)` is the canonical form of the expression.
With forms, it applies only those transformations, in order, and the result
is not canonical. Comparing two partial canonical forms with `isSame` is a
way to accept `x + 1` and `1 + x` but not `2 - 1 + x`.

```epsil
canonicalForm(Hold(3 + 2 + 1), "Order")
// ➔ Hold(1 + 2 + 3)
```

<MathJson name="CanonicalForm">

`["CanonicalForm", expr]`, `["CanonicalForm", expr, form1, form2, ...]`. The
forms:

- `Order`: sort the arguments of a commutative function.
- `Flatten`: flatten associative expressions, remove delimiters and splice
  `Sequence` expressions.
- `Number`: normalize number forms, such as `["Add", 2, ["Multiply", 3, "ImaginaryUnit"]]`
  to `["Complex", 2, 3]`, and reduce rationals.
- `InvisibleOperator`: replace an invisible operator by `Multiply` or a
  function application.
- `Multiply`: combine the coefficients and factors of a `Multiply`, and make a
  `Power` when possible.
- `Add`: remove the `0` of an `Add`, make a `Multiply` when possible, and turn
  `Subtract` and `Negate` into `Add` and `Multiply`.
- `Power`: turn `Exp`, `Square`, `Sqrt` and `Root` into `Power`.
- `Divide` applies `Power` to its operands.

```json example
["CanonicalForm", ["Add", 3, 2, 1], "Order"]
// ➔ ["Add", 1, 2, 3]
["CanonicalForm", ["Add", 1, ["Add", 2, 3]], "Flatten"]
// ➔ ["Add", 1, 2, 3]
["CanonicalForm", ["InvisibleOperator", 2, "x"], "InvisibleOperator"]
// ➔ ["Multiply", 2, "x"]
["CanonicalForm", ["Multiply", 2, 3, "x"], "Multiply"]
// ➔ ["Multiply", 6, "x"]
```

The `canonical` option of `ce.parse()` and `ce.expr()` takes the same forms.

</MathJson>

### caseFold

MathJSON `CaseFold` · `(character | string) -> string`

CaseFold(s): a case-folded form of `s`, for case-insensitive comparison — `CaseFold(a) == CaseFold(b)` tests equality ignoring case. An approximation of Unicode full case folding.

```epsil
caseFold("Straße")
// ➔ "strasse"
```

```epsil
caseFold("Hello") == caseFold("HELLO")
// ➔ "True"
```

### characterFrom

MathJSON `CharacterFrom` · `(character | string) -> character`

CharacterFrom(s): the character `s` denotes. `s` must be exactly one user-perceived character (one grapheme cluster) after NFC normalization; an empty or multi-character string is an error.

```epsil
characterFrom("é")
// ➔ "é"
```

### characters

MathJSON `Characters` · `(character | string) -> list<character>`

Characters(s): split a string into a list of user-perceived characters (grapheme clusters). Synonym: GraphemeClusters. For stable integer decompositions see UnicodeScalars, Utf8 and Utf16. A non-string argument leaves the expression unevaluated.

```epsil
characters("héllo")
// ➔ ["h","é","l","l","o"]
```

### Coalesce

`(any+) -> unknown`

Return the first operand that is not ABSENT (`Missing`, `NaN`, or a point whose coordinates are all `NaN`), evaluated left-to-right. If every operand is absent, the last operand’s value is returned verbatim (still absent). `Nothing` passes through without selecting a fallback.

```epsil
Coalesce(missing, NaN, 3, 4)
// ➔ 3
```

### Colon

`(any, any) -> expression`

Type annotation (`a : b`) — opaque typed head.

<MathJson name="Colon" latex={[":"]} />

### composition

MathJSON `Composition` · `(function*) -> function`

The composition of functions, applied right to left: `Composition(f, g, h)(x)` is `f(g(h(x)))`

```epsil
composition(sin, exp)(0)
// ➔ sin(1)
```

```epsil
composition(f, g)(x)
// ➔ f(g(x))
```

### conforms

MathJSON `Conforms` · `(subject: any, protocols: string+) -> boolean`

True iff the subject conforms to EVERY named protocol. A `type` VALUE subject asks whether that type conforms (the branch is unambiguous because the `type` primitive itself declares no conformances); any other subject is evaluated once and its precise type is asked. This is the lowering of the Epsil `x is Hashable & Comparable` test. A valueless or unresolved subject stays symbolic; an unknown protocol name is an error; an Error-valued subject answers `False` (the `error` type declares no conformances). Conformance is monotone but late-bound: the answer reflects the registry at the moment of evaluation.

```epsil
protocol Copyable {}
type string is Copyable
conforms("abc", "Copyable")
```

### Declare

`(symbol, type: (string | symbol)?, value: any?, attributes: dictionary<any>?) scope -> any`

Declare a symbol in the current scope, optionally assigning a type and an initial value. An optional trailing attributes dictionary (with keys `type`, `value`, `constant` and `holdUntil`) can further describe the definition, e.g. to declare a constant. With a value, evaluates to that value; otherwise evaluates to `Nothing`.

```epsil
let x: integer = 5
x + 1
```

In Epsil, `let x = v` declares a variable and `const c = v` a constant:
[Declarations](/declarations/) gives the rules. A declaration has a value:
`let x` and `let x: integer` with no value are errors. A second declaration
of a name that the program or the block already declares is an error, also at
the top level of a program. A constant cannot be assigned.

```epsil
let x: integer
// ➔ error: Static error: `x` is declared without a value: write `let x = …` in `let x: integer`
const c = 299792458
c = 3
// ➔ error: Static error: cannot assign a value to the constant `c` in `c := 3`
```

<MathJson name="Declare">

`["Declare", symbol, type, value]`, `["Declare", symbol, attributes]`. A
standalone `Declare` with a value evaluates to that value; in a `Block`, a
`Declare` is a statement, and a block whose last statement is a `Declare` has
the value `Nothing`.

In a `Program` or a `Block`, a `Declare` with no value reserves a variable
that is initialized later. An explicit type fixes its type. Otherwise the
type is inferred from a single later initialization in the same sequence of
statements, before any use; the inference does not search branches, loops or
calls, and stops at a function application (`let x; x = 1` infers `number`,
`let x; x = 1 + 2` keeps `unknown`). A read before the initialization is the
error `read-before-initialization`. Outside these sequences, a `Declare`
without a value is the error `declaration-without-value`.

In a `Block`, a local is made only by a `Declare`, which must be a statement
of the block itself: in a branch of an `If`, in a loop body or in a case of a
`Match`, it is the error `declaration-below-statement`. A second `Declare` of
a name that the block declares is the error `variable-redeclaration`; at the
top level, a second `Declare` replaces the definition. A local cannot be read
before its declaration (`read-before-declaration`).

The attributes dictionary has the keys `type`, `value`, `constant` (`True`
for a constant) and `holdUntil` (`"never"`, `"evaluate"` or `"N"`: when the
value is substituted during evaluation, as for `Pi`). A positional type or
value takes precedence over the same key.

```json example
["Declare", "c", "integer", 299792458, ["Dictionary", ["KeyValuePair", "constant", "True"]]]
```

`Declare` is not a pure function: it changes the state of the engine. In
JavaScript, see [`ce.declare()`](/compute-engine/guides/augmenting/).

</MathJson>

### DeclareConformance

`(target: string | symbol, protocols: any, whereClauseOrImplementation: any?, implementation: dictionary<any>?) scope -> nothing`

Declare that a type CONFORMS to one or more protocols — the lowering of the Epsil `type string is Hashable & Comparable` statement. The target rides as a type-expression string and must be named and ground (not a union, an anonymous structural type or a `type alias` name); the protocols ride as a `List` of names. An optional trailing dictionary carries the implementation block, member name -&gt; function literal (property handlers under the mangled keys `__get__x` / `__set__x`); it may only accompany a SINGLE protocol. A CONDITIONAL conformance carries, ahead of that block, the source text of its trailing `where` clause as a string: the target is then a head pattern naming the variables the clause binds (`list<T>` with `"where T is Comparable"`). Conformance is monotone — it can be added but never removed — and a re-declaration is a no-op. Evaluates to `Nothing`.

```epsil
protocol Copyable {}
type string is Copyable
"abc" is Copyable
```

### DeclareProtocol

`(string | symbol, members: dictionary<any>?, parents: any?) scope -> nothing`

Declare a PROTOCOL: a set of function and property requirements a type may declare itself to satisfy. Protocols are engine-global (not lexically scoped) and are NOT types, so this is only valid at the top level of a program. The name is a symbol (or a string); the optional members ride as a dictionary of `member -> ["Pair", "function"|"readonly"|"readwrite", signature]`, with the signature as a type-expression string. A `function` member's first parameter must be typed `Self`, the substitution token standing for the conforming type. A protocol with no members is a SEMANTIC protocol (a marker). An optional third operand `["List", parent, …]` names the protocols this one EXTENDS: a type that conforms to it conforms to each of them, and its implementation block may implement their members. The members operand is then required (`["Dictionary"]` when there are none). Evaluates to `Nothing`.

```epsil
protocol Area { function area(self: Self) -> number }
type square = tuple<side: number> is Area {
  function area(self: square) -> number { self.side^2 }
}
area(square(3))
```

### DeclareSumType

`(string | symbol, any*) scope -> nothing`

Declare a SUM TYPE: N nominal variants plus the transparent union that names them, in one statement — the lowering of the Epsil sugar `type node = lit(num: number) | plus(op1: node, op2: node)`. The name is a symbol (or a string); each variant is a `["Tuple", name, payload]` pair whose payload is a type string (`"nothing"` for a nullary variant). An optional attributes dictionary at operand 1 — ahead of the variants — carries `typeParams -> "T"` for a generic sum, whose parameters are distributed to each variant by usage. The sum name is forward-registered before the variants are declared, so a payload may name it bare. A variant name that already names a type, is reserved, or is a builtin is rejected and NOTHING is declared. Types are engine-global, so this is only valid at the top level of a program. Evaluates to `Nothing`.

```epsil
type shape = circle(r: number) | square(s: number)
match square(3) {
  circle(r) => pi * r^2
  square(s) => s^2
}
```

### DeclareType

`(string | symbol, type: string | symbol | type, attributes: dictionary<any>?) scope -> nothing`

Declare a type. Types are engine-global (not lexically scoped), so this is only valid at the top level of a program — inside a block or function body it is an error. The name is a symbol (or a string) and the type a string holding a type expression, e.g. `"tuple<x: integer, y: integer>"`. The type is nominal by default; an optional trailing attributes dictionary with `alias -> True` makes it a structural alias instead, and an additional `typeParams -> "T, U: number"` entry makes it a GENERIC alias whose uses must be applied (`Pair<integer>`). The declaration also mints a value constructor of the same name — `["point", 1, 2]`, an inert tagged value for a nominal type, a checked identity for an alias — except for a `record` body, which mints none. Evaluates to `Nothing`.

```epsil
type point = tuple<x: number, y: number>
point(1, 2)
```

In Epsil, `type name = definition` declares a **nominal** type, and
`type alias name = definition` a **structural alias**: see
[Declaring a type](/declarations/#declaring-a-type). A value is compatible
with a nominal type only when its type is that type; any value that matches
the definition is compatible with an alias.

A type declaration also declares a **constructor**, a function of the same
name. A tuple definition gives one argument per element; another definition
gives one argument; a record definition gives no constructor, because the
order of its fields is not meaningful. A nominal constructor is inert: the
call is the value, and its type is the declared type. An alias constructor
checks its arguments and gives the plain value.

```epsil
type point = tuple<x: number, y: number>
type(point(1, 2))
// ➔ TypeFrom("point")
type alias pair = tuple<number, number>
pair(1, 2)
// ➔ (1, 2)
```

Types are global to the engine, so a type declaration is valid only at the
top level of a program. A declaration of a name that already has a value or
an operator registers nothing and is an error; a library name is shadowed.
Running a program again replaces its own type declarations.

```epsil
function f() { type t = integer; 1 }
// ➔ error: The type "t" is declared inside a block: types are global, so type declarations are only allowed at the top level of a program
```

<MathJson name="DeclareType">

`["DeclareType", name, type]`, `["DeclareType", name, type, attributes]`,
with the type as a string. The attribute `alias` set to `True` declares a
structural alias. The declaration takes effect when the expression is
canonicalized, so later statements can use the type, and it evaluates to
`Nothing`. The `mint` option of `ce.declareType()` has no attribute: this
operator always declares a constructor.

```json example
["DeclareType", "point", "'tuple<number, number>'", ["Dictionary", ["KeyValuePair", "alias", "True"]]]
```

</MathJson>

### DefineFunction

`(symbol, function, dictionary<any>?) scope -> nothing`

Define one clause of a (possibly multi-clause) function: `DefineFunction(f, Function(body, params…))`. Unlike `Assign` — which replaces the binding wholesale — `DefineFunction` ACCUMULATES: a clause with the same parameter domain replaces the earlier clause in place, any other clause is appended, and calls dispatch to the most specific clause admitting the arguments.

```epsil
fact(0) = 1
fact(n) = n * fact(n - 1)
fact(5)
```

### Delimiter

`(any, string?) -> any`

Group expressions with explicit delimiters.

```epsil
Delimiter(1 + 2)
// ➔ 3
```

### digitsFrom

MathJSON `DigitsFrom` · `(character | string, (character | integer | string)?) -> integer`

Return an integer representation of the string `s` in base `base`.

```epsil
digitsFrom("ff", 16)
// ➔ 255
```

```epsil
digitsFrom("1010", 2)
// ➔ 10
```

### error

`(expression<ErrorCode> | string, expression?) -> nothing`

Represent an error expression.

```epsil
[1, RuntimeError("zero")]
// ➔ [1,Error("zero")]
```

An error is a value. When an argument of a function is an error, the result
is that error. See [Errors](/errors/) for the error codes, and the
[evaluation guide](/compute-engine/guides/evaluate/#errors) for the rules.

<MathJson name="Error">

`["Error", code, context]`, where `code` is a string or an `["ErrorCode"]`
expression, and `context` is optional.

An error that propagated out of the expression where it was raised carries a
breadcrumb of the operators it passed through: an `["ErrorTrace"]` that is
always the **last** operand of the `Error`. Each frame is
`["ErrorFrame", operator, index]`, where `index` is the position of the
operand the error came from, starting at 1. The frames read innermost first.
An error that did not propagate has no breadcrumb. So the breadcrumb is found
by its head, not by its position: code that reads the second operand as the
context must skip an `ErrorTrace` there. `toString()` and the LaTeX
serializer show a traced error like an untraced one.

```json example
["Add", ["Ln", "'a'"], 2]
// ➔ ["Error",
//      ["ErrorCode", "'incompatible-type'", "'number'", "'string'"],
//      "'a'",
//      ["ErrorTrace", ["ErrorFrame", "'Ln'", 1], ["ErrorFrame", "'Add'", 1]]]
```

</MathJson>

### ErrorCode

`(string, any*) -> error`

Structured error code with optional arguments.

```epsil
[1, RuntimeError(ErrorCode("out-of-range", 5))]
// ➔ [1,Error(ErrorCode("out-of-range", 5))]
```

### evaluate

`(any) -> unknown`

Evaluate an expression.

```epsil
evaluate(x + x)
// ➔ 2x
```

`evaluate` computes exactly; `N` gives a numeric approximation. A `Hold`
stays held: use `ReleaseHold`.

```epsil
[evaluate(Hold(1 + 1)), ReleaseHold(Hold(1 + 1))]
// ➔ [Hold(1 + 1),2]
```

See [Exact and numeric evaluation](/compute-engine/guides/numeric-evaluation/).

<MathJson name="Evaluate">

`["Evaluate", expr]`.

</MathJson>

### evaluateAt

`(function, lower: expression, upper: expression) -> unknown`

Evaluate a function at one point or between two bounds.

```epsil
evaluateAt(x => x^2, 1, 3)
// ➔ 8
```

<MathJson name="EvaluateAt" latex={[".","|"]} />

### findRoot

MathJSON `FindRoot` · `(any, any, dictionary?) -> dictionary`

FindRoot(equations, params): numerically find parameter values that zero the residuals. `equations` is an equation (`lhs == rhs`), a bare residual expression (read as `= 0`), or a list of either. `params` is a list of specs (a bare symbol, `(a, a0)`, or `(a, a0, lo, hi)` with box constraints), matching `FindFit`. Returns a record &#123;parameters, converged, stationary, residualNorm, iterations&#125;.

`converged` is true only at a root: every residual is within the engine's tolerance scaled by its own equation, `|r_i| ≤ tolerance · (1 + Σ_j |J_ij| · max(1, |θ_j|))`, with `J` the Jacobian and `θ` the parameters, so a minimum of the sum of squared residuals that is not a root (`a^2 + 1 = 0`) is `converged: False`.

When the residual is above `tolerance`, the residual itself must confirm the Jacobian term: with each parameter moved by `±2 · tolerance · max(1, |θ_j|)` toward and away from the zero, the change of the residual is the change the Jacobian predicts to within half, and the residual reaches `tolerance`, changes sign, or touches 0 to within the rounding of the parameters. So a steep equation with no root (`2 - sin(10^18 a) = 0`) is not `converged` either.

`stationary` is the solver's own stop test, true at such a minimum too; a stacked system of data rows next to an equation reads it as `FindFit` reads `converged`. An optional third argument is the options dictionary of `FindFit`: `{global: {b: [lo, hi]}}` searches the named parameters (at most two) over the range for the lowest sum of squared residuals of the whole system; the constant phase coefficients of the equations (`3.22` in `cos(3.22 b + c)`) space the grid as the span of a variable does for a fit. With a kernel pool on the engine (`ce.workers`), `evaluateAsync()` scans the grid on the workers.

```epsil
findRoot(x^2 - 2, [(x, 1)])
// ➔ {"parameters" -> {"x" -> 1.4142135624638652}, "converged" -> "True", "residualNorm" -> 2.567368539985182e-10, "iterations" -> 4, "stationary" -> "True"}
```

### Function

`(expression, (function | symbol)*) -> function`

Function(body, param1, param2, …): a function literal.

A parameter is a symbol, `Typed(symbol, type)`, a rest parameter `Spread(symbol)` (last), a destructuring pattern `Tuple(…)`, or a parameter with a default value `Optional(param, default)`, where `param` is a symbol or `Typed(symbol, type)` and `default` is a number, a string, `True`, `False`, a symbol, `List()` or `Dictionary()`. The parameters with a default come after the required ones. A call that supplies the required parameters is a full call: each parameter it leaves out receives its default.

```epsil
(x => x^2 + 1)(3)
// ➔ 10
```

```epsil
((x, k = 2) => x * k)(3)
// ➔ 6
```

<MathJson name="Function" latex={["\\mapsto"]} />

### geometricVector

`(any, any) -> expression`

Geometric vector (directed segment between two points) — opaque typed head. Distinct from the column-vector `Vector` operator.

```epsil
geometricVector(A, B)
// ➔ GeometricVector(A, B)
```

<MathJson name="GeometricVector" latex={["\\operatorname{vector}"]} />

### graphemeClusters

MathJSON `GraphemeClusters` · `(character | string) -> list<character>`

A collection of grapheme clusters from a string. Synonym of Characters.

```epsil
graphemeClusters("héllo")
// ➔ ["h","é","l","l","o"]
```

### head

`(any) -> symbol`

Return the head of an expression, the name of the operator

```epsil
head(x^2)
// ➔ "Power"
```

A symbol is read through its value: with `x` assigned `a + 1`, `head(x)` is
`"Add"`. A symbol with no value has the head `"Symbol"`.

```epsil
let x = a + 1
[head(x), head(y)]
// ➔ ["Add","Symbol"]
```

<MathJson name="Head">

`["Head", expr]`.

```json example
["Head", ["Add", 2, 3]]
// ➔ "Add"
```

</MathJson>

### Hold

`(any) -> unknown`

Hold an expression, preventing it from being canonicalized or evaluated until `ReleaseHold` is applied to it

```epsil
Hold(1 + 2)
// ➔ Hold(1 + 2)
```

### HoldValues

`(any, any?) -> expression`

HoldValues(body): evaluate `body` with its assigned free symbols shielded — each such symbol becomes a pure symbol (its declared type and in-scope assumptions apply, its assigned value does NOT) for the duration. The value-blind counterpart of evaluating `body` directly; analogous to Mathematica's `Block[{x}, …]`.

HoldValues(body, [x, y]): shield only the listed symbols (a List, Set, Tuple, or a single symbol); every other symbol resolves normally.

Constants (`Pi`, `ExponentialE`, …) are never shielded, assumptions survive the shield, and the global values are intact afterwards.

```epsil
let x = 5
let y = 2
(x + y, HoldValues(x + y), HoldValues(x + y, [y]))
```

`HoldValues(body)` evaluates `body` with its assigned free symbols shielded:
during the evaluation, each of them is a symbol with no value, but its type
and the assumptions about it still apply. With a second argument, a list or
a single symbol, only those symbols are shielded. Built-in constants are
never shielded, and the values are intact afterwards. This is Mathematica's
`Block[{x}, …]`.

```epsil
let x = 5
let a = 3
[together(1/x + a/x^2), HoldValues(together(1/x + a/x^2))]
// ➔ [8/25,(a + x) / x^2]
let x = 5
let a = 3
HoldValues(x^2 + a, [a])
// ➔ a + 25
```

`simplify` evaluates its argument first, so `HoldValues` is how an assigned
symbol stays symbolic through it:

```epsil
let w = 5
[simplify(abs(w)), HoldValues(simplify(abs(w)), w)]
// ➔ [5,|w|]
```

<MathJson name="HoldValues">

`["HoldValues", body]`, `["HoldValues", body, symbols]`, where `symbols` is a
`List`, `Set`, `Tuple` or a symbol.

</MathJson>

### HorizontalSpacing

`(number) -> nothing`

Horizontal spacing annotation.

### identity

MathJSON `Identity` · `(T) -> T where T`

Return the argument unchanged

```epsil
identity(x + 1)
// ➔ x + 1
```

### IndexedSequence

`(any, symbol, any, any?) -> expression`

Indexed sequence `\{a_n\}_{n=1}^{\infty}` — inert head `IndexedSequence(term, index, lower, upper?)`; not evaluated.

```epsil
IndexedSequence(1/n, n, 1, oo)
// ➔ {1 / n : n = 1..+oo}
```

The indexed family whose term is `term`, with the index ranging from `lower`,
up to `upper` when it is given. It is **inert**: `evaluate` and `simplify`
leave it unchanged, and it has no collection operations yet.

```epsil
IndexedSequence(1/n, n, 0)
// ➔ {1 / n : n = 0..}
simplify(IndexedSequence(1/n, n, 1, oo))
// ➔ {1 / n : n = 1..+oo}
```

<MathJson name="IndexedSequence">

`["IndexedSequence", term, index, lower]`,
`["IndexedSequence", term, index, lower, upper]`.

The LaTeX sequence-braces notation `\{a_n\}_{n=1}^{\infty}` parses to
`["IndexedSequence", ["a_", "n"], "n", 1, "PositiveInfinity"]`. The term is in
the operator-call form `["a_", "n"]`, so that the binding of the index is
kept. A set-membership subscript gives the least element of the set as the
lower bound: `\{a_n\}_{n\in\mathbb{N}}` is
`["IndexedSequence", ["a_", "n"], "n", 0]`. The bare braces `\{a_n\}` are
still a `Set`, and the parenthesized form `(a_n)_{n\in\mathbb{N}}` is not an
`IndexedSequence`. The expression round-trips through LaTeX.

</MathJson>

### input

MathJSON `Input` · `(prompt: string?) console -> nothing | string`

Read one line of text from the host: the terminal in a command-line host, the `prompt()` dialog in a browser. The optional operand is a prompt string, displayed before reading. Evaluates to the line read, without the trailing newline; to `Nothing` at end-of-input (or a canceled dialog). On a host with no interactive input, stays unevaluated. When the host denies console access, evaluates to a `capability-denied` error.

### integerString

MathJSON `IntegerString` · `(integer, integer?, integer?) -> string`

`IntegerString(n, base=10, length)`       return a string representation of the integer `n` in base `base`.       With `length`, the digits of |n| are padded on the left with zeros,       or cut to the last `length` digits.

```epsil
integerString(255, 16)
// ➔ "ff"
```

```epsil
integerString(10, 2)
// ➔ "1010"
```

```epsil
integerString(5, 2, 8)
// ➔ "00000101"
```

### InvisibleOperator

`function`

Implicit operator used for juxtapositions such as function application or multiplication.

```epsil
InvisibleOperator(2, x)
// ➔ 2x
```

### isError

`(any) -> boolean`

True if the expression is an `Error` value, or a frozen expression embedding one (`"a" + 1`). False otherwise. Total.

```epsil
isError(ln("a"))
// ➔ "True"
```

```epsil
isError(1 + 1)
// ➔ "False"
```

`isError` holds its argument, so the error is not propagated before it is
checked, and it always answers. An expression that embeds an error is
`True` too, but an error inside a collection is not reported: a collection
that holds an error is still a collection. `NaN` is not an error.

```epsil
[isError(1 + 1), isError(x), isError([1, ln("a")]), isError(NaN)]
// ➔ ["False","False","False","False"]
```

To read an error rather than detect it, use `type`, which gives `error`, or
an `Error(…)` case of a `match`.

<MathJson name="IsError">

`["IsError", expr]`.

```json example
["IsError", ["Ln", "'a'"]]
// ➔ "True"
```

</MathJson>

### isMissing

MathJSON `IsMissing` · `(any) -> boolean`

True for `Missing`, `NaN`, or a point whose coordinates are all `NaN`, regardless of provenance. `Nothing` is not an absent datum.

```epsil
[isMissing(missing), isMissing(NaN), isMissing(0)]
// ➔ ["True","True","False"]
```

### Latex

`(any+) -> string`

Serialize an expression to LaTeX

```epsil
Latex(sqrt(x) / 2)
// ➔ "\frac{\sqrt{x}}{2}"
```

```epsil
Latex(pi / 2)
// ➔ "\frac{\pi}{2}"
```

<MathJson name="Latex">

`["Latex", expr]` is a `LatexString`.

</MathJson>

### LatexString

`(string) -> string`

Value preserving type conversion/tag indicating the string is a LaTeX string

```epsil
parse(LatexString(#"\frac{1}{2}"#))
// ➔ 1/2
```

### MatchesType

`(subject: any, type: string | type) -> boolean`

True iff the first operand, EVALUATED, is a value of the given type — the engine form of the Epsil `x is T` test and of `match` type patterns, which both lower here. The subject is never unwrapped: a type VALUE is a value like any other, so `MatchesType(TypeFrom("integer"), "number")` is `False` while `MatchesType(TypeFrom("integer"), "type")` is `True`; the type-to-type question is `Subtype`. A settled subject is decided both ways; a valueless or unresolved subject answers from its static type when that decides it, and stays symbolic otherwise.

```epsil
MatchesType([1, 2], "list<integer>")
// ➔ "True"
```

### missing

MathJSON `Missing` · variable `missing`

A value that is absent but whose position is preserved (Julia `missing`, R `NA`); the sole member of the `missing` type.

```epsil
missing + 1
// ➔ "Missing"
```

### Module

`(symbol) -> unknown`

The definition of a name in the standard library, also where a local definition shadows the name

```epsil
Module(Pi)
// ➔ pi
```

```epsil
apply(Module(Floor), 2.5)
// ➔ 2
```

`std::name` is the definition of `name` in the standard library, also where
a local definition shadows it. A call `std::floor(2.5)` follows the rules of
the library function. A name that the library does not define is an error.
`Module` itself cannot be declared or assigned. See
[Naming](/naming/).

```epsil
let pi = 3
std::pi + pi
// ➔ 3 + pi
Module(Floo)
// ➔ error: not a library name: Floo
```

<MathJson name="Module">

`["Module", name]`. A call of a library function is written with `Apply`:
`["Apply", ["Module", "Floor"], 2.5]`, whose canonical form is the plain call
bound to the library function. Its arguments read the definitions of the
scope. In a scope that shadows a library name, `.json` and `toMathJson()`
write the library definition as `["Module", "Pi"]`, so that the MathJSON has
the same value when it is read again in that scope. A second operand is
reserved, and is an error. LaTeX has no spelling: `["Module", "Pi"]` is
written `\pi`.

```json example
["Module", "Floo"]
// ➔ ["Error", "'not-a-library-name'", "Floo"]
```

</MathJson>

### N

`(any, (integer | list<number>)?) -> unknown`

N(expr): numerically evaluate an expression N(expr, precision): evaluate to `precision` significant digits N(expr, [precision, accuracy]): evaluate with a precision goal and an accuracy goal

```epsil
N(pi)
// ➔ 3.14159265358979323846
```

```epsil
N(1/3, 4)
// ➔ 0.3333
```

```epsil
N(exp(100), [positiveInfinity, 20])
// ➔ 2.688117141816135448412625551580013587361111877374192241519160862e+43
```

The value is computed with the requested digits plus a few guard digits,
then rounded, and it keeps these digits. The working precision of the engine
does not change, and a later operation on the result uses the working
precision.

```epsil
[N(pi, 20), N(1/3, 4), N(2) / 3]
// ➔ [3.1415926535897932385,0.3333,0.666666666666666666667]
```

With a list `[p, a]`, `N` aims at a precision goal `p` (correct significant
digits) or an accuracy goal `a` (an absolute error below `10^-a`), whichever
is met first; either can be `oo`. The engine doubles its precision until two
values agree within the goal. A goal that needs more than 1,000 digits, or
cannot be checked, leaves the expression unevaluated.

```epsil
N(1000pi, [10, 3])
// ➔ 3141.593
```

<MathJson name="N">

`["N", expr]`, `["N", expr, precision]`, `["N", expr, ["List", p, a]]`. The
result of `N` with a precision is a float, also when its value is an integer:
`["N", 2, 10]` is `2.0`. The elements of a list result are rounded floats,
and the constants of a symbolic result stay exact. The value of an exact
rational is a float, so `["N", ["Rational", 1, 3]]` has the type
`real<0.33..0.34>`; an integer stays an integer.

```json example
["N", ["Multiply", ["Power", 10, 10],
  ["Subtract", ["Exp", 100], ["Exp", ["Divide", 999999999999, ["Power", 10, 10]]]]],
  ["List", "PositiveInfinity", 20]]
// ➔ 2.688117141681729591326298974395630530648558808379370953675983977e+43
```

</MathJson>

### nSolve

MathJSON `NSolve` · `(any, any*) -> list`

NSolve(equation, unknown): the solutions of an equation as floats.

It is Mathematica `NSolve`: it takes the same operands as `Solve`, including domain specs and systems of equations, and gives the `N` of each solution of `Solve`:

`NSolve(x^2 == 2, x)` → `[1.414…, -1.414…]`. When `Solve` finds no solution set, `NSolve` stays unevaluated: for a polynomial `Solve` already gives numeric roots when there is no closed form, and `FindRoot` gives one local root from a start value.

```epsil
nSolve(x^2 == 2, x)
// ➔ [1.4142135623730950488,-1.4142135623730950488]
```

### NamedArgument

`(string, any) -> nothing`

NamedArgument(name, value): one named argument of a call (Epsil surface syntax: `f(rate: 0.05)`).

A parse-level carrier, like `Spread`, but one that never survives:

the enclosing call consumes it at canonicalization, permuting the written arguments into the order its callee declares.

Reaching this definition therefore means the carrier was NOT consumed — the callee supplied no parameter names to match — which is the `argument-names-unavailable` error.

```epsil
((x, y) => x - y)(y: 2, x: 10)
// ➔ 8
```

### nothing

variable `nothing`

The value of an empty block or of a statement with no value; the sole member of the unit type. A list keeps it as an element.

```epsil
[1, nothing, 2]
// ➔ [1,"Nothing",2]
```

`nothing` is kept where it is written, and an operation that needs a value
gives an `incompatible-type` error for it:

```epsil
[2, nothing, 3]
// ➔ [2,"Nothing",3]
1 + nothing
// ➔ error: Type error: expected `number`, got `nothing` at `nothing` in `1 + nothing`
```

<MathJson name="Nothing">

`"Nothing"`. An empty slot in LaTeX, such as `\lbrack 2, ,3 \rbrack`, is a
parse error: the slot holds `["Error", "'missing'"]`. A trailing comma,
`\lbrack 1, 2, \rbrack`, is dropped. The symbols `All` and `None` are inert
tags of the MathJSON format, with no value other than themselves.

</MathJson>

### numberFrom

MathJSON `NumberFrom` · `(character | string, base: (character | integer | string)?) -> number`

NumberFrom(s): the number the string `s` denotes — optional surrounding whitespace, an optional sign, then ASCII digits with an optional "." fraction and an optional e/E exponent, or one of "oo", "+oo", "-oo", "NaN", "Indeterminate". The integer part may be omitted before a fraction (".5" is 0.5); a trailing "." with no fraction digits ("5.") is not accepted. Any other text, including "", is an error value (never NaN).

NumberFrom(s, base): the integer `s` denotes in `base` (2 to 36); only integer numerals are accepted.

```epsil
numberFrom("3.25")
// ➔ 3.25
```

```epsil
numberFrom("ff", 16)
// ➔ 255
```

### numericApproximation

MathJSON `NumericApproximation` · `(any) -> unknown`

Numerically evaluate an expression, as the `.N()` method does (engine-internal).

### Object

`(any, string?) -> unknown`

Provenance head for the snapshot of a mutable object: `["Object", <record>, "'TypeName'"]`. The record holds the object's stored fields at the moment it was serialized; the second operand names the nominal type the object had. Not a constructor and not an ascription — it wraps data, it does not make an object.

### Optional

`(any, any) -> nothing`

Optional(param, default): a parameter of a function literal with a default value (Epsil surface syntax: `(x, k = 2) => x * k`).

A call that leaves out the argument of the parameter receives the default. `param` is a symbol or `Typed(symbol, type)`; `default` is a number, a string, `True`, `False`, a symbol, `[]` or `{}`.

A parse-level carrier, like `Spread`: only the parameter list of a `Function` literal reads it. Anywhere else it is the `unexpected-argument` error.

```epsil
((x, k = 2) => x * k)(3)
// ➔ 6
```

### OverParen

`(any+) -> expression`

Over-paren accent (`\overparen{BC}`) — opaque typed head; not evaluated.

```epsil
OverParen(B, C)
// ➔ OverParen(B, C)
```

<MathJson name="OverParen" latex={["\\overparen"]} />

### padEnd

MathJSON `PadEnd` · `(character | string, n: integer, pad: (character | string)?) -> string`

PadEnd(s, n, pad=" "): `s` padded at the END to `n` characters by repeating `pad` (its final copy truncated on a character boundary). Returned unchanged when `s` already has `n` or more characters. `n` must be a non-negative integer; an empty `pad` is an error; a non-string `pad` leaves the expression unevaluated.

```epsil
padEnd("abc", 6, ".")
// ➔ "abc..."
```

### padStart

MathJSON `PadStart` · `(character | string, n: integer, pad: (character | string)?) -> string`

PadStart(s, n, pad=" "): `s` padded at the START to `n` characters by repeating `pad` (its final copy truncated on a character boundary). Returned unchanged when `s` already has `n` or more characters. `n` must be a non-negative integer; an empty `pad` is an error; a non-string `pad` leaves the expression unevaluated.

```epsil
padStart("42", 5, "0")
// ➔ "00042"
```

### parallel

`(any, any) -> expression`

Parallelism relation (`AB \parallel CD`) — opaque typed head; not evaluated.

```epsil
parallel(l, m)
// ➔ Parallel(l, m)
```

<MathJson name="Parallel" latex={["\\parallel"]} />

### parse

`(string) -> any`

Parse a LaTeX string and evaluate to a corresponding expression

```epsil
parse(#"\frac{\pi}{2}"#)
// ➔ 1/2 * pi
```

```epsil
parse("\\frac{\\pi}{2}")
// ➔ 1/2 * pi
```

<MathJson name="Parse">

`["Parse", ["LatexString", "'\\frac{\\pi}{2}'"]]`.

</MathJson>

### perpendicular

`(any, any) -> expression`

Perpendicularity relation (`AB \perp CD`) — opaque typed head; not evaluated.

```epsil
perpendicular(l, m)
// ➔ Perpendicular(l, m)
```

<MathJson name="Perpendicular" latex={["\\perp"]} />

### Pipe

`(value, function) -> unknown`

Apply a function to a value: `Pipe(x, f)` evaluates to `f(x)`.

```epsil
Pipe([3, 1, 2], sort)
// ➔ [1,2,3]
```

```epsil
16 |> sqrt
// ➔ 4
```

<MathJson name="Pipe" latex={["\\rhd"]} />

### polygon

`(any+) -> expression`

Polygon primitive — opaque typed head.

```epsil
polygon(A, B, C, D)
// ➔ Polygon(A, B, C, D)
```

<MathJson name="Polygon" latex={["\\operatorname{polygon}"]} />

### prime

`(T, integer?) -> T where T`

Derivative or prime notation (`f'`, `f^{(n)}`) — opaque typed head until a derivative library handler runs.

```epsil
prime(f)
// ➔ Prime(f)
```

<MathJson name="Prime" latex={["^\\prime"]} />

### print

MathJSON `Print` · `(any*) console -> nothing`

Print the operands to the host console, separated by spaces and followed by a newline. String operands print their content (without quotes); other expressions print their text form. Evaluates to `Nothing`. On a host without a console, prints nothing. When the host denies console access, evaluates to a `capability-denied` error.

```epsil
print("Hello", 42)
```

### program

MathJSON `Program` · `(unknown*) -> unknown`

Evaluate a program in the caller scope, continuing after statement errors.

### ProtocolMember

`(protocol: string, member: string, arguments: any*) -> unknown`

Invoke a protocol member on a value — the lowering of a QUALIFIED protocol call (`Comparable.compare(x, y)` in Epsil, whose parse, a `MemberCall` on the protocol name, canonicalizes to `Apply(Field(Comparable, "compare"), x, y)`). The first two operands name the protocol and the member; the rest are the call arguments. Dispatch is dynamic and restricted to the named protocol: the most specific conformance implementation for the runtime type of the first argument is invoked. Several equally specific implementations are `protocol-call-ambiguous`; none is `protocol-implementation-missing`; an argument whose type cannot decide the question leaves the call symbolic.

```epsil
protocol Negatable { function negated(self: Self) -> Self }
type number is Negatable { function negated(self) -> number { -self } }
Negatable.negated(5)
```

### ProtocolProperty

`(protocol: string, property: string, receiver: any, value: any?) -> unknown`

Read (or write) a protocol PROPERTY through a NAMED protocol — the lowering of the qualified field form `person.(Nameable.name)` (protocols design P6, amending the D16 field grammar). The first two operands name the protocol and the property; the third is the receiver. A fourth operand makes it a property STORE — the qualified write `person.(Nameable.name) = v` — which invokes the `set` accessor against the receiver, discards what it returns, and evaluates to the value assigned; a receiver that is not an object is `immutable-value-assignment`. Dispatch is dynamic and restricted to the named protocol: the most specific conformance implementation for the runtime type of the receiver is invoked.

```epsil
protocol Signed { readonly sign: string }
type number is Signed {
  get sign(self) -> string { if (self < 0) { "-" } else { "+" } }
}
let x = -12
x.(Signed.sign)
```

### quadrilateral

`(any+) -> expression`

Quadrilateral mark (`\square ABCD`) — opaque typed head; not evaluated.

```epsil
quadrilateral(A, B, C, D)
// ➔ Quadrilateral(A, B, C, D)
```

<MathJson name="Quadrilateral" latex={["\\square"]} />

### random

`((collection<any> | set<real>)?) random -> any`

Random(): non-deterministic real in [0, 1)

Random(Interval(a, b)): a real in [a, b) (endpoint markers ignored)

Random(Range(...)): an element of the range Random(xs): an element of the finite collection `xs`

```epsil
random()
```

```epsil
random(1..6)
```

`random` is not a pure function: it has the `random` effect, and it gives a
different value each time it is evaluated. Inside `withRandomSeed`, the block
as a whole is pure and replays.

- `random()` is a real number in `[0, 1)`.
- `random(interval(a, b))` is a real number in `[a, b)`. Open and closed
  ends are ignored: a floating-point draw cannot respect an open end.
- `random(m..n)` is an element of the range, which includes both ends. A
  range with reversed bounds descends.
- `random(xs)` is an element of the finite collection `xs`. The domain is not
  built: `random(1..1000000)` picks an index of the range.

`random` draws along the **first axis** of a nested collection, so
`random([[1, 2], [3, 4]])` is a row. A tuple is a finite indexed collection,
and `random` gives one of its elements. An unbounded or empty interval, an
infinite range or collection, and an empty collection are errors.

```epsil
random([])
// ➔ error: Runtime error: out of range: a non-empty collection, []
random([[1, 2], [3, 4]])
random(interval(-1, 1))
random([5, 2, 10, 18])
```

<MathJson name="Random">

`["Random"]`, `["Random", domain]`.

```json example
["Random", ["Range", 1, 6]]
// ➔ 4 (for example), a die roll
["Random", ["Interval", -1, 1]]
// ➔ -0.318… (for example)
```

</MathJson>

### randomChoice

`((T, number) random -> T where T: string) & ((collection<any> | set<real>, number) random -> list<any>)`

RandomChoice(domain, k): a list of k independent draws from `domain`, with replacement. `k` may exceed the size of the domain — that is what replacement means. Choosing from a string yields a string.

```epsil
randomChoice(["a", "b", "c"], 5)
```

The count `k` is a `number`, not an `integer`, so a computed count need not
be rounded first: it is rounded half toward `+oo` (`2.5` gives `3`, `-2.5`
gives `-2`). A negative or out-of-range count is an error, and `0` gives the
empty list. Only the `k` drawn elements are built, not the domain, so
`randomChoice(1..1000000000, 5)` is cheap.

```epsil
[randomChoice(1..6, 0), length(randomChoice(1..6, 2.5))]
// ➔ [[],3]
withRandomSeed(7, randomChoice(interval(0, 1), 4))
// ➔ [0.08483070468009213,0.19562714896013578,0.24148300073452322,0.750274109006007]
randomChoice(1..6, -1)
// ➔ error: Runtime error: out of range: a count in 0..1000000, -1
```

<MathJson name="RandomChoice">

`["RandomChoice", domain, k]`.

```json example
["RandomChoice", ["Range", 1, 6], 3]
// ➔ [4, 1, 4] (for example): repeats are expected
```

</MathJson>

### randomExpression

MathJSON `RandomExpression` · `() entropy -> expression`

Generate a random expression.

```epsil
randomExpression()
```

### ReleaseHold

`(any) -> unknown`

Release an expression held by `Hold`

```epsil
ReleaseHold(Hold(1 + 2))
// ➔ 3
```

### replaceAll

MathJSON `ReplaceAll` · `(any, any+) -> any`

ReplaceAll(expr, rules): apply one or more replacement rules to `expr`, then evaluate the result (Mathematica `expr /. rules`).

A rule is `Rule(lhs, rhs)`, or `lhs -> rhs` in LaTeX (parsed as `To`; in Epsil `->` builds a dictionary entry, which is not a rule). Several rules may be given as extra arguments or as a `List`/`Set` of rules; they are applied simultaneously in a single pass.

```epsil
replaceAll(x^2 + x, Rule(x, 3))
// ➔ 12
```

### Rule

`(match: expression, replace: expression, predicate: function?) -> expression`

Pattern replacement rule.

```epsil
replaceAll(x + y, Rule(x, 2))
// ➔ y + 2
```

### RuntimeError

`(expression<ErrorCode> | string) -> never`

Construct an error value when evaluated: the runtime counterpart of a written `Error(…)`, which is a static diagnostic node. Evaluates to `Error(code)`.

```epsil
isError(RuntimeError("oops"))
// ➔ "True"
```

### segment

`(any+) -> expression`

Segment primitive — opaque typed head.

```epsil
segment(A, B)
// ➔ Segment(A, B)
```

<MathJson name="Segment" latex={["\\operatorname{segment}"]} />

### Sequence

`function`

Ordered sequence of expressions.

```epsil
[0, Sequence(1, 2), 3]
// ➔ [0,1,2,3]
```

When a sequence is used where an element is expected, its elements are
spliced into the enclosing expression. The empty sequence splices to no
element.

```epsil
let s = Sequence(2, 3); [1, s, 4]
// ➔ [1,2,3,4]
[1, Sequence(), 2]
// ➔ [1,2]
```

`Nothing` is not an empty sequence. It is the value of an empty block or of a
statement with no value, and a collection keeps it as an element:

```epsil
[1, Nothing, 2]
// ➔ [1,"Nothing",2]
length([1, Nothing, 2])
// ➔ 3
```

<MathJson name="Sequence">

`["Sequence", ...elements]`.

```json example
["List", 1, ["Sequence", 2, 3], 4]
// ➔ ["List", 1, 2, 3, 4]

["List", 1, ["Sequence"], 2]
// ➔ ["List", 1, 2]

["List", 1, "Nothing", 2]
// ➔ ["List", 1, "Nothing", 2]
```

</MathJson>

### Signature

`(symbol) -> nothing | string`

Return the signature string of an operator.

```epsil
Signature(stringRepeat)
// ➔ "(character | string, n: integer) -> string"
```

### simplify

MathJSON `Simplify` · `(any, any?) -> expression`

Simplify(expr): simplify an expression.

Simplify(expr, assumptions): simplify under one or more boolean assumptions (e.g. `x > 0`), or a `List`/`And` of them. The assumptions hold only for the duration of the simplification.

```epsil
simplify(sin(x)^2 + cos(x)^2)
// ➔ 1
```

```epsil
simplify(sqrt(x^2), x > 0)
// ➔ x
```

### solve

`(any, any*) -> list`

Solve(equation, unknown): the list of solutions of an equation for the unknown. The equation may be an `Equal` expression or a bare expression (read as `= 0`), e.g. `Solve(x^2 - 1 == 0, x)` or `Solve(x^2 - 1, x)`.

The unknown may be omitted: it defaults to the equation's single free variable, or to `x` when there are several and one of them is `x`.

Solve([eq1, eq2, …], [x, y, …]): solve a system of equations; each solution is a tuple of values in the order of the variable list, e.g.

Solve([x + y == 3, x - y == 1], [x, y]) → [(2, 1)].

```epsil
solve(x^2 - 1 == 0, x)
// ➔ [1,-1]
```

```epsil
solve([x + y == 3, x - y == 1], [x, y])
// ➔ [(2, 1)]
```

`solve(equation, unknown)` is the list of the solutions. The equation is an
`==` equation, or an expression solved as equal to zero. With no unknown, it
is the single free variable of the equation, or `x` when there are several
and one of them is `x`, so a pipeline works without naming it. For a system,
give a list of equations and a list of unknowns: each solution is a tuple, in
the order of the unknowns. Linear systems are solved exactly.

```epsil
[solve([x + y == 3, x - y == 1], [x, y]), x^2 == 4 |> solve]
// ➔ [[(2, 1)],[2,-2]]
```

**A domain.** An unknown can be restricted to a domain, `x in 1..1000` or
`x in interval(a, b)`. The equation is solved symbolically, and its solutions
are filtered to the domain. A periodic family gives every member in the
domain. When no symbolic solution is found and the domain is finite and not
too large, `solve` checks each element exactly. With a condition, any
boolean expression is accepted. With several unknowns, each with a domain,
each solution is a tuple:

```epsil
solve(x^2 - 5x == -6, x in 1..1000)
// ➔ [3,2]
solve(x^3 + y^3 == 1729, x in 1..12, y in 1..12)
// ➔ [(1, 12),(9, 10),(10, 9),(12, 1)]
```

**Integer equations** are solved symbolically when every unknown ranges over
integers: linear equations in any number of unknowns, Pell equations
`x^2 - D y^2 = N`, and the Pythagorean equation `x^2 + y^2 = z^2`. This
reaches answers that checking each element cannot: the domain below has
`10^10` pairs. Over all integers, the result is a family with integer
parameters, `ArbitraryInteger(1)`, `ArbitraryInteger(2)`, … For the
Pythagorean equation, it is the two classical families, which hold every
integer solution.

```epsil
solve(x^2 - 29y^2 == 1, x in 1..100000, y in 1..100000)
// ➔ [(9801, 1820)]
solve(6x + 9y == 4, x in 1..100, y in 1..100)
// ➔ []
solve(3n + 4m == 7, n in Integers, m in Integers)
// ➔ [(-7 + 4ArbitraryInteger(1), 7 - 3ArbitraryInteger(1))]
```

The assumptions about an unknown, such as `assume(n > 0)`, filter the
solutions too.

**The result is complete or absent.** The list holds every solution in the
domain, and an empty list means that there is none. When the engine cannot
show that its list is complete, `solve` stays unevaluated: it never returns a
part of the solutions. An equation that holds for every value gives
`[ArbitraryConstant(1)]`, and an equation whose answer depends on another
unknown stays unevaluated.

```epsil
[solve(e^x == x + 2, x), solve(x == x, x), solve(a == 0, x)]
// ➔ [Solve(e^x == x + 2, x),[ArbitraryConstant(1)],Solve(a == 0, x)]
```

**Real or complex solutions.** With no declared type and no domain, a
polynomial equation gives all its roots, the complex ones too. A root is
exact when the polynomial has a closed form that the engine knows: a rational
root, a quadratic factor with rational coefficients, a pure power `x^n = c`,
or a polynomial in `x^g`; the other roots are floats. Any other equation
gives its real solutions only. A symbol other than the unknown, with no value
and no type, counts as real.

```epsil
[solve(x^2 + 1 == 0, x), solve(x^3 == 8, x)]
// ➔ [[i,-i],[2,-1 + sqrt(3)i,-1 - sqrt(3)i]]
[solve(e^x == -1, x), solve(abs(x - 1) == 3, x), solve(abs(x - a) == 2, x)]
// ➔ [[],[-2,4],[a - 2,a + 2]]
```

**Trigonometric equations** have infinitely many solutions. With no domain,
or over the real or complex numbers, the result is a list of families with an
integer parameter, `ArbitraryInteger(1)`. Families with the same solutions
become one family, and each factor of a product gives its families with its
own period. A condition on the unknown cannot remove members of a family, and
then `solve` stays unevaluated. Over a bounded domain, the result holds every
solution in the domain.

```epsil
solve(sin(x) == 1/2, x)
// ➔ [2pi * ArbitraryInteger(1) + 1/6 * pi,2pi * ArbitraryInteger(1) + 5/6 * pi]
[solve(sin(x) == 0, x), solve((x - 1) * sin(x) == 0, x)]
// ➔ [[pi * ArbitraryInteger(1)],[1,pi * ArbitraryInteger(1)]]
solve(sin(x) == 0, x in interval(0, 10))
// ➔ [0,pi,2pi,3pi]
```

**A decimal number in the equation.** The engine compares two numbers within
its tolerance (`1e-10` by default), so `10 == 10.0000000000001` is `True`.
Over the real or complex numbers, `solve` does not use the tolerance: the
solutions are the exact roots, with the decimal numbers as they are written.
Over a discrete domain, each element is checked with the tolerance.

```epsil
solve(x == 10.0000000000001, x in interval(-10, 10))
// ➔ []
solve(x == 10.0000000000001, x in -10..10)
// ➔ [10]
```

**When `solve` stays unevaluated**, the reason is usually one of these: the
unknown is both inside and outside a function that the solver cannot invert
(`e^x = x + 2`, `cos(x) = x`); a special function of the unknown
(`besselJ(0, x) = 0`); a trigonometric function of an argument that is not
linear in the unknown, with no bounded domain (`sin(x^2) = 0`); a polynomial
of degree 3 or more with symbolic coefficients; or, over a bounded domain,
too many solutions to list. Then:

- give a bounded domain, `x in interval(a, b)`: the engine uses interval
  arithmetic to prove that the domain has no other root;
- or use `findRoot` to find one solution numerically, near a start value.

```epsil
findRoot(e^x == x + 2, [(x, 1)])["converged"]
// ➔ "True"
```

<MathJson name="Solve">

`["Solve", equation]`, `["Solve", equation, unknown]`,
`["Solve", equation, spec1, spec2, ...]`, where a spec is a symbol,
`["Element", symbol, collection]`, or `["Element", symbol, collection, condition]`
with the indexing-set convention of `Sum`. In LaTeX, `x \in 1..1000` parses
to the `Element` form: `\operatorname{Solve}(x^2=4,\; x \in 1..1000)`.

```json example
["Solve", ["Equal", ["Power", "x", 2], 1], "x"]
// ➔ ["List", 1, -1]
["Solve",
  ["List", ["Equal", ["Add", "x", "y"], 3], ["Equal", ["Subtract", "x", "y"], 1]],
  ["List", "x", "y"]]
// ➔ ["List", ["Tuple", 2, 1]]
```

`Solve` is the operator form of the `expr.solve()` method of the JavaScript
API. For a periodic equation, `Solve` gives the families of solutions, and
`expr.solve()` the principal solutions. A root template added to
`ce.solveRules` is taken as a solution as it is.

</MathJson>

### sphere

`(any+) -> expression`

Sphere primitive — opaque typed head.

```epsil
sphere(O, r)
// ➔ Sphere(O, r)
```

<MathJson name="Sphere" latex={["\\operatorname{sphere}"]} />

### Spread

`(any) -> unknown`

Spread(t): splice the elements of the tuple `t` into the enclosing argument list (Epsil surface syntax: `f(...t)`).

A literal tuple splices at canonicalization; a symbolic argument is spliced by the enclosing call at evaluation (step 0 of the evaluate path), which re-validates the resulting arity.

```epsil
max(...(4, 9, 2))
// ➔ 9
```

### String

`(any*) -> string`

A string created by joining its arguments. The arguments are converted to their default string representation.

```epsil
String("x", 2)
// ➔ "x2"
```

```epsil
String(x, 2)
// ➔ "x2"
```

<MathJson name="String" latex={["\\text"]}>

`["String", expr1, expr2, ...]`.

</MathJson>

### stringCompare

MathJSON `StringCompare` · `(character | string, character | string) -> integer`

StringCompare(a, b): -1 when `a` sorts before `b`, 0 when they are equal, 1 when `a` sorts after `b`. The order compares Unicode scalar sequences code point by code point (NOT UTF-16 code units, which would sort astral characters below U+E000..U+FFFF).

```epsil
stringCompare("apple", "banana")
// ➔ -1
```

### stringFrom

MathJSON `StringFrom` · `(any, format: string?) -> string`

StringFrom(value, format?): create a string from `value`. With no format, a number or a list of numbers is read as Unicode scalar values (`StringFrom(65)` is `"A"`), and any other value is printed (`StringFrom(True)` is `"True"`). The formats are `"default"` (print the value), `"unicode-scalars"`, `"utf-8"` and `"utf-16"`.

```epsil
stringFrom(65)
// ➔ "A"
```

```epsil
stringFrom([72, 105])
// ➔ "Hi"
```

### stringJoin

`(collection<character | string>, separator: (character | string)?) -> string`

StringJoin(xs): join the elements of the finite collection `xs` (strings or characters) into a string.

StringJoin(xs, sep): the same, with `sep` between consecutive elements. The inverse of StringSplit. An empty collection joins to "", a one-element collection to that element. A non-text element, or a non-finite collection, leaves the expression unevaluated. For variadic concatenation use Join(a, b, …) or string interpolation.

```epsil
stringJoin(["a", "b", "c"], "-")
// ➔ "a-b-c"
```

<MathJson name="StringJoin" latex={["\\lt\\gt"]} />

### stringRepeat

MathJSON `StringRepeat` · `(character | string, n: integer) -> string`

StringRepeat(s, n): `n` copies of the string `s`, concatenated. StringRepeat(s, 0) is "". A negative or non-integer `n` is an error.

```epsil
stringRepeat("ab", 3)
// ➔ "ababab"
```

### stringReplace

MathJSON `StringReplace` · `((character | string, character | string, character | string, count: integer?) -> string) & ((character | string, regexp, character | string, count: integer?) -> string) & ((character | string, regexp, function, count: integer?) -> string)`

StringReplace(s, target, replacement): replace every non-overlapping occurrence of `target` in `s`, scanning left to right over whole characters.

StringReplace(s, target, replacement, count): replace at most `count` occurrences, from the left. An empty `target` is an error (the "insert at every boundary" behavior is deliberately not inherited); an empty `replacement` means deletion. `count` must be a positive integer.

StringReplace(s, pattern, replacement, count?): `target` may be a regular expression, matched with the host dialect. `$1`-style templates are NOT expanded in `replacement`.

StringReplace(s, pattern, f, count?): `replacement` may be a function, called with the same match record StringMatch returns, so each replacement can be computed from its captures.

```epsil
stringReplace("banana", "a", "o")
// ➔ "bonono"
```

```epsil
stringReplace("banana", "a", "o", 1)
// ➔ "bonana"
```

### stringSplit

MathJSON `StringSplit` · `((character | string, (character | string)?) -> list<string>) & ((character | string, regexp) -> list<string>)`

StringSplit(s): split a string on runs of whitespace (the Unicode White_Space code points), dropping empty parts.

StringSplit(s, sep): split a string on the separator string `sep` (empty parts are kept). An empty separator splits into user-perceived characters (grapheme clusters), like Characters. A non-string argument leaves the expression unevaluated.

StringSplit(s, pattern): split on each match of a regular expression, with the host dialect's own semantics — including splitting at a zero-width match. Captures are not interleaved into the result; use StringMatchAll for those.

```epsil
stringSplit("a,b,c", ",")
// ➔ ["a","b","c"]
```

```epsil
stringSplit("  one two  three ")
// ➔ ["one","two","three"]
```

### Subscript

`(collection<any>, any) -> any`

Subscript notation for indexing or compound symbols.

```epsil
Subscript([10, 20, 30], 2)
// ➔ 20
```

The way LaTeX subscripts are read, as part of a name, as an index or as an
expression, is described in
[Subscripts and superscripts](/compute-engine/guides/latex-syntax/#subscripts-and-superscripts).

<MathJson name="Subscript" latex={["_"]} />

### Subtype

`(subtype: string | type, supertype: string | type) -> boolean`

True iff the FIRST operand is a subtype of the second — `Subtype("integer", "number")` is `True`, `Subtype("number", "integer")` is `False`. This is the same compatibility relation annotations and signatures use. Operands are type values or type text; a quantified (`where`) type is not comparable and errors.

```epsil
Subtype("integer", "number")
// ➔ "True"
```

### symbol

`function`

Construct a new symbol with a name formed by concatenating the arguments

```epsil
symbol("x", 2)
// ➔ "x2"
```

The symbol is not declared: it is a free variable.

```epsil
symbol(x, 2)
// ➔ "x2"
```

<MathJson name="Symbol">

`["Symbol", expr1, expr2, ...]`. To declare it, use `Declare` with a value:
`["Declare", ["Symbol", "x", 2], "real", 0]`.

</MathJson>

### tail

`(any) -> collection`

Return the tail of an expression, the operands of the expression

```epsil
[tail(max(a, b, c))]
// ➔ [a,b,c]
```

`tail` is a sequence, so in a list or a call its elements are spliced in. A
symbol is read through its value; a symbol with no value, or any value that
is not a compound expression, has no tail, and `tail` gives `nothing`.

```epsil
tail(2 + x)
// ➔ 2 x
let x = a + 1
[tail(x), tail(y)]
// ➔ [a,1,"Nothing"]
```

<MathJson name="Tail">

`["Tail", expr]` is a `Sequence`, so it can change the head of an expression:

```json example
["Multiply", ["Tail", ["Add", 2, 3]]]
// ➔ ["Multiply", 2, 3]
```

</MathJson>

### Text

`(any*) -> string`

A sequence of strings, annotated expressions and other Text expressions

```epsil
Text("Total: ", 42)
// ➔ "Total: 42"
```

### timing

MathJSON `Timing` · `(value, repeat: integer?) -> tuple<number, value>`

`Timing(expr)` evaluates `expr` and returns a pair: the time the evaluation took, in microseconds, then the value; read them as `Timing(expr)[1]` and `Timing(expr)[2]`. `Timing(expr, n)` evaluates `expr` n times (at least 3), drops the fastest and the slowest run, and returns the mean time of the others

```epsil
timing(2 + 2)[2]
// ➔ 4
```

### to

`(any, any) -> nothing`

Action arrow / mapping (`a \to b`) — opaque typed head.

```epsil
replaceAll(x^2 + x, to(x, 3))
// ➔ 12
```

<MathJson name="To" latex={["\\to"]} />

### toLowerCase

MathJSON `ToLowerCase` · `(character | string) -> string`

ToLowerCase(s): the string `s` mapped to lower case using the Unicode default (locale-independent) mappings.

```epsil
toLowerCase("Hello World")
// ➔ "hello world"
```

### toUpperCase

MathJSON `ToUpperCase` · `(character | string) -> string`

ToUpperCase(s): the string `s` mapped to upper case using the Unicode default (locale-independent) mappings. The character count can change ("ß" uppercases to "SS").

```epsil
toUpperCase("straße")
// ➔ "STRASSE"
```

### triangle

`(any+) -> expression`

Triangle primitive — opaque typed head.

```epsil
triangle(A, B, C)
// ➔ Triangle(A, B, C)
```

<MathJson name="Triangle" latex={["\\operatorname{triangle}"]} />

### trim

MathJSON `Trim` · `(character | string, chars: (character | collection<character | string> | string)?) -> string`

Trim(s): remove leading and trailing whitespace (the Unicode White_Space characters).

Trim(s, chars): remove leading and trailing characters that belong to `chars` — a SET of characters, given as a character, a string (meaning the set of that string's characters) or a collection whose elements each contribute their own characters.

```epsil
trim("  hi  ")
// ➔ "hi"
```

```epsil
trim("--hi--", "-")
// ➔ "hi"
```

### trimEnd

MathJSON `TrimEnd` · `(character | string, chars: (character | collection<character | string> | string)?) -> string`

TrimEnd(s): remove trailing whitespace (the Unicode White_Space characters).

TrimEnd(s, chars): remove trailing characters that belong to `chars` — a SET of characters, as for Trim.

```epsil
trimEnd("hi!!", "!")
// ➔ "hi"
```

### trimStart

MathJSON `TrimStart` · `(character | string, chars: (character | collection<character | string> | string)?) -> string`

TrimStart(s): remove leading whitespace (the Unicode White_Space characters).

TrimStart(s, chars): remove leading characters that belong to `chars` — a SET of characters, as for Trim.

```epsil
trimStart("007", "0")
// ➔ "7"
```

### type

`(any) -> type`

The STATIC type of an expression, as a type value: `Type(3)` is `TypeFrom("integer")`. The observer does not evaluate its operand, except a name with no declared type, which gives the widened type of the value it holds. Recover the text with `StringFrom(Type(x))`; in a string interpolation a type value renders as its text directly. BREAKING (2026-08-19, ruling R3 of `docs/TYPE-SYSTEM.md`): the result used to be a STRING, and `Type(x) == "some text"` is now always `False` — use `x is T`, `Subtype(Type(x), u)`, or compare `StringFrom` text.

```epsil
type("hi")
// ➔ TypeFrom("string")
```

```epsil
type([1, 2, 3])
// ➔ TypeFrom("vector<integer^3>")
```

The result is the **literal type** of the expression, the most precise type
of its value: the type of `2.4531` is `2.4531`, which widens to `real`, a
finite real. A name with a declared type gives that type. A name with no
declared type, such as an untyped parameter, gives the type of its value,
widened.

```epsil
type(2.4531)
// ➔ TypeFrom("2.4531")
function f(x) { type(x) }
f(1)
// ➔ TypeFrom("integer")
```

See [Types](/types/).

<MathJson name="Type">

`["Type", expr]`.

```json example
["Type", 2.4531]
// ➔ ["TypeFrom", "'2.4531'"]
```

</MathJson>

### typeFrom

MathJSON `TypeFrom` · `(text: string) -> type`

A type expression as a first-class value, constructed from its text: `TypeFrom("list<integer>")`. The value SETTLES at construction — the text is parsed, reduced, and stored back as its canonical form — so two values built from equivalent spellings (`"integer|real"`, `"real|integer"`) are the same value. `==` between two type values is mutual subtyping (it also equates an alias with its body); `==` between a type value and anything else, a string included, is `False`. Construction never touches the type registry: a forward reference (`type X`) or an unknown name is an error, not a registration.

```epsil
TypeFrom("integer | real") == TypeFrom("real")
// ➔ "True"
```

### Typed

`(any, string | symbol) -> unknown`

Ascribe a type to an expression. The type is asserted for the type system. At evaluation, a concrete value that does not conform to the type is an `incompatible-type` error; any other value is returned unchanged. Used to annotate `Function` literal parameters and return types.

```epsil
Typed(2 + 3, "integer")
// ➔ 5
```

`Typed(expr, type)` sets the static type of the expression. When it is
evaluated, a concrete value (a number, a string, a character, a boolean, or a
list or tuple of these) is checked against the type, and a value that does
not conform is an `incompatible-type` error. A symbolic value, `missing`,
`nothing`, `NaN` and an error pass unchanged. A float conforms to every type
that admits a real number, so the value of `N` passes under `integer`. A
character conforms where a string is declared.

```epsil
Typed(2 + 3, integer)
// ➔ 5
Typed("s", integer)
// ➔ error: Runtime error: expected `integer`, got `string` at `s`
```

<MathJson name="Typed">

`["Typed", expr, type]`, with the type as a string or a type name. Its main
use is to annotate the parameters and the result of a
[function literal](/compute-engine/reference/functions/#function).

</MathJson>

### Unevaluated

`(any) -> unknown`

Prevent an expression from being evaluated

### unicodeScalars

MathJSON `UnicodeScalars` · `(character | string) -> list<integer>`

A collection of Unicode scalars from a string, same as UTF-32

```epsil
unicodeScalars("A😀")
// ➔ [65,128512]
```

### utf16

MathJSON `Utf16` · `(character | string) -> list<integer>`

A collection of UTF-16 code units from a string.

```epsil
utf16("A😀")
// ➔ [65,55357,56832]
```

### utf8

MathJSON `Utf8` · `(character | string) -> list<integer>`

A collection of UTF-8 code units from a string.

```epsil
utf8("A€")
// ➔ [65,226,130,172]
```

### Wildcard

`(symbol) -> symbol`

Single-expression pattern wildcard.

```epsil
Wildcard(x)
// ➔ _x
```

### WildcardOptionalSequence

`(symbol) -> symbol`

Pattern wildcard matching zero or more expressions.

```epsil
WildcardOptionalSequence(x)
// ➔ ___x
```

### WildcardSequence

`(symbol) -> symbol`

Pattern wildcard matching one or more expressions.

```epsil
WildcardSequence(x)
// ➔ __x
```

### withRandomSeed

`(real | string, any) -> expression`

WithRandomSeed(seed, body): evaluate `body` with a random seed frame seeded by `seed` (a finite real or a string). The block replays identically, while repeated draws WITHIN the frame differ (the n-th draw is hash(seed, n)).

Scoping is dynamic: the frame is active through user-function calls, not just lexically inside `body`. Frames nest and the innermost wins.

Counters are per-frame, so a nested frame does not perturb its parent's subsequent draws.

Outside any frame, draws are live (non-deterministic).

```epsil
withRandomSeed(42, [random(1..6), random(1..6), random(1..6)])
// ➔ [5,3,5]
```

The seed must be a finite real number or a string. An infinite or undefined
seed is an `out-of-range` error. The seed is evaluated once, when the block
starts.

```epsil
[withRandomSeed(42, random()), withRandomSeed(42, random())]
// ➔ [0.7367300395263549,0.7367300395263549]
withRandomSeed(42, [random(), random()])
// ➔ [0.7367300395263549,0.4498528692283148]
withRandomSeed(oo, random())
// ➔ error: Runtime error: out of range: a finite real number or a string, +oo
```

Blocks nest, and the innermost wins. Each block counts its own draws, so a
nested block does not change the later draws of the block around it: below,
the first and third values are the first two values of the block seeded with
`1`.

```epsil
withRandomSeed(1, [random(), withRandomSeed(2, random()), random()])
// ➔ [0.9834569781146947,0.43120335189750414,0.20647662186831073]
```

Seed a row or a cell, not a whole document: with one block around a whole
document, a draw added near the top changes every value below it.

**A block around a lazy collection does not make it replay.** Only evaluation
draws, and a lazy collection is not evaluated until its elements are read.
By then the block has ended, so the draws are not seeded. The expression
looks seeded, and nothing reports the problem. Make the list inside the
block, with `listFrom`, and it replays:

```epsil
let a = withRandomSeed(3, [random() for k in 1..3])
let b = withRandomSeed(3, [random() for k in 1..3])
a[1] == b[1]
// ➔ "False"
let a = withRandomSeed(3, listFrom([random() for k in 1..3]))
let b = withRandomSeed(3, listFrom([random() for k in 1..3]))
a[1] == b[1]
// ➔ "True"
```

Reading the elements of the same lazy collection twice gives the same values:
the elements of one collection are cached. That is consistent reading, not
replay: the values are unseeded draws, and a new collection draws new ones.

`repeat(random(), n)` is evaluated at once and replays, but it draws
**once**, and gives `n` copies of one value. For `n` draws, use
`randomChoice(interval(0, 1), n)`.

```epsil
let r = repeat(random(), 3)
r[1] == r[2]
// ➔ "True"
```

<MathJson name="WithRandomSeed">

`["WithRandomSeed", seed, body]`. A string seed is a MathJSON string,
`"'cell-a7'"`.

```json example
["WithRandomSeed", 42, ["Random"]]
// ➔ 0.7367300395263549
["WithRandomSeed", "PositiveInfinity", ["Random"]]
// ➔ ["Error", ["ErrorCode", "'out-of-range'", "'a finite real number or a string'", "'+oo'"]]
```

</MathJson>
