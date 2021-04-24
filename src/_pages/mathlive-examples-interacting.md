---
layout: single
date: Last Modified
title: MathLive Guide - Interacting
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
    - /assets/js/code-playground.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>


# Interacting with a mathfield

## Reading the content of a mathfield

The content of a mathfield is available with the `value` property, just like 
with a `<textarea>`.

To be notified as soon as the content of the mathfield is modified listen for 
an `'input'` event.

**Try**: modify the `'input'` event to a `'change'` event. Notice how this event
is only sent if you press the **Return** or **Enter** key, or when the mathfield
loses focus and the content has been modified{.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">document.getElementById('formula').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    console.log(ev.target.value);
});</div>
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field id="formula"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>

The `value` property is equivalent to calling the `getValue()` method with 
no argument. You can control how the result is formatted by passing options to [`getValue()`](/docs/mathlive/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(getValue%3Ainstance)).
For example to get the content as an ASCIIMath string, use `getValue('ascii-math)`.

**Try:** [Other formats](/docs/mathlive/#(%22mathfield%22%3Amodule).(OutputFormat%3Atype)) are available: change `'ascii-math'` to `'spoken-text'`.{.notice--info}

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">document.getElementById('formula').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    console.log(ev.target.getValue('ascii-math'));
});</div>
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field id="formula"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>


## Changing the content of a mathfield

You can change the value of the mathfield programatically. In the example 
below, the **Latex** input field is editable and is reflected in the mathfield 
(and vice-versa).

Note that we use the `suppressChangeNotifications` option when
changing the content of the mathfield, to prevent a `'input'` event from being 
triggered and creating an infinite loop.{.notice--info}


<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
const mf = document.getElementById('formula');
mf.addEventListener('input',(ev) => {
    document.getElementById('latex').value = mf.value;
});
//
document.getElementById('latex').value = mf.value;
//
// Listen for changes in the latex text field, and reflect its value in 
// the mathfield.
document.getElementById('latex').addEventListener('input', (ev) => {
    mf.setValue(ev.target.value, {suppressChangeNotifications: true});
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



</section>



<!-- Intercepting navigate out of and multiple fields -->

<!-- MathfieldListeners --> 

<!-- $insert() -->


<!-- ## Applying styling -->
<!-- applyStyle -->

<!-- ## Performing editing commands -->


## Next

<a href="/mathlive/guides/customizing">Customizing a mathfield<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    How to customize the behavior and appearance of a mathfield.

<a href="/mathlive/guides/lifecycle">Web Component Lifecycle<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    Understand in depth the lifecycle of a MathfieldElement: construction, 
interaction with the DOM and when can you communicate with it.
