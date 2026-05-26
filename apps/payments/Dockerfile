FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:payments

FROM node:alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]