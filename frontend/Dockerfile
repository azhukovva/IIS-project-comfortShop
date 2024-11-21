FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

EXPOSE 3000

COPY src ./src
COPY public ./public
COPY tsconfig.json ./tsconfig.json
# COPY .env.development.local ./.env.development.local

CMD ["npm", "start"]