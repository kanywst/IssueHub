'use client';

import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon, BookmarkBorder as BookmarkIcon, GitHub as GitHubIcon, Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
    { label: 'Explore', path: '/issues', icon: <SearchIcon fontSize="small" /> },
    { label: 'Library', path: '/saved-issues', icon: <BookmarkIcon fontSize="small" /> },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: 240,
        flexShrink: 0,
        height: '100%',
        display: { xs: 'none', md: 'flex' }, // Hide on mobile for now, or implement a drawer later
        flexDirection: 'column',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '6px',
            background: '#fafafa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0a0a0b',
          }}
        >
          <GitHubIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem' }}>
          IssueHub
        </Typography>
      </Box>

      <Box sx={{ flex: 1, px: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, display: 'block', mb: 1, px: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Menu
        </Typography>
        <List disablePadding>
          {navItems.map((item) => {
            const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: '8px',
                    py: 0.75,
                    px: 1.5,
                    backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                    '&:hover': {
                      backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: active ? '#fafafa' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      variant: 'body2', 
                      sx: { fontWeight: active ? 600 : 500, color: active ? '#fafafa' : 'text.secondary' } 
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
          {new Date().getFullYear()} © IssueHub
        </Typography>
      </Box>
    </Box>
  );
}
