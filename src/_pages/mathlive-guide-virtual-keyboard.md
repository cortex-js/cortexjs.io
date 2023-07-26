---
layout: single
date: Last Modified
title: Virtual Keyboard
permalink: /mathlive/guides/virtual-keyboards/
read_time: false
sidebar:
    - nav: "universal"
toc: true
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---

{% readmore "/mathlive/virtual-keyboard/" %}
Learn more about using the math virtual keyboard
{% endreadmore %}


## Controlling when the Virtual Keyboard is Displayed

The default behavior is to display the virtual keyboard when a mathfield is
focused on a touch-enabled devices: mobile phones, tablets and laptops with 
a touch-screen.


This behavior can be changed with the `mf.mathVirtualKeyboardPolicy` property 
or the equivalent `math-virtual-keyboard-policy` attribute (set one or the 
other, not both).

<div class='symbols-table'>

| `mathVirtualKeyboardPolicy` | |
|:-- | :-- |
| `"auto"` |  On touch-enabled devices, show the virtual keyboard panel when the mathfield is focused. This is the default behavior. |
| `"manual"` | Do not show the virtual keyboard panel automatically. The visibility of the virtual keyboard panel can be controlled programatically with `mathVirtualKeyboard.show()` and `mathVirtualKeyboard.hide()`|

</div>

To show the math virtual keyboard anytime the mathfield is focused, on 
touch or non-touch devices, use:

```js
mf.mathVirtualKeyboardPolicy = "manual";
mf.addEventListener("focusin", () =>  mathVirtualKeyboard.show());
mf.addEventListener("focusout", () =>  mathVirtualKeyboard.hide());
```


## Controlling the Virtual Toggle Visibility

The virtual keyboard toggle is displayed by default when the mathfield
can be modified, that is when it's not read-only or disabled.


**To control the visibility of the virtual keyboard toggle**, use CSS. 

For example to hide the toggle unless on a touch-enabled device, use:

```css
@media not (pointer: coarse) {
  math-field::part(virtual-keyboard-toggle) {
    display: none;
  }
}
```


## Customizing the Size of the Keyboard

By default the virtual keyboard is sized so that it can be used comfortably
on touch-devices. Its size will adjust based on the available space in the 
viewport.

However, you may want to have a more compact virtual keyboard to leave more 
room for the content. You can control the appearance of the virtual keyboard
using some CSS variables. Set those variables in a rule that applies to 
the entire document, for example the `body` element selector.

```css
body {
  --keycap-height: 24px;
  --keycap-font-size: 16px;
  --keycap-shift-font-size: 9px;
  --keycap-small-font-size: 9px;
  --keycap-extra-small-font-size: 9px;
  --keyboard-toolbar-font-size: 16px;
  --keycap-gap: 1px;
}
```


The following CSS variables can be used to adjust the layout:

- `--keycap-height`
- `--keycap-max-width`
- `--keycap-gap`
- `--keycap-font-size`
- `--keycap-shift-font-size`
- `--keycap-small-font-size`
- `--keycap-extra-small-font-size`
- `--keycap-secondary-border-bottom`
- `--keycap-secondary-border-bottom`
- `--keyboard-toolbar-font-size`

- `--keyboard-padding-horizontal`
- `--keyboard-padding-top`
- `--keyboard-padding-bottom`
- `--keyboard-row-padding-left`
- `--keyboard-row-padding-right`

- `--variant-keycap-length`
- `--variant-keycap-font-size`
- `--variant-keycap-aside-font-size`



## Customizing the Layouts

The virtual keyboard panel displays multiple layouts which can be 
toggled using the layout switcher: `numeric`, `symbols`, `alphabetic` 
and `greek`.

**To choose which layouts are listed in the layout switcher**, use the 
`mathVirtualKeyboard.layouts` property.

For example, to only show the numeric and symbols layouts, use:

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
<div slot="html">&lt;math-field&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;</div>
<div slot="javascript">
document.querySelector('math-field').addEventListener('focus', () => { 
  mathVirtualKeyboard.layouts = ["numeric", "symbols"];
  mathVirtualKeyboard.visible = true;
});
</div>
</code-playground>

<hr>

To revert to the default layouts, use: 

```js
mathVirtualKeyboard.layouts = "default";
```

## Additional Layouts

In addition to `numeric`, `symbols`, `alphabetic` and `greek`, the 
following layouts are available:

### Minimalist Layout

The `"minimalist"` layout is focused on entry of simple expressions.

```js
mathVirtualKeyboard.layouts = ["minimalist"];
```


![](/assets/images/mathfield/virtual-keyboard-ipad/ipad-minimalist.webp)

### Compact Layout

The `"compact"` layout is similar to `"minimalist"` but the keycaps include variants.

