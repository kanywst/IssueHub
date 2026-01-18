// Type definition for GitHub Issue
export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
  created_at: string;
  updated_at: string;
  body?: string;
  state: string;
  comments: number;
  labels?: GitHubLabel[];
  user?: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  // Extended property - Information added on the server side (Legacy)
  owner_info?: {
    avatar_url: string | null;
    html_url: string;
  };
}

export interface GitHubLabel {
  id?: number;
  name?: string;
  color?: string;
  description?: string | null;
}

// GitHub Issue type returned from the API
export interface GitHubIssueFromApi extends Partial<GitHubIssue> {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  [key: string]: unknown;
}

export interface GitHubIssuesResponse {
  total_count: number;
  items: GitHubIssue[];
}