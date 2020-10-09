---
layout: single
title: MathLive Examples
permalink: /mathlive-examples-introduction/
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
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Mathfield Introduction
Let's add an editable mathfield to our web page.

**1.** Add a `<div>` tag and give it an `id` so we can reference it later. The 
content of the this div is the initial value of the mathfield, as a Latex expression. 

**2.** Add some Javascript, preferably with a `<script type="module">`.

<p class="notice--info">You can read more about options to integrate MathLive in your project in the 
    <a href="/guides/mathfield-getting-started/">Getting Started guide</a>
</p>

**3.** Import the MathLive module, then create a mathfield by transforming the
    div we just added using `makeMathField()`

The module `"mathlive"` in this example is synonym with `"//unpkg.com/mathlive/dist/mathlive.min.mjs"` {.notice--info}

The quadratic equation is now displayed as a math formula. Try to edit it in the
code playground below.

Note that you can modify the HTML or JavaScript code, then press the **Run** button to try your changes. Pressing the **Reset** button will bring back the playground to its original content. {.notice--info}

**4.** Change line 2 of the HTML to a Latex expression, for example `f(x) = \sin(x)`, 
then press the **Run** button


<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'));
</div>
    <div slot="html">&lt;div id="mathfield"&gt;
x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;</div>
</code-playground>


## See Also

<a href="/mathlive-examples-interacting">Interacting with a mathfield<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    How to read, write the content of a mathfield

<a href="/mathlive-examples-customizing">Customizing a mathfield<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:   How to change the appearance and behavior of a mathfield