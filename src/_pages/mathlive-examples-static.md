---
layout: single
title: MathLive Examples - Static
permalink: /mathlive-examples-static/
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

# Static Mathfield

## Static math formulas

## Read-only Mathfield

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
MathLive.makeMathField(document.getElementById('mathfield'));
</div>
    <div slot="html">&lt;div id="mathfield" style="
        font-size: 32px; 
        padding: 8px; 
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3); 
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)"
&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/div&gt;
</div>
</code-playground>


## See Also
* <a href="/mathlive-examples-interacting">Interacting with a mathfield<span class='ml-sm'><i class="fas fa-chevron-right navigation"></i><span></span></a>


<!-- Equation rendering -->
<!-- Readonly mathfield see https://github.com/arnog/mathlive/issues/609-->
