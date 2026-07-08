---
title: Parsing and Serializing LaTeX
sidebar_label: LaTeX Syntax
slug: /compute-engine/guides/latex-syntax/
date: Last Modified
---

<Intro>
The Compute Engine manipulates MathJSON expressions. It can also convert LaTeX strings to
MathJSON expressions (**parsing**) and output MathJSON expressions as LaTeX
string (**serializing**)
</Intro>

:::info[Note]
In this documentation, functions such as `ce.expr()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by a `ce.` prefix.<br/>Functions that
apply to an expression, such as `expr.simplify()` are denoted with an
`expr.` prefix.
:::

**To create a new instance of the Compute Engine**, use the
`new ComputeEngine()` constructor. When using the full package, LaTeX support
is included automatically.

```javascript
import { ComputeEngine } from '@cortex-js/compute-engine';
const ce = new ComputeEngine();
```

If you are using only the `core` sub-path, inject a `LatexSyntax` instance to
enable LaTeX parsing and serialization:

```javascript
import { ComputeEngine } from '@cortex-js/compute-engine/core';
import { LatexSyntax } from '@cortex-js/compute-engine/latex-syntax';

const ce = new ComputeEngine({ latexSyntax: new LatexSyntax() });
```

Without a `LatexSyntax`, calling `ce.parse()`, `.latex`, or `.toLatex()` will
throw an error. MathJSON operations (`ce.expr()`, `.json`, `.evaluate()`, etc.)
work without it.

<hr/>

**To input math using an interactive mathfield**, use the [Mathfield](/mathfield/) library.

A `<math-field>` DOM element works like a `<textarea>` in HTML, but for
math. It provides its content as a LaTeX string, ready to be used with the 
Compute Engine.

<ReadMore path="/mathfield/" >
  Read more about the **mathfield element**<Icon name="chevron-right-bold" />
</ReadMore>

All the mathfields on the page share a Compute Engine instance, which is
available as `MathfieldElement.computeEngine`.

```javascript
const ce = MathfieldElement.computeEngine;
```

You can associate a customized compute engine with the mathfields in the
document:

```js
const ce = new ComputeEngine();
MathfieldElement.computeEngine = ce;
const mf = document.querySelector("math-field");
console.log(mf.expression.json);
```

<hr/>

**To parse a LaTeX string as a MathJSON expression**, call the `ce.parse()`
function.

```javascript
console.log(ce.parse("5x + 1").json);
// ➔  ["Add", ["Multiply", 5, "x"], 1]
```

By default, `ce.parse()` returns a
[canonical expression](/compute-engine/guides/canonical-form/). To get a
non-canonical expression instead, use the `{form: 'raw'}` option: The
non-canonical form is closer to the literal LaTeX input.

```js
ce.parse("\\frac{7}{-4}").json;
// ➔  ["Rational", -7, 4]

