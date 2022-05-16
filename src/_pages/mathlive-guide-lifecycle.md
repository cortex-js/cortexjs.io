---
layout: single
date: Last Modified
title: Web Component Lifecycle - MathLive Guide
permalink: /mathlive/guides/lifecycle/
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
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>


# Web Component Lifecycle

A mathfield web component goes through various stages during its lifecycle.

In most cases, this is something you don't have to pay much attention to. Just 
remember these guidelines:
* Once a component is attached to the DOM, attributes (key/value pairs 
attached to the `<math-field>` tag and properties (key/value pairs attached
to a `MathfieldElement` object) are kept in sync, or _reflected_. You can also
call the methods of `MathfieldElement` without limitations. 
* To be notified when the component is attached to the DOM, listen for a `mount`
 event on the element.
* Before the component is attached to the DOM or even before the `MathfieldElement`
class has been registered, you can interact with the element, but with
some limitations. The `value`, `selection`, `options`, `disabled` properties
and the properties matching an attribute (`readOnly` for `read-only`, etc...)
and related attributes are safe to set, but the values you read back may be 
different once the component is mounted.

## Before Initialization

When the page is loaded, before any code is loaded or executed, elements with a
`<math-field>` tag will be laid out and rendered by the browser as if they were
a `<div>`. To prevent this from happening, you can use the `not(:defined)` CSS 
selector and set the `display` CSS property to `none`. This will prevent 
some potentially undesirable flash of content when the page is loaded.

```css
math-field:not(:defined) {
  display: none;
}
```

## Initialization

The element has been created from markup, but the code registering
the `<math-field>` tag with the `MathfieldElement` class has not been executed
yet. This could happen if the scripts are loaded in an unexpected order or
if there is a temporary networking issue.

At this stage:

* you can read and change the `disabled`, `value`, `options`, `selection` and 
`position` properties on the element.
```javascript
document.querySelector('math-field').value = '\\sin x';
```
However, some of those properties behave in limited way. For example, the `options`
property usually return the default value for the options. However, at this stage,
it will only return the values you have set.
* you can change/add/remove attributes on the element. At this stage, the 
attributes and the properties are independent, so if you set for example the
`virtual-keyboard-mode` attribute, it will not be reflected in 
`options.virtualKeyboardMode.
* the only methods on the element that can be invoked are those of `HTMLElement` 
since the element has not been upgraded yet. 

**To be notified when the registration takes place**, use the `whenDefined()` method.

```javascript
customElements.whenDefined('math-field').then(() => {
  console.log('<math-field> is defined');
});
```

If all goes well, the element will be constructed next.

## Constructed

This stage occurs either after the previous one (i.e. an element created
from markup) or when an element is created programmatically with `new MathfieldElement()`.

The `HTMLElement` object exist, but it is not yet attached to the DOM. You can 
interact with the object, but its operations are limited.

At this stage:
* you can read and change the properties as before. However, doing so will
be reflected on attributes as well. That is calling `mf.virtualKeyboardMode = "manual"` or
`mf.setOptions({ virtualKeyboardMode: "manual"})`
will result in `mf.getAttribute('virtual-keyboard-mode')` to return `"manual"`.
* you can read and change the attributes as before, however they will now 
be reflected on properties as well, that is calling `mf.setAttribute('virtual-keyboard-mode', 'manual')`
will result in `mf.virtualKeyboardMode` and `mf.getOption('virtualKeyboardMode')` 
to return `"manual"`.
* you can change/add/remove attributes on the element
* you can invoke all methods specific to `MathfieldElement`, however some may
have some limitations. For example `setValue()` will ignore any options provided
including formats other than LaTeX, `executeCommand()` will do nothing, etc... 
These commands required the element to be attached to the DOM to function properly.


## Attached/Mounted

This stage occurs next. The transition to this stage happens
automatically for elements created from markup after the `MathfieldElement`
class has been registered to handle the `<math-field>` tag. If the element
was created programatically, this stage is reached when the element is explicitly
attached to the DOM, for example using `appendChild()`.

At this stage:
* you can read and change properties and attributes and they will reflect 
each other (changing an attribute will update the corresponding property and 
vice versa).
* you can invoke all properties of `MathfieldElement` without limitations

**To be notified when this stage is reached**, listen for the `mount` event on 
the element:
```javascript
md.addEventListener('mount')((ev) => {
  console.log('mf is mounted');
  // You can now read default options value for example, or 
  //call `setValue()` with format options other than LaTeX.
  console.log(ev.target.getOption('macros'));
});
```

## Detached/Unmounted

This stage can be reached if the element is explicitly removed from the DOM,
for example with `ChildNode.remove()`.

This stage is not reached when the page is closed: in that case the element
is immediately disposed of.

Once this stage is reached, the same limitations as in the Constructed stage
apply.

Note that the next stage could be either for element to be disposed of 
or to be re-attached.

**To be notified when this stage is reached**, listen for the `unmount` event on 
the element:
```javascript
md.addEventListener('unmount')((ev) => {
  console.log('mf is about to be unmounted');
  // Last change to interact with the mathfield
  console.log(ev.target.getValue('ascii-math'));
});
```


{% readmore "/mathlive/guides/customizing/" %}
Next: <strong>Customizing a Mathfield</strong>: controlling its appearance and behavior
{% endreadmore %}
