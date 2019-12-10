#!/bin/bash

# scripts/server.sh: 
# Launch the project and any extra required processes locally.

set -e

cd "$(dirname "$0")/.."

# ensure the project is setup (node packages, etc...)
./scripts/setup.sh

# Make a dev build
./scripts/build.sh dev

# boot the project and any other necessary processes.
# bundle exec jekyll serve
npx eleventy --config ./config/eleventy.js --serve
