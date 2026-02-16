---
title: Colors
slug: /compute-engine/reference/colors/
---

<Intro>
The **colors** library provides functions for color manipulation, 
color space conversion, and color palettes.
</Intro>

## Functions

<nav className="hidden">
### Color
</nav>
<FunctionDefinition name="Color">

<Signature name="Color">_input: string_</Signature>

Convert a color string or named color into a canonical sRGB tuple.

The output is a tuple of 3 or 4 numbers between 0 and 1, representing
the red, green, blue, and optional alpha components.

Supports various formats:
- **Hex**: `#rgb`, `#rrggbb`, `#rrggbbaa` (e.g. `'#f00'`, `'#ff0000'`, `'#ff000080'`)
- **RGB/RGBA**: `rgb(r, g, b)`, `rgba(r, g, b, a)` (e.g. `'rgb(255, 0, 0)'`, `'rgba(255, 0, 0, 0.5)'`)
- **HSL**: `hsl(h, s%, l%)`, `hsla(h, s%, l%, a)` (e.g. `'hsl(0, 100%, 50%)'`)
- **OKLCH**: `oklch(l%, c, h)`, `oklch(l%, c, h / a)` (e.g. `'oklch(50% 0.3 240)'`)
- **Named colors**: From the `NAMED_COLORS` palette (see below)

```json example
["Color", "'#f00'"]
// ➔ ["Tuple", 1, 0, 0]

["Color", "'rgba(255, 0, 0, 0.5)'"]
// ➔ ["Tuple", 1, 0, 0, 0.5]

["Color", "'red'"]
// ➔ ["Tuple", 0.843, 0.09, 0.043]

["Color", "'blue'"]
// ➔ ["Tuple", 0.051, 0.502, 0.949]
```

### Named Colors

The `Color` function supports a comprehensive palette of named colors from the `NAMED_COLORS` object:

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

</FunctionDefinition>


<nav className="hidden">
### Colormap
</nav>
<FunctionDefinition name="Colormap">

<Signature name="Colormap">_name: string_</Signature>
<Signature name="Colormap">_name: string_, _n: number_</Signature>
<Signature name="Colormap">_name: string_, _t: number_</Signature>

Sample colors from a named palette.

- If only a name is provided, returns the full list of colors in the palette.
- If an integer `n` ≥ 2 is provided, returns `n` evenly-spaced colors.
- If a real number `t` between 0 and 1 is provided, returns the color at position `t`.

```json example
["Colormap", "'viridis'", 5]
```

### Available Palettes

#### Sequential
These palettes are perceptually uniform and suitable for ordered data.

Each sequential palette also has a `-reversed` variant (e.g., `viridis-reversed`).

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

#### Diverging
These palettes are symmetric around a neutral midpoint.

Each diverging palette also has a `-reversed` variant (e.g., `roma-reversed`).

| Name | |
| :--- | :--- |
| `roma` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #033198, #81d7d7, #ffffff, #d2d17e, #7e1700)'}} /> |
| `rdbu` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #053061, #2166ac, #4393c3, #92c5de, #d1e5f0, #f7f7f7, #fddbc7, #f4a582, #d6604d, #b2182b, #67001f)'}} /> |
| `coolwarm` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #3b4cc0, #6788ee, #9abbff, #c9d8ef, #edd1d2, #f7a789, #e26952, #b40426)'}} /> |
| `vik` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #0b3c78, #9bc7e4, #f7f7f7, #e88fa0, #5a0c2e)'}} /> |
| `broc` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #2c557f, #b5cfe3, #f7f7f7, #e4b0b0, #6b1a2b)'}} /> |
| `ocean-balance` | <div style={{display: 'inline-block', width: '300px', height: '32px', borderRadius: '4px', verticalAlign: 'middle', background: 'linear-gradient(to right, #00441b, #6fc1b3, #f7f7f7, #b3a0d0, #3b0f70)'}} /> |

#### Categorical
These palettes are designed for discrete, non-ordered categories.

