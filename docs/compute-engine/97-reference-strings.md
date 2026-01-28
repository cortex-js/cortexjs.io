---
title: Strings and Text
slug: /compute-engine/reference/strings/
---

## Introduction

### Strings

A string is a sequence of characters such as <span style={{fontSize: "1.2rem"}}>`"Hello, 🌍!"`</span> or <span style={{fontSize: "1.2rem"}}>`"Simplify(👨‍🚀 × ⚡️) → 👨‍🎤"`.</span>

In the Compute Engine, strings are composed of encoding-independent Unicode
characters and provide access to those characters through a variety of Unicode
representations.

Strings are **not handled as collections**. This is because the concept of a  
“character” is inherently ambiguous: a single user-perceived character (a  
**grapheme cluster**) may consist of multiple **Unicode scalars** (code  
points), and those scalars may in turn be represented differently in various  
encodings: UTF-8, UTF-16, or UTF-32.

For example:

- The grapheme `é` can be represented as one Unicode scalar (`U+00E9`) or  
  two scalars (`U+0065` + `U+0301`, i.e. `e` + combining acute).
- The emoji `👨‍🚀` is a grapheme cluster made of multiple scalars:  
  `[U+1F468, U+200D, U+1F680]`.

  In UTF-8, it's encoded as the byte sequence:  
  `[240, 159, 145, 168, 226, 128, 141, 240, 159, 154, 128]`

  In UTF-16, it's encoded as the code units:  
  `[55357, 56457, 8205, 55357, 56960]`


```live
const s = ce.string("Hello, 🌍!");
console.info(ce.function("Utf8", [s]).evaluate().json);
```

To avoid confusion and ensure consistent behavior, strings are **not accessed directly** as collections of characters. Instead, they must be **explicitly converted** either to a sequence of **grapheme clusters** (what users perceive as individual characters), or to a sequence of **Unicode scalars** (code points). For encoding-level operations (such as manipulating UTF-8 or UTF-16), strings must be converted to their encoded form, as **Unicode scalars are not encodings**. This distinction matters because a single grapheme cluster may be composed of multiple scalars, and each scalar may map to different byte representations depending on the encoding.


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
  ["Multiply", 2, ["Annotated", "Pi", {"color": "blue"}], "r"]
]
// ➔ Pi (in blue)
```

which would correspond to the LaTeX expression:

```latex
\mathrm{circumference} = 2 \cdot \textcolor{blue}{\pi} \cdot r
```

Annotated expressions are similar to attributed strings in other systems.



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
const stringExpr = ce.box([
  "String", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(stringExpr.latex);
// ➔ "\text{Hello $\mathrm{Annotated}(\text{world}, {color: "blue"})$}"

const textExpr = ce.box([
  "Text", 
  "Hello", 
  ["Annotated", "world", {dict: {"color": "blue"}}]
]);
console.info(textExpr.latex);
// ➔ "\text{Hello \textcolor{blue}{world}}"
```

## Functions

<nav className="hidden">
### String
</nav>

<FunctionDefinition name="String">

<Signature name="String" returns="string">any*</Signature>

A string created by joining its arguments. The arguments are converted to 
their default string representation.


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
| `unicode-scalars` | The argument is a list of Unicode scalars (same as UTF-32) or a single Unicode scalar |

If no _format_ is specified, the default is `unicode-scalars`.

For example: 

```json example
["StringFrom", ["List", 240, 159, 148, 159], {str: "utf-8"}]
// ➔ "Hello"

["StringFrom", ["List", 55357, 56607], {str: "utf-16"}]
// ➔ "\u0048\u0065\u006c\u006c\u006f"

["StringFrom", 128287]
// ➔ "🔟"

["StringFrom", ["List", 127467, 127479]]
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

**See also**: [`Utf16`](#utf16), [`UnicodeScalars`](#unicodescalars) and [`GraphemeClusters`](#graphemeclusters).

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
// ➔ ["List", 55357, 56489, 8205, 55356, 57235]
```

**To create a string from UTF-16 code units**, use the `["StringFrom", _list_, "utf-16"]` function.

**See also**: [`Utf8`](#utf8), [`UnicodeScalars`](#unicodescalars) and [`GraphemeClusters`](#graphemeclusters).

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
// ➔ [72, 101, 108, 108, 111]  

["UnicodeScalars", {str: "👩‍🎓"}]
// ➔ [128105, 8205, 127891]
```

**To create a string from Unicode scalars**, use the `["StringFrom", _list_, "unicode-scalars"]` function.

**See also**: [`Utf8`](#utf8), [`Utf16`](#utf16), and [`GraphemeClusters`](#graphemeclusters).

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


This function splits a string into grapheme clusters:

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

**See also**: [`Utf8`](#utf8), [`Utf16`](#utf16), and [`UnicodeScalars`](#unicodescalars).

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




<ReadMore path="/compute-engine/reference/linear-algebra/#formatting" > 
Read more about formatting of **matrices** and **vectors**
</ReadMore>




