---
title: Add MathLive to Your Project
permalink: /mathlive/guides/integration/
layout: single
date: Last Modified
sidebar:
    - nav: "mathlive"
---

# Add MathLive to Your Project

As discussed in [Getting Started](/mathlive/guides/getting-started/) the 
simplest way to use MathLive in your page is by loading it from a CDN.

In this section we'll discuss other options for adding a mathfield in a web page.


## Creating Mathfield Elements Programmatically

**To create a Mathfield DOM element**, use `new MathfieldElement()`.

```javascript
const mfe = new MathfieldElement();
mfe.value = '\\frac{\\pi}{2}';
document.body.appendChild(mfe);
```

<div class='read-more'><a href="/docs/mathlive/#(%22mathfield-element%22%3Amodule)">See the <strong><kbd>MathfieldElement</kbd></strong> documentation for more details about the attributes, properties, methods and events supported.<svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>


<div class='read-more'><a href="/mathlive/guides/lifecycle/">Learn more about the <strong>Lifecycle</strong> of the mathfield web component.<svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>


## Using MathLive with JavaScript Modules

In addition to `MathfieldElement`, the MathLive library provide some functions
such as `renderMathInDocument()`. To access those functions you will need
to import the MathLive module.

JavaScript modules offer several benefits (asynchronous, deterministics loading, 
no pollution of the global namespace, etc...). They are the recommended approach 
to use MathLive APIS in your project.

**To use MathLive as a JavaScript module**:

1. Include a `<script>` tag, with a `type="module"` attribute
2. In the body of this `<script>` tag, use an `import` directive pointing to a CDN URL for Mathlive
3. Invoke a MathLive API, such as `renderMathInDocument()`.

With this setup, MathLive will dynamically insert one or more stylesheets in 
the page, as needed, for example when the mathfield is created. MathLive will 
also dynamically download the required fonts from the CDN as well.

```html
<!DOCTYPE html>
<html>
<body>
    <p>$$\frac{\pi}{2}</p>
    <script defer type="module">
        import { renderMathInDocument } from 'https://unpkg.com/mathlive/dist/mathlive.min.mjs';
        renderMathInDocument();
    </script>
</body>
</html>
```

If this option works for you, you can move on to the MathLive SDK reference
to find out how to customize mathfields, receive change notifications, define
keyboard shortcuts, use custom macros and more.

The section below discuss aditional options to load MathLive for more complex
configurations.

## Using `<script>` tags

If you need to support browsers that don't support JavaScript modules, you
can use a `<script>` tag to load the MathLive library.

A few things to note:

1. Use the `.min.js` version, not the `.min.mjs` one. The later one only works 
with modules.
2. After loading the script, the global `MathLive` object will provide access 
to the MathLive API. Unlike with modules, you may run into situations where the
scripts are loaded out of order therefore the `MathLive` global may be 
`undefined` by the time your script is run.
3. Just like with modules, the necessary stylesheets and fonts will be loaded
when required.

```html
<!DOCTYPE html>
<html>
<body>
    <p>$$\frac{\pi}{2}</p>
    <script src="https://unpkg.com/mathlive/dist/mathlive.min.js"></script>
    <script>
        MathLive.renderMathInDocument();
    </script>
</body>
</html>
```



<h2 id='npm'>Using NPM</h2>

If you need:
- to use MathLive with TypeScript
- to bundle MathLive with other code
- to integrate MathLive with your asset pipeline
- to support older browsers
- more control over network caching of the MathLive library and its assets

then you should use a version of MathLive installed from NPM instead of from 
a CDN.

**To add a local version of MathLive to your project**, use the following command:

```bash
$ npm install --save mathlive
```

The version of MathLive installed in the `node_modules` directory essentially
corresponds to the content of the `/dist/` directory in the MathLive project
on GitHub.

After you've completed this step, you can use MathLive as any other modules
in your project: 

```javascript
import { MathfieldElement} from 'mathlive';
const mfe = new MathfieldElement();
```

