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
    // We can't easily predict the exact ISO string due to milliseconds, 
    // but we can check the format and the date part
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - days);
    const datePart = expectedDate.toISOString().split('T')[0];

    await getGoodFirstIssues({ days });
    
    expect(mockRequest).toHaveBeenCalledWith(
      'GET /search/issues',
      expect.objectContaining({
        q: expect.stringContaining(`created:<=${datePart}`),
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
});
