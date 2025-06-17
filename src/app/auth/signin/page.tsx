'use client';

import { Typography, Button, Paper, Container, Divider } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

export default function SignInPage() {
  const router = useRouter();

  const handleContinueWithoutSignIn = () => {
    router.push('/issues');
  };
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 4,
            mt: 8,
            textAlign: 'center',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 4,
              background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Sign in to IssueHub
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in with your GitHub account to save issues and track your favorite repositories.
          </Typography>

          <Button
            variant="contained"
            size="large"
            data-testid="github-signin-button"
            startIcon={<GitHubIcon />}
            onClick={() => signIn('github', { callbackUrl: '/' })}
            fullWidth
            sx={{
              mb: 3,
              background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
              color: 'white',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
              },
            }}
          >
            Sign in with GitHub
          </Button>

          <Divider sx={{ my: 3 }}>or</Divider>

          <Button
            variant="outlined"
            onClick={handleContinueWithoutSignIn}
            data-testid="continue-without-signin"
            fullWidth
            sx={{
              borderColor: '#4F46E5',
              color: '#4F46E5',
              '&:hover': {
                borderColor: '#10B981',
                color: '#10B981',
              },
            }}
          >
            Continue without signing in
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            By signing in, you agree to our{' '}
            <Link href="/privacy" style={{ color: '#4F46E5' }}>
              Privacy Policy
            </Link>
            .
          </Typography>
        </Paper>
      </Container>
    </MainLayout>
  );
}
