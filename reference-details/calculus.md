<!-- The detail of the entries of /reference/calculus/. Format: README.md. -->

## Section: Derivatives, integrals and limits

| To compute | Symbolically | Numerically |
| :-- | :-- | :-- |
| a derivative | `D` | `nd` |
| an integral | `integrate` | `nIntegrate` |
| a limit | `limit` | `nLimit` |
| a series expansion | `series` | |
| a differential equation | `dSolve` | `ndSolve`, `ndSolveFunction` |

The derivative of a function is its rate of change, the limit of
`(f(x + h) - f(x))/h` as `h` approaches 0. An antiderivative `F` of `f` is a
function whose derivative is `f`, and the fundamental theorem of calculus
gives a definite integral from an antiderivative:

$$\int_a^b f(x) \,\mathrm{d}x = F(b) - F(a)$$

### The variable stays symbolic

The variable of `D`, `integrate` and `limit` is a **bound variable**: its
declared type and the assumptions about it apply, but a value assigned to a
symbol of the same name does not, and the variable stays symbolic in the
result. Every other symbol is free, and is replaced by its value:

```epsil
let x = 5
[D(x^2, x), integrate(x^2, x), limit(x^2, x, 0)]
// ➔ [2x,1/3 * x^3,0]
let x = 5
let a = 3
D(a * x^2, x)
// ➔ 6x
```

To evaluate a result at the value of the variable, evaluate it again, or
substitute the value.

## D

`D(f, x)` is the derivative of the expression `f` with respect to `x`. With
no variable, it is the single free variable of `f`, or `x` when there are
several and one of them is `x`. With several variables, it is the partial
derivative with respect to each in turn, so a repeated variable gives a
higher derivative. `D(f, [x, n])` is the `n`-th derivative in `x`. A negative
order is an error; a fractional or symbolic order, or an order above 1,000,
leaves the derivative unevaluated.

```epsil
[D(x^3), D(x^3, x, x), D(x^2 * y^3, x, y)]
// ➔ [3x^2,6x,6x * y^2]
[D(x^5, [x, 3]), D(sin(x^2), x)]
// ➔ [60x^2,2x * cos(x^2)]
D(x^5, [x, -1])
// ➔ error: Static error: expected positive integer at `-1` in `D(x ^ 5, [x, -1])`
```

The derivative of a call of an **unknown** function stays symbolic: the
partial derivative with respect to each argument is a multi-index
`derivative`.

```epsil
[D(f(x), x), D(f(x, y), x)]
// ➔ [Apply(Derivative(f, 1), x),Apply(Derivative(f, 1, 0), x, y)]
```

#### Supported derivative formulas

`D` knows the derivatives of these functions, and applies the chain rule:
the derivative of `sin(x^2)` is `cos(x^2) · 2x`. For another function, the
result is a symbolic derivative, as for an unknown function.

<div className="symbols-table">

