import styles from "./styles.module.css";

export default function ({ children }) {
  return <div className={styles.latexCommands}>{children}</div>;
}
