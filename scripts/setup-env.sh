#!/bin/bash

# Script to generate NextAuth secret and setup environment variables

echo "🔐 Setting up NextAuth.js configuration..."

# Generate a random secret
SECRET=$(openssl rand -base64 32)

echo ""
echo "Generated NEXTAUTH_SECRET:"
echo "NEXTAUTH_SECRET=\"$SECRET\""
echo ""
echo "Please add this to your .env file along with:"
echo "NEXTAUTH_URL=\"http://localhost:3000\""
echo "DATABASE_URL=\"file:./dev.db\""
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "📝 .env file exists. Please manually add the NEXTAUTH_SECRET."
else
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="$SECRET"
NEXTAUTH_URL="http://localhost:3000"
EOF
    echo "✅ .env file created successfully!"
fi

echo ""
echo "🚀 Your NextAuth.js is now configured!"
echo "Run 'npm run dev' to start the development server."
