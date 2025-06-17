# 🚀 IssueHub

<p>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MUI-5-blue?style=flat-square&logo=mui" alt="Material UI" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
</p>

<p>
  <strong>Discover and track the perfect "good first issues" for your open source journey</strong>
</p>

<p>
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
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

#### Test Structure

- `e2e/basic.spec.ts`: Basic navigation and homepage tests
- `e2e/auth.spec.ts`: Authentication-related tests
- `e2e/issues.spec.ts`: Issue listing and filtering tests
- `e2e/authenticated.spec.ts`: Tests requiring authentication

#### Debugging Tests

If tests fail, you can:

1. Run with `--debug` flag: `npx playwright test --debug`
2. Check the HTML report: `npm run test:e2e:report`
3. Look at test artifacts in the `test-results/` directory

### Continuous Integration

E2E tests are automatically run on GitHub Actions for all pull requests and pushes to the main branch. The workflow configuration is located in `.github/workflows/e2e.yml`.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- GitHub account (for authentication)
- MySQL database (local or PlanetScale)

### Installation

```bash
# Clone the repository
git clone https://github.com/kanywst/issuehub.git
cd issuehub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration values

# Initialize database
npx prisma migrate dev --name init
npx prisma generate

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application running!

## 🔧 Environment Setup

Create a `.env.local` file with the following variables:

```
# Database
DATABASE_URL="mysql://username:password@localhost:3306/issuehub"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secure-random-string"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# GitHub API
GITHUB_API_TOKEN="your-github-personal-access-token"

# Debug Settings (optional)
DEBUG_AUTH="false"
NEXT_PUBLIC_DEBUG_MODE="false"
```

## 💻 Development Modes

Two development modes are available:

**Standard Mode**

```bash
./start-dev.sh
```

**Debug Mode** (includes additional logging and debug features)

```bash
./start-debug.sh
```

Debug mode enables:

- User session information on homepage
- Authentication debugging logs
- Debug page access (`/debug`)
- Advanced issue recommendations
- Additional GitHub integration features

## 🧰 Tech Stack

### Frontend

- **Next.js 14** with App Router and RSC
- **TypeScript** for type safety
- **Material UI v5** with Emotion
- **SWR** for data fetching
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling

### Backend

- **NestJS 10** with TypeScript
- **tRPC** for type-safe API calls
- **Octokit** for GitHub API integration
- **Prisma ORM** with PlanetScale (MySQL)

## 📁 Project Structure

```
.
├── docs/                   # Project documentation
├── e2e/                    # E2E tests
│   └── helpers/            # Test helper functions
├── prisma/                 # Prisma database configuration
│   └── migrations/         # Database migrations
├── public/                 # Static files
├── scripts/                # Shell scripts
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   ├── components/         # Components
│   │   ├── common/         # Common components
│   │   ├── forms/          # Form components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── config/             # Configuration files
│   ├── features/           # Feature-specific code
│   ├── generated/          # Generated code
│   ├── lib/                # Utilities and API
│   │   ├── api/            # API clients
│   │   │   └── interfaces/ # API interfaces
│   │   └── utils/          # Utility functions
│   ├── server/             # Server-side code
│   │   └── routers/        # tRPC routers
│   ├── services/           # Service layer
│   └── types/              # Type definitions
└── tests/                  # Tests
    ├── integration/        # Integration tests
    └── unit/               # Unit tests
```

For detailed project structure explanation, please refer to [docs/project-structure.md](docs/project-structure.md).

### 📋 Important File Locations

- **Setup Guide**: [docs/SETUP.md](docs/SETUP.md)
- **Development Instructions**: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)
- **Directory Structure**: [docs/project-structure.md](docs/project-structure.md)
- **Repository Organization Information**: [docs/repository-migration.md](docs/repository-migration.md)

### 🚀 Development Scripts

The following scripts are located in the `/scripts` directory:

```bash
# Start development server
npm run dev
# or
./scripts/start-dev.sh

# Start in debug mode
npm run debug
# or
./scripts/start-debug.sh

# Database setup
./scripts/setup-database.sh

# Display debug information
./scripts/inspect.sh
```

For detailed repository reorganization work history, please refer to [docs/directory-reorganization-summary.md](docs/directory-reorganization-summary.md).

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
