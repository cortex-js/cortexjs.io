---
title: Units and Quantities
slug: /compute-engine/guides/units/
date: Last Modified
---

<Intro>
The Compute Engine supports physical units and quantities. You can parse LaTeX
expressions with units, perform arithmetic on quantities, convert between units,
and check dimensional compatibility.
</Intro>

## Quick Start

```live
// import { parse, evaluate } from '@cortex-js/compute-engine';

// Parse LaTeX with units
parse('12\\,\\mathrm{cm}').print();

// Arithmetic: add compatible quantities (largest-scale-unit wins)
evaluate('12\\,\\mathrm{cm} + 1\\,\\mathrm{m}').print();

// Convert units
evaluate(['UnitConvert', ['Quantity', 1500, 'm'], 'km']).print();
```

## Creating Quantities

A quantity pairs a numeric value with a unit. Use the `Quantity` function in
MathJSON:

```json example
["Quantity", 3.5, "m"]
["Quantity", 100, "km"]
["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]
```

### Simple Units

Simple units use standard SI abbreviations as strings:

```json example
"m", "kg", "s", "A", "K", "mol", "cd"
```

Prefixed units are also single strings:

```json example
"km", "mg", "ns", "GHz", "kN"
```

### Compound Units

Compound units are built with `Multiply`, `Divide`, and `Power`:

```json example
["Divide", "m", "s"]                         // velocity (m/s)
["Divide", "m", ["Power", "s", 2]]           // acceleration (m/s^2)
["Multiply", "kg", "m", ["Power", "s", -2]]  // force (N)
```

### DSL String Shorthand

For convenience, compound units can also be written as strings using a simple
DSL syntax. The string is automatically parsed into the structured form during
canonicalization:

```json example
["Quantity", 9.8, "m/s^2"]
// canonicalizes to:
["Quantity", 9.8, ["Divide", "m", ["Power", "s", 2]]]
```

The DSL supports:
- `/` for division: `m/s`
- `^` for exponents: `s^-2`
- `*` for multiplication: `kg*m`
- `(...)` for grouping: `kg/(m*s^2)`
- SI prefixes: `km/h`

:::info[Note]
`"ms"` is always parsed as the prefixed unit millisecond, not meter times
second. Use `"m*s"` for the product.
:::


## Parsing LaTeX with Units

The engine recognizes units inside `\mathrm{...}` and `\text{...}` when they
appear next to a number:

```live
parse('5\\,\\mathrm{m}').print();

parse('9.8\\,\\mathrm{m/s^{2}}').print();

parse('3\\,\\text{kg}').print();
```

### siunitx Commands

The `siunitx` LaTeX package commands are also supported:

```live
// Modern siunitx
parse('\\qty{12}{cm}').print();
parse('\\unit{m/s}').print();

// Legacy siunitx
parse('\\SI{5}{kg}').print();
parse('\\si{MHz}').print();
```

### Serialization

Quantities serialize back to LaTeX with a thin space and upright unit:

```live
console.info(parse('5\\,\\mathrm{m}').latex);
// → "5\,\mathrm{m}"

console.info(parse('9.8\\,\\mathrm{m/s^{2}}').latex);
// → "9.8\,\mathrm{m/s^{2}}"
```


## Arithmetic on Quantities

### Addition and Subtraction

Operands must have compatible dimensions. The result is expressed in the unit
with the largest scale factor:

```live
evaluate(['Add', ['Quantity', 12, 'cm'], ['Quantity', 1, 'm']]).print();
// → ["Quantity", 1.12, "m"]
```

Adding quantities with incompatible dimensions (e.g., meters + seconds) returns
the expression unevaluated.

### Multiplication and Division

Units combine when multiplying or dividing quantities:

```live
evaluate(['Multiply', ['Quantity', 5, 'm'], ['Quantity', 3, 's']]).print();
// → ["Quantity", 15, ["Multiply", "m", "s"]]

evaluate(['Divide', ['Quantity', 100, 'm'], ['Quantity', 10, 's']]).print();
// → ["Quantity", 10, ["Divide", "m", "s"]]
```

Scalar multiplication works naturally:

```live
evaluate(['Multiply', 2, ['Quantity', 5, 'kg']]).print();
// → ["Quantity", 10, "kg"]
```

### Exponentiation

The unit is raised to the power:

```live
evaluate(['Power', ['Quantity', 3, 'm'], 2]).print();
// → ["Quantity", 9, ["Power", "m", 2]]
```

## Unit Conversion

Use `UnitConvert` to convert a quantity to a different compatible unit:

```live
evaluate(['UnitConvert', ['Quantity', 1500, 'm'], 'km']).print();
// → ["Quantity", 1.5, "km"]

evaluate(['UnitConvert', ['Quantity', 180, 'deg'], 'rad']).print();
// → ["Quantity", 3.14159..., "rad"]
```

Compound unit conversion is also supported:

```live
evaluate(['UnitConvert',
  ['Quantity', 36, ['Divide', 'km', 'h']],
  ['Divide', 'm', 's']
]).print();
// → ["Quantity", 10, ["Divide", "m", "s"]]
```

### Temperature Conversion

Temperature units (`degC`, `degF`, `K`) use affine conversions that correctly
handle the offset between scales:

