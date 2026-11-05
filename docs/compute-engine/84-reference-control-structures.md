---
title: Control Structures
slug: /compute-engine/reference/control-structures/
---

<Intro>
Control Structures define how a sequence of expressions is evaluated.
</Intro>

## Overview

The flow of a program is controlled by control structures. Control structures
are expressions that define how a sequence of expressions is evaluated.

There are three kind of control structures:

- **Sequential**: `Block`, the most common where expressions are evaluated one
  after the other
- **Conditional** `If`, `Which` or `Match`, where expressions are evaluated
  depending on the value of a condition or the structure of a value
- **Iterative** `Loop` or `FixedPoint`, where expressions are evaluated
  repeatedly

## Sequential Control Structure

<FunctionDefinition name="Block">

<Signature name="Block">_expr-1_, ..._expr-n_</Signature>

A `["Block"]` expression is a sequence of expressions that are evaluated
sequentially.

A new scope is created for the `["Block"]` expression. The scope is destroyed
when the `["Block"]` expression is finished evaluating. This means that
variables defined in the `["Block"]` expression are not accessible outside of
the `["Block"]` expression.

The value of the `["Block"]` expression is the value of the last expression
`expr-n`. When the last expression is an `["Assign"]` or a `["Declare"]`, the
value of the block is `Nothing`: end the block with the name.

```json example
["Block", ["Assign", "b", 2]]
// ➔ Nothing

["Block", ["Assign", "b", 2], "b"]
// ➔ 2
```

If one of the expression in the block is a `["Return"]` expression, a
`["Break"]` expression or a `["Continue"]` expression, no more expressions are
evaluated and the value of the `["Block"]` is this expression.

`["Block"]` expressions can be nested as necessary. Scoping is lexical: a
nested scope — an inner `["Block"]`, an `["If"]` branch, or a `["Loop"]`
body — can read the enclosing block's variables, and assigning to a variable
declared in an enclosing block updates that binding. A `["Declare"]` in the
inner block instead introduces a new variable that shadows the outer one for
the duration of the inner block.

A local always has a value when it is read. These rules make that so, and each
form that breaks one is a static error in the canonical form:

- A declaration has a value: `["Declare", "x", "integer", 5]`, or the first
  `["Assign", "x", 5]` of the name at the level of the block. A `["Declare"]`
  with no value (`["Declare", "x"]`, `["Declare", "x", "integer"]`) is the
  error `declaration-without-value`, and a later `["Assign"]` does not repair
  it. One exception: a `["Declare"]` of a function type with no value is valid
  when a function definition of the same name is in the same block.
- The first assignment of a name must not be in a branch of an `["If"]` or a
  `["Which"]`, in the body of a `["Loop"]`, or in a case of a `["Match"]`. It
  is the error `first-assignment-in-branch`. Assign a value to the name before
  the branch. A name that is already declared is not a first assignment: the
  assignment writes that name.
- A local is not read before its declaration. It is the error
  `read-before-declaration`.
- An assignment is a statement, never an operand. `["f", ["Assign", "a", 2]]`
  and `["Assign", "t", ["Assign", "u", 1]]` are the error
  `assignment-in-operand`. Write `["Block", ["Assign", "a", 2], ["f", "a"]]`.
- A later assignment keeps the type of the local: its declared type, or the
  type of its first value (a number can become another number). Another type
  is the error `assignment-type-mismatch`.

```json example
["Block", ["Assign", "c", 5], ["Multiply", "c", 2]]


// ➔ 10
```

### Translating simultaneous assignments

`Block` is sequential: a later assignment observes changes made by every
earlier expression. A source language with simultaneous action tuples must
therefore snapshot all right-hand sides before committing any left-hand side.
The names `a` and `b` below are declared with a value before the block.

For example, if `(a → 1, b → a + 1)` means that `b` reads the value of `a`
from before the tuple, translate it as:

```json example
["Block",
  ["Assign", "_next_a", 1],
  ["Assign", "_next_b", ["Add", "a", 1]],
  ["Assign", "a", "_next_a"],
  ["Assign", "b", "_next_b"]]
```

The temporary names must be fresh. The first pass evaluates every right-hand
side against the old state; the second pass commits the results. Commit order
then does not matter because no temporary depends on a newly assigned value.

