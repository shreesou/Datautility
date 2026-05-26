FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose app port (optional)
EXPOSE 3000

# Start application
CMD ["node", "index.js"]
