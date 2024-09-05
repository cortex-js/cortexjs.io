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
    color: var(--blue-800);
  }

  @media (prefers-color-scheme: dark) {
    kbd {
      color: var(--blue-100);
    }
  }

  table td code {
    border: none;
    background: none;
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
    
    font-size: 32px;
    justify-content: center;
    align-items: center;
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
#special-keys-table  .label kbd {
  padding: 0;
  border: none;
  background: none;
  font-weight: 600;
}

.keybindings-table table {
  display: flex;
}

.keybindings-table table thead {
  display: none;
}

.keybindings-table table tbody {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-evenly;
  width: 100%;
}

.keybindings-table tr {
  display: flex;
  flex-flow: column-reverse;
  justify-content: flex-end;
  width: 20%;
  gap: 0;
  padding: 8px;
  margin: 0;
  border: 1px solid var(--callout-border-color);
  border-radius: 8px;
  box-sizing: content-box;
}
.keybindings-table tr td {
  display: flex;
  justify-content: center;
  padding: 0;
  padding-bottom: 8px;
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  padding-top: 8px;
  align-items: center;
  width: 100%;
}


.keybindings-table tr td aside {
  margin-top: 4px;
  font-size: 12px;
  opacity: .8;
}

.keybindings-table tr td:last-child {
  flex-flow: column;
  border-radius: 8px;
  padding: 8px;
  min-height: 4em;
  background: var(--callout-background);
  color: var(--text-color);
  align-items: center;
  overflow-wrap: anywhere;
  width: 100%;
}

/* .keybindings-table tr td:not(:first-child) {
  border-bottom: 1px solid #eee;
} */

table tr td:first-child {
  width: auto;
}

.keybindings-table tr td kbd {
  font-size: 18px;
  min-width: 32px;
  min-height: 32px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.keybindings-table kbd {
  user-select: none;
}


.inlineshortcut-table table {
  display: flex;
}

.inlineshortcut-table table thead {
  display: none;
}

.inlineshortcut-table table tbody {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: space-evenly;
  width: 100%;
}

.inlineshortcut-table tr {
  display: flex;
  flex-flow: column-reverse;
  justify-content: flex-end;
  width: 20%;
  gap: 0;
  padding: 8px;
  margin: 0;
  border: 1px solid var(--callout-border-color);
  border-radius: 8px;
  box-sizing: content-box;
}
.inlineshortcut-table tr td {
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 0;
  padding-bottom: 8px;
  padding-top: 8px;
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  font-variant-ligatures: none;
  width: 100%;
}



.inlineshortcut-table tr td aside {
  margin-top: 4px;
  font-size: 12px;
  opacity: .8;
}

.inlineshortcut-table tr td:last-child {
  flex-flow: column;
  border-radius: 8px;
  padding: 8px;
  background: var(--callout-background);
  color: var(--text-color);
  align-items: center;
  overflow-wrap: anywhere;
  width: 100%;
}

.inlineshortcut-table tr td kbd {
  font-size: 18px;
  min-width: 32px;
  min-height: 32px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .inlineshortcut-table tr td code {
  display: none;
} */

.inlineshortcut-table tr td:hover code {
  position: relative;
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
  font-weight: 400;
  font-size: 16px;
}


div[data-tooltip]:hover::after {
  display: flex;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  display: none;
  /* opacity: 0;
  width: 0;
  height: 0; */
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: var(--ui-surface);
  transition: .2s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: var(--ui-handle);
  transition: .2s;
}

input:checked + .slider {
  background-color: var(--primary-color);
}

input:focus-visible + .slider {
  outline: 5px auto #0c6abe;
  outline-offset: -2px;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.settings-row, .settings-stack {
  border-radius: 8px;
  border: var(--ui-border);
  padding: 1rem;
  display: flex;
  width: 100%;
  user-select: none;
}

.settings-row {
  align-items: center;
  justify-content: space-between;
}

.settings-stack {
  flex-flow: column;
}

.settings-stack div div.row {
  display: flex;
  flex-flow: row;
  align-items: baseline;
}

.settings-row label, .settings-stack label {
  font-size: 1.25rem;
}

.settings-stack .label {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

div.row input + label {
  margin-left: 8px;
}

input[type="radio"] {
  appearance: none;
  background-color: var(--ui-background);
  margin: 0;
  font: inherit;
  color: var(--ui-border);
  width: 1.5em;
  height: 1.5em;
  border: 2.5px solid #555;
  border-radius: 50%;
  translate: 0 -1.25px;
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--primary-color);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}



.page__content label p {
  margin: 0;
  padding: 0;
  opacity: .6;
}

.page__content label p:has(strong) {
  opacity: 1;
}

#special-keys {
  display: none;
}

body.apple #special-keys {
  display: block;
}

.if-apple {
  display: none;
}

body.apple .if-apple {
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
  font-weight: 800;
  font-size: 0.5em;
  font-variant: small-caps;
}


</style>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    const platform = navigator['userAgentData']?.platform ?? navigator.platform;
    const isApple = /^mac/i.test(platform) || /iphone|ipod|ipad/i.test(navigator.userAgent);

    const glyphsRadio = document.getElementById('glyphs-radio');
    const textRadio = document.getElementById('text-radio');

    // const appleSwitch = document.getElementById('apple');
    // appleSwitch.addEventListener('click', (e) => {
    //   if (e.target.checked) 
    //     document.body.classList.add('apple', 'glyphs');
    //    else 
    //     document.body.classList.remove('apple', 'glyphs');
    // });

    if (isApple) {
      // appleSwitch.checked = true;
      glyphsRadio.checked = true;
      textRadio.checked = false;

      document.body.classList.add('apple', 'glyphs');
    } else {
      glyphsRadio.checked = false;
      textRadio.checked = true;
    }

    glyphsRadio.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('apple');
        document.body.classList.add('glyphs');
      }
       else  {
        document.body.classList.remove('apple');
        document.body.classList.remove('glyphs');
      }
    });
    textRadio.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.remove('apple');
        document.body.classList.remove('glyphs');
      }
       else  {
        document.body.classList.add('apple');
        document.body.classList.add('glyphs');
      }
    });


  function replaceGlyphs(root) {
    // Recurse over all the children of the node
    root.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const html = text.replace(/⌘|⌃|⇧|⌥|⤒|⤓|⇞|⇟|⇥|⌫|⌦|⏎|⌤|⇥/g, (match) => {
          const glyph = match;
          const caption = {'⌘': 'Ctrl', '⌃': 'Ctrl', '⇧': 'Shift', '⌥': 'Alt', '⤒': "Home", '⤓': 'End', "⇞": 'Page Up', '⇟': "Page Down", '⌫': 'Backspace', '⌦': 'Del', '⏎': 'Return', '⌤': 'Enter', '⇥': 'Tab'}[glyph];
          if (!caption) return glyph;
          return `<span class="if-glyphs">${glyph}</span><span class="if-not-glyphs">${caption}</span>`;
        });
        const span = document.createElement('span');
        span.innerHTML = html;
        node.replaceWith(span);
      } else {
        replaceGlyphs(node);
      }
    });
  }

    document.querySelectorAll('.keybindings-table').forEach((table) => 
      table.querySelectorAll('td').forEach((td) => replaceGlyphs(td))
    );

  });

