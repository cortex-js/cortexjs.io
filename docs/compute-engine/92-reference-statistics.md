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
### Quantile
</nav>
<FunctionDefinition name="Quantile">

<Signature name="Quantile">_collection_, _q:number_</Signature>

Evaluate to the **quantile** of a _collection_ of numbers.

The quantile is a value that divides a _collection_ of numbers into equal-sized
groups. The quantile is a generalization of the median, which divides a
_collection_ of numbers into two equal-sized groups.

So, $$\operatorname{median} = \operatorname{quantile}(0.5)$$.

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

Evaluate to the **interquartile range** (IRQ) of a _collection_ of numbers.

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
// [2, 2, 5]
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
// [2, 2, 5]
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


<ReadMore path="/compute-engine/reference/special-functions/" > See also Special Functions for
the <strong>Error Functions</strong> </ReadMore>