```json example
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

</FunctionDefinition>

## Conditional Control Structure

<FunctionDefinition name="If">

<Signature name="If">_condition_, _expr-1_</Signature>

If the value of `condition` is the symbol `True`, the value of the `["If"]`
expression is `expr-1`. Without an else-branch there is nothing to select when
`condition` is `False`, and the value is the absent value of `expr-1`: `NaN`
for a number, a point whose coordinates are all `NaN` for a point, and the
`Missing` marker for any other value. The type of the expression is the type
of `expr-1`.

```json example
["If", "False", 5]
// ➔ NaN

["If", "False", ["Tuple", 1, 2]]
// ➔ (NaN, NaN)

["If", "False", "'a'"]
// ➔ Missing
```

A single-branch `If` is the parse of the restriction `expr\{cond\}` and of a
`where` condition. It is written with `where`: `["If", ["Greater", "x", 0],
["Square", "x"]]` is `x^2\text{ where }0\lt x`.

<Signature name="If">_condition_, _expr-1_, _expr-2_</Signature>

If the value of `condition` is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `expr-2`.

A condition with no value is `False`: the absent value `Missing`, and a
comparison with an operand that has no value (`NaN`, `Missing`, `1/0`).
`["If", "Missing", 1, 2]` and `["If", ["Greater", "Missing", 0], 1, 2]` are
`2`. A `Which` reads its conditions the same way.

Only the selected branch is evaluated. The branch that is not selected is
**dead code**: if it contains an error, that error never reaches the value.

```json example
["If", "True", 5, ["Divide", "x"]]
// ➔ 5           — the malformed branch is never evaluated
```

Only *evaluation* skips the branch. The boxed expression still carries the
diagnostic — the JSON above boxes as
`["If", "True", 5, ["Divide", "x", ["Error", "'missing'"]]]` — so the error is
still reportable to the user.

Here's an example of a function that returns the absolute value of a number:

```json example
["Function", ["If", ["Greater", "n", 0], "n", ["Negate", "n"]], "n"]
```

`["If"]` expressions can be nested as necessary.

When `condition` is a list of booleans (for example `["Less", "L", 3]` with
`L` a list), `["If"]` selects **element by element** and the value is a list:
`["If", ["List", "True", "False", "True"], 1, 0]` is `[1, 0, 1]`. See
[Element-wise selection](#element-wise-selection) below.

</FunctionDefinition>

<FunctionDefinition name="Which">

<Signature name="Which">_condition-1_, _expr-1_, ..._condition-n_,
_expr-n_</Signature>

The value of the `["Which"]` expression is the value of the first expression
`expr-n` for which the corresponding condition `condition-n` is `True`. When no
condition is `True` — including the no-operand case `["Which"]` — there is
nothing to select, and the value is the `Missing` marker.

Only the selected expression is evaluated. The expressions that are not
selected are **dead code**: an error in one of them never reaches the value.
`["Which", "False", ["Divide", "x"], "True", 7]` evaluates to `7`. As with
`["If"]`, only *evaluation* skips them; the boxed expression still carries the
diagnostic.

<Latex value="\begin{cases} x &amp; \text{if } x &gt; 0 \\ -x &amp; \text{if } x &lt; 0 \\ 0 &amp; \text{otherwise} \end{cases}"/>

```json example
["Block",
  ["Assign", "n", -10],
  ["Which", ["Greater", "n", 0], "n", ["Less", "n", 0], ["Negate", "n"], "True", 0]
]
// ➔ 10
```

The last clause, with the condition `"True"`, is the default: it is selected
when no other condition is `True`.

A `["Which"]` expression is equivalent to the following `["If"]` expression:

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

A `["Which"]` expression is equivalent to a `switch` statement in JavaScript or
the `Which[]` function in Mathematica.

### Element-wise selection

A condition can also be a **list of booleans**, such as the result of a
comparison of a list with a number: with `L` equal to `[1, 3, 5]`,
`["Less", "L", 3]` is `[True, False, False]`. Then `["Which"]` and `["If"]`
select **at each position of the list**, as `numpy.select` does, and the value
is a list of the same length:

```json example
["If", ["List", "True", "False", "True"], 1, 0]
// ➔ [1, 0, 1]

