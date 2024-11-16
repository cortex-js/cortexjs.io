import styles from "./styles.module.css";

export default function ({ children, name }) {
  if (!children) {
    return (
      <p className={styles.signature}>
        [<b>{name}</b>]
      </p>
    );
  }
  return (
    <p className={styles.signature}>
      ["<b>{name}</b>", {children}]
    </p>
  );
}
