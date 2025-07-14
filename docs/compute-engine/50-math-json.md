---
title: MathJSON Format
slug: /math-json/
description: MathJSON is a lightweight data interchange format for mathematical notation
hide_title: true
sidebar_class_name: "sdk-icon"
---
import Mathfield from '@site/src/components/Mathfield';
import ConsoleMarkup from '@site/src/components/ConsoleMarkup';
import {useState, useEffect} from 'react';
import {BrowserOnly} from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@site/src/components/ErrorBoundary';

export function setupComputeEngine() {
  if (window.ce !== undefined) return;
  // If we're not ready, try again in 50ms
  if (!("ComputeEngine" in window)) {
    setTimeout(setupComputeEngine, 50);
    return;
  }
}
export function MathJSONOutput({children}) {
  const [value, setValue] = useState(children);
  const [json, setJson] = useState({});
  useEffect(setupComputeEngine, []);
  // We need to use useEffect so that the MathfieldElement is available
  // when this code runs (in the client).
  useEffect(() => {
    let cancelled = false;

    const tryParse = () => {
      if (window.ce) {
        const result = window.ce.parse(value);
        setJson(result?.json ?? {});
      } else if (!cancelled) {
        setTimeout(tryParse, 50);
      }
    };

    tryParse();

    return () => { cancelled = true; };
  }, [value]);
  return<>
    <Mathfield 
      style={{ width: "100%", borderRadius: "8px", padding: "8px", marginBottom: "1em" }}
      onChange={(ev) => setValue(ev.target.value)}
    >{value}</Mathfield>
    <ConsoleMarkup value={json}/>
  </>;
}


<HeroImage path="/img/hand-cube2.jpg" style={{"--container-height": "800px"}} >
# MathJSON
</HeroImage>

<Intro>
A lightweight data interchange format for mathematical notation.
</Intro>

<div className="symbols-table">

| Math                      | MathJSON                                                                 |
| :------------------------ | :----------------------------------------------------------------------- |
| $$\displaystyle\frac{n}{1+n}$$       | `["Divide", "n", ["Add", 1, "n"]]`                           |
| $$\sin^{-1}^\prime(x)$$ | `["Apply", ["Derivative", ["InverseFunction", "Sin"]], "x"]` |

</div>