</script>

## Keybindings

Commands to edit and modify a formula can be invoked by pressing some key 
combinations.

The keybinding below are applicable to a US QWERTY keyboard. Some of the
keybindings may not be available with other keyboard layouts.{.notice--info}

{% readmore "/mathlive/guides/shortcuts/" %}
Read more about definining your own **keybindings** and **shortcuts**.
{% endreadmore %}


<!-- <div class="settings-row">
<label for="apple"><p><strong>Shortcuts for macOS and iOS</strong></p><p>Display shortcuts using the ⌘, ⌥, ⌃, ⇧ keys</p></label>
<label class="switch">
  <input id="apple" type="checkbox">
  <span class="slider"></span>
</label>
</div> -->

<div class="settings-stack">
<div class="label">Display shortcuts for:</div>
<div>
<div class="row">
<input type="radio" id="glyphs-radio" name="glyphs" value="glyphs" checked>
<label for="glyphs-radio">macOS, iOS</label>
</div>
<div class="row">
<input type="radio" id="text-radio" name="glyphs" value="text">
<label for="text-radio">Windows, ChromeOS, Linux</label>
</div>
</div>
</div>


<section id="special-keys" class="if-glyphs">

<div id='special-keys-table'>
  <div> <kbd>⇧</kbd><span class="label"><kbd>Shift</kbd></div> 
   <div> <kbd>⌃</kbd><span class="label"><kbd>Control</kbd></span></div>
   <div> <kbd>⌥</kbd><span class="label"><kbd>Option</kbd></span></div>
   <div> <kbd>⌘</kbd><span class="label"><kbd>Command</kbd></span></div>

</div>

<div id='special-keys-table'>

   <div> <kbd>⤒</kbd><span class="label"><kbd>Home</kbd></span></div> 
   <div> <kbd>⤓</kbd><span class="label"><kbd>End</kbd></span></div> 
   <div> <kbd>⇞</kbd><span class="label"><kbd>Page Up</kbd></span></div>
   <div> <kbd>⇟</kbd><span class="label"><kbd>Page Down</kbd></span></div>
