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
        { type: "doc", id: "syntax", className: "reference-icon" },
        { type: "doc", id: "literals", className: "reference-icon" },
        { type: "doc", id: "operators", className: "reference-icon" },
        { type: "doc", id: "control-flow", className: "reference-icon" },
        { type: "doc", id: "declarations", className: "reference-icon" },
        { type: "doc", id: "evaluation", className: "reference-icon" },
        { type: "doc", id: "types", className: "reference-icon" },
        { type: "doc", id: "protocols", className: "reference-icon" },
        { type: "doc", id: "comments", className: "reference-icon" },
        { type: "doc", id: "pragmas", className: "reference-icon" },
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
