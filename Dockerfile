FROM node:12.18.0-alpine
WORKDIR /usr/src/app
RUN npm install -g firebase-tools
RUN yarn install
CMD ["/bin/ash"]