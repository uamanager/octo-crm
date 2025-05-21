FROM node:22.15.1 AS build-env

WORKDIR /build

COPY . .

RUN yarn install --frozen-lockfile && \
    yarn build:prod


FROM node:22.15.1-alpine

WORKDIR /app

COPY --from=build-env /build/apps/server/dist ./
COPY --from=build-env /build/apps/client/dist ./public

RUN yarn install --frozen-lockfile --production

CMD ["node", "/app/main.js"]
