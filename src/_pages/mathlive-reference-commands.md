---
layout: single
date: Last Modified
title: LaTeX Commands
permalink: /mathlive/reference/commands/
read_time: false
version: Version
sidebar:
    - nav: "universal"
toc: true
render_math_in_document: true
---

<style>
  ul.command-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  ul.command-list,
  .command-list li {
    margin: 0;
    padding: 10px;
    list-style: none;
  }

  .command-list li span.math {
    display: inline-block;
    width: 80px;
  }

  .math {
    visibility: hidden;
  }

  .math.frame {
    display: flex;
    justify-content: center;
    padding: 1em;
    border-radius: 4px;
    border: var(--ui-border);
  }


  body.ready .math {
    visibility: visible;
  }

  .deprecated {
    padding: 1em;
    border-left: 4px solid var(--orange-900);
  }
  .deprecated h3 {
    margin: 0 0 0.5em 0;
  }
  .no-header thead {
    display: none;
  }

  table {
    width: auto;
  }


  .full-width table {
    display: inline-table;
    width: 100%;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .no-line td {
    border: none;
  }
  .thin-line td {
    border-top: 0.5px solid var(--table-thin-line-color);
    border-bottom: 0.5px solid var(--table-thin-line-color);
  }
  .thin-line td:not(:last-child) {
    border-right: 0.5px solid var(--table-thin-line-color);
  }
  .two-col table tr td, 
  .two-col table tr td:first-child {
    width: 50%;
  }
  .two-col table tr td .math {
    text-align: center;
  }
  .three-col table tr td, 
  .three-col table tr td:first-child {
    width: 33%;
  }
  .three-col table tr td .math {
    text-align: center;
  }


@media (max-width: 768px) {
  .two-col table tr, .three-col table tr {
    display: flex;
    flex-flow: column;
    margin-top: 1em;
  }
  .two-col table tr td, 
  .three-col table tr td, 
  .three-col table tr td:first-child {
    width: 100%
  }
  .three-col.thin-line td:not(:last-child) {
    border-right: none;
  }

  .symbols-table table tr {
    display: flex;
    flex-flow: column;
    margin-bottom: 2em;
  }

  ul.command-list, .command-list li {
    display: flex;
    flex-flow: column;
  }

}

  .math-80px span.math {
    display: inline-block;
    width: 80px;
  }

  .side-by-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .side-by-side > * {
    flex: 1 1 0;
  }
  .side-by-side > div.math {
    display: flex;
    justify-content: center;
    padding: 1em;
    border-right: var(--border-color);
    margin: 0 0.5em 0.5em 0.5em;
  }
  .side-by-side > pre {
    background: #f0f0f0;
    color: #35324e;
    font-size: .9em;
    white-space: break-spaces;
  }
</style>


MathLive supports over 800 LaTeX commands.{.xl}

{% readmore "http://detexify.kirelabs.org/classify.html" %}
If you know the shape of a symbol, use <strong>Detexify</strong> to find the 
name of the corresponding LaTeX command
{% endreadmore %}

**To enter a LaTeX command** press the **ESC** key or `\`  to enter LaTeX editing
mode. Press **ESC** to exit LaTeX editing mode. You can examine the LaTeX 
code for an expression by selecting it, then pressing **ESC**.


{% readmore "/mathlive/reference/keybindings" %}
The most common symbols can be entered using **keyboard shortcuts**.
{% endreadmore %}



## Text Mode, Math Mode and Math Style

### Math Mode

When in **Math Mode**, the content is laid out using typesetting rules specific
to math. For example, variables are displayed in italics, an appropriate amount
of space is inserted around some letters such as "f" to improve their legibility
and white spaces are ignored.

In Math Mode, the layout and size of some math elements is adjusted based on the
context in which they are used. For example, superscripts and subscripts are
displayed in a smaller font.


**To override the default <strong><em>math style</em></strong>**, use the following commands:

<div class='symbols-table'>

| Math Style |  |  | | 
| :---- | :---- | :--- | :--- |
| `\displaystyle` | `\displaystyle \sum_{i=0}^n \frac{a_i}{1+x}`<br><span class='math'>$$\displaystyle \sum_{i=0}^n \frac{a_i}{1+x} $$</span> |  For equations in their own paragraph |
| `\textstyle` | `\textstyle \sum_{i=0}^n \frac{a_i}{1+x}`<br><span class='math'>$$\textstyle \sum_{i=0}^n \frac{a_i}{1+x} $$</span> | Confusingly, for **inline math**, not for text mode |
| `\scriptstyle` | `\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x}`<br><span class='math'>$$\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$</span> |  For subscripts and superscripts |
| `\scriptscriptstyle` | `\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x}`<br><span class='math'>$$\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$</span> |  For subscripts and superscripts of subscripts and superscripts |

</div>

### Text Mode

**To include some textual comments**, use the `\text{}` command to switch 
to **Text Mode**.

<div class='no-line two-col'>

| Math Mode | Text Mode | 
| :---- | :---- |
| <span class='math'>$$if and only if x > 0$$</span> | <span class='math'>$$\text{if and only if } x > 0$$</span> | 
| `if and only if x > 0` | `\text{if and only if } x > 0` | 

</div>

The `\text{}` command will use the font defined by the `font-family` attribute
of the enclosing mathfield. The size of the text will adjust depending on 
the current math style (smaller in superscript/subscript).

---

The `\textrm{}` command works like `\text{}` but will use a serif (roman) font.

<div class="side-by-side">

  <div class='math frame'>$$\textrm{Don Knuth}_\textrm{Don Knuth} $$</div>

  ```tex
    \textrm{Don Knuth}_\textrm{Don Knuth}
  ```
</div>

---

The `\mbox{}` command uses the same font as `\text` but its size does not 
account for the current math style.

<div class="side-by-side">
  <div class='math frame'>$$\mbox{Don Knuth}_\mbox{Don Knuth} $$</div>

  ```tex
    \mbox{Don Knuth}_\mbox{Don Knuth}
  ```
</div>

---

The `\textnormal{}` command works like `\text{}`. But it's longer to type.

<div class="side-by-side">
  <div class='math frame'>$$\textnormal{Don Knuth}_\textnormal{Don Knuth} $$</div>
  
  ```tex
    \textnormal{Don Knuth}_\textnormal{Don Knuth}
  ```
</div>

When in Text Mode, use `$...$` to switch back to Math Mode, Text Style (inline math) or `\\[...\\]` to switch
to Math Mode, Display Style.



## Fractions and Binomials

* <span class='math'>$$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$</span> `\frac{}{}`
* <span class='math'>$$\dfrac{\unicode{"2B1A}}{\unicode{"2B1A}}$$</span> `\dfrac{}{}`
* <span class='math'>$$\tfrac{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\tfrac{}{}`
{.command-list}

The `\dfrac` command typesets its numerator and denominator in Display Style. 
The `\tfrac` command uses Text Style (inline math).

* <span class='math'>$$\cfrac[l]{1}{x+1} $$</span> `\cfrac[l]{1}{x+1}`
* <span class='math'>$$\cfrac[r]{1}{x+1} $$</span> `\cfrac[r]{1}{x+1}`
{.command-list}

The `\cfrac` (continuous fraction) command has an optional argument, `[l]` or 
`[r]`, that controls if the numerator is left-aligned or right-aligned.


