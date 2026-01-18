'use client';

import MainLayout from '@/components/layout/MainLayout';
import {
  Typography,
  Box,
  CardContent,
  Button,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useSavedIssues } from '@/hooks/useSavedIssues';

export default function SavedIssuesPage() {
  const { savedIssues, isLoaded, removeIssue } = useSavedIssues();
  const theme = useTheme();

  if (!isLoaded) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #f43f5e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))',
        }}
      >
        Saved Issues
      </Typography>

      {savedIssues && savedIssues.length > 0 ? (
        <Stack spacing={2}>
          {savedIssues.map(issue => {
            const owner = issue.repoName.split('/')[0];
            return (
              <Paper
                key={issue.issueId}
                elevation={0}
                data-testid="issue-card"
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  transition: 'all 0.2s',
                  backgroundColor: alpha(theme.palette.background.paper, 0.4),
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {owner && (
                        <Tooltip title={owner}>
                          <Avatar
                            src={`https://github.com/${owner}.png`}
                            alt={owner}
                            sx={{ width: 40, height: 40, border: '1px solid rgba(255, 255, 255, 0.1)' }}
                          />
                        </Tooltip>
                      )}
                      <Box>
                        <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          <Link
                            href={issue.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: theme.palette.text.primary,
                            }}
                          >
                            {issue.title}
                          </Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          <Link
                            href={issue.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {issue.repoName}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      size="small"
                      data-testid="remove-button"
                      onClick={() => removeIssue(issue.issueId)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        },
                      }}
                    >
                      Remove
                    </Button>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                  <Typography variant="body2" color="text.secondary">
                    Saved on: {new Date(issue.savedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        <Alert
          severity="info"
          sx={{
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.4),
            color: 'text.primary',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            '& .MuiAlert-icon': {
              color: '#3b82f6',
            },
          }}
        >
          You haven&apos;t saved any issues yet. Browse the &quot;Find Issues&quot; page to save
          interesting issues.
        </Alert>
      )}
    </MainLayout>
  );
}