["If", ["Less", "L", 3], "L", 0]
// ➔ [1, 0, 0]          with L = [1, 3, 5]

["Which", ["Less", "L", 2], 10, ["Less", "L", 4], "L", "True", 0]
// ➔ [10, 3, 0]         with L = [1, 3, 5]
```

At each position, the first clause whose condition is `True` at that position
gives the value of that position. The rules:

- **An expression that is a list gives its element at the position**; an
  expression that is not a list gives its own value at every position. In the
  second example, position 1 takes element 1 of `L`, and the other positions
  take `0`.
- **A condition that is not a list applies to every position**:
  `["Which", ["List", "True", "False"], 1, "True", 3]` is `[1, 3]`.
- **Every list must have the length of the condition**, else the value is an
  `incompatible-dimensions` error, as for `["Add"]`:
  `["If", ["Less", "L", 3], ["List", 10, 20], 0]` is
  `Error("incompatible-dimensions", "3 vs 2")`.
- **All expressions have one kind of element**: numbers, or points
  (`["Tuple", x, y]`). A number beside a point is an error. Other values
  are accepted. A position that no clause selects is `False` for a relation
  (a region is not drawn there) and a color with `NaN` channels for a color:
  `["If", ["List", "True", "False"], ["Greater", "x", 0]]` is
  `[0 < x, False]`, and `["If", ["List", "True", "False"], ["Rgb", 1, 0, 0]]`
  is `[Rgb(1, 0, 0), Rgb(NaN, NaN, NaN)]`. For any other value it is
  `Missing`.
- **A position that no clause selects** holds `NaN` for a number, and a point
  whose coordinates are `NaN` for a point:
  `["If", ["Less", "L", 3], "L"]` is `[1, NaN, NaN]`, and
  `["If", ["List", "True", "False"], ["Tuple", 1, 2]]` is
  `[(1, 2), (NaN, NaN)]`. A plot skips a `NaN` point. A number cell or a point cell is never
  `Missing`.
- **Only the selected expressions are evaluated**, each one once.

These are errors, found from the types before any evaluation (an
`incompatible-type` error, or `incompatible-dimensions` for two lengths):

- a condition that is a list of lists, such as the comparison of a matrix
  with a number: with `M` equal to `[[1, 2], [3, 4]]`,
  `["If", ["Less", "M", 3], "M", 0]` is an error;
- a condition with a `Missing` element:
  `["If", ["List", "True", "Missing", "False"], 1, 0]` is an error;
- an expression whose elements are lists:
  `["If", ["List", "True", "False"], ["List", ["List", 1], ["List", 2]], 0]`
  is an error;
- a string, or a list of strings, under a list of conditions, because a
  string has no value for a position that is not selected:
  `["If", ["Less", "L", 3], "'small'"]` is an error;
- a set under a list of conditions.

A relation, such as `["Greater", "x", 0]`, is accepted under a list of
conditions: it is the region of a plot restricted at each position.

A condition that is a single `True` or `False` keeps the ordinary behavior,
even when an expression is a list: `["If", "True", "L", 0]` is `L`, and
`["If", "False", ["List", 10, 20, 30]]` is `Missing`. A list is selected
element by element only when the condition is a list.

</FunctionDefinition>

### Restriction

A single-branch `["If", condition, expr]` is a **restriction**: the value of
`expr` where `condition` is `True`, and the absent value of `expr` where it is
`False` (`NaN` for a number, a point of `NaN` coordinates for a point,
`Missing` for any other value). It is the parse of
`expr\{condition\}` and of `expr \text{ where } condition`. When `condition`
cannot be determined, the restriction stays unevaluated.

```json example
["If", ["Greater", "x", 0], ["Square", "x"]]
// Evaluates to x^2 when x > 0, NaN when x ≤ 0.
```

The type of a restriction is the type of `expr`. The absent value is outside
that type, as `NaN` is outside `real`: `["If", ["Greater", "x", 0], 5]` has
the type `integer`.

Stacked restriction braces parse to one `If` whose condition is an `And`, in
the order written: `x\{x>0\}\{x<10\}` is
`["If", ["And", ["Less", 0, "x"], ["Less", "x", 10]], "x"]`.

Up to version 0.177.0 a restriction was the operator `["When", expr,
condition]`. `["When"]` is removed: in a MathJSON document it is now an
unknown operator, which does not evaluate. Write `["If", condition, expr]`
instead (the operands are in the other order).

#### A Restriction of a Collection

When `expr` is a list and `condition` is a single condition, the whole list
is the value: the result is the list when the condition is `True`, and
`Missing` when it is `False`.

```json example
["If", "True", ["List", 10, 20, 30]]
// ➔ ["List", 10, 20, 30]

