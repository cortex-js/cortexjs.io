---
date: Last Modified
title: Keyboard Shortcuts
slug: /mathfield/reference/keybindings/
---


import { Children, useEffect } from 'react';

export function onDisplayChange(e) {
  const useGlyphs = e.target.value === 'glyphs';
  // We currently combine the display of glyphs with the "apple" class
  // We could have them separated...
  document.body.classList.toggle('apple', useGlyphs);
  document.body.classList.toggle('glyphs', useGlyphs);
}



export function Keybinding({value, appleValue, children}) {
  const asKeylabel = (s, cls) => {
    const keybindings = s.split(/ /);
    return Children.map(keybindings, (keybinding => {
      const keys = keybinding.split('+');
      let labels = keys.map(key => <kbd>{key}</kbd>);
      // Insert a "+" between each key
      labels = labels.reduce((acc, curr) => acc === null ? [curr] : [...acc, '+', curr], null);
      return <div className={cls}>{Children.map(labels, _ => _)}</div>
    }));
  }

  // Substitute a text label for the glyphs
  const noGlyphs = (s) => {
    return s.replace(/⌘|⌃|⇧|⌥|⤒|⤓|⇞|⇟|⇥|⌫|⌦|⏎|⌤|⇥/g, (glyph) => {
      const noGlyph = {
        '⌘': 'Ctrl', '⌃': 'Ctrl', '⇧': 'Shift', '⌥': 'Alt', 
        '⤒': "Home", '⤓': 'End', "⇞": 'Page Up', '⇟': "Page Down", 
        '⌫': 'Backspace', '⌦': 'Del', '⏎': 'Return', '⌤': 'Enter', '⇥': 'Tab'
      }[glyph];
      return noGlyph ?? glyph;
  });

  }

  return <div className="keybinding-cell">
    <div className="keybinding-label">{children}</div>
    {asKeylabel(noGlyphs(value), 'if-not-glyphs')}
    {asKeylabel(value, 'if-glyphs')}
    {appleValue && asKeylabel(appleValue, 'if-apple')}
  </div>
}

export function Shortcut({value, children}) {
  return <div className="shortcut-cell">
    <div className="shortcut-label" data-tooltip={value} >{`$$${value}$$`}</div>
    <div className="shortcut-keys">{children}</div>
  </div>
}

export default function ({children}) {
  useEffect(() => {
    const platform = navigator['userAgentData']?.platform ?? navigator.platform;
    const isApple = /^mac/i.test(platform) || /iphone|ipod|ipad/i.test(navigator.userAgent);

    // The body class gets cleared when the page is reloaded, so we need to
    // set it again after a short delay.
    if (isApple) 
      setTimeout(() => document.body.classList.add('apple', 'glyphs'), 16);
    
    const glyphsRadio = document.getElementById('glyphs-radio');
    const textRadio = document.getElementById('text-radio');
    glyphsRadio.checked = isApple;
    textRadio.checked = !isApple;
    // Restore the body class when the page is reloaded
    return () => document.body.classList.remove('apple', 'glyphs');
  }, []);
  return <>{children}</>;
}




