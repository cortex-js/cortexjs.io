<!-- The detail of the entries of /reference/number-theory/. Format: README.md. -->

## Section: Finite arguments

The functions of this library give finite results: there is no meaningful
$φ(\infty)$ or $\sqrt{\mathrm{NaN}}$ to return. The parameter types of their
signatures say so. `integer` and `real` denote finite values, so `+oo`, `-oo`
and `NaN` are not members of either. Where a signature declares one of them,
a non-finite argument is a type error, not a symbolic or an infinite result:

```epsil
nthPrime(+oo)
// ➔ error: Type error: expected `integer`, got `+oo` at `positiveInfinity` in `nthPrime(Infinity)`
integerSqrt(NaN)
// ➔ error: Type error: expected `integer`, got `NaN` at ``NaN`` in `integerSqrt(NaN)`
```

This is the check that rejects a non-integer, and it reports the same error.
The argument has to be a member of the declared type before the function is
applied.

```epsil
integerSqrt(2.5)
// ➔ error: Type error: expected `integer`, got `2.5` at `2.5` in `integerSqrt(2.5)`
```

## Section: Congruences

A congruence `a ≡ b (mod n)` is written `congruent(a, b, n)` (see
[`congruent`](/reference/relop/#congruent)). It is `True` when `a` and `b`
leave the same remainder modulo `n`. Like `divides`, it stays symbolic until
its three operands are integers.

```epsil
congruent(7, 1, 3)
// ➔ "True"
congruent(x, 1, 3)
// ➔ Congruent(x, 1, 3)
```

The remainder itself is `a % n`, the `Mod` function. In LaTeX, `\bmod` is
the operator (`a \bmod n` is `Mod(a, n)`), and `\pmod{n}` is the annotation
of a congruence: `a \equiv b \pmod{n}` is `Congruent(a, b, n)`.

### Reduction of large integers

`%` and `congruent` reduce an integer expression in ℤ/mℤ without computing
its value, which can have millions of digits. Powers, sums, products,
negations and factorials are reduced this way:

```epsil
2^(3^20) % 100
// ➔ 52
congruent(2^(3^20), 52, 100)
// ➔ "True"
2 * 3^5000000 % 7
// ➔ 4
50! % 101
// ➔ 91
```

The result keeps the sign convention of `%`: it has the sign of the divisor.

```epsil
[2^(3^20) % 7, 2^(3^20) % -7]
// ➔ [1,-6]
```

### Solving congruences

`solve` of a linear congruence returns the family of its solutions, with
`ArbitraryInteger(1)` for an arbitrary integer. A congruence with no solution
gives the empty list, and a congruence whose coefficients share a factor with
the modulus is reduced:

```epsil
solve(congruent(6n, 4, 7), n)
// ➔ [3 + 7ArbitraryInteger(1)]
solve(congruent(2x, 1, 4), x)
// ➔ []
solve(congruent(4x, 2, 6), x)
// ➔ [2 + 3ArbitraryInteger(1)]
```

A system of congruences in one unknown, joined with `&&`, is combined into
one family by the Chinese remainder theorem, also when the moduli are not
coprime. A system with no solution gives the empty list.

```epsil
solve(congruent(x, 2, 3) && congruent(x, 3, 5) && congruent(x, 2, 7), x)
// ➔ [23 + 105ArbitraryInteger(1)]
```

To compute the solution from a list of residues and a list of moduli, use
[`chineseRemainder`](/reference/number-theory/#chineseremainder).

## Totient

`totient(n)` counts the integers from 1 to `n` that have no common factor
with `n` other than 1. For `n = 9`, these are 1, 2, 4, 5, 7 and 8, so
φ(9) is 6.

```epsil
totient(9)
// ➔ 6
[totient(0), totient(-12)]
// ➔ [0,4]
```

`eulerPhi`, the Wolfram Language name, is an alias: it becomes `Totient`.

```epsil
eulerPhi(n)
// ➔ Totient(n)
```

See also: [Euler's totient function](https://en.wikipedia.org/wiki/Euler%27s_totient_function).

### MathJSON

`["Totient", n]`. `["EulerPhi", n]` is the same function.

```json example
["Totient", 9]
// ➔ 6

["Totient", -12]
// ➔ 4

["EulerPhi", 12]
// ➔ 4
```

## Sigma0

The number of positive integers that divide `n` with no remainder. The
divisors of 6 are 1, 2, 3 and 6, so `sigma0(6)` is 4. It is
`divisorSigma(0, n)`. For `n ≤ 0`, `sigma0` stays unevaluated, while
`divisorSigma` ignores the sign of `n`:

```epsil
[sigma0(-6), divisorSigma(0, -6)]
// ➔ [Sigma0(-6),4]
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

### MathJSON

`["Sigma0", n]`.

```json example
["Sigma0", 6]
// ➔ 4
```

## Sigma1

The sum of the positive divisors of `n`. The divisors of 6 are 1, 2, 3 and
6, so `sigma1(6)` is 12. It is `divisorSigma(1, n)`.

```epsil
sigma1(6)
// ➔ 12
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

### MathJSON

`["Sigma1", n]`.

```json example
["Sigma1", 6]
// ➔ 12
```

## SigmaMinus1

The sum of the reciprocals of the positive divisors of `n`, an exact
rational. For `n = 6` it is 1 + 1/2 + 1/3 + 1/6, which is 2: 6 is a perfect
number, and the sum is 2 for every perfect number. It is
`divisorSigma(-1, n)`.

```epsil
[sigmaMinus1(6), sigmaMinus1(12)]
// ➔ [2,7/3]
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

### MathJSON

`["SigmaMinus1", n]`.

```json example
["SigmaMinus1", 6]
// ➔ 2
```

## NthPrime

The function is named `nthPrime`, not `prime`, because `Prime` is the
derivative notation of the Compute Engine (as in `f'`). `primeNumber` is an
alias: it becomes `NthPrime`. For `n < 1` the expression stays unevaluated.

```epsil
[nthPrime(1), nthPrime(2), nthPrime(1000)]
// ➔ [2,3,7919]
[nthPrime(0), primeNumber(n)]
// ➔ [NthPrime(0),NthPrime(n)]
```

See also: [Prime number](https://en.wikipedia.org/wiki/Prime_number).

### MathJSON

`["NthPrime", n]`. `["PrimeNumber", n]` is the same function.

```json example
["NthPrime", 10]
// ➔ 29
```

## NextPrime

`nextPrime(n, -1)` is the largest prime less than `n`. When there is no such
prime, the expression stays unevaluated.

```epsil
[nextPrime(10, 3), nextPrime(-5)]
// ➔ [17,2]
nextPrime(2, -1)
// ➔ NextPrime(2, -1)
```

See also: [Prime number](https://en.wikipedia.org/wiki/Prime_number).

### MathJSON

`["NextPrime", n]`, `["NextPrime", n, k]`.

```json example
["NextPrime", 10]
// ➔ 11

["NextPrime", 10, 3]
// ➔ 17

["NextPrime", 10, -1]
// ➔ 7
```

## FactorInteger

360 is 2³ · 3² · 5, so its factorization is the list of the tuples
`(2, 3)`, `(3, 2)` and `(5, 1)`.

```epsil
factorInteger(-360)
// ➔ [(-1, 1),(2, 3),(3, 2),(5, 1)]
[factorInteger(1), factorInteger(0)]
// ➔ [[(1, 1)],[(0, 1)]]
```

See also: [Integer factorization](https://en.wikipedia.org/wiki/Integer_factorization).

### MathJSON

`["FactorInteger", n]`.

```json example
["FactorInteger", 360]
// ➔ [(2, 3), (3, 2), (5, 1)]

["FactorInteger", ["Rational", 12, 35]]
// ➔ [(2, 2), (3, 1), (5, -1), (7, -1)]
```

## Divisors

`divisors(0)` stays unevaluated: every integer divides 0.

```epsil
divisors(-12)
// ➔ [1,2,3,4,6,12]
divisors(0)
// ➔ Divisors(0)
```

See also: [Divisor](https://en.wikipedia.org/wiki/Divisor).

### MathJSON

`["Divisors", n]`.

```json example
["Divisors", 12]
// ➔ [1, 2, 3, 4, 6, 12]
```

## Divides

Every integer divides 0, and 0 divides only 0. `notDivides(a, b)` is the
negation, `a ∤ b`.

```epsil
[divides(4, 10), notDivides(4, 10)]
// ➔ ["False","True"]
[divides(5, 0), divides(0, 0), divides(0, 5)]
// ➔ ["True","True","False"]
```

A symbolic operand keeps the relation unevaluated. A number that is not an
integer is a type error.

```epsil
divides(a, b)
// ➔ Divides(a, b)
divides(2.5, 5)
// ➔ error: Type error: expected `integer`, got `2.5` at `2.5` in `divides(2.5, 5)`
```

### MathJSON

`["Divides", a, b]`, `["NotDivides", a, b]`. In LaTeX, `a \mid b` is
`["Divides", a, b]`, and `a \nmid b` is `["Not", ["Divides", a, b]]`.

```json example
["Divides", 3, 12]
// ➔ "True"

["Divides", 4, 10]
// ➔ "False"

["NotDivides", 4, 10]
// ➔ "True"
```

## PrimeFactors

### MathJSON

`["PrimeFactors", n]`.

```json example
["PrimeFactors", 360]
// ➔ [2, 3, 5]
```

## Radical

### MathJSON

`["Radical", n]`.

```json example
["Radical", 360]
// ➔ 30
```

## PrimeNu

`primeNu` counts each prime factor once, `primeOmega` counts it as many times
as it divides `n`. 360 is 2³ · 3² · 5:

```epsil
[primeNu(360), primeOmega(360)]
// ➔ [3,6]
```

See also: [Prime omega function](https://en.wikipedia.org/wiki/Prime_omega_function).

### MathJSON

`["PrimeNu", n]`.

```json example
["PrimeNu", 360]
// ➔ 3
```

## PrimeOmega

See also: [Prime omega function](https://en.wikipedia.org/wiki/Prime_omega_function).

### MathJSON

`["PrimeOmega", n]`.

```json example
["PrimeOmega", 360]
// ➔ 6
```

## MoebiusMu

12 is divisible by 4, and 30 is 2 · 3 · 5, a product of three distinct
primes:

```epsil
[moebiusMu(1), moebiusMu(12), moebiusMu(30)]
// ➔ [1,0,-1]
```

See also: [Möbius function](https://en.wikipedia.org/wiki/M%C3%B6bius_function).

### MathJSON

`["MoebiusMu", n]`.

```json example
["MoebiusMu", 30]
// ➔ -1
```

## IsSquareFree

```epsil
[isSquareFree(2/3), isSquareFree(2/9)]
// ➔ ["True","False"]
```

### MathJSON

`["IsSquareFree", n]`.

```json example
["IsSquareFree", 30]
// ➔ "True"
```

## IsPerfectPower

-8 is (-2)³, but -4 is not a perfect power: its square roots are not real.
1 is not a perfect power.

```epsil
[isPerfectPower(-8), isPerfectPower(-4), isPerfectPower(1)]
// ➔ ["True","False","False"]
[n for n in 1..70 if isPerfectPower(n)]
// ➔ [4,8,9,16,25,27,32,36,49,64]
```

See also: [Perfect power](https://en.wikipedia.org/wiki/Perfect_power).

### MathJSON

`["IsPerfectPower", n]`.

```json example
["IsPerfectPower", 64]
// ➔ "True"
```

## PrimePi

`n` can be any real number:

```epsil
[primePi(10.5), primePi(-3)]
// ➔ [4,0]
```

See also: [Prime-counting function](https://en.wikipedia.org/wiki/Prime-counting_function).

### MathJSON

`["PrimePi", n]`.

```json example
["PrimePi", 10]
// ➔ 4
```

## RandomPrime

A range that holds no prime leaves the expression unevaluated:

```epsil
randomPrime(24, 28)
// ➔ RandomPrime(24, 28)
randomPrime(10, 20)
```

### MathJSON

`["RandomPrime", n]`, `["RandomPrime", m, n]`.

```json example
["RandomPrime", 100]
// ➔ 47 (for example)
```

## PowerMod

When the modular inverse that a negative exponent or a rational base needs
does not exist, the expression stays unevaluated. So does a rational
exponent `s/r` when no `x` has `x^r ≡ a^s (mod m)`.

```epsil
powerMod(3, -1, 7)
// ➔ 5
powerMod(2, -1, 4)
// ➔ PowerMod(2, -1, 4)
powerMod(1/2, 2, 4)
// ➔ PowerMod(1/2, 2, 4)
powerMod(3, 1/2, 7)
// ➔ PowerMod(3, 1/2, 7)
```

A list operand threads:

```epsil
powerMod([2, 3], 2, 7)
// ➔ [4,2]
```

The rational exponent follows the Wolfram Language. The function works on
big integers. It stays unevaluated, rather than give a wrong answer, when the
modulus cannot be factored or a discrete logarithm is out of reach.

See also: [Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation).

### MathJSON

`["PowerMod", a, b, m]`.

```json example
["PowerMod", 2, 10, 1000]
// ➔ 24

["PowerMod", ["Rational", 1, 2], 2, 7]
// ➔ 2

["PowerMod", ["List", 2, 3], 2, 7]
// ➔ [4, 2]

["PowerMod", 4, ["Rational", 1, 2], 7]
// ➔ 2
```

## PowerModList

3 is not a square modulo 7, so it has no square root there. Modulo 8, 1 has
four square roots.

```epsil
powerModList(3, 1/2, 7)
// ➔ []
powerModList(1, 1/2, 8)
// ➔ [1,3,5,7]
```

As for `powerMod`, a rational base `p/q` is `p` times the inverse of `q`
modulo `m`, and a list operand threads:

```epsil
powerModList(1/2, 2, 7)
// ➔ [2]
powerModList([2, 3], 2, 7)
// ➔ [[4],[2]]
```

The expression stays unevaluated when the modulus cannot be factored or the
list would have more than 100000 entries.

### MathJSON

`["PowerModList", a, e, m]`.

```json example
["PowerModList", 3, ["Rational", 1, 2], 11]
// ➔ [5, 6]

["PowerModList", ["List", 2, 3], 2, 7]
// ➔ [[4], [2]]
```

## RationalReconstruction

The function works on big integers. A result whose denominator is 1 is an
integer.

```epsil
rationalReconstruction(123456789, 1000000007)
// ➔ -161/81
rationalReconstruction(2, 11)
// ➔ 2
```

### MathJSON

`["RationalReconstruction", a, m]`.

```json example
["RationalReconstruction", 6, 11]
// ➔ 1/2
```

## ModularInverse

For `m > 0`, the inverse is in the range `[0, m)`. When `a` and `m` are not
coprime, the inverse does not exist and the expression stays unevaluated.

```epsil
[modularInverse(10, 7), modularInverse(-3, 7)]
// ➔ [5,2]
modularInverse(4, 6)
// ➔ ModularInverse(4, 6)
```

See also: [Modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse).

### MathJSON

`["ModularInverse", a, m]`.

```json example
["ModularInverse", 3, 7]
// ➔ 5

["ModularInverse", 4, 6]
// ➔ ["ModularInverse", 4, 6]
```

## ExtendedGCD

240 · (-9) + 46 · 47 is 2, the GCD of 240 and 46:

```epsil
extendedGCD(240, 46)
// ➔ (2, -9, 47)
extendedGCD(-12, 18)
// ➔ (6, 1, 1)
```

See also: [Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm).

### MathJSON

`["ExtendedGCD", a, b, ...rest]`.

```json example
["ExtendedGCD", 12, 18]
// ➔ (6, -1, 1)

["ExtendedGCD", 12, 18, 27]
// ➔ (3, 4, -4, 1)
```

## ChineseRemainder

The moduli do not have to be coprime. An inconsistent system leaves the
expression unevaluated:

```epsil
chineseRemainder([1, 3], [4, 6])
// ➔ 9
chineseRemainder([1, 2], [4, 6])
// ➔ ChineseRemainder([1,2], [4,6])
```

To solve a system of congruences written with `congruent`, see
[Solving congruences](#solving-congruences).

See also: [Chinese remainder theorem](https://en.wikipedia.org/wiki/Chinese_remainder_theorem).

### MathJSON

`["ChineseRemainder", residues, moduli]`,
`["ChineseRemainder", residues, moduli, d]`.

```json example
["ChineseRemainder", ["List", 2, 3, 2], ["List", 3, 5, 7]]
// ➔ 23

["ChineseRemainder", ["List", 2, 3, 2], ["List", 3, 5, 7], 100]
// ➔ 128
```

## IntegerSqrt

For a negative `n`, the expression stays unevaluated.

```epsil
[integerSqrt(26), integerSqrt(123456789)]
// ➔ [5,11111]
integerSqrt(-4)
// ➔ IntegerSqrt(-4)
```

See also: [Integer square root](https://en.wikipedia.org/wiki/Integer_square_root).

### MathJSON

`["IntegerSqrt", n]`.

```json example
["IntegerSqrt", 17]
// ➔ 4
```

## CarmichaelLambda

λ(n) divides φ(n), and can be smaller:

```epsil
[carmichaelLambda(8), totient(8)]
// ➔ [2,4]
carmichaelLambda(1)
// ➔ 1
```

See also: [Carmichael function](https://en.wikipedia.org/wiki/Carmichael_function).

### MathJSON

`["CarmichaelLambda", n]`.

```json example
["CarmichaelLambda", 15]
// ➔ 4
```

## LucasL

`lucas` is an alias: it becomes `LucasL`.

```epsil
[lucasL(0), lucasL(1), lucasL(2), lucasL(3)]
// ➔ [2,1,3,4]
[lucasL(-5), lucasL(-4)]
// ➔ [-11,7]
lucas(n)
// ➔ LucasL(n)
```

See also: [Lucas number](https://en.wikipedia.org/wiki/Lucas_number).

### MathJSON

`["LucasL", n]`. `["Lucas", n]` is the same function.

```json example
["LucasL", 10]
// ➔ 123
```

## CatalanNumber

A positive half-integer gives an exact value, and a float gives a float.
Another exact rational stays unevaluated, and `N` evaluates it numerically
from Γ(2n+1) / (Γ(n+1) Γ(n+2)). A negative non-integer stays unevaluated.

```epsil
[catalanNumber(3/2), catalanNumber(5/2)]
// ➔ [64 / (15pi),1024 / (105pi)]
catalanNumber(2.5)
// ➔ 3.1042792709733490253
[catalanNumber(1/3), catalanNumber(-1/2)]
// ➔ [CatalanNumber(1/3),CatalanNumber(-1/2)]
N(catalanNumber(1/3))
// ➔ 0.849070020544739550675
```

See also: [Catalan number](https://en.wikipedia.org/wiki/Catalan_number).

### MathJSON

`["CatalanNumber", n]`.

```json example
["CatalanNumber", 5]
// ➔ 42
```

## BernoulliB

```epsil
[bernoulliB(0), bernoulliB(1), bernoulliB(3), bernoulliB(12)]
// ➔ [1,-1/2,0,-691/2730]
```

See also: [Bernoulli number](https://en.wikipedia.org/wiki/Bernoulli_number).

### MathJSON

`["BernoulliB", n]`.

```json example
["BernoulliB", 12]
// ➔ -691/2730
```

## EulerE

`eulerE(n)` is an exact integer for an integer `n ≥ 0`.

```epsil
[eulerE(0), eulerE(1), eulerE(2), eulerE(6)]
// ➔ [1,0,-1,-61]
eulerE(-1)
// ➔ EulerE(-1)
```

`eulerE(n, x)` is exact at an exact `x` and a float at a float `x`, real or
complex in both cases. At a symbol, it is the expanded polynomial.

```epsil
[eulerE(2, 1/3), eulerE(2, 0.5)]
// ➔ [-2/9,-0.25]
eulerE(3, 1 + 2i)
// ➔ (-25/4 - 8i)
```

See also: [Euler numbers](https://en.wikipedia.org/wiki/Euler_numbers).

### MathJSON

`["EulerE", n]`, `["EulerE", n, x]`.

```json example
["EulerE", 4]
// ➔ 5

["EulerE", 2, "x"]
// ➔ x^2 - x

["EulerE", 3, ["Complex", 1, 2]]
// ➔ -25/4 - 8i
```

## ContinuedFraction

With `n`, a quadratic irrational is expanded to exactly `n` terms:

```epsil
continuedFraction(sqrt(2), 5)
// ➔ [1,2,2,2,2]
continuedFraction(sqrt(7))
// ➔ [2,[1,1,1,4]]
```

Another exact real, such as `e` or `pi`, is expanded to `n` terms (20 by
default). Each term is checked at double the working precision; when one
cannot be confirmed, the expression stays unevaluated.

```epsil
continuedFraction(e, 8)
// ➔ [2,1,2,1,1,4,1,1]
continuedFraction(pi, 5)
// ➔ [3,7,15,1,292]
```

For a float, the round-off of the value can put large terms in the tail of
the expansion.

```epsil
continuedFraction(3.14159)
// ➔ [3,7,15,1,25,1,7,4]
```

See also: [Continued fraction](https://en.wikipedia.org/wiki/Continued_fraction).

### MathJSON

`["ContinuedFraction", x]`, `["ContinuedFraction", x, n]`.

```json example
["ContinuedFraction", ["Rational", 43, 19]]
// ➔ [2, 3, 1, 4]

["ContinuedFraction", ["Sqrt", 2]]
// ➔ [1, [2]]
```

## FromContinuedFraction

It is the inverse of `continuedFraction`:

```epsil
fromContinuedFraction([3, 7, 15, 1])
// ➔ 355/113
fromContinuedFraction([2, [1, 1, 1, 4]])
// ➔ sqrt(7)
```

### MathJSON

`["FromContinuedFraction", terms]`.

```json example
["FromContinuedFraction", ["List", 2, 3, 1, 4]]
// ➔ 43/19

["FromContinuedFraction", ["List", 1, ["List", 2]]]
// ➔ ["Sqrt", 2]
```

## IntegerDigits

```epsil
integerDigits(-255, 16)
// ➔ [15,15]
integerDigits(5, 2, 8)
// ➔ [0,0,0,0,0,1,0,1]
integerDigits(1234, 10, 2)
// ➔ [3,4]
```

`length` is at most 1,000,000. A larger length leaves the expression
unevaluated.

```epsil
integerDigits(5, 2, 2000000)
// ➔ IntegerDigits(5, 2, 2000000)
```

### MathJSON

`["IntegerDigits", n]`, `["IntegerDigits", n, base]`,
`["IntegerDigits", n, base, length]`.

```json example
["IntegerDigits", 255, 16]
// ➔ [15, 15]
```

## DigitCount

The list has one count for each digit of the base, the count of 0 last.
1223 has one 1, two 2s and one 3; 10 is `1010` in base 2.

```epsil
digitCount(1223)
// ➔ [1,2,1,0,0,0,0,0,0,0]
digitCount(10, 2)
// ➔ [2,2]
```

`length` is at most 1,000,000. A larger length leaves the expression
unevaluated.

### MathJSON

`["DigitCount", n, base]`, `["DigitCount", n, base, digit]`,
`["DigitCount", n, base, digit, length]`.

```json example
["DigitCount", 122, 10, 2]
// ➔ 2

["DigitCount", 5, 2, 0, 8]
// ➔ 6
```

## FromDigits

An integer base of any sign gives an exact integer. Another base gives the
sum of `d_k · base^k`, which is exact; `N` evaluates it numerically.

```epsil
fromDigits([1, 0, 1, 1], 2)
// ➔ 11
fromDigits([1, 12], 10)
// ➔ 22
fromDigits([1, 2, 3], 1/2)
// ➔ 17/4
fromDigits([1, 2, 3], pi)
// ➔ 3 + 2pi + pi^2
N(fromDigits([1, 2, 3], pi))
// ➔ 19.1527897082689450958
```

### MathJSON

`["FromDigits", digits]`, `["FromDigits", digits, base]`.

```json example
["FromDigits", ["List", 1, 2, 3, 4]]
// ➔ 1234

["FromDigits", ["List", 1, 1, 0], -2]
// ➔ 2

["FromDigits", ["List", "a", "b", "c"], "x"]
// ➔ a x^2 + b x + c
```

## DigitSum

```epsil
digitSum(255, 16)
// ➔ 30
[digitSum(1234, 10, -2), digitSum(1234, 10, 9)]
// ➔ [7,10]
```

### MathJSON

`["DigitSum", n]`, `["DigitSum", n, base]`, `["DigitSum", n, base, k]`.

```json example
["DigitSum", 1234]
// ➔ 10

["DigitSum", 1234, 10, 2]
// ➔ 3
```

## DivisorSigma

`divisorSigma(0, n)` is `sigma0(n)` and `divisorSigma(1, n)` is
`sigma1(n)`. A negative `k` gives σ₋ₖ(n) / nᵏ.

```epsil
[divisorSigma(0, 12), divisorSigma(1, 12), divisorSigma(3, 6)]
// ➔ [6,28,252]
[divisorSigma(1, -12), divisorSigma(1, 0)]
// ➔ [28,DivisorSigma(1, 0)]
divisorSigma(-2, 6)
// ➔ 25/18
```

See also: [Divisor function](https://en.wikipedia.org/wiki/Divisor_function).

### MathJSON

`["DivisorSigma", k, n]`.

```json example
["DivisorSigma", 2, 6]
// ➔ 50
```

## JacobiSymbol

For an even or a negative `n`, the expression stays unevaluated.

```epsil
[jacobiSymbol(2, 15), jacobiSymbol(3, 9)]
// ➔ [1,0]
[jacobiSymbol(5, 20), jacobiSymbol(5, -21)]
// ➔ [JacobiSymbol(5, 20),JacobiSymbol(5, -21)]
```

See also: [Jacobi symbol](https://en.wikipedia.org/wiki/Jacobi_symbol).

### MathJSON

`["JacobiSymbol", a, n]`.

```json example
["JacobiSymbol", 5, 21]
// ➔ 1
```

## LegendreSymbol

2 is a square modulo 7 (3² is 9), and 14 is a multiple of 7. When `p` is not
an odd prime, the expression stays unevaluated.

```epsil
[legendreSymbol(2, 7), legendreSymbol(14, 7)]
// ➔ [1,0]
[legendreSymbol(3, 9), legendreSymbol(3, 2)]
// ➔ [LegendreSymbol(3, 9),LegendreSymbol(3, 2)]
```

See also: [Legendre symbol](https://en.wikipedia.org/wiki/Legendre_symbol).

### MathJSON

`["LegendreSymbol", a, p]`.

```json example
["LegendreSymbol", 3, 7]
// ➔ -1
```

## MultiplicativeOrder

The sign of `n` is ignored, because the unit group modulo `-n` is the unit
group modulo `n`. When `a` and `n` are not coprime, or `n` is 0, the
expression stays unevaluated.

```epsil
multiplicativeOrder(3, -7)
// ➔ 6
[multiplicativeOrder(2, 6), multiplicativeOrder(2, 0)]
// ➔ [MultiplicativeOrder(2, 6),MultiplicativeOrder(2, 0)]
```

With a list of residues, the expression stays unevaluated when no element of
the list is a power of `a`. The powers of 2 modulo 7 are 2, 4 and 1:

```epsil
multiplicativeOrder(2, 7, [3, 5])
// ➔ MultiplicativeOrder(2, 7, [3,5])
```

See also: [Multiplicative order](https://en.wikipedia.org/wiki/Multiplicative_order).

### MathJSON

`["MultiplicativeOrder", a, n]`, `["MultiplicativeOrder", a, n, residues]`.

```json example
["MultiplicativeOrder", 2, 7]
// ➔ 3

["MultiplicativeOrder", 3, -7]
// ➔ 6

["MultiplicativeOrder", 5, 7, ["List", 3, 11]]
// ➔ 2
```

## PrimitiveRoot

The sign of `n` is ignored, because the unit group modulo `-n` is the unit
group modulo `n`. When there is no primitive root, the expression stays
unevaluated.

```epsil
[primitiveRoot(-7), primitiveRoot(1)]
// ➔ [3,0]
[primitiveRoot(8), primitiveRoot(0)]
// ➔ [PrimitiveRoot(8),PrimitiveRoot(0)]
```

See also: [Primitive root modulo n](https://en.wikipedia.org/wiki/Primitive_root_modulo_n).

### MathJSON

`["PrimitiveRoot", n]`.

```json example
["PrimitiveRoot", 7]
// ➔ 3

["PrimitiveRoot", -7]
// ➔ 3
```

## PrimitiveRootList

```epsil
primitiveRootList(25)
// ➔ [2,3,8,12,13,17,22,23]
[primitiveRootList(1), primitiveRootList(0), primitiveRootList(-7)]
// ➔ [[0],[],[3,5]]
```

### MathJSON

`["PrimitiveRootList", n]`.

```json example
["PrimitiveRootList", 25]
// ➔ [2, 3, 8, 12, 13, 17, 22, 23]

["PrimitiveRootList", 8]
// ➔ []
```

## Eulerian

An ascent is a position where the next number is greater than the one
before it. Of the 24 permutations of 1, 2, 3, 4, eleven have exactly two
ascents.

```epsil
[eulerian(4, 0), eulerian(4, 1), eulerian(4, 2), eulerian(4, 3)]
// ➔ [1,11,11,1]
```

Outside the triangle the value is 0: `eulerian(n, m)` is 0 for `m ≥ n > 0`.
`eulerian(0, 0)` is 1. A negative or symbolic operand leaves the expression
unevaluated.

```epsil
[eulerian(3, 5), eulerian(3, 3), eulerian(0, 0)]
// ➔ [0,0,1]
[eulerian(-1, 0), eulerian(n, 2)]
// ➔ [Eulerian(-1, 0),Eulerian(n, 2)]
```

See also: [Eulerian number](https://en.wikipedia.org/wiki/Eulerian_number).

### MathJSON

`["Eulerian", n, m]`.

```json example
["Eulerian", 4, 2]
// ➔ 11

["Eulerian", 3, 5]
// ➔ 0
```

## Stirling

There are 15 ways to split a set of 5 objects into 2 groups, none of them
empty.

```epsil
stirling(5, 2)
// ➔ 15
```

Outside the triangle (`m > n`) the value is 0, as for `binomial`, and so is
the value of `stirlingS1`. A negative or symbolic operand leaves the
expression unevaluated.

```epsil
[stirling(3, 5), stirlingS1(3, 5)]
// ➔ [0,0]
[stirling(-1, 2), stirling(n, 2)]
// ➔ [Stirling(-1, 2),Stirling(n, 2)]
```

`stirlingS2`, the Wolfram Language name, is an alias: it becomes `Stirling`.

```epsil
stirlingS2(n, k)
// ➔ Stirling(n, k)
```

See also: [Stirling numbers of the second kind](https://en.wikipedia.org/wiki/Stirling_numbers_of_the_second_kind).

### MathJSON

`["Stirling", n, m]`. `["StirlingS2", n, m]` is the same function.

```json example
["Stirling", 5, 2]
// ➔ 15

["StirlingS2", 6, 3]
// ➔ 90
```

## NPartition

The number of ways to write `n` as a sum of positive integers, without
regard to their order. 5 has 7 partitions: 5, 4+1, 3+2, 3+1+1, 2+2+1,
2+1+1+1 and 1+1+1+1+1.
[`integerPartitions`](/reference/combinatorics/#integerpartitions) lists
them.

```epsil
nPartition(5)
// ➔ 7
nPartition(5) == length(integerPartitions(5))
// ➔ "True"
[nPartition(100), nPartition(-3)]
// ➔ [190569292,0]
```

`partitionsP`, the Wolfram Language name, is an alias: it becomes
`NPartition`.

```epsil
partitionsP(n)
// ➔ NPartition(n)
```

See also: [Partition (number theory)](https://en.wikipedia.org/wiki/Partition_(number_theory)).

### MathJSON

`["NPartition", n]`. `["PartitionsP", n]` is the same function.

```json example
["NPartition", 5]
// ➔ 7

["NPartition", -3]
// ➔ 0
```

## PartitionsQ

By Euler's theorem, the partitions into distinct parts and the partitions
into odd parts are equally many (OEIS A000009). 5 has 3 of each: 5, 4+1 and
3+2, or 5, 3+1+1 and 1+1+1+1+1.

```epsil
[partitionsQ(5), partitionsQ(-3)]
// ➔ [3,0]
```

### MathJSON

`["PartitionsQ", n]`.

```json example
["PartitionsQ", 10]
// ➔ 10
```

## IsTriangular

The `k`th triangular number is `k(k+1)/2`, the number of objects in a
triangle with `k` rows: 15 is 5 · 6 / 2. 0 is not counted.

```epsil
[n for n in 1..60 if isTriangular(n)]
// ➔ [1,3,6,10,15,21,28,36,45,55]
[isTriangular(15), isTriangular(16), isTriangular(0)]
// ➔ ["True","False","False"]
```

Like the other predicates of this library, `isTriangular` applies to each
element of a list, and stays unevaluated for a symbol.

See also: [Triangular number](https://en.wikipedia.org/wiki/Triangular_number).

### MathJSON

`["IsTriangular", n]`.

```json example
["IsTriangular", 15]
// ➔ "True"
```

## IsSquare

A perfect square is the square of an integer: 16 is 4². 0 is a perfect
square, and a negative number is not.

```epsil
isSquare([0, 2, 4, 9, -4])
// ➔ ["True","False","True","True","False"]
isSquare(x)
// ➔ IsSquare(x)
```

See also: [Square number](https://en.wikipedia.org/wiki/Square_number).

### MathJSON

`["IsSquare", n]`.

```json example
["IsSquare", 16]
// ➔ "True"
```

## IsOctahedral

The `k`th octahedral number is `k(2k² + 1)/3`, the number of spheres in an
octahedron: 19 is 3 · 19 / 3.

```epsil
[n for n in 1..200 if isOctahedral(n)]
// ➔ [1,6,19,44,85,146]
[isOctahedral(19), isOctahedral(20)]
// ➔ ["True","False"]
```

See also: [Octahedral number](https://en.wikipedia.org/wiki/Octahedral_number).

### MathJSON

`["IsOctahedral", n]`.

```json example
["IsOctahedral", 19]
// ➔ "True"
```

## IsCenteredSquare

The `k`th centered square number is `k² + (k+1)²`: a dot in the center and
the square layers of dots around it.

```epsil
[isCenteredSquare(5), isCenteredSquare(6)]
// ➔ ["True","False"]
```

See also: [Centered square numbers, OEIS A001844](https://oeis.org/A001844).

### MathJSON

`["IsCenteredSquare", n]`.

```json example
["IsCenteredSquare", 5]
// ➔ "True"
```

## IsPerfect

A perfect number is the sum of its positive divisors other than itself: 28
is 1 + 2 + 4 + 7 + 14. For `n < 1` the result is `False`.

```epsil
[isPerfect(28), isPerfect(12), isPerfect(-6)]
// ➔ ["True","False","False"]
[n for n in 1..10000 if isPerfect(n)]
// ➔ [6,28,496,8128]
```

See also: [Perfect number](https://en.wikipedia.org/wiki/Perfect_number).

### MathJSON

`["IsPerfect", n]`.

```json example
["IsPerfect", 28]
// ➔ "True"
```

## IsHappy

19 is happy: 1² + 9² is 82, 8² + 2² is 68, 6² + 8² is 100, and
1² + 0² + 0² is 1.

```epsil
[n for n in 1..50 if isHappy(n)]
// ➔ [1,7,10,13,19,23,28,31,32,44,49]
```

See also: [Happy number](https://en.wikipedia.org/wiki/Happy_number).

### MathJSON

`["IsHappy", n]`.

```json example
["IsHappy", 19]
// ➔ "True"
```

## IsAbundant

The sum of the divisors of 12 other than itself, 1 + 2 + 3 + 4 + 6, is 16,
more than 12. 945 is the smallest odd abundant number. For `n < 1` the
result is `False`.

```epsil
[isAbundant(12), isAbundant(6), isAbundant(945)]
// ➔ ["True","False","True"]
```

See also: [Abundant number](https://en.wikipedia.org/wiki/Abundant_number).

### MathJSON

`["IsAbundant", n]`.

```json example
["IsAbundant", 12]
// ➔ "True"
```
