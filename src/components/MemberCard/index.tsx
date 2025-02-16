import styles from "./styles.module.css";
import clsx from "clsx";

export default function ({ children }) {
  return <div className={clsx(styles.memberCard, "member-card")}>{children}</div>;
}
