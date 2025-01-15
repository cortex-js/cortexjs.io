---
date: Last Modified
title: Commands
slug: /mathfield/guides/commands/
# toc: true
---


# Commands

<Intro>
You can perform editing operations on the mathfield programmatically.
For example, to insert a fraction when the user clicks a button.
</Intro>

You can do this by dispatching **commands** to the mathfield, such as 
`"select-all"`, `"move-to-next-char"`, `"delete-backward"`, etc...

**To dispatch commands** use the [`mf.executeCommand()`](/docs/mathfield/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(executeCommand%3Ainstance)) method.

```js
mf.executeCommand("delete-backward");
```

**To associate commands with virtual keyboard keycaps** use the `command`
property of the keycap definition. For example:

```json example
{ 
  "class": "action", 
  "label": "Delete", 
  "command": 'perform-with-feedback("delete-backward")'
}
```


Commands are identified by a string called the **selector**.

The selector can use either CamelCase or kebab-case syntax. For example:
`"moveToNextChar"` or `"move-to-next-char"` are the same selector.


Most commands take no parameters. When a command does have a parameter, a tuple 
with the selector and the commands arguments can be passed to
`executeCommand()`. For example:

```js
mf.executeCommand(["insert", "(#0)"]);
```

The command above will insert an open and close parenthesis around the selection (the `#0`
sequence is replaced with the current selection).


## Editing Commands

- `insert` This selector takes two arguments. The first one is required and is
  the content to be inserted, as a string. The second one is an optional set of
  key value pairs:
  - `insertionMode`: one of `"replaceSelection"`, `"replaceAll"`,
    `"insertBefore"` or `"insertAfter"`.
  - `selectionMode`: one of `"placeholder"` (the selection will be the first
    available placeholder in the item that has been inserted), `"after"` (the
    selection will be an insertion point after the item that has been inserted),
    `"before"` (the selection will be an insertion point before the item that
    has been inserted) or `"item"` (the item that was inserted will be
    selected).
- `delete` Synonym for `deleteNextChar`
- `deleteBackward` `deleteForward`
- `deleteNextWord` `deletePreviousWord`
- `deleteToGroupStart` `deleteToGroupEnd`
- `deleteToMathFieldEnd`
- `deleteAll`
- `transpose`

## Edit Menu

- `undo`
- `redo`
- `cutToClipboard`
- `copyToClipboard`
- `pasteFromClipboard`

## User Interface

- `commit` The user has completed input. Triggered when pressing the <kbd>RETURN</kbd>
or <kbd>ENTER</kbd> key.
- `switchMode`
- `complete` Exit command mode and insert result
- `nextSuggestion` and `previousSuggestion` when the popover panel is selected,
  display the next/previous suggestion
- `toggleKeystrokeCaption` Show/hide the keystroke caption panel. This panel
  displays the keys being typed, including the shortcuts. Great for demos!
- `toggleVirtualKeyboard` Show/hide the virtual keyboard

## Scrolling

- `scrollToStart`
- `scrollToEnd`
- `scrollIntoView`

## Navigating

- `moveToNextChar` `moveToPreviousChar`
- `moveToNextPlaceholder` `moveToPreviousPlaceholder`
- `moveToNextWord` `moveToPreviousWord`
- `moveToGroupStart` `moveToGroupEnd`
- `moveToMathfieldStart` `moveToMathfieldEnd`
- `moveUp` `moveDown`
- `moveToSuperscript` `moveToSubscript`
- `moveToOpposite`
- `moveBeforeParent` `moveAfterParent`

## Extending the Selection

- `selectGroup`
- `selectAll`
- `extendToNextChar` `extendToPreviousChar`
- `extendToNextWord` `extendToPreviousWord`
- `extendUp` `extendDown`
- `extendToNextBoundary` `extendToPreviousBoundary`
- `extendToGroupStart` `extendToGroupEnd`
- `extendToMathFieldStart` `extendToMathFieldEnd`

## Arrays

- `addRowAfter` `addRowBefore`
- `addColumnAfter` `addColumnBefore`
- `removeRow` `removeColumn`


## Speech

- `speak` This selector takes an optional argument, the string that
  determines what should be spoken. The valid values are:
  - `all`
  - `left`
  - `right`
  - `selection`
  - `parent`
  - `group` 
  
  The second parameter determines whether what is being spoken should
    be highlighted. It is an object: `{withHighlighting: boolean}` (default is
    false). Note: highlighting currently only works when using Amazon's
    AWS speech synthesizer.

