---
title: Colors Reference
sidebar_label: Colors
slug: /reference/colors/
description: "The colors library of Epsil: every definition with its Epsil spelling, MathJSON name, signature, and full description."
hide_title: true
date: Last Modified
# GENERATED FILE — do not edit. The entries come from the library
# definitions (src/compute-engine/library/) as `epsil doc` describes them;
# the introduction comes from colors.intro.md when that file exists.
# Regenerate with `npm run doc` (scripts/build-library-reference.ts).
---
# Colors

The 20 definitions of the colors library, each with its Epsil spelling, its MathJSON name, its signature and its full description.

## Definitions

Each definition is listed under its Epsil spelling (the MathJSON name when
it has none), with its signature in the engine's type syntax. The
[Standard Library](/library/) page is the one-page index of every
category.

### asHsl

`(color | string | tuple) -> color`

Convert any color to HSL (hue degrees, s/l 0-1)

<MathJson name="AsHsl" latex={["\\operatorname{asHsl}"]} />

### asHsv

`(color | string | tuple) -> color`

Convert any color to HSV (hue degrees, s/v 0-1)

<MathJson name="AsHsv" latex={["\\operatorname{asHsv}"]} />

### asOklab

`(color | string | tuple) -> color`

Convert any color to OKLab

<MathJson name="AsOklab" latex={["\\operatorname{asOklab}"]} />

### asOklch

`(color | string | tuple) -> color`

Convert any color to OKLCh

<MathJson name="AsOklch" latex={["\\operatorname{asOklch}"]} />

### asRgb

`(color | string | tuple) -> color`

Convert any color to sRGB (channels 0-1)

<MathJson name="AsRgb" latex={["\\operatorname{asRgb}"]} />

### color

`(string) -> color`

Parse a CSS-style color string to an Oklch color

The result is an `oklch` color with three or four channels: the lightness L
(0 to 1), the chroma C, the hue H in degrees, and an optional alpha (0 to
1). `asRgb` gives its sRGB channels, and `colorToString` its hex string.

```epsil
color("#f00")
// ➔ Oklch(0.6279553606145515, 0.25768330773615683, 29.2338851923426)
[asRgb(color("#f00")), colorToString(color("#f00"))]
// ➔ [Rgb(1, 0, 0),"#ff0000"]
```

The string is one of:

- a hex color: `#rgb`, `#rrggbb` or `#rrggbbaa` (`"#f00"`, `"#ff0000"`,
  `"#ff000080"`);
- an RGB color: `rgb(r, g, b)` or `rgba(r, g, b, a)`
  (`"rgba(255, 0, 0, 0.5)"`);
- an HSL color: `hsl(h, s%, l%)` or `hsla(h, s%, l%, a)`
  (`"hsl(0, 100%, 50%)"`);
- an OKLCh color: `oklch(l% c h)` or `oklch(l% c h / a)`
  (`"oklch(50% 0.3 240)"`);
- a named color (see below), or `"transparent"`.

The string is read as an sRGB color with 8 bits for each channel, so an
alpha of `0.5` is read as `128/255`, about `0.502`:

```epsil
colorToColorspace(color("rgba(255, 0, 0, 0.5)"), "rgb")
// ➔ (1, 0, 0, 0.5019607843137255)
```

An `oklch(…)` string is read the same way, so it does not keep a chroma or
a hue that is outside the sRGB gamut. To make an exact OKLCh color, call
`oklch`:

```epsil
colorToColorspace(color("oklch(50% 0.3 240)"), "oklch")
// ➔ (0.5082817193854438, 0.13074461492928197, 246.0140197777198)
oklch(0.5, 0.3, 240)
// ➔ Oklch(0.5, 0.3, 240)
```

A string that is not a color is an `incompatible-type` error.

#### Named colors

The names are not those of CSS: `red` is `#d7170b`, and `gray` and `pink`
are not names. Case is ignored.

```epsil
[colorToString(color("red")), colorToString(color("midnight"))]
// ➔ ["#d7170b","#2c4670"]
```

