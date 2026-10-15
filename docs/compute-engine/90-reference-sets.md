---
title: Sets
slug: /compute-engine/reference/sets/
---

<Intro>
A **set** is a collection of distinct elements.
</Intro>

The Compute Engine standard library includes definitions for common numeric sets. Checking if a value belongs to a set is done using the `Element` expression, or the $\in$ (`\in`) command in LaTeX.

```js
ce.expr(['Element', 3.14, 'NegativeIntegers']).evaluate().print();
// ➔ False

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```

`Element` and `NotElement` can also be used with a **type name** on the right
hand side (e.g. `integer`, `real`, `complex`, `number`, `any`), in which
case the check is done against the expression type.

```js
ce.declare('x', 'real');
ce.expr(['Element', 'x', 'real']).evaluate().print();
// ➔ True

ce.expr(['Element', 'x', 'integer']).evaluate().print();
// ➔ False
```

Every bare numeric type name — `integer`, `rational`, `real`, `complex` — denotes
a **finite** value. So a type-name membership test agrees with the set constant of
the same name: neither `real` nor `RealNumbers` admits $\pm\infty$. To include the
infinities, use an extended set (`ExtendedRealNumbers`) or the type `number`,
which covers the finite numbers, the infinities and NaN.

:::info[Deprecated spellings]
The type names `finite_integer`, `finite_rational`, `finite_real`,
`finite_complex` and `finite_number` are **retired**. They are still accepted on
input for one release cycle and normalize to the bare name — `finite_real`
becomes `real`, `finite_number` becomes `complex` — but they are never emitted.
:::

Checking if an element is in a set is equivalent to checking if the type of the
element matches the type associated with the set.

```js
const x = ce.expr(42);

x.type;
// ➔ "42"  — the literal type of the number itself

x.type.matches("integer");
// ➔ true

x.isInteger;
// ➔ true

ce.expr(['Element', x, 'Integers']).evaluate().print();
// ➔ True

ce.parse("42 \\in \\Z").evaluate().print();
// ➔ True
```


## Constants

The engine writes the number sets with `\mathbb{…}` (`\mathbb{Z}`,
`\mathbb{R}_{>0}`). The short commands `\Z`, `\R`, `\Q`, `\C` and `\N`, which
MathLive defines, are read as the same sets.

<div className="symbols-table first-column-header" style={{"--first-col-width":"22ch"}}>

| Symbol     | Notation                                 | &nbsp; | Definition |
| :--------- | :--------------------------------------- | :--------- | :--------- |
| `EmptySet` | `\varnothing` or `\emptyset`| $$ \varnothing $$ or $$ \emptyset $$ | A set that has no elements           |
| `Numbers`               | `\mathrm{Numbers}` | $$ \mathrm{Numbers} $$ | Any number — real, imaginary or complex — together with $$+\infty$$, $$-\infty$$, $$\tilde\infty$$ and $$\mathrm{NaN}$$. It corresponds to the type `number` |
| `ComplexNumbers`        | `\mathbb{C}` | $$ \mathbb{C} $$ | Real or imaginary numbers (does not include the infinities or $$\mathrm{NaN}$$) |
| `ExtendedComplexNumbers`        | `\overline\C` | $$ \overline\C $$ | Real or imaginary numbers, including $$+\infty$$, $$-\infty$$ and $$\tilde\infty$$ |
| `ImaginaryNumbers`           | `\imaginaryI\R` | $$ \imaginaryI\R $$ | Complex numbers with a non-zero imaginary part and no real part |
| `RealNumbers`           | `\mathbb{R}` | $$ \mathbb{R} $$ | Numbers that form the unique Dedekind-complete ordered field $$ \left( \mathbb{R} ; + ; \cdot ; \lt \right) $$, up to an isomorphism (does not include $\pm\infty$) |
| `ExtendedRealNumbers`           | `\overline\R` | $$ \overline\R $$ | Real numbers extended to include $\pm\infty$ |
| `Integers`              | `\mathbb{Z}` | $$ \mathbb{Z}$$  | Whole numbers and their additive inverse $$\lbrace \ldots -3, -2, -1,0, 1, 2, 3\ldots\rbrace$$                                       |
| `ExtendedIntegers`              | `\overline\Z` | $$ \overline\Z$$  | Integers extended to include $\pm\infty$ |
| `RationalNumbers`       | `\mathbb{Q}` | $$ \mathbb{Q} $$  | Numbers which can be expressed as the quotient $$ \nicefrac{p}{q}$$ of two integers $$p, q \in \mathbb{Z}$$.                                  |
| `ExtendedRationalNumbers`              | `\overline\Q` | $$ \overline\Q$$  | Rational numbers extended to include $\pm\infty$ |
| `NegativeNumbers`       | `\mathbb{R}_{<0}` | $$ \mathbb{R}_{<0} $$       | Real numbers $$ \lt 0 $$ |
| `NonPositiveNumbers`    | `\mathbb{R}_{\le0}` | $$ \mathbb{R}_{\le0} $$    | Real numbers $$ \leq 0 $$ |
| `NonNegativeNumbers`    | `\mathbb{R}_{\geq0}` | $$ \mathbb{R}_{\geq0} $$    | Real numbers $$ \geq 0 $$ |
| `PositiveNumbers`       | `\mathbb{R}_{>0}` | $$ \mathbb{R}_{>0} $$     | Real numbers $$ \gt 0$$ |
| `NegativeIntegers`      | `\mathbb{Z}_{<0}` | $$ \mathbb{Z}_{<0} $$       | Integers $$ \lt 0$$, $$\lbrace \ldots -3, -2, -1\rbrace$$                                                                          |
| `NonPositiveIntegers`   | `\mathbb{Z}_{\le0}` | $$ \mathbb{Z}_{\le0} $$    | Integers $$ \leq 0 $$, $$\lbrace \ldots -3, -2, -1, 0\rbrace$$                                                                     |
| `NonNegativeIntegers`   | `\mathbb{N}` | $$ \mathbb{N} $$    | Integers $$ \geq 0 $$, $$\lbrace 0, 1, 2, 3\ldots\rbrace$$                                                                         |
| `PositiveIntegers`      | `\mathbb{N}^*` | $$ \mathbb{N}^* $$     | Integers $$ \gt 0 $$, $$\lbrace 1, 2, 3\ldots\rbrace$$                                                                             |

