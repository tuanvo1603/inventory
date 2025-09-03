const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// Generate a random secret
const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64')
}

// Setup environment variables
const setupEnv = () => {
  const envPath = path.join(process.cwd(), '.env')
  const secret = generateSecret()
  
  console.log('🔐 Setting up NextAuth.js configuration...\n')
  
  // Environment variables content
  const envContent = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
# Generate a random string for production: node scripts/generate-secret.js
NEXTAUTH_SECRET="${secret}"
NEXTAUTH_URL="http://localhost:3000"

# Optional: For production deployment
# NEXTAUTH_URL="https://your-domain.com"
`

  // Check if .env file exists
  if (fs.existsSync(envPath)) {
    console.log('📝 .env file exists.')
    console.log('Please add these environment variables to your .env file:\n')
    console.log(`NEXTAUTH_SECRET="${secret}"`)
    console.log('NEXTAUTH_URL="http://localhost:3000"')
    console.log('DATABASE_URL="file:./dev.db"')
  } else {
    // Create .env file
    fs.writeFileSync(envPath, envContent)
    console.log('✅ .env file created successfully!')
  }
  
  console.log('\n🔑 Generated NEXTAUTH_SECRET:')
  console.log(`"${secret}"`)
  console.log('\n🚀 Your NextAuth.js is now configured!')
  console.log('Run "npm run dev" to start the development server.')
}

// Run if called directly
if (require.main === module) {
  setupEnv()
}

module.exports = { generateSecret, setupEnv }
