"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            mt: 8,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "5rem",
              fontWeight: "bold",
              mb: 2,
              background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you are looking for doesn't exist or may have been moved.
          </Typography>

          <Button
            variant="contained"
            component={Link}
            href="/"
            startIcon={<HomeIcon />}
            sx={{
              background: "linear-gradient(90deg, #4F46E5 0%, #10B981 100%)",
              color: "white",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              },
            }}
          >
            Return Home
          </Button>
        </Paper>
      </Container>
    </MainLayout>
  );
}