```js
mathVirtualKeyboard.layouts = ["compact"];
```


![](/assets/images/mathfield/virtual-keyboard-ipad/ipad-compact.webp)


### Numeric Only Layout

The `"numeric-only"` layout is suitable for input that is purely numeric.

```js
mathVirtualKeyboard.layouts = ["numeric-only"];
```


![](/assets/images/mathfield/virtual-keyboard-ipad/ipad-numeric-only.webp)




## Defining Custom Layouts

In addition to the built-in layouts, you can define your own layouts.

**The simplest way to define a custom layout** is to set `mathVirtualKeyboard.layouts` to an object 
literal with a `rows` property, an array of keycaps.

For best result, you should make sure the rows have no more than 10 keycaps.

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
<div slot="html">&lt;math-field&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;</div>
<div slot="javascript">
document.querySelector('math-field').addEventListener('focus', () => {
  mathVirtualKeyboard.layouts = {
    rows: [
      [
        "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
        "(", ")", "\\sqrt{#0}", "#@^{#?}",
      ],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ]
  };
  mathVirtualKeyboard.visible = true;
});</div>
</code-playground>


![](/assets/images/mathfield/custom-layout.png)

Each keycap is a LaTeX string which is used both as the label of the keycap,
and as the content inserted when the keycap is pressed.


### Placeholder Tokens

You'll notice from the example above that the LaTeX fragments defining the 
keycap can contain some special placeholder tokens:

<div class='symbols-table'>

| Token | |
|:-- | :-- |
| `#@` |  Replaced with the selection, if there is one. If there is no selection, replaced with an implicit argument to the left of the caret. For example, for `12+34`, if the caret is at the end, `#@` would be replaced with `34`. |
| `#0` |  replaced with the selection if there is one, a `\placeholder{}` command otherwise |
| `#?` |  replaced with a `\placeholder{}` command |

</div>

### Keycap Shortcuts

The value of  the keycap can be a LaTeX string, or one of the special values
below, corresponding to a standard keycap. These shortcuts define 
the label, appearance, command when pressed, shifted command and variants 
for those keys.

`"[left]"` `"[right]"`  `"[return]"`  `"[hide-keyboard]"` `"[shift]"` 

`"[backspace]"`  `"[undo]"` `"[redo]"` `"[cut]"` `"[copy]"` `"[paste]"` 

`"[.]"`  `"[+]"`  `"[-]"`  `"[/]"`  `"[*]"`  `"[=]"` 

`"[(]"` `"[)]"` 

`"[0]"` `"[1]"` `"[2]"` `"[3]"` `"[4]"` `"[5]"` `"[6]"` `"[7]"` `"[8]"` `"[9]"` 

`"[separator]"` `["hr"]`

`"[foreground-color]"` `"[background-color]"`

### Advanced Keycaps

For more control over the appearance and behaviro of a keycap, instead of a 
string, use an object literal with the following properties:

- `label`: the label of the keycap, displayed using the system font. This
  can include some HTML markup, for example `"<span><i>x</i>&thinsp;²</span>"`.
  If none is provided, the `latex` property is used instead for the label of
  the keycap. The label can also be one of the keycap shortcuts mentioned
  above, e.g. `[left]`. If a keycap shortcut is used, the other properties
  override the values defined by the shortcut.
- `latex`: if no `label` is provided, the value of the `latex` property is used as
  the label of the keycap. This property is also used to insert content in 
  the mathfield when the keycap is pressed.
- `class`: a set of CSS classes to style this keycap. The classes can be custom 
defined (see below about the `style` layer property), or be one or more of the
 standard ones:
    - `tex`: use the TeX font for its label.
      Using the `tex` class is not necessary if using the `latex` property to 
      define the label.
    - `ghost`: the keycap with no border or background
    - `small`: display the label in a smaller size
    - `action`: an "action" keycap (for arrows, return, etc...)
    - `bottom`, `left`, `right`: alignment of the label
    - `hide-shift`: do not display the shift top-right label on the keycap if 
       a `shift` property is provided.
- `width`: the width of the keycap, as a multiple of a standard keycap. That
  is 0.5 for half-wide keys, 1.5 for one and half wide keys, etc...
- `aside`: an optional small label displayed below the keycap. This label
  may not be displayed if the space available is too small.
- `altKeys`: a set of variants to display when the keycap is long-pressed.
- `shift`: either a LaTeX string indicated what is inserted when the shift
  key is pressed with this keycap, or a keycap record
- `variants`: an array of keycaps (either as string or keycap records) defining
  the variants for this keycap (see below).

The action when the keycap is pressed is defined by one of these properties:
- `insert`: the LaTeX to be inserted when the keycap is pressed.
- `command`: the command to perform when the keycap is pressed. For example: 
 `["performWithFeedback", "commit"]`.

