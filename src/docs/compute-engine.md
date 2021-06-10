---
title: CortexJS Compute Engine
permalink: /compute-engine/
layout: single
date: Last Modified
sidebar:
    - nav: "compute-engine"
---
<script type='module'>
    import {renderMathInDocument} from '//unpkg.com/mathlive/dist/mathlive.min.mjs';
    renderMathInDocument({ 
      renderAccessibleContent: false,
      TeX: { 
        delimiters: {
          inline: [['\\(', '\\)']],
          display: [
            ['$$', '$$'],
            ['\\[', '\\]'],
          ],
        },
        processEnvironments : false 
      },
      asciiMath: null,
    });
</script>
# Compute Engine

<img src='/assets/Compute-Engine-2.png' style='margin-bottom:2em;  border-radius:8px; border:1px solid #203346'>

The **CortexJS Compute Engine** performs calculations on MathJSON expressions.

## Evaluating

Use the `ComputeEngine.evaluate()` function to evaluate an expression.

The result of `evaluate()` is an expression. If the expression can 
be evaluated numerically, the expression is a number. If it can't be
evaluated numerically, the expression will be a symbolic expression.

```js
import { evaluate } from 'compute-engine';

console.log(evaluate(["Add", 2, 3]);
// ➔ 5
console.log(evaluate(["Add", 2, "x", 3]);
// ➔ ["Add", 5, x]
```

## Formating

A given mathematical expression can be represented in multiple equivalent ways
as a MathJSON expression. A **form** is used to specify a representation. The most common forms are `"full"` where only transformations necessary to make the expression a valid JSON expression are applied and `"canonical"` that applies rules to perform some basic simplifications and ordering of the
elements of the expression.

To transform an expression using the rules for a particular form, use the
`format()` function.


```js
import { format } from 'compute-engine';

console.log(format(["Add", 2, +Infinity], 'full');
// ➔ ["Add", 2, "+Infinity"]

console.log(format(["Add", 2, "x", 3], 'canonical');
// ➔ ["Add", 2, 3, "x"]
```

See [Compute Engine Forms](/guides/compute-engine/forms/) for more info.

## Comparing

Use the `ComputeEngine.same()` function to compare two expressions.

The comparison between expressions is structural so that \\(x + 1\\) is not equal
to \\(1 + x\\). To obtain the desired result, you may need to apply a canonical
form to the expressions using `ComputeEngine.canonical()`, or evaluate them using `ComputeEngine.evaluate()`.

```js
const engine = new ComputeEngine();

const variable = 'x';
console.log(engine.same(
  ['Add', 'x', 1], 
  ['Add', variable, 1]
));
// ➔ true: the two expressions are the same

console.log(engine.same(
  ['Add', 'x', 1], 
  ['Add', 1, 'x']
));
// ➔ false: the two expressions are **not** the same

console.log(engine.same(
  engine.canonical(['Add', 'x', 1]),
  engine.canonical(['Add', 1, 'x'])
));
// ➔ true: the two expressions are the same in canonical form

console.log(engine.same(
  ['Add', 2, 2],
  ['Add', 3, 1]
));
// ➔ false: the two expressions are **not** the same

console.log(engine.same(
  engine.evaluate(['Add', 2, 2]),
  engine.evaluate(['Add', 3, 1])
));
// ➔ true: the two expressions are the same once evaluated
```


## Advanced Usage

To improve performance, particularly when calling `format()`/`evaluate()`
repeatedly, use an instance of the `ComputeEngine` class. When the instance is
constructed, the dictionaries defining the symbols are compiled, and subsequent
invocations of the `format()` and `evaluate()` methods can skip that step.

Using a compute engine instance, it is possible to customize which symbol
dictionaries are used.

```js
const engine = new ComputeEngine(ComputeEngine.getDictionary('arithmetic'));
engine.evaluate(['Add', 5, 2]);
```

