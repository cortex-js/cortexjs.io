#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

# Get the latest submodule (submodules/cortex-js.github.io)
# git submodule sync --recursive
# git submodule update --init --recursive

# Make a build

./scripts/setup.sh
./scripts/build.sh production
./scripts/test.sh

# Add the .nojekyll file to prevent GH Pages from processing the content
touch submodules/cortex-js.github.io/.nojekyll

# Add CNAME file
printf "cortexjs.io" >submodules/cortex-js.github.io/CNAME

