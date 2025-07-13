---
title: Styling
slug: /compute-engine/reference/styling/
---

The functions in this section produce a visual difference that is not
material to the interpretation of an expression such as text color and size or
other typographic variations.

They are **inert** and the value of a `["Function", _expr_]` expression is `expr`.


<FunctionDefinition name="Delimiter"> 

<Signature name="Delimiter">_expr_</Signature>

<Signature name="Delimiter">_expr_, _delim_</Signature>


Visually group expressions with an open delimiter, a close delimiter
and separators between elements of the expression.

When serializing to LaTeX, render _expr_ wrapped in delimiters.

The `Delimiter` function is **inert** and the value of a `["Delimiter", _expr_]` expression is `expr`.

_expr_ is a function expression, usually a `["Sequence"]`. It should
not be a symbol or a number.

_delim_ is an optional string:
- when it is a single character it is a separator
- when it is two characters, the first is the opening delimiter and the second is the closing delimiter
- when it is three characters, the first is the opening delimiter, the second is the separator, and the third is the closing delimiter

The delimiters are rendered to LaTeX. 

The open and close delimiters are a single character, one of: `()[]{}<>|‖⌈⌉⌊⌋⌜⌝⌞⌟⎰⎱"`. The open and close delimiters do not have to match.
For example, `"')]'"` is a valid delimiter.

If an open or close delimiter is `.`, it is ignored.

The separator delimiter is also a single character, one of `,;.&:|-` or `U+00B7` (middle dot), `U+2022` (bullet) or `U+2026` (ellipsis).

If no _delim_ is provided, a default delimiter is used based on 
the type of _expr_:
- `["Sequence"]` -> `(,)`
- `["Tuple"]`, `["Single"]`, `["Pair"]`, `["Triple"]` -> `(,)`
- `["List"]` -> `[,]`
- `["Set"]` -> `{,}`




</FunctionDefinition>




<FunctionDefinition name="Spacing"> 

<Signature name="Spacing">_width_</Signature>


When serializing to LaTeX,  `width`is the dimension of the spacing, in 1/18 em.

The `Spacing` function is **inert** and the value of a `["Spacing", _expr_]` expression is `expr`.

</FunctionDefinition>



<FunctionDefinition name="Annotated"> 

<Signature name="Annotated" returns="expression">_expr_:expression, dictionary</Signature>

`Annotated(expr, attributes)` is an expression that behaves exactly like `expr`,
but carries **visual or semantic metadata** as an attribute dictionary.

The attributes have no effect on evaluation. This function is inert — it 
evaluates to its first argument.

The `attributes` dictionary may include:

* Visual style hints (e.g. `weight: "bold"`, `color: "blue"`)
* Semantic metadata (e.g. `tooltip`, `language`, `link`)

Use `Annotated` when you want to attach presentational or semantic
information to an expression **without affecting its evaluation or identity**.
This is useful for rendering, tooltips, highlighting, etc.


The following keys are applicable to math expressions:
- `mathStyle` = `"compact"` or `"normal"`. The `"compact"` style is used for inline math expressions, while the `"normal"` style is used for display math expressions.
- `scriptLevel` = `0`, `1`, or `-1`, `+1`. The script level is used to 
determine the size of the expression in relation to the surrounding text. 
A script level of `0` is normal size, `1` is smaller, and `2` is even smaller.



The following keys are applicable to text content:
- `weight` a string, one of `"normal"`, `"bold"`, `"bolder"`, `"light"`
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `language` a string indicating the language of the expression, e.g. `"en"`, `"fr"`, `"es"` etc.



The following keys are applicable to both math expressions and text content:
- `color` a color name or hex code
- `backgroundColor` a color name or hex code for the background color
- `tooltip` a string to be displayed as a tooltip when the expression is hovered over
- `link` a URL to be followed when the expression is clicked
- `cssClass` a string indicating the CSS class to be applied to the expression
- `cssId` a string indicating the CSS id of the expression





