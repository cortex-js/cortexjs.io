---
layout: single
title: MathLive Examples - Interacting
permalink: /mathlive-examples-interacting/
read_time: false
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/xml/xml.min.js
  modules:
    - ../assets/js/code-playground.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>


# Interacting with a mathfield

## Reading the content of a mathfield

Once you've created a mathfield you'll want to be notified when its content is modified. You can do this by providing a `onContentDidChange`
handler when you create the mathfield.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'), {
    onContentDidChange: (mf) => {
        console.log(mf.$text());
    }
});
</div>
    <div slot="html">&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;</div>
</code-playground>

In addition to Latex, you can also get the content in MathASCII or MathJSON formats.


<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">import MathLive from 'mathlive';
const mf = MathLive.makeMathField(document.getElementById('mathfield'), {
onContentDidChange: (mf) => {
    console.log(MathLive.latexToAST(mf.$text()));
}
});
console.log(MathLive.latexToAST(mf.$text()));
</div>
<div slot="html">&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;</div>
</code-playground>

## Changing the content of a mathfield

You can also change the value of the mathfield programatically by passing
Latex, MathASCII or MathJSON. In the example below, the Latex input
field is editable and is reflected in the Mathfield (and vice-versa).

Note that we use the `suppressChangeNotifications` option when
changing the content of the mathfield, to prevent the `onContentDidChange`
notification from being triggered.


<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
const mf = MathLive.makeMathField(document.getElementById('mathfield'), {
    onContentDidChange: (mf) => {
        // Set the value of the text field to the latex from the mathfield
        document.getElementById('latex').value = mf.$text();
    }
});
//
document.getElementById('latex').value = mf.$text();
//
// Listen for changes in the latex text field, and reflect its value in 
// the mathfield.
document.getElementById('latex').addEventListener('input', (ev) => {
    mf.$latex(ev.target.value, {suppressChangeNotifications: true});
});
</div>
<div slot="html">&lt;label&gt;Mathfield&lt;/label&gt;
&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;                
&lt;label&gt;Latex&lt;/label&gt;
<textarea class="output" id="latex" autocapitalize="off" autocomplete="off"
autocorrect="off" spellcheck="false"></textarea></textarea>
</div>
</code-playground>



</section>



<!-- Intercepting navigate out of and multiple fields -->

<!-- MathfieldListeners --> 

<!-- $insert() -->


## Applying styling
<!-- applyStyle -->

## Performing editing commands

<!-- $perform() --> 

## Next
* <a href="/mathlive-examples-customizing">Customizing a mathfield<span class='ml-sm'><i class="fas fa-chevron-right navigation"></i><span></span></a>
