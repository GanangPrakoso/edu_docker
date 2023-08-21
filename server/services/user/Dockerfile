FROM node:18.12.1

WORKDIR /user

ENV PORT=4001

COPY package.json package-lock.json /user/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD [ "npm", "run", "start" ]