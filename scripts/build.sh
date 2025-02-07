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

# Make the Changelog and API files
echo -e "$BASENAME$DOT Making the changelog and API files"
# @todo

#
# Copy the ChangeLogs
#

cp ./docs/compute-engine/_changelog.md ./docs/compute-engine/changelog.md
cat ../compute-engine/CHANGELOG.md >> ./docs/compute-engine/changelog.md
# Add "</ChangeLog>" to the end of the file
echo "</ChangeLog>" >> ./docs/compute-engine/changelog.md
# Replace [Unreleased] with Coming Soon
sed -i '' 's/\[Unreleased\]/Coming Soon/g' ./docs/compute-engine/changelog.md

cp ./docs/mathfield/_changelog.md ./docs/mathfield/changelog.md
cat ../mathlive/CHANGELOG.md >> ./docs/mathfield/changelog.md
# Add "</ChangeLog>" to the end of the file
echo "</ChangeLog>" >> ./docs/mathfield/changelog.md
# Replace [Unreleased] with Coming Soon
sed -i '' 's/\[Unreleased\]/Coming Soon/g' ./docs/mathfield/changelog.md

#
# Copy the API files
#

cp ./docs/mathfield/_api.md ./docs/mathfield/api.md
cat ../mathlive/src/api.md >> ./docs/mathfield/api.md

cp ./docs/compute-engine/_api.md ./docs/compute-engine/api.md
cat ../compute-engine/src/api.md >> ./docs/compute-engine/api.md


#
# Build Docusaurus (.md -> .html)
#
echo -e "$BASENAME$DOT Building Docusaurus"
npx docusaurus build
echo -e "$BASENAME$CHECK Docusaurus built"




if [ "$ENVIRONMENT" == "production" ]
then
    printf "$BASENAME$DOT Making a production build"
    sync
    # npx html-minifier-terser \
    #     --config-file "./config/html-minifier.json" \
    #     --file-ext html \
    #     --input-dir "./submodules/cortex-js.github.io/" \
    #     --output-dir "./submodules/cortex-js.github.io/"
    # postcss --config "./config" --replace "./submodules/cortex-js.github.io/**/*.css"

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

    # Copy build directory to submodules/cortex-js.github.io
    echo -e "$BASENAME$DOT Copying build directory to submodules/cortex-js.github.io"
    cp -r ./build/* ./submodules/cortex-js.github.io/
    echo -e "$BASENAME$CHECK Copied build directory to submodules/cortex-js.github.io"


    echo -e "$LINECLEAR$BASENAME$CHECK Completed build"
fi
