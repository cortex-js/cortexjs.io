import { visit } from "unist-util-visit";

/**
 * This Remark plugin will look for code blocks with the "live" language
 * and replace them with a `<code-playground>` JSX node
 * 
 */

function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function parseParams(paramString = "") {
  // A param string is something like "show-line-numbers mark-html-line=2"

  if (paramString === null) return {};

  // Parse the params into an object
  const params = {};
  paramString.split(/\s+/).forEach((param) => {
    let [key, value] = param.split("=");
    key = kebabCaseToCamelCase(key);
    if (value === undefined || value === null) params[key] = true;
    else if (value === "true") params[key] = true;
    else if (value === "false") params[key] = false;
    else if (!isNaN(value)) params[key] = Number(value);
    else {
      // If the value is a string, remove the quotes
      if (value.startsWith('"') && value.endsWith('"'))
        params[key] = value.slice(1, -1);
      else if (value.startsWith("'") && value.endsWith("'"))
        params[key] = value.slice(1, -1);
      else params[key] = value;
    }
  });

  return params;
}

function attr(name, value) {
  if (value === undefined || value === null) return {};
  if (typeof value === "boolean") {
    if (value) return { type: "mdxJsxAttribute", name, value: "" };
    return {};
  }
  return { type: "mdxJsxAttribute", name, value };
}

function slot(id, value) {
  const lines = value.split("\n");
  const fragments = [];
  for (const line of lines) {
    // If the line start with some whitespace, push the whitespace
    // as a separate fragment (by default, jsx will coalesce whitespace if
    // they are at the start of a text fragment)
    if (/^\s/.test(line)) {
      const m = line.match(/^(\s+)(.*)$/);
      fragments.push(m[1]);
      fragments.push(m[2] + "\n");
    } else {
      fragments.push(line + "\n");
    }
  }
  return {
    type: "mdxJsxTextElement",
    name: "div",
    attributes: [{ type: "mdxJsxAttribute", name: "slot", value: id }],
    children: fragments.map((fragment) => ({
      type: "text",
      value: fragment,
    })),
  };
}

async function toJsxNode(node) {
  const meta = parseParams(node.meta);

  // Gather necessary Params
  const showLineNumbers = meta.showLineNumbers;
  const markLine = meta.markLine;
  const markJavascriptLine = meta.markJavascriptLine;
  const markHtmlLine = meta.markHtmlLine;
  const autorun = meta.autorun;

  // Extract the :::style, :::html and :::js blocks
  const value = node.value;

  // "style" is for inline styles
  const style = value.match(/:::style\s*\n([\s\S]*?)(\n:::|$)/)?.[1];

  // "html" and "js" are for editable blocks
  const html = value.match(/:::html\s*\n([\s\S]*?)(\n:::|$)/)?.[1];
  let js = value.match(
    /:::(?:js|javascript|ts|typescript)\s*\n([\s\S]*?)(\n:::|$)/,
  )?.[1];

  // If there were no sub-blocks, then the entire content is javascript
  if (!style && !js && !html) js = value;

  const children = [];
  if (style) children.push(slot("style", style));
  if (html) children.push(slot("html", html));
  if (js) children.push(slot("javascript", js));

  // Need help constructing this AST node?
  // Use the MDX Playground and explore what your output mdast should look like
  // https://mdxjs.com/playground/
  const jsxNode = {
    type: "mdxJsxFlowElement",
    name: "code-playground",
    attributes: [
      attr("show-line-numbers", showLineNumbers),
      attr("mark-line", markLine),
      attr("mark-javascript-line", markJavascriptLine),
      attr("mark-html-line", markHtmlLine),
      attr("autorun", autorun),
    ],
    children,
  };

  // We "replace" the current node by a JSX node
  Object.keys(node).forEach((key) => delete node[key]);
  Object.keys(jsxNode).forEach((key) => (node[key] = jsxNode[key]));
}

// This is a remark plugin that will be called on the MDX AST
// It will look for code blocks with the "live" language
// and replace them with a JSX node
// It returns a transformer function that will be called on the MDX AST
//
// See https://docusaurus.io/docs/markdown-features/plugins
export default function codePlaygroundRemarkPlugin() {
  return async (tree, file) => {
    const nodesToProcess = [];
    visit(tree, "code", (node) => {
      if (node.lang === "live") {
        // @todo it would be nice to only load the code-playground scripts
        // when the page actually uses the code-playground component
        // but I can't figure out how to do that.
        // if (!file.data.usesCodePlayground) file.data.usesCodePlayground = true;
        // if (!file.data?.frontMatter?.usesCodePlayground)
        //   file.data.frontMatter.usesCodePlayground = true;

        nodesToProcess.push(toJsxNode(node));
      }
    });
    await Promise.all(nodesToProcess);
  };
}
