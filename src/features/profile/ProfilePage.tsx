"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Divider,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GradientButton from "@/components/ui/buttons/GradientButton";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "loading") {
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
      <Typography
        variant="h4"
        component="h1"
        data-testid="profile-heading"
        sx={{
          mb: 4,
          background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Profile
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Avatar
              src={session?.user?.image || ""}
              alt={session?.user?.name || ""}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "4px solid rgba(79, 70, 229, 0.1)",
              }}
            />
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
              {session?.user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {session?.user?.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              component={Link}
              href="https://github.com/settings/profile"
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
              sx={{
                mb: 2,
                borderColor: "#4F46E5",
                color: "#4F46E5",
                "&:hover": {
                  backgroundColor: "rgba(79, 70, 229, 0.05)",
                  borderColor: "#4F46E5",
                },
              }}
            >
              Edit GitHub Profile
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => signOut()}
              fullWidth
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                },
              }}
            >
              Logout
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 3,
                color: "#4F46E5",
                fontWeight: "bold",
              }}
            >
              Activity
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Saved Issues
              </Typography>
              <GradientButton component={Link} href="/saved-issues">
                View Saved Issues
              </GradientButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Settings
              </Typography>
              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  "& .MuiAlert-icon": {
                    color: "#4F46E5",
                  },
                }}
              >
                Custom settings are not available yet. Please check back for
                future updates.
              </Alert>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
