FROM bitnami/nginx

COPY public /app
COPY nginx/site.conf /opt/bitnami/nginx/conf/server_blocks/site.conf

EXPOSE 80