<style>{`

  .keybinding-cell {
    display: flex;
    flex-flow: column;
    justify-content: start;
    gap: 4px;
    width: 20%;
    padding: 8px;
    margin: 0;
    background: transparent;
    border: 1px solid var(--callout-border-color);
    border-radius: 8px;
    box-sizing: content-box;
    font-family: var(--ui-font-family);
    font-weight: 400;
    text-align: center;
  }

  .keybinding-cell div:not(.keybinding-label) {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: var(--neutral-400);
    font-size: 1em;
    line-height: 2;
  }

  .keybinding-cell aside {
    margin-top: .5em;
    font-size: .8em;
    opacity: .8;
  }

  .keybinding-cell div kbd {
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: var(--ui-font-family);
    font-size: .8em;
    line-height: 2;
    margin-left: 4px;
    margin-right: 4px;
    width: fit-content;
    min-width: 32px;
    min-height: 32px;
    height: 32px;

    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    border: var(--code-border);
    background: var(--neutral-900);
    border-radius: 4px;
    color: var(--blue-800);
    box-shadow: none;
  }

  .keybinding-label {
    display: flex;
    flex-flow: column;
    min-height: 4em;
    background: var(--callout-background);
    color: var(--text-color);
    align-items: center;
    justify-content: center;
    overflow-wrap: anywhere;
    background: var(--callout-background);
    color: var(--text-color);
    line-height: 1.1;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .shortcut-cell {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: start;
    border-radius: 8px;
    border: 1px solid var(--callout-border-color);
    background: transparent;
    margin: .5em;
    padding: .5em;
    width: 20%;
  }

  .shortcut-cell div {
    text-align: center;
  }


  .shortcut-label {
    display: flex;
    flex-flow: column;
    min-height: 1em;
    width: 100%;
    background: var(--callout-background);
    color: var(--text-color);
    align-items: center;
    justify-content: center;
    overflow-wrap: anywhere;
    background: var(--callout-background);
    color: var(--text-color);
    line-height: 1;
    padding: 8px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .shortcut-keys {
    font-family: var(--monospace-font-family);
    color: var(--primary-color);
    font-weight: 600;
    font-feature-settings: "calt" 0;
  }

  .shortcut-cell kbd {
    box-shadow: none;
  }


  {/* kbd {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--ui-font-family);
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 0.8em;
    border: var(--code-border);
    background: var(--neutral-900);
    border-radius: 4px;
    color: var(--blue-800);
    box-shadow: none;
  } */}

  @media (prefers-color-scheme: dark) {
    kbd {
      color: var(--blue-100);
    }
  }

  table td code {
    border: none;
    background: none;
  }

  table tr td:first-child {
    width: auto;
  }

  #special-keys {
    border-radius: 8px;
    margin-top: 2rem;
    border: var(--ui-border);
    padding: 1rem;
  }

  #special-keys-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: .25em;
    margin-bottom: 1em;
  }

  #special-keys-table > div {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 6em;
    font-size: 1rem;
  }

  #special-keys-table > div > kbd:first-child {
    display: flex;
    width: 74px;
    height: 64px;
    justify-content: center;
    align-items: center;
    
    font-size: 32px;
    font-weight: 500;
    color: var(--primary-color);
  }

  #special-keys-table > div > span, 
  #special-keys-table > div > kbd:nth-child(2) {
    width: 100%;
    text-align: center;
    padding: 0;
    border: none;
    background: none;
  }
  #special-keys-table .label {
    font-size: 16px;
  }
  #special-keys-table .label kbd {
    padding: 0;
    border: none;
    box-shadow: none;
    background: none;
    font-weight: 600;
  }

  .keybindings-table {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }



  .inlineshortcut-table {
    display: flex;
    flex-wrap: wrap;
  }


  div[data-tooltip]:hover {
    position: relative;
    width: 100%;
  }

  div[data-tooltip]::after {
    display: none;
    position: absolute;
    content: attr(data-tooltip);
    min-width: calc(100% - 16px);
    height: calc(100% + 8px);
    padding: 8px 8px;
    top: -8px;
    left: 0;
    z-index: 2;

    justify-content: center;
    align-items: center;

    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);

    background: #616161;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    font-family: var(--monospace-font-family);
    font-feature-settings: "calt" 0;  /* Suppress ligatures */
    font-weight: 400;
    font-size: 16px;
  }


  div[data-tooltip]:hover::after {
    display: flex;
  }

  .settings-row, .settings-stack {
    border-radius: 8px;
    border: var(--ui-border);
    padding: 1rem;
    display: flex;
    width: 100%;
    user-select: none;
    gap: 0;
  }

  .settings-row p , .settings-stack p {
    margin: 0;
    padding: 0;
  }


  .settings-row {
    align-items: center;
    justify-content: space-between;
  }

  .settings-stack {
    flex-flow: column;
  }


  .settings-stack .label {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }



  #special-keys {
    display: none;
  }

  body.apple #special-keys {
    display: block;
  }

  .if-apple, .keybinding-cell div.if-apple:not(.keybinding-label) {
    display: none;
  }

  body.apple .if-apple, 
  body.apple .keybinding-cell div.if-apple:not(.keybinding-label) {
    display: inherit;
  }

  .if-glyphs, .if-not-glyphs {
    display: none;
  }

  body.glyphs .if-glyphs {
    display: inherit;
  }

  body:not(.glyphs) .if-not-glyphs {
    display: inherit;
    text-transform: uppercase;
    font-variant: small-caps;
  }


`}</style>


## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.

:::info[Note]
The keybindings below are applicable to a US QWERTY keyboard. Some of the
keybindings may not be available with other keyboard layouts.
:::