* <span class='math'>$$\pdiff{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\pdiff{}{}`
{.command-list}

---

* <span class='math'>$$\binom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\binom{}{}`
* <span class='math'>$$\dbinom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\dbinom{}{}`
* <span class='math'>$$\tbinom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\tbinom{}{}`
{.command-list}

<section class='deprecated'>
The following commands are supported but their usage is generally discouraged
when creating modern LaTeX content.

* <span class='math'>$$a \over b $$</span> `a \over b`
* <span class='math'>$$a \atop b $$</span> `a \atop b`
* <span class='math'>$$n \choose k $$</span> `n \choose k`
* <span class='math'>$${\unicode{"2B1A} \overwithdelims\lbrace\rbrace \unicode{"2B1A}} $$</span> `\overwithdelims\lbrace\rbrace`
* <span class='math'>$${\unicode{"2B1A} \atopwithdelims\lbrace\rbrace \unicode{"2B1A}} $$</span> `\atopwithdelims\lbrace\rbrace`
{.command-list}

</section>

## Binary Operators

Some binary operators can also be used as a unary operator: `+`, `-`, etc...
Their spacing is adjusted accordingly. For example in $$-1-2$$
there is less space between `-` and `1` than there is between `-` and `2`.

* <span class='math'>$$+ $$</span>   `+`
* <span class='math'>$$- $$</span>   `-`
* <span class='math'>$$\pm $$</span>   `\pm`
* <span class='math'>$$\mp $$</span>   `\mp`
* <span class='math'>$$* $$</span>   `*`
* <span class='math'>$$\cdot $$</span>   `\cdot`
* <span class='math'>$$\times $$</span>   `\times`
* <span class='math'>$$a / b $$</span>   `a / b`
* <span class='math'>$$\nicefrac{3}{4}$$</span>   `\nicefrac{3}{4}` (macro)
* <span class='math'>$$\div $$</span>   `\div`
* <span class='math'>$$\divides $$</span>   `\divides`
* <span class='math'>$$\sqrt{\unicode{"2B1A}} $$</span> `\sqrt{}`
* <span class='math'>$$\sqrt[\unicode{"2B1A}]{\unicode{"2B1A}} $$</span> `\sqrt[]{}`
* <span class='math'>$$\surd $$</span>   `\surd{}` 
* <span class='math'>$$\ltimes $$</span>   `\ltimes`
* <span class='math'>$$\rtimes $$</span>   `\rtimes`
* <span class='math'>$$\leftthreetimes $$</span>   `\leftthreetimes`
* <span class='math'>$$\rightthreetimes $$</span>   `\rightthreetimes`
* <span class='math'>$$\intercal $$</span>   `\intercal`
* <span class='math'>$$\dotplus $$</span>   `\dotplus`
* <span class='math'>$$\doublebarwedge $$</span>   `\doublebarwedge`
* <span class='math'>$$\divideontimes $$</span>   `\divideontimes`
{.command-list}

<br>

* <span class='math'>$$\boxminus $$</span>   `\boxminus`
* <span class='math'>$$\boxplus $$</span>   `\boxplus`
* <span class='math'>$$\boxtimes $$</span>   `\boxtimes`
* <span class='math'>$$\boxdot $$</span>   `\boxdot`
{.command-list}

<br>

* <span class='math'>$$\ominus $$</span>   `\ominus`
* <span class='math'>$$\oplus $$</span>   `\oplus`
* <span class='math'>$$\otimes $$</span>   `\otimes`
* <span class='math'>$$\odot $$</span>   `\odot`
* <span class='math'>$$\circ $$</span>   `\circ`
* <span class='math'>$$\centerdot $$</span>   `\centerdot`
* <span class='math'>$$\bullet $$</span>   `\bullet`
* <span class='math'>$$\circleddash $$</span>   `\circleddash`
* <span class='math'>$$\circledast $$</span>   `\circledast`
* <span class='math'>$$\circledcirc $$</span>   `\circledcirc`
* <span class='math'>$$\oslash $$</span>   `\oslash`
{.command-list}

<br>

* <span class='math'>$$\ast $$</span>   `\ast`
* <span class='math'>$$\star $$</span>   `\star`
{.command-list}

## Functions

* <span class='math'>$$\det $$</span> `\det`
* <span class='math'>$$\exp $$</span> `\exp`
* <span class='math'>$$\ker $$</span> `\ker`
* <span class='math'>$$\ln $$</span> `\ln`
* <span class='math'>$$\log $$</span> `\log`
{.command-list}




### Trigonometry

* <span class='math'>$$\degree $$</span> `\degree`
* <span class='math'>$$\arccos $$</span> `\arccos`
* <span class='math'>$$\arcsin $$</span> `\arcsin`
* <span class='math'>$$\arctan $$</span> `\arctan`
* <span class='math'>$$\arctg $$</span> `\arctg`
* <span class='math'>$$\arcctg $$</span> `\arcctg`
* <span class='math'>$$\ch $$</span> `\ch`
* <span class='math'>$$\cos $$</span> `\cos`
* <span class='math'>$$\cosh $$</span> `\cosh`
* <span class='math'>$$\cot $$</span> `\cot`
* <span class='math'>$$\coth $$</span> `\coth`
* <span class='math'>$$\ctg $$</span> `\ctg`
* <span class='math'>$$\cth $$</span> `\cth`
* <span class='math'>$$\cotg $$</span> `\cotg`
* <span class='math'>$$\csc $$</span> `\csc`
* <span class='math'>$$\cosec $$</span> `\cosec`
* <span class='math'>$$\lg $$</span> `\lg`
* <span class='math'>$$\lb $$</span> `\lb`
* <span class='math'>$$\sec $$</span> `\sec`
* <span class='math'>$$\sh $$</span> `\sh`
* <span class='math'>$$\sin $$</span> `\sin`
* <span class='math'>$$\sinh $$</span> `\sinh`
* <span class='math'>$$\tan $$</span> `\tan`
* <span class='math'>$$\tanh $$</span> `\tanh`
* <span class='math'>$$\tg $$</span> `\tg`
* <span class='math'>$$\th $$</span> `\th`
{.command-list}


### Bounds

* <span class='math'>$$\max $$</span> `\max`
* <span class='math'>$$\min $$</span> `\min`
* <span class='math'>$$\sup $$</span> `\sup`
* <span class='math'>$$\inf $$</span> `\inf`
* <span class='math'>$$\lim $$</span> `\lim`
* <span class='math'>$$\liminf $$</span> `\liminf`
* <span class='math'>$$\limsup $$</span> `\limsup`
* <span class='math'>$$\dim $$</span> `\dim`
{.command-list}

### Projections

* <span class='math'>$$\Pr $$</span> `\Pr`
* <span class='math'>$$\hom $$</span> `\hom`
* <span class='math'>$$\arg $$</span> `\arg`
{.command-list}

### Modulo

* <span class='math'>$$n \pmod{3} $$</span> `n \pmod{3}`
* <span class='math'>$$n \mod{3} $$</span> `n \mod{3}`
* <span class='math'>$$n \bmod 3 $$</span> `n \bmod 3`

### Custom Functions

* <span class='math'>$$\operatorname{argth}(\theta) $$</span> `\operatorname{argth}(\theta)`



## Unicode

<div class=symbols-table>

| Command | | 
| :--- | :--- | 
| `\unicode{}` | The argument is a Unicode codepoint expressed as a number. To use a hexadecimal number, start the argument with `x` or `"` and use **uppercase** `A`-`F` for hexadecimal digits.<br><ul><li><span class='math'>\\(\unicode{10775} \\)</span> `\unicode{10775}`</li><li><span class='math'>\\(\unicode{"2A17} \\)</span> `\unicode{"2A17}`</li><li><span class='math'>\\(\unicode{x2A17} \\)</span> `\unicode{x2A17}`</li></ul> |
| `\char` | The argument is also a Unicode codepoint, but the `{`...`}` delimiters are optional when using `"`. <br> <ul><li><span class='math'>\\(\char"2A17 \\)</span> `\char"2A17`  </li></ul> |
| `^^` <br> `^^^^` | Followed by 2 or 4 hexadecimal digits with **lowercase** `a`-`f` to specify a Unicode codepoint.<br><ul><li><span class='math'>\\(^^4a \\)</span> `^^4a`</li><li><span class='math'>\\(^^^^2a17 \\)</span> `^^^^2a17`</li></ul> | 

</div>



The codepoint of the Unicode character &#x2A17; **U+2A17 INTEGRAL WITH LEFTWARDS ARROW WITH HOOK** is 10775 in decimal, 2A17<sub>16</sub> in hexadecimal. The codepoint of the letter `J` is 004A<sub>16</sub> in hexadecimal. Learn more about [Mathematical Operators and Symbols in Unicode on Wikipedia](https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode).{.notice--info}



## Large Operators

Large operators display their limits above and below or adjacent to the operator, 
depending on the math style (**Display Style** or **Text Style**) and on the 
operator.

The position of the limits can be controlled with `\limits`, `\nolimits` or 
`\displaylimits` after the operator. The `\limits` command forces the display
of the limits above and below the operator, `\nolimits` forces the display
of the limits adjacent to the operator, and `\displaylimits` uses an 
automatic position, based on the operator and current math style.

<div class='no-line three-col'>

| `\limits` | `\nolimits` | `\displaylimits` |  
| :---- | :---- |  :---- |
| <span class='math'>$$\sum_{i=0}^n\limits $$</span> | <span class='math'>$$\sum_{i=0}^n\nolimits $$</span> | <span class='math'>$$\sum_{i=0}^n\displaylimits $$</span> |
| `\sum_{i=0}^n\limits` | `\sum_{i=0}^n\nolimits` | `\sum_{i=0}^n\displaylimits` |
| <span class='math'>$$\int_0^\infty\limits $$</span> | <span class='math'>$$\int_0^\infty\nolimits $$</span> | <span class='math'>$$\int_0^\infty\displaylimits $$</span> |
| `\int_0^\infty\limits` | `\int_0^\infty\nolimits` | `\int_0^\infty\displaylimits` |

</div>

In Display Style, the `\intop` and `\ointop` commands display their limits 
above and below by default, while the `\int` command display its limit adjacent.

  
  
* <span class='math'>$$\sum_{n=0}^\infty $$</span> `\sum`
* <span class='math'>$$\prod_{n=0}^\infty $$</span> `\prod`
* <span class='math'>$$\coprod_{n=0}^\infty $$</span> `\coprod`
* <span class='math'>$$\int_0^\infty $$</span> `\int`
* <span class='math'>$$\intop_0^\infty $$</span> `\intop`
* <span class='math'>$$\iint_0^\infty $$</span> `\iint` -- Double integral
* <span class='math'>$$\iiint_0^\infty $$</span> `\iiint` -- Tripe integral
* <span class='math'>$$\oint_C $$</span> `\oint` -- Contour integral
* <span class='math'>$$\smallint $$</span> `\smallint` -- Always displayed small
* <span class='math'>$$\bigcup $$</span> `\bigcup`
* <span class='math'>$$\bigcap $$</span> `\bigcap`
* <span class='math'>$$\bigvee $$</span> `\bigvee`
* <span class='math'>$$\bigwedge $$</span> `\bigwedge`
* <span class='math'>$$\biguplus $$</span> `\biguplus`
* <span class='math'>$$\bigotimes $$</span> `\bigotimes`
* <span class='math'>$$\bigoplus $$</span> `\bigoplus`
* <span class='math'>$$\bigodot $$</span> `\bigodot`
* <span class='math'>$$\bigsqcup $$</span> `\bigsqcup`
{.command-list}

----

* <span class='math'>$$\oiint $$</span> `\oiint` -- Surface integral
* <span class='math'>$$\oiiint $$</span> `\oiiint` -- Volume integral
* <span class='math'>$$\intclockwise $$</span> `\intclockwise`
* <span class='math'>$$\varointclockwise $$</span> `\varointclockwise`
* <span class='math'>$$\ointctrclockwise $$</span> `\ointctrclockwise`
* <span class='math'>$$\intctrclockwise $$</span> `\intctrclockwise`
* <span class='math'>$$\Cap $$</span> `\Cap`
* <span class='math'>$$\Cup $$</span> `\Cup`
* <span class='math'>$$\doublecap $$</span> `\doublecap`
* <span class='math'>$$\doublecup $$</span> `\doublecup`
* <span class='math'>$$\sqcup $$</span> `\sqcup`
* <span class='math'>$$\sqcap $$</span> `\sqcap`
* <span class='math'>$$\uplus $$</span> `\uplus`
* <span class='math'>$$\wr $$</span> `\wr`
* <span class='math'>$$\amalg $$</span> `\amalg`
{.command-list}


## Logic

### Quantifiers

* <span class='math'>$$\forall $$</span>   `\forall`
* <span class='math'>$$\exists $$</span>   `\exists`
* <span class='math'>$$\nexists $$</span>   `\nexists`
{.command-list}

### Unary/Binary Operators

* <span class='math'>$$\land $$</span>   `\land`
* <span class='math'>$$\wedge $$</span>   `\wedge`
* <span class='math'>$$\lor $$</span>   `\lor`
* <span class='math'>$$\vee $$</span>   `\vee`
* <span class='math'>$$\barwedge $$</span>   `\barwedge`
* <span class='math'>$$\veebar $$</span>   `\veebar`
* <span class='math'>$$\nor $$</span>   `\nor`
* <span class='math'>$$\curlywedge $$</span>   `\curlywedge`
* <span class='math'>$$\curlyvee $$</span>   `\curlyvee`
* <span class='math'>$$\lnot $$</span>   `\lnot`
* <span class='math'>$$\neg $$</span>   `\neg`
{.command-list}


### Relational Operators

* <span class='math'>$$\to $$</span>   `\to`
* <span class='math'>$$\gets $$</span>   `\gets`
* <span class='math'>$$\implies $$</span>   `\implies`
* <span class='math'>$$\impliedby $$</span>   `\impliedby`
* <span class='math'>$$\biconditional $$</span>   `\biconditional`
* <span class='math'>$$\therefore $$</span>   `\therefore`
* <span class='math'>$$\because $$</span>   `\because`
* <span class='math'>$$\leftrightarrow $$</span>   `\leftrightarrow`
* <span class='math'>$$\Leftrightarrow $$</span>   `\Leftrightarrow`
* <span class='math'>$$\roundimplies $$</span>   `\roundimplies`
* <span class='math'>$$\models $$</span>   `\models`
* <span class='math'>$$\vdash $$</span>   `\vdash`
* <span class='math'>$$\dashv $$</span>   `\dashv`
{.command-list}


## Arrows

<section class='full-width no-header center thin-line three-col math-80px'>

| | | |
|:--- | :--- | :--- |
| <span class='math'>$$\rightarrow $$</span>   `\rightarrow` | <span class='math'>$$\leftarrow $$</span>   `\leftarrow`| |
| <span class='math'>$$\twoheadrightarrow $$</span>   `\twoheadrightarrow` | <span class='math'>$$\twoheadleftarrow $$</span>   `\twoheadleftarrow` |
| <span class='math'>$$\rightarrowtail $$</span>   `\rightarrowtail` | <span class='math'>$$\leftarrowtail $$</span>   `\leftarrowtail` |
| <span class='math'>$$\dashrightarrow $$</span>   `\dashrightarrow` |  <span class='math'>$$\dashleftarrow $$</span>   `\dashleftarrow` |
| <span class='math'>$$\longrightarrow $$</span>   `\longrightarrow` |  <span class='math'>$$\longleftarrow $$</span>   `\longleftarrow` |  <span class='math'>$$\longleftrightarrow $$</span>   `\longleftrightarrow`|
| <span class='math'>$$\Rightarrow $$</span>   `\Rightarrow` |  <span class='math'>$$\Leftarrow $$</span>   `\Leftarrow` |
| <span class='math'>$$\Longrightarrow $$</span>   `\Longrightarrow` | <span class='math'>$$\Longleftarrow $$</span>   `\Longleftarrow` | <span class='math'>$$\Longleftrightarrow $$</span>   `\Longleftrightarrow` |
| <span class='math'>$$\mapsto $$</span>   `\mapsto` |  <span class='math'>$$\longmapsto $$</span>   `\longmapsto` |  <span class='math'>$$\multimap $$</span>   `\multimap` | 
| <span class='math'>$$\uparrow $$</span>   `\uparrow` |  <span class='math'>$$\downarrow $$</span>   `\downarrow` |  <span class='math'>$$\updownarrow $$</span>   `\updownarrow` | 
| <span class='math'>$$\Uparrow $$</span>   `\Uparrow` | <span class='math'>$$\Downarrow $$</span>   `\Downarrow` |  <span class='math'>$$\Updownarrow $$</span>   `\Updownarrow` |
| <span class='math'>$$\rightharpoonup $$</span>   `\rightharpoonup`  |  <span class='math'>$$\leftharpoonup $$</span>   `\leftharpoonup` | 
| <span class='math'>$$\rightharpoondown $$</span>   `\rightharpoondown` |  <span class='math'>$$\leftharpoondown $$</span>   `\leftharpoondown` | 
| <span class='math'>$$\rightleftharpoons $$</span>   `\rightleftharpoons` |  <span class='math'>$$\leftrightharpoons $$</span>   `\leftrightharpoons` | 
|  <span class='math'>$$\searrow $$</span>   `\searrow` |  <span class='math'>$$\nearrow $$</span>   `\nearrow` |
|  <span class='math'>$$\swarrow $$</span>   `\swarrow`|  <span class='math'>$$\nwarrow $$</span>   `\nwarrow` |
| <span class='math'>$$\Rrightarrow $$</span>   `\Rrightarrow` |  <span class='math'>$$\Lleftarrow $$</span>   `\Lleftarrow` |
| <span class='math'>$$\leftrightarrows $$</span>   `\leftrightarrows` |  <span class='math'>$$\rightleftarrows $$</span>   `\rightleftarrows` | 
| <span class='math'>$$\curvearrowright $$</span>   `\curvearrowright` |  <span class='math'>$$\curvearrowleft $$</span>   `\curvearrowleft` | 
| <span class='math'>$$\hookrightarrow $$</span>   `\hookrightarrow` |  <span class='math'>$$\hookleftarrow $$</span>   `\hookleftarrow` | 
| <span class='math'>$$\looparrowright $$</span>   `\looparrowright` |  <span class='math'>$$\looparrowleft $$</span>   `\looparrowleft` | 
| <span class='math'>$$\circlearrowright $$</span>   `\circlearrowright` | <span class='math'>$$\circlearrowleft $$</span>   `\circlearrowleft` |
|  <span class='math'>$$\rightrightarrows $$</span>   `\rightrightarrows` |  <span class='math'>$$\leftleftarrows $$</span>   `\leftleftarrows` |
|  <span class='math'>$$\upuparrows $$</span>   `\upuparrows` |  <span class='math'>$$\downdownarrows $$</span>   `\downdownarrows` |
| <span class='math'>$$\Rsh $$</span>   `\Rsh` |  <span class='math'>$$\Lsh $$</span>   `\Lsh` |
| <span class='math'>$$\upharpoonright $$</span>   `\upharpoonright` | <span class='math'>$$\upharpoonleft $$</span>   `\upharpoonleft` |
| <span class='math'>$$\downharpoonright $$</span>   `\downharpoonright` | <span class='math'>$$\downharpoonleft $$</span>   `\downharpoonleft`  |
| <span class='math'>$$\restriction $$</span>   `\restriction` |
| <span class='math'>$$\rightsquigarrow $$</span>   `\rightsquigarrow` | <span class='math'>$$\leftrightsquigarrow $$</span>   `\leftrightsquigarrow` |
| <span class='math'>$$\leadsto $$</span>   `\leadsto` |

</section>

### Negated Arrows

<section class='full-width no-header center thin-line three-col math-80px'>

| | | |
|:--- | :--- | :--- |
| <span class='math'>$$\nrightarrow $$</span>   `\nrightarrow` | <span class='math'>$$\nleftarrow $$</span>   `\nleftarrow` | <span class='math'>$$\nleftrightarrow $$</span>   `\nleftrightarrow` |
| <span class='math'>$$\nRightarrow $$</span>   `\nRightarrow` | <span class='math'>$$\nLeftarrow $$</span>   `\nLeftarrow` | <span class='math'>$$\nLeftrightarrow $$</span>   `\nLeftrightarrow` |

</section>

### Extensible Arrows

The width of the arrow commands above is fixed. The width of the commands
below is determined by the length of the content above and below 
the arrows, which is specified as an argument (and optional argument):


<div class="side-by-side">
 <div class='math frame'>$$\xrightarrow[\text{long text below}]{}$$</div> 

  ```tex
  \xrightarrow[\text{long text below}]{}
  ```
</div>

<div class="side-by-side">
  <div class='math frame'>$$\xrightarrow{\text{long text above}}$$</div>

  ```tex
    \xrightarrow{\text{long text above}}
  ```
</div>

<div class="side-by-side">
  <div class='math frame'>$$\xrightarrow[\text{and below}]{\text{long text above}}$$</div>

  ```tex
    \xrightarrow[\text{and below}]{\text{long text above}}
  ```  
</div>


<section class='full-width no-header center thin-line two-col math-80px'>

| | |
|:--- | :--- |
| <span class='math'>$$\xlongequal[below]{above} $$</span> `\xlongequal[]{}` | 
| <span class='math'>$$\xrightarrow[below]{above} $$</span> `\xrightarrow[]{}` | <span class='math'>$$\xleftarrow[below]{above} $$</span> `\xleftarrow[]{}` |
| <span class='math'>$$\xleftrightarrow[below]{above} $$</span> `\xleftrightarrow[]{}` | 
| <span class='math'>$$\xrightleftarrows[below]{above} $$</span> `\xrightleftarrows[]{}` |
| <span class='math'>$$\xtwoheadrightarrow[below]{above} $$</span> `\xtwoheadrightarrow[]{}` | <span class='math'>$$\xtwoheadleftarrow[below]{above} $$</span> `\xtwoheadleftarrow[]{}` |
| <span class='math'>$$\xRightarrow[below]{above} $$</span> `\xRightarrow[]{}` | <span class='math'>$$\xLeftarrow[below]{above} $$</span> `\xLeftarrow[]{}` |
| <span class='math'>$$\xrightharpoonup[below]{above} $$</span> `\xrightharpoonup[]{}` | <span class='math'>$$\xleftharpoonup[below]{above} $$</span> `\xleftharpoonup[]{}` |
| <span class='math'>$$\xrightharpoondown[below]{above} $$</span> `\xrightharpoondown[]{}` | <span class='math'>$$\xleftharpoondown[below]{above} $$</span> `\xleftharpoondown[]{}` |
| <span class='math'>$$\xrightleftharpoons[below]{above} $$</span> `\xrightleftharpoons[]{}` | <span class='math'>$$\xLeftrightarrow[below]{above} $$</span> `\xLeftrightarrow[]{}` |
| <span class='math'>$$\xleftrightharpoons[below]{above} $$</span> `\xleftrightharpoons[]{}` | 
|  <span class='math'>$$\xhookrightarrow[below]{above} $$</span> `\xhookrightarrow[]{}` | <span class='math'>$$\xhookleftarrow[below]{above} $$</span> `\xhookleftarrow[]{}` |
| <span class='math'>$$\xmapsto[below]{above} $$</span> `\xmapsto[]{}` |
| <span class='math'>$$\xtofrom[below]{above} $$</span> `\xtofrom[]{}`  |
|  <span class='math'>$$\xrightequilibrium[below]{above} $$</span> `\xrightequilibrium[]{}`  | <span class='math'>$$\xleftequilibrium[below]{above} $$</span> `\xleftequilibrium[]{}` |

</section>

## Accents

Regular accents have a fixed width and do not stretch. For example, compare:

* <span class='math'>$$\vec{ABC}$$</span> `\vec{ABC}` 

and 

* <span class='math'>$$\overrightarrow{ABC}$$</span> `\overrightarrow{ABC}`.

<section class='deprecated'>
The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content
if there is an equivalent Unicode character available.

For example use `é` rather than `\'{e}`.

</section>


* <span class='math'>$$\acute{\unicode{"2B1A}} $$</span> `\acute{}`
* <span class='math'>$$\grave{\unicode{"2B1A}} $$</span> `\grave{}`
* <span class='math'>$$\dot{\unicode{"2B1A}} $$</span> `\dot{}`
* <span class='math'>$$\ddot{\unicode{"2B1A}} $$</span> `\ddot{}`
* <span class='math'>$$\mathring{\unicode{"2B1A}} $$</span> `\mathring{}`
* <span class='math'>$$\tilde{\unicode{"2B1A}} $$</span> `\tilde{}`
* <span class='math'>$$\bar{\unicode{"2B1A}} $$</span> `\bar{}`
* <span class='math'>$$\breve{\unicode{"2B1A}} $$</span> `\breve{}`
* <span class='math'>$$\check{\unicode{"2B1A}} $$</span> `\check{}`
* <span class='math'>$$\hat{\unicode{"2B1A}} $$</span> `\hat{}`
* <span class='math'>$$\vec{\unicode{"2B1A}} $$</span> `\vec{}`
* <span class='math'>$$\\^{e} $$</span> `\^{e}`
* <span class='math'>$$\\\`{e} $$</span> <code>\`{e}</code>
* <span class='math'>$$\\'{e} $$</span> `\'{e}`
* <span class='math'>$$\c{c} $$</span> `\c{c}`
* <span class='math'>$$\\~{n} $$</span>   `\~{n}` 
{.command-list}


### Extensible Accents

* <span class='math'>$$\overline{ABC} $$</span> `\overline{}`
* <span class='math'>$$\overgroup{ABC} $$</span> `\overgroup{}`
* <span class='math'>$$\overbrace{ABC} $$</span> `\overbrace{}`
* <span class='math'>$$\overlinesegment{ABC} $$</span> `\overlinesegment{}`
* <span class='math'>$$\overrightarrow{ABC} $$</span> `\overrightarrow{}`
* <span class='math'>$$\overleftarrow{ABC} $$</span> `\overleftarrow{}`
* <span class='math'>$$\overleftrightarrow{ABC} $$</span> `\overleftrightarrow{}`
* <span class='math'>$$\overarc{ABC} $$</span> `\overarc{}`
* <span class='math'>$$\overparen{ABC} $$</span> `\overparen{}`
* <span class='math'>$$\wideparen{ABC} $$</span> `\wideparen{}`
* <span class='math'>$$\widetilde{ABC} $$</span> `\widetilde{}`
* <span class='math'>$$\widehat{ABC} $$</span> `\widehat{}`
* <span class='math'>$$\widecheck{ABC} $$</span> `\widecheck{}`
* <span class='math'>$$\Overrightarrow{ABC} $$</span> `\Overrightarrow{}`
* <span class='math'>$$\overleftharpoon{ABC} $$</span> `\overleftharpoon{}`
* <span class='math'>$$\overrightharpoon{ABC} $$</span> `\overrightharpoon{}`
{.command-list}

---


* <span class='math'>$$\underline{ABC} $$</span> `\underline{}`
* <span class='math'>$$\undergroup{ABC} $$</span> `\undergroup{}`
* <span class='math'>$$\underbrace{ABC} $$</span> `\underbrace{}`
* <span class='math'>$$\underlinesegment{ABC} $$</span> `\underlinesegment{}`
* <span class='math'>$$\underrightarrow{ABC} $$</span> `\underrightarrow{}`
* <span class='math'>$$\underleftarrow{ABC} $$</span> `\underleftarrow{}`
* <span class='math'>$$\underleftrightarrow{ABC} $$</span> `\underleftrightarrow{}`
* <span class='math'>$$\underarc{ABC} $$</span> `\underarc{}`
* <span class='math'>$$\underparen{ABC} $$</span> `\underparen{}`
* <span class='math'>$$\utilde{ABC} $$</span> `\utilde{}`
{.command-list}




## Relational Operators

To display a vertical "stack" of two symbols as a relational operator, use the 
`\stackrel` command: <span class='math'>$$a\stackrel{?}{=}b $$</span> `a\stackrel{?}{=}b`.

* <span class='math'>$$= $$</span>   `=`
* <span class='math'>$$< $$</span>   `<`
* <span class='math'>$$\lt $$</span>   `\lt`
* <span class='math'>$$> $$</span>   `>`
* <span class='math'>$$\gt $$</span>   `\gt`
* <span class='math'>$$\le $$</span>   `\le`
* <span class='math'>$$\leq $$</span>   `\leq`
* <span class='math'>$$\ge $$</span>   `\ge`
* <span class='math'>$$\geq $$</span>   `\geq`
{.command-list}

---

* <span class='math'>$$\shortparallel $$</span>   `\shortparallel`
* <span class='math'>$$\leqslant $$</span>   `\leqslant`
* <span class='math'>$$\geqslant $$</span>   `\geqslant`
* <span class='math'>$$\gtrsim $$</span>   `\gtrsim`
* <span class='math'>$$\approxeq $$</span>   `\approxeq`
* <span class='math'>$$\thickapprox $$</span>   `\thickapprox`
* <span class='math'>$$\lessapprox $$</span>   `\lessapprox`
* <span class='math'>$$\gtrapprox $$</span>   `\gtrapprox`
* <span class='math'>$$\precapprox $$</span>   `\precapprox`
* <span class='math'>$$\succapprox $$</span>   `\succapprox`
* <span class='math'>$$\thicksim $$</span>   `\thicksim`
* <span class='math'>$$\succsim $$</span>   `\succsim`
* <span class='math'>$$\precsim $$</span>   `\precsim`
* <span class='math'>$$\backsim $$</span>   `\backsim`
* <span class='math'>$$\eqsim $$</span>   `\eqsim`
* <span class='math'>$$\backsimeq $$</span>   `\backsimeq`
* <span class='math'>$$\lesssim $$</span>   `\lesssim`
* <span class='math'>$$\smallsmile $$</span>   `\smallsmile`
* <span class='math'>$$\smallfrown $$</span>   `\smallfrown`
* <span class='math'>$$\leqq $$</span>   `\leqq`
* <span class='math'>$$\eqslantless $$</span>   `\eqslantless`
* <span class='math'>$$\lll $$</span>   `\lll`
* <span class='math'>$$\lessgtr $$</span>   `\lessgtr`
* <span class='math'>$$\lesseqgtr $$</span>   `\lesseqgtr`
* <span class='math'>$$\lesseqqgtr $$</span>   `\lesseqqgtr`
* <span class='math'>$$\risingdotseq $$</span>   `\risingdotseq`
* <span class='math'>$$\fallingdotseq $$</span>   `\fallingdotseq`
* <span class='math'>$$\preccurlyeq $$</span>   `\preccurlyeq`
* <span class='math'>$$\curlyeqprec $$</span>   `\curlyeqprec`
* <span class='math'>$$\vDash $$</span>   `\vDash`
* <span class='math'>$$\Vvdash $$</span>   `\Vvdash`
* <span class='math'>$$\bumpeq $$</span>   `\bumpeq`
* <span class='math'>$$\Bumpeq $$</span>   `\Bumpeq`
* <span class='math'>$$\geqq $$</span>   `\geqq`
* <span class='math'>$$\eqslantgtr $$</span>   `\eqslantgtr`
* <span class='math'>$$\ggg $$</span>   `\ggg`
* <span class='math'>$$\gtrless $$</span>   `\gtrless`
* <span class='math'>$$\gtreqless $$</span>   `\gtreqless`
* <span class='math'>$$\gtreqqless $$</span>   `\gtreqqless`
* <span class='math'>$$\succcurlyeq $$</span>   `\succcurlyeq`
* <span class='math'>$$\curlyeqsucc $$</span>   `\curlyeqsucc`
* <span class='math'>$$\Vdash $$</span>   `\Vdash`
* <span class='math'>$$\shortmid $$</span>   `\shortmid`
* <span class='math'>$$\between $$</span>   `\between`
* <span class='math'>$$\pitchfork $$</span>   `\pitchfork`
* <span class='math'>$$\varpropto $$</span>   `\varpropto`
* <span class='math'>$$\llless $$</span>   `\llless`
* <span class='math'>$$\gggtr $$</span>   `\gggtr`
* <span class='math'>$$\doteqdot $$</span>   `\doteqdot`
* <span class='math'>$$\Doteq $$</span>   `\Doteq`
* <span class='math'>$$\eqcirc $$</span>   `\eqcirc`
* <span class='math'>$$\circeq $$</span>   `\circeq`
* <span class='math'>$$\lhd $$</span>   `\lhd`
* <span class='math'>$$\rhd $$</span>   `\rhd`
* <span class='math'>$$\lessdot $$</span>   `\lessdot`
* <span class='math'>$$\gtrdot $$</span>   `\gtrdot`
* <span class='math'>$$\ll $$</span>   `\ll`
* <span class='math'>$$\gg $$</span>   `\gg`
* <span class='math'>$$\coloneq $$</span>   `\coloneq`
* <span class='math'>$$\measeq $$</span>   `\measeq`
* <span class='math'>$$\eqdef $$</span>   `\eqdef`
* <span class='math'>$$\questeq $$</span>   `\questeq`
* <span class='math'>$$\cong $$</span>   `\cong`
* <span class='math'>$$\equiv $$</span>   `\equiv`
* <span class='math'>$$\prec $$</span>   `\prec`
* <span class='math'>$$\preceq $$</span>   `\preceq`
* <span class='math'>$$\succ $$</span>   `\succ`
* <span class='math'>$$\succeq $$</span>   `\succeq`
* <span class='math'>$$\perp $$</span>   `\perp`
* <span class='math'>$$\propto $$</span>   `\propto`
* <span class='math'>$$\smile $$</span>   `\smile`
* <span class='math'>$$\frown $$</span>   `\frown`
* <span class='math'>$$\sim $$</span>   `\sim`
* <span class='math'>$$\doteq $$</span>   `\doteq`
* <span class='math'>$$\bowtie $$</span>   `\bowtie`
* <span class='math'>$$\Join $$</span>   `\Join`
* <span class='math'>$$\asymp $$</span>   `\asymp`
* <span class='math'>$$\approx $$</span>   `\approx`
* <span class='math'>$$\parallel $$</span>   `\parallel`
* <span class='math'>$$\simeq $$</span>   `\simeq` 
{.command-list}


### Negated Relational Operators

To negate other relational operators, use the `\not` command, e.g. 
<span class='math'>\\( \not\equiv \\)</span> `\not\equiv`.

* <span class='math'>$$\ne $$</span> `\ne`
* <span class='math'>$$\neq $$</span> `\neq`
* <span class='math'>$$\not{=} $$</span> `\not=`
* <span class='math'>$$\not $$</span> `\not{}`
* <span class='math'>$$\nless $$</span>   `\nless`
* <span class='math'>$$\nleq $$</span>   `\nleq`
* <span class='math'>$$\lneq $$</span>   `\lneq`
* <span class='math'>$$\lneqq $$</span>   `\lneqq`
* <span class='math'>$$\nleqq $$</span>   `\nleqq`
* <span class='math'>$$\nleqslant $$</span>   `\nleqslant`
* <span class='math'>$$\ngeq $$</span>   `\ngeq`
* <span class='math'>$$\lvertneqq $$</span>   `\lvertneqq`
* <span class='math'>$$\lnsim $$</span>   `\lnsim`
* <span class='math'>$$\lnapprox $$</span>   `\lnapprox`
* <span class='math'>$$\nprec $$</span>   `\nprec`
* <span class='math'>$$\npreceq $$</span>   `\npreceq`
* <span class='math'>$$\precnsim $$</span>   `\precnsim`
* <span class='math'>$$\precnapprox $$</span>   `\precnapprox`
* <span class='math'>$$\nsim $$</span>   `\nsim`
* <span class='math'>$$\nshortmid $$</span>   `\nshortmid`
* <span class='math'>$$\nmid $$</span>   `\nmid`
* <span class='math'>$$\nvdash $$</span>   `\nvdash`
* <span class='math'>$$\nvDash $$</span>   `\nvDash`
* <span class='math'>$$\ngtr $$</span>   `\ngtr`
* <span class='math'>$$\ngeqslant $$</span>   `\ngeqslant`
* <span class='math'>$$\ngeqq $$</span>   `\ngeqq`
* <span class='math'>$$\gneq $$</span>   `\gneq`
* <span class='math'>$$\gneqq $$</span>   `\gneqq`
* <span class='math'>$$\gvertneqq $$</span>   `\gvertneqq`
* <span class='math'>$$\gnsim $$</span>   `\gnsim`
* <span class='math'>$$\gnapprox $$</span>   `\gnapprox`
* <span class='math'>$$\nsucc $$</span>   `\nsucc`
* <span class='math'>$$\nsucceq $$</span>   `\nsucceq`
* <span class='math'>$$\succnsim $$</span>   `\succnsim`
* <span class='math'>$$\succnapprox $$</span>   `\succnapprox`
* <span class='math'>$$\ncong $$</span>   `\ncong`
* <span class='math'>$$\nshortparallel $$</span>   `\nshortparallel`
* <span class='math'>$$\nparallel $$</span>   `\nparallel`
* <span class='math'>$$\nVDash $$</span>   `\nVDash`
* <span class='math'>$$\nVdash $$</span>   `\nVdash`
* <span class='math'>$$\precneqq $$</span>   `\precneqq`
* <span class='math'>$$\succneqq $$</span>   `\succneqq`
* <span class='math'>$$\unlhd $$</span>   `\unlhd`
* <span class='math'>$$\unrhd $$</span>   `\unrhd`
{.command-list}

## Sets


* <span class='math'>$$\emptyset $$</span>   `\emptyset`
* <span class='math'>$$\varnothing $$</span>   `\varnothing`
* <span class='math'>$$\N $$</span>   `\N`
* <span class='math'>$$\R $$</span>   `\R`
* <span class='math'>$$\Q $$</span>   `\Q`
* <span class='math'>$$\C $$</span>   `\C`
* <span class='math'>$$\Z $$</span>   `\Z`
* <span class='math'>$$\P $$</span>   `\P`
* <span class='math'>$$\doubleStruckCapitalN $$</span> `\doubleStruckCapitalN` (macro)
* <span class='math'>$$\doubleStruckCapitalR $$</span> `\doubleStruckCapitalR` (macro)
* <span class='math'>$$\doubleStruckCapitalQ $$</span> `\doubleStruckCapitalQ` (macro)
* <span class='math'>$$\doubleStruckCapitalZ $$</span> `\doubleStruckCapitalZ` (macro)
* <span class='math'>$$\doubleStruckCapitalP $$</span> `\doubleStruckCapitalP` (macro)
{.command-list}

### Unary/Binary Set Operators

* <span class='math'>$$\cap $$</span>   `\cap`
* <span class='math'>$$\cup $$</span>   `\cup`
* <span class='math'>$$\setminus $$</span>   `\setminus`
* <span class='math'>$$\smallsetminus $$</span>   `\smallsetminus`
* <span class='math'>$$\complement $$</span>   `\complement` 
{.command-list}

### Relational Set Operators

* <span class='math'>$$\nsupseteqq $$</span>   `\nsupseteqq`
* <span class='math'>$$\supsetneq $$</span>   `\supsetneq`
* <span class='math'>$$\varsupsetneq $$</span>   `\varsupsetneq`
* <span class='math'>$$\supsetneqq $$</span>   `\supsetneqq`
* <span class='math'>$$\varsupsetneqq $$</span>   `\varsupsetneqq`
* <span class='math'>$$\nsubseteqq $$</span>   `\nsubseteqq`
* <span class='math'>$$\subseteqq $$</span>   `\subseteqq`
* <span class='math'>$$\Subset $$</span>   `\Subset`
* <span class='math'>$$\sqsubset $$</span>   `\sqsubset`
* <span class='math'>$$\supseteqq $$</span>   `\supseteqq`
* <span class='math'>$$\Supset $$</span>   `\Supset`
* <span class='math'>$$\sqsupset $$</span>   `\sqsupset`
* <span class='math'>$$\sqsubseteq $$</span>   `\sqsubseteq`
* <span class='math'>$$\sqsupseteq $$</span>   `\sqsupseteq`
* <span class='math'>$$\in $$</span>   `\in`
* <span class='math'>$$\notin $$</span>   `\notin`
* <span class='math'>$$\ni $$</span>   `\ni`
* <span class='math'>$$\owns $$</span>   `\owns`
* <span class='math'>$$\backepsilon $$</span>   `\backepsilon`
* <span class='math'>$$\subset $$</span>   `\subset`
* <span class='math'>$$\supset $$</span>   `\supset`
* <span class='math'>$$\subseteq $$</span>   `\subseteq`
* <span class='math'>$$\supseteq $$</span>   `\supseteq`
* <span class='math'>$$\subsetneq $$</span>   `\subsetneq`
* <span class='math'>$$\varsubsetneq $$</span>   `\varsubsetneq`
* <span class='math'>$$\subsetneqq $$</span>   `\subsetneqq`
* <span class='math'>$$\varsubsetneqq $$</span>   `\varsubsetneqq`
* <span class='math'>$$\nsubset $$</span>   `\nsubset`
* <span class='math'>$$\nsupset $$</span>   `\nsupset`
* <span class='math'>$$\nsubseteq $$</span>   `\nsubseteq`
* <span class='math'>$$\nsupseteq $$</span>   `\nsupseteq`
{.command-list}



## Greek

* <span class='math'>$$\alpha $$</span>   `\alpha`
* <span class='math'>$$\beta $$</span>   `\beta`
* <span class='math'>$$\gamma $$</span>   `\gamma`
* <span class='math'>$$\delta $$</span>   `\delta`
* <span class='math'>$$\epsilon $$</span>   `\epsilon`
* <span class='math'>$$\varepsilon $$</span>   `\varepsilon`
* <span class='math'>$$\zeta $$</span>   `\zeta`
* <span class='math'>$$\eta $$</span>   `\eta`
* <span class='math'>$$\theta $$</span>   `\theta`
* <span class='math'>$$\vartheta $$</span>   `\vartheta`
* <span class='math'>$$\iota $$</span>   `\iota`
* <span class='math'>$$\kappa $$</span>   `\kappa`
* <span class='math'>$$\varkappa $$</span>   `\varkappa`
* <span class='math'>$$\lambda $$</span>   `\lambda`
* <span class='math'>$$\mu $$</span>   `\mu`
* <span class='math'>$$\nu $$</span>   `\nu`
* <span class='math'>$$\xi $$</span>   `\xi`
* <span class='math'>$$\omicron $$</span>   `\omicron`
* <span class='math'>$$\pi $$</span>   `\pi`
* <span class='math'>$$\varpi $$</span>   `\varpi`
* <span class='math'>$$\rho $$</span>   `\rho`
* <span class='math'>$$\varrho $$</span>   `\varrho`
* <span class='math'>$$\sigma $$</span>   `\sigma`
* <span class='math'>$$\varsigma $$</span>   `\varsigma`
* <span class='math'>$$\tau $$</span>   `\tau`
* <span class='math'>$$\phi $$</span>   `\phi`
* <span class='math'>$$\varphi $$</span>   `\varphi`
* <span class='math'>$$\upsilon $$</span>   `\upsilon`
* <span class='math'>$$\chi $$</span>   `\chi`
* <span class='math'>$$\psi $$</span>   `\psi`
* <span class='math'>$$\omega $$</span>   `\omega`
* <span class='math'>$$\digamma $$</span>   `\digamma`
{.command-list}

---
* <span class='math'>$$ \Alpha $$</span> `\Alpha`
* <span class='math'>$$ \Beta $$</span> `\Beta`
* <span class='math'>$$ \Gamma $$</span>   `\Gamma`
* <span class='math'>$$\varGamma $$</span>   `\varGamma`
* <span class='math'>$$\Delta $$</span>   `\Delta`
* <span class='math'>$$\varDelta $$</span>   `\varDelta`
* <span class='math'>$$\Epsilon $$</span>   `\Epsilon`
* <span class='math'>$$\Zeta $$</span>   `\Zeta`
* <span class='math'>$$\Eta $$</span>   `\Eta`
* <span class='math'>$$\Theta $$</span>   `\Theta`
* <span class='math'>$$\varTheta $$</span>   `\varTheta`
* <span class='math'>$$\Iota $$</span>   `\Iota`
* <span class='math'>$$\Kappa $$</span>   `\Kappa`
* <span class='math'>$$\Lambda $$</span>   `\Lambda`
* <span class='math'>$$\varLambda $$</span>   `\varLambda`
* <span class='math'>$$\Mu $$</span>   `\Mu`
* <span class='math'>$$\Nu $$</span>   `\Nu`
* <span class='math'>$$\Xi $$</span>   `\Xi`
* <span class='math'>$$\varXi $$</span>   `\varXi`
* <span class='math'>$$\Omicron $$</span>   `\Omicron`
* <span class='math'>$$\Pi $$</span>   `\Pi`
* <span class='math'>$$\varPi $$</span>   `\varPi`
* <span class='math'>$$\Rho $$</span>   `\rho`
* <span class='math'>$$\Sigma $$</span>   `\Sigma`
* <span class='math'>$$\varSigma $$</span>   `\varSigma`
* <span class='math'>$$\Tau $$</span>   `\Tau`
* <span class='math'>$$\Phi $$</span>   `\Phi`
* <span class='math'>$$\varPhi $$</span>   `\varPhi`
* <span class='math'>$$\Upsilon $$</span>   `\Upsilon`
* <span class='math'>$$\varUpsilon $$</span>   `\varUpsilon`
* <span class='math'>$$\Chi $$</span>   `\Chi`
* <span class='math'>$$\Psi $$</span>   `\Psi`
* <span class='math'>$$\varPsi $$</span>   `\varPsi`
* <span class='math'>$$\Omega $$</span>   `\Omega`
* <span class='math'>$$\varOmega $$</span>   `\varOmega`
{.command-list}


## Hebrew

* <span class='math'>$$\aleph $$</span>   `\aleph`
* <span class='math'>$$\beth $$</span>   `\beth`
* <span class='math'>$$\gimel $$</span>   `\gimel`
* <span class='math'>$$\daleth $$</span>   `\daleth`
{.command-list}


## Letterlike Symbols

* <span class='math'>$$@ $$</span>   `@`
* <span class='math'>$$\mid $$</span>   `\mid`
* <span class='math'>$$\top $$</span>   `\top`
* <span class='math'>$$\bot $$</span>   `\bot`
* <span class='math'>$$\nabla $$</span>   `\nabla`
* <span class='math'>$$\partial $$</span>   `\partial`
* <span class='math'>$$\ell $$</span>   `\ell`
* <span class='math'>$$\hbar $$</span>   `\hbar`
* <span class='math'>$$\pounds $$</span>   `\pounds`
* <span class='math'>$$\euro $$</span>   `\euro`
* <span class='math'>$$\And $$</span>   `\And`
* <span class='math'>$$\$ $$</span>   `\$`
* <span class='math'>$$\% $$</span>   `\%`
* <span class='math'>$$\differencedelta $$</span>   `\differencedelta`
* <span class='math'>$$\wp $$</span>   `\wp`
* <span class='math'>$$\hslash $$</span>   `\hslash`
* <span class='math'>$$\Finv $$</span>   `\Finv`
* <span class='math'>$$\Game $$</span>   `\Game`
* <span class='math'>$$\eth $$</span>   `\eth`
* <span class='math'>$$\mho $$</span>   `\mho`
* <span class='math'>$$\Bbbk $$</span>   `\Bbbk`
* <span class='math'>$$\yen $$</span>   `\yen`
* <span class='math'>$$\imath $$</span>   `\imath`
* <span class='math'>$$\jmath $$</span>   `\jmath`
* <span class='math'>$$\degree $$</span>   `\degree` 
* <span class='math'>$$\Re $$</span> `\Re`
* <span class='math'>$$\Im $$</span> `\Im`
{.command-list}



## Delimiters

A delimiter, also called a **fence**, is a symbol used to group some symbols, for example parentheses, brackets, braces, etc...

To grow delimiters based on their content, use `\left...\right`.

<div class='no-line two-col'>

| Regular delimiters | `\left...\right` | 
| :---- | :---- |
| <span class='math'>$$\lbrace x \| \frac{x}{2} > 0\rbrace $$</span>  | <span class='math'>$$\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace $$</span> |
| `\lbrace x \| \frac{x}{2} > 0\rbrace` | `\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace` |

</div>


The left and right delimiters do not have to match:

* <span class='math'>\\(\displaystyle \left\lparen \frac1x \right\rbrack\\)</span> `\left\lparen \frac1x \right\rbrack`


To omit a delimiter, use `.`:

* <span class='math'>\\(\displaystyle \left\lparen \frac1x \right.\\)</span> `\left\lparen \frac1x \right.`


---

The argument to `\left`, `\right` and `\middle` can be one of the 
following commands. 


* <span class='math'>$$\lparen $$</span>   `\lparen`
* <span class='math'>$$\rparen $$</span>   `\rparen`
* <span class='math'>$$\lbrace $$</span>   `\lbrace`
* <span class='math'>$$\rbrace $$</span>   `\rbrace`
* <span class='math'>$$\langle $$</span>   `\langle`
* <span class='math'>$$\rangle $$</span>   `\rangle`
* <span class='math'>$$\lfloor $$</span>   `\lfloor`
* <span class='math'>$$\rfloor $$</span>   `\rfloor`
* <span class='math'>$$\lceil $$</span>   `\lceil`
* <span class='math'>$$\rceil $$</span>   `\rceil`
* <span class='math'>$$\vert $$</span>   `\vert`
* <span class='math'>$$\lvert $$</span>   `\lvert`
* <span class='math'>$$\rvert $$</span>   `\rvert`
* <span class='math'>$$\| $$</span>   `\|`
* <span class='math'>$$\Vert $$</span>   `\Vert`
* <span class='math'>$$\mVert $$</span>   `\mVert`
* <span class='math'>$$\lVert $$</span>   `\lVert`
* <span class='math'>$$\rVert $$</span>   `\rVert`
* <span class='math'>$$\lbrack $$</span>   `\lbrack`
* <span class='math'>$$\rbrack $$</span>   `\rbrack`
* <span class='math'>$$\\{ $$</span>   `\{`
* <span class='math'>$$\\} $$</span>   `\}`
* <span class='math'>$$( $$</span>   `(`
* <span class='math'>$$) $$</span>   `)`
* <span class='math'>$$[ $$</span>   `[`
* <span class='math'>$$] $$</span>   `]`
* <span class='math'>$$\ulcorner $$</span>   `\ulcorner`
* <span class='math'>$$\urcorner $$</span>   `\urcorner`
* <span class='math'>$$\llcorner $$</span>   `\llcorner`
* <span class='math'>$$\lrcorner $$</span>   `\lrcorner`
* <span class='math'>$$\lgroup $$</span>   `\lgroup`
* <span class='math'>$$\rgroup $$</span>   `\rgroup`
* <span class='math'>$$\lmoustache $$</span>   `\lmoustache`
* <span class='math'>$$\rmoustache $$</span>   `\rmoustache`
* <span class='math'>$$\mvert $$</span>   `\mvert`
{.command-list}



## Punctuation

* <span class='math'>$$. $$</span>   `.`
* <span class='math'>$$? $$</span>   `?`
* <span class='math'>$$! $$</span>   `!`
* <span class='math'>$$: $$</span>   `:`
* <span class='math'>$$\Colon $$</span>   `\Colon`
* <span class='math'>$$\colon $$</span>   `\colon`
* <span class='math'>$$, $$</span>   `,`
* <span class='math'>$$; $$</span>   `;`
* <span class='math'>$$" $$</span>   `"`
{.command-list}

### Dots
* <span class='math'>$$\cdotp $$</span>   `\cdotp`
* <span class='math'>$$\ldotp $$</span>   `\ldotp`
* <span class='math'>$$\vdots $$</span>   `\vdots`
* <span class='math'>$$\cdots $$</span>   `\cdots`
* <span class='math'>$$\ddots $$</span>   `\ddots`
* <span class='math'>$$\ldots $$</span>   `\ldots`
* <span class='math'>$$\mathellipsis $$</span>   `\mathellipsis`
{.command-list}


## Shapes

* <span class='math'>$$\diamond $$</span>   `\diamond`
* <span class='math'>$$\Diamond $$</span>   `\Diamond`
* <span class='math'>$$\lozenge $$</span>   `\lozenge`
* <span class='math'>$$\blacklozenge $$</span>   `\blacklozenge`
{.command-list}

---

* <span class='math'>$$\square $$</span>   `\square`
* <span class='math'>$$\Box $$</span>   `\Box`
* <span class='math'>$$\blacksquare $$</span>   `\blacksquare`
{.command-list}

---

* <span class='math'>$$\bigcirc $$</span>   `\bigcirc`
* <span class='math'>$$\circledS $$</span>   `\circledS`
* <span class='math'>$$\circledR $$</span>   `\circledR`
{.command-list}

---

* <span class='math'>$$\triangleleft $$</span>   `\triangleleft`
* <span class='math'>$$\triangleright $$</span>   `\triangleright`
* <span class='math'>$$\triangle $$</span>   `\triangle`
* <span class='math'>$$\triangledown $$</span>   `\triangledown`

{.command-list}

<br>

* <span class='math'>$$\blacktriangleleft $$</span>   `\blacktriangleleft`
* <span class='math'>$$\blacktriangleright $$</span>   `\blacktriangleright`
* <span class='math'>$$\blacktriangle $$</span>   `\blacktriangle`
* <span class='math'>$$\blacktriangledown $$</span>   `\blacktriangledown`
{.command-list}

<br>

* <span class='math'>$$\vartriangle $$</span>   `\vartriangle`
* <span class='math'>$$\vartriangleleft $$</span>   `\vartriangleleft`
* <span class='math'>$$\vartriangleright $$</span>   `\vartriangleright`
{.command-list}

<br>

* <span class='math'>$$\triangleq $$</span>   `\triangleq`
* <span class='math'>$$\trianglelefteq $$</span>   `\trianglelefteq`
* <span class='math'>$$\trianglerighteq $$</span>   `\trianglerighteq`
* <span class='math'>$$\ntriangleleft $$</span>   `\ntriangleleft`
* <span class='math'>$$\ntriangleright $$</span>   `\ntriangleright`
* <span class='math'>$$\ntrianglelefteq $$</span>   `\ntrianglelefteq`
* <span class='math'>$$\ntrianglerighteq $$</span>   `\ntrianglerighteq`
{.command-list}

<br>

* <span class='math'>$$\bigtriangleup $$</span>   `\bigtriangleup`
* <span class='math'>$$\bigtriangledown $$</span>   `\bigtriangledown`
{.command-list}

---

* <span class='math'>$$\dagger $$</span>   `\dagger`
* <span class='math'>$$\dag $$</span>   `\dag`
* <span class='math'>$$\ddag $$</span>   `\ddag`
* <span class='math'>$$\ddagger $$</span>   `\ddagger`
* <span class='math'>$$\maltese $$</span>   `\maltese`
{.command-list}


## Layout

These commands change the amount of space around a symbol: `\mathop{}`
treats its argument as if it was a large operator, `\mathrel{}` a 
relational operator, `\mathbin{}` a binary operator, `\mathopen{}` and `\mathclose{}` an opening and closing delimiter, respectively, `\mathpunct{}` a punctuation, `\mathinner{}` a fraction, and `\mathord{}` an ordinary symbol

* <span class='math'>$$x\mathop{+}0+1 $$</span> `x\mathop{+}0+1`
* <span class='math'>$$x=\mathbin{arg}=0 $$</span> `\mathbin{}`
* <span class='math'>$$x=\mathrel{arg}=0 $$</span> `\mathrel{}`
* <span class='math'>$$x=\mathopen{arg}=0 $$</span> `\mathopen{}`
* <span class='math'>$$x=\mathclose{arg}=0 $$</span> `\mathclose{}`
* <span class='math'>$$x=\mathpunct{arg}=0 $$</span> `\mathpunct{}`
* <span class='math'>$$x=\mathinner{arg}=0 $$</span> `\mathinner{}`
* <span class='math'>$$x=\mathord{arg}=0 $$</span> `\mathord{}`
{.command-list}

---


* <span class='math'>$$\overset{arg}{x=0} $$</span> `\overset{}{}`
* <span class='math'>$$\underset{arg}{x=0} $$</span> `\underset{}{}`
* <span class='math'>$$\overunderset{arg}{x=0}{y=1} $$</span> `\overunderset{arg}{x=0}{y=1}`
* <span class='math'>$$\stackrel{arg}{x=0} $$</span> `\stackrel[]{}{}`
* <span class='math'>$$\stackbin{arg}{x=0} $$</span> `\stackbin[]{}{}`
* <span class='math'>$$\rlap{/}0 $$</span> `\rlap{}`
* <span class='math'>$$o\llap{/} $$</span> `\llap{}`
* <span class='math'>$$o\mathllap{/} $$</span> `\mathllap{}`
* <span class='math'>$$\mathrlap{/}0 $$</span> `\mathrlap{}`
{.command-list}

## Spacing

* <span class='math'>$$\unicode{"203A}\hspace{1em}\unicode{"2039} $$</span> `\hspace{}`
* <span class='math'>$$\unicode{"203A}\hspace*{1em}\unicode{"2039} $$</span> `\hspace*{}`
* <span class='math'>$$\unicode{"203A}\!\unicode{"2039} $$</span> `\!`
* <span class='math'>$$\unicode{"203A}\,\unicode{"2039} $$</span> `\,`
* <span class='math'>$$\unicode{"203A}\:\unicode{"2039} $$</span> `\:`
* <span class='math'>$$\unicode{"203A}\;\unicode{"2039} $$</span> `\;`
* <span class='math'>$$\unicode{"203A}\enskip\unicode{"2039} $$</span> `\enskip`
* <span class='math'>$$\unicode{"203A}\enspace\unicode{"2039} $$</span> `\enspace`
* <span class='math'>$$\unicode{"203A}\quad\unicode{"2039} $$</span> `\quad`
* <span class='math'>$$\unicode{"203A}\qquad\unicode{"2039} $$</span> `\qquad`
{.command-list}



## Decorations

<section class='no-header thin-line center'>

| |  |  | 
| :---- | :---- | :---- |
| <span class='math'>$$\textcolor{blue}{x+1=0}$$</span>  | `\textcolor{blue}{x+1=0}` | Recommended over `\color` |
| <span class='math'>$${\color{blue}x+1=0}} $$</span> | `{\color{blue} x+1=0}}` |
| <span class='math'>$$\colorbox{yellow}{\\[ax^2+bx+c\\]} $$</span> | `\colorbox{yellow}{\[ax^2+bx+c\]}`| The argument is in Text Mode. Use `\[...\]` to switch to math mode.
| <span class='math'>$$\fcolorbox{#cd0030}{#ffd400}{\unicode{"2B1A}} $$</span> | `\fcolorbox{}{}{}` | 
| <span class='math'>$$\boxed{1+\frac{1}{x}} $$</span> | `\boxed{1+\frac{1}{x}}` |  
| <span class='math'>$$\bbox[#ffd400, solid 2px #ffd400]{\unicode{"2B1A}} $$</span> | `\bbox[]{}` | See [MathJax BBox documentation](http://docs.mathjax.org/en/latest/input/tex/extensions/bbox.html)| 
| <span class='math'>$$\rule{2em}{1em} $$</span> | `\rule[]{2em}{1em}` | The arguments are the width and height. The optional argument is an offset from the baseline. |

</section>


### Notations

#### `\enclose`

The `\enclose` command is very flexible. It accepts three arguments, two of
which are required:

```tex
    \enclose{<notation>}[<style>]{<body>}
```

- `<notation>` a list of whitespace-delimited values:

<section class='no-header thin-line center'>

| |  | 
| :---- | :---- | 
| <span class='math'>$$\enclose{box}{x=0} $$</span> | `box` |
| <span class='math'>$$\enclose{roundedbox}{x=0} $$</span> | `roundedbox` |
| <span class='math'>$$\enclose{circle}{x=0} $$</span> | `circle` |
| <span class='math'>$$\enclose{top}{x=0} $$</span> | `top` |
| <span class='math'>$$\enclose{left}{x=0} $$</span> | `left` |
| <span class='math'>$$\enclose{bottom}{x=0} $$</span> | `bottom` |
| <span class='math'>$$\enclose{right}{x=0} $$</span> | `right` |
| <span class='math'>$$\enclose{horizontalstrike}{x=0} $$</span> | `horizontalstrike` |
| <span class='math'>$$\enclose{verticalstrike}{x=0} $$</span> | `verticalstrike` |
| <span class='math'>$$\enclose{updiagonalstrike}{x=0} $$</span> | `updiagonalstrike` |
| <span class='math'>$$\enclose{downdiagonalstrike}{x=0} $$</span> | `downdiagonalstrike` |
| <span class='math'>$$\enclose{updiagonalarrow}{x=0} $$</span> | `updiagonalarrow` |
| <span class='math'>$$\enclose{phasorangle}{x=0} $$</span> | `phasorangle` |
| <span class='math'>$$\enclose{radical}{x=0} $$</span> | `radical` |
| <span class='math'>$$\enclose{longdiv}{x=0} $$</span> | `longdiv` |
| <span class='math'>$$\enclose{actuarial}{x=0} $$</span> | `actuarial` |
| <span class='math'>$$\enclose{madruwb}{x=0} $$</span> | `madruwb` |

</section>

They can be combined:

* <span class='math'>\\( \displaystyle \enclose{roundedbox updiagonalstrike}{x=0} \\)</span>  `roundedbox, updiagonalstrike` 

- `<style>` an optional list of comma separated key-value pairs including:
  - `mathbackground="<color>"` background color of the expression
  - `mathcolor="<color>"` color of the notation, for example `red` or `#cd0030`
    or `rgba(205, 0, 11, .4)`.
  - `padding="<dimension>"` `"auto"` or an amount of padding around the content
  - `shadow="<shadow>"`: `"auto"` or `"none"` or a CSS `box-shadow` expression
    for example, `"0 0 2px rgba(0, 0, 0, 0.5)"`.
  - in addition the style property can include a stroke style expression that
    follows the shorthand syntax of the CSS `border` property, for example
    `"2px solid red"`.
- `<body>` a math expression that is "enclosed" by the specified notations

`\enclose` is a LaTeX extension introduced by MathJax that follows the `<menclose>` definition of [MathML]().{.notice--info}

* <span class='math'>$$\enclose{updiagonalstrike roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0} $$</span> `\enclose{updiagonalstrike roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0}`
* <span class='math'>$$\enclose{circle}[mathbackground="#fbc0bd"]{\frac1x}$$</span> `\enclose{circle}[mathbackground="#fbc0bd"]{\frac1x}`
* <span class='math'>$$\enclose{roundedbox}[1px dotted #cd0030]{\frac{x^2+y^2}{\sqrt{x^2+y^2}}}$$</span> `\enclose{roundedbox}[1px dotted #cd0030]{\frac{x^2+y^2}{\sqrt{x^2+y^2}}}`




#### `\cancel`, `\bcancel` and `\xcancel`


<div class='thin-line two-col'>

| Command...       | is a shorthand for...                                 |
| :--------------- | :---------------------------------------------------- |
| <span class='math'>$$\cancel{\unicode{"2B1A}} $$</span> `\cancel{body}`  | `\enclose{updiagonalstrike}{body}`                    |
| <span class='math'>$$\bcancel{\unicode{"2B1A}} $$</span> `\bcancel{body}` | `\enclose{downdiagonalstrike}{body}`                  |
| <span class='math'>$$\xcancel{\unicode{"2B1A}} $$</span> `\xcancel{body}` | `\enclose{updiagonalstrike downdiagonalstrike}{body}` |

</div>


The `\cancel`, `\bcancel` and `\xcancel` commands are part of the
["cancel"](https://www.ctan.org/pkg/cancel) LaTeX package.{.notice--info}


### Colors

To change the foreground color, use the `\textcolor{}{}` command.

To change the background, use the `\colorbox{}{}` command.

  
The first argument of these commands is a color specified as:
  - one of `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `blue`, `indigo`,
   * `purple`, `magenta`, `black`, `dark-grey`, `grey`, `light-grey`, `white.
  - a RGB color using the standard CSS format (`#d7170b` or `rgb(240, 20, 10)`)
  - one of the 68 colors from [dvips color name](https://ctan.org/pkg/colordvi)
   (`CadetBlue`). Note that these names are case-sensitive.
  - one of the 10 Mathematica color from `ColorData[97, "ColorList"]` (`M0` to `M9`)
  - a color defined using the syntax from the [`xcolor` package](http://mirror.jmu.edu/pub/CTAN/macros/latex/contrib/xcolor/xcolor.pdf), for example: `Blue!20!Black!30!Green`
  - if the color is prefixed with a `-`, the complementary color is used

The following color names are recommended:

![](/assets/images/mathfield/colors.png)


These colors have been carefully selected for a balanced representation of the range of 
hues on the color circle, with similar lightness and intensity. They will map 
to  different color values than the `dvips` colors of the same name.{.notice--info}

To have proper legibility based on usage, these color names will map to 
different values when used as a foreground color
and a background color. To use a specific color value, use a RGB color instead.{.notice--info}

For best portability between versions of TeX, limit yourself to this subset of 
DVIPS colors: `White`, `Black`,
`Gray`, `Red`, `Orange`, `Yellow`, `LimeGreen`, `Green`, `TealBlue`, `Blue`,
`Violet`, `Purple`
and `Magenta`. Those names are case-sensitive. {.notice--info}






## Font Styling

* <span class='math'>$$\text{\selectfont} $$</span> `\selectfont`
{.command-list}

---

### Bold

* <span class='math'>$$\text{\fontseries{b}Don Knuth} $$</span> `\fontseries{}`
{.command-list}
* <span class='math'>$$\boldsymbol{Don Knuth} $$</span> `\boldsymbol{}`
* <span class='math'>$$\text{\bfseries Don Knuth} $$</span> `\bfseries`
* <span class='math'>$$\text{\mdseries Don Knuth} $$</span> `\mdseries`
* <span class='math'>$$\bm{Don Knuth} $$</span> `\bm{}`
* <span class='math'>$$\bold{Don Knuth} $$</span> `\bold{}`
* <span class='math'>$$\textbf{Don Knuth} $$</span> `\textbf{}`
* <span class='math'>$$\textmd{Don Knuth} $$</span> `\textmd{}`
* <span class='math'>$$\mathbf{Don Knuth} $$</span> `\mathbf{}`
* <span class='math'>$$\mathbfit $$</span> `\mathbfit{}`
{.command-list}

### Italic
* <span class='math'>$$\text{\upshape Don Knuth} $$</span> `\upshape`
* <span class='math'>$$\text{\slshape Don Knuth} $$</span> `\slshape`
{.command-list}
* <span class='math'>$$\textup{Don Knuth} $$</span> `\textup{}`
* <span class='math'>$$\textsl{Don Knuth} $$</span> `\textsl{}`
* <span class='math'>$$\textit{Don Knuth} $$</span> `\textit{}`
* <span class='math'>$$\mathit{Don Knuth} $$</span> `\mathit{}`
{.command-list}

### Font Family

#### Typewriter / Monospace
* <span class='math'>$$\text{\fontfamily{cmtt}Don Knuth} $$</span> `\fontfamily{}`
* <span class='math'>$$\texttt{Don Knuth} $$</span> `\texttt{}`
* <span class='math'>$$\mathtt{Don Knuth} $$</span> `\mathtt{}`
* <span class='math'>$${\ttfamily Don Knuth} $$</span> `\ttfamily`
{.command-list}

#### Sans-Serif
* <span class='math'>$$\textsf{Don Knuth} $$</span> `\textsf{}`
* <span class='math'>$$\mathsf{Don Knuth} $$</span> `\mathsf{}`
* <span class='math'>$${\sffamily Don Knuth} $$</span> `\sffamily`
{.command-list}

#### Math Variants
* <span class='math'>$$\mathfrak{ABCdef} $$</span> 
  `\mathfrak{ABCdef}` -- Fraktur
* <span class='math'>$$\mathcal{ABC} $$</span> 
  `\mathcal{ABCdef}` -- Caligraphic
* <span class='math'>$$\mathscr{ABCdef} $$</span> 
  `\mathscr{ABCdef}` -- Script
* <span class='math'>$$\mathbb{Don Knuth} $$</span> `\mathbb{}` -- Blackboard
* <span class='math'>$$\Bbb{ABCdef} $$</span> `\Bbb{}` 
{.command-list} 
* <span class='math'>$${\rmfamily Don Knuth} $$</span> `\rmfamily`
* <span class='math'>$${\frak Don Knuth} $$</span> `{\frak}`
{.command-list}


### MathJax HTML Extension

MathLive support some commands from the [MathJax HTML extension](http://docs.mathjax.org/en/latest/input/tex/extensions/html.html).

<div class="side-by-side">
  <div class='math frame'>$$\class{custom-class}{x+1} $$</div>

  ```tex
    \class{custom-class}{x+1}
  ```
</div>


When used in a `<math-field>` component, the class names should refer to a 
stylesheet defined with a `<style>` tag inside the `<math-field>` element.
The stylesheet can also be specified by setting ther `innerHTML` property of 
the `MathFieldElement`.

```html
<math-field>
  <style>
    .custom-class { box-shadow: 2px 2px 2px #000 };
  </style>

  \class{custom-class}{\frac{1}{x+1}}

</math-field>
```

---

<div class="side-by-side">
  <div class='math frame'>$$\cssId{test-dentifier}{Don Knuth} $$</div> 

  ```tex
    \cssId{}{}
  ```
</div>

---

<div class="side-by-side">

  ```tex
    \htmlData{}{}
  ```
</div>

The argument of this command is a comma-delimited list of key/value pairs, e.g. 
`\htmlData{foo=green,bar=blue}{x=0}`. A corresponding
  `data-foo` and `data-bar` DOM attribute is generated to the rendered DOM.

<div class="side-by-side">
  <div class='math frame'>$$\htmlData{foo=green,bar=blue}{ \text{Don Knuth} } $$</div> 
  
  ```tex
    \htmlData{foo=green,bar=blue}{ \text{Don Knuth} }
  ```
</div>
 

### Others

* <span class='math'>$$\text{\fontshape{sc}Don Knuth} $$</span> `\fontshape{}` Small Caps
* <span class='math'>$$\text{\scshape Don Knuth} $$</span> `\scshape`
* <span class='math'>$$\textsc{Don Knuth} $$</span> `\textsc{}`
* <span class='math'>$$\textrm{Don Knuth} $$</span> `\textrm{}`
* <span class='math'>$$\mathrm{Don Knuth} $$</span> `\mathrm{}`
* <span class='math'>$$\text{Don {\em{Knuth}}} $$</span> `\em{}` -- Emphasis
* <span class='math'>$$\text{Don \emph{Knuth} }$$</span> `\emph{}` -- Emphasis
{.command-list}


<section class='deprecated'>
<h3>Deprecated</h3>

The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content

<section class="no-header center">

| | | |
| :---- | :---- |  :---- |
|  <span class='math'>$${\bf Don Knuth} $$</span> | `{\bf Don Knuth}` | Use `\textbf{}` or `\bfseries` instead. | 
|  <span class='math'>$${\it Don Knuth} $$</span> | `{\it Don Knuth}` | Use `\textit{}` or `\itshape` instead. | 

</section>



</section>


## Sizing

In LaTeX using the sizing commands below may not always achieve the expected result. In MathLive, the sizing commands are applied consistently to text and math mode.

These size are relative to the `font-size` property of the mathfield.

<section class="no-header center">

| | | |
| :---- | :---- |  :---- |
| <span class='math'>$$\tiny{e^{i\pi}+1=0} $$</span> | `\tiny` | 
| <span class='math'>$$\scriptsize{e^{i\pi}+1=0} $$</span> | `\scriptsize` | 
| <span class='math'>$$\footnotesize{e^{i\pi}+1=0} $$</span> | `\footnotesize` | 
| <span class='math'>$$\small{e^{i\pi}+1=0} $$</span> | `\small` |
| <span class='math'>$$\normalsize{e^{i\pi}+1=0} $$</span> | `\normalsize` | 
| <span class='math'>$$\large{e^{i\pi}+1=0} $$</span> | `\large` | 
| <span class='math'>$$\Large{e^{i\pi}+1=0} $$</span> | `\Large` | 
| <span class='math'>$$\LARGE{e^{i\pi}+1=0} $$</span> | `\LARGE` | 
| <span class='math'>$$\huge{e^{i\pi}+1=0} $$</span> | `\huge` |
| <span class='math'>$$\Huge{e^{i\pi}+1=0} $$</span> | `\Huge` | 
</section>

The size of delimiters can be controlled manually with the commands below. The `\left...\right...` commands calculate automatically the size of the
delimiters based on the content.

**The command must be followed by a delimiter**, for example `(` or `\lbrace` or `\lbrack`. If the command is used on its own, nothing is displayed.{.notice--warning}

<section class="no-header center">

| | | |
| :---- | :---- |  :---- |
| <span class='math'>$$\bigl( \bigm\| \bigr) $$</span> | `\bigl(` `\bigm\|` `\bigr)` |
| <span class='math'>$$\Bigl( \Bigm\| \Bigr) $$</span> | `\Bigl(` `\Bigm\|` `\Bigr)` |
| <span class='math'>$$\biggl( \biggm\| \biggr) $$</span> | `\biggl(` `\biggm\|` `\biggr)` |
| <span class='math'>$$\Biggl( \Biggm\| \Biggr) $$</span> | `\Biggl(` `\Biggm\|` `\Biggr)` |
</section>





## Various

* <span class='math'>$$/ $$</span>   `/`
* <span class='math'>$$\sharp $$</span>   `\sharp`
* <span class='math'>$$\flat $$</span>   `\flat`
* <span class='math'>$$\natural $$</span>   `\natural`
* <span class='math'>$$\# $$</span>   `\#`
* <span class='math'>$$\& $$</span>   `\&`
* <span class='math'>$$\clubsuit $$</span>   `\clubsuit`
* <span class='math'>$$\heartsuit $$</span>   `\heartsuit`
* <span class='math'>$$\spadesuit $$</span>   `\spadesuit`
* <span class='math'>$$\diamondsuit $$</span>   `\diamondsuit`
* <span class='math'>$$\backslash $$</span>   `\backslash`
* <span class='math'>$$\infty $$</span>   `\infty`
* <span class='math'>$$\prime $$</span>   `\prime`
* <span class='math'>$$\doubleprime $$</span>   `\doubleprime`
* <span class='math'>$$\angle $$</span>   `\angle`
* <span class='math'>$$\_ $$</span>   `\_`
* <span class='math'>$$\checkmark $$</span>   `\checkmark`
* <span class='math'>$$\diagup $$</span>   `\diagup`
* <span class='math'>$$\measuredangle $$</span>   `\measuredangle`
* <span class='math'>$$\sphericalangle $$</span>   `\sphericalangle`
* <span class='math'>$$\backprime $$</span>   `\backprime`
* <span class='math'>$$\backdoubleprime $$</span>   `\backdoubleprime`
* <span class='math'>$$\/ $$</span>   `\/`
* <span class='math'>$$| $$</span>   `|`
* <span class='math'>$$' $$</span>   `'` 
* <span class='math'>$$\originalof $$</span>   `\originalof`
* <span class='math'>$$\laplace $$</span>   `\laplace`
* <span class='math'>$$\imageof $$</span>   `\imageof`
* <span class='math'>$$\Laplace $$</span>   `\Laplace`
* <span class='math'>$$− $$</span>   `−`
* <span class='math'>$$` $$</span>   ```
* <span class='math'>$$~ $$</span>   `~`
* <span class='math'>$$\space $$</span>   `\space` 
{.command-list}


* <span class='math'>$$\smash $$</span> `\smash[]{}`
* <span class='math'>$$\vphantom $$</span> `\vphantom{}`
* <span class='math'>$$\hphantom $$</span> `\hphantom{}`
* <span class='math'>$$\phantom $$</span> `\phantom{}`
{.command-list}


## MediaWiki (`texvc.sty` package)

MathLive supports the commands used by [MediaWiki](https://en.wikipedia.org/wiki/Help:Displaying_a_formula) pages, except for the deprecated ones.

* <span class='math'>$$ \darr $$</span> `\darr`
* <span class='math'>$$ \dArr $$</span> `\dArr`
* <span class='math'>$$ \Darr $$</span> `\Darr`
* <span class='math'>$$ \lang $$</span> `\lang`
* <span class='math'>$$ \rang $$</span> `\rang`
* <span class='math'>$$ \uarr $$</span> `\uarr`
* <span class='math'>$$ \uArr $$</span> `\uArr`
* <span class='math'>$$ \Uarr $$</span> `\Uarr`
* <span class='math'>$$ \N $$</span> `\N`
* <span class='math'>$$ \R $$</span> `\R`
* <span class='math'>$$ \Z $$</span> `\Z`
* <span class='math'>$$ \alef $$</span> `\alef`
* <span class='math'>$$ \alefsym $$</span> `\alefsym`
* <span class='math'>$$ \Alpha $$</span> `\Alpha`
* <span class='math'>$$ \Beta $$</span> `\Beta`
* <span class='math'>$$ \bull $$</span> `\bull`
* <span class='math'>$$ \Chi $$</span> `\Chi`
* <span class='math'>$$ \clubs $$</span> `\clubs`
* <span class='math'>$$ \cnums $$</span> `\cnums`
* <span class='math'>$$ \Complex $$</span> `\Complex`
* <span class='math'>$$ \Dagger $$</span> `\Dagger`
* <span class='math'>$$ \diamonds $$</span> `\diamonds`
* <span class='math'>$$ \empty $$</span> `\empty`
* <span class='math'>$$ \Epsilon $$</span> `\Epsilon`
* <span class='math'>$$ \Eta $$</span> `\Eta`
* <span class='math'>$$ \exist $$</span> `\exist`
* <span class='math'>$$ \harr $$</span> `\harr`
* <span class='math'>$$ \hArr $$</span> `\hArr`
* <span class='math'>$$ \Harr $$</span> `\Harr`
* <span class='math'>$$ \hearts $$</span> `\hearts`
* <span class='math'>$$ \image $$</span> `\image`
* <span class='math'>$$ \infin $$</span> `\infin`
* <span class='math'>$$ \Iota $$</span> `\Iota`
* <span class='math'>$$ \isin $$</span> `\isin`
* <span class='math'>$$ \Kappa $$</span> `\Kappa`
* <span class='math'>$$ \larr $$</span> `\larr`
* <span class='math'>$$ \lArr $$</span> `\lArr`
* <span class='math'>$$ \Larr $$</span> `\Larr`
* <span class='math'>$$ \lrarr $$</span> `\lrarr`
* <span class='math'>$$ \lrArr $$</span> `\lrArr`
* <span class='math'>$$ \Lrarr $$</span> `\Lrarr`
* <span class='math'>$$ \Mu $$</span> `\Mu`
* <span class='math'>$$ \natnums $$</span> `\natnums`
* <span class='math'>$$ \Nu $$</span> `\Nu`
* <span class='math'>$$ \Omicron $$</span> `\Omicron`
* <span class='math'>$$ \plusmn $$</span> `\plusmn`
* <span class='math'>$$ \rarr $$</span> `\rarr`
* <span class='math'>$$ \rArr $$</span> `\rArr`
* <span class='math'>$$ \Rarr $$</span> `\Rarr`
* <span class='math'>$$ \real $$</span> `\real`
* <span class='math'>$$ \reals $$</span> `\reals`
* <span class='math'>$$ \Reals $$</span> `\Reals`
* <span class='math'>$$ \Rho $$</span> `\Rho`
* <span class='math'>$$ \sdot $$</span> `\sdot`
* <span class='math'>$$ \sect $$</span> `\sect`
* <span class='math'>$$ \spades $$</span> `\spades`
* <span class='math'>$$ \sub $$</span> `\sub`
* <span class='math'>$$ \sube $$</span> `\sube`
* <span class='math'>$$ \supe $$</span> `\supe`
* <span class='math'>$$ \Tau $$</span> `\Tau`
* <span class='math'>$$ \thetasym $$</span> `\thetasym`
* <span class='math'>$$ \weierp $$</span> `\weierp`
* <span class='math'>$$ \Zeta $$</span> `\Zeta`
{.command-list}

## Physics


### Braket Notation 

MathLive supports the [`braket` package](https://ctan.org/pkg/braket)

* <span class='math'>$$\bra{\Psi} $$</span> `\bra{\Psi}` (macro)
* <span class='math'>$$\ket{\Psi} $$</span> `\ket{\Psi}`	(macro)
* <span class='math'>$$\braket{ab} $$</span> `\braket{}` (macro)
* <span class='math'>$$\Bra{ab} $$</span> `\Bra{}` (macro)
* <span class='math'>$$\Ket{ab} $$</span> `\Ket{}` (macro)
* <span class='math'>$$\Braket{ab} $$</span> `\Braket{}` (macro)
{.command-list}



## Chemistry (`mhchem` package)

MathLive  supports the [`mhchem` package](https://mhchem.github.io/MathJax-mhchem/).


### Chemical Formulae
* <span class='math'>$$\ce{H2O} $$</span> `\ce{H2O}`
* <span class='math'>$$\ce{Sb2O3} $$</span> `\ce{Sb2O3}`
{.command-list}



### Charges
* <span class='math'>$$\ce{[AgCl2]-} $$</span> `\ce{[AgCl2]-}`
* <span class='math'>$$\ce{Y^99+} $$</span> `\ce{Y^99+}`
* <span class='math'>$$\ce{Y^{99+}} $$</span> `\ce{Y^{99+}}`
* <span class='math'>$$\ce{H+} $$</span> `\ce{H+}`
* <span class='math'>$$\ce{CrO4^2-} $$</span> `\ce{CrO4^2-}`
{.command-list}


### Stoichiometric numbers
* <span class='math'>$$\ce{2 H2O} $$</span> `\ce{2 H2O}`
* <span class='math'>$$\ce{2H2O} $$</span> `\ce{2H2O}`
* <span class='math'>$$\ce{0.5 H2O} $$</span> `\ce{0.5 H2O}`
* <span class='math'>$$\ce{1/2 H2O} $$</span> `\ce{1/2 H2O}`
* <span class='math'>$$\ce{(1/2) H2O} $$</span> `\ce{(1/2) H2O}`
* <span class='math'>$$\ce{$n$ H2O} $$</span> `\ce{$n$ H2O}`
{.command-list}

### Isotopes


* <span class='math'>$$\ce{^{227}_{90}Th+} $$</span> `\ce{^{227}_{90}Th+}`
* <span class='math'>$$\ce{^227_90Th+} $$</span> `\ce{^227_90Th+}`
* <span class='math'>$$\ce{^{0}_{-1}n^{-}} $$</span>  `\ce{^{0}_{-1}n^{-}}`
* <span class='math'>$$\ce{^0_-1n-} $$</span> `\ce{^0_-1n-}`
* <span class='math'>$$\ce{H{}^3HO} $$</span> `\ce{H{}^3HO}`
* <span class='math'>$$\ce{H^3HO} $$</span> `\ce{H^3HO}`
{.command-list}

### Complex Examples

* <span class='math'>$$\ce{CO2 + C -> 2 CO} $$</span> <br>  `\ce{CO2 + C -> 2 CO}`
* <span class='math'>$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$</span> <br>   `\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}`
<!-- * <span class='math'>$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K} $$</span> <br>   `C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}` -->
<!-- * <span class='math'>$$\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$} $$</span> <br>  `\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}` -->
* <span class='math'>$$\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$} $$</span>  <br>  `\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}`
* <span class='math'>$$\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$} $$</span> <br>  `\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}`
* <span class='math'>$$\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$} $$</span> <br>   `\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}`


## Macros

* <span class='math'>$$\iff $$</span> `\iff`
* <span class='math'>$$\set{ab} $$</span> `\set{}`
* <span class='math'>$$\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 } $$</span> `\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 }`
* <span class='math'>$$\rd $$</span> `\rd`
* <span class='math'>$$\rD $$</span> `\rD`
* <span class='math'>$$\scriptCapitalE $$</span> `\scriptCapitalE`
* <span class='math'>$$\scriptCapitalH $$</span> `\scriptCapitalH`
* <span class='math'>$$\scriptCapitalL $$</span> `\scriptCapitalL`
* <span class='math'>$$\gothicCapitalC $$</span> `\gothicCapitalC`
* <span class='math'>$$\gothicCapitalH $$</span> `\gothicCapitalH`
* <span class='math'>$$\gothicCapitalI $$</span> `\gothicCapitalI`
* <span class='math'>$$\gothicCapitalR $$</span> `\gothicCapitalR`
* <span class='math'>$$\imaginaryI $$</span> `\imaginaryI`
* <span class='math'>$$\imaginaryJ $$</span> `\imaginaryJ`
* <span class='math'>$$\exponentialE $$</span> `\exponentialE`
* <span class='math'>$$\differentialD $$</span> `\differentialD`
* <span class='math'>$$\capitalDifferentialD $$</span> `\capitalDifferentialD`
{.command-list}


## Environments / Matrixes

Environements are used to typeset a set of related items, for examples cells
in a matrix, or multi-line equations.

Each row in a tabular environment is separated by a `\\` command.

Each column is separated by a `&`.

### Matrixes

#### `array`

A simple table with no delimiters. 

<div class='side-by-side'>

<div class="math frame">$$\begin{array}{lc}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</div> 

```tex
\begin{array}{lc}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```

</div>



The `{lc}` argument specifies how many columns there are and how they should be 
formated:
  * `l`: left-aligned
  * `c`: centered
  * `r`: right-aligned

**To add a vertical line separating columns**, add `|` character in the column format:


<div class='side-by-side'>

<div class="math frame">$$\begin{array}{l|c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</div> 

```tex
\begin{array}{l|c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```

</div>

**To add a double vertical line separating columns**, add two `|` characters in the 
column format:

<div class='side-by-side'>

<div class="math frame">$$\begin{array}{l||c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</div> 

```tex
\begin{array}{l||c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```
</div>

**To add a dashed vertical line between two columns**, use `:`:

<div class='side-by-side'>

<div class="math frame">$$\begin{array}{l:c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</div> 

```tex
\begin{array}{l:c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```
</div>

#### `matrix`

The `matrix` environment is very similar to `array`, but it does not have an
argument to specify the format of the columns.

<div class='side-by-side'>

<div class="math frame">$$\begin{matrix}a + 1   &   b  + 1 \\\\ c       &   \frac{1}{d} \end{matrix}$$</div>

```tex
\begin{matrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix}
```
</div>


**To specify the format of the columns**, use the starred version and an optional
argument. This applies to all the other `matrix` environments.

<div class='side-by-side'>

<div class="math frame">$$\begin{matrix*}[l|r]a + 1   &   b  + 1 \\\\ c       &   \frac{1}{d} \end{matrix*}$$</div>

```tex
\begin{matrix*}[l|r]
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix*}
```
</div>


#### `pmatrix`

A matrix with **parentheses** as delimiters.

<div class='side-by-side'>

<div class='math frame'>$$\begin{pmatrix}a & b \\\\ c & \frac{1}{d}\end{pmatrix}$$</div>

```tex
\begin{pmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{pmatrix}
```
</div>

#### `bmatrix`

A matrix with **square brackets** as delimiters.

<div class='side-by-side'>
<div class='math frame'>$$\begin{bmatrix}a & b \\\\ c & \frac{1}{d}\end{bmatrix}$$</div>

```tex
\begin{bmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{bmatrix}
```
</div>

#### `Bmatrix`

A matrix with **braces** (curly brackets) as delimiters.

<div class='side-by-side'>

<div class='math frame'>$$\begin{Bmatrix}a & b \\\\ c & \frac{1}{d}\end{Bmatrix}$$</div>

```tex
\begin{Bmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{Bmatrix}
```

</div>

#### `vmatrix`

A matrix with **single bars** as delimiters.

<div class='side-by-side'>
 <div class='math frame'>$$\begin{vmatrix}a & b \\\\ c & \frac{1}{d}\end{vmatrix}$$</div>

```tex
\begin{vmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{vmatrix}
```
</div>

#### `Vmatrix`

A matrix with **double bars** as delimiters.

<div class='side-by-side'>
<div class='math frame'>$$\begin{Vmatrix}a & b \\\\ c & \frac{1}{d}\end{Vmatrix}$$</div>

```tex
\begin{Vmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{Vmatrix}
```
</div>


#### `matrix*`

<div class='side-by-side'>

<div class='math frame'>$$\begin{matrix*}a & b \\\\ c & \frac{1}{d}\end{matrix*}$$</div>

```tex
\begin{matrix*}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix*}
```
</div>

#### `smallmatrix`

<div class='side-by-side'>

<div class='math frame'>$$\begin{smallmatrix}a & b \\\\ c & \frac{1}{d}\end{smallmatrix}$$</div>

```tex
\begin{smallmatrix}a & b \\ c & \frac{1}{d}\end{smallmatrix}
```

</div>

### Other Environments

#### `cases`, `dcases` and `rcases`

Use these environments to write piecewise functions:

<div class='side-by-side'>
<div class='math frame'>$$f(n) = \begin{cases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{cases}
$$</div>

```tex
f(n) = \begin{cases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{cases}
```
</div>

**To typeset the content in Display style**, use `dcases` instead:

<div class='side-by-side'>
<div class='math frame'>$$f(n) = \begin{dcases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{dcases}
$$</div>

```tex
f(n) = \begin{dcases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{dcases}

```
</div>

**To display the brace on the right**, use `rcases`.

<div class='side-by-side'>
<div class='math frame'>$$\begin{rcases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{rcases} = f(n) 
$$</div>

```tex
\begin{rcases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{rcases} = f(n)

```
</div>

#### `gather`

Consecutive equations without alignment

<div class='side-by-side'>

<div class='math frame'>$$\begin{gather}
  3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \frac{13}{4}x - \frac{1}{2}
\end{gather} $$</div>  

```tex
  \​begin{gather}
    3(a-x) = 3.5x + a - 1 \\
    3a - 3x = 3.5x + a - 1 \\
    a = \frac{13}{4}x - \frac{1}{2}
  \end{gather}
```
</div>

#### `multline`

The first line is left aligned, the last line is right aligned.

<div class='side-by-side'>

<div class='math frame'>$$\begin{multline}
  3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \frac{13}{4}x - \frac{1}{2}
\end{multline} $$</div>  


```tex
  \​begin{multline}
    3(a-x) = 3.5x + a - 1 \\
    3a - 3x = 3.5x + a - 1 \\
    a = \frac{13}{4}x - \frac{1}{2}
  \end{multline}
```
</div>

#### `align`

<div class='side-by-side'>
<div class='math frame'>$$\begin{align}
f(x) & = (a+b)^2 \\
& = a^2+2ab+b^2 \\
\end{align}$$</div>  

```tex
\begin{align}
  f(x)  & = (a+b)^2 \\
        & = a^2+2ab+b^2 \\
\end{align}
```

</div>

#### Others

<div class='side-by-side'>

  <div class='math frame'>$$\begin{math}x+\frac12\end{math}$$</div> 

  ```tex
  \begin{math}
    x+\frac12
  \end{math}
  ```

</div>


<div class='side-by-side'>
  <div class='math frame'>$$\begin{displaymath}x+\frac12\end{displaymath}$$</div> 

  ```tex
  \begin{displaymath}
    x+\frac12
  \end{displaymath}
  ```
</div>


<div class='side-by-side'>

  <div class='math frame'>$$\begin{equation}x+\frac12\end{equation} $$</div>  

  ```tex
  \​begin{equation}
    x+\frac12
  \end{equation}
  ```
</div>


<div class='side-by-side'>
  <div class='math frame'>$$\begin{subequations}x+\frac12\end{subequations} $$</div> 

  ```tex
  \​begin{subequations}
    x+\frac12
  \end{subequations}
  ```
</div>

<div class='side-by-side'>
 <div class='math frame'>$$\begin{eqnarray}a & b \\ c & \frac{1}{d}\end{eqnarray} $$</div> 
 
 ```tex
  \​begin{eqnarray}...\end{eqnarray}
```
 
</div>
 -- Avoid, use `align` instead

<div class='side-by-side'>

 <div class='math frame'>$$\begin{center}\text{first}\end{center}$$</div>

 ```tex
  \begin{center}
    \text{first}
  \end{center}
 ``` 
</div>

---

These environments do not form a math environment by themselves but 
can be used as building blocks for more elaborate structures: 

<div class='side-by-side'>

<div class='math frame'>$$\begin{gathered}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \frac{13}{4}x - \frac{1}{2}\end{gathered} $$</div>  

```tex
  \​begin{gathered}...\end{gathered}
```

</div>

<div class='side-by-side'>

  <div class='math frame'>$$\begin{split}3(a-x) = 3.5x + a - 1 \\\\
      3a - 3x = 3.5x + a - 1 \\\\
      a = \frac{13}{4}x - \frac{1}{2}\end{split} $$</div>  

  ```tex
    \​begin{split}...\end{split}
  ```
</div>

<div class='side-by-side'>

  <div class='math frame'>$$\begin{aligned}3(a-x) = 3.5x + a - 1 \\\\
      3a - 3x = 3.5x + a - 1 \\\\
      a = \frac{13}{4}x - \frac{1}{2}\end{aligned} $$</div>  

  ```tex
    \​begin{aligned}...\end{aligned}
  ```

</div>


## TeX Registers

The math typesetting is influenced by some "constants" that are stored 
in "registers". Those registers can be set globally on a mathfield using 
the `registers` option.

<div class=symbols-table>

| Register | Purpose |
| :--- |  :--- |
| `arrayrulewidth` | Width of separator lines in array environments |
| `arraycolsep` | Amount of space between separator lines |
| `delimitershortfall` | |
| `doublerulesep` | Amount of space between adjacent separator lines |
| `jot` | Vertical space between the lines for all math expressions which allow multiple lines |
| `fboxrule` | Default width of the border with commands such as `\boxed` or `\fbox` |
| `fboxsep` | Default padding between a box and its content |
| `medmuskip` | Amount of space around a binary operator. See also `thinmuskip`, `thickmuskip`.  |
| `nulldelimiterspace` | Horizontal space of an empty delimiter |
| `thickmuskip` | Amount of space around a relational operator. See also `medmuskip`, `thinmuskip`.  |
| `thinmuskip` | Amount of space around math punctuation. See also `medmuskip`, `thickmuskip`. |

</div>


## TeX Primitives

The commands below are TeX primitives. Most are only useful when writing
TeX packages or macros.

<div class=symbols-table>

| Command |  |
| :--- |  :--- |
| `%`  | Anything after a `%` character and an end of line character is interpreted as a comment and ignored|
| `\limits` <br> `\nolimits` |  | 
| `\relax` | | 
| `\noexpand` | | 
| `\obeyspaces` | In Math Mode, spaces are normally ignored. Using this command spaces will be preserved even in Math Mode. |
| `\bgroup` <br> `\egroup` | |
| `\string` | | 
| `\csname` <br> `\endcsname` | | 
| `\ensuremath{}` | If in Math Mode, does nothing. Otherwise, switch to Math Mode. |

</div>


<script type='module'>
import { version } from "https://unpkg.com/mathlive?module";
document.body.classList.add('ready');
document.getElementById('version').innerHTML = `MathLive ${version.mathlive} / Cortex Compute Engine ${ version.computeEngine }`;
</script>
