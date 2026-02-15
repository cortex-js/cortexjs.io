---
title: Numeric Evaluation
slug: /compute-engine/guides/numeric-evaluation/
date: Last Modified
---

<Intro>
To obtain an exact numeric evaluation of an expression use `expr.evaluate()`. 
To obtain a numeric approximation use `expr.N()`.
</Intro>

## Parse + Numeric Free Function

For the common "parse then numeric approximation" flow, use the `N()` free
function:

```live
// import { N } from '@cortex-js/compute-engine';
console.log(N("\\sqrt{2}"));
```

The `N()` free function accepts either a LaTeX string or an `Expression`.
It uses a shared `ComputeEngine` instance created on first call.


## Exact Evaluation

An evaluation with `expr.evaluate()` preserves **exact values**.

Exact values are:

<div className="symbols-table no-header" style={{"--first-col-width":"25ch"}}>

| Type                         | Examples                                      |
|------------------------------|-----------------------------------------------|
| Integers       | $42$, $-1234$                        |
| Rationals       | $\nicefrac{3}{4}$, $-\nicefrac{11}{7}$                       |
| Square Roots of Integers     | $\sqrt{2}$, $-3\sqrt{5}$                       |
| Constants                    | $e$ (`ExponentialE`), $\pi$ (`Pi`)            |

</div>

```live
console.log(ce.parse('1/3 + 1/4').evaluate());

console.log(ce.parse('\\sqrt{2} + \\sqrt{3} + \\sqrt{75}').evaluate());
```



## Numeric Approximation

**To force the evaluation of an expression to be a numeric approximation**, use `expr.N()`.

```live
console.log(ce.parse('1/3 + 1/4').N());
console.log(ce.parse('\\sqrt{2} + \\sqrt{3} + \\sqrt{75}').N());
```


When using `expr.evaluate()`, if one of the arguments is not an exact value 
the expression is automatically evaluated as a **numeric approximation**.

```live
console.log(ce.parse('1/3 + 1/4 + 1.24').evaluate());
```

## Angular Units

When a trigonometric function is given a unitless value, the Compute Engine
interprets it using the current angular unit. Set it with `ce.angularUnit`
(default: `"rad"`).

Valid values: `"rad"`, `"deg"`, `"grad"`, `"turn"`.

```live
ce.angularUnit = "deg";
console.log(ce.parse("\\cos 60").N());
// ➔ 0.5
```

## JavaScript Interoperability

The result of `expr.evaluate()` and `expr.N()` is a expression. 

The `numericValue` property of this expression is either a machine number 
(a JavaScript `number`), a `NumericValue` object or `null` if the expression 
is not a number.


While a `NumericValue` object can represent arbitrary precision numbers, for 
use with JavaScript, a reduced precision approximation can be accessed using
the `re` (for the real part of the number) and `im` (for the imaginary part)
properties.

```js
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().re);
// ➔ 0.5833333333333334
```

Another way to obtain a JavaScript compatible representation of an expression
is to use the `valueOf()` method of the expression.

```js
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().valueOf());
// ➔ 0.5833333333333334
```

The `valueOf()` method of a expression can be used in JavaScript
expressions.

```live
const expr = ce.parse('1/3 + 1/4');
console.log(expr.N().valueOf() + 1);
```

Unlike the `.re` property, `valueOf()` can also return a `boolean` or a
`string`, depending on the value of the expression.



**To get an `Expression` number literal from a JavaScript number**, use `ce.box()` or `ce.number()`.

```live
const expr = ce.box(1.5);
console.log(expr.valueOf());
```


## Numeric Precision

The number of significant digits used in numeric calculations is controlled
by the `ce.precision` property of the `ComputeEngine` instance.

```live
ce.precision = 30;
console.log(ce.parse('\\pi').N().json);
```

The default precision is 21.

**To set the precision to the default value**, use `ce.precision = "auto"`.


### Machine Precision

