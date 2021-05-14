---
layout: single
date: Last Modified
title: MathLive Reference - Keyboard Shortcuts
permalink: /mathlive/reference/keybindings/
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

## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.



### All Modes

The shortcuts apply in all modes.

| Keybinding | Result | OS |
| :--- | :--- | ---: |
| `⇠` | move to previous char | |
| `⇢` | move to next char | |
| `⇡` | move up | |
| `⇣` | move down | |
| `⇧⇠` | extend selection backward | |
| `⇧⇢` | extend selection forward | |
| `⇧⇡` | extend selection upward | |
| `⇧⇣` | extend selection downward | |
| `⌫` | delete backward | |
| `⌥⌦` | 〃 | |
| `⌦` | delete forward | |
| `⌥⌫` | 〃 | |
| `⌥⇠` | move to previous word | |
| `⌥⇢` | move to next word | |
| `⇧⌥⇠` | extend to previous word | |
| `⇧⌥⇢` | extend to next word | |
| `⌃⇠` | move to group start | |
| `⌃⇢` | move to group end | |
| `⇧⌃⇠` | extend to group start | |
| `⇧⌃⇢` | extend to group end | |
| `space` | move after parent | |
| `⇧space` | move before parent | |
| `⤒` | move to math field start | |
| `⌘⇠` | 〃 | |
| `⇧⤒` | extend to math field start | |
| `⇧⌘⇠` | 〃 | |
| `⤓` | move to math field end | |
| `⌘⇢` | 〃 | |
| `⇧⤓` | extend to math field end | |
| `⇧⌘⇢` | 〃 | |
| `⇞` | move to group start | |
| `⇟` | move to group end | |
| `⇥` | move to next placeholder | |
| `⇧⇥` | move to previous placeholder | |
| `⇥` | move to next placeholder | |
| `⇧⇥` | move to previous placeholder | |
| `esc` | switchMode("latex") | |
| `esc` | 〃 | |
| `\` | 〃 | |
| `[INTLBACKSLASH]` | 〃 | |
| `⌥=` | applyStyle({"mode":"text"}) | |
| `⌥=` | 〃 | |
| `esc` | complete("complete") | |
| `⇥` | complete("accept-suggestion") | |
| `⏎` | complete | |
| `⌤` | 〃 | |
| `⇧esc` | complete("reject") | |
| `⇣` | next suggestion | |
| `⇡` | previous suggestion | |
| `⌃A` | select all | |
| `⌘A` | 〃 | |
| `[CUT]` | cut to clipboard | |
| `[COPY]` | copy to clipboard | |
| `[PASTE]` | paste from clipboard | |
| `[CLEAR]` | delete backward | |
| `⌃Z` | undo | |
| `⌘Z` | 〃 | |
| `[UNDO]` | 〃 | |
| `⌃Y` | redo | |
| `⇧⌘Y` | 〃 | |
| `⇧⌃Z` | 〃 | |
| `⇧⌘Z` | 〃 | |
| `[REDO]` | 〃 | |
| `[ERASEEOF]` | delete to group end | |
| `⌃B` | move to previous char | |
| `⌃F` | move to next char | |
| `⌃P` | move up | |
| `⌃N` | move down | |
| `⌃A` | move to math field start | |
| `⌃E` | move to math field end | |
| `⇧⌃B` | extend selection backward | |
| `⇧⌃F` | extend selection forward | |
| `⇧⌃P` | extend selection upward | |
| `⇧⌃N` | extend selection downward | |
| `⇧⌃A` | extend to math field start | |
| `⇧⌃E` | extend to math field end | |
| `⌥⌃B` | move to previous word | |
| `⌥⌃F` | move to next word | |
| `⇧⌥⌃B` | extend to previous word | |
| `⇧⌥⌃F` | extend to next word | |
| `⌃H` | delete backward | |
| `⌃D` | delete forward | |
| `⌃L` | scroll into view | |
| `⇧[QUOTE]` | switchMode("text") | |
| `⇧[QUOTE]` | switchMode("math") | |
| `⌃2` | $$\sqrt{#0}$$  —`$$\sqrt{#0}$$` | |
| `⌃5` | move to opposite | |
| `⌃6` | move to superscript | |
| `⌃-` | move to subscript | |
| `⌥[` | $$\left\lbrack #0 \right\rbrack$$  —`$$\left\lbrack #0 \right\rbrack$$` | |
| `⇧⌥[` | $$\left\lbrace #0 \right\rbrace$$  —`$$\left\lbrace #0 \right\rbrace$$` | |
| `⌃⏎` | add row after | |
| `⌃⌤` | 〃 | |
| `⌘⏎` | 〃 | |
| `⌘⌤` | 〃 | |
| `⌃;` | 〃 | |
| `⌘;` | 〃 | |
| `⇧⌃;` | add row before | |
| `⇧⌘;` | 〃 | |
| `⌃,` | add column after | |
| `⌘,` | 〃 | |
| `⇧⌃,` | 〃 | |
| `⇧⌘,` | 〃 | |
| `⌥P` | $$\pi$$  —`$$\pi$$` | |
| `⌥V` | $$\sqrt{#0}$$  —`$$\sqrt{#0}$$` | |
| `⌥W` | $$\sum_{i=#?}^{#?}$$  —`$$\sum_{i=#?}^{#?}$$` | |
| `⌥B` | $$\int_{#?}^{#?}$$  —`$$\int_{#?}^{#?}$$` | |
| `⌥U` | $$\cup$$  —`$$\cup$$` | |
| `⌥N` | $$\cap$$  —`$$\cap$$` | |
| `⌥O` | $$\emptyset$$  —`$$\emptyset$$` | |
| `⌥D` | $$\differentialD$$  —`$$\differentialD$$` | |
| `⇧⌥O` | $$\varnothing$$  —`$$\varnothing$$` | |
| `⇧⌥D` | $$\partial$$  —`$$\partial$$` | |
| `⇧⌥P` | $$\prod_{i=#?}^{#?}$$  —`$$\prod_{i=#?}^{#?}$$` | |
| `⇧⌥U` | $$\bigcup$$  —`$$\bigcup$$` | |
| `⇧⌥N` | $$\bigcap$$  —`$$\bigcap$$` | |
| `⇧⌥A` | $$\forall$$  —`$$\forall$$` | |
| `⇧⌥E` | $$\exists$$  —`$$\exists$$` | |
| `⌥5` | $$$\infty$$  —`$\infty$$` | |
| `⌥6` | $$\wedge$$  —`$$\wedge$$` | |
| `⇧⌥6` | $$\vee$$  —`$$\vee$$` | |
| `⌥9` | $$($$  —`(` | |
| `⌥0` | $$)$$  —`)` | |
| `⌥|` | $$|$$  —`|` | |
| `⌥\` | $$\backslash$$  —`$$\backslash$$` | |
| `/` | $$\frac{\unicode{"2B1A}}{#?}$$  —`$$\frac{#@}{#?}$$` | |
| `⌥/` | $$\/$$  —`$$\/$$` | |
| `[NUMPADDIVIDE]` | $$\frac{\unicode{"2B1A}}{#?}$$  —`$$\frac{#@}{#?}$$` | |
| `⌥[NUMPADDIVIDE]` | $$\frac{#?}{\unicode{"2B1A}}$$  —`\frac{#?}{#@}` | |
| `⇧[BACKQUOTE]` | $$\~$$  —`$$\~$$` | |
| `⇧⌥K` | toggle keystroke caption | |
| `⌥space` | toggle virtual keyboard | |
| `⌥⌃⇡` | speak("parent") | |
| `⌥⌃⇣` | speak("all") | ||


### Math Mode Only

| Keybinding | Result | OS |
| :--- | :--- | ---: |
| `space` | move after parent | |
| `⇧space` | move before parent | |
| `⇥` | move to next placeholder | |
| `⇧⇥` | move to previous placeholder | |
| `esc` | switchMode("latex") | |
| `\` | 〃 | |
| `[INTLBACKSLASH]` | 〃 | |
| `⌥=` | applyStyle({"mode":"text"}) | |
| `⇧[QUOTE]` | switchMode("text") | |
| `⌃2` | $$\sqrt{#0}$$  —`$$\sqrt{#0}$$` | |
| `⌃5` | move to opposite | |
| `⌃6` | move to superscript | |
| `⌃-` | move to subscript | |
| `⌥[` | $$\left\lbrack #0 \right\rbrack$$  —`$$\left\lbrack #0 \right\rbrack$$` | |
| `⇧⌥[` | $$\left\lbrace #0 \right\rbrace$$  —`$$\left\lbrace #0 \right\rbrace$$` | |
| `⌃⏎` | add row after | |
| `⌃⌤` | 〃 | |
| `⌘⏎` | 〃 | |
| `⌘⌤` | 〃 | |
| `⌃;` | 〃 | |
| `⌘;` | 〃 | |
| `⇧⌃;` | add row before | |
| `⇧⌘;` | 〃 | |
| `⌃,` | add column after | |
| `⌘,` | 〃 | |
| `⇧⌃,` | 〃 | |
| `⇧⌘,` | 〃 | |
| `⌥P` | $$\pi$$  —`$$\pi$$` | |
| `⌥V` | $$\sqrt{#0}$$  —`$$\sqrt{#0}$$` | |
| `⌥W` | $$\sum_{i=#?}^{#?}$$  —`$$\sum_{i=#?}^{#?}$$` | |
| `⌥U` | $$\cup$$  —`$$\cup$$` | |
| `⌥N` | $$\cap$$  —`$$\cap$$` | |
| `⌥O` | $$\emptyset$$  —`$$\emptyset$$` | |
| `⌥D` | $$\differentialD$$  —`$$\differentialD$$` | |
| `⇧⌥O` | $$\varnothing$$  —`$$\varnothing$$` | |
| `⇧⌥D` | $$\partial$$  —`$$\partial$$` | |
| `⇧⌥P` | $$\prod_{i=#?}^{#?}$$  —`$$\prod_{i=#?}^{#?}$$` | |
| `⇧⌥U` | $$\bigcup$$  —`$$\bigcup$$` | |
| `⇧⌥N` | $$\bigcap$$  —`$$\bigcap$$` | |
| `⇧⌥A` | $$\forall$$  —`$$\forall$$` | |
| `⇧⌥E` | $$\exists$$  —`$$\exists$$` | |
| `⌥5` | $$$\infty$$  —`$\infty$$` | |
| `⌥6` | $$\wedge$$  —`$$\wedge$$` | |
| `⇧⌥6` | $$\vee$$  —`$$\vee$$` | |
| `⌥9` | $$($$  —`(` | |
| `⌥0` | $$)$$  —`)` | |
| `⌥|` | $$|$$  —`|` | |
| `⌥\` | $$\backslash$$  —`$$\backslash$$` | |
| `/` | $$\frac{\unicode{"2B1A}}{#?}$$  —`$$\frac{#@}{#?}$$` | |
| `⌥/` | $$\/$$  —`$$\/$$` | |
| `[NUMPADDIVIDE]` | $$\frac{\unicode{"2B1A}}{#?}$$  —`$$\frac{#@}{#?}$$` | |
| `⌥[NUMPADDIVIDE]` | $$\frac{#?}{\unicode{"2B1A}}$$  —`\frac{#?}{#@}` | |
| `⇧[BACKQUOTE]` | $$\~$$  —`$$\~$$` | ||


## Inline Shortcuts

Some sequence of characters can be automatically translated to symbols. For example, typing p followed by i will result in "π".

If the conversion was not desired, for example you actually meant "pi", type ctrl/⌘ Z to undo it.

| Trigger | Result |
| :--- | :--- |
| `%` | $$\%$$ `\%` |
| `''` | $$^{\doubleprime}$$ `^{\doubleprime}` |
| `alpha` | $$\alpha$$ `\alpha` |
| `delta` | $$\delta$$ `\delta` |
| `Delta` | $$\Delta$$ `\Delta` |
| `pi` | $$\pi$$ `\pi` |
| `pi ` | $$\pi $$ `\pi ` |
| `Pi` | $$\Pi$$ `\Pi` |
| `theta` | $$\theta$$ `\theta` |
| `Theta` | $$\Theta$$ `\Theta` |
| `ii` | $$\imaginaryI$$ `\imaginaryI` |
| `jj` | $$\imaginaryJ$$ `\imaginaryJ` |
| `ee` | $$\exponentialE$$ `\exponentialE` |
| `nabla` | $$\nabla$$ `\nabla` |
| `grad` | $$\nabla$$ `\nabla` |
| `del` | $$\partial$$ `\partial` |
| `infty` | $$\infty$$ `\infty` |
| `∞` | $$\infty$$ `\infty` |
| `oo` | $$\infty$$ `\infty` |
| `∑` | $$\sum$$ `\sum` |
| `sum` | $$\sum_{#?}^{#?}$$ `\sum_{#?}^{#?}` |
| `int` | $$\int_{#?}^{#?}$$ `\int_{#?}^{#?}` |
| `prod` | $$\prod_{#?}^{#?}$$ `\prod_{#?}^{#?}` |
| `sqrt` | $$\sqrt{#?}$$ `\sqrt{#?}` |
| `∆` | $$\differentialD$$ `\differentialD` |
| `∂` | $$\differentialD$$ `\differentialD` |
| `arcsin` | $$\arcsin$$ `\arcsin` |
| `arccos` | $$\arccos$$ `\arccos` |
| `arctan` | $$\arctan$$ `\arctan` |
| `sin` | $$\sin$$ `\sin` |
| `sinh` | $$\sinh$$ `\sinh` |
| `cos` | $$\cos$$ `\cos` |
| `cosh` | $$\cosh$$ `\cosh` |
| `tan` | $$\tan$$ `\tan` |
| `tanh` | $$\tanh$$ `\tanh` |
| `sec` | $$\sec$$ `\sec` |
| `csc` | $$\csc$$ `\csc` |
| `cot` | $$\cot$$ `\cot` |
| `log` | $$\log$$ `\log` |
| `ln` | $$\ln$$ `\ln` |
| `exp` | $$\exp$$ `\exp` |
| `lim` | $$\lim_{#?}$$ `\lim_{#?}` |
| `dx` | $$\differentialD x$$ `\differentialD x` |
| `dy` | $$\differentialD y$$ `\differentialD y` |
| `dt` | $$\differentialD t$$ `\differentialD t` |
| `AA` | $$\forall$$ `\forall` |
| `EE` | $$\exists$$ `\exists` |
| `!EE` | $$\nexists$$ `\nexists` |
| `&&` | $$\land$$ `\land` |
| `xin` | $$x \in$$ `x \in` |
| `in` | $$\in$$ `\in` |
| `!in` | $$\notin$$ `\notin` |
| `NN` | $$\N$$ `\N` |
| `ZZ` | $$\Z$$ `\Z` |
| `QQ` | $$\Q$$ `\Q` |
| `RR` | $$\R$$ `\R` |
| `CC` | $$\C$$ `\C` |
| `PP` | $$\P$$ `\P` |
| `xx` | $$\times$$ `\times` |
| `+-` | $$\pm$$ `\pm` |
| `!=` | $$\ne$$ `\ne` |
| `>=` | $$\ge$$ `\ge` |
| `<=` | $$\le$$ `\le` |
| `<<` | $$\ll$$ `\ll` |
| `>>` | $$\gg$$ `\gg` |
| `~~` | $$\approx$$ `\approx` |
| `≈` | $$\approx$$ `\approx` |
| `?=` | $$\questeq$$ `\questeq` |
| `÷` | $$\div$$ `\div` |
| `¬` | $$\neg$$ `\neg` |
| `:=` | $$\coloneq$$ `\coloneq` |
| `::` | $$\Colon$$ `\Colon` |
| `(:` | $$\langle$$ `\langle` |
| `:)` | $$\rangle$$ `\rangle` |
| `beta` | $$\beta$$ `\beta` |
| `chi` | $$\chi$$ `\chi` |
| `epsilon` | $$\epsilon$$ `\epsilon` |
| `varepsilon` | $$\varepsilon$$ `\varepsilon` |
| `eta` | $$\eta$$ `\eta` |
| `eta ` | $$\eta $$ `\eta ` |
| `gamma` | $$\gamma$$ `\gamma` |
| `Gamma` | $$\Gamma$$ `\Gamma` |
| `iota` | $$\iota$$ `\iota` |
| `kappa` | $$\kappa$$ `\kappa` |
| `lambda` | $$\lambda$$ `\lambda` |
| `Lambda` | $$\Lambda$$ `\Lambda` |
| `mu` | $$\mu$$ `\mu` |
| `mu ` | $$\mu $$ `\mu ` |
| `nu` | $$\nu$$ `\nu` |
| `nu ` | $$\nu $$ `\nu ` |
| `µ` | $$\mu$$ `\mu` |
| `phi` | $$\phi$$ `\phi` |
| `Phi` | $$\Phi$$ `\Phi` |
| `varphi` | $$\varphi$$ `\varphi` |
| `psi` | $$\psi$$ `\psi` |
| `Psi` | $$\Psi$$ `\Psi` |
| `rho` | $$\rho$$ `\rho` |
| `sigma` | $$\sigma$$ `\sigma` |
| `Sigma` | $$\Sigma$$ `\Sigma` |
| `tau` | $$\tau$$ `\tau` |
| `vartheta` | $$\vartheta$$ `\vartheta` |
| `upsilon` | $$\upsilon$$ `\upsilon` |
| `xi` | $$\xi$$ `\xi` |
| `Xi` | $$\Xi$$ `\Xi` |
| `zeta` | $$\zeta$$ `\zeta` |
| `omega` | $$\omega$$ `\omega` |
| `Omega` | $$\Omega$$ `\Omega` |
| `Ω` | $$\omega$$ `\omega` |
| `forall` | $$\forall$$ `\forall` |
| `exists` | $$\exists$$ `\exists` |
| `!exists` | $$\nexists$$ `\nexists` |
| `:.` | $$\therefore$$ `\therefore` |
| `liminf` | $$\operatorname*{lim~inf}_{#?}$$ `\operatorname*{lim~inf}_{#?}` |
| `limsup` | $$\operatorname*{lim~sup}_{#?}$$ `\operatorname*{lim~sup}_{#?}` |
| `argmin` | $$\operatorname*{arg~min}_{#?}$$ `\operatorname*{arg~min}_{#?}` |
| `argmax` | $$\operatorname*{arg~max}_{#?}$$ `\operatorname*{arg~max}_{#?}` |
| `det` | $$\det$$ `\det` |
| `mod` | $$\mod$$ `\mod` |
| `max` | $$\max$$ `\max` |
| `min` | $$\min$$ `\min` |
| `erf` | $$\operatorname{erf}$$ `\operatorname{erf}` |
| `erfc` | $$\operatorname{erfc}$$ `\operatorname{erfc}` |
| `bessel` | $$\operatorname{bessel}$$ `\operatorname{bessel}` |
| `mean` | $$\operatorname{mean}$$ `\operatorname{mean}` |
| `median` | $$\operatorname{median}$$ `\operatorname{median}` |
| `fft` | $$\operatorname{fft}$$ `\operatorname{fft}` |
| `lcm` | $$\operatorname{lcm}$$ `\operatorname{lcm}` |
| `gcd` | $$\operatorname{gcd}$$ `\operatorname{gcd}` |
| `randomReal` | $$\operatorname{randomReal}$$ `\operatorname{randomReal}` |
| `randomInteger` | $$\operatorname{randomInteger}$$ `\operatorname{randomInteger}` |
| `Re` | $$\operatorname{Re}$$ `\operatorname{Re}` |
| `Im` | $$\operatorname{Im}$$ `\operatorname{Im}` |
| `mm` | $$\operatorname{mm}$$ `\operatorname{mm}` |
| `cm` | $$\operatorname{cm}$$ `\operatorname{cm}` |
| `km` | $$\operatorname{km}$$ `\operatorname{km}` |
| `kg` | $$\operatorname{kg}$$ `\operatorname{kg}` |
| `...` | $$\ldots$$ `\ldots` |
| `+...` | $$+\cdots$$ `+\cdots` |
| `-...` | $$-\cdots$$ `-\cdots` |
| `->...` | $$\to\cdots$$ `\to\cdots` |
| `->` | $$\to$$ `\to` |
| `|->` | $$\mapsto$$ `\mapsto` |
| `-->` | $$\longrightarrow$$ `\longrightarrow` |
| `<--` | $$\longleftarrow$$ `\longleftarrow` |
| `=>` | $$\Rightarrow$$ `\Rightarrow` |
| `==>` | $$\Longrightarrow$$ `\Longrightarrow` |
| `<=>` | $$\Leftrightarrow$$ `\Leftrightarrow` |
| `<->` | $$\leftrightarrow$$ `\leftrightarrow` |
| `(.)` | $$\odot$$ `\odot` |
| `(+)` | $$\oplus$$ `\oplus` |
| `(/)` | $$\oslash$$ `\oslash` |
| `(*)` | $$\otimes$$ `\otimes` |
| `(-)` | $$\ominus$$ `\ominus` |
| `||` | $$\Vert$$ `\Vert` |
| `{` | $$\{$$ `\{` |
| `}` | $$\}$$ `\}` |
| `*` | $$\cdot$$ `\cdot` |



### ASCII Math

| Trigger | Result |
| :--- | :--- |
| `@` | $$\circ$$ `\circ` |
| `$` | $$\$$$ `\$` |
| `%` | $$\%$$ `\%` |
| `#` | $$\#$$ `\#` |
| `*` | $$\cdot$$ `\cdot` |
| `**` | $$\ast$$ `\ast` |
| `***` | $$\star$$ `\star` |
| `//` | $$\slash$$ `\slash` |
| `\\` | $$\backslash$$ `\backslash` |
| `setminus` | $$\backslash$$ `\backslash` |
| `|><` | $$\ltimes$$ `\ltimes` |
| `><|` | $$\rtimes$$ `\rtimes` |
| `|><|` | $$\bowtie$$ `\bowtie` |
| `-:` | $$\div$$ `\div` |
| `divide` | $$\div$$ `\div` |
| `o+` | $$\oplus$$ `\oplus` |
| `ox` | $$\otimes$$ `\otimes` |
| `o.` | $$\odot$$ `\odot` |
| `^^` | $$\wedge$$ `\wedge` |
| `^^^` | $$\bigwedge$$ `\bigwedge` |
| `vv` | $$\vee$$ `\vee` |
| `vvv` | $$\bigvee$$ `\bigvee` |
| `nn` | $$\cap$$ `\cap` |
| `nnn` | $$\bigcap$$ `\bigcap` |
| `uu` | $$\cup$$ `\cup` |
| `uuu` | $$\bigcup$$ `\bigcup` |
| `-=` | $$\equiv$$ `\equiv` |
| `~=` | $$\cong$$ `\cong` |
| `lt` | $$<$$ `<` |
| `lt=` | $$\leq$$ `\leq` |
| `gt` | $$>$$ `>` |
| `gt=` | $$\geq$$ `\geq` |
| `-<` | $$\prec$$ `\prec` |
| `-lt` | $$\prec$$ `\prec` |
| `-<=` | $$\preceq$$ `\preceq` |
| `>-=` | $$\succeq$$ `\succeq` |
| `prop` | $$\propto$$ `\propto` |
| `diamond` | $$\diamond$$ `\diamond` |
| `square` | $$\square$$ `\square` |
| `iff` | $$\iff$$ `\iff` |
| `sub` | $$\subset$$ `\subset` |
| `sup` | $$\supset$$ `\supset` |
| `sube` | $$\subseteq$$ `\subseteq` |
| `supe` | $$\supseteq$$ `\supseteq` |
| `uarr` | $$\uparrow$$ `\uparrow` |
| `darr` | $$\downarrow$$ `\downarrow` |
| `rarr` | $$\rightarrow$$ `\rightarrow` |
| `rArr` | $$\Rightarrow$$ `\Rightarrow` |
| `larr` | $$\leftarrow$$ `\leftarrow` |
| `lArr` | $$\Leftarrow$$ `\Leftarrow` |
| `harr` | $$\leftrightarrow$$ `\leftrightarrow` |
| `hArr` | $$\Leftrightarrow$$ `\Leftrightarrow` |
| `aleph` | $$\aleph$$ `\aleph` |
| `and` | $$\land$$ `\land` |
| `or` | $$\lor$$ `\lor` |
| `not` | $$\neg$$ `\neg` |
| `_|_` | $$\bot$$ `\bot` |
| `TT` | $$\top$$ `\top` |
| `|--` | $$\vdash$$ `\vdash` |
| `|==` | $$\models$$ `\models` |
| `|__` | $$\lfloor$$ `\lfloor` |
| `__|` | $$\rfloor$$ `\rfloor` |
| `|~` | $$\lceiling$$ `\lceiling` |
| `~|` | $$\rceiling$$ `\rceiling` |
| `>->` | $$\rightarrowtail$$ `\rightarrowtail` |
| `->>` | $$\twoheadrightarrow$$ `\twoheadrightarrow` |
| `>->>` | $$\twoheadrightarrowtail$$ `\twoheadrightarrowtail` |