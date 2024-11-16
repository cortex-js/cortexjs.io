import styles from "./styles.module.css";

export default function ({ children, name }) {
  return (
    <div id={name} className={styles.functionDefinition}>
      {children}
    </div>
  );
}
