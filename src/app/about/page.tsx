"use client";

import MainLayout from "@/components/layout/MainLayout";
import {
  Typography,
  Box,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import Link from "next/link";

export default function AboutPage() {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 4,
            background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          About IssueHub
        </Typography>

        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            IssueHub is a platform designed for beginners who want to contribute
            to the open-source software (OSS) ecosystem. By making it easy to
            find issues labeled as "good first issue," we help newcomers take
            their first steps into OSS contribution.
          </Typography>

          <Typography variant="body1" paragraph>
            Many people want to contribute to open source, but taking that first
            step can be challenging. Common concerns include "I don't know where
            to begin" or "I can't find issues that match my skill level."
          </Typography>

          <Typography variant="body1" paragraph>
            IssueHub addresses these challenges by aggregating GitHub issues
            labeled as "good first issue" in one place, making them easy to
            search and filter. This allows beginners to find suitable issues and
            take their first steps into the OSS community.
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
          >
            Technology Stack
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Frontend
                  </Typography>
                  <ul>
                    <li>Next.js 14 + TypeScript</li>
                    <li>Material-UI (MUI) v5 + Emotion</li>
                    <li>SWR / React Query</li>
                    <li>NextAuth.js</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Backend
                  </Typography>
                  <ul>
                    <li>NestJS 10 + TypeScript</li>
                    <li>tRPC</li>
                    <li>Prisma ORM</li>
                    <li>GitHub API (Octokit)</li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 3, color: "primary.main", fontWeight: 600 }}
          >
            Open Source Project
          </Typography>
          <Typography variant="body1" paragraph>
            IssueHub itself is an open-source project. We welcome contributions
            including feature additions and bug fixes.
          </Typography>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              component={Link}
              href="https://github.com/kanywst/issuehub"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
                color: "white",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                },
              }}
            >
              View Project on GitHub
            </Button>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
}
