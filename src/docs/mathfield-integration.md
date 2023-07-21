---
title: Add MathLive to Your Project
permalink: /mathlive/guides/integration/
layout: single
date: Last Modified
sidebar:
    - nav: "universal"
toc: true
---

As discussed in [Getting Started](/mathlive/guides/getting-started/) the 
simplest way to use MathLive is by loading it from a CDN.

In this section we'll discuss other options for adding a mathfield to a web page.


## Using MathLive with JavaScript Modules

In addition to `MathfieldElement`, the MathLive library provide some functions
such as `renderMathInDocument()`. 

**To access those functions**, import them from the MathLive module.

JavaScript modules offer several benefits (asynchronous, deterministics loading, 
no pollution of the global namespace, etc...). They are the recommended approach 
to use MathLive APIs in your project.

**To use MathLive as a JavaScript module**:

1. Include a `<script>` tag, with a `type="module"` attribute
2. In the body of this `<script>` tag, use an `import` directive pointing to a 
CDN URL for MathLive, such as `//unpkg.com/mathlive?module`. If your 
target browser supports it, you can also use the `import()` function for a 
dynamic import.

  **Note:** The `?module` suffix indicates to the CDN we need the ESM (module) 
  version of MathLive, not the UMD version.{.notice--info}

3. Invoke a MathLive API, such as `renderMathInDocument()`.

With this setup MathLive will dynamically insert one or more stylesheets in 
the page, as needed, for example when a mathfield is created. MathLive will 
dynamically download the required fonts from the CDN as well.

```html
<!DOCTYPE html>
<html>
<body>
  <p>$$\frac{\pi}{2}$$</p>
  <script type="module">
    window.addEventListener("DOMContentLoaded", () => 
      import("//unpkg.com/mathlive?module").then((mathlive) => 
        mathlive.renderMathInDocument()
      )
    );
  </script>
</body>
</html>
```

If this option works for you, you can move on to the MathLive SDK reference
to find out how to customize mathfields, receive change notifications, define
keyboard shortcuts, use custom macros and more.

The section below discuss additional options to load MathLive for more complex
configurations.

<h2 id='npm'>Using NPM</h2>

If you need...
- to use MathLive with TypeScript
- to bundle MathLive with other code
- to integrate MathLive with your asset pipeline
- to support older browsers
- more control over network caching of the MathLive library and its assets

...then you should use a version of MathLive installed from NPM instead of from 
a CDN.

**To add a local version of MathLive to your project**, use the following command:

```bash
$ npm install --save mathlive
```

After you've completed this step, you can use MathLive as any other modules
in your project: 

```javascript
import { MathfieldElement } from 'mathlive';
const mfe = new MathfieldElement();
```

Your bundler/transpiler (for example `esbuild`, `Rollup`, `WebPack`, `Babel`, 
`TypeScript`) will locate the MathLive library in the `node_modules` directory 
and apply the necessary transformations to it, as per the settings in your project.


**Note:** Make sure the contents of the `/fonts/` and `/sounds/` folder are copied to
your build output directory.{.notice--info}




## Using `<script>` Tags

If you need to support browsers that don't support JavaScript modules, you
can use a `<script>` tag to load a UMD version of the MathLive library.

A few things to note:

1. After loading the script, the global `MathLive` object will provide access 
to the MathLive API. Unlike with modules, you may run into situations where the
scripts are loaded out of order therefore the `MathLive` global may be 
`undefined` by the time your script is run.
2. Just like with modules, the necessary stylesheets and fonts will be loaded
when required.


```html
<!DOCTYPE html>
<html>
<body>
    <p>$$\frac{\pi}{2}$$</p>
    <script src="https://unpkg.com/mathlive"></script>
    <script>
      window.addEventListener('DOMContentLoaded', 
        () => MathLive.renderMathInDocument()
      );
    </script>
</body>
</html>
```


<h2 id='files'>MathLive Library Files</h2>

