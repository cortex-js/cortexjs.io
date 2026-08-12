// Landing page for the standalone epsil.dev site.
//
// The docs plugin on that site is rooted at `/`, so this page and the docs
// share a route namespace. `scripts/sync-epsil-docs.mjs` maps the upstream
// section root `/epsil/` to `/introduction/` for exactly that reason — this
// page owns `/`.

import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import CodeBlock from "@theme/CodeBlock";
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
const HERO_SOURCE = `// Fibonacci

// Multi-clause function definition
fib(0) = 0
fib(1) = 1

// Type inference makes most type annotations optional
fib(n: integer) = fib(n - 1) + fib(n - 2)

// Numeric range, and pipe operators to chain operations
5..10 |> Map(_, fib) |> Sum
`;

// Each `code` is lifted or adapted from a fence in `docs/epsil/`, noted per
// entry — and every one has been executed against the engine in
// ../compute-engine, with its `// ➔` comments checked against real output.
// Re-run them after an engine bump rather than trusting them by eye: import
// `executeEpsil` from the sibling repo's `dist/esm/epsil.js`, pass a
// `parseLatex` option (the `$…$` islands below need it), and treat any
// `severity === "error"` diagnostic as a failure — except in the types sample,
// where the rejected binding is the point.
// Unlike HERO_SOURCE these are static — never executed on the page — so they
// carry their result comments rather than relying on the REPL to produce one.
const FEATURES = [
  {
    // docs/epsil/tour.md — pipelines
    title: "Expressive",
    body: "Pipelines, lambdas and multi-clause definitions carry a computation from input to result, in the order you would describe it out loud. Conditionals, matches and blocks all produce values, so any of them can feed the next step.",
    code: `1..10
  |> Filter(_, n |-> n % 2 == 0)
  |> Map(_, n |-> n^2)
  |> Sum
// ➔ 220`,
    href: "/tour/",
    cta: "Take the tour",
  },
  {
    // Composed from docs/epsil/examples.md — "Solve, then verify" and the
    // Calculus section. Engine-checked: the simplification is exact and the
    // solution set is [5].
    title: "Symbolic by default",
    body: "Expressions stay exact until you ask for a number. Simplify, differentiate and solve without leaving the language.",
    code: `let e = Simplify((x^2 - 1) / (x - 1))
// ➔ x + 1
Solve(e == 6, x)
// ➔ [5]`,
    href: "/evaluation/#symbolic-by-default",
    cta: "How evaluation works",
  },
  {
    // docs/epsil/operators.md — implicit multiplication
    title: "Math you can read",
    body: "Implicit multiplication, superscripts, ranges and LaTeX islands — notation that matches what you would write on paper.",
    code: `2x + 3x^3           // 2 * x + 3 * (x^3)
$\\sqrt{\\frac1n}$    // √(1/n)`  ,
    href: "/syntax/",
    cta: "Read the syntax",
  },
  {
    // docs/epsil/examples.md — "Units and Measurements", with the measured
    // quantities given units. Engine-checked: metres and centimetres reconcile
    // and the quadrature error comes out at 0.32 m².
    title: "Units and uncertainty",
    body: "Quantities carry their units through a computation and reconcile as they go, while measurements propagate their error — 10 ± 0.1 m by 250 ± 2 cm is 25.00 ± 0.32 m².",
    code: `let L = Measurement($10\\,\\mathrm{m}$, 0.1)
let W = Measurement($250\\,\\mathrm{cm}$, 2)
N(UnitConvert(L * W, $\\mathrm{m^2}$))
// ➔ (25.00 ± 0.32) m^2`,
    href: "/examples/#units-and-measurements",
    cta: "See it work",
  },
  {
    // docs/epsil/examples.md — the `json` alias from the JSON parser, wrapped
    // across two lines. Checked against the engine in ../compute-engine: the
    // wrapped alias parses, the dictionary conforms, and the lambda is a
    // static-type-error — i.e. reported before the program runs.
    title: "Types that describe your data",
    body: "Inference covers most code, so annotations are for when the shape itself matters. Recursive unions, generics with bounds, structural aliases for convenience and nominal types so a celsius never passes for a fahrenheit — all checked before anything runs.",
    code: `type alias json = number | string | boolean
                | missing | list<json> | dictionary

let doc: json = {"tags" -> ["math", "computing"]}
let bad: json = x |-> x  // rejected before it runs`,
    href: "/types/",
    cta: "How types work",
  },
  {
    // docs/epsil/evaluation.md — "Values and bindings". The second half of the
    // body is the pragmatic counterweight: immutable values do not imply a
    // dogmatically pure style (see `/examples/#iteration-and-accumulation`).
    title: "Values never change",
    body: "A value is immutable; a binding is the part that moves. Sort, Append and Join all hand back something new. Functional, but not dogmatic about it: when a mutable local and a for loop read better, take them.",
    code: `let xs = [3, 1, 2]
let ys = Sort(xs)
(xs, ys)
// ➔ ([3, 1, 2], [1, 2, 3])`,
    href: "/evaluation/#values-and-bindings",
    cta: "Values and bindings",
  },
  {
    // docs/epsil/control-flow.md — "Effect specifiers". Both definitions were
    // checked against the engine in ../compute-engine: `roll(1..6)` returns an
    // integer, and the same body declared `pure` is rejected.
    title: "Effects are in the signature",
    body: "Console, network, filesystem, randomness and six more are tracked. Effects are inferred from a body, and a written specifier becomes a contract it has to keep.",
    code: `function roll(xs) random -> integer { Random(xs) }
function double(x) pure -> number { 2x }

// Declaring the first one pure is rejected: its
// body performs an effect it did not admit to.`,
    href: "/control-flow/#effect-specifiers",
    cta: "Effect specifiers",
  },
  {
    // docs/epsil/from-python.md — "Errors"
    title: "Errors are values",
    body: "A failed computation produces a value that flows through the rest of the work, not an exception that unwinds your program.",
    code: `Map([16, -4, "banana", 81], x |-> Sqrt(x))
// ➔ [4, 2i, NaN, 9]`,
    href: "/control-flow/",
    cta: "Control flow",
  },
  {
    // Closing row: a call to action rather than a language feature, so it runs
    // full width with no sample (see `.featureWide`).
    title: "Built for humans, tuned for agents",
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
          <div className={styles.heroText}>
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
          </div>

          {/* Decorative: the heading beside it already names the product, so
              an alt text here would only repeat it to a screen reader. */}
          <div className={styles.heroArt}>
            <img
              className={styles.heroImage}
              src="/img/hand-cube.jpg"
              alt=""
              width="948"
              height="948"
              loading="eager"
            />
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
            <article
              className={
                feature.code
                  ? styles.feature
                  : `${styles.feature} ${styles.featureWide}`
              }
              key={feature.title}
            >
              <div className={styles.featureText}>
                <Heading as="h2" className={styles.featureTitle}>
                  {feature.title}
                </Heading>
                <p className={styles.featureBody}>{feature.body}</p>
                <a className={styles.featureLink} href={feature.href}>
                  {feature.cta}
                </a>
              </div>
              {feature.code && (
                <div className={styles.featureCode}>
                  <CodeBlock language="epsil">{feature.code}</CodeBlock>
                </div>
              )}
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
