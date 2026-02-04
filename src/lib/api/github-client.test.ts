import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGoodFirstIssues, githubClient } from './github-client';

vi.mock('@octokit/core', () => {
  return {
    Octokit: vi.fn().mockImplementation(function() {
      return {
        request: vi.fn(),
      };
    }),
  };
});

describe('github-client', () => {
  const mockRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-expect-error - Mocking request for testing
    githubClient.request = mockRequest;
    mockRequest.mockResolvedValue({ data: { items: [], total_count: 0 } });
  });

  it('should include language in query when provided', async () => {
    await getGoodFirstIssues({ language: 'typescript' });
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.objectContaining({
        q: expect.stringContaining('language:typescript'),
      })
    );
  });

  it('should include keyword in query when provided', async () => {
    await getGoodFirstIssues({ keyword: 'react' });
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.objectContaining({
        q: expect.stringContaining('react'),
      })
    );
  });

  it('should include date filter in query when days is provided', async () => {
    const days = 7;
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - days);
    const dateString = expectedDate.toISOString().split('T')[0];

    await getGoodFirstIssues({ days });
    
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.objectContaining({
        q: expect.stringContaining(`created:<=${dateString}`),
      })
    );
  });

  it('should not include date filter when days is not provided', async () => {
    await getGoodFirstIssues({});
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.not.objectContaining({
        q: expect.stringContaining('created:'),
      })
    );
  });

  it('should include stars filter in query when minStars is provided', async () => {
    await getGoodFirstIssues({ minStars: 1000 });
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.objectContaining({
        q: expect.stringContaining('stars:>=1000'),
      })
    );
    // Ensure we are not making a separate call for repositories
    expect(mockRequest).toHaveBeenCalledTimes(1);
  });
});
