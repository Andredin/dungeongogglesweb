FROM node:12.14.0-alpine3.9

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

ARG firebase_client_creds
ENV CLIENT_APPLICATION_CREDENTIALS=$firebase_client_creds

COPY webpack.config.js ./
COPY src ./src
COPY public ./public
COPY .babelrc ./

RUN npm run build

COPY dist ./dist

EXPOSE 4280

CMD [ "node", "src/server/index.js" ]