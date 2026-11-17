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

## Nothing

`nothing` is kept where it is written, and an operation that needs a value
gives an `incompatible-type` error for it:

```epsil
[2, nothing, 3]
// ➔ [2,"Nothing",3]
1 + nothing
// ➔ error: Type error: expected `number`, got `nothing` at `nothing` in `1 + nothing`
```

### MathJSON

`"Nothing"`. An empty slot in LaTeX, such as `\lbrack 2, ,3 \rbrack`, is a
parse error: the slot holds `["Error", "'missing'"]`. A trailing comma,
`\lbrack 1, 2, \rbrack`, is dropped. The symbols `All` and `None` are inert
tags of the MathJSON format, with no value other than themselves.

## Declare

In Epsil, `let x = v` declares a variable and `const c = v` a constant:
[Declarations](/declarations/) gives the rules. A declaration has a value:
`let x` and `let x: integer` with no value are errors. A second declaration
of a name that the program or the block already declares is an error, also at
the top level of a program. A constant cannot be assigned.

```epsil
let x: integer
// ➔ error: Static error: `x` is declared without a value: write `let x = …` in `let x: integer`
const c = 299792458
c = 3
// ➔ error: Static error: cannot assign a value to the constant `c` in `c := 3`
```

### MathJSON

`["Declare", symbol, type, value]`, `["Declare", symbol, attributes]`. A
standalone `Declare` with a value evaluates to that value; in a `Block`, a
`Declare` is a statement, and a block whose last statement is a `Declare` has
the value `Nothing`.

In a `Program` or a `Block`, a `Declare` with no value reserves a variable
that is initialized later. An explicit type fixes its type. Otherwise the
type is inferred from a single later initialization in the same sequence of
statements, before any use; the inference does not search branches, loops or
calls, and stops at a function application (`let x; x = 1` infers `number`,
`let x; x = 1 + 2` keeps `unknown`). A read before the initialization is the
error `read-before-initialization`. Outside these sequences, a `Declare`
without a value is the error `declaration-without-value`.

In a `Block`, a local is made only by a `Declare`, which must be a statement
of the block itself: in a branch of an `If`, in a loop body or in a case of a
`Match`, it is the error `declaration-below-statement`. A second `Declare` of
a name that the block declares is the error `variable-redeclaration`; at the
top level, a second `Declare` replaces the definition. A local cannot be read
before its declaration (`read-before-declaration`).

The attributes dictionary has the keys `type`, `value`, `constant` (`True`
for a constant) and `holdUntil` (`"never"`, `"evaluate"` or `"N"`: when the
value is substituted during evaluation, as for `Pi`). A positional type or
value takes precedence over the same key.

```json example
["Declare", "c", "integer", 299792458, ["Dictionary", ["KeyValuePair", "constant", "True"]]]
```

`Declare` is not a pure function: it changes the state of the engine. In
JavaScript, see [`ce.declare()`](/compute-engine/guides/augmenting/).

## DeclareType

