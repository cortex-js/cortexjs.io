/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docSidebar: [
    {
      type: "category",
      label: "Mathfield",
      items: [
        {
          type: "doc",
          id: "mathfield/introduction",
          className: "compass-icon",
        },
        {
          type: "doc",
          id: "mathfield/playground",
          className: "flask-icon",
          label: "Demo",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "mathfield/changelog",
          className: "changelog-icon",
          label: "Changelog",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "mathfield/virtual-keyboard",
          className: "reference-icon",
          label: "Using the Virtual Keyboard",
        },
        {
          type: "doc",
          id: "mathfield/matrix",
          className: "reference-icon",
          label: "Using the Matrix Editor",
        },
        {
          type: "doc",
          id: "mathfield/latex-commands",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "mathfield/keybindings",
          className: "reference-icon",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "mathfield/getting-started",
          className: "checklist-icon",
        },
        { type: "doc", id: "mathfield/integration", className: "guide-icon" },
        {
          type: "doc",
          id: "mathfield/react",
          className: "guide-icon",
          label: "Using React",
        },
        {
          type: "doc",
          id: "mathfield/svelte",
          className: "guide-icon",
          label: "Using Svelte",
        },
        {
          type: "doc",
          id: "mathfield/interacting",
          className: "guide-icon",
          label: "Interact",
        },
        {
          type: "doc",
          id: "mathfield/customizing",
          className: "guide-icon",
          label: "Customize",
        },
        { type: "doc", id: "mathfield/menu", className: "guide-icon" },
        {
          type: "doc",
          id: "mathfield/custom-virtual-keyboard",
          className: "guide-icon",
        },
        { type: "doc", id: "mathfield/shortcuts", className: "guide-icon" },
        {
          type: "doc",
          id: "mathfield/fill-in-the-blank",
          className: "guide-icon",
        },
        { type: "doc", id: "mathfield/commands", className: "guide-icon" },
        { type: "doc", id: "mathfield/macros", className: "guide-icon" },
        { type: "doc", id: "mathfield/speech", className: "guide-icon" },
        { type: "doc", id: "mathfield/static", className: "guide-icon" },
        { type: "doc", id: "mathfield/lifecycle", className: "guide-icon" },
        { type: "doc", id: "mathfield/security", className: "guide-icon" },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "mathfield/api",
          className: "sdk-icon",
        },
      ],
    },
    {
      type: "category",
      label: "Compute Engine",
      items: [
        {
          type: "doc",
          id: "compute-engine/introduction",
          className: "compass-icon",
        },
        {
          type: "doc",
          id: "compute-engine/compute-engine-demo",
          className: "flask-icon",
          label: "Demo",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "compute-engine/changelog",
          className: "changelog-icon",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "compute-engine/guide-expressions",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-evaluate",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-symbolic-computing",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-numerical-evaluations",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-canonical-form",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-symbols",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-augmenting",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-latex-syntax",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-types",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-simplify",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-compile",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-assumptions",
          className: "guide-icon",
        },
        {
          type: "doc",
          id: "compute-engine/guide-patterns-and-rules",
          className: "guide-icon",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "compute-engine/math-json",
          className: "sdk-icon",
        },
        {
          type: "doc",
          id: "compute-engine/api",
          className: "sdk-icon",
        },
        { type: "html", value: "<hr/>" },
        {
          type: "doc",
          id: "compute-engine/standard-library",
          className: "compass-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-arithmetic",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-calculus",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-collections",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-complex",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-control-structures",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-core",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-functions",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-linear-algebra",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-logic",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-sets",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-special-functions",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-statistics",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-combinatorics",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-number-theory",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-strings",
          className: "reference-icon",
        },
        {
          type: "doc",
          id: "compute-engine/reference-trigonometry",
          className: "reference-icon",
        },
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "mathfield/tutorial-simple-quiz",
          className: "tutorial-icon",
          label: "Simple Quiz",
        },
      ],
    },
    {
      type: "category",
      label: "Additional Resources",
      items: [
        {
          type: "doc",
          id: "about",
          label: "About Us",
          className: "person-icon",
        },
        {
          type: "doc",
          id: "sdk",
          label: "SDKs",
          className: "sdk-icon",
        },
        {
          type: "link",
          label: "GitHub Repository",
          href: "https://github.com/arnog/mathlive",
          className: "github-icon",
        },
        {
          type: "link",
          label: "Discord",
          href: "https://discord.gg/yhmvVeJ4Hd",
          className: "discord-icon",
        },
        {
          type: "link",
          label: "MathLive GPT",
          href: "https://chatgpt.com/g/g-8YgEfR7ig-mathlive-gpt",
          className: "chatgpt-icon",
        },
      ],
    },
  ],
};

export default sidebars;
