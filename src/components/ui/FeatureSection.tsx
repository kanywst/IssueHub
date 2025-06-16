import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import {
  Search as SearchIcon,
  GitHub as GitHubIcon,
  BookmarkAdd as BookmarkAddIcon,
} from '@mui/icons-material';
import FeatureCard from './cards/FeatureCard';

const FeatureSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 12 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.875rem', sm: '2.25rem' },
          }}
        >
          Built for Open Source Beginners
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            maxWidth: 700,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          Everything you need to find and track your first open source contributions
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 16px)',
              md: 'calc(33.333% - 16px)',
            },
            maxWidth: 350,
          }}
        >
          <FeatureCard
            title="Easy to Find"
            description="Filter by programming language or repository to quickly find issues that match your skills and interests."
            icon={<SearchIcon />}
          />
        </Box>

        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 16px)',
              md: 'calc(33.333% - 16px)',
            },
            maxWidth: 350,
          }}
        >
          <FeatureCard
            title="Beginner Friendly"
            description="Focus exclusively on issues with the 'good first issue' label, ensuring they're suitable for newcomers."
            icon={<GitHubIcon />}
          />
        </Box>

        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 16px)',
              md: 'calc(33.333% - 16px)',
            },
            maxWidth: 350,
          }}
        >
          <FeatureCard
            title="Save for Later"
            description="Bookmark interesting issues to review later. Connect with your GitHub account for a seamless experience."
            icon={<BookmarkAddIcon />}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default FeatureSection;
