---
date: Last Modified
title: LaTeX Commands
slug: /mathfield/reference/commands/
toc_max_heading_level: 2
---

<Intro>
Mathfields support over **800** LaTeX commands.
</Intro>

<ReadMore path="http://detexify.kirelabs.org/classify.html" >
**To find the name of the LaTeX command matching the shape of a symbol you can draw**, use **Detexify**<Icon name="chevron-right-bold" />
</ReadMore>

**To enter a LaTeX command in mathfield** press the <kbd>ESC</kbd> key or <kbd>\\</kbd>  
to enter LaTeX editing mode. Press <kbd>ESC</kbd> to exit LaTeX editing mode. 

**To examine the LaTeX code for an expression**, select it, then press <kbd>ESC</kbd>.


<ReadMore path="/mathfield/reference/keybindings" >
The most common symbols can be entered using **keyboard shortcuts**.<Icon name="chevron-right-bold" />
</ReadMore>



## Text Zone, Math Zone and Math Style

### Math Zone

When in a **Math Zone**, the content is laid out using typesetting rules specific
to math. 

For example, variables such as $x$ are displayed in italics, an appropriate amount
of space is inserted around some letters such as $ f $ to improve their legibility,
and white spaces are ignored.

In a Math Zone, the layout and size of some math elements is adjusted based on the
context in which they are used. For example, superscripts and subscripts are
displayed using a smaller font size: $ 2^2 $.

Inside a Math Zone, the **Math Style** indicate the size of the font used to display
the content, and some layout options, such as placement of the limits of a sum or
integral.

**To override the default _Math Style_**, use the following commands:
<div className="symbols-table first-column-header" style={{"--first-col-width":"19ch"}}>

