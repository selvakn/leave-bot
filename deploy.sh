#!/usr/bin/env sh

set -e

yarn test
yarn webpack
claudia update --configure-slack-slash-command