"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { trpc } from "@/lib/trpc-client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SavedIssuesPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  const { data: savedIssues, isLoading, refetch } = trpc.issues.getSavedIssues.useQuery(
    undefined,
    {
      enabled: !!session,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: removeSavedIssue } = trpc.issues.removeSavedIssue.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleRemoveIssue = (id: string) => {
    removeSavedIssue({ id });
  };

  if (status === "loading" || isLoading) {
    return (
      <MainLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" sx={{ 
        mb: 4,
        background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}>
        Saved Issues
      </Typography>

      {savedIssues && savedIssues.length > 0 ? (
        <Stack spacing={2}>
          {savedIssues.map((issue) => (
            <Paper 
              key={issue.id} 
              elevation={0}
              data-testid="issue-card"
              sx={{ 
                mb: 2, 
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                "&:hover": {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {issue.owner_info && issue.owner_info.avatar_url && (
                      <Tooltip title={issue.repoName.split('/')[0]}>
                        <Avatar
                          src={issue.owner_info.avatar_url}
                          alt={issue.repoName.split('/')[0]}
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
                        sx={{ mb: 1, fontWeight: "bold" }}
                      >
                        <Link 
                          href={issue.issueUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            textDecoration: 'none',
                            color: '#4F46E5'
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
                            color: '#64748B'
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
                    onClick={() => handleRemoveIssue(issue.id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: 'rgba(239, 68, 68, 0.05)'
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Saved on: {new Date(issue.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Alert 
          severity="info"
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: '#4F46E5'
            }
          }}
        >
          You haven&apos;t saved any issues yet. Browse the &quot;Find Issues&quot; page to save interesting issues.
        </Alert>
      )}
    </MainLayout>
  );
}
