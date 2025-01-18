FROM ghcr.io/puppeteer/puppeteer
USER root
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]