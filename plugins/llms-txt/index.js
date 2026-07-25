// Emits machine-readable versions of the documentation for AI agents:
//
//   /llms.txt              an index of every page, grouped by sidebar section
//   /llms-<section>.txt    all pages of one section, concatenated
//   /<permalink>.md        the raw markdown source of a single page
//
// The site is served from GitHub Pages, which offers no content negotiation:
// an agent cannot ask for `text/markdown` at the HTML URL. Every artifact has
// to exist as a real file, so they are all written here in `postBuild`.
//
// Page metadata comes from the docs plugin rather than from globbing `docs/`,
// so pages added later are picked up with no change to this plugin.

import fs from "node:fs/promises";
import path from "node:path";

const DOCS_PLUGIN = "docusaurus-plugin-content-docs";

// Pages excluded from the concatenated bundles. They are still emitted as
// individual `.md` files; they are just too large and too low-signal to be
// worth carrying in a bundle an agent loads wholesale. `changelog` alone is
// larger than the rest of the Compute Engine documentation combined.
const BUNDLE_EXCLUDE = [/(^|\/)changelog$/];

const MAX_DESCRIPTION = 200;

function normalize(description) {
  const text = (description ?? "").replace(/\s+/g, " ").trim();
  return text.length > MAX_DESCRIPTION
    ? text.slice(0, MAX_DESCRIPTION - 3).trimEnd() + "…"
    : text;
}

/**
 * Salvage a description Docusaurus derived from page content, for the pages
 * that set none in frontmatter. Those are frequently unusable: JSX from a
 * <style> block, or a bare section heading ("Constants", "Coming Soon"), both
 * of which are worse in an index than no description at all.
 *
 * Only auto-derived text is filtered this way. An authored frontmatter
 * description is taken as-is — several legitimately contain angle brackets
 * ("<math-field>", "(real) -> real") that this would otherwise reject.
 */
