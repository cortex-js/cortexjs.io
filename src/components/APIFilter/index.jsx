import React, { useEffect, useState } from 'react';
import styles from './styles.css';

// Define stop words outside of the component to avoid reinitialization
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
  

function APIFilter() {
  const [query, setQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this effect runs only on client side

    if (typeof window !== 'undefined') {
      const searchInput = document.getElementById('searchBox');
      const clearButton = document.getElementById('clearButton');

      const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setQuery(searchTerm);
        
        const items = document.querySelectorAll('.searchable'); // Elements to search within
        let found = false;

        items.forEach((item) => {
          if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = 'block';
            found = true;
          } else {
            item.style.display = 'none';
          }
        });

        document.getElementById('searchResult').style.display = found ? 'block' : 'none';
        document.getElementById('searchResultNone').style.display = found ? 'none' : 'block';
      };

      const handleClear = () => {
        searchInput.value = '';
        handleSearch({ target: { value: '' } });
      };

      searchInput?.addEventListener('input', handleSearch);
      clearButton?.addEventListener('click', handleClear);

      return () => {
        searchInput?.removeEventListener('input', handleSearch);
        clearButton?.removeEventListener('click', handleClear);
      };
    }
  }, []);

  if (!isClient) return null; // Ensures no rendering issues during SSR

  return (
    <>
      <div className="searchBoxContainer">
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
          id="searchBox"
          aria-label="Search"
          maxLength="4096"
          spellCheck="false"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Search"
        />
        <span className="icon hidden" id="clearButton">
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </span>
      </div>
      <section id="searchResult" className="hidden"></section>
      <section id="searchResultNone" className="hidden">
        <span className="icon">😔</span> Sorry, no matches were found
      </section>
    </>
  );
}

export default APIFilter;