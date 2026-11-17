// Sync the Epsil language documentation from the compute-engine repo into
// `docs/epsil/`, rewriting it for the standalone epsil.dev site.
//
// The docs are authored upstream (`../compute-engine/src/epsil/docs/`, and its
// subdirectories such as `reference/`) for a section of a larger site, so every
// URL in them is rooted at `/epsil/`:
//
//     slug: /epsil/syntax/
//     [pattern matching](/epsil/control-flow/#match)
//     <ReadMore path="/epsil/examples/" />
//
// On epsil.dev the language *is* the site, so those live at the root instead.
// A doc `slug` is resolved relative to the plugin's `routeBasePath`, so it is
// not enough to set `routeBasePath: '/'` — the `/epsil` prefix has to come out
// of the frontmatter and the internal links as well. That rewrite happens here,
// at sync time, rather than in a remark plugin, because `slug` is read from
// frontmatter before any remark plugin runs.
//
// Links to the Compute Engine and MathJSON docs (`/compute-engine/…`,
// `/math-json/…`) stay relative: those pages are published on epsil.dev too.
// Links to the other products (`/mathfield/…`) resolve on mathlive.io only, so
// they are absolutized to https://mathlive.io.
//
// `docs/epsil/**/*.md` is GENERATED — edit the upstream copies in the
// compute-engine repo, never the files this writes.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { lintDocs, reportLint } from "./lint-epsil-docs.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "..", "compute-engine", "src", "epsil", "docs");
const TARGET_DIR = path.join(ROOT, "docs", "epsil");

// Where the old mathlive.io URLs are recorded for `plugins/epsil-redirect`,
// which turns them into redirect stubs in the mathlive.io build. Written here
// because this is the only place that sees a page's URL both before and after
// the rewrite.
const REDIRECTS_FILE = path.join(ROOT, "config", "epsil-redirects.json");
const EPSIL_URL = "https://epsil.dev";

// The sidebar lives here, but the pages it lists are authored upstream, so a
// page added in the compute-engine repo arrives with no sidebar entry. It still
// builds and is still reachable by URL — Docusaurus does not consider an
// unlisted doc an error — so the only symptom is that nobody can navigate to
// it. That is how `tour.md` shipped orphaned. See checkSidebarCoverage.
const SIDEBAR_FILE = path.join(ROOT, "sidebars.epsil.js");

const MATHLIVE_URL = "https://mathlive.io";

// `/` on epsil.dev is the marketing landing page (`src/pages-epsil/index.js`),
// so the introduction — which upstream owns the section root `/epsil/` — moves
// one level down instead of colliding with it.
const INTRODUCTION_PATH = "/introduction/";

// Sections that live on mathlive.io, not on epsil.dev. Anything else that is
// still absolute after the /epsil strip is reported so a new cross-product
// link is noticed here rather than by a reader hitting a 404.
// The Compute Engine and MathJSON docs are published on epsil.dev too, at the
// same paths, so links to them stay relative and the build checks them.
const EPSIL_SECTIONS = ["compute-engine", "math-json"];
const MATHLIVE_SECTIONS = ["mathfield", "mathlive", "about", "sdk"];

/**
 * Rewrite one URL as it should appear on epsil.dev. Returns the URL unchanged
 * if it is already absolute, relative, or an anchor.
 *
 * An absolute URL that is neither an Epsil page nor a known mathlive.io
 * section is left alone and reported through `onUnknown` — it would 404 on
 * epsil.dev, and guessing where it belongs is worse than saying so.
 */
