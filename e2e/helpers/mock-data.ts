/**
 * モックデータ - GitHub API のレスポンスをシミュレートするためのテストデータ
 */

export const mockIssuesResponse = {
  total_count: 2,
  incomplete_results: false,
  items: [
    {
      id: 1,
      url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      repository_url: "https://api.github.com/repos/octocat/Hello-World",
      html_url: "https://github.com/octocat/Hello-World/issues/1347",
      title: "[Good First Issue] Add documentation for new API endpoints",
      user: {
        login: "octocat",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
      },
      labels: [
        {
          id: 208045946,
          url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
          name: "good first issue",
          description: "Good for newcomers",
          color: "f29513",
        }
      ],
      state: "open",
      locked: false,
      created_at: "2011-04-22T13:33:48Z",
      updated_at: "2011-04-22T13:33:48Z",
    },
    {
      id: 2,
      url: "https://api.github.com/repos/mojombo/jekyll/issues/42",
      repository_url: "https://api.github.com/repos/mojombo/jekyll",
      html_url: "https://github.com/mojombo/jekyll/issues/42",
      title: "[Good First Issue] Fix typo in README",
      user: {
        login: "mojombo",
        avatar_url: "https://github.com/images/error/mojombo_happy.gif",
      },
      labels: [
        {
          id: 208045946,
          url: "https://api.github.com/repos/mojombo/jekyll/labels/bug",
          name: "good first issue",
          description: "Good for newcomers",
          color: "f29513",
        }
      ],
      state: "open",
      locked: false,
      created_at: "2011-04-22T13:33:48Z",
      updated_at: "2011-04-22T13:33:48Z",
    }
  ]
};

export const mockOwnerInfo = {
  octocat: {
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    html_url: "https://github.com/octocat",
  },
  mojombo: {
    avatar_url: "https://github.com/images/error/mojombo_happy.gif",
    html_url: "https://github.com/mojombo",
  }
};
