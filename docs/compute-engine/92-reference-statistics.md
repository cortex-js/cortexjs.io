---
title: Statistics
slug: /compute-engine/reference/statistics/
---

For the following functions, when the input is a _collection_, it can take the
following forms:

- Multiple arguments, e.g. `["Mean", 1, 2, 3]`
- A list of numbers, e.g. `["Mean", ["List", 1, 2, 3]]`
- A matrix, e.g. `["Mean", ["List", ["List", 1, 2], ["List", 3, 4]]]`
- A range, e.g. `["Mean", ["Range", 1, 10]]`
- A linear space: `["Mean", ["Linspace", 1, 5, 10]]`

## Functions


<nav className="hidden">
### Mean
</nav>
<FunctionDefinition name="Mean">

<Signature name="Mean">_collection_</Signature>

<Latex value="\operatorname{mean}(\lbrack3, 5, 7\rbrack)"/>

Evaluate to the **arithmetic mean** of a collection of numbers.

The arithmetic mean is the average of the list of numbers. The mean is
calculated by dividing the sum of the numbers by the number of numbers in the
list.

The formula for the mean of a list of numbers is $$\bar{x} = \frac{1}{n}
\sum\_{i=1}^n x_i$$, where $$n$$ is the number of numbers in the list, and
$$x_i$$ is the $$i$$-th number in the list.

```json example
["Mean", ["List", 7, 8, 3.1, 12, 77]]
// 21.02
```

<Signature name="Mean">_distribution_</Signature>

