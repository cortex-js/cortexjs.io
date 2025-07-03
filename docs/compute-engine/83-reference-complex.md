---
title: Complex
slug: /compute-engine/reference/complex/
---


## Constants

| Symbol          | Description         | |
| :-------------- | :------------------ | --------------------------------------------- |
| `ImaginaryUnit` | $$ \imaginaryI $$ | The imaginary unit, solution of $$x^2+1=0$$ |


## Functions

<nav className="hidden">
### Real
</nav>
<FunctionDefinition name="Real">

<Signature name="Real">_z_</Signature>

<Latex value="\Re(3+4\imaginaryI)"/>

Evaluate to the real part of a complex number.

```json example
["Real", ["Complex", 3, 4]]
// ➔ 3
```

</FunctionDefinition>

<nav className="hidden">
### Imaginary
</nav>
<FunctionDefinition name="Imaginary">

<Signature name="Imaginary">_z_</Signature>

<Latex value="\Im(3+4\imaginaryI)"/>

Evaluate to the imaginary part of a complex number. If _z_ is a real number, the
imaginary part is zero.

```json example
["Imaginary", ["Complex", 3, 4]]
// ➔ 4

["Imaginary", "Pi"]
// ➔ 0
```

</FunctionDefinition>

<nav className="hidden">
### Conjugate
</nav>
<FunctionDefinition name="Conjugate">

<Signature name="Conjugate">_z_</Signature>

<Latex value="z^\ast"/>

Evaluate to the complex conjugate of a complex number. The conjugates of complex
numbers give the mirror image of the complex number about the real axis.

$$
z^\ast = \Re z - \imaginaryI \Im z
$$

```json example
["Conjugate", ["Complex", 3, 4]]
// ➔ ["Complex", 3, -4]
```

</FunctionDefinition>

<nav className="hidden">
### Abs
</nav>
<FunctionDefinition name="Abs">

<Signature name="Abs">_z_</Signature>

<Latex value="|z|"/>

<Latex value="\operatorname{abs}(z)"/>

Evaluate to the magnitude of a complex number.

The **magnitude** of a complex number is the distance from the origin to the
point representing the complex number in the complex plane.

$$ 
|z| = \sqrt{(\Im z)^2 + (\Re z)^2}
$$

```json example
["Abs", ["Complex", 3, 4]]
// ➔ 5
```

</FunctionDefinition>

<nav className="hidden">
### Arg
</nav>
<FunctionDefinition name="Arg">

<Signature name="Arg">_z_</Signature>

<Latex value="\arg(z)"/>

Evaluate to the argument of a complex number.

The **argument** of a complex number is the angle between the positive real axis
and the line joining the origin to the point representing the complex number in
the complex plane.

$$
\arg z = \tan^{-1} \frac{\Im z}{\Re z}
$$

```json example
["Arg", ["Complex", 3, 4]]
// ➔ 0.9272952180016122
```

</FunctionDefinition>

<nav className="hidden">
### AbsArg
</nav>
<FunctionDefinition name="AbsArg">

<Signature name="AbsArg">_z_</Signature>

Return a tuple of the magnitude and argument of a complex number.

This corresponds to the polar representation of a complex number.

```json example
["AbsArg", ["Complex", 3, 4]]
// ➔ [5, 0.9272952180016122]
```

$$
3+4\imaginaryI = 5 (\cos 0.9272 + \imaginaryI \sin 0.9272) = 5
\exponentialE^{0.9272}
$$

</FunctionDefinition>

<nav className="hidden">
### ComplexRoots
</nav>
<FunctionDefinition name="ComplexRoots">

<Signature name="ComplexRoots">_z_, _n_</Signature>

<Latex value="\operatorname{ComplexRoot}(1, 3)"/>

Retrurn a list of the n<sup>th</sup> roots of a number _z_.

The complex roots of a number are the solutions of the equation $$z^n = a$$.

- Wikipedia: [n<sup>th</sup> root](https://en.wikipedia.org/wiki/Nth_root)
- Wikipedia: [Root of unity](https://en.wikipedia.org/wiki/Root_of_unity)
- Wolfram MathWorld: [Root of unity](http://mathworld.wolfram.com/nthRoot.html)

```json example
// The three complex roots of unity (1)
["ComplexRoots", 1, 3]
// ➔ [1, -1/2 + sqrt(3)/2, -1/2 - sqrt(3)/2]
```

</FunctionDefinition>

