FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package.json . 

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]