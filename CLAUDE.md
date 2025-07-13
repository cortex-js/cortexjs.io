# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm start` - Start local development server (runs Docusaurus in dev mode)
- `npm run build` - Build the site (runs `bash scripts/build.sh`)
- `npm run serve` - Serve the built site locally

### Content Updates
- `npm run update` - Update dependent modules and regenerate API docs
- `npm run stage` - Create production build in `submodules/cortex-js.github.io/`
- `npm run deploy` - Deploy staged changes to GitHub Pages

### Utility Commands
- `npm run clear` - Clear Docusaurus cache
- `npm run swizzle` - Eject Docusaurus components for customization

## High-Level Architecture

This is a Docusaurus-based documentation website for the CortexJS ecosystem (MathLive and Compute Engine).

### Key Architecture Components

**Documentation Pipeline:**
- Source content in `docs/` (Markdown files)
- API documentation auto-generated from TypeScript `.d.ts` files using typedoc
- Build scripts in `scripts/` orchestrate changelog and API file generation
- Docusaurus processes everything into static HTML/CSS

**Deployment Strategy:**
- Built site outputs to `submodules/cortex-js.github.io/` (a Git submodule)
- This submodule is linked to the `cortex-js.github.io` repository
- GitHub Pages serves the site from that repository at `cortexjs.io`

**External Dependencies:**
- References `../mathlive/` and `../compute-engine/` for source API files
- Changelog and API content is copied from these sibling repositories during build

### Directory Structure

- `docs/` - Markdown documentation source files
  - `compute-engine/` - Compute Engine documentation
  - `mathfield/` - MathLive/Mathfield documentation  
- `src/` - React components, pages, and styling
  - `components/` - Custom React components (FunctionDefinition, Signature, etc.)
  - `pages/` - Docusaurus pages (index.js for homepage)
  - `css/` - Global CSS modules
- `build/` - Generated API documentation and knowledge base files
- `scripts/` - Build automation scripts
- `submodules/cortex-js.github.io/` - Deployment target (Git submodule)

### Build Process Flow

1. `scripts/build.sh` copies changelogs from `../mathlive/` and `../compute-engine/`
2. API files are copied and processed from sibling repositories
3. Docusaurus builds the site into `build/` directory
4. In production mode, content is copied to the submodule for deployment

## Development Workflow

### Initial Setup
After cloning, run:
```bash
git submodule init
git submodule update
npm start
```

### Content Updates
When external dependencies have new releases:
```bash
npm run update  # Syncs dependent modules
npm start       # Regenerates and serves locally
```

### Documentation Authoring

**Tutorial Pages (Guides):**
- Follow introduction → explanation → code examples pattern
- Use `**To <do something>**, <description>` format for mini-recipes
- Explain unfamiliar terms before use

**Reference Pages:**
- Start with hidden TOC div: `<nav className="hidden">### FunctionName</nav>`
- Use `<FunctionDefinition>` and `<Signature>` components for API docs
- Include MathJSON examples and LaTeX examples with `<Latex value="..." />`

### Component Patterns

The codebase uses custom React components:
- `<FunctionDefinition>` - API documentation wrapper
- `<Signature>` - Function signature display
- `<Latex>` - LaTeX rendering
- `<CodePlayground>` - Interactive code examples

CSS follows CSS Modules pattern (`index.module.css` files).

## Testing

No automated test suite exists. Validation consists of:
- Manual verification of build output
- Link checking in generated site
- Visual validation in browser before deployment