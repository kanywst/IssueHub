import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Box, Container } from '@mui/material';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          // Adjust padding top to match header height (approx 72px) so content starts immediately after
          pt: { xs: 14, md: 15 },
          pb: 8,
          flex: 1,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}