---
title: Sets
slug: /compute-engine/reference/sets/
---

<Intro>
A **set** is a collection of distinct elements.
</Intro>

The Compute Engine standard library includes definitions for common numeric sets. Checking if a value belongs to a set is done using the `Element` expression, or the $\in$ (`\in`) command in LaTeX.

```js
ce.box(['Element', 3.14, 'NegativeIntegers']).evaluate().print();
// ➔ False

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```

Checking if an element is in a set is equivalent to checking if the type of the
element matches the type associated with the set.

```js
const x = ce.box(42);

x.type;
// ➔ "finite_integer"

x.type.matches("integer");
// ➔ true

x.isInteger;
// ➔ true

ce.box(['Element', x, 'Integers']).evaluate().print();
// ➔ True

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```


## Constants

<div className="symbols-table first-column-header" style={{"--first-col-width":"22ch"}}>

| Symbol     | Notation                                 | &nbsp; | Definition |
| :--------- | :--------------------------------------- | :--------- | :--------- |
| `EmptySet` | `\varnothing` or `\emptyset`| $$ \varnothing $$ or $$ \emptyset $$ | A set that has no elements           |
| `Numbers`               | `\mathrm{Numbers}` | $$ \mathrm{Numbers} $$ | Any number, real, imaginary, or complex |
| `ComplexNumbers`        | `\C` | $$ \C $$ | Real or imaginary numbers |
| `ExtendedComplexNumbers`        | `\overline\C` | $$ \overline\C $$ | Real or imaginary numbers, including $$+\infty$$, $$-\infty$$ and $$\tilde\infty$$ |
| `ImaginaryNumbers`           | `\imaginaryI\R` | $$ \imaginaryI\R $$ | Complex numbers with a non-zero imaginary part and no real part |
| `RealNumbers`           | `\R` | $$ \R $$ | Numbers that form the unique Dedekind-complete ordered field $$ \left( \mathbb{R} ; + ; \cdot ; \lt \right) $$, up to an isomorphism (does not include $\pm\infty$) |
| `ExtendedRealNumbers`           | `\overline\R` | $$ \overline\R $$ | Real numbers extended to include $\pm\infty$ |
| `Integers`              | `\Z` | $$ \Z$$  | Whole numbers and their additive inverse $$\lbrace \ldots -3, -2, -1,0, 1, 2, 3\ldots\rbrace$$                                       |
| `ExtendedIntegers`              | `\overline\Z` | $$ \overline\Z$$  | Integers extended to include $\pm\infty$ |
| `RationalNumbers`       | `\Q` | $$ \Q $$  | Numbers which can be expressed as the quotient $$ \nicefrac{p}{q}$$ of two integers $$p, q \in \mathbb{Z}$$.                                  |
| `ExtendedRationalNumbers`              | `\overline\Q` | $$ \overline\Q$$  | Rational numbers extended to include $\pm\infty$ |
| `NegativeNumbers`       | `\R_{<0}` | $$ \R_{<0} $$       | Real numbers $$ \lt 0 $$ |
| `NonPositiveNumbers`    | `\R_{\leq0}` | $$ \R_{\leq0} $$    | Real numbers $$ \leq 0 $$ |
| `NonNegativeNumbers`    | `\R_{\geq0}` | $$ \R_{\geq0} $$    | Real numbers $$ \geq 0 $$ |
| `PositiveNumbers`       | `\R_{>0}` | $$ \R_{>0} $$     | Real numbers $$ \gt 0$$ |
| `NegativeIntegers`      | `\Z_{<0}` | $$ \Z_{<0} $$       | Integers $$ \lt 0$$, $$\lbrace \ldots -3, -2, -1\rbrace$$                                                                          |
| `NonPositiveIntegers`   | `\Z_{\le0}` | $$ \Z_{\le0} $$    | Integers $$ \leq 0 $$, $$\lbrace \ldots -3, -2, -1, 0\rbrace$$                                                                     |
| `NonNegativeIntegers`   | `\N` | $$ \N $$    | Integers $$ \geq 0 $$, $$\lbrace 0, 1, 2, 3\ldots\rbrace$$                                                                         |
| `PositiveIntegers`      | `\N^*` | $$ \N^* $$     | Integers $$ \gt 0 $$, $$\lbrace 1, 2, 3\ldots\rbrace$$                                                                             |

