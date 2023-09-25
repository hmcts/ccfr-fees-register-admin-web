FROM hmctspublic.azurecr.io/base/node:18-alpine as base

USER root
RUN corepack enable
USER hmcts

ENV WORKDIR /opt/app
WORKDIR ${WORKDIR}

COPY --chown=hmcts:hmcts . .
RUN yarn workspaces focus --all --production && yarn cache clean

# ---- Build image ----
FROM base as build
COPY --chown=hmcts:hmcts . .
RUN yarn install --immutable && yarn setup

# ---- Runtime image ----
FROM base as runtime
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/src/main src/main/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/config config/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/types types/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/server.js ${WORKDIR}/tsconfig.json ./

EXPOSE 3000
CMD [ "yarn", "start" ]
