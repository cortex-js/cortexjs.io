---
title: Introduction - CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "universal"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
---

<script type="module">
  window.addEventListener("DOMContentLoaded", () => 
    import("//unpkg.com/@cortex-js/compute-engine?module").then((ComputeEngine) => {
      globalThis.ce = new ComputeEngine.ComputeEngine();

      // The playgrounds need the global ce to be instanciated before
      // they can be run. So we set them to autorun="nenver", 
      // then we run them manually here, and reset the autorun attribute.
      const playgrounds = [...document.querySelectorAll("code-playground")];
      for (const playground of playgrounds) {
        playground.autorun = 1000; // delay in ms
        playground.run();
      }
    })
);
</script>




<img alt="Compute Engine" class='full-width' src='/assets/Compute-Engine-2.jpg' style='border-radius:8px 8px 0 0 ; border:1px solid #203346; margin-bottom: 2em'>

The **CortexJS Compute Engine** is a JavaScript/TypeScript library for symbolic
computing and numeric evaluation of mathematical expressions.{.xl}

The **Compute Engine** is for educators, students, scientists and engineers 
who need to make technical computing apps running in the browser or in
server-side JavaScript environments such as Node.

<div style="height:2rem"></div>


<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
console.log("e^{i\\pi} =", ce.parse("e^{i\\pi}").N().latex);</pre>
</code-playground>


<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
const expr = ce.parse("(a+b)^2");
console.log(ce.box(["Expand", expr]).evaluate().latex);</pre>
</code-playground>


<code-playground layout="stack" show-line-numbers autorun="never">
<pre slot="javascript">
const lhs = ce.parse("2x^2 + 3x + 1");
const rhs = ce.parse("1 + 2x + x + 2x^2");
console.log(lhs.latex, lhs.isEqual(rhs) ? "=" : "≠", rhs.latex);</pre>
</code-playground>



**Note:** To use the Compute Engine you must write JavaScript code. This guide 
assumes you are familiar with JavaScript or TypeScript.{.notice--info}


The CortexJS Compute Engine manipulates math expressions represented with the <a href ="/math-json/">MathJSON format</a>.


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">**parse** and **serialize**</a> expressions from and to LaTeX
- <a href="/compute-engine/guides/simplify/">**simplify**</a> expressions
- <a href="/compute-engine/guides/evaluate/">**evaluate symbolically**</a> expressions
- <a href="/compute-engine/guides/numeric-evaluation/">**evaluate numerically**</a> expressions
- <a href="/compute-engine/guides/compiling/">**compile**</a> expressions to JavaScript functions


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
  console.log(ce.parse("e^{i\\pi}").evaluate().latex);
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

<div class=symbols-table>

| Topic                                                               |                                                       |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                                |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                          |
| [Core](/compute-engine/reference/core/)                             | `Declare`, `Assign`, `Error` `LatexString`...                       |
| [Domains](/compute-engine/reference/domains/)                       | `Anything` `Nothing` `Numbers` `Integers` ...                            |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `Maybe` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Styling](/compute-engine/reference/styling/)                       | `Delimiter` `Style`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

{% readmore "/compute-engine/guides/standard-library/" %}
Read more about the <strong>MathJSON Standard Library</strong>
{% endreadmore %}

In addition to the built-in definitions from the MathJSON Standard Library
you can also add your own definitions.

{% readmore "/compute-engine/guides/augmenting/" %}
Read more about <strong>Augmenting the MathJSON Standard Library</strong>
{% endreadmore %}

You can also customize the LaTeX syntax, that is how to parse and serialize 
LaTeX to MathJSON.

{% readmore "/compute-engine/guides/latex-syntax/" %}
Read more about <strong>Parsing and Serializing LaTeX</strong>
{% endreadmore %}