| Math Style |  |  | | 
| :---- | :---- | :--- | :--- |
| `\displaystyle` <br/><br/> For equations in their own paragraph/block | `\displaystyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\displaystyle \sum_{i=0}^n \frac{a_i}{1+x} $$  |
| `\textstyle` <br/><br/> Confusingly, for **inline math**, not for text content| `\textstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\textstyle \sum_{i=0}^n \frac{a_i}{1+x} $$ |
| `\scriptstyle`<br/><br/>For subscripts and superscripts| `\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\scriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$ |
| `\scriptscriptstyle` <br/><br/>For subscripts and superscripts of subscripts and superscripts| `\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x}` | $$\scriptscriptstyle \sum_{i=0}^n \frac{a_i}{1+x} $$  |

</div>

### Text Zone

**To include some textual content**, use the `\text{}` or `\textrm{}` commands to switch 
to a **Text Zone**. Inside a Text Zone, white spaces are preserved and the spacing of characters is not adjusted.


<Latex value='if and only if x > 0' flow='column'/>
<Latex value='\textrm{if and only if } x > 0' flow='column'/>



The `\text{}` command will use the font defined by the CSS `font-family` property
of the enclosing mathfield. The size of the text will adjust depending on 
the current math style (smaller in superscript/subscript).

<Latex value='\text{Donald Knuth created LaTeX}' />


---


The `\textrm{}` command works like `\text{}` but will use a serif (roman) font.


<Latex value='\textrm{Donald Knuth is the author of “The Art of Computer Programming”}'/>


---

The `\mbox{}` command uses the same font as `\text` but its size does not 
account for the current math style.

<Latex value="\mbox{Donald Knuth received the Turing Award in 1974}"/>


---

The `\textnormal{}` command works like `\text{}`. But it's longer to type.

<Latex value="\textnormal{Donald Knuth is a Professor Emeritus at Stanford University}"/>


When in a Text Zone, use `$...$` to switch back to an Inline Math Zone or `\\[...\\]` to switch
to a Display (block) Math Zone.

## Fractions and Binomials

The `\frac` command is used to represent a fraction. The first argument is the numerator,
the second argument is the denominator. It will size itself according to the 
current math style (display, text (inline), script, scriptscript). The `\dfrac` and
`\tfrac` commands force the math style to be display or text (inline) style respectively.

The `\cfrac` (continuous fraction) command has an optional argument, `[l]` or 
`[r]`, that controls if the numerator is left-aligned or right-aligned.

<LatexCommands>
  <Latex value='\frac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\frac{}{}" flow="column"/> 
  <Latex value='\dfrac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\dfrac{}{}" flow="column"/> 
  <Latex value='\tfrac{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\tfrac{}{}" flow="column"/> 
  <Latex value='\cfrac[l]{1}{x+1}' source="\cfrac[l]{}{}" flow="column"/> 
  <Latex value='\cfrac[r]{1}{x+1}' source="\cfrac[r]{}{}" flow="column"/> 
</LatexCommands>


The `\pdiff` command is a convenient shortcut for partial differentials.

<LatexCommands>
  <Latex value='\pdiff{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\pdiff{}{}" flow="column"/> 
</LatexCommands>


---

The `\binom` command is used to represent a binomial coefficient. The `\dbinom` and
`\tbinom` commands force the math style to be display or text (inline) style respectively.

<LatexCommands>
  <Latex value='\binom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\binom{}{}" flow="column"/> 
  <Latex value='\dbinom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\dbinom{}{}" flow="column"/> 
  <Latex value='\tbinom{\unicode{"2B1A}}{\unicode{"2B1A}}' source="\tbinom{}{}" flow="column"/>
</LatexCommands>

:::warning[Deprecated]

The following commands are supported but their usage is generally discouraged
when creating modern LaTeX content.

<LatexCommands>
  <Latex value='a \over b' source="a \over b" flow="column"/> 
  <Latex value='a \atop b' source="a \atop b" flow="column"/> 
  <Latex value='a \choose b' source="a \choose b" flow="column"/> 
  <Latex value='{\unicode{"2B1A} \overwithdelims\lbrace\rbrace \unicode{"2B1A}}' source="\overwithdelims\lbrace\rbrace" flow="column"/> 
  <Latex value='{\unicode{"2B1A} \atopwithdelims\lbrace\rbrace \unicode{"2B1A}}' source="\atopwithdelims\lbrace\rbrace" flow="column"/> 
</LatexCommands>
:::

## Binary Operators

Some binary operators can also be used as a unary operator: `+`, `-`, etc...
Their spacing is adjusted accordingly. For example in \\( -1-2 \\)
there is less space between `-` and `1` than there is between `-` and `2`.


<LatexCommands>
  <Latex value='+' source="+" flow="column"/> 
  <Latex value='-' source="-" flow="column"/> 
  <Latex value='\pm' source="\pm" flow="column"/> 
  <Latex value='\mp' source="\mp" flow="column"/> 
  <Latex value='a / b' source="a / b" flow="column"/> 
  <Latex value='\nicefrac{3}{4}' source="\nicefrac{3}{4}" flow="column"/> 
  <Latex value='\div' source="\div" flow="column"/> 
  <Latex value='\divides' source="\divides" flow="column"/> 
  <Latex value='\sqrt{\unicode{"2B1A}}' source="\sqrt{}" flow="column"/> 
  <Latex value='\sqrt[\unicode{"2B1A}]{\unicode{"2B1A}}' source="\sqrt[]{}" flow="column"/> 
  <Latex value='\surd{}' source="\surd{}" flow="column"/> 
  <Latex value='\intercal' source="\intercal" flow="column"/> 
  <Latex value='\dotplus' source="\dotplus" flow="column"/> 
  <Latex value='\doublebarwedge' source="\doublebarwedge" flow="column"/> 
  <Latex value='\divideontimes' source="\divideontimes" flow="column"/> 
</LatexCommands>

<LatexCommands>
  <Latex value='\times' source="\times" flow="column"/> 
  <Latex value='\cdot' source="\cdot" flow="column"/> 
  <Latex value='*' source="*" flow="column"/> 
  <Latex value='\ast' source='\ast' flow='column'/>
  <Latex value='\star' source='\star' flow='column'/>
  <Latex value='\ltimes' source="\ltimes" flow="column"/> 
  <Latex value='\rtimes' source="\rtimes" flow="column"/> 
  <Latex value='\leftthreetimes' source="\leftthreetimes" flow="column"/> 
  <Latex value='\rightthreetimes' source="\rightthreetimes" flow="column"/> 
</LatexCommands>

<LatexCommands>
  <Latex value='\circ' source='\circ' flow='column'/>
  <Latex value='\bullet' source='\bullet' flow='column'/>
  <Latex value='\centerdot' source='\centerdot' flow='column'/>
</LatexCommands>


<br/>

<LatexCommands>
  <Latex value='\boxminus' source='\boxminus' flow='column'/>
  <Latex value='\boxplus' source='\boxplus' flow='column'/>
  <Latex value='\boxtimes' source='\boxtimes' flow='column'/>
  <Latex value='\boxdot' source='\boxdot' flow='column'/>
</LatexCommands>

<br/>


<LatexCommands>
  <Latex value='\ominus' source='\ominus' flow='column'/>
  <Latex value='\oplus' source='\oplus' flow='column'/>
  <Latex value='\otimes' source='\otimes' flow='column'/>
  <Latex value='\odot' source='\odot' flow='column'/>
  <Latex value='\circleddash' source='\circleddash' flow='column'/>
  <Latex value='\circledast' source='\circledast' flow='column'/>
  <Latex value='\circledcirc' source='\circledcirc' flow='column'/>
  <Latex value='\oslash' source='\oslash' flow='column'/>
</LatexCommands>

<br/>


## Functions

<LatexCommands>
  <Latex value='\exp' source='\exp' flow='column'/>
  <Latex value='\ln' source='\ln' flow='column'/>
  <Latex value='\log' source='\log' flow='column'/>
  <Latex value='\lg' source='\lg' flow='column'/>
  <Latex value='\lb' source='\lb' flow='column'/>
</LatexCommands>

<LatexCommands>
  <Latex value='\ker' source='\ker' flow='column'/>
  <Latex value='\det' source='\det' flow='column'/>
  <Latex value='\arg' source='\arg' flow='column'/>
  <Latex value='\dim' source='\dim' flow='column'/>
  <Latex value='\gcd' source='\gcd' flow='column'/>
</LatexCommands>


<!-- statmath.sty -->
<LatexCommands>
  <Latex value='\argmin' source='\argmin' flow='column'/>
  <Latex value='\argmax' source='\argmax' flow='column'/>
  <Latex value='\plim' source='\plim' flow='column'/>
</LatexCommands>


### Trigonometry

<LatexCommands>
  <Latex value='\unicode{"2B1A}\degree' source='\degree' flow='column'/>
  <Latex value='\unicode{"2B1A}^\circ' source='^\circ' flow='column'/>
  <Latex value='\ang{\unicode{"2B1A}}' source="\ang{}" flow="column"/> 

  <Latex value='\arccos' source='\arccos' flow='column'/>
  <Latex value='\arcsin' source='\arcsin' flow='column'/>
  <Latex value='\arctan' source='\arctan' flow='column'/>
  <Latex value='\cos' source='\cos' flow='column'/>
  <Latex value='\cosh' source='\cosh' flow='column'/>
  <Latex value='\cot' source='\cot' flow='column'/>
  <Latex value='\coth' source='\coth' flow='column'/>
  <Latex value='\csc' source='\csc' flow='column'/>
  <Latex value='\sec' source='\sec' flow='column'/>
  <Latex value='\sin' source='\sin' flow='column'/>
  <Latex value='\sinh' source='\sinh' flow='column'/>
  <Latex value='\tan' source='\tan' flow='column'/>
  <Latex value='\tanh' source='\tanh' flow='column'/>
</LatexCommands>

### Non-Standard Trig Functions

The commands in this section are not part of the standard LaTeX distribution
but are available in some packages. Use them with caution as they may not
be supported by all LaTeX engines. Consider using `\operatorname{}` instead.

<LatexCommands>
  <Latex value='\arctg' source='\arctg' flow='column'/>
  <Latex value='\arcctg' source='\arcctg' flow='column'/>
  <Latex value='\ch' source='\ch' flow='column'/>
  <Latex value='\ctg' source='\ctg' flow='column'/>
  <Latex value='\cth' source='\cth' flow='column'/>
  <Latex value='\cotg' source='\cotg' flow='column'/>
  <Latex value='\cosec' source='\cosec' flow='column'/>
  <Latex value='\sh' source='\sh' flow='column'/>
  <Latex value='\tg' source='\tg' flow='column'/>
  <Latex value='\th' source='\th' flow='column'/>
</LatexCommands>


### Bounds

<LatexCommands>
  <Latex value='\max' source='\max' flow='column'/>
  <Latex value='\min' source='\min' flow='column'/>
  <Latex value='\sup' source='\sup' flow='column'/>
  <Latex value='\inf' source='\inf' flow='column'/>
  <Latex value='\lim' source='\lim' flow='column'/>
  <Latex value='\liminf' source='\liminf' flow='column'/>
  <Latex value='\limsup' source='\limsup' flow='column'/>

<!-- amsopn.sty.sty -->
  <Latex value='\injlim' source='\injlim' flow='column'/>
  <Latex value='\varlimsup' source='\varlimsup' flow='column'/>
  <Latex value='\varliminf' source='\varliminf' flow='column'/>
  <Latex value='\varinjlim' source='\varinjlim' flow='column'/>

</LatexCommands>

### Projections

<LatexCommands>
  <Latex value='\Pr' source='\Pr' flow='column'/>
  <Latex value='\hom' source='\hom' flow='column'/>
<!-- amsopn.sty.sty -->
  <Latex value='\varprojlim' source='\varprojlim' flow='column'/>
  <Latex value='\projlim' source='\projlim' flow='column'/>
</LatexCommands>

### Modulo

<LatexCommands>
  <Latex value='n \pmod{3}' source='n \pmod{3}' flow='column'/>
  <Latex value='n \mod{3}' source='n \mod{3}' flow='column'/>
  <Latex value='n \bmod 3' source='n \bmod 3' flow='column'/>
</LatexCommands>





### Custom Functions

**To define a custom function** use the `\operatorname{}` command: the name of the function will be displayed in upright
font and with the appropriate spacing.

<Latex value="\operatorname{argth}(\theta)" flow="column"/>


## Unicode

If a symbol is not available as a LaTeX command, you can use the Unicode codepoint
of the character. The commands below can be used to insert a Unicode character in a mathfield.

<div className="symbols-table first-column-header">

| Command | | 
| :--- | :--- | 
| `\unicode{}` | The argument is a Unicode codepoint expressed as a number. To use a hexadecimal number, start the argument with `x` or `"` and use **uppercase** `A`-`F` for hexadecimal digits.<br/><ul><li>$$\Large\unicode{10775} $$ `\unicode{10775}`</li><li>$$\Large\unicode{"2A17}$$ `\unicode{"2A17}`</li><li>$$\Large\unicode{x2A17}$$ `\unicode{x2A17}`</li></ul> |
| `\char` | The argument is also a Unicode codepoint, but the `{`...`}` delimiters are optional when using `"`. <br/> <ul><li>$$\Large\char"2A17 $$ `\char"2A17`  </li></ul> |
| `^^` <br/> `^^^^` | Followed by 2 or 4 hexadecimal digits with **lowercase** `a`-`f` to specify a Unicode codepoint.<br/><ul><li>$$\Large^^4a $$ `^^4a`</li><li>$$\Large^^^^2a17 $$ `^^^^2a17`</li></ul> | 

</div>


:::info[Note]
The codepoint of the Unicode character &#x2A17; **U+2A17 INTEGRAL WITH LEFTWARDS ARROW WITH HOOK** is 10775 in decimal, 2A17<sub>16</sub> in hexadecimal. The codepoint of the letter `J` is 004A<sub>16</sub> in hexadecimal. Learn more about [Mathematical Operators and Symbols in Unicode on Wikipedia](https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode).
:::


## Large Operators

Large operators display their limits above and below or adjacent to the operator, 
depending on the math style (**Display Style** or **Text Style**) and on the 
operator.

The position of the limits can be controlled with `\limits`, `\nolimits` or 
`\displaylimits` after the operator. The `\limits` command forces the display
of the limits above and below the operator, `\nolimits` forces the display
of the limits adjacent to the operator, and `\displaylimits` uses an 
automatic position, based on the operator and current math style.

<div className='no-line three-col'>

| `\limits` | `\nolimits` | `\displaylimits` |  
| :---- | :---- |  :---- |
| <span className='math'>$$\sum_{i=0}^n\limits $$</span> | <span className='math'>$$\sum_{i=0}^n\nolimits $$</span> | <span className='math'>$$\sum_{i=0}^n\displaylimits $$</span> |
| `\sum_{i=0}^n\limits` | `\sum_{i=0}^n\nolimits` | `\sum_{i=0}^n\displaylimits` |
| <span className='math'>$$\int_0^\infty\limits $$</span> | <span className='math'>$$\int_0^\infty\nolimits $$</span> | <span className='math'>$$\int_0^\infty\displaylimits $$</span> |
| `\int_0^\infty\limits` | `\int_0^\infty\nolimits` | `\int_0^\infty\displaylimits` |

</div>

In Display Style, the `\intop` and `\ointop` commands display their limits 
above and below by default, while the `\int` command display its limit adjacent.




  <LatexCommands>
    <Latex value='\sum_{n=0}^\infty' source='\sum' flow='column'/>
    <Latex value='\prod_{n=0}^\infty' source='\prod' flow='column'/>
    <Latex value='\coprod_{n=0}^\infty' source='\coprod' flow='column'/>
    <Latex value='\int_0^\infty' source='\int' flow='column'/>
    <Latex value='\intop_0^\infty' source='\intop' flow='column'/>
    <Latex value='\iint_0^\infty' source='\iint' flow='column' aside="Double integral"/>
    <Latex value='\iiint_0^\infty' source='\iiint' flow='column'aside="Tripe integral"/>
    <Latex value='\oint_C' source='\oint' flow='column'aside="Contour integral"/>
    <Latex value='\smallint' source='\smallint' flow='column'aside="Always displayed small"/>
    <Latex value='\bigcup' source='\bigcup' flow='column'/>
    <Latex value='\bigcap' source='\bigcap' flow='column'/>
    <Latex value='\bigvee' source='\bigvee' flow='column'/>
    <Latex value='\bigwedge' source='\bigwedge' flow='column'/>
    <Latex value='\biguplus' source='\biguplus' flow='column'/>
    <Latex value='\bigotimes' source='\bigotimes' flow='column'/>
    <Latex value='\bigoplus' source='\bigoplus' flow='column'/>
    <Latex value='\bigodot' source='\bigodot' flow='column'/>
    <Latex value='\bigsqcup' source='\bigsqcup' flow='column'/>
  </LatexCommands>

  ----

  <LatexCommands>
    <Latex value='\oiint' source='\oiint' flow='column' aside="Surface integral"/>
    <Latex value='\oiiint' source='\oiiint' flow='column' aside="Volume integral"/>
    <Latex value='\intclockwise' source='\intclockwise' flow='column'/>
    <Latex value='\varointclockwise' source='\varointclockwise' flow='column'/>
    <Latex value='\ointctrclockwise' source='\ointctrclockwise' flow='column'/>
    <Latex value='\intctrclockwise' source='\intctrclockwise' flow='column'/>
    <Latex value='\Cap' source='\Cap' flow='column'/>
    <Latex value='\Cup' source='\Cup' flow='column'/>
    <Latex value='\doublecap' source='\doublecap' flow='column'/>
    <Latex value='\doublecup' source='\doublecup' flow='column'/>
    <Latex value='\sqcup' source='\sqcup' flow='column'/>
    <Latex value='\sqcap' source='\sqcap' flow='column'/>
    <Latex value='\uplus' source='\uplus' flow='column'/>
    <Latex value='\wr' source='\wr' flow='column'/>
    <Latex value='\amalg' source='\amalg' flow='column'/>
  </LatexCommands>


  ## Logic

  ### Quantifiers

  <LatexCommands>
    <Latex value='\forall' source='\forall' flow='column'/>
    <Latex value='\exists' source='\exists' flow='column'/>
    <Latex value='\nexists' source='\nexists' flow='column'/>
  </LatexCommands>

  ### Unary/Binary Operators

  <LatexCommands>
    <Latex value='\land' source='\land' flow='column'/>
    <Latex value='\wedge' source='\wedge' flow='column'/>
    <Latex value='\lor' source='\lor' flow='column'/>
    <Latex value='\vee' source='\vee' flow='column'/>
    <Latex value='\barwedge' source='\barwedge' flow='column'/>
    <Latex value='\veebar' source='\veebar' flow='column'/>
    <Latex value='\nor' source='\nor' flow='column'/>
    <Latex value='\curlywedge' source='\curlywedge' flow='column'/>
    <Latex value='\curlyvee' source='\curlyvee' flow='column'/>
    <Latex value='\lnot' source='\lnot' flow='column'/>
    <Latex value='\neg' source='\neg' flow='column'/>
  </LatexCommands>


  ### Relational Operators

  <LatexCommands>
    <Latex value='\to' source='\to' flow='column'/>
    <Latex value='\gets' source='\gets' flow='column'/>
    <Latex value='\implies' source='\implies' flow='column'/>
    <Latex value='\impliedby' source='\impliedby' flow='column'/>
    <Latex value='\biconditional' source='\biconditional' flow='column'/>
    <Latex value='\therefore' source='\therefore' flow='column'/>
    <Latex value='\because' source='\because' flow='column'/>
    <Latex value='\leftrightarrow' source='\leftrightarrow' flow='column'/>
    <Latex value='\Leftrightarrow' source='\Leftrightarrow' flow='column'/>
    <Latex value='\roundimplies' source='\roundimplies' flow='column'/>
    <Latex value='\models' source='\models' flow='column'/>
    <Latex value='\vdash' source='\vdash' flow='column'/>
    <Latex value='\dashv' source='\dashv' flow='column'/>
  </LatexCommands>


## Arrows

<LatexCommands>
  <Latex value='\rightarrow' source='\rightarrow' flow='column'/>
  <Latex value='\leftarrow' source='\leftarrow' flow='column'/>
  <Latex value='\twoheadrightarrow' source='\twoheadrightarrow' flow='column'/>
  <Latex value='\twoheadleftarrow' source='\twoheadleftarrow' flow='column'/>
  <Latex value='\rightarrowtail' source='\rightarrowtail' flow='column'/>
  <Latex value='\leftarrowtail' source='\leftarrowtail' flow='column'/>
  <Latex value='\dashrightarrow' source='\dashrightarrow' flow='column'/>
  <Latex value='\dashleftarrow' source='\dashleftarrow' flow='column'/>
  <Latex value='\longrightarrow' source='\longrightarrow' flow='column'/>
  <Latex value='\longleftarrow' source='\longleftarrow' flow='column'/>
  <Latex value='\longleftrightarrow' source='\longleftrightarrow' flow='column'/>
  <Latex value='\Rightarrow' source='\Rightarrow' flow='column'/>
  <Latex value='\Leftarrow' source='\Leftarrow' flow='column'/>
  <Latex value='\Longrightarrow' source='\Longrightarrow' flow='column'/>
  <Latex value='\Longleftarrow' source='\Longleftarrow' flow='column'/>
  <Latex value='\Longleftrightarrow' source='\Longleftrightarrow' flow='column'/>
  <Latex value='\mapsto' source='\mapsto' flow='column'/>
  <Latex value='\longmapsto' source='\longmapsto' flow='column'/>
  <Latex value='\multimap' source='\multimap' flow='column'/>
  <Latex value='\uparrow' source='\uparrow' flow='column'/>
  <Latex value='\downarrow' source='\downarrow' flow='column'/>
  <Latex value='\updownarrow' source='\updownarrow' flow='column'/>
  <Latex value='\Uparrow' source='\Uparrow' flow='column'/>
  <Latex value='\Downarrow' source='\Downarrow' flow='column'/>
  <Latex value='\Updownarrow' source='\Updownarrow' flow='column'/>
  <Latex value='\rightharpoonup' source='\rightharpoonup' flow='column'/>
  <Latex value='\leftharpoonup' source='\leftharpoonup' flow='column'/>
  <Latex value='\rightharpoondown' source='\rightharpoondown' flow='column'/>
  <Latex value='\leftharpoondown' source='\leftharpoondown' flow='column'/>
  <Latex value='\rightleftharpoons' source='\rightleftharpoons' flow='column'/>
  <Latex value='\leftrightharpoons' source='\leftrightharpoons' flow='column'/>
  <Latex value='\searrow' source='\searrow' flow='column'/>
  <Latex value='\nearrow' source='\nearrow' flow='column'/>
  <Latex value='\swarrow' source='\swarrow' flow='column'/>
  <Latex value='\nwarrow' source='\nwarrow' flow='column'/>
  <Latex value='\Rrightarrow' source='\Rrightarrow' flow='column'/>
  <Latex value='\Lleftarrow' source='\Lleftarrow' flow='column'/>
  <Latex value='\leftrightarrows' source='\leftrightarrows' flow='column'/>
  <Latex value='\rightleftarrows' source='\rightleftarrows' flow='column'/>
  <Latex value='\curvearrowright' source='\curvearrowright' flow='column'/>
  <Latex value='\curvearrowleft' source='\curvearrowleft' flow='column'/>
  <Latex value='\hookrightarrow' source='\hookrightarrow' flow='column'/>
  <Latex value='\hookleftarrow' source='\hookleftarrow' flow='column'/>
  <Latex value='\looparrowright' source='\looparrowright' flow='column'/>
  <Latex value='\looparrowleft' source='\looparrowleft' flow='column'/>
  <Latex value='\circlearrowright' source='\circlearrowright' flow='column'/>
  <Latex value='\circlearrowleft' source='\circlearrowleft' flow='column'/>
  <Latex value='\rightrightarrows' source='\rightrightarrows' flow='column'/>
  <Latex value='\leftleftarrows' source='\leftleftarrows' flow='column'/>
  <Latex value='\upuparrows' source='\upuparrows' flow='column'/>
  <Latex value='\downdownarrows' source='\downdownarrows' flow='column'/>
  <Latex value='\Rsh' source='\Rsh' flow='column'/>
  <Latex value='\Lsh' source='\Lsh' flow='column'/>
  <Latex value='\upharpoonright' source='\upharpoonright' flow='column'/>
  <Latex value='\upharpoonleft' source='\upharpoonleft' flow='column'/>
  <Latex value='\downharpoonright' source='\downharpoonright' flow='column'/>
  <Latex value='\downharpoonleft' source='\downharpoonleft' flow='column'/>
  <Latex value='\restriction' source='\restriction' flow='column'/>
  <Latex value='\rightsquigarrow' source='\rightsquigarrow' flow='column'/>
  <Latex value='\leftrightsquigarrow' source='\leftrightsquigarrow' flow='column'/>
  <Latex value='\leadsto' source='\leadsto' flow='column'/>
</LatexCommands>

### Negated Arrows

<LatexCommands>
  <Latex value='\nrightarrow' source='\nrightarrow' flow='column'/>
  <Latex value='\nleftarrow' source='\nleftarrow' flow='column'/>
  <Latex value='\nleftrightarrow' source='\nleftrightarrow' flow='column'/>
  <Latex value='\nRightarrow' source='\nRightarrow' flow='column'/>
  <Latex value='\nLeftarrow' source='\nLeftarrow' flow='column'/>
  <Latex value='\nLeftrightarrow' source='\nLeftrightarrow' flow='column'/>
</LatexCommands>

### Extensible Arrows

The length of the arrow commands above is fixed. The length of the commands
in this section is determined by the length of the content above and below 
the arrows, which is specified as an argument (and optional argument):

<LatexCommands>

  <Latex value='\xrightarrow[\text{long text below}]{}'flow='column'/>
  <Latex value='\xrightarrow{\text{long text above}}'flow='column'/>
  <Latex value='\xrightarrow[\text{and below}]{\text{long text above}}'flow='column'/>
  <Latex value='\xlongequal[below]{above}' source='\xlongequal[]{}' flow='column'/>
  <Latex value='\xrightarrow[below]{above}' source='\xrightarrow[]{}' flow='column'/>
  <Latex value='\xleftarrow[below]{above}' source='\xleftarrow[]{}' flow='column'/>
  <Latex value='\xleftrightarrow[below]{above}' source='\xleftrightarrow[]{}' flow='column'/>
  <Latex value='\xtwoheadrightarrow[below]{above}' source='\xtwoheadrightarrow[]{}' flow='column'/>
  <Latex value='\xtwoheadleftarrow[below]{above}' source='\xtwoheadleftarrow[]{}' flow='column'/>
  <Latex value='\xRightarrow[below]{above}' source='\xRightarrow[]{}' flow='column'/>
  <Latex value='\xLeftarrow[below]{above}' source='\xLeftarrow[]{}' flow='column'/>
  <Latex value='\xrightharpoonup[below]{above}' source='\xrightharpoonup[]{}' flow='column'/>
  <Latex value='\xleftharpoonup[below]{above}' source='\xleftharpoonup[]{}' flow='column'/>
  <Latex value='\xrightharpoondown[below]{above}' source='\xrightharpoondown[]{}' flow='column'/>
  <Latex value='\xleftharpoondown[below]{above}' source='\xleftharpoondown[]{}' flow='column'/>
  <Latex value='\xrightleftharpoons[below]{above}' source='\xrightleftharpoons[]{}' flow='column'/>
  <Latex value='\xleftrightharpoons[below]{above}' source='\xleftrightharpoons[]{}' flow='column'/>
  <Latex value='\xhookrightarrow[below]{above}' source='\xhookrightarrow[]{}' flow='column'/>
  <Latex value='\xhookleftarrow[below]{above}' source='\xhookleftarrow[]{}' flow='column'/>
  <Latex value='\xmapsto[below]{above}' source='\xmapsto[]{}' flow='column'/>
  <Latex value='\xtofrom[below]{above}' source='\xtofrom[]{}' flow='column'/>
</LatexCommands>


## Accents

<LatexCommands>

<Latex value='\dot{\unicode{"2B1A}}' source='\dot' flow='column'/>
<Latex value='\ddot{\unicode{"2B1A}}' source='\ddot' flow='column'/>
<Latex value='\dddot{\unicode{"2B1A}}' source='\dddot' flow='column'/>
<Latex value='\ddddot{\unicode{"2B1A}}' source='\ddddot' flow='column'/>
<Latex value='\mathring{\unicode{"2B1A}}' source='\mathring' flow='column'/>
<Latex value='\tilde{\unicode{"2B1A}}' source='\tilde' flow='column'/>
<Latex value='\bar{\unicode{"2B1A}}' source='\bar' flow='column'/>
<Latex value='\breve{\unicode{"2B1A}}' source='\breve' flow='column'/>
<Latex value='\check{\unicode{"2B1A}}' source='\check' flow='column'/>
<Latex value='\hat{\unicode{"2B1A}}' source='\hat' flow='column'/>
<Latex value='\vec{\unicode{"2B1A}}' source='\vec' flow='column'/>
</LatexCommands>


### Deprecated Accents
<br/>

:::warning[Deprecated]

The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content
when an equivalent Unicode character is available.

For example use `é` rather than `\'{e}`.

