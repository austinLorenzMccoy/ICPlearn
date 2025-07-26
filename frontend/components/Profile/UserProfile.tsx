'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Zap,
  Edit3,
  Shield,
  Coins,
  TrendingUp,
  Award,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useICPBackend, useCurrentUser } from '@/hooks/useICPBackend';

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalPoints: number;
  currentLevel: number;
  bitcoinEarned: number;
  learningStreak: number;
}

export default function UserProfile() {
  const { logout, updateUser, isLoading } = useICPBackend();
  const { user, loading: userLoading, principal } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalPoints: 0,
    currentLevel: 1,
    bitcoinEarned: 0,
    learningStreak: 0
  });

  // Calculate user stats from backend data
  useEffect(() => {
    if (user) {
      setStats({
        totalCourses: 8, // Will be fetched from backend
        completedCourses: 3, // Will be calculated from progress
        totalPoints: Number(user.total_points || 0),
        currentLevel: Number(user.level || 1),
        bitcoinEarned: 0.00234, // Will be fetched from rewards service
        learningStreak: 12 // Will be calculated from activity
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatPrincipal = (principal: string) => {
    return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
  };

  const calculateProgress = () => {
    if (stats.totalCourses === 0) return 0;
    return (stats.completedCourses / stats.totalCourses) * 100;
  };

  const getNextLevelPoints = () => {
    return stats.currentLevel * 1000; // 1000 points per level
  };

  const getCurrentLevelProgress = () => {
    const currentLevelBase = (stats.currentLevel - 1) * 1000;
    const nextLevelBase = stats.currentLevel * 1000;
    const progress = ((stats.totalPoints - currentLevelBase) / (nextLevelBase - currentLevelBase)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B00B9]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          No user data available
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-4 border-white/20">
                <AvatarImage src="/api/placeholder/80/80" alt={user.username} />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-white/80">{user.email}</p>
                <div className="flex items-center mt-2 text-sm text-white/70">
                  <Shield className="h-4 w-4 mr-1" />
                  {principal && formatPrincipal(principal.toString())}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-[#F15A24] mr-2" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Level {stats.currentLevel}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.totalPoints} / {getNextLevelPoints()} points
              </span>
            </div>
            <Progress value={getCurrentLevelProgress()} className="h-3" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {getNextLevelPoints() - stats.totalPoints} points to next level
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#3B00B9] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completedCourses}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completed
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Zap className="h-6 w-6 text-[#ED1E79] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalPoints}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Points
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Coins className="h-6 w-6 text-[#F15A24] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                ₿{stats.bitcoinEarned.toFixed(5)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Bitcoin Earned
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#50C878] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.learningStreak}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Day Streak
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 text-[#ED1E79] mr-2" />
            Learning Progress
          </CardTitle>
          <CardDescription>
            Your journey through the Internet Computer ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Course Completion
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.completedCourses} of {stats.totalCourses}
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Beginner
                </Badge>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  3 courses
                </span>
              </div>
              <div className="flex items-center">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Intermediate
                </Badge>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  2 courses
                </span>
              </div>
              <div className="flex items-center">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Advanced
                </Badge>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  1 course
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 text-[#3B00B9] mr-2" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">
                {user.email}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Member Since
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white">
                {user.created_at ? new Date(Number(user.created_at) / 1000000).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            
            {user.btc_address && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bitcoin Address
                  </span>
                </div>
                <span className="text-sm text-gray-900 dark:text-white font-mono">
                  {user.btc_address.slice(0, 8)}...{user.btc_address.slice(-8)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