If neither `insert` nor `command` are provided, the `latex` property is used to
define the content inserted when the keycap is pressed.


{% readmore "/mathlive/guides/commands/" %}
Learn more about the available commands
{% endreadmore %}


Here's an example of a basic keyboard layout:

```js
mathVirtualKeyboard.layouts = {
  label: 'Basic',
  rows: [
    [
      '[7]', '[8]', '[9]', '[+]', {label: '[separator]', width: 0.5 },
      { class: 'small', latex: '\\frac{#@}{#0}' },
      '\\varnothing', '\\infty', '\\in', '\\notin',
      '[separator]',
    ],
    [
      '[4]', '[5]', '[6]', '[-]', {label: '[separator]', width: 0.5 },
      '[(]', '[)]', '\\lt', '\\le', '\\hat{=}', '[separator]',
    ],
    [
      '[1]', '[2]', '[3]', '\\cdot', {label: '[separator]', width: 0.5 },
      '[', ']', '\\gt', '\\ge',

      { label: '[backspace]', width: 2 },
    ],
    [
      { label: '[0]', width: 2 },
      '[.]', '\\colon', {label: '[separator]', width: 0.5 },
      '\\lbrace', '\\rbrace', '=', '\\ne', '[left]', '[right]',
    ],
  ],
};
```


### Keycap Variants

The default layouts include **variants** for many of their keycaps. These
variants are accessed with a long press on the keycap. The variants are 
typically related, but less frequently used version of the main keycap.

You can define variants for a custom layout by specifying a `variants` 
property with the definition of a keycap. The value of the `variants` property
is an array of `VirtualKeyboardKeycap`. As a shortcut, a string can also be 
used, which is equivalent to a `VirtualKeyboardKeycap` with a `latex` property
equal to the string, that is, it will display the latex string as the keycap
label and insert it when the key is pressed.

```json
rows: [
  [
    { latex: "a", variants: ["A", "\\alpha", "\\Alpha"] }
    ...
  ]
]
```

### Layer Styling

If you want to apply custom CSS classes to some keycaps, you can provide
a definition for them using the `style` property. Note that in that case
you can't use the `rows` shortcut, you must provide the full definition
of the layers.

Also, note that you may need to use the `!important` modifier to override
the default styling.

```js
mathVirtualKeyboard.layouts = [
  {
    label: 'minimal',
    toolip: 'Only the essential',
    layers: [
      {
        style:
          '.digit { background: blue !important; color: white !important }',
        rows: [
          [
            '+',
            '-',
            '\\times',
            '\\frac{#@}{#?}',
            '=',
            '.',
            '(',
            ')',
            '\\sqrt{#0}',
            '#@^{#?}',
          ],
          [
            { class: 'digit', latex: '1' },
            { class: 'digit', latex: '2' },
            { class: 'digit', latex: '3' },
            { class: 'digit', latex: '4' },
            { class: 'digit', latex: '5' },
            { class: 'digit', latex: '6' },
            { class: 'digit', latex: '7' },
            { class: 'digit', latex: '8' },
            { class: 'digit', latex: '9' },
            { class: 'digit', latex: '0' },
          ],
        ],
      },
    ],
  },
  'alphabetic',
];
```


### Multiple Layers

Most keyboard layouts are made of a single layer. However, if your layout 
includes multiple layers, use the `layers` property to provide an array of 
layers.


```js
mathVirtualKeyboard.layouts = {
  layers: [
    {
      rows: [
        [
          "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
          "(", ")", "\\sqrt{#0}", "#@^{#?}",
        ],
      ]
    },
    {
      rows: [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ]
    }

  ],
};

```
### Multiple Layouts

