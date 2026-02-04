'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Typography,
  Box,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
  FormControl,
  Select,
  Avatar,
  Paper,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  BookmarkAdd as BookmarkAddIcon,
  BookmarkAdded as BookmarkAddedIcon,
  FilterList as FilterIcon,
  ChatBubbleOutline as ChatIcon,
  Circle as CircleIcon,
  AccessTime as TimeIcon,
  StarBorder as StarIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { timeAgo } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getGoodFirstIssues } from '@/lib/api/github-client';
import { useSavedIssues } from '@/hooks/useSavedIssues';
import { GitHubIssue, GitHubIssuesResponse } from './types';

const POPULAR_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'mojo', label: 'Mojo' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'zig', label: 'Zig' },
  { value: 'gleam', label: 'Gleam' },
  { value: 'carbon', label: 'Carbon' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
];

const DATE_FILTERS = [
  { value: 0, label: 'Any time' },
  { value: 1, label: '1 day ago or older' },
  { value: 3, label: '3 days ago or older' },
  { value: 7, label: '1 week ago or older' },
  { value: 14, label: '2 weeks ago or older' },
  { value: 30, label: '1 month ago or older' },
];

const STAR_FILTERS = [
  { value: 0, label: 'Any stars' },
  { value: 100, label: '100+ stars' },
  { value: 500, label: '500+ stars' },
  { value: 1000, label: '1k+ stars' },
  { value: 5000, label: '5k+ stars' },
  { value: 10000, label: '10k+ stars' },
];

const MAX_GITHUB_SEARCH_RESULTS = 1000;

