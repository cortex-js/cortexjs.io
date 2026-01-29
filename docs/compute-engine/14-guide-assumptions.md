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

```js
ce.declare("x", "number");
ce.assume(ce.parse("x > 0"));
ce.is(ce.parse("x > 2"));
// ➔  true

ce.forget("x");

ce.is(ce.parse("x > 2"));
// ➔  undefined
```

**To temporarily define a series of assumptions**, create a new scope.

```js
ce.declare("x", "number");
ce.is(ce.parse("x > 2"));
// ➔ undefined

ce.pushScope();

ce.assume(ce.parse("x > 0"));
ce.is(ce.parse("x > 2"));
// ➔  true

ce.popScope(); // all assumptions made in the current scope are forgotten

ce.is(ce.parse("x > 2"));
// ➔  undefined
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



