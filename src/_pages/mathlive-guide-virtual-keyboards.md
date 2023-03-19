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
---
<script>
    moduleMap = {
        "mathlive": "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>
Typing math formulas require access to many special symbols. While [keyboard 
shortcuts and inline shortcuts](/mathlive/guides/shortcuts) can help when a 
physical keyboard is available, touch-enabled devices without a physical 
keyboard attached require another solution.{.xl}

A **virtual keyboard** is a keyboard displayed on screen that contains 
 specialized symbols for math input.

![](/assets/images/mathfield/virtual-keyboard.png)

A keyboard may have multiple **layouts** which you can select with the 
layout selector.

The virtual keyboard can display multiple layouts. 
The default layouts are **numeric**, **functions**, **symbols**, 
**alphabetic** and **greek letters**.

These layouts  include the most common math symbols. You can 
customize them to fit your specific needs. For example you can remove some 
layouts, or create new ones.


**To display variants related to a key**, press and hold it. Most keys have
variants, but a few don't.

![](/assets/images/mathfield/alt-keys.png)





## Controlling when the Virtual Keyboard is Displayed

The default behavior is to display the virtual keyboard when a mathfield is
focused on a touch-enabled devices (mobile phones, tablets and laptops with 
a touch-screen).

![](/assets/images/mathfield/mobile-virtual-keyboard.png)


This behavior can be changed with the `mf.mathVirtualKeyboardPolicy` property 
or the equivalent `math-virtual-keyboard-policy` attribute.

<div class='symbols-table'>

| `mathVirtualKeyboardPolicy` | |
|:-- | :-- |
| `"auto"` |  On touch-enabled devices, show the virtual keyboard panel when the mathfield is focused. This is the default behavior. |
| `"manual"` | Do not show the virtual keyboard panel automatically. The visibility of the virtual keyboard panel can be controlled programatically with `mathVirtualKeyboard.show()` and `mathVirtualKeyboard.hide()`|

</div>

The virtual keyboard toggle is displayed by default when the when the mathfield 
can be modified, that is when it's not read-only or disabled.

## Controlling the Virtual Toggle Visibility

**To control the visibility of the virtual keyboard toggle**, use CSS. 

For example to hide the toggle unless on a touch-enabled device, use:

```css
@media not (pointer: coarse) {
  math-field::part(virtual-keyboard-toggle) {
    display: none;
  }
}
```

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

The container element should be at least 365px wide to ensure that the 
default virtual layouts can fit. The height of the container element will be 
adjusted so that the virtual keyboard can fit. {.notice--warning}


## Customizing the Layouts

The virtual keyboard panel displays multiple layouts which can be 
toggled using the layout switcher: `numeric`, `functions`, `symbols`, `alphabetic` 
and `greek`.

**To choose which layouts are available**, use the `mathVirtualKeyboard.layouts` 
property.

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
<div slot="javascript">mathVirtualKeyboard.layouts = ["numeric", "symbols"];</div>
</code-playground>

<hr>

To revert to the default layouts, use: 

```js
mathVirtualKeyboard.layouts = 'default';
```


## Defining Custom Layouts

In addition to the built-in layouts, you can use layouts that you define.

**To use a custom layout** set the layout to an object literal with a `rows`
property, an array of keycaps.


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
<div slot="javascript">mathVirtualKeyboard.layouts = {
  rows: [
    [
      '+', '-', '\\times', '\\frac{#@}{#?}', '=', '.',
      '(', ')', '\\sqrt{#0}', '#@^{#?}',
    ],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ]
};</div>
</code-playground>


![](/assets/images/mathfield/custom-layout.png)

Each keycap is a LaTeX string which is used both as the label of the keycap,
and as the content to insert when the keycap is pressed.


You can also mix default layouts with your own. For example, to add the
alphabetic layout after our own:

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    toolip: "Only the essential",
    rows: [
      [
        '+', '-', '\\times', '\\frac{#@}{#?}', '=', '.',
        '(', ')', '\\sqrt{#0}', '#@^{#?}',
      ],
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ]
  }, 
  'alphabetic'
];
```

If you include more than one layout, it's a good idea to include a label
and tooltip so they get propertly displayed in the layout switcher.

### Placeholder Tokens

You'll notice that the LaTeX fragment can contain one of the following special placeholder tokens:

<div class='symbols-table'>

| Token | |
|:-- | :-- |
| `#@` |  Replaced with the selection, if there is one. If there is no selection, replaced with an implicit argument to the left of the caret. For example, for `12+34`, if the caret is at the end, `#@` would be replaced with `34`. |
| `#0` |  replaced with the selection if there is one, a `\placeholder{}` command otherwise |
| `#?` |  replaced a `\placeholder{}` command |

</div>

### Advanced Keycaps

Instead of defining keycaps with a string, you can use an object literal 
with the following properties:

- `label`: the label of the keycap, displayed using the system font. This
  can include some HTML markup, for example `"<span><i>x</i>&thinsp;²</span>"`
- `latex`: if no label is provided, the value of this property is used as
  the label of the keycap. This property is also used to insert content in 
  the mathfield when the keycap is pressed.
- `class`: a set of CSS classes to style this keycap. The classes can be custom 
defined (see below about the `styles` layer property), or be one or more of the
 standard ones:
    - `tex`: use the TeX font for its label.
      Using the `tex` class is not necessary if using the `latex` property to 
      define the label.
    - `small`: display the label in a smaller size
    - `modifier`: a modifier (shift/option, etc...) keycap
    - `action`: an "action" keycap (for arrows, return, etc...)
    - `separator w5`: a half-width blank used as a separator. Other widths
    include `w15` (1.5 width), `w20` (double width) and `w50` (five-wide, used 
    for the space bar).
    - `bottom`, `left`, `right`: alignment of the label
