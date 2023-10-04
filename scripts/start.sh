#!/bin/bash

# scripts/start.sh: 
# Launch the project and any extra required processes locally.

set -e

cd "$(dirname "$0")/.."

# ensure the project is setup (node packages, etc...)
./scripts/setup.sh

# Make a watch build
./scripts/build.sh watch

# Start watching the SASS directory
npx sass ./src/_sass:./src/build/css&


# boot the project and any other necessary processes.
npx eleventy --config ./config/eleventy.js --serve
