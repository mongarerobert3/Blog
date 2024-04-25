FROM node:18-alpine

RUN apk UPDATE && \
	apk add --no-cache openssh-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev

