---
title: Introduction - Compute Engine
sidebar_label: Introduction
hide_title: true
slug: /compute-engine/
date: Last Modified
description: The Compute Engine is a JavaScript/TypeScript library for symbolic computing and numeric evaluation of mathematical expressions.
sidebar_class_name: "compass-icon"
---

<HeroImage path="/img/hand-gears.jpg" >
# Compute Engine
</HeroImage>

<Intro>
A JavaScript library for symbolic computing and numeric evaluation of 
mathematical expressions.
</Intro>



:::info[Note]
To use Compute Engine, you must write JavaScript or TypeScript code. 
This guide assumes you’re familiar with these languages.
:::

<div style={{height:"1rem"}}></div>

```live
console.log("exp(i*pi) =", ce.parse("e^{i\\pi}").evaluate());
```

```live
const expr = ce.parse("(a+b)^2");
ce.box(["Expand", expr]).evaluate().print();
```


```live
const lhs = ce.parse("1 + x(1 + 2x) + 2x");
const rhs = ce.parse("2x^2 + 3x + 1");
console.log(lhs, lhs.isEqual(rhs) ? "=" : "≠", rhs);
```


The **Compute Engine** is for educators, students, scientists, and engineers 
who need to run technical computing apps in browsers or server-side 
JavaScript environments like Node.js.




The Compute Engine manipulates math expressions represented with 
the <a href="math-json/">MathJSON format</a>.

The expression \\(x^2 + 2x + 1\\) is represented in MathJSON as:

```json
["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX.
- <a href="/compute-engine/guides/simplify/">**simplify**</a> symbolic expressions
- evaluate expression <a href="/compute-engine/guides/evaluate/">**symbolically**</a>
  or <a href="/compute-engine/guides/numeric-evaluation/">**numerically**</a>
- solve equations, calculate derivatives and integrals, and perform other
  <a href="/compute-engine/reference/calculus/">**calculus**</a> operations
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript



<ReadMore path="/compute-engine/demo/" >
Try the **interactive demo** now<Icon name="chevron-right-bold" />
</ReadMore>


## Getting Started

The easiest way to get started is to load the Compute Engine JavaScript module
from a CDN, then create a `ComputeEngine` instance.

### Using JavaScript Modules

**To load the Compute Engine module from the jsdelivr CDN**, use a `<script>` tag with the
`type="module"` attribute and an `import` statement.

```html
<script type="module">
  import { ComputeEngine } from "https://esm.run/@cortex-js/compute-engine";

  const ce = new ComputeEngine();
  ce.parse("e^{i\\pi}").evaluate().print();
  // ➔ "-1"
</script>
```

Alternatively, you can use the **unpkg** CDN to load the module:

```js
import { ComputeEngine } from 
  "https://unpkg.com/@cortex-js/compute-engine?module";
```


The ESM (module) version is also available in the npm package as `/compute-engine.min.esm.js` 


### Using Vintage JavaScript

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. 

For example, WebPack 4 does not support the optional chaining operator, using 
the UMD version will make use of polyfills as necessary.

**To load the UMD version**, use a `<script>` tag with the `src` attribute.


```html
<script 
  src="https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/compute-engine.min.js">
</script>
<script>
  window.onload = function() {
    const ce = new ComputeEngine.ComputeEngine();
    console.log(ce.parse("e^{i\\pi}").evaluate());
    // ➔ "-1"
  }
</script>
```

Alternatively, use the **unpkg** CDN to load the library:

```html
<script src="//unpkg.com/@cortex-js/compute-engine"></script>
```

The UMD version is also available in the npm package in `/compute-engine.min.js` 



### Other Versions

A non-minified module which may be useful for debugging is available in
the npm package as `/compute-engine.esm.js`.

## MathJSON Standard Library

The operators in a MathJSON expression are defined in libraries. The 
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
| [Strings and Text](/compute-engine/reference/strings/)              | `Text` `Annotated`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>


:::info[Note]
In this guide, the `ce.` prefix in `ce.box()` or `ce.parse()` indicates
that the function is a method of the `ComputeEngine` class.

**To create a new `ComputeEngine` instance** use `ce = new ComputeEngine()`


The `expr.` prefix in `expr.evaluate()` or `expr.simplify()` indicates that the
function is a method of the `BoxedExpression` class.

**To create a new boxed expression** use `expr = ce.parse()` or `expr = ce.box()`

:::



<ReadMore path="/compute-engine/standard-library/" >
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
