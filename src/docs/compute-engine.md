---
title: Introduction - CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "compute-engine"
---
<script defer type='module'>
    import {renderMathInDocument} from '//unpkg.com/mathlive/dist/mathlive.min.mjs';
    renderMathInDocument({ 
      renderAccessibleContent: false,
      TeX: { 
        delimiters: {
          inline: [['\\(', '\\)']],
          display: [ ['$$', '$$'], ['\\[', '\\]']],
        },
        processEnvironments : false 
      },
      asciiMath: null,
    });
</script>

<img alt="Compute Engine" src='/assets/Compute-Engine-2.png' style='margin-bottom:2em; border-radius:8px; border:1px solid #203346'>

The **CortexJS Compute Engine** is a JavaScript library for symbolic
computing and numerical evaluation of mathematical expressions.

The Compute Engine is for anyone who wants to make technical computing apps 
in the browser or in server-side environments such as Node: educators, students, scientists and engineers.


The Compute Engine can:
- <a href="/guides/math-json/latex-syntax/">parse and serialize</a> expressions from and to Latex
- simplify and evaluate math expressions expressed in the <a href ="/math-json/">MathJSON format</a>

<div class='read-more'><a href="/compute-engine/demo/">Try the <strong>interactive demo</strong> now<svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>

## Parse and Serialize Latex

Internally, the Compute Engine manipulates expressions represented with the MathJSON format. It's a JSON representation of an Abstract Syntax Tree
of the expression. It is easy to manipulate programatically and can be
written by hand. However, you might prefer to use a more concise and
familiar syntax, such as Latex. The Compute Engine includes utilities
to convert to and from Latex strings.

**To parse a Latex string and serialize to a Latex string**, use the `parse()` and `serialize()` 
functions.

```js
import { parse, serialize } from '@cortex-js/compute-engine';

console.log(parse('5x + 1'));
// ->  ["Add", ["Multiply", 5, "x"], 1]

console.log(serialize(["Add", ["Power", "x", 3], 2]));
// ->  x^3 + 2

```

<div class='read-more'><a href="/guides/math-json/latex-syntax/">Read more about <strong>Parsing and Serializing the Latex Syntax</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>

**To input math using an interactive mathfield**, use [MathLive](/mathlive/).

A MathLive mathfield works like a textarea in HTML, but for math. It provide 
its content as a Latex string or a MathJSON expression, ready to be used with the Compute Engine.

<div class='read-more'><a href="/mathlive/">Read more about <strong>MathLive</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>



## Symbolic Computing and Numerical Evaluation

**To evaluate a symbolic expression**, use the `evaluate()` function.

The result of `evaluate()` is an expression:

- If the expression can be evaluated numerically, the result is a number
- If it can't be evaluated numerically, the result is a symbolic expression.

```js
import { evaluate, parse, serialize } from '@cortex-js/compute-engine';

console.log(evaluate(["Add", 2, 3]);
// ➔ 5

console.log(evaluate(parse('\\frac{\\sqrt{5}}{3}'));
// ➔ 0.7453559925

console.log(serialize(evaluate(parse('2x + 3x')));
// ➔ 5x
```

The Compute Engine supports **arbitrary precision floating points** and **complex
numbers**.

The Compute Engine can also simplify, find patterns, substitute terms, apply rewrite rules,
compare and format expressions.


<div class='read-more'><a href="/guides/compute-engine/numerical-evaluation/">Read more about <strong>Numerical Evaluation</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>


<div class='read-more'><a href="/guides/compute-engine/symbolic-computing/">Read more about <strong>Symbolic Computing</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>

<div class='read-more'><a href="/guides/compute-engine/patterns-and-rules/">Read more about <strong>Patterns and Rules</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>



## Customization

The Compute Engine includes a robust library of mathematical functions. 

**To customize the dictionaries that define the math functions**, create and configure a `ComputeEngine` instance.

The `ComputeEngine` instance also provides access to additional features
such as defining [assumptions](/guides/compute-engine/assumptions/) about 
symbols: _x is a positive Real number, n is an Integer_.

```js
const ce = new ComputeEngine(ComputeEngine.getDictionary('arithmetic'));
ce.evaluate(['Add', 5, 2]);
```

<div class=symbols-table>

| Dictionary |  |
|:---|:---|
| [Arithmetic](/guides/compute-engine/arithmetic/) | `Add` `Multiply`...|
| [Calculus](/guides/compute-engine/calculus/) | `Derive` `Integrate`...|
| [Collections](/guides/compute-engine/collections/)| `Sequence` `List` `Dictionary` `Set`... |
| [Core](/guides/compute-engine/core/) | `Missing` `Nothing` `None` `All`  `Identity` `InverseFunction` `LatexTokens`... |
| [Logic](/guides/compute-engine/logic/) |`And` `Or` `Not`...|
| [Sets](/guides/compute-engine/sets/) | `Union` `Intersection`...|
| [Special Functions](/guides/compute-engine/special-functions/) | `Erf` `Gamma` `Factorial`...|
| [Trigonometry](/guides/compute-engine/trigonometry/)  | `Cos` `Sin` `Tan`...| 

</div>

<div class='read-more'><a href="/guides/compute-engine/dictionaries/">Read more about <strong>Dictionaries</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>
