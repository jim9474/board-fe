FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["npm","run","dev","--","--host","0.0.0.0"]
# CMD ["serve","-s","dist","-l","3000"]