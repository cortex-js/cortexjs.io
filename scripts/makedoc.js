// Converts a JSON file describing Typescript types into a HTML fragment
// with frontmatter
const fs = require('fs');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js'); // https://highlightjs.org/

const md = new markdownIt({
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
});

const default_language = 'typescript';
let api = {};

function getReflectionByID(from, id) {
    if (from.id === id) return from;
    let result;
    if (from.children) {
        from.children.some(x => {
            result = getReflectionByID(x, id);
            return result !== undefined;
        });
    }
    return result;
}

function renderPermalink(link) {
    return `<a class="header-link" href="#${link}" title="Permalink"><span class="sr-only">Permalink</span><svg class="svg-inline--fa fa-link fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg></a>`;
}

function renderIndex(xs, parent = '') {
    if (xs.length <= 1) return '';
    if (parent) parent += '.';
    return (
        '<ul>' +
        xs
            .map(
                x =>
                    `<li><a href="#${encodeURIComponent(parent + x.name)}">${
                        x.name
                    }()</a></li>`
            )
            .filter(x => !!x)
            .join('\n') +
        '</ul>'
    );
}

function renderShortType(t) {
    let result = '';
    if (t.type === 'void') {
        result = 'void';
    } else if (t.type === 'intrinsic') {
        result = t.name;
    } else if (t.type === 'reference') {
        result += t.name;
        // @todo: reference types also have an array of arguments in `typeArguments`
        // Not sure how that's used.
        // @todo: if a type has an t.id, if can be referenced with a link
    } else if (t.type === 'reflection') {
        // Reflection are complex type description (functions, object literals,
        // etc...). Omit them when rendering "short" types.
        // Reflection types have a `declaration` property
    } else if (t.type === 'array') {
        result += renderShortType(t.elementType) + '[]';
    } else if (t.type === 'union') {
        result += t.types
            .map(renderShortType)
            .filter(x => !!x)
            .join(' | ');
    } else if (t.type === 'intersection') {
        result += t.types
            .map(renderShortType)
            .filter(x => !!x)
            .join(' & ');
    } else if (t.type === 'stringLiteral') {
        result += '"' + t.value + '"';
    } else if (t.type === 'tuple') {
        result +=
            '[' +
            t.elements
                .map(renderShortType)
                .filter(x => !!x)
                .join(', ') +
            ']';
    } else if (t.type === 'typeParameter') {
        // @todo not sure of the syntax for these. Used for Generics.
        // result += t.constraint.map(renderShortType).join('');
    }
    return result;
}

function renderLongType(json) {
    let result = renderShortType(json);
    if (!result) {
        // Type literal
        if (json.declaration && json.declaration.indexSignature) {
            result += json.declaration.indexSignature
                .map(renderIndexSignature)
                .filter(x => !!x)
                .join(';\n');
        }
        if (json.declaration && json.declaration.signatures) {
            result += json.declaration.signatures
                .map(renderSignature)
                .filter(x => !!x)
                .join('\n');
        }
        if (!result && json.type !== 'reflection') {
            console.log(
                'Unexpected long type',
                json.type,
                JSON.stringify(json)
            );
        }
    }
    return result;
}

function renderShortParameter(json) {
    let result = '';
    if (json.flags && json.flags.isRest) {
        result += '...';
    }

    result += '<em>' + json.name + '</em>';
    if (json.flags && json.flags.isOptional) {
        result += '?';
    }
    const shortType = renderShortType(json.type);
    if (shortType) {
        result += ': ' + shortType;
    }
    return result;
}

/**
 * A call signature, e.g. a function, etc...
 *
 */
function renderSignature(json, parent = '') {
    let result = '';
    if (parent) result += '<em>' + parent + '.</em>.';

    result +=
        '(' +
        json.parameters
            .map(renderShortParameter)
            .filter(x => !!x)
            .join(', ') +
        ')';
    result += ' => ' + renderShortType(json.type);
    return result;
}

/**
 * An index signature is e.g. `[key: string]: any`
 *
 */
function renderIndexSignature(json, parent = '') {
    let result = '';

    if (parent) result += '<em>' + parent + '.</em>.';

    result += '\\[';
    result += json.parameters
        .map(x => x.name + ': ' + renderShortType(x.type))
        .filter(x => !!x)
        .join(', ');

    result += '\\]: ' + renderShortType(json.type);
    return result;
}

/**
 * @param prefix - When the parameter is part of an object, the name of the
 * parent object, for example when this parameter is a field in an object
 * literal, the prefix is the name of the object literal.
 *
 */
function renderLongParameter(json, prefix = '') {
    let result = '<dt>';
    if (prefix === '[arguments]') {
        result += '<em><strong>' + json.name + '</strong></em>';
    } else {
        if (prefix) result += '<em>' + prefix + '</em>.';
        result += '<strong>' + json.name + '</strong>';
    }
    if (json.flags && json.flags.isOptional) {
        result += '?';
    }
    const longType = renderLongType(json.type);
    if (json.type.declaration && json.type.declaration.getSignature) {
        result += 'getter'; // @todo something better
    }
    if (json.type.declaration && json.type.declaration.setSignature) {
        result += 'setter'; // @todo something better
    }
    if (longType) result += ': ' + longType;
    result += '</dt>\n<dd>\n';
    result += renderComment(json.comment, 0);

    if (json.type.type === 'reflection') {
        // A complex type with "subtypes", e.g. an object literal
        // with multiple properties.
        if (json.type.declaration.children) {
            result += '\n<dl>\n';
            result += json.type.declaration.children
                .map(x => renderLongParameter(x, json.name))
                .filter(x => !!x)
                .join('\n');
            result += '\n</dl>\n';
        }
        if (json.type.declaration.indexSignature) {
            result += json.type.declaration.indexSignature
                .map(x => renderIndexSignature(x, json.name))
                .filter(x => !!x)
                .join('\n');
        }
    }
    result += '\n</dd>\n';

    return result;
}

function renderFunctionSignature(s, parent = '') {
    if (parent) parent += '.';
    let result = '\n<h3 ';
    const permalink = encodeURIComponent(parent + s.name);
    result += `id="${permalink}" `;
    if (typeof getTag(s.comment.tags, 'deprecated') !== 'undefined')
        result += 'class="deprecated" ';
    result += `>function `;
    result += parent + '<strong>' + s.name + '</strong>(';
    if (s.parameters) {
        result += s.parameters
            .map(renderShortParameter)
            .filter(x => !!x)
            .join(',\n    ');
    }

    result += ')';

    const resultType = renderShortType(s.type);
    if (resultType) result += ': ' + resultType;

    result += `${renderPermalink(permalink)}</h3>\n`;

    result += renderComment(s.comment) + '\n';

    if (s.parameters) {
        result += '\n<dl>\n';
        result += s.parameters
            .map(x => renderLongParameter(x, '[arguments]'))
            .filter(x => !!x)
            .join('\n');
        result += '\n</dl>\n';
    }

    if (s.type) {
        result += '\n\n→ ' + resultType;
        result += '\n:  ';
        if (s.comment && s.comment.returns) {
            result += trimNewline(s.comment.returns.trim()) || '';
        }
        result += '\n';
    }

    return result;
}

function renderFlags(json) {
    if (!json) return '';
    let result = '';
    if (json.isPrivate) result += '*private*{:.modifier-tag}';
    if (json.isProtected) result += '*protected*{:.modifier-tag}';
    if (json.isPublic) result += '*public*{:.modifier-tag}';
    if (json.isExported) result += '*exported*{:.modifier-tag}';
    if (json.isExternal) result += '*external*{:.modifier-tag}';
    if (json.isStatic) result += '*static*{:.modifier-tag}';

    return result;
}

function renderFunction(json, parent) {
    let result = '\n<section class="card">\n';
    result += renderFlags(json.flags);

    result += json.signatures
        .map(sig => renderFunctionSignature(sig, parent))
        .filter(x => !!x)
        .join('\n\n');
    result += '\n</section>\n';

    return result;
}

