---
title: Compute Engine Demo
slug: /compute-engine/demo/
date: Last Modified
hide_table_of_contents: true
---

import Mathfield from '@site/src/components/Mathfield';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import CodePlayground from '@site/src/components/CodePlayground';
import ConsoleMarkup from '@site/src/components/ConsoleMarkup';

export function ToggleButton ({toggle, className, style}) {
return <button 
  className={clsx(className, "toggle")} 
  style={style}
  onClick={() => toggle()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336H192v48h24 80 24V336H296h-8V248 224H264 216 192v48h24 24v64H216zm72-144V128H224v64h64z"/></svg>
  </button>;
}

export function InfoSection({ label, children, secondary }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="info-section">
      {label && <div className="label">{label}</div>}
      <div class="info-section-row">
        {children}
        {secondary && <ToggleButton className={visible ? "is-on" : ""} toggle={()=>{setVisible(!visible)}}/>}
      </div>
      {visible && secondary}
    </div>
  );
}

export function Console({children}) {
  return <pre className="info-section-console">{children}</pre>;
}


export function ExampleSelector({ onSelect, index }) {  
  const examples = [
    { 
      latex: 'e^{i\\pi}', 
      preamble: `To create a boxed expression from a LaTeX string, use the \`ce.parse()\` function.

The \`expr.N()\` function evaluates the expression numerically, 
including complex numbers.`,
      template: "N"
    },

    { 
      latex: "\\frac{165}{315}",
      json: '["Divide", 165, 315]', 
      preamble: `To create a boxed expression from a MathJSON expression, use the \`ce.box()\` function.

By default expressions are put in canonical form. 
The canonical form of fractions is their reduced form.`,
      template: "as-json"
    },


    { 
      latex: '\\sqrt{6\\sum_{n=1}^{\\infty} \\frac{1}{n^2}}', 
      preamble: 'Evaluate a sum' 
    },

    { 
      latex: '2\\prod_{n=1}^{\\infty} \\frac{4n^2}{4n^2-1}', 
      preamble: 'Evaluate a product'
    },

    { 
      latex: '\\mathrm{Expand}((a+b)^6)', 
      preamble: `Symbolically expand an expression.
Use the \`latex\` property to get the result in LaTeX format.`,
      template: 'eval-latex'
    },

    { 
      label: 'Rational',
      json: '["Rational", "Pi"]', 
      preamble: `The \`Rational\` function with a single argument
approximates a number as a rational.`
    },

    { 
      latex: '\\cos\\left(\\frac{\\pi}{6}\\right)',
      preamble: 'Exact trigonometric values',
      template: 'eval-latex'
    },

    { 
      latex: '\\sin(30\\degree)', 
      preamble: 'Use degrees unit in trig functions',
    },

    {
      latex: `\\begin{cases}
0 & n =  0\\\\
1 & n =  1\\\\
n^2+1 & n \\geq 2   
\\end{cases}`, 
      label: "Piecewise"
    },

    { 
      latex: '\\lfloor \\pi \\rfloor = \\lceil \\exponentialE \\rceil', 
      preamble: "Evaluate boolean expressions",
      template: "eval-string"
    },

    {
      latex: '(x = \\pi) + 2',
      label: "Errors",
      preamble: 'Syntax errors are represented as \`Error\` functions'
    }
  ];

  useEffect(() => { onSelect(examples[index], index)}, []);

return (
    <div className="example-cells">{
      examples.map((x, i) => 
        <div 
          key={x.label ?? x.latex ?? x.json}
          className={clsx("example-cell", {"active": i === index} )} 
          onClick={() => onSelect(x, i)}
        >
          {x.label ? x.label: `$$${x.latex}$$`}
        </div>
      )
    }
    </div>
  );
}

