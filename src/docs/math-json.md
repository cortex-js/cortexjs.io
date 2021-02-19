---
title: MathJSON
permalink: /guides/math-json/
layout: single
date: Last Modified
sidebar:
    - nav: "mathjson"
---
<script type='module'>
    import {renderMathInDocument} from '//unpkg.com/mathlive/dist/mathlive.mjs';
    renderMathInDocument();
</script>
# MathJSON

<img src='/assets/MathJSON-1.png' style='margin-bottom:2em;  border-radius:8px; border:1px solid #203346'>

The MathJSON format is a lightweight data interchange format for mathematical
notation.

| Math                      | MathJSON                                                                  |
| :------------------------- | :------------------------------------------------------------------------ |
| <math>$$\frac{n}{1+n}$$</math>            | `["Divide", "n", ["Add", 1, "n"]]`                                        |
| $$e^{\imaginaryI \pi }+1=0$$ | `["Equal",  ["Add", ["Power", "ExponentialE", ["Multiply", "Pi", "ImaginaryI"], 1]], 0]` |
| $$\sin^{-1}^\prime(x)$$      | `[["Derivative", 1, ["InverseFunction", "Sin"]], "x"]`                    |



The MathJSON library for Typescript/Javascript can be used to manipulate 
MathJSON expressions.

```js
import { parse, serialize } from 'math-json';

console.log(parse('\\frac{\\pi}{2}'));
// ➔ ["Divide", "Pi", 2]

console.log(serialize([["InverseFunction", "Sin"], "x"));
// ➔ \sin^{-1}x

```

## Next

- [MathJSON format](/guides/math-json-format)
- [MathJSON API](/docs/mathjson)
- [MathJSON Default Dictionary](/guides/math-json-dictionary)