:::

<br/>

<LatexCommands>

<Latex value='\acute{e}' source="\acute" flow='column'/>
<Latex value='\grave{e}' source='\grave' flow='column'/>
<Latex value='\^{e}' source="\^" flow='column'/>
<Latex value='\`{e}' source="\`" flow='column'/>
<Latex value="\'{e}" source="\'" flow='column'/>
<Latex value='\"{a}' source='\"' flow='column'/>
<Latex value='\={a}' source="\=" flow='column'/>
<Latex value='\c{c}' source="\c" flow='column'/>
<Latex value='\~{n}' source="\~" flow='column'/>
</LatexCommands>

### Extensible Accents

Regular accents have a fixed width and do not stretch. For example, compare:

<Latex value='\vec{ABC}' flow='column'/>
<Latex value='\overrightarrow{ABC}' flow='column'/>

<br/>

<LatexCommands>
<Latex value='\overline{ABC}' flow='column'/>
<Latex value='\overgroup{ABC}' flow='column'/>
<Latex value='\overbrace{ABC}' flow='column'/>
<Latex value='\overlinesegment{ABC}' flow='column'/>
<Latex value='\overrightarrow{ABC}' flow='column'/>
<Latex value='\overleftarrow{ABC}' flow='column'/>
<Latex value='\overleftrightarrow{ABC}' flow='column'/>
<Latex value='\overarc{ABC}' flow='column'/>
<Latex value='\overparen{ABC}' flow='column'/>
<Latex value='\wideparen{ABC}' flow='column'/>
<Latex value='\widetilde{ABC}' flow='column'/>
<Latex value='\widehat{ABC}' flow='column'/>
<Latex value='\widecheck{ABC}' flow='column'/>
<Latex value='\Overrightarrow{ABC}' flow='column'/>
<Latex value='\overleftharpoon{ABC}' flow='column'/>
<Latex value='\overrightharpoon{ABC}' flow='column'/>
<Latex value='\underline{ABC}' flow='column'/>
<Latex value='\undergroup{ABC}' flow='column'/>
<Latex value='\underbrace{ABC}' flow='column'/>
<Latex value='\underlinesegment{ABC}' flow='column'/>
<Latex value='\underrightarrow{ABC}' flow='column'/>
<Latex value='\underleftarrow{ABC}' flow='column'/>
<Latex value='\underleftrightarrow{ABC}' flow='column'/>
<Latex value='\underarc{ABC}' flow='column'/>
<Latex value='\underparen{ABC}' flow='column'/>
<Latex value='\utilde{ABC}' flow='column'/>

