---
title: Getting Started
slug: /mathfield/guides/getting-started/
---

# Getting Started

Let's add an editable mathfield to a web page.

**1. Load the Mathfield library from a CDN with a `<script>` tag.**

```html
<script defer src="https://cdn.jsdelivr.net/npm/mathlive"></script>
```


Alternatively, you can use the **unpkg** CDN to load the module:

```html
<script defer src="https://unpkg.com/mathlive"></script>
```



**2. Add a `<math-field>` tag.** The content of this tag is the initial value 
of the mathfield, as a LaTeX expression.

```html
<math-field>f(x) = \sin(x+\pi)</math-field>
```

:::info[Note]
<a href="https://en.wikipedia.org/wiki/LaTeX">LaTeX</a> is a plain text markup 
language for structured documents. Most LaTeX commands start with a `\`, for 
example `\sqrt`, `\frac` and `\sin`. 

Read more about the 
<a href="/mathfield/reference/commands/">LaTeX commands available in a mathfield</a>
:::


## Try it Out

**In the code playground below, change the content inside the `<math-field>` tag.**

For example change it to `f(x) = \frac{x}{2}`.

:::info[Note]

The code playground here and in the rest of the documentation are live: when you modify the HTML or JavaScript code the output will update to reflect your changes.

Press **Reset** to bring back the playground to its original state.

:::


```live show-line-numbers mark-html-line=2
:::html
<math-field>
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
```

## Vanilla HTML Example

Here's a complete web page using a `<math-field>` in vanilla HTML:

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <title>untitled</title>
  <script defer src="https://cdn.jsdelivr.net/npm/mathlive"></script>
</head>

<body>
  <math-field id="mf">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>
  <script>
    mf.addEventListener('input', evt =>
      console.log('Value:', evt.target.value)
    );
  </script>
</body>

</html>
```



## React Example

**To use mathfields in a React project**, use a `<math-field>` tag with JSX:

```js
import "https://esm.run/mathlive";
import { useState } from "react";

export View = () => {
  const [value, setValue] = useState("f(x) = \\frac{x}{2}");

  return (
    <math-field 
      onInput={evt => setValue(evt.target.value)}
    > {value} </math-field>
    <p>Value: {value}</p>
  );
}
```

<ReadMore path="/mathfield/guides/react/" >
Read more about using mathfields with **React**<Icon name="chevron-right-bold" />
</ReadMore>

<ReadMore path="/mathfield/guides/svelte/" >
Read more about using mathfields with **Svelte**<Icon name="chevron-right-bold" />
</ReadMore>


## Caution


:::warning[Caution: HTML quirks mode]

The **HTML quirks mode** is not supported. 

The host page must use the **strict mode** by including a `<!DOCTYPE html>` 
directive at the top of the page. 

Without it, the layout of the expression inside the mathfield may be incorrect.

:::

:::warning[Caution: `file://` protocol]
For security reasons there are some restrictions when using the `file://` 
protocol. This happens if you open a file in the browser from your local file
storage. You will notice the adress in the browser address bar starts with `file://`.

In this situation, some functionality may not be available and some errors may 
be displayed in the console.

To prevent this, use a **local file server**. 

With VSCode, the **Live Server** extension can be used to launch a local 
development server with one click.

:::


:::warning[Caution: CSP (Content Security Policy)]

In order to interactively display mathfields, some CSS styles are generated dynamically. If you are using a **Content Security Policy (CSP)**, you may need to adjust it to allow the use of inline styles.

Specifically, you may need to add `'unsafe-inline'` to the `style-src` directive in your CSP.

```html
<meta http-equiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline';">
```

:::

<ReadMore path="/mathfield/guides/integration/" >
Learn more about other options to <strong>add mathfields to your project</strong><Icon name="chevron-right-bold" />
</ReadMore>