function renderClass(json) {
    const permalink = encodeURIComponent('class:' + json.name);
    let result = `\n<h2 id="${permalink}">`;
    result +=
        '<em>Class</em> <strong>' +
        json.name +
        `</strong>${renderPermalink(permalink)}</h2>\n`;
    // json.comment.tags: properties of the class
    // json.children (kind === 1024): properties

    if (json.extendedTypes) {
        result += '<span class="tag-name">Extends</span>' + '\n:  ';
        result += json.extendedTypes
            .map(renderShortType)
            .filter(x => !!x)
            .join(', ');
    }

    if (json.implementedTypes) {
        result += '<span class="tag-name">Implements</span>' + '\n:  ';
        result += json.implementedTypes
            .map(renderShortType)
            .filter(x => !!x)
            .join(', ');
    }

    if (json.extendedBy) {
        result += '<span class="tag-name">Extended By</span>' + '\n:  ';
        result += json.extendedBy
            .map(renderShortType)
            .filter(x => !!x)
            .join(', ');
    }

    if (json.implementedBy) {
        result += '<span class="tag-name">Implemented By</span>' + '\n:  ';
        result += json.implementedBy
            .map(renderShortType)
            .filter(x => !!x)
            .join(', ');
    }

    // Look for all the methods (kind = 2048) in the class, grouped by categories
    const categories = getCategories(json, 2048);

    result += '\n<section class="tsd-index-list">';
    // Generate index of the methods, grouped by categories
    result += categories
        .map(category => {
            return (
                `\n\n<h3>${category.title}</h3>\n\n` +
                renderIndex(category.children, json.name)
            );
        })
        .filter(x => !!x)
        .join('\n');

    result += '\n</section>\n';

    result += categories
        .map(category => {
            let r = '';
            if (category.title) {
                r += `\n<h2 class='category-title'><em>class ${json.name}</em>${category.title}</h2>\n`;
            }
            r += category.children
                .map(x => renderFunction(x, json.name))
                .filter(x => !!x)
                .join('\n');
            // r += category.children.map(x => x.signatures.map(sig => renderFunctionSignature(sig, json.name + '.'))).filter(x => !!x).join('\n');
            return r;
        })
        .join('');
    return result;
}

function sortOtherCategoryAtEnd(categories) {
    return categories.sort((a, b) => {
        if (a.title === b.title) return 0;
        if (a.title === 'Other') return 1;
        if (b.title === 'Other') return -1;
        return a.title < b.title;
    });
}

function getCategories(json, kind) {
    let result = [];
    let children = json.groups && json.groups.filter(x => x.kind === kind);
    if (!children || children.length !== 1) {
        // No groups. Are there categories?
        if (json.categories) {
            return sortOtherCategoryAtEnd(json.categories);
        }
        return json.children.filter(x => x.kind === kind);
    }
    if (children[0].categories) {
        result = children[0].categories.map(category => {
            return {
                title: category.title,
                children: getChildrenByID(json, category.children),
            };
        });
        result = sortOtherCategoryAtEnd(result);
    } else {
        // No categories, return all the children of the specified kind
        result = [
            {
                title: '',
                children: getChildrenByID(json, children[0].children),
            },
        ];
    }
    return result;
}

/**
 * Return all the children matching the specified list of IDs
 */
function getChildrenByID(json, children) {
    return children.map(x => json.children.filter(child => child.id === x)[0]);
}

function renderTypeAliases(json) {
    let result = '\n<section class="card">\n';
    result += '\n<h3> declare type <strong>' + json.name + '</strong></h3>';
    const type = renderLongType(json.type);
    if (type) result += ' = ' + type;
    result += '\n\n';

    result += renderComment(json.comment);

    if (!type && json.type.declaration.children) {
        result += '\n<dl>\n';
        result += json.type.declaration.children
            .map(x => renderLongParameter(x, ''))
            .filter(x => !!x)
            .join('\n');
        result += '\n</dl>\n';
        // result += renderLongType(json.type);
    }

    result += '\n</section>\n';
    return result;
}

function renderModule(json) {
    const permalink = encodeURIComponent('module:' + trimQuotes(json.name));
    let result = `\n<h2 id="${permalink}">`;
    result += `<em>Module</em> <strong>${trimQuotes(
        json.name
    )}</strong>${renderPermalink(permalink)}</h2>\n`;

    result += renderComment(json.comment) + '\n';

    if (json.groups) {
        result += json.groups
            .map(x => renderGroup(x, trimQuotes(json.name)))
            .filter(x => !!x)
            .join('\n\n');
    } else {
        // Index of the functions (kind 64) in the module
        const entries = json.children.filter(x => x.kind === 64);

        result +=
            '\n<div class="tsd-index-list">' +
            renderIndex(entries, trimQuotes(json.name) + '.') +
            '\n</div>\n';

        result += entries
            .map(x =>
                x.signatures.map(sig =>
                    renderFunctionSignature(sig, trimQuotes(json.name) + '.')
                )
            )
            .filter(x => !!x)
            .join('\n');
    }

    return result;
}

