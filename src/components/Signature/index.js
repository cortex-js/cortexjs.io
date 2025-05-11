import styles from "./styles.module.css";

export default function ({ children, name, returns }) {
  if (!children) {
    if (!returns) {
    return (
      <p className={styles.signature}>
        <b>{name}</b>()
      </p>
          );
    }
    return (
      <p className={styles.signature}>
        <b>{name}</b>() -&gt; <span className={styles.returns}> {returns}</span>
      </p>
    );
  }

  if (!returns) {
      return (
      <p className={styles.signature}>
        <b>{name}</b>: ({children})
      </p>
    );
  }
  return (
    <p className={styles.signature}>
      <b>{name}</b>: ({children}) -&gt; <span className={styles.returns}> {returns}</span>
    </p>
  );
}
