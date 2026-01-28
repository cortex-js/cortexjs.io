---
title: Arithmetic
slug: /compute-engine/reference/arithmetic/
---

## Constants

<div className="symbols-table first-column-header" style={{"--first-col-width":"16h"}}>

| Symbol            | Value                        |                                                                                                                                                           |
| :---------------- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExponentialE`    | $$\approx 2.7182818284\ldots$$     | [Euler's number](https://www.wikidata.org/wiki/Q82435)                                                                                                    |
| `MachineEpsilon`  | $$ 2^{−52}$$               | The difference between 1 and the next larger floating point number. <br/>See [Machine Epsilon on Wikipedia](https://en.wikipedia.org/wiki/Machine_epsilon) |
| `CatalanConstant` | $$\approx 0.9159655941\ldots $$ | $$ \sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2n+1)^2} $$ <br/> See [Catalan's Constant on Wikipedia](https://en.wikipedia.org/wiki/Catalan%27s_constant)      |
| `GoldenRatio`     | $$\approx 1.6180339887\ldots$$  | $$ \frac{1+\sqrt{5}}{2} $$ <br/>See [Golden Ratio on Wikipedia](https://en.wikipedia.org/wiki/Golden_ratio)                                                  |
| `EulerGamma`      | $$\approx 0.5772156649\ldots $$ | See [Euler-Mascheroni Constant on Wikipedia](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)                                             |

</div>

<ReadMore path="/compute-engine/reference/trigonometry/" >
See also **Trigonometry** for `Pi` and related constants<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/reference/complex/" > 
See also **Complex** for `ImaginaryUnit`<Icon name="chevron-right-bold" />
</ReadMore>

## Functions

### Arithmetic Functions

<div className="symbols-table first-column-header">

| Function   | Notation                      |                                                                                            |
| :--------- | :---------------------------- | :----------------------------------------------------------------------------------------- |
| `Add`      | $$ a + b$$                  | [Addition](https://www.wikidata.org/wiki/Q32043)          |
| `Subtract` | $$ a - b$$                  | [Subtraction](https://www.wikidata.org/wiki/Q32043)       |
| `Negate`   | $$-a$$                      | [Additive inverse](https://www.wikidata.org/wiki/Q715358) |
| `Multiply` | $$ a\times b $$             | [Multiplication](https://www.wikidata.org/wiki/Q40276)    |
| `Divide`   | $$ \frac{a}{b} $$           | [Divide](https://www.wikidata.org/wiki/Q1226939)          |
| `Power`    | $$ a^b $$                   | [Exponentiation](https://www.wikidata.org/wiki/Q33456)    |
| `Root`     | $$\sqrt[n]{x}=x^{\frac1n}$$ | [n<sup>th</sup> root](https://www.wikidata.org/wiki/Q601053)        |
| `Sqrt`     | $$\sqrt{x}=x^{\frac12}$$    | [Square root](https://www.wikidata.org/wiki/Q134237)      |
| `Square`   | $$x^2$$                     |                                                           |

</div>

### Sums and Products

<FunctionDefinition name="Sum">

<Signature name="Sum">_xs_: collection</Signature>

Evaluate to a sum of all the elements in _collection_. If all the elements are
numbers, the result is a number. Otherwise it is an `["Add"]` expression.

<Latex flow="column" value="\sum x_{i}"/>

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23

["Sum", ["List", 5, 7, "x" , "y"]]
// ➔ ["Add", 12, "x", "y"]
```

Note this is equivalent to:

```json example
["Reduce", ["List", 5, 7, 11], "Add"]
```


<Signature name="Sum" returns="number">_body_: function, ..._bounds_: tuple</Signature>

Evaluate to the sum of `body` for each value in `bounds`.

<Latex flow="column" value="\sum{i=1}^{10} i+1"/>

```json example
["Sum", ["Add", "i", 1], ["Tuple", "i", 1, 10]]
// ➔ 65
```

#### Simplification

When `simplify()` is called on a `Sum` expression with symbolic bounds, the following closed-form formulas are applied when applicable:

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\sum_{n=1}^{b} c$$ | $$b \cdot c$$ | Constant body |
| $$\sum_{n=a}^{b} n$$ | $$\frac{b(b+1) - a(a-1)}{2}$$ | Triangular number (general bounds) |
| $$\sum_{n=1}^{b} n^2$$ | $$\frac{b(b+1)(2b+1)}{6}$$ | Sum of squares |
| $$\sum_{n=1}^{b} n^3$$ | $$\left[\frac{b(b+1)}{2}\right]^2$$ | Sum of cubes |
| $$\sum_{n=0}^{b} r^n$$ | $$\frac{1-r^{b+1}}{1-r}$$ | Geometric series |
| $$\sum_{n=0}^{b} (-1)^n$$ | $$\frac{1+(-1)^b}{2}$$ | Alternating unit series |
| $$\sum_{n=0}^{b} (-1)^n \cdot n$$ | $$(-1)^b \lfloor\frac{b+1}{2}\rfloor$$ | Alternating linear series |
| $$\sum_{n=0}^{b} (a + dn)$$ | $$(b+1)\left(a + \frac{db}{2}\right)$$ | Arithmetic progression |
| $$\sum_{n=1}^{b} c \cdot f(n)$$ | $$c \cdot \sum_{n=1}^{b} f(n)$$ | Factor out constant |

