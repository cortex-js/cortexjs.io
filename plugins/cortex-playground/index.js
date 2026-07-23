import { visit } from "unist-util-visit";

/**
 * Remark plugin: turn ```cortex-live fenced code blocks into an interactive
 * <CortexPlayground> element. Plain ```cortex blocks are left untouched (they
 * render as static, highlighted source).
 *
 * The block's text becomes the `source` prop. The component is registered
 * globally in `src/theme/MDXComponents.js`, so no per-page import is needed.
 */
export default function cortexPlaygroundRemarkPlugin() {
  return async (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang !== "cortex-live") return;

      const source = node.value ?? "";

      const jsxNode = {
        type: "mdxJsxFlowElement",
        name: "CortexPlayground",
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
