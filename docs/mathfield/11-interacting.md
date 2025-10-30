---
date: Last Modified
title: Interacting with a Mathfield
slug: /mathfield/guides/interacting/
---

# Interacting with a Mathfield

## Changing the Content of a Mathfield

**To change the value of a `<math-field>` element programatically** set its `value` 
property.

In the playground below, the **LaTeX** input field is editable and is reflected 
in the mathfield, and vice-versa.

:::info[Note]

Note that we use the `silenceNotifications` option when
changing the content of the mathfield, to prevent an `"input"` event from being 
triggered and creating an infinite loop.

:::

```live
:::js
const mf = document.getElementById("formula");
const latex = document.getElementById("latex");
//
mf.addEventListener("input",(ev) => latex.value = mf.value);
//
latex.value = mf.value;
//
// Listen for changes in the "latex" text field, 
// and reflect its value in the mathfield.
//
latex.addEventListener("input", (ev) => 
    mf.setValue(
      ev.target.value, 
      {silenceNotifications: true}
    )
);

:::html
<label>Mathfield</label>
<math-field id="formula">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>          
<label>Latex</label>
<textarea id="latex" autocapitalize="off" autocomplete="off"
  autocorrect="off" spellcheck="false"></textarea>
```



## Reading the Content of a Mathfield

**To read the content of a `<math-field>` element as a LaTeX string** use its `value` property, 
just like with a `<textarea>`.

**To be notified when the content of the mathfield is modified** listen for 
an `"input"` event.

**Try**: modify the `"input"` event below to a `"change"` event. Notice how the `"change"` event
is only sent if you press the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key, or when the mathfield
loses focus and the content has been modified.

```live
:::js
document.getElementById('formula').addEventListener('input',(ev) => {
  // `ev.target` is an instance of `MathfieldElement`
  console.log(ev.target.value);
});

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

---

Reading the `value` property is equivalent to calling the `getValue()` method with 
no argument. 

**To control the format of the result**, pass options to [`getValue()`](/docs/mathfield/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(getValue%3Ainstance)).
For example to get the content as a MathJSON expression, use `mf.getValue('math-json')`.


**Try:** [Other formats](/docs/mathfield/#(%22mathfield%22%3Amodule).(OutputFormat%3Atype)) are available: change `"math-json"` to `"spoken-text"`.

```live
:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>

:::js
import 'compute-engine';
const mf = document.getElementById('formula');

// `ev.target` is an instance of `MathfieldElement`
mf.addEventListener('input',
  (ev) => console.log(ev.target.getValue('math-json'))
);
```


## Using a Mathfield with the Compute Engine

The [MathJSON](/math-json) format is a lightweight mathematical notation interchange format. 

The Compute Engine is a JavaScript library that can perform
mathematical operations on MathJSON expressions.

**To use the Compute Engine**, import the Compute Engine library, e.g. `import "https://esm.run/@cortex-js/compute-engine"` 


If the Compute Engine has been loaded in the page, mathfields will automatically
create an instance of the compute engine when needed. 

**To access that shared Compute Engine instance**, use `MathfieldElement.computeEngine`.

:::info[Note]
If the value returned is `undefined`, it means that the Compute Engine has not
been loaded in the page.
:::

You can also create your own instance of the Compute Engine and pass it to the
mathfield using the `computeEngine` property.

```js example
import { ComputeEngine } from 'compute-engine';
MathfieldElement.computeEngine = new ComputeEngine();
```

:::info[Note]
This is usually not necessary and you can rely on the default shared instance 
of the Compute Engine.
:::



**To read the content of a `<math-field>` element as a boxed MathJSON expression** use the mathfield `expression` property.

Using `mf.expression` is equivalent to calling `MathfieldElement.computeEngine.parse(mf.value)` or `MathfieldElement.computeEngine.box(mf.getValue("math-json"))`.

Once you have a boxed expression, you can perform operations on it using the
Compute Engine.

For example, you can:
- [evaluate it](/compute-engine/guides/evaluate/) using `mf.expression.evaluate()`
- simplify it using `mf.expression.simplify()`
- [compare it to another expression](/compute-engine/guides/symbolic-computing/#comparing-expressions) using `mf.expression.isEqual()` and
   `mf.expression.isSame()`
- [compile it](/compute-engine/guides/compiling/) to JavaScript

:::info[Note]

Note that the expressions are returned by default in a canonical form, which means that
they may be different from the original input. For example, `x + 1` and `1 + x`
are considered equal, and will be returned as `1 + x`. If necessary you
can request non-canonical forms.
:::


<ReadMore path="/compute-engine/guides/canonical-form/">
Learn more about **canonical forms**.<Icon name="chevron-right-bold" />
</ReadMore>


You can also extend the definitions of the Compute Engine [by adding your own](/compute-engine/guides/augmenting/).

```live
:::html
<math-field id="formula">
  \mathrm{Expand}((a+b)^6)
