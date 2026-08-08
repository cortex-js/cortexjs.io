# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm start` - Start local development server for mathlive.io (Docusaurus dev mode)
- `npm run start:epsil` - Start local dev server for epsil.dev (port 3001)
- `npm run build` - Build **both** sites (runs `bash scripts/build.sh`)
- `npm run serve` - Serve the built site locally

### Content Updates
- `npm run update` - Update dependent modules and regenerate API docs
- `npm run sync:epsil` - Re-sync `docs/epsil/` from the compute-engine repo
- `npm run stage` - Create production build in `submodules/cortex-js.github.io/`
- `npm run deploy` - Deploy staged changes to GitHub Pages (mathlive.io)
- `npm run stage:epsil` - Build epsil.dev into `build-epsil/`
- `npm run deploy:epsil` - Upload `build-epsil/` to Cloudflare Pages (epsil.dev)

### Utility Commands
- `npm run clear` - Clear Docusaurus cache
- `npm run swizzle` - Eject Docusaurus components for customization

## High-Level Architecture

This repo builds **two** Docusaurus sites for the CortexJS ecosystem:

| Site | Config | Content | Output | Host |
|---|---|---|---|---|
| **mathlive.io** | `docusaurus.config.ts` | `docs/` minus `docs/epsil` | `build/` → `submodules/cortex-js.github.io/` | GitHub Pages |
| **epsil.dev** | `docusaurus.epsil.config.ts` | `docs/epsil` only, rooted at `/` | `build-epsil/` | Cloudflare Pages |

They share everything else: `src/components`, `src/theme` (including the
swizzled `CodeBlock` that renders Epsil syntax highlighting), `src/css`,
`plugins/` and `static/`. Only content, sidebar, navigation and landing page
differ. See "The two-site split" below.

### Key Architecture Components

**Documentation Pipeline:**
- Source content in `docs/` (Markdown files)
- API documentation auto-generated from TypeScript `.d.ts` files using typedoc
- Build scripts in `scripts/` orchestrate changelog and API file generation
- Docusaurus processes everything into static HTML/CSS

**Deployment Strategy:**
- mathlive.io: `build/` is copied to `submodules/cortex-js.github.io/` (a Git
  submodule of the `cortex-js.github.io` repository), which GitHub Pages serves.
  `scripts/stage.sh` writes the `CNAME`; `scripts/deploy.sh` commits and pushes.
- epsil.dev: `build-epsil/` is uploaded directly to a Cloudflare Pages project
  by `scripts/deploy-epsil.sh` (wrangler). Nothing is committed.

### The two-site split

The Epsil language docs are authored in the compute-engine repo
(`../compute-engine/src/epsil/docs/*.md`) for a section rooted at `/epsil/`:
slugs and internal links are all written as `/epsil/…`. On epsil.dev the
language *is* the site, so `scripts/sync-epsil-docs.mjs` rewrites them on the
way in:

- `slug: /epsil/syntax/` → `slug: /syntax/`, and internal links likewise. A doc
  `slug` is resolved before any remark plugin runs, so this has to happen at
  sync time, not in the pipeline.
- The section root `/epsil/` becomes `/introduction/` — `/` on epsil.dev is the
  landing page in `src/pages-epsil/`.
- Links to the other products (`/compute-engine/…`, `/math-json/…`) are
  absolutized to `https://mathlive.io/…`. An absolute link the script does not
  recognize is left alone and reported; add it to `MATHLIVE_SECTIONS` if it is
  a mathlive.io page.

`docs/epsil/*.md` is **generated** — edit the upstream copies, never these.

Old mathlive.io URLs (`/epsil/…`, and `/cortex/…` from before the rename) are
redirected to epsil.dev by `plugins/epsil-redirect`, using the route table
`scripts/sync-epsil-docs.mjs` writes to `config/epsil-redirects.json`. GitHub
Pages cannot issue a real 301, so these are stub pages carrying a canonical
link, a meta refresh and a `location.replace`. Because they are stubs and not
routes, the Epsil pages must stay out of the mathlive.io build (`docs.exclude`)
— otherwise client-side navigation would render them and never redirect.

The knowledge-base bundles (`kb-epsil.md`, `kb-cortex.md`, `llms-epsil.txt`,
`llms-cortex.txt`) are still published on mathlive.io, copied from
`build-epsil/llms-full.txt`: an agent fetching one wants text, not a redirect.

**External Dependencies:**
- References `../mathlive/` and `../compute-engine/` for source API files
- Changelog and API content is copied from these sibling repositories during build

### Directory Structure

- `docs/` - Markdown documentation source files
  - `compute-engine/` - Compute Engine documentation
  - `mathfield/` - MathLive/Mathfield documentation  
  - `epsil/` - **Generated** Epsil language docs; the content of epsil.dev
- `src/` - React components, pages, and styling
  - `components/` - Custom React components (FunctionDefinition, Signature, etc.)
  - `pages/` - Docusaurus pages for mathlive.io (index.js for homepage)
  - `pages-epsil/` - Docusaurus pages for epsil.dev (landing page)
  - `shared/config/` - `navigation.json` (mathlive.io) and `navigation-epsil.json`
  - `css/` - Global CSS modules
- `static/` - Assets shared by both sites; `static-epsil/` adds the Cloudflare
  Pages `_headers`/`_redirects` for epsil.dev
- `config/epsil-redirects.json` - **Generated** old-URL → epsil.dev route table
- `build/` - mathlive.io output, plus knowledge base files
- `build-epsil/` - epsil.dev output
- `scripts/` - Build automation scripts
- `submodules/cortex-js.github.io/` - mathlive.io deployment target (Git submodule)

### Build Process Flow

1. `scripts/build.sh` copies changelogs from `../mathlive/` and `../compute-engine/`
2. API files are copied and processed from sibling repositories
3. `scripts/sync-epsil-docs.mjs` syncs and rewrites the Epsil docs
4. Docusaurus builds mathlive.io into `build/`
5. Docusaurus builds epsil.dev into `build-epsil/`
6. In production mode, the Epsil knowledge-base aliases are copied from
   `build-epsil/`, and `build/` is copied to the submodule for deployment

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