| Color Name | Swatch | Color Name | Swatch |
| :--- | :--- | :--- | :--- |
| `red` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#d7170b', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `orange` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#fe8a2b', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `yellow` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#ffc02b', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `lime` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#63b215', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `green` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#21ba3a', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `teal` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#17cfcf', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `cyan` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#13a7ec', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `blue` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#0d80f2', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `indigo` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#63c', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `purple` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#a219e6', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `magenta` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#eb4799', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `black` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#000', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `white` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `dark-grey` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#666', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `grey` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#A6A6A6', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `light-grey` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#d4d5d2', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `brown` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#8c564b', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `olive` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#8a8f2a', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `midnight` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#2c4670', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `sky` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#d2dce9', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `carbon` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#111111', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `charcoal` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#333333', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `slate` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#555555', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `graphite` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#777777', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `stone` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#999999', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `ash` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#E6E6E6', border: '1px solid #ccc', borderRadius: '3px'}}></div> |
| `mist` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#F3F3F3', border: '1px solid #ccc', borderRadius: '3px'}}></div> | `snow` | <div style={{display: 'inline-block', width: '20px', height: '20px', backgroundColor: '#FFFFFF', border: '1px solid #ccc', borderRadius: '3px'}}></div> |

<MathJson name="Color">

`["Color", string]`. The result is an `Oklch` expression.

```json example
["Color", "'#f00'"]
// ➔ ["Oklch", 0.628, 0.258, 29.234]
["Color", "'rgba(255, 0, 0, 0.5)'"]
// ➔ ["Oklch", 0.628, 0.258, 29.234, 0.502]
["Color", "'red'"]
// ➔ ["Oklch", 0.559, 0.22, 29.619]
["AsRgb", ["Color", "'red'"]]
// ➔ ["Rgb", 0.843, 0.09, 0.043]
```

</MathJson>

### colorContrast

MathJSON `ColorContrast` · `(color | string | tuple, color | string | tuple) -> number`

APCA contrast ratio between two colors

### colorDelta

`(color | string | tuple, color | string | tuple) -> number`

Perceptual color difference (ΔE_OK) between two colors

<MathJson name="ColorDelta" latex={["\\operatorname{colorDelta}"]} />

### colorFromColorspace

`(color | tuple, string) -> color`

Build a color from channel values in a named color space. The result is a color on every route — the color head of the named space when evaluated, the target's color value when compiled. To read the channels back out, call ColorToColorspace(color, space)

