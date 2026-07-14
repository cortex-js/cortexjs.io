---
title: Functions
slug: /compute-engine/reference/functions/
---

<Intro>
Functions are first-class values in the Compute Engine. This means that
functions can be passed as arguments to other functions, returned from
functions, and assigned to variables.
</Intro>

The standard library can be extended with your own functions.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about adding new definitions to the Compute Engine.
</ReadMore>



<div className="symbols-table" style={{"--first-col-width":"23ch"}}>


| **Term**                    | **Definition** |
| :-----------------------------| :----------------|
| **Function Expression**     | An expression representing a **function application** where a function (or **operator**) is evaluated with arguments (the arguments are **applied to** the function). For example `["Add", 1, 2]` applies the arguments `1` and `2` to the operator `Add`.|
| **Function Signature**      | A type describing the function's inputs and outputs, e.g. `(real, integer) -> boolean` |
| **Function Literal**        | A first-class function value, defined using a construct like `["Function", body, params...]`, which may or may not capture variables from its lexical scope. |
| **Shorthand Function Literal** | A compact way to write a function literal using placeholders (e.g. `_` or `_2`) instead of explicitly listing parameters, e.g. `["Add", "_", 1]` desugared to `["Function", ["Add", "_", 1], "_"]`. |
| **Closure**                 | A function literal that **captures** one or more free variables from its defining lexical scope, preserving their values at the time of definition. The capture happens by simply referencing the variables in the function body. |
| **Anonymous Function**      | A function that is not bound to a symbol, often used as an argument to other functions. |

</div>



## Function Literals

A **function literal** is a first-class function value, defined using a
`["Function"]` expression. It can be passed as an argument to other functions, 
returned from a function, or assigned to a variable.

The `["Function"]` expression takes a body and a list of parameters.

```json example
["Sum", ["Function", ["Multiply", "x", 2], "x"]]
```

To specify a function literal with LaTeX use the `\mapsto` command:

<Latex value="x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

The examples in this section define functions as a simple expression, but 
function literals can include more complex control structures, including blocks,
local variables, loops and conditionals. 

For example, here's a simple "clamp" function, using a `["Block"]` expression.

```json example
["Function",
  ["Block",
    ["Assign", "x", ["Max", "x", "min"]],
    ["Min", "x", "max"]
  ],
  "x", "min", "max"
]
```

<ReadMore path="/compute-engine/reference/control-structures/" >Learn more about **control structures**. </ReadMore>

## Shorthand Function Literals

A **shorthand function literal** is a compact way to write a function literal 
without explicitly listing parameters.

A shorthand function literal can use either **wildcards** (`_`, `_2`, etc...) or 
**unknowns** (symbols that have no value) as implicit parameters.

The shorthand function literal is desugared to a function literal.

For example the shorthand function literal `["Multiply", "_", 2]` is desugared 
to `["Function", ["Multiply", "_", 2], "_"]`.

**To use wildcards in LaTeX**, they must be wrapped with an `\operatorname` command except for `\_`.

<Latex flow="column" value="\_ + \operatorname{\_2}"/>

```json example
["Add", "_", "_2"]
```


The shorthand function literal `["Multiply", "x", 2]` which uses the unknown `x`
is equivalent to the function literal `["Function", ["Multiply", "x", 2], "x"]`.
When using this form, make sure that the symbol `x` is not defined in the current scope.




A symbol which is the name of an operator (for example `Sin`) is also a valid
function literal  shorthand.

This expression will apply the `Sin` function to the elements of `xs`.

```json example
["Map", "xs", "Sin"]
```

It is equivalent to `["Map", "xs", ["Sin", "_"]]` which is desugared to 
`["Map", "xs", ["Function", ["Sin", "_"], "_"]]`.



## Anonymous Functions

A function that is not bound to a symbol is called an **anonymous
function**.

Anonymous functions are frequently used as arguments to other functions.

In the example below, the second argument of the `Map` function is an
anonymous function expressed as a function literal that multiplies its argument by `2`.

```json example
["Map", "xs", ["Function", ["Multiply", "x", 2], "x"]]
```

