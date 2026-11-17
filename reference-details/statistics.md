<!-- The detail of the entries of /reference/statistics/. Format: README.md. -->

## Section: Data and distributions

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

## Mean

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

### MathJSON

`["Mean", collection]`, `["Mean", distribution]`. The collection can also be
several arguments, a `Range` or a `Linspace`.

```json example
["Mean", ["List", 7, 8, 3.1, 12, 77]]
// ➔ 21.42
["Mean", ["NormalDistribution", "mu", "sigma"]]
// ➔ "mu"
```

## Median

The value that separates the higher half of the data from the lower half:
the middle element of the sorted data, or the mean of the two middle elements
when there is an even number of them.

```epsil
[median([1, 2, 3, 4, 5]), median([1, 2, 3, 4])]
// ➔ [3,5/2]
```

### MathJSON

`["Median", collection]`.

## Mode

The value that occurs most often. When several values occur most often (the
data is bimodal or multimodal), the result is the smallest of them.

```epsil
[mode([1, 2, 2, 3, 4, 4, 5, 5]), mode([2, 5, 5, 3, 2])]
// ➔ [2,2]
```

### MathJSON

`["Mode", collection]`.

## Variance

The **sample variance**, with the denominator `n - 1`:
$\frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$. `populationVariance` has the
denominator `n`. Of a distribution, it is the variance of the distribution.

```epsil
[variance([1, 2, 3, 4]), populationVariance([1, 2, 3, 4])]
// ➔ [5/3,5/4]
variance(poissonDistribution(lambda))
// ➔ lambda
```

### MathJSON

`["Variance", collection]`, `["Variance", distribution]`.

## PopulationVariance

The variance with the denominator `n`, the size of the population:
$\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2$.

### MathJSON

`["PopulationVariance", collection]`.

## StandardDeviation

The **sample standard deviation**, the square root of the sample variance:
$\sqrt{\frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2}$.
`populationStandardDeviation` is the square root of the population variance.

```epsil
[standardDeviation([1, 2, 3, 4]), populationStandardDeviation([1, 2, 3, 4])]
// ➔ [sqrt(15)/3,sqrt(5)/2]
standardDeviation(normalDistribution(mu, sigma))
// ➔ sigma
```

### MathJSON

`["StandardDeviation", collection]`, `["StandardDeviation", distribution]`.

## PopulationStandardDeviation

$\sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2}$, where `N` is the size of the
population.

### MathJSON

`["PopulationStandardDeviation", collection]`.

## Skewness

A measure of the asymmetry of the data about its mean, positive or negative:
$\frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^3$.

```epsil
skewness([1, 2, 3, 10])
// ➔ 18/25sqrt(2)
```

### MathJSON

`["Skewness", collection]`.

## Kurtosis

A measure of the weight of the tails of the data:
$\frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^4$.

```epsil
kurtosis([1, 2, 3, 10])
// ➔ 1394/625
```

### MathJSON

`["Kurtosis", collection]`.

## Covariance

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

### MathJSON

`["Covariance", xs, ys]`, `["Covariance", points]`.

## PopulationCovariance

$\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$.

### MathJSON

`["PopulationCovariance", xs, ys]`, `["PopulationCovariance", points]`.

## Correlation

The **Pearson correlation coefficient** of two data sets, between `-1` and
`1`: the strength of their linear relationship,
$r = \frac{\operatorname{cov}(x, y)}{\sigma_x \sigma_y}$.

```epsil
correlation([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
// ➔ sqrt(15)/5
```

### MathJSON

`["Correlation", xs, ys]`, `["Correlation", points]`.

## LinearRegression

The **least-squares line** `y = b0 + b1 x` through the data, as the tuple
`(b0, b1)`. With a variable as last argument, the result is the expression of
the line in that variable, ready to plot with the data.

```epsil
linearRegression([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
// ➔ (11/5, 3/5)
linearRegression([1, 2, 3, 4, 5], [2, 4, 5, 4, 5], x)
// ➔ 3/5 * x + 11/5
```

### MathJSON

`["LinearRegression", xs, ys]`, `["LinearRegression", points]`, with an
optional variable.

## PolynomialFit

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

### MathJSON

`["PolynomialFit", xs, ys, degree]`, `["PolynomialFit", points, degree]`,
with an optional variable.

## Quartiles

The three values that divide the sorted data into four groups of the same
size. `interquartileRange` is the third quartile minus the first.

```epsil
[quartiles([1, 2, 3, 4, 5, 6, 7, 8]), interquartileRange([1, 2, 3, 4, 5, 6, 7, 8])]
// ➔ [(5/2, 9/2, 13/2),4]
```

### MathJSON

`["Quartiles", collection]`.

## InterquartileRange

### MathJSON

`["InterquartileRange", collection]`.

## Histogram

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

### MathJSON

`["Histogram", collection, bins]`. In LaTeX, `\operatorname{histogram}`
parses to `Histogram`, and `\operatorname{pdf}` and `\operatorname{cdf}` to
`PDF` and `CDF`.

## BinCounts

```epsil
binCounts([1, 2, 2, 3, 4, 5, 5, 5], 3)
// ➔ [3,1,4]
```