</div>


<div id='special-keys-table'>

   <div> <kbd>⌫</kbd><span class="label"><kbd>Backspace</kbd></span></div>
   <div> <kbd>⌦</kbd><span class="label"><kbd>Del</kbd></span></div>

   <div> <kbd>⏎</kbd><span class="label"><kbd>Return</kbd></span></div>
   <div> <kbd>⌤</kbd><span class="label"><kbd>Enter</kbd></span></div>
   <div> <kbd>⇥</kbd><span class="label"><kbd>Tab</kbd></span></div>

</div>

</section>



### Editing


<div class="keybindings-table">

| Keybinding | Result | 
| --- | --- |
| <span class="if-apple"> <kbd>⌃</kbd>+<kbd>B</kbd> </span> | <kbd>⇠</kbd> | move backward |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>F</kbd> </span> | <kbd>⇢</kbd> |move forward |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>P</kbd> </span> | <kbd>⇡</kbd> |move up |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>N</kbd> </span> | <kbd>⇣</kbd> | move down |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd></span> | <kbd>⇧</kbd>+<kbd>⇠</kbd> |extend selection backward |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd></span> | <kbd>⇧</kbd>+<kbd>⇢</kbd> |extend selection forward |
|  <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>P</kbd> </span> | <kbd>⇧</kbd>+<kbd>⇡</kbd> | extend selection upward |
|  <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>N</kbd> </span> | <kbd>⇧</kbd>+<kbd>⇣</kbd> | extend selection downward |
| <kbd>⇥</kbd> | move to next placeholder |
| <kbd>⇧</kbd>+<kbd>⇥</kbd> | move to previous placeholder |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>H</kbd></span> | <kbd>⌥</kbd>+<kbd>⌦</kbd> | <kbd>⌫</kbd> | delete backward |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>D</kbd></span> | <kbd>⌥</kbd>+<kbd>⌫</kbd> | <kbd>⌦</kbd> | delete forward |
| <span class="if-apple"><kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd></span> |<kbd>⌥</kbd>+<kbd>⇠</kbd> | move to previous word |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd> | <kbd>⌥</kbd>+<kbd>⇢</kbd> | move to next word |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>B</kbd></span> | <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⇠</kbd> | extend selection to previous word |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>F</kbd> | <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>⇢</kbd> | extend selection to next word |
| <kbd>⇞</kbd> | <kbd>⌃</kbd>+<kbd>⇠</kbd> | move to group start |
| <kbd>⇟</kbd> |<kbd>⌃</kbd>+<kbd>⇢</kbd> | move to group end |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>⇠</kbd> | extend selection to group start |
| <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>⇢</kbd> | extend selection to group end |
| <kbd>SPACE</kbd> | move after parent |
| <kbd>⇧</kbd>+<kbd>SPACE</kbd> | move before parent |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>A</kbd></span> |<kbd>⤒</kbd> | <kbd>⌘</kbd>+<kbd>⇠</kbd> | move to mathfield start |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>A</kbd></span> | <kbd>⇧</kbd>+<kbd>⤒</kbd> | <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⇠</kbd> | extend selection to mathfield start |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>E</kbd></span> | <kbd>⤓</kbd> | <kbd>⌘</kbd>+<kbd>⇢</kbd> |move to mathfield end |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>E</kbd></span> | <kbd>⇧</kbd>+<kbd>⤓</kbd> | <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>⇢</kbd> |extend selection to mathfield end |
| <kbd>⌃</kbd>+<kbd>5</kbd> | move to opposite <aside>superscript/subscript, upper/lower</aside> |
| <kbd>⌃</kbd>+<kbd>6</kbd> | move to superscript/upper |
| <kbd>⌃</kbd>+<kbd>-</kbd> | move to subscript/lower |
| <kbd>ESC</kbd> | finish |
| <kbd>⇧</kbd>+<kbd>ESC</kbd> | reject |
| <kbd>⇥</kbd> | accept suggestion |
| <kbd>⌤</kbd> | <kbd>⏎</kbd> | complete |
| <kbd>⌃</kbd>+<kbd>A</kbd> | <span class="if-apple"><kbd>⌘</kbd>+<kbd>A</kbd></span> | select all |
| <kbd>⌃</kbd>+<kbd>Z</kbd> | <span class="if-apple"><kbd>⌘</kbd>+<kbd>Z</kbd></span> | undo |
| <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>Z</kbd></span> | <kbd>⇧</kbd>+<kbd>⌃</kbd>+<kbd>Z</kbd> | <kbd>⌃</kbd>+<kbd>Y</kbd> | <span class="if-apple"><kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>Y</kbd></span> | redo |
| <span class="if-apple"><kbd>⌃</kbd>+<kbd>L</kbd></span> | scroll into view |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>K</kbd> | toggle keystroke caption |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>SPACE</kbd> | toggle virtual keyboard |
| <kbd>⌥</kbd>+<kbd>SPACE</kbd> | show context menu |
| <kbd>⌥</kbd>+<kbd>=</kbd> | apply text mode |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>T</kbd> | toggle math/text mode |
| <kbd>ESC</kbd> | enter/exit LaTeX mode |
| <kbd>\\</kbd> | enter LaTeX mode |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>⇡</kbd> | speak parent |
| <kbd>⌥</kbd>+<kbd>⌃</kbd>+<kbd>⇣</kbd> | speak all |

