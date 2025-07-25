"use client";

import { useEffect, useState } from "react";
import { useICPBackend } from "@/hooks/useICPBackend";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import LearningSection from "@/components/Home/LearningSection";
import SecuritySection from "@/components/Home/SecuritySection";
import CTASection from "@/components/Home/CTASection";
import ICPStatsSection from "@/components/Home/ICPStatsSection";
import FeaturesSection from "@/components/Home/FeaturesSection";

export default function HomePage() {
  const { isInitialized, healthCheck, getUserCount, listCourses } = useICPBackend();
  const [stats, setStats] = useState({
    userCount: 0,
    courseCount: 0,
    isBackendHealthy: false
  });

  useEffect(() => {
    const loadStats = async () => {
      if (isInitialized) {
        try {
          const [healthy, userCount, coursesResult] = await Promise.all([
            healthCheck(),
            getUserCount(),
            listCourses(1, 100) // Get total course count
          ]);

          setStats({
            userCount: userCount || 0,
            courseCount: coursesResult?.total || 0,
            isBackendHealthy: healthy
          });
        } catch (error) {
          console.error('Failed to load stats:', error);
        }
      }
    };

    loadStats();
  }, [isInitialized, healthCheck, getUserCount, listCourses]);

  return (
    <main>
      <Hero stats={stats} />
      <ICPStatsSection stats={stats} />
      <FeaturesSection />
      <HowItWorks />
      <LearningSection />
      <SecuritySection />
      <CTASection />
    </main>
  );
}