["If", "False", ["List", 10, 20, 30]]
// ➔ "Missing"
```

An operation that applies to each element of the list applies to the whole
restricted list: the condition stays on the outside. With `t` free,
`\sin([1,2,3]\{0<t\})` evaluates to
`["If", ["Less", 0, "t"], ["List", ["Sin", 1], ["Sin", 2], ["Sin", 3]]]`,
which presents as a list of three elements. When `t` is `-1`, it evaluates to
`Missing`, as `[1,2,3]\{0<t\}` and `2[1,2,3]\{0<t\}` do. `Length` of a false
restricted list is `Missing` too. `First` of a false restricted list of points
is the point `(NaN, NaN)`, while the restricted list itself is `Missing`.

When `condition` is a **list of conditions** (a mask), `expr` is paired with
the conditions position by position, and the result is a list with one cell
for each pair. A cell is the element when its condition is `True`. When its
condition is `False`, the cell is `NaN` for a number, and a point whose
coordinates are `NaN` for a point.

```json example
["If", ["List", "True", "False", "True"], ["List", 10, 20, 30]]
// ➔ ["List", 10, "NaN", 30]

["If", ["List", "True", "False"], ["List", ["Tuple", 1, 2], ["Tuple", 3, 4]]]
// ➔ ["List", ["Tuple", 1, 2], ["Tuple", "NaN", "NaN"]]
```

The list of conditions is usually a comparison over the list itself. With
the restriction-brace syntax:

<Latex value="\lbrack 10, 20, 30 \rbrack\{\lbrack 10, 20, 30 \rbrack > 15\}"/>

```json example
["If", ["Greater", ["List", 10, 20, 30], 15], ["List", 10, 20, 30]]
// ➔ ["List", "NaN", 20, 30]
```

The result keeps the positions of the elements: a masked element is not
removed. To remove the elements that do not satisfy a condition, use
[`Filter`](/compute-engine/reference/collections/#filter).

**What is paired.** An ordered collection of numbers or points is paired
element by element: a list, a vector, a range, and a lazy collection such as
a `Map` over a range. A number or a point is **one value**, repeated in each
cell: a point `["Tuple", 1, 2]` is not split into its coordinates. A matrix
(a list of lists), a set and a string are errors under a list of conditions.

```json example
["If", ["List", "True", "False"], 5]
// ➔ ["List", 5, "NaN"]

