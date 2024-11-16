---
title: Arithmetic
slug: /compute-engine/reference/arithmetic/
---

## Constants

<div className="symbols-table" style={{"--first-col-width":"16h"}}>

| Symbol            | Value                        |                                                                                                                                                           |
| :---------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExponentialE`    | $$2.7182818284\ldots$$     | [Euler's number](https://www.wikidata.org/wiki/Q82435)                                                                                                    |
| `MachineEpsilon`  | $$ 2^{−52}$$               | The difference between 1 and the next larger floating point number. <br/>See [Machine Epsilon on Wikipedia](https://en.wikipedia.org/wiki/Machine_epsilon) |
| `CatalanConstant` | $$ = 0.9159655941\ldots $$ | $$ \sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2n+1)^2} $$ <br/> See [Catalan's Constant on Wikipedia](https://en.wikipedia.org/wiki/Catalan%27s_constant)      |
| `GoldenRatio`     | $$ = 1.6180339887\ldots$$  | $$ \frac{1+\sqrt{5}}{2} $$ See [Golden Ratio on Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)                                                  |
| `EulerGamma`      | $$ = 0.5772156649\ldots $$ | See [Euler-Mascheroni Constant on Wikipedia](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)                                             |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" >
See also **Trigonometry** for `Pi` and related constants<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for `ImaginaryUnit` and related functions<Icon name="chevron-right-bold" />
</ReadMore>

## Relational Operators

<div className="symbols-table">

| Function       | Notation         |                                                                       |
| :------------- | :--------------- | :------------------------------------------------------------------------------ |
| `Equal`        | $$ x = y $$    | <br/>Mathematical relationship asserting that two quantities have the same value |
| `Greater`      | $$ x \gt y $$  |                                                                                 |
| `GreaterEqual` | $$ x \geq y $$ |                                                                                 |
| `Less`         | $$ x \lt y $$  |                                                                                 |
| `LessEqual`    | $$ x \leq y $$ |                                                                                 |
| `NotEqual`     | $$ x \ne y $$  |                                                                                 |

See below for additonal relational operators: `Congruent`, etc...

</div>

## Functions

<div className="symbols-table">

| Function   | Notation                      |                                                                                            |
| :--------- | :---------------------------- | :----------------------------------------------------------------------------------------- |
| `Add`      | $$ a + b$$                  | [Addition](https://www.wikidata.org/wiki/Q32043)          |
| `Subtract` | $$ a - b$$                  | [Subtraction](https://www.wikidata.org/wiki/Q32043)       |
| `Negate`   | $$-a$$                      | [Additive inverse](https://www.wikidata.org/wiki/Q715358) |
| `Multiply` | $$ a\times b $$             | [Multiplication](https://www.wikidata.org/wiki/Q40276)    |
| `Divide`   | $$ \frac{a}{b} $$           | [Divide](https://www.wikidata.org/wiki/Q1226939)          |
| `Power`    | $$ a^b $$                   | [Exponentiation](https://www.wikidata.org/wiki/Q33456)    |
| `Root`     | $$\sqrt[n]{x}=x^{\frac1n}$$ | [nth root](https://www.wikidata.org/wiki/Q601053)        |
| `Sqrt`     | $$\sqrt{x}=x^{\frac12}$$    | [Square root](https://www.wikidata.org/wiki/Q134237)      |
| `Square`   | $$x^2$$                     |                                                           |

</div>

### Transcendental Functions

<div className="symbols-table">

| Function     | Notation                |                                                                                                                            |
| :----------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `Exp`        | $$\exponentialE^{x}$$ | [Exponential function](https://www.wikidata.org/wiki/Q168698)                             |
| `Ln`         | $$\ln(x)$$            | [Logarithm function](https://www.wikidata.org/wiki/Q11197), the inverse of `Exp`          |
| `Log`        | $$\log_b(x)$$         | `["Log", _v_, _b_]` logarithm of base _b_, default 10                                     |
| `Lb`         | $$\log_2(x)$$         | [Binary logarithm function](https://www.wikidata.org/wiki/Q581168), the base-2 logarithm  |
| `Lg`         | $$\log\_{10}(x)$$     | [Common logarithm](https://www.wikidata.org/wiki/Q966582), the base-10 logarithm                                        |
| `LogOnePlus` | $$\ln(x+1)$$          |                                                                                           |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" > 
See also **Trigonometry** for trigonometric functions <Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for complex functions <Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/statistics/" > 
See also **Statistics** for statistics functions and functions on lists<Icon name="chevron-right-bold" />
</ReadMore>

### Rounding

<div className="symbols-table">

| Function | Notation     |                                                                                                                   |
| :------- | :----------- | :---------------------------------------------------------------------------------------------------------------- |
| `Abs`    | $$\|x\| $$ | Absolute value, [magnitude](https://www.wikidata.org/wiki/Q3317982)              |
| `Ceil`   |              | Rounds a number up to the next largest integer                                   |
| `Chop`   |              | Replace real numbers that are very close to 0 (less than $$10^{-10}$$) with 0  |
| `Floor`  |              | Round a number to the greatest integer less than the input value                 |
| `Round`  |              |                                                                                  |

</div>

### Other Relational Operators

<FunctionDefinition name="Congruent">

<Signature name="Congruent">_a_, _b_, _modulus_</Signature>

Evaluate to `True` if `a` is congruent to `b` modulo `modulus`.

<Latex value=" 26 \equiv 11 \pmod{5}"/>


```json example
["Congruent", 26, 11, 5]
// ➔ True
```


</FunctionDefinition>


### Other Functions

<FunctionDefinition name="BaseForm">

<Signature name="BaseForm">_value:integer_</Signature>

<Signature name="BaseForm">_value:integer_, _base_</Signature>

Format an _integer_ in a specific _base_, such as hexadecimal or binary.

If no _base_ is specified, use base-10.

The sign of _integer_ is ignored.

- _value_ should be an integer.
- _base_ should be an integer from 2 to 36.

```json example
["Latex", ["BaseForm", 42, 16]]

