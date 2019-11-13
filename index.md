---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: splash
title: CortexJS
read_time: false
header:
    # overlay_color: "#f00"
    overlay_filter: .3
    overlay_image: /assets/bg/black-on-white.jpg
    actions:
        - label: 'Get Started'
          url: '/guides/getting-started'
#   caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: |-
    Web Components<br>
    for Scientific Computing
intro:
    - excerpt: 'Nullam suscipit et nam, tellus velit pellentesque at malesuada, enim eaque. Quis nulla, netus tempor in diam gravida tincidunt, *proin faucibus* voluptate felis id sollicitudin. Centered with `type="center"`'
feature_row:
    - image_path: /assets/bg/blue-red-on-light.jpg
      alt: 'placeholder image 1'
      title: '**Mathfield**<br>Math Input Made Easy'
      excerpt: 'This is some sample content that goes here with **Markdown** formatting.'
    - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
      alt: 'placeholder image 2'
      title: 'MathJSON'
      excerpt: 'This is some sample content that goes here with **Markdown** formatting.'
      url: '#test-link'
      btn_label: 'Read More'
      btn_class: 'btn--primary'
    - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
      title: 'Compute Engine'
      excerpt: 'This is some sample content that goes here with **Markdown** formatting.'
feature_mathfield:
    - image_path: /assets/bg/blue-on-light.jpg
      # alt: "placeholder image 2"
      title: '<b>Mathfield</b><br>Math Input Made Easy'
      excerpt: 'Beautifully typeset math as easy to enter as text'
      url: '/mathfield/'
      btn_label: 'Learn More'
      btn_class: 'btn--inverse'
feature_compute_engine:
    - image_path: /assets/bg/yellow-red-on-dark.jpg
      # alt: "placeholder image 2"
      title: 'Compute Engine'
      excerpt: '**Coming Soon**'
      # url: "compute_engine"
      btn_label: 'Read More'
      btn_class: 'btn--inverse'
feature_visual:
    - image_path: /assets/bg/blue-red-on-light.jpg
      # alt: "placeholder image 2"
      title: 'Visual'
      excerpt: 'Data visualization toolbox<br>**Coming Soon**'
      # url: "visual"
      btn_label: 'Read More'
      btn_class: 'btn--inverse'
feature_math-json:
    - image_path: /assets/bg/blue-on-pink.jpg
      # alt: "placeholder image 2"
      title: 'MathJSON'
      excerpt: 'A web-friendly format for formulas<br>**Coming Soon**'
      # url: "visual"
      btn_label: 'Read More'
      btn_class: 'btn--inverse'
feature_not_mathfield:
    - image_path: assets/bg/blue-red-on-light.jpg
      alt: 'Visual'
      title: 'Visual'
      excerpt: 'Data visualization toolbox<br>**Coming Soon**'
    - image_path: /assets/bg/yellow-red-on-dark.jpg
      # alt: "placeholder image 2"
      title: 'Compute Engine'
      excerpt: '**Coming Soon**'
      # url: "compute_engine"
      btn_label: 'Read More'
      btn_class: 'btn--inverse'
    - image_path: /assets/bg/blue-on-pink.jpg
      # alt: "placeholder image 2"
      title: 'MathJSON'
      excerpt: 'A web-friendly format for formulas<br>**Coming Soon**'
      # url: "visual"
      btn_label: 'Read More'
      btn_class: 'btn--inverse'
---

<!-- {% include feature_row id="intro" type="center" %} -->

{% include feature_row id="feature_mathfield" type="center" %}
{% include feature_row id="feature_not_mathfield" %}

<!-- {% include feature_row id="feature_compute_engine" type="right" %}

{% include feature_row id="feature_visual" type="left" %}

{% include feature_row id="feature_math-json" type="right" %} -->
