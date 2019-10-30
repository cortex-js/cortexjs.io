
const argv = process.argv.slice(2);
// @todo: use yargs for argument parsing...
const fs = require('fs')

const default_language = 'typescript';
let api = {};

argv.forEach(makedoc);

function makedoc(doc) {
    console.log('Making doc from ' + doc);
    try {
        api = JSON.parse(fs.readFileSync(doc));
  
        const packages = api.groups.filter(x => x.kind === 1);
        const mainPackage = packages && packages[0] && packages[0].children[0] && getReflectionByID(api, packages[0].children[0]);
        const mainPackagedocumentation = mainPackage && mainPackage.comment && getTag(mainPackage.comment.tags, 'packagedocumentation');
        const packageName = (mainPackagedocumentation && mainPackagedocumentation.text) || api.name;

        let result = 
`---
permalink: /docs/${escapeYAMLString(trimNewline(api.name))}
title: ${escapeYAMLString(packageName)}
read_time: false
#toc: true
---
`

        if (api.groups) {
            result += api.groups.map(x => renderGroup(x, '')).filter(x => !!x).join('\n\n');
        } else {
            // No groups: render all the modules
            result += api.children.filter(x => x.kind === 1).map(renderModule).filter(x => !!x).join('\n\n');
        }

        if (!fs.existsSync('docs')) fs.mkdirSync('docs');

        fs.writeFileSync(`docs/${api.name}.md`, result);
        console.log(`Markdown file create at docs/${api.name}.md`);
    } catch(err) {
        console.log(err);
    }
}



function getReflectionByID(from, id) {
    if (from.id === id) return from;
    let result;
    if (from.children) {
        from.children.some(x => {
            result = getReflectionByID(x, id);
            return result !== undefined;
        })
    }
    return result;
}


function renderIndex(xs, parent = '') {
    if (xs.length <= 1) return '';
    if (parent) parent += '.';
    return xs.map(x => ` * [${x.name}()](${'#' + encodeURIComponent(parent + x.name)})`).filter(x => !!x).join('\n');
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
        result += t.types.map(renderShortType).filter(x => !!x).join(' | ');
    } else if (t.type === 'intersection') {
        result += t.types.map(renderShortType).filter(x => !!x).join(' & ');
    } else if (t.type === 'stringLiteral') {
        result += '"' + t.value + '"';
    } else if (t.type === 'tuple') {
        result += '[' + t.elements.map(renderShortType).filter(x => !!x).join(', ') + ']';
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
            result += json.declaration.indexSignature.map(renderIndexSignature).filter(x => !!x).join(';\n');
        }
        if (json.declaration && json.declaration.signatures) {
            result += json.declaration.signatures.map(renderSignature).filter(x => !!x).join('\n');
        }
        if (!result && json.type !== 'reflection') {
            console.log('Unexpected long type', json.type, JSON.stringify(json));
        }
    }
    return result;
}

function renderShortParameter(json) {
    let result = '';
    if (json.flags && json.flags.isRest) {
        result += '...';
    }
    
    result += '_' + json.name + '_';
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
    if (parent) result += '_' + parent + '._.';

    result += '(' + json.parameters.map(renderShortParameter).filter(x => !!x).join(', ') + ')';
    result += ' => ' + renderShortType(json.type);
    return result;
}

/**
 * An index signature is e.g. `[key: string]: any`
 * 
 */
function renderIndexSignature(json, parent = '') {
    let result = '';

    if (parent) result += '_' + parent + '._.';

    result += '\\[';
    result += json.parameters.map(x => x.name + ': ' + renderShortType(x.type)).filter(x => !!x).join(', ');

    result += "\\]: " + renderShortType(json.type);
    return result;
}

/**
 * @param prefix - When the parameter is part of an object, the name of the 
 * parent object, for example when this parameter is a field in an object 
 * literal, the prefix is the name of the object literal.
 * 
 */
function renderLongParameter(json, prefix = '') {
    let result = '';
    if (prefix === '[arguments]') {
        result += '_**' + json.name + '**_';
    } else {
        if (prefix) result += '_' + prefix + '_.';
        result += '**' + json.name + '**';
    }
    if (json.flags && json.flags.isOptional) {
        result += '?';
    }
    const longType = renderLongType(json.type);
    if (longType) result += ': ' + longType;
    result += '\n: ';
    result += renderComment(json.comment, 2);
    result += '\n\n';
    if (json.type.declaration && json.type.declaration.getSignature) {
        result += 'getter'; // @todo something better
    }
    if (json.type.declaration && json.type.declaration.setSignature) {
        result += 'setter'; // @todo something better
    }

    if (json.type.type === 'reflection') {
        // A complex type with "subtypes", e.g. an object literal
        // with multiple properties.
        if (json.type.declaration.children) {
            result += json.type.declaration.children.map(x => renderLongParameter(x, json.name)).filter(x => !!x).join('\n');
        }
        if (json.type.declaration.indexSignature) {
            result += json.type.declaration.indexSignature.map(x => renderIndexSignature(x, json.name)).filter(x => !!x).join('\n');
        }
    }

    return result;
}