</math-field>

:::js
import 'compute-engine';
const mf = document.getElementById('formula');
mf.addEventListener('input', () => 
  console.log(mf.expression.evaluate())
);
console.log(mf.expression.evaluate());
```


<ReadMore path="/compute-engine/guides/symbolic-computing/" >
Learn more about **symbolic computing** with the Compute Engine<Icon name="chevron-right-bold" />
</ReadMore>


## Listening for Changes to a Mathfield

The mathfield element dispatches the `beforeinput` and `input` 
[Input Events](https://www.w3.org/TR/input-events-1/), which are also 
implemented by `<textarea>` and similar elements.

The `beforeinput` and `input` events implement the `InputEvent` interface.

These events are sent before (`beforeinput` event) and after (`input` event) a 
user attempts to edit the mathfield. This includes insertion and deletion of 
content, and formatting changes.

The events include an `inputType` property that describe what caused the event 
to be dispatched.

<div className="symbols-table first-column-header" style={{"--first-col-width":"21ch"}}>

| `inputType` | |
|:-- | :-- |
| `insertText` | Some content was added. It could be math content, plain text or raw latex. It could also be a row or column in matrix that was added. |
| `insertLineBreak` | The <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed. Note that the actual content of the mathfield may not have changed. |
| `insertFromPaste`| The content of the mathfield was changed because of a paste operation |
| `deleteWordBackward`|  |
| `deleteWordForward`|  |
| `deleteWordForward`|  |
| `deleteSoftLineBackward`|  |
| `deleteSoftLineForward`|  |
| `deleteHardLineBackward`|  |
| `deleteHardLineForward`|  |
| `deleteByCut`| The content was changed because of a cut operation |
| `deleteContent`| Some content was deleted, but no particular direction applied |
| `deleteContentBackward`|  |
| `deleteContentForward`|  |
| `historyUndo`| The content was changed because of an undo command |
| `historyRedo`| The content was changed because of a redo command |
</div>

The `beforeinput` event is dispatched before any modifications to the mathfield 
have been done. This event is cancelable. Calling `preventDefault()` on the 
event will cause the modification to be prevented.

If the `beforeinput` event is not canceled, the mathfield content is modified 
and a `input` event is dispatched. The `input` event is not cancelable.

## Detecting When the User has Finished Editing a Mathfield

**To detect when the user presses the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key in a mathfield**,
listen for the `change` event. 

Note that this event is not fired when in LaTeX editing mode, where **Return** 
or **Enter** is used to exit the mode. 

This event is also fired if the mathfield loses focus, even if the user did not 
use the keyboard. This behavior matches the `<textarea>` element.

**To listen specifically for a press of the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key on the 
keyboard** listen for an `input` event with an `inputType` 
(or `ev.data` on iOS) property of `"insertLineBreak"`.


```js
mf.addEventListener('beforeinput', (ev) => {
  if (ev.inputType === 'insertLineBreak') {
    mf.executeCommand("moveToNextPlaceholder");
    ev.preventDefault();
  };
});
```


## Detecting a Click on a Mathfield

In most cases MathLive will respond to mouse and keyboard interactions with 
the mathfield. However, in some cases it might be useful to detect when a 
mathfield is clicked on. For example, you could display one or more read-only
mathfields in a list and prompt the user to pick one by clicking on it.

In general, to be notified of an event, use `mf.addEventListener()`. This 
includes some generic events, as well as some that are specific to mathfields.

Events that target a DOM element inside the mathfield (inside the shadow DOM)
will bubble and be retargeted to appear as if they had targeted the
mathfield (that is, the `evt.target` will be the mathfield itself).

This include the following standard events:

- `change`: the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed, or the field lost focus.
- `blur`, `focus`, `focusin`, `focusout`
- `click`
- `mousedown`, `mouseup`, `mousemove`, `mouseout, `mouseover`
- `beforeinput`, `input`. If the `inputType` property of the event is `"insertLineBreak"` the <kbd>RETURN</kbd> or <kbd>ENTER</kbd> key was pressed
- `keydown`, `keypress`, `keyup`
- `wheel`
- all the [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) such as `pointerdown`, `pointerup`, etc... and all the touch events

As well as these mathfield specific events:
- `mount`: the mathfield has been connected to the DOM
- `unmount`: the mathfield is no longer connected to the DOM
- `focus-out`: tab key interactions
- `move-out`: arrow key interactions
- `mode-change`: change to `math`, `text` or `latex` mode
- `read-aloud-status-change`
- `selection-change`
- `undo-state-change`

## Detecting Navigation out of a Mathfield

