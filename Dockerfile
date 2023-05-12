FROM hmctspublic.azurecr.io/base/node:14-alpine as base

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts config ./config
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml tsconfig.json ./

RUN yarn workspaces focus --all --production && yarn cache clean

# ---- Build image ----
FROM base as build
COPY --chown=hmcts:hmcts . ./
RUN yarn install && yarn setup

# ---- Runtime image ----
FROM base as runtime

COPY --chown=hmcts:hmcts --from=build $WORKDIR/src/main src/main/
COPY --chown=hmcts:hmcts --from=build $WORKDIR/config config/
COPY --chown=hmcts:hmcts --from=build $WORKDIR/types types/
COPY --chown=hmcts:hmcts --from=build $WORKDIR/server.js $WORKDIR/tsconfig.json ./

EXPOSE 3000
CMD [ "yarn", "start" ]