</LatexCommands>


## Relational Operators

To display a vertical "stack" of two symbols as a relational operator, use the 
`\stackrel` command: <span className='math'>$$a\stackrel{?}{=}b $$</span> `a\stackrel{?}{=}b`.


<LatexCommands>
<Latex value='=' flow='column'/>
<Latex value='<' flow='column'/>
<Latex value='\lt' flow='column'/>
<Latex value='>' flow='column'/>
<Latex value='\gt' flow='column'/>
<Latex value='\le' flow='column'/>
<Latex value='\leq' flow='column'/>
<Latex value='\ge' flow='column'/>
<Latex value='\geq' flow='column'/>
<Latex value='\shortparallel' flow='column'/>
<Latex value='\leqslant' flow='column'/>
<Latex value='\geqslant' flow='column'/>
<Latex value='\gtrsim' flow='column'/>
<Latex value='\approxeq' flow='column'/>
<Latex value='\thickapprox' flow='column'/>
<Latex value='\lessapprox' flow='column'/>
<Latex value='\gtrapprox' flow='column'/>
<Latex value='\precapprox' flow='column'/>
<Latex value='\succapprox' flow='column'/>
<Latex value='\thicksim' flow='column'/>
<Latex value='\succsim' flow='column'/>
<Latex value='\precsim' flow='column'/>
<Latex value='\backsim' flow='column'/>
<Latex value='\eqsim' flow='column'/>
<Latex value='\backsimeq' flow='column'/>
<Latex value='\lesssim' flow='column'/>
<Latex value='\smallsmile' flow='column'/>
<Latex value='\smallfrown' flow='column'/>
<Latex value='\leqq' flow='column'/>
<Latex value='\eqslantless' flow='column'/>
<Latex value='\lll' flow='column'/>
<Latex value='\lessgtr' flow='column'/>
<Latex value='\lesseqgtr' flow='column'/>
<Latex value='\lesseqqgtr' flow='column'/>
<Latex value='\risingdotseq' flow='column'/>
<Latex value='\fallingdotseq' flow='column'/>
<Latex value='\preccurlyeq' flow='column'/>
<Latex value='\curlyeqprec' flow='column'/>
<Latex value='\vDash' flow='column'/>
<Latex value='\Vvdash' flow='column'/>
<Latex value='\bumpeq' flow='column'/>
<Latex value='\Bumpeq' flow='column'/>
<Latex value='\geqq' flow='column'/>
<Latex value='\eqslantgtr' flow='column'/>
<Latex value='\ggg' flow='column'/>
<Latex value='\gtrless' flow='column'/>
<Latex value='\gtreqless' flow='column'/>
<Latex value='\gtreqqless' flow='column'/>
<Latex value='\succcurlyeq' flow='column'/>
<Latex value='\curlyeqsucc' flow='column'/>
<Latex value='\Vdash' flow='column'/>
<Latex value='\shortmid' flow='column'/>
<Latex value='\between' flow='column'/>
<Latex value='\pitchfork' flow='column'/>
<Latex value='\varpropto' flow='column'/>
<Latex value='\llless' flow='column'/>
<Latex value='\gggtr' flow='column'/>
<Latex value='\doteqdot' flow='column'/>
<Latex value='\Doteq' flow='column'/>
<Latex value='\eqcirc' flow='column'/>
<Latex value='\circeq' flow='column'/>
<Latex value='\lhd' flow='column'/>
<Latex value='\rhd' flow='column'/>
<Latex value='\lessdot' flow='column'/>
<Latex value='\gtrdot' flow='column'/>
<Latex value='\ll' flow='column'/>
<Latex value='\gg' flow='column'/>
<Latex value='\coloneq' flow='column'/>
<Latex value='\measeq' flow='column'/>
<Latex value='\eqdef' flow='column'/>
<Latex value='\questeq' flow='column'/>
<Latex value='\cong' flow='column'/>
<Latex value='\equiv' flow='column'/>
<Latex value='\prec' flow='column'/>
<Latex value='\preceq' flow='column'/>
<Latex value='\succ' flow='column'/>
<Latex value='\succeq' flow='column'/>
<Latex value='\perp' flow='column'/>
<Latex value='\propto' flow='column'/>
<Latex value='\smile' flow='column'/>
<Latex value='\frown' flow='column'/>
<Latex value='\sim' flow='column'/>
<Latex value='\doteq' flow='column'/>
<Latex value='\bowtie' flow='column'/>
<Latex value='\Join' flow='column'/>
<Latex value='\asymp' flow='column'/>
<Latex value='\approx' flow='column'/>
<Latex value='\parallel' flow='column'/>
<Latex value='\simeq' flow='column'/>
<Latex value='\ratio' flow='column'/>
<Latex value='\coloncolon' flow='column'/>
<Latex value='\colonequals' flow='column'/>
<Latex value='\coloncolonequals' flow='column'/>
<Latex value='\equalscolon' flow='column'/>
<Latex value='\equalscoloncolon' flow='column'/>
<Latex value='\colonminus' flow='column'/>
<Latex value='\coloncolonminus' flow='column'/>
<Latex value='\minuscolon' flow='column'/>
<Latex value='\minuscoloncolon' flow='column'/>
<Latex value='\coloncolonapprox' flow='column'/>
<Latex value='\coloncolonsim' flow='column'/>
<Latex value='\simcolon' flow='column'/>
<Latex value='\simcoloncolon' flow='column'/>
<Latex value='\approxcoloncolon' flow='column'/>
<Latex value='\notni' flow='column'/>
<Latex value='\ordinarycolon' flow='column'/>
<Latex value='\vcentcolon' flow='column'/>
<Latex value='\dblcolon' flow='column'/>
<Latex value='\coloneqq' flow='column'/>
<Latex value='\Coloneqq' flow='column'/>
<Latex value='\coloneq' flow='column'/>
<Latex value='\Coloneq' flow='column'/>
<Latex value='\eqqcolon' flow='column'/>
<Latex value='\Eqqcolon' flow='column'/>
<Latex value='\eqcolon' flow='column'/>
<Latex value='\Eqcolon' flow='column'/>
<Latex value='\colonapprox' flow='column'/>
<Latex value='\Colonapprox' flow='column'/>
<Latex value='\colonsim' flow='column'/>
<Latex value='\Colonsim' flow='column'/>
</LatexCommands>



### Negated Relational Operators

To negate other relational operators, use the `\not` command, e.g. 
<span className='math'>\\( \not\equiv \\)</span> `\not\equiv`.

<LatexCommands>
<Latex value='\ne' flow='column'/>
<Latex value='\neq' flow='column'/>
<Latex value='\not=' flow='column'/>
<Latex value='\not' flow='column'/>
<Latex value='\nless' flow='column'/>
<Latex value='\nleq' flow='column'/>
<Latex value='\lneq' flow='column'/>
<Latex value='\lneqq' flow='column'/>
<Latex value='\nleqq' flow='column'/>
<Latex value='\nleqslant' flow='column'/>
<Latex value='\ngeq' flow='column'/>
<Latex value='\lvertneqq' flow='column'/>
<Latex value='\lnsim' flow='column'/>
<Latex value='\lnapprox' flow='column'/>
<Latex value='\nprec' flow='column'/>
<Latex value='\npreceq' flow='column'/>
<Latex value='\precnsim' flow='column'/>
<Latex value='\precnapprox' flow='column'/>
<Latex value='\nsim' flow='column'/>
<Latex value='\nshortmid' flow='column'/>
<Latex value='\nmid' flow='column'/>
<Latex value='\nvdash' flow='column'/>
<Latex value='\nvDash' flow='column'/>
<Latex value='\ngtr' flow='column'/>
<Latex value='\ngeqslant' flow='column'/>
<Latex value='\ngeqq' flow='column'/>
<Latex value='\gneq' flow='column'/>
<Latex value='\gneqq' flow='column'/>
<Latex value='\gvertneqq' flow='column'/>
<Latex value='\gnsim' flow='column'/>
<Latex value='\gnapprox' flow='column'/>
<Latex value='\nsucc' flow='column'/>
<Latex value='\nsucceq' flow='column'/>
<Latex value='\succnsim' flow='column'/>
<Latex value='\succnapprox' flow='column'/>
<Latex value='\ncong' flow='column'/>
<Latex value='\nshortparallel' flow='column'/>
<Latex value='\nparallel' flow='column'/>
<Latex value='\nVDash' flow='column'/>
<Latex value='\nVdash' flow='column'/>
<Latex value='\precneqq' flow='column'/>
<Latex value='\succneqq' flow='column'/>
<Latex value='\unlhd' flow='column'/>
<Latex value='\unrhd' flow='column'/>
</LatexCommands>

## Sets


<LatexCommands>
<Latex value='\emptyset' flow='column'/>
<Latex value='\varnothing' flow='column'/>
</LatexCommands>

**To represent sets such as the natural numbers, integers, real numbers, etc.,** use the `\mathbb` command for best compatibility, e.g.
 `\mathbb{N}` $ \mathbb{N} $ or `\mathbb{C}` $ \mathbb{C} $, etc...

Non standard commands, may not be supported by all LaTeX engines:
<LatexCommands>
<Latex value='\N' flow='column'/>
<Latex value='\R' flow='column'/>
<Latex value='\Q' flow='column'/>
<Latex value='\C' flow='column'/>
<Latex value='\Z' flow='column'/>
<Latex value='\P' flow='column'/>
<Latex value='\doubleStruckCapitalN' flow='column'/>
<Latex value='\doubleStruckCapitalR' flow='column'/>
<Latex value='\doubleStruckCapitalQ' flow='column'/>
<Latex value='\doubleStruckCapitalZ' flow='column'/>
<Latex value='\doubleStruckCapitalP' flow='column'/>
</LatexCommands>




### Set Operators

<LatexCommands>
<Latex value='\cap' flow='column'/>
<Latex value='\cup' flow='column'/>
<Latex value='\setminus' flow='column'/>
<Latex value='\smallsetminus' flow='column'/>
<Latex value='\complement' flow='column'/>
</LatexCommands>

### Relational Set Operators


