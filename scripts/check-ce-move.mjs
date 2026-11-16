// Checks that the Compute Engine and MathJSON docs keep every URL when they
// move from mathlive.io to epsil.dev. The paths stay the same, so the
// mathlive.io redirects only change the host, and every page and every
// anchor of the old site must exist at the same path in the new build.
//
// `config/ce-move-baseline.json` lists the pages under /compute-engine/ and
// /math-json/ of the mathlive.io build before the move, with the ids on each
// page. Delete it, and this script, once the move has shipped.
//
//   node scripts/check-ce-move.mjs baseline <mathlive.io build dir>   # write the baseline
//   node scripts/check-ce-move.mjs check <epsil.dev build dir>        # check a build
//
// `check` exits with 1 when a page or an anchor is missing.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = path.join(ROOT, "config", "ce-move-baseline.json");
const SECTIONS = ["compute-engine", "math-json"];

async function pagesUnder(buildDir, dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(path.join(buildDir, dir), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.isDirectory()) out.push(...(await pagesUnder(buildDir, `${dir}/${e.name}`)));
    else if (e.name === "index.html") out.push(`/${dir}/`);
  }
  return out;
}

async function idsOf(buildDir, url) {
  try {
    const html = await fs.readFile(path.join(buildDir, url, "index.html"), "utf8");
    return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  } catch {
    return undefined;
  }
}

async function baseline(buildDir) {
  const pages = {};
  for (const section of SECTIONS)
    for (const url of (await pagesUnder(buildDir, section)).sort())
      pages[url] = [...(await idsOf(buildDir, url))].sort();
  await fs.writeFile(BASELINE, JSON.stringify({ pages }, null, 0) + "\n");
  const ids = Object.values(pages).reduce((n, v) => n + v.length, 0);
  console.log(`[check-ce-move] baseline: ${Object.keys(pages).length} pages, ${ids} ids -> ${path.relative(ROOT, BASELINE)}`);
}

async function check(buildDir) {
  const { pages } = JSON.parse(await fs.readFile(BASELINE, "utf8"));
  const missingPages = [];
  const missingIds = [];
  for (const [url, ids] of Object.entries(pages)) {
    const found = await idsOf(buildDir, url);
    if (!found) {
      missingPages.push(url);
      continue;
    }
    for (const id of ids) if (!found.has(id)) missingIds.push(`${url}#${id}`);
  }
  const total = Object.keys(pages).length;
  console.log(
    `[check-ce-move] ${total - missingPages.length}/${total} pages present, ` +
      `${missingIds.length} anchors missing on the pages that are present`
  );
  for (const u of missingPages.slice(0, 20)) console.log(`  missing page: ${u}`);
  for (const u of missingIds.slice(0, 40)) console.log(`  missing anchor: ${u}`);
  if (missingPages.length + missingIds.length > 0) process.exitCode = 1;
}

const [command, dir] = process.argv.slice(2);
if (!dir || !["baseline", "check"].includes(command)) {
  console.error("usage: node scripts/check-ce-move.mjs baseline|check <build dir>");
  process.exit(2);
}
await (command === "baseline" ? baseline : check)(path.resolve(dir));