The same function can be expressed using a shorthand function literal, which
uses `_` as a wildcard for the parameter.

```json example
["Map", "xs", ["Multiply", "_", 2]]
```




## Evaluating a Function Literal

**To apply a function literal to some arguments** use an `["Apply"]` expression.

```json example
["Apply", ["Function", ["Add", 2, "x"], "x"], 11]
// ➔ 13

["Apply", ["Add", 2, "_"], 4]
// ➔ 6

["Apply", "Power", 2, 3]
// ➔ 8
```

The first argument of `Apply` is a function literal. The rest of the arguments are the
arguments that will be applied to the function literal.

### Broadcasting Over Collections

When a user-defined function with scalar parameter types is applied to a
finite indexed collection, the call is **broadcast** elementwise: the
function is applied to each element and the results are returned as a
new `List`.

```js example
ce.assign('f', ce.parse('x \\mapsto x^2 + 1'));
ce.expr(['f', ['List', 1, 2, 3]]).evaluate();
// ➔ ["List", 2, 5, 10]
```

Multi-argument functions broadcast with **zip semantics**. Scalar
arguments are repeated for each element of the collection argument(s):

```js example
ce.assign('h', ce.parse('(x, y) \\mapsto x + y'));

// list + scalar
ce.expr(['h', ['List', 1, 2, 3], 10]).evaluate();
// ➔ ["List", 11, 12, 13]

// list + list
ce.expr(['h', ['List', 1, 2, 3], ['List', 10, 20, 30]]).evaluate();
// ➔ ["List", 11, 22, 33]
```

Broadcasting also applies to lazy collections like `Range`:

```js example
ce.assign('sq', ce.parse('x \\mapsto x^2'));
ce.expr(['sq', ['Range', 1, 4]]).evaluate();
// ➔ ["List", 1, 4, 9, 16]
```

#### Opting Out

To author a function that intentionally consumes a list (rather than
broadcasting elementwise over it), declare the parameter type
explicitly as `list<…>` or another collection type. The function will
then receive the collection as a single argument.

```js example
ce.declare('len', { signature: '(list<number>) -> integer' });
ce.assign('len', ce.parse('L \\mapsto \\operatorname{length}(L)'));

ce.expr(['len', ['List', 1, 2, 3]]).evaluate();
// ➔ 3  (no broadcasting; len receives the list as a whole)
```

For lambdas defined with `\mapsto` without an explicit signature, the
inferred parameter type is `unknown`, which is treated as scalar — so
they broadcast by default.


## Closures

A **closure** is a function literal that **captures** one or more free variables
from its defining lexical scope, preserving their values at the time of definition.
The capture happens by simply referencing the variables in the function body.
For example, the following function literal captures the variable `a` from its
lexical scope:

```json example
["Function", ["Add", "a", "_"], "_"]
```

This function literal captures the value of `a` at the time of definition, and
when the function is applied, it will use that value of `a` in the computation.

```json example
["Block"
  ["Assign", "f",
    ["Block",
      ["Declare", "a", "integer"],
      ["Assign", "a", 10],
      ["Function", ["Add", "a", "_"], "_"]
    ]
  ]
  ["Declare", "a", "integer"],
  ["Assign", "a", 100]
  ["f", 1]
]
// ➔ 1 + 10
```

Note that the value of `a` is `10` when the function is defined, and it
is `100` when the function is applied. The function will always use the value of
`a` that was in scope when the function was defined, not the value of `a` at the
time the function is applied. In fact, the outer `a` is a different variable
which is unrelated to the `a` in the scope of the function, but with the same
name.

## Operating on Functions

<FunctionDefinition name="Function">

<Signature name="Function">_body_</Signature>

<Signature name="Function">_body_, _arg-1_, _arg-2_, ...</Signature>

