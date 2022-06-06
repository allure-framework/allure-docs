FROM bitnami/nginx:latest

COPY config/docs.conf /opt/bitnami/nginx/conf/server_blocks/docs.conf
COPY public /app

EXPOSE 80
