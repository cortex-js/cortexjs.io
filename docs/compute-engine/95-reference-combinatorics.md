---
title: Combinatorics
slug: /compute-engine/reference/combinatorics/
---

# Combinatorics

Combinatorics functions in the Compute Engine provide essential tools for counting and enumerating discrete structures. These functions enable computation of binomial and multinomial coefficients, generation of permutations and combinations, construction of Cartesian products and power sets, and calculation of special combinatorial numbers such as derangements and Bell numbers. These utilities are fundamental for combinatorial analysis and discrete mathematics.

---

## Functions

<nav className="hidden">
### Choose
</nav>
<FunctionDefinition name="Choose">
<Signature name="Choose" returns="number">n: number, m: number</Signature>
Computes the <b>binomial coefficient</b>, often read as “n choose m,” representing the number of ways to select <b>m</b> elements from a set of <b>n</b> elements without regard to order. 

This function answers the question: "How many different groups of size $m$ can be formed from $n$ distinct items?" It is a fundamental concept in combinatorics used in probability and statistics.

For example, to compute the number of ways to choose 2 items from 5:  
Step 1: Calculate factorials: $$5! = 120, 2! = 2, (5-2)! = 3! = 6$$  
Step 2: Apply formula: $$5! / (2! \times 3!) = 120 / (2 \times 6) = 10$$  
So, there are 10 different ways to choose 2 items from 5.

The function returns <code>NaN</code> if <code>n &lt; 0</code>, <code>m &lt; 0</code>, or <code>m &gt; n</code>.

```json
["Choose", 5, 2]
```

