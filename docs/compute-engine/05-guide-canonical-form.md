---
title: Canonical Form
slug: /compute-engine/guides/canonical-form/
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
toc: true
render_math_in_document: true
---

<Intro>
Many mathematical objects can be represented by several equivalent expressions.
A **canonical form** is a unique representation of an object that is chosen as the
standard representation.
</Intro>

For example, the expressions in each row below represent the same mathematical
object:

<div className="equal-width-columns">

|              |                              |                         |
| :----------: | :--------------------------: | :---------------------: |
| \\(215.3465\\) | \\(2.15346\operatorname\{e\}2\\) | \\(2.15346 \times 10^2\\) |
|  \\(1 - x\\)   |          \\(-x + 1\\)          |      \\(1 + (-x)\\)       |
| \\(-2x^\{-1\}\\) |       \\(-\frac\{2\}\{x\}\\)       |    \\(\frac\{-2\}\{x\}\\)     |

</div>

The Compute Engine stores expressions internally in a canonical form to make
it easier to work with symbolic expressions.

The canonical form is intended to be “stable”, that is it does not depend on 
the values of non-constant symbols or on assumptions about a symbol or 
expression.

The type of symbols *can* be used during canonicalization of expressions 
referencing the symbol, as the type can only be narrowed later and thus would 
not change the result of the canonicalization. The value of variables 
(non-constant symbols) is never used during canonicalization as 
it could be changed later.

```js
ce.assign("x", -2);
console.info(ce.parse("\\frac{10}{x}").json);
// ➔ ["Rational", 10, "x"]
// and not `["Rational", -10, ["Negate", "x"]]` or `5`
```

Future versions of the Compute Engine could have different canonical forms, 
however a given version of the Compute Engine will always produce the same
canonical form for a given expression, given the same type information about 
symbols and the same dictionary.

**To check if an expression is canonical** use `expr.isCanonical`.

**To obtain the canonical representation of a non-canonical expression**, use
the `expr.canonical` property.

If the expression is already canonical, `expr.canonical` immediately returns
`expr`.

The return value of `expr.simplify()`, `expr.evaluate()` and `expr.N()` are 
canonical expressions.

The `ce.box()` and `ce.parse()` functions return a canonical expression by
default, which is the desirable behavior in most cases.

**To get a non-canonical version of an expression** use
of `ce.parse(s, {canonical: false})` or `ce.box(expr, {canonical: false})`.

You can further customize the canonical form of an expression by using the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function 
or by specifying the form you want to use. See [below](#custom-canonical-form) for more details.

The non-canonical version will be closer to the literal LaTeX input, which may
be desirable to compare a "raw" user input with an expected answer.

```js
console.info(ce.parse('\\frac{30}{-50}').json);
// ➔ ["Rational", -3, 5]
// The canonical version moves the sign to the numerator 
// and reduces the numerator and denominator

console.info(ce.parse('\\frac{30}{-50}', { canonical: false }).json);
// ➔ ["Divide", 30, -50]
// The non-canonical version does not change the arguments,
// so this is interpreted as a regular fraction ("Divide"), 
// not as a rational number.
```

The value of `expr.json` (the plain JSON representation of an expression) may 
not be in canonical form: some "sugaring" is applied to the internal 
representation before being returned, for example `["Power", "x", 2]` is
returned as `["Square", "x"]`.

**To customize how an expression is serialized to plain JSON** use
`expr.toMathJson()`.

```js
const expr = ce.parse("\\frac{3}{5}");
console.log(expr.toMathJson());
// ➔ ["Rational", 3, 5]

console.log(expr.expr.toMathJson({ exclude: ["Rational"] }));
// ➔ ["Divide", 3, 5]
// We have excluded `["Rational"]` expressions, so it 
// is interepreted as a division instead.
```


```js
const expr = ce.parse("\\frac{10}{30}", { canonical: false });
console.log(expr.json);
// ➔ ["Divide", 10, 30]

console.log(expr.isCanonical);
// ➔ false

console.log(expr.canonical.json);
// ➔ ["Rational", 1, 3]
```

## Canonical Form and Validity

The canonical form of an expression may not be **valid**. A canonical expression
may include `["Error"]` expressions, for example, indicating missing arguments,
excess arguments, or arguments of the wrong type.

For example the canonical form of `["Ln"]` is `["Ln", ["Error", "'missing'"]]`
and it is not a valid expression.

**To check if an expression is valid** use `expr.isValid`.

**To get a list of errors in an expression** use `expr.errors`.

```js
const expr = ce.parse("Ln");
console.log(expr.json);
// ➔ ["Ln", ["Error", "'missing'"]]
// The canonical form of `Ln` is not valid

console.log(expr.isCanonical);
// ➔ true

console.log(expr.isValid);
// ➔ false

console.log(expr.errors);
// ➔ [["Error", "'missing'"]]
```

## Canonical Form Transformations

The canonical form used by the Compute Engine follows common conventions. 
However, it is not always "the simplest" way to represent an expression.

Calculating the canonical form of an expression involves applying some 
rewriting rules to an expression to put sums, products, numbers, roots, 
etc... in canonical form. In that sense, it is similar to simplifying an 
expression with `expr.simplify()`, but it is more conservative in the 
transformations it applies.

Below is a list of some of the transformations applied to obtain the canonical
form:

- **Literal Numbers**
  - Rationals are reduced, e.g. \\( \frac{6}{4} \to \frac{3}{2}\\)
  - The denominator of rationals is made positive, e.g. \\(\frac{5}{-11}
    \to \frac{-5}{11}\\)
  - A rational with a denominator of 1 is replaced with the numerator, e.g.
    \\(\frac{19}{1} \to 19\\)
  - Complex numbers with no imaginary component are replaced with the real component
- `Add`
  - Literal 0 is removed
  - Sum of a literal and the product of a literal with the imaginary unit are
    replaced with a complex number.
  - Associativity is applied
  - Arguments are sorted
- `Multiply`
  - Literal 1 is removed
  - Product of a literal and the imaginary unit are replaced with a complex
    number.
  - Literal -1 multiplied by an expression is replaced with the negation of the
    expression.
  - Signs are simplified: (-x)(-y) -> xy
  - Associativity is applied
  - Arguments are sorted
- `Negate`
  - Literal numbers are negated
  - Negate of a negation is removed
- `Power`
  - \\(x^n)^m \to x^\{nm\}\\)
  - \\(x^\{\tilde\infty\} \to \operatorname\{NaN\}\\)
  - \\(x^0 \to 1\\)
  - \\(x^1 \to x\\)
  - \\((\pm 1)^\{-1\} \to -1\\)
  - \\((\pm\infty)^\{-1\} \to 0\\)
  - \\(0^\{\infty\} \to \tilde\infty\\)
  - \\((\pm 1)^\{\pm \infty\} \to \operatorname\{NaN\}\\)
  - \\(\infty^\{\infty\} \to \infty\\)
  - \\(\infty^\{-\infty\} \to 0\\)
  - \\((-\infty)^\{\pm \infty\} \to \operatorname\{NaN\}\\)
