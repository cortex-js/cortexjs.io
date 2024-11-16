import styles from "./styles.module.css";

import clsx from "clsx";

export default function Icon({ children, name, color }) {
  let style = null;
  if (color) style = { color: `var(--${color})` };

  const clsMap = {
    "chevron-right": styles.chevronRight,
    "chevron-right-bold": styles.chevronRightBold,
  };

  const cls = clsMap[name] ?? null;

  return (
    <svg className={clsx(styles.icon, cls)}>
      <use xlinkHref={`/icons.svg#${name}`} style={style}></use>
    </svg>
  );
}
