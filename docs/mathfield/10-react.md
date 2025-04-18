---
date: Last Modified
title: Using A Mathfield with React
slug: /mathfield/guides/react/
---

## Theory of Operations

A mathfield behaves as a regular DOM element:
- define mathfields using the `<math-field>` tag in JSX
- get a reference to the corresponding DOM element with the `useRef()` hook
- customize the mathfield on mount with `useEffect(..., [])` hook



# Using A Mathfield with React

**To use a mathfield with React**, import the MathLive library and use a `<math-field>` tag.

```jsx
import "https://esm.run/mathlive";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div>
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

## Using A Mathfield with React and TypeScript

**To use a mathfield with React and TypeScript**, you need to add TypeScript 
definitions for mathfield elements.

```jsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
    }
  }
}


import "https://esm.run/mathlive";
import { useState } from "react";

export default function App({children}) {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <math-field 
        onInput={
          (evt: React.ChangeEvent<HTMLElement>) => 
            setValue(evt.target.value)
        }
      >
        {children}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}
```

## Using LaTeX strings with JSX

**To specify the initial value of the mathfield** provide a LaTeX 
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

## Customization

**To customize a mathfield**, use a `useRef` callback.

With the  `current` property of the ref, you can access and manipulate all the 
properties and methods that are specific to the mathfield (`value`, `selection`, `insert()`,
etc...). See [MathfieldElement](/docs/mathfield/#(MathfieldElement%3Aclass)).

```jsx
import "./App.css";
import "https://esm.run/mathlive";
import { useState, useEffect, useRef } from "react";

export default function App({children}) {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <math-field 
        ref={(el) => {
          if (el === null) {
            // When el is null, the mathfield is being destroyed
            // You may want to unsubscribe from events here
            return;
          }
          // Customize the mathfield when it is created
          mf.current.mathVirtualKeyboardPolicy = "manual";
          mf.current.addEventListener("focusin", (evt) => 
            window.mathVirtualKeyboard.show()
          );
          mf.current.addEventListener("focusout", (evt) => 
            window.mathVirtualKeyboard.hide()
        }} 
        onInput={evt => setValue(evt.target.value)}
      >
        {children}
      </math-field>
      <p>Value: {value}</p>
    </div>
  );
}
```


<ReadMore path="https://github.com/arnog/react-mathlive" >
A ready-to-run example project is available on **GitHub**<Icon name="chevron-right-bold" />
</ReadMore>

