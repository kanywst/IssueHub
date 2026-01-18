'use client';

import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { GitHub as GitHubIcon } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                }}
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
              </Box>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                IssueHub
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} IssueHub. Open source contributions made easy.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <MuiLink
              component={Link}
              href="/about"
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              About
            </MuiLink>
            <MuiLink
              component={Link}
              href="/privacy"
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="https://github.com/kanywst/issuehub"
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              GitHub
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
