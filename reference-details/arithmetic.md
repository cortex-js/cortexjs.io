<!--
Detail of the entries of the Arithmetic library reference on epsil.dev
(/reference/arithmetic/). scripts/sync-epsil-docs.mjs splices each section
into the generated page, after the entry of the same MathJSON name:

- `## <MathJSON name>` starts a section.
- The text before `### MathJSON` is shown under the entry. Write it in Epsil
  terms; subsections are `####` headings.
- The text after `### MathJSON` goes in the entry's closed MathJSON
  disclosure, after the LaTeX commands. No headings there.

Run every `epsil` example against the engine before writing its `// ➔`
result.
-->

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
