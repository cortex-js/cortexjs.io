#!/bin/sh

# scripts/test.sh
# Run test suite for application. Optionally pass in a path to an
# individual test file to run a single test.


set -e

cd "$(dirname "$0")/.."

[ -z "$DEBUG" ] || set -x

RACK_ROOT="$(cd "$(dirname "$0")"/.. && pwd)"
export RACK_ROOT

if [ "$RAILS_ENV" = "test" ] || [ "$RACK_ENV" = "test" ]; then
  # if executed and the environment is already set to `test`, then we want a
  # clean from scratch application. This almost always means a ci environment,
  # since we set the environment to `test` directly in `scripts/cibuild`.
  scripts/setup.sh
else
  # if the environment isn't set to `test`, set it to `test` and update the
  # application to ensure all dependencies are met as well as any other things
  # that need to be up to date, like db migrations. The environment not having
  # already been set to `test` almost always means this is being called on its
  # own from a `development` environment.
  export RAILS_ENV="test" RACK_ENV="test"

  scripts/update.sh
fi

# **NOTE**: If getting an error while attempting
# to run htmlproofer on Windows, you may need to manually
# install the libcurl library.
# 1. Download curl from here: https://curl.haxx.se/windows/
# 2. Expand the zip package
# 3. Copy bin/libcurl-x64.dll to C:\Ruby26-x64\bin
# 4. Rename it to libcurl.dll

# # Options for htmlproofer: https://github.com/gjtorikian/html-proofer
# bundle exec htmlproofer ./submodules/cortex-js.github.io \
#   --assume_extension \
#   --allow-hash-href \
#   --only_4xx \
#   --check_html \
#   --url-ignore "/*/" \
#   --checks_to_ignore \
#   --directory_index_file index.html \
#   --internal-domains localhost:4000 \
#   --assume-extension \
#   --empty-alt-ignore \
#   --disable-external || true