If the precision is 15 or less, the Compute Engine uses a
[64-bit binary floating point format](https://en.wikipedia.org/wiki/IEEE_754)
for its internal calculations.

This format is implemented in hardware and well suited to do fast computations.
It uses a fixed amount of memory and represents significant digits in base-2 with
about 15 digits of precision and with a minimum value of $ \pm5\times 10^{-324} $ and a maximum value of $ \pm1.7976931348623157\times 10^{+308} $

**To change the precision to machine precision**, use
`ce.precision = "machine"`.


With this precision, some calculations that have a value very close to 0 
may return 0 and some calculations that have a value greater than the 
maximum value representable by a machine number may return $ \pm\infty $.

:::warning
Some numeric evaluations using machine numbers cannot produce exact
results.

```ts
ce.precision = 'machine';
console.log(ce.parse('0.1 + 0.2').N().json);
// ➔ "0.30000000000000004"
```

While $ 0.1 $ and $ 0.2 $ look like "round numbers" in base-10, they can
only be represented by an approximation in base-2, which introduces cascading
errors when manipulating them.

<ReadMore path="https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html" >
Read **"What Every Computer Scientist Should Know About Floating-Point
Arithmetic"** by David Goldberg <Icon name="chevron-right-bold" />
</ReadMore>

:::


### Arbitrary Precision

If `ce.precision` is greater than 15, numbers are represented as bignum numbers,
a string of base-10 digits and an exponent.

Bignum numbers have a minimum value of $ \pm 10^{-9\,000\,000\,000\,000\,000} $ and a maximum value of $ \pm9.99999\ldots \times 10^{+9\,000\,000\,000\,000\,000} $.


```ts
ce.precision = 21;
console.log(ce.parse('0.1 + 0.2').N().json);
// ➔ "0.3"
```

Trigonometric operations are accurate for precision up to 1,000.

### Serialization

The `precision` property affects how the computations are performed, but not how
they are serialized. 

**To change the number of digits when serializing to LaTeX**, use
`expr.toLatex({ precision: 6 })` to set it to 6 significant digits, for
example.

The LaTeX precision is adjusted automatically when the `precision` is changed so
that the display precision is never greater than the computation precision.

When the precision is greater than 15, the return value of `expr.N().json` may 
be a MathJSON number that looks like this:

```json example
{
  "num": "3.141592653589793238462643383279502884197169399375105820974944
  5923078164062862089986280348253421170679821480865132823066470938446095
  5058223172535940812848111745028410270193852110555964462294895493038196
  4428810975665933446128475648233786783165271201909145648566923460348610
  4543266482133936072602491412737245870066063155881748815209209628292540
  9173643678925903600113305305488204665213841469519415116094330572703657
  5959195309218611738193261179310511854807446237996274956735188575272489
  1227938180119491298336733624406566430860213949463952247371907021798609
  4370277053921717629317675238467481846766940513200056812714526356082778
  5771342757789609173637178721468440901224953430146549585371050792279689
  2589235420199561121290219608640344181598136297747713099605187072113499
  9999837297804995105973173281609631859502445945534690830264252230825334
  4685035261931188171010003137838752886587533208381420617177669147303598
  2534904287554687311595628638823537875937519577818577805321712268066130
  01927876611195909216420199"
}
```



## Repeated Evaluation

**To repeatedly evaluate an expression** use `ce.assign()` to change the value
of variables. `ce.assign()` changes the value associated with one or more
variables in the current scope.

`ce.assign()` accepts booleans, numbers, bigints, expressions, or
functions. Use `undefined` to clear a value.

```live
const expr = ce.parse("3x^2+4x+2");

for (let x = 0; x < 1; x += 0.01) {
  ce.assign('x', x);
  console.log(`f(${x}) = ${expr.evaluate()}`);
}
```

You can also use `expr.subs()`, but this will create a brand new expression on
each iteration, and will be much slower.

```live
const expr = ce.parse("3x^2+4x+2");

for (let x = 0; x < 1; x += 0.01) {
  console.log(`f(${x}) = ${expr.subs({ x }).evaluate()}`);
}
```

**To reset a variable to be unbound to a value** use `ce.assign()`

```live
ce.assign("x", undefined);

console.log(ce.parse("3x^2+4x+2").N());
// ➔ "3x^2+4x+2"
```

**To change the value of a variable** set its `value` property:

```ts
ce.symbol("x").value = 5;

ce.symbol("x").value = undefined;
```


## Compiling

If performance is important, the expression can be compiled to a JavaScript
function.

**To get a compiled version of an expression** use the `compile()` function:

```js
import { compile } from '@cortex-js/compute-engine';

const expr = ce.parse("3x^2+4x+2");
const result = compile(expr);
for (const x = 0; x < 1; x += 0.01) console.log(result.run({ x }));
```

:::info[Note]
The syntax `{x}` is a shortcut for `{"x": x}`, in other words it defines an
argument named `"x"` (which is used in the definition of the expression `expr`) 
with the value of the JavaScript variable `x` (which is used in the for loop).
:::

This will usually result in a much faster evaluation than using `expr.N()` but
this approach has some limitations.

<ReadMore path="/compute-engine/guides/compiling/" > Read more about **Compiling
Expressions to JavaScript** <Icon name="chevron-right-bold" /></ReadMore>

## Simplifying Before Evaluating

**When using `expr.N()`, no rewriting of the expression is done before it is
evaluated.**

Because of the limitations of machine numbers, this may produce surprising
results.

For example:

```js
ce.precision = "machine";
const x = ce.parse("0.1 + 0.2").N();
console.log(ce.box(["Subtract", x, x]).N());
// ➔ 2.7755575615628914e-17
```

However, the result of $ x - x $ from `ce.simplify()` is $ 0 $ since the
simplification is done symbolically, before any floating point calculations are
made.

```js
const x = ce.parse('0.1 + 0.2').N();
console.log(ce.parse('x - x').simplify());
// ➔ 0
```

In some cases, it may be advantageous to invoke `expr.simplify()` before using
`expr.N()`.

## Tolerance

Two numbers that are sufficiently close to each other are considered equal.

**To control how close two numbers have to be before they are considered
equal**, set the `tolerance` property of a `ComputeEngine` instance.

By default, the tolerance is $ 10^{-10} $.

The tolerance is accounted for by the `Chop` function to determine when to
replace a number of a small magnitude with the exact integer 0.

It is also used when doing some comparison to zero: a number whose absolute
value is smaller than the tolerance will be considered equal to 0.

## Numeric Functions

The topics below from the
[MathJSON Standard Library](/compute-engine/standard-library/) can provide numeric
evaluations for their numeric functions:

<div className="symbols-table" style={{"--first-col-width":"16ch"}}>

| Topic                                                             | Symbols/Functions                                                      |
| :---------------------------------------------------------------- | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)               | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                   | `Derivative` `Integrate`...                                                |
| [Complex](/compute-engine/reference/complex/)                     | `Real` `Conjugate`, `ComplexRoots`...                                  |
| [Special Functions](/compute-engine/reference/special-functions/) | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)               | `StandardDeviation` `Mean` `Erf`...                                    |
| [Trigonometry](/compute-engine/reference/trigonometry/)           | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>
