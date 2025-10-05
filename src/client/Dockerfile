# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
# Assuming you use npm/yarn for installing, use the appropriate command:
RUN npm install 
COPY . .
# Run a production build command (Vite default is usually 'build')
RUN npm run build 

# Stage 2: Serve the static files with a lightweight web server (Nginx)
FROM nginx:alpine
# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy a custom nginx config (see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Expose the standard HTTP port for the frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]