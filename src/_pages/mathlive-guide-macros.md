---
layout: single
date: Last Modified
title: Macros - MathLive Guide
permalink: /mathlive/guides/macros/
read_time: false
sidebar:
    - nav: "universal"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.8/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.8/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.8/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.8/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
    };
</script>

# Macros

MathLive has over [800 LaTeX commands](/mathlive/reference/commands/) 
predefined. Some are primitives but others are macros, that is commands defined 
with a LaTeX expression. You can extend MathLive with your own macros.{.xl}


## Adding/Removing Macros

**To add a macro** use `setOptions({macros: {...getOptions('macros'), ...}})`.

If you do not include the `...getOptions('macros')` call, all the standard
macros will be turned off.

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
        minutes: '\\,{}^\\prime\\;',
        seconds: '\\,\\doubleprime\\;',
    }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;3\minutes 15\seconds}&lt;/math-field&gt;
</div>
</code-playground>

<hr>

The macro definition can contain up to eight arguments, represented by `#1` to `#9`.

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

<hr>

By default, a macro command behaves as a group whose subcomponents cannot be
modified. This behavior can be controlled using the `captureSelection` flag
in the expanded definition of a macro.

**To define a macro whose content is selectable and editable** set 
`captureSelection` to `true`.

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
        smallfrac: {
          args: 2,
          def: '{}^{#1}\\!\\!/\\!{}_{#2}',
          captureSelection: false,
        },
    }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;\scriptCapitalE=\smallfrac{5}{7}+\frac{5}{7}&lt;/math-field&gt;
</div>
</code-playground>

<hr>

**To remove a macro** set its definition to undefined:

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
        diamonds: undefined
    }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;\diamonds&lt;/math-field&gt;
</div>
</code-playground>


## Adding a Matching Shortcut

By defining a new macro, a new LaTeX command is added to the dictionary
of commands that can be used in a LaTeX expression. They can be inserted
in a mathfield by typing <kbd>ESC</kbd> or <kbd>/</kbd> to enter the LaTeX editing mode, followed by the name of the macro.

Custom macros are also included in the value of the mathfield 
expressed as a LaTeX string (`mf.value`).

However, it may also be convenient to associate the macro with an inline
shortcut. Inline shortcuts can be typed without having to enter the LaTeX
editing mode.

**To define an associated inline shortcut**, use the `inlineShortcuts` option.

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
        minutes: '\\,{}^\\prime\\;',
        seconds: '\\,\\doubleprime\\;',
    },
    inlineShortcuts: {
        ...mf.getOptions('inlineShortcuts'),
        minutes: '\\minutes',
        seconds: '\\seconds',
    }
});
</div>
    <div slot="html">&lt;math-field id="mf"&gt;3\minutes 15\seconds}&lt;/math-field&gt;
</div>
</code-playground>


{% readmore "/mathlive/guides/shortcuts/" %}
**Next:** Manage <strong>Key bindings and Inline Shortcuts</strong>
{% endreadmore %}



## Inspecting Available Macros

**To view the available macros**, inspect the `macros` option:

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
console.log(mf.getOptions('macros'));
</div>
    <div slot="html">&lt;math-field id='mf'&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;
</div>
</code-playground>


## Disabling Macros

**To turn off all macros**, use  `setOptions({macros: {}})`.




{% readmore "/mathlive/guides/shortcuts/" %}
**Next:** Manage <strong>Key bindings and Inline Shortcuts</strong>
{% endreadmore %}
