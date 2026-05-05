'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Typography, Box, Stack, Alert } from '@mui/material';
import { useSavedIssues } from '@/hooks/useSavedIssues';
import { IssueRow } from '@/components/ui/IssueRow';

export default function SavedIssuesPage() {
  const { savedIssues, removeIssue } = useSavedIssues();

  return (
    <MainLayout>
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.02em',
              fontSize: '1.5rem',
            }}
          >
            Saved Issues
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            Your personal library of bookmarked issues.
          </Typography>
        </Box>

        {savedIssues && savedIssues.length > 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#0a0a0b',
              }}
            >
              <Stack>
                {savedIssues.map((issue, idx) => (
                  <IssueRow
                    key={issue.issueId}
                    id={issue.issueId}
                    title={issue.title}
                    repoName={issue.repoName}
                    issueUrl={issue.issueUrl}
                    dateText={new Date(issue.savedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                    showStatus={false}
                    isSaved={true}
                    actionType="remove"
                    onAction={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      removeIssue(issue.issueId);
                    }}
                    isLast={idx === savedIssues.length - 1}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        ) : (
          <Alert
            severity="info"
            sx={{
              borderRadius: '8px',
              backgroundColor: 'background.paper',
              color: 'text.primary',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              '& .MuiAlert-icon': {
                color: 'text.secondary',
              },
            }}
          >
            Your library is empty. Save interesting issues from Explore to find them here later.
          </Alert>
        )}
      </Box>
    </MainLayout>
  );
}
