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

<FunctionDefinition name="Mode">

<Signature name="Mode">_collection_</Signature>

Evaluate to the **mode** of a _collection_ of numbers.

The mode is the value that appears most often in a list of numbers. A list of
numbers can have more than one mode. If there are two modes, the list is called
**bimodal**. For example $$ \lbrack 2, 5, 5, 3, 2\rbrack$$. If there are three
modes, the list is called **trimodal**. If there are more than three modes, the
list is called **multimodal**.

</FunctionDefinition>

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

<FunctionDefinition name="Quantile">

<Signature name="Quantile">_collection_, _q:number_</Signature>

Evaluate to the **quantile** of a _collection_ of numbers.

The quantile is a value that divides a _collection_ of numbers into equal-sized
groups. The quantile is a generalization of the median, which divides a
_collection_ of numbers into two equal-sized groups.

So, $$\operatorname{median} = \operatorname{quantile}(0.5)$$.

</FunctionDefinition>

<FunctionDefinition name="Quartiles">

<Signature name="Quartiles">_collection_</Signature>

Evaluate to the **quartiles** of a _collection_ of numbers.

The quartiles are the three points that divide a _collection_ of numbers into
four equal groups, each group comprising a quarter of the _collection_.

</FunctionDefinition>

<FunctionDefinition name="InterquartileRange">

<Signature name="InterquartileRange">_collection_</Signature>

Evaluate to the **interquartile range** (IRQ) of a _collection_ of numbers.

The interquartile range is the difference between the third quartile and the
first quartile.

</FunctionDefinition>

<FunctionDefinition name="Sum">

<Signature name="Sum">_collection_</Signature>

Evaluate to a sum of all the elements in _collection_. If all the elements are
numbers, the result is a number. Otherwise it is a simplified _collection_.

<Latex value="\sum x_{i}"/>

```json example
["Sum", ["List", 5, 7, 11]]
// ➔ 23
```

<Signature name="Sum">_body_, _bounds_</Signature>

Return the sum of `body`for each value in `bounds`.

<Latex value="\sum{i=1}^{n} f(i)"/>

```json example
["Sum", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 65
```

</FunctionDefinition>

<FunctionDefinition name="Product">

<Signature name="Product">_collection_</Signature>

Evaluate to a product of all the elements in `collection`.

If all the elements are numbers, the result is a number. Otherwise it is a
simplified _collection_.

<Latex value="\prod x_{i}"/>

```json example
["Product", ["List", 5, 7, 11]]
// ➔ 385

["Product", ["List", 5, "x", 11]]
// ➔ ["List", 55, "x"]
```

<Signature name="Product">_body_, _bounds_</Signature>

Return the product of `body`for each value in `bounds`.

<Latex value="\prod_{i=1}^{n} f(i)"/>

```json example
["Product", ["Add", "x", 1], ["Tuple", 1, 10, "x"]]
// ➔ 39916800
```

</FunctionDefinition>

<FunctionDefinition name="Erf">

<Signature name="Erf">_z:complex_</Signature>

Evaluate to the **error function** of a complex number.

The error function is an odd function ( $$ \operatorname{erf} -z = -
\operatorname{erf} z$$ ) that is used in statistics to calculate probabilities
of normally distributed events.

The formula for the error function of a complex number is:

$$ \operatorname{erf} z = \frac{2}{\sqrt{\pi}} \int_0^z e^{-t^2} dt$$

where $$z$$ is a complex number.

</FunctionDefinition>

<FunctionDefinition name="Erfc">

<Signature name="Erfc">_z:complex_</Signature>

Evaluate to the **complementary error function** of a complex number.

It is defined as $$ \operatorname{erfc} z = 1 - \operatorname {erf} z $$.


</FunctionDefinition>

<FunctionDefinition name="ErfInv">

<Signature name="ErfInv">_x:real_</Signature>

Evaluate to the **inverse error function** of a real number $$ -1 < x < 1 $$

It is defined as $$ \operatorname{erf} \left(\operatorname{erf} ^{-1}x\right)
= x $$.


</FunctionDefinition>

