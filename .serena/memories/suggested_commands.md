# Suggested Commands for CortexJS.io Development

## Development Commands
- `npm start` - Start local development server (Docusaurus dev mode)
- `npm run build` - Build the site (runs bash scripts/build.sh)
- `npm run serve` - Serve the built site locally

## Content Updates
- `npm run update` - Update dependent modules and regenerate API docs
- `npm run stage` - Production build of both sites (mathlive.io into submodules/cortex-js.github.io/, epsil.dev into build-epsil/)
- `npm run deploy` - Deploy both sites: epsil.dev to Cloudflare Pages, then mathlive.io to GitHub Pages
- `npm run deploy:mathlive` / `npm run deploy:epsil` - Deploy just one of the two

## Utility Commands
- `npm run clear` - Clear Docusaurus cache
- `npm run swizzle` - Eject Docusaurus components for customization

## Git Commands (Darwin/macOS)
- `git status` - Check current changes
- `git diff` - View unstaged changes
- `git add .` - Stage all changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote

## File Operations
- `ls -la` - List files with details
- `find . -name "*.ts"` - Find TypeScript files
- `grep -r "pattern" .` - Search for pattern in files

## Testing & Validation
- Manual browser testing after build
- No automated test suite currently exists