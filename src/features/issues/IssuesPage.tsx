'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Typography,
  Box,
  CardContent,
  Grid,
  MenuItem,
  Button,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Avatar,
  Tooltip,
  Paper,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import {
  Search as SearchIcon,
  BookmarkAdd as BookmarkAddIcon,
  BookmarkAdded as BookmarkAddedIcon,
} from '@mui/icons-material';
import { trpc } from '@/lib/trpc-client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import GradientButton from '@/components/ui/buttons/GradientButton';
import { GitHubIssue, GitHubLabel, GitHubIssueFromApi } from './types';

const POPULAR_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'c#', label: 'C#' },
  { value: 'c++', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

export default function IssuesPage() {
  const { data: session } = useSession();
  const [language, setLanguage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // State to keep track of saved issue IDs
  const [savedIssueIds, setSavedIssueIds] = useState<string[]>([]);

  const { data: issuesData, isLoading } = trpc.issues.getGoodFirstIssues.useQuery(
    { language, keyword, page, perPage },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Get saved issues
  const { data: savedIssues } = trpc.issues.getSavedIssues.useQuery(undefined, {
    enabled: !!session,
  });

  // Update saved issue IDs when data changes
  React.useEffect(() => {
    if (savedIssues) {
      setSavedIssueIds(savedIssues.map(issue => issue.issueId));
    }
  }, [savedIssues]);

  const { mutate: saveIssue } = trpc.issues.saveIssue.useMutation({
    onSuccess: response => {
      if (response.success) {
        // Success case
        setSnackbar({
          open: true,
          message: response.message || 'Issue saved successfully',
          severity: 'success',
        });

        // Update the list of saved issue IDs
        if (response.savedIssue) {
          setSavedIssueIds(prev => [...prev, response.savedIssue.issueId]);
        }
      } else {
        // Failure case (e.g., already saved)
        setSnackbar({
          open: true,
          message: response.message || 'Failed to save issue',
          severity: 'info',
        });
      }
    },
    onError: error => {
      // Error case
      setSnackbar({
        open: true,
        message: 'Failed to save issue: ' + error.message,
        severity: 'error',
      });
    },
  });

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    setPage(1);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempKeyword(event.target.value);
  };

  const handleSearch = () => {
    setKeyword(tempKeyword);
    setPage(1);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSaveIssue = (issue: GitHubIssue) => {
    if (!session) return;

    const repoUrl = issue.repository_url.replace(
      'https://api.github.com/repos/',
      'https://github.com/'
    );
    const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');

    saveIssue({
      issueId: issue.id.toString(),
      issueUrl: issue.html_url,
      title: issue.title,
      repoName: `${owner}/${repo}`,
      repoUrl,
    });
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const totalPages = Math.ceil((issuesData?.total_count || 0) / perPage);

  return (
    <MainLayout>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        Find Good First Issues
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          background:
            'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.1)',
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid container item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="language-select-label">Programming Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={language}
                  onChange={handleLanguageChange}
                  label="Programming Language"
                  data-testid="language-select"
                >
                  <MenuItem value="">All Languages</MenuItem>
                  {POPULAR_LANGUAGES.map(lang => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container item xs={12} md={5}>
              <TextField
                fullWidth
                variant="outlined"
                label="Keyword Search"
                value={tempKeyword}
                onChange={handleKeywordChange}
                onKeyPress={handleKeyPress}
                placeholder="Search issues by keyword..."
                data-testid="keyword-search"
                inputProps={{ 'data-testid': 'keyword-search-input' }}
              />
            </Grid>
            <Grid container item xs={12} md={3}>
              <GradientButton
                fullWidth
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                data-testid="search-button"
              >
                Search
              </GradientButton>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {issuesData?.total_count || 0} results found
          </Typography>

          <Stack spacing={2}>
            {issuesData?.items &&
              issuesData.items.map((issue: GitHubIssueFromApi) => {
                const repoUrl = issue.repository_url.replace(
                  'https://api.github.com/repos/',
                  'https://github.com/'
                );
                const repoName = repoUrl.replace('https://github.com/', '');
                const isSaved = savedIssueIds.includes(issue.id.toString());

                return (
                  <Paper
                    key={issue.id}
                    elevation={0}
                    data-testid="issue-card"
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      border: isSaved
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(0,0,0,0.08)',
                      boxShadow: isSaved ? '0 2px 8px rgba(16, 185, 129, 0.1)' : 'none',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: isSaved
                          ? '0 6px 16px rgba(16, 185, 129, 0.15)'
                          : '0 6px 16px rgba(0,0,0,0.08)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          {issue.owner_info && issue.owner_info.avatar_url && (
                            <Tooltip title={repoName.split('/')[0]}>
                              <Avatar
                                src={issue.owner_info.avatar_url}
                                alt={repoName.split('/')[0]}
                                sx={{ width: 40, height: 40 }}
                                component={Link}
                                href={issue.owner_info.html_url}
                                target="_blank"
                              />
                            </Tooltip>
                          )}
                          <Box>
                            <Typography
                              variant="h6"
                              component="h2"
                              sx={{ mb: 1, fontWeight: 'bold' }}
                            >
                              <Link
                                href={issue.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: 'none',
                                  color: '#4F46E5',
                                }}
                              >
                                {issue.title}
                              </Link>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              <Link
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  textDecoration: 'none',
                                  color: '#64748B',
                                }}
                              >
                                {repoName}
                              </Link>
                            </Typography>
                          </Box>
                        </Box>
                        {session && (
                          <Button
                            startIcon={isSaved ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                            size="small"
                            data-testid="save-button"
                            onClick={() => handleSaveIssue(issue)}
                            disabled={isSaved}
                            sx={{
                              color: isSaved ? '#10B981' : '#10B981',
                              borderColor: isSaved ? '#10B981' : '#10B981',
                              bgcolor: isSaved ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                              fontWeight: isSaved ? 'bold' : 'normal',
                              '&:hover': {
                                backgroundColor: isSaved
                                  ? 'rgba(16, 185, 129, 0.15)'
                                  : 'rgba(16, 185, 129, 0.08)',
                                borderColor: '#10B981',
                              },
                            }}
                            variant="outlined"
                          >
                            {isSaved ? 'Saved' : 'Save'}
                          </Button>
                        )}
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {issue.labels &&
                          issue.labels.map((label: GitHubLabel) => (
                            <Chip
                              key={label.id}
                              label={label.name}
                              size="small"
                              sx={{
                                bgcolor: `#${label.color}`,
                                color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff',
                                fontWeight: 500,
                                borderRadius: '4px',
                              }}
                            />
                          ))}
                      </Box>
                    </CardContent>
                  </Paper>
                );
              })}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages > 100 ? 100 : totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}

      {/* Snackbar to display success/failure messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
}
