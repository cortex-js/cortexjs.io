// Builds the search data of epsil.dev from a finished build:
//
// - `<outDir>/search/symbols.json`: the symbol table. One record per library
//   definition (config/epsil-search-symbols.json, synced from the
//   compute-engine repo by scripts/sync-epsil-docs.mjs) and the hand-written
//   operator and keyword entries (config/search-aliases.json). The search box
//   ranks these before the full-text results, so `Sqrt`, `\frac` or `|>` lands
//   on its definition.
// - `<outDir>/pagefind/`: a Pagefind index with one record per *section* of
//   each page, not one per page. Pagefind ranks pages and then picks a section
//   inside the page; given whole pages, it found the right page but often the
//   wrong part of it. Each section is a heading with an id, or a
//   `FunctionDefinition` (`<section id="Name">`), which on the reference pages
//   often has no heading of its own.
//
// Called from the plugin's `postBuild`, or by hand on an existing build:
//   node plugins/epsil-search/build-index.mjs build-epsil
//
// Every URL of the symbol table is checked against the built HTML. A broken
// hand-written alias fails the build; a broken library URL is reported and
// dropped, so an upstream generator bug cannot block a release.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as cheerio from 'cheerio';
import * as pagefind from 'pagefind';

const SITE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SYMBOLS_FILE = path.join(SITE_DIR, 'config', 'epsil-search-symbols.json');
const ALIASES_FILE = path.join(SITE_DIR, 'config', 'search-aliases.json');
const CE_DOCS_DIR = path.join(SITE_DIR, 'docs', 'compute-engine');

// Directories of the build that are not pages, and pages whose text would
// drown the rest: a changelog has a heading for nearly every topic.
const SKIP_DIRS = new Set(['assets', 'img', 'fonts', 'js', 'pagefind', 'search']);
const DEFAULT_EXCLUDE = ['/compute-engine/changelog/', '/compute-engine/api/'];

// Kept as word characters: `\` so that `\frac` is one term, `|` and `>` so
// that `|>` is.
const INCLUDE_CHARACTERS = '\\|>';

const log = (message) => console.log(`[epsil-search] ${message}`);
const warn = (message) => console.warn(`[epsil-search] ${message}`);

