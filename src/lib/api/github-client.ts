import { Octokit } from '@octokit/core';

// Since this is used on the client side, do not embed access tokens (use without authentication).
// Rate limits should be considered, but this aligns with the static site requirement.
export const githubClient = new Octokit();

export async function getGoodFirstIssues({
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
    language ? ` language:${language}` : ''
  }`;

  if (keyword && keyword.trim() !== '') {
    query += ` ${keyword.trim()}`;
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
