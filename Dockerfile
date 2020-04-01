FROM hmctspublic.azurecr.io/base/node:12-alpine as base

ENV WORKDIR /opt/app
WORKDIR ${WORKDIR}

COPY --chown=hmcts:hmcts package.json yarn.lock  server.js gulpfile.js tsconfig.json ./
RUN yarn install --production  \
    && yarn cache clean

# ---- Build image ----
FROM base as build
COPY --chown=hmcts:hmcts . ./
RUN yarn install && yarn setup

# ---- Runtime image ----
FROM base as runtime

COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/src/main src/main/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/config config/
COPY --chown=hmcts:hmcts --from=build ${WORKDIR}/types types/

RUN ls -ltrh

EXPOSE 3000
CMD [ "yarn", "start" ]
