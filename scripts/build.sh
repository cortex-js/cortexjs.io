#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

export BASENAME="\033[40m"Cortexjs.io"\033[0m" # `basename "$0"`
export DOT="\033[32m ● \033[0m"
export CHECK="\033[32m ✔ \033[0m"
export LINECLEAR="\033[1G\033[2K" # position to column 1; erase whole line
export ERROR="\033[31m ERROR \033[0m"

# Read the first argument, set it to "dev" if not set
ENVIRONMENT="${1-dev}"

# Remove the CNAME file, which is used
# to indicate if this is a production or development build
[ -f "./submodules/cortex-js.github.io/CNAME" ] && rm "./submodules/cortex-js.github.io/CNAME"

mkdir -p ./build
mkdir -p ./src/build

## Copy submodules
printf "$BASENAME$DOT Copying submodules"
mkdir -p ./submodules/cortex-js.github.io/assets/js/
cp ./submodules/code-playground/dist/code-playground.min.js ./submodules/cortex-js.github.io/assets/js/code-playground.min.js
echo -e "$LINECLEAR$BASENAME$CHECK Submodules copied"


## Grok (.d.ts -> .html with frontmatter)
echo -e "$BASENAME$DOT Groking mathlive"
# Uses grok.config.js for additional config option
# node ./submodules/grok/bin/grok-cli  ./node_modules/mathlive/dist/ --outDir ./src/build/ --outFile mathlive.html
node ./submodules/grok/bin/grok-cli  ../mathlive/dist/public/ --sdkName mathlive --modules mathfield-element options mathlive mathfield commands core --outDir ./src/build/ --outFile mathlive.html
# node ./submodules/grok/bin/grok-cli  ./submodules/compute-engine/src/public.ts --sdkName mathjson --outDir ./src/build/ --outFile math-json.html
# echo -e "$BASENAME$DOT Groking MathJSON"
# node ./submodules/grok/bin/grok-cli  ./submodules/compute-engine/src/latex-syntax/public.ts --sdkName math-json --outDir ./src/build/ --outFile math-json.html
echo -e "$BASENAME$DOT Groking Compute Engine"
node ./submodules/grok/bin/grok-cli  ./submodules/compute-engine/src/compute-engine.ts --sdkName compute-engine --outDir ./src/build/ --ignore-errors --outFile compute-engine.html
echo -e "$BASENAME$CHECK Groked"


## Build the guides from the source directories
echo -e "$BASENAME$DOT Building guides"
node ./scripts/build-guides.js  "./submodules/compute-engine/src/" ""
echo -e "$BASENAME$CHECK Guides built"

## Build (.md -> .html)
# DEBUG=Eleventy* npx eleventy --config ./config/eleventy.js
if [ "$ENVIRONMENT" != "watch" ]
then
    # In watch mode, no need to do a build, the watch call will do it later.
    echo -e "$BASENAME$DOT Building static site with eleventy"
    npx eleventy --config ./config/eleventy.js
    echo -e "$BASENAME$CHECK Static site built"
fi

if [ "$ENVIRONMENT" == "production" ]
then
    printf "$BASENAME$DOT Making a production build"
    sync
    # npx html-minifier-terser \
    #     --config-file "./config/html-minifier.json" \
    #     --file-ext html \
    #     --input-dir "./submodules/cortex-js.github.io/" \
    #     --output-dir "./submodules/cortex-js.github.io/"
    postcss --config "./config" --replace "./submodules/cortex-js.github.io/**/*.css"
    echo -e "$LINECLEAR$BASENAME$CHECK Completed build"

fi