ce.parse("\\frac{7}{-4}", { form: 'raw' }).json;
// ➔  ["Divide", 7, -4]
```

## The Compute Engine Natural Parser

Unlike a programming language, mathematical notation is surprisingly ambiguous
and full of idiosyncrasies. Mathematicians frequently invent new notations, or
have their own preferences to represent even common concepts.


The Compute Engine Natural Parser interprets expressions using the notation you
are already familiar with. Write as you would on a blackboard, and get back a
semantic representation as an expression ready to be processed.

| LaTeX | MathJSON      |
| :--- | :--- |
| <big>$$ \sin 3t + \cos 2t $$ </big><br/>`\sin 3t + \cos 2t`     | `["Add", ["Sin", ["Multiply", 3, "t"]], ["Cos", ["Multiply", 2, "t"]]]` |
| <big>$$ \int \frac{dx}{x} $$</big><br/>`\int \frac{dx}{x}`     | `["Integrate", ["Divide", 1, "x"], "x"]`                                |
| <big>$$ 123.4(567) $$ </big><br/>`123.4(567)` | `123.4(567)`   |
| <big>$$ 123.4\overline{567} $$ </big><br/>`123.4\overline{567}` | `123.4(567)`  |
| <big>$$ \vert a+\vert b\vert+c\vert $$ </big><br/>`\|a+\|b\|+c\| `   | `["Abs", ["Add", "a", ["Abs", "b"], "c"]]` |
| <big>$$ \vert\vert a\vert\vert+\vert b\vert $$ </big><br/>`\|\|a\|\|+\|b\|`   | `["Add", ["Norm", "a"], ["Abs", "b"]]` |

The Compute Engine Natural Parser will apply maximum effort to parse the input
string as LaTeX, even if it includes errors. If errors are encountered, the
resulting expression will have its `expr.isValid` property set to `false`. An
`["Error"]` expression will be produced where a problem was encountered. To get
the list of all the errors in an expression, use `expr.errors` which will return
an array of `["Error"]` expressions.

Common LaTeX variations are also accepted even when not strictly necessary. For
example, a one-sided delimiter group written with a TeX *null delimiter* —
`\sin\left(x\right.` — parses the same as a closed `\sin\left(x\right)` group.

<ReadMore path="/compute-engine/guides/expressions/#errors" > 
Read more about the **errors** that can be returned. <Icon name="chevron-right-bold" />
</ReadMore>

### Geometry Notation

Geometry commands parse to **inert structural heads**: they capture the notation
without prescribing a computation, so they evaluate to themselves.

| LaTeX | MathJSON |
| :--- | :--- |
| `AB \parallel CD` | `["Parallel", ["Multiply", "A", "B"], ["Multiply", "C", "D"]]` |
| `AB \perp CD`     | `["Perpendicular", ["Multiply", "A", "B"], ["Multiply", "C", "D"]]` |
| `\angle ABC`      | `["Angle", "A", "B", "C"]` |
| `\varangle ABC`   | `["Angle", "A", "B", "C"]` |
| `\triangle ABC`   | `["Triangle", "A", "B", "C"]` |
| `\operatorname{polygon}(A, B, \ldots)` | `["Polygon", "A", "B", …]` |
| `\widehat{AB}`    | `["Arc", "A", "B"]` |

### Notation Changes

Two parsing rules changed recently and may affect existing input:

- **`\parallel`** is now the geometric relation `Parallel` (as shown above),
  consistent with `\perp` → `Perpendicular`. For logical disjunction, use `\lor`
  or `\vee`, which parse to `Or` (unchanged).
- **`\rightarrow`** is now the mapping arrow `To` (matching `\to`), so
  `f: \mathbb{R} \rightarrow \mathbb{R}` reads as a function signature. For
  logical implication, use `\Rightarrow`, `\implies` or `\Longrightarrow`, which
  parse to `Implies` (unchanged).

```javascript
ce.parse("x \\rightarrow y").json;
// ➔ ["To", "x", "y"]

ce.parse("P \\implies Q").json;
// ➔ ["Implies", "P", "Q"]
```

## Serializing to LaTeX

**To serialize an expression to a LaTeX string**, read the `expr.latex`
property.

```javascript
console.log(ce.expr(["Add", ["Power", "x", 3], 2]).latex);
// ➔  "x^3 + 2"
```

## Control Structure Keywords

The Compute Engine parser recognizes a set of keywords (`if`, `then`, `else`,
`for`, `where`, `and`, `or`, `for all`, …) that express control structures and
logic in LaTeX.

Each keyword can be written three equivalent ways:

- **`\keyword{if}`** — the preferred form. It keeps the input in math mode and
  renders with the symmetric spacing expected of a keyword.
- **`\text{if}`** — the conventional form. It switches to text mode, which is
  awkward to enter inside a formula.
- **`\operatorname{if}`** (or `\mathrm{if}`) — the operator-name spelling, with
  the tighter spacing used for function names.

All three parse to the same expression and may be mixed freely. Multi-word
keywords are written as a single token, e.g. `\keyword{for all}` or
`\keyword{such that}`.

:::info[Note]
`\keyword{...}` requires the rendering environment (such as MathLive) to define
the `\keyword` command. `\text{...}` and `\operatorname{...}` render everywhere.
All three are always accepted on input.
:::

### Inline Conditionals

Use the `if`, `then`, and `else` keywords:

```live
console.log(ce.parse("\\keyword{if} x > 0 \\keyword{then} x \\keyword{else} -x").json);
// ➔ ["If", ["Greater", "x", 0], "x", ["Negate", "x"]]
```

The `else` branch is optional. When omitted, the result is `Nothing` if the
condition is false.

### Local Bindings with `where`

The `where` keyword binds variables to values in an expression:

```live
console.log(ce.parse("a + b \\keyword{where} a \\coloneq 1,\\; b \\coloneq 2").json);
// ➔ ["Block", ["Declare", "a"], ["Assign", "a", 1],
//             ["Declare", "b"], ["Assign", "b", 2],
//             ["Add", "a", "b"]]
```

### Loops

Use the `for`, `from`, `to`, and `do` keywords:

```live
console.log(ce.parse("\\keyword{for} i \\keyword{from} 1 \\keyword{to} 10 \\keyword{do} i^2").json);
// ➔ ["Loop", ["Power", "i", 2], ["Element", "i", ["Range", 1, 10]]]
```

### Semicolon Blocks

Semicolons separate statements in a block. When any statement is an assignment,
the result is wrapped in a `Block` with automatic variable declarations:

```live
console.log(ce.parse("x \\coloneq 3;\\; x^2 + 1").json);
// ➔ ["Block", ["Declare", "x"], ["Assign", "x", 3],
//             ["Add", ["Power", "x", 2], 1]]
```

<ReadMore path="/compute-engine/reference/control-structures/" >
Read more about the **control structure** operators.
</ReadMore>

## Alternate Syntax

The parser accepts several alternate forms in addition to the preferred LaTeX
constructs documented above. They cover dot-style component access,
restriction predicates, list-range ellipsis, and trailing for-comprehensions.

Each alternate form lowers to an existing AST head — the parser absorbs the
syntactic variation; downstream evaluation, simplification, and compilation
operate on a single shape.

### Component Access

Use `.` to extract a component of a tuple, a member of a list, or a property
of a complex number. The accepted member names map to existing semantic
heads at parse time (no generic accessor head is introduced).

```live
console.log(ce.parse("p.x").json);
// ➔ ["First", "p"]

console.log(ce.parse("L.\\operatorname{count}").json);
// ➔ ["Length", "L"]

console.log(ce.parse("z.\\operatorname{re}").json);
// ➔ ["Real", "z"]
```

Recognized members: `x`, `y`, `z` (→ `First`, `Second`, `Third`); `real`,
`re` (→ `Real`); `imag`, `im` (→ `Imaginary`); `count` (→ `Length`);
`total` (→ `Sum`); `max` (→ `Max`); `min` (→ `Min`).

Two surface forms are accepted: bare-letter (`p.x`) and operator-name
(`L.\operatorname{count}` or `L.\max`). `\mathrm{...}` is not accepted as
a member name.

Component access composes with chained access, function calls, and other
postfix operators:

```live
console.log(ce.parse("p.x.\\operatorname{real}").json);
// ➔ ["Real", ["First", "p"]]
```

**Disambiguation from decimal points.** After an integer or a complete
decimal, a `.` followed by a letter or `\operatorname{...}` is component
access, not a decimal continuation:

```live
console.log(ce.parse("1.x").json);
// ➔ ["First", 1]

console.log(ce.parse("1.5.x").json);
// ➔ ["First", 1.5]
```

`First(1)` is a legal AST shape — evaluation produces an `Error` expression
since `1` is not a collection.

#### Round-tripping with `dotNotation`

By default the serializer emits the standard function-call form
(`\operatorname{First}(p)`). To preserve the dot-notation form in output —
useful when the source was authored with dot notation — enable the `dotNotation`
serialization option:

```ts
const ce = new ComputeEngine();
ce.latexOptions = { dotNotation: true };

ce.parse('p.x').toLatex();           // ➔ "p.x"
ce.parse('L.\\operatorname{count}').toLatex(); // ➔ "L.\\operatorname{count}"
```

Per-call override is also supported:

```ts
ce.expr(['First', 'p']).toLatex({ dotNotation: true }); // ➔ "p.x"
```

Multi-operand forms (e.g. `Sum` with an index range) are never emitted as dot
notation — only arity-1 forms are affected.

### Restriction Braces

Trailing `\{cond\}` after an expression masks the value by a predicate. This
parses to the `["When", expr, cond]` head:

```live
console.log(ce.parse("f(x)\\left\\{0 < x < 2\\right\\}").json);
// ➔ ["When", ["f", "x"], ["Less", 0, "x", 2]]
```

When `cond` evaluates to `True`, the expression evaluates to its left
operand; when `False`, to `Undefined`. Indeterminate predicates hold.

Stacked restrictions chain and canonicalize to a single `When` with an
`And` predicate:

```live
console.log(ce.parse("x\\left\\{x>0\\right\\}\\left\\{x<10\\right\\}").json);
// ➔ ["When", "x", ["And", ["Greater", "x", 0], ["Less", "x", 10]]]
```

Standalone `\{1, 2, 3\}` (no preceding expression) continues to parse as a
`Set` literal — the disambiguation is positional.

### List Ranges

Inside list literals, an ellipsis (`...`, `\ldots`, or `\dots`) produces
a `Range`:

```live
console.log(ce.parse("\\left[1...9\\right]").json);
// ➔ ["Range", 1, 9]

console.log(ce.parse("\\left[1, 3, \\ldots, 9\\right]").json);
// ➔ ["Range", 1, 9, 2]   (step inferred from 3 - 1 = 2)

console.log(ce.parse("\\left[0, 0.1, 0.2, \\ldots, 1\\right]").json);
// ➔ ["Range", 0, 1, 0.1]   (float step, tolerance-validated)
```

Intermediate samples are validated against the inferred step within
`ce.tolerance` — `0.1 + 0.1 ≠ 0.2` exactly but is accepted within tolerance.
Inconsistent samples produce a parse error.

Outside list literals, the ellipsis tokens continue to parse as the
`ContinuationPlaceholder` symbol.

### For-Comprehensions

A trailing `\operatorname{for}` clause produces a list comprehension —
the variadic form of `Loop`:

```live
console.log(
  ce.parse("(x, y) \\operatorname{for} x = \\left[1...2\\right], y = \\left[1...2\\right]").json
);
// ➔ ["Loop",
//      ["Tuple", "x", "y"],
//      ["Element", "x", ["Range", 1, 2]],
//      ["Element", "y", ["Range", 1, 2]]]
```

Multiple bindings iterate as nested loops. Later bindings see earlier ones
in scope, so a clause's collection can depend on a name bound by an earlier
clause:

```live
console.log(
  ce.parse("(x, y) \\operatorname{for} x = \\left[1...3\\right], y = \\left[1...x\\right]").json
);
// Evaluating this Loop produces 6 tuples: (1,1), (2,1), (2,2), (3,1), (3,2), (3,3)
```

`\operatorname{for}` binds looser than `,` and `=`, so the body expression
is parsed before the keyword fires. Bound names do not leak into the
enclosing scope.

<ReadMore path="/compute-engine/reference/control-structures/" >
Read more about the `Loop` and `When` operators in the **control structures** reference.
</ReadMore>

## Customizing Parsing

The LaTeX parsing can be customized by providing a `ParseLatexOptions` object as
the second argument to the `ce.parse()` function.

### Customizing the Parsing of Numbers

See the [Number Formatting](#number-formatting) section for details on how to
customize the parsing of numbers. Most of the same options are available for
parsing as for serialization.

### Other Parsing Options

| Key | Description |
| :--- | :--- |
| `skipSpace` | If `true`, ignore space characters in a math zone. Default is `true`. |
| `parseNumbers` | When parsing a decimal number, e.g. `3.1415`:<br/>- `"auto"` or `"decimal"`: if a decimal number, parse it as an approximate   decimal number with a whole part and a fractional part<br/> - `"rational"`: if a decimal number, parse it as an exact rational number with a numerator  and a denominator. If not a decimal number, parse it as a regular number.<br/>- `"never"`: do not parse numbers, instead return each token making up the number (minus sign, digits, decimal marker, etc...).<br/><br/> **Note**: if the number includes repeating digits (e.g. `1.33(333)`), it will be parsed as a decimal number even if this setting is `"rational"`. **Default**: `"auto"`|
| `preserveLatex` | If `true`, the expression will be decorated with the LaTeX fragments corresponding to each element of the expression. The top-level expression, that is the one returned by `parse()`, will include the verbatim LaTeX input that was parsed. The sub-expressions may contain a slightly different LaTeX, for example with consecutive spaces replaced by one, with comments removed, and with some low-level LaTeX commands replaced, for example `\egroup` and `\bgroup`. **Default:** `false` |

```js
ce.parse('x + 0.5', { parseNumbers: "rational" }).print();
// ➔ x + 1/2
```

#### `getSymbolType`

This handler is invoked when the parser encounters a symbol
that has not yet been declared.

The `symbol` argument is a [valid symbol](/math-json/#symbols).

The handler should return the type of the symbol.


```live
console.info(ce.parse("f(x)", {
  getSymbolType: (symbol) => {
    if (symbol === "f") {
      return "function";
    }
    return "unknown";
  },
}).json);
```

#### `parseUnexpectedToken`

This handler is invoked when the parser encounters a token that it does not
know how to handle.

The `lhs` argument is the previous token, if any.

The handler can access the unexpected token with `parser.peek`. If
it is a token that should be recognized, the handler can consume it
by calling `parser.nextToken()`.

The handler should return an expression or `null` if the token is not
recognized.

```live
console.info(ce.parse("3\\frac{1}{\\foo}", {
  parseUnexpectedToken: (lhs, parser) => {
    if (parser.peek === '\\foo') {
      parser.nextToken();
      return "foo";
    }
    return null;
  },
}).json);
```

## Customizing Serialization

While `expr.latex` provides a simple, default serialization to LaTeX, it may not
always be the most suitable for your needs.

**To customize the serialization to LaTeX**, use the `expr.toLatex()` method.

The argument of the `expr.toLatex()` method is a `SerializeLatexOptions` object
that can be used to customize the serialization. The keys are explained in the
sections below.

### Number Formatting

| Key | Description |
| :--- | :--- |
| `digits` | How many digits to display, and how they are counted. Use `"auto"` (round to the evaluation precision), `"max"` (all available digits), `{ significant: n }` (round to `n` significant figures), or `{ fractional: n }` (`n` digits after the decimal point). Default is `"auto"`. See [Significant Figures and Decimal Places](#significant-figures-and-decimal-places) below. |
| `fractionalDigits` | **Deprecated — use `digits` instead.** The number of decimal places to use when formatting numbers. Use `"max"` to include all available digits and `"auto"` to use the same precision as for evaluation. Default is `"auto"`. A numeric value `n` is equivalent to `digits: { fractional: n }`. If both `digits` and `fractionalDigits` are provided, `digits` takes precedence. |
| `notation` | The notation to use for numbers. Use `"auto"`, `"scientific"`, `"engineering"`, or `"adaptiveScientific"`. The `"adaptiveScientific"` mode uses scientific notation but avoids exponents within the range specified by `avoidExponentsInRange`. Default is `"auto"`. |
| `avoidExponentsInRange` | A tuple of two values representing a range of exponents. If the exponent for the number is within this range, a decimal notation is used. Otherwise, the number is displayed with an exponent. Default is `[-6, 20]`. |
| `digitGroupSeparator` | The LaTeX string used to separate groups of digits, for example thousands. Default is `"\,"`. To turn off group separators, set to `""`. If a string tuple is provided, the first string is used to group digits in the whole part and the second string to group digits in the fractional part. |
| `digitGroupSize` | The number of digits in a group. If set to `"lakh"` the digits are in groups of 2, except for the last group which has 3 digits. If a tuple is provided, the first element is used for the whole part and the second element for the fractional part. Default is `3`. |
| `exponentProduct` | A LaTeX string inserted before an exponent, if necessary. Default is `"\cdot"`. |
| `beginExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"10^{"`. |
| `endExponentMarker` | A LaTeX string used as template to format an exponent. Default value is `"}"`. |
| `truncationMarker` | A LaTeX string used to indicate that a number has more precision than what is displayed. Default is `"\ldots"`. |
| `repeatingDecimal` | The decoration around repeating digits. Valid values are `"auto"`, `"vinculum"`, `"dots"`, `"parentheses"`,  `"arc"` and `"none"`. Default is `"auto"`. |

#### Notation Modes Comparison

The following table shows how different numbers are serialized with each notation mode (using default `avoidExponentsInRange` of `[-6, 20]`):

| Value | `"auto"` | `"scientific"` | `"engineering"` | `"adaptiveScientific"` |
| :---- | :------- | :------------- | :-------------- | :--------------------- |
| 0.000001234 | $0.000\,001\,234$ | $1.234 \cdot 10^{-6}$ | $1.234 \cdot 10^{-6}$ | $0.000\,001\,234$ |
| 0.0000001234 | $1.234 \cdot 10^{-7}$ | $1.234 \cdot 10^{-7}$ | $123.4 \cdot 10^{-9}$ | $1.234 \cdot 10^{-7}$ |
| 3.14159 | $3.141\,59$ | $3.141\,59 \cdot 10^{0}$ | $3.141\,59 \cdot 10^{0}$ | $3.141\,59$ |
| 1234.5 | $1\,234.5$ | $1.234\,5 \cdot 10^{3}$ | $1.234\,5 \cdot 10^{3}$ | $1\,234.5$ |
| 12345678 | $12\,345\,678$ | $1.234\,567\,8 \cdot 10^{7}$ | $12.345\,678 \cdot 10^{6}$ | $12\,345\,678$ |
| 1e21 | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ | $1 \cdot 10^{21}$ |

- **`"auto"`**: Uses decimal notation within `avoidExponentsInRange`, otherwise scientific notation. The decision is based on the number's natural string representation.
- **`"scientific"`**: Always uses scientific notation with one digit before the decimal point. Ignores `avoidExponentsInRange`.
- **`"engineering"`**: Uses scientific notation with exponents that are multiples of 3.
- **`"adaptiveScientific"`**: Normalizes to scientific notation first, then falls back to decimal if the exponent is within `avoidExponentsInRange`.

#### Difference between `"auto"` and `"adaptiveScientific"`

With the default `avoidExponentsInRange` of `[-6, 20]`, `"auto"` and `"adaptiveScientific"` produce similar results. The difference becomes apparent with a custom range.

With `avoidExponentsInRange: [-2, 2]`:

| Value | `"auto"` | `"adaptiveScientific"` |
| :---- | :------- | :--------------------- |
| 0.05 | $0.05$ | $0.05$ |
| 0.005 | $0.005$ | $5 \cdot 10^{-3}$ |
| 50 | $50$ | $50$ |
| 5000 | $5\,000$ | $5 \cdot 10^{3}$ |
| 1234.5 | $1\,234.5$ | $1.234\,5 \cdot 10^{3}$ |

The key difference: `"adaptiveScientific"` always computes the scientific notation exponent first, then decides whether to display it. `"auto"` bases its decision on how JavaScript naturally represents the number, which may not have an exponent for moderately-sized values.

```live
console.log(ce.parse("\\pi").N().toLatex({
    fractionalDigits: 6,
}));
```


```live
console.log(ce.expr(700).toLatex({
  notation: "scientific",
  avoidExponentsInRange: null,
  exponentProduct: "\\times"
}));
// ➔ "7\times10^{2}"

console.log(ce.expr(123456.789).toLatex({
  notation: "scientific",
  avoidExponentsInRange: null,
  exponentProduct: "\\times",
}));
// ➔ "1.234\,567\,89\times10^{5}"
```

### Significant Figures and Decimal Places

The `digits` option controls how many digits of a number are **displayed**. This
is a formatting choice only — it does not change the stored value or the
precision of computation.

| Value | Description |
| :--- | :--- |
| `"auto"` | Round to the engine's evaluation precision (the default). |
| `"max"` | Show all available digits, without rounding. |
| `{ significant: n }` | Round to `n` significant figures. |
| `{ fractional: n }` | Show `n` digits after the decimal point. |

```live
console.log(ce.parse("\\pi").N().toLatex({ digits: { significant: 3 } }));
// ➔ "3.14"

console.log(ce.parse("\\pi").N().toLatex({ digits: { fractional: 2 } }));
// ➔ "3.14"

console.log(ce.parse("2.71828").toLatex({ digits: { significant: 3 } }));
// ➔ "2.72"
```

A few things to note:

- **Rounding is independent of notation.** `digits` only decides which digits
  survive; whether the result is shown in fixed or scientific notation is still
  governed by `notation` and `avoidExponentsInRange`. For example, `1500` at two
  significant figures stays `1500` in fixed notation (ambiguous by convention) —
  set `notation: "scientific"` for an unambiguous `1.5 \cdot 10^{3}`.

- **`{ significant: n }` does not round exact values.** Exact integers,
  rationals, and radicals are displayed in full — only inexact (floating-point)
  values are rounded to `n` significant figures. `{ fractional: n }` applies to
  all values.

```live
console.log(ce.parse("123456").toLatex({ digits: { significant: 3 } }));
// ➔ "123\,456"  (exact integer — displayed in full, not rounded; \, is the
//                digit-group separator, rendered as a thin space)

console.log(ce.parse("\\frac{1}{3}").toLatex({ digits: { significant: 3 } }));
// ➔ "\frac{1}{3}"  (exact rational — displayed as a fraction)
```

The `digits` option is also available on `expr.toMathJson()` and (for the plain
string form) is honored by `expr.toString()`.

### Customizing the Decimal Separator

The world is
[about evenly split](https://en.wikipedia.org/wiki/Decimal_separator#/media/File:DecimalSeparator.svg)
between using a dot or a comma as a decimal marker.

By default, the ComputeEngine is configured to use a dot, i.e. $ 3.1415 $.

**To use a comma as a decimal marker**, set the `decimalSeparator` option:

```live
console.log(ce.expr(3.141).toLatex({ 
    decimalSeparator: "{,}"
}));
```

Note that in LaTeX, in order to get the correct spacing around the comma, it
must be surrounded by curly brackets.


### Special Numbers and Symbols

| Key | Description |
| :--- | :--- |
| `positiveInfinity` | The LaTeX string used to represent positive infinity. Default is `"\infty"` $ \infty $. |
| `negativeInfinity` | The LaTeX string used to represent negative infinity. Default is `"-\infty"` $ -\infty $. |
| `imaginaryUnit` | The LaTeX string used to represent the imaginary unit symbol. Default is `"\imaginaryI"` $ \imaginaryI $ |
| `notANumber` | The LaTeX string to represent the number NaN. Default value is `"\operatorname{NaN}"` $ \operatorname{NaN} $. |
| `prettify` | If `true`, the output will be formatted to be more human-readable. Default is `false`. |
| `invisibleMultiply` | A LaTeX string to use as an invisible multiply operator between expressions. Use `"\cdot"` to use a $ \cdot $. Default is `""`. |
| `invisiblePlus` | A LaTeX string to use as an invisible plus operator between expressions, for example with mixed numbers. Leave it empty to join the main number and the fraction. Use `"+"` to insert an explicit $ + $ operator between them. Default is `""`. |
| `multiply` | A LaTeX string to use as a multiply operator between expressions. Use `"\cdot"` to use a $ \cdot $. Default is `"\times"` $ \times $. |
| `missingSymbol` | A LaTeX string to use when a symbol is missing. Default is `"\placeholder{}"` $ \placeholder{} $. |
| `dmsFormat` | When `true`, serialize angle quantities in degrees-minutes-seconds format (e.g., `9°30'`). When `false` (default), use decimal degrees. |
| `angleNormalization` | Normalize angles during serialization. `"none"` (default): no normalization. `"0...360"`: normalize to $[0, 360)$. `"-180...180"`: normalize to $[-180, 180]$. |

```live
console.log(parse("3\\frac{1}{4}").toLatex({ 
    invisiblePlus: "+"
}));
```

### Customizing the Serialization Style

In addition, the keys `applyFunctionStyle`, `groupStyle`, `powerStyle`, 
`rootStyle`, `fractionStyle`, `logicStyle` and `numericSetStyle` 
can be used to customize the serialization of specific types of expressions.



For example, a group can be indicated by simple parentheses, or by a 
`\left...\right` command. A fraction can be indicated by a 
`\frac{}{}` command or by a `{}{}^{-1}`.

The Compute Engine includes some built-in defaults, but they can be customized
as desired. These style options are functions that take an expression fragment
and return a string indicating the desired style.


For example to always represent fractions with a solidus (forward slash) use:

```live
console.log(parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "quotient"
}));

console.log(parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "inline-solidus"
}));

```

The style option handler has two arguments:

- the expression fragment being styled
- the depth/level of the expression in the overall expression

For example, to serialize fractions deeper than level 0 as
an inline solidus:

```live

console.log(parse("\\frac{a}{b}+\\sqrt{\\frac{c}{d}}").toLatex({
  fractionStyle: (expr, level) =>
     level > 0 ? "inline-solidus" : "quotient"
}));
```

#### Function Application

**To customize the serialization of function application**, use the
`applyFunctionStyle` style option handler.

```live
console.log(parse("\\sin x").toLatex({
  applyFunctionStyle: () => "big"
}));
```


|   |                     |                       |
| :------------ | :------------------- | :--------------------- |
| `"paren"`     | `\sin(x)`            | $$\sin(x)$$            |
| `"leftright"` | `\sin\left(x\right)` | $$\sin\left(x\right)$$ |
| `"big"`       | `\sin\bigl(x\bigr)`  | $$\sin\bigl(x\bigr)$$  |
| `"none"`      | `\sin x`             | $$\sin x$$             |

#### Group

**To customize the serialization of groups**, use the `groupStyle` style option
handler.

```live
console.log(parse("(a+b)", {form: 'raw'}).toLatex({
  groupStyle: () => "big"
}));
```

|               |                     |                       |
| :------------ | :------------------ | :-------------------- |
| `"paren"`     | `x(a+b)`            | $$x(a+b)$$            |
| `"leftright"` | `x\left(a+b\right)` | $$x\left(a+b\right)$$ |
| `"big"`       | `x\bigl(a+b\bigr)`  | $$x\bigl(a+b\bigr)$$  |
| `"none"`      | `x a+b`             | $$ x a+b$$            |

#### Root

**To customize how roots are serialized**, use the `rootStyle` style option
handler.

```live
console.log(parse("\\sqrt{2}").toLatex({
  rootStyle: () => "solidus"
}));
```

|              |     |     |
| :----------- | :-- | :-- |
| `"radical"`  |     |     |
| `"quotient"` |     |     |
| `"solidus"`  |     |     |

#### Fraction

**To customize how fractions are serialized**, use the `fractionStyle` style
option handler.

```live
console.log(parse("\\frac{3}{5}").toLatex({
  fractionStyle: () => "nice-solidus"
}));
```

|                    |     |     |
| :----------------- | :-- | :-- |
| `"quotient"`       |     |     |
| `"inline-solidus"` |     |     |
| `"nice-solidus"`   |     |     |
| `"reciprocal"`     |     |     |
| `"factor"`         |     |     |

#### Logic

**To customize how logic expressions are serialized**, use the `logicStyle` style
option handler.

```live
console.log(parse("p\\land q").toLatex({
  logicStyle: () => "word"
}));
```

|                    |                    |                      |
| :----------------- | :----------------- | :------------------- |
| `"word"`           | `a \text{ and } b` | $$a \text{ and } b$$ |
| `"boolean"`        |                    |                      |
| `"uppercase-word"` | `p \text{ AND } q`  | $ p \text{ AND } q $                     |
| `"punctuation"`    |                    |                      |

#### Control Structure Keywords

**To customize how control structure keywords** (`if`/`then`/`else`, `for`,
`break`, `return`, …) **are serialized**, use the `keywordStyle` option.

```live
console.log(parse("\\keyword{if} x > 0 \\keyword{then} 1 \\keyword{else} 0").toLatex({
  keywordStyle: "keyword"
}));
```

| Value             |                                       |
| :---------------- | :------------------------------------ |
| `"text"` (default) | `\text{if } x \text{ then } 1 …`     |
| `"keyword"`        | `\keyword{if} x \keyword{then} 1 …`  |
| `"operatorname"`   | `\operatorname{if} x …`              |

#### Power

**To customize how powers are serialized**, use the `powerStyle` style option
handler.

```live
console.log(parse("x^2").toLatex({
  powerStyle: () => "solidus"
}));
```

|              |     |     |
| :----------- | :-- | :-- |
| `"root"`     |     |     |
| `"solidus"`  |     |     |
| `"quotient"` |     |     |

#### Numeric Sets

**To customize how numeric sets are serialized**, use the `numericSetStyle` style
option handler.

```live
console.log(parse("x \\in \\Z").toLatex({
  numericSetStyle: () => "interval"
}));
```

|                 |     |     |
| :-------------- | :-- | :-- |
| `"compact"`     |     |     |
| `"regular"`     |     |     |
| `"interval"`    |     |     |
| `"set-builder"` |     |     |

## Customizing the LaTeX Dictionary

The <a href ="/math-json/">MathJSON format</a> is independent of any source or
target language (LaTeX, MathASCII, Python, etc...) or of any specific
interpretation of the symbols used in a MathJSON expression (`"Pi"`,
`"Sin"`, etc...).

A **LaTeX dictionary** defines how a MathJSON expression can be expressed as a
LaTeX string (**serialization**) or constructed from a LaTeX string
(**parsing**).

The Compute Engine includes a default LaTeX dictionary to parse and serialize
common math expressions.

It includes definitions such as:

- "_The `Power` function is represented as "`x^{n}`"_"
- "_The `Divide` function is represented as "`\frac{x}{y}`"_".

Note that the dictionary will include LaTeX commands as triggers. LaTeX commands
are usually prefixed with a backslash, such as `\frac` or `\pm`. It will also
reference MathJSON symbols. MathJSON symbols are usually capitalized,
such as `Divide` or `PlusMinus` and are not prefixed with a backslash.


**To extend the LaTeX syntax**, create a `LatexSyntax` instance with a custom
dictionary and pass it to the `ComputeEngine` constructor.

The simplest way to add a custom LaTeX command for a function is to provide
a declarative entry with `name`, `kind`, and a trigger. No custom `parse`
handler is needed:

```js
import { ComputeEngine } from '@cortex-js/compute-engine';
import { LatexSyntax, LATEX_DICTIONARY } from '@cortex-js/compute-engine/latex-syntax';

const syntax = new LatexSyntax({
  dictionary: [
    ...LATEX_DICTIONARY,
    {
      name: "triple",
      kind: "function",
      latexTrigger: "\\triple",
      // "implicit" so that \triple{x}, \triple(x), and \triple x all work
      arguments: "implicit",
      serialize: "\\triple",
    },
  ],
});

const ce = new ComputeEngine({ latexSyntax: syntax });

ce.parse("\\triple{5}").json;
// ➔ ["triple", 5]
```

If the function has already been declared with `ce.declare()`, parsing and
evaluating work together:

```js
ce.declare("triple", {
  signature: "number -> number",
  evaluate: ([x]) => x.mul(3),
});

ce.parse("\\triple{5}").evaluate().json;
// ➔ 15
```

For **multi-character names** that don't need their own LaTeX command, use
`symbolTrigger` instead of `latexTrigger`. This matches
`\operatorname{name}` and `\mathrm{name}` automatically:

```js
const syntax = new LatexSyntax({
  dictionary: [
    ...LATEX_DICTIONARY,
    {
      kind: "function",
      symbolTrigger: "double",
      parse: "double",
    },
  ],
});
const ce = new ComputeEngine({ latexSyntax: syntax });

ce.parse("\\operatorname{double}(5)").json;
// ➔ ["double", 5]
```

For more complex parsing — for example when a command takes multiple
LaTeX group arguments — use a custom `parse` handler:

```live
const syntax = new LatexSyntax({
  dictionary: [
    // Include all the entries from the default dictionary...
    ...LATEX_DICTIONARY,
    // ...and add the `\smoll{}{}` command
    {
      // The parse handler below will be invoked when this LaTeX command
      // is encountered
      latexTrigger: '\\smoll',
      parse: (parser) => {
        // We're expecting two arguments, so we're calling
        // `parseGroup()` twice. If `parseGroup()` returns `null`,
        // we assume that the argument is missing.
        return [
          "Divide",
          parser.parseGroup() ?? ["Error", "'missing'"],
          parser.parseGroup() ?? ["Error", "'missing'"],
        ];
      },
    },
  ],
});
const ce = new ComputeEngine({ latexSyntax: syntax });

console.log(ce.parse('\\smoll{1}{5}').json);
// The "Divide" get represented as a "Rational" by default when
// both arguments are integers.
// ➔ ["Rational", 1, 5]
```


**To override an existing entry**, create a new dictionary array that includes
the default entries and add your own entry at the end.

Entries at the end of the array will override earlier entries. When parsing
an expression, the first entry (starting at the bottom) whose trigger
matches is selected.

```js
const syntax = new LatexSyntax({
  dictionary: [
    ...LATEX_DICTIONARY,
    // The entry below will override the default entry for the `\times` command
    {
      latexTrigger: ['\\times'],
      name: 'CrossProduct',
      kind: 'infix',
      associativity: 'none',
      precedence: 390,
    },
  ],
});
const ce = new ComputeEngine({ latexSyntax: syntax });
```

:::tip
Individual domain dictionaries are also available as named exports:
`ARITHMETIC_DICTIONARY`, `CALCULUS_DICTIONARY`, `TRIGONOMETRY_DICTIONARY`, etc.
Use these to build a minimal dictionary with only the domains you need.
:::

The `precedence` property is used to determine the order of operations when parsing
expressions, but it does not impact whether an entry is used for parsing. Only the 
`latexTrigger` or `symbolTrigger` properties are used to determine if an entry
is used for parsing.

Note that `latexTrigger` can be an array of tokens. However, the tokens
are not interpreted as alternatives. The array is treated as a sequence of tokens
that must be matched in order.

### LaTeX Dictionary Entries

Each entry in the LaTeX dictionary is an object with the following properties:

- `kind`

  The kind of expression associated with this entry. 
  
  Valid values are `prefix`, `postfix`, `infix`, `expression`, `function`, `symbol`,
  `environment` and `matchfix`. 
  
  If not provided, the default is `expression`.
  
  The meaning of the values and how to use them is explained below.

  Note that it is possible to provide multiple entries with the same `latexTrigger`
  or `symbolTrigger` but with different `kind` properties. For example, the
  `+` operator is both an `infix` (binary) and a `prefix` (unary) operator.

- `latexTrigger`

  A LaTeX fragment that will trigger the entry. For example, `^{+}` or `\mathbb{D}`.

- `symbolTrigger`

  A string, usually wrapped in a LaTeX command, that will trigger the entry. 
  
  For example, if `symbolTrigger` is `floor`, the LaTeX
  command `\mathrm{floor}` or `\operatorname{floor}` will trigger the entry.

  Only one of `latexTrigger` or `symbolTrigger` should be provided. 
  
  If `kind`  is `"environment"`, only `symbolTrigger` is valid, and it 
  represents the name of the environment.
  
  If kind is `matchfix`, both `openTrigger` and `closeTrigger` must be provided instead.

- `parse`

  A handler that will be invoked when the trigger is encountered in the
  LaTeX input. 
  
  It will be passed a `parser` object that can be used to parse the
  input. 
  
  The `parse` handler is invoked when the preconditions for the entry are met. 
  For example, an `infix` entry will only be invoked if the trigger is 
  encountered in the LaTeX input and there is a left-hand side to the operator.
  
  The signature of the `parse` handler will vary depending on the `kind`. 
  For example, for an entry of kind `infix` the left-hand side argument
  will be passed to the `parse` handler. See below for more info about parsing
  for each `kind`.

  The `parse` handler should return a MathJSON expression or `null` if the
  expression is not recognized. When `null` is returned, the Compute Engine
  Natural Parser will backtrack and attempt to find another handler that matches
  the current token. If there can be no ambiguity and the expression is not
  recognized, the `parse` handler should return an `["Error"]` expression. In
  general, it is better to return `null` and let the Compute Engine Natural
  Parser attempt to find another handler that matches the current token.
  If none is found, an `["Error"]` expression will be returned.


- `serialize`

  A handler that will be invoked when the `expr.latex` property is
  read. It will be passed a `Serializer` object that can be used to serialize
  the expression. The `serialize` handler should return a LaTeX string. See
  below for more info about serialization.

  If a `serialize` handler is provided, the `name` property must be provided as
  well.

- `name`
  
  The name of the MathJSON symbol associated with this entry.
  
  If provided, a default `parse` handler will be used that is equivalent to:
  `parse: name`.

  It is possible to have multiple definitions with the same triggers, but the
  `name` property must be unique. The record with the `name` property will be used
  to serialize the expression. A `serialize` handler is invalid if the `name`
  property is not provided.
  
  The `name` property must be unique. However, multiple entries
  can have different triggers that produce the same expression. This is useful
  for synonyms, such as `\operatorname{floor}` and `\lfloor`...`\rfloor`.

#### Expressions

The most general type of entry is one of kind `expression`. If no `kind`
property is provided, the kind is assumed to be `expression`.

For entries of kind `expression` the `parse` handler is invoked when the trigger
is encountered in the LaTeX input. The `parse` handler is passed a `parser`
object that can be used to parse the input.

The kind `expression` is suitable for a simple symbol, for example a
mathematical constant. It can also be used for more complex constructs, such as
to parse a series of tokens representing an integral expression. In this case,
the `parse` handler would be responsible for parsing the entire expression and
would use the `parser` object to parse the tokens.

If the tokens are not recognized, the `parse` handler should return `null` and
the parser will continue to look for another handler that matches the current
token.

#### Functions

The `function` kind is a special case of `expression` where the expression is a
function, possibly using multi-character symbols, as in
`\operatorname{concat}`. 

Unlike an `expression` entry, after the `parse` handler is invoked, the 
parser will look for a pair of parentheses to parse the arguments of the 
function and apply them to the function.

The parse handler should return the symbol corresponding to the function,
such as `Concatenate`. As a shortcut, the `parse` handler can be provided as an
Expression. For example:

```javascript
{
  kind: "function",
  symbolTrigger: "concat",
  parse: "Concatenate"
}
```

#### Operators: prefix, infix, postfix

The `prefix`, `infix` and `postfix` kinds are used for operators.

Entries for `prefix`, `infix` and `postfix` operators must include a
`precedence` property. The `precedence` property is a number that indicates the
precedence of the operator. The higher the number, the higher the precedence,
that is the more "binding" the operator is.

For example, the `precedence` of the `Add` operator is 275
(`ADDITION_PRECEDENCE`), while the `precedence` of the `Multiply` operator is
390 (`MULTIPLICATION_PRECEDENCE`).

In `1 + 2 * 3`, the `Multiply` operator has a **higher** precedence than the
`Add` operator, so it is applied first.

The precedence range is an integer from 0 to 1000.

Here are some rough ranges for the precedence:

- 800: prefix and postfix operators: `\lnot` etc...
  - `POSTFIX_PRECEDENCE` = 810: `!`, `'`
- 700: some arithmetic operators
  - `EXPONENTIATION_PRECEDENCE` = 700: `^`
- 600: some binary operators
  - `DIVISION_PRECEDENCE` = 600: `\div`
- 300: some logic and arithmetic operators: `\land`, `\lor` etc...
  - `MULTIPLICATION_PRECEDENCE` = 390: `\times`
- 200: arithmetic operators, inequalities:
  - `ADDITION_PRECEDENCE` = 275: `+` `-`
  - `ARROW_PRECEDENCE` = 270: `\to` `\rightarrow`
  - `ASSIGNMENT_PRECEDENCE` = 260: `:=`
  - `COMPARISON_PRECEDENCE` = 245: `\lt` `\gt`
  - 241: `\leq`
- 0: `,`, `;`, etc...

The `infix` kind is used for binary operators (operators with a left-hand-side
and right-hand-side). 

The `parse` handler will be passed a `parser` object and
the left-hand side of the operator, for `postfix` and `infix` operators. 

The `parser` object can be used to parse the right-hand side of the expression.

```javascript
{
  kind: "infix",
  latexTrigger: '\\oplus',
  precedence: ADDITION_PRECEDENCE,
  parse: (parser, lhs) => {
    return ["Concatenate", lhs, parser.parseExpression()];
  },
}
```

The `prefix` kind is used for unary operators. 

The `parse` handler will be passed a `parser` object. 


```javascript
{
  kind: "prefix",
  latexTrigger: '\\neg',
  precedence: ADDITION_PRECEDENCE,
  parse: (parser, lhs) => {
    return ["Negate", lhs];
  },
}
```

The `postfix` kind is used for postfix operators. The `parse` handler will be
passed a `parser` object and the left-hand side of the operator.

```javascript
{
  kind: "postfix",
  latexTrigger: '\\!',
  parse: (parser, lhs) => {
    return ["Factorial", lhs];
  },
}
```

#### Environment

The `environment` kind is used for LaTeX environments. 

The `symbolTrigger property in that case is the name of the environment. 

The `parse` handler wil be passed a `parser` object. The `parseTabular()` 
method can be used to parse the rows and columns of the environment. It 
returns a two dimensional array of expressions. 

The `parse` handler should return a MathJSON expression.

```javascript
{
  kind: "environment",
  symbolTrigger: "matrix",
  parse: (parser) => {
    const content = parser.parseTabular();
    return ["Matrix", ["List", content.map(row => ["List", row.map(cell => cell)])]];
  },
}
```

#### Matchfix

The `matchfix` kind is used for LaTeX commands that are used to enclose an
expression. 

The `openTrigger` and `closeTrigger` indicate the LaTeX commands
that enclose the expression. The `parse` handler is passed a `parser` object and
the "body" (the expression between the open and close delimiters). The `parse`
handler should return a MathJSON expression.

```javascript
{
  kind: "matchfix",
  openTrigger: '\\lvert',
  closeTrigger: '\\rvert',
  parse: (parser, body) => {
    return ["Abs", body];
  },
}
```

### Parsing

When parsing a LaTeX string, the first step is to tokenize the string according
to the LaTeX syntax. For example, the input string `\frac{ab}{10}` will result
in the tokens `["\\frac", "{", "a", "b", "}", "{", "1", "0", "}"]`. 

Note that each LaTeX command is a single token, but that digits and ordinary 
letters are each separate tokens.

The `parse` handler is invoked when the trigger is encountered in the LaTeX
token strings.

A common case is to return from the parse handler a MathJSON symbol.

For example, let's say you wanted to map the LaTeX command `\div` to the
MathJSON `Divide` symbol. You would write:

```javascript
{
  latexTrigger: '\\div',
  parse: (parser) => {
    return "Divide";
  },
}
```

As a shortcut, you can also write:

```javascript
{
  latexTrigger: '\\div',
  parse: () => "Divide"
}
```

Or even more succintly:

```javascript
{
  latexTrigger: '\\div',
  parse: "Divide"
}
```

The LaTeX `\div(1, 2)` would then produce the MathJSON expression
`["Divide", 1, 2]`. Note that the arguments are provided as comma-separated,
parenthesized expressions, not as LaTeX arguments in curly brackets.

If you need to parse some more complex LaTeX syntax, you can use the `parser`
argument of the `parse` handler. The `parser` object has numerous methods to
help you parse the LaTeX string:

- `parser.peek` is the current token.
- `parser.index` is the index of the current token. If backtracking is
  necessary, it is possible to set the index to a previous value.
- `parser.nextToken()` returns the next token and advances the index.
- `parser.skipSpace()` in LaTeX math mode, skip over "space" which includes
  space tokens, and empty groups `{}`. Whether space tokens are skipped or not
  depends on the `skipSpace` option.
- `parser.skipVisualSpace()` skip over "visual space" which includes space
  tokens, empty groups `{}`, and commands such as `\,` and `\!`.
- `parser.match(token: LatexToken)` return true if the next token matches the
  argument, or `null` otherwise.
- `parser.matchAll(tokens)` return true if the next tokens match the argument,
  an array of tokens, or `null` otherwise.
- `parser.matchAny(tokens: LatexToken[])` return the next token if it matches
  any of the token in the argument or `null` otherwise.
- `parser.matchChar()` return the next token if it is a plain character (e.g.
  "a", '+'...), or the character corresponding to a hex literal (^^ and ^^^^) or
  the `\char` and `\unicode` commands
- `parser.parseGroup()` return an expression if the next token is a group begin
  token `{` followed by a sequence of LaTeX tokens until a group end token `}`
  is encountered, or `null` otherwise.
- `parser.parseToken()` return an expression if the next token can be parsed as
  a MathJSON expression, or `null` otherwise. This is useful when the argument
  of a LaTeX command can be a single token, for example for `\sqrt5`. Some, but
  not all, LaTeX commands accept a single token as an argument.
- `parser.parseOptionalGroup()` return an expression if the next token is an
  optional group begin token `[` followed by a sequence of LaTeX tokens until an
  optional group end token `]` is encountered, or `null` otherwise.
- `parser.parseExpression()` return an expression if the next tokens can be
  parsed as a MathJSON expression, or `null` otherwise. After this call, there
  may be some tokens left to parse.
- `parser.parseArguments()` return an array of expressions if the next tokens
  can be parsed as a sequence of MathJSON expressions separated by a comma, or
  `null` otherwise. This is useful to parse the argument of a function. For
  example with `f(x, y, z)`, the arguments would be `[x, y, z]`.

If the `parse()` handler returns `null`, the parser will continue to look for
another handler that matches the current token.

Note there is a pattern in the names of the methods of the parser. The `match`
prefix means that the method will return the next token if it matches the
argument, or `null` otherwise. These methods are more primitive. The `parse`
prefix indicates that the method will return a MathJSON expression or `null`.

The most common usage is to call `parser.parseGroup()` to parse a group of
tokens as an argument to a LaTeX command.

For example:

```javascript
{
  latexTrigger: '\\div',
  parse: (parser) => {
    return ["Divide", parser.parseGroup(), parser.parseGroup()];
  },
}
```

In this case, the LaTeX input `\div{1}{2}` would produce the MathJSON expression
`["Divide", 1, 2]` (note the use of the curly brackets, rather than the
parentheses in the LaTeX input).

If we wanted instead to treat the `\div` command as a binary operator, we could
write:

```javascript
{
  latexTrigger: '\\div',
  kind: "infix",
  parse: (parser, lhs) => {
    return ["Divide", lhs, parser.parseExpression()];
  },
}
```

By using the `kind: "infix"` option, the parser will automatically insert the
left-hand side of the operator as the first argument to the `parse` handler.

### Serializing

When serializing a MathJSON expression to a LaTeX string, the `serialize()`
handler is invoked. You must specify a `name` property to associate the
serialization handler with a MathJSON symbol.

```javascript
{
  name: "Concatenate",
  latexTrigger: "\\oplus",
  serialize: (serializer, expr) =>
    "\\oplus" + serializer.wrapArguments(expr),
  evaluate: (ce, args) => {
    const { isNumber } = ce;
    let result = '';
    for (const arg of args) {
      if (!isNumber(arg)) return null;
      const val = arg.numericValue;
      if (ce.isComplex(val) || Array.isArray(val)) return null;
      if (ce.isBignum(val)) {
        if (!val.isInteger() || val.isNegative()) return null;
        result += val.toString();
      } else if (typeof val === "number") {
        if (!Number.isInteger(val) || val < 0) return null;
        result += val.toString();
      }
    }
    return ce.parse(result);
  },
}
```

In the example above, the LaTeX command `\oplus` is associated with the
`Concatenate` function. The `serialize()` handler will be invoked when the
`expr.latex` property is read.

Note that we did not provide a `parse()` handler: if a `name` property is
provided, a default `parse` handler will be used that is equivalent to:
`parse: name`.

It is possible to have multiple definitions with the same triggers, but the
`name` property must be unique. The record with the `name` property will be used
to serialize the expression. A `serialize` handler is invalid if the `name`
property is not provided.

## Using a New Function with a Mathfield

You may also want to use your new function with a mathfield.

First you need to define a LaTeX macro so that the mathfield knows how to render
this command. Let's define the `\smallfrac` macro.

```js
const mfe = document.querySelector("math-field");

mfe.macros = {
  ...mfe.macros,
  smallfrac: {
    args: 2,
    def: "{}^{#1}\\!\\!/\\!{}_{#2}",
  },
};
```

The content of the `def` property is a LaTeX fragment that will be used to
render the `\\smallfrac` command.

The `#1` token in `def` is a reference to the first argument and `#2` to the
second one.

You may also want to define an inline shortcut to make it easier to input the
command.

With the code below, we define a shortcut "smallfrac".

When typed, the shortcut is replaced with the associated LaTeX.

The `#@` token represents the argument to the left of the shortcut, and the `#?`
token represents a placeholder to be filled by the user.

```js
mfe.inlineShortcuts = {
  ...mfe.inlineShortcuts,
  smallfrac: "\\smallfrac{#@}{#?}",
};
```

<ReadMore path="/mathfield/guides/shortcuts/" > 
Learn more about **Key Bindings and Inline Shortcuts**<Icon name="chevron-right-bold" />
</ReadMore>

You can now parse the input from a mathfield using:

```js
console.log(ce.parse(mfe.value).json);
```

Alternatively, the customized compute engine can be associated with the
mathfields in the document:

```js
MathfieldElement.computeEngine = ce;
console.log(mfe.getValue("math-json"));
```
