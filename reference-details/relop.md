<!-- The detail of the entries of /reference/relop/. Format: README.md. -->

## Section: Order and absent values

An ordered comparison (`<`, `<=`, `>`, `>=`) with an operand that has no
order is `False`: `NaN`, a pole such as `1/0` (complex infinity), and a
complex number that is not real. So an `if` whose condition compares such a
value takes its other branch. `!=` is not affected, and a comparison with a
free symbol stays unevaluated. The signed infinities are ordered as usual.

```epsil
1/0 > 0
// ➔ false
if 1/0 > 0 { 1 } else { 0 }
// ➔ 0
i > 0
// ➔ false
1/0 != 0
// ➔ true
0 < oo
// ➔ true
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
// ➔ [false,true,false]
[sum([1, missing]), max([1, missing]), mean([1, missing])]
// ➔ [missing,missing,missing]
```

The three kinds of equality, `===` (the same expression), `==` (the same
value) and identical equality (the same value for every value of the free
variables), are compared in
[Comparing expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions).

## Congruent

`congruent(a, b, m)` is `True` when `a` and `b` are congruent modulo `m`.

```epsil
congruent(26, 11, 5)
// ➔ true
```

### MathJSON

`["Congruent", a, b, modulus]`. In LaTeX: `26 \equiv 11 \pmod{5}`.

```json example
["Congruent", 26, 11, 5]
// ➔ True
```

## IsSame

`isSame(a, b)` is `True` when the two expressions are written the same way,
without canonicalization. To compare their values, use `==`; to compare them
structurally but ignoring the order of the arguments of a commutative
function, compare their `canonicalForm(…, "Order")`.

```epsil
[isSame(2 + 3, 2 + 3), isSame(1 + 1, 2)]
// ➔ [true,false]
```

### MathJSON

`["IsSame", a, b]`.

## Same

`a === b`, also written `≣`, is `True` when the canonical forms of the
operands are the same expression. It always answers, with no tolerance and
no numeric approximation of an exact value. It never reads the value of a
symbol: with `x` assigned `5`, `x === 5` is `False` and `x == 5` is `True`.
Numbers compare by exact value, not by notation. With more operands it is a
chain: `a === b === c`.

```epsil
[sqrt(2) === 1.4142135623730951, sqrt(2) == 1.4142135623730951, 0.5 === 1/2]
// ➔ [false,true,true]
let x = 5
[x === 5, x == 5]
// ➔ [false,true]
```

`==` is the comparison of values: it can stay unevaluated when the answer is
not known, because `x == y` is a condition. Because `===` always answers, it
has no exception for `NaN`, also inside a collection, and a list is compared
as a whole, not element by element.

```epsil
[x === y, x == y]
// ➔ [false,x == y]
[NaN === NaN, NaN == NaN, [NaN] === [NaN], [NaN] == [NaN]]
// ➔ [true,false,true,false]
```

`isSame` compares the operands as written, and `===` their canonical forms:
`isSame(1 + 1, 2)` is `False`, but `1 + 1 === 2` is `True`.

### MathJSON

`["Same", a, b, ...]`, the operator form of the `expr.isSame()` method.

```json example
["Same", ["Sqrt", 2], 1.4142135623730951]
// ➔ "False"
["Same", "NaN", "NaN"]
// ➔ "True"
```

## IdenticallyEqual

`identicallyEqual(a, b)` is `True` when the two expressions have the same
value for every value of their free variables. It applies symbolic
transformations, expansion and simplification, and evaluates both
expressions at sample points. A `True` that rests on sampling is a very
strong indication, not a proof: this is the only comparison that can answer
from sampling. It is three-valued: `True`, `False`, or unevaluated when the
identity can neither be shown nor refuted, which includes expressions that
only differ at the sample points.

```epsil
[identicallyEqual((x + 1)^2, x^2 + 2x + 1), identicallyEqual(1, 2)]
// ➔ [true,false]
identicallyEqual(sin(x), cos(x))
// ➔ IdenticallyEqual(sin(x), cos(x))
```

### MathJSON

`["IdenticallyEqual", a, b]`, the operator form of the
`expr.isIdenticallyEqual()` method. In LaTeX, `\equiv` or `≡`:
`(x+1)^2 \equiv x^2 + 2x + 1`. A `\equiv` followed by `\pmod{n}` is a
congruence, and parses as `Congruent`.
