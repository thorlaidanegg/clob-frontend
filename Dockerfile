# Build the SPA, then serve it with Caddy (which also reverse-proxies /v1 to the
# backend — see Caddyfile). One image, one origin, automatic HTTPS in prod.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# VITE_API_URL defaults to "" (same-origin) — correct when Caddy proxies /v1 on
# this same domain. Override only for a split (CDN frontend + remote API) deploy.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
