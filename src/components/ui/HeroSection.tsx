'use client';

import React from 'react';
import { Box, Container, Stack, Typography, useTheme, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import GradientButton from '@/components/ui/buttons/GradientButton';

const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        pt: 0,
        pb: { xs: 12, md: 20 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.5,
              mb: 4,
              borderRadius: '999px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: theme.palette.secondary.main,
                boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 0.5 }}
            >
              IssueHub v0.2.0
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '3.5rem', sm: '5rem', md: '7rem' },
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              mb: 4,
              color: '#fff',
              textShadow: '0 0 80px rgba(255,255,255,0.15)',
            }}
          >
            Contribute to
            <br />
            <Box
              component="span"
              sx={{
                color: 'transparent',
                background: 'linear-gradient(to right, #818CF8, #34D399)',
                WebkitBackgroundClip: 'text',
                opacity: 0.9,
              }}
            >
              Open Source.
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              lineHeight: 1.6,
            }}
          >
            The curated search engine for &quot;good first issues&quot;.
            <br className="hidden md:block" />
            Find your next commit in seconds, not hours.
          </Typography>

          {/* CTA */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <GradientButton
              size="large"
              component={Link}
              href="/issues"
              endIcon={<ArrowForward />}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                borderRadius: '50px',
                background: '#fff',
                color: '#000',
                '&:hover': {
                  background: '#e2e2e2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 40px -10px rgba(255,255,255,0.3)',
                },
              }}
            >
              Start Exploring
            </GradientButton>

            <Button
              component={Link}
              href="/about"
              sx={{
                color: 'text.secondary',
                px: 3,
                '&:hover': { color: '#fff', backgroundColor: 'transparent' },
              }}
            >
              How it works
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
