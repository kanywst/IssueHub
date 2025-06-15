"use client";

import { useState } from "react";
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
  Container,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { GitHub as GitHubIcon, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
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

  const handleSignIn = () => {
    signIn("github", { callbackUrl: window.location.href });
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Issues", path: "/issues" },
    { label: "Saved Issues", path: "/saved-issues", authRequired: true },
  ];

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            data-testid="header-logo"
            sx={{ 
              flexGrow: 1, 
              display: "flex", 
              alignItems: "center", 
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={() => router.push("/")}
          >
            <GitHubIcon sx={{ mr: 1 }} />
            IssueHub
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item) => {
                if (item.authRequired && !session) return null;
                return (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    href={item.path}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                );
              })}
              
              {session ? (
                <Box>
                  <IconButton onClick={handleMenu} color="inherit">
                    <Avatar
                      alt={session.user.name || ""}
                      src={session.user.image || ""}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => {
                      router.push("/profile");
                      handleClose();
                    }}>Profile</MenuItem>
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  data-testid="github-login-button"
                  onClick={() => signIn("github", { callbackUrl: window.location.href })}
                  startIcon={<GitHubIcon />}
                >
                  Login with GitHub
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box>
              <IconButton
                color="inherit"
                onClick={handleMobileMenu}
                edge="end"
                data-testid="mobile-menu-button"
              >
                <MenuIcon data-testid="MenuIcon" />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
              >
                {navItems.map((item) => {
                  if (item.authRequired && !session) return null;
                  return (
                    <MenuItem
                      key={item.path}
                      onClick={() => {
                        router.push(item.path);
                        handleMobileMenuClose();
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  );
                })}
                
                {session ? (
                  <>
                    <MenuItem onClick={() => {
                      router.push("/profile");
                      handleMobileMenuClose();
                    }}>Profile</MenuItem>
                    <MenuItem onClick={() => {
                      signOut();
                      handleMobileMenuClose();
                    }}>Logout</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => {
                    signIn("github", { callbackUrl: window.location.href });
                    handleMobileMenuClose();
                  }}>
                    Login with GitHub
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