<ReadMore path="/mathfield/guides/shortcuts/" >
Read more about definining your own **keybindings** and **shortcuts**.
</ReadMore>



<div className="settings-stack">
  <div className="label">Display shortcuts for:</div>
    <RadioButton id="glyphs-radio" name="glyphs" value="glyphs" onChange={onDisplayChange}>
      macOS, iPadOS, iOS
    </RadioButton>
    <RadioButton id="text-radio" name="glyphs" value="text" onChange={onDisplayChange}>
      Windows, Android, ChromeOS, Linux
    </RadioButton>
</div>


<section id="special-keys" className="if-glyphs">

<div id='special-keys-table'>
  <div> <kbd>⇧</kbd><span className="label"><kbd>Shift</kbd></span></div> 
   <div> <kbd>⌃</kbd><span className="label"><kbd>Control</kbd></span></div>
   <div> <kbd>⌥</kbd><span className="label"><kbd>Option</kbd></span></div>
   <div> <kbd>⌘</kbd><span className="label"><kbd>Command</kbd></span></div>

</div>

<div id='special-keys-table'>

   <div> <kbd>⤒</kbd><span className="label"><kbd>Home</kbd></span></div> 
   <div> <kbd>⤓</kbd><span className="label"><kbd>End</kbd></span></div> 
   <div> <kbd>⇞</kbd><span className="label"><kbd>Page Up</kbd></span></div>
   <div> <kbd>⇟</kbd><span className="label"><kbd>Page Down</kbd></span></div>
</div>


<div id='special-keys-table'>

   <div> <kbd>⌫</kbd><span className="label"><kbd>Backspace</kbd></span></div>
   <div> <kbd>⌦</kbd><span className="label"><kbd>Del</kbd></span></div>

   <div> <kbd>⏎</kbd><span className="label"><kbd>Return</kbd></span></div>
   <div> <kbd>⌤</kbd><span className="label"><kbd>Enter</kbd></span></div>
   <div> <kbd>⇥</kbd><span className="label"><kbd>Tab</kbd></span></div>

</div>

</section>



### Editing


<div className="keybindings-table">
<Keybinding value="⇠" appleValue="⌃+B">move backward</Keybinding>
<Keybinding value="⇢" appleValue="⌃+F">move forward</Keybinding>
<Keybinding value="⇡" appleValue="⌃+P">move up</Keybinding>
<Keybinding value="⇣" appleValue="⌃+N">move down</Keybinding>
<Keybinding value="⇧+⇠" appleValue="⇧+⌃+B">extend selection backward</Keybinding>
<Keybinding value="⇧+⇢" appleValue="⇧+⌃+F">extend selection forward</Keybinding>
<Keybinding value="⇧+⇡" appleValue="⇧+⌃+P">extend selection upward</Keybinding>
<Keybinding value="⇧+⇣" appleValue="⇧+⌃+N">extend selection downward</Keybinding>
<Keybinding value="⇥">move to next placeholder</Keybinding>
<Keybinding value="⇧+⇥">move to previous placeholder</Keybinding>
<Keybinding value="⌫ ⌥+⌦" appleValue="⌃+H"> delete backward</Keybinding>
<Keybinding value="⌦ ⌥+⌫" appleValue="⌃+D">delete forward</Keybinding>
<Keybinding value="⌥+⇠" appleValue="⌥+⌃+B"> move to previous word</Keybinding>
<Keybinding value="⌥+⇢" appleValue="⌥+⌃+F"> move to next word</Keybinding>
<Keybinding value="⇧+⌥+⇠" appleValue="⇧+⌥+⌃+B"> extend selection to previous word</Keybinding>
<Keybinding value="⇧+⌥+⇢" appleValue="⇧+⌥+⌃+F"> extend selection to next word</Keybinding>
<Keybinding value="⇞ ⌃+⇠">move to group start</Keybinding>
<Keybinding value="⇟ ⌃+⇢">move to group end</Keybinding>
<Keybinding value="⇧+⌃+⇠">extend selection to group start</Keybinding>
<Keybinding value="⇧+⌃+⇢">extend selection to group end</Keybinding>
<Keybinding value="SPACE">move after parent</Keybinding>
<Keybinding value="⇧+SPACE">move before parent</Keybinding>
<Keybinding value="⤒+⌘+⇠" appleValue="⌃+A"> move to mathfield start</Keybinding>
<Keybinding value="⇧+⤒ ⇧+⌘+⇠" appleValue="⇧+⌃+A"> extend selection to mathfield start</Keybinding>
<Keybinding value="⤓ ⌘+⇢" appleValue="⌃+E">move to mathfield end</Keybinding>
<Keybinding value="⇧+⤓ ⇧+⌘+⇢" appleValue="⇧+⌃+E">extend selection to mathfield end</Keybinding>
<Keybinding value="⌃+5">move to opposite <aside>superscript/subscript, upper/lower</aside></Keybinding>
<Keybinding value="⌃+6">move to superscript/upper</Keybinding>
<Keybinding value="⌃+-">move to subscript/lower</Keybinding>
<Keybinding value="ESC">finish</Keybinding>
<Keybinding value="⇧+ESC">reject</Keybinding>
<Keybinding value="⇥">accept suggestion</Keybinding>
<Keybinding value="⏎ ⌤">complete</Keybinding>
<Keybinding value="⌘+A" appleValue="⌃+A">select all</Keybinding>
<Keybinding value="⌘+Z" appleValue="⌃+Z">undo</Keybinding>
<Keybinding value="⌘+Y ⌃+Y ⇧+⌃+Z">redo</Keybinding>
<Keybinding value="⌃+L">scroll into view</Keybinding>
<Keybinding value="⇧+⌥+K">toggle keystroke caption</Keybinding>
<Keybinding value="⇧+⌥+SPACE">toggle virtual keyboard</Keybinding>
<Keybinding value="⌥+SPACE">show context menu</Keybinding>
<Keybinding value="⌥+=">apply text mode</Keybinding>
<Keybinding value="⇧+⌥+T">toggle math/text mode</Keybinding>
<Keybinding value="ESC">enter/exit LaTeX mode</Keybinding>
<Keybinding value="\">enter LaTeX mode</Keybinding>
<Keybinding value="⌥+⌃+⇡">speak parent</Keybinding>
<Keybinding value="⌥+⌃+⇣">speak all</Keybinding>

