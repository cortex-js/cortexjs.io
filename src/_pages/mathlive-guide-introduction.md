---
layout: single
date: Last Modified
title: MathLive Guide
permalink: /mathlive/guides/introduction/
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
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Mathfield Introduction
Let's add an editable mathfield to a web page.

**1. Load  the MathLive library with a `<script>` tag.**

<p class="notice--info">Read more about options to integrate MathLive in your 
  project in the 
  <a href="/guides/mathfield-getting-started/">Getting Started Guide</a>.
</p>


**2. Add a `<math-field>` tag.** The content of the this tag is the initial value 
of the mathfield, as a Latex expression.

**3. Edit the equation in the code playground below.**

The code playgrounds are live: when you modify the HTML or JavaScript code the
 output will update to reflect your changes. Press **Reset** to bring back
the playground to its original state. {.notice--info}

**4. Change line 3 of the HTML to another Latex expression.** 
For example `f(x) = \sin(x)`, 



<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>


## Next

<a href="/mathlive/guides/interacting">Interacting with a mathfield<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    How to read, write the content of a mathfield
