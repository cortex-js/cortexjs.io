---
layout: single
date: Last Modified
title: Customizing a Mathfield
permalink: /mathlive/guides/customizing/
read_time: false
sidebar:
    - nav: "universal"
toc: true
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.3/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive/dist/mathlive.min.mjs
---
<script>
    moduleMap = {
        mathlive: "//unpkg.com/mathlive?module",
        "html-to-image": "///assets/js/html-to-image.js",
    };
</script>

The appearance and behavior of the mathfield is highly customizable.{.xl}

Here are a few common examples.

## Styling

**To style the mathfield use the `style` attribute on the `<math-field>` 
tag or define a CSS rule targeting the mathfield.**

This can be used to modify the appearance of the mathfield in many ways, for 
example changing the base font size or adding a border around it.

**To display the mathfield as an inline element**, rather than a block element, 
use `style="display: inline-block"`

Change the style attribute in the playground below to `color: #dde; background: #256291;`.

<!-- htmlmin:ignore -->
<code-playground layout="stack" >
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


## CSS Variables

**To customize the appearance of the mathfield**, use the following CSS
variables (custom properties) in a ruleset that applies to the mathfield element.

```css
math-field {
 --hue: 10       /* Set the highlight color and caret to a reddish hue */
}
```

Alternatively you can set these CSS variables programatically:

```js
  document.body.style.setProperty("--hue", "10");
```
<div class='symbols-table' style='--first-col-width:25ex'>

| CSS Variable | Usage |
|:---|:---|
| `--caret` | Color of the caret/insertion point |
| `--contains-highlight` | Backround property for items that contain the caret |
| `--highlight` | Color of the selection |
| `--highlight-inactive` | Color of the selection, when the mathfield is not focused |
| `--hue` | Hue of the highlight color and the caret |
| `--primary` | Primary accent color, used for example in the virtual keyboard |
| `--smart-fence-color` | Color of a smart fence (default is current color) |
| `--smart-fence-opacity` | Opacity of a smart fence (default is 50%) |
| `--text-font-family` | The font stack used in text mode |

</div>
 
Set these CSS variables on any selector that applies to the
`<math-field>` element you want to customize, for example, `body`. 
Although CSS styles are "invisible" to custom components, CSS variables are 
"passed through" and will affect the content of the `<math-field>` custom component. {.notice--info}



<!-- htmlmin:ignore -->
<code-playground layout="stack" >
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
  --hue: 53;
  --caret: red;
"&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->

<br>

 You can customize the appearance and zindex of the virtual keyboard panel
 with some CSS variables associated with a selector that applies to the
virtual keyboard panel container.

Read more about [customizing the virtual keyboard appearance](https://cortexjs.io/mathlive/guides/virtual-keyboards/#custom-appearance)



## Focus Ring

**To change the appearance of the focus ring**, use the `:focus-within` pseudo-element.

<!-- htmlmin:ignore -->
<code-playground layout="stack" >
    <div slot="html">&lt;style&gt;
  math-field:focus-within {
    outline: 4px solid #d7170b;
    border-radius: 4px;
    background: rgba(251,	187,	182, .1);
  }
&lt;/style&gt;
&lt;math-field&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
&lt;/math-field&gt;
</div>
</code-playground>
<!-- htmlmin:ignore -->

**Caution** Removing outlines in CSS creates issues for people navigating the web 
with a keyboard. However, you can change the appearance of the outline,
for example to indicate an error condition. If you remove the outline on the
mathfield, make sure to replace it with another indicator, for example
by displaying an outline on an enclosing element.  {.notice--warning}




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

| `fontSize`| | LaTeX command | 
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

By default, the mathfield element is laid out on the page as a block,
that is with a `display: block` CSS property. To get it laid out as an inline 
element, set `display: inline-block` on the mathfield. To set a minimum width
for the mathfield, use the `min-width` CSS property. 

Using `inline-block` is particularly useful when used in conjunction with `default-mode="inline-math"`.


<!-- htmlmin:ignore -->
<code-playground layout="stack" >
  <div slot="html">The answer is &lt;math-field 
  default-mode="inline-math"
  style="
    display: inline-block;
    vertical-align: middle;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .3);
    padding-left: 5px; padding-right: 5px;
    min-width: 100px;
  "&gt;
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
  &lt;/math-field&gt;.
