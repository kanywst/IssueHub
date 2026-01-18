'use client';

import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/ui/HeroSection';
import FeatureSection from '@/components/ui/FeatureSection';
import CallToAction from '@/components/ui/CallToAction';

export default function Home() {
  return (
    <MainLayout>
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
