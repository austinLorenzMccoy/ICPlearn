"use client";

import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import StakingPools from "@/components/Home/StakingPools";
import LearningSection from "@/components/Home/LearningSection";
import SecuritySection from "@/components/Home/SecuritySection";
import CTASection from "@/components/Home/CTASection";


export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <StakingPools />
      <LearningSection />
      <SecuritySection />
      <CTASection />
    </main>
  );
}