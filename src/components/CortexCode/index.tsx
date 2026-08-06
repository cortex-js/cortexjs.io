import React from "react";
import { Highlight } from "prism-react-renderer";
import { usePrismTheme } from "@docusaurus/theme-common";
import tokenizeCortex from "@site/src/hljs/cortex";

/**
 * Cortex source highlighted inline, outside a Docusaurus code block.
 *
 * ` ```cortex ` blocks go through the swizzled `theme/CodeBlock/Content`; this
 * is for the places that render Cortex without that chrome, like the REPL's
 * result. Tokens come from the same highlight.js mode, so a construct is
 * colored identically whether it is authored in a doc or produced by the
 * engine.
 *
 * <Highlight> wraps the output only to borrow `getTokenProps`, which resolves
 * a token's colors from the configured Prism theme — the render never uses the
 * tokens Prism itself produces (it has no Cortex grammar). Lines are emitted as
 * text separated by newlines rather than through `getLineProps`, which would
 * stamp the code-block plain style inline on every line: the surface is the
 * caller's to choose through `className`, and it has to be a dark one, because
 * the palette these tokens are colored from is built for a dark console.
 */
export default function CortexCode({
  code,
  className,
}: {
  code: string;
  className?: string;
}): React.ReactNode {
  const prismTheme = usePrismTheme();
  const lines = React.useMemo(() => tokenizeCortex(code), [code]);

  return (
    <Highlight theme={prismTheme} code={code} language="cortex">
      {({ getTokenProps }) => (
        <pre className={className}>
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && "\n"}
              {line.map((token, j) => {
                // `empty` marks a blank line's placeholder token, whose content
                // is the newline we already emit between lines.
                if (token.empty) return null;
                const { key, ...props } = getTokenProps({ token }) as any;
                return <span key={j} {...props} />;
              })}
            </React.Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
