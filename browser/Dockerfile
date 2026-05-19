FROM node:20-alpine AS build

WORKDIR /app

# Copy component library and install its deps (needed for theme.css daisyui resolution)
COPY package.json ./
COPY src ./src
RUN npm install --omit=dev

# Copy browser app and install
COPY browser ./browser
WORKDIR /app/browser
RUN npm install
RUN npm run build

# Serve static files with nginx
FROM nginx:alpine
COPY --from=build /app/browser/build /usr/share/nginx/html

# SPA fallback — route all paths to index.html
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