Create a **function literal** which can be used as an [anonymous function](https://en.wikipedia.org/wiki/Anonymous_function).

The `arg-n` arguments are symbols which are the bound variables (parameters) of the
function literal.

:::info[Note]
The `Function` operator has the `lazy` flag set to `true`, which means
that neither the body nor the parameters are evaluated until the function is
applied to some arguments.
:::

The _body_ is an expression that is evaluated when the function is
applied to some arguments.

**To apply some arguments to a function expression**, use `["Apply"]`.

<Latex value=" x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

**Typed parameters**. A parameter may be annotated with a type by writing it
as a `["Typed", _symbol_, _type_]` expression instead of a bare symbol. The
_type_ is a string such as `{"str": "integer"}` (or a type-name symbol, which
is normalized to a string).

```json example
["Function", ["Add", "x", 1], ["Typed", "x", "'integer'"]]
```

The literal then types as a **named signature** — the example above has type
`(x: integer) -> integer` — and, in strict mode, its arguments are checked
against the declared types when the function is applied (see [`Typed`](/compute-engine/reference/core/#Typed)).

**Return type**. To ascribe a return type, wrap the body in a `Typed`
expression:

```json example
["Function", ["Typed", ["Add", "x", 1], "'integer'"], ["Typed", "x", "'integer'"]]
```

The annotation is authoritative: it sets the result type of the signature
directly. Canonicalization moves the ascription **inside** the body `Block`,
wrapping its last statement, so the canonical form of the example above is:

```json example
["Function",
  ["Block", ["Typed", ["Add", "x", 1], "'integer'"]],
  ["Typed", "x", "'integer'"]]
```

Type annotations round-trip through MathJSON but are dropped when serializing
to LaTeX (there is no LaTeX notation for them).

</FunctionDefinition>

<FunctionDefinition name="Assign">

<Signature name="Assign">_symbol_, _fn_</Signature>

Assign the function literal `fn` to the symbol `symbol`.


`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions),
as it changes the state of the Compute Engine.

The _fn_ is a function literal, which can be created using the `["Function"]`
expression or the shorthand function literal.

<Latex value="\operatorname{double}(x) \coloneq 2x"/>

<Latex value="\operatorname{double} \coloneq x \mapsto 2x"/>


```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
```

</FunctionDefinition>

<FunctionDefinition name="Apply">

<Signature name="Apply">_function_, _expr-1_, ..._expr-n_</Signature>

[Apply](https://en.wikipedia.org/wiki/Apply) a list of arguments to a function.
The _function_ is a function literal, or a symbol whose value is a function literal.

The _expr-n_ arguments are the arguments of the function literal.


```json example
["Apply", ["Multiply", "_", "_"], 3]
// ➔ 9

["Apply", ["Function", ["Multiply", "x", "x"], "x"], 3]
// ➔ 9
```

With LaTeX, the `\lhd` and `\rhd` commands can be used to apply a function to a single
argument on the left or right respectively.

<Latex value="f\lhd g \lhd x"/>
<Latex value="x \rhd g \rhd f"/>

```json example
["Apply", "f", ["Apply", "g", "x"]]
```

The right-pointing form is a **pipeline operator**: `\rhd` (also
`\triangleright`, `\vartriangleright`, `⊳`, or the plain-text shortcut `|>`)
feeds the expression on its left to the function on its right, and stages
chain left to right.

The corresponding expression is `Pipe(value, function)`. For example, Cortex
`x |> f` constructs `Pipe(x, f)` and evaluates by applying `f` to `x`:

```json example
["Pipe", "x", "f"]
// Evaluates as ["f", "x"]
```

A `\square` topic marker in the right-hand side names the position the piped
value fills, so a stage can be a multi-argument call:

<Latex value="x^2 = 4 \rhd \operatorname{Solve}(\square, x)"/>

```json example
["Solve", ["Equal", ["Power", "x", 2], 4], "x"]
```

A bare function command such as `\ln`, `\lb` or `\sqrt` acts as a function
reference (`12 \rhd \ln` is `ln(12)`), and the prefix form (`\rhd f`, with no
left-hand side) denotes the anonymous unary function that applies `f` to its
argument.

Operators whose unknown/variable argument is inferable — `Solve`, `D`,
`Series`, and the polynomial operators such as `Apart` — may be piped into
without naming the variable: `x^2 = 4 \rhd \operatorname{Solve}` solves for
`x`.

</FunctionDefinition>
