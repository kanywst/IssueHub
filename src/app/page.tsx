"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import HeroSection from "@/components/ui/HeroSection";
import FeatureSection from "@/components/ui/FeatureSection";
import CallToAction from "@/components/ui/CallToAction";

export default function Home() {
  const { data: session } = useSession();

  return (
    <MainLayout>
      {/* Debug info - only displayed when DEBUG_MODE=true */}
      {session && process.env.NEXT_PUBLIC_DEBUG_MODE === "true" && (
        <Box sx={{ p: 2, mb: 4, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="h6">Login Info (Debug)</Typography>
          <pre style={{ overflow: 'auto', maxHeight: '200px' }}>
            {JSON.stringify({
              name: session.user?.name,
              email: session.user?.email,
              image: session.user?.image,
              id: session.user?.id,
            }, null, 2)}
          </pre>
        </Box>
      )}
      
      <HeroSection />
      
      <FeatureSection />
      
      <CallToAction 
        title="Ready to Start Contributing?"
        subtitle="Join thousands of developers who have taken their first step into open source with IssueHub"
        buttonText="Start Exploring"
        buttonLink="/issues"
      />
    </MainLayout>
  );
}
