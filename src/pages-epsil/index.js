// Landing page for the standalone epsil.dev site.
//
// The docs plugin on that site is rooted at `/`, so this page and the docs
// share a route namespace. `scripts/sync-epsil-docs.mjs` maps the upstream
// section root `/epsil/` to `/introduction/` for exactly that reason — this
// page owns `/`.

import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EpsilPlayground from "@site/src/components/EpsilPlayground";
import styles from "./index.module.css";

// Runs on mount (EpsilPlayground autoruns), so it has to evaluate cleanly on
// the pinned engine and stay clean when re-run — the REPL keeps one
// ComputeEngine across runs, so a redefinition that collides with an earlier
// binding surfaces as an error on the second click.
//
// Verified against the deployed REPL. Note `->` lambdas take no type
// annotation in the published engine (`let f = (x: number) -> …` is a parse
// error, and without the annotation `x` infers as string) — hence the
// `function` declaration form, which is what the docs use.
const HERO_SOURCE = `// Expressions stay exact until you ask for a number.
function poly(x: number) { x^2 + 2x + 1 }

(poly(3), Simplify(2 + 3x^3 + 2x^2 + x^3 + 1), N(Sqrt(2)))
`;

const FEATURES = [
  {
    title: "Symbolic by default",
    body: "Expressions stay exact until you ask for a number. Simplify, differentiate and solve without leaving the language.",
    href: "/evaluation/",
    cta: "How evaluation works",
  },
  {
    title: "Math you can read",
    body: "Implicit multiplication, superscripts, ranges and LaTeX islands — notation that matches what you would write on paper.",
    href: "/syntax/",
    cta: "Read the syntax",
  },
  {
    title: "Errors are values",
    body: "A failed computation produces a diagnostic you can pattern-match on, not an exception that unwinds your program.",
    href: "/control-flow/",
    cta: "Control flow",
  },
  {
    title: "Built for agents",
    body: "A small, unambiguous grammar with a machine-readable spec, an MCP server and a CLI, so tools can generate and check it.",
    href: "/for-agents/",
    cta: "Epsil for AI agents",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="A language for scientific computing"
      description={siteConfig.tagline}
    >
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Experimental</p>
          <Heading as="h1" className={styles.title}>
            Epsil
          </Heading>
          <p className={styles.tagline}>
            A programming language for scientific computing, built on the{" "}
            <a href="https://mathlive.io/compute-engine/">Compute Engine</a>.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="/getting-started/">
              Get Started
            </a>
            <a className={styles.secondaryButton} href="/syntax/">
              Language Reference
            </a>
          </div>
        </header>

        <section className={styles.playground} aria-label="Try Epsil">
          <h2 className={styles.sectionTitle}>Try it</h2>
          <p className={styles.sectionLead}>
            This runs in your browser. Edit the source and re-run it.
          </p>
          <EpsilPlayground source={HERO_SOURCE} />
        </section>

        <section className={styles.features} aria-label="Highlights">
          {FEATURES.map((feature) => (
            <article className={styles.feature} key={feature.title}>
              <Heading as="h2" className={styles.featureTitle}>
                {feature.title}
              </Heading>
              <p className={styles.featureBody}>{feature.body}</p>
              <a className={styles.featureLink} href={feature.href}>
                {feature.cta}
              </a>
            </article>
          ))}
        </section>

        <section className={styles.install} aria-label="Install">
          <h2 className={styles.sectionTitle}>Use it from JavaScript</h2>
          <pre className={styles.installCode}>
            <code>{`import { ComputeEngine, executeEpsil } from
  "@cortex-js/compute-engine/epsil";

const ce = new ComputeEngine();
const { value, diagnostics } = executeEpsil(ce, "1 + 2");`}</code>
          </pre>
          <p className={styles.sectionLead}>
            There is also a <a href="/cli/">command-line REPL</a>, a{" "}
            <a href="/vscode/">VS Code extension</a> and an{" "}
            <a href="/mcp/">MCP server</a>.
          </p>
        </section>
      </main>
    </Layout>
  );
}