function rewriteUrl(url, onUnknown) {
  if (!url.startsWith("/")) return url;

  if (url === "/epsil" || url === "/epsil/") return INTRODUCTION_PATH;

  // The section root carrying a fragment or query — `/epsil/#language-reference`
  // — is still the introduction page. Without this, the generic strip below
  // turns it into `/#language-reference`: an anchor on the landing page, which
  // is `src/pages-epsil/index.js` and has no headings to match, so the build
  // fails on a broken anchor.
  const rootSuffix = /^\/epsil\/?([#?].*)$/.exec(url);
  if (rootSuffix) return INTRODUCTION_PATH + rootSuffix[1];

  if (url.startsWith("/epsil/")) return url.slice("/epsil".length);

  const section = url.split("/")[1];
  if (EPSIL_SECTIONS.includes(section)) return url;
  if (MATHLIVE_SECTIONS.includes(section)) return MATHLIVE_URL + url;

  onUnknown(url);
  return url;
}

/** Split a document into its frontmatter block and its body. */
function splitFrontMatter(source) {
  if (!source.startsWith("---")) return [null, source];
  const end = source.indexOf("\n---", 3);
  if (end === -1) return [null, source];
  const bodyStart = source.indexOf("\n", end + 1);
  return [
    source.slice(0, bodyStart === -1 ? source.length : bodyStart + 1),
    bodyStart === -1 ? "" : source.slice(bodyStart + 1),
  ];
}

function rewrite(source, { onUnknown, onSlug }) {
  let [frontMatter, body] = splitFrontMatter(source);

  if (frontMatter) {
    frontMatter = frontMatter.replace(
      /^(slug:\s*)(\S+)$/m,
      (_, prefix, slug) => {
        const rewritten = rewriteUrl(slug, onUnknown);
        onSlug(slug, rewritten);
        return prefix + rewritten;
      }
    );
  }

  // Markdown links and images: [text](/epsil/syntax/#heading "title")
  body = body.replace(
    /(\]\()(\/[^)\s]*)/g,
    (_, prefix, url) => prefix + rewriteUrl(url, onUnknown)
  );

  // JSX props that carry a URL: <ReadMore path="/epsil/examples/" />, href=…
  body = body.replace(
    /((?:path|href|to|src)=")(\/[^"]*)"/g,
    (_, prefix, url) => `${prefix}${rewriteUrl(url, onUnknown)}"`
  );

  return (frontMatter ?? "") + body;
}

// Warn about synced pages the sidebar does not list, and sidebar entries whose
// page no longer exists (an upstream rename leaves both at once).
//
// The sidebar is read as text and scanned for `id:` rather than imported: it is
// an ES module Docusaurus loads with its own resolver, and a lint check is not
// worth taking on that. The parse is therefore approximate — it is allowed to
// miss an exotic entry, because a false "not listed" costs a glance while a
// missed page costs a reader. Warns rather than fails for the same reason the
// knowledge-base aliases in build.sh warn: an upstream page should not be able
// to break a release here.
async function checkSidebarCoverage(pageIds) {
  let sidebar;
  try {
    sidebar = await fs.readFile(SIDEBAR_FILE, "utf8");
  } catch {
    return; // No sidebar to check against; not this script's business to insist.
  }

  // Doc ids there are relative to `docs/` (`epsil/syntax`): the epsil.dev
  // docs plugin reads `docs/` for the Compute Engine pages as well.
  const listed = new Set(
    [...sidebar.matchAll(/\bid:\s*["']epsil\/([^"']+)["']/g)].map((m) => m[1])
  );

  const orphans = pageIds.filter((id) => !listed.has(id));
  if (orphans.length > 0) {
    console.warn(
      `[sync-epsil-docs] ${orphans.length} page(s) are not in sidebars.epsil.js, so ` +
        `nothing links to them from the navigation:\n  ` +
        orphans.join("\n  ")
    );
  }

  const missing = [...listed].filter((id) => !pageIds.includes(id));
  if (missing.length > 0) {
    console.warn(
      `[sync-epsil-docs] sidebars.epsil.js lists ${missing.length} page(s) that no ` +
        `longer exist upstream (the build will fail on these):\n  ` +
        missing.join("\n  ")
    );
  }
}

/**
 * List the Markdown files under `dir`, subdirectories included, as sorted
 * paths relative to `dir` with `/` separators (`syntax.md`,
 * `reference/core.md`).
 *
 * The subdirectories matter: the per-library reference pages live in
 * `reference/`, and `library.md` links to every one of them. When only the top
 * level was synced, those pages were never published and the epsil.dev build
 * stopped on 19 broken links.
 */
async function listMarkdown(dir, prefix = "") {
  const files = [];
  const entries = await fs.readdir(path.join(dir, prefix), { withFileTypes: true });
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...(await listMarkdown(dir, relative)));
    else if (entry.name.endsWith(".md")) files.push(relative);
  }
  return files.sort();
}

