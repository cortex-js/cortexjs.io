---
layout: single
date: Last Modified
title: Using MathLive with React
permalink: /mathlive/guides/react/
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
    - //unpkg.com/mathlive/dist/mathlive.min.js
---

# Using MathLive with React

**To use a mathfield with React**, import the MathLive library and use a `<math-field>` tag.

```jsx
import "./App.css";
import "//unpkg.com/mathlive";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <math-field 
        onInput={evt => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}

export default App;
```

## Using MathLive with React and TypeScript

**To use a mathfield with React and TypeScript**, you need to add TypeScript definitions for MathLive.

```jsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}


import "./App.css";
import "//unpkg.com/mathlive";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="App">
      <math-field 
        onInput={
          (evt: React.ChangeEvent<HTMLElement>) => 
            setValue(evt.target.value)
        }
      >
        {value}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}

export default App;
```

### Using LaTeX strings with JSX

You can specify the initial value of the mathfield by providing a LaTeX 
string as a child of the `<math-field>` tag.

However, since both JSX and LaTeX use curly braces, you need to escape the
LaTeX braces. The easiest way to do this is to use a backtick string.
The content of the backtick string will be interpreted as a JavaScript string,
which means that the backslashes will need to be escaped as well.


```jsx
<math-field>{`
  \\frac{1}{2}
`}</math-field>
```

## Theory of Operations

A MathLive mathfield behaves as a regular DOM element:
- define mathfields using the `<math-field>` tag in JSX
- get a reference to the corresponding DOM element with the `useRef()` hook
- customize the mathfield on mount with `useEffect(..., [])` hook

## Customization

**To customize a mathfield**, use a `useEffect` hook. The last parameter
is set to empty brackets to indicate the hook should only be run once when 
the component is mounted. 

**To access the mathfield DOM element** use a `useRef()` hook. With the 
`current` property of the ref, you can access and manipulate all the 
properties and methods that are specific to the mathfield (`value`, `selection`, `insert()`,
etc...). See [MathfieldElement](https://cortexjs.io/docs/mathlive/#(MathfieldElement%3Aclass)).

```jsx
import "./App.css";
import "//unpkg.com/mathlive";
import { useState, useEffect, useRef } from "react";

function App() {
  // Get a ref to the mathfield element 
  // (see `ref={mf}` in the markup below)
  const mf = useRef();

  // Customize the mathfield when it is created
  useEffect(() => {
    mf.current.mathVirtualKeyboardPolicy = "manual";
    mf.current.addEventListener("focusin", (evt) => 
      window.mathVirtualKeyboard.show()
    );
    mf.current.addEventListener("focusout", (evt) => 
      window.mathVirtualKeyboard.hide()
    );
  }, []);


  const [value, setValue] = useState("");

  return (
    <div className="App">
      <math-field 
        ref={mf} 
        onInput={evt => setValue(evt.target.value)}
      >
        {value}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}

export default App;
```


{% readmore "https://github.com/arnog/react-mathlive" %} A ready-to-run 
example project is available on <strong>GitHub</strong>{% endreadmore %}

