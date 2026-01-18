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
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

export default function IssuesPage() {
  const [language, setLanguage] = useState('');
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
  const { data: issuesData, isLoading } = useQuery<GitHubIssuesResponse>({
    queryKey: ['issues', { language, keyword, page, perPage }],
    queryFn: () => getGoodFirstIssues({ language, keyword, page, perPage }) as Promise<GitHubIssuesResponse>,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = () => {
    setKeyword(tempKeyword);
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
              onChange={(e) => { setLanguage(e.target.value); setPage(1); }}
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

          <Box sx={{ minWidth: 120 }}>
            <IconButton
              onClick={handleSearch}
              data-testid="search-button"
              sx={{ 
                height: '56px', 
                width: '56px',
                borderRadius: '12px',
                backgroundColor: '#fff', 
                color: '#000',
                '&:hover': { backgroundColor: '#e5e7eb' }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        {isLoading ? (
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
            count={Math.ceil((issuesData?.total_count || 0) / perPage)}
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