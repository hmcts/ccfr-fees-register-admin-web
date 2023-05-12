FROM hmctspublic.azurecr.io/base/node:14-alpine as base

USER root
RUN corepack enable
USER hmcts

ENV WORKDIR /opt/app
WORKDIR ${WORKDIR}

COPY --chown=hmcts:hmcts package.json yarn.lock server.js gulpfile.js tsconfig.json ./
RUN yarn workspaces focus --all --production && yarn cache clean

# ---- Build image ----
FROM base as build
COPY --chown=hmcts:hmcts . ./
RUN yarn install && yarn setup

# ---- Runtime image ----
FROM base as runtime

COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/src/main src/main/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/config config/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/types types/

EXPOSE 3000
CMD [ "yarn", "start" ]
