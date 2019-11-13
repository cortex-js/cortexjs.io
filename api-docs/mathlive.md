---
permalink: /docs/mathlive
title: mathlive
read_time: false
# toc: true
---

<h2 id="module%3Amathlive" markdown="1">_Module_ **mathlive**</h2>
Use MathLive to render and edit mathematical formulas in your browser.

This module exports [some functions](#functions%3Amathlive) and the [`MathField`](#class%3AMathField) class.

See [the Usage Guide](USAGE_GUIDE) for more details on how to get
started.

```typescript
// To invoke the functions in this module, import the `mathlive` module.

import mathlive from 'dist/mathlive.mjs';

console.log(mathlive.latexToMarkup('e^{i\\pi}+1=0'));
```

<h2 id="functions%3Amathlive" markdown="1">_module mathlive_ Functions</h2>
<section class="tsd-index-list" markdown="1">

### Read Aloud

-   [highlightAtomID()](#mathlive.highlightAtomID)
-   [pauseReadAloud()](#mathlive.pauseReadAloud)
-   [playReadAloud()](#mathlive.playReadAloud)
-   [readAloudStatus()](#mathlive.readAloudStatus)
-   [resumeReadAloud()](#mathlive.resumeReadAloud)

### Converting

-   [astToLatex()](#mathlive.astToLatex)
-   [latexToAST()](#mathlive.latexToAST)
-   [latexToMarkup()](#mathlive.latexToMarkup)
-   [latexToMathML()](#mathlive.latexToMathML)
-   [latexToSpeakableText()](#mathlive.latexToSpeakableText)

### Other

-   [getOriginalContent()](#mathlive.getOriginalContent)
-   [makeMathField()](#mathlive.makeMathField)
-   [renderMathInDocument()](#mathlive.renderMathInDocument)
-   [renderMathInElement()](#mathlive.renderMathInElement)
-   [revertToOriginalContent()](#mathlive.revertToOriginalContent)
    </section>

## Read Aloud

{:.category-title}

<section class="card" markdown="1">

<h3 id="mathlive.highlightAtomID" markdown="1">function mathlive.**highlightAtomID**(_atomID_: string): void</h3>
Highlights the span corresponding to the specified atomID.

This is used for text-to-speech with synchronized highlighting (read aloud)

_**atomID**_: string
:

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.pauseReadAloud" markdown="1">function mathlive.**pauseReadAloud**(): void</h3>
Pauses a read aloud operation if one is in progress.

**See** [`speak`](#editor%2Fmathfield.speak)

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.playReadAloud" markdown="1">function mathlive.**playReadAloud**(_token_?: string,
    _count_?: number): void</h3>
If a Read Aloud operation is in progress, read from a specified token

**See** [`speak`](#editor-mathfield.speak)

_**token**_?: string
:

_**count**_?: number
: The number of tokens to read.

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.readAloudStatus" markdown="1">function mathlive.**readAloudStatus**(): "ready" | "playing" | "paused" | "unavailable"</h3>
Returns the status of a Read Aloud operation (reading with synchronized
highlighting).

Possible values are:

-   `"ready"`
-   `"playing"`
-   `"paused"`
-   `"unavailable"`

**See** [`speak`](#editor-mathfield.speak)

→: "ready" | "playing" | "paused" | "unavailable"
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.resumeReadAloud" markdown="1">function mathlive.**resumeReadAloud**(): void</h3>
Resumes a read aloud operation if one was paused.

**See** [`speak`](#editor-mathfield.speak)

→: void
:

</section>

## Converting

{:.category-title}

<section class="card" markdown="1">

<h3 id="mathlive.astToLatex" markdown="1">function mathlive.**astToLatex**(_ast_: any,
    _options_): string</h3>
Converts an Abstract Syntax Tree (MathJSON) to a LaTeX string.

**See:** [MASTON](MASTON)

_**ast**_: any
: The Abstract Syntax Tree as an object literal (MathJSON).

_**options**_
:

_options_.**beginRepeatingDigits**?: string
: The string
used at the begining of repeating digits. **Default** = `"\\overline{"`

_options_.**decimalMarker**?: string
: The character used as the decimal
marker. **Default** = `"."`.

_options_.**endRepeatingDigits**?: string
: The string
used at the end of repeating digits. **Default** = `"}"`

_options_.**exponentMarker**?: string
: The character used to indicate an
exponent. **Default** = `""`

_options_.**exponentProduct**?: string
: The character used before an
exponent indicator. **Default** = `"\\cdot "`

_options_.**groupSeparator**?: string
: The character used to separate group of numbers, typically thousands. **Default** = `"\\, "`

_options_.**precision**?: number
: The number of digits used in the
representation of numbers. **Default** = 14.

_options_.**product**?: string
: The character used to indicate product. Other option would be `"\\times "`. **Default** = `"\\cdot "`

_options_.**scientificNotation**?: "auto" | "engineering" | "on"
: The format used for numbers
using the scientific notation. **Default** = `"auto"`

→: string
: The LaTeX representation of the Abstract Syntax Tree, if valid.

</section>

<section class="card" markdown="1">

<h3 id="mathlive.latexToAST" markdown="1">function mathlive.**latexToAST**(_latex_: string,
    _options_): any</h3>
Converts a LaTeX string to an Abstract Syntax Tree (MathJSON)

**See:** [MASTON](MASTON)

_**latex**_: string
: A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

_**options**_
:

_options_.**macros**?: any
: A dictionary of LaTeX macros

→: any
: The Abstract Syntax Tree as an object literal using the MathJSON format.

</section>

<section class="card" markdown="1">

<h3 id="mathlive.latexToMarkup" markdown="1">function mathlive.**latexToMarkup**(_text_: string,
    _mathstyle_: "displaystyle" | "textstyle",
    _format_?: "mathlist" | "span" | "html"): string</h3>
Converts a LaTeX string to a string of HTML markup.

_**text**_: string
: A string of valid LaTeX. It does not have to start
with a mode token such as `$$` or `\(`.

_**mathstyle**_: "displaystyle" | "textstyle"
: If `'displaystyle'` the "display" mode of TeX
is used to typeset the formula, which is most appropriate for formulas that are
displayed in a standalone block.

If `'textstyle'` is used, the "text" mode
of TeX is used, which is most appropriate when displaying math "inline"
with other text (on the same line).

_**format**_?: "mathlist" | "span" | "html"
: For debugging purposes, this function
can also return a text representation of internal data structures
used to construct the markup.

→: string
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.latexToMathML" markdown="1">function mathlive.**latexToMathML**(_latex_: string,
    _options_): string</h3>
Converts a LaTeX string to a string of MathML markup.

_**latex**_: string
: A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

_**options**_
:

_options_.**generateID**?: boolean
: If true, add an `"extid"` attribute
to the MathML nodes with a value matching the `atomID`. This can be used
to map items on the screen with their MathML representation or vice-versa.

→: string
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.latexToSpeakableText" markdown="1">function mathlive.**latexToSpeakableText**(_latex_: string,
    _options_): string</h3>
Converts a LaTeX string to a textual representation ready to be spoken

```typescript
console.log(MathLive.latexToSpeakableText('\\frac{1}{2}'));
// ➡︎'half'
```

_**latex**_: string
: A string of valid LaTeX. It does not have to start
with a mode token such as a `$$` or `\(`.

_**options**_
:

_options_.**textToSpeechMarkup**?: string
: The markup syntax to use
for the output of conversion to spoken text.

Possible values are `ssml` for
the SSML markup or `mac` for the MacOS markup (e.g. `"[[ltr]]"`)

_options_.**textToSpeechRules**?: "mathlive" | "sre"
: The set of text to
speech rules to use.

A value of `"mathlive"` (the default) indicates that
the simple rules built into MathLive should be used.

A value of `"sre"` indicates that the Speech Rule Engine from Volker Sorge
should be used.
Note that SRE is not included or loaded by MathLive and for this option to
work SRE should be loaded separately.

_options_.**textToSpeechRulesOptions**?: \[key: string\]: any
: A set of
key/value pairs that can be used to configure the speech rule engine.

Which options are available depends on the speech rule engine in use. There
are no options available with MathLive's built-in engine. The options for
the SRE engine are documented [here]{@link:https://github.com/zorkow/speech-rule-engine}

_textToSpeechRulesOptions._.\[key: string\]: any
→: string
: The spoken representation of the input LaTeX.

</section>

## Other

{:.category-title}

<section class="card" markdown="1">

<h3 id="mathlive.getOriginalContent" markdown="1">function mathlive.**getOriginalContent**(_element_: string | HTMLElement | MathField,
    _options_?): string</h3>
After calling [`renderMathInElement`](#mathlive.renderMathInElement)
or [`makeMathField`](#mathlive.makeMathField) the original content
can be retrieved by calling this function.

Given the following markup:

```html
<span id="equation">$$f(x)=sin(x)$$</span>
```

The following code:

```javascript
MathLive.renderMathInElement('equation');
console.log(MathLive.getOriginalContent('equation'));
```

will output:

```
$$f(x)=sin(x)$$
```

_**element**_: string | HTMLElement | MathField
: A DOM element ID, a DOM
element or a MathField.

_**options**_?
:

_options_.**namespace**?: string
: The namespace used for the `data-`
attributes.
If you used a namespace with `renderMathInElement()`, you must
use the same namespace here.

→: string
: the original content of the element.

</section>

<section class="card" markdown="1">

<h3 id="mathlive.makeMathField" markdown="1">function mathlive.**makeMathField**(_element_: HTMLElement | string,
    _config_?: MathFieldConfig): MathField</h3>
Convert a DOM element into an editable mathfield.

After the DOM element has been created, the value `element.mathfield` will
return a reference to the mathfield object. This value is also returned
by `makeMathField`

_**element**_: HTMLElement | string
: A DOM element, for example as obtained
by `document.getElementById()`, or the ID of a DOM element as a string.

_**config**_?: MathFieldConfig
: See [CONFIG](CONFIG) for details.

→: MathField
: Given the HTML markup:

```html
<span id="equation">$f(x)=sin(x)$</span>
```

The following code will turn the span into an editable mathfield.

```
import MathLive from 'dist/mathlive.mjs';
MathLive.makeMathField('equation');
```

</section>

<section class="card" markdown="1">

<h3 id="mathlive.renderMathInDocument" markdown="1">function mathlive.**renderMathInDocument**(_options_?): void</h3>
Transform all the elements in the document body that contain LaTeX code
into typeset math.

**Note:** This is a very expensive call, as it needs to parse the entire
DOM tree to determine which elements need to be processed. In most cases
this should only be called once per document, once the DOM has been loaded.
To render a specific element, use [`renderMathInElement()`](#mathlive.renderMathInElement)
{: .notice--info}

**See:** [USAGE_GUIDE](USAGE_GUIDE)

```typescript
import MathLive from 'dist/mathlive.mjs';
document.addEventListener('load', () => {
    MathLive.renderMathInDocument();
});
```

_**options**_?: \[key: string\]: any
: See [`renderMathInElement()`](#mathlive.renderMathInElement)
for details

_options._.\[key: string\]: any
→: void
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.renderMathInElement" markdown="1">function mathlive.**renderMathInElement**(_element_: HTMLElement | string,
    _options_?,
    _renderToMarkup_?,
    _renderToMathML_?,
    _renderToSpeakableText_?): void</h3>
Transform all the children of `element`, recursively, that contain LaTeX code
into typeset math.

**See:** [USAGE_GUIDE](USAGE_GUIDE)

_**element**_: HTMLElement | string
: An HTML DOM element, or a string containing
the ID of an element.

_**options**_?
:

_options_.**ignoreClass**?: string
: a string used as a
regular expression of class names of elements whose content will not be
scanned for delimiters

_options_.**macros**?: object[]
: Custom LaTeX macros

_options_.**namespace**?: string
: Namespace that is added to `data-`
attributes to avoid collisions with other libraries.

It is empty by default.

The namespace should be a string of lowercase letters.

_options_.**preserveOriginalContent**?: boolean
: if true, store the
original textual content of the element in a `data-original-content`
attribute. This value can be accessed for example to restore the element to
its original value:

```javascript
elem.innerHTML = elem.dataset.originalContent;
```

_options_.**processClass**?: string
: a string used as a
regular expression of class names of elements whose content **will** be
scanned for delimiters, even if their tag name or parent class name would
have prevented them from doing so.

_options_.**processScriptType**?: string
: `<script>` tags of the
indicated type will be processed while others will be ignored.

_options_.**readAloud**?: boolean
: if true, generate markup that can
be read aloud later using [`speak`](#editor-mathfield.speak)

_options_.**renderAccessibleContent**?: string
: The format(s) in
which to render the math for screen readers:

-   `'mathml'` MathML
-   `'speakable-text'` Spoken representation

    You can pass an empty string to turn off the rendering of accessible content.

    You can pass multiple values separated by spaces, e.g `'mathml speakable-text'`

_options_.**skipTags**?: string[]
:
an array of tag names whose content will
not be scanned for delimiters (unless their class matches the `processClass`
pattern below.

_**renderToMarkup**_?: (..._params_: any[]) => any
: a function that will convert any LaTeX found to
HTML markup. This is only useful to override the default MathLive renderer

_**renderToMathML**_?: (..._params_: any[]) => any
: a function that will convert any LaTeX found to
MathML markup.

_**renderToSpeakableText**_?: (..._params_: any[]) => any
: a function that will convert any LaTeX found to
speakable text markup.

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="mathlive.revertToOriginalContent" markdown="1">function mathlive.**revertToOriginalContent**(_element_: string | HTMLElement | MathField,
    _options_?): void</h3>

_**element**_: string | HTMLElement | MathField
:

_**options**_?
:

_options_.**namespace**: string
: The namespace used for the `data-`
attributes. If you used a namespace with `renderMathInElement`, you must
use the same namespace here.

→: void
:

</section>

<h2 id="class%3AMathField" markdown="1">_Class_ **MathField**</h2>
<section class="tsd-index-list" markdown="1">

### Selection

-   [\$selectionAtEnd()](#MathField.%24selectionAtEnd)
-   [\$selectionAtStart()](#MathField.%24selectionAtStart)
-   [\$selectionDepth()](#MathField.%24selectionDepth)
-   [\$selectionIsCollapsed()](#MathField.%24selectionIsCollapsed)

### Changing the Content

-   [\$applyStyle()](#MathField.%24applyStyle)
-   [\$insert()](#MathField.%24insert)
-   [\$keystroke()](#MathField.%24keystroke)
-   [\$typedText()](#MathField.%24typedText)

### Accessing the Content

-   [\$latex()](#MathField.%24latex)
-   [\$selectedText()](#MathField.%24selectedText)
-   [\$text()](#MathField.%24text)

### Other

-   [\$el()](#MathField.%24el)
-   [\$perform()](#MathField.%24perform)
-   [\$revertToOriginalContent()](#MathField.%24revertToOriginalContent)
-   [\$setConfig()](#MathField.%24setConfig)
-   [speak\_()](#MathField.speak_)
    </section>

## _class MathField_ Selection

{:.category-title}

<section class="card" markdown="1">

<h3 id="MathField.%24selectionAtEnd" markdown="1">function MathField.**$selectionAtEnd**(): boolean</h3>
Checks if the selection extends to the end of the selection group.

→: boolean
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24selectionAtStart" markdown="1">function MathField.**$selectionAtStart**(): boolean</h3>
Checks if the selection starts at the beginning of the selection group.

→: boolean
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24selectionDepth" markdown="1">function MathField.**$selectionDepth**(): number</h3>
Returns the depth of the selection group.

If the selection is at the root level, returns 0.

If the selection is a portion of the numerator of a fraction
which is at the root level, return 1. Note that in that case, the numerator
would be the "selection group".

→: number
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24selectionIsCollapsed" markdown="1">function MathField.**$selectionIsCollapsed**(): boolean</h3>
Checks if the selection is collapsed.

→: boolean
: True if the length of the selection is 0, that is, if it is a single
insertion point.

</section>

## _class MathField_ Changing the Content

{:.category-title}

<section class="card" markdown="1">

<h3 id="MathField.%24applyStyle" markdown="1">function MathField.**$applyStyle**(_style_): void</h3>
Updates the style (color, bold, italic, etc...) of the selection or sets
the style to be applied to future input.

If there is a selection, the style is applied to the selection

If the selection already has this style, remove it. If the selection
has the style partially applied (i.e. only some sections), remove it from
those sections, and apply it to the entire selection.

If there is no selection, the style will apply to the next character typed.

_**style**_
: The style properties to be applied. All the
properties are optional and they can be combined.

_style_.**backgroundColor**?: string
: The background color.

_style_.**color**?: string
: The text/fill color, as a CSS RGB value or
a string for some "well-known" colors, e.g. `"red"`, `"#f00"`, etc...

_style_.**fontFamily**?: string
: The font family used to render text.

This value can the name of a locally available font, or a CSS font stack, e.g.
`"Avenir"`, `"Georgia, serif"`, etc...

This can also be one of the following TeX-specific values:

|`"cmr"`| Computer Modern Roman, serif|
|`"cmss"`| Computer Modern Sans-serif, latin characters only|
|`"cmtt"`| Typewriter, slab, latin characters only|
|`"cal"`| Calligraphic style, uppercase latin letters and digits only|
|`"frak"`| Fraktur, gothic, uppercase, lowercase and digits|
|`"bb"`| Blackboard bold, uppercase only|
|`"scr"`| Script style, uppercase only|

_style_.**mode**?: string
: Either `"math"`, `"text"` or `"command"`

_style_.**series**?: string
: The font 'series', i.e. weight and
stretch.

The following values can be combined, for example: `"ebc"`: extra-bold,
condensed. Aside from `"b"`, these attributes may not have visible effect if the
font family does not support this attribute:

|`"ul"`| ultra-light weight|
|`"el"`| extra-light|
|`"l"`| light|
|`"sl"`| semi-light|
|`"m"`| medium (default)|
|`"sb"`| semi-bold|
|`"b"`| bold|
|`"eb"`| extra-bold|
|`"ub"`| ultra-bold|
|`"uc"`| ultra-condensed|
|`"ec"`| extra-condensed|
|`"c"`| condensed|
|`"sc"`| semi-condensed|
|`"n"`| normal (default)|
|`"sx"`| semi-expanded|
|`"x"`| expanded|
|`"ex"`| extra-expanded|
|`"ux"`| ultra-expanded|

_style_.**shape**?: string
: The font "shape", i.e. italic or upright.

|`"auto"`| italic or upright, depending on mode and letter (single letters are italic in math mode)|
|`"up"`| upright|
|`"it"`| italic|
|`"sl"`| slanted or oblique (often the same as italic)|
|`"sc"`| small caps|
|`"ol"`| outline|

_style_.**size**?: string
: The font size: `"size1"`...`"size10"`.
'"size5"' is the default size

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24insert" markdown="1">function MathField.**$insert**(_s_: string,
    _options_?): void</h3>
Inserts a block of text at the current insertion point.

This method can be called explicitly or invoked as a selector with [`$perform("insert")`](MathField#$perform)
.

After the insertion, the selection will be set according to the `selectionMode`.

_**s**_: string
: The text to be inserted

_**options**_?
:

_options_.**feedback**: boolean
: If true, provide audio and haptic feedback

_options_.**focus**: boolean
: If true, the mathfield will be focused after
the insertion

_options_.**format**: "auto" | "latex"
: The format of the string `s`:

|`"auto"`| The string is Latex fragment or command) (default)|
|`"latex"`| The string is a Latex fragment|

_options_.**insertionMode**: "replaceSelection" | "replaceAll" | "insertBefore" | "insertAfter"
: -

|`"replaceSelection"`| (default)|
|`"replaceAll"`| |
|`"insertBefore"`| |
|`"insertAfter"`| |

_options_.**mode**: "text" | "math" | ""
: If empty, the current mode
is used (default)

_options_.**resetStyle**: boolean
: If true, the style after the insertion
is the same as the style before. If false, the style after the
insertion is the style of the last inserted atom.

_options_.**selectionMode**: "placeholder" | "after" | "before" | "item"
: Describes where the selection
will be after the insertion:

|`"placeholder"`| The selection will be the first available placeholder in the text that has been inserted (default)|
|`"after"`| The selection will be an insertion point after the inserted text|
|`"before"`| The selection will be an insertion point before the inserted text|
|`"item"`| The inserted text will be selected|

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24keystroke" markdown="1">function MathField.**$keystroke**(_keys_: string,
    _evt_?: Event): boolean</h3>

_**keys**_: string
: A string representation of a key combination.

For example `"Alt-KeyU"`.

See [W3C UIEvents](https://www.w3.org/TR/uievents/#code-virtual-keyboards)
for more information on the format of the descriptor.

_**evt**_?: Event
: An event corresponding to the keystroke. Pass this
event if the keystroke originated from a user interaction that produced it.
If the keystroke is synthetic (for example, triggered in response to a
click or other event not involving a keyboard), omit it.

→: boolean
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24typedText" markdown="1">function MathField.**$typedText**(_text_: string): void</h3>
Simulates a user typing the keys indicated by text.

_**text**_: string
: A sequence of one or more characters.

→: void
:

</section>

## _class MathField_ Accessing the Content

{:.category-title}

<section class="card" markdown="1">

<h3 id="MathField.%24latex" markdown="1">function MathField.**$latex**(_text_?: string,
    _options_?): string</h3>
Sets or gets the content of the mathfield.

If `text` is not empty, sets the content of the mathfield to the
text interpreted as a LaTeX expression.

If `text` is empty (or omitted), return the content of the mathfield as a
LaTeX expression.

_**text**_?: string
:

_**options**_?
:

_options_.**suppressChangeNotifications**?: boolean
: If true, the
handlers for the contentWillChange and contentDidChange notifications will
not be invoked. **Default** = `false`.

→: string
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24selectedText" markdown="1">function MathField.**$selectedText**(_format_?: string): string</h3>
Returns a textual representation of the selection in the mathfield.

_**format**_?: string
: The format of the result.

|`"latex"`|Macros are not expanded|
|`"latex-expanded"`|All macros are recursively expanded to their definition|
|`"spoken"`|
|`"spoken-text"`|
|`"spoken-ssml"`|
|`"spoken-ssml-withHighlighting"`|
|`"mathML"`|
|`"json"`|

**Default** = `"latex"`

→: string
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24text" markdown="1">function MathField.**$text**(_format_?: string): string</h3>
Returns a textual representation of the mathfield.

_**format**_?: string
: The format of the result.

|`"latex"`|Macros are not expanded|
|`"latex-expanded"`|All macros are recursively expanded to their definition|
|`"spoken"`||
|`"spoken-text"`||
|`"spoken-ssml"`||
|`"spoken-ssml-withHighlighting"`||
|`"mathML"`||
|`"json"`|A stringified version of the JSON representation of the content|

**Default** = `"latex"`

→: string
:

</section>

## _class MathField_ Other

{:.category-title}

<section class="card" markdown="1">

<h3 id="MathField.%24el" markdown="1">function MathField.**$el**(): HTMLElement</h3>
Return the DOM element associated with this mathfield.

Note that `this.$el().mathfield === this`

→: HTMLElement
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24perform" markdown="1">function MathField.**$perform**(_command_: string | string[]): void</h3>
Performs a command defined by a selector.

#### Moving the insertion point

| Name                          | Description |
| ----------------------------- | ----------- |
| `"moveToNextChar"`            |             |
| `"moveToPreviousChar"`        |             |
| `"moveUp"`                    |             |
| `"moveDown"`                  |             |
| `"moveToNextPlaceholder"`     |             |
| `"moveToPreviousPlaceholder"` |             |
| `"moveToNextWord"`            |             |
| `"moveToPreviousWord"`        |             |
| `"moveToGroupStart"`          |             |
| `"moveToGroupEnd"`            |             |
| `"moveToMathFieldStart"`      |             |
| `"moveToMathFieldEnd"`        |             |
| `"moveToSuperscript"`         |             |
| `"moveToSubscript"`           |             |
| `"moveToOpposite"`            |             |
| `"moveBeforeParent"`          |             |
| `"moveAfterParent"`           |             |

#### Selection

| Name            | Description                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"selectGroup"` | Select all the atoms in the current group, that is all the siblings.<br> When the selection is in a numerator, the group is the numerator.<br>When the selection is a superscript or subscript, the group is the supsub. |
| `"selectAll"`   | Select all the atoms in the mathfield                                                                                                                                                                                    |

#### Extending the selection

| Name                         | Description |
| ---------------------------- | ----------- |
| `"extendToNextChar"`         |             |
| `"extendToPreviousChar"`     |             |
| `"extendToNextWord"`         |             |
| `"extendToPreviousWord"`     |             |
| `"extendUp"`                 |             |
| `"extendDown"`               |             |
| `"extendToNextBoundary"`     |             |
| `"extendToPreviousBoundary"` |             |
| `"extendToGroupStart"`       |             |
| `"extendToGroupEnd"`         |             |
| `"extendToMathFieldStart"`   |             |
| `"extendToMathFieldEnd"`     |             |

#### Editing / deleting

| Name                     | Description                    |
| ------------------------ | ------------------------------ |
| `"deleteAll"`            | Delete everything in the field |
| `"delete"`               | Delete the current selection   |
| `"deleteNextChar"`       |                                |
| `"deletePreviousChar"`   |                                |
| `"deleteNextWord"`       |                                |
| `"deletePreviousWord"`   |                                |
| `"deleteToGroupStart"`   |                                |
| `"deleteToGroupEnd"`     |                                |
| `"deleteToMathFieldEnd"` |                                |
| `"transpose"`            |                                |

#### Editing a matrix

| Name                | Description |
| ------------------- | ----------- |
| `"addRowAfter"`     |             |
| `"addRowBefore"`    |             |
| `"addColumnAfter"`  |             |
| `"addColumnBefore"` |             |

#### Other editing commands

| Name                       | Description |
| -------------------------- | ----------- |
| `"scrollIntoView"`         |             |
| `"scrollToStart"`          |             |
| `"switchMode"`             |             |
| `"complete"`               |             |
| `"nextSuggestion"`         |             |
| `"previousSuggestion"`     |             |
| `"toggleKeystrokeCaption"` |             |
| `"applyStyle"`             |             |

#### Clipboard

| Name                   | Description |
| ---------------------- | ----------- |
| `"undo"`               |             |
| `"redo"`               |             |
| `"copyToClipboard"`    |             |
| `"cutToClipboard"`     |             |
| `"pasteFromClipboard"` |             |

#### Virtual Keyboard

| Name                              | Description |
| --------------------------------- | ----------- |
| `"toggleVirtualKeyboard"`         |             |
| `"showVirtualKeyboard"`           |             |
| `"hideVirtualKeyboard"`           |             |
| `"toggleVirtualKeyboardAlt"`      |             |
| `"toggleVirtualKeyboardShift"`    |             |
| `"showAlternateKeys"`             |             |
| `"hideAlternateKeys"`             |             |
| `"performAlternateKeys"`          |             |
| `"switchKeyboardLayer"`           |             |
| `"shiftKeyboardLayer"`            |             |
| `"unshiftKeyboardLayer"`          |             |
| `"insertAndUnshiftKeyboardLayer"` |             |
| `"performWithFeedback"`           |             |

#### Speech

| Name      | Description                                         |
| --------- | --------------------------------------------------- |
| `"speak"` | speaks the amount specified by the first parameter. |

_**command**_: string | string[]
: A selector, or an array whose first element
is a selector, and whose subsequent elements are arguments to the selector.

Note that selectors do not include a final "\_". They can be passed either
in camelCase or kebab-case.

```javascript
mf.$perform('selectAll');
mf.$perform('select-all');
```

In the above example, both calls invoke the same selector.

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24revertToOriginalContent" markdown="1">function MathField.**$revertToOriginalContent**(): void</h3>
Reverts this mathfield to its original content.

After this method has been
called, no other methods can be called on the object.

To turn the
element back into a mathfield, call `MathLive.makeMathField()` on the
element again to get a new mathfield object.

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.%24setConfig" markdown="1">function MathField.**$setConfig**(_config_: MathFieldConfig): void</h3>
Update the configuration options for this mathfield.

_**config**_: MathFieldConfig
: See [Configuration Options](CONFIG) for details.

→: void
:

</section>

<section class="card" markdown="1">

<h3 id="MathField.speak_" markdown="1">function MathField.**speak_**(_amount_: string,
    _speakOptions_): void</h3>
Speak some part of the expression, either with or without synchronized highlighting.

_**amount**_: string
: `"all"`, `"selection"`, `"left"`, `"right"`, `"group"`, `"parent"`

_**speakOptions**_
:

_speakOptions_.**withHighlighting**: boolean
: If true, synchronized
highlighting of speech will happen (if possible). Default is false.

→: void
:

</section>

<h2 id="typealias%3Aglobal" markdown="1">_Global_ Types</h2>

<section class="card" markdown="1">

### declare type **MathFieldCallback** = (_mathfield_: MathField) => void

</section>

<section class="card" markdown="1">

### declare type **MathFieldConfig**

**customVirtualKeyboardLayers**?: \[key: string\]: string
:

_customVirtualKeyboardLayers._.\[key: string\]: string
**customVirtualKeyboards**?: \[key: string\]: object
:

_customVirtualKeyboards._.\[key: string\]: object
**defaultMode**?: "math" | "text"
:

**handleReadAloud**?: (..._params_: any[]) => any
:

**handleSpeak**?: (..._params_: any[]) => any
:

**horizontalSpacingScale**?: number
:

**ignoreSpacebarInMathMode**?: boolean
:

**inlineShortcutTimeout**?: number
:

**inlineShortcuts**?: \[key: string\]: string
:

_inlineShortcuts._.\[key: string\]: string
**keypressSound**?: string
:

**keypressVibration**?: boolean
:

**locale**?: string
:

**namespace**?: string
:

**onAnnounce**?: (..._params_: any[]) => any
:

**onBlur**?: MathFieldCallback
:

**onContentDidChange**?: MathFieldCallback
:

**onContentWillChange**?: MathFieldCallback
:

**onFocus**?: MathFieldCallback
:

**onKeystroke**?: (..._params_: any[]) => any
:

**onModeChange**?: (..._params_: any[]) => any
:

**onMoveOutOf**?: (..._params_: any[]) => any
:

**onReadAloudStatus**?: (..._params_: any[]) => any
:

**onSelectionDidChange**?: MathFieldCallback
:

**onSelectionWillChange**?: MathFieldCallback
:

**onTabOutOf**?: (..._params_: any[]) => any
:

**onUndoStateDidChange**?: (..._params_: any[]) => any
:

**onUndoStateWillChange**?: (..._params_: any[]) => any
:

**onVirtualKeyboardToggle**?: (..._params_: any[]) => any
:

**overrideDefaultInlineShortcuts**?: boolean
:

**plonkSound**?: string
:

**removeExtraneousParentheses**?: boolean
:

**scriptDepth**?: number
:

**smartFence**?: boolean
:

**smartSuperscript**?: boolean
:

**speechEngine**?: "local" | "amazon"
:

**speechEngineRate**?: string
:

**speechEngineVoice**?: string
:

**strings**?: \[key: string\]: string
:

_strings._.\[key: string\]: string
**substituteTextArea**?: (..._params_: any[]) => any
:

**textToSpeechMarkup**?: "ssml" | "mac"
:

**textToSpeechRules**?: "mathlive" | "sre"
:

**textToSpeechRulesOptions**?: any
:

**virtualKeyboardMode**?: "manual" | "onfocus" | "off"
:

**virtualKeyboardRomanLayout**?: "qwerty" | "azerty" | "qwertz" | "dvorak" | "colemak"
:

**virtualKeyboardTheme**?: "material" | "apple" | ""
:

**virtualKeyboardToggleGlyph**?: string
:

**virtualKeyboards**?: "all" | "numeric" | "roman" | "greek" | "functions" | "command" | string
:

</section>
