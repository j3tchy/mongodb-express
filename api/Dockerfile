# Using a slim NODE image as the base image
FROM mhart/alpine-node

# Install bash as it's not included in alpine by default
RUN apk update && apk add bash

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

EXPOSE 3000

COPY . /app/

# Make shell script executable
CMD [ "chmod +x ./wait-for-it.sh" ]


