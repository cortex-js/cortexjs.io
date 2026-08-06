// Cortex syntax highlighting for Docusaurus code blocks.
//
// Docusaurus highlights with Prism, but the Cortex language definition is
// written for highlight.js and maintained next to the grammar it describes, in
// the compute-engine repo (`src/cortex/highlight-js-mode.js`, with its keyword
// and constant tables pinned by `test/cortex/reserved-words.test.ts`).
// `scripts/build.sh` syncs that file here as `./cortex-mode.js`.
//
// Rather than reimplement the grammar as a Prism grammar — a second definition
// to keep in sync — this module runs highlight.js and reshapes its output into
// the token arrays `prism-react-renderer` hands to Docusaurus's <Line>
// component: `{ types: string[], content: string, empty?: boolean }[][]`. The
// theme, the copy button, word wrap, line numbers and magic comments all keep
// working because only the tokens change, not the rendering.

import hljs from 'highlight.js/lib/core';
import cortexMode from './cortex-mode.js';

hljs.registerLanguage('cortex', cortexMode);

// highlight.js scopes -> Prism token types, so the existing Prism theme
// (`src/prism/theme-light.js`) colors Cortex without a second palette.
//
// `variable` is deliberately mapped to `plain`: the Cortex mode matches *every*
// identifier as a variable, so honoring it would paint the whole program. Prism
// leaves bare identifiers unstyled and so do we.
const SCOPE_TO_PRISM = {
  keyword: 'keyword',
  literal: 'constant',
  type: 'class-name',
  built_in: 'function',
  title: 'function',
  string: 'string',
  number: 'number',
  comment: 'comment',
  operator: 'operator',
  punctuation: 'punctuation',
  meta: 'property',
  char: 'char',
  escape: 'char',
  subst: 'plain',
  variable: 'plain',
};

// The inverse of highlight.js's `escapeHTML`.
const HTML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
};

function unescapeHtml(text) {
  return text.replace(
    /&(?:amp|lt|gt|quot|#x27);/g,
    (entity) => HTML_ENTITIES[entity]
  );
}

// `class="hljs-char hljs-escape_"` (highlight.js splits a `char.escape` scope
// into one class per segment, trailing `_` on the sub-scope) -> `['char']`.
function classesToTypes(classAttribute) {
  const types = [];
  for (const className of classAttribute.split(/\s+/)) {
    if (!className.startsWith('hljs-')) continue;
    const scope = className.slice('hljs-'.length).replace(/_$/, '');
    const type = SCOPE_TO_PRISM[scope] ?? scope;
    if (!types.includes(type)) types.push(type);
  }
  return types;
}

// highlight.js emits a flat string of `<span class="hljs-…">` elements and
// escaped text, so a scanner over those two shapes recovers the token tree
// without needing a DOM (this also runs during the server-side render).
const TAG = /<span class="([^"]*)">|<\/span>/g;

function parseHighlightedHtml(html) {
  const tokens = [];
  const scopeStack = [];
  let index = 0;

  const emit = (text) => {
    if (!text) return;
    const types = scopeStack.flat();
    tokens.push({
      types: types.length > 0 ? types : ['plain'],
      content: unescapeHtml(text),
    });
  };

  TAG.lastIndex = 0;
  let match;
  while ((match = TAG.exec(html)) !== null) {
    emit(html.slice(index, match.index));
    if (match[1] === undefined) scopeStack.pop();
    else scopeStack.push(classesToTypes(match[1]));
    index = TAG.lastIndex;
  }
  emit(html.slice(index));

  return tokens;
}

// Split tokens on newlines into the line-per-entry shape <Line> expects, using
// the same empty-line normalization as `prism-react-renderer` so blank lines
// keep their height.
function toLines(tokens) {
  const lines = [[]];

  for (const token of tokens) {
    const segments = token.content.split(/\r\n|\r|\n/);
    segments.forEach((segment, i) => {
      if (i > 0) lines.push([]);
      if (segment) lines[lines.length - 1].push({ ...token, content: segment });
    });
  }

  for (const line of lines) {
    if (line.length === 0) {
      line.push({ types: ['plain'], content: '\n', empty: true });
    } else if (line.length === 1 && line[0].content === '') {
      line[0].content = '\n';
      line[0].empty = true;
    }
  }

  return lines;
}

/**
 * Tokenize Cortex source into `prism-react-renderer`-shaped lines of tokens.
 *
 * @param {string} code
 * @returns {{types: string[], content: string, empty?: boolean}[][]}
 */
export default function tokenizeCortex(code) {
  const { value } = hljs.highlight(code, {
    language: 'cortex',
    ignoreIllegals: true,
  });
  return toLines(parseHighlightedHtml(value));
}
