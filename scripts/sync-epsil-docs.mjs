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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "..", "compute-engine", "src", "epsil", "docs");
const TARGET_DIR = path.join(ROOT, "docs", "epsil");

// Where the old mathlive.io URLs are recorded for `plugins/epsil-redirect`,
// which turns them into redirect stubs in the mathlive.io build. Written here
// because this is the only place that sees a page's URL both before and after
// the rewrite.
const REDIRECTS_FILE = path.join(ROOT, "config", "epsil-redirects.json");
const EPSIL_URL = "https://epsil.dev";

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
  for (const name of sources) {
    const source = await fs.readFile(path.join(SOURCE_DIR, name), "utf8");
    const onUnknown = (url) => unknown.add(`${name}: ${url}`);
    const onSlug = (before, after) => {
      // The old mathlive.io section root is sent to the epsil.dev landing page
      // rather than to the introduction it used to render — a reader following
      // a stale bookmark for "the Epsil docs" wants the new site's front door.
      const isRoot = before === "/epsil" || before === "/epsil/";
      routes[before.replace(/\/?$/, "/")] = isRoot ? "/" : after;
    };
    await fs.writeFile(
      path.join(TARGET_DIR, name),
      rewrite(source, { onUnknown, onSlug }),
      "utf8"
    );
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

  if (unknown.size > 0) {
    console.warn(
      `[sync-epsil-docs] ${unknown.size} absolute links are neither an Epsil page ` +
        `nor a known mathlive.io section, and were left as-is:\n  ` +
        [...unknown].join("\n  ")
    );
  }

  console.log(`[sync-epsil-docs] ${sources.length} pages -> docs/epsil/`);
}

await main();
