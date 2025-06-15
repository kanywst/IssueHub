#!/bin/bash

# Script to start the development server in normal mode
# Usage: ./start-dev.sh

# Ensure debug mode is disabled
sed -i '' 's/DEBUG_AUTH="true"/DEBUG_AUTH="false"/' .env.local 2>/dev/null || true
sed -i '' 's/NEXT_PUBLIC_DEBUG_MODE="true"/NEXT_PUBLIC_DEBUG_MODE="false"/' .env.local 2>/dev/null || true

# Start development server
echo "Starting development server in normal mode..."
npm run dev
