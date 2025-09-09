#!/bin/bash

echo "🚀 Setting up Investment Platform Database..."

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Start the database
echo "Starting MySQL database..."
docker-compose up db -d

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
sleep 10

# Create database manually to ensure it exists
echo "Creating investment_platform database..."
docker exec db-investment-platform mysql -uroot -ppassword -e "CREATE DATABASE IF NOT EXISTS investment_platform;" 2>/dev/null || echo "Database creation attempted"

# Verify database exists
echo "Verifying database exists..."
docker exec db-investment-platform mysql -uroot -ppassword -e "SHOW DATABASES;" 2>/dev/null | grep investment_platform && echo "✅ Database exists!" || echo "❌ Database not found"

# Run migrations
echo "Running database migrations..."
npm run migration:run

echo "🎉 Database setup complete!"
echo "You can now run: npm run dev"