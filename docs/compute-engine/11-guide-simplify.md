---
title: Simplify
slug: /compute-engine/guides/simplify/
---

<Intro>
A complicated mathematical expression can often be transformed into a form that
is easier to understand.
</Intro>

The `expr.simplify()` function tries expanding, factoring and applying many
other transformations to find a simpler form of a symbolic expression.

Before the transformation rules are applied, the expression is put into a
canonical form.

When a function is simplified, its arguments are simplified as well, unless the
argument is "held". Which arguments are held is specified by the `hold` property
of the function definition. In addition, any argument wrapped with a `Hold`
function will be held, that is, not simplified. Conversely, a held argument
wrapped with a `ReleaseHold` function will not be held, and it will be
simplified.

## Defining "Simpler"

An expression may be represented by several equivalent forms.

For example \\( (x + 4)(x-5) \\) and \\(x^2 -x -20\\) represent the same
expression.

Determining which is "the simplest" depends on how the complexity is measured.

By default, the complexity of an expression is measured by counting the number
of operations in the expression, and giving an increasing cost to:

- integers with fewer digits
- integers with more digits
- other numeric values
- add, multiply, divide
- subtract and negate
- square root and root
- exp
- power and log
- trigonometric function
- inverse trigonometric function
- hyperbolic functions
- inverse hyperbolic functions
- other functions

**To influence how the complexity of an expression is measured**, set the
`costFunction` property of the compute engine to a function assigning a cost to
an expression.

## Numeric Simplifications

The `expr.simplify()` function will apply some numeric simplifications, such as
combining small integer and rational values, simplifying division by 1, addition
or subtraction of 0, etc...

It avoids making any simplification that could result in a loss of precision.

For example, \\( 10^{300} + 1\\) cannot be simplified without losing the least
significant digit, so `expr.simplify()` will return the expression unmodified.

## Polynomial Simplifications

For univariate rational expressions (fractions with polynomials in a single
variable), `simplify()` automatically cancels common factors in the numerator
and denominator.

For example:
- $ \frac{x^2 - 1}{x - 1} $ simplifies to $ x + 1 $
- $ \frac{x^3 - x}{x^2 - 1} $ simplifies to $ x $
- $ \frac{x + 1}{x^2 + 3x + 2} $ simplifies to $ \frac{1}{x + 2} $

For more control over polynomial operations, or for multivariate expressions,
use the explicit `Cancel`, `PolynomialGCD`, `PolynomialQuotient`, and
`PolynomialRemainder` functions.

### Automatic Factoring in Square Roots

When simplifying square root expressions, the engine automatically attempts to
factor the argument to enable further simplification. This handles cases where
the argument is an expanded perfect square.

For example:
- $ \sqrt{x^2 + 2x + 1} $ simplifies to $ |x + 1| $ (recognizes perfect square trinomial)
- $ \sqrt{4x^2 + 12x + 9} $ simplifies to $ |2x + 3| $
- $ \sqrt{a^2 + 2ab + b^2} $ simplifies to $ |a + b| $
- $ \sqrt{a^2 - 2ab + b^2} $ simplifies to $ |a - b| $

```javascript
ce.parse('\\sqrt{x^2 + 2x + 1}').simplify().latex;
// ➔ "|x+1|"

ce.parse('\\sqrt{4x^2 + 12x + 9}').simplify().latex;
// ➔ "|2x+3|"
```

This automatic factoring only occurs within `sqrt()` expressions during
simplification. For explicit factoring of polynomials, use the `Factor` function.

### Explicit Factoring and Expansion

For more control over polynomial form, use `Factor` and `Expand`:

```javascript
// Factor a polynomial
ce.parse('x^2 + 5x + 6').factor().latex;
// ➔ "(x+2)(x+3)"

ce.parse('x^2 - 4').factor().latex;
// ➔ "(x-2)(x+2)"

// Expand a product
ce.parse('(x+1)(x+2)').expand().latex;
// ➔ "x^2+3x+2"
```

The `Factor` function currently supports:
- **Perfect square trinomials**: $ a^2 \pm 2ab + b^2 \to (a \pm b)^2 $
- **Difference of squares**: $ a^2 - b^2 \to (a-b)(a+b) $
- **Quadratics with rational roots**: $ x^2 + bx + c $ when roots are rational

<ReadMore path="/compute-engine/reference/arithmetic/" > Read more about
<strong>Polynomial Arithmetic</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Using Assumptions

