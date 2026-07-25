// Maps a page permalink to the path of its raw markdown twin:
//
//   /cortex/mcp/  ->  /cortex/mcp.md
//   /             ->  /index.md
//
// Shared by the llms-txt plugin, which emits those files at build time, and
// by the DocItem/Layout theme wrapper, which advertises them with
// <link rel="alternate" type="text/markdown">. Both must agree, so the rule
// lives here rather than in each of them.
export function markdownPath(permalink, baseUrl = "/") {
  let path = permalink;
  if (baseUrl !== "/" && path.startsWith(baseUrl))
    path = "/" + path.slice(baseUrl.length);
  path = path.replace(/\/+$/, "");
  return (path === "" ? "/index" : path) + ".md";
}
