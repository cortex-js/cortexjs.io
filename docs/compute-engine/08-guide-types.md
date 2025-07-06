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
ce.box(["Declare", "n", "'integer'"]).evaluate();
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
├── never
├── unknown
└── expression
    ├── symbol
    ├── function
    └── value
        ├── scalar
        │   ├── boolean
        │   ├── string
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
                └── list
                    ├─ vector
                    ├─ matrix
                    └─ tensor
```

**Note:** this diagram is simplified and does not accurately reflect the finite vs
non-finite distinction for the numeric types.

This hierarchy allows the Compute Engine to reason about compatibility and subtyping relationships between expressions.

The `unknown` type is a placeholder for an expression whose type has not yet 
been determined, typically during type inference or partial evaluation. It is 
compatible with all types, and all types are compatible with it. It serves as 
a wildcard in type matching and can be replaced or refined as more information 
becomes available.

<div style={{visibility:"hidden"}}>
<a href="#naming-constraints-for-elements-and-arguments" id="naming-constraints-for-elements-and-arguments"></a>
</div>

:::info **Naming Constraints for Elements and Arguments**

Element names (used in tuples, records, dictionaries) and function argument names must:

- start with a letter or underscore
- contain only letters, digits, or underscores

If a name does not follow these rules, it must be enclosed in backticks.

For example:

``tuple<`1st`: integer, `2nd`: integer, `3rd`: integer>``

``record<`durée`: number, vitesse: number>``

``(`直径`: number) -> number``


The backticks are not part of the name, they are used to escape the name.

In the unlikely event that the name contains a backtick or backslash, it must be escaped with a backslash:

``record<`name\`with\`backticks\\and\\backslash`: integer>``

The backtick syntax is used instead of quotes to clearly distinguish identifiers from string values, following conventions from languages such as Swift and Kotlin

Element and argument names are stored and compared using Unicode Normalization Form C (NFC).
:::


## Primitive Types

A **primitive type** is a type that is not defined in terms of other types.

The Compute Engine supports the following primitive types:

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `any`      | The universal type, it contains all possible values. It has the following sub-types: `error`, `nothing`,   `never`,  `unknown` and `expression`. No other type matches `any` |
| `error` | The type of an **invalid expression**, such as `["Error"]` |
| `nothing`       | The type whose only member is the symbol `Nothing`; the unit type                                             |
| `never`       | The type that has no values; the empty type or **bottom type**                                             |
| `unknown`       | The type of an expression whose type is not known. An expression whose type is `unknown` can have its type modified (narrowed or broadened) at any time. Every other type matches `unknown` |
| `expression`       | The type of a symbolic expression that represents a mathematical object, such as `["Add", 1, "x"]`, a `symbol`, a `function` or a `value`  |
| `symbol`        | The type of a named object, for example a constant or variable in an expression such as `x` or `alpha` |
| `function`        | The type of a function literal: an expression that applies some arguments to a body to produce a result, such as `["Function", ["Add", "x", 1], "x"]` |
| `value`        | The type of a constant value, such as `1`, `True`, `"hello"` or `Pi`: a `scalar` or a `collection` |
| `collection`    | The type of a collection of values: a `list`, a `set`, a `tuple`, a `dictionary` or a `record` |
| `indexed_collection`    | The type of a collection of values that can be accessed by an index: a `list`, a `vector`, a `matrix` or a `tensor` |
| `scalar`        | The type of a single value: a `boolean`, a `string`, or a `number` |
| `boolean`       | The type of the symbol `True` or `False`|
| `string`        | The type of a string of Unicode characters    |
| `number`        | The type of a numeric value |

</div>


### Numeric Types

The type `number` represents all numeric values, including `NaN`. 

More specific types of numeric values are represented by subtypes of `number`. 

Some numeric types have a variant that excludes non-finite values, such as 
`PositiveInfinity`, `NegativeInfinity` and `ComplexInfinity`.

