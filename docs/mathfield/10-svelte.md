---
date: Last Modified
title: Using A Mathfield with Svelte
slug: /mathfield/guides/svelte/
---

## Theory of Operations

A Svelte wrapper manages the scaffolding of the web component, allowing it to be used like a standard web component with all attributes forwarded.

## Install Mathlive

```bash
$ npm install --save-dev mathlive
```

## Create a Svelte Wrapper Component

```jsx title="/src/lib/MathLive.svelte"
<script lang="ts">
  import "mathlive";
  import type { MathfieldElement, MathfieldElementAttributes } from "mathlive";
  import { on } from "svelte/events";

  type Props = { value?: string } & Partial<MathfieldElementAttributes>;

  let { value = $bindable(), ...rest }: Props = $props();

  const init = (node: MathfieldElement) => {
    $effect(() => {
      if (value) node.value = value;
    });
    $effect(() => {
      return on(node, "input", () => {
        value = node.value;
      });
    });
  };
</script>

<math-field use:init {...rest}></math-field>
```

Append the following to `src/app.d.ts`. This provides autocomplete for the web component.

```ts title="src/app.d.ts"
// ...previous code

import { type MathfieldElementAttributes } from "mathlive";

declare namespace svelteHTML {
	interface IntrinsicElements {
    'math-field': MathfieldElementAttributes;
	}
}
```

## Usage

```jsx
<script>
  import MathField from "$lib/MathField.svelte";
</script>

<MathField />
```

## Customization

```jsx
<script>
  import MathField from "$lib/MathField.svelte";
  let value = $state("1");

  const config = {
    "smart-mode": true
    // ...
  }
</script>

<!-- define settings via props -->
<MathField smart-mode="true"></MathField>

<!-- define settings via an object -->
<MathField {...config}></MathField>

<!-- 2-way binding -->
<MathField bind:value={value}></MathField>

<p>Current LaTeX: {value}</p>

<button onclick={() => {value = "1 + 1";}}>
  reset to default
</button>
```
