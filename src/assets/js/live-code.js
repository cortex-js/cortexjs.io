
const CONSOLE_MAX_LINES = 100;

function pseudoConsole(id) {
    const getConsole = function() {
        let result = document.getElementById(id).querySelector('.result .console');
        if (!result) {
            result = document.createElement('pre');
            result.classList.add('console');
            document.getElementById(id).querySelector('.result').appendChild(result);
        }
        return result;
    };
    const appendConsole = function(msg) {
        // @todo: support string substition (i.e. %s, %c, etc..)

        const console = getConsole();
        let lines = console.innerHTML.split('\n');
        if (lines.length > CONSOLE_MAX_LINES) { 
            lines = lines.slice(lines.length - CONSOLE_MAX_LINES + 1);
        }
        console.innerHTML = lines.join('\n') + "&nbsp;&nbsp;".repeat(console.dataset["groupLevel"] || 0) + msg + '\n';
        console.scrollTop = console.scrollHeight;
    }
    return {
        assert: function(condition) {
            if (!condition) appendConsole([...arguments].slice(1).join(''));
        },
        catch: // non-standard
        function(err) {
            const m = err.stack.split('at ').pop().match(/:([0-9]+):([0-9]+)$/) || [];
            appendConsole('<span class="error">' + (m[1] ? 'Line ' + m[1] + ': ' : '') + err.message + '</span>');
        },
        clear: function() {
            getConsole().innerHTML = '';
        },
        debug: function () {
            appendConsole([...arguments].join(''));
        },
        error: function () {
            appendConsole('<span class="error">' + [...arguments].join('') + '</span>');
        },
        group: function() {
            if (arguments.length > 0) appendConsole('<span class="group">' +[...arguments].join('')+ '</span>');
            getConsole().dataset["groupLevel"] = (getConsole().dataset["group-level"] || 0) + 1;
        },
        groupCollapsed: function() {
            if (arguments.length > 0) appendConsole('<span class="group">' +[...arguments].join('')+ '</span>');
            getConsole().dataset["groupLevel"] = (getConsole().dataset["group-level"] || 0) + 1;
        },
        groupEnd: function() {
            getConsole().dataset["groupLevel"] = (getConsole().dataset["groupLevel"] || 0) - 1;
        },
        info: function() {
            appendConsole([...arguments].join(''));
        },
        log: function () {
            appendConsole([...arguments].join(''));
        },
        warn: function () {
            appendConsole('<span class="warning">' + [...arguments].join('') + '</span>');
        }
    }
}

function processLiveCodeJavascript(id, script) {
    // Replace document.querySelector.* et al with section.querySelector.*
    script = script.replace(/[^a-zA-Z0-9_-]?document.querySelector\s*\(/g, `document.getElementById("${id}").querySelector(`);
    script = script.replace(/[^a-zA-Z0-9_-]?document.querySelectorAll\s*\(/g, `document.getElementById("${id}").querySelectorAll(`);

    // Replace console.* with pseudoConsole.*
    script = script.replace(/[^a-zA-Z0-9_-]?console\./g, `pseudoConsole("${id}").`);

    // Extract import (can't be inside a try...catch block)
    let imports = [];
    script = script.replace(/([^a-zA-Z0-9_-]?import[^;]+;)/g, match => {
        imports.push(match); return '';
    });

    return `${imports.join('')}try{${script}} catch(err) { pseudoConsole("${id}").catch(err)}`;
}
      
function setupLiveCodeSection(sectionId) {
    const section = document.getElementById(sectionId);

    // Listen to tab activation
    const tabs = section.querySelectorAll('.tab');
    if (tabs.length <= 1) {
        tabs.forEach(x => x.style.visibility = 'hidden');
        section.querySelector('.tab .content').style.top = 0;

    } else {
        section.querySelectorAll('.tab').forEach(x => {
            x.addEventListener('click', e => handleLiveCodeTabActivate(e.currentTarget)) });
    }

    // Setup the editors
    section.querySelectorAll('.tab .content textarea').forEach( x => {
        const lang = {
            javascript: 'javascript', 
            css: 'css',
            html: 'xml'
        }[x.dataset.language || 'javascript']; 
        const jsEditor = CodeMirror.fromTextArea(
        x,
        {
            lineNumbers: false,
            mode: lang,
            theme: 'tomorrow-night'
        }
        );
        jsEditor.setSize('100%', '100%');
        
    });

    // Set the first tab as the current (selected) one.
    section.querySelector('input[type="radio"]').checked = true;
    handleLiveCodeTabActivate(section.querySelector('.tab'));
    runLiveCodeSection(sectionId);
  }


  function runLiveCodeSection(sectionId) {
    const section = document.getElementById(sectionId);
    const result = section.querySelector('.result');

    // Remove all the script tags that might be there.
    result.querySelectorAll('script').forEach(x => {
        result.removeChild(x);
    });

    // Remove all the consoles that might be there.
    result.querySelectorAll('.console').forEach(x => {
        result.removeChild(x);
    });

    // Setup the HTML in 'output'
    const htmlEditor = section.querySelector('textarea[data-language="html"] + .CodeMirror');
    if (htmlEditor) {
        section.querySelector('.output').innerHTML = htmlEditor.CodeMirror.getValue();
    }

    // Add a new script tag
    const jsEditor = section.querySelector('textarea[data-language="javascript"] + .CodeMirror');
    if (jsEditor) {
        const newScript = document.createElement('script');
        newScript.type = "module";
        try {
            newScript.appendChild(document.createTextNode(processLiveCodeJavascript(sectionId, jsEditor.CodeMirror.getValue())));
            result.appendChild(newScript);
        } catch(err) {
            // If there's a syntax error in the script, catch it here
            pseudoConsole(sectionId).error(err.message);
        }
        // Temporarily set the window error handler to catch and report
        // on syntax errors that may be present in the script
        const previousErrorHandler = window.onerror;
        window.onerror = (msg, url, line) => {
            if (url === window.location.href) {
                pseudoConsole(sectionId).error('Line ' + line + ': ' +  msg);
            }
        }
        setTimeout(() => {
            window.onerror = previousErrorHandler;
        }, 500);
    }
}

function handleLiveCodeTabActivate(tab) {
    tab.parentNode.style.setProperty('--tab-indicator-offset', tab.offsetLeft + 'px');
}