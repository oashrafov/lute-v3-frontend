#!/bin/sh
set -e

VERSION="0.0.1"
REPO="oashrafov/lute3-frontend"

echo
echo "Build and push:"
echo
echo $REPO:$VERSION
echo $REPO:latest
echo

docker build \
  -f docker/Dockerfile \
  --platform linux/amd64,linux/arm64 \
  -t $REPO:$VERSION \
  -t $REPO:latest \
  --push .

echo
echo "Images created and pushed:"
echo
echo $REPO:$VERSION
echo $REPO:latest
echo

