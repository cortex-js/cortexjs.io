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

<ReadMore path="/compute-engine/reference/arithmetic/" > Read more about
<strong>Polynomial Arithmetic</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Using Assumptions

Assumptions are additional information available about some symbols, for example
\\( x > 0 \\) or \\(n \in \N\\).

Some transformations are only applicable if some assumptions can be verified.

For example, if no assumptions about \\(x \\) is available the expression \\(
\sqrt\{x^2\} \\) cannot be simplified. However, if an assumption that \\( x \geq 0
\\) is available, then the expression can be simplified to \\( x \\).

<ReadMore path="/compute-engine/guides/assumptions/" > Read more about
<strong>Assumptions</strong> <Icon name="chevron-right-bold" /></ReadMore>

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
