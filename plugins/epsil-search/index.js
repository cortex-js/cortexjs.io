// The site search of epsil.dev.
//
// - `theme/SearchBar` replaces the theme's search box. It is a plugin theme
//   component rather than a file in src/theme/ because src/theme/ is shared
//   with mathlive.io, which keeps its Algolia search.
// - `postBuild` writes the search data into the build: the symbol table and a
//   Pagefind index of every section (see build-index.mjs).
// - The dev server runs no `postBuild` and has no built HTML to index, so it
//   serves `/pagefind/` and `/search/` from the last production build
//   (`options.buildDir`, `build-epsil/`). Its results are those of that
//   build; `npm run stage:epsil` refreshes them.
//
// build-index.mjs runs in a child process. Docusaurus loads this file through
// jiti, which compiles modules to CommonJS, and `pagefind` is published as an
// ES module only, so it cannot be imported from here.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

export default function epsilSearch(context, options = {}) {
  const buildDir = path.resolve(context.siteDir, options.buildDir ?? 'build-epsil');
  return {
    name: 'epsil-search',
    getThemePath() {
      return path.join(HERE, 'theme');
    },
    configureWebpack(_config, isServer) {
      if (isServer || process.env.NODE_ENV === 'production') return {};
      const dirs = ['pagefind', 'search'].filter((d) => existsSync(path.join(buildDir, d)));
      if (dirs.length === 0) return {};
      return {
        devServer: {
          static: dirs.map((d) => ({ directory: path.join(buildDir, d), publicPath: `/${d}`, watch: false })),
        },
      };
    },
    async postBuild({ outDir }) {
      execFileSync(process.execPath, [path.join(HERE, 'build-index.mjs'), outDir], {
        stdio: 'inherit',
      });
    },
  };
}