<LatexCommands>
<Latex value='\nsupseteqq' flow='column'/>
<Latex value='\supsetneq' flow='column'/>
<Latex value='\varsupsetneq' flow='column'/>
<Latex value='\supsetneqq' flow='column'/>
<Latex value='\varsupsetneqq' flow='column'/>
<Latex value='\nsubseteqq' flow='column'/>
<Latex value='\subseteqq' flow='column'/>
<Latex value='\Subset' flow='column'/>
<Latex value='\sqsubset' flow='column'/>
<Latex value='\supseteqq' flow='column'/>
<Latex value='\Supset' flow='column'/>
<Latex value='\sqsupset' flow='column'/>
<Latex value='\sqsubseteq' flow='column'/>
<Latex value='\sqsupseteq' flow='column'/>
<Latex value='\in' flow='column'/>
<Latex value='\notin' flow='column'/>
<Latex value='\ni' flow='column'/>
<Latex value='\owns' flow='column'/>
<Latex value='\backepsilon' flow='column'/>
<Latex value='\subset' flow='column'/>
<Latex value='\supset' flow='column'/>
<Latex value='\subseteq' flow='column'/>
<Latex value='\supseteq' flow='column'/>
<Latex value='\subsetneq' flow='column'/>
<Latex value='\varsubsetneq' flow='column'/>
<Latex value='\subsetneqq' flow='column'/>
<Latex value='\varsubsetneqq' flow='column'/>
<Latex value='\nsubset' flow='column'/>
<Latex value='\nsupset' flow='column'/>
<Latex value='\nsubseteq' flow='column'/>
<Latex value='\nsupseteq' flow='column'/>
</LatexCommands>


## Greek

<LatexCommands>
<Latex value='\alpha' flow='column'/>
<Latex value='\beta' flow='column'/>
<Latex value='\gamma' flow='column'/>
<Latex value='\delta' flow='column'/>
<Latex value='\epsilon' flow='column'/>
<Latex value='\varepsilon' flow='column'/>
<Latex value='\zeta' flow='column'/>
<Latex value='\eta' flow='column'/>
<Latex value='\theta' flow='column'/>
<Latex value='\vartheta' flow='column'/>
<Latex value='\iota' flow='column'/>
<Latex value='\kappa' flow='column'/>
<Latex value='\varkappa' flow='column'/>
<Latex value='\lambda' flow='column'/>
<Latex value='\mu' flow='column'/>
<Latex value='\nu' flow='column'/>
<Latex value='\xi' flow='column'/>
<Latex value='\omicron' flow='column'/>
<Latex value='\pi' flow='column'/>
<Latex value='\varpi' flow='column'/>
<Latex value='\rho' flow='column'/>
<Latex value='\varrho' flow='column'/>
<Latex value='\sigma' flow='column'/>
<Latex value='\varsigma' flow='column'/>
<Latex value='\tau' flow='column'/>
<Latex value='\phi' flow='column'/>
<Latex value='\varphi' flow='column'/>
<Latex value='\upsilon' flow='column'/>
<Latex value='\chi' flow='column'/>
<Latex value='\psi' flow='column'/>
<Latex value='\omega' flow='column'/>
<Latex value='\digamma' flow='column'/>
</LatexCommands>
---

<LatexCommands>
<Latex value='\Alpha' flow='column'/>
<Latex value='\Beta' flow='column'/>
<Latex value='\Gamma' flow='column'/>
<Latex value='\varGamma' flow='column'/>
<Latex value='\Delta' flow='column'/>
<Latex value='\varDelta' flow='column'/>
<Latex value='\Epsilon' flow='column'/>
<Latex value='\Zeta' flow='column'/>
<Latex value='\Eta' flow='column'/>
<Latex value='\Theta' flow='column'/>
<Latex value='\varTheta' flow='column'/>
<Latex value='\Iota' flow='column'/>
<Latex value='\Kappa' flow='column'/>
<Latex value='\Lambda' flow='column'/>
<Latex value='\varLambda' flow='column'/>
<Latex value='\Mu' flow='column'/>
<Latex value='\Nu' flow='column'/>
<Latex value='\Xi' flow='column'/>
<Latex value='\varXi' flow='column'/>
<Latex value='\Omicron' flow='column'/>
<Latex value='\Pi' flow='column'/>
<Latex value='\varPi' flow='column'/>
<Latex value='\Rho' flow='column'/>
<Latex value='\Sigma' flow='column'/>
<Latex value='\varSigma' flow='column'/>
<Latex value='\Tau' flow='column'/>
<Latex value='\Phi' flow='column'/>
<Latex value='\varPhi' flow='column'/>
<Latex value='\Upsilon' flow='column'/>
<Latex value='\varUpsilon' flow='column'/>
<Latex value='\Chi' flow='column'/>
<Latex value='\Psi' flow='column'/>
<Latex value='\varPsi' flow='column'/>
<Latex value='\Omega' flow='column'/>
<Latex value='\varOmega' flow='column'/>
</LatexCommands>


## Hebrew

<LatexCommands>
<Latex value='\aleph' flow='column'/>
<Latex value='\beth' flow='column'/>
<Latex value='\gimel' flow='column'/>
<Latex value='\daleth' flow='column'/>
</LatexCommands>

## Letterlike Symbols

<LatexCommands>
<Latex value='@' flow='column'/>
<Latex value='\mid' flow='column'/>
<Latex value='\top' flow='column'/>
<Latex value='\bot' flow='column'/>
<Latex value='\nabla' flow='column'/>
<Latex value='\partial' flow='column'/>
<Latex value='\ell' flow='column'/>
<Latex value='\hbar' flow='column'/>
<Latex value='\pounds' flow='column'/>
<Latex value='\euro' flow='column'/>
<Latex value='\And' flow='column'/>
<Latex value='\$' flow='column'/>
<Latex value='\%' flow='column'/>
<Latex value='\differencedelta' flow='column'/>
<Latex value='\wp' flow='column'/>
<Latex value='\hslash' flow='column'/>
<Latex value='\Finv' flow='column'/>
<Latex value='\Game' flow='column'/>
<Latex value='\eth' flow='column'/>
<Latex value='\mho' flow='column'/>
<Latex value='\Bbbk' flow='column'/>
<Latex value='\yen' flow='column'/>
<Latex value='\imath' flow='column'/>
<Latex value='\jmath' flow='column'/>
<Latex value='\degree' flow='column'/>
<Latex value='\Re' flow='column'/>
<Latex value='\Im' flow='column'/>
</LatexCommands>



## Delimiters

A delimiter, also called a **fence**, is a symbol used to group some symbols, for example parentheses, brackets, braces, etc...

To grow delimiters based on their content, use `\left...\right`.

<div className='no-line two-col'>

| Regular delimiters | `\left...\right` | 
| :---- | :---- |
| <span className='math'>$$\lbrace x \| \frac{x}{2} > 0\rbrace $$</span>  | <span className='math'>$$\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace $$</span> |
| `\lbrace x \| \frac{x}{2} > 0\rbrace` | `\left\lbrace x \middle\| \frac{x}{2} > 0\right\rbrace` |

</div>

The left and right delimiters do not have to match:

* \\(\displaystyle \left\lparen \frac1x \right\rbrack\\) `\left\lparen \frac1x \right\rbrack`


To omit a delimiter, use `.`:

* \\(\displaystyle \left\lparen \frac1x \right.\\) `\left\lparen \frac1x \right.`


---

The argument to `\left`, `\right` and `\middle` can be one of the 
following commands. 

<LatexCommands>
<Latex value='\lparen' flow='column'/>
<Latex value='\rparen' flow='column'/>
<Latex value='\lbrace' flow='column'/>
<Latex value='\rbrace' flow='column'/>
<Latex value='\langle' flow='column'/>
<Latex value='\rangle' flow='column'/>
<Latex value='\lfloor' flow='column'/>
<Latex value='\rfloor' flow='column'/>
<Latex value='\lceil' flow='column'/>
<Latex value='\rceil' flow='column'/>
<Latex value='\vert' flow='column'/>
<Latex value='\lvert' flow='column'/>
<Latex value='\rvert' flow='column'/>
<Latex value='\|' flow='column'/>
<Latex value='\Vert' flow='column'/>
<Latex value='\mVert' flow='column'/>
<Latex value='\lVert' flow='column'/>
<Latex value='\rVert' flow='column'/>
<Latex value='\lbrack' flow='column'/>
<Latex value='\rbrack' flow='column'/>
<Latex value='\{' flow='column'/>
<Latex value='\}' flow='column'/>
<Latex value='(' flow='column'/>
<Latex value=')' flow='column'/>
<Latex value='[' flow='column'/>
<Latex value=']' flow='column'/>
<Latex value='\ulcorner' flow='column'/>
<Latex value='\urcorner' flow='column'/>
<Latex value='\llcorner' flow='column'/>
<Latex value='\lrcorner' flow='column'/>
<Latex value='\lgroup' flow='column'/>
<Latex value='\rgroup' flow='column'/>
<Latex value='\lmoustache' flow='column'/>
<Latex value='\rmoustache' flow='column'/>
<Latex value='\mvert' flow='column'/>
</LatexCommands>

## Punctuation
<LatexCommands>
<Latex value='.' flow='column'/>
<Latex value='?' flow='column'/>
<Latex value='!' flow='column'/>
<Latex value=':' flow='column'/>
<Latex value='\Colon' flow='column'/>
<Latex value='\colon' flow='column'/>
<Latex value=',' flow='column'/>
<Latex value=';' flow='column'/>
<Latex value='"' flow='column'/>
</LatexCommands>

### Dots
<LatexCommands>
<Latex value='\cdotp' flow='column'/>
<Latex value='\ldotp' flow='column'/>
<Latex value='\vdots' flow='column'/>
<Latex value='\cdots' flow='column'/>
<Latex value='\ddots' flow='column'/>
<Latex value='\ldots' flow='column'/>
<Latex value='\mathellipsis' flow='column'/>
</LatexCommands>

## Shapes


<LatexCommands>
<Latex value='\square' flow='column'/>
<Latex value='\Box' flow='column'/>
<Latex value='\blacksquare' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\bigcirc' flow='column'/>
<Latex value='\circledS' flow='column'/>
<Latex value='\circledR' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\diamond' flow='column'/>
<Latex value='\Diamond' flow='column'/>
<Latex value='\lozenge' flow='column'/>
<Latex value='\blacklozenge' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\triangleleft' flow='column'/>
<Latex value='\triangleright' flow='column'/>
<Latex value='\triangle' flow='column'/>
<Latex value='\triangledown' flow='column'/>
</LatexCommands>

<LatexCommands>
<Latex value='\blacktriangleleft' flow='column'/>
<Latex value='\blacktriangleright' flow='column'/>
<Latex value='\blacktriangle' flow='column'/>
<Latex value='\blacktriangledown' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\vartriangle' flow='column'/>
<Latex value='\vartriangleleft' flow='column'/>
<Latex value='\vartriangleright' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\triangleq' flow='column'/>
<Latex value='\trianglelefteq' flow='column'/>
<Latex value='\trianglerighteq' flow='column'/>
<Latex value='\ntriangleleft' flow='column'/>
<Latex value='\ntriangleright' flow='column'/>
<Latex value='\ntrianglelefteq' flow='column'/>
<Latex value='\ntrianglerighteq' flow='column'/>
</LatexCommands>

<br/>

<LatexCommands>
<Latex value='\bigtriangleup' flow='column'/>
<Latex value='\bigtriangledown' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\dagger' flow='column'/>
<Latex value='\dag' flow='column'/>
<Latex value='\ddag' flow='column'/>
<Latex value='\ddagger' flow='column'/>
<Latex value='\maltese' flow='column'/>
</LatexCommands>