/** The `index.html` files under `dir`, as site URLs (`/syntax/`). */
async function listPages(dir, prefix = '/') {
  const urls = [];
  for (const entry of await fs.readdir(path.join(dir, prefix), { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (prefix === '/' && SKIP_DIRS.has(entry.name)) continue;
      urls.push(...(await listPages(dir, `${prefix}${entry.name}/`)));
    } else if (entry.name === 'index.html') {
      urls.push(prefix);
    }
  }
  return urls;
}

const pageCache = new Map();
async function loadPage(outDir, url) {
  if (!pageCache.has(url)) {
    let html;
    try {
      html = await fs.readFile(path.join(outDir, url, 'index.html'), 'utf8');
    } catch {
      html = undefined;
    }
    pageCache.set(url, html === undefined ? undefined : cheerio.load(html));
  }
  return pageCache.get(url);
}

/** Whether `url` (`/path/#anchor`) names a built page and an id on it. */
async function urlExists(outDir, url) {
  const [pagePath, anchor] = url.split('#');
  const $ = await loadPage(outDir, pagePath);
  if (!$) return false;
  if (!anchor) return true;
  return $(`[id="${anchor.replace(/"/g, '\\"')}"]`).length > 0;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

// The heading anchor Docusaurus gives a Markdown heading (github-slugger).
const slug = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');

/**
 * The entry of each MathJSON name in the Compute Engine reference pages
 * (docs/compute-engine, slugs under /compute-engine/reference/): Map<name, url>.
 * A `<FunctionDefinition name="X">` is an entry at its `#X` section (an anchor
 * the build checks); a name that is only a row of a table (`| \`Sqrt\` | …`)
 * points at the heading above the table. The first page that documents a name,
 * in file order, wins: `Add` is a row of the arithmetic page before it is
 * matrix addition on the linear-algebra page.
 */
async function mathJsonReference() {
  const entries = new Map();
  let files;
  try {
    files = (await fs.readdir(CE_DOCS_DIR)).filter((f) => f.endsWith('.md')).sort();
  } catch {
    return entries;
  }
  for (const file of files) {
    const src = await fs.readFile(path.join(CE_DOCS_DIR, file), 'utf8');
    const pageSlug = /^slug:\s*(\S+)/m.exec(src)?.[1];
    if (!pageSlug?.startsWith('/compute-engine/reference/')) continue;
    const page = pageSlug.replace(/\/?$/, '/');
    let heading;
    for (const [i, line] of src.split('\n').entries()) {
      const h = /^#{2,4}\s+(.+?)\s*$/.exec(line);
      if (h) heading = slug(h[1].replace(/`/g, ''));
      const def = /<FunctionDefinition name="([^"]+)"/.exec(line);
      if (def) {
        if (!entries.has(def[1])) entries.set(def[1], `${page}#${def[1]}`);
        continue;
      }
      const row = /^\|\s*`([A-Z][A-Za-z0-9]*)`\s*\|/.exec(line);
      if (row && heading && !entries.has(row[1])) entries.set(row[1], `${page}#${heading}`);
    }
  }
  return entries;
}

async function buildSymbols(outDir) {
  let symbols = [];
  try {
    symbols = await readJson(SYMBOLS_FILE);
  } catch (error) {
    warn(
      `No ${path.relative(SITE_DIR, SYMBOLS_FILE)} (${error.code ?? error.message}): ` +
        `run \`npm run sync:epsil\`. The search will have no library results.`
    );
  }
  const { aliases } = await readJson(ALIASES_FILE);

  const brokenAliases = [];
  for (const alias of aliases)
    if (!(await urlExists(outDir, alias.url))) brokenAliases.push(`${alias.title}: ${alias.url}`);
  if (brokenAliases.length > 0)
    throw new Error(
      `${brokenAliases.length} entries of config/search-aliases.json point to a page ` +
        `or an anchor that the build does not have:\n  ${brokenAliases.join('\n  ')}`
    );

  const mathJson = await mathJsonReference();
  const kept = [];
  const broken = [];
  let withMathJson = 0;
  const brokenMathJson = [];
  for (const s of symbols) {
    if (!(await urlExists(outDir, s.url))) {
      broken.push(`${s.id}: ${s.url}`);
      continue;
    }
    // The fields the search box reads, nothing else.
    const record = { id: s.id, library: s.libraryTitle, url: s.url };
    if (s.epsil) record.epsil = s.epsil;
    if (s.summary) record.summary = s.summary;
    if (s.keywords) record.keywords = s.keywords;
    if (s.latex) record.latex = s.latex;
    const mj = mathJson.get(s.id);
    if (mj) {
      if (await urlExists(outDir, mj)) {
        record.mathjson = mj;
        withMathJson++;
      } else brokenMathJson.push(`${s.id}: ${mj}`);
    }
    kept.push(record);
  }
  if (broken.length > 0)
    warn(
      `${broken.length} library entries point to a missing page or anchor and ` +
        `were left out of the search:\n  ${broken.slice(0, 20).join('\n  ')}`
    );

  if (brokenMathJson.length > 0)
    warn(
      `${brokenMathJson.length} MathJSON reference entries point to a missing ` +
        `anchor and were left out:\n  ${brokenMathJson.slice(0, 20).join('\n  ')}`
    );

  const target = path.join(outDir, 'search', 'symbols.json');
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(
    target,
    JSON.stringify({
      symbols: kept,
      aliases: aliases.map(({ terms, title, summary, url }) => ({ terms, title, summary, url })),
    })
  );
  log(
    `${kept.length} library entries (${withMathJson} with a MathJSON reference entry) ` +
      `and ${aliases.length} aliases -> search/symbols.json`
  );
}

/**
 * Split the `<article>` of a page into sections: [{ anchor, heading, text }].
 * The text of a KaTeX formula is its TeX source, so `\frac` is searchable.
 */
function splitSections($) {
  const article = $('article').first();
  if (article.length === 0) return [];

  article
    .find(
      'script, style, svg, button, .hash-link, nav.theme-doc-breadcrumbs, ' +
        '.theme-doc-footer, .theme-doc-toc-mobile, .pagination-nav'
    )
    .remove();
  article.find('.katex').each((_, el) => {
    const tex = $(el).find('annotation[encoding="application/x-tex"]').first().text();
    $(el).replaceWith(` ${tex} `);
  });

  const sections = [{ anchor: undefined, heading: '', text: [] }];
  const current = () => sections[sections.length - 1];
  const isHeading = (el) => /^h[1-4]$/.test(el.tagName) && el.attribs?.id;

  const walk = (node) => {
    if (node.type === 'text') {
      current().text.push(node.data);
      return;
    }
    if (node.type !== 'tag') return;
    if (isHeading(node)) {
      sections.push({ anchor: node.attribs.id, heading: $(node).text().trim(), text: [] });
      return;
    }
    if (node.tagName === 'section' && node.attribs?.id) {
      // A FunctionDefinition. When a (hidden) heading just opened a section
      // for it, keep that one: its anchor is the one the docs link to.
      const open = current();
      if (!(open.anchor && open.text.join('').trim() === ''))
        sections.push({ anchor: node.attribs.id, heading: node.attribs.id, text: [] });
    }
    for (const child of node.children ?? []) walk(child);
    if (/^(p|li|div|tr|pre|section|h[5-6]|td|th|br)$/.test(node.tagName)) current().text.push(' ');
  };
  for (const child of article.get(0).children) walk(child);

  return sections
    .map((s) => ({ ...s, text: s.text.join('').replace(/\s+/g, ' ').trim() }))
    .filter((s) => s.heading || s.text);
}

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function buildPagefind(outDir, exclude) {
  const { index, errors } = await pagefind.createIndex({
    forceLanguage: 'en',
    includeCharacters: INCLUDE_CHARACTERS,
  });
  if (errors.length > 0) throw new Error(`Pagefind: ${errors.join('; ')}`);

  let pages = 0;
  let records = 0;
  for (const url of await listPages(outDir)) {
    if (exclude.some((prefix) => url.startsWith(prefix))) continue;
    const $ = await loadPage(outDir, url);
    if (!$) continue;
    // A page whose content moved (`ReferenceMoved`) lists the old names with
    // links: indexed, it would compete with the entries it points to.
    if ($('[data-moved-to]').length > 0) continue;
    // `Epsil Syntax · Epsil`: the page's own title, without the site name.
    const pageTitle = $('title').first().text().replace(/\s*[·|]\s*Epsil\s*$/, '').trim();
    const sections = splitSections($);
    if (sections.length === 0) continue;
    pages++;
    for (const { anchor, heading, text } of sections) {
      const title = heading || pageTitle;
      // The heading is the <h1> (weight 7 in Pagefind's ranking) and the text
      // counts single. The page title is metadata, not text, so that it does
      // not open every excerpt; the search box weights it through
      // `ranking.metaWeights`.
      const content =
        `<html lang="en"><head><title>${escape(title)}</title></head>` +
        `<body data-pagefind-body><h1>${escape(title)}</h1><div>${escape(text)}</div>` +
        `<span data-pagefind-meta="page:${escape(pageTitle)}"></span></body></html>`;
      const { errors: addErrors } = await index.addHTMLFile({
        url: anchor ? `${url}#${anchor}` : url,
        content,
      });
      if (addErrors.length > 0) throw new Error(`Pagefind (${url}#${anchor}): ${addErrors.join('; ')}`);
      records++;
    }
  }

  const outputPath = path.join(outDir, 'pagefind');
  await fs.rm(outputPath, { recursive: true, force: true });
  const { errors: writeErrors } = await index.writeFiles({ outputPath });
  if (writeErrors.length > 0) throw new Error(`Pagefind: ${writeErrors.join('; ')}`);
  await pagefind.close();
  log(`${records} sections of ${pages} pages -> pagefind/`);
}

export async function buildSearchIndex({ outDir, exclude = DEFAULT_EXCLUDE }) {
  pageCache.clear();
  await buildSymbols(outDir);
  await buildPagefind(outDir, exclude);
}

// No top-level `await`: Docusaurus loads this module through jiti, which
// compiles it to CommonJS.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const outDir = path.resolve(process.argv[2] ?? 'build-epsil');
  buildSearchIndex({ outDir }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
