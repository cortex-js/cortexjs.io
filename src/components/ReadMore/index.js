import styles from "./styles.module.css";

export default function ReadMore({ children, path }) {
  return (
    <div className={styles.readMore}>
      <a href={path}>
        <>{children}</>
      </a>
    </div>
  );
}
