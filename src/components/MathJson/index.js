import React from "react";
import styles from "./styles.module.css";

/**
 * The MathJSON part of an entry of the Epsil library reference: the MathJSON
 * name, the LaTeX commands and the MathJSON examples, closed by default.
 *
 * A native `<details>`, not the Docusaurus `Details` that MDX maps `<details>`
 * to: that one hides its closed content with `display: none`, so the
 * browser's find-in-page cannot open it on a match, and a native one can.
 */
export default function MathJson({ name, children }) {
  return (
    <details className={styles.mathjson}>
      <summary>
        MathJSON{name ? <> · <code>{name}</code></> : null}
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
