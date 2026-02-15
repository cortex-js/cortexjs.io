---
title: Units and Quantities
slug: /compute-engine/reference/units/
date: Last Modified
---

<Intro>
The Compute Engine provides a unit system for representing and computing with
physical quantities. Units are organized around
[SI base dimensions](https://en.wikipedia.org/wiki/International_System_of_Units)
with support for derived, prefixed, and non-SI units.
</Intro>

<ReadMore path="/compute-engine/guides/units/" >
Read the **Units and Quantities Guide** for a tutorial introduction with
examples<Icon name="chevron-right-bold" />
</ReadMore>


## Quantity

<FunctionDefinition name="Quantity">

<Signature name="Quantity">_magnitude_, _unit_</Signature>

A value paired with a physical unit.

The _magnitude_ is any numeric expression. The _unit_ is a unit symbol (string)
or a compound unit expression built from `Multiply`, `Divide`, and `Power`.

<Latex value="9.8\,\mathrm{m/s^{2}}"/>

```json example
["Quantity", 3.5, "m"]
// A simple quantity: 3.5 meters

["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]
// A compound unit: 9.8 m/s^2

["Quantity", 100, "km"]
// Prefixed unit: 100 kilometers
```

A DSL string shorthand is accepted for compound units and canonicalized to the
structured form:

```json example
["Quantity", 9.8, "m/s^2"]
// → ["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]

["Quantity", 1, "kg/(m*s^2)"]
// → ["Quantity", 1, ["Divide", "kg", ["Multiply", "m", ["Power", "s", 2]]]]
```

**Arithmetic on quantities:**

`Add` and `Subtract` require compatible dimensions and express the result in the
unit with the largest scale factor:

```json example
["Add", ["Quantity", 12, "cm"], ["Quantity", 1, "m"]]
// → ["Quantity", 1.12, "m"]
```

`Multiply` and `Divide` combine units:

```json example
["Multiply", ["Quantity", 5, "m"], ["Quantity", 3, "s"]]
// → ["Quantity", 15, ["Multiply", "m", "s"]]
```

`Power` raises the unit to the exponent:

```json example
["Power", ["Quantity", 3, "m"], 2]
// → ["Quantity", 9, ["Power", "m", 2]]
```

</FunctionDefinition>


## QuantityMagnitude

<FunctionDefinition name="QuantityMagnitude">

<Signature name="QuantityMagnitude">_quantity_</Signature>

Extract the numeric magnitude from a `Quantity` expression.

```json example
["QuantityMagnitude", ["Quantity", 3.5, "m"]]
// → 3.5
```

</FunctionDefinition>


## QuantityUnit

<FunctionDefinition name="QuantityUnit">

<Signature name="QuantityUnit">_quantity_</Signature>

Extract the unit expression from a `Quantity`.

```json example
["QuantityUnit", ["Quantity", 3.5, "m"]]
// → "m"

["QuantityUnit", ["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]]
// → ["Divide", "m", ["Power", "s", 2]]
```

</FunctionDefinition>


## UnitConvert

<FunctionDefinition name="UnitConvert">

<Signature name="UnitConvert">_quantity_, _target-unit_</Signature>

Convert a quantity to a different compatible unit. The target can be a simple
unit symbol or a compound unit expression.

Returns the converted `Quantity`, or an `Error` if the units are incompatible.

Supports affine temperature conversions (`degC`, `degF`, `K`).

```json example
["UnitConvert", ["Quantity", 1500, "m"], "km"]
// → ["Quantity", 1.5, "km"]

["UnitConvert", ["Quantity", 180, "deg"], "rad"]
// → ["Quantity", 3.14159..., "rad"]

["UnitConvert",
  ["Quantity", 36, ["Divide", "km", "h"]],
  ["Divide", "m", "s"]]
// → ["Quantity", 10, ["Divide", "m", "s"]]

["UnitConvert", ["Quantity", 100, "degC"], "degF"]
// → ["Quantity", 212, "degF"]

["UnitConvert", ["Quantity", 5, "m"], "s"]
// → Error (incompatible dimensions)
```

</FunctionDefinition>


## UnitSimplify

<FunctionDefinition name="UnitSimplify">

<Signature name="UnitSimplify">_quantity_</Signature>

Reduce a compound unit to a named derived SI unit if one matches the dimension
and has scale factor 1.

```json example
["UnitSimplify",
  ["Quantity", 100, ["Multiply", "kg", "m", ["Power", "s", -2]]]]
// → ["Quantity", 100, "N"]
```

If no simpler named form exists, the quantity is returned unchanged.

</FunctionDefinition>


## IsCompatibleUnit

<FunctionDefinition name="IsCompatibleUnit">

<Signature name="IsCompatibleUnit">_unit-a_, _unit-b_</Signature>

Test whether two units have the same dimension vector. Returns `True` or
`False`. Both simple unit symbols and compound unit expressions are accepted.

```json example
["IsCompatibleUnit", "m", "km"]
// → True

["IsCompatibleUnit", "m", "s"]
// → False

["IsCompatibleUnit", "J", "eV"]
// → True

["IsCompatibleUnit", ["Divide", "m", "s"], ["Divide", "km", "h"]]
// → True
```

</FunctionDefinition>


## UnitDimension

<FunctionDefinition name="UnitDimension">

<Signature name="UnitDimension">_unit_</Signature>

Return the 7-element dimension vector of a unit. The vector encodes the
exponents of the SI base dimensions:
`[length, mass, time, current, temperature, amount, luminosity]`.

Both simple unit symbols and compound unit expressions are accepted.

```json example
["UnitDimension", "m"]
// → [1, 0, 0, 0, 0, 0, 0]

["UnitDimension", "N"]
// → [1, 1, -2, 0, 0, 0, 0]

["UnitDimension", "V"]
// → [2, 1, -3, -1, 0, 0, 0]

["UnitDimension", ["Divide", "m", ["Power", "s", 2]]]
// → [1, 0, -2, 0, 0, 0, 0]
```

</FunctionDefinition>


## Physics Constants

The `physics` library provides physical constants as `Quantity` expressions.
These constants use the [2018 CODATA](https://physics.nist.gov/cuu/Constants/)
recommended values.

<div className="symbols-table first-column-header" style={{"--first-col-width":"20ch"}}>

| Symbol            | Value                 | Unit                 | Description |
| :---------------- | :-------------------- | :------------------- | :---------- |
| `SpeedOfLight`    | 299792458             | m/s                  | [Speed of light in vacuum](https://www.wikidata.org/wiki/Q2111) |
| `PlanckConstant`  | 6.62607015e-34        | J s                  | [Planck constant](https://www.wikidata.org/wiki/Q524) |
| `Mu0`             | 1.25663706212e-6      | N/A^2                | [Vacuum permeability](https://www.wikidata.org/wiki/Q1515261) |
| `StandardGravity` | 9.80665               | m/s^2                | [Standard acceleration due to gravity](https://www.wikidata.org/wiki/Q30006) |
| `ElementaryCharge` | 1.602176634e-19      | C                    | [Elementary charge](https://www.wikidata.org/wiki/Q2101) |
| `BoltzmannConstant` | 1.380649e-23        | J/K                  | [Boltzmann constant](https://www.wikidata.org/wiki/Q131536) |
| `AvogadroConstant` | 6.02214076e23        | mol^-1               | [Avogadro constant](https://www.wikidata.org/wiki/Q47574) |
| `VacuumPermittivity` | 8.8541878128e-12   | F/m                  | [Vacuum permittivity](https://www.wikidata.org/wiki/Q176908) |
| `GravitationalConstant` | 6.67430e-11     | m^3/(kg s^2)         | [Gravitational constant](https://www.wikidata.org/wiki/Q30022) |
| `StefanBoltzmannConstant` | 5.670374419e-8 | W/(m^2 K^4)         | [Stefan-Boltzmann constant](https://www.wikidata.org/wiki/Q196898) |
| `GasConstant`     | 8.314462618           | J/(mol K)            | [Molar gas constant](https://www.wikidata.org/wiki/Q39600) |

</div>

<Latex value="\mu_0"/>

The vacuum permeability constant `Mu0` can be entered in LaTeX as `\mu_0`.

<Latex value="\varepsilon_0"/>

The vacuum permittivity constant `VacuumPermittivity` can be entered in LaTeX as `\varepsilon_0`.


## Supported Units

### SI Base Units

<div className="symbols-table first-column-header" style={{"--first-col-width":"8ch"}}>

| Symbol | Quantity            | Name     |
| :----- | :------------------ | :------- |
| `m`    | Length              | meter    |
| `kg`   | Mass                | kilogram |
| `s`    | Time                | second   |
| `A`    | Electric current    | ampere   |
| `K`    | Temperature         | kelvin   |
| `mol`  | Amount of substance | mole     |
| `cd`   | Luminous intensity  | candela  |

</div>

### Named Derived SI Units

<div className="symbols-table first-column-header" style={{"--first-col-width":"8ch"}}>

| Symbol | Quantity               | Name      | In base units          |
| :----- | :--------------------- | :-------- | :--------------------- |
| `Hz`   | Frequency              | hertz     | s^-1                   |
| `N`    | Force                  | newton    | kg m s^-2              |
| `Pa`   | Pressure               | pascal    | kg m^-1 s^-2           |
| `J`    | Energy                 | joule     | kg m^2 s^-2            |
| `W`    | Power                  | watt      | kg m^2 s^-3            |
| `C`    | Electric charge        | coulomb   | A s                    |
| `V`    | Voltage                | volt      | kg m^2 s^-3 A^-1       |
| `F`    | Capacitance            | farad     | kg^-1 m^-2 s^4 A^2     |
| `ohm`  | Resistance             | ohm       | kg m^2 s^-3 A^-2       |
| `S`    | Conductance            | siemens   | kg^-1 m^-2 s^3 A^2     |
| `Wb`   | Magnetic flux          | weber     | kg m^2 s^-2 A^-1       |
| `T`    | Magnetic flux density  | tesla     | kg s^-2 A^-1           |
| `H`    | Inductance             | henry     | kg m^2 s^-2 A^-2       |
| `lm`   | Luminous flux          | lumen     | cd                     |
| `lx`   | Illuminance            | lux       | cd m^-2                |
| `Bq`   | Radioactivity          | becquerel | s^-1                   |
| `Gy`   | Absorbed dose          | gray      | m^2 s^-2               |
| `Sv`   | Equivalent dose        | sievert   | m^2 s^-2               |
| `kat`  | Catalytic activity     | katal     | mol s^-1               |

</div>

### SI Prefixes

All SI prefixes are supported on base and named derived units:

<div className='equal-width-columns'>

| Prefix | Symbol | Factor  |
| :----- | :----- | :------ |
| quetta | Q      | 10^30   |
| ronna  | R      | 10^27   |
| yotta  | Y      | 10^24   |
| zetta  | Z      | 10^21   |
| exa    | E      | 10^18   |
| peta   | P      | 10^15   |
| tera   | T      | 10^12   |
| giga   | G      | 10^9    |
| mega   | M      | 10^6    |
| kilo   | k      | 10^3    |
| hecto  | h      | 10^2    |
| deca   | da     | 10^1    |

| Prefix | Symbol | Factor  |
| :----- | :----- | :------ |
| deci   | d      | 10^-1   |
| centi  | c      | 10^-2   |
| milli  | m      | 10^-3   |
| micro  | u      | 10^-6   |
| nano   | n      | 10^-9   |
| pico   | p      | 10^-12  |
| femto  | f      | 10^-15  |
| atto   | a      | 10^-18  |
| zepto  | z      | 10^-21  |
| yocto  | y      | 10^-24  |
| ronto  | r      | 10^-27  |
| quecto | q      | 10^-30  |

</div>

:::info[Note]
Prefixes are applicable to all base and derived units except `kg`. Use `g` as
the base for mass prefixing: `mg`, `ug`, etc.
:::

### Non-SI Units

<div className="symbols-table first-column-header" style={{"--first-col-width":"8ch"}}>

| Symbol    | Quantity    | SI Equivalent        |
| :-------- | :---------- | :------------------- |
| `min`     | Time        | 60 s                 |
| `h`       | Time        | 3600 s               |
| `d`       | Time        | 86400 s              |
| `ha`      | Area        | 10^4 m^2             |
| `L`       | Volume      | 10^-3 m^3            |
| `t`       | Mass        | 10^3 kg              |
| `eV`      | Energy      | 1.602176634e-19 J    |
| `Da`      | Mass        | 1.66053906660e-27 kg |
| `au`      | Length      | 1.495978707e11 m     |
| `in`      | Length      | 0.0254 m             |
| `ft`      | Length      | 0.3048 m             |
| `mi`      | Length      | 1609.344 m           |
| `lb`      | Mass        | 0.45359237 kg        |
| `oz`      | Mass        | 0.028349523125 kg    |
| `gal`     | Volume      | 3.785411784e-3 m^3   |
| `atm`     | Pressure    | 101325 Pa            |
| `bar`     | Pressure    | 10^5 Pa              |
| `cal`     | Energy      | 4.184 J              |
| `kWh`     | Energy      | 3.6e6 J              |
| `degC`    | Temperature | K - 273.15           |
| `degF`    | Temperature | (K - 459.67) x 5/9  |

</div>

:::info[Note]
`degC` and `degF` use affine conversions (offset + scale), not just linear
scaling. `UnitConvert` handles these correctly.
:::

### Angular Units

<div className="symbols-table first-column-header" style={{"--first-col-width":"10ch"}}>

| Symbol   | Name      | In radians         |
| :------- | :-------- | :----------------- |
| `rad`    | radian    | 1                  |
| `deg`    | degree    | pi/180             |
| `grad`   | gradian   | pi/200             |
| `turn`   | turn      | 2 pi               |
| `arcmin` | arcminute | pi/10800           |
| `arcsec` | arcsecond | pi/648000          |

</div>

Angular units are dimensionless. Trigonometric functions (`Sin`, `Cos`, `Tan`,
etc.) automatically convert `Quantity` arguments with angular units to radians.

### Dimensionless Units

<div className="symbols-table first-column-header" style={{"--first-col-width":"10ch"}}>

| Symbol    | Scale factor |
| :-------- | :----------- |
| `percent` | 0.01         |
| `ppm`     | 10^-6        |
| `dB`      | 1 (nominal)  |
| `Np`      | 1 (nominal)  |

</div>

:::info[Note]
Logarithmic units (`dB`, `Np`) are parsed and stored but conversion between
logarithmic and linear scales is not supported in v1.
:::


## LaTeX Parsing

### Supported Input Forms

| LaTeX | MathJSON |
| :---- | :------- |
| `5\,\mathrm{m}` | `["Quantity", 5, "m"]` |
| `3\,\text{kg}` | `["Quantity", 3, "kg"]` |
| `9.8\,\mathrm{m/s^{2}}` | `["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]` |
| `\qty{12}{cm}` | `["Quantity", 12, "cm"]` |
| `\SI{5}{kg}` | `["Quantity", 5, "kg"]` |
| `\unit{m/s}` | `["Divide", "m", "s"]` |
| `\si{MHz}` | `"MHz"` |

### Unit Parsing Rules

Within `\mathrm{...}` or `\text{...}`, the parser interprets:

- `/` as division
- `^` and `^{...}` as exponents
- `\cdot` as multiplication
- Juxtaposed symbols as individual units or prefixed units
