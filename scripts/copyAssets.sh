#!/bin/bash

# Copies static image & font assets (which were copied from the root node_modules folder by webpack)
# into the asset bundle folders to allow relative path references in bundled CSS files to work.

set -euo pipefail

mkdir -p build/bundle/
rsync -a build/bundle/node_modules build/bundle/analysis/
rsync -a build/bundle/node_modules build/bundle/report/
