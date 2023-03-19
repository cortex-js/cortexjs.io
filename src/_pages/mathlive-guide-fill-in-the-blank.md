---
layout: single
date: Last Modified
title: Fill-in-the-Blank
permalink: /mathlive/guides/fill-in-the-blank/
read_time: false
sidebar:
    - nav: "universal"
toc: true
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive/dist/mathlive.min.js
---


**To have one or more portions of a mathfield editable, while the rest is 
read-only**, use a `readonly` mathfield, and the `\placeholder[]{}` command.

```html
<math-field readonly>
  x=\frac
  {\placeholder[numerator]{}}
  {\placholder[denominator]{}}
</mathfield>
```

This feature is called "fill-in-the-blank".
It's often used to prompt a student to fill in portions of a formula. 

The first argument of the `\placeholder` command, i.e. the one provided
in `[]`, is a string identifier made of letters and digits. This argument
must be provided (i.e. it's not optional) for the placeholder to be 
interpreted as editable.

The main argument of the `\placeholder` command, i.e. the one in `{}` is the 
value of the prompt. You can leave it blank, but the brackets must be present.


<code-playground layout="stack">
  <div slot="javascript">
const mf = document.getElementById('mf');
mf.addEventListener('input', (ev) => console.log(mf.getPromptValue('blank1')));
  </div>
  <div slot="html">&lt;math-field id=mf readonly style="font-size:3em"&gt;f(x)= \frac{\placeholder[numerator][x]{}}{\placeholder[denominator]{y}}&lt;/math-field&gt;</div>
</code-playground>

## Accessing all the Prompts

**To get a list of all the prompts in a mathfield**, use 
`mf.getPrompts()`. It returns an array of identifiers, or
an empty array if there are no prompts.



## Accessing the Value of a Prompt

**To access the value of a prompt**, use `mf.getPromptValue()` and `mf.setPromptValue()`. The first argument of these functions is the id of the prompt. The optional second 
argument of `getPromptValue()` is the same as `mf.getValue()` and can be used to customize the output format.


## Accessing the State of a Prompt

A prompt can be locked or unlocked. When locked, it is not
editable.

A prompt can also be either in a correct or incorrect state.The prompt renders accordingly, which can be used to indicate
that a provided answer was correct or incorrect.

**To change the lock state of a prompt**, use `mf.setPromptState()` and `mf.getPromptState()` to read the 
current state of the prompt.