MathJSON is built on the [JSON format](https://www.json.org/). Its focus is on
interoperability between software programs to facilitate the exchange of
mathematical data and the building of scientific software through the
integration of software components communicating with a common format.

It is human-readable, while being easy for machines to generate and parse. It is
simple enough that it can be generated, consumed and manipulated using any
programming languages.

MathJSON can be transformed from (parsing) and to (serialization) other formats.

:::info[Demo]
Type an expression in the mathfield below to see its MathJSON representation.
<ErrorBoundary>
  <MathJSONOutput>{`e^{i\\pi}+1=0`}</MathJSONOutput>
</ErrorBoundary>
:::


The **Compute Engine** library provides an implementation in
JavaScript/TypeScript of utilities that parse LaTeX to MathJSON, serialize
MathJSON to LaTeX, and provide a collection of functions for symbolic
manipulation and numeric evaluations of MathJSON expressions.

<ReadMore path="/compute-engine/demo/"> 
Try a demo of the **Compute Engine**<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/compute-engine/guides/latex-syntax/">
Read more about the **Compute Engine** LaTeX syntax parsing and
serializing<Icon name="chevron-right-bold" />
</ReadMore>

Mathematical notation is used in a broad array of fields, from elementary school
arithmetic, engineering, applied mathematics to physics and more. New notations
are invented regularly and MathJSON endeavors to be flexible and extensible to
account for those notations.

The Compute Engine includes a standard library of functions and symbols which
can be extended with custom libraries.

<ReadMore path="/compute-engine/standard-library/">
Read more about the **MathJSON Standard Library**<Icon name="chevron-right-bold" />
</ReadMore>

MathJSON is not intended to be suitable as a visual representation of arbitrary
mathematical notations, and as such is not a replacement for LaTeX or MathML.



## Structure of a MathJSON Expression

A MathJSON expression is a combination of **numbers**, **symbols**, **strings**,
**functions** and **dictionaries**.


**Number**

```json example
3.14
314e-2
{"num": "3.14159265358979323846264338327950288419716939937510"}
{"num": "-Infinity"}
```

**Symbol**

```json example
"x"
"Pi"
{"sym": "🍎"}
{"sym": "半径"}
{"sym": "Pi", "wikidata": "Q167"}
```

**String**

```json example
"'Diameter of a circle'"
{"str": "Srinivasa Ramanujan"}
```

**Function**

```json example
["Add", 1, "x"]
{"fn": ["Add", {"num": "1"}, {"sym": "x"}]}
```

**Dictionary**

```json example
{"dict": {"x": 2, "y": 3}}
["Dictionary", ["Tuple", "'x'", 2], ["Tuple", "'y'", 3]]
```

**Numbers**, **symbols**, **strings** and **functions** are expressed either as
object literals with a `"num"` `"str"` `"sym"` or `"fn"` key, respectively, or
using a shorthand notation as a a JSON number, string or array.

The shorthand notation is more concise and easier to read, but it cannot include
metadata properties.

:::note[S-expressions]
MathJSON shares similarities with **S-expressions** (symbolic expressions) used 
in languages like **Lisp** and **Scheme**. Both represent data and code using 
nested lists, where the first element typically indicates the operator or 
function and the following elements are its arguments. For example, the 
MathJSON expression `["Add", 1, "x"]` is analogous to the Lisp expression 
`(+ 1 x)`. This structure provides a natural and extensible way to represent 
mathematical expressions as data.
:::


## Numbers

A MathJSON **number** is either:

- an object literal with a `"num"` key
- a JSON number
- a JSON string starting with `+`, `-` or the digits `0`-`9`. Using a string
  is useful to represent numbers with a higher precision or greater range than
  JSON numbers.

### Numbers as Object Literals

**Numbers** may be represented as an object literal with a `"num"` key. The
value of the key is a **string** representation of the number.

```json
{
  "num": <string>
}
```

The string representing a number follows the
[JSON syntax for number](https://tools.ietf.org/html/rfc7159#section-6), with
the following differences:

- The range or precision of MathJSON numbers may be greater than the range and
  precision supported by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)
  64-bit float.

```json example
{ "num": "1.1238976755823478721365872345683247563245876e-4567" }
```

- The string values `"NaN"` `"+Infinity"` and `"-Infinity"` are used to
  represent respectively an undefined result as per
  [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754), $+\infty$, and
  $-\infty$.

```json example
{ "num": "+Infinity" }
```

- If the string includes the pattern `/\([0-9]+\)/`, that is a series of one or
  more digits enclosed in parentheses, that pattern is interpreted as
  repeating digits.

```json example
{ "num": "1.(3)" }
{ "num": "0.(142857)" }
{ "num": "0.(142857)e7" }
```

- The following characters in a string representing a number are ignored:

<div className="symbols-table first-column-header" style={{'--first-col-width': '9ch'}}>

|            |                       |
| :--------- | :-------------------- |
| **U+0009** | **TAB**               |
| **U+000A** | **LINE FEED**         |
| **U+000B** | **VERTICAL TAB**      |
| **U+000C** | **FORM FEED**         |
| **U+000D** | **CARRIAGE RETURN**   |
| **U+0020** | **SPACE**             |
| **U+00A0** | **UNBREAKABLE SPACE** |

</div>

### Numbers as Number Literals

When a **number** is compatible with the JSON representation of numbers and
has no metadata, a JSON number literal may be used.

Specifically:

- the number fits in a 64-bit binary floating point, as per **IEEE 754-2008**, with a 
  53-bit significand (about 15 digits of precision) and 11-bit exponent.
  If negative, its range is from $-1.797693134862315 \cdot 10^{+308}$ to $-2.225073858507201\cdot 10^{-308}$ 
  and if positive from $2.225073858507201\cdot 10^{-308}$ to $1.797693134862315\cdot 10^{+308}$
- the number is finite: it is not `+Infinity` `-Infinity` or `NaN`.

```json example
0
-234.534e-46
```


The numeric values below may not be represented as JSON number literals:

```json example
// Exponent out of bounds
{ "num": "5.78e400" }

// Too many digits
{ "num": "3.14159265358979323846264338327950288419716" }

// Non-finite numeric value
{ "num": "-Infinity" }
```

### Numbers as String Literals

An alternate representation of a **number** with no extra metadata is as a
string following the format described above.

This allows for a shorthand representation of numbers with a higher precision or
greater range than JSON numbers.

```json example
"3.14159265358979323846264338327950288419716"
"+Infinity"
```

## Strings

A MathJSON **string** is either:

- an object literal with a `"str"` key
- a [JSON string](https://tools.ietf.org/html/rfc7159#section-7) that starts and
  ends with **U+0027 `'` APOSTROPHE**.
- a JSON string that is not an identifier shorthand or a number, that is a 

MathJSON strings must be [well formed JSON strings](https://tc39.es/proposal-well-formed-stringify/), which means they must escape surrogate codepoints `U+D800` to `U+DFFF`, control characters `U+0000` to `U+001F`, and the characters **U+0022 `'` QUOTATION MARK** and **U+005C `\` REVERSE SOLIDUS** (backslash).


<div className="symbols-table first-column-header" style={{'--first-col-width': '9ch'}}>

| Codepoint                | Name                            | Escape Sequence      |
| :----------------------- | :------------------------------ | :------------------- |
| **U+0000** to **U+001F** |                                 | `\u0000` to `\u001f` |
| **U+0008**               | **BACKSPACE**                   | `\b` or `\u0008`     |
| **U+0009**               | **TAB**                         | `\t` or `\u0009`     |
| **U+000A**               | **LINE FEED**                   | `\n` or `\u000a`     |
| **U+000C**               | **FORM FEED**                   | `\f` or `\u000c`     |
| **U+000D**               | **CARRIAGE RETURN**             | `\r` or `\u000d`     |
| **U+0022**               | **QUOTATION MARK**              | `\"` or `\u0022`    |
| **U+005C**               | **REVERSE SOLIDUS** (backslash) | `\\` or `\u005c`     |
| **U+D800** to **U+DFFF** | **SURROGATE CODEPOINTS**        | `\uD800` to `\uDFFF`  |
</div>

Any character may be escaped using the `\u` escape sequence, which is a
Unicode escape sequence of the form `\uXXXX` where `XXXX` is a four-digit hexadecimal codepoint. The hexadecimal letters `A` though `F` can be upper or lower case.

To escape a character that is not in the Basic Multilingual Plane (BMP), 
the character is represented as a 12-character sequence, encoding the UTF-16 
surrogate pair.

For example, the character **U+1F34E 🍎 RED APPLE** is represented as the sequence `\uD83C\uDF4E`.

The encoding of the string follows the encoding of the JSON payload: UTF-8,
UTF-16LE, UTF-16BE, etc...

```json example
"'Alan Turing'"
```

## Functions

A MathJSON function expression is either:

- an object literal with a `"fn"` key.
- a JSON array

Function expressions in the context of MathJSON may be used to represent
mathematical functions but are more generally used to represent the application
of a function to some arguments.

The function expression `["Add", 2, 3]` applies the function named `Add` to the
arguments `2` and `3`.

### Functions as Object Literal

The default representation of **function  expressions** is an object literal with
a `"fn"` key. The value of the `fn` key is an array representing the function 
operator (its name) and its arguments (its operands).

```js
{
  "fn": [Operator, ...Operands[]]
}
```

For example:
- $$2+x$$: `{ "fn": ["Add", 2, "x"] }`
- $$\sin(2x+\pi)$$: `{ "fn": ["Sin", ["Add", ["Multiply", 2, "x"], "Pi"]] }`
- $$x^2-3x+5$$: `{ "fn": ["Add", ["Power", "x", 2], ["Multiply", -3, "x"], 5] }`


### Functions as JSON Arrays

If a **function expression** has no extra metadata it may be represented as a JSON array.

For example these two expressions are equivalent:

```json example
{ "fn": ["Cos", ["Add", "x", 1]] }

["Cos", ["Add", "x", 1]]
```

:::note
An array representing a function must have at least one element, the operator of the
function. Therefore `[]` is not a valid expression.
:::

### Function Operator

The **operator** of the function expression is the first element in the array. 
Its presence is required. It indicates the **name of the function**: this is 
what the function is about.

The operator is a symbol following the conventions for function names (see
below).

```json example
// Apply the function "Sin" to the argument "x"
["Sin", "x"]

// Apply "Cos" to a function expression
["Cos", ["Divide", "Pi", 2]]
```

Following the operator are zero or more **arguments** (or **operands**),
which are expressions.

:::warning[CAUTION]
The arguments of a function are expressions. To represent an
argument which is a list, use a `["List"]` expression, do not use a JSON array.
:::

The expression corresponding to $ \sin^{-1}(x) $ is:

```json example
["Apply", ["InverseFunction", "Sin"], "x"]
```

The operator of this expression is `"Apply"` and its argument are the expressions
`["InverseFunction", "Sin"]` and `"x"`.

### Shorthands

The following shorthands are allowed:

- A `["Dictionary"]` expression may be represented as a string starting with
  **U+007B `{` LEFT CURLY BRACKET** and ending with **U+007D `}` RIGHT CURLY BRACKET**. The string must be a valid JSON object literal.
- A `["List"]` expression may be represented as a string starting with 
  **U+005B `[` LEFT SQUARE BRACKET** and ending with
  **U+005D `]` RIGHT SQUARE BRACKET**. The string must be a valid JSON array.

```json example
"{\"x\": 2, \"y\": 3}"
// ➔ ["Dictionary", ["Tuple", "x", 2], ["Tuple", "y", 3]]

"[1, 2, 3]"
// ➔ ["List", 1, 2, 3]
```

## Symbols

A MathJSON **symbol** is either:

- an object literal with a `"sym"` key
- a JSON string

Symbols are JSON strings that represent the names of symbols, variables, 
constants, wildcards and functions.

Before they are used, JSON escape sequences (such as `\u` sequences, `\\`, etc.)
are decoded.

The symbols are then normalized to the
[Unicode Normalization Form C (NFC)](https://unicode.org/reports/tr15/). They
are stored internally and compared using the Unicode NFC.

For example, these four JSON strings represent the same symbol:

- `"Å"`
- `"A\u030a"` **U+0041 `A‌` LATIN CAPITAL LETTER** + **U+030A ` ̊` COMBINING RING
  ABOVE**
- `"\u00c5"` **U+00C5 `Å` LATIN CAPITAL LETTER A WITH RING ABOVE** 
- `"\u0041\u030a"` **U+0041 `A‌`  LATIN CAPITAL LETTER A** + **U+030A ` ̊` COMBINING RING
  ABOVE**

Symbols conform to a profile of
[UAX31-R1-1](https://unicode.org/reports/tr31/) with the following
modifications:

- The character **U+005F `_` LOW LINE** is added to the `Start` character set
- The characters should belong to a
  [recommended script](https://www.unicode.org/reports/tr31/#Table_Recommended_Scripts)
- A symbol can be a sequence of one or more emojis. Characters that have
  both the Emoji and XIDC property are only considered emojis when they are
  preceded with emoji modifiers. The definition below is based on
  [Unicode TR51](https://unicode.org/reports/tr51/#EBNF_and_Regex) but modified
  to exclude invalid symbols.

Symbols match either the `NON_EMOJI_SYMBOL` or the `EMOJI_SYMBOL`
regex patterns below:

```js
const NON_EMOJI_SYMBOL = /^[\p{XIDS}_]\p{XIDC}*$/u;
```

(from [Unicode TR51](https://unicode.org/reports/tr51/#EBNF_and_Regex))

or

```js
const VS16 = "\\u{FE0F}"; // Variation Selector-16, forces emoji presentation
const KEYCAP = "\\u{20E3}"; // Combining Enclosing Keycap
const ZWJ = "\\u{200D}"; // Zero Width Joiner

const FLAG_SEQUENCE = "\\p{RI}\\p{RI}";

const TAG_MOD = `(?:[\\u{E0020}-\\u{E007E}]+\\u{E007F})`;
const EMOJI_MOD = `(?:\\p{EMod}|${VS16}${KEYCAP}?|${TAG_MOD})`;
const EMOJI_NOT_SYMBOL = `(?:(?=\\P{XIDC})\\p{Emoji})`;
const ZWJ_ELEMENT = `(?:${EMOJI_NOT_SYMBOL}${EMOJI_MOD}*|\\p{Emoji}${EMOJI_MOD}+|${FLAG_SEQUENCE})`;
const POSSIBLE_EMOJI = `(?:${ZWJ_ELEMENT})(${ZWJ}${ZWJ_ELEMENT})*`;
const EMOJI_SYMBOL = new RegExp(`^(?:${POSSIBLE_EMOJI})+$`, "u");
```

In summary, when using Latin characters, symbols can start with a letter or
an underscore, followed by zero or more letters, digits and underscores.

Carefully consider when to use non-latin characters. Use non-latin characters
for whole words, for example: `"半径"` (radius), `"מְהִירוּת"` (speed), `"直徑"`
(diameter) or `"सतह"` (surface).

Avoid mixing Unicode characters from different scripts in the same symbols.

Do not include bidi markers such as **U+200E `LTR`***  or **U+200F `RTL`** in
symbols. LTR and RTL marks should be added as needed by the client
displaying the symbol. They should be ignored when parsing symbols.

Avoid visual ambiguity issues that might arise with some Unicode characters. For
example:

- prefer using `"gamma"` rather than **U+0194 `ɣ` LATIN SMALL LETTER GAMMA**
  or **U+03B3 `γ` GREEK SMALL LETTER GAMMA**
- prefer using `"Sum"` rather than **U+2211 `∑` N-ARY SUMMATION**, which can
  be visually confused with **U+03A3 `Σ` GREEK CAPITAL LETTER SIGMA**.

---

The following naming convention for wildcards, variables, constants and function
names are recommendations.

### Wildcards Naming Convention

Symbols that begin with **U+005F `_` LOW LINE** (underscore) should be used to
denote wildcards and other placeholders.

For example, they may be used to denote the positional parameter in a function
expression. They may also denote placeholders and captured expression in
patterns.

<div className="symbols-table first-column-header" style={{'--first-col-width': '7ch'}}>

| Wildcard                    |                                                                       |
| :-------------------------- | :-------------------------------------------------------------------- |
| `"_"`                       | Wildcard for a single expression or for the first positional argument |
| `"_1"`                      | Wildcard for a positional argument                                    |
| <code>"\_&#x200A;\_"</code> | Wildcard for a sequence of 1 or more expression                       |
| `"___"`                     | Wildcard for a sequence of 0 or more expression                       |
| `"_a"`                      | Capturing an expression as a wildcard named `a`                       |

</div>

### Variables Naming Convention

- If a variable is made of several words, use camelCase. For example
  `"newDeterminant"`

- Prefer clarity over brevity and avoid obscure abbreviations.

  Use `"newDeterminant"` rather than `"newDet"` or `"nDet"`

### Constants Naming Convention

- If using latin characters, the first character of a constant should be an
  uppercase letter `A`-`Z`

- If the name of a constant is made up of several words, use PascalCase. For example
  `"SpeedOfLight"`

### Function Names Naming Convention

- The name of the functions in the MathJSON Standard Library starts with an
  uppercase letter `A`-`Z`. For example `"Sin"`, `"Reduce"`.

- The name of your own functions can start with a lowercase or uppercase letter.

- If the name of a function is made up of several words, use PascalCase or camelCase. For example
  `"InverseFunction"` or `"inverseFunction"`.

### LaTeX Rendering Conventions

The following recommendations may be followed by clients displaying MathJSON
symbols with LaTeX, or parsing LaTeX to MathJSON symbols.

These recommendations do not affect computation or manipulation of expressions
following these conventions.

- A symbol may be composed of a main body, some modifiers, some style
  variants, some subscripts and superscripts. For example:
    - `"alpha_0__prime"` $$\alpha_0^\prime $$
    - `"x_vec"` $$ \vec{x} $$
    - `"Re_fraktur"` $$\mathfrak{Re} $$.
- Subscripts are indicated by an underscore `_` and superscripts by a
  double-underscore `__`. There may be more than one superscript or subscript,
  but they get concatenated. For example `"a_b__c_q__p"` -> `a_{b, q}^{c, p}`
  \\( a\_\{b, q\}^\{c, p\} \\).
- Modifiers after a superscript or subscript apply to the closest preceding
  superscript or subscript. For example `"a_b_prime"` -> `a_{b^{\prime}}`

Modifiers include:

<div className="symbols-table first-column-header" style={{'--first-col-width': '14ch'}}>

| Modifier        | LaTeX             |                          |
| :-------------- | :---------------- | ------------------------ |
| `_deg`          | `\degree`         | \\( x\degree \\)         |
| `_prime`        | `{}^\prime`       | \\( x^\{\prime\} \\)       |
| `_dprime`       | `{}^\doubleprime` | \\( x^\{\doubleprime\} \\) |
| `_ring`         | `\mathring{}`     | \\( \mathring\{x\} \\)     |
| `_hat`          | `\hat{}`          | \\( \hat\{x\} \\)          |
| `_tilde`        | `\tilde{}`        | \\( \tilde\{x\} \\)        |
| `_vec`          | `\vec{}`          | \\( \vec\{x\} \\)          |
| `_bar`          | `\overline{}`     | \\( \overline\{x\} \\)     |
| `_underbar`     | `\underline{}`    | \\( \underline\{x\} \\)    |
| `_dot`          | `\dot{}`          | \\( \dot\{x\} \\)          |
| `_ddot`         | `\ddot{}`         | \\( \ddot\{x\} \\)         |
| `_tdot`         | `\dddot{}`        | \\( \dddot\{x\} \\)        |
| `_qdot`         | `\ddddot{}`       | \\( \dddodt\{x\} \\)       |
| `_operator`     | `\operatorname{}` | \\( \operatorname\{x\} \\) |
| `_upright`      | `\mathrm{}`       | \\( \mathrm\{x\} \\)       |
| `_italic`       | `\mathit{}`       | \\( \mathit\{x\} \\)       |
| `_bold`         | `\mathbf{}`       | \\( \mathbf\{x\} \\)       |
| `_doublestruck` | `\mathbb{}`       | \\( \mathbb\{x\} \\)       |
| `_fraktur`      | `\mathfrak{}`     | \\( \mathfrak\{x\} \\)     |
| `_script`       | `\mathscr{}`      | \\( \mathscr\{x\} \\)       |

</div>

- The following common names, when they appear as the body or in a
  subscript/superscript of a symbol, may be replaced with a corresponding
  LaTeX command:

<div className="symbols-table first-column-header" style={{'--first-col-width': '15ch'}}>

| Common Names     | LaTeX         |                     |
| :--------------- | :------------ | ------------------- |
| `alpha`          | `\alpha`      | \\( \alpha \\)      |
| `beta`           | `\beta`       | \\( \beta \\)       |
| `gamma`          | `\gamma`      | \\( \gamma \\)      |
| `delta`          | `\delta`      | \\( \delta \\)      |
| `epsilon`        | `\epsilon`    | \\( \epsilon \\)    |
| `epsilonSymbol`  | `\varepsilon` | \\( \varepsilon \\) |
| `zeta`           | `\zeta`       | \\( \zeta \\)       |
| `eta`            | `\eta`        | \\( \eta \\)        |
| `theta`          | `\theta`      | \\( \theta \\)      |
| `thetaSymbol`    | `\vartheta`   | \\( \vartheta \\)   |
| `iota`           | `\iota`       | \\( \iota \\)       |
| `kappa`          | `\kappa`      | \\( \kappa \\)      |
| `kappaSymbol`    | `\varkappa`   | \\( \varkappa \\)   |
| `mu`             | `\mu`         | \\( \mu \\)         |
| `nu`             | `\nu`         | \\( \nu \\)         |
| `xi`             | `\xi`         | \\( \xi \\)         |
| `omicron`        | `\omicron`    | \\( \omicron \\)    |
| `piSymbol`       | `\varpi`      | \\( \varpi \\)      |
| `rho`            | `\rho`        | \\( \rho \\)        |
| `rhoSymbol`      | `\varrho`     | \\( \varrho \\)     |
| `sigma`          | `\sigma`      | \\( \sigma \\)      |
| `finalSigma`     | `\varsigma`   | \\( \varsigma \\)   |
| `tau`            | `\tau`        | \\( \tau \\)        |
| `phi`            | `\phi`        | \\( \phi \\)        |
| `phiLetter`      | `\varphi`     | \\( \varphi \\)     |
| `upsilon`        | `\upsilon`    | \\( \upsilon \\)    |
| `chi`            | `\chi`        | \\( \chi \\)        |
| `psi`            | `\psi`        | \\( \psi \\)        |
| `omega`          | `\omega`      | \\( \omega \\)      |
| `Alpha`          | `\Alpha`      | \\( \Alpha \\)      |
| `Beta`           | `\Beta`       | \\( \Beta \\)       |
| `Gamma`          | `\Gamma`      | \\( \Gamma \\)      |
| `Delta`          | `\Delta`      | \\( \Delta \\)      |
| `Epsilon`        | `\Epsilon`    | \\( \Epsilon \\)    |
| `Zeta`           | `\Zeta`       | \\( \Zeta \\)       |
| `Eta`            | `\Eta`        | \\( \Eta \\)        |
| `Theta`          | `\Theta`      | \\( \Theta \\)      |
| `Iota`           | `\Iota`       | \\( \Iota \\)       |
| `Kappa`          | `\Kappa`      | \\( \Kappa \\)      |
| `Lambda`         | `\Lambda`     | \\( \Lambda \\)     |
| `Mu`             | `\Mu`         | \\( \Mu \\)         |
| `Nu`             | `\Nu`         | \\( \Nu \\)         |
| `Xi`             | `\Xi`         | \\( \Xi \\)         |
| `Omicron`        | `\Omicron`    | \\( \Omicron \\)    |
| `Pi`             | `\Pi`         | \\( \Pi \\)         |
| `Rho`            | `\Rho`        | \\( \Rho \\)        |
| `Sigma`          | `\Sigma`      | \\( \Sigma \\)      |
| `Tau`            | `\Tau`        | \\( \Tau \\)        |
| `Phi`            | `\Phi`        | \\( \Phi \\)        |
| `Upsilon`        | `\Upsilon`    | \\( \Upsilon \\)    |
| `Chi`            | `\Chi`        | \\( \Chi \\)        |
| `Psi`            | `\Psi`        | \\( \Psi \\)        |
| `Omega`          | `\Omega`      | \\( \Omega \\)      |
| `digamma`        | `\digamma`    | \\( \digamma \\)    |
| `aleph`          | `\aleph`      | \\( \aleph \\)      |
| `lambda`         | `\lambda`     | \\( \lambda \\)     |
| `bet`            | `\beth`       | \\( \beth \\)       |
| `gimel`          | `\gimel`      | \\( \gimel \\)      |
| `dalet`          | `\dalet`      | \\( \dalet \\)      |
| `ell`            | `\ell`        | \\( \ell \\)        |
| `turnedCapitalF` | `\Finv`       | \\( \Finv \\)       |
| `turnedCapitalG` | `\Game`       | \\( \Game \\)       |
| `weierstrass`    | `\wp`         | \\( \wp \\)         |
| `eth`            | `\eth`        | \\( \eth \\)        |
| `invertedOhm`    | `\mho`        | \\( \mho \\)        |
| `hBar`           | `\hbar`       | \\( \hbar \\)       |
| `hSlash`         | `\hslash`     | \\( \hslash \\)     |
| `blacksquare`    | `\hslash`     | \\( \hslash \\)     |
| `bottom`         | `\bot`        | \\( \bot \\)        |
| `bullet`         | `\bullet`     | \\( \bullet \\)     |
| `circle`         | `\circ`       | \\( \circ \\)       |
| `diamond`        | `\diamond`    | \\( \diamond \\)    |
| `times`          | `\times`      | \\( \times \\)      |
| `top`            | `\top`        | \\( \top \\)        |
| `square`         | `\square`     | \\( \square \\)     |
| `star`           | `\star`       | \\( \star \\)       |

</div>

- The following names, when used as a subscript or superscript, may be replaced
  with a corresponding LaTeX command:

<div className="symbols-table first-column-header">

| Subscript/Supscript | LaTeX                 |                            |
| :------------------ | :-------------------- | -------------------------- |
| `plus`              | `{}_{+}` / `{}^{+}`   | \\( x\_\{+\} x^+\\)          |
| `minus`             | `{}_{-}` /`{}^{-}`    | \\( x\_\{-\} x^-\\)          |
| `pm`                | `{}_\pm` /`{}^\pm`    | \\( x\_\{\pm\} x^\pm \\)     |
| `ast`               | `{}_\ast` /`{}^\ast`  | \\( \{x\}\_\ast x^\ast \\)   |
| `dag`               | `{}_\dag` /`{}^\dag`  | \\( \{x\}\_\dag x^\dag \\)   |
| `ddag`              | `{}_\ddag` `{}^\ddag` | \\( \{x\}\_\ddag x^\ddag \\) |
| `hash`              | `{}_\#` `{}^\#`       | \\( \{x\}\_\# x^\#\\)        |

</div>

- Multi-letter symbols may be rendered with a `\mathit{}`, `\mathrm{}` or
  `\operatorname{}` command.

- Symbol fragments ending in digits may be rendered with a corresponding
  subscript.

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Symbol           | LaTeX              |                           |
| :------------------- | :----------------- | ------------------------- |
| `time`               | `\mathrm{time}`    | \\( \mathrm\{time\} \\)     |
| `speed_italic`       | `\mathit{speed}`   | \\( \mathit\{speed\} \\)    |
| `P_blackboard__plus` | `\mathbb{P}^{+}`   | $$ \mathbb{P}^+ $$      |
| `alpha`              | `\alpha`           | \\( \alpha \\)            |
| `mu0`                | `\mu_{0}`          | \\( \mu_0 \\)             |
| `m56`                | `m_{56}`           | \\( m\_\{56\} \\)           |
| `c_max`              | `\mathrm{c_{max}}` | \\( \mathrm\{c\_\{max\}\} \\) |

</div>


## Dictionaries

MathJSON supports the concept of **dictionaries**, which are collections of 
key-value pairs. 

Dictionaries can be represented as a `["Dictionary"]` expression, with 
its arguments being tuples of key-value pairs.

```json example
["Dictionary", 
  ["Tuple", "'x'", 120], 
  ["Tuple", "'y'", 36]
]
```

The value of the key-value tuples can be any valid MathJSON expression, including
numbers, strings, functions, lists, or other dictionaries.

For example, the following dictionary contains an expression and a list as values:

```json example
["Dictionary",
  ["Tuple", "'expression'", ["Add", "x", 1]],
  ["Tuple", "'list'", ["List", 1, 2, 3]]
]
```


Dictionaries can also be represented as a JSON object literal with a `"dict"` key,
which is an object with string keys and values that can be any valid MathJSON
expression.


```js
{
  "dict": {
    "expression":  ["Add", "x", 1] ,
    "list": ["List", 1, 2, 3] 
  }
}
```

The keys of a dictionary are Unicode strings. They are compared using the
[Unicode Normalization Form C (NFC)](https://unicode.org/reports/tr15/).
Keys must be unique within a dictionary.


## Metadata

MathJSON object literals may be annotated with supplemental information.

A **number** represented as a JSON number literal, a **symbol** or **string**
represented as a JSON string literal, or a **function** represented as a JSON
array must be transformed into the equivalent object literal to be annotated.

The following metadata keys are recommended:

<div className="symbols-table first-column-header" style={{'--first-col-width': '14ch'}}>

| Key             | Note                                                                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wikidata`      | A short string indicating an entry in a wikibase.<br/>This information can be used to disambiguate the meaning of a symbol. Unless otherwise specified, the entry in this key refers to an entry in the `wikidata.org` wikibase                                               |
| `comment`       | A human readable plain string to annotate an expression, since JSON does not allow comments in its encoding                                                                  |
| `documentation` | A Markdown-encoded string providing documentation about this expression.                                                                                                     |
| `latex`         | A visual representation in LaTeX of the expression. <br/> This can be useful to preserve non-semantic details, for example parentheses in an expression or styling attributes |
| `sourceUrl`     | A URL to the source of this expression                                                                                                                                       |
| `sourceContent` | The source from which this expression was generated.<br/> It could be a LaTeX expression, or some other source language.                                                      |
| `sourceOffsets` | A pair of character offsets in `sourceContent` or `sourceUrl` from which this expression was produced                                                                        |
| `hash`          | A string representing a digest of this expression.                                                                                                                           |

</div>

```json example
{
  "sym": "Pi",
  "comment": "The ratio of the circumference of a circle to its diameter",
  "wikidata": "Q167",
  "latex": "\\pi"
}

{
  "sym": "Pi",
  "comment": "The greek letter ∏",
  "wikidata": "Q168",
}
```

## MathJSON Standard Library

This document defines the structure of MathJSON expression. The MathJSON
Standard Library defines a recommended **vocabulary** to use in MathJSON
expressions.

Before considering inventing your own vocabulary, check if the MathJSON Standard
Library already provides relevant definitions.

The MathJSON Standard Library includes definitions for:

<div className="symbols-table" style={{"--first-col-width":"21ch"}}>

| Topic                                                               |                                                                        |
| :------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| [Arithmetic](/compute-engine/reference/arithmetic/)                 | `Add` `Multiply` `Power` `Exp` `Log` `ExponentialE` `ImaginaryUnit`... |
| [Calculus](/compute-engine/reference/calculus/)                     | `D` `Derivative` `Integrate`...                                        |
| [Collections](/compute-engine/reference/collections/)               | `List` `Reverse` `Filter`...                                           |
| [Complex](/compute-engine/reference/complex/)                       | `Real` `Conjugate` `ComplexRoots`...                                  |
| [Control Structures](/compute-engine/reference/control-structures/) | `If` `Block` `Loop` ...                                                |
| [Core](/compute-engine/reference/core/)                             | `Declare` `Assign` `Error` `LatexString`...                          |
| [Functions](/compute-engine/reference/functions/)                   | `Function` `Apply` `Return` ...                                        |
| [Logic](/compute-engine/reference/logic/)                           | `And` `Or` `Not` `True` `False` `ForAll` ...                            |
| [Sets](/compute-engine/reference/sets/)                             | `Union` `Intersection` `EmptySet` `RealNumbers` `Integers`  ...                                  |
| [Special Functions](/compute-engine/reference/special-functions/)   | `Gamma` `Factorial`...                                                 |
| [Statistics](/compute-engine/reference/statistics/)                 | `StandardDeviation` `Mean` `Erf`...                                    |
| [Strings and Text](/compute-engine/reference/strings/)              | `Text` `Annotated`...                                                 |
| [Trigonometry](/compute-engine/reference/trigonometry/)             | `Pi` `Cos` `Sin` `Tan`...                                              |

</div>

When defining a new function, avoid using a name already defined in the Standard
Library.

<ReadMore path="/compute-compute-engine/guides/augmenting/">
Read more about **Adding New Definitions**<Icon name="chevron-right-bold" />
</ReadMore>

