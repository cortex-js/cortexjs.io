---
layout: single
date: Last Modified
title: Customizing - MathLive Guide
permalink: /mathlive/guides/customizing/
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
  modules:
    - /assets/js/code-playground.js
    - //unpkg.com/mathlive/dist/mathlive.min.mjs
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive/dist/mathlive.min.mjs",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

# Customizing a mathfield

The appearance and behavior of the mathfield is highly customizable. Here are a few common examples.

## Styling

The mathfield can be styled using the `style` attribute on the `<math-field>` tag,
for example to change the base font size or add a border.

 Change line 2-6 of the HTML in the playground below with `color: #dde; background: #256291;`.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <div slot="html">&lt;math-field style="
    font-size: 32px; 
    margin: 3em;
    padding: 8px; 
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, .3); 
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->

The content of the mathfield is displayed using a family of high-quality 
fonts based on the original Computer Modern font from TeX. The mathfield
will not display correctly using another font. By default, the directory containing
the fonts is located next to the file containing the mathlive library.
If your bundler or asset management system require a different configuration
you can specify where the fonts can be located using the [`fontsDirectory`](http://cortexjs.io/docs/mathlive/?q=fontsDirectory) option or the `fonts-directory` attribute.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
<div slot="html">&lt;math-field fonts-directory="//unpkg.com/mathlive/dist/fonts/"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->

Note that changing the fonts directory for one mathfield will change the fonts 
used by all the other mathfield elements in the page. {.notice--warning}

Learn more about configuring the MathLive library to your environment, 
including using custom asset pipelines and bundlers in the [Getting Started Guide](/guides/mathfield-getting-started/). {.notice--info}


## CSS Variables

Some CSS variables (custom properties) can be used to modify the appearance of 
the mathfield:

* `--hue`: (0...360) default is 212 (light blue). The default colors below are derived
from this variable
* `--highlight`: color of the selected fragment of the expression, when the 
mathfield is active
* `--highlight-inactive`: selection color when the mathfield is not focused
* `--caret`: color of the caret (insertion point)
* `--primary`: accent color for some UI elements, such as the virtual keyboard toggle
* `--smart-fence-opacity`: opacity of a smart gence (default is 50%)
* `--smart-fence-color`: color of a smart fence (default is current color)
* `--text-font-family`: the font stack used in text mode

Set these CSS variables on any selector inherited by the
`math-field` tag, for example, `body`: although CSS styles are "invisible" to 
custom components, CSS variables are "passed through" and will affect the 
content of the `<math-field>` custom component. {.notice--info}


<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
    <div slot="html">&lt;math-field style="
    --hue: 53 !important;
    --caret: red !important;
"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->


## Display Options

The appearance of a formula, in an editable mathfield or as a static
representation, can be controlled with some of the following options:

### Color

**To change the foreground ("ink") and background ("paper") colors of a formula 
programmatically**, use the `applyStyle()` function.

**To change the foreground color**, use the `\textcolor{}{}` command.
**To change the background color**, use the `\colorbox{}{}` command.

  
The first argument of these commands is a color specified as:
  - a RGB color using the standard CSS format (`#d7170b`)
  - a [CSS color name](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) (`goldenrod`)
  - one of the 68 colors from [dvips color name](https://ctan.org/pkg/colordvi) (`cadetblue`)
  - one of the 10 Mathematica color from `ColorData[97, "ColorList"]` (`m0` to `m9`)
  - a color defined using the syntax from the [`xcolor` package](http://mirror.jmu.edu/pub/CTAN/macros/latex/contrib/xcolor/xcolor.pdf), for example: `blue!20!black!30!green`

The following color names are recommended. They can be applied using the color 
keys in the virtual keyboard:

![](/assets/images/mathfield/colors.png)

These colors have been carefully selected for a balanced representation of the range of 
hues on the color circle, with similar lightness and intensity. They will map to  different color values than the `dvips` colors of the same name.{.notice--info}

To have proper legibility based on usage, these color names will map to 
different values when used as a foreground color
and a background color. To use a specific color value, use a RGB color instead.{.notice--info}

**To customize how the color names are interpreted** provide a `colorMap`
or `backgroundColorMap` function.{.notice--info}


### Size

**To change the base font size**, set the `font-size` CSS property to the desired
value on the `mathfield` or static element.

Within a formula, the size can be specified from a font scale with 10 values, 
where 1 em is the base font size of the mathfield or static element.

| `fontSize`| | command | 
|------:|:------|:----|
| 1 | 0.5 em | `\tiny` | 
| 2 | 0.7 em | `\tiny` | 
| 3 | 0.8 em | `\footnotesize` | 
| 4 | 0.9 em | `\small` | 
| 5 | 1.0 em | `\normalsize` or `\normal` | 
| 6 | 1.2 em | `\large` | 
| 7 | 1.44 em | `\Large` | 
| 8 | 1.728 em | `\LARGE` | 
| 9 | 2.074 em | `\huge` | 
| 10 | 2.488 em | `\Huge` | 

In TeX, the sizing commands behave inconsistently when applied to math. 
Other implementations of TeX may also interpret the sizing commands 
differently. {.notice--warning}

### Math Layout

**To control some aspects of the math typesetting**, change the mathstyle with 
the commands `\displaystyle`, `\textstyle`, `\scriptstyle`, `\scriptscriptstyle`.

![](/assets/images/mathfield/mathstyles.png)

The `displaystyle` style is most appropriate when there is plenty of space around
the  formula. Limits over large operators, such as `\sum` are displayed above 
and below the operator. There is a generous amount of space below the numerator 
and above the denominator of fractions, and around relational (`=`) and binary
(`+`) operators.

The `textstyle` style is useful when space is constrained or when displaying
a formula with some regular text around it. The limits of large operators 
are displayed after the operator. The numerator and denominator of fractions is
displayed using a smaller font size. However, the font-size for other characters
is not affected.

The `scriptstyle` and `scriptscriptstyle` are rarely needed explicitly. The 
content is laid out using a smaller font-size (70% and 50% of the base font-size,
respectively) and the spacing between operators is minimized. Note however
that these styles are used automatically in some situations. For example,
when using the `displaystyle` or `textstyle`, the limits of a large operator
or the superscript or subscript of a symbol are displayed using these styles.
Notice for example that `n=0` in `displaystyle` does not include space around
the `=` sign because the limit is displayed in `scriptstyle`.


**To set the default mathstyle of a mathfield**, use the `defaultMode` option 
(or the `default-mode` attribute).

Set it to `inline-math` to use `textstyle` or `math` to use `displaystyle`.

By default, the mathfield element behaves as if it had a `display: block`
CSS property. To get it to behave as a inline element, set 
`display: inline-block` on the mathfield. This is particularly useful when 
used in conjunction with `default-mode="inline-math"`.


<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
  <div slot="html">The answer is &lt;math-field 
  default-mode="inline-math"
  style="
    padding-left: 5px; padding-right: 5px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .3); 
  "&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
  &lt;/math-field&gt;.
</div>
</code-playground>
<!-- htmlmin:ignore -->




### Letter Shape Style

**To control which letters are automatically italicized**, use the `letterShapeStyle` configuration option.


| `letterShapeStyle` | xyz    | ABC    | αβɣ    | ΓΔΘ   |
| -----------------: | ---    | ---    | ---    | ---   |
|              `iso` | _xyz_  | _ABC_  | _αβɣ_  | _ΓΔΘ_ |
|              `tex` | _xyz_  | _ABC_  | _αβɣ_  | ΓΔΘ   |
|           `french` | _xyz_  | ABC    | αβɣ    | ΓΔΘ   |
|          `upright` | xyz    | ABC    | αβɣ    | ΓΔΘ   |

In the [ISO](https://www.nist.gov/pml/special-publication-811) style, lower and
uppercase roman letter and lower and upper case greek letters are italicized 
when used as a variable. Mathematical constants such as \\(e\\) are written upright.

TeX has traditionally implemented a layout option that italicizes romman 
letters and lowercase greek letters, but not uppercase greek letters.

The French typographical convention is to only italicize lowercase roman letters.

The default letter shape style is `auto`: if the system locale is "french",
the `french` style is used, `tex` otherwise.


## Editing Options

Some configuration options can be specified when creating a mathfield as 
the argument of [`new MathfieldElement()`](https://cortexjs.io/docs/mathlive/#(%22mathfield-element%22%3Amodule).MathfieldElement%3Aconstructor) or as an attribute to the `&lt;math-field&gt;` element.
as we've see above with the `fontsDirectory` option.

The configuration options can also be changed programmatically using the [`setOptions()`](http://cortexjs.io/docs/mathlive/?q=%22setOptions%22) method.

Several of these configuration options affect the behavior while editing a 
formula:
* `defaultMode`: if `inline-math` the math field is using inline math mode
by default. If set to `math`, it will use the display math mode. If set to 
`text` it will use the text mode.
* `removeExtraneousParentheses`: automatically remove extra parentheses around
a numerator or denominator
* `scriptDepth`: maximum levels of subscript or superscript. Set it to 0 to 
prevent the input of superscript and subscripts
* `smartFence`: automatically convert parentheses to `\left...\right` markup.
* `smartMode`: switch to text mode when text input is detected, for example 
when typing "if x > 0"
* `smartSuperscript`: automatically move out of a superscript when a digit is typed

In the code playground below, try some of these options. For example, change
line 3 to `scriptDepth: 0`, then try to type "x^2" in the mathfield.

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
<div slot="html">&lt;math-field smart-mode&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->

See [EditingOptions](http://cortexjs.io/docs/mathlive/?q=EditingOptions) for more
details about these and other available options.


## Handling the Space bar

In traditional math typesetting, spaces have no effect: the spacing of elements
in a formula is determined by the nature of the elements: numbers, punctuation,
relational, binary or unary operators, etc...

**To control spacing in a formula**, use some of the Latex spacing commands: `\quad`,
`\qquad`, `\!`, `\,` (thin space), `\:` (medium space), `\;` (thick space), `\enskip` or `\enspace`.

By default, pressing the spacebar when in math mode does not insert anything.

**To insert a Latex command when the spacebar is pressed**, set the value of the 
`mathModeSpace` option to that command:

```js
md.setOptions({mathModeSpace: '\\:'});

```


## Localization

The user interface of the mathfield is provided in english, arabic, german, 
greek, spanish, farsi, french, italian, japanese, polish and russian.

The language to use is detected automatically, but it can be overridden by
using the `locale` option or the `locale` attribute.

Note: we `await` for the `<math-field>` definition to be loaded before
invoking the `getOptions()` method, otherwise it would not be found. {.notice--info}

<!-- htmlmin:ignore -->
<code-playground layout="stack" class="m-lg w-full-lg">
    <style slot="style">
      .output:focus-within {
        outline: Highlight auto 1px;
        outline: -webkit-focus-ring-color auto 1px
      }
      .output math-field:focus, .output math-field:focus-within {
        outline: none;
      }
    </style>
<div slot="javascript">
await window.customElements.whenDefined('math-field');
const mf = document.getElementById('formula');
const locale = mf.getOptions('locale');
console.log("Locale:", locale);
console.log(mf.getOptions().strings[locale]);
</div>
<div slot="html">&lt;math-field id='formula' virtual-keyboard-mode="manual" locale="fr"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;</div>
</code-playground>
<!-- htmlmin:ignore -->


<div class='read-more'><a href="/mathlive/guides/commands/">Next: <strong>Executing Commands</strong>: send editing commands to a mathfield<svg class="svg-chevron" ><use xlink:href="#svg-chevron"></use></svg></a></div>

