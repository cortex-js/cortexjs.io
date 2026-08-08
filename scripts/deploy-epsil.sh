#!/bin/bash

# scripts/deploy-epsil.sh
# Publish the standalone epsil.dev site to Cloudflare Pages.
#
# Unlike mathlive.io — which is served by GitHub Pages out of the
# submodules/cortex-js.github.io submodule, so `deploy.sh` publishes by
# committing and pushing — epsil.dev is a Cloudflare Pages project uploaded
# directly with wrangler. Nothing is committed by this script.
#
# First time only:
#   1. `npx wrangler login`
#   2. `npx wrangler pages project create epsil-dev --production-branch master`
#   3. In the Cloudflare dashboard, add `epsil.dev` (and `www.epsil.dev`) as
#      custom domains of the project. Cloudflare issues the certificate;
#      .dev is HSTS-preloaded, so the site is HTTPS-only from the first request.
#
# Usage:
#   npm run stage:epsil    # build into build-epsil/
#   npm run deploy:epsil   # upload build-epsil/ to Cloudflare Pages

set -e  # exit immediately on error
set -o nounset   # abort on unbound variable
set -o pipefail  # don't hide errors within pipes

cd "$(dirname "$0")/.."

PROJECT_NAME="${CF_PAGES_PROJECT:-epsil-dev}"
# Must match the project's production branch, or the upload publishes to a
# preview URL instead of epsil.dev.
BRANCH="${CF_PAGES_BRANCH:-master}"

if [ ! -d "build-epsil" ]; then
    echo "No build-epsil/ directory. Run \"npm run stage:epsil\" first."
    exit 1
fi

if [ ! -f "build-epsil/index.html" ]; then
    echo "build-epsil/ has no index.html; the build looks incomplete."
    exit 1
fi

echo "Deploying build-epsil/ to Cloudflare Pages project \"$PROJECT_NAME\"..."

# _headers and _redirects must sit at the root of the uploaded directory for
# Cloudflare to apply them; they are placed there by static-epsil/.
npx --yes wrangler pages deploy build-epsil \
    --project-name "$PROJECT_NAME" \
    --branch "$BRANCH" \
    --commit-dirty=true

echo "Deployed to https://epsil.dev"
