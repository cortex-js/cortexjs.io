import { themes } from "prism-react-renderer";
const baseTheme = themes.vsDark;

// See https://prismjs.com/tokens.html

const themeLight = [
  {
    types: ["punctuation"],
    style: { color: "var(--base-06)" },
  },
  {
    types: ["operator"],
    style: { color: "var(--base-06)" },
  },
  { types: ["plain"], style: { color: "var(--base-06)" } },
  {
    types: ["comment"],
    style: {
      color: "var(--base-05)",
      // fontStyle: "italic",
    },
  },
  {
    types: ["prolog", "doctype", "cdata"],
    style: {
      color: "var(--base-09)",
    },
  },
  {
    types: ["function", "class-name"],
    style: {
      color: "var(--base-0a)",
    },
  },
  {
    types: ["string", "char", "regex", "url", "entity"],
    style: {
      color: "var(--base-0b)",
    },
  },
  {
    types: ["number", "boolean", "variable", "constant", "builtin", "symbol"],
    style: {
      color: "var(--base-09)",
    },
  },
  {
    types: ["property", "selector"],
    style: {
      color: "var(--base-09)",
    },
  },
  {
    types: ["keyword", "tag"],
    style: {
      color: "var(--base-0e)",
      // fontWeight: "bold",
    },
  },
  {
    types: ["attr-name", "namespace"],
    style: {
      color: "var(--base-0c)",
    },
  },
  {
    types: ["attr-value"],
    style: {
      color: "var(--base-0b)",
    },
  },
  {
    types: ["property"],
    style: {
      color: "var(--base-0c)",
    },
  },
  {
    types: ["important"],
    style: {
      color: "#fff",
      background: "var(--base-08)",
    },
  },
  {
    types: ["inserted"],
    style: {
      color: "#397300",
      background: "#baeeba",
    },
  },
  {
    types: ["bold"],
    style: { fontWeight: "bold" },
  },
  {
    types: ["italic"],
    style: { fontStyle: "italic" },
  },
];

export default {
  plain: Object.assign(baseTheme.plain, {
    backgroundColor: "var(--console-background)",
    color: "var(--console-color)",
  }),
  styles: [...baseTheme.styles, ...themeLight],
};

export const styles = [...baseTheme.styles, ...themeLight];