A user may navigate outside of a mathfield by pressing the arrow keys, or the tab, home and end keys.

By default, the mathfield reacts as a standard textarea field: moving to the next focusable element when the <kbd>TAB</kbd> (or <kbd>SHIFT+TAB</kbd>) key is pressed, and
doing nothing when reaching the start or end of the mathfield when navigation with the arrow keys.

In some cases, you may want to implement a different behavior. For example if a mathfield is embedded inside an editable paragraph, you may want the arrow keys to exit the mathfield when reaching the end/start. Or you may want the <kbd>TAB</kbd> key to simply move the caret to the end/start of the mathfield.

**To change the behavior of a mathfield when navigation out of a mathfield** listen
for the `focus-out` and `move-out` events.

The `detail` property of those events indicate the direction of navigation.
To cancel the default behavior, use `ev.preventDefault()`.


```js
mf.addEventListener('move-out', (ev) => {
ev.preventDefault();
  // Remove focus from mathfield
  mf.blur();
  // Focus some other element, use ev.detail.direction to detect if 
  // navigating backward, forward, upward or downward
  // ...
});

mf.addEventListener('focus-out', (ev) => {
  ev.preventDefault();
  // Move the cursor to the start/end of the mathfield on tab
  if (ev.detail.direction === 'forward')
    mf.executeCommand('moveToMathfieldEnd');
  else if (ev.detail.direction === 'backward')
    mf.executeCommand('moveToMathfieldStart');
});
```


## Interacting with the Clipboard

Users can export the content of the mathfield by using standard **Copy**/**Cut**
commands (<kbd>Control/⌘</kbd> <kbd>X</kbd> and <kbd>Control/⌘</kbd> <kbd>C</kbd>).

Multiple flavors are put on the clipboard:

<div className='symbols-table first-column-header'>

| | |
|:-- | :-- |
| `text/plain` | LaTeX wrapped with a `$$`.|
| `application/x-latex` | Raw LaTeX |
| `application/json`| A MathJSON representation of the formula. |

</div>

The recipient of the **Paste** operation can pick whichever is most appropriate.
If the recipient is a web app, the specific flavor can be accessed using
the `event.clipboardData.getData()` API. If the recipient is a native app,
the most popular browsers currently only make accessible the text flavor,
with a LaTeX representation of the formula.

The LaTeX in the `text/plain` flavor is "wrapped" to make it easier for the 
recipient of the paste to recognize that this content is in LaTeX format.

:::info[Note]

For improved interoperability, the exported LaTeX uses the `latex-expanded` 
format. In this format, any macros in the formula are expanded to their 
definition. For example, the `\differentialD` command is exported as its 
corresponding definition, `\mathrm{d}`.
:::


**To customize the content of the `text/plain` flavor**, use the `onExport()` hook. 

For example, to wrap the exported latex with `<math>...</math>` instead:

```js
mf.onExport = (mf, latex) => `<math>${latex}</math>`
```

**To export the "raw" (not expanded) LaTeX)**, use:

```js
mf.onExport = (mf, latex, range) => `$$${mf.getValue(range, 'latex')}$$`
```

The exported format doesn't have to be LaTeX. To export ASCIIMath instead:

```js
mf.onExport = (mf, latex, range) => 
    "`" + mf.getValue(range, 'ascii-math') + "`"
```


:::info[Note]

The standard delimiter for ASCIIMath is the <kbd>&#96;</kbd> (backtick) character

:::

## Applying Style to a Mathfield

The text color ("ink") and background color ("paper"), as well as other 
stylistic attributes, can be changed on a mathfield, or a portion of a mathfield
using `applyStyle()`.

:::info[Note]
This style applies to the content of the formula and will be reflected in the 
LaTeX output. To change the appearance of the mathfield but not
the content of the formula, see [Customizing](/mathfield/guides/customizing/).
:::

```live
:::js
const mf = document.getElementById('formula');

// Change the background color of the entire mathfield
mf.applyStyle(
  { backgroundColor: 'yellow' },
  { range: [0, -1] }
);

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To change the style of a portion of the mathfield**, specify a selection range
to `applyStyle()`.


```live
:::js
const mf = document.getElementById('formula');

// Change the color and size of the first two characters of the mathfield
mf.applyStyle({color: "red", fontSize: 7 }, { range: [0, 2] });

:::html
<math-field id="formula">
  x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```


**To remove a style**, set the value of the `fontFamily`, `color` or `backgroundColor` 
property to `"none"`, or the value of the `fontShape`, `fontSeries` or `fontSize`
property to `"auto"`.

:::info[Note]
You can ignore styles applied to a formula by using `mf.getValue('latex-unstyled')`
:::




<!-- Intercepting navigate out of and multiple fields -->


<!-- ## Performing editing commands -->