["If", ["List", "True", "False"], ["Tuple", 1, 2]]
// ➔ ["List", ["Tuple", 1, 2], ["Tuple", "NaN", "NaN"]]
```

**Different lengths.** When the types give both lengths and they differ, the
restriction is an `incompatible-dimensions` error, as for `["Add"]`. When a
length is known only from the value, the result has the length of the shorter
of the two operands.

```json example
["If", ["List", "True", "False"], ["List", 10, 20, 30]]
// ➔ Error("incompatible-dimensions", "2 vs 3")
```

**A collection that is infinite or of unknown length.** The collection is
paired with the conditions over the length of the list of conditions. Only
the elements that are necessary are read.

```json example
["If", ["List", "True", "False", "True"], ["Range", 1, "PositiveInfinity"]]
// ➔ ["List", 1, "NaN", 3]
```

**Elements that cannot be read yet.** If the elements of the collection
cannot be computed, the restriction stays unevaluated. This is the case for
a range with a bound that has no value, and for a symbol that is declared as
a list and has no value. The restriction evaluates when the elements can be
read.

```json example
["If", ["List", "True", "False"], ["Range", 1, "n"]]
// ➔ ["If", ["List", "True", "False"], ["Range", 1, "n"]]
// After n is assigned the value 5:
// ➔ ["List", 1, "NaN"]
```

**A condition that cannot be determined.** A cell whose condition cannot be
determined stays a restriction of that one element. The other cells are
evaluated.

```json example
["If", ["List", "True", ["Less", 0, "t"]], ["List", 10, 20]]
// ➔ ["List", 10, ["If", ["Less", 0, "t"], 20]]
```

**Types.** The type of a restriction with a list of conditions is a list of
the element type, found from the types of the operands: `list<number>` for
numbers, because a masked number is `NaN`, and `list<tuple<number, number>>`
for points, because a masked point is a point of `NaN` coordinates.

A symbol whose declared type admits both one value and a list of values,
such as `tuple<number, number> | list<tuple<number, number>>` (a point or a
list of points), is paired according to the value it holds: a point is one
value, and a list of points is paired element by element.

When compiled, a restriction with one condition emits a ternary whose masked
branch is the absent value of the value's domain: `(cond ? e : NaN)` for a
number, on every target. On JavaScript, a restriction with a list of
conditions gives `NaN` for a masked number and `[NaN, NaN]` for a masked
point: with `V` equal to `[-1, 2]`,
`["If", ["Greater", "V", 0], ["Tuple", 1, 2]]` runs to
`[[NaN, NaN], [1, 2]]`.

<nav className="hidden">
### Match
</nav>

<FunctionDefinition name="Match">

<Signature name="Match">_subject_, _case-1_, ..._case-n_</Signature>

Structural pattern matching: the value of the `["Match"]` expression is the
value of the first case whose pattern matches the structure of `subject`
(and whose guard, if any, is `True`).

Each case is a `["MatchCase"]` expression:

- `["MatchCase", pattern, body]`
- `["MatchCase", pattern, guard, body]`

The `pattern` uses the same wildcards as
[patterns and rules](/compute-engine/guides/patterns-and-rules/): `"_n"`
captures one value, `"__n"` a sequence, `"___n"` an optional sequence, and
`"_"` matches anything without capturing. The `guard` and `body` reference
captures by their **bare name** (`"n"` for `"_n"`).

```json example
["Match", ["List", 3, 4],
  ["MatchCase", ["List", "_a", "_b"], ["Add", "a", "b"]]
]
// ➔ 7
```

Unlike `["Which"]`, which evaluates boolean conditions and stays unevaluated
while a condition cannot be decided, `["Match"]` inspects the **structure**
of the subject and always selects a case: a symbolic subject that is not
structurally equal to a pattern falls through to the next case.

```json example
["Match", "x",
  ["MatchCase", 0, "'zero'"],
  ["MatchCase", "_", "'other'"]
]
// ➔ "other" — x could be 0 semantically, but is not structurally 0
```

In Epsil, the wildcard case may also be spelled `otherwise`:
`match x { 0 => "zero"; otherwise => "other" }`. It is a contextual synonym
for a bare `_` pattern — it lowers to the same `"_"` node, may take a guard
(`otherwise if c => …`), and binds nothing. Only the whole-pattern spelling
is special: inside a structured pattern, `otherwise` is an ordinary
identifier (and therefore a capture).

A guard must evaluate to `True` for the case to be selected; `False` or an
undecidable guard falls through to the next case:

```json example
["Match", 5,
  ["MatchCase", "_n", ["Greater", "n", 0], "'positive'"],
  ["MatchCase", "_", "'other'"]
]
// ➔ "positive"
```

Two auxiliary heads may appear inside a pattern:

- `["Pin", expr]` matches the **value** of `expr`, evaluated when the match
  is performed, rather than its structure. Use it to match against a
  constant (`["Pin", "Pi"]`) or the current value of a variable.
- `["Alternatives", p-1, ..., p-n]`, as a case's pattern, matches if any
  alternative matches. The alternatives share the case's guard and body and
  must not contain named captures.

```json example
["Match", 2,
  ["MatchCase", ["Alternatives", 1, 2, 3], "'small'"],
  ["MatchCase", ["Pin", "Pi"], "'pi'"],
  ["MatchCase", "_", "'big'"]
]
// ➔ "small"
```

**Range patterns**. A two-operand `["Range", lo, hi]` at the **top level** of a
case's pattern — or of one of its `["Alternatives"]` — is an **inclusive
numeric membership test** rather than a structure to match: the case is
selected if the subject is a real number between _lo_ and _hi_.

```json example
["Match", 5,
  ["MatchCase", ["Range", 1, 10], "'in range'"],
  ["MatchCase", "_", "'out of range'"]
]
// ➔ "in range"
```

Both endpoints are included, and the endpoint comparisons use the engine's
tolerance. The bounds must be numeric literals; `Infinity` and `-Infinity`
are allowed, so `["Range", 0, {"num": "+Infinity"}]` means "any non-negative
number". A `Range` that is not a well-formed range pattern — a symbolic bound,
or a third _step_ operand — is not a membership test and keeps its ordinary
structural meaning. (In Epsil, those spellings are reported as parse
diagnostics instead.)

A subject that is not a number falls through: a symbol (including a constant
such as `"Pi"`, which is not a *literal*), an operator expression, a string, a
collection, a complex number, and `NaN` all fail a range case.

```json example
["Match", "Pi",
  ["MatchCase", ["Range", 1, 10], "'in range'"],
  ["MatchCase", "_", "'not a number literal'"]
]
// ➔ "not a number literal"
```

The consequence is that a literal `Range` **value** can no longer be matched
*structurally* at the top level of a pattern. To compare a subject against a
`Range` value, use a pin — `["Pin", ["Range", 1, 10]]`, which compares values
and is not re-read as a membership test. A `Range` nested inside a `List`,
`Tuple` or `Dictionary` pattern also keeps its ordinary structural meaning.

In Epsil, a range pattern is written `lo..hi`:
`match n { 0..9 => "digit"; _ => "more" }`.

**Error subjects**. `["Match"]` also decides when the subject is an
[error](/compute-engine/reference/core/#error) — it is the construct for
rescuing a failed computation. Matching stays total, but an error is never
handed to a pattern that would pretend the failure has a shape: literal,
range, pin, and structural cases all fail against an error subject, and it
falls through to `"_"` or to a capture.

```json example
["Match", ["Ln", "'a'"],
  ["MatchCase", 0, "'zero'"],
  ["MatchCase", ["List", "_a"], "'a list'"],
  ["MatchCase", "_", "'rescued'"]
]
// ➔ "rescued"
```

An explicit `["Error", ...]` pattern is the exception: it destructures the
error, binding its payload. This is the idiomatic rescue:

```json example
["Match", ["Ln", "'a'"],
  ["MatchCase", ["Error", "_code"], "code"],
  ["MatchCase", "_", "'no error'"]
]
// ➔ ["ErrorCode", "'incompatible-type'", "'number'", "'string'"]
```

A guard can inspect the subject with
[`IsError`](/compute-engine/reference/core/#iserror) or
[`Type`](/compute-engine/reference/core/#type):

```json example
["Match", ["Ln", "'a'"],
  ["MatchCase", "_v", ["IsError", "v"], "'failed'"],
  ["MatchCase", "_", "'ok'"]
]
// ➔ "failed"
```

The `["ErrorTrace"]` breadcrumb a bubbled error carries is stripped before
matching, so a pattern only ever sees the error's code and context.

If no case matches, the value of the expression is
`["Error", "'match-no-case'", subject]` — an ordinary error value.

Matches over constant cases are dispatched in constant time, and fixed-shape
`List`/`Tuple`/`Dictionary` patterns are matched without invoking the
general pattern matcher. When compiled to JavaScript, constant cases emit a
comparison chain or a `switch` statement, and fixed-shape destructuring is
supported; symbolic patterns (such as `["Add", "_a", 1]`) cannot be
compiled and fail with an error rather than producing incorrect code.

In Epsil, `["Match"]` is written with the `match` keyword:
`match x { 0 => "zero"; 1 | 2 | == Pi => "small or pi"; _ => "other" }`.

</FunctionDefinition>

## Loops

<FunctionDefinition name="Loop">

<Signature name="Loop">_body_</Signature>

Repeatedly evaluate `body` until the value of `body` is a `["Break"]` expression,
or a `["Return"]` expression.

- `["Break"]` exits the loop immediately. The value of the `["Loop"]` expression
  is the value of the `["Break"]` expression.
- `["Return"]` exits the loop and returns the value of the `["Return"]`
  expression.

To exit the loop, a `["Break"]` or `["Return"]` expression must be evaluated.

`Loop` with only a _body_ argument is equivalent to a `while(true)` in
JavaScript or a `While[True, ...]` in Mathematica.

<Signature name="Loop">_body_, _element-1_, _element-2_, ...</Signature>

Iterates over one or more `["Element", _name_, _collection_]` clauses,
evaluating `body` once per combination, **for effect**. The value of the
`["Loop"]` expression is `Nothing` — unlike `Comprehension` (see below),
`Loop` does not accumulate or return a list of results.

Bindings are evaluated as nested loops, outermost = first `Element` clause.
Later clauses see earlier bindings in scope, so a clause's collection can
depend on a name bound by an earlier clause (dependent collections work).

```json example
["Loop", ["Print", ["Square", "_"]], ["Element", "_", ["Range", 5]]]
// ➔ 1 4 9 16 25 (printed); the Loop expression evaluates to Nothing
```

`Loop` with a `body` and a single `Element` clause is equivalent to a
`forEach()` in JavaScript. It is somewhat similar to a `Do[...]` in
Mathematica.

Inside `body`:

- `["Break"]`, optionally with a value, exits the loop immediately. The
  value of the `["Loop"]` expression is the value of `Break`, or `Nothing`
  if none was provided.
- `["Continue"]` skips to the next iteration.
- `["Return"]` exits the loop and propagates out of the enclosing
  `["Function"]` expression.

Bound names do not leak into the enclosing scope.

A name that the body assigns must be declared with a value before the loop.
The first assignment of a name in the body is the error
`first-assignment-in-branch`. End the enclosing block with the name to use the
result:

```json example
["Block",
  ["Assign", "s", 0],
  ["Loop", ["Assign", "s", ["Add", "s", "i"]], ["Element", "i", ["Range", 1, 4]]],
  "s"]
