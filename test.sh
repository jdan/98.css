#!/bin/sh

npm run build
output=$( git diff build docs )

if [ -z "$output" ]
then
    break
else
    echo "Please commit the latest build of 98.css (git commit)"
    exit 1;
fi
