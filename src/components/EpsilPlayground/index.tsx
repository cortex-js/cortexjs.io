import React, { useCallback, useEffect, useRef, useState } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ConsoleMarkup from "@site/src/components/ConsoleMarkup";
import EpsilCode from "@site/src/components/EpsilCode";
import styles from "./styles.module.css";

// The Epsil language lives in the `@cortex-js/compute-engine/epsil` entry
// point, loaded lazily from the CDN so it only downloads on pages that embed a
// playground. The version is pinned so the REPL is reproducible and doesn't
// silently change when a new engine publishes — bump it when the synced Epsil
// docs are updated for a new CE release. The import goes through `new Function`
// so the bundler never sees it (webpack would otherwise try, and fail, to
// resolve the absolute `https:` URL at build time). This only ever runs in the
// browser (guarded by `useIsBrowser`), never during server-side rendering.
//
// The language was renamed from Cortex to Epsil after 0.102.0 shipped, so the
// latest published engine still exposes it as the `/cortex` entry point with
// `executeCortex`/`serializeCortex` names — the destructuring below accepts
// either spelling. When a release with the `/epsil` entry point publishes,
// point this URL at `…/epsil` and bump the version.
const EPSIL_MODULE_URL =
  "https://esm.run/@cortex-js/compute-engine@0.102.0/cortex";
const nativeImport = new Function("url", "return import(url)") as (
  url: string
) => Promise<any>;

let epsilModulePromise: Promise<any> | null = null;
function loadEpsil(): Promise<any> {
  if (!epsilModulePromise) epsilModulePromise = nativeImport(EPSIL_MODULE_URL);
  return epsilModulePromise;
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

interface Diagnostic {
  severity: "warning" | "error";
  message: unknown;
  range: [number, number, number?];
}

interface Result {
  json?: unknown;
  epsil?: string;
  diagnostics: Diagnostic[];
  error?: string;
}

export default function EpsilPlayground({
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
      if (!apiRef.current) apiRef.current = await loadEpsil();
      const { ComputeEngine } = apiRef.current;
      const executeEpsil =
        apiRef.current.executeEpsil ?? apiRef.current.executeCortex;
      const serializeEpsil =
        apiRef.current.serializeEpsil ?? apiRef.current.serializeCortex;
      if (!engineRef.current) engineRef.current = new ComputeEngine();
      const ce = engineRef.current;
      setStatus("ready");

      const { value, diagnostics } = executeEpsil(ce, code, {
        // Wire `$…$` LaTeX islands to the engine's own LaTeX parser.
        parseLatex: (latex: string) => ce.parse(latex).json,
      });

      const json = value?.json;
      let epsil: string | undefined;
      try {
        // Serialize the result back to Epsil source for a readable rendering.
        if (json !== undefined) epsil = serializeEpsil(json);
      } catch {
        epsil = undefined;
      }

      setResult({ json, epsil, diagnostics: diagnostics ?? [] });
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
          aria-label="Epsil source code"
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

          {!result.error && result.epsil !== undefined && (
            <div className={styles.result}>
              <span className={styles.label}>Epsil</span>
              <EpsilCode className={styles.epsil} code={result.epsil} />
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
