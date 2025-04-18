---
title: Menu
slug: /mathfield/guides/menu/
---

# Menu

<Intro>
The **Mathfield Context Menu** provides a set of commands to perform common 
operations on a mathfield.
</Intro>

**To display the context menu:**
- Right-click on the mathfield
- Long press on the mathfield 
- Tap on the menu toggle (hamburger icon) in the mathfield
- Press the <kbd>ALT/OPTION</kbd>+<kbd>SPACE</kbd>, 
  <kbd>FN</kbd>+<kbd>F10</kbd> or <kbd>MENU</kbd> key on a physical keyboard


The context menu is fully accessible. It can be navigated using the
keyboard, and the menu items are announced by screen readers.

**To navigate the context menu**, use the arrow keys.

An item can also be selected by typing some of the letters of its label.


The default context menu has a set of commands that are useful for most
applications, but you can customize the menu by adding or removing commands
as needed.


## Filtering Menu Items

**To select which menu items are displayed**, use the `filter()` method on 
the `mf.menuItems` property.

For example, to omit all commands related to the Compute Engine (such as
**Evaluate**, **Simplify** and **Solve**), you can filter the menu items by 
their id:

```js example
mf.menuItems = mf.menuItems.filter(item => !item.id.startWith('ce-'));
```

:::warning
The `mf.menuItems` property is a read-only property. It returns a copy of the
original array of menu items.

Do not modify the value of the elements of `mf.menuItems` directly. This will
result in a runtime error.

For example, **do not** use `mf.menuItems[0].visible = false`.
:::


## Replacing the Menu

**To replace the context menu with your own**, set the `mf.menuItems` property.

The `menuItems` property is an array of menu items. 

Each menu item is an object with the following properties:
- `type`: one of `"command"`, `"divider"`, `"submenu"`, `"checkbox"`, `"radio"`. 
  The default is `"command"`.
- `label`: The label to display for the menu item. This can be a string 
  literal or a function that returns a string. If a function is provided, it 
  will be called to update the label whenever the menu is displayed or when the 
  keyboard modifiers change. The value of the string is interpreted as HTML markup.
- `ariaLabel` and `ariaDetails`: If provided, these will be used to set
  the `aria-label` and `aria-details` attributes of the menu item, which can 
  be used by screen readers. Like the `label` property they can be either a 
  string literal or a function that returns a string.
- `visible`, `enabled`, `checked` are status flags that can be set to
  `true` or `false` to control the visibility, enabled state and checked
  state of the menu item.
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

## Adding a Menu Item

**To add a menu item**, use the spread operator (`...`) to create a new array
of menu items, and add the new menu item to the copy of the original array.:

```js
mf.menuItems = [
  {
    label: "Cancel",
    visible: () =>
      mf.isSelectionEditable && !mf.selectionIsCollapsed,
    onMenuSelect: () => mf.insert("\\cancel{#@}"),
  },
  ...mf.menuItems,
];
```

In this example, a new menu item for a **Cancel** command is added at the 
beginning of the menu.

The `visible` handler checks that the selection is editable and not collapsed.

The `onMenuSelect` handler replaces the selection with a `\cancel{}` command.
The `#@` token is replaced with the current selection, effectively wrapping
the selection in a `\cancel{}` command.

**To add a menu item at a specific position**, use the `findIndex()` method
to find the index of the menu item you want to insert relative to.

```js
const isNonEmptySelection = () => mf.getValue(mf.selection).length > 0;
const getCancelArgument = () => {
  const selection = mf.getValue(mf.selection);
  // Is the selection a \cancel{...} command?
  const match = selection.match(/^\\cancel{([^}]*)}$/);
  return match ? match[1] : '';
};

const menuItems = mf.menuItems;

// Find the index of the "Cut" menu item
const index = menuItems.findIndex(item => item.id === 'cut');
mf.menuItems = [
  // Add the new menu item before the "Cut" menu item
  ...menuItems.slice(0, index),

  // Add the new commands
  { type: 'divider' },
  {
    label: "Cancel",
    visible: () =>
      mf.isSelectionEditable && isNonEmptySelection() && !getCancelArgument(),
    onMenuSelect: () => 
      mf.insert("\\cancel{#@}", { selectionMode: 'item' }),
  },
  {
    label: "Uncancel",
    visible: () => mf.isSelectionEditable && getCancelArgument(),
    onMenuSelect: () => 
      mf.insert(getCancelArgument(), { selectionMode: 'item' }),
  },
  { type: 'divider' },

  // Add the rest of the menu items after the "Cut" menu item
  ...menuItems.slice(index)
];
```

In this example, new menu items are added after the **Cut** menu item.
We make a new array of menu items by slicing the original array into two parts:
- The first part is the menu items before the **Cut** item.
- The second part is the menu items after the **Cut** item.
The new menu items are added in between the two parts.

We add a divider before and after the new menu items, which can be useful
to group related menu items together.

We add two new menu items: **Cancel** and **Uncancel**. The **Cancel** item is
only visible when the selection is editable, not empty and not already
a cancel command. The **Uncancel** item is only visible when the selection
is editable and is a cancel command. At most one of the two commands will 
be visible, allowing the user to either cancel or uncancel the selection.


## Listening to Menu Events

When a menu item is selected, its `onMenuSelect` handler is invoked and 
a `menu-select`  custom event is dispatched.

It is generally simpler to provide a `onMenuSelect` handler for each
menu item, but you can also listen to the `menu-select` event to handle
all menu item selections in a single event handler.


The `detail` property of the `menu-select` event contains the following properties:
- `id`: The id of the menu item that was selected.
- `label`: The label of the menu item that was selected.
- `data`: The data payload associated with the menu item, if any.
- `modifiers`: An object containing the state of the modifier keys when the
 menu item was selected. The following properties are defined:
    - `altKey`
    - `ctrlKey`
    - `metaKey`
    - `shiftKey`

The example above which use `onMenuSelect` can be rewritten to use the 
`menu-select` event instead. Note that in this case, the menu items have an
 `id` property, which is used to identify the menu item that was selected.

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
with a keyboard shortcut, right-click or long press.

**To prevent the menu from being displayed**, set the
`mf.menuItems` property to an empty array:

```javascript example
mf.menuItems = [];
```


