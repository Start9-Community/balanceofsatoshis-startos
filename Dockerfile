FROM node:lts-alpine

ARG BOS_VERSION=20.1.3

RUN apk add --no-cache --upgrade bash

ENV BOS_DEFAULT_SAVED_NODE=embassy

RUN npm install -g balanceofsatoshis@${BOS_VERSION}

WORKDIR /root
