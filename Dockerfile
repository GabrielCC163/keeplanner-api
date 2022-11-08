# image
FROM node:latest

# create dir inside docker
WORKDIR /usr/app 

# copy package.json
COPY package.json ./

# install dependencies
RUN yarn

# copy everything else to docker
COPY . .

# access port
EXPOSE 3000

# start
CMD ["yarn", "dev"]