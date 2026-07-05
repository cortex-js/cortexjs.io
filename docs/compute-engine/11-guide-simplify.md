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

## Parse + Simplify Free Function

For the common "parse then simplify" flow, use the `simplify()` free function:

```live
// import { simplify } from '@cortex-js/compute-engine';
console.log(simplify("x+x+1"));
```

The `simplify()` free function accepts either a LaTeX string or a
`Expression`. It uses a shared `ComputeEngine` instance created on
first call.

For trigonometric simplification, use `expr.simplify({ strategy: 'fu' })`
on a parsed expression.

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

To check if an expression is a polynomial and extract its coefficients, use
`polynomialCoefficients()`:

```javascript
const coeffs = ce.parse('x^3 + 2x + 1').polynomialCoefficients('x');
// ➔ [1, 0, 2, 1]  (descending order: x³, x², x, constant)

// Check if an expression is a polynomial
ce.parse('sin(x)').polynomialCoefficients('x');
// ➔ undefined (not a polynomial)
```

To find the roots of a polynomial, use `polynomialRoots()`:

```javascript
ce.parse('x^2 - 5x + 6').polynomialRoots('x');
// ➔ [2, 3]

ce.parse('x^3 - 6x^2 + 11x - 6').polynomialRoots('x');
// ➔ [1, 2, 3]
```

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
parse('\\sqrt{x^2 + 2x + 1}').simplify().latex;
// ➔ "|x+1|"

parse('\\sqrt{4x^2 + 12x + 9}').simplify().latex;
// ➔ "|2x+3|"
```

This automatic factoring only occurs within `sqrt()` expressions during
simplification. For explicit factoring of polynomials, use the `Factor` function.

### Explicit Factoring and Expansion

For more control over polynomial form, use `Factor` and `Expand`:

```javascript
// Factor a polynomial
factor('x^2 + 5x + 6').latex;
// ➔ "(x+2)(x+3)"

factor('x^2 - 4').latex;
// ➔ "(x-2)(x+2)"

// Expand a product
expand('(x+1)(x+2)').latex;
// ➔ "x^2+3x+2"
```

The `Factor` function currently supports:
- **Perfect square trinomials**: $ a^2 \pm 2ab + b^2 \to (a \pm b)^2 $
- **Difference of squares**: $ a^2 - b^2 \to (a-b)(a+b) $
- **Quadratics with rational roots**: $ x^2 + bx + c $ when roots are rational
- **Degree 3+ with rational roots**: Uses the Rational Root Theorem (e.g., $ x^3 - 6x^2 + 11x - 6 \to (x-1)(x-2)(x-3) $)
- **Content extraction**: Extracts GCD of integer coefficients first (e.g., $ 6x^2 + 12x + 6 \to 6(x+1)^2 $)

### Partial Fraction Decomposition

For decomposing rational expressions into simpler fractions, use `PartialFraction`:

```javascript
evaluate('\\operatorname{PartialFraction}(\\frac{1}{(x+1)(x+2)}, x)').latex;
// ➔ "\\frac{1}{x+1} - \\frac{1}{x+2}"

evaluate('\\operatorname{PartialFraction}(\\frac{3x+5}{(x+1)^2}, x)').latex;
// ➔ "\\frac{3}{x+1} + \\frac{2}{(x+1)^2}"
```

This supports distinct and repeated linear factors, irreducible quadratic factors, and improper fractions (polynomial division is performed first). `Apart` is available as an alias for `PartialFraction`.

When a `Divide` expression has a denominator already in factored form (a product or power), `simplify()` automatically applies partial fraction decomposition if the result is simpler. This means `\frac{1}{(x+1)(x+2)}` is automatically simplified without needing to call `PartialFraction` explicitly.

<ReadMore path="/compute-engine/reference/arithmetic/" > Read more about
<strong>Polynomial Arithmetic</strong> <Icon name="chevron-right-bold" /></ReadMore>

## Using Assumptions

Assumptions are additional information available about some symbols, for example
\\( x > 0 \\) or \\(n \in \N\\).

Some transformations are only applicable if some assumptions can be verified.

For example, if no assumptions about \\(x\\) is available the expression \\(\sqrt\{x^2\}\\) cannot be simplified. However, if an assumption that \\(x \geq 0\\) is available, then the expression can be simplified to \\(x\\).

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
box(['Sqrt', ['Sqrt', 'x']]).simplify().latex;
// ➔ "\\sqrt[4]{x}"

box(['Root', ['Root', 'x', 3], 2]).simplify().latex;
// ➔ "\\sqrt[6]{x}"

box(['Sqrt', ['Root', 'x', 3]]).simplify().latex;
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
const expr = parse("\\sin^2(x) + \\cos^2(x)");
const simplified = expr.simplify({ strategy: 'fu' });
// Returns: 1
```