When the argument is a [probability distribution](#probability-distributions),
evaluate to the mean of the distribution, as a symbolic expression when the
parameters are symbolic.

```json example
["Mean", ["NormalDistribution", "mu", "sigma"]]
// mu
```

</FunctionDefinition>

<nav className="hidden">
### Median
</nav>
<FunctionDefinition name="Median">

<Signature name="Median">_collection_</Signature>

Evaluate to the **median** of a _collection_ of numbers.

The median is the value separating the higher half from the lower half of a data
sample. For a list of numbers sorted in ascending order, the median is the
middle value of the list. If the list has an odd number of elements, the median
is the middle element. If the list has an even number of elements, the median is
the average of the two middle elements.

```json example
["Median", ["List", 1, 2, 3, 4, 5]]
// 3
```

</FunctionDefinition>

<nav className="hidden">
### Mode
</nav>
<FunctionDefinition name="Mode">

<Signature name="Mode">_collection_</Signature>

Evaluate to the **mode** of a _collection_ of numbers.

The mode is the value that appears most often in a list of numbers. A list of
numbers can have more than one mode. If there are two modes, the list is called
**bimodal**. For example $$ \lbrack 2, 5, 5, 3, 2\rbrack$$. If there are three
modes, the list is called **trimodal**. If there are more than three modes, the
list is called **multimodal**.

```json example
["Mode", ["List", 1, 2, 2, 3, 4, 4, 5, 5]]
// 2
```

</FunctionDefinition>

<nav className="hidden">
### Variance
</nav>
<FunctionDefinition name="Variance">

<Signature name="Variance">_collection_</Signature>

Evaluate to the **variance** of a _collection_ of numbers.

The variance is a measure of the amount of variation or dispersion of a set of
values. A low variance indicates that the values tend to be close to the mean of
the set, while a high variance indicates that the values are spread out over a
wider range.

The formula for the variance of a list of numbers is

$$\frac{1}{n} \sum_{i=1}^n(x_i - \mu)^2$$

where $$\mu$$ is the mean of the list.

<Signature name="Variance">_distribution_</Signature>

When the argument is a [probability distribution](#probability-distributions),
evaluate to the variance of the distribution.

```json example
["Variance", ["PoissonDistribution", "lambda"]]
// lambda
```

</FunctionDefinition>

<nav className="hidden">
### PopulationVariance
</nav>
<FunctionDefinition name="PopulationVariance">

<Signature name="PopulationVariance">_collection_</Signature>

Evaluate to the **population variance** of a _collection_ of numbers.

The population variance is the variance calculated by dividing the sum of squared
differences from the mean by the number of elements in the population.

The formula for the population variance is

$$\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2$$

where $$N$$ is the size of the population, and $$\mu$$ is the population mean.

</FunctionDefinition>

<nav className="hidden">
### StandardDeviation
</nav>
<FunctionDefinition name="StandardDeviation">

<Signature name="StandardDeviation">_collection_</Signature>

Evaluate to the **standard deviation** of a _collection_ of numbers.

The standard deviation is a measure of the amount of variation or dispersion of
a set of values. A low standard deviation indicates that the values tend to be
close to the mean of the set, while a high standard deviation indicates that the
values are spread out over a wider range.

The formula for the standard deviation of a _collection_ of numbers is

$$\sqrt{\frac{1}{n} \sum_{i=1}^n (x_i - \mu)^2}$$

where $$\mu$$ is the mean of the list.

<Signature name="StandardDeviation">_distribution_</Signature>

When the argument is a [probability distribution](#probability-distributions),
evaluate to the standard deviation of the distribution.

```json example
["StandardDeviation", ["NormalDistribution", "mu", "sigma"]]
// sigma
```

</FunctionDefinition>

<nav className="hidden">
### PopulationStandardDeviation
</nav>
<FunctionDefinition name="PopulationStandardDeviation">

<Signature name="PopulationStandardDeviation">_collection_</Signature>

Evaluate to the **population standard deviation** of a _collection_ of numbers.

The population standard deviation is the square root of the population variance.

The formula for the population standard deviation is

$$\sqrt{\frac{1}{N} \sum_{i=1}^N (x_i - \mu)^2}$$

where $$N$$ is the size of the population, and $$\mu$$ is the population mean.

</FunctionDefinition>

<nav className="hidden">
### Skewness
</nav>
<FunctionDefinition name="Skewness">

<Signature name="Skewness">_collection_</Signature>

Evaluate to the **skewness** of a list of numbers.

The skewness is a measure of the asymmetry of the distribution of a real-valued
random variable about its mean. The skewness value can be positive or negative,
or undefined.

The formula for the skewness of a _collection_ of numbers is: $$\frac{1}{n}
\sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^3$$

where $$\mu$$ is the mean of the _collection_, and $$\sigma$$ is the
standard deviation of the _collection_.

</FunctionDefinition>

<nav className="hidden">
### Kurtosis
</nav>
<FunctionDefinition name="Kurtosis">

<Signature name="Kurtosis">_collection_</Signature>

Evaluate to the **kurtosis** of a _collection_ of numbers.

The kurtosis is a measure of the "tailedness" of the distribution of a
real-valued random variable. The kurtosis value can be positive or negative, or
undefined.

The formula for the kurtosis of a _collection_ of numbers is

$$ \frac{1}{n} \sum_{i=1}^n \left(\frac{x_i - \mu}{\sigma}\right)^4$$

where $$\mu$$ is the mean of the list, and $$\sigma$$ is the standard
deviation of the list.

</FunctionDefinition>

<nav className="hidden">
### Covariance
</nav>
<FunctionDefinition name="Covariance">

<Signature name="Covariance">_xs:collection_, _ys:collection_</Signature>

<Signature name="Covariance">_points:collection_</Signature>

Evaluate to the **sample covariance** of two data sets: either two
equal-length collections, or a single collection of $$(x, y)$$ pairs.

$$\operatorname{cov}(x, y) = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$$

Exact data gives an exact result.

```json example
["Covariance", ["List", 1, 2, 3, 4, 5], ["List", 2, 4, 5, 4, 5]]
// 3/2
```

</FunctionDefinition>

<nav className="hidden">
### PopulationCovariance
</nav>
<FunctionDefinition name="PopulationCovariance">

<Signature name="PopulationCovariance">_xs:collection_, _ys:collection_</Signature>

<Signature name="PopulationCovariance">_points:collection_</Signature>

Evaluate to the **population covariance** of two data sets: the covariance
with an $$n$$ denominator instead of $$n - 1$$.

$$\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})$$

</FunctionDefinition>

<nav className="hidden">
### Correlation
</nav>
<FunctionDefinition name="Correlation">

<Signature name="Correlation">_xs:collection_, _ys:collection_</Signature>

<Signature name="Correlation">_points:collection_</Signature>

Evaluate to the **Pearson correlation coefficient** of two data sets: a value
between $$-1$$ and $$1$$ measuring the strength of their linear relationship.

$$r = \frac{\operatorname{cov}(x, y)}{\sigma_x \sigma_y}$$

Exact data gives an exact result.

```json example
["Correlation", ["List", 1, 2, 3, 4, 5], ["List", 2, 4, 5, 4, 5]]
// sqrt(15) / 5
```

</FunctionDefinition>

<nav className="hidden">
### LinearRegression
</nav>
<FunctionDefinition name="LinearRegression">

<Signature name="LinearRegression">_xs:collection_, _ys:collection_</Signature>

<Signature name="LinearRegression">_points:collection_</Signature>

<Signature name="LinearRegression">..., _variable:symbol_</Signature>

Evaluate to the **least-squares linear fit** of the data, as the tuple
$$(b_0, b_1)$$ of the intercept and slope of the fitted line
$$y = b_0 + b_1 x$$.

Exact data yields exact coefficients.

```json example
["LinearRegression", ["List", 1, 2, 3, 4, 5], ["List", 2, 4, 5, 4, 5]]
// (11/5, 3/5)
```

With a trailing _variable_ argument, evaluate to the fitted **expression** in
that variable instead, ready to plot alongside the data.

```json example
["LinearRegression", ["List", 1, 2, 3, 4, 5], ["List", 2, 4, 5, 4, 5], "x"]
// 3/5 x + 11/5
```

</FunctionDefinition>

<nav className="hidden">
### PolynomialFit
</nav>
<FunctionDefinition name="PolynomialFit">

<Signature name="PolynomialFit">_xs:collection_, _ys:collection_, _degree:number_</Signature>

<Signature name="PolynomialFit">_points:collection_, _degree:number_</Signature>

<Signature name="PolynomialFit">..., _variable:symbol_</Signature>

Evaluate to the **least-squares polynomial fit** of the data at the given
degree, as the list of coefficients, constant term first.

Exact data yields exact coefficients: points lying exactly on a polynomial
recover it exactly.

```json example
["PolynomialFit",
  ["List", ["List", 0, 1], ["List", 1, 2], ["List", 2, 5], ["List", 3, 10]],
  2]
// [1, 0, 1]     (the polynomial 1 + x²)
```

With a trailing _variable_ argument, evaluate to the fitted expression in
that variable instead.

The degree must satisfy $$\deg \le \min(n - 1, 12)$$ where $$n$$ is the
number of data points.

</FunctionDefinition>

<nav className="hidden">
### Quartiles
</nav>
<FunctionDefinition name="Quartiles">

<Signature name="Quartiles">_collection_</Signature>

Evaluate to the **quartiles** of a _collection_ of numbers.

The quartiles are the three points that divide a _collection_ of numbers into
four equal groups, each group comprising a quarter of the _collection_.

```json example
["Quartiles", ["List", 1, 2, 3, 4, 5, 6, 7, 8]]
// [2.5, 4.5, 6.5]
```

</FunctionDefinition>

<nav className="hidden">
### InterquartileRange
</nav>
<FunctionDefinition name="InterquartileRange">

<Signature name="InterquartileRange">_collection_</Signature>

Evaluate to the **interquartile range** (IQR) of a _collection_ of numbers.

The interquartile range is the difference between the third quartile and the
first quartile.

</FunctionDefinition>

<nav className="hidden">
### Histogram
</nav>
<FunctionDefinition name="Histogram">

<Signature name="Histogram">_collection_, _bins:number_</Signature>

Evaluate to the **histogram** of a _collection_ of numbers.

The histogram groups the data into a specified number of bins and counts the
number of elements in each bin.

```json example
["Histogram", ["List", 1, 2, 2, 3, 4, 5, 5, 5], 3]
// [[1, 3], [2.3333…, 1], [3.6667…, 4]]   (bin start, count)
```

</FunctionDefinition>

<nav className="hidden">
### BinCounts
</nav>
<FunctionDefinition name="BinCounts">

<Signature name="BinCounts">_collection_, _bins:number_</Signature>

Evaluate to the **bin counts** of a _collection_ of numbers.

Bin counts are the counts of the number of elements in each bin for a given
number of bins.

```json example
["BinCounts", ["List", 1, 2, 2, 3, 4, 5, 5, 5], 3]
// [3, 1, 4]
```

</FunctionDefinition>

<nav className="hidden">
### SlidingWindow
</nav>
<FunctionDefinition name="SlidingWindow">

<Signature name="SlidingWindow">_collection_, _windowSize:number_</Signature>

Evaluate to the **sliding windows** of a _collection_ of numbers.

A sliding window is a moving subset of the data of a specified window size.

```json example
["SlidingWindow", ["List", 1, 2, 3, 4, 5], 3]
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
```

</FunctionDefinition>


<nav className="hidden">
### Sample
</nav>
<FunctionDefinition name="Sample">

<Signature name="Sample">_collection_, _size:number_</Signature>

Evaluate to a **random sample** of a specified size from a _collection_ of numbers.

Sampling is done without replacement unless otherwise specified.

</FunctionDefinition>

<nav className="hidden">
### Rank
</nav>
<FunctionDefinition name="Rank">

<Signature name="Rank">_collection_</Signature>

Evaluate to the **rank** of each element in a _collection_ of numbers.

The rank is the position of each element in the sorted order of the collection.

</FunctionDefinition>

<nav className="hidden">
### Argsort
</nav>
<FunctionDefinition name="Argsort">

<Signature name="Argsort">_collection_</Signature>

Evaluate to the **indices that would sort** a _collection_ of numbers.

This returns a list of indices that sorts the collection.

</FunctionDefinition>


## Probability Distributions

A **probability distribution** is a first-class value constructed with one of
the distribution functions below. It can be assigned to a symbol, passed as an
argument, and queried with `PDF`, `CDF`, `Quantile`, `Mean`, `Variance` and
`StandardDeviation`.

These operators evaluate to **exact closed forms**: the result is an ordinary
expression that can be simplified, differentiated, compiled or plotted, and
numeric approximation (`.N()`) works at machine or arbitrary precision.

```json example
["CDF", ["NormalDistribution", 0, 1], "x"]
// 1/2 + Erf(x / sqrt(2)) / 2
```

<nav className="hidden">
### NormalDistribution
</nav>
<FunctionDefinition name="NormalDistribution">

<Signature name="NormalDistribution">_mean_, _standardDeviation_</Signature>

A **normal (Gaussian) distribution** with the given mean $$\mu$$ and standard
deviation $$\sigma > 0$$.

Note that the second parameter is the standard deviation, not the variance,
following the convention of most computer algebra and statistics systems.

</FunctionDefinition>

<nav className="hidden">
### BinomialDistribution
</nav>
<FunctionDefinition name="BinomialDistribution">

<Signature name="BinomialDistribution">_n_, _p_</Signature>

A **binomial distribution**: the number of successes in $$n \ge 0$$ independent
trials, each succeeding with probability $$0 \le p \le 1$$.

</FunctionDefinition>

<nav className="hidden">
### PoissonDistribution
</nav>
<FunctionDefinition name="PoissonDistribution">

<Signature name="PoissonDistribution">_lambda_</Signature>

A **Poisson distribution**: the number of events occurring in a fixed interval
when events occur independently at a mean rate of $$\lambda > 0$$.

</FunctionDefinition>

<nav className="hidden">
### UniformDistribution
</nav>
<FunctionDefinition name="UniformDistribution">

<Signature name="UniformDistribution">_a_, _b_</Signature>

A **continuous uniform distribution** on the interval $$[a, b]$$, with
$$a < b$$.

</FunctionDefinition>

<nav className="hidden">
### ExponentialDistribution
</nav>
<FunctionDefinition name="ExponentialDistribution">

<Signature name="ExponentialDistribution">_lambda_</Signature>

An **exponential distribution**: the waiting time between events occurring at
a mean rate of $$\lambda > 0$$ (the _rate_ parameterization; the mean is
$$1/\lambda$$).

</FunctionDefinition>

<nav className="hidden">
### PDF
</nav>
<FunctionDefinition name="PDF">

<Signature name="PDF">_distribution_, _x_</Signature>

Evaluate to the **probability density function** of _distribution_ at _x_.
For a discrete distribution, this is the **probability mass function**, and it
is `0` at numeric non-integer points.

The result is a closed-form expression: with a symbolic _x_ it is the density
formula itself, ready to plot or integrate.

```json example
["PDF", ["BinomialDistribution", 4, ["Rational", 1, 2]], 2]
// 3/8
```

</FunctionDefinition>

<nav className="hidden">
### CDF
</nav>
<FunctionDefinition name="CDF">

<Signature name="CDF">_distribution_, _x_</Signature>

Evaluate to the **cumulative distribution function** of _distribution_ at _x_:
the probability that a random value is less than or equal to _x_.

The result is exact: a normal CDF is expressed with `Erf`, and discrete CDFs
with `GammaRegularized`/`BetaRegularized`. Use `N()` for a numeric value.

```json example
["N", ["CDF", ["NormalDistribution", 0, 1], 1]]
// 0.8413447460685429
```

</FunctionDefinition>

<nav className="hidden">
### Quantile
</nav>
<FunctionDefinition name="Quantile">

<Signature name="Quantile">_distribution_, _p:number_</Signature>

Evaluate to the **quantile** (inverse CDF) of _distribution_: the smallest
value $$x$$ such that $$\operatorname{CDF}(x) \ge p$$, for $$0 \le p \le 1$$.

`Quantile(dist, 0.5)` is the median of the distribution.

<Signature name="Quantile">_collection_, _p:number_</Signature>

When the first argument is a collection of numbers, evaluate to the
**empirical quantile** of the data, interpolating the sorted values. It is
consistent with `Quartiles` and `Median`: `Quantile(xs, 1/4)`,
`Quantile(xs, 1/2)` and `Quantile(xs, 3/4)` equal the three quartiles, and
$$p = 0$$ and $$p = 1$$ give the minimum and maximum.

```json example
["Quantile", ["PoissonDistribution", 9], 0.95]
// 14
```

For continuous distributions the result is a closed form
(`Quantile(NormalDistribution(mu, sigma), p)` is
$$\mu + \sigma\sqrt2\operatorname{erf}^{-1}(2p-1)$$); for discrete
distributions it is computed by exact search when `p` is numeric.

</FunctionDefinition>

<ReadMore path="/compute-engine/reference/special-functions/" > See also Special Functions for
the <strong>Error Functions</strong> and the <strong>regularized incomplete
gamma and beta functions</strong> </ReadMore>
