import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Box } from '@mui/material';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden', // Prevent scroll on body
        backgroundColor: '#0a0a0b',
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto', // Scrollbar for main content
          backgroundColor: '#0a0a0b',
          borderLeft: { md: '1px solid rgba(255,255,255,0.08)' },
          position: 'relative',
        }}
      >
        <Box sx={{ flex: 1, px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
