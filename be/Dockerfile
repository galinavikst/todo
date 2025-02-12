# desired version node:<version>
FROM node:22-alpine

WORKDIR /todo-node-nestjs

# what copy - where
COPY package*.json .
RUN npm install

# copy the rest files of app
COPY . .

# application's default port
EXPOSE 4000

# typeorm config variables
ENV DB_PORT=5432 \
    DB_HOST=postgres

RUN command
 
CMD [ "npm", "run", "start:dev" ]