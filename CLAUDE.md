# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm start` - Start local development server for mathlive.io (Docusaurus dev mode)
- `npm run start:epsil` - Start local dev server for epsil.dev (port 3001)
- The two dev servers can run at the same time. epsil.dev keeps its generated
  files in `.docusaurus-epsil/` and its webpack cache under an `epsil-` name
  (`separateWebpackCache` in `docusaurus.epsil.config.ts`); with the defaults
  shared, one site's server compiles the other site's docs and fails. A new
  command that runs the epsil config sets
  `DOCUSAURUS_GENERATED_FILES_DIR_NAME=.docusaurus-epsil`, as `start:epsil`,
  `stage:epsil` and `scripts/build.sh` do.
- A build of a site while that site's dev server runs shares its generated
  files: when a doc changes during the build, the dev server rewrites them,
  and the build fails with broken links to default paths
  (`/epsil/reference/…`). Stop the dev server, or build with
  `DOCUSAURUS_GENERATED_FILES_DIR_NAME` set to an absolute path outside the
  repo.
- `npm run build` - Build **both** sites (runs `bash scripts/build.sh`)
- `npm run serve` - Serve the built site locally

### Content Updates
- `npm run update` - Update dependent modules and regenerate API docs
- `npm run sync:epsil` - Re-sync `docs/epsil/` from the compute-engine repo
- `npm run stage` - Production build of **both** sites (`build/` → `submodules/cortex-js.github.io/`, and `build-epsil/`)
- `npm run deploy` - Deploy **both** sites: epsil.dev to Cloudflare Pages, then mathlive.io to GitHub Pages
- `npm run deploy:mathlive` - Deploy only mathlive.io
- `npm run stage:epsil` - Build only epsil.dev, into `build-epsil/`
- `npm run deploy:epsil` - Deploy only epsil.dev

### Utility Commands
- `npm run clear` - Clear Docusaurus cache
- `npm run swizzle` - Eject Docusaurus components for customization
- `npm run verify:snippets` - Execute the epsil.dev landing page code samples
  against the engine in `../compute-engine` and check them against the results
  the page prints. The playground loads the engine unversioned, so a release
  can change what those samples do; run this after an engine bump and before a
  release. `EPSIL_SNIPPETS=warn` reports without failing.

## High-Level Architecture

This repo builds **two** Docusaurus sites for the CortexJS ecosystem:

| Site | Config | Content | Output | Host |
|---|---|---|---|---|
| **mathlive.io** | `docusaurus.config.ts` | `docs/mathfield` and the top-level pages of `docs/` | `build/` → `submodules/cortex-js.github.io/` | GitHub Pages |
| **epsil.dev** | `docusaurus.epsil.config.ts` | `docs/epsil` (rooted at `/`) and `docs/compute-engine` (the paths it had on mathlive.io) | `build-epsil/` | Cloudflare Pages |

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

A release is `npm run stage && npm run deploy`. `stage` builds both sites and
`deploy` publishes both — epsil.dev first, because that is the step that fails
on an expired wrangler login (failing there leaves nothing pushed), and because
`deploy.sh` cannot be re-run once it has succeeded, so a retry of `npm run
deploy` would otherwise abort before reaching Cloudflare.

### The two-site split

The Epsil language docs are authored in the compute-engine repo
(`../compute-engine/src/epsil/docs/**/*.md`) for a section rooted at `/epsil/`:
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

`docs/epsil/**/*.md` is **generated** — edit the upstream copies, never these.
So is `docs/compute-engine/for-agents.md`, the Compute Engine card for AI
agents (upstream `src/compute-engine/docs/for-agents.md`); it is published on
epsil.dev only, and mathlive.io excludes it.

The library reference pages (`docs/epsil/reference/<library>.md`) are
generated upstream from the library definitions, which stay short because they
ship in the engine bundle. Their long text is written here, in
`reference-details/<library>.md`: one `## <MathJSON name>` section per entry,
Epsil first, with the MathJSON part after a `### MathJSON` line. The sync
splices each section after its entry and puts the MathJSON part, with the
LaTeX commands, in a closed `<MathJson>` disclosure (a native `<details>`, so
find-in-page opens it). The Compute Engine team edits these files here.
`reference-details/README.md` gives the format and the rules for examples.
`npm run verify:details` runs every `epsil` fence of these files with the
`epsil` CLI of `../compute-engine` and checks its `// ➔` result; the CLI runs
from that checkout's working tree, so another session's uncommitted engine
change can fail many examples at once. The hand-written MathJSON reference
pages (`docs/compute-engine/*-reference-*.md`) whose entries moved here are
`<ReferenceMoved>` stubs that keep their anchors and redirect each one. The
pages with no function entries (Sets, Group Theory, the Fungrim identity
tables) are kept as they are.