// ➔ (\text(2a))_{16}
```

```cortex
Latex(BaseForm(42, 16))
// ➔ (\text(2a))_{16}
String(BaseForm(42, 16))
// ➔ "'0x2a'"
```

</FunctionDefinition>

<FunctionDefinition name="Clamp">

<Signature name="Clamp">_value_</Signature>

<Signature name="Clamp">_value_, _lower_, _upper_</Signature>

- If `value` is less than `lower`, evaluate to `lower`
- If `value` is greater than `upper`, evaluate to `upper`
- Otherwise, evaluate to `value`

If `lower`and `upper`are not provided, they take the default values of -1 and
+1.

```json example
["Clamp", 0.42]
// ➔ 1
["Clamp", 4.2]
// ➔ 1
["Clamp", -5, 0, "+Infinity"]
// ➔ 0
["Clamp", 100, 0, 11]
// ➔ 11
```

</FunctionDefinition>

<FunctionDefinition name="Max">

<Signature name="Max">_x1_, _x2_, ...</Signature>

<Signature name="Max">_list_</Signature>

If all the arguments are real numbers, excluding `NaN`, evaluate to the largest
of the arguments.

Otherwise, simplify the expression by removing values that are smaller than or
equal to the largest real number.

```json example
["Max", 5, 2, -1]
// ➔ 5
["Max", 0, 7.1, "NaN", "x", 3]
// ➔ ["Max", 7.1, "NaN", "x"]
```

</FunctionDefinition>

<FunctionDefinition name="Min">

<Signature name="Max">_x1_, _x2_, ...</Signature>

<Signature name="Max">_list_</Signature>

If all the arguments are real numbers, excluding `NaN`, evaluate to the smallest
of the arguments.

Otherwise, simplify the expression by removing values that are greater than or
equal to the smallest real number.

<Latex value=" \min(0, 7.1, 3) = 0"/>

```json example
["Min", 5, 2, -1]
// ➔ -1
["Min", 0, 7.1, "x", 3]
// ➔ ["Min", 0, "x"]
```


</FunctionDefinition>

<FunctionDefinition name="Mod">

<Signature name="Mod">_a_, _b_</Signature>

Evaluate to the Euclidian division (modulus) of `a` by `b`.

When `a` and `b` are positive integers, this is equivalent to the `%` operator in
JavaScript, and returns the remainder of the division of `a` by `b`.

However, when `a` and `b` are not positive integers, the result is different.

The result is always the same sign as `b`, or 0.

```json example
["Mod", 7, 5]
// ➔ 2

["Mod", -7, 5]
// ➔ 3

["Mod", 7, -5]
// ➔ -3

["Mod", -7, -5]
// ➔ -2
```

</FunctionDefinition>


<FunctionDefinition name="Rational">

<Signature name="Rational">_n_</Signature>

Evaluate to a rational approximating the value of the number `n`.

```json example
["Rational", 0.42]
// ➔ ["Rational", 21, 50]
```


<br/>

<Signature name="Rational">_numerator_, _denominator_</Signature>

Represent a rational number equal to `numerator`over `denominator`.

</FunctionDefinition>


<FunctionDefinition name="Numerator">

<Signature name="Numerator">_expr_</Signature>

Return the numerator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Numerator", ["Rational", 4, 5]]
// ➔ 4
```

</FunctionDefinition>

<FunctionDefinition name="Denominator">

<Signature name="Denominator">_expr_</Signature>

Return the denominator of `expr`.

Note that `expr` may be a non-canonical form.


```json example
["Denominator", ["Rational", 4, 5]]
// ➔ 5
```
</FunctionDefinition>


<FunctionDefinition name="NumeratorDenominator">

<Signature name="NumeratorDenominator">_expr_</Signature>

Return the numerator and denominator of `expr` as a sequence.

Note that `expr` may be a non-canonical form.

```json example
["NumeratorDenominator", ["Rational", 4, 5]]
// ➔ ["Sequence", 4, 5]
```

The sequence can be used with another function, for example GCD to 
check if the fraction is in its canonical form:

```json example
["GCD", ["NumeratorDenominator", ["Rational", 4, 5]]]
// ➔ 1

["GCD", ["NumeratorDenominator", ["Rational", 8, 10]]]
// ➔ 2
```

</FunctionDefinition>





