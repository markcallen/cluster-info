FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json /app 
RUN npm install --freeze-lockfile

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev --ignore-scripts

COPY --from=build /app/dist ./dist
COPY server ./server
COPY tsconfig.server.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npx", "tsx", "server/index.ts"]
