---
title: Statistics Reference
sidebar_label: Statistics
slug: /reference/statistics/
description: "The statistics library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from statistics.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Statistics

The 35 definitions of the statistics library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Data and distributions

The functions of this library take their data as a collection of numbers:
several arguments, a list, a range, or `linspace(a, b, n)`. A matrix is not a
collection of numbers here.

```epsil
[mean(1, 2, 3), mean([1, 2, 3]), mean(1..10)]
// ➔ [2,2,11/2]
mean([[1, 2], [3, 4]])
// ➔ error: Type error: expected `collection<number> | distribution | number`, got `matrix<integer^(2x2)>` at `[[1, 2], [3, 4]]` in `mean([[1, 2], [3, 4]])`
```

Exact data gives an exact result.

### Probability distributions

A **probability distribution** is a value, made by one of
`normalDistribution`, `binomialDistribution`, `poissonDistribution`,
`uniformDistribution` and `exponentialDistribution`. It can be assigned,
passed as an argument, and queried with `pdf`, `cdf`, `quantile`, `mean`,
`variance` and `standardDeviation`. With symbolic parameters, the answers are
symbolic.

These functions give **exact closed forms**: an ordinary expression, which
`N` approximates at machine or arbitrary precision. A float parameter or
point gives a float. A discrete `cdf` reads a float point as its floor, and
stays exact.

```epsil
cdf(normalDistribution(0, 1), x)
// ➔ 1/2 * (Erf(sqrt(2)/2 * x) + 1)
[pdf(normalDistribution(0, 1), 0.5), cdf(poissonDistribution(2), 2.5)]
// ➔ [0.352065326764299477774,5 / e^2]
[mean(normalDistribution(mu, sigma)), variance(binomialDistribution(n, p))]
// ➔ [mu,n * p * (1 - p)]
```

The error functions and the regularized incomplete gamma and beta functions
that these closed forms use are in the
[Special Functions](/reference/special-functions/) library.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### betaRegularized

`(complex | infinity, complex | infinity, complex | infinity, (complex | infinity)?) -> number`

Regularized incomplete beta function I_x(a, b); with four arguments, I_z1(a, b) − I_z0(a, b)

$$
I_x(a, b) = \frac{1}{\operatorname{B}(a, b)}\int_0^x t^{a-1}(1-t)^{b-1} \, dt
$$

The endpoints fold for a numeric `a` and `b`: `betaRegularized(0, a, b)`
is 0 and `betaRegularized(1, a, b)` is 1. For a rational `x` and positive
integers `a` and `b` the value is an exact rational. Other exact arguments
stay symbolic; `N` gives their value, at machine or arbitrary precision.

```epsil
[betaRegularized(0, 2, 3), betaRegularized(1, 2, 3)]
// ➔ [0,1]
betaRegularized(1/2, 2, 3)
// ➔ 11/16
betaRegularized(1/3, 1/2, 2)
// ➔ BetaRegularized(1/3, 1/2, 2)
```

Outside $[0, 1]$, `N` gives the real value where it is a finite sum: for
positive integers `a` and `b` at any real `x`, and for $x > 1$ with an
integer `b` up to 30. Elsewhere the call stays unevaluated.

```epsil
[N(betaRegularized(2, 2, 3)), N(betaRegularized(2, 1/2, 2))]
// ➔ [8,0.707106781186547524401]
N(betaRegularized(-1, 1/2, 2))
// ➔ BetaRegularized(-1, 0.5, 2)
```

The cumulative distribution function of a binomial distribution evaluates
to this function: $\operatorname{CDF}(\operatorname{Binomial}(n, p), k) =
I_{1-p}(n-k, k+1)$.

```epsil
cdf(binomialDistribution(10, 1/2), 3)
// ➔ 11/64
```

With four arguments, `betaRegularized(z0, z1, a, b)` is
$I_{z_1}(a, b) - I_{z_0}(a, b)$.

```epsil
N(betaRegularized(0.2, 0.5, 2, 3))
// ➔ 0.5067
```

