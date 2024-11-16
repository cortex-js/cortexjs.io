import Icon from "../Icon";
import styles from "./styles.module.css";
import  BrowserOnly  from "@docusaurus/BrowserOnly";

export default function DocMetadata({ lastUpdated }) {
  return (
    <BrowserOnly>
      {() => {
        const version = window.MathfieldElement?.version;
        return (
          <>
            {lastUpdated && (
              <p className={styles.version}>
                <Icon name="calendar-days" />
                Last updated {lastUpdated}
              </p>
            )}
            {version && (
              <p className={styles.version}>
                <Icon name="code-branch" />
                MathField <span className={styles.versionNumber}>{version}</span>
              </p>
            )}
            {window.ComputeEngine && (
              <p className={styles.version}>
                <Icon name="code-branch" />
                Compute Engine{" "}
                <span className={styles.versionNumber}>
                  {window.ComputeEngine?.version}
                </span>
              </p>
            )}
          </>
        );
      }}
    </BrowserOnly>
  );
}