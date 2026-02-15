---
title: Colors
slug: /compute-engine/reference/colors/
date: Last Modified
---

<Intro>
The Colors library provides operators for parsing color strings, sampling
visualization palettes, and converting between color spaces. Colors are
represented as `Tuple` expressions with 3 or 4 sRGB components normalized
to 0-1.
</Intro>

## Color

<FunctionDefinition name="Color">

<Signature name="Color">_color-string_</Signature>

Parse a color string and return a canonical sRGB `Tuple`.

Supported input formats:

| Format | Example |
| :----- | :------ |
| Hex 6-digit | `#ff6600` |
| Hex 3-digit | `#f60` |
| Hex 8-digit (with alpha) | `#ff660080` |
| `rgb()` | `rgb(255, 102, 0)` |
| `hsl()` | `hsl(24, 100%, 50%)` |
| Named color | `red`, `blue` |
| `transparent` | `transparent` |

```json example
["Color", "'#ff0000'"]
// → ["Tuple", 1, 0, 0]

["Color", "'rgb(0, 128, 255)'"]
// → ["Tuple", 0, 0.502, 1]

["Color", "'transparent'"]
// → ["Tuple", 0, 0, 0, 0]

["Color", "'hsl(120, 100%, 50%)'"]
// → ["Tuple", 0, 1, 0]
```

Returns an `Error` if the input string is not a recognized color format.

</FunctionDefinition>


## ColorToString

<FunctionDefinition name="ColorToString">

<Signature name="ColorToString">_color_</Signature>

<Signature name="ColorToString">_color_, _format_</Signature>

Convert a color to a string representation. The _color_ argument can be a color
string (same formats as `Color`) or an sRGB `Tuple`.

The optional _format_ argument controls the output format:

| Format | Output | Example |
| :----- | :----- | :------ |
| `"hex"` (default) | `#rrggbb` or `#rrggbbaa` | `#ff0000` |
| `"rgb"` | CSS `rgb()` syntax | `rgb(255 0 0)` |
| `"hsl"` | CSS `hsl()` syntax | `hsl(0 100% 50%)` |
| `"oklch"` | CSS `oklch()` syntax | `oklch(0.628 0.258 29.2)` |

Alpha is included when not equal to 1 (e.g., `rgb(255 0 0 / 0.5)`).

```json example
["ColorToString", "'#ff0000'"]
// → "'#ff0000'"

["ColorToString", ["Tuple", 0, 1, 0]]
// → "'#00ff00'"

["ColorToString", "'#ff0000'", "'rgb'"]
// → "'rgb(255 0 0)'"

["ColorToString", "'#ff0000'", "'oklch'"]
// → "'oklch(0.628 0.258 29.2)'"
```

</FunctionDefinition>


## ColorMix

<FunctionDefinition name="ColorMix">

<Signature name="ColorMix">_color1_, _color2_</Signature>

<Signature name="ColorMix">_color1_, _color2_, _ratio_</Signature>

Blend two colors in OKLCh perceptual color space. Each color argument can be a
color string or an sRGB `Tuple`.

The optional _ratio_ controls the blend position: 0 returns the first color,
1 returns the second, and 0.5 (default) is an equal mix. Values outside [0, 1]
are clamped.

Interpolation uses linear blending for lightness and chroma, and shorter-arc
interpolation for hue. Alpha channels are interpolated linearly.

```json example
["ColorMix", "'#ff0000'", "'#0000ff'"]
// → ["Tuple", ...]  (equal mix of red and blue in OKLCh)

["ColorMix", "'#ff0000'", "'#0000ff'", 0]
// → ["Tuple", 1, 0, 0]  (pure red)

["ColorMix", "'white'", "'black'", 0.5]
// → ["Tuple", ...]  (perceptual midpoint gray)
```

</FunctionDefinition>


## ColorContrast

<FunctionDefinition name="ColorContrast">

<Signature name="ColorContrast">_background_, _foreground_</Signature>

Compute the APCA (Accessible Perceptual Contrast Algorithm) contrast ratio
between two colors. The first argument is the background color, the second is
the foreground (text) color. Each can be a color string or an sRGB `Tuple`.

APCA is asymmetric: swapping background and foreground gives a different result.
Positive values indicate dark text on a light background; negative values
indicate light text on a dark background.

```json example
["ColorContrast", "'#ffffff'", "'#000000'"]
// → 1.086  (black text on white background)

["ColorContrast", "'#000000'", "'#ffffff'"]
// → -1.086  (white text on black background)

["ColorContrast", "'#808080'", "'#808080'"]
// → 0  (no contrast)
```

</FunctionDefinition>


## ContrastingColor

<FunctionDefinition name="ContrastingColor">

<Signature name="ContrastingColor">_background_</Signature>

<Signature name="ContrastingColor">_background_, _foreground1_, _foreground2_</Signature>

Choose the foreground color with better APCA contrast against a background.
Each argument can be a color string or an sRGB `Tuple`.

With one argument, picks between white (`#ffffff`) and black (`#000000`).
With three arguments, picks the better of the two foreground candidates.

Returns the chosen color as a canonical sRGB `Tuple`.

```json example
["ContrastingColor", "'#ffffff'"]
// → ["Tuple", 0, 0, 0]  (black text on white background)

["ContrastingColor", "'#000000'"]
// → ["Tuple", 1, 1, 1]  (white text on black background)

["ContrastingColor", "'#336699'", "'#ffffff'", "'#ffff00'"]
// → ["Tuple", 1, 1, 1]  (white has better contrast on this blue)
```

