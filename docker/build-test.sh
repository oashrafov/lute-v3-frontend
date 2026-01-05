#!/bin/sh

docker build -f docker/Dockerfile . -t lute3-frontend-test && \
docker run -d --rm --name lute3-frontend-test-container -p 1007:1007 lute3-frontend-test