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


In this tutorial, we'll create a web-based quiz application that allows 
students to practice simplifying mathematical expressions into polynomials. 
We'll use two powerful tools: **MathLive** for math input and 
**CortexJS Compute Engine** for evaluating mathematical expressions.{.xl}

## Step 1: Setting Up Your Project

In this tutorial, we'll use HTML and JavaScript.

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
<script>
    // JavaScript code will be added here
</script>
</html>
```

For convenience, we're loading the MathLive and ComputeEngine library from 
the **unpkg** CDN. You can also download the libraries and host them locally.

Since we want to use the Compute Engine, we'll need to load its library as well.
We could use MathLive without the Compute Engine, but we'll need it to evaluate
the student's input.


## Step 2: Creating the Quiz Interface

Our quiz will have a simple interface: a question area, an input field for 
the answer, a submission button, and a feedback section.

```html
<div>Simplify the expression: (x+1)(2x -1)</div>
<math-field id="answer"></math-field>
<button id="submitAnswer">Check Answer</button>
<div id="feedback"></div>
```

When the MathLive library is loaded, a new HTML element becomes available: 
`<math-field>`. 

This element is a math input field that allows users to type math expressions.
We'll use this element to allow students to input their answers.


## Step 3: Processing and Checking Answers

Now, let's add functionality to process the student's input and compare it with the expected answer.

```javascript example
const expectedAnswer = "2x^2+x-1";

function checkAnswer() {
  const studentInput = mathfield.value;

  // Compare the expressions as strings
  const feedback = studentInput === expectedAnswer ?
     'Correct! 😃' : 'Try again. 😞';

  document.getElementById('feedback').textContent = feedback;
}

const answerButton = document.getElementById('submitAnswer');
answerButton.addEventListener('click', checkAnswer);
```

To read the content of the math input field, we use the `value` property of the `<math-field>` element. This property returns a LaTeX string representation of 
the math expression

We then compare the student's input with the expected answer. If the student's input matches the expected answer, we'll display a "Correct!" message. Otherwise, we'll display a "Try again." message.

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


We'll modify our `checkAnswer()` function as follows:


```javascript example
const ce = MathfieldElement.computeEngine;
const expectedAnswer = ce.parse("2x^2+x-1");

function checkAnswer() {
  const studentInput = mathfield.expression;

  // Compare the expressions using `isSame()`
  const feedback = studentInput.isSame(expectedAnswer) ?
     'Correct! 😃' : 'Try again. 😞';

  document.getElementById('feedback').textContent = feedback;
}
```

The method `ce.parse()` returns a boxed expression, a
JavaScript object that represents a mathematical expression. It can be
evaluated, simplified, expanded, etc. The `ce.parse()` function creates a boxed
expression from a LaTeX string.


Using the `isSame()` method, we can compare the student's input with the expected answer. This method returns `true` if the two expressions are equivalent, and `false` otherwise.

This method compares the two expressions not as strings, but as mathematical
expressions. For example, it will consider `2x` and `2\timesx` to be equivalent.

The Compute Engine provides many operations that can be performed on expressions,
including calculus, statistical operations and linear algebra.

For example, we can simplify an expression, expand it or evaluate it for a 
given value of `x`.


## Step 5: Listening for Keyboard Events

We can make our quiz more user-friendly by allowing students to validate their
answer by pressing the <kbd>Enter</kbd> key.

To do this, we'll add an event listener to the math input field to listen for
keyboard events.

```javascript example
const answerField = document.getElementById('answer');
answerField.addEventListener('input', (event) => {
  if (event.data === 'insertLineBreak') checkAnswer()
});
```


## Step 6: Displaying Static Math

In our example so far, we display the question in plain text. We can
display it as LaTeX instead.

First, we'll modify the HTML to indicate that a portion of the question 
should be rendered as math by surrounding it with `$$` delimiters.

```html
<div>Simplify the expression: $$ (x+1)(2x-1) $$</div>
```

Then we'll call the `renderMathInElement()` function to render the math in the question.

```javascript example
const question = document.getElementById('question');
renderMathInElement(question);
```

If we had a lot of math in our quiz, we could call `renderMathInDocument()` 
to render all the math in the page.

Another way to render math is to use the `convertLatexToMarkup()` function.

To do this, we'll modify our markup to use a `<span>` element.

```html
<div>Simplify the expression: <span id="question">(x+1)(2x-1)</span></div>
```

Then we'll modify our JavaScript to use this function to render the question.

```javascript example
const questionSpan = document.getElementById('question');
questionSpan.htmlContent = 
  convertLatexToMarkup(questionSpan.textContent);
```

Here we're using `convertLatexToMarkup()` to convert the LaTeX representation
of the expression into HTML markup. It's a more direct way to render static 
math in the page.



## Step 7: Generating Random Questions

To keep the quiz interesting, we can generate random questions.

We'll create a function that generates a product of two random terms.

```javascript example
function generateRandomQuestion() {
  const ce = MathfieldElement.computeEngine;
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) ;
  const c = Math.floor(Math.random() * 10) + 1;
  const d = Math.floor(Math.random() * 10) ;
  // (ax+b)(cx+d)
  return ce.mul(
      ce.add(ce.mul(a, 'x'), b),
      ce.add(ce.mul(c, 'x'), d),
  );
}
```

The `ce.add()` and `ce.mul()` functions create a sum and a product, respectively.
They are a short and convenient way to create a MathJSON expression.
They are equivalent to the following:

```javascript example
return ce.box(["Multiply", 
  ["Add", ["Multiply", a, "x"], b], 
  ["Add", ["Multiply", c, "x"], d]]).evaluate();
```

The `ce.box()` function creates a boxed expression from a MathJSON expression.


Then we'll update our script to use this function to generate the question.

```js example
const question = generateRandomQuestion();
document.getElementById('question').htmlContent = 
  convertLatexToMarkup(question.latex);
const expectedAnswer = question.simplify();
```

Since we expect the student to have simplified the expression,
we use `simplify()` to simplify the product of two terms into a polynomial and
compare it with the student's input, 



## Conclusion

Here's the complete code for our quiz application:

```html example
<!doctype html>
<html>
<head>
    <title>Math Quiz</title>
    <!-- Include MathLive and CortexJS Compute Engine -->
    <script src="//unpkg.com/mathlive"></script>
    <script src="//unpkg.com/@cortex-js/compute-engine"></script>
</head>
<body>
    <div>Simplify the expression: <span id="question"></span></div>
    <math-field id="answer"></math-field>
    <button id="submitAnswer">Check Answer</button>
    <div id="feedback"></div>
</body>
<script>
  const ce = MathfieldElement.computeEngine;
  const question = generateRandomQuestion();
  const expectedAnswer = question.simplify();

  document.getElementById('question').htmlContent = 
    convertLatexToMarkup(question.latex);
  
  const answerButton = document.getElementById('submitAnswer');
  answerButton.addEventListener('click', checkAnswer);

  const answerField = document.getElementById('answer');
  answerField.addEventListener('input', (event) => {
    if (event.data === 'insertLineBreak') checkAnswer();
  });

  function generateRandomQuestion() {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) ;
      const c = Math.floor(Math.random() * 10) + 1;
      const d = Math.floor(Math.random() * 10) ;
      // (ax+b)(cx+d)
      return ce.mul(
          ce.add(ce.mul(a, 'x'), b),
          ce.add(ce.mul(c, 'x'), d),
      );
  }

  function checkAnswer() {
    const studentInput = mathfield.expression;

    // Compare the expressions using `isSame()`
    const feedback = studentInput.isSame(expectedAnswer) ?
      'Correct! 😃' : 'Try again. 😞';

    document.getElementById('feedback').textContent = feedback;
  }
</script>
</html>
```


We've just scratched the surface of what's possible with MathLive and CortexJS 
Compute Engine. This simple quiz application demonstrates the potential for 
creating interactive educational tools. Explore further to see how you can 
enhance and adapt this application to suit various educational needs.
