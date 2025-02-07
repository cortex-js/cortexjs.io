---
title: Compute Engine API Reference
sidebar_label: API Reference
slug: /compute-engine/api/
toc_max_heading_level: 3
---
import MemberCard from '@site/src/components/MemberCard';


<a name="readmemd"></a>

## Modules

- ["common"](#commonmd)
- ["compute-engine"](#compute-enginemd)


<a name="commonmd"></a>

## Error Handling

<a id="runtimesignalcode" name="runtimesignalcode"></a>

### RuntimeSignalCode

```ts
type RuntimeSignalCode = 
  | "timeout"
  | "out-of-memory"
  | "recursion-depth-exceeded"
  | "iteration-limit-exceeded";
```

<a id="signalcode" name="signalcode"></a>

### SignalCode

```ts
type SignalCode = 
  | RuntimeSignalCode
  | 
  | "invalid-name"
  | "expected-predicate"
  | "expected-symbol"
  | "operator-requires-one-operand"
  | "postfix-operator-requires-one-operand"
  | "prefix-operator-requires-one-operand"
  | "unbalanced-symbols"
  | "expected-argument"
  | "unexpected-command"
  | "cyclic-definition"
  | "invalid-supersets"
  | "expected-supersets"
  | "unknown-domain"
  | "duplicate-wikidata"
  | "invalid-dictionary-entry"
  | "syntax-error";
```

<a id="signalmessage" name="signalmessage"></a>

### SignalMessage

```ts
type SignalMessage = 
  | SignalCode
  | [SignalCode, ...any[]];
```

<a id="signalorigin" name="signalorigin"></a>

### SignalOrigin

```ts
type SignalOrigin = object;
```

#### Type declaration

<a id="url"></a>

##### url?

<a id="url" name="url"></a>

<MemberCard>

##### SignalOrigin.url?

```ts
optional url: string;
```

</MemberCard>

<a id="source"></a>

##### source?

<a id="source" name="source"></a>

<MemberCard>

##### SignalOrigin.source?

```ts
optional source: string;
```

</MemberCard>

<a id="offset"></a>

##### offset?

<a id="offset" name="offset"></a>

<MemberCard>

##### SignalOrigin.offset?

```ts
optional offset: number;
```

</MemberCard>

<a id="line"></a>

##### line?

<a id="line" name="line"></a>

<MemberCard>

##### SignalOrigin.line?

```ts
optional line: number;
```

</MemberCard>

<a id="column"></a>

##### column?

<a id="column" name="column"></a>

<MemberCard>

##### SignalOrigin.column?

```ts
optional column: number;
```

</MemberCard>

<a id="around"></a>

##### around?

<a id="around" name="around"></a>

<MemberCard>

##### SignalOrigin.around?

```ts
optional around: string;
```

</MemberCard>

<a id="signal" name="signal"></a>

### Signal

```ts
type Signal = object;
```

#### Type declaration

<a id="severity"></a>

##### severity?

<a id="severity" name="severity"></a>

<MemberCard>

##### Signal.severity?

```ts
optional severity: "warning" | "error";
```

</MemberCard>

<a id="message"></a>

##### message

<a id="message" name="message"></a>

<MemberCard>

##### Signal.message

```ts
message: SignalMessage;
```

An error/warning code or, a code with one or more arguments specific to
the signal code.

</MemberCard>

<a id="head"></a>

##### head?

<a id="head" name="head"></a>

<MemberCard>

##### Signal.head?

```ts
optional head: string;
```

If applicable, the head of the function about which the
signal was raised

</MemberCard>

<a id="origin"></a>

##### origin?

<a id="origin" name="origin"></a>

<MemberCard>

##### Signal.origin?

```ts
optional origin: SignalOrigin;
```

Location where the signal was raised.

</MemberCard>

<a id="errorsignal" name="errorsignal"></a>

### ErrorSignal

```ts
type ErrorSignal = Signal & object;
```

#### Type declaration

##### severity

<MemberCard>

##### ErrorSignal.severity

```ts
severity: "error";
```

</MemberCard>

<a id="warningsignal" name="warningsignal"></a>

### WarningSignal

```ts
type WarningSignal = Signal & object;
```

#### Type declaration

##### severity

<MemberCard>

##### WarningSignal.severity

```ts
severity: "warning";
```

</MemberCard>

<a id="warningsignalhandler" name="warningsignalhandler"></a>

### WarningSignalHandler()

```ts
type WarningSignalHandler = (warnings) => void;
```

##### warnings

[`WarningSignal`](#warningsignal)[]

`void`

<a id="errorcode" name="errorcode"></a>

### ErrorCode

```ts
type ErrorCode = 
  | "expected-argument"
  | "unexpected-argument"
  | "expected-operator"
  | "expected-operand"
  | "invalid-name"
  | "invalid-dictionary-entry"
  | "unknown-symbol"
  | "unknown-operator"
  | "unknown-function"
  | "unknown-command"
  | "unexpected-command"
  | "unbalanced-symbols"
  | "unexpected-superscript"
  | "unexpected-subscript"
  | "unexpected-sequence"
  | "non-associative-operator"
  | "function-has-too-many-arguments"
  | "function-has-too-few-arguments"
  | "operator-requires-one-operand"
  | "infix-operator-requires-two-operands"
  | "prefix-operator-requires-one-operand"
  | "postfix-operator-requires-one-operand"
  | "associative-function-has-too-few-arguments"
  | "commutative-function-has-too-few-arguments"
  | "threadable-function-has-too-few-arguments"
  | "hold-first-function-has-too-few-arguments"
  | "hold-rest-function-has-too-few-arguments"
  | "base-out-of-range"
  | "syntax-error";
```

The error codes can be used in an `ErrorCode` expression:

       `["ErrorCode", "'syntax-error'", arg1]`

It evaluates to a localized, human-readable string.

* `unknown-symbol`: a symbol was encountered which does not have a
definition.

* `unknown-operator`: a presumed operator was encountered which does not
have a definition.

* `unknown-function`: a LaTeX command was encountered which does not
have a definition.

* `unexpected-command`: a LaTeX command was encountered when only a string
was expected

* `unexpected-superscript`: a superscript was encountered in an unexpected
context, or no `powerFunction` was defined. By default, superscript can
be applied to numbers, symbols or expressions, but not to operators (e.g.
`2+^34`) or to punctuation.

* `unexpected-subscript`: a subscript was encountered in an unexpected
context or no 'subscriptFunction` was defined. By default, subscripts
are not expected on numbers, operators or symbols. Some commands (e.g. `\sum`)
do expected a subscript.

* `unexpected-sequence`: some adjacent elements were encountered (for
example `xy`), but the elements could not be combined. By default, adjacent
symbols are combined with `Multiply`, but adjacent numbers or adjacent
operators are not combined.

* `expected-argument`: a LaTeX command that requires one or more argument
was encountered without the required arguments.

* `expected-operand`: an operator was encountered without its required
operands.

* `non-associative-operator`: an operator which is not associative was
encountered in an associative context, for example: `a < b < c` (assuming
`<` is defined as non-associative)

* `postfix-operator-requires-one-operand`: a postfix operator which requires
a single argument was encountered with no arguments or more than one argument

* `prefix-operator-requires-one-operand`: a prefix operator which requires
a single argument was encountered with no arguments or more than one argument

* `base-out-of-range`:  The base is expected to be between 2 and 36.


<a name="compute-enginemd"></a>

The Compute Engine is a symbolic computation engine that can be used to
manipulate and evaluate mathematical expressions.

Use an instance of ComputeEngine to create boxed expressions
with ComputeEngine.parse and ComputeEngine.box.

Use a [`BoxedExpression`](#boxedexpression) object to manipulate and evaluate
mathematical expressions.

## Compute Engine

<a id="simplifyoptions" name="simplifyoptions"></a>

### SimplifyOptions

```ts
type SimplifyOptions = object;
```

Options for `BoxedExpression.simplify()`

#### Type declaration

<a id="rules-1"></a>

##### rules?

<a id="rules-1" name="rules-1"></a>

<MemberCard>

##### SimplifyOptions.rules?

```ts
optional rules: 
  | null
  | Rule
  | ReadonlyArray<
  | BoxedRule
  | Rule>
  | BoxedRuleSet;
```

The set of rules to apply. If `null`, use no rules. If not provided,
use the default simplification rules.

</MemberCard>

<a id="costfunction"></a>

##### costFunction()?

<a id="costfunction" name="costfunction"></a>

<MemberCard>

##### SimplifyOptions.costFunction()?

```ts
optional costFunction: (expr) => number;
```

Use this cost function to determine if a simplification is worth it.

If not provided, `ce.costFunction`, the cost function of the engine is
used.

###### expr

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

<a id="angularunit" name="angularunit"></a>

### AngularUnit

```ts
type AngularUnit = "rad" | "deg" | "grad" | "turn";
```

When a unitless value is passed to or returned from a trigonometric function,
the angular unit of the value.

- `rad`: radians, 2π radians is a full circle
- `deg`: degrees, 360 degrees is a full circle
- `grad`: gradians, 400 gradians is a full circle
- `turn`: turns, 1 turn is a full circle

<a id="arrayvalue" name="arrayvalue"></a>

### ArrayValue

```ts
type ArrayValue = 
  | boolean
  | number
  | string
  | BigNum
  | BoxedExpression
  | undefined;
```

<a id="assignvalue" name="assignvalue"></a>

### AssignValue

```ts
type AssignValue = 
  | boolean
  | number
  | SemiBoxedExpression
  | (args, options) => BoxedExpression
  | undefined;
```

<a id="jsonserializationoptions" name="jsonserializationoptions"></a>

### JsonSerializationOptions

```ts
type JsonSerializationOptions = object;
```

Options to control the serialization to MathJSON when using `BoxedExpression.toMathJson()`.

#### Type declaration

<a id="prettify"></a>

##### prettify

<a id="prettify" name="prettify"></a>

<MemberCard>

##### JsonSerializationOptions.prettify

```ts
prettify: boolean;
```

If true, the serialization applies some transformations to make
the JSON more readable. For example, `["Power", "x", 2]` is serialized
as `["Square", "x"]`.

</MemberCard>

<a id="exclude"></a>

##### exclude

<a id="exclude" name="exclude"></a>

<MemberCard>

##### JsonSerializationOptions.exclude

```ts
exclude: string[];
```

A list of space separated function names that should be excluded from
the JSON output.

Those functions are replaced with an equivalent, for example, `Square` with
`Power`, etc...

Possible values include `Sqrt`, `Root`, `Square`, `Exp`, `Subtract`,
`Rational`, `Complex`

**Default**: `[]` (none)

</MemberCard>

<a id="shorthands"></a>

##### shorthands

<a id="shorthands" name="shorthands"></a>

<MemberCard>

##### JsonSerializationOptions.shorthands

```ts
shorthands: ("all" | "number" | "symbol" | "function" | "string")[];
```

A list of space separated keywords indicating which MathJSON expressions
can use a shorthand.

**Default**: `["all"]`

</MemberCard>

<a id="metadata-1"></a>

##### metadata

<a id="metadata-1" name="metadata-1"></a>

<MemberCard>

##### JsonSerializationOptions.metadata

```ts
metadata: ("all" | "wikidata" | "latex")[];
```

A list of space separated keywords indicating which metadata should be
included in the MathJSON. If metadata is included, shorthand notation
is not used.

**Default**: `[]`  (none)

</MemberCard>

<a id="repeatingdecimal"></a>

##### repeatingDecimal

<a id="repeatingdecimal" name="repeatingdecimal"></a>

<MemberCard>

##### JsonSerializationOptions.repeatingDecimal

```ts
repeatingDecimal: boolean;
```

If true, repeating decimals are detected and serialized accordingly
For example:
- `1.3333333333333333` \( \to \) `1.(3)`
- `0.142857142857142857142857142857142857142857142857142` \( \to \) `0.(1428571)`

**Default**: `true`

</MemberCard>

<a id="fractionaldigits"></a>

##### fractionalDigits

<a id="fractionaldigits" name="fractionaldigits"></a>

<MemberCard>

##### JsonSerializationOptions.fractionalDigits

```ts
fractionalDigits: "auto" | "max" | number;
```

The maximum number of significant digits in serialized numbers.
- `"max"`: all availabe digits are serialized.
- `"auto"`: use the same precision as the compute engine.

**Default**: `"auto"`

</MemberCard>

<a id="scope-2" name="scope-2"></a>

### Scope

```ts
type Scope = object;
```

A scope is a set of names in a dictionary that are bound (defined) in
a MathJSON expression.

Scopes are arranged in a stack structure. When an expression that defined
a new scope is evaluated, the new scope is added to the scope stack.
Outside of the expression, the scope is removed from the scope stack.

The scope stack is used to resolve symbols, and it is possible for
a scope to 'mask' definitions from previous scopes.

Scopes are lexical (also called a static scope): they are defined based on
where they are in an expression, they are not determined at runtime.

<a id="runtimescope" name="runtimescope"></a>

### RuntimeScope

```ts
type RuntimeScope = Scope & object;
```

#### Type declaration

##### parentScope?

<MemberCard>

##### RuntimeScope.parentScope?

```ts
optional parentScope: RuntimeScope;
```

</MemberCard>

##### ids?

<MemberCard>

##### RuntimeScope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

##### assumptions

<MemberCard>

##### RuntimeScope.assumptions

```ts
assumptions: 
  | undefined
| ExpressionMapInterface<boolean>;
```

</MemberCard>

## Boxed Expression

<a id="boxedexpression" name="boxedexpression"></a>

### BoxedExpression

:::info[THEORY OF OPERATIONS]

The `BoxedExpression` interface includes most of the member functions
applicable to any kind of expression, for example `get symbol()` or
`get ops()`.

When a member function is not applicable to this `BoxedExpression`,
for example `get symbol()` on a `BoxedNumber`, it returns `null`.

This convention makes it convenient to manipulate expressions without
having to check what kind of instance they are before manipulating them.
:::

To get a boxed expression from a LaTeX string use `ce.parse()`, or to
get a boxed expression from a MathJSON expression use `ce.box()`.

#### Function Expression

<a id="ops" name="ops"></a>

<MemberCard>

##### BoxedExpression.ops

```ts
readonly ops: readonly BoxedExpression[];
```

The list of operands of the function.

If the expression is not a function, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="nops" name="nops"></a>

<MemberCard>

##### BoxedExpression.nops

```ts
readonly nops: number;
```

If this expression is a function, the number of operands, otherwise 0.

Note that a function can have 0 operands, so to check if this expression
is a function, check if `this.ops !== null` instead.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="op1" name="op1"></a>

<MemberCard>

##### BoxedExpression.op1

```ts
readonly op1: BoxedExpression;
```

First operand, i.e.`this.ops[0]`.

If there is no first operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="op2" name="op2"></a>

<MemberCard>

##### BoxedExpression.op2

```ts
readonly op2: BoxedExpression;
```

Second operand, i.e.`this.ops[1]`

If there is no second operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="op3" name="op3"></a>

<MemberCard>

##### BoxedExpression.op3

```ts
readonly op3: BoxedExpression;
```

Third operand, i.e. `this.ops[2]`

If there is no third operand, return the symbol `Nothing`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

#### Numeric Expression

<a id="isnan" name="isnan"></a>

<MemberCard>

##### BoxedExpression.isNaN

```ts
readonly isNaN: boolean;
```

"Not a Number".

A value representing undefined result of computations, such as `0/0`,
as per the floating point format standard IEEE-754.

Note that if `isNaN` is true, `isNumber` is also true (yes, `NaN` is a
number).

</MemberCard>

<a id="isinfinity" name="isinfinity"></a>

<MemberCard>

##### BoxedExpression.isInfinity

```ts
readonly isInfinity: boolean;
```

The numeric value of this expression is `±Infinity` or Complex Infinity

</MemberCard>

<a id="isfinite" name="isfinite"></a>

<MemberCard>

##### BoxedExpression.isFinite

```ts
readonly isFinite: boolean;
```

This expression is a number, but not `±Infinity`, 'ComplexInfinity` or
 `NaN`

</MemberCard>

<a id="iseven" name="iseven"></a>

<MemberCard>

##### BoxedExpression.isEven

```ts
readonly isEven: boolean;
```

</MemberCard>

<a id="isodd" name="isodd"></a>

<MemberCard>

##### BoxedExpression.isOdd

```ts
readonly isOdd: boolean;
```

</MemberCard>

<a id="numericvalue" name="numericvalue"></a>

<MemberCard>

##### BoxedExpression.numericValue

```ts
readonly numericValue: number | NumericValue;
```

Return the value of this expression, if a number literal.

Note it is possible for `this.numericValue` to be `null`, and for
`this.isNotZero` to be true. For example, when a symbol has been
defined with an assumption.

Conversely, `this.isNumber` may be true even if `numericValue` is `null`,
example the symbol `Pi` return `true` for `isNumber` but `numericValue` is
`null`. Its value can be accessed with `.N().numericValue`.

To check if an expression is a number literal, use `this.isNumberLiteral`.
If `this.isNumberLiteral` is `true`, `this.numericValue` is not `null`

</MemberCard>

<a id="isnumberliteral" name="isnumberliteral"></a>

<MemberCard>

##### BoxedExpression.isNumberLiteral

```ts
readonly isNumberLiteral: boolean;
```

Return `true` if this expression is a number literal, for example
`2`, `3.14`, `1/2`, `√2` etc.

This is equivalent to checking if `this.numericValue` is not `null`.

</MemberCard>

<a id="re" name="re"></a>

<MemberCard>

##### BoxedExpression.re

```ts
readonly re: number;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the real part of the value.

If the expression is not a number literal, or a symbol with a value
that is a number literal, return `NaN` (not a number).

</MemberCard>

<a id="im" name="im"></a>

<MemberCard>

##### BoxedExpression.im

```ts
readonly im: number;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the imaginary part of the value. If the value
is a real number, the imaginary part is 0.

If the expression is not a number literal, or a symbol with a value
that is a number literal, return `NaN` (not a number).

</MemberCard>

<a id="bignumre" name="bignumre"></a>

<MemberCard>

##### BoxedExpression.bignumRe

```ts
readonly bignumRe: Decimal;
```

If this expression is a number literal or a symbol with a value that
is a number literal, return the real part of the value as a `BigNum`.

If the value is not available as a bignum return `undefined`. That is,
the value is not upconverted to a bignum.

To get the real value either as a bignum or a number, use
`this.bignumRe ?? this.re`. When using this pattern, the value is
returned as a bignum if available, otherwise as a number or NaN if
the value is not a number literal or a symbol with a value that is a
number literal.

</MemberCard>

<a id="bignumim" name="bignumim"></a>

<MemberCard>

##### BoxedExpression.bignumIm

```ts
readonly bignumIm: Decimal;
```

If this expression is a number literal, return the imaginary part as a
`BigNum`.

It may be 0 if the number is real.

If the expression is not a number literal or the value is not available
as a bignum return `undefined`. That is, the value is not upconverted
to a bignum.

To get the imaginary value either as a bignum or a number, use
`this.bignumIm ?? this.im`. When using this pattern, the value is
returned as a bignum if available, otherwise as a number or NaN if
the value is not a number literal or a symbol with a value that is a
number literal.

</MemberCard>

<a id="sgn" name="sgn"></a>

<MemberCard>

##### BoxedExpression.sgn

```ts
readonly sgn: Sign;
```

Return the sign of the expression.

Note that complex numbers have no natural ordering,
so if the value is an imaginary number (a complex number with a non-zero
imaginary part), `this.sgn` will return `unsigned`.

If a symbol, this does take assumptions into account, that is `this.sgn`
will return `positive` if the symbol is assumed to be positive
(using `ce.assume()`).

</MemberCard>

<a id="ispositive" name="ispositive"></a>

<MemberCard>

##### BoxedExpression.isPositive

```ts
readonly isPositive: boolean;
```

The numeric value of this expression is > 0, same as `isGreater(0)`

</MemberCard>

<a id="isnonnegative" name="isnonnegative"></a>

<MemberCard>

##### BoxedExpression.isNonNegative

```ts
readonly isNonNegative: boolean;
```

The numeric value of this expression is >= 0, same as `isGreaterEqual(0)`

</MemberCard>

<a id="isnegative" name="isnegative"></a>

<MemberCard>

##### BoxedExpression.isNegative

```ts
readonly isNegative: boolean;
```

The numeric value of this expression is < 0, same as `isLess(0)`

</MemberCard>

<a id="isnonpositive" name="isnonpositive"></a>

<MemberCard>

##### BoxedExpression.isNonPositive

```ts
readonly isNonPositive: boolean;
```

The numeric value of this expression is &lt;= 0, same as `isLessEqual(0)`

</MemberCard>

#### Other

<a id="engine" name="engine"></a>

<MemberCard>

##### BoxedExpression.engine

```ts
readonly engine: IComputeEngine;
```

The Compute Engine associated with this expression provides
a context in which to interpret it, such as definition of symbols
and functions.

</MemberCard>

<a id="tomathjson" name="tomathjson"></a>

<MemberCard>

##### BoxedExpression.toMathJson()

```ts
toMathJson(options?): Expression
```

Serialize to a MathJSON expression with specified options

###### options?

`Readonly`\<`Partial`\<[`JsonSerializationOptions`](#jsonserializationoptions)\>\>

`Expression`

</MemberCard>

<a id="tolatex" name="tolatex"></a>

<MemberCard>

##### BoxedExpression.toLatex()

```ts
toLatex(options?): string
```

Serialize to a LaTeX string.

Will ignore any LaTeX metadata.

###### options?

`Partial`\<`SerializeLatexOptions`\>

`string`

</MemberCard>

<a id="verbatimlatex" name="verbatimlatex"></a>

<MemberCard>

##### BoxedExpression.verbatimLatex?

```ts
optional verbatimLatex: string;
```

</MemberCard>

<a id="iscanonical" name="iscanonical"></a>

<MemberCard>

##### BoxedExpression.isCanonical

###### Get Signature

```ts
get isCanonical(): boolean
```

If `true`, this expression is in a canonical form.

`boolean`

</MemberCard>

<a id="isstructural" name="isstructural"></a>

<MemberCard>

##### BoxedExpression.isStructural

###### Get Signature

```ts
get isStructural(): boolean
```

If `true`, this expression is in a structural form.

`boolean`

</MemberCard>

<a id="json" name="json"></a>

<MemberCard>

##### BoxedExpression.json

```ts
readonly json: Expression;
```

MathJSON representation of this expression.

This representation always use shorthands when possible. Metadata is not
included.

Numbers are converted to JavaScript numbers and may lose precision.

The expression is represented exactly and no sugaring is applied. For
example, `["Power", "x", 2]` is not represented as `["Square", "x"]`.

For more control over the serialization, use `expr.toMathJson()`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="scope" name="scope"></a>

<MemberCard>

##### BoxedExpression.scope

```ts
readonly scope: object;
```

The scope in which this expression has been defined.

Is `null` when the expression is not canonical.

<a id=""></a>

###### parentScope?

<MemberCard>

###### scope.parentScope?

```ts
optional parentScope: { parentScope?: ...; ids?: RuntimeIdentifierDefinitions; assumptions: ExpressionMapInterface<boolean>; };
```

</MemberCard>

<a id=""></a>

###### ids?

<MemberCard>

###### scope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

<a id=""></a>

###### assumptions

<MemberCard>

###### scope.assumptions

```ts
assumptions: ExpressionMapInterface<boolean>;
```

</MemberCard>

</MemberCard>

<a id="latex" name="latex"></a>

<MemberCard>

##### BoxedExpression.latex

###### Get Signature

```ts
get latex(): string
```

LaTeX representation of this expression.

If the expression was parsed from LaTeX, the LaTeX representation is
the same as the input LaTeX.

To customize the serialization, use `expr.toLatex()`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

`string`

</MemberCard>

<a id="getsubexpressions" name="getsubexpressions"></a>

<MemberCard>

##### BoxedExpression.getSubexpressions()

```ts
getSubexpressions(name): readonly BoxedExpression[]
```

All the subexpressions matching the named operator, recursively.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### name

`string`

readonly [`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="subexpressions" name="subexpressions"></a>

<MemberCard>

##### BoxedExpression.subexpressions

```ts
readonly subexpressions: readonly BoxedExpression[];
```

All the subexpressions in this expression, recursively

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="symbols" name="symbols"></a>

<MemberCard>

##### BoxedExpression.symbols

```ts
readonly symbols: readonly string[];
```

All the symbols in the expression, recursively

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="unknowns" name="unknowns"></a>

<MemberCard>

##### BoxedExpression.unknowns

```ts
readonly unknowns: readonly string[];
```

All the identifiers used in the expression that do not have a value
associated with them, i.e. they are declared but not defined.

</MemberCard>

<a id="freevariables" name="freevariables"></a>

<MemberCard>

##### BoxedExpression.freeVariables

```ts
readonly freeVariables: readonly string[];
```

All the identifiers (symbols and functions) in the expression that are
not a local variable or a parameter of that function.

</MemberCard>

<a id="errors" name="errors"></a>

<MemberCard>

##### BoxedExpression.errors

```ts
readonly errors: readonly BoxedExpression[];
```

All the `["Error"]` subexpressions.

If an expression includes an error, the expression is also an error.
In that case, the `this.isValid` property is `false`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="operator" name="operator"></a>

<MemberCard>

##### BoxedExpression.operator

```ts
readonly operator: string;
```

The name of the operator of the expression.

For example, the name of the operator of `["Add", 2, 3]` is `"Add"`.

A string literal has a `"String"` operator.

A symbol has a `"Symbol"` operator.

A number has a `"Number"`, `"Real"`, `"Rational"` or `"Integer"` operator.

</MemberCard>

<a id="ispure" name="ispure"></a>

<MemberCard>

##### BoxedExpression.isPure

```ts
readonly isPure: boolean;
```

If true, the value of the expression never changes and evaluating it has
no side-effects.

If false, the value of the expression may change, if the
value of other expression changes or for other reasons.

If `this.isPure` is `false`, `this.value` is undefined. Call
`this.evaluate()` to determine the value of the expression instead.

As an example, the `Random` function is not pure.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="isconstant" name="isconstant"></a>

<MemberCard>

##### BoxedExpression.isConstant

```ts
readonly isConstant: boolean;
```

True if the the value of the expression does not depend on the value of
any other expression.

For example, a number literal, a symbol with a constant value.
- `2` is constant
- `Pi` is constant
- `["Add", "Pi", 2]` is constant
- `x` is not constant
- `["Add", "x", 2]` is not constant

</MemberCard>

<a id="canonical" name="canonical"></a>

<MemberCard>

##### BoxedExpression.canonical

###### Get Signature

```ts
get canonical(): BoxedExpression
```

Return the canonical form of this expression.

If this is a function expression, a definition is associated with the
canonical expression.

When determining the canonical form the following function definition
flags are applied:
- `associative`: \\( f(a, f(b), c) \longrightarrow f(a, b, c) \\)
- `idempotent`: \\( f(f(a)) \longrightarrow f(a) \\)
- `involution`: \\( f(f(a)) \longrightarrow a \\)
- `commutative`: sort the arguments.

If this expression is already canonical, the value of canonical is
`this`.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="structural" name="structural"></a>

<MemberCard>

##### BoxedExpression.structural

###### Get Signature

```ts
get structural(): BoxedExpression
```

Return the structural form of this expression.

Some expressions, such as rational numbers, are represented with
a `BoxedExpression` object. In some cases, for example when doing a
structural comparison of two expressions, it is useful to have a
structural representation of the expression where the rational numbers
is represented by a function expression instead.

If there is a structural representation of the expression, return it,
otherwise return `this`.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="subs" name="subs"></a>

<MemberCard>

##### BoxedExpression.subs()

```ts
subs(sub, options?): BoxedExpression
```

Replace all the symbols in the expression as indicated.

Note the same effect can be achieved with `this.replace()`, but
using `this.subs()` is more efficient, and simpler, but limited
to replacing symbols.

The result is bound to the current scope, not to `this.scope`.

If `options.canonical` is not set, the result is canonical if `this`
is canonical.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### sub

[`Substitution`](#substitutiont)\<[`SemiBoxedExpression`](#semiboxedexpression)\>

###### options?

###### canonical

[`CanonicalOptions`](#canonicaloptions)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="map" name="map"></a>

<MemberCard>

##### BoxedExpression.map()

```ts
map(fn, options?): BoxedExpression
```

Recursively replace all the subexpressions in the expression as indicated.

To remove a subexpression, return an empty `["Sequence"]` expression.

The canonical option is applied to each function subexpression after
the substitution is applied.

If no `options.canonical` is set, the result is canonical if `this`
is canonical.

**Default**: `{ canonical: this.isCanonical, recursive: true }`

###### fn

(`expr`) => [`BoxedExpression`](#boxedexpression)

###### options?

###### canonical

[`CanonicalOptions`](#canonicaloptions)

###### recursive

`boolean`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="replace" name="replace"></a>

<MemberCard>

##### BoxedExpression.replace()

```ts
replace(rules, options?): BoxedExpression
```

Transform the expression by applying one or more replacement rules:

- If the expression matches the `match` pattern and the `condition`
 predicate is true, replace it with the `replace` pattern.

- If no rules apply, return `null`.

See also `expr.subs()` for a simple substitution of symbols.

If `options.canonical` is not set, the result is canonical if `this`
is canonical.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### rules

[`Rule`](#rule) | [`BoxedRuleSet`](#boxedruleset) | [`Rule`](#rule)[]

###### options?

`Partial`\<[`ReplaceOptions`](#replaceoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="has" name="has"></a>

<MemberCard>

##### BoxedExpression.has()

```ts
has(v): boolean
```

True if the expression includes a symbol `v` or a function operator `v`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### v

`string` | `string`[]

`boolean`

</MemberCard>

<a id="numerator" name="numerator"></a>

<MemberCard>

##### BoxedExpression.numerator

###### Get Signature

```ts
get numerator(): BoxedExpression
```

Return this expression expressed as a numerator and denominator.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="denominator" name="denominator"></a>

<MemberCard>

##### BoxedExpression.denominator

###### Get Signature

```ts
get denominator(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="numeratordenominator" name="numeratordenominator"></a>

<MemberCard>

##### BoxedExpression.numeratorDenominator

###### Get Signature

```ts
get numeratorDenominator(): [BoxedExpression, BoxedExpression]
```

\[[`BoxedExpression`](#boxedexpression), [`BoxedExpression`](#boxedexpression)\]

</MemberCard>

<a id="match" name="match"></a>

<MemberCard>

##### BoxedExpression.match()

```ts
match(pattern, options?): BoxedSubstitution
```

If this expression matches `pattern`, return a substitution that makes
`pattern` equal to `this`. Otherwise return `null`.

If `pattern` includes wildcards (identifiers that start
with `_`), the substitution will include a prop for each matching named
wildcard.

If this expression matches `pattern` but there are no named wildcards,
return the empty substitution, `{}`.

Read more about [**patterns and rules**](/compute-engine/guides/patterns-and-rules/).

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### pattern

[`BoxedExpression`](#boxedexpression)

###### options?

[`PatternMatchOptions`](#patternmatchoptions)

[`BoxedSubstitution`](#boxedsubstitution)

</MemberCard>

<a id="isfunctionexpression" name="isfunctionexpression"></a>

<MemberCard>

##### BoxedExpression.isFunctionExpression

```ts
readonly isFunctionExpression: boolean;
```

Return `true` if this expression is a function expression.

If `true`, `this.ops` is not `null`, and `this.operator` is the name
of the function.

</MemberCard>

<a id="tonumericvalue" name="tonumericvalue"></a>

<MemberCard>

##### BoxedExpression.toNumericValue()

```ts
toNumericValue(): [NumericValue, BoxedExpression]
```

Attempt to factor a numeric coefficient `c` and a `rest` out of a
canonical expression such that `rest.mul(c)` is equal to `this`.

Attempts to make `rest` a positive value (i.e. pulls out negative sign).

```json
['Multiply', 2, 'x', 3, 'a']
   -> [NumericValue(6), ['Multiply', 'x', 'a']]

['Divide', ['Multiply', 2, 'x'], ['Multiply', 3, 'y', 'a']]
   -> [NumericValue({rational: [2, 3]}), ['Divide', 'x', ['Multiply, 'y', 'a']]]
```

\[`NumericValue`, [`BoxedExpression`](#boxedexpression)\]

</MemberCard>

<a id="neg" name="neg"></a>

<MemberCard>

##### BoxedExpression.neg()

```ts
neg(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="inv" name="inv"></a>

<MemberCard>

##### BoxedExpression.inv()

```ts
inv(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="abs" name="abs"></a>

<MemberCard>

##### BoxedExpression.abs()

```ts
abs(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="add" name="add"></a>

<MemberCard>

##### BoxedExpression.add()

```ts
add(rhs): BoxedExpression
```

###### rhs

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="sub" name="sub"></a>

<MemberCard>

##### BoxedExpression.sub()

```ts
sub(rhs): BoxedExpression
```

###### rhs

[`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="mul" name="mul"></a>

<MemberCard>

##### BoxedExpression.mul()

```ts
mul(rhs): BoxedExpression
```

###### rhs

`number` | [`BoxedExpression`](#boxedexpression) | `NumericValue`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="div" name="div"></a>

<MemberCard>

##### BoxedExpression.div()

```ts
div(rhs): BoxedExpression
```

###### rhs

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="pow" name="pow"></a>

<MemberCard>

##### BoxedExpression.pow()

```ts
pow(exp): BoxedExpression
```

###### exp

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="root" name="root"></a>

<MemberCard>

##### BoxedExpression.root()

```ts
root(exp): BoxedExpression
```

###### exp

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="sqrt" name="sqrt"></a>

<MemberCard>

##### BoxedExpression.sqrt()

```ts
sqrt(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="ln" name="ln"></a>

<MemberCard>

##### BoxedExpression.ln()

```ts
ln(base?): BoxedExpression
```

###### base?

`number` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="shape" name="shape"></a>

<MemberCard>

##### BoxedExpression.shape

```ts
readonly shape: number[];
```

The shape describes the axis of the expression.

When the expression is a scalar (number), the shape is `[]`.

When the expression is a vector of length `n`, the shape is `[n]`.

When the expression is a `n` by `m` matrix, the shape is `[n, m]`.

</MemberCard>

<a id="rank" name="rank"></a>

<MemberCard>

##### BoxedExpression.rank

```ts
readonly rank: number;
```

Return 0 for a scalar, 1 for a vector, 2 for a matrix, > 2 for
a multidimensional matrix.

The rank is equivalent to the length of `expr.shape`

</MemberCard>

<a id="wikidata" name="wikidata"></a>

<MemberCard>

##### BoxedExpression.wikidata

```ts
readonly wikidata: string;
```

Wikidata identifier.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="description" name="description"></a>

<MemberCard>

##### BoxedExpression.description

```ts
readonly description: string[];
```

An optional short description if a symbol or function expression.

May include markdown. Each string is a paragraph.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="url" name="url"></a>

<MemberCard>

##### BoxedExpression.url

```ts
readonly url: string;
```

An optional URL pointing to more information about the symbol or
 function operator.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="complexity" name="complexity"></a>

<MemberCard>

##### BoxedExpression.complexity

```ts
readonly complexity: number;
```

Expressions with a higher complexity score are sorted
first in commutative functions

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="basedefinition" name="basedefinition"></a>

<MemberCard>

##### BoxedExpression.baseDefinition

```ts
readonly baseDefinition: BoxedBaseDefinition;
```

For symbols and functions, a definition associated with the
 expression. `this.baseDefinition` is the base class of symbol and function
 definition.

:::info[Note]
`undefined` if not a canonical expression.
:::

</MemberCard>

<a id="functiondefinition" name="functiondefinition"></a>

<MemberCard>

##### BoxedExpression.functionDefinition

```ts
readonly functionDefinition: BoxedFunctionDefinition;
```

For functions, a definition associated with the expression.

:::info[Note]
`undefined` if not a canonical expression or not a function.
:::

</MemberCard>

<a id="symboldefinition" name="symboldefinition"></a>

<MemberCard>

##### BoxedExpression.symbolDefinition

```ts
readonly symbolDefinition: BoxedSymbolDefinition;
```

For symbols, a definition associated with the expression.

Return `undefined` if not a symbol

</MemberCard>

<a id="simplify" name="simplify"></a>

<MemberCard>

##### BoxedExpression.simplify()

```ts
simplify(options?): BoxedExpression
```

Return a simpler form of this expression.

A series of rewriting rules are applied repeatedly, until no more rules
apply.

The values assigned to symbols and the assumptions about symbols may be
used, for example `expr.isInteger` or `expr.isPositive`.

No calculations involving decimal numbers (numbers that are not
integers) are performed but exact calculations may be performed,
for example:

$$ \sin(\frac{\pi}{4}) \longrightarrow \frac{\sqrt{2}}{2} $$.

The result is canonical.

To manipulate symbolically non-canonical expressions, use `expr.replace()`.

###### options?

`Partial`\<[`SimplifyOptions`](#simplifyoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="expand" name="expand"></a>

<MemberCard>

##### BoxedExpression.expand()

```ts
expand(): BoxedExpression
```

Expand the expression: distribute multiplications over additions,
and expand powers.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="evaluate" name="evaluate"></a>

<MemberCard>

##### BoxedExpression.evaluate()

```ts
evaluate(options?): BoxedExpression
```

Return the value of the canonical form of this expression.

A pure expression always return the same value and has no side effects.
If `expr.isPure` is `true`, `expr.value` and `expr.evaluate()` are
synonyms.

For an impure expression, `expr.value` is undefined.

Evaluating an impure expression may have some side effects, for
example modifying the `ComputeEngine` environment, such as its set of
assumptions.

The result may be a rational number or the product of a rational number
and the square root of an integer.

To perform approximate calculations, use `expr.N()` instead,
or set `options.numericApproximation` to `true`.

The result of `expr.evaluate()` may be the same as `expr.simplify()`.

The result is in canonical form.

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="evaluateasync" name="evaluateasync"></a>

<MemberCard>

##### BoxedExpression.evaluateAsync()

```ts
evaluateAsync(options?): Promise<BoxedExpression>
```

Asynchronous version of `evaluate()`.

The `options` argument can include a `signal` property, which is an
`AbortSignal` object. If the signal is aborted, a `CancellationError` is thrown.

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\>

`Promise`\<[`BoxedExpression`](#boxedexpression)\>

</MemberCard>

<a id="n" name="n"></a>

<MemberCard>

##### BoxedExpression.N()

```ts
N(): BoxedExpression
```

Return a numeric approximation of the canonical form of this expression.

Any necessary calculations, including on decimal numbers (non-integers),
are performed.

The calculations are performed according to the
`precision` property of the `ComputeEngine`.

To only perform exact calculations, use `this.evaluate()` instead.

If the function is not numeric, the result of `this.N()` is the same as
`this.evaluate()`.

The result is in canonical form.

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="compile" name="compile"></a>

<MemberCard>

##### BoxedExpression.compile()

```ts
compile(options?): (args?) => CompiledType
```

Compile the expression to a JavaScript function.

The function takes an object as argument, with the keys being the
symbols in the expression, and returns the value of the expression.

```javascript
const expr = ce.parse('x^2 + y^2');
const f = expr.compile();
console.log(f({x: 2, y: 3}));
```

###### options?

###### to

`"javascript"`

###### optimize

(`"evaluate"` \| `"simplify"`)[]

###### functions

`Record`\<`string`, `string` \| (...`any`) => `any`\>

###### vars

`Record`\<`string`, `CompiledType`\>

###### imports

`unknown`[]

###### preamble

`string`

`Function`

###### args?

`Record`\<`string`, `CompiledType`\>

`CompiledType`

</MemberCard>

<a id="solve" name="solve"></a>

<MemberCard>

##### BoxedExpression.solve()

```ts
solve(vars?): readonly BoxedExpression[]
```

If this is an equation, solve the equation for the variables in vars.
Otherwise, solve the equation `this = 0` for the variables in vars.

```javascript
const expr = ce.parse('x^2 + 2*x + 1 = 0');
console.log(expr.solve('x'));
```

###### vars?

`string` | `Iterable`\<`string`\> | [`BoxedExpression`](#boxedexpression) | `Iterable`\<[`BoxedExpression`](#boxedexpression)\>

readonly [`BoxedExpression`](#boxedexpression)[]

</MemberCard>

<a id="value" name="value"></a>

<MemberCard>

##### BoxedExpression.value

###### Get Signature

```ts
get value(): string | number | boolean | object
```

Return a JavaScript primitive representing the value of this expression.

Equivalent to `expr.N().valueOf()`.

`string` \| `number` \| `boolean` \| `object`

```ts
set value(value): void
```

Only the value of variables can be changed (symbols that are not
constants).

Throws a runtime error if a constant.

:::info[Note]
If non-canonical, does nothing
:::

###### Parameters

###### value

`string` | `number` | `boolean` | `number`[] | `Decimal` | [`BoxedExpression`](#boxedexpression) | \{
`re`: `number`;
`im`: `number`;
\} | \{
`num`: `number`;
`denom`: `number`;
\}

`void`

</MemberCard>

<a id="type" name="type"></a>

<MemberCard>

##### BoxedExpression.type

###### Get Signature

```ts
get type(): BoxedType
```

The type of the value of this expression.

If a function expression, the type of the value of the function
(the result type).

If a symbol the type of the value of the symbol.

:::info[Note]
If not valid, return `"error"`.
If non-canonical, return `undefined`.
If the type is not known, return `"unknown"`.
:::

`BoxedType`

```ts
set type(type): void
```

###### Parameters

###### type

`string` | `AlgebraicType` | `NegationType` | `CollectionType` | `ListType` | `SetType` | `MapType` | `TupleType` | `FunctionSignature` | `ValueType` | `TypeReference` | `BoxedType`

`void`

</MemberCard>

<a id="iscollection" name="iscollection"></a>

<MemberCard>

##### BoxedExpression.isCollection

```ts
isCollection: boolean;
```

Return true if the expression is a collection: a list, a vector, a matrix, a map, a tuple, etc...

</MemberCard>

<a id="contains" name="contains"></a>

<MemberCard>

##### BoxedExpression.contains()

```ts
contains(rhs): boolean
```

If this is a collection, return true if the `rhs` expression is in the
collection.

Return `undefined` if the membership cannot be determined.

###### rhs

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="size" name="size"></a>

<MemberCard>

##### BoxedExpression.size

###### Get Signature

```ts
get size(): number
```

If this is a collection, return the number of elements in the collection.

If the collection is infinite, return `Infinity`.

`number`

</MemberCard>

<a id="each" name="each"></a>

<MemberCard>

##### BoxedExpression.each()

```ts
each: (start?, count?) => Iterator<BoxedExpression, undefined>;
```

If this is a collection, return an iterator over the elements of the collection.

If `start` is not specified, start from the first element.

If `count` is not specified or negative, return all the elements from `start` to the end.

```js
const expr = ce.parse('[1, 2, 3, 4]');
for (const e of expr.each()) {
 console.log(e);
}
```

###### start?

`number`

###### count?

`number`

`Iterator`\<[`BoxedExpression`](#boxedexpression), `undefined`\>

</MemberCard>

<a id="at" name="at"></a>

<MemberCard>

##### BoxedExpression.at()

```ts
at(index): BoxedExpression
```

If this is an indexable collection, return the element at the specified
 index.

If the index is negative, return the element at index `size() + index + 1`.

###### index

`number`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="get" name="get"></a>

<MemberCard>

##### BoxedExpression.get()

```ts
get(key): BoxedExpression
```

If this is a map or a tuple, return the value of the corresponding key.

If `key` is a `BoxedExpression`, it should be a string.

###### key

`string` | [`BoxedExpression`](#boxedexpression)

[`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="indexof" name="indexof"></a>

<MemberCard>

##### BoxedExpression.indexOf()

```ts
indexOf(expr): number
```

If this is an indexable collection, return the index of the first element
that matches the target expression.

###### expr

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

#### Primitive Methods

<a id="valueof" name="valueof"></a>

<MemberCard>

##### BoxedExpression.valueOf()

```ts
valueOf(): any
```

From `Object.valueOf()`, return a primitive value for the expression.

If the expression is a machine number, or bignum or rational that can be
converted to a machine number, return a JavaScript `number`.

If the expression is a symbol, return the name of the symbol as a `string`.

Otherwise return a JavaScript primitive representation of the expression.

`any`

</MemberCard>

<a id="tostring" name="tostring"></a>

<MemberCard>

##### BoxedExpression.toString()

```ts
toString(): string
```

From `Object.toString()`, return a string representation of the
 expression. This string is suitable to be output to the console
for debugging, for example. It is formatted as a ASCIIMath expression.

To get a LaTeX representation of the expression, use `expr.latex`.

Used when coercing a `BoxedExpression` to a `String`.

`string`

</MemberCard>

<a id="print" name="print"></a>

<MemberCard>

##### BoxedExpression.print()

```ts
print(): void
```

Output to the console a string representation of the expression.

`void`

</MemberCard>

<a id="toprimitive" name="toprimitive"></a>

<MemberCard>

##### BoxedExpression.\[toPrimitive\]()

```ts
toPrimitive: string | number
```

Similar to`expr.valueOf()` but includes a hint.

###### hint

`"string"` | `"number"` | `"default"`

`string` \| `number`

</MemberCard>

<a id="tojson" name="tojson"></a>

<MemberCard>

##### BoxedExpression.toJSON()

```ts
toJSON(): Expression
```

Used by `JSON.stringify()` to serialize this object to JSON.

Method version of `expr.json`.

`Expression`

</MemberCard>

<a id="is" name="is"></a>

<MemberCard>

##### BoxedExpression.is()

```ts
is(rhs): boolean
```

Equivalent to `BoxedExpression.isSame()` but the argument can be
a JavaScript primitive. For example, `expr.is(2)` is equivalent to
`expr.isSame(ce.number(2))`.

###### rhs

`any`

`boolean`

</MemberCard>

#### Relational Operator

<a id="issame" name="issame"></a>

<MemberCard>

##### BoxedExpression.isSame()

```ts
isSame(rhs): boolean
```

Structural/symbolic equality (weak equality).

`ce.parse('1+x').isSame(ce.parse('x+1'))` is `false`.

See `expr.isEqual()` for mathematical equality.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

###### rhs

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isless" name="isless"></a>

<MemberCard>

##### BoxedExpression.isLess()

```ts
isLess(other): boolean
```

If the expressions cannot be compared, return `undefined`

The numeric value of both expressions are compared.

The expressions are evaluated before being compared, which may be
expensive.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="islessequal" name="islessequal"></a>

<MemberCard>

##### BoxedExpression.isLessEqual()

```ts
isLessEqual(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isgreater" name="isgreater"></a>

<MemberCard>

##### BoxedExpression.isGreater()

```ts
isGreater(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isgreaterequal" name="isgreaterequal"></a>

<MemberCard>

##### BoxedExpression.isGreaterEqual()

```ts
isGreaterEqual(other): boolean
```

The numeric value of both expressions are compared.

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="isequal" name="isequal"></a>

<MemberCard>

##### BoxedExpression.isEqual()

```ts
isEqual(other): boolean
```

Mathematical equality (strong equality), that is the value
of this expression and the value of `other` are numerically equal.

Both expressions are evaluated and the result is compared numerically.

Numbers whose difference is less than `engine.tolerance` are
considered equal. This tolerance is set when the `engine.precision` is
changed to be such that the last two digits are ignored.

The evaluations may be expensive operations. Other options to consider
to compare two expressions include:
- `expr.isSame(other)` for a structural comparison
- `expr.is(other)` for a comparison of a number literal

## Examples

```js
let expr = ce.parse('2 + 2');
console.log(expr.isEqual(4)); // true
console.log(expr.isSame(ce.parse(4))); // false
console.log(expr.is(4)); // false

expr = ce.parse('4');
console.log(expr.isEqual(4)); // true
console.log(expr.isSame(ce.parse(4))); // true
console.log(expr.is(4)); // true (fastest)

```

###### other

`number` | [`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

#### String Expression

<a id="string" name="string"></a>

<MemberCard>

##### BoxedExpression.string

```ts
readonly string: string;
```

If this expression is a string, return the value of the string.
Otherwise, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

#### Symbol Expression

<a id="symbol" name="symbol"></a>

<MemberCard>

##### BoxedExpression.symbol

```ts
readonly symbol: string;
```

If this expression is a symbol, return the name of the symbol as a string.
Otherwise, return `null`.

:::info[Note]
Applicable to canonical and non-canonical expressions.
:::

</MemberCard>

<a id="tensor" name="tensor"></a>

<MemberCard>

##### BoxedExpression.tensor

```ts
readonly tensor: AbstractTensor<"expression">;
```

</MemberCard>

<a id="isvalid" name="isvalid"></a>

<MemberCard>

##### BoxedExpression.isValid

```ts
readonly isValid: boolean;
```

`true` if this expression or any of its subexpressions is an `["Error"]`
expression.

:::info[Note]
Applicable to canonical and non-canonical expressions. For
non-canonical expression, this may indicate a syntax error while parsing
LaTeX. For canonical expression, this may indicate argument type
mismatch, or missing or unexpected arguments.
:::

</MemberCard>

#### Type Properties

<a id="isnumber" name="isnumber"></a>

<MemberCard>

##### BoxedExpression.isNumber

```ts
readonly isNumber: boolean;
```

`true` if the value of this expression is a number.

Note that in a fateful twist of cosmic irony, `NaN` ("Not a Number")
**is** a number.

If `isNumber` is `true`, this indicates that evaluating the expression
will return a number.

This does not indicate that the expression is a number literal. To check
if the expression is a number literal, use `expr.isNumberLiteral`.

For example, the expression `["Add", 1, "x"]` is a number if "x" is a
number and `expr.isNumber` is `true`, but `isNumberLiteral` is `false`.

</MemberCard>

<a id="isinteger" name="isinteger"></a>

<MemberCard>

##### BoxedExpression.isInteger

```ts
readonly isInteger: boolean;
```

The value of this expression is an element of the set ℤ: ...,-2, -1, 0, 1, 2...

Note that ±∞ and NaN are not integers.

</MemberCard>

<a id="isrational" name="isrational"></a>

<MemberCard>

##### BoxedExpression.isRational

```ts
readonly isRational: boolean;
```

The value of this expression is an element of the set ℚ, p/q with p ∈ ℕ, q ∈ ℤ ⃰  q >= 1

Note that every integer is also a rational.

This is equivalent to `this.type === "rational" || this.type === "integer"`

Note that ±∞ and NaN are not rationals.

</MemberCard>

<a id="isreal" name="isreal"></a>

<MemberCard>

##### BoxedExpression.isReal

```ts
readonly isReal: boolean;
```

The value of this expression is a real number.

This is equivalent to `this.type === "rational" || this.type === "integer" || this.type === "real"`

Note that ±∞ and NaN are not real numbers.

</MemberCard>

<a id="semiboxedexpression" name="semiboxedexpression"></a>

### SemiBoxedExpression

```ts
type SemiBoxedExpression = 
  | number
  | bigint
  | string
  | BigNum
  | MathJsonNumber
  | MathJsonString
  | MathJsonSymbol
  | MathJsonFunction
  | readonly [MathJsonIdentifier, ...SemiBoxedExpression[]]
  | BoxedExpression;
```

A semi boxed expression is a MathJSON expression which can include some
boxed terms.

This is convenient when creating new expressions from portions
of an existing `BoxedExpression` while avoiding unboxing and reboxing.

<a id="boxedsubstitution" name="boxedsubstitution"></a>

### BoxedSubstitution

```ts
type BoxedSubstitution = Substitution<BoxedExpression>;
```

<a id="canonicalform" name="canonicalform"></a>

### CanonicalForm

```ts
type CanonicalForm = 
  | "InvisibleOperator"
  | "Number"
  | "Multiply"
  | "Add"
  | "Power"
  | "Divide"
  | "Flatten"
  | "Order";
```

When provided, canonical forms are used to put an expression in a
"standard" form.

Each canonical form applies some transformation to an expression. When
specified as an array, each transformation is done in the order in which
it was provided.

- `InvisibleOperator`: replace use of the `InvisibleOperator` with
   another operation, such as multiplication (i.e. `2x` or function
   application (`f(x)`).
- `Number`: replace all numeric values with their
   canonical representation, for example, reduce
   rationals and replace complex numbers with no imaginary part with a real number.
- `Multiply`: replace negation with multiplication by -1, remove 1 from multiplications, simplify signs (`-y \times -x` -> `x \times y`), complex numbers are promoted (['Multiply', 2, 'ImaginaryUnit'] -> `["Complex", 0, 2]`)
- `Add`: replace `Subtract` with `Add`, removes 0 in addition, promote complex numbers (["Add", "a", ["Complex", 0, "b"] -> `["Complex", "a", "b"]`)
- `Power`: simplify `Power` expression, for example, `x^{-1}` -> `\frac{1}{x}`, `x^0` -> `1`, `x^1` -> `x`, `1^x` -> `1`, `x^{\frac{1}{2}}` -> `\sqrt{x}`, `a^b^c` -> `a^{bc}`...
- `Divide`: replace with a `Rational` number if numerator and denominator are integers, simplify, e.g. `\frac{x}{1}` -> `x`...
- `Flatten`: remove any unnecessary `Delimiter` expression, and flatten any associative functions, for example `["Add", ["Add", "a", "b"], "c"]` -> `["Add", "a", "b", "c"]`
- `Order`: when applicable, sort the arguments in a specific order, for
   example for addition and multiplication.

<a id="evaluateoptions" name="evaluateoptions"></a>

### EvaluateOptions

```ts
type EvaluateOptions = object;
```

Options for `BoxedExpression.evaluate()`

#### Type declaration

<a id="numericapproximation"></a>

##### numericApproximation

<a id="numericapproximation" name="numericapproximation"></a>

<MemberCard>

##### EvaluateOptions.numericApproximation

```ts
numericApproximation: boolean;
```

</MemberCard>

<a id="signal"></a>

##### signal

<a id="signal" name="signal"></a>

<MemberCard>

##### EvaluateOptions.signal

```ts
signal: AbortSignal;
```

</MemberCard>

<a id="metadata" name="metadata"></a>

### Metadata

```ts
type Metadata = object;
```

Metadata that can be associated with a `BoxedExpression`

#### Type declaration

<a id="latex-1"></a>

##### latex?

<a id="latex-1" name="latex-1"></a>

<MemberCard>

##### Metadata.latex?

```ts
optional latex: string;
```

</MemberCard>

<a id="wikidata-2"></a>

##### wikidata?

<a id="wikidata-2" name="wikidata-2"></a>

<MemberCard>

##### Metadata.wikidata?

```ts
optional wikidata: string;
```

</MemberCard>

<a id="replaceoptions" name="replaceoptions"></a>

### ReplaceOptions

```ts
type ReplaceOptions = object;
```

#### Type declaration

<a id="recursive-1"></a>

##### recursive

<a id="recursive-1" name="recursive-1"></a>

<MemberCard>

##### ReplaceOptions.recursive

```ts
recursive: boolean;
```

If `true`, apply replacement rules to all sub-expressions.

If `false`, only consider the top-level expression.

**Default**: `false`

</MemberCard>

<a id="once"></a>

##### once

<a id="once" name="once"></a>

<MemberCard>

##### ReplaceOptions.once

```ts
once: boolean;
```

If `true`, stop after the first rule that matches.

If `false`, apply all the remaining rules even after the first match.

**Default**: `false`

</MemberCard>

<a id="usevariations-2"></a>

##### useVariations

<a id="usevariations-2" name="usevariations-2"></a>

<MemberCard>

##### ReplaceOptions.useVariations

```ts
useVariations: boolean;
```

If `true` the rule will use some equivalent variations to match.

For example when `useVariations` is true:
- `x` matches `a + x` with a = 0
- `x` matches `ax` with a = 1
- etc...

Setting this to `true` can save time by condensing multiple rules
into one. This can be particularly useful when describing equations
solutions. However, it can lead to infinite recursion and should be
used with caution.

</MemberCard>

<a id="iterationlimit"></a>

##### iterationLimit

<a id="iterationlimit" name="iterationlimit"></a>

<MemberCard>

##### ReplaceOptions.iterationLimit

```ts
iterationLimit: number;
```

If `iterationLimit` > 1, the rules will be repeatedly applied
until no rules apply, up to `maxIterations` times.

Note that if `once` is true, `iterationLimit` has no effect.

**Default**: `1`

</MemberCard>

<a id="canonical-1"></a>

##### canonical

<a id="canonical-1" name="canonical-1"></a>

<MemberCard>

##### ReplaceOptions.canonical

```ts
canonical: CanonicalOptions;
```

Indicate if the expression should be canonicalized after the replacement.
If not provided, the expression is canonicalized if the expression
that matched the pattern is canonical.

</MemberCard>

<a id="substitutiont" name="substitutiont"></a>

### Substitution\<T\>

```ts
type Substitution<T> = object;
```

A substitution describes the values of the wildcards in a pattern so that
the pattern is equal to a target expression.

A substitution can also be considered a more constrained version of a
rule whose `match` is always a symbol.

#### Type Parameters

• **T** = [`SemiBoxedExpression`](#semiboxedexpression)

#### Index Signature

```ts
[symbol: string]: T
```

## Pattern Matching

<a id="pattern" name="pattern"></a>

### Pattern

```ts
type Pattern = BoxedExpression;
```

#### No Inherit Doc

<a id="patternmatchoptions" name="patternmatchoptions"></a>

### PatternMatchOptions

```ts
type PatternMatchOptions = object;
```

Control how a pattern is matched to an expression.

- `substitution`: if present, assumes these values for the named wildcards,
   and ensure that subsequent occurrence of the same wildcard have the same
   value.
- `recursive`: if true, match recursively, otherwise match only the top
   level.
- `useVariations`: if false, only match expressions that are structurally identical.
   If true, match expressions that are structurally identical or equivalent.

   For example, when true, `["Add", '_a', 2]` matches `2`, with a value of
   `_a` of `0`. If false, the expression does not match. **Default**: `false`

#### Type declaration

<a id="substitution"></a>

##### substitution?

<a id="substitution" name="substitution"></a>

<MemberCard>

##### PatternMatchOptions.substitution?

```ts
optional substitution: BoxedSubstitution;
```

</MemberCard>

<a id="recursive"></a>

##### recursive?

<a id="recursive" name="recursive"></a>

<MemberCard>

##### PatternMatchOptions.recursive?

```ts
optional recursive: boolean;
```

</MemberCard>

<a id="usevariations-1"></a>

##### useVariations?

<a id="usevariations-1" name="usevariations-1"></a>

<MemberCard>

##### PatternMatchOptions.useVariations?

```ts
optional useVariations: boolean;
```

</MemberCard>

## Rules

<a id="rulereplacefunction" name="rulereplacefunction"></a>

### RuleReplaceFunction()

```ts
type RuleReplaceFunction = (expr, wildcards) => BoxedExpression | undefined;
```

Given an expression and set of wildcards, return a new expression.

For example:

```ts
{
   match: '_x',
   replace: (expr, {_x}) => { return ['Add', 1, _x] }
}
```

##### expr

[`BoxedExpression`](#boxedexpression)

##### wildcards

[`BoxedSubstitution`](#boxedsubstitution)

[`BoxedExpression`](#boxedexpression) \| `undefined`

<a id="ruleconditionfunction" name="ruleconditionfunction"></a>

### RuleConditionFunction()

```ts
type RuleConditionFunction = (wildcards, ce) => boolean;
```

##### wildcards

[`BoxedSubstitution`](#boxedsubstitution)

##### ce

`IComputeEngine`

`boolean`

<a id="rulefunction" name="rulefunction"></a>

### RuleFunction()

```ts
type RuleFunction = (expr) => 
  | undefined
  | BoxedExpression
  | RuleStep;
```

##### expr

[`BoxedExpression`](#boxedexpression)

  \| `undefined`
  \| [`BoxedExpression`](#boxedexpression)
  \| [`RuleStep`](#rulestep)

<a id="rule" name="rule"></a>

### Rule

```ts
type Rule = 
  | string
  | RuleFunction
  | {
  match:   | LatexString
     | SemiBoxedExpression
     | Pattern;
  replace:   | LatexString
     | SemiBoxedExpression
     | RuleReplaceFunction
     | RuleFunction;
  condition:   | LatexString
     | RuleConditionFunction;
  useVariations: boolean;
  id: string;
};
```

A rule describes how to modify an expressions that matches a pattern `match`
into a new expression `replace`.

- `x-1` \( \to \) `1-x`
- `(x+1)(x-1)` \( \to \) `x^2-1

The patterns can be expressed as LaTeX strings or a MathJSON expressions.

As a shortcut, a rule can be defined as a LaTeX string: `x-1 -> 1-x`.
The expression to the left of `->` is the `match` and the expression to the
right is the `replace`. When using LaTeX strings, single character variables
are assumed to be wildcards.

When using MathJSON expressions, anonymous wildcards (`_`) will match any
expression. Named wildcards (`_x`, `_a`, etc...) will match any expression
and bind the expression to the wildcard name.

In addition the sequence wildcard (`__1`, `__a`, etc...) will match
a sequence of one or more expressions, and bind the sequence to the
wildcard name.

Sequence wildcards are useful when the number of elements in the sequence
is not known in advance. For example, in a sum, the number of terms is
not known in advance. ["Add", 0, `__a`] will match two or more terms and
the `__a` wildcard will be a sequence of the matchign terms.

If `exact` is false, the rule will match variants.

For example 'x' will match 'a + x', 'x' will match 'ax', etc...

For simplification rules, you generally want `exact` to be true, but
to solve equations, you want it to be false. Default to true.

When set to false, infinite recursion is possible.

<a id="boxedrule" name="boxedrule"></a>

### BoxedRule

```ts
type BoxedRule = object;
```

If the `match` property is `undefined`, all expressions match this rule
and `condition` should also be `undefined`. The `replace` property should
be a `BoxedExpression` or a `RuleFunction`, and further filtering can be
done in the `replace` function.

#### Type declaration

<a id="match-1"></a>

##### match

<a id="match-1" name="match-1"></a>

<MemberCard>

##### BoxedRule.match

```ts
match: undefined | Pattern;
```

</MemberCard>

<a id="replace-1"></a>

##### replace

<a id="replace-1" name="replace-1"></a>

<MemberCard>

##### BoxedRule.replace

```ts
replace: 
  | BoxedExpression
  | RuleReplaceFunction
  | RuleFunction;
```

</MemberCard>

<a id="condition"></a>

##### condition

<a id="condition" name="condition"></a>

<MemberCard>

##### BoxedRule.condition

```ts
condition: 
  | undefined
  | RuleConditionFunction;
```

</MemberCard>

<a id="usevariations"></a>

##### useVariations?

<a id="usevariations" name="usevariations"></a>

<MemberCard>

##### BoxedRule.useVariations?

```ts
optional useVariations: boolean;
```

</MemberCard>

<a id="id"></a>

##### id?

<a id="id" name="id"></a>

<MemberCard>

##### BoxedRule.id?

```ts
optional id: string;
```

</MemberCard>

<a id="boxedruleset" name="boxedruleset"></a>

### BoxedRuleSet

```ts
type BoxedRuleSet = object;
```

To create a BoxedRuleSet use the `ce.rules()` method.

Do not create a `BoxedRuleSet` directly.

#### Type declaration

<a id="rules"></a>

##### rules

<a id="rules" name="rules"></a>

<MemberCard>

##### BoxedRuleSet.rules

```ts
rules: ReadonlyArray<BoxedRule>;
```

</MemberCard>

## Assumptions

<a id="assumeresult" name="assumeresult"></a>

### AssumeResult

```ts
type AssumeResult = 
  | "internal-error"
  | "not-a-predicate"
  | "contradiction"
  | "tautology"
  | "ok";
```

<a id="expressionmapinterfaceu" name="expressionmapinterfaceu"></a>

### ExpressionMapInterface\<U\>

#### Type Parameters

• **U**

<a id="has-1" name="has-1"></a>

<MemberCard>

##### ExpressionMapInterface.has()

```ts
has(expr): boolean
```

###### expr

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="get-1" name="get-1"></a>

<MemberCard>

##### ExpressionMapInterface.get()

```ts
get(expr): U
```

###### expr

[`BoxedExpression`](#boxedexpression)

`U`

</MemberCard>

<a id="set" name="set"></a>

<MemberCard>

##### ExpressionMapInterface.set()

```ts
set(expr, value): void
```

###### expr

[`BoxedExpression`](#boxedexpression)

###### value

`U`

`void`

</MemberCard>

<a id="delete" name="delete"></a>

<MemberCard>

##### ExpressionMapInterface.delete()

```ts
delete(expr): void
```

###### expr

[`BoxedExpression`](#boxedexpression)

`void`

</MemberCard>

<a id="clear" name="clear"></a>

<MemberCard>

##### ExpressionMapInterface.clear()

```ts
clear(): void
```

`void`

</MemberCard>

<a id="iterator" name="iterator"></a>

<MemberCard>

##### ExpressionMapInterface.\[iterator\]()

```ts
iterator: IterableIterator<[BoxedExpression, U]>
```

`IterableIterator`\<\[[`BoxedExpression`](#boxedexpression), `U`\]\>

</MemberCard>

<a id="entries" name="entries"></a>

<MemberCard>

##### ExpressionMapInterface.entries()

```ts
entries(): IterableIterator<[BoxedExpression, U]>
```

`IterableIterator`\<\[[`BoxedExpression`](#boxedexpression), `U`\]\>

</MemberCard>

## Compiling

<a id="compiledexpression" name="compiledexpression"></a>

### CompiledExpression

```ts
type CompiledExpression = object;
```

#### Type declaration

<a id="evaluate-1"></a>

##### evaluate()?

<a id="evaluate-1" name="evaluate-1"></a>

<MemberCard>

##### CompiledExpression.evaluate()?

```ts
optional evaluate: (scope) => number | BoxedExpression;
```

###### scope

`number` \| [`BoxedExpression`](#boxedexpression)

</MemberCard>

## Definitions

<a id="boxedbasedefinition" name="boxedbasedefinition"></a>

### BoxedBaseDefinition

#### Extended by

- [`BoxedSymbolDefinition`](#boxedsymboldefinition)

<a id="name" name="name"></a>

<MemberCard>

##### BoxedBaseDefinition.name

```ts
name: string;
```

</MemberCard>

<a id="wikidata-1" name="wikidata-1"></a>

<MemberCard>

##### BoxedBaseDefinition.wikidata?

```ts
optional wikidata: string;
```

</MemberCard>

<a id="description-1" name="description-1"></a>

<MemberCard>

##### BoxedBaseDefinition.description?

```ts
optional description: string | string[];
```

</MemberCard>

<a id="url-1" name="url-1"></a>

<MemberCard>

##### BoxedBaseDefinition.url?

```ts
optional url: string;
```

</MemberCard>

<a id="scope-1" name="scope-1"></a>

<MemberCard>

##### BoxedBaseDefinition.scope

```ts
scope: object;
```

The scope this definition belongs to.

This field is usually undefined, but its value is set by `getDefinition()`

<a id=""></a>

###### parentScope?

<MemberCard>

###### scope.parentScope?

```ts
optional parentScope: { parentScope?: ...; ids?: RuntimeIdentifierDefinitions; assumptions: ExpressionMapInterface<boolean>; };
```

</MemberCard>

<a id=""></a>

###### ids?

<MemberCard>

###### scope.ids?

```ts
optional ids: RuntimeIdentifierDefinitions;
```

</MemberCard>

<a id=""></a>

###### assumptions

<MemberCard>

###### scope.assumptions

```ts
assumptions: ExpressionMapInterface<boolean>;
```

</MemberCard>

</MemberCard>

<a id="collection" name="collection"></a>

<MemberCard>

##### BoxedBaseDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

If this is the definition of a collection, the set of primitive operations
that can be performed on this collection (counting the number of elements,
enumerating it, etc...).

</MemberCard>

<a id="reset" name="reset"></a>

<MemberCard>

##### BoxedBaseDefinition.reset()

```ts
reset(): void
```

When the environment changes, for example the numerical precision,
call `reset()` so that any cached values can be recalculated.

`void`

</MemberCard>

<a id="eqhandlers" name="eqhandlers"></a>

### EqHandlers

```ts
type EqHandlers = object;
```

These handlers compare two expressions.

If only one of the handlers is provided, the other is derived from it.

Having both may be useful if comparing non-equality is faster than equality.

#### Type declaration

<a id="eq-1"></a>

##### eq()

<a id="eq-1" name="eq-1"></a>

<MemberCard>

##### EqHandlers.eq()

```ts
eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

<a id="neq-1"></a>

##### neq()

<a id="neq-1" name="neq-1"></a>

<MemberCard>

##### EqHandlers.neq()

```ts
neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

<a id="collectionhandlers" name="collectionhandlers"></a>

### CollectionHandlers

```ts
type CollectionHandlers = object;
```

These handlers are the primitive operations that can be performed on
collections.

There are two types of collections:

- finite collections, such as lists, tuples, sets, matrices, etc...
 The `size()` handler of finite collections returns the number of elements

- infinite collections, such as sequences, ranges, etc...
 The `size()` handler of infinite collections returns `Infinity`
 Infinite collections are not indexable: they have no `at()` handler.

#### Type declaration

#### Definitions

<a id="iterator-1"></a>

###### iterator()

<a id="iterator-1" name="iterator-1"></a>

<MemberCard>

###### CollectionHandlers.iterator()

```ts
iterator: (collection, start?, count?) => Iterator<BoxedExpression, undefined>;
```

Return an iterator
- start is optional and is a 1-based index.
- if start is not specified, start from index 1
- count is optional and is the number of elements to return
- if count is not specified or negative, return all the elements from
  start to the end

If there is a `keys()` handler, there is no `iterator()` handler.

###### collection

[`BoxedExpression`](#boxedexpression)

###### start?

`number`

###### count?

`number`

`Iterator`\<[`BoxedExpression`](#boxedexpression), `undefined`\>

</MemberCard>

#### Other

<a id="size-1"></a>

###### size()

<a id="size-1" name="size-1"></a>

<MemberCard>

###### CollectionHandlers.size()

```ts
size: (collection) => number;
```

Return the number of elements in the collection.

An empty collection has a size of 0.

###### collection

[`BoxedExpression`](#boxedexpression)

`number`

</MemberCard>

<a id="contains-1"></a>

###### contains()

<a id="contains-1" name="contains-1"></a>

<MemberCard>

###### CollectionHandlers.contains()

```ts
contains: (collection, target) => boolean;
```

Return `true` if the target
expression is in the collection, `false` otherwise.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="at-1"></a>

###### at()

<a id="at-1" name="at-1"></a>

<MemberCard>

###### CollectionHandlers.at()

```ts
at: (collection, index) => undefined | BoxedExpression;
```

Return the element at the specified index.

The first element is `at(1)`, the last element is `at(-1)`.

If the index is &lt;0, return the element at index `size() + index + 1`.

The index can also be a string for example for maps. The set of valid keys
is returned by the `keys()` handler.

If the index is invalid, return `undefined`.

###### collection

[`BoxedExpression`](#boxedexpression)

###### index

`number` | `string`

`undefined` \| [`BoxedExpression`](#boxedexpression)

</MemberCard>

<a id="keys"></a>

###### keys()

<a id="keys" name="keys"></a>

<MemberCard>

###### CollectionHandlers.keys()

```ts
keys: (collection) => undefined | Iterable<string>;
```

If the collection can be indexed by strings, return the valid values
for the index.

###### collection

[`BoxedExpression`](#boxedexpression)

`undefined` \| `Iterable`\<`string`\>

</MemberCard>

<a id="indexof-1"></a>

###### indexOf()

<a id="indexof-1" name="indexof-1"></a>

<MemberCard>

###### CollectionHandlers.indexOf()

```ts
indexOf: (collection, target, from?) => number | undefined;
```

Return the index of the first element that matches the target expression.

The comparison is done using the `target.isEqual()` method.

If the expression is not found, return `undefined`.

If the expression is found, return the index, 1-based.

Return the index of the first match.

`from` is the starting index for the search. If negative, start from
the end  and search backwards.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

###### from?

`number`

`number` \| `undefined`

</MemberCard>

<a id="subsetof"></a>

###### subsetOf()

<a id="subsetof" name="subsetof"></a>

<MemberCard>

###### CollectionHandlers.subsetOf()

```ts
subsetOf: (collection, target, strict) => boolean;
```

Return `true` if all the elements of `target` are in `expr`.
Both `expr` and `target` are collections.
If strict is `true`, the subset must be strict, that is, `expr` must
have more elements than `target`.

###### collection

[`BoxedExpression`](#boxedexpression)

###### target

[`BoxedExpression`](#boxedexpression)

###### strict

`boolean`

`boolean`

</MemberCard>

<a id="eltsgn"></a>

###### eltsgn()

<a id="eltsgn" name="eltsgn"></a>

<MemberCard>

###### CollectionHandlers.eltsgn()

```ts
eltsgn: (collection) => Sign | undefined;
```

Return the sign of all the elements of the collection.

###### collection

[`BoxedExpression`](#boxedexpression)

[`Sign`](#sign) \| `undefined`

</MemberCard>

<a id="elttype"></a>

###### elttype()

<a id="elttype" name="elttype"></a>

<MemberCard>

###### CollectionHandlers.elttype()

```ts
elttype: (collection) => Type | undefined;
```

Return the widest type of all the elements in the collection

###### collection

[`BoxedExpression`](#boxedexpression)

`Type` \| `undefined`

</MemberCard>

<a id="functiondefinitionflags" name="functiondefinitionflags"></a>

### FunctionDefinitionFlags

```ts
type FunctionDefinitionFlags = object;
```

A function definition can have some flags to indicate specific
properties of the function.

#### Type declaration

<a id="lazy"></a>

##### lazy

<a id="lazy" name="lazy"></a>

<MemberCard>

##### FunctionDefinitionFlags.lazy

```ts
lazy: boolean;
```

If `true`, the arguments to this function are not automatically
evaluated. The default is `false` (the arguments are evaluated).

This can be useful for example for functions that take symbolic
expressions as arguments, such as `D` or `Integrate`.

This is also useful for functions that take an argument that is
potentially an infinite collection.

It will be up to the `evaluate()` handler to evaluate the arguments as
needed. This is conveninent to pass symbolic expressions as arguments
to functions without having to explicitly use a `Hold` expression.

This also applies to the `canonical()` handler.

</MemberCard>

<a id="threadable"></a>

##### threadable

<a id="threadable" name="threadable"></a>

<MemberCard>

##### FunctionDefinitionFlags.threadable

```ts
threadable: boolean;
```

If `true`, the function is applied element by element to lists, matrices
(`["List"]` or `["Tuple"]` expressions) and equations (relational
operators).

**Default**: `false`

</MemberCard>

<a id="associative"></a>

##### associative

<a id="associative" name="associative"></a>

<MemberCard>

##### FunctionDefinitionFlags.associative

```ts
associative: boolean;
```

If `true`, `["f", ["f", a], b]` simplifies to `["f", a, b]`

**Default**: `false`

</MemberCard>

<a id="commutative"></a>

##### commutative

<a id="commutative" name="commutative"></a>

<MemberCard>

##### FunctionDefinitionFlags.commutative

```ts
commutative: boolean;
```

If `true`, `["f", a, b]` equals `["f", b, a]`. The canonical
version of the function will order the arguments.

**Default**: `false`

</MemberCard>

<a id="commutativeorder"></a>

##### commutativeOrder

<a id="commutativeorder" name="commutativeorder"></a>

<MemberCard>

##### FunctionDefinitionFlags.commutativeOrder

```ts
commutativeOrder: (a, b) => number | undefined;
```

If `commutative` is `true`, the order of the arguments is determined by
this function.

If the function is not provided, the arguments are ordered by the
default order of the arguments.

</MemberCard>

<a id="idempotent"></a>

##### idempotent

<a id="idempotent" name="idempotent"></a>

<MemberCard>

##### FunctionDefinitionFlags.idempotent

```ts
idempotent: boolean;
```

If `true`, `["f", ["f", x]]` simplifies to `["f", x]`.

**Default**: `false`

</MemberCard>

<a id="involution"></a>

##### involution

<a id="involution" name="involution"></a>

<MemberCard>

##### FunctionDefinitionFlags.involution

```ts
involution: boolean;
```

If `true`, `["f", ["f", x]]` simplifies to `x`.

**Default**: `false`

</MemberCard>

<a id="pure"></a>

##### pure

<a id="pure" name="pure"></a>

<MemberCard>

##### FunctionDefinitionFlags.pure

```ts
pure: boolean;
```

If `true`, the value of this function is always the same for a given
set of arguments and it has no side effects.

An expression using this function is pure if the function and all its
arguments are pure.

For example `Sin` is pure, `Random` isn't.

This information may be used to cache the value of expressions.

**Default:** `true`

</MemberCard>

<a id="hold" name="hold"></a>

### Hold

```ts
type Hold = "none" | "all" | "first" | "rest" | "last" | "most";
```

<a id="boxedfunctiondefinition" name="boxedfunctiondefinition"></a>

### BoxedFunctionDefinition

```ts
type BoxedFunctionDefinition = BoxedBaseDefinition & FunctionDefinitionFlags & object;
```

#### Type declaration

##### complexity

<MemberCard>

##### BoxedFunctionDefinition.complexity

```ts
complexity: number;
```

</MemberCard>

##### inferredSignature

<MemberCard>

##### BoxedFunctionDefinition.inferredSignature

```ts
inferredSignature: boolean;
```

If true, the signature was inferred from usage and may be modified
as more information becomes available.

</MemberCard>

##### signature

<MemberCard>

##### BoxedFunctionDefinition.signature

```ts
signature: BoxedType;
```

The type of the arguments and return value of this function

</MemberCard>

##### type()?

<MemberCard>

##### BoxedFunctionDefinition.type()?

```ts
optional type: (ops, options) => Type | TypeString | BoxedType | undefined;
```

If present, this handler can be used to more precisely determine the
return type based on the type of the arguments. The arguments themselves
should *not* be evaluated, only their types should be used.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

`Type` \| `TypeString` \| `BoxedType` \| `undefined`

</MemberCard>

##### sgn()?

<MemberCard>

##### BoxedFunctionDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign | undefined;
```

If present, this handler can be used to determine the sign of the
 return value of the function, based on the sign and type of its
 arguments.

The arguments themselves should *not* be evaluated, only their types and
sign should be used.

This can be used in some case for example to determine when certain
simplifications are valid.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`Sign`](#sign) \| `undefined`

</MemberCard>

##### eq()?

<MemberCard>

##### BoxedFunctionDefinition.eq()?

```ts
optional eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### BoxedFunctionDefinition.neq()?

```ts
optional neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### canonical()?

<MemberCard>

##### BoxedFunctionDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression | null;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression) \| `null`

</MemberCard>

##### evaluate()?

<MemberCard>

##### BoxedFunctionDefinition.evaluate()?

```ts
optional evaluate: (ops, options) => BoxedExpression | undefined;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\> & `object`

[`BoxedExpression`](#boxedexpression) \| `undefined`

</MemberCard>

##### evaluateAsync()?

<MemberCard>

##### BoxedFunctionDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options?) => Promise<BoxedExpression | undefined>;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options?

`Partial`\<[`EvaluateOptions`](#evaluateoptions)\> & `object`

`Promise`\<[`BoxedExpression`](#boxedexpression) \| `undefined`\>

</MemberCard>

##### evalDimension()?

<MemberCard>

##### BoxedFunctionDefinition.evalDimension()?

```ts
optional evalDimension: (ops, options) => BoxedExpression;
```

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

##### compile()?

<MemberCard>

##### BoxedFunctionDefinition.compile()?

```ts
optional compile: (expr) => CompiledExpression;
```

###### expr

[`BoxedExpression`](#boxedexpression)

[`CompiledExpression`](#compiledexpression)

</MemberCard>

<a id="symbolattributes" name="symbolattributes"></a>

### SymbolAttributes

```ts
type SymbolAttributes = object;
```

#### Type declaration

<a id="constant"></a>

##### constant

<a id="constant" name="constant"></a>

<MemberCard>

##### SymbolAttributes.constant

```ts
constant: boolean;
```

If `true` the value of the symbol is constant. The value or type of
symbols with this attribute set to `true` cannot be changed.

If `false`, the symbol is a variable.

**Default**: `false`

</MemberCard>

<a id="holduntil"></a>

##### holdUntil

<a id="holduntil" name="holduntil"></a>

<MemberCard>

##### SymbolAttributes.holdUntil

```ts
holdUntil: "never" | "evaluate" | "N";
```

If the symbol has a value, it is held as indicated in the table below.
A green checkmark indicate that the symbol is substituted.

<div className="symbols-table">

| Operation     | `"never"` | `"evaluate"` | `"N"` |
| :---          | :-----:   | :----:      | :---:  |
| `canonical()` |    (X)    |              |       |
| `evaluate()`  |    (X)    |     (X)      |       |
| `"N()"`       |    (X)    |     (X)      |  (X)  |

</div>

Some examples:
- `ImaginaryUnit` has `holdUntil: 'never'`: it is substituted during canonicalization
- `x` has `holdUntil: 'evaluate'` (variables)
- `Pi` has `holdUntil: 'N'` (special numeric constant)

**Default:** `evaluate`

</MemberCard>

<a id="numericflags" name="numericflags"></a>

### NumericFlags

```ts
type NumericFlags = object;
```

When used in a `SymbolDefinition` or `Functiondefinition` these flags
provide additional information about the value of the symbol or function.

If provided, they will override the value derived from
the symbol's value.

#### Type declaration

<a id="sgn-1"></a>

##### sgn

<a id="sgn-1" name="sgn-1"></a>

<MemberCard>

##### NumericFlags.sgn

```ts
sgn: Sign | undefined;
```

</MemberCard>

<a id="even"></a>

##### even

<a id="even" name="even"></a>

<MemberCard>

##### NumericFlags.even

```ts
even: boolean | undefined;
```

</MemberCard>

<a id="odd"></a>

##### odd

<a id="odd" name="odd"></a>

<MemberCard>

##### NumericFlags.odd

```ts
odd: boolean | undefined;
```

</MemberCard>

<a id="boxedsymboldefinition" name="boxedsymboldefinition"></a>

### BoxedSymbolDefinition

#### Extends

- [`BoxedBaseDefinition`](#boxedbasedefinition).[`SymbolAttributes`](#symbolattributes).`Partial`\<[`NumericFlags`](#numericflags)\>

<a id="isfunction" name="isfunction"></a>

<MemberCard>

##### BoxedSymbolDefinition.isFunction

```ts
readonly isFunction: boolean;
```

</MemberCard>

<a id="isconstant-1" name="isconstant-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.isConstant

```ts
readonly isConstant: boolean;
```

</MemberCard>

<a id="eq" name="eq"></a>

<MemberCard>

##### BoxedSymbolDefinition.eq()?

```ts
optional eq: (a) => boolean;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="neq" name="neq"></a>

<MemberCard>

##### BoxedSymbolDefinition.neq()?

```ts
optional neq: (a) => boolean;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean`

</MemberCard>

<a id="cmp" name="cmp"></a>

<MemberCard>

##### BoxedSymbolDefinition.cmp()?

```ts
optional cmp: (a) => "<" | ">" | "=";
```

###### a

[`BoxedExpression`](#boxedexpression)

`"<"` \| `">"` \| `"="`

</MemberCard>

<a id="inferredtype" name="inferredtype"></a>

<MemberCard>

##### BoxedSymbolDefinition.inferredType

```ts
inferredType: boolean;
```

</MemberCard>

<a id="type-1" name="type-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.type

```ts
type: BoxedType;
```

</MemberCard>

<a id="value-1" name="value-1"></a>

<MemberCard>

##### BoxedSymbolDefinition.value

###### Get Signature

```ts
get value(): BoxedExpression
```

[`BoxedExpression`](#boxedexpression)

```ts
set value(val): void
```

###### Parameters

###### val

`number` | [`BoxedExpression`](#boxedexpression)

`void`

</MemberCard>

<a id="runtimeidentifierdefinitions" name="runtimeidentifierdefinitions"></a>

### RuntimeIdentifierDefinitions

```ts
type RuntimeIdentifierDefinitions = Map<string, OneOf<[BoxedSymbolDefinition, BoxedFunctionDefinition]>>;
```

The entries have been validated and optimized for faster evaluation.

When a new scope is created with `pushScope()` or when creating a new
engine instance, new instances of this type are created as needed.

<a id="symboldefinition-1" name="symboldefinition-1"></a>

### SymbolDefinition

```ts
type SymbolDefinition = BaseDefinition & Partial<SymbolAttributes> & object;
```

A bound symbol (i.e. one with an associated definition) has either a type
(e.g. ∀ x ∈ ℝ), a value (x = 5) or both (π: value = 3.14... type = 'real')

#### Type declaration

##### type?

<MemberCard>

##### SymbolDefinition.type?

```ts
optional type: Type | TypeString;
```

</MemberCard>

##### inferred?

<MemberCard>

##### SymbolDefinition.inferred?

```ts
optional inferred: boolean;
```

If true, the type is inferred, and could be adjusted later
as more information becomes available or if the symbol is explicitly
declared.

</MemberCard>

##### value?

<MemberCard>

##### SymbolDefinition.value?

```ts
optional value: 
  | LatexString
  | SemiBoxedExpression
  | (ce) => BoxedExpression | null;
```

`value` can be a JS function since for some constants, such as
`Pi`, the actual value depends on the `precision` setting of the
`ComputeEngine` and possible other environment settings

</MemberCard>

##### flags?

<MemberCard>

##### SymbolDefinition.flags?

```ts
optional flags: Partial<NumericFlags>;
```

</MemberCard>

##### eq()?

<MemberCard>

##### SymbolDefinition.eq()?

```ts
optional eq: (a) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### SymbolDefinition.neq()?

```ts
optional neq: (a) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### cmp()?

<MemberCard>

##### SymbolDefinition.cmp()?

```ts
optional cmp: (a) => "=" | ">" | "<" | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

`"="` \| `">"` \| `"<"` \| `undefined`

</MemberCard>

##### collection?

<MemberCard>

##### SymbolDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

</MemberCard>

<a id="functiondefinition-1" name="functiondefinition-1"></a>

### FunctionDefinition

```ts
type FunctionDefinition = BaseDefinition & Partial<FunctionDefinitionFlags> & object;
```

Definition record for a function.

#### Type declaration

##### signature?

<MemberCard>

##### FunctionDefinition.signature?

```ts
optional signature: Type | TypeString;
```

The function signature.

If a `type` handler is provided, the return type of the function should
be a subtype of the return type in the signature.

</MemberCard>

##### type()?

<MemberCard>

##### FunctionDefinition.type()?

```ts
optional type: (ops, options) => Type | TypeString | BoxedType | undefined;
```

The actual type of the result based on the arguments.

Should be a subtype of the type indicated in the signature.

Do not evaluate the arguments.

The type of the arguments can be used to determine the type of the
result.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

`Type` \| `TypeString` \| `BoxedType` \| `undefined`

</MemberCard>

##### sgn()?

<MemberCard>

##### FunctionDefinition.sgn()?

```ts
optional sgn: (ops, options) => Sign | undefined;
```

Return the sign of the function expression.

If the sign cannot be determined, return `undefined`.

When determining the sign, only literal values and the values of
symbols, if they are literals, should be considered.

Do not evaluate the arguments.

The type and sign of the arguments can be used to determine the sign.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`Sign`](#sign) \| `undefined`

</MemberCard>

##### even()?

<MemberCard>

##### FunctionDefinition.even()?

```ts
optional even: (ops, options) => boolean | undefined;
```

Return true of the function expression is even, false if it is odd and
undefined if it is neither.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

`boolean` \| `undefined`

</MemberCard>

##### complexity?

<MemberCard>

##### FunctionDefinition.complexity?

```ts
optional complexity: number;
```

A number used to order arguments.

Argument with higher complexity are placed after arguments with
lower complexity when ordered canonically in commutative functions.

- Additive functions: 1000-1999
- Multiplicative functions: 2000-2999
- Root and power functions: 3000-3999
- Log functions: 4000-4999
- Trigonometric functions: 5000-5999
- Hypertrigonometric functions: 6000-6999
- Special functions (factorial, Gamma, ...): 7000-7999
- Collections: 8000-8999
- Inert and styling:  9000-9999
- Logic: 10000-10999
- Relational: 11000-11999

**Default**: 100,000

</MemberCard>

##### canonical()?

<MemberCard>

##### FunctionDefinition.canonical()?

```ts
optional canonical: (ops, options) => BoxedExpression | null;
```

Return the canonical form of the expression with the arguments `args`.

The arguments (`args`) may not be in canonical form. If necessary, they
can be put in canonical form.

This handler should validate the type and number of the arguments.

If a required argument is missing, it should be indicated with a
`["Error", "'missing"]` expression. If more arguments than expected
are present, this should be indicated with an
["Error", "'unexpected-argument'"]` error expression

If the type of an argument is not compatible, it should be indicated
with an `incompatible-type` error.

`["Sequence"]` expressions are not folded and need to be handled
 explicitly.

If the function is associative, idempotent or an involution,
this handler should account for it. Notably, if it is commutative, the
arguments should be sorted in canonical order.

Values of symbols should not be substituted, unless they have
a `holdUntil` attribute of `"never"`.

The handler should not consider the value or any assumptions about any
of the arguments that are symbols or functions (i.e. `arg.isZero`,
`arg.isInteger`, etc...) since those may change over time.

The result of the handler should be a canonical expression.

If the arguments do not match, they should be replaced with an appropriate
`["Error"]` expression. If the expression cannot be put in canonical form,
the handler should return `null`.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

###### engine

`IComputeEngine`

[`BoxedExpression`](#boxedexpression) \| `null`

</MemberCard>

##### evaluate?

<MemberCard>

##### FunctionDefinition.evaluate?

```ts
optional evaluate: 
  | (ops, options) => BoxedExpression | undefined
  | BoxedExpression;
```

Evaluate a function expression.

The arguments have been evaluated, except the arguments to which a
`hold` applied.

It is not necessary to further simplify or evaluate the arguments.

If performing numerical calculations and `options.numericalApproximation`
is `false` return an exact numeric value, for example return a rational
number or a square root, rather than a floating point approximation.
Use `ce.number()` to create the numeric value.

When `numericalApproximation` is `false`, return a floating point number:
- do not reduce rational numbers to decimal (floating point approximation)
- do not reduce square roots of rational numbers

If the expression cannot be evaluated, due to the values, types, or
assumptions about its arguments, for example, return `undefined` or
an `["Error"]` expression.

</MemberCard>

##### evaluateAsync()?

<MemberCard>

##### FunctionDefinition.evaluateAsync()?

```ts
optional evaluateAsync: (ops, options) => Promise<BoxedExpression | undefined>;
```

An option asynchronous version of `evaluate`.

###### ops

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

[`EvaluateOptions`](#evaluateoptions) & `object`

`Promise`\<[`BoxedExpression`](#boxedexpression) \| `undefined`\>

</MemberCard>

##### evalDimension()?

<MemberCard>

##### FunctionDefinition.evalDimension()?

```ts
optional evalDimension: (args, options) => BoxedExpression;
```

**`Experimental`**

Dimensional analysis

###### args

`ReadonlyArray`\<[`BoxedExpression`](#boxedexpression)\>

###### options

[`EvaluateOptions`](#evaluateoptions) & `object`

[`BoxedExpression`](#boxedexpression)

</MemberCard>

##### compile()?

<MemberCard>

##### FunctionDefinition.compile()?

```ts
optional compile: (expr) => CompiledExpression;
```

Return a compiled (optimized) expression.

###### expr

[`BoxedExpression`](#boxedexpression)

[`CompiledExpression`](#compiledexpression)

</MemberCard>

##### eq()?

<MemberCard>

##### FunctionDefinition.eq()?

```ts
optional eq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### neq()?

<MemberCard>

##### FunctionDefinition.neq()?

```ts
optional neq: (a, b) => boolean | undefined;
```

###### a

[`BoxedExpression`](#boxedexpression)

###### b

[`BoxedExpression`](#boxedexpression)

`boolean` \| `undefined`

</MemberCard>

##### collection?

<MemberCard>

##### FunctionDefinition.collection?

```ts
optional collection: Partial<CollectionHandlers>;
```

</MemberCard>

<a id="basedefinition-1" name="basedefinition-1"></a>

### BaseDefinition

```ts
type BaseDefinition = object;
```

#### Type declaration

<a id="description-2"></a>

##### description?

<a id="description-2" name="description-2"></a>

<MemberCard>

##### BaseDefinition.description?

```ts
optional description: string | string[];
```

A short (about 1 line) description. May contain Markdown.

</MemberCard>

<a id="url-2"></a>

##### url?

<a id="url-2" name="url-2"></a>

<MemberCard>

##### BaseDefinition.url?

```ts
optional url: string;
```

A URL pointing to more information about this symbol or operator.

</MemberCard>

<a id="wikidata-3"></a>

##### wikidata?

<a id="wikidata-3" name="wikidata-3"></a>

<MemberCard>

##### BaseDefinition.wikidata?

```ts
optional wikidata: string;
```

A short string representing an entry in a wikibase.

For example `Q167` is the [wikidata entry](https://www.wikidata.org/wiki/Q167)
for the `Pi` constant.

</MemberCard>

<a id="identifierdefinition" name="identifierdefinition"></a>

### IdentifierDefinition

```ts
type IdentifierDefinition = OneOf<[SymbolDefinition, FunctionDefinition, SemiBoxedExpression]>;
```

A table mapping identifiers to their definition.

Identifiers should be valid MathJSON identifiers. In addition, the
following rules are recommended:

- Use only latin letters, digits and `-`: `/[a-zA-Z0-9-]+/`
- The first character should be a letter: `/^[a-zA-Z]/`
- Functions and symbols exported from a library should start with an uppercase letter `/^[A-Z]/`

<a id="identifierdefinitions" name="identifierdefinitions"></a>

### IdentifierDefinitions

```ts
type IdentifierDefinitions = Readonly<{}>;
```

## Latex Parsing and Serialization

<a id="latexstring" name="latexstring"></a>

### LatexString

```ts
type LatexString = string;
```

A LaTeX string starts and end with `$`, for example
`"$\frac{\pi}{2}$"`.

## Other

<a id="sign" name="sign"></a>

### Sign

```ts
type Sign = 
  | "zero"
  | "positive"
  | "negative"
  | "non-negative"
  | "non-positive"
  | "not-zero"
  | "real-not-zero"
  | "real"
  | "nan"
  | "positive-infinity"
  | "negative-infinity"
  | "complex-infinity"
  | "unsigned";
```

:::info[THEORY OF OPERATIONS]

To create a boxed expression:

### `ce.box()` and `ce.parse()`

Use `ce.box()` or `ce.parse()` to get a canonical expression.
   - the arguments are put in canonical form
   - invisible operators are made explicit
   - a limited number of core simplifications are applied,
     for example 0 is removed from additions
   - sequences are flattened: `["Add", 1, ["Sequence", 2, 3]]` is
     transformed to `["Add", 1, 2, 3]`
   - associative functions are flattened: `["Add", 1, ["Add", 2, 3]]` is
     transformed to `["Add", 1, 2, 3]`
   - the arguments of commutative functions are sorted
   - identifiers are **not** replaced with their values

### Algebraic methods (expr.add(), expr.mul(), etc...)

The boxed expression have some algebraic methods,
i.e. `add`, `mul`, `div`, `pow`, etc. These methods are suitable for
internal calculations, although they may be used as part of the public
API as well.

   - the operation is performed on the canonical version of the expression

   - the arguments are not evaluated

   - the canonical handler (of the corresponding operation) is not called

   - some additional simplifications over canonicalization are applied.
     For example number literals are combined.
     However, the result is exact, and no approximation is made. Use `.N()`
     to get an approximate value.
     This is equivalent to calling `simplify()` on the expression (but
     without simplifying the arguments).

   - sequences were already flattened as part of the canonicalization process

  For 'add' and 'mul', which take multiple arguments, separate functions
  are provided that take an array of arguments. They are equivalent
  to calling the boxed algebraic method, i.e. `ce.Zero.add(1, 2, 3)` and
  `add(1, 2, 3)` are equivalent.

These methods are not equivalent to calling `expr.evaluate()` on the
expression: evaluate will replace identifiers with their values, and
evaluate the expression

### `ce._fn()`

Use `ce._fn()` to create a new function expression.

This is a low level method which is typically invoked in the canonical
handler of a function definition.

The arguments are not modified. The expression is not put in canonical
form. The canonical handler is *not* called.

A canonical flag can be set when calling the function, but it only
asserts that the function and its arguments are canonical. The caller
is responsible for ensuring that is the case.

### `ce.function()`

This is a specialized version of `ce.box()`. It is used to create a new
function expression.

The arguments are put in canonical form and the canonical handler is called.

For algebraic functions (add, mul, etc..), use the corresponding
canonicalization function, i.e. `canonicalAdd(a, b)` instead of
`ce.function('Add', a, b)`.

Another option is to use the algebraic methods directly, i.e. `a.add(b)`
instead of `ce.function('Add', a, b)`. However, the algebraic methods will
apply further simplifications which may or may not be desirable. For
example, number literals will be combined.

### Canonical Handlers

Canonical handlers are responsible for:
   - validating the signature (type and number of arguments)
   - flattening sequences
   - flattening associative functions
   - sort the arguments (if the function is commutative)
   - calling `ce._fn()` to create a new function expression
   - if the function definition has a hold, they should also put
     their arguments in canonical form, if appropriate

When the canonical handler is invoked, the arguments have been put in
canonical form according to the `hold` flag.

Some canonical handlers are available as separate functions and can be
used directly, for example `canonicalAdd(a, b)` instead of
`ce.function('Add', [a, b])`.

:::

<a id="isrulestep" name="isrulestep"></a>

<MemberCard>

### isRuleStep()

```ts
function isRuleStep(x): x is RuleStep
```

##### x

`any`

`x is RuleStep`

</MemberCard>

<a id="isboxedrule" name="isboxedrule"></a>

<MemberCard>

### isBoxedRule()

```ts
function isBoxedRule(x): x is BoxedRule
```

##### x

`any`

`x is BoxedRule`

</MemberCard>

<a id="rulestep" name="rulestep"></a>

### RuleStep

```ts
type RuleStep = object;
```

#### Type declaration

<a id="value-2"></a>

##### value

<a id="value-2" name="value-2"></a>

<MemberCard>

##### RuleStep.value

```ts
value: BoxedExpression;
```

</MemberCard>

<a id="because"></a>

##### because

<a id="because" name="because"></a>

<MemberCard>

##### RuleStep.because

```ts
because: string;
```

</MemberCard>

<a id="rulesteps" name="rulesteps"></a>

### RuleSteps

```ts
type RuleSteps = RuleStep[];
```

<a id="canonicaloptions" name="canonicaloptions"></a>

### CanonicalOptions

```ts
type CanonicalOptions = 
  | boolean
  | CanonicalForm
  | CanonicalForm[];
```
