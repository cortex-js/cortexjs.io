## TL;DR

### To update docs after a new release
```shell
npm update          
# This will pick-up changes in the dependent modules
npm run build
npm run server
```

### To stage and deploy an update
```shell
npm run stage       
# output goes inside _site
npm run deploy
# _site (a git submodule) gets pushed to cortex-js.github.io
```


## Architecture

This project contains the source files for the `cortexjs.io` website.

The site is published using GitHub Pages. The main benefit of using GH Pages
is the workflow integration (pubshing to GH triggers an automatic update of the 
site being served)

The content of the sites are authored primarily as Markdown files, processed
with Jekyll to turn them into HTML/CSS. The main configuration is in the 
`_config.yml` file.

The output is in the `_site` directory. That directory is a Git **submodule** 
which is linked to the `cortex-js.github.io` repo. That repo is the one
published by GH Pages (for organization, only an entire repo can be published, 
for projects, the contents can be contained in a `/docs` directory).

See also [submodules](submodules/README.md).

The `cortex-js.github.io` repo must also include two additional files:
- `.nojekyll` which indicates to GitHub that it should not process the content
of this repo with Jekyll (since this is already the output from Jekyll)
- `CNAME` with a content of `cortexjs.io`

These files are created when running `npm run stage`.

Use the Settings tab in the `cortex-js.github.io` repo to indicate the use of
a custom domain.

In addition, the DNS entries for `cortexjs.io` must include the following:
- a CNAME record that points to `www.cortex-js.io` to `cortex-js.io` 
- Four A records that point to 
    - 185.199.108.153
    - 185.199.109.153
    - 185.199.110.153
    - 185.199.111.153


## Content

The `npm run build` command generates the documentation for the APIs 
from the TypeScript `.d.ts` file.

The build process uses the `typedoc` tool to parse the API header files and 
output a `json` files in `_data/mathfield.json`.

**Note:** To debug the converter, use the VSCode debugger. Select Debug > 
Start Debugging to start a debugging session right in VSCode.

The `makdeoc` script then converts the `json` file into markdown in the `docs` folder,
which can then be processed by Jekyll with `script/cibuild` or `script/server`.

The CSS styling information is defined in `_sass/typescript_doc.scss`.

The API documentation should follow the Google Documentation Style Guide
(https://developers.google.com/style/api-reference-comments)
 and https://developers.google.com/style
 
In addition, the Typescript code should follow the Google Style Guide:
https://google.github.io/styleguide/jsguide.html#naming

## Setup and scripts

The project follows the [GitHub standard](https://github.com/github/scripts-to-rule-them-all) for naming project scripts.


Run 

```shell
script/bootstrap
```

On Windows (using PowerShell 7):
```shell
bash script/bootstrap
```

If getting network timeout errors:
```shell
gem install "jekyll" "minimal-mistakes-jekyll"  "jekyll-feed" "jekyll-include-cache"
bundle install
```

To do a local build:
```shell
script/server
```

To do a build ready to be staged:
```shell
script/stage
```

### Test

The "testing" of the generated site consist of checking links, and that the 
generated HTML is valid, using the `html-proofer` gem. 

This require `libcurl`to be installed. Follow these steps:
1. Download curl from here: https://curl.haxx.se/windows/
2. Expand the zip package
3. Copy bin/libcurl-x64.dll to C:\Ruby26-x64\bin
4. Rename it to libcurl.dll

Or use a Mac.


# ARCHIVES


## Setup
1. Install Ruby (https://www.ruby-lang.org/en/documentation/installation/#rubyinstaller)
2. Relaunch Terminal (to get the correct PATH variable)
2. Install Bundler
```bash
$ gem install bundler
$ gem install jekyll -v 3.8.5 # See https://pages.github.com/versions/ for correct version
$ gem update
```
If necessary, try:
```bash
$ gem install jekyll bundler
```

```bash
$ bundle install
$ bundle exec jekyll serve --incremental
```

## Updating
To stay up to date with GitHub:
```
$ bundle update github-pages
```
Also, check https://pages.github.com/versions for updated version of Jekyll, etc..

## Initial creation
Apparently a Gemfile is necessary for jekyll init to work. Try one with this
```
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
```


# TODO
- Add a CI/CD for the documentation. See https://jekyllrb.com/docs/continuous-integration/travis-ci/
- use htmlproofer gem link checking
```

- https://trianglify.io/p/w:1440!h:900!x:Blues!v:0.99!c:0.05!s:gluuoa
- https://trianglify.io/p/w:1440!h:900!x:random!v:0.99!c:0.06!s:gluuoa

## Splash Page Copy

Web Components for scientific exploration.

Math. Graphics. Programming.

A desktop environments tuned for iterative analysis, exploration.

Data visualization, modeling and simulation.

Computational intelligence.

Computational thinking.

Scientific Computing. Understand and solve complex problems.

Numerical analysis, modeling, 

Informatics & Data Science.