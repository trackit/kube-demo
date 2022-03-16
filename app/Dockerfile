FROM node:14.17.0

# Add local files
WORKDIR /app
COPY . .

# Install dependencies
RUN yarn install

# Build application
RUN yarn build

# Define entrypoint
ENTRYPOINT ["node", "/app/dist/index.js"]
