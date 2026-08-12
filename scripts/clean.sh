#!/bin/bash

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes
# set -x    # for debuging, trace what is being executed.

cd "$(dirname "$0")/.."

# NOTE: there used to be a line here intending to empty the mathlive.io
# submodule:
#     rm -rf "./submodules/cortex-js.github.io/{*,.*}"
# Brace expansion does not happen inside double quotes, so it only ever tried
# to remove one literal path named `{*,.*}`, and `rm -rf` exits 0 on a missing
# path — it silently did nothing for as long as it existed. It is not restored
# here on purpose: this script runs BEFORE the build (setup.sh -> clean.sh), so
# a working version would empty the deployment target and then, if the build
# failed, leave deploy.sh to commit the deletion of the entire published site.
# Pruning stale files belongs after a successful build, next to the
# `cp -r ./build/*` in build.sh. Until then, files deleted from ./build linger
# in the submodule and stay published.
rm -rf "./build"
rm -rf "./src/build"

# The epsil.dev build. Without this, build-epsil/ is only ever built over in
# place: pages deleted upstream linger and keep being uploaded to Cloudflare,
# and — worse — a failed epsil build still leaves a populated directory with a
# valid index.html, which is all deploy-epsil.sh checks before publishing it as
# if it were fresh. Removing it makes that guard fail closed instead.
rm -rf "./build-epsil"
