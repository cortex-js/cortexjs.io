---
date: Last Modified
title: Using a Mathfield with Svelte
slug: /mathfield/guides/svelte/
---

## Theory of Operations

A Svelte wrapper manages the scaffolding of the web component, allowing it to be used like a standard web component with all attributes forwarded.

## Install Mathlive

```bash
$ npm install --save-dev mathlive
```

## Create a Svelte Wrapper Component

```html title="/src/lib/MathLive.svelte"
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

```html
<script>
  import MathField from "$lib/MathField.svelte";
</script>

<MathField />
```

## Customization

```html
<script>
  import MathField from "$lib/MathField.svelte";
  let value = $state("1");

  const config = {
    "smart-mode": true
    // ...
    // see here for the full list of API's
    // https://cortexjs.io/mathfield/api/
  }
</script>

<!-- define settings via props -->
<MathField smart-mode="true" style="width:100%"></MathField>

<!-- define settings via an object -->
<MathField {...config}></MathField>

<!-- 2-way binding -->
<MathField bind:value></MathField>

<p>Current value: {value}</p>

<button
  onclick={() => {value = String.raw`x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}`}}>
  reset to default
</button>
```

<ReadMore path="https://www.sveltelab.dev/?files=.%2Fsrc%2Froutes%2F%2Bpage.svelte#code=N4IgdA5glgLlEDsD2AnApiAXKAZlANhtiAMZIIxoUDOWoA1lAgCZYjUBua%2Bl%2BAhgCMAtAFcoADj4gANCAEicONCiwBtACwA2aZvHTxAZmkBOAKz6jARkvbrl6dfUOADPcvOH7z2%2Bcf39sxdjbxc-SwB2Fz1-T3MvdUjjaIiXOOdo3xdpBOzbSzjLDJ9k21dstMj3AtLsyssAJhNE4PdEyucrMvjSty9rDNyXXrC9LWzGrwMjMZjrEcHZ%2Bo9jdpaGqKGs-tTPHsHjNeGXCec06dK88xmbHfcWrvzdpqDPRvUrk88M6s2xg5C5sdbh0FjdrFc8qU0vdej8Vi9rG8Pi4ALoAXwxsjAAAd0DA4MoUCQ6CA8IQSWQKFQYLRiIwWGxONxeIJRBIpLJ5IplGoGp0TNIDE5rHU0vZxE54UlYoKnKY9AYJmDLMKUjF1MLlrKZVVPH4Qe4ivpenVenshdJ5YKlXlVe17BqssELdZbc9dYbbn0QZpTQjnMF4RarYrtYC7HrNhbHV5naqlZqCmFtOJ2mlky4nMGFW9gupRqNNQKXetPSKXJ0kzLs9aTPYSwnNq6nh6Hk53q8NuX3JXIx3wV8m%2BkW2ULcZpkW4wDCk2VZ5E6FZ%2BYa6HjG56kZQy7nCc0kaByvGtG3pdB7Nh82YtGs0fVb0bV6jge5TmHBvaw33XOB7M54ew482zniUUY3m%2By4TPU5jjlsUGohiaKyNifAkPQfAQGgYAAFbUOQJJkkQoCUpQNAkvSrCYOwXA8NwrJiJIMhyAoSgqJgqh8k6AHLKsoGWq%2BY56PCP6nCYU4xlqJb7t%2BgEiRGgL-tGozaPmgzqGJk4AY2HozkJYKji%2BtaXtJ9rZBpJbQWsC6Ii2jz-hxsbFpq%2Bq9AqBlbqq3wjvWJzOYO16cVO0rdrJF6ZApHleuajRBWqIUZB4-kOVO1mOLOnm-lOIa3mesl6d5napb%2B6UPOpAVhqFVbNuFBXfg8kLAr0YEdh2-zuJqAT3JEoZjIlWrJTu06aoGdTaNVKW1WaI5ivOtbNQUlmRVGJ7lQKDRXGZTlpToUknE%2BmS-ss9zTc%2BfGGe%2BSXapoqoFPuF55S4p45EJmS6Q%2Bv7ttBdQjSE1XGHKDrKUp2SuaZZUWldOozsBXkPTKOStItv1yh4YymOcloeKYy7thpU4Qz%2BUNdHdezuI9dTpfd-alnd7S9oCVM3UOIFXm52V-Za6MqWMKm9QKyWlhNNlQrOWas9q7OmADlpS6YCU42D8Yzb%2B9Wto15QFTTFZeijBSM9Dl76ad7kmP9gyy2bougxd5k5cUMNIxz2riXzAEU%2BaYtjnK7aA6pIMOWtVsSaqtj1PevFZeVhyLsFRq8-1vkpQ8%2BoJ7GR1LtqEf2X1kdfqUmoU7HHuSu2QNqcDlrLebceOZDt3M2ULX3O1okuF1RcmxXvtd9uq1wX0ffOOimLsESJLMFA6AkDAqAAJ4knw2LYmAAAWMAALb4PhBCEaQ5AkTSZFMBRVHMrRwj0RyTHcqxqiaAlnRhB1Lahxr%2BVtSO9x6Jonx35mH8bKGT0ul9RGE0PWZu8knDf04r-d%2BMRnoeGgRdWBAZZzaCDNFJuX5rpoJ0OAzw313BIktKNJqkQkHZxQRTfUXUtJEy-vg3UrVrCRgtIA5wqoIEDTAdqAwopbZdnugjbSyl0H8OEpNA8kR4YDV0p5ZhRxrhKhAbwt45DPiBh0PqGETwMGRmejonhkkGqeDWEqNWVUwIKMjAbJ8NwjGqjTu4DM78eHOK2kwnRVMnH7T0pbbq6iwbiMJnbWxrdFozA4ZsBBgp2gCl-jI5uMSKHxOWMkHwfgX7sO4ro6RusBFliEc4NMTwqZ0NCSwmJ-YXrfXhA4v%2BckQkzXBho1J0dcqvgJiHUJZR6nuO0gUE4glKgvwjtY8MQi%2BjKmxjoI8wS64w2EblURJh0nRyyeQlG7R9SMxScEBJiQ1n9Jfikg5DS9Kf1mfBYe%2BAoACDHhPNAU9Z4kgALJ8BgMvAAYlAbgzAwBMholvckxBiLUlpAwI%2BjJqIsnPuyRiXIWJqFgY8ZhVkBajSGV%2BFRfTpmXU%2BFuXcCIBYWJuMbO4ucGkVQEcGe4H4iUUvGqSzFz8w5XkgpuRo4Q2gjk1Ay%2Bhi5NCXPPDoiZykwLcspXAgaqsuyZCFXKnwoqpnaE0D8IyC4YqEIeBBcChkZXSSVR%2BIaUqollg6eHOlhLgRmMGk8QB75AEsPkpBXVRClbOtQeSwCTTCl7BkS5WcLjbJyjpZMI8b0X6J3yuIMId4aq6qMRywyOl2jJBMpoIwmcfVum0ioh1uqDCvljdgqa7phy-0lbpPOQJZXmsQcKomyqMxqqFkrESWrFmPGgaYMNCUI2Kvtcmp1wzBEmVDEmwU6DqGLilBkI06gUYOiais64ECc1nXMBHEthVnUC0TflAweQtJ7qVFcJdlo%2B30pbo0sIPx2GVWWbWSdi6bGet8hHKt2q%2BUmPrToRtRqDqlPyjw6BDr%2BTWsgyTGVMGn7NlfQhkD9gwPJvDdeyD-KB2vu2M9dNvw35TIyb8PIo7CnjsaJOnDaaCGbF7VkDDm7sj2Do2hhjR6hwnF2jem4CGL0TuQwOrO6GB3WsKnVGju7%2B3ThRmER%2B7Tl3Gu1jVb6-lup8YowJs6EGRM6eE4OXDEnRwaZTXJ-pDcSPlrwzEFjUm2OCbguoZjVrdMFqY5e%2Bj9mt10rOQONFXoHwpK8Cg4avL1burraFKT3YZLMZnSIrTqkVlidhM-cw0CfOoOrX-ap-KemIPqEPRCIAj5oAAB7YQhaSbeFI97gsPgySigLYVsgYpyZiPI2I5ByE6rFUodHsP5VJN1Ua920NMdiodNk34hVtY04OKaa27pNFrd%2BTrFtGZMKNUo8jBIsoM0w-hD7WFvTNblN1Bq8siwWIPBCw8UBIBEJQSr49J7TxQHPYgABqfgM8HswABTCneBEatUlInSKFjXAf8Dha1q%2BSK2Ioosu2wZTw9k2pqsyj8eZlK00EQEUjw4-hrHyQYYINmBRdbeAO-GYIRtcfA2%2BIwrVTt7mjoLQEmajb8tm3u%2Bbr7Se1yZvbPMUtDA2NykqLjl4%2B5wW6mozi5rJoM9XFg1s8V21HFc-xj8x6PVsseIh9zQWtkyj89pALnx%2B6gM4UG%2BTzTMFUtZ-09nQXOYXoDu4QrshPvIQwgD0%2BwKd5grB5ChrJ8aLQ5a5fRFHXb53u4%2Bii3Hn9XQgxx6llX7QvhB2UL9xA29cvGNux810FRiREzwbJw2ff2RdBHrAVYTaVZB86iha5vUeW8QR4CvfjpDV4i%2Brp16qo2hWQ4wywPiXFRKtGXLmCo261FmV7kAEB8BIAEHwfAYASDUEq8D0FtWQ8gHItC0%2BkeL4IvazfK0S3pwsqE3mK4%2BSEYtVHczvJf8I7mxUqYUNnE5o6jFLqzSh9bhIdiSxhZmoyR6Bf50qP5hYyQf4gHNBgFXBk6dJQGs4IaFizTz6gzdR5gFixJubk7wEMyoGrLPDv7qzmyZyYEbDYH4FvB4GOgEHlw8zSJOb-5P6AFIFv6dQ0Gxb6o4Keivrf4wHyyhi-6dx8JMGWiRCmCjScFG5agAHCR8FUECHgGNB0EiGE6YwowSFyGmA6FzLGEKH1jKGkHqzkEv6l6aEUFoxc7nJYEGHlzSGsE6GGHEGeEkLlyyGOYqEU48HqEIEkxLClJoHOFwLQHZDeG%2BEcFyFlwQEBFcEORqGIFhFNgRHwZbqYwYF6GjDxFNQsFgS0HLhWFwE2HP5AFUzhEZjgFCHsKFFxEYydxcxlFKHGGmE%2BFpGqEhGZF1FUqAYNxRG6GAFFHZBk4TizSEH%2BHSJlFZqbiVHcEIEVBZHSojEOh5HRH0GiFuEmHsGdE%2BFlE9GpFBFkE1Ef6V5DheJbpNEnAtFiHeGHEJFzGJG%2BHSEpErHpEDHrE5bSZPARwC7hBrBSSKy6Qk55hNSfQ1RYrqjP4jbqpNpyGaDbZKYIyZ7-Bi4NApZhIUr957oNFgQC44lExWCeoxrmDhCbjQm1jiDmKUGNJ5AKahiglviZI%2BCdCKJgTiD2HRbBoLFlS%2BgTbNi6RcLzpyEgk56pR6Ji7ALVh0lbj7LJDxqthSbyl1Dx4C6%2BEglS53RSTCz-B6LhBSTjpKlnqikG41EWIhQ6FVEZH-FpCMliqQFRwTIPGCjBD965SShjaSq3o-QWnEp2J4nrCgHWZhoDzN4mrng556LYYCxcJS7SQ8HjJ3RqzkHM5cI6J0E5JibKEM4OQ36Gp34JYXSOkUHIE3q1FjEFETGtEdG4EnGzHzEkFVGXG8HAH8GOH5HCENmMEJGlGtmKG9EXHBFrFVk9l2HSy7FPHFHNkBFNRk5mGBHWGdmhGv4OEzmHHjHCSTFNndTDlSFuHnHrnVFdlbkRm1mOx7mxGDklEtlSHMFjnnmVkzn4k5E8Z1n9n7mNk4FHlPk6HSIsF9Euzvk3mfkNE7F3muFHGLlClSE%2BxnkdkXmbnInrjQWzmwUMELmAVLm1hfHLHtkK7RlJRHL7RZKobZzplHJzhZmq4onWYYH5m1QKFVEe6ZJpBOgUWcnll9TTlAE9gF4CmLiNwAgZkzTZqkb0U6yTkznVnUGNEkVJTumSWpTSWloIZ-EUFQWRFTEqVagUrikra5R9mAWoxbrckvDWHhZEn6XuoGLAjRCjKdKpozTaXyWQUXZvrKRgUhbGnNr6W0V2qaUmWeW2GQW94iq-BRFrlRlpCFa3ayDUAwAfJQDEjEAvZPJvYfa4B8AcAZXkA4gIAQCB4g77yVYn6Q5n50TwptbXxqAbgtBrgODiDBAlqml95uD8j1A1AeADUOBGA0l94UZ6AMnSCDUozaBTVOyCiTULUeDNUOCtWFAdXmDLUT5uDtVviRCzVTD6Dd4phQLBCzWbWrU7UQxLUC5bVtX7JODXUtXbX3ULXnXPU6APXSBvV3U6DmCPUrXvVXVfU3UXX7J-XA1PU-Wtr-W3VrUfWvUg2A2fUWgSgQ0A0-UpCzV7ophcrjVGAw2g1o2w07XfVw0Qw5Ck07UsYziU3BC01fVcpfXl72CzW2rhCNA7UDiDVzj03c1OD032D03qBWD817WLVE2E0jW6C-X6DCgRH00K2I0-UC2RBC0uUS3vWtXGDaCK2Q1w280a0Y2NC63o361K1w0QEvwm3E0tBGDW2E2WB216D02HEjUHWFT1BHgtBwT23vW%2B0-Xsn%2B362SiQSlB23m0k2C0R0tAwGG1m1607VWDG3jUp2eAUnG1HVx2c0T5Z3e3G3R19652M5F303QIu0h0I0J101brg303iDIYE1%2B0F1B07XC3ZBZqq0F0DhV46Hh1V1fVR390K0jKN0Y0bXN1d31D81d30V92m0k0T39080F3slt0GBuHsk7o5HviSot101d3Dh70l2ljskpBYydzhBuBfWyQGCD3z371L0%2BrT1D0H3j390Krn0C3swRB1DP330D0i1z021F24laxuKPB0YC3vgdhH0C0sJwN33AP03Sjn1UyRCo0NAeB8kl0z3RT50v1L2oJQOIOE2BHS0%2B2L3-2gNC062UPANVx01qiyFH1i5C0oGy7aDs1F2o0GD5IC1CVTKbhQJAOkMiNN0EP-2K1xD9jU2C0535BfxyVH2c4G2zVS3elfzO0F1omba51JVFZNaYSUh4AQAVblUH6g4Hzg5h6GPn71Vw6x6tg86Y6rjbJfgnZqz5634UrKnw0EwLL4nOBkzlqsUeMeWwnRYslelBHxDSJU7PrzagPRr8Wp5Mrp6tEC40714VLQbBNLL3oi6DAimBnhYhRJ26rqDy6pyAldK1jjLej8qcp4L8WrRCVPqZznTZxdZjYxKvRdofRfiEIsJOp7QuUEYFB1CS52pGRuo%2BpbH6p2IUxqnehBUzNyESJLTnIqz7qnTdPhLxbXDZOCL%2BqlApxl5s5wYG48ruJ9P4n0URNqjKjTYul-jRRjYl6QxJZdPSL%2BmdD2a9DLapTsKLNejLPaK25VQMq2TKJllD4SYCwvOJNExRa85nQAs0ZwvKwji3Qoua5vMpoo7wI%2BJEr-DAtvpLM1OoJAbwZgQExOI3DZkpqAtkonbNyuOzqTP9PXbgU-P0nWXspbM2SWkz68v5OlKnhAQN6UynNbQyJybMJXDXM1I1Qkypn6qIv6rumCxHbhg%2BViYhYGwFB4tUF0Uqb4s3Oct3M4KRIuy9OWuTJix2sqtXaG7%2BxkVwTk7eiYVp67r377REzmuxQgQq6UuNMqHL6FWUDb7kAmNmPED75ESH5WOh7Hy2N1Ww4x43xOM%2BvST36OqWmSs5NDglKQt6peOlk%2BNe1%2BM%2BoBNFJ5NtM-DwyEwYXROeszY5vzbK4%2BQcYYm9J%2Bi6thta6cYiVepVuSstsC5tvZFhAaultmY%2BCBvUZzv%2BsLu9vIb9sNPAjTCZL8izaazCV5oyhjJhm1vQYls8YXowT9xXB9FJVAA" >
A ready-to-run example project is available on **Sveltelab**<Icon name="chevron-right-bold" />
</ReadMore>

