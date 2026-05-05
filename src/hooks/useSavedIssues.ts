'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { GitHubIssue } from '@/features/issues/types';

export interface SavedIssue {
  issueId: string;
  issueUrl: string;
  title: string;
  repoName: string;
  repoUrl: string;
  savedAt: string;
}

const STORAGE_KEY = 'issuehub_saved_issues';
const EMPTY: SavedIssue[] = [];

const subscribers = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: SavedIssue[] = EMPTY;

function parse(raw: string | null): SavedIssue[] {
  if (!raw) return EMPTY;
  try {
    return JSON.parse(raw) as SavedIssue[];
  } catch (e) {
    console.error('Failed to parse saved issues', e);
    return EMPTY;
  }
}

function getSnapshot(): SavedIssue[] {
  if (typeof window === 'undefined') return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  // Return the same reference when raw hasn't changed so React's
  // useSyncExternalStore doesn't think the store mutated every read.
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  cachedValue = parse(raw);
  return cachedValue;
}

function getServerSnapshot(): SavedIssue[] {
  return EMPTY;
}

function subscribe(cb: () => void): () => void {
  subscribers.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedRaw = null; // force re-read on next getSnapshot
      cb();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    subscribers.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

function write(next: SavedIssue[]) {
  const raw = JSON.stringify(next);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedValue = next;
  subscribers.forEach(cb => cb());
}

export function useSavedIssues() {
  const savedIssues = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveIssue = useCallback((issue: GitHubIssue) => {
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

    const current = getSnapshot();
    if (current.some(i => i.issueId === newSavedIssue.issueId)) return true;
    write([...current, newSavedIssue]);
    return true;
  }, []);

  const removeIssue = useCallback((issueId: string) => {
    write(getSnapshot().filter(i => i.issueId !== issueId));
  }, []);

  const isSaved = useCallback(
    (issueId: string) => savedIssues.some(i => i.issueId === issueId),
    [savedIssues]
  );

  return {
    savedIssues,
    saveIssue,
    removeIssue,
    isSaved,
  };
}
