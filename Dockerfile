FROM nginx:1.12-alpine

COPY public /usr/share/nginx/html

EXPOSE 80
