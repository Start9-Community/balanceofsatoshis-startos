FROM node:lts-alpine

RUN apk add --no-cache --upgrade bash

ENV BOS_DEFAULT_SAVED_NODE=embassy

RUN npm install -g balanceofsatoshis@22.1.7

WORKDIR /root
