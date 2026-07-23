import React, { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ConsoleMarkup from "@site/src/components/ConsoleMarkup";
import styles from "./styles.module.css";

// The Cortex language lives in the `@cortex-js/compute-engine/cortex` entry
// point. We load it lazily, from the same CDN the rest of the site uses (see
// `plugins/load-scripts`), so it only downloads on pages that actually embed a
// playground. The import goes through `new Function` so the bundler never sees
// it — webpack would otherwise try (and fail) to resolve the absolute `https:`
// URL at build time. This only ever runs in the browser (guarded by
// `useIsBrowser`), never during server-side rendering.
const CORTEX_MODULE_URL = "https://esm.run/@cortex-js/compute-engine/cortex";
const nativeImport = new Function("url", "return import(url)") as (
  url: string
) => Promise<any>;

let cortexModulePromise: Promise<any> | null = null;
function loadCortex(): Promise<any> {
  if (!cortexModulePromise) cortexModulePromise = nativeImport(CORTEX_MODULE_URL);
  return cortexModulePromise;
}

// Turn a `DiagnosticMessage` (`code` or `[code, ...args]`) into a readable
// one-liner. We don't try to reproduce the engine's full message catalog —
// just surface the code and its arguments so the problem is legible.
function formatDiagnostic(message: unknown): string {
  if (Array.isArray(message)) {
    const [code, ...args] = message;
    const label = String(code).replace(/-/g, " ");
    if (args.length === 0) return label;
    return `${label}: ${args.map((a) => JSON.stringify(a)).join(", ")}`;
  }
  return String(message).replace(/-/g, " ");
}

// Work around an upstream `serializeCortex` gap: it mis-serializes the MathJSON
// dictionary *object shorthand* `{"dict": {…}}` (what an evaluated dictionary's
// `.json` returns) to a broken `{dict -> }`, but serializes the canonical
// `["Dictionary", ["KeyValuePair", …]]` form correctly. Rewrite the shorthand
// to the canonical form before serializing. Remove once the engine handles the
// shorthand directly.
function normalizeForSerialize(j: any): any {
  if (Array.isArray(j)) return j.map(normalizeForSerialize);
  if (j && typeof j === "object") {
    if (j.dict && typeof j.dict === "object" && !Array.isArray(j.dict)) {
      return [
        "Dictionary",
        ...Object.entries(j.dict).map(([k, v]) => [
          "KeyValuePair",
          { str: k },
          normalizeForSerialize(v),
        ]),
      ];
    }
    return j;
  }
  return j;
}

interface Diagnostic {
  severity: "warning" | "error";
  message: unknown;
  range: [number, number, number?];
}

interface Result {
  json?: unknown;
  cortex?: string;
  diagnostics: Diagnostic[];
  error?: string;
}

export default function CortexPlayground({
  source = "",
  autorun = true,
}: {
  source?: string;
  autorun?: boolean;
}): React.ReactNode {
  const isBrowser = useIsBrowser();
  const [code, setCode] = useState(source.replace(/\n$/, ""));
  const [result, setResult] = useState<Result | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const engineRef = useRef<any>(null);
  const apiRef = useRef<any>(null);

  const run = useCallback(async () => {
    setStatus((s) => (s === "ready" ? s : "loading"));
    try {
      if (!apiRef.current) apiRef.current = await loadCortex();
      const { ComputeEngine, executeCortex, serializeCortex } = apiRef.current;
      if (!engineRef.current) engineRef.current = new ComputeEngine();
      const ce = engineRef.current;
      setStatus("ready");

      const { value, diagnostics } = executeCortex(ce, code, {
        // Wire `$…$` LaTeX islands to the engine's own LaTeX parser.
        parseLatex: (latex: string) => ce.parse(latex).json,
      });

      const json = value?.json;
      let cortex: string | undefined;
      try {
        // Serialize the result back to Cortex source for a readable rendering.
        if (json !== undefined)
          cortex = serializeCortex(normalizeForSerialize(json));
      } catch {
        cortex = undefined;
      }

      setResult({ json, cortex, diagnostics: diagnostics ?? [] });
    } catch (err) {
      setStatus("ready");
      setResult({
        diagnostics: [],
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }, [code]);

  // Auto-run once the component is live in the browser.
  useEffect(() => {
    if (isBrowser && autorun) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  };

  return (
    <div className={styles.playground}>
      <div className={styles.editor}>
        <textarea
          className={styles.textarea}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          value={code}
          rows={Math.max(2, code.split("\n").length)}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Cortex source code"
        />
        <div className={styles.toolbar}>
          <button
            className={styles.run}
            onClick={run}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading…" : "Run ⏎"}
          </button>
          <span className={styles.hint}>{"⌘/Ctrl + Enter"}</span>
        </div>
      </div>

      {result && (
        <div className={styles.output}>
          {result.error && (
            <div className={styles.fatal}>{result.error}</div>
          )}

          {result.diagnostics?.map((d, i) => (
            <div
              key={i}
              className={d.severity === "error" ? styles.error : styles.warning}
            >
              <span className={styles.badge}>{d.severity}</span>
              {formatDiagnostic(d.message)}
            </div>
          ))}

          {!result.error && result.cortex !== undefined && (
            <div className={styles.result}>
              <span className={styles.label}>Cortex</span>
              <pre className={styles.cortex}>{result.cortex}</pre>
            </div>
          )}

          {!result.error && result.json !== undefined && (
            <div className={styles.result}>
              <span className={styles.label}>MathJSON</span>
              <ConsoleMarkup value={result.json} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
