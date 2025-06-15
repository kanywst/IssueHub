import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { GitHub as GitHubIcon, Search as SearchIcon } from '@mui/icons-material';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import GradientButton from './buttons/GradientButton';

const HeroSection: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        borderRadius: 4,
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        mb: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -100, 
          right: -100, 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0) 70%)',
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -50, 
          left: -50, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)',
        }} 
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
              background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: "-0.02em",
            }}
          >
            Find Your First Step<br />into Open Source
          </Typography>
          
          <Typography
            variant="h5"
            sx={{ 
              mb: 5, 
              maxWidth: "800px", 
              mx: "auto",
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            IssueHub helps beginners discover "good first issue" labeled tasks 
            to make contributing to open source projects easy and accessible.
          </Typography>
          
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <GradientButton
              size="large"
              component={Link}
              href="/issues"
              startIcon={<SearchIcon />}
              sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
            >
              Browse Issues
            </GradientButton>
            
            {!session && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => signIn("github")}
                startIcon={<GitHubIcon />}
                sx={{ px: 4, py: 1.5, fontSize: '1rem', borderWidth: 2 }}
              >
                Sign in with GitHub
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
