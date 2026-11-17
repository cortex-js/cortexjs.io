<!-- The detail of the entries of /reference/linear-algebra/. Format: README.md. -->

## Fill

The value is evaluated once, so `fill(random(), 3)` holds three copies of one
number. A function value is an element and is not called; to compute each
element from its indexes, use [`tabulate`](/reference/collections/#tabulate).

```epsil
fill(x => x, 2)
// ➔ [(x) => x,(x) => x]
```

An extent of 0 or less gives an empty axis, and a symbolic extent leaves the
expression unevaluated:

```epsil
fill(7, 2, 0)
// ➔ [[],[]]
fill(7, n)
// ➔ Fill(7, n)
```

A tensor with more than 10,000 elements is a lazy collection: its elements are
not created before they are read.

```epsil
fill(0, 200, 200)
// ➔ Repeat(Repeat(0, 200), 200)
```

[`zeros`](/reference/linear-algebra/#zeros) and
[`ones`](/reference/linear-algebra/#ones) are `fill` with the value 0 or 1.

Up to version 0.184.0, `fill(f, (m, n))` built an `m × n` matrix of
`f(i, j)`. That form is now an error: write `tabulate(f, m, n)`.

```epsil
fill((i, j) => i + j, (2, 3))
// ➔ error: Type error: expected `integer`, got `tuple<integer, integer>` at `(2, 3)` in `fill(Function(i + j, i, j), (2, 3))`
```

### MathJSON

`["Fill", value, d1, d2, ...]`.

```json example
["Fill", 7, 3]
// ➔ ["List", 7, 7, 7]

["Fill", 7, 2, 3]
// ➔ ["List", ["List", 7, 7, 7], ["List", 7, 7, 7]]
```
