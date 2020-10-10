---
layout: single
date: Last Modified
title: MathLive Examples
permalink: /mathlive/examples/introduction/
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

**1.** Add a `<math-field>`. The content of the this tag is the initial value 
of the mathfield, as a Latex expression.

**2.** Load  the MathLive library with a `<script>` tag.

<p class="notice--info">You can read more about options to integrate MathLive in your project in the 
    <a href="/guides/mathfield-getting-started/">Getting Started Guide</a>.
</p>


The quadratic equation is now displayed as a math formula. 

**3.** Edit the equation in the code playground below.

Note that you can modify the HTML or JavaScript code, then press the **Run** 
button to try your changes. Pressing the **Reset** button will bring back the 
playground to its original content. {.notice--info}

**4.** Change line 3 of the HTML to another Latex expression, for example `f(x) = \sin(x)`, 
then press the **Run** button


<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;script src="//unpkg.com/mathlive/dist/mathlive.min.js"&gt;&lt;/script&gt;
&lt;math-field&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>


## Next

<a href="/mathlive/examples/interacting">Interacting with a mathfield<span><i class="fas fa-chevron-right navigation"></i><span></span></a>
:    How to read, write the content of a mathfield
