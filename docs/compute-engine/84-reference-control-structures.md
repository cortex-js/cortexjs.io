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
- **Conditional** `If` or `Which`, where expressions are evaluated depending on
  the value of a condition
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
`expr-n`.

If one of the expression in the block is a `["Return"]` expression, a
`["Break"]` expression or a `["Continue"]` expression, no more expressions are
evaluated and the value of the `["Block"]` is this expression.

`["Block"]` expressions can be nested as necessary. Scoping is lexical: a
nested scope — an inner `["Block"]`, an `["If"]` branch, or a `["Loop"]`
body — can read the enclosing block's variables, and assigning to a variable
declared in an enclosing block updates that binding. A `["Declare"]` in the
inner block instead introduces a new variable that shadows the outer one for
the duration of the inner block.

```json example
["Block", ["Assign", "c", 5], ["Multiply", "c", 2]]


// ➔ 10
```

```json example
["Block",
  ["Declare", "counter", "integer"],
  ["Assign", "counter", 0],
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
expression is `expr-1`, otherwise `Nothing`.

<Signature name="If">_condition_, _expr-1_, _expr-2_</Signature>

If the value of `condition` is the symbol `True`, the value of the `["If"]`
expression is `expr-1`, otherwise `expr-2`.

Here's an example of a function that returns the absolute value of a number:

```json example
["Function", ["If", ["Greater", "n", 0], "n", ["Negate", "n"]], "n"]
```

`["If"]` expressions can be nested as necessary.

</FunctionDefinition>

<FunctionDefinition name="Which">

<Signature name="Which">_condition-1_, _expr-1_, ..._condition-n_,
_expr-n_</Signature>

The value of the `["Which"]` expression is the value of the first expression
`expr-n` for which the corresponding condition `condition-n` is `True`.

<Latex value="\begin{cases} x &amp; \text{if } x &gt; 0 \\ -x &amp; \text{if } x &lt; 0 \\ 0 &amp; \text{otherwise} \end{cases}"/>

```json example
["Block",
  ["Assign", "n", -10]
  ["Which", ["Greater", "n", 0], "n", ["Negate", "n"], "n"]
]
// ➔ 10
```

A `["Which"]` expression is equivalent to the following `["If"]` expression:

```json example
["If", ["Equal", condition-1, "True"], expr-1,
    ["If", ["Equal", condition-2, "True"], _expr-2,
    ... ["If", ["Equal", condition-n, "True"],
          expr-n,
          "Nothing"
    ]
  ]
]
```

A `["Which"]` expression is equivalent to a `switch` statement in JavaScript or
the `Which[]` function in Mathematica.

</FunctionDefinition>

<FunctionDefinition name="When">

<Signature name="When">_expr_, _condition_</Signature>

Returns the value of `expr` when `condition` evaluates to `True`, and
`Undefined` when `condition` evaluates to `False`. When `condition` cannot
be determined, the expression holds unevaluated.

`["When"]` is the AST head produced by **restriction-brace** syntax:
`expr\{cond\}` parses to `["When", expr, cond]`. It is also useful directly
for masking values where a predicate does not hold. The braces may be
separated from the base expression by spacing commands
(`(1-t)^2(1+2t)\ \{t\ge0\}\{t\le1\}` attaches both restrictions).

```json example
["When", ["Square", "x"], ["Greater", "x", 0]]
// Evaluates to x^2 when x > 0, Undefined otherwise.
```

**Stacked restrictions canonicalize** to a single `When` with an `And`
predicate:

```json example
["When", ["When", "x", ["Greater", "x", 0]], ["Less", "x", 10]]
// Canonicalizes to:
["When", "x", ["And", ["Greater", "x", 0], ["Less", "x", 10]]]
```

Downstream simplification, interval intersection, and compilation operate on
the canonical form, so source variants (stacked braces or a single brace
with `\wedge`) are interchangeable.

When compiled to JavaScript or GLSL, `When(e, cond)` emits a ternary
`(cond ? e : NaN)`. This makes `When` suitable for plot-domain masking.

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

Parses to `["When", ["f", "x"], ["Less", 0, "x", 2]]`.

When the condition is `True`, the expression evaluates to its left operand;
when `False`, it evaluates to `Undefined`. This is distinct from a set
literal (standalone `\{1, 2, 3\}` continues to parse as a `Set`); the
disambiguation is positional — trailing braces after a complete expression
attach as a `When` restriction.

Stacked restrictions chain and canonicalize:

```latex
x\left\{x > 0\right\}\left\{x < 10\right\}
```

Parses to `["When", "x", ["And", ["Greater", "x", 0], ["Less", "x", 10]]]`.
The serializer round-trips this canonical form back to stacked braces.

### Semicolon Blocks

Semicolons (`;` or `\;`) act as statement separators to build `Block`
expressions:

```latex
x \coloneq 3;\; x^2 + 1
```

Parses to `["Block", ["Declare", "x"], ["Assign", "x", 3], ["Add", ["Power", "x", 2], 1]]`.

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

