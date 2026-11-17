<!-- The detail of the entries of /reference/regexp/. Format: README.md. -->

## RegExp

#### Regular expressions

A regular expression is a compiled pattern, made by `regExp` and used by
[`isMatch`](#ismatch), [`stringMatch`](#stringmatch),
[`stringMatchAll`](#stringmatchall), and the pattern forms of
`stringSplit` and `stringReplace`.

A pattern is easiest to read as an extended string literal, which has no
escape sequences, so a backslash is a backslash:
`regExp(#"[0-9]+(\.[0-9]+)?"#)`.

The dialect is JavaScript's, all of it: backreferences, lookahead and
lookbehind work. Matching is always aware of code points. Compiled
JavaScript uses the same engine, so compiled code and the interpreter give
the same matches.

```epsil
isMatch("abab", regExp(#"(ab)\1"#))
// ➔ "True"
isMatch("price: 42", regExp(#"(?<=: )\d+"#))
// ➔ "True"
```

:::warning[A pattern can take unbounded time, and cannot be interrupted]
Matching a regular expression backtracks. Some patterns that look ordinary
take a time **exponential** in the length of the subject: the classic
example is `regExp(#"(a+)+$"#)` against a string of about thirty `a`s that
does not match.

The engine **cannot stop this**. Deadlines are checked between evaluation
steps, and a match is one step, so no time limit or abort signal ends it:
the call runs to its end, or hangs.

Matching a pattern you wrote against data you control is safe. When the
pattern **or** the subject can come from somewhere you do not control, it is
a path for a denial of service, and the engine does not protect you from it.
:::

#### The regexp type

`regexp` is **disjoint from `string`**: a string cannot be given where a
pattern is expected. Otherwise every string argument would become a
pattern, and `"a.c"` would stop meaning `a.c`.

```epsil
type(regExp(#"[0-9]+"#))
// ➔ TypeFrom("regexp")
isMatch("abc", "b")
// ➔ error: Type error: expected `regexp`, got `string` at `b` in `isMatch("abc", "b")`
```

A pattern that is not valid is an error where it is written, not at the
first match.

```epsil
regExp(#"[0-9"#)
// ➔ error: Runtime error: invalid value: not a valid regular expression at `"[0-9"`
```

#### Flags

The flags are a string of letters: `i` (ignore case), `m` (`^` and `$` match
at each line), `s` (`.` matches a line break), `d` (record the indexes of
captures), `u` or `v` (Unicode mode). The flags `g` and `y` are
**rejected**: they hold a position in the subject that changes at each
match, so a value with one of them would give a different answer depending
on its last match. Use [`stringMatchAll`](#stringmatchall) for every match.

```epsil
isMatch("ABC", regExp("b", "i"))
// ➔ "True"
isMatch("a\nb", regExp("a.b", "s"))
// ➔ "True"
regExp("a", "g")
// ➔ error: Runtime error: invalid value: the 'g' flag carries mutable match state and is not allowed on a value; use StringMatchAll at `"g"`
```

Two patterns are the same value when their pattern text and their flags are
the same.

```epsil
regExp("a.c") == regExp("a.c")
// ➔ "True"
```

#### Patterns with stringSplit and stringReplace

[`stringSplit`](/reference/core/#stringsplit) and
[`stringReplace`](/reference/core/#stringreplace) take a `regexp` where they
take a separator or a target, with the semantics of the host, splitting at a
match of length zero included. Captures are not put in the result of
`stringSplit`: use [`stringMatchAll`](#stringmatchall) for them.

```epsil
stringSplit("a1b22c", regExp(#"[0-9]+"#))
// ➔ ["a","b","c"]
stringSplit("a1b", regExp(#"(\d)"#))
// ➔ ["a","b"]
stringReplace("a1b22c", regExp(#"[0-9]+"#), "#")
// ➔ "a#b#c"
```

A `$1` in a string replacement is not replaced by the capture. To compute
each replacement from the match, give a **function** as the replacement:
it is called with the match record of [`stringMatch`](#stringmatch).

```epsil
stringReplace("ab", regExp("(a)"), "$1$1")
// ➔ "$1$1b"
stringReplace("ab cd", regExp("[a-z]+"), m => toUpperCase(m["match"]))
// ➔ "AB CD"
```

`isMatch`, and `stringReplace` with a literal pattern and a string
replacement, can be compiled to JavaScript; the other regular-expression
operations cannot: see [Compiling](/compute-engine/guides/compiling/).

### MathJSON

`["RegExp", pattern]`, `["RegExp", pattern, flags]`.

```json example
["RegExp", "'[0-9]+'"]

["StringSplit", "'a1b22c'", ["RegExp", "'[0-9]+'"]]
// ➔ ["List", "'a'", "'b'", "'c'"]

["StringReplace", "'a1b22c'", ["RegExp", "'[0-9]+'"], "'#'"]
// ➔ "'a#b#c'"

["StringReplace", "'ab cd'", ["RegExp", "'[a-z]+'"],
  ["Function", ["ToUpperCase", ["At", "m", "'match'"]], "m"]]
// ➔ "'AB CD'"
```

## IsMatch

The subject contains a match when any part of it matches: to match the
whole subject, anchor the pattern with `^` and `$`.

```epsil
[isMatch("abc123", regExp("[0-9]+")), isMatch("abc123", regExp("^[0-9]+$"))]
// ➔ ["True","False"]
```

### MathJSON

`["IsMatch", subject, pattern]`.

```json example
["IsMatch", "'abc123'", ["RegExp", "'[0-9]+'"]]
// ➔ "True"
```

## StringMatch

| Field | Value |
| :--- | :--- |
| `match` | The text of the match |
| `range` | Its span in the subject, a range of character indexes |
| `groups` | The numbered captures, in order: `Missing` for a group that did not take part in the match |
| `names` | The named captures, as a dictionary |

```epsil
stringMatch("abc123", regExp(#"[0-9]+"#))
// ➔ {"match" -> "123", "range" -> Range(4, 6), "groups" -> [], "names" -> {->}}
stringMatch("2026-11", regExp(#"(?<y>\d+)-(?<m>\d+)"#))["names"]
// ➔ {"y" -> "2026", "m" -> "11"}
stringMatch("ab", regExp(#"(x)?b"#))["groups"]
// ➔ ["Missing"]
stringMatch("abc", regExp(#"[0-9]+"#)) == Nothing
// ➔ "True"
```

The `range` field is what makes a match work with the other string
functions. Its indexes count **characters** (grapheme clusters), as every
other string function does, not UTF-16 code units.

```epsil
let m = stringMatch("abc123", regExp(#"[0-9]+"#))
slice("abc123", m["range"])
// ➔ "123"
```

#### The range field is not always there

A pattern can match part of a character. `👨‍👩‍👧` is one character of several
code points, and a pattern can match the `👩` inside it. No span of whole
characters is exactly that text, so the record has no `range` field, and
reading it gives `Missing`. The `match` field still holds the text. Test
`range` before slicing with it.

```epsil
let m = stringMatch("👨‍👩‍👧", regExp("👩"))
[m["match"], isMissing(m["range"])]
// ➔ ["👩","True"]
```

### MathJSON

`["StringMatch", subject, pattern]`.

```json example
["Slice", "'abc123'", ["At", ["StringMatch", "'abc123'", ["RegExp", "'[0-9]+'"]], "'range'"]]
// ➔ "'123'"
```

## StringMatchAll

```epsil
let ms = stringMatchAll("a1b22c", regExp(#"[0-9]+"#))
map(m => m["match"], ms)
// ➔ ["1","22"]
let ms = stringMatchAll("a1b22c", regExp(#"[0-9]+"#))
ms[2]["range"]
// ➔ [4,5]
```

### MathJSON

`["StringMatchAll", subject, pattern]`.

```json example
["StringMatchAll", "'a1b22c'", ["RegExp", "'[0-9]+'"]]
```
