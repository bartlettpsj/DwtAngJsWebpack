#!/usr/bin/env bash
rm -rf dist && \
node_modules/.bin/webpack --config webpack.production.js \
        --bail \
        --verbose \
        --progress \
        --display-error-details
