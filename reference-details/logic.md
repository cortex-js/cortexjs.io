<!-- The detail of the entries of /reference/logic/. Format: README.md. -->

## Exists

`exists` is a logical quantifier, not a collection function: it takes a
condition and a proposition, not a collection and a predicate, and it binds a
variable. To ask whether an element of a collection satisfies a predicate,
use [`any`](/reference/collections/#any).

The first argument introduces the variable: a symbol, or `x in S`. With a
finite `S`, the proposition is decided by trying each element.

```epsil
exists(x in {5, 2, 10, 18}, x > 15)
// ➔ "True"
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
exists(x, x > 15)
// ➔ Exists(x, 15 < x)
```

The variable is local to the proposition and shadows a symbol of the same
name outside it, so a value assigned to that symbol does not enter the
proposition.

```epsil
let x = 100
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
```

See also [`notExists`](/reference/logic/#notexists) and
[`existsUnique`](/reference/logic/#existsunique).

### MathJSON

`["Exists", condition, proposition]`. The condition is a symbol or
`["Element", variable, domain]`.

```json example
["Exists", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 15]]
// ➔ "True"
```

## ForAll

`forAll` is a logical quantifier, not a collection function. Like
[`exists`](/reference/logic/#exists), it binds the variable that its first
argument introduces, and with `x in S` over a finite `S` it is decided by
trying each element. To ask whether every element of a collection satisfies
a predicate, use [`all`](/reference/collections/#all).

```epsil
forAll(x in {5, 2, 10, 18}, x > 0)
// ➔ "True"
forAll(x in {5, 2, 10, 18}, x > 5)
// ➔ "False"
```

See also [`notForAll`](/reference/logic/#notforall).

### MathJSON

`["ForAll", condition, proposition]`.

```json example
["ForAll", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 0]]
// ➔ "True"
```

In LaTeX, `\forall x \in \{1, 2, 3\}, x > 0` parses to
`["ForAll", ["Element", "x", ["Set", 1, 2, 3]], ["Greater", "x", 0]]`.
