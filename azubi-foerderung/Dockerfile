FROM nginx:alpine

# Copy custom server configuration (replaces default)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY . /usr/share/nginx/html

# Remove unnecessary files from html directory
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/default.conf \
          /usr/share/nginx/html/README.md \
          /usr/share/nginx/html/.gitignore

# Health check (try both ports)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Expose ports
EXPOSE 80 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]