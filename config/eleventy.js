const sass = require('node-sass');
const fs = require('fs-extra');
const path = require('path');
const hljs = require('highlight.js'); // https://highlightjs.org/

function randomId() {
    return (
        Date.now()
            .toString(36)
            .slice(-2) + Math.floor(Math.random() * 0x186a0).toString(36)
    );
}

function liveCode(content) {
    const id = randomId();
    return `<div id="${id}" class="live-code"><div class='source'><div class='tabs'>${content.replace(
        /\[\[ID\]\]/g,
        id
    )}</div>
    <div class='buttons'>
      <button class='button' onclick='runLiveCodeSection("${id}")'><i class="fas fa-play"></i>&nbsp;&nbsp;Run</button>
    </div></div>
    <div class='result'>
        <div class='output'></div>
    </div></div><script>setupLiveCodeSection("${id}");</script>
`;
}

function codeTab(content, language = 'Javascript') {
    const id = randomId();

    return `<div class='tab'>
    <input type="radio" id="${id}" name="[[ID]]">
    <label for="${id}">${language}</label>
    <div class="content ${language.toLowerCase()}">
        <textarea data-language="${language.toLowerCase()}">${content}</textarea> 
    </div>
</div>`;
}

function buildSass(srcDir, destDir) {
    fs.mkdir(destDir, { recursive: true });

    // Compile all the .scss files in ./src/_sass
    fs.readdir(srcDir, (_err, files) => {
        files.forEach(file => {
            if (path.extname(file) == '.scss') {
                const p = path.parse(path.join(destDir, file));
                p.base = undefined;
                p.ext = '.css';
                console.log(
                    'Compiling "' + srcDir + file + '" to "' + path.format(p)
                );

                //Encapsulate rendered css from scssPath into result variable
                const result = sass.renderSync({
                    file: path.join(srcDir, file),
                });
                //Create cssPath directory recursively
                //Then write result css string to cssPath file
                fs.writeFile(
                    path.format(p),
                    result.css.toString()
                ).catch(error => console.error(error));
            }
        });
    });
}

module.exports = function(eleventyConfig) {
    buildSass('./src/_sass/', './src/build/css');

    const markdownIt = require('markdown-it');
    // let markdownItEmoji = require('markdown-it-emoji');
    let options = {
        // See https://markdown-it.github.io/markdown-it/
        html: true,
        typographer: true,
        highlight: function(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (err) {
                    console.log(err);
                }
            }

            return ''; // use external default escaping
        },
    };

    eleventyConfig.setLibrary(
        'md',
        markdownIt(options).use(require('markdown-it-deflist'))
    );

    eleventyConfig.setUseGitIgnore(false);

    // {{ variable | jsonify }}
    eleventyConfig.addFilter('jsonify', function(variable) {
        return JSON.stringify(variable);
    });

    eleventyConfig.addPairedShortcode('live-code', liveCode);
    eleventyConfig.addPairedShortcode('code-tab', codeTab);

    eleventyConfig.setLiquidOptions({
        dynamicPartials: false,
        root: ['./src/_includes', './src'],
    });
    // Copy the `assets` directory to the compiled site folder
    eleventyConfig.addPassthroughCopy('src/assets');
    // Copy the `src/build` directory to the compiled site folder
    eleventyConfig.addPassthroughCopy({ 'src/build/css': 'assets/css' });

    eleventyConfig.setDataDeepMerge(true);

    // @todo Available in 0.10 (which is not yet released)
    // eleventyConfig.addWatchTarget('./_sass/');

    return {
        passtroughFileCopy: true,
        dir: {
            input: './src',
            output: './submodules/cortex-js.github.io',
            includes: '_includes/',
            layouts: '_layouts', // dir.input + '/_includes' by default
        },
    };
};
