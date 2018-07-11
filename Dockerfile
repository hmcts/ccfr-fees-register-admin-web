FROM node:8.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY src/main /usr/src/app/src/main
COPY config /usr/src/app/config
COPY types /usr/src/app/types

COPY gulpfile.js tsconfig.json /usr/src/app/
RUN yarn setup

HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD http_proxy= curl -k --silent --fail https://localhost:3000/health

EXPOSE 3000
CMD [ "yarn", "start" ]
