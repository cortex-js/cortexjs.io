[![Gitter](https://badges.gitter.im/cortex-js/community.svg)](https://cortexjs.io/gitter)
![Maintenance](https://img.shields.io/maintenance/yes/2023)

This repo contains the source files for the "cortexjs.io" website.

# TL;DR

## First time after cloning the project or after making some source changes

```bash
git submodule init

git submodule update

# Setup, make a dev build and start a server
npm start
```

## To update the documentation after a new release

```bash
# Pick-up changes in the dependent modules
npm run update

# Generate .md files for API and launch local server
npm start
```

## To stage and deploy an update

```bash
npm run stage
# Make a clean production build.
# Output goes inside submodules/cortex-js.github.io

npm run restart
# Validate that everything works well in the browser then...

npm run deploy
# submodules/cortex-js.github.io (a git submodule) gets pushed to cortex-js.github.io
```

# Architecture

The site is published using GitHub Pages. The main benefit of using GH Pages is
the workflow integration (pubshing to GH triggers an automatic update of the
site being served)

The content of the sites are authored primarily as Markdown files, processed
with `eleventy` to turn them into HTML/CSS.

The main `eleventy` configuration is in the `config/eleventy.js` file, including
the definition of the Markdown to use.

The Markdown engine is `markdown-it` which implements
[CommonMark](https://spec.commonmark.org/0.29/).

The `mardown-it-attrs` plugin allows the styling of paragraphs, e.g.

This is a notice. {.notice--info}

The `markdown-it-deflist` plugin supports pandc style definition lists:

```
Term 1
:   Definition 1
:   Second definition
```

The output is in the `submodules/cortex-js.github.io` directory. That directory
is a Git **submodule** which is linked to the `cortex-js.github.io` repo. That
repo is the one published by GH Pages (for organization, only an entire repo can
be published, for projects, the contents can be contained in a `/docs`
directory).

See also [submodules](submodules/README.md).

The `cortex-js.github.io` repo must also include two additional files:

- `.nojekyll` which indicates to GitHub that it should not process the content
  of this repo with Jekyll (since this is already the output from Jekyll)
- `CNAME` with a content of `cortexjs.io`

These files are created when running `npm run stage`.

Use the Settings tab in the `cortex-js.github.io` repo to indicate the use of a
custom domain.

In addition, the DNS entries for `cortexjs.io` must include the following:

- a CNAME record that points to `www.cortex-js.io` to `cortex-js.io`
- Four A records that point to
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

# Content

The `npm run build` command generates the documentation for the APIs from the
TypeScript `.d.ts` file into the `build/` directory.

The build process uses the `typedoc` tool to parse the API header files and
output a `json` files in the `build/` directory.

**Note:** To debug the converter, use the VSCode debugger. Select Debug > Start
Debugging to start a debugging session right in VSCode.

The `build-guides` script then converts the `json` file into markdown in the
`./src/build` directory, which can then be processed by eleventy with
`npm run build` or `npm start`.

The CSS styling information is defined in `src/_sass/`.

The API documentation should follow the Google Documentation Style Guide
(https://developers.google.com/style/api-reference-comments) and
https://developers.google.com/style

In addition, the TypeScript code should follow the Google Style Guide:
https://google.github.io/styleguide/jsguide.html#naming

## Setup and scripts

The project follows the
[GitHub standard](https://github.com/github/scripts-to-rule-them-all) for naming
project scripts.

To do a local build:

```bash
npm start
```

To do a build ready to be staged:

```bash
npm run stage
```

## Test

The "testing" of the generated site consist of checking links, and that the
generated HTML is valid.
