import { GitHubIssuesResponse } from '@/features/issues/types';

export interface GoodFirstIssuesParams {
  language?: string;
  keyword?: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export interface RepositoryDetails {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrganizationDetails {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  description: string | null;
  blog: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubClientInterface {
  getGoodFirstIssues(params: GoodFirstIssuesParams): Promise<GitHubIssuesResponse>;
  getRepositoryDetails(owner: string, repo: string): Promise<RepositoryDetails>;
  getOrganizationDetails(org: string): Promise<OrganizationDetails>;
}
