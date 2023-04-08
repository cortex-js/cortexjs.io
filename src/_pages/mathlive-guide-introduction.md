---
layout: single
date: Last Modified
title: Getting Started - MathLive Guide
permalink: /mathlive/guides/getting-started/
read_time: false
sidebar:
    - nav: "universal"
toc: false
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---
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

**In the code playground below, change the content inside the `<math-field>` tag.**

For example change it to `f(x) = \frac{x}{2}`.

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
    <div slot="html">&lt;math-field&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}&lt;/math-field&gt;</div>
</code-playground>



<div class="notice--warning" markdown="1">

#### Caution: HTML quirks mode
The **HTML quirks mode** is not supported. 

The host page must use the **strict mode** by including a `<!DOCTYPE html>` 
directive at the top of the page. 

Without it, the layout of the expression inside the mathfield may be incorrect.

</div>

<div class="notice--warning" markdown="1">

#### Caution: `file://` protocol
For security reasons there are some restrictions when using the `file://` 
protocol. This happens if you open a file in the browser from your local file
storage. You will notice the adress in the browser address bar starts with `file://`.

In this situation, some functionality may not be available and some errors may 
be displayed in the console.

To prevent this, use a **local file server**. 

With VSCode, the **Live Server** extension can be used to launch a local 
development server with one click.

</div>


Here's a complete web page:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>untitled</title>
    <script defer src="//unpkg.com/mathlive"></script>
  </head>
  <body>
    <math-field>x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>
  </body>
</html>
```



{% readmore "/mathlive/guides/interacting/" %}
**Next:** <strong>Interacting with a Mathfield</strong>
{% endreadmore %}


{% readmore "/mathlive/guides/integration/" %}
Learn more about other options to <strong>add MathLive to your project</strong>
{% endreadmore %}

