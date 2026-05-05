'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Box, Typography, Paper } from '@mui/material';
import {
  Search as SearchIcon,
  GitHub as GitHubIcon,
  BookmarkBorder as BookmarkIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const quickLinks = [
  {
    title: 'Explore Issues',
    desc: 'Browse and filter the latest good first issues',
    icon: <SearchIcon />,
    href: '/issues',
  },
  {
    title: 'Your Library',
    desc: 'View your saved issues for later',
    icon: <BookmarkIcon />,
    href: '/saved-issues',
  },
  {
    title: 'Contribute',
    desc: 'Help us improve IssueHub on GitHub',
    icon: <GitHubIcon />,
    href: 'https://github.com/takumaniwa/IssueHub',
  },
];

export default function Home() {
  return (
    <MainLayout>
      <Box sx={{ maxWidth: '1000px', mx: 'auto', pt: { xs: 4, md: 10 } }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: '-0.03em', mb: 2 }}
        >
          Welcome to IssueHub.
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, mb: 6 }}>
          Ready to make your next open source contribution?
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {quickLinks.map(link => {
            const isExternal = link.href.startsWith('http');
            return (
              <Paper
                key={link.href}
                component={isExternal ? 'a' : Link}
                href={link.href}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'grey.900', // Zinc 900
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    color: '#fafafa',
                    border: '1px solid rgba(255,255,255,0.08)',
                    mb: 3,
                  }}
                >
                  {link.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#fafafa', mb: 0.5 }}>
                  {link.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                  {link.desc}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Box>
    </MainLayout>
  );
}
