---
title: Mathfield Demo
slug: /mathfield/demo/
date: Last Modified
hide_table_of_contents: true
---

# Mathfield Demo



<style>{`
  textarea {
    font-size: 1em;
    color: var(--ui-color);
    background: var(--ui-background);
    overflow: auto;
    resize: vertical;
    vertical-align: top;
    width: 100%;
  }
  .markdown h4 {
    margin: 0;
    padding: 0;
  }
  math-field, #latex {
    border-radius: 8px;
    border: var(--ui-border);
    padding: 8px;
  }
  math-field { 
    font-size: 24px; 
    width: 100%;
    /* The position and z-index are required to prevent some elements (like a readmore) to be displayed on top of elements of the mathfield. That's an issue in particular with the contextmenu which extends outside the boundary of the mathfield */
    position: relative;
    z-index: 1;
  } 
  /* math-field:focus-within {
    outline: Highlight auto 1px;
    outline: -webkit-focus-ring-color auto 1px
  } */
  #latex {
    margin-top: 1em;

    font-family: var(--monospace-font-family), 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  }
  pre.console {
    display: block;
    max-height: 50vh;
    padding: 8px 8px 8px 1em;
    border-radius: 8px;
    overflow: auto;
    font-family: var(--monospace-font-family),'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
    font-size: 1em;
    color: var(--base-05);
    background: var(--base-00);
    white-space: pre-wrap;
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
  }
  .console .sep {
    color: var(--base-05);
  }
  .console .index {
    color: var(--base-05);
    opacity: .3;
    float: left;
    width: 0;
    font-style: italic;
  }
  .console .boolean {
    color: var(--base-0e);
    font-weight: bold;
  }
  .console .empty {
    color: var(--base-0e);
    font-style: italic;
  }
  .console .null {
    color: var(--base-0e);
    font-style: italic;
  }
  .console .string {
    color: var(--base-0a);
    font-weight: bold;
  }
  .console .function {
    color: var(--base-0b);
  }
  .console .number {
    color: var(--base-0e);
  }
  .console .property {
    color: var(--base-0b);
  }
  .console .object {
    color: var(--base-0b);
  }
  .console .error {
    display: block;
    width: calc(100% - 10px);
    padding-right: 4px;
    padding-top: 8px;
    padding-bottom:8px;
    padding-left: 6px;
    background: rgba(204, 102, 102, .4);
    color: white;
    border-left: 4px solid var(--semantic-red);
  }
  .console .warning {
    color: var(--semantic-orange);
  }
  .console .log {
    color: var(--blue--200);
  }
  .console .group {
    font-weight: bold;
  }

  div.shortcuts {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
    font-size: 1.5rem;
  }

.shortcuts .cell {
  display: flex;
  flex-flow: column;
  gap: 4px;
  width: 220px;
  height: 160px;
  font-size: .8rem;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: 1px solid var(--table-thin-line-color);
  background: var(--card-background--alternate); 
}

.if-glyphs, .if-not-glyphs {
  display: none !important;
  visibility: hidden;
}

body.glyphs .if-glyphs, body:not(.glyphs) .if-not-glyphs {
  display: inherit !important;
  visibility: visible;
}




.shortcuts .label {
  color: var(--neutral-400);
  font-weight: 600;
  text-align: center;
}
.shortcuts .result {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  min-height: 50px;
  color: var(--text-color);
}
  .shortcuts .shortcut {
    display: flex;
    flex-flow: row;
    font-size: 18px;
    font-weight: 600;
  }
  .shortcuts .shortcut kbd {
    align-items: center;
    justify-content: center;
    min-width: 28px;
    margin-left: 1px;
    margin-right: 1px;

    font-family: var(--ui-font-family);
    font-variant-ligatures: none;
    font-weight: 600;
    font-size: .8rem;
    text-align: center;
  }

  #result-section {
    display: none;
  }

  #result-section.is-visible {
    display: block;
  }

  #result {
    margin-left: 8px;
    font-size: 24px;
    overflow-x: auto;
  }

`}</style>


import { useEffect } from 'react';
import { convertLatexToMarkup } from 'mathlive';
import ErrorBoundary from '@site/src/components/ErrorBoundary';