// ➔ 10
```

<ReadMore path="/compute-engine/reference/collections/#comprehension" >
To build a **list** from a per-combination computation, use
**`Comprehension`** instead (or **`Map`** / **`Filter`** for the
single-collection case).<Icon name="chevron-right-bold" />
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="FixedPoint">

<Signature name="FixedPoint">_body_, _initial-value_</Signature>

<Signature name="FixedPoint">_body_, _initial-value_,
_max-iterations_</Signature>

Assumes `body` is an expression using an implicit argument `_`.

Apply `body` to `initial-value`, then apply `body` to the result until the result
no longer changes.

To determine if a fixed point has been reached and the loop should terminate,
the previous and current values are compared with `Equal`.

Inside `body`, use a `["Break"]` expression to exit the loop immediately or
`Return` to exit the enclosing `["Function"]` expression.

<ReadMore path="/compute-engine/reference/collections/#reduce" >
See also the **`Reduce` function** which operates on a collection 
</ReadMore>

</FunctionDefinition>

<ReadMore path="/compute-engine/reference/statistics/">
Read more about the `Product` and `Sum` functions which are specialized version of loops.
</ReadMore>

<ReadMore path="/compute-engine/reference/collections/" >
Read more about operations on collection such as `Map` and `Reduce` which are functional
programming constructs that can be used to replace loops.
</ReadMore>

## LaTeX Syntax for Control Structures

Control structures are expressed in LaTeX using keywords. Each keyword can be
written three equivalent ways, which may be mixed freely:

- **`\keyword{if}`** — the preferred form: stays in math mode and renders with
  symmetric keyword spacing.
- **`\text{if}`** — the conventional form.
- **`\operatorname{if}`** (or `\mathrm{if}`) — operator-name spelling.

Multi-word keywords are a single token, e.g. `\keyword{for all}`. (`\keyword{...}`
requires the rendering environment to define the `\keyword` command; `\text{...}`
and `\operatorname{...}` render everywhere.)

### Inline `If`

```latex
\keyword{if} x > 0 \keyword{then} x \keyword{else} -x
```

Parses to `["If", ["Greater", "x", 0], "x", ["Negate", "x"]]`.

The `else` branch is optional.

### `where` Bindings

```latex
x^2 + y^2 \keyword{where} x \coloneq 3,\; y \coloneq 4
```

Parses to a `["Block"]` with variable declarations, assignments, and the body
expression as the return value.

### `for` Loops

```latex
\keyword{for} i \keyword{from} 1 \keyword{to} 10 \keyword{do} i^2
```

Parses to `["Loop", ["Power", "i", 2], ["Element", "i", ["Range", 1, 10]]]`.

This is an imperative loop, evaluated for effect: its value is `Nothing`.

### `for` Comprehensions

A trailing `for` clause produces a list comprehension:

```latex
(x, y) \keyword{for} x = [1...3], y = [1...x]
```

Parses to:

```json
["Comprehension",
  ["Tuple", "x", "y"],
  ["Element", "x", ["Range", 1, 3]],
  ["Element", "y", ["Range", 1, "x"]]]
