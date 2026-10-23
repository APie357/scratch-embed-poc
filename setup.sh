#!/usr/bin/env bash

rm ./static/tw
git clone https://github.com/TurboWarp/scratch-gui
cd ./scratch-gui || exit 1
  git checkout v5.3.0
  git apply ../patches/*
  npm ci --allow-git=all
  NODE_ENV=production ROOT=/tw/ npm run build
cd ..

mkdir -p ./static/tw
cp -r ./scratch-gui/build/* ./static/tw/
rm -rf ./scratch-gui
