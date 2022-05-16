const sass = require('node-sass');
const fs = require('fs-extra');
const path = require('path');
const hljs = require('highlight.js'); // https://highlightjs.org/
// const eleventyToc = require('./eleventy-toc.js');

function buildSass(srcDir, destDir) {
  fs.mkdir(destDir, { recursive: true });

  // Compile all the .scss files in ./src/_sass
  fs.readdir(srcDir, (_err, files) => {
    files.forEach((file) => {
      if (path.extname(file) == '.scss') {
        const p = path.parse(path.join(destDir, file));
        p.base = undefined;
        p.ext = '.css';
        // console.log('Compiling "' + srcDir + file + '" to "' + path.format(p));

        // Encapsulate rendered css from scssPath into result variable
        const result = sass.renderSync({
          file: path.join(srcDir, file),
        });
        // Create cssPath directory recursively
        // Then write result css string to cssPath file
        fs.writeFile(path.format(p), result.css.toString()).catch((error) =>
          console.error(error)
        );
      }
    });
  });
}

module.exports = function (eleventyConfig) {
  // add as a valid template language to process, e.g. this adds to --formats
  // eleventyConfig.addTemplateFormats('scss');

  // eleventyConfig.addExtension('scss', {
  //   outputFileExtension: 'css', // optional, default: "html"

  //   // can be an async function
  //   compile: function (inputContent, inputPath) {
  //     let parsed = path.parse(inputPath);
  //     if (parsed.base.startsWith('_')) {
  //       return (data) => {
  //         return '';
  //       };
  //     }
  //     // let result = sass.compileString(inputContent, {
  //     //   loadPaths: [parsed.dir ?? '.', this.config.dir.includes],
  //     // });
  //     const result = sass.renderSync({
  //       file: inputPath,
  //       includePaths: ['./src/_sass/imports'],
  //     });

  //     return (data) => {
  //       return result.css.toString();
  //     };
  //   },
  // });

  buildSass('./src/_sass/', './src/build/css');

  const markdownIt = require('markdown-it');
  // const markdownItAttrs = require('markdown-it-attrs');
  // let markdownItEmoji = require('markdown-it-emoji');
  let options = {
    // See https://markdown-it.github.io/markdown-it/
    html: true,
    typographer: true,
    quotes: '“”‘’',
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (err) {
          console.log(err);
        }
      }

      return ''; // use external default escaping
    },
  };

  const md = markdownIt(options).use(require('markdown-it-deflist'));
  md.use(require('markdown-it-attrs'), {
    // optional, these are default options
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: [], // empty array = all attributes are allowed
  });

  md.use(require('markdown-it-multimd-table'), {
    multiline: true,
    rowspan: true,
    headerless: true,
  });

  // eleventyConfig.addPlugin(eleventyToc);

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.setQuietMode(true);

  // {{ variable | jsonify }}
  eleventyConfig.addFilter('jsonify', function (variable) {
    return JSON.stringify(variable);
  });

  eleventyConfig.addShortcode('tags', function (...names) {
    const cls = {
      numeric: 'numeric',
      constructor: 'constructor',
      logical: 'predicate',
      predicate: 'predicate',
      inert: 'inert',
    };
    let wrapClass = 'tags';
    if (names.includes('float-right')) wrapClass += ' float-right';
    return `<span class='${wrapClass}'>${names
      .filter((x) => x !== 'float-right')
      .map((x) => `<span class='tag ${cls[x] ?? ''}'>${x}</span>`)
      .join('')}</span>`;
  });

  eleventyConfig.addPairedLiquidShortcode('def', (content, name) => {
    return `<tr><td><code>${name}</code></td><td>
    ${md.renderInline(content)}</td></tr>`;
  });

  eleventyConfig.addPairedLiquidShortcode('defs', (content, col1, col2) => {
    return `<table><thead><tr><th>${col1 ?? ''}</th><th>${
      col2 ?? ''
    }</th></tr></thead><tbody>
    ${md.renderInline(content)}</tbody></table>`;
  });

  eleventyConfig.addPairedLiquidShortcode('readmore', (content, url) => {
    return `<div class='read-more'><a href="${url}">${md.renderInline(
      content
    )}<svg class="svg-chevron"><use xlink:href="#svg-chevron"></use></svg></a></div>`;
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: ['./src/_includes', './src'],
  });

  // Copy the `assets` directory to the compiled site folder
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy({ 'src/build/assets': 'assets' });

  // Copy the `src/build` directory to the compiled site folder
  eleventyConfig.addPassthroughCopy({ 'src/build/css': 'assets/css' });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addWatchTarget('./src/_sass/**/*.{js,scss}');
  eleventyConfig.addWatchTarget('./src/build/**/*.{css,md,html}');

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
