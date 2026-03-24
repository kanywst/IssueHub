'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Typography,
  Box,
  MenuItem,
  Stack,
  CircularProgress,
  Pagination,
  FormControl,
  Select,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { timeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getGoodFirstIssues } from '@/lib/api/github-client';
import { useSavedIssues } from '@/hooks/useSavedIssues';
import { GitHubIssue, GitHubIssuesResponse } from './types';
import { IssueRow } from '@/components/ui/IssueRow';

const POPULAR_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'cpp', label: 'C++' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
];

const DATE_FILTERS = [
  { value: 0, label: 'Any time' },
  { value: 1, label: '1d ago' },
  { value: 3, label: '3d ago' },
  { value: 7, label: '1w ago' },
  { value: 14, label: '2w ago' },
  { value: 30, label: '1m ago' },
];

const STAR_FILTERS = [
  { value: 0, label: 'Any stars' },
  { value: 100, label: '> 100 ★' },
  { value: 500, label: '> 500 ★' },
  { value: 1000, label: '> 1k ★' },
  { value: 5000, label: '> 5k ★' },
];

const MAX_GITHUB_SEARCH_RESULTS = 1000;

// Reusable slim select style
const slimSelectSx = {
  height: 32,
  fontSize: '0.8125rem',
  borderRadius: '6px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  color: 'text.primary',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '& .MuiSelect-select': { py: 0, pl: 1, pr: 3, display: 'flex', alignItems: 'center' },
  '& fieldset': { border: 'none' },
  '& .MuiSvgIcon-root': { color: 'text.secondary', right: 4, fontSize: 18 },
};

export default function IssuesPage() {
  const [language, setLanguage] = useState('');
  const [days, setDays] = useState<number>(0);
  const [minStars, setMinStars] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 25; // Increased per page for high density

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const { isSaved, saveIssue } = useSavedIssues();

  const { data: issuesData, isLoading, isFetching } = useQuery<GitHubIssuesResponse>({
    queryKey: ['issues', { language, keyword, days, minStars, page, perPage }],
    queryFn: () => getGoodFirstIssues({ language, keyword, days, minStars, page, perPage }) as Promise<GitHubIssuesResponse>,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = () => {
    setKeyword(tempKeyword);
    setPage(1);
  };

  const handleFilterChange = <T extends string | number>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    setter(value);
    setPage(1);
  };

  const handleSaveIssue = (issue: GitHubIssue, e: React.MouseEvent) => {
    e.stopPropagation();
    const success = saveIssue(issue);
    if (success) {
      setSnackbar({ open: true, message: 'Saved to library', severity: 'success' });
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Top Controls Area */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#fafafa', letterSpacing: '-0.02em', fontSize: '1.5rem' }}>
            Explore Issues
          </Typography>

          {/* Search Bar (Command Palette Style) */}
          <Box sx={{ position: 'relative', mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search issues, repos, or tags... (Press Enter to search)"
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: { 
                  height: 48,
                  borderRadius: '10px',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  fontFamily: 'var(--font-geist-sans), sans-serif',
                  fontSize: '0.9375rem',
                  '& fieldset': { border: 'none' },
                  '& input': { color: 'text.primary', padding: '12px 14px 12px 0' },
                  '&:focus-within': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                }
              }}
            />
          </Box>

          {/* Slim Filters Row */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <FormControl>
              <Select
                value={language}
                onChange={(e) => handleFilterChange(setLanguage, e.target.value)}
                displayEmpty
                data-testid="language-select"
                sx={slimSelectSx}
                renderValue={(selected) => {
                  if (!selected) return <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><FilterIcon sx={{ fontSize: 14 }} /> <span>Language</span></Box>;
                  return POPULAR_LANGUAGES.find(l => l.value === selected)?.label;
                }}
              >
                <MenuItem value="">Any Language</MenuItem>
                {POPULAR_LANGUAGES.map(lang => (
                  <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                value={days}
                onChange={(e) => handleFilterChange(setDays, Number(e.target.value))}
                displayEmpty
                data-testid="date-select"
                sx={slimSelectSx}
                renderValue={(selected) => DATE_FILTERS.find(f => f.value === selected)?.label || 'Time'}
              >
                {DATE_FILTERS.map(filter => (
                  <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                value={minStars}
                onChange={(e) => handleFilterChange(setMinStars, Number(e.target.value))}
                displayEmpty
                data-testid="stars-select"
                sx={slimSelectSx}
                renderValue={(selected) => STAR_FILTERS.find(f => f.value === selected)?.label || 'Stars'}
              >
                {STAR_FILTERS.map(filter => (
                  <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />
            
            {/* Meta Info */}
            {!isLoading && issuesData && (
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                {issuesData.total_count.toLocaleString()} results
              </Typography>
            )}
          </Box>
        </Box>

        {/* High-Density List View */}
        {isLoading || isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={32} sx={{ color: 'text.disabled' }} />
          </Box>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ 
              border: '1px solid rgba(255,255,255,0.08)', 
              borderRadius: '10px', 
              overflow: 'hidden',
              backgroundColor: '#0a0a0b',
            }}>
              {issuesData?.items?.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                  No issues found.
                </Box>
              ) : (
                <Stack>
                  {issuesData?.items?.map((issue, idx) => {
                    const repoName = issue.repository_url.replace('https://api.github.com/repos/', '');
                    const saved = isSaved(issue.id.toString());
                    const isOpen = issue.state === 'open';

                    return (
                      <IssueRow
                        key={issue.id}
                        id={issue.id}
                        title={issue.title}
                        repoName={repoName}
                        issueUrl={issue.html_url}
                        isOpen={isOpen}
                        labels={issue.labels}
                        dateText={timeAgo(issue.created_at).replace(' ago', '')}
                        showStatus={true}
                        isSaved={saved}
                        actionType="save"
                        onAction={(e) => handleSaveIssue(issue, e)}
                        isLast={idx === (issuesData.items?.length ?? 0) - 1}
                      />
                    );
                  })}
                </Stack>
              )}
            </Box>

            {/* Pagination */}
            {issuesData?.items && issuesData.items.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  Page {page} of {Math.ceil(Math.min(issuesData.total_count, MAX_GITHUB_SEARCH_RESULTS) / perPage)}
                </Typography>
                <Pagination
                  count={Math.ceil(Math.min(issuesData.total_count, MAX_GITHUB_SEARCH_RESULTS) / perPage)}
                  page={page}
                  onChange={(_, v) => setPage(v)}
                  shape="rounded"
                  size="small"
                  sx={{
                    '& .MuiPaginationItem-root': { color: 'text.secondary', fontSize: '0.875rem' },
                    '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fafafa' }
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '8px', backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 500 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}