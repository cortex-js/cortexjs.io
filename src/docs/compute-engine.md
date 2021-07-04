---
title: Introduction - CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "compute-engine"
---

<img alt="Compute Engine" src='/assets/Compute-Engine-2.jpg' style='margin-bottom:2em; border-radius:8px; border:1px solid #203346'>

The **CortexJS Compute Engine** is a JavaScript library for symbolic
computing and numerical evaluation of mathematical expressions.

The Compute Engine is for anyone who wants to make technical computing apps 
in the browser or in server-side environments such as Node: educators, 
students, scientists and engineers.


The Compute Engine can:
- <a href="/compute-engine/guides/latex-syntax/">parse and serialize</a> expressions from and to LaTeX
- simplify and evaluate math expressions expressed in the <a href ="/math-json/">MathJSON format</a>

{% readmore "/compute-engine/demo/" %}
Try the **interactive demo** now
{% endreadmore %}

## Parse and Serialize LaTeX

Internally, the Compute Engine manipulates expressions represented with the 
MathJSON format. It's a JSON representation of the Abstract Syntax Tree
of the expression. It is easy to manipulate programatically and can be
written by hand. However, you might prefer to use a more concise and
familiar syntax, such as LaTeX. The Compute Engine includes utilities
to convert to and from LaTeX strings.

**To parse a LaTeX string and serialize to a LaTeX string**, use the `ce.parse()` 
and `ce.serialize()`  functions.

```js
import { ComputeEngine } from '@cortex-js/compute-engine';

const ce = new ComputeEngine();

console.log(ce.parse('5x + 1'));
// ->  ["Add", ["Multiply", 5, "x"], 1]

console.log(ce.serialize(["Add", ["Power", "x", 3], 2]));
// ->  x^3 + 2

```

{% readmore "/compute-engine/guides/latex-syntax/" %}
Read more about <strong>Parsing and Serializing the LaTeX Syntax</strong>
{% endreadmore %}

**To input math using an interactive mathfield**, use [MathLive](/mathlive/).

A MathLive mathfield works like a textarea in HTML, but for math. It provide 
its content as a LaTeX string or a MathJSON expression, ready to be used with the Compute Engine.

{% readmore "/mathlive/" %}
Read more about <strong>MathLive</strong>
{% endreadmore %}



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


{% readmore "/compute-engine/guides/numerical-evaluation/" %}
Read more about <strong>Numerical Evaluation</strong>
{% endreadmore %}


{% readmore "/compute-engine/guides/symbolic-computing/" %}
Read more about <strong>Symbolic Computing</strong>
{% endreadmore %}

{% readmore "/compute-engine/guides/patterns-and-rules/" %}
Read more about <strong>Patterns and Rules</strong>
{% endreadmore %}



## Customization

The Compute Engine includes a robust library of mathematical functions. 

**To customize the dictionaries that define the math functions**, create and configure a `ComputeEngine` instance.

The `ComputeEngine` instance also provides access to additional features
such as defining [assumptions](/compute-engine/guides/assumptions/) about 
symbols: _x is a positive Real number, n is an Integer_.

```js
const ce = new ComputeEngine(ComputeEngine.getDictionary('arithmetic'));
ce.evaluate(['Add', 5, 2]);
```

<div class=symbols-table>

| Dictionary |  |
|:---|:---|
| [Arithmetic](/compute-engine/reference/arithmetic/) | `Add` `Multiply`...|
| [Calculus](/compute-engine/reference/calculus/) | `Derive` `Integrate`...|
| [Collections](/compute-engine/reference/collections/)| `Sequence` `List` `Dictionary` `Set`... |
| [Core](/compute-engine/reference/core/) | `Missing` `Nothing` `None` `All`  `Identity` `InverseFunction` `LatexTokens`... |
| [Logic](/compute-engine/reference/logic/) |`And` `Or` `Not`...|
| [Sets](/compute-engine/reference/sets/) | `Union` `Intersection`...|
| [Special Functions](/compute-engine/reference/special-functions/) | `Erf` `Gamma` `Factorial`...|
| [Trigonometry](/compute-engine/reference/trigonometry/)  | `Cos` `Sin` `Tan`...| 

</div>

{% readmore "/compute-engine/guides/dictionaries/" %}
Read more about <strong>Dictionaries</strong>
{% endreadmore %}
