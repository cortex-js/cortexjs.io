// The search box of epsil.dev: the definitions of the symbol table first
// (`/search/symbols.json`, ranked by ./rank.js), then the sections of the
// Pagefind index (`/pagefind/`). Both are written after the build by
// ../../build-index.mjs; the dev server serves those of the last build (see
// ../../index.js), and the box says so when there is none.
//
// ARIA combobox: focus stays in the input, the arrow keys move
// `aria-activedescendant` through the options of the listbox, Enter opens the
// active option, Escape closes the list (or clears the box). Each option holds
// a real link so that a modified click opens a new tab.

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useHistory } from '@docusaurus/router';

import { prepareSymbols, rankSymbols } from './rank';
import styles from './styles.module.css';

const MAX_PAGES = 8;
const DEBOUNCE_MS = 120;

let symbolsPromise;
function loadSymbols() {
  symbolsPromise ??= fetch('/search/symbols.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
    .then(prepareSymbols);
  return symbolsPromise;
}

// Pagefind is a file of the build, not a module of the bundle. A plain
// `import()` would make webpack try to bundle it (the `webpackIgnore` comment
// does not survive Docusaurus's transpiler), so the import is created at run
// time. The site sends no Content-Security-Policy that would forbid it.
const importAtRuntime = new Function('url', 'return import(url)');

let pagefindPromise;
function loadPagefind() {
  pagefindPromise ??= importAtRuntime('/pagefind/pagefind.js').then(async (pf) => {
    // A section's page title is metadata (see build-index.mjs): count a match
    // there double, as body text of the section would.
    await pf.options({ ranking: { metaWeights: { title: 5, page: 2 } } });
    await pf.init();
    return pf;
  });
  return pagefindPromise;
}

/** A summary of the library data: Markdown, of which only `code` is kept. */
function Summary({ text }) {
  return (
    <span className={styles.excerpt}>
      {text.split('`').map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))}
    </span>
  );
}

