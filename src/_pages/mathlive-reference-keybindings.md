---
layout: single
date: Last Modified
title: Keyboard Shortcuts
permalink: /mathlive/reference/keybindings/
read_time: false
sidebar:
    - nav: "universal"
toc: true
render_math_in_document: true
---

<style>
  td:nth-child(1) code, td:nth-child(1) kbd {
    display: inline-block;
    min-width: 42px;
    text-align: center;
    font-size: 24px;
    font-weight:normal;
    margin: 8px;
    line-height: 1.5;
    font-variant-ligatures: none;
  }
  table {
    table-layout: auto;
  }
  table tr td {
    vertical-align: middle;
  }
  table tr td:first-child {
    min-width: 15ex;
    width: 1ex;
    white-space: nowrap;
    font-size: 24px;
    font-weight: 900;
    color: var(--primary-color-dark);
  }

  kbd {
    font-family: var(--ui-font-family);
    padding-left: 4px;
    padding-right: 4px;
  
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.8em;
    border: var(--code-border);
    background: var(--code-background);
    border-radius: 4px;
    color: var(--primary-color-dark);
  }

  table td code {
    border: none;
    background: none;
  }

  #special-keys {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    font-size: 1.5rem;
  }

  #special-keys > div {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 8em;
    height: 8em;
    font-size: 1rem;
  }

  #special-keys > div > kbd:first-child {
    display: flex;
    width: 96px;
    height: 64px;
    
    font-size: 32px;
    justify-content: center;
    align-items: center;
  }

    #special-keys > div > span, 
    #special-keys > div > kbd:nth-child(2) {
      width: 100%;
      text-align: center;
      padding: 0;
      border: none;
      background: none;
    }
    #special-keys .label {
      font-size: 16px;
    }
    #special-keys  .label kbd {
      padding: 0;
      border: none;
      background: none;
      font-weight: 600;
    }

</style>

## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.

The keybinding below are applicable to a US QWERTY keyboard. Some of the
keybindings may not be available with other keyboard layouts.{.notice--info}

{% readmore "/mathlive/reference/shortcuts/" %}
Read more about definining your own **keybindings** and **shortcuts**.
{% endreadmore %}




### Special Keys


<div id='special-keys'>
  <div> <kbd>⇧</kbd><span class="label"><kbd>Shift</kbd></div> 
   <div> <kbd>⌃</kbd><span class="label"><kbd>Ctrl</kbd> or <kbd>Control</kbd></span></div>
   <div> <kbd>⌥</kbd><span class="label"><kbd>Option</kbd> or <kbd>Alt</kbd></span></div>
   <div> <kbd>⌫</kbd><span class="label"><kbd>Backspace</kbd></span></div>
   <div> <kbd>⌦</kbd><span class="label"><kbd>Del</kbd></span></div>
   <div> <kbd>⌘</kbd><span class="label"><kbd>Command</kbd> (macOS) or<br><kbd>Ctrl</kbd> (Windows)</span></div>
   <div> <kbd>⤒</kbd><span class="label"><kbd>Home</kbd></span></div> 
   <div> <kbd>⤓</kbd><span class="label"><kbd>End</kbd></span></div> 
   <div> <kbd>⇞</kbd><span class="label"><kbd>Page Up</kbd></span></div>
   <div> <kbd>⇟</kbd><span class="label"><kbd>Page Down</kbd></span></div>
   <div> <kbd>⏎</kbd><span class="label"><kbd>Return</kbd></span></div>
   <div> <kbd>⌤</kbd><span class="label"><kbd>Enter</kbd></span></div>
   <div> <kbd>⇥</kbd><span class="label"><kbd>Tab</kbd></span></div>
</div>


### All Modes

The keybindings in this section apply in all modes (math, text and LaTeX).

