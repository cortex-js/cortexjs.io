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

## Theory of Operations

A MathLive mathfield behaves as a regular DOM element:
- define mathfields using the `<math-field>` tag in JSX
- use the `useRef()` hook to get a reference to the corresponding DOM element
- use the `useEffect(..., [])` hook to customize the mathfield on mount

## Customization

**To customize a mathfield**, use a `useEffect` hook. Note that the empty brackets
indicate the hook should only be run once when the component is mounted. 
Use a `useRef` hook to access the mathfield DOM element.

```jsx
import "./App.css";
import "//unpkg.com/mathlive";
import { useState, useEffect, useRef } from "react";

function App() {
  const [value, setValue] = useState("");

  // Customize the mathfield when it is created
  const mf = useRef();
  useEffect(() => {
    mf.current.mathVirtualKeyboardPolicy = "manual";
    mf.current.addEventListener("focusin", (evt) => 
      mathVirtualKeyboard.show()
    );
    mf.current.addEventListener("focusout", (evt) => 
      mathVirtualKeyboard.hide()
    );
  }, []);

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

