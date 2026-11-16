/**
 * Sidebar for the standalone epsil.dev site.
 *
 * The docs plugin of that site reads `docs/` and includes `epsil/` and
 * `compute-engine/` (one plugin instance, because both sections are rooted at
 * `/`), so doc ids are relative to `docs/`: `epsil/syntax`,
 * `compute-engine/guide-evaluate`. The Compute Engine sidebar is the category
 * that mathlive.io also uses (`sidebars.compute-engine.js`).
 *
 * Top-level category labels double as bundle names for the llms-txt plugin
 * (`llms-guide.txt`, `llms-reference.txt`, `llms-tools.txt`); renaming one
 * renames its bundle.
 */

// @ts-check

import computeEngineCategory from "./sidebars.compute-engine.js";

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  computeEngineSidebar: [
    {
      ...computeEngineCategory,
      collapsible: false,
      collapsed: false,
      // The agent card is published on epsil.dev only (it is synced with
      // links rewritten for this site), so it is not in the shared category.
      items: [
        // An array in sidebars.compute-engine.js; its declared type also
        // allows the object shorthand.
        .../** @type {any[]} */ (computeEngineCategory.items),
        { type: "doc", id: "compute-engine/for-agents", className: "sdk-icon" },
      ],
    },
  ],
  epsilSidebar: [
    {
      type: "category",
      label: "Guide",
      collapsible: false,
      collapsed: false,
      items: [
        { type: "doc", id: "epsil/epsil", label: "Introduction", className: "compass-icon" },
        { type: "doc", id: "epsil/getting-started", className: "checklist-icon" },
        { type: "doc", id: "epsil/tour", className: "tutorial-icon" },
        { type: "doc", id: "epsil/examples", className: "flask-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "epsil/goals", className: "guide-icon" },
        { type: "doc", id: "epsil/principles", className: "guide-icon" },
        { type: "doc", id: "epsil/naming", className: "guide-icon" },
        { type: "doc", id: "epsil/style", className: "guide-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "epsil/from-python", className: "guide-icon" },
        { type: "doc", id: "epsil/from-mathematica", className: "guide-icon" },
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: false,
      collapsed: false,
      items: [
        { type: "doc", id: "epsil/comments", className: "reference-icon" },
        { type: "doc", id: "epsil/literals", className: "reference-icon" },
        { type: "doc", id: "epsil/types", className: "reference-icon" },
        { type: "doc", id: "epsil/declarations", className: "reference-icon" },
        { type: "doc", id: "epsil/operators", className: "reference-icon" },
        { type: "doc", id: "epsil/evaluation", className: "reference-icon" },
        { type: "doc", id: "epsil/control-flow", className: "reference-icon" },
        { type: "doc", id: "epsil/protocols", className: "reference-icon" },
        { type: "doc", id: "epsil/pragmas", className: "reference-icon" },
        { type: "doc", id: "epsil/syntax", className: "reference-icon" },
        { type: "doc", id: "epsil/errors", className: "reference-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "epsil/library", className: "reference-icon" },
        // One page per library of the standard library, in the order
        // `library.md` lists them. The pages are generated upstream
        // (`../compute-engine/src/epsil/docs/reference/`); when a library is
        // added there, `scripts/sync-epsil-docs.mjs` warns that its page is
        // not listed here. Collapsed by default because 19 entries would
        // otherwise push the Tools section far down the sidebar.
        {
          type: "category",
          label: "Library Reference",
          collapsible: true,
          collapsed: true,
          items: [
            { type: "doc", id: "epsil/reference/core", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/control-structures", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/logic", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/collections", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/colors", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/regexp", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/relop", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/arithmetic", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/fractals", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/trigonometry", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/calculus", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/polynomials", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/combinatorics", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/number-theory", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/special-functions", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/linear-algebra", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/statistics", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/units", className: "reference-icon" },
            { type: "doc", id: "epsil/reference/physics", className: "reference-icon" },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Tools",
      collapsible: false,
      collapsed: false,
      items: [
        { type: "doc", id: "epsil/cli", className: "guide-icon" },
        { type: "doc", id: "epsil/vscode", className: "guide-icon" },
        { type: "doc", id: "epsil/mcp", className: "guide-icon" },
        { type: "doc", id: "epsil/for-agents", className: "reference-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "epsil/source-code", className: "reference-icon" },
        { type: "doc", id: "epsil/implementation", className: "sdk-icon" },
      ],
    },
    {
      type: "category",
      label: "Ecosystem",
      items: [
        {
          type: "link",
          label: "Compute Engine",
          href: "https://mathlive.io/compute-engine/",
          className: "sdk-icon",
        },
        {
          type: "link",
          label: "MathLive",
          href: "https://mathlive.io",
          className: "sdk-icon",
        },
        {
          type: "link",
          label: "GitHub Repository",
          href: "https://github.com/cortex-js/compute-engine",
          className: "github-icon",
        },
        {
          type: "link",
          label: "Discord",
          href: "https://discord.gg/yhmvVeJ4Hd",
          className: "discord-icon",
        },
      ],
    },
  ],
};

export default sidebars;
