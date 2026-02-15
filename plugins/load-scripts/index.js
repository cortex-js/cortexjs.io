// This plugin loads the scripts required by the code-playground component
// and the mathlive component.
// It is executed once per document load, not once per page.
// Docusaurus is a SPA, so the documents is not reloaded when navigating
// between pages.

const loadScripts = `
(function() {
if (!window.moduleMap) window.moduleMap = {};
window.moduleMap = {
  ...window.moduleMap,
  mathlive: "https://esm.run/mathlive",
  // "mathlive": "/js/mathlive.mjs",
  // "html-to-image": "///assets/js/html-to-image.js",
  "compute-engine": "https://esm.run/@cortex-js/compute-engine",
  "@cortex-js/compute-engine": "https://esm.run/@cortex-js/compute-engine",
  // "compute-engine": "https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/+esm",
  // "@cortex-js/compute-engine": "https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine/+esm",

};
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
function loadScripts(scripts, onload) {
  scripts.forEach((src, index) => {
    const isModule = src.endsWith("@module");
    src = src.replace("@module", "");
    const id = 'script' + hash(src).toString(36);
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    if (isModule) script.type = "module";

    script.id = id;
    script.src = src;

    script.async = false;

    // Are we the last script?
    if (onload && index === scripts.length - 1) script.onload = onload;

    document.head.appendChild(script);
  });
}
loadScripts([
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/xml/xml.min.js",
  // "https://cdn.jsdelivr.net/npm/@cortex-js/compute-engine@latest/dist/compute-engine.umd.js",
  "https://unpkg.com/@cortex-js/compute-engine",
  "https://cdn.jsdelivr.net/npm/mathlive",
  "https://cdn.jsdelivr.net/npm/@ui-js/code-playground@1.13.2/dist/code-playground.min.js@module",
  ]
);
})();
`;


export default function (context, options) {
  return {
    name: "load-scripts",
    injectHtmlTags(page) {
      // @todo: ideally it would be nice to only load the code-playground
      // scripts when the page actually uses the code-playground component
      // but I can't figure out how to do that.
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "stylesheet",
              src: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css",
            },
          },
          {
            tagName: "script",
            innerHTML: loadScripts,
          },
        ],
      };
    },
  };
}

export function validateOptions({ options, validate }) {
  return options;
}
