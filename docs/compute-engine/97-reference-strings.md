---
title: Strings and Text
slug: /compute-engine/reference/strings/
description: "Strings and text in the Compute Engine: strings as indexed collections of characters, the character type, grapheme clusters, Unicode scalars and encodings."
---

## Introduction

### Strings

A string is a sequence of characters such as <span style={{fontSize: "1.2rem"}}>`"Hello, 🌍!"`</span> or <span style={{fontSize: "1.2rem"}}>`"Simplify(👨‍🚀 × ⚡️) → 👨‍🎤"`.</span>

A string is an **indexed collection of characters**. Its elements are the
**grapheme clusters** of the string — what a reader perceives as individual
characters — so a string can be counted, indexed (1-based, like every other
indexed collection), iterated, and searched with the ordinary collection
operators.

```json example
["Length", {str: "shop"}]
// ➔ 4

["At", {str: "abc"}, 2]
// ➔ "b"

["Contains", {str: "abc"}, {str: "b"}]
// ➔ "True"
```

In Epsil:

```epsil
Length("shop")                     // ➔ 4
"abc"[2]                           // ➔ "b"
isDigit(c) = c in "0123456789"     // a character-membership test
isDigit("7")                       // ➔ True
```

A grapheme cluster is *not* the same thing as a Unicode scalar (a code point),
and neither is the same thing as a byte in an encoding. A string offers all
three views; the collection view is the grapheme one, and the other two are
reached with the explicit conversions described in
[Views of a string](#views-of-a-string).

For example:

- The character `é` can be represented as one Unicode scalar (`U+00E9`) or
  two scalars (`U+0065` + `U+0301`, i.e. `e` + combining acute). Both are one
  grapheme cluster, and strings are normalized to Unicode **NFC** at
  construction, so both produce the same string value with `Length` 1.
- The emoji `👨‍🚀` is one grapheme cluster made of three scalars
  (`[U+1F468, U+200D, U+1F680]`). In UTF-8 it is eleven bytes
  (`[240, 159, 145, 168, 226, 128, 141, 240, 159, 154, 128]`); in UTF-16 it is
  five code units (`[55357, 56424, 8205, 55357, 56960]`). Its `Length` is 1.

```live
const s = ce.string("Hello, 🌍!");
console.info(ce.function("Length", [s]).evaluate().json);
console.info(ce.function("Utf8", [s]).evaluate().json);
```

**Membership is character membership, not substring search.** `c in s` (that
is, `["Element", c, s]`, and equivalently `Contains`) asks whether `c` is one
of the string's characters, exactly as it does for a list. `"ab"` is a
*substring* of `"abc"`, not an element of it:

```json example
["Contains", {str: "abc"}, {str: "b"}]
// ➔ "True"

["Contains", {str: "abc"}, {str: "ab"}]
// ➔ "False"
```

Substring search is a different operation and needs a different operator: the
contiguous-subsequence family [`RangeOf`](#rangeof),
[`ContainsSequence`](#containssequence), [`StartsWith`](#startswith) and
[`EndsWith`](#endswith), which read their second argument as a *sequence* of
elements rather than as one element.

```json example
["ContainsSequence", {str: "abc"}, {str: "ab"}]
// ➔ "True"
```

**Well-formedness.** A native JavaScript string can hold an unpaired UTF-16
surrogate, on which segmentation, UTF-8 encoding and equality are undefined.
Every string entering the engine is scanned once and each unpaired surrogate
is replaced with `U+FFFD` (REPLACEMENT CHARACTER), so every string value is
well-formed Unicode and every operation on it is total.

### The `character` type

A **character** is exactly one user-perceived character: one NFC-normalized
grapheme cluster. It is a `scalar`, alongside `boolean` and `number`.

`character` and `string` are **disjoint siblings**: a character is not a
one-element string, and a string is not a character. This is what makes a
character a leaf — it has no elements, so operations that descend into a
collection terminate on it structurally.

`string` is likewise **not** an alias for `list<character>`. The two are
siblings under `indexed_collection<character>`: same element type, same
iteration interface, neither a subtype of the other. They differ because
grapheme segmentation is not stable under concatenation — joining an `e` and
a lone combining acute produces the single character `é`, so a two-element
list of characters becomes a one-character string.

| Type                              | Relationship                                |
| :-------------------------------- | :------------------------------------------ |
| `character`                       | `character <: scalar`                       |
| `string`                          | `string <: indexed_collection<character>`   |
| `string` vs `scalar`              | **not** a subtype — a `scalar` is a `boolean`, a `character` or a `number` |
| `string` vs `list<character>`     | siblings; neither matches the other         |
| `string` vs `character`           | disjoint; neither matches the other         |

**Getting a character.** Use [`CharacterFrom`](#characterfrom), or let a
string literal narrow: in a position that expects a `character`, a literal
that is exactly one grapheme cluster becomes that character, and a literal
that is not is a type error. Narrowing applies to **literals only** — a
`string`-typed expression does not implicitly convert, so write
`CharacterFrom(s)`.

**Equality and ordering.** Two characters are equal when their NFC scalar
sequences are identical. A character also compares equal to the one-character
*string* with the same content: this is a value law (equal scalar sequences
are equal values), and it is what makes `c == "a"`, `"a" in "abc"` and
`IndexOf("abc", "b")` work without a conversion at every call site. The types
stay disjoint regardless. Ordering is by the code-point sequence of the
cluster; it is deliberately **not** locale-aware, and never will be — engine
identity, membership and hashing must be deterministic on every host.

**Serialization.** MathJSON has string literals but no character literal, so
a character's wire form is the call form `["CharacterFrom", "'x'"]`, which
canonicalizes back to the identical character:

```json example
["Characters", {str: "abc"}]
// ➔ ["List", ["CharacterFrom", "'a'"], ["CharacterFrom", "'b'"], ["CharacterFrom", "'c'"]]
```

A narrowed literal does **not** survive serialization as a character; the
call form is the wire format.

### Strings stay whole under broadcast and flattening

A string is an atom for the operations that spread over a collection:

- **Broadcast atomicity.** A broadcasting operator applied to a string
  receives the whole string, not its characters — otherwise every such
  operator, including `String` itself, would start mapping over graphemes,
  and a lambda with a scalar parameter would map instead of being applied.

  ```json example
  ["String", {str: "ab"}, 1]
  // ➔ "ab1"        (not ["ab1", "ab1"], and not ["a1", "b1"])
  ```

- **`Flatten` atomicity.** Deep-descent walkers treat a string as a leaf:

  ```json example
  ["Flatten", ["List", {str: "ab"}, {str: "cd"}]]
  // ➔ ["ab", "cd"]

  ["Flatten", {str: "ab"}]
  // ➔ ["ab"]
  ```

### Which operations return a string

Whether a collection operator gives back a `string` or a `list` follows from
what the operator does, not from a list of exceptions:

- **Element-preserving operators** — those whose result is a subset or a
  reordering of the input's own characters — return a **string** for a string
  input: `Reverse`, `Rest`, `Most`, `Take`, `Drop`, `Slice`, `Unique`,
  `Sort`, `RotateLeft`, `RotateRight`, `Filter`, `TakeWhile`, `DropWhile`,
  `Dedup`, `DeleteAt`, `RandomShuffle`, `RandomSample`.

  ```json example
  ["DeleteAt", {str: "abcdef"}, 2]
  // ➔ "acdef"

  ["RandomShuffle", {str: "abcdef"}]
  // ➔ "dbeafc"        (a string, not a list of characters)
  ```

- **Chunking and combinatorial operators** — those whose result is a *list of*
  runs, each run being a contiguous stretch, a reordering or a subset of the
  input's own characters — return a **`list<string>`** for a string input:
  `Chunk`, `Partition` (chunk, sliding-window and predicate forms), `ChunkBy`,
  `SlidingWindow`, `Permutations`, `Combinations`. `Tally` is not one of
  these: its first component holds the *distinct elements* paired with their
  counts, so its values stay characters.

  ```json example
  ["Chunk", {str: "abcdef"}, 2]
  // ➔ ["abc", "def"]

  ["SlidingWindow", {str: "abcd"}, 2]
  // ➔ ["ab", "bc", "cd"]

  ["Tally", {str: "banana"}]
  // ➔ (["b", "a", "n"], [1, 3, 2])
  ```

- **Element-transforming higher-order operators** — `Map`, `FlatMap`, `Scan`,
  `Zip` — return a **list**, always, even when the callback returns
  characters. There is no type-level rule for "this callback produces
  characters" worth its complexity; rejoin explicitly with
  [`String`](#string) or [`StringJoin`](#stringjoin).

  ```json example
  ["Map", ["Function", "c", "c"], {str: "abc"}]
  // ➔ ["a", "b", "c"]

  ["String", ["Map", ["Function", "c", "c"], {str: "abc"}]]
  // ➔ "abc"
  ```

- Operators whose result is not a collection of the source's kind — `Length`,
  `IsEmpty`, `Contains`, `Count`, `Any`, `All`, `IndexOf`, `At`, `First`,
  `Last`, `Position`, `Find`, `Reduce`, `Fold` — behave on a string exactly
  as they do on any other indexed collection.

- Set operators read a string operand as *its characters*:
  `["Union", ["Set", 1], {str: "ab"}]` is `Set(1, "a", "b")`. `SetMinus` is
  the exception by design: its trailing operands name **values** to exclude,
  so `SetMinus(S, "ab")` removes the string `"ab"` from `S`, not the
  characters `a` and `b`.

- Numeric aggregators (`Sum`, `Product`, `Mean`, `Max`, `GCD`, …) do not
  expand a string into characters. A character is not a number, so these
  either produce a typed error or stay symbolic — never a silent wrong
  answer.

#### The re-segmentation caveat

A string-preserving operator segments the string, operates on the characters,
then **joins and re-segments** the result. Joining can merge adjacent
characters, so the result may have a different character count than the
input. Three consequences, all inherent to grapheme segmentation rather than
defects:

- `String(Characters(s)) == s` — always.
- `Characters(String(cs))` may have **fewer** elements than `cs`. Joining the
  character `e` and the lone combining acute `◌́` — each its own cluster —
  yields the single character `é`.
- A string-preserving `Reverse` can therefore change the character count: a
  combining mark that followed one base character can land next to another.

If you need the segmentation frozen — a list whose element count cannot
change under later operations — take it explicitly with
[`Characters`](#characters).

### Views of a string

The default view of a string is its characters. When a different
decomposition is needed, ask for it explicitly:

| View | Operator | Element | When to use it |
| :--- | :--- | :--- | :--- |
| Characters | [`Characters`](#characters) (synonym `GraphemeClusters`) | `character` | The safest decomposition, and the one iteration and indexing already use. Use it to *freeze* the segmentation into a list. Not guaranteed stable across Unicode versions; the most expensive to compute. |
| Unicode scalars | [`UnicodeScalars`](#unicodescalars) | `integer` code point | Stable and fast. Use for code-point-level work. Not suitable for substring search or display. |
| UTF-8 | [`Utf8`](#utf8) | `integer` byte | Encoding-level work: byte buffers, I/O, hashing. |
| UTF-16 | [`Utf16`](#utf16) | `integer` code unit | Encoding-level work against a UTF-16 host. |
| Substrings | [`StringSplit`](#stringsplit) | `string` | Splitting on whitespace or a separator. `StringSplit(s, "")` splits into one-character **strings** (not characters), the same segmentation `Characters` uses. |

Unicode scalars are **not** an encoding: one grapheme cluster may be several
scalars, and each scalar maps to different byte sequences depending on the
encoding.

### Unicode-version stability

Grapheme cluster boundaries are defined by
[Unicode® Standard Annex #29](https://unicode.org/reports/tr29/) and can
change when the host's Unicode data (ICU) is updated. Two consequences worth
planning for:

- Character counts of exotic clusters can drift between hosts, so avoid
  pinning them in snapshot tests without a comment naming the Unicode version
  assumed.
- Literal narrowing is decided by the same segmenter, so an ICU upgrade that
  changes a literal's cluster count changes whether that source type-checks.
  Unicode scalars and their UTF-8/UTF-16/UTF-32 encodings are fixed and
  stable; only the grapheme view moves.

### Compiling string operations

Grapheme segmentation is not available on every compilation target, so each
target either implements a string operation grapheme-correctly or **fails
closed** with a diagnostic — never by silently counting code units.

| Operation | JavaScript | Python | GLSL/WGSL |
| :--- | :--- | :--- | :--- |
| `Length(s)`, `At(s, i)` / `s[i]` | Compiled grapheme-aware (never the host `.length`) | Not supported | Not supported |
| Iteration-derived (`Map`, `Filter`, `Reduce`, `Any`, `All`, `Contains`, `IndexOf`, … over a string) | Segmented, then the ordinary list lowering | Not supported | Not supported |
| String-preserving operators (`Reverse`, `Take`, …) | Segment, operate, rejoin | Not supported | Not supported |
| `character` values, `String(c)`, `==`, `<` | A one-character host string; equality is `===`, ordering by code point | Not supported | Not supported |
| `CharacterFrom(x)` for a non-literal `x` | Not supported (needs a runtime cluster count) | Not supported | Not supported |

Python has no grapheme segmentation in its standard library (`len()` counts
code points), so string collection operations report a target-capability
diagnostic rather than compiling to something subtly wrong. GLSL and WGSL
have no string support at all, and string-typed operands are rejected as
before.

<ReadMore path="/compute-engine/guides/compiling/" >
Read more about **compiling expressions**<Icon name="chevron-right-bold" />
</ReadMore>

### Annotated Expressions

An **annotated expression** is an expression that carries additional visual or 
semantic metadata that is not material to the interpretation of an expression 
such as text color and size or other typographic variations, a tooltip or a hyperlink
data to link to a web page.

While annotated expressions can be applied to strings, they can also
be used to annotate mathematical expressions, such as variables, operators, or
functions, to provide additional context or visual emphasis.

For example, an annotated expression can be used to highlight a specific
part of a mathematical expression:

```json example
["Equal", 
  "circumference", 
  ["Multiply", 2, ["Annotated", "Pi", {"dict": {"color": "blue"}}], "r"]
]
// ➔ Pi (in blue)
```

which would correspond to the LaTeX expression:

```latex
\mathrm{circumference} = 2 \cdot \textcolor{blue}{\pi} \cdot r
```

Annotated expressions are similar to attributed strings in other systems.

When `\textcolor` (or `\color`) wraps a bare **operator** rather than an operand
— for example `x \textcolor{red}{=} y` — the operator is parsed as usual
(`["Equal", "x", "y"]`) and the color is dropped: MathJSON has no way to attach
an `Annotated` wrapper to a lone operator glyph. Coloring an operand (such as
`\textcolor{red}{x + 1}`) still produces an `Annotated` expression.



### Text Expressions

A `["Text"]` expression is a sequence of strings, annotated expressions or
other `["Text"]` expressions. It is used to represent formatted text content, 
for example from a LaTeX expression like `\text{Hello \mathbf{world}}`.

What would happen if you used a string expression instead of a text expression?

The arguments of a `["String"]` expression get converted to their string
representation, then joined together with no spaces. The text representation
of an annotated expression is the name of the expression, not its formatted
version. For example, `["Annotated", "world", {"dict": {"color": "blue"}}]` would
be serialized to LaTeX as `\mathrm{Annotated}(\text{world}, {color \to "blue"})`, which is not what you want.

The arguments of a `["Text"]` expression remain a sequence of elements. When 
serialized to LaTeX, the elements are serialized to appropriate LaTeX commands
to preserve their formatting and structure.


```js example
const stringExpr = ce.expr([
  "String", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(stringExpr.latex);
// ➔ "\text{\mathrm{Hello}\textcolor{blue}{\mathrm{world}}}"

const textExpr = ce.expr([
  "Text", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(textExpr.latex);
// ➔ "\mathrm{Hello}\textcolor{blue}{\mathrm{world}}"
```

## Functions

<nav className="hidden">
### CharacterFrom
</nav>

<FunctionDefinition name="CharacterFrom">

<Signature name="CharacterFrom" returns="character">_s_: string</Signature>

The character denoted by _s_. After NFC normalization, _s_ must segment to
exactly **one** grapheme cluster; an empty or multi-character string is an
error value, never a silent truncation.

"One character" means one **cluster**, not one code point: a precomposed or
decomposed `é`, a ZWJ emoji sequence and a regional-indicator flag all
qualify.

```json example
["CharacterFrom", {str: "x"}]
// ➔ "x"                 (a character, not a string)

["CharacterFrom", {str: "👨‍👩‍👧"}]
// ➔ "👨‍👩‍👧"              (one grapheme cluster)

["CharacterFrom", {str: "ab"}]
// ➔ Error: incompatible-type — expected character, got string
```

`CharacterFrom` is also the **wire form** of a character value: a character
serializes as `["CharacterFrom", "'x'"]` and boxing that call form gives back
the identical character. `CharacterFrom(String(c)) == c` holds for every
character `c`, since one cluster always re-segments to itself.

**See also**: [`String`](#string), [`Characters`](#characters).

</FunctionDefinition>

<nav className="hidden">
### String
</nav>

<FunctionDefinition name="String">

<Signature name="String" returns="string">any*</Signature>

A string created by joining its arguments. The arguments are converted to 
their default string representation.


```json example
["String", {str: "Hello"}, {str: ", "}, {str: "🌍"}, {str: "!"}]
// ➔ "Hello, 🌍!" 

["String", 42, {str: " is the answer"}]
// ➔ "42 is the answer"  
```

Called with **exactly one** finite collection, `String` **joins** that
collection's elements instead of broadcasting over them. This is what makes
the round-trip law hold:

```json example
["String", ["Characters", {str: "abc"}]]
// ➔ "abc"

["String", ["CharacterFrom", "'x'"]]
// ➔ "x"
```

With more than one argument the ordinary coercing-join-with-broadcast
semantics apply, and a **string** operand stays whole:

```json example
["String", {str: "x"}, ["List", 1, 2]]
// ➔ ["x1", "x2"]

["String", {str: "ab"}, 1]
// ➔ "ab1"
```

A single non-finite collection argument leaves the expression unevaluated.

</FunctionDefinition>

<nav className="hidden">
### Join
</nav>

<FunctionDefinition name="Join">

<Signature name="Join" returns="string">..._strings_: string</Signature>
<Signature name="Join" returns="collection">...collection</Signature>

**`Join` is variadic concatenation.** When every argument is a string, the
result is the strings run together, as a `string`:

```json example
["Join", {str: "ab"}, {str: "cd"}]
// ➔ "abcd"

["Join", {str: "ab"}, {str: "cd"}, {str: "ef"}]
// ➔ "abcdef"
```

This is the same `Join` that concatenates any two collections (see the
[collections reference](/compute-engine/reference/collections/#join)); the
string result is an overload of it, not a separate operator. As soon as one
argument is *not* a string the generic arm applies and the result is a list of
the operands' elements — which, for a string operand, are its characters:

```json example
["Join", {str: "ab"}, ["Characters", {str: "cd"}]]
// ➔ ["a", "b", "c", "d"]        (a list<character>)
```

Concatenation joins and **re-segments**, so the result can have fewer
characters than the operands together (see
[the re-segmentation caveat](#the-re-segmentation-caveat)): joining `"e"` and
a lone combining acute produces the single character `"é"`.

In Epsil, string interpolation is the idiomatic concatenation of a few pieces:
`"\(a)\(b)"`. It differs from `Join` in strictness — interpolation coerces
each hole to its default string representation, `Join` requires strings.

**See also**: [`StringJoin`](#stringjoin) for joining a *collection* of
strings, optionally with a separator; [`String`](#string) for a coercing join.

</FunctionDefinition>

<nav className="hidden">
### StringJoin
</nav>

<FunctionDefinition name="StringJoin">

<Signature name="StringJoin" returns="string">_xs_: collection&lt;string | character&gt;, _separator_: string?</Signature>

**`StringJoin` joins one collection**, optionally inserting a _separator_
between consecutive elements. It is the counterpart of
[`StringSplit`](#stringsplit), and the counterpart of Python's
`separator.join(parts)`.

```json example
["StringJoin", ["List", {str: "a"}, {str: "b"}, {str: "c"}]]
// ➔ "abc"

["StringJoin", ["List", {str: "a"}, {str: "b"}, {str: "c"}], {str: ", "}]
// ➔ "a, b, c"

["StringJoin", ["Characters", {str: "abc"}]]
// ➔ "abc"
```

An empty collection gives `""`; a one-element collection gives that element.
Unlike [`String`](#string), which coerces any operand to its default string
representation, `StringJoin` is **strict**: an element that is neither a
string nor a character is rejected — as an `incompatible-type` error where the
operand's own type shows it, otherwise by leaving the expression unevaluated.
A non-finite collection also leaves the expression unevaluated.

```json example
["StringJoin", ["List"]]
// ➔ ""

["StringJoin", ["List", {str: "a"}, 1]]
// ➔ Error: incompatible-type — expected collection<character | string>
```

A **string** subject is a collection of its characters, so joining it with a
separator interleaves the separator between them — the same reading Python
gives `sep.join(s)`:

```json example
["StringJoin", {str: "abc"}, {str: "-"}]
// ➔ "a-b-c"
```

A `character` is *not* a collection, so it must be wrapped:
`["StringJoin", ["CharacterFrom", "'a'"]]` is a type error; write
`["String", ["CharacterFrom", "'a'"]]` or put the character in a list.

:::warning[Breaking change]
`StringJoin` used to be **variadic** — `StringJoin("ab", "cd")` meant
`"abcd"`. It no longer is, and because a string is now a collection of
characters, that same call is still accepted and now means something else:
`"acdb"` (the characters of `"ab"` joined with the separator `"cd"`). This
change is **silent** — no error, a different answer — so audit every
multi-argument `StringJoin` call.

Migration: for concatenation of a fixed number of strings use
[`Join`](#join), `Join(a, b)`, or Epsil interpolation, `"\(a)\(b)"`. Keep
`StringJoin` only where the subject really is a collection to be joined.
:::

</FunctionDefinition>


<nav className="hidden">
### StringFrom
</nav>

<FunctionDefinition name="StringFrom">

<Signature name="StringFrom" returns="string">any, _format_:string?</Signature>

Convert the argument to a string, using the specified _format_.

| _format_ | Description |
| :--- | :--- |
| _(omitted)_ | The argument's default string representation |
| `utf-8` | The argument is a collection of UTF-8 bytes |
| `utf-16` | The argument is a collection of UTF-16 code units |
| `unicode-scalars` | The argument is a collection of Unicode scalars (same as UTF-32), or a single Unicode scalar |

The three explicit formats require a collection of integers (or, for
`unicode-scalars`, a single integer). A **string** argument is a type error:
a string is a collection of characters, not of code units, so decoding one as
bytes would be nonsense. Convert it with [`Utf8`](#utf8) /
[`Utf16`](#utf16) / [`UnicodeScalars`](#unicodescalars) first.

For example: 

```json example
["StringFrom", ["List", 72, 101, 108, 108, 111], {str: "utf-8"}]
// ➔ "Hello"

["StringFrom", ["List", 55357, 56607], {str: "utf-16"}]
// ➔ "🔟"

["StringFrom", 128287, {str: "unicode-scalars"}]
// ➔ "🔟"

["StringFrom", ["List", 127467, 127479], {str: "unicode-scalars"}]
// ➔ "🇫🇷"
```

</FunctionDefinition>


<nav className="hidden">
### Utf8
</nav>

<FunctionDefinition name="Utf8">
<Signature name="Utf8" returns="list<integer>">string</Signature>

Return a list of UTF-8 code points for the given _string_.

**Note:** The values returned are UTF-8 bytes, not Unicode scalar values.

```json example
["Utf8", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]  

["Utf8", {str: "👩‍🎓"}]
// ➔ ["List", 240, 159, 145, 169, 226, 128, 141, 240, 159, 142, 147]
```

**To create a string from UTF-8 code points**, use the `["StringFrom", _list_, "utf-8"]` function.

**See also**: [`Utf16`](#utf16), [`UnicodeScalars`](#unicodescalars) and [`Characters`](#characters).

</FunctionDefinition>


<nav className="hidden">
### Utf16
</nav>

<FunctionDefinition name="Utf16">
<Signature name="Utf16" returns="list<integer>">string</Signature>

Return a list of UTF-16 code points for the given _string_.

**Note:** The values returned are UTF-16 code units, not Unicode scalar values.

```json example
["Utf16", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]  

["Utf16", {str: "👩‍🎓"}]
// ➔ ["List", 55357, 56425, 8205, 55356, 57235]
```

**To create a string from UTF-16 code units**, use the `["StringFrom", _list_, "utf-16"]` function.

**See also**: [`Utf8`](#utf8), [`UnicodeScalars`](#unicodescalars) and [`Characters`](#characters).

</FunctionDefinition>


<nav className="hidden">
### UnicodeScalars
</nav>

<FunctionDefinition name="UnicodeScalars">
<Signature name="UnicodeScalars" returns="list<integer>">string</Signature>

A **Unicode scalar** is any valid Unicode code point, represented as a number 
between `U+0000` and `U+10FFFF`, excluding the surrogate range 
(`U+D800` to `U+DFFF`). In other words, Unicode scalars correspond exactly to 
UTF-32 code units.


This function returns the sequence of Unicode scalars (code points) that make 
up the string. Note that some characters perceived as a single visual unit 
(grapheme clusters) may consist of multiple scalars. For example, the emoji 
<span style={{fontSize: "1.2em"}}>👩‍🚀</span> is a single grapheme but is 
composed of several scalars.

```json example
["UnicodeScalars", {str: "Hello"}]
// ➔ ["List", 72, 101, 108, 108, 111]  

["UnicodeScalars", {str: "👩‍🎓"}]
// ➔ ["List", 128105, 8205, 127891]
```

**To create a string from Unicode scalars**, use the `["StringFrom", _list_, "unicode-scalars"]` function.

**See also**: [`Utf8`](#utf8), [`Utf16`](#utf16), and [`Characters`](#characters).

</FunctionDefinition>



<nav className="hidden">
### Characters
</nav>

<FunctionDefinition name="Characters">
<Signature name="Characters" returns="list<character>">string</Signature>

A **grapheme cluster** is the smallest unit of text that a reader perceives 
as a single character. It may consist of one or more **Unicode scalars** 
(code points). 

For example, the character **é** can be a single scalar (`U+00E9`) or a 
sequence of scalars (**e** `U+0065` + **combining acute** `U+0301`), 
but both form a single grapheme cluster. 

Here, **NFC** (Normalization Form C) refers to the precomposed form of characters, while **NFD** (Normalization Form D) refers to the decomposed form where combining marks are used.

Similarly, complex emojis (<span style={{fontSize: "1.2rem"}}>👩‍🚀</span>, <span style={{fontSize: "1.2rem"}}>🇫🇷</span>)
are grapheme clusters composed of multiple scalars.

The exact definition of grapheme clusters is determined by the Unicode Standard 
([UAX #29](https://unicode.org/reports/tr29/)) and may evolve over time as new 
characters, scripts, or emoji sequences are introduced. In contrast, Unicode 
scalars and their UTF-8, UTF-16, or UTF-32 encodings are fixed and stable across Unicode versions.


The table below illustrates the difference between grapheme clusters and Unicode scalars:

| String        | Grapheme Clusters  | Unicode Scalars (Code Points)      |
|:-------------|:--------------------|:------------------------------------|
| <span style={{fontSize: "1.3rem"}}>`é`</span> (NFC)     | <span style={{fontSize: "1.3rem"}}>`["é"]`</span>              | `[233]`                              |
| <span style={{fontSize: "1.3rem"}}>`é`</span> (NFD)    | <span style={{fontSize: "1.3rem"}}>`["é"]`</span>              | `[101, 769]`                         |
| <span style={{fontSize: "1.3rem"}}>`👩‍🎓`</span>         | <span style={{fontSize: "1.3rem"}}>`["👩‍🎓"]`</span>           | `[128105, 8205, 127891]`             |


This function splits a string into a **list of characters** — the
user-perceived characters of the string. It is the explicit projection that
*freezes* the current segmentation into a genuine list:

```json example
["Characters", {str: "Hello"}]
// ➔ ["H", "e", "l", "l", "o"]

["Characters", {str: "👩‍🎓"}]
// ➔ ["👩‍🎓"]

["UnicodeScalars", {str: "👩‍🎓"}]
// ➔ ["List", 128105, 8205, 127891]
```

The elements are `character` values, so the MathJSON of the result uses the
`CharacterFrom` wire form:

```json example
["Characters", {str: "ab"}]
// ➔ ["List", ["CharacterFrom", "'a'"], ["CharacterFrom", "'b'"]]
```

Iterating a string directly gives the same characters, so `Characters` is
needed only when you want the list itself — for instance to keep the
segmentation from changing under a later join (see
[the re-segmentation caveat](#the-re-segmentation-caveat)).

`String(Characters(s)) == s` always holds. The converse does not:
`Characters(String(cs))` may have fewer elements than `cs`.

For more details on how grapheme cluster boundaries are determined, 
see [Unicode® Standard Annex #29](https://unicode.org/reports/tr29/).

**Synonym**: `GraphemeClusters` — the original name of this function, kept
for compatibility.

**See also**: [`CharacterFrom`](#characterfrom), [`StringSplit`](#stringsplit), [`Utf8`](#utf8), [`Utf16`](#utf16), and [`UnicodeScalars`](#unicodescalars).

</FunctionDefinition>


<nav className="hidden">
### StringSplit
</nav>

<FunctionDefinition name="StringSplit">
<Signature name="StringSplit" returns="list<string>">string</Signature>
<Signature name="StringSplit" returns="list<string>">string, _separator_:string</Signature>

Split a string into a list of substrings.

With no _separator_, the string is split on runs of whitespace, and empty
parts are dropped. Whitespace is defined as the code points with the Unicode
`White_Space` property (`U+0009`–`U+000D`, `U+0020`, `U+0085`, `U+00A0`,
`U+1680`, `U+2000`–`U+200A`, `U+2028`, `U+2029`, `U+202F`, `U+205F`,
`U+3000`) — the definition does not depend on the host's interpretation of
`\s`.

With a _separator_ string, the string is split on each occurrence of the
separator, and empty parts are kept.

```json example
["StringSplit", {str: "the quick  brown fox"}]
// ➔ ["the", "quick", "brown", "fox"]

["StringSplit", {str: "a,b,,c"}, {str: ","}]
// ➔ ["a", "b", "", "c"]
```

An **empty** _separator_ splits into grapheme clusters — the same
segmentation [`Characters`](#characters) uses — but the parts are
one-character **strings**, not `character` values:

```json example
["StringSplit", {str: "abc"}, {str: ""}]
// ➔ ["a", "b", "c"]        (a list<string>)
```

**To split into characters**, use [`Characters`](#characters), or simply
iterate or index the string.

**See also**: [`Characters`](#characters).

</FunctionDefinition>


### Searching for a substring

Substring search is **contiguous-subsequence** search, and it is generic: the
same four operators work on any indexed collection, and a string is just the
case where the elements are characters. They are documented here because
strings are where they are reached for most; the
[collections reference](/compute-engine/reference/collections/#rangeof)
covers the list cases.

Two things distinguish this family from [`Contains`](/compute-engine/reference/collections/#contains)
and [`IndexOf`](/compute-engine/reference/collections/#indexof), which search
for **one element**: here the second argument is always read as a *sequence*
of elements, and matching is **character-wise** on both sides.

Character-wise matching is what makes the family grapheme-safe without a
special rule: a needle can never match across a cluster boundary, because the
comparison is between whole characters.

```json example
["RangeOf", {str: "x́y"}, {str: "x"}]
// ➔ "Nothing"       — the subject's characters are [x́, y], and x ≠ x́

["RangeOf", {str: "👨‍👩‍👧"}, {str: "👩"}]
// ➔ "Nothing"       — the subject is ONE character (a ZWJ family cluster)

["RangeOf", {str: "ée"}, {str: "e"}]
// ➔ ["Range", 2, 2] — the leading `e` is inside the `é` cluster
```

(The first example is `x` + U+0301 COMBINING ACUTE, which has no precomposed
NFC form; the third is `e` + U+0301, which does. A code-unit search would find
a match in all three.)

<nav className="hidden">
### RangeOf
</nav>

<FunctionDefinition name="RangeOf">

<Signature name="RangeOf" returns="range | nothing">_xs_:indexed_collection, _needle_:indexed_collection</Signature>
<Signature name="RangeOf" returns="range | nothing">_xs_:indexed_collection, _needle_:indexed_collection, _from_:integer</Signature>

The **span** of the first occurrence of _needle_ as a contiguous subsequence
of _xs_, as a 1-based inclusive index [`range`](/compute-engine/reference/collections/#range),
or `Nothing` when the needle does not occur.

```json example
["RangeOf", {str: "hello world"}, {str: "o w"}]
// ➔ ["Range", 5, 7]

["RangeOf", {str: "abc"}, {str: "b"}]
// ➔ ["Range", 2, 2]

["RangeOf", {str: "abc"}, {str: "z"}]
// ➔ "Nothing"
```

A span rather than a start index, because a span feeds slicing and
replacement directly:

```json example
["Slice", {str: "hello world"}, ["RangeOf", {str: "hello world"}, {str: "o w"}]]
// ➔ "o w"
```

The optional _from_ is the index to start searching at (default 1). The
returned span is always in the **original** subject's indices, so scanning for
the next occurrence is `RangeOf(xs, needle, Last(r) + 1)` for non-overlapping
matches (or `First(r) + 1` to allow overlaps), and finding every occurrence is
that loop run until it answers `Nothing`:

```json example
["RangeOf", {str: "abcabc"}, {str: "bc"}]
// ➔ ["Range", 2, 3]

["RangeOf", {str: "abcabc"}, {str: "bc"}, 4]
// ➔ ["Range", 5, 6]

["RangeOf", {str: "abcabc"}, {str: "bc"}, 6]
// ➔ "Nothing"
```

Domain rules, chosen to make that loop terminate cleanly:

| Case | Result |
| :--- | :--- |
| Needle absent | `Nothing` |
| _from_ past the end of _xs_ | `Nothing` — never an error, since a match at the very end legitimately produces `Length(xs) + 1` |
| _from_ less than 1, or not an integer | An error value |
| Empty needle | An error value — an empty span is not representable (`["Range", 1, 0]` is the *descending* range `[1, 0]`, not an empty one) |
| Infinite or unknown-length subject or needle | The expression stays symbolic |

```json example
["RangeOf", {str: "abc"}, {str: ""}]
// ➔ Error: out-of-range — expected a non-empty needle

["RangeOf", {str: "abc"}, {str: "a"}, 0]
// ➔ Error: out-of-range — expected an index of 1 or more
```

The needle may be a sibling kind of the subject: searching a string with a
`list<character>` needle is well-typed, and the span is still in the string's
character indices.

```json example
["RangeOf", {str: "abc"}, ["Characters", {str: "bc"}]]
// ➔ ["Range", 2, 3]
```

**The defining law**, stated element-wise: when the needle is found,
`Slice(xs, RangeOf(xs, needle))` has the same element sequence as the needle.
It is deliberately not spelled `== needle`, because `Slice` is
kind-preserving: with a `list<character>` needle over a string subject the two
sides are a `string` and a `list<character>`, which are equal element by
element but are never `==` (the two types are disjoint siblings). When needle
and subject are the same kind, the stronger `==` does hold.

**See also**: [`ContainsSequence`](#containssequence),
[`StringReplace`](#stringreplace),
[`IndexOf`](/compute-engine/reference/collections/#indexof) for **element**
search.

</FunctionDefinition>

<nav className="hidden">
### ContainsSequence
</nav>

<FunctionDefinition name="ContainsSequence">

<Signature name="ContainsSequence" returns="boolean">_xs_:indexed_collection, _needle_:indexed_collection</Signature>

Whether _needle_ occurs in _xs_ as a contiguous subsequence. For a non-empty
needle this is `RangeOf(xs, needle)` not being `Nothing`.

```json example
["ContainsSequence", {str: "abc"}, {str: "bc"}]
// ➔ "True"

["ContainsSequence", {str: "abc"}, {str: "ac"}]
// ➔ "False"
```

Distinct from [`Contains`](/compute-engine/reference/collections/#contains),
which is element membership: `Contains("abc", "ab")` is `False` because
`"ab"` is not one of the string's characters.

An **empty** needle is `True` — the empty sequence is a subsequence of
everything. This is the one edge rule that deliberately diverges from
[`RangeOf`](#rangeof)'s, which must reject an empty needle because it has to
return a span.

```json example
["ContainsSequence", {str: "abc"}, {str: ""}]
// ➔ "True"
```

A non-finite subject or needle leaves the expression symbolic.

</FunctionDefinition>

<nav className="hidden">
### StartsWith
</nav>

<FunctionDefinition name="StartsWith">

<Signature name="StartsWith" returns="boolean">_xs_:indexed_collection, _prefix_:indexed_collection</Signature>

Whether _xs_ begins with _prefix_ as a contiguous subsequence.

```json example
["StartsWith", {str: "hello"}, {str: "he"}]
// ➔ "True"

["StartsWith", {str: "hello"}, {str: "el"}]
// ➔ "False"

["StartsWith", {str: "hello"}, {str: ""}]
// ➔ "True"
```

A prefix that would end in the middle of a grapheme cluster does not match:
`StartsWith("👨‍👩‍👧", "👨")` is `False`, because the subject's first (and only)
character is the whole family cluster.

</FunctionDefinition>

<nav className="hidden">
### EndsWith
</nav>

<FunctionDefinition name="EndsWith">

<Signature name="EndsWith" returns="boolean">_xs_:indexed_collection, _suffix_:indexed_collection</Signature>

Whether _xs_ ends with _suffix_ as a contiguous subsequence.

```json example
["EndsWith", {str: "hello"}, {str: "lo"}]
// ➔ "True"

["EndsWith", {str: "hello"}, {str: ""}]
// ➔ "True"
```

`EndsWith` has to inspect the tail, so in addition to the finiteness rule it
needs a **known length**: over a collection whose length is not known the
expression stays symbolic.

</FunctionDefinition>


### Transforming a string

<nav className="hidden">
### StringReplace
</nav>

<FunctionDefinition name="StringReplace">

<Signature name="StringReplace" returns="string">_s_:string, _target_:string, _replacement_:string</Signature>
<Signature name="StringReplace" returns="string">_s_:string, _target_:string, _replacement_:string, _count_:integer</Signature>

Replace occurrences of _target_ in _s_ with _replacement_. Occurrences are
found by the same character-wise matching [`RangeOf`](#rangeof) uses, scanning
left to right, non-overlapping.

```json example
["StringReplace", {str: "a-b-c"}, {str: "-"}, {str: "+"}]
// ➔ "a+b+c"

["StringReplace", {str: "a-b-c"}, {str: "-"}, {str: "+"}, 1]
// ➔ "a+b-c"

["StringReplace", {str: "banana"}, {str: "na"}, {str: ""}]
// ➔ "ba"
```

The scan walks the **original** subject and skips past each match's span, so
a replacement's own content is never re-matched:

```json example
["StringReplace", {str: "aa"}, {str: "a"}, {str: "aa"}]
// ➔ "aaaa"           (not an infinite expansion)
```

Matching is character-wise, so a target cannot match part of a cluster:

```json example
["StringReplace", {str: "x́y"}, {str: "x"}, {str: "z"}]
// ➔ "x́y"             (unchanged: the first character is x́, not x)
```

All occurrences are replaced by default; _count_ limits the replacements from
the left and must be a **positive** integer. An **empty** _target_ is an error
value: the host `replaceAll("", x)` behavior of inserting at every boundary is
a well-known surprise and is deliberately not inherited. An empty
_replacement_ is legal and means deletion. A non-string operand leaves the
expression unevaluated.

```json example
["StringReplace", {str: "abc"}, {str: ""}, {str: "x"}]
// ➔ Error: unexpected-argument — the target must not be empty

["StringReplace", {str: "abc"}, {str: "a"}, {str: "x"}, 0]
// ➔ Error: unexpected-argument — count must be a positive integer
```

Regular-expression matching is not available; _target_ is always a literal
sequence of characters.

</FunctionDefinition>

<nav className="hidden">
### Trim
</nav>

<FunctionDefinition name="Trim">

<Signature name="Trim" returns="string">_s_:string, _chars_:(character | string | collection&lt;character | string&gt;)?</Signature>
<Signature name="TrimStart" returns="string">_s_:string, _chars_:(character | string | collection&lt;character | string&gt;)?</Signature>
<Signature name="TrimEnd" returns="string">_s_:string, _chars_:(character | string | collection&lt;character | string&gt;)?</Signature>

Remove leading and/or trailing characters. `Trim` strips both ends,
`TrimStart` the beginning only, `TrimEnd` the end only.

With no _chars_, the characters removed are the Unicode `White_Space` set —
the same definition [`StringSplit`](#stringsplit) uses, so it does not depend
on the host's interpretation of `\s`.

```json example
["Trim", {str: "  hi  "}]
// ➔ "hi"

["TrimStart", {str: "  hi  "}]
// ➔ "hi  "

["TrimEnd", {str: "  hi  "}]
// ➔ "  hi"
```

_chars_ is a **set** of characters to strip, never a literal affix to remove.
A string argument means "the set of this string's characters":

```json example
["Trim", {str: "xxhixx"}, {str: "x"}]
// ➔ "hi"

["Trim", {str: "abcba"}, {str: "ab"}]
// ➔ "c"
```

To remove a literal prefix or suffix instead, test it with
[`StartsWith`](#startswith) / [`EndsWith`](#endswith) and slice.

</FunctionDefinition>

<nav className="hidden">
### StringRepeat
</nav>

<FunctionDefinition name="StringRepeat">

<Signature name="StringRepeat" returns="string">_s_:string, _n_:integer</Signature>

_n_ copies of _s_, concatenated.

```json example
["StringRepeat", {str: "ab"}, 3]
// ➔ "ababab"

["StringRepeat", {str: "ab"}, 0]
// ➔ ""
```

_n_ must be a non-negative integer; a negative or fractional _n_ is an error
value. Like every concatenation the result is re-segmented, so repeating a
lone combining mark does not necessarily multiply the character count.

The name is `StringRepeat` rather than `Repeat` because
[`Repeat`](/compute-engine/reference/collections/#repeat) is the infinite lazy
collection constructor.

</FunctionDefinition>

<nav className="hidden">
### PadStart
</nav>

<FunctionDefinition name="PadStart">

<Signature name="PadStart" returns="string">_s_:string, _n_:integer, _pad_:string?</Signature>
<Signature name="PadEnd" returns="string">_s_:string, _n_:integer, _pad_:string?</Signature>

Pad _s_ to _n_ **characters** by prepending (`PadStart`) or appending
(`PadEnd`) copies of _pad_. If _s_ already has _n_ or more characters it is
returned unchanged.

```json example
["PadStart", {str: "7"}, 3, {str: "0"}]
// ➔ "007"

["PadEnd", {str: "7"}, 3, {str: "0"}]
// ➔ "700"

["PadStart", {str: "abc"}, 2, {str: "0"}]
// ➔ "abc"
```

_pad_ defaults to a single space. A multi-character _pad_ repeats, and the
final copy is truncated **on a character boundary** to fit exactly:

```json example
["PadStart", {str: "ab"}, 3]
// ➔ " ab"

["PadEnd", {str: "ab"}, 7, {str: "123"}]
// ➔ "ab12312"
```

_n_ must be a non-negative integer, and an **empty** _pad_ is an error value:
there is no way to reach length _n_ with it, and silently returning _s_
unchanged would hide the caller's bug.

Padding counts characters, not display columns; aligning to a terminal or
proportional-font width is an explicit non-goal.

</FunctionDefinition>


### Case

<nav className="hidden">
### ToUpperCase
</nav>

<FunctionDefinition name="ToUpperCase">

<Signature name="ToUpperCase" returns="string">_s_:string</Signature>
<Signature name="ToLowerCase" returns="string">_s_:string</Signature>

The Unicode default (locale-independent) upper- and lower-case mappings of
_s_.

```json example
["ToUpperCase", {str: "hello"}]
// ➔ "HELLO"

["ToLowerCase", {str: "HELLO"}]
// ➔ "hello"
```

These are **whole-string** operations, not per-character maps, because case
mapping is contextual. Two consequences worth knowing:

- **Case mapping can change the character count.** German `ß` uppercases to
  two characters:

  ```json example
  ["ToUpperCase", {str: "straße"}]
  // ➔ "STRASSE"

  ["Length", ["ToUpperCase", {str: "straße"}]]
  // ➔ 7                       (the input has 6 characters)
  ```

- **The Greek final sigma is chosen by position.** A `Σ` at the end of a word
  lowercases to `ς`, not `σ`:

  ```json example
  ["ToLowerCase", {str: "ΟΔΟΣ"}]
  // ➔ "οδος"                  (final sigma U+03C2)
  ```

There is no locale argument in v1, so the Turkish dotless-i mapping is not
available; `ToLowerCase("I")` is `"i"` on every host, which is what makes
canonical forms and dedup keys identical everywhere. For case-insensitive
*comparison*, use [`CaseFold`](#casefold), not `ToLowerCase`.

</FunctionDefinition>

<nav className="hidden">
### CaseFold
</nav>

<FunctionDefinition name="CaseFold">

<Signature name="CaseFold" returns="string">_s_:string</Signature>

The case-folded form of _s_ — the right primitive for case-insensitive
comparison, which is `CaseFold(a) == CaseFold(b)` rather than a comparison of
`ToLowerCase` results.

```json example
["CaseFold", {str: "Straße"}]
// ➔ "strasse"

["CaseFold", {str: "STRASSE"}]
// ➔ "strasse"

["Equal", ["CaseFold", {str: "ΟΔΟΣ"}], ["CaseFold", {str: "οδοσ"}]]
// ➔ "True"
```

The folded form is not meant to be displayed — it is a comparison key. Note
that `CaseFold(s)` and `ToLowerCase(s)` differ exactly where lowercasing is
contextual: `ToLowerCase("ΟΔΟΣ")` is `"οδος"` (final sigma) while
`CaseFold("ΟΔΟΣ")` is `"οδοσ"` (medial sigma), which is what makes the fold
agree on both spellings.

**Implementation note (v1 approximation).** The host platform offers no
case-folding primitive, so the fold is computed as uppercase-then-lowercase
with the Greek final sigma restored to its medial form (U+03C2 → U+03C3). This
agrees with Unicode full case folding on Latin, Greek and Cyrillic text,
including the `ß`/`SS` case above; it deviates for a small number of
characters that Unicode's `CaseFolding.txt` maps specially, notably Cherokee
and some Turkic and Lithuanian sequences.

</FunctionDefinition>

<nav className="hidden">
### StringCompare
</nav>

<FunctionDefinition name="StringCompare">

<Signature name="StringCompare" returns="integer">_a_:string, _b_:string</Signature>

Order two strings: `-1` when _a_ sorts before _b_, `0` when they are equal,
`1` when _a_ sorts after _b_.

```json example
["StringCompare", {str: "a"}, {str: "b"}]
// ➔ -1

["StringCompare", {str: "b"}, {str: "a"}]
// ➔ 1

["StringCompare", {str: "a"}, {str: "a"}]
// ➔ 0

["StringCompare", {str: "ab"}, {str: "abc"}]
// ➔ -1                (a proper prefix sorts first)
```

The order is the **Unicode code-point** order of the two NFC scalar sequences,
compared position by position. It is deliberately not locale-aware: engine
identity, dedup keys and match plans must be deterministic on every host. A
locale-aware collation, if it ever ships, will arrive as an explicit trailing
argument, never as a change to this order.

**Where this differs from `<`.** The relational operators on two multi-character
strings compare the host's UTF-16 **code units**, which places the astral
characters (U+10000 and above, encoded with surrogates starting at U+D800)
*below* the range U+E000–U+FFFF. `StringCompare` puts them above, where their
code points say they belong. For all other text — everything below U+D800, so
all of Latin, Greek, Cyrillic, CJK — the two orders agree. Use
`StringCompare` when the ordering must be by code point.

```js example
ce.box(['StringCompare', ce.string('\uE000'), ce.string('\u{1F600}')]).evaluate();
// ➔ -1                (U+E000 < U+1F600 by code point)

ce.box(['Less', ce.string('\uE000'), ce.string('\u{1F600}')]).evaluate();
// ➔ "False"           (by UTF-16 code unit, U+1F600 starts at 0xD83D)
```

</FunctionDefinition>


<nav className="hidden">
### IntegerString
</nav>

<FunctionDefinition name="IntegerString">

<Signature name="IntegerString" returns="string">_n_:integer</Signature>
<Signature name="IntegerString" returns="string">_n_:integer, _base_:integer</Signature>

A string representation of the integer _n_ in the given _base_ (2 to 36,
default 10). The sign is preserved.

```json example
["IntegerString", 42]
// ➔ "42"

["IntegerString", 255, 16]
// ➔ "ff"

["IntegerString", -42]
// ➔ "-42"
```

`IntegerString` is broadcastable: applied to a list of integers it returns a
list of strings.

**See also**: [`DigitsFrom`](#digitsfrom), [`BaseForm`](#baseform).

</FunctionDefinition>


<nav className="hidden">
### DigitsFrom
</nav>

<FunctionDefinition name="DigitsFrom">

<Signature name="DigitsFrom" returns="integer">_s_:string</Signature>
<Signature name="DigitsFrom" returns="integer">_s_:string, _base_:integer</Signature>

The integer denoted by the digits of the string _s_, read in the given _base_
(2 to 36, default 10). Leading and trailing whitespace is ignored, and a
leading sign is honored. A `0x` or `0b` prefix selects base 16 or 2
regardless of the _base_ argument.

```json example
["DigitsFrom", {str: "42"}]
// ➔ 42

["DigitsFrom", {str: "-42"}]
// ➔ -42

["DigitsFrom", {str: "0xff"}]
// ➔ 255
```

A digit that is not valid in the base produces an `unexpected-digit` error
value.

**See also**: [`IntegerString`](#integerstring), [`BaseForm`](#baseform),
[`NumberFrom`](#numberfrom).

</FunctionDefinition>


<nav className="hidden">
### NumberFrom
</nav>

<FunctionDefinition name="NumberFrom">

<Signature name="NumberFrom" returns="number">_s_:string</Signature>
<Signature name="NumberFrom" returns="number">_s_:string, _base_:integer</Signature>

The number denoted by the string _s_. Unlike
[`DigitsFrom`](#digitsfrom), which is integer-only, `NumberFrom` accepts
fractions, exponents and the non-finite spellings.

```json example
["NumberFrom", {str: "42"}]
// ➔ 42

["NumberFrom", {str: "3.14"}]
// ➔ 3.14

["NumberFrom", {str: "-1.5e2"}]
// ➔ -150
```

**The accepted grammar** is fixed, so that different hosts cannot drift: any
amount of leading and trailing Unicode `White_Space`, an optional `+` or `-`
sign, then either a decimal numeral — ASCII digits, with an optional `.`
fraction and an optional `e`/`E` exponent — or one of the exact spellings
`oo`, `+oo`, `-oo`, `NaN`.

| Input | Result | Why |
| :--- | :--- | :--- |
| `"42"`, `"-42"`, `"+7"`, `" 42 "` | `42`, `-42`, `7`, `42` | Integer numeral, sign and surrounding whitespace allowed |
| `"3.14"`, `"1e-3"`, `"1.5e3"` | `3.14`, `0.001`, `1500` | Fraction and exponent |
| `".5"` | `0.5` | A leading `.` needs no integer part |
| `"oo"`, `"+oo"`, `"-oo"`, `"NaN"` | `+oo`, `+oo`, `-oo`, `NaN` | The engine's own spellings for the non-finite values |
| `"5."` | Error `invalid-number` | A trailing `.` with no fraction digits is not a numeral |
| `""` | Error `invalid-number` | The empty string denotes no number |
| `"abc"`, `"12abc"` | Error `invalid-number` | The **whole** string must be a numeral — a numeric prefix is not enough |
| `"1/3"` | Error `invalid-number` | Not a numeral; build the fraction with arithmetic |
| `"0x1f"`, `"1_000"`, `"Infinity"`, `"nan"` | Error `invalid-number` | Not in the grammar (spellings are exact and case-sensitive) |
| `"٣"` (Arabic-Indic three) | Error `invalid-number` | ASCII digits only, so that homoglyph digits cannot slip through |

Failure is always an **error value**, never `NaN`: `NaN` is a legitimate
parse *result* for the literal `"NaN"`, so it cannot double as the failure
signal.

```json example
["NumberFrom", {str: "12abc"}]
// ➔ Error: invalid-number
```

**Exactness** follows the engine's evaluate/`N` contract: a numeral with no
fraction and no exponent parses to an exact integer, and a fractional or
exponent numeral parses to an exact decimal, numericized only by `.N()`.

The optional _base_ (2 to 36) mirrors [`DigitsFrom`](#digitsfrom)'s and
accepts **integer** numerals only:

```json example
["NumberFrom", {str: "ff"}, 16]
// ➔ 255

["NumberFrom", {str: "1010"}, 2]
// ➔ 10

["NumberFrom", {str: "1.5"}, 16]
// ➔ Error: invalid-number

["NumberFrom", {str: "11"}, 37]
// ➔ Error: unexpected-base
```

**See also**: [`DigitsFrom`](#digitsfrom),
[`IntegerString`](#integerstring), [`String`](#string).

</FunctionDefinition>


<nav className="hidden">
### BaseForm
</nav>



<FunctionDefinition name="BaseForm">

<Signature name="BaseForm" returns="number">_value_:integer</Signature>

<Signature name="BaseForm" returns="number">_value_:integer, _base_:integer</Signature>

Represent an _integer_ in a specific _base_, such as hexadecimal or binary.

If no _base_ is specified, use base-10. _base_ should be an integer from 2 to 36.

`BaseForm` evaluates to the numeric value it represents, so based numerals
participate in arithmetic:

```json example
["BaseForm", 23, 2]
// ➔ 23
```

**Parsing.** A numeral with an integer-literal subscript base, e.g. `10111_2` or
`2748_{16}`, parses to `BaseForm`, provided every digit is valid for the base
(otherwise it stays an inert `Subscript`):

```javascript
ce.parse('10111_2').json;
// ➔ ["BaseForm", 23, 2]

ce.parse('1011_2 \\cdot 101_2').evaluate();
// ➔ 55

ce.parse('11_8 - 3_8 = 6_8').evaluate();
// ➔ "True"

ce.parse('19_2').json;
// ➔ ["Subscript", 19, 2]  (9 is not a valid base-2 digit)
```

A **symbol** subscript base, e.g. `161_b`, parses to `BaseForm` of the digit
polynomial in that base, so base equations can be solved symbolically:

```javascript
ce.parse('161_b').json;
// ➔ ["BaseForm", ["Add", ["Power", "b", 2], ["Multiply", 6, "b"], 1], "b"]

ce.parse('161_b + 134_b = 315_b').solve('b');
// ➔ [0, 8]
```

**Serialization.** `BaseForm` round-trips through LaTeX as `value_{base}`:

```javascript
ce.box(['BaseForm', 23, 2]).latex;
// ➔ "10111_{2}"

ce.box(['BaseForm', 42, 16]).latex;
// ➔ "\mathrm{2a}_{16}"
```

</FunctionDefinition>



<nav className="hidden">
### Delimiter
</nav>


<FunctionDefinition name="Delimiter"> 

<Signature name="Delimiter">_expr_</Signature>

<Signature name="Delimiter">_expr_, _delim_</Signature>


Visually group expressions with an open delimiter, a close delimiter
and separators between elements of the expression.

When serializing to LaTeX, render _expr_ wrapped in delimiters.

The `Delimiter` function is **inert** and the value of a `["Delimiter", _expr_]` expression is `expr`.

_expr_ is a function expression, usually a `["Sequence"]`. It should
not be a symbol or a number.

_delim_ is an optional string:
- when it is a single character it is a separator
- when it is two characters, the first is the opening delimiter and the second is the closing delimiter
- when it is three characters, the first is the opening delimiter, the second is the separator, and the third is the closing delimiter

The delimiters are rendered to LaTeX. 

The open and close delimiters are a single character, one of: `()[]{}<>|‖⌈⌉⌊⌋⌜⌝⌞⌟⎰⎱"`. The open and close delimiters do not have to match.
For example, `"')]'"` is a valid delimiter.

If an open or close delimiter is `.`, it is ignored.

The separator delimiter is also a single character, one of `,;.&:|-` or `U+00B7` (middle dot), `U+2022` (bullet) or `U+2026` (ellipsis).

If no _delim_ is provided, a default delimiter is used based on 
the type of _expr_:
- `["Sequence"]` -> `(,)`
- `["Tuple"]`, `["Single"]`, `["Pair"]`, `["Triple"]` -> `(,)`
- `["List"]` -> `[,]`
- `["Set"]` -> `{,}`




</FunctionDefinition>


<nav className="hidden">
### Spacing
</nav>


<FunctionDefinition name="Spacing"> 

<Signature name="Spacing">_width_</Signature>


When serializing to LaTeX, `width` is the dimension of the spacing, in 1/18 em.

The `Spacing` function is **inert** and the value of a `["Spacing", _expr_]` expression is `expr`.

</FunctionDefinition>

## Regular expressions

A regular expression is a compiled pattern, built with `RegExp` and used by
`IsMatch`, `StringMatch`, `StringMatchAll`, and the pattern forms of
`StringSplit` and `StringReplace`.

Patterns are most readable as a **raw string literal**, which performs no
escape processing, so a backslash means a backslash:

```
RegExp(#"[0-9]+(\.[0-9]+)?"#)
```

**The dialect is JavaScript's, in full.** Backreferences, lookahead and
lookbehind all work, and there is no restricted subset. Matching is always
code-point aware. Compiled JavaScript uses the same engine, so a compiled
expression and an interpreted one agree.

:::warning[A pattern can take unbounded time, and cannot be interrupted]
Regular-expression matching backtracks. Some ordinary-looking patterns take
time **exponential** in the length of the subject — the classic example is
`RegExp(#"(a+)+$"#)` against a non-matching string of about thirty `a`s.

The engine **cannot stop this**. Deadlines are checked between evaluation
steps, and a single match is one step, so no timeout, `withTimeLimit` span or
abort signal will end it: the call runs to completion or hangs.

Matching a pattern you wrote against data you control is fine. If either the
pattern **or** the subject can come from somewhere you do not control, that is
a denial-of-service path, and the engine gives you no protection from it.
:::

<nav className="hidden">
### RegExp
</nav>

<FunctionDefinition name="RegExp">

<Signature name="RegExp" returns="regexp">_pattern_:string</Signature>
<Signature name="RegExp" returns="regexp">_pattern_:string, _flags_:string</Signature>

Compile _pattern_ into a value of type `regexp`.

```json example
["RegExp", "'[0-9]+'"]
```

The type `regexp` is **disjoint from `string`**: a plain string cannot be
passed where a pattern is expected. That is deliberate — otherwise every
string argument would become silently pattern-sensitive, and `"a.c"` would
stop meaning what it says.

An invalid pattern is an **error value**, reported where it was written rather
than at the first match.

_flags_ is a string of single letters: `i` (case-insensitive), `m`
(multi-line `^`/`$`), `s` (`.` matches a newline), `d` (record capture
indices), `u`/`v` (Unicode mode). The global and sticky flags `g` and `y` are
**rejected**: they carry a mutable scan position, so a value carrying one
would answer differently depending on what it matched last. Use
`StringMatchAll` for every match.

Two patterns are the same value when their pattern text and flags are equal.

</FunctionDefinition>

<nav className="hidden">
### IsMatch
</nav>

<FunctionDefinition name="IsMatch">

<Signature name="IsMatch" returns="boolean">_subject_:string, _pattern_:regexp</Signature>

Whether _subject_ contains a match for _pattern_.

```json example
["IsMatch", "'abc123'", ["RegExp", "'[0-9]+'"]]
// ➔ "True"
```

</FunctionDefinition>

<nav className="hidden">
### StringMatch
</nav>

<FunctionDefinition name="StringMatch">

<Signature name="StringMatch" returns="record">_subject_:string, _pattern_:regexp</Signature>

The first match of _pattern_ in _subject_, as a record — or `Nothing` when
there is no match.

The record has these fields:

| Field | Meaning |
| :-- | :-- |
| `match` | the matched text |
| `range` | its span in the subject, as a `range` of character positions |
| `groups` | the numbered captures, in order (`Nothing` for one that did not participate) |
| `names` | the named captures, as a dictionary |

`range` is what lets a match compose with the rest of the string operators:

```json example
["Slice", "'abc123'", ["At", ["StringMatch", "'abc123'", ["RegExp", "'[0-9]+'"]], "'range'"]]
// ➔ "'123'"
```

Positions count **characters** (grapheme clusters), like every other string
operation — not UTF-16 code units.

:::info[`range` is not always present]
A pattern can match part of a character. `👨‍👩‍👧` is one character built
from several code points, and a pattern can match just the `👩` inside it.
There is no span of whole characters that names exactly that text, so `range`
is **absent** for such a match and reading it gives `Missing`. `match` still
holds the exact text. Test `range` before slicing with it.
:::

</FunctionDefinition>

<nav className="hidden">
### StringMatchAll
</nav>

<FunctionDefinition name="StringMatchAll">

<Signature name="StringMatchAll" returns="list<record>">_subject_:string, _pattern_:regexp</Signature>

Every non-overlapping match, as a list of records shaped exactly like
`StringMatch`'s.

```json example
["StringMatchAll", "'a1b22c'", ["RegExp", "'[0-9]+'"]]
// ➔ two records, matching "1" and "22"
```

</FunctionDefinition>

### Patterns with `StringSplit` and `StringReplace`

Both take a `regexp` where they take a literal separator or target, with the
host's own semantics — including splitting at a zero-width match:

```json example
["StringSplit", "'a1b22c'", ["RegExp", "'[0-9]+'"]]
// ➔ ["'a'", "'b'", "'c'"]

["StringReplace", "'a1b22c'", ["RegExp", "'[0-9]+'"], "'#'"]
// ➔ "'a#b#c'"
```

`StringReplace` also accepts a **function** replacement, called with the match
record, so each replacement can be computed from its captures:

```json example
["StringReplace", "'ab cd'", ["RegExp", "'[a-z]+'"],
  ["Function", ["ToUpperCase", ["At", "m", "'match'"]], "m"]]
// ➔ "'AB CD'"
```

Captures are not interleaved into `StringSplit`'s result; use
`StringMatchAll` when you want them.

**Compilation.** `IsMatch` and `StringReplace` with a literal pattern and a
string replacement compile to JavaScript. `StringMatch`, `StringMatchAll`, a
function replacement and a computed pattern do not — they report character
positions or records that compiled code has no representation for — and fail
closed rather than answering differently from the interpreter. No regular
expression compiles to Python or to the shader targets.

<nav className="hidden">
### Annotated
</nav>



<FunctionDefinition name="Annotated"> 

<Signature name="Annotated" returns="expression">_expr_:expression, dictionary</Signature>

`Annotated(expr, attributes)` is an expression that behaves exactly like `expr`,
but carries **visual or semantic metadata** as an attribute dictionary.

The attributes have no effect on evaluation. This function is inert — it 
evaluates to its first argument.

The `attributes` dictionary may include:

* Visual style hints (e.g. `weight: "bold"`, `color: "blue"`)
* Semantic metadata (e.g. `tooltip`, `language`, `link`)

Use `Annotated` when you want to attach presentational or semantic
information to an expression **without affecting its evaluation or identity**.
This is useful for rendering, tooltips, highlighting, etc.


The following keys are applicable to math expressions:
- `mathStyle` = `"compact"` or `"normal"`. The `"compact"` style is used for inline math expressions, while the `"normal"` style is used for display math expressions.
- `scriptLevel` = `0`, `1`, or `-1`, `+1`. The script level is used to 
determine the size of the expression in relation to the surrounding text. 
A script level of `0` is normal size, `1` is smaller, and `2` is even smaller.



The following keys are applicable to text content:
- `weight` a string, one of `"normal"`, `"bold"`, `"bolder"`, `"light"`
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `language` a string indicating the language of the expression, e.g. `"en"` (English), `"fr"` (French), `"es"` (Spanish)



The following keys are applicable to both math expressions and text content:
- `color` a color name or hex code
- `backgroundColor` a color name or hex code for the background color
- `tooltip` a string to be displayed as a tooltip when the expression is hovered over
- `link` a URL to be followed when the expression is clicked
- `cssClass` a string indicating the CSS class to be applied to the expression
- `cssId` a string indicating the CSS id of the expression


<!--
The keys in the dictionary include:
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `size` a number from `1` to `10` where `5` is normal size
- `font` a string indicating the font family
- `fontSize` a number indicating the font size in pixels
- `fontWeight` a string indicating the font weight, e.g. `"normal"`, `"bold"`, `"bolder"`, `"lighter"`
- `fontStyle` a string indicating the font style, e.g. `"normal"`, `"italic"`, `"oblique"`  
- `backgroundColor` a color name or hex code for the background color
- `border` a string indicating the border style, e.g. `"none"`, `"solid"`, `"dashed"`, `"dotted"`
- `borderColor` a color name or hex code for the border color
- `borderWidth` a number indicating the border width in pixels
- `padding` a number indicating the padding in pixels
- `margin` a number indicating the margin in pixels 
- `opacity` a number from `0` to `1` indicating the opacity of the expression
-->

The `Annotated` function is **inert** and the value of a `["Annotated", expr]` expression is `expr`.

</FunctionDefinition>


### Text and LaTeX

`Text` builds a formatted text expression (see
[Text Expressions](#text-expressions) above); `LatexString` carries a literal
LaTeX fragment and is documented with the other core operators.

<ReadMore path="/compute-engine/reference/core/#latexstring" > 
Read more about **`LatexString`**, **`Latex`** and **`Parse`**
</ReadMore>

<ReadMore path="/compute-engine/reference/collections/" > 
Read more about the **collection operators** that now apply to strings
</ReadMore>

<ReadMore path="/compute-engine/reference/linear-algebra/#formatting" > 
Read more about formatting of **matrices** and **vectors**
</ReadMore>
