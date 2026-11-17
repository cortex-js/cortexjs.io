<!-- The detail of the entries of /reference/units/. Format: README.md. -->

## Section: Supported units

A unit is a unit symbol, or a product, quotient or power of unit symbols.
In Epsil, write a unit as a name or as a string: `quantity(3, m)`,
`quantity(9.8, m/s^2)` and `quantity(9.8, "m/s^2")` are quantities. A unit
name is not a variable: it is not declared, and it does not need a value.

The unit arguments of `unitConvert`, `isCompatibleUnit` and
`unitDimension` are names, not strings: a string there leaves the call
unevaluated. Four unit symbols cannot be written as a name: `in` is a
reserved word, and `min`, `lb` and `arcsec` are the names of library
functions. Write them as a string in `quantity`, and as a
[LaTeX island](/literals/#latex-islands) (`$\mathrm{min}$`) in a unit
argument.

```epsil
unitConvert(quantity(2, "h"), $\mathrm{min}$)
// ➔ 120 min
unitConvert(quantity(1, "lb"), oz)
// ➔ 16 oz
quantity(1, lb)
// ➔ 1 Lb
```

The vector of `unitDimension` has eight exponents: the seven SI base
dimensions, in the order of the table below, and a currency dimension.

### SI base units

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

### Named derived SI units

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

`Ω` is the same unit as `ohm`.

### SI prefixes

An SI prefix applies to the SI base units, to the named derived SI units,
and to `eV`, `L` and `bar`:

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
| micro  | µ, μ   | 10^-6   |
| nano   | n      | 10^-9   |
| pico   | p      | 10^-12  |
| femto  | f      | 10^-15  |
| atto   | a      | 10^-18  |
| zepto  | z      | 10^-21  |
| yocto  | y      | 10^-24  |
| ronto  | r      | 10^-27  |
| quecto | q      | 10^-30  |

</div>

The prefix of mass is put on `g`, not on `kg`: `mg`, `µg`. The micro
prefix is the micro sign `µ` or the Greek letter `μ`; `u` is not a prefix,
and `ug` is not a known unit, so it converts to nothing.

```epsil
unitConvert(quantity(2, µg), mg)
// ➔ 0.002 mg
unitConvert(quantity(1, keV), eV)
// ➔ 1000 eV
isError(unitConvert(quantity(2, ug), g))
// ➔ true
```

### Non-SI units

<div className="symbols-table first-column-header" style={{"--first-col-width":"8ch"}}>

| Symbol    | Quantity    | SI equivalent        |
| :-------- | :---------- | :------------------- |
| `min`     | Time        | 60 s                 |
| `h`       | Time        | 3600 s               |
| `d`       | Time        | 86400 s              |
| `wk`      | Time        | 604800 s             |
| `ha`      | Area        | 10^4 m^2             |
| `L`       | Volume      | 10^-3 m^3            |
| `t`       | Mass        | 10^3 kg              |
| `eV`      | Energy      | 1.602176634e-19 J    |
| `Da`      | Mass        | 1.6605390666e-27 kg  |
| `au`      | Length      | 1.495978707e11 m     |
| `Å`       | Length      | 10^-10 m             |
| `in`      | Length      | 0.0254 m             |
| `ft`      | Length      | 0.3048 m             |
| `yd`      | Length      | 0.9144 m             |
| `mi`      | Length      | 1609.344 m           |
| `lb`      | Mass        | 0.45359237 kg        |
| `oz`      | Mass        | 0.028349523125 kg    |
| `gal`     | Volume      | 3.785411784e-3 m^3   |
| `qt`      | Volume      | 9.46352946e-4 m^3    |
| `pt`      | Volume      | 4.73176473e-4 m^3    |
| `cup`     | Volume      | 2.365882365e-4 m^3   |
| `atm`     | Pressure    | 101325 Pa            |
| `bar`     | Pressure    | 10^5 Pa              |
| `cal`     | Energy      | 4.184 J              |
| `kWh`     | Energy      | 3.6e6 J              |
| `degC`    | Temperature | K - 273.15           |
| `degF`    | Temperature | (K - 459.67) x 5/9   |
| `USD`     | Currency    | (currency dimension) |
| `cent`    | Currency    | 0.01 USD             |

</div>

`gal`, `qt`, `pt` and `cup` are the US liquid measures. `USD` and `cent` are
the only units of the currency dimension.

`degC` and `degF` convert with an offset and a scale, not with a scale
alone. `unitConvert` applies both:

```epsil
[unitConvert(quantity(100, degC), K), unitConvert(quantity(212, degF), degC)]
// ➔ [373.15 K,100 degC]
```

### Angular units

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

Angular units are dimensionless. The trigonometric functions (`sin`,
`cos`, `tan`, …) convert a quantity with an angular unit to radians:

```epsil
[sin(quantity(30, deg)), cos(quantity(100, grad)), cos(quantity(1, turn))]
// ➔ [1/2,0,1]
```

### Dimensionless units

<div className="symbols-table first-column-header" style={{"--first-col-width":"10ch"}}>

| Symbol    | Scale factor |
| :-------- | :----------- |
| `percent` | 0.01         |
| `ppm`     | 10^-6        |
| `dB`      | 1 (nominal)  |
| `Np`      | 1 (nominal)  |

</div>

```epsil
unitConvert(quantity(25, percent), ppm)
// ➔ 250000 ppm
```

The logarithmic units `dB` and `Np` are read and kept, but they have the
nominal scale 1: a conversion between them, or to a linear ratio,
multiplies by 1, which is not the relation between these units.

## Section: Physics constants

The [physics](/reference/physics/) library defines physical constants as
quantities, with the [2018 CODATA](https://physics.nist.gov/cuu/Constants/)
recommended values. They take part in quantity arithmetic like any other
quantity.

<div className="symbols-table first-column-header" style={{"--first-col-width":"26ch"}}>

| Symbol                    | Value                 | Unit                 | Description |
| :------------------------ | :-------------------- | :------------------- | :---------- |
| `speedOfLight`            | 299792458             | m/s                  | [Speed of light in vacuum](https://www.wikidata.org/wiki/Q2111) |
| `planckConstant`          | 6.62607015e-34        | J s                  | [Planck constant](https://www.wikidata.org/wiki/Q524) |
| `mu0`                     | 1.25663706212e-6      | N/A^2                | [Vacuum permeability](https://www.wikidata.org/wiki/Q1515261) |
| `standardGravity`         | 9.80665               | m/s^2                | [Standard acceleration due to gravity](https://www.wikidata.org/wiki/Q30006) |
| `elementaryCharge`        | 1.602176634e-19       | C                    | [Elementary charge](https://www.wikidata.org/wiki/Q2101) |
| `boltzmannConstant`       | 1.380649e-23          | J/K                  | [Boltzmann constant](https://www.wikidata.org/wiki/Q131536) |
| `avogadroConstant`        | 6.02214076e23         | mol^-1               | [Avogadro constant](https://www.wikidata.org/wiki/Q47574) |
| `vacuumPermittivity`      | 8.8541878128e-12      | F/m                  | [Vacuum permittivity](https://www.wikidata.org/wiki/Q176908) |
| `gravitationalConstant`   | 6.67430e-11           | m^3/(kg s^2)         | [Gravitational constant](https://www.wikidata.org/wiki/Q30022) |
| `stefanBoltzmannConstant` | 5.670374419e-8        | W/(m^2 K^4)          | [Stefan-Boltzmann constant](https://www.wikidata.org/wiki/Q196898) |
| `gasConstant`             | 8.314462618           | J/(mol K)            | [Molar gas constant](https://www.wikidata.org/wiki/Q39600) |

</div>

```epsil
unitSimplify(quantity(2, kg) * standardGravity)
// ➔ 19.6133 N
unitConvert(speedOfLight, km/s)
// ➔ 299792.458 km/s
```

In LaTeX, `\mu_0` is `mu0` and `\varepsilon_0` is `vacuumPermittivity`:

```epsil
$\varepsilon_0$
// ➔ 8.8541878128e-12 F/m
```

## Section: LaTeX parsing

A quantity written in LaTeX, in a `$…$` island of an Epsil program or in a
mathfield, is read as a `quantity`.

### Supported input forms

<div className="symbols-table">

| LaTeX | Epsil |
| :---- | :---- |
| `5\,\mathrm{m}` | `quantity(5, m)` |
| `3\,\text{kg}` | `quantity(3, kg)` |
| `9.8\,\mathrm{m/s^{2}}` | `quantity(9.8, m/s^2)` |
| `\qty{12}{cm}` | `quantity(12, cm)` |
| `\SI{5}{kg}` | `quantity(5, kg)` |
| `\unit{m/s}` | the unit `m/s` |
| `\si{MHz}` | the unit `MHz` |

</div>

```epsil
$12\,\mathrm{cm} + 1\,\mathrm{m}$
// ➔ 1.12 m
unitConvert($30\,\mathrm{km/h}$, $\mathrm{m/s}$)
// ➔ 8.333333333333334 m/s
```

An angle written with the degree, minute and second signs, `9°30'15"`, is
an angle in degrees, not a quantity. Its value is a number of radians:

```epsil
$9°30'15"$
// ➔ 2281/43200 * pi
```

### Unit parsing rules

In `\mathrm{…}` and `\text{…}`:

- `/` is a division;
- `^` and `^{…}` are exponents;
- `\cdot` is a multiplication;
- a run of letters is one unit symbol, which can have a prefix (`km`,
  `MHz`).

A space between two unit symbols is not a multiplication: `\mathrm{kg m}`
is the unknown unit `kgm`. Write `\mathrm{kg\cdot m}`.

```epsil
$5\,\mathrm{kg\cdot m}$
// ➔ 5 kg⋅m
```

## Quantity

The unit is a unit symbol or a compound unit: a product, quotient or power
of unit symbols (see [Supported units](#supported-units)). A compound unit
written as a string is read as a unit expression.

```epsil
quantity(1, "kg/(m*s^2)")
// ➔ 1 kg/(m⋅s^2)
```

#### Arithmetic on quantities

A sum or a difference of quantities of the same dimension is expressed in
the unit with the largest scale factor. A sum of quantities of different
dimensions stays a sum.

```epsil
quantity(12, cm) + quantity(1, m)
// ➔ 1.12 m
quantity(1, km) - quantity(1, m)
// ➔ 0.999 km
quantity(5, m) + quantity(3, s)
// ➔ 5 m + 3 s
```

A product or a quotient combines the units. A unit symbol that appears in
both cancels exactly, with no conversion factor, and a quotient whose units
all cancel is a number:

```epsil
quantity(5, m) * quantity(3, s)
// ➔ 15 m⋅s
quantity(18, "in") / quantity(12, "in/ft")
// ➔ 3/2 ft
quantity(6, m) / quantity(2, m)
// ➔ 3
```

A power raises the unit to the exponent, and a number scales the
magnitude:

```epsil
[quantity(3, m)^2, 2 * quantity(3, m), sqrt(quantity(9, m^2))]
// ➔ [9 m^2,6 m,3 m]
```

Quantities of the same dimension compare by their values in a common unit:

```epsil
[quantity(100, cm) == quantity(1, m), quantity(10, m) > quantity(5, ft)]
// ➔ [true,true]
```

### MathJSON

`["Quantity", magnitude, unit]`. The magnitude is any numeric expression.
The unit is a unit symbol (`"m"`) or a compound unit built with `Multiply`,
`Divide` and `Power`.

```json example
["Quantity", 3.5, "m"]
["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]
["Quantity", 100, "km"]
```

A unit written in the string notation is canonicalized to the structured
form:

```json example
["Quantity", 9.8, "m/s^2"]
// ➔ ["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]
["Quantity", 1, "kg/(m*s^2)"]
// ➔ ["Quantity", 1, ["Divide", "kg", ["Multiply", "m", ["Power", "s", 2]]]]
```

`Add`, `Subtract`, `Multiply`, `Divide` and `Power` apply to quantities:

```json example
["Add", ["Quantity", 12, "cm"], ["Quantity", 1, "m"]]
// ➔ ["Quantity", 1.12, "m"]
["Multiply", ["Quantity", 5, "m"], ["Quantity", 3, "s"]]
// ➔ ["Quantity", 15, ["Multiply", "m", "s"]]
["Divide", ["Quantity", 18, "in"], ["Quantity", 12, ["Divide", "in", "ft"]]]
// ➔ ["Quantity", ["Rational", 3, 2], "ft"]
["Power", ["Quantity", 3, "m"], 2]
// ➔ ["Quantity", 9, ["Power", "m", 2]]
```

In LaTeX, a number followed by a unit in `\mathrm{…}` or `\text{…}`, or
the `\qty` and `\SI` commands of `siunitx`: `9.8\,\mathrm{m/s^{2}}`. See
[LaTeX parsing](#latex-parsing).

## QuantityMagnitude

```epsil
[quantityMagnitude(quantity(3.5, m)), quantityMagnitude(speedOfLight)]
// ➔ [3.5,299792458]
```

### MathJSON

`["QuantityMagnitude", quantity]`.

```json example
["QuantityMagnitude", ["Quantity", 3.5, "m"]]
// ➔ 3.5
```

## QuantityUnit

The unit is a unit symbol or a compound unit expression.

```epsil
quantityUnit(quantity(3.5, m))
// ➔ m
quantityUnit(quantity(9.8, m/s^2))
// ➔ m / s^2
```

### MathJSON

`["QuantityUnit", quantity]`.

```json example
["QuantityUnit", ["Quantity", 3.5, "m"]]
// ➔ "m"
["QuantityUnit", ["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]]
// ➔ ["Divide", "m", ["Power", "s", 2]]
```

## UnitConvert

The target unit is a unit symbol or a compound unit, written as a name
(see [Supported units](#supported-units)). A conversion to a unit of
another dimension is an `incompatible-type` error. The temperature units
`degC`, `degF` and `K` convert with an offset.

```epsil
unitConvert(quantity(1500, m), km)
// ➔ 1.5 km
unitConvert(quantity(36, km/h), m/s)
// ➔ 10 m/s
unitConvert(quantity(100, degC), degF)
// ➔ 212 degF
isError(unitConvert(quantity(5, m), s))
// ➔ true
```

An exact magnitude stays exact when the conversion multiplies it by an
integer. Otherwise the magnitude of the result is a float:

```epsil
unitConvert(quantity(pi, m), cm)
// ➔ 100pi cm
unitConvert(quantity(180, deg), rad)
// ➔ 3.141592653589793 rad
```

### MathJSON

`["UnitConvert", quantity, unit]`. The target unit is not evaluated.

```json example
["UnitConvert", ["Quantity", 1500, "m"], "km"]
// ➔ ["Quantity", 1.5, "km"]
["UnitConvert", ["Quantity", 36, ["Divide", "km", "h"]], ["Divide", "m", "s"]]
// ➔ ["Quantity", 10, ["Divide", "m", "s"]]
["UnitConvert", ["Quantity", 5, "m"], "s"]
// ➔ ["Error", "'incompatible-type'"]
```

## UnitSimplify

The result is a named derived SI unit when one has the dimension of the
unit and the scale factor 1. When there is none, the quantity is returned
unchanged.

```epsil
unitSimplify(quantity(100, kg*m/s^2))
// ➔ 100 N
unitSimplify(quantity(5, kg*m^2/s^2))
// ➔ 5 J
unitSimplify(quantity(3, m))
// ➔ 3 m
```

### MathJSON

`["UnitSimplify", quantity]`.

```json example
["UnitSimplify", ["Quantity", 100, ["Multiply", "kg", "m", ["Power", "s", -2]]]]
// ➔ ["Quantity", 100, "N"]
```

## IsCompatibleUnit

Two units are compatible when they have the same dimension vector (see
[`unitDimension`](#unitdimension)). The units are unit symbols or compound
units, written as names.

```epsil
[isCompatibleUnit(m, km), isCompatibleUnit(m, s), isCompatibleUnit(J, eV)]
// ➔ [true,false,true]
isCompatibleUnit(m/s, km/h)
// ➔ true
```

### MathJSON

`["IsCompatibleUnit", unit1, unit2]`. The units are not evaluated.

```json example
["IsCompatibleUnit", "J", "eV"]
// ➔ "True"
["IsCompatibleUnit", ["Divide", "m", "s"], ["Divide", "km", "h"]]
// ➔ "True"
```

## UnitDimension

The dimension vector has eight exponents:
`[length, mass, time, current, temperature, amount, luminosity, currency]`.
The first seven are the SI base dimensions. The unit is a unit symbol or a
compound unit, written as a name.

```epsil
[unitDimension(m), unitDimension(N), unitDimension(V)]
// ➔ [[1,0,0,0,0,0,0,0],[1,1,-2,0,0,0,0,0],[2,1,-3,-1,0,0,0,0]]
[unitDimension(m/s^2), unitDimension(rad), unitDimension(USD)]
// ➔ [[1,0,-2,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1]]
```

### MathJSON

`["UnitDimension", unit]`. The unit is not evaluated.

```json example
["UnitDimension", "V"]
// ➔ ["List", 2, 1, -3, -1, 0, 0, 0, 0]
```
