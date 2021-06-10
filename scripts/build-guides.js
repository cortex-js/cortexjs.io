const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

const CODE_MIRROR_VERSION = '5.59.1'; // 2020-12-31

const INJECTED_STYLESHEET = `
.output:focus-within {
  outline: Highlight auto 1px;
  outline: -webkit-focus-ring-color auto 1px
}
.output math-field:focus, .output math-field:focus-within {
  outline: none;
}

.zebra-zone {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6em;
    font-size: 1.5em;
    font-weight: 700;
    color: #999;
    background: repeating-linear-gradient(
        -45deg,
        #ffffff,
        #fff 40px,
        #eeeeee 40px,
        #eee 80px
    );
}
`;

/** Walk all the files and directory in `dir` */
async function* walk(dir) {
  if (fs.lstatSync(dir).isFile()) yield dir;
  if (fs.lstatSync(dir).isDirectory()) {
    for await (const d of await fs.promises.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) yield* await walk(entry);
      else if (d.isFile()) yield entry;
    }
  }
}

function escapeHTML(s) {
  if (s === '<!-- -->') return s;
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Parse a single ``` block */
function parseCodeFence(lines, index) {
  if (index >= lines.length) return undefined;
  const fenceChar = lines[index][0];
  if (fenceChar !== '`' && fenceChar !== '~') return undefined;
  let fence = fenceChar;
  let i = 1;
  while (i < lines[index].length && lines[index][i] === fenceChar) {
    fence += fenceChar;
    i += 1;
  }
  if (fence.length < 3) return undefined;

  const qualifiedType = lines[index].substring(fence.length).split(' ');
  const type = qualifiedType[0];
  const qualifier = qualifiedType[1];

  let content = [];
  index += 1;
  while (index < lines.length && lines[index] !== fence) {
    if (!lines[index] && qualifier) {
      // Replace empty lines with some spaces, to prevent
      // eleventy from getting confused
      content.push('<!-- -->');
    } else {
      content.push(lines[index]);
    }
    index++;
  }

  return {
    type: type.split(' ')[0],
    isPlayground: qualifier === 'playground',
    isExample: type === 'html' && qualifier === 'example',
    index: Math.min(index + 1, lines.length - 1),
    content,
  };
}

/** Parse a sequence of code fences and turn them into a
 * playground or example if necessary
 */
function parseCodeFences(lines, i) {
  const fence1 = parseCodeFence(lines, i);
  if (!fence1) return undefined;
  i = fence1.index;
  while (i < lines.length && lines[i].trim() === '') {
    i++;
  }

  let result = [];
  if (fence1.isPlayground) {
    const fence2 = parseCodeFence(lines, i);
    if (fence2) {
      i = fence2.index;
    }
    while (i < lines.length && lines[i].trim() === '') {
      i++;
    }
    const fence3 = parseCodeFence(lines, i);
    if (fence3) {
      i = fence3.index;
    }
    result = [
      ...result,
      '\n',
      '\n',
      '<code-playground layout="stack" class="m-lg w-full-lg" output-stylesheets="/assets/js/ui.css">',
      '<style slot="style">' + INJECTED_STYLESHEET + '</style>',
    ];

    result.push('<div slot="' + fence1.type + '">');
    fence1.content.forEach((x) => result.push(escapeHTML(x)));
    result.push('</div>');

    if (fence2) {
      result.push('<div slot="' + fence2.type + '">');
      fence2.content.forEach((x) => result.push(escapeHTML(x)));
      result.push('</div>');
    }
    if (fence3) {
      result.push('<div slot="' + fence3.type + '">');
      fence3.content.forEach((x) => result.push(escapeHTML(x)));
      result.push('</div>');
    }

    result = [...result, '</code-playground>', '\n', '\n'];
  } else if (fence1.isExample) {
    result = [
      ...result,
      '\n',
      '\n',
      ...fence1.content,
      '\n',
      '\n',
      '```html',
      ...fence1.content,
      '```',
    ];
  } else {
    result = [
      ...result,
      '\n',
      '\n',
      '```' + fence1.type,
      ...fence1.content,
      '```',
      '\n',
      '\n',
    ];
  }

  return {
    content: result,
    index: i - 1,
  };
}

function upgradeCodeFences(content) {
  const lines = content.split('\n');
  let result = [];
  for (let i = 0; i < lines.length; i++) {
    const fence = parseCodeFences(lines, i);
    if (!fence) {
      result.push(lines[i]);
    } else {
      i = fence.index;
      result = [...result, ...fence.content];
    }
  }
  return result.join('\n');
}

const run = async (dir, sidebar) => {
  for await (const x of walk(dir)) {
    if (x.endsWith('.png') || x.endsWith('.jpeg') || x.endsWith('.jpg')) {
      fs.copy(x, path.resolve('./src/build/assets', path.basename(x)));
    } else if (x.endsWith('.md')) {
      fs.readFile(x, 'utf8', (err, file) => {
        const graymatter = matter(file);
        const frontmatter = graymatter.data;
        if (!frontmatter || !frontmatter.permalink) {
          console.warn('Skipping ' + x + ': no frontmatter permalink.');
        } else {
          try {
            let permalink = frontmatter.permalink.slice(1);
            if (permalink.length === 0) permalink = 'index';
            const dest = path.resolve('./src/build/', permalink);
            fs.mkdirSync(path.parse(dest).dir, { recursive: true });

            if (!frontmatter.head) {
              frontmatter.head = {};
            }
            if (!frontmatter.layout) {
              frontmatter.layout = 'sdk-documentation-layout';
            }
            if (!frontmatter.sidebar) {
              frontmatter.sidebar = [];
            }
            frontmatter.sidebar.push({ nav: sidebar });

            frontmatter.head.stylesheets = [
              ...(frontmatter.stylesheets ?? []),
              `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CODE_MIRROR_VERSION}/codemirror.min.css`,
              '/assets/js/ui.css',
            ];
            frontmatter.head.scripts = [
              ...(frontmatter.scripts ?? []),
              `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CODE_MIRROR_VERSION}/codemirror.min.js`,
              `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CODE_MIRROR_VERSION}/mode/javascript/javascript.min.js`,
              `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${CODE_MIRROR_VERSION}/mode/xml/xml.min.js`,
            ];

            frontmatter.head.modules = [
              ...(frontmatter.modules ?? []),
              '/assets/js/code-playground.js',
            ];

            const content = upgradeCodeFences(graymatter.content);
            fs.writeFile(dest + '.md', matter.stringify(content, frontmatter));
          } catch (e) {
            console.error('Error parsing', x, e);
          }
        }
      });
    }
  }
};

run(process.argv[2], process.argv[3]);
