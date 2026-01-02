/**
 * Type definitions for GitHub API responses
 */

export interface GitHubIssue {
  id: number;
  html_url: string;
  number: number;
  title: string;
  body?: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  repository_url: string;
  labels?: {
    id?: number;
    name?: string;
    color?: string;
    description?: string | null;
  }[];
  comments: number;
  reactions?: {
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  owner_info?: {
    avatar_url: string | null;
    html_url: string;
  };
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface GitHubErrorResponse {
  message: string;
  documentation_url: string;
}
