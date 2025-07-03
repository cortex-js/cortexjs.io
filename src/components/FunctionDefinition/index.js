import styles from "./styles.module.css";

export default function ({ children, name }) {
  return (
    <section id={name} className={styles.functionDefinition}>
      {children}
    </section>
  );
}
