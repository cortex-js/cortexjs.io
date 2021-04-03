---
layout: single
date: Last Modified
title: MathLive Guide - Customizing
permalink: /mathlive/guides/customizing/
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
    - //unpkg.com/mathlive/dist/mathlive.mjs
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

The mathfield can be styled using the `style` attribute on the `<math-field>` tag,
for example to change the base font size or add a border.

 Change line 2-6 of the HTML in the playground below with `color: #dde; background: #256291;`.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;math-field style="
    font-size: 32px; 
    margin: 3em;
    padding: 8px; 
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, .3); 
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->

The content of the mathfield is displayed using a family of high-quality 
fonts based on the original Computer Modern font from TeX. The mathfield
will not display correctly using another font. By default, the directory containing
the fonts is located next to the file containing the mathlive library.
If your bundler or asset management system require a different configuration
you can specify where the fonts can be located using the [`fontsDirectory`](http://cortexjs.io/docs/mathlive/?q=fontsDirectory) option or the `fonts-directory` attribute.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="html">&lt;math-field fonts-directory="//unpkg.com/mathlive/dist/fonts/"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->

Note that changing the fonts directory for one mathfield will change the fonts 
used by all the mathfields in the page. {.notice--warning}

Learn more about configuring the MathLive library to your environment, 
including using custom asset pipelines and bundlers in the [Getting Started Guide](/guides/mathfield-getting-started/). {.notice--info}


## CSS variables

Some CSS variables can be used to modify the appearance of the mathfield:

* `--hue`: (0...360) default is 212 (light blue). The default colors below are derived
from this variable
* `--highlight`: color of the selected fragment of the expression, when the 
mathfield is active
* `--highlight-inactive`: selection color when the mathfield is not focused
* `--caret`: color of the caret (insertion point)
* `--primary`: accent color for some UI elements, such as the virtual keyboard toggle



<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;math-field style="
    --hue: 53 !important;
    --caret: red !important;
"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->

## Editing options

Some configuration options can be specified when creating a mathfield as 
the second argument of [`makeMathField()`](http://cortexjs.io/docs/mathlive/?q=%22makeMathField%22)
as we've see above with the `fontsDirectory` option.

The configuration options can also be changed programmatically using the [`setOptions()`](http://cortexjs.io/docs/mathlive/?q=%22setOptions%22) method.

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
line 3 to `scriptDepth: 0`, then try to type "x^2" in the mathfield.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="html">&lt;math-field smart-mode &gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->

See [EditingOptions](http://cortexjs.io/docs/mathlive/?q=EditingOptions) for more
details about these and other available options.



## Localization

The user interface of the mathfield is provided in english, arabic, german, 
greek, spanish, farsi, french, italian, japanese, polish and russian.

The language to use is detected automatically, but it can be overridden by
using the `locale` option or the `locale` attribute.

Note: we `await` for the `<math-field>` definition to be loaded before
invoking the `getOptions()` method, otherwise it would not be found. {.notice--info}

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
<div slot="javascript">
await window.customElements.whenDefined('math-field');
const mf = document.getElementById('formula');
const locale = mf.getOptions('locale');
console.log("Locale:", locale);
console.log(mf.getOptions().strings[locale]);
</div>
<div slot="html">&lt;math-field id='formula' virtual-keyboard-mode="manual" locale="fr"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->



## Next

<a href="/mathlive/guides//macros">Macros<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    How to define new Latex commands
