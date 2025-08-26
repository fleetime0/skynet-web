#!/usr/bin/env sh
set -e

: "${STREAM_URL:=http://127.0.0.1:8000/}"
: "${ROS_BRIDGE_URL:=ws://127.0.0.1:9090/}"

cat >/usr/share/nginx/html/config.js <<'EOF'
window.__APP_CONFIG__ = {
  STREAM_URL: "${STREAM_URL}",
  ROS_BRIDGE_URL: "${ROS_BRIDGE_URL}"
};
EOF

envsubst < /usr/share/nginx/html/config.js > /usr/share/nginx/html/config.js.tmp && \
mv /usr/share/nginx/html/config.js.tmp /usr/share/nginx/html/config.js

exec "$@"