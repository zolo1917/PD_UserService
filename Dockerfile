FROM node:20-alpine
RUN apk add g++ make py3-pip
WORKDIR /UserService/
COPY package.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]