---
title: Getting Started with Mathfield
permalink: /guides/mathfield-getting-started/
layout: single
header:
    overlay_image: /assets/bg/yellow-on-blue.jpg
    overlay_color: '#0066ce'
    # caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
    # actions:
    #   - label: "More Info"
    #     url: "docs"
---

# Let's Get Started

To use a Mathfield, load the Mathlive library in your project, using a CDN or NPM.

## Using a CDN

Using a CDN is the simplest approach, as it does not require any configuration:

```html
<head>
    ...
    <link
        rel="stylesheet"
        href="https://unpkg.com/mathlive/dist/mathlive.core.css"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/mathlive/dist/mathlive.css"
    />
</head>
<script src="https://unpkg.com/mathlive"></script>
<div id="mathfield">f(x)</div>
<script>
    MathLive.makeMathField('mathfield');
</script>
```

## Using NPM

Using NPM will require to use a bundler such as Rollup or WebPack.

```bash
$ npm install --save mathlive
```

# Setup

# Overview
