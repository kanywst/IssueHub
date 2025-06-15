"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Typography, Box, Paper, Container, Divider } from "@mui/material";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={{ mb: 4, 
          background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Privacy Policy
        </Typography>
        
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            The "IssueHub" service collects the following information:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                GitHub account information (name, email address, profile image, etc.)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Information related to saved issues
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Website usage data (access logs, etc.)
              </Typography>
            </li>
          </ul>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the collected information for the following purposes:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                Providing, maintaining, and improving our services
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Providing personalized experiences to users
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                Ensuring security
              </Typography>
            </li>
          </ul>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            3. Information Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            Our service does not share users' personal information with third parties, except when required by law.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            4. Data Protection
          </Typography>
          <Typography variant="body1" paragraph>
            Our service implements appropriate security measures to protect the information we collect. However, we cannot guarantee complete security over the internet.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            5. Policy Changes
          </Typography>
          <Typography variant="body1" paragraph>
            Our service may update this privacy policy from time to time. If there are any changes, we will notify you on this page.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
            6. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about our privacy policy, please contact us through our contact form.
          </Typography>
          
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Last updated: June 15, 2025
            </Typography>
          </Box>
        </Paper>
      </Container>
    </MainLayout>
  );
}