</div>
</code-playground>
<!-- htmlmin:ignore -->




### Letter Shape Style

**To control which letters are automatically italicized**, use the `letterShapeStyle` configuration option.


<div class='symbols-table'>

| `letterShapeStyle` | xyz    | ABC    | αβɣ    | ΓΔΘ   |
| :----------------- | ---    | ---    | ---    | ---   |
|              `iso` | _xyz_  | _ABC_  | _αβɣ_  | _ΓΔΘ_ |
|              `tex` | _xyz_  | _ABC_  | _αβɣ_  | ΓΔΘ   |
|           `french` | _xyz_  | ABC    | αβɣ    | ΓΔΘ   |
|          `upright` | xyz    | ABC    | αβɣ    | ΓΔΘ   |

</div>

In the [ISO](https://www.nist.gov/pml/special-publication-811) style, lower and
uppercase roman letter and lower and upper case greek letters are italicized 
when used as a variable. Mathematical constants such as \\(e\\) are written upright.

TeX has traditionally implemented a layout option that italicizes romman 
letters and lowercase greek letters, but not uppercase greek letters.

The French typographical convention is to only italicize lowercase roman letters.

The default letter shape style is `auto`: if the system locale is "french",
the `french` style is used, `tex` otherwise.



<section id='editing-options'>


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
<code-playground layout="stack" >
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

<br>

{% readmore "/docs/mathlive/?q=EditingOptions" %}
See `EditionOptions` for more
details about these and other available options
{% endreadmore %}


</section>


<section id='space-bar'>

## Handling the Space Bar

In traditional math typesetting, spaces have no effect: the spacing of elements
in a formula is determined by the nature of the elements: numbers, punctuation,
relational, binary or unary operators, etc...

**To control spacing in a formula**, use some of the LaTeX spacing commands: `\quad`,
`\qquad`, `\!`, `\,` (thin space), `\:` (medium space), `\;` (thick space), `\enskip` or `\enspace`.

By default, pressing the spacebar when in math mode does not insert anything.

**To insert a LaTeX command when the spacebar is pressed**, set the value of the 
`mathModeSpace` option to that command:

```js
md.setOptions({mathModeSpace: '\\:'});

```

</section>

<section id='localization'>

## Localization

The user interface of the mathfield is provided in english, arabic, german, 
greek, spanish, farsi, french, italian, japanese, polish and russian.

The language to use is detected automatically, but it can be overridden by
using the `locale` option or the `locale` attribute.

**Note:** we `await` for the `<math-field>` definition to be loaded before
invoking the `getOptions()` method, otherwise it would not be found. {.notice--info}

<!-- htmlmin:ignore -->
<code-playground layout="stack">
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

</section>

## Fonts

The content of the mathfield is displayed using a family of high-quality 
fonts based on the original Computer Modern font from TeX. The mathfield
will not display correctly using another font. 

By default, the directory containing
the fonts is located next to the file containing the mathlive library.
If your bundler or asset management system require a different configuration
you can specify where the fonts can be located using the [`fontsDirectory`](http://cortexjs.io/docs/mathlive/?q=fontsDirectory) option or the `fonts-directory` attribute.

<!-- htmlmin:ignore -->
<code-playground layout="stack">
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

**Note:** changing the fonts directory for one mathfield will change the fonts 
used by all the other mathfield elements in the page. {.notice--warning}

{% readmore "/mathlive/guides/integration/" %}
Learn more about configuring the MathLive library to your environment, including using custom asset pipelines and bundlers, in the <strong>integration guide</strong>
{% endreadmore %}




{% readmore "/mathlive/guides/commands/" %}
**Next:** <strong>Executing Commands</strong>: send editing commands to a mathfield
{% endreadmore %}

