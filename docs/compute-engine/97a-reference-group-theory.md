---
title: Permutation Groups
slug: /compute-engine/reference/group-theory/
---

# Permutation Groups

The optional group-theory library provides exact finite permutation computations.
It includes permutation arithmetic, groups described by generators, orbits,
transversals, membership, orders, point stabilizers, and subgroup relationships.
It is a native Compute Engine implementation; it does not require a GAP runtime.

## Loading the library

```ts
import { ComputeEngine } from '@cortex-js/compute-engine';
import {
  loadGroupTheory,
  type GroupTheoryLoadOptions,
  type GroupTheoryLoadReport,
} from '@cortex-js/compute-engine/group-theory';

const ce = new ComputeEngine();
const options: GroupTheoryLoadOptions = { maxChainWork: 50_000_000 };
const report: GroupTheoryLoadReport = loadGroupTheory(ce, options);

const group = ce.box([
  'PermutationGroup',
  ['List',
    ['Permutation', ['List', 2, 1]],
    ['Permutation', ['List', 2, 3, 1]],
  ],
  ['PermutationAction', 3],
]);
ce.function('PermutationGroupOrder', [group]).evaluate(); // 6
```

The loader is synchronous. Loading the same engine again with equal effective
options returns the registration report without replacing its definitions.
Changing options on an already-loaded engine throws an error. A fresh engine
can use different ceilings. The default library does not register these operators.

## Values and multiplication

`Permutation([2, 3, 1])` maps 1 to 2, 2 to 3, and 3 to 1. Its image list must
contain each integer from 1 through the list length exactly once. Points beyond
the list are fixed. Trailing fixed points are removed: `Permutation([2, 1, 3])`
and `Permutation([2, 1])` are the same value. The identity is `Permutation([])`.

`PermutationAction(n)` explicitly declares the points 1 through n, including
fixed points. Degree zero is allowed. Every generator must fit inside the action.
A group with no generators is the trivial group on that action.

Products use a **right action**: applying `PermutationCompose(a, b)` means
applying a first, then b. Thus i^(ab) = (i^a)^b. In particular:

- `PermutationConjugate(a, b)` is b⁻¹ab.
- `PermutationCommutator(a, b)` is a⁻¹b⁻¹ab.
- `PermutationPower(a, k)` accepts exact positive, zero, and negative integers.

Use these named operators for ordered multiplication. Generic arithmetic does
not currently express the noncommutative permutation product.

A group value preserves its action and ordered generator list, including
repetitions. Two different descriptions can generate the same subgroup.
Use `PermutationGroupEqual(G, H)` for mathematical subgroup equality;
expression equality compares the descriptions. Groups on different actions
are incompatible, even if they are abstractly isomorphic.

## Operators

The examples below use Epsil call syntax after loading the library into its engine.
The same names are available as MathJSON heads.

| Operation | Result |
| :--- | :--- |
| `Permutation(images)` | A checked permutation |
| `PermutationAction(n)` | A finite action |
| `PermutationCompose(a, b)` | The ordered product ab |
| `PermutationInverse(a)` | The inverse of a |
| `PermutationApply(a, point, action)` | The image of a point |
| `PermutationInAction(a, action)` | a, after checking that it fits the action |
| `PermutationCycles(a)` | Nontrivial disjoint cycles, starting at their least point |
| `PermutationOrder(a)` | Exact element order |
| `PermutationPower(a, k)` | The exact integer power |
| `PermutationConjugate(a, b)` | b⁻¹ab |
| `PermutationCommutator(a, b)` | a⁻¹b⁻¹ab |
| `PermutationGroup(generators, action)` | A group description |
| `PermutationGroupGenerators(G)` | The supplied generators |
| `PermutationGroupIdentity(G)` | The identity permutation |
| `PermutationGroupElements(G)` | Complete bounded enumeration |
| `PermutationGroupOrder(G)` | Exact group order |
| `PermutationGroupContains(G, a)` | Whether a belongs to G |
| `PermutationOrbit(G, point)` | The point orbit |
| `PermutationOrbits(G)` | The full orbit partition, including fixed points |
| `PermutationTransversal(G, point)` | Pairs (image, representative) |
| `PermutationPointStabilizer(G, point)` | The subgroup fixing the point |
| `PermutationIsSubgroup(G, H)` | Whether H is a subgroup of G |
| `PermutationSubgroupIndex(G, H)` | The exact index [G:H] |
| `PermutationGroupEqual(G, H)` | Whether G and H are the same subgroup |
| `PermutationIsNormal(G, H)` | Whether H is normal in G |
| `PermutationGroupIsAbelian(G)` | Whether every pair of group elements commutes |

Each transversal representative t maps the requested point to its paired image.
Under the right-action convention, these are representatives of right cosets of
the point stabilizer. Representatives depend on generator order and need not be
shortest words or canonical choices.

`PermutationSubgroupIndex` reports an error when H is not a subgroup.
Subgroup, equality, and normality predicates return false when the mathematical
condition fails; resource exhaustion is always an error, never false.

## Resource limits and cancellation

Order and membership use incremental Schreier–Sims, without enumerating all
elements. Orbit trees retain parent and generator indices; transversal
permutations are reconstructed as needed and kept in a bounded cache.
A bounded per-engine session reuses completed chains across group queries.

Enumeration is intended for small groups. It returns only a complete list:
reaching a limit does not return a partial answer.

