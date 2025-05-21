#!/bin/bash

if [ ! -f .env ] && [ -f .env.example ] ; then
    cp .env.example .env
fi

if [ ! -d node_modules ] && [ -f package.json ] ; then
    echo "Running: npm install"
    npm install -g sass
    npm install
fi


# npm run test
echo "Running entrypoint"

# tail -f /dev/null
# By default this project runs the development script.
npm run dev
