FROM node:20
ENV PORT 8080 
ENV HOST 0.0.0.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]