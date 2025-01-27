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
| `Cot`    | `Acot`                                                                                                    | `Coth`     | `Arcoth`        |
| `Sec`    | `Asec`                                                                                                    | `Sech`     | `Asech`         |
| `Csc`    | `Acsc`                                                                                                    | `Csch`     | `Acsch`         |

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
