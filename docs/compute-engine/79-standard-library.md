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

The **MathJSON Standard Library** is organized by topics, each topic is a separate page in
the documentation.

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic                                                               |                                                       |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                       |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `ForAll` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings](/compute-engine/reference/strings/)                       | ...                                     |
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

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



<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about <strong>Augmenting the Standard Library</strong><Icon name="chevron-right-bold" />
</ReadMore>


You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

<ReadMore path="/compute-engine/guides/latex-syntax/" >
Read more about <strong>Parsing and Serializing LaTeX</strong><Icon name="chevron-right-bold" />
</ReadMore>
