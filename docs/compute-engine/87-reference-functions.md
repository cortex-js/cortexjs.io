---
title: Functions
slug: /compute-engine/reference/functions/
---

<Intro>
The Compute Engine Standard Library includes many built-in functions such as
`Add`, `Sin`, `Power`, etc...
</Intro>

The standard library can be extended with your own functions.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about adding new definitions to the Compute Engine.
</ReadMore>

## Anonymous Functions

A function that is not bound to an identifier is called an **anonymous
function**.

Anonymous functions are frequently used as arguments to other functions.

In the example below, the `["Function"]` expression is an anonymous function
that is passed as an argument to the `["Sum"]` function.

The first argument of the `["Function"]` expression is the body of the function,
the remaining arguments are the name of the parameters of the function.

```json example
["Sum", ["Function", ["Multiply", "x", 2], "x"]]
```

To specify an anonymous function with LaTeX use the `\mapsto` command:

<Latex value=" x \mapsto 2x"/>

```json example
["Function", ["Multiply", "x", 2], "x"]
```

<Latex value=" (x, y) \mapsto 2x + y"/>

```json example
["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]
```

<ReadMore path="/compute-engine/reference/control-structures/" >The examples in
this section define functions as a simple expression, but functions can include
more complex control structures, including blocks, loops and conditionals. Learn
more about **control structures**. </ReadMore>


## Anonymous Parameters

The parameters of a function can also be anonymous. 

In this case, the parameters are bound to the wildcards `_`, `_1`, `_2`, etc... 
in the body of the function. The wildcard `_` is a shorthand for `_1`, the 
first parameter.

In the example below, both the function and its parameters are anonymous.

```json example
["Sum", ["Multiply", "_", 2]]
```

Note that as a shortcut when using anonymous parameters, the `["Function"]`
expression can be omitted.


Anonymous parameters can also be used in LaTeX, but the anonymous parameters
must be wrapped with an `\operatorname` command except for `\_`.

<Latex value=" () \mapsto \_ + \operatorname{\_2}"/>

```json example
["Function", ["Add", "_", "_2"]]
```



## Evaluating an Anonymous Function

To apply a function to some arguments, use an `["Apply"]` expression.

```json example
["Apply", ["Function", ["Add", 2, "x"], "x"], 11]
// ➔ 22

["Apply", ["Add", 2, "_"], 4]
// ➔ 6

["Apply", "Power", 2, 3]
// ➔ 8
```

The first argument of `Apply` is an anonymous function, either as an
identifier, or as a `["Function"]` expression. The rest of the arguments are the
arguments of the anonymous function.

## Operating on Functions

<FunctionDefinition name="Function">

<Signature name="Function">_body_</Signature>

<Signature name="Function">_body_, _arg-1_, _arg-2_, ...</Signature>

Create an
[anonymous function](https://en.wikipedia.org/wiki/Anonymous_function), also
called **lambda expression**.

The `arg-n` arguments are identifiers of the bound variables (parameters) of the
anonymous function.

:::info[Note]
All the arguments have the `Hold` attribute set, so they are not evaluated when
the function is created.
:::

The _body_ is a `MathJSON` expression that is evaluated when the function is
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

Assign the anonymous function _fn_ to the identifier _id_.

The identifier _id_ should either not have been declared yet, or been declared
as a function.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

<Latex value="\operatorname{double}(x) \coloneq 2x"/>

<Latex value="\operatorname{double} \coloneq x \mapsto 2x"/>


```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
```

</FunctionDefinition>

<FunctionDefinition name="Apply">

<Signature name="Apply">_function_, _expr-1_, ..._expr-n_</Signature>

[Apply](https://en.wikipedia.org/wiki/Apply) a list of arguments to a function.
The _function_ is either an identifier of a function, or a `["Function"]`
expression.

The following wildcards in _body_ are replaced as indicated

- `_` or `_1` : the first argument
- `_2` : the second argument
- `_3` : the third argument, etc...
- `__`: the sequence of arguments, so `["Length", "__"]` is the number of
  arguments

If _body_ is a `["Function"]` expression, the named arguments of `["Function"]`
are replaced by the wildcards.

```json example
["Apply", ["Multiply", "_", "_"], 3]
// ➔ 9

["Apply", ["Function", ["Multiply", "x", "x"], "x"], 3]
// ➔ 9
```

The `\lhd` and `\rhd` operators can be used to apply a function to a single
argument on the left or right respectively.

<Latex value="f\lhd g \lhd x"/>
<Latex value="x \rhd g \rhd f"/>

```json example
["Apply", "f", ["Apply", "g", "x"]]
```



</FunctionDefinition>

