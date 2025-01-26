#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

# Make a build

./scripts/setup.sh
# ./scripts/build.sh production
npm run build
./scripts/test.sh

# Add the .nojekyll file to prevent GH Pages from processing the content
touch submodules/cortex-js.github.io/.nojekyll

# Add CNAME file
printf "cortexjs.io" >submodules/cortex-js.github.io/CNAME

