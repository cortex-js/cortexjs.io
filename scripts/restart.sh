#!/bin/bash

# scripts/restart.sh
# Restart the server, without doing a (full) build

set -e

cd "$(dirname "$0")/.."

# DEBUG=Eleventy* npx eleventy --config ./config/eleventy.js --serve
npx eleventy --config ./config/eleventy.js --serve
