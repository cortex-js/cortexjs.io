#!/bin/bash

# scripts/restart.sh
# Restart the server, without doing a build

set -e

cd "$(dirname "$0")/.."

# boot the app and any other necessary processes.
# foreman start -p 9393
bundle exec jekyll serve