<!-- The detail of the entries of /reference/core/. Format: README.md. -->

## Section: Random numbers

The random functions take a **domain** to draw from, never a seed. To make
the draws reproducible, wrap the work in `withRandomSeed`, which makes every
draw inside it replay identically.

| Replacement | one draw | `k` draws |
| :-- | :-- | :-- |
| with replacement | `random(xs)` | `randomChoice(xs, k)` |
| without replacement | `random(xs)` | `randomSample(xs, k)` |
| all of them | | `randomShuffle(xs)` |

`random(xs)` and `randomChoice(xs, 1)` have the same distribution: with a
single draw, with and without replacement coincide. `randomChoice` returns a
list.

The generator, the seed folding, the agreement of interpreted, compiled and
GPU code, and the number of draws each function consumes are specified in the
[Randomness Model](https://github.com/cortex-js/compute-engine/blob/main/docs/RANDOMNESS-MODEL.md)
note.

### Migrating from the previous random operators

`RandomInteger`, `RandomList`, `RandomSeed`, `Sample` and `Shuffle` have been
removed, along with the `ce.randomSeed` property of the JavaScript API and
every `seed` argument. Each removed name gives an `operator-removed` error that
names its replacement, so a stored document fails visibly rather than
silently stopping to randomize.

| Was | Now |
| :-- | :-- |
| `Random(seed)` | `withRandomSeed(seed, random())` |
| `Random(n)`, `n > 0` | `random(0..n-1)` |
| `Random(m, n)`, `m < n` | `random(m..n-1)` |
| `RandomInteger(a, b)` | `random(a..b)` |
| `RandomList(n)` | `randomChoice(interval(0, 1), n)` |
| `RandomList(n, seed)` | `withRandomSeed(seed, randomChoice(interval(0, 1), n))` |
| `RandomSeed(s)` | `withRandomSeed(s, …)` around the work |
| `Sample(xs, k)` | `randomSample(xs, k)` |
| `Shuffle(xs)` | `randomShuffle(xs)` |
| `Shuffle(xs, seed)` | `withRandomSeed(seed, randomShuffle(xs))` |
| `ce.randomSeed = s` | `withRandomSeed(s, …)` |

Note the `-1` of the `Random(n)` and `Random(m, n)` rows: the old upper bound
was excluded, and a range includes both ends. The rows hold only in the
stated cases. Rewrite the other old calls (`n ≤ 0`, `m ≥ n`) by hand, because
a range with reversed bounds is a descending range, not an empty one.

## WithRandomSeed

The seed must be a finite real number or a string. An infinite or undefined
seed is an `out-of-range` error. The seed is evaluated once, when the block
starts.

```epsil
[withRandomSeed(42, random()), withRandomSeed(42, random())]
// ➔ [0.7367300395263549,0.7367300395263549]
withRandomSeed(42, [random(), random()])
// ➔ [0.7367300395263549,0.4498528692283148]
withRandomSeed(oo, random())
// ➔ error: Runtime error: out of range: a finite real number or a string, +oo
```

Blocks nest, and the innermost wins. Each block counts its own draws, so a
nested block does not change the later draws of the block around it: below,
the first and third values are the first two values of the block seeded with
`1`.

```epsil
withRandomSeed(1, [random(), withRandomSeed(2, random()), random()])
// ➔ [0.9834569781146947,0.43120335189750414,0.20647662186831073]
```

Seed a row or a cell, not a whole document: with one block around a whole
document, a draw added near the top changes every value below it.

**A block around a lazy collection does not make it replay.** Only evaluation
draws, and a lazy collection is not evaluated until its elements are read.
By then the block has ended, so the draws are not seeded. The expression
looks seeded, and nothing reports the problem. Make the list inside the
block, with `listFrom`, and it replays:

```epsil
let a = withRandomSeed(3, [random() for k in 1..3])
let b = withRandomSeed(3, [random() for k in 1..3])
a[1] == b[1]
// ➔ "False"
let a = withRandomSeed(3, listFrom([random() for k in 1..3]))
let b = withRandomSeed(3, listFrom([random() for k in 1..3]))
a[1] == b[1]
// ➔ "True"
```

Reading the elements of the same lazy collection twice gives the same values:
the elements of one collection are cached. That is consistent reading, not
replay: the values are unseeded draws, and a new collection draws new ones.

`repeat(random(), n)` is evaluated at once and replays, but it draws
**once**, and gives `n` copies of one value. For `n` draws, use
`randomChoice(interval(0, 1), n)`.

```epsil
let r = repeat(random(), 3)
r[1] == r[2]
// ➔ "True"
```

### MathJSON

`["WithRandomSeed", seed, body]`. A string seed is a MathJSON string,
`"'cell-a7'"`.

```json example
["WithRandomSeed", 42, ["Random"]]
// ➔ 0.7367300395263549
["WithRandomSeed", "PositiveInfinity", ["Random"]]
// ➔ ["Error", ["ErrorCode", "'out-of-range'", "'a finite real number or a string'", "'+oo'"]]
```

## Random

`random` is not a pure function: it has the `random` effect, and it gives a
different value each time it is evaluated. Inside `withRandomSeed`, the block
as a whole is pure and replays.

- `random()` is a real number in `[0, 1)`.
- `random(interval(a, b))` is a real number in `[a, b)`. Open and closed
  ends are ignored: a floating-point draw cannot respect an open end.
- `random(m..n)` is an element of the range, which includes both ends. A
  range with reversed bounds descends.
- `random(xs)` is an element of the finite collection `xs`. The domain is not
  built: `random(1..1000000)` picks an index of the range.

`random` draws along the **first axis** of a nested collection, so
`random([[1, 2], [3, 4]])` is a row. A tuple is a finite indexed collection,
and `random` gives one of its elements. An unbounded or empty interval, an
infinite range or collection, and an empty collection are errors.

```epsil
random([])
// ➔ error: Runtime error: out of range: a non-empty collection, []
random([[1, 2], [3, 4]])
random(interval(-1, 1))
random([5, 2, 10, 18])
```

### MathJSON

`["Random"]`, `["Random", domain]`.

```json example
["Random", ["Range", 1, 6]]
// ➔ 4 (for example), a die roll
["Random", ["Interval", -1, 1]]
// ➔ -0.318… (for example)
```

## RandomChoice

The count `k` is a `number`, not an `integer`, so a computed count need not
be rounded first: it is rounded half toward `+oo` (`2.5` gives `3`, `-2.5`
gives `-2`). A negative or out-of-range count is an error, and `0` gives the
empty list. Only the `k` drawn elements are built, not the domain, so
`randomChoice(1..1000000000, 5)` is cheap.

```epsil
[randomChoice(1..6, 0), length(randomChoice(1..6, 2.5))]
// ➔ [[],3]
withRandomSeed(7, randomChoice(interval(0, 1), 4))
// ➔ [0.08483070468009213,0.19562714896013578,0.24148300073452322,0.750274109006007]
randomChoice(1..6, -1)
// ➔ error: Runtime error: out of range: a count in 0..1000000, -1
```

### MathJSON

`["RandomChoice", domain, k]`.

```json example
["RandomChoice", ["Range", 1, 6], 3]
// ➔ [4, 1, 4] (for example): repeats are expected
```
