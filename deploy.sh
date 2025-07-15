#!/bin/bash

# Auto-deployment script for Hostinger VPS
# This script will be run automatically when you push changes

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/html/your-domain

# Pull latest changes from GitHub
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the project
echo "🏗️ Building project..."
npm run build

# Copy built files to web directory
echo "📁 Copying files..."
sudo cp -r dist/* /var/www/html/your-domain/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/html/your-domain/
sudo chmod -R 755 /var/www/html/your-domain/

# Reload Nginx
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"
echo "🌐 Your website is now live with the latest changes!"