const EXPORTED_COMPUTE_ENGINE_FREE_FUNCTIONS = [
  "parse",
  "evaluate",
  "simplify",
  "assign",
  "N",
  "expand",
  "solve",
  "expandAll",
  "factor",
];

function exposeComputeEngineFreeFunctions() {
  if (!("ComputeEngine" in window)) return;

  for (const fnName of EXPORTED_COMPUTE_ENGINE_FREE_FUNCTIONS) {
    const fn = window.ComputeEngine?.[fnName];
    if (typeof fn === "function") window[fnName] = fn;
  }
}

function setupComputeEngine(delay) {
  if (window.ce !== undefined && 'CodeMirror' in window) {
    exposeComputeEngineFreeFunctions();
    return;
  }
  // If we're not ready, try again in 50ms
  if (!("ComputeEngine" in window) || !("CodeMirror" in window)) {
    setTimeout(() => setupComputeEngine(Math.max(1000, 2 * delay)), delay);
    return;
  }
  exposeComputeEngineFreeFunctions();
  window.ce = new ComputeEngine.ComputeEngine();
  // Reset all the CodePlayground elements
  // Give some time for the CodeMirror and ComputeEngine libraries to load
  setTimeout(() => document.querySelectorAll("code-playground").forEach((x) => {
    if (typeof x.run === 'function' ) x.run(); 
  }), 20);
}

function renderMath(delay) {
  if (!("MathLive" in window)) {
    setTimeout(() => renderMath(Math.max(1000, 2 * delay)), delay);
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
        inline: [["\\(", "\\)"], ["$", "$"]],
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


export function onRouteUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    // Make sure the virtual keyboard gets closed. It normally happens when 
    // the mathfield loses focus, but in some cases it doesn't (timing issue?)
    const vk = window.mathVirtualKeyboard;
    if (vk?.visible) vk.hide();
      
  }
} 

export function onRouteDidUpdate({ location, previousLocation }) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname !== previousLocation?.pathname) {
    renderMath(20);
    setupComputeEngine(10);
  }
}
