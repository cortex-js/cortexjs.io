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


## Defining New Assumptions

**To make an assumption about a symbol**, use the `ce.assume()` method.

For example, to indicate \\(\beta \neq 0\\):

```js
ce.assume(ce.parse("\\beta \\neq 0"));
```

Each call to `ce.assume()` replaces the previous assumptions about the symbol.

### Return Values

The `ce.assume()` method returns a status indicating the result of the assumption:

- `'ok'` - The assumption was successfully added
- `'tautology'` - The assumption is redundant (already implied by existing assumptions)
- `'contradiction'` - The assumption conflicts with existing assumptions
- `'not-a-predicate'` - The expression is not a valid assumption proposition

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

## Type Inference from Assumptions

The type of a symbol is automatically inferred from assumptions:

```js
ce.assume(ce.parse("x > 4"));
ce.box("x").type.toString();
// ➔ 'real'

ce.assume(ce.parse("n = 42"));
ce.box("n").type.toString();
// ➔ 'integer'

ce.assume(ce.parse("z = 3.14"));
ce.box("z").type.toString();
// ➔ 'real'
```

Inequality assumptions (`>`, `<`, `>=`, `<=`) set the symbol's type to `real`.
Equality assumptions infer the type from the value.

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

ce.assume(ce.parse("x > 0"));
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
| `Less`<br/>`LessEqual`<br/>`Greater`<br/>`GreaterEqual` | Inequality. Both sides are assumed to be `RealNumbers`                                                               |
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





## Verifying Assumptions

**To test if a particular assumption is valid** call the `ce.verify()` method.

```js
ce.verify(ce.parse("x > 0"));
```


The method `ce.verify()` returns `true` if the assumption is true, `false` if it is
not, and `undefined` if it cannot be determined.

While `ce.verify()` is appropriate to get boolean answers, more complex queries can
also be made.

**To query the assumptions knowledge base** call the `ce.ask()` method.

The argument of `ce.ask()` can be a pattern, and it returns an array of matches as
`Substitution` objects.

```js
// "x is a positive integer"
ce.assume(ce.parse("x > 0"));

// "What is x greater than?"
ce.ask(["Greater", "x", "_val"]);

//  -> [{"val": 0}] "It is greater than 0"
```

<ReadMore path="/compute-engine/guides/patterns-and-rules/" > 
Read more about **Patterns and Rules**<Icon name="chevron-right-bold" />
</ReadMore>



