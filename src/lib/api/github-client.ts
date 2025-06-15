import { Octokit } from "@octokit/core";

export class GitHubClient {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({ auth: process.env.GITHUB_API_TOKEN });
  }

  async getGoodFirstIssues({
    language,
    keyword,
    page = 1,
    perPage = 30,
  }: {
    language?: string;
    keyword?: string;
    page?: number;
    perPage?: number;
  }) {
    let query = `is:issue is:open label:"good first issue"${
      language ? ` language:${language}` : ""
    }`;
    
    if (keyword && keyword.trim() !== '') {
      query += ` ${keyword.trim()}`;
    }

    const response = await this.octokit.request("GET /search/issues", {
      q: query,
      sort: "updated",
      order: "desc",
      per_page: perPage,
      page,
    });

    return response.data;
  }

  async getRepositoryDetails(owner: string, repo: string) {
    const response = await this.octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo,
    });

    return response.data;
  }
  
  async getOrganizationDetails(org: string) {
    try {
      const response = await this.octokit.request("GET /orgs/{org}", {
        org,
      });
      return response.data;
    } catch (error) {
      // 組織が見つからない場合はユーザー情報を取得
      const userResponse = await this.octokit.request("GET /users/{username}", {
        username: org,
      });
      return userResponse.data;
    }
  }
}

// シングルトンインスタンスをエクスポート
export const githubClient = new GitHubClient();