## St Mary's Road Symbols for Theoretical Computer Science

<LatexCommands>
<Latex value='\mapsfrom' flow='column'/>
<Latex value='\Mapsfrom' flow='column'/>
<Latex value='\MapsTo' flow='column'/>
<Latex value='\Yup' flow='column'/>
<Latex value='\lightning' flow='column'/>
<Latex value='\leftarrowtriangle' flow='column'/>
<Latex value='\rightarrowtriangle' flow='column'/>
<Latex value='\leftrightarrowtriangle' flow='column'/>
<Latex value='\boxdot' flow='column'/>
<Latex value='\bigtriangleup' flow='column'/>
<Latex value='\bigtriangledown' flow='column'/>
<Latex value='\boxbar' flow='column'/>
<Latex value='\Lbag' flow='column'/>
<Latex value='\Rbag' flow='column'/>
<Latex value='\llbracket' flow='column'/>
<Latex value='\rrbracket' flow='column'/>
<Latex value='\longmapsfrom' flow='column'/>
<Latex value='\Longmapsfrom' flow='column'/>
<Latex value='\Longmapsto' flow='column'/>
<Latex value='\boxslash' flow='column'/>
<Latex value='\boxbslash' flow='column'/>
<Latex value='\boxast' flow='column'/>
<Latex value='\boxcircle' flow='column'/>
<Latex value='\boxbox' flow='column'/>
<Latex value='\fatsemi' flow='column'/>
<Latex value='\leftslice' flow='column'/>
<Latex value='\rightslice' flow='column'/>
<Latex value='\interleave' flow='column'/>
<Latex value='\biginterleave' flow='column'/>
<Latex value='\sslash' flow='column'/>
<Latex value='\talloblong' flow='column'/>
</LatexCommands>


## Layout

These commands change the amount of space around a symbol: `\mathop{}`
treats its argument as if it was a large operator, `\mathrel{}` a 
relational operator, `\mathbin{}` a binary operator, `\mathopen{}` and `\mathclose{}` an opening and closing delimiter, respectively, `\mathpunct{}` a punctuation, `\mathinner{}` a fraction, and `\mathord{}` an ordinary symbol

<LatexCommands>
<Latex value='x\mathop{+}0+1' flow='column'/>
<Latex value='x=\mathbin{arg}=0' flow='column'/>
<Latex value='x=\mathrel{arg}=0' flow='column'/>
<Latex value='x=\mathopen{arg}=0' flow='column'/>
<Latex value='x=\mathclose{arg}=0' flow='column'/>
<Latex value='x=\mathpunct{arg}=0' flow='column'/>
<Latex value='x=\mathinner{arg}=0' flow='column'/>
<Latex value='x=\mathord{arg}=0' flow='column'/>
</LatexCommands>

---

<LatexCommands>
<Latex value='\overset{arg}{x=0}' flow='column'/>
<Latex value='\underset{arg}{x=0}' flow='column'/>
<Latex value='\overunderset{arg}{x=0}{y=1}' flow='column'/>
<Latex value='\stackrel{arg}{x=0}' flow='column'/>
<Latex value='\stackbin{arg}{x=0}' flow='column'/>
<Latex value='\rlap{/}0' flow='column'/>
<Latex value='o\llap{/}' flow='column'/>
<Latex value='o\mathllap{/}' flow='column'/>
<Latex value='\mathrlap{/}0' flow='column'/>
</LatexCommands>

## Spacing

<LatexCommands>
<Latex value='\unicode{"203A}\hspace{1em}\unicode{"2039}' source='\hspace' flow='column'/>
<Latex value='\unicode{"203A}\hspace*{1em}\unicode{"2039}' source='\hspace*' flow='column'/>
<Latex value='\unicode{"203A}\!\unicode{"2039}' source = '\!' flow='column'/>
<Latex value='\unicode{"203A}\,\unicode{"2039}' flow='column' source='\,'/>
<Latex value='\unicode{"203A}\:\unicode{"2039}' flow='column' source=':'/>
<Latex value='\unicode{"203A}\;\unicode{"2039}' flow='column' source=';'/>
<Latex value='\unicode{"203A}\enskip\unicode{"2039}' flow='column' source='\enskip'/>
<Latex value='\unicode{"203A}\enspace\unicode{"2039}' flow='column' source='\enspace'/>
<Latex value='\unicode{"203A}\quad\unicode{"2039}' flow='column' source='\quad'/>
<Latex value='\unicode{"203A}\qquad\unicode{"2039}' flow='column' source='\qquad'/>
</LatexCommands>


## Decorations


<LatexCommands>
<Latex value='\textcolor{blue}{x+1=0}' aside="Recommended over `\color`" flow='column'/>
<Latex value='{\color{blue} x+1=0}' flow='column'/>
<Latex value='\colorbox{yellow}{\[ax^2+bx+c\]}' aside="The argument is in Text Mode. Use \\[...\\] to switch to math mode" flow='column'/>
<Latex value='\fcolorbox{#cd0030}{#ffd400}{\unicode{"2B1A}}' flow='column'/>
<Latex value='\boxed{1+\frac{1}{x}}' flow='column'/>
<Latex value='\bbox[]{\unicode{"2B1A}}' aside="See MathJax BBox documentation" flow='column'/>
<Latex value='\rule[]{2em}{1em}' aside="The arguments are the width and height. The optional argument is an offset from the baseline." flow='column'/>
</LatexCommands>


### Notations

#### `\enclose`

The `\enclose` command is very flexible. It accepts three arguments, two of
which are required:

```latex
\enclose{<notation>}[<style>]{<body>}
```

- `<notation>` a list of whitespace-delimited values:


<LatexCommands>
<Latex value='\enclose{box}{x=0}' flow='column' source='box'/>
<Latex value='\enclose{roundedbox}{x=0}' flow='column' source='roundedbox'/>
<Latex value='\enclose{circle}{x=0}' flow='column' source='circle'/>
<Latex value='\enclose{top}{x=0}' flow='column' source='top'/>
<Latex value='\enclose{left}{x=0}' flow='column' source='left'/>
<Latex value='\enclose{bottom}{x=0}' flow='column' source='bottom'/>
<Latex value='\enclose{right}{x=0}' flow='column' source='right'/>
<Latex value='\enclose{horizontalstrike}{x=0}' flow='column' source='horizontalstrike'/>
<Latex value='\enclose{verticalstrike}{x=0}' flow='column' source='verticalstrike'/>
<Latex value='\enclose{updiagonalstrike}{x=0}' flow='column' source='updiagonalstrike'/>
<Latex value='\enclose{downdiagonalstrike}{x=0}' flow='column' source='downdiagonalstrike'/>
<Latex value='\enclose{updiagonalarrow}{x=0}' flow='column' source='updiagonalarrow'/>
<Latex value='\enclose{phasorangle}{x=0}' flow='column' source='phasorangle'/>
<Latex value='\enclose{radical}{x=0}' flow='column' source='radical'/>
<Latex value='\enclose{longdiv}{x=0}' flow='column' source='longdiv'/>
<Latex value='\enclose{actuarial}{x=0}' flow='column' source='actuarial'/>
<Latex value='\enclose{madruwb}{x=0}' flow='column' source='madruwb'/>
</LatexCommands>



They can be combined:

<Latex value='\enclose{roundedbox updiagonalstrike}{x=0}' source='\enclose{roundedbox updiagonalstrike}{x=0}'/>

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

:::info[Note]
`\enclose` is a LaTeX extension introduced by MathJax that follows the `<menclose>` definition of MathML.
:::

<Latex>{`
\\enclose{updiagonalstrike roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0}
`}</Latex>
<Latex>{`
\\enclose{circle}[mathbackground="#fbc0bd"]{\\frac1x}
`}</Latex>
<Latex>{`
\\enclose{roundedbox}[1px dotted #cd0030]{\\frac{x^2+y^2}{\\sqrt{x^2+y^2}}}
`}</Latex>

#### `\cancel`, `\bcancel` and `\xcancel`


<div className='thin-line two-col'>

| Command...       | is a shorthand for...                                 |
| :--------------- | :---------------------------------------------------- |
|<Latex value='\cancel{\unicode{"2B1A}}' flow='column' source='\cancel{body}'/>| `\enclose{updiagonalstrike}{body}`|
|<Latex value='\bcancel{\unicode{"2B1A}}' flow='column' source='\bcancel{body}'/> | `\enclose{downdiagonalstrike}{body}` |
| <Latex value='\xcancel{\unicode{"2B1A}}' flow='column' source='\xcancel{body}'/> | `\enclose{updiagonalstrike downdiagonalstrike}{body}` |

</div>


