function setupComputeEngine() {
  if (window.ce !== undefined) return;
  if (!("ComputeEngine" in window)) {
    setTimeout(setupComputeEngine, 500);
    return;
  }
  window.ce = new ComputeEngine.ComputeEngine();
}

function renderMath() {
  if (!("MathLive" in window)) {
    setTimeout(renderMath, 500);
    return;
  }

  debugger;
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
