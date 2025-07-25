/**
 * Feature Showcase Component - Demonstrates all new ICPlearn features
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Trophy, 
  Zap, 
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useICPBackend, useCurrentUser } from '@/hooks/useICPBackend';

interface FeatureDemo {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  component: React.ReactNode;
}

export default function FeatureShowcase() {
  const { isAuthenticated, login, isLoading } = useICPBackend();
  const { user, loading: userLoading } = useCurrentUser();
  const [activeDemo, setActiveDemo] = useState<string>('profile');

  const features: FeatureDemo[] = [
    {
      id: 'profile',
      title: 'User Profile',
      description: 'Complete profile management with ICP integration',
      icon: <User className="h-5 w-5" />,
      color: 'from-[#3B00B9] to-[#29ABE2]',
      component: <ProfileDemo user={user} />
    },
    {
      id: 'learning',
      title: 'Learning Dashboard',
      description: 'Track progress and manage your learning journey',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'from-[#ED1E79] to-[#F15A24]',
      component: <LearningDemo />
    },
    {
      id: 'progress',
      title: 'Progress Tracking',
      description: 'Visual progress indicators and achievements',
      icon: <Trophy className="h-5 w-5" />,
      color: 'from-[#50C878] to-[#32CD32]',
      component: <ProgressDemo user={user} />
    },
    {
      id: 'gamification',
      title: 'Gamification',
      description: 'Points, levels, and streak tracking',
      icon: <Zap className="h-5 w-5" />,
      color: 'from-[#F15A24] to-[#FF6B35]',
      component: <GamificationDemo user={user} />
    }
  ];

  const activeFeature = features.find(f => f.id === activeDemo);

  if (!isAuthenticated) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-[#3B00B9] mr-2" />
            ICPlearn Feature Showcase
          </CardTitle>
          <CardDescription>
            Login with Internet Identity to explore all features
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={login} 
            disabled={isLoading}
            className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white"
          >
            {isLoading ? 'Connecting...' : 'Login with Internet Identity'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ICPlearn Feature Showcase
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore the new user profile and learning dashboard features
        </p>
      </div>

      {/* Feature Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                activeDemo === feature.id 
                  ? 'ring-2 ring-[#3B00B9] shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setActiveDemo(feature.id)}
            >
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Active Feature Demo */}
      {activeFeature && (
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${activeFeature.color} text-white`}>
              <CardTitle className="flex items-center">
                {activeFeature.icon}
                <span className="ml-2">{activeFeature.title}</span>
              </CardTitle>
              <CardDescription className="text-white/80">
                {activeFeature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {activeFeature.component}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
          <CardDescription>
            Explore the full features in their dedicated pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="justify-between"
              onClick={() => window.open('/profile', '_blank')}
            >
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                View Full Profile
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-between"
              onClick={() => window.open('/learning', '_blank')}
            >
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Learning Dashboard
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-between"
              onClick={() => window.open('/dashboard', '_blank')}
            >
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Main Dashboard
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Profile Demo Component
function ProfileDemo({ user }: { user: any }) {
  if (!user) {
    return <div className="text-center text-gray-500">Loading user data...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] rounded-full flex items-center justify-center text-white text-xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.username}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <Badge className="mt-1">Level {user.level || 1}</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-[#3B00B9]">
            {Number(user.total_points || 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Points</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-[#ED1E79]">3</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-[#50C878]">7</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-[#F15A24]">₿0.00234</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Earned</div>
        </div>
      </div>
    </div>
  );
}

// Learning Demo Component
function LearningDemo() {
  const courses = [
    { title: 'ICP Fundamentals', progress: 75, status: 'active' },
    { title: 'Motoko Programming', progress: 45, status: 'active' },
    { title: 'Chain Fusion', progress: 100, status: 'completed' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 rounded-lg">
          <BookOpen className="h-8 w-8 text-[#3B00B9] mx-auto mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Active Courses</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-[#ED1E79]/10 to-[#F15A24]/10 rounded-lg">
          <Trophy className="h-8 w-8 text-[#ED1E79] mx-auto mb-2" />
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-[#50C878]/10 to-[#32CD32]/10 rounded-lg">
          <Target className="h-8 w-8 text-[#50C878] mx-auto mb-2" />
          <div className="text-2xl font-bold">6.5h</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">This Week</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">Continue Learning</h4>
        {courses.map((course, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h5 className="font-medium text-gray-900 dark:text-white">{course.title}</h5>
                {course.status === 'completed' && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
              </div>
              <Progress value={course.progress} className="w-32 h-2 mt-1" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {course.progress}%
            </div>
            <Button size="sm" className="ml-3">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Progress Demo Component
function ProgressDemo({ user }: { user: any }) {
  const currentLevel = Number(user?.level || 1);
  const totalPoints = Number(user?.total_points || 0);
  const nextLevelPoints = currentLevel * 1000;
  const currentLevelBase = (currentLevel - 1) * 1000;
  const progress = ((totalPoints - currentLevelBase) / (nextLevelPoints - currentLevelBase)) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Level {currentLevel}
        </div>
        <Progress value={Math.max(0, Math.min(100, progress))} className="h-4 mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {totalPoints} / {nextLevelPoints} points to next level
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-green-700 dark:text-green-300">85%</div>
          <div className="text-sm text-green-600 dark:text-green-400">Course Completion</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
          <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">+12%</div>
          <div className="text-sm text-blue-600 dark:text-blue-400">This Month</div>
        </div>
      </div>
    </div>
  );
}

// Gamification Demo Component
function GamificationDemo({ user }: { user: any }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Zap className="h-6 w-6 text-orange-600" />
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              7 Day Streak
            </Badge>
          </div>
          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
            Learning Streak
          </h4>
          <p className="text-sm text-orange-600 dark:text-orange-300">
            Keep it up! You're on fire 🔥
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="h-6 w-6 text-purple-600" />
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {Number(user?.total_points || 0).toLocaleString()} pts
            </Badge>
          </div>
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
            Total Points
          </h4>
          <p className="text-sm text-purple-600 dark:text-purple-300">
            Earned through learning achievements
          </p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          Weekly Goal Progress
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-yellow-700 dark:text-yellow-300">6.5h of 10h</span>
          <span className="text-sm text-yellow-600 dark:text-yellow-400">65%</span>
        </div>
        <Progress value={65} className="h-3" />
      </div>
    </div>
  );
}
