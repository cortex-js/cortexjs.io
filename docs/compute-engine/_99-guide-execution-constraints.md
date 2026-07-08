---
title: Execution Constraints
slug: /compute-engine/guides/execution-constraints/
date: Last Modified
---

# Execution Constraints

Some innocuous-looking expressions can take a very long time — or forever —
to evaluate: a sum over a huge range, a number-theory function applied to a
large integer, a limit that fails to converge, or a loop that never
terminates.

To keep evaluation responsive, the Compute Engine enforces two execution
constraints:

<div className="symbols-table">

| Property | Default | Description |
| :--- | :--- | :--- |
| `ce.timeLimit` | 2 000 ms | Maximum duration of a single evaluation |
| `ce.iterationLimit` | 1 024 | Maximum number of iterations of a loop (`Loop`, `Comprehension`, `While`, `FixedPoint`) |

</div>

## Time Limit

The time limit applies to a top-level call to `evaluate()`, `N()` or
`simplify()`, including all the sub-evaluations it triggers. When the limit
is exceeded, a `CancellationError` is thrown.

```js
import { ComputeEngine, CancellationError } from "@cortex-js/compute-engine";

const ce = new ComputeEngine();
ce.timeLimit = 500; // ½ second

try {
  ce.expr(["Totient", 1e12]).evaluate();
} catch (err) {
  if (err instanceof CancellationError) {
    console.log("Evaluation took too long:", err.cause); // ➔ "timeout"
  }
}
```

The time limit is respected by, among others:

- iteration over collections, including infinite or very large lazy
  collections (`Filter`, `Select`, `CountIf`, `Position`, `GroupBy`, set
  operations…)
- big operators: `Sum`, `Product`, `Reduce`
- number-theoretic functions: `Factorial`, `Totient`, `Sigma0`, `Sigma1`,
  `IsPerfect`, `Eulerian`, `Stirling`, `NPartition`…
- numerical evaluation of limits (`Limit`, `NLimit`) and of slowly
  converging series

**Numerical integration is special.** Monte Carlo integration
(`NIntegrate`, or `N()` on an `Integrate` expression) does not throw when
it runs out of time. Instead it returns the estimate computed from the
samples taken so far, with a correspondingly larger error bound: a partial
estimate is more useful than no answer.

To allow a longer (or shorter) evaluation, set `ce.timeLimit` before
evaluating. Setting a very large value effectively disables the limit.

After a timeout the engine remains fully usable: the deadline is reset and
subsequent evaluations are unaffected.

## Iteration Limit

The iteration limit bounds the number of iterations of the looping control
structures `Loop`, `Comprehension`, `While` and `FixedPoint`. When the limit
is exceeded, a `CancellationError` with cause `"iteration-limit-exceeded"` is
thrown.

```js
ce.iterationLimit = 10_000;

// A loop over a billion elements: aborts after 10,000 iterations
ce.expr(["Loop", ["Add", "i", 1], ["Element", "i", ["Range", 1, 1e9]]]).evaluate();
// ➔ throws CancellationError, cause: "iteration-limit-exceeded"
```

Setting `ce.iterationLimit` to `0` or a negative value disables the limit
(the time limit still applies).

## Asynchronous Evaluation

For long-running computations, `evaluateAsync()` evaluates without blocking
the event loop, and accepts an `AbortSignal` to cancel an evaluation in
progress:

```js
const controller = new AbortController();

// Cancel the evaluation if it is still running after one second
setTimeout(() => controller.abort("user-canceled"), 1000);

try {
  const result = await expr.evaluateAsync({ signal: controller.signal });
  console.log(result.toString());
} catch (err) {
  if (err instanceof CancellationError) console.log("Canceled:", err.cause);
}
```

The time limit applies to asynchronous evaluations as well.
