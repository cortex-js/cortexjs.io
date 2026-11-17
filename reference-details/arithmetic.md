<!-- The detail of the entries of /reference/arithmetic/. Format: README.md. -->

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
`["Element", index, collection]`.

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
["Sum", ["List", 5, 7, "x", "y"]]
// ➔ ["Add", 12, "x", "y"]
["Sum", ["Add", "i", 1], ["Tuple", "i", 1, 10]]
// ➔ 65
["Sum", "k", "k", 1, 10]
// ➔ 55
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