The sync copies subdirectories too (`reference/` holds one generated page per
library of the standard library), but skips `*.intro.md`: those are fragments
the upstream generator already merges into the page of the same name. The
sidebar (`sidebars.epsil.js`) is maintained here by hand, so the sync warns
about a synced page that the sidebar does not list.

Old mathlive.io URLs (`/epsil/…`, and `/cortex/…` from before the rename) are
redirected to epsil.dev by `plugins/epsil-redirect`, using the route table
`scripts/sync-epsil-docs.mjs` writes to `config/epsil-redirects.json`. GitHub
Pages cannot issue a real 301, so these are stub pages carrying a canonical
link, a meta refresh and a `location.replace`. Because they are stubs and not
routes, the Epsil pages must stay out of the mathlive.io build (`docs.exclude`)
— otherwise client-side navigation would render them and never redirect.

### The Compute Engine docs on epsil.dev

The Compute Engine and MathJSON docs (`docs/compute-engine/`) are published
on epsil.dev only, at the paths they had on mathlive.io (`/compute-engine/…`,
`/math-json/`):

- One docs plugin instance on epsil.dev reads `docs/` and includes
  `epsil/**` and `compute-engine/**`: two instances cannot share
  `routeBasePath: '/'`, and `/math-json/` is outside `/compute-engine/`.
  Doc ids are therefore relative to `docs/` in `sidebars.epsil.js`
  (`epsil/syntax`). The Compute Engine sidebar is `sidebars.compute-engine.js`.
- mathlive.io excludes `compute-engine/**`, and links to these pages from
  mathlive.io are absolute (`https://epsil.dev/compute-engine/…`). A second
  instance of `plugins/epsil-redirect` writes a stub for each old mathlive.io
  URL, from the route table `config/ce-redirects.json`; the stub keeps the
  `#anchor` of the URL, so an old link reaches the same anchor on epsil.dev. A
  page added to the Compute Engine docs now needs no entry there: mathlive.io
  never published it.
- Epsil links to `/compute-engine/…` and `/math-json/…` stay relative
  (`EPSIL_SECTIONS` in the sync), so the epsil.dev build checks them.

### Search on epsil.dev

`plugins/epsil-search/` replaces the search box of epsil.dev only (mathlive.io
keeps Algolia). Its `postBuild` writes two things into `build-epsil/`. The
dev server serves them from the last `npm run stage:epsil`, so its results
are those of that build, and it has no search until one exists:

- `search/symbols.json`: the library definitions, from
  `config/epsil-search-symbols.json` (**generated** upstream by
  `scripts/build-search-symbols.ts` in compute-engine, copied by
  `npm run sync:epsil`), and the operators and keywords of
  `config/search-aliases.json`, maintained here. The box shows these first.
  A broken alias URL fails the build; a broken library URL is dropped with a
  warning.
- `pagefind/`: a Pagefind index with one record per section (a heading with
  an id, or a `FunctionDefinition`), because ranking whole pages finds the
  right page but the wrong part of it.

To try a change without the full build, run
`node plugins/epsil-search/build-index.mjs build-epsil` on an existing build
and serve `build-epsil/`. A query that lands in the wrong place is usually
fixed with an alias, or with `keywords` on the definition upstream.

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
- `config/epsil-search-symbols.json` - **Generated** symbol table of the epsil.dev search
- `config/search-aliases.json` - Operators and keywords of the epsil.dev search (hand-maintained)
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

**Diagrams:**
- A ```` ```mermaid ```` fence renders as a diagram on both sites
  (`@docusaurus/theme-mermaid`, enabled by `markdown.mermaid: true` in both
  configs). The diagram is drawn in the browser; the static HTML holds only
  an empty container, so the knowledge-base bundles keep the fence as text.
- The theme follows the color mode: `neutral` in light mode, `dark` in dark
  mode (`themeConfig.mermaid` in both configs). Node labels wrap at 360px
  instead of mermaid's 200px default, so a one-line step stays one line.
- Prefer `flowchart TD` over `LR` for more than four steps: the content
  column is about 750px wide and a wide diagram is scaled down until its
  labels are unreadable. Keep a flowchart under about 8 levels; split a
  large tree into parts, as the type hierarchy in guide 08 does.

### Component Patterns

The codebase uses custom React components:
- `<FunctionDefinition>` - API documentation wrapper
- `<Signature>` - Function signature display
- `<Latex>` - LaTeX rendering
- `<CodePlayground>` - Interactive code examples

CSS follows CSS Modules pattern (`index.module.css` files).

## Testing

There is no test suite. Two checks run Epsil code against the engine:
`npm run verify:snippets` runs the code samples of the epsil.dev landing page,
and `npm run verify:details` the examples of `reference-details/`. Each fails
when a sample stops producing the result the page prints. Everything else is
manual:
- Manual verification of build output
- Link checking in generated site
- Visual validation in browser before deployment