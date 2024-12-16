# Frontend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Expose port for Vite or React app
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]