If you need to incorporate the MathLive library files directly into your project
(for example if you are building a standalone application), you can obtain 
those files either from npm (see above) or from a CDN, for example [https://unpkg.com/mathlive/](https://unpkg.com/mathlive/)

The `/dist` folder inside MathLive contains the various flavors of libraries 
and assets required to use MathLive

The `.mjs` suffix indicates ESM/module versions. The `.min` tag
indicates a "minified" version. The ones without `.min` are more legible
and may be useful for debugging.


| File | Usage | 
|:------|:------|
| `dist/fonts` | The fonts required to render MathLive content | 
| `dist/sounds` | The optional sound files used when typing on the virtual keyboard | 
| `dist/mathlive.min.mjs` | MathLive library, as a JavScript module, minified | 
| `dist/mathlive.mjs` | MathLive library, as a JavScript module, not minified, useful for debugging | 
| `dist/mathlive.min.js` | MathLive library, as a UMD package if your environment doesn't support modules, minified | 
| `dist/mathlive.js` | MathLive library, as a UMD package if your environment doesn't support modules, not minified, useful for debugging | 
| `dist/mathlive-ssr.min.mjs` | A subset of the MathLive library which can be used on the server side or in environments that do not have a DOM. Does not include the MathfieldElement, but does include functions such as `convertLatexToMarkup()` | 
| `dist/mathlive-static.css` | A stylesheet which can be used when the MathLive library is not loaded to display markup that has been rendered by the MathLive library previously. Rarely needed. | 
| `dist/types` | The TypeScript declaration files. Not needed at runtime. | 




<h2 id='fonts-folder'> Controlling the Location of the <kbd>fonts</kbd> Folder</h2>

In order to display mathfields correctly a set of specialized math fonts must 
be available. These fonts are provided as part of the MathLive SDK and they are
located in a directory called `fonts` located next to the MathLive library.

If the global setup of your project requires a different organization, 
for example locating all the static assets in an `/assets/` directory and all the
JavaScript code in a `/js/` directory, you can specify where those assets can
be found using the `fontsDirectory` static property.

```js
  MathfieldElement.fontsDirectory = "../assets/mathlive-fonts";
```

The `MathfieldElement` variable is a global variable available after the 
MathLive library has been loaded. It is attached to `globalThis`, that is the 
`window` object, and does not need to be imported explicitly {.notice--info}


The path used by `fontsDirectory` is a path relative to the bundled runtime
location of the directory containting the MathLive library. 

In the example above, if the MathLive library is in a `/js/` directory and the 
MathLive fonts are in a `/assets/mathlive-fonts/` directory, then the relative 
path from the JavaScript directory to the fonts directory is `../assets/mathlive-fonts`.

The `MathfieldElement.soundsDirectory` property can similarly be set to point 
to the sound file assets.

<h2 id='asset-pipeline'>Integrating with a Bundler or an Asset Pipeline</h2>

In some cases, simply pointing MathLive to the directory where the fonts can 
be located might not be enough. For example, some bundlers, such as WebPack, 
can modify the names of the files containting assets, including a hash string
in order to provide more control of the caching of those assets.

In this case, you should include the stylesheet `mathlive-fonts.css` to your 
project. You can find this stylesheet in the `dist` folder on GitHub or in the 
`mathlive` folder in your `node_modules` directory.

If you import this stylesheet, use `import mathliveStyle from "mathlive/fonts.css"`

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
    <math-field>\tan(x) = \frac{\sin \theta}{\cos \theta}</math-field>
    <script src='./vendor/mathlive.min.js'></script>
</body>
</html>
```

## Creating Mathfield Elements Programmatically

**To add an editable mathfield to a document** use a `<math-field>` tag:

```html
<math-field>e^{i\pi}</math-field>
```
If you need to add a mathfield to your DOM dynamically, you can create 
new mathfield DOM elements and add them to the DOM.

**To create a mathfield element programatically**, use `new MathfieldElement()`.

```javascript
const mfe = new MathfieldElement();
mfe.value = '\\frac{\\pi}{2}';
document.body.appendChild(mfe);
```

In Javascript, the `\` in a string must be escaped and the escape character 
is also `\`. So, in Javascript strings LaTeX commands start with a `\\`.{.notice--info}


{% readmore "/docs/mathlive/#(%22mathfield-element%22%3Amodule)" %}
Learn more about the attributes, properties, methods and events supported in the <strong><kbd>MathfieldElement</kbd></strong> documentation.
{% endreadmore %}


{% readmore "/mathlive/guides/lifecycle/" %}
Learn more about the <strong>Lifecycle</strong> of the mathfield web component.
{% endreadmore %}



<h2 id='static-render'>Displaying Non-Editable Formulas</h2>

While MathLive is primarily a math editor, the same  engine that renders
an interactive math formula can also render "static" formulas in a web page, 
along the lines of what the MathJax or KaTeX libraries provide.

**To render a non-editable formula**, use `renderMathInDocument()` 

The `renderMathInDocument()` will parse the DOM and converts LaTeX or MathASCII
strings it finds into corresponding HTML markup. The options argument of 
`renderMathInDocument()` can control the delimiters it considers, as well
as which DOM elements to consider or skip. The necessary stylesheet and
fonts will be injected in the current page.

**To generate markup for a formula**, use `convertLatexToMarkup()`. You may 
save the output or return it from a server-side process.

To correctly display this markup, import the stylesheet with
`import "mathlive/static.css"`. The stylesheet can be found in `dist/mathlive-static.css`.

When using this method, the MathLive library is not necessary to render the 
formula once the markup has been generated.

```html
<!DOCTYPE html>
<head>
    <link 
      rel="stylesheet" 
      href="https://unpkg.com/mathlive/dist/mathlive-static.css" 
    />
</head>
<html>
<body>
  <div id="formula"></div>
  <script type="module">
    window.addEventListener('DOMContentLoaded', () => 
      import('https://unpkg.com/mathlive?module').then((mathlive) => {
        document.getElementById("formula").innerHTML = 
          mathlive.convertLatexToMarkup(`\\xrightarrow[\\Delta]{\\text{abcd}}`)
      })
    );
  </script>
</body>
</html>
```

{% readmore "/mathlive/guides/static/" %}
Learn more about rendering <strong>static</strong> math content.
{% endreadmore %}


## Optimizing Load Performance

Loading a page with web components involve a complex set of steps.  If there
are many mathfields in a page, this may result in visible layout shifts as
the components and their dependencies, the fonts required in particular, get 
fully loaded. 

In most cases, the impact on loading performance is minimal and it is not
worth taking steps to reduce it. However, follow the steps below for the 
smoothest loading experience.

First, provide a hint to the browser that a set of fonts will be needed.
This helps prioritize the order in which they are loaded so that they are ready
and available by the time the mathfield component is rendered. 

**To preload the fonts**, include a series of `<link>` tags in the page 
`<header>` section. The `href` attributes should be modified to point to where 
the fonts are located. You can also use the fonts from a CDN.

Second, include the `"mathlive-fonts.css"` stylesheet. This will instruct the 
browser to make the fonts available for use in the page. Use another `<link>`
tag in the `<head>` section to do so.

Finally, set the visibility of the `<body>` of the page to `"hidden"` until
the mathfield custom elements have been connected to the page.

The code snippets below demonstrate how to do this.


```html
<!-- Before </body> -->
<script type="module">
  customElements.whenDefined('math-field').then(() => 
    document.body.classList.add('ready'))
</script>
```

```html
<!-- In the <head> section -->
<style>
  body {
    visibility: hidden;
  }
  body.ready {
    visibility: visible;
  }
</style>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_AMS-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Caligraphic-Bold.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Caligraphic-Regular.woff2" />
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Fraktur-Bold.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Fraktur-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Main-BoldItalic.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Main-Bold.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Main-Italic.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Main-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Math-BoldItalic.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Math-Italic.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_SansSerif-Bold.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_SansSerif-Italic.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_SansSerif-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Script-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Size1-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Size2-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Size3-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Size4-Regular.woff2"/>
<link rel="preload" as="font" crossorigin
  href="../fonts/KaTeX_Typewriter-Regular.woff2"/>
<link rel="stylesheet" href="../mathlive-fonts.css" />
```
