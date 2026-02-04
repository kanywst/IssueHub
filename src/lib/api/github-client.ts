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
    const dateString = date.toISOString();
    query += ` created:<=${dateString}`;
  }

  // If minStars is provided, we first find repositories that match the criteria
  // Then we restrict our issue search to those repositories
  if (minStars && minStars > 0) {
    try {
      const repoQuery = `stars:>=${minStars}${language ? ` language:${language}` : ''}`;
      const reposResponse = await githubClient.request('GET /search/repositories', {
        q: repoQuery,
        sort: 'stars',
        order: 'desc',
        per_page: 20, // Limit to top 20 repositories to keep query string manageable
      });

      if (reposResponse.data.items.length > 0) {
        const repoList = reposResponse.data.items.map(repo => `repo:${repo.full_name}`).join(' ');
        query += ` ${repoList}`;
      } else {
        // If no repos found, the search should return no results
        query += ' repo:non/existent';
      }
    } catch (error) {
      console.error('Failed to pre-fetch repositories for star filtering', error);
    }
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
