#!/bin/bash

# Script to set up your PlanetScale database

# 1. Configure your database connection string (edit .env.local)
echo "Please set your PlanetScale database connection string in the .env.local file."
echo "Example: DATABASE_URL=\"mysql://username:password@aws.connect.psdb.cloud/issuehub?sslaccept=strict\""

# 2. Set up your GitHub OAuth App
echo "Now let's configure your GitHub OAuth App:"
echo "1. Go to GitHub Settings → Developer settings → OAuth Apps"
echo "2. Register a new OAuth application"
echo "3. Enter the following details:"
echo "   - Application name: IssueHub"
echo "   - Homepage URL: http://localhost:3000"
echo "   - Authorization callback URL: http://localhost:3000/api/auth/callback/github"
echo "4. Copy the Client ID and Client Secret, then add them to your .env.local file:"
echo "   GITHUB_CLIENT_ID=\"your-client-id\""
echo "   GITHUB_CLIENT_SECRET=\"your-client-secret\""

# 3. Create a GitHub Personal Access Token
echo "Next, create a GitHub Personal Access Token:"
echo "1. Go to GitHub Settings → Developer settings → Personal access tokens"
echo "2. Choose 'Fine-grained tokens'"
echo "3. Generate a new token with at least repo:read permission"
echo "4. Add the token to your .env.local file:"
echo "   GITHUB_API_TOKEN=\"your-github-pat\""

# 4. Generate a NEXTAUTH secret
echo "Generate a secret for NextAuth:"
echo "Run this command to produce a random key and append it to .env.local:"
echo "  echo \"NEXTAUTH_SECRET=$(openssl rand -base64 32)\" >> .env.local"

# 5. Initialize Prisma
echo "Finally, initialize Prisma. Once your .env.local is configured, run:"
echo "  npx prisma migrate dev --name init"
echo "  npx prisma generate"