</div>

### Math Symbols

<div className="keybindings-table">

<Keybinding value="/">$$\frac{}{}$$</Keybinding>
<Keybinding value="⌃+2">$$\sqrt{}$$</Keybinding>
<Keybinding value="⌥+V">$$\sqrt{}$$</Keybinding>
<Keybinding value="⌥+P">$$\pi$$</Keybinding>
<Keybinding value="⌥+O">$$\emptyset$$</Keybinding>
<Keybinding value="⌥+D">$$\differentialD$$</Keybinding>
<Keybinding value="⇧+⌥+O">$$\varnothing$$</Keybinding>
<Keybinding value="⇧+⌥+D">$$\partial$$</Keybinding>
<Keybinding value="⇧+⌥+P">$$\prod_{i=}^{}$$</Keybinding>
<Keybinding value="⌥+5">$$\infty$$</Keybinding>
<Keybinding value="⌥+9">$$($$</Keybinding>
<Keybinding value="⌥+0">$$)$$</Keybinding>
<Keybinding value="⌥+|">$$\|$$</Keybinding>
<Keybinding value="⌥+\">$$\backslash$$</Keybinding>
<Keybinding value="⇧+`">$$\~$$</Keybinding>
</div>

### Matrix Editing
<div className="keybindings-table">

<Keybinding value="⌥+[">insert square bracket matrix</Keybinding>
<Keybinding value="⌥+⇧+(">insert braces matrix</Keybinding>
<Keybinding value="⇧+⏎ ⌘+⏎">insert row</Keybinding>
<Keybinding value="⌃+, ⌘+⏎">insert column</Keybinding>

</div>

## Inline Shortcuts

Some sequence of characters are automatically translated to symbols. For example, typing `P` followed by `I` will result in "π".

