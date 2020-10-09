---
layout: single
title: MathLive Examples - Customizing
permalink: /mathlive-examples-customizing/
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

# Customizing a mathfield

The appearance and behavior of the mathfield is highly customizable. Here are a few common examples.

## Styling

The mathfield can be styled by applying some CSS styles to the template `<div>`,
for example to change the base font size or add a border.

 Change line 2-6 of the HTML in the playground below with `color: white;background: #256291;` and press the **Run** button.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'));
</div>
    <div slot="html">&lt;div id="mathfield" style="
        font-size: 32px; 
        margin: 3em;
        padding: 8px; 
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3); 
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)"
&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>

The content of the mathfield is displayed using a family of high-quality 
fonts based on the original Computer Modern font from TeX. The mathfield
will not display correctly using another font. By default, the directory containing
the fonts is located next to the file containing the mathlive library.
If your bundler or asset management system require a different configuration
you can specify where the fonts can be located using the [`fontsDirectory`](http://cortexjs.io/docs/mathlive/?q=fontsDirectory) config option.

Note that changing the fonts directory for one mathfield will change the fonts 
used by all the mathfields in the page. {.notice--warning}


<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'), {
    fontsDirectory: '//unpkg.com/mathlive/dist/fonts/'
});
</div>
<div slot="html">&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;</div>
</code-playground>


## CSS variables

Some CSS variables can be used to modify the appearance of the mathfield:

* `--hue`: (0...360) default is 212 (light blue). The default colors below are derived
from this variable
* `--highlight`: color of the selected fragment of the expression, when the 
mathfield is active
* `--highlight-inactive`: selection color when the mathfield is not focused
* `--caret`: color of the caret (insertion point)
* `--primary`: accent color for some UI elements, such as the virtual keyboard toggle

Make sure the rule has sufficient CSS specificity to be applied. Add a `!important`
directive or prefix it with the id of your mathfield. {.notice--warning}


<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'));
</div>
<div slot="html">&lt;style&gt;
    .ML__fieldcontainer {
        --hue: 53 !important;
        --caret: red !important;
    }
&lt;/style&gt;
&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/div&gt;</div>
</code-playground>


## Localization

The user interface of the mathfield is provided in english, arabic, german, 
greek, spanish, farsi, french, italian, japanese, polish and russian.

The language to use is detected automatically, but it can be overriden by
using the `locale` configuration property.

<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">import MathLive from 'mathlive';
const mf = MathLive.makeMathField(document.getElementById('mathfield'), {
    virtualKeyboardMode: 'manual',
    locale: 'fr'
});
console.log(mf.getConfig().strings);
</div>
<div slot="html">
&lt;div id="mathfield"&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/div&gt;</div>
</code-playground>


## Editing options

Some configuration options can be specified when creating a mathfield as 
the second argument of [`makeMathField()`](http://cortexjs.io/docs/mathlive/?q=%22makeMathField%22)
as we've see above with the `fontsDirectory` option.

The configuration options can also be changed programmatically using the [`setConfig()`](http://cortexjs.io/docs/mathlive/?q=%22setConfig%22) method.

Several of these configuration options affect the behavior while editing a 
formula:
* `ignoreSpaceabrInMathMode`: if false, insert a space when the spacebar is 
pressed, even in math mode (spaces are usually ignored in math mode)
* `removeExtraneousParentheses`: automatically remove extra parentheses around
a numerator or denominator
* `scriptDepth`: maximum levels of subscript or superscript. Set it to 0 to 
prevent the input of superscript and subscripts
* `smartFence`: automatically convert parentheses to `\left...\right` markup.
* `smartMode`: switch to text mode when text input is detected, for example 
when typing "if x > 0"
* `smartSuperscript`: automatically move out of a superscript when a digit is typed

In the code playground below, try some of these options. For example, change
line 3 to `scriptDepth: 0`, then press the **Run** button and try to type "x^2" in the 
mathfield.

<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'), {
    smartMode: true
});
</div>
<div slot="html">&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;</div>
</code-playground>

See [EditingOptions](http://cortexjs.io/docs/mathlive/?q=EditingOptions) for more
details about these and other available options.



## Next
* <a href="/mathlive-examples-interacting">Interacting with a mathfield<span class='ml-sm'><i class="fas fa-chevron-right navigation"></i><span></span></a>
