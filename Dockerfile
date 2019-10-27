FROM dev-fintech-hub.cgws.com/library/nginx:1.15-gzip

# COPY default.conf /etc/nginx/conf.d/

COPY ./dist/  /usr/share/nginx/html/stock-realtime-ding

# CMD [ "nginx", "-g", "daemon off;" ]