function salvageDescription(description) {
  let text = normalize(description);
  if (/[{}`]/.test(text) || /<[a-zA-Z/]/.test(text)) return "";

  // Auto-derived text is truncated at a fixed length, which can cut a markdown
  // link in half ("... While [keyboard"). Drop the dangling fragment rather
  // than emit a broken link into the index.
  const opened = (text.match(/\[/g) ?? []).length;
  const closed = (text.match(/\]/g) ?? []).length;
  if (opened > closed) text = text.slice(0, text.lastIndexOf("[")).trimEnd();

  return text.length < 30 ? "" : text;
}

/** Strip a leading YAML frontmatter block. */
function stripFrontMatter(source) {
  if (!source.startsWith("---")) return source;
  const end = source.indexOf("\n---", 3);
  if (end === -1) return source;
  const after = source.indexOf("\n", end + 1);
  return after === -1 ? "" : source.slice(after + 1).replace(/^\s*\n/, "");
}

/**
 * Flatten a sidebar into an ordered list of `{id, section}`. Top-level
 * category labels become the section headings of llms.txt, which keeps the
 * index in the same order a reader sees in the site navigation.
 */
function flattenSidebars(sidebars) {
  const order = [];
  const walk = (items, section) => {
    for (const item of items ?? []) {
      if (item.type === "doc") order.push({ id: item.id, section });
      else if (item.type === "category")
        walk(item.items, section ?? item.label);
    }
  };
  for (const items of Object.values(sidebars ?? {})) walk(items, undefined);
  return order;
}

/** Turn a permalink into the path of its markdown twin: /a/b/ -> /a/b.md */
function markdownPath(permalink, baseUrl) {
  let p = permalink;
  if (baseUrl !== "/" && p.startsWith(baseUrl)) p = "/" + p.slice(baseUrl.length);
  p = p.replace(/\/+$/, "");
  return (p === "" ? "/index" : p) + ".md";
}

export default function llmsTxtPlugin(context, options = {}) {
  const { siteConfig, siteDir } = context;
  const bundleExclude = options.bundleExclude ?? BUNDLE_EXCLUDE;

  // Captured in allContentLoaded (which runs before postBuild) because that is
  // the only lifecycle where another plugin's loaded content is visible.
  let pages = [];

  return {
    name: "llms-txt",

    async allContentLoaded({ allContent }) {
      const versions = Object.values(allContent[DOCS_PLUGIN] ?? {}).flatMap(
        (content) => content?.loadedVersions ?? []
      );

      const sectionById = new Map();
      const rank = new Map();
      for (const version of versions) {
        for (const [i, entry] of flattenSidebars(version.sidebars).entries()) {
          if (!rank.has(entry.id)) rank.set(entry.id, i);
          if (entry.section) sectionById.set(entry.id, entry.section);
        }
      }

      const allDocs = versions
        .flatMap((version) => version.docs ?? [])
        .filter((doc) => !doc.draft && !doc.unlisted);

      // Not every page is in a sidebar, and that is usually deliberate:
      // second-level pages (the Fungrim category pages, the extended-rules
      // guides) are reached with <ReadMore> from a page that is in a sidebar.
      // Grouping those under "Other" would invent a section that matches
      // nothing on the site, so instead each unlisted page inherits the
      // section that dominates its top-level directory — putting it in the
      // product bundle a reader would expect.
      const topDir = (doc) => (doc.sourceDirName ?? "").split("/")[0];
      const tally = new Map();
      for (const doc of allDocs) {
        const section = sectionById.get(doc.id);
        if (!section) continue;
        const counts = tally.get(topDir(doc)) ?? new Map();
        counts.set(section, (counts.get(section) ?? 0) + 1);
        tally.set(topDir(doc), counts);
      }
      const dominantSection = new Map(
        [...tally].map(([dir, counts]) => [
          dir,
          [...counts].sort((a, b) => b[1] - a[1])[0][0],
        ])
      );

      const unlisted = allDocs.filter((doc) => !sectionById.has(doc.id));
      if (unlisted.length > 0) {
        // Surfaced so a page that is in no sidebar *and* linked from nowhere
        // is noticed here rather than by a reader who cannot find it.
        console.log(
          `[llms-txt] ${unlisted.length} pages are in no sidebar; grouped by directory: ` +
            unlisted.map((doc) => doc.permalink).join(", ")
        );
      }

      pages = allDocs
        .map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.frontMatter?.description
            ? normalize(doc.frontMatter.description)
            : salvageDescription(doc.description),
          permalink: doc.permalink,
          // `source` is site-relative, e.g. "@site/docs/cortex/mcp.md"
          sourcePath: path.join(siteDir, doc.source.replace(/^@site\//, "")),
          section:
            sectionById.get(doc.id) ?? dominantSection.get(topDir(doc)) ?? "Other",
          rank: rank.get(doc.id) ?? Number.MAX_SAFE_INTEGER,
        }))
        .sort((a, b) => a.rank - b.rank || a.permalink.localeCompare(b.permalink));
    },

    async postBuild({ outDir }) {
      if (pages.length === 0) return;

      const { baseUrl, url: siteUrl, title } = siteConfig;
      const absolute = (p) =>
        new URL(path.posix.join(baseUrl, p).replace(/^\/+/, "/"), siteUrl).href;

      // --- one .md per page ------------------------------------------------
      const emitted = [];
      for (const page of pages) {
        let source;
        try {
          source = await fs.readFile(page.sourcePath, "utf8");
        } catch {
          // A doc with no readable source file (generated in memory, moved
          // mid-build). Skip it rather than fail the whole build.
          continue;
        }

        const body = stripFrontMatter(source).trim();
        // `hide_title` pages carry their own h1; only add one when missing, so
        // the output never opens with a duplicated heading.
        const heading = /^#\s/m.test(body.split("\n")[0]) ? "" : `# ${page.title}\n\n`;
        const relPath = markdownPath(page.permalink, baseUrl);
        const content = `<!-- ${absolute(page.permalink)} -->\n\n${heading}${body}\n`;

        const target = path.join(outDir, relPath);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, content, "utf8");
        emitted.push({ ...page, relPath, body });
      }

      // --- per-section bundles ---------------------------------------------
      const sections = new Map();
      for (const page of emitted) {
        if (!sections.has(page.section)) sections.set(page.section, []);
        sections.get(page.section).push(page);
      }

      const bundles = new Map();
      for (const [section, sectionPages] of sections) {
        const included = sectionPages.filter(
          (page) => !bundleExclude.some((re) => re.test(page.id))
        );
        if (included.length === 0) continue;

        const slug = section.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const name = `llms-${slug}.txt`;
        const parts = included.map(
          (page) =>
            `# ${page.title}\n\nSource: ${absolute(page.permalink)}\n\n${page.body}`
        );
        await fs.writeFile(
          path.join(outDir, name),
          `# ${title} — ${section}\n\n${parts.join("\n\n---\n\n")}\n`,
          "utf8"
        );
        bundles.set(section, name);
      }

      // --- llms.txt ---------------------------------------------------------
      const lines = [
        `# ${title}`,
        "",
        `> ${siteConfig.tagline}. Documentation for MathLive (math input for the web), the Compute Engine (symbolic computation in JavaScript) and Cortex (a language for scientific computing).`,
        "",
        "Every page below is also available as HTML at the same URL without the `.md` suffix.",
        "",
      ];

      for (const [section, sectionPages] of sections) {
        lines.push(`## ${section}`, "");
        const bundle = bundles.get(section);
        if (bundle)
          lines.push(
            `- [All ${section} documentation, concatenated](${absolute(bundle)})`
          );
        for (const page of sectionPages) {
          const description = page.description ? `: ${page.description}` : "";
          lines.push(`- [${page.title}](${absolute(page.relPath)})${description}`);
        }
        lines.push("");
      }

      await fs.writeFile(path.join(outDir, "llms.txt"), lines.join("\n"), "utf8");

      console.log(
        `[llms-txt] ${emitted.length} pages, ${bundles.size} bundles, llms.txt`
      );
    },
  };
}