</div>

### Math Symbols

<div class="keybindings-table">

| Keybinding | Result |
| :--- | :--- | 
| <kbd>/</kbd> | <div data-tooltip='\frac{}{}'>$$\frac{\char"2B1A}{\char"2B1A}$$</div>  |
| <kbd>⌃</kbd>+<kbd>2</kbd> | | <kbd>⌥</kbd>+<kbd>V</kbd> | <div data-tooltip='\sqrt{}'>$$\sqrt{\char"2B1A}$$</div>|
| <kbd>⌥</kbd>+<kbd>P</kbd> | <div data-tooltip="\pi">$$\pi$$</div>|
| <kbd>⌥</kbd>+<kbd>O</kbd> | <div data-tooltip="\emptyset">$$\emptyset$$</div>|
| <kbd>⌥</kbd>+<kbd>D</kbd> | <div data-tooltip="\differentialD">$$\differentialD$$</div>|
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>O</kbd> | <div data-tooltip="\varnothing">$$\varnothing$$</div>|
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>D</kbd> | <div data-tooltip="\partial">$$\partial$$</div>|
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>P</kbd> | <div data-tooltip='\prod'>$$\prod_{i=\char"2B1A}^{\char"2B1A}$$</div>  |
| <kbd>⌥</kbd>+<kbd>5</kbd> | <div data-tooltip='\infty'>$$\infty$$</div>|
| <kbd>⌥</kbd>+<kbd>9</kbd> | <div data-tooltip="(">$$($$</div>|
| <kbd>⌥</kbd>+<kbd>0</kbd> | <div data-tooltip=")">$$)$$</div>|
| <kbd>⌥</kbd>+<kbd>\|</kbd> | <div data-tooltip="\|">$$\|$$</div>|
| <kbd>⌥</kbd>+<kbd>\\</kbd> | <div data-tooltip="\backslash">$$\backslash$$</div>|
| <kbd>⇧</kbd>+<kbd>&#96;</kbd> | `\~`  ||

</div>


### Matrix Editing

<div class="keybindings-table">

| Keybinding | Result |
| :--- | :--- | 
| <kbd>⌥</kbd>+<kbd>[</kbd> | <div data-tooltip='\left\lbrack \right\rbrack'>$$\left\lbrack \char"2B1A\right\rbrack$$</div> |
| <kbd>⇧</kbd>+<kbd>⌥</kbd>+<kbd>[</kbd> | <div data-tooltip='\left\lbrace \right\rbrace'>$$\left\lbrace \char"2B1A \right\rbrace$$</div> |
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

</div>



## Inline Shortcuts

Some sequence of characters are automatically translated to symbols. For example, typing `P` followed by `I` will result in "π".

Many of the [ASCIIMath](http://asciimath.org/) symbols
are supported.

If the conversion was not desired, for example you actually meant "pi", type <kbd>ctrl/⌘</kbd>+<kbd>Z</kbd> to undo it.





### Letter-Like Symbols

<div class="inlineshortcut-table">

| Trigger | Result |
| --- | --- |
| `∞` | `infty` |`oo` |<div data-tooltip="\infty">$$\infty$$</div> |
| `ii` | <div data-tooltip="\imaginaryI">$$\imaginaryI$$</div> |
| `jj` | <div data-tooltip="\imaginaryJ">$$\imaginaryJ$$</div> |
| `ee` | <div data-tooltip="\exponentialE">$$\exponentialE$$</div> |
| `NN` | <div data-tooltip="\N">$$\N$$</div> |
| `ZZ` | <div data-tooltip="\Z">$$\Z$$</div> |
| `QQ` | <div data-tooltip="\Q">$$\Q$$</div> |
| `RR` | <div data-tooltip="\R">$$\R$$</div> |
| `CC` | <div data-tooltip="\C">$$\C$$</div> |
| `PP` | <div data-tooltip="\P">$$\P$$</div> |
| `AA` | `forall` | <div data-tooltip="\forall">$$\forall$$</div> |
| `EE` | `exists` | <div data-tooltip="\exists">$$\exists$$</div> |
| `!EE` | `!exists` | <div data-tooltip="\nexists">$$\nexists$$</div> |
| `$` | <div data-tooltip="\$">$</div>  |
| `%` | <div data-tooltip="\%">$$\%$$</div> |
| `#` | <div data-tooltip="\#">$$\#$$</div> |
| `//` | <div data-tooltip="\slash">$$\slash$$</div> |
| `\\` | <div data-tooltip="\backslash">$$\backslash$$</div> |
| `diamond` | <div data-tooltip="\diamond">$$\diamond$$</div> |
| `square` | <div data-tooltip="\square">$$\square$$</div> |
| `_|_` | <div data-tooltip="\bot">$$\bot$$</div> |
| `TT` | <div data-tooltip="\top">$$\top$$</div> |
| `nabla` | <div data-tooltip="\nabla">$$\nabla$$</div> |
| `grad` | <div data-tooltip="\nabla">$$\nabla$$</div> |
| `del` | <div data-tooltip="\partial">$$\partial$$</div> |
| `∂` | `∆` | <div data-tooltip="\differentialD">$$\differentialD$$</div> |
| `dx` | <div data-tooltip="\differentialD x">$$\differentialD x$$</div> |
| `dy` | <div data-tooltip="\differentialD y">$$\differentialD y$$</div> |
| `dt` | <div data-tooltip="\differentialD t">$$\differentialD t$$</div> |
| `aleph` | <div data-tooltip="\aleph">$$\aleph$$</div> |

</div>


### Functions

<div class="inlineshortcut-table">

| Trigger | Result |
| :--- | :--- |
| `arcsin` | <div data-tooltip="\arcsin">$$\arcsin$$</div> |
| `arccos` | <div data-tooltip="\arccos">$$\arccos$$</div> |
| `arctan` | <div data-tooltip="\arctan">$$\arctan$$</div> |
| `sin` | <div data-tooltip="\sin">$$\sin$$</div> |
| `sinh` | <div data-tooltip="\sinh">$$\sinh$$</div> |
| `cos` | <div data-tooltip="\cos">$$\cos$$</div> |
| `cosh` | <div data-tooltip="\cosh">$$\cosh$$</div> |
| `tan` | <div data-tooltip="\tan">$$\tan$$</div> |
| `tanh` | <div data-tooltip="\tanh">$$\tanh$$</div> |
| `sec` | <div data-tooltip="\sec">$$\sec$$</div> |
| `csc` | <div data-tooltip="\csc">$$\csc$$</div> |
| `cot` | <div data-tooltip="\cot">$$\cot$$</div> |
| `log` | <div data-tooltip="\log">$$\log$$</div> |
| `ln` | <div data-tooltip="\ln">$$\ln$$</div> |
| `exp` | <div data-tooltip="\exp">$$\exp$$</div> |
| `lim` | <div data-tooltip='\lim_{}'>$$\lim_{\char"2B1A}$$</div> |
| `det` | <div data-tooltip="\det">$$\det$$</div> |
| `mod` | <div data-tooltip="\mod">$$\mod$$</div> |
| `max` | <div data-tooltip="\max">$$\max$$</div> |
| `min` | <div data-tooltip="\min">$$\min$$</div> |
| `erf` | <div data-tooltip="\operatorname{erf}">$$\operatorname{erf}$$</div> |
| `erfc` | <div data-tooltip="\operatorname{erfc}">$$\operatorname{erfc}$$</div> |
| `bessel` | <div data-tooltip="\operatorname{bessel}">$$\operatorname{bessel}$$</div> |
| `mean` | <div data-tooltip="\operatorname{mean}">$$\operatorname{mean}$$</div> |
| `median` | <div data-tooltip="\operatorname{median}">$$\operatorname{median}$$</div> |
| `fft` | <div data-tooltip="\operatorname{fft}">$$\operatorname{fft}$$</div> |
| `lcm` | <div data-tooltip="\operatorname{lcm}">$$\operatorname{lcm}$$</div> |
| `gcd` | <div data-tooltip="\operatorname{gcd}">$$\operatorname{gcd}$$</div> |
| `randomReal` | <div data-tooltip="\operatorname{randomReal}">$$\operatorname{randomReal}$$</div> |
| `randomInteger` | <div data-tooltip="\operatorname{randomInteger}">$$\operatorname{randomInteger}$$</div> |
| `Re` | <div data-tooltip="\operatorname{Re}">$$\operatorname{Re}$$</div> |
| `Im` | <div data-tooltip="\operatorname{Im}">$$\operatorname{Im}$$</div> |

</div>

### Relational Operators

<div class="inlineshortcut-table">

| Trigger | Result |
| :--- | :--- |
| `!=` | <div data-tooltip="\ne">$$\ne$$</div> |
| `>=` | <div data-tooltip="\ge">$$\ge$$</div> |
| `<=` | <div data-tooltip="\le">$$\le$$</div> |
| `<<` | <div data-tooltip="\ll">$$\ll$$</div> |
| `>>` | <div data-tooltip="\gg">$$\gg$$</div> |
| `~~` | <div data-tooltip="\approx">$$\approx$$</div> |
| `≈` | <div data-tooltip="\approx">$$\approx$$</div> |
| `?=` | <div data-tooltip="\questeq">$$\questeq$$</div> |
| `:=` | <div data-tooltip="\coloneq">$$\coloneq$$</div> |
| `::` | <div data-tooltip="\Colon">$$\Colon$$</div> |
| `-=` | <div data-tooltip="\equiv">$$\equiv$$</div> |
| `~=` | <div data-tooltip="\cong">$$\cong$$</div> |
| `lt` | <div data-tooltip="<">$$<$$</div> |
| `lt=` | <div data-tooltip="\leq">$$\leq$$</div> |
| `gt` | <div data-tooltip=">">$$>$$</div> |
| `gt=` | <div data-tooltip="\geq">$$\geq$$</div> |
| `-<` | <div data-tooltip="\prec">$$\prec$$</div> |
| `-lt` | <div data-tooltip="\prec">$$\prec$$</div> |
| `-<=` | <div data-tooltip="\preceq">$$\preceq$$</div> |
| `>-=` | <div data-tooltip="\succeq">$$\succeq$$</div> |
| `prop` | <div data-tooltip="\propto">$$\propto$$</div> |

</div>


### Other Operators

<div class="inlineshortcut-table">

| Trigger | Result |
| :--- | :--- |
| `*` | <div data-tooltip="\cdot">$$\cdot$$</div> |
| `**` | <div data-tooltip="\ast">$$\ast$$</div> |
| `***` | <div data-tooltip="\star">$$\star$$</div> |
| `&&` | <div data-tooltip="\land">$$\land$$</div> |
| `xin` | <div data-tooltip="x \in">$$x \in$$</div> |
| `in` | <div data-tooltip="\in">$$\in$$</div> |
| `!in` | <div data-tooltip="\notin">$$\notin$$</div> |
| `xx` | <div data-tooltip="\times">$$\times$$</div> |
| `+-` | <div data-tooltip="\pm">$$\pm$$</div> |
| `÷` | <div data-tooltip="\div">$$\div$$</div> |
| `(.)` | `o.` | <div data-tooltip="\odot">$$\odot$$</div> |
| `(+)` | `o+` | <div data-tooltip="\oplus">$$\oplus$$</div> |
| `(/)` | <div data-tooltip="\oslash">$$\oslash$$</div> |
| `(x)` | `ox` | <div data-tooltip="\otimes">$$\otimes$$</div> |
| `(-)` | <div data-tooltip="\ominus">$$\ominus$$</div> |
| `@` | <div data-tooltip="\circ">$$\circ$$</div> |
| `|><` | <div data-tooltip="\ltimes">$$\ltimes$$</div> |
| `><|` | <div data-tooltip="\rtimes">$$\rtimes$$</div> |
| `|><|` | <div data-tooltip="\bowtie">$$\bowtie$$</div> |
| `divide` | `-:` | <div data-tooltip="\div">$$\div$$</div> |
| `^^` | <div data-tooltip="\wedge">$$\wedge$$</div> |
| `^^^` | <div data-tooltip="\bigwedge">$$\bigwedge$$</div> |
| `vv` | <div data-tooltip="\vee">$$\vee$$</div> |
| `vvv` | <div data-tooltip="\bigvee">$$\bigvee$$</div> |
| `nn` | <div data-tooltip="\cap">$$\cap$$</div> |
| `nnn` | <div data-tooltip="\bigcap">$$\bigcap$$</div> |
| `uu` | <div data-tooltip="\cup">$$\cup$$</div> |
| `uuu` | <div data-tooltip="\bigcup">$$\bigcup$$</div> |
| `setminus` | <div data-tooltip="\backslash">$$\backslash$$</div> |
| `sub` | <div data-tooltip="\subset">$$\subset$$</div> |
| `sup` | <div data-tooltip="\supset">$$\supset$$</div> |
| `sube` | <div data-tooltip="\subseteq">$$\subseteq$$</div> |
| `supe` | <div data-tooltip="\supseteq">$$\supseteq$$</div> |
| `and` | <div data-tooltip="\land">$$\land$$</div> |
| `or` | <div data-tooltip="\lor">$$\lor$$</div> |
| `not` | <div data-tooltip="\neg">$$\neg$$</div> |


</div>

### Delimiters

<div class="inlineshortcut-table">

| Trigger | Result |
| :--- | :--- |
| `|__` | <div data-tooltip="\lfloor">$$\lfloor$$</div> |
| `__|` | <div data-tooltip="\rfloor">$$\rfloor$$</div> |
| `|~` | <div data-tooltip="\lceil">$$\lceil$$</div> |
| `~|` | <div data-tooltip="\rceil">$$\rceil$$</div> |
| `||` | <div data-tooltip="\Vert">$$\Vert$$</div> |
| `{` | <div data-tooltip="\\{">$$\\{$$</div> |
| `}` | <div data-tooltip="\\}">$$\\}$$</div> |
| `(:` | <div data-tooltip="\langle">$$\langle$$</div> |
| `:)` | <div data-tooltip="\rangle">$$\rangle$$</div> |

</div>

### Units

<div class="inlineshortcut-table">

| Trigger | Result |
| :--- | :--- |
| `mm` | <div data-tooltip="\operatorname{mm}">$$\operatorname{mm}$$</div> |
| `cm` | <div data-tooltip="\operatorname{cm}">$$\operatorname{cm}$$</div> |
| `km` | <div data-tooltip="\operatorname{km}">$$\operatorname{km}$$</div> |
| `kg` | <div data-tooltip="\operatorname{kg}">$$\operatorname{kg}$$</div> |

</div>


### Arrows

<div class="inlineshortcut-table">

| Trigger | Result |
| --- | --- |
| `iff` | <div data-tooltip="\iff">$$\iff$$</div> |
| `>->` | <div data-tooltip="\rightarrowtail">$$\rightarrowtail$$</div> |
| `->>` | <div data-tooltip="\twoheadrightarrow">$$\twoheadrightarrow$$</div> |
| `>->>` | <div data-tooltip="\twoheadrightarrowtail">$$\twoheadrightarrowtail$$</div> |
| `->...` | <div data-tooltip="\to\cdots">$$\to\cdots$$</div> |
| `->` | <div data-tooltip="\to">$$\to$$</div> |
| `|->` | <div data-tooltip="\mapsto">$$\mapsto$$</div> |
| `-->` | <div data-tooltip="\longrightarrow">$$\longrightarrow$$</div> |
| `<--` | <div data-tooltip="\longleftarrow">$$\longleftarrow$$</div> |
| `=>` | <div data-tooltip="\Rightarrow">$$\Rightarrow$$</div> |
| `==>` | <div data-tooltip="\Longrightarrow">$$\Longrightarrow$$</div> |
| `<=>` | <div data-tooltip="\Leftrightarrow">$$\Leftrightarrow$$</div> |
| `<->` | <div data-tooltip="\leftrightarrow">$$\leftrightarrow$$</div> |
| `uarr` | <div data-tooltip="\uparrow">$$\uparrow$$</div> |
| `darr` | <div data-tooltip="\downarrow">$$\downarrow$$</div> |
| `rarr` | <div data-tooltip="\rightarrow">$$\rightarrow$$</div> |
| `rArr` | <div data-tooltip="\Rightarrow">$$\Rightarrow$$</div> |
| `larr` | <div data-tooltip="\leftarrow">$$\leftarrow$$</div> |
| `lArr` | <div data-tooltip="\Leftarrow">$$\Leftarrow$$</div> |
| `harr` | <div data-tooltip="\leftrightarrow">$$\leftrightarrow$$</div> |
| `hArr` | <div data-tooltip="\Leftrightarrow">$$\Leftrightarrow$$</div> |
| `|--` | <div data-tooltip="\vdash">$$\vdash$$</div> |
| `|==` | <div data-tooltip="\models">$$\models$$</div> |


</div>


### Greek Letters

<div class="inlineshortcut-table">

| Trigger | Result |
| --- | --- |
| `alpha` | <div data-tooltip="\alpha">$$\alpha$$</div> |
| `beta` | <div data-tooltip="\beta">$$\beta$$</div> |
| `gamma` | <div data-tooltip="\gamma">$$\gamma$$</div> |
| `Gamma` | <div data-tooltip="\Gamma">$$\Gamma$$</div> |
| `delta` | <div data-tooltip="\delta">$$\delta$$</div> |
| `Delta` | <div data-tooltip="\Delta">$$\Delta$$</div> |
| `epsilon` | <div data-tooltip="\epsilon">$$\epsilon$$</div> |
| `varepsilon` | <div data-tooltip="\varepsilon">$$\varepsilon$$</div> |
| `zeta` | <div data-tooltip="\zeta">$$\zeta$$</div> |
| `eta ` | <div data-tooltip="\eta ">$$\eta $$</div> |
| `theta` | <div data-tooltip="\theta">$$\theta$$</div> |
| `vartheta` | <div data-tooltip="\vartheta">$$\vartheta$$</div> |
| `Theta` | <div data-tooltip="\Theta">$$\Theta$$</div> |
| `iota` | <div data-tooltip="\iota">$$\iota$$</div> |
| `kappa` | <div data-tooltip="\kappa">$$\kappa$$</div> |
| `lambda` | <div data-tooltip="\lambda">$$\lambda$$</div> |
| `Lambda` | <div data-tooltip="\Lambda">$$\Lambda$$</div> |
| `mu` | <div data-tooltip="\mu">$$\mu$$</div> |
| `nu ` | `µ`  | <div data-tooltip="\nu ">$$\nu $$</div> |
| `xi` | <div data-tooltip="\xi">$$\xi$$</div> |
| `Xi` | <div data-tooltip="\Xi">$$\Xi$$</div> |
| `pi` | <div data-tooltip="\pi">$$\pi$$</div> |
| `Pi` | <div data-tooltip="\Pi">$$\Pi$$</div> |
| `rho` | <div data-tooltip="\rho">$$\rho$$</div> |
| `sigma` | <div data-tooltip="\sigma">$$\sigma$$</div> |
| `Sigma` | <div data-tooltip="\Sigma">$$\Sigma$$</div> |
| `tau` | <div data-tooltip="\tau">$$\tau$$</div> |
| `upsilon` | <div data-tooltip="\upsilon">$$\upsilon$$</div> |
| `phi` | <div data-tooltip="\phi">$$\phi$$</div> |
| `varphi` | <div data-tooltip="\varphi">$$\varphi$$</div> |
| `Phi` | <div data-tooltip="\Phi">$$\Phi$$</div> |
| `chi` | <div data-tooltip="\chi">$$\chi$$</div> |
| `psi` | <div data-tooltip="\psi">$$\psi$$</div> |
| `Psi` | <div data-tooltip="\Psi">$$\Psi$$</div> |
| `omega` | `Ω` | <div data-tooltip="\omega">$$\omega$$</div> |
| `Omega` | <div data-tooltip="\Omega">$$\Omega$$</div> |

</div>


### Miscellaneous

<div class="inlineshortcut-table">

| Trigger | Result |
| --- | --- |
| `%` | <div data-tooltip="\%">$$\%$$</div> |
| `''` | <div data-tooltip="^{\doubleprime}">$$^{\doubleprime}$$</div> |
| `∑` | <div data-tooltip="\sum">$$\sum$$</div> |
| `sum` | <div data-tooltip='\sum_{}^{}'>$$\sum_{\char"2B1A}^{\char"2B1A}$$</div> |
| `int` | <div data-tooltip='\int_{}^{}'>$$\int_{\char"2B1A}^{\char"2B1A}$$</div> |
| `prod` | <div data-tooltip='\prod_{}^{}'>$$\prod_{\char"2B1A}^{\char"2B1A}$$</div> |
| `sqrt` | <div data-tooltip='\sqrt{}'>$$\sqrt{\char"2B1A}$$</div> |
| `¬` | <div data-tooltip="\neg">$$\neg$$</div> |
| `liminf` | <div data-tooltip="\operatorname*{lim~inf}_{}">$$\operatorname*{lim~inf}_{\char"2B1A}$$</div> |
| `limsup` | <div data-tooltip="\operatorname*{lim~sup}_{}">$$\operatorname*{lim~sup}_{\char"2B1A}$$</div> |
| `argmin` | <div data-tooltip="\operatorname*{arg~min}_{}">$$\operatorname*{arg~min}_{\char"2B1A}$$</div> |
| `argmax` | <div data-tooltip="\operatorname*{arg~max}_{}">$$\operatorname*{arg~max}_{\char"2B1A}$$</div> |
| `...` | <div data-tooltip="\ldots">$$\ldots$$</div> |
| `+...` | <div data-tooltip="+\cdots">$$+\cdots$$</div> |
| `-...` | <div data-tooltip="-\cdots">$$-\cdots$$</div> |
| `:.` | <div data-tooltip="\therefore">$$\therefore$$</div> |

</div>