</div>

The terse commands `\N`, `\Z`, `\Q`, `\R` and `\C` are shorthands for
`\mathbb{N}`, `\mathbb{Z}`, `\mathbb{Q}`, `\mathbb{R}` and `\mathbb{C}`, and
the Unicode double-struck letters `ℕ`, `ℤ`, `ℚ`, `ℝ` and `ℂ` are read the same
way. A sign superscript on any of these spellings names the signed set:
`\mathbb{Z}^+` and `ℤ^-` are `PositiveIntegers` and `NegativeIntegers`.

`Union` and `Intersection` accept any finite collections, including lists. The
result is a `Set`, so duplicate elements are removed:

```json example
["Intersection", ["List", 1, 2], ["List", 2, 3]]
// ➔ ["Set", 2]
```

A MathJSON `List` is always a collection here, including when it has two
elements. Interval notation is interpreted as an `Interval` while parsing
LaTeX, before the set operation is constructed.

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

The number of elements of a set is its
[`Count`](/compute-engine/reference/collections/#Count). In LaTeX it is
written $$|\operatorname{A}|$$, `\#A` or `\operatorname{card}(A)`:
`ce.parse('|\\{1,2\\}|').evaluate()` is `2`, `|\emptyset|` is `0` and
`|\mathbb{Z}|` is `PositiveInfinity`. `Count` of a set serializes back as
$$|\operatorname{A}|$$.

## Ring Constructions

The two standard notations for building a new ring from an existing one are
recognized on the blackboard-bold ring and field constants — $$\Z$$, $$\Q$$,
$$\R$$ and $$\C$$.

<div className="symbols-table first-column-header" style={{"--first-col-width":"19ch"}}>

| Function       | Notation                                    | &nbsp;                                                                        |
| :------------- | :------------------------------------------ | :---------------------------------------------------------------------------- |
| `Adjoin`       | $$ \Z[\sqrt{2}] $$                          | The ring $$\Z$$ with $$\sqrt{2}$$ adjoined                                     |
| `QuotientRing` | $$ \Z_n $$ or $$ \Z/n\Z $$                  | The quotient of $$\Z$$ by the ideal generated by $$n$$, i.e. the integers modulo $$n$$ |

</div>

**Adjunction** accepts one or more adjuncts, and reads an undeclared symbol as
an indeterminate, i.e. a polynomial ring:

```js
ce.parse("\\Z[\\sqrt{2}]");
// ➔ ["Adjoin", "Integers", ["Sqrt", 2]]

ce.parse("\\Z[\\sqrt{2},\\sqrt{3}]");
// ➔ ["Adjoin", "Integers", ["Sqrt", 2], ["Sqrt", 3]]

ce.parse("\\Z[i]");   // the Gaussian integers
// ➔ ["Adjoin", "Integers", ["Complex", 0, 1]]

ce.parse("\\Z[x]");   // polynomials in x with integer coefficients
// ➔ ["Adjoin", "Integers", "x"]
```

Field adjunction written with **parentheses** — $$\Q(\sqrt{2})$$ — is not
parsed: parentheses following a symbol are read as multiplication or function
application everywhere else in the grammar. Use the bracket form.

**Quotients** can be written with a subscript or in the longer ideal notation.
Both parse to the same expression, which serializes back to the subscript form:

```js
ce.parse("\\Z_n");
// ➔ ["QuotientRing", "Integers", "n"]

ce.parse("\\Z/n\\Z");
// ➔ ["QuotientRing", "Integers", "n"]

ce.box(["QuotientRing", "Integers", 12]).latex;
// ➔ "\Z_{12}"
```

:::warning
$$\Z_p$$ is read as the integers **modulo** $$p$$, that is $$\Z/p\Z$$. Some
texts use the same notation for the ring of $$p$$-adic integers; that reading
is not available. The mod-$$n$$ reading is by far the more common one in the
material this engine parses.
:::

A subscript that marks a **sign restriction** is not a quotient: $$\Z_+$$,
$$\R_-$$ and $$\Z_{\geq 0}$$ still name `PositiveIntegers`, `NegativeNumbers`
and `NonNegativeIntegers`, as before.

`Adjoin` is **inert**: it stays symbolic, and there is no membership test
(`Element`) and no arithmetic in the constructed ring. It does carry a type,
formed by joining the base ring's element type with the types of the adjoined
elements:

```js
ce.parse("\\Z[\\sqrt{2}]").type;   // ➔ set<real>
ce.parse("\\Z[i]").type;           // ➔ set<complex>
ce.parse("\\Z[x]").type;           // ➔ set<unknown>
```

`QuotientRing(Integers, n)` with a positive integer literal `n` is a finite
collection of the `n` residue classes `ResidueClass(0, n)` …
`ResidueClass(n−1, n)` (see
[`ResidueClass`](/compute-engine/reference/number-theory/#ResidueClass) for
the arithmetic of the classes). Its type is `set<value>`. An integer is not an
element of the ring: the elements are the classes.

```js
ce.parse("\\operatorname{Count}(\\mathbb{Z}/5\\mathbb{Z})").evaluate();
// ➔ 5

ce.box(["Element", ["ResidueClass", 7, 5], ["QuotientRing", "Integers", 5]]).evaluate();
// ➔ True

ce.box(["Element", 7, ["QuotientRing", "Integers", 5]]).evaluate();
// ➔ False

ce.box(["ListFrom", ["QuotientRing", "Integers", 3]]).evaluate();
// ➔ ["List", ["ResidueClass", 0, 3], ["ResidueClass", 1, 3], ["ResidueClass", 2, 3]]

ce.parse("\\Z_n").type;            // ➔ set<value>
```

With a symbolic, zero or negative modulus, or a base other than `Integers`,
the quotient ring stays symbolic, with no count and no membership test.

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

## Intervals

An **interval** is a set of real numbers that contains all numbers between two endpoints. Intervals can be open (excluding endpoints), closed (including endpoints), or half-open (including one endpoint but not the other).

### Interval Notation

The Compute Engine supports both American and ISO/European interval notation:

<div className="symbols-table first-column-header" style={{"--first-col-width":"16ch"}}>

| Notation | LaTeX | MathJSON | Description |
| :------- | :---- | :------- | :---------- |
| $[a, b]$ | `[a, b]` | `["Interval", a, b]` | Closed interval (both endpoints included) |
| $(a, b)$ | `(a, b)` | `["Interval", ["Open", a], ["Open", b]]` | Open interval (both endpoints excluded) |
| $[a, b)$ | `[a, b)` | `["Interval", a, ["Open", b]]` | Half-open (closed-open) |
| $(a, b]$ | `(a, b]` | `["Interval", ["Open", a], b]` | Half-open (open-closed) |
| $]a, b[$ | `]a, b[` | `["Interval", ["Open", a], ["Open", b]]` | Open interval (ISO notation) |

</div>

The `Open` wrapper indicates that an endpoint is excluded from the interval.

### Delimiter Variants

All interval notations support LaTeX delimiter sizing commands:

- **Explicit bracket commands**: `\lbrack`, `\rbrack`, `\lparen`, `\rparen`
- **Sizing prefixes**: `\left`/`\right`, `\bigl`/`\bigr`, `\Bigl`/`\Bigr`, `\biggl`/`\biggr`, `\Biggl`/`\Biggr`
- **Spacing commands**: `\mathopen`/`\mathclose`

```js
// All of these parse to the same Interval expression:
ce.parse('[3, 4)').json;
ce.parse('\\lbrack 3, 4\\rparen').json;
ce.parse('\\left[ 3, 4 \\right)').json;
ce.parse('\\bigl[ 3, 4 \\bigr)').json;
ce.parse('\\mathopen\\lbrack 3, 4\\mathclose\\rparen').json;
// → ["Interval", 3, ["Open", 4]]
```

```js
ce.parse('[0, 1)').json;
// ➔ ["Interval", 0, ["Open", 1]]

ce.parse('(-\\infty, 0]').json;
// ➔ ["Interval", ["Open", ["Negate", "PositiveInfinity"]], 0]
```

### Infinite Endpoints

An interval is a set of **real** numbers, and the reals are finite. An infinite
endpoint therefore describes how far the interval *extends* — it is never one of
its members, whether it is written open or closed:

```js
ce.expr(['Contains', ['Interval', 0, 'PositiveInfinity'], 'PositiveInfinity']).evaluate().print();
// ➔ False

ce.expr(['Contains', ['Interval', 0, 'PositiveInfinity'], 1000000]).evaluate().print();
// ➔ True

ce.parse('-\\infty \\in (-\\infty, 0]').evaluate().print();
// ➔ False
```

To talk about a set that does contain $\pm\infty$, use one of the extended set
constants (`ExtendedRealNumbers`, `ExtendedIntegers`, `ExtendedRationalNumbers`,
`ExtendedComplexNumbers`) rather than an interval:

```js
ce.expr(['Element', 'PositiveInfinity', 'ExtendedRealNumbers']).evaluate().print();
// ➔ True

ce.expr(['Element', 'PositiveInfinity', 'RealNumbers']).evaluate().print();
// ➔ False
```

### Contextual Interval Parsing

When bracket notation appears in a set context (such as with `\in`, `\cup`, `\cap`, `\subset`, etc.), the Compute Engine automatically interprets it as an interval:

```js
// In set context: [0, 1] becomes an Interval
ce.parse('x \\in [0, 1]').json;
// ➔ ["Element", "x", ["Interval", 0, 1]]

ce.parse('[0, 1] \\cup [2, 3]').json;
// ➔ ["Union", ["Interval", 0, 1], ["Interval", 2, 3]]

// Standalone: [0, 1] remains a List for backward compatibility
ce.parse('[0, 1]').json;
// ➔ ["List", 0, 1]
```

### Interval Serialization

An interval is always serialized so that it reads back as an `Interval`. Which
spelling is used depends on the position it appears in.

**In a set position** — the right side of `\in`/`\notin`, either side of `\cup`,
`\cap`, `\setminus`, `\subset`, `\subseteq`, `\supset`, `\supseteq` — the
conventional bracket notation is used, because the operator forces the set
reading when the LaTeX is parsed back (see **Contextual Interval Parsing**
above):

```js
ce.expr(['Element', 'x', ['Interval', 0, 1]]).latex;
// ➔ "x\\in\\lbrack0, 1\\rbrack"

ce.expr(['Union', ['Interval', 0, 1], ['Interval', 2, 3]]).latex;
// ➔ "\\lbrack0, 1\\rbrack\\cup\\lbrack2, 3\\rbrack"
```

**Anywhere else** nothing disambiguates the interval, so the serialization has
to stand on its own. Half-open intervals use American notation and an open
interval uses the ISO reversed brackets; both are unambiguous:

```js
ce.expr(['Interval', 0, ['Open', 1]]).latex;
// ➔ "\\lbrack0, 1\\rparen"

ce.expr(['Interval', ['Open', 0], ['Open', 1]]).latex;
// ➔ "\\rbrack0, 1\\lbrack"
```

A **closed** interval has no unambiguous bracket spelling — `[a, b]` is also how
a two-element list is written, and that is how the parser reads it — so it uses
the function form:

```js
ce.expr(['Interval', 0, 1]).latex;
// ➔ "\\mathrm{Interval}(0, 1)"

ce.parse('\\mathrm{Interval}(0, 1)').json;
// ➔ ["Interval", 0, 1]
```

This matters wherever the list reading would also be valid. For example
`["RandomChoice", ["Interval", 0, 1], n]` draws `n` uniform reals, while
`["RandomChoice", ["List", 0, 1], n]` picks `n` times between the two *values*
`0` and `1` — both produce a list of numbers in range, so a lossy round-trip
would be undetectable downstream.
