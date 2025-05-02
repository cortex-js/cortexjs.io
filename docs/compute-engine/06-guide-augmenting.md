---
title: Custom Functions and Symbols
slug: /compute-engine/guides/augmenting/
---

The [MathJSON Standard Library](/compute-engine/guides/standard-library/) is a
collection of definitions for **symbols** and **functions** such as `Pi`, `Add`,
`Sin`, `Power`, `List`, etc...

In this guide we discuss how to augment the MathJSON Standard Library with your
own definitions.

<ReadMore path="/compute-engine/guides/latex-syntax/#customizing-the-latex-dictionary" >
You may also be interested in **augmenting the LaTeX dictionary** which defines
how LaTeX is parsed from and serialized to MathJSON. 


This is useful if you want to add support for custom LaTeX macros that you'd 
like to parse to MathJSON. <Icon name="chevron-right-bold" />
</ReadMore>

## Introduction

When an identifier such as a symbol (`Pi`) or an operator (`Sin`) is encountered
in an expression, the Compute Engine will look up its definition in the set of
 known identifiers, including the Standard Library.

### Automatic Declaration

If the identifier is found, the definition associated with it will be
bound to the identifier and used later to evaluate the expression.

If the identifier is not found, an automatic declaration will be made of the
identifier as a symbol of type `unknown`, or a more specific type if the
context allows it.

<ReadMore path="/compute-engine/guides/types" >
Learn more about **types**.<Icon name="chevron-right-bold" />
</ReadMore>

To provide a more explicit definition for the identifier, you can [define it
using a LaTeX](#definitions-using-latex) expression, or an [explicit declaration](#explicit-declarations) using the `ce.declare()` method.

### Declarations are Scoped

The declaration of an identifier is done within a **lexical scope**. A scope 
is a hierarchical collection of definitions.

<ReadMore path="/compute-engine/guides/evaluate/#lexical-scopes-and-evaluation-contexts" >
Read more about **scopes** <Icon name="chevron-right-bold" />
</ReadMore>


## Definitions Using LaTeX

The simplest way to define a new symbol or operator (function) is to use LaTeX. 

For example, to define a new symbol $m$ with a value of $42$, use the
following LaTeX expression:

```js
ce.parse("m := 42").evaluate();
ce.parse("m").evaluate().print();
// ➔ 42
```

**Note**: the assignment expression must be evaluated to take effect.

To define a new function $f$ that multiplies its argument by $2$, use
the following LaTeX expression:

```js
ce.parse("f(x) := 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```


The `\mapsto` operator is an alternative syntax to define a function:

```js
ce.parse("f := x \\mapsto 2x").evaluate();
ce.parse("f(3)").evaluate().print();
// ➔ 6
```

**To define multiletter identifiers**, use the `\operatorname{}` command:

```js
ce.parse('\\operatorname{double}(x) := 2x').evaluate().print();
ce.parse('\\operatorname{double}(3)').evaluate().print();
// ➔ 6
```

**Note**: you can also use the `\mathrm{}` or `\mathit{}` commands to wrap
multiletter symbols.

The LaTeX identifiers are mapped to MathJSON identifiers. For example,
the LaTeX `\operatorname{double}` is mapped to the MathJSON identifier `double`.

```js
console.info(ce.parse('\\operatorname{double}(3)').json);
// ➔ ["double", 3]
```

## Explicit Declarations

**To have more control over the definition of a symbol or function** use
the `ce.declare()` method.

When declaring a symbol or function, you can specify the type of the symbol or signature of the function, its value or body, and other properties.

```js
// Declaring a symbol "m"
ce.declare("m",  "integer");

// Declaring a function "f"
ce.declare("f", {
  signature: "number -> number",
  evaluate: ce.parse("x \\mapsto 2x"),
});
```

### Declaring a Symbol

**To declare a symbol** use the `ce.declare()` method with the identifier
as the first argument and a type as the second argument.

```js
ce.declare("n", "integer");
```

<ReadMore path="/compute-engine/guides/types" >The type specifies the 
valid values of the symbol. For example, `boolean`, `integer`, `rational`, `function`, `string` etc.. Learn more about **types**.<Icon name="chevron-right-bold" /></ReadMore>

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
ce.box("m").value = 42;
```

**To prevent the value of a symbol from being changed**, set the `constant`
property to `true`:

```js
ce.declare("m_e", {
  value: 9.1e-31,
  constant: true,
});
```


### Declaring a Function

**To declare a function**, associate an `evaluate` handler, which 
is the body of the function, with an identifier.

```js
ce.declare("double", { 
  evaluate: ce.parse("x \\mapsto 2x") 
});
```

:::caution[Caution]
The first argument of `declare()` is a MathJSON identifier, not a LaTeX command.
For example, use `double` instead of `\operatorname{double}`.
:::

The evaluate handler can be either a MathJSON expression as above or 
a JavaScript function.

```js
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

The signature of the `evaluate` handler is `(args[], options)`, where:

- `args`: an array of the arguments that have been applied to the function. Each
  argument is a boxed expression. The array may be empty if there are no
  arguments.
- `options`: an object literal which includes an `engine` property that is the
  Compute Engine instance that is evaluating the expression and a `numericApproximation` property that is true if the result should be a numeric approximation.

Since `args` is an array, you can use destructuring to get the arguments:

```js
ce.declare("double", { evaluate: (args) => args[0].mul(2) });

// or
ce.declare("double", { evaluate: ([x]) => x.mul(2) });
```

In addition to the `evaluate` handler the function definition can include
a `signature` type that describes the arguments and return value of the
function.

```js
ce.declare("double", {
  signature: "number -> number",
  evaluate: ([x]) => x.mul(2),
});
```

See `FunctionDefinition` for more details on the other handlers and
properties that can be provided when defining a function.

**To define a function without specifying a body for it**, specify
the signature of the function as the second argument of `ce.declare()` or
use the `"function"` type.

```js
ce.declare("double", "function");
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


<ReadMore path="/compute-engine/reference/functions/" >
Learn more about the standard operator to manipulate **functions**. <Icon name="chevron-right-bold" />
</ReadMore>

## Overloading Functions

**To overload a standard function**, use the `ce.declare()` methods.

For example, to overload the `Sqrt` function to return `NaN` for
non-real numbers, use the following code:

```js
const originalSqrtDefinition = ce.box('Sqrt').operatorDefinition!;
ce.declare('Sqrt', {
  ...originalSqrtDefinition,
  evaluate: (x, options) => {
    const y = originalSqrtDefinition.evaluate!(x, options);
    return y?.isReal ? y : ce.NaN;
  },
});
```

In general, re-declaring a function in the same scope is not allowed and 
will throw an error. However, the standard functions are in a `system` scope
so a new declaration in the `global` scope or a child scope will
override the original declaration.


## Defining Multiple Functions and Symbols

**To define multiple functions and symbols**, use the `ce.declare()` method
with a dictionary of definitions.

:::info[Note]
The keys to `ce.declare()` (`m`, `f`, etc...) are MathJSON
identifiers, not LaTeX commands. For example, if you have a symbol `α`, use
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
