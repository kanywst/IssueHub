# IssueHub

**IssueHub** is a high-performance, minimalist static web application designed for developers to discover "Good First Issues" across the GitHub ecosystem. It features an **Industrial Dark / Technical Noir** aesthetic, optimized for a modern developer experience.

👉 **Live Demo:** [https://kanywst.github.io/IssueHub](https://kanywst.github.io/IssueHub)

## 🚀 Vision

IssueHub aims to lower the barrier to open source contribution. By stripping away complex server-side requirements and focusing on a pure, browser-based experience, it provides a lightning-fast way to find your next commit.

## ✨ Key Features

- **Technical Noir UI:** A sharp, dark-mode aesthetic with neon accents and high-contrast typography, inspired by 2026 industrial design trends.
- **Zero-Server Architecture:** Fully static export. Operates entirely in the browser using the GitHub Public API.
- **LocalStorage Persistence:** Save and track issues locally without needing an account or database.
- **Optimized Discovery:** Real-time filtering by language and keywords with a focus on "good first issue" labels.
- **Zero Latency Navigation:** Built on Next.js 15 for instant page transitions and reactive UI components.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** [Material UI (MUI) v7](https://mui.com/) + Tailwind CSS
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query) + Octokit
- **Infrastructure:** GitHub Actions + GitHub Pages

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kanywst/IssueHub.git
   cd IssueHub
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure environment (Optional):

   ```bash
   cp .env.example .env
   ```

### Development

Start the local development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build & Static Export

Generate optimized static files for production:

```bash
yarn build
```

The output will be generated in the `out/` directory.

## 🚢 Deployment

This project is configured for automated deployment via GitHub Actions.

1. Push your changes to the `main` branch.
2. The workflow in `.github/workflows/deploy.yml` will trigger, building the project and deploying it to the `gh-pages` environment.
3. Ensure your GitHub Repository settings are set to deploy from the **GitHub Actions** source.

## 📄 License

Licensed under the [MIT License](LICENSE).
