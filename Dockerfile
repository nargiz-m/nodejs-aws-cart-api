# build stage
FROM node:18-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --production && npm install rimraf --save-dev && npm cache clean --force

COPY . .
RUN npm run build

# production stage
FROM node:18-alpine

COPY --from=build /app/package*.json ./
RUN npm ci --production && npm cache clean --force
COPY --from=build /app/dist ./dist

ENV POSTGRES_HOST=rds-cart-database.ctkec2qgkb7l.us-east-1.rds.amazonaws.com
ENV POSTGRES_USERNAME=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DATABASE=postgres

USER node
EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]