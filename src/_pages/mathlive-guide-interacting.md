---
layout: single
date: Last Modified
title: Interacting - MathLive Guide
permalink: /mathlive/guides/interacting/
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
    - /assets/js/code-playground.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
    };
</script>


# Interacting with a Mathfield

## Reading the Content of a Mathfield

The content of a mathfield is available by reading the `value`
property of the mathfield element, just like with a `<textarea>`.

**To be notified as soon as the content of the mathfield is modified** listen for 
an `'input'` event.

**Try**: modify the `'input'` event below to a `'change'` event. Notice how the `'change'` event
is only sent if you press the **Return** or **Enter** key, or when the mathfield
loses focus and the content has been modified. {.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="javascript">document.getElementById('formula').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    console.log(ev.target.value);
});</div>
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field id="formula"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>

Reading the `value` property is equivalent to calling the `getValue()` method with 
no argument. 

**To control how the result is formatted**, pass options to [`getValue()`](/docs/mathlive/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(getValue%3Ainstance)).
For example to get the content as a MathJSON expression, use `getValue('math-json')`.

The MathJSON format is a lightweight data interchange format for mathematical notation. [Learn more about MathJSON](/math-json/).{.notice--info}

**Try:** [Other formats](/docs/mathlive/#(%22mathfield%22%3Amodule).(OutputFormat%3Atype)) are available: change `'math-json'` to `'spoken-text'`.{.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field id="formula"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
    <div slot="javascript">const mf = document.getElementById('formula');
mf.addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    console.log(ev.target.getValue('math-json'));
});</div>
</code-playground>


## Changing the Content of a Mathfield

You can change the value of the mathfield programatically. In the example 
below, the **Latex** input field is editable and is reflected in the mathfield 
(and vice-versa).

