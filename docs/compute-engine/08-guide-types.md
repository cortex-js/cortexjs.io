---
title: Types
slug: /compute-engine/guides/types/
---

<Intro>
In the Compute Engine, the **type** of an expression is the set of the 
possible values of that expression.
</Intro>

The Compute Engine uses a type system to ensure that operations are 
performed on the correct types of values. 

A type is represented by a **type expression**, which is a string with 
a specific syntax. 

A type expression is either a **primitive type** represented by an identifier
such as `"integer"` or `"boolean"` or a **constructed type**.


For example:

- `"integer"`
- `"boolean"`
- `"matrix<3x3>"`
- `"integer & !0"`
- `"(integer, integer) -> number"`
- `"(distance: integer+) -> tuple<x: integer, y: integer>"`


**To check the type of an expression**, use the `expr.type` property.

```js live
console.log(ce.parse("3.14").type);
```

The type of a number literal is its **literal type** — `3.14` here, the
most precise claim about that one value (see [Literal Type](#literal-type)).
A literal type belongs to the literal node only: a type built from the
literal, such as the type of a tuple or list that holds it, carries the
literal's tier instead (see [Literal Types Are Not Stored](#literal-types-are-not-stored)).

The type of a symbol can be declared explicitly, or it can be inferred from 
the context in which it is used, such as the value that is assigned to it
or the operation that is performed on it.

**To explicitly declare the type of a symbol**, use the `ce.declare()` function.

```js
ce.declare("n", "integer");
ce.parse("n").type;
// ➔ "integer"
```

Alternatively, to declare the type of a symbol you can evaluate a 
`["Declare"]` expression

```js
ce.expr(["Declare", "n", "'integer'"]).evaluate();
ce.parse("n").type;
// ➔ "integer"
```


## Type Hierarchy

The type system is based on the concept of **subtyping**, which allows for
a hierarchy of types, where a type can be a subtype of another type. This
allows for more flexible and expressive type definitions, as well as
better error checking and type inference.

Type A is a **subtype** of type B if all values of type A are also values of type B.
It is also said that type A **matches** type B.


```plaintext
any
├── error
├── nothing
├── missing
├── never
├── unknown
└── expression
    ├── symbol
    ├── function
    └── value
        ├── scalar
        │   ├── boolean
        │   ├── character
        │   └── number
        │     └── complex
        │         ├── imaginary
        │         └── real
        │             └── rational
        │                 └─ integer
        └── collection
            ├── set
            ├── dictionary
            |   └─ record
            └── indexed_collection
                ├── tuple
                ├── range
                ├── string
                └── list
                    ├─ vector
                    ├─ matrix
                    └─ tensor
```

**Note:** this diagram is simplified and does not accurately reflect the finite vs
non-finite distinction for the numeric types.

**Note:** a `string` is an indexed collection of `character` — it sits beside
`list`, `tuple` and `range`, not under `scalar`. A `character` (exactly one
user-perceived character) *is* a scalar, and is a disjoint sibling of
`string`: neither matches the other. `string` is not `list<character>` either;
the two are siblings with the same element type, because joining characters
can merge them (an `e` and a combining acute join into the single character
`é`). See the [Strings reference](/compute-engine/reference/strings/).

This hierarchy allows the Compute Engine to reason about compatibility and subtyping relationships between expressions.

The `unknown` type is a placeholder for an expression whose type has not yet 
been determined, typically during type inference or partial evaluation. It can 
be replaced or refined as more information becomes available. In particular, 
an `unknown` parameter or result slot in a declared function signature does 
not constrain a later definition: the definition's inferred type refines the 
placeholder, so declaring `(unknown) -> unknown` behaves like declaring no 
signature at all.

Two caveats bound the wildcard:

- The absence types `nothing` and `missing` (and the `error` and `never` 
  types) are **not** compatible with `unknown`. Absence is opt-in: a slot 
  whose type has not yet been determined does not silently accept an absence 
  marker — admit it explicitly with a union such as `number | missing`, or 
  use `any`.
- `unknown` is a placeholder, not a promise. Contrast it with `any`, which is 
  a **contract**: `(any) -> any` — the signature of the identity function — 
  promises a function that accepts every value, and a definition that cannot 
  honor that promise is rejected. Use `unknown` when the type is simply not 
  known yet; use `any` when you mean to accept everything.

<div style={{visibility:"hidden"}}>
<a href="#naming-constraints-for-elements-and-arguments" id="naming-constraints-for-elements-and-arguments"></a>
</div>

:::info **Naming Constraints for Elements and Arguments**

Element names (used in tuples, records, dictionaries) and function argument names should:

- start with a letter (`U+0041` to `U+005A` or `U+0061` to `U+007A`) or underscore (`U+005F`)
- contain only letters, digits (`U+0030` to `U+0039`), or underscores

Names that don’t follow these rules must be enclosed in backticks.
The backticks are not part of the name, they are used to escape the name.

For example:

``tuple<`1st`: integer, `2nd`: integer, `3rd`: integer>``

``record{`durée`: number, vitesse: number}``

``(`直径`: number) -> number``


If the name contains a backtick or backslash, those characters must be escaped with a backslash:

``record{`name\`with\`backticks\\and\\backslash`: integer}``

The backtick syntax is used instead of quotes to clearly distinguish identifiers from string values, following conventions from languages such as Swift and Kotlin

Element and argument names are stored and compared using Unicode Normalization Form C (NFC).
:::


## Primitive Types

A **primitive type** is a type that is not defined in terms of other types.

The Compute Engine supports the following primitive types:

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `any`      | The universal or top type. Every type is a subtype of, and therefore matches, `any` |
| `error` | The type of an **invalid expression**, such as `["Error"]` |
| `nothing`       | The type whose only member is the symbol `Nothing`; the unit type                                             |
| `missing`       | The type whose only member is the symbol `Missing`; a position-preserving absent value |
| `never`       | The type that has no values; the empty type or **bottom type**. It is a subtype of every type, which is why the empty collection — whose elements are drawn from no values at all — types as `list<never>` and is a member of every list type |
| `unknown`       | The type of an expression whose type is not known. An expression whose type is `unknown` can have its type modified (narrowed or broadened) at any time. Every other type matches `unknown`, except the absence types `nothing` and `missing` (and `error`): absence is opt-in and must be admitted explicitly (e.g. `number \| missing`) |
| `expression`       | The type of a symbolic expression that represents a mathematical object, such as `["Add", 1, "x"]`, a `symbol`, a `function` or a `value`  |
| `symbol`        | The type of a named object, for example a constant or variable in an expression such as `x` or `alpha` |
| `function`        | The type of a function literal: an expression that applies some arguments to a body to produce a result, such as `["Function", ["Add", "x", 1], "x"]` |
| `value`        | The type of a constant value, such as `1`, `True`, `"hello"` or `Pi`: a `scalar` or a `collection` |
| `collection`    | The type of a collection of values: a `list`, a `set`, a `tuple`, a `string`, a `dictionary` or a `record` |
| `indexed_collection`    | The type of a collection of values that can be accessed by an index: a `tuple`, a `range`, a `string`, a `list`, a `vector`, a `matrix` or a `tensor` |
| `range`        | The type of an **index span**: a contiguous, ascending run of 1-based collection indexes, such as `["Range", 2, 5]`. A `Range` has this type only when its bounds are integers, at least 1, ascending and one apart — so `["Range", 1, 10, 2]` (stepped) and `["Range", 5, 2]` (descending) are `indexed_collection<integer>` instead. Not a mathematical interval (see `Interval`) |
| `scalar`        | The type of a single value: a `boolean`, a `character`, or a `number`. A `string` is **not** a scalar — it is an indexed collection of characters |
| `boolean`       | The type of the symbol `True` or `False`|
| `character`     | The type of exactly one user-perceived character (one Unicode grapheme cluster), such as `["CharacterFrom", "'é'"]`. A scalar with no elements, and a disjoint sibling of `string`: a character is not a one-character string, and a string is not a character. A one-character string *literal* does narrow to a character where one is expected |
| `string`        | The type of a string of Unicode characters. `string <: indexed_collection<character>`: a string can be counted, indexed (1-based) and iterated, and its elements are its grapheme clusters. It is **not** `list<character>` — the two are siblings, because joining characters can merge them |
| `number`        | The type of a numeric value |

</div>


### Numeric Types

The type `number` represents all numeric values. Below it, the numeric types
are **finite by default**: `complex`, `real`, `rational`, `integer` and
`imaginary` contain only finite values, and the values that are not finite
numbers have types of their own. Every numeric value is a finite number, a
number of infinite magnitude, or the not-a-number marker, and no value is two
of those:

$$\texttt{number} = \texttt{complex} \sqcup \texttt{infinity} \sqcup \texttt{nan}$$

So a declared `real` is a **promise of finiteness**: writing `real` as a
result type says the value is never $\pm\infty$ and never $\mathrm{NaN}$.

<div className="symbols-table first-column-header" style={{"--first-col-width":"17ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `number`       | Any numeric value: a finite number, a number of infinite magnitude, or $\mathrm{NaN}$ |
| `complex`      | A finite complex number, such as $2 + 3i$. The union of `real` and `imaginary` |
| `imaginary`    | A finite complex number with a real part of $0$, such as $3i$ |
| `real`         | A finite real number, such as $-2.5$ |
| `rational`     | A finite number that can be expressed as the quotient of two integers, such as $-\nicefrac{3}{4}$. Includes the integers |
| `integer`      | A finite whole number, such as $42$ |
| `infinity`     | A number of infinite magnitude, in any direction: $+\infty$, $-\infty$, the unsigned $\tilde\infty$ (`ComplexInfinity`), and mixed values such as $\infty + i$. Disjoint from `complex` |
| `nan`          | The not-a-number marker $\mathrm{NaN}$. Its only supertype is `number` |

When you need exactly the signed pair $+\infty$ and $-\infty$ — the values
whose *sign* is promised, which `infinity` does not — write
`signed_infinity`. It is precisely the union of the two value types, and
`+oo | -oo` is an equivalent spelling of the same type; a union
containing both signed infinities prints under the name
(`real | signed_infinity`). The former name for this pair,
`non_finite_number`, is **retired**: that name was misleading, since
$\tilde\infty$ and $\infty + i$ are non-finite numbers yet were not
members. It is still accepted on input for one release cycle and
normalizes to `signed_infinity`, but it is never printed.

</div>

The extended real line — a real number that may be infinite — has no
one-word name: write it out as `real | +oo | -oo`. Bare `real` does
not admit $\pm\infty$, and `real | infinity` would also admit the unsigned
$\tilde\infty$.

:::warning **Deprecated: the `finite_` type names**

The names `finite_number`, `finite_complex`, `finite_real`,
`finite_rational` and `finite_integer` have been **retired**. The bare names
above now carry those meanings, so each retired name denoted the same set of
values as a bare one.

For one release cycle the type parser still accepts them and normalizes each
to its replacement — `finite_integer` to `integer`, `finite_rational` to
`rational`, `finite_real` to `real`, `finite_complex` to `complex`, and
`finite_number` to `complex` (since "any finite number" *is* the finite
complex type). They are never produced by the engine, so a type you read back
is always spelled with the bare name. Update your type strings before the
aliases are removed.
:::

Numeric types can be constrained to a specific range within a lower and upper 
bound

For example `real< -1.0..1.0 >` is the type of real numbers between $-1.0$ and $1.0$, inclusive.

An non-finite endpoint can be represented by the symbol `-oo` or `+oo` or
by omitting the endpoint.

For example: `real<..1.0>` is the type of real numbers less than $1.0$, 
and is equivalent to `real< -oo..1.0 >`.

To exclude an endpoint, write the inequality marker `<` next to it:
`real<0<..>` is the type of real numbers greater than $0$ (`0<..` reads
"$0 < x$"), `real<..<1>` the type of real numbers less than $1$, and
`real<0<..<1>` the open interval $0 < x < 1$. A closed endpoint has no
marker: `real<0..<1>` is $0 \le x < 1$.

On the integer tiers an open endpoint normalizes to the next closed one:
`integer<0<..>` is the same type as `integer<1..>`, the integers greater than
or equal to $1$.

Note that `complex` and `imaginary` types do not support ranges, as they are not ordered types.

Here is the type of various numeric values:

| Value               | Type                |
| ------------------: | :------------------ |
| $42$                | `42`                |
| $-3.14$             | `-3.14`             |
| $\nicefrac{1}{2}$   | `rational<0.5..0.5>` |
| $\nicefrac{1}{3}$   | `rational<0.33..0.34>` |
| $\sqrt2$            | `real<1.4..1.5>`     |
| $3i$                | `imaginary`         |
| $2 + 3i$            | `complex`           |
| $-\infty$           | `-oo` (widens to `infinity`) |
| $\tilde\infty$      | `~oo` (widens to `infinity`) |
| $\mathrm{NaN}$      | `NaN` (widens to `nan`) |

A number literal's type is the most precise claim available — its own value
when a machine number holds it exactly, and otherwise its tier decorated
with a range that encloses the value (see 
[Literal Type](#literal-type)). Every one of these types is a subtype of
the tier you would expect: `42` matches `integer`, 
`rational<0.5..0.5>` matches `rational`, `real<1.4..1.5>`
matches `real`, and so on — so code that
asks *"is this an integer?"* with `.matches()` or `.isInteger` is
unaffected by the extra precision.

The last three rows are the values that are *not* finite numbers. They no
longer match `real` or `integer`: since the bare tiers are finite,
`ce.parse("-\\infty").type.matches("real")` is `false`. Ask
`matches("real | +oo | -oo")` when you mean the extended real line.

### Where Ranged Types Come From

A ranged type can appear in four ways:

- **You declare it**: `ce.declare("x", "real<-1..1>")` makes the range a
  contract on `x`.
- **An assumption refines it**: after `ce.assume(ce.parse("y > 0"))`, the
  type of `y` is `(real<0..>) & !0`.
- **An operator derives it**: some operations produce a result that is
  provably sign-constrained, and their type says so — `|x|` for a real `x`
  has type `real<0..>`, and `e^x` has type `(real<0..>) & !0`.
- **A literal carries it**: an exact value that no machine number holds —
  $\nicefrac{1}{3}$, $\sqrt2$, $10^{30}+1$ — is typed by its tier plus a
  compact range that encloses the value, such as `real<1.4..1.5>`
  for $\sqrt2$ (see [Literal Type](#literal-type)). Constants like
  `Pi` and `ExponentialE` declare a value bracket
  (`real<3.141592653589793..3.141592653589794>`), so their sign
  and magnitude are type facts.

Ranges are deliberately **not** propagated through arithmetic: the sum of
two values in `real<-1..>` is not itself in `real<-1..>`, so `x + y` falls
back to the bare tier. Carrying bounds through operations is interval
arithmetic, which the type system does not attempt.

The Compute Engine Standard Library includes definitions for sets that
correspond to some numeric types.

<ReadMore path="/compute-engine/reference/sets/" > 
Read more about the **sets** included in the Standard Library <Icon name="chevron-right-bold" />
</ReadMore>

## Collection Types

A collection type represents an expression that contains multiple values, such as a list, a set, or a dictionary.

The Compute Engine supports the following collection types: `set`, `tuple`,
`list` (including `vector`, `matrix` and `tensor`), `record` and `dictionary`.

### Set

A **set** is a non-indexed collection of unique values.

The type of a set is represented by the type expression `set<T>`, where `T` 
is the type of the elements of the set.

```js
ce.parse("\\{5, 7, 9\\}").type
// ➔ "set<integer>"
```

A set can have an infinite number of elements.

### Tuple

A **tuple** is an indexed collection of values, representing a fixed 
number of elements.

The type of a tuple is represented by the type expression `tuple<T1, T2, ...>`, 
where `T1`, `T2`, ... are the types of the elements of the tuple.

```js
ce.parse("(7, 5, 7)").type
// ➔ "tuple<integer, integer, integer>"
```

Each element type is the **tier** of the element, never a literal's own
value type: `(7, 5, 7)` is a `tuple<integer, integer, integer>`, not
`tuple<7, 5, 7>`, and `(\\sqrt2, 1/3)` is `tuple<real, rational>` even though
`ce.parse("\\sqrt2").type` is the enclosure `real<1.4..1.5>`. A component
that is not a literal keeps its own type, ranges included: with `r`
declared `real`, `(|r|, 1)` is `tuple<real<0..>, integer>`.

The elements of a tuple can be named: `tuple<x: integer, y: integer>`. 

If an element is named, all elements must be named and the names must be unique
when compared in Unicode Normalization Form C (NFC).

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on element names.)

The elements of a tuple can be accessed with a one-based index or by name.

A tuple of numbers is a **point/vector in ℝⁿ**: arithmetic on it is
componentwise vector arithmetic and produces a tuple, not a list.

```js
ce.parse("(1,2) + (3,4)").evaluate();   // ➔ (4, 6)
ce.parse("3(1,2)").evaluate();          // ➔ (3, 6)
ce.parse("(4,2)/2").evaluate();         // ➔ (2, 1)
```

Adding a scalar to a tuple (`1 + (2,3)`) is an error — a scalar does not
broadcast into a point — as is multiplying two tuples (there is no implicit
dot product). A symbol declared with a tuple type participates in vector
arithmetic symbolically, and its components can be accessed with the
`.x`/`.y`/`.z` member syntax (`P.x` is `First(P)`).


For two tuples to be compatible, each element must have the same type and the
names must match. Element names live in the type, not in the value — no literal
spells them — so the comparison is made between two type expressions:

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("tuple<x: integer, y: integer>");
// ➔ true
ce.type("tuple<x: integer, y: integer>")
  .matches("tuple<a: integer, b: integer>");
// ➔ false
```


### List, Vector, Matrix and Tensor

A **list** is an indexed collection of values, used to represent vectors, 
matrices, and sequences.

The first element of a list is at index 1, the second element is at index 2, and so on.

The type of a list is represented by the type expression `list<T>`, where `T` is the type of the elements of the list.

```js
ce.parse("\\[1, 2, 3\\]").type.toString();
// ➔ "vector<integer^3>"  (a list of 3 integers)
```

The type of a list literal is **honest**: it reports the actual (widened)
element type and the dimensions. Since element types are covariant, the
honest type is a subtype of every broader form — `vector<integer^3>`
matches `vector<3>`, `vector`, `list<number>`, and `list`.

The element type is the **tier** of the elements, never a literal's own
value type: `[0.5, 1]` is a `vector<real^2>`, and `[\\sqrt2, 1/3]` is a
`vector<real^2>` even though each element's own type is an enclosing range.
The same rule types a set (`{\\sqrt2}` is `set<real>`) and a record
(`{x: 1/3}` is `record{x: rational}`).

The **empty list** has no elements, so its element type is the bottom type 
`never`. Covariance then makes it a member of every list type, which is what 
you want — an empty list is a valid list of anything.

```js
ce.parse("\\[\\]").type.toString();
// ➔ "list<never>"

ce.parse("\\[\\]").type.matches("list<integer>");
// ➔ true
```

The shorthand **`list`** is equivalent to `list<unknown>` — "some list of
values, element type not stated". The two spellings are synonyms and
normalize to the bare form. The same convention applies to every bare
element-taking constructor: `set` = `set<unknown>`, `dictionary` =
`dictionary<unknown>`, `collection` = `collection<unknown>`,
`indexed_collection` = `indexed_collection<unknown>`.

An explicit **`list<any>`** is a different, strictly *wider* type: `any`
additionally admits the absence markers (`Nothing`, `Missing`), so
`list<any>` accepts a list with absence elements (e.g. a regex match result
using `Missing` for an unmatched group) while the bare `list` — values only —
does not. Consequently `list <: list<any>` but not the converse, and
`list<nothing> <: list<any>` while `list<nothing> ⊄ list`.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("list");
// ➔ true
```

The shorthand **`vector`** is a list of numbers, equivalent to `list<number>`.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector");
// ➔ true
```

A **`vector<n>`** is a list of `n` numbers.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<3>");
// ➔ true
```

A **`vector<T^n>`** is a list of `n` elements of type `T`. A literal list's
element type is the widened type of its actual elements, so a literal list of
integers matches both the narrow and the broad forms:

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<integer^3>");
// ➔ true
ce.parse("\\[1, 2, 3\\]").type.matches("vector<number^3>");
// ➔ true

// A list with a non-integer element widens accordingly:
ce.parse("\\[1, 2.5, 3\\]").type.matches("vector<integer^3>");
// ➔ false  (the widened element type is real)
```

Lists of non-numeric values type honestly too — a list of two colors types
`list<color^2>`, not a numeric vector — so `type.matches("list<color>")` and
similar element-type queries answer correctly.

Similarly, a **`matrix`** is a list of lists.

- The shorthand `matrix` is `matrix<number^?x?>`, a matrix of elements of 
  type `T`, a list of lists of numbers, of rank 2 but of any dimensions. The `?` 
  symbol is a wildcard that matches any number of elements.
- `matrix<T>`: A matrix of elements of type `T`, of any dimensions.
- `matrix<nxm>`: A matrix of `n` rows and `m` columns (e.g. `matrix<3x3>`)
- `matrix<T^nxm>`: A matrix of `n` rows and `m` columns of elements of type `T`
  (e.g. `matrix<boolean^3x3>`)

And finally, a **`tensor`** is a multi-dimensional array of any values, of any rank,
and **`tensor<T>`** is a tensor of elements of type `T`.



### Dictionary and Record

The **dictionary** and **record** types represent a collection of key-value pairs, 
where each key is a non-empty string and each value can be any type. Building a
dictionary with a key that is not a non-empty string — an empty string, a
number, `Nothing` — is an error rather than a silently dropped entry.

A concrete **record value** has a known set of keys, while a **dictionary** can
have keys that are not defined in advance. A record *type* lists the fields a
value must have; it does not forbid additional fields.

A **record** is used to represent objects and structured data with known properties.
A **dictionary** is well suited to represent hash tables or caches.

**Keys** must be unique when compared in NFC form within a dictionary or record. Keys are not ordered.

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on key names.)


The type of a **dictionary** is represented by the type expression `dictionary<T>`
where `T` is the type of the values.

The type of a **record** is represented by the type expression `record{K1: T1, K2: T2, ...}`, 
where `K1`, `K2`, ... are the keys and `T1`, `T2`, ... are the types of the values.

For example: `record{red: integer, green: integer, blue: integer}` is a record that
contains three elements with keys `red`, `green` and `blue`, and values of type `integer`.

**Compatibility:**
- A record type `A` matches a record type `B` when every field required by `B`
  is present in `A` with a compatible type. Thus a record with more fields is a
  subtype of one with fewer fields (width subtyping). The order of the keys
  does not matter.
- A record is compatible with a dictionary `dictionary<T>` if each type `T1`, `T2`, ... is compatible with `T`.


```js
ce.type("record{red: integer, green: integer}")
  .matches("record{red: integer, green: integer}");
// ➔ true

ce.type("record{red: integer, green: integer}")
  .matches("record{red: integer, green: integer, blue: integer}");
// ➔ false

ce.type("record{red: integer, green: integer, blue: integer}")
  .matches("record{red: integer, green: integer}");
// ➔ true

ce.type("record{red: integer, green: integer, blue: integer}")
  .matches("dictionary<integer>");
// ➔ true
```


The `record` type is compatible with any record, and the `dictionary` type 
is compatible with both records and dictionaries.

```js
ce.type("record{red: integer, green: integer}")
  .matches("record");
// ➔ true

ce.type("record{red: integer, green: integer}")
  .matches("dictionary");
// ➔ true
```


### Collection

The type `collection` represent any collection of values, such as a `list`, 
a `set`, a `tuple`, a `string`, a `record` or a `dictionary`.

The type `collection<T>` is a collection of values of type `T`.

The type `indexed_collection<T>` is an indexed collection of values of type `T`,
such as a `list`, a `tuple`, a `string` (whose elements are `character`s), or 
a `matrix`. It is a subtype of `collection<T>`.

Because `string <: indexed_collection<character>`, a signature or a `where`
constraint written over `collection<T>` or `indexed_collection<T>` accepts
strings. To exclude them, intersect with a negation:
`(T) -> T where T: collection & !string`.

### Broadcastable

The type `broadcastable<T>` represents a value that is either a scalar `T` or
an indexed collection of `T` applied element-wise — the static type of an
expression that may **broadcast** at evaluation.

Arithmetic in the Compute Engine broadcasts over collections at run time:
`2 \cdot [1, 2, 3]` evaluates to `[2, 4, 6]`. When an operand is a visible
collection, the result has a concrete collection type (`vector<3>`,
`list<number>`). But when the collection-ness of an operand is not statically
visible — typically a call to a function whose return type is `unknown` — the
result may be a scalar *or* a list, depending on what the call returns. Such
expressions are typed `broadcastable<T>`:

```js
ce.declare('h', '(number) -> unknown');
ce.parse('2h(x) - 1').type;
// ➔ broadcastable<number>
```

The subtyping rules follow from the meaning "a `T`, or an indexed collection
of `T`":

- `T <: broadcastable<T>` — a scalar is a valid broadcastable value
- `list<T> <: broadcastable<T>`, `vector<n> <: broadcastable<number>` — any
  indexed collection of `T` is too (`set` is not indexed, and `tuple`s and
  `string`s bind atomically, so none of them qualifies — a broadcasting
  operator applied to a string receives the whole string, not its characters)
- `broadcastable<S> <: broadcastable<T>` when `S <: T` (covariant)
- `broadcastable<T>` is **not** a subtype of `T` or of `list<T>` — it may be
  either one, so it is neither

A `broadcastable<T>` expression can be used anywhere the runtime can resolve
the ambiguity: further arithmetic propagates the type, indexing with `At`
(`(2h(x)-1)[1]`) is valid with element type `T`, and compiled JavaScript
handles both outcomes with a single compiled artifact.

The type can also be used in declarations and signatures, e.g.
`ce.declare('b', 'broadcastable<number>')` for a parameter that accepts a
number or a list of numbers and is processed element-wise.

Note that a bare undeclared symbol does **not** type as broadcastable: in
`2x`, the symbol `x` is inferred to be a number by the arithmetic itself.
Only expressions whose collection-ness genuinely cannot be resolved
statically (function calls with top-typed results, or values declared
`broadcastable`) carry the type.

## Function Signature

A **function signature** is the type of functions literals.

A function signature is represented by the type expression `(T1) -> T2`, where 
`T1` is the type of the input values of the function literal and `T2` is the 
type of the output value, or return type, of the function literal.

### Return Types

If the function does not return a value, the function signature is `(T) -> nothing`.

A function that never returns, has a signature of `(T) -> never`.



### Arguments

The arguments of a function are a sequence of comma-separated types surrounded 
by parentheses, for example `(T1, T2, ...) -> T3`.

If there are no input arguments, the signature is `() -> T`.

For example `() -> integer` is the type of functions that return an integer 
and have no input arguments.

For example `(integer, integer) -> integer` is the type of functions that map two integers to an integer.

### Named Arguments

Optionally, the input arguments can be named, for example: `(x: integer, y: integer) -> integer`.

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on argument names.)

For example, `(x: integer) -> integer` is a function that takes a single named argument `x` of type `integer` and returns an `integer`.



### Optional Arguments

A function signature can include **optional arguments**, which are arguments 
that may or may not be provided when calling the function. An optional 
argument is indicated by a question mark immediately after its type.

For example `(integer, integer?) -> integer` indicates a function literal accepting 
one or two integers as input and returning an integer.

If there are any optional arguments, they must be at the end of the argument list.

A function type matches a signature only when it accepts **every call that
signature permits** — its shortest and its longest. A signature with an
optional argument permits two call shapes, so a function taking only one
argument does not match it:

```js
ce.type("(integer) -> number")
  .matches("(integer, integer?) -> number");
// ➔ false  (cannot serve the two-argument call)

ce.type("(integer, integer?) -> number")
  .matches("(integer, integer?) -> number");
// ➔ true
```



### Variadic Arguments

A function signature can include a variable number of arguments, also known as 
**variadic arguments**. 

Variadic arguments are indicated by a `+` or `*` 
immediately after the type of the last argument. The `+` suffix indicates that
the function accepts one or more arguments of that type, while the `*` suffix
indicates that the function accepts zero or more arguments of that type.

For example `(string, integer+) -> integer` is a function that accepts a 
string as a first argument followed by one or more integers and returns an integer.

To indicate that the function accepts a variable number of arguments of any 
type, use `any+` or `any*`.

A variadic signature permits calls of *any* length, so no fixed-arity function
matches one — only another variadic function can:

```js
ce.type("(integer, integer) -> number")
  .matches("(integer, integer+) -> number");
// ➔ false  (cannot serve a call with three or more integers)

ce.type("(integer, integer*) -> number")
  .matches("(integer, integer+) -> number");
// ➔ true   (zero-or-more covers one-or-more)
```

This matters when a function is **stored** under a declared type. The
declaration is a contract: it tells callers which calls are legal, so whatever
is stored must handle all of them, and assigning does not reshape the declared
type. Passing a function as an **argument** to a callback slot is a different
question — see [Function Type](#function-type) below.

If a signature has a variadic argument, it must be the last argument in the list, 
and it cannot be combined with optional arguments.

### Function Type

The type `function` matches any function value — any parameter shape, any
effects. It is a distinct primitive, **not** a shorthand for a signature such
as `(any*) -> unknown`.

Where types are **compared** — `.matches()`, subtyping — a written signature
constrains callbacks contravariantly: its parameter types are a promise about
what callers may pass, so `(number) -> boolean` is not a subtype of
`(unknown) -> boolean`.

Where a function value is passed as an **operand at an arrow-typed parameter
slot**, admission is by **compatibility** instead: the operand is admitted
unless it is provably unusable — not callable at all, unable to accept the
number of arguments the operator supplies, provably disjoint in a parameter
or the result, or violating the slot's effect bound. This is what lets
`CountIf(xs, IsPrime)` work over an integer collection even though
`IsPrime: (number) -> boolean` is no contravariant subtype of the
instantiated slot, and what lets a mixed-type collection map a numeric
function per element. A callback that could never work — a number-only
predicate over a `list<string>`, a predicate that provably returns a
non-boolean — is rejected when the expression is canonicalized, with a
message naming both arrows. (Design ruling:
`docs/plans/2026-08-18-compatibility-admission-callbacks.md`.)

So: spell a callback slot as the arrow it supplies — the collection
operators read `(T) any -> boolean` for a predicate, `(T) any -> unknown`
for a key — and reserve the bare `function` for a slot whose contract the
type language cannot express (`Iterate`'s parametric accumulator,
`Tabulate`'s dimension-dependent arity).

### Effect Specifiers

A function signature can also state the **effects** of calling the function:
what it does besides returning a value. The effects go in a slot between the
argument list and the arrow.

```js
ce.type("(real) random -> real");     // may draw from the random stream
ce.type("(string) network -> string"); // performs host network I/O
ce.type("() scope -> nothing");       // mutates a binding that outlives the call
```

There are nine effect labels, a closed set:

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Label | Meaning |
| :------------ | :---------------------------------------------------------- |
| `console` | Emits host console or diagnostic output |
| `entropy` | Unseeded, non-replayable nondeterminism |
| `environment` | Reads host environment data: navigator, locale, environment variables |
| `fs_read` | Reads the host filesystem |
| `fs_write` | Writes the host filesystem |
| `network` | Performs host network I/O |
| `random` | May draw from the ambient seeded random stream |
| `scope` | May mutate a binding that outlives the call |
| `time` | Reads the host clock |

</div>

Several labels may appear in the slot, separated by spaces. They may be written
in any order; the canonical form orders them alphabetically.

```js
ce.type("(string) scope network -> string").toString();
// ➔ "(string) network scope -> string"
```

Two keywords may appear in the slot instead of labels:

- `any` means **unknown effects**. It is the top of the effect ordering: every
  consumer treats it as though every label, present and future, were there. Use
  it for an opaque function that cannot state what it does.
- `pure` means **no effects**, stated explicitly.

An **empty slot also means pure**. `(real) pure -> real` and `(real) -> real`
describe the same set of effects (none) and are interchangeable everywhere a
type is compared, but they are not spelled the same: `pure` is a *statement*,
and it survives serialization so that re-declaring from a serialized signature
keeps the purity contract. An empty slot states nothing, and leaves the effects
to be inferred from the function's body.

```js
ce.type("(real) pure -> real").toString();
// ➔ "(real) pure -> real"

ce.type("(real) -> real").toString();
// ➔ "(real) -> real"
```

The grammar fails closed. An unknown label, a repeated label, or `any` or `pure`
combined with anything else is a type error rather than a silently weakened
contract:

```js
ce.type("(real) rndm -> real");
// ➔ throws: Unknown effect label `rndm`

ce.type("(real) any random -> real");
// ➔ throws: `any` cannot be combined with other effect labels
```

Because argument lists are always parenthesized, the slot is positionally
isolated: an identifier there can only be an effect label, so adding a label in
a future version can never change how an existing type string parses.

#### Effects and Subtyping

Signatures are **covariant** in their effect set: a function that does less is
usable wherever a function that may do more is accepted. So `(real) -> real` is
a subtype of `(real) random -> real`, which is a subtype of `(real) any ->
real`.

In argument position this flips, which is what makes an annotated parameter a
*requirement*. A parameter typed with a bare arrow demands a **pure** callback,
and the check happens at the call boundary like any other argument check:

```js
ce.declare("integ", { signature: "((any) -> number, real, real) -> real" });

ce.box(["integ", ["Function", ["Add", "x", 1], "x"], 0, 1]).isValid;
// ➔ true

ce.box(["integ", ["Function", ["Random"], "x"], 0, 1]).isValid;
// ➔ false  (incompatible-type: "(any) -> number" vs "(unknown) random -> number")
```

To tolerate an effect rather than forbid it, list it: a parameter typed `(any)
random -> number` accepts both a drawing callback and a pure one. An operand
typed `any` fails every bound — a function that will not state its effects
cannot prove their absence.

The `function` primitive is the escape hatch: it is effect-top, so it accepts
any callable whatever its effects. That is why `Map(x |-> Random(), xs)` is
accepted; the effect is not rejected, it is simply carried onto the
application.

#### Inferred and Declared Effects

For a function you define, effects are normally **inferred** from the body, and
re-inferred every time you assign a new body. A bare arrow leaves them on that
inferred track — it declares the parameter and result types without pinning the
effects:

```js
ce.declare("draw", { type: "(number) -> number" });

// Accepted: the body draws from the random stream, and the inferred effects
// are revised to `random`.
ce.assign("draw", ce.box(["Function", ["Add", ["Random"], "n"], "n"]));

// Accepted too: a pure body revises them back.
ce.assign("draw", ce.box(["Function", ["Add", "n", 1], "n"]));
```

**`scope` is the one exception: it is opt-in.** A named definition that states
no effects promises it does not write outside itself, so a body with a *proven*
escaping write — an assignment to an enclosing binding, or an `Assume` — is
refused rather than silently re-stamped. Declare the `scope` effect to allow it:

```js
ce.declare("counter", { type: "number", value: 0 });
ce.declare("fib", { type: "(number) -> number" });

// Refused: the body assigns to the enclosing `counter`.
ce.assign("fib", ce.box(["Function",
  ["Block", ["Assign", "counter", ["Add", "counter", 1]], "n"], "n"]));
// ➔ throws: the body writes outside the function ... which requires
//   declaring the `scope` effect

// Accepted: `scope` opts in.
ce.declare("bump", { type: "(number) scope -> number" });
ce.assign("bump", ce.box(["Function",
  ["Block", ["Assign", "counter", ["Add", "counter", 1]], "n"], "n"]));
```

An **anonymous** literal is not gated — it has no annotation surface, and its
arrow carries the inferred `scope` honestly — so a factory that returns a
writing closure still installs under a bare arrow; the `scope` lives on the
inner arrow.

Stating the effects explicitly — a non-empty specifier, or the `pure` keyword —
turns them into a **contract** instead. Every body assigned to the symbol must
stay within it. Over-declaring is allowed (a pure body satisfies a `scope`
contract), but exceeding it is an `incompatible-type` error and the definition
is not installed:

```js
ce.declare("g", { type: "(number) pure -> number" });

ce.box(["Assign", "g", ce.box(["Function",
  ["Block", ["Assign", "counter", ["Add", "counter", 1]], "n"], "n"])]).evaluate();
// ➔ Error(ErrorCode("incompatible-type", "pure effects", "scope effects"))
```

This mirrors how the rest of the type system treats inference: an inferred type
is flexible and revisable, a declared one is enforced.

### Overload Sets

A function that can be called in several different ways is described by an
**intersection** of function signatures. The value inhabits every arm, that is,
it is callable at each of them.

```js
ce.declare("Draw", {
  signature: "((set<real>) -> real) & ((collection) -> any)",
  evaluate: (ops) => {
    /* dispatch on ops at run time */
  },
});

ce.box(["Draw", ["Interval", 0, 1]]).type; // ➔ "real"
ce.box(["Draw", ["List", 1, 2, 3]]).type; // ➔ "any"
ce.box(["Draw", 5]).isValid; // ➔ false
```

Use an intersection (`&`), not a union (`|`). A union would say the value is
callable in *one* of those ways without saying which, so a call site could rely
on none of them individually.

**Parenthesize each arm.** The `->` of a signature binds the loosest of all type
operators: its return type extends as far right as possible and absorbs any
following `&` or `|`. So `(number) -> real & string` is a *single* signature
returning `real & string`, not an intersection of two signatures.

When a call is made, the arm whose parameters accept the arguments is selected.
If several arms accept them, the **most specific** one wins — above,
`Interval(0,1)` is a `set<real>`, and since `set<real>` is a subtype of
`collection` both arms accept it, so the first arm is chosen and the result type
is `real` rather than `any`. Arms that are not comparable are tried in
declaration order, so it is good practice to write the most specific arm first.
If no arm accepts the arguments, the call is an error.

An overload set is a subtype of each of its arms:

```js
ce.type("((number) -> real) & ((string) -> boolean)").matches("(number) -> real");
// ➔ true
```

A symbol declared with an overload set behaves the same way:

```js
ce.declare("f", "((integer) -> integer) & ((string) -> string)");

ce.box(["f", 3]).type; // ➔ "integer"
ce.box(["f", "'a'"]).type; // ➔ "string"
ce.box(["f", true]).isValid; // ➔ false
```

Note that a single `["Function"]` literal usually cannot implement an overload
set: assigning `(x) -> x + 1` to the `f` above is rejected, because that one
body must satisfy both `(integer) -> integer` and `(string) -> string`. Overload
sets are intended for operators whose implementation dispatches on its arguments
at run time.

### Typed Function Literals

A `["Function"]` literal can declare the types of its parameters and its return
value. A parameter is annotated by writing it as `["Typed", _symbol_, _type_]`,
and a return type is ascribed by wrapping the body in a `Typed` expression. The
literal then has a **named function signature** built from these annotations:

```js
ce.box(["Function", ["Add", "x", 1], ["Typed", "x", "'integer'"]]).type;
// ➔ (x: integer) -> integer

ce.box(["Function",
  ["Typed", ["Add", "x", 1], "'integer'"],
  ["Typed", "x", "'integer'"]]).type;
// ➔ (x: integer) -> integer
```

The annotations are **authoritative** (an ascription, not a whole-body type
check): the declared types define the literal's signature directly. In strict
mode, the arguments of a typed literal are checked against the declared
parameter types when the function is applied — a mismatch produces an
`incompatible-type` error. Assigning a typed literal to a symbol gives that
symbol the annotated signature, including the return type.

The return ascription may also be a **full signature carrying effects** — this
is how a definition states its effect contract
(`function roll(n) random -> integer { … }` lowers to a body ascribed
`"(n: unknown) random -> integer"`). Because of that reading, ascribing an
*effect-bearing function type* as a plain **return type** requires grouping
parentheses around it:

```js
// The literal's own contract: `mk` draws from the random stream.
ce.box(["Function", ["Typed", body, "'(real) random -> real'"], "x"]);

// A pure literal whose RETURN VALUE is a drawing function: group the type.
ce.box(["Function", ["Typed", body, "'((real) random -> real)'"], "x"]);
```

The same rule applies in Epsil: write
`function mk(x) -> ((real) random -> real) { … }` for the effectful *return
type*, and `function roll(n) random -> integer { … }` for the definition's own
contract. An effect-free signature never needs the parentheses — it is always
read as a return type.

Two refinements apply to this check. A **collection argument against a scalar
parameter broadcasts**: with `h` declared `(number) -> number`, `h([1, 2, 3])`
— or `h(L + 1)` for a list-valued `L` — is accepted and maps element-wise,
typing as the corresponding vector. And a **collection parameter defers what
it cannot decide**: an argument whose static type neither proves nor refutes
conformance (say, a symbol declared plain `list` passed to a `matrix`
parameter) is accepted provisionally and checked against its actual value
when the operator evaluates; only a provable mismatch (a flat `list<number>`
can never be a matrix) errors immediately at canonicalization.

## Generic Signatures

A signature such as `(list<number>) -> number` pins the types of a function
once and for all. Many functions are not like that: reversing a collection
returns the same kind of collection it was given, and swapping the components
of a tuple returns those components in the other order, whatever they are. A
**generic signature** states such a relation between the argument types and
the result type directly, instead of giving up and returning `unknown`.

A generic signature is a function signature followed by a **quantifier
clause**: the keyword `where`, then a comma-separated list of **type
variables**. The clause always comes last, after the effect specifier and the
return type.

```js
ce.type("(T) -> T where T");                              // identity
ce.type("(tuple<T, U>) -> tuple<U, T> where T, U");       // swap
ce.type("(T) -> T where T: indexed_collection");          // reverse
ce.type("(list<T>, (T) any -> U) -> list<U> where T, U"); // map
```

Any identifier can be a type variable — there is no naming convention — and a
variable is only a variable because the clause declares it. The names are the
author's and they round-trip: `(list<Elem>) -> Elem where Elem` serializes
back with `Elem`, not with a canonical letter.

```js
ce.type("(list<Elem>) -> Elem where Elem").toString();
// ➔ "(list<Elem>) -> Elem where Elem"
```

Because the clause is last, nothing has to terminate it — a bound is a type,
and types extend as far right as they can, which is exactly what the final
position allows: `(T, x: real) -> boolean where T: (real) -> real` reads
without punctuation. A comma starts the *next* variable, and each variable
carries its own bound, so `where T, U: number` binds `T` unbounded and
`U: number` — not both to `number`.

Within a signature, every occurrence of a quantified name is the *same*
variable, including inside a nested signature: in
`(list<T>, (T) any -> U) -> list<U> where T, U` the callback's parameter
type is the list's element type. Note the `any` in the callback's effect slot
— a bare arrow demands a **pure** callback (see
[Effects and Subtyping](#effects-and-subtyping)), so an operator that accepts
arbitrary callbacks must write the effect-top form.

A variable may appear in an argument or result position, in the element
position of a constructed type (`list<T>`, `tuple<T, U>`, `set<T>`,
`collection<T>`, `dictionary<T>`, `broadcastable<T>`, a vector or matrix
element, a record field), inside a nested signature, and in **one arm of a
union**:

```js
ce.type("(T | missing) -> list<T> where T"); // an optional argument
ce.type("(list<T> | string) -> T where T");
```

At a call, an argument matched against a union parameter takes exactly one
arm. If it takes the **ground** arm, the argument says nothing about the
variable, and the variable is solved to `never` — the narrowest member of the
family — unless another argument constrains it. If it takes the **open** arm,
that arm is matched as usual, refutation included: a `set<integer>` is not a
`list<T> | string`.

Only **one** arm of a union may mention a variable. With two open arms nothing
at the call site says which arm a value took, so neither variable could be
solved:

```js
ce.type("(T | U) -> tuple<T, U> where T, U");
// ➔ throws: unsupported-variable-position: At most one arm of a union can
//   refer to a type variable, but `T | U` has 2. Nothing at a call site says
//   which arm a value took, so neither variable could be solved
```

A variable may **not** appear in an intersection or a negation. An
intersection is usually a constraint written in the wrong place: constrain a
variable with a **bound** in the clause instead.

```js
ce.type("(T & number) -> T where T");
// ➔ throws: unsupported-variable-position: The type variable `T` cannot
//   appear in an intersection. To constrain a type variable, declare a bound
//   on it instead: `where T: number`

ce.type("(T) -> T where T: number"); // …what that author meant
```

`where` is a reserved word in type strings: `ce.declareType("where", …)` is
a `reserved-type-name` error.

The prefix spelling `forall T. (T) -> T` was removed in favor of the trailing
clause. A leftover prefix clause is reported with a migration message naming
the replacement rather than a generic syntax error, and `forall` itself is now
an ordinary, declarable type name.

A **type alias** can be parameterized the same way — see
[Generic Type Aliases](#generic-type-aliases).

### Instantiating at the Call Site

Nothing stays generic once it is called. At each call the engine solves the
variables against the types of the actual arguments and substitutes the
solution into the result type, so the type of an application is always
**ground** — no variable ever escapes into an expression's type.

```js
ce.declare("first", {
  signature: "(indexed_collection<T>) -> T where T",
  evaluate: ([xs]) => xs.at(1),
});

ce.box(["first", ["List", 1, 2, 3]]).type; // ➔ "integer"
ce.box(["first", ["List", "'a'", "'b'"]]).type; // ➔ "string"
```

A variable that occurs at several argument positions is solved to the **join**
of what those positions contribute — the narrowest type that covers them all,
the same rule the engine uses elsewhere to type a result from several
operands:

```js
ce.declare("n", "integer");
ce.declare("r", "real");
ce.declare("pick", { signature: "(T, T) -> T where T" });

ce.box(["pick", "n", "n"]).type; // ➔ "integer"
ce.box(["pick", "n", "r"]).type; // ➔ "real"
```

Variables in element positions are solved by matching the argument's structure:

```js
ce.declare("swap", { signature: "(tuple<T, U>) -> tuple<U, T> where T, U" });

ce.box(["swap", ["Tuple", 1, "'a'"]]).type;
// ➔ "tuple<string, integer>"
```

A callback's parameter type is instantiated too, which is what makes an
annotated callback checkable and an unannotated one inferable at the right
type:

```js
ce.declare("keep", {
  signature: "(list<T>, (T) any -> U) -> list<U> where T, U",
});

ce.box(["keep", ["List", 1, 2, 3],
  ["Function", ["Greater", "x", 0], "x"]]).type;
// ➔ "list<boolean>"
```

If no solution satisfies every position, the call is an ordinary
`incompatible-type` error; the expected type reported is the *instantiated*
one, never variable syntax.

### Bounds

A variable can declare an **upper bound** with `T: <type>`. Only argument
types that are a subtype of the bound are accepted, and the variable still
binds the argument's type *verbatim* — so a bounded identity preserves the
argument's kind and its dimensions:

```js
ce.declare("rev", { signature: "(T) -> T where T: indexed_collection" });

ce.box(["rev", ["List", ["List", 1, 2, 3], ["List", 4, 5, 6]]]).type;
// ➔ "matrix<integer^(2x3)>"
```

Violating the bound is an error naming the bound:

```js
ce.box(["rev", ["Set", 1, 2]]).isValid; // ➔ false

ce.box(["rev", ["Set", 1, 2]]).toString();
// ➔ rev(Error(ErrorCode("incompatible-type", "indexed_collection",
//      "set<integer>")))
```

An unbounded variable has an implicit bound of `unknown`: `where T` is
shorthand for `where T: unknown` — "some value type" — and an explicitly
written `: unknown` is normalized away when the type is serialized. An
explicit `: any` bound is a different, wider contract (it additionally admits
the absence markers) and survives serialization. A bound must be a **ground**
type: it cannot mention a variable, its own or another's.

```js
ce.type("(U) -> T where T, U: list<T>");
// ➔ throws: unsupported-variable-position: The bound of the type variable
//   `U` must be a ground type: `list<T>` refers to a type variable
```

Several standard library operators are declared this way — `Identity` is
`(T) -> T where T`, `Reverse` is
`(T) -> T where T: indexed_collection`, `Inverse` is
`(T) -> T where T: matrix` — so their results are typed from their
arguments:

```js
ce.box(["Reverse", ["List", 1, 2, 3]]).type; // ➔ "vector<integer^3>"
```

A **scalar** bound interacts with broadcasting. On an operator that
broadcasts, a collection argument is admitted against a scalar parameter —
the bound is checked against the scalar base, as it always was — and the
variable binds the argument's **element** type; the call's ordinary broadcast
wrap then puts the argument's shape back on the result. `Conjugate` and
`Chop` are `(T) -> T where T: number`, `Remainder` is
`(T, T) -> T where T: number`:

```js
ce.box(["Conjugate", ["List", 1, 2, 3]]).type;
// ➔ "vector<integer^3>"

ce.box(["Remainder", ["List", ["List", 1, 2], ["List", 3, 4]], 7]).type;
// ➔ "matrix<integer^(2x2)>"
```

Broadcasting maps all the way down to the scalar leaves, so the variable is
bound to a leaf type whatever the argument's rank. Only the kinds a broadcast
actually maps are peeled: a `set` argument is admitted but never mapped
(`Conjugate(Set(1, 2))` stays a `set<integer>`), and a tuple is atomic
(`Conjugate((1, 2))` is a `tuple<integer, integer>`).

### Generic Overload Sets

Each arm of an [overload set](#overload-sets) carries its own clause, and each
arm must be parenthesized:

```js
ce.type("((list<T>) -> T where T) & ((set<T>) -> boolean where T)");
```

The parentheses are load-bearing. `where` binds looser than `&`, so an
unparenthesized clause attaches to the **whole** intersection rather than to
the arm on its left — and an intersection is not something a clause can
quantify. The two `T`s in the parenthesized form are unrelated: a clause
quantifies exactly one arm. A clause nested inside another signature is not
accepted either — quantification is top-level (or arm-level) only.

```js
ce.type("((list<T>) -> T) & ((set<T>) -> boolean) where T");
// ➔ throws: unsupported-variable-position: A `where` clause can only quantify
//   a function signature. To constrain one arm of an overload set,
//   parenthesize it: `((list<T>) -> T where T) & …`

ce.type("(x: ((U) -> U where U)) -> integer");
// ➔ throws: unsupported-variable-position: A `where` clause can only
//   quantify a top-level signature (or one arm of an overload set), not a
//   nested one. Parenthesize a nested clause: `((A) -> B where A, B)`
```

### Generic Declarations and Function Literals

A generic signature can be implemented by an ordinary function body — a
`["Function"]` literal, a `x |-> …` lambda, an Epsil `function` definition —
as long as the clause is stated on the *whole signature*. There are three
spellings.

**The `function f<T>(…)` definition form** (Epsil) puts a **type-parameter
clause** between the name and the parameter list. A parameter may carry a
ground bound, the effect specifier and the return type are unchanged, and the
clause names are usable anywhere in the head:

```plaintext
function f<T>(x: T) -> T { x + x }
function swap<T, U>(x: T, y: U) -> tuple<U, T> { (y, x) }
function g<T: number, U>(x: T, k: (T) any -> U) -> list<U> { [k(x)] }
function tick<T>(x: T) random -> T { x }
function h<T: (real) -> real>(k: T, x: real) -> real { k(x) }
```

A definition may state the same clause with a trailing `where` instead. The
two spellings are synonyms — `function f<T>(…)` is `function f(…) where T` —
and the clause always comes **last**, after the effect specifier and after the
return type, in every definition form:

```plaintext
function f(x: T) -> T where T { x + x }            // block, annotated
function f(x: T) where T { x + x }                 // block, return inferred
function tick(x: T) random -> T where T { x }      // block, with effects
f(x: T) -> T where T = x + x                       // math definition form
```

**One binding site per declaration.** A declaration may carry a `<…>` clause
or a `where` clause, never both: `function f<T>(x: T) -> T where T: number` is
an error, not a bounded `<T: number>`.

**A full-signature annotation** states the polytype where a type is expected
and leaves the body a plain literal. There is no binder slot here, so the
`where` clause is the only spelling:

```plaintext
const f: (x: T) -> T where T = x |-> x
```

```js
ce.box(["Function", ["Add", "x", "x"], "'(x: T) -> T where T'"]).type;
// ➔ "(x: T) -> T where T"
```

**Declare, then assign** — the form to use for a generic **recursive**
function, since the body can only call the symbol once it is declared:

```js
ce.declare("nest", "(x: T, n: integer) -> T where T");
ce.assign("nest", ce.box(["Function",
  ["If", ["LessEqual", "n", 0], "x", ["nest", "x", ["Subtract", "n", 1]]],
  "x", "n"]));

ce.box(["nest", 5, 3]).evaluate().toString(); // ➔ "5"
ce.box(["nest", 5, 3]).type; // ➔ "integer"
ce.box(["nest", "'a'", 2]).type; // ➔ "string"
```

However it is written, the declaration is what every call sees: the arguments
are checked against the clause, the bounds are enforced, and the result type
is the *instantiated* one, exactly as for a generic `evaluate` handler.

**What the body sees.** The clause quantifies the *signature*, not the body.
Inside the body a quantified parameter is an ordinary unannotated parameter:
`x: T` carries no type information there, a bound `T: number` does not make
the body see a `number`, and two parameters sharing `T` are not known to have
the same type. The clause is the **call-site contract**; the body is
canonicalized once, exactly as an untyped literal's is.

For the same reason the clause names scope over the definition's **head**
only — its parameters, its effect specifier and its return type. A body-local
type annotation naming a type variable is an unknown-type error:

```plaintext
function f<T>(x: T) -> T { let y: T = x; y }
// ➔ Unknown type "T"
```

**The result is a trusted ascription.** Nothing verifies that the body
actually returns a value of the argument's type — as with a
[typed function literal](#typed-function-literals), the annotation *is* the
type, it is not a run-time check:

```js
ce.declare("f", "(x: T) -> T where T");
ce.assign("f", ce.box(["Function", 0, "x"]));

ce.box(["f", "'a'"]).type; // ➔ "string"
ce.box(["f", "'a'"]).evaluate().toString(); // ➔ "0"
```

**Reading a polytype return annotation.** A polytype ascribed to the body of a
literal is always the literal's **own** signature — the same reading as an
effect-bearing annotation (see [Typed Function Literals](#typed-function-literals)).
An ungrouped signature is the contract; grouping it makes it an ordinary
*return type* instead:

```js
ce.box(["Function", ["Typed", body, "'(x: number) -> number'"], "x"]).type;
// ➔ "(unknown) -> number"                  (the marker IS the contract)

ce.box(["Function", ["Typed", body, "'((x: number) -> number)'"], "x"]).type;
// ➔ "(unknown) -> (x: number) -> number"   (it RETURNS a function)
```

That grouping escape is not available for a polytype: a literal cannot declare
that it *returns* a generic function, only that it *is* one, so a grouped
`where` clause in the body slot is a signature-marker error.

```js
ce.box(["Function", ["Typed", body, "'(T) -> T where T'"], "x"]).type;
// ➔ "(T) -> T where T"          (the literal is generic)
```

The same holds in Epsil: `function mk(x) -> (T) -> T where T { … }` defines
a generic `mk`.

**Broadcasting.** A generic literal broadcasts like any other function whose
parameters are scalar: a collection argument is mapped, down to the scalar
leaves, and the result carries the argument's shape. Since the variable binds
an *element* (see [Bounds](#bounds)), a result that mentions it is the
per-element answer:

```js
ce.declare("dup", "(x: T) -> tuple<T, T> where T");
ce.assign("dup", ce.box(["Function", ["Tuple", "x", "x"], "x"]));

ce.box(["dup", 5]).type;
// ➔ "tuple<integer, integer>"

ce.box(["dup", ["List", 1, 2]]).type;
// ➔ "list<tuple<integer, integer>>"

ce.box(["dup", ["List", 1, 2]]).evaluate().toString();
// ➔ "[(1, 1),(2, 2)]"

ce.box(["dup", ["List", ["List", 1, 2], ["List", 3, 4]]]).evaluate().toString();
// ➔ "[[(1, 1),(2, 2)],[(3, 3),(4, 4)]]"
```

**Limits.** The first four are rejected, each with its own message:

- **No partial application.** A generic function must be given all of its
  arguments; currying one reports
  `Partial application of a generic function is not supported`. (Solving the
  supplied prefix and pruning the clause is future work.)
- **No generic clause in a multi-clause set**, in either direction: neither a
  second clause added to a generic definition nor a generic clause added to an
  existing one (`generic-clause-unsupported`).
- **No literal body for a generic overload set.** An intersection with a
  generic arm still needs an `evaluate` handler — the same reason a single
  literal cannot implement an ordinary [overload set](#overload-sets).
- **The math definition form does not take a clause.** In Epsil,
  `f<T>(x) = x` is an ordinary expression (`f < T > (x)`, then `= x`), not a
  definition — only the `function` keyword form claims the `<…>` slot.
- **Compilation declines.** A generic function is not compiled — `compile()`
  falls back to the (correct) interpreted evaluation for any expression that
  calls one. A compiled body could not reproduce behavior that depends on the
  parameter types — a collection argument that would broadcast, in
  particular — so the engine declines whole-fn rather than produce a wrong
  value; per-instantiation compilation is future work.

## Literal Type

A **literal type** is a type that represents a single value. 

The value can be:
- a boolean: `true` or `false`
- a number, such as `42`, `-3.14`, or `6.022e23`
- a string, such as `"yellow"`, 

Literal types can be used in conjunction with a union to represent a type that 
can be one of multiple values, for example:

- `0 | 1` is the type of values that are either `0` or `1`.
- `"red" | "green" | "blue"` is the type of values that are either of the 
  strings `"red"`, `"green"` or `"blue"`.

### Number Literals Have Literal Types

The type of a number literal **is** its literal type: the most precise
claim the type system can make about it.

```js
console.info(ce.box(42).type);
// ➔ "42"

console.info(ce.box(-3.14).type);
// ➔ "-3.14"
```

A literal type is a subtype of its numeric tier — `42` matches `integer`,
`real`, and `number` — so a literal is accepted anywhere its tier is, with
no conversion and no cast. To check what kind of number an expression is,
use `.matches()` (or the `isInteger`/`isRational`/`isNumber` shortcuts),
never a string comparison of the type's name:

```js
console.info(ce.box(42).type.matches("integer"));
// ➔ true

console.info(String(ce.box(42).type) === "integer");
// ➔ false — the type's *name* is "42"
```

### How a Number Literal Is Typed

Some exact values cannot be spelled as a plain value type. The engine
therefore picks one of three forms:

1. **A machine number holds the value exactly**: the type is that value.
   `ce.box(21).type` is `21`, and `ce.box(0.5).type` is `0.5`.
2. **A machine number holds the value exactly, but the value is an exact
   rational**: the type is the `rational` tier with a **singleton
   range**. $\nicefrac{1}{2}$ has type `rational<0.5..0.5>`. A bare
   value type cannot be used here: the lattice does not class a bare
   numeric value as rational, so `0.5` matches `real` but not `rational`.
3. **No machine number holds the value** — $\nicefrac{1}{3}$, $\sqrt2$,
   $10^{30}+1$: the type is a compact **closed range** on the tier of the
   value. Both bounds are rounded *outward* to two significant digits.

```js
console.info(ce.parse("1/3").type);
// ➔ "rational<0.33..0.34>"

console.info(ce.parse("\\sqrt2").type);
// ➔ "real<1.4..1.5>"

console.info(ce.parse("10^{30}+1").evaluate().type);
// ➔ "integer<9.9e+29..1.1e+30>"
```

The bounds of an enclosing range provably contain the exact value, so the
type never claims a value the literal does not have. The bounds also
exclude zero, which keeps the sign of the literal a type fact, and the
range is never a singleton, so no operation can mistake a bound for the
value itself.

Domain checks read these bounds. The type of $\nicefrac{1}{3}$ proves that
its magnitude is not more than $1$, so its arcsine stays real:

```js
console.info(ce.parse("\\arcsin(1/3)").evaluate().type);
// ➔ "real"
```

When the magnitude of the value is outside the range of normal machine
numbers, no sound compact range exists. The type then falls back to a
claim about the sign only:

```js
console.info(ce.parse("10^{400}").evaluate().type);
// ➔ "(integer<0..>) & !0"
```

### Literal Types Are Not Stored

A literal type belongs to the literal itself. It lives at expression
positions only. Whenever a type is **stored** — inferred for a
declaration, solved for a generic type variable, synthesized for a
collection, derived as the signature of a function literal, or recorded as
the result of an operator — the literal widens to its tier:

```js
ce.assign("k", 42);
console.info(ce.box("k").type);
// ➔ "integer" — inference stores the tier, not the value

ce.declare("identity", "(x: T) -> T where T");
console.info(ce.box(["identity", 5]).type);
// ➔ "integer" — the type variable binds the tier, never `5`

console.info(ce.box(["List", 1, 2, 3]).type);
// ➔ "vector<integer^3>" — cells widen to their tier

console.info(ce.parse("(\\sqrt2, 1/3)").type);
// ➔ "tuple<real, rational>" — components carry their tier, never the
//    enclosing range each literal reports on its own

console.info(ce.box(["Function", 21]).type);
// ➔ "() -> integer" — a derived signature stores the tier
```

This is the same discipline as `const`/`let` literal types in TypeScript:
maximum precision at the expression, a reusable contract in storage.

One place the extra precision is directly useful: type errors name the
offending value. A wrong argument reports "expected `integer`, got `2.5`"
rather than "got `real`".


## Other Constructed Types

Types can be combined to form new types using a **union**, an **intersection**, or a **negation**.

### Union

A **union** is the type of values that are in either of two types.

Unions are useful when a value may be one of several possible types.

The type of a union is represented by the type expression `T1 | T2`, where `T1` and `T2` are the types of the values.

For example, `number | boolean` is the type of values that are numbers or booleans.

### Intersection

An **intersection** is the type of values that are in both of two types.

Intersections are useful when a value must satisfy multiple type constraints at once.
They can be used to model values that meet several structural or semantic requirements.

The type of an intersection is represented by the type expression `T1 & T2`, where `T1` and `T2` are the types of the values.

Intersections are most useful for extending or combining record types.

For example, `record{length: integer} & record{size: integer}` is the type of values 
that are records with both a `length` and a `size` key, that is `record{length: integer, size: integer}`.

An intersection of **function signatures** describes a function that can be
called in several different ways — see [Overload Sets](#overload-sets). Each arm
must be parenthesized, since `->` binds looser than `&`.


### Negation

A **negation** represents values that are excluded from a given type.

This can be useful for excluding special cases such as `0`, `NaN`, or `Infinity`.

A type negation is represented by the type expression `!T`, where `T` is a type.

For example, `!integer` is the type of values that are not integers.

The type `integer & !0` is the type of values that are integers but not `0`.






## Matching Types

Two types can be evaluated for **compatibility**. 

A type `A` matches type `B` if all values of `A` are also values of `B`, that is, if `A` is a subtype of `B`.
Matching is used for type checking and for validating function arguments.

**To check if two types are compatible**, use the `type.matches()` method.

```js
ce.type("integer").matches("number");
// ➔ true

ce.type("number").matches("integer");
// ➔ false

ce.parse("3.14").type.matches("real");
// ➔ true
```
:::warning
Do not check for type compatibility by comparing the type strings directly.

Type strings may represent refined or derived types 
(e.g. `real<0..>` where you expected `real`, or the literal type of a
number), so use 
`.matches()` for compatibility checks instead of strict equality.

```js
ce.parse("3.14").type === "real";
// ➔ false (the type is actually "3.14", the literal type)

ce.parse("3.14").type.matches("real");
// ➔ true
```

:::

### Compatibility of Complex Types

When checking compatibility of complex types, both structure and element types must be considered.

Compatibility of complex types follows specific rules depending on the type of structure, such as records, tuples, or lists.

#### Records

Records are compatible if they have the same keys and the values are compatible.

```js
ce.box({ dict: { red: 1, green: 2 } }).type
  .matches("record{red: integer, green: integer}");
// ➔ true
```

**Width subtyping** is supported for records, meaning that a record with more keys is
compatible with a record with fewer keys.

```js
ce.box({ dict: { red: 1, green: 2, blue: 3 } }).type
  .matches("record{red: integer, green: integer}");
// ➔ true
```


#### Dictionaries
Dictionaries are compatible if the values are compatible.

```js
ce.box({ dict: { red: 1, green: 2 } }).type
  .matches("dictionary<integer>");
// ➔ true
```

Records are compatible with dictionaries if all the values of the record are 
compatible with the dictionary's value type.

```js
ce.box({ dict: { red: 104, green: 2, blue: 37 } }).type
  .matches("dictionary<integer>");
// ➔ true
ce.box({ dict: { user: { str: "Bob" }, age: 24 } }).type
  .matches("dictionary<integer>");
// ➔ false
```



#### Tuples

Tuples are compatible if they have the same length and the elements are compatible.

```js
ce.parse("(1, 2, 3)").type
  .matches("tuple<integer, integer, integer>");
// ➔ true
```

If the elements of a tuple are named, the names must match.

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("tuple<x: integer, y: integer>");
// ➔ true

ce.type("tuple<x: integer, y: integer>")
  .matches("tuple<a: integer, b: integer>");
// ➔ false
```


#### Lists

Lists are compatible if they have the same length and the elements are compatible.

```js
ce.parse("\\[1, 2, 3\\]").type
  .matches("list<integer>");
// ➔ true
```

#### Function Literals

Function literals are compatible if the input types are compatible and the 
output types are compatible, specifically the output type is covariant and the 
input types are contravariant.


```js
ce.type("(number) -> integer")
  .matches("(integer) -> number");
// ➔ true
```

The name of the arguments of a function signature is not taken into account when
checking for compatibility.

```js
ce.type("(x: integer) -> integer")
  .matches("(integer) -> integer");
// ➔ true
```

### Could a Value Be of a Type?

`matches()` asks whether **every** value of a type is a value of the target. 
That is the right question for type checking, but not for classifying a value 
by its shape — and the two answers differ on **union types**.

A union matches a target only if *every* one of its members does, so a union 
answers `false` even when one of its members is exactly the shape you asked 
about:

```js
ce.type("integer | string").matches("integer");
// ➔ false  (a `string` is not an `integer`)
```

**To check whether a value of a type could be of another type**, use 
`type.couldMatch()`:

```js
ce.type("integer | string").couldMatch("integer");
// ➔ true

// Unions are distributed at every depth, including inside a parameter
ce.type("list<integer | string>").couldMatch("list<integer>");
// ➔ true  (witness: `[1, 2]`)
```

`couldMatch()` is symmetric, and decisive for the composite shapes it models — 
list elements and dimensions, tuple arity and element names, and the element 
type of sets and collections:

```js
ce.type("tuple<number, number>").couldMatch("list<tuple<number, number>>");
// ➔ false  (a point is not a list of points)

ce.type("list<integer>").couldMatch("list<string>");
// ➔ false
```

The `never` type has no values, so nothing could be one — the one place 
`couldMatch()` deliberately differs from `matches()`, for which `never` is a 
subtype of everything. An `unknown` type could be anything: check `isUnknown` 
if you want to treat an inconclusive type as a non-match.

```js
ce.type("never").couldMatch("integer");
// ➔ false   (`ce.type("never").matches("integer")` is `true`)

ce.type("unknown").couldMatch("integer");
// ➔ true
```

**To examine the members of a union**, use `type.unionMembers`. Any other type 
yields a single-element array, so the same code path works for both:

```js
ce.type("integer | string").unionMembers.map((t) => t.toString());
// ➔ ["integer", "string"]

ce.type("integer").unionMembers.map((t) => t.toString());
// ➔ ["integer"]
```

Note that `unionMembers` does not reach a union nested inside a parameter — 
`list<integer | string>` is a single member. Use `couldMatch()`, which handles 
that case directly.

**To check whether two types have no values in common**, use 
`type.isDisjointFrom()`:

```js
ce.type("integer | string").isDisjointFrom("boolean");
// ➔ true

ce.type("integer | string").isDisjointFrom("integer | boolean");
// ➔ false  (they share `integer`)
```

Types are separated by category, so a composite type is disjoint from a 
primitive one and from a composite of another kind — a `list` is not a 
`string`, a `tuple` is not a `list`. (A `record`, however, is NOT disjoint
from a `dictionary`: a record is the named-shape subtype of dictionary in
the type hierarchy, so a record value is a dictionary value.)

```js
ce.type("list<integer>").isDisjointFrom("string");
// ➔ true

ce.type("tuple<number, number>").isDisjointFrom("list<tuple<number, number>>");
// ➔ true
```

:::warning
`isDisjointFrom()` is conservative: when disjointness cannot be established the 
answer is `false`, meaning "these may overlap", never a false claim of 
disjointness.

Because of that, `!isDisjointFrom()` is **not** the same as `couldMatch()` and 
should not be used to classify a value by shape. Two collections whose element 
types cannot coincide are the case to watch:

```js
ce.type("list<integer>").isDisjointFrom("list<string>");
// ➔ false — "may overlap"

ce.type("list<integer>").couldMatch("list<string>");
// ➔ false — the answer you want
```

:::

### Generic Patterns

A [generic signature](#generic-signatures) can be used as a pattern, and the 
two predicates ask different questions about it — deliberately.

`matches()` is an **existential** check: does *some* instantiation of the 
pattern's variables make the subject a subtype? That is what "is this an 
identity function?" usually means:

```js
ce.type("(number) -> number").matches("(T) -> T where T");
// ➔ true  (instantiate `T` as `number`)

ce.type("(integer) -> string").matches("(T) -> T where T");
// ➔ false  (no single `T` is both `integer` and `string`)
```

The instantiation is consistent across every occurrence of a variable, and it 
must satisfy the variable's bound:

```js
ce.type("(list<integer>) -> list<integer>")
  .matches("(T) -> T where T: indexed_collection");
// ➔ true

ce.type("(set<integer>) -> set<integer>")
  .matches("(T) -> T where T: indexed_collection");
// ➔ false  (a `set` is not an `indexed_collection`)
```

`couldMatch()` solves nothing. It reads each occurrence of a variable as its 
declared bound — `any` when the variable is unbounded — with no consistency 
between occurrences. For a signature pattern that reading is decided by the 
parameter position, which is contravariant, so the same identity probe answers 
`false`:

```js
ce.type("(number) -> number").couldMatch("(T) -> T where T");
// ➔ false  (the pattern reads as `(any) -> any`)

ce.type("(number) -> number").couldMatch("(any) -> any");
// ➔ false  (the ground row it reduces to)
```

So ask `matches()` when the *pattern* is generic. `couldMatch()` earns its keep 
on the other side, when a generic type is the **subject** being classified — 
and there the bound is what makes the answer informative. An unbounded variable 
reads as `unknown` and cannot rule anything out:

```js
ce.type("(T) -> T where T").couldMatch("(any) -> string");
// ➔ true  (`T` reads as `unknown`: vacuous)

ce.type("(T) -> T where T: number").couldMatch("(any) -> string");
// ➔ false  (`T` reads as `number`, which is not a `string`)

ce.type("(T) -> T where T: number").couldMatch("(any) -> number");
// ➔ true
```

A generic signature is a function value like any other, so it could be a 
`function`, and a bound is read on the subject side too:

```js
ce.type("(T) -> T where T").couldMatch("function");
// ➔ true

ce.type("(T) -> T where T: indexed_collection")
  .couldMatch("(indexed_collection) -> indexed_collection");
// ➔ true

ce.type("(T) -> T where T")
  .couldMatch("(indexed_collection) -> indexed_collection");
// ➔ false  (`T` reads as `any`, which is not an `indexed_collection`)
```

### Checking the Type of a Numeric Value

The properties `expr.isNumber`, `expr.isInteger` and `expr.isRational` are
shortcuts to check if the type of an expression matches the types
`"number"`, `"integer"` and `"rational"` respectively. The last two tiers
are finite, so $\pm\infty$ and $\mathrm{NaN}$ answer `false` to both while
still answering `true` to `isNumber`.

There is no shortcut for bare `real`. The related property
`expr.isExtendedReal` asks the **extended** question — *is this a point of
the extended real line?* — so it is `true` for a finite real **and** for
$\pm\infty$. It is `false` for $\mathrm{NaN}$, for the unsigned
$\tilde\infty$ and for a number with an imaginary part. It is exactly
`type.matches("real | +oo | -oo")`. To ask the finite question
instead, use `type.matches("real")`, or pair `isExtendedReal` with
`expr.isFinite`.

```js
console.info(ce.expr(3.14).type);
// ➔ "3.14" — a literal's type is its literal type (see Literal Type)

console.info(ce.expr(3.14).type.matches("real")) 
// ➔ true

console.info(ce.expr(3.14).isExtendedReal) 
// ➔ true

console.info(ce.parse("\\infty").isExtendedReal) 
// ➔ true — infinite, but still on the extended real line

console.info(ce.parse("\\infty").type.matches("real")) 
// ➔ false — bare `real` is finite

console.info(ce.expr(3.14).type.matches("integer")) 
// ➔ false

console.info(ce.expr(3.14).isInteger) 
// ➔ false

```

:::info **Renamed: `isReal` is now `isExtendedReal`**

`isExtendedReal` was called `isReal` before the numeric types became
finite by default. The rename is not cosmetic: the old name suggested the
bare `real` tier, but the property has always admitted $\pm\infty$, which
bare `real` no longer does.
:::


## Type Inference

When  an explicit type is not provided for a symbol, the Compute Engine will
attempt to **infer** the type of the symbol based on the context in which it is used.
This process is known as **type inference**.

When assigning a value to an undeclared symbol, the type of the value is
used to infer the type of the symbol.

If the symbol is a constant, the type is used exactly as the type of the symbol.
If the symbol is a variable, the type of the value may be widened to a more general 
type:

<div className="symbols-table" style={{"--first-col-width":"18ch"}}>


| Value Type         | Inferred Symbol Type |
|:--------------------|:----------------------|
| `complex`  <br/> `imaginary`          | `number`            |
| `integer`           | `integer`             |
| `real` <br/> `rational`          | `real`            |
| `infinity`          | `infinity`            |
| `nan`          | `nan`            |

</div>

Examples:

<div className="symbols-table" style={{"--first-col-width":"8ch"}}>

| Value               | Value Type | Inferred Symbol Type |
|:--------------------|:--------------------------|:--------------------------|
| 34                  | `integer` | `integer`                |
| 3.14                | `real` | `real`                   |
| 4i                   | `imaginary` | `number`                   |
| 1/2                  | `rational` | `real`                   |
</div>

```js
ce.assign("n", 34);
ce.expr("n").type;
// ➔ "integer"
```

When a symbol is used in a function expression, the expected type of the
arguments is used to infer the type of the symbol.

```js
ce.declare("n", "unknown");
ce.declare("f", "(number) -> number");
ce.expr(["f", "n"]);
ce.expr("n").type;
// ➔ "number"
```

A type that has been inferred can be refined later, for example by
assigning a value of a more specific type to the symbol or by using the
symbol in a context that requires a more specific type.

Use-driven refinement applies to symbols that do **not** hold a value: for
a mathematical unknown, a use *declares* what the symbol must be. Once a
symbol **has been assigned**, its type records what it actually holds —
that is evidence, and a later use is a requirement *checked against* the
evidence rather than a refinement of it:

```js
ce.declare("k", "(integer) -> integer");

// Valueless symbol: the use DECLARES its type
ce.expr(["k", "n"]);
ce.expr("n").type;         // ➔ "integer"

// Assigned symbol: the use CHECKS against the evidence
ce.assign("x", 3.5);       // x: real (widened per the table above)
ce.expr(["k", "x"]);       // ➔ incompatible-type error, at canonicalization
ce.expr("x").type;         // ➔ still "real" — the use did not rewrite it
```

Without this distinction a use could silently overwrite what an assignment
had established, deferring the mismatch to evaluation time.

The same distinction is applied **statically** to a whole Epsil program:
the pre-run check (`epsil check`, and the diagnostics phase of running a
file) tracks the type effect of each top-level declaration and assignment
in order — without evaluating anything — so the program

```
let x
let f: () -> integer
let g: () -> number
let k: (integer) -> integer
x = f()
x = g()
k(x)
```

reports `expected integer, got number at x` as a **static** diagnostic,
before anything runs. Assignment is last-write-wins: swapping the two
assignments makes the program correct, and the check accepts it.

Continuing the example above:

```js
ce.declare("g", "(integer) -> number");
ce.expr(["g", "n"]);
ce.expr("n").type;
// ➔ "integer": "n" has been narrowed 
//    from "number" to "integer"
```

### Declared vs Inferred: Contract vs Evidence

A type reaches a symbol on one of two tracks, and they behave differently:

- A **declared** type — written by you, in `ce.declare("a", "list")` or
  `let a: list` — is a **contract**. It never moves: assigning `[1, 2, 3]`
  to `a: list` leaves `a`'s type `list`, even though the value's own type is
  the much more precise `vector<integer^3>`. An assignment that
  violates the contract (`a = 42`) is an `incompatible-type` error.
- An **inferred** type — produced by the engine from evidence — is
  **revisable**. It follows the value: after `b = [1, 2, 3]` an undeclared
  `b` types `vector<integer^3>`; after `b = ["x", "y"]` it types
  `list<string^2>`. Inference is never a trap: a new assignment or a new use
  re-infers.

For a **bare collection annotation**, the contract is the *constructor*
and the element slot is a placeholder that refines from evidence: `a: list`
holding `[1, 2, 3]` reports `list<integer>` — the element type came
from the assignment, while rank and length stay open (you wrote `list`, so
list-ness of any shape is what you chose). The refinement never hardens:
`a = ["x"]` re-refines to `list<string>`, exactly as an unannotated
variable would re-infer, and `a = 42` is still rejected against the `list`
contract. An *explicit* element type (`list<integer>`, `list<any>`) is a
full contract and never moves. For non-collection loose annotations the
same principle applies at whole-type granularity: `x: unknown` behaves
like no annotation at all, while `x: any` is a fixed contract.

### When Inference Triggers

Inference writes happen at these moments:

1. **Assignment to an undeclared symbol** (or one declared `unknown`): the
   value's type — widened per the table above — becomes the symbol's
   inferred type, and each later assignment re-infers.
2. **Argument positions**: passing an `unknown`-typed symbol to a typed
   parameter narrows the symbol to the parameter's type (see the `f(n)`
   examples above). This includes *forwarding* through user functions: in
   `g(c) = pick(c)` where `pick`'s own body indexes its parameter, the
   collection evidence inferred for `pick` propagates to `c`, so `g` binds
   a list argument whole instead of broadcasting over it.
3. **Function-literal bodies**: a bare (unannotated) lambda parameter starts
   as `unknown` and is narrowed by how the body *uses* it — indexing
   (`v[1]`) narrows it to a collection through `At`'s signature, arithmetic
   infers numeric, boolean use infers `boolean`. The lambda's stored
   signature carries what the body proved and nothing more.
4. **Uses of an element**: a use of an element taken out of a collection
   refines the collection's *element* type. `xs[1] + 1` makes an undeclared
   `xs` an `indexed_collection<number>`, `xs["a"] + 1` a
   `dictionary<number>`, `First(xs) + 1` an `indexed_collection<number>`,
   and `k(xs[1])` with `k: (integer) -> integer` an
   `indexed_collection<integer>`. A chained access reaches the outer
   collection (`m[1][2] + 1` makes `m` an
   `indexed_collection<indexed_collection<number>>`), and a lambda
   parameter shows the refinement on its arrow: `(v) => v[1] + 1` types
   `(v: indexed_collection<number>) -> broadcastable<number>`. The element
   written is the scalar reading — `number`, exactly as `x + 1` infers a
   bare `x` — and a boolean use commits `boolean` the same way, so a later
   numeric use of that element is an `incompatible-type` error, as it is
   for a scalar after `And(x, B)`. The write is inference: a later
   assignment replaces it, and a *declared* type — a contract such as
   `list<any>`, or the bare placeholder `list` — is never moved by a use.
5. **Declared placeholders refined by definitions**: a declared `unknown`
   *slot* in a function type is a placeholder, not a constraint — assigning
   a body to `f: (unknown) -> unknown` replaces each `unknown` slot with the
   slot the body's inference produced, and the refined signature is what is
   stored. (An explicit `any` slot is the opposite: a contract the body must
   honor.)

### `unknown` vs `any`, and What a Bare Type Means

The two "loose" types divide the work (see also the primitive-types table):

- **`unknown`** — "some *value*, not stated which". It is the top of the
  value types: every value type is a subtype of it, but the absence markers
  (`nothing`, `missing`) are **not** — absence is opt-in. An `unknown` in a
  signature slot or an unbounded `where T` is a **placeholder** that later
  evidence refines. A *value* typed `unknown` is a placeholder too: because
  it claims nothing, no declaration can refute it, so assigning it to a
  declared symbol is admitted unchecked — `let xs: list` accepts
  `xs = f(0)` for an `f` with no signature, exactly as a `list` parameter
  accepts the same argument, and neither is re-examined later. A declared
  function *signature* is the exception: it keeps refusing an `unknown`
  value, since admitting one would make the name callable under a contract
  nothing proved.
- **`any`** — the true top type, admitting absence markers as well. An
  explicit `any` is a deliberate, *wider* **contract**: `(any) -> any`
  promises to accept everything; `list<any>` admits a list with absent
  elements. `any` is strictly above `unknown` (`unknown ⊑ any`, but not the
  converse).

A **bare collection constructor is a synonym for its `<unknown>` form**:
`list` *is* `list<unknown>` — "some list of values" — and likewise `set`,
`dictionary`, `collection` and `indexed_collection`. The explicit
`<unknown>` spelling normalizes to the bare name. `list<any>` is a
different, strictly wider type. Practical consequences:

```js
ce.type("list<integer>").matches("list");        // ➔ true
ce.type("list").matches("list<any>");            // ➔ true
ce.type("list<any>").matches("list");            // ➔ false (may hold absences)
ce.type("list<integer|missing>").matches("list") // ➔ false
ce.type("list<integer|missing>").matches("list<any>") // ➔ true
```

If you write your own type tests, the distinction matters in one place:
asking "is this operand collection-*shaped*?" must be asked against the
`<any>` family top (`matches("collection<any>")`), because a bare name in
that position now means "collection of values only" and would wrongly
exclude a `list<any>`-declared symbol or a `Missing`-bearing list. Asking
"does this fit a list of values?" is exactly what the bare name is for.

### Which spelling, when

Most code never needs to choose — inference handles the common cases. When
you do write one of the loose spellings, pick by role:

- **Declaring an operator or function that *consumes* a collection?** Spell
  the parameter **`collection<any>`** (or `list<any>`,
  `indexed_collection<any>`, …): "hand me any collection whatsoever and I
  will deal with its contents." A structural operator can always answer its
  question — membership against an element incomparable with the subject is
  simply `False`, an absent slot is handled by the missing-value machinery —
  so its parameter should not reject at the type gate what it can handle at
  run time. This is how the standard library spells its own collection
  parameters (`Element`, `At`, `Take`, …).
- **Annotating *your own* data when you don't yet know the element type?**
  Spell it bare — **`collection`**, **`list`** — or simply leave it off and
  let inference track the values. The bare form says "some collection of
  values, to be determined", which is almost always what you mean about
  your own data.
- **Expecting absent entries in your own data?** Say so: `list<number |
  missing>` for a specific hole type, or `list<any>` to leave the door
  fully open. Writing it down is what buys you checking — see below.

### Why absence is not part of `unknown` (for the curious)

The distinctions above rest on one deliberate choice that can surprise
readers arriving from TypeScript, where `unknown` is the absolute top type
and happily includes `null`/`undefined`. Here it is not: `unknown` means
"some **value**, not yet determined *which*" — it is epistemic about which
value a position holds, not about whether it holds one. `Missing` is not a
value the position might turn out to contain; it is the positioned absence
of one. "I don't know which value this is" and "there may be no value here
at all" are different claims, and the type lattice keeps them apart: `any`
is the genuine top (anything, absence included); `unknown` is the top of
the values. (`error`, the type of an invalid expression, is likewise
outside `unknown`: it is a subtype only of itself and `any`.)

What this buys is that **absence is opt-in** — the `Option`/`Maybe`
discipline rather than nullable-by-default. An absent case enters a type
only when someone writes it down, and then every consumer is forced to see
it:

- `RangeOf` returns `range | nothing` — the not-found case is *in the
  type*, so code that feeds the result to `Slice` is checked against it.
- `[1, Missing]` types as `list<integer | missing>` — the hole is
  visible, and the missing-propagation machinery keys off exactly that
  visibility.
- A parameter, lambda slot, or inferred type that never mentions absence
  genuinely never receives it silently.

If `missing` were a subtype of `unknown`, every unannotated parameter and
every inferred slot would admit `Missing` without anyone having said so —
`| missing` annotations would become decoration, and `unknown` would be
nullable-by-default. Structurally, the absence markers (with `error`) are
also precisely what separates `any` from `unknown`: remove them from the
gap and the two tops would denote the same set of values, collapsing the
`list` / `list<any>` distinction along with them.

## Defining New Types

**To define new types** use the `ce.declareType()` function.
This enables defining domain-specific types that can improve type checking and clarity.
Custom types help document intent and improve code maintainability.

For example, to defines a new type `point` that is a tuple of two 
integers, `x` and `y`:

```js
ce.declareType(
  "point",
  "tuple<x: integer, y: integer>"
);
```

Types are **engine-global**: unlike value bindings, they are not lexically
scoped. A declared type name means the same thing everywhere on the engine,
for the engine's lifetime. Declaring a name that is already declared is an
error (a `DeclareType` statement may replace an earlier `DeclareType`
statement's definition — the notebook re-run flow — but never a host- or
builtin-declared one).

A program can declare its own types with the `["DeclareType"]` operator —
the MathJSON mirror of `ce.declareType()` — or, in Epsil, with the `type`
statement. Because types are global, these statement forms are only valid at
the **top level** of a program: inside a block or a function body they are an
error and declare nothing. The statement comes in two forms:

```plaintext
type point = tuple<x: number, y: number>  // nominal
type alias pair = tuple<number, number>   // structural alias
let p = point(1, 2)
let a: pair = (1, 2)
```

A bare `type` declares a **nominal** type (see below): a new, distinct type
that no structural value inhabits — `let q: point = (1, 2)` is rejected,
since the type of `(1, 2)` is a tuple, not a `point`. Values of a nominal
type come from its **constructor** instead (`point(1, 2)`, see below). It
lowers to `["DeclareType", "point", "'tuple<x: number, y: number>'"]`.

`type alias` declares a **structural alias**: any value matching the
definition is compatible with the type. It lowers to the same operator with
the attributes dictionary `["Dictionary", ["KeyValuePair", "alias",
"True"]]` — the surface mirror of `ce.declareType()`'s `{ alias: true }`
option.

Both forms can take type parameters — `type alias Pair<T> = tuple<T, T>`, see
[Generic Type Aliases](#generic-type-aliases), and
`type tree<T> = tuple<value: T, children: list<tree<T>>>`, see
[Parameterized Nominal Types](#parameterized-nominal-types). They differ in
what an application means: an alias *expands*, a nominal type stays opaque.


### Nominal vs Structural Types

By default, types are nominal, meaning that to be compatible two types must have 
the same name and not just the same structure.

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("point");
// ➔ false
```

**To make a type structural**, use the `ce.declareType()` function with the
`alias` option. Two structural types are compatible if they have the same structure,
regardless of their names.

```js
ce.declareType(
    "pointData", "tuple<x: integer, y: integer>", 
    { alias: true }
);
```

```js
ce.type("tuple<x: integer, y: integer>")
  .matches("pointData");
// ➔ true
```

### Generic Type Aliases

An alias can take **type parameters**, declared in a clause between its name
and its definition. The applied spelling is then usable anywhere a type is
written, and it expands **transparently**: `Pair<integer>` *is*
`tuple<integer, integer>`.

```js
ce.declareType("Pair", "tuple<T, T>", { alias: true, typeParams: ["T"] });

ce.type("Pair<integer>").toString();
// ➔ "tuple<integer, integer>"

ce.box(["Tuple", 1, 2]).type.matches("Pair<integer>"); // ➔ true
```

The parameters may be given as names (each with an optional bound), as
records (`[{ name: "T", bound: "number" }]`), or as a single clause string
(`"T, U: number"`). In Epsil, the same declaration is a `type alias`
statement with a type-parameter clause — the clause a
[generic function definition](#generic-declarations-and-function-literals)
takes:

```plaintext
type alias Pair<T> = tuple<T, T>
let p: Pair<integer> = (1, 2)
```

An argument may be any type, including another application, and an alias may
be applied inside another alias's definition:

```js
ce.type("list<Pair<integer>>").toString();
// ➔ "list<tuple<integer, integer>>"

ce.type("Pair<Pair<integer>>").toString();
// ➔ "tuple<tuple<integer, integer>, tuple<integer, integer>>"

ce.declareType("Wrap", "list<Pair<T>>", { alias: true, typeParams: ["T"] });
ce.type("Wrap<integer>").toString();
// ➔ "list<tuple<integer, integer>>"
```

**Bounds.** A parameter may declare a ground upper bound, exactly as a
[`where` variable](#bounds) does, and the bound is enforced wherever the
alias is applied:

```js
ce.declareType("Keyed", "tuple<string, T>",
  { alias: true, typeParams: ["T: number"] });

ce.type("Keyed<integer>").toString(); // ➔ "tuple<string, integer>"

ce.type("Keyed<string>");
// ➔ throws: generic-alias-bound: The type argument `string` does not
//   satisfy the bound `number` of the parameter `T` of "Keyed"
```

An argument may also be a type **variable** in scope — a `where` clause's
variable, or the enclosing alias's own parameter. Such an argument is
admitted by comparing the two bounds: the variable's own declared bound must
satisfy the parameter's (an unbounded variable is bounded by `any`, which
satisfies only `any`).

```js
ce.type("(Keyed<T>) -> T where T: integer").toString();
// ➔ "(tuple<string, T>) -> T where T: integer"

ce.type("(Keyed<T>) -> T where T");
// ➔ throws: generic-alias-bound: The type argument `T` does not satisfy the
//   bound `number` of the parameter `T` of "Keyed" (an open argument is
//   admitted by its own declared bound, `any`)
```

**Transparency.** The expansion happens when the type is resolved, so nothing
downstream ever meets an applied reference: `.type`, `toString()`,
`matches()` and error messages all show the expansion. The *source* keeps
what was written — an Epsil program round-trips
`let p: Pair<integer> = (1, 2)` verbatim — but the type it denotes displays
as `tuple<integer, integer>`.

**Limits.**

- A generic alias must be **applied**: a bare `Pair`, an empty `Pair<>` and a
  wrong number of arguments are all `generic-alias-arity` errors.
- It may not refer to **itself** (`generic-alias-self-reference`): the
  definition is expanded eagerly, so there is nothing to expand into yet.
  A [recursive type](#recursive-types) is declared without a clause.
- Every parameter must be **used** in the definition
  (`generic-alias-unused-parameter`) — under transparency an unused
  parameter could not affect anything.
- A parameterized **nominal** type takes the same clause, and the arity and
  unused-parameter rules apply to it verbatim. The self-reference rule does
  not: a nominal type is opaque rather than expanded, so its definition may
  refer to itself — and it does mint a constructor. See
  [Parameterized Nominal Types](#parameterized-nominal-types).
- No [constructor](#type-constructors) is declared for a generic alias, and
  the name is not claimed in the value namespace at all: a function of the
  same name is legal, before or after the alias.

Re-running a `type` statement replaces the alias, clause included, but a
dependent alias keeps the definition it **snapshotted** when it was declared
— re-run it too (as re-running a whole notebook cell does) for it to pick up
the new one.

### Type Constructors

Declaring a type also declares a **constructor**: an operator of the same
name that builds values of that type. Like the type itself, the constructor
is global — its lifetime is the type's. This is what makes a nominal type
inhabitable — without it, the type would be a set with no members.

```js
ce.declareType("point", "tuple<x: integer, y: integer>");
ce.expr(["point", 1, 2]).type;
// ➔ "point"
```

The constructor's signature comes from the definition:

- a `tuple` definition gives one argument per element, with the element names
  as parameter names: `point: (x: integer, y: integer) -> point`;
- any other definition gives a single argument:
  `ce.declareType("meters", "number")` gives `meters: (number) -> meters`;
- a `record` definition auto-declares **no** constructor. A record's field
  order is documentation, not semantics, so building one positionally would
  silently depend on it. Record types are inhabited through a **constructor
  function** instead (below).

Arguments are validated against that signature, so `["point", 1]` (too few)
and `["point", "'a'", 2]` (wrong type) produce the usual error values.

#### Constructor Functions

Assigning a **function literal** to a nominal type's name — after the
declaration — installs it as the type's **constructor function**. The body computes the *payload*, a value that must
satisfy the definition; the engine checks it (for a record: exactly the
definition's keys, each field's value against its type) and tags it. This is
the record inhabitation story, and, for any definition, the smart-constructor
idiom (validation, normalization, alternate parameterizations):

```js
ce.declareType("circle", "record{x: number, y: number, r: number}");
ce.assign("circle", ce.box(["Function",
  ["Dictionary",
    ["KeyValuePair", {str: "x"}, "x"],
    ["KeyValuePair", {str: "y"}, "y"],
    ["KeyValuePair", {str: "r"}, "r"]],
  "x", "y", "r"]));

ce.box(["circle", 1, 2, 3]).evaluate().type;
// ➔ "circle"
```

In Epsil the same declaration is
`function circle(x, y, r) { {x -> x, y -> y, r -> r} }`.

The installed operator is an **overload set**: the user's arm plus an
automatic **raw-injection** arm — a single argument that already satisfies
the definition is checked and tagged directly, body skipped. Serialization
emits that raw spelling (`["circle", {payload}]`), so a round trip injects
the payload unchanged and a normalizing constructor's values compare equal
after it. Because the raw arm must win on its own domain, a user arm whose
parameters are not distinguishable from the payload (same arity, overlapping
types — including unannotated parameters against a same-arity definition) is
**rejected at install**; use a different arity or annotate the parameters
with types disjoint from the definition body.

A constructor function may call itself (a recursive normalizer); returning
its own constructed value passes through un-nested. Assigning a function
literal to an **alias** type's name replaces the identity constructor with an
ordinary function — no tagging. Everything else about the constructor guard
is unchanged: assigning a non-function value over any minted constructor
still throws.

A nominal constructor is **inert**: `["point", 1, 2]` evaluates to itself,
and the tag is the value's identity — it survives canonicalization,
serialization (`["point", 1, 2]` is ordinary MathJSON) and storage in a
collection (`[p, q]` has type `list<point^2>`). It is pure, and it introduces
no per-value metadata.

An **alias** declaration mints a checked identity constructor instead: it
validates its arguments against the definition and returns the plain
structural value, so `["pointData", 1, 2]` evaluates to the ordinary tuple
`(1, 2)`. It is a checked-cast spelling, not a tag.

Pass `{ mint: false }` to declare a type without a constructor:

```js
ce.declareType("bare", "number", { mint: false });
ce.operatorInfo("bare");
// ➔ undefined
```

A type declaration claims **both** namespaces — the type name and the value
name — atomically. If the global scope already has a value or operator of
that name, the declaration fails and registers nothing; a system builtin is
shadowed, not conflicted. Re-declaring a type from a `["DeclareType"]`
statement replaces its constructor along with its definition.

### Nominal Types Are Opaque

A value of a nominal type is **not** its representation: `point` is not a
subtype of `tuple<x: integer, y: integer>`, so the operations that consume
the underlying structure reject it, exactly as they would any other operand
of the wrong type.

```js
ce.expr(["First", ["point", 1, 2]]).evaluate();
// ➔ Error(ErrorCode("incompatible-type", "indexed_collection", "point"))

ce.declareType("meters", "number");
ce.expr(["Add", ["meters", 5], 1]).evaluate();
// ➔ Error(ErrorCode("incompatible-type", "number", "meters"))
```

That is the point of a nominal type: a `meters` cannot be added to a bare
number by accident. There are three sanctioned windows back in:

- **field access** — the `Field` operator (`p.x` in Epsil) reads one named
  field through the type's definition when the body has named fields (a
  record body, or a named-tuple body): `ce.box(["Field", p, "'x'"])`. This
  dispatches off the definition's field map and does **not** make the value
  a collection — `First(p)` and `p["x"]` keep rejecting;
- **pattern matching** — in Epsil, `match p { point(x, y) => x + y }`;
- reading the operands of the MathJSON application directly from a host.

A **structural alias** has no such reserve: an alias-typed operand unfolds to
its definition, so `m + 1` with `m: meters` an alias of `number`, or
`First(p)` with `p` an alias of a tuple, work as expected.

### Equality of Nominal Values

Two values built by the same constructor are equal when their arguments are;
values built by different constructors — or a constructed value and a plain
value of the same shape — are not:

```js
ce.declareType("polar", "tuple<r: integer, t: integer>");

ce.expr(["Equal", ["point", 1, 2], ["point", 1, 2]]).evaluate();
// ➔ "True"
ce.expr(["Equal", ["point", 1, 2], ["Tuple", 1, 2]]).evaluate();
// ➔ "False"
ce.expr(["Equal", ["polar", 1, 2], ["point", 1, 2]]).evaluate();
// ➔ "False"
```

### Compiling Nominal Values

Nominal-ness is static information, fully checked before any code is
emitted, so **compilation erases the tag**: a constructor application
compiles exactly where the equivalent plain value compiles, to the same code.
`meters(x)` compiles to the compiled `x`; `point(x, y)` compiles to whatever
a `Tuple` compiles to on that target (a JavaScript pair, a GLSL `vec2`) — and
declines identically where a `Tuple` would. A new type therefore costs
nothing at run time.

### Recursive Types

A recursive type is a type that refers to itself in its definition.

**To use a type before declaring it**, preface it with the `type` keyword in the type expression.

For example, a binary tree can be defined as a tuple of a value and two subtrees:

```js
ce.declareType(
  "tree", 
  "tuple<value: integer, left: type tree, right: type tree>"
);
```

A set of types can be mutually recursive, meaning that they can refer to each other in their definitions.

For example, a definition of a JSON value could be:

```js
ce.declareType("json", `
    missing
  | boolean
  | real
  | string
  | type json_array
  | type json_object
`, { alias: true });
ce.declareType("json_object", "dictionary<json>", { alias: true });
ce.declareType("json_array", "list<json>", { alias: true });
```

When using `type json_array` or `type json_object`, the type is not yet defined, 
but it will be defined later in the code. Using the `type` keyword allows you to use the type
before declaring it. If the referenced type is already defined, the `type` keyword is optional.

The declaration that fulfills a forward reference completes the record the
reference already installed, so every type that mentioned the name resolves
through to the definition. Only an unfulfilled reference can be completed this
way: a name that already has a definition is a redeclaration, and still an
error.

Three details of the definition above are worth spelling out, because a
plausible-looking variant of each does not describe JSON:

- `{ alias: true }` on **every** type in the set. These are structural
  aliases, so a plain list or dictionary *is* a `json`. Declared nominally
  (the default), the types would be opaque — their only inhabitants are
  constructor applications, and `ce.type("list<number>").matches("json")`
  would be `false`.
- `missing`, not `nothing`, for JSON `null`. `Nothing` means "no value here"
  and is *erased* from collection literals — `[1, Nothing, 3]` has two
  elements. `Missing` is position-preserving, so it survives inside an array
  or as a dictionary value.
- `real`, not `number`. The engine's `number` admits complex and
  non-finite values, so `2 + 3i`, `NaN` and $+\infty$ would all be accepted
  as JSON, and none of them is representable in JSON. Bare `real` is finite
  by definition, so it excludes them with no extra spelling.

The same set can be written as a single self-recursive alias, which needs no
forward references at all:

```js
ce.declareType("json", `
    missing | boolean | real | string
  | list<json> | dictionary<json>
`, { alias: true });
```

### Parameterized Nominal Types

A nominal type can take **type parameters**, declared in the same clause a
[generic alias](#generic-type-aliases) takes. The parameters may be used
anywhere in the definition — including in a **recursive** occurrence of the
type being declared, which is what a generic alias cannot do:

```js
ce.declareType(
  "tree",
  "tuple<value: T, children: list<tree<T>>>",
  { typeParams: ["T"] }
);
```

In Epsil, the same declaration is a `type` statement with a clause:

```plaintext
type tree<T> = tuple<value: T, children: list<tree<T>>>
```

An application is **opaque**: unlike `Pair<integer>`, which *is* the tuple it
expands to, `tree<integer>` is never expanded, and that is exactly what makes
the recursion harmless. `tree<integer>` and `tree<string>` are two distinct
types, related to nothing but other applications of `tree`.

```js
ce.type("tree<integer>").toString();
// ➔ "tree<integer>"     (an alias would show its expansion here)
```

Applying at the wrong arity — including a bare `tree` — is the same
`generic-alias-arity` error a generic alias gives, and a parameter bound
(`{ typeParams: ["T: number"] }`) is enforced the same way.

#### The Constructor

The [constructor](#type-constructors) a `tuple` definition mints is
**quantified**: `tree: (T, list<tree<T>>) -> tree<T> where T`. `T` is
solved at each construction, from the arguments:

```js
ce.expr(["tree", 1, ["List"]]).type;
// ➔ "tree<integer>"
```

Nothing else is new: a `record` definition still mints no constructor and is
inhabited through a [constructor function](#constructor-functions), which may
carry a clause of its own — its variable names are its own and need not match
the type's.

#### Variance

Variance says how two applications of one name relate. Every parameter has a
declared variance, and it is **verified against the definition, never
inferred**:

| Marker | Meaning | Relation |
| --- | --- | --- |
| `out` | covariant (the default) | `tree<integer> <: tree<number>` |
| `in` | contravariant | `sink<number> <: sink<integer>` |
| `inout` | invariant | neither, unless the arguments are the same type |

The marker sits on the parameter — `type tree<out T> = …`, or
`{ typeParams: [{ name: "T", variance: "out" }] }` from a host — and belongs
to the *declaration*: an application never carries one. `sink` above is a
consumer, `type sink<in T> = tuple<accept: (T) -> nothing>`: something that
accepts any number accepts an integer.

**An unannotated parameter means `out`** — it is treated as if `out` had been
written, and run through the same verification. In an immutable value
language the common case is a payload container, and an invariant default
would make `tree<integer>` unusable where a `tree<number>` is expected, which
is the first thing anyone tries:

```js
ce.type("tree<integer>").matches("tree<number>"); // ➔ true
ce.type("tree<number>").matches("tree<integer>"); // ➔ false
```

Because the default is *declared* rather than inferred, a definition whose
parameter is used contravariantly does not silently change the type's
subtyping contract — it is a loud `variance-violation` at the declaration.
Consider a covariant `events`, then an innocent-looking edit that adds a
subscription callback:

```plaintext
type events<T> = tuple<log: list<T>>   // `T` occurs only covariantly

// … a later edit:
type events<T> = tuple<log: list<T>, notify: (T) -> nothing>
```

```js
ce.declareType("events", "tuple<log: list<T>, notify: (T) -> nothing>",
  { typeParams: ["T"] });
// ➔ throws: variance-violation: parameter `T` of `events` is covariant
//   (`out` is the default when no marker is written), but `T` appears in
//   both output (`log`) and input (`notify.(arg 1)`) positions, so it can
//   only be invariant.
//     • declare it `inout`:  type events<inout T> = …
//     • or keep `events` covariant by moving the input occurrence out of
//       the body — e.g. split it off into a type of its own
```

Under inference the edit would quietly re-infer invariance and every caller
that passed an `events<integer>` where an `events<number>` was expected would
break at its *use site*, with nothing at the declaration mentioning variance.
Under the verified default, the author makes the contract change deliberately
— by writing `inout` (or `in`, after splitting the type):

```js
ce.declareType("events", "tuple<log: list<T>, notify: (T) -> nothing>",
  { typeParams: [{ name: "T", variance: "inout" }] });
```

The diagnostic is computed, not guessed: it names the violated variance and
where it came from, the offending occurrences by path, and exactly the
markers that would verify — `in` is never offered for `events`, because
`log: list<T>` would fail it the same way. An `inout` annotation verifies
against any definition: invariance promises nothing, so it is always sound,
just less permissive.

Variance and bounds do not interact — `{ typeParams: [{ name: "T",
variance: "out", bound: "number" }] }` is sound: the bound says which
arguments are admissible, the variance relates two admissible ones.

**A limitation of the non-covariant markers.** A construction solves its
parameters from its arguments alone; an annotation on the binding does not
widen them. For a covariant parameter that is invisible, because the narrower
construction is a subtype of the annotation anyway:

```plaintext
let t: tree<number> = tree(1, [])   // builds a tree<integer>, which IS a tree<number>
```

For an explicitly `inout` or `in` parameter that step is not available, so
such a type can only be constructed at exactly its argument type — a
`box<integer>` is not admissible where a `box<number>` is expected.
Propagating the expected type inward is a future improvement.

#### Reading a Value

[Opacity](#nominal-types-are-opaque) is unchanged, and so are the windows back
in. **Field access** now reads the definition **instantiated at the
application's arguments**:

```js
const t = ce.expr(["tree", 1, ["List"]]);
ce.box(["Field", t, { str: "value" }]).evaluate();
// ➔ 1
```

```plaintext
let t: tree<number> = tree(1, [])
t.value                          // : number
```

**`match` is different**: it binds values, not the annotation's projection, so
each capture comes back at the matched value's *own* type — usually narrower
than the annotation's, since the value knows what it was built from:

```plaintext
let t: tree<number> = tree(1, [])
match t { tree(v, cs) => v }     // v: integer, cs: list<never>
```

The substitution behind field access is one level deep: the nested
`tree<number>` inside `children` stays an unexpanded application, so a
recursive definition costs nothing here either.

#### Compiling

[Compilation erases the tag](#compiling-nominal-values) exactly as it does for
an unparameterized nominal type, at the **instantiated** definition:
`tree<integer>` erases to whatever `tuple<integer, list<…>>` compiles to on
that target, and declines identically where that would. A parameterized type
therefore costs nothing at run time either.
