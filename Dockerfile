# Stage 1: Base image with dependencies
FROM node:18-alpine AS base

# Install FFmpeg for Remotion
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    ffmpeg

# Set environment variables for Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files
COPY package*.json ./

# Stage 2: Development
FROM base AS development

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Expose port for Remotion Studio
EXPOSE 3000

# Start Remotion Studio
CMD ["npm", "start"]

# Stage 3: Production
FROM base AS production

# Install only production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the video (can be overridden with docker run command)
CMD ["npm", "run", "build"]