**Option 2: Dedicated `trigSimplify()` method**

```javascript
const expr = parse("2\\sin(x)\\cos(x)");
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

## Step-by-Step Explanations

The `expr.explain()` function returns the same result as `expr.simplify()`,
together with the chain of steps that produced it — the textbook presentation
*expression → step (with a reason) → … → result*.

```javascript
const expr = ce.parse("\\frac{x^2-1}{x-1}");
const explanation = expr.explain();

console.log(explanation.initial.latex);
// ➔ "\frac{x^2-1}{x-1}"

for (const step of explanation.steps)
  console.log(step.value.latex, "—", step.description);
// ➔ "x+1 — Cancel the common factors"

console.log(explanation.result.latex);
// ➔ "x+1"
```

An `Explanation` has four properties:

- `operation`: the operation that was traced (`'simplify'`, `'solve'` or
  `'D'`)
- `initial`: the **canonical form** of the expression `explain()` was called
  on — the chain's step 0. Canonicalization (e.g. `x - 1` becoming
  `Add(x, -1)`, or `2 + 3` folding to `5`) happens before the first step is
  recorded and is not traced.
- `steps`: the chain of steps. Each step has the expression `value` after the
  step was applied, a stable machine `id` identifying the rule that fired,
  and a default English `description`.
- `result`: the same value `simplify()` returns

**Explaining is free of side effects and does not change results:** the
explanation runs the same code as `simplify()`, so `explanation.result` is
always the same value `expr.simplify()` returns.

### Explaining an Equation Solution

`expr.explain('solve')` traces `expr.solve()` for a univariate equation (an
expression `f` is read as the equation `f = 0`). The unknown is inferred, or
passed explicitly with `options.variable`. Step values are **equations** —
the state of the equation after each phase — so the chain reads like
textbook working, including candidate roots and the rejection of extraneous
candidates:

```javascript
const expr = ce.parse("\\sqrt{x+1} = x - 1");
for (const step of expr.explain('solve').steps)
  console.log(step.value.latex, "—", step.description);
// ➔ -x+\sqrt{x+1}+1=0 — Move all terms to one side
// ➔ -x^2+3x=0        — Square both sides to eliminate the radical
// ➔ [x=0, x=3]       — Apply the quadratic formula
// ➔ x=0              — Check each candidate in the original equation; reject the extraneous ones
// ➔ x=3              — The solutions
```

`explanation.result` is a `List` of the same roots `solve()` returns. A
case-split (an absolute value, a zero product) is rendered as one step whose
value lists the sub-equations. Systems of equations are not supported yet.

### Explaining a Derivative

`expr.explain('D')` traces the differentiation of the expression. Steps are
whole-expression states in traversal order — each textbook rule first
appears with its unresolved sub-derivatives as inert `D(…)` terms, which
then resolve one by one:

```javascript
const expr = ce.parse("x \\sin x");
for (const step of expr.explain('D').steps)
  console.log(step.value.latex, "—", step.description);
// ➔ x\,\frac{\mathrm{d}}{\mathrm{d}x}\sin x+\sin x — Apply the product rule: (u·v)′ = u′·v + u·v′
// ➔ x\cos x+\sin x — Differentiate using a known derivative
```

The variable of differentiation is inferred when the expression has exactly
one unknown; otherwise pass it with `options.variable`. The `result`
matches evaluating `D(expr, variable)`. When the unfolded textbook form
differs from the engine's simplified result, the chain closes with a
*Simplify the result* step.

### Step Ids and Localization

The `id` of a step is a frozen, machine-readable identifier (e.g.
`'cancel common polynomial factors'`, `'x^n * x^m -> x^{n+m}'`,
`'fungrim:0010f3'`). The engine ships English descriptions only; to localize
or customize the copy, key your strings off `step.id` and use the
`description` as a fallback.

### Verbosity

By default the step chain is curated: internal bookkeeping steps (such as
the marker recorded when sub-expressions are simplified in place) are
filtered out. Pass `verbosity: 'all'` to get the raw, uncurated trace —
useful for debugging and for rule authors:

```javascript
expr.explain('simplify', { verbosity: 'all' });
```

The options of `simplify()` (`rules`, `costFunction`, `strategy`) are also
accepted and honored, so `expr.explain('simplify', options).result` matches
`expr.simplify(options)` for any options.
