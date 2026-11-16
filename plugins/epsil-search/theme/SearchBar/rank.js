// Ranks the symbol table of the epsil.dev search (`/search/symbols.json`,
// written by ../../build-index.mjs) for a query.
//
// The tiers follow `engine.searchDefinitions()` in the compute-engine repo
// (src/compute-engine/engine-declarations.ts), so the site and `epsil doc`
// agree on what a name means:
//
//   0  exact name (MathJSON or Epsil spelling), or an alias term
//   1  a name starts with the query
//   2  exact LaTeX command or curated keyword
//   3  a name contains the query
//   4  a LaTeX command contains the query
//   5  the summary or a keyword contains the query (3 characters or more)
//
// A query of several words matches a symbol only when every word does, so
// "type alias" does not return `Type` for its first word. Of those, only
// tiers 0 to 2 are shown for a one-word query: a name that merely contains
// the query is noise next to the full-text results.

const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ');

function tierOfSymbol(symbol, probe) {
  const names = symbol._names;
  if (names.includes(probe)) return 0;
  if (names.some((n) => n.startsWith(probe))) return 1;
  if (symbol._latex.includes(probe) || symbol._keywords.includes(probe)) return 2;
  if (names.some((n) => n.includes(probe))) return 3;
  if (symbol._latex.some((t) => t.includes(probe))) return 4;
  if (probe.length >= 3 && (symbol._summary.includes(probe) || symbol._keywords.some((k) => k.includes(probe))))
    return 5;
  return undefined;
}

/** Lower-case copies of the matched fields, computed once per symbol. */
export function prepareSymbols(data) {
  for (const s of data.symbols) {
    s._names = [s.id, s.epsil].filter(Boolean).map((x) => x.toLowerCase());
    s._latex = (s.latex ?? []).map((x) => x.toLowerCase());
    s._keywords = (s.keywords ?? []).map((x) => x.toLowerCase());
    s._summary = (s.summary ?? '').toLowerCase();
  }
  for (const a of data.aliases) a._terms = a.terms.map((t) => t.toLowerCase());
  return data;
}

/**
 * The entries to show before the full-text results:
 * [{ kind: 'alias' | 'symbol', title, subtitle, summary, url }].
 */
// A name written as a call or a method, as people paste it from code:
// `.solve()`, `solve(`, `ce.parse`, `sin(x)`. Gives the bare name.
const CALL = /^(?:ce\.|\.)?([A-Za-z_]\w*)\s*(?:\(.*)?$/s;

export function rankSymbols(data, query, limit = 4) {
  const trimmed = query.trim();
  const call = /[(.]/.test(trimmed) ? CALL.exec(trimmed) : null;
  const phrase = normalize(call ? call[1] : query);
  if (!phrase) return [];
  const tokens = [...new Set(phrase.split(' '))];
  const probes = [...new Set([...tokens, ...(tokens.length > 1 ? [phrase] : [])])];

  const ranked = [];
  for (const a of data.aliases) {
    // An alias matches as a whole: `if`, `|>`, `type alias`.
    let tier;
    if (a._terms.includes(phrase)) tier = 0;
    else if (phrase.length >= 3 && a._terms.some((t) => t.startsWith(phrase))) tier = 1;
    if (tier !== undefined) ranked.push({ tier, matched: tokens.length, key: a.title, entry: a, alias: true });
  }
  for (const s of data.symbols) {
    const matched = tokens.filter((t) => tierOfSymbol(s, t) !== undefined).length;
    if (matched < tokens.length) continue;
    let tier = Infinity;
    for (const p of probes) {
      const t = tierOfSymbol(s, p);
      if (t !== undefined && t < tier) tier = t;
    }
    if (tokens.length === 1 ? tier > 2 : tier > 5) continue;
    ranked.push({ tier, matched, key: s.id, entry: s, alias: false });
  }

  // An alias before a library name of the same tier: `if` the keyword before
  // `If` the MathJSON function.
  ranked.sort(
    (a, b) =>
      a.tier - b.tier ||
      Number(b.alias) - Number(a.alias) ||
      a.key.length - b.key.length ||
      (a.key < b.key ? -1 : a.key > b.key ? 1 : 0)
  );

  const seen = new Set();
  const out = [];
  for (const { entry, alias } of ranked) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    out.push(
      alias
        ? { kind: 'alias', title: entry.title, subtitle: 'Language', summary: entry.summary, url: entry.url }
        : {
            kind: 'symbol',
            title: entry.epsil ?? entry.id,
            subtitle: entry.epsil && entry.epsil !== entry.id ? `${entry.library} · MathJSON ${entry.id}` : entry.library,
            summary: entry.summary,
            url: entry.url,
          }
    );
    if (out.length === limit) break;
  }
  return out;
}
