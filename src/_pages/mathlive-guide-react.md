---
layout: single
date: Last Modified
title: Using MathLive with React
permalink: /mathlive/guides/react/
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

A mathfield is a web component. Once the MathLive library has been loaded
it can be used as a regular HTML tag: `<math-field>`

However, when using MathLive with React, you might want to consider using
some simple wrappers to better integrate with the React environment.

## JSX

In order for JSX to be aware of the attributes specific to a mathfield, use 
the following

```js
import { DOMAttributes } from "react";
import { MathfieldElementAttributes } from 'mathlive'

type CustomElement<T> = Partial<T & DOMAttributes<T>>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["math-field"]: CustomElement<MathfieldElementAttributes>;
    }
  }
}

```

## Wrapping a Mathfield

For your convenience, you may want to wrap a mathfield in a React 
component.

Here's an example of such a wrapper.

```js
import * as React from "react";

import { useEffect, useMemo } from "react";
import { MathfieldElement, MathfieldOptions } from "mathlive";

export type MathfieldProps = {
  options?: Partial<MathfieldOptions>;

  value: string;
  onChange: (latex: string) => void;

  className?: string;
};

export default const Mathfield = () => {
  const mathfieldRef = useRef<MathfieldElement>(null);

  useEffect(() => {
    // mathfieldRef.current.<option> = <value>;
  }, []);

  return (
    <math-field ref={mathfieldRef}/>
  );
};
    
```

You can then import the component dynamically. Keep in mind that this needs
to be done on the browser/client side.

```ts
const Mathfield = dynamic(() => import("components/Mathfield"), {
  ssr: false
})

const MyApp = () => {
  return (
    <Mathfield />
  )
}

```




{% readmore "https://legacy.reactjs.org/docs/web-components.html" %}
**Learn more about** <strong>React and Web Components</strong>
{% endreadmore %}


