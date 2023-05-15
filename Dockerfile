FROM node:18-alpine

RUN mkdir -p /var/app
# Copy NodeJS App to container
COPY . /var/app
WORKDIR /var/app
RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run build

ENV TZ=UTC
ENV NODE_ENV=production

EXPOSE 9999
CMD node /var/app/dist/main.js