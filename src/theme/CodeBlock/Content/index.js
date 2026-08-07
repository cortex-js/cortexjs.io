// Swizzled (ejected) from @docusaurus/theme-classic so Epsil code blocks can
// be highlighted by highlight.js instead of Prism.
//
// Docusaurus has no seam for supplying tokens to <Highlight>, so this is a copy
// of the upstream component with one change, marked below: when the block's
// language is `epsil`, the token lines come from `src/hljs/epsil.js` — which
// runs the highlight.js language definition synced from the compute-engine repo
// — instead of from Prism, which has no Epsil grammar and would render the
// block unstyled. <Highlight> still wraps everything so `getLineProps` /
// `getTokenProps` stay bound to the configured Prism theme, and every other
// feature (word wrap, copy button, line numbers, magic comments) is untouched.
//
// When upgrading Docusaurus, re-diff this against
// node_modules/@docusaurus/theme-classic/lib/theme/CodeBlock/Content/index.js.

import React from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import { usePrismTheme } from '@docusaurus/theme-common';
import { Highlight } from 'prism-react-renderer';
import Line from '@theme/CodeBlock/Line';
import styles from './styles.module.css';

import tokenizeEpsil from '@site/src/hljs/epsil';

const Pre = React.forwardRef((props, ref) => {
  return (
    <pre
      ref={ref}
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex={0}
      {...props}
      className={clsx(props.className, styles.codeBlock, 'thin-scrollbar')}
    />
  );
});

function Code(props) {
  const { metadata } = useCodeBlockContext();
  return (
    <code
      {...props}
      className={clsx(
        props.className,
        styles.codeBlockLines,
        metadata.lineNumbersStart !== undefined &&
          styles.codeBlockLinesWithNumbering
      )}
      style={{
        ...props.style,
        counterReset:
          metadata.lineNumbersStart === undefined
            ? undefined
            : `line-count ${metadata.lineNumbersStart - 1}`,
      }}
    />
  );
}

export default function CodeBlockContent({ className: classNameProp }) {
  const { metadata, wordWrap } = useCodeBlockContext();
  const prismTheme = usePrismTheme();
  const { code, language, lineNumbersStart, lineClassNames } = metadata;

  // --- Epsil: highlight.js instead of Prism (see file header) ---
  const epsilLines = React.useMemo(
    () => (language === 'epsil' ? tokenizeEpsil(code) : undefined),
    [language, code]
  );

  return (
    <Highlight theme={prismTheme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre
          ref={wordWrap.codeBlockRef}
          className={clsx(classNameProp, className)}
          style={style}
        >
          <Code>
            {(epsilLines ?? tokens).map((line, i) => (
              <Line
                key={i}
                line={line}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                classNames={lineClassNames[i]}
                showLineNumbers={lineNumbersStart !== undefined}
              />
            ))}
          </Code>
        </Pre>
      )}
    </Highlight>
  );
}
