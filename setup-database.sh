#!/bin/bash

echo "🚀 Setting up Investment Platform Database..."

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Start the database
echo "Starting MySQL database..."
docker-compose up db -d

# Wait for MySQL to be ready with connection tests
echo "Waiting for MySQL to be ready..."
for i in {1..30}; do
    if docker exec db-investment-platform mysql -uroot -ppassword -e "SELECT 1;" >/dev/null 2>&1; then
        echo "✅ MySQL is ready!"
        break
    fi
    echo "Waiting for MySQL... ($i/30)"
    sleep 2
done

# Create database manually to ensure it exists
echo "Creating investment_platform database..."
docker exec db-investment-platform mysql -uroot -ppassword -e "CREATE DATABASE IF NOT EXISTS investment_platform;" 2>/dev/null

# Wait a bit more for database to be fully initialized
sleep 3

# Verify database exists
echo "Verifying database exists..."
if docker exec db-investment-platform mysql -uroot -ppassword -e "USE investment_platform; SELECT 'Database ready' as status;" 2>/dev/null | grep "Database ready"; then
    echo "✅ Database exists and is accessible!"
else
    echo "❌ Database verification failed"
    exit 1
fi

# Run migrations with retry
echo "Running database migrations..."
for i in {1..3}; do
    echo "Migration attempt $i/3..."
    if npm run migration:run; then
        echo "✅ Migrations completed successfully!"
        break
    else
        echo "Migration attempt $i failed, retrying in 5 seconds..."
        sleep 5
    fi
done

echo "🎉 Database setup complete!"
echo "You can now run: npm run dev"