---
title: Mathfield Example
permalink: /mathlive/demo/
layout: single
date: Last Modified
sidebar:
    - nav: "universal"
version: MathLive version
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
  window.addEventListener('DOMContentLoaded', (event) => 
      import('//unpkg.com/mathlive?module').then((mathlive) => document.getElementById('version').innerText = mathlive.version.mathlive
  ));
</script>

# MathLive Demo

In the demo below, a mathfield and a LaTeX textfield reflect their content. The
MathJSON representation of the expression is also dispalyed in the console.

The HTML and JavaScript playgrounds below are interactive.

Modify the code to experiment with the options available.

{% readmore "/compute-engine/demo/" %}
Try a demo of the **Compute Engine**.
{% endreadmore %}



<!-- htmlmin:ignore -->
<code-playground layout="stack">
    <style slot="style">
      .output {
        padding: 16px;
      }
      .output textarea {
        color: var(--ui-color);
        background: var(--ui-background);
      }
      .output:focus-within {
        outline: none;
      }
      .output math-field, #latex {
        border-radius: 4px;
        border: var(--ui-border);
        padding: 8px;
      }
      .output math-field { font-size: 24px; } 
      .output math-field:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      #latex {
        margin-top: 1em;
        font-family: var(--monospace-font-family), 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',   monospace;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.querySelector('#formula');
const latexField = document.querySelector('#latex');
//
latexField.addEventListener('input', () => mf.setValue(latexField.value));
//
function onMathfieldInput() {
    // Output MathJSON representation of the expression
    console.clear();
    console.log('MathJSON expression', mf.expression.json);  
    // Update raw LaTeX value
    latexField.value = mf.value;
}
//
mf.addEventListener('input', onMathfieldInput);
onMathfieldInput();</div>
    <div slot="html">
&lt;math-field id="formula" virtual-keyboard-mode="manual"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
&lt;textarea id="latex"&gt;&lt;/textarea&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->
