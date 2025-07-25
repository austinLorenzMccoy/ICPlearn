/**
 * Enhanced Learning Page - Comprehensive learning dashboard and course management
 */

import { Metadata } from 'next';
import LearningDashboard from '@/components/Dashboard/LearningDashboard';

export const metadata: Metadata = {
  title: 'Learning Dashboard - ICPlearn',
  description: 'Track your learning progress and discover new courses in the Internet Computer ecosystem',
};

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Learning Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your progress and continue your journey in the Internet Computer ecosystem
            </p>
          </div>
          
          <LearningDashboard />
        </div>
      </div>
    </div>
  );
}
