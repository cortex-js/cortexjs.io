// Configuration file for grok
// the tool that generates the documentation from TypeScript declaration files

const searchPlugin = function () {
  // prettier-ignore
  const STOP_WORDS = [
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
        "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", 
        "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", 
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that", 
        "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", 
        "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", 
        "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", 
        "at", "by", "for", "with", "about", "against", "between", "into", 
        "through", "during", "before", "after", "above", "below", "to", "from", 
        "up", "down", "in", "out", "on", "off", "over", "under", "again", 
        "further", "then", "once", "here", "there", "when", "where", "why", 
        "how", "all", "any", "both", "each", "few", "more", "most", "other", 
        "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", 
        "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"   
    ];

  function debounce(fn, wait) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        fn();
      }, wait);
    };
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function termsToRegExp(terms) {
    return new RegExp(
      '(' +
        terms
          .map((x) => {
            if (!/^".*"$/.test(x)) return escapeRegExp(x);
            return '\\b' + escapeRegExp(x).substring(1, x.length - 1) + '\\b';
          })
          .join('|') +
        ')',
      'gi'
    );
  }

  // Return a score: 0 if no match, >0 if a match anywhere in element, >>0
  // if a match in header, >>>0 if a complete match in header
  function findInElementRecursive(el, termsRE) {
    // Text node
    if (el.nodeType === 3) return termsRE.test(el.textContent) ? 1 : 0;

    if (el.nodeType === 1) {
      // Element
      const tag = el.nodeName.toLowerCase();
      if (
        /^(script|noscript|style|textarea|annotation|annotation-xml)$/.test(tag)
      ) {
        return 0;
      }

      if (el.classList.contains('sr-only')) return 0;

      let score = 0;
      for (const child of el.childNodes) {
        score = Math.max(score, findInElementRecursive(child, termsRE));
      }
      if (el.classList.contains('head')) {
        score *= 20;
      }
      return score;
    }
    return 0;
  }

  function findInElement(el, terms) {
    if (!terms || terms.length === 0) return 0;
    return findInElementRecursive(el, termsToRegExp(terms));
  }

  // Recursively search el for terms.
  // Return a tuple
  // [
  //      count of terms found,
  //      markup with <mark> inserted for matching terms
  // ]
  function markInElementRecursive(el, termsRE) {
    if (el.nodeType === 1) {
      // Element
      const tag = el.nodeName.toLowerCase();
      if (
        !/^(script|noscript|style|textarea|annotation|annotation-xml)$/.test(
          tag
        ) &&
        !el.classList.contains('sr-only')
      ) {
        let score = 0;
        let result = '';
        for (const child of el.childNodes) {
          const [childScore, childContent] = markInElementRecursive(
            child,
            termsRE
          );
          score += childScore;
          result += childContent;
        }

        let outerHtml = '<' + tag + ' ';
        for (const attr of el.attributes) {
          if (attr.localName !== 'id') {
            outerHtml += attr.localName + '="' + attr.value + '"  ';
          }
        }
        outerHtml += '>' + result + '</' + tag + '>';

        return [score, outerHtml];
      }
    } else if (el.nodeType === 3) {
      // Text
      let matchCount = 0;
      let result = el.textContent;
      // termsRE.forEach((term) => {
      result = result.replace(termsRE, (match) => {
        matchCount += 1;
        return '<mark>' + match + '</mark>';
      });
      // });
      result = result.replace(/<mark>|<\/mark>|\<|\>|&/gi, (match) => {
        if (match === '<') return '&lt;';
        if (match === '>') return '&gt;';
        if (match === '&') return '&amp;';
        return match;
      });

      return [matchCount, result];
    }
    return [0, el.outerHTML];
  }

  function markInElement(el, terms) {
    const [count, result] = markInElementRecursive(el, termsToRegExp(terms));
    if (count > 0) return result;
    return '';
  }

  const NO_MATCH = 0;
  const PARTIAL_MATCH = 1; // Match a substring of target
  const INITIAL_MATCH = 2; // Match the start of target
  const FULL_MATCH = 3; // Completely match target

  // Return how closely 'str' matches 'target'.
  // If 'target' is in quotes, the match is either full or none.
  function match(str, target) {
    if (/^".*"$/.test(target)) {
      if (target.substring(1, target.length - 1) === str) {
        return FULL_MATCH;
      } else {
        return NO_MATCH;
      }
    }
    if (str === target) return FULL_MATCH;
    if (str.startsWith(target)) return INITIAL_MATCH;
    if (str.indexOf(target) >= 0) return PARTIAL_MATCH;

    return NO_MATCH;
  }

  const updateResults = debounce(() => {
    const text = document.getElementById('search-box').value.trim();
    if (!text) {
      document.getElementById('all-content').classList.remove('hidden');
      document.getElementById('search-result-none').classList.add('hidden');
      document.getElementById('search-result').classList.add('hidden');
      document.getElementById('search-result').innerHTML = '';

      // Drop the anchor/query (if any)
      window.history.replaceState(
        null,
        null,
        window.location.origin + window.location.pathname
      );
    } else {
      window.history.replaceState(
        null,
        null,
        window.location.origin +
          window.location.pathname +
          '?q=' +
          encodeURIComponent(text)
      );

      document.getElementById('all-content').classList.add('hidden');

      let query = text.split(' ').map((x) => x.trim().toLowerCase());
      query = [...new Set(query)];
      query = query.filter((x) => !STOP_WORDS.includes(x));

      const mandatory = query
        .filter((x) => /^[+]+/.test(x))
        .map((x) => x.slice(1))
        .filter((x) => !!x);
      const prohibited = query
        .filter((x) => /^[-]+/.test(x))
        .map((x) => x.slice(1))
        .filter((x) => !!x);
      const optional = query.filter((x) => /^[^-+]/.test(x));

      let searchResults = [];
      document
        .getElementById('all-content')
        .querySelectorAll('[data-keywords]')
        .forEach((el) => {
          const keywords = el
            .getAttribute('data-keywords')
            .split(',')
            .map((x) => x.trim());

          const hasProhibitedMatches = prohibited.some(
            (q) =>
              keywords.some((keyword) => match(keyword, q) > 0) ||
              findInElement(el, prohibited) > 0
          );

          if (!hasProhibitedMatches) {
            let score = findInElement(el, mandatory);
            if (
              mandatory.every((q) =>
                keywords.some((keyword) => match(keyword, q) > 0)
              )
            ) {
              score += mandatory.length;
            }
            if (score > 0 || mandatory.length === 0) {
              if (optional.length > 0) {
                let hasInitialMatch = false;
                let hasPartialMatch = false;
                optional.forEach((q) => {
                  keywords.forEach((keyword) => {
                    let m = match(keyword, q);
                    if (m === FULL_MATCH) {
                      score += 10;
                    } else if (m === INITIAL_MATCH) {
                      score += 5;
                    } else if (m === PARTIAL_MATCH) {
                      score += 2;
                    }
                  });
                  score += findInElement(el, optional);
                });
              }
              if (score > 0) {
                searchResults.push([
                  score,
                  markInElement(el, [...optional, ...mandatory]),
                ]);
              }
            }
          }
        });

      if (searchResults.length === 0) {
        noResultsFound();
      } else {
        document.getElementById('search-result-none').classList.add('hidden');
        const results = document.getElementById('search-result');
        results.innerHTML = searchResults
          .sort((a, b) => b[0] - a[0])
          .map((x) => x[1])
          .join('');
        results.classList.remove('hidden');
      }
    }
  }, 500);

  function noResultsFound() {
    document.getElementById('all-content').classList.remove('hidden');
    const results = document.getElementById('search-result');
    results.classList.add('hidden');
    results.innerHTML = '';
    document.getElementById('search-result-none').classList.remove('hidden');
  }

  function search() {
    const empty =
      document.getElementById('search-box').value.trim().length === 0;
    if (empty) {
      document.getElementById('clear-button').classList.add('hidden');
    } else {
      document.getElementById('clear-button').classList.remove('hidden');
    }
    updateResults();
  }

  window.addEventListener('load', () => {
    document.getElementById('clear-button').addEventListener('click', () => {
      document.getElementById('search-box').value = '';
      document.getElementById('clear-button').classList.add('hidden');
      document.getElementById('all-content').classList.remove('hidden');
      document.getElementById('search-result').classList.add('hidden');
      document.getElementById('search-result').innerHTML = '';
      document.getElementById('search-result-none').classList.add('hidden');
      document.getElementById('search-box').focus();
    });

    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      document.getElementById('search-box').value = params.get('q') || '';
      search();
    }
  });

  window.addEventListener(
    'hashchange',
    () => {
      document.getElementById('all-content').classList.remove('hidden');
      document.getElementById('search-result').classList.add('hidden');
      document.getElementById('search-result').innerHTML = '';
      document.getElementById('search-box').value = '';
      document.getElementById('clear-button').classList.add('hidden');
      const hash = window.location.hash;
      const anchor = document.getElementById(hash.slice(1));
      if (anchor) {
        setTimeout(() => {
          let motionPref = matchMedia('(prefers-reduced-motion)');
          if (motionPref.matches) {
            anchor.scrollIntoView({
              block: 'start',
              behavior: 'auto',
            });
          } else {
            anchor.scrollIntoView({
              block: 'start',
              behavior: 'smooth',
            });
          }
        }, 100);
      }
      window.history.replaceState(
        null,
        null,
        window.location.origin + window.location.pathname + hash
      );
    },
    false
  );

  window.addEventListener('keydown', (evt) => {
    if (document.activeElement === document.getElementById('search-box'))
      return;

    if ((evt.metaKey || evt.ctrlKey) && !evt.shiftKey && evt.code === 'KeyF') {
      document.getElementById('search-box').focus();
      evt.preventDefault();
    }
  });

  return { search };
};

