<!-- The detail of the entries of /reference/arithmetic/. Format: README.md. -->

## Section: Complex numbers

The imaginary unit `i` (MathJSON `ImaginaryUnit`) is a solution of
$x^2 + 1 = 0$. A complex number $z = a + bi$ has a real part `a` and an
imaginary part `b`, which `real` and `imaginary` return. `abs` and
`argument` give its polar form: the distance from the origin to the
point that represents it in the complex plane, and the angle from the
positive real axis to that point.

```epsil
[i^2, e^(i * pi)]
// ➔ [-1,-1]
let z = 3 + 4i
real(z) + imaginary(z) * i
// ➔ (3 + 4i)
abs(1 + i) * e^(i * argument(1 + i))
// ➔ (1 + i)
```

## Sum

`sum` has three forms, shown in [Sums and products](#sums-and-products)
above: a collection, a body with a range, and a body with an indexing set.

**A collection.** A list of points (tuples) sums to a point, and a list of
rows to the row of the column sums. An element that is not a number, a point
or a row, such as a boolean or a dictionary, is an `incompatible-type` error,
also when it is the only element.

```epsil
[sum([(1, 2), (3, 4)]), sum([[1, 2], [3, 4]])]
// ➔ [(4, 6),[4,6]]
sum([True])
// ➔ error: Runtime error: expected `number`, got `boolean` at `True`
```

An argument that is not a collection, with no index, is one term. With no
free variable, it is its own sum. With a free variable, the sum stays
unevaluated, because no index is given: in `sum(x^k)` the index could be `x`
or `k`.

```epsil
[sum(5), sum(x^k)]
// ➔ [5,sum(x^k)]
```

**A range.** The bound `(k, lower, upper)` can also be written flat after
the body, as for `integrate`: the index, the lower bound, the upper bound.

```epsil
sum(k, k, 1, 10)
// ➔ 55
```

**An indexing set.** With `k in S`, the index takes each element of a finite
set, list or range. A list of exactly two integers is read as a range, so
`n in [1, 5]` runs over the integers from 1 to 5. An interval is enumerated
by its integers, and an open end leaves out its bound. The set can have at
most 1,000 elements; a sum over an infinite set stays symbolic.

```epsil
[sum(n, n in {1, 2, 3}), sum(n, n in [1, 5])]
// ➔ [6,15]
sum(n, n in interval(open(0), 5))
// ➔ 15
```

#### Multiple indexing sets

Several indexing sets give a multiple sum, and an indexing set and a range
can be mixed:

```epsil
sum(n * m, n in {1, 2}, m in {3, 4})
// ➔ 21
sum(n + m, n in {1, 2}, (m, 1, 2))
// ➔ 12
```

To keep only some values of the index, sum a filtered comprehension:

```epsil
sum([n for n in {1, 2, 3, -1, -2} if n > 0])
// ➔ 6
```

#### Closed forms

`simplify` replaces a sum with a symbolic bound by a closed form when its
body matches one of these patterns:

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
| $$\sum_{k=0}^{n} \binom{n}{k}$$ | $$2^n$$ | Sum of binomial coefficients |
| $$\sum_{k=0}^{n} (-1)^k \binom{n}{k}$$ | $$0$$ | Alternating binomial sum |
| $$\sum_{k=0}^{n} k \binom{n}{k}$$ | $$n \cdot 2^{n-1}$$ | Weighted binomial sum |
| $$\sum_{k=1}^{n} \frac{1}{k(k+1)}$$ | $$\frac{n}{n+1}$$ | Partial fractions (telescoping) |
| $$\sum_{k=2}^{n} \frac{1}{k(k-1)}$$ | $$\frac{n-1}{n}$$ | Partial fractions (telescoping) |
| $$\sum_{k=0}^{n} k^2 \binom{n}{k}$$ | $$n(n+1) \cdot 2^{n-2}$$ | Weighted squared binomial sum |
| $$\sum_{k=0}^{n} k^3 \binom{n}{k}$$ | $$n^2(n+3) \cdot 2^{n-3}$$ | Weighted cubed binomial sum |
| $$\sum_{k=0}^{n} (-1)^k k \binom{n}{k}$$ | $$0$$ | Alternating weighted binomial sum (n ≥ 2) |
| $$\sum_{k=0}^{n} \binom{n}{k}^2$$ | $$\binom{2n}{n}$$ | Sum of binomial squares |
| $$\sum_{k=1}^{n} k(k+1)$$ | $$\frac{n(n+1)(n+2)}{3}$$ | Sum of consecutive products |
| $$\sum_{n=m}^{b} (a + dn)$$ | $$(b-m+1)\left(a + \frac{d(m+b)}{2}\right)$$ | Arithmetic progression (general bounds) |
| $$\sum_{n=1}^{b} c \cdot f(n)$$ | $$c \cdot \sum_{n=1}^{b} f(n)$$ | Factor out constant |

```epsil
[simplify(sum(k, (k, 1, n))), simplify(sum(3, (k, 1, n)))]
// ➔ [1/2 * (n^2 + n),3n]
```

A bound that is not an integer gets no closed form, and the sum stays
symbolic: a bound such as `2.5`, a bound that holds a symbol declared with a
type that is not an integer type (for example `real`), or a bound whose
symbols are all declared and whose type is not an integer type (`n/2` with
`n` declared `integer`). The enumeration rounds such a bound down, and a
closed form would not. An undeclared symbol is a generic value, and its bound
gets the closed form.

- An empty range (upper bound less than the lower bound, both numbers) gives
  `0`, or a vector of `0` when the body is a vector of a known length.
- A single iteration (equal bounds) gives the body at that value.
- In nested sums, the inner sum is simplified first.

A closed form with a symbolic upper bound is the generic answer, as in
Mathematica. It applies with no proof that the range is not reversed, and it
is the value of the sum when the upper bound is an integer at least the lower
bound minus 1. For another value it can differ from evaluation:
`sum(3, (k, 1, n))` simplifies to `3n`, which is `-12` at `n = -4`, where the
sum is the empty sum `0`. If the bound can have such a value, do not simplify
the sum.

#### Infinite series

A sum to `oo` has an exact value when its body matches a known convergent
family. Otherwise it stays symbolic, and `N` gives a numeric approximation.

| Series | Value | Name |
| :----- | :---- | :--- |
| $$\sum_{k=a}^{\infty} k^{-s}, \; s > 1$$ | $$\zeta(s) - \sum_{k<a} k^{-s}$$ | p-series ($\zeta(2) = \pi^2/6$, …) |
| $$\sum_{k=n_0}^{\infty} c\,r^k, \; \|r\| < 1$$ | $$\frac{c\,r^{n_0}}{1-r}$$ | Geometric series |
| $$\sum_{k=1}^{\infty} \frac{(-1)^{k+1}}{k^s}$$ | $$\eta(s)$$ | Alternating p-series ($\eta(1) = \ln 2$, $\eta(2) = \pi^2/12$) |
| $$\sum_{k=1}^{\infty} \frac{1}{(2k-1)^s}, \; s > 1$$ | $$(1 - 2^{-s})\,\zeta(s)$$ | Odd p-series ($\pi^2/8$ for $s=2$) |
| $$\sum_{k=0}^{\infty} \frac{(-1)^k}{(2k+1)^s}$$ | $$\beta(s)$$ | Dirichlet beta ($\pi/4$, Catalan's constant, $\pi^3/32$, $5\pi^5/1536$ for $s = 1, 2, 3, 5$) |
| $$\sum_{k=a}^{\infty} \frac{r^k}{k!}$$ | $$e^r - \sum_{k<a} \frac{r^k}{k!}$$ | Exponential series (symbolic $r$ allowed) |
| $$\sum_{k=a}^{\infty} \frac{k^n r^k}{k!}$$ | $$e^r\,T_n(r) - \sum_{k<a} \frac{k^n r^k}{k!}$$ | Touchard / Dobiński ($T_n$ the Touchard polynomial; $n \le 200$) |
| $$\sum_{k=1}^{\infty} k\,r^k, \; \|r\| < 1$$ | $$\frac{r}{(1-r)^2}$$ | First-moment geometric |
| $$\sum_{k=1}^{\infty} \frac{r^k}{k}, \; \|r\| < 1$$ | $$-\ln(1-r)$$ | Logarithmic series |

The body is compared with each pattern as a rational function of the index,
so an equivalent spelling is recognized, and a polynomial in `k` over `k!` is
summed term by term:

```epsil
[sum(k/k^3, (k, 1, oo)), sum(1/(k + 1)^2, (k, 1, oo))]
// ➔ [1/6 * pi^2,-1 + 1/6 * pi^2]
[sum(1/(k^2 + k), (k, 1, oo)), sum((k^2 + k)/k!, (k, 0, oo))]
// ➔ [1,3e]
```

The comparison runs only for a body whose denominator, as written, is zero at
no integer index of the domain; a pole there keeps the sum symbolic. For a
symbolic ratio, the families with a convergence region give an `If` that
records the region:

```epsil
sum(k * x^k, (k, 1, oo))
// ➔ If(|x| < 1, x / (1 - x)^2)
```

A series that the engine can prove divergent evaluates to its infinity. The
proof is a limit comparison with the harmonic series. A series with no value
stays symbolic:

```epsil
[sum(1/n, (n, 1, oo)), sum(-3/n, (n, 1, oo))]
// ➔ [+oo,-oo]
sum((-1)^n, (n, 1, oo))
// ➔ sum_(n=1)^(+oo)((-1)^n)
```

### MathJSON

`["Sum", xs]`, `["Sum", body, ...bounds]`, where a bound is
`["Limits", index, lower, upper]` (or a `Tuple`) or
`["Element", index, collection]`. A `Limits` bound can have a step as its
fourth operand, as the Wolfram iterator `{i, imin, imax, di}` does:
`["Limits", index, lower, upper, step]` is the bound
`["Element", index, ["Range", lower, upper, step]]`.

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
["Sum", ["List", 5, 7, "x", "y"]]
// ➔ ["Add", 12, "x", "y"]
["Sum", ["Add", "i", 1], ["Tuple", "i", 1, 10]]
// ➔ 65
["Sum", "k", "k", 1, 10]
// ➔ 55
["Sum", "k", ["Limits", "k", 1, 10, 3]]
// ➔ 22
["Sum", ["Power", "n", 2], ["Element", "n", ["Set", 1, 2, 3]]]
// ➔ 14
```

`["Sum", xs]` is equivalent to `["Reduce", xs, "Add"]`.

An `Element` bound takes a condition as its fourth operand, which filters the
values of the index:

```json example
["Sum", "n", ["Element", "n", ["Set", 1, 2, 3, -1, -2], ["Greater", "n", 0]]]
// ➔ 6
```

In LaTeX, the bounds can be a `\le` (or `\ge`) range in the subscript:
`\sum_{1 \le i \le 10} i^2` is `385`, and `\sum_{i \le 10} i`, with the lower
bound 1 by default, is `55`. Only this form implies a bound: a sum with one
explicit bound in the `i=1` and superscript form, such as `\sum_{k=1} k`,
stays unevaluated, and its bound is `["Limits", "k", 1, "Nothing"]`.

The items of the superscript are the upper bounds, in order, of the ranges
that have no upper bound in the subscript. A clause `n \in S` and its
conditions take no superscript item, so `\sum_{n \in \{1,2\}, m=1}^{2} (n+m)`
is `12`.

After a clause `n \in S`, an item is a condition of it when it is a relation
(`n > 0`), a logical expression (`n > 1 \land n < 5`), a predicate
(`\mathrm{IsPrime}(n)`), an equation (`n \bmod 2 = 0`) or a membership of the
same index (`n \in T`). Two or more conditions are joined with `And`:
`\sum_{n \in \{1,2,3\}, n > 1, n < 3} n` is `2`. An item that binds another
index, such as `m \in T` or `m = 1`, starts a new indexing set.

## Product

`product` has the same forms as `sum`, and an empty product is `1`.

```epsil
[product([5, x, 11]), product(5), product(x^k)]
// ➔ [55x,5,prod(x^k)]
[product(k, k, 1, 5), product(k^2, k in {1, 2, 3})]
// ➔ [120,36]
```

To keep only some values of the index, multiply a filtered comprehension:

```epsil
product([k for k in [1, -2, 3, -4] if k < 0])
// ➔ 8
```

#### Closed forms

`simplify` replaces a product with a symbolic bound by a closed form when its
body matches one of these patterns. A bound that is not an integer gets no
closed form, as for `sum`.

| Pattern | Simplifies to | Name |
| :------ | :------------ | :--- |
| $$\prod_{n=1}^{b} c$$ | $$c^b$$ | Constant body |
| $$\prod_{n=1}^{b} n$$ | $$b!$$ | Factorial |
| $$\prod_{n=1}^{b} (n+c)$$ | $$\frac{(b+c)!}{c!}$$ | Shifted factorial |
| $$\prod_{n=1}^{b} (2n-1)$$ | $$(2b-1)!!$$ | Odd double factorial |
| $$\prod_{n=1}^{b} 2n$$ | $$2^b \cdot b!$$ | Even double factorial |
| $$\prod_{k=0}^{n-1} (x+k)$$ | $$(x)_n$$ | Rising factorial (Pochhammer) |
| $$\prod_{k=0}^{n-1} (x-k)$$ | $$\frac{x!}{(x-n)!}$$ | Falling factorial |
| $$\prod_{k=1}^{n} \frac{k+1}{k}$$ | $$n+1$$ | Telescoping product |
| $$\prod_{k=2}^{n} (1 - \frac{1}{k^2})$$ | $$\frac{n+1}{2n}$$ | Wallis-like product |
| $$\prod_{n=1}^{b} c \cdot f(n)$$ | $$c^b \cdot \prod_{n=1}^{b} f(n)$$ | Factor out constant |

```epsil
[simplify(product(k, (k, 1, n))), simplify(product(3, (k, 1, n)))]
// ➔ [n!,3^n]
```

An empty range gives `1`, or a vector of `1` when the body is a vector of a
known length, and a single iteration gives the body at that value.

Evaluation also gives the Wallis-like product its closed form, for any
positive integer lower bound `a`: the product of `1 - 1/k^2` from `a` to `n`
is `(a - 1)(n + 1) / (a n)`. The body is compared as a rational function, so
`(k^2 - 1)/k^2` is recognized too.

```epsil
product(1 - 1/k^2, (k, 3, n))
// ➔ (2(n + 1)) / (3n)
```

#### Infinite products

A product to `oo` has an exact value when its body is one of these known
convergent families, or the reciprocal of one. The body is compared
algebraically, so any spelling of the same rational function is recognized.
A body that matches no family stays symbolic, a body with a float gives a
float, and a body whose numerator and denominator share a factor stays
symbolic.

| Product | Value | Name |
| :------ | :---- | :--- |
| $$\prod_{k=a}^{\infty} \left(1 - \frac{1}{k^2}\right), \; a \ge 2$$ | $$\frac{a-1}{a}$$ | Telescoping |
| $$\prod_{k=1}^{\infty} \left(1 - \frac{1}{(2k)^2}\right)$$ | $$\frac{2}{\pi}$$ | Wallis product |
| $$\prod_{k=1}^{\infty} \left(1 - \frac{1}{(2k+1)^2}\right)$$ | $$\frac{\pi}{4}$$ | Odd Wallis analog |
| $$\prod_{k=1}^{\infty} \left(1 + \frac{1}{k^2}\right)$$ | $$\frac{\sinh \pi}{\pi}$$ | From the $\sin$ product formula |

```epsil
[product(4n^2/(4n^2 - 1), (n, 1, oo)), product(k^2/(k^2 + 1), (k, 1, oo))]
// ➔ [1/2 * pi,pi / sinh(pi)]
```

### MathJSON

`["Product", xs]`, `["Product", body, ...bounds]`, with the bounds of `Sum`.
`["Product", xs]` is equivalent to `["Reduce", xs, "Multiply"]`.

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385
["Product", ["Add", "x", 1], ["Tuple", "x", 1, 10]]
// ➔ 39916800
["Product", "k", "k", 1, 5]
// ➔ 120
["Product", "k", ["Element", "k", ["Set", 1, -2, 3, -4], ["Less", "k", 0]]]
// ➔ 8
```

## Interpret

`interpret` gives a meaning to a sum or product written with an ellipsis,
such as `1 + 2 + … + n`, by turning it into a `sum` or `product`. Such an
expression is otherwise an inert notation, and evaluation returns it
unchanged.

Interpretation is an explicit request: evaluation never guesses. The
recognizer handles arithmetic progressions, polynomial general terms (found
by finite differences), geometric patterns and linear recurrences. An
ambiguous or unproven pattern is returned unchanged rather than interpreted
wrongly. The result is a `sum` or `product`, which a later evaluation
computes.

```epsil
interpret(2 * 4 * ContinuationPlaceholder * (2n))
// ➔ prod_(k=1)^(n)(2k)
interpret(1 + 1 + 2 + 3 + 5 + 8 + ContinuationPlaceholder + 55)
// ➔ sum_(k=1)^(10)(Fibonacci(k))
let s = interpret(1 + 2 + ContinuationPlaceholder + 100)
s + 0
// ➔ 5050
```

The [Sequences guide](/compute-engine/guides/sequences/#interpreting-elliptical-notation)
describes the families the recognizer knows.

### MathJSON

`["Interpret", expr]`. The ellipsis is the symbol
`ContinuationPlaceholder`, which LaTeX `\dots` and `\cdots` parse to.

```json example
["Interpret", ["Add", 1, 2, "ContinuationPlaceholder", "n"]]
// ➔ ["Sum", "k", ["Limits", "k", 1, "n"]]
["Interpret", ["Multiply", 2, 4, "ContinuationPlaceholder", ["Multiply", 2, "n"]]]
// ➔ ["Product", ["Multiply", 2, "k"], ["Limits", "k", 1, "n"]]
```

## Clamp

`clamp(value, lower, upper)` is `lower` when the value is less than `lower`,
`upper` when it is greater than `upper`, and the value otherwise. The bounds
can be infinite. All three arguments are required.

```epsil
[clamp(4.2, -1, 1), clamp(-5, 0, oo), clamp(100, 0, 11)]
// ➔ [1,0,11]
clamp(0.42)
// ➔ error: Static error: a required argument is missing in `clamp(0.42)`
```

### MathJSON

`["Clamp", value, lower, upper]`.

```json example
["Clamp", 4.2, -1, 1]
// ➔ 1
["Clamp", -5, 0, "PositiveInfinity"]
// ➔ 0
```

## Smoothstep

`smoothstep(e0, e1, x)` goes smoothly from 0 to 1 as `x` goes from `e0` to
`e1`: it is `t^2 (3 - 2t)`, with `t = clamp((x - e0)/(e1 - e0), 0, 1)`. This
is the formula of the GLSL built-in `smoothstep`, with the arguments in the
same order. The result is exact for exact arguments.

- When `e0 = e1`, the result is a step: `0` when `x < e0`, otherwise `1`.
- When `e0 > e1`, the formula applies as written, and the result goes from 1
  to 0.
- Every compile target gives these results. The GLSL built-in has no defined
  result when `e0 ≥ e1`, so the shader target writes the formula out instead
  of calling it.

```epsil
[smoothstep(0, 1, 1/3), smoothstep(1, 0, 1/4)]
// ➔ [7/27,27/32]
[smoothstep(1, 1, 0.5), smoothstep(1, 1, 2)]
// ➔ [0,1]
```

### MathJSON

`["Smoothstep", e0, e1, x]`.

```json example
["Smoothstep", 0, 1, ["Rational", 1, 3]]
// ➔ 7/27
["Smoothstep", 1, 1, 0.5]
// ➔ 0
```

## Rational

### MathJSON

`["Rational", n]` is the rational number nearest to the number `n` with a
small denominator. `["Rational", numerator, denominator]` is the rational
number `numerator/denominator`.

```json example
["Rational", 0.42]
// ➔ ["Rational", 21, 50]
```

## Numerator

A fraction written in the call is not reduced first: `numerator(4/8)` is `4`.

```epsil
numerator(4/8)
// ➔ 4
```

### MathJSON

`["Numerator", expr]`. The argument can be in a non-canonical form.

```json example
["Numerator", ["Rational", 4, 5]]
// ➔ 4
```

## Denominator

A fraction written in the call is not reduced first: `denominator(4/8)` is
`8`.

```epsil
denominator(4/8)
// ➔ 8
```

### MathJSON

`["Denominator", expr]`. The argument can be in a non-canonical form.

```json example
["Denominator", ["Rational", 4, 5]]
// ➔ 5
```

## NumeratorDenominator

A fraction written in the call is not reduced first. With `gcd`, this tells
whether a fraction is in lowest terms:

```epsil
[gcd(numeratorDenominator(4/5)), gcd(numeratorDenominator(8/10))]
// ➔ [1,2]
```

### MathJSON

`["NumeratorDenominator", expr]` is a `Sequence` of the numerator and the
denominator, so it can be the arguments of another function.

```json example
["NumeratorDenominator", ["Rational", 4, 5]]
// ➔ ["Sequence", 4, 5]
["GCD", ["NumeratorDenominator", ["Rational", 8, 10]]]
// ➔ 2
```

## GCD

`gcd` also gives the greatest common divisor of **polynomials**. When the
arguments are polynomials in the same variable that share a factor, the
variable is inferred, and the result is a monic polynomial. When the
polynomial GCD would be a constant, the expression stays unevaluated, so a
bare symbol keeps its reading as an unknown integer: `gcd(x, 6)` stays as it
is. Use `polynomialGCD` with a variable to get `1` for coprime polynomials.

```epsil
[gcd(60, 12, 18), gcd(x^2 + 3x + 2, x^2 + 4x + 3), gcd(x, 6)]
// ➔ [6,x + 1,gcd(6, x)]
```

### MathJSON

`["GCD", x1, x2, ...]`.

```json example
["GCD", 60, 12, 18]
// ➔ 6
["GCD",
  ["Add", ["Power", "x", 2], ["Multiply", 3, "x"], 2],
  ["Add", ["Power", "x", 2], ["Multiply", 4, "x"], 3]]
// ➔ ["Add", "x", 1]
```

## Round

A step of `0` gives `NaN`. A step can be any exact number:

```epsil
[round(5, 0), floor(2.7, 1/2)]
// ➔ [NaN,5/2]
```

A tie, a value exactly halfway between two multiples, is rounded with the
engine's `roundingTies` rule, by default away from zero. See
[Rounding ties](/compute-engine/guides/numeric-evaluation/#rounding-ties).

### MathJSON

`["Round", x]`, `["Round", x, step]`. `Floor`, `Ceil` and `Truncate` take the
same arguments.

```json example
["Floor", 226, 10]
// ➔ 220
["Floor", 2.7, ["Rational", 1, 2]]
// ➔ 5/2
["Round", 3.14159, ["Rational", 1, 100]]
// ➔ 157/50
```

## Exp

Applied to a matrix, `exp` applies to each element. It is not the matrix
exponential.

```epsil
exp([[0, 0], [0, ln(2)]])
// ➔ [[1,1],[1,2]]
```

## Log

`log(x)` is the logarithm in base 10, and `log(x, b)` in base `b`. `ln` is
the natural logarithm, `lb` the logarithm in base 2 and `lg` in base 10.

```epsil
[log(100), log(8, 2), lb(8), lg(1000)]
// ➔ [2,3,3,3]
```

### MathJSON

`["Log", x]`, `["Log", x, base]`.

## Max

If all the arguments are numbers, `max` is the largest of them. The
infinities take part in the comparison like any other value. A `NaN`
argument makes the whole expression `NaN`, even when other arguments are
still unknown: no ordering could rule it out.

Otherwise the expression is simplified: the values smaller than or equal to
the largest known number are removed.

A dictionary is not a collection of numbers. `max`, `min`, `supremum` and
`infimum` of a dictionary that has an entry give the `incompatible-type`
error that `sum` gives, and the error names the first entry.

```epsil
[max(5, 2, -1), max(1, ∞)]
// ➔ [5,+oo]
[max(0, 7.1, x, 3), max(0, 7.1, NaN, x, 3)]
// ➔ [max(7.1, x),NaN]
```

### MathJSON

`["Max", x1, x2, ...]` or `["Max", list]`. An empty dictionary contributes
no value, as an empty list does.

```json example
["Max", 5, 2, -1]
// ➔ 5
["Max", 1, "PositiveInfinity"]
// ➔ "PositiveInfinity"
["Max", 0, 7.1, "x", 3]
// ➔ ["Max", 7.1, "x"]
["Max", 0, 7.1, "NaN", "x", 3]
// ➔ "NaN"
```

## Min

If all the arguments are numbers, `min` is the smallest of them. As with
`max`, the infinities take part in the comparison, and a `NaN` argument makes
the whole expression `NaN`.

Otherwise the expression is simplified: the values greater than or equal to
the smallest known number are removed.

```epsil
[min(5, 2, -1), min(1, -∞), min(0, 7.1, x, 3)]
// ➔ [-1,-oo,min(0, x)]
```

### MathJSON

`["Min", x1, x2, ...]` or `["Min", list]`.

<Latex value=" \min(0, 7.1, 3) = 0"/>

```json example
["Min", 5, 2, -1]
// ➔ -1
["Min", 1, "NegativeInfinity"]
// ➔ "NegativeInfinity"
["Min", 0, 7.1, "x", 3]
// ➔ ["Min", 0, "x"]
["Min", 0, 7.1, "NaN", "x", 3]
// ➔ "NaN"
```

## Mod

`Mod(a, b)` is the modulus of `a` by `b`. The operator `a % b` is the same
function. The result has the sign of `b`, or is `0`.

When `a` and `b` are positive integers, this is the remainder of the
division of `a` by `b`, as with the `%` operator of JavaScript. When they are
not, the result differs: in Epsil `(-7) % 5` is `3`, in JavaScript `-2`.

```epsil
[Mod(7, 5), Mod(-7, 5), Mod(7, -5), Mod(-7, -5)]
// ➔ [2,3,-3,-2]
```

`Mod` of exact operands is exact. A radical dividend is reduced without
rounding, and `N()` gives the floating-point value.

```epsil
Mod(sqrt(2), 1)
// ➔ -1 + sqrt(2)
```

### MathJSON

`["Mod", a, b]`.

```json example
["Mod", 7, 5]
// ➔ 2
["Mod", -7, 5]
// ➔ 3
["Mod", 7, -5]
// ➔ -3
["Mod", -7, -5]
// ➔ -2
["Mod", ["Sqrt", 2], 1]
// ➔ ["Add", -1, ["Sqrt", 2]]
```

## Power

`a^b` raises `a` to the power `b`. A power of exact numbers evaluates to an
exact number. When the result would be too large, the power stays
unevaluated, and `N()` gives its floating-point value. The engine estimates
the size of the result as the number of decimal digits of the base times the
exponent, and the limit is 1,000,000 digits.

```epsil
[2^10, 2^10000000, N(2^10000000)]
// ➔ [1024,2^(10000000),9.0498173063608003014e+3010299]
```

A power of `0`, `1`, `-1`, `i` or `-i` to an integer exponent of any size is
evaluated. A power of `i` uses the exponent modulo 4.

```epsil
[(-1)^10000000, i^(10^30 + 1)]
// ➔ [1,i]
```

A power with an infinite operand gives its limit. A base whose absolute value
is more than 1 raised to `∞` gives `∞`, and a base whose absolute value is
less than 1 gives `0`. The engine compares the base with 1 by its exact
value, so a base very near 1 also gives the limit. A symbolic base raised to
an infinity stays unevaluated until the base has a value, because the limit
depends on that value.

```epsil
[2^∞, 0.5^(-∞), (1/2)^∞, 1^∞, z^∞]
// ➔ [+oo,+oo,0,NaN,z^(+oo)]
```

### MathJSON

`["Power", a, b]`. When an operand is a floating-point number, the limit `0`
is the floating-point `0.0`, as for `2.5/∞`. When the operands are exact, it
is the exact `0`.

```json example
["Power", 2, 10]
// ➔ 1024
["Power", 2, 10000000]
// ➔ ["Power", 2, 10000000]  (unevaluated)
["Power", "ImaginaryUnit", ["Add", ["Power", 10, 30], 1]]
// ➔ ["Complex", 0, 1]
["Power", 0.5, "PositiveInfinity"]
// ➔ 0.0  (a floating-point number)
["Power", ["Rational", 1, 2], "PositiveInfinity"]
// ➔ 0
```

## Add

#### Vectors, matrices and tensors

With a vector, a matrix or a tensor, `+` adds the elements at the same
position, and a scalar is added to every element. A sum can mix several
matrices and scalars. The operands that are not scalars must have the same
shape. See
[Arithmetic and broadcasting](/reference/linear-algebra/#arithmetic-and-broadcasting).

```epsil
[[1, 2], [3, 4]] + 10 + [[5, 6], [7, 8]]
// ➔ [[16,18],[20,22]]
[7, 11] + 3
// ➔ [10,14]
[1, 2] + [1, 2, 3]
// ➔ error: Runtime error: incompatible dimensions at `2 vs 3`
```

The elements can be symbols, and exact elements, such as rationals and
radicals, stay exact:

```epsil
[[a, b], [c, d]] + [[1, 2], [3, 4]]
// ➔ [[a + 1,b + 2],[c + 3,d + 4]]
[[1/2, sqrt(2)]] + [[1/3, sqrt(2)]]
// ➔ [[5/6,2sqrt(2)]]
```

A tuple of numbers is added element by element too, and the sum is a tuple.
A tuple and a list cannot be added:

```epsil
(1, 2, 3) + (3, 5, 6)
// ➔ (4, 7, 9)
(1, 2) + [3, 4]
// ➔ error: Type error: expected `tuple`, got `list<number>` in `(1, 2) + [3, 4]`
```

### MathJSON

```json example
["Add",
  ["List", ["List", 1, 2], ["List", 3, 4]],
  10,
  ["List", ["List", 5, 6], ["List", 7, 8]]]
// ➔ ["List", ["List", 16, 18], ["List", 20, 22]]

["Add",
  ["List", ["List", ["Rational", 1, 2], ["Rational", 1, 3]]],
  ["List", ["List", ["Rational", 1, 2], ["Rational", 1, 3]]]]
// ➔ ["List", ["List", 1, ["Rational", 2, 3]]]

["Add",
  ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]],
  ["List", ["List", 1, 2], ["List", 3, 4]]]
// ➔ ["Error", "'incompatible-dimensions'", "'2x2 vs 2x3'"]
```

In LaTeX, a vector can be written `(1, 2, 3)` or `[1, 2, 3]`:
`(1,2,3)+(3,5,6)` is `(4, 7, 9)`.

## Factorial

For a non-integer `n`, `n!` is `gamma(n + 1)`. An exact non-integer
argument stays symbolic, and `N` or a float argument gives the value to the
engine precision:

```epsil
[(5/2)!, N((5/2)!), 2.5!]
// ➔ [(5/2)!,3.32335097044784255118,3.32335097044784255118]
```

At a negative integer, `n!` is a pole:

```epsil
[0!, (-1)!]
// ➔ [1,~oo]
```

Above machine precision, a factorial too large for an exact integer is a
big decimal under `N`:

```epsil
N((10^6)!)
// ➔ 8.26393168833124006238e+5565708
```

### MathJSON

`["Factorial", n]`. In LaTeX: `n!`.

```json example
["Factorial", 5]
// ➔ 120

["Factorial", ["Rational", 5, 2]]
// ➔ (5/2)!

["Factorial", 2.5]
// ➔ 3.32335097044784255118
```

## Factorial2

The double factorial of `n` is $n!! = n \cdot (n-2) \cdot (n-4) \cdots$,
the product of the positive integers up to `n` that have the same parity
as `n`. It can also be written with the $\Gamma$ function:

$$
n!! = 2^{\frac{n}{2}+\frac{1}{4}(1-\cos(\pi n))}\pi^{\frac{1}{4}(\cos(\pi
n)-1)}\Gamma\left(\frac{n}{2}+1\right)
$$

It is not the factorial of the factorial of `n`:

```epsil
[factorial2(6), (3!)!]
// ➔ [48,720]
[factorial2(0), factorial2(-1), factorial2(-3)]
// ➔ [1,1,-1]
```

Epsil has no `!!` operator: write `factorial2(n)`.

```epsil
5!!
// ➔ error: Unexpected symbol "!!"
```

See also: [Double factorial](https://en.wikipedia.org/wiki/Double_factorial).

### MathJSON

`["Factorial2", n]`. In LaTeX: `n!!`.

```json example
["Factorial2", 5]
// ➔ 15
```

## Gamma

The gamma function extends the factorial, with its argument shifted by 1,
to real and complex numbers:

$$
\Gamma(z) = \int_0^{\infty} t^{z-1} e^{-t} \, \mathrm{d}t
$$

A half-integer argument gives a rational multiple of $\sqrt{\pi}$, and the
non-positive integers are poles:

```epsil
[gamma(5), gamma(-3/2), gamma(0)]
// ➔ [24,4/3 * sqrt(pi),~oo]
```

#### Incomplete gamma function

With two arguments, `gamma(s, z)` is the **upper incomplete gamma
function**: the lower limit of the integral is `z` instead of 0.

$$
\Gamma(s, z) = \int_z^{\infty} t^{s-1} e^{-t} \, \mathrm{d}t
$$

The order `s` and the lower limit `z` can be real or complex, including
negative and fractional orders. For a positive integer order the value is
a closed form, $\Gamma(\frac12, z)$ is $\sqrt{\pi}\operatorname{erfc}\sqrt{z}$,
and $\Gamma(s, 0)$ is $\Gamma(s)$. This is the `Gamma[s, z]` convention of
Mathematica.

```epsil
[gamma(2, 1), gamma(2, x), gamma(s, 0)]
// ➔ [2 / e,(x + 1) * e^(-x),Gamma(s)]
gamma(1/2, z)
// ➔ Erfc(sqrt(z)) * sqrt(pi)
```

Other exact arguments stay symbolic; `N` gives their value:

```epsil
N(gamma(-1/2, 1))
// ➔ 0.178147711781560690193
N(gamma(1 + i, 2))
// ➔ (0.06463204417295909 + 0.11284029404942608i)
```

With three arguments, `gamma(s, z0, z1)` is the **generalized incomplete
gamma function** $\Gamma(s, z_0) - \Gamma(s, z_1)$, the integral from $z_0$
to $z_1$.

See also: [Gamma function](https://en.wikipedia.org/wiki/Gamma_function),
[DLMF 5.2.E1](http://dlmf.nist.gov/5.2.E1),
[DLMF 8.2.E2](http://dlmf.nist.gov/8.2.E2).

### MathJSON

`["Gamma", z]`, `["Gamma", s, z]` and `["Gamma", s, z0, z1]`. In LaTeX:
`\Gamma(z)` and `\Gamma(s, z)`. `\Gamma(n)` is `(n-1)!`.

```json example
["Gamma", 5]
// ➔ 24

["Gamma", ["Rational", 1, 2]]
// ➔ ["Sqrt", "Pi"]

["Gamma", 2, 1]
// ➔ ["Divide", 2, "ExponentialE"]

["N", ["Gamma", 2, 1, 3]]
// ➔ 0.536610608871428871274
```

## GammaLn

`gammaLn(z)` is the principal logarithm of $\Gamma(z)$, as `gammaln` in
MATLAB and SciPy. It is not the `LogGamma` of Mathematica, the analytic
continuation of $\ln\Gamma$, which is
[`logGamma`](/reference/special-functions/#loggamma) here. The two agree
for a positive real argument and differ by a multiple of $2\pi i$
elsewhere:

```epsil
[N(gammaLn(5)), N(logGamma(5))]
// ➔ [3.17805383034794561965,3.17805383034794561965]
N(gammaLn(-1.5))
// ➔ 0.860047015376481014511
N(logGamma(-1.5))
// ➔ (0.8600470153764792 - 6.283185307179586i)
```

### MathJSON

`["GammaLn", z]`. In LaTeX: `\ln(\Gamma(z))`.

```json example
["N", ["GammaLn", -1.5]]
// ➔ 0.860047015376481014511
```

## HarmonicNumber

For a non-negative integer `n` and an integer `r`, the value is an exact
rational. For a rational `n` with a denominator from 2 to 4, and `r = 1`,
the value is exact, from $H_n = \psi(n+1) + \gamma$. Another rational stays
unevaluated.

```epsil
[harmonicNumber(3, 2), harmonicNumber(4, -1), harmonicNumber(1/2)]
// ➔ [49/36,10,2 - 2ln(2)]
[harmonicNumber(1/4), harmonicNumber(1/5)]
// ➔ [4 - 3ln(2) - 1/2 * pi,HarmonicNumber(1/5)]
```

Elsewhere `N` gives the continuation $\psi(n+1) + \gamma$, or
$\zeta(r) - \zeta(r, n+1)$ for $r \ne 1$. A negative integer `n` is a pole.

```epsil
[N(harmonicNumber(0.5)), N(harmonicNumber(2, 1/2)), harmonicNumber(-2)]
// ➔ [0.613705638880109381166,1.7071067811865475244,~oo]
```

### MathJSON

`["HarmonicNumber", n]` and `["HarmonicNumber", n, r]`.

```json example
["HarmonicNumber", 10]
// ➔ ["Rational", 7381, 2520]

["HarmonicNumber", 3, 2]
// ➔ ["Rational", 49, 36]
```

## Zeta

For a complex `s` with a real part greater than 1, the Riemann zeta
function is

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$

and it is extended to other values by analytic continuation. At a complex
`s`, `N` gives a double. Above $|\operatorname{Im} s| \approx 12\,868$ the
call stays unevaluated.

```epsil
[zeta(0), zeta(-2), zeta(1)]
// ➔ [-1/2,0,~oo]
N(zeta(1/2 + 12000i))
// ➔ (-0.03313149368569025 - 0.11149640109324212i)
N(zeta(1/2 + 13000i))
// ➔ Zeta((0.5 + 13000i))
```

#### Generalized zeta function

`zeta(s, a)` is the generalized zeta function as Mathematica defines it:

$$
\zeta(s, a) = \sum_{n=0}^{\infty} \frac{1}{|n + a|^s}
$$

with the term where $n + a = 0$ omitted, except at $s = 0$, where every
term is 1 and $\zeta(0, a) = \frac12 - a$ for every numeric $a$.

```epsil
[zeta(2, -1), zeta(0, 3), zeta(s, 1)]
// ➔ [1 + 1/6 * pi^2,-5/2,Zeta(s)]
```

For $a > 0$ it is equal to the Hurwitz zeta function
[`hurwitzZeta(s, a)`](/reference/arithmetic/#hurwitzzeta), which sums
$(n + a)^{-s}$ with the principal power. For $a \le 0$ the two differ:

```epsil
N(zeta(2.976, -2.664))
// ➔ 29.9024396938557276849
N(hurwitzZeta(2.976, -2.664))
// ➔ (22.600262690249576 - 0.275416075811198i)
```

See also: [Riemann zeta function](https://en.wikipedia.org/wiki/Riemann_zeta_function),
[DLMF 25.2](http://dlmf.nist.gov/25.2).

### MathJSON

`["Zeta", s]` and `["Zeta", s, a]`. In LaTeX: `\zeta(s)`.

```json example
["Zeta", 2]
// ➔ ["Multiply", ["Rational", 1, 6], ["Power", "Pi", 2]]

["Zeta", 0, 3]
// ➔ ["Rational", -5, 2]
```

## DirichletEta

The values at the integers are exact. A real `s` is computed to the engine
precision, also next to $s = 1$. A complex `s` is computed in double
precision.

```epsil
[dirichletEta(0), dirichletEta(-1), N(dirichletEta(1.001))]
// ➔ [1/2,1/4,0.693307016778961202313]
N(dirichletEta(1 + i))
// ➔ (0.7265597750624632 + 0.15809586390120733i)
```

### MathJSON

`["DirichletEta", s]`. In LaTeX: `\eta(s)`.

```json example
["DirichletEta", 2]
// ➔ ["Multiply", ["Rational", 1, 12], ["Power", "Pi", 2]]

["DirichletEta", 1]
// ➔ ["Ln", 2]
```

## DirichletBeta

The values at the integers are exact. A real `s` is computed to the engine
precision, a complex `s` in double precision.

```epsil
[dirichletBeta(2), dirichletBeta(5)]
// ➔ [catalanConstant,5/1536 * pi^5]
[dirichletBeta(0), dirichletBeta(-1)]
// ➔ [1/2,0]
N(dirichletBeta(1 + i))
// ➔ (0.8616306241992917 + 0.1764491519835i)
```

### MathJSON

`["DirichletBeta", s]`. In LaTeX: `\beta(s)`.

```json example
["DirichletBeta", 1]
// ➔ ["Multiply", ["Rational", 1, 4], "Pi"]

["DirichletBeta", 2]
// ➔ "CatalanConstant"
```

## Beta

$$
\operatorname{B}(a, b) = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
= \int_0^1 t^{a-1}(1-t)^{b-1} \, dt
$$

At a complex argument, `N` gives $\Gamma(a)\Gamma(b)/\Gamma(a+b)$ as a
double.

```epsil
N(beta(1 + i, 2))
// ➔ (0.10000000000000012 - 0.3000000000000001i)
```

#### Incomplete beta function

`beta(z, a, b)` is the incomplete beta function $\operatorname{B}_z(a, b)$,
and `beta(z0, z1, a, b)` the generalized form
$\operatorname{B}_{z_1}(a, b) - \operatorname{B}_{z_0}(a, b)$. For a
rational `z` and positive integers `a` and `b` the value is exact.

```epsil
[beta(0, 1/2, 2, 3), N(beta(0.1, 0.5, 2, 3))]
// ➔ [11/192,0.0529333333333333333333]
```

See also: [Beta function](https://en.wikipedia.org/wiki/Beta_function),
[DLMF 5.12](http://dlmf.nist.gov/5.12).

### MathJSON

`["Beta", a, b]`, `["Beta", z, a, b]` and `["Beta", z0, z1, a, b]`. In
LaTeX: `\Beta(a, b)`.

```json example
["Beta", 2, 3]
// ➔ ["Rational", 1, 12]

["Beta", ["Rational", 1, 2], 2, 3]
// ➔ ["Rational", 11, 192]
```

## LambertW

The Lambert W function, also called the product logarithm, is the inverse
of $f(w) = w e^w$. For a value $x$, $W_k(x)$ is the value $w$ on branch $k$
such that $w e^w = x$. The branch $k$ is an integer. When it is not given,
it is 0, the principal branch $W_0$.

$W_k(x)$ is real only on the two real branches:

- $W_0(x)$ for $x \ge -1/e$
- $W_{-1}(x)$ for $-1/e \le x < 0$

On the other branches, and for other arguments, the value is complex.

```epsil
[lambertW(-1/e), N(lambertW(-0.3)), N(lambertW(-0.3, -1))]
// ➔ [-1,-0.489402227180214969036,-1.78133702342162761197]
N(lambertW(-1))
// ➔ (-0.3181315052047641 + 1.3372357014306895i)
N(lambertW(-0.3, 1))
// ➔ (-3.3002378364383755 + 7.436294411632747i)
```

`lambertW(-1/e)` is exact. Other values with a simple closed form, such as
W(0) = 0 and W(e) = 1, are given by `N`:

```epsil
[lambertW(0), N(lambertW(0)), N(lambertW(e))]
// ➔ [LambertW(0),0,1]
```

#### Argument order

The branch is the **second** argument: `lambertW(x, k)`. This is the order
of mpmath (`lambertw(z, k)`), SciPy, SymPy, Julia and Fungrim. Mathematica
(`ProductLog[k, z]`, or `LambertW[k, z]` in Wolfram|Alpha), Maple, Sage and
MATLAB put the branch **first**. When you copy an expression from one of
these systems, swap the two arguments.

A branch that is not an integer is a type error. When both arguments are
integers, a swap is not an error: `lambertW(1, 2)` is $W_2(1)$ and
`lambertW(2, 1)` is $W_1(2)$.

```epsil
lambertW(-1, -0.1)
// ➔ error: Type error: expected `integer`, got `-0.1` at `-0.1` in `lambertW(-1, -0.1)`
N(lambertW(1, 2))
// ➔ (-2.401585104868003 + 10.77629951611507i)
N(lambertW(2, 1))
// ➔ (-0.83431036663111 + 4.5302659985550084i)
```

To make the order clear, name the branch. The parameters are named `z` and
`branch`, and named arguments can be in any order:

```epsil
N(lambertW(branch: -1, z: -0.1))
// ➔ -3.57715206395729721841
```

#### Derivative

$$
\frac{d}{dx} W_k(x) = \frac{W_k(x)}{x(1 + W_k(x))}
$$

```epsil
D(lambertW(x), x)
// ➔ LambertW(x) / (x * (LambertW(x) + 1))
```

See also: [Lambert W function](https://en.wikipedia.org/wiki/Lambert_W_function),
[DLMF 4.13](http://dlmf.nist.gov/4.13).

### MathJSON

`["LambertW", z]` and `["LambertW", z, k]`, with the branch second. In
LaTeX: `\operatorname{W}(x)` and `\operatorname{W}_{k}(x)`.

```json example
["N", ["LambertW", -0.1, -1]]
// ➔ -3.57715206395729721841

["N", ["LambertW", -0.1, ["NamedArgument", "'branch'", -1]]]
// ➔ -3.57715206395729721841

["N", ["LambertW", ["NamedArgument", "'branch'", -1],
  ["NamedArgument", "'z'", -0.1]]]
// ➔ -3.57715206395729721841
```

## BesselJ

The Bessel function of the first kind of order $n$. Its derivative with
respect to $x$ is

$$
\frac{d}{dx} J_n(x) = \frac{1}{2}(J_{n-1}(x) - J_{n+1}(x))
$$

```epsil
D(besselJ(n, x), x)
// ➔ -1/2 * BesselJ(n + 1, x) + 1/2 * BesselJ(n - 1, x)
```

#### Bessel functions

Bessel functions are solutions of Bessel's differential equation:

$$
x^2 \frac{d^2 y}{dx^2} + x \frac{dy}{dx} + (x^2 - n^2)y = 0
$$

They arise in problems with cylindrical or spherical symmetry.

`besselJ`, `besselY`, `besselI` and `besselK` of an integer order evaluate
numerically at a real or a complex argument with `N`, and without `N` when
the argument is a float:

```epsil
[besselJ(0, 1), besselJ(0, 1.0)]
// ➔ [BesselJ(0, 1),0.76519768655796655145]
N(besselJ(3, 0.7i))
// ➔ -0.007367373607628006i
```

The negative real axis is their branch cut. There, `besselY` and `besselK`
take the limit from above, as `ln(-2)` does:

```epsil
N(besselY(0, -2))
// ➔ (0.5103756726497453 + 0.44778155828247124i)
N(ln(-2))
// ➔ (0.693147180559945309417 + 3.14159265358979323846i)
```

A real non-integer order evaluates at a positive real argument. At a
negative or a complex argument it stays symbolic.

```epsil
N(besselJ(1/2, 1))
// ➔ 0.671396707141803090416
[N(besselJ(1/2, -1)), N(besselJ(1/2, i))]
// ➔ [BesselJ(0.5, -1),BesselJ(0.5, i)]
```

Above machine precision, a real argument gives the digits of the engine
precision. A call that cannot reach them stays unevaluated:

```epsil
N(besselI(0, 5000))
// ➔ BesselI(0, 5000)
```

Compiled code computes these functions for a real argument only.

See also: [Bessel function](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_first_kind),
[DLMF 10.2](http://dlmf.nist.gov/10.2).

### MathJSON

`["BesselJ", n, x]`. In LaTeX: `J_n(x)`.

```json example
["N", ["BesselJ", 0, 1]]
// ➔ 0.76519768655796655145

["N", ["BesselJ", 3, ["Complex", 0, 0.7]]]
// ➔ -0.007367373607628006i
```

## BesselY

The Bessel function of the second kind of order $n$, also called the
Neumann function. Its derivative with respect to $x$ is

$$
\frac{d}{dx} Y_n(x) = \frac{1}{2}(Y_{n-1}(x) - Y_{n+1}(x))
$$

```epsil
D(besselY(n, x), x)
// ➔ -1/2 * BesselY(n + 1, x) + 1/2 * BesselY(n - 1, x)
besselY(0, 0)
// ➔ -oo
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Bessel function of the second kind](https://en.wikipedia.org/wiki/Bessel_function#Bessel_functions_of_the_second_kind),
[DLMF 10.2](http://dlmf.nist.gov/10.2).

### MathJSON

`["BesselY", n, x]`. In LaTeX: `Y_n(x)`.

```json example
["N", ["BesselY", 0, -2]]
// ➔ 0.5103756726497453 + 0.44778155828247124i
```

## BesselI

The modified Bessel function of the first kind of order $n$. Its
derivative with respect to $x$ is

$$
\frac{d}{dx} I_n(x) = \frac{1}{2}(I_{n-1}(x) + I_{n+1}(x))
$$

```epsil
D(besselI(n, x), x)
// ➔ 1/2 * BesselI(n - 1, x) + 1/2 * BesselI(n + 1, x)
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Modified Bessel functions](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions),
[DLMF 10.25](http://dlmf.nist.gov/10.25).

### MathJSON

`["BesselI", n, x]`. In LaTeX: `I_n(x)`.

```json example
["N", ["BesselI", 0, 1]]
// ➔ 1.2660658777520083356
```

## BesselK

The modified Bessel function of the second kind of order $n$, also called
the Macdonald function. Its derivative with respect to $x$ is

$$
\frac{d}{dx} K_n(x) = -\frac{1}{2}(K_{n-1}(x) + K_{n+1}(x))
$$

```epsil
D(besselK(n, x), x)
// ➔ -1/2 * BesselK(n - 1, x) - 1/2 * BesselK(n + 1, x)
[besselK(0, 0), N(besselK(1/2, 2))]
// ➔ [+oo,0.119937771968061447368]
N(besselK(0, -2))
// ➔ (0.11389387274953343 - 7.161528439050256i)
```

See [Bessel functions](/reference/arithmetic/#bessel-functions) for the
evaluation of the four Bessel functions.

See also: [Modified Bessel functions](https://en.wikipedia.org/wiki/Bessel_function#Modified_Bessel_functions),
[DLMF 10.25](http://dlmf.nist.gov/10.25).

### MathJSON

`["BesselK", n, x]`. In LaTeX: `K_n(x)`.

```json example
["N", ["BesselK", 0, 1]]
// ➔ 0.421024438240708333336
```

## AiryAi

$\operatorname{Ai}$ is the solution of the Airy equation that decays
exponentially for a positive $x$ and oscillates for a negative $x$. Its
value at 0 is exact:

```epsil
airyAi(0)
// ➔ 1 / (Gamma(2/3) * 3^(2/3))
[N(airyAi(-2)), airyAi(+oo), airyAi(-oo)]
// ➔ [0.227407428201685575992,0,0]
```

#### Airy functions

Airy functions are solutions of the Airy differential equation:

$$
\frac{d^2 y}{dx^2} - xy = 0
$$

They arise in physics, in particular in quantum mechanics and optics.

`airyAi`, `airyBi`, `airyAiPrime` and `airyBiPrime` evaluate numerically
at a real or a complex argument with `N`, and without `N` when the argument
is a float. Compiled code computes them for a real argument only.

```epsil
[airyAi(0.0), airyAi(1.0)]
// ➔ [0.35502805388781723926,0.135292416312881415524]
N(airyAi(1 + i))
// ➔ (0.060458308371838146 - 0.15188956587718141i)
```

Above machine precision, `airyAi` and `airyBi` of a real argument are
computed to the engine precision. Past $|x| = 10^4$, and for `airyBi` past
about $x = 130$, the call stays unevaluated.

```epsil
[N(airyAi(20000)), N(airyBi(140))]
// ➔ [AiryAi(20000),AiryBi(140)]
N(airyBi(100))
// ➔ 6.04122399667020139901e+288
```

The derivative of an Airy function stays within the Airy family:

```epsil
[D(airyAi(x), x), D(airyAiPrime(x), x), D(airyBiPrime(x), x)]
// ➔ [AiryAiPrime(x),x * AiryAi(x),x * AiryBi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

### MathJSON

`["AiryAi", x]`. In LaTeX: `\operatorname{Ai}(x)`.

```json example
["N", ["AiryAi", ["Complex", 1, 1]]]
// ➔ 0.060458308371838146 - 0.15188956587718141i
```

## AiryBi

$\operatorname{Bi}$ is the solution of the Airy equation that grows
exponentially for a positive $x$ and oscillates for a negative $x$. Its
value at 0 is exact:

```epsil
airyBi(0)
// ➔ 1 / (Gamma(2/3) * root(6)(3))
[N(airyBi(-2)), airyBi(+oo)]
// ➔ [-0.412302587956398488083,+oo]
```

See [Airy functions](/reference/arithmetic/#airy-functions) for the
evaluation of the four Airy functions.

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

### MathJSON

`["AiryBi", x]`. In LaTeX: `\operatorname{Bi}(x)`.

```json example
["N", ["AiryBi", 0]]
// ➔ 0.614926627446000735151
```

## AiryAiPrime

$\operatorname{Ai}'$ satisfies $\operatorname{Ai}''(x) = x\operatorname{Ai}(x)$,
so the derivative of an Airy expression stays within the Airy family. Its
value at 0 is exact:

```epsil
[airyAiPrime(0), D(airyAiPrime(x), x)]
// ➔ [-1 / (Gamma(1/3) * root(3)(3)),x * AiryAi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

### MathJSON

`["AiryAiPrime", x]`. In LaTeX: `\operatorname{Ai}'(x)`.

```json example
["N", ["AiryAiPrime", 0]]
// ➔ -0.2588194037928068
```

## AiryBiPrime

$\operatorname{Bi}'$ satisfies $\operatorname{Bi}''(x) = x\operatorname{Bi}(x)$.
Its value at 0 is exact:

```epsil
[airyBiPrime(0), D(airyBiPrime(x), x)]
// ➔ [root(6)(3) / Gamma(1/3),x * AiryBi(x)]
```

See also: [Airy function](https://en.wikipedia.org/wiki/Airy_function),
[DLMF 9.2](http://dlmf.nist.gov/9.2).

### MathJSON

`["AiryBiPrime", x]`. In LaTeX: `\operatorname{Bi}'(x)`.

```json example
["N", ["AiryBiPrime", 0]]
// ➔ 0.4482883573538264
```

## Real

A real number is its own real part. The real part of a symbol of unknown
type stays unevaluated.

```epsil
[real(3 + 4i), real(pi), real(2i), real(x)]
// ➔ [3,pi,0,Real(x)]
real(e^(i * pi / 3))
// ➔ 1/2
```

### MathJSON

`["Real", z]`. In LaTeX: `\Re(z)`.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

## Imaginary

The imaginary part of a real number is 0.

```epsil
[imaginary(3 + 4i), imaginary(pi), imaginary(sqrt(-4))]
// ➔ [4,0,2]
imaginary(e^(i * pi / 3))
// ➔ sqrt(3)/2
```

### MathJSON

`["Imaginary", z]`. In LaTeX: `\Im(z)`.

```json example
["Imaginary", ["Complex", 3, 4]]
// ➔ 4
["Imaginary", "Pi"]
// ➔ 0
```

## Conjugate

The conjugate of a complex number is its mirror image across the real
axis:

$$
\overline{z} = \Re z - i \Im z
$$

The product of a number and its conjugate is the square of its magnitude,
and the conjugate of a product is the product of the conjugates:

```epsil
[conjugate(3 + 4i), conjugate(5), conjugate(2i)]
// ➔ [(3 - 4i),5,-2i]
let z = 3 + 4i
z * conjugate(z) == abs(z)^2
// ➔ true
conjugate((1 + 2i) * (3 - i))
// ➔ (5 - 5i)
conjugate(1 + 2i) * conjugate(3 - i)
// ➔ (5 - 5i)
```

### MathJSON

`["Conjugate", z]`. In LaTeX: `\overline{z}`. `z^\ast` is read as
`ConjugateTranspose`, which is the conjugate for a number.

```json example
["Conjugate", ["Complex", 3, 4]]
// ➔ ["Complex", 3, -4]
```

## Abs

The magnitude of a complex number is the distance from the origin to the
point that represents it in the complex plane:

$$
|z| = \sqrt{(\Re z)^2 + (\Im z)^2}
$$

```epsil
[abs(-3 + 4i), sqrt((-3)^2 + 4^2)]
// ➔ [5,5]
[abs(1 + i), abs(i), abs(oo)]
// ➔ [sqrt(2),1,+oo]
```

`abs` of a list is the list of the magnitudes of its elements:

```epsil
abs([3, -4])
// ➔ [3,4]
```

### MathJSON

`["Abs", z]`. In LaTeX: `|z|` or `\operatorname{abs}(z)`.

```json example
["Abs", ["Complex", 3, 4]]
// ➔ 5
```

## Argument

The argument of a complex number is the angle between the positive real
axis and the line from the origin to the point that represents it in the
complex plane. It is `arctan2(imaginary(z), real(z))`, between `-pi` and
`pi`, with `pi` included. An exact argument stays exact; `N` gives its
numeric value.

```epsil
[argument(3 + 4i), N(argument(3 + 4i))]
// ➔ [arctan(4/3),0.927295218001612232427]
argument(3 + 4i) == arctan2(4, 3)
// ➔ true
[argument(-1), argument(-i), argument(-1 - i), argument(0)]
// ➔ [pi,-1/2 * pi,-3/4 * pi,0]
```

The angle is in the angular unit of the engine, as the result of the
inverse trigonometric functions is. The unit is radians unless the program
that hosts the engine sets another one: see
[Angular units](/compute-engine/guides/numeric-evaluation/#angular-units).

### MathJSON

`["Argument", z]`, and its alias `["Arg", z]`. In LaTeX: `\arg(z)`.

```json example
["Argument", ["Complex", 3, 4]]
// ➔ ["Arctan", ["Rational", 4, 3]]
["N", ["Arg", ["Complex", 3, 4]]]
// ➔ 0.927295218001612232427
```

## AbsArg

The tuple `(abs(z), argument(z))` is the polar representation of `z`. The
argument is in the angular unit of the engine, as for `argument`.

$$
3 + 4i = 5 (\cos \theta + i \sin \theta) = 5 e^{i\theta},
\quad \theta = \arctan \tfrac{4}{3} \approx 0.9273
$$

```epsil
absArg(3 + 4i)
// ➔ (5, arctan(4/3))
N(absArg(3 + 4i))
// ➔ (5, 0.927295218001612232427)
let (r, t) = absArg(3 + 4i)
r
// ➔ 5
```

### MathJSON

`["AbsArg", z]` evaluates to a `Tuple`.

```json example
["AbsArg", ["Complex", 3, 4]]
// ➔ ["Tuple", 5, ["Arctan", ["Rational", 4, 3]]]
```

## ComplexRoots

The `n` roots of `z` are the `n` solutions `w` of $w^n = z$. The first one
is the principal root, and the others follow it counterclockwise around
the origin. The roots of unity, `complexRoots(1, n)`, are the vertices of
a regular polygon with `n` sides.

```epsil
complexRoots(1, 3)
// ➔ [1,-1/2 + sqrt(3)/2i,-1/2 - sqrt(3)/2i]
[complexRoots(16, 4), complexRoots(-4, 2)]
// ➔ [[2,2i,-2,-2i],[2i,-2i]]
complexRoots(-8, 3)
// ➔ [1 + sqrt(3)i,-2,1 - sqrt(3)i]
```

`n` must be a positive integer. When `z` is a complex number that is not
real, the roots are floating-point numbers. A symbolic `z` stays
unevaluated.

```epsil
complexRoots(1, 0)
// ➔ error: Runtime error: evaluation error: the arguments do not satisfy the precondition of ComplexRoots
complexRoots(i, 2)
// ➔ [(0.7071067811865476 + 0.7071067811865475i),(-0.7071067811865477 - 0.7071067811865475i)]
complexRoots(x, 2)
// ➔ ComplexRoots(x, 2)
```

See also: [n-th root](https://en.wikipedia.org/wiki/Nth_root),
[Root of unity](https://en.wikipedia.org/wiki/Root_of_unity),
[n-th root (MathWorld)](http://mathworld.wolfram.com/nthRoot.html).

### MathJSON

`["ComplexRoots", z, n]`. In LaTeX: `\operatorname{ComplexRoots}(z, n)`.

```json example
["ComplexRoots", 1, 3]
```
