---
title: Core
slug: /compute-engine/reference/core/
---

<Intro>
The functions described in this section are part of the **core** of the Compute
Engine.
</Intro>


## Constants

The symbols below are **inert constants**. They are used as tags and have no
value other than themselves.

| Symbol      | Description                                                                                                                                                                        |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `All`       | All the possible values apply                                                                                                                                                      |
| `None`      | None of the possible values apply                                                                                                                                                  |
| `Nothing`   | An **optional** expression is not present. Used in sparse list to indicate skipped elements.                                                                                       |
| `Undefined` | The result is not defined.<br/>Note that for numbers, the equivalent is `NaN` (Not a Number) |

<Latex value="\lbrack 2, ,3 \rbrack "/>

```json example
["List", 2, "Nothing", 3]
```


## Declaring, Assigning and Assuming

A `["Declare"]` expression is used to declare a symbol in the current scope.

Once a symbol has been declared, its value can be changed using an
`["Assign"]` expression.

An `["Assume"]` expression is used to assert a predicate about an expression. It is
used to provide additional information to the system, for example to indicate
that a variable is positive.

<nav className="hidden">
### Declare
</nav>
<FunctionDefinition name="Declare">

<Signature name="Declare">_symbol_, _type_</Signature>

<Signature name="Declare">_symbol_, _type_, _value_</Signature>

<Signature name="Declare">_symbol_, _attributes_</Signature>

Declare a new symbol in the current scope, and optionally set its type and
value.

If a _value_ is provided, `Declare` evaluates to that value; otherwise it
evaluates to `Nothing`. If the symbol already has a definition in the current
scope, evaluating the expression **throws** an error (it does not return an
error value).

This is equivalent to `let` in JavaScript or `var` in Python.

An optional trailing _attributes_ dictionary provides additional properties of
the definition — mirroring the `ce.declare()` API — using any of these keys:

- `type`: the type of the symbol
- `value`: the initial value of the symbol
- `constant`: if `True`, the symbol is a **constant**: its value cannot be
  changed (a later `["Assign"]` is rejected)
- `holdUntil`: `"never"`, `"evaluate"` or `"N"` — controls when the symbol's
  value is substituted during evaluation, as for built-in constants such as
  `Pi`

A positional _type_ or _value_ takes precedence over the same key in the
dictionary.

```json example
// Declare the speed of light as an immutable constant
["Declare", "c", "integer", 299792458, ["Dictionary",
  ["KeyValuePair", "constant", "True"]]]
```

**To change the value of an existing (non-constant) symbol**, use an
`["Assign"]` expression.

