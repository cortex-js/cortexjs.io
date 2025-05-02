---
title: Functions
slug: /compute-engine/reference/functions/
---

<Intro>
The Compute Engine Standard Library includes many built-in functions such as
`Add`, `Sin`, `Power`, but you can also define your own functions.
</Intro>

The standard library can be extended with your own functions.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about adding new definitions to the Compute Engine.
</ReadMore>


<div className="symbols-table" style={{"--first-col-width":"23ch"}}>


| **Term**                    | **Definition** |
| :-----------------------------| :----------------|
| **Function Expression**     | An expression representing a **function application**, e.g. `["Add", 1, 2]`, where a function is called with arguments. |
| **Function Signature**      | A type describing the function's inputs and outputs, e.g. `(real, integer) -> boolean` |
| **Function Literal**        | A first-class function value, defined using a construct like `["Function", body, params...]`, which may or may not capture variables from its lexical scope. |
| **Shorthand Function Literal** | A compact way to write a function literal using placeholders (e.g. `_`) instead of explicitly listing parameters, e.g. `["Add", "_", 1]` desugared to `["Function", ["Add", "_", 1], "_"]`. |
| **Closure**                 | A function literal that *captures* one or more free variables from its defining lexical scope, preserving their values at the time of definition. |
| **Anonymous Function**      | A function that is not bound to an identifier, often used as an argument to other functions. |

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

<Latex value=" x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

<ReadMore path="/compute-engine/reference/control-structures/" >The examples in
this section define functions as a simple expression, but function literals can
 include more complex control structures, including blocks, local variables, 
 loops and conditionals. Learn more about **control structures**. </ReadMore>

## Shorthand Function Literals

A shorthand function literal is a compact way to write a function literal using
placeholders (e.g. `_`) instead of explicitly listing parameters.
The shorthand function literal is desugared to a function literal.

```json example
["Multiply", "_", 2]
```
is desugared to:

```json example
["Function", ["Multiply", "_", 2], "_"]
```

If more than one parameter is used, the placeholders are: `_`, `_2`, `_3`, etc.


Placeholder arguments can also be used in LaTeX, but the placeholder arguments
must be wrapped with an `\operatorname` command except for `\_`.

<Latex value=" () \mapsto \_ + \operatorname{\_2}"/>

```json example
["Add", "_", "_2"]
```

A symbol which is the name of an operator is also a valid function literal.

```json example
["Map", "xs", "Sin"]
```


## Anonymous Functions

A function that is not bound to an identifier is called an **anonymous
function**.

Anonymous functions are frequently used as arguments to other functions.

In the example below, the second argument of the `["Map"]` function is an
anonymous function expressed as a function literal that multiplies its argument by `2`.

```json example
["Map", "xs", ["Function", ["Multiply", "x", 2], "x"]]
```

The same function can be expressed using a shorthand function literal, which
uses `_` as a placeholder for the parameter. The shorthand function literal
is desugared to a function literal.

```json example
["Map", "xs", ["Multiply", "_", 2]]
```




## Evaluating a Function Literal

**To apply a function literal to some arguments** use an `["Apply"]` expression.

```json example
["Apply", ["Function", ["Add", 2, "x"], "x"], 11]
// ➔ 22

["Apply", ["Add", 2, "_"], 4]
// ➔ 6

["Apply", "Power", 2, 3]
// ➔ 8
```

The first argument of `Apply` is a function literal. The rest of the arguments are the
arguments of the function literal.

## Operating on Functions

<FunctionDefinition name="Function">

<Signature name="Function">_body_</Signature>

<Signature name="Function">_body_, _arg-1_, _arg-2_, ...</Signature>

Create an
[anonymous function](https://en.wikipedia.org/wiki/Anonymous_function), also
called a **function literal**.

The `arg-n` arguments are identifiers of the bound variables (parameters) of the
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

</FunctionDefinition>

<FunctionDefinition name="Assign">

<Signature name="Assign">_id_, _fn_</Signature>

Assign the function literal _fn_ to the identifier _id_.


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
The _function_ is a function literal, or an identifier whose value is a function literal.

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

</FunctionDefinition>

