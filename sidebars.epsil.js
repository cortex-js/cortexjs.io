/**
 * Sidebar for the standalone epsil.dev site.
 *
 * The docs plugin for that site is rooted at `docs/epsil` with
 * `routeBasePath: '/'`, so doc ids here have no `epsil/` prefix — unlike
 * `sidebars.js`, where the same pages were addressed as `epsil/syntax`.
 *
 * Top-level category labels double as bundle names for the llms-txt plugin
 * (`llms-guide.txt`, `llms-reference.txt`, `llms-tools.txt`); renaming one
 * renames its bundle.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  epsilSidebar: [
    {
      type: "category",
      label: "Guide",
      collapsible: false,
      collapsed: false,
      items: [
        { type: "doc", id: "epsil", label: "Introduction", className: "compass-icon" },
        { type: "doc", id: "getting-started", className: "checklist-icon" },
        { type: "doc", id: "tour", className: "tutorial-icon" },
        { type: "doc", id: "examples", className: "flask-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "goals", className: "guide-icon" },
        { type: "doc", id: "principles", className: "guide-icon" },
        { type: "doc", id: "naming", className: "guide-icon" },
        { type: "doc", id: "style", className: "guide-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "from-python", className: "guide-icon" },
        { type: "doc", id: "from-mathematica", className: "guide-icon" },
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: false,
      collapsed: false,
      items: [
        { type: "doc", id: "comments", className: "reference-icon" },
        { type: "doc", id: "literals", className: "reference-icon" },
        { type: "doc", id: "types", className: "reference-icon" },
        { type: "doc", id: "declarations", className: "reference-icon" },
        { type: "doc", id: "operators", className: "reference-icon" },
        { type: "doc", id: "evaluation", className: "reference-icon" },
        { type: "doc", id: "control-flow", className: "reference-icon" },
        { type: "doc", id: "protocols", className: "reference-icon" },
        { type: "doc", id: "pragmas", className: "reference-icon" },
        { type: "doc", id: "syntax", className: "reference-icon" },
        { type: "doc", id: "errors", className: "reference-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "library", className: "reference-icon" },
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
            { type: "doc", id: "reference/core", className: "reference-icon" },
            { type: "doc", id: "reference/control-structures", className: "reference-icon" },
            { type: "doc", id: "reference/logic", className: "reference-icon" },
            { type: "doc", id: "reference/collections", className: "reference-icon" },
            { type: "doc", id: "reference/colors", className: "reference-icon" },
            { type: "doc", id: "reference/regexp", className: "reference-icon" },
            { type: "doc", id: "reference/relop", className: "reference-icon" },
            { type: "doc", id: "reference/arithmetic", className: "reference-icon" },
            { type: "doc", id: "reference/fractals", className: "reference-icon" },
            { type: "doc", id: "reference/trigonometry", className: "reference-icon" },
            { type: "doc", id: "reference/calculus", className: "reference-icon" },
            { type: "doc", id: "reference/polynomials", className: "reference-icon" },
            { type: "doc", id: "reference/combinatorics", className: "reference-icon" },
            { type: "doc", id: "reference/number-theory", className: "reference-icon" },
            { type: "doc", id: "reference/special-functions", className: "reference-icon" },
            { type: "doc", id: "reference/linear-algebra", className: "reference-icon" },
            { type: "doc", id: "reference/statistics", className: "reference-icon" },
            { type: "doc", id: "reference/units", className: "reference-icon" },
            { type: "doc", id: "reference/physics", className: "reference-icon" },
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
        { type: "doc", id: "cli", className: "guide-icon" },
        { type: "doc", id: "vscode", className: "guide-icon" },
        { type: "doc", id: "mcp", className: "guide-icon" },
        { type: "doc", id: "for-agents", className: "reference-icon" },
        { type: "html", value: "<hr/>" },
        { type: "doc", id: "source-code", className: "reference-icon" },
        { type: "doc", id: "implementation", className: "sdk-icon" },
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
