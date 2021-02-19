#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

# Read the first argument, set it to "dev" if not set
ENVIRONMENT="${1-dev}"

# Remove the CNAME file, which is used
# to indicate if this is a production or development build
[ -f "./submodules/cortex-js.github.io/CNAME" ] && rm "./submodules/cortex-js.github.io/CNAME"

mkdir -p ./build
mkdir -p ./src/build

## Copy submodules
mkdir -p ./submodules/cortex-js.github.io/assets/js/
cp ./submodules/code-playground/dist/code-playground.js ./submodules/cortex-js.github.io/assets/js/code-playground.js


## Grok (.d.ts -> .html with frontmatter)
# Uses grok.config.js for additional config option
# node ./submodules/grok/bin/grok-cli  ./node_modules/mathlive/dist/ --outDir ./src/build/ --outFile mathlive.html
node ./submodules/grok/bin/grok-cli  ../mathlive/dist/public/ --sdkName mathlive --modules mathfield-element options mathlive mathfield commands core --outDir ./src/build/ --outFile mathlive.html
# node ./submodules/grok/bin/grok-cli  ./submodules/math-json/src/public.ts --sdkName mathjson --outDir ./src/build/ --outFile math-json.html
node ./submodules/grok/bin/grok-cli  ./submodules/math-json/src/latex-syntax/public.ts --sdkName mathjson --outDir ./src/build/ --outFile math-json.html
node ./submodules/grok/bin/grok-cli  ./submodules/math-json/src/compute-engine/public.ts --sdkName compute-engine --outDir ./src/build/ --outFile compute-engine.html


## Collect all the guides in the src/ directory
node ./scripts/build-guides.js

## Build (.md -> .html)
# DEBUG=Eleventy* npx eleventy --config ./config/eleventy.js
if [ "$ENVIRONMENT" != "watch" ]
then
    # In watch mode, no need to do a build, the watch call will do it later.
    npx eleventy --config ./config/eleventy.js
fi

if [ "$ENVIRONMENT" == "production" ]
then
    echo "Making a prod build"
    sync
    npx html-minifier-terser \
        --config-file "./config/html-minifier.json" \
        --file-ext html \
        --input-dir "./submodules/cortex-js.github.io/" \
        --output-dir "./submodules/cortex-js.github.io/"
    postcss --config "./config" --replace "./submodules/cortex-js.github.io/**/*.css"

fi
