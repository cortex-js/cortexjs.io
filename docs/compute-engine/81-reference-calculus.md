---
title: Calculus
slug: /compute-engine/reference/calculus/
---

<Intro>
Calculus is the mathematical study of continuous change. 
</Intro>

It has two main branches: differential calculus and integral calculus. 
These two branches are related by the fundamental theorem of calculus:

<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>


...where $ F $ is an **antiderivative** of $ f $, that is $ F' = f $.

**To calculate the derivative of a function**, use the `D` function to
calculate a symbolic derivative or `ND` to calculate a numerical approximation

**To calculate the integral (antiderivative) of a function**, use the
 `Integrate` function to calculate a symbolic integral or `NIntegrate` to 
 calculate a numerical approximation.

**To calculate the limit of a function**, use the `Limit` function.

**To solve a differential equation**, use the `DSolve` function to find a
symbolic solution or `NDSolve` to compute a numerical approximation.

## Derivative

The derivative of a function is a measure of how the function changes as its input changes.
It is the ratio of the change in the value of a function to the change in its input value.
The derivative of a function $$ f(x) $$ with respect to its input $$ x $$ is denoted by:

<Latex flow="column" value="f'(x)"/>
<Latex flow="column" value="\frac{df}{dx}"/>


The derivative of a function $$ f(x) $$ is defined as:

<center>
$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$
</center>

where $$ \lim_{h \to 0} \frac{f(x + h) - f(x)}{h} $$ is the limit of the ratio of the change in the value of the function to the change in its input value as $$ h $$ approaches $$ 0 $$.
 
The limit is taken as $$ h $$ approaches $$ 0 $$ because the derivative is the instantaneous rate of change of the function at a point, and the change in the input value must be infinitesimally small to be instantaneous.

