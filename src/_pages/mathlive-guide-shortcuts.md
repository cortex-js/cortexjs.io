---
layout: single
date: Last Modified
title: Shortcuts - MathLive Guide
permalink: /mathlive/guides/shortcuts/
read_time: false
sidebar:
    - nav: "mathlive"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Key Bindings and Inline Shortcuts

Input using a physical keyboard can be sped using two methods:

-   key bindings
-   inline shortcuts

## Key bindings

A key binding is a combination of keys pressed simultaneously that
triggers a command.

For example, pressing <kbd>Alt/Options</kbd> and the <kbd>V</kbd> key at the same time will insert
a square root. Pressing <kbd>Control/⌘</kbd> and the <kbd>Z</kbd> key at the same time will undo
the last command.

MathLive has an extensive set of [default key bindings](https://github.com/arnog/mathlive/blob/master/src/editor/keybindings.ts). 

**To override, customize or add to the list of supported key bindings**, provide a
`onKeystroke` handler.

<code-playground layout="stack">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.getElementById('mf');
mf.setOptions({
  onKeystroke: (mathfield, keystroke, ev) => {
    if (keystroke === 'alt+[KeyS]') {
      mf.insert('\\sum^\\infty_{n=0}');
      return false;
    } else if (keystroke === 'meta+[KeyK]') {
      mf.executeCommand('toggleVirtualKeyboard');
      return false;
    }
    // Keystroke not handled, return true for default handling to proceed.
    return true;
  }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>

The `onKeystroke` handler is invoked when a keystroke is about to be processed.

-   `keystroke` is a string describing the keystroke, for example `alt-[KeyS]`
-   `ev` is the native JavaScript keyboard event.

Return `false` to stop handling of the event, otherwise the default command
(if any) associated with this keystroke will be processed.

### International Keyboards

Correctly handling keyboard shortcuts while accounting for international 
keyboard layout is surprisingly difficult. MathLive uses some heuristics that
may occasionally result in a surprising result.

This section details how MathLive uses keyboard events to determine which
keyboard shortcut to activate.


Let's consider the keyboard shortcut <kbd>Control/⌘</kbd>+<kbd>Alt/Option</kbd>+<kbd>A</kbd>

When the user presses this key combination on a keyboard with a US keyboard 
layout, the event received will have the properties `code = "KeyA"` and  `key = "\u00e5"`.

On a French AZERTY keyboard layout, the event received will have `code =
"KeyQ"` and  `key = "\u00e6"`.

Why is the code `KeyQ` even though the user pressed the key labeled `A` on their
AZERTY keyboard? On this keyboard layout, the Q and A keys are swapped compared
to the US layout and the `code` property reflects the "physical" key pressed.

This is not unusual. While some keys retain their positions, many keys are
swapped around or altogether unique in some layouts, particularly for
punctuations and symbols. The code property of the event does not
represent the label of the key, but indicates the physical position of the key
as if it was on a US keyboard, in this case "the key immediately to the right of
the caps lock key, which is labeled Q on a US keyboard (but is labeled A on a
French keyboard".

What we want to know is that the user pressed a key labeled <kbd>A</kbd>. But none of the
information in the event record tells us that. The value of the key field varies
depending on the keyboard layout and the modifiers pressed.

However, if we know the keyboard layout, we can use a table that maps the value
of the key field to infer the label of the key  the user pressed, i.e. what the
user sees printed on the top of the key cap, regardless of its physical location
on the keyboard. Once we have the label, we can figure out that the user pressed
<kbd>Control/⌘</kbd> + <kbd>A</kbd> using the modifier fields of the event.

But how do we know what is the current keyboard layout? There is unfortunately
no web platform API (broadly supported) to obtain that information. 
So one approach is to indicate programmatically to MathLive which keyboard 
layout the user is using. Otherwise, MathLive will use the user locale to 
guess the keyboard (for example, guessing to use the French AZERTY keyboard 
if the user locale is France).

Finally, MathLive uses a heuristic to refine its guess: with each keyboard
event, MathLive checks that the info in the event record (specifically the code
and key fields) is consistent with the current keyboard layout. If not, it
finds a better matching keyboard layout, and will switch to that keyboard layout
if it is confident enough of that guess.

MathLive currently has a limited set of "known" keyboard layouts. If you happen
to use a keyboard layout MathLive doesn't know, it will guess the wrong keyboard
layout. As a result some keyboard shortcuts may produce unexpected results.




<section id='inline-shortcuts'>

## Inline Shortcuts

An inline shortcut is a sequence of keystrokes typed on the keyboard that get
replaced with another symbol. Unlike keystroke shortcuts they cannot be used to
trigger a command, but only to insert a LaTeX fragment.

For example, typing the <kbd>P</kbd> key followed by the <kbd>I</kbd> key will result in the 
`\pi` \\[ \pi \\] command being inserted, and not the `pi` characters.

If a substitution was undesirable, use **Undo** to revert to the raw input.

MathLive has some [built-in inline shortcuts](https://github.com/arnog/mathlive/blob/master/src/editor/shortcuts-definitions.ts) 
defined, but they can be replaced or enhanced with additional shortcuts.

<code-playground layout="stack">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.getElementById('mf');
mf.setOptions({
  inlineShortcuts: {
    ...mf.getOptions('inlineShortcuts'),    // Preserve default shortcuts
    "infty": { mode: 'math', value: '\\infty' },
  }
});</div><div slot="html">&lt;math-field id="mf"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>

The `mode` property, if present, indicate the mode in which this shortcut should 
apply, either `"math"` or `"text"`. If the property is not present the shortcut 
apply in both modes.


**To constraint the context in which a shortcut should apply**, use the `after` 
property:

```javascript
mf.setOptions({
  inlineShortcuts: {
    ...mf.getOptions('inlineShortcuts'),    // Preserve default shortcuts
    in: {
        mode: 'math',
        after: 'space | letter | digit | symbol | fence',
        value: '\\in',
    },
  }
});
```

The `after` property indicate in what context the shortcut should apply. One or 
more values can be specified, separated by a `|` sign. If any of the values 
match, the shortcut will be applicable. 

Possible values are:

-   `"space"` A spacing command, such as `\quad`
-   `"nothing"` The begining of a group
-   `"surd"` A square root or n-th root
-   `"frac"` A fraction
-   `"function"` A function such as `\sin` or `f`
-   `"letter"` A letter, such as `x` or `n`
-   `"digit"` `0` through `9`
-   `"binop"` A binary operator, such as `+`
-   `"relop"` A relational operator, such as `=`
-   `"punct"` A punctuation mark, such as `,`
-   `"array"` An array, such as a matrix or cases statement
-   `"openfence"` An opening fence, such as `(`
-   `"closefence"` A closing fence such as `}`
-   `"text"` Some plain text

</section>


## Multicharacter Symbol

In some cases it may not be possible to define in advance all the possible 
combinations of keystrokes that should be interpreted as an inline shortcut. 
For example, it might be desirable to recognize multi-character symbols, e.g. 
\\[ \mathrm{speed} = \frac{\mathrm{distance}}{\mathrm{time}}\\]

There are several ways to represent multicharacter symbols in LaTeX. 
Conventionally, the `\mathit{}` command is used to represent variables and the 
`\mathrm{}` for function names. You may prefer to use `\mathrm{}` in both cases.
The command `\operatorname{}` may also be used for this purpose.

**To recognize multicharacter symbols,** provide a `onMultichar()` handler.
If the handler recognize the input as a valid multichar symbol, it 
should return a command representing this symbol.

```ts
mf.setOptions({
  onMulticharSymbol: (_mf, s) => {
    if (/^[A-Z][a-z]+$/.test(s)) return `\\mathrm{${s}}`;
    if (/^[a-z][a-z]+$/.test(s)) return `\\mathit{${s}}`;
    return '';
  },
});

```

### Customizing the Inline Shortcut Sensitivity

**To change how quickly a set of keys must be typed to be considered a shortcut**
set the `inlineShortcutTimeout` option.

It represents the maximum amount of time, in milliseconds, between consecutive characters for them to be
considered part of the same shortcut sequence.

A value of 0 is the same as infinity: any consecutive
character will be candidate for an inline shortcut, regardless of the
interval between this character and the previous one.

A value of 750 will indicate that the maximum interval between two
characters to be considered part of the same inline shortcut sequence is
3/4 of a second.

This is useful to enter `+-` as a sequence of two characters, while also
supporting the `±` shortcut with the same sequence.

The first result can be entered by pausing slightly between the first and
second character if this option is set to a value of 250 or so.

Note that some operations, such as clicking to change the selection, or losing
the focus on the mathfield, will automatically timeout the shortcuts.

<section id='ascii-math'>

### ASCIIMath Inline Shortcuts

[ASCIIMath](https://github.com/asciimath/asciimathml/blob/master/ASCIIMathML.js) defines a series of shortcuts that can be typed with ASCII characters to
represent mathematical symbols and expressions.

The most common ASCIIMath shortcuts are part of the default inline shortcuts.

**To support additional ASCIIMath shortcuts**, add them to the `inlineShortcuts`
setting.

```js
mf.setOptions({
  inlineShortcuts: {
    //
    // ASCIIIMath
    //
   // Binary operation symbols
    '*': '\\cdot',
    '**': '\\ast',
    '***': '\\star',
    '//': '\\slash',
    '\\\\\': '\\backslash',
    'setminus': '\\backslash',
    '|><': '\\ltimes',
    '><|': '\\rtimes',
    '|><|': '\\bowtie',
    '-:': '\\div',
    'divide': '\\div',
    '@': '\\circ',
    'o+': '\\oplus',
    'ox': '\\otimes',
    'o.': '\\odot',
    '^^': '\\wedge',
    '^^^': '\\bigwedge',
    'vv': '\\vee',
    'vvv': '\\bigvee',
    'nn': '\\cap',
    'nnn': '\\bigcap',
    'uu': '\\cup',
    'uuu': '\\bigcup',

    // Binary relation symbols
    '-=': '\\equiv',
    '~=': '\\cong',
    'lt': '<',
    'lt=': '\\leq',
    'gt': '>',
    'gt=': '\\geq',
    '-<': '\\prec',
    '-lt': '\\prec',
    '-<=': '\\preceq',
    // '>-': '\\succ',
    '>-=': '\\succeq',
    'prop': '\\propto',
    'diamond': '\\diamond',
    'square': '\\square',
    'iff': '\\iff',

    'sub': '\\subset',
    'sup': '\\supset',
    'sube': '\\subseteq',
    'supe': '\\supseteq',
    'uarr': '\\uparrow',
    'darr': '\\downarrow',
    'rarr': '\\rightarrow',
    'rArr': '\\Rightarrow',
    'larr': '\\leftarrow',
    'lArr': '\\Leftarrow',
    'harr': '\\leftrightarrow',
    'hArr': '\\Leftrightarrow',
    'aleph': '\\aleph',

    // Logic
    'and': '\\land',
    'or': '\\lor',
    'not': '\\neg',
    '_|_': '\\bot',
    'TT': '\\top',
    '|--': '\\vdash',
    '|==': '\\models',

    // Other functions
    '|__': '\\lfloor',
    '__|': '\\rfloor',

    '|~': '\\lceiling',
    '~|': '\\rceiling',

    // Arrows
    '>->': '\\rightarrowtail',
    '->>': '\\twoheadrightarrow',
    '>->>': '\\twoheadrightarrowtail'
  }
});
```

</section>


{% readmore "/mathlive/guides/speech/" %}
**Next:** Control <strong>Speech</strong> output
{% endreadmore %}
