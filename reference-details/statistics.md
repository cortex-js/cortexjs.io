<!-- The detail of the entries of /reference/statistics/. Format: README.md. -->

## RandomSample

Unlike `randomChoice`, the count may not be more than the size of the
collection: there are only that many positions to draw. A count equal to the
size gives a permutation.

```epsil
randomSample([1, 2, 3], 4)
// ➔ error: Runtime error: out of range: a count in 0..3, 4
randomSample([1, 1, 2], 2) in [[1, 1], [1, 2], [2, 1]]
// ➔ "True"
```

### MathJSON

`["RandomSample", xs, k]`.