<div className="symbols-table first-column-header" style={{"--first-col-width":"17ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `number`       | All numeric values: a real or complex number or $\mathrm{NaN}$ |
| `non_finite_number` | The values $+\infty$ and $-\infty$ (`PositiveInfinity` and `NegativeInfinity`) |
| `complex`      | A number with non-zero real and imaginary parts, such as $2 + 3i$, including $\tilde\infty$ (`ComplexInfinity`) |
| `imaginary`    | A pure imaginary number, such as $3i$ |
| `real`         | A real number, such as $-2.5$, including $\pm\infty$ |
| `rational`     | A number that can be expressed as the quotient of two integers such as $-\nicefrac{3}{4}$, including $\pm\infty$. |
| `integer`      | A whole number, such as $42$, including $\pm\infty$. |
| `finite_number` | A real or complex number, except $\pm\infty$ and $\tilde\infty$ |
| `finite_complex` | A complex number, except $\pm\infty$ and $\tilde\infty$ |
| `finite_real` | A real number, except $\pm\infty$ |
| `finite_rational` | A rational number, except $\pm\infty$ |
| `finite_integer` | An integer, except $\pm\infty$ |

</div>

Numeric types can be constrained to a specific range within a lower and upper 
bound

For example `real< -1.0..1.0 >` is the type of real numbers between $-1.0$ and $1.0$, inclusive.

An non-finite endpoint can be represented by the symbol `-oo` or `+oo` or
by omitting the endpoint.

For example: `real<..1.0>` is the type of real numbers less than $1.0$, 
and is equivalent to `real< -oo..1.0 >`.

To represent an open interval, use a negation and a literal type to exclude the endpoints.
For example `real<0..> & !0` is the type of real numbers greater than $0$.

When using integers, you can adjust the endpoint instead, so for example 
`integer<1..>` is the type of integers greater than or equal to $1$, which 
is equivalent to `integer<0..> & !0`.

Note that `complex` and `imaginary` types do not support ranges, as they are not ordered types.

Here is the type of various numeric values:

| Value               | Type                |
| ------------------: | :------------------ |
| $42$                | `finite_integer`    |
| $-3.14$             | `finite_real`       |
| $\nicefrac{1}{2}$   | `finite_rational`   |
| $3i$                | `imaginary`         |
| $2 + 3i$            | `finite_complex`    |
| $-\infty$           | `non_finite_number` |
| $\mathrm{NaN}$      | `number`            |

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
// ➔ "set<finite_integer>"
```

A set can have an infinite number of elements.

### Tuple

A **tuple** is an indexed collection of values, representing a fixed 
number of elements.

The type of a tuple is represented by the type expression `tuple<T1, T2, ...>`, 
where `T1`, `T2`, ... are the types of the elements of the tuple.

```js
ce.parse("(7, 5, 7)").type
// ➔ "tuple<finite_integer, finite_integer, finite_integer>"
```

The elements of a tuple can be named: `tuple<x: integer, y: integer>`. 

If an element is named, all elements must be named and the names must be unique
when compared in Unicode Normalization Form C (NFC).

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on element names.)

The elements of a tuple can be accessed with a one-based index or by name.


For two tuples to be compatible, each element must have the same type and the names must match.

```js
ce.parse("(x: 1, y: 2)")
  .type.matches("tuple<x: integer, y: integer>");
// ➔ true
ce.parse("(x: 1, y: 2)")
  .type.matches("tuple<a: integer, b: integer>");
// ➔ false
```


### List, Vector, Matrix and Tensor

A **list** is an indexed collection of values, used to represent vectors, 
matrices, and sequences.

The first element of a list is at index 1, the second element is at index 2, and so on.

The type of a list is represented by the type expression `list<T>`, where `T` is the type of the elements of the list.

```js
ce.parse("\\[1, 2, 3\\]").type.toString();
// ➔ "list<number>"
```

The shorthand **`list`** is equivalent to `list<any>`, a list of values of any type.

```js
ce.parse("\\[1, 2, 3\\]").matches("list");
// ➔ true
```

The shorthand **`vector`** is a list of numbers, equivalent to `list<number>`.

```js
ce.parse("\\[1, 2, 3\\]").matches("vector");
// ➔ true
```

A **`vector<n>`** is a list of `n` numbers.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<3>");
// ➔ true
```

A **`vector<T^n>`** is a list of `n` elements of type `T`.

```js
ce.parse("\\[1, 2, 3\\]").type.matches("vector<integer^3>");
// ➔ true
```

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
where each key is a string and each value can be any type.

A **record** is a special case of a dictionary where the keys are fixed, 
while a **dictionary** can have keys that are not defined in advance.

A **record** is used to represent objects and structured data with a fixed set of properties.
A **dictionary** is well suited to represent hash tables or caches.

**Keys** must be unique when compared in NFC form within a dictionary or record. Keys are not ordered.

(See [Naming Constraints for Elements and Arguments](#naming-constraints-for-elements-and-arguments) for rules on key names.)


The type of a **dictionary** is represented by the type expression `dictionary<T>`
where `T` is the type of the values.

The type of a **record** is represented by the type expression `record<K1: T1, K2: T2, ...>`, 
where `K1`, `K2`, ... are the keys and `T1`, `T2`, ... are the types of the values.

For example: `record<red: integer, green: integer, blue: integer>` is a record that
contains three elements with keys `red`, `green` and `blue`, and values of type `integer`.

**Compatibility:**
- A record of type `record<K1: T1, K2: T2, ...>` is compatible with a record of type
  `record<K1: T1, K2: T2, ..., K3: T3, ...>` if:
  - The keys of the first record are a subset of the keys of the second.
  - The values of the first record are compatible with the values of the second.
  - The order of the keys does not matter.
- A record is compatible with a dictionary `dictionary<T>` if each type `T1`, `T2`, ... is compatible with `T`.


```js
ce.type("record<red: integer, green: integer>")
  .matches("record<red: integer, green: integer>");
// ➔ true

ce.type("record<red: integer, green: integer>")
  .matches("record<red: integer, green: integer, blue: integer>");
// ➔ false

ce.type("record<red: integer, green: integer, blue: integer>")
  .matches("record<red: integer, green: integer>");
// ➔ true

ce.type("record<red: integer, green: integer, blue: integer>")
  .matches("dictionary<integer>");
// ➔ true
```


The `record` type is compatible with any record, and the `dictionary` type 
is compatible with both records and dictionaries.

```js
ce.type("record<red: integer, green: integer>")
  .matches("record");
// ➔ true

ce.type("record<red: integer, green: integer>")
  .matches("dictionary");
// ➔ true
```


### Collection

The type `collection` represent any collection of values, such as a `list`, 
a `set`, a `tuple`, a `record` or a `dictionary`.

The type `collection<T>` is a collection of values of type `T`.

The type `indexed_collection<T>` is an indexed collection of values of type `T`,
such as a `list`, a `tuple`, or a `matrix`. It is a subtype of 
`collection<T>`.

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

```js
ce.type("(integer, integer?) -> number")
  .matches("(integer) -> number");
// ➔ true
```



### Variadic Arguments

A function signature can include a variable number of arguments, also known as 
**variadic arguments**. 

Variadic arguments are indicated by a `+` or `*` 
immediately after the type of the last argument. The `+` prefix indicates that
the function accepts one or more arguments of that type, while the `*` prefix
indicates that the function accepts zero or more arguments of that type.

For example `(string, integer+) -> integer` is a function that accepts a 
string as a first argument followed by one or more integers and returns an integer.

To indicate that the function accepts a variable number of arguments of any 
type, use `any+` or `any*`.

```js
ce.type("(integer, integer) -> number")
  .matches("(integer, integer+) -> number");
// ➔ true
```

If a signature has a variadic argument, it must be the last argument in the list, 
and it cannot be combined with optional arguments.

### Function Type

The type `function` matches any function literal. It is a shorthand for `(any*) -> unknown`.

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

For example, `record<length: integer> & record<size: integer>` is the type of values 
that are records with both a `length` and a `size` key, that is `record<length: integer, size: integer>`.


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
(e.g. `real` vs `finite_real`), so use `.matches()` for compatibility checks 
instead of strict equality.

```js
ce.parse("3.14").type === "real";
// ➔ false (the type is actually "finite_real")

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
ce.parse("\\{red: 1, green: 2\\}").type
  .matches("record<red: integer, green: integer>");
// ➔ true
```

**Width subtyping** is supported for records, meaning that a record with more keys is
compatible with a record with fewer keys.

```js
ce.parse("\\{red: 1, green: 2, blue: 3\\}").type
  .matches("record<red: integer, green: integer>");
// ➔ true
```


#### Dictionaries
Dictionaries are compatible if the values are compatible.

```js
ce.parse("\\{red: 1, green: 2\\}").type 
  .matches("dictionary<integer>");
// ➔ true
```

Records are compatible with dictionaries if all the values of the record are 
compatible with the dictionary's value type.

```js
ce.parse("\\{red: 104, green: 2, blue: 37\\}").type
  .matches("dictionary<integer>");
// ➔ true
ce.parse("\\{user: \"Bob\", age: 24\\}").type
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
ce.parse("(x: 1, y: 2)").type
  .matches("tuple<x: integer, y: integer>");
// ➔ true

ce.parse("(x: 1, y: 2)").type
  .matches("tuple<a: integer, b: integer>");
// ➔ false
```


#### Lists

Lists are compatible if they have the same length and the elements are compatible.

```js
ce.parse("\\[1, 2, 3\\]").type
  .matches("list<finite_integer>");
// ➔ true
```

#### Function Literals

Function literals are compatible if the input types are compatible and the 
output types are compatible, specifically the output type is covariant and the 
input types are contravariant.


```js
ce.type("(integer) -> integer")
  .matches("(number) -> number");
// ➔ true
```

The name of the arguments of a function signature is not taken into account when
checking for compatibility.

```js
ce.type("(x: integer) -> integer")
  .matches("(integer) -> integer");
// ➔ true
```

### Checking the Type of a Numeric Value

The properties `expr.isNumber`, `expr.isInteger`, `expr.isRational` and 
`expr.isReal` are shortcuts to check if the type of an expression matches the 
types  `"number"`, `"integer"`, `"rational"` and `"real"` respectively.

```js
console.info(ce.box(3.14).type);
// ➔ "finite_real"

console.info(ce.box(3.14).type.matches("finite_real")) 
// ➔ true

console.info(ce.box(3.14).type.matches("real")) 
// ➔ true

console.info(ce.box(3.14).isReal) 
// ➔ true

console.info(ce.box(3.14).type.matches("integer")) 
// ➔ false

console.info(ce.box(3.14).isInteger) 
// ➔ false

```


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
| `complex`  <br/> `imaginary` <br/> `non_finite_number` <br/> `finite_number`          | `number`            |
| `integer` <br/> `finite_integer`           | `integer`             |
| `real` <br/> `finite_real` <br/> `rational` <br/> `finite_rational`          | `real`            |

</div>

Examples:

<div className="symbols-table" style={{"--first-col-width":"8ch"}}>

| Value               | Value Type | Inferred Symbol Type |
|:--------------------|:--------------------------|:--------------------------|
| 34                  | `finite_integer` | `integer`                |
| 3.14                | `finite_real` | `real`                   |
| 4i                   | `imaginary` | `number`                   |
| 1/2                  | `finite_rational` | `real`                   |
</div>

```js
ce.assign("n", 34);
ce.box("n").type;
// ➔ "integer"
```

When a symbol is used in a function expression, the expected type of the
arguments is used to infer the type of the symbol.

```js
ce.declare("n", "unknown");
ce.declare("f", "(number) -> number");
ce.box(["f", "n"]);
ce.box("n").type;
// ➔ "number"
```

A type that has been inferred can be refined later, for example by
assigning a value of a more specific type to the symbol or by using the
symbol in a context that requires a more specific type.

Continuing the example above:

```js
ce.declare("g", "(integer) -> number");
ce.box(["g", "n"]);
ce.box("n").type;
// ➔ "integer": "n" has been narrowed 
//    from "number" to "integer"
```



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

The type is defined in the current lexical scope.


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
    nothing
  | boolean
  | number
  | string
  | type json_array
  | type json_object
`);
ce.declareType("json_object", "dictionary<json>");
ce.declareType("json_array", "list<json>");
```

When using `type json_array` or `type json_object`, the type is not yet defined, 
but it will be defined later in the code. Using the `type` keyword allows you to use the type
before declaring it. If the referenced type is already defined, the `type` keyword is optional.


