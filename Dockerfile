# generate the docker file for the vite frontend

FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

ENTRYPOINT ["npm", "start"]