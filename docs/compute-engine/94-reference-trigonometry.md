---
title: Trigonometry
slug: /compute-engine/reference/trigonometry/
date: Last Modified
---

## Constants

<div className="symbols-table first-column-header">

| Symbol    | Value                                                         |
| :-------- | :------------------------------------------------------------ |
| `Degrees` | $$ \frac{\pi}{180} = 0.017453292519943295769236907\ldots $$ |
| `Pi`      | $$ \pi \approx 3.14159265358979323\ldots $$                 |

</div>

## Trigonometric Functions

<div className='equal-width-columns'>

| Function | Inverse                                                                                                   | Hyperbolic | Area Hyperbolic |
| :------- | :-------------------------------------------------------------------------------------------------------- | :--------- | :-------------- |
| `Sin`    | `Arcsin`                                                                                                  | `Sinh`     | `Arsinh`        |
| `Cos`    | `Arccos`                                                                                                  | `Cosh`     | `Arcosh`        |
| `Tan`    | [`Arctan`](https://www.wikidata.org/wiki/Q2257242)<br/> [`Arctan2`](https://www.wikidata.org/wiki/Q776598) | `Tanh`     | `Artanh`        |
| `Cot`    | `Arccot`                                                                                                  | `Coth`     | `Arcoth`        |
| `Sec`    | `Arcsec`                                                                                                  | `Sech`     | `Arsech`        |
| `Csc`    | `Arccsc`                                                                                                  | `Csch`     | `Arcsch`        |

</div>

<div className="symbols-table first-column-header" style={{"--first-col-width":"20ch"}}>

| Function               |                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FromPolarCoordinates` | Converts $$ (\operatorname{radius}, \operatorname{angle}) \longrightarrow (x, y)$$                                                                                                                                                                                                                                                                                                |
| `ToPolarCoordinates`   | Converts $$(x, y) \longrightarrow (\operatorname{radius}, \operatorname{angle})$$                                                                                                                                                                                                                                                                                                 |
| `Hypot`                | $$\operatorname{Hypot}(x,y) = \sqrt{x^2+y^2}$$                                                                                                                                                                                                                                                                                                   |
| `Haversine`            | $$ \operatorname{Haversine}(z) = \sin(\frac{z}{2})^2 $$ <br/>The [Haversine function](https://www.wikidata.org/wiki/Q2528380) was important in navigation because it appears in the haversine formula, which is used to reasonably accurately compute distances on an astronomic spheroid given angular positions (e.g., longitude and latitude). |
| `InverseHaversine`     | $$\operatorname{InverseHaversine}(z) = 2 \operatorname{Arcsin}(\sqrt{z})$$                                                                                                                                                                                                                                                                       |

</div>

## Cardinal Sine and Fresnel Functions

<div className="symbols-table first-column-header" style={{"--first-col-width":"20ch"}}>

| Function               |                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Sinc`                 | $$\operatorname{sinc}(x) = \frac{\sin x}{x}$$ with $$\operatorname{sinc}(0) = 1$$. The unnormalized [cardinal sine](https://en.wikipedia.org/wiki/Sinc_function) function. |
| `FresnelS`             | $$S(x) = \int_0^x \sin\!\left(\tfrac{\pi t^2}{2}\right) dt$$ The [Fresnel S integral](https://en.wikipedia.org/wiki/Fresnel_integral). Odd function with $$S(\infty) = \tfrac{1}{2}$$. |
| `FresnelC`             | $$C(x) = \int_0^x \cos\!\left(\tfrac{\pi t^2}{2}\right) dt$$ The [Fresnel C integral](https://en.wikipedia.org/wiki/Fresnel_integral). Odd function with $$C(\infty) = \tfrac{1}{2}$$. |

</div>

## Trigonometric Simplification

The `trigSimplify()` method applies the Fu algorithm to simplify trigonometric
expressions. This systematic approach uses transformation rules to find simpler
equivalent forms.

```javascript
const expr = ce.parse("\\sin^2(x) + \\cos^2(x)");
expr.trigSimplify();  // Returns: 1

const expr2 = ce.parse("2\\sin(x)\\cos(x)");
expr2.trigSimplify(); // Returns: sin(2x)
```

Alternatively, use the `strategy` option with `simplify()`:

```javascript
expr.simplify({ strategy: 'fu' });
```

### Supported Identities

The Fu algorithm recognizes and applies:

- **Pythagorean identities**: `sin²(x) + cos²(x) = 1`, `1 + tan²(x) = sec²(x)`
- **Reciprocal identities**: `sec(x) = 1/cos(x)`, `csc(x) = 1/sin(x)`
- **Double angle formulas**: `sin(2x) = 2sin(x)cos(x)`, `cos(2x) = cos²(x) - sin²(x)`
- **Product-to-sum**: `sin(x)cos(y) = ½[sin(x+y) + sin(x-y)]`
- **Sum-to-product**: `sin(x) + sin(y) = 2sin((x+y)/2)cos((x-y)/2)`
- **Morrie's law**: Products of cosines with doubled angles

<ReadMore path="/compute-engine/guides/simplify/" > Read more about
<strong>Simplification</strong> <Icon name="chevron-right-bold" /></ReadMore>