| Keybinding | Result | 
| :--- | :--- |
| <kbd>⇠</kbd> | move to previous char |
| <kbd>⌃</kbd>+<kbd>B</kbd> | move to previous char |
| <kbd>⇢</kbd> | move to next char |
| <kbd>⌃</kbd>+<kbd>F</kbd> | move to next char |
| <kbd>⇡</kbd> | move up |
| <kbd>⌃</kbd>+<kbd>P</kbd> | move up |
| <kbd>⇣</kbd> | move down |
| <kbd>⌃</kbd>+<kbd>N</kbd> | move down |
| <kbd>⇧</kbd>+<kbd>⇠</kbd> | extend selection backward |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd> | extend selection backward |
| <kbd>⇧</kbd>+<kbd>⇢</kbd> | extend selection forward |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd> | extend selection forward |
| <kbd>⇧</kbd>+<kbd>⇡</kbd> | extend selection upward |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>P</kbd> | extend selection upward |
| <kbd>⇧</kbd>+<kbd>⇣</kbd> | extend selection downward |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>N</kbd> | extend selection downward |
| <kbd>⌫</kbd> | delete backward |
| <kbd>⌥</kbd>+<kbd>⌦</kbd> | 〃 |
| <kbd>⌦</kbd> | delete forward |
| <kbd>⌥</kbd>+<kbd>⌫</kbd> | 〃 |
| <kbd>⌥</kbd>+<kbd>⇠</kbd> | move to previous word |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd> | move to previous word |
| <kbd>⌥</kbd>+<kbd>⇢</kbd> | move to next word |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd> | move to next word |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⇠</kbd> | extend selection to previous word |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⇢</kbd> | extend selection to next word |
| <kbd>⌃</kbd>+<kbd>⇠</kbd> | move to group start |
| <kbd>⌃</kbd>+<kbd>⇢</kbd> | move to group end |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>⇠</kbd> | extend selection to group start |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>⇢</kbd> | extend selection to group end |
| <kbd>space</kbd> | move after parent |
| <kbd>⇧</kbd>+<kbd>space</kbd> | move before parent |
| <kbd>⤒</kbd> | move to mathfield start |
| <kbd>⌘</kbd>+<kbd>⇠</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⤒</kbd> | extend selection to mathfield start |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⇠</kbd> | 〃 |
| <kbd>⤓</kbd> | move to mathfield end |
| <kbd>⌘</kbd>+<kbd>⇢</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⤓</kbd> | extend selection to mathfield end |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⇢</kbd> | 〃 |
| <kbd>⇞</kbd> | move to group start |
| <kbd>⇟</kbd> | move to group end |
| <kbd>⇥</kbd> | move to next placeholder |
| <kbd>⇧</kbd>+<kbd>⇥</kbd> | move to previous placeholder |
| <kbd>⇥</kbd> | move to next placeholder |
| <kbd>⇧</kbd>+<kbd>⇥</kbd> | move to previous placeholder |
| <kbd>Intl Backslash</kbd> | 〃 |
| <kbd>⌥</kbd>+<kbd>=</kbd> | applyStyle({"mode":"text"}) |
| <kbd>esc</kbd> | complete("complete") |
| <kbd>⇥</kbd> | In LaTeX mode: accept-suggestion |
| <kbd>⏎</kbd> | complete |
| <kbd>⌤</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>esc</kbd> | complete("reject") |
| <kbd>⌃</kbd>+<kbd>A</kbd> | select all |
| <kbd>⌘</kbd>+<kbd>A</kbd> | 〃 |
| <kbd>⌃</kbd>+<kbd>Z</kbd> | undo |
| <kbd>⌘</kbd>+<kbd>Z</kbd> | 〃 |
| <kbd>⌃</kbd>+<kbd>Y</kbd> | redo |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>Y</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>Z</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>Z</kbd> | 〃 |
| <kbd>⌃</kbd>+<kbd>A</kbd> | move to mathfield start |
| <kbd>⌃</kbd>+<kbd>E</kbd> | move to mathfield end |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>A</kbd> | extend selection to mathfield start |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>E</kbd> | extend selection to mathfield end |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd> | extend selection to previous word |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd> | extend selection to next word |
| <kbd>⌃</kbd>+<kbd>H</kbd> | delete backward |
| <kbd>⌃</kbd>+<kbd>D</kbd> | delete forward |
| <kbd>⌃</kbd>+<kbd>L</kbd> | scroll into view |
| <kbd>⇧</kbd>+<kbd>'</kbd> | toggle math/text mode (may not work in non-US QWERTY layout) |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>T</kbd> | toggle math/text mode |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>K</kbd> | toggle keystroke caption |
| <kbd>⌥</kbd>+<kbd>space</kbd> | toggle virtual keyboard |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>⇡</kbd> | speak("parent") |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>⇣</kbd> | speak("all") |


### Math Mode Only

The keybindings in this section apply in math mode only.

