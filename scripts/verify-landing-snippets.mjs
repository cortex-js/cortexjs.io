// Execute every Epsil code sample on the epsil.dev landing page against a real
// engine, so the samples — and the `// ➔` results printed beside them — are
// verified rather than assumed.
//
// This exists because of two decisions that pull against each other:
//
//  1. `src/components/EpsilPlayground` loads the engine UNVERSIONED
//     (`https://esm.run/@cortex-js/compute-engine/epsil`), so the REPL tracks
//     whatever is `latest`. A breaking release reaches the page immediately.
//  2. The landing page samples are static — they are never executed in the
//     browser, so a sample that stopped working would look completely fine and
//     go on quietly printing a result the engine no longer produces.
//
// The hero snippet has the opposite risk: it DOES run on mount, in a REPL that
// keeps one ComputeEngine across runs, so a redefinition that collides with an
// earlier binding only fails on the second click. It is run twice here, in one
// engine, for exactly that reason.
//
// The engine comes from the sibling `../compute-engine` checkout rather than
// the CDN, matching how the rest of the build already sources that repo. It is
// the version the docs were written against; the CDN serves whatever is
// published, so the two can differ across a release. That gap is the point —
// a mismatch shows up here as a failing sample instead of on the live site.
//
// Run it after an engine bump, after editing the page, and before a release:
//
//     npm run verify:snippets
//
// Set EPSIL_SNIPPETS=warn to report without failing (a release should not be
// held up by a cosmetic drift in a printed result).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = path.join(ROOT, "src/pages-epsil/index.js");
const ENGINE = path.join(ROOT, "../compute-engine/dist/esm/epsil.js");

// Samples that are SUPPOSED to produce an error diagnostic, keyed by card
// title. A title listed here that no longer appears on the page is itself an
// error — otherwise renaming a card would silently disable its check.
const EXPECTED_ERROR = new Set(["Types that describe your data"]);

/** Undo the escaping a JS template literal would have applied. */
function unescapeTemplate(raw) {
  return raw.replace(/\\\\/g, "\\").replace(/\\`/g, "`").replace(/\\\$/g, "$");
}

/**
 * Pull the hero source and every feature sample out of the page.
 *
 * Extraction is textual because the page is JSX importing `@theme/*` — it
 * cannot be imported from plain node. That makes it brittle, so the sample
 * count is checked against the number of `code:` fields in the file: a regex
 * that silently swallows two entries as one is a failure, not a quiet pass.
 */
export function extractSamples(source) {
  const samples = [];

  const hero = source.match(/const HERO_SOURCE = `([\s\S]*?)`;/);
  if (!hero) throw new Error("HERO_SOURCE not found in the page");
  samples.push({ title: "(hero)", code: unescapeTemplate(hero[1]), rerun: true });

  const featureRe =
    /title: "([^"]+)",\n\s*body:[\s\S]*?\n\s*code: `([\s\S]*?)`\s*,/g;
  for (const [, title, raw] of source.matchAll(featureRe))
    samples.push({ title, code: unescapeTemplate(raw), rerun: false });

  const declared = (source.match(/^\s*code: `/gm) ?? []).length;
  const found = samples.length - 1; // minus the hero
  if (declared !== found) {
    throw new Error(
      `extracted ${found} feature sample(s) but the page declares ${declared} ` +
        `\`code:\` field(s) — the extraction regex is out of step with the page`
    );
  }

  for (const s of samples) {
    if (s.code.includes("${")) {
      throw new Error(
        `sample "${s.title}" interpolates a value; only literal samples can be verified`
      );
    }
  }
  return samples;
}

/** Run one sample, returning its value and any error diagnostics. */
function runSample({ ComputeEngine, executeEpsil }, code, { rerun }) {
  // One engine across passes, mirroring the REPL's shared session.
  const ce = new ComputeEngine();
  const parseLatex = (latex) => ce.parse(latex).json; // `$…$` islands
  let last;
  for (let pass = 0; pass < (rerun ? 2 : 1); pass++)
    last = executeEpsil(ce, code, { parseLatex });

  const errors = (last.diagnostics ?? [])
    .filter((d) => d.severity === "error")
    .map((d) => (Array.isArray(d.message) ? d.message[0] : String(d.message)));
  return { value: last.value?.toString?.() ?? String(last.value), errors };
}

async function main() {
  const strict = process.env.EPSIL_SNIPPETS !== "warn";

  try {
    await fs.access(ENGINE);
  } catch {
    console.error(
      `[verify-landing-snippets] no engine at ${path.relative(ROOT, ENGINE)}\n` +
        `  The sibling compute-engine checkout has to be built first ` +
        `(see CLAUDE.md, "External Dependencies").`
    );
    process.exit(strict ? 1 : 0);
  }

  const api = await import(pathToFileURL(ENGINE).href);
  const samples = extractSamples(await fs.readFile(PAGE, "utf8"));
  console.log(
    `[verify-landing-snippets] engine ${api.version} — ${samples.length} sample(s)`
  );

  const failures = [];
  for (const sample of samples) {
    const expectError = EXPECTED_ERROR.has(sample.title);
    const { value, errors } = runSample(api, sample.code, sample);
    const ok = expectError ? errors.length > 0 : errors.length === 0;

    const label = ok ? (expectError ? "ok (expected error)" : "ok") : "FAIL";
    console.log(`  ${label}  ${sample.title}${sample.rerun ? " (run twice)" : ""}`);
    console.log(`      -> ${value}`);
    if (errors.length) console.log(`      diagnostics: ${errors.join(", ")}`);
    if (!ok) failures.push(sample.title);
  }

  const titles = new Set(samples.map((s) => s.title));
  for (const title of EXPECTED_ERROR) {
    if (!titles.has(title)) {
      console.log(`  FAIL  "${title}" is listed as expecting an error but is not on the page`);
      failures.push(title);
    }
  }

  if (failures.length === 0) {
    console.log("[verify-landing-snippets] all samples verified");
    return;
  }
  console.error(
    `[verify-landing-snippets] ${strict ? "error" : "warning"}: ` +
      `${failures.length} sample(s) no longer behave as the page claims: ` +
      failures.join(", ")
  );
  if (strict) process.exitCode = 1;
}

// Only verify when run as a command. `extractSamples` is exported so this can
// also be imported (as `lint-epsil-docs.mjs` is) without executing anything.
const invokedDirectly =
  process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) await main();
