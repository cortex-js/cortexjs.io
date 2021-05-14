---
layout: single
date: Last Modified
title: MathLive Reference - Commands
permalink: /mathlive/reference/commands/
read_time: false
sidebar:
    - nav: "mathlive"
---
<script type='module'>
    import {renderMathInDocument} from '//unpkg.com/mathlive/dist/mathlive.min.mjs';
    renderMathInDocument({ 
      renderAccessibleContent: false,
      TeX: { 
        delimiters: { display: [ ['$$', '$$'] ] },
        processEnvironments : false 
      },
      asciiMath: null,
    });
    document.body.classList.add('ready');
</script>

<style>
  ul.command-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  ul.command-list,
  .command-list li {
    margin: 0;
    padding: 10px;
    list-style: none;
  }
  .math {
    display: none;
  }
  body.ready .math {
    display: inline;
  }
  
</style>

To find the name of a LaTeX command if you can draw the shape you are looking 
for, use [Detexify](http://detexify.kirelabs.org/classify.html).

## Fractions and Binomials

* <span class='math'>$$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$</span> `\frac{}{}`
* <span class='math'>$$\dfrac{\unicode{"2B1A}}{\unicode{"2B1A}}$$</span> `\dfrac{}{}`
* <span class='math'>$$\tfrac{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\tfrac{}{}`
{.command-list}

The `\dfrac` command typesets its content in Display style even when it is in a context
that would normally use a different style, such as in a superscript.

The `\tfrac` command uses Text style (inline) even in a context that would  normally use Display style.

* <span class='math'>$$\cfrac{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\cfrac{}{}`
* <span class='math'>$$\binom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\binom{}{}`
* <span class='math'>$$\dbinom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\dbinom{}{}`
* <span class='math'>$$\tbinom{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\tbinom{}{}`
* <span class='math'>$$\pdiff{\unicode{"2B1A}}{\unicode{"2B1A}} $$</span> `\pdiff{}{}`
{.command-list}

The following commands are supported but their usage is generally discouraged
when creating modern LaTeX content.

* <span class='math'>$${\unicode{"2B1A} \overwithdelims{\lbrace}{\rbrace} \unicode{"2B1A}} $$</span> `\overwithdelims{\lbrace}{\rbrace}`
* <span class='math'>$${\unicode{"2B1A} \atopwithdelims{\lbrace}{\rbrace} \unicode{"2B1A}} $$</span> `\atopwithdelims{\lbrace}{\rbrace}`
* <span class='math'>$$\unicode{"2B1A} \over \unicode{"2B1A} $$</span> `\over `
* <span class='math'>$$\unicode{"2B1A} \atop \unicode{"2B1A} $$</span> `\atop `
* <span class='math'>$$\unicode{"2B1A} \choose \unicode{"2B1A} $$</span> `\choose `
{.command-list}


## Operators

* <span class='math'>$$+ $$</span>   `+`
* <span class='math'>$$- $$</span>   `-`
* <span class='math'>$$\pm $$</span>   `\pm`
* <span class='math'>$$\mp $$</span>   `\mp`
* <span class='math'>$$* $$</span>   `*`
* <span class='math'>$$\times $$</span>   `\times`
* <span class='math'>$$\div $$</span>   `\div`
* <span class='math'>$$\divides $$</span>   `\divides`
* <span class='math'>$$\cdot $$</span>   `\cdot`
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
* <span class='math'>$$\centerdot $$</span>   `\centerdot`
{.command-list}

## Functions

* <span class='math'>$$\deg $$</span> `\deg`
* <span class='math'>$$\dim $$</span> `\dim`
* <span class='math'>$$\exp $$</span> `\exp`
* <span class='math'>$$\hom $$</span> `\hom`
* <span class='math'>$$\ker $$</span> `\ker`
* <span class='math'>$$\ln $$</span> `\ln`
* <span class='math'>$$\log $$</span> `\log`
* <span class='math'>$$\lim $$</span> `\lim`
* <span class='math'>$$\det $$</span> `\det`
* <span class='math'>$$\max $$</span> `\max`
* <span class='math'>$$\min $$</span> `\min`
{.command-list}


### Modulo

* <span class='math'>$$n \pmod{3} $$</span> `n \pmod{3}`
* <span class='math'>$$n \mod{3} $$</span> `n \mod{3}`
* <span class='math'>$$n \bmod 3 $$</span> `n \bmod 3`


### Trigonometry

* <span class='math'>$$\arccos $$</span> `\arccos`
* <span class='math'>$$\arcsin $$</span> `\arcsin`
* <span class='math'>$$\arctan $$</span> `\arctan`
* <span class='math'>$$\arctg $$</span> `\arctg`
* <span class='math'>$$\arcctg $$</span> `\arcctg`
* <span class='math'>$$\arg $$</span> `\arg`
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


## Unicode

* `\unicode{}` - The argument is a Unicode codepoint expressed as a number. To use a hexadecimal number, start the argument with `x` or `"` and use uppercase `A`-`F` for hexadecimal digits.
  * <span class='math'>$$\unicode{10775} $$</span> `\unicode{10775}` 
  * <span class='math'>$$\unicode{"2A17} $$</span> `\unicode{"2A17}` 
  * <span class='math'>$$\unicode{x2A17} $$</span> `\unicode{x2A17}`
* `\char` - The argument is also Unicode codepoint, but the `{`...`}` delimiters are optional when using `"`
  * <span class='math'>$$\char"2A17 $$</span> `\char"2A17`  
* `^^` and `^^^^` - Followed by 2 or 4 hexadecimal digits with **lowercase** `a`-`f` to specify a Unicode codepoint
  * <span class='math'>$$^^4a $$</span> `^^4a`
  * <span class='math'>$$^^^^2a17 $$</span> `^^^^2a17`



## Extensible Operators

* <span class='math'>$$\sum $$</span> `\sum`
* <span class='math'>$$\prod $$</span> `\prod`
* <span class='math'>$$\bigcup $$</span> `\bigcup`
* <span class='math'>$$\bigcap $$</span> `\bigcap`
* <span class='math'>$$\coprod $$</span> `\coprod`
* <span class='math'>$$\bigvee $$</span> `\bigvee`
* <span class='math'>$$\bigwedge $$</span> `\bigwedge`
* <span class='math'>$$\biguplus $$</span> `\biguplus`
* <span class='math'>$$\bigotimes $$</span> `\bigotimes`
* <span class='math'>$$\bigoplus $$</span> `\bigoplus`
* <span class='math'>$$\bigodot $$</span> `\bigodot`
* <span class='math'>$$\bigsqcup $$</span> `\bigsqcup`
* <span class='math'>$$\smallint $$</span> `\smallint`
* <span class='math'>$$\intop $$</span> `\intop`
* <span class='math'>$$\int $$</span> `\int`
* <span class='math'>$$\iint $$</span> `\iint`
* <span class='math'>$$\iiint $$</span> `\iiint`
* <span class='math'>$$\oint $$</span> `\oint`
* <span class='math'>$$\oiint $$</span> `\oiint`
* <span class='math'>$$\oiiint $$</span> `\oiiint`
* <span class='math'>$$\intclockwise $$</span> `\intclockwise`
* <span class='math'>$$\varointclockwise $$</span> `\varointclockwise`
* <span class='math'>$$\ointctrclockwise $$</span> `\ointctrclockwise`
* <span class='math'>$$\intctrclockwise $$</span> `\intctrclockwise`
* <span class='math'>$$\sqcup $$</span> `\sqcup`
* <span class='math'>$$\sqcap $$</span> `\sqcap`
* <span class='math'>$$\uplus $$</span> `\uplus`
* <span class='math'>$$\wr $$</span> `\wr`
* <span class='math'>$$\amalg $$</span> `\amalg`
* <span class='math'>$$\Cap $$</span> `\Cap`
* <span class='math'>$$\Cup $$</span> `\Cup`
* <span class='math'>$$\doublecap $$</span> `\doublecap`
* <span class='math'>$$\doublecup $$</span> `\doublecup`
{.command-list}


## Logic

* <span class='math'>$$\forall $$</span>   `\forall`
* <span class='math'>$$\exists $$</span>   `\exists`
* <span class='math'>$$\nexists $$</span>   `\nexists`
* <span class='math'>$$\to $$</span>   `\to`
* <span class='math'>$$\gets $$</span>   `\gets`
* <span class='math'>$$\implies $$</span>   `\implies`
* <span class='math'>$$\impliedby $$</span>   `\impliedby`
* <span class='math'>$$\biconditional $$</span>   `\biconditional`
* <span class='math'>$$\therefore $$</span>   `\therefore`
* <span class='math'>$$\because $$</span>   `\because`
* <span class='math'>$$\land $$</span>   `\land`
* <span class='math'>$$\wedge $$</span>   `\wedge`
* <span class='math'>$$\lor $$</span>   `\lor`
* <span class='math'>$$\vee $$</span>   `\vee`
* <span class='math'>$$\barwedge $$</span>   `\barwedge`
* <span class='math'>$$\veebar $$</span>   `\veebar`
* <span class='math'>$$\nor $$</span>   `\nor`
* <span class='math'>$$\curlywedge $$</span>   `\curlywedge`
* <span class='math'>$$\curlyvee $$</span>   `\curlyvee`
* <span class='math'>$$\leftrightarrow $$</span>   `\leftrightarrow`
* <span class='math'>$$\Leftrightarrow $$</span>   `\Leftrightarrow`
* <span class='math'>$$\models $$</span>   `\models`
* <span class='math'>$$\vdash $$</span>   `\vdash`
* <span class='math'>$$\dashv $$</span>   `\dashv`
* <span class='math'>$$\roundimplies $$</span>   `\roundimplies`
* <span class='math'>$$\lnot $$</span>   `\lnot`
* <span class='math'>$$\neg $$</span>   `\neg`
{.command-list}

## Arrows

* <span class='math'>$$\rightarrow $$</span>   `\rightarrow`
* <span class='math'>$$\leftarrow $$</span>   `\leftarrow`
* <span class='math'>$$\Rightarrow $$</span>   `\Rightarrow`
* <span class='math'>$$\Leftarrow $$</span>   `\Leftarrow`
* <span class='math'>$$\longrightarrow $$</span>   `\longrightarrow`
* <span class='math'>$$\longleftarrow $$</span>   `\longleftarrow`
* <span class='math'>$$\Longrightarrow $$</span>   `\Longrightarrow`
* <span class='math'>$$\Longleftarrow $$</span>   `\Longleftarrow`
* <span class='math'>$$\longleftrightarrow $$</span>   `\longleftrightarrow`
* <span class='math'>$$\Longleftrightarrow $$</span>   `\Longleftrightarrow`
* <span class='math'>$$\mapsto $$</span>   `\mapsto`
* <span class='math'>$$\longmapsto $$</span>   `\longmapsto`
* <span class='math'>$$\uparrow $$</span>   `\uparrow`
* <span class='math'>$$\downarrow $$</span>   `\downarrow`
* <span class='math'>$$\Uparrow $$</span>   `\Uparrow`
* <span class='math'>$$\Downarrow $$</span>   `\Downarrow`
* <span class='math'>$$\updownarrow $$</span>   `\updownarrow`
* <span class='math'>$$\Updownarrow $$</span>   `\Updownarrow`
* <span class='math'>$$\hookrightarrow $$</span>   `\hookrightarrow`
* <span class='math'>$$\hookleftarrow $$</span>   `\hookleftarrow`
* <span class='math'>$$\rightharpoonup $$</span>   `\rightharpoonup`
* <span class='math'>$$\leftharpoonup $$</span>   `\leftharpoonup`
* <span class='math'>$$\rightharpoondown $$</span>   `\rightharpoondown`
* <span class='math'>$$\leftharpoondown $$</span>   `\leftharpoondown`
* <span class='math'>$$\searrow $$</span>   `\searrow`
* <span class='math'>$$\nearrow $$</span>   `\nearrow`
* <span class='math'>$$\swarrow $$</span>   `\swarrow`
* <span class='math'>$$\nwarrow $$</span>   `\nwarrow`
* <span class='math'>$$\dashrightarrow $$</span>   `\dashrightarrow`
* <span class='math'>$$\dashleftarrow $$</span>   `\dashleftarrow`
* <span class='math'>$$\Rrightarrow $$</span>   `\Rrightarrow`
* <span class='math'>$$\Lleftarrow $$</span>   `\Lleftarrow`
* <span class='math'>$$\leftrightarrows $$</span>   `\leftrightarrows`
* <span class='math'>$$\rightleftarrows $$</span>   `\rightleftarrows`
* <span class='math'>$$\curvearrowright $$</span>   `\curvearrowright`
* <span class='math'>$$\curvearrowleft $$</span>   `\curvearrowleft`
* <span class='math'>$$\rightrightarrows $$</span>   `\rightrightarrows`
* <span class='math'>$$\leftleftarrows $$</span>   `\leftleftarrows`
* <span class='math'>$$\upuparrows $$</span>   `\upuparrows`
* <span class='math'>$$\downdownarrows $$</span>   `\downdownarrows`
* <span class='math'>$$\leftarrowtail $$</span>   `\leftarrowtail`
* <span class='math'>$$\rightarrowtail $$</span>   `\rightarrowtail`
* <span class='math'>$$\looparrowright $$</span>   `\looparrowright`
* <span class='math'>$$\looparrowleft $$</span>   `\looparrowleft`
* <span class='math'>$$\twoheadleftarrow $$</span>   `\twoheadleftarrow`
* <span class='math'>$$\twoheadrightarrow $$</span>   `\twoheadrightarrow`
* <span class='math'>$$\rightleftharpoons $$</span>   `\rightleftharpoons`
* <span class='math'>$$\leftrightharpoons $$</span>   `\leftrightharpoons`
* <span class='math'>$$\Rsh $$</span>   `\Rsh`
* <span class='math'>$$\Lsh $$</span>   `\Lsh`
* <span class='math'>$$\circlearrowright $$</span>   `\circlearrowright`
* <span class='math'>$$\circlearrowleft $$</span>   `\circlearrowleft`
* <span class='math'>$$\restriction $$</span>   `\restriction`
* <span class='math'>$$\upharpoonright $$</span>   `\upharpoonright`
* <span class='math'>$$\upharpoonleft $$</span>   `\upharpoonleft`
* <span class='math'>$$\downharpoonright $$</span>   `\downharpoonright`
* <span class='math'>$$\downharpoonleft $$</span>   `\downharpoonleft`
* <span class='math'>$$\rightsquigarrow $$</span>   `\rightsquigarrow`
* <span class='math'>$$\leadsto $$</span>   `\leadsto`
* <span class='math'>$$\leftrightsquigarrow $$</span>   `\leftrightsquigarrow`
* <span class='math'>$$\multimap $$</span>   `\multimap`
{.command-list}

## Negated Arrows

* <span class='math'>$$\nrightarrow $$</span>   `\nrightarrow`
* <span class='math'>$$\nleftarrow $$</span>   `\nleftarrow`
* <span class='math'>$$\nRightarrow $$</span>   `\nRightarrow`
* <span class='math'>$$\nLeftarrow $$</span>   `\nLeftarrow`
* <span class='math'>$$\nleftrightarrow $$</span>   `\nleftrightarrow`
* <span class='math'>$$\nLeftrightarrow $$</span>   `\nLeftrightarrow`
{.command-list}


## Accents

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
* <span class='math'>$$\`{e} $$</span> `\`{e}`
* <span class='math'>$$\\'{e} $$</span> `\'{e}`
* <span class='math'>$$\c{c} $$</span> `\c{c}`
* <span class='math'>$$\\~{n} $$</span>   `\~{n}` 
{.command-list}

Accents have a fixed width and do not stretch. For example, compare:

* <span class='math'>$$\vec{ABC}$$</span> `\vec{ABC}` 

and 

* <span class='math'>$$\overrightarrow{ABC}$$</span> `\overrightarrow{ABC}`.

## Extensible Symbols

* <span class='math'>$$\overline{\unicode{"2B1A}} $$</span> `\overline{}`
* <span class='math'>$$\underline{\unicode{"2B1A}} $$</span> `\underline{}`
* <span class='math'>$$\widehat{ABC} $$</span> `\widehat{}`
* <span class='math'>$$\widecheck{ABC} $$</span> `\widecheck{}`
* <span class='math'>$$\widetilde{ABC} $$</span> `\widetilde{}`
* <span class='math'>$$\utilde{ABC} $$</span> `\utilde{}`
* <span class='math'>$$\overrightarrow{ABC} $$</span> `\overrightarrow{}`
* <span class='math'>$$\overleftarrow{ABC} $$</span> `\overleftarrow{}`
* <span class='math'>$$\Overrightarrow{ABC} $$</span> `\Overrightarrow{}`
* <span class='math'>$$\overleftharpoon{ABC} $$</span> `\overleftharpoon{}`
* <span class='math'>$$\overrightharpoon{ABC} $$</span> `\overrightharpoon{}`
* <span class='math'>$$\overleftrightarrow{ABC} $$</span> `\overleftrightarrow{}`
* <span class='math'>$$\overlinesegment{ABC} $$</span> `\overlinesegment{}`
* <span class='math'>$$\overgroup{ABC} $$</span> `\overgroup{}`
* <span class='math'>$$\overbrace{ABC} $$</span> `\overbrace{}`
{.command-list}

---


* <span class='math'>$$\underrightarrow{ABC} $$</span> `\underrightarrow{}`
* <span class='math'>$$\underleftarrow{ABC} $$</span> `\underleftarrow{}`
* <span class='math'>$$\underleftrightarrow{ABC} $$</span> `\underleftrightarrow{}`
* <span class='math'>$$\underlinesegment{ABC} $$</span> `\underlinesegment{}`
* <span class='math'>$$\undergroup{ABC} $$</span> `\undergroup{}`
* <span class='math'>$$\underbrace{ABC} $$</span> `\underbrace{}`
{.command-list}

---

* <span class='math'>$$\xrightarrow[below]{above}=0 $$</span> `\xrightarrow[]{}`
* <span class='math'>$$\xleftarrow[below]{above}=0 $$</span> `\xleftarrow[]{}`
* <span class='math'>$$\xRightarrow[below]{above}=0 $$</span> `\xRightarrow[]{}`
* <span class='math'>$$\xLeftarrow[below]{above}=0 $$</span> `\xLeftarrow[]{}`
* <span class='math'>$$\xleftharpoonup[below]{above}=0 $$</span> `\xleftharpoonup[]{}`
* <span class='math'>$$\xleftharpoondown[below]{above}=0 $$</span> `\xleftharpoondown[]{}`
* <span class='math'>$$\xrightharpoonup[below]{above}=0 $$</span> `\xrightharpoonup[]{}`
* <span class='math'>$$\xrightharpoondown[below]{above}=0 $$</span> `\xrightharpoondown[]{}`
* <span class='math'>$$\xlongequal[below]{above}=0 $$</span> `\xlongequal[]{}`
* <span class='math'>$$\xtwoheadleftarrow[below]{above}=0 $$</span> `\xtwoheadleftarrow[]{}`
* <span class='math'>$$\xtwoheadrightarrow[below]{above}=0 $$</span> `\xtwoheadrightarrow[]{}`
* <span class='math'>$$\xleftrightarrow[below]{above}=0 $$</span> `\xleftrightarrow[]{}`
* <span class='math'>$$\xLeftrightarrow[below]{above}=0 $$</span> `\xLeftrightarrow[]{}`
* <span class='math'>$$\xrightleftharpoons[below]{above}=0 $$</span> `\xrightleftharpoons[]{}`
* <span class='math'>$$\xleftrightharpoons[below]{above}=0 $$</span> `\xleftrightharpoons[]{}`
* <span class='math'>$$\xhookleftarrow[below]{above}=0 $$</span> `\xhookleftarrow[]{}`
* <span class='math'>$$\xhookrightarrow[below]{above}=0 $$</span> `\xhookrightarrow[]{}`
* <span class='math'>$$\xmapsto[below]{above}=0 $$</span> `\xmapsto[]{}`
* <span class='math'>$$\xtofrom[below]{above}=0 $$</span> `\xtofrom[]{}`
* <span class='math'>$$\xrightleftarrows[below]{above}=0 $$</span> `\xrightleftarrows[]{}`
* <span class='math'>$$\xrightequilibrium[below]{above}=0 $$</span> `\xrightequilibrium[]{}`
* <span class='math'>$$\xleftequilibrium[below]{above}=0 $$</span> `\xleftequilibrium[]{}`
{.command-list}


## Relations

To display a vertical "stack" of two symbols as a relation, use the `\stackrel`
command: <span class='math'>$$a\stackrel{?}{=}b $$</span> `a\stackrel{?}{=}b`.

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
* <span class='math'>$$\nleq $$</span>   `\nleq`
* <span class='math'>$$\ngeq $$</span>   `\ngeq`
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
* <span class='math'>$$\backepsilon $$</span>   `\backepsilon`
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
* <span class='math'>$$\ne $$</span> `\ne`
* <span class='math'>$$\neq $$</span> `\neq`
{.command-list}


## Negated Relations

* <span class='math'>$$\not{=} $$</span> `\not=`
* <span class='math'>$$\not $$</span> `\not{}`
* <span class='math'>$$\nless $$</span>   `\nless`
* <span class='math'>$$\nleqslant $$</span>   `\nleqslant`
* <span class='math'>$$\lneq $$</span>   `\lneq`
* <span class='math'>$$\lneqq $$</span>   `\lneqq`
* <span class='math'>$$\nleqq $$</span>   `\nleqq`
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
* <span class='math'>$$\cap $$</span>   `\cap`
* <span class='math'>$$\cup $$</span>   `\cup`
* <span class='math'>$$\setminus $$</span>   `\setminus`
* <span class='math'>$$\smallsetminus $$</span>   `\smallsetminus`
* <span class='math'>$$\emptyset $$</span>   `\emptyset`
* <span class='math'>$$\sqsubseteq $$</span>   `\sqsubseteq`
* <span class='math'>$$\sqsupseteq $$</span>   `\sqsupseteq`
* <span class='math'>$$\in $$</span>   `\in`
* <span class='math'>$$\notin $$</span>   `\notin`
* <span class='math'>$$\ni $$</span>   `\ni`
* <span class='math'>$$\owns $$</span>   `\owns`
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
* <span class='math'>$$\varnothing $$</span>   `\varnothing`
* <span class='math'>$$\complement $$</span>   `\complement` 
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
* <span class='math'>$$\Gamma $$</span>   `\Gamma`
* <span class='math'>$$\Delta $$</span>   `\Delta`
* <span class='math'>$$\Theta $$</span>   `\Theta`
* <span class='math'>$$\Lambda $$</span>   `\Lambda`
* <span class='math'>$$\Xi $$</span>   `\Xi`
* <span class='math'>$$\Pi $$</span>   `\Pi`
* <span class='math'>$$\Sigma $$</span>   `\Sigma`
* <span class='math'>$$\Upsilon $$</span>   `\Upsilon`
* <span class='math'>$$\Phi $$</span>   `\Phi`
* <span class='math'>$$\Psi $$</span>   `\Psi`
* <span class='math'>$$\Omega $$</span>   `\Omega`
* <span class='math'>$$\digamma $$</span>   `\digamma`
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
* <span class='math'>$$\N $$</span>   `\N`
* <span class='math'>$$\R $$</span>   `\R`
* <span class='math'>$$\Q $$</span>   `\Q`
* <span class='math'>$$\C $$</span>   `\C`
* <span class='math'>$$\Z $$</span>   `\Z`
* <span class='math'>$$\P $$</span>   `\P`
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
* <span class='math'> $$</span> \{ <span class='math'> $$</span>   `\{`
* <span class='math'>$$\} $$</span>   `\}`
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
* <span class='math'>$$\cdotp $$</span>   `\cdotp`
* <span class='math'>$$\vdots $$</span>   `\vdots`
* <span class='math'>$$\ldotp $$</span>   `\ldotp`
* <span class='math'>$$, $$</span>   `,`
* <span class='math'>$$; $$</span>   `;`
* <span class='math'>$$\cdots $$</span>   `\cdots`
* <span class='math'>$$\ddots $$</span>   `\ddots`
* <span class='math'>$$\ldots $$</span>   `\ldots`
* <span class='math'>$$\mathellipsis $$</span>   `\mathellipsis`
* <span class='math'>$$" $$</span>   `"`
{.command-list}



## Boxes

* <span class='math'>$$\boxminus $$</span>   `\boxminus`
* <span class='math'>$$\boxplus $$</span>   `\boxplus`
* <span class='math'>$$\boxtimes $$</span>   `\boxtimes`
* <span class='math'>$$\boxdot $$</span>   `\boxdot`
* <span class='math'>$$\square $$</span>   `\square`
* <span class='math'>$$\Box $$</span>   `\Box`
* <span class='math'>$$\blacksquare $$</span>   `\blacksquare`
{.command-list}


## Circles

* <span class='math'>$$\circ $$</span>   `\circ`
* <span class='math'>$$\bigcirc $$</span>   `\bigcirc`
* <span class='math'>$$\bullet $$</span>   `\bullet`
* <span class='math'>$$\oplus $$</span>   `\oplus`
* <span class='math'>$$\ominus $$</span>   `\ominus`
* <span class='math'>$$\otimes $$</span>   `\otimes`
* <span class='math'>$$\odot $$</span>   `\odot`
* <span class='math'>$$\oslash $$</span>   `\oslash`
* <span class='math'>$$\circleddash $$</span>   `\circleddash`
* <span class='math'>$$\circledast $$</span>   `\circledast`
* <span class='math'>$$\circledcirc $$</span>   `\circledcirc`
* <span class='math'>$$\circledS $$</span>   `\circledS`
* <span class='math'>$$\circledR $$</span>   `\circledR`
{.command-list}


## Triangles

* <span class='math'>$$\vartriangle $$</span>   `\vartriangle`
* <span class='math'>$$\triangleq $$</span>   `\triangleq`
* <span class='math'>$$\vartriangleleft $$</span>   `\vartriangleleft`
* <span class='math'>$$\trianglelefteq $$</span>   `\trianglelefteq`
* <span class='math'>$$\ntriangleleft $$</span>   `\ntriangleleft`
* <span class='math'>$$\ntrianglelefteq $$</span>   `\ntrianglelefteq`
* <span class='math'>$$\vartriangleright $$</span>   `\vartriangleright`
* <span class='math'>$$\trianglerighteq $$</span>   `\trianglerighteq`
* <span class='math'>$$\ntriangleright $$</span>   `\ntriangleright`
* <span class='math'>$$\ntrianglerighteq $$</span>   `\ntrianglerighteq`
* <span class='math'>$$\blacktriangleleft $$</span>   `\blacktriangleleft`
* <span class='math'>$$\blacktriangleright $$</span>   `\blacktriangleright`
* <span class='math'>$$\bigtriangleup $$</span>   `\bigtriangleup`
* <span class='math'>$$\bigtriangledown $$</span>   `\bigtriangledown`
* <span class='math'>$$\triangleleft $$</span>   `\triangleleft`
* <span class='math'>$$\triangleright $$</span>   `\triangleright`
* <span class='math'>$$\triangle $$</span>   `\triangle`
* <span class='math'>$$\blacktriangle $$</span>   `\blacktriangle`
* <span class='math'>$$\triangledown $$</span>   `\triangledown`
* <span class='math'>$$\blacktriangledown $$</span>   `\blacktriangledown`
{.command-list}


## Shapes

* <span class='math'>$$\ast $$</span>   `\ast`
* <span class='math'>$$\star $$</span>   `\star`
* <span class='math'>$$\diamond $$</span>   `\diamond`
* <span class='math'>$$\Diamond $$</span>   `\Diamond`
* <span class='math'>$$\lozenge $$</span>   `\lozenge`
* <span class='math'>$$\blacklozenge $$</span>   `\blacklozenge`
{.command-list}


## Crosses

* <span class='math'>$$\dagger $$</span>   `\dagger`
* <span class='math'>$$\dag $$</span>   `\dag`
* <span class='math'>$$\ddag $$</span>   `\ddag`
* <span class='math'>$$\ddagger $$</span>   `\ddagger`
* <span class='math'>$$\maltese $$</span>   `\maltese`
{.command-list}


## Layout

* <span class='math'>$$x=\mathop{arg}=0 $$</span> `\mathop{}`
* <span class='math'>$$x=\mathbin{arg}=0 $$</span> `\mathbin{}`
* <span class='math'>$$x=\mathrel{arg}=0 $$</span> `\mathrel{}`
* <span class='math'>$$x=\mathopen{arg}=0 $$</span> `\mathopen{}`
* <span class='math'>$$x=\mathclose{arg}=0 $$</span> `\mathclose{}`
* <span class='math'>$$x=\mathpunct{arg}=0 $$</span> `\mathpunct{}`
* <span class='math'>$$x=\mathord{arg}=0 $$</span> `\mathord{}`
* <span class='math'>$$x=\mathinner{arg}=0 $$</span> `\mathinner{}`
* <span class='math'>$$x=\operatorname{arg}=0 $$</span> `\operatorname{}`
* <span class='math'>$$x=\operatorname*{arg}=0 $$</span> `\operatorname*{}`
* <span class='math'>$$\overset{arg}{x=0} $$</span> `\overset{}{}`
* <span class='math'>$$\underset{arg}{x=0} $$</span> `\underset{}{}`
* <span class='math'>$$\stackrel{arg}{x=0} $$</span> `\stackrel[]{}{}`
* <span class='math'>$$\stackbin{arg}{x=0} $$</span> `\stackbin[]{}{}`
* <span class='math'>$$\rlap{/}0 $$</span> `\rlap{}`
* <span class='math'>$$o\llap{/} $$</span> `\llap{}`
* <span class='math'>$$o\mathllap{/} $$</span> `\mathllap{}`
* <span class='math'>$$\mathrlap{/}0 $$</span> `\mathrlap{}`
* <span class='math'>$$\left\{x\middle|x>0\right\} $$</span> `\middle{}`
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
* <span class='math'>$$\unicode{"203A}\qquad\unicode{"2039} $$</span> `\qquad`
{.command-list}





## Decoration

* <span class='math'>$${\color{m0}A}{\color{m1}B}{\color{m2}C }{\color{m3}a}{\color{m4}b}{\color{m5}c}{\color{m6}8} $$</span> `\color{}`
* <span class='math'>$${\textcolor{m0}A}{\textcolor{m1}B}{\textcolor{m2}C }{\textcolor{m3}a}{\textcolor{m4}b}{\textcolor{m5}c}{\textcolor{m6}8} $$</span> `\textcolor{}{}`
* <span class='math'>$$\boxed{\unicode{"2B1A}} $$</span> `\boxed{}`
* <span class='math'>$$\colorbox{#fbc0bd}{\unicode{"2B1A}} $$</span> `\colorbox{}{}`
* <span class='math'>$$\fcolorbox{#cd0030}{#ffd400}{\unicode{"2B1A}} $$</span> `\fcolorbox{}{}{}`
* <span class='math'>$$\bbox[#ffd400, solid 2px #ffd400]{\unicode{"2B1A}} $$</span> `\bbox[]{}`
* <span class='math'>$$\rule{2em}{1em} $$</span> `\rule[]{}{}`
* <span class='math'>$$\enclose{updiagonalstrike,roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0} $$</span> `\enclose{}[]{}`
* <span class='math'>$$\cancel{\unicode{"2B1A}} $$</span> `\cancel{}`
* <span class='math'>$$\bcancel{\unicode{"2B1A}} $$</span> `\bcancel{}`
* <span class='math'>$$\xcancel{\unicode{"2B1A}} $$</span> `\xcancel{}`
{.command-list}


## Styling

* <span class='math'>$$\text{\fontseries{b}Don Knuth} $$</span> `\fontseries{}`
* <span class='math'>$$\text{\fontshape{sc}Don Knuth} $$</span> `\fontshape{}`
* <span class='math'>$$\text{\fontfamily{cmtt}Don Knuth} $$</span> `\fontfamily{}`
* <span class='math'>$$\text{\selectfont} $$</span> `\selectfont`
* <span class='math'>$${\bf Don Knuth} $$</span> `\bf`
* <span class='math'>$$\boldsymbol{Don Knuth} $$</span> `\boldsymbol{}`
* <span class='math'>$$\bm{Don Knuth} $$</span> `\bm{}`
* <span class='math'>$$\bold{Don Knuth} $$</span> `\bold{}`
* <span class='math'>$$\text{\bfseries Don Knuth} $$</span> `\bfseries`
* <span class='math'>$$\text{\mdseries Don Knuth} $$</span> `\mdseries`
* <span class='math'>$$\text{\upshape Don Knuth} $$</span> `\upshape`
* <span class='math'>$$\text{\slshape Don Knuth} $$</span> `\slshape`
* <span class='math'>$$\text{\scshape Don Knuth} $$</span> `\scshape`
* <span class='math'>$$\textbf{Don Knuth} $$</span> `\textbf{}`
* <span class='math'>$$\textmd{Don Knuth} $$</span> `\textmd{}`
* <span class='math'>$$\textup{Don Knuth} $$</span> `\textup{}`
* <span class='math'>$$\textnormal{Don Knuth} $$</span> `\textnormal{}`
* <span class='math'>$$\textsl{Don Knuth} $$</span> `\textsl{}`
* <span class='math'>$$\textit{Don Knuth} $$</span> `\textit{}`
* <span class='math'>$$\textsc{Don Knuth} $$</span> `\textsc{}`
* <span class='math'>$$\textrm{Don Knuth} $$</span> `\textrm{}`
* <span class='math'>$$\textsf{Don Knuth} $$</span> `\textsf{}`
* <span class='math'>$$\texttt{Don Knuth} $$</span> `\texttt{}`
* <span class='math'>$$\mathbf{Don Knuth} $$</span> `\mathbf{}`
* <span class='math'>$$\mathit{Don Knuth} $$</span> `\mathit{}`
* <span class='math'>$$\mathrm{Don Knuth} $$</span> `\mathrm{}`
* <span class='math'>$$\mathsf{Don Knuth} $$</span> `\mathsf{}`
* <span class='math'>$$\mathtt{Don Knuth} $$</span> `\mathtt{}`
* <span class='math'>$${\it Don Knuth} $$</span> `\it`
* <span class='math'>$${\rmfamily Don Knuth} $$</span> `\rmfamily`
* <span class='math'>$${\sffamily Don Knuth} $$</span> `\sffamily`
* <span class='math'>$${\ttfamily Don Knuth} $$</span> `\ttfamily`
* <span class='math'>$$\Bbb{Don Knuth} $$</span> `\Bbb{}`
* <span class='math'>$$\mathbb{Don Knuth} $$</span> `\mathbb{}`
* <span class='math'>$${\frak Don Knuth} $$</span> `\frak{}`
* <span class='math'>$$\mathfrak{Don Knuth} $$</span> `\mathfrak{}`
* <span class='math'>$$\mathcal{Don Knuth} $$</span> `\mathcal{}`
* <span class='math'>$$\mathscr{Don Knuth} $$</span> `\mathscr{}`
* <span class='math'>$$\mbox{Don Knuth} $$</span> `\mbox{}`
* <span class='math'>$$\text{Don Knuth} $$</span> `\text{}`
* <span class='math'>$$\class{testIdentifier}{Don Knuth} $$</span> `\class{}{}`
* <span class='math'>$$\cssId{testIdentifier}{Don Knuth} $$</span> `\cssId{}{}`
* <span class='math'>$${\htmlData Don Knuth} $$</span> `\htmlData{}{}`
* <span class='math'>$$Don{\em Knuth} $$</span> `\em{}`
* <span class='math'>$$Don\emph{Knuth} $$</span> `\emph{}`
{.command-list}


## Sizing

* <span class='math'>$$\tiny{x=0} $$</span> `\tiny`
* <span class='math'>$$\scriptsize{x=0} $$</span> `\scriptsize`
* <span class='math'>$$\footnotesize{x=0} $$</span> `\footnotesize`
* <span class='math'>$$\small{x=0} $$</span> `\small`
* <span class='math'>$$\normalsize{x=0} $$</span> `\normalsize`
* <span class='math'>$$\large{x=0} $$</span> `\large`
* <span class='math'>$$\Large{x=0} $$</span> `\Large`
* <span class='math'>$$\LARGE{x=0} $$</span> `\LARGE`
* <span class='math'>$$\huge{x=0} $$</span> `\huge`
* <span class='math'>$$\Huge{x=0} $$</span> `\Huge`
{.command-list}

---

* <span class='math'>$$\bigl( $$</span> `\bigl{}`
* <span class='math'>$$\bigr) $$</span> `\bigr{}`
* <span class='math'>$$\bigm| $$</span> `\bigm{}`
{.command-list}



* <span class='math'>$$\Bigl( $$</span> `\Bigl{}`
* <span class='math'>$$\Bigr) $$</span> `\Bigr{}`
* <span class='math'>$$\Bigm| $$</span> `\Bigm{}`
{.command-list}


* <span class='math'>$$\biggl( $$</span> `\biggl{}`
* <span class='math'>$$\biggr) $$</span> `\biggr{}`
* <span class='math'>$$\biggm| $$</span> `\biggm{}`
{.command-list}



* <span class='math'>$$\Biggl( $$</span> `\Biggl{}`
* <span class='math'>$$\Biggr) $$</span> `\Biggr{}`
* <span class='math'>$$\Biggm| $$</span> `\Biggm{}`
{.command-list}



* <span class='math'>$$\big(\big) $$</span> `\big{}`
* <span class='math'>$$\Big(\Big) $$</span> `\Big{}`
* <span class='math'>$$\bigg(\bigg) $$</span> `\bigg{}`
* <span class='math'>$$\Bigg(\Bigg) $$</span> `\Bigg{}`
{.command-list}



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


* <span class='math'>$$\ensuremath $$</span> `\ensuremath{}`
* <span class='math'>$$\displaystyle $$</span> `\displaystyle{}`
* <span class='math'>$$\textstyle $$</span> `\textstyle{}`
* <span class='math'>$$\scriptstyle $$</span> `\scriptstyle{}`
* <span class='math'>$$\scriptscriptstyle $$</span> `\scriptscriptstyle{}`
* <span class='math'>$$\mathbfit $$</span> `\mathbfit{}`
* <span class='math'>$$\overunderset $$</span> `\overunderset{}{}{}`
* <span class='math'>$$\smash $$</span> `\smash[]{}`
* <span class='math'>$$\vphantom $$</span> `\vphantom{}`
* <span class='math'>$$\hphantom $$</span> `\hphantom{}`
* <span class='math'>$$\phantom $$</span> `\phantom{}`
* <span class='math'>$$\inf $$</span> `\inf`
* <span class='math'>$$\Pr $$</span> `\Pr`
* <span class='math'>$$\sup $$</span> `\sup`
* <span class='math'>$$\liminf $$</span> `\liminf`
* <span class='math'>$$\limsup $$</span> `\limsup`
* <span class='math'>$$\ce $$</span> `\ce{}`
* <span class='math'>$$\pu $$</span> `\pu{}`
* <span class='math'>$$\quad $$</span> `\quad`
{.command-list}

## Chemistry

MathLive  supports the [`mhchem` package](https://mhchem.github.io/MathJax-mhchem/).

### Chemical Formulae
* <span class='math'>$$\ce{H2O} $$</span> `\ce{H2O}$`
* <span class='math'>$$\ce{Sb2O3} $$</span> `\ce{Sb2O3}`



### Charges
* <span class='math'>$$\ce{[AgCl2]-} $$</span> `\ce{[AgCl2]-}`
* <span class='math'>$$\ce{Y^99+} $$</span> `\ce{Y^99+}`
* <span class='math'>$$\ce{Y^{99+}} $$</span> `\ce{Y^{99+}}`
* <span class='math'>$$\ce{H+} $$</span> `\ce{H+}`
* <span class='math'>$$\ce{CrO4^2-} $$</span> `\ce{CrO4^2-}`


### Stoichiometric numbers
* <span class='math'>$$\ce{2 H2O} $$</span> `\ce{2 H2O}`
* <span class='math'>$$\ce{2H2O} $$</span> `\ce{2H2O}`
* <span class='math'>$$\ce{0.5 H2O} $$</span> `\ce{0.5 H2O}`
* <span class='math'>$$\ce{1/2 H2O} $$</span> `\ce{1/2 H2O}`
* <span class='math'>$$\ce{(1/2) H2O} $$</span> `\ce{(1/2) H2O}`
* <span class='math'>$$\ce{$n$ H2O} $$</span> `\ce{$n$ H2O}`

### Isotopes


* <span class='math'>$$\ce{^{227}_{90}Th+} $$</span> `\ce{^{227}_{90}Th+}`
* <span class='math'>$$\ce{^227_90Th+} $$</span> `\ce{^227_90Th+}`
* <span class='math'>$$\ce{^{0}_{-1}n^{-}} $$</span>  `\ce{^{0}_{-1}n^{-}}`
* <span class='math'>$$\ce{^0_-1n-} $$</span> `\ce{^0_-1n-}`
* <span class='math'>$$\ce{H{}^3HO} $$</span> `\ce{H{}^3HO}`
* <span class='math'>$$\ce{H^3HO} $$</span> `\ce{H^3HO}`

### Complex Examples

* <span class='math'>$$\ce{CO2 + C -> 2 CO} $$</span> <br>  `\ce{CO2 + C -> 2 CO}`
* <span class='math'>$$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} $$</span> <br>   `\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}`
* <span class='math'>$$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K} $$</span> <br>   `C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}`
* <span class='math'>$$\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$} $$</span> <br>  `\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}`
* <span class='math'>$$\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$} $$</span>  <br>  `\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}`
* <span class='math'>$$\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$} $$</span> <br>  `\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}`
* <span class='math'>$$\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$} $$</span> <br>   `\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}`


## Macros

* <span class='math'>$$\iff $$</span> `\iff`
* <span class='math'>$$\nicefrac{3}{4} $$</span> `\nicefrac{3}{4}`
* <span class='math'>$$\bra{\Psi} $$</span> `\bra{\Psi}`
* <span class='math'>$$\ket{\Psi} $$</span> `\ket{\Psi}`	
* <span class='math'>$$\braket{ab} $$</span> `\braket{}`
* <span class='math'>$$\set{ab} $$</span> `\set{}`
* <span class='math'>$$\Bra{ab} $$</span> `\Bra{}`
* <span class='math'>$$\Ket{ab} $$</span> `\Ket{}`
* <span class='math'>$$\Braket{ab} $$</span> `\Braket{}`
* <span class='math'>$$\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 } $$</span> `\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 }`
* <span class='math'>$$\rd $$</span> `\rd`
* <span class='math'>$$\rD $$</span> `\rD`
* <span class='math'>$$\doubleStruckCapitalN $$</span> `\doubleStruckCapitalN`
* <span class='math'>$$\doubleStruckCapitalR $$</span> `\doubleStruckCapitalR`
* <span class='math'>$$\doubleStruckCapitalQ $$</span> `\doubleStruckCapitalQ`
* <span class='math'>$$\doubleStruckCapitalZ $$</span> `\doubleStruckCapitalZ`
* <span class='math'>$$\doubleStruckCapitalP $$</span> `\doubleStruckCapitalP`
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


```tex
\begin{array}{lc}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```

$$\begin{array}{lc}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</span> 


A simple matrix with no delimiters. 

The `{lc}` argument specifies how many columns there are and how they should be 
formated:
  * `l`: left-aligned
  * `c`: centered
  * `r`: right-aligned

To add a vertical line separating columns, add `|` character in the column format:

$$\begin{array}{l|c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</span> 

```tex
\begin{array}{l|c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```

To add a double vertical line separating columns, add two `|` characters in the 
column format:

$$\begin{array}{l||c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</span> 

```tex
\begin{array}{l||c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```

To add a dashed vertical line between two columns, use `:`:

$$\begin{array}{l:c}a + 1 & b  + 1 \\\\ c & \frac{1}{d}\end{array} $$</span> 

```tex
\begin{array}{l:c}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{array}
```


#### `matrix`

The `matrix` environment is very similar to `array`, but it does not have an
argument to specify the format of the columns.

```tex
\begin{matrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix}
```

$$\begin{matrix}a + 1   &   b  + 1 \\\\ c       &   \frac{1}{d} \end{matrix}$$


To specify the format of the columns, use the starred version and an optional
argument. This applies to all the other `matrix` environments.

```tex
\begin{matrix*}[l|r]
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix*}
```

$$\begin{matrix*}[l|r]a + 1   &   b  + 1 \\\\ c       &   \frac{1}{d} \end{matrix*}$$


#### `pmatrix`

A matrix with **parentheses** as delimiters.

```tex
\begin{pmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{pmatrix}
```

<span class='math'>$$\begin{pmatrix}a & b \\\\ c & \frac{1}{d}\end{pmatrix}$$

#### `bmatrix`

A matrix with **square brackets** as delimiters.

```tex
\begin{bmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{bmatrix}
```

<span class='math'>$$\begin{bmatrix}a & b \\\\ c & \frac{1}{d}\end{bmatrix}$$

#### `Bmatrix`

A matrix with **braces** (curly brackets) as delimiters.

```tex
\begin{Bmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{Bmatrix}
```

<span class='math'>$$\begin{Bmatrix}a & b \\\\ c & \frac{1}{d}\end{Bmatrix}$$

#### `vmatrix`

A matrix with **single bars** as delimiters.

```tex
\begin{vmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{vmatrix}
```
 <span class='math'>$$\begin{vmatrix}a & b \\\\ c & \frac{1}{d}\end{vmatrix}$$

#### `Vmatrix`

A matrix with **double bars** as delimiters.

```tex
\begin{Vmatrix}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{Vmatrix}
```


<span class='math'>$$\begin{Vmatrix}a & b \\\\ c & \frac{1}{d}\end{Vmatrix}$$

#### `matrix*`

```tex
\begin{matrix*}
  a + 1   &   b  + 1 \\
  c       &   \frac{1}{d}
\end{matrix*}
```

<span class='math'>$$\begin{matrix*}a & b \\\\ c & \frac{1}{d}\end{matrix*}$$

#### `smallmatrix`

* <span class='math'>$$\begin{smallmatrix}a & b \\\\ c & \frac{1}{d}\end{smallmatrix}$$


### Other Environments

#### `cases`

```tex
f(n) = \begin{cases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{cases}

```

$$f(n) = \begin{cases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{cases}
$$

#### `dcases`

Like `cases` but the content is typeset in `displaystyle`.

```tex
f(n) = \begin{dcases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{dcases}

```

$$f(n) = \begin{dcases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{dcases}
$$

#### `rcases`

Like `cases` but with the brace delimiter on the right.

```tex
\begin{rcases}
  1 & \text{if } n = 0  \\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{rcases} = f(n)

```

$$\begin{rcases}
  1 & \text{if } n = 0  \\\\ 
  f(n-1) + f(n-2) & \text{if } n \ge 2
\end{rcases} = f(n) 
$$


#### `multline`

```tex
  \​begin{multline}
    x + \frac12 \\ 
    y - \frac34 
  \end{multline}
```

<span class='math'>$$\begin{multline}x+\frac12 \\\\ y - \frac34 \end{multline} $$</span>  


#### Others

* <span class='math'>$$\begin{math}x+\frac12\end{math}$$</span> `$$\begin{math}x+\frac12\end{math}$$`

* <span class='math'>$$\begin{displaymath}x+\frac12\end{displaymath}$$</span> `$$\begin{displaymath}x+\frac12\end{displaymath}$$`


* <span class='math'>$$\begin{equation}x+\frac12\end{equation} $$</span>  `\​begin{equation}x+\frac12\end{equation}`

* <span class='math'>$$\begin{subequations}x+\frac12\end{subequations} $$</span>  `\​begin{subequations}x+\frac12\end{subequations}`


* <span class='math'>$$\begin{align}a & b \\ c & \frac{1}{d}\end{align} $$</span>  `\​begin{align}...\end{align}`

* <span class='math'>$$\begin{align*}a & b \\ c & \frac{1}{d}\end{align*} $$</span>  `\​begin{align*}...\end{align*}`

* <span class='math'>$$\begin{aligned}a & b \\ c & \frac{1}{d}\end{aligned} $$</span>  `\​begin{aligned}...\end{aligned}`

* <span class='math'>$$\begin{eqnarray}a & b \\ c & \frac{1}{d}\end{eqnarray} $$</span>  `\​begin{eqnarray}...\end{eqnarray}`

* <span class='math'>$$\begin{split}a & b \\ c & \frac{1}{d}\end{split} $$</span>  `\​begin{split}...\end{split}`

* <span class='math'>$$\begin{gather}a & b \\ c & \frac{1}{d}\end{gather} $$</span>  `\​begin{gather}...\end{gather}`

* <span class='math'>$$\begin{gathered}a & b \\ c & \frac{1}{d}\end{gathered} $$</span>  `\​begin{gathered}...\end{gathered}`

* <span class='math'>$$\begin{center}\text{first}\end{center}$$</span> `$$\begin{center}\text{first}\end{center} $$</span>  `



## TeX Internals

* `\limits` and `\nolimits`
* `\relax`
* `\noexpand`
* `\obeyspaces`
* `\bgroup` and `\egroup`
* `\string`
* `\csname` and `\endcsname`
