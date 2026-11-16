import clsx from "clsx";
import { useAnchorTargetClassName } from "@docusaurus/theme-common";
import useBrokenLinks from "@docusaurus/useBrokenLinks";

import styles from "./styles.module.css";

// The section of one function on a reference page. Its `id` is the function
// name (`#Integrate`), an anchor that links and the site search use. It is
// registered with the broken-link checker, as the theme's Heading does, so
// that a link to `#Name` is checked at build time; the anchor class gives it
// the scroll margin that keeps it clear of the sticky navbar.
export default function FunctionDefinition({ children, name }) {
  useBrokenLinks().collectAnchor(name);
  const anchorClassName = useAnchorTargetClassName(name);
  return (
    <section id={name} className={clsx(styles.functionDefinition, anchorClassName)}>
      {children}
    </section>
  );
}
