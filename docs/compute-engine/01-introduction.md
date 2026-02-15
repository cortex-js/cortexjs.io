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


<div style={{height:"1rem"}}></div>

```live
console.log(evaluate("e^{i\\pi}"));
```

```live
console.log(expand("(a+b)^2"));
```


```live
console.log(simplify(
  "(sin(alpha)**2 + cos(alpha)**2) * (x**2 + 2*x + 1) / (x + 1)"
));
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
- evaluate expressions <a href="/compute-engine/guides/evaluate/">**symbolically**</a>
  or <a href="/compute-engine/guides/numeric-evaluation/">**numerically**</a>
- solve equations, calculate derivatives and integrals, and perform other
  <a href="/compute-engine/reference/calculus/">**calculus**</a> operations
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript

## Free Functions

For common operations, use the free functions — no setup required:

```live
simplify("x+x+1").print();
evaluate("2^{11} - 1").print();
N("\\frac{1}{3}").print();
```

| Function                               | Purpose                                                        |
| :------------------------------------- | :------------------------------------------------------------- |
| `evaluate(expr \| latex)`                | Evaluate an expression or LaTeX input symbolically.            |
| `N(expr \| latex)`                       | Numerically evaluate an expression or LaTeX input.             |
| `simplify(expr \| latex)`                | Simplify an expression or LaTeX input.                         |
| `assign(id, value)` / `assign(record)` | Assign one symbol value or many at once.                       |
| `expand(expr \| latex)`                  | Expand distributively at the top level (`Expression \| null`). |
| `expandAll(expr \| latex)`               | Expand distributively recursively (`Expression \| null`).      |
| `factor(expr \| latex)`                  | Factor an expression.                                          |
| `solve(expr \| latex, vars?)`            | Solve equations/systems (returns solve result variants).       |
| `compile(expr \| latex, options?)`       | Compile to a target language with `CompilationResult`.         |
| `parse(latex)`                         | Parse a LaTeX string into an `Expression`.                     |

You can use either regular LaTeX strings or a looser syntax similar
to ASCIIMath or Typst:

```live
console.log(N("(1+sqrt(5))/2"));
```

:::info[Note]

These functions use a shared `ComputeEngine` instance created on first call.
Use `getDefaultEngine()` to configure it.
:::


<ReadMore path="/compute-engine/demo/" >
Try the **interactive demo** now<Icon name="chevron-right-bold" />
</ReadMore>


## Getting Started

**To load the Compute Engine module from the jsdelivr CDN**, use a `<script>` tag with the
`type="module"` attribute and an `import` statement.

```html
<script type="module">
  import { evaluate } from "https://esm.run/@cortex-js/compute-engine";

  evaluate("e^{i\\pi}").print();
  // ➔ "-1"
</script>
```

Alternatively, you can use the **unpkg** CDN:

```js
import { ComputeEngine } from 
  "https://unpkg.com/@cortex-js/compute-engine?module";
```



## MathJSON Standard Library

The **MathJSON Standard Library** is a collection of functions and symbols that are
available by default.

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


:::info[Note]
In this guide, the `ce.` prefix in `ce.box()` or `ce.parse()` indicates
that the function is a method of the `ComputeEngine` class.

Use `getDefaultEngine()` to access the shared `ComputeEngine` instance used by the free functions, or create your own instance with `new ComputeEngine()`.

The `expr.` prefix in `expr.evaluate()` or `expr.simplify()` indicates that the
function is a method of the `Expression` class.

**To create a new expression** use `expr = ce.parse()` or `expr = ce.box()`

:::