See also: [Binomial coefficient - Wikipedia](https://en.wikipedia.org/wiki/Binomial_coefficient)

<Latex>{`
\\mathrm{Choose}(n, m) = \\binom{n}{m} = \\frac{n!}{m!(n-m)!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Fibonacci
</nav>
<FunctionDefinition name="Fibonacci">
<Signature name="Fibonacci" returns="integer">n: integer</Signature>
Returns the <b>n<sup>th</sup> Fibonacci number</b>, a sequence defined by the sum of the two preceding numbers starting with 0 and 1. 

For negative indices, the function returns <code>-Fibonacci(-n)</code>, following the standard extension of Fibonacci numbers to negative integers.

The Fibonacci sequence models many natural phenomena and appears in computer algorithms and mathematics. It starts as 0, 1, 1, 2, 3, 5, 8, ...

For example, to find the 7th Fibonacci number:  
Step 1: Start with $$F(0) = 0, F(1) = 1$$  
Step 2: Compute subsequent terms: $$F(2) = 1, F(3) = 2, F(4) = 3, F(5) = 5, F(6) = 8, F(7) = 13$$  
Hence, the 7th Fibonacci number is 13.

```json
["Fibonacci", 7]
// -> 13
```

See also: [Fibonacci number - Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_number)

<Latex>{`
\\mathrm{Fibonacci}(n) = \\begin{cases} 0, & n = 0 \\\\ 1, & n = 1 \\\\ \\mathrm{Fibonacci}(n-1) + \\mathrm{Fibonacci}(n-2), & n > 1 \\\\ -\\mathrm{Fibonacci}(-n), & n < 0\\end{cases}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Binomial
</nav>
<FunctionDefinition name="Binomial">
<Signature name="Binomial" returns="integer">n: integer, k: integer</Signature>
Calculates the <b>binomial coefficient</b> $$ C(n, k) $$, the number of ways to choose <b>k</b> elements from a set of <b>n</b> elements. Returns <b>0</b> if <code>k &lt; 0</code> or <code>k &gt; n</code>, and <b>1</b> if <code>k = 0</code> or <code>k = n</code>.

This function is similar to <code>Choose</code> but specialized for integer inputs and returns integer results. It is widely used in combinatorics, probability, and algebra.

Example: To find the number of ways to choose 2 elements from 6:  
Calculate $$ \binom{6}{2} = \frac{6!}{2!4!} = \frac{720}{2 \times 24} = 15 $$.

```json
["Binomial", 6, 2]
```

See also: [Binomial coefficient - Wikipedia](https://en.wikipedia.org/wiki/Binomial_coefficent)

<Latex>{`
\\mathrm{Binomial}(n, k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### CartesianProduct
</nav>
<FunctionDefinition name="CartesianProduct">
<Signature name="CartesianProduct" returns="set">set₁: set, set₂: set, ...</Signature>
Returns the <b>Cartesian product</b> of one or more input sets, producing all ordered tuples where each element is drawn from the corresponding input set.

This function answers: "What are all possible combinations of elements where you pick one from each set?"

Example: Given sets $$A = \{1, 2\}$$ and $$B = \{a, b\}$$, the Cartesian product $$ A \times B $$ is:  
$$\{ (1, a), (1, b), (2, a), (2, b) \}$$

```json
["CartesianProduct", {"set": [1, 2]}, {"set": ["a", "b"]}]
```

See also: [Cartesian product - Wikipedia](https://en.wikipedia.org/wiki/Cartesian_product)

<Latex>{`
A \\times B = \\{ (a, b) \\mid a \\in A, b \\in B \\}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### PowerSet
</nav>
<FunctionDefinition name="PowerSet">
<Signature name="PowerSet" returns="set">set: set</Signature>
Computes the <b>power set</b> of the given set, which is the set of all subsets including the empty set and the set itself.

This function helps enumerate every possible subset, useful in combinatorics, logic, and computer science.

Example: For the set $$ \{ a, b \} $$, the power set is:  $$ \{ \{\}, \{a\}, \{b\}, \{a, b\} \} $$

```json
["PowerSet", ["Set", a, b]]
// -> ["Set", ["EmptySet"], ["Set", a], ["Set", b], ["Set", a, b]]
```

See also: [Power set - Wikipedia](https://en.wikipedia.org/wiki/Power_set)

<Latex>{`
\\mathcal{P}(A) = \\{ S \\mid S \\subseteq A \\}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Permutations
</nav>
<FunctionDefinition name="Permutations">
<Signature name="Permutations" returns="list&lt;list&gt;">collection: list, k?: integer</Signature>
Generates all <b>permutations</b> of the input collection of length <code>k</code>. If <code>k</code> is omitted, permutations of the full length of the collection are returned.

Permutations represent all possible ordered arrangements of elements.

Example: For collection $$[1, 2, 3]$$ and $$k=2$$, permutations include: $$[1,2], [1,3], [2,1], [2,3], [3,1], [3,2]$$.

```json
["Permutations", ["List", 1, 2, 3], 2]
// -> ["List", 
//      ["List", 1, 2], 
//      ["List", 1, 3], 
//      ["List", 2, 1], 
//      ["List", 2, 3], 
//      ["List", 3, 1], 
//      ["List", 3, 2]
// ]
```

See also: [Permutation - Wikipedia](https://en.wikipedia.org/wiki/Permutation)

</FunctionDefinition>

<nav className="hidden">
### Combinations
</nav>
<FunctionDefinition name="Combinations">
<Signature name="Combinations" returns="list&lt;list&gt;">collection: list, k: integer</Signature>
Returns all <b>k-element combinations</b> (unordered subsets) of the input collection.

Combinations represent subsets where order does not matter.

Example: For collection $$[1, 2, 3]$$ and $$k=2$$, combinations are: $$[1,2], [1,3], [2,3]$$.

```json
["Combinations", ["List", 1, 2, 3], 2]
// -> [["List", 1, 2], ["List", 1, 3], ["List", 2, 3]]
```

See also: [Combination - Wikipedia](https://en.wikipedia.org/wiki/Combination)

</FunctionDefinition>

<nav className="hidden">
### Multinomial
</nav>
<FunctionDefinition name="Multinomial">
<Signature name="Multinomial" returns="integer">k₁: integer, k₂: integer, ...</Signature>
Calculates the <b>multinomial coefficient</b> for the given group sizes, representing the number of ways to partition a set of $$ n = k_1 + k_2 + \cdots $$ elements into groups of sizes $$ k_1, k_2, \ldots $$.

This extends the binomial coefficient to multiple groups and is useful in probability and combinatorics.

Example: For groups of sizes 2 and 1 (total 3 elements), the multinomial coefficient is:  
$$\frac{3!}{2!1!} = \frac{6}{2} = 3$$.

```json
["Multinomial", 2, 1]
```

See also: [Multinomial theorem - Wikipedia](https://en.wikipedia.org/wiki/Multinomial_theorem)

<Latex>{`
\\mathrm{Multinomial}(k_1, \\ldots, k_m) = \\frac{(k_1 + \\cdots + k_m)!}{k_1! \\cdots k_m!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### Subfactorial
</nav>
<FunctionDefinition name="Subfactorial">
<Signature name="Subfactorial" returns="integer">n: integer</Signature>
Returns the number of <b>derangements</b> of <code>n</code> elements, i.e., permutations with no fixed points where no element appears in its original position.

Derangements are important in problems like the "hat-check problem" in probability.

Example: For n=4, the number of derangements is:  
$$ !4 = 4! \times \left(1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!}\right) = 9 $$.

```json
["Subfactorial", 4]
```

See also: [Derangement - Wikipedia](https://en.wikipedia.org/wiki/Derangement)

<Latex>{`
!n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}
`}</Latex>
</FunctionDefinition>

<nav className="hidden">
### BellNumber
</nav>
<FunctionDefinition name="BellNumber">
<Signature name="BellNumber" returns="integer">n: integer</Signature>
Computes the <b>Bell number</b> $$ B(n) $$, which counts the number of ways to partition a set of <code>n</code> elements into any number of non-empty, disjoint subsets.

Bell numbers appear in combinatorics and partition theory.

Example: For $$n=3$$, the Bell number is 5, representing the partitions:  
$$\{ \{1,2,3\}, \{1,2\},\{3\}, \{1,3\},\{2\}, \{2,3\},\{1\}, \{1\},\{2\},\{3\} }.$$

```json
["BellNumber", 3]
// -> 5
```

See also: [Bell number - Wikipedia](https://en.wikipedia.org/wiki/Bell_number)

<Latex>{`
B(n) = \\sum_{k=0}^{n-1} \\binom{n-1}{k} B(k), \\quad B(0) = 1
`}</Latex>
</FunctionDefinition>