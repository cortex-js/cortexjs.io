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

import React, { useEffect } from 'react';

export default function APIReference() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchInput = document.getElementById('search-box');
      if (searchInput) {
        searchInput.addEventListener('input', window.search);
      }

      return () => {
        if (searchInput) {
          searchInput.removeEventListener('input', window.search);
        }
      };
    }
  }, []);

  return (
    <>
      <script async src="search.js"></script>
      <div className="search-box-container">
        <span className="icon" style={{ marginTop: '4px' }}>
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </span>
        <input
          type="text"
          id="search-box"
          aria-label="Search"
          maxLength="4096"
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Search"
        />
        <span className="icon hidden" id="clear-button">
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </span>
      </div>
      <section id="search-result" className="hidden"></section>
      <section id="search-result-none" className="hidden">
        <span className="icon">😔</span> Sorry, no matches were found
      </section>
    </>
  );
}