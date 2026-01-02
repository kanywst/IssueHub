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
  Avatar,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import { GitHub as GitHubIcon, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Issues', path: '/issues' },
    { label: 'Saved Issues', path: '/saved-issues', authRequired: true },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 24,
        left: 0,
        right: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        pointerEvents: 'none', // Allow clicks to pass through outside the navbar
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '999px', // Pill shape
          backgroundColor: alpha('#0F172A', 0.65),
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: '20px!important', minHeight: '64px!important' }}>
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
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
              }}
            >
              <GitHubIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              IssueHub
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {navItems.map((item) => {
                if (item.authRequired && !session) return null;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    href={item.path}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      px: 2,
                      borderRadius: '50px',
                      '&:hover': {
                        color: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* Right Actions */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            {session ? (
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session.user.name || ''}
                  src={session.user.image || ''}
                  sx={{ width: 32, height: 32, border: '2px solid rgba(255,255,255,0.1)' }}
                />
              </IconButton>
            ) : (
              <Button
                variant="contained"
                size="small"
                onClick={() => signIn('github')}
                sx={{
                  borderRadius: '50px',
                  backgroundColor: '#fff',
                  color: '#000',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#e2e2e2',
                  },
                }}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMobileMenu}
                sx={{ ml: 1, color: 'text.secondary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Menus */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                backgroundColor: '#1E293B',
                border: '1px solid rgba(255,255,255,0.1)',
                minWidth: 180,
              }
            }}
          >
            <MenuItem onClick={() => { router.push('/profile'); handleClose(); }}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut} sx={{ color: 'error.main' }}>Logout</MenuItem>
          </Menu>

          <Menu
            anchorEl={mobileMenuAnchorEl}
            open={Boolean(mobileMenuAnchorEl)}
            onClose={handleMobileMenuClose}
            PaperProps={{ sx: { mt: 1.5, backgroundColor: '#1E293B' } }}
          >
            {navItems.map((item) => {
              if (item.authRequired && !session) return null;
              return (
                <MenuItem
                  key={item.path}
                  onClick={() => { router.push(item.path); handleMobileMenuClose(); }}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