The result is the color of the named space: `rgb`, `hsl`, `hsv`, `oklch` or
`oklab`, with an alpha when the tuple has a fourth component. The color
space names are those of [`colorToColorspace`](#colortocolorspace).

```epsil
colorFromColorspace((0, 1, 0.5), "hsl")
// ➔ Hsl(0, 1, 0.5)
[asRgb(colorFromColorspace((0, 1, 0.5), "hsl")), colorFromColorspace((1, 0, 0, 0.5), "rgb")]
// ➔ [Rgb(1, 0, 0),Rgb(1, 0, 0, 0.5)]
```

<MathJson name="ColorFromColorspace">

`["ColorFromColorspace", components, space]`. The result is an `Rgb`,
`Hsl`, `Hsv`, `Oklch` or `Oklab` expression.

```json example
["ColorFromColorspace", ["Tuple", 0, 1, 0.5], "'hsl'"]
// ➔ ["Hsl", 0, 1, 0.5]
["AsRgb", ["ColorFromColorspace", ["Tuple", 0, 1, 0.5], "'hsl'"]]
// ➔ ["Rgb", 1, 0, 0]
```

</MathJson>

### colorMix

MathJSON `ColorMix` · `(color | string | tuple, color | string | tuple, number?) -> color`

Mix two colors in OKLCh space

### colorToColorspace

`(color | string | tuple, string) -> tuple`

Convert a color to components in a target color space

The color space is `"rgb"`, `"hsl"`, `"hsv"`, `"oklch"` or `"oklab"`
(`"lab"` is the same as `"oklab"`); case is ignored. The color is a color
value, a color string or a tuple of sRGB channels. The result is a tuple,
with a fourth component for an alpha other than 1.

```epsil
[colorToColorspace("#f00", "hsl"), colorToColorspace("#f00", "hsv")]
// ➔ [(0, 1, 0.5),(0, 1, 1)]
colorToColorspace("#f00", "oklab")
// ➔ (0.6279553606145515, 0.22486306106597417, 0.12584629853073503)
```

An sRGB channel outside [0, 1] is extended sRGB: it describes a color
outside the sRGB gamut, which a Display-P3 display can show. The
conversions among `rgb`, `oklab` and `oklch` keep it:

```epsil
let c = colorToColorspace(rgb(1.2, 0, 0), "oklch")
asRgb(colorFromColorspace(c, "oklch"))
// ➔ Rgb(1.2000000000000004, 0, 0)
```

HSV and HSL describe only the sRGB gamut. Their saturation, value and
lightness are clamped to [0, 1], and an infinite one reads as its bound. An
extended sRGB color is first mapped into the sRGB gamut, as
[`gamutMap`](#gamutmap) maps it: the OKLCh chroma is reduced at constant
lightness and hue. The channels are not clipped one by one, so the HSL hue
of `rgb(1.2, 0, 0)` is not 0:

```epsil
colorToColorspace(rgb(1.2, 0, 0), "hsl")
// ➔ (6.455435134724467, 1, 0.6695605539773027)
colorToColorspace(hsl(0, oo, 0.5), "rgb")
// ➔ (1, 0, 0)
```

A `NaN` channel, an infinite hue, and an infinite sRGB, OKLab or OKLCh
channel are an `incompatible-type` error. An unknown color space is an
`expected-value` error.

<MathJson name="ColorToColorspace">

`["ColorToColorspace", color, space]`. The result is a `Tuple`.

```json example
["ColorToColorspace", "'#f00'", "'hsl'"]
// ➔ ["Tuple", 0, 1, 0.5]
```

</MathJson>

### colorToString

MathJSON `ColorToString` · `(color | string | tuple, string?) -> string`

Convert a color to a string in the specified format: "hex" (the default), "rgb", "hsl", "oklch", "srgb" (the same as "hex") or "display-p3" (the CSS spelling `color(display-p3 r g b)`). The hex, rgb, hsl and srgb formats map the color into the sRGB gamut, and display-p3 maps it into the Display-P3 gamut, with the CSS Color 4 gamut mapping: the OKLCh chroma is reduced at constant lightness and hue. The channels are not clipped one by one. The oklch format has no gamut and is not mapped

### colormap

`(string, number?) -> color | list<color>`

Sample colors from a named palette

- With only a name, the result is the list of the colors of the palette.
- With an integer `n` of 2 or more, it is a list of `n` colors at evenly
  spaced positions, from the first color of the palette to the last.
- With a number `t` between 0 and 1, it is the color at position `t`. A
  position below 0 is read as 0, and one above 1 as 1.

Between two colors of the palette, the color is interpolated in OKLCh. This
applies to the categorical palettes too: `colormap("tycho11", 3)` is the
first, middle and last colors, not the first three.

```epsil
map(colorToString, colormap("viridis", 3))
// ➔ ["#440154","#21918d","#fde725"]
colorToString(colormap("viridis", 0.5))
// ➔ "#21918d"
map(colorToString, colormap("tycho11", 3))
// ➔ ["#4e79a7","#9c755f","#c07bc4"]
count(colormap("tycho11"))
// ➔ 11
```

An unknown palette name is an `expected-value` error. A request for more
than 10,000 colors stays unevaluated.

#### Available palettes

##### Sequential

These palettes are perceptually uniform, for ordered data. Each one also has
a `-reversed` variant (`viridis-reversed`).

| Name | |
| :--- | :--- |
| `viridis` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #440154, #482475, #414487, #355f8d, #2a788e, #21908d, #22a884, #42be71, #7ad151, #bddf26, #fde725)'}} /> |
| `inferno` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #000004, #1b0c41, #4a0c6b, #781c6d, #a52c60, #cf4446, #ed6925, #fb9b06, #f7d13d, #fcffa4)'}} /> |
| `magma` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #000004, #1c1044, #491078, #792282, #a3307e, #cd4071, #f1605d, #fd9668, #fde3a5, #fcfdbf)'}} /> |
| `plasma` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #0d0887, #4b03a1, #7d03a8, #a41e9a, #c43e7f, #df6263, #f58c46, #fbbe23, #f0f921)'}} /> |
| `turbo` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #30123b, #434eba, #4687fb, #22c5e2, #18e0bd, #65fd69, #acfb38, #e7d739, #fd8d27, #a41301, #7a0403)'}} /> |
| `cividis` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #00204d, #00336f, #31446b, #545a6c, #757575, #979178, #bbae6f, #d7c463, #f6dd4d, #ffea46)'}} /> |
| `rocket` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #03051a, #31183b, #591e50, #821e5a, #ab185a, #d11f4c, #ef5640, #f6a67e, #faebdd)'}} /> |
| `mako` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #0b0405, #211423, #342447, #3b2e5d, #403b78, #414488, #3d5296, #366fa0, #3490a8, #3bafad)'}} /> |
| `grey` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #000000, #ffffff)'}} /> |
| `cmocean-phase` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #a8780d, #c75f35, #db4066, #dc25ad, #c041e5, #9168f4, #5285dc, #2093ac, #0c987c, #409839, #8b860d, #9b7f0d)'}} /> |

##### Diverging

These palettes are symmetric around a neutral midpoint. Each one also has a
`-reversed` variant (`roma-reversed`).

| Name | |
| :--- | :--- |
| `roma` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #033198, #81d7d7, #ffffff, #d2d17e, #7e1700)'}} /> |
| `rdbu` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #053061, #2166ac, #4393c3, #92c5de, #d1e5f0, #f7f7f7, #fddbc7, #f4a582, #d6604d, #b2182b, #67001f)'}} /> |
| `coolwarm` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #3b4cc0, #6788ee, #9abbff, #c9d8ef, #edd1d2, #f7a789, #e26952, #b40426)'}} /> |
| `vik` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #0b3c78, #9bc7e4, #f7f7f7, #e88fa0, #5a0c2e)'}} /> |
| `broc` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #2c557f, #b5cfe3, #f7f7f7, #e4b0b0, #6b1a2b)'}} /> |

##### Categorical

These palettes are for discrete categories with no order. They have no
`-reversed` variant.

| Name | |
| :--- | :--- |
| `tycho11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4e79a7', '#f28e2b', '#59a14f', '#e15759', '#b07aa1', '#9c755f', '#ff9da7', '#edc948', '#76b7b2', '#6b8fd6', '#c07bc4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Default categorical palette. Provides very good perceptual separation for up to 8 colors.</small></div> |
| `tycho-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#78a6d9', '#ffae54', '#7ddc7a', '#ff7a7a', '#d29be0', '#c49a84', '#ffb3bf', '#ffe066', '#7fd6d0', '#8fb4ff', '#e199eb'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>A variant of Tycho 11 optimized for dark backgrounds.</small></div> |
| `tycho-robust11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4e79a7', '#f28e2b', '#2ca58d', '#d13a3c', '#b07aa1', '#9c755f', '#ff9da7', '#e3c13b', '#5fb8b2', '#6b8fd6', '#c07bc4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Reinforced variant that improves separability under color vision deficiency and low-contrast environments.</small></div> |
| `tycho-soft11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#8fb1d4', '#f6b878', '#8ecf86', '#f08a8b', '#d3a9cc', '#c3a492', '#ffc6cc', '#f3e08a', '#a8d8d4', '#a9c0ea', '#e0b4e4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Low-contrast palette with soft tones, for filled areas and dashboards. Less suitable for thin lines.</small></div> |
| `tycho-soft-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#78a6d9', '#ffae54', '#7ddc7a', '#ff7a7a', '#d29be0', '#c49a84', '#ffb3bf', '#ffe066', '#7fd6d0', '#8fb4ff', '#e199eb'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Soft-contrast palette for charcoal backgrounds, for both lines and filled surfaces.</small></div> |
| `tycho-bold11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#2f6fb0', '#ff7a00', '#2fa23a', '#e02f2f', '#9b4db5', '#7f4f38', '#ff6f86', '#f2c200', '#2daaa3', '#4c79e0', '#b84ac6'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>High-contrast palette with strong separation, for thin lines and dense line charts.</small></div> |
| `tycho-bold-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4f93ff', '#ff8c1a', '#33c94a', '#ff4f4f', '#b86bff', '#a86a4a', '#ff7f9e', '#ffd400', '#2ec9c1', '#6f9bff', '#cc5bd9'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>High-contrast palette for dark backgrounds, for thin strokes.</small></div> |
| `tableau10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'].map(c => <div key={c} style={{display: 'inline-block', width: '30px', height: '32px', backgroundColor: c}} />)}<br/><small>The Tableau 10 palette, also the default of Matplotlib.</small></div> |
| `mathematica10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#5E81B5', '#E19C24', '#8FB131', '#EB6235', '#8778B3', '#C56E1A', '#5E9EC9', '#B23A3A', '#4C9F70', '#C979B7'].map(c => <div key={c} style={{display: 'inline-block', width: '30px', height: '32px', backgroundColor: c}} />)}<br/><small>Palette inspired by the default colors of Wolfram Mathematica.</small></div> |
| `cupertino10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#007AFF', '#FF9500', '#34C759', '#FF3B30', '#AF52DE', '#FF2D55', '#30B0C7', '#5856D6', '#A2845E', '#32ADE6', '#00C7BE'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Apple system palette for light appearance (11 colors).</small></div> |
| `cupertino-dark10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#0A84FF', '#FF9F0A', '#30D158', '#FF453A', '#BF5AF2', '#FF375F', '#40C8E0', '#5E5CE6', '#AC8E68', '#64D2FF', '#00D1C1'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Apple system palette for dark appearance (11 colors).</small></div> |
| `kelly22` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#fdfdfd', '#1d1d1d', '#ebce2b', '#702c8c', '#db6917', '#96cde6', '#ba1c30', '#c0bd7f', '#7f7e80', '#5fa641', '#d485b2', '#4277b6', '#df8461', '#463397', '#e1a11a', '#91218c', '#e8e948', '#7e1510', '#92ae31', '#6f340d', '#d32b1e', '#2b3514'].map(c => <div key={c} style={{display: 'inline-block', width: '13.6px', height: '32px', backgroundColor: c}} />)}<br/><small>22 colors of maximum contrast, for data with many categories.</small></div> |
| `spectrum12` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4148cc', '#db3c80', '#12b5b0', '#ff8c14', '#848aff', '#78e16e', '#1e78f0', '#ebcd00', '#beeb3c', '#7828d2', '#cd5f00', '#00915f'].map(c => <div key={c} style={{display: 'inline-block', width: '25px', height: '32px', backgroundColor: c}} />)}<br/><small>12 colors across the visible spectrum.</small></div> |

<MathJson name="Colormap">

`["Colormap", name]`, `["Colormap", name, n]`, `["Colormap", name, t]`.
The name is a string.

```json example
["Colormap", "'viridis'", 5]
["Colormap", "'viridis'", 0.5]
```

</MathJson>

### contrastingColor

MathJSON `ContrastingColor` · `(color | string | tuple, (color | string | tuple)?, (color | string | tuple)?) -> color`

Choose the foreground color with better APCA contrast against a background, answered as given: the interpreter keeps the color head the candidate was written with, and a compiled target answers the same color in its canonical form

### gamutMap

MathJSON `GamutMap` · `(color | string | tuple, string?) -> color`

Map a color into a target gamut, "srgb" (the default) or "display-p3", with the CSS Color 4 gamut-mapping algorithm: the OKLCh chroma is reduced, at constant lightness and hue, until the color is inside the gamut or until clipping each channel changes the color by less than a just noticeable difference (ΔE_OK 0.02). A lightness of 1 or more gives white, and 0 or less gives black. A color already inside the gamut is returned unchanged. The result is an Rgb color, in sRGB coordinates also for "display-p3": its channels are in [0, 1] for "srgb", and for "display-p3" they can be outside [0, 1] (extended sRGB) for a color that is inside the Display-P3 gamut but outside the sRGB gamut. Color values themselves have no gamut: only this operator and the string output map a color

### hsl

`(number, number, number, number?) -> color`

HSL color (hue degrees, saturation/lightness 0-1, optional alpha)

<MathJson name="Hsl" latex={["\\operatorname{hsl}"]} />

### hsv

`(number, number, number, number?) -> color`

HSV color (hue degrees, saturation/value 0-1, optional alpha)

<MathJson name="Hsv" latex={["\\operatorname{hsv}"]} />

### oklab

`(number, number, number, number?) -> color`

OKLab color (L 0-1, a/b ~ -0.4..0.4, optional alpha)

<MathJson name="Oklab" latex={["\\operatorname{oklab}"]} />

### oklch

`(number, number, number, number?) -> color`

OKLCh color (L 0-1, C 0-~0.4, hue degrees, optional alpha)

<MathJson name="Oklch" latex={["\\operatorname{oklch}"]} />

### rgb

`(number, number, number, number?) -> color`

sRGB color (channels 0-1, optional alpha 0-1)

<MathJson name="Rgb" latex={["\\operatorname{rgb}"]} />
