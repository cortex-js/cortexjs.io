import styles from "./styles.module.css";
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ({
  children,
  style,
  path,
  imageStyle,
  backgroundStyle,
}) {
  const url = useBaseUrl(path);
  return (<>
    <div className={styles.heroText}>{children}</div>
    <div
      className={styles.heroContainer}
      style={{
        ...style,
        "--hero-image": `url(${url})`,
        ...(backgroundStyle ?? {}),
      }}
    >
      <div className={styles.heroImage} style={imageStyle}></div>
    </div>
    </>
  );
}