/**
 * The top level package (somewhat confusingly)
 */
function renderExternalModule(json) {
    return (
        renderComment(json.comment) +
        '\n' +
        json.groups
            .map(x => renderGroup(x, ''))
            .filter(x => !!x)
            .join('\n\n')
    );
}

function renderGroup(group, parent) {
    // See https://github.com/TypeStrong/typedoc/blob/master/src/lib/models/reflections/abstract.ts
    // for a list of the possible group kinds
    let result = '';
    let permalink = '';

    switch (group.kind) {
        case 0: // Global
            // Never in a group
            break;

        case 1: // External Modules (group of modules, top-level)
            result += group.children
                .map(x => renderExternalModule(getReflectionByID(api, x)))
                .filter(x => !!x)
                .join('\n\n');
            break;

        case 2: // Module
            result += group.children
                .map(x => renderModule(getReflectionByID(api, x)))
                .join('');
            break;

        case 4: // Enum
        case 16: // Enum Member
        case 32: // Variable
            break;

        case 64: // Functions
            permalink = encodeURIComponent('functions:' + (parent || 'global'));
            result += `\n<h2 id="${permalink}">`;
            result += parent
                ? `<em>module ${parent}</em> `
                : '<em>Global</em> ';
            result += `Functions${renderPermalink(permalink)}</h2>\n`;
            const categories = getCategories(group, 64);

            result += '\n<section class="tsd-index-list">';
            result += categories
                .map(category => {
                    const children = category.children.map(x =>
                        getReflectionByID(api, x)
                    );
                    return (
                        `\n\n<h3>${category.title}</h3>\n\n` +
                        renderIndex(children, parent)
                    );
                })
                .filter(x => !!x)
                .join('\n');
            result += '\n</section>\n';

            result += categories
                .map(category => {
                    let r = '';
                    if (category.title)
                        r += `\n<h2 class='category-title'>${category.title}</h2>`;
                    const children = category.children.map(x =>
                        getReflectionByID(api, x)
                    );
                    r += children
                        .map(x => renderFunction(x, parent))
                        .filter(x => !!x)
                        .join('\n');
                    return r;
                })
                .join('');

            // result += children.map(x => renderFunction(x, parent)).join('');
            break;

        case 128: // Classes
            result += group.children
                .map(x => renderClass(getReflectionByID(api, x)))
                .join('');
            break;

        case 256: // Interface
        case 512: // Constructor
        case 1024: // Property
        case 2048: // Method
        case 4096: // Call signature
        case 8192: // Index signature
        case 16384: // Constructor signature
        case 32768: // Parameter
        case 65536: // Type literal
        case 131072: // Type parameter
        case 262144: // Accessor
        case 524288: // Get signature
        case 1048576: // Set signature
        case 2097152: // Object literal
            break;

        case 4194304: // Type Aliases
            permalink = encodeURIComponent('typealias:' + (parent || 'global'));
            result += `\n<h2 id="${permalink}">`;
            result += parent
                ? `<em>module ${parent}</em> `
                : '<em>Global</em> ';
            result += `Types${renderPermalink(permalink)}</h2>\n`;
            result += group.children
                .map(x => renderTypeAliases(getReflectionByID(api, x)))
                .join('');
            break;

        case 8388608: // Event
            break;

        default:
            result +=
                '\n## ' +
                group.kind +
                ' ' +
                group.title +
                ' ' +
                '\n' +
                'children' +
                group.children.length +
                '\n';
    }

    return result + '\n';
}

