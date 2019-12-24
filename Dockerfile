# stage 1 -
FROM node:8.15.0-alpine as vue-build
WORKDIR /app
COPY ./package.json /app
RUN npm install

COPY . /app
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine

RUN rm -rf /var/www/html/*
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=vue-build /app/dist /var/www/html
RUN chown nginx:nginx /var/www/html

CMD ["nginx", "-g", "daemon off;"]