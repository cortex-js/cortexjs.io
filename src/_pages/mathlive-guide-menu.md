---
layout: single
date: Last Modified
title: Menu
permalink: /mathlive/guides/menu/
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
    - //unpkg.com/mathlive?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---


The MathLive Context Menu provides a set of commands to perform common 
operations on a mathfield.

**To display the context menu:**
- Right-click on the mathfield
- Long press on a mathfield 
- Tap on the menu toggle (hamburger icon) in the mathfield
- Press the <kbd>ALT/OPTION</kbd>+<kbd>SPACE</kbd>, <kbd>FN</kbd>+<kbd>F10</kbd> or <kbd>MENU</kbd> key 
  on a keyboard


The context menu is fully accessible. It can be navigated using the
keyboard, and the menu items are announced by screen readers.

**To navigate the context menu, use the arrow keys**

An item can also be selected by typing some of the letters of its label.


The default context menu has a set of commands that are useful for most
applications, but you can customize the menu by adding or removing commands
as needed.


## Filtering Menu Items

The menu can be filtered to only display a subset of the available commands.

For example, to ommit all commands related to the Compute Engine (such as
Evaluate, Simplify and Solve), you can filter the menu items by id:

```js example
mf.menuItems = mf.menuItems.filter(item => !item.id.startWith('ce-'));
```

**CAUTION:** Do not modify the value of the elements of `mf.menuItems` directly or the menu 
will not be updated as expected, i.e. do not do `mf.menuItems[0].visible = false`.{.notice--warning}


## Replacing the Menu

**To replace the context menu with your own**, set the `mf.menuItems` property.

The `menuItems` property is an array of menu items. 

Each menu item is an object with the following properties:
- `type`: one of `"command"`, `"divider"`, `"submenu"`, `"checkbox"`, `"radio"`. The default is `"command"`.
- `label`: The label to display for the menu item. This can be a string literal or a function that returns a string. If a function is provided, it will be called to update the label whenever the menu is displayed or when the keyboard modifiers change. The value of the string is interpreted as HTML markup.
- `ariaLabel` and `ariaDetails`: If provided, these will be used to set
  the `aria-label` and `aria-details` attributes of the menu item. They 
  can also be a string or a function that returns a string.
- `visible`, `enabled`, `checked` are status flags that can be set to
  `true` or `false` to control the visibility, enabled state and checked
  state of the menu item. They can also be a function that returns a boolean.
- `id`: A unique identifier for the menu item. This is the value that will
  be passed to the `menu-select` event when the menu item is selected.
- `data`: An arbitrary data payload associated with the menu item, if any.
- `submenu`: If the type is `"submenu"`, an array of menu items to
   display when the menu item is selected.
- `onMenuSelect`: A function handler that is called when the menu item is
  selected.

```js example
mf. menuItems = [
  {
    label: 'Copy',
    onMenuSelect: () => console.log('Copy')
  },
  {
    label: 'Paste',
    onMenuSelect: () => console.log('Paste')
  },
  {
    type: 'divider'
  },
  {
    label: 'Submenu',
    submenu: [
      {
        label: 'Submenu 1',
        onMenuSelect: () => console.log('Submenu 1')
      },
      {
        label: 'Submenu 2',
        onMenuSelect: () => console.log('Submenu 2')
      }
    ]
  },
];
```

## Listening to Menu Events

When a menu item is selected, a `menu-select` 
custom event is dispatched.

The `detail` property of the event contains the following properties:
- `id`: The id of the menu item that was selected.
- `label`: The label of the menu item that was selected.
- `data`: The data payload associated with the menu item, if any.
- `modifiers`: An object containing the state of the modifier keys when the
 menu item was selected. The following properties are defined:
    - `altKey`
    - `ctrlKey`
    - `metaKey`
    - `shiftKey`

The example above can be rewritten to use the `menu-select` event instead of the `onMenuSelect` handler. Note that in
this case, the menu items have an `id` property, which is used to identify the menu item that was selected.

```javascript example
mf. menuItems = [
  {
    label: 'Copy',
    id: 'copy'
  },
  {
    label: 'Paste',
    id: 'paste'
  },
  {
    type: 'divider'
  },
  {
    label: 'Submenu',
    submenu: [
      {
        label: 'Submenu 1',
        id: 'submenu-1'
      },
      {
        label: 'Submenu 2',
        id: 'submenu-2'
      }
    ]
  },
];

mf.addEventListener('menu-select', (event) => 
  console.log('Menu item selected:', event.detail.id)
);
```


## Controling the Menu Visibility

**To hide the menu toggle button** use the following CSS:
  
```css example
math-field::part(menu-toggle) {
  display: none;
}
```

Even when the menu toggle button is hidden, the context menu is still accessible
with keyboard shortcut, right-click or long press.

**To prevent the menu from being displayed**, set the
`mf.menuItems` property to an empty array:

```javascript example
mf.menuItems = [];
```