| Function | Derivative | Notes |
| :------- | :--------- | :---- |
| **Trigonometric** | | |
| `sin(x)` | `cos(x)` | |
| `cos(x)` | `-sin(x)` | |
| `tan(x)` | `sec(x)²` | |
| `sec(x)` | `tan(x)·sec(x)` | |
| `csc(x)` | `-cot(x)·csc(x)` | |
| `cot(x)` | `-csc(x)²` | |
| **Inverse Trigonometric** | | |
| `arcsin(x)` | `1/√(1-x²)` | |
| `arccos(x)` | `-1/√(1-x²)` | |
| `arctan(x)` | `1/(1+x²)` | |
| `arccot(x)` | `-1/(1+x²)` | |
| **Hyperbolic** | | |
| `sinh(x)` | `cosh(x)` | |
| `cosh(x)` | `sinh(x)` | |
| `tanh(x)` | `sech(x)²` | |
| `sech(x)` | `-tanh(x)·sech(x)` | |
| `csch(x)` | `-coth(x)·csch(x)` | |
| `coth(x)` | `-csch(x)²` | |
| **Inverse Hyperbolic** | | |
| `arsinh(x)` | `1/√(x²+1)` | |
| `arcosh(x)` | `1/√(x²-1)` | |
| `artanh(x)` | `1/(1-x²)` | |
| `arcoth(x)` | `-1/(1-x²)` | |
| `arsech(x)` | `-1/(x·√(1-x²))` | |
| `arcsch(x)` | `-1/(\|x\|·√(1+x²))` | |
| **Logarithmic & Exponential** | | |
| `ln(x)` | `1/x` | Natural logarithm |
| `log(x)` | `1/(x·ln(10))` | Base-10 logarithm |
| `log(x, b)` | `1/(x·ln(b))` | Custom base logarithm |
| `sqrt(x)` | `1/(2√x)` | |
| `root(x, n)` | `x^(1/n-1)/n` | nth root |
| `Power(a, x)` | `a^x·ln(a)` | Exponential with constant base |
| `Power(x, n)` | `n·x^(n-1)` | Power rule |
| `Power(f, g)` | Full formula | When both base and exponent depend on x |
| **Special Functions** | | |
| `abs(x)` | `sign(x)` | Undefined at 0 |
| `gamma(x)` | `gamma(x)·digamma(x)` | |
| `logGamma(x)` | `digamma(x)` | |
| `digamma(x)` | `trigamma(x)` | |
| `erf(x)` | `(2/√π)·e^(-x²)` | Error function |
| `erfc(x)` | `-(2/√π)·e^(-x²)` | Complementary error function |
| `erfi(x)` | `(2/√π)·e^(x²)` | Imaginary error function |
| `fresnelS(x)` | `sin(πx²/2)` | Fresnel sine integral |
| `fresnelC(x)` | `cos(πx²/2)` | Fresnel cosine integral |
| `lambertW(x)` | `W(x)/(x·(1+W(x)))` | Lambert W function |
| `polyLog(s, z)` | `polyLog(s-1, z)/z` | In `z`; `polyLog(2, z)` gives `-ln(1-z)/z`. No closed form in `s` |
| `gamma(s, z)` | `-e^(-z)·z^(s-1)` | Upper incomplete gamma, in `z`. No closed form in `s` |
| `erfInv(x)` | `(√π/2)·e^(erfInv(x)²)` | Inverse error function |
| `beta(a, b)` | `beta(a, b)·(ψ(a) − ψ(a+b))` in `a`, `beta(a, b)·(ψ(b) − ψ(a+b))` in `b` | |
| `logBarnesG(z)` | `(z−1)ψ(z) − z + ½(1 + ln 2π)` | |
| `barnesG(z)` | `barnesG(z)·((z−1)ψ(z) − z + ½(1 + ln 2π))` | |
| `hurwitzZeta(s, a)` | `−s·hurwitzZeta(s+1, a)` | In `a`. No closed form in `s` |
| `lerchPhi(z, s, a)` | `(lerchPhi(z, s−1, a) − a·lerchPhi(z, s, a))/z` in `z`, `−s·lerchPhi(z, s+1, a)` in `a` | No closed form in `s` |
| `ellipticK(m)` | `(E(m) − (1−m)K(m))/(2m(1−m))` | Complete, parameter `m` |
| `ellipticE(m)` | `(E(m) − K(m))/(2m)` | Complete, parameter `m` |
| `hypergeometric2F1(a, b, c, z)` | `(ab/c)·hypergeometric2F1(a+1, b+1, c+1, z)` | In `z`. No closed form in `a`, `b`, `c` |
| `clausenCl(n, θ)` | `−½cot(θ/2)` for `n = 1`; `clausenCl(n−1, θ)` for an even `n`, `−clausenCl(n−1, θ)` for an odd `n` | Literal order; `θ` in radians |
| `arctan2(y, x)` | `-y/(x²+y²)` in `x`, `x/(x²+y²)` in `y` | Divided by the unit factor in a non-radian angular unit |
| **Bessel Functions** | | |
| `besselJ(n, x)` | `(J_{n-1}(x) - J_{n+1}(x))/2` | First kind |
| `besselY(n, x)` | `(Y_{n-1}(x) - Y_{n+1}(x))/2` | Second kind |
| `besselI(n, x)` | `(I_{n-1}(x) + I_{n+1}(x))/2` | Modified first kind |
| `besselK(n, x)` | `-(K_{n-1}(x) + K_{n+1}(x))/2` | Modified second kind |
| **Step Functions** | | |
| `floor(x)` | `0` | Derivative is 0 almost everywhere |
| `ceil(x)` | `0` | Derivative is 0 almost everywhere |
| `round(x)` | `0` | Derivative is 0 almost everywhere |
| `Mod(x, n)` | `1` | Derivative is 1 almost everywhere. In the modulus, `D(Mod(x, m), m)` is `-floor(x/m)` |
| `gcd(x, n)` | `0` | Discrete function |
| `lcm(x, n)` | `0` | Discrete function |

</div>

```epsil
[D(gamma(x), x), D(erf(x), x), D(Mod(x, m), m)]
// ➔ [Gamma(x) * Digamma(x),(2e^(-(x^2))) / sqrt(pi),-floor(x / m)]
```

**Removable points.** The closed forms of the derivatives of `ellipticK`,
`ellipticE`, `lambertW`, `polyLog` (in `z`) and `lerchPhi` (in `z`) are
`0/0` at 0. The derivative applied at 0 gives the value from the Maclaurin
series of the function. The closed form itself, `D(ellipticK(m), m)`, is
still `NaN` after the substitution `m = 0`.

```epsil
[derivative(ellipticK)(0), derivative(ellipticK, 2)(0)]
// ➔ [1/8 * pi,9/64 * pi]
```

**Integrals.** The derivative of a definite integral is the derivative of its
closed form when it has one. Otherwise it is taken under the integral sign
(the Leibniz rule), with a term for each bound that depends on the variable.
It stays unevaluated when the integrand has a step, a condition or a
singularity that depends on the variable (`floor(x + y)`, `ln(abs(x - y))`),
and for an integral over an infinite range with no closed form.

```epsil
[D(integrate(x * y, (x, 0, 1)), y), D(integrate(e^(t^3), (t, 0, x)), x)]
// ➔ [1/2,e^(x^3)]
D(integrate(e^(x^3 * y), (x, 0, 1)), y)
// ➔ int_(0)^(1)(x^3 * e^(y * x^3) dx)
```

The derivative of an indefinite integral with respect to its own variable is
the integrand, also when the integrand has no antiderivative in closed form.
With respect to another variable, it is the derivative of the antiderivative,
or the integral of the derivative of the integrand. These results hold up to
a constant of integration.