export function MathfieldDemo({children}) {
  const INDENT = '  ';

  /**
   * Convert a basic type or an object into a HTML string
   */
  function asString(
    depth,
    value,
    options = {}
  ){
    options.quote ??= '"';
    options.ancestors ??= [];
  
    //
    // BOOLEAN
    //
    if (typeof value === 'boolean') {
      return {
        text: `<span class="boolean">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    //
    // NUMBER
    //
    if (typeof value === 'number') {
      return {
        text: `<span class="number">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
    //
    // STRING
    //
    if (typeof value === 'string') {
      if (options.quote.length === 0) {
        return {
          text: escapeHTML(value),
          itemCount: 1,
          lineCount: value.split(/\r\n|\r|\n/).length,
        };
      }
      return {
        text: `<span class="string">${escapeHTML(
          options.quote + value + options.quote
        )}</span>`,
        itemCount: 1,
        lineCount: value.split(/\r\n|\r|\n/).length,
      };
    }
  
    //
    // FUNCTION
    //
    if (typeof value === 'function') {
      let functionValue = '';
      if ('toString' in value) functionValue = escapeHTML(value.toString());
      else functionValue = escapeHTML(String(value));
  
      return {
        text: `<span class="function">ƒ  ${functionValue}</span>`,
        itemCount: 1,
        lineCount: functionValue.split(/\r\n|\r|\n/).length,
      };
    }
  
    //
    // NULL/UNDEFINED
    //
    if (value === null || value === undefined) {
      return {
        text: `<span class="null">${escapeHTML(String(value))}</span>`,
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    // Avoid infinite recursions (e.g. `window.window`)
    if (depth > 20) {
      return {
        text: '<span class="sep">(...)</span>',
        itemCount: 1,
        lineCount: 1,
      };
    }
  
    //
    // ARRAY
    //
    if (Array.isArray(value)) {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="sep">[...]</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      const result = [];
      // To account for sparse array, we can't use map() (it skips over empty slots)
      for (let i = 0; i < value.length; i++) {
        if (Object.keys(value).includes(Number(i).toString())) {
          result.push(
            asString(depth + 1, value[i], {
              ancestors: [...options.ancestors, value],
            })
          );
        } else {
          result.push({
            text: '<span class="empty">empty</span>',
            itemCount: 1,
            lineCount: 1,
          });
        }
      }
      const itemCount = result.reduce((acc, val) => acc + val.itemCount, 0);
      const lineCount = result.reduce(
        (acc, val) => Math.max(acc, val.lineCount),
        0
      );
      if (itemCount > 5 || lineCount > 1) {
        return {
          text:
            "<span class='sep'>[</span>\n" +
            INDENT.repeat(depth + 1) +
            result
              .map((x, i) => '<span class="index">' + i + '</span>' + x.text)
              .join("<span class='sep'>, </span>\n" + INDENT.repeat(depth + 1)) +
            '\n' +
            INDENT.repeat(depth) +
            "<span class='sep'>]</span>",
          itemCount,
          lineCount: 2 + result.reduce((acc, val) => acc + val.lineCount, 0),
        };
      }
      return {
        text:
          "<span class='sep'>[</span>" +
          result.map((x) => x.text).join("<span class='sep'>, </span>") +
          "<span class='sep'>]</span>",
        itemCount: Math.max(1, itemCount),
        lineCount: 1,
      };
    }
  
    //
    // HTMLElement
    //
    if (value instanceof Element) {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="object">Element...</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      let result = `<${value.localName}`;
      let lineCount = 1;
      Array.from(value.attributes).forEach((x) => {
        result +=
          ' ' + x.localName + '="' + value.getAttribute(x.localName) + '"';
      });
      result += '>';
  
      if (value.innerHTML) {
        let content = value.innerHTML.split('\n');
        if (content.length > 4) {
          content = [...content.slice(0, 5), '(...)\n'];
        }
        result += content.join('\n');
        lineCount += content.length;
      }
  
      result += `</${value.localName}>`;
      return {
        text: `<span class="object">${escapeHTML(result)}</span>`,
        itemCount: 1,
        lineCount: lineCount,
      };
    }
  
    //
    // OBJECT
    //
    if (typeof value === 'object') {
      if (options.ancestors.includes(value))
        return {
          text: '<span class="sep">{...}</span>',
          itemCount: 1,
          lineCount: 1,
        };
  
      if (value instanceof Map) {
        const kv = Object.fromEntries(value);
        const result = asString(depth, kv, {
          ancestors: [...options.ancestors, value],
        });
        return { ...result, text: '<span class=object>Map</span>' + result.text };
      }
      if (value instanceof Set) {
        const elts = Array.from(value);
        const result = asString(depth, elts, {
          ancestors: [...options.ancestors, value],
        });
        return { ...result, text: '<span class=object>Set</span>' + result.text };
      }
  
      if ('toString' in value) {
        const s = value.toString();
        if (s !== '[object Object]')
          return {
            text: escapeHTML(s),
            itemCount: 1,
            lineCount: 1,
          };
      }
      let props = Object.keys(value);
  
      Object.getOwnPropertyNames(value).forEach((prop) => {
        if (!props.includes(prop)) {
          props.push(prop);
        }
      });
      props = props.filter((x) => !x.startsWith('_'));
      if (props.length === 0 && typeof props.toString === 'function') {
        const result = value.toString();
        if (result === '[object Object]')
          return {
            text: '<span class="sep">{}</span>',
            itemCount: 1,
            lineCount: 1,
          };
        return {
          text: result,
          itemCount: 1,
          lineCount: result.split(/\r\n|\r|\n/).length,
        };
      }
  
      const propStrings = props.sort().map((key) => {
        if (typeof value[key] === 'object' && value[key] !== null) {
          let result = asString(depth + 1, value[key], {
            ancestors: [...options.ancestors, value],
          });
          if (result.itemCount > 500) {
            result = {
              text: "<span class='sep'>(...)</span>",
              itemCount: 1,
              lineCount: 1,
            };
          }
          return {
            text: `<span class="property">${key}</span><span class='sep'>: </span>${result.text}`,
            itemCount: result.itemCount,
            lineCount: result.lineCount,
          };
        }
        if (typeof value[key] === 'function') {
          return {
            text: `<span class="property">${key}</span><span class='sep'>: </span><span class='function'>ƒ (...)</span>`,
            itemCount: 1,
            lineCount: 1,
          };
        }
        const result = asString(depth + 1, value[key], {
          ancestors: [...options.ancestors, value],
        });
        return {
          text: `<span class="property">${key}</span><span class='sep'>: </span>${result.text}`,
          itemCount: result.itemCount,
          lineCount: result.lineCount,
        };
      });
      const itemCount = propStrings.reduce((acc, val) => acc + val.itemCount, 0);
      const lineCount = propStrings.reduce((acc, val) => acc + val.lineCount, 0);
      if (itemCount < 5) {
        return {
          text:
            "<span class='sep'>{</span>" +
            propStrings
              .map((x) => x.text)
              .join("</span><span class='sep'>, </span>") +
            "<span class='sep'>}</span>",
          itemCount,
          lineCount,
        };
      }
      return {
        text:
          "<span class='sep'>{</span>\n" +
          INDENT.repeat(depth + 1) +
          propStrings
            .map((x) => x.text)
            .join(
              "</span><span class='sep'>,</span>\n" + INDENT.repeat(depth + 1)
            ) +
          '\n' +
          INDENT.repeat(depth) +
          "<span class='sep'>}</span>",
        itemCount: itemCount,
        lineCount: lineCount + 2,
      };
    }
    return { text: String(value), itemCount: 1, lineCount: 1 };
  }
  
  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const onMathfieldUpdate = (mf) => {
    // The ref callback is called with null when the element unmounts
    if (mf === null) return;
    const latexField = document.getElementById('latex');
    if (!latexField) return;
    latexField.value = mf.value;
    const expr = mf?.expression;
    // Output MathJSON representation of the expression
    document.getElementById('math-json').innerHTML = expr ? asString(0, expr.json).text : '😕 The Compute Engine is not available';
    if (!expr) return;

    let result = '';

    if (typeof MathfieldElement !== 'undefined' && MathfieldElement.computeEngine) {
      MathfieldElement.computeEngine.precision = 7;
    }

    if (expr.head !== 'Equal') {
      const exprN = expr.N();

      if (!exprN.isSame(expr)) result = exprN.latex;
    }

    if (!result) {
      const exprSimplify = expr.simplify();
      if (!exprSimplify.isSame(expr)) result = exprSimplify.latex;
    }

    if (expr.head !== 'Equal') {
      if (!result) {
        const exprEval = expr.evaluate();
        if (!exprEval.isSame(expr)) result = exprEval.latex;
      }
    }

    if (result) {
      document.getElementById('result').innerHTML = convertLatexToMarkup('= ' + result);
      document.getElementById('result-section').classList.add('is-visible');
    } else {
      document.getElementById('result-section').classList.remove('is-visible');
    }
  };

  const onInput = (evt) => onMathfieldUpdate(evt.target);

  useEffect(() => {
    const latexField = document.getElementById('latex');
    latexField.value = children;
  }, [])

  // There's a bug somewhere (React?) where `return <math-field/>` doesn't work
  // (the JSX code produced is invalid). Calling the _jsx function directly
  // works around the issue.
  return _jsx('math-field', {
    onInput,
    ref: (node) => onMathfieldUpdate(node),
    value: children
  });
}


<ErrorBoundary>
  <MathfieldDemo>{`x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}`}</MathfieldDemo>
</ErrorBoundary>

<div style={{marginLeft: "auto", paddingTop: ".5em", textAlign: "right"}}>
  <a href="#shortcuts">Keyboard Shortcuts</a>
</div>

<section id='result-section'>
<div id='result'></div>


<ReadMore path="/compute-engine/" >
Read more about using the **Compute Engine** to evaluate and simplify expression.<Icon name="chevron-right-bold" />
</ReadMore>


</section>

<h4>LaTeX</h4>
<textarea id="latex" onInput={() => {
  const mf = document.querySelector('math-field');
  mf.value = document.getElementById('latex').value;
}}></textarea>


<ReadMore path="/mathfield/reference/commands/" >
Read more about the supported **LaTeX commands**.<Icon name="chevron-right-bold" />
</ReadMore>


<h4>MathJSON</h4>
<pre className="console" id="math-json"></pre>

<ReadMore path="/compute-engine/demo/" >
Learn more about MathJSON and try a demo of the **Compute Engine**.<Icon name="chevron-right-bold" />
</ReadMore>

## Keyboard Shortcuts


<div className="shortcuts">

  <div className="cell">
  <div className="result">{`$$ \\frac{\\blacksquare}{\\blacksquare}$$`}</div>
  <div className="label">Fraction</div>
  <div className="shortcut"><kbd>/</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\square^\\blacksquare$$`}</div>
  <div className="label">Superscript, Power</div>
  <div className="shortcut"><kbd>^</kbd></div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>6</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>6</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\square_\\blacksquare$$`}</div>
  <div className="label">Subscript</div>
  <div className="shortcut"><kbd>_</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\sqrt{\\blacksquare}$$`}</div>
  <div className="label">Square root</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>V</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>V</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\int^{\\blacksquare}_{\\blacksquare}$$`}</div>
  <div className="label">Integral</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>B</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>B</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\sum$$`}</div>
  <div className="label">Sum</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>W</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>W</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$\\prod^\\blacksquare_\\blacksquare$$`}</div>
  <div className="label">Product</div>
  <div className="shortcut if-glyphs"><kbd>⌥</kbd> + <kbd>⇧</kbd> + <kbd>P</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>ALT</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\pi$$`}</div>
  <div className="label">Pi</div>
  <div className="shortcut"><kbd>P</kbd><kbd>I</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\infty$$`}</div>
  <div className="label">Infinity</div>
  <div className="shortcut"><kbd>O</kbd><kbd>O</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\pm$$`}</div>
  <div className="label">Plus or minus</div>
  <div className="shortcut"><kbd>+</kbd><kbd>-</kbd></div>
  </div>

  <div className="cell">
  <div className="result">{`$$ \\mathbb{R}$$`}</div>
  <div className="label">Blakckboard R</div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>R</kbd><kbd>⇧</kbd>+<kbd>R</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>R</kbd><kbd>SHIFT</kbd>+<kbd>R</kbd></div>
  </div>

</div>

<div className="shortcuts" style={{marginTop: "1em"}}>
  <div className="cell">
  <div className="label">Enter/exit LaTeX mode</div>
  <div className="shortcut"><kbd>ESC</kbd></div>
  </div>

  <div className="cell">
  <div className="label">Enter/exit text mode</div>
  <div className="shortcut"><kbd>"</kbd></div>
  <div className="shortcut if-glyphs"><kbd>⇧</kbd>+<kbd>'</kbd></div>
  <div className="shortcut if-not-glyphs"><kbd>SHIFT</kbd>+<kbd>'</kbd></div>
  </div>



</div>



<ReadMore path="/mathfield/reference/keybindings/" >
Read more about all the available **keybindings** and **shortcuts**.<Icon name="chevron-right-bold" />
</ReadMore>





export default function ({children}) {
  useEffect(() => {
    const platform = navigator['userAgentData']?.platform ?? navigator.platform;
    const isApple = /^mac/i.test(platform) || /iphone|ipod|ipad/i.test(navigator.userAgent);

    // The body class gets cleared when the page is reloaded, so we need to
    // set it again after a short delay.
    if (isApple) 
      setTimeout(() => document.body.classList.add('glyphs'), 16);
    
    // Restore the body class when the page is reloaded
    return () => document.body.classList.remove('glyphs');
  }, []);
  return <>{children}</>;
}

