"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Typography,
  Box,
  Card,
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
} from "@mui/material";
import { Search as SearchIcon, BookmarkAdd as BookmarkAddIcon } from "@mui/icons-material";
import { trpc } from "@/lib/trpc-client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import GradientButton from "@/components/ui/buttons/GradientButton";

const POPULAR_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "c#", label: "C#" },
  { value: "c++", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
];

export default function IssuesPage() {
  const { data: session } = useSession();
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data: issuesData, isLoading } = trpc.issues.getGoodFirstIssues.useQuery(
    { language, page, perPage },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: saveIssue } = trpc.issues.saveIssue.useMutation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSaveIssue = (issue: any) => {
    if (!session) return;

    const repoUrl = issue.repository_url.replace("https://api.github.com/repos/", "https://github.com/");
    const [owner, repo] = repoUrl.replace("https://github.com/", "").split("/");

    saveIssue({
      issueId: issue.id.toString(),
      issueUrl: issue.html_url,
      title: issue.title,
      repoName: `${owner}/${repo}`,
      repoUrl,
    });
  };

  const totalPages = Math.ceil((issuesData?.total_count || 0) / perPage);

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        mb: 4, 
        background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
      }}>
        Find Good First Issues
      </Typography>

      <Paper 
        elevation={0}
        sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.1)'
        }}
      >
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="language-select-label">Programming Language</InputLabel>
                <Select
                  labelId="language-select-label"
                  value={language}
                  onChange={handleLanguageChange}
                  label="Programming Language"
                >
                  <MenuItem value="">All Languages</MenuItem>
                  {POPULAR_LANGUAGES.map((lang) => (
                    <MenuItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <GradientButton
                fullWidth
                startIcon={<SearchIcon />}
                onClick={() => setPage(1)}
              >
                Search
              </GradientButton>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {issuesData?.total_count || 0} results found
          </Typography>

          <Stack spacing={2}>
            {issuesData?.items.map((issue: any) => {
              const repoUrl = issue.repository_url.replace(
                "https://api.github.com/repos/",
                "https://github.com/"
              );
              const repoName = repoUrl.replace("https://github.com/", "");

              return (
                <Paper 
                  key={issue.id} 
                  elevation={0}
                  data-testid="issue-card"
                  sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    border: '1px solid rgba(0,0,0,0.08)',
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
                            sx={{ mb: 1, fontWeight: "bold" }}
                          >
                            <Link 
                              href={issue.html_url} 
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
                              href={repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                textDecoration: 'none',
                                color: '#64748B'
                              }}
                            >
                              {repoName}
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                      {session && (
                        <Button
                          startIcon={<BookmarkAddIcon />}
                          size="small"
                          data-testid="save-button"
                          onClick={() => handleSaveIssue(issue)}
                          sx={{
                            color: '#10B981',
                            borderColor: '#10B981',
                            "&:hover": {
                              backgroundColor: 'rgba(16, 185, 129, 0.08)',
                              borderColor: '#10B981'
                            }
                          }}
                          variant="outlined"
                        >
                          Save
                        </Button>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {issue.labels.map((label: any) => (
                        <Chip
                          key={label.id}
                          label={label.name}
                          size="small"
                          sx={{
                            bgcolor: `#${label.color}`,
                            color: parseInt(label.color, 16) > 0xffffff / 2 ? "#000" : "#fff",
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
    </MainLayout>
  );
}