See also: [DLMF 8.17](http://dlmf.nist.gov/8.17).

<MathJson name="BetaRegularized">

`["BetaRegularized", x, a, b]` and `["BetaRegularized", z0, z1, a, b]`.

```json example
["N", ["BetaRegularized", 0.5, 2, 3]]
// ➔ 0.6875

["BetaRegularized", ["Rational", 1, 2], 2, 3]
// ➔ ["Rational", 11, 16]
```

</MathJson>

### binCounts

`(collection<number>, list<number> | number) -> list<number>`

Count the number of elements falling into each bin.

```epsil
binCounts([1, 2, 2, 3], 3)
// ➔ [1,2,1]
```

```epsil
binCounts([1, 2, 2, 3, 4, 5, 5, 5], 3)
// ➔ [3,1,4]
```

<MathJson name="BinCounts">

`["BinCounts", collection, bins]`.

</MathJson>

### binomialDistribution

`(integer<0..>, real<0..1>) -> expression<BinomialDistribution>`

Binomial distribution: number of successes in n independent trials, each with success probability p.

The number of successes in `n ≥ 0` independent trials, each succeeding with
probability `0 ≤ p ≤ 1`.

<MathJson name="BinomialDistribution">

`["BinomialDistribution", n, p]`.

</MathJson>

### cdf

`(distribution, real | signed_infinity) -> nan | real<0..1>`

Cumulative distribution function P(X ≤ x) of a distribution.

The **cumulative distribution function**: the probability that a value is at
most `x`. The result is exact: a normal CDF is written with `erf`, and a
discrete one with the regularized incomplete gamma or beta function. Use `N`
for a numeric value.

```epsil
N(cdf(normalDistribution(0, 1), 1))
// ➔ 0.841344746068542948585
```

<MathJson name="CDF">

`["CDF", distribution, x]`.

</MathJson>

### correlation

`(collection<number | tuple>, collection<number>?) -> nan | real<-1..1>`

Pearson's correlation coefficient of paired data, given as two equal-length collections or one collection of (x, y) pairs.

The **Pearson correlation coefficient** of two data sets, between `-1` and
`1`: the strength of their linear relationship,
$r = \frac{\operatorname{cov}(x, y)}{\sigma_x \sigma_y}$.

```epsil
correlation([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
// ➔ sqrt(15)/5
```

<MathJson name="Correlation">

`["Correlation", xs, ys]`, `["Correlation", points]`.

</MathJson>

### covariance

`(collection<number | tuple>, collection<number>?) -> nan | real`

Sample covariance (n − 1 denominator) of paired data, given as two equal-length collections or one collection of (x, y) pairs.

The **sample covariance** of two data sets: two collections of the same
length, or one collection of `(x, y)` pairs.
$\operatorname{cov}(x, y) = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$.
`populationCovariance` has the denominator `n`.

```epsil
[covariance([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]), covariance([(1, 2), (2, 4), (3, 5)])]
// ➔ [3/2,3/2]
populationCovariance([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
// ➔ 6/5
```

<MathJson name="Covariance">

`["Covariance", xs, ys]`, `["Covariance", points]`.

</MathJson>

### erf

`(complex | signed_infinity, (complex | signed_infinity)?) -> complex`

Gauss error function; with two arguments, Erf(z1) − Erf(z0)

The error function is used in statistics to compute probabilities of
normally distributed events. For a complex `z`,

$$
\operatorname{erf} z = \frac{2}{\sqrt{\pi}} \int_0^z e^{-t^2} dt
$$

It is an odd function, $\operatorname{erf}(-z) = -\operatorname{erf} z$:
`simplify` applies this.

```epsil
[erf(0), erf(-x), simplify(erf(-x))]
// ➔ [0,Erf(-x),-Erf(x)]
N(erf(1 + i))
// ➔ (1.3161512816979477 + 0.19045346923783446i)
```

With two arguments, `erf(z0, z1)` is the **generalized error function**
$\operatorname{erf} z_1 - \operatorname{erf} z_0$.

```epsil
N(erf(0.1, 0.5))
// ➔ 0.408036961794761645479
```

<MathJson name="Erf">

`["Erf", z]` and `["Erf", z0, z1]`.

```json example
["N", ["Erf", 0.1, 0.5]]
// ➔ 0.408036961794761645479
```

</MathJson>

### erfInv

`(complex | infinity, (complex | infinity)?) -> number`

Inverse of the error function; with two arguments, the x with Erf(z0, x) = z, that is ErfInv(z + Erf(z0))

`erfInv(x)` is the inverse error function,
$\operatorname{erf}(\operatorname{erf}^{-1} x) = x$, of a real number
$-1 < x < 1$. At $\pm 1$ it is $\pm\infty$. Outside that interval the value
is not defined: `erfInv(+oo)` is `NaN`, and `erfInv(2)` stays unevaluated,
also with `N`.

```epsil
[erfInv(0), erfInv(1), erfInv(-1), N(erfInv(1/2))]
// ➔ [0,+oo,-oo,0.476936276204469873381]
[N(erfInv(2)), erfInv(+oo)]
// ➔ [ErfInv(2),NaN]
```

With two arguments, `erfInv(z0, z)` is the $x$ with
$\operatorname{erf} x - \operatorname{erf} z_0 = z$, that is
`erfInv(z + erf(z0))`.

```epsil
N(erfInv(0.5, 0.2))
// ➔ 0.764695648017466677088
```

<MathJson name="ErfInv">

`["ErfInv", x]` and `["ErfInv", z0, z]`.

```json example
["N", ["ErfInv", 0.5, 0.2]]
// ➔ 0.764695648017466677088
```

</MathJson>

### erfc

`(complex | signed_infinity) -> complex`

Complementary error function: 1 - Erf(x)

$\operatorname{erfc} z = 1 - \operatorname{erf} z$, for a complex `z`.

```epsil
[erfc(0), N(erfc(1)), 1 - N(erf(1))]
// ➔ [1,0.157299207050285130659,0.157299207050285130659]
```

<MathJson name="Erfc">

`["Erfc", z]`.

```json example
["N", ["Erfc", 1]]
// ➔ 0.157299207050285130659
```

</MathJson>

### erfi

MathJSON `Erfi` · `(complex | signed_infinity) -> complex | signed_infinity`

Imaginary error function: -i·Erf(i·x)

### exponentialDistribution

`(real<0<..>) -> expression<ExponentialDistribution>`

Exponential distribution with rate parameter λ.

The waiting time between events that occur at a mean rate `lambda > 0`. This
is the rate parameterization: the mean is `1/lambda`.

```epsil
mean(exponentialDistribution(lambda))
// ➔ 1 / lambda
```

<MathJson name="ExponentialDistribution">

`["ExponentialDistribution", lambda]`.

</MathJson>

### findFit

MathJSON `FindFit` · `(any, any, any, any, dictionary?) -> dictionary`

Nonlinear least-squares fit of a model to data. FindFit(data, model, params, vars): fit `model` (an expression in `vars` and the parameters) to `data`, a list of (x…, y) tuples or a plain list of y values. Each parameter spec is a bare symbol, (a, a0), or (a, a0, lo, hi) with box constraints. Returns a record &#123;parameters, converged, residualNorm, iterations&#125;. `converged` is true at a stationary point of the sum of squared residuals (a minimum of the misfit, which is not zero for noisy data), and at an exact fit: every residual within the engine's tolerance of the terms its own row computes. The joint form takes a list of models and matching datasets sharing parameters. An optional fifth argument is a dictionary of options: `{global: {b: [lo, hi]}}` searches the named parameters (at most two) over the given range for the lowest sum of squared residuals instead of returning the local minimum nearest the start; `iterations` is then the total over every solver run. The search samples each parameter on a grid: a parameter that scales the phase of a periodic function of a variable (`b` in `cos(b x + c)`) gets a point in every basin of the residual, about `π / (span of x)` apart; `{global: {b: [lo, hi, step]}}` sets the step of the grid instead (when the model is linear in the other parameters; otherwise the solver runs from each point of a coarse grid of 24 points, or 6 × 6). A step on the phase `c` of `a cos(b x + c)` keeps it on the grid; without a step the phase is solved by least squares. With more than 300 data rows the grid is scanned on a stratified sample of 300 rows, and the best grid points are then solved again and refined on every row. With a kernel pool on the engine (`ce.workers`), `evaluateAsync()` scans the grid on the workers and gives the record of `evaluate()`; the solver runs stay on the calling thread. The record of `evaluateAsync()` also has `route`: "pool" when the workers scanned the grid, or "calling-thread" with a `reason` ("no-pool", "pool-unusable", "no-global-search", "not-separable", "not-compilable", "pool-declined", "no-points-to-ship", "step-budget", "setup-timeout"). On the calling thread `evaluateAsync()` gives the event loop a turn about every 8 ms, and it keeps the limit of a `withTimeLimit` span that encloses the call.

### gammaRegularized

`(complex | infinity, complex | infinity, (complex | infinity)?) -> number`

Regularized upper incomplete gamma function Q(a, z) = Γ(a, z)/Γ(a); with three arguments, Q(a, z0) − Q(a, z1)

$$
Q(a, z) = \frac{\Gamma(a, z)}{\Gamma(a)} = \frac{1}{\Gamma(a)}\int_z^\infty t^{a-1}e^{-t} \, dt
$$

Special values fold: for a numeric `a`, `gammaRegularized(a, 0)` is 1, and
`gammaRegularized(1, z)` is $e^{-z}$. For a positive integer `a` and an
exact `z` the value is a closed form. Other exact arguments stay symbolic;
`N` gives their value, at machine or arbitrary precision.

```epsil
[gammaRegularized(2, 0), gammaRegularized(1, z), gammaRegularized(3, 5)]
// ➔ [1,e^(-z),37 / (2e^5)]
[gammaRegularized(1/2, 2), N(gammaRegularized(1/2, 2))]
// ➔ [GammaRegularized(1/2, 2),0.0455002638963584144006]
```

The cumulative distribution function of a Poisson distribution evaluates to
this function: $\operatorname{CDF}(\operatorname{Poisson}(\lambda), k) =
Q(k+1, \lambda)$.

```epsil
cdf(poissonDistribution(lambda), k)
// ➔ Which(k < 0, 0, true, GammaRegularized(floor(k) + 1, lambda))
cdf(poissonDistribution(2), 3)
// ➔ 19 / (3e^2)
```

With three arguments, `gammaRegularized(a, z0, z1)` is
$Q(a, z_0) - Q(a, z_1)$.

```epsil
N(gammaRegularized(3, 1, 5))
// ➔ 0.795046583445524662701
```

See also: [DLMF 8.2](http://dlmf.nist.gov/8.2).

<MathJson name="GammaRegularized">

`["GammaRegularized", a, z]` and `["GammaRegularized", a, z0, z1]`.

```json example
["N", ["GammaRegularized", 3, 5]]
// ➔ 0.124652019483081141288
```

</MathJson>

### histogram

`(collection<number>, list<number> | number) -> list<tuple<number, integer>>`

Compute a histogram of the values in a collection. Returns a list of (bin start, count) tuples.

```epsil
histogram([1, 2, 2, 3], 3)
// ➔ [(1, 1),(1.6666666666666665, 2),(2.333333333333333, 1)]
```

`histogram(data, bins)` groups the data into bins and counts the elements of
each: a list of `(start, count)` pairs. `bins` is a number of bins, an
integer, or a list of the edges of the bins. A number of bins that is not an
integer leaves the histogram unevaluated: write a bin width as a list of
edges.

```epsil
histogram([1, 2, 2, 3, 4, 5, 5, 5], 3)
// ➔ [(1, 3),(2.333333333333333, 1),(3.6666666666666665, 4)]
histogram([1, 2, 3], 1.5)
// ➔ Histogram([1,2,3], 1.5)
```

<MathJson name="Histogram">

`["Histogram", collection, bins]`. In LaTeX, `\operatorname{histogram}`
parses to `Histogram`, and `\operatorname{pdf}` and `\operatorname{cdf}` to
`PDF` and `CDF`.

</MathJson>

### interquartileRange

`((collection<number> | number)+) -> +oo | nan | real<0..>`

Interquartile range (Q3 - Q1) of a collection.

<MathJson name="InterquartileRange">

`["InterquartileRange", collection]`.

</MathJson>

### kurtosis

`((collection<number> | number)+) -> nan | real`

Kurtosis of a collection of numbers.

A measure of the weight of the tails of the data:
$\frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^4$.

```epsil
kurtosis([1, 2, 3, 10])
// ➔ 1394/625
```

<MathJson name="Kurtosis">

`["Kurtosis", collection]`.

</MathJson>

### linearRegression

`(any+) -> tuple<number, number>`

Least-squares linear fit b0 + b1·x. Returns Tuple(b0, b1), or the fitted expression if a trailing variable symbol is given.

The **least-squares line** `y = b0 + b1 x` through the data, as the tuple
`(b0, b1)`. With a variable as last argument, the result is the expression of
the line in that variable, ready to plot with the data.

```epsil
linearRegression([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
// ➔ (11/5, 3/5)
linearRegression([1, 2, 3, 4, 5], [2, 4, 5, 4, 5], x)
// ➔ 3/5 * x + 11/5
```

<MathJson name="LinearRegression">

`["LinearRegression", xs, ys]`, `["LinearRegression", points]`, with an
optional variable.

</MathJson>

### mean

`((collection<number> | distribution | number)+) -> number`

Arithmetic mean (average) of a collection of numbers.

The arithmetic mean, $\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$. When the
collection holds complex infinity, the mean is `NaN`: a value with no
direction has no mean, although the `sum` of the same collection is complex
infinity.

```epsil
mean([7, 8, 3.1, 12, 77])
// ➔ 21.42
[mean([1, oo * i]), sum([1, oo * i])]
// ➔ [NaN,~oo]
```

<MathJson name="Mean" latex={["mean"]}>

`["Mean", collection]`, `["Mean", distribution]`. The collection can also be
several arguments, a `Range` or a `Linspace`.

```json example
["Mean", ["List", 7, 8, 3.1, 12, 77]]
// ➔ 21.42
["Mean", ["NormalDistribution", "mu", "sigma"]]
// ➔ "mu"
```

</MathJson>

### median

`((collection<number> | number)+) -> nan | real | signed_infinity`

Median of a collection of numbers.

```epsil
median([3, 1, 4, 2])
// ➔ 5/2
```

The value that separates the higher half of the data from the lower half:
the middle element of the sorted data, or the mean of the two middle elements
when there is an even number of them.

```epsil
[median([1, 2, 3, 4, 5]), median([1, 2, 3, 4])]
// ➔ [3,5/2]
```

<MathJson name="Median" latex={["median"]}>

`["Median", collection]`.

</MathJson>

### mode

`((collection<number> | number)+) -> nan | real | signed_infinity`

Most frequently occurring value in a collection.

```epsil
mode([1, 2, 2, 3])
// ➔ 2
```

The value that occurs most often. When several values occur most often (the
data is bimodal or multimodal), the result is the smallest of them.

```epsil
[mode([1, 2, 2, 3, 4, 4, 5, 5]), mode([2, 5, 5, 3, 2])]
// ➔ [2,2]
```

<MathJson name="Mode">

`["Mode", collection]`.

</MathJson>

### normalDistribution

`(real, real<0<..>) -> expression<NormalDistribution>`

Normal (Gaussian) distribution with mean μ and standard deviation σ.

The **normal** (Gaussian) distribution with mean `mu` and standard deviation
`sigma > 0`. The second parameter is the standard deviation, not the
variance, as in most computer algebra and statistics systems.

```epsil
pdf(normalDistribution(mu, sigma), x)
// ➔ (sqrt(2) * e^(-((-mu + x)^2) / (2sigma^2))) / (2sigma * sqrt(pi))
```

<MathJson name="NormalDistribution">

`["NormalDistribution", mean, standardDeviation]`.

</MathJson>

### pdf

`(distribution, real | signed_infinity) -> nan | real<0..>`

Probability density (continuous) or mass (discrete) function of a distribution, evaluated at x.

The **probability density function** of the distribution at `x`. For a
discrete distribution, it is the **probability mass function**, which is `0`
at a point that is not an integer. With a symbolic `x`, the result is the
formula of the density.

```epsil
[pdf(binomialDistribution(4, 1/2), 2), pdf(binomialDistribution(4, 1/2), 2.5)]
// ➔ [3/8,0]
```

<MathJson name="PDF">

`["PDF", distribution, x]`.

</MathJson>

### poissonDistribution

`(real<0<..>) -> expression<PoissonDistribution>`

Poisson distribution with rate parameter λ.

The number of events in a fixed interval, when events occur independently at
a mean rate `lambda > 0`.

<MathJson name="PoissonDistribution">

`["PoissonDistribution", lambda]`.

</MathJson>

### polynomialFit

`(any+) -> list<number>`

Least-squares polynomial fit of the given degree. Returns the ascending coefficient List(c0, …, c_deg), or the fitted expression if a trailing variable symbol is given.

The **least-squares polynomial** of the given degree, as the list of its
coefficients, the constant term first. Points that lie on a polynomial give
it exactly. With a variable as last argument, the result is the polynomial in
that variable. The degree is at most the number of points minus 1, and at
most 12.

```epsil
polynomialFit([(0, 1), (1, 2), (2, 5), (3, 10)], 2)
// ➔ [1,0,1]
polynomialFit([(0, 1), (1, 2), (2, 5), (3, 10)], 2, x)
// ➔ x^2 + 1
polynomialFit([(0, 1), (1, 2)], 2)
// ➔ error: Runtime error: unexpected argument
```

<MathJson name="PolynomialFit">

`["PolynomialFit", xs, ys, degree]`, `["PolynomialFit", points, degree]`,
with an optional variable.

</MathJson>

### populationCovariance

`(collection<number | tuple>, collection<number>?) -> nan | real`

Population covariance (n denominator) of paired data, given as two equal-length collections or one collection of (x, y) pairs.

$\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$.

<MathJson name="PopulationCovariance">

`["PopulationCovariance", xs, ys]`, `["PopulationCovariance", points]`.

</MathJson>

### populationStandardDeviation

`((collection<number> | number)+) -> nan | real<0..>`

Population Standard Deviation of a collection of numbers.

$\sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2}$, where `N` is the size of the
population.

<MathJson name="PopulationStandardDeviation">

`["PopulationStandardDeviation", collection]`.

</MathJson>

### populationVariance

`((collection<number> | number)+) -> nan | real<0..>`

Population variance of a collection of numbers.

The variance with the denominator `n`, the size of the population:
$\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2$.

<MathJson name="PopulationVariance">

`["PopulationVariance", collection]`.

</MathJson>

### quantile

`(collection<any> | distribution, real<0..1>) -> nan | real | signed_infinity`

Quantile (inverse CDF): the least x with CDF(x) ≥ p, for p in [0, 1]. The first argument may also be a data collection, in which case the empirical quantile is returned.

The **quantile** of a distribution, its inverse CDF: the smallest `x` such
that `cdf(x) ≥ p`, for `0 ≤ p ≤ 1`. `quantile(d, 1/2)` is the median. For a
continuous distribution, the result is a closed form. For a discrete one, it
is found by search, under `N`.

```epsil
quantile(normalDistribution(mu, sigma), p)
// ➔ mu + sqrt(2) * sigma * ErfInv(2p - 1)
N(quantile(poissonDistribution(9), 0.95))
// ➔ 14
```

Of a collection, it is the **empirical quantile**, which interpolates the
sorted data. It agrees with `quartiles` and `median`: `p = 1/4`, `1/2` and
`3/4` give the three quartiles, and `p = 0` and `p = 1` the minimum and the
maximum.

```epsil
[quantile([1, 2, 3, 4, 5, 6, 7, 8], 1/4), quantile([1, 2, 3, 4, 5, 6, 7, 8], 1)]
// ➔ [5/2,8]
```

<MathJson name="Quantile">

`["Quantile", distribution, p]`, `["Quantile", collection, p]`.

```json example
["Quantile", ["PoissonDistribution", 9], 0.95]
```

</MathJson>

### quartiles

`((collection<number> | number)+) -> tuple<lower: nan | real | signed_infinity, mid: nan | real | signed_infinity, upper: nan | real | signed_infinity>`

Lower quartile, median, and upper quartile of a collection. Uses the Moore–McCabe (exclusive-hinges) convention: the sample is split at its median, and Q1/Q3 are the medians of the lower/upper halves with the overall median excluded from both halves when the sample size is odd.

```epsil
quartiles([1, 2, 3, 4, 5])
// ➔ (3/2, 3, 9/2)
```

The three values that divide the sorted data into four groups of the same
size. `interquartileRange` is the third quartile minus the first.

```epsil
[quartiles([1, 2, 3, 4, 5, 6, 7, 8]), interquartileRange([1, 2, 3, 4, 5, 6, 7, 8])]
// ➔ [(5/2, 9/2, 13/2),4]
```

<MathJson name="Quartiles">

`["Quartiles", collection]`.

</MathJson>

### randomSample

`((T, number) random -> T where T: string) & ((indexed_collection, number) random -> list)`

RandomSample(xs, k): a list of k elements drawn from the indexed collection `xs`, without replacement. "Without replacement" is over POSITIONS, not values: on a multiset, repeats are expected — RandomSample([1, 1, 2], 2) can return [1, 1]. Sampling a string yields a string. Wrap the call in `WithRandomSeed(seed, ...)` to make it deterministic.

`randomSample(xs, k)` is a list of `k` elements drawn from the indexed
collection `xs` **without replacement**. That is over **positions**, not
values: each position is drawn at most once, but repeated values of a
multiset can both be drawn, so `randomSample([1, 1, 2], 2)` is `[1, 1]` in
about a quarter of the draws.

Unlike `randomChoice`, the count may not be more than the size of the
collection: there are only that many positions to draw. A count equal to the
size gives a permutation. The count is rounded, so a computed count needs no
rounding. The collection must be indexed: an interval or a set is a type
error; draw from it with `randomChoice`. The collection is not built: a sparse
Fisher–Yates shuffle of the indexes draws exactly `k` elements, so
`randomSample(1..1000000, 3)` is cheap.

```epsil
randomSample([1, 2, 3], 4)
// ➔ error: Runtime error: out of range: a count in 0..3, 4
randomSample([1, 1, 2], 2) in [[1, 1], [1, 2], [2, 1]]
// ➔ true
withRandomSeed(42, randomSample(1..100, 3)) == withRandomSeed(42, randomSample(1..100, 3))
// ➔ true
randomSample(interval(0, 1), 2)
// ➔ error: Type error: expected `indexed_collection`, got `set<real>` at `interval(0, 1)` in `randomSample(interval(0, 1), 2)`
```

`Sample`, with a seed argument, was the previous name: wrap `randomSample` in
`withRandomSeed` instead.

<MathJson name="RandomSample">

`["RandomSample", xs, k]`.

</MathJson>

### skewness

`((collection<number> | number)+) -> nan | real`

Skewness of a collection of numbers.

A measure of the asymmetry of the data about its mean, positive or negative:
$\frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^3$.

```epsil
skewness([1, 2, 3, 10])
// ➔ 18/25sqrt(2)
```

<MathJson name="Skewness">

`["Skewness", collection]`.

</MathJson>

### slidingWindow

`((S, integer, integer?) -> list<string> where S: string) & ((collection, integer, integer?) -> list<list>)`

Return overlapping sliding windows of fixed size over the collection.

```epsil
slidingWindow([1, 2, 3, 4], 2)
// ➔ [[1,2],[2,3],[3,4]]
```

```epsil
slidingWindow("abcd", 2)
// ➔ ["ab","bc","cd"]
```

```epsil
slidingWindow([1, 2, 3, 4, 5], 3)
// ➔ [[1,2,3],[2,3,4],[3,4,5]]
```

<MathJson name="SlidingWindow">

`["SlidingWindow", collection, size]`.

</MathJson>

### standardDeviation

`((collection<number> | distribution | number)+) -> nan | real<0..>`

Sample Standard Deviation of a collection of numbers.

The **sample standard deviation**, the square root of the sample variance:
$\sqrt{\frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2}$.
`populationStandardDeviation` is the square root of the population variance.

```epsil
[standardDeviation([1, 2, 3, 4]), populationStandardDeviation([1, 2, 3, 4])]
// ➔ [sqrt(15)/3,sqrt(5)/2]
standardDeviation(normalDistribution(mu, sigma))
// ➔ sigma
```

<MathJson name="StandardDeviation">

`["StandardDeviation", collection]`, `["StandardDeviation", distribution]`.

</MathJson>

### uniformDistribution

`(real, real) -> expression<UniformDistribution>`

Continuous uniform distribution on the interval [a, b]. `UniformDistribution([a, b])` is the same, and `UniformDistribution()` is on [0, 1].

The continuous uniform distribution on `[a, b]`, with `a < b`.
`uniformDistribution([a, b])` is `uniformDistribution(a, b)`, and
`uniformDistribution()` is on `[0, 1]`.

```epsil
[mean(uniformDistribution([2, 4])), variance(uniformDistribution())]
// ➔ [3,1/12]
```

<MathJson name="UniformDistribution">

`["UniformDistribution", a, b]`, `["UniformDistribution", ["List", a, b]]`,
`["UniformDistribution"]`.

</MathJson>

### variance

`((collection<number> | distribution | number)+) -> nan | real<0..>`

Sample variance of a collection of numbers.

The **sample variance**, with the denominator `n - 1`:
$\frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$. `populationVariance` has the
denominator `n`. Of a distribution, it is the variance of the distribution.

```epsil
[variance([1, 2, 3, 4]), populationVariance([1, 2, 3, 4])]
// ➔ [5/3,5/4]
variance(poissonDistribution(lambda))
// ➔ lambda
```

<MathJson name="Variance">

`["Variance", collection]`, `["Variance", distribution]`.

</MathJson>