module.exports = {
  tutorialPath: '../../guides/',
  // verbose: false,
  keywordSynonyms: {
    convert: ['converts', 'converted', 'converting', 'conversion'],
    render: ['renders', 'rendered', 'rendering'],
    create: ['creates', 'created', 'creating', 'creation'],
  },
  // head:
  // stylesheets:
  //     - https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap
  documentTemplate: (substitutions) => `---
permalink: "/docs/${substitutions.sdkName}/"
title: "${
    { 'mathlive': 'MathLive', 'compute-engine': 'Compute Engine' }[
      substitutions.sdkName
    ] ?? substitutions.sdkName
  }"
chapter: ${substitutions.sdkName}
read_time: false
layout: "sdk-documentation-layout"
sidebar:
    - nav: "universal"
# toc: true
---
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
<defs>
    <symbol id='link' viewBox="0 0 512 512" >
        <path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z">
        </path>
    </symbol>
    <symbol id='external-link' viewBox="0 0 512 512">
      <path fill="currentColor" d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z"/>
    </symbol>

    <symbol  id='highlighting-mark-1' viewBox="0 0 1300 369" preserveAspectRatio="none">
        <path fill="currentColor" d="M587 53h1c1 0 0 0 0 0h-1zM82 114h0c-1 0-1 0 0 0zm-3 0v-1l1 1h-1zm6 1h1-1zm9 0h1v1l-1-1zm1129 176l1-1v1h-1zm-3 0h3a385 385 0 00-3 0zm-4 4h1l1 1h-1l-1-1zm2 5v-1l1 1h-1zm-5-1h2l-1 1-1-1zM167 309a356 356 0 00-38-1 429 429 0 001-1 93 93 0 0122 1h11a132 132 0 0012 0l-8 1zm43 0h2l-1 1-1-1zm-12 1c-2-1 0-2 3-1a143 143 0 008 0l-11 1zm-10 0l-5-1h-5 15l-2 1h-3zm33 0h-7a159 159 0 0121 0h-14zm23 1l-7-1h3a343 343 0 004 1zM111 124l-1-1v1h1zm1100 1c1-1-3-1-5-1-3 0-3 0-1 1h6zM71 139l-1-1c-1 0-2 0-1 1h2zm18 14l-2-1h-2l1 1h3zm10 103h-2c-1 0-1 0 0 0h2zm-5 9l-4-1-1 1h5zm1100 25h-1c-2 0-2 1 0 1l1-1zm-4 0h-2l1 1 1-1zm-3 0h-1c-2 0-2 1 0 1 1 0 2 0 1-1zm3 4h0s1 0 0 0zm-440 19l-1-1-1 1h2zm-136 2a834 834 0 00131-3l-50 1a2403 2403 0 01-105 0c-3 2-4 3 0 2h24zm99 4l-54-1a4602 4602 0 01-147-3h-16a15444 15444 0 01-234-5h4a505 505 0 0032-2l-15-1a806 806 0 01-61-2 734 734 0 00-46-1 591 591 0 01-85-10 297 297 0 0121 1l-6-3-4-1-3-1h1l-7-1-3-1 2-1h2l2-1h28a146 146 0 01-19-2 88 88 0 01-19-3c-3 0-5-1-5-2l1-1 4-2v-1h4c2 0 2-1-3-2l-7-2-2-1-1-1v-1c1-2 3-3 6-3h4c0-1-3-3-6-3l1-1c2 0 2-1 1-3-1-1-1-1 1-1h2l5-1h2-8l-5-1h-1l-2-1 1-1a745 745 0 0011-2c-5 0-7-1-8-2l-1-1c-2-1-2-2-1-2h8c9 0 15-1 14-2l-11-1-9-2h2l-2-2-3-2s-1 0 0 0l-1-1v-1l-1-2c-1-2-1-3 1-3l6-1-1-1c-2 0-2-1 0-1 2-1 2-1 1-2l-2-1-1-1-4-2-5-2-3-1h-2v-1c1-1 0-4-2-7l-2-4-1-2c-1-1-1-3 1-2h5c3 0 6 0 5-1l-2-1c-1 0-1 0 0 0 2-1 1-1-4-2-3-1-6-3-7-6l-1-1h9v-1l2-1h2c2 0 0-2-4-3h-2l-2-1-1-1c0-2 1-2 4-1l4 2 4-1-1-1-2-1-3-2c-6-1-6-1-2-1l5 1h7l3 1v1a129 129 0 0018 3l13 1a96 96 0 00-22-4l-5-1-5-2-6-1-1-1-5-1-2-1-3-2-2-2h-1c-1-1 2-3 4-2l20 2c3 0 1-1-7-3-6-2-10-2-13-2v-4h2l10 1-2-1h-3-2l-2-1-8-2-1-1-1-2h-1l-1-1c-2-1-1-2 4-1l7-1c1-1 5-2 9-1h9l-2-1h-2l-5-1c-5 0-9-2-9-3s-1-2-3-2l-3-2-3-2-1-1 4-1h6l1-1-14-3c-5 0-4-1 2-1l5-1c1 0 1-4-1-5l-2-1h16c1-1-1-1-4-1-4 0-7-1-7-2l-2-2c-2-1-2-1 0-1h4v-1c-1-1 0-1 1-1l4 1h15l12-1h15c4-1 5-2 2-2l-14-1c-1-1 5-1 16-1a257 257 0 0034-1 249 249 0 01-17-1c-9 0-13-1-13-2h-2l-2-2v-1c-1-1-1-1 1-1l3-1 1-1c4 0 5-2 0-2l-1-1c1-1-1-1-5-2l-4-2-3-2c-1-1 3-1 5-2l4-1 5-1c3 1 3 0 5-1l2-1 1-1-9-2c-3 0-4 0-4-2l-2-1c-2 0-3-1-3-2v-3l1-2c-1-2 0-2 2-3l6-2 1-1 1-1c0-1-1-2-3-2l-7-2 1-1c0-2 1-3 3-2v-1-1l1-2s0-1 0 0l-1-1h4l17-1-3-1c-4 0-4 0-3-1h2l19-1 29-2a343 343 0 0031-2h21a767 767 0 0188 1 7076 7076 0 00191 1 2196 2196 0 00173 1 1358 1358 0 01140 1l4-1 8-1a846 846 0 0132 1 4282 4282 0 00182 2 652 652 0 0083 2 4901 4901 0 0049 0h13l-1 1h-3l1 1h2l4 1c3 0 4 0 2 1l-1 1-2 2-1 1h3v1l-10 2 3 1c3 0 4 1 4 4 1 3 0 6-3 7-2 1-2 1-1 2l2 1h2c1 1 0 1-1 1l-1 1 3 1c5 0 4 2 0 2-8 1-7 3 1 3 6-1 7 0 1 1l-8 1-3 1h4l3 1v3c-2 0-2 0-2 2l1 2 2 2 4 1h3c1 1 1 1-1 2l-4 2c-2 0-2 1-1 1 1 1 0 2-1 3-2 0-1 1 2 1l2 1-3 1c-3 0-2 1 1 1a124 124 0 0126 5h7l-8 1c-6-1-7-1-6 1l-1 1c-2-1-3 0-2 1h7l6 1h-1c-4 0-5 0-4 1l9 1 7-1 1 1-2 1-3 1h-4l-1 1-9 1c0 1 7 2 15 2h7l1 3-1 3-1 1-1 1v1l-1 1-2 1h-11l8 1 1 1v3l6 1 5 1h2l1 1c0 1-3 2-5 1l-4 1c-2 2-2 4 1 4 2 1 2 1-2 1s-4 0-5 2v2l2 4c0 4 0 4-2 5l-3 1a176 176 0 00-15 1h5l3 1c5 0 9 0 9 2l2 1c2 0 2 1 2 2l4 1h4l-3 4-2 1h-1l-3 2 1 2c2 2 2 2-3 2l-4 1 2 1 4 1 2 1c1 0 1 0 0 0v3c0 2 3 6 4 6l1 1v3l-1 2c1 1 1 1-1 1s-3 0-3 2l1 2 3 4h-3c-3 0-3 0-3 2v1l-1 1c-1 1-1 1 2 1 2 0 2 0 1 1l-1 2-2 1-3 1-3 1h-7l4 1 4 2 3 1v1 2l-2 1-13 3-10 1-10 1v2h11c10 0 11 1 18 3l7 1c4 0 6 1 3 1a20 20 0 00-4 0l-1 3-1 2h-12c-5 0-6 1-5 2l4 2h8a333 333 0 00-5 2c-1 2 2 2 7 2 4 0 4 1 4 3s-1 2-7 2l-4 1c0 1 2 2 3 1 2 0 2 0 0 1v2h4l3 1v2l-1 4v2l-1 2-4 1h-3l-13 2h-12l9 1h6l-23 1 2 2 12 1h3c-7 0-13 1-13 3l6 1h12l-7 1a117 117 0 00-16 2c-4 0-5 0-4 2l4 3 3 1-3 3c-2 1-2 1-1 3h-1l-2 1 1 1c2 0 1 1-1 2h-13a615 615 0 00-62-3 249 249 0 01-24 0l-19 1-17 1h-39a19797 19797 0 00-180-2h-3l-2 1-3-1c0-1 0-1 0 0h-3-6-9a77 77 0 00-13-1 270 270 0 00-32-1c-1 1-9 3-11 2l-1 1a48 48 0 01-18 2 174 174 0 01-15 1h-2z"/>
    </symbol>

    <symbol id='highlighting-mark-2' viewBox="0 0 1100 737" preserveAspectRatio="none">
        <path fill="currentColor" d="M244 485a1384 1384 0 00-72-5 95 95 0 01-20-3l-6-1h-6l-1-2c-1-3-1-3-6-4a61 61 0 01-12-3c-2-1-2-2 1-4l8-4 6-4-6-2-6-1-8-1-9-1c-7-1-10-1-11-3l-3-3-3-2c-2 1-5-1-6-2-1-2 0-4 1-4l1-1h4l3-1h2l1-1h1l1 1 2-1h1c0-1-1-2-4-1l-4-1a91 91 0 00-7-1c-2 0-2-1-1-2h1l3-1h1 9l2-1h3 1l6-1h5c3 0 2-2-1-4l-3-3h3l3-1c2 1 2 0 3-1l1-4v-1l1-1 1-3h-1l-2-1c1 0 1 0 0 0l-3-1-6-2c-5-3-8-3-20-4l-11-2-13-2-6-1-5-2-7-2 3-2h14l14-1 8 1 8 1h7l3 1 2-1a249 249 0 0035-1l-1-1h-1l-1-1h-1c0 1 0 1 0 0h-1l-2-1v-1l3-2-3-3c0 1 0 0 0 0l-1-1h-1c1-1-1-2-1-1h-1s-2-2-3-1v-1h-1c0 2-1 1-1 0s0-1 0 0l-1 2h-1v-1c1-1 0-1-2-1h-3c1 0 0 0 0 0l-1-1h-1s-1 0 0 0v-2c1-1 2-2 4-1l1 1c-2 0-1 1 0 1s2 0 1-1l1-1-1-1 1-1h1c1 0 1 0 0 0l-1-1 1-2c1 0 0-3-1-2v-1l-1-1c-1 0-1 0 0 0v-1l1-1 1-1c-1 0 0 0 0 0v-1h-1c0 1 0 1 0 0l1-3 1-2-1-1c-1-1-1-1 1-1h1v-1l2-1 1-1v-1c1 0 0 0 0 0h-1l-2-1h-1l-1-1h-1v-1l-1-1c1 0 1 0 0 0h-1l1-1 1-1c0-1 0-2-1-1l-1-1v-2l-2-1 2-1 2 1h3l3-1h4l9-1h8v-4l-1-2-1-1v-1l-1-1c-2 0-3-1-3-2h-1l-1-1-1-1v-2 1l2 1h1v-1l-2-1 1-1v-1l1-1 1-1-1-1v1h-1-1v2c1 0 0 0 0 0l-1-2 1-1 1-2h2l1-1v2l2 1c2 0 3-1 1-1s-2 0 0-1h1l-1-1c-2 0-2-1-1-1h1v1l1-1 1-1-1-1h-1-1v-1l2-1v-2h1l1-1h1v1 1l1-3c-1-1 0-2 3-2h2l3-1h6l2-1c1 0 1-1 0 0l-1-2-2-2-1-1-1-1h1l1 1c1 0 1 0 0 0v-2h1c0 1 0 1 0 0 0-2-1-3-2-3h1l1-1h-1c0-1 0-2 2-3v-2h2v-3-3l-1-1h-1c1-1 2-2 1-3v1h-1v-1h3s0-1 0 0l1 1v-1-1h2l2-1h2l1-1 5-1 3-1 1-1h14l3-1v-2l-10-1-6-1-2-1h-2l-2-1 1-1v-1h11a169 169 0 0113-1l4-1 2-2c1-2 3-3 3-2h20l12 1a1963 1963 0 0170 4h14a181 181 0 0032-1l10-1a720 720 0 0034-1 692 692 0 0155 0h5l6 1 1-1a558 558 0 0061 1 231 231 0 0119 1h5l5-1h6l2 1h6l14-1a376 376 0 0026 0l11-1h14a369 369 0 0064-3l12 1 19 1a300 300 0 0136 2 1121 1121 0 0177 3 773 773 0 0081 5l7 1 9 1 4 1a103 103 0 0118 3l5 1 1 1h1l14 2 2 2 8 4 11 1 1 1h1l1 1 5 3 7 2c4 0 5 1 4 3l-4 2-2 1h-2l-7 2 8 3a1050 1050 0 0020 2c1 2-7 7-13 10l-4 2c-1 3 0 4 3 6l2 2 1 1c1 2 1 3-1 4l-4 3c-2 2-3 2-5 2l-4 2v1h-1l-1 2s0 1 0 0l2 2c-1 1 0 1 0 0l-1 1-4 1-3 1h-1-1c-1 1 0 3 3 5l3 2 3 2c4 2 5 5 1 5-2 1-3 3-3 5v1c-1 0-2 1-2 3l-4 2-3 1-3 3-2 1-4 2c-3 0-4 1-4 2 0 2 2 4 3 4l4 4-6 2h-6l-13 2-1 2v3l-1 8-3 1-3 1-1 1v1h-1-4c-2 1-1 3 2 3l5 2h-9c-9 0-10 1-11 5l-2 4-2 5-2 1-2 1-1 1h-1l-2 2c-4 2-4 4-2 5s2 1 1 3 1 3 7 4c5 2 7 3 5 4-1 1-8 0-20-2-5-1-7-1-8 1s-2 3-6 3c-3 0-6 1-6 3l5 2c2 0 5 1 4 2l-2 1h-1l-4 2c0 2-3 3-4 3l-7 1 4 3c0-1 0 0 0 0v3c1 1 0 2-4 2l-6 1a247 247 0 01-20 3l-6 1-8 1h-22a1139 1139 0 01-73-4 250 250 0 01-27 1 460 460 0 01-62 2 498 498 0 00-62 1 363 363 0 00-59 6 220 220 0 00-24 2 183 183 0 01-27 2h-11a244 244 0 01-27 1 309 309 0 01-39 0 202 202 0 01-25 1 710 710 0 01-52 1 177 177 0 00-16 1 98 98 0 00-15 0l-7 1a2477 2477 0 01-73-2zm-108-68l-1-1-4-1h-4a1478 1478 0 019 2zm13-29h-1v1l1-1zm-27-16v-1h-1l1 1zm7-17h-1l1 1v-1zm4-7v1s0 1 0 0v-1zm-4-3h-1l1 1v-1zm22-24h-1 1zm0-2l-2-3h1v-1l-2 1v1l-1 1 1 1h1l1 1 1-1zm-3-1v-1l1 1h-1zm9-11c0-1 0-1 0 0h-1c1 2 1 1 1 0zm-2 0c0-1 0-2-1-1v1h1zm17-18v-1h-1l1 1zM83 428v-1l1 1-1 1v-1zm22-43h1-1zm8 0c-1 0-1 0 0 0l2-1h1v1h-1-2zm-3-1h1v1l-1-1zm14-8l1 1h-1v-1zm1-9c1-1 1-1 0 0v1-1zm3-19l1-1c2 0 2 0 1 1h-2zm12-36h1v1l-1-1zm2-2h1l-1 1v-1zm9-6l1-1v1h-1zm20-29l-1-1 1 1c1 0 1 0 0 0z"/>
    </symbol>

    <symbol id='highlighting-mark-3' viewBox="0 0 1100 767" preserveAspectRatio="none">
        <path fill="currentColor" d="M311 516l-1-1-1-2-2-2s-1 0 0 0v-3-1l-1-1h1l1-1v-2-1c-1-1-2 0-2 1h-1v-1l-2-1h2l2-2h1l2-1 4-3h4l7-2h3l2-1 4-2 5-1 1-1v-3l3-1h7l5-1 7-2a383 383 0 00-42 0 48 48 0 00-4-2h-3-16a200 200 0 00-63 9l-6 1-4 1-2 1c1 1 0 1-10 2h-1l-1 1-2 2-8 1h-7l-3 1h-4l-2-1c-3-1-17 0-18 2v2h-1-1 5l4-1a239 239 0 004 0l3 1h1l-1 1-8 1h-6-4l-1-1-5 1a1080 1080 0 00-25-4l-2-2 3-1 6-1h1-2c-2-2-5-2-9-3l-9-1a65 65 0 00-22 0H87l-7 1-15 1c-4 1-6 0-8-1-1 0-1-1 1-2l7-2 14-2 2-2h-1l-1-1h1v-1-1l2-2 2-1h-5a141 141 0 00-12-1l1-1 1-1h1l6-2 6-1 4-1 9-2h-2a225 225 0 00-2-2l3-2 2-1 2-1-2-1-5-1H79l-7 1 1-1 1-2h-2-1l1-1c2-1 2-1-2-2-3-1-3-2-1-3l19-2h8l-2-2-2-1c-2 0-2-1-1-2 0-2 5-4 7-4l1-1h-1l-2-3c0-1-9 0-9 2l-16 2-2-1h2l10-2c9-2 11-3 5-3l-4-1h-6a162 162 0 00-15 2c0-1 2-3 4-3a490 490 0 01-7 0h-2l2-2 2-3h-3c-5-1-7-2-7-4l7-2 7-1 8-1 7-1 15-3-2-1-3-1 11-4 5-2 4-1c4-1 4-2-1-4l-1-1 4-2 1-1h-5l-3-1H94c-5 1-8 1-8-1l5-4 5-3c-1-1 0-1 4-3 5-1 9-4 9-6-1-1 1-1 10-3l9-1 4-2 14-3 2-1h3c1-1 1-1-1-1l-8-1-2-1c-1 1-1 0 0 0l2-1h4l2 1 1-1 4 1 4 1h2l-1-1-1-1-1-1 11-2 9-1-1-1-1-1 1-1c2 0 2-1 1-1h-6c-9 1-12 0-14-1h-2v-2c0-1-1-2-6-2-4 0-4 0-3-1l14-2 5-1c1-2 2-2 3-1l3 1 22-2c2 0 2-1 1-2v-3-1c-1-2 1-2 9-2h9l12-2 4-1h2l-2-1h-9a250 250 0 01-24 1 180 180 0 01-21 2l-2 1-1 1h-2c-1-1-1-1 0 0 1 0 1 0 0 0l-1 1h-2l-1-1-1 1h-1l-2-1-2 1h-2l-5-2c0-1 0-1 0 0l-1-1 2-4h1v-1l5-1h3c0 1 0 1 0 0l-2 1v1c1-1 1-1 0 0l1 2c1 0 2 0 1-1h7l1-2c-1 0 0 0 0 0l1-1 2-1 2-1h1v-1h4c0 1 0 1 0 0v-1l-2-2c1-1 2-2 5-2l4-2h2l7-1v-1h-19l-1-1-1-1-1-2v-1h2c-2-1-1-2 1-2l2 1h4l3-1c3 0 3-1 1-1l-2-1 1-1 1-1c1-1 3-2 4-1l1-1h2l4-1 2-1-10-1h-10-1a77 77 0 01-19 0l-1 1h-2-2l1-1 1-1h-2 9l4-1 4 1v-1l6-1 8-1 5-1 5-1h-5a845 845 0 01-37 3h-4c1 1 0 1-2 1l-7 1-14 1v-1l1-1 4-1 3-1a511 511 0 01106-13 141 141 0 0022-3h8c7-1 9-2 10-1s2 0 7-1a17080 17080 0 0194-16h9l1 2h2l1 1c-1 1 0 2 1 1l-1 2-3 1-2 2c1 1 0 1 36-4a169 169 0 0121-1 376 376 0 0136-3 170 170 0 0120 0l16 1 13-1 16-1h55a247 247 0 0025-1l5-1a1007 1007 0 0065 5 892 892 0 0094 4 223 223 0 0132 2l16 1a280 280 0 0141 3 42 42 0 018 2h4l6 1 7 1 1 1v-1h3l1 1c0 1 0 2-1 0-1-1-2-1-2 1h-5l-16-1a733 733 0 00-72-2h5a208 208 0 0029 3 189 189 0 0023 2 524 524 0 00-6 0 69 69 0 01-22-1h-1l-2 1h-20c3 1-1 2-8 1h-13a162 162 0 00-28-2 218 218 0 00-24-2 616 616 0 00-33 0l-9 1h-2l4 1h6l9 1a444 444 0 0042 3 1141 1141 0 01130 12 705 705 0 0144 5 559 559 0 00-60 2 505 505 0 0162 9h-4c-7 0-5 1 2 2a251 251 0 0030 3l7 1 5 1 4 1 5 1 5 1 6 1c8 0 13 1 13 2h-5v1h2c2 1 2 1 0 2-1 1 1 2 7 3 5 1 8 2 5 2l5 1 4 1 4 1c6 1 6 2 0 2l-4 1-6 1c-7-1-8-1-9 1l-1 1 4 1 4 1 4 1c3 0 3 1-2 1h-4l-6 1-4 1h1l4 1 7 1h5l1 1h2l-3 1-9 2 7 1 5 2h8l-3 3v-1l-2 1h-6c-7 0-9 0-8 2 2 2 11 5 17 5 4 0 5 1 5 2l-4 1-6-1a105 105 0 00-24 0l2 2a604 604 0 0129 4c7 1 10 1 9 3h-1l-1 1h-1l-1 1c-2 0-3 1-2 3v2l2 1 1 1v1h-14l-1 2c-1 0 0 3 2 4v1c-1 0-1 0 0 0 1 1-1 1-6 1-3 0-5 1-5 2l-1 1h-3v1l2 1 5 2 6 2 8 1h1l1 1c0 1-3 3-5 3h-1l-9 1a105 105 0 00-22 0 214 214 0 0114 4c-2 1-2 2 2 4l4 2 1 1-1 2h-1l-1 1-4 2h-2-5l-6 1-9 1h-3-1c-2 0-3 1-3 2h1l1 1 5 2c7 1 12 3 11 4l-1 1c0-1-1-1 0 0l-2 2c-1 1-1 2-2 1h-1l-2 1-5 1-4 1 1 1 2 2 2 1c2 0 2 0 1 2v2h-1-1l-2 1-1 1h1c2 0 3 2 2 2h-1l-2 1-4 2-3 1c-1 1-1 1-7-1-4-1-6-1-7 1h-15l4 1c6 1 6 2 5 2-1 1 6 4 13 4l4 1-1 2v4l-12-2c-4-1-13-2-14-1v1l9 3 3 2h-4l-4 1c-1 0-1 0 0 0l-9-1-10-2-1 1v1c-1 1 6 2 18 4l5 1 4 1c2 0 6 1 5 2h-7l-7 1 3 1c2 1 2 1 1 2h-8 2c3 1 2 2-1 2l-6 1h-3a252 252 0 00-40 0 214 214 0 00-42-4 330 330 0 00-31-4 430 430 0 00-54-2 396 396 0 01-36-1h-14-1-4l-3-1h-3c-3-1-6-2-8-1-1 0-4 0-3-1h-6l-11-2-1 1-1 1-2-1h-1l-1-1-1 1c1 0 1 0 0 0h-6l-34-1a494 494 0 01-29 0l-25 1c-4 0-9 3-6 3l-1 1-2 2h-13a1630 1630 0 01-52 2c-1 1-6 2-7 1l-5 1a13 13 0 01-5 0h-6l-8 1h-3l-2 1h-2l-4-1a213 213 0 01-25 2h-3v1l3 1h2v1h-5l-1 1a575 575 0 00-38 2l-24 2c-14 1-25 3-27 5l-3 2a252 252 0 00-38 3v-1zm0-5h-1l-1 1h1l1-1zm93-8c2-1 2-1-3-1l-13 2 16-1zm-257-7h-1l1 1v-1zm40-2h-1-1l1 1 1-1zm-26-3h-2c-1 1-1 1 1 1l1-1zm313 0c2 0 2 0 1-1l-29 2a247 247 0 0028-1zm19-1l-3-1-3 1h6zm-353 0c2 0 2 0 0-1l-2 1h2zm361-1h-5l2 1 3-1zm432-6l-3-1c-2 0-2 0-1 1h4zm-851-8h-1 1zm6-1l1-1-3 1h2zm8 0l1-1-3-1-2 1 2 1h2zm897-10h-1c-1 0-1 0 0 0h1zm-884-22h-1 1c1 0 1 0 0 0zm-4-2h-4c-2 1-1 2 1 1l3-1zm10 1h-2 2zm-4-1h-3 3zm920-64v-1l-1 1h1zm4-11h-1l1 1v-1zm-8-6h-1 1zm-25-5l-5-1-6-1h-1l5 1a96 96 0 017 1zm-806-5c1 0 1 0 0 0h-2 2zm802-3l-6-1h-7l6 1a155 155 0 017 0zm-833-7h-1l1 1v-1zm74-1h-1l1 1v-1zm-85-1h-2 2zm2 0l-1-1v1h1zm31-4l5-1a45 45 0 008-2l6-1c3-2 3-3 0-3h-2c0-1 3-2 7-1l8-2-6-1-6 1-5 2c-1 0-1 0 0 0l1 1c0-1 0 0 0 0l-5 1-2 1-2 1c0-1 0-1 0 0h-1l-3 1h-3c0-1 0-1 0 0l-6 2-1 1h7zm23-20h-1c-1 1-1 1 0 0h1zm667-2l-2-1h-1l3 1zm-666-4h2-5 3zm661 0h-1l1 1v-1zm3 0h-1v1l1-1zm-654-1h-1l1 1v-1zm-62-1h-1v1l1-1zm14-1l-1 1h1v-1zm6 0v-1l-1 1v1l1-1zm723-19h-1v1l1-1zm-509-11v-1l-1 1h1zM131 511v-1c1 0 0 0 0 0-2-1 0-2 2-2s2 0 1 1v1l2-1h7l1 3-1-1c1-1 0-1 0 0l-6 1-6-1zm-7-1v-2l1 2h-1zm11-5l1-1h2c2 0 2 0 1 1-1 2-3 2-4 0zm335-4h0zm6 0l1-1v1h-1zm-296-2l1-1h1v1h-2zm623-5h2l-1 1-1-1zm-9 0h1-1zm-548-1c0-1 1-2 3-1l1 1h-4zm478-1v-1l1 1h-1zm-8-1v-1l1 1h-1zm2 0v-1l1 1h-1zm265-3v-1l1 1h-1zm-686-3l1-1 1 1h-2zm5-1l2-1h5v1l-4 1-3-1zm-225-1l1-1v1h-1zm5-15h1c0-1 0 0 0 0h-1zm4 0h0zm962-72v-1l2 1v1l-2-1zm-907-41h3l-2 1-1-1zm24-8l-2-1 4-1h9l3 1h-4l-5 1-3 1-2-1zm-7 0h0s-1 0 0 0zm-11-8h1v1l-1-1zm16-4l-1-2c-1-1-1-1 2-2l4-1-1 1v1h2l1 1h-5v1c1 0 1 0 0 0l-1 1h-1s-1 0 0 0zm7-5v-1l1 1h-1zm-20-23h2v1l-2-1zm12-2l1-1-1 1c-1 0-1 0 0 0zm780-9l5-1v1h-5zm-3-1h0zm-14-1l-19-1-8-1h-11l3-2v1h3l1-1v1l2-1a203 203 0 0010 1l5 1h1v-1l6 1a86 86 0 0112 1l-3 2-2-1zm-23-2l-1-1-1 1h2zm30-2h-1-1c0-2 1-2 2-1v1zm-12-2l-1-1h-3c-3 1-6 0-5-1h12l-1 3-2-1zm6 0c-1 0-1 0 0 0h0zm-646-4h1c1 0 0 0 0 0h-1zm111-16h1v1l-1-1zm13 1c-1-1 0-2 1-2h1a403 403 0 011-3h1a605 605 0 0115-2l2 1c1-1 1-2-1-2-1 0-1 0 0 0l3-1h6a365 365 0 0171-2l-4 1-2 1 4 1c4 0 6 0 5 1h-7-17l-4 1-2-1h-6l-5-1h-1l-3 1h-2l-4 1h-7-2l-1 1-1-1-5 1-12 1s-1 0 0 0l-2 1h-1-3l-2 1-3-1-1-1-1 1v1h-1-2l-8 2zm-8-3h1v1l-1-1zm3-1h0c-1 1-1 0 0 0zm190-1l-2-1h3v1h-1zm-12-2h2l-2 1v-1zm4 0c-1 0 0 0 0 0l1 1-1-1zm-71-1c-1-1-1-1 6-1a102 102 0 0010 0l2 1c2-1 2 0 0 0h-2l-1 1h-4-1c-2 1-3 0-2-1h-1l-4 1-3-1zm44 1v-1l1 1h-1zm-22-1v-1l1 1h-1zm215 0c1-1-1-1-2-1h-3-4l-6-1h-1 1l1-1 1-1v1h5l1-1 1 1 1 1 2-1 4 1h4l2 1c1 0 1 0 0 0l-7 1zm9 0l1-1h2c2 0 3 1 1 1h-4zm-39-2l-2-1-3 1h-4a63 63 0 00-14-2h-7l-7 1-1-1v1h-11a1066 1066 0 00-67-2 4427 4427 0 00-55-2v-1l2-1 1-1h2s1 0 0 0v-1l1 1v2l2-2h3l20-1a1147 1147 0 01140 7l2-1c-1 0 0 0 0 0l4 1h4l2 1c2 0 2 0 0 0v1h-12zm-161-5l-1-1 1 2v-1zm-32 2v-1l-1-1 1-1 1 1c0 1 1 2 2 0l-1-1 3-1h3l2-1 1 1h2l-1 1v1l1-2 2-1 1 2v2h1l-3 1c-3 0-4 0-4-2-1-1-3-2-3 0h1l-1 1h-1c1 1-1 1-3 1h-3c-1 1-1 1 0 0zm15-2v-1l-1 1h1zm-22 2v-1l1-1v-1 3h-1zm3-2h1l-1 1v-1zm2-1l2-1 2 1h-1-3zm-7 0h0zm29-1c-1 0-1 0 0 0h0zm-3 0l1-1v1h-1z"/>
    </symbol>
</defs>
</svg>
<script>search = (${searchPlugin.toString()})().search;</script>
<div class='search-box-container'>
    <span class="icon" style="margin-top:4px;">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
    </span>
    <input type="text"
        autofocus="" 
        id="search-box" 
        aria-label="Search" 
        maxlength="4096" 
        spellcheck="false" 
        autocapitalize="none" 
        autocomplete="off" 
        autocorrect="off" 
        oninput="search()" 
        placeholder="Search" >
    <span class="icon hidden" id="clear-button">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
    </span>        
</div>
<section id="search-result" class="hidden"></section>
<section id="search-result-none" class="hidden"><span class='icon'>😔</span> Sorry, no matches were found</section>
<section id="all-content">${substitutions.content}</section>
<div>Documentation built with <a href="https://github.com/ui-js/grok"><code>grok</code></a></div>
<script type="module">
  window.addEventListener('DOMContentLoaded', (event) => {
    import('https://unpkg.com/mathlive?module').then((mathlive) => {  
      mathlive.renderMathInDocument(document.getElementsByClassName('page__content')[0], { 
      renderAccessibleContent: false,
      TeX: { 
        delimiters: {
          inline: [['\\\\(', '\\\\)']],
          display: [ ['$$', '$$'], ['\\\\[', '\\\\]']],
        },
        processEnvironments : false 
      },
      asciiMath: null,
    });
  });
</script>
`,
};
