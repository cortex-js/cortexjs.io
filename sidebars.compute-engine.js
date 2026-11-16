/**
 * The Compute Engine section of the docs sidebar: the guides, the MathJSON
 * format and the reference of the standard library.
 *
 * One object for both sites while the section moves from mathlive.io to
 * epsil.dev: `sidebars.js` lists it in the mathlive.io sidebar, and
 * `sidebars.epsil.js` gives it a sidebar of its own on epsil.dev. Doc ids are
 * relative to `docs/` on both sites.
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
        id: "compute-engine/reference-colors",
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
        id: "compute-engine/97a-reference-group-theory",
        className: "reference-icon",
      },
      {
        type: "doc",
        id: "compute-engine/reference-trigonometry",
        className: "reference-icon",
      },
      {
        type: "doc",
        id: "compute-engine/reference-units",
        className: "reference-icon",
      },
    ],
  };

export default computeEngineCategory;
