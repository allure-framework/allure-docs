FROM nginx:1.12-alpine

COPY build/docs/html5 /usr/share/nginx/html

EXPOSE 80