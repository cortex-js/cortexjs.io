---
layout: single
date: Last Modified
title: Static - MathLive Guide
permalink: /mathlive/guides/static/
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
    - //unpkg.com/mathlive/dist/mathlive.min.mjs
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
    };
</script>

# Static Math Formulas

**To render math contained in a document as a static (non-editable) formula**, 
call [`renderMathInDocument()`](/docs/mathlive/?q=renderMathInDocument) at the end of your document, or in a `onload`
handler .

```html
<script type="module">
  import { renderMathInDocument } from 'mathlive';
  renderMathInDocument();
</script>
```

By default, any LaTeX code that is enclosed with the following delimiters will
be rendered as math:

- `$$`...`$$` -- rendered in Display Style (CSS display block)
- `\[`...`\]` -- rendered in Display Style (CSS display block)
- `\(`...`\)` -- rendered in Text Style (CSS display inline)

```html
<h1>Taxicab Number</h1>
<p>The second taxicab number is \\(1729 = 10^3 + 9^3 = 12^3 + 1^3\\)</p>
```

You can wrap more complex expressions in a `<script>` tag with a type of
`math/tex`. This is the recommended approach for stand-alone formulas. One of
the benefits of this approach is that the browser will not attempt to display
the content of the `<script>` tag before it is typeset, avoiding an unsightly
flash of LaTeX code on screen. If the type is `"math/tex; mode=text"` the inline
text style will be used, otherwise if the type is `"math/tex; mode=display"`,
the display style will be used. If no mode is provided, the display style is
used.

```html
<h1>Quadratic roots</h1>
<script type="math/tex">
  ax^2+bx+c =
  a
  \left( x - \frac{-b + \sqrt {b^2-4ac}}{2a} \right)
  \left( x - \frac{-b - \sqrt {b^2-4ac}}{2a} \right)
</script>
```

Elements with the following tags will be ignored for conversion: `noscript`,
`style`, `textarea`, `pre`, `code`, `annotation` and `annotation-xml`.

If you dynamically generate content, call [`renderMathInElement(element)`](/docs/mathlive/?q=renderMathInElement) to
render your element after the page has been loaded. This is a recursive call
that will be applied to `element` and all its children.

It is possible to call `renderMathInElement()` and
`renderMathInDocument` on elements and documents that have already been
rendered, in which case they will be rendered again. This is useful if something
in the environment changes that could require the layout to be updated.

The `renderMathInElement()` and `renderMathInDocument()`
functions take an optional `options` object which can be used to customize their
behavior:

- `skipTags`: an array of tag names whose content will not be scanned for
  delimiters
- `processScriptType`: `<script>` tags of the indicated type will be processed
  while others will be ignored. Default: "math/tex".
- `ignoreClass`: a string used as a regular expression of class names of
  elements whose content will not be scanned for delimiters (`'tex2jax_ignore'`
  by default)
- `processClass`: a string used as a regular expression of class names of
  elements whose content **will** be scanned for delimiters, even if their tag
  name or parent class name would have prevented them from doing so.
  (`'tex2jax_process'` by default)
- `TeX.processEnvironments`: if false, math expression that start with `\begin{`
  will not automatically be rendered. (true by default)
- `TeX.delimiters.inline` and `TeX.delimiters.display` arrays of delimiters that
  will trigger a render of the content in 'textstyle' or 'displaystyle' style,
  respectively.

```javascript
MathLive.renderMathInElement(document.getElementById('formulas'), {
  // Elements with a class of "instruction" or "source will be skipped
  ignoreClass: 'instruction|source',
  TeX: {
    delimiters: {
      // Allow math formulas surround by $...$ or \(...\)
      // to be rendered as textstyle content.
      inline: [
        ['$', '$'],
        ['\\(', '\\)'],
      ],
      display: [],
    },
  },
});
```
## Read-only Mathfield

When a math formula is displayed as a static element using 
`renderMathInDocument()`, the formula is transformed into some static markup.
As a result, only the markup content can be selected, not the underlying
LaTex formula. Selection of a portion of the formula may also lead to 
unexpected results.

If preserving the ability to select a formula is important, consider
using a read-only mathfield.

**To create a read-only mathfield**, add the `read-only` attribute to a `<mathfield>`
element.

<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="html">&lt;math-field read-only style="
        font-size: 32px; 
        padding: 8px; 
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3); 
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)"
&gt;x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>



<div class='read-more'><a href="/mathlive/guides/virtual-keyboards/">Next: Define custom <strong>Virtual Keyboards</strong><svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>




<!-- Equation rendering -->
<!-- Readonly mathfield see https://github.com/arnog/mathlive/issues/609-->
