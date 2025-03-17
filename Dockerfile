# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files to the container
COPY . .

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Compile TypeScript (if necessary, or you can use ts-node directly to run)
RUN tsc

# Expose the port your application will run on
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/index.js"]
