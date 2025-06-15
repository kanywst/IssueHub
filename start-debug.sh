#!/bin/bash

# Script to start the development server with debug mode enabled
# Usage: ./start-debug.sh

# Temporarily update .env.local file (macOS compatible)
sed -i '' 's/DEBUG_AUTH="false"/DEBUG_AUTH="true"/' .env.local
sed -i '' 's/NEXT_PUBLIC_DEBUG_MODE="false"/NEXT_PUBLIC_DEBUG_MODE="true"/' .env.local

# Start the development server with debug mode
echo "Starting development server with DEBUG MODE enabled..."
npm run dev

# Restore .env.local file when the server stops
# Note: If you use Ctrl+C to stop the server, you'll need to manually restore these settings
sed -i '' 's/DEBUG_AUTH="true"/DEBUG_AUTH="false"/' .env.local
sed -i '' 's/NEXT_PUBLIC_DEBUG_MODE="true"/NEXT_PUBLIC_DEBUG_MODE="false"/' .env.local
