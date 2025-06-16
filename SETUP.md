# Issue Hub Setup Guide

Issue Hub is a web application designed to help open source beginners easily find GitHub issues labeled with "good first issue".

## Technology Stack

- Frontend: Next.js 14, TypeScript, Material UI
- Backend: tRPC, Prisma ORM
- Authentication: NextAuth with GitHub OAuth
- Database: MySQL/PlanetScale

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd issuehub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file and set the following environment variables:

```
# Database
DATABASE_URL="mysql://username:password@localhost:3306/issuehub"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# GitHub API
GITHUB_API_TOKEN="your-github-personal-access-token"
```

#### Database Configuration

- If using PlanetScale:
  - Create a new database from the PlanetScale dashboard
  - Get the connection string and set it as `DATABASE_URL`

#### GitHub OAuth Configuration

1. Go to GitHub Settings -> Developer settings -> OAuth Apps
2. Register a new OAuth application
3. Enter the following information:
   - Application name: IssueHub
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github
4. Get the client ID and secret and set them as environment variables

#### GitHub API Token Configuration

1. Go to GitHub Settings -> Developer settings -> Personal access tokens
2. Select Fine-grained tokens
3. Generate a new token with appropriate permissions (at minimum, repo:read is required)
4. Set the token as an environment variable

### 4. Initialize the Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Application

Start in development mode:

```bash
npm run dev
```

Build and start in production mode:

```bash
npm run build
npm start
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set up environment variables
3. Deploy

### Backend (Fly.io/Cloud Run)

Deploy backend services separately as needed.

## Features

- Search for GitHub issues labeled with "good first issue"
- Filter by programming language
- Save interesting issues
- GitHub account integration
