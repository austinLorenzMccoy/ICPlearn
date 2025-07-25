/**
 * Feature Showcase Page - Demonstrates all new ICPlearn features
 */

import { Metadata } from 'next';
import FeatureShowcase from '@/components/examples/FeatureShowcase';

export const metadata: Metadata = {
  title: 'Feature Showcase - ICPlearn',
  description: 'Explore the new user profile and learning dashboard features of ICPlearn',
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <FeatureShowcase />
        </div>
      </div>
    </div>
  );
}
