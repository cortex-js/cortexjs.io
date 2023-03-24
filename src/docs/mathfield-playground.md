---
title: Mathfield Example
permalink: /mathlive/demo/
layout: single
date: Last Modified
sidebar:
    - nav: "universal"
version: MathLive version
head:
  stylesheets:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.css
  scripts:
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/codemirror.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/javascript/javascript.min.js
    - https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.11/mode/xml/xml.min.js
  modules:
    - /assets/js/code-playground.min.js
    - //unpkg.com/mathlive?module
    - //unpkg.com/@cortex-js/compute-engine?module
  moduleMap: |
    window.moduleMap = {
    "mathlive": "//unpkg.com/mathlive?module",
    // "mathlive": "/js/mathlive.mjs",
    "html-to-image": "///assets/js/html-to-image.js",
    "compute-engine": "//unpkg.com/@cortex-js/compute-engine?module"
    };
---
<script>
  window.addEventListener('DOMContentLoaded', (event) => 
      import('//unpkg.com/mathlive/dist/mathlive.mjs').then((mathlive) => document.getElementById('version').innerText = mathlive.version.mathlive + ' (debug)'
  ));
</script>

# MathLive Demo



<style>
  textarea {
    color: var(--ui-color);
    background: var(--ui-background);
  }
  math-field, #latex {
    border-radius: 4px;
    border: var(--ui-border);
    padding: 8px;
  }
  math-field { 
    font-size: 24px; border-radius: 8px; 
    width: 100%;
  } 
  math-field:focus-within {
    outline: Highlight auto 1px;
    outline: -webkit-focus-ring-color auto 1px
  }
  #latex {
    margin-top: 1em;
    font-family: var(--monospace-font-family), 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',   monospace;
  }
  pre.console {
    display: block;
    max-height: 50vh;
    padding: 8px 8px 8px 1em;
    border-radius: 8px;
    overflow: auto;
    font-family: var(--monospace-font,'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro', monospace);
    font-size: 1em;
    color: var(--base-05, ${base05});
    background: var(--base-00, ${base00});
    white-space: pre-wrap;
    border: var(--ui-border, 1px solid rgba(0, 0, 0, .2));
  }
  .console .sep {
    color: var(--base-05, ${base05});
  }
  .console .index {
    color: var(--base-05, ${base05});
    opacity: .3;
    float: left;
    width: 0;
    font-style: italic;
  }
  .console .boolean {
    color: var(--base-0e, ${base0e});
    font-weight: bold;
  }
  .console .empty {
    color: var(--base-0e, ${base0e});
    font-style: italic;
  }
  .console .null {
    color: var(--base-0e, ${base0e});
    font-style: italic;
  }
  .console .string {
    color: var(--base-0a, ${base0a});
    font-weight: bold;
  }
  .console .function {
    color: var(--base-0b, ${base0b});
  }
  .console .number {
    color: var(--base-0e, ${base0e});
  }
  .console .property {
    color: var(--base-0b, ${base0b});
  }
  .console .object {
    color: var(--base-0b, ${base0b});
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
    border-left: 4px solid var(--semantic-red, ${RED});
  }
  .console .warning {
    color: var(--semantic-orange, ${YELLOW});
  }
  .console .log {
    color: var(--blue--200);
  }
  .console .group {
    font-weight: bold;
  }

</style>
<script type="module">
await customElements.whenDefined('math-field');

const INDENT = '  ';

const mf = document.getElementById('formula');
const latexField = document.getElementById('latex');

latexField.addEventListener('input', () => mf.setValue(latexField.value));

function onMathfieldInput() {
    // Output MathJSON representation of the expression
    document.getElementById('math-json').innerHTML = asString(0, mf.expression.json).text;  
    // Update raw LaTeX value
    latexField.value = mf.value;
}
//
mf.addEventListener('input', onMathfieldInput);
onMathfieldInput();


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
          text: `<span class="property">${key}</span></span><span class='sep'>: </span><span class='function'>ƒ (...)</span>`,
          itemCount: 1,
          lineCount: 1,
        };
      }
      const result = asString(depth + 1, value[key], {
        ancestors: [...options.ancestors, value],
      });
      return {
        text: `<span class="property">${key}</span></span><span class='sep'>: </span>${result.text}`,
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


</script>
<math-field id="formula">
    x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}
</math-field>
<textarea id="latex"></textarea>
<pre class="console" id="math-json"></pred>

{% readmore "/compute-engine/demo/" %}
Try a demo of the **Compute Engine**.
{% endreadmore %}

