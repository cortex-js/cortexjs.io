---
title: Style Guide
permalink: /docs/coding-style-guide/
read_time: true
layout: single
date: Last Modified
---
# Coding Style Guide

## Guiding Principles

Good style is subjective and many decisions are arbitrary. The project uses
these guiding principles:

-   **Consistency.** The code in the project should look as if it had been
    written by a single person. Don't write code for yourself, but for the many
    people who will read it later.
-   **Clarity before performance.** Write code that is easy to read, and avoid
    obscure constructs that may obfuscate the code to improve performance. For
    example, RegEx are crazy fast in all modern browsers, and trying to roll out
    your own pattern matching will result in more code and less performance.
    If you think something could be made faster, use [http://jsben.ch/](https://http://jsben.ch/) to
    try out options in various browsers and compare the results. You might be
    surprised.
-   **Robustness Principle (Postel's Law).** "Be conservative in what
    you do, be liberal in what you accept from others". For example, functions that
    are invoked internally do not need to check that the input parameters are valid.
    However, public APIs should check the validity of parameters, and behave
    reasonably when they are invalid. See [this plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for Visual Studio Code.

The project is setup to use [`prettier`](https://prettier.io/) an opinionated
code formatter. Formatting will be applied before pushing to the repo. You can 
also configure your editor to apply the formatting automatically on save, for 
example.

In general:

1. Follow the conventions already in use in the codebase
2. Follow the [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html),
   with the exception of the indentation with 4-spaces instead of 2-spaces.

## Summary of Naming Conventions

|                          |                                                                             |
| :----------------------- | :-------------------------------------------------------------------------- |
| **Repo**                 | `math-json`                                                                 |
| **Directory**            | `html-test-cases`                                                           |
| **File**                 | `json-parser.ts`                                                            |
| **Module**               | `jsonParser`                                                                |
| **Class, Enum**          | `ComplexNumber`, `JsonParser`                                               |
| **Method, Function**     | `readFile()`<br>Use an action verb<br>`isDirty` or `hasFinished` for boolean<br> |
| **Private Method**       | `private resetBuffer()`                                                              |
| **Private Function**     | Like function, marked `@private` and not exported                           |
| **Parameter**            | `initialPosition`                                                           |
| **Unused parameter**     | `_initialPosition` or `_`                                                   |
| **Accessor**             | `getContent` or `get content`                                         |
| **Constant, Enum Value** | `HTTP_HEADER_SIZE`                                                          |
| **Template parameter**   | `T`, `TYPE`                                                                 |

## Other best practices

-   Don't use **`default`** for exports [\*](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
-   **Avoid boolean as arguments.** Instead, use an `options` object literal with
    key/value pairs spelling out the meaning of the boolean.
-   **Functions should have at most 3 arguments**. If additional configuration is
    necessary, use an optional object literal as the last argument.

```javascript
// 💩
function renderText(text: string,
    fontFamily = 'Helvetica',
    fontSize = 12,
    lineSpacing = 1.2,
    style = ''
);
renderText("hello world", "Helvetica", 18, 1.5, "bold");

// 👍
function renderText(text: string, {
    fontFamily = 'Helvetica',
    fontSize = 12,
    lineSpacing = 1.2,
    style = ''
});
renderText("hello world");
renderText("hello world", {
    fontFamily: "Helvetica",
    fontSize: 18,
    lineSpacing: 1.5,
    style: "bold"
});
```

-   Avoid providing an explicit type when the compiler can infer it.

```javascript
// 💩
let action: string = 'fly';
let distance: number = 100;

// 👍
let action = 'fly';
let distance = 100;
```

-   Use **higher order functions**: `.map()`, `.reduce()`, `.filter()`, `.some()`,
    `.every()` and `.find()`.
-   To make a shallow clone of an object literal or of an array, use the spread operator

```javascript
const array = ['Thranduil', 'Legolas', 'Thingol', 'Glorfindel', 'Galadriel'];
const object = { name: 'Gandalf', cloak: 'Grey' };
const objectCopy = { ...object };
const arrayCopy = { ...array };
```

-   To make a deep clone of an object literal or an array, use JSON.
    <br>However, be aware that Dates, functions, `undefined`, `Infinity`, `RegExp`,
    `Map`, `Set`, `Blob`, `FileList`, `ImageData`, sparse `Array`, Typed Arrays and
    circular references cannot be serialized to JSON, and will be replaced by `null`
    or throw.
    <br>There is [a proposal](https://github.com/whatwg/html/issues/793_) for an API for deep cloning making its way through the
    standardization process.

```javascript
const array = [
    ['Frodo', 'Samwise', 'Meriadoc', 'Peregrin'],
    ['Gandalf'],
    ['Legolas'],
    ['Gimli'],
    ['Aragorn', 'Boromir'],
];
const object = {
    name: 'Gandalf',
    aliases: ['Mithrandir', 'Tharkûn', 'Olórin', ' Incánus'],
};

const deepClone = JSON.parse(JSON.stringify(object));
const arrayDeepCopy = JSON.parse(JSON.stringify(array));
```
