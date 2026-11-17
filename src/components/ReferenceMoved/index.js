import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import symbols from "@site/config/epsil-search-symbols.json";

const EPSIL_URL = "https://epsil.dev";

/** The epsil.dev path of the reference entry of each MathJSON name. */
const ENTRY = new Map(symbols.map((s) => [s.id, s.url]));

/**
 * A hand-written MathJSON reference page whose entries moved to the Epsil
 * library reference (see reference-details/README.md).
 *
 * It keeps every anchor of the old page, as an element that the build's
 * broken-anchor check sees, so the links to them stay valid. On load it sends
 * the reader to the new place of the anchor in the URL: a MathJSON name in
 * `names`, or its lowercase form, goes to its entry, another anchor to its
 * path in `anchors`, and anything else to `to`. Without JavaScript, it is a list of links.
 *
 * The search index skips the page (`data-moved-to`).
 */
export default function ReferenceMoved({ to, names = [], anchors = {} }) {
  const { siteConfig } = useDocusaurusContext();
  const links = useBrokenLinks();
  const host = siteConfig.url === EPSIL_URL ? "" : EPSIL_URL;

  // A name has two anchors on a hand-written page: its `FunctionDefinition`
  // (`Sum`) and the hidden heading before it (`sum`).
  const targets = new Map();
  for (const name of names) {
    const entry = ENTRY.get(name) ?? to;
    targets.set(name, entry);
    targets.set(name.toLowerCase(), entry);
  }
  for (const [id, path] of Object.entries(anchors)) targets.set(id, path);
  for (const id of targets.keys()) links.collectAnchor(id);

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    window.location.replace(host + (targets.get(id) ?? to));
  }, []);

  return (
    <div data-moved-to={to}>
      <p>
        This page moved to the <Link to={host + to}>Epsil library reference</Link>.
        Each entry is under its Epsil name, with its MathJSON form.
      </p>
      <ul>
        {names.map((name) => (
          <li key={name} id={name}>
            <Link to={host + targets.get(name)}>{name}</Link>
          </li>
        ))}
      </ul>
      {[...targets]
        .filter(([id]) => !names.includes(id))
        .map(([id, path]) => (
          <span key={id} id={id} data-moved-anchor={path} />
        ))}
    </div>
  );
}
