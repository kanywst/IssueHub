import { Octokit } from '@octokit/core';

// Since this is used on the client side, do not embed access tokens (use without authentication).
// Rate limits should be considered, but this aligns with the static site requirement.
export const githubClient = new Octokit();

export async function getGoodFirstIssues({
  language,
  keyword,
  days,
  page = 1,
  perPage = 30,
}: {
  language?: string;
  keyword?: string;
  days?: number;
  page?: number;
  perPage?: number;
}) {
  // Use a slightly more flexible label search that hits common variations
  let query = 'is:issue is:open label:"good first issue"';

  if (language) {
    query += ` language:${language}`;
  }

  if (keyword && keyword.trim() !== '') {
    query += ` ${keyword.trim()}`;
  }

  if (days && days > 0) {
    const date = new Date();
    // Use ISO 8601 format for precise filtering (issues created BEFORE this exact moment)
    date.setDate(date.getDate() - days);
    const dateString = date.toISOString();
    // Change to <= to find issues that are OLDER than the specified days
    query += ` created:<=${dateString}`;
  }

  // search/issues is available without authentication
  const response = await githubClient.request('GET /search/issues', {
    q: query,
    sort: 'created',
    order: 'desc',
    per_page: perPage,
    page,
  });

  return response.data;
}

export async function getRepositoryDetails(owner: string, repo: string) {
  const response = await githubClient.request('GET /repos/{owner}/{repo}', {
    owner,
    repo,
  });

  return response.data;
}

export async function getOrganizationDetails(org: string) {
  try {
    const response = await githubClient.request('GET /orgs/{org}', {
      org,
    });
    return response.data;
  } catch {
    // If organization is not found, fetch user information instead
    const userResponse = await githubClient.request('GET /users/{username}', {
      username: org,
    });
    return userResponse.data;
  }
}