- `command`: the command to perform when the keycap is pressed. For example: 
 `["performWithFeedback", "commit"]`
- `aside`: an optional small label displayed below the keycap. This label
  may not be displayed if the space available is too small.
- `altKeys`: a set of variants to display when the keycap is long-pressed.
- `shifted`: the HTML markup to display as the label of the keycap when the
shift key is pressed
- `shiftedCommand`: the command to perform when the keycap is pressed with
the shift key.

{% readmore "/mathlive/guides/commands/" %}
Learn more about the available commands
{% endreadmore %}

**To use a SVG glyph in the keycap label**, use some SVG markup in the `label` 
property and set the `class` attribute to `svg-glyph`

To reference the built-in SVG glyphs, use the `<use>` SVG command:
- `svg-commit`
- `svg-tab`
- `svg-arrow-left`
- `svg-arrow-right`
- `svg-angle-double-left`
- `svg-angle-double-right`
- `svg-shift`
- `svg-command`
- `svg-delete-backward`
- `svg-copy`
- `svg-undo`
- `svg-redo`
- `svg-trash`

For example:

```json
  {
    class: "action",
    label: "<svg><use xlink:href='#svg-commit' /></svg>",
    command: ["performWithFeedback", "commit"]
  },
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

### Layout Defined with Markup

Defining a layout using rows of keycaps is a convenient and compact
way of creating your own layout.

However, if you need more control in the appearance of your layout, you
can define a layout with some HTML markup.

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    toolip: "Only the essential",
    markup: "<ul><li>...</li></ul>"
  }, 
  'alphabetic'
];

```

### Layer Styling

If you want to apply custom CSS classes to some keycaps, you can provide
a definition for them using the `styles` property:

```js
mathVirtualKeyboard.layouts = [
  {
    label: "minimal",
    toolip: "Only the essential",
    styles: ".digit{ background: blue; color: white }",
    rows: [
      [
        '+', '-', '\\times', '\\frac{#@}{#?}', '=', '.',
        '(', ')', '\\sqrt{#0}', '#@^{#?}',
      ],
      [
        {class: "digit", latex: '1'},
        {class: "digit", latex: '2'},
        {class: "digit", latex: '3'},
        {class: "digit", latex: '4'},
        {class: "digit", latex: '5'},
        {class: "digit", latex: '6'},
        {class: "digit", latex: '7'},
        {class: "digit", latex: '8'},
        {class: "digit", latex: '9'},
        {class: "digit", latex: '0'},
      ],
    ]
  }, 
  'alphabetic'
];

```


### Multiple Layers

Most keyboard layouts are made of a single layer. However, if your layout 
includes multiple layers (for example a layer accessible with a shifted key),
use the `layers` property to provide an array of layers.


```js
mathVirtualKeyboard.layouts = {
  layers: [
    {
      rows: [
        [
          '+', '-', '\\times', '\\frac{#@}{#?}', '=', '.',
          '(', ')', '\\sqrt{#0}', '#@^{#?}',
        ],
      ]
    },
    {
      rows: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ]
    }

  ],
};

```

## Customizing the Appearance of the Virtual Keyboard

**To customize the appearance of the virtual keyboard panel** set the following 
CSS variables on a selector that applies to the container of the virtual 
keyboard panel, which is the `<body>` element by default: 

```css
body {
  --keyboard-zindex: 3000;
}
```

Alternatively, you can set these CSS variables programmatically:

```js
document.body.style.setProperty("--keyboard-zindex", "3000");
```


### Customizing the Virtual Keyboard Stack Order

**To specify the stack order of the virtual keyboard panel relative to 
other DOM elements** set the `--keyboard-zindex` CSS variable. 

The default `zindex` of the virtual keyboard panel is `105`.


### Customizing the Virtual Keyboard Colors

**To control the appearance of the virtual keyboard text and background colors**, set the 
value of the following CSS variables to a CSS color:
- `--keyboard-background`
- `--keyboard-text`
- `--keyboard-text-active`
- `--keyboard-background-border`


### Customizing the Keycaps

**To control the appearance of keycaps**, use the following CSS variables:
  - `--keycap-height`
  - `--keycap-font-size`
  - `--keycap-small-font-size` (only if needed)
  - `--keycap-extra-small-font-size` (only if needed)
  - `--keycap-tt-font-size` (only if needed)
  - `--keycap-background`, a color
  - `--keycap-background-active`, a color
  - `--keycap-background-border`, a color
  - `--keycap-background-border-bottom`, a color
  - `--keycap-text`, a color
  - `--keycap-text-active`, a color
  - `--keycap-secondary-text`, a color
  - `--keycap-modifier-background`, a color
  - `--keycap-modifier-border`, a color
  - `--keycap-modifier-border-bottom`, a color



## Customizing the Alphabetical Layout

By default the alphabetic layout is determined based on the locale (QWERTY 
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
  <div slot="javascript">import 'mathlive';
mathVirtualKeyboard.alphabeticLayout = "dvorak";
</div>
    <div slot="html">&lt;math-field&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>







{% readmore "/mathlive/guides/lifecycle/" %}
**Advanced Topic:** Understand in depth the <strong>Lifecycle of a MathfieldElement</strong>: construction, interaction with the DOM and when can you communicate with it
{% endreadmore %}


{% readmore "/docs/mathlive/" %}
**Next:** Reference documentation of the <strong>MathLive API</strong>
{% endreadmore %}

