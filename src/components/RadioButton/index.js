import styles from "./styles.module.css";

export default function ({ children, onChange, id, ...props }) {
  return (
    <div className={styles.row}>
      <input
        className={styles.radioButton}
        type="radio"
        onChange={onChange}
        id={id}
        {...props}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
