FROM node:20-slim
RUN apk add g++ make py3-pip
WORKDIR /UserService/
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 80 443
ENTRYPOINT ["npm", "start"]