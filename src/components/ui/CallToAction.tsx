'use client';

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { ArrowForward } from '@mui/icons-material';

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <Box sx={{ px: 2, mb: 12 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: 'rgba(3, 7, 18, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            py: { xs: 8, md: 10 },
            px: { xs: 3, md: 6 },
            textAlign: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
            },
          }}
        >
          {/* Background Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                fontWeight: 400,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href={buttonLink}
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: '#fff',
                color: '#000',
                px: 5,
                py: 2,
                fontSize: '1rem',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#e5e7eb',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                },
                transition: 'all 0.3s',
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction;
