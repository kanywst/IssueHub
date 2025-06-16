"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} IssueHub
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: { xs: 2, sm: 0 },
            }}
          >
            <MuiLink
              component={Link}
              href="/about"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              About
            </MuiLink>
            <MuiLink
              component={Link}
              href="/privacy"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="https://github.com/kanywst/issuehub"
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              color="text.secondary"
              underline="hover"
            >
              GitHub
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
