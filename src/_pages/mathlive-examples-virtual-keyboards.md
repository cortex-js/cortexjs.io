---
layout: single
date: Last Modified
title: MathLive Guide - Virtual Keyboards
permalink: /mathlive/guides/virtual-keyboards/
read_time: false
sidebar:
    - nav: "mathlive"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Virtual Keyboards

Typing math formulas require access to many special symbols. While [keyboard 
shortcuts and inline shortcuts](/mathlive/guides/shortcuts) can help, mobile devices require another 
solution. A virtual keyboard is a keyboard displayed on screen that can be 
customized with specialized symbols for math input.

![](/assets/images/mathfield/virtual-keyboard.png)

The mathfield virtual keyboard panel can display multiple keyboards. 
The default keyboards are **numeric**, **functions**, **symbols**, 
**roman letters** and **greek letters**.

These keyboards  include the most common math symbols and 
they can be customized to fit your specific needs. For example you can remove
some keyboards, or create new ones.


Touch and hold a key to display variants related to the key. Not all keys have
variants, though.

![](/assets/images/mathfield/alt-keys.png){.max-w-md}

![](/assets/images/mathfield/more-alt-keys.png){.max-w-md}



## Controlling when the virtual keyboard panel is displayed

The default behavior of the virtual keyboard panel is to only be displayed on 
touch-enabled devices (mobile phones, tablets, laptops with a touch-screen) when
a matfield is focused.

![](/assets/images/mathfield/mobile-virtual-keyboard.png){.max-w-md}


This behavior can be changed with the `virtualKeyboardMode` configuration property:
- `"auto"`:  this is the default behavior: on touch-enabled devices, show the 
virtual keyboard panel when the mathfield is focused, otherwise, don't show it.
- `"manual"`: a toggle button to control the virtual keyboard panel is displayed in the
mathfield
- `"onfocus"`: the virtual keyboard panel is displayed when the mathfield is focused
- `"off"`: never show the virtual keyboard panel

There is only one virtual keyboard panel displayed at a time, but each mathfield
can specify different virtual keyboard panel configurations. {.notice--info}

## Customizing the appearance of the virtual keyboard toggle

By specifying a CSS rule for the `.ML__virtual-keyboard-toggle` selector the 
appearance of the virtual keyboard toggle can be modified.

Make sure the rule has sufficient CSS specificity to be applied. Add a `!important`
directive or prefix the selector with the id of your mathfield. {.notice--warning}

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'),  {
  virtualKeyboardMode: 'manual'
});
</div>
    <div slot="html">&lt;style&gt;
  .ML__virtual-keyboard-toggle {
    color: red !important;
  }
&lt;/style&gt;
&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>


The icon of the virtual keyboard toggle can be changed using the `virtualKeyboardToggleGlyph`
configuration property.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'),  {
  virtualKeyboardMode: "manual",
  virtualKeyboardToggleGlyph: `&lt;svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"&gt;&lt;path fill="currentColor" d="M192 288H32c-18 0-32 14-32 32v160c0 18 14 32 32 32h160c18 0 32-14 32-32V320c0-18-14-32-32-32zm-29 140c3 3 3 8 0 12l-11 11c-4 3-9 3-12 0l-28-28-28 28c-3 3-8 3-12 0l-11-11c-3-4-3-9 0-12l28-28-28-28c-3-3-3-8 0-12l11-11c4-3 9-3 12 0l28 28 28-28c3-3 8-3 12 0l11 11c3 4 3 9 0 12l-28 28 28 28zM480 0H320c-18 0-32 14-32 32v160c0 18 14 32 32 32h160c18 0 32-14 32-32V32c0-18-14-32-32-32zm-16 120c0 4-4 8-8 8h-40v40c0 4-4 8-8 8h-16c-4 0-8-4-8-8v-40h-40c-4 0-8-4-8-8v-16c0-4 4-8 8-8h40V56c0-4 4-8 8-8h16c4 0 8 4 8 8v40h40c4 0 8 4 8 8v16zm16 168H320c-18 0-32 14-32 32v160c0 18 14 32 32 32h160c18 0 32-14 32-32V320c0-18-14-32-32-32zm-16 152c0 4-4 8-8 8H344c-4 0-8-4-8-8v-16c0-4 4-8 8-8h112c4 0 8 4 8 8v16zm0-64c0 4-4 8-8 8H344c-4 0-8-4-8-8v-16c0-4 4-8 8-8h112c4 0 8 4 8 8v16zM192 0H32C14 0 0 14 0 32v160c0 18 14 32 32 32h160c18 0 32-14 32-32V32c0-18-14-32-32-32zm-16 120c0 4-4 8-8 8H56c-4 0-8-4-8-8v-16c0-4 4-8 8-8h112c4 0 8 4 8 8v16z"/&gt;&lt;/svg&gt`
});
</div>
    <div slot="html">&lt;style&gt;
  div.ML__virtual-keyboard-toggle{
    color: #555;
  }
  div.ML__virtual-keyboard-toggle:hover {
    background: transparent;
    color: var(--primary);
    box-shadow:  none;
  }
&lt;/style&gt;
&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>


## Changing the arrangement of alphabetical keys

By default, the layout of the alphabetic virtual keyboard is determined based
on the locale (QWERTY for english speaking countries, AZERTY for french speaking
countries, etc..). 

To select a different alphabetic keyboard layouts, such as DVORAK and COLEMAK, 
use the `virtualKeyboardLayout` configuration property.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'),  {
  virtualKeyboardMode: "manual",
  virtualKeyboardLayout: 'dvorak'
});
</div>
    <div slot="html">&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>


## Controling which keyboards are displayed

The virtual keyboard panel displays multiple keyboards which can be 
toggled using the keyboard switcher: `numeric`, `functions`, `symbols`, `roman` 
and `greek`.

To choose which keyboards are available, use the `virtualKeyboards` 
configuration property. The value of this property is a space-separated string 
of the name of the keyboards that should be displayed.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'),  {
  virtualKeyboardMode: "manual",
  virtualKeyboards: 'numeric symbols'
});
</div>
    <div slot="html">&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>


## Defining custom keyboards

A keyboard is made up of one or more "layers". A keyboard layer is a set of 
keys that can be toggled using another key. For example, the `roman` keyboard
has a regular layer and a layer for symbols. Most keyboards have a single layer.
## JSON keyboard layout

Virtual Keyboards can be defined with a JSON structure.

First, let's define a layer, which we'll call `"college-layer"`.

A layer is an array of rows, a row is an array of keycaps. Each keycap
can have the following properties:

- `class`: the CSS classes to style this keycap. The classes can be custom 
defined (see below about the `styles` layer property), or be one of the default
ones:
    - `keycap`: a standard-width keycap, using the system font for its label
    - `keycap tex`: a standard-width keycap, using the TeX font for its label
    - `modifier`: a modifier (shift/option, etc...) keycap
    - `keycap small`: display the label in a smaller size
    - `action`: an "action" keycap (for arrows, return, etc...)
    - `separator w5`: a half-width blank used as a separator. Other widths
    include `w15` (1.5 width), `w20` (double width) and `w50` (five-wide, used 
    for the space bar).
    - `bottom`, `left`, `right`: alignment of the label
- `label`: the HTML markup displayed for the keycap. If no `label` is provided,
the `latex` 
- `latex`: a Latex fragment used as a label
- `key`: a key, such as "9"
- `aside`: an optional small label displayed below the keycap. This label
may not be displayed if the space available is too small.

- `insert`: a Latex fragment to insert when the keycap is pressed
- `altKeys`: the name of a set of alternate keys to display when the keycap is
long-pressed.
- `command`: the command to perform when the keycap is pressed.
- `shifted`: the HTML markup to display as the label of the keycap when the
shift key is pressed
- `shiftedCommand`: the command to perform when the keycap is pressed with
the shift key.