```epsil
D(integrate(x^2, x), x)
// ➔ x^2
D(integrate(e^(x^3), x), x)
// ➔ e^(x^3)
D(integrate(x^2 * y^3, x), y)
// ➔ x^3 * y^2
```

### MathJSON

`["D", f, var1, var2, ...]`, `["D", f, ["List", var, n]]` (or a `Set`).

```json example
["D", ["Power", "x", 5], ["List", "x", 3]]
// ➔ 60x^2
["D", ["f", "x", "y"], "x"]
// ➔ ["Apply", ["Derivative", "f", 1, 0], "x", "y"]
```

In LaTeX, `D(f, x)` is not a derivative: it parses as the predicate
`["Predicate", "D", "f", "x"]`. Write a derivative in Leibniz notation,
`\frac{d}{dx}f` or `\frac{\partial}{\partial x}f`. In the body of a sum or a
product, a variable with the index as subscript follows the index:
`\sum_{i=1}^{2} \frac{\partial}{\partial x_i} x_i^2` is
`["Add", ["Multiply", 2, "x_1"], ["Multiply", 2, "x_2"]]`.

**Lagrange Notation (Prime Notation)**

When the prime notation is followed by arguments, the differentiation variable
is inferred from the first argument:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'(x)`               | `["D", ["f", "x"], "x"]` |
| `f''(x)`              | `["D", ["D", ["f", "x"], "x"], "x"]` |
| `f'''(x)`             | Third derivative with nested `D` |
| `\sin'(x)`            | `["D", ["Sin", "x"], "x"]` |

When the prime notation is used without arguments on a **function** — a
symbol whose type is a function, such as one declared with `ce.declare("f",
"(number) -> number")` or assigned a function literal — it represents a
derivative operator:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `f'`                  | `["Derivative", "f"]` |
| `f\prime`             | `["Derivative", "f"]` |
| `f^{\prime}`          | `["Derivative", "f"]` |
| `f''`                 | `["Derivative", "f", 2]` |
| `f^{(n)}`             | `["Derivative", "f", n]` |
| `f^{(1,0)}`           | `["Derivative", "f", 1, 0]` |

A symbolic order (`f^{(n)}` with `n` unassigned) stays symbolic until `n` is
assigned, and is written `f^{(n)}`. `["Derivative", "f", 0]` is `f` itself.

On anything that is **not** a function — an undeclared symbol, a number-valued
symbol, a subscripted name whose subscript does not fold into the symbol
(`\alpha_{i+1}`, `A_{i,j}`) — a prime without arguments is the **primed
variable** `Prime`, a distinct value of the same kind as its base (`x'` as a
coordinate, `A'` as a point in geometry, `\sin a'` as a function of a primed
variable):

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `x'`                  | `["Prime", "x"]` |
| `x''`                 | `["Prime", "x", 2]` |
| `A_1'`                | `["Prime", "A_1"]` |
| `\alpha_{i+1}'`       | `["Prime", ["Subscript", "alpha", ["Add", "i", 1]]]` |

A parenthesized expression is always differentiated, with or without a
subscript: `(x^2)'` is `["Derivative", ["Delimiter", ["Square", "x"]]]`.

**Newton Notation (Dot Notation)**

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

In JavaScript, the parser option `timeDerivativeVariable` changes it:
`ce.parse('\\dot{x}', { timeDerivativeVariable: 'τ' })` is `["D", "x", "τ"]`.

**Euler Notation (Subscript Notation)**

Euler's notation uses subscripts to indicate the differentiation variable:

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `D_x f`               | `["D", "f", "x"]` |
| `D_t x`               | `["D", "x", "t"]` |
| `D^2_x f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x^2 f`             | `["D", ["D", "f", "x"], "x"]` |
| `D_x (x^2 + 1)`       | `["D", ["Add", ["Square", "x"], 1], "x"]` |

Note: Plain `D` without a subscript is parsed as a symbol, not a derivative operator.

