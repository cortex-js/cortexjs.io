---
title: Security
slug: /compute-engine/guides/security/
---

## Content Security Policy

In order to interactively display mathfields, some CSS attributes are generated
dynamically. 

A **Content Security Policy (CSP)** is a security standard that helps prevent
Cross-Site Scripting (XSS) attacks. It works by defining a whitelist of trusted
sources of content, and instructing the browser to only execute or render resources
from those sources.

The server sends a CSP header to the browser, which then enforces the policy.

If you are using a Content Security Policy, you may need to adjust 
it to allow the use of inline styles.

Specifically, you may need to add `'unsafe-inline'` to the `style-src` 
directive in the CSP header sent from your server.

Without it, the mathfield may not be displayed correctly.


```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="style-src 'self' 'unsafe-inline';"
>
```


## Trusted Types

**Untrusted input** is input that is not under your control. For example, user input
or data from a third-party API. In some cases, attempting to render untrusted
input can lead to a Cross-Site Scripting (XSS) attack. These attacks occur when
an attacker injects malicious code into a web page, which is then executed by the
browser. This code can steal sensitive information, such as cookies or session
tokens, or perform actions on behalf of the user.

If you are handling untrusted input, you should consider using
the `MathfieldElement.createHTML()` static method to sanitize content. The
`createHTML()` method follows the recommendations from the
[Trusted Type](https://www.w3.org/TR/trusted-types/) specification.

For example, using the DOMPurify library (there are other HTML sanitizers
available), will prevent potentially harmful content from being rendered.

```live
:::html
<script 
  type="text/javascript" 
  src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.3/purify.min.js">
</script>

<math-field id="mf"></math-field>

:::js
function whenAvailable(name, fn) {
  setTimeout(() => {
    if (window[name]) fn();
    else whenAvailable(name, fn);        
  }, 16);
}

whenAvailable("DOMPurify", () => {
  MathfieldElement.createHTML = (html) => DOMPurify.sanitize(html);
  document.getElementById('mf').value = '\\htmlData{><img/onerror=alert(1)"src=}{}'
});
```

(Note that this example is moot, as the `htmlData` command already sanitizes its input.)


## Restricting Commands That Modify the DOM


Some commands modify the DOM and pose a higher risk of XSS attacks. For instance, `\htmlData{}{}` and `\href{}{}` allow the insertion of HTML attributes. While both commands sanitize their input to prevent harmful attributes, you may want to disable them for added security.


### Disabling Commands

**To disable specific commands**, redefine them as no-ops. 

For example, to disable \htmlData and \href:

```live
:::html
<math-field id="mf">\htmlData{foo=bar}{x+1}</math-field>

:::js

const mf = document.getElementById('mf');
mf.macros = {
  ...mf.macros,
  htmlData: { args: 2, def: "#2" },
  href: { args: 2, def: "#2" },
};

```

