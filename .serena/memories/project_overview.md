# CortexJS.io Project Overview

## Purpose
Documentation website for the CortexJS ecosystem, specifically for MathLive (math editor) and Compute Engine (mathematical computation library).

## Tech Stack
- **Framework**: Docusaurus v3 (React-based static site generator)
- **Language**: TypeScript/JavaScript
- **Styling**: CSS Modules
- **Deployment**: GitHub Pages (via submodule to cortex-js.github.io)
- **Build Tools**: npm, bash scripts

## Architecture
- Static documentation site generated from Markdown files
- API documentation auto-generated from TypeScript .d.ts files
- Custom React components for documentation (FunctionDefinition, Signature, Latex, CodePlayground)
- Deployment via Git submodule to separate GitHub Pages repository

## Key Directories
- `docs/` - Markdown documentation source
- `src/` - React components and pages
- `build/` - Generated output
- `scripts/` - Build automation
- `submodules/cortex-js.github.io/` - Deployment target

## External Dependencies
- References sibling directories `../mathlive/` and `../compute-engine/` for source files
- Changelogs and API docs are copied from these during build