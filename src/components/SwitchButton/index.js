import styles from "./styles.module.css";

export default function ({ children, onChange, ...props }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onChange} {...props} />
      <span className={styles.slider}></span>
    </label>
  );
}