### MathJSON

`["BinCounts", collection, bins]`.

## SlidingWindow

```epsil
slidingWindow([1, 2, 3, 4, 5], 3)
// ➔ [[1,2,3],[2,3,4],[3,4,5]]
```

### MathJSON

`["SlidingWindow", collection, size]`.

## RandomSample

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
// ➔ "True"
withRandomSeed(42, randomSample(1..100, 3)) == withRandomSeed(42, randomSample(1..100, 3))
// ➔ "True"
randomSample(interval(0, 1), 2)
// ➔ error: Type error: expected `indexed_collection`, got `set<real>` at `interval(0, 1)` in `randomSample(interval(0, 1), 2)`
```

`Sample`, with a seed argument, was the previous name: wrap `randomSample` in
`withRandomSeed` instead.

### MathJSON

`["RandomSample", xs, k]`.

## NormalDistribution

The **normal** (Gaussian) distribution with mean `mu` and standard deviation
`sigma > 0`. The second parameter is the standard deviation, not the
variance, as in most computer algebra and statistics systems.

```epsil
pdf(normalDistribution(mu, sigma), x)
// ➔ (sqrt(2) * e^(-((-mu + x)^2) / (2sigma^2))) / (2sigma * sqrt(pi))
```

### MathJSON

`["NormalDistribution", mean, standardDeviation]`.

## BinomialDistribution

The number of successes in `n ≥ 0` independent trials, each succeeding with
probability `0 ≤ p ≤ 1`.

### MathJSON

`["BinomialDistribution", n, p]`.

## PoissonDistribution

The number of events in a fixed interval, when events occur independently at
a mean rate `lambda > 0`.

### MathJSON

`["PoissonDistribution", lambda]`.

## UniformDistribution

The continuous uniform distribution on `[a, b]`, with `a < b`.
`uniformDistribution([a, b])` is `uniformDistribution(a, b)`, and
`uniformDistribution()` is on `[0, 1]`.

```epsil
[mean(uniformDistribution([2, 4])), variance(uniformDistribution())]
// ➔ [3,1/12]
```

### MathJSON

`["UniformDistribution", a, b]`, `["UniformDistribution", ["List", a, b]]`,
`["UniformDistribution"]`.

## ExponentialDistribution

The waiting time between events that occur at a mean rate `lambda > 0`. This
is the rate parameterization: the mean is `1/lambda`.

```epsil
mean(exponentialDistribution(lambda))
// ➔ 1 / lambda
```

### MathJSON

`["ExponentialDistribution", lambda]`.

## PDF

The **probability density function** of the distribution at `x`. For a
discrete distribution, it is the **probability mass function**, which is `0`
at a point that is not an integer. With a symbolic `x`, the result is the
formula of the density.

```epsil
[pdf(binomialDistribution(4, 1/2), 2), pdf(binomialDistribution(4, 1/2), 2.5)]
// ➔ [3/8,0]
```

### MathJSON

`["PDF", distribution, x]`.

## CDF

The **cumulative distribution function**: the probability that a value is at
most `x`. The result is exact: a normal CDF is written with `erf`, and a
discrete one with the regularized incomplete gamma or beta function. Use `N`
for a numeric value.

```epsil
N(cdf(normalDistribution(0, 1), 1))
// ➔ 0.841344746068542948585
```

### MathJSON

`["CDF", distribution, x]`.

## Quantile

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

### MathJSON

`["Quantile", distribution, p]`, `["Quantile", collection, p]`.

```json example
["Quantile", ["PoissonDistribution", 9], 0.95]
```

## Erf

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

### MathJSON

`["Erf", z]` and `["Erf", z0, z1]`.

```json example
["N", ["Erf", 0.1, 0.5]]
// ➔ 0.408036961794761645479
```

## Erfc

$\operatorname{erfc} z = 1 - \operatorname{erf} z$, for a complex `z`.

```epsil
[erfc(0), N(erfc(1)), 1 - N(erf(1))]
// ➔ [1,0.157299207050285130659,0.157299207050285130659]
```

### MathJSON

`["Erfc", z]`.

```json example
["N", ["Erfc", 1]]
// ➔ 0.157299207050285130659
```

## ErfInv

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

### MathJSON

`["ErfInv", x]` and `["ErfInv", z0, z]`.

```json example
["N", ["ErfInv", 0.5, 0.2]]
// ➔ 0.764695648017466677088
```

## GammaRegularized

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
// ➔ Which(k < 0, 0, "True", GammaRegularized(floor(k) + 1, lambda))
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

### MathJSON

`["GammaRegularized", a, z]` and `["GammaRegularized", a, z0, z1]`.

```json example
["N", ["GammaRegularized", 3, 5]]
// ➔ 0.124652019483081141288
```

## BetaRegularized

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

### MathJSON

`["BetaRegularized", x, a, b]` and `["BetaRegularized", z0, z1, a, b]`.

```json example
["N", ["BetaRegularized", 0.5, 2, 3]]
// ➔ 0.6875

["BetaRegularized", ["Rational", 1, 2], 2, 3]
// ➔ ["Rational", 11, 16]
```