</FunctionDefinition>


## Colormap

<FunctionDefinition name="Colormap">

<Signature name="Colormap">_palette-name_</Signature>

<Signature name="Colormap">_palette-name_, _n_</Signature>

<Signature name="Colormap">_palette-name_, _t_</Signature>

Sample colors from a named visualization palette. The behavior depends on the
second argument:

- **No second argument**: return the full palette as a `List` of sRGB `Tuple`
  values.
- **Integer _n_ (>= 2)**: resample the palette to exactly _n_ evenly spaced
  colors.
- **Real _t_ in [0, 1]**: interpolate the palette at position _t_ using OKLCh
  color space with shorter-arc hue interpolation. Returns a single `Tuple`.

Values of _t_ outside [0, 1] are clamped.

```json example
["Colormap", "'viridis'"]
// → ["List", ["Tuple", ...], ["Tuple", ...], ...]
//   (full palette, 256 colors)

["Colormap", "'viridis'", 5]
// → ["List", ["Tuple", ...], ..., ["Tuple", ...]]
//   (5 evenly spaced colors)

["Colormap", "'viridis'", 0.5]
// → ["Tuple", 0.127, 0.567, 0.551]
//   (interpolated color at midpoint)
```

### Available Palettes

**Sequential** (256 stops, perceptually uniform):

| Name | Description |
| :--- | :---------- |
| `viridis` | Purple to yellow-green (colorblind-safe) |
| `inferno` | Black to yellow through red |
| `magma` | Black to light pink through purple |
| `plasma` | Purple to yellow |
| `cividis` | Blue to yellow (colorblind-optimized) |
| `turbo` | Rainbow-like (improved jet) |
| `rocket` | Dark to light warm tones |
| `mako` | Blue to teal |

**Categorical** (discrete, distinct colors):

| Name | Colors | Description |
| :--- | :----- | :---------- |
| `graph6` | 6 | Default graph palette |
| `spectrum6` | 6 | Spectrum-based |
| `spectrum12` | 12 | Extended spectrum |
| `tableau10` | 10 | Tableau classic |
| `tycho11` | 11 | High-contrast |
| `kelly22` | 22 | Kelly's maximum contrast |

**Diverging** (256 stops, symmetric around midpoint):

| Name | Description |
| :--- | :---------- |
| `roma` | Blue to red-orange |
| `roma-reversed` | Reversed roma |
| `vik` | Blue to red through white |
| `vik-reversed` | Reversed vik |
| `broc` | Green to brown |
| `broc-reversed` | Reversed broc |
| `rdbu` | Red to blue |
| `rdbu-reversed` | Reversed rdbu |
| `coolwarm` | Cool blue to warm red |
| `coolwarm-reversed` | Reversed coolwarm |
| `ocean-balance` | Dark teal to dark red |
| `ocean-balance-reversed` | Reversed ocean-balance |

Returns an `Error` if the palette name is not recognized.

</FunctionDefinition>


## ColorToColorspace

<FunctionDefinition name="ColorToColorspace">

<Signature name="ColorToColorspace">_color_, _space_</Signature>

Convert a color to components in the target color space. The _color_ argument
can be a color string (same formats as `Color`) or an sRGB `Tuple`.

Supported color spaces:

| Space | Components | Range |
| :---- | :--------- | :---- |
| `"rgb"` | red, green, blue | 0-1 each |
| `"hsl"` | hue, saturation, lightness | H: 0-360, S/L: 0-1 |
| `"oklch"` | lightness, chroma, hue | L: 0-1, C: 0-0.4, H: 0-360 |
| `"oklab"` or `"lab"` | lightness, a, b | L: 0-1, a/b: approx -0.4 to 0.4 |

Returns a `Tuple` with 3 components, or 4 if the input has an alpha channel.

```json example
["ColorToColorspace", "'#ff0000'", "'oklch'"]
// → ["Tuple", 0.628, 0.258, 29.23]

["ColorToColorspace", "'#3366cc'", "'hsl'"]
// → ["Tuple", 220, 0.6, 0.5]

["ColorToColorspace", ["Tuple", 1, 0, 0], "'oklab'"]
// → ["Tuple", 0.628, 0.225, 0.126]
```

</FunctionDefinition>


## ColorFromColorspace

<FunctionDefinition name="ColorFromColorspace">

<Signature name="ColorFromColorspace">_components_, _space_</Signature>

Convert color space components back to a canonical sRGB `Tuple`. The
_components_ argument is a `Tuple` of 3 or 4 values in the source color space.
The _space_ argument accepts the same values as `ColorToColorspace`.

Out-of-gamut values are clamped to the sRGB range.

```json example
["ColorFromColorspace", ["Tuple", 0.6, 0.26, 29], "'oklch'"]
// → ["Tuple", 0.918, 0.155, 0.039]

["ColorFromColorspace", ["Tuple", 0, 1, 0.5], "'hsl'"]
// → ["Tuple", 1, 0, 0]

["ColorFromColorspace", ["Tuple", 0.628, 0.225, 0.126], "'lab'"]
// → ["Tuple", 1, 0, 0]
```

A roundtrip is exact within floating-point precision:

```json example
// Convert to OKLCh and back
["ColorFromColorspace",
  ["ColorToColorspace", "'#3366cc'", "'oklch'"],
  "'oklch'"]
// ≈ ["Color", "'#3366cc'"]
```

</FunctionDefinition>
