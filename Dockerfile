# Use a Node.js version compatible with the current Vite toolchain
FROM node:22.12.0 AS build

# Set the working directory in the container
WORKDIR /cloudrunshow

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

ENV PORT=8080

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the built React app to Nginx's web server directory
COPY --from=build /cloudrunshow/dist /usr/share/nginx/html

# Expose the port Cloud Run expects the container to listen on
EXPOSE 8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
