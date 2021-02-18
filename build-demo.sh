#!/usr/bin/env bash

# build the app and copy to 'demo' folder

yarn build \
    && rm -Rf demo \
    && cp -R build demo
