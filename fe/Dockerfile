FROM node:22-alpine AS builder

WORKDIR /todo-react

# what copy - where
COPY package*.json .
RUN npm install

# Copy the built files from the builder stage
COPY . .

RUN npm run build

# Remove unnecessary devDependencies to optimize image size
RUN npm prune --omit=dev

# Use a lightweight Node.js runtime for production
FROM node:22-alpine AS runner

# Set the working directory inside the container
WORKDIR /todo-react

# Expose the application's default port
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]
