---
title: Strings
slug: /compute-engine/reference/strings/
---

A string is a sequence of characters such as <span style={{fontSize: "1.2rem"}}>`"Hello, 🌍!"`</span> or <span style={{fontSize: "1.2rem"}}>`"Simplify(👨‍🚀 + ⚡️) → 👨‍🎤"`.</span>


In the Compute Engine, strings are composed of encoding-independent Unicode
characters and provide access to those characters through a variety of Unicode
representations.

In the Compute Engine, strings are **not treated as collections**. This is 
because the concept of a "character" is inherently ambiguous: a single 
user-perceived character (a **grapheme cluster**) may consist of multiple 
Unicode scalars, and those scalars may in turn be represented differently 
in various encodings. To avoid confusion and ensure consistent behavior, 
strings must be explicitly converted to a sequence of **grapheme clusters** or 
**Unicode scalars** when individual elements need to be accessed.


<nav className="hidden">
### String
</nav>

<FunctionDefinition name="String">

<Signature name="String" returns="string">any*</Signature>

A string created by joining its arguments. The arguments are converted to their default string representation.


```json example
["String", "Hello", ", ", "🌍", "!"]
// ➔ "Hello, 🌍!" 

["String", 42, " is the answer"]
// ➔ "42 is the answer"  

```

</FunctionDefinition>


<nav className="hidden">
### StringFrom
</nav>

<FunctionDefinition name="StringFrom">

<Signature name="StringFrom" returns="string">any, _format_:string?</Signature>

Convert the argument to a string, using the specified _format_.

| _format_ | Description |
| :--- | :--- |
| `utf-8` | The argument is a list of UTF-8 code points |
| `utf-16` | The argument is a list of UTF-16 code points |
| `unicode-scalars` | The argument is a list of Unicode scalars (same as UTF-32) |

For example: 

```json example
["StringFrom", [240, 159, 148, 159], "utf-8"]
// ➔ "Hello"

["StringFrom", [55357, 56607], "utf-16"]
// ➔ "\u0048\u0065\u006c\u006c\u006f"

["StringFrom", [128287], "unicode-scalars"]
// ➔ "🔟"

["StringFrom", [127467, 127479], "unicode-scalars"]
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
["Utf8", "Hello"]
// ➔ [72, 101, 108, 108, 111]  

["Utf8", "👩‍🎓"]
// ➔ [240, 159, 145, 169, 226, 128, 141, 240, 159, 142, 147]
```

</FunctionDefinition>


<nav className="hidden">
### Utf16
</nav>

<FunctionDefinition name="Utf16">
<Signature name="Utf16" returns="list<integer>">string</Signature>

Return a list of utf-16 code points for the given _string_.

**Note:** The values returned are UTF-16 code units, not Unicode scalar values.

```json example
["Utf16", "Hello"]
// ➔ [72, 101, 108, 108, 111]  

["Utf16", "👩‍🎓"]
// ➔ [55357, 56489, 8205, 55356, 57235]
```

</FunctionDefinition>


<nav className="hidden">
### UnicodeScalars
</nav>

<FunctionDefinition name="UnicodeScalars">
<Signature name="UnicodeScalars" returns="list<integer>">string</Signature>

A **Unicode scalar** is any valid Unicode code point, represented as a number 
between `U+0000` and `U+10FFFF`, excluding the surrogate range 
(`U+D800` to `U+DFFF`). In other words, Unicode scalars correspond exactly to UTF-32 code units.


This function returns the sequence of Unicode scalars (code points) that make 
up the string. Note that some characters perceived as a single visual unit 
(grapheme clusters) may consist of multiple scalars. For example, the emoji 
<span style={{fontSize: "1.2em"}}>👩‍🚀</span> is a single grapheme but is composed of several scalars.

```json example
["UnicodeScalars", "Hello"]
// ➔ [72, 101, 108, 108, 111]  

["UnicodeScalars", "👩‍🎓"]
// ➔ [128105, 8205, 127891]
```

</FunctionDefinition>



<nav className="hidden">
### GraphemeClusters
</nav>

<FunctionDefinition name="GraphemeClusters">
<Signature name="GraphemeClusters" returns="list<string>">string</Signature>

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
| <span style={{fontSize: "1.3rem"}}>`é`</span> (NFD)    | <span style={{fontSize: "1.3rem"}}>`["é"]`</span>              | `[101, 769]`                         |
| <span style={{fontSize: "1.3rem"}}>`👩‍🎓`</span>         | <span style={{fontSize: "1.3rem"}}>`["👩‍🎓"]`</span>           | `[128105, 8205, 127891]`             |

In contrast, a Unicode scalar is a single code point in the Unicode standard,
 corresponding to a UTF-32 value. Grapheme clusters are built from one or more scalars.

This function splits a string into grapheme clusters, not scalars.

```json example
["GraphemeClusters", "Hello"]
// ➔ ["H", "e", "l", "l", "o"]

["GraphemeClusters", "👩‍🎓"]
// ➔ ["👩‍🎓"]

["UnicodeScalars", "👩‍🎓"]
// ➔ [128105, 8205, 127891]
```

For more details on how grapheme cluster boundaries are determined, 
see [Unicode® Standard Annex #29](https://unicode.org/reports/tr29/).

</FunctionDefinition>



<nav className="hidden">
### BaseForm
</nav>



<FunctionDefinition name="BaseForm">

<Signature name="BaseForm" returns="string">_value_:integer</Signature>

<Signature name="BaseForm" returns="string">_value_:integer, _base_:integer</Signature>

Format an _integer_ in a specific _base_, such as hexadecimal or binary.

If no _base_ is specified, use base-10.

The sign of _integer_ is ignored.

- _value_ should be an integer.
- _base_ should be an integer from 2 to 36.

```json example
["Latex", ["BaseForm", 42, 16]]

// ➔ (\text(2a))_{16}
```

```cortex
Latex(BaseForm(42, 16))
// ➔ (\text(2a))_{16}
String(BaseForm(42, 16))
// ➔ "'0x2a'"
```

</FunctionDefinition>
