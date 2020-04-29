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

## Grok (.d.ts -> .html with frontmatter)
node ./submodules/grok/bin/grok-cli  ./node_modules/mathlive/dist/mathlive.d.ts --apiName mathlive --outDir ./src/build/ --outFile mathlive.html


## Build (.md -> .html)
# DEBUG=Eleventy* npx eleventy --config ./config/eleventy.js
npx eleventy --config ./config/eleventy.js

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
