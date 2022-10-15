---
title: Introduction - CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "universal"
---

<img alt="Compute Engine" class='full-width' src='/assets/Compute-Engine-2.jpg' style='border-radius:8px 8px 0 0 ; border:1px solid #203346; margin-bottom: 2em'>

The **CortexJS Compute Engine** is a JavaScript/TypeScript library for symbolic
computing and numeric evaluation of mathematical expressions.{.xl}

```ts
const ce = new ComputeEngine();

console.log(ce.parse("e^{i\\pi}").N().latex);
// ➔ "-1"


const expr = ce.parse("(a+b)^2");
console.log(ce.box(["Expand", expr]).evaluate().latex);
// ➔ "a^2 + 2ab + b^2"

```

The Compute Engine is for anyone who wants to make technical computing apps 
in the browser or in server-side environments such as Node: educators, 
students, scientists and engineers.

The CortexJS Compute Engine manipulates math expressions represented with the <a href ="/math-json/">MathJSON format</a>.


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX
- <a href="/compute-engine/guides/simplify/">**simplify**</a> expressions
- <a href="/compute-engine/guides/evaluate/">**evaluate symbolically**</a> expressions
- <a href="/compute-engine/guides/numeric-evaluation/">**evaluate numerically**</a> expressions

{% readmore "/compute-engine/demo/" %}
Try the **interactive demo** now
{% endreadmore %}


## Getting Started

The easiest way to get started it to load the Compute Engine JavaScript module
from a CDN.

### Using JavaScript Modules

```html
<script type="module">
  import { ComputeEngine } from 
    'https://unpkg.com/@cortex-js/compute-engine?module';

  const ce = new ComputeEngine();
  console.log(ce.parse("e^{i\\pi}").N().latex);
  // ➔ "-1"
</script>

```

The ESM (module) version is also available in the npm package in `dist/compute-engine.min.esm.js` 


### Using Vintage JavaScript

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. 

For example, WebPack 4 does not support the optional chaining operator, using 
the UMD version will make use of polyfills as necessary.

The UMD version is also available in the npm package in `dist/compute-engine.min.js` 


```html
<script src="//unpkg.com/@cortex-js/compute-engine"></script>
<script>
  window.onload = function() {
    const ce = new ComputeEngine.ComputeEngine();
    console.log(ce.parse("e^{i\\pi}").N().latex);
    // ➔ "-1"
  }
</script>
```

### Other Versions

A non-minified module which may be useful for debugging is available in
the npm package as `dist/compute-engine.esm.js`.

## Standard Library

Expressions reference identifiers that are defined in libraries.

By default, a `ComputeEngine` instance includes a robust set of
functions and symbols, the standard library, grouped in several categories.

<div class=symbols-table>

| Category | Identifiers |
|:---|:---|
| [Arithmetic](/compute-engine/reference/arithmetic/) | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`...|
| [Calculus](/compute-engine/reference/calculus/) | `Derive` `Integrate`...|
| [Collections](/compute-engine/reference/collections/)| `Sequence` `List` `Dictionary` `Set`... |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` `Sum`  ... |
| [Core](/compute-engine/reference/core/) |`InverseFunction` `LatexTokens`... |
| [Domains](/compute-engine/reference/domains/) | `Anything` `Nothing` `Number` `Integer` ... |
| [Functions](/compute-engine/reference/functions/) | `Function` `Apply` `Return`  ... |
| [Logic](/compute-engine/reference/logic/) |`And` `Or` `Not` `True` `False` `Maybe` ...|
| [Sets](/compute-engine/reference/sets/) | `Union` `Intersection` `EmptySet` ...|
| [Special Functions](/compute-engine/reference/special-functions/) | `Erf` `Gamma` `Factorial`...|
| [Styling](/compute-engine/reference/styling/) | `Delimiter` `Style`...|
| [Trigonometry](/compute-engine/reference/trigonometry/)  | `Pi` `Cos` `Sin` `Tan`...| 

</div>


You can define your own identifiers to complement or replace the standard 
library.

```js
const ce = new ComputeEngine({
  symbolTables: ComputeEngine.getSymbolTable('arithmetic')
});
console.log(ce.box(['Add', 5, 2]).evaluate().json);
```

Each entry in a symbol table defines the properties of that function or
symbol, as well as how to put expressions using that function in canonical form 
and how to simplify and evaluate it.

{% readmore "/compute-engine/guides/standard-library/" %}
Read more about <strong>Standard Library</strong>
{% endreadmore %}



You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

{% readmore "/compute-engine/guides/latex-syntax/" %}
Read more about the <strong>LaTeX Syntax</strong>
{% endreadmore %}
