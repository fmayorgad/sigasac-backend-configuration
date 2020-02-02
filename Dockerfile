FROM node:latest

# install pm2
RUN npm install pm2 -g

WORKDIR /opt/sigasac/db
COPY ./db .
RUN npm install && npm run build

WORKDIR /opt/sigasac/utils
COPY ./utils .
RUN npm install && npm run build

WORKDIR /opt/sigasac/configurations
COPY ./configurations .
RUN npm install && npm run build

EXPOSE 3002

CMD ["pm2-dev", "/opt/sigasac/configurations/dist/main.js"]