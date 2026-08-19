// Sync the Epsil language documentation from the compute-engine repo into
// `docs/epsil/`, rewriting it for the standalone epsil.dev site.
//
// The docs are authored upstream (`../compute-engine/src/epsil/docs/*.md`) for
// a section of a larger site, so every URL in them is rooted at `/epsil/`:
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
// Links that point at the *other* products (`/compute-engine/…`, `/mathfield/…`,
// `/math-json/…`) resolve on mathlive.io and have no counterpart on epsil.dev,
// so they are absolutized to https://mathlive.io.
//
// `docs/epsil/*.md` is GENERATED — edit the upstream copies in the
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
const MATHLIVE_SECTIONS = ["compute-engine", "mathfield", "mathlive", "math-json", "about", "sdk"];

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

  const listed = new Set([...sidebar.matchAll(/\bid:\s*["']([^"']+)["']/g)].map((m) => m[1]));

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

async function main() {
  let sources;
  try {
    sources = (await fs.readdir(SOURCE_DIR)).filter((f) => f.endsWith(".md")).sort();
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
  for (const existing of await fs.readdir(TARGET_DIR)) {
    if (existing.endsWith(".md") && !sources.includes(existing))
      await fs.rm(path.join(TARGET_DIR, existing));
  }

  const unknown = new Set();
  const routes = {};
  const linted = [];
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
    const content = rewrite(source, { onUnknown, onSlug });
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

  await checkSidebarCoverage(sources.map((name) => name.replace(/\.md$/, "")));

  const shouldFail = reportLint(lintDocs(linted), {
    strict: process.env.EPSIL_DOCS_LINT !== "warn",
  });

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