// `<name>.intro.md` is not a page. It is the hand-written introduction that
// the upstream generator (`scripts/build-library-reference.ts` in the
// compute-engine repo) copies into the generated `<name>.md` next to it.
// Publishing it would duplicate that text at a second URL, and because it has
// no frontmatter the URL would be one nobody chose.
const isPage = (name) => !name.endsWith(".intro.md");

// The symbol table of the site search: one record per library definition,
// written upstream by `scripts/build-search-symbols.ts` with `/epsil/`-rooted
// URLs, rewritten here like every other link. `scripts/build-search.mjs` reads
// it after the build. A checkout of compute-engine from before the file
// existed only loses the symbol results, so a missing file is a warning.
const SEARCH_SYMBOLS_SOURCE = path.join(SOURCE_DIR, "search-symbols.json");
const SEARCH_SYMBOLS_FILE = path.join(ROOT, "config", "epsil-search-symbols.json");

async function syncSearchSymbols(unknown) {
  let symbols;
  try {
    symbols = JSON.parse(await fs.readFile(SEARCH_SYMBOLS_SOURCE, "utf8"));
  } catch (error) {
    console.warn(
      `[sync-epsil-docs] No search symbols (${error.code ?? error.message}): run ` +
        `\`npm run doc\` in ../compute-engine. The search will have no symbol results.`
    );
    return;
  }
  for (const symbol of symbols)
    symbol.url = rewriteUrl(symbol.url, (url) => unknown.add(`search-symbols.json: ${url}`));
  await fs.writeFile(SEARCH_SYMBOLS_FILE, JSON.stringify(symbols) + "\n", "utf8");
}

// The Compute Engine card for AI agents is authored upstream next to the
// engine (`src/compute-engine/docs/for-agents.md`, served by the MCP server as
// `epsil://docs/compute-engine-api`) and published on epsil.dev at
// `/compute-engine/for-agents/`. Its links are rewritten like those of the
// Epsil pages. It is the one generated page in `docs/compute-engine/`, which is
// otherwise edited here; mathlive.io excludes it (`docusaurus.config.ts`).
const CE_CARD_SOURCE = path.join(ROOT, "..", "compute-engine", "src", "compute-engine", "docs", "for-agents.md");
const CE_CARD_TARGET = path.join(ROOT, "docs", "compute-engine", "for-agents.md");

async function syncComputeEngineCard(unknown) {
  let source;
  try {
    source = await fs.readFile(CE_CARD_SOURCE, "utf8");
  } catch (error) {
    console.warn(`[sync-epsil-docs] No Compute Engine agent card (${error.code ?? error.message}).`);
    return;
  }
  const content = rewrite(source, {
    onUnknown: (url) => unknown.add(`compute-engine/for-agents.md: ${url}`),
    onSlug: () => {},
  });
  await fs.writeFile(CE_CARD_TARGET, content, "utf8");
}

// The detail of the library reference entries, written here (the engine's
// definitions stay short: they ship in the engine bundle and feed `epsil doc`).
// `reference-details/<library>.md` has one `## <MathJSON name>` section per
// entry; the text before its `### MathJSON` is shown under the entry, the text
// after goes in the entry's MathJSON disclosure, headed by the MathJSON name
// and the LaTeX commands. A `## Section: <Heading>`
// is added to the page's overview, before "## Definitions". On a page with a detail file,
// every entry that has LaTeX commands or MathJSON detail gets the disclosure,
// headed by its MathJSON name, and its "MathJSON `X` ·" line is reduced to the
// signature: the page is Epsil first. An entry with neither keeps that line.
const DETAILS_DIR = path.join(ROOT, "reference-details");