`Declare` is not a [pure function](/compute-engine/guides/expressions#pure-expressions)
since it changes the state of the Compute Engine.



<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`ce.declare()` to declare a new symbol. </ReadMore>

</FunctionDefinition>

<nav className="hidden">
### DeclareType
</nav>
<FunctionDefinition name="DeclareType">

<Signature name="DeclareType">_name_, _type_</Signature>

<Signature name="DeclareType">_name_, _type_, _attributes_</Signature>

Declare a new type in the current scope — the MathJSON mirror of the
`ce.declareType()` API. The _name_ is a symbol (or string) naming the type;
the _type_ operand is a string holding a type expression.

By default the declared type is **nominal**: only a value whose type is the
named type itself is compatible. An optional trailing _attributes_ dictionary
with the key `alias` set to `True` declares a **structural alias** instead:
any value whose type matches the definition is compatible.

```json example
// A structural alias: any pair of numbers is a "point"
["DeclareType", "point", "'tuple<number, number>'", ["Dictionary",
  ["KeyValuePair", "alias", "True"]]]
```

The declaration also declares a **value constructor** — an operator of the
same name, in the same scope, which is what makes a nominal type inhabitable:

```json example
["DeclareType", "point", "'tuple<x: number, y: number>'"]

["point", 1, 2]
// ➔ ["point", 1, 2], of type "point"
```

The constructor's signature comes from the definition: a `tuple` definition
gives one argument per element (named, if the elements are named), and any
other definition gives a single argument. A **`record`** definition is the
exception: it declares no constructor, since building a record from
positional arguments would depend on the order its fields happen to be
written in. Arguments are validated against that signature, so a wrong arity
or an argument of the wrong type produces the usual error value.

A **nominal** constructor is inert: the application is the value, and its
type is the declared type. An **alias** constructor is a checked identity
instead — `["pair", 1, 2]` validates `(1, 2)` against the definition and
evaluates to that plain tuple.

Because the declaration claims both the type name and the value name, it is
**atomic**: if the current scope already has a value or operator of that
name, nothing is registered and an error value is returned. (A name in an
outer scope is shadowed, not conflicted.) The host API's `mint` option has no
`attributes` equivalent: a declaration through this operator always declares
a constructor.

Evaluates to `Nothing`. The declaration takes effect at canonicalization time,
so later statements of the same `["Block"]` can use the type in their own
annotations. A `DeclareType` for a name that an earlier `DeclareType`
statement declared **replaces** that definition — constructor included — so
re-running a program on the same engine works; a name declared any other way
(e.g. via `ce.declareType()`) reports an error value instead.

In Cortex, the `type` statement lowers to this operator. The bare form
declares a **nominal** type (no attributes); the `type alias` form declares a
**structural alias** (the `alias -> True` attributes dictionary):

```js
type point = tuple<x: number, y: number>  // nominal
type alias pair = tuple<number, number>   // structural alias
let p = point(1, 2)
let a: pair = (1, 2)
```

`DeclareType` is not a [pure function](/compute-engine/guides/expressions#pure-expressions)
since it changes the state of the Compute Engine.

<ReadMore path="/compute-engine/guides/types/#defining-new-types" >Read more
about defining new types. </ReadMore>

</FunctionDefinition>

<nav className="hidden">
### Assign
</nav>
<FunctionDefinition name="Assign">

<Signature name="Assign">_symbol_, _value_</Signature>

Set the value of `symbol` to `value`.

The _value_ operand is evaluated **eagerly**, when the assignment is
evaluated: any symbol that has a value at that moment is substituted
permanently. A symbol with no value (an unknown) remains symbolic in the
stored value, and resolves to its current value whenever `symbol` is
evaluated. See
[When Is the Value Captured?](/compute-engine/guides/augmenting/#when-is-the-value-captured)
for details.

If `symbol` has not been declared in the current scope, consider parent
scopes until a definition for the symbol is found.

If a definition is found, change the value of the symbol to `value` if the
value is compatible with the type of the symbol: once set, the type of
a symbol cannot be changed.

If there is no definition for the symbol, add a new definition in the
current scope, and use the `value` to infer the type of the symbol.

This is equivalent to `=` in many programming languages.

`Assign` is not a [pure function](/compute-engine/guides/expressions#pure-expressions).

<ReadMore path="/compute-engine/guides/augmenting/" >Read more about using
`Assign` to change the value of a symbol or function. </ReadMore>

</FunctionDefinition>

<nav className="hidden">
### Assume
</nav>
<FunctionDefinition name="Assume">

<Signature name="Assume">_predicate_</Signature>

The predicate is an expression that evaluates to `True` or `False`.

The symbols in the predicate expression may be free, i.e. they may not have 
been declared yet. Asserting an assumption does not declare the symbols in 
the predicate.

The predicate can take the form of:

- an equality: `["Assume", ["Equal", "x", 3]]`
- an inequality: `["Assume", ["Greater", "x", 0]]`
- a membership expression: `["Assume", ["Element", "x", "Integers"]]`

`Assume` evaluates to a **string** reporting the outcome:

<div className="symbols-table first-column-header" style={{"--first-col-width":"20ch"}}>

| Outcome              | Meaning                                                     |
| :------------------- | :---------------------------------------------------------- |
| `"ok"`               | the assumption was recorded                                  |
| `"tautology"`        | the assumption is already implied by the existing ones       |
| `"contradiction"`    | the assumption conflicts with the existing ones              |
| `"not-a-predicate"`  | the argument is not a proposition that can be assumed        |
| `"internal-error"`   | the assumption could not be processed                        |

</div>

```json example
["Assume", ["Greater", "x", 0]]
// ➔ "ok"

["Assume", ["Greater", 1, 0]]
// ➔ "tautology"

["Assume", ["Less", 1, 0]]
// ➔ "contradiction"
```

Every outcome is reported as a value: an argument that is not a predicate does
not raise an error.

```json example
["Assume", 42]
// ➔ "not-a-predicate"
```

`Assume` is not a [pure function](/compute-engine/guides/expressions#pure-expressions)
since it changes the state of the Compute Engine.

The `ce.assume()` method returns the same outcomes as a JavaScript string. See
[Assumptions](/compute-engine/guides/assumptions/) for details.

</FunctionDefinition>

<nav className="hidden">
### HoldValues
</nav>
<FunctionDefinition name="HoldValues">

<Signature name="HoldValues">_body_</Signature>

<Signature name="HoldValues">_body_, _symbols_</Signature>

Evaluate _body_ with its assigned free symbols **shielded**: for the duration
of the evaluation, each such symbol becomes a pure symbol — its declared type
and any in-scope assumptions apply, but its assigned value does **not**. This
is the value-blind counterpart of evaluating _body_ directly, analogous to
Mathematica's `Block[{x}, …]`.

With a single argument, every assigned, non-constant free symbol of _body_ is
shielded. With a second _symbols_ argument (a `List`, `Set`, `Tuple`, or a
single symbol) only the listed symbols are shielded; every other symbol
resolves normally.

Built-in constants (`Pi`, `ExponentialE`, …) are never shielded, in-scope
assumptions survive the shield, and the global values are intact after the
evaluation.

```json example
// With x := 5 and a := 3
["HoldValues", ["Together", ["Add", ["Divide", 1, "x"], ["Divide", "a", ["Power", "x", 2]]]]]
// ➔ ["Divide", ["Add", "a", "x"], ["Power", "x", 2]]   (without the wrapper: 8/25)

["HoldValues", ["Add", ["Power", "x", 2], "a"], ["List", "a"]]
// ➔ ["Add", 25, "a"]   (x resolves, a shielded)
```

Because the `Simplify` operator evaluates its argument before applying its
rules, `HoldValues` is how you keep an assigned symbol symbolic through a
`Simplify` on the operator surface — e.g. `["HoldValues", ["Simplify", ["Abs", "w"]]]`
with `w := 5` is `|w|`, not `5`.

**Granular alternative.** To shield a single symbol with a specific type rather
than blanket-shielding, compose `Block` and `Declare`: declaring the symbol
afresh in a local scope shadows the outer value for the block's duration.

```json example
// With w := 5
["Block", ["Declare", "w", "'real'"], ["Simplify", ["Abs", "w"]]]
// ➔ ["Abs", "w"]
```

</FunctionDefinition>


## Structural Operations

The following functions can be applied to non-canonical expressions.
They do not depend on the canonical form, but reflect the structure of the
expression.

<nav className="hidden">
### About
</nav>
<FunctionDefinition name="About">

<Signature name="About">_symbol_</Signature>

Evaluate to a dictionary expression containing information about a symbol
such as its type, its attributes, its value, etc...

</FunctionDefinition>


<nav className="hidden">
### Head
</nav>
<FunctionDefinition name="Head">

<Signature name="Head">_expression_</Signature>

Evaluate to the head of _expression_

```json example
["Head", ["Add", 2, 3]]

// ➔ "Add"
```

</FunctionDefinition>

<nav className="hidden">
### Tail
</nav>
<FunctionDefinition name="Tail">

<Signature name="Tail">_expression_</Signature>

Evaluate to a sequence of the arguments of _expression_.

```json example
["Tail", ["Add", 2, 3]]
// ➔ ["Sequence", 2, 3]
```

`Tail` can be used to change the head of an expression, for example:

```json example
["Multiply", ["Tail", ["Add", 2, 3]]]
// ➔ ["Multiply", 2, 3]
```


</FunctionDefinition>



<nav className="hidden">
### Hold
</nav>
<FunctionDefinition name="Hold">

<Signature name="Hold">_expression_</Signature>

Tag an expression that should be kept in an unevaluated form

</FunctionDefinition>

<nav className="hidden">
### Identity
</nav>
<FunctionDefinition name="Identity">

<Signature name="Identity">_expression_</Signature>

Evaluate to its argument

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

</FunctionDefinition>



## Inspecting an Expression

The following functions can be used to obtain information about an expression.


<nav className="hidden">
### Type
</nav>
<FunctionDefinition name="Type">

<Signature name="Type">_expression_</Signature>

Evaluate to the type of _expression_, as a string.

```json example
["Type", 2.4531]

// ➔ "finite_real"
```

<ReadMore path="/compute-engine/guides/types" >Read more about the
**type system**. </ReadMore>

</FunctionDefinition>


<nav className="hidden">
### IsSame
</nav>
<FunctionDefinition name="IsSame">

<Signature name="IsSame">_expression1_, _expression2_</Signature>

Evaluate to `True` if the two expressions are structurally identical, otherwise
evaluate to `False`.

```json example
["IsSame", ["Add", 2, 3], ["Add", 2, 3]]
// ➔ True
```

To compare two expressions for mathematical equality, use `Equal`.

To compare two expressions structurally, but ignoring the order of the arguments
of commutative functions, use [`CanonicalForm`](#CanonicalForm).


See [Comparing Expressions](/compute-engine/guides/symbolic-computing/#comparing-expressions) for other options to compare two expressions, such 
as the `Equal` function.

</FunctionDefinition>

<nav className="hidden">
### Same
</nav>
<FunctionDefinition name="Same">

<Signature name="Same" returns="boolean">_expression1_, _expression2_, ...</Signature>

Evaluate to `True` if every adjacent pair of operands is **syntactically
identical**, otherwise `False`. This is the `===` operator in Cortex, also
written `≣` (U+2263). It is the operator counterpart of the `expr.isSame()`
method.

`Same` is **total**: it always decides. It compares the canonical form of its
operands as written — with no tolerance, and without numerically approximating
an exact value.

```json example
["Same", ["Sqrt", 2], 1.4142135623730951]
// ➔ "False"

["Equal", ["Sqrt", 2], 1.4142135623730951]
// ➔ "True"
```

`Same` **never dereferences the value of a symbol**: two expressions that are
written differently are not the same, even if they have the same value. With
`x` assigned the value `5`, `["Same", "x", 5]` is `False` while
`["Equal", "x", 5]` is `True`.

`Equal` is the semantic, tolerant comparison: it may stay unevaluated when the
answer is not known, since `x = y` is a *condition*. `Same` answers regardless:

```json example
["Same", "x", "y"]
// ➔ "False"

["Equal", "x", "y"]
// ➔ ["Equal", "x", "y"]  (unevaluated)
```

Number leaves compare by **exact value**, not by notation:

```json example
["Same", 0.5, ["Divide", 1, 2]]
// ➔ "True"
```

Totality also means `Same` has no IEEE exemption for `NaN`, where `Equal`
does. This holds inside a collection as well:

```json example
["Same", "NaN", "NaN"]
// ➔ "True"

["Equal", "NaN", "NaN"]
// ➔ "False"

["Same", ["List", "NaN"], ["List", "NaN"]]
// ➔ "True"

["Equal", ["List", "NaN"], ["List", "NaN"]]
// ➔ "False"
```

`Same` is not broadcast over collections: a list operand is compared as a
whole, so `["Same", ["List", 1, 2], ["List", 1, 2]]` is the scalar `True`, not
a list of booleans.

With more than two operands, `Same` is a chain — `["Same", 1, 1, 1]` is
`True` — matching the Cortex spelling `a === b === c`.

**`Same` vs `IsSame`.** [`IsSame`](#IsSame) compares its operands exactly as
written, while `Same` compares their canonical forms. So
`["IsSame", ["Add", 1, 1], 2]` is `False`, but `["Same", ["Add", 1, 1], 2]` is
`True`, since canonicalization folds `1 + 1` to `2`.

</FunctionDefinition>

<nav className="hidden">
### IdenticallyEqual
</nav>
<FunctionDefinition name="IdenticallyEqual">

<Signature name="IdenticallyEqual" returns="boolean">_expression1_, _expression2_</Signature>

Evaluate to `True` if the two expressions are **identically equal**, that is if
they have the same value for every value of their free variables. This is the
operator counterpart of the `expr.isIdenticallyEqual()` method.

<Latex value="(x+1)^2 \equiv x^2 + 2x + 1" flow="column"/>

```json example
["IdenticallyEqual", ["Square", ["Add", "x", 1]],
  ["Add", ["Square", "x"], ["Multiply", 2, "x"], 1]]
// ➔ "True"
```

Unlike `Equal`, which compares the value of its operands, `IdenticallyEqual`
proves an identity: it applies symbolic transformations (expansion and
simplification) and evaluates both expressions at a number of pseudo-random
sample points. A `True` answer that rests on sampling is a very strong
indication rather than a formal proof — this is the only comparison operator
that can answer from sampling.

Like `Equal`, it is three-valued: `True`, `False`, or — when the identity can
neither be established nor refuted — unevaluated. Note that expressions that
merely *disagree* at the sampled points are undetermined, not `False`:

```json example
["IdenticallyEqual", 1, 2]
// ➔ "False"

["IdenticallyEqual", ["Sin", "x"], ["Cos", "x"]]
// ➔ ["IdenticallyEqual", ["Sin", "x"], ["Cos", "x"]]  (unevaluated)
```

The LaTeX notation is `\equiv` (or the `≡` character). A `\equiv` followed by
`\pmod{n}` is a congruence and parses as
[`Congruent`](/compute-engine/reference/arithmetic/#Congruent) instead.

</FunctionDefinition>


## Transforming an Expression

<nav className="hidden">
### Evaluate
</nav>
<FunctionDefinition name="Evaluate">

<Signature name="Evaluate">_expression_</Signature>

Apply a sequence of definitions to an expression in order to reduce, simplify
and calculate its value. Overrides `Hold` and hold attributes of a function.

`Evaluate` only performs **exact** calculations. To perform numerical
approximations, use `N`.

Read more about [exact calculations and approximate calculations](/compute-engine/guides/numeric-evaluation/).

</FunctionDefinition>

<nav className="hidden">
### Expand
</nav>
<FunctionDefinition name="Expand">

<Signature name="Expand">_expression_</Signature>

Apply the distributive law if the expression is a product or power of sums.

For example: `a(b + c) = ab + ac`

- Expand the terms of the expression if it is a sum or negate.
- If the expression is a fraction, expand the numerator.
  
```json example
["Expand", ["Power", ["Add", "x", 1], 2]]
// ➔ ["Add", 1, ["Multiply", 2, "x"], ["Power", "x", 2]]
```

</FunctionDefinition>

<nav className="hidden">
### ExpandAll
</nav>
<FunctionDefinition name="ExpandAll">

<Signature name="ExpandAll">_expression_</Signature>

Expand an expression, recursively.

```json example
["ExpandAll", ["Power", ["Multiply", ["Add", "x", 1], 3], 2]]
// ➔ ["Add", 1, ["Multiply", 6, "x"], ["Multiply", 6, ["Power", "x", 2]], ["Power", "x", 3]]
```


</FunctionDefinition>

<nav className="hidden">
### Factor
</nav>
<FunctionDefinition name="Factor">

<Signature name="Factor">_expression_</Signature>

Factor an expression.

```json example
["Factor", ["Add", ["Multiply", 2, "x"], ["Multiply", 2, "y"]]]
// ➔ ["Multiply", 2, ["Add", "x", "y"]]
```

</FunctionDefinition>


<nav className="hidden">
### Together
</nav>
<FunctionDefinition name="Together">

<Signature name="Together">_expression_</Signature>

Combine the terms of a sum of fractions into a single fraction.

```json example
["Together", ["Add", ["Divide", 1, 2], ["Divide", 1, 3]]]
// ➔ ["Divide", 5, 6]
```

</FunctionDefinition>


<nav className="hidden">
### Simplify
</nav>
<FunctionDefinition name="Simplify">

<Signature name="Simplify">_expression_</Signature>

The `Simplify` function applies a sequence of transformations to an expression
in order to reduce, simplify and calculate its value.

</FunctionDefinition>


<nav className="hidden">
### Solve
</nav>
<FunctionDefinition name="Solve">

<Signature name="Solve">_equation_</Signature>

<Signature name="Solve">_equation_, _unknown_</Signature>

<Signature name="Solve">_equation_, _spec-1_, _spec-2_, ...</Signature>

Return a list of the solutions of _equation_ for the given unknowns.

To solve a system, pass a `List` of equations and a `List` of unknowns. Each
solution is a `Tuple` whose values follow the order of the unknown list:

```json example
["Solve",
  ["List",
    ["Equal", ["Add", "x", "y"], 3],
    ["Equal", ["Subtract", "x", "y"], 1]],
  ["List", "x", "y"]]
// ➔ ["List", ["Tuple", 2, 1]]
```

Linear systems are solved exactly. An underdetermined system may return a
parametric tuple, while a system the solver cannot decide remains unevaluated.

The _equation_ is an `Equal` expression, or a bare expression that is solved as
if it were equal to zero. Any boolean condition (an inequality, a congruence…)
also works when a domain is given (see below).

When no unknown is given, it defaults to the single free variable of the
equation, or to `x` when the equation has several free variables and one of
them is `x`. This makes point-free forms such as `x^2 = 4 \rhd
\operatorname{Solve}` work without naming the unknown.

Each _spec_ describes one unknown, and is either:

- a **symbol** — the unknown, solved over its declared type;
- **`["Element", _symbol_, _collection_]`** — the unknown restricted to a
  domain, such as a `Range` of integers or an `Interval`;
- **`["Element", _symbol_, _collection_, _condition_]`** — with an extra
  boolean filter, using the same indexing-set convention as `Sum` and
  `Product`.

In LaTeX, `x \in 1..1000` parses to the `Element` form, so
`\operatorname{Solve}(x^2=4,\; x \in 1..1000)` works without any special
syntax.

```json example
["Solve", ["Equal", ["Power", "x", 2], 1], "x"]
// -> ["List", 1, -1]

["Solve",
  ["Equal", ["Subtract", ["Power", "x", 2], ["Multiply", 5, "x"]], -6],
  ["Element", "x", ["Range", 1, 1000]]
]
// -> ["List", 2, 3]
```

**With a domain**, the equation is solved symbolically and the solutions are
filtered to the domain. Equations whose solutions form an infinite periodic
family (such as trigonometric equations) return every member within the
domain, not just the principal values. When no symbolic solution is found and
the domain is finite and reasonably sized, `Solve` falls back to enumerating
the domain; every candidate is confirmed exactly, and a search that would be
too large returns the expression unevaluated rather than a partial answer.

**With several unknowns**, each carrying a domain, the result is a `List` of
`Tuple`s in unknown order:

```json example
["Solve",
  ["Equal", ["Add", ["Power", "x", 3], ["Power", "y", 3]], 1729],
  ["Element", "x", ["Range", 1, 12]],
  ["Element", "y", ["Range", 1, 12]]
]
// -> ["List", ["Tuple", 1, 12], ["Tuple", 9, 10], ["Tuple", 10, 9], ["Tuple", 12, 1]]
```

**Integer (diophantine) equations are solved symbolically.** When every
unknown ranges over integers, linear equations in any number of unknowns,
Pell-family equations \\(x^2 - Dy^2 = N\\), and the Pythagorean equation
\\(x^2 + y^2 = z^2\\) are solved in closed form. This
reaches answers enumeration cannot: solving \\(x^2 - 29y^2 = 1\\) over
\\(x, y \in 1..10^5\\) returns `[(9801, 1820)]` even though the domain has
\\(10^{10}\\) candidate pairs, and an unsolvable equation such as
\\(6x + 9y = 4\\) returns the empty list immediately.

When the unknowns are declared with an `integer` type and no domain is given,
the result is the general **parametric family**, expressed with fresh integer
parameters (`t`, `t_1`, …) that range over all integers:

```json example
// with n and m declared as integers:
["Solve", ["Equal", ["Add", ["Multiply", 3, "n"], ["Multiply", 4, "m"]], 7],
  "n", "m"]
// -> ["List", ["Tuple", ["Add", ["Multiply", 4, "t"], -7],
//                       ["Add", ["Multiply", -3, "t"], 7]]]
// i.e. n = 4t − 7, m = −3t + 7 for all integers t
```

Pythagorean triples return the complete classical two-family parametrization:
`Solve(x²+y²=z², x, y, z)` (with integer-typed unknowns) yields
\\(\bigl(t(t_1^2-t_2^2),\; 2t\,t_1 t_2,\; t(t_1^2+t_2^2)\bigr)\\) and its
leg-swapped counterpart — every integer solution, including all signs, is a
member of one of the two families.

Assumptions on the unknown (such as `assume(n > 0)`) filter the solutions the
same way, conjunctively with any explicit domain.

`Solve` is the operator form of the `expr.solve()` method, and uses the same
solver for the two-argument symbolic case. The result is a `List` of the
solutions, or an empty list when none are found.

</FunctionDefinition>


<nav className="hidden">
### CanonicalForm
</nav>
<FunctionDefinition name="CanonicalForm">

<Signature name="CanonicalForm">_expression_</Signature>

<Signature name="CanonicalForm">_expression_, _form-1_, _form-2_, ...</Signature>


If _expression_ is already canonical, this function has no effect.

If there are no _form-n_ arguments, the expression is transformed to its
canonical form.

If some _form-n_ arguments are provided, they indicate one or more 
canonical transformations to apply to the expression. The following
canonical forms are supported:

- **`Order`**: If _expression_ is a commutative function, sort the
arguments according to the canonical order of the arguments of the function.

```json example
["CanonicalForm", ["Add", 3, 2, 1], "Order"]
// -> ["Add", 1, 2, 3]
```

This can be useful to compare two non-canonical expressions for equality, for example:

```json example
["IsSame",
  ["Add", 1, "x"], 
  ["Add", "x", 1]
]
// -> False

["IsSame", 
  ["CanonicalForm", ["Add", 1, "x"], "Order"], 
  ["CanonicalForm", ["Add", "x", 1], "Order"]
]
// -> True
```

- **`Flatten`**: Simplify associative expressions, remove any
  unnecessary delimiters indicating the order of operations,
  flattens any `Sequence` expressions.

```json example
["CanonicalForm", ["Add", 1, ["Add", 2, 3]], "Flatten"]
// -> ["Add", 1, 2, 3]

["CanonicalForm", ["Add", 1, ["Delimiter", ["Sequence", 2, 3]]], "Flatten"] 
// -> ["Add", 1, 2, 3]

["CanonicalForm", ["Add", 1, ["Sequence", 2, 3]], "Flatten"]
// -> ["Add", 1, 2, 3]
```


- **`Number`**: Transform some number forms, for example `["Add", 2, ["Multiply", 3, "ImaginaryI"]]`
  to `["Complex", 2, 3]`, simplify and normalize numerator and denominator of
  rational numbers, etc...

- **`InvisibleOperator`**: Remove any invisible operators that may be 
  contained in the expression and replace them with `Multiply` or function
  application, depending on the context

```json example
["CanonicalForm", ["InvisibleOperator", "2", "x"], "InvisibleOperator"]
// -> ["Multiply", 2, "x"]
```

- **`Multiply`**: If _expression_ is a `Multiply` function, simplify it by
  combining the coefficients and the factors, transform product to a `Power` 
  expression when possible.

```json example
["CanonicalForm", ["Multiply", 2, 3, "x"], "Multiply"]
// -> ["Multiply", 6, "x"]
```

- **`Add`**: If _expression_ is an `Add` function, remove any `0`, transform
  sum into multiplication when possible. If _expression_ is a `Subtract` 
  transform it into an `Add`. If _expression_ is a `Negate` transform it into
  a `Multiply` or negate number literals.

- **`Power`**: Transform `Exp`, `Square`, `Sqrt`, `Root` function to a `Power` 
  expression; 

```json example
["CanonicalForm", ["Exp", "x"], "Power"]

```json example
["CanonicalForm", ["Power", 2, 3], "Power"]
// -> ["Power", 8]
```  

  


To compare the input from a mathfield with an expected 
answer, you could use:

```js example
const correct = ce.parse(mf.value, {canonical: "Order"})
    .isSame(ce.parse("1+x"))
```

Both `1+x` and `x+1` will return **true**, but `2-1+x` will return **false**.

**Note**: The **Divide** form internally applies the **Power** form to its
operands. If you need division canonicalization, it is not necessary to
separately specify **Power** in your form list, though it does no harm.

The result of partial canonicalization is a **structural** expression.
Calling `.canonical` on the result will perform full canonicalization.
The form application order matters: forms are applied sequentially, and
each form may benefit from transformations made by earlier forms.

**Note**: see also the options for the `canonical` option of `ce.parse()` and
`ce.expr()` which can also be used to specify a custom canonical form:

```js example
const correct = ce.parse(mf.value, {canonical: "Order"})
    .isSame(ce.parse("x+1"))
```


</FunctionDefinition>



<nav className="hidden">
### N
</nav>
<FunctionDefinition name="N">

<Signature name="N">_expression_</Signature>

Evaluate to a numerical approximation of the expression.

```json example
["N", "Pi"]

// ➔ 3.141592653589793
```

<Signature name="N">_expression_, _precision_</Signature>

Evaluate to a numerical approximation with the given number of significant
digits.

If _precision_ is greater than the engine's current working precision
(`ce.precision`), the working precision is raised to match — and **kept** raised,
since display precision is a global setting. If _precision_ is at or below the
working precision, the result is rounded to that many significant digits without
changing the working precision.

```json example
["N", "Pi", 20]
// ➔ 3.1415926535897932385

["N", ["Divide", 1, 3], 4]
// ➔ 0.3333
```

</FunctionDefinition>


## Core Functions

<nav className="hidden">
### Error
</nav>
<FunctionDefinition name="Error">

<Signature name="Error">_error-code_, _context_</Signature>

Tag an expression that could not be interpreted correctly. It may have a syntax
error, a reference to an unknown symbol or some other problem.

The first argument, `error-code` is either a string, or an `["ErrorCode"]`
expression.

The _context_ is an optional expression that provides additional information
about the error.

An error is an ordinary **value**. When a strict operand of an expression
evaluates to an error, the whole expression evaluates to that error rather than
to a frozen tree. See [Errors](/compute-engine/guides/evaluate/#errors) for the
propagation rules.

#### The `ErrorTrace` Breadcrumb

An error that propagated out of the expression where it was raised carries a
breadcrumb recording the operators it passed through. The breadcrumb is an
`["ErrorTrace"]` expression, and it is always the **last** operand of the
`["Error"]`:

```json example
["Add", ["Ln", "'a'"], 2]
// ➔ ["Error",
//      ["ErrorCode", "'incompatible-type'", "'number'", "'string'"],
//      ["ErrorTrace", ["ErrorFrame", "'Ln'", 1], ["ErrorFrame", "'Add'", 1]]]
```

Each frame is an `["ErrorFrame", operator, index]` expression, where _index_ is
the 1-based position of the operand the error came from. Frames read
**innermost first** — the failure site comes first, the outermost operator
last.

An error that never propagated keeps its historical shape unchanged, with no
`["ErrorTrace"]` operand:

```json example
["Error", "'oops'"]
// ➔ ["Error", "'oops'"]
```

So the breadcrumb is identified **by its head, never by its position**: to read
it, take the last operand of the `["Error"]` and check that its operator is
`ErrorTrace`. Code that reads operand 2 as the error _context_ must skip an
`["ErrorTrace"]` found there — a traced error whose context slot is empty is
`["Error", code, ["ErrorTrace", ...]]`.

The breadcrumb is data, not display: `toString()` and the LaTeX serializer
render a traced error exactly like an untraced one.

</FunctionDefinition>

<nav className="hidden">
### IsError
</nav>
<FunctionDefinition name="IsError">

<Signature name="IsError" returns="boolean">_expression_</Signature>

Evaluate to `True` if _expression_ evaluates to an error, `False` otherwise.

`IsError` **holds** its operand — a strict position would propagate the error
away before it could be inspected — and it is total: it always answers.

```json example
["IsError", ["Ln", "'a'"]]
// ➔ "True"

["IsError", ["Add", 1, 1]]
// ➔ "False"

["IsError", "x"]
// ➔ "False"
```

An expression that is not itself an error but *embeds* one also reports
`True`.

There is one exception: an error held inside a **collection value** is not
reported, because a collection containing an error is still a well-formed
collection.

```json example
["IsError", ["List", 1, ["Ln", "'a'"]]]
// ➔ "False"
```

`NaN` is not an error — it is an ordinary IEEE numeric value:

```json example
["IsError", "NaN"]
// ➔ "False"
```

To inspect an error rather than merely detect it, use
[`Type`](#Type) (which returns `"error"`), or destructure it with an
`["Error", ...]` case in a
[`Match`](/compute-engine/reference/control-structures/#Match) expression.

</FunctionDefinition>

<nav className="hidden">
### InverseFunction
</nav>
<FunctionDefinition name="InverseFunction">

<Signature name="InverseFunction">_symbol_</Signature>

Evaluate to the inverse function of its argument for example `Arcsin` for `Sin`.

<Latex value="\sin^{-1}(x)"/>

```json example
[["InverseFunction", "Sin"], "x"]
```

In the mathematical sense, this is an operator (a function that takes a function
as an argument and returns a function).

</FunctionDefinition>

<nav className="hidden">
### String
</nav>
<FunctionDefinition name="String">

<Signature name="String">_expression_</Signature>

Evaluate to a string made from the concatenation of the arguments converted to
strings

```json example
["String", "x", 2]

// ➔ "'x2'"
```

</FunctionDefinition>

<nav className="hidden">
### Symbol
</nav>
<FunctionDefinition name="Symbol">

<Signature name="Symbol">_expression_</Signature>

Evaluate to a new symbol made of a concatenation of the arguments.

```json example
["Symbol", "x", 2]

// ➔ "x2"
```

The symbol is not declared, it remains a free variable. To declare the symbol
use `Declare`.

```json example
["Declare", ["Symbol", "x", 2], "real"]
```

</FunctionDefinition>

<nav className="hidden">
### Typed
</nav>
<FunctionDefinition name="Typed">

<Signature name="Typed">_expression_, _type_</Signature>

Ascribe a type to _expression_ for the benefit of the type system.

The _type_ is a string such as `{"str": "integer"}`, or a type-name symbol
such as `integer` (which is normalized to a string).

`Typed` is an **ascription, not a runtime check**: it asserts the type without
verifying the value, and it is transparent at evaluation — `Typed(x, type)`
evaluates to the value of `x`.

```json example
["Typed", ["Add", 2, 3], "'integer'"]
// The expression has type `integer`, and evaluates to 5
```

The main use of `Typed` is to annotate the parameters and return type of a
[function literal](/compute-engine/reference/functions/#Function).

</FunctionDefinition>


## Parsing and Serializing Latex

<nav className="hidden">
### Parse
</nav>
<FunctionDefinition name="Parse">

<Signature name="Parse">_string_</Signature>

If _expr_ is a `["LatexString"]` expression, evaluate to a MathJSON expression
corresponding to the LaTeX string.

```json example
["Parse", ["LatexString", "'\frac{\pi}{2}'"]]

// ➔ ["Divide", "Pi", 2]
```

</FunctionDefinition>

<nav className="hidden">
### Latex
</nav>
<FunctionDefinition name="Latex">

<Signature name="Latex">_expression_</Signature>

Evaluate to a `LatexString` which is the expression serialized to LaTeX
</FunctionDefinition>

<nav className="hidden">
### LatexString
</nav>
<FunctionDefinition name="LatexString">

<Signature name="LatexString">_string_</Signature>

Tag a string as a LaTeX string

</FunctionDefinition>


## Superscripts and Subscripts

These functions are all inert functions, that is they evaluate to themselves.

<div className="symbols-table first-column-header">

| Function      |                  | Description                                                    |
| :------------ | :--------------- | :------------------------------------------------------------- |
| `Subminus`    | $$ x_- $$      |                                                                |
| `Subplus`     | $$ x_+$$       |                                                                |
| `Subscript`   | $$ x_{n} $$    | See below for details on subscript handling.                   |
| `Substar`     | $$ x_*$$       |                                                                |
| `Superdagger` | $$ x^\dagger$$ |                                                                |
| `Superminus`  | $$ x^-$$       |                                                                |
| `Superplus`   | $$ x^+$$       |                                                                |
| `Superstar`   | $$ x^*$$       | When the argument is a complex number, indicate the conjugate. |

</div>

### Subscript Handling

When a symbol has a subscript, the Compute Engine uses the symbol's declared
type to determine how to interpret the subscript.

#### Subscripts on Regular Symbols

For symbols that are not declared as collections, simple subscripts become
part of the symbol name:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `A_1` | `A_1` | Numeric subscript becomes part of symbol name |
| `A_{n}` | `A_n` | Single-letter subscript becomes part of symbol name |
| `A_{max}` | `A_max` | Multi-letter subscript becomes part of symbol name |
| `x_{ij}` | `x_ij` | Common for matrix indices |
| `T_{max}` | `T_max` | Common for named subscripts |

Complex subscripts (containing operators, commas, or parentheses) create
`Subscript` expressions that can be used in arithmetic:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `a_{n+1}` | `["Subscript", "a", ["Add", "n", 1]]` | Expression subscript |
| `a_{n,m}` | `["Subscript", "a", ["Sequence", "n", "m"]]` | Multi-index |
| `A_{(n+1)}` | `["Subscript", "A", ["Add", "n", 1]]` | Parentheses indicate expression |

These `Subscript` expressions can be used in arithmetic operations:

```javascript
ce.parse('a_{n+1} + 1');   // → ["Add", ["Subscript", "a", ...], 1]
ce.parse('2 * a_{n+1}');   // → ["Multiply", 2, ["Subscript", "a", ...]]
```

#### Subscripts on Collection-Typed Symbols

When a symbol is declared as a collection type (`list`, `tuple`, `matrix`, etc.),
**all subscripts** are converted to [`At()`](/compute-engine/reference/collections/#at)
indexing operations:

```javascript
ce.declare('v', 'list<number>');
ce.parse('v_n');      // → ["At", "v", "n"]
ce.parse('v_{n+1}');  // → ["At", "v", ["Add", "n", 1]]
ce.parse('v_{i,j}');  // → ["At", "v", ["Tuple", "i", "j"]]
```

The type of the resulting `At()` expression is inferred from the collection's
element type. For example, if `v` is declared as `list<number>`, then `v_n`
has type `number` and can be used in arithmetic:

```javascript
ce.declare('v', 'list<number>');
ce.parse('v_n + 1');      // → ["Add", ["At", "v", "n"], 1]
ce.parse('2 * v_{n+1}');  // → ["Multiply", 2, ["At", "v", ...]]
```

This behavior allows natural mathematical notation for sequences and arrays
while maintaining type safety.

#### Custom Subscript Evaluation

For mathematical sequences like Fibonacci numbers ($F_n$) or indexed coefficients
($a_n$), you can define a custom `subscriptEvaluate` handler that evaluates
subscripted expressions:

```javascript
ce.declare('F', {
  subscriptEvaluate: (subscript, { engine }) => {
    const n = subscript.re;
    if (!Number.isInteger(n) || n < 0) return undefined;
    // Calculate Fibonacci...
    return engine.number(fibValue);
  },
});

ce.parse('F_{10}').evaluate();  // → 55
ce.parse('F_5').evaluate();     // → 5
ce.parse('F_n').evaluate();     // → stays as Subscript(F, n)
```

Both simple subscripts (`F_5`) and complex subscripts (`F_{10}`) are kept as
`Subscript` expressions when the base symbol has a `subscriptEvaluate` handler.
This allows the handler to be called during evaluation.

The handler should return `undefined` when the subscript is symbolic or outside
the valid domain, causing the expression to remain unevaluated.

Subscripted expressions with `subscriptEvaluate` have type `number` and can be
used in arithmetic operations:

```javascript
ce.parse('F_{5} + F_{3}').evaluate();  // → 8 (5 + 3)
```

<ReadMore path="/compute-engine/guides/augmenting/#declaring-a-sequence-with-subscript-evaluation" >
Learn more about **declaring sequences with subscript evaluation**. <Icon name="chevron-right-bold" />
</ReadMore>

#### Styled Subscripts

To apply a specific style to a subscript (italic, bold, etc.), use the
appropriate LaTeX command:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `A_{\mathit{max}}` | `A_max_italic` | Italic subscript |
| `A_{\mathbf{max}}` | `A_max_bold` | Bold subscript |
| `A_{\mathrm{max}}` | `A_max` | Upright (roman) subscript |

The style suffix (`_italic`, `_bold`, etc.) becomes part of the symbol name,
allowing you to distinguish between differently styled versions of the same
subscript if needed.

#### Bracket Notation for Indexing

Regardless of the symbol's type, you can use bracket notation to explicitly
create an `At` indexing expression:

| LaTeX | Result | Notes |
| :---- | :----- | :---- |
| `v[n]` | `["At", "v", "n"]` | Explicit indexing |
| `A[i,j]` | `["At", "A", "i", "j"]` | Multi-dimensional indexing |

This is useful when you want to index into a symbol without declaring its type,
or when you need to be explicit about the indexing operation.
