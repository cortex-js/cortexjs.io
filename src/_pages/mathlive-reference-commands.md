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
    renderMathInDocument();
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
</style>

## Fractions and Binomials

* $$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\frac{}{}`
* $$\dfrac{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\dfrac{}{}`
* $$\tfrac{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\tfrac{}{}`

The `\dfrac` command display in Display style even when it is in a context
that would normally use a different style, such as in a superscript.

The `\tfrac` command display in Text style (inline) even in a context 
that would  normally use Display style.

* $$\cfrac{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\cfrac{}{}`
* $$\binom{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\binom{}{}`
* $$\dbinom{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\dbinom{}{}`
* $$\tbinom{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\tbinom{}{}`
* $$\pdiff{\unicode{"2B1A}}{\unicode{"2B1A}}$$ `\pdiff{}{}`
{.command-list}

The following commands are supported but their usage is generally discouraged
when creating modern LaTeX content.

* $${\unicode{"2B1A} \overwithdelims{\lbrace}{\rbrace} \unicode{"2B1A}}$$ `\overwithdelims{\lbrace}{\rbrace}`
* $${\unicode{"2B1A} \atopwithdelims{\lbrace}{\rbrace} \unicode{"2B1A}}$$ `\atopwithdelims{\lbrace}{\rbrace}`
* $$\unicode{"2B1A} \over \unicode{"2B1A}$$ `\over `
* $$\unicode{"2B1A} \atop \unicode{"2B1A}$$ `\atop `
* $$\unicode{"2B1A} \choose \unicode{"2B1A}$$ `\choose `
{.command-list}


## Operators

* $$+$$   `+`
* $$-$$   `-`
* $$\pm$$   `\pm`
* $$\mp$$   `\mp`
* $$*$$   `*`
* $$\times$$   `\times`
* $$\div$$   `\div`
* $$\divides$$   `\divides`
* $$\cdot$$   `\cdot`
* $$\sqrt[\unicode{"2B1A}]{\unicode{"2B1A}}$$ `\sqrt[]{}`
* $$\surd$$   `\surd{}` 
* $$\ltimes$$   `\ltimes`
* $$\rtimes$$   `\rtimes`
* $$\leftthreetimes$$   `\leftthreetimes`
* $$\rightthreetimes$$   `\rightthreetimes`
* $$\intercal$$   `\intercal`
* $$\dotplus$$   `\dotplus`
* $$\doublebarwedge$$   `\doublebarwedge`
* $$\divideontimes$$   `\divideontimes`
* $$\centerdot$$   `\centerdot`
{.command-list}

## Functions

* $$\deg$$ `\deg`
* $$\dim$$ `\dim`
* $$\exp$$ `\exp`
* $$\hom$$ `\hom`
* $$\ker$$ `\ker`
* $$\ln$$ `\ln`
* $$\log$$ `\log`
* $$\lim$$ `\lim`
* $$\det$$ `\det`
* $$\max$$ `\max`
* $$\min$$ `\min`
{.command-list}


### Modulo

* $$n \pmod{3}$$	`n \pmod{3}`
* $$n \mod{3}$$	`n \mod{3}`
* $$n \bmod 3$$	`n \bmod 3`


### Trigonometry

* $$\arccos$$ `\arccos`
* $$\arcsin$$ `\arcsin`
* $$\arctan$$ `\arctan`
* $$\arctg$$ `\arctg`
* $$\arcctg$$ `\arcctg`
* $$\arg$$ `\arg`
* $$\ch$$ `\ch`
* $$\cos$$ `\cos`
* $$\cosh$$ `\cosh`
* $$\cot$$ `\cot`
* $$\coth$$ `\coth`
* $$\ctg$$ `\ctg`
* $$\cth$$ `\cth`
* $$\cotg$$ `\cotg`
* $$\csc$$ `\csc`
* $$\cosec$$ `\cosec`
* $$\lg$$ `\lg`
* $$\lb$$ `\lb`
* $$\sec$$ `\sec`
* $$\sh$$ `\sh`
* $$\sin$$ `\sin`
* $$\sinh$$ `\sinh`
* $$\tan$$ `\tan`
* $$\tanh$$ `\tanh`
* $$\tg$$ `\tg`
* $$\th$$ `\th`
{.command-list}


## Unicode

* `\unicode{}` - The argument is a Unicode codepoint expressed as a number. To use a hexadecimal number, start the argument with `x` or `"` and use uppercase `A`-`F` for hexadecimal digits.
  * $$\unicode{10775}$$ `\unicode{10775}` 
  * $$\unicode{"2A17}$$ `\unicode{"2A17}` 
  * $$\unicode{x2A17}$$ `\unicode{x2A17}`
* `\char` - The argument is also Unicode codepoint, but the `{`...`}` delimiters are optional when using `"`
  * $$\char"2A17$$ `\char"2A17`  
* `^^` and `^^^^` - Followed by 2 or 4 hexadecimal digits with **lowercase** `a`-`f` to specify a Unicode codepoint
  * $$^^4a$$ `^^4a`
  * $$^^^^2a17$$ `^^^^2a17`


## Extensible Operators

* $$\sum$$ `\sum`
* $$\prod$$ `\prod`
* $$\bigcup$$ `\bigcup`
* $$\bigcap$$ `\bigcap`
* $$\coprod$$ `\coprod`
* $$\bigvee$$ `\bigvee`
* $$\bigwedge$$ `\bigwedge`
* $$\biguplus$$ `\biguplus`
* $$\bigotimes$$ `\bigotimes`
* $$\bigoplus$$ `\bigoplus`
* $$\bigodot$$ `\bigodot`
* $$\bigsqcup$$ `\bigsqcup`
* $$\smallint$$ `\smallint`
* $$\intop$$ `\intop`
* $$\int$$ `\int`
* $$\iint$$ `\iint`
* $$\iiint$$ `\iiint`
* $$\oint$$ `\oint`
* $$\oiint$$ `\oiint`
* $$\oiiint$$ `\oiiint`
* $$\intclockwise$$ `\intclockwise`
* $$\varointclockwise$$ `\varointclockwise`
* $$\ointctrclockwise$$ `\ointctrclockwise`
* $$\intctrclockwise$$ `\intctrclockwise`
* $$\sqcup$$ `\sqcup`
* $$\sqcap$$ `\sqcap`
* $$\uplus$$ `\uplus`
* $$\wr$$ `\wr`
* $$\amalg$$ `\amalg`
* $$\Cap$$ `\Cap`
* $$\Cup$$ `\Cup`
* $$\doublecap$$ `\doublecap`
* $$\doublecup$$ `\doublecup`
{.command-list}


## Logic

* $$\forall$$   `\forall`
* $$\exists$$   `\exists`
* $$\nexists$$   `\nexists`
* $$\to$$   `\to`
* $$\gets$$   `\gets`
* $$\implies$$   `\implies`
* $$\impliedby$$   `\impliedby`
* $$\biconditional$$   `\biconditional`
* $$\therefore$$   `\therefore`
* $$\because$$   `\because`
* $$\land$$   `\land`
* $$\wedge$$   `\wedge`
* $$\lor$$   `\lor`
* $$\vee$$   `\vee`
* $$\barwedge$$   `\barwedge`
* $$\veebar$$   `\veebar`
* $$\nor$$   `\nor`
* $$\curlywedge$$   `\curlywedge`
* $$\curlyvee$$   `\curlyvee`
* $$\leftrightarrow$$   `\leftrightarrow`
* $$\Leftrightarrow$$   `\Leftrightarrow`
* $$\models$$   `\models`
* $$\vdash$$   `\vdash`
* $$\dashv$$   `\dashv`
* $$\roundimplies$$   `\roundimplies`
* $$\lnot$$   `\lnot`
* $$\neg$$   `\neg`
{.command-list}

## Arrows

* $$\rightarrow$$   `\rightarrow`
* $$\leftarrow$$   `\leftarrow`
* $$\Rightarrow$$   `\Rightarrow`
* $$\Leftarrow$$   `\Leftarrow`
* $$\longrightarrow$$   `\longrightarrow`
* $$\longleftarrow$$   `\longleftarrow`
* $$\Longrightarrow$$   `\Longrightarrow`
* $$\Longleftarrow$$   `\Longleftarrow`
* $$\longleftrightarrow$$   `\longleftrightarrow`
* $$\Longleftrightarrow$$   `\Longleftrightarrow`
* $$\mapsto$$   `\mapsto`
* $$\longmapsto$$   `\longmapsto`
* $$\uparrow$$   `\uparrow`
* $$\downarrow$$   `\downarrow`
* $$\Uparrow$$   `\Uparrow`
* $$\Downarrow$$   `\Downarrow`
* $$\updownarrow$$   `\updownarrow`
* $$\Updownarrow$$   `\Updownarrow`
* $$\hookrightarrow$$   `\hookrightarrow`
* $$\hookleftarrow$$   `\hookleftarrow`
* $$\rightharpoonup$$   `\rightharpoonup`
* $$\leftharpoonup$$   `\leftharpoonup`
* $$\rightharpoondown$$   `\rightharpoondown`
* $$\leftharpoondown$$   `\leftharpoondown`
* $$\searrow$$   `\searrow`
* $$\nearrow$$   `\nearrow`
* $$\swarrow$$   `\swarrow`
* $$\nwarrow$$   `\nwarrow`
* $$\dashrightarrow$$   `\dashrightarrow`
* $$\dashleftarrow$$   `\dashleftarrow`
* $$\Rrightarrow$$   `\Rrightarrow`
* $$\Lleftarrow$$   `\Lleftarrow`
* $$\leftrightarrows$$   `\leftrightarrows`
* $$\rightleftarrows$$   `\rightleftarrows`
* $$\curvearrowright$$   `\curvearrowright`
* $$\curvearrowleft$$   `\curvearrowleft`
* $$\rightrightarrows$$   `\rightrightarrows`
* $$\leftleftarrows$$   `\leftleftarrows`
* $$\upuparrows$$   `\upuparrows`
* $$\downdownarrows$$   `\downdownarrows`
* $$\leftarrowtail$$   `\leftarrowtail`
* $$\rightarrowtail$$   `\rightarrowtail`
* $$\looparrowright$$   `\looparrowright`
* $$\looparrowleft$$   `\looparrowleft`
* $$\twoheadleftarrow$$   `\twoheadleftarrow`
* $$\twoheadrightarrow$$   `\twoheadrightarrow`
* $$\rightleftharpoons$$   `\rightleftharpoons`
* $$\leftrightharpoons$$   `\leftrightharpoons`
* $$\Rsh$$   `\Rsh`
* $$\Lsh$$   `\Lsh`
* $$\circlearrowright$$   `\circlearrowright`
* $$\circlearrowleft$$   `\circlearrowleft`
* $$\restriction$$   `\restriction`
* $$\upharpoonright$$   `\upharpoonright`
* $$\upharpoonleft$$   `\upharpoonleft`
* $$\downharpoonright$$   `\downharpoonright`
* $$\downharpoonleft$$   `\downharpoonleft`
* $$\rightsquigarrow$$   `\rightsquigarrow`
* $$\leadsto$$   `\leadsto`
* $$\leftrightsquigarrow$$   `\leftrightsquigarrow`
* $$\multimap$$   `\multimap`
{.command-list}

## Negated Arrows

* $$\nrightarrow$$   `\nrightarrow`
* $$\nleftarrow$$   `\nleftarrow`
* $$\nRightarrow$$   `\nRightarrow`
* $$\nLeftarrow$$   `\nLeftarrow`
* $$\nleftrightarrow$$   `\nleftrightarrow`
* $$\nLeftrightarrow$$   `\nLeftrightarrow`
{.command-list}

## Extensible Symbols

* $$\widehat{ABC}$$ `\widehat{}`
* $$\widecheck{ABC}$$ `\widecheck{}`
* $$\widetilde{ABC}$$ `\widetilde{}`
* $$\utilde{ABC}$$ `\utilde{}`
* $$\overrightarrow{ABC}$$ `\overrightarrow{}`
* $$\overleftarrow{ABC}$$ `\overleftarrow{}`
* $$\Overrightarrow{ABC}$$ `\Overrightarrow{}`
* $$\overleftharpoon{ABC}$$ `\overleftharpoon{}`
* $$\overrightharpoon{ABC}$$ `\overrightharpoon{}`
* $$\overleftrightarrow{ABC}$$ `\overleftrightarrow{}`
* $$\overlinesegment{ABC}$$ `\overlinesegment{}`
* $$\overgroup{ABC}$$ `\overgroup{}`
* $$\overbrace{ABC}$$ `\overbrace{}`
* $$\underrightarrow{ABC}$$ `\underrightarrow{}`
* $$\underleftarrow{ABC}$$ `\underleftarrow{}`
* $$\underleftrightarrow{ABC}$$ `\underleftrightarrow{}`
* $$\underlinesegment{ABC}$$ `\underlinesegment{}`
* $$\undergroup{ABC}$$ `\undergroup{}`
* $$\underbrace{ABC}$$ `\underbrace{}`
* $$\xrightarrow[below]{above}=0$$ `\xrightarrow[]{}`
* $$\xleftarrow[below]{above}=0$$ `\xleftarrow[]{}`
* $$\xRightarrow[below]{above}=0$$ `\xRightarrow[]{}`
* $$\xLeftarrow[below]{above}=0$$ `\xLeftarrow[]{}`
* $$\xleftharpoonup[below]{above}=0$$ `\xleftharpoonup[]{}`
* $$\xleftharpoondown[below]{above}=0$$ `\xleftharpoondown[]{}`
* $$\xrightharpoonup[below]{above}=0$$ `\xrightharpoonup[]{}`
* $$\xrightharpoondown[below]{above}=0$$ `\xrightharpoondown[]{}`
* $$\xlongequal[below]{above}=0$$ `\xlongequal[]{}`
* $$\xtwoheadleftarrow[below]{above}=0$$ `\xtwoheadleftarrow[]{}`
* $$\xtwoheadrightarrow[below]{above}=0$$ `\xtwoheadrightarrow[]{}`
* $$\xleftrightarrow[below]{above}=0$$ `\xleftrightarrow[]{}`
* $$\xLeftrightarrow[below]{above}=0$$ `\xLeftrightarrow[]{}`
* $$\xrightleftharpoons[below]{above}=0$$ `\xrightleftharpoons[]{}`
* $$\xleftrightharpoons[below]{above}=0$$ `\xleftrightharpoons[]{}`
* $$\xhookleftarrow[below]{above}=0$$ `\xhookleftarrow[]{}`
* $$\xhookrightarrow[below]{above}=0$$ `\xhookrightarrow[]{}`
* $$\xmapsto[below]{above}=0$$ `\xmapsto[]{}`
* $$\xtofrom[below]{above}=0$$ `\xtofrom[]{}`
* $$\xrightleftarrows[below]{above}=0$$ `\xrightleftarrows[]{}`
* $$\xrightequilibrium[below]{above}=0$$ `\xrightequilibrium[]{}`
* $$\xleftequilibrium[below]{above}=0$$ `\xleftequilibrium[]{}`
{.command-list}


## Relations

* $$\shortparallel$$   `\shortparallel`
* $$\leqslant$$   `\leqslant`
* $$\geqslant$$   `\geqslant`
* $$\gtrsim$$   `\gtrsim`
* $$\approxeq$$   `\approxeq`
* $$\thickapprox$$   `\thickapprox`
* $$\lessapprox$$   `\lessapprox`
* $$\gtrapprox$$   `\gtrapprox`
* $$\precapprox$$   `\precapprox`
* $$\succapprox$$   `\succapprox`
* $$\thicksim$$   `\thicksim`
* $$\succsim$$   `\succsim`
* $$\precsim$$   `\precsim`
* $$\backsim$$   `\backsim`
* $$\eqsim$$   `\eqsim`
* $$\backsimeq$$   `\backsimeq`
* $$\lesssim$$   `\lesssim`
* $$\nleq$$   `\nleq`
* $$\ngeq$$   `\ngeq`
* $$\smallsmile$$   `\smallsmile`
* $$\smallfrown$$   `\smallfrown`
* $$\leqq$$   `\leqq`
* $$\eqslantless$$   `\eqslantless`
* $$\lll$$   `\lll`
* $$\lessgtr$$   `\lessgtr`
* $$\lesseqgtr$$   `\lesseqgtr`
* $$\lesseqqgtr$$   `\lesseqqgtr`
* $$\risingdotseq$$   `\risingdotseq`
* $$\fallingdotseq$$   `\fallingdotseq`
* $$\preccurlyeq$$   `\preccurlyeq`
* $$\curlyeqprec$$   `\curlyeqprec`
* $$\vDash$$   `\vDash`
* $$\Vvdash$$   `\Vvdash`
* $$\bumpeq$$   `\bumpeq`
* $$\Bumpeq$$   `\Bumpeq`
* $$\geqq$$   `\geqq`
* $$\eqslantgtr$$   `\eqslantgtr`
* $$\ggg$$   `\ggg`
* $$\gtrless$$   `\gtrless`
* $$\gtreqless$$   `\gtreqless`
* $$\gtreqqless$$   `\gtreqqless`
* $$\succcurlyeq$$   `\succcurlyeq`
* $$\curlyeqsucc$$   `\curlyeqsucc`
* $$\Vdash$$   `\Vdash`
* $$\shortmid$$   `\shortmid`
* $$\between$$   `\between`
* $$\pitchfork$$   `\pitchfork`
* $$\varpropto$$   `\varpropto`
* $$\backepsilon$$   `\backepsilon`
* $$\llless$$   `\llless`
* $$\gggtr$$   `\gggtr`
* $$\doteqdot$$   `\doteqdot`
* $$\Doteq$$   `\Doteq`
* $$\eqcirc$$   `\eqcirc`
* $$\circeq$$   `\circeq`
* $$\lhd$$   `\lhd`
* $$\rhd$$   `\rhd`
* $$\lessdot$$   `\lessdot`
* $$\gtrdot$$   `\gtrdot`
* $$=$$   `=`
* $$<$$   `<`
* $$\lt$$   `\lt`
* $$>$$   `>`
* $$\gt$$   `\gt`
* $$\le$$   `\le`
* $$\leq$$   `\leq`
* $$\ge$$   `\ge`
* $$\geq$$   `\geq`
* $$\ll$$   `\ll`
* $$\gg$$   `\gg`
* $$\coloneq$$   `\coloneq`
* $$\measeq$$   `\measeq`
* $$\eqdef$$   `\eqdef`
* $$\questeq$$   `\questeq`
* $$\cong$$   `\cong`
* $$\equiv$$   `\equiv`
* $$\prec$$   `\prec`
* $$\preceq$$   `\preceq`
* $$\succ$$   `\succ`
* $$\succeq$$   `\succeq`
* $$\perp$$   `\perp`
* $$\propto$$   `\propto`
* $$\smile$$   `\smile`
* $$\frown$$   `\frown`
* $$\sim$$   `\sim`
* $$\doteq$$   `\doteq`
* $$\bowtie$$   `\bowtie`
* $$\Join$$   `\Join`
* $$\asymp$$   `\asymp`
* $$\approx$$   `\approx`
* $$\parallel$$   `\parallel`
* $$\simeq$$   `\simeq` 
* $$\ne$$ `\ne`
* $$\neq$$ `\neq`
{.command-list}


## Negated Relations

* $$\nless$$   `\nless`
* $$\nleqslant$$   `\nleqslant`
* $$\lneq$$   `\lneq`
* $$\lneqq$$   `\lneqq`
* $$\nleqq$$   `\nleqq`
* $$\lvertneqq$$   `\lvertneqq`
* $$\lnsim$$   `\lnsim`
* $$\lnapprox$$   `\lnapprox`
* $$\nprec$$   `\nprec`
* $$\npreceq$$   `\npreceq`
* $$\precnsim$$   `\precnsim`
* $$\precnapprox$$   `\precnapprox`
* $$\nsim$$   `\nsim`
* $$\nshortmid$$   `\nshortmid`
* $$\nmid$$   `\nmid`
* $$\nvdash$$   `\nvdash`
* $$\nvDash$$   `\nvDash`
* $$\ngtr$$   `\ngtr`
* $$\ngeqslant$$   `\ngeqslant`
* $$\ngeqq$$   `\ngeqq`
* $$\gneq$$   `\gneq`
* $$\gneqq$$   `\gneqq`
* $$\gvertneqq$$   `\gvertneqq`
* $$\gnsim$$   `\gnsim`
* $$\gnapprox$$   `\gnapprox`
* $$\nsucc$$   `\nsucc`
* $$\nsucceq$$   `\nsucceq`
* $$\succnsim$$   `\succnsim`
* $$\succnapprox$$   `\succnapprox`
* $$\ncong$$   `\ncong`
* $$\nshortparallel$$   `\nshortparallel`
* $$\nparallel$$   `\nparallel`
* $$\nVDash$$   `\nVDash`
* $$\nVdash$$   `\nVdash`
* $$\precneqq$$   `\precneqq`
* $$\succneqq$$   `\succneqq`
* $$\unlhd$$   `\unlhd`
* $$\unrhd$$   `\unrhd`
{.command-list}

## Sets

* $$\nsupseteqq$$   `\nsupseteqq`
* $$\supsetneq$$   `\supsetneq`
* $$\varsupsetneq$$   `\varsupsetneq`
* $$\supsetneqq$$   `\supsetneqq`
* $$\varsupsetneqq$$   `\varsupsetneqq`
* $$\nsubseteqq$$   `\nsubseteqq`
* $$\subseteqq$$   `\subseteqq`
* $$\Subset$$   `\Subset`
* $$\sqsubset$$   `\sqsubset`
* $$\supseteqq$$   `\supseteqq`
* $$\Supset$$   `\Supset`
* $$\sqsupset$$   `\sqsupset`
* $$\cap$$   `\cap`
* $$\cup$$   `\cup`
* $$\setminus$$   `\setminus`
* $$\smallsetminus$$   `\smallsetminus`
* $$\emptyset$$   `\emptyset`
* $$\sqsubseteq$$   `\sqsubseteq`
* $$\sqsupseteq$$   `\sqsupseteq`
* $$\in$$   `\in`
* $$\notin$$   `\notin`
* $$\ni$$   `\ni`
* $$\owns$$   `\owns`
* $$\subset$$   `\subset`
* $$\supset$$   `\supset`
* $$\subseteq$$   `\subseteq`
* $$\supseteq$$   `\supseteq`
* $$\subsetneq$$   `\subsetneq`
* $$\varsubsetneq$$   `\varsubsetneq`
* $$\subsetneqq$$   `\subsetneqq`
* $$\varsubsetneqq$$   `\varsubsetneqq`
* $$\nsubset$$   `\nsubset`
* $$\nsupset$$   `\nsupset`
* $$\nsubseteq$$   `\nsubseteq`
* $$\nsupseteq$$   `\nsupseteq`
* $$\varnothing$$   `\varnothing`
* $$\complement$$   `\complement` 
* $$\not$$ `\not{}`
{.command-list}



## Greek

* $$\alpha$$   `\alpha`
* $$\beta$$   `\beta`
* $$\gamma$$   `\gamma`
* $$\delta$$   `\delta`
* $$\epsilon$$   `\epsilon`
* $$\varepsilon$$   `\varepsilon`
* $$\zeta$$   `\zeta`
* $$\eta$$   `\eta`
* $$\theta$$   `\theta`
* $$\vartheta$$   `\vartheta`
* $$\iota$$   `\iota`
* $$\kappa$$   `\kappa`
* $$\varkappa$$   `\varkappa`
* $$\lambda$$   `\lambda`
* $$\mu$$   `\mu`
* $$\nu$$   `\nu`
* $$\xi$$   `\xi`
* $$\omicron$$   `\omicron`
* $$\pi$$   `\pi`
* $$\varpi$$   `\varpi`
* $$\rho$$   `\rho`
* $$\varrho$$   `\varrho`
* $$\sigma$$   `\sigma`
* $$\varsigma$$   `\varsigma`
* $$\tau$$   `\tau`
* $$\phi$$   `\phi`
* $$\varphi$$   `\varphi`
* $$\upsilon$$   `\upsilon`
* $$\chi$$   `\chi`
* $$\psi$$   `\psi`
* $$\omega$$   `\omega`
* $$\Gamma$$   `\Gamma`
* $$\Delta$$   `\Delta`
* $$\Theta$$   `\Theta`
* $$\Lambda$$   `\Lambda`
* $$\Xi$$   `\Xi`
* $$\Pi$$   `\Pi`
* $$\Sigma$$   `\Sigma`
* $$\Upsilon$$   `\Upsilon`
* $$\Phi$$   `\Phi`
* $$\Psi$$   `\Psi`
* $$\Omega$$   `\Omega`
* $$\digamma$$   `\digamma`
{.command-list}


## Hebrew

* $$\aleph$$   `\aleph`
* $$\beth$$   `\beth`
* $$\gimel$$   `\gimel`
* $$\daleth$$   `\daleth`
{.command-list}


## Letterlike Symbols

* $$@$$   `@`
* $$\mid$$   `\mid`
* $$\top$$   `\top`
* $$\bot$$   `\bot`
* $$\nabla$$   `\nabla`
* $$\partial$$   `\partial`
* $$\ell$$   `\ell`
* $$\hbar$$   `\hbar`
* $$\N$$   `\N`
* $$\R$$   `\R`
* $$\Q$$   `\Q`
* $$\C$$   `\C`
* $$\Z$$   `\Z`
* $$\P$$   `\P`
* $$\pounds$$   `\pounds`
* $$\euro$$   `\euro`
* $$\And$$   `\And`
* $$\$$$   `\$`
* $$\%$$   `\%`
* $$\differencedelta$$   `\differencedelta`
* $$\wp$$   `\wp`
* $$\hslash$$   `\hslash`
* $$\Finv$$   `\Finv`
* $$\Game$$   `\Game`
* $$\eth$$   `\eth`
* $$\mho$$   `\mho`
* $$\Bbbk$$   `\Bbbk`
* $$\yen$$   `\yen`
* $$\imath$$   `\imath`
* $$\jmath$$   `\jmath`
* $$\degree$$   `\degree` 
* $$\Re$$ `\Re`
* $$\Im$$ `\Im`
{.command-list}



## Delimiters

* $$\lparen$$   `\lparen`
* $$\rparen$$   `\rparen`
* $$\lbrace$$   `\lbrace`
* $$\rbrace$$   `\rbrace`
* $$\langle$$   `\langle`
* $$\rangle$$   `\rangle`
* $$\lfloor$$   `\lfloor`
* $$\rfloor$$   `\rfloor`
* $$\lceil$$   `\lceil`
* $$\rceil$$   `\rceil`
* $$\vert$$   `\vert`
* $$\lvert$$   `\lvert`
* $$\rvert$$   `\rvert`
* $$\|$$   `\|`
* $$\Vert$$   `\Vert`
* $$\mVert$$   `\mVert`
* $$\lVert$$   `\lVert`
* $$\rVert$$   `\rVert`
* $$\lbrack$$   `\lbrack`
* $$\rbrack$$   `\rbrack`
* $$ \{ $$   `\{`
* $$\}$$   `\}`
* $$($$   `(`
* $$)$$   `)`
* $$[$$   `[`
* $$]$$   `]`
* $$\ulcorner$$   `\ulcorner`
* $$\urcorner$$   `\urcorner`
* $$\llcorner$$   `\llcorner`
* $$\lrcorner$$   `\lrcorner`
* $$\lgroup$$   `\lgroup`
* $$\rgroup$$   `\rgroup`
* $$\lmoustache$$   `\lmoustache`
* $$\rmoustache$$   `\rmoustache`
* $$\mvert$$   `\mvert`
{.command-list}



## Punctuation

* $$.$$   `.`
* $$?$$   `?`
* $$!$$   `!`
* $$:$$   `:`
* $$\Colon$$   `\Colon`
* $$\colon$$   `\colon`
* $$\cdotp$$   `\cdotp`
* $$\vdots$$   `\vdots`
* $$\ldotp$$   `\ldotp`
* $$,$$   `,`
* $$;$$   `;`
* $$\cdots$$   `\cdots`
* $$\ddots$$   `\ddots`
* $$\ldots$$   `\ldots`
* $$\mathellipsis$$   `\mathellipsis`
* $$"$$   `"`
{.command-list}



## Boxes

* $$\boxminus$$   `\boxminus`
* $$\boxplus$$   `\boxplus`
* $$\boxtimes$$   `\boxtimes`
* $$\boxdot$$   `\boxdot`
* $$\square$$   `\square`
* $$\Box$$   `\Box`
* $$\blacksquare$$   `\blacksquare`
{.command-list}


## Circles

* $$\circ$$   `\circ`
* $$\bigcirc$$   `\bigcirc`
* $$\bullet$$   `\bullet`
* $$\oplus$$   `\oplus`
* $$\ominus$$   `\ominus`
* $$\otimes$$   `\otimes`
* $$\odot$$   `\odot`
* $$\oslash$$   `\oslash`
* $$\circleddash$$   `\circleddash`
* $$\circledast$$   `\circledast`
* $$\circledcirc$$   `\circledcirc`
* $$\circledS$$   `\circledS`
* $$\circledR$$   `\circledR`
{.command-list}


## Triangles

* $$\vartriangle$$   `\vartriangle`
* $$\triangleq$$   `\triangleq`
* $$\vartriangleleft$$   `\vartriangleleft`
* $$\trianglelefteq$$   `\trianglelefteq`
* $$\ntriangleleft$$   `\ntriangleleft`
* $$\ntrianglelefteq$$   `\ntrianglelefteq`
* $$\vartriangleright$$   `\vartriangleright`
* $$\trianglerighteq$$   `\trianglerighteq`
* $$\ntriangleright$$   `\ntriangleright`
* $$\ntrianglerighteq$$   `\ntrianglerighteq`
* $$\blacktriangleleft$$   `\blacktriangleleft`
* $$\blacktriangleright$$   `\blacktriangleright`
* $$\bigtriangleup$$   `\bigtriangleup`
* $$\bigtriangledown$$   `\bigtriangledown`
* $$\triangleleft$$   `\triangleleft`
* $$\triangleright$$   `\triangleright`
* $$\triangle$$   `\triangle`
* $$\blacktriangle$$   `\blacktriangle`
* $$\triangledown$$   `\triangledown`
* $$\blacktriangledown$$   `\blacktriangledown`
{.command-list}


## Shapes

* $$\ast$$   `\ast`
* $$\star$$   `\star`
* $$\diamond$$   `\diamond`
* $$\Diamond$$   `\Diamond`
* $$\lozenge$$   `\lozenge`
* $$\blacklozenge$$   `\blacklozenge`
{.command-list}


## Crosses

* $$\dagger$$   `\dagger`
* $$\dag$$   `\dag`
* $$\ddag$$   `\ddag`
* $$\ddagger$$   `\ddagger`
* $$\maltese$$   `\maltese`
{.command-list}


## Accents

* $$\~{n}$$   `\~` 
* $$\acute{\unicode{"2B1A}}$$ `\acute{}`
* $$\grave{\unicode{"2B1A}}$$ `\grave{}`
* $$\dot{\unicode{"2B1A}}$$ `\dot{}`
* $$\ddot{\unicode{"2B1A}}$$ `\ddot{}`
* $$\mathring{\unicode{"2B1A}}$$ `\mathring{}`
* $$\tilde{\unicode{"2B1A}}$$ `\tilde{}`
* $$\bar{\unicode{"2B1A}}$$ `\bar{}`
* $$\breve{\unicode{"2B1A}}$$ `\breve{}`
* $$\check{\unicode{"2B1A}}$$ `\check{}`
* $$\hat{\unicode{"2B1A}}$$ `\hat{}`
* $$\vec$$ `\vec{}`
* $$\^{e}$$ `\^{}`
* $$\`{e}$$ `\`{}`
* $$\'{e}$$ `\'{}`
* $$\~{n}$$ `\~{}`
* $$\c{c}$$ `\c{}`
{.command-list}

## Layout

* $$x=\mathop{arg}=0$$ `\mathop{}`
* $$x=\mathbin{arg}=0$$ `\mathbin{}`
* $$x=\mathrel{arg}=0$$ `\mathrel{}`
* $$x=\mathopen{arg}=0$$ `\mathopen{}`
* $$x=\mathclose{arg}=0$$ `\mathclose{}`
* $$x=\mathpunct{arg}=0$$ `\mathpunct{}`
* $$x=\mathord{arg}=0$$ `\mathord{}`
* $$x=\mathinner{arg}=0$$ `\mathinner{}`
* $$x=\operatorname{arg}=0$$ `\operatorname{}`
* $$x=\operatorname*{arg}=0$$ `\operatorname*{}`
* $$\overset{arg}{x=0}$$ `\overset{}{}`
* $$\underset{arg}{x=0}$$ `\underset{}{}`
* $$\stackrel{arg}{x=0}$$ `\stackrel[]{}{}`
* $$\stackbin{arg}{x=0}$$ `\stackbin[]{}{}`
* $$\rlap{/}0$$ `\rlap{}`
* $$o\llap{/}$$ `\llap{}`
* $$o\mathllap{/}$$ `\mathllap{}`
* $$\mathrlap{/}0$$ `\mathrlap{}`
* $$\left\{x\middle|x>0\right\}$$ `\middle{}`
{.command-list}

## Spacing

* $$\unicode{"203A}\hspace{1em}\unicode{"2039}$$ `\hspace{}`
* $$\unicode{"203A}\hspace*{1em}\unicode{"2039}$$ `\hspace*{}`
* $$\unicode{"203A}\!\unicode{"2039}$$ `\!`
* $$\unicode{"203A}\,\unicode{"2039}$$ `\,`
* $$\unicode{"203A}\:\unicode{"2039}$$ `\:`
* $$\unicode{"203A}\;\unicode{"2039}$$ `\;`
* $$\unicode{"203A}\enskip\unicode{"2039}$$ `\enskip`
* $$\unicode{"203A}\enspace\unicode{"2039}$$ `\enspace`
* $$\unicode{"203A}\qquad\unicode{"2039}$$ `\qquad`
{.command-list}


## Decoration
* $${\color{m0}A}{\color{m1}B}{\color{m2}C }{\color{m3}a}{\color{m4}b}{\color{m5}c}{\color{m6}8}$$ `\color{}`
* $${\textcolor{m0}A}{\textcolor{m1}B}{\textcolor{m2}C }{\textcolor{m3}a}{\textcolor{m4}b}{\textcolor{m5}c}{\textcolor{m6}8}$$ `\textcolor{}{}`
* $$\boxed{\unicode{"2B1A}}$$ `\boxed{}`
* $$\colorbox{#fbc0bd}{\unicode{"2B1A}}$$ `\colorbox{}{}`
* $$\fcolorbox{#cd0030}{#ffd400}{\unicode{"2B1A}}$$ `\fcolorbox{}{}{}`
* $$\bbox[#ffd400, solid 2px #ffd400]{\unicode{"2B1A}}$$ `\bbox[]{}`
* $$\rule{2em}{1em}$$ `\rule[]{}{}`
* $$\overline{\unicode{"2B1A}}$$ `\overline{}`
* $$\underline{\unicode{"2B1A}}$$ `\underline{}`
* $$\enclose{updiagonalstrike,roundedbox}[1px solid red, mathbackground="#fbc0bd"]{x=0}$$ `\enclose{}[]{}`
* $$\cancel{\unicode{"2B1A}}$$ `\cancel{}`
* $$\bcancel{\unicode{"2B1A}}$$ `\bcancel{}`
* $$\xcancel{\unicode{"2B1A}}$$ `\xcancel{}`
{.command-list}


## Styling

* $$\text{\fontseries{b}Don Knuth}$$ `\fontseries{}`
* $$\text{\fontshape{sc}Don Knuth}$$ `\fontshape{}`
* $$\text{\fontfamily{cmtt}Don Knuth}$$ `\fontfamily{}`
* $$\text{\selectfont}$$ `\selectfont`
* $${\bf Don Knuth}$$ `\bf`
* $$\boldsymbol{Don Knuth}$$ `\boldsymbol{}`
* $$\bm{Don Knuth}$$ `\bm{}`
* $$\bold{Don Knuth}$$ `\bold{}`
* $$\text{\bfseries Don Knuth}$$ `\bfseries`
* $$\text{\mdseries Don Knuth}$$ `\mdseries`
* $$\text{\upshape Don Knuth}$$ `\upshape`
* $$\text{\slshape Don Knuth}$$ `\slshape`
* $$\text{\scshape Don Knuth}$$ `\scshape`
* $$\textbf{Don Knuth}$$ `\textbf{}`
* $$\textmd{Don Knuth}$$ `\textmd{}`
* $$\textup{Don Knuth}$$ `\textup{}`
* $$\textnormal{Don Knuth}$$ `\textnormal{}`
* $$\textsl{Don Knuth}$$ `\textsl{}`
* $$\textit{Don Knuth}$$ `\textit{}`
* $$\textsc{Don Knuth}$$ `\textsc{}`
* $$\textrm{Don Knuth}$$ `\textrm{}`
* $$\textsf{Don Knuth}$$ `\textsf{}`
* $$\texttt{Don Knuth}$$ `\texttt{}`
* $$\mathbf{Don Knuth}$$ `\mathbf{}`
* $$\mathit{Don Knuth}$$ `\mathit{}`
* $$\mathrm{Don Knuth}$$ `\mathrm{}`
* $$\mathsf{Don Knuth}$$ `\mathsf{}`
* $$\mathtt{Don Knuth}$$ `\mathtt{}`
* $${\it Don Knuth}$$ `\it`
* $${\rmfamily Don Knuth}$$ `\rmfamily`
* $${\sffamily Don Knuth}$$ `\sffamily`
* $${\ttfamily Don Knuth}$$ `\ttfamily`
* $$\Bbb{Don Knuth}$$ `\Bbb{}`
* $$\mathbb{Don Knuth}$$ `\mathbb{}`
* $${\frak Don Knuth}$$ `\frak{}`
* $$\mathfrak{Don Knuth}$$ `\mathfrak{}`
* $$\mathcal{Don Knuth}$$ `\mathcal{}`
* $$\mathscr{Don Knuth}$$ `\mathscr{}`
* $$\mbox{Don Knuth}$$ `\mbox{}`
* $$\text{Don Knuth}$$ `\text{}`
* $$\class{testIdentifier}{Don Knuth}$$ `\class{}{}`
* $$\cssId{testIdentifier}{Don Knuth}$$ `\cssId{}{}`
* $${\htmlData Don Knuth}$$ `\htmlData{}{}`
* $$Don{\em Knuth}$$ `\em{}`
* $$Don\emph{Knuth}$$ `\emph{}`
{.command-list}


## Sizing

* $$\tiny{x=0}$$ `\tiny`
* $$\scriptsize{x=0}$$ `\scriptsize`
* $$\footnotesize{x=0}$$ `\footnotesize`
* $$\small{x=0}$$ `\small`
* $$\normalsize{x=0}$$ `\normalsize`
* $$\large{x=0}$$ `\large`
* $$\Large{x=0}$$ `\Large`
* $$\LARGE{x=0}$$ `\LARGE`
* $$\huge{x=0}$$ `\huge`
* $$\Huge{x=0}$$ `\Huge`
{.command-list}

---

* $$\bigl($$ `\bigl{}`
* $$\bigr)$$ `\bigr{}`
* $$\bigm|$$ `\bigm{}`
{.command-list}



* $$\Bigl($$ `\Bigl{}`
* $$\Bigr)$$ `\Bigr{}`
* $$\Bigm|$$ `\Bigm{}`
{.command-list}


* $$\biggl($$ `\biggl{}`
* $$\biggr)$$ `\biggr{}`
* $$\biggm|$$ `\biggm{}`
{.command-list}



* $$\Biggl($$ `\Biggl{}`
* $$\Biggr)$$ `\Biggr{}`
* $$\Biggm|$$ `\Biggm{}`
{.command-list}



* $$\big(\big)$$ `\big{}`
* $$\Big(\Big)$$ `\Big{}`
* $$\bigg(\bigg)$$ `\bigg{}`
* $$\Bigg(\Bigg)$$ `\Bigg{}`
{.command-list}



## Various

* $$/$$   `/`
* $$\sharp$$   `\sharp`
* $$\flat$$   `\flat`
* $$\natural$$   `\natural`
* $$\#$$   `\#`
* $$\&$$   `\&`
* $$\clubsuit$$   `\clubsuit`
* $$\heartsuit$$   `\heartsuit`
* $$\spadesuit$$   `\spadesuit`
* $$\diamondsuit$$   `\diamondsuit`
* $$\backslash$$   `\backslash`
* $$\infty$$   `\infty`
* $$\prime$$   `\prime`
* $$\doubleprime$$   `\doubleprime`
* $$\angle$$   `\angle`
* $$\_$$   `\_`
* $$\checkmark$$   `\checkmark`
* $$\diagup$$   `\diagup`
* $$\measuredangle$$   `\measuredangle`
* $$\sphericalangle$$   `\sphericalangle`
* $$\backprime$$   `\backprime`
* $$\backdoubleprime$$   `\backdoubleprime`
* $$\/$$   `\/`
* $$|$$   `|`
* $$'$$   `'` 
* $$\originalof$$   `\originalof`
* $$\laplace$$   `\laplace`
* $$\imageof$$   `\imageof`
* $$\Laplace$$   `\Laplace`
* $$−$$   `−`
* $$`$$   ```
* $$\ $$   `\ `
* $$~$$   `~`
* $$\space$$   `\space` 
{.command-list}


* $$\ensuremath$$ `\ensuremath{}`
* $$\displaystyle$$ `\displaystyle{}`
* $$\textstyle$$ `\textstyle{}`
* $$\scriptstyle$$ `\scriptstyle{}`
* $$\scriptscriptstyle$$ `\scriptscriptstyle{}`
* $$\mathbfit$$ `\mathbfit{}`
* $$\overunderset$$ `\overunderset{}{}{}`
* $$\smash$$ `\smash[]{}`
* $$\vphantom$$ `\vphantom{}`
* $$\hphantom$$ `\hphantom{}`
* $$\phantom$$ `\phantom{}`
* $$\inf$$ `\inf`
* $$\Pr$$ `\Pr`
* $$\sup$$ `\sup`
* $$\liminf$$ `\liminf`
* $$\limsup$$ `\limsup`
* $$\ce$$ `\ce{}`
* $$\pu$$ `\pu{}`
* $$\quad$$ `\quad`
{.command-list}

## Chemistry

MathLive  supports the [`mhchem` package](https://mhchem.github.io/MathJax-mhchem/).

### Chemical Formulae
* $$\ce{H2O}$$ `\ce{H2O}$`
* $$\ce{Sb2O3}$$ `\ce{Sb2O3}`



### Charges
* $$\ce{[AgCl2]-}$$ `\ce{[AgCl2]-}`
* $$\ce{Y^99+}$$ `\ce{Y^99+}`
* $$\ce{Y^{99+}}$$ `\ce{Y^{99+}}`
* $$\ce{H+}$$ `\ce{H+}`
* $$\ce{CrO4^2-}$$ `\ce{CrO4^2-}`


### Stoichiometric numbers
* $$\ce{2 H2O}$$ `\ce{2 H2O}`
* $$\ce{2H2O}$$ `\ce{2H2O}`
* $$\ce{0.5 H2O}$$ `\ce{0.5 H2O}`
* $$\ce{1/2 H2O}$$ `\ce{1/2 H2O}`
* $$\ce{(1/2) H2O}$$ `\ce{(1/2) H2O}`
* $$\ce{$n$ H2O}$$ `\ce{$n$ H2O}`

### Isotopes


* $$\ce{^{227}_{90}Th+}$$ `\ce{^{227}_{90}Th+}`
* $$\ce{^227_90Th+}$$ `\ce{^227_90Th+}`
* $$\ce{^{0}_{-1}n^{-}}$$  `\ce{^{0}_{-1}n^{-}}`
* $$\ce{^0_-1n-}$$ `\ce{^0_-1n-}`
* $$\ce{H{}^3HO}$$ `\ce{H{}^3HO}`
* $$\ce{H^3HO}$$ `\ce{H^3HO}`

### Complex Examples

* $$\ce{CO2 + C -> 2 CO}$$ <br>  `\ce{CO2 + C -> 2 CO}`
* $$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$$ <br>   `\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}`
* $$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$$ <br>   `C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}`
* $$\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}$$ <br>  `\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}`
* $$\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}$$  <br>  `\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}`
* $$\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}$$ <br>  `\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}`
* $$\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}$$ <br>   `\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}`


## Macros

* $$\iff$$	`\iff`
* $$\nicefrac{3}{4}$$	`\nicefrac{3}{4}`
* $$\bra{\Psi}$$	`\bra{\Psi}`
* $$\ket{\Psi}$$	`\ket{\Psi}`	
* $$\braket{ab}$$	`\braket{}`
* $$\set{ab}$$	`\set{}`
* $$\Bra{ab}$$	`\Bra{}`
* $$\Ket{ab}$$	`\Ket{}`
* $$\Braket{ab}$$	`\Braket{}`
* $$\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 } $$	`\Set{ x\in\mathbf{R}^2 | 0<{|x|}<5 } `
* $$\rd$$	`\rd`
* $$\rD$$	`\rD`
* $$\doubleStruckCapitalN$$	`\doubleStruckCapitalN`
* $$\doubleStruckCapitalR$$	`\doubleStruckCapitalR`
* $$\doubleStruckCapitalQ$$	`\doubleStruckCapitalQ`
* $$\doubleStruckCapitalZ$$	`\doubleStruckCapitalZ`
* $$\doubleStruckCapitalP$$	`\doubleStruckCapitalP`
* $$\scriptCapitalE$$	`\scriptCapitalE`
* $$\scriptCapitalH$$	`\scriptCapitalH`
* $$\scriptCapitalL$$	`\scriptCapitalL`
* $$\gothicCapitalC$$	`\gothicCapitalC`
* $$\gothicCapitalH$$	`\gothicCapitalH`
* $$\gothicCapitalI$$	`\gothicCapitalI`
* $$\gothicCapitalR$$	`\gothicCapitalR`
* $$\imaginaryI$$	`\imaginaryI`
* $$\imaginaryJ$$	`\imaginaryJ`
* $$\exponentialE$$	`\exponentialE`
* $$\differentialD$$	`\differentialD`
* $$\capitalDifferentialD$$	`\capitalDifferentialD`
{.command-list}


## Environments

* `$$\begin{math}\text{first}\end{math}$$`

* `$$\begin{displaymath}\text{first}\end{displaymath}$$`

* $$\begin{array}{lclc}a & b \\c & \frac{1}{d}\end{array}$$`\​begin{array}...\end{array}`

* $$\begin{equation}a & b \\c & \frac{1}{d}\end{equation}$$`\​begin{equation}...\end{equation}`

* $$\begin{subequations}a & b \\c & \frac{1}{d}\end{subequations}$$`\​begin{subequations}...\end{subequations}`

* $$\begin{multline}a & b \\c & \frac{1}{d}\end{multline}$$`\​begin{multline}...\end{multline}`

* $$\begin{align}a & b \\c & \frac{1}{d}\end{align}$$`\​begin{align}...\end{align}`

* $$\begin{align*}a & b \\c & \frac{1}{d}\end{align*}$$`\​begin{align*}...\end{align*}`

* $$\begin{aligned}a & b \\c & \frac{1}{d}\end{aligned}$$`\​begin{aligned}...\end{aligned}`

* $$\begin{eqnarray}a & b \\c & \frac{1}{d}\end{eqnarray}$$`\​begin{eqnarray}...\end{eqnarray}`

* $$\begin{split}a & b \\c & \frac{1}{d}\end{split}$$`\​begin{split}...\end{split}`

* $$\begin{gather}a & b \\c & \frac{1}{d}\end{gather}$$`\​begin{gather}...\end{gather}`

* $$\begin{gathered}a & b \\c & \frac{1}{d}\end{gathered}$$`\​begin{gathered}...\end{gathered}`

* $$\begin{matrix}a & b \\c & \frac{1}{d}\end{matrix}$$`\​begin{matrix}...\end{matrix}`

* $$\begin{pmatrix}a & b \\c & \frac{1}{d}\end{pmatrix}$$`\​begin{pmatrix}...\end{pmatrix}`

* $$\begin{bmatrix}a & b \\c & \frac{1}{d}\end{bmatrix}$$`\​begin{bmatrix}...\end{bmatrix}`

* $$\begin{Bmatrix}a & b \\c & \frac{1}{d}\end{Bmatrix}$$`\​begin{Bmatrix}...\end{Bmatrix}`

* $$\begin{vmatrix}a & b \\c & \frac{1}{d}\end{vmatrix}$$`\​begin{vmatrix}...\end{vmatrix}`

* $$\begin{Vmatrix}a & b \\c & \frac{1}{d}\end{Vmatrix}$$`\​begin{Vmatrix}...\end{Vmatrix}`

* $$\begin{matrix*}a & b \\c & \frac{1}{d}\end{matrix*}$$`\​begin{matrix*}...\end{matrix*}`

* $$\begin{pmatrix*}a & b \\c & \frac{1}{d}\end{pmatrix*}$$`\​begin{pmatrix*}...\end{pmatrix*}`

* $$\begin{bmatrix*}a & b \\c & \frac{1}{d}\end{bmatrix*}$$`\​begin{bmatrix*}...\end{bmatrix*}`

* $$\begin{Bmatrix*}a & b \\c & \frac{1}{d}\end{Bmatrix*}$$`\​begin{Bmatrix*}...\end{Bmatrix*}`

* $$\begin{vmatrix*}a & b \\c & \frac{1}{d}\end{vmatrix*}$$`\​begin{vmatrix*}...\end{vmatrix*}`

* $$\begin{Vmatrix*}a & b \\c & \frac{1}{d}\end{Vmatrix*}$$`\​begin{Vmatrix*}...\end{Vmatrix*}`

* $$\begin{smallmatrix}a & b \\c & \frac{1}{d}\end{smallmatrix}$$`\​begin{smallmatrix}...\end{smallmatrix}`

* $$\begin{smallmatrix*}a & b \\c & \frac{1}{d}\end{smallmatrix*}$$`\​begin{smallmatrix*}...\end{smallmatrix*}`

* $$\begin{cases}a & b \\c & \frac{1}{d}\end{cases}$$`\​begin{cases}...\end{cases}`

* $$\begin{dcases}a & b \\c & \frac{1}{d}\end{dcases}$$`\​begin{dcases}...\end{dcases}`

* $$\begin{rcases}a & b \\c & \frac{1}{d}\end{rcases}$$`\​begin{rcases}...\end{rcases}`

* `$$\begin{center}\text{first}\end{center}$$`



## TeX Internals

* `\limits` and `\nolimits`
* `\relax`
* `\noexpand`
* `\obeyspaces`
* `\bgroup` and `\egroup`
* `\string`
* `\csname` and `\endcsname`
