---
title: Assumptions
slug: /compute-engine/guides/assumptions/
---

<Intro>
Assumptions are statements about symbols that are assumed to be true. For
example, the assumption that \\(x\\) is a positive real number can be used to 
simplify \\(|x|\\) to \\(x\\).
</Intro>


Assumptions can be used to describe the range of values that a symbol can take. 

The assumptions knowledge base is then used by the Compute Engine to simplify 
expressions.

<ReadMore path="/compute-engine/guides/simplify/" > 
Read more about **Simplifying Expressions** <Icon name="chevron-right-bold" />
</ReadMore>


For example, the assumption that \\(x\\) is positive is used to simplify
\\(\\sqrt\{x^2\}\\) to \\(x\\).

```js
ce.assume(["Greater", "x", 0]);
ce.parse("\\sqrt{x^2}").simplify().print();
// ➔ x
```

Assumptions can be used for other operations as well, such as solving equations or
integrating.

For example, a real solution of \\(x^2 = a\\) is a square root of \\(a\\) only
when \\(a \\ge 0\\). Without an assumption about \\(a\\), each solution carries
that condition; with the assumption \\(a > 0\\), the condition is gone, and
with \\(a < 0\\) there is no real solution (`[]`).

```js
const solve = ce.parse("\\operatorname{Solve}(x^2 = a, x \\in \\R)");
solve.evaluate().print();
// ➔ [If(0 <= a, sqrt(a)),If(0 <= a, -sqrt(a))]

ce.assume(ce.parse("a > 0"));
solve.evaluate().print();
// ➔ [sqrt(a),-sqrt(a)]
```


## Defining New Assumptions

**To make an assumption about a symbol**, use the `ce.assume()` method.

For example, to indicate \\(\beta \neq 0\\):

```js
ce.assume(ce.parse("\\beta \\neq 0"));
```

Each call to `ce.assume()` adds to the assumptions about the symbol. An
assumption that contradicts them is refused: `ce.assume()` returns
`"contradiction"` and changes nothing. To replace the assumptions about a
symbol, call `ce.forget()` first.

```js
ce.assume(ce.parse("a > 0"));   // ➔ "ok"
ce.assume(ce.parse("a < 0"));   // ➔ "contradiction"
ce.forget("a");
ce.assume(ce.parse("a < 0"));   // ➔ "ok"
```

### Return Values

The `ce.assume()` method returns a status indicating the result of the assumption:

- `'ok'` - The assumption was successfully added
- `'tautology'` - The assumption is redundant (already implied by existing assumptions)
- `'contradiction'` - The assumption conflicts with existing assumptions
- `'not-a-predicate'` - The expression is not a valid assumption proposition
- `'internal-error'` - The assumption could not be processed