Note that we use the `suppressChangeNotifications` option when
changing the content of the mathfield, to prevent a `'input'` event from being 
triggered and creating an infinite loop.{.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
  <div slot="javascript">import 'mathlive';
    const mf = document.getElementById('formula');
    mf.addEventListener('input',(ev) => {
        document.getElementById('latex').value = mf.value;
    });
//
    document.getElementById('latex').value = mf.value;
//
    // Listen for changes in the latex text field, and reflect its value in 
    // the mathfield.
//
    document.getElementById('latex').
      addEventListener('input', (ev) => {
        mf.setValue(
          ev.target.value, 
          {suppressChangeNotifications: true}
        );
    });
  </div>
  <div slot="html">&lt;label&gt;Mathfield&lt;/label&gt;
  &lt;math-field id="formula"&gt;
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
  &lt;/math-field&gt;                
  &lt;label&gt;Latex&lt;/label&gt;
  <textarea class="output" id="latex" autocapitalize="off" autocomplete="off"
  autocorrect="off" spellcheck="false"></textarea></textarea>
  </div>
</code-playground>




## Applying Style to a Mathfield

The text color ("ink") and background color ("paper"), as well as other 
stylistic attributes, can be changed on a mathfield, or a portion of a mathfield
using `applyStyle()`.

This style applies to the content of the formula and will be reflected in the LaTeX output. To change the appearance of the mathfield but not
the content of the formula, see [Customizing](mathlive/guides/customizing/). {.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
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
const mf = document.getElementById('formula');
// Change the background color of the entire mathfield
mf.applyStyle(
  {backgroundColor: 'yellow' }, 
  {range: [0, -1]}
);
</div>
<div slot="html">
&lt;math-field id="formula"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;                
</div>
</code-playground>


**To change the style of a portion of the mathfield**, specify a selection range
to `applyStyle()`.


<code-playground layout="stack" class="m-lg w-full-lg">
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
const mf = document.getElementById('formula');
// Change the color and size of the first two characters of the mathfield
mf.applyStyle({color: "red", fontSize: 7 }, { range: [0, 2] });
</div>
<div slot="html">
&lt;math-field id="formula"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;                
</div>
</code-playground>


## Detecting a Click on a Mathfield

In most cases MathLive will respond to mouse and keyboard interactions with 
the mathfield. However, in some cases it might be useful to detect when a 
mathfield is clicked on. For example, you could display one or more read-only
mathfields in a list and prompt the user to pick one by clicking on it.

In general, to be notified of an event, use `mf.addEventListener()`. This 
include some generic events, as well as some that are specific to mathfields.
Events that target a DOM element inside the mathfield (inside the shadow DOM)
will bubble and be retargeted to appear as if they had targeted the
mathfield (that is, the `evt.target` will be the mathfield itself).

This include the following standard events:

- `change`: *Return* or *Enter* key was pressed
- `blur`, `focus`, `focusin`, `focusout`
- `mousedown`, `mouseup`, `mousemove`, `mouseout, `mouseover`
- `wheel`
- `beforeinput`, `input`, `keydown`, `keyup`
- all the [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) such as `pointerdown`, `pointerup`, etc... and all the touch events

As well as these mathfield specific events:
- `mount`: the mathfield has been connected to the DOM
- `unmount`: the mathfield is no longer connected to the DOM
- `math-error`: syntax and other errors
- `keystroke`: general keyboard interactions
- `focus-out`: tab key interactions
- `move-out`: arrow key interactions
- `mode-change`: change to `math`, `text` or `latex` mode
- `read-aloud-status-change`
- `selection-change`
- `undo-state-change`

The `click` event may be dispatched in some cases. However, this event should
be avoided. It is a synthetic event, meaning it's generated by the browser
based on some heuristic that tries to detect a `pointerdown` followed by a 
`pointer`up on the same DOM element. However, interacting with a mathfield may 
change its DOM elements (to display the selection for example), the browser 
may not be able to reliably trigger this event.

Instead, to detect when a mathfield is being clicked on, listern for a `focus`
event or a `pointerdown` event. The `focus` event has the benefit of working
with both mouse and keyboard, which makes this solution more accessible.


## Detecting When the User has Finished Editing a Mathfield

**To detect when the user presses the **Return** or **Enter** key in a mathfield**,
listen for the `change` event. Note that this event is not fired when in LaTeX
editing mode, where **Return** or **Enter** is used to exit the mode.

## Interacting with the Clipboard

Users can export the content of the mathfield by using standard **Copy**/**Cut**
commands (<kbd>ctrl</kbd>/<kbd>command</kbd>+<kbd>X</kbd> and <kbd>ctrl</kbd>/<kbd>command</kbd>+<kbd>C</kbd>).

Multiple flavors are put on the clipboard, and the recipient of the **Paste** operation can pick whichever is most appropriate:

<div class='symbols-table'>

| | |
|:-- | :-- |
| `text/plain` | LaTeX wrapped with a `\begin{equation*}` and `\end{equation*}`.|
| `application/x-latex` | Raw LaTeX |
| `application/json`| A MathJSON representation of the formula. |
| `application/mathml+xml` | A MathML representation of the formula. |

</div>

The LaTeX in the `text/plain` flavor is "wrapped" to make it easier for the recipient of the paste to recognize that this content is in LaTeX format. There isn't really a standard format for this, but testing of several LaTeX-capable editors has shown that `\begin{equation*}` was the most commonly recognized.

For improved interoperability, the exported LaTeX uses the `latex-expanded` format. In this format, macros that may be used in the formula are expanded to their definition. For example, if the `\differentialD` command is used in the formula, it is exported as its corresponding definition, `\mathrm{d}`. .{.notice--info}

**To customize the content of the `text/plain` flavor**, use the `onExport()` hook. 

For example, to wrap the exported latex with `<math>...</math>` instead:

```js
mf.setOptions({onExport: (mf, latex) => `<math>${latex}</math>`});
```

**To export the "raw" (not expanded) LaTeX)**, use:

```js
mf.setOptions({onExport: (mf, latex, range) => 
  `\\(${mg.getValue(range, 'latex')}\\)`
});
```

The exported format doesn't have to be LaTeX. To export ASCIIMath instead:

```js
mf.setOptions({onExport: (mf, latex, range) => 
  "`" + mg.getValue(range, 'ascii-math') + "`".
});
```
The standard delimiter for AsciiMath is the <kbd>&#96;</kbd> (backtick) character .{.notice--info}

<!-- Intercepting navigate out of and multiple fields -->

<!-- MathfieldListeners --> 

<!-- $insert() -->


<!-- ## Performing editing commands -->


{% readmore "/mathlive/guides/customizing/" %}
Next: <strong>Customizing a Mathfield</strong>: controlling its appearance and behavior
{% endreadmore %}

{% readmore "/mathlive/guides/lifecycle/" %}
Next: Understand in depth the <strong>Lifecycle of a MathfieldElement</strong>: construction, interaction with the DOM and when you can communicate with it
{% endreadmore %}

