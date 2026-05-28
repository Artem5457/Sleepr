FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY apps/payments/package.json apps/payments/package.json

RUN npm ci

COPY apps/payments apps/payments
COPY libs libs

RUN npm run build payments

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY apps/payments/package.json apps/payments/package.json

RUN npm ci --omit=dev

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]
