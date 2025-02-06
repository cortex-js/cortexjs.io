---
title: Types
slug: /compute-engine/guides/types/
---

<Intro>
The **type** of an expression is the set of the possible values of that expression.
</Intro>

The Compute Engine uses a type system to ensure that the operations are 
performed on the correct types of values.

A type is represented by a **type expression**, which is a string with 
a specific syntax. For example:

- `"integer"`
- `"boolean"`
- `"matrix<3x3>"`
- `"integer & !0"`
- `"integer -> integer"`

A type expression is either a **primitive type** represented by an identifier
such as `"integer"` or `"boolean"` or a **constructed type**.

**To check the type of an expression**, use the `expr.type` property.

```live
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


## Matching Types

Two types can be evaluated for their **compatibility**. A type `A` is 
compatible with a type `B` (or matches it) if all values of type `A` are also 
values of type `B`. In other words, if `A` is a non-strict subtype of `B`.

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

```js
ce.parse("3.14").type === "real";
// ➔ false (the type is actually "finite_real")

ce.parse("3.14").type.matches("real");
// ➔ true
```

:::

### Compatibility of Complex Types

#### Maps

Maps are compatible if they have the same keys and the values are compatible.

```js
ce.parse("{red: 1, green: 2}").type.matches("map<red: integer, green: integer>");
// ➔ true
```

**Width subtyping** is supported for maps, meaning that a map with more keys is
compatible with a map with fewer keys.

```js
ce.parse("{red: 1, green: 2, blue: 3}").type.matches("map<red: integer, green: integer>");
// ➔ true
```

#### Tuples

Tuples are compatible if they have the same length and the elements are compatible.

```js
ce.parse("(1, 2, 3)").type.matches("tuple<integer, integer, integer>");
// ➔ true
```

If the elements of a tuple are named, the names must match.

```js
ce.parse("(x: 1, y: 2)").type.matches("tuple<x: integer, y: integer>");
// ➔ true

ce.parse("(x: 1, y: 2)").type.matches("tuple<a: integer, b: integer>");
// ➔ false
```


#### Lists

Lists are compatible if they have the same length and the elements are compatible.

```js
ce.parse("[1, 2, 3]").type.matches("list<finite_integer>");
// ➔ true
```

#### Functions

Functions are compatible if the input types are compatible and the output types are compatible.

```js
ce.type("integer -> integer").matches("number -> number");
// ➔ true
```

The name of the arguments of a function signature is not taken into account when
checking for compatibility.

```js
ce.type("x: integer -> integer").matches("integer -> integer");
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



## Primitive Types

A **primitive type** is a type that is not defined in terms of other types.

The Compute Engine supports the following primitive types:

<div className="symbols-table first-column-header" style={{"--first-col-width":"12ch"}}>

| Type          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `any`      | The universal type, it contains all possible values. It has the following sub-types: `error`, `nothing`,   `never`,  `unknown` and `expression`. |
| `error` | The type of an invalid expression, such as `["Error"]` |
| `nothing`       | The type whose only member is the symbol `Nothing`; the unit type                                             |
| `never`       | The type that has no values; the empty type or bottom type                                             |
| `unknown`       | The type of an expression whose type is not known. An expression whose type is `unknown` can have its type modified (narrowed or broadened) at any time. |
| `expression`       | A symbolic expression that represents a mathematical object, such as `["Add", 1, "x"]`, a `symbol`, a `function` or a `value`  |
| `symbol`        | An identifier used to represent the name of a constant or variable in an expression |
| `function`        | A function expression that can be applied to arguments to produce a result, such as `["Function", ["Add", "x", 1], "x"]` |
| `value`        | A constant value, such as `1`, `True`, `'hello'` or `Pi`: a `scalar` or a `collection` |
| `collection`    | A collection of values: a `list`, a `set`, a `tuple`, or a `map` |
| `scalar`        | A single value: a `boolean`, a `string`, or a `number` |
| `boolean`       | `True` or `False`|
| `string`        | A string of Unicode characters    |
| `number`        | A numeric value |

</div>

### Type Hierarchy

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
        │                 └── integer
        └── collection
            ├── set
            ├── tuple
            ├── list
            │   └── tensor
            │       ├── vector
            │       └── matrix
            └── map
```
**Note:** this diagram is simplified and does not accurately reflect the finite vs
non-finite distinction for the numeric types.


### Numeric Types

The type `number` represent all numeric values, including `NaN`. 

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

A **collection type** is a type that contains multiple values.

The Compute Engine supports the following collection types: `set`, `tuple`, `list` (including `vector`, `matrix` and `tensor`),  `map` and `collection`.

### Set

A **set** is an unordered collection of unique values.

The type of a set is represented by the type expression `set<T>`, where `T` is the type of the elements of the set.

```js
ce.parse("\\{1, 2, 3\\}").type;
// ➔ "set<finite_integer>"
```

### Tuple

A **tuple** is an ordered collection of values, used to represent a fixed number of elements.

The type of a tuple is represented by the type expression `tuple<T1, T2, ...>`, where `T1`, `T2`, ... are the types of the elements of the tuple.

```js
ce.parse("(1, 2, 3)").type;
// ➔ "tuple<finite_integer, finite_integer, finite_integer>"
```

The elements of a tuple can be named: `tuple<x: integer, y: integer>`.

The name of the element of a tuple must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`.




### List, Vector, Matrix and Tensor

A **list** is an ordered collection of values, used to represent vectors, matrices, and sequences.

