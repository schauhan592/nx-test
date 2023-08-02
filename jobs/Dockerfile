FROM node:18

RUN npm i -g pnpm 
COPY ./src /src
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm  i