<b>Reference</b>
- **Wikipedia**: [Derivative](https://en.wikipedia.org/wiki/Derivative)
- **Wikipedia**: [Notation for Differentiation](https://en.wikipedia.org/wiki/Notation_for_differentiation), [Leibniz's Notation](https://en.wikipedia.org/wiki/Leibniz%27s_notation), [Lagrange's Notation](https://en.wikipedia.org/wiki/Lagrange%27s_notation),  [Newton's Notation](https://en.wikipedia.org/wiki/Newton%27s_notation)
- **Wolfram Mathworld**: [Derivative](https://mathworld.wolfram.com/Derivative.html)
- **NIST**: [Derivative](https://dlmf.nist.gov/2.1#E1)

<b>Lagrange Notation (Prime Notation)</b>

When the prime notation is followed by arguments, the differentiation variable
is inferred from the first argument:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'(x)`               | `["D", ["f", "x"], "x"]` |
| `f''(x)`              | `["D", ["D", ["f", "x"], "x"], "x"]` |
| `f'''(x)`             | Third derivative with nested `D` |
| `\sin'(x)`            | `["D", ["Sin", "x"], "x"]` |

When the prime notation is used without arguments, it represents a derivative operator:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'`                  | `["Derivative", "f"]` |
| `f\prime`             | `["Derivative", "f"]` |
| `f^{\prime}`          | `["Derivative", "f"]` |
| `f''`                 | `["Derivative", "f", 2]` |
| `f^{(n)}`             | `["Derivative", "f", n]` |

<b>Newton Notation (Dot Notation)</b>

Newton's notation uses dots above the variable to indicate time derivatives.
This is common in physics for derivatives with respect to time.

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\dot{x}`             | `["D", "x", "t"]` |
| `\ddot{x}`            | `["D", ["D", "x", "t"], "t"]` |
| `\dddot{x}`           | Third derivative w.r.t. time |
| `\ddddot{x}`          | Fourth derivative w.r.t. time |

The time variable defaults to `"t"` but can be configured via the
`timeDerivativeVariable` parser option:

```javascript
ce.parse('\\dot{x}', { timeDerivativeVariable: 'τ' })
// → ["D", "x", "τ"]
```

<b>Euler Notation (Subscript Notation)</b>

Euler's notation uses subscripts to indicate the differentiation variable:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `D_x f`               | `["D", "f", "x"]` |
| `D_t x`               | `["D", "x", "t"]` |
| `D^2_x f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x^2 f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x (x^2 + 1)`       | `["D", ["Add", ["Square", "x"], 1], "x"]` |

Note: Plain `D` without a subscript is parsed as a symbol, not a derivative operator.

<b>Leibniz Notation</b>

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\frac{d}{dx}f`       | `["D", "f", "x"]` |
| `\frac{df}{dx}`       | `["D", "f", "x"]` |
| `\frac{d^2f}{dx^2}`   | `["D", ["D", "f", "x"], "x"]` |

<b>Partial Derivative Notation</b>

The partial-derivative symbol $\partial$ is parsed into the same `D` operator,
in both the Euler form $\partial_x f$ and the Leibniz form $\partial f / \partial x$.

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\partial_x f(x, y)`  | `["D", ["f", "x", "y"], "x"]` |
| `\frac{\partial}{\partial x} f(x, y)` | `["D", ["f", "x", "y"], "x"]` |
| `\frac{\partial^2}{\partial x \partial y} f(x, y)` | `["D", ["f", "x", "y"], "x", "y"]` |
| `\frac{\partial^2}{\partial x^2} f(x, y)` | `["D", ["f", "x", "y"], "x", "x"]` |

The `Derivative` function represents a derivative of a function with respect to a single variable.
The `D` function is used to calculate the symbolic derivative of a function with respect to one or more variables.
The `ND` function is used to calculate a numerical approximation of the derivative of a function.

<FunctionDefinition name="D">

<Signature name="D" returns="(number -> number)">_f_: number -> number, _var_: symbol</Signature>

The `D` function represents the partial derivative of a function `f` with respect to
the variable `var`.

:::info[Note on LaTeX Notation]
The LaTeX notation `D(f, x)` does **not** parse as a derivative. Since `D(f, x)` is
not standard mathematical notation for derivatives, it is parsed as a predicate
application `["Predicate", "D", "f", "x"]`.

To compute derivatives in LaTeX, use Leibniz notation: `\frac{d}{dx}f` or
`\frac{\partial}{\partial x}f`.

To construct derivatives directly in MathJSON, use `["D", expr, "x"]`.
:::

<Latex value=" f^\prime(x)"/>

```json example
["D", "f", "x"]
```

<Signature name="D" returns="(number -> number)">_f_, ..._var_: symbol</Signature>

Multiple variables can be specified to compute the partial derivative of a multivariate
function.

<Latex value=" f^\prime(x, y)"/>

<Latex value=" f'(x, y)"/>

```json example
["D", "f", "x", "y"]
```

A variable can be repeated to compute the second derivative of a function.

<Latex value=" f^{\prime\prime}(x)"/>

<Latex value=" f\doubleprime(x)"/>

```json example
["D", "f", "x", "x"]
```

Differentiating an application of an **unknown** function keeps the result
symbolic. The partial with respect to each argument is carried as a multi-index
`Derivative` (see the `Derivative` function below):

```json example
    ["D", ["f", "x", "y"], "x"]
evaluates to
    ["Apply", ["Derivative", "f", 1, 0], "x", "y"]
```




</FunctionDefinition>

### Supported Derivative Formulas

The `D` function supports symbolic differentiation for the following functions.
For functions not listed, the chain rule is applied and a symbolic derivative
is returned. For an unknown univariate function this is
`Apply(Derivative(f, 1), x)`; for an unknown multivariate function each partial
is carried as a multi-index `Derivative` (see **Partial derivatives of unknown
functions** below), e.g. `D(f(x, y), x)` evaluates to
`Apply(Derivative(f, 1, 0), x, y)`.

<div className="symbols-table">

| Function | Derivative | Notes |
| :------- | :--------- | :---- |
| **Trigonometric** | | |
| `Sin(x)` | `Cos(x)` | |
| `Cos(x)` | `-Sin(x)` | |
| `Tan(x)` | `Sec(x)²` | |
| `Sec(x)` | `Tan(x)·Sec(x)` | |
| `Csc(x)` | `-Cot(x)·Csc(x)` | |
| `Cot(x)` | `-Csc(x)²` | |
| **Inverse Trigonometric** | | |
| `Arcsin(x)` | `1/√(1-x²)` | |
| `Arccos(x)` | `-1/√(1-x²)` | |
| `Arctan(x)` | `1/(1+x²)` | |
| `Arccot(x)` | `-1/(1+x²)` | |
| **Hyperbolic** | | |
| `Sinh(x)` | `Cosh(x)` | |
| `Cosh(x)` | `Sinh(x)` | |
| `Tanh(x)` | `Sech(x)²` | |
| `Sech(x)` | `-Tanh(x)·Sech(x)` | |
| `Csch(x)` | `-Coth(x)·Csch(x)` | |
| `Coth(x)` | `-Csch(x)²` | |
| **Inverse Hyperbolic** | | |
| `Arsinh(x)` | `1/√(x²+1)` | |
| `Arcosh(x)` | `1/√(x²-1)` | |
| `Artanh(x)` | `1/(1-x²)` | |
| `Arcoth(x)` | `-1/(1-x²)` | |
| `Arsech(x)` | `-1/(x·√(1-x²))` | |
| `Arcsch(x)` | `-1/(\|x\|·√(1+x²))` | |
| **Logarithmic & Exponential** | | |
| `Ln(x)` | `1/x` | Natural logarithm |
| `Log(x)` | `1/(x·ln(10))` | Base-10 logarithm |
| `Log(x, b)` | `1/(x·ln(b))` | Custom base logarithm |
| `Sqrt(x)` | `1/(2√x)` | |
| `Root(x, n)` | `x^(1/n-1)/n` | nth root |
| `Power(a, x)` | `a^x·ln(a)` | Exponential with constant base |
| `Power(x, n)` | `n·x^(n-1)` | Power rule |
| `Power(f, g)` | Full formula | When both base and exponent depend on x |
| **Special Functions** | | |
| `Abs(x)` | `Sign(x)` | Undefined at 0 |
| `Gamma(x)` | `Gamma(x)·Digamma(x)` | |
| `LogGamma(x)` | `Digamma(x)` | |
| `Digamma(x)` | `Trigamma(x)` | |
| `Erf(x)` | `(2/√π)·e^(-x²)` | Error function |
| `Erfc(x)` | `-(2/√π)·e^(-x²)` | Complementary error function |
| `Erfi(x)` | `(2/√π)·e^(x²)` | Imaginary error function |
| `FresnelS(x)` | `sin(πx²/2)` | Fresnel sine integral |
| `FresnelC(x)` | `cos(πx²/2)` | Fresnel cosine integral |
| `LambertW(x)` | `W(x)/(x·(1+W(x)))` | Lambert W function |
| **Bessel Functions** | | |
| `BesselJ(n, x)` | `(J_{n-1}(x) - J_{n+1}(x))/2` | First kind |
| `BesselY(n, x)` | `(Y_{n-1}(x) - Y_{n+1}(x))/2` | Second kind |
| `BesselI(n, x)` | `(I_{n-1}(x) + I_{n+1}(x))/2` | Modified first kind |
| `BesselK(n, x)` | `-(K_{n-1}(x) + K_{n+1}(x))/2` | Modified second kind |
| **Step Functions** | | |
| `Floor(x)` | `0` | Derivative is 0 almost everywhere |
| `Ceil(x)` | `0` | Derivative is 0 almost everywhere |
| `Round(x)` | `0` | Derivative is 0 almost everywhere |
| `Mod(x, n)` | `0` | Derivative is 0 almost everywhere |
| `GCD(x, n)` | `0` | Discrete function |
| `LCM(x, n)` | `0` | Discrete function |

</div>

:::info[Chain Rule]
For all supported functions, the chain rule is automatically applied. For example,
`d/dx sin(x²) = cos(x²)·2x`.
:::


<FunctionDefinition name="ND">

<Signature name="ND" returns="number">_f_: number -> number, _x_: number</Signature>

The `ND` function returns a numerical approximation of the partial derivative of a function $f$ at the point $x$.

<Latex value=" \sin^{\prime}(x)|_{x=1}"/>

```json example
["ND", "Sin", 1]
// ➔ 0.5403023058681398
```

**Note:** `["ND", "Sin", 1]` is equivalent to `["Apply", ["D", "Sin"], 1]`.


</FunctionDefinition>



<FunctionDefinition name="Derivative">

<Signature name="Derivative" returns="(number -> number)">_f_: number -> number</Signature>

The `Derivative` function represents the derivative of a function $f$.

<Latex value=" f^\prime(x)"/>

```json example
["Apply", ["Derivative", "f"], "x"]
```



<Signature name="Derivative" returns="(number -> number)">_f_: number -> number, _n_: integer</Signature>

When an argument $n$ is present it represents the _n_-th derivative of a function _expr_.

<Latex value="f^{(n)}(x)"/>

```json example
["Apply", ["Derivative", "f", "n"], "x"]
```



<Signature name="Derivative" returns="(number -> number)">_f_: (number, ...) -> number, _n₁_: integer, _n₂_: integer, ...</Signature>

For a function of several arguments, the order argument is a **multi-index**:
one differentiation order per argument of _f_. `["Derivative", "f", 1, 0]` is the
partial derivative of a bivariate _f_ with respect to its first argument, and
`["Derivative", "f", 0, 1]` with respect to its second. Mixed and higher-order
partials accumulate on the multi-index — `["Derivative", "f", 1, 1]` is
$\partial^2 f / \partial x\,\partial y$, `["Derivative", "f", 2, 0]` is
$\partial^2 f / \partial x^2$. This follows the convention of Mathematica's
`Derivative[n₁, n₂, …][f]`.

When applied to plain symbols, a multi-index derivative serializes in Leibniz
notation; unapplied it uses the parenthesized index list $f^{(1,0)}$.

<Latex value="\frac{\partial}{\partial x} f(x, y)"/>

```json example
["Apply", ["Derivative", "f", 1, 0], "x", "y"]
```

**Partial derivatives of unknown functions.** Differentiating an application of
an unknown function produces these forms automatically via the multivariate
chain rule:

```json example
    ["D", ["f", "x", "y"], "x"]
evaluates to
    ["Apply", ["Derivative", "f", 1, 0], "x", "y"]
```


`Derivative` is an operator in the mathematical sense, that is, a function that takes a function
as an argument and returns a function.

The `Derivative` function is used to represent the derivative of a function in a symbolic form. It is not used to calculate the derivative of a function. To calculate the derivative of a function, use the `D` function or `ND` to calculate a numerical approximation.

```json example
    ["Derivative", "f", "x"]
is equivalent to
    ["D", ["f", "x"], "x"]
```

</FunctionDefinition> 

## Integral


The integral of a function $$ f(x) $$
is denoted by:

<Latex flow="column" value="\int f(x) dx"/>

<Latex flow="column" value="\int \! f(x) \,\mathrm{d}x"/>


:::info[Note]
The commands `\!` and `\,` adjust the spacing. The `\!` command reduces the space between the integral sign and the integrand, while the `\,` command increases the space before the differential operator `d`.

The `\mathrm` command is used to typeset the differential operator `d` in an upright font.

These typesetting conventions are part of the **ISO 80000-2:2009** standard for mathematical notation, but are
not universally adopted.
:::


The **indefinite integral** of a function $$ f(x) $$ is the family of all antiderivatives of a function:

<center>
$$\int f(x) \,\mathrm{d}x = F(x) + C$$
</center>

where $$F(x)$$ is the antiderivative of $$f(x)$$, meaning $$F'(x) = f(x)$$ and $$C$$ is the constant of integration, accounting for the fact that there are many functions that can have the same derivative, differing only by a constant.

A **definite integral** of a function $$ f(x) $$ is the signed area under the curve of the function between two points $$ a $$ and $$ b $$:


<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>

<Latex flow="column" value="\int_a^b f(x) dx "/>

The `\limits` command controls the placement of the limits of integration.

<Latex flow="column" value="\int\limits_C f "/>

A **double integral** of a function $$ f(x, y) $$ is the signed volume under the surface of the function between two points $$ a $$ and $$ b $$ in the x-direction and two points $$ c $$ and $$ d $$ in the y-direction:

<Latex flow="column" value="\int_c^d \int_a^b f(x, y) dx dy "/>

The `\iint` command is used to typeset the double integral symbol.
<Latex flow="column" value="\iint\limits_S f "/>
<Latex flow="column" value="\iint\limits_S f(x, y) dx dy "/>



**To calculate the symbolic integral of a function,** use the `Integrate` function. 

**To calculate a numerical approximation of the integral of a function**, use the `NIntegrate` function.

<ReadMore path="/compute-engine/guides/integration-rules/" >
The optional **Integration Rules** library extends `Integrate` with a large
rule set (ported from Rubi) for harder algebraic integrands. Read more about
**Extended Symbolic Integration** <Icon name="chevron-right-bold" />
</ReadMore>


<b>Reference</b>
- Wikipedia: [Integral](https://en.wikipedia.org/wiki/Integral), [Antiderivative](https://en.wikipedia.org/wiki/Antiderivative), [Integral Symbol](https://en.wikipedia.org/wiki/Integral_symbol)
- Wolfram Mathworld: [Integral](https://mathworld.wolfram.com/Integral.html)
- NIST: [Integral](https://dlmf.nist.gov/2.1#E1)


<FunctionDefinition name="Integrate">
<Signature name="Integrate" returns="function">_f_: function</Signature>

Evaluates to a symbolic **indefinite integral** of a function $$ f $$.

<Latex flow="column" value="\int \sin"/>

```json example
["Integrate", "Sin"]
```

The argument `f`, the **integrand**, is a function literal, which can be expressed in different ways:

- As a symbol whose value is a function: `["Integrate", "f"]`
- As a symbol for a built-in function: `["Integrate", "Sin"]`
- As a `["Function"]` expression: `["Integrate", ["Function", ["Sin", "x"], "x"]]`
- As a shorthand function literal: `["Integrate", ["Power", "_", 2]]`
- As an expression with unknowns: `["Integrate", ["Power", "x", 2]]`


<Signature name="Integrate">_f_: function, ..._var_:symbol</Signature>

Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $$ x $$.

<Latex flow="column" value="\int \sin x \,\mathrm{d}x"/>

```json example
["Integrate", ["Sin", "x"], "x"]
```

Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $ x $ and $ y $.

<Latex flow="column" value="\int \sin x^2 + y^2 dx dy"/>

```json example
["Integrate", 
  ["Add", ["Sin", ["Power", "x", 2]], ["Power", "y", 2]], 
  "x", "y"
]
```


Symbolic **indefinite integral** of a function $$ f $$ with respect to a variable $$ x $$, applied twice.

<Latex flow="column" value="\int \sin x dx dx"/>

```json example
["Integrate", ["Sin", "x"], "x", "x"]
```


<Signature name="Integrate" returns="function">_f_: function, ..._limits_:tuple</Signature>

A **definite integral** of a function $$ f $$. The function is evaluated
symbolically as: 

<center>
$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$
</center>

where $$ F $$ is the antiderivative of $$ f $$.



The `limits` tuples indicate the variable of integration and the limits of integration.

The first element of the tuple is the variable of integration, and the second and third elements are the lower and upper limits of integration, respectively.


<Latex flow="column" value="\int_{0}^{2} x^2 dx"/>

```json example
["Integrate", 
  ["Power", "x", 2], 
  ["Tuple", "x", 0, 2]
]
```

The variable of integration can be omitted if it is the same as the argument of 
the function.

```json example
["Integrate", 
  ["Power", "x", 2], 
  ["Tuple", 0, 2]
]
```

Double integrals can be computed by specifying more than one limit.
<Latex flow="column" value="\int_1^3\int_0^2 x^2+y^2 dx dy"/>

```json example
["Integrate", 
  ["Add", ["Power", "x", 2], ["Power", "y", 2]], 
  ["Tuple", "x", 0, 2], 
  ["Tuple", "y", 1, 3]
]
```

Some functions do not have a closed form for their antiderivative, and the integral cannot be computed symbolically. In this case, the `Integrate` function returns a symbolic representation of the integral. Use `NIntegrate` to compute a numerical approximation of the integral.



</FunctionDefinition> 

<FunctionDefinition name="NIntegrate">
<Signature name="NIntegrate" returns="number">_f_:function, ..._limits_:tuple</Signature>

Calculate a **numerical approximation** of the definite integral of a function.

<Latex flow="column" value="\int_{0}^{2} x^2 dx"/>

```json example
["NIntegrate", ["Power", "x", 2], ["Tuple", 0, 2]]
// -> 2.6666666666666665
```

The `limits` tuples indicate the variable of integration and the limits of integration.

The first element of the tuple is the variable of integration, and the second 
and third elements are the lower and upper limits of integration, respectively.

The variable of integration can be omitted if it is the same as the argument of 
the function.

```json example
["NIntegrate", ["Power", "x", 2], ["Tuple", 0, 2]]
// -> 2.6666666666666665
```



A double integral can be computed by specifying more than one limit.

<Latex flow="column" value="\int_1^3\int_0^2 x^2+y^2 dx dy"/>

```json example
["NIntegrate", 
  ["Add", ["Power", "x", 2], ["Power", "y", 2]], 
  ["Tuple", 0, 2], 
  ["Tuple", 1, 3]
]
// -> 20.666666666666668
```

The numerical approximation is computed using a **Monte Carlo** method.


</FunctionDefinition>

### Supported Integral Formulas

The `Integrate` function supports symbolic integration for standard forms including
polynomials, exponentials, logarithms, trigonometric functions, and their compositions.
Below are some notable integration patterns:

#### Logarithmic Patterns

The pattern $\int \frac{1}{x \ln x} dx$ is recognized as a case where the denominator
is a product and one factor is the derivative of another:

$$
\int \frac{1}{x \ln x} \, dx = \ln|\ln x| + C
$$

```javascript
ce.parse('\\int \\frac{1}{x\\ln x} dx').evaluate()
// → ln(|ln(x)|)

ce.parse('\\int \\frac{3}{x\\ln x} dx').evaluate()
// → 3·ln(|ln(x)|)
```

This uses u-substitution: since $\frac{1}{x} = \frac{d}{dx}(\ln x)$, the integral
becomes $\int \frac{h'(x)}{h(x)} dx = \ln|h(x)| + C$.

#### Exponential-Trigonometric Products

Products of exponentials and trigonometric functions require the "solve for the
integral" technique (also known as cyclic integration):

$$
\int e^x \sin x \, dx = \frac{e^x}{2}(\sin x - \cos x) + C
$$

$$
\int e^x \cos x \, dx = \frac{e^x}{2}(\sin x + \cos x) + C
$$

```javascript
ce.parse('\\int e^x \\sin x dx').evaluate()
// → -1/2·cos(x)·e^x + 1/2·sin(x)·e^x

ce.parse('\\int e^x \\cos x dx').evaluate()
// → 1/2·sin(x)·e^x + 1/2·cos(x)·e^x
```

This also works with linear arguments in the trigonometric function:

```javascript
ce.parse('\\int e^x \\sin(2x) dx').evaluate()
// → -2/5·cos(2x)·e^x + 1/5·sin(2x)·e^x

ce.parse('\\int e^x \\cos(2x) dx').evaluate()
// → 1/5·cos(2x)·e^x + 2/5·sin(2x)·e^x
```

The general formulas used are:
- $\int e^x \sin(ax+b) \, dx = \frac{e^x}{a^2+1}(\sin(ax+b) - a\cos(ax+b)) + C$
- $\int e^x \cos(ax+b) \, dx = \frac{e^x}{a^2+1}(a\sin(ax+b) + \cos(ax+b)) + C$


## Limit

The limit of a function $$ f(x) $$ as $$ x $$ approaches a value $$ a $$ is the value that
$$ f(x) $$ approaches as $$ x $$ gets arbitrarily close to $$ a $$.

It is denoted by:

<Latex flow="column" value="\lim_{x \to a} f(x)"/>

```json example
["Limit", ["f", "x"], "a"]
```

<FunctionDefinition name="Limit">

<Signature name="Limit" returns="number">_f_: function, _value_: number</Signature>

Evaluate the function _f_ as it approaches the value _value_.

<Latex flow="column" value="\lim_{x \to 0} \frac{\sin(x)}{x}"/>


```json example
["Limit", ["Divide", ["Sin", "_"], "_"], 0]

["Limit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
```

This function evaluates to a numerical approximation when using `expr.N()`. To
get a numerical evaluation with `expr.evaluate()`, use `NLimit`.

</FunctionDefinition>

<FunctionDefinition name="NLimit">

<Signature name="NLimit">_f_: function, _value_: number</Signature>

Evaluate the function _f_ as it approaches the value _value_.

```json example
["NLimit", ["Divide", ["Sin", "_"], "_"], 0]
// ➔ 1

["NLimit", ["Function", ["Divide", ["Sin", "x"], "x"], "x"], 0]
// ➔ 1
```

The numerical approximation is computed using a Richardson extrapolation
algorithm.

</FunctionDefinition>

## Differential Equations

A **differential equation** is an equation that relates a function to its
derivatives. An **ordinary differential equation** (ODE) involves a function of
a single variable and its derivatives.

The unknown function is written as an applied function, for example `["y", "x"]`,
and its derivative with `D`, for example `["D", ["y", "x"], "x"]`.

**To solve a differential equation symbolically**, use the `DSolve` function.

**To compute a numerical approximation of the solution**, use the `NDSolve`
function.

:::info[Note]
Differential equation support is an initial, deliberately narrow slice:
`DSolve` handles first-order linear scalar equations, and `NDSolve` handles
explicit scalar first-order initial value problems. Equations outside these
classes are left unevaluated (returned as-is).
:::

<b>Reference</b>
- Wikipedia: [Ordinary differential equation](https://en.wikipedia.org/wiki/Ordinary_differential_equation), [Runge–Kutta methods](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods)
- Wolfram Mathworld: [Ordinary Differential Equation](https://mathworld.wolfram.com/OrdinaryDifferentialEquation.html)


<FunctionDefinition name="DSolve">

<Signature name="DSolve" returns="list">_eq_: expression, _y_: symbol, _x_: symbol</Signature>

Solve the ordinary differential equation _eq_ for the function _y_ with respect
to the independent variable _x_.

<Latex flow="column" value="y'(x) = y(x)"/>

```json example
["DSolve", ["Equal", ["D", ["y", "x"], "x"], ["y", "x"]], "y", "x"]
// ➔ ["List", ["Equal", ["y", "x"], ["Multiply", "C", ["Power", "ExponentialE", "x"]]]]
```

`DSolve` returns a `List` of solutions, each an `Equal` expression giving
_y(x)_. An integration constant `C` is introduced (a different name is chosen if
`C` is already in use).

Currently `DSolve` solves **first-order linear scalar** equations of the form:

<center>
$$ y'(x) + p(x)\,y(x) = q(x) $$
</center>

| Equation | Solution |
| :--- | :--- |
| $y' = y$ | $y = C\,e^{x}$ |
| $y' = x^2$ | $y = \frac{1}{3}x^3 + C$ |
| $y' + y = x$ | $y = x - 1 + C\,e^{-x}$ |
| $y' + 2xy = 0$ | $y = C\,e^{-x^2}$ |

Nonlinear or higher-order equations are not yet supported and are left
unevaluated (the `DSolve` expression is returned as-is).

</FunctionDefinition>


<FunctionDefinition name="NDSolve">

<Signature name="NDSolve" returns="list">_eq_: expression, _y_: symbol, _limits_: tuple, _y0_: number, _steps_: number?</Signature>

Compute a numerical approximation of the solution of the **initial value
problem** _eq_ for the function _y_ over the interval given by _limits_, with
initial value _y0_.

`NDSolve` handles **explicit scalar first-order** initial value problems:

<center>
$$ y'(x) = f(x, y), \quad y(x_0) = y_0 $$
</center>

The equation must isolate the derivative on one side, for example
`["Equal", ["D", ["y", "x"], "x"], f]`.

The _limits_ argument is a `Limits` or `Tuple` of `(x, x0, x1)` giving the
independent variable and the bounds of the integration interval. _y0_ is the
value of _y_ at _x0_. The optional _steps_ argument is the number of integration
steps (default 100).

```json example
["NDSolve",
  ["Equal", ["D", ["y", "x"], "x"], ["y", "x"]],
  "y",
  ["Tuple", "x", 0, 1],
  1,
  100
]
// ➔ ["List", ["List", 0, 1], …, ["List", 1, 2.7182818…]]
```

`NDSolve` returns a `List` of `[x, y]` sample pairs (of length _steps_ + 1),
computed with a fixed-step fourth-order **Runge–Kutta** (RK4) method. This works
even when the solution has no elementary closed form.

Implicit, higher-order, or stiff equations are not yet supported and are left
unevaluated.

</FunctionDefinition>