**Leibniz Notation**

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\frac{d}{dx}f`       | `["D", "f", "x"]` |
| `\frac{df}{dx}`       | `["D", "f", "x"]` |
| `\frac{d^2f}{dx^2}`   | `["D", ["D", "f", "x"], "x"]` |

**Partial Derivative Notation**

The partial-derivative symbol $\partial$ is parsed into the same `D` operator,
in both the Euler form $\partial_x f$ and the Leibniz form $\partial f / \partial x$.

| LaTeX                 | MathJSON          |
| :-------------------- | :---------------- |
| `\partial_x f(x, y)`  | `["D", ["f", "x", "y"], "x"]` |
| `\frac{\partial}{\partial x} f(x, y)` | `["D", ["f", "x", "y"], "x"]` |
| `\frac{\partial^2}{\partial x \partial y} f(x, y)` | `["D", ["f", "x", "y"], "x", "y"]` |
| `\frac{\partial^2}{\partial x^2} f(x, y)` | `["D", ["f", "x", "y"], "x", "x"]` |

## ND

`nd(f, x0)` is a numerical approximation of the derivative of the expression
`f` at `x0`. The expression is written with its variable, `nd(sin(x), 1)`; a
bare function name, `nd(sin, 1)`, stays unevaluated.

```epsil
nd(sin(x), 1)
// ➔ 0.5403023058595877
```

### MathJSON

`["ND", f, x0]`.

## Derivative

`derivative(f)` is the derivative of the function `f`, a function. It is an
operator: it takes a function and gives a function. It represents a
derivative; `D` computes one. `derivative(f, n)` is the `n`-th derivative,
and `derivative(f, 0)` is `f`. For a function of several arguments, the order
is a **multi-index**, one order per argument: `derivative(f, 1, 0)` is the
partial derivative with respect to the first argument, and
`derivative(f, 1, 1)` the mixed partial derivative, as Mathematica's
`Derivative[n1, n2, …][f]`. A symbolic order stays symbolic until it has a
value.

```epsil
[derivative(sin)(x), derivative(f, 2)(x), derivative(f, 0)]
// ➔ [cos(x),Apply(Derivative(f, 2), x),f]
```

### MathJSON

`["Derivative", f]`, `["Derivative", f, n]`, `["Derivative", f, n1, n2, ...]`,
applied with `Apply`: `["Apply", ["Derivative", "f", 1, 0], "x", "y"]`. An
applied multi-index derivative of symbols is written in Leibniz notation in
LaTeX; unapplied, it is written `f^{(1,0)}`, which parses back to the same
`Derivative`.

## Integrate

`integrate(f, x)` is an antiderivative of `f` in `x`, and
`integrate(f, (x, a, b))` the definite integral from `a` to `b`. Several
variables or bounds give a multiple integral: the first bound is the
outermost integral, as for `sum`, so an inner bound can use the variable of
an outer one. The bounds can also be written flat after the variable.

```epsil
integrate(sin(x), x)
// ➔ -cos(x)
integrate(x^2, (x, 0, 2))
// ➔ 8/3
integrate(x^2 + y^2, (y, 1, 3), (x, 0, 2))
// ➔ 68/3
[integrate(x * y, (y, 0, 1), (x, 0, 2y)), integrate(y^2, y, 0, pi)]
// ➔ [1/2,1/3 * pi^3]
```

A function with no antiderivative in closed form gives an unevaluated
integral. Use `nIntegrate`, or `N`, for its value.

```epsil
integrate(e^(x^3), x)
// ➔ int(e^(x^3) dx)
```

An integral with only one bound is neither indefinite nor definite. No
default is chosen for the missing bound, and it stays unevaluated.

**Poles.** A definite integral whose integrand has a pole in the interval has
no finite value. When the integrand changes sign across the pole, the result
is `NaN`; when it keeps one sign, it is `+oo` or `-oo`, also for a pole at a
bound. When the position of a pole depends on a free symbol, the integral
stays unevaluated, unless the type of the symbol or an assumption puts the
pole outside the interval:

```epsil
[integrate(1/t, (t, -1, 1)), integrate(t^(-2), (t, 0, 1))]
// ➔ [NaN,+oo]
assume(a > 4)
integrate((y - a)^(-2), (y, 0, 4))
// ➔ -1 / a - 1 / (4 - a)
```

**A symbolic exponent.** When the exponent of a power is a symbol, the closed
form is the value only under a condition, and the result carries it. An
assumption such as `assume(n > 2)` discharges the condition. A numeric
exponent, or a constant one such as `t^pi`, has no condition, and neither
does the indefinite integral.

```epsil
integrate(t^n, (t, 0, 1))
// ➔ If(0 < n + 1, 1 / (n + 1))
integrate(t^(-n), (t, 1, 2))
// ➔ If(n != 1, -1 / (1 - n) + 2^(1 - n) / (1 - n))
```

At a finite bound where the antiderivative has no value, the value is the
limit of the antiderivative from inside the interval: `t ln(t) - t` has no
value at 0, and its limit from the right is 0.

```epsil
integrate(ln(t), (t, 0, 1))
// ➔ -1
```

#### Supported integral formulas

`integrate` handles polynomials, exponentials, logarithms, trigonometric
functions and their compositions. Some of the patterns:

- **A logarithmic derivative.** When one factor of the denominator is the
  derivative of another, as in `1/(x ln(x))`, the integral is
  `ln(abs(h(x)))`.
- **Exponential times sine or cosine,** by solving for the integral, also
  with a linear argument:
  $\int e^x \sin(ax+b) \, dx = \frac{e^x}{a^2+1}(\sin(ax+b) - a\cos(ax+b))$ and
  $\int e^x \cos(ax+b) \, dx = \frac{e^x}{a^2+1}(a\sin(ax+b) + \cos(ax+b))$.
- **Powers of sine and cosine.** `c sin(u)^m cos(u)^n`, with a linear `u` and
  integers `m` and `n`, by the odd-power substitution, or by the reduction
  formulas when both powers are even.

```epsil
[integrate(1/(x * ln(x)), x), integrate(3/(x * ln(x)), x)]
// ➔ [ln(|ln(x)|),3ln(|ln(x)|)]
integrate(e^x * sin(x), x)
// ➔ 1/2 * (-cos(x) + sin(x)) * e^x
integrate(e^x * cos(2x), x)
// ➔ 1/5 * cos(2x) * e^x + 2/5 * sin(2x) * e^x
[integrate(sin(x)^3, x), integrate(sin(2x)^3 * cos(2x)^2, x)]
// ➔ [1/3 * cos(x)^3 - cos(x),-1/6 * cos(2x)^3 + 1/10 * cos(2x)^5]
```

**Piecewise integrands.** A definite integral over a finite real interval of
an integrand that contains `if`, `which`, `min`, `max`, `floor`, `ceil` or
`fract` is cut at the points where the integrand changes branch, and each
piece is integrated. The cut points are exact: they come from linear
conditions, from `solve` over the interval, and from the poles and the
domain limits of `1/u`, `sqrt(u)`, `ln(u)` and `tan(u)`. An absolute value
or a sign of an argument that is not linear is cut at the exact roots of the
argument. When a cut point is not known exactly, when a condition is not
supported, or when there are more than 128 cuts, the integral stays
unevaluated.

```epsil
integrate(max(x, 0), (x, -1, 1))
// ➔ 1/2
integrate(floor(x), (x, 0, 3))
// ➔ 3
integrate(floor(x^2), (x, 0, 2))
// ➔ 5 - sqrt(3) - sqrt(2)
integrate(max(sin(x), cos(x)), (x, 0, 2pi))
// ➔ 2sqrt(2)
integrate(abs(sin(x)), (x, 0, 2pi))
// ➔ 4
```

**Special functions.** `erf`, `erfc`, `besselJ(1, u)`, `besselI(1, u)`,
`digamma`, `trigamma` and `polyGamma` of a linear argument have
antiderivatives.

```epsil
[integrate(erf(x), x), integrate(digamma(x), x)]
// ➔ [x * Erf(x) + e^(-(x^2)) / sqrt(pi),LogGamma(x)]
```

**Residues.** `integrate` gives an exact value by the residue theorem for a
rational function, or a rational function times `cos(ax)`, `sin(ax)` or
`e^(iax)`, over `(-oo, oo)`; for such an even integrand over `[0, oo)`; and
for a rational function of `sin(x)` and `cos(x)` over `[0, 2pi]` or
`[0, pi]`. `N` uses the exact value. A pole on the path gives `+oo`, `-oo`
or `NaN`: a Cauchy principal value is never assumed.

```epsil
integrate(sin(x)/x, (x, -oo, oo))
// ➔ pi
integrate(1/(1 + x^2), (x, -oo, oo))
// ➔ pi
[integrate(1/(2 + cos(x)), (x, 0, 2pi)), integrate(1/x^2, (x, -oo, oo))]
// ➔ [2/3sqrt(3) * pi,+oo]
```

To ask for a principal value, integrate over the real line with
`contourIntegrate` and the path `realLineContour(True)`. `contourIntegrate`
also integrates over a closed path in the complex plane, a `circleContour`,
`rectangleContour` or simple `polygonContour`, by the residue theorem. It
handles rational functions, entire numerators, products of `sin` or `cos` of
a real linear argument in the denominator, and `P(z) e^(c/(z - a))`. An
integrand whose poles cannot be found exactly stays unevaluated, and a pole on
the contour gives `NaN`.

```epsil
contourIntegrate(x/(x^2 + 1), x, realLineContour(True))
// ➔ 0
contourIntegrate(1/z, z, circleContour(0, 2))
// ➔ 2i * pi
contourIntegrate(1/(z^2 + 1), z, circleContour(0, 2))
// ➔ 0
```

The optional [Integration Rules](/compute-engine/guides/integration-rules/)
library extends `integrate` with a large rule set, ported from Rubi, for
harder algebraic integrands.

### MathJSON

`["Integrate", f]`, `["Integrate", f, var1, var2, ...]`,
`["Integrate", f, bounds1, bounds2, ...]`, where a bound is
`["Limits", var, lower, upper]` or a `Tuple`. The integrand is a function
literal: a symbol whose value is a function, the name of a library function
(`["Integrate", "Sin"]`), a `Function` expression, a shorthand literal
(`["Power", "_", 2]`) or an expression with unknowns. The variable can be
omitted from a bound when it is the argument of the function:
`["Tuple", 0, 2]`. A bound with only an upper value is
`["Limits", "y", "Nothing", 2]`.

```json example
["Integrate", ["Power", "x", 2], ["Tuple", "x", 0, 2]]
["Integrate", ["Add", ["Power", "x", 2], ["Power", "y", 2]], ["Tuple", "y", 1, 3], ["Tuple", "x", 0, 2]]
// ➔ 68/3
["Integrate", ["Power", "y", 2], "y", 0, "Pi"]
// ➔ ["Integrate", ["Function", ["Power", "y", 2], "y"], ["Limits", "y", 0, "Pi"]]
```

In LaTeX, `\int f(x)\,dx`, `\int_a^b f(x)\,dx`, and `\iint` for a double
integral. The first integral sign is the outermost integral and the
differentials are written innermost first, so the first bound is the variable
of the last differential: `\int_1^3\int_0^2 x^2+y^2\,dx\,dy` has the bound
`y` first, and so does `\iint f(x, y)\,dx\,dy`. A contour integral is
`\oint_{|z-c|=r} f(z)\,dz`. The commands `\!` and `\,` adjust the spacing,
and `\mathrm{d}` sets the `d` upright, as ISO 80000-2 recommends; `\limits`
places the bounds above and below the sign.

In JavaScript, `ce.contourIntegrate(f, z, contour)` returns a report with
each pole (its location, order, residue and leading Laurent coefficient),
the sum of the residues, and the value.

## NIntegrate

`nIntegrate(f, a, b)` is a numerical approximation of the integral of `f`
from `a` to `b`. The integrand is an expression with one unknown, or the name
of a function. The bounds are two numbers; for a multiple integral, use `N` of
an `integrate` with one bound per variable. The methods are those of `N` of an
`integrate`: adaptive Gauss–Kronrod quadrature, with an oscillatory rule on a
semi-infinite interval, and Monte Carlo sampling only when the quadrature
does not converge. A divergent integral is `+oo`, `-oo` or `NaN`.

```epsil
[nIntegrate(x^2, 0, 2), nIntegrate(sin, 0, 2), nIntegrate(1/x, 0, 1)]
// ➔ [2.6666666666666665,1.4161468365471424,+oo]
nIntegrate(x^2, (0, 2))
// ➔ error: Type error: expected `number`, got `tuple<integer, integer>` at `(0, 2)` in `nIntegrate(x ^ 2, (0, 2))`
```

Some convergent integrals cannot be told from divergent ones by quadrature,
because most of their value is closer to a bound than floating-point numbers
can sample, and their value is `NaN`: the integral of
`1/(t (-ln(t))^1.001)` from 0 to 1/2 converges to 1000.37.

```epsil
nIntegrate(1/(t * (-ln(t))^1.001), 0, 0.5)
// ➔ NaN
```

### MathJSON

`["NIntegrate", f, lower, upper]`.

## Limit

`limit(f, x, a)` is the limit of `f` as `x` approaches `a`. `limit(f, a)`
does not name the variable: it is the first, in sorted order, of the symbols
of `f`. A fourth argument, `1` or `-1`, gives the direction. `N` of a limit
gives a numeric approximation; `nLimit` computes one directly.

```epsil
[limit(sin(x)/x, x, 0), limit(sin(x)/x, 0)]
// ➔ [1,1]
[limit(1/x, x, 0, 1), limit(1/x, x, 0, -1)]
// ➔ [+oo,-oo]
```

### MathJSON

`["Limit", f, value]`, `["Limit", expr, var, value]`. The form with a
variable has the same canonical form as `["Limit", f, value]`. A three-operand
call is read as `(function, value, direction)` when the middle operand is not
a free variable of the first. In LaTeX: `\lim_{x \to 0} \frac{\sin(x)}{x}`.

```json example
["Limit", ["Divide", ["Sin", "_"], "_"], 0]
["Limit", ["Divide", ["Sin", "x"], "x"], "x", 0]
// ➔ 1
```

## NLimit

The approximation uses Richardson extrapolation.

```epsil
nLimit(sin(x)/x, 0)
// ➔ 1.0000000000000002
```

### MathJSON

`["NLimit", f, value]`.

## Series

`series(f, x, x0, n)` is the expansion of `f` in `x` about `x0`, up to and
including the power `n`, plus a `bigO` remainder term. The defaults are
`x0 = 0` and `n = 5`, and with no variable, it is the single free variable of
`f`. The coefficients are exact. Because `bigO` is inert, a series carries
the order of the discarded terms; `normal` drops them and gives the
polynomial, which can be approximated, compiled and plotted.

```epsil
series(sin(x), x)
// ➔ x - 1/6 * x^3 + 1/120 * x^5 + BigO(x^7)
series(sin(x), x, pi/6, 2)
// ➔ 1/2 + sqrt(3)/2 * (x - 1/6 * pi) - 1/4 * (x - 1/6 * pi)^2 + BigO((x - 1/6 * pi)^3)
```

**At an infinity,** the expansion is an asymptotic expansion in powers of
`1/x`. At `-oo` it holds for `x < 0`, where `sqrt(x^2)` is `-x`. `series`
stays unevaluated at an infinity when `x` is the argument of a function that
is not smooth, such as `abs`, `sign`, `floor` or `max`. At `complexInfinity`
or another direction, the expansion is given only when `f` is built from
analytic operations, so that it does not depend on the direction.

```epsil
series(arctan(x), x, oo)
// ➔ 1/2 * pi - 1 / x + 1/3 * x^(-3) - 1/5 * x^(-5) + BigO(x^(-7))
series(1/(sqrt(x^2) + 1), x, -oo, 3)
// ➔ -1 / x - x^(-2) - x^(-3) + BigO(x^(-4))
series(1/(x + 1), x, complexInfinity, 3)
// ➔ 1 / x - x^(-2) + x^(-3) + BigO(x^(-4))
```

**Special functions.** `series` of a library function whose derivatives the
engine cannot evaluate (`zeta`, `polyLog`, `lambertW`) stays unevaluated,
except at 0, where the coefficients of `polyLog(s, x)`, `lambertW(x)`,
`lerchPhi(x, s, a)`, `ellipticK(m)` and `ellipticE(m)` come from their
Maclaurin series. `hypergeometric2F1` expands where it is a Taylor series; a
terminating one (`a` or `b` a nonpositive integer) is its polynomial, exact
about any point, with no remainder. A non-terminating one stays unevaluated at
a real argument at least 1 and at an infinity.

```epsil
series(ellipticK(m), m, 0, 3)
// ➔ 1/2 * pi + 1/8 * pi * m + 9/128 * pi * m^2 + 25/512 * pi * m^3 + BigO(m^4)
series(hypergeometric2F1(-2, 3, 4, x), x, 0, 5)
// ➔ 3/5 * x^2 - 3/2 * x + 1
```

**An unknown function** gives the textbook Taylor form, with symbolic
derivatives as coefficients:

```epsil
series(f(x), x, 0, 3)
// ➔ f(0) + x * Apply(Derivative(f, 1), 0) + 1/2 * Apply(Derivative(f, 2), 0) * x^2 + 1/6 * Apply(Derivative(f, 3), 0) * x^3 + BigO(x^4)
```

**At a pole,** `series` gives a Laurent expansion, with negative powers.
Special functions are expanded at their poles with exact coefficients: the
Euler–Mascheroni constant is `eulerGamma`, and the Stieltjes constants of the
Laurent series of `zeta` at 1 are `StieltjesGamma(k)`. Poles at an infinity
are handled too.

```epsil
series(cot(x), x, 0, 3)
// ➔ 1 / x - 1/3 * x - 1/45 * x^3 + BigO(x^5)
series(zeta(x), x, 1, 2)
// ➔ 1 / (x - 1) + "EulerGamma" - (x - 1) * StieltjesGamma(1) + 1/2 * StieltjesGamma(2) * (x - 1)^2 + BigO((x - 1)^3)
series(x^2/(x - 1), x, oo, 3)
// ➔ x + 1 + 1 / x + x^(-2) + x^(-3) + BigO(x^(-4))
```

**At a branch point,** where a fractional power of a quantity that vanishes
or has a pole appears, `series` gives a Puiseux series, with fractional
exponents. **A logarithm** of a quantity that vanishes or has a pole gives a
`ln` term, which the expansion carries, also at `+oo`.

```epsil
series(sqrt(sin(x)), x)
// ➔ -1/12 * x^(5/2) + 1/1440 * x^(9/2) + sqrt(x) + BigO(x^(13/2))
series(ln(sin(x)), x, 0, 4)
// ➔ ln(x) - 1/6 * x^2 - 1/180 * x^4 + BigO(x^6)
```

At `+oo`, `gammaLn` expands to Stirling's asymptotic series. It diverges, so
the remainder is at the first omitted term.

```epsil
series(gammaLn(x), x, oo)
// ➔ x * (ln(x) - 1) - 1/2 * ln(x) + 1/2 * ln(2pi) + 1/12 * 1 / x - 1/360 * x^(-3) + BigO(x^(-5))
```

**An exact expansion has no remainder:** when the truncated sum is the whole
function, as for a fractional monomial, a logarithm or a finite Laurent
expansion. **A point with no expansion,** such as an essential singularity,
an irrational or symbolic exponent, or the reciprocal of a logarithm, leaves
`series` unevaluated rather than wrong.

```epsil
[series(sqrt(x), x), series(ln(x), x), series(x/(x - 2)^2, x, 2)]
// ➔ [sqrt(x),ln(x),2(x - 2)^(-2) + 1 / (x - 2)]
[series(e^(1/x), x), series(1/ln(x), x)]
// ➔ [Series(e^(1 / x), x, 0, 5),Series(1 / ln(x), x, 0, 5)]
```

### MathJSON

`["Series", f]`, `["Series", f, x]`, `["Series", f, x, x0]`,
`["Series", f, x, x0, n]`. The result is an `Add` of the terms and a
`["BigO", …]` term. `["DirectedInfinity", 1]` and `["DirectedInfinity", -1]`
are the points `+oo` and `-oo`. In LaTeX: `\operatorname{Series}(\sin x, x)`.

```json example
["Series", ["Sin", "x"], "x", 0, 3]
// ➔ ["Add", "x", ["Multiply", ["Rational", -1, 6], ["Power", "x", 3]], ["BigO", ["Power", "x", 5]]]
```

## BigO

`bigO(u)` is the Landau remainder term `O(u)`: the terms that a truncated
series discards, of order at most `u`. It is inert: evaluation and `simplify`
leave it unchanged. `N` keeps it: the result is a series with floating-point
coefficients, as in Mathematica.

```epsil
N(series(sin(x), x, 0, 3))
// ➔ x - 0.166666666666666666667 * x^3 + BigO(x^5)
```

### MathJSON

`["BigO", u]`. It is written `O\left(u\right)` in LaTeX, and parsed from
`\mathcal{O}(u)` and `\operatorname{O}(u)`. A bare `O(…)` is not read as
`BigO`, so that a variable can be named `O`.

## Normal

`normal` removes every `bigO` term, and gives the truncated polynomial. It is
idempotent, and leaves an expression with no `bigO` unchanged. The name is
Mathematica's.

```epsil
normal(series(sin(x), x))
// ➔ 1/120 * x^5 - 1/6 * x^3 + x
```

### MathJSON

`["Normal", expr]`.

## DSolve

`dSolve(equation, y, x)` solves the ordinary differential equation for the
function `y` of `x`. The unknown function is written as a call, `y(x)`, and
its derivative with `D`. The result is a list of `==` equations for `y(x)`. A
constant of integration is `arbitraryConstant(k)`, written `c_k` below. An
equation outside these classes stays unevaluated.

| Class | Equation | Solution |
| :-- | :-- | :-- |
| First-order linear, `y' + p(x) y = q(x)` | $y' = y$ | $y = c_1\,e^{x}$ |
| | $y' = x^2$ | $y = \frac{1}{3}x^3 + c_1$ |
| | $y' + y = x$ | $y = x - 1 + c_1\,e^{-x}$ |
| | $y' + 2xy = 0$ | $y = c_1\,e^{-x^2}$ |
| Linear with constant coefficients, homogeneous, any order (exact roots when the characteristic polynomial factors, numeric ones otherwise) | $y'' = y$ | $y = c_1\,e^{x} + c_2\,e^{-x}$ |
| | $y'' + y = 0$ | $y = c_1\cos x + c_2\sin x$ |
| | $y'' - 2y' + y = 0$ | $y = (c_1 + c_2\,x)\,e^{x}$ |
| | $y''' - 6y'' + 11y' - 6y = 0$ | $y = c_1\,e^{x} + c_2\,e^{2x} + c_3\,e^{3x}$ |
| Second-order with constant coefficients, nonhomogeneous (undetermined coefficients, or variation of parameters) | $y'' - y = x$ | $y = -x + c_1\,e^{x} + c_2\,e^{-x}$ |
| | $y'' - y = e^{x}$ | $y = c_1\,e^{x} + c_2\,e^{-x} + \tfrac{1}{2}x\,e^{x} - \tfrac{1}{4}e^{x}$ |
| | $y'' + y = e^{x}$ | $y = c_1\cos x + c_2\sin x + \tfrac{1}{2}e^{x}$ |
| Second-order Cauchy–Euler, $a\,x^2 y'' + b\,x\,y' + c\,y = 0$ | $x^2 y'' - 2y = 0$ | $y = c_1\,x^2 + c_2\,x^{-1}$ |

```epsil
dSolve(D(y(x), x) == y(x), y, x)
// ➔ [y(x) == ArbitraryConstant(1) * e^x]
dSolve(D(y(x), x, x) + y(x) == 0, y, x)
// ➔ [y(x) == sin(x) * ArbitraryConstant(2) + cos(x) * ArbitraryConstant(1)]
dSolve(x^2 * D(y(x), x, x) - 2y(x) == 0, y, x)
// ➔ [y(x) == ArbitraryConstant(1) * x^2 + ArbitraryConstant(2) / x]
```

### MathJSON

`["DSolve", equation, y, x]`.

```json example
["DSolve", ["Equal", ["D", ["y", "x"], "x"], ["y", "x"]], "y", "x"]
// ➔ ["List", ["Equal", ["y", "x"], ["Multiply", ["ArbitraryConstant", 1], ["Power", "ExponentialE", "x"]]]]
```

## NDSolve

`ndSolve(equation, y, (x, x0, x1), y0, steps)` computes a numerical solution
of an initial value problem: an explicit equation, first-order or of a higher
order, whose highest derivative is alone on one side:
`y'(x) = f(x, y)` with `y(x0) = y0`, or
`y^(n)(x) = f(x, y, y', …, y^(n-1))` with the initial values
`[y(x0), y'(x0), …]`. It also solves a first-order system: a list of
equations with a list of dependent symbols. The result is a list of `[x, y]`
pairs on a grid of `steps + 1` points (100 steps by default); for a
higher-order problem, each pair gives `y`, not its derivatives.

The solver is an adaptive Dormand–Prince 5(4) method with error control. The
grid is sampled from its dense output, so `steps` sets the resolution of the
output, not the accuracy. This works also when the solution has no closed
form. Implicit equations are not supported, and a problem that the error
control cannot resolve, such as `y' = y^2` integrated past its singularity,
stays unevaluated rather than giving inaccurate samples. For the solution at
any point, use `ndSolveFunction`.

### MathJSON

`["NDSolve", equation, y, limits, y0, steps]`, where `limits` is a `Limits`
or `Tuple` of `(x, x0, x1)`.

```json example
["NDSolve", ["Equal", ["D", ["y", "x"], "x"], ["y", "x"]], "y", ["Tuple", "x", 0, 1], 1, 100]
// ➔ ["List", ["List", 0, 1], …, ["List", 1, 2.7182818…]]
["NDSolve", ["Equal", ["D", ["D", ["y", "x"], "x"], "x"], ["Negate", ["y", "x"]]], "y", ["Tuple", "x", 0, 1], ["List", 0, 1], 200]
// ➔ ["List", ["List", 0, 0], …, ["List", 1, 0.8414709…]]
```

## NDSolveFunction

`ndSolveFunction` solves the same initial value problems as `ndSolve`, but
gives the solution as a function, which wraps an `interpolatingFunction`
holding the dense output of the solver. It can be applied at any point of the
interval, with the accuracy of the solver. Outside the interval, it gives the
value at the nearest end, and applied to an argument that is not a number it
stays symbolic. It can be compiled to JavaScript for fast evaluation, as for
plotting. A system of equations is not supported, and stays unevaluated.

### MathJSON

`["NDSolveFunction", equation, y, limits, y0]`.

```json example
["Assign", "f", ["NDSolveFunction", ["Equal", ["D", ["y", "x"], "x"], ["y", "x"]], "y", ["Tuple", "x", 0, 1], 1]]
["f", 0.5]
// ➔ 1.6487212707001282
```

## InterpolatingFunction

The piecewise-quartic interpolant of a numerical solution of a differential
equation, made by `ndSolveFunction`; it is not usually written directly. Its
first argument is the table of coefficients of each step. Applied to a number,
it gives the solution there, clamped to the interval; applied to another
argument, it stays symbolic. Its LaTeX and text forms show only the interval,
as $\operatorname{InterpolatingFunction}_{[0, 1]}(x)$; the MathJSON holds the
whole table.

### MathJSON

`["InterpolatingFunction", data, x]`.
