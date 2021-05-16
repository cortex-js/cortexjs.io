---
layout: single
date: Last Modified
title: MathLive Guide - Macros
permalink: /mathlive/guides/macros/
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
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
    };
</script>

# Macros

MathLive has over [800 Latex commands](https://mathlive.io/reference.html) predefined. Some are primitives but others
are macros, that is commands defined with a Latex expression.

To view the default macros, inspect the `macros` option:

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
const mf = document.getElementById('mf'), {
});
console.log(mf.getOption('macros'));
</div>
    <div slot="html">&lt;math-field id='mf'&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;
</div>
</code-playground>

To add (or remove) macros use `setOptions({macros: ...})`.

<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="javascript">import MathLive from 'mathlive';
const mf = document.getElementById('mf');
mf.setOptions({
    macros: {
        ...mf.getOptions('macros'),
        smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}',
    },
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;\scriptCapitalE=\smallfrac{5}{7}+\frac{5}{7}&lt;/math-field&gt;
</div>
</code-playground>

The macro definition can contain up to eight arguments, represented by `#1` to `#9`.



## Next

<a href="/mathlive/guides/shortcuts">Shortcuts<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    Manage inline shortcuts and keyboard shortcuts