Assumptions are additional information available about some symbols, for example
\\( x > 0 \\) or \\(n \in \N\\).

Some transformations are only applicable if some assumptions can be verified.

For example, if no assumptions about \\(x \\) is available the expression \\(
\sqrt\{x^2\} \\) cannot be simplified. However, if an assumption that \\( x \geq 0
\\) is available, then the expression can be simplified to \\( x \\).

### Sign-Dependent Simplifications

When assumptions about the sign of a variable are available, several
simplifications become possible:

```javascript
// Without assumptions, sqrt(x^2) = |x|
ce.parse('\\sqrt{x^2}').simplify().latex;
// ➔ "|x|"

// With positive assumption
ce.assume(ce.parse('x > 0'));
ce.parse('\\sqrt{x^2}').simplify().latex;
// ➔ "x"

ce.parse('|x|').simplify().latex;
// ➔ "x"
```

```javascript
// With negative assumption
ce.assume(ce.parse('y < 0'));
ce.parse('\\sqrt{y^2}').simplify().latex;
// ➔ "-y"

ce.parse('|y|').simplify().latex;
// ➔ "-y"
```

<ReadMore path="/compute-engine/guides/assumptions/" > Read more about
<strong>Assumptions</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Nested Root Simplification

Nested roots are automatically simplified to a single root with the product
of the indices:

| Expression | Simplified |
|:-----------|:-----------|
| `sqrt(sqrt(x))` | `root(4)(x)` |
| `root(sqrt(x), n)` | `root(2n)(x)` |
| `sqrt(root(x, n))` | `root(2n)(x)` |
| `root(root(x, m), n)` | `root(m·n)(x)` |

```javascript
ce.box(['Sqrt', ['Sqrt', 'x']]).simplify().latex;
// ➔ "\\sqrt[4]{x}"

ce.box(['Root', ['Root', 'x', 3], 2]).simplify().latex;
// ➔ "\\sqrt[6]{x}"

ce.box(['Sqrt', ['Root', 'x', 3]]).simplify().latex;
// ➔ "\\sqrt[6]{x}"
```

## Trigonometric Simplification

Trigonometric expressions can be simplified using the Fu algorithm, a systematic
approach based on the paper "Automated and readable simplification of
trigonometric expressions" by Fu, Zhong, and Zeng (2006).

The Fu algorithm applies a series of transformation rules (TR) organized into
rule lists (RL) that are optimized for different types of expressions:

- **RL1**: For expressions containing `tan` and `cot`
- **RL2**: For expressions containing `sin` and `cos`

Each rule applies specific identities:
- **Reciprocal forms**: `sec(x)` → `1/cos(x)`, `csc(x)` → `1/sin(x)`
- **Ratio forms**: `tan(x)` → `sin(x)/cos(x)`
- **Pythagorean identities**: `sin²(x) + cos²(x)` → `1`
- **Double angle**: `2sin(x)cos(x)` → `sin(2x)`
- **Product-to-sum**: `sin(x)cos(y)` → `½[sin(x+y) + sin(x-y)]`
- **Sum-to-product**: `sin(x) + sin(y)` → `2sin((x+y)/2)cos((x-y)/2)`
- **Morrie's law**: `cos(x)cos(2x)cos(4x)` → `sin(8x)/(8sin(x))`

### Using the Fu Algorithm

There are two ways to apply trigonometric simplification:

**Option 1: Strategy option with `simplify()`**

```javascript
const expr = ce.parse("\\sin^2(x) + \\cos^2(x)");
const simplified = expr.simplify({ strategy: 'fu' });
// Returns: 1
```

**Option 2: Dedicated `trigSimplify()` method**

```javascript
const expr = ce.parse("2\\sin(x)\\cos(x)");
const simplified = expr.trigSimplify();
// Returns: sin(2x)
```

### Examples

| Expression | Simplified |
|:-----------|:-----------|
| `sin²(x) + cos²(x)` | `1` |
| `tan(x)·cot(x)` | `1` |
| `2sin(x)cos(x)` | `sin(2x)` |
| `sin(x)⁴ - cos(x)⁴` | `-cos(2x)` |
| `cos(x)cos(2x)cos(4x)` | `sin(8x)/(8sin(x))` |

<ReadMore path="/compute-engine/reference/trigonometry/" > Read more about
<strong>Trigonometric Functions</strong> <Icon name="chevron-right-bold" /></ReadMore>
