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
  alpha,
  useTheme,
  IconButton,
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
import { trpc } from '@/lib/trpc-client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import { GitHubIssue, GitHubIssueFromApi } from './types';
import { timeAgo } from '@/lib/utils';

const POPULAR_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

export default function IssuesPage() {
  const { data: session } = useSession();
  const theme = useTheme();
  const [language, setLanguage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const [savedIssueIds, setSavedIssueIds] = useState<string[]>([]);

  const { data: issuesData, isLoading } = trpc.issues.getGoodFirstIssues.useQuery(
    { language, keyword, page, perPage },
    { refetchOnWindowFocus: false }
  );

  const { data: savedIssues } = trpc.issues.getSavedIssues.useQuery(undefined, {
    enabled: !!session,
  });

  React.useEffect(() => {
    if (savedIssues) {
      setSavedIssueIds(savedIssues.map(issue => issue.issueId));
    }
  }, [savedIssues]);

  const { mutate: saveIssue } = trpc.issues.saveIssue.useMutation({
    onSuccess: response => {
      if (response.success) {
        setSnackbar({ open: true, message: 'Saved to library', severity: 'success' });
        if (response.savedIssue) {
          setSavedIssueIds(prev => [...prev, response.savedIssue.issueId]);
        }
      }
    },
  });

  const handleSearch = () => {
    setKeyword(tempKeyword);
    setPage(1);
  };

  const handleSaveIssue = (issue: GitHubIssue | GitHubIssueFromApi) => {
    if (!session) return;
    const repoUrl = issue.repository_url.replace('https://api.github.com/repos/', 'https://github.com/');
    const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

    saveIssue({
      issueId: issue.id.toString(),
      issueUrl: issue.html_url,
      title: issue.title,
      repoName: `${owner}/${repo}`,
      repoUrl,
    });
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: '900px', mx: 'auto', pt: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, color: '#fff' }}>
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
            p: 0.5,
            borderRadius: '16px',
            backgroundColor: alpha('#1e293b', 0.3),
            border: '1px solid rgba(255,255,255,0.05)',
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
                borderRadius: '12px',
                backgroundColor: 'transparent',
                '& fieldset': { border: 'none' },
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
                borderRadius: '12px',
                backgroundColor: alpha('#000', 0.2),
                color: 'text.primary',
                '& fieldset': { border: 'none' },
                '& .MuiSelect-select': { py: 1.5 },
              }}
            >
              <MenuItem value="">All Languages</MenuItem>
              {POPULAR_LANGUAGES.map(lang => (
                <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ minWidth: 120 }}>
            <GradientButton
              fullWidth
              onClick={handleSearch}
              data-testid="search-button"
              sx={{ height: '56px', borderRadius: '12px' }}
            >
              Search
            </GradientButton>
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: 'text.secondary' }} />
          </Box>
        ) : (
          <Stack spacing={2}>
            {issuesData?.items.map((issue) => {
              const repoName = issue.repository_url.replace('https://api.github.com/repos/', '');
              const isSaved = savedIssueIds.includes(issue.id.toString());
              const isOpen = issue.state === 'open';

              return (
                <Paper
                  key={issue.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    backgroundColor: alpha('#1e293b', 0.2),
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: alpha('#1e293b', 0.4),
                      borderColor: 'rgba(255,255,255,0.1)',
                      transform: 'scale(1.005)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        {issue.owner_info?.avatar_url && (
                          <Avatar 
                            src={issue.owner_info.avatar_url} 
                            sx={{ width: 20, height: 20 }} 
                          />
                        )}
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {repoName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          #{issue.number}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                        
                        {/* Status */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CircleIcon sx={{ fontSize: 8, color: isOpen ? 'secondary.main' : 'error.main' }} />
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

                        {/* Comments */}
                        {issue.comments > 0 && (
                          <>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>•</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                              <ChatIcon sx={{ fontSize: 14 }} />
                              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                {issue.comments}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component={Link} 
                        href={issue.html_url}
                        target="_blank"
                        sx={{ 
                          color: '#fff', 
                          textDecoration: 'none', 
                          fontWeight: 600,
                          lineHeight: 1.4,
                          '&:hover': { textDecoration: 'underline' }
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
                              fontSize: '0.7rem',
                              backgroundColor: alpha(`#${label.color || '333'}`, 0.1),
                              color: theme.palette.text.secondary,
                              border: `1px solid ${alpha(`#${label.color || '333'}`, 0.2)}`,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {session && (
                      <IconButton 
                        onClick={() => handleSaveIssue(issue)}
                        disabled={isSaved}
                        sx={{ 
                          color: isSaved ? 'secondary.main' : 'text.disabled',
                          '&:hover': { color: 'text.primary', backgroundColor: 'rgba(255,255,255,0.05)' }
                        }}
                      >
                        {isSaved ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                      </IconButton>
                    )}
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
            sx={{
              '& .MuiPaginationItem-root': { color: 'text.secondary' },
              '& .Mui-selected': { backgroundColor: 'white', color: 'black', fontWeight: 'bold' }
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
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '12px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