The type of a list is represented by the type expression `list<T>`, where `T` is the type of the elements of the list.

```js
ce.parse("[1, 2, 3]").type.toString();
// ➔ "list<number>"
```

The shorthand **`list`** is equivalent to `list<any>`, a list of values of any type.

```js
ce.parse("[1, 2, 3]").matches("list");
// ➔ true
```

The shorthand **`vector`** is a list of numbers, equivalent to `list<number>`.

```js
ce.parse("[1, 2, 3]").matches("vector");
// ➔ true
```

A **`vector<n>`** is a list of `n` numbers.

```js 
ce.parse("[1, 2, 3]").type.matches("vector<3>");
// ➔ true
```

A **`vector<T^n>`** is a list of `n` elements of type `T`.

```js
ce.parse("[1, 2, 3]").type.matches("vector<integer^3>");
// ➔ true
```

Similarly, a **`matrix`** is a list of lists, used to represent a matrix.

- The shorthand `matrix` is `matrix<number^?x?>`, a matrix of elements of 
  type `T`, a list of lists of numbers, of rank 2 but of any dimensions.
- `matrix<T>`: A matrix of elements of type `T`, of any dimensions.
- `matrix<nxm>`: A matrix of `n` rows and `m` columns (e.g. `matrix<3x3>`)
- `matrix<T^nxm>`: A matrix of `n` rows and `m` columns of elements of type `T`
  (e.g. `matrix<boolean^3x3>`)

And finally, a **`tensor`** is a multi-dimensional array of any values, of any rank,
and **`tensor<T>`** is a tensor of elements of type `T`.



### Map

A **map** is a collection of key-value pairs, used to represent a dictionary, 
also known as an associative array, a hash table or a record.

The keys of a map must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`. Keys containing other characters must be enclosed in backticks.

Keys must be unique within a map, but they are not ordered.

The type of a map is represented by the type expression `map<K1: T1, K2: T2, ...>`, 
where `K1`, `K2`, ... are the keys and `T1`, `T2`, ... are the types of the values.

For example: `map<red: integer, green: integer, blue: integer>` is a map that 
contains three elements with keys `red`, `green` and `blue`, and values of type `integer`.


The type `map` matches any map.


### Collection

The type `collection` represent any collection of values, such as a `list`, a `set`, a `tuple`, or a `map`.

The type `collection<T>` is a collection of values of type `T`.

The collection type is an abstract type that is not directly instantiated. It 
can be used to check if an expression is a collection of values, without
specifying the exact type of the collection.


## Function Signature

A **function signature** is the type of functions that map values of one type to values of another type.

The type of a function signature is represented by the type expression `(T1) -> T2`, where `T1` is the type of the input values and `T2` is the type of the output values.

### Return types

If the function never returns, the type expression is `(T) -> never`.

If the function does not return a value, the type expression is `(T) -> nothing`.

### Arguments

If there is a single input argument, the parentheses can be omitted: `T1 -> T2`.
For example, "real -> integer" is the type of functions that map real numbers to integers.

If there are no input arguments, use `() -> T`, for example `() -> integer` is the type of functions that return an integer.

If there are multiple input arguments, the type expression is `(T1, T2, ...) -> T`,
for example `(integer, integer) -> integer` is the type of functions that map two integers to an integer.

### Named Arguments

Optionally, the input arguments can be named, for example: `(x: integer, y: integer) -> integer`.

The name of the argument must use the letters `a` to `z` or `A` to `Z`, the digits `0` to `9` or the underscore `_`.

### Optional Argument

An optional argument is indicated by a question mark after the type.

For example `(integer, integer?) -> integer` indicates a function accepting 
one or two integers as input and returning an integer.

If there are any optional arguments, they must be at the end of the argument list.

### Rest Argument

A function signature can include a variable number of arguments, also known as a rest argument, indicated by an ellipsis `...` before the type of the last argument.

For example `(string, ...integer) -> integer` is a function that accepts a string followed by any number of integers and returns an integer.

To indicate that the function accepts a variable number of arguments of any type, use `...any`.

### Function Type

The type `function` matches any function signature, it is a shorthand for `(...any) -> any`.

## Value Type

A **value type** is a type that represents a single value. 

A value can be:
- a boolean: `true` or `false`
- a number, such as `42`, `-3.14`, or `6.022e23`
- a string, such as `"yellow"`, 

Value types can be used in conjunction with a union to represent a type that 
can be one of multiple values, for example:

- `0 | 1` is the type of values that are either `0` or `1`.
- `integer | false` is the type of values that are integers or `False`.
- `"red" | "green" | "blue"` is the type of values that are either of the strings `"red"`, `"green"` or `"blue"`.


## Other Constructed Types

Types can be combined to form new types using the following operations:

### Union

A **union** is the type of values that are in either of two types.

The type of a union is represented by the type expression `T1 | T2`, where `T1` and `T2` are the types of the values.

For example, `number | boolean` is the type of values that are numbers or booleans.

### Intersection

An **intersection** is the type of values that are in both of two types.

The type of an intersection is represented by the type expression `T1 & T2`, where `T1` and `T2` are the types of the values.

For example, `map<length: integer> & map<size: integer>` is the type of values 
that are dictionaries with both a `length` and a `size` key.

### Negation

A **negation** is the type of values that are not of a given type.

A type negation is represented by the type expression `!T`, where `T` is a type.

For example, `!integer` is the type of values that are not integers.

The type `integer & !0` is the type of values that are integers but not `0`.