Your bundler/transpiler (for example `Rollup`, `WebPack`, `Babel`, `TypeScript`)
will locate the MathLive library in the `node_modules` directory and apply 
the necessary transformations to it, as per the settings in your project.


<h2 id='fonts-folder'> Controlling the Location of the <kbd>fonts</kbd> Folder</h2>

In order to display formulas correctly MathLive needs access to specialized 
math fonts. Those fonts are provided as part of the MathLive SDK and they are
located in a folder called `fonts` which is located next to the MathLive 
library.

If the global setup of your project requires a different organization, 
for example locating all the static assets in a `/assets/` directory and all the
JavaScript code in a `/js/` directory, you can specify where those assets can
be found using the `fontsDirectory` configutation option.

```javascript
import { MathfieldElement} from 'mathlive';
const mfe = new MathfieldElement();
mfe.setOptions({
    fontsDirectory: '../assets/mathlive-fonts'
});
```

The path used by `fontsDirectory` is a path relative to the bundled runtime
location of the directory containting the MathLive library. So in the example
above, if the MathLive library is in a `/js/` directory and the MathLive fonts
are in a `/assets/mathlive-fonts/` directory, then the relative path from 
the JavaScript directory to the fonts directory is `../assets/mathlive-fonts`

The `fontsDirectory` option affects all the mathfield on the page. It is 
not necessary to apply it to all mathfields, although it's not harmful. Once 
the fonts have been loaded once, they will not get loaded again. {.notice--info}

<h2 id='asset-pipeline'>Integrating with an Asset Pipeline</h2>

In some cases, simply pointing MathLive to the directory where the fonts can 
be located might not be enough. For example, some bundlers, such as WebPack, 
can modify the names of the files containting assets, including a hash string
in order to provide more control of the caching of those assets.

In this case, you should include the stylesheet `mathlive-fonts.css` to your 
project. You can find this stylesheet in the `dist` folder on GitHub or in the 
`mathlive` folder in your `node_modules` directory.

This stylesheet will explicitly load the required font files. Because your 
bundler will be able to parse it, it will do the necessary changes to the font 
files such as renaming them with the appropriate hash string and adapting 
the path to reflect their actual location after processing by the asset 
pipeline.

The MathLive library will detect if you include the `mathlive-fonts.css` 
stylesheet in your page and will not attempt to dynamically load the fonts, 
relying instead on the regular process to do so. This may result in some 
redrawing of formulas, or incorrect drawing while the browser completes the 
font loading.

```html
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="mathlive-fonts.css" />
</head>
<html>
<body>
    <math-field>\tan(x) = \frac{\sin \tetha}{\cos \tetha}</math-field>
    <script src='./vendor/mathlive.min.js'></script>
</body>
</html>
```

<h2 id='static-render'>Displaying Formulas Without JavaScript</h2>

While MathLive is primarily an editor for formulas, it can also be used
to render "static" formulas in a web page, along the lines of what MathJax or 
KaTeX provide.

**To render a non-editable formula** use `MathLive.renderMathInDocument()` or
to generate markup for a formula use `MathLive.latexToMarkup()`. In the later
case, you may save the output or return it from a server-side process.

To correctly display this markup, you will need an appropriate stylesheet.

If you have some editable mathfield in that page, the stylesheet for the editable
mathfield will be sufficient to correctly render the static formulas.

However, if you need to render the markup for a static formula without the
MathLive library being loaded, use the `mathlive-static.css` stylesheet
which can be found in the `/dist/` directory on GitHub or in the 
`node_modules/mathlive` directory via NPM.

```html
<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/mathlive/dist/mathlive-static.css" />
</head>
<html>
<body>
    <div id="formula"></div>
    <script type="module">
        import {convertLatexToMarkup} from 'https://unpkg.com/mathlive/dist/mathlive.min.mjs';
        window.onload = function() {
            document.getElementById("formula").innerHTML = convertLatexToMarkup(
            `\\xrightarrow[\\Delta]{\\text{abcd}}`
            );
        };
    </script>
</body>
</html>
```