export function ComputeEngineDemo() {

const TEMPLATES = {
  evaluate: `$0
const expr = $1;
console.info(expr.evaluate().json);
`,
  "as-json": `$0
const expr = $1;
console.info(expr.json);
`,
  "eval-string": `$0
const expr = $1;
console.info(expr.evaluate());
`,  
  "eval-latex": `$0
const expr = $1;
console.info(expr.evaluate().latex);
`,
  N: `$0
const expr = $1;
console.info(expr.N());
`
};


  let [index, setIndex] = useState(0);
  let [value, setValue] = useState('');

  const handleSelect = (example, exampleIndex) => {
    let code = TEMPLATES[example.template] ??  TEMPLATES["evaluate"];
    
    if (example.preamble) {
      const lines = example.preamble.split('\n');
      const preamble = lines.map(x => `// ${x}`).join('\n') + '\n';

      code = code.replace('$0', preamble);
    } else {
      code = code.replace('$0', '');
    }

    // Prioritize JSON over LaTeX if we have both. The LaTeX will be used
    // as a label.
    if (example.json) {
      code = code.replace("$1", `ce.box(${example.json})`);
    } else if (example.latex) {
      if (example.latex.includes('\n')) {
        const escaped = example.latex.replace(/\\/g, '\\\\');
        code = code.replace('$1', `ce.parse(\`${escaped}\`)` );
      } else {
        code = code.replace('$1', `ce.parse(${JSON.stringify(example.latex)})`);
      }
    }  

    setValue(code);
    setIndex(exampleIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <ExampleSelector onSelect={handleSelect} index={index}/>
      <CodePlayground js={value} />
    </div>
  );
}

# Compute Engine Demo

<style>{`
.example-cells {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: .5em;
  width: 100%;
  overflow: auto hidden;
  margin-bottom: 1rem;
  border-radius: 16px;
  border: 1px solid var(--neutral-700);
  padding: 16px;
  background-color: var(--neutral-900);

  font-size: 1em;

  box-shadow: inset 2px 2px 4px 0px var(--neutral-800),
              inset -2px -2px 4px 0px var(--neutral-800);
}


.example-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .25rem 0.5rem;
  margin: 0;
  min-width: fit-content;

  white-space: nowrap;
  overflow: hidden;
  text-align: center;

  border: 1px solid var(--callout-border-color);
  background-color: var(--neutral-1000);
  border-radius: 8px;
  color: var(--primary-color-dark);
  cursor: pointer;
  scale: 1;
  transition: scale 0.2s;
}

[data-theme="dark"] .example-cell {
  background-color: var(--neutral-800);
  color: var(--neutral-400);
}


.example-cell.active {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color-dark);
}

.example-cell.active:hover {
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color-dark);
  scale: 1.1;
  transition: scale 0.2s;
}

.example-cell:hover {
  color: var(--neutral-100);
  background-color: var(--callout-background);
  border-color: var(--primary-color);
  scale: 1.1;
  transition: scale 0.2s;
}

.example-cell:active {
  color: var(--neutral-900);
  background: var(--primary-color);
  border-color: var(--primary-color-dark);
}

[data-theme="dark"] .example-cell:active {
  color: var(--neutral-200);

}

.info-section {
  margin-top: 1em;
  padding: 0;
  border-radius: 8px;
}

.info-section .label {
  font-size: 1.25em;
  margin-bottom: 0.5em;
  font-weight: bold;
  padding: 0;
}

button.toggle {
  display: flex;
  align-items: center;
  appearance: none;
  border: none;
  background: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  color: #777;
  margin-left: 8px;
  color: var(--primary-color-dark);
}
button.toggle:hover,
button.toggle:active {
  background: var(--primary-color-light);
  color: var(--primary-color-dark);
}
button.toggle.is-on {
  color: #fff;
  background: var(--primary-color);
}

button.toggle svg {
  width: 24px;
  height: 24px;
}

.info-section-row {
  margin: 0;
  margin-top: 0.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}



`}</style>


<ComputeEngineDemo/>

