#!/bin/sh

npm run build
output=$( git diff build )

if [ -z "$output" ]
then
    break
else
    echo "Build doesn't match, wanna run \`npm run build\`?"
    exit 1;
fi
