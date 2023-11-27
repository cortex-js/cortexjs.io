---
layout: single
date: Last Modified
title: "Tutorial: Simple Quiz"
permalink: /tutorials/simple-quiz/
read_time: false
sidebar:
    - nav: "universal"
toc: false
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---

# <em>Tutorial</em> A Simple Quizz


In this tutorial, we'll create a web-based quiz application that allows students to practice simplifying mathematical expressions into polynomials. We'll use two powerful tools: **MathLive** for math input and **CortexJS Compute Engine** for evaluating mathematical expressions.{.xl}

## Step 1: Setting Up Your Project

In this tutorial, we'll use HTML, CSS, and JavaScript.

Let's start by setting up our HTML file.

```html
<!doctype html>
<html>
<head>
    <title>Math Quiz</title>
    <!-- Include MathLive and CortexJS Compute Engine -->
    <script src="//unpkg.com/mathlive"></script>
    <script src="//unpkg.com/@cortex-js/compute-engine"></script>
</head>
<body>
    <!-- Interactive elements will be added here -->
</body>
</html>
```

We're loading the MathLive and ComputeEngine library from a the "unpkg" CDN. 
You can also download the libraries and host them locally.

You can use MathLive without the Compute Engine. If you want to use both, 
make sure to load both of them.


## Step 2: Creating the Quiz Interface

Our quiz will have a simple interface: a question area, an input field for the answer, a submission button, and a feedback section.

```html
<div id="question">Simplify the expression: (x+1)(2x -1)</div>
<math-field id="answer"></math-field>
<button id="submitAnswer">Check Answer</button>
<div id="feedback"></div>
```

When the MathLive library is loaded, a new HTML element becomes available: `<math-field>`. 

This element is a math input field that allows users to type math expressions.
We'll use this element to allow students to input their answers.


## Step 3: Processing and Checking Answers

Now, let's add functionality to process the student's input and compare it with the expected answer.

```javascript example
const answerButton = document.getElementById('submitAnswer');
answerButton.addEventListener('click', () => {
  const studentInput = mathfield.value;
  const expectedAnswer = "2x^2+x-1";

  const feedback = document.getElementById('feedback');
  if (studentInput === expectedAnswer) 
    feedback.textContent = 'Correct! 😃';
  else 
    feedback.textContent = 'Try again. 😞';
});
```

To read the content of the math input field, we can use the `value` property of the `<math-field>` element. This property returns a LaTeX string representation of 
the math expression

We can then compare the student's input with the expected answer. If the student's input matches the expected answer, we'll display a "Correct!" message. Otherwise, we'll display a "Try again." message.

## Step 4: Using the CortexJS Compute Engine

While comparing the student's input with the expected answer works, it's not very flexible. For example, if we want to accept equivalent answers, we'll have to manually check for each possible equivalent answer. This can be tedious and error-prone.

Instead, we can use the CortexJS Compute Engine to evaluate the student's input and compare it with the expected answer. This way, we can accept equivalent answers without having to manually check for each one.

When the Compute Engine library is loaded in the page, the MathLive library
automatically uses it to evaluate the math expressions entered in the math input field.

The Compute Engine represents mathematical expressions as a MathJSON data structure.
This is a more flexible representation than LaTeX, and allows us to compare expressions
in a more robust way.

To get the MathJSON representation of the student's input, we can use the `expression` property of the `<math-field>` element.

We can get a reference to the Compute Engine instance used by MathLive by accessing the `computeEngine` property of `MathfieldElement`. We can then use the `parse()` method to convert the expected answer into a MathJSON expression.


We'll modify the event handler for the button as follows:


```javascript example
const answerButton = document.getElementById('submitAnswer');
answerButton.addEventListener('click', () => {
    const studentInput = mathfield.expression;
    const ce = MathfieldElement.computeEngine;
    const expectedAnswer = ce.parse("2x^2+x-1");

    if (studentInput.isSame(expectedAnswer)) 
        document.getElementById('feedback').textContent = 'Correct!';
    else 
        document.getElementById('feedback').textContent = 'Try again.';
});
```

Using the `isSame()` method, we can compare the student's input with the expected answer. This method returns `true` if the two expressions are equivalent, and `false` otherwise.

This method compares the two expressions not as strings, but as mathematical
expressions. For example, it will consider `2x` and `2\timesx` to be equivalent.

Once we have an expression, there are many operations we can perform on it. For example, we can simplify it, expand it. We can also evaluate it for a given value of `x`.

The Compute Engine provides many operations that can be performed on expressions,
including calculus, statistical operations and linear algebra.

## Step 5: Enhancing the Quiz Experience

In our example so far, we display the question in plain text. This is not very user-friendly. Instead, we can use MathLive to display the question in a more readable format.

First, we'll modify the HTML to indicate that a portion of the question 
should be rendered as math by surrounding it with `$$` delimiters.

```html
<div id="question">Simplify the expression: $$ (x+1)(2x -1) $$</div>
```

Then we'll call the `renderMathInElement()` function to render the math in the question.

```javascript example
const question = document.getElementById('question');
renderMathInElement(question);
```

If we had a lot of math in our quiz, we could call `renderMathInDocument()` 
to render all the math in the page.


## Conclusion

We've just scratched the surface of what's possible with MathLive and CortexJS Compute Engine. This simple quiz application demonstrates the potential for creating interactive educational tools. Explore further to see how you can enhance and adapt this application to suit various educational needs.
