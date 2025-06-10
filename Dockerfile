ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --omit=dev && npm cache clean --force

COPY . .
RUN npm run build

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=build /app .

EXPOSE ${PORT}

CMD  ["npm", "run", "start:migrate"]