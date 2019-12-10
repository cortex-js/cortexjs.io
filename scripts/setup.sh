#!/bin/sh

# scripts/setup.sh
# Set up the project for the first time after cloning, or set it
# back to the initial first unused state.

set -e

cd "$(dirname "$0")/.."

scripts/clean.sh

scripts/bootstrap.sh
