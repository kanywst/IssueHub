import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(90deg, rgba(79, 70, 229, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%)',
        color: 'white',
        py: { xs: 8, md: 10 },
        px: 3,
        borderRadius: 4,
        textAlign: 'center',
        mb: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 5, fontWeight: 400, opacity: 0.9 }}>
          {subtitle}
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          href={buttonLink}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            px: 5,
            py: 1.5,
            fontSize: '1.125rem',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {buttonText}
        </Button>
      </Container>
    </Box>
  );
};

export default CallToAction;
