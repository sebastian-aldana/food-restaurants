FROM node:18-alpine3.17
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

EXPOSE $PORT

COPY . .

RUN npm run build

CMD npm start