Edge cases:
- Empty range (upper < lower): returns `0`
- Single iteration (upper = lower): substitutes the bound value and returns the body

</FunctionDefinition>

<FunctionDefinition name="Product">

<Signature name="Product">_xs_: collection</Signature>

Evaluate to a product of all the elements in `collection`.

If all the elements are numbers, the result is a number. Otherwise it is a `["Multiply"]` expression.


<Latex value="\prod x_{i}"/>

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385

["Product", ["List", 5, "x", 11]]
// ➔ ["Multiply", 55, "x"]
```

Note this is equivalent to:

```json example
["Reduce", ["List", 5, 7, 11], "Multiply"]
```


<Signature name="Product">_f_: function, _bounds_:tuple</Signature>

Return the product of `body`for each value in `bounds`.

<Latex value="\prod_{i=1}^{n} f(i)"/>

```json example
["Product", ["Add", "x", 1], ["Tuple", "x", 1, 10]]
// ➔ 39916800
```

#### Simplification

When `simplify()` is called on a `Product` expression with symbolic bounds, the following closed-form formulas are applied when applicable:

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\prod_{n=1}^{b} c$$ | $$c^b$$ | Constant body |
| $$\prod_{n=1}^{b} n$$ | $$b!$$ | Factorial |
| $$\prod_{n=1}^{b} (2n-1)$$ | $$(2b-1)!!$$ | Odd double factorial |
| $$\prod_{n=1}^{b} 2n$$ | $$2^b \cdot b!$$ | Even double factorial |
| $$\prod_{n=1}^{b} c \cdot f(n)$$ | $$c^b \cdot \prod_{n=1}^{b} f(n)$$ | Factor out constant |

Edge cases:
- Empty range (upper < lower): returns `1`
- Single iteration (upper = lower): substitutes the bound value and returns the body

</FunctionDefinition>


### Transcendental Functions

<div className="symbols-table first-column-header">

| Function     | Notation                |                                                                                                                            |
| :----------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `Exp`        | $$\exponentialE^{x}$$ | [Exponential function](https://www.wikidata.org/wiki/Q168698)                             |
| `Ln`         | $$\ln(x)$$            | [Logarithm function](https://www.wikidata.org/wiki/Q11197), the natural logarithm, the inverse of `Exp`          |
| `Log`        | $$\log_b(x)$$         | `["Log", <v>, <b>]`<br/> Logarithm of base _b_, default 10                                     |
| `Lb`         | $$\log_2(x)$$         | [Binary logarithm function](https://www.wikidata.org/wiki/Q581168), the base-2 logarithm  |
| `Lg`         | $$\log_{10}(x)$$     | [Common logarithm](https://www.wikidata.org/wiki/Q966582), the base-10 logarithm                                        |
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

<div className="symbols-table first-column-header">

| Function | Notation     |                                                                                                                   |
| :------- | :----------- | :---------------------------------------------------------------------------------------------------------------- |
| `Abs`    | $$\|x\| $$ | Absolute value, [magnitude](https://www.wikidata.org/wiki/Q3317982)              |
| `Ceil`   | $$\lceil x \rceil $$ | Rounds a number up to the next largest integer                                   |
| `Floor`  | $$\lfloor x \rfloor$$ | Round a number to the greatest integer less than the input value                 |
| `Chop`   |              | Replace real numbers that are very close to 0 (less than $$10^{-10}$$) with 0  |
| `Round`  |              |                                                                                  |

</div>

### Other Relational Operators

<FunctionDefinition name="Congruent">

<Signature name="Congruent">_a_, _b_, _modulus_</Signature>

Evaluate to `True` if `a` is congruent to `b` modulo `modulus`.



```json example
["Congruent", 26, 11, 5]
// ➔ True
```

<Latex value=" 26 \equiv 11 \pmod{5}" flow="column"/>

</FunctionDefinition>




### Other Functions




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








## Relational Operators

<div className="symbols-table first-column-header">

| Function       | Notation         |                                                                       |
| :------------- | :--------------- | :------------------------------------------------------------------------------ |
| `Equal`        | $$ x = y $$    | Mathematical relationship asserting that two quantities have the same value |
| `NotEqual`     | $$ x \ne y $$  |                                                                                 |
| `Greater`      | $$ x \gt y $$  | |
| `GreaterEqual` | $$ x \geq y $$ |                                                                                 |
| `Less`         | $$ x \lt y $$  |                                                                                 |
| `LessEqual`    | $$ x \leq y $$ |                                                                                 |

See below for additonal relational operators: `Congruent`, etc...

</div>

## Polynomial Arithmetic

These functions operate on polynomial expressions.

<div className="symbols-table first-column-header">

| Function               | Description                                                      |
| :--------------------- | :--------------------------------------------------------------- |
| `Expand`               | Expand products and positive integer powers                      |
| `ExpandAll`            | Recursively expand products and positive integer powers          |
| `Factor`               | Factor an expression into irreducible factors                    |
| `Together`             | Combine rational expressions into a single fraction              |
| `Distribute`           | Distribute multiplication over addition                          |
| `PolynomialDegree`     | Return the degree of a polynomial                                |
| `CoefficientList`      | Return the list of coefficients of a polynomial                  |
| `PolynomialQuotient`   | Return the quotient of polynomial division                       |
| `PolynomialRemainder`  | Return the remainder of polynomial division                      |
| `PolynomialGCD`        | Return the greatest common divisor of two polynomials            |
| `Cancel`               | Cancel common polynomial factors in a rational expression        |

</div>

<FunctionDefinition name="Expand">

<Signature name="Expand">_expr_</Signature>

Expand out products and positive integer powers in `expr`.

```json example
["Expand", ["Power", ["Add", "x", 1], 2]]
// ➔ ["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]
```

</FunctionDefinition>

<FunctionDefinition name="ExpandAll">

<Signature name="ExpandAll">_expr_</Signature>

Recursively expand out products and positive integer powers in `expr` and all subexpressions.

</FunctionDefinition>

<FunctionDefinition name="Factor">

<Signature name="Factor">_expr_</Signature>

Factor an algebraic expression into a product of irreducible factors.

```json example
["Factor", ["Add", ["Power", "x", 2], ["Multiply", 2, "x"], 1]]
// ➔ ["Power", ["Add", "x", 1], 2]
```

</FunctionDefinition>

<FunctionDefinition name="Together">

<Signature name="Together">_expr_</Signature>

Combine rational expressions into a single fraction with a common denominator.

```json example
["Together", ["Add", ["Divide", 1, "x"], ["Divide", 1, "y"]]]
// ➔ ["Divide", ["Add", "x", "y"], ["Multiply", "x", "y"]]
```

</FunctionDefinition>

<FunctionDefinition name="Distribute">

<Signature name="Distribute">_expr_</Signature>

Distribute multiplication over addition in `expr`.

```json example
["Distribute", ["Multiply", "a", ["Add", "b", "c"]]]
// ➔ ["Add", ["Multiply", "a", "b"], ["Multiply", "a", "c"]]
```

</FunctionDefinition>

<FunctionDefinition name="PolynomialDegree">

<Signature name="PolynomialDegree">_poly_, _var_</Signature>

Return the degree of the polynomial `poly` with respect to the variable `var`.

```json example
["PolynomialDegree", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ 3
```

</FunctionDefinition>

<FunctionDefinition name="CoefficientList">

<Signature name="CoefficientList">_poly_, _var_</Signature>

Return the list of coefficients of the polynomial `poly` with respect to the variable `var`, ordered from lowest to highest degree.

```json example
["CoefficientList", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], "x"]
// ➔ ["List", 1, 2, 0, 1]
```

The result represents the polynomial $$ 1 + 2x + 0x^2 + 1x^3 $$.

</FunctionDefinition>

<FunctionDefinition name="PolynomialQuotient">

<Signature name="PolynomialQuotient">_dividend_, _divisor_, _var_</Signature>

Return the quotient of the polynomial division of `dividend` by `divisor` with respect to the variable `var`.

```json example
["PolynomialQuotient", ["Subtract", ["Power", "x", 3], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Add", ["Power", "x", 2], "x", 1]
```

This represents $$ \frac{x^3 - 1}{x - 1} = x^2 + x + 1 $$.

</FunctionDefinition>

<FunctionDefinition name="PolynomialRemainder">

<Signature name="PolynomialRemainder">_dividend_, _divisor_, _var_</Signature>

Return the remainder of the polynomial division of `dividend` by `divisor` with respect to the variable `var`.

```json example
["PolynomialRemainder", ["Add", ["Power", "x", 3], ["Multiply", 2, "x"], 1], ["Add", "x", 1], "x"]
// ➔ -2
```

</FunctionDefinition>

<FunctionDefinition name="PolynomialGCD">

<Signature name="PolynomialGCD">_a_, _b_, _var_</Signature>

Return the greatest common divisor of two polynomials `a` and `b` with respect to the variable `var`.

```json example
["PolynomialGCD", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1], "x"]
// ➔ ["Subtract", "x", 1]
```

This represents $$ \gcd(x^2 - 1, x - 1) = x - 1 $$.

</FunctionDefinition>

<FunctionDefinition name="Cancel">

<Signature name="Cancel">_expr_, _var_</Signature>

Cancel common polynomial factors in the numerator and denominator of the rational expression `expr` with respect to the variable `var`.

```json example
["Cancel", ["Divide", ["Subtract", ["Power", "x", 2], 1], ["Subtract", "x", 1]], "x"]
// ➔ ["Add", "x", 1]
```

This represents $$ \frac{x^2 - 1}{x - 1} = x + 1 $$ after canceling the common factor $$(x - 1)$$.

</FunctionDefinition>
