---
layout: single
date: Last Modified
title: Keyboard Shortcuts - MathLive Reference
permalink: /mathlive/reference/keybindings/
read_time: false
sidebar:
    - nav: "mathlive"
---

<style>
  td:nth-child(1) code {
    font-size: 24px;
    font-weight:normal;
    margin: 8px;
    line-height: 1.5
  }
  table {
    table-layout: auto;
  }
  table tr td:first-child {
    min-width: 15ex;
    width: 1ex;
    white-space: nowrap;  
  }
</style>

# Keyboard Sortcuts

## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.


### Special Keys


|  | |
| :--- | :--- |
| `⇧` | `Shift` | 
| `⌃` | `Ctrl` or `Control` |
| `⌥` | `Option` or `Alt` |
| `⌫` | `Del` |
| `⌦` | `Backspace` |
| `⌘` | `Command` (macOS) or `Ctrl` (Windows) |
| `⤒` | `Home` | 
| `⤓` | `End` | 
| `⇞` | `Page Up` |
| `⇟` | `Page Down` |
| `⏎` | `Return` |
| `⌤` | `Enter` |
| `⇥` | `Tab` |

### All Modes

The shortcuts in this section apply in all modes.

| Keybinding | Result | OS |
| :--- | :--- | ---: |
| `⇠` | move to previous char | |
| `⇢` | move to next char | |
| `⇡` | move up | |
| `⇣` | move down | |
| `⇧` `⇠` | extend selection backward | |
| `⇧` `⇢` | extend selection forward | |
| `⇧` `⇡` | extend selection upward | |
| `⇧` `⇣` | extend selection downward | |
| `⌫` | delete backward | |
| `⌥` `⌦` | 〃 | |
| `⌦` | delete forward | |
| `⌥` `⌫` | 〃 | |
| `⌥` `⇠` | move to previous word | |
| `⌥` `⇢` | move to next word | |
| `⇧` `⌥` `⇠` | extend to previous word | |
| `⇧` `⌥` `⇢` | extend to next word | |
| `⌃` `⇠` | move to group start | |
| `⌃` `⇢` | move to group end | |
| `⇧` `⌃` `⇠` | extend to group start | |
| `⇧` `⌃` `⇢` | extend to group end | |
| `space` | move after parent | |
| `⇧` `space` | move before parent | |
| `⤒` | move to math field start | |
| `⌘` `⇠` | 〃 | |
| `⇧` `⤒` | extend to math field start | |
| `⇧` `⌘` `⇠` | 〃 | |
| `⤓` | move to math field end | |
| `⌘` `⇢` | 〃 | |
| `⇧` `⤓` | extend to math field end | |
| `⇧` `⌘` `⇢` | 〃 | |
| `⇞` | move to group start | |
| `⇟` | move to group end | |
| `⇥` | move to next placeholder | |
| `⇧` `⇥` | move to previous placeholder | |
| `⇥` | move to next placeholder | |
| `⇧` `⇥` | move to previous placeholder | |
| `esc` | switchMode("latex") | |
| `\` | 〃 | |
| `Intl Backslash` | 〃 | |
| `⌥` `=` | applyStyle({"mode":"text"}) | |
| `⌥` `=` | 〃 | |
| `esc` | complete("complete") | |
| `⇥` | In LaTeX mode: accept-suggestion | |
| `⏎` | complete | |
| `⌤` | 〃 | |
| `⇧esc` | complete("reject") | |
| `⌃` `A` | select all | |
| `⌘` `A` | 〃 | |
| `Cut` | cut to clipboard | |
| `Copy` | copy to clipboard | |
| `Paste` | paste from clipboard | |
| `Clear` | delete backward | |
| `⌃` `Z` | undo | |
| `⌘` `Z` | 〃 | |
| `Undo` | 〃 | |
| `⌃` `Y` | redo | |
| `⇧` `⌘` `Y` | 〃 | |
| `⇧` `⌃` `Z` | 〃 | |
| `⇧` `⌘` `Z` | 〃 | |
| `Redo` | 〃 | |
| `Erase EOF` | delete to group end | |
| `⌃` `B` | move to previous char | |
| `⌃` `F` | move to next char | |
| `⌃` `P` | move up | |
| `⌃` `N` | move down | |
| `⌃` `A` | move to math field start | |
| `⌃` `E` | move to math field end | |
| `⇧` `⌃` `B` | extend selection backward | |
| `⇧` `⌃` `F` | extend selection forward | |
| `⇧` `⌃` `P` | extend selection upward | |
| `⇧` `⌃` `N` | extend selection downward | |
| `⇧` `⌃` `A` | extend to math field start | |
| `⇧` `⌃` `E` | extend to math field end | |
| `⌥` `⌃` B` | move to previous word | |
| `⌥` `⌃` F` | move to next word | |
| `⇧` `⌥` `⌃` `B` | extend to previous word | |
| `⇧` `⌥` `⌃` `F` | extend to next word | |
| `⌃` `H` | delete backward | |
| `⌃` `D` | delete forward | |
| `⌃` `L` | scroll into view | |
| `⇧` `'` | toggle math/text mode | |
| `⌥` `B` | $$\int_{\unicode{"2B1A}}^{\unicode{"2B1A}}$$   | |
| `⇧` `⌥` `K` | toggle keystroke caption | |
| `⌥` `space` | toggle virtual keyboard | |
| `⌥` `⌃` `⇡` | speak("parent") | |
| `⌥` `⌃` `⇣` | speak("all") | |


### Math Mode Only

The shortcuts in this section apply in math mode only.

| Keybinding | Result | OS |
| :--- | :--- | ---: |
| `space` | move after parent | |
| `⇧` `space` | move before parent | |
| `⇥` | move to next placeholder | |
| `⇧` `⇥` | move to previous placeholder | |
| `esc` | switchMode("latex") | |
| `\` | 〃 | |
| `Intl Backslash` | 〃 | |
| `⌥` `=` | applyStyle({"mode":"text"}) | |
| `⇧` `'` | switchMode("text") | |
| `⌃` `2` | $$\sqrt{\unicode{"2B1A}}$$ | |
| `⌃` `5` | move to opposite | |
| `⌃` `6` | move to superscript | |
| `⌃` `-` | move to subscript | |
| `⌥` `[` | $$\left\lbrack \unicode{"2B1A}\right\rbrack$$  | |
| `⇧` `⌥` `[` | $$\left\lbrace \unicode{"2B1A} \right\rbrace$$  | |
| `⌃` `⏎` | add row after | |
| `⌃` `⌤` | 〃 | |
| `⌘` `⏎` | 〃 | |
| `⌘` `⌤` | 〃 | |
| `⌃` `;` | 〃 | |
| `⌘`  `;` | 〃 | |
| `⇧` `⌃` `;` | add row before | |
| `⇧` `⌘` `;` | 〃 | |
| `⌃` `,` | add column after | |
| `⌘,` | 〃 | |
| `⇧` `⌃` `,` | 〃 | |
| `⇧⌘,` | 〃 | |
| `⌥` `P` | $$\pi$$ | |
| `⌥` `V` | $$\sqrt{\unicode{"2B1A}}$$  | |
| `⌥` `W` | $$\sum_{i=\unicode{"2B1A}}^{\unicode{"2B1A}}$$  | |
| `⌥` `U` | $$\cup$$ | |
| `⌥` `N` | $$\cap$$ | |
| `⌥` `O` | $$\emptyset$$ | |
| `⌥` `D` | $$\differentialD$$ | |
| `⇧` `⌥` `O` | $$\varnothing$$ | |
| `⇧` `⌥` `D` | $$\partial$$ | |
| `⇧` `⌥` `P` | $$\prod_{i=\unicode{"2B1A}}^{\unicode{"2B1A}}$$   | |
| `⇧` `⌥` `U` | $$\bigcup$$ | |
| `⇧` `⌥` `N` | $$\bigcap$$ | |
| `⇧` `⌥` `A` | $$\forall$$ | |
| `⇧` `⌥` `E` | $$\exists$$ | |
| `⌥` `5` | $$$\infty$$ | |
| `⌥` `6` | $$\wedge$$ | |
| `⇧` `⌥` `6` | $$\vee$$ | |
| `⌥` `9` | $$($$ | |
| `⌥` `0` | $$)$$ | |
| `⌥` `\|` | $$\|$$ | |
| `⌥` `\` | $$\backslash$$ | |
| `/` | $$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$   | |
| `Numpad /` | $$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$   | |
| `⌥` `Numpad /` | $$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$   | |
| `⇧` <kbd>&#96;</kbd> | `\~`  | ||


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
| `pi` | $$\pi$$  |
| `pi ` | $$\pi $$  |
| `Pi` | $$\Pi$$  |
| `theta` | $$\theta$$  |
| `Theta` | $$\Theta$$  |
| `ii` | $$\imaginaryI$$  |
| `jj` | $$\imaginaryJ$$  |
| `ee` | $$\exponentialE$$  |
| `nabla` | $$\nabla$$  |
| `grad` | $$\nabla$$  |
| `del` | $$\partial$$  |
| `infty` | $$\infty$$  |
| `∞` | $$\infty$$  |
| `oo` | $$\infty$$  |
| `∑` | $$\sum$$  |
| `sum` | $$\sum_{\unicode{"2B1A}}^{\unicode{"2B1A}}$$ `\sum_{\unicode{"2B1A}}^{\unicode{"2B1A}}` |
| `int` | $$\int_{\unicode{"2B1A}}^{\unicode{"2B1A}}$$ `\int_{\unicode{"2B1A}}^{\unicode{"2B1A}}` |
| `prod` | $$\prod_{\unicode{"2B1A}}^{\unicode{"2B1A}}$$ `\prod_{\unicode{"2B1A}}^{\unicode{"2B1A}}` |
| `sqrt` | $$\sqrt{\unicode{"2B1A}}$$ `\sqrt{\unicode{"2B1A}}` |
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
| `lim` | $$\lim_{\unicode{"2B1A}}$$ `\lim_{\unicode{"2B1A}}` |
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
| `liminf` | $$\operatorname*{lim~inf}_{\unicode{"2B1A}}$$ `\operatorname*{lim~inf}_{\unicode{"2B1A}}` |
| `limsup` | $$\operatorname*{lim~sup}_{\unicode{"2B1A}}$$ `\operatorname*{lim~sup}_{\unicode{"2B1A}}` |
| `argmin` | $$\operatorname*{arg~min}_{\unicode{"2B1A}}$$ `\operatorname*{arg~min}_{\unicode{"2B1A}}` |
| `argmax` | $$\operatorname*{arg~max}_{\unicode{"2B1A}}$$ `\operatorname*{arg~max}_{\unicode{"2B1A}}` |
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
| `-->` | $$\longrightarrow$$  |
| `<--` | $$\longleftarrow$$  |
| `=>` | $$\Rightarrow$$  |
| `==>` | $$\Longrightarrow$$  |
| `<=>` | $$\Leftrightarrow$$  |
| `<->` | $$\leftrightarrow$$  |
| `(.)` | $$\odot$$  |
| `(+)` | $$\oplus$$  |
| `(/)` | $$\oslash$$  |
| `(*)` | $$\otimes$$  |
| `(-)` | $$\ominus$$  |
| `\|\|` | $$\Vert$$  |
| `{` | $$\\{$$  |
| `}` | $$\\}$$  |
| `*` | $$\cdot$$  |



### ASCII Math

| Trigger | Result |
| :--- | :--- |
| `@` | $$\circ$$ `\circ` |
| `$` | $$\$$$ `\$` |
| `%` | $$\%$$ `\%` |
| `#` | $$\#$$ `\#` |
| `*` | $$\cdot$$  |
| `**` | $$\ast$$  |
| `***` | $$\star$$  |
| `//` | $$\slash$$  |
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

