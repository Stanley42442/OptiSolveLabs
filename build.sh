#!/bin/bash
set -e
echo "Building frontend with Vite..."
npm exec vite build
echo "Build complete!"
