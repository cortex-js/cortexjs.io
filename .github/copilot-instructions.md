# CortexJS.io AI Coding Agent Instructions

This guide provides essential knowledge for AI coding agents to be productive in the cortexjs.io codebase. It covers architecture, workflows, conventions, and integration points specific to this project.

## Architecture Overview
- The site is built with [Docusaurus](https://docusaurus.io/) and published via GitHub Pages.
- Source content is authored in Markdown and processed into HTML/CSS.
- The build output is placed in `submodules/cortex-js.github.io`, a Git submodule linked to the published site.
- API documentation is generated from TypeScript `.d.ts` files using `typedoc` and custom scripts.
- Key directories:
  - `docs/` — Markdown documentation
  - `src/` — Source code, React pages/components, styles
  - `build/` — Generated API docs and guides
  - `submodules/cortex-js.github.io/` — Published site output
  - `scripts/` — Build and utility scripts

## Developer Workflows
- **Initial setup:**
  - Run `git submodule init && git submodule update` after cloning.
  - Use `npm start` for local development and server.
- **Documentation update:**
  - Run `npm run update` to sync dependent modules and regenerate docs.
- **Staging and deployment:**
  - Use `npm run stage` for production build (outputs to submodule).
  - Use `npm run deploy` to push updates to GitHub Pages.
- **Build scripts:**
  - `scripts/build.sh` orchestrates changelog, API file generation, and Docusaurus build.
  - On macOS, use `sed -i '' ...` for in-place file edits; this also works on Linux.
- **Debugging:**
  - Use VSCode debugger for converter scripts.

## Project Conventions
- Follows [GitHub scripts-to-rule-them-all](https://github.com/github/scripts-to-rule-them-all) for script naming.
- API docs use Google Documentation Style Guide.
- TypeScript code follows Google JS Style Guide.
- Changelogs and API files are auto-generated and post-processed in build scripts.
- React components/pages are in `src/pages/` and `src/components/`.
- Custom CSS modules are used for styling (`index.module.css`).

## Integration Points & Dependencies
- External modules: `mathlive`, `compute-engine` (referenced via relative paths and submodules).
- Docusaurus config: `docusaurus.config.ts` and sidebar in `sidebars.js`.
- Build output is synced to the submodule for deployment.
- DNS and GitHub Pages setup is automated via build scripts and requires `.nojekyll` and `CNAME` files.

## Examples & Patterns
- Example: To update a changelog, see `scripts/build.sh` for `cp`, `cat`, and `sed` usage.
- Example: React page pattern in `src/pages/index.js` — uses Docusaurus context, custom CSS modules, and links to feature pods.

## Testing & Validation
- Testing is manual: check generated site for valid links and HTML.
- No automated test suite is present; focus on build and deployment validation.

## Style Guide

### Style guide for Tutorial pages

Tutorial pages are also called "guides".

They should follow a consistent structure:
  - Introduction of key concepts
  - General explanation followed by code snippets with explanations

- Potentially unfamiliar terms should be explained before use
- When giving mini-recipes, use `**To <do something>**, <description>` format for clarity, followed by code examples.
- Use tables for structured data presentation.

### Reference Pages

References pages provide detailed information about specific features or APIs.

They should include:
- An introduction to the group of features or APIs discussed in the page, and an explanation of the following sections.
- APIs grouped in section by functionality or related features.
- Each API should start with a hidden div:
```
<nav className="hidden">
### Set
</nav>
```
  This div is used to create a hidden reference in the Table of Contents.
- Immediately after the hidden section there should be a `<FunctionDefinition>` component, containing one or more `<Signature>` components.
- The content of the `<FunctionDefinition>` should provide a description of the API and some examples using MathJSON. If appropriate, some LaTeX examples can be included as well, using the `<Latex value="..." />` component.


---
For further details, see `README.md` and key scripts in the `scripts/` directory.

> Please review and suggest improvements or clarify any missing sections for your workflow.