</div>

## Functions

New sets can be defined using one of the following operators.

<div className="symbols-table first-column-header" style={{"--first-col-width":"19ch"}}>

| Function              | Operation                                           |                                                                                                                                                                                                                     |
| :-------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CartesianProduct`    | $$ \operatorname{A} \times \operatorname{B} $$    | A.k.a the product set, the set direct product or cross product. [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                                    |
| `Complement`          | $$ \operatorname{A}^\complement $$                | The set of elements that are not in $$ \operatorname{A} $$. If $$\operatorname{A}$$ is a numeric type, the universe is assumed to be the set of all numbers. [Q242767](https://www.wikidata.org/wiki/Q242767) |
| `Intersection`        | $$ \operatorname{A} \cap \operatorname{B} $$      | The set of elements that are in $$\operatorname{A}$$ and in $$\operatorname{B}$$ [Q185837](https://www.wikidata.org/wiki/Q185837)                                                                               |
| `Union`               | $$ \operatorname{A} \cup \operatorname{B} $$      | The set of elements that are in $$\operatorname{A}$$ or in $$\operatorname{B}$$ [Q173740](https://www.wikidata.org/wiki/Q173740)                                                                                |
| `Set`                 | $$\lbrace 1, 2, 3 \rbrace $$                      | Set builder notation                                                                                                                                                                                                |
| `SetMinus`            | $$ \operatorname{A} \setminus \operatorname{B} $$ | [Q18192442](https://www.wikidata.org/wiki/Q18192442)                                                                                                                                                                |
| `SymmetricDifference` | $$ \operatorname{A} \triangle \operatorname{B} $$ | Disjunctive union = $$ (\operatorname{A} \setminus \operatorname{B}) \cup (\operatorname{B} \setminus \operatorname{A})$$ [Q1147242](https://www.wikidata.org/wiki/Q1147242)                                      |

</div>

## Relations

To check the membership of an element in a set or the relationship between two sets using the following operators.

<div className="symbols-table first-column-header">

| Function        | Notation                                                                                                                                                                 | &nbsp;                                                                                                      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| `Element`       | $$ x \in \operatorname{A} $$                                                                                                                                            | `x \in \operatorname{A}`                                                                                   |
| `NotElement`    | $$ x \not\in \operatorname{A} $$                                                                                                                                        | `x \not\in \operatorname{A}`                                                                               |
| `NotSubset`     | $$ \operatorname{A} \nsubset \operatorname{B} $$                                                                                                                                       | `\operatorname{A} \nsubset \operatorname{B}`                                                                              |
| `NotSuperset`   | $$ \operatorname{A} \nsupset \operatorname{B} $$                                                                                                                                       | `\operatorname{A} \nsupset \operatorname{B}`                                                                              |
| `Subset`        | $$ \operatorname{A} \subset \operatorname{B} $$ <br/> $$ \operatorname{A} \subsetneq \operatorname{B} $$ <br/> $$ \operatorname{A} \varsubsetneqq \operatorname{B} $$ | `\operatorname{A} \subset \operatorname{B}` <br/> `\operatorname{A} \subsetneq \operatorname{B}` <br/> `\operatorname{A} \varsubsetneqq \operatorname{B}` |
| `SubsetEqual`   | $$ \operatorname{A} \subseteq \operatorname{B} $$                                                                                                                       | `\operatorname{A} \subseteq \operatorname{B}`                                                              |
| `Superset`      | $$ \operatorname{A} \supset \operatorname{B} $$<br/> $$ \operatorname{A} \supsetneq \operatorname{B} $$<br/>$$ \operatorname{A} \varsupsetneq \operatorname{B} $$     | `\operatorname{A} \supset \operatorname{B}`<br/> `\operatorname{A} \supsetneq \operatorname{B}`<br/>`\operatorname{A} \varsupsetneq \operatorname{B}` |
| `SupersetEqual` | $$ \operatorname{A} \supseteq \operatorname{B} $$                                                                                                                       | `\operatorname{A} \supseteq \operatorname{B}`                                                              |

</div>
