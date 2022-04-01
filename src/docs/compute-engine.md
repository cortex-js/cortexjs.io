---
title: Introduction - CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "compute-engine"
---

<img alt="Compute Engine" class='full-width' src='/assets/Compute-Engine-2.jpg' style='border-radius:8px 8px 0 0 ; border:1px solid #203346; margin-bottom: 2em'>

The **CortexJS Compute Engine** is a JavaScript/TypeScript library for symbolic
computing and numeric evaluation of mathematical expressions.

```ts
const ce = new ComputeEngine();

console.log(ce.parse("e^{i\\pi}").N().latex);
// ➔ "-1"


const expr = ce.parse("(a+b)^2");
console.log(ce.box(["Expand", expr]).evaluate().latex);
// ➔ "a^2 + 2ab + b^2"

```


{% readmore "/compute-engine/changelog" %}
The API in version `0.4.3` has changed. The **CHANGELOG** includes a migration 
guide to help you update your code from previous version to `0.4.3`
{% endreadmore %}


The Compute Engine is for anyone who wants to make technical computing apps 
in the browser or in server-side environments such as Node: educators, 
students, scientists and engineers.

The CortexJS Compute Engine manipulates math expressions represented with the <a href ="/math-json/">MathJSON format</a>.


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX
- <a href="/compute-engine/guides/simplify/">**simplify**</a> expressions
- <a href="/compute-engine/guides/evaluate/">**evaluate symbolically**</a> and <a href="/compute-engine/guides/numeric-evaluation/">**evaluate numerically**</a> expressions

{% readmore "/compute-engine/demo/" %}
Try the **interactive demo** now
{% endreadmore %}


## Getting Started

The Compute Engine library is available in two flavors:

* A **JavaScript module** (ESM): `compute-engine.min.esm.js` 
* A **UMD library**, for CJS or AMD imports: `compute-engine.min.js` 

If you are using a modern environment, use the ESM version. The ESM version 
does make use of modern JavaScript features such as optional chaining and more.

If you are using a vintage environment, or if your toolchain does not support
modern JavaScript features, use the UMD version. For example, WebPack 4 does 
not support the optional chaining operator, so use the UMD version in this case,
which will make use of polyfills as necessary.

A non-minified module, `compute-engine.esm.js`, is also available, which may 
be useful for debugging.

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

## Using Vintage JavaScript

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



## Dictionaries

Expressions reference symbols and functions that are defined in dictionaries.

By default, new instances of the Compute Engine include a robust set of
functions and symbols, grouped in several dictionaries.

<div class=symbols-table>

| Dictionary | Symbols/Functions |
|:---|:---|
| [Arithmetic](/compute-engine/reference/arithmetic/) | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`...|
| [Calculus](/compute-engine/reference/calculus/) | `Derive` `Integrate`...|
| [Collections](/compute-engine/reference/collections/)| `Sequence` `List` `Dictionary` `Set`... |
| [Core](/compute-engine/reference/core/) | `Missing` `Nothing` `None` `All`  `Identity` `InverseFunction` `LatexTokens`... |
| [Logic](/compute-engine/reference/logic/) |`And` `Or` `Not` `True` `False` `Maybe` ...|
| [Sets](/compute-engine/reference/sets/) | `Union` `Intersection` `EmptySet` ...|
| [Special Functions](/compute-engine/reference/special-functions/) | `Erf` `Gamma` `Factorial`...|
| [Trigonometry](/compute-engine/reference/trigonometry/)  | `Pi` `Cos` `Sin` `Tan`...| 

</div>


**To customize the dictionaries that define the math functions and symbols**, 
use the constructor of the Compute Engine instance to define the dictionaries
to use.

In addition to the built-in dictionaries, you can define your own.

```js
const ce = new ComputeEngine(ComputeEngine.getDictionary('arithmetic'));
console.log(ce.box(['Add', 5, 2]).evaluate().json);
```

Each entry in a dictionary define the properties of that function or
symbols, as well as how to put expression in canonical form, simplify,
and evaluate expressions using that function.

There are separate dictionaries that define the LaTeX syntax, that is
how to parse and serialize LaTeX to MathJSON. You can also customize these
dictionaries.

{% readmore "/compute-engine/guides/dictionaries/" %}
Read more about <strong>Dictionaries</strong>
{% endreadmore %}