The keys in the dictionary include:
- `style` a string, one of `"normal"`, `"italic"`, `"oblique"`
- `size` a number from `1` to `10` where `5` is normal size
- `font` a string indicating the font family
- `fontSize` a number indicating the font size in pixels
- `fontWeight` a string indicating the font weight, e.g. `"normal"`, `"bold"`, `"bolder"`, `"lighter"`
- `fontStyle` a string indicating the font style, e.g. `"normal"`, `"italic"`, `"oblique"`  
- `textDecoration` a string indicating the text decoration, e.g. `"none"`, `"underline"`, `"line-through"`
- `textAlign` a string indicating the text alignment, e.g. `"left"`, `"center"`, `"right"`  
- `textTransform` a string indicating the text transformation, e.g. `"none"`, `"uppercase"`, `"lowercase"`
- `textIndent` a number indicating the text indentation in pixels
- `lineHeight` a number indicating the line height in pixels
- `letterSpacing` a number indicating the letter spacing in pixels
- `wordSpacing` a number indicating the word spacing in pixels
- `backgroundColor` a color name or hex code for the background color
- `border` a string indicating the border style, e.g. `"none"`, `"solid"`, `"dashed"`, `"dotted"`
- `borderColor` a color name or hex code for the border color
- `borderWidth` a number indicating the border width in pixels
- `padding` a number indicating the padding in pixels
- `margin` a number indicating the margin in pixels 
- `textShadow` a string indicating the text shadow, e.g. `"2px 2px 2px rgba(0,0,0,0.5)"`
- `boxShadow` a string indicating the box shadow, e.g. `"2px 2px 5px rgba(0,0,0,0.5)"`
- `opacity` a number from `0` to `1` indicating the opacity of the expression
- `transform` a string indicating the CSS transform, e.g. `"rotate(45deg)"`, `"scale(1.5)"`, `"translateX(10px)"`
- `transition` a string indicating the CSS transition, e.g. `"all 0.3s ease-in-out"`
- `cursor` a string indicating the cursor style, e.g. `"pointer"`, `"default"`, `"text"`
- `display` a string indicating the CSS display property, e.g. `"inline"`, `"block"`, `"flex"`, `"grid"`  
- `visibility` a string indicating the CSS visibility property, e.g. `"visible"`, `"hidden"`, `"collapse"`
- `zIndex` a number indicating the z-index of the expression
- `position` a string indicating the CSS position property, e.g. `"static"`, `"relative"`, `"absolute"`, `"fixed"`
- `float` a string indicating the CSS float property, e.g. `"left"`, `"right"`, `"none"`
- `clear` a string indicating the CSS clear property, e.g. `"left"`, `"right"`, `"both"`, `"none"`
- `overflow` a string indicating the CSS overflow property, e.g. `"visible"`, `"hidden"`, `"scroll"`, `"auto"`
- `overflowX` a string indicating the CSS overflow-x property, e.g. `"visible"`, `"hidden"`, `"scroll"`, `"auto"`
- `overflowY` a string indicating the CSS overflow-y property, e.g. `"visible"`, `"hidden"`, `"scroll"`, `"auto"`
- `whiteSpace` a string indicating the CSS white-space property, e.g. `"normal"`, `"nowrap"`, `"pre"`,
- `textOverflow` a string indicating the CSS text-overflow property, e.g. `"ellipsis"`, `"clip"`
- `direction` a string indicating the text direction, e.g. `"ltr"` (left-to-right) or `"rtl"` (right-to-left)
- `lang` a string indicating the language of the expression, e.g. `"en"` (English), `"fr"` (French), `"es"` (Spanish)
- `role` a string indicating the ARIA role of the expression, e.g. `"button"`, `"link"`, `"textbox"`
- `aria-label` a string providing an accessible label for the expression
- `aria-labelledby` a string providing an accessible label by referencing another element's ID
- `aria-describedby` a string providing an accessible description by referencing another element's ID
- `aria-hidden` a boolean indicating whether the expression is hidden from assistive technologies
- `aria-live` a string indicating the ARIA live region, e.g. `"off"`, `"polite"`, `"assertive"`
- `aria-atomic` a boolean indicating whether assistive technologies should treat the expression as a whole
- `aria-relevant` a string indicating what changes in the expression are relevant to assistive technologies, e.g. `"additions"  
- `aria-controls` a string providing the ID of another element that the expression controls
- `aria-expanded` a boolean indicating whether the expression is expanded or collapsed
- `aria-pressed` a boolean indicating whether the expression is pressed (for toggle buttons)
- `aria-selected` a boolean indicating whether the expression is selected
- `aria-checked` a boolean indicating whether the expression is checked (for checkboxes or radio buttons)
- `aria-valuenow` a number indicating the current value of the expression (for sliders or progress bars)
- `aria-valuetext` a string providing a text representation of the current value of the expression
- `aria-valuemin` a number indicating the minimum value of the expression (for sliders or progress bars)
- `aria-valuemax` a number indicating the maximum value of the expression (for sliders or progress bars)
- `aria-keyshortcuts` a   


The `Annotated` function is **inert** and the value of a `["Annotated", expr]` expression is `expr`.

</FunctionDefinition>




<ReadMore path="/compute-engine/reference/linear-algebra/#formatting" > 
Read more about formatting of **matrixes** and **vectors**
</ReadMore>




