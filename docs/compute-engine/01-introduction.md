---
title: Introduction - Compute Engine
sidebar_label: Introduction
hide_title: true
slug: /compute-engine/
date: Last Modified
description: The Compute Engine is a JavaScript/TypeScript library for symbolic computing and numeric evaluation of mathematical expressions.
sidebar_class_name: "compass-icon"
---

<HeroImage path="/img/hero/compute-engine.jpg" >
# Compute Engine
</HeroImage>

<Intro>
The **Compute Engine** is a JavaScript/TypeScript library for symbolic
computing and numeric evaluation of mathematical expressions.
</Intro>



:::info[Note]
To use the Compute Engine, you must write JavaScript or TypeScript code. This 
guide assumes familiarity with one of these programming languages.
:::

<div style={{height:"2rem"}}></div>

```live
console.log("exp(i*pi) =", ce.parse("e^{i\\pi}").evaluate());
```

```live
const expr = ce.parse("(a+b)^2");
ce.box(["Expand", expr]).evaluate().print();
```


```live
const lhs = ce.parse("2x^2 + 3x + 1");
const rhs = ce.parse("1 + 2x + x + 2x^2");
console.log(lhs, lhs.isEqual(rhs) ? "=" : "≠", rhs);
```


The **Compute Engine** is for educators, students, scientists and engineers 
who need to make technical computing apps running in the browser or in
server-side JavaScript environments such as Node.




The Compute Engine manipulates math expressions represented with 
the <a href="math-json/">MathJSON format</a>:

For example, the expression \\(x^2 + 2x + 1\\) is represented as:

```json
["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX
- <a href="/compute-engine/guides/simplify/">**simplify**</a> expressions
- evaluate expression <a href="/compute-engine/guides/evaluate/">**symbolically**</a>
- evaluate expressions <a href="/compute-engine/guides/numeric-evaluation/">**numerically**</a>
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript functions


:::info[Note]
In this guide, functions such as `ce.box()` and `ce.parse()` require a
`ComputeEngine` instance which is denoted by the `ce.` prefix.

Functions that apply to a boxed expression, such as `expr.simplify()` are denoted with the
`expr.` prefix.
:::


<ReadMore path="/compute-engine/demo/" >
Try the **interactive demo** now<Icon name="chevron-right-bold" />
</ReadMore>


## Getting Started

The easiest way to get started is to load the Compute Engine JavaScript module
from a CDN, then instantiate a `ComputeEngine` object.

### Using JavaScript Modules

```html
<script type="module">
  import { ComputeEngine } from 
    "https://unpkg.com/@cortex-js/compute-engine?module";

  const ce = new ComputeEngine();
  ce.parse("e^{i\\pi}").evaluate().print();
  // ➔ "-1"
</script>
```

The ESM (module) version is also available in the npm package in `dist/compute-engine.min.esm.js` 


### Using Vintage JavaScript

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. You can load the UMD
version by using a `<script>` tag.


For example, WebPack 4 does not support the optional chaining operator, using 
the UMD version will make use of polyfills as necessary.

The UMD version is also available in the npm package in `dist/compute-engine.min.js` 


```html
<script src="//unpkg.com/@cortex-js/compute-engine"></script>
<script>
  window.onload = function() {
    const ce = new ComputeEngine.ComputeEngine();
    console.log(ce.parse("e^{i\\pi}").evaluate().latex);
    // ➔ "-1"
  }
</script>
```

### Other Versions

A non-minified module which may be useful for debugging is available in
the npm package as `dist/compute-engine.esm.js`.

## MathJSON Standard Library

The identifiers in a MathJSON expression are defined in libraries. The 
**MathJSON Standard Library** is a collection of functions and symbols that are
available by default to a `ComputeEngine` instance.

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic|     |
| :-------- | :---- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                       |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

<ReadMore path="/compute-engine/guides/standard-library/" >
Read more about the **MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

You can add your own definitions to the built-in definitions from the MathJSON Standard Library.

<ReadMore path="/compute-engine/guides/augmenting/" >
Read more about **Extending the MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

If you use a custom LaTeX syntax, such as macros, you can add your own 
definitions to the LaTeX dictionary, which defines how to parse and serialize 
LaTeX to MathJSON.

<ReadMore path="/compute-engine/guides/latex-syntax/" >
Read more about **Parsing and Serializing LaTeX**<Icon name="chevron-right-bold" />
</ReadMore>