| Name | |
| :--- | :--- |
| `tycho11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4e79a7', '#f28e2b', '#59a14f', '#e15759', '#b07aa1', '#9c755f', '#ff9da7', '#edc948', '#76b7b2', '#6b8fd6', '#c07bc4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Default categorical palette. Provides very good perceptual separation for up to 8 colors.</small></div> |
| `tycho-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#78a6d9', '#ffae54', '#7ddc7a', '#ff7a7a', '#d29be0', '#c49a84', '#ffb3bf', '#ffe066', '#7fd6d0', '#8fb4ff', '#e199eb'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>A variant of Tycho 11 optimized for dark backgrounds.</small></div> |
| `tycho-robust11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4e79a7', '#f28e2b', '#2ca58d', '#d13a3c', '#b07aa1', '#9c755f', '#ff9da7', '#e3c13b', '#5fb8b2', '#6b8fd6', '#c07bc4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Reinforced variant that improves separability under color vision deficiency and low-contrast environments.</small></div> |
| `tycho-soft11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#8fb1d4', '#f6b878', '#8ecf86', '#f08a8b', '#d3a9cc', '#c3a492', '#ffc6cc', '#f3e08a', '#a8d8d4', '#a9c0ea', '#e0b4e4'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Low-contrast palette with soft tones, ideal for filled areas and dashboards. Less suitable for thin lines.</small></div> |
| `tycho-soft-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#78a6d9', '#ffae54', '#7ddc7a', '#ff7a7a', '#d29be0', '#c49a84', '#ffb3bf', '#ffe066', '#7fd6d0', '#8fb4ff', '#e199eb'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Soft-contrast palette optimized for charcoal backgrounds, suitable for both lines and filled surfaces.</small></div> |
| `tycho-bold11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#2f6fb0', '#ff7a00', '#2fa23a', '#e02f2f', '#9b4db5', '#7f4f38', '#ff6f86', '#f2c200', '#2daaa3', '#4c79e0', '#b84ac6'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>High-contrast palette with strong separation, ideal for thin lines and dense line charts.</small></div> |
| `tycho-bold-dark11` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4f93ff', '#ff8c1a', '#33c94a', '#ff4f4f', '#b86bff', '#a86a4a', '#ff7f9e', '#ffd400', '#2ec9c1', '#6f9bff', '#cc5bd9'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Energetic, high-contrast palette for dark UI, providing strong structural consistency for thin strokes.</small></div> |
| `tableau10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'].map(c => <div key={c} style={{display: 'inline-block', width: '30px', height: '32px', backgroundColor: c}} />)}<br/><small>The classic Tableau 10 palette, also used as the default in Matplotlib.</small></div> |
| `mathematica10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#5E81B5', '#E19C24', '#8FB131', '#EB6235', '#8778B3', '#C56E1A', '#5E9EC9', '#B23A3A', '#4C9F70', '#C979B7'].map(c => <div key={c} style={{display: 'inline-block', width: '30px', height: '32px', backgroundColor: c}} />)}<br/><small>Palette inspired by the default colors used in Wolfram Mathematica.</small></div> |
| `cupertino10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#007AFF', '#FF9500', '#34C759', '#FF3B30', '#AF52DE', '#FF2D55', '#30B0C7', '#5856D6', '#A2845E', '#32ADE6', '#00C7BE'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Apple system palette optimized for light appearance.</small></div> |
| `cupertino-dark10` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#0A84FF', '#FF9F0A', '#30D158', '#FF453A', '#BF5AF2', '#FF375F', '#40C8E0', '#5E5CE6', '#AC8E68', '#64D2FF', '#00D1C1'].map(c => <div key={c} style={{display: 'inline-block', width: '27px', height: '32px', backgroundColor: c}} />)}<br/><small>Apple system palette optimized for dark appearance.</small></div> |
| `kelly22` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#fdfdfd', '#1d1d1d', '#ebce2b', '#702c8c', '#db6917', '#96cde6', '#ba1c30', '#c0bd7f', '#7f7e80', '#5fa641', '#d485b2', '#4277b6', '#df8461', '#463397', '#e1a11a', '#91218c', '#e8e948', '#7e1510', '#92ae31', '#6f340d', '#d32b1e', '#2b3514'].map(c => <div key={c} style={{display: 'inline-block', width: '13.6px', height: '32px', backgroundColor: c}} />)}<br/><small>Set of 22 colors maximized for contrast, suitable for datasets with a large number of categories.</small></div> |
| `spectrum12` | <div style={{display: 'inline-block', verticalAlign: 'middle'}}>{['#4148cc', '#db3c80', '#12b5b0', '#ff8c14', '#848aff', '#78e16e', '#1e78f0', '#ebcd00', '#beeb3c', '#7828d2', '#cd5f00', '#00915f'].map(c => <div key={c} style={{display: 'inline-block', width: '25px', height: '32px', backgroundColor: c}} />)}<br/><small>Balanced palette of 12 colors covering the full visible spectrum.</small></div> |


</FunctionDefinition>


<nav className="hidden">
### ColorToColorspace
</nav>
<FunctionDefinition name="ColorToColorspace">

<Signature name="ColorToColorspace">_color_, _colorspace: string_</Signature>

Convert a color to its components in a specified color space.

Supported color spaces: `"rgb"`, `"hsl"`, `"oklch"`, `"oklab"`.

```json example
["ColorToColorspace", "'red'", "'hsl'"]
// ➔ ["Tuple", 0, 1, 0.5]
```

</FunctionDefinition>

<nav className="hidden">
### ColorFromColorspace
</nav>
<FunctionDefinition name="ColorFromColorspace">

<Signature name="ColorFromColorspace">_components: tuple_, _colorspace: string_</Signature>

Convert components from a specified color space back to a canonical sRGB tuple.

```json example
["ColorFromColorspace", ["Tuple", 0, 1, 0.5], "'hsl'"]
// ➔ ["Tuple", 1, 0, 0]
```

</FunctionDefinition>
