// Lint the Epsil documentation for anchor problems.
//
// Two checks, only one of which Docusaurus can do for us:
//
//  1. FRAGILE HEADING IDS — headings whose auto-generated id is mangled by
//     punctuation ("## Spread: `...`" -> "spread-", "## `if` / `else`" ->
//     "if--else"). Docusaurus structurally cannot flag these: an id nothing
//     links to is legal. They are latent bugs — the id silently changes the
//     next time someone edits the heading's punctuation, breaking any link
//     that had come to depend on it. This check is the reason this file
//     exists.
//
//  2. BROKEN ANCHORS — an internal link whose #fragment matches no heading on
//     the target page. Docusaurus checks this too (`onBrokenAnchors`), so this
//     is redundant by design; it just reports at sync time, before a build, in
//     the same message as everything else.
//
// Heading ids are computed with `github-slugger`, the same library Docusaurus
// uses, so the ids here are the ids that ship — not an approximation of them.

import GithubSlugger from "github-slugger";

/** Strip a leading YAML frontmatter block. */
function stripFrontMatter(source) {
  if (!source.startsWith("---")) return source;
  const end = source.indexOf("\n---", 3);
  if (end === -1) return source;
  const after = source.indexOf("\n", end + 1);
  return after === -1 ? "" : source.slice(after + 1);
}

/**
 * Reduce a heading's markdown to the plain text Docusaurus slugifies: inline
 * code keeps its content but loses the backticks, links keep their label, and
 * emphasis markers and raw HTML disappear.
 */
function headingText(markdown) {
  return markdown
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_]{1,3}/g, "")
    .trim();
}

/** A cleaner id to propose in place of a mangled one. */
function suggestId(autoId) {
  return autoId.replace(/-{2,}/g, "-").replace(/^-|-$/g, "") || "section";
}

/**
 * Walk a document's lines, skipping fenced code blocks (where a leading `#` is
 * a comment, not a heading), and yield each heading.
 */
function* headings(body) {
  let fence = null;
  for (const line of body.split("\n")) {
    const fenceMatch = /^\s*(```+|~~~+)/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (fence === null) fence = marker[0];
      else if (marker[0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const match = /^(#{1,6})\s+(.*?)\s*$/.exec(line);
    if (match) yield { level: match[1].length, raw: match[2] };
  }
}

/**
 * @param {{name: string, route: string, content: string}[]} pages
 * @returns {{fragile: object[], broken: object[], idsByRoute: Map<string, Set<string>>}}
 */
export function lintDocs(pages) {
  const fragile = [];
  const idsByRoute = new Map();
  const linksByPage = [];

  const normalize = (route) => (route.endsWith("/") ? route : route + "/");

  for (const page of pages) {
    const body = stripFrontMatter(page.content);
    // One slugger per page, matching Docusaurus: it is what disambiguates two
    // identical headings into `foo` and `foo-1`.
    const slugger = new GithubSlugger();
    const ids = new Set();

    for (const heading of headings(body)) {
      const explicit = /\{#([^}]+)\}\s*$/.exec(heading.raw);
      if (explicit) {
        ids.add(explicit[1]);
        continue;
      }

      const id = slugger.slug(headingText(heading.raw));
      ids.add(id);

      // An id is fragile when punctuation has left its mark: a trailing
      // hyphen, a doubled hyphen, or nothing at all.
      if (id === "" || id.endsWith("-") || id.includes("--")) {
        fragile.push({
          name: page.name,
          heading: heading.raw,
          id,
          suggestion: suggestId(id),
        });
      }
    }

    idsByRoute.set(normalize(page.route), ids);

    // Internal links carrying a fragment, from markdown and from JSX props.
    const links = [];
    for (const [, url] of body.matchAll(/\]\((#[^)\s]+|\/[^)\s]*#[^)\s]+)\)/g))
      links.push(url);
    for (const [, url] of body.matchAll(
      /(?:path|href|to)="(#[^"]+|\/[^"]*#[^"]+)"/g
    ))
      links.push(url);
    linksByPage.push({ page, links });
  }

  const broken = [];
  for (const { page, links } of linksByPage) {
    for (const link of links) {
      const hash = link.indexOf("#");
      const target = link.slice(0, hash);
      const fragment = decodeURIComponent(link.slice(hash + 1));
      const route = target === "" ? normalize(page.route) : normalize(target);

      const ids = idsByRoute.get(route);
      // A route this lint does not know is a page outside the Epsil docs;
      // Docusaurus resolves those.
      if (!ids || ids.has(fragment)) continue;

      broken.push({ name: page.name, link, route, fragment });
    }
  }

  return { fragile, broken, idsByRoute };
}

/**
 * Print findings. Returns true if the caller should fail.
 *
 * Fragile ids are an error: the set is at zero, the fix is a one-line
 * `{#explicit-id}`, and letting one through means shipping an anchor that
 * breaks on the next unrelated edit. Set EPSIL_DOCS_LINT=warn to downgrade
 * when a release should not be held up by a docs nit.
 */
export function reportLint({ fragile, broken }, { strict = true } = {}) {
  if (broken.length > 0) {
    console.warn(
      `[lint-epsil-docs] ${broken.length} link(s) point at a heading that does not exist:`
    );
    for (const b of broken)
      console.warn(`  ${b.name}: ${b.link}  (no "#${b.fragment}" on ${b.route})`);
  }

  if (fragile.length > 0) {
    const label = strict ? "error" : "warning";
    console.warn(
      `[lint-epsil-docs] ${label}: ${fragile.length} heading(s) generate a fragile ` +
        `anchor. Punctuation has mangled the auto-generated id, and it will change ` +
        `again the next time the heading is edited. Give each an explicit id:`
    );
    for (const f of fragile)
      console.warn(`  ${f.name}: "${f.heading}"\n    -> #${f.id}   add {#${f.suggestion}}`);
  }

  return strict && fragile.length > 0;
}
