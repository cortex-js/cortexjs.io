<!-- The detail of the entries of /reference/relop/. Format: README.md. -->

## Section: Order and absent values

An ordered comparison (`<`, `<=`, `>`, `>=`) with an operand that has no
order is `False`: `NaN`, a pole such as `1/0` (complex infinity), and a
complex number that is not real. So an `if` whose condition compares such a
value takes its other branch. `!=` is not affected, and a comparison with a
free symbol stays unevaluated. The signed infinities are ordered as usual.

```epsil
1/0 > 0
// ➔ "False"
if 1/0 > 0 { 1 } else { 0 }
// ➔ 0
i > 0
// ➔ "False"
1/0 != 0
// ➔ "True"
0 < oo
// ➔ "True"
x > 0
// ➔ 0 < x
```

A comparison with `missing` is read as with `NaN`: an ordered comparison is
`False`, and `!=` is `True`. A comparison of two lists with a `missing`
element is `False`. Any other function of `missing` gives `missing`, and
`sum`, `product`, `max` and `mean` of a list with a `missing` element are
`missing`. Read an absent value with `isMissing` or `Coalesce` before you
compute with it: see [Absent values](/reference/core/#absent-values).

```epsil
[missing < 0, missing != 0, [1, missing] == [1, missing]]
// ➔ ["False","True","False"]
[sum([1, missing]), max([1, missing]), mean([1, missing])]
// ➔ ["Missing","Missing","Missing"]
```

The three kinds of equality, `===` (the same expression), `==` (the same
value) and identical equality (the same value for every value of the free
variables), are compared in
[Comparing expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions).

## Congruent

`congruent(a, b, m)` is `True` when `a` and `b` are congruent modulo `m`.

```epsil
congruent(26, 11, 5)
// ➔ "True"
```

### MathJSON

`["Congruent", a, b, modulus]`. In LaTeX: `26 \equiv 11 \pmod{5}`.

```json example
["Congruent", 26, 11, 5]
// ➔ True
```
