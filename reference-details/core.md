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

## Section: Functions

A function is a value: it can be an argument of a function, the result of a
function, or the value of a variable. Its type is a function signature, such
as `(real, integer) -> boolean`.

### Function literals

A **function literal** is written with `=>`: `x => 2 * x`,
`(x, y) => 2 * x + y`. Its parameters can have a type, a default value, a
rest parameter or a tuple pattern: see
[Anonymous functions](/operators/#anonymous-functions) and
[Functions](/control-flow/#functions). The body can be a `do` block, with
locals, loops and conditionals.

```epsil
function clamp(x, lo, hi) { min(max(x, lo), hi) }
[clamp(5, 0, 3), clamp(-1, 0, 3)]
// ➔ [3,0]
```

Compiled code calls a function only when it can see the function where the
call is written (see
[Function values](/compute-engine/guides/compiling/#function-values)).

### Shorthand function literals

A **shorthand function literal** is an expression whose parameters are not
listed. They are its wildcards, `_`, `_2`, …, or, when it has none, its
unknowns: the symbols that have no value.

```epsil
[apply(_ * _, 3), apply(_ + _2, 1, 2), apply(x * y, 2, 3)]
// ➔ [9,3,6]
```

When an unknown is the parameter, make sure that the symbol has no value in
the current scope. An expression with no wildcard and no unknown is a
constant function:

```epsil
apply(3, 5)
// ➔ 3
```

The unknowns of an expression become its parameters only when the
expression is known not to be a function. An expression whose type is
`unknown`, such as a call of a function with no definition, is kept as a
function value, and is applied once its value is known. Here `g(f)` is not
read as the function `f => g(f)`, because `g(f)` may itself be a function:

```epsil
apply(g(f), x)
// ➔ Apply(g(f), x)
let g = (a, b) => a + b
apply(g(f), x)
// ➔ f + x
```

Once `g` has a value, `g(f)` is `g` applied to its first argument, a
function of one argument. To apply a function whose result type is not
known as a shorthand, use a wildcard: `map(f(_), xs)` maps `f` over `xs`
whether or not `f` is defined.

The name of a library function is also a function value:

```epsil
[map(sin, [0, pi]), apply(max, 2, 3)]
// ➔ [[0,0],3]
```

### Anonymous functions

A function that is not bound to a name is an **anonymous function**. It is
often the argument of another function: `map(x => 2 * x, xs)`, or with a
wildcard, `map(_ * 2, xs)`. See
[Anonymous functions](/control-flow/#anonymous-functions).

### Evaluating a function literal

A function literal is applied by a call, or by [`apply`](#apply):

```epsil
[(x => x + 2)(11), apply(_ + 2, 4)]
// ➔ [13,6]
```

### Closures

A **closure** is a function literal that reads a variable of the scope
where it is defined. It captures the **binding** of the variable, not its
value at that time: when the function is applied, it reads the value that
the binding holds then, so an assignment made after the definition is
visible to the function.

```epsil
let a = 10
let f = (x) => a + x
a = 20
f(1)
// ➔ 21
```

A variable of the same name declared in **another** scope is another
binding, which the function does not read. Here the function captured the
inner `a`:

```epsil
let f = do { let a = 10; (x) => a + x }
let a = 100
f(1)
// ➔ 11
```

The same rule applies to a function called in the body: a call reads the
function that its name denotes where the call is written (see
[Scoping](/declarations/#scoping)).

### Broadcasting over collections

When a function whose parameters have scalar types is applied to a finite
list or range, the call is **broadcast**: the function is applied to each
element, and the result is a list. A function with several parameters is
applied element by element (zip semantics), and a scalar argument is
repeated for each element.

```epsil
f(x) = x^2 + 1
[f([1, 2, 3]), f(1..3)]
// ➔ [[2,5,10],[2,5,10]]
h(x, y) = x + y
[h([1, 2, 3], 10), h([1, 2, 3], [10, 20, 30])]
// ➔ [[11,12,13],[11,22,33]]
```

Broadcasting is decided by the **evaluated** argument, not by its written
form: an argument that evaluates to a list, such as a call of a function
that returns a list, broadcasts too.

```epsil
lst(n) = [n, -n]
k(x) = 1 if x > 0 else -1
k(lst(3))
// ➔ [1,-1]
```

The type of an application follows the same rule: applied to a list, the
result is a list of the result type; applied to an argument that may be a
list, such as a call whose result type is not known, it is
`broadcastable<R>`. For a function literal, `R` is the type of the body,
with each parameter typed as the element that the call maps over:

```epsil
f(x, y, z) = (-y, z, x)
type(f([1, 2], [3, 4], [5, 6]))
// ➔ TypeFrom("list<tuple<integer, integer, integer>>")
```

For a function with a declared signature, `R` is the declared result type.

### Tuple arguments

A function whose parameter has a **scalar** type (a number type or
`boolean`) is also applied to each component of a tuple argument, as
`sin((a, b))` is `(sin(a), sin(b))`. The result is a tuple, with one
component type for each component. A component that does not have the
parameter type is an error in its own component.

```epsil
g(u: real) = 2 * u
[g((a, b)), g([(1, 2), (3, 4)])]
// ➔ [(2a, 2b),[(2, 4),(6, 8)]]
```

A list of tuples is mapped over the list, then over each tuple. A parameter
with no type, or of type `string`, takes the tuple whole:

```epsil
((u) => 7)((a, b))
// ➔ 7
```

Compiled code gives the same tuple: an array on the `javascript` target,
and a `vecN` on the GLSL target.

### Opting out

To write a function that takes a list whole instead of each element,
declare the type of its parameter as `list<…>` or another collection type:

```epsil
len(L: list<number>) = length(L)
len([1, 2, 3])
// ➔ 3
```

The parameter of a function literal with no type annotation has the type
`unknown`, which is read as a scalar, so the function broadcasts unless its
body shows that the parameter is a collection.

The body shows it when it passes the parameter to an operator that takes a
whole collection: `mean`, `median`, `variance`, `standardDeviation`,
`mode`, `quartiles`, `max`, `min`, `sum`, `product`, `gcd`, `lcm`,
`flatten`, `listFrom`, `setFrom` or `tupleFrom`. A list argument then binds
whole. The parameter is followed through element-wise operators
(`mean(v^2)`, `sin(v)`), and through a call of another function whose
parameter binds whole, also a function assigned to a local of the body. A
scalar argument gives the scalar result.

```epsil
h(v) = mean(v^2)
[h([1, 2, 3]), h(2)]
// ➔ [14/3,4]
[((v) => sum(v^2))([1, 2, 3]), ((v) => max(v))([1, 2, 3])]
// ➔ [14,3]
function w(v) { let m = (t) => mean(t); m(v) }
w([1, 2, 3])
// ➔ 2
```

Only a use of the parameter itself counts. A local assigned from the
parameter is not followed, and the function is applied to each element:

```epsil
function w(v) { let u = v; mean(u) }
w([1, 2, 3])
// ➔ [1,2,3]
```

Declare the parameter as a collection to take the list whole. Compiled
JavaScript follows the same rule.

A function that passes a collection to itself at the position of a
parameter also takes that parameter whole, and the parameter is inferred as
`list<any>`:

```epsil
f(n, s) = s if n == 0 else f(n - 1, [1, 2])
f(1, [0])
// ➔ [1,2]
```

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
// ➔ false
let a = withRandomSeed(3, listFrom([random() for k in 1..3]))
let b = withRandomSeed(3, listFrom([random() for k in 1..3]))
a[1] == b[1]
// ➔ true
```

Reading the elements of the same lazy collection twice gives the same values:
the elements of one collection are cached. That is consistent reading, not
replay: the values are unseeded draws, and a new collection draws new ones.

`repeat(random(), n)` draws a new value for each element: a value that is
not pure is evaluated once per element (see
[`repeat`](/reference/collections/#repeat)).

```epsil
let r = repeat(random(), 3)
r[1] == r[2]
// ➔ false
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
// ➔ [2,nothing,3]
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
[Declarations](/declarations/) gives the rules. A `let` without a value,
`let x` or `let x: integer`, declares a variable that is given its value
later by an assignment. Its type is the annotation. Without one, the type is
inferred from a single later assignment in the same sequence of statements,
before any use, that is not in a branch or a loop and calls no function:
after `let x; x = 1`, `x` is a `number`. Otherwise the type is `unknown`. A
read of the variable before it has a value is an error when the program
runs. A second declaration of a name that the program or the block already
declares is an error, also at the top level of a program. A constant cannot
be assigned.

```epsil
let x: integer
x = 4
x + 1
// ➔ 5
let x: integer
x = 2.5
// ➔ error: Static error: `x` has the type `integer`, and the value has the type `2.5` in `x := 2.5`
let x
x
// ➔ error: Runtime error: `x` is read before it has been given a value
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

A function is assigned like any other value, `let double = x => 2 * x`, or
defined with `double(x) = 2 * x` (see
[Functions](/control-flow/#functions)). An assignment is not pure: it
changes the state of the engine.

```epsil
let double = x => 2 * x
double(4)
// ➔ 8
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

The value can be a function literal or a shorthand function literal. In
LaTeX, `\operatorname{double}(x) \coloneq 2x` and
`\operatorname{double} \coloneq x \mapsto 2x` are both:

```json example
["Assign", "double", ["Function", ["Multiply", "x", 2], "x"]]
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
// ➔ [5,abs(w)]
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
// ➔ [Add,symbol]
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
// ➔ [a,1,nothing]
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
// ➔ [[i,-i],[2,-1 + sqrt(3) * i,-1 - sqrt(3) * i]]
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
// ➔ true
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
// ➔ [false,false,false,false]
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

```epsil
String("Hello", ", ", "🌍", "!")
// ➔ "Hello, 🌍!"
String(42, " is the answer")
// ➔ "42 is the answer"
```

With exactly one argument that is a finite collection, `String` joins the
elements of the collection instead of broadcasting over them. This is what
makes `String(characters(s)) == s` hold. With one infinite collection, it
stays unevaluated.

```epsil
[String(characters("abc")), String([1, 2, 3])]
// ➔ ["abc","123"]
String(characterFrom("x"))
// ➔ "x"
String(1..oo)
// ➔ String(Range(1, +oo))
```

With more than one argument, `String` broadcasts over a collection argument,
and a string argument stays whole (see
[Strings stay whole under broadcast and flattening](#strings-stay-whole-under-broadcast-and-flattening)).

```epsil
String("x", [1, 2])
// ➔ ["x1","x2"]
String("ab", 1)
// ➔ "ab1"
```

### MathJSON

`["String", expr1, expr2, ...]`.

```json example
["String", {str: "Hello"}, {str: ", "}, {str: "🌍"}, {str: "!"}]
// ➔ "Hello, 🌍!"

["String", ["Characters", {str: "abc"}]]
// ➔ "abc"

["String", {str: "x"}, ["List", 1, 2]]
// ➔ ["List", "'x1'", "'x2'"]
```

## Symbol

The symbol is not declared: it is a free variable.

```epsil
symbol(x, 2)
// ➔ x2
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
// ➔ [1,nothing,2]
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

## Section: Working with strings

A string is an indexed collection of its characters. It can be counted,
indexed from 1, iterated and searched with the functions of the
[collections](/reference/collections/) library, as a list can.

```epsil
[length("shop"), "abc"[2], first("abc"), last("abc")]
// ➔ [4,"b","a","c"]
```

A character is not the same thing as a Unicode scalar (a code point), and
neither is the same thing as a byte of an encoding. A string gives all three
views: the collection view is the characters, and the other two are reached
with the conversions of [Views of a string](#views-of-a-string).

Strings are normalized to Unicode **NFC** when they are made. The character
`é` written as one scalar (U+00E9) or as two (`e` and U+0301 COMBINING ACUTE
ACCENT) is the same string, of length 1. The emoji `👨‍🚀` is one character
made of three scalars, eleven UTF-8 bytes and five UTF-16 code units.

```epsil
["e\u{301}" == "é", length("e\u{301}")]
// ➔ [true,1]
length("👨‍🚀")
// ➔ 1
unicodeScalars("👨‍🚀")
// ➔ [128104,8205,128640]
utf8("👨‍🚀")
// ➔ [240,159,145,168,226,128,141,240,159,154,128]
utf16("👨‍🚀")
// ➔ [55357,56424,8205,55357,56960]
```

**Membership is character membership, not substring search.** `c in s` and
`contains(s, c)` ask whether `c` is one of the characters of `s`, as they do
for a list. `"ab"` is a substring of `"abc"`, not one of its characters. A
substring is searched with the functions of
[Searching for a substring](#searching-for-a-substring), which read their
second argument as a sequence of characters.

```epsil
isDigit(c) = c in "0123456789"
isDigit("7")
// ➔ true
[contains("abc", "b"), contains("abc", "ab")]
// ➔ [true,false]
containsSequence("abc", "ab")
// ➔ true
```

**Every string is well-formed Unicode.** A host string can hold an unpaired
UTF-16 surrogate, on which segmentation, UTF-8 encoding and equality are not
defined. Each string that enters the engine is scanned once, and each
unpaired surrogate is replaced with U+FFFD REPLACEMENT CHARACTER, so every
operation on a string has a result. In Epsil, an escape for a surrogate code
point is an error:

```epsil
unicodeScalars("\u{D800}")
// ➔ error: invalid unicode codepoint value: U+D800
```

### The `character` type

A **character** is exactly one user-perceived character: one NFC-normalized
grapheme cluster. It is a `scalar`, as `boolean` and `number` are.

`character` and `string` are **disjoint**: a character is not a
one-character string, and a string is not a character. A character has no
elements, so a function that descends into collections stops at a character.

`string` is not an alias of `list<character>` either. The two types have the
same element type and the same iteration, and neither is a subtype of the
other. They differ because grapheme segmentation is not stable under
concatenation: joining an `e` and a lone combining acute accent makes the
single character `é`, so a list of two characters becomes a string of one.

| Type | Relationship |
| :--- | :--- |
| `character` | `character <: scalar` |
| `string` | `string <: indexed_collection<character>` |
| `string` and `scalar` | Not a subtype: a `scalar` is a `boolean`, a `character` or a `number` |
| `string` and `list<character>` | Siblings: neither matches the other |
| `string` and `character` | Disjoint: neither matches the other |

**To get a character**, use [`characterFrom`](#characterfrom), or write a
string literal where a `character` is expected. A literal that is exactly one
grapheme cluster becomes that character, and any other literal is a type
error. Only a literal is converted: an expression of type `string` is not,
so write `characterFrom(s)`.

```epsil
let c: character = "a"
type(c)
// ➔ TypeFrom("character")
let d: character = "ab"
// ➔ error: Type error: The value ""ab"" of type "string" is not compatible with the declared type "character" in `let d: character = "ab"`
function f(c: character) { c }
let s = "a"
f(s)
// ➔ error: Type error: expected `character`, got `string` at `s` in `f(s)`
function f(c: character) { c }
let s = "a"
f(characterFrom(s))
// ➔ "a"
```

**Equality and ordering.** Two characters are equal when their NFC scalar
sequences are the same. A character is also equal to the one-character
string with the same content, which is why `c == "a"`, `"a" in "abc"` and
`indexOf("abc", "b")` need no conversion. The two types stay disjoint.
Characters are ordered by the code points of the cluster. The order is not
locale-aware, and will not be: the identity, membership and hashing of
values must be the same on every host.

```epsil
[characterFrom("a") == "a", "abc"[1] == "a", indexOf("abc", "b")]
// ➔ [true,true,2]
characterFrom("é") < characterFrom("z")
// ➔ false
```

A string function also accepts a character, as [Strings](#strings)
describes. A symbol with no declared type that is used where a string
function expects its string is inferred `character | string`.

### Views of a string

The default view of a string is its characters. For another decomposition,
ask for it:

| View | Function | Element | When to use it |
| :--- | :--- | :--- | :--- |
| Characters | [`characters`](#characters) (synonym `graphemeClusters`) | `character` | The decomposition that iteration and indexing use. Use it to freeze the segmentation into a list. Not guaranteed to be stable across Unicode versions; the slowest to compute. |
| Unicode scalars | [`unicodeScalars`](#unicodescalars) | `integer` code point | Stable and fast. For work on code points. Not for substring search or display. |
| UTF-8 | [`utf8`](#utf8) | `integer` byte | Work on an encoding: byte buffers, input and output, hashing. |
| UTF-16 | [`utf16`](#utf16) | `integer` code unit | Work on an encoding, with a UTF-16 host. |
| Substrings | [`stringSplit`](#stringsplit) | `string` | Splitting on whitespace or on a separator. `stringSplit(s, "")` splits into one-character strings, not characters, with the segmentation that `characters` uses. |

Unicode scalars are not an encoding: one character can be several scalars,
and each scalar is a different sequence of code units in each encoding.

### Searching for a substring

Substring search is the search for a contiguous subsequence, and the same
four functions do it for every indexed collection:
[`rangeOf`](/reference/collections/#rangeof),
[`containsSequence`](/reference/collections/#containssequence),
[`startsWith`](/reference/collections/#startswith) and
[`endsWith`](/reference/collections/#endswith). A string is the case where
the elements are characters.

They differ from [`contains`](/reference/collections/#contains) and
[`indexOf`](/reference/collections/#indexof), which search for one element:
their second argument is a sequence of elements, and both sides are compared
character by character. This is what makes them safe with grapheme clusters:
a needle cannot match across the boundary of a cluster, because whole
characters are compared.

```epsil
rangeOf("x\u{301}y", "x")
// ➔ missing
rangeOf("👨‍👩‍👧", "👩")
// ➔ missing
rangeOf("e\u{301}e", "e")
// ➔ [2]
```

The characters of `"x\u{301}y"` are `x́` and `y`, and `x` is not `x́` (U+0301
after `x` has no precomposed NFC form). `"👨‍👩‍👧"` is one character, a family
joined with zero-width joiners. In `"e\u{301}e"` the first `e` is part of
the character `é`, so the match is at index 2. A search on UTF-16 code units
would find a match in all three.

### Transforming a string

A string is not changed in place: these functions return a new string.
[`stringReplace`](#stringreplace) replaces substrings,
[`trim`](#trim), [`trimStart`](#trimstart) and [`trimEnd`](#trimend) remove
characters at the ends, [`stringRepeat`](#stringrepeat) repeats a string,
and [`padStart`](#padstart) and [`padEnd`](#padend) pad it to a length.

### Case

[`toUpperCase`](#touppercase) and [`toLowerCase`](#tolowercase) map a whole
string with the Unicode default mappings, which do not depend on a locale.
For a comparison that ignores case, compare the results of
[`caseFold`](#casefold).

### Strings stay whole under broadcast and flattening

A string is one value for the functions that spread over a collection:

- **Broadcast.** A function that broadcasts over a collection gets a string
  whole, not its characters. Otherwise every such function, `String`
  included, would map over the characters, and a function with a scalar
  parameter would be mapped instead of applied.
- **`flatten`.** A function that descends into nested collections stops at
  a string.

```epsil
String("ab", 1)
// ➔ "ab1"
String("x", [1, 2])
// ➔ ["x1","x2"]
[flatten(["ab", "cd"]), flatten("ab")]
// ➔ [["ab","cd"],["ab"]]
```

### Which operations return a string

Whether a collection function returns a `string` or a `list` for a string
follows from what the function does:

- A function whose result is a part or a reordering of the characters of
  its argument returns a **string**: `reverse`, `rest`, `most`, `take`,
  `drop`, `slice`, `unique`, `sort`, `rotateLeft`, `rotateRight`, `filter`,
  `takeWhile`, `dropWhile`, `dedup`, `deleteAt`, `randomShuffle`,
  `randomSample`.

  ```epsil
  [deleteAt("abcdef", 2), reverse("abc"), sort("banana")]
  // ➔ ["acdef","cba","aaabnn"]
  [unique("banana"), dedup("aabbbc"), filter("a1b2", c => c in "0123456789")]
  // ➔ ["ban","abc","12"]
  type(randomShuffle("abcdef"))
  // ➔ TypeFrom("string")
  ```

- A function whose result is a list of runs, each a stretch, a reordering
  or a part of the characters, returns a **`list<string>`**: `chunk`,
  `partition` (all its forms), `chunkBy`, `slidingWindow`, `permutations`,
  `combinations`. `tally` is not one of them: its first component holds the
  distinct elements, so they stay characters.

  ```epsil
  [chunk("abcdef", 2), partition("abcdef", 2)]
  // ➔ [["abc","def"],["ab","cd","ef"]]
  [slidingWindow("abcd", 2), combinations("abc", 2)]
  // ➔ [["ab","bc","cd"],["ab","ac","bc"]]
  tally("banana")
  // ➔ (["b","a","n"], [1,3,2])
  ```

- `map`, `flatMap`, `scan` and `zip` return a **list**, even when the
  function returns characters. Join the result with
  [`String`](#string) or [`stringJoin`](#stringjoin).

  ```epsil
  map(c => toUpperCase(c), "abc")
  // ➔ ["A","B","C"]
  String(map(c => toUpperCase(c), "abc"))
  // ➔ "ABC"
  ```

- A function whose result is not a collection of the same kind (`length`,
  `isEmpty`, `contains`, `count`, `any`, `all`, `indexOf`, `at`, `first`,
  `last`, `position`, `find`, `reduce`, `fold`) does on a string what it
  does on any indexed collection. In LaTeX, `|s|` of a string is its
  `count`, and the `count` of a string is serialized as `|s|`.

  ```epsil
  let n = parse(#"|\text{abc}|"#)
  n
  // ➔ 3
  Latex(parse(#"|\text{abc}|"#))
  // ➔ "\vert\text{abc}\vert"
  ```

- A set function reads a string argument as its characters. `setMinus` is
  the exception: its other arguments are the values to remove, so
  `setMinus(S, "ab")` removes the string `"ab"` from `S`, not the characters
  `a` and `b`.

  ```epsil
  union({1}, "ab")
  // ➔ Set(1, "b", "a")
  setMinus({1, "ab"}, "ab")
  // ➔ Set(1)
  ```

- A numeric function (`sum`, `product`, `mean`, `max`, `gcd`, …) does not
  read a string as its characters. A character is not a number, so the
  result is an error or stays unevaluated, never a wrong number.

  ```epsil
  sum("abc")
  // ➔ error: Runtime error: expected `number`, got `character`
  max("abc")
  // ➔ max("abc")
  ```

#### The re-segmentation caveat

A function that returns a string splits it into characters, works on the
characters, then joins them and splits the result again. The join can merge
two characters into one, so the result can have fewer characters than the
argument. This follows from grapheme segmentation:

- `String(characters(s)) == s`, always.
- `characters(String(cs))` can have fewer elements than `cs`: the character
  `e` and a lone combining acute accent, each a character, join into the one
  character `é`.
- So `reverse` can change the number of characters: a combining mark that
  followed one character can end up after another one.

```epsil
String(characters("héllo")) == "héllo"
// ➔ true
[length(["e", "\u{301}"]), length(String(["e", "\u{301}"]))]
// ➔ [2,1]
characters(reverse("\u{301}a"))
// ➔ ["á"]
```

To keep a segmentation that later operations cannot change, take it as a
list with [`characters`](#characters).

### Unicode-version stability

The boundaries of grapheme clusters are defined by
[Unicode Standard Annex #29](https://unicode.org/reports/tr29/), and can
change when the Unicode data of the host (ICU) is updated:

- The number of characters of an unusual cluster can differ between hosts.
  A test that checks such a count should name the Unicode version it
  assumes.
- A literal is converted to a `character` by the same segmentation, so an
  ICU update that changes the cluster count of a literal changes whether the
  program type-checks.

Unicode scalars and their UTF-8, UTF-16 and UTF-32 encodings are fixed and
stable. Only the character view can change.

### Compiling string operations

A string operation that cannot be compiled to a target with the same
character counts fails to compile, with a diagnostic, rather than counting
code units: see [Compiling](/compute-engine/guides/compiling/).

### Annotated expressions

An **annotated expression** carries metadata that does not change what the
expression means: the color or size of its text, a tooltip, a link. It can
annotate a string, and also a variable, an operator or a function, for
instance to highlight part of a formula. In LaTeX, `\textcolor` makes an
annotated expression. Annotated expressions are like the attributed strings
of other systems. See [`Annotated`](#annotated).

```epsil
parse(#"\textcolor{blue}{\pi}"#)
// ➔ Annotated(pi, {"color" -> "blue"})
Latex(parse(#"\textcolor{blue}{\pi}"#))
// ➔ "\textcolor{blue}{\pi}"
```

When `\textcolor` (or `\color`) wraps an operator alone, such as `=` in
`x \textcolor{red}{=} y`, the operator is parsed as usual and the color is
dropped: an annotation cannot be attached to an operator alone. A colored
operand, such as `\textcolor{red}{x + 1}`, is still annotated.

```epsil
parse(#"x \textcolor{red}{=} y"#)
// ➔ x == y
parse(#"\textcolor{red}{x + 1}"#)
// ➔ Annotated(x + 1, {"color" -> "red"})
```

### Text expressions

A `Text` expression is a sequence of strings, annotated expressions and other
`Text` expressions: formatted text, such as the result of parsing
`\text{Hello \textbf{world}}`. In LaTeX, the elements of a `Text` expression
are serialized one by one, each with the commands of its formatting.

```epsil
parse(#"\text{Hello \textcolor{blue}{world}}"#)
// ➔ Text("Hello ", Annotated("world", {"color" -> "blue"}))
Latex(parse(#"\text{Hello \textcolor{blue}{world}}"#))
// ➔ "\text{Hello }\textcolor{blue}{\text{world}}"
```

A `String` converts each of its arguments to text and joins them, so the
formatting of an annotated argument is lost. Evaluating a `Text` expression
gives the same plain string:

```epsil
String("Hello ", Annotated("world", {"color" -> "blue"}))
// ➔ "Hello world"
Text("Hello ", Annotated("world", {"color" -> "blue"}))
// ➔ "Hello world"
```

### Text and LaTeX

[`LatexString`](#latexstring) marks a string as a LaTeX fragment;
[`Latex`](#latex) serializes an expression to LaTeX, and [`parse`](#parse)
parses LaTeX. The functions of the [collections](/reference/collections/)
library apply to strings.

## CharacterFrom

One character means one grapheme cluster, not one code point: a
precomposed or a decomposed `é`, an emoji sequence joined with zero-width
joiners and a flag each qualify. An empty string or a string of several
characters is an error, never a truncation.

```epsil
characterFrom("👨‍👩‍👧")
// ➔ "👨‍👩‍👧"
characterFrom("e\u{301}") == characterFrom("é")
// ➔ true
characterFrom("ab")
// ➔ error: Type error: expected `character`, got `string` at `"ab"` in `characterFrom("ab")`
characterFrom("")
// ➔ error: Type error: expected `character`, got `string` at `""` in `characterFrom("")`
```

One cluster always segments to itself, so `characterFrom(String(c)) == c`
for every character `c`.

```epsil
let c = characterFrom("x")
characterFrom(String(c)) == c
// ➔ true
```

A string literal also becomes a character where a `character` is expected:
see [The `character` type](#the-character-type).

### MathJSON

`["CharacterFrom", s]`. MathJSON has string literals but no character
literal, so `["CharacterFrom", "'x'"]` is also the form in which a character
is written: a character serializes to it, and it canonicalizes back to the
same character. A string literal converted to a character in Epsil is
written in this form too.

```json example
["CharacterFrom", {str: "x"}]
// ➔ ["CharacterFrom", "'x'"]

["Characters", {str: "abc"}]
// ➔ ["List", ["CharacterFrom", "'a'"], ["CharacterFrom", "'b'"], ["CharacterFrom", "'c'"]]
```

## StringJoin

`stringJoin` is the inverse of [`stringSplit`](#stringsplit), and does what
Python's `separator.join(parts)` does.

```epsil
stringJoin(["a", "b", "c"], ", ")
// ➔ "a, b, c"
[stringJoin([]), stringJoin(["a"]), stringJoin(characters("abc"))]
// ➔ ["","a","abc"]
```

Unlike [`String`](#string), which converts any argument to text,
`stringJoin` is strict: an element that is neither a string nor a character
is a type error when the type of the collection shows it. A collection that
is not finite leaves the expression unevaluated.

```epsil
stringJoin(["a", 1])
// ➔ error: Type error: expected `collection<character | string>`, got `list<integer | string>` at `["a", 1]` in `stringJoin(["a", 1])`
stringJoin(repeat("a"))
// ➔ StringJoin(Repeat("a"))
```

A string is the collection of its characters, so joining a string with a
separator puts the separator between its characters, as Python's
`sep.join(s)` does. A character is not a collection: put it in a list, or
use `String`.

```epsil
stringJoin("abc", "-")
// ➔ "a-b-c"
stringJoin(characterFrom("a"))
// ➔ error: Type error: expected `collection<character | string>`, got `character` at `characterFrom("a")` in `stringJoin(characterFrom("a"))`
```

#### Migrating from the variadic stringJoin

`stringJoin` used to take any number of strings and concatenate them:
`stringJoin("ab", "cd")` was `"abcd"`. It now takes one collection, and the
same call is still accepted with another meaning: the characters of `"ab"`
joined with the separator `"cd"`. There is no error, only a different
result, so check every call of `stringJoin` with more than one argument.

```epsil
stringJoin("ab", "cd")
// ➔ "acdb"
```

To concatenate a fixed number of strings, use
[`join`](/reference/collections/#join) or string interpolation, and keep
`stringJoin` for a collection to join.

```epsil
let a = "ab"
let b = "cd"
[join(a, b), "\(a)\(b)"]
// ➔ ["abcd","abcd"]
```

### MathJSON

`["StringJoin", xs]`, `["StringJoin", xs, separator]`.

```json example
["StringJoin", ["List", {str: "a"}, {str: "b"}, {str: "c"}], {str: ", "}]
// ➔ "a, b, c"

["StringJoin", ["List"]]
// ➔ ""

["StringJoin", {str: "abc"}, {str: "-"}]
// ➔ "a-b-c"
```

## StringFrom

| Format | The argument is |
| :--- | :--- |
| (none) | A finite non-negative integer, or a list of them, is read as Unicode scalars. Any other value is printed. |
| `"default"` | Printed, as the default string representation of the value |
| `"utf-8"` | A collection of UTF-8 bytes |
| `"utf-16"` | A collection of UTF-16 code units |
| `"unicode-scalars"` | A collection of Unicode scalars (the same as UTF-32), or one Unicode scalar |

With no format, a number that cannot be a code point (`NaN`, an infinity, a
number that is not an integer, a negative number, a complex number) is
printed, as is any value that is not a number: a string, a boolean, a
symbol, an expression. To print an integer instead of decoding it, give the
`"default"` format.

```epsil
[stringFrom(128287), stringFrom([127467, 127479])]
// ➔ ["🔟","🇫🇷"]
stringFrom(128287, "default")
// ➔ "128287"
[stringFrom(-1), stringFrom(1.5), stringFrom(NaN)]
// ➔ ["-1","1.5","NaN"]
```

A **tuple** of numbers is not decoded, because a tuple holds the coordinates
of a point. Use a list, or give the `"unicode-scalars"` format.

```epsil
stringFrom((65, 66))
// ➔ "(65, 66)"
stringFrom((65, 66), "unicode-scalars")
// ➔ "AB"
```

The three encoding formats take a collection of integers (or, for
`"unicode-scalars"`, one integer). A string argument is an error: a string
is a collection of characters, not of code units. Convert it first with
[`utf8`](#utf8), [`utf16`](#utf16) or [`unicodeScalars`](#unicodescalars).

```epsil
stringFrom([72, 101, 108, 108, 111], "utf-8")
// ➔ "Hello"
stringFrom([55357, 56607], "utf-16")
// ➔ "🔟"
stringFrom("abc", "utf-8")
// ➔ error: Runtime error: expected `indexed_collection<integer>`, got `string`
```

### MathJSON

`["StringFrom", value]`, `["StringFrom", value, format]`.

```json example
["StringFrom", 128287]
// ➔ "🔟"

["StringFrom", ["List", 127467, 127479]]
// ➔ "🇫🇷"

["StringFrom", 128287, {str: "default"}]
// ➔ "128287"

["StringFrom", ["List", 72, 101, 108, 108, 111], {str: "utf-8"}]
// ➔ "Hello"
```

## Utf8

The values are UTF-8 bytes, not Unicode scalars. To make a string from
UTF-8 bytes, use [`stringFrom(bytes, "utf-8")`](#stringfrom).

```epsil
utf8("👩‍🎓")
// ➔ [240,159,145,169,226,128,141,240,159,142,147]
stringFrom(utf8("👩‍🎓"), "utf-8")
// ➔ "👩‍🎓"
```

See also [`utf16`](#utf16), [`unicodeScalars`](#unicodescalars) and
[`characters`](#characters).

### MathJSON

`["Utf8", s]`.

```json example
["Utf8", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]
```

## Utf16

The values are UTF-16 code units, not Unicode scalars: a scalar above
U+FFFF is two code units. To make a string from UTF-16 code units, use
[`stringFrom(units, "utf-16")`](#stringfrom).

```epsil
utf16("👩‍🎓")
// ➔ [55357,56425,8205,55356,57235]
stringFrom(utf16("👩‍🎓"), "utf-16")
// ➔ "👩‍🎓"
```

See also [`utf8`](#utf8), [`unicodeScalars`](#unicodescalars) and
[`characters`](#characters).

### MathJSON

`["Utf16", s]`.

```json example
["Utf16", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]
```

## UnicodeScalars

A **Unicode scalar** is a Unicode code point from U+0000 to U+10FFFF,
except the surrogates U+D800 to U+DFFF. Unicode scalars are the code units
of UTF-32.

A character can be several scalars: the emoji `👩‍🎓` is one character and
three scalars. The scalars are those of the NFC form of the string, so a
decomposed `é` gives the one scalar of the precomposed form. To make a
string from Unicode scalars, use [`stringFrom`](#stringfrom).

```epsil
unicodeScalars("👩‍🎓")
// ➔ [128105,8205,127891]
[unicodeScalars("é"), unicodeScalars("e\u{301}")]
// ➔ [[233],[233]]
stringFrom(unicodeScalars("👩‍🎓"))
// ➔ "👩‍🎓"
```

See also [`utf8`](#utf8), [`utf16`](#utf16) and
[`characters`](#characters).

### MathJSON

`["UnicodeScalars", s]`.

```json example
["UnicodeScalars", {str: "👩‍🎓"}]
// ➔ ["List", 128105, 8205, 127891]
```

## Characters

A **grapheme cluster** is the smallest unit of text that a reader sees as
one character. It can be one Unicode scalar or several. The character `é`
can be one scalar (U+00E9, the precomposed form of NFC) or two (`e` U+0065
and the combining acute accent U+0301, the decomposed form of NFD), and both
are one grapheme cluster. An emoji such as `👩‍🚀` or a flag such as `🇫🇷` is
one grapheme cluster of several scalars.

| String | Characters | Unicode scalars |
| :--- | :--- | :--- |
| `é` (NFC) | `["é"]` | `[233]` |
| `é` (NFD) | `["é"]` | `[101, 769]` before NFC normalization, `[233]` after |
| `👩‍🎓` | `["👩‍🎓"]` | `[128105, 8205, 127891]` |

```epsil
[characters("e\u{301}"), characters("🇫🇷")]
// ➔ [["é"],["🇫🇷"]]
unicodeScalars("👩‍🎓")
// ➔ [128105,8205,127891]
```

The boundaries of grapheme clusters are defined by the Unicode Standard
([UAX #29](https://unicode.org/reports/tr29/)) and can change as characters,
scripts and emoji sequences are added. Unicode scalars and their UTF-8,
UTF-16 and UTF-32 encodings are fixed across Unicode versions (see
[Unicode-version stability](#unicode-version-stability)).

Iterating or indexing a string gives the same characters, so `characters` is
needed only for the list itself: to keep the segmentation from changing when
the characters are joined again (see
[The re-segmentation caveat](#the-re-segmentation-caveat)).
`String(characters(s)) == s` always holds; `characters(String(cs))` can have
fewer elements than `cs`.

`graphemeClusters` is a synonym, the original name of this function.

See also [`characterFrom`](#characterfrom), [`stringSplit`](#stringsplit),
[`utf8`](#utf8), [`utf16`](#utf16) and [`unicodeScalars`](#unicodescalars).

### MathJSON

`["Characters", s]`, and its synonym `["GraphemeClusters", s]`. The elements
of the result are characters, so they are written in the `CharacterFrom`
form.

```json example
["Characters", {str: "ab"}]
// ➔ ["List", ["CharacterFrom", "'a'"], ["CharacterFrom", "'b'"]]
```

## StringSplit

With no separator, the string is split on runs of whitespace and empty parts
are dropped. Whitespace is the code points with the Unicode `White_Space`
property (U+0009 to U+000D, U+0020, U+0085, U+00A0, U+1680, U+2000 to
U+200A, U+2028, U+2029, U+202F, U+205F, U+3000), whatever the host's `\s`
matches.

```epsil
stringSplit("the quick  brown fox")
// ➔ ["the","quick","brown","fox"]
stringSplit("a\u{a0}b\tc")
// ➔ ["a","b","c"]
```

With a separator, the string is split at each occurrence of the separator,
and empty parts are kept.

```epsil
stringSplit("a,b,,c", ",")
// ➔ ["a","b","","c"]
```

An empty separator splits into grapheme clusters, as
[`characters`](#characters) does, but the parts are one-character
**strings**, not characters. To split into characters, use `characters`, or
iterate or index the string.

```epsil
stringSplit("abc", "")
// ➔ ["a","b","c"]
type(stringSplit("abc", "")[1])
// ➔ TypeFrom("string")
```

To split on the matches of a regular expression, see
[Patterns with stringSplit and stringReplace](/reference/regexp/#patterns-with-stringsplit-and-stringreplace).

### MathJSON

`["StringSplit", s]`, `["StringSplit", s, separator]`.

```json example
["StringSplit", {str: "the quick  brown fox"}]
// ➔ ["List", "'the'", "'quick'", "'brown'", "'fox'"]

["StringSplit", {str: "a,b,,c"}, {str: ","}]
// ➔ ["List", "'a'", "'b'", "''", "'c'"]
```

## StringReplace

The occurrences of the target are found as [`rangeOf`](/reference/collections/#rangeof)
finds them, character by character, from left to right and without overlap.
The search moves past each match in the original string, so the text of a
replacement is never matched again.

```epsil
stringReplace("banana", "na", "")
// ➔ "ba"
stringReplace("aa", "a", "aa")
// ➔ "aaaa"
```

A target cannot match part of a character:

```epsil
stringReplace("x\u{301}y", "x", "z")
// ➔ "x́y"
```

Every occurrence is replaced, unless a count limits the replacements, from
the left; the count must be a positive integer. An empty target is an error:
inserting the replacement at every boundary, as the host's
`replaceAll("", x)` does, is not done. An empty replacement deletes the
target. When the string is not a string, such as a symbol with no value, the
expression stays unevaluated.

```epsil
stringReplace("a-b-c", "-", "+", 1)
// ➔ "a+b-c"
stringReplace("abc", "", "x")
// ➔ error: Runtime error: unexpected argument
stringReplace("abc", "a", "x", 0)
// ➔ error: Runtime error: unexpected argument
stringReplace(x, "a", "b")
// ➔ StringReplace(x, "a", "b")
```

A string target is always a literal sequence of characters. To replace the
matches of a regular expression, or to compute each replacement with a
function, see
[Patterns with stringSplit and stringReplace](/reference/regexp/#patterns-with-stringsplit-and-stringreplace).

### MathJSON

`["StringReplace", s, target, replacement]`,
`["StringReplace", s, target, replacement, count]`.

```json example
["StringReplace", {str: "a-b-c"}, {str: "-"}, {str: "+"}]
// ➔ "a+b+c"

["StringReplace", {str: "a-b-c"}, {str: "-"}, {str: "+"}, 1]
// ➔ "a+b-c"
```

## Trim

`trim` removes characters at both ends, `trimStart` at the start only and
`trimEnd` at the end only. With no second argument, they remove the Unicode
`White_Space` characters, as [`stringSplit`](#stringsplit) defines them.

```epsil
[trim("  hi  "), trimStart("  hi  "), trimEnd("  hi  ")]
// ➔ ["hi","hi  ","  hi"]
trim("\u{a0}hi\u{3000}")
// ➔ "hi"
```

The second argument is a **set** of characters to remove, not a prefix or a
suffix. A string stands for the set of its characters.

```epsil
trim("abcba", "ab")
// ➔ "c"
trim("--hi..", ["-", "."])
// ➔ "hi"
```

To remove a literal prefix or suffix, test it with
[`startsWith`](/reference/collections/#startswith) or
[`endsWith`](/reference/collections/#endswith), and
[`drop`](/reference/collections/#drop) it.

### MathJSON

`["Trim", s]`, `["Trim", s, chars]`, and likewise `TrimStart` and `TrimEnd`.

```json example
["Trim", {str: "xxhixx"}, {str: "x"}]
// ➔ "hi"
```

## StringRepeat

The count must be a non-negative integer: a negative count is an error, and
a count that is not an integer is a type error. Like every concatenation,
the result is segmented again, so repeating a lone combining mark does not
multiply the number of characters.

```epsil
stringRepeat("ab", 0)
// ➔ ""
stringRepeat("ab", -1)
// ➔ error: Runtime error: unexpected argument
length(stringRepeat("\u{301}", 3))
// ➔ 1
```

The name is `stringRepeat`, not `repeat`, because
[`repeat`](/reference/collections/#repeat) makes an infinite collection.

### MathJSON

`["StringRepeat", s, n]`.

```json example
["StringRepeat", {str: "ab"}, 3]
// ➔ "ababab"
```

## PadStart

`padStart` adds copies of the padding before the string and `padEnd` after
it, until the string has the given number of **characters**. A string that
already has that many characters or more is returned unchanged.

```epsil
[padStart("7", 3, "0"), padEnd("7", 3, "0"), padStart("abc", 2, "0")]
// ➔ ["007","700","abc"]
```

The padding is a space by default. A padding of several characters is
repeated, and its last copy is cut at a character boundary to fit exactly.

```epsil
padStart("ab", 3)
// ➔ " ab"
padEnd("ab", 7, "123")
// ➔ "ab12312"
padStart("ab", 4, "👨‍👩‍👧x")
// ➔ "👨‍👩‍👧xab"
```

The length must be a non-negative integer. An empty padding is an error:
it cannot reach the length, and returning the string unchanged would hide
the mistake.

```epsil
padStart("ab", 4, "")
// ➔ error: Runtime error: unexpected argument
```

Padding counts characters, not display columns: it does not align text in a
terminal or in a proportional font.

### MathJSON

`["PadStart", s, n]`, `["PadStart", s, n, pad]`, and likewise `PadEnd`.

```json example
["PadStart", {str: "7"}, 3, {str: "0"}]
// ➔ "007"

["PadEnd", {str: "ab"}, 7, {str: "123"}]
// ➔ "ab12312"
```

## ToUpperCase

`toUpperCase` and `toLowerCase` map the whole string, not each character on
its own, because case mapping depends on the context:

- **The number of characters can change.** The German `ß` is two characters
  in upper case.
- **The Greek final sigma depends on its position.** A `Σ` at the end of a
  word is `ς` in lower case, not `σ`.

```epsil
[length("straße"), length(toUpperCase("straße"))]
// ➔ [6,7]
toLowerCase("ΟΔΟΣ")
// ➔ "οδος"
```

There is no locale argument, so the Turkish dotless i is not available:
`toLowerCase("I")` is `"i"` on every host, which keeps canonical forms and
keys the same everywhere. To compare strings without regard to case, use
[`caseFold`](#casefold), not `toLowerCase`.

```epsil
toLowerCase("I")
// ➔ "i"
```

### MathJSON

`["ToUpperCase", s]`, `["ToLowerCase", s]`.

```json example
["ToUpperCase", {str: "hello"}]
// ➔ "HELLO"

["ToLowerCase", {str: "HELLO"}]
// ➔ "hello"
```

## CaseFold

The folded form is a key for comparison, not text to display. `caseFold`
and `toLowerCase` differ where lower case depends on the context: the
lower case of `"ΟΔΟΣ"` ends with the final sigma `ς`, and its folded form
with the sigma `σ`, so the folded forms of both spellings are equal.

```epsil
[toLowerCase("ΟΔΟΣ"), caseFold("ΟΔΟΣ")]
// ➔ ["οδος","οδοσ"]
caseFold("ΟΔΟΣ") == caseFold("οδοσ")
// ➔ true
toLowerCase("ΟΔΟΣ") == toLowerCase("οδοσ")
// ➔ false
```

#### An approximation of Unicode case folding

The host has no case-folding function, so the fold is the lower case of the
upper case, with the final sigma (U+03C2) replaced by the sigma (U+03C3).
This gives the result of Unicode full case folding for Latin, Greek and
Cyrillic text, `ß` and `SS` included. It differs for a few characters that
Unicode's `CaseFolding.txt` maps in a special way, among them Cherokee and
some Turkic and Lithuanian sequences.

### MathJSON

`["CaseFold", s]`.

```json example
["CaseFold", {str: "Straße"}]
// ➔ "strasse"

["Equal", ["CaseFold", {str: "ΟΔΟΣ"}], ["CaseFold", {str: "οδοσ"}]]
// ➔ "True"
```

## StringCompare

The order is the order of the Unicode code points of the NFC forms, compared
one position at a time. A string that is a proper prefix of another comes
first. The order is not locale-aware, so that the identity of values, keys
and match plans is the same on every host. A locale-aware collation would be
a new argument, not a change to this order.

```epsil
stringCompare("ab", "abc")
// ➔ -1
stringCompare("e\u{301}", "é")
// ➔ 0
```

#### Where this differs from `<` {#where-this-differs-from}

`<` and the other comparison operators compare two strings by their UTF-16
code units. That puts the characters from U+10000 up, which are encoded with
surrogates from U+D800, before the characters from U+E000 to U+FFFF.
`stringCompare` puts them after, as their code points do. For all other
text, every character below U+D800 (Latin, Greek, Cyrillic, CJK), the two
orders are the same. Use `stringCompare` when the order must be that of the
code points.

```epsil
stringCompare("\u{E000}", "\u{1F600}")
// ➔ -1
"\u{E000}" < "\u{1F600}"
// ➔ false
```

### MathJSON

`["StringCompare", a, b]`.

```json example
["StringCompare", {str: "a"}, {str: "b"}]
// ➔ -1

["StringCompare", {str: "ab"}, {str: "abc"}]
// ➔ -1
```

## IntegerString

The base is from 2 to 36, 10 by default. The sign is kept, and an integer
greater than $2^{53}$ stays exact. A base outside 2 to 36 is an
`out-of-range` error. A symbol with no value, as the integer or as the base,
leaves the call unevaluated.

```epsil
integerString(-42)
// ➔ "-42"
integerString(30!)
// ➔ "265252859812191058636308480000000"
integerString(5, 37)
// ➔ error: Runtime error: out of range: 2, 36, 37 at `37`
[integerString(x), integerString(5, b)]
// ➔ [IntegerString(x),IntegerString(5, b)]
```

With a length, the digits of the absolute value are padded with zeros on the
left, or cut to their last digits, and the sign is dropped. The length is at
most 1,000,000; a greater length leaves the call unevaluated.

```epsil
[integerString(-5, 2, 8), integerString(1234, 10, 2)]
// ➔ ["00000101","34"]
```

`integerString` broadcasts: applied to a list of integers, it returns a list
of strings.

```epsil
integerString([1, 2, 10], 2)
// ➔ ["1","10","1010"]
```

See also [`digitsFrom`](#digitsfrom) and [`baseForm`](#baseform).

### MathJSON

`["IntegerString", n]`, `["IntegerString", n, base]`,
`["IntegerString", n, base, length]`.

```json example
["IntegerString", 255, 16]
// ➔ "ff"

["IntegerString", 5, 2, 8]
// ➔ "00000101"
```

## DigitsFrom

The base is from 2 to 36, 10 by default. Whitespace before and after the
digits is ignored, and a sign is read, also before a prefix. With no base,
a `0x` or `0b` prefix selects base 16 or 2. With a base, a prefix is read
only when it is the prefix of that base: in base 10, `0b101` is an
`unexpected-digit` error, and in base 16, `0b1` is the hexadecimal number
`b1`. An integer greater than $2^{53}$ stays exact.

```epsil
[digitsFrom(" -42 "), digitsFrom("0xff"), digitsFrom("-0x1F"), digitsFrom("0b101", 2)]
// ➔ [-42,255,-31,5]
[digitsFrom("0b1", 16), digitsFrom("0x1F", 16)]
// ➔ [177,31]
digitsFrom("0b101", 10)
// ➔ error: Runtime error: unexpected digit: b at `b101`
digitsFrom("z", 36)
// ➔ 35
digitsFrom("123456789012345678901234567890")
// ➔ 123456789012345678901234567890
```

A digit that is not valid in the base is an `unexpected-digit` error, and a
base outside 2 to 36 an `unexpected-base` error.

```epsil
digitsFrom("12", 2)
// ➔ error: Runtime error: unexpected digit: 2 at `2`
digitsFrom("12", 37)
// ➔ error: Runtime error: unexpected base: 37 at `37`
```

See also [`integerString`](#integerstring), [`baseForm`](#baseform) and
[`numberFrom`](#numberfrom).

### MathJSON

`["DigitsFrom", s]`, `["DigitsFrom", s, base]`.

```json example
["DigitsFrom", {str: "-42"}]
// ➔ -42

["DigitsFrom", {str: "0xff"}]
// ➔ 255
```

## NumberFrom

Unlike [`digitsFrom`](#digitsfrom), which reads integers only, `numberFrom`
reads fractions, exponents and the spellings of the infinities and `NaN`.

The grammar is fixed, so that hosts cannot differ: any amount of Unicode
`White_Space` before and after, an optional `+` or `-` sign, then either a
decimal numeral (ASCII digits, an optional `.` and fraction, an optional `e`
or `E` exponent) or one of the spellings `oo`, `+oo`, `-oo`, `NaN`,
`Indeterminate`.

| Input | Result | Why |
| :--- | :--- | :--- |
| `"42"`, `"-42"`, `"+7"`, `" 42 "` | `42`, `-42`, `7`, `42` | An integer numeral, with a sign and whitespace around it |
| `"3.14"`, `"1e-3"`, `"1.5e3"` | `3.14`, `0.001`, `1500` | A fraction and an exponent |
| `".5"` | `0.5` | A leading `.` needs no integer part |
| `"oo"`, `"+oo"`, `"-oo"`, `"NaN"`, `"Indeterminate"` | `+oo`, `+oo`, `-oo`, `NaN`, `NaN` | The spellings of Epsil for the infinities and NaN |
| `"5."` | `invalid-number` error | A `.` with no fraction digits after it is not a numeral |
| `""` | `invalid-number` error | The empty string is not a number |
| `"abc"`, `"12abc"` | `invalid-number` error | The **whole** string must be a numeral, not only its start |
| `"1/3"` | `invalid-number` error | Not a numeral: make the fraction with arithmetic |
| `"0x1f"`, `"1_000"`, `"Infinity"`, `"nan"` | `invalid-number` error | Not in the grammar: the spellings are exact, and case-sensitive |
| `"٣"` (Arabic-Indic three) | `invalid-number` error | ASCII digits only, so that digits that look alike cannot pass |

```epsil
[numberFrom(" +7 "), numberFrom("1e-3"), numberFrom(".5")]
// ➔ [7,0.001,0.5]
[numberFrom("oo"), numberFrom("-oo"), numberFrom("NaN")]
// ➔ [+oo,-oo,NaN]
numberFrom("5.")
// ➔ error: Runtime error: invalid number: 5. at `"5."`
numberFrom("٣")
// ➔ error: Runtime error: invalid number: ٣ at `"٣"`
```

A failure is always an error value, never `NaN`: `NaN` is the result of
reading `"NaN"`, so it cannot also mean that the reading failed.

```epsil
isError(numberFrom("12abc"))
// ➔ true
```

A numeral with no fraction and no exponent gives an exact integer. A numeral
with a fraction or an exponent gives an exact decimal, which `N`
approximates.

With a base (2 to 36), as for `digitsFrom`, only integer numerals are read:

```epsil
numberFrom("1010", 2)
// ➔ 10
numberFrom("1.5", 16)
// ➔ error: Runtime error: invalid number: 1.5 at `"1.5"`
numberFrom("11", 37)
// ➔ error: Runtime error: unexpected base: 37 at `37`
```

See also [`digitsFrom`](#digitsfrom), [`integerString`](#integerstring) and
[`String`](#string).

### MathJSON

`["NumberFrom", s]`, `["NumberFrom", s, base]`.

```json example
["NumberFrom", {str: "-1.5e2"}]
// ➔ -150

["NumberFrom", {str: "ff"}, 16]
// ➔ 255
```

## BaseForm

`baseForm` evaluates to the number it represents, so a number written in a
base takes part in arithmetic. The base is an integer from 2 to 36, 10 by
default.

```epsil
baseForm(23, 2) + 1
// ➔ 24
baseForm(11, 2) * baseForm(5, 2)
// ➔ 55
```

#### Parsing

In LaTeX, a numeral with an integer subscript, such as `10111_2` or
`2748_{16}`, is parsed as `BaseForm` when every digit is valid in the base.
Otherwise it stays a `Subscript`.

```epsil
parse("10111_2")
// ➔ BaseForm(23, 2)
parse("19_2")
// ➔ Subscript(19, 2)
let q = parse("11_8 - 3_8 = 6_8")
q
// ➔ true
```

A symbol subscript, such as `161_b`, is parsed as `BaseForm` of the
polynomial of the digits in that base, so an equation in an unknown base can
be solved:

```epsil
parse("161_b")
// ➔ BaseForm(b^2 + 6b + 1, b)
let e = parse("161_b + 134_b = 315_b")
solve(e, b)
// ➔ [0,8]
```

### MathJSON

`["BaseForm", value]`, `["BaseForm", value, base]`. In LaTeX, `BaseForm` is
written `value_{base}`, with the digits in the base, and a digit above 9 as
a letter: `["BaseForm", 42, 16]` is `\mathrm{2a}_{16}`.

```json example
["BaseForm", 23, 2]
// ➔ 23
```

## Delimiter

`Delimiter` is inert: `Delimiter(expr)` evaluates to `expr`. It holds the
delimiters and separators with which `expr` is displayed. `expr` is a
function expression, usually a `Sequence`, not a symbol or a number.

The optional second argument is a string:

- One character: the separator.
- Two characters: the opening and the closing delimiters.
- Three characters: the opening delimiter, the separator and the closing
  delimiter.

The opening and closing delimiters are each one of the characters
`()[]{}<>|‖⌈⌉⌊⌋⌜⌝⌞⌟⎰⎱"`, and do not have to match: `")]"` is a valid pair. A
`.` as a delimiter means no delimiter. The separator is one of `,;.&:|-`,
U+00B7 MIDDLE DOT, U+2022 BULLET or U+2026 HORIZONTAL ELLIPSIS.

With no second argument, the delimiters depend on `expr`: `(,)` for a
`Sequence`, a tuple, `Single`, `Pair` or `Triple`, `[,]` for a list and
`{,}` for a set.

### MathJSON

`["Delimiter", expr]`, `["Delimiter", expr, delim]`. In LaTeX, `expr` is
written between the delimiters, with the separator between its elements:
`["Delimiter", ["Sequence", 1, 2, 3], "'{;}'"]` is
`\lbrace1;2;3\rbrace`. The angle brackets `<>` and `⟨⟩` are written
`\langle` and `\rangle`, and `‖`, `⌈⌉` and `⌊⌋` as `\Vert`, `\lceil \rceil`
and `\lfloor \rfloor`. Square brackets are written as parentheses:
`["Delimiter", ["Sequence", 1, 2, 3], "'[,]'"]` is `(1,2,3)`, because a group
in square brackets is read back as a `List`, not as the sequence.

## Annotated

`Annotated(expr, attributes)` behaves as `expr` and carries metadata in the
dictionary `attributes`. The metadata has no effect on evaluation:
`Annotated` is inert and evaluates to `expr`. Use it to attach style or
meaning for display, such as a color, a tooltip or a highlight. See
[Annotated expressions](#annotated-expressions).

```epsil
Annotated(1 + 1, {"color" -> "red"})
// ➔ 2
```

#### Attributes

The LaTeX serializer reads these keys:

- `color`: a color name or a hex code, written with `\textcolor`.
- `backgroundColor`: a color name or a hex code, written with `\colorbox`.
- `mathStyle`: `"normal"` (display math), `"compact"` (inline math),
  `"script"` or `"scriptscript"`.
- `size`: a number from 1 to 10, where 5 is the normal size.
- `fontFamily`: `"monospace"` or `"sans-serif"`.
- `fontWeight`: `"bold"`.
- `fontStyle`: `"italic"` or `"normal"`.
- `border`: `True` for a box around the expression.

Other keys, such as `tooltip`, `link`, `language`, `cssClass` and `cssId`,
are kept with the expression for the application that displays it.

### MathJSON

`["Annotated", expr, ["Dictionary", …]]`, or with a `{dict: …}` object as
the second argument.

```json example
["Equal",
  "circumference",
  ["Multiply", 2, ["Annotated", "Pi", {"dict": {"color": "blue"}}], "r"]
]
```

In LaTeX, this is `\mathrm{circumference} = 2 \cdot \textcolor{blue}{\pi} \cdot r`.

## Program

The source of an Epsil program, a file or the text of `epsil -e`, is a
`Program`. It evaluates its statements in the caller's scope, so its
declarations stay available after it: each entry of the REPL is a program,
and the next entry sees its declarations. A braced sequence inside a
program is a [`Block`](/reference/core/#block), whose declarations are
local.

Type and protocol declarations are prepared first, then the `function`
statements and the signatures that go with them, then the other statements
in source order. So a `function` statement can be called before it is
written, and its clauses can be spread over the program. A variable whose
value is a function follows the order of the statements instead.

```epsil
g(2)
function g(x) { x + 1 }
// ➔ 3
h(2)
let h = x => x + 1
// ➔ error: Static error: `h` is used before the statement that declares it in this block in `h(2)`
```

A declaration sets the contract of its variable. Without an annotation, a
variable whose value is a number has the type `number`, and one whose
value is a function has the type `function`. A function stored in a
variable keeps its own argument checks, defaults and closure, and a new
function assigned to the variable does not make a new contract. An
annotation is a contract too, and a `const` rejects every assignment.

```epsil
let x = 1
x = 2.5
x
// ➔ 2.5
let f = x => x + 1
f = x => x * 2
f(3)
// ➔ 6
let f = x => x + 1
f = 3
// ➔ error: Static error: `f` has the type `function`, and the value has the type `3` in `f := 3`
const c = 1
c = 2
// ➔ error: Static error: cannot assign a value to the constant `c` in `c := 2`
```

Two declarations of one name in one program are an error. A declaration
in a later program, such as the next entry of the REPL, can replace an
earlier declaration and give the name a new type.

```epsil
let a = 1
let a = 2
// ➔ error: Static error: variable redeclaration: a in `let a = 2`
```

The value of a program is the value of its last statement, or `nothing`
for an empty program and for one that ends with a declaration or an
assignment. An ordinary error in a statement is reported, and the next
statement is evaluated: the CLI then prints the error and exits with
status 1. A cancellation, such as the time limit, stops the program.

An assignment to a name that the program does not declare is an error:

```epsil
c = 5
c
// ➔ error: Static error: `c` is not declared: write `let c = …` in `c := 5`
```

### MathJSON

`["Program", statement-1, …, statement-n]`. The Epsil parser always returns
a `Program`, also for an empty source and for a single expression.

```json example
["Program", ["Declare", "b", "'unknown'", 2], "b"]
// ➔ 2, and b remains declared in the caller's scope
```

## Block

In Epsil, a block is the `{ … }` after `if`, `else`, `for`, `while` and
`function`, and `do { … }` in an expression. A block creates a scope: its
declarations are not visible after it.

```epsil
do { let b = 2; b }
b
// ➔ b
```

The value of a block is the value of its last expression. When the last
statement is a declaration or an assignment, the value is `nothing`: end
the block with the name.

```epsil
do { let b = 2; b }
// ➔ 2
```

When a statement of the block evaluates to a `break`, a `continue` or a
`Return`, the block stops there, and its value is that statement.

Scoping is lexical. A nested scope (an inner block, a branch of an `if`, a
loop body) reads the variables of the enclosing block, and an assignment to
a variable of an enclosing block updates it. A `let` in the inner block
declares a new variable, which hides the outer one in the inner block.

```epsil
let a = 1
do { a = 2 }
a
// ➔ 2
let a = 1
do { let a = 2; a } + a
// ➔ 3
```

#### Declarations and assignments

A local of a block is made only by a declaration: `let`, `const`, or a
`function` statement. An assignment `x = v` writes the variable that is in
scope, and never makes one. An assignment to a name that no scope declares
is an error, at any depth of the block, in a function body, and in the body
of a binder.

```epsil
do { c = 5; c * 2 }
// ➔ error: Static error: `c` is not declared: write `let c = …` in `do {c := 5; c * 2}`
let c = 1
do { c = 5; c * 2 }
// ➔ 10
```

A `let` without a value declares a local that an assignment gives its value
later. A read of the local before an assignment has run is an error when the
block runs, also when the assignment is in a branch that is not taken:

```epsil
do { let x; x = 3; x * 2 }
// ➔ 6
do { let x; x }
// ➔ error: Runtime error: `x` is read before it has been given a value
do { let t; if false { t = 1 }; t }
// ➔ error: Runtime error: `t` is read before it has been given a value
```

A local is not read before its declaration. The initial value of a
declaration reads the name outside the block:

```epsil
do { y; let y = 1 }
// ➔ error: Static error: `y` is used before the statement that declares it in this block in `do {y; let y = 1}`
let z = 9
do { let z = z + 1; z }
// ➔ 10
```

A second declaration of a name in one block is an error.

```epsil
do { let a = 1; let a = 2; a }
// ➔ error: Static error: variable redeclaration: a in `do {let a = 1; let a = 2; a}`
```

An assignment is a statement, never an operand: assignments do not chain.

```epsil
let a = 1
a = a = 2
// ➔ error: An assignment is a statement, not a value, so assignments do not chain; write two statements, "b := 5; a := b", or "a := (b == 5)" if the comparison was meant
```

A later assignment keeps the type of the local: its declared type, or the
type of its initial value. A number can become another number. A list
loses its fixed length and keeps the type of its elements; a tuple keeps
its number of components, whose types are widened. An empty list has
elements of an unknown type. Another type is an error.

```epsil
do { let x = 1; x = "a" }
// ➔ error: Static error: `x` has the type `number`, and the value has the type `string` in `do {let x = 1; x := "a"}`
let L = [1, 2]
L = [1, 2, 3]
L
// ➔ [1,2,3]
let L = [1, 2]
L = ["a"]
// ➔ error: Static error: `L` has the type `list<number>`, and the value has the type `list<string^1>` in `L := ["a"]`
let p = (1, 2)
p = (3, 4.5)
p
// ➔ (3, 4.5)
let p = (1, 2)
p = (1, 2, 3)
// ➔ error: Static error: `p` has the type `tuple<number, number>`, and the value has the type `tuple<integer, integer, integer>` in `p := (1, 2, 3)`
let L = []
L = ["a"]
L
// ➔ ["a"]
```

#### Local functions

A `function` statement in a block or in a function body declares a local
variable that holds the function, with the rules above: a call before the
statement is an error, and a second `function` statement or a `let` of the
same name is a redeclaration. The type of the local is the signature that
the statement writes, or `function`.

```epsil
function outer() { function inner(x) { x * 3 }; inner(2) }
outer()
// ➔ 6
do { g(2); function g(x) { x + 1 } }
// ➔ error: Static error: `g` is used before the statement that declares it in this block in `do {g(2); function g(x) {x + 1}}`
type(do { function g(x: integer) -> integer { x + 1 }; g })
// ➔ TypeFrom("(x: integer) -> integer")
```

#### Translating simultaneous assignments

A block is sequential: a later assignment sees the changes made by every
earlier statement. A source language with simultaneous assignments, such as
the Desmos action `(a → 1, b → a + 1)`, in which `b` reads the value of `a`
from before the action, cannot be translated statement by statement:

```epsil
let a = 5
let b = 0
do { a = 1; b = a + 1 }
(a, b)
// ➔ (1, 2)
```

Evaluate every right-hand side against the old values first, into fresh
locals of the block, then assign the results. The order of the assignments
then does not matter, because no temporary depends on a new value.

```epsil
let a = 5
let b = 0
do { let na = 1; let nb = a + 1; a = na; b = nb }
(a, b)
// ➔ (1, 6)
```

### MathJSON

`["Block", expr-1, …, expr-n]`.

```json example
["Block", ["Declare", "b", "'unknown'", 2]]
// ➔ Nothing

["Block", ["Declare", "b", "'unknown'", 2], "b"]
// ➔ 2

["Block", ["Declare", "c", "'unknown'", 5], ["Multiply", "c", 2]]
// ➔ 10

["Block", ["Assign", "c", 5], ["Multiply", "c", 2]]
// ➔ the error assignment-to-undeclared-variable, when no "c" is declared
//   outside the block. With a global "c", the block writes it, and is 10.
```

The error codes of the rules above are `assignment-to-undeclared-variable`,
`read-before-declaration`, `variable-redeclaration`,
`assignment-in-operand`, `assignment-type-mismatch` and
`read-before-initialization`. A `["Declare"]` without a value reserves a
local that an `["Assign"]` initializes later, as described under
[`Declare`](#declare). A `["Declare"]` is a statement of the block itself: one that
is directly a branch of an `["If"]` or a `["Which"]`, the body of a
`["Loop"]` or a case of a `["Match"]` is the error
`declaration-below-statement`. An assignment in an operand,
`["f", ["Assign", "a", 2]]` or `["Assign", "t", ["Assign", "u", 1]]`, is
`assignment-in-operand`: write
`["Block", ["Declare", "a", "'unknown'", 2], ["f", "a"]]`. An `["Assign"]`
outside every `Block` and `Program`, one that the host evaluates, declares
the name in the current scope.

The function statement is `["DefineFunction", "g", …]`. The simultaneous
assignment above, with `a` and `b` declared before the block:

```json example
["Block",
  ["Declare", "_next_a", "'unknown'", 1],
  ["Declare", "_next_b", "'unknown'", ["Add", "a", 1]],
  ["Assign", "a", "_next_a"],
  ["Assign", "b", "_next_b"]]
```

In LaTeX, semicolons (`;` or `\;`) separate the statements of a `Block`:
`x \coloneq 3; x^2 + 1` parses to
`["Block", ["Declare", "x", "'unknown'", 3], ["Add", ["Power", "x", 2], 1]]`.
The first assignment of a name is its declaration, with a value. A `where`
clause gives bindings to an expression:
`x^2 + y^2 \keyword{where} x \coloneq 3,\; y \coloneq 4` parses to a `Block` that declares `x` and `y`
and ends with `["Add", ["Power", "x", 2], ["Power", "y", 2]]`.

## Function

#### Typed parameters

A parameter with a type makes the literal a function with a named
signature, and the arguments are checked against the types when the
function is applied.

```epsil
type((x: integer) => x + 1)
// ➔ TypeFrom("(x: integer) -> integer")
((x: integer) => x + 1)(2.5)
// ➔ error: Type error: expected `integer`, got `2.5` at `2.5` in `apply((x: integer) => x + 1, 2.5)`
```

An argument with no value, whose type does not show that it fits, leaves
the application unevaluated, and a later evaluation checks the value. At a
parameter that admits every real number, the body is applied to a symbol
with no declared type.

```epsil
((x: integer) => x + 1)(m)
// ➔ Apply((x) => x + 1, m)
((x: real) => x^2)(y)
// ➔ y^2
```

`missing` at a parameter of a number type or a point type gives `missing`,
and the body does not run. A default value does not change this: a default
fills only an argument that the call leaves out. A `NaN` at a numeric
parameter, and a point of `NaN` coordinates at a point parameter, are
accepted: the body runs with them.

```epsil
map((x: integer) => x > 0, [1, missing])
// ➔ [true,missing]
((x: integer) => x + 1)(NaN)
// ➔ NaN
```

#### Return type

A return type sets the result type of the signature. When the function is
applied, a concrete result (a number, a string, a character, a boolean, or
a list or tuple of these) is checked against it. A symbolic value,
`missing`, `nothing`, `NaN` and an error value pass unchanged, and a real
float passes under `integer` or `rational`, so `N` of such a function gives
the float. Compiled code does not make this check.

```epsil
function g(n: integer) -> integer { n / 2 }
g(5)
// ➔ error: Runtime error: expected `integer`, got `rational<2.5..2.5>` at `5 / 2`
function g(n: integer) -> integer { n / 2 }
N(g(5))
// ➔ 2.5
```

A literal assigned to a name declared with a signature takes the declared
result as its return type, and is refused when the type of its body has no
value in common with that result (see
[Typed function literals](/compute-engine/guides/types/#typed-function-literals)).

#### Generic literals

A signature with a `where` clause makes the literal **generic** (see
[Generic functions](/types/#generic-functions)). A parameter whose type
names a type variable is checked against the bound of the variable, and
each application solves the variables from the arguments:

```epsil
let f: (T) -> T where T: number = (x) => x + x
f(21)
// ➔ 42
```

A `where` clause on the annotation of one parameter is not accepted: type
variables are introduced only by a clause on the whole signature.

### MathJSON

`["Function", body, param1, param2, …]`. `Function` is lazy: neither the
body nor the parameters are evaluated until the function is applied. In
LaTeX, `x \mapsto 2x` is `["Function", ["Multiply", "x", 2], "x"]`, and
`(x, y) \mapsto 2x + y` is
`["Function", ["Add", ["Multiply", "x", 2], "y"], "x", "y"]`.

A typed parameter is `["Typed", symbol, type]`, with the type a string
(`"'integer'"`) or a type-name symbol, which is normalized to a string.

```json example
["Function", ["Add", "x", 1], ["Typed", "x", "'integer'"]]
["Apply", ["Function", ["Add", "x", 1], ["Typed", "x", "'integer'"]], "m"]
// ➔ ["Apply", ["Function", ["Block", ["Add", "x", 1]], ["Typed", "x", "'integer'"]], "m"]
```

A parameter with a default value is `["Optional", parameter, default]`, and
a tuple pattern is a `["Tuple", …]` of parameter names, `_` to skip a
position, or nested patterns. A tuple pattern is one parameter:

```json example
["Apply",
  ["Function", ["Multiply", "k", "x"], "x",
    ["Optional", ["Typed", "k", "'number'"], 2]],
  3]
// ➔ 6
["Map",
  ["Function", ["Add", "p", "q"], ["Tuple", "p", "q"]],
  ["List", ["Tuple", 1, 2], ["Tuple", 3, 4]]]
// materializes to ["List", 3, 7]
```

A default that names a variable, such as `["Optional", "k", "n"]` with `n`
a variable, is the error `expected-a-literal-default`. The form
`["Typed", "k", "'number?'"]` is not accepted for a parameter: it is the
error `invalid-parameter-annotation`.

A return type is a `Typed` around the body. Canonicalization moves it inside
the body `Block`, around its last statement:

```json example
["Function", ["Typed", ["Add", "x", 1], "'integer'"], ["Typed", "x", "'integer'"]]
// canonical form:
["Function",
  ["Block", ["Typed", ["Add", "x", 1], "'integer'"]],
  ["Typed", "x", "'integer'"]]
```

A generic signature can be written as a signature string in place of the
parameter list, or as a whole-signature `Typed` on the body, which is the
canonical form. A parameter whose type names a type variable is erased to a
bare symbol; a ground one keeps its annotation.

```json example
["Function", ["Add", "x", "x"], "'(x: T) -> T where T: number'"]
["Function",
  ["Block", ["Typed", ["Add", "x", "x"], "'(x: T) -> T where T: number'"]],
  "x"]
```

In LaTeX, a parameter with no type followed by a parenthesized argument is
a call of the parameter, so a function can take a function as argument:
`(g \mapsto \int_0^1 g(x)\,dx)(t \mapsto t^2)` is `1/3`. The exception is an
argument that contains the parameter: `q \mapsto q(2q)` is the product
`2q^2`. A parameter with a number type is a value, and the juxtaposition is
a product: `((x\colon \mathrm{real}) \mapsto x(2))(3)` is `6`.

A literal with a tuple pattern, a rest parameter (`["Spread", name]`) or a
default value has no `\mapsto` notation: `(x, y) \mapsto xy` is a function
of two parameters, not of one pair. Its LaTeX is `\mathrm{Function}(…)` with
its MathJSON operands, which parses back to the same literal:
`\mathrm{Function}(xy, \mathrm{Tuple}(x, y))`. The other type annotations
are dropped in LaTeX. Wildcards in LaTeX are `\_` and `\operatorname{\_2}`:
`\_ + \operatorname{\_2}` is `["Add", "_", "_2"]`.

## Apply

The function is a function literal, a name whose value is a function, or an
expression whose value is a function. An expression that is not a function
is read as a [shorthand function literal](#shorthand-function-literals).

A function applied to fewer arguments than it declares is a function of
the remaining ones:

```epsil
((x, y) => x + y)(1)
// ➔ (_) => Apply((x, y) => x + y, 1, _)
[((x, y) => x + y)(1)(2), apply(apply((x, y) => x + y, 1), 2)]
// ➔ [3,3]
```

A function applied to more arguments than it declares is an
`unexpected-argument` error:

```epsil
((x) => x)(1, 2)
// ➔ error: Runtime error: unexpected argument
```

Compiled code does not build a function value: a partial application or a
curried call does not compile, and the interpreter evaluates it instead
(see [Function values](/compute-engine/guides/compiling/#function-values)).

### MathJSON

`["Apply", function, arg1, …]`. An expression with a compound head,
`[["g", "f"], "x"]`, is the same application as
`["Apply", ["g", "f"], "x"]`.

```json example
["Apply", ["Multiply", "_", "_"], 3]
// ➔ 9
["Apply", ["Function", ["Multiply", "x", "x"], "x"], 3]
// ➔ 9
["Apply", "Power", 2, 3]
// ➔ 8
["Apply", ["Apply", ["Function", ["Add", "x", "y"], "x", "y"], 1], 2]
// ➔ 3
```

In LaTeX, `\lhd` and `\rhd` apply a function to one argument on the left
or on the right: `f\lhd g \lhd x` and `x \rhd g \rhd f` are both
`["f", ["g", "x"]]`. `\rhd` is the [pipeline operator](#pipe).

A function operand that is a subscript on the index of a sum or a product
is read as the name of a term: `\sum_{k=1}^{2} f_k(x)` is
`["Sum", ["Apply", ["Subscript", "f", "k"], "x"], ["Limits", "k", 1, 2]]`,
which evaluates to `f_1(x) + f_2(x)`. Each term is read as the term written
alone: `f_1(x)` is a call when `f_1` is a function or has no definition, and
a product when `f_1` has a value. With `w_1 = 2` and `w_2 = 3`:

```json example
["Sum", ["Apply", ["Subscript", "w", "i"], 4], ["Limits", "i", 1, 2]]
// ➔ 20
```

## Pipe

The pipeline `|>` is described in [Pipe](/operators/#pipe) and
[Pipelines](/control-flow/#pipelines). The right-hand side must be a
function: a number, a string or a boolean is an `incompatible-type` error.
A name with no definition is not an error: the pipe gives a call, which
evaluates once the name has a definition. This differs from `apply`, which
reads a value that is not a function as a constant function.

```epsil
5 |> 3
// ➔ error: Type error: expected `function`, got `3` at `3` in `5 |> 3`
x |> f
// ➔ f(x)
```

A function whose variable can be inferred, such as `solve`, `D`, `series`
and the polynomial functions, can be a stage without the variable:

```epsil
x^2 == 4 |> solve
// ➔ [2,-2]
```

### MathJSON

`["Pipe", value, function]` evaluates to `[function, value]`. A call stage
missing required arguments receives the value as its first argument, and a
unary function literal maps over a list:

```json example
["Pipe", ["Range", 1, 10], ["Take", 3]]
// ➔ ["Take", ["Range", 1, 10], 3]
["Pipe", ["List", 1, 2, 3], ["Function", ["Power", "x", 2], "x"]]
// ➔ ["List", 1, 4, 9]
```

In LaTeX, the pipe is `\rhd`, `\triangleright`, `\vartriangleright`, `⊳`
or `|>`. A `\square` in the right-hand side is the position of the piped
value (`_` in Epsil): `x^2 = 4 \rhd \operatorname{Solve}(\square, x)` is
`["Solve", ["Equal", ["Power", "x", 2], 4], "x"]`. A function command with
no argument, such as `\ln`, `\lb` or `\sqrt`, is a function value:
`12 \rhd \ln` is `\ln(12)`. The prefix form, `\rhd f` with no left-hand
side, is the function of one argument that applies `f` to it.

## EvaluateAt

The function is applied as `apply` applies it: a function literal, a name
whose value is a function, or an expression, which is read as a shorthand
function literal of its free variables. A point that is a tuple, with one
coordinate for each parameter, gives the value at that point of a function
of several variables. A point is never a partial application: with fewer
points than the function requires, the expression stays as written.

```epsil
evaluateAt(x => x^3 / 3, 0, 1)
// ➔ 1/3
evaluateAt((x, y) => x * y, (1, 2))
// ➔ 2
evaluateAt((x, y) => x * y, 1)
// ➔ ((x, y) => x * y)|_(1)
```

When the expression has several free variables, the point or the bounds are
for `x`. Write a function literal to name another variable:

```epsil
[evaluateAt(k * x, 2, 5), evaluateAt(t => k * t, 2, 5)]
// ➔ [3k,3k]
```

The value of a derivative at a point is the derivative evaluated there. The
value of a series at a point keeps its `BigO` remainder, also under `N`:
apply `normal` to the series to drop it. A value with no closed form stays
an unevaluated `evaluateAt`.

```epsil
evaluateAt(x => D(x^2, x), 3)
// ➔ 6
evaluateAt(x => series(sin(x), x, 0), 1)
// ➔ 101/120 + BigO(1)
```

### MathJSON

`["EvaluateAt", function, point]`, `["EvaluateAt", function, lower, upper]`.

```json example
["EvaluateAt", ["Function", ["Power", "x", 2], "x"], 3]
// ➔ 9
["EvaluateAt", ["Function", ["Divide", ["Power", "x", 3], 3], "x"], 0, 1]
// ➔ ["Rational", 1, 3]
```

In LaTeX, `\left.\left(x^2\right)\right|_{x=3}` is the value at 3, and
`\left.\left(\frac{x^3}{3}\right)\right|_{x=0}^{1}` the difference between
two bounds. `\left.\left(xy\right)\right|_{x=1, y=2}` is
`["EvaluateAt", ["Function", ["Multiply", "x", "y"], "x", "y"], ["Tuple", 1, 2]]`.
When the bracket does not name the variable, it is `x`:
`\left.kx\right|_{2}^{5}` is `3k`; write
`\left.\left(kt\right)\right|_{t=2}^{5}` for another variable.

The variable of a derivative, of a series or of an indefinite integral is
free in its result, so substituting a value for that variable gives an
`EvaluateAt`: `["D", ["Power", "x", 2], "x"]` with `x` replaced by `3` is
`["EvaluateAt", ["Function", ["D", ["Power", "x", 2], "x"], "x"], 3]`,
which evaluates to `6`.
