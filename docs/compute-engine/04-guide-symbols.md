---
title: Symbols
slug: /compute-engine/guides/symbols/
layout: single
date: Last Modified
toc: true
---


<Intro>
A **symbol** is a named object in the Compute Engine. It has a type and may 
hold a value. A symbol without a value represents a mathematical unknown in 
an expression.
</Intro>

**To change the value or type of a symbol**, use the `value` and `type`
properties of the symbol.

A symbol does not have to be declared before it can be used. The type of an
undeclared symbol in an expression is the type that its use in that expression
requires, and the type of a symbol with a value is inferred from its value.
Otherwise the type is `unknown`.

```live show-line-numbers
const n = ce.expr("n");
n.value = 5;
console.log("n =", n.value.toString(), ":", n.type);
```

**To get a list of all the symbols in an expression** use `expr.symbols`. This
includes all symbols, even those bound by scoping constructs like `Sum` or
`Product`.

**To get only the free variables** (symbols that are not constants, operators, or
bound by a scoping construct), use `expr.unknowns` or `expr.freeVariables`.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about **adding definitions** for symbols and functions<Icon name="chevron-right-bold" />
</ReadMore>

## Scope

Symbols are defined within a **lexical scope**.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes**<Icon name="chevron-right-bold" /> 
</ReadMore>

## Unknowns and Constants

A symbol that has been declared, but has no values associated with it, is said
to be an **unknown**. Use `expr.unknowns` or `expr.freeVariables` to get the
list of unknowns in an expression. Symbols that are bound by scoping constructs
(e.g., the index variable `k` in `\sum_{k=0}^{10} k \cdot x`) are excluded.

A symbol whose value cannot be changed is a **constant**. Constants are
identified by a special flag in their definition.

**To check if a symbol is a constant**, use the `expr.isConstant` property.

```js
console.log(ce.expr("x").isConstant);
// ➔ false

console.log(ce.expr("Pi").isConstant);
// ➔ true
```
:::warning

The value of constants may depend on settings of the Compute Engine. For
example, the value of `Pi` is determined based on the value of the `precision`
property. The values of constants in scope when the `precision` setting is
changed will be updated.

:::

```js
ce.precision = 4;
const smallPi = ce.expr("Pi"); // π with 4 digits
console.log(smallPi.latex);
// ➔ 3.1415

ce.precision = 10;
const bigPi = ce.expr("Pi"); // π with 10 digits
console.log(bigPi.latex);
// ➔ 3.1415926535

ce.precision = 100; // Future computations will be done with 100 digits

console.log("pi = ", smallPi, "=", bigPi);
// ➔ pi  = 3.1415 = 3.1415926535
```

## Using `i` or `e` as a Variable Name

`i` is the imaginary unit and `e` is Euler's number. Both are constants, and
both are substituted during canonicalization — so a formula that uses one as an
ordinary variable, most often as a list index, quietly computes with the
constant instead:

```js
console.log(ce.parse("A_{i,j}").json);
// ➔ ["Subscript", "A", ["Sequence", ["Complex", 0, 1], "j"]]
```

The index became $\imaginaryI$. Nothing errors; an indexed access built this
way simply yields `NaN`.

**To use one of these names as a variable, declare it before parsing anything
that mentions it.** A declaration shadows the constant for that scope:

```js
ce.declare("i", "integer");

console.log(ce.parse("A_{i,j}").json);
// ➔ ["Subscript", "A", ["Sequence", "i", "j"]]

ce.assign("L", ce.box(["List", 10, 20, 30]));
ce.assign("i", 2);
console.log(ce.parse("L_i").evaluate().toString());
// ➔ 20
console.log(ce.parse("L[i]").evaluate().toString());
// ➔ 20
```

Four things are worth knowing before you do this:

- **Declare before parsing.** An expression parsed before the declaration has
  already had the constant substituted, and declaring afterwards does not
  change it. Declare at engine setup.
- **Prefer `integer` for an index.** `integer` rejects a fractional value at
  assignment; a symbol declared `unknown` accepts `i = 1.5` and passes the
  fractional index through to the access with no diagnostic.
- **Arithmetic with that name changes meaning in that scope**, and only there:
  with `i` declared and set to 2, `2i` is `4`, not the complex number. The
  dedicated spelling still works — `\imaginaryI` (and `\mathrm{i}`) always
  parses as the imaginary unit — and serialization is unaffected, because a
  complex value is written as `\imaginaryI`, never as a bare `i`. A complex
  result therefore survives a serialize-and-reparse round trip.
- **Bound variables are unaffected.** `\sum_{i=1}^{3} i` is `6` whether or not
  `i` is declared: a binder introduces its own index.

Declaring `e` follows the same rules but costs more, because it takes
$e^{x}$ with it. Write exponentials as `\exp(x)` instead — it canonicalizes to
`["Power", "ExponentialE", "x"]`, referring to the constant directly, so it is
unaffected by a variable named `e`.

To limit either declaration to part of a computation, declare it inside a
scope (see [Scope](#scope)); the constant is restored when the scope is
exited.

## Undeclared Symbols

Parsing or boxing an expression does not declare its symbols. A symbol with
no definition has no value, so it is an **unknown**, and it is evaluated with
the definition that the symbol has when the expression is evaluated.

```js
const symbol = ce.expr("m"); // m for mystery
console.log(symbol.type);
// ➔ "unknown"
console.log(ce.lookupDefinition("m"));
// ➔ undefined

ce.assign("m", 5);
console.log(ce.symbol("m").type);
// ➔ "integer"
```

The inferred type is `integer`: the numeric types are finite by default, so
`integer` promises a finite whole number.

The type that the uses of a symbol require is kept with the expression. The
`x` of `x + 1` has the type `number`, but the expression declares nothing, so
another expression does not read that type:

```js
const expr = ce.parse("x + 1");
console.log(expr.op1.type.toString());
// ➔ "number"
console.log(ce.box("x").type.toString());
// ➔ "unknown"
```

**To declare the symbols of some expressions with the types that their uses
require**, use `ce.infer()`. It declares each symbol that has no declared type
in the scope where a declaration of the name would go, marked as inferred, and
returns what it declared and what it skipped:

```js
const a = ce.parse("x + 1");
const b = ce.parse("x > 1");
ce.infer([a, b]);
// ➔ { declared: [{ name: "x", type: number, … }], skipped: [] }
console.log(ce.box("x").type.toString());
// ➔ "number"
```

The order of the expressions does not change the result. A symbol whose uses
conflict is not declared and is reported in `skipped`, with the reason
`"conflict"`: in `x + 1` and `x(3)`, `x` is a number and a function. The
other reasons are `"untyped"` (no use requires a type), `"defined"` (the
symbol has a declared type) and `"out-of-scope"`.

An expression reads a declaration made after it was created: after
`ce.declare("x", "string")`, the `x` of `expr` above has the type `string`.

An inferred type can be adjusted later as further information is provided.
However, if the type is provided in the declaration, the type cannot be
changed later.



## Forgetting a Symbol

**To _reset_ what is known about a symbol** use the `ce.forget()` function.

The `ce.forget()` function will remove any
[assumptions](/compute-engine/guides/assumptions) associated with a symbol, and
remove its value. However, the symbol will remain declared, since other
expressions may depend on it.

**To forget about a specific symbol**, pass the name of the symbol as an
argument to `ce.forget()`.

**To forget about all the symbols in the current scope**, use `ce.forget()`
without any arguments.

:::info[Note]
Note that only symbols in the current scope are forgotten. If assumptions about
the symbol existed in a previous scope, those assumptions will be in effect when
returning to the previous scope.
:::
