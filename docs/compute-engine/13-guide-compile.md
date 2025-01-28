---
title: Compiling Expressions
slug: /compute-engine/guides/compiling/
---

<Intro>
The Compute Engine **LaTeX expressions** can compile expressions to **JavaScript functions**!
</Intro>

## Introduction

Some expressions can take a long time to evaluate numerically, for example if
they contain a large number of terms or involve a loop \\((\sum\\) or
\\(\prod\\)).

In this case, it is useful to compile the expression into a JavaScript function
that can be evaluated much faster.

For example this approximation: $ \pi \approx \textstyle\sqrt{6\sum^{10^6}_{n=1}\frac{1}{n^2}} $

```live
const expr = ce.parse("\\sqrt{6\\sum^{10^2}_{n=1}\\frac{1}{n^2}}");

// Numerical evaluation using the Compute Engine
console.time('evaluate');
console.timeEnd('evaluate', expr.evaluate());

// Compilation to a JavaScript function and execution
console.time('compile');
const fn = expr.compile();
console.timeEnd('compile', fn());
```

## Compiling

**To get a compiled version of an expression** use the `expr.compile()` method:

```javascript
const expr = ce.parse("2\\prod_{n=1}^{\\infty} \\frac{4n^2}{4n^2-1}");
const fn = expr.compile();
```

**To evaluate the compiled expression** call the function returned by
`expr.compile()`:

```javascript
console.log(fn());
// ➔ 3.141592653589793
```

If the expression cannot be compiled, the `compile()` method will throw an error.

## Arguments

The function returned by `expr.compile()` can be called with an object literal
containing the value of the arguments:

```live
const expr = ce.parse("n^2");
const fn = expr.compile();

for (let i = 1; i < 10; i++) console.log(fn({ n: i }));
```

**To get a list of the unknows of an expression** use the `expr.unknowns`
property:

```live
console.log(ce.parse("n^2").unknowns);

console.log(ce.parse("a^2+b^3").unknowns);
```

## Limitations

The calculations are only performed using machine precision numbers.

Complex numbers, arbitrary precision numbers, and symbolic calculations are not
supported.

Some functions are not supported.

If the expression cannot be compiled, the `compile()` method will throw an 
error. The expression can be numerically evaluated as a fallback:

```live
function compileOrEvaluate(expr) {
  try {
    const fn = expr.compile();
    return   fn() + " (compiled)";
  } catch (e) {
    return   expr.N().numericValue + " (evaluated)";
  }
}

  // `expr.compile()` can handle this expression
  console.log(compileOrEvaluate(ce.parse("\\frac{\\sqrt{5}+1}{2}")));


  // `expr.compile()` cannot handle complex numbers, so it throws
  // and we fall back to numerical evaluation with expr.N()
  console.log(compileOrEvaluate(ce.parse("-i\\sqrt{-1}")));

```
