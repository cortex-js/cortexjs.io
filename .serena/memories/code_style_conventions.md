# Code Style and Conventions

## General Conventions
- **Language**: TypeScript for configuration and components
- **Framework**: React components using Docusaurus patterns
- **Styling**: CSS Modules pattern (index.module.css files)

## Documentation Patterns
- Tutorial pages follow: introduction → explanation → code examples
- Reference pages start with hidden TOC: `<nav className="hidden">### FunctionName</nav>`
- Use custom components: `<FunctionDefinition>`, `<Signature>`, `<Latex>`
- Mini-recipes format: `**To <do something>**, <description>`

## File Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Documentation in `docs/` with subdirectories for each product
- CSS modules alongside components

## Build Conventions
- Changelogs copied from sibling repositories during build
- API docs auto-generated from TypeScript definitions
- Production builds go to submodules/cortex-js.github.io/

## Important Notes
- NEVER add comments unless explicitly requested
- Follow existing patterns in the codebase
- Prefer editing existing files over creating new ones
- Don't create documentation files unless explicitly requested