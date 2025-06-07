ARG NODE_VERSION=22.15.0

FROM node:${NODE_VERSION}-alpine

RUN mkdir -p '/usr/src/app/'
RUN chown node /usr/src/app/
WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

USER node

COPY . .

EXPOSE 4000

CMD  ["npm", "run", "start:migrate"]

