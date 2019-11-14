#!/bin/sh

# scripts/update.sh
# Update project to run for its current checkout.

set -e

cd "$(dirname "$0")/.."

./scripts/bootstrap.sh

# Update all the dependent packages
npm update

# Display a list of any packages that may be outside our 
# semver requirements
npm outdated