Loader options set resource ceilings:

| Option | Default |
| :--- | ---: |
| `maxDegree` | 100,000 |
| `maxGenerators` | 1,024 |
| `maxGeneratorImages` | 1,000,000 |
| `maxClosureElements` | 10,000 |
| `maxClosureProducts` | 100,000 |
| `maxClosureImageWork` | 5,000,000 |
| `maxClosureStoredImages` | 1,000,000 |
| `maxOrbitPoints` | 100,000 |
| `maxOrbitEdges` | 1,000,000 |
| `maxTransversalProducts` | 100,000 |
| `maxTransversalImageWork` | 5,000,000 |
| `maxTransversalStoredImages` | 1,000,000 |
| `maxChainWork` | 50,000,000 |
| `maxChainLevels` | 256 |
| `maxChainOrbitPoints` | 100,000 |
| `maxChainOrbitEdges` | 1,000,000 |
| `maxChainStoredImages` | 1,000,000 |

Limits are nonnegative safe integers; closure needs at least one element slot.
Most loader options cannot exceed the defaults. Two chain limits can be
increased: `maxChainOrbitEdges` up to 50,000,000 and `maxChainStoredImages` up
to 100,000,000. `maxOrbitEdges` applies only to the orbit and transversal
queries; the stabilizer chain uses `maxChainOrbitEdges`.

For example, the order of the symmetric group on 200 points, generated by
`Permutation([2, 1])` and a 200-cycle, reaches
`permutation-chain-orbit-edge-limit` with the default limits. With
`maxChainOrbitEdges: 20_000_000` it returns 200! in about 0.2 s.

Expensive queries accept a named `options` dictionary to lower their loader
ceilings. For example:

```text
let G = PermutationGroup([Permutation([2, 1]), Permutation([2, 3, 1])], PermutationAction(3))
PermutationGroupOrder(G, options: {maxWork -> 1000000})
PermutationGroupElements(G, options: {maxElements -> 6, maxProducts -> 12})
PermutationOrbit(G, 1, options: {maxPoints -> 3, maxEdges -> 6})
```

Chain queries accept `maxWork`, `maxLevels`, `maxOrbitPoints`,
`maxOrbitEdges`, and `maxStoredImages`. Enumeration accepts `maxElements`,
`maxProducts`, `maxImageWork`, and `maxStoredImages`. Orbit queries accept
`maxPoints` and `maxEdges`; transversals additionally accept `maxProducts`,
`maxImageWork`, and `maxStoredImages`. Abelian checks accept the chain options.

Work counts are deterministic operation budgets, not milliseconds. Chain work
includes image-array widths for products and inverses. Chain storage accounts
for retained generator images, tree entries, and cached transversals; discarded
rebuilds are not accumulated. Limits are not part of mathematical value identity.
A warm cache does not let a query bypass a lower work or storage ceiling.

Engine deadline and cancellation checks propagate through the kernels. A
cancellation is never converted into a mathematical answer. Diagnostic certificate verification is a test oracle and does not run
on ordinary queries.

## Diagnostics

Ordinary operand-type and arity errors use the engine's shared diagnostics,
including `incompatible-type`, `missing`, and `unexpected-argument`.

An operand that is not known yet does not cause an error: a symbol with no
value, or a call that contains one, leaves the query unevaluated. For example,
`PermutationOrder(PermutationInverse(x))` stays unevaluated until `x` has a
permutation value.

Mathematical input errors include:

| Code | Meaning |
| :--- | :--- |
| `invalid-permutation-image` | An image is not an integer in the required range |
| `duplicate-permutation-image` | The image list is not a bijection |
| `invalid-permutation-action-degree` | The action degree is not a nonnegative safe integer |
| `permutation-outside-action` | A permutation moves a point outside the action |
| `point-outside-permutation-action` | The requested point is not in the action |
| `incompatible-permutation-actions` | The groups have different action degrees |
| `not-a-permutation-subgroup` | An index was requested for a group that is not a subgroup |
| `permutation-exponent-limit` | An exact exponent exceeds the supported bit length |
| `unknown-permutation-option` | The named option is not supported by that query |
| `invalid-permutation-options` | Options must be a dictionary |
| `permutation-option-exceeds-limit` | A per-call option exceeds the loader ceiling |

All `permutation-…-limit` exhaustion codes share the same interpretation:
the computation exceeded a resource bound and produced no answer. They include
degree and generator bounds, closure element/product/image/storage bounds,
orbit point/edge bounds, transversal product/image/storage bounds, and chain
work/level/orbit/storage/generator bounds. Use a smaller input, a more suitable
query, or an increased loader ceiling where supported. An
`invalid-permutation-…-limit` code instead means the supplied limit configuration
is outside its supported range.

A malformed permutation inside a group preserves its original diagnostic, such
as `duplicate-permutation-image`. These optional-library codes are documented
here rather than added to the core Epsil diagnostic table.

## Scope and references

Finite-table groups, matrix groups, homomorphisms, quotients, and polycyclic
representations are separate extensions. They are not part of this module.

For mathematical background, see the GAP reference manual,
[chapter 39: Groups](https://docs.gap-system.org/doc/ref/chap39.html) and
[chapter 43: Permutation Groups](https://docs.gap-system.org/doc/ref/chap43.html).
The implementation follows standard permutation-group algorithms and Compute
Engine conventions; it does not parse GAP programs or embed GAP code.
