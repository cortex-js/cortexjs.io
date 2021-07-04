---
layout: single
date: Last Modified
title: Commands - MathLive Guide
permalink: /mathlive/guides/commands/
read_time: false
sidebar:
    - nav: "mathlive"
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.0/mode/xml/xml.min.js
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Commands

User initiated commands that control the mathfield can be dispatched using
[`executeCommand()`](/docs/mathlive/#(%22mathfield-element%22%3Amodule).(MathfieldElement%3Aclass).(executeCommand%3Ainstance)). 

Commands are
identified by a string called the **selector**. 

```js
mf.executeCommand('deleteBackward');
```


Most commands take no parameters. When a command does have a parameter, a tuple with the
selector and the commands arguments can be passed to
`executeCommand()`. For example:

```js
mf.executeCommand(['insert', '(#0)']);
```

The command above will insert an open and close parenthesis around the selection (the `#0`
sequence is replaced with the current selection).

## Editing

- `insert`. This selector takes two arguments. The first one is required and is
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
- `delete` synonym for `deleteNextChar`
- `deleteBackward`, `deleteForward`
- `deleteNextWord`, `deletePreviousWord`
- `deleteToGroupStart`, `deleteToGroupEnd`
- `deleteToMathFieldEnd`
- `transpose`

## Edit Menu

- `undo`
- `redo`
- `cutToClipboard`
- `copyToClipboard`
- `pasteFromClipboard`

## User Interface

- `switchMode`
- `complete` exit command mode and insert result
- `nextSuggestion` and `previousSuggestion` when the popover panel is selected,
  display the next/previous suggestion
- `toggleKeystrokeCaption` show/hide the keystroke caption panel. This panel
  displays the keys being typed, including the shortcuts. Great for demos!
- `toggleVirtualKeyboard` show/hide the virtual keyboard

## Scrolling

- `scrollToStart`
- `scrollToEnd`
- `scrollIntoView`

## Navigating

- `moveToNextChar`, `moveToPreviousChar`
- `moveToNextPlaceholder`, `moveToPreviousPlaceholder`
- `moveToNextWord`, `moveToPreviousWord`
- `moveToGroupStart`, `moveToGroupEnd`
- `moveToMathFieldStart`, `moveToMathFieldEnd`
- `moveUp`, `moveDown`
- `moveToSuperscript`, `moveToSubscript`
- `moveToOpposite`
- `moveBeforeParent`, `moveAfterParent`

## Extending the Selection

- `selectGroup`
- `selectAll`
- `extendToNextChar`, `extendToPreviousChar`
- `extendToNextWord`, `extendToPreviousWord`
- `extendUp`, `extendDown`
- `extendToNextBoundary`, `extendToPreviousBoundary`
- `extendToGroupStart`, `extendToGroupEnd`
- `extendToMathFieldStart`, `extendToMathFieldEnd`

## Arrays

- `addRowAfter`, `addRowBefore`
- `addColumnAfter`, `addColumnBefore`

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
Next: Extending the supported LaTeX commands with **Macros**
{% endreadmore %}
