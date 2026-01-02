import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import {
  Search as SearchIcon,
  GitHub as GitHubIcon,
  BookmarkAdd as BookmarkAddIcon,
} from '@mui/icons-material';
import FeatureCard from './cards/FeatureCard';

const FeatureSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: 20 }}>
      <Box sx={{ textAlign: 'center', mb: 10 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Built for Open Source Beginners
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 700,
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Everything you need to find and track your first open source contributions
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            title="Easy to Find"
            description="Filter by programming language or repository to quickly find issues that match your skills and interests."
            icon={<SearchIcon />}
            iconColor="primary"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            title="Beginner Friendly"
            description="Focus exclusively on issues with the 'good first issue' label, ensuring they're suitable for newcomers."
            icon={<GitHubIcon />}
            iconColor="secondary"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FeatureCard
            title="Save for Later"
            description="Bookmark interesting issues to review later. Connect with your GitHub account for a seamless experience."
            icon={<BookmarkAddIcon />}
            iconColor="info"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureSection;