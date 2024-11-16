---
date: Last Modified
title: Fill-in-the-Blank
slug: /mathfield/guides/fill-in-the-blank/
---


**To have one or more portions of a mathfield editable, while the rest is 
read-only**, use a `readonly` mathfield, and the `\placeholder[]{}` command.

```html
<math-field readonly>
  x=\placeholder[answer]{}
</math-field>
```

This feature is called **"fill-in-the-blank"**.

It's often used to prompt a student to provide an answer to a quiz by 
filling in portions of a formula.

The first argument of the `\placeholder` command, i.e. `[answer]` in the
example above, is the identifier of the placeholder. It can be any string
that does not contain spaces or special characters. The identifier 
indicates that the placeholder is editable, and it is used
to access the value of the placeholder.


The main argument of the `\placeholder` command, i.e. the one in `{}` is the 
value of the prompt. You can leave it blank, but the brackets must be present.


## Example

In the example below a student is asked to fill in the blanks to provide 
a reduced fraction.

We check the answer by listening to the `input` event of the mathfield,
and comparing the value of the prompts to the expected answer.
We also change the state of the prompts to indicate whether the answer
was correct or not.

```live
:::js
const mf = document.getElementById('mf');
//
mf.addEventListener('input', (ev) => {
  const num = mf.getPromptValue('numerator');
  const den = mf.getPromptValue('denominator');
//
  mf.setPromptState('numerator', num === "5" ? 'correct' : 'incorrect');
  mf.setPromptState('denominator', den === "4" ? 'correct' : 'incorrect');
//
  console.clear();
  if (num === "5" && den === "4") 
    console.info('Correct!');
   else 
    console.info('Incorrect!');
});

:::html
<math-field readonly id=mf  style="font-size:2em">
  \frac{15}{12}= \frac
    {\placeholder[numerator]{?}}
    {\placeholder[denominator]{?}}
</math-field>
```

The value returned by `mf.getPromptValue()` is a LaTeX string. If you need to
use the value in a computation, you will need to convert it to a number.
For example, `parseInt(mf.getPromptValue('numerator'))`.

You can also use the Compute Engine to evaluate the value of the prompt.
This allows you to check the answer using more sophisticated symbolic 
computation.

```live
:::js
const mf = document.getElementById("mf");
//
let typingTimer;  // Timer identifier
//
// On input, start the countdown
mf.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(checkAnswer, 2000);
});
//
function checkAnswer () {
  const ce = MathfieldElement.computeEngine;
  const answer = ce.parse(mf.getPromptValue("answer"));
  const correctAnswer = ce.parse("x^2 - 1");
//
  const ok = answer.isSame(correctAnswer);
//
  console.info(ok ? "Correct!" : "Incorrect!");
}

:::html
<math-field readonly id=mf  style="font-size:2em">
  (x+1)(x-1) = \placeholder[answer]{?}
</math-field>
```

In the example above, we use the Compute Engine to parse the answer provided
by the student, and compare it to the correct answer. The Compute Engine
can also be used to evaluate the answer, or to simplify it.

We use a timer to wait for the student to finish typing before checking
the answer. This avoids checking the answer after every keystroke, which
would be distracting for the student.

Because we are using `isSame()` to compare the answer, the student can
provide the answer in a different form, for example `x^2 - 1` or `-1 + x^2`.

If you want a more strict comparison, you can use the non-canonical form
of the answer, i.e. 

```js example
const answer = ce.parse(
    mf.getPromptValue("answer"), { canonical: false });
const correctAnswer = ce.parse("x^2 - 1", { canonical: false });
```

<ReadMore path="/compute-engine/guides/symbolic-computing/#comparing-expressions">
Read more about **Comparing Expressions** using the Compute Engine.
</ReadMore>



## Accessing all the Prompts

**To get a list of all the prompts in a mathfield**, use 
`mf.getPrompts()`. It returns an array of identifiers, or
an empty array if there are no prompts.



## Accessing the Value of a Prompt

**To access the value of a prompt**, use `mf.getPromptValue()` and `mf.setPromptValue()`. The first argument of these functions is the id of the prompt. The optional second 
argument of `getPromptValue()` is the same as `mf.getValue()` and can be used to customize the output format.


## Accessing the State of a Prompt

A prompt can be locked or unlocked. When locked, it is not editable.

A prompt can also be either in a correct or incorrect state.The prompt renders accordingly, which can be used to indicate that a provided answer was correct or incorrect.

**To change the lock state of a prompt**, use `mf.setPromptState()` and `mf.getPromptState()` to read the 
current state of the prompt.


