'use client';

import React from 'react';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        // Set to 0 to achieve "zero distance" since MainLayout handles the header spacing
        pt: 0,
        pb: { xs: 12, md: 20 },
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Badge - Technical Look */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              mb: 3,
              mt: 0,
              borderRadius: '4px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.1)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#60a5fa',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
              }}
            >
              ISSUEHUB v0.3.0
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' },
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              mb: 4,
              color: '#fff',
              textShadow: '0 0 40px rgba(255,255,255,0.1)',
            }}
          >
            Contribute to
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))',
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
              maxWidth: '580px',
              mx: 'auto',
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            The curated search engine for &quot;good first issues&quot;.
            <br className="hidden sm:block" />
            Find your next commit in seconds, not hours.
          </Typography>

          {/* CTA */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/issues"
              endIcon={<ArrowForward />}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                borderRadius: '8px',
                backgroundColor: '#fff',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#e5e7eb',
                  boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                },
                transition: 'all 0.3s',
              }}
            >
              Start Exploring
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/about"
              sx={{
                px: 5,
                py: 2,
                fontSize: '1rem',
                borderRadius: '8px',
                borderColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
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
