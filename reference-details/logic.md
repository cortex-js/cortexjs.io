<!-- The detail of the entries of /reference/logic/. Format: README.md. -->

## Section: Logical operators

`&&` (`And`), `||` (`Or`) and `!` (`Not`) are operators; their precedence is
in the table of [Operators](/operators/#precedence). The other connectives
are functions: `xor`, `nand`, `nor`, `implies` and `equivalent`. `xor`,
`nand` and `nor` take any number of operands: `xor` is true when an odd
number of them are true, `nand` is the negation of `&&` and `nor` the
negation of `||`.

```epsil
[xor(true, false), nand(true, true), nor(false, false)]
// ➔ ["True","False","True"]
xor(true, true, true)
// ➔ "True"
```

`&&`, `||`, `nand`, `nor` and `implies` **short-circuit**: their operands
are evaluated left to right, in the order written, and evaluation stops at
the first operand that decides the result: the first `false` for `&&` and
`nand`, the first `true` for `||` and `nor`, a `false` antecedent for
`implies`. The remaining operands are not evaluated, and for that reason
these operands are never reordered. `xor` and `equivalent` cannot
short-circuit: every operand affects the result, so an operand that fails
makes the result an error.

```epsil
function g(x) { 1/x }
[implies(false, g("a") > 0), nand(false, g("a") > 0)]
// ➔ ["True","True"]
function g(x) { 1/x }
nor(true, g("a") > 0)
// ➔ "False"
function g(x) { 1/x }
equivalent(true, g("a") > 0)
// ➔ error: Runtime error: expected `number`, got `string` at `a`
```

An operand that fails does not stop a short-circuit operator, and an operand
after it can still decide. [Logic operators](/operators/#logic-operators)
gives the rule, and the element-wise form, in which an operand that is a
list of booleans makes the result a list.

```epsil
[true, false] && [true, true]
// ➔ ["True","False"]
```

### Boolean simplification

A boolean expression is simplified with these laws when it is evaluated:

| Law | Rule | Epsil |
| :--- | :--- | :--- |
| Absorption | $A \land (A \lor B) \to A$ | `A && (A \|\| B)` is `A` |
| Absorption | $A \lor (A \land B) \to A$ | `A \|\| (A && B)` is `A` |
| Idempotence | $A \land A \to A$ | `A && A` is `A` |
| Idempotence | $A \lor A \to A$ | `A \|\| A` is `A` |
| Complementation | $A \land \lnot A \to \bot$ | `A && !A` is `false` |
| Complementation | $A \lor \lnot A \to \top$ | `A \|\| !A` is `true` |
| Identity | $A \land \top \to A$ | `A && true` is `A` |
| Identity | $A \lor \bot \to A$ | `A \|\| false` is `A` |
| Domination | $A \land \bot \to \bot$ | `A && false` is `false` |
| Domination | $A \lor \top \to \top$ | `A \|\| true` is `true` |
| Double negation | $\lnot\lnot A \to A$ | `!!A` is `A` |

```epsil
[A && (A || B), A || (A && B), A && A && B]
// ➔ [A,A,A && B]
[A && !A, A || !A, A && true, A || false, A && false, A || true, !!A]
// ➔ ["False","True",A,A,"False","True",A]
```

## Section: First-order logic

### Quantifiers

The quantifiers are functions: `forAll` (universal), `exists`
(existential), `existsUnique` (exactly one), and the negated quantifiers
`notForAll` and `notExists`. Each takes a condition and a proposition. The
condition is the variable being quantified over, a symbol, or `x in S`,
which also gives the set of values that the variable can take. The variable
is local to the proposition.

### Quantifier evaluation

A quantifier is decided by trying each value when the condition is
`x in S` and `S` is finite: a set, a list, a range `a..b`, or an
`interval(a, b)` with integer bounds, which is read as the integers from `a`
to `b`. The domain has at most 1000 elements. Over a larger range, the
elements are not tried: the quantifier is decided only from the bounds of the
range, when they decide it, and otherwise stays unevaluated.

```epsil
[forAll(x in {1, 2, 3}, x > 0), exists(x in [1, 2, 3], x > 2)]
// ➔ ["True","True"]
forAll(n in 1..10, n < 10)
// ➔ "False"
exists(n in 1..1000, n == 1000)
// ➔ "True"
exists(n in 1..2000, n == 1500)
// ➔ Exists(Element(n, Range(1, 2000)), n == 1500)
[forAll(n in 1..2000, n > 0), forAll(n in 1..2000, n < 1500)]
// ➔ ["True",ForAll(Element(n, Range(1, 2000)), n < 1500)]
```

Over an empty domain, `forAll` is true and `exists` is false.

```epsil
[forAll(x in {}, x > 0), exists(x in {}, x > 0)]
// ➔ ["True","False"]
```

Nested quantifiers of the same kind are evaluated over the Cartesian
product of their domains.

```epsil
forAll(x in {1, 2}, forAll(y in {1, 2}, x + y > 0))
// ➔ "True"
exists(x in {1, 2}, exists(y in {1, 2}, x + y == 4))
// ➔ "True"
```

When the domain is not finite, or there is no domain, these simplifications
apply: a quantifier whose proposition is `true` or `false` is that value,
and a quantifier whose proposition does not contain the variable is that
proposition. Otherwise the quantifier stays unevaluated, unless the
proposition can be decided for every value.

```epsil
[forAll(x, true), exists(x, false), forAll(x, y > 0)]
// ➔ ["True","False",0 < y]
forAll(x, x + 1 > x)
// ➔ "True"
exists(x, x^2 == 1)
// ➔ Exists(x, x^2 == 1)
```

### Negated quantifiers

`notForAll(c, p)` is true when `p` fails for at least one value, and
`notExists(c, p)` when `p` holds for no value. They are evaluated like
`forAll` and `exists`. `!` applied to a quantifier is kept as a negation.

```epsil
[notForAll(x in {1, 2, 3}, x > 1), notExists(x in {1, 2, 3}, x > 5)]
// ➔ ["True","True"]
!forAll(x, x > 1)
// ➔ !ForAll(x, 1 < x)
```

## Section: LaTeX syntax for logic

### Constants

| MathJSON | LaTeX | Notation |
| :--- | :--- | :--- |
| `True` | `\top` | $$ \top $$ |
| `True` | `\mathsf{T}` | $$ \mathsf{T} $$ |
| `True` | `\operatorname{True}` | $$ \operatorname{True} $$ |
| `False` | `\bot` | $$ \bot $$ |
| `False` | `\mathsf{F}` | $$ \mathsf{F} $$ |
| `False` | `\operatorname{False}` | $$ \operatorname{False} $$ |

### LaTeX logical operators

| MathJSON | LaTeX | Notation | Description |
| :--- | :--- | :--- | :--- |
| `And` | `p \land q` | $$ p \land q $$ | Conjunction |
| `And` | `p \wedge q` | $$ p \wedge q $$ | |
| `And` | `p \operatorname{and} q` | $$ p \operatorname{and} q $$ | |
| `Or` | `p \lor q` | $$ p \lor q $$ | Disjunction |
| `Or` | `p \vee q` | $$ p \vee q $$ | |
| `Or` | `p \operatorname{or} q` | $$ p \operatorname{or} q $$ | |
| `Xor` | `p \veebar q` | $$ p \veebar q $$ | Exclusive or |
| `Nand` | `p \barwedge q` | $$ p \barwedge q $$ | Not and |
| `Nor` | `p ⊽ q` | | Not or |
| `Not` | `\lnot p` | $$ \lnot p $$ | Negation |
| `Not` | `\neg p` | $$ \neg p $$ | |
| `Not` | `\operatorname{not}(p)` | $$ \operatorname{not}(p) $$ | |
| `Equivalent` | `p \iff q` | $$ p \iff q $$ | Equivalence |
| `Equivalent` | `p \Leftrightarrow q` | $$ p \Leftrightarrow q $$ | |
| `Equivalent` | `p \leftrightarrow q` | $$ p \leftrightarrow q $$ | |
| `Equivalent` | `p \Longleftrightarrow q` | $$ p \Longleftrightarrow q $$ | |
| `Equivalent` | `p \longleftrightarrow q` | $$ p \longleftrightarrow q $$ | |
| `Implies` | `p \implies q` | $$ p \implies q $$ | Implication |
| `Implies` | `p \Rightarrow q` | $$ p \Rightarrow q $$ | |
| `Implies` | `p \Longrightarrow q` | $$ p \Longrightarrow q $$ | |
| `Implies` | `p \longrightarrow q` | $$ p \longrightarrow q $$ | |
| `Proves` | `p \vdash q` | $$ p \vdash q $$ | Provability |
| `Entails` | `p \vDash q` | $$ p \vDash q $$ | Entailment |
| `Satisfies` | `p \models q` | $$ p \models q $$ | Satisfaction |

`Equivalent` serializes as `\iff`, and `Nor` as `⊽`. `\equiv` is not a
notation of `Equivalent`: it parses as `IdenticallyEqual`, the mathematical
identity operator.

### Operator precedence

The logical operators bind looser than the comparison and arithmetic
operators, so `x = 1 \lor y = 2` parses as `(x = 1) \lor (y = 2)`.

| Precedence | Operators | Example |
| :--- | :--- | :--- |
| 880 | `Not` (`\lnot`, `\neg`) | `\lnot p` |
| 245 | Comparisons (`=`, `<`, `>`, `\leq`, `\geq`, `\neq`) | `x = 1` |
| 240 | Set relations (`\subset`, `\subseteq`, `\in`, …) | `x \in S` |
| 235 | `And` (`\land`, `\wedge`) | `p \land q` |
| 232 | `Xor`, `Nand`, `Nor` | `p \veebar q` |
| 230 | `Or` (`\lor`, `\vee`) | `p \lor q` |
| 220 | `Implies` (`\implies`, `\Rightarrow`) | `p \implies q` |
| 219 | `Equivalent` (`\iff`, `\Leftrightarrow`) | `p \iff q` |
| 200 | Quantifiers (`\forall`, `\exists`) | `\forall x, P(x)` |

- `p \land q \lor r` parses as `(p \land q) \lor r`.
- `p \lor q \implies r` parses as `(p \lor q) \implies r`.
- `\lnot` applies only to the atom that follows it: `\lnot p \land q`
  parses as `(\lnot p) \land q`. To negate a conjunction, write
  `\lnot(p \land q)`.

### Arrow notation

`\to` and `\rightarrow` are reserved for the notation of a mapping, as in
`f: A \to B`, and parse as `To`, not `Implies`. For an implication, use
`\implies`, `\Rightarrow` or `\Longrightarrow`.

### Quantifier scope

A quantifier binds tightly, as is usual in first-order logic: its scope is
the formula that immediately follows it and stops at a logical connective.
`\forall x. P(x) \implies Q(x)` parses as `(∀x. P(x)) ⇒ Q(x)`:

```json example
["Implies", ["ForAll", "x", ["Predicate", "P", "x"]], ["Q", "x"]]
```

`P(x)`, inside the quantifier, is a `Predicate`; `Q(x)`, outside it, is an
ordinary function application. To include the connective in the scope, use
parentheses: `\forall x. (P(x) \implies Q(x))` parses as

```json example
["ForAll", "x", ["Implies", ["Predicate", "P", "x"], ["Predicate", "Q", "x"]]]
```

The LaTeX parser of the JavaScript API has an option that makes the scope
extend to the end of the expression instead; see the
[Logic guide](/compute-engine/guides/logic/).

## Exists

`exists` is a logical quantifier, not a collection function: it takes a
condition and a proposition, not a collection and a predicate, and it binds a
variable. To ask whether an element of a collection satisfies a predicate,
use [`any`](/reference/collections/#any).

The first argument introduces the variable: a symbol, or `x in S`. With a
finite `S`, the proposition is decided by trying each element.

```epsil
exists(x in {5, 2, 10, 18}, x > 15)
// ➔ "True"
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
exists(x, x > 15)
// ➔ Exists(x, 15 < x)
```

The variable is local to the proposition and shadows a symbol of the same
name outside it, so a value assigned to that symbol does not enter the
proposition.

```epsil
let x = 100
exists(x in {5, 2, 10}, x > 15)
// ➔ "False"
```

See also [`notExists`](/reference/logic/#notexists) and
[`existsUnique`](/reference/logic/#existsunique).

`exists(x, p)`, with no domain, stays unevaluated unless the proposition
does not contain `x` or can be decided for every value: see
[Quantifier evaluation](#quantifier-evaluation).

### MathJSON

`["Exists", condition, proposition]`. The condition is a symbol or
`["Element", variable, domain]`.

```json example
["Exists", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 15]]
// ➔ "True"
```

`["Exists", "x", proposition]` quantifies over all values of `x`.

```json example
["Exists", "x", ["Equal", ["Square", "x"], 1]]
["Exists", ["Element", "x", "RealNumbers"], ["Equal", ["Square", "x"], 1]]
```

In LaTeX, the condition and the proposition are separated by a comma, a
colon or `\mid`, or the proposition is in parentheses after the condition:
`\exists x, x^2 = 1`, `\exists x: x^2 = 1`, `\exists x \mid x^2 = 1` and
`\exists x(x^2 = 1)` are the same expression.

## ForAll

`forAll` is a logical quantifier, not a collection function. Like
[`exists`](/reference/logic/#exists), it binds the variable that its first
argument introduces, and with `x in S` over a finite `S` it is decided by
trying each element. To ask whether every element of a collection satisfies
a predicate, use [`all`](/reference/collections/#all).

```epsil
forAll(x in {5, 2, 10, 18}, x > 0)
// ➔ "True"
forAll(x in {5, 2, 10, 18}, x > 5)
// ➔ "False"
```

See also [`notForAll`](/reference/logic/#notforall).

A proposition that holds for every value is decided without a domain:

```epsil
forAll(x, x + 1 > x)
// ➔ "True"
```

### MathJSON

`["ForAll", condition, proposition]`.

```json example
["ForAll", ["Element", "x", ["Set", 5, 2, 10, 18]], ["Greater", "x", 0]]
// ➔ "True"
```

In LaTeX, `\forall x \in \{1, 2, 3\}, x > 0` parses to
`["ForAll", ["Element", "x", ["Set", 1, 2, 3]], ["Greater", "x", 0]]`.

The condition is a symbol, or `["Element", variable, domain]`.

```json example
["ForAll", "x", ["Greater", ["Add", "x", 1], "x"]]
// ➔ "True"
["ForAll", ["Element", "x", "RealNumbers"], ["Greater", ["Square", "x"], 0]]
```

In LaTeX, the condition and the proposition are separated by a comma, a
colon or `\mid`, or the proposition is in parentheses after the condition:
`\forall x, x + 1 > x`, `\forall x: x + 1 > x`, `\forall x \mid x + 1 > x`
and `\forall x(x + 1 > x)` are the same expression. The condition can give
the domain: `\forall x \in \R, x + 1 > x`.

## ExistsUnique

`existsUnique(x in S, p)` is true when exactly one element of `S`
satisfies `p`. It is evaluated over a finite domain like
[`exists`](/reference/logic/#exists).

```epsil
existsUnique(x in {1, 2, 3}, x == 2)
// ➔ "True"
existsUnique(x in {1, 2, 3}, x > 1)
// ➔ "False"
existsUnique(x, x > 1)
// ➔ ExistsUnique(x, 1 < x)
```

### MathJSON

`["ExistsUnique", condition, proposition]`.

```json example
["ExistsUnique", ["Element", "x", ["Set", 1, 2, 3]], ["Equal", "x", 2]]
// ➔ "True"
```

In LaTeX, `\exists! x, x^2 = 1`.

## Predicate

#### Predicates

A predicate is a function whose value is a boolean. In a quantifier, a
predicate can be any function of the program:

```epsil
function P(x) { x > 0 }
forAll(x in {1, 2}, P(x))
// ➔ "True"
function P(x) { x > 0 }
exists(x in {-1, -2}, P(x))
// ➔ "False"
```

`Predicate(P, x)` is the predicate `P` applied to `x`, kept as a formula: it
is not evaluated, even when `P` is a function.

```epsil
function P(x) { x > 0 }
Predicate(P, 2)
// ➔ Predicate(P, 2)
```

### MathJSON

`["Predicate", name, ...args]` distinguishes the application of a predicate
from a function call in a formula of first-order logic.

```json example
["Predicate", "P", "x"]
["Predicate", "Q", "a", "b"]
```

It serializes to LaTeX as a function application: `P(x)`.

In LaTeX, inside the scope of a quantifier, a single uppercase letter
followed by parentheses parses as a `Predicate`: `\forall x, P(x)` is
`["ForAll", "x", ["Predicate", "P", "x"]]`, and `\exists x, Q(x, y)` is
`["Exists", "x", ["Predicate", "Q", "x", "y"]]`. Outside a quantifier, `P(x)`
parses as a function application, `["P", "x"]`, so `D(f, x)` is the
derivative `D` and `N(\sqrt{10})` the numeric evaluation `N`. Inside a
quantifier these names are predicates too: `\forall x, D(x)` is
`["ForAll", "x", ["Predicate", "D", "x"]]`. A predicate with a name of more
than one letter, or a lowercase one, is a function that the program
declares.

## ToCNF

#### Normal forms

A **literal** is a variable or its negation. The **conjunctive normal form**
(CNF) of an expression is a conjunction (`&&`) of disjunctions (`||`) of
literals, such as `(A || B) && (!A || C)`. The **disjunctive normal form**
(DNF) is a disjunction of conjunctions of literals, such as
`A && B || !A && C`.

`toCNF` applies:

- De Morgan's laws: $\lnot(A \land B) \equiv \lnot A \lor \lnot B$
- Distribution: $(A \land B) \lor C \equiv (A \lor C) \land (B \lor C)$
- Implication elimination: $A \to B \equiv \lnot A \lor B$
- Equivalence elimination:
  $A \leftrightarrow B \equiv (\lnot A \lor B) \land (\lnot B \lor A)$

```epsil
toCNF((A && B) || C)
// ➔ (A || C) && (B || C)
toCNF(implies(A, B))
// ➔ !A || B
toCNF(!(A && B))
// ➔ !A || !B
toCNF(equivalent(A, B))
// ➔ (!A || B) && (!B || A)
toCNF(xor(A, B))
// ➔ (A || B) && (!A || !B)
```

The result is not always the shortest CNF: see
[`minimalCNF`](/reference/logic/#minimalcnf).

### MathJSON

`["ToCNF", expression]`.

```json example
["ToCNF", ["Or", ["And", "A", "B"], "C"]]
// ➔ ["And", ["Or", "A", "C"], ["Or", "B", "C"]]
```

## ToDNF

`toDNF` applies:

- De Morgan's laws: $\lnot(A \lor B) \equiv \lnot A \land \lnot B$
- Distribution: $(A \lor B) \land C \equiv (A \land C) \lor (B \land C)$
- Implication and equivalence elimination, as
  [`toCNF`](/reference/logic/#tocnf) does

```epsil
toDNF((A || B) && C)
// ➔ A && C || B && C
toDNF(!(A || B))
// ➔ !A && !B
toDNF(implies(A, B))
// ➔ !A || B
```

The result is not always the shortest DNF: see
[`minimalDNF`](/reference/logic/#minimaldnf).

### MathJSON

`["ToDNF", expression]`.

```json example
["ToDNF", ["And", ["Or", "A", "B"], "C"]]
// ➔ ["Or", ["And", "A", "C"], ["And", "B", "C"]]
```

## IsSatisfiable

#### Satisfiability and tautology

An expression is **satisfiable** when an assignment of truth values to its
variables makes it true, and a **tautology** when every assignment makes it
true. `isSatisfiable` and `isTautology` try every assignment. With more
than 20 variables, they stay unevaluated.

```epsil
isSatisfiable(A && !A)
// ➔ "False"
isSatisfiable(A || B)
// ➔ "True"
isSatisfiable(A || !A)
// ➔ "True"
```

A contradiction is not satisfiable; a tautology is.

### MathJSON

`["IsSatisfiable", expression]`.

```json example
["IsSatisfiable", ["And", "A", ["Not", "A"]]]
// ➔ "False"
```

## IsTautology

Like [`isSatisfiable`](/reference/logic/#issatisfiable), `isTautology`
tries every assignment, and stays unevaluated with more than 20 variables.

```epsil
isTautology(A || !A)
// ➔ "True"
isTautology(equivalent(!!A, A))
// ➔ "True"
isTautology(equivalent(!(A && B), !A || !B))
// ➔ "True"
isTautology(implies(A && implies(A, B), B))
// ➔ "True"
isTautology(A)
// ➔ "False"
```

### MathJSON

`["IsTautology", expression]`.

```json example
["IsTautology", ["Or", "A", ["Not", "A"]]]
// ➔ "True"
```

## TruthTable

The result is a list of rows. The first row holds the names of the
variables, in alphabetical order, followed by `"Result"`. Each other row
holds one assignment of the variables and the value of the expression,
from all `False` to all `True`. With more than 10 variables (1024 rows),
`truthTable` stays unevaluated.

```epsil
truthTable(A && B)
// ➔ [["A","B","Result"],["False","False","False"],["False","True","False"],["True","False","False"],["True","True","True"]]
truthTable(!A)
// ➔ [["A","Result"],["False","True"],["True","False"]]
```

### MathJSON

`["TruthTable", expression]`. The names in the first row are strings.

```json example
["TruthTable", ["And", "A", "B"]]
// ➔ ["List", ["List", "'A'", "'B'", "'Result'"],
//      ["List", "False", "False", "False"], ["List", "False", "True", "False"],
//      ["List", "True", "False", "False"], ["List", "True", "True", "True"]]
```

## PrimeImplicants

#### Prime implicants and minimal normal forms

`primeImplicants`, `primeImplicates`, `minimalDNF` and `minimalCNF` use the
Quine-McCluskey algorithm. With more than 12 variables, they stay
unevaluated.

A **prime implicant** of an expression is a conjunction of literals that
implies the expression and that is no longer an implicant when any literal
is removed from it. The result is a list of them.

```epsil
primeImplicants((A && B) || (A && !B))
// ➔ [A]
primeImplicants(A || B)
// ➔ [B,A]
primeImplicants(xor(A, B))
// ➔ [!A && B,A && !B]
primeImplicants((A && B) || (!A && C) || (B && C))
// ➔ [!A && C,B && C,A && B]
```

A contradiction has no prime implicants.

```epsil
primeImplicants(A && !A)
// ➔ []
```

### MathJSON

`["PrimeImplicants", expression]`.

```json example
["PrimeImplicants", ["Xor", "A", "B"]]
// ➔ ["List", ["And", ["Not", "A"], "B"], ["And", "A", ["Not", "B"]]]
```

## PrimeImplicates

A **prime implicate** of an expression is a disjunction of literals that
the expression implies and that is no longer an implicate when any literal
is removed from it. Prime implicates are the dual of prime implicants: they
are the clauses of a minimal CNF. The result is a list of them. See
[Prime implicants and minimal normal forms](#prime-implicants-and-minimal-normal-forms).

```epsil
primeImplicates(A && B)
// ➔ [A,B]
primeImplicates(A || B)
// ➔ [A || B]
primeImplicates(xor(A, B))
// ➔ [A || B,!A || !B]
```

### MathJSON

`["PrimeImplicates", expression]`.

```json example
["PrimeImplicates", ["And", "A", "B"]]
// ➔ ["List", "A", "B"]
```

## MinimalDNF

`minimalDNF` finds the prime implicants of the expression and selects a
minimal cover of them: the result is a DNF with the fewest conjunctions.
[`toDNF`](/reference/logic/#todnf) does not guarantee that. See
[Prime implicants and minimal normal forms](#prime-implicants-and-minimal-normal-forms).

```epsil
minimalDNF((A && B) || (A && !B) || (!A && B))
// ➔ B || A
minimalDNF((A && B) || (A && !B))
// ➔ A
minimalDNF((A && B) || (!A && C) || (B && C))
// ➔ !A && C || A && B
minimalDNF(A || !A)
// ➔ "True"
```

### MathJSON

`["MinimalDNF", expression]`.

```json example
["MinimalDNF", ["Or", ["And", "A", "B"], ["And", "A", ["Not", "B"]]]]
// ➔ "A"
```

## MinimalCNF

`minimalCNF` finds the prime implicates of the expression and selects a
minimal cover of them: the result is a CNF with the fewest disjunctions.
[`toCNF`](/reference/logic/#tocnf) does not guarantee that. See
[Prime implicants and minimal normal forms](#prime-implicants-and-minimal-normal-forms).

```epsil
minimalCNF((A || B) && (A || !B))
// ➔ A
minimalCNF(xor(A, B))
// ➔ (A || B) && (!A || !B)
```

### MathJSON

`["MinimalCNF", expression]`.

```json example
["MinimalCNF", ["And", ["Or", "A", "B"], ["Or", "A", ["Not", "B"]]]]
// ➔ "A"
```
