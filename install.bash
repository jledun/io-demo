#!/bin/bash

echo "Loopback app install : install npm dependencies..." && \
cd io-lbapp/ && \
npm install && \
mkdir -p client && \
touch client/index.html && \
cp ../io-ngfront/src/favicon.ico client/ && \
echo "build Loopback sdk for Angular..." && \
npm run build:sdk && \
echo "Loopback install is complete, we can now install Angular dependencies and build it" && \
cd ../io-ngfront/ && \
echo "Angular app install npm dependencies..." && \
npm install && \
echo "build front end for loopback static web app" && \
npm run build:prod && \
echo "Terminé !" && \
cd ../ && \
echo "You can now try to run 'node io-lbapp/.' and enjoy !"

