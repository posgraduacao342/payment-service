FROM node:18-alpine

WORKDIR /app

RUN npm install yarn

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
