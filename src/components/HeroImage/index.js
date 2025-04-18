import styles from "./styles.module.css";

export default function ({
  children,
  style,
  path,
  imageStyle,
  backgroundStyle,
}) {
  return (<>
    <div className={styles.heroText}>{children}</div>
    <div
      className={styles.heroContainer}
      style={{
        ...style,
        "--hero-image": `url(${path})`,
        ...(backgroundStyle ?? {}),
      }}
    >
      <div className={styles.heroImage} style={imageStyle}></div>
    </div>
    </>  
  );
}