In Epsil, `type name = definition` declares a **nominal** type, and
`type alias name = definition` a **structural alias**: see
[Declaring a type](/declarations/#declaring-a-type). A value is compatible
with a nominal type only when its type is that type; any value that matches
the definition is compatible with an alias.

A type declaration also declares a **constructor**, a function of the same
name. A tuple definition gives one argument per element; another definition
gives one argument; a record definition gives no constructor, because the
order of its fields is not meaningful. A nominal constructor is inert: the
call is the value, and its type is the declared type. An alias constructor
checks its arguments and gives the plain value.

```epsil
type point = tuple<x: number, y: number>
type(point(1, 2))
// ➔ TypeFrom("point")
type alias pair = tuple<number, number>
pair(1, 2)
// ➔ (1, 2)
```

Types are global to the engine, so a type declaration is valid only at the
top level of a program. A declaration of a name that already has a value or
an operator registers nothing and is an error; a library name is shadowed.
Running a program again replaces its own type declarations.

```epsil
function f() { type t = integer; 1 }
// ➔ error: The type "t" is declared inside a block: types are global, so type declarations are only allowed at the top level of a program
```

### MathJSON

`["DeclareType", name, type]`, `["DeclareType", name, type, attributes]`,
with the type as a string. The attribute `alias` set to `True` declares a
structural alias. The declaration takes effect when the expression is
canonicalized, so later statements can use the type, and it evaluates to
`Nothing`. The `mint` option of `ce.declareType()` has no attribute: this
operator always declares a constructor.

```json example
["DeclareType", "point", "'tuple<number, number>'", ["Dictionary", ["KeyValuePair", "alias", "True"]]]
```

## Assign

In Epsil, `x = v` assigns a declared variable. The value is evaluated when
the assignment is: a symbol that has a value at that moment is replaced by
the value. An assignment keeps the type of the variable, and a value of
another type is the error `assignment-type-mismatch`. An assignment to a name
that is not declared is the error `assignment-to-undeclared-variable`.

```epsil
let a = 1
let b = a
a = 2
b
// ➔ 1
let x: integer = 1
x = 2.5
// ➔ error: Static error: `x` has the type `integer`, and the value has the type `2.5` in `x := 2.5`
```

### MathJSON

`["Assign", symbol, value]`. A symbol with no value stays symbolic in the
stored value, and has its current value when the assigned symbol is
evaluated: see
[When is the value captured?](/compute-engine/guides/augmenting/#when-is-the-value-captured).
The definition is looked up in the enclosing scopes. Outside every block (an
`Assign` that the host evaluates, or `ce.assign()`), an assignment to a name
with no definition declares it, with the type of the value. In a `Block`, a
function body or the body of a binder, it is the error
`assignment-to-undeclared-variable`.

An assignment is a statement, never an operand: `["f", ["Assign", "a", 2]]`
is the error `assignment-in-operand`. A block whose last statement is an
`Assign` has the value `Nothing`.

```json example
["Block", ["Assign", "x", 5], "x"]
// ➔ an assignment-to-undeclared-variable error
["Block", ["Declare", "x", "'unknown'", 5], "x"]
// ➔ 5
```

## Assume

The predicate is an equality, an inequality or a membership. Its symbols can
be undeclared, and assuming does not declare them. Every outcome is a value:
an argument that is not a predicate is not an error.

| Outcome | Meaning |
| :-- | :-- |
| `"ok"` | the assumption was recorded |
| `"tautology"` | the existing assumptions imply it |
| `"contradiction"` | it conflicts with the existing assumptions |
| `"not-a-predicate"` | the argument is not a proposition |
| `"internal-error"` | the assumption could not be processed |

```epsil
[assume(x > 0), assume(1 > 0), assume(1 < 0), assume(42)]
// ➔ ["ok","tautology","contradiction","not-a-predicate"]
```

`assume` is not a pure function: it changes the state of the engine. See
[Assumptions](/compute-engine/guides/assumptions/).

### MathJSON

`["Assume", predicate]`.

```json example
["Assume", ["Element", "x", "Integers"]]
// ➔ "ok"
```

## HoldValues

`HoldValues(body)` evaluates `body` with its assigned free symbols shielded:
during the evaluation, each of them is a symbol with no value, but its type
and the assumptions about it still apply. With a second argument, a list or
a single symbol, only those symbols are shielded. Built-in constants are
never shielded, and the values are intact afterwards. This is Mathematica's
`Block[{x}, …]`.

```epsil
let x = 5
let a = 3
[together(1/x + a/x^2), HoldValues(together(1/x + a/x^2))]
// ➔ [8/25,(a + x) / x^2]
let x = 5
let a = 3
HoldValues(x^2 + a, [a])
// ➔ a + 25
```

`simplify` evaluates its argument first, so `HoldValues` is how an assigned
symbol stays symbolic through it:

```epsil
let w = 5
[simplify(abs(w)), HoldValues(simplify(abs(w)), w)]
// ➔ [5,|w|]
```

### MathJSON

`["HoldValues", body]`, `["HoldValues", body, symbols]`, where `symbols` is a
`List`, `Set`, `Tuple` or a symbol.

## About

The dictionary has these keys, when they apply:

- `kind`: `"symbol"`, `"constant"`, `"function"`,
  `"multi-clause function (n clauses)"`,
  `"hold function (arguments are bound unevaluated)"`, `"number"`,
  `"string"` or `"expression"`;
- `type`: the static type, as a string, as `type` gives it;
- `name`: the name of a symbol;
- `value`: the value, when it differs from the expression;
- `signature`: the signature of a function;
- `clauses`: the clauses of a multi-clause function, one string each, in
  declaration order, with their overlap and coverage;
- `attributes`: the algebraic attributes of a function, then `"lazy"` when
  it receives its arguments unevaluated;
- `examples`, `keywords`, `description`, `wikidata`, `url`: the
  documentation of the definition.

The type of a numeric constant is the `real` type narrowed to a range around
its value, and `real` is a finite real.

```epsil
about(pi)["type"]
// ➔ "real<3.141592653589793..3.141592653589794>"
```

### MathJSON

`["About", expr]`.

```json example
["At", ["About", "Pi"], "'type'"]
// ➔ "real<3.141592653589793..3.141592653589794>"
```

## Head

A symbol is read through its value: with `x` assigned `a + 1`, `head(x)` is
`"Add"`. A symbol with no value has the head `"Symbol"`.

```epsil
let x = a + 1
[head(x), head(y)]
// ➔ ["Add","Symbol"]
```

### MathJSON

`["Head", expr]`.

```json example
["Head", ["Add", 2, 3]]
// ➔ "Add"
```

## Tail

`tail` is a sequence, so in a list or a call its elements are spliced in. A
symbol is read through its value; a symbol with no value, or any value that
is not a compound expression, has no tail, and `tail` gives `nothing`.

```epsil
tail(2 + x)
// ➔ 2 x
let x = a + 1
[tail(x), tail(y)]
// ➔ [a,1,"Nothing"]
```

### MathJSON

`["Tail", expr]` is a `Sequence`, so it can change the head of an expression:

```json example
["Multiply", ["Tail", ["Add", 2, 3]]]
// ➔ ["Multiply", 2, 3]
```

## Evaluate

`evaluate` computes exactly; `N` gives a numeric approximation. A `Hold`
stays held: use `ReleaseHold`.

```epsil
[evaluate(Hold(1 + 1)), ReleaseHold(Hold(1 + 1))]
// ➔ [Hold(1 + 1),2]
```

See [Exact and numeric evaluation](/compute-engine/guides/numeric-evaluation/).

### MathJSON

`["Evaluate", expr]`.

## Type

The result is the **literal type** of the expression, the most precise type
of its value: the type of `2.4531` is `2.4531`, which widens to `real`, a
finite real. A name with a declared type gives that type. A name with no
declared type, such as an untyped parameter, gives the type of its value,
widened.

```epsil
type(2.4531)
// ➔ TypeFrom("2.4531")
function f(x) { type(x) }
f(1)
// ➔ TypeFrom("integer")
```

See [Types](/types/).

### MathJSON

`["Type", expr]`.

```json example
["Type", 2.4531]
// ➔ ["TypeFrom", "'2.4531'"]
```

## Solve

`solve(equation, unknown)` is the list of the solutions. The equation is an
`==` equation, or an expression solved as equal to zero. With no unknown, it
is the single free variable of the equation, or `x` when there are several
and one of them is `x`, so a pipeline works without naming it. For a system,
give a list of equations and a list of unknowns: each solution is a tuple, in
the order of the unknowns. Linear systems are solved exactly.

```epsil
[solve([x + y == 3, x - y == 1], [x, y]), x^2 == 4 |> solve]
// ➔ [[(2, 1)],[2,-2]]
```

**A domain.** An unknown can be restricted to a domain, `x in 1..1000` or
`x in interval(a, b)`. The equation is solved symbolically, and its solutions
are filtered to the domain. A periodic family gives every member in the
domain. When no symbolic solution is found and the domain is finite and not
too large, `solve` checks each element exactly. With a condition, any
boolean expression is accepted. With several unknowns, each with a domain,
each solution is a tuple:

```epsil
solve(x^2 - 5x == -6, x in 1..1000)
// ➔ [3,2]
solve(x^3 + y^3 == 1729, x in 1..12, y in 1..12)
// ➔ [(1, 12),(9, 10),(10, 9),(12, 1)]
```

**Integer equations** are solved symbolically when every unknown ranges over
integers: linear equations in any number of unknowns, Pell equations
`x^2 - D y^2 = N`, and the Pythagorean equation `x^2 + y^2 = z^2`. This
reaches answers that checking each element cannot: the domain below has
`10^10` pairs. Over all integers, the result is a family with integer
parameters, `ArbitraryInteger(1)`, `ArbitraryInteger(2)`, … For the
Pythagorean equation, it is the two classical families, which hold every
integer solution.

```epsil
solve(x^2 - 29y^2 == 1, x in 1..100000, y in 1..100000)
// ➔ [(9801, 1820)]
solve(6x + 9y == 4, x in 1..100, y in 1..100)
// ➔ []
solve(3n + 4m == 7, n in Integers, m in Integers)
// ➔ [(-7 + 4ArbitraryInteger(1), 7 - 3ArbitraryInteger(1))]
```

The assumptions about an unknown, such as `assume(n > 0)`, filter the
solutions too.

**The result is complete or absent.** The list holds every solution in the
domain, and an empty list means that there is none. When the engine cannot
show that its list is complete, `solve` stays unevaluated: it never returns a
part of the solutions. An equation that holds for every value gives
`[ArbitraryConstant(1)]`, and an equation whose answer depends on another
unknown stays unevaluated.

```epsil
[solve(e^x == x + 2, x), solve(x == x, x), solve(a == 0, x)]
// ➔ [Solve(e^x == x + 2, x),[ArbitraryConstant(1)],Solve(a == 0, x)]
```

**Real or complex solutions.** With no declared type and no domain, a
polynomial equation gives all its roots, the complex ones too. A root is
exact when the polynomial has a closed form that the engine knows: a rational
root, a quadratic factor with rational coefficients, a pure power `x^n = c`,
or a polynomial in `x^g`; the other roots are floats. Any other equation
gives its real solutions only. A symbol other than the unknown, with no value
and no type, counts as real.

```epsil
[solve(x^2 + 1 == 0, x), solve(x^3 == 8, x)]
// ➔ [[i,-i],[2,-1 + sqrt(3)i,-1 - sqrt(3)i]]
[solve(e^x == -1, x), solve(abs(x - 1) == 3, x), solve(abs(x - a) == 2, x)]
// ➔ [[],[-2,4],[a - 2,a + 2]]
```

**Trigonometric equations** have infinitely many solutions. With no domain,
or over the real or complex numbers, the result is a list of families with an
integer parameter, `ArbitraryInteger(1)`. Families with the same solutions
become one family, and each factor of a product gives its families with its
own period. A condition on the unknown cannot remove members of a family, and
then `solve` stays unevaluated. Over a bounded domain, the result holds every
solution in the domain.

```epsil
solve(sin(x) == 1/2, x)
// ➔ [2pi * ArbitraryInteger(1) + 1/6 * pi,2pi * ArbitraryInteger(1) + 5/6 * pi]
[solve(sin(x) == 0, x), solve((x - 1) * sin(x) == 0, x)]
// ➔ [[pi * ArbitraryInteger(1)],[1,pi * ArbitraryInteger(1)]]
solve(sin(x) == 0, x in interval(0, 10))
// ➔ [0,pi,2pi,3pi]
```

**A decimal number in the equation.** The engine compares two numbers within
its tolerance (`1e-10` by default), so `10 == 10.0000000000001` is `True`.
Over the real or complex numbers, `solve` does not use the tolerance: the
solutions are the exact roots, with the decimal numbers as they are written.
Over a discrete domain, each element is checked with the tolerance.

```epsil
solve(x == 10.0000000000001, x in interval(-10, 10))
// ➔ []
solve(x == 10.0000000000001, x in -10..10)
// ➔ [10]
```

**When `solve` stays unevaluated**, the reason is usually one of these: the
unknown is both inside and outside a function that the solver cannot invert
(`e^x = x + 2`, `cos(x) = x`); a special function of the unknown
(`besselJ(0, x) = 0`); a trigonometric function of an argument that is not
linear in the unknown, with no bounded domain (`sin(x^2) = 0`); a polynomial
of degree 3 or more with symbolic coefficients; or, over a bounded domain,
too many solutions to list. Then:

- give a bounded domain, `x in interval(a, b)`: the engine uses interval
  arithmetic to prove that the domain has no other root;
- or use `findRoot` to find one solution numerically, near a start value.

```epsil
findRoot(e^x == x + 2, [(x, 1)])["converged"]
// ➔ "True"
```

### MathJSON

`["Solve", equation]`, `["Solve", equation, unknown]`,
`["Solve", equation, spec1, spec2, ...]`, where a spec is a symbol,
`["Element", symbol, collection]`, or `["Element", symbol, collection, condition]`
with the indexing-set convention of `Sum`. In LaTeX, `x \in 1..1000` parses
to the `Element` form: `\operatorname{Solve}(x^2=4,\; x \in 1..1000)`.

```json example
["Solve", ["Equal", ["Power", "x", 2], 1], "x"]
// ➔ ["List", 1, -1]
["Solve",
  ["List", ["Equal", ["Add", "x", "y"], 3], ["Equal", ["Subtract", "x", "y"], 1]],
  ["List", "x", "y"]]
// ➔ ["List", ["Tuple", 2, 1]]
```

`Solve` is the operator form of the `expr.solve()` method of the JavaScript
API. For a periodic equation, `Solve` gives the families of solutions, and
`expr.solve()` the principal solutions. A root template added to
`ce.solveRules` is taken as a solution as it is.

## ArbitraryConstant

`arbitraryConstant(k)` is any number, such as a constant of integration, and
`arbitraryInteger(k)` any integer, such as the parameter of a family of
solutions, in a result of `solve`, `dsolve` or `rsolve`. In one result, two
calls with the same index are the same value, and two calls with different
indexes are independent. A call has no value: it is not an unknown, it is not
declared in any scope, and an expression that holds one does not compile.

```epsil
[arbitraryConstant(1) - arbitraryConstant(1), arbitraryConstant(1) == arbitraryConstant(2)]
// ➔ [0,ArbitraryConstant(1) == ArbitraryConstant(2)]
```

The indexes of a result start at the first index that its input does not
use, so two separate results both use the index 1: renumber one before you
combine them.

### MathJSON

`["ArbitraryConstant", k]`, `["ArbitraryInteger", k]`. In LaTeX, a call is
written in the command `\constant`, which shows only its argument:
`\constant{c_{1}}` is `ArbitraryConstant(1)` and `\constant{n_{1}}` is
`ArbitraryInteger(1)`; without it, `c_1` is a symbol. A renderer that does not
know the command needs `\newcommand{\constant}[1]{#1}`.

```json example
["Solve", ["Equal", ["Sin", "x"], 0], "x"]
// ➔ ["List", ["Multiply", "Pi", ["ArbitraryInteger", 1]]]
```

## CanonicalForm

With no form, `canonicalForm(expr)` is the canonical form of the expression.
With forms, it applies only those transformations, in order, and the result
is not canonical. Comparing two partial canonical forms with `isSame` is a
way to accept `x + 1` and `1 + x` but not `2 - 1 + x`.

```epsil
canonicalForm(Hold(3 + 2 + 1), "Order")
// ➔ Hold(1 + 2 + 3)
```

### MathJSON

`["CanonicalForm", expr]`, `["CanonicalForm", expr, form1, form2, ...]`. The
forms:

- `Order`: sort the arguments of a commutative function.
- `Flatten`: flatten associative expressions, remove delimiters and splice
  `Sequence` expressions.
- `Number`: normalize number forms, such as `["Add", 2, ["Multiply", 3, "ImaginaryUnit"]]`
  to `["Complex", 2, 3]`, and reduce rationals.
- `InvisibleOperator`: replace an invisible operator by `Multiply` or a
  function application.
- `Multiply`: combine the coefficients and factors of a `Multiply`, and make a
  `Power` when possible.
- `Add`: remove the `0` of an `Add`, make a `Multiply` when possible, and turn
  `Subtract` and `Negate` into `Add` and `Multiply`.
- `Power`: turn `Exp`, `Square`, `Sqrt` and `Root` into `Power`.
- `Divide` applies `Power` to its operands.

```json example
["CanonicalForm", ["Add", 3, 2, 1], "Order"]
// ➔ ["Add", 1, 2, 3]
["CanonicalForm", ["Add", 1, ["Add", 2, 3]], "Flatten"]
// ➔ ["Add", 1, 2, 3]
["CanonicalForm", ["InvisibleOperator", 2, "x"], "InvisibleOperator"]
// ➔ ["Multiply", 2, "x"]
["CanonicalForm", ["Multiply", 2, 3, "x"], "Multiply"]
// ➔ ["Multiply", 6, "x"]
```

The `canonical` option of `ce.parse()` and `ce.expr()` takes the same forms.

## N

The value is computed with the requested digits plus a few guard digits,
then rounded, and it keeps these digits. The working precision of the engine
does not change, and a later operation on the result uses the working
precision.

```epsil
[N(pi, 20), N(1/3, 4), N(2) / 3]
// ➔ [3.1415926535897932385,0.3333,0.666666666666666666667]
```

With a list `[p, a]`, `N` aims at a precision goal `p` (correct significant
digits) or an accuracy goal `a` (an absolute error below `10^-a`), whichever
is met first; either can be `oo`. The engine doubles its precision until two
values agree within the goal. A goal that needs more than 1,000 digits, or
cannot be checked, leaves the expression unevaluated.

```epsil
N(1000pi, [10, 3])
// ➔ 3141.593
```

### MathJSON

`["N", expr]`, `["N", expr, precision]`, `["N", expr, ["List", p, a]]`. The
result of `N` with a precision is a float, also when its value is an integer:
`["N", 2, 10]` is `2.0`. The elements of a list result are rounded floats,
and the constants of a symbolic result stay exact. The value of an exact
rational is a float, so `["N", ["Rational", 1, 3]]` has the type
`real<0.33..0.34>`; an integer stays an integer.

```json example
["N", ["Multiply", ["Power", 10, 10],
  ["Subtract", ["Exp", 100], ["Exp", ["Divide", 999999999999, ["Power", 10, 10]]]]],
  ["List", "PositiveInfinity", 20]]
// ➔ 2.688117141681729591326298974395630530648558808379370953675983977e+43
```

## Error

An error is a value. When an argument of a function is an error, the result
is that error. See [Errors](/errors/) for the error codes, and the
[evaluation guide](/compute-engine/guides/evaluate/#errors) for the rules.

### MathJSON

`["Error", code, context]`, where `code` is a string or an `["ErrorCode"]`
expression, and `context` is optional.

An error that propagated out of the expression where it was raised carries a
breadcrumb of the operators it passed through: an `["ErrorTrace"]` that is
always the **last** operand of the `Error`. Each frame is
`["ErrorFrame", operator, index]`, where `index` is the position of the
operand the error came from, starting at 1. The frames read innermost first.
An error that did not propagate has no breadcrumb. So the breadcrumb is found
by its head, not by its position: code that reads the second operand as the
context must skip an `ErrorTrace` there. `toString()` and the LaTeX
serializer show a traced error like an untraced one.

```json example
["Add", ["Ln", "'a'"], 2]
// ➔ ["Error",
//      ["ErrorCode", "'incompatible-type'", "'number'", "'string'"],
//      "'a'",
//      ["ErrorTrace", ["ErrorFrame", "'Ln'", 1], ["ErrorFrame", "'Add'", 1]]]
```

## IsError

`isError` holds its argument, so the error is not propagated before it is
checked, and it always answers. An expression that embeds an error is
`True` too, but an error inside a collection is not reported: a collection
that holds an error is still a collection. `NaN` is not an error.

```epsil
[isError(1 + 1), isError(x), isError([1, ln("a")]), isError(NaN)]
// ➔ ["False","False","False","False"]
```

To read an error rather than detect it, use `type`, which gives `error`, or
an `Error(…)` case of a `match`.

### MathJSON

`["IsError", expr]`.

```json example
["IsError", ["Ln", "'a'"]]
// ➔ "True"
```

## Module

`std::name` is the definition of `name` in the standard library, also where
a local definition shadows it. A call `std::floor(2.5)` follows the rules of
the library function. A name that the library does not define is an error.
`Module` itself cannot be declared or assigned. See
[Naming](/naming/).

```epsil
let pi = 3
std::pi + pi
// ➔ 3 + pi
Module(Floo)
// ➔ error: not a library name: Floo
```

### MathJSON

`["Module", name]`. A call of a library function is written with `Apply`:
`["Apply", ["Module", "Floor"], 2.5]`, whose canonical form is the plain call
bound to the library function. Its arguments read the definitions of the
scope. In a scope that shadows a library name, `.json` and `toMathJson()`
write the library definition as `["Module", "Pi"]`, so that the MathJSON has
the same value when it is read again in that scope. A second operand is
reserved, and is an error. LaTeX has no spelling: `["Module", "Pi"]` is
written `\pi`.

```json example
["Module", "Floo"]
// ➔ ["Error", "'not-a-library-name'", "Floo"]
```

## String

```epsil
String(x, 2)
// ➔ "x2"
```

### MathJSON

`["String", expr1, expr2, ...]`.

## Symbol

The symbol is not declared: it is a free variable.

```epsil
symbol(x, 2)
// ➔ "x2"
```

### MathJSON

`["Symbol", expr1, expr2, ...]`. To declare it, use `Declare` with a value:
`["Declare", ["Symbol", "x", 2], "real", 0]`.

## Typed

`Typed(expr, type)` sets the static type of the expression. When it is
evaluated, a concrete value (a number, a string, a character, a boolean, or a
list or tuple of these) is checked against the type, and a value that does
not conform is an `incompatible-type` error. A symbolic value, `missing`,
`nothing`, `NaN` and an error pass unchanged. A float conforms to every type
that admits a real number, so the value of `N` passes under `integer`. A
character conforms where a string is declared.

```epsil
Typed(2 + 3, integer)
// ➔ 5
Typed("s", integer)
// ➔ error: Runtime error: expected `integer`, got `string` at `s`
```

### MathJSON

`["Typed", expr, type]`, with the type as a string or a type name. Its main
use is to annotate the parameters and the result of a
[function literal](/compute-engine/reference/functions/#function).

## Parse

```epsil
parse("\\frac{\\pi}{2}")
// ➔ 1/2 * pi
```

### MathJSON

`["Parse", ["LatexString", "'\\frac{\\pi}{2}'"]]`.

## Latex

```epsil
Latex(pi / 2)
// ➔ "\frac{\pi}{2}"
```

### MathJSON

`["Latex", expr]` is a `LatexString`.

## Subscript

The way LaTeX subscripts are read, as part of a name, as an index or as an
expression, is described in
[Subscripts and superscripts](/compute-engine/guides/latex-syntax/#subscripts-and-superscripts).

## Sequence

When a sequence is used where an element is expected, its elements are
spliced into the enclosing expression. The empty sequence splices to no
element.

```epsil
let s = Sequence(2, 3); [1, s, 4]
// ➔ [1,2,3,4]
[1, Sequence(), 2]
// ➔ [1,2]
```

`Nothing` is not an empty sequence. It is the value of an empty block or of a
statement with no value, and a collection keeps it as an element:

```epsil
[1, Nothing, 2]
// ➔ [1,"Nothing",2]
length([1, Nothing, 2])
// ➔ 3
```

### MathJSON

`["Sequence", ...elements]`.

```json example
["List", 1, ["Sequence", 2, 3], 4]
// ➔ ["List", 1, 2, 3, 4]

["List", 1, ["Sequence"], 2]
// ➔ ["List", 1, 2]

["List", 1, "Nothing", 2]
// ➔ ["List", 1, "Nothing", 2]
```

## IndexedSequence

The indexed family whose term is `term`, with the index ranging from `lower`,
up to `upper` when it is given. It is **inert**: `evaluate` and `simplify`
leave it unchanged, and it has no collection operations yet.

```epsil
IndexedSequence(1/n, n, 0)
// ➔ {1 / n : n = 0..}
simplify(IndexedSequence(1/n, n, 1, oo))
// ➔ {1 / n : n = 1..+oo}
```

### MathJSON

`["IndexedSequence", term, index, lower]`,
`["IndexedSequence", term, index, lower, upper]`.

The LaTeX sequence-braces notation `\{a_n\}_{n=1}^{\infty}` parses to
`["IndexedSequence", ["a_", "n"], "n", 1, "PositiveInfinity"]`. The term is in
the operator-call form `["a_", "n"]`, so that the binding of the index is
kept. A set-membership subscript gives the least element of the set as the
lower bound: `\{a_n\}_{n\in\mathbb{N}}` is
`["IndexedSequence", ["a_", "n"], "n", 0]`. The bare braces `\{a_n\}` are
still a `Set`, and the parenthesized form `(a_n)_{n\in\mathbb{N}}` is not an
`IndexedSequence`. The expression round-trips through LaTeX.
