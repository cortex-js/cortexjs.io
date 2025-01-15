#!/bin/bash

# scripts/bootstrap.sh 
# Resolve all dependencies that the project requires to run.

set -e

cd "$(dirname "$0")/.."

# If the node_modules have not been installed yet, install them now.
if [ ! -d node_modules ]; then
  npm install
fi

npm --prefix submodules/code-playground run dist

cp ./submodules/code-playground/dist/code-playground.min.js ./submodules/cortex-js.github.io/assets/js/code-playground.min.js
cp ./submodules/code-playground/dist/code-playground.js ./submodules/cortex-js.github.io/assets/js/code-playground.js
