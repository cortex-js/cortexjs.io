---
title: MathJSON Standard Library
slug: /compute-engine/standard-library/
hide_table_of_contents: true
---


The **MathJSON standard library** defines the **vocabulary** used by a MathJSON
expression.

This library defines the meaning of the symbols used in a MathJSON
expression. It is independent of the syntax used to parse/serialize from another
language such as LaTeX.

It includes definitions such as:

- "_`Pi` is a transcendental number whose value is approximately 3.14159265..._"
- "_The `Add` function is associative, commutative, pure, idempotent and can be
  applied to an arbitrary number of Real or Complex numbers_".

## Topics

The **MathJSON Standard Library** is organized by topics. Each topic is a
library of the [library reference](/library/), where each entry gives the Epsil
spelling of a function and, in its MathJSON section, its MathJSON form and its
LaTeX commands.

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic                                                               |                                                       |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Colors](/reference/colors/)                         | `Color` `ColorToString` `ColorMix` `ColorContrast` `ContrastingColor` `Colormap` `ColorToColorspace` `ColorFromColorspace` |
| [Complex](/reference/arithmetic/#complex-numbers)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                       |
| [Functions](/reference/core/#functions)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/reference/logic/)                           | `And` `Or` `Not` `True` `False` `ForAll` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings and Text](/reference/core/#working-with-strings)              | `Characters` `StringJoin` `RangeOf` `StringReplace` `ToUpperCase` `Text`... |
| [Trigonometry](/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>




### Extending the MathJSON Standard Library

The MathJSON Standard Library can be extended by defining new functions:

```js
// Declare that the symbol "f" is a function, 
// but without giving it a definition
ce.declare("f", "function");

// Define a new function `double` that returns twice its input
ce.assign("double(x)", ["Multiply", "x", 2]);

// LaTeX can be used for the definition as well...
ce.assign("half(x)", ce.parse("\\frac{x}{2}"));
```

A set of definitions can also be packaged as a **library** and given to the
engine with the `libraries` constructor option or with `ce.loadLibrary()`;
see [Loading a Library](/compute-engine/guides/augmenting/#loading-a-library).



<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about <strong>Augmenting the Standard Library</strong><Icon name="chevron-right-bold" />
</ReadMore>


You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

<ReadMore path="/compute-engine/guides/latex-syntax/" >
Read more about <strong>Parsing and Serializing LaTeX</strong><Icon name="chevron-right-bold" />
</ReadMore>
