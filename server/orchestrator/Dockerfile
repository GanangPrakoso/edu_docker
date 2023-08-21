FROM node:18.12.1

ENV PORT=4000

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "app.js"]