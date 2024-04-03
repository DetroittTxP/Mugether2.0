FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/ 

RUN npm install

COPY . .

EXPOSE 5353

RUN npm install -g nodemon

CMD ["npm","start"]
