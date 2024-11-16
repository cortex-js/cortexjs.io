---
date: Last Modified
title: Macros
slug: /mathfield/guides/macros/
---

# Macros

<Intro>
Over [800 LaTeX commands](/mathfield/reference/commands/) 
are predefined. Some are primitives but others are macros, that is commands defined 
with a LaTeX expression. You can define your own macros.
</Intro>

## Adding/Removing Macros

**To add a macro** use `mf.macros = {...mf.macros, ...}`.

If you do not include the `...mf.macros` expression, all the standard macros will be
turned off.

The example below will define a new command, `\average`, which will be
replaced by `\operatorname{average}`, that is displayed as a single unit
using an upright font.

Try changing `\operatorname` to `\mathbf` to see the difference.

```live show-line-numbers mark-line=3
:::html
<math-field id="mf">\average([2, 4, 8])</math-field>

:::js
const mf = document.getElementById("mf");
mf.macros = { ...mf.macros,
  average: '\\operatorname{average}',
};
```

<hr/>

You can use standard LaTeX commands in the definition of a macro. For example,
the following macro definition uses the `\,` and `\;` commands to insert
horizontal spacing and `{}^` to place the `\prime` command on the subscript
line.

```javascript
mf.macros = { ...mf.macros,
  minutes: "\\,{}^\\prime\\;",
  seconds: "\\,\\doubleprime\\;",
};
```

<hr/>

The macro definition can contain up to eight arguments, represented by `#1` to `#9`.

```live show-line-numbers
:::js
const mf = document.getElementById("mf");
mf.macros = {...mf.macros, 
  smallfrac: "{}^{#1}\\!\\!/\\!{}_{#2}",
};


:::html
<math-field id="mf">\smallfrac{5}{7}+\frac{5}{7}</math-field>
```

<hr/>

By default, a macro command behaves as a group whose subcomponents cannot be
modified. This behavior can be controlled using the `captureSelection` flag
in the expanded definition of a macro.

**To define a macro whose content is selectable and editable** set 
`captureSelection` to `false`.

```live show-line-numbers mark-line=6
:::js
const mf = document.getElementById("mf");
mf.macros = {...mf.macros,
  smallfrac: {
    args: 2,
    def: '{}^{#1}\\!\\!/\\!{}_{#2}',
    captureSelection: false,
  },
};


:::html
<math-field id="mf">\scriptCapitalE=\smallfrac{5}{7}+\frac{5}{7}</math-field>
```

<hr/>

**To remove a macro** set its definition to undefined:

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
mf.macros = {...mf.macros, diamonds: undefined };

:::html
<math-field id="mf">\diamonds</math-field>
```


## Adding a Matching Shortcut

By defining a new macro, a new LaTeX command is added to the dictionary
of commands that can be used in a LaTeX expression. 

To input a macro, type <kbd>\\</kbd> followed by the macro name, then <kbd>RETURN</kbd>

Custom macros are also included in the value of the mathfield 
expressed as a LaTeX string (`mf.value`).

It may also be convenient to associate the macro with an inline
shortcut. Inline shortcuts can be typed without having to enter the LaTeX
editing mode (without having to type the <kbd>\\</kbd> key).

**To define an associated inline shortcut**, use the `inlineShortcuts` option.

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
//
mf.macros = {...mf.macros,
  // This means that the command macro `\minutes`
  // will be replaced with `\,{}^\\prime\\;`
  minutes: '\\,{}^\\prime\\;',
  seconds: '\\,\\doubleprime\\;',
};
//
mf.inlineShortcuts = {...mf.inlineShortcuts,
  // This means that typing the inline shortcut 
  // "minutes" will insert the command "\minutes"
  minutes: '\\minutes', 
  seconds: '\\seconds',
};


:::html
<math-field id="mf">
  3\minutes 15\seconds
</math-field>
```





## Inspecting Available Macros

**To view the available macros**, inspect the `macros` property:

```live show-line-numbers
:::js
const mf = document.getElementById('mf');
console.log(mf.macros);


:::html
<math-field id='mf'>x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</math-field>
```


## Disabling Macros

**To turn off all macros**, use  `mf.macros = {}`.

