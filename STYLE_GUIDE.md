# Documentation Style Guide

This guide ensures that all documentation for the MathLive and Compute Engine libraries remains consistent, clear, and helpful for its target audience of developers, educators, and scientists.

### Tone and Voice

The voice of the documentation should be **professional, yet approachable and encouraging**. It should feel like a knowledgeable colleague guiding the reader through the library.

*   **Be Direct and Clear:** Use simple sentence structures and clear language. Avoid jargon where possible, but when technical terms are necessary (e.g., "boxed expression," "lexical scope"), define them or link to their definitions.
*   **Use an Inclusive Point of View:**
    *   Address the reader directly using the second person ("you"). Example: "You can customize the mathfield..."
    *   Use the first-person plural ("we'll") for tutorials and step-by-step guides to create a collaborative feel. Example: "In this tutorial, we'll create a web-based quiz."
*   **Be Action-Oriented:** Use imperative verbs for instructions. Start sentences with "To do X, use Y..." to make steps clear and actionable.

### Formatting and Structure

Consistency in formatting makes the documentation easier to navigate and read.

#### Page Structure
*   **`<Intro>`:** Every major guide or reference page should begin with an `<Intro>` block. This block provides a concise, high-level summary of the page's content, setting the context for the reader.
*   **`<ReadMore>`:** Use this component to link to related topics. This keeps the current page focused while providing pathways for readers who want to dive deeper into a specific area.
    *   **Example**: ` <ReadMore path="/compute-engine/guides/simplify/">Read more about **Simplifying Expressions**<Icon name="chevron-right-bold" /></ReadMore>`

#### Headings
Use Markdown headings (`#`, `##`, etc.) to create a clear hierarchical structure. Page titles are automatically generated; start with `##` for the main sections within a page.

#### Emphasis
*   **Bold (`**text**`)**: Use for:
    *   Key terms on their first introduction (e.g., **symbolic structure**, **fill-in-the-blank**).
    *   UI element labels (e.g., **Copy**, **Undo**).
    *   Important notes or warnings within a sentence.
*   **Code (`<code>text</code>`)**: Use for:
    *   HTML tags: `<math-field>`
    *   File names and paths: `/compute-engine/guides/security/`
    *   Property and method names: `mf.value`, `.simplify()`
    *   Attribute names: `read-only`
    *   LaTeX commands in prose: `\placeholder[]{}`
*   **Keyboard Keys (`<kbd>key</kbd>`)**: Use for all keyboard key references. Example: <kbd>ALT/OPTION</kbd>+<kbd>SPACE</kbd>.

#### Code Blocks
*   **Interactive Demos (`live`)**: Use for live, editable examples that showcase the functionality directly on the page.
    ````
    ```live
    :::html
    <math-field>f(x) = \sin(x+\pi)</math-field>
    ```
    ````
*   **Static Examples (`js example`, `json example`, etc.)**: Use for non-interactive code snippets that illustrate a concept or API usage.
    ````
    ```js example
    mf.menuItems = mf.menuItems.filter(item => !item.id.startWith('ce-'));
    ```
    ````
*   **Line Highlighting**: Use `mark-html-line` or `mark-js-line` to draw attention to specific lines in a code block.
    ````
    ```live show-line-numbers mark-line=4
    ````

#### Alerts and Callouts
Use callouts to highlight important information.
*   `:::info[Note]`: For supplementary information, tips, or non-critical notes.
*   `:::warning[Caution]`: For important information that, if ignored, could lead to unexpected behavior, errors, or a poor user experience (e.g., deprecated features, browser quirks).
*   `:::caution`: For high-risk actions or configurations, especially those with security implications (e.g., modifying Content Security Policy).

#### Tables
Use Markdown tables for structured data. For API references and lists of options, use the `symbols-table` class for consistent styling.

```html
<div class="symbols-table first-column-header">
| CSS Variable | Usage |
|:---|:---|
| `--caret-color` | Color of the insertion point |
</div>
```

#### API Reference Components
When documenting functions and their signatures, use the provided custom components for consistency.
*   **`<FunctionDefinition>`**: Wraps the entire documentation for a function.
*   **`<Signature>`**: Details a specific function signature, including parameters and return type.
*   **`<Latex>`**: Shows a rendered LaTeX example.
