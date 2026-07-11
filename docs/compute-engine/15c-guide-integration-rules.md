---
title: Extended Rules — Symbolic Integration
slug: /compute-engine/guides/integration-rules/
---

The **Integration Rules** library is an optional add-on that extends the
Compute Engine's symbolic integration with a large rule set ported from
[Rubi](https://rulebasedintegration.org/), the Rule-Based Integration project.
It currently covers **Chapter 1 — algebraic functions** (rational functions,
radicals, and binomial forms $(a + b x^n)^p$), some 2,600 rules.

It is an opt-in module: if you don't import it, it adds **zero bytes** to your
bundle and the engine's integration behavior is unchanged.

```js
import { ComputeEngine } from "@cortex-js/compute-engine";
import { loadIntegrationRules } from "@cortex-js/compute-engine/integration-rules";

const ce = new ComputeEngine();
loadIntegrationRules(ce);

console.log(ce.parse("\\int \\frac{1}{\\sqrt{x}(1+x)}\\,dx").evaluate().latex);
// ➔ "2\arctan(\sqrt{x})"
```

Without the library, the same integral is returned unevaluated. The built-in
antiderivative handles many common integrands on its own; the rule set
broadens coverage to the harder algebraic cases.

## What's Included

The rules close algebraic integrands that the built-in antiderivative leaves
unevaluated, including ones with **symbolic parameters**:

```js
ce.parse("\\int \\frac{x^2}{\\sqrt{a+b x^3}}\\,dx").evaluate().latex;
// ➔ "\frac{2\sqrt{bx^3+a}}{3b}"

ce.parse("\\int \\frac{\\sqrt{1+x}}{x}\\,dx").evaluate().latex;
// ➔ "2\sqrt{x+1}-2\mathrm{artanh}(\sqrt{x+1})"
```

The current corpus is Rubi's **Chapter 1** (algebraic functions): polynomial
and rational integrands, integrands involving $\sqrt{a+bx}$ and other
radicals, and binomial/trinomial powers. Transcendental and special-function
chapters are not yet ported.

## How It Works

`loadIntegrationRules(ce)` registers the rule set as the engine's symbolic
**integration provider**. When you evaluate an `Integrate` expression, the
provider is **consulted first**; if it cannot close the integrand (it returns
an unevaluated integral) the engine **falls back** to its built-in
antiderivative. With no provider registered — the default — behavior is
exactly as before.

This applies to both indefinite and definite integrals, since a definite
integral is evaluated from its antiderivative.

```js
ce.parse("\\int_0^1 \\frac{x^2}{\\sqrt{1+x^3}}\\,dx").evaluate();
```

## Step-by-Step Explanations

With the rules loaded, `expr.explain('Integrate')` traces the integration
as textbook steps — term-by-term splits, constant factors moved out, and
each corpus rule application — each step a whole-expression state with a
stable machine id and an English description:

```js
const expr = ce.parse("\\int x\\sqrt{1+x}\\,dx");
for (const step of expr.explain("Integrate").steps)
  console.log(step.value.latex, "—", step.description);
// ➔ \int\!\sqrt{x+1}^{3}-\sqrt{x+1}\,\mathrm{d}x — Apply integration rule 1.1.1.2#19 (Rubi)
// ➔ … — Integrate term by term: ∫(u+v) dx = ∫u dx + ∫v dx
// ➔ … — Move the constant factor out of the integral
// ➔ \frac{1}{5}(2\sqrt{x+1}^{5})-\frac{1}{3}(2\sqrt{x+1}^{3}) — Apply integration rule 1.1.1.1#17 (Rubi)
```

The explanation's `result` is the same value evaluating the integral
returns. A definite integral is presented via the Fundamental Theorem of
Calculus (antiderivative, then the bracket $F\big|_a^b$ and the bounds).
Without the rules loaded, or when the rules cannot close the integral,
`explain('Integrate')` throws a precise error.

<ReadMore path="/compute-engine/guides/simplify/" > See
<strong>Step-by-Step Explanations</strong> in the Simplify guide for the
full <code>Explanation</code> API <Icon name="chevron-right-bold" /></ReadMore>

## Options and the Load Report

`loadIntegrationRules()` returns a report and accepts a per-integral time
budget:

```js
const report = loadIntegrationRules(ce, {
  timeLimitMs: 10000, // per-Integrate wall-clock budget (default 10000)
});

console.log(report.ruleCount); // number of compiled rules registered (~2600)
console.log(report.skipped);   // corpus rules skipped at compile time
```

The `timeLimitMs` budget bounds each `Integrate` call, so a pathological
integrand cannot hang the engine — if the rule driver exceeds the budget it
yields and the built-in antiderivative is used instead.

## Performance

Compiling the rule set costs roughly 300ms on the first call; the compiled
rules are cached per engine, so `loadIntegrationRules()` is **idempotent** —
calling it again re-registers the provider without recompiling and does not
duplicate rules. The library only participates in `Integrate`; it has no effect
on `simplify()`, `evaluate()` of non-integral expressions, or parsing.

## Attribution

The rules are derived from [Rubi](https://rulebasedintegration.org/), the
Rule-Based Integration project created by Albert D. Rich, used under the MIT
license (© 2018 Rule-based Integration Organization). The corpus is ported
from Rubi release 4.17.3.0.