```live
evaluate(['UnitConvert', ['Quantity', 100, 'degC'], 'degF']).print();
// → ["Quantity", 212, "degF"]

evaluate(['UnitConvert', ['Quantity', 32, 'degF'], 'degC']).print();
// → ["Quantity", 0, "degC"]

evaluate(['UnitConvert', ['Quantity', 0, 'K'], 'degC']).print();
// → ["Quantity", -273.15, "degC"]
```

Converting incompatible units returns an `Error` expression:

```live
evaluate(['UnitConvert', ['Quantity', 5, 'm'], 's']).print();
// → Error
```

## Unit Simplification

`UnitSimplify` reduces a compound unit to a named derived unit when one exists:

```live
evaluate(['UnitSimplify',
  ['Quantity', 100, ['Multiply', 'kg', 'm', ['Power', 's', -2]]]
]).print();
// → ["Quantity", 100, "N"]
```

If no simpler named form exists, the quantity is returned unchanged.


## Dimensional Analysis

### Checking Compatibility

Use `IsCompatibleUnit` to test whether two units have the same dimension.
Both simple and compound unit expressions are supported:

```live
evaluate(['IsCompatibleUnit', 'm', 'km']).print();
// → True

evaluate(['IsCompatibleUnit', 'm', 's']).print();
// → False

evaluate(['IsCompatibleUnit',
  ['Divide', 'm', 's'],
  ['Divide', 'km', 'h']
]).print();
// → True
```

### Dimension Vectors

Every unit maps to a 7-element dimension vector over the SI base dimensions:
`[length, mass, time, current, temperature, amount, luminosity]`.

Use `UnitDimension` to retrieve it. Both simple symbols and compound
expressions are supported:

```live
evaluate(['UnitDimension', 'm']).print();
// → [1, 0, 0, 0, 0, 0, 0]

evaluate(['UnitDimension', ['Divide', 'm', ['Power', 's', 2]]]).print();
// → [1, 0, -2, 0, 0, 0, 0]
```

## Angular Units and Trigonometry

Trigonometric functions accept `Quantity` arguments with angular units. The
angle is automatically converted to radians before evaluation:

```live
evaluate(['Sin', ['Quantity', 90, 'deg']]).print();
// → 1

evaluate(['Cos', ['Quantity', 200, 'grad']]).print();
// → -1
```

Supported angular units: `deg`, `rad`, `grad`, `turn`, `arcmin`, `arcsec`.


## Physics Constants

The `physics` library (loaded by default) provides physical constants as
`Quantity` expressions:

```live
evaluate('SpeedOfLight').print();
// → ["Quantity", 299792458, ["Divide", "m", "s"]]

evaluate('PlanckConstant').print();
// → ["Quantity", 6.62607015e-34, ["Multiply", "J", "s"]]

evaluate('StandardGravity').print();
// → ["Quantity", 9.80665, ["Divide", "m", ["Power", "s", 2]]]
```

| Constant         | Symbol              | Value            | Unit   |
| :--------------- | :------------------ | :--------------- | :----- |
| Speed of light   | `SpeedOfLight`      | 299792458        | m/s    |
| Planck constant  | `PlanckConstant`    | 6.62607015e-34   | J s    |
| Vacuum permeability | `Mu0`            | 1.25663706212e-6 | N/A^2  |
| Standard gravity | `StandardGravity`   | 9.80665          | m/s^2  |
| Elementary charge | `ElementaryCharge` | 1.602176634e-19  | C      |
| Boltzmann constant | `BoltzmannConstant` | 1.380649e-23   | J/K    |
| Avogadro constant | `AvogadroConstant` | 6.02214076e23    | mol^-1 |
| Vacuum permittivity | `VacuumPermittivity` | 8.8541878128e-12 | F/m |
| Gravitational constant | `GravitationalConstant` | 6.67430e-11 | m^3/(kg s^2) |
| Stefan-Boltzmann | `StefanBoltzmannConstant` | 5.670374419e-8 | W/(m^2 K^4) |
| Gas constant     | `GasConstant`       | 8.314462618      | J/(mol K) |


## Supported Units

### SI Base Units

`m`, `kg`, `s`, `A`, `K`, `mol`, `cd`

### Named Derived SI Units

`Hz`, `N`, `Pa`, `J`, `W`, `C`, `V`, `F`, `ohm`, `S`, `Wb`, `T`, `H`, `lm`,
`lx`, `Bq`, `Gy`, `Sv`, `kat`

### SI Prefixes

All SI prefixes from quetta (10^30) to quecto (10^-30) are supported on base
and named derived units. For example: `km`, `mg`, `GHz`, `kN`, `nA`.

### Non-SI Units

Time: `min`, `h`, `d` | Length: `in`, `ft`, `mi`, `au` |
Mass: `t`, `lb`, `oz`, `Da` | Volume: `L`, `gal` |
Energy: `eV`, `cal`, `kWh` | Pressure: `atm`, `bar` |
Area: `ha` | Temperature: `degC`, `degF` |
Angle: `deg`, `rad`, `grad`, `turn`, `arcmin`, `arcsec` |
Other: `percent`, `ppm`, `dB`, `Np`


<ReadMore path="/compute-engine/reference/units/" >
See the **Units Reference** for the complete list of functions<Icon name="chevron-right-bold" />
</ReadMore>