```

The trailing `for` keyword binds looser than `,` and `=`, so the body
expression (`(x, y)` above) is parsed before the keyword fires, and the
bindings are parsed as comma-separated `name = expr` pairs after it.

Multiple bindings produce a Cartesian product (or a dependency-shaped
iteration when later bindings reference earlier ones). See the
`Comprehension` definition in the
[**Collections**](/compute-engine/reference/collections/#comprehension)
reference for full semantics.

### Restriction Braces

A trailing `\{cond\}` after an expression masks the value by a predicate:

```latex
f(x)\left\{0 < x < 2\right\}
```

Parses to `["If", ["Less", 0, "x", 2], ["f", "x"]]`, a
[restriction](#restriction).

When the condition is `True`, the expression evaluates to its left operand;
when `False`, it evaluates to the absent value (`NaN` for a number,
a point of `NaN` coordinates for a point, `Missing` otherwise). This is distinct from a set literal (standalone
`\{1, 2, 3\}` continues to parse as a `Set`); the disambiguation is
positional: trailing braces after a complete expression are a restriction.

Stacked restrictions merge into one condition, in the order written:

```latex
x\left\{x > 0\right\}\left\{x < 10\right\}
```

Parses to `["If", ["And", ["Less", 0, "x"], ["Less", "x", 10]], "x"]`.
The serializer writes a restriction with `where`, never with braces:
`x\text{ where }0\lt x, x\lt10`, which parses back to the same expression.

### Semicolon Blocks

Semicolons (`;` or `\;`) act as statement separators to build `Block`
expressions:

```latex
x \coloneq 3; x^2 + 1
```

Parses to `["Block", ["Declare", "x", "'unknown'", 3], ["Add", ["Power", "x", 2], 1]]`.
The first assignment of a name is its declaration, with a value.

<ReadMore path="/compute-engine/guides/compiling/" >
Read more about **compiling** control structures to JavaScript.
</ReadMore>

## Controlling the Flow of Execution

**To exit a function**, use `Return`.

**To control the flow of a loop expression**, use `Break` and `Continue`.

<FunctionDefinition name="Return">

<Signature name="Return">_value_</Signature>

Interrupts the evaluation of a `["Function"]` expression. The value of the
`["Function"]` expression is `value`.

The `["Return"]` expression is useful when used with functions that have
multiple exit points, conditional logic, loops, etc...

Here's a contrived example of a function that returns the sign of a number:

```json example
[
  "Function",
  [
    "Block",
    ["If", ["Greater", "x", 0], ["Return", 1]],
    ["If", ["Less", "x", 0], ["Return", -1]],
    0
  ],
  "x"
]
```

<ReadMore path="/compute-engine/reference/functions/" >
Read more about **functions**. 
</ReadMore>

</FunctionDefinition>

<FunctionDefinition name="Break">

<Signature name="Break"></Signature>

<Signature name="Break">_value_</Signature>

`Break` is a registered operator. When in a loop, exit the loop immediately.
The value of the enclosing `["Loop"]` expression becomes `value`, or
`Nothing` if not provided.

Outside a loop, `Break` is inert.

</FunctionDefinition>

<FunctionDefinition name="Continue">

<Signature name="Continue"></Signature>

`Continue` is a registered operator. When in a loop, skip to the next
iteration of the loop. `Continue` takes no argument.

Outside a loop, `Continue` is inert.

</FunctionDefinition>