:::info[Note]
The `\cancel`, `\bcancel` and `\xcancel` commands are part of the
["cancel"](https://www.ctan.org/pkg/cancel) LaTeX package.
:::


### Shortcuts

Some commands are shortcuts for common notations:

<div className='thin-line two-col'>

| Command...       | is a shorthand for...                                 |
| :--------------- | :---------------------------------------------------- |
| <span className='math'>$$\angl{body} $$</span> `\angl{body}`  | `\enclose{actuarial}{body}`                    |
| <span className='math'>$$\angln $$</span> `\angln`  | `\enclose{actuarial}{n}`                    |
| <span className='math'>$$\anglr $$</span> `\anglr`  | `\enclose{actuarial}{r}`                    |
| <span className='math'>$$\anglk $$</span> `\anglk`  | `\enclose{actuarial}{k}`                    |

</div>


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

![](assets/colors.png)


:::info[Note]
These colors have been carefully selected for a balanced representation of the range of 
hues on the color circle, with similar lightness and intensity. They will map 
to  different color values than the `dvips` colors of the same name.
:::

:::info[Note]
To have proper legibility based on usage, these color names will map to 
different values when used as a foreground color
and a background color. To use a specific color value, use a RGB color instead.
:::


:::info[Note]
For best portability between versions of TeX, limit yourself to this subset of 
DVIPS colors: `White`, `Black`,
`Gray`, `Red`, `Orange`, `Yellow`, `LimeGreen`, `Green`, `TealBlue`, `Blue`,
`Violet`, `Purple`
and `Magenta`. Those names are case-sensitive.
:::



## Font Styling

<LatexCommands>
  <Latex value='\text{\selectfont}' source="\selectfont" flow="column" />
</LatexCommands>

---

### Bold

<LatexCommands>
  <Latex value='\text{\fontseries{b}Don Knuth}' source="\fontseries{b}" flow="column" />
</LatexCommands>

<LatexCommands>
  <Latex value='\boldsymbol{Don Knuth}' source="\boldsymbol{}" flow="column" />
  <Latex value='\text{\bfseries Don Knuth}' source="{\bfseries}" flow="column" />
  <Latex value='\text{\mdseries Don Knuth}' source="{\mdseries}" flow="column" />
  <Latex value='\bm{ABCabc}' source="\bm{}" flow="column" />
  <Latex value='\bold{ABCabc}' source="\bold{}" flow="column" />
  <Latex value='\textbf{Don Knuth}' source="\textbf{}" flow="column" />
  <Latex value='\textmd{Don Knuth}' source="\textmd{}" flow="column" />
  <Latex value='\mathbf{ABCabc}' source="\mathbf{}" flow="column" />
  <Latex value='\mathbfit{ABCabc}' source="\mathbfit{}" flow="column" />
</LatexCommands>

### Italic
<LatexCommands>
  <Latex value='\text{\upshape Don Knuth}' source="\upshape" flow="column" />
  <Latex value='\text{\slshape Don Knuth}' source="\slshape" flow="column" />
</LatexCommands>

<LatexCommands>
  <Latex value='\textup{Don Knuth}' source="\textup{}" aside="upright" flow="column" />
  <Latex value='\textsl{Don Knuth}' source="\textsl{}" aside="slanted" flow="column" />
  <Latex value='\textit{Don Knuth}' source="\textit{}" aside="italic" flow="column" />
  <Latex value='\mathit{Don Knuth}' source="\mathit{}" aside="math italic" flow="column" />
</LatexCommands>

### Font Family

#### Typewriter / Monospace

<LatexCommands>
  <Latex value='\text{\fontfamily{cmtt}Don Knuth}' source="\fontfamily{}" flow="column" />
  <Latex value='\texttt{Don Knuth}' source="\texttt{}" flow="column" />
  <Latex value='\mathtt{ABCabc}' source="\mathtt{}" flow="column" />
  <Latex value='${\ttfamily ABCabc}' source="\ttfamily" flow="column" />
</LatexCommands>

#### Sans-Serif
<LatexCommands>
  <Latex value='\textsf{Don Knuth}' source="\textsf{}" flow="column" />
  <Latex value='\mathsf{ABCabc}' source="\mathsf{}" flow="column" />
  <Latex value='{\sffamily ABCabc}' source="\sffamily" flow="column" />
</LatexCommands>

#### Math Variants
<LatexCommands>
  <Latex value='\mathfrak{ABCdef}' source="\mathfrak{ABCdef}" aside="Fraktur" flow="column" />
  <Latex value='\mathcal{ABC}' source="\mathcal{ABCdef}" aside="Caligraphic" flow="column" />
  <Latex value='\mathscr{ABCdef}' source="\mathscr{ABCdef}" aside="Script" flow="column" />
  <Latex value='\mathbb{ABCabc}' source="\mathbb{}" aside="Blackboard" flow="column" />
  <Latex value='\Bbb{ABCdef}' source="\Bbb{}" flow="column" />
  <Latex value='${\frak ABC}' source="{\frak}" flow="column" />
  <Latex value='\text{\rmfamily ABCabc}' source="\text{\rmfamily}" flow="column" />
</LatexCommands>

### MathJax HTML Extension

Mathfields support some commands from the [MathJax HTML extension](http://docs.mathjax.org/en/latest/input/tex/extensions/html.html).

#### `\class`

<Latex value="\class{custom-CSS-class}{x+1}"/>

When used in a `<math-field>` component, the class names should refer to a 
stylesheet defined with a `<style>` tag inside the `<math-field>` element.

```html
<math-field>
  <style>
    #custom-CSS-class { 
      box-shadow: 0 0 10px #000; border-radius: 8px; padding: 8px;
    }
  </style>

  \class{custom-CSS-class}{\frac{1}{x+1}}

</math-field>
```

#### `\cssId`

Apply an element ID to the expression. The element can then be styled using CSS.

<style>{`
  #custom-CSS-class { box-shadow: 0 0 4px #999; border-radius: 8px; padding: 8px;}
`}</style>

```css
#custom-CSS-class { 
  box-shadow: 0 0 4px #999; 
  border-radius: 8px; 
  padding: 8px;
}
```

<Latex value="\cssId{custom-CSS-class}{\text{Don Knuth}}"/>


#### `\htmlData`

The argument of this command is a comma-delimited list of key/value pairs, e.g. 
`\htmlData{foo=green,bar=blue}{x=0}`. A corresponding
  `foo` and `bar` DOM attributes are attached to the rendered DOM element.

<Latex value="\htmlData{foo=green,bar=blue}{ \text{Don Knuth} }"/>
 

### Other Extensions

#### `\error`

The argument of this command is a string that will be rendered with a red
background and a red underline.

<Latex value="\text{Don \error{\text{Knuht}}}"/>

#### `\texttip`

The first argument is a math expression to display, the second argument is the text to
display on hover.

<Latex value="\texttip{e^{i\pi}-1=0}{The most beautiful equation}"/>

#### `\mathtip`

The first argument is a math expression to display, the second argument is the 
a math expression to display on hover.

<Latex value="\mathtip{e^{i\pi}}{-1}"/>


### Others

<LatexCommands>
  <Latex value='\text{\fontshape{sc}Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='{\scshape Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='\textsc{Don Knuth}' aside="Small Caps" flow="column" />
  <Latex value='\textrm{Don Knuth}' aside="Roman" flow="column" />
  <Latex value='\mathrm{Don Knuth}' aside="Roman" flow="column" />
  <Latex value='\text{Don {\em Knuth}}' aside="Emphasis" flow="column" />
  <Latex value='\text{Don \emph{Knuth}}' aside="Emphasis" flow="column" />
</LatexCommands>

:::warning[Deprecated]

The following commands are supported for compatibility with existing content,
but their use is generally discouraged when creating new LaTeX content


<Latex value='{\bf Don Knuth}' aside="Use `\textbf{}` or `\bfseries` instead" flow="column" />
<Latex value='{\it Don Knuth}' aside="Use `\textit{}` or `\itshape` instead" flow="column" />

:::




## Sizing

In LaTeX using the sizing commands below may not always achieve the expected 
result. In mathfields, the sizing commands are applied consistently to text 
and math mode.

These size are relative to the `font-size` property of the mathfield.

  <Latex value='\tiny{e^{i\pi}+1=0}' />
  <Latex value='\scriptsize{e^{i\pi}+1=0}' />
  <Latex value='\footnotesize{e^{i\pi}+1=0}' />
  <Latex value='\small{e^{i\pi}+1=0}' />
  <Latex value='\normalsize{e^{i\pi}+1=0}' />
  <Latex value='\large{e^{i\pi}+1=0}' />
  <Latex value='\Large{e^{i\pi}+1=0}'  />
  <Latex value='\LARGE{e^{i\pi}+1=0}' />
  <Latex value='\huge{e^{i\pi}+1=0}'  />
  <Latex value='\Huge{e^{i\pi}+1=0}'  />

The size of delimiters can be controlled manually with the commands below. The `\left...\right...` commands calculate automatically the size of the
delimiters based on the content.

:::warning
**The command must be followed by a delimiter**, for example `(` or `\lbrace` or `\lbrack`. If the command is used on its own, nothing is displayed.
:::


  <Latex value='\bigl( \bigm\| \bigr)' />
  <Latex value='\Bigl( \Bigm\| \Bigr)' />
  <Latex value='\biggl( \biggm\| \biggr)' />
  <Latex value='\Biggl( \Biggm\| \Biggr)' />






## Various


<LatexCommands>
  <Latex value='\infty ' flow="column"/>
  <Latex value='\prime ' flow="column"/>
  <Latex value='\doubleprime ' flow="column"/>
  <Latex value='/ ' flow="column"/>
  <Latex value='\/ ' flow="column"/>
  <Latex value='| ' flow="column"/>
  <Latex value='\backslash ' flow="column"/>
  <Latex value='\diagup ' flow="column"/>
  <Latex value='\sharp ' flow="column"/>
  <Latex value='\flat ' flow="column"/>
  <Latex value='\natural ' flow="column"/>
  <Latex value='\# ' flow="column"/>
  <Latex value='\& ' flow="column"/>
  <Latex value='\clubsuit ' flow="column"/>
  <Latex value='\heartsuit ' flow="column"/>
  <Latex value='\spadesuit ' flow="column"/>
  <Latex value='\diamondsuit ' flow="column"/>
  <Latex value='\angle ' flow="column"/>
  <Latex value='\_ ' flow="column"/>
  <Latex value='\checkmark ' flow="column"/>
  <Latex value='\measuredangle ' flow="column"/>
  <Latex value='\sphericalangle ' flow="column"/>
  <Latex value='\backprime ' flow="column"/>
  <Latex value='\backdoubleprime ' flow="column"/>
  <Latex value='\originalof ' flow="column"/>
  <Latex value='\laplace ' flow="column"/>
  <Latex value='\imageof ' flow="column"/>
  <Latex value='\Laplace ' flow="column"/>
  <Latex value='− ' flow="column"/>
  <Latex value='` ' flow="column"/>
  <Latex value='~ ' flow="column"/>
  <Latex value='\space ' flow="column"/>
</LatexCommands>


<LatexCommands>
  <Latex value='\smash[]{}' flow="column"/>
  <Latex value='\vphantom{}' flow="column"/>
  <Latex value='\hphantom{}' flow="column"/>
  <Latex value='\phantom{}' flow="column"/>
</LatexCommands>

## MediaWiki (`texvc.sty` package)

Mathfields support the commands used by [MediaWiki](https://en.wikipedia.org/wiki/Help:Displaying_a_formula) pages, except for the deprecated ones.


<LatexCommands>
  <Latex value='\darr' flow="column"/>
  <Latex value='\dArr' flow="column"/>
  <Latex value='\Darr' flow="column"/>
  <Latex value='\lang' flow="column"/>
  <Latex value='\rang' flow="column"/>
  <Latex value='\uarr' flow="column"/>
  <Latex value='\uArr' flow="column"/>
  <Latex value='\Uarr' flow="column"/>
  <Latex value='\N' flow="column"/>
  <Latex value='\R' flow="column"/>
  <Latex value='\Z' flow="column"/>
  <Latex value='\alef' flow="column"/>
  <Latex value='\alefsym' flow="column"/>
  <Latex value='\Alpha' flow="column"/>
  <Latex value='\Beta' flow="column"/>
  <Latex value='\bull' flow="column"/>
  <Latex value='\Chi' flow="column"/>
  <Latex value='\clubs' flow="column"/>
  <Latex value='\cnums' flow="column"/>
  <Latex value='\Complex' flow="column"/>
  <Latex value='\Dagger' flow="column"/>
  <Latex value='\diamonds' flow="column"/>
  <Latex value='\empty' flow="column"/>
  <Latex value='\Epsilon' flow="column"/>
  <Latex value='\Eta' flow="column"/>
  <Latex value='\exist' flow="column"/>
  <Latex value='\harr' flow="column"/>
  <Latex value='\hArr' flow="column"/>
  <Latex value='\Harr' flow="column"/>
  <Latex value='\hearts' flow="column"/>
  <Latex value='\image' flow="column"/>
  <Latex value='\infin' flow="column"/>
  <Latex value='\Iota' flow="column"/>
  <Latex value='\isin' flow="column"/>
  <Latex value='\Kappa' flow="column"/>
  <Latex value='\larr' flow="column"/>
  <Latex value='\lArr' flow="column"/>
  <Latex value='\Larr' flow="column"/>
  <Latex value='\lrarr' flow="column"/>
  <Latex value='\lrArr' flow="column"/>
  <Latex value='\Lrarr' flow="column"/>
  <Latex value='\Mu' flow="column"/>
  <Latex value='\natnums' flow="column"/>
  <Latex value='\Nu' flow="column"/>
  <Latex value='\Omicron' flow="column"/>
  <Latex value='\plusmn' flow="column"/>
  <Latex value='\rarr' flow="column"/>
  <Latex value='\rArr' flow="column"/>
  <Latex value='\Rarr' flow="column"/>
  <Latex value='\real' flow="column"/>
  <Latex value='\reals' flow="column"/>
  <Latex value='\Reals' flow="column"/>
  <Latex value='\Rho' flow="column"/>
  <Latex value='\sdot' flow="column"/>
  <Latex value='\sect' flow="column"/>
  <Latex value='\spades' flow="column"/>
  <Latex value='\sub' flow="column"/>
  <Latex value='\sube' flow="column"/>
  <Latex value='\supe' flow="column"/>
  <Latex value='\Tau' flow="column"/>
  <Latex value='\thetasym' flow="column"/>
  <Latex value='\weierp' flow="column"/>
  <Latex value='\Zeta' flow="column"/>
</LatexCommands>

## Physics


### Braket Notation 

Mathfields support the commands of the [`braket` package](https://ctan.org/pkg/braket)

<LatexCommands>
  <Latex value='\bra{\Psi}' flow="column"/>
  <Latex value='\ket{\Psi}' flow="column"/>
  <Latex value='\braket{ab}' flow="column"/>
  <Latex value='\Bra{ab}' flow="column"/>
  <Latex value='\Ket{ab}' flow="column"/>
  <Latex value='\Braket{ab}' flow="column"/>
</LatexCommands>


## Chemistry (`mhchem` package)

Mathfields support the commands of the [`mhchem` package](https://mhchem.github.io/MathJax-mhchem/).


### Chemical Formulas
<LatexCommands>
  <Latex value='\ce{H2O}' />
  <Latex value='\ce{Sb2O3}' />
</LatexCommands>


### Charges
<LatexCommands>
  <Latex value='\ce{[AgCl2]-}' flow="column"/>
  <Latex value='\ce{Y^99+}' flow="column"/>
  <Latex value='\ce{Y^{99+}}' flow="column"/>
  <Latex value='\ce{H+}' flow="column"/>
  <Latex value='\ce{CrO4^2-}' flow="column"/>
</LatexCommands>

### Stoichiometric numbers
<LatexCommands>
  <Latex value='\ce{2 H2O}' flow="column"/>
  <Latex value='\ce{2H2O}' flow="column"/>
  <Latex value='\ce{0.5 H2O}' flow="column"/>
  <Latex value='\ce{1/2 H2O}' flow="column"/>
  <Latex value='\ce{(1/2) H2O}' flow="column"/>
  <Latex value='\ce{$n$ H2O}' flow="column"/>
</LatexCommands>


### Isotopes

<LatexCommands>
  <Latex value="\ce{^{227}_{90}Th+}" flow="column"/>
  <Latex value="\ce{^227_90Th+}" flow="column"/>
  <Latex value="\ce{^{0}_{-1}n^{-}}" flow="column"/>
  <Latex value="\ce{^0_-1n-}" flow="column"/>
  <Latex value="\ce{H{}^3HO}" flow="column"/>
  <Latex value="\ce{H^3HO}" flow="column"/>
</LatexCommands>


### Complex Examples

<Latex value="\ce{CO2 + C -> 2 CO}"/>
<Latex value="\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}"/>
<Latex value="\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}"/>
<Latex value="\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}"/>


## Macros

<LatexCommands>
  <Latex value='\iff' flow="column"/>
  <Latex value='\set{ab}' flow="column"/>
  <Latex value='\rd' flow="column"/>
  <Latex value='\rD' flow="column"/>
  <Latex value='\scriptCapitalE' flow="column"/>
  <Latex value='\scriptCapitalH' flow="column"/>
  <Latex value='\scriptCapitalL' flow="column"/>
  <Latex value='\gothicCapitalC' flow="column"/>
  <Latex value='\gothicCapitalH' flow="column"/>
  <Latex value='\gothicCapitalI' flow="column"/>
  <Latex value='\gothicCapitalR' flow="column"/>
  <Latex value='\imaginaryI' flow="column"/>
  <Latex value='\imaginaryJ' flow="column"/>
  <Latex value='\exponentialE' flow="column"/>
  <Latex value='\differentialD' flow="column"/>
  <Latex value='\capitalDifferentialD' flow="column"/>
</LatexCommands>


<Latex value="\Set{ x\in\mathbf{R}^2 \;\middle|\; 0<{|x|}<5 }"/>


## Environments / Matrixes

Environments are used to typeset a set of related items, for example cells
in a matrix, or multi-line equations.

Each row in a tabular environment is separated by a `\\` command.

Each column is separated by a `&`.


### Matrixes

#### `array`

A simple table with no delimiters. 


<Latex>{`
\\begin{array}{lc}
  a + 1 & b  + 1 \\\\
  c & \\frac{1}{d}
\\end{array}
`}</Latex>

The `{lc}` argument specifies how many columns there are and how they should be 
formated:
  * `l`: left-aligned
  * `c`: centered
  * `r`: right-aligned

**To add a vertical line separating columns**, add a `|` character in the column format:

<Latex>{`
\\begin{array}{l|c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>

**To add a double vertical line separating columns**, add two `|` characters in the 
column format:

<Latex>{`
\\begin{array}{l||c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>

**To add a dashed vertical line between two columns**, use `:`:


<Latex>{`
\\begin{array}{l:c}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{array}
`}</Latex>


#### `matrix`

The `matrix` environment is very similar to `array`, but it does not have an
argument to specify the format of the columns.

<Latex flow="column">{`
\\begin{matrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{matrix}
`}</Latex>

**To specify the format of the columns**, use the starred version and an optional
argument. This applies to all the other `matrix` environments.

<Latex flow="column">{`
\\begin{matrix*}[l|r]
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{matrix}
`}</Latex>

#### `pmatrix`

A matrix with **parentheses** as delimiters.

<Latex flow="column">{`
\\begin{pmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{pmatrix}
`}</Latex>

#### `bmatrix`

A matrix with **square brackets** as delimiters.

<Latex flow="column">{`
\\begin{bmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{bmatrix}
`}</Latex>

#### `Bmatrix`

A matrix with **braces** (curly brackets) as delimiters.
<Latex flow="column">{`
\\begin{Bmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{Bmatrix}
`}</Latex>

#### `vmatrix`

A matrix with **single bars** as delimiters.
<Latex flow="column">{`
\\begin{vmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{vmatrix}
`}</Latex>

#### `Vmatrix`

A matrix with **double bars** as delimiters.
<Latex flow="column">{`
\\begin{Vmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{Vmatrix}
`}</Latex>

#### `smallmatrix`

A matrix typeset in a way that may be suitable on the same line as text.

<Latex flow="column">{`
\\begin{smallmatrix}
  a + 1   &   b  + 1 \\\\
  c       &   \\frac{1}{d}
\\end{smallmatrix}
`}</Latex>

### Other Environments

#### `cases`, `dcases` and `rcases`

Use these environments to write piecewise functions:

<Latex flow="column">{`
f(n) = \\begin{cases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{cases}
`}</Latex>

**To typeset the content in Display style**, use `dcases` instead:

<Latex flow="column">{`
f(n) = \\begin{dcases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{dcases}
`}</Latex>

**To display the brace on the right**, use `rcases`.
<Latex flow="column">{`
f(n) = \\begin{rcases}
  1 & \\text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \\text{if } n \\ge 2
\\end{rcases}
`}</Latex>


#### `gather`

Consecutive equations without alignment

<Latex flow="column">{`
\\begin{gather}
  3(a-x) = 3.5x + a - 1 \\\\
  3a - 3x = 3.5x + a - 1 \\\\
  a = \\frac{13}{4} , x - \\frac{1}{2}
\\end{gather}
`}</Latex>

#### `multline`

The first line is left aligned, the last line is right aligned, and all the
intermediate lines are centered.

<Latex flow="column">{`
\\begin{multline}
  3(a-x) = 3.5x + a - 1 \\\\
  3a - 3x = 3.5x + a - 1 \\\\
  a = \\frac{13}{4}x - \\frac{1}{2}
\\end{multline}
`}</Latex>


#### `align`
<Latex flow="column">{`
\\begin{align}
  f(x)  & = (a+b)^2 \\\\
        & = a^2+2ab+b^2 \\\\
\\end{align}
`}</Latex>

#### Others
<Latex flow="column">{`
\\begin{math}
  x+\\frac12
\\end{math}
`}</Latex>


<Latex flow="column">{`
\\begin{displaymath}
  x+\\frac12
\\end{displaymath}
`}</Latex>

<Latex flow="column">{`
\\begin{equation}
  x+\\frac12
\\end{equation}
`}</Latex>


<Latex flow="column">{`
\\begin{subequations}
  x+\\frac12
\\end{subequations}
`}</Latex>


<Latex flow="column">{`
\\begin{eqnarray}
  x+\\frac12
\\end{eqnarray}
`}</Latex>


 Avoid `center`, use `align` instead.

<Latex flow="column">{`
\\begin{center}
  \\text{first}
\\end{center}
`}</Latex>

The following environments do not form a math environment by themselves but 
can be used as building blocks for more elaborate structures: 

<Latex flow="column">{`
\\begin{gathered}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{gathered}
`}</Latex>

<Latex flow="column">{`
\\begin{split}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{split}
`}</Latex>

<Latex flow="column">{`
\\begin{aligned}3(a-x) = 3.5x + a - 1 \\\\
    3a - 3x = 3.5x + a - 1 \\\\
    a = \\frac{13}{4}x - \\frac{1}{2}
\\end{aligned}
`}</Latex>

## TeX Registers

The math typesetting is influenced by some "constants" that are stored 
in "registers". Those registers can be set globally on a mathfield using 
the `mf.registers` property.

<div className="symbols-table first-column-header" style={{"--first-col-width":"18ch"}}>

| Register | Purpose |
| :--- |  :--- |
| `arrayrulewidth` | Width of separator lines in array environments |
| `arraycolsep` | Amount of space between separator lines |
| `arraystretch` | Stretch factor between rows in an environment |
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

<div className="symbols-table first-column-header" style={{"--first-col-width":"14ch"}}>

| Command |  |
| :--- |  :--- |
| `%`  | Anything after a `%` character and an end of line character is interpreted as a comment and ignored|
| `\limits` <br/> `\nolimits` |  | 
| `\relax` | | 
| `\noexpand` | | 
| `\obeyspaces` | In Math Mode, spaces are normally ignored. Using this command spaces will be preserved even in Math Mode. |
| `\bgroup` <br/> `\egroup` | Begin/End group, synonym for open/close brace |
| `\string` | | 
| `\csname` <br/> `\endcsname` | Turn the next tokens, until `\endcsname`, into a command | 
| `\ensuremath{}` | If in Math Mode, does nothing. Otherwise, switch to Math Mode. |

</div>