function renderFunctionSignature(s, parent = '') {
    if (parent) parent += '.';
    let result = '\n<h3 ';
    result += `id="${encodeURIComponent(parent + s.name)}" `;
    if (typeof getTag(s.comment.tags, 'deprecated') !== 'undefined') result += 'class="deprecated" ';
    result += 'markdown="1">function ';
    result += parent + '**' + s.name + '**(';
    if (s.parameters) {
        result += s.parameters.map(renderShortParameter).filter(x => !!x).join(',\n    ');
    }

    result += ')';

    const resultType = renderShortType(s.type);
    if (resultType) result += ': ' + resultType

    result += '</h3>\n';

    result += renderComment(s.comment) + '\n';

    if (s.parameters) {
        result += s.parameters.map(x => renderLongParameter(x, '[arguments]')).filter(x => !!x).join('\n');
    }

    if (s.type) {
        result += '\n→: ' + resultType;
        result += '\n:  ';
        if (s.comment && s.comment.returns) {
            result += (trimNewline(s.comment.returns.trim()) || '');
        }
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
    let result = '\n<section class="card" markdown="1">\n';
    result += renderFlags(json.flags);

    result += json.signatures.map(sig => renderFunctionSignature(sig, parent)).filter(x => !!x).join('\n\n');
    result += '\n</section>\n';

    return result;
}

function renderClass(json) {
    let result = '\n<h2 id="' + encodeURIComponent('class:' + json.name) + '" markdown="1">';
    result += '_Class_ **' + json.name + '**</h2>';
    // json.comment.tags: properties of the class
    // json.children (kind === 1024): properties

    if (json.extendedTypes) {
        result +=  '<span class="tag-name">Extends</span>' + '\n:  ';
        result +=  json.extendedTypes.map(renderShortType).filter(x => !!x).join(', ');
    }

    if (json.implementedTypes) {
        result +=  '<span class="tag-name">Implements</span>' + '\n:  ';
        result +=  json.implementedTypes.map(renderShortType).filter(x => !!x).join(', ');
    }

    if (json.extendedBy) {
        result +=  '<span class="tag-name">Extended By</span>' + '\n:  ';
        result +=  json.extendedBy.map(renderShortType).filter(x => !!x).join(', ');
    }
    
    if (json.implementedBy) {
        result +=  '<span class="tag-name">Implemented By</span>' + '\n:  ';
        result +=  json.implementedBy.map(renderShortType).filter(x => !!x).join(', ');
    }

    // Look for all the methods (kind = 2048) in the class, grouped by categories    
    const categories = getCategories(json, 2048);

    result += '\n<section class="tsd-index-list" markdown="1">';
    // Generate index of the methods, grouped by categories
    result += categories.map(category => {
        return '\n\n### ' + category.title + '\n\n' + 
            renderIndex(category.children, json.name);
    }).filter(x => !!x).join('\n');

    result += '\n</section>\n';

    result += categories.map(category => {
        let r = '';
        if (category.title) {
            r += `\n## _class ${json.name}_ `;
            r += category.title + '\n{:.category-title}';
        }
        r += category.children.map(x => renderFunction(x, json.name)).filter(x => !!x).join('\n');
        // r += category.children.map(x => x.signatures.map(sig => renderFunctionSignature(sig, json.name + '.'))).filter(x => !!x).join('\n');
        return r;
    }).join('');
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
        result = children[0].categories.map(category => { return {
                title: category.title,
                children: getChildrenByID(json, category.children)
            }
        });
        result = sortOtherCategoryAtEnd(result);
    } else {
        // No categories, return all the children of the specified kind
        result = [{
            title: '',
            children: getChildrenByID(json, children[0].children)
        }];
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
    let result = '\n<section class="card" markdown="1">\n';
    result += '\n### declare type **' + json.name + '**';
    const type = renderLongType(json.type);
    if (type) result += ' = ' + type;
    result += '\n\n';

    result += renderComment(json.comment);

    if (!type && json.type.declaration.children) {
        result += json.type.declaration.children.map(x => renderLongParameter(x, '')).filter(x => !!x).join('\n');
        // result += renderLongType(json.type);
    }

    result += '\n</section>\n';
    return result;
}

function renderModule(json) {
     let result = '\n<h2 id="' + encodeURIComponent('module:' + trimQuotes(json.name)) + '" markdown="1">';
    result += '_Module_ **' + trimQuotes(json.name) + '**</h2>\n';

    result += renderComment(json.comment) + '\n';

    if (json.groups) {
        result += json.groups.map(x => renderGroup(x, trimQuotes(json.name))).filter(x => !!x).join('\n\n');
    } else {
        // Index of the functions (kind 64) in the module
        const entries = json.children.filter(x => x.kind === 64);

        result += '\n' + renderIndex(entries, trimQuotes(json.name) + '.') + '\n{:.tsd-index-list}\n';

        result += entries.map(x => x.signatures.map(sig => renderFunctionSignature(sig, trimQuotes(json.name) + '.'))).filter(x => !!x).join('\n');
    }


    return result;
}

/**
 * The top level package (somewhat confusingly)
 */
function renderExternalModule(json) {
    return renderComment(json.comment) + '\n' + 
        json.groups.map(x => renderGroup(x, '')).filter(x => !!x).join('\n\n');;
}



function renderGroup(group, parent) {
    // See https://github.com/TypeStrong/typedoc/blob/master/src/lib/models/reflections/abstract.ts
    // for a list of the possible group kinds
    let result = '';

    switch (group.kind) {
        case 0:         // Global
            // Never in a group
            break;

        case 1:         // External Modules (group of modules, top-level)
            result += group.children.map(x => renderExternalModule(getReflectionByID(api, x))).filter(x => !!x).join('\n\n');
            break;

        case 2:         // Module
            result += group.children.map(x => renderModule(getReflectionByID(api, x))).join(''); 
            break;

        case 4:         // Enum
        case 16:        // Enum Member
        case 32:        // Variable
            break;

        case 64:        // Functions
            result += '\n<h2 id="' + encodeURIComponent('functions:' + (parent || 'global')) + '" markdown="1">';
            result += parent ? `_module ${parent}_ ` : '_Global_ ';
            result += 'Functions</h2>';
            const categories = getCategories(group, 64);

            result += '\n<section class="tsd-index-list" markdown="1">';
            result += categories.map(category => {
                const children = category.children.map(x => getReflectionByID(api, x));
                return '\n\n### ' + category.title + '\n\n' + 
                    renderIndex(children, parent);
            }).filter(x => !!x).join('\n');
            result += '\n</section>\n';

            result += categories.map(category => {
                let r = '';
                if (category.title) r += `\n## ${category.title} \n{:.category-title}`;
                const children = category.children.map(x => getReflectionByID(api, x));
                r += children.map(x => renderFunction(x, parent)).filter(x => !!x).join('\n');
                return r;
            }).join('');


            // result += children.map(x => renderFunction(x, parent)).join(''); 
            break;

        case 128:       // Classes
            result += group.children.map(x => renderClass(getReflectionByID(api, x))).join('');
            break;

        case 256:       // Interface
        case 512:       // Constructor
        case 1024:      // Property
        case 2048:      // Method
        case 4096:      // Call signature
        case 8192:      // Index signature
        case 16384:     // Constructor signature
        case 32768:     // Parameter
        case 65536:     // Type literal
        case 131072:    // Type parameter
        case 262144:    // Accessor
        case 524288:    // Get signature
        case 1048576:   // Set signature
        case 2097152:   // Object literal
            break;


        case 4194304:   // Type Aliases
            result += '\n<h2 id="' + encodeURIComponent('typealias:' + (parent || 'global')) + '" markdown="1">';
            result += parent ? `_module ${parent}_ ` : '_Global_ ';
            result += 'Types</h2>\n';
            result += group.children.map(x => renderTypeAliases(getReflectionByID(api, x))).join(''); 
            break;
        
        case 8388608:   // Event
            break;

        default: 
            result += "\n## " + 
                group.kind + ' ' + 
                group.title + ' ' + 
                "\n" + 
                "children" + group.children.length + '\n';
    }

    return result + "\n";
}

function renderComment(comment, indent = 0) {
    if (!comment) return '';
    let result = '';
    let newLine = '\n' + " ".repeat(indent);

    const modifierTags = renderModifierTags(comment.tags);
    if (modifierTags) result += newLine + modifierTags + newLine + newLine;

    if (comment.shortText) {
        result += renderLinks(comment.shortText) + newLine + newLine;
    }
    if (comment.text) {
        result += comment.text.split('\n\n').map(renderNotices).filter(x => !!x).join(newLine + newLine) + newLine;
    }
    const remarks = getTag(comment.tags, 'remarks');
    if (remarks) {
        result += remarks.text.split('\n\n').map(renderNotices).filter(x => !!x).join(newLine + newLine) + newLine;
    }

    if (comment.tags && comment.tags.length > 0) {
        result += newLine + comment.tags.filter(x => !/^(module|method|function|remarks)$/.test(x.tag)).map(renderTag).filter(x => !!x).join(newLine + newLine) + newLine;
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
            result += '**Method:** ' + text;
            break;
        case 'module':
            result += '**Module:** ' + text;
            break;
        case 'function':
            result += '**Function:** ' + text;
            break;
        case 'example':
            result += `\`\`\`${default_language || 'typescript'}\n${text}` + '\n\`\`\`\n';
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
                if (/^(eventProperty|override|packageDocumentation|public|readonly|sealed|virtual)$/i.test(tag.tag)) {
                    // Add a notice style
                    result += '<section class="notice--info" markdown="1">\n';
                    result += '#### ' + tag.tag + '\n\n' + text; 
                    result += '\n</section>'
                } else if (/^(alpha|beta|experimental)$/i.test(tag.tag)) {
                    // Add a notice style
                    result += '<section class="notice--warning" markdown="1">\n';
                    result += '#### ' + tag.tag + '\n\n' + text; 
                    result += '\n</section>'
                } else if (/^(deprecated|internal)$/i.test(tag.tag)) {
                    // Add a notice style
                    result += '<section class="notice--danger" markdown="1">\n';
                    result += '#### ' + tag.tag + '\n\n' + text; 
                    result += '\n</section>'
                } else {
                    result +=  '<span class="tag-name">' + tag.tag + '</span>' + '\n:  ' + text; 
                }
            } else if (!/alpha|beta|deprecated|eventProperty|experimental|internal|override|packageDocumentation|public|readonly|sealed|virtual/i.test(tag.tag)) {
                result += '**' + tag.tag + '**';
                
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
        "eventProperty": "event",
        "override": "override",
        // "packageDocumentation": "packageDocumentation",
        "public": "public",
        "readonly": "Read Only",
        "sealed": "sealed",
        "virtual": "virtual"
    }[json.tag];

    const redModifierTag = {
        "deprecated": "deprecated",  // This is a block tag
        "internal": "internal",
    }[json.tag];

    const orangeModifierTag = {
        "alpha": "alpha",
        "beta": "beta",
        "experimental": "experimental",
    }[json.tag];

    if (modifierTag) {
        result += '*' + modifierTag + '*{: .modifier-tag}';
    } else if (redModifierTag) {
        result += '*' + redModifierTag + '*{: .red.modifier-tag}';
    } else if (orangeModifierTag) {
        result += '*' + orangeModifierTag + '*{: .orange.modifier-tag}';
    }
    return result;
}

function renderModifierTags(tags) {
    if (!tags) return '';
    return tags.map(renderModifierTag).filter(x => !!x).join(' ');
}

function convertJSDocPath(path) {
    let result = path;
    if (/module:(\S+?)#(.+)/.test(path)) {
        result = '#' + encodeURIComponent(path.replace(/module:(\S+?)#(.+)/g, '$1.$2'));
    }
    return result;
}

function renderLinks(str) {
    str = str.replace(/{@tutorial\s+(\S+?)[ \|]+(.+?)}/g, '[$2]($1)');
    str = str.replace(/{@tutorial\s+(\S+?)}/g, '[$1]($1)');

    // Link with title
    str = str.replace(/{@link\s+(\S+?)[ \|]+(.+?)}/g, (match, p1, p2) => `[${p2}](${p1})`);
    // Link without title
    str = str.replace(/{@link\s+(\S+?)}/g, (match, p1) => `[${p1}](${p1})`);

    // @linkcode (JSCode compatible path)
    str = str.replace(/{@linkcode\s+(\S+?)[ \|]+(.+?)}/g, (match, p1, p2) => `[\`${p2}\`](${convertJSDocPath(p1)})`);

    return str;
}

function renderNotices(str) {
    str = renderLinks(str);

    if (/^\*\*(note):?\s*\*\*/i.test(str)) {
        return str + '\n{: .notice--info}'
    }
    if (/^\*\*(warning):?\s*\*\*/i.test(str)) {
        return str + '\n{: .notice--warning}'
    }
    if (/^\*\*(danger):?\s*\*\*/i.test(str)) {
        return str + '\n{: .notice--danger}'
    }
    return str;
}

function  escapeYAMLString(str) {
    return str.replace(/([^\\])'/g, '$1\\\'');
}

// See https://github.com/microsoft/tsdoc/blob/master/spec/code-snippets/DeclarationReferences.ts
function getURLFromDeclarationReference() {
}

function trimQuotes(str) {
    return str.replace(/(^")|("$)/g, '');
}

function trimNewline(str) {
    return str.replace(/(\n+)$/g, '');
}