import styles from "./styles.module.css";

export default function ({ children }) {
  return <div className={styles.intro}>{children}</div>;
}
