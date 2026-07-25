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

To keep evaluation responsive, the Compute Engine offers two kinds of
bounds: a **time budget**, expressed as a span, and **iteration/recursion
budgets**, expressed as counts.

## Time Budgets: Spans

A time budget is a **span**: a region of code you run with an explicit
deadline. Everything evaluated inside the span shares one deadline; when it is
exceeded, the evaluation in progress throws a `CancellationError` with
`cause: "timeout"`.

```js
import { ComputeEngine, CancellationError } from "@cortex-js/compute-engine";

const ce = new ComputeEngine();

try {
  ce.withTimeLimit({ ms: 500, label: "my-app:eval" }, () =>
    ce.parse("\\sum_{i=1}^{100000000} \\sqrt{i}").evaluate()
  );
} catch (err) {
  if (err instanceof CancellationError && err.cause === "timeout")
    console.log("Evaluation exceeded its time budget");
}
```

`withTimeLimit(limit, fn)` runs `fn` and returns its value. The `limit` is
either a number of milliseconds, or an object `{ ms, label }`. The object form
is preferred for new code: the `label` reads before the callback, and it is
what lets you attribute a timeout later (see below).

The contract is **at most** `ms` milliseconds:

> Runs `fn` with **at most** `ms` milliseconds. A tighter deadline may already
> be in effect from an enclosing span, in which case that one preempts this
> limit. Use the `label` and the `attribution` field on `CancellationError` to
> determine which limit fired.

Work performed **outside** any span is not time-bounded. A consumer that wants
a blanket bound wraps its entry point in a single span — one line at the
boundary — rather than relying on an implicit global limit.

### Nesting: the tighter deadline wins

Spans nest. When you enter a span inside another, the effective deadline is the
**minimum** of the two — a span can only shorten the budget, never extend it.
This means an inner span can never defeat a bound its caller set:

```js
ce.withTimeLimit({ ms: 100, label: "outer" }, () =>
  // Even though this asks for 5000ms, the enclosing 100ms deadline preempts it.
  ce.withTimeLimit({ ms: 5000, label: "inner" }, () =>
    ce.parse("\\sum_{i=1}^{100000000} \\sqrt{i}").evaluate()
  )
);
```

Labels are for **attribution only**, never for control: a label cannot buy a
span more time than its enclosing budget allows.

### Attribution: whose budget expired?

When several spans are active, a `CancellationError` tells you which one owned
the deadline that fired:

<div className="symbols-table">

| Property | Description |
| :--- | :--- |
| `err.cause` | `"timeout"` for a time-budget breach |
| `err.attribution` | The `label` of the span whose deadline fired (`undefined` for an unlabelled span) |
| `err.spans` | All active span labels, outermost first |

</div>

`attribution` answers the practical question "was this **my** budget or my
**caller's**?" — compare it directly against the label you passed. Because
nesting takes the tighter deadline, the span that fires is the tighter one:

```js
try {
  ce.withTimeLimit({ ms: 100, label: "outer" }, () =>
    ce.withTimeLimit({ ms: 5000, label: "inner" }, () =>
      ce.parse("\\sum_{i=1}^{100000000} \\sqrt{i}").evaluate()
    )
  );
} catch (err) {
  if (err instanceof CancellationError) {
    console.log(err.attribution); // ➔ "outer"  (the tighter, enclosing budget)
    console.log(err.spans);       // ➔ ["outer", "inner"]
  }
}
```

Here the outer 100ms budget preempts the inner 5000ms request, so
`attribution` is `"outer"`. Had the inner span been the tighter one,
`attribution` would be `"inner"`. Code catching the error inside the `inner`
span can therefore tell "my own sub-budget expired — degrade gracefully" from
"my caller's budget expired — propagate".

The numeric form `withTimeLimit(500, fn)` stays valid and produces an
**unlabelled** span: any timeout it owns has `attribution: undefined` and does
not appear in `spans`. Supply a label only when you can act on it.