function parseDetails(text, file, warnings) {
  const sections = new Map();
  const overview = [];
  const body = text.replace(/<!--[\s\S]*?-->/g, "");
  for (const part of body.split(/^## /m).slice(1)) {
    const newline = part.indexOf("\n");
    const name = part.slice(0, newline).trim();
    // `## Section: <Heading>` is a section of the page's overview, not of an
    // entry: it is inserted as `## <Heading>` before "## Definitions".
    const heading = /^Section:\s*(.+)$/.exec(name)?.[1];
    if (heading) {
      if (/^#{1,2} /m.test(part.slice(newline + 1)))
        warnings.push(`${file} ${name}: use ### or deeper in a section`);
      overview.push(`## ${heading}\n\n${part.slice(newline + 1).trim()}`);
      continue;
    }
    const [shown, mathJson = ""] = part.slice(newline + 1).split(/^### MathJSON\s*$/m);
    if (/^#{1,3} /m.test(shown)) warnings.push(`${file} ${name}: use #### for a subsection`);
    if (/^#{1,6} /m.test(mathJson)) warnings.push(`${file} ${name}: no heading in the MathJSON part`);
    sections.set(name, { shown: shown.trim(), mathJson: mathJson.trim() });
  }
  return { sections, overview };
}

async function spliceDetails(content, library, latex, warnings) {
  const file = `${library}.md`;
  let text;
  try {
    text = await fs.readFile(path.join(DETAILS_DIR, file), "utf8");
  } catch {
    return content;
  }
  const { sections: details, overview } = parseDetails(text, `reference-details/${file}`, warnings);
  const used = new Set();
  const lines = content.split("\n");
  const start = lines.findIndex((l) => l === "## Definitions");
  if (start < 0) {
    warnings.push(`reference/${file}: no "## Definitions" section to splice into`);
    return content;
  }
  // The generated paragraph that introduces the definitions ("Each
  // definition is listed under its Epsil spelling…") moves under the
  // "## Definitions" heading, so that it does not end an overview section.
  let at = start;
  const intro = lines.slice(0, start).findLastIndex((l) => l.startsWith("Each definition is listed under"));
  if (intro >= 0 && start - intro < 8) at = intro;
  const paragraph = lines.slice(at, start).join("\n").trim();
  const out = lines.slice(0, at);
  for (const section of overview) out.push(section, "");
  out.push(lines[start], "");
  if (paragraph) out.push(paragraph);
  let i = start + 1;
  while (i < lines.length) {
    if (!lines[i].startsWith("### ")) {
      out.push(lines[i++]);
      continue;
    }
    // One entry: from its heading to the next heading of level 2 or 3.
    let end = i + 1;
    while (end < lines.length && !/^#{2,3} /.test(lines[end])) end++;
    const entry = lines.slice(i, end);
    const heading = entry[0].slice(4).trim();
    const shape = entry.findIndex((l) => l.trim() !== "" && l !== entry[0]);
    const named = shape > 0 ? /^MathJSON `([^`]+)` · (.*)$/.exec(entry[shape]) : null;
    const id = named ? named[1] : heading;
    while (entry.length > 1 && entry.at(-1).trim() === "") entry.pop();
    const detail = details.get(id);
    if (detail) used.add(id);
    // The LaTeX commands go in the heading of the MathJSON part, as a JSON
    // array, so that a backslash or a quote needs no escaping.
    const commands = latex.get(id) ?? [];
    const attributes = `name="${id}"` + (commands.length > 0 ? ` latex={${JSON.stringify(commands)}}` : "");
    const hasPart = commands.length > 0 || Boolean(detail?.mathJson);
    // An entry with nothing for the MathJSON part keeps its "MathJSON `X` ·"
    // line.
    if (named && hasPart) entry[shape] = named[2];
    out.push(...entry, "");
    if (detail?.shown) out.push(detail.shown, "");
    if (detail?.mathJson) out.push(`<MathJson ${attributes}>`, "", detail.mathJson, "", "</MathJson>", "");
    else if (hasPart) out.push(`<MathJson ${attributes} />`, "");
    i = end;
  }
  for (const name of details.keys())
    if (!used.has(name)) warnings.push(`reference-details/${file}: no entry ${name} on the page`);
  return out.join("\n");
}

async function main() {
  let sources;
  try {
    sources = (await listMarkdown(SOURCE_DIR)).filter(isPage);
  } catch (error) {
    console.error(
      `[sync-epsil-docs] Cannot read ${SOURCE_DIR}. The compute-engine repo is ` +
        `expected as a sibling of this one.\n${error.message}`
    );
    process.exit(1);
  }

  if (sources.length === 0) {
    console.error(`[sync-epsil-docs] No .md files in ${SOURCE_DIR}`);
    process.exit(1);
  }

  await fs.mkdir(TARGET_DIR, { recursive: true });

  // Remove stale pages: a doc deleted upstream would otherwise linger here and
  // keep being published.
  for (const existing of await listMarkdown(TARGET_DIR)) {
    if (!sources.includes(existing)) await fs.rm(path.join(TARGET_DIR, existing));
  }

  const unknown = new Set();
  const routes = {};
  const linted = [];
  const detailWarnings = [];
  const latex = new Map();
  try {
    for (const symbol of JSON.parse(await fs.readFile(SEARCH_SYMBOLS_SOURCE, "utf8")))
      if (symbol.latex) latex.set(symbol.id, symbol.latex);
  } catch {
    // No symbol table: the disclosures go without their LaTeX commands.
  }
  for (const name of sources) {
    const source = await fs.readFile(path.join(SOURCE_DIR, name), "utf8");
    const onUnknown = (url) => unknown.add(`${name}: ${url}`);
    let route = "/" + name.replace(/\.md$/, "") + "/";
    const onSlug = (before, after) => {
      route = after;
      // The old mathlive.io section root is sent to the epsil.dev landing page
      // rather than to the introduction it used to render — a reader following
      // a stale bookmark for "the Epsil docs" wants the new site's front door.
      const isRoot = before === "/epsil" || before === "/epsil/";
      // Only a slug that was `/epsil/`-rooted ever had a mathlive.io home to
      // redirect. A page that authors its post-move epsil.dev slug directly has
      // none, and recording it here would publish a stub on mathlive.io at that
      // top-level path — squatting a URL the Epsil section never owned, and
      // pointing it at the identical path on epsil.dev. `errors.md` shipped
      // that way once (`slug: /errors/` produced a mathlive.io/errors/ stub).
      if (!isRoot && !before.startsWith("/epsil/")) return;
      routes[before.replace(/\/?$/, "/")] = isRoot ? "/" : after;
    };
    let content = rewrite(source, { onUnknown, onSlug });
    const library = /^reference\/([^/]+)\.md$/.exec(name)?.[1];
    if (library) content = await spliceDetails(content, library, latex, detailWarnings);
    await fs.mkdir(path.dirname(path.join(TARGET_DIR, name)), { recursive: true });
    await fs.writeFile(path.join(TARGET_DIR, name), content, "utf8");
    // Linted after the rewrite, so the routes and links checked are the ones
    // that ship on epsil.dev rather than the `/epsil/`-rooted originals.
    linted.push({ name, route, content });
  }

  await fs.mkdir(path.dirname(REDIRECTS_FILE), { recursive: true });
  await fs.writeFile(
    REDIRECTS_FILE,
    JSON.stringify(
      {
        // GENERATED by scripts/sync-epsil-docs.mjs — do not edit.
        target: EPSIL_URL,
        routes: Object.fromEntries(Object.entries(routes).sort()),
      },
      null,
      2
    ) + "\n",
    "utf8"
  );

  await syncSearchSymbols(unknown);
  await syncComputeEngineCard(unknown);

  await checkSidebarCoverage(sources.map((name) => name.replace(/\.md$/, "")));

  const shouldFail = reportLint(lintDocs(linted), {
    strict: process.env.EPSIL_DOCS_LINT !== "warn",
  });

  if (detailWarnings.length > 0)
    console.warn(`[sync-epsil-docs] reference details:\n  ${detailWarnings.join("\n  ")}`);
  if (unknown.size > 0) {
    console.warn(
      `[sync-epsil-docs] ${unknown.size} absolute links are neither an Epsil page ` +
        `nor a known mathlive.io section, and were left as-is:\n  ` +
        [...unknown].join("\n  ")
    );
  }

  console.log(`[sync-epsil-docs] ${sources.length} pages -> docs/epsil/`);

  // Reported last and exited on here rather than mid-loop, so the docs are
  // written and every finding is printed before the build stops.
  if (shouldFail) {
    console.error(
      `[sync-epsil-docs] Failing on the anchor findings above. Fix them in ` +
        `../compute-engine/src/epsil/docs/, or set EPSIL_DOCS_LINT=warn to proceed.`
    );
    process.exit(1);
  }
}

await main();
