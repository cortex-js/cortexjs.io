const sass = require('node-sass');
const fs = require('fs-extra');
const path = require('path');
const hljs = require('highlight.js'); // https://highlightjs.org/

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

    let markdownIt = require('markdown-it');
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
