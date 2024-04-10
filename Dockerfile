FROM node:18.14.2-alpine

# Check if Yarn is installed
RUN yarn --version || npm install -g yarn@1.22.19

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# ==== BUILD =====

# Install dependencies
RUN yarn install -P

ENV NODE_ENV production

# Build the app
RUN yarn run build
RUN rm -rf !dist

EXPOSE 3030

# Start the app
CMD [ "npx", "serve", "-s", "dist", "--listen", "3030" ]