function renderComment(comment) {
    if (!comment) return '';
    let result = '';
    let newLine = '\n';

    const modifierTags = renderModifierTags(comment.tags);
    if (modifierTags) result += newLine + modifierTags + newLine + newLine;

    if (comment.shortText) {
        result += renderLinks(md.render(comment.shortText)) + newLine + newLine;
    }
    if (comment.text) {
        result +=
            comment.text
                .split('\n\n')
                .map(renderNotices)
                .filter(x => !!x)
                .join(newLine + newLine) + newLine;
    }
    const remarks = getTag(comment.tags, 'remarks');
    if (remarks) {
        result +=
            remarks.text
                .split('\n\n')
                .map(renderNotices)
                .filter(x => !!x)
                .join(newLine + newLine) + newLine;
    }

    if (comment.tags && comment.tags.length > 0) {
        result +=
            newLine +
            comment.tags
                .filter(x => !/^(module|method|function|remarks)$/.test(x.tag))
                .map(renderTag)
                .filter(x => !!x)
                .join(newLine + newLine) +
            newLine;
    }
    return result;
}

function getTag(tags, tag) {
    if (tags) {
        let result = tags.filter(x => x.tag === tag);
        console.assert(result.length <= 1);
        if (result.length === 1) {
            return result[0] || '';
        }
    }
    return undefined;
}

/**
 *
 * See https://github.com/microsoft/tsdoc/blob/master/tsdoc/src/details/StandardTags.ts for the list of supported tags
 */
function renderTag(tag) {
    if (!tag) return '';
    let result = '';
    let text = (tag.text && trimNewline(tag.text.trim())) || '';
    text = renderLinks(text);
    switch (tag.tag) {
        case 'method':
            result += '<strong>Method:</strong> ' + text;
            break;
        case 'module':
            result += '<strong>Module:</strong> ' + text;
            break;
        case 'function':
            result += '<strong>Function:</strong> ' + text;
            break;
        case 'example':
            result +=
                '\n<pre><code>' +
                hljs.highlight(default_language || 'typescript', text).value +
                '</pre></code>\n';
            break;
        case 'typedef':
        case 'type':
        case 'property':
        case 'param':
        case 'returns':
            // Those tags are emitted for type definition
            // but they are redundant...
            break;
        case 'privateremarks':
            // This comment is for internal use only. Do not output it
            // in the API documentation.
            break;
        case 'packagedocumentation':
            // This tag indicates this is the top-level documentation
            // We handle it separately, no need to emit it here.
            break;
        case 'category':
            // Categories are handled separately
            break;
        case 'global':
            // Globals are grouped together and indicated separately
            break;

        default:
            if (text) {
                if (
                    /^(eventProperty|override|packageDocumentation|public|readonly|sealed|virtual)$/i.test(
                        tag.tag
                    )
                ) {
                    // Add a notice style
                    result += '<section class="notice--info">\n';
                    result += '<h4>' + tag.tag + '</h4>\n\n' + text;
                    result += '\n</section>';
                } else if (/^(alpha|beta|experimental)$/i.test(tag.tag)) {
                    // Add a notice style
                    result += '<section class="notice--warning">\n';
                    result += '<h4>' + tag.tag + '</h4>\n\n' + text;
                    result += '\n</section>';
                } else if (/^(deprecated|internal)$/i.test(tag.tag)) {
                    // Add a notice style
                    result += '<section class="notice--danger">\n';
                    result += '<h4> ' + tag.tag + '</h4>\n\n' + text;
                    result += '\n</section>';
                } else {
                    result +=
                        '<span class="tag-name">' +
                        tag.tag +
                        '</span>' +
                        '\n:  ' +
                        text;
                }
            } else if (
                !/alpha|beta|deprecated|eventProperty|experimental|internal|override|packageDocumentation|public|readonly|sealed|virtual/i.test(
                    tag.tag
                )
            ) {
                result += '<strong>' + tag.tag + '</strong>';

                if (!/^()$/i.test(tag.tag)) {
                    console.log('Unexpected tag ' + tag.tag);
                }
            }
    }
    return result;
}

function renderModifierTag(json) {
    let result = '';
    const modifierTag = {
        eventProperty: 'event',
        override: 'override',
        // "packageDocumentation": "packageDocumentation",
        public: 'public',
        readonly: 'Read Only',
        sealed: 'sealed',
        virtual: 'virtual',
    }[json.tag];

    const redModifierTag = {
        deprecated: 'deprecated', // This is a block tag
        internal: 'internal',
    }[json.tag];

    const orangeModifierTag = {
        alpha: 'alpha',
        beta: 'beta',
        experimental: 'experimental',
    }[json.tag];

    if (modifierTag) {
        result += '<span class=".modifier-tag">' + modifierTag + '</span>';
    } else if (redModifierTag) {
        result +=
            '<span class="red.modifier-tag">' + redModifierTag + '</span>';
    } else if (orangeModifierTag) {
        result +=
            '<span class="orange.modifier-tag"' + orangeModifierTag + '</span>';
    }
    return result;
}