### `ce.timeLimit` has been removed

Earlier versions armed a global, implicit deadline around every
`evaluate()`/`simplify()` through the `ce.timeLimit` property (default 2000ms).
Its scope was never well-defined — "the current evaluation" is not a region you
can point at — and a span silently overrode it with no indication in the API.

`ce.timeLimit` was deprecated in the previous minor release and is now
**removed**. There is no implicit deadline anymore: an `evaluate()` outside a
span runs unbounded, and `withTimeLimit()` spans are the only way to arm one.
If you relied on the old 2000ms ambient default, wrap the work you want
bounded in a span:

```js
// Before (no longer compiles)
ce.timeLimit = 500;
const r = expr.evaluate();

// After
const r = ce.withTimeLimit({ ms: 500, label: "my-app:eval" }, () =>
  expr.evaluate()
);
```

For a blanket bound, this is a single wrap at your application's entry point.

**Numerical integration is special.** Monte Carlo integration (`NIntegrate`,
or `N()` on an `Integrate` expression) does not throw when it runs out of time.
Instead it returns the estimate computed from the samples taken so far, with a
correspondingly larger error bound: a partial estimate is more useful than no
answer.

## Iteration and Recursion Budgets

Time is not the only way a computation can run away. Two count-based budgets
bound structural growth independently of the clock:

<div className="symbols-table">

| Property | Default | Description |
| :--- | :--- | :--- |
| `ce.iterationLimit` | 1 024 | Maximum iterations of a looping control structure (`Loop`, `Comprehension`, `While`, `FixedPoint`) and of collection iteration |
| `ce.recursionLimit` | 1 024 | Maximum depth of user-function recursion |

</div>

When the iteration limit is exceeded, a `CancellationError` with cause
`"iteration-limit-exceeded"` is thrown:

```js
ce.iterationLimit = 10_000;

// A loop over a billion elements: aborts after 10,000 iterations
ce.box(["Loop", ["Add", "i", 1], ["Element", "i", ["Range", 1, 1e9]]]).evaluate();
// ➔ throws CancellationError, cause: "iteration-limit-exceeded"
```

When user-function recursion exceeds `ce.recursionLimit`, a `CancellationError`
with cause `"recursion-depth-exceeded"` is thrown instead.

Setting `ce.iterationLimit` to `0` or a negative value disables the iteration
limit; a span (if any) still applies.

## Asynchronous Evaluation

For long-running computations, `evaluateAsync()` evaluates without blocking the
event loop and accepts an `AbortSignal` so a caller can request cancellation:

```js
const controller = new AbortController();

// Request cancellation if the evaluation is still running after one second
setTimeout(() => controller.abort("user-canceled"), 1000);

try {
  const result = await expr.evaluateAsync({ signal: controller.signal });
  console.log(result.toString());
} catch (err) {
  if (err instanceof CancellationError) console.log("Canceled:", err.cause);
}
```

Be aware of what async cancellation can and cannot do today:

- **Cooperative, not preemptive.** An `abort()` is honored only at the points
  where the engine checks the signal. Today those checks are reached by
  `Loop`, `Factorial`, `Sum` and `Product`; other operators run their
  synchronous evaluation to completion and cannot be interrupted by a signal.
- **A synchronous tight loop blocks delivery.** JavaScript is
  single-threaded. If an uninterruptible operator is spinning, the
  `abort()` callback cannot even run until it yields, so cancellation may be
  delayed indefinitely or never observed for that call.
- **Not a runaway guard.** For untrusted or genuinely unbounded work, an
  `AbortSignal` is not sufficient protection. Bounding such work reliably
  requires isolating it in a Web Worker or a separate process that you can
  terminate from the outside.

For most work, a time span (`withTimeLimit`) and the iteration/recursion
budgets are the appropriate bounds; reach for async cancellation when you need
a user-facing "cancel" affordance on the interruptible operators above.
