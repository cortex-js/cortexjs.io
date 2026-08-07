import { visit } from "unist-util-visit";

/**
 * Remark plugin: turn ```epsil-live fenced code blocks into an interactive
 * <EpsilPlayground> element. Plain ```epsil blocks are left untouched (they
 * render as static, highlighted source).
 *
 * The block's text becomes the `source` prop. The component is registered
 * globally in `src/theme/MDXComponents.js`, so no per-page import is needed.
 */
export default function epsilPlaygroundRemarkPlugin() {
  return async (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang !== "epsil-live") return;

      const source = node.value ?? "";

      const jsxNode = {
        type: "mdxJsxFlowElement",
        name: "EpsilPlayground",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "source",
            value: source,
          },
        ],
        children: [],
      };

      Object.keys(node).forEach((key) => delete node[key]);
      Object.keys(jsxNode).forEach((key) => (node[key] = jsxNode[key]));
    });
  };
}