Many of the [ASCIIMath](http://asciimath.org/) symbols
are supported.

If the conversion was not desired, for example you actually meant "pi", type <kbd>ctrl/⌘</kbd>+<kbd>Z</kbd> to undo it.

### Letter-Like Symbols

<div className="inlineshortcut-table">

<Shortcut value="\infty"><div>∞</div><div>infty</div><div>oo</div></Shortcut>
<Shortcut value="\imaginaryI"><div>ii</div></Shortcut>
<Shortcut value="\imaginaryJ"><div>jj</div></Shortcut>
<Shortcut value="\exponentialE"><div>ee</div></Shortcut>
<Shortcut value="\N"><div>NN</div></Shortcut>
<Shortcut value="\Z"><div>ZZ</div></Shortcut>
<Shortcut value="\Q"><div>QQ</div></Shortcut>
<Shortcut value="\R"><div>RR</div></Shortcut>
<Shortcut value="\C"><div>CC</div></Shortcut>
<Shortcut value="\P"><div>PP</div></Shortcut>
<Shortcut value="\forall"><div>forall</div><div>AA</div></Shortcut>
<Shortcut value="\exists"><div>exists</div><div>EE</div></Shortcut>
<Shortcut value="\nexists"><div>!exists</div><div>!EE</div></Shortcut>
<Shortcut value='\char"24'><div>$</div></Shortcut>
<Shortcut value="\%"><div>%</div></Shortcut>
<Shortcut value="\#"><div>#</div></Shortcut>
<Shortcut value="\backslash"><div>\\</div></Shortcut>
<Shortcut value="\diamond"><div>diamond</div></Shortcut>
<Shortcut value="\square"><div>square</div></Shortcut>
<Shortcut value="\bot"><div>_|_</div></Shortcut>
<Shortcut value="\top"><div>TT</div></Shortcut>
<Shortcut value="\nabla"><div>nabla</div></Shortcut>
<Shortcut value="\nabla"><div>grad</div></Shortcut>
<Shortcut value="\partial"><div>del</div></Shortcut>
<Shortcut value="\differentialD"><div>∆</div><div>∂</div></Shortcut>
<Shortcut value="\differentialD x"><div>dx</div></Shortcut>
<Shortcut value="\differentialD y"><div>dy</div></Shortcut>
<Shortcut value="\differentialD t"><div>dt</div></Shortcut>
<Shortcut value="\aleph"><div>aleph</div></Shortcut>
</div>

### Functions

<div className="inlineshortcut-table">
<Shortcut value="\arcsin">arcsin</Shortcut>
<Shortcut value="\arccos">arccos</Shortcut>
<Shortcut value="\arctan">arctan</Shortcut>
<Shortcut value="\sin">sin</Shortcut>
<Shortcut value="\sinh">sinh</Shortcut>
<Shortcut value="\cos">cos</Shortcut>
<Shortcut value="\cosh">cosh</Shortcut>
<Shortcut value="\tan">tan</Shortcut>
<Shortcut value="\tanh">tanh</Shortcut>
<Shortcut value="\sec">sec</Shortcut>
<Shortcut value="\csc">csc</Shortcut>
<Shortcut value="\cot">cot</Shortcut>
<Shortcut value="\log">log</Shortcut>
<Shortcut value="\ln">ln</Shortcut>
<Shortcut value="\exp">exp</Shortcut>
<Shortcut value='\lim_{\char"2B1A}'>lim</Shortcut>
<Shortcut value="\det">det</Shortcut>
<Shortcut value="\mod">mod</Shortcut>
<Shortcut value="\max">max</Shortcut>
<Shortcut value="\min">min</Shortcut>
<Shortcut value="\operatorname{erf}">erf</Shortcut>
<Shortcut value="\operatorname{erfc}">erfc</Shortcut>
<Shortcut value="\operatorname{bessel}">bessel</Shortcut>
<Shortcut value="\operatorname{mean}">mean</Shortcut>
<Shortcut value="\operatorname{median}">median</Shortcut>
<Shortcut value="\operatorname{fft}">fft</Shortcut>
<Shortcut value="\operatorname{lcm}">lcm</Shortcut>
<Shortcut value="\operatorname{gcd}">gcd</Shortcut>
<Shortcut value="\operatorname{randomReal}">randomReal</Shortcut>
<Shortcut value="\operatorname{randomInteger}">randomInteger</Shortcut>
<Shortcut value="\operatorname{Re}">Re</Shortcut>
<Shortcut value="\operatorname{Im}">Im</Shortcut>
</div>

### Relational Operators

<div className="inlineshortcut-table">

<Shortcut value="\ne">!=</Shortcut>
<Shortcut value="\ge">\>=</Shortcut>
<Shortcut value="\le">\<=</Shortcut>
<Shortcut value="\ll">\<\<</Shortcut>
<Shortcut value="\gg">\>\></Shortcut>
<Shortcut value="\approx"><div>~~</div><div>≈</div></Shortcut>
<Shortcut value="\questeq">?=</Shortcut>
<Shortcut value="\coloneq">:=</Shortcut>
<Shortcut value="\Colon">::</Shortcut>
<Shortcut value="\equiv">-=</Shortcut>
<Shortcut value="\cong">~=</Shortcut>
<Shortcut value="<">lt</Shortcut>
<Shortcut value="\leq">lt=</Shortcut>
<Shortcut value=">">gt</Shortcut>
<Shortcut value="\geq">gt=</Shortcut>
<Shortcut value="\prec"><div>-lt</div><div>-\<</div></Shortcut>
<Shortcut value="\preceq">-\<=</Shortcut>
<Shortcut value="\succeq">-\>=</Shortcut>
<Shortcut value="\propto">prop</Shortcut>
</div>

### Other Operators

<div className="inlineshortcut-table">

<Shortcut value="\cdot">&ast;</Shortcut>
<Shortcut value="\ast">\*\*</Shortcut>
<Shortcut value="\star">***</Shortcut>
<Shortcut value="\land">&amp;&amp;</Shortcut>
<Shortcut value="x \in">xin</Shortcut>
<Shortcut value="\in">in</Shortcut>
<Shortcut value="\notin">!in</Shortcut>
<Shortcut value="\times">xx</Shortcut>
<Shortcut value="\pm">+-</Shortcut>
<Shortcut value="\div">÷</Shortcut>
<Shortcut value="\odot">(-)</Shortcut>
<Shortcut value="\oplus">(+)</Shortcut>
<Shortcut value="\oslash">(/)</Shortcut>
<Shortcut value="\otimes"><div>ox</div><div>(x)</div></Shortcut>
<Shortcut value="\ominus">(-)</Shortcut>
<Shortcut value="\circ">@</Shortcut>
<Shortcut value="\ltimes">|\>\<</Shortcut>
<Shortcut value="\rtimes">\>\<|</Shortcut>
<Shortcut value="\bowtie">|\>\<|</Shortcut>
<Shortcut value="-:"><div>-:</div><div>divide</div></Shortcut>
<Shortcut value="\wedge">^^</Shortcut>
<Shortcut value="\bigwedge">^^^</Shortcut>
<Shortcut value="\vee">vv</Shortcut>
<Shortcut value="\bigvee">vvv</Shortcut>
<Shortcut value="\cap">nn</Shortcut>
<Shortcut value="\bigcap">nnn</Shortcut>
<Shortcut value="\cup">uu</Shortcut>
<Shortcut value="\bigcup">uuu</Shortcut>
<Shortcut value="\backslash">setminus</Shortcut>
<Shortcut value="\subset">sub</Shortcut>
<Shortcut value="\supset">sup</Shortcut>
<Shortcut value="\subseteq">sube</Shortcut>
<Shortcut value="\supseteq">supe</Shortcut>
<Shortcut value="\land">and</Shortcut>
<Shortcut value="\lor">or</Shortcut>
<Shortcut value="\neg">not</Shortcut>
</div>

### Delimiters

<div className="inlineshortcut-table">

<Shortcut value="\lfloor">\|\_\_</Shortcut>
<Shortcut value="\rfloor">__|</Shortcut>
<Shortcut value="\lceil">\|\~</Shortcut>
<Shortcut value="\rceil">~\|</Shortcut>
<Shortcut value="\Vert">||</Shortcut>
<Shortcut value="\{">\{</Shortcut>
<Shortcut value="\}">\}</Shortcut>
<Shortcut value="\langle">(:</Shortcut>
<Shortcut value="\rangle">:)</Shortcut>
</div>

### Units

<div className="inlineshortcut-table">
<Shortcut value="\operatorname{mm}">mm</Shortcut>
<Shortcut value="\operatorname{cm}">cm</Shortcut>
<Shortcut value="\operatorname{km}">km</Shortcut>
<Shortcut value="\operatorname{kg}">kg</Shortcut>
</div>

### Arrows

<div className="inlineshortcut-table">
<Shortcut value="iff">iff</Shortcut>
<Shortcut value="\rightarrowtail">\>-\></Shortcut>
<Shortcut value="\twoheadrightarrow">-\>\></Shortcut>
<Shortcut value="\twoheadrightarrowtail">\>-\>\></Shortcut>
<Shortcut value="\to">-\></Shortcut>
<Shortcut value="\to\cdots">-\>...</Shortcut>
<Shortcut value="\mapsto">|-\></Shortcut>
<Shortcut value="\longrightarrow">--\></Shortcut>
<Shortcut value="\longleftarrow">\<--</Shortcut>
<Shortcut value="\Rightarrow">=></Shortcut>
<Shortcut value="\Longrightarrow">==></Shortcut>
<Shortcut value="\Leftrightarrow">\<=\></Shortcut>
<Shortcut value="\leftrightarrow">\<-\></Shortcut>
<Shortcut value="\uparrow">uarr</Shortcut>
<Shortcut value="\downarrow">darr</Shortcut>
<Shortcut value="\rightarrow">rarr</Shortcut>
<Shortcut value="\Rightarrow">rArr</Shortcut>
<Shortcut value="\leftarrow">larr</Shortcut>
<Shortcut value="\Leftarrow">lArr</Shortcut>
<Shortcut value="\leftrightarrow">harr</Shortcut>
<Shortcut value="\Leftrightarrow">hArr</Shortcut>
<Shortcut value="\vdash">|--</Shortcut>
<Shortcut value="\models">|==</Shortcut>
</div>

### Greek Letters

<div className="inlineshortcut-table">
<Shortcut value="\alpha">alpha</Shortcut>
<Shortcut value="\beta">beta</Shortcut>
<Shortcut value="\gamma">gamma</Shortcut>
<Shortcut value="\Gamma">Gamma</Shortcut>
<Shortcut value="\delta">delta</Shortcut>
<Shortcut value="\Delta">Delta</Shortcut>
<Shortcut value="\epsilon">epsilon</Shortcut>
<Shortcut value="\varepsilon">varepsilon</Shortcut>
<Shortcut value="\zeta">zeta</Shortcut>
<Shortcut value="\eta ">eta </Shortcut>
<Shortcut value="\theta">theta</Shortcut>
<Shortcut value="\vartheta">vartheta</Shortcut>
<Shortcut value="\Theta">Theta</Shortcut>
<Shortcut value="\iota">iota</Shortcut>
<Shortcut value="\kappa">kappa</Shortcut>
<Shortcut value="\lambda">lambda</Shortcut>
<Shortcut value="\Lambda">Lambda</Shortcut>
<Shortcut value="\mu"><div>mu</div><div>µ</div></Shortcut>
<Shortcut value="\nu ">nu</Shortcut>
<Shortcut value="\xi">xi</Shortcut>
<Shortcut value="\Xi">Xi</Shortcut>
<Shortcut value="\pi">pi</Shortcut>
<Shortcut value="\Pi">Pi</Shortcut>
<Shortcut value="\rho">rho</Shortcut>
<Shortcut value="\sigma">sigma</Shortcut>
<Shortcut value="\Sigma">Sigma</Shortcut>
<Shortcut value="\tau">tau</Shortcut>
<Shortcut value="\upsilon">upsilon</Shortcut>
<Shortcut value="\phi">phi</Shortcut>
<Shortcut value="\varphi">varphi</Shortcut>
<Shortcut value="\Phi">Phi</Shortcut>
<Shortcut value="\chi">chi</Shortcut>
<Shortcut value="\psi">psi</Shortcut>
<Shortcut value="\Psi">Psi</Shortcut>
<Shortcut value="\omega">Ω</Shortcut>
<Shortcut value="\Omega">Omega</Shortcut>
</div>

### Miscellaneous

<div className="inlineshortcut-table">
<Shortcut value="\%">\%</Shortcut>
<Shortcut value="^{\doubleprime}">''</Shortcut>
<Shortcut value="\sum">∑</Shortcut>
<Shortcut value="\sum_{}^{}">sum</Shortcut>
<Shortcut value="\int_{}^{}">int</Shortcut>
<Shortcut value="\prod_{}^{}">prod</Shortcut>
<Shortcut value="\sqrt{}">sqrt</Shortcut>
<Shortcut value="\neg">neg</Shortcut>
<Shortcut value="\operatorname*{lim~inf}_{}">liminf</Shortcut>
<Shortcut value="\operatorname*{lim~sup}_{}">limsup</Shortcut>
<Shortcut value="\operatorname*{arg~min}_{}">argmin</Shortcut>
<Shortcut value="\operatorname*{arg~max}_{}">argmax</Shortcut>
<Shortcut value="\ldots">...</Shortcut>
<Shortcut value="+\cdots">+...</Shortcut>
<Shortcut value="-\cdots">-...</Shortcut>
<Shortcut value="\therefore">:.</Shortcut>
</div>
