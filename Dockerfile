# stage 1 -
FROM node:12.13.0-alpine as vue-build
WORKDIR /app
COPY ./package.json /app
RUN npm install

COPY . /app
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=vue-build /app/build /usr/share/nginx/html
RUN chown nginx:nginx /var/www/html

CMD ["nginx", "-g", "daemon off;"]