function renderModifierTags(tags) {
    if (!tags) return '';
    return tags
        .map(renderModifierTag)
        .filter(x => !!x)
        .join(' ');
}

function convertJSDocPath(path) {
    let result = path;
    if (/module:(\S+?)#(.+)/.test(path)) {
        result =
            '#' +
            encodeURIComponent(path.replace(/module:(\S+?)#(.+)/g, '$1.$2'));
    }
    return result;
}

function renderLinks(str) {
    str = str.replace(
        /{@tutorial\s+(\S+?)[ \|]+(.+?)}/g,
        '<a href="$1">$2</a>'
    );
    str = str.replace(/{@tutorial\s+(\S+?)}/g, '<a href="$1">$1</a>');

    // Link with title
    str = str.replace(
        /{@link\s+(\S+?)[ \|]+(.+?)}/g,
        (match, p1, p2) => `<a href="${p1}">${p2}</a>`
    );
    // Link without title
    str = str.replace(
        /{@link\s+(\S+?)}/g,
        (match, p1) => `<a href="${p1}">${p1}</a>`
    );

    // @linkcode (JSCode compatible path)
    str = str.replace(
        /{@linkcode\s+(\S+?)[ \|]+(.+?)}/g,
        (_match, p1, p2) =>
            `<a href="${convertJSDocPath(p1)}"><code>${p2}</code></a>`
    );

    return str;
}

function renderNotices(str) {
    const content = renderLinks(md.render(str));

    if (/^\*\*(note):?\s*\*\*/i.test(str)) {
        return '\n<div class=".notice--info">' + content + '</div>\n';
    }
    if (/^\*\*(warning):?\s*\*\*/i.test(str)) {
        return '\n<div class=".notice--warning">' + content + '</div>\n';
    }
    if (/^\*\*(danger):?\s*\*\*/i.test(str)) {
        return '\n<div class=".notice--danger">' + content + '</div>\n';
    }
    return content;
}

function escapeYAMLString(str) {
    return str.replace(/([^\\])'/g, "$1\\'");
}

// See https://github.com/microsoft/tsdoc/blob/master/spec/code-snippets/DeclarationReferences.ts
function getURLFromDeclarationReference() {}

function trimQuotes(str) {
    return str.replace(/(^")|("$)/g, '');
}

function trimNewline(str) {
    return str.replace(/(\n+)$/g, '');
}

/**
 *  Main entry point
 *
 */
function makedoc(src, dest, apiName) {
    try {
        api = JSON.parse(fs.readFileSync(src));

        const packages = api.groups.filter(x => x.kind === 1);
        const mainPackage =
            packages &&
            packages[0] &&
            packages[0].children[0] &&
            getReflectionByID(api, packages[0].children[0]);
        const mainPackagedocumentation =
            mainPackage &&
            mainPackage.comment &&
            getTag(mainPackage.comment.tags, 'packagedocumentation');
        const packageName =
            (mainPackagedocumentation && mainPackagedocumentation.text) ||
            apiName ||
            api.name;

        let result = `---
permalink: "/docs/${escapeYAMLString(trimNewline(apiName))}/"
title: "${escapeYAMLString(packageName)}"
read_time: false
layout: "api-layout"
sidebar:
    - nav: "${escapeYAMLString(trimNewline(apiName))}"
# toc: true
---
`;

        if (api.groups) {
            result += api.groups
                .map(x => renderGroup(x, ''))
                .filter(x => !!x)
                .join('\n\n');
        } else {
            // No groups: render all the modules
            result += api.children
                .filter(x => x.kind === 1)
                .map(renderModule)
                .filter(x => !!x)
                .join('\n\n');
        }

        fs.writeFileSync(dest, result);
    } catch (err) {
        console.log(err);
    }
}

const argv = process.argv.slice(2); // @todo: use yargs for argument parsing...
makedoc(argv[0], argv[1], argv[2]);
