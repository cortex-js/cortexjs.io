# Suggested Commands for CortexJS.io Development

## Development Commands
- `npm start` - Start local development server (Docusaurus dev mode)
- `npm run build` - Build the site (runs bash scripts/build.sh)
- `npm run serve` - Serve the built site locally

## Content Updates
- `npm run update` - Update dependent modules and regenerate API docs
- `npm run stage` - Create production build in submodules/cortex-js.github.io/
- `npm run deploy` - Deploy staged changes to GitHub Pages

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