The following properties, in order, are used to determine how to display 
they keycap: `latex`, `label`, `insert`.

When the keycap is pressed, the following properties are used, in order, to 
determine the action to perform: `command`, `insert`, `latex`, `key`.

To associate a CSS stylesheet with this layer, use the `styles` property of the
layer.

The appearance of the layer can be further customized by providing a CSS class 
name for the `backdrop` and `container` properties of the layer.

```js
    const COLLEGE_KEYBOARD_LAYER = {
      "college-layer": {
        rows: [
          [
            { class: "keycap tex", label: "<i>a</i>" },
            { class: "keycap tex", label: "<i>x</i>" },
            { class: "separator w5" },
            { class: "keycap", key: "7" },
            { class: "keycap", latex: "8" },
            { class: "keycap", latex: "9" },
            { class: "keycap", latex: "\\div" },
            { class: "separator w5" },
            {
              class: "keycap tex",
              insert: "$$#@^{2}$$",
              label: "<span><i>x</i>&thinsp;²</span>"
            },
            {
              class: "keycap tex",
              insert: "$$#@^{}$$",
              label: "<span><i>x</i><sup>&thinsp;<i>n</i></sup></span>"
            },
            {
              class: "keycap tex",
              insert: "$$\\sqrt{#0}$$",
              latex: "\\sqrt{#0}"
            }
          ],
          [
            { class: "keycap tex", label: "<i>b</i>" },
            { class: "keycap tex", label: "<i>y</i>" },
            { class: "separator w5" },
            { class: "keycap", latex: "4" },
            { class: "keycap", latex: "5" },
            { class: "keycap", latex: "6" },
            { class: "keycap", latex: "\\times" },
            { class: "separator w5" },
            { class: "keycap", latex: "\\frac{#0}{#0}" },
            { class: "separator w6" },
            { class: "separator w6" }
          ],
          [
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "separator w5" },
            { class: "keycap", latex: "1" },
            { class: "keycap", latex: "2" },
            { class: "keycap", latex: "3" },
            { class: "keycap", latex: "-" },
            { class: "separator w5" },
            { class: "separator w6" },
            { class: "separator w6" },
            { class: "separator w6" }
          ],
          [
            { class: "keycap tex", label: "(" },
            { class: "keycap tex", label: ")" },

            { class: "separator w5" },
            { class: "keycap", latex: "0" },
            { class: "keycap", latex: "," },
            { class: "keycap tex", latex: "\\pi" },
            { class: "keycap", latex: "+" },
            { class: "separator w5" },
            {
              class: "action",
              command: ["performWithFeedback", "moveToPreviousChar"],
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>"
            },
            {
              class: "action",
              command: ["performWithFeedback", "moveToNextChar"],
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>"
            },
            {
              class: "action font-glyph bottom right",
              command: ["performWithFeedback", "deleteBackward"],
              label: "&#x232b;"
            }
          ]
        ]
      }
    };
    
```

```js
  "customVirtualKeyboards": {
  "keyboard-name": {
    "label": "College", // Label displayed in the Virtual Keyboard Switcher
    "tooltip": "College Level", // Tooltip when hovering over the label
    "layer": "layer-name"
  }
}
```

```js
const COLLEGE_KEYBOARD = {
  "college": {
    "label": "College", // Label displayed in the Virtual Keyboard Switcher
    "tooltip": "College Level", // Tooltip when hovering over the label
    "layer": "layer-name"
  }
}
```


```js
  "customVirtualKeyboardLayers": COLLEGE_KEYBOARD_LAYER
  "customVirtualKeyboards": COLLEGE_KEYBOARD,
  "virtualKeyboards": "college"
}
```




<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'));
</div>
    <div slot="html">&lt;div id="mathfield" style="
        font-size: 32px; 
        padding: 8px; 
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3); 
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)"
&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>




## See Also
* <a href="/docs/mathlive/">MathLive SDK<span class='ml-sm'><i class="fas fa-chevron-right navigation"></i><span></span></a>
