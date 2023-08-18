---
title: Contributing Code
permalink: /docs/contributing-code/
read_time: true
layout: single
date: Last Modified
sidebar:
  - nav: "universal"
---
# Contributing Code
## Can I Help Fix a Bug?

Sure! 

Have a look at the issue report: if the issue is assigned to someone,
they're on it! Maybe you can find something else to work on, or you can contact 
the person it's assigned to to see if they need a hand.

If the issue is not assigned to anyone, add a comment in the issue indicating 
you'd like to work on resolving the issue and go for it!

## How to Submit Some Code?

Whether you have a fix for an issue, some improved test cases, or a brand
new feature, we welcome your contributions in the form of pull requests.

Your contributions are governed by the [GitHub TOS section 6](https://help.github.com/en/github/site-policy/github-terms-of-service#6-contributions-under-repository-license) which indicate that your contributions are made under the same license as the project.<br><br>Furthermore, by making a contribution to the project, you certify that you have the right to submit to the project as detailed in the [Developer Certificate of Origin](https://developercertificate.org/).{.notice--info}

Follow this process if you'd like your work considered for inclusion in the project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

    ```bash
    # Clone your fork of the repo into the current directory
    git clone https://github.com/<your-username>/<repo-name>

    # Navigate to the newly created directory
    cd <repo-name>

    # Assign the repo to a remote called "upstream"
    git remote add upstream https://github.com/<upstream-owner>/<repo-name>
    ```

2. If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout <dev-branch>
    git pull upstream <dev-branch>
    ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

    ```bash
    git pull [--rebase] upstream <dev-branch>
    ```

6. Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description.

Once submitted, your Pull Request is reviewed and you will receive
some feedback to make sure that it fits in with:

-   the roadmap for the project
-   the architecture of the project
-   the coding [Style Guide](/docs/coding-style-guide/) used by the project

After it has has been accepted, you Pull Request will be merged into the main branch.

Thank you for your contribution!


## Overview of the MathLive Repository

Here's an overview of the MathLive code structure, designed to help you understand the project if you're interested in contributing:

### Source Directory (`src`)

The source directory contains all the essential code for MathLive:

- **`core`**: Handles parsing and rendering LaTeX into HTML markup.
- **`core-atoms`**: Contains definitions for rendering and generating LaTeX for mathematical layout objects (fractions, delimiters, arrays, etc.).
- **`core-definitions`**: Contains definitions of supported LaTeX commands, interpreting their arguments and mapping them to appropriate atoms.
- **`editor`**: Utilities to handle specific features of the editor, such as virtual keyboard, localization, keybindings, etc.
- **`editor-mathfield`**: Manages user interactions with the math field, including keyboard and pointer input.
- **`editor-model`**: Represents the state of the math expression, including its content and selection, along with the code necessary to modify it.
- **`addons`**: Miscellaneous.

### Core Components

- **`core`**: Contains the code to parse and render LaTeX. It uses `core-definitions` to interpret LaTeX commands and `core-atoms` to render them.
- **`core-atoms`**: Contains the definition of supported layout primitives, each being a subclass of the base `Atom` class.
- **`core-definitions`**: Contains the definitions of supported LaTeX commands, specifying how to interpret each command.

### Editor Components

- **`editor-mathfield`**: Contains the code to handle user interactions with the math field, including mouse or touch and keyboard input.
- **`editor-model`**: Contains the code for the `ModelPrivate` class, representing the state of the math field, including its content and selection.

### Documentation

- **`CONTRIBUTOR_GUIDE.md`**: A comprehensive guide for developers who want to contribute to the project. It includes details about setting up the development environment, code structure, language and coding style, bundling, browser support, accessibility, and architecture.

### Commands Reference

- **`COMMANDS_REFERENCE.md`**: MathLive supports over 800 standard TeX and LaTeX commands. A complete list can be found in this document.

### Conclusion

The MathLive project is well-structured, with clear separation of concerns between core functionalities, rendering, and user interactions. Understanding these components will provide a solid foundation for contributing to the project, whether you're fixing a bug or adding a new feature.

## MathLive Theory of Operations

Here's a basic description of the algorithm used by MathLive to render and edit an equation:

### 1. Parsing LaTeX Input
- **Lexer**: Converts the LaTeX string into tokens (`Token[]`).
- **Parser**: Uses the tokens to create a tree of mathematical symbols or "atoms" (`Atom[]`), interpreting LaTeX commands with the help of `core-definitions`.

### 2. Rendering LaTeX to HTML
- **Atoms to Boxes**: The atoms are turned into "boxes" (`Box[]`), which are virtual DOM nodes representing layout units.
- **HTML/SVG Markup Generation**: The boxes are rendered into HTML/SVG markup, using TeX layout algorithms to ensure high-quality rendering.

### 3. Editing and User Interaction
- **Mathfield Class**: Captures keyboard and pointing device events, presenting an appropriate user interface.
- **Model Class**: Encapsulates operations on the tree of atoms, including adding/removing content and tracking/modifying the insertion point and selection.
- **Editor Components**: Handle specific user interactions, such as virtual keyboards, localization, text-to-speech, and more.

### 4. Accessibility and Alternate Renditions
- **Spoken Text Generation**: MathLive can generate spoken text representations of the formula, with prosody hints for natural text-to-speech rendition.
- **Accessibility Support**: Includes keyboard shortcuts for aural navigation and understanding of complex formulas, and support for screen readers.

### 5. Architecture Overview
- **Core**: Handles rendering of LaTeX to HTML markup, following TeX algorithms for accurate rendering.
- **Editor**: Manages user interaction with the formula, using Core for rendering and Model for manipulating the in-memory representation.

### Conclusion

The MathLive algorithm is a multi-step process that involves parsing LaTeX input, rendering it into HTML/SVG markup, and providing a rich editing interface with accessibility support. The architecture is divided into Core and Editor components, each handling specific aspects of rendering and user interaction.

This high-level overview provides a basic understanding of how MathLive renders and edits equations. For a more in-depth exploration, the source code and contributor documentation would be valuable resources.

## Compute Engine Repo and Theory of Operations


### Overview
The repository is primarily focused on mathematical computation and provides a robust engine for symbolic and numeric computations. It's structured into several key parts:

1. **Compute Engine**: Core logic for computations.
2. **Library**: Mathematical functions and constants.
3. **LaTeX Syntax**: Parsing and handling LaTeX expressions.
4. **Cortex**: Additional documentation and details.
5. **Docs**: Guides and assumptions related to symbolic computing.
6. **Math JSON**: JSON format for mathematical expressions.

### Theory of Operations

#### Compute Engine
The compute engine is the heart of the system, providing symbolic and numeric computations. It's designed to be extensible and can handle a wide range of mathematical expressions.

#### Library
The library contains predefined mathematical functions, constants, and symbols. It's a vital part of the system, allowing users to perform complex calculations without having to define basic mathematical constructs.

#### LaTeX Syntax
This part of the system focuses on parsing and handling LaTeX expressions. It translates LaTeX into a format that the compute engine can understand, bridging the gap between human-readable notation and machine processing.

#### Math JSON
Math JSON is a specific JSON format designed to represent mathematical expressions. It's a standardized way to communicate mathematical constructs between different parts of the system or with external applications.

### Conclusion
The cortex-js/compute-engine repository is a comprehensive solution for mathematical computations, offering a wide range of features from basic arithmetic to complex symbolic calculations. Its modular design and extensive documentation make it a versatile tool for anyone working with mathematical expressions, whether in LaTeX or other formats.