/** Pagefind's excerpt is escaped text with <mark> around the matches. */
function Excerpt({ html }) {
  return <span className={styles.excerpt} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function SearchBar() {
  const history = useHistory();
  const id = useId();
  const listId = `${id}-list`;
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [symbols, setSymbols] = useState(null);
  const [pages, setPages] = useState([]);
  const [unavailable, setUnavailable] = useState(false);
  const [panelStyle, setPanelStyle] = useState({});
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgentData?.platform ?? navigator.platform ?? ''));
  }, []);

  const warmUp = useCallback(() => {
    loadSymbols().then(setSymbols, () => setUnavailable(true));
    loadPagefind().catch(() => setUnavailable(true));
  }, []);

  // ⌘K / Ctrl+K from anywhere on the page.
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close on a click outside the box and its list.
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // The list is fixed under the box, its right edge on the box's right edge,
  // never wider than the viewport less a 16px gutter.
  const place = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const gutter = 16;
    const right = Math.max(gutter, window.innerWidth - rect.right);
    const width = Math.min(640, window.innerWidth - right - gutter);
    setPanelStyle({ top: rect.bottom + 8, right, width });
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, place]);

  // Full-text results, debounced; a late answer to an older query is dropped.
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setPages([]);
      return undefined;
    }
    let stale = false;
    const timer = setTimeout(async () => {
      try {
        const pf = await loadPagefind();
        const search = await pf.search(q);
        const data = await Promise.all(search.results.slice(0, MAX_PAGES).map((r) => r.data()));
        if (!stale)
          setPages(
            data.map((d) => ({
              url: d.url,
              title: d.meta?.title ?? d.url,
              page: d.meta?.page,
              excerpt: d.excerpt,
            }))
          );
      } catch {
        if (!stale) setUnavailable(true);
      }
    }, DEBOUNCE_MS);
    return () => {
      stale = true;
      clearTimeout(timer);
    };
  }, [query]);

  const definitions = useMemo(() => (symbols ? rankSymbols(symbols, query) : []), [symbols, query]);
  const sections = useMemo(() => {
    const shown = new Set(definitions.map((d) => d.url));
    return pages.filter((p) => !shown.has(p.url));
  }, [definitions, pages]);
  const options = useMemo(
    () => [
      ...definitions.map((d) => ({ ...d, group: 'definitions' })),
      ...sections.map((s) => ({ ...s, kind: 'section', group: 'sections' })),
    ],
    [definitions, sections]
  );

  useEffect(() => setActive(0), [query]);

  const go = (option) => {
    if (!option) return;
    setOpen(false);
    inputRef.current?.blur();
    history.push(option.url);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (options.length === 0) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive((a) => (a + step + options.length) % options.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // The Enter that confirms an IME composition is not a request to go.
      if (event.nativeEvent.isComposing || event.keyCode === 229) return;
      go(options[active]);
    } else if (event.key === 'Escape') {
      if (open && query) setOpen(false);
      else {
        setQuery('');
        inputRef.current?.blur();
      }
    }
  };

  const showList = open && query.trim() !== '';
  const optionId = (i) => `${id}-option-${i}`;
  const hasResults = options.length > 0;

  const renderOption = (option, i) => (
    <li
      key={`${option.group}-${option.url}`}
      id={optionId(i)}
      role="option"
      aria-selected={i === active}
      className={styles.option}
      onPointerMove={() => setActive(i)}
    >
      <a
        href={option.url}
        tabIndex={-1}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          go(option);
        }}
      >
        <span className={styles.optionTitle}>
          {option.kind === 'section' ? option.title : <code>{option.title}</code>}
          {option.kind !== 'section' && <span className={styles.optionMeta}>{option.subtitle}</span>}
          {option.kind === 'section' && option.page && option.page !== option.title && (
            <span className={styles.optionMeta}>{option.page}</span>
          )}
        </span>
        {option.kind === 'section' ? (
          option.excerpt && <Excerpt html={option.excerpt} />
        ) : (
          option.summary && <Summary text={option.summary} />
        )}
      </a>
    </li>
  );

  return (
    <div ref={containerRef} className={`navbar__search ${styles.search}`}>
      <input
        ref={inputRef}
        type="search"
        className="navbar__search-input"
        placeholder="Search"
        aria-label="Search the documentation"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList && hasResults ? optionId(active) : undefined}
        autoComplete="off"
        spellCheck={false}
        value={query}
        onFocus={() => {
          warmUp();
          setOpen(true);
        }}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      {!query && (
        <span className={styles.shortcut} aria-hidden="true">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      )}

      <div className={styles.panel} style={panelStyle} hidden={!showList}>
        <ul id={listId} role="listbox" aria-label="Search results" className={styles.list}>
          {definitions.length > 0 && (
            <li role="presentation" className={styles.groupLabel}>
              Definitions
            </li>
          )}
          {options.filter((o) => o.group === 'definitions').map((o) => renderOption(o, options.indexOf(o)))}
          {sections.length > 0 && (
            <li role="presentation" className={styles.groupLabel}>
              Pages
            </li>
          )}
          {options.filter((o) => o.group === 'sections').map((o) => renderOption(o, options.indexOf(o)))}
        </ul>
        {!hasResults && !unavailable && <p className={styles.note}>No results for “{query.trim()}”</p>}
        {unavailable &&
          (process.env.NODE_ENV === 'production' ? (
            <p className={styles.note}>Search is not available right now.</p>
          ) : (
            <p className={styles.note}>
              The dev server uses the search index of the last production build, and there is none. Run{' '}
              <code>npm run stage:epsil</code> once, then restart <code>npm run start:epsil</code>.
            </p>
          ))}
      </div>

      <span className={styles.visuallyHidden} role="status" aria-live="polite">
        {showList ? (hasResults ? `${options.length} results` : 'No results') : ''}
      </span>
    </div>
  );
}
