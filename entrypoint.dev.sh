#!/bin/sh

set -e;

if [ -e './tsconfig.dev.json' ]
then
  npm run start:debug -- -p ./tsconfig.dev.json;
else
  npm run start:debug
fi

