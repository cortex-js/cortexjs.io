---
layout: single
date: Last Modified
title: Commands
permalink: /mathlive/guides/commands/
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
    - //unpkg.com/mathlive?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---

User initiated commands that control the mathfield can be dispatched using
[`executeCommand()`](/docs/mathlive/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(executeCommand%3Ainstance)). 

Commands are identified by a string called the **selector**. 

```js
mf.executeCommand('deleteBackward');
```


Most commands take no parameters. When a command does have a parameter, a tuple 
with the selector and the commands arguments can be passed to
`executeCommand()`. For example:

```js
mf.executeCommand(['insert', '(#0)']);
```

The command above will insert an open and close parenthesis around the selection (the `#0`
sequence is replaced with the current selection).

Commands can also be associated with virtual keyboard keycaps.

```json example
{ class: "action", label: "Next", command: ["performWithFeedback", "commit"] }
```
## Editing

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
- `transpose`

## Edit Menu

- `undo`
- `redo`
- `cutToClipboard`
- `copyToClipboard`
- `pasteFromClipboard`

## User Interface

- `commit` The user has completed input. Triggered when pressing the **Return**
or **Enter** key.
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

## Speech

- `speak` This selector takes two optional arguments. The first argument is a string that
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

{% readmore "/mathlive/guides/macros/" %}
**Next:** Extending the supported LaTeX commands with **Macros**
{% endreadmore %}
