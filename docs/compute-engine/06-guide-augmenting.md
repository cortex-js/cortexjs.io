---
title: Custom Functions and Symbols
slug: /compute-engine/guides/augmenting/
---

The [MathJSON Standard Library](/compute-engine/standard-library/) is a
collection of definitions for **symbols** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own symbols.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When a symbol such as `Pi` or `Sin` is encountered in an expression, the 
Compute Engine will look up its definition in the set of known 
symbols, including the Standard Library.

### Automatic Declaration

If a matching definition is found, it will be bound to the symbol and 
used later to evaluate the expression.

If no definition is found, an automatic declaration will be made of the
symbol with a type `unknown` or a more specific type if the context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the symbol, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` method.

### Declarations are Scoped

The declaration of a symbol is done within a **lexical scope**. A scope 
is a hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
console.log(ce.parse("m").value);
// ➔ 42
```

**Note**: the assignment expression must be evaluated to take effect.

To define a new function $f$ that multiplies its argument by $2$, use
the following LaTeX expression:

```js
ce.parse("f(x) := 2x").evaluate();
console.log(ce.parse("f(3)").evaluate());
// ➔ 6
```


The `\mapsto` operator is an alternative syntax to define a function:

```js
ce.parse("f := x \\mapsto 2x").evaluate();
console.log(ce.parse("f(3)").evaluate());
// ➔ 6
```

**To define multiletter symbols**, use the `\operatorname{}` command:

```js
console.log(ce.parse('\\operatorname{double}(x) := 2x').evaluate());
console.log(ce.parse('\\operatorname{double}(3)').evaluate());
// ➔ 6
```

**Note**: you can also use the `\mathrm{}` or `\mathit{}` commands to wrap
multiletter symbols.

The LaTeX identifiers are mapped to MathJSON symbols. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON symbol `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## When Is the Value Captured?

An assignment evaluates its right-hand side **eagerly**, when the assignment
itself is evaluated. Any symbol that has a value at that moment is replaced by
its value, permanently:

```js
ce.parse("p := 1").evaluate();
ce.parse("a := p + 5").evaluate(); // a is 6: the value of p was captured
ce.parse("p := 2").evaluate();     // changing p has no effect on a
console.log(ce.parse("a").evaluate());
// ➔ 6
```

A symbol that has **no value** at that moment is an unknown: it remains in the
stored value as a symbol. The value of `a` below is the expression $p + 5$,
and evaluating `a` evaluates that expression — so `p` resolves to whatever its
value is **at evaluation time**:

```js
ce.parse("a := p + 5").evaluate(); // p is unknown: a is the expression p + 5
ce.parse("p := 2").evaluate();
console.log(ce.parse("a").evaluate());
// ➔ 7
```

The stored value itself never changes; what changes is the result of
evaluating it. This is the usual convention in computer algebra systems (it
matches `Set`, i.e. `=`, in Mathematica): defining a symbol in terms of an
unknown means the symbol's value _is_ that symbolic expression. There is no
way to "snapshot" an unknown other than as the symbol itself.

**Assigning a symbol to another symbol captures its current value — it does
not create an alias.**

```js
ce.parse("a := p + 5").evaluate();
ce.parse("b := a").evaluate();   // b is the expression p + 5, not a reference to a
ce.parse("p := 1").evaluate();
ce.parse("a := 100").evaluate(); // no effect on b
console.log(ce.parse("b").evaluate());
// ➔ 6
```

**Self-referential and mutually referential values are allowed.** Because
assignment is eager, a cycle can end up baked into a stored value: evaluating
the right-hand side of `q := p + 1` when `p` is already `q + 1` stores the
self-referential expression $q + 2$ as the value of `q`. Evaluating a symbol
whose value refers back to itself — directly or through other symbols —
returns the stored expression rather than recursing:

```js
ce.parse("s := s + 1").evaluate();
console.log(ce.parse("s").evaluate());
// ➔ s + 1
```

**To store an expression as inert data**, without capturing or resolving
anything, wrap it in `Hold`: the value of the symbol is then the held
expression itself, which stays unchanged under evaluation.

```js
ce.assign("a", ce.box(["Hold", ["Add", "p", 5]]));
ce.parse("p := 2").evaluate();
console.log(ce.parse("a").evaluate());
// ➔ Hold(p + 5)
```

**To resolve a held expression**, apply `ReleaseHold`, which removes one
layer of `Hold` and evaluates the result:

```js
console.log(ce.box(["ReleaseHold", "a"]).evaluate());
// ➔ 7
```

## Explicit Declarations

**To have more control over the definition of a symbol** use
the `ce.declare()` method.

When declaring a symbol, you can specify the type of the symbol, its value
and other properties.

```js
// Declaring a symbol "m"
ce.declare("m",  "integer");

