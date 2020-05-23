FROM node:12.16.3

# Create app directory
RUN npm install nodemon -g

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD nodemon server.js