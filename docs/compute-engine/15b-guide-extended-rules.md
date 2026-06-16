---
title: Extended Rules — The Identities Library
slug: /compute-engine/guides/identities/
---

The **Identities Library** is an optional add-on that teaches the Compute
Engine over 1,300 mathematical facts: special values and identities for the
gamma function, the Riemann zeta function, inverse trigonometric functions,
the Lambert W function, Jacobi theta functions, modular functions, and many
other special functions.

It is an opt-in module: if you don't import it, it adds **zero bytes** to your
bundle and has no effect on the engine.

```js
import { ComputeEngine } from "@cortex-js/compute-engine";
import { loadIdentities } from "@cortex-js/compute-engine/identities";

const ce = new ComputeEngine();
loadIdentities(ce);

console.log(ce.parse("\\zeta(2)").simplify().latex);
// ➔ "\frac{\pi^2}{6}"

console.log(ce.parse("\\arctan(2-\\sqrt{3})").simplify().latex);
// ➔ "\frac{\pi}{12}"
```

The rules are derived from [Fungrim](https://fungrim.org), the Mathematical
Functions Grimoire by Fredrik Johansson (MIT license). Every rule carries the
identifier of its source entry — for example a simplification justified by
rule `fungrim:d4b0b6` can be looked up at `fungrim.org/entry/d4b0b6` for its
precise statement, conditions, and references.

## What's Included

- **Specific values** — exact closed forms such as \\(\Gamma(\tfrac12) =
  \sqrt\{\pi\}\\), \\(\zeta(2) = \tfrac\{\pi^2\}\{6\}\\), \\(\operatorname\{W\}(e) = 1\\),
  values of \\(\arctan\\), \\(\operatorname\{sinc\}\\), the digamma function, and
  theta constants.
- **Identities** — rewrite rules such as \\(n \cdot (n-1)! \to n!\\),
  \\(\gcd(F_n, F_\{n+1\}) \to 1\\), \\(\sin(\pi n + \tfrac\{\pi\}\{2\}) \to (-1)^n\\),
  \\(\operatorname\{W\}(x e^x) \to x\\), argument transformations for theta and
  modular functions, and more.
- **Symbol definitions** for special functions the engine does not define
  natively (Jacobi theta, Carlson elliptic integrals, the Hurwitz zeta
  function, the arithmetic–geometric mean, and others), so expressions using
  them parse, canonicalize, and serialize correctly.

## Identity Reference

The [Fungrim Identities reference](/compute-engine/reference/fungrim/) lists
every identity and its validity conditions, organized by topic:

| | |
| --- | --- |
| [Elementary functions](/compute-engine/reference/fungrim-elementary/) | [Complex numbers](/compute-engine/reference/fungrim-complex/) |
| [Gamma and related functions](/compute-engine/reference/fungrim-gamma/) | [Orthogonal polynomials](/compute-engine/reference/fungrim-orthogonal-polynomials/) |
| [Bessel and hypergeometric functions](/compute-engine/reference/fungrim-bessel-hypergeometric/) | [Elliptic integrals](/compute-engine/reference/fungrim-elliptic-integrals/) |
| [Modular forms and theta functions](/compute-engine/reference/fungrim-modular-theta/) | [Zeta and L-functions](/compute-engine/reference/fungrim-zeta/) |
| [Number theory](/compute-engine/reference/fungrim-number-theory/) | [Combinatorial and integer sequences](/compute-engine/reference/fungrim-sequences/) |

## Guarded Rules and Assumptions

Many identities are only valid under conditions: an exponent must be an
integer, an argument must be positive, a parameter must lie in the upper
half-plane. The library enforces these conditions **fail-closed**: a rule only
fires when the engine can *prove* its condition from the declared types and
your assumptions. If a condition cannot be decided, the expression is left
unchanged.

```live
const ce = MathfieldElement.computeEngine;

// Without any assumption, nothing happens:
console.log(ce.parse("\\sin(\\pi t + \\frac{\\pi}{2})").simplify().latex);
// ➔ "\sin(\pi t + \frac{\pi}{2})"

// Declare that n is a positive integer...
ce.declare("n", "integer");
ce.assume(ce.parse("n > 0"));

// ...and the parity identity applies:
console.log(ce.parse("\\sin(\\pi n + \\frac{\\pi}{2})").simplify().latex);
// ➔ "(-1)^n"
```

Conditions over the complex domain work with the assumptions system as well
(see <a href="/compute-engine/guides/assumptions/">Assumptions</a>). For
example, identities for theta and modular functions require their parameter
to be in the upper half-plane — that is, `Im(τ) > 0`:

```js
ce.assume(ce.expr(["Greater", ["Imaginary", "tau"], 0])); // τ in the upper half-plane

// Jacobi's identity: θ₂(0,τ)⁴ + θ₄(0,τ)⁴ = θ₃(0,τ)⁴
ce.expr(["Add",
  ["Power", ["JacobiTheta", 2, 0, "tau"], 4],
  ["Power", ["JacobiTheta", 4, 0, "tau"], 4],
]).simplify();
// ➔ JacobiTheta(3, 0, tau)^4
```

## Simplification vs Transformation

Rules whose right-hand side is *simpler* than their left-hand side are applied
by `expr.simplify()`. Some true identities go the other way — they rewrite an
expression into a *larger* but more explicit closed form, such as
\\(\operatorname\{ln\} i \to \tfrac\{i\pi\}\{2\}\\) or the closed form of a Carlson
integral. These are loaded with a `purpose` of `"expand"` and are deliberately
**not** used by `simplify()`. To apply them, use `expr.replace()` with the
full rule set:

```js
const expr = ce.expr(["CarlsonRF", 0, 1, 2]);
expr.replace(ce.rules(ce.simplificationRules), { recursive: true });
// ➔ Gamma(1/4)² / (4 · sqrt(2π))
```

## Selective Loading and the Load Report

`loadIdentities()` accepts options to load a subset, and returns a report:

```js
const report = loadIdentities(ce, {
  topics: ["gamma", "riemann_zeta", "log"], // only these corpus topics
  classes: ["specific-value"],              // and only value rules
});

console.log(report.loaded);       // number of rules registered
console.log(report.declared);     // special-function symbols declared
console.log(report.skipped);      // anything that could not be loaded, with reasons
```

For debugging rules that don't seem to apply, the `onGuardUndecided` hook
reports when a rule matched structurally but its condition could not be
decided from the current assumptions:

```js
loadIdentities(ce, {
  onGuardUndecided: (ruleId, wildcards) =>
    console.log(`${ruleId} did not fire: condition undecided`),
});
```

## Solve Templates

The library also ships a small set of **solve templates** — derived from the
inverse-function identities in the corpus (`f(g(x)) = x`) — that extend
`expr.solve()` to transcendental equations the built-in solver does not
handle. They are **off by default** and enabled with `{ solve: true }`:

```js
const ce = new ComputeEngine();
loadIdentities(ce, { solve: true });

// x·eˣ = 3  →  x = W(3)  (Lambert W)
ce.parse("x e^x = 3").solve("x");
// ➔ [LambertW(3)]   (≈ 1.0499)

// arctan(x) = c  →  x = tan(c)
ce.parse("\\arctan(x) = 0.5").solve("x");
// ➔ [tan(0.5)]   (≈ 0.5463)
```

The templates are **safe by construction**: `solve()` validates every
candidate root against the original equation, so a template that does not
truly apply contributes nothing — it never produces a wrong answer. Because of
this, the templates carry no domain guards; they return a principal root and
defer general solution families (`x = arctan(c) + πn`). They route to
`ce.solveRules`, leaving `simplify()` unchanged.

## Performance

Loading the full library is a one-time per-engine cost and registers the rules
behind an **operator-indexed (per-head) dispatcher**: a rule is only considered
when the expression's operator matches the rule's `operators` hint. Because of
this, the impact on `simplify()` for expressions that don't involve special
functions is small — roughly **1.3× the unloaded baseline** (typically a
10–30% overhead, depending on the expression mix), rather than scaling with the
1,300+ rules loaded. Loading is per-engine and idempotent: calling
`loadIdentities()` twice does not duplicate rules.

Call `loadIdentities()` early — before declaring your own symbols — so the
library's symbol declarations (e.g. `JacobiTheta`) do not conflict with
yours. If you have already declared a symbol, the library skips it and
reports it in `report.skipped`.

## Attribution

The mathematical content is derived from
[Fungrim, the Mathematical Functions Grimoire](https://fungrim.org), © 2019
Fredrik Johansson, used under the MIT license. Rule identifiers
(`fungrim:xxxxxx`) refer to the corresponding Fungrim entries, which include
formal statements, validity conditions, and literature references.
