'use client';

import { useState, useEffect } from 'react';
import { GitHubIssue } from '@/features/issues/types';

export interface SavedIssue {
  issueId: string;
  issueUrl: string;
  title: string;
  repoName: string;
  repoUrl: string;
  savedAt: string;
}

export function useSavedIssues() {
  const [savedIssues, setSavedIssues] = useState<SavedIssue[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('issuehub_saved_issues');
    if (stored) {
      try {
        setSavedIssues(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse saved issues', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveIssue = (issue: GitHubIssue) => {
    const repoUrl = issue.repository_url.replace(
      'https://api.github.com/repos/',
      'https://github.com/'
    );
    const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
    const repoName = `${owner}/${repo}`;

    const newSavedIssue: SavedIssue = {
      issueId: issue.id.toString(),
      issueUrl: issue.html_url,
      title: issue.title,
      repoName,
      repoUrl,
      savedAt: new Date().toISOString(),
    };

    setSavedIssues(prev => {
      const exists = prev.some(i => i.issueId === newSavedIssue.issueId);
      if (exists) return prev;
      const next = [...prev, newSavedIssue];
      localStorage.setItem('issuehub_saved_issues', JSON.stringify(next));
      return next;
    });

    return true;
  };

  const removeIssue = (issueId: string) => {
    setSavedIssues(prev => {
      const next = prev.filter(i => i.issueId !== issueId);
      localStorage.setItem('issuehub_saved_issues', JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (issueId: string) => {
    return savedIssues.some(i => i.issueId === issueId);
  };

  return {
    savedIssues,
    saveIssue,
    removeIssue,
    isSaved,
    isLoaded,
  };
}
