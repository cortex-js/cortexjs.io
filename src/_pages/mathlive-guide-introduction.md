---
layout: single
date: Last Modified
title: Getting Started - MathLive Guide
permalink: /mathlive/guides/getting-started/
read_time: false
sidebar:
    - nav: "mathlive"
toc: false
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
</script>

# Getting Started

Let's add an editable mathfield to a web page.

**1. Load the MathLive library from a CDN with a `<script>` tag.**

```html
<script defer src="//unpkg.com/mathlive"></script>
```

**2. Add a `<math-field>` tag.** The content of the this tag is the initial value 
of the mathfield, as a LaTeX expression.

```html
<math-field>f(x) = \sin(x+\pi)</math-field>
```

<a href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</a> is a plain text markup language for structured documents. Most LaTeX commands start with a `\`, for example `\sqrt`, `\frac` and `\sin`. Read more about the <a href="/mathlive/reference/commands/">LaTeX commands available in a mathfield</a>{.notice--info}


## Try it Out

**In the code playground below, change line 3 of the HTML to another LaTeX expression.**<br>For example `f(x) = \frac{x}{2}`.

**Note:** The code playground here and in the rest of the documentation are live: when you modify the HTML or JavaScript code the output will update to reflect your changes.
<br>Press **Reset** to bring back the playground to its original state. {.notice--info}


<code-playground layout="stack" show-line-numbers mark-html-line="3">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="html">&lt;script src="//unpkg.com/mathlive"&gt;&lt;/script&gt;
&lt;math-field&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>



 <div class="notice--warning" markdown="1">

#### Caution
The HTML quirks mode is not supported. This means that the host page
must use the strict mode, indicated by a `<!DOCTYPE html>` directive at the top
of the page. Without it, the layout of the equations inside the mathfield may be incorrect.

</div>




{% readmore "/mathlive/guides/interacting/" %}
**Next:** <strong>Interacting with a Mathfield</strong>
{% endreadmore %}


{% readmore "/mathlive/guides/integration/" %}
Learn more about other options to <strong>add MathLive to your project</strong>
{% endreadmore %}