- `Square`: `["Power", "x", 2]` \\(\to\\) `["Square", "x"]`
- `Sqrt`: `["Sqrt", "x"]` \\(\to\\)`["Power", "x", "Half"]`
- `Root`:  `["Root", "x", 3]` \\(\to\\) `["Power", "x", ["Rational", 1, 3]]`
- `Subtract`
  - Replaced with addition, e.g. `["Subtract", "a", "b"]` \\(\to\\) `["Add", ["Negate", "b"], "a"]`
- Other functions:
  - Simplified if idempotent: \\( f(f(x)) \to f(x) \\)
  - Simplified if an involution: \\( f(f(x)) \to x \\)
  - Simplified if associative: \\( f(a, f(b, c)) \to f(a, b, c) \\)


## Custom Canonical Forms

The full canonical form of an expression is not always the most convenient
representation for a given application. For example, if you want to check
the answers from a quiz, you may want to compare the user input with a
canonical form that is closer to the user input.

**To get the non-canonical form**, use `ce.box(expr, { canonical: false })` or
`ce.parse(s, { canonical: false })`.

```live
console.log(ce.parse("2(0+x\\times x-1)", {canonical: false}).json);
```

**To get the full canonical form**, use `ce.box(expr, { canonical: true })` or
`ce.parse(s, { canonical: true })`. The `canonical` option can be omitted
as it is `true` by default.

```live
console.log(ce.parse("2(0+x\\times x-1)", {canonical: true}).json);

console.log(ce.parse("2(0+x\\times x-1)").json);
```

**To get a custom canonical form of an expression**, use the
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) function 
or specify the form you want to use with the `canonical` option of `ce.box()` 
and `ce.parse()`.



**To order the arguments in a canonical order**, use `ce.box(expr, { canonical: "Order" })` or `ce.parse(s, { canonical: "Order" })`.

```live
ce.parse("0+1+x+2+\\sqrt{5}", 
  {canonical: "Order"}
).print();
```

Note in particular that the `0` is preserved in the expression, which is not
the case in the full canonical form.

There are other forms that can be used to customize the canonical form of an
expression. See the documentation of
[`["CanonicalForm"]`](/compute-engine/reference/core/#CanonicalForm) for more details.

For example:

```live
const latex = "3(2+x)";
ce.parse(latex, {canonical: false}).print();

ce.parse(latex, {canonical: ["InvisibleOperator"]}).print();

ce.parse(latex, 
  {canonical: ["InvisibleOperator", "Add", "Order", ]}
).print();
```

