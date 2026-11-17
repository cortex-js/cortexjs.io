<!-- The detail of the entries of /reference/control-structures/. Format: README.md. -->

## Comprehension

In Epsil, a comprehension is written `[body for x in xs]`. With one clause,
it is `map(x => body, xs)`.

```epsil
[x^2 for x in 1..3]
// ➔ [1,4,9]
```

Several clauses, separated by commas, run as nested loops: the first clause
is the outer loop. A later clause sees the names bound by the earlier ones,
so its collection can depend on them. Independent clauses give the Cartesian
product; dependent clauses give fewer combinations.

```epsil
[(x, y) for x in 1..2, y in 1..2]
// ➔ [(1, 1),(1, 2),(2, 1),(2, 2)]
[(x, y) for x in 1..3, y in 1..x]
// ➔ [(1, 1),(2, 1),(2, 2),(3, 1),(3, 2),(3, 3)]
```

A final `if` keeps only the combinations for which the condition is `True`.

```epsil
[x for x in 1..10 if isPrime(x)]
// ➔ [2,3,5,7]
```

The names bound by the clauses do not leak into the enclosing scope.

```epsil
let x = 5
[x^2 for x in 1..3]
x
// ➔ 5
```

A comprehension is a value, not control flow: `break`, `continue` and
`return` in the body are not caught by the comprehension. To iterate for an
effect instead of a result, use [`Loop`](/reference/control-structures/#loop).

### MathJSON

`["Comprehension", body, ["Element", x, xs], …]`. A clause with a third
operand, `["Element", x, xs, condition]`, keeps only the elements for which
the condition is `True`.

```json example
["Comprehension", ["Square", "x"], ["Element", "x", ["Range", 1, 3]]]
// ➔ ["List", 1, 4, 9]

["Comprehension",
  ["Tuple", "x", "y"],
  ["Element", "x", ["Range", 1, 3]],
  ["Element", "y", ["Range", 1, "x"]]]
// ➔ 6 tuples: (1,1), (2,1), (2,2), (3,1), (3,2), (3,3)
```

In LaTeX, a trailing `\operatorname{for}` (or `\keyword{for}`) produces a
`Comprehension`: `(x, y) \keyword{for} x = [1...3], y = [1...x]`.
