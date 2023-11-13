#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

export BASENAME="\033[40m Cortexjs.io \033[0;0m " # `basename "$0"`

export DOT="\033[32m 羽 \033[0;0m" # Hourglass
export CHECK="\033[32m ✔ \033[0;0m"
export LINECLEAR="\033[1G\033[2K" # position to column 1; erase whole line
export ERROR="\033[31;7m ERROR \033[0;0m"

# Read the first argument, set it to "dev" if not set
ENVIRONMENT="${1-dev}"

# Remove the CNAME file, which is used
# to indicate if this is a production or development build
[ -f "./submodules/cortex-js.github.io/CNAME" ] && rm "./submodules/cortex-js.github.io/CNAME"

mkdir -p ./build
mkdir -p ./src/build

if [ "$ENVIRONMENT" == "playground" ]
then
    echo -e "$BASENAME$DOT Building playground"
    npm --prefix submodules/code-playground run dist
    echo -e "$BASENAME$CHECK Playground built"
    cp ./submodules/code-playground/dist/code-playground.min.js ./submodules/cortex-js.github.io/assets/js/code-playground.min.js
    cp ./submodules/code-playground/dist/code-playground.js ./submodules/cortex-js.github.io/assets/js/code-playground.js
    exit 0;
fi

if [ "$ENVIRONMENT" != "watch" ]
then

  ## Copy submodules
  printf "$BASENAME$DOT Copying submodules"
  mkdir -p ./submodules/cortex-js.github.io/assets/js/
  cp ./submodules/code-playground/dist/code-playground.min.js ./submodules/cortex-js.github.io/assets/js/code-playground.min.js
  cp ./submodules/code-playground/dist/code-playground.js ./submodules/cortex-js.github.io/assets/js/code-playground.js
  echo -e "$LINECLEAR$BASENAME$CHECK Submodules copied"


  ## Grok (.d.ts -> .html with frontmatter)
  # Uses grok.config.js for additional config option

  # echo -e "$BASENAME$DOT Groking MathLive"
  # npx grok build ../mathlive --inFile ./src/mathlive.ts --config ./grok.config.js --sdkName mathlive --outDir ./src/build/ --outFile mathlive.html

  # echo -e "$BASENAME$DOT Groking MathJSON"
  # npx grok  ./submodules/compute-engine/src/latex-syntax/public.ts --sdkName math-json --outDir ./src/build/ --outFile math-json.html

  echo -e "$BASENAME$DOT Groking Compute Engine"
  # npm --prefix ./submodules/compute-engine run build
  # npx grok build ./submodules/compute-engine/ --inFile ./src/compute-engine.ts --config ./grok.config.js --sdkName compute-engine --outDir ./src/build/ --outFile compute-engine.html

  # Copy the MathLive and Compute Engine HTML files to the build directory, needed for the knowledge base
  # cp ./src/build/mathlive.html ./build/mathlive.html 2>/dev/null  || :
  # cp ./src/build/compute-engine.html ./build/compute-engine.html 2>/dev/null  || :

  echo -e "$BASENAME$CHECK Groked"

  # Copy the ChangeLogs
  mkdir -p ./src/build/compute-engine/
  cp ./src/_data/_compute-engine-changelog.md ./src/build/compute-engine/changelog.md
  cat ./submodules/compute-engine/CHANGELOG.md >> ./src/build/compute-engine/changelog.md

  mkdir -p ./src/build/mathlive/
  cp ./src/_data/_mathlive-changelog.md ./src/build/mathlive/changelog.md
  cat ../mathlive/CHANGELOG.md >> ./src/build/mathlive/changelog.md
fi

## Copy MathLive library
# echo "Copying MathLive Library"
# mkdir ./src/build/js/
# cp ../mathlive/dist/mathlive.mjs ./src/build/js/

## Build the Compute Engine guides from the source directories
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
    echo -e "$BASENAME$CHECK Static site built."
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

    echo -e "$LINECLEAR$BASENAME$DOT Building Knowledge Base"

    # Build the knowledge base

    current_dir=$(pwd)

    output_file="./build/kb-compute-engine.md"
    pattern='./submodules/compute-engine/src/docs/*.md'

    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi

    touch "$output_file"

    while IFS= read -r -d '' file; do
        echo "Processing $file"
        cat "$file" >> "$output_file"
    done < <(find $(dirname "$pattern") -name "$(basename "$pattern")" -print0)


    output_file="./build/kb-compute-engineapi.d.ts"
    pattern='./submodules/compute-engine/dist/types/**/*.d.ts'

    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi

    touch "$output_file"

    while IFS= read -r -d '' file; do
        echo "Processing $file"
        cat "$file" >> "$output_file"
    done < <(find $(dirname "$pattern") -name "$(basename "$pattern")" -print0)


    output_file="./build/kb-mathlive.md"
    pattern='./src/_pages/*.md'

    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi

    touch "$output_file"

    while IFS= read -r -d '' file; do
        echo "Processing $file"
        cat "$file" >> "$output_file"
    done < <(find $(dirname "$pattern") -name "$(basename "$pattern")" -print0)


    output_file="./build/kb-mathlive-api.d.ts"
    pattern="$(dirname "$current_dir")/mathlive/dist/types/**/*.d.ts"

    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi

    touch "$output_file"

    while IFS= read -r -d '' file; do
        echo "Processing $file"
        cat "$file" >> "$output_file"
    done < <(find $(dirname "$pattern") -name "$(basename "$pattern")" -print0)



    echo -e "$BASENAME$CHECK Knowledge Base built"

    echo -e "$LINECLEAR$BASENAME$CHECK Completed build"
fi