| Keybinding | Result |
| :--- | :--- | 
| <kbd>space</kbd> | move after parent |
| <kbd>⇧</kbd>+<kbd>space</kbd> | move before parent |
| <kbd>⇥</kbd> | move to next placeholder |
| <kbd>⇧</kbd>+<kbd>⇥</kbd> | move to previous placeholder |
| <kbd>esc</kbd> | enter/exit LaTeX mode |
| <kbd>\\</kbd> | enter LaTeX mode |
| <kbd>Intl Backslash</kbd> | 〃 |
| <kbd>⌥</kbd>+<kbd>=</kbd> | applyStyle({"mode":"text"}) |
| <kbd>⌃</kbd>+<kbd>2</kbd> | $$\sqrt{\unicode{"2B1A}}$$ |
| <kbd>⌃</kbd>+<kbd>5</kbd> | move to opposite (superscript/subscript, upper/lower) |
| <kbd>⌃</kbd>+<kbd>6</kbd> | move to superscript/upper |
| <kbd>⌃</kbd>+<kbd>-</kbd> | move to subscript/lower |
| <kbd>⌥</kbd>+<kbd>[</kbd> | $$\left\lbrack \unicode{"2B1A}\right\rbrack$$  |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>[</kbd> | $$\left\lbrace \unicode{"2B1A} \right\rbrace$$  |
| <kbd>⌃</kbd>+<kbd>⏎</kbd> | add row after |
| <kbd>⌃</kbd>+<kbd>⌤</kbd> | 〃 |
| <kbd>⌘</kbd>+<kbd>⏎</kbd> | 〃 |
| <kbd>⌘</kbd>+<kbd>⌤</kbd> | 〃 |
| <kbd>⌃</kbd>+<kbd>;</kbd> | 〃 |
| <kbd>⌘</kbd>  <kbd>;</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>;</kbd> | add row before |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>;</kbd> | 〃 |
| <kbd>⌃</kbd>+<kbd>,</kbd> | add column after |
| <kbd>⌘</kbd>+<kbd>,</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>,</kbd> | 〃 |
| <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>,</kbd> | 〃 |
| <kbd>⌥</kbd>+<kbd>P</kbd> | $$\pi$$ |
| <kbd>⌥</kbd>+<kbd>V</kbd> | $$\sqrt{\unicode{"2B1A}}$$  |
| <kbd>⌥</kbd>+<kbd>W</kbd> | $$\sum_{i=\unicode{"2B1A}}^{\unicode{"2B1A}}$$  |
| <kbd>⌥</kbd>+<kbd>U</kbd> | $$\cup$$ |
| <kbd>⌥</kbd>+<kbd>N</kbd> | $$\cap$$ |
| <kbd>⌥</kbd>+<kbd>O</kbd> | $$\emptyset$$ |
| <kbd>⌥</kbd>+<kbd>D</kbd> | $$\differentialD$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>O</kbd> | $$\varnothing$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>D</kbd> | $$\partial$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>P</kbd> | $$\prod_{i=\unicode{"2B1A}}^{\unicode{"2B1A}}$$   |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>U</kbd> | $$\bigcup$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>N</kbd> | $$\bigcap$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>A</kbd> | $$\forall$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>E</kbd> | $$\exists$$ |
| <kbd>⌥</kbd>+<kbd>B</kbd> | $$\int_{\unicode{"2B1A}}^{\unicode{"2B1A}}$$   |
| <kbd>⌥</kbd>+<kbd>5</kbd> | $$$\infty$$ |
| <kbd>⌥</kbd>+<kbd>6</kbd> | $$\wedge$$ |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>6</kbd> | $$\vee$$ |
| <kbd>⌥</kbd>+<kbd>9</kbd> | $$($$ |
| <kbd>⌥</kbd>+<kbd>0</kbd> | $$)$$ |
| <kbd>⌥</kbd>+<kbd>\|</kbd> | $$\|$$ |
| <kbd>⌥</kbd>+<kbd>\\</kbd> | $$\backslash$$ |
| <kbd>/</kbd> | $$\frac{\unicode{"2B1A}}{\unicode{"2B1A}}$$   |
| <kbd>⇧</kbd>+<kbd>&#96;</kbd> | `\~`  ||


## Inline Shortcuts

Some sequence of characters are automatically translated to symbols. For example, typing `P` followed by `I` will result in "π".

If the conversion was not desired, for example you actually meant "pi", type <kbd>ctrl/⌘</kbd>+<kbd>Z</kbd> to undo it.

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

