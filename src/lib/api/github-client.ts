import { Octokit } from '@octokit/core';

// Since this is used on the client side, do not embed access tokens (use without authentication).
// Rate limits should be considered, but this aligns with the static site requirement.
export const githubClient = new Octokit();

export async function getGoodFirstIssues({
  language,
  keyword,
  days,
  minStars,
  page = 1,
  perPage = 30,
}: {
  language?: string;
  keyword?: string;
  days?: number;
  minStars?: number;
  page?: number;
  perPage?: number;
}) {
  let query = 'is:issue is:open label:"good first issue"';

  if (language) {
    query += ` language:${language}`;
  }

  if (keyword && keyword.trim() !== '') {
    query += ` ${keyword.trim()}`;
  }

  if (days && days > 0) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const dateString = date.toISOString().split('T')[0];
    query += ` created:<=${dateString}`;
  }

  // If minStars is provided, add the stars qualifier directly to the query.
  // This is more efficient than fetching repositories first and avoids an extra API call.
  if (minStars && minStars > 0) {
    query += ` stars:>=${minStars}`;
  }

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
