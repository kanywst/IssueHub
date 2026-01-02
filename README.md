# 🚀 IssueHub

<p>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MUI-7-blue?style=flat-square&logo=mui" alt="Material UI" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" />
</p>

<p>
  <strong>A modern, high-performance platform to discover and track the perfect "good first issues" for your open source journey.</strong>
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

IssueHub is a cutting-edge platform designed for developers who want to dive into the open-source ecosystem. Featuring a **"Luminous Dark"** aesthetic, it provides a seamless experience for finding issues labeled as "good first issue" across the vast GitHub landscape. 

By aggregating real-time data and offering intuitive filtering, IssueHub empowers newcomers to take their first step with confidence.

## 🎯 Features

- **Luminous Dark UI** - A modern, immersive developer-centric interface with glassmorphism and subtle glow effects.
- **Enhanced Issue Insights** - View issue status (Open/Closed), comment counts, and relative creation times at a glance.
- **Smart Sorting** - Discover the freshest opportunities with default "Newest First" sorting.
- **Deep Filtering** - Find issues in the programming languages you love.
- **Personal Library** - Save interesting issues to your personal dashboard for later review.
- **GitHub Powered** - One-click authentication and real-time data fetching via Octokit.
- **Cloud Native Ready** - Fully containerized with Helm charts and Kind support for local Kubernetes development.

## 🧪 Testing

### E2E Tests

IssueHub uses Playwright for end-to-end testing to ensure stability across browsers.

```bash
# Install Playwright browsers
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run tests in debug mode
npm run test:e2e:debug
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Yarn (recommended) or NPM
- GitHub Personal Access Token (for API access)
- MySQL database

### Quick Install

```bash
# Clone the repository
git clone https://github.com/kanywst/issuehub.git
cd issuehub

# Install dependencies
yarn install

# Setup environment
cp .env.example .env
# Fill in your DATABASE_URL and GITHUB_API_TOKEN

# Initialize database
yarn prisma:migrate
yarn prisma:generate

# Launch development server
yarn dev
```

Visit `http://localhost:3000` to start exploring.

## 🐳 Running on Kind (Kubernetes)

IssueHub is built with modern infrastructure in mind. You can spin up a full environment locally using Kind.

See the [Kind Setup Guide](docs/KIND_SETUP.md) for detailed instructions.

```bash
# Quick Cluster Creation
kind create cluster --name issuehub-cluster
kubectl apply -f k8s/mysql.yaml
helm install issuehub ./charts/issuehub --set ...
```

## 🧰 Tech Stack

### Frontend & API
- **Next.js 15** (App Router, Server Components)
- **tRPC v11** (End-to-end typesafe API)
- **TypeScript**
- **Material UI v7** (Modernized Grid & Component APIs)
- **Tailwind CSS** (Utility-first styling)
- **React Query** (State management & caching)

### Backend & Data
- **Prisma ORM**
- **MySQL**
- **NextAuth.js** (GitHub OAuth)
- **Octokit** (GitHub REST API)

## 📁 Project Structure

```
.
├── charts/                 # Production-ready Helm charts
├── docs/                   # Documentation (Kind setup, architecture)
├── e2e/                    # Playwright end-to-end tests
├── k8s/                    # Kubernetes manifests for local dev
├── prisma/                 # Database schema and migrations
├── src/
│   ├── app/                # Next.js routes and layouts
│   ├── components/         # Atomic UI components
│   ├── features/           # Modularized business logic
│   ├── lib/                # Shared libraries & API clients
│   ├── server/             # tRPC routers and context
│   └── services/           # External service integrations
└── ...
```

## 🤝 Contributing

Contributions make the open-source community an amazing place!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Built with ❤️ for the next generation of OSS contributors.
</div>