Every outcome is reported as a return value; an expression that cannot be
assumed does not throw. The `["Assume"]` operator reports the same outcomes as
a string — see the
[`Assume` reference](/compute-engine/reference/core/#assume).

```js
ce.assume(ce.parse("x > 4"));

// Redundant assumption (x > 4 implies x > 0)
ce.assume(ce.parse("x > 0"));
// ➔ 'tautology'

// Conflicting assumption (x > 4 contradicts x < 0)
ce.assume(ce.parse("x < 0"));
// ➔ 'contradiction'

// Same assumption repeated
ce.assume(ce.parse("y = 5"));
ce.assume(ce.parse("y = 5"));
// ➔ 'tautology'
```

## Value Resolution from Assumptions

When an equality assumption is made, the symbol evaluates to the assumed value:

```js
ce.assume(ce.parse("\\alpha = 5"));
ce.parse("\\alpha").evaluate();
// ➔ 5

ce.parse("\\alpha + 1").evaluate();
// ➔ 6

// Equality comparisons work correctly
ce.parse("\\alpha = 5").evaluate();
// ➔ True

ce.parse("\\alpha = 0").evaluate();
// ➔ False
```

## Inequality Evaluation

When inequality assumptions are made, the Compute Engine uses transitive reasoning
to determine the results of comparisons:

```js
ce.assume(ce.parse("x > 4"));

// Transitive reasoning: x > 4 > 0, so x > 0
ce.parse("x > 0").evaluate();
// ➔ True

ce.parse("x < 0").evaluate();
// ➔ False

// Properties are also available
ce.parse("x").isPositive;
// ➔ true

ce.parse("x").isGreater(0);
// ➔ true
```

## Assumptions and Static Types

Use `ce.declare()` to give a variable a static type and `ce.verify()` to
ask what follows from the current assumptions. Here an expression prepared
before the assumption keeps its declared type throughout:

```js
ce.declare("x", "real");
const x = ce.expr("x");
const sum = ce.parse("x+1");
const integer = ["Element", "x", "Integers"];

ce.assume(integer);
ce.verify(integer);       // true
x.isInteger;              // true
x.type.toString();        // "real"
sum.type.toString();      // "real"

ce.forget("x");
ce.verify(integer);       // undefined
x.type.toString();        // "real"
```

The same distinction applies to bounds. After assuming `q > 4`, use
`ce.verify("q > 0")` to test the consequence. Use a declared ranged type
when a bound is part of the variable's contract.

An equality assumption supplies a value for evaluation in its scope:

```js
ce.declare("n", "real");
const n = ce.expr("n");
ce.assume("n = 42");
n.evaluate().json;       // 42
n.type.toString();       // "real"
ce.forget("n");
n.evaluate().json;       // "n"
```

### Assumptions and the Infinities

Inequality assumptions constrain a symbol to finite real values. With an
otherwise undeclared `x`, the finiteness query can use the assumption:

```js
ce.assume("x > 4");
ce.expr("x").isFinite;        // true
ce.expr("x").type.toString(); // "unknown"
```

An equality assumption such as `m = +∞` supplies the infinite value for
evaluation. Assigning that value to a new variable instead infers its
static type from the assignment:

```js
ce.assign("p", ce.parse("\\infty"));
ce.expr("p").type.toString();
// ➔ 'infinity'

ce.assign("r", ce.box(NaN));
ce.expr("r").type.toString();
// ➔ 'nan'
```

The types `infinity` and `real` are disjoint. A real-membership assumption
about a symbol already assigned an infinite value gives a contradiction:

```js
ce.assign("a", ce.parse("\\infty"));

ce.assume(ce.parse("a \\in \\R"));
// ➔ 'contradiction'
```

Use `ExtendedRealNumbers` when you mean the extended real line — that set does
contain $\pm\infty$, while `RealNumbers` does not.

## Assumptions Lifecycle

Assumptions are stored in a knowledge base which is tied to the current 
evaluation context. 

Any assumptions made in the current context are automatically inherited by all 
child contexts.

When a context is exited, all assumptions made in that context are forgotten.


**To remove previous assumptions**, use `ce.forget()`.

- Invoking `ce.forget()` with no arguments will remove all assumptions.
- Passing an array of symbol names will remove assumptions about each of the
  symbols.
- Passing a symbol name will only remove assumptions about that particular
  symbol.

The `forget()` method clears both the assumptions and any values set by equality
assumptions:

```js
ce.assume(ce.parse("x = 5"));
ce.parse("x").evaluate();
// ➔ 5

ce.forget("x");

ce.parse("x").evaluate();
// ➔ x (symbol, no longer has a value)

ce.verify(ce.parse("x > 0"));
// ➔ undefined (assumption cleared)
```

**To temporarily define a series of assumptions**, create a new scope.

Assumptions made in a nested scope are automatically cleaned up when `popScope()`
is called. This includes both the assumptions and any values set by equality
assumptions:

```js
ce.declare("x", "number");
ce.verify(ce.parse("x > 2"));
// ➔ undefined

ce.pushScope();

ce.assume(ce.parse("x > 4"));
ce.verify(ce.parse("x > 2"));
// ➔ true

ce.assume(ce.parse("y = 10"));
ce.parse("y").evaluate();
// ➔ 10

ce.popScope(); // all assumptions made in the current scope are forgotten

ce.verify(ce.parse("x > 2"));
// ➔ undefined

ce.parse("y").evaluate();
// ➔ y (value cleared when scope exited)
```



## Assumption Propositions

The argument of the `ce.assume()` method is a **proposition**. A proposition is a
statement that can be either true or false. Assumption propositions can take 
the following forms:


<div className="symbols-table">

| Operator                                                 |                                                                                                                     |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `Element`<br/>`NotElement`                            | Indicate the domain of a symbol                                                                                     |
| `Less`<br/>`LessEqual`<br/>`Greater`<br/>`GreaterEqual` | Inequality. Both sides are assumed to be `RealNumbers`, which are the **finite** reals — an inequality never admits $\pm\infty$ |
| `Equal`<br/>`NotEqual`                                | Equality                                                                                                            |

</div>


Some propositions can be described in several equivalent ways. You can use 
whichever form you prefer. Similarly, when querying the knowledge base later, 
you can use any form you'd like.

```js example
ce.assume(ce.parse("x > 0"));

// Equivalent to...
ce.assume(ce.parse("0 < x"));
```

### Constraints on Parts of a Value

An inequality can constrain the **real part**, **imaginary part**, **magnitude**
or **argument** of a symbol, rather than the symbol itself. This is useful for
complex-valued symbols, where a bare inequality (which assumes both sides are
real) does not apply.

```js example
ce.assume(ce.parse("\\Re(s) > 1"));    // real part of s
ce.assume(ce.parse("\\Im(\\tau) > 0")); // imaginary part of τ (upper half-plane)
ce.assume(["Less", ["Abs", "q"], 1]);   // |q| < 1 (inside the unit disk)
```

A bound on the magnitude proves that the value is finite. The symbol can
still have an unknown static type:

```js
const within = ["Less", ["Abs", "q"], 1];
ce.assume(within);
ce.verify(within);            // true
ce.expr("q").isFinite;        // true
ce.expr("q").type.toString(); // "unknown"
```

The open upper half-plane has a LaTeX shorthand: `\mathbb{C}^+`. In a
membership, `\tau \in \mathbb{C}^+` is equivalent to `Im(τ) > 0` — it
canonicalizes to that inequality, so it both reads naturally and discharges the
same guards.

```js example
ce.assume(ce.parse("\\tau \\in \\mathbb{C}^+")); // same as Im(τ) > 0
```

These part-constraints are honored when discharging conditions during
simplification and rule application: a rule guarded by `Re(s) > 1` will fire
for a symbol assumed to satisfy it, and will **not** fire (fail-closed) when
the constraint is unknown.

The discharge matches like with like. An assumed part-inequality satisfies a
guard expressed as an inequality on the **same** part, including transitively —
assuming `Re(s) > 1` also discharges `Re(s) > 0`, and `Im(τ) > 1` discharges
`Im(τ) > 0`. The upper half-plane is expressed this way: identities for modular
and theta functions are guarded by `Im(τ) > 0`, so a symbol assumed to satisfy
`ce.assume(["Greater", ["Imaginary", "tau"], 0])` discharges them. See the
[Identities Library](/compute-engine/guides/identities/).

### Conjunctions

Use `And` to add several compatible assumptions in a single call.

```js example
ce.assume(["And", ["Greater", "x", 0], ["Less", "x", 1]]); // 0 < x < 1
```

### Excluding Values from a Domain

`Element` and `NotElement` describe the domain of a symbol. Combine `Element`
with `SetMinus` to assume a symbol belongs to a set with specific values
removed — for example, a nonzero complex number:

```js example
ce.assume(["Element", "z", ["SetMinus", "ComplexNumbers", ["Set", 0]]]);

// Equivalent, for excluding a single value:
ce.assume(["NotElement", "z", ["Set", 0]]);
```



## Verifying Assumptions

**To test if a particular assumption is valid** call the `ce.verify()` method.

```js
ce.verify(ce.parse("x > 0"));
```


The method `ce.verify()` returns `true` if the assumption is true, `false` if it is
not, and `undefined` if it cannot be determined.

Logical operators (`And`, `Or`, `Not`) use 3-valued logic, so expressions like
`And(True, Unknown)` return `undefined`.

While `ce.verify()` is appropriate to get boolean answers, more complex queries can
also be made.

**To query the assumptions knowledge base** call the `ce.ask()` method.

The argument of `ce.ask()` can be a pattern, and it returns an array of matches as
`Substitution` objects.

```js
// "x is positive"
ce.assume(ce.parse("x > 0"));

// Ask for a lower bound (common query pattern)
ce.ask(["Greater", "x", "_k"]);

//  -> [{"_k": 0}] "It is greater than 0"

// You can also ask "which symbols are greater than 0?"
ce.ask(["Greater", "_x", 0]);

//  -> [{"_x": x}]

// Inequalities are stored internally in a normalized form, so this is also a
// matching query:
ce.ask(["Less", ["Negate", "x"], "_k"]);

//  -> [{"_k": 0}]
```

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > 
Read more about **Patterns and Rules**<Icon name="chevron-right-bold" />
</ReadMore>
