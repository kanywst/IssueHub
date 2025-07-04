/**
 * GitHub Service Implementation
 * Responsible for communication with GitHub API
 */

import {
  GitHubClientInterface,
  GoodFirstIssuesParams,
} from '@/lib/api/interfaces/github-client.interface';
import {
  GitHubSearchResponse,
  GitHubIssue,
  GitHubRepository,
} from '@/lib/api/interfaces/github-types';

/**
 * GitHub Service Class
 * Service for communicating with GitHub API
 */
export class GitHubService implements GitHubClientInterface {
  private apiUrl = 'https://api.github.com';
  private token: string;

  constructor(token?: string) {
    this.token = token || process.env.GITHUB_API_TOKEN || '';
  }

  /**
   * Generate headers for API calls
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }

  /**
   * Send API request
   */
  private async fetchFromGitHub<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.apiUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`GitHub API Error: ${error.message}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Search for "Good First Issue" issues
   */
  async findGoodFirstIssues(
    params: GoodFirstIssuesParams
  ): Promise<GitHubSearchResponse<GitHubIssue>> {
    const { language, sort, page, perPage } = params;

    // Build search query
    let query = 'is:issue is:open label:"good first issue"';
    if (language) query += ` language:${language}`;

    const searchParams: Record<string, string> = {
      q: query,
      page: page?.toString() || '1',
      per_page: perPage?.toString() || '30',
    };

    if (sort) searchParams.sort = sort;

    return this.fetchFromGitHub<GitHubSearchResponse<GitHubIssue>>('/search/issues', searchParams);
  }

  /**
   * Get repository information
   */
  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.fetchFromGitHub<GitHubRepository>(`/repos/${owner}/${repo}`);
  }
}

export default GitHubService;