export default function IssuesPage() {
  const [language, setLanguage] = useState('');
  const [days, setDays] = useState<number>(0);
  const [minStars, setMinStars] = useState<number>(0);
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const { isSaved, saveIssue } = useSavedIssues();

  // Fetch issues directly from GitHub API
  const { data: issuesData, isLoading, isFetching } = useQuery<GitHubIssuesResponse>({
    queryKey: ['issues', { language, keyword, days, minStars, page, perPage }],
    queryFn: () => getGoodFirstIssues({ language, keyword, days, minStars, page, perPage }) as Promise<GitHubIssuesResponse>,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = () => {
    setKeyword(tempKeyword);
    setPage(1);
  };

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    setPage(1);
  };

  const handleDaysChange = (val: number) => {
    setDays(val);
    setPage(1);
  };

  const handleStarsChange = (val: number) => {
    setMinStars(val);
    setPage(1);
  };

  const handleSaveIssue = (issue: GitHubIssue) => {
    const success = saveIssue(issue);
    if (success) {
      setSnackbar({ open: true, message: 'Saved to library', severity: 'success' });
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: '900px', mx: 'auto', pt: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'text.primary' }}>
            Explore Issues
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Curated opportunities for your next contribution.
          </Typography>
        </Box>

        {/* Total Count Display */}
        {!isLoading && !isFetching && issuesData && (
          <Box sx={{ mb: 3, px: 1 }}>
            <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              Found {issuesData.total_count.toLocaleString()} issues
            </Typography>
          </Box>
        )}

        {/* Filter Bar */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 6,
            flexDirection: { xs: 'column', sm: 'row' },
            p: 1,
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search keywords..."
            value={tempKeyword}
            onChange={(e) => setTempKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>,
              sx: { 
                borderRadius: '8px',
                backgroundColor: 'transparent',
                '& fieldset': { border: 'none' },
                '& input': { color: 'text.primary' },
              }
            }}
            inputProps={{ 'data-testid': 'keyword-search-input' }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              displayEmpty
              startAdornment={<FilterIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />}
              data-testid="language-select"
              sx={{
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'text.primary',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': { py: 1.5 },
                '& .MuiSvgIcon-root': { color: 'text.secondary' },
              }}
            >
              <MenuItem value="">All Languages</MenuItem>
              {POPULAR_LANGUAGES.map(lang => (
                <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <Select
              value={days}
              onChange={(e) => handleDaysChange(Number(e.target.value))}
              displayEmpty
              startAdornment={<TimeIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />}
              data-testid="date-select"
              sx={{
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'text.primary',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': { py: 1.5 },
                '& .MuiSvgIcon-root': { color: 'text.secondary' },
              }}
            >
              {DATE_FILTERS.map(filter => (
                <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }}>
            <Select
              value={minStars}
              onChange={(e) => handleStarsChange(Number(e.target.value))}
              displayEmpty
              startAdornment={<StarIcon sx={{ ml: 1, mr: 1, color: 'text.secondary' }} />}
              data-testid="stars-select"
              sx={{
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'text.primary',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': { py: 1.5 },
                '& .MuiSvgIcon-root': { color: 'text.secondary' },
              }}
            >
              {STAR_FILTERS.map(filter => (
                <MenuItem key={filter.value} value={filter.value}>{filter.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ minWidth: 120 }}>
            <IconButton
              onClick={handleSearch}
              disabled={isLoading || isFetching}
              data-testid="search-button"
              sx={{ 
                height: '56px', 
                width: '56px',
                borderRadius: '12px',
                backgroundColor: '#fff', 
                color: '#000',
                '&:hover': { backgroundColor: '#e5e7eb' },
                '&:disabled': { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.3)' }
              }}
            >
              {isLoading || isFetching ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
            </IconButton>
          </Box>
        </Box>

        {isLoading || isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'text.secondary' }} />
          </Box>
        ) : (
          <Stack spacing={2}>
            {issuesData?.items?.map((issue) => {
              const repoName = issue.repository_url.replace('https://api.github.com/repos/', '');
              const [owner] = repoName.split('/');
              const saved = isSaved(issue.id.toString());
              const isOpen = issue.state === 'open';

              return (
                <Paper
                  key={issue.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.4),
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      backgroundColor: alpha(theme.palette.background.paper, 0.8),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        {owner && (
                          <Avatar 
                            src={`https://github.com/${owner}.png`} 
                            alt={owner}
                            sx={{ width: 20, height: 20, border: '1px solid rgba(255, 255, 255, 0.1)' }} 
                          />
                        )}
                        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                          {repoName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          #{issue.number}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                        
                        {/* Status */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CircleIcon sx={{ fontSize: 6, color: isOpen ? 'secondary.main' : 'error.main' }} />
                          <Typography variant="caption" sx={{ color: isOpen ? 'secondary.main' : 'error.main', fontWeight: 600 }}>
                            {issue.state.toUpperCase()}
                          </Typography>
                        </Box>

                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                        
                        {/* Time Ago */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <TimeIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {timeAgo(issue.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component={Link} 
                        href={issue.html_url}
                        target="_blank"
                        sx={{ 
                          color: 'text.primary', 
                          textDecoration: 'none', 
                          fontWeight: 700,
                          lineHeight: 1.4,
                          '&:hover': { textDecoration: 'underline', color: 'secondary.main' }
                        }}
                      >
                        {issue.title}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                        {issue.labels?.slice(0, 3).map((label) => (
                          <Chip
                            key={label.id}
                            label={label.name}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: '0.75rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              color: 'text.secondary',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {/* Comments Count Chip */}
                        {issue.comments > 0 && (
                           <Chip
                             icon={<ChatIcon style={{ fontSize: 14, color: 'inherit' }} />}
                             label={issue.comments}
                             size="small"
                             sx={{ 
                               height: 24, 
                               fontSize: '0.75rem', 
                               backgroundColor: 'transparent',
                               border: 'none',
                               color: 'text.secondary'
                             }}
                           />
                        )}
                      </Box>
                    </Box>

                    <IconButton 
                      onClick={() => handleSaveIssue(issue)}
                      disabled={saved}
                      sx={{ 
                        color: saved ? 'secondary.main' : 'text.disabled',
                        '&:hover': { color: 'text.primary', backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                      }}
                    >
                      {saved ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                    </IconButton>
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Pagination
            count={Math.ceil(Math.min(issuesData?.total_count || 0, MAX_GITHUB_SEARCH_RESULTS) / perPage)}
            page={page}
            onChange={(_, v) => setPage(v)}
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': { color: 'text.secondary' },
              '& .MuiPaginationItem-root.Mui-selected': { backgroundColor: '#fff', color: '#000' }
            }}
          />
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '8px', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}