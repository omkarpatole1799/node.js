FROM node:20-alpine

COPY package.json . 
COPY package-lock.json . 

RUN npm install 

COPY . .

CMD ['node', 'server.js']