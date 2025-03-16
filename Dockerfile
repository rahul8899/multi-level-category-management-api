# Use an official Node.js runtime as a parent image
FROM node:18-alpine 
# Or any other suitable Node.js version

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application listens on
EXPOSE 3000 
# Replace with your application's port

# Define the command to run your application
CMD [ "npm", "start" ] # Or "yarn start", "node server.js", etc.