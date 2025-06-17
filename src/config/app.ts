// アプリケーション固有の設定
export const APP_CONFIG = {
  name: 'IssueHub',
  description: 'Find and manage good first issues for open-source contributions',
  version: '0.1.0',
  github: {
    apiUrl: 'https://api.github.com',
    maxResultsPerPage: 30,
    defaultLanguages: [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'rust',
      'c',
      'cpp',
      'csharp',
      'php',
      'ruby',
    ],
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  seo: {
    titleTemplate: '%s | IssueHub',
    defaultTitle: 'IssueHub - Find Good First Issues',
    defaultDescription:
      'Find good first issues for open-source contributions across GitHub repositories',
  },
};
