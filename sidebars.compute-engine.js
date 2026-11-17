/**
 * The Compute Engine section of the docs sidebar: the guides, the MathJSON
 * format and the reference of the standard library.
 *
 * Used by `sidebars.epsil.js`, which gives it a sidebar of its own on
 * epsil.dev; mathlive.io no longer publishes these docs. Doc ids are relative
 * to `docs/`.
 */

// @ts-check

/**
 * A category item of a sidebar; the docs plugin exports only the type of the
 * whole sidebars config, so the item type is taken out of it.
 * @type {Extract<Extract<import('@docusaurus/plugin-content-docs').SidebarsConfig[string], unknown[]>[number], {type: 'category'}>}
 */
const computeEngineCategory = {
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
        id: "compute-engine/guide-execution-constraints",
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
        id: "compute-engine/guide-units",
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
      {
        type: "doc",
        id: "compute-engine/15b-guide-extended-rules",
        className: "guide-icon",
      },
      {
        type: "doc",
        id: "compute-engine/guide-logic",
        className: "guide-icon",
      },
      {
        type: "doc",
        id: "compute-engine/guide-linear-algebra",
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
        // The reference of each library moved to the Epsil library
        // reference: one entry per function, Epsil first, with its MathJSON
        // form. The old pages are redirect stubs, so they are not listed.
        type: "link",
        label: "Library reference",
        href: "/library/",
        className: "reference-icon",
      },
      {
        type: "doc",
        id: "compute-engine/reference-sets",
        className: "reference-icon",
      },
      {
        type: "doc",
        id: "compute-engine/97a-reference-group-theory",
        className: "reference-icon",
      },
    ],
  };

export default computeEngineCategory;
