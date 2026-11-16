import styles from "./styles.module.css";

// A card that points to Graph Paper (https://graph-paper.io), the math
// workspace built on MathLive, the Compute Engine and Epsil. Shown on the
// landing pages of both sites and on the Mathfield and Compute Engine
// introductions. Graph Paper's logo is the same rainbow cube as
// `static/img/logo.svg`.
export default function GraphPaperBanner({ className }) {
  return (
    <a
      className={className ? `${styles.banner} ${className}` : styles.banner}
      href="https://graph-paper.io"
    >
      {/* Decorative: the text next to it names Graph Paper. */}
      <img
        className={styles.logo}
        src="/img/logo.svg"
        alt=""
        width="48"
        height="48"
      />
      <span className={styles.text}>
        <span className={styles.title}>
          Now available in <strong>Graph Paper</strong>
        </span>
        <span className={styles.subtitle}>
          A new workspace for math exploration
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}
