---
title: Mathfield Example
permalink: /mathlive/demo/
layout: single
date: Last Modified
sidebar:
    - nav: "mathlive"
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

# Demo

Experiment with the options available to setup and customize a 
mathfield with the Playground below. Edit the HTML and JavaScript section for the interactive result to update right away.

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
        font-family: 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',   monospace;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.querySelector('#formula');
const latexField = document.querySelector('#latex');
latexField.addEventListener('input', () => mf.setValue(latexField.value));
function updateLatex() {
  document.querySelector('#latex').value = mf.value;
}
mf.addEventListener('input', updateLatex);
updateLatex();</div>
    <div slot="html">
&lt;math-field id="formula" virtual-keyboard-mode="manual"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
&lt;textarea id="latex"&gt;&lt;/textarea&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->
