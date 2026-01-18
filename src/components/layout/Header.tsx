'use client';

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GitHub as GitHubIcon, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Issues', path: '/issues' },
    { label: 'Saved Issues', path: '/saved-issues' },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0, // Fixed to top for visibility and futuristic feel
        left: 0,
        right: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        // Add border bottom to clearly define the section
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(3, 7, 18, 0.8)' : 'transparent', // Background color on scroll
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'transparent', // AppBar itself is transparent
          maxWidth: '1200px', // Widen the width
          width: '100%',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            '&.MuiToolbar-root': {
              minHeight: '72px',
            },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: 1.5,
            }}
            onClick={() => router.push('/')}
            data-testid="header-logo"
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px', // Rounded square instead of circle
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
              }}
            >
              <GitHubIcon sx={{ fontSize: 22 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
                fontSize: '1.25rem',
              }}
            >
              IssueHub
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {navItems.map(item => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: '6px',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Actions & Mobile */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton color="inherit" onClick={handleMobileMenu} sx={{ color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                backgroundColor: '#111827',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
              },
            }}
          >
            {navItems.map(item => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  handleMobileMenuClose();
                }}
                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
