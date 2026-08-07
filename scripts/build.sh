#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

export BASENAME="\033[40m mathlive.io \033[0;0m " # `basename "$0"`

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
# Replace arrow shorthand that starts with "<" to avoid MDX JSX parsing
sed -i '' 's/<->/↔/g' ./docs/compute-engine/changelog.md
sed -i '' 's/<-\\>/↔/g' ./docs/compute-engine/changelog.md
# Collapse block-form <sub>...</sub> to inline form. When the <sub> opening tag
# is alone on a line, MDX treats the content as a block and wraps it in a <p>,
# producing invalid <sub><p>...</p></sub> nesting that crashes hydration
# (React #418 + removeChild). Inline form renders <sub>...</sub> with no <p>.
perl -0pi -e 's{<sub>[ \t]*\n}{<sub>}g; s{\n[ \t]*</sub>}{</sub>}g' ./docs/compute-engine/changelog.md
# Collapse newlines inside inline `code`/$math$ spans (hard-wrapped upstream).
# A multi-line inline span makes Docusaurus's MDXCode render a block <pre>,
# which nested in a list-item <p> crashes hydration the same way. See script.
python3 ./scripts/fix-changelog-inline-spans.py ./docs/compute-engine/changelog.md

cp ./docs/mathfield/_changelog.md ./docs/mathfield/changelog.md
cat ../mathlive/CHANGELOG.md >> ./docs/mathfield/changelog.md
# Add "</ChangeLog>" to the end of the file
echo "</ChangeLog>" >> ./docs/mathfield/changelog.md
# Replace [Unreleased] with Coming Soon
sed -i '' 's/\[Unreleased\]/Coming Soon/g' ./docs/mathfield/changelog.md
# Collapse block-form <sub>...</sub> to inline form (see note above).
perl -0pi -e 's{<sub>[ \t]*\n}{<sub>}g; s{\n[ \t]*</sub>}{</sub>}g' ./docs/mathfield/changelog.md
# Collapse newlines inside inline `code`/$math$ spans (see note above).
python3 ./scripts/fix-changelog-inline-spans.py ./docs/mathfield/changelog.md

#
# Copy the API files
#

cp ./docs/mathfield/_api.md ./docs/mathfield/api.md
cat ../mathlive/src/api.md >> ./docs/mathfield/api.md

cp ./docs/compute-engine/_api.md ./docs/compute-engine/api.md
cat ../compute-engine/src/api.md >> ./docs/compute-engine/api.md

# Epsil language docs: authored as Docusaurus MDX in the compute-engine repo
# (src/epsil/docs), synced here verbatim. The presentation shell — sidebar
# entries and the <EpsilPlayground> REPL — lives in this repo.
mkdir -p ./docs/epsil
cp ../compute-engine/src/epsil/docs/*.md ./docs/epsil/

# Epsil syntax highlighting: the highlight.js language definition is
# maintained next to the grammar in the compute-engine repo (and pinned there by
# test/epsil/reserved-words.test.ts), so it is synced rather than reimplemented
# as a Prism grammar. src/theme/CodeBlock/Content adapts its output to the
# Prism token shape Docusaurus renders. The copy is committed so `npm start`
# works without a build.
cp ../compute-engine/src/epsil/highlight-js-mode.js ./src/hljs/epsil-mode.js


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

    # Build the knowledge base
    #
    # The documentation bundles (llms.txt, llms-*.txt) and the per-page raw
    # markdown are emitted by the llms-txt Docusaurus plugin during the build
    # above, which derives them from resolved page metadata rather than by
    # globbing ./docs. The legacy kb-*.md names are kept as copies so the URLs
    # already published at mathlive.io keep resolving.
    #
    # Only the TypeScript declaration bundles are assembled here: they come
    # from the sibling repos' dist output, which the plugin cannot see.

    echo -e "$LINECLEAR$BASENAME$DOT Building Knowledge Base"

    current_dir=$(pwd)

    # The bundle filenames follow the sidebar category labels, so renaming a
    # category in sidebars.js renames its bundle. Warn rather than abort (this
    # runs under `set -e`): a stale alias should not fail a release.
    copy_kb_alias() {
        if [ -f "./build/$1" ]; then
            cp "./build/$1" "./build/$2"
        else
            echo -e "$BASENAME$ERROR Expected ./build/$1 for legacy alias $2 (sidebar category renamed?)"
        fi
    }

    copy_kb_alias "llms-compute-engine.txt" "kb-compute-engine.md"
    copy_kb_alias "llms-mathfield.txt" "kb-mathlive.md"
    copy_kb_alias "llms-epsil.txt" "kb-epsil.md"
    # The language was renamed from Cortex to Epsil; keep the previously
    # published Cortex URLs resolving.
    copy_kb_alias "llms-epsil.txt" "kb-cortex.md"
    copy_kb_alias "llms-epsil.txt" "llms-cortex.txt"

    output_file="./build/kb-compute-engineapi.d.ts"
    pattern='../compute-engine/dist/types/**/*.d.ts'

    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi

    touch "$output_file"

    while IFS= read -r -d '' file; do
        echo "Processing $file"
        cat "$file" >> "$output_file"
    done < <(find $(dirname "$pattern") -name "$(basename "$pattern")" -print0)


    output_file="./build/kb-mathlive-api.d.ts"
    # MathLive emits its declarations to dist/types, like the Compute Engine.
    # The old ../mathlive/types path no longer exists, and because find runs in
    # a process substitution its failure escapes `set -e` — the result was a
    # 0-byte kb-mathlive-api.d.ts published for months.
    pattern="../mathlive/dist/types/**/*.d.ts"

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