You can also mix default layouts with your own. For example, to add the
alphabetic layout after your own:

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    toolip: "Only the essential",
    rows: [
      [
        "+", "-", "\\times", "\\frac{#@}{#?}", "=", ".",
        "(", ")", "\\sqrt{#0}", "#@^{#?}",
      ],
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ]
  }, 
  "alphabetic"
];
```

If you include more than one layout, it's a good idea to provide a label
and tooltip so they get propertly displayed in the layout switcher.


## Customizing the Appearance of the Virtual Keyboard

**To customize the appearance of the virtual keyboard panel** set the following 
CSS variables on a selector that applies to the container of the virtual 
keyboard panel, which is the `<body>` element by default: 

```css
body {
  --keyboard-zindex: 3000;
}
```

You can also set these CSS variables programmatically:

```js
document.body.style.setProperty("--keyboard-zindex", "3000");
```


### Customizing the Virtual Keyboard Stack Order

**To specify the stack order of the virtual keyboard relative to 
other DOM elements** set the `--keyboard-zindex` CSS variable. 

The default `zindex` of the virtual keyboard is `105`.


### Customizing the Virtual Keyboard Colors

**To control the appearance of the virtual keyboard text and background colors**, set the 
value of the following CSS variables to a CSS color:

- `--keyboard-accent-color`
- `--keyboard-toolbar-text`
- `--keyboard-toolbar-text-active`
- `--keyboard-toolbar-background`
- `--keyboard-toolbar-background-hover`
- `--keyboard-toolbar-background-selected`

- `--keycap-background`
- `--keycap-background-hover`
- `--keycap-background-active`
- `--keycap-background-pressed`
- `--keycap-border`
- `--keycap-border-bottom`
- `--keycap-text`
- `--keycap-text-active`
- `--keycap-text-hover`
- `--keycap-text-pressed`
- `--keycap-shift-text`
- `--keycap-shift-color`
- `--keycap-primary-background`
- `--keycap-primary-text`
- `--keycap-primary-background-hover`
- `--keycap-secondary-background`
- `--keycap-secondary-background-hover`
- `--keycap-secondary-text`
- `--keycap-secondary-border`
- `--keycap-secondary-border-bottom`
- `--box-placeholder-color`

- `--variant-panel-background`
- `--variant-keycap-text`
- `--variant-keycap-text-active`
- `--variant-keycap-background-active`


The following CSS variables are a border shorthand value:

- `--keyboard-border`
- `--keyboard-horizontal-rule`






## Preventing Input from the Physical Keyboard

**To require the virtual keyboard to be used for input and ignore 
keys pressed on the physical keyboard** listen and `preventDefault()` on `"keydown"`
events during the capture phase, and show the virtual keyboard when the mathfield
is focused.

```js
mf.addEventListener("keydown", (evt) =>  evt.preventDefault(), {capture: true});
mf.addEventListener("focus", () =>  mathVirtualKeyboard.show());
```


## Displaying the Virtual Keyboard in a Custom Container

By default the virtual keyboard is inserted at the end of the document's `body` 
element.

In some cases you may want to display the virtual keyboard in some other 
container.

For example when using [full screen elements](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) that contain a mathfield, you want to make sure the virtual
keyboard panel is visible by attaching it to the full screen element.

**To select which DOM element the virtual keyboard is attached to**, set the
`mathVirtualKeyboard.container` property to the desired DOM element.

The container element should be at least 320px wide to ensure that the 
default layouts can fit. The height of the container element will be 
adjusted so that the virtual keyboard can fit. {.notice--warning}




## Customizing the Alphabetical Layout

By default the `"alphabetic"` layout is determined based on the locale (QWERTY 
for english speaking countries, AZERTY for french speaking
countries, etc..). 

**To select a different alphabetic layout**, such as DVORAK or COLEMAK, 
use the `mathVirtualKeyboard.alphabeticLayout` property.

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
  <div slot="javascript">const mf = document.querySelector('math-field');
document.querySelector('math-field').addEventListener('focus', () => {
  mathVirtualKeyboard.layouts = ["alphabetic"];
  mathVirtualKeyboard.alphabeticLayout = "dvorak";
  mathVirtualKeyboard.visible = true;
});
</div>
    <div slot="html">&lt;math-field&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>


### QWERTZ Layout

<div style="display: flex">

<div style="width: 50%; margin: auto">

![QWERTZ layout](/assets/images/mathfield/virtual-keyboard-ipad/ipad-qwertz.webp)

</div>

<div style="width: 50%; margin: auto">

![QWERTZ layout, shifted](/assets/images/mathfield/virtual-keyboard-ipad/ipad-qwertz-shift.webp)

</div>

</div>


### AZERTY Layout

<div style="display: flex">

<div style="width: 50%; margin: auto">

![AZERTY layout](/assets/images/mathfield/virtual-keyboard-ipad/ipad-azerty.webp)

</div>

<div style="width: 50%; margin: auto">


![AZERTY layout, shifted](/assets/images/mathfield/virtual-keyboard-ipad/ipad-azerty-shift.webp)

</div>

</div>

### DVORAK Layout

<div style="display: flex">

<div style="width: 50%; margin: auto">

![DVORAK Layout](/assets/images/mathfield/virtual-keyboard-ipad/ipad-dvorak.webp)

</div>

<div style="width: 50%; margin: auto">

![DVORAK Layout, shifted](/assets/images/mathfield/virtual-keyboard-ipad/ipad-dvorak-shift.webp)

</div>

</div>




{% readmore "/mathlive/guides/lifecycle/" %}
**Advanced Topic:** Understand in depth the <strong>Lifecycle of a MathfieldElement</strong>: construction, interaction with the DOM and when can you communicate with it
{% endreadmore %}


{% readmore "/docs/mathlive/" %}
**Next:** Reference documentation of the <strong>MathLive API</strong>
{% endreadmore %}

