FROM hmctspublic.azurecr.io/base/node:14-alpine as base

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts package.json yarn.lock  server.js gulpfile.js tsconfig.json ./
RUN yarn install --prefer-offline --ignore-optional --network-timeout 1200000 \
  && yarn cache clean

# ---- Build image ----
FROM base as build
COPY --chown=hmcts:hmcts . ./
RUN yarn setup \
  && yarn install --prefer-offline --ignore-optional --network-timeout 1200000

# ---- Runtime image ----
FROM base as runtime

COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/src/main src/main/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/config config/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/types types/

EXPOSE 3000
CMD [ "yarn", "start" ]
