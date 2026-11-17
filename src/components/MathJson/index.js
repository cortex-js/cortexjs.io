import React from "react";
import styles from "./styles.module.css";

/**
 * The MathJSON part of an entry of the Epsil library reference. The heading
 * gives the MathJSON name and the LaTeX commands of the definition; the body,
 * the MathJSON forms and examples, is closed by default. With no body, the
 * heading is a plain line.
 *
 * A native `<details>`, not the Docusaurus `Details` that MDX maps `<details>`
 * to: that one hides its closed content with `display: none`, so the
 * browser's find-in-page cannot open it on a match, and a native one can.
 */
export default function MathJson({ name, latex = [], children }) {
  const heading = (
    <>
      MathJSON: <code>{name}</code>
      {latex.length > 0 && (
        <>
          {" • LaTeX: "}
          {latex.map((command, i) => (
            <React.Fragment key={command}>
              {i > 0 && ", "}
              <code>{command}</code>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
  if (!children) return <p className={`${styles.mathjson} ${styles.line}`}>{heading}</p>;
  return (
    <details className={styles.mathjson}>
      <summary>{heading}</summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
