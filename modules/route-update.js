function setupComputeEngine() {
  if (window.ce !== undefined && 'CodeMirror' in window) return;
  // If we're not ready, try again in 500ms
  if (!("ComputeEngine" in window) || !("CodeMirror" in window)) {
    setTimeout(setupComputeEngine, 500);
    return;
  }
  window.ce = new ComputeEngine.ComputeEngine();
  // Reset all the CodePlayground elements
  // Give some time for the CodeMirror and ComputeEngine libraries to load
  setTimeout(() => document.querySelectorAll("code-playground").forEach((x) => x.run()),
    200);
}

function renderMath() {
  if (!("MathLive" in window)) {
    setTimeout(renderMath, 500);
    return;
  }
  MathLive.renderMathInDocument({
    renderAccessibleContent: false,
    skipTags: [
      "code-playground",
      "math-field",
      "noscript",
      "style",
      "textarea",
      "pre",
      "code",
      "kbd",
      "annotation",
      "annotation-xml",
    ],
    ignoreClass: "ML__latex",

    TeX: {
      delimiters: {
        inline: [["\\(", "\\)"]],
        display: [
          ["$$", "$$"],
          ["\\[", "\\]"],
        ],
      },
      className: { display: "math-display", inline: "math-inline" },
      processEnvironments: false,
    },
    asciiMath: null,
  });
}

export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    renderMath();
    setupComputeEngine();
  }
}
