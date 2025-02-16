import styles from "./styles.module.css";
import { Children } from "react";

export default function ({ children, value, flow = "row", source, aside }) {
  value = value ?? children;

  if (typeof value !== "string") {
    return (
      <div style={{ background: "red", color: "white", padding: "8px" }}>
        Expected a string argument. Use:
        <pre>&lt;Latex&gt;&#123;`...`&#125;&lt;/Latex&gt;</pre>
      </div>
    );
  }

  value = value.trim();

  source = source ?? value;

  value = `$$$${value}$$`;

  if (flow === "column") {
    return (
      <div className={styles.latexWrapperColumn}>
        <div className={styles.source + " language-latex"}>
          {latexSource(source)}
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>

        <div className={styles.latexWrapperColumnDisplay}>{value}</div>
      </div>
    );
  }

  return (
    <div className={styles.latexWrapper}>
      <div className={styles.source + " language-latex"}>
        {latexSource(source)}
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>

      <div className={styles.display}>{value}</div>
    </div>
  );
}

function latexSource(latex) {
  const lines = latex.split("\n");

  return Children.map(lines, (line) => {
    return (
      <div className={styles.line}>
        {latexSourceLine(line)}
        <br />
      </div>
    );
  });
}

function latexSourceLine(latex) {
  // Tokenize the latex string to isolate commands (\frac) and punctuation
  // (e.g. {}&, etc..) from the rest of the string
  const tokens = latex.match(/\\[a-zA-Z]+\*?|\\.|[^\\{}\[\]&]+|[{}\[\]&]/g);

  return Children.map(tokens, (token) => {
    if (token[0] === "\\")
      return <span className={styles.command}>{token}</span>;
    if (/[{}&\[\]]/.test(token))
      return <span className={styles.punctuation}>{token}</span>;
    return <span>{token}</span>;
  });
}
