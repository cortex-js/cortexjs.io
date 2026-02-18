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

A symbol does not have to be declared before it can be used. The type of a
symbol will be inferred based on its usage or its value. If its type cannot be
inferred, the type will be `unknown`.

```live show-line-numbers
const n = ce.box("n");
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
console.log(ce.box("x").isConstant);
// ➔ false

console.log(ce.box("Pi").isConstant);
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
const smallPi = ce.box("Pi"); // π with 4 digits
console.log(smallPi.latex);
// ➔ 3.1415

ce.precision = 10;
const bigPi = ce.box("Pi"); // π with 10 digits
console.log(bigPi.latex);
// ➔ 3.1415926535

ce.precision = 100; // Future computations will be done with 100 digits

console.log("pi = ", smallPi, "=", bigPi);
// ➔ pi  = 3.1415 = 3.1415926535
```

## Automatic Declaration

An unknown symbol is automatically declared when it is first used in an
expression.

The symbol has a type of `unknown` and no value associated with it,
so the symbol will be an **unknown**.

```js
const symbol = ce.box("m"); // m for mystery
console.log(symbol.type);
// ➔ "unknown"

symbol.value = 5;
console.log(symbol.type);
// ➔ "finite_integer"
```

If the type of a symbol is inferred from its usage, the type can be 
adjusted later as further information is provided. However, if the type is
provided in the declaration, the type cannot be changed later.



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
