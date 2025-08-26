FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN apk add --no-cache gettext

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN sed -i 's@try_files \$uri \$uri/ /index.html;@location = /config.js { add_header Cache-Control "no-store"; } \
location / { try_files \$uri \$uri/ /index.html; }@' /etc/nginx/conf.d/default.conf

ENV STREAM_URL=http://127.0.0.1:8000/
ENV ROS_BRIDGE_URL=ws://127.0.0.1:9090/

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]