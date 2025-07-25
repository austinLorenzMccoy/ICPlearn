/**
 * Profile Page - User profile management and information
 */

import { Metadata } from 'next';
import UserProfile from '@/components/Profile/UserProfile';

export const metadata: Metadata = {
  title: 'Profile - ICPlearn',
  description: 'Manage your ICPlearn profile and view your learning progress',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account information and track your learning journey
            </p>
          </div>
          
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
