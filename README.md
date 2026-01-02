# 🚀 IssueHub

<p>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MUI-6-blue?style=flat-square&logo=mui" alt="Material UI" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
</p>

<p>
  <strong>Discover and track the perfect "good first issues" for your open source journey</strong>
</p>

<p>
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#running-on-kind">Running on Kind</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

</div>

## ✨ Overview

IssueHub is a modern platform designed to help beginners find their first contribution opportunities in open source software. It streamlines the discovery of GitHub issues labeled as "good first issue", allowing new developers to easily find projects that welcome their contributions.

## 🎯 Features

- **Smart Issue Discovery** - Seamlessly search for issues labeled as "good first issue" across GitHub
- **Language Filtering** - Find issues in programming languages you're comfortable with
- **Personal Issue Tracking** - Save interesting issues to your personal dashboard
- **GitHub Integration** - One-click authentication with your GitHub account
- **Responsive Design** - Optimized experience across desktop and mobile devices

## 🧪 Testing

### E2E Tests

IssueHub uses Playwright for end-to-end testing to ensure the application works correctly across different browsers and devices.

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests in a specific browser (for CI)
npm run test:e2e:ci

# Run tests in debug mode
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm/yarn
- GitHub account (for authentication)
- MySQL database (local, Docker, or PlanetScale)

### Installation

```bash
# Clone the repository
git clone https://github.com/kanywst/issuehub.git
cd issuehub

# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration values

# Initialize database
yarn prisma:migrate
yarn prisma:generate

# Start development server
yarn dev
```

Visit `http://localhost:3000` to see the application running!

## 🐳 Running on Kind (Kubernetes)

IssueHub can be easily deployed to a local Kubernetes cluster using Kind and Helm.

For detailed instructions, please refer to the [Kind Setup Guide](docs/KIND_SETUP.md).

Quick summary:
1. Create a Kind cluster.
2. Deploy MySQL using Kubernetes manifests.
3. Build and load Docker images (application & migration).
4. Run database migrations using a Kubernetes Job.
5. Deploy the application using Helm.

## 🔧 Environment Setup

Create a `.env` file with the following variables:

```
# Database
DATABASE_URL="mysql://username:password@localhost:3306/issuehub"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# GitHub OAuth (Optional for local dev if using mock)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# GitHub API
GITHUB_API_TOKEN="your-github-personal-access-token"

# Debug Settings (optional)
NEXT_PUBLIC_DEBUG_MODE="false"
```

## 🧰 Tech Stack

### Frontend

- **Next.js 15** with App Router and RSC
- **TypeScript** for type safety
- **Material UI v6** with Emotion
- **React Query** for data fetching
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling

### Backend

- **Next.js API Routes**
- **tRPC** for type-safe API calls
- **Octokit** for GitHub API integration
- **Prisma ORM** with MySQL

## 📁 Project Structure

```
.
├── charts/                 # Helm charts for Kubernetes deployment
├── docs/                   # Project documentation
├── e2e/                    # E2E tests (Playwright)
├── k8s/                    # Kubernetes manifests
├── prisma/                 # Prisma database configuration & migrations
├── public/                 # Static files
├── scripts/                # Shell scripts
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable React components
│   ├── config/             # App configuration
│   ├── features/           # Feature-based modules
│   ├── lib/                # Utilities and libraries
│   ├── server/             # Server-side logic (tRPC routers)
│   ├── services/           # Business logic services
│   └── types/              # TypeScript type definitions
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  Made with ❤️ for the open source community
</div>