// Declaring a function "f"
ce.declare("f", {
  signature: "(number) -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Declaring a Symbol

**To declare a symbol** use the `ce.declare()` method with the name of the
symbol as the first argument and a type as the second argument.

```js
ce.declare("n", "integer");
```

<ReadMore path="/compute-engine/guides/types" >The type specifies the 
valid values of the symbol. For example, `boolean`, `integer`, `rational`, `function`, `string`, etc. Learn more about **types**.<Icon name="chevron-right-bold" /></ReadMore>

Alternatively, you can provide an object literal with the additional properties
`value`, `type`, `isConstant`, and more.

```js
ce.declare("m", {
  type: "integer",
  value: 42,
});
```

If you do not provide a `type` property for a symbol, the type will be
inferred from the value of the symbol. If no type and no value are
provided, the type of the symbol will be `unknown`.


As a shorthand, a symbol can be declared by assigning it a value using `ce.assign()`:

```js
ce.assign("m", 42);
```

If the symbol was not previously defined, this is equivalent to:

```js
ce.declare("m", { value: 42 });
```

Alternatively, you can set the value of a symbol using the `value` property:

```js
ce.expr("m").value = 42;
```

**To prevent the value of a symbol from being changed**, set the `isConstant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  isConstant: true,
});
```


### Declaring a Function

**To declare a function**, associate an `evaluate` handler, which 
is the body of the function, with a symbol.

```js
ce.declare("double", { 
  evaluate: ce.parse("x \\mapsto 2x") 
});
```

:::caution[Caution]
The first argument of `declare()` is a MathJSON symbol, not a LaTeX command.
For example, use `double` instead of `\operatorname{double}`.
:::

The evaluate handler can be either a MathJSON expression as above or 
a JavaScript function. A name is declared once per scope, so to change the
definition above, pass the fields to change with `{ extend: true }` (see
below).

```js
ce.declare("double", { evaluate: ([x]) => x.mul(2) }, { extend: true });
```

The signature of the `evaluate` handler is `(args[], options)`, where:

- `args`: an array of the arguments that have been applied to the function. Each
  argument is a expression. The array may be empty if there are no
  arguments.
- `options`: an object literal which includes an `engine` property that is the
  Compute Engine instance that is evaluating the expression, a `numericApproximation` property that is true if the result should be a numeric approximation, an `expression` property that is the expression being evaluated, and a `precision` property with the number of significant digits requested: inside `N(x, p)` it is `p`, also when `p` is lower than `ce.precision`; under `.N()` it is `ce.precision`; in an exact evaluation it is `undefined`.

Since `args` is an array, you can use destructuring to get the arguments:

```js
ce.declare("double", { evaluate: (args) => args[0].mul(2) }, { extend: true });

// or
ce.declare("double", { evaluate: ([x]) => x.mul(2) }, { extend: true });
```

**A name is declared once per scope.** Declaring it again throws
`The symbol "double" is already declared in this scope`. This also applies
when the first declaration had no `signature`: an `evaluate` handler alone, a
flag such as `lazy`, or a description is enough to make the name taken. To
change an existing definition, pass a patch with only the fields to change and
the option `{ extend: true }`:

```js
// On a new engine, the first declaration of the name
ce.declare("double", { evaluate: ([x]) => x.mul(2) });

// Throws: The symbol "double" is already declared in this scope
ce.declare("double", { evaluate: ([x]) => x.mul(3) });

// Changes the handler of the existing definition
ce.declare("double", { evaluate: ([x]) => x.mul(3) }, { extend: true });
```

A patch that changes a flag of a library operator keeps the library handlers
that do not depend on that flag. Removing `commutative` from `Add` or
`Multiply` (`ce.declare("Add", { commutative: false }, { extend: true })`)
removes the library ordering handler, so the canonical form keeps the operand
order (`b + a` stays `b + a`). But the library `evaluate` handler of `Add` and
`Multiply` collects like terms, and it still reorders a symbolic sum: supply
your own `evaluate` handler in the same patch if the order must also be kept
when the expression is evaluated.

A name first seen in use, such as `f` in `ce.parse("f(x)")`, is not declared
yet and can be defined with `ce.declare("f", {...})`. See
[Overloading Functions](#overloading-functions) for the fields a patch can
carry.

### The `expression` option

The `expression` option is the canonical expression node being evaluated. Its
operands (`expression.ops`, `expression.op1`, ...) are the **raw** arguments:
canonical and bound, but not yet evaluated. The `args` array, by contrast,
holds the **evaluated** arguments — and when `numericApproximation` is true,
those have already been turned into floating point numbers. When your handler
needs to know something about an argument that evaluation destroys — above all
whether it was *exact* — `expression` is where to look. Treat it as read-only.

The `Power` operator uses it to pick the right branch for a negative base. The
convention is that a rational exponent `p/q` in lowest terms with an **odd**
`q` has a real value — `(-8)^(2/3) = 4` — while everything else takes the
principal complex value. Under `.N()` the exponent reaches the handler as a
double, from which `p/q` can only be guessed back; reading it from
`expression.op2` instead keeps the exact terms, so `.N()`, the type and the
compiled code all decide the same branch.

`expression` is optional: a handler called outside the evaluation driver may
not receive one, so guard for `undefined` and fall back to what `args` tells
you. The operand accessors `op1`/`op2`/`ops` and the number properties such as
`isExact` live on narrowed interfaces, so reach them through the `isFunction()`
and `isNumber()` guards — the same narrowing the `Power` handler uses.

**`expression.ops[i]` is not always the provenance of `args[i]`.** The
evaluated arguments are produced by a pass that reindexes them: it flattens an
**associative** operator (`f(a, f(b, c))` arrives as three arguments, one more
than the node has), it unwraps `ReleaseHold` (so `expression.ops[i]` is the
wrapper rather than what was evaluated), and it drops an argument whose
evaluation yields nothing. The positional correspondence holds only for a
non-associative operator with no `ReleaseHold` and no dropped argument. If your
handler indexes into `expression.ops`, treat
`expression.ops.length !== args.length` as "no provenance available" and fall
back.

**On a `lazy: true` operator the contrast does not exist**: held operands are
passed through untouched, so `args` is raw and held as well. Such a handler
must canonicalize each held operand it consumes — on the `ce.box()` and
`ce.parse()` routes the held operands are not even canonical.

```js
import { isFunction, isNumber } from "@cortex-js/compute-engine";

ce.declare("IsExactArgument", {
  signature: "(number) -> boolean",
  evaluate: ([x], { expression, engine }) => {
    // `x` may have been numericized; the raw operand never is.
    const raw =
      expression !== undefined && isFunction(expression) ? expression.op1 : x;
    return isNumber(raw) && raw.isExact ? engine.True : engine.False;
  },
});

ce.box(["IsExactArgument", ["Rational", 1, 3]]).N();  // → True
ce.box(["IsExactArgument", 0.3333]).N();              // → False
```

In addition to the `evaluate` handler the function definition can include
a `signature` type that describes the arguments and return value of the
function.

```js
ce.declare("double", {
  signature: "(number) -> number",
  description: "Multiply a number by two",
  keywords: ["twice", "doubling"],
  evaluate: ([x]) => x.mul(2),
}, { extend: true });
```

The optional `description` and `keywords` properties make a definition easier
to discover with `ce.searchDefinitions()`. The search includes definition
names, descriptions, synonyms, keywords, and associated LaTeX commands:

```js
ce.searchDefinitions("average");
// ➔ [{ id: "Mean", kind: "function" }, ...]

ce.searchDefinitions("doubling", { limit: 5 });
// ➔ [{ id: "double", kind: "function" }]
```

The optional `limit` setting limits the number of results and defaults to `10`.
Pass a returned `id` to `ce.lookupDefinition(id)` to inspect the complete
definition.

A definition can give its own derivative with the `derivative` key. The value
is an array with one function literal for each argument (each literal takes all
the arguments as parameters), or a handler
`(ops, { engine, argument }) => Expression | undefined` that returns the
partial derivative with respect to argument number `argument` at `ops`. `D`
applies the chain rule. A partial derivative that the key does not give stays
symbolic.

```js
ce.declare("Sq", {
  signature: "(number) -> number",
  evaluate: ([x]) => (isNumber(x) ? x.mul(x) : undefined),
  derivative: [["Function", ["Multiply", 2, "x"], "x"]],
});

ce.box(["D", ["Sq", "x"], "x"]).evaluate();                // ➔ 2x
ce.box(["D", ["Sq", ["Power", "x", 2]], "x"]).evaluate();  // ➔ 4x^3
```

See `FunctionDefinition` for more details on the other handlers and
properties that can be provided when defining a function.

### Validating custom canonical handlers

A custom `canonical` handler participates in expression construction before an
`evaluate` handler runs. It must not assume that signature validation has
already produced every missing-argument or incompatible-type error needed by
the function.

For required operands, check arity first and return an expression containing
the appropriate `engine.error("missing")` placeholders. For operands whose
shape or type the handler consumes directly, validate them before reading
specialized fields. Preserve the original head in the returned error
expression so serialization, diagnostics, and later evaluation still identify
the failed call.

Keep validation at the narrowest layer that knows the contract:

- Express ordinary arity and type requirements in the function signature.
- Validate structural preconditions needed specifically by `canonical` inside
  that handler.
- Validate value-dependent conditions, such as a positive evaluated integer,
  in `evaluate`.
- Add tests for no arguments, each missing required argument, wrong types, and
  the valid boundary cases.

This separation avoids both silently accepting malformed calls and evaluating
operands merely to canonicalize their syntax.

### Deriving the Result Type of an Operator

The `signature` of an operator states its result type once, for every call.
When the result type depends on the operands — the sum of two integers is an
integer, the norm of a point whose components are lists is a list — the
definition can add a `type` handler. The handler receives one **operand
descriptor** per operand, never the operand expression itself, and returns a
type (a `Type`, a type string, or `undefined` to keep the signature's result).

```js
ce.declare("Halve", {
  signature: "(number) -> number",
  type: ([x]) => {
    // The descriptor's `type` is the operand's type; a number literal's
    // type carries its value (`21`), so a literal is exact here.
    if (x.facts.finite !== true) return "number";
    return x.facts.sgn === "zero" ? "0" : "real";
  },
  evaluate: ([x]) => x.div(2),
});
```

A descriptor has three parts:

- `type` — the operand's type.
- `facts` — a small set of three-valued facts (`true`, `false`, or
  `undefined` for "not known"): `finite`, `sgn`, `closed` (no free
  variables), `collection`, `finiteCollection`, `indexed`, a static `shape`
  and the `elementType` the operand's own collection handler proves.
- `structureOf()` — an on-demand structural view: a `symbol` (with its name
  and whether its type was inferred), a `string`, a `number` (with its exact
  rational terms when it has them), an `application` (its head and child
  descriptors), a `function-literal` (parameters and body), a `tuple` or a
  `list-literal` (with element descriptors).

The second argument is a context with a read-only view of the engine
(`engine.type()`, `engine.lookupDefinition()`, `engine.tolerance`) and
`derive(operator, operands)`, which returns the type of applying an operator
to descriptors you build yourself — the way to type the body of a mapping
literal over a collection's element type.

Because a handler never holds an expression, it cannot declare, canonicalize,
or evaluate anything while deriving a type, and the engine's type caches stay
valid. Under test a handler that writes engine state throws.

### Declaring a Value Kind: Values with Their Own Arithmetic

Some values are not numbers, but they take part in arithmetic with their own
rules: an element of a finite field, a residue class, a measurement with an
uncertainty. A **value kind** lets an operator that constructs such values
give their arithmetic to the engine. Two declarations make a kind:

- a **kind type**, the type of the values;
- an operator, the **head** that constructs the values, declared with an
  `arithmetic` field and with the kind type as its result type.

The number rules are wrong for most kinds. In GF(8), `x + x` is `0`, not
`2x`; for a measurement, `x - x` has an uncertainty and is not `0`. So the
engine keeps the number rules away from any expression that holds a value of
a kind: canonicalization, `evaluate()` and `simplify()` do not apply
`x - x = 0`, `x/x = 1` or like terms to it. Only the hooks of the kind
combine its values.

#### The kind type

A kind type is one of:

- a **kind primitive**, a type name that the library defines: `residue`,
  the type of a residue class, `measurement`, the type of a
  `Measurement(value, error)`, and `quantity`, the type of a
  `Quantity(magnitude, unit)` (see
  [Measurements and Quantities](#measurements-and-quantities));
- a **nominal type whose definition is exactly `value`**, declared with
  `{ mint: false }`. This is the form you use for a kind of your own:

```js
ce.declareType("gf8", "value", { mint: false });
```

A kind type is a subtype of `value` and of `expression`, so a parameter typed
`value`, `expression` or `any` accepts its values: `List`, `Hold`, `Equal`,
and a symbol declared `value` can hold one. A kind type is disjoint from
every other type except `value`, `expression`, `any` and `unknown`: a value
of type `gf8` is never a number, a string or a collection, and a symbol
declared `gf8` refuses a number.

By default, `ce.declareType()` also declares a constructor of the same name
(see [Type Constructors](/compute-engine/guides/types/#type-constructors)).
A kind has its own head as its constructor, so its type must be declared
with `{ mint: false }`: a minted `gf8(…)` would be a second head of the type
with no arithmetic. The engine refuses an `arithmetic` field whose result
type was declared without `{ mint: false }`.

#### A complete example: GF(8)

GF(8) is the field with 8 elements. An element is a polynomial of degree
less than 3 over GF(2), held here as a 3-bit number: the sum of two elements
is the bitwise XOR of their numbers, and the product is the product of the
polynomials modulo $x^3 + x + 1$.

```js
// The product of two elements of GF(8), each held as a 3-bit number:
// polynomials over GF(2), reduced modulo x³ + x + 1.
function gfMul(a, b) {
  let r = 0;
  for (let i = 0; i < 3; i++) if (b & (1 << i)) r ^= a << i;
  for (let i = 4; i >= 3; i--) if (r & (1 << i)) r ^= 0b1011 << (i - 3);
  return r;
}

// The number of a `GF8(k)` value, or `undefined` for any other expression
const gf = (x) =>
  x.operator === "GF8" && Number.isInteger(x.op1.re) ? x.op1.re & 7 : undefined;

// Combine every `GF8` operand of a sum or a product into one fold
function fold(ops, engine, step, unit) {
  const operands = [];
  ops.evaluated.forEach((x, i) => {
    if (gf(x) !== undefined) operands.push(i);
  });
  if (operands.length < 2) return undefined;
  const k = operands.reduce((acc, i) => step(acc, gf(ops.evaluated[i])), unit);
  return [{ value: engine.function("GF8", [k]), operands }];
}

ce.declareType("gf8", "value", { mint: false });

ce.declare("GF8", {
  signature: "(integer) -> gf8",
  arithmetic: {
    add: (ops, { engine }) => fold(ops, engine, (a, b) => a ^ b, 0),
    multiply: (ops, { engine }) => fold(ops, engine, gfMul, 1),
    // In characteristic 2, -x is x
    negate: (x) => (gf(x.evaluated) !== undefined ? x.evaluated : undefined),
    divide: (a, b, { engine }) => {
      const [x, y] = [gf(a.evaluated), gf(b.evaluated)];
      if (x === undefined || y === undefined || y === 0) return undefined;
      let inverse = 1;
      while (gfMul(y, inverse) !== 1) inverse += 1;
      return engine.function("GF8", [gfMul(x, inverse)]);
    },
    power: (base, exponent, { engine }) => {
      const x = gf(base.evaluated);
      const n = exponent.exact();
      if (x === undefined || n.isInteger !== true || n.isNonNegative !== true)
        return undefined;
      let r = 1;
      for (let i = 0; i < n.re; i++) r = gfMul(r, x);
      return engine.function("GF8", [r]);
    },
  },
});
```

With these declarations:

```js
ce.box(["Add", ["GF8", 3], ["GF8", 5]]).evaluate();       // ➔ GF8(6)
ce.box(["Multiply", ["GF8", 3], ["GF8", 5]]).evaluate();  // ➔ GF8(4)
ce.box(["Subtract", ["GF8", 3], ["GF8", 3]]).evaluate();  // ➔ GF8(0)
ce.box(["Divide", ["GF8", 3], ["GF8", 5]]).evaluate();    // ➔ GF8(6)
ce.box(["Power", ["GF8", 3], 2]).evaluate();              // ➔ GF8(5)
ce.box(["Add", "x", ["GF8", 1], ["GF8", 2]]).evaluate();  // ➔ x + GF8(3)

// `divide` declines a zero divisor, and `power` an exponent of 1/2:
// the expression stays as it is
ce.box(["Divide", ["GF8", 3], ["GF8", 0]]).evaluate();    // ➔ GF8(3) / GF8(0)
ce.box(["Sqrt", ["GF8", 3]]).evaluate();                  // ➔ sqrt(GF8(3))

// A list of values is a list of the kind type
ce.box(["List", ["GF8", 1], ["GF8", 2]]).type;            // ➔ list<gf8^2>

// No other operator accepts a value of the kind
ce.box(["Sin", ["GF8", 3]]).isValid;                      // ➔ false
```

A symbol declared with the kind type is protected before it has a value:

```js
ce.declare("g", "gf8");
ce.box(["Subtract", "g", "g"]).simplify();  // ➔ g - g
ce.box(["Divide", "g", "g"]).simplify();    // ➔ g / g
```

A symbol declared `value`, or not declared, can be a number, and the number
rules apply to it: `w/w` is `1`. Declare a symbol that will hold a value of
a kind with the kind type.

Two values of a kind written next to each other are a product, as two
numbers are: `\operatorname{GF8}(3)\operatorname{GF8}(5)` parses to
`GF8(3) · GF8(5)`.

#### The hooks

The `arithmetic` field is an `ArithmeticDefinition`. Every hook is optional.
A hook that answers `undefined` declines, and the expression stays as it is.

| Hook | Called for | Answers |
| :--- | :--- | :--- |
| `add(ops, context)` | a sum (`Add`, `Subtract`) with a value of the kind | a list of folds |
| `multiply(ops, context)` | a product with a value of the kind | a list of folds |
| `negate(x, context)` | `-x` | an expression |
| `divide(a, b, context)` | `a / b` | an expression |
| `power(base, exponent, context)` | `base ^ exponent`; also `Sqrt(x)` (exponent `1/2`), `Root(x, n)` (exponent `1/n`), `Square(x)` (exponent `2`) | an expression |
| `compare(a, b, context)` | the comparisons, `Max`, `Min`, `ElementMax`, `ElementMin`, `Sort`, `Clamp` | `-1`, `0`, `1`, `'<='`, `'>='`, `'unordered'` or `undefined` |
| `extremum(which, ops, context)` | `Max`, `Min`, `ElementMax`, `ElementMin`, `Clamp`, before `compare` | an expression |
| `apply(operator, ops, context)` | another operator that accepted the value as a number (see `admittedAs`) | an expression |

Three optional fields describe a value of the kind:

- `isExact(value)` answers whether `value` is exact. The engine reads it for
  the rule that an inexact operand changes an `Indeterminate` answer to
  `NaN`: `Max(x, Indeterminate)` is `NaN` when `x` is inexact, and
  `Indeterminate` when `x` is exact. Without `isExact`, every value of the
  kind is exact. The library `Measurement` answers `false` for every value,
  and `Quantity` answers whether the magnitude is exact.
- `isNaN(value)` answers whether `value` stands for no value, as the number
  `NaN` does. Such a value follows the rule of `NaN`: `Max`, `Min`,
  `ElementMax`, `ElementMin` and `Clamp` give `NaN`, it has no order
  (`Less` and `Greater` are `False`), and it is equal to no value, itself
  included (`Equal` is `False`, `NotEqual` is `True`). The `compare` hook
  is not called for it. Without `isNaN`, no value of the kind is `NaN`. The
  library `Measurement` answers `true` for a `NaN` nominal, and `Quantity`
  for a `NaN` magnitude: `Max(Quantity(NaN, m), 2 m)` is `NaN`.
- `numericValue(value)` gives the number that `value` stands for, for a kind
  whose values stand for a number. The numeric accessors of the value read
  it: `re`, `im`, `bignumRe`, `bignumIm` and `valueOf()`. The library
  `Measurement` gives its nominal, so `Measurement(2.5, 0.1).re` is `2.5`.
  Without `numericValue`, or when it answers `undefined`, `re` is `NaN`. The
  fact queries (`isPositive`, `sgn`, `isInteger`, `isFinite`, …) do not read
  it: they are `undefined` for every value of a kind, so that no canonical
  rule of the numbers applies to it.

**The operands.** `add`, `multiply` and `apply` receive the operands as a
`KindOperands` object:

- `ops.evaluated[i]` is the evaluated operand `i`;
- `ops.written[i]` is the operand as it was written before evaluation, or
  `undefined` for a value that the fold of another kind made. Under
  `simplify()`, it is the operand as it was written before the
  simplification of the operands, so it is the same on the three routes
  (`evaluate()`, `.N()`, `simplify()`). A kind whose
  rule depends on how a term was written reads it here: `a - b` is
  canonically `Add(a, Negate(b))`, and the position of the `Negate` term
  follows the canonical order, so search for it;
- `ops.exact(i)` is the exact value of operand `i`. Outside `.N()` it is
  `ops.evaluated[i]`. Under `.N()` it is the operand evaluated without the
  numeric approximation, when this does not run a side effect again. A kind
  whose values are exact reads `exact(i)` so that `(c + 1/3).N()` stays exact;
- `ops.elements(i)`, at an operator whose parameter is a collection (`Mean`),
  is the list of the elements of operand `i`, enumerated once by the engine.
  It is `undefined` for an operand that is not a collection, and for a
  collection that the engine did not enumerate: one larger than
  `engine.maxCollectionSize`, one of unknown or infinite size, or one whose
  element type cannot hold a value of a kind.

`negate`, `divide`, `power` and `compare` receive each operand as a
`KindOperand`, with the fields `evaluated`, `written` and `exact()`.

**A payload that is costly to read.** The hooks of a kind receive the kind
value as a call of its head, so a hook that reads a costly payload reads it
again at each operation. `decodedPayload(expr, decode)` runs `decode` once
for each boxed expression and returns the stored result after that; boxed
expressions are immutable, so the result never needs to be refreshed.
Define `decode` once (at the top level of a module), not as a closure in the
call: `const { lo, hi } = decodedPayload(x, decodeEnclosure)`. The function
is exported by the package:
`import { decodedPayload } from "@cortex-js/compute-engine"`.

The `context` has three fields:

- `engine`;
- `numericApproximation`, which is `true` under `.N()`. The hook makes its
  own result numeric under `.N()`: a kind whose values are exact computes
  the exact value anyway, and a kind whose values hold a float returns the
  numeric form. The engine does not apply `.N()` to the result of a hook;
- `tolerance`, for the `compare` hook only. When the caller compares within
  a tolerance, it is that tolerance: `.is()` gives its `tolerance` argument,
  or `engine.tolerance` when the call has none. For every other comparison
  (the relational operators, `isEqual()`, `isLess()`, `Max`, `Min`, `Sort`,
  …) it is `undefined`, and the hook applies its own rule: usually, two
  exact values are compared exactly and a float within `engine.tolerance`.

**Folds.** `add` and `multiply` answer a list of **folds**. A fold
(`KindFold`) names the operands it combined, by their index in
`ops.evaluated`, and the value they make: `{ value, operands: [0, 2] }`. A
hook can answer several folds (one for each modulus, one for each
dimension), and must not name an operand twice. A fold can name an operand
of another kind only to make it part of its own value. The value of a fold
can be a value of another kind or a number. An empty list folds nothing.

**How a sum is evaluated.** For a sum (a product is the same):

1. The operands are evaluated.
2. The kinds of the operands are listed in the order of their first
   occurrence, by the head of each value.
3. Each kind, in that order, gets one call of its `add` hook, with the
   operands that are left: the operands that no fold took, and the values
   that the folds of the kinds before it made. Each fold replaces the
   operands it names. A kind is not called a second time: a hook that must
   repeat its rule until nothing changes does so before it answers.
4. The operands that hold no value of a kind, and the folds whose value is
   a number, are added as an ordinary sum. The other operands (the values of
   a kind, and the symbols declared with a kind type) are placed beside that
   sum, with no other change: like terms are not collected with them, and a
   zero or an infinity does not absorb them.

So `x + x + GF8(1) + GF8(2)` is `2x + GF8(3)`.

`negate`, `divide` and `power` are called for the first kind among the
operands whose hook answers. When no hook answers, the expression stays as
it is.

**Rules for a hook.**

- The operands of `add` and `multiply` are in canonical order: the canonical
  form sorts a sum and a product. So `multiply` must be commutative. A kind
  whose product is not commutative (quaternions, matrices) cannot be
  declared with this field.
- A hook can make and evaluate expressions with `engine`, including
  expressions with values of another kind; the engine then calls the hooks
  of that kind. A hook must not call `.simplify()`: this can cause an
  infinite recursion.
- An error thrown by a hook is not caught, as for an `evaluate` handler.
- A fold that names an operand index that does not exist, or names an
  operand twice, is an error in the definition of the kind, and the engine
  throws.
- A kind that gives `add` must also give `negate`, because `a - b` is
  `Add(a, Negate(b))`: without `negate`, a difference is never folded. The
  engine refuses the declaration otherwise.

**The methods.** `.add()`, `.mul()`, `.div()` and `.pow()` call the same
hooks: `ce.box(["GF8", 3]).mul(ce.box(["GF8", 5]))` is `GF8(4)`. These
methods do not evaluate their operands, so a hook receives what the caller
built. `.neg()` does not call `negate`: `GF8(3).neg()` is `-GF8(3)`, and
`Negate(GF8(3))` calls `negate` when it is evaluated. So `a.sub(b)` gives
`add` the operands `a` and `Negate(b)`: the `GF8` hooks above do not read a
`Negate(…)` operand, and `GF8(3).sub(GF8(3))` stays `-GF8(3) + GF8(3)`, while
`["Subtract", ["GF8", 3], ["GF8", 3]]` evaluates to `GF8(0)`. A kind whose
`add` reads a `Negate(…)` operand folds `a.sub(b)` too (`ResidueClass` does).

#### Where a value of a kind is accepted

A kind type is not a number type, so a parameter typed with a number type
does not accept a value of a kind by subtyping. A value of a kind is
accepted:

1. **At the arithmetic operators**, when a head of the kind type gives the
   hook that the operator calls: `Add` and `Subtract` need `add`, `Multiply`
   needs `multiply`, `Negate` needs `negate`, `Divide` needs `divide`, and
   `Power`, `Sqrt`, `Root` and `Square` need `power`. A kind without
   `power` is refused by `Square(x)`. The rule also applies to the elements
   of a collection: with `L: list<gf8>`, `L + L` adds the lists element by
   element.
2. **At a parameter that names the kind type or accepts `value`**: a
   parameter typed `gf8`, `value`, `expression`, `any` or `unknown`. The
   operator runs its own handler, which sees the value as it is: `List`,
   `Hold`, `Equal`, `Max`, the comparisons.
3. **As a number**, when the kind type says so with `admittedAs`:
   - `"none"` (the default): no other parameter accepts it;
   - `"real"`: every parameter that accepts a `real` accepts it (`real`,
     `number`, `complex`, `complex | infinity`). A parameter typed `integer`
     or a range of numbers does not;
   - `"number"`: every parameter that accepts a `number` or a `real` accepts
     it. Use it for a kind whose values can be complex.

   Admission as a number is not subtyping: `umeasurement` is not a subtype
   of `real`, and a symbol declared `real` refuses a value of the kind.

**A function with a body** (a function literal, or a `ce.declare()` with a
MathJSON or LaTeX body) accepts a value of a kind only when its parameter
names the kind type, or is typed `value`, `any` or `unknown`: the third rule
above does not apply to it. The body was canonicalized with the declared
type of its parameter, and the canonical form of `x/x` is `1` for a
parameter typed `real`, so the body cannot be used for a value of a kind.
With `f: (real) -> real`, `f(UserMeasurement(2, 0.1))` is an
`incompatible-type` error. Declare the parameter `real | umeasurement`
instead. An untyped parameter (`unknown`) accepts the value, but the body
may already have changed `x/x` to `1`.

The element of a collection of values of a kind has the kind type, so the
variable of `Map`, `Sum` and the other operators that bind a variable over
such a collection has it too, and its body is protected:
mapping `z ↦ z/z` over `[GF8(3), GF8(5)]` divides each element by itself
through `divide` and gives `[GF8(1), GF8(1)]`.

An expression is checked when it is boxed. An expression boxed before the
head of the kind was declared is not checked again: with `r: gf8` declared
before `GF8`, `r + 1` boxed before `GF8` is an `incompatible-type` error,
and stays one.

#### Comparisons

A kind that has an order gives `compare`. It answers:

- `-1`, `0` or `1`, the order of the two values;
- `'unordered'` when the two values are known but have no order, as a
  complex number has none. The library `Measurement` answers it for a
  nominal that is complex or `NaN`. The four order operators (`Less`,
  `LessEqual`, `Greater`, `GreaterEqual`) then answer `False`, as they do
  for a complex number; `Equal` and `NotEqual` ask the `eq` handler of the
  operator definition of each head; `Max`, `Min` and `Sort` stay
  unevaluated;
- `'<='` when the first value is less than or equal to the second, and the
  hook cannot say which: two intervals that touch, such as
  `Enclosure(0, 1)` and `Enclosure(1, 2)`, hold reals that are in this
  order, and they may hold the same real `1`. `LessEqual` then answers
  `True` and `Greater` answers `False`; `Less` and `GreaterEqual` stay
  unevaluated; `Equal` and `NotEqual` ask the `eq` handlers. `'>='` is the
  mirror answer. `Sort`, and `Max` and `Min` without an `extremum` hook,
  need a total order, and read these two answers as `undefined`;
- `undefined` when the two values cannot be compared (a value of another
  kind, a symbol).

A kind whose values can overlap gives `extremum(which, ops, context)` too.
`Max`, `Min`, `ElementMax`, `ElementMin` and `Clamp` ask it BEFORE they
order the operands with `compare`, for two operands at a time (`which` is
`'max'` or `'min'`; `ops` is a `KindOperands` object). The hook can answer a
value that is not one of the operands. When it answers `undefined`, or when
the kind has no `extremum`, the engine orders the operands with `compare`.
For example, the maximum of two intervals is the interval of the larger
ends:

```js
ce.declareType("ivl", "value", { mint: false });

// The endpoints of an `Ivl(lo, hi)`, or of a number read as a point
const ends = (x) =>
  x.operator === "Ivl" ? [x.op1.re, x.op2.re] : x.isNumberLiteral ? [x.re, x.re] : undefined;

ce.declare("Ivl", {
  signature: "(real, real) -> ivl",
  arithmetic: {
    admittedAs: "real",
    compare: (a, b) => {
      const [x, y] = [ends(a.evaluated), ends(b.evaluated)];
      if (!x || !y) return undefined;
      if (x[1] < y[0]) return -1;
      if (x[0] > y[1]) return 1;
      if (x[1] === y[0]) return "<=";
      if (x[0] === y[1]) return ">=";
      return undefined;
    },
    extremum: (which, ops, { engine }) => {
      const xs = ops.evaluated.map(ends);
      if (xs.some((x) => !x)) return undefined;
      const pick = which === "max" ? Math.max : Math.min;
      return engine.function("Ivl", [
        engine.number(pick(...xs.map((x) => x[0]))),
        engine.number(pick(...xs.map((x) => x[1]))),
      ]);
    },
  },
});

ce.box(["LessEqual", ["Ivl", 0, 1], ["Ivl", 1, 2]]).evaluate(); // ➔ True
ce.box(["Less", ["Ivl", 0, 1], ["Ivl", 1, 2]]).evaluate();      // ➔ unevaluated
ce.box(["Max", ["Ivl", 0, 2], ["Ivl", 1, 3]]).evaluate();       // ➔ Ivl(1, 3)
```

One order is used for every comparison: the six relational operators,
`Max`, `Min`, `ElementMax`, `ElementMin`, `Sort`, `Clamp`, and the methods
`isEqual()`, `isLess()`, `isGreater()` and the others. `Max` and `Min` keep
the first operand of a tie, and `Clamp(x, lo, hi)` returns `x` when `x` is
equal to a bound.

- A comparison of the same expression on both sides is decided first, for
  every kind: `a < a` is `False` and `a ≤ a` is `True`.
- An order comparison (`Less`, …) that is not decided stays unevaluated.
- `Equal` and `NotEqual` use `compare` when it answers. If not, they use the
  `eq` handler of the operator definition of each head, if there is one.
  If no head has an `eq` handler: two values whose types are disjoint are not
  equal (`GF8(1) == "abc"` is `False`), two identical values are equal, and
  any other pair stays unevaluated. So, for a kind without `compare`,
  `GF8(1) == GF8(2)` stays unevaluated: the engine does not know that the two
  values are different elements of the field, and an answer of `False` would
  be wrong for a kind whose values can be equal without being identical.
- A kind without `compare` has no order: `GF8(1) < GF8(2)` stays unevaluated
  (typed `boolean`), and `Max(GF8(1), GF8(2))` is an `incompatible-type`
  error.
- `.is()` uses the `Equal` rule for a value of a kind that has `compare`, and
  `.isSame()` otherwise. `compare` receives the tolerance of `.is()` in
  `context.tolerance`: the `tolerance` argument of the call, or
  `engine.tolerance`.

#### Other operators: `apply`

An operator is an **apply site** for a kind when a value of the kind is one
of its operands only because of `admittedAs` (the third rule above), and the
operator has an `evaluate` handler and is not lazy. At an apply site, the
engine calls the `apply` hook of the kind in place of the `evaluate` handler
of the operator. When `apply` answers `undefined`, the expression stays
unevaluated. When the kind has no `apply`, the handler of the operator runs
and sees the value as it is.

An operator that accepts the kind by its type (its parameter names the kind
type, or is `value` or `any`) is never an apply site: its handler runs. Nor
are the arithmetic operators and the comparisons, which use the other hooks.

A function applied to a collection is applied to each element, so `apply`
is called for each element: `Sin([U1, U2])` is a list of two results of
`apply`. At an operator whose parameter is a collection (`Mean`), `apply`
receives the collection, and `ops.elements(i)` gives its elements.

The numeric facts of a value of a kind (`isPositive`, `sgn`, `isInteger`,
…) are `undefined`, and `re` is `NaN` unless the kind gives `numericValue`.
So the canonical rules that read them do not apply, and only `apply`
decides.

The example below is a measurement: a nominal value and a standard
uncertainty, propagated to first order. It is accepted as a number
(`admittedAs: "number"`), has an order (`compare`, by the nominal value),
and gives `apply` for the functions whose derivative it knows.

```js
// A measurement `UserMeasurement(value, sigma)`: a nominal value and a
// standard uncertainty. A number operand has an uncertainty of 0.
const parts = (x) =>
  x.operator === "UserMeasurement"
    ? { value: x.op1, sigma: x.op2 }
    : x.isNumberLiteral
      ? { value: x, sigma: x.engine.Zero }
      : undefined;

const make = (engine, value, sigma, numericApproximation) =>
  engine.function("UserMeasurement", [
    value.evaluate({ numericApproximation }),
    sigma.evaluate({ numericApproximation }),
  ]);

// √(a² + b²)
const quadrature = (engine, a, b) =>
  engine.function("Sqrt", [
    engine.function("Add", [
      engine.function("Square", [a]),
      engine.function("Square", [b]),
    ]),
  ]);

// Combine every measurement and number operand of a sum or a product into
// one fold, when at least one of them is a measurement
function fold(ops, { engine, numericApproximation }, step) {
  const operands = [];
  ops.evaluated.forEach((x, i) => {
    if (parts(x)) operands.push(i);
  });
  if (operands.length < 2) return undefined;
  if (!operands.some((i) => ops.evaluated[i].operator === "UserMeasurement"))
    return undefined;
  const p = operands
    .map((i) => parts(ops.evaluated[i]))
    .reduce((a, b) => step(a, b, engine));
  return [
    { value: make(engine, p.value, p.sigma, numericApproximation), operands },
  ];
}

// The derivatives of the functions that this kind propagates an error through
const DERIVATIVE = {
  Sin: (x) => ["Cos", x],
  Cos: (x) => ["Negate", ["Sin", x]],
  Exp: (x) => ["Exp", x],
};

ce.declareType("umeasurement", "value", { mint: false });

ce.declare("UserMeasurement", {
  signature: "(number, real) -> umeasurement",
  arithmetic: {
    admittedAs: "number",

    // A sum: the nominal values add, the uncertainties add in quadrature
    add: (ops, context) =>
      fold(ops, context, (a, b, engine) => ({
        value: engine.function("Add", [a.value, b.value]),
        sigma: quadrature(engine, a.sigma, b.sigma),
      })),

    // A product: the first-order propagation of two independent errors
    multiply: (ops, context) =>
      fold(ops, context, (a, b, engine) => ({
        value: engine.function("Multiply", [a.value, b.value]),
        sigma: quadrature(
          engine,
          engine.function("Multiply", [b.value, a.sigma]),
          engine.function("Multiply", [a.value, b.sigma])
        ),
      })),

    negate: (x, { engine, numericApproximation }) => {
      const p = parts(x.evaluated);
      if (!p) return undefined;
      const value = engine.function("Negate", [p.value]);
      return make(engine, value, p.sigma, numericApproximation);
    },

    // The order of the nominal values
    compare: (a, b) => {
      const [x, y] = [parts(a.exact())?.value, parts(b.exact())?.value];
      if (!x?.isNumberLiteral || !y?.isNumberLiteral) return undefined;
      if (x.isEqual(y) === true) return 0;
      const less = x.isLess(y);
      return less === undefined ? undefined : less ? -1 : 1;
    },

    // Every other operator that accepted the value as a number
    apply: (operator, ops, { engine, numericApproximation }) => {
      if (ops.evaluated.length !== 1) return undefined;
      const p = parts(ops.exact(0));
      if (!p) return undefined;
      // A function whose value jumps uses the exact nominal value
      if (operator === "Floor" || operator === "Ceil" || operator === "Round") {
        const value = engine.function(operator, [p.value]);
        return make(engine, value, p.sigma, numericApproximation);
      }
      const d = DERIVATIVE[operator];
      if (!d) return undefined; // The expression stays unevaluated
      const sigma = engine.function("Multiply", [
        engine.function("Abs", [engine.box(d(p.value))]),
        p.sigma,
      ]);
      const value = engine.function(operator, [p.value]);
      return make(engine, value, sigma, numericApproximation);
    },
  },
});
```

With these declarations, and `U` for `["UserMeasurement", 2, 0.1]`:

```js
ce.box(["Add", U, ["UserMeasurement", 3, 0.2]]).evaluate();
// ➔ UserMeasurement(5, 0.2236…)
ce.box(["Subtract", U, U]).simplify();
// ➔ UserMeasurement(0, 0.1414…): the two errors are independent
ce.box(["Multiply", 2, U]).evaluate();
// ➔ UserMeasurement(4, 0.2)
ce.box(["Sin", U]).evaluate();
// ➔ UserMeasurement(sin(2), 0.0416…), through `apply`
ce.box(["Floor", ["UserMeasurement", 2.5, 0.1]]).evaluate();
// ➔ UserMeasurement(2, 0.1)
ce.box(["Sin", ["List", U, ["UserMeasurement", 1, 0.1]]]).evaluate();
// ➔ [UserMeasurement(sin(2), 0.0416…), UserMeasurement(sin(1), 0.0540…)]
ce.box(["Tan", U]).evaluate();
// ➔ tan(UserMeasurement(2, 0.1)): `apply` does not know `Tan`
ce.box(["Less", U, 3]).evaluate();   // ➔ True
ce.box(["Equal", U, 2]).evaluate();  // ➔ True
ce.box(["Max", U, ["UserMeasurement", 3, 0.5]]).evaluate();
// ➔ UserMeasurement(3, 0.5)
```

`Sqrt(U)` and `Square(U)` are `incompatible-type` errors, because this kind
has no `power` hook (first rule above).

An operator of your own declared over `real` with an `evaluate` handler is
an apply site too. With `h: (real) -> real`, `h(U)` calls `apply`, which does
not know `h`, so `h(U)` stays unevaluated. An operator that handles the kind
itself names the kind type in its parameter: with
`h2: (real | umeasurement) -> real | umeasurement`, the handler of `h2` runs.

#### Result types

The type of an expression with a value of a kind is found without
evaluating it. For an arithmetic operator, an apply site, or an operator
that names the kind type in a parameter, the default type is the kind type:
`x + GF8(1)` is typed `gf8`, `Sin(U)` is typed `umeasurement`, and
`GF8(3) · (1, 2)` is a `tuple<gf8, gf8>`. An operand that may hold a number
keeps the number arm: with `u: real | umeasurement`, `-u` is typed
`real | umeasurement`. An operator whose result type is not a number type
keeps it: `Less(U, 3)` is a `boolean`. `Max` and `Min` with a kind that has
`compare` are typed with the union of the types of their operands:
`Max(U, 3)` can be `3` or a `umeasurement`.

A kind whose hooks can give another type gives `resultType`. It receives
the name of the operator and the types of the operands (without their
shapes: a `list<uq^2>` operand is seen as `uq`), and answers a type, a type
string, or `undefined` for the default. The operator is `"Add"` for a sum
or a difference, and `"Power"` for `Sqrt`, `Root` and `Square`, with the
type of the exponent among the operand types. For example, a quantity whose
quotient by a quantity of the same unit is a number:

```js
ce.declareType("uq", "value", { mint: false });
ce.declare("Q", {
  signature: "(real, string) -> uq",
  arithmetic: {
    divide: (a, b, { engine }) => {
      const [x, y] = [a.evaluated, b.evaluated];
      if (x.operator !== "Q" || y.operator !== "Q") return undefined;
      if (x.op2.string !== y.op2.string) return undefined;
      return engine.number(x.op1.re / y.op1.re);
    },
    resultType: (operator) => (operator === "Divide" ? "number | uq" : undefined),
  },
});

ce.box(["Divide", ["Q", 6, "'m'"], ["Q", 3, "'m'"]]).type;  // ➔ number | uq
ce.box(["Divide", ["Q", 6, "'m'"], ["Q", 3, "'m'"]]).evaluate();  // ➔ 2
```

#### Fields that belong to the kind type

A symbol declared with a kind type has no head to ask, so three fields
belong to the kind TYPE, not to the head: `admittedAs`, `resultType` and
`compile.type`. Several heads can have the same kind type (the library
`ResidueClass` and your own head that returns `residue`). The heads of one
kind type that are declared at the same time must agree on these fields: a
head gives the same value or leaves the field out, and then uses the value
that another head gave. `admittedAs` is compared by value; `resultType` and
`compile.type` are compared by identity, so two heads share one function
or object. The engine refuses a declaration that does not agree.

The other fields (`add`, `multiply`, `negate`, `divide`, `power`, `compare`,
`apply` and `compile.value`) belong to the head. A value calls the hooks of
its own head: `MyMod(2, 4) + ResidueClass(1, 4)` stays as it is, because
each head folds only its own values.

#### The declaration checks

`ce.declare()` refuses an `arithmetic` field, with an error that names the
rule, when:

- the result type of an arm of the signature is not a kind type. It can be
  a kind type, a union of kind types, or one of these with the arms `nan`,
  `missing`, `nothing` or `error`. `-> residue | integer` is refused: the
  engine would keep the number rules away from every integer;
- the result type is a nominal type that is defined as anything other than
  exactly `value`, that has type parameters (`gf<7>`), that is defined as
  another nominal type, or that was declared without `{ mint: false }`;
- the field gives `add` but not `negate`;
- the fields of the kind type do not agree with another head of the type;
- the kind type is a library kind type (`residue`) and the field gives a
  `resultType` or a `compile.type` that the library left out, or another
  `admittedAs`. Such a field would change the arithmetic of every value and
  every symbol of the library type.

After a kind is declared, its type can be declared again only as a nominal
type defined as exactly `value`, with no type parameters and with
`{ mint: false }` (a `DeclareType` statement that runs again); any other
declaration of that type name is refused.

#### Scopes

The kind types are engine-wide, as all types are. The hooks belong to the
operator definition: a head declared with a kind in a nested scope keeps
its hooks for its values after the scope is popped, and a head of the same
name declared in another scope with other hooks does not change the values
of the first one. When a head is declared again without `arithmetic`, its
values have no hooks any more; its kind type remains a kind type, so its
values and symbols are still protected from the number rules. A checkpoint
restore puts the kinds back as they were at the checkpoint.

#### Compiling a value of a kind

By default, `compile()` declines an expression that holds a value of a kind,
on every target: the number rules must never compute `c - c` as `0`. An
expression that may hold a number or a value of a kind (a parameter typed
`number | gf8`) compiles as a number.

A kind type can give a compiled representation with `compile` in its
`arithmetic` field (an `ArithmeticCompile`). `compile.type` belongs to the
kind type; `compile.value` gives the source of a literal value of the head.
Each hook receives `context.language` and answers `undefined` for a target
it does not support:

```js
ce.declare("GF8", {
  signature: "(integer) -> gf8",
  arithmetic: {
    // … the hooks of the example above …
    compile: {
      // The representation of the type `gf8`: `{ gf8: k }` in JavaScript
      type: {
        lowered: ({ language }) =>
          language === "javascript" ? "gf8" : undefined,
        add: (args, compile, { language }) =>
          language === "javascript"
            ? `({ gf8: ${args.map((x) => `(${compile(x)}).gf8`).join(" ^ ")} })`
            : undefined,
        // The check of a value passed for a symbol of type `gf8`
        entry: (value) => Number.isInteger(value?.gf8),
      },
      // A literal `GF8(k)`
      value: (expr) => `({ gf8: ${expr.op1.re & 7} })`,
    },
  },
});

ce.declare("g", "gf8");
const f = compile(ce.parse("g + \\operatorname{GF8}(2)"), { to: "javascript" });
f.run({ g: { gf8: 1 } });  // ➔ { gf8: 3 }
f.run({ g: 1 });           // ➔ throws: the entry check refused the value
f.freeSymbolTypes.g;       // ➔ { type: "gf8", lowered: "gf8", … }
f.valueKinds;              // ➔ ["gf8"]
```

The fields of `compile.type`:

- `lowered(context)`: the name of the representation on the target, as
  `freeSymbolTypes[…].lowered` reports it. The name must not be one that the
  JavaScript runner reads as a number, a complex number or a list
  (`number`, `real`, `integer`, `complex`, `array`, `list`, `point`,
  `color`): a result of a kind is returned as the code makes it, and the
  host would read it wrongly;
- `add(args, compile, context)` and `multiply(…)`: a sum and a product with
  an operand of the kind. A number operand beside a value of the kind is
  the hook's to convert;
- `apply(operator, args, compile, context)`: the other arithmetic operators,
  the comparisons and the other operators with an operand of the kind. The
  structural operators (`If`, `Block`, `List`, `Tuple`, `Assign`, `Hold`, a
  call of a user function) do not call it: they pass the representation as
  it is;
- `entry(value, context)`: the check of a host value given for a symbol of
  the kind type, when the compiled code runs;
- `shippable` and `hostNames`: see below.

An operation that the contract does not define declines with a message
that names the kind type: with the contract above, `g · GF8(2)` declines
because there is no `multiply`.

Limits:

- An expression that holds a collection of values of a kind (`L + L` with
  `L: list<gf8>`, or `[GF8(1), GF8(2)]`) declines on every target: `entry`
  and `lowered` describe one value, not a collection.
- Code compiled with a kind contract cannot be stored and loaded again with
  `createJavaScriptRuntime().load()`: the `entry` check is a function of the
  host that compiled the code, and stored code cannot carry it. Run it with
  the `run()` of the compilation result. `CompilationResult.valueKinds` names
  the kind types of the code, and `entryPlan.kinds` the symbols that need an
  `entry` check.
- The result is `shippable` (it can be sent to a worker of the kernel pool
  as text) only when the contract of every kind in the code says
  `shippable: true`, lists no `hostNames`, and no input of the code is a
  value of a kind (its `entry` check could not run in the worker).
- Of the library kinds, only `Enclosure` gives a `compile` contract, for
  the `interval-js` target (see [Enclosures](#enclosures)). An expression
  with a residue class, a measurement or a quantity declines on every
  target.

#### Residue classes

A residue class, an element of $\mathbb{Z}/n\mathbb{Z}$, is the library kind
of the type `residue`: `ResidueClass(k, n)` declares its arithmetic with this
field, with `admittedAs: "none"` and no `compare` (classes have no order:
`ResidueClass(1, 5) < ResidueClass(2, 5)` stays unevaluated, and `Max` of
two classes is an error).

A head of your own can return `residue` too, and give its own arithmetic.
For example, a head for the classes of $\mathbb{Z}/n\mathbb{Z}$ whose `add`
and `multiply` give one fold for each modulus:

```js
ce.declare("MyMod", {
  signature: "(integer, integer) -> residue",
  arithmetic: {
    add: (ops, { engine }) => {
      /* group the `MyMod` operands by modulus; one fold for each modulus */
    },
    multiply: (ops, { engine }) => {
      /* the same, for a product */
    },
    negate: (x, { engine }) => {
      /* the class of -k */
    },
  },
});
```

`x + MyMod(2, 4) + MyMod(1, 4)` is then `x + MyMod(3, 4)`, and
`MyMod(2, 4) - MyMod(2, 4)` is `MyMod(0, 4)`. The rules of the type
`residue` apply to `MyMod`: `admittedAs` is `"none"`, and a head of your own
cannot give `residue` a `resultType` or a `compile.type`.

Do not extend `Add` or `Multiply` with an `evaluate` handler and
`{ extend: true }` to give a kind its arithmetic: that replaces the library
handler for the whole engine, and `x + x + 1 + 2` then stops combining to
`2x + 3`.

A `type` handler is not used for the protection from the number rules: an
operator whose values are of a kind declares the kind type in its
signature, even when it has a `type` handler.

#### Measurements and Quantities

`Measurement` and `Quantity` are two more library kinds. Use them as models
for a kind of your own: each one uses the hooks above, and nothing else.

**`Measurement(value, error)`** has the kind type `measurement`. It is a
nominal value with a standard uncertainty.

- It is accepted where a number is accepted (`admittedAs: "number"`), so
  `Sin`, `Floor`, `Hypot` and `Mean` accept it and call its `apply` hook.
  `apply` computes the value of the operator at the nominal, and
  propagates the uncertainty to first order: `f(a) ± |f′(a)|·σ`, and
  `√(Σ |∂f/∂xᵢ|²·σᵢ²)` for several uncertain operands. It uses the modulus
  of each partial derivative, so a complex nominal propagates by the same
  rule.
- A propagated uncertainty of 0 gives the bare value: `Cos(0 ± 0.1)` is
  `1`, and `Floor(2.5 ± 0.1)` is `2`. So the kind declares the result type
  `number | measurement` (`resultType`) for the operators where this can
  occur.
- `apply` answers `undefined`, and the call stays unevaluated, when the
  propagation has no answer: an infinite value or slope at the nominal
  (`Sqrt(0 ± 0.1)`, `Arcsin(1 ± 0.1)`), a jump of a step function within one
  σ of the nominal (`Floor(2.95 ± 0.1)`), an operator whose derivative the
  engine does not know (`Zeta`, a user operator `h: (real) -> real`), and
  an operator that uses an operand more than once in its formula
  (`Binomial`, `Determinant`).
- A complex nominal at a parameter that is real (`Floor`, `Mod`, `Hypot`)
  is an `incompatible-type` error when the call is evaluated, not when it is
  boxed: the type `measurement` does not tell a real nominal from a complex
  one.
- `compare` orders two measurements by their nominals, and answers
  `'unordered'` for a complex nominal. `isExact` answers `false`, and
  `numericValue` gives the nominal, so `Measurement(2.5, 0.1).re` is `2.5`.
- The uncertainties of two occurrences of one measurement are independent:
  `M − M` is `0 ± 0.141` for `M = 1 ± 0.1`, and `Sin(M)^2 + Cos(M)^2`
  simplifies to `1 ± 0.13`.

**`Quantity(magnitude, unit)`** has the kind type `quantity`. It is a value
with a physical unit.

- It is accepted only at the arithmetic operators, the comparisons, the
  operators that name `quantity` in their parameter type and the operators
  with a `value` parameter (`admittedAs: "none"`). The 24 trigonometric
  functions and `Abs` name `quantity`: `Sin(30 deg)` is `1/2`, and
  `Abs(-2 m)` is `2 m`. Every other operator refuses a quantity:
  `Floor(2 m)` and `Mean([2 m, 4 m])` are `incompatible-type` errors.
- `add` makes one fold for each physical dimension, in the unit with the
  largest scale: `x + 2 m + 30 cm + 4 s` is `x + 2.3 m + 4 s`. `resultType`
  answers `number | quantity` for `Multiply`, `Divide` and `Power`, since a
  product whose unit has no dimension is a plain number (`6 m / 3 m` is
  `2`).
- `compare` converts the two values to the finer of their units, and
  compares the magnitudes there; two values of different dimensions have no
  order.
- The value of a physical constant (`SpeedOfLight`) is a quantity.

**Reading how a term was written.** A temperature with an offset (`degC`,
`degF`) shows why a hook reads `ops.written[i]`. A difference of two
temperatures is a temperature interval: `20 degC − 5 degC` is `15 K`. A sum
of two temperatures adds their absolute values: `20 degC + 5 degC` is
`571.3 K`. The negation `−(5 degC)` is not the temperature `−5 degC`, so the
`negate` hook of `Quantity` declines a temperature with an offset, and the
term stays `Negate(5 degC)`. The `add` hook then reads the sign of each term
from the operand as it was written. A kind of your own can do the same:

```js
// A temperature in degrees Celsius. A difference of two temperatures is a
// number of kelvins.
const isCelsius = (x) => x?.operator === "Celsius";

ce.declareType("celsius", "value", { mint: false });
ce.declare("Celsius", {
  signature: "(real) -> celsius",
  arithmetic: {
    // The negation of a temperature is not a temperature: decline, so that
    // the term of a difference stays `Negate(Celsius(…))` on every route
    // (`evaluate()`, `simplify()`, `.N()`)
    negate: () => undefined,

    // Fold `a - b`: `Add(a, Negate(b))`, in canonical order
    add: (ops, { engine, numericApproximation }) => {
      const plus = [];
      const minus = [];
      ops.evaluated.forEach((x, i) => {
        const w = ops.written[i] ?? x;
        if (w.operator === "Negate" && isCelsius(w.op1))
          minus.push({ i, t: w.op1 });
        else if (isCelsius(w)) plus.push({ i, t: w });
      });
      if (plus.length !== 1 || minus.length !== 1) return undefined;
      const value = engine
        .function("Subtract", [plus[0].t.op1, minus[0].t.op1])
        .evaluate({ numericApproximation });
      return [{ value, operands: [plus[0].i, minus[0].i] }];
    },
  },
});

ce.box(["Subtract", ["Celsius", 20], ["Celsius", 5]]).evaluate();
// ➔ 15
ce.box(["Add", "x", ["Subtract", ["Celsius", 20], ["Celsius", 5]]]).evaluate();
// ➔ x + 15
ce.box(["Negate", ["Celsius", 5]]).evaluate();
// ➔ -Celsius(5)
ce.box(["Add", ["Celsius", 20], ["Celsius", 5]]).evaluate();
// ➔ Celsius(5) + Celsius(20): this hook does not fold a sum
```

When `negate` gives a value for such a term, the sum receives that value in
`ops.evaluated[i]`, and `ops.written[i]` still holds `Negate(…)`. This is
the same under `evaluate()`, `.N()` and `simplify()`: `simplify()` gives
the hook the term as it was written before the simplification of the
operands. So a kind whose `negate` gives `Celsius(−t)` also folds
`Celsius(20) − Celsius(5)` to `15` on the three routes.

#### Enclosures

`Enclosure(lo, hi)` is one more library kind, with the kind type
`enclosure`. It is a closed interval that holds ONE real number: the value
is somewhere in `[lo, hi]`. It is not the set `Interval(lo, hi)`:
`Abs(Enclosure(-1, 2))` is `Enclosure(0, 2)`, while `Abs` of the set is
its cardinality. Its LaTeX is `\mathrm{Enclosure}(a, b)`.

```js
ce.box(["Add", ["Enclosure", 0, 1], ["Enclosure", ["Rational", 1, 3], 2]]).evaluate();
// ➔ Enclosure(1/3, 3)
ce.box(["Sin", ["Enclosure", 0, "Pi"]]).evaluate();
// ➔ Enclosure(0, 1)
ce.box(["Sin", ["Enclosure", 0, 1]]).evaluate();
// ➔ Enclosure(0, sin(1))
ce.box(["Sin", ["Enclosure", 0, 1]]).N();
// ➔ Enclosure(0, 0.8414709848078966)
ce.box(["Divide", 1, ["Enclosure", 0, 1]]).evaluate();
// ➔ Enclosure(1, +oo)
ce.box(["Ln", ["Enclosure", -2, -1]]).evaluate();
// ➔ Indeterminate: the image is empty
```

- **The endpoints.** The canonical form orders them (`Enclosure(2, 1)` is
  `Enclosure(1, 2)`), and reads one operand as a point (`Enclosure(3)` is
  `Enclosure(3, 3)`) or converts a set `Interval` (`Enclosure(Interval(0,
  1))` is `Enclosure(0, 1)`). An endpoint can be a number, `+oo`, `-oo`, or
  an exact constant such as `Pi` or `Sin(1)`; an endpoint with a free
  variable (`Enclosure(a, 2)`) is kept, and the hooks leave such a value
  unevaluated until `a` has a value. A `NaN` endpoint, the same infinity
  twice and an empty set give the indeterminate value. An endpoint that is
  complex, or is a value of a kind, is an `incompatible-type` error.
- **It is accepted where a real is accepted** (`admittedAs: "real"`): every
  numeric function with a `real` parameter is an apply site, and `apply`
  gives the image of the function over the interval, with the critical
  points of the function (`Sin`, `Cos`, `Tan`, `Abs`, `Gamma`, …) and its
  poles: a pole inside gives the whole line `Enclosure(-oo, +oo)`, a pole
  or a domain boundary at an endpoint a half-line, and a domain that the
  interval does not reach the indeterminate value. The trigonometric
  functions read the angle in `ce.angularUnit`. An operator that the hook
  does not know (`Factorial`) stays unevaluated.
- **Exact and numeric endpoints.** Under `evaluate()`, when the endpoints are
  exact, the result has exact endpoints. Under `.N()`, or with a float
  endpoint, the endpoints are converted to machine doubles OUTWARD (the
  largest double below `lo`, the smallest double above `hi`), and the
  interval library of the engine computes the image:
  `Enclosure(0, Pi).N()` is `Enclosure(0, 3.1415926535897936)`. The
  endpoints are doubles at every `ce.precision`. They are rigorous for the
  rational operations (`+`, `−`, `×`, `/`, integer powers, `Abs`, the step
  functions); for the transcendental functions the outward step is the
  smallest move, and can miss the true value by one unit in the last place.
- **Two operands are independent.** `Enclosure(1, 2) − Enclosure(1, 2)` is
  `Enclosure(-1, 1)`, not `0`: the two intervals may hold two different
  reals.
- **The order.** `compare` answers `-1` or `1` for two intervals that do not
  overlap, `'<='` or `'>='` for two intervals that touch, and `undefined`
  for two intervals that overlap: `Enclosure(0, 1) < Enclosure(2, 3)` is
  `True`, `Enclosure(0, 1) <= Enclosure(1, 2)` is `True`, and
  `Enclosure(0, 2) < Enclosure(1, 3)` stays unevaluated. `Enclosure(1, 1) =
  1` is `True`. The `extremum` hook gives the interval of the larger (or
  smaller) ends: `Max(Enclosure(0, 2), Enclosure(1, 3))` is
  `Enclosure(1, 3)`.
- **The result types.** The image of `Sin`, `Cos`, `Abs` and the other
  functions whose image is never empty is typed `enclosure`; a sum or a
  product is `enclosure` when no operand can be infinite (`x + 1` with
  `x: enclosure`), and `enclosure | nan` otherwise; every other operator is
  `enclosure | nan`, because its image can be empty.

**An example of a kind that compiles.** `Enclosure` gives a `compile`
contract for the `interval-js` target, and none for the other targets,
which decline it. An enclosure is the `{ lo, hi }` interval of that
target, and the hooks emit, for each operation, the same function of the
interval library that `.N()` calls, so the compiled code and `.N()` give
the same doubles:

```js
ce.declare("x", "enclosure");
const f = compile(ce.parse("\\sin(x) + 1"), { to: "interval-js" });
f.freeSymbolTypes.x;           // ➔ { type: "enclosure", lowered: "interval", … }
f.run({ x: { lo: 0, hi: 1 } }); // ➔ { kind: "interval", value: { lo: 1, hi: 1.841470984807897 } }
f.run({ x: { lo: 1, hi: 0 } }); // ➔ throws: the entry check refused the value
compile(ce.parse("x + 1"), { to: "javascript", fallback: false });
// ➔ throws: Could not compile an expression that holds a value of the kind
//   type 'enclosure' to target 'javascript'
```

The runner checks the value of each input whose type can hold an
enclosure, before the code runs: a record `{ lo, hi }` with `lo <= hi`, no
`NaN` and not the same infinity twice, or a finite number (a point).
`broadcast()` and `broadcastAsync()` check every cell before the loop. A
compiled comparison answers `'true'`, `'false'` or `'maybe'`; it compares
doubles exactly (without the engine tolerance), and it has no information
about identical operands (`c <= c` is `'maybe'` for an interval that is not
a point, where the interpreter answers `True`). An operator that the
interpreter leaves unevaluated declines, and with `fallback: true` the
compilation throws instead of running the interpreter, because the fallback
of this target would give a number to `x`. The code cannot be loaded again
from its stored form, and an input typed `list<enclosure>` declines.

### Declaring the Effects of a Function

If your function does something besides returning a value — draws a random
number, writes a symbol, calls the network, prints — say so. The Compute Engine
uses that information to decide what it may cache, share or re-evaluate, and a
function that quietly lies about it will produce stale results.

**To declare effects**, use the `effects` property, an array of labels (or the
string `'any'` for "unknown effects"):

```js
ce.assign("lastId", 0);

ce.declare("nextId", {
  signature: "() -> integer",
  effects: ["scope"],
  evaluate: (_ops, { engine }) => {
    const n = engine.box("lastId").evaluate().re + 1;
    engine.assign("lastId", n);
    return engine.number(n);
  },
});

ce.lookupDefinition("nextId").operator.signature.toString();
// ➔ "() scope -> integer"

ce.box(["nextId"]).evaluate();  // ➔ 1
ce.box(["nextId"]).evaluate();  // ➔ 2
```

Equivalently, write the effects directly in the signature string, in the slot
between the argument list and the arrow:

```js
ce.declare("now", {
  signature: "() time -> number",
  evaluate: (_ops, { engine }) => engine.number(Date.now()),
});

ce.box(["now"]).isPure;
// ➔ false
```

The nine labels and the `any` and `pure` keywords are described in
[Effect Specifiers](/compute-engine/guides/types/#effect-specifiers).

The older `pure` and `drawsRandom` flags are still accepted as shorthand —
`drawsRandom: true` is `effects: ["random"]`, and a bare `pure: false` means
`effects: 'any'` — and both are now *derived* from the effect set rather than
stored separately. Declarations that contradict themselves are rejected at
registration rather than resolved silently:

```js
ce.declare("bad", { signature: "(number) -> number", pure: true, drawsRandom: true });
// ➔ throws: the 'pure' and 'drawsRandom' flags are contradictory

ce.declare("bad", { signature: "(number) random -> number", pure: true });
// ➔ throws: the declared effects and the 'pure'/'drawsRandom' flags disagree
```

For a function defined by a body rather than a JavaScript handler, effects are
**inferred** from the body unless you state them. Stating them makes them a
contract: every body later assigned to that symbol must stay within the
declared set, or the assignment fails with an `incompatible-type` error. See
[Inferred and Declared Effects](/compute-engine/guides/types/#inferred-and-declared-effects).

**To require an effect-free argument**, give the parameter a function signature
with a bare arrow — `signature: "((any) -> number, real, real) -> real"` says
"the first argument must be a pure callback", and it is checked when the
operator is applied.

Alternatively, an `evaluate` handler can inspect its operands at run time and
decline. Which property to read depends on what the handler will do with the
operand — the difference between *invoking* a value and *evaluating* an
expression:

- **A callback the handler will invoke**: read `op.type.effects`, the latent
  set on the operand's arrow. It resolves through symbol bindings, so a symbol
  bound to a drawing function reports `["random"]`. The value is `undefined`
  (no effects), `[]` (declared pure), `'any'` (unknown), or the labels.

```js
ce.declare("sampleWith", {
  signature: "(function, integer) -> number",
  evaluate: ([f, n], { engine }) => {
    const latent = f.type.effects;
    if (latent === "any" || (latent !== undefined && latent.length > 0))
      return engine.error([
        "incompatible-type",
        "a pure callback",
        `a callback with ${latent === "any" ? "unknown" : latent} effects`,
      ]);
    let sum = 0;
    for (let i = 1; i <= n.re; i++)
      sum += engine.function("Apply", [f, i]).N().re;
    return engine.number(sum);
  },
});

ce.box(["sampleWith", ["Function", ["Multiply", "x", 2], "x"], 3]).evaluate();
// ➔ 12

ce.box(["sampleWith", ["Function", ["Random"], "x"], 3]).evaluate();
// ➔ ["Error", ["ErrorCode", "'incompatible-type'", "'a pure callback'",
//                 "'a callback with random effects'"]]
```

- **A held expression the handler will evaluate**: read `expr.effects`, the
  effects of evaluating it. (`expr.isPure` is the boolean summary of the same
  answer; `effects` says *which*, so the error message can name them.)

```js
ce.declare("assertPure", {
  signature: "(any) -> any",
  lazy: true,
  evaluate: ([body], { engine }) => {
    const effects = body.canonical.effects;
    if (effects === undefined) return body.canonical.evaluate();
    return engine.error([
      "incompatible-type",
      "a pure operand",
      `an operand with ${effects === "any" ? "unknown" : effects} effects`,
    ]);
  },
});

ce.box(["assertPure", ["Add", 1, 2]]).evaluate();
// ➔ 3

ce.box(["assertPure", ["Assign", "q", 1]]).evaluate();
// ➔ ["Error", ["ErrorCode", "'incompatible-type'", "'a pure operand'",
//                 "'an operand with scope effects'"]]
```

### Host Capabilities: Redirecting and Denying Console I/O

Some operators reach outside the engine. `Print` writes to the console and
`Input` reads a line from the terminal or from the browser's `prompt()` dialog.
They do not call the host directly: they use a **handler** that the engine
holds in `ce.effects`, and your application can replace that handler or deny it.

**To redirect console output and supply input**, assign a `console` handler:

```js
const lines = [];

ce.effects = {
  console: {
    log: (line) => lines.push(line),
    readLine: (prompt) => "Ada",
  },
};

ce.box(["Print", "'Hello'", ["Add", 1, 2]]).evaluate();
// lines ➔ ["Hello 3"]

ce.box(["Input", "'Name? '"]).evaluate();
// ➔ "Ada"
```

`log(line)` receives each printed line, without a trailing newline.
`readLine(prompt)` is synchronous and returns one of three things:

- a string: the line that was read;
- `null`: end of input, or the user canceled. `Input` evaluates to `Nothing`;
- `undefined`: this host has no interactive input. `Input` stays unevaluated.

The registry is per engine, and an assignment is a complete description:
`ce.effects = {}` puts the default handler back.

**To deny a capability**, set its handler to `null`. The operator then
evaluates to an error value and does not reach the host. It does not throw.

```js
ce.effects = { console: null };

ce.box(["Print", "'secret'"]).evaluate();
// ➔ ["Error", ["ErrorCode", "'capability-denied'", "'console'"]]
```

**To make a change for one block of code only**, use `ce.withEffects()`. The
previous handlers come back when the callback returns or throws, and, when the
callback returns a promise, when that promise settles. This is how to evaluate
an expression you do not trust:

```js
const result = ce.withEffects({ console: null }, () => expr.evaluate());
```

Calls nest: a capability that an inner call does not mention keeps the handler
of the outer call.

Each evaluation uses the handlers that were installed **when it started**.
Assigning `ce.effects` while an evaluation runs does not change that
evaluation, and a `withEffects()` call made for one asynchronous evaluation does
not change another one that is suspended on the same engine. One consequence to
know: while the promise of an asynchronous `withEffects()` callback is pending,
its handlers are the installed ones, so an unrelated evaluation that *starts*
during that time also uses them.

**To use a capability in your own operator**, declare the effect label in the
signature and read the handler from the `options` argument of the `evaluate`
handler — not from `ce.effects`, so that your operator follows the rule above:

```js
ce.declare("Warn", {
  signature: "(string) console -> nothing",
  evaluate: ([message], { engine, effects }) => {
    if (effects.console === null)
      return engine.error(["capability-denied", "console"]);
    effects.console.log("warning: " + message.string);
    return engine.Nothing;
  },
});
```

An `evaluateAsync` handler that starts nested evaluations must hand the
handlers on: pass the `options` it received to `evaluateAsync()`. To change
one option, copy the others — `op.evaluateAsync({ ...options,
numericApproximation: true })` — and do not build the object from nothing.

The `options` also carry the scopes of the evaluation, for example the scope
of the index of an enclosing `Sum`. The engine installs them only while the
evaluation's own synchronous code runs, because other code can run on the
engine while a handler is suspended. Before the first `await` of an
`evaluateAsync` handler they are in place. After it, synchronous work that
reads the scope (canonicalizing a held operand with `x.canonical`,
`ce.box()`, `ce.parse()`, `evaluate()`, `ce.assign()`) must run inside
`ce.withEvaluationContext(options, fn)`:

```js
evaluateAsync: async ([x], options) => {
  await somethingSlow();
  return ce.withEvaluationContext(options, () => x.canonical).evaluateAsync(options);
},
```

Outside it, an index of an enclosing `Sum` stays symbolic, and a global
symbol with its name is declared. A nested `evaluateAsync(options)` call does
not need it.

**The `entropy` handler** is the unseeded source of randomness: an object with
one method, `random()`, that returns a uniform number in `[0, 1)`
(`Math.random` by default). `RandomExpression` draws from it, and so does every
random operator — `Random`, `RandomShuffle`, `RandomChoice`, `RandomPrime`, the
Monte-Carlo estimators — when it is evaluated **outside** a `WithRandomSeed`
frame. Inside a frame the draws come from the seeded stream and the handler is
not consulted. A constant handler makes unframed random results reproducible in
a test; `entropy: null` makes each unframed random operator evaluate to a
`capability-denied` error value that names the operator:

```js
ce.effects = { entropy: { random: () => 0.25 } };
ce.box(["Random"]).evaluate();
// ➔ 0.25

ce.effects = { entropy: null };
ce.box(["Random"]).evaluate();
// ➔ ["Error", ["ErrorCode", "'capability-denied'", "'entropy'"], "'Random'"]

ce.box(["WithRandomSeed", 42, ["Random"]]).evaluate();
// ➔ 0.7367300395263549   (seeded: the handler is not used)
```

A compiled function draws from the same handler, but a denied handler makes it
throw a `CapabilityDeniedError` at run time: compiled code has no error-value
channel.

Only `console` and `entropy` have a handler today. The other capability labels
(`network`, `fs_read`, `fs_write`, `time`, `environment`) will get one together
with the first library operator that needs it.

### Declaring an Operator that Binds a Variable

Some operators own a **bound variable**: the `k` of a summation, the `x` of a
derivative or an integral. A bound variable is not an ordinary argument — it
must be a *new* variable belonging to the operator, shadowing any same-named
symbol outside it, and it must stay symbolic even if a symbol of the same name
has a value.

**To declare a binder**, give the `scoped` property a **binding-site
selector** instead of `true`. The selector tells the engine which operands are
binding sites; the engine then declares those variables in the operator's own
scope before your operands are canonicalized, and makes every occurrence in
the other operands refer to that binding — consistently across the LaTeX,
MathJSON, and `ce.function()` routes.

The prebuilt selectors cover the common shapes:

- `operandSites(...indices)` — the operands at these positions are bare
  bound-variable symbols (like `Series`' expansion variable).
- `operandsFrom(first)` — every operand from position `first` on is a bound
  variable (like `D`'s variadic differentiation variables).
- `indexingSetSites(first)` — the first element of each `Element`- or
  `Limits`-shaped operand from position `first` on is a bound variable (like
  `Sum`, `Product`, or a comprehension: `["Element", "k", collection]`).
- `limitsIndexSites(op)` — the index inside the single `Limits` operand at
  position `op`.

For example, an operator that computes the maximum of an expression over an
indexing set:

```js
import { ComputeEngine, indexingSetSites } from "@cortex-js/compute-engine";

const ce = new ComputeEngine();

ce.declare("MaxOver", {
  lazy: true,
  scoped: indexingSetSites(1),
  signature: "(expression, expression) -> number",
  evaluate: (ops, { engine }) => {
    // A lazy operator receives its operands unevaluated: canonicalize
    // the ones you consume.
    const body = ops[0].canonical;
    const elem = ops[1].canonical; // Element(k, collection)
    const k = elem.op1.symbol;
    const coll = elem.op2.evaluate();
    let best;
    for (const v of coll.each()) {
      const val = body.subs({ [k]: v }).evaluate().re;
      if (best === undefined || val > best) best = val;
    }
    return best === undefined ? undefined : engine.number(best);
  },
});
```

The engine guarantees the binding behavior without further work in the
handler. Even with a same-named global that has a value, the bound variable is
the operator's own:

```js
ce.parse("k := 100").evaluate();

const e = ce.box([
  "MaxOver",
  ["Subtract", ["Multiply", "k", 6], ["Power", "k", 2]],
  ["Element", "k", ["List", 1, 2, 3, 4, 5]],
]);
console.log(e.evaluate());
// ➔ 9        (max of 6k - k² over {1…5}, at k = 3 — not affected by k := 100)
console.log(ce.parse("k").evaluate());
// ➔ 100      (the global k is untouched)
```

A few notes:

- `scoped: true` (without a selector) still means "this operator has a scope,
  but no syntactic bound variables" — appropriate for `Block`-like operators
  whose scope holds declarations.
- With multiple indexing clauses, **later clauses see earlier bindings**: a
  collection expression in clause 2 may reference the index of clause 1, and a
  collection in clause 1 that mentions the *name* of clause 2's index refers
  to the enclosing scope, not the later clause.
- A parameter or index named after a library constant (`Pi`, `e`, `i`) is
  bound like any other variable inside the operator; the constant is
  unaffected outside it.

**To define a function without specifying a body for it**, specify
the signature of the function as the second argument of `ce.declare()` or
use the `"function"` type.

```js
ce.declare("triple", "function");
```



Functions that do not have an evaluate handler or a function literal as a 
value remain unchanged when evaluated.

You can set the body of the function later using `ce.assign()`:


When using `ce.assign()` to define a function, the value can be a JavaScript
function, a MathJSON expression or a LaTeX expression.

```js
ce.assign("double", ([x]) => x.mul(2));

ce.assign("double", ["Function", ["Multiply", "x", 2], "x"]);

ce.assign("double",ce.parse("x \\mapsto 2x"));
```

If the function literal declares the types of its parameters (and, optionally,
its return value), the assigned function is given that typed signature, and in
strict mode its arguments are checked at each call:

```js
ce.assign("double", ["Function",
  ["Typed", ["Multiply", "x", 2], "'integer'"],
  ["Typed", "x", "'integer'"]]);
// double now has the signature (x: integer) -> integer
```

A function assignment may refer to the function being defined; a separate
declaration is not required for recursion:

```js
ce.parse("factorial(n) := n \\cdot factorial(n-1)").evaluate();
```

Numeric evaluation also continues through user-defined functions. For example,
after `f(x) := x/3`, `f(2).evaluate()` is the exact value `2/3`, while
`f(2).N()` is its numeric approximation. The approximation is evaluated in the
function's own lexical scope.


<ReadMore path="/compute-engine/reference/functions/" >
Learn more about the standard operator to manipulate **functions**. <Icon name="chevron-right-bold" />
</ReadMore>

### Declaring a Sequence with Subscript Evaluation

Mathematical sequences like Fibonacci numbers ($F_n$), indexed coefficients
($a_n$), or matrix elements ($M_{i,j}$) are commonly written using subscript
notation. You can define custom evaluation logic for subscripted symbols using
the `subscriptEvaluate` handler.

```js
// Define a sequence of squares: S_n = n²
ce.declare("S", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(n * n);
  },
});

ce.parse("S_{5}").evaluate();   // → 25
ce.parse("S_3").evaluate();     // → 9
ce.parse("S_n").evaluate();     // → stays as Subscript(S, n)
```

The `subscriptEvaluate` handler receives:
- `subscript`: the subscript expression (already evaluated)
- `options`: an object with `engine` (the ComputeEngine) and `numericApproximation`
  (true when called from `.N()`)

**Return `undefined`** to keep the expression symbolic. This is useful when the
subscript contains unknowns or is outside the valid range.

```js
// Fibonacci sequence with memoization
const fibMemo = new Map();
const fib = (n) => {
  if (n <= 1) return n;
  if (fibMemo.has(n)) return fibMemo.get(n);
  const result = fib(n - 1) + fib(n - 2);
  fibMemo.set(n, result);
  return result;
};

ce.declare("F", {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    return engine.number(fib(n));
  },
});

ce.parse("F_{10}").evaluate();  // → 55
ce.parse("F_n").evaluate();     // → Subscript(F, n) - stays symbolic
```

**Multi-index subscripts** (like matrix elements) receive the subscript as a
`Tuple` expression:

```js
import { isFunction } from '@cortex-js/compute-engine';

const matrix = [[1,2,3], [4,5,6], [7,8,9]];

ce.declare("M", {
  subscriptEvaluate: (subscript, { engine }) => {
    if (isFunction(subscript, "Tuple")) {
      const [i, j] = subscript.ops;
      const row = matrix[i.re - 1];  // 1-indexed
      if (row && row[j.re - 1] !== undefined) {
        return engine.number(row[j.re - 1]);
      }
    }
    return undefined;
  },
});

ce.parse("M_{2,3}").evaluate();  // → 6
```

Subscripted expressions with `subscriptEvaluate` have type `number` and can be
used in arithmetic:

```js
ce.parse("S_{5} + S_{3}").evaluate();  // → 34 (25 + 9)
ce.parse("2 * F_{10}").evaluate();     // → 110 (2 × 55)
```

### Declarative Sequence Definitions

For common mathematical sequences defined by recurrence relations, the
`declareSequence()` method provides a simpler declarative API:

```js
// Fibonacci sequence: F_n = F_{n-1} + F_{n-2}, with F_0 = 0, F_1 = 1
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

ce.parse('F_{10}').evaluate();  // → 55
ce.parse('F_{20}').evaluate();  // → 6765
```

The `SequenceDefinition` object accepts:

| Property | Type | Description |
|----------|------|-------------|
| `base` | `Record<number, number \| Expression>` | **Required.** Base cases as index → value mapping |
| `recurrence` | `string \| Expression` | **Required.** Recurrence relation (LaTeX string or expression) |
| `variable` | `string` | Index variable name (default: `'n'`) |
| `memoize` | `boolean` | Cache computed values (default: `true`) |
| `domain` | `{ min?: number, max?: number }` | Valid index range |

**Examples:**

```js
// Arithmetic sequence: a_n = a_{n-1} + 2
ce.declareSequence('A', {
  base: { 0: 1 },
  recurrence: 'A_{n-1} + 2',
});
ce.parse('A_{5}').evaluate();  // → 11

// Factorial via recurrence: n! = n × (n-1)!
ce.declareSequence('H', {
  base: { 0: 1 },
  recurrence: 'n \\cdot H_{n-1}',
});
ce.parse('H_{5}').evaluate();  // → 120

// Triangular numbers: T_n = T_{n-1} + n
ce.declareSequence('T', {
  base: { 0: 0 },
  recurrence: 'T_{n-1} + n',
});
ce.parse('T_{5}').evaluate();  // → 15

// Using a custom index variable
ce.declareSequence('W', {
  variable: 'k',
  base: { 0: 1 },
  recurrence: 'W_{k-1} + k',
});
ce.parse('W_{5}').evaluate();  // → 16

// With domain constraints (only valid for n ≥ 1)
ce.declareSequence('X', {
  base: { 1: 1 },
  recurrence: 'X_{n-1} + 1',
  domain: { min: 1 },
});
ce.parse('X_{5}').evaluate();  // → 5
ce.parse('X_{0}').evaluate();  // → stays symbolic (outside domain)
```

**Symbolic behavior:** When the subscript is symbolic or non-integer, the
expression stays symbolic:

```js
ce.parse('F_k').evaluate();     // → Subscript(F, k) - stays symbolic
ce.parse('F_{1.5}').evaluate(); // → Subscript(F, 1.5) - stays symbolic
```

**Memoization:** By default, computed values are cached for efficiency. This is
especially important for sequences like Fibonacci that have exponential
complexity without memoization:

```js
// Fast even for large indices thanks to memoization
ce.parse('F_{30}').evaluate();  // → 832040 (computed quickly)
```

To disable memoization (e.g., for memory-constrained environments):

```js
ce.declareSequence('O', {
  base: { 0: 1 },
  recurrence: 'O_{n-1} + 1',
  memoize: false,
});
```

### LaTeX-Based Sequence Definitions

Sequences can also be defined using natural LaTeX assignment notation. This is
especially useful in interactive environments or when working with mathematical
notation directly:

```js
// Arithmetic sequence via LaTeX
ce.parse('L_0 := 1').evaluate();
ce.parse('L_n := L_{n-1} + 2').evaluate();
ce.parse('L_{5}').evaluate();  // → 11

// Fibonacci via LaTeX
ce.parse('F_0 := 0').evaluate();
ce.parse('F_1 := 1').evaluate();
ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.parse('F_{10}').evaluate();  // → 55

// Factorial via LaTeX
ce.parse('D_0 := 1').evaluate();
ce.parse('D_n := n \\cdot D_{n-1}').evaluate();
ce.parse('D_{5}').evaluate();  // → 120
```

**Order independence:** Base cases and recurrence can be defined in any order.
The sequence is finalized when both a base case and a recurrence relation are
present:

```js
// Recurrence first, then base case
ce.parse('K_n := K_{n-1} + 1').evaluate();
ce.parse('K_0 := 0').evaluate();  // Sequence finalized here
ce.parse('K_{5}').evaluate();  // → 5
```

**How it works:** The system detects sequence definitions by checking if the
right-hand side contains self-references (like `L_{n-1}` when defining `L_n`).
Assignments without self-references are treated as function definitions instead:

```js
// This defines a function f(x) = x², not a sequence
ce.parse('f_x := x^2').evaluate();
ce.parse('f_{3}').evaluate();  // → 9
```

### Sequence Status and Introspection

You can query the status of sequence definitions and inspect defined sequences:

```js
// Check if a sequence is fully defined
ce.parse('F_0 := 0').evaluate();
ce.getSequenceStatus('F');
// → { status: 'pending', hasBase: true, hasRecurrence: false, baseIndices: [0] }

ce.parse('F_n := F_{n-1} + F_{n-2}').evaluate();
ce.getSequenceStatus('F');
// → { status: 'complete', hasBase: true, hasRecurrence: true, baseIndices: [0] }

// For non-sequences:
ce.getSequenceStatus('x');
// → { status: 'not-a-sequence', hasBase: false, hasRecurrence: false }
```

**Introspection methods** let you examine and manage defined sequences:

```js
// Get detailed information about a sequence
ce.getSequence('F');
// → { name: 'F', variable: 'n', baseIndices: [0, 1], memoize: true, cacheSize: 5 }

// List all defined sequences
ce.listSequences();  // → ['F', 'A', 'T']

// Check if a symbol is a sequence
ce.isSequence('F');  // → true
ce.isSequence('x');  // → false

// Manage memoization cache
ce.getSequenceCache('F');  // → Map { 2 => 1, 3 => 2, 5 => 5, ... }
ce.clearSequenceCache('F');  // Clear cache for specific sequence
ce.clearSequenceCache();     // Clear all sequence caches
```

`getSequenceCache()` holds the exact terms only, with the index as the key.
The terms that `.N()` computes are kept apart, one set for each precision;
`clearSequenceCache()` clears both.

### Generating Sequence Terms

Generate a list of sequence terms with `getSequenceTerms()`:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Get terms from index 0 to 10 (inclusive)
ce.getSequenceTerms('F', 0, 10);
// → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]

// With a step parameter (every other term)
ce.getSequenceTerms('F', 0, 10, 2);
// → [0, 1, 3, 8, 21, 55]

// Starting from a non-zero index
ce.getSequenceTerms('F', 5, 10);
// → [5, 8, 13, 21, 34, 55]
```

### Sum and Product over Sequences

`Sum` and `Product` work seamlessly with user-defined sequences:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

// Sum of Fibonacci terms from k=0 to 10
ce.parse('\\sum_{k=0}^{10} F_k').evaluate();  // → 143

// Product over sequence terms
ce.declareSequence('A', {
  base: { 1: 1 },
  recurrence: 'A_{n-1} + 1',
});
ce.parse('\\prod_{k=1}^{5} A_k').evaluate();  // → 120 (factorial)
```

### OEIS Integration

The [Online Encyclopedia of Integer Sequences (OEIS)](https://oeis.org) contains
over 350,000 integer sequences. You can look up sequences and verify your
definitions against known mathematical sequences:

```js
// Look up a sequence by its terms
const results = await ce.lookupOEIS([0, 1, 1, 2, 3, 5, 8, 13]);
// → [{ id: 'A000045', name: 'Fibonacci numbers', terms: [...], url: '...' }]

// Each result contains:
// - id: OEIS sequence ID (e.g., 'A000045')
// - name: Sequence description
// - terms: First several terms
// - formula: Formula if available
// - url: Link to OEIS page
```

**Verify your sequences** against OEIS:

```js
ce.declareSequence('F', {
  base: { 0: 0, 1: 1 },
  recurrence: 'F_{n-1} + F_{n-2}',
});

const result = await ce.checkSequenceOEIS('F', 10);
// → {
//     matches: [{ id: 'A000045', name: 'Fibonacci numbers', ... }],
//     terms: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
//   }

if (result.matches.length > 0) {
  console.log(`Your sequence matches ${result.matches[0].name}!`);
}
```

**Options:**

```js
// Limit number of results
await ce.lookupOEIS([1, 2, 3, 4, 5], { maxResults: 3 });

// Set timeout (in milliseconds)
await ce.lookupOEIS([1, 2, 3, 4, 5], { timeout: 5000 });
```

> **Note:** OEIS lookups require network access to oeis.org.

## Overloading Functions

**Overloading** is the ability to define multiple functions with the same name.

**To overload a function**, use the `ce.declare()` methods.

For example, to overload the `Sqrt` function to return `NaN` for
non-real numbers, use the following code:

```js
const originalSqrtDefinition = ce.expr('Sqrt').operatorDefinition!;
ce.declare('Sqrt', {
  ...originalSqrtDefinition,
  evaluate: (x, options) => {
    const y = originalSqrtDefinition.evaluate!(x, options);
    return y?.isExtendedReal === false ? ce.NaN : y;
  },
});

ce.parse('\\sqrt{-2.5}').evaluate();     // ➔ NaN
ce.parse('\\sqrt{\\sin x}').evaluate();  // ➔ sqrt(sin(x))
```

`isExtendedReal` is the test for "lies on the real line", and it accepts
$\pm\infty$ along with the finite reals; only a value with a non-zero imaginary
part, or `NaN`, fails it. For a symbolic result such as `sqrt(sin(x))` it is
`undefined`, neither `true` nor `false`, so the guard compares with `false`:
a plain truth test would turn every symbolic result into `NaN`. Use `isFinite`
instead when the guard must also exclude the infinities — but note that
`isFinite` accepts a finite *complex* value, so it is not a substitute here.
An argument whose square root is reduced at canonicalization (`\sqrt{-4}` is
`2i`) does not reach the `evaluate` handler.

A redeclaration that replaces a handler, as `evaluate` above, is a user
definition. `compile()` cannot lower it as the library `Sqrt`: it reports
`success: false` and `run()` uses the interpreter. `D` differentiates it as an
unknown function. A copy that keeps the library handlers is still the library
operator for differentiation and compilation: after
`ce.declare('Sqrt', { ...ce.expr('Sqrt').operatorDefinition, description: '…' })`,
`compile(ce.parse('\\sqrt{\\sin x}'))` succeeds and
`D(sqrt(sin(x)), x)` is `cos(x) / (2sqrt(sin(x)))`. The rule: a definition of
a library name is the library operator when its `evaluate`, `canonical`,
`compile`, `derivative` and `evaluateAsync` handlers are the same function
objects as the library's, and its `lazy` and `broadcastable` flags have the
same values.

A copy declared under another name keeps that name. After
`const { name, ...sin } = ce.lookupDefinition('Sin').operator; ce.declare('MySin', sin)`,
`ce.box(['MySin', 'x']).evaluate()` is `MySin(x)`, and `MySin(π)` is `0`.

**To change part of a definition**, pass `{ extend: true }` as the third
argument of `ce.declare()`. The engine builds a new definition from the visible
one and the fields of the patch. A field the patch does not name keeps its
value. A field the patch names replaces the old value. This works for a name
declared in the same scope, where a plain `ce.declare()` throws, and for a
standard operator.

```js
// Widen the signature and keep the evaluate handler
ce.declare("SetMinus", { signature: "(value, value*) -> set" }, { extend: true });

ce.box(["SetMinus", ["Set", 1, 2, 3], ["Set", 2]]).evaluate();  // ➔ {1, 3}
ce.box(["SetMinus", 5, 2]);                                     // ➔ valid

// Add a description and keep every handler: D still differentiates Sin
ce.declare("Sin", { description: "The sine" }, { extend: true });
ce.box(["D", ["Sin", "x"], "x"]).evaluate();                    // ➔ cos(x)
```

The patch can carry any field of the definition: `signature`, `evaluate`,
`description`, `keywords`, `lazy`, … The field `addSignature` adds an overload
instead of replacing the signature: the signature becomes `old & new`. The new
signature must be a subtype of the old one, so that every call that was valid
stays valid; otherwise the call throws. With
`ce.declare("SetMinus", { addSignature: "(integer, integer) -> set" }, { extend: true })`,
the signature is `((set<any>, value*) -> set) & ((integer, integer) -> set)`.
It is an error to extend a name with no operator definition, a name declared as
a value, or a function defined by clauses. An expression boxed before the
extension keeps the old definition. The third argument can also be
`{ scope, extend }`; a scope alone as the third argument works as before.

The standard functions are in a `system` scope, so a new declaration in the
`global` scope or a child scope replaces the original declaration.


## Multi-Clause Function Definitions

**To define a function by cases** — separate definitions for particular
argument values, plus a general fallback — use the `DefineFunction`
operator. Unlike `Assign`, which replaces a binding wholesale,
`DefineFunction` **accumulates**: each statement adds a *clause*, and a
call dispatches to the most specific clause admitting its arguments
(declaration order only breaks ties between equally specific clauses).

```js
ce.box(['DefineFunction', 'fib',
  ['Function', 0, ['Typed', 'z', { str: '0' }]]]).evaluate();
ce.box(['DefineFunction', 'fib',
  ['Function', 1, ['Typed', 'o', { str: '1' }]]]).evaluate();
ce.box(['DefineFunction', 'fib',
  ['Function',
    ['Add', ['fib', ['Subtract', 'n', 1]], ['fib', ['Subtract', 'n', 2]]],
    ['Typed', 'n', { str: 'integer' }]]]).evaluate();

console.log(ce.box(['fib', 10]).evaluate().toString());
// ➔ 55
```

A parameter constrained to a single value (`{ str: '0' }` above) uses a
**value type**: the clause admits exactly that value. In Epsil, literal
parameters provide the same thing directly: `fib(0) = 0`.

The clause rules:

- A new clause with the **same parameter types** replaces the earlier
  clause in place (so re-running an edited definition behaves as
  expected); any other parameter list appends a clause.
- A plain assignment (`Assign`, `ce.assign()`) still **replaces the whole
  binding**, clauses and all.
- If a symbolic argument leaves dispatch undecided — a more specific
  clause *might* apply once the value is known — the call stays inert
  (symbolic) rather than committing to a fallback.
- If the evaluated arguments match **no** clause, the call is a
  `no-matching-clause` error value.
- Effects must be uniform across clauses: there is one effect row per
  function. An explicit specifier on one clause establishes the row;
  another clause's explicit specifier must agree, or the definition is
  rejected with `incompatible-clause-effects`.

**To inspect the clause set**, use `About`: it lists one line per clause
in declaration order, and annotates overlapping equal-specificity clauses
and clauses made unreachable by more specific ones covering their whole
(finite) domain.

**To define a function whose arguments are not evaluated** — the user-function
counterpart of an operator definition's `lazy` flag — pass the attribute
`{hold: True}` as `DefineFunction`'s third operand (in Epsil, the `hold`
prefix: `hold f(e) = Head(e)`). The arguments are bound to the parameters as
written, canonical and bound in the caller's scope but unevaluated; reading a
parameter in the body evaluates the argument there, and a structural operator
(`Head`, `Tail`, `Hold`) sees the expression itself. A hold definition is
installed as a `lazy` operator and is single-clause: a second clause, or a
value-typed (literal) parameter, is refused.

```js
ce.assign('a', 3);
ce.box(['DefineFunction', 'f',
  ['Function', ['Head', 'e'], 'e'],
  { dict: { hold: 'True' } }]).evaluate();
console.log(ce.box(['f', ['Add', 'a', 1]]).evaluate().toString());
// ➔ Add            (without the attribute: Integer — f receives 4)
```

The same attributes dictionary carries the other definition attributes:

- `bind: ["i"]` — with `hold`, the named parameters are **bound variables**:
  the call must pass a symbol there, and the parameter is substituted by that
  symbol in the body (`hold mySum(body, bind i, n) = Sum(body, i, 1, n)`),
  the definition being installed as a binder (`scoped: operandSites(…)`), so
  the call declares the symbol in its own scope like `Sum` does.
- `commutative`, `associative`, `idempotent`, `involution` — the operator
  flags of the same names, applied when a call is canonicalized. An
  associative function is binary; a flattened n-ary call is folded pairwise.
  Not with `hold`.
- `description: "…"` — the definition's description (`About`, editor
  hovers); in Epsil this is the doc comment written before the definition.


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
symbols, not LaTeX commands. For example, if you have a symbol `α`, use
`alpha`, not `\alpha` 
:::

```js
ce.declare({
  m: { type: "number", value: 5 },
  f: { type: "function" },
  g: { type: "function" },
  Smallfrac: {
    signature: "(number, number) -> number",
    evaluate: ([x,y]) => x.div(y),
  },
});
```

**To assign multiple functions and symbols**, use the `ce.assign()` method with
a dictionary of values.

```js
ce.assign({
  "m": 10,
  "f": ce.parse("x \\mapsto x^2 + x + 41"),
  "g": ce.parse("t \\mapsto t^3 + t^2 + 17"),
});
```

## Loading a Library

A set of definitions can be packaged as a **library**: an object with a `name`,
a `definitions` dictionary (the same entries as `ce.declare()` takes), and an
optional `requires` list with the names of the libraries it depends on.

**To load a library when the engine is created**, give it in the `libraries`
constructor option. **To load a library on a running engine**, call
`ce.loadLibrary(library)`. The definitions go in the global scope, as with
`ce.declare()`, and an expression boxed before the call uses them.

```js
ce.box(["Sq", 3]).evaluate();  // ➔ Sq(3)

ce.loadLibrary({
  name: "mine",
  definitions: {
    Sq: {
      signature: "(number) -> number",
      evaluate: ["Function", ["Square", "x"], "x"],
    },
  },
});

ce.box(["Sq", 3]).evaluate();  // ➔ 9
```

Each library in `requires` must already be loaded. The call throws, and
declares nothing, for a library name that is already loaded, a missing required
library, a standard library, or a definition that is invalid, repeated, or
already declared in the global scope. A checkpoint taken before the call
(`ce.checkpoint()`) undoes it.

`ce.libraryOf(name)` returns the name of the library that defines `name`:
`"trigonometry"` for `Sin`, the `name` of a loaded library for one of its
definitions, and `undefined` for a name declared with `ce.declare()` or a name
nothing defines.

```js
ce.libraryOf("Sq");   // ➔ "mine"
ce.libraryOf("Sin");  // ➔ "trigonometry"
```
