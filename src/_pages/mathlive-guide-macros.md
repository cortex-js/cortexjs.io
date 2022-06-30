---
layout: single
date: Last Modified
title: Macros - MathLive Guide
permalink: /mathlive/guides/macros/
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
  modules:
    - /assets/js/code-playground.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
    };
</script>

# Macros

MathLive has over [800 LaTeX commands](/mathlive/reference/commands/) predefined. Some are primitives but others
are macros, that is commands defined with a LaTeX expression.

**To view the default macros**, inspect the `macros` option:

<code-playground layout="stack" >
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.getElementById('mf');
console.log(mf.getOption('macros'));
</div>
    <div slot="html">&lt;math-field id='mf'&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;
</div>
</code-playground>

**To add or remove macros** use `setOptions({macros: ...})`.

<code-playground layout="stack">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="javascript">import 'mathlive';
const mf = document.getElementById('mf');
mf.setOptions({
    macros: {
        ...mf.getOptions('macros'),
        smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}',
    }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;\scriptCapitalE=\smallfrac{5}{7}+\frac{5}{7}&lt;/math-field&gt;
</div>
</code-playground>


**To turn off all macros**, use  `setOptions({macros: {}})`.


The macro definition can contain up to eight arguments, represented by `#1` to `#9`.


{% readmore "/mathlive/guides/shortcuts/" %}
**Next:** Manage <strong>Key bindings and Inline Shortcuts</strong>
{% endreadmore %}
