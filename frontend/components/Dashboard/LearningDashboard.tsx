/**
 * Learning Dashboard Component - Shows user's learning progress and courses
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Play,
  CheckCircle2,
  Zap,
  Target,
  Calendar,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useICPBackend, useCurrentUser } from '@/hooks/useICPBackend';
import CourseCard from '@/components/Courses/CourseCard';

interface LearningStats {
  totalCourses: number;
  activeCourses: number;
  completedCourses: number;
  totalHours: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface CourseProgress {
  courseId: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextLesson: string;
  estimatedTime: string;
}

export default function LearningDashboard() {
  const { listCourses, isAuthenticated, isLoading } = useICPBackend();
  const { user } = useCurrentUser();
  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [stats, setStats] = useState<LearningStats>({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    currentStreak: 7,
    weeklyGoal: 10,
    weeklyProgress: 6.5
  });

  const [recentProgress] = useState<CourseProgress[]>([
    {
      courseId: '1',
      title: 'ICP Fundamentals',
      progress: 75,
      lastAccessed: '2 hours ago',
      nextLesson: 'Canister Architecture',
      estimatedTime: '15 min'
    },
    {
      courseId: '2',
      title: 'Motoko Programming',
      progress: 45,
      lastAccessed: '1 day ago',
      nextLesson: 'Actor Model Basics',
      estimatedTime: '20 min'
    },
    {
      courseId: '3',
      title: 'Chain Fusion Technology',
      progress: 20,
      lastAccessed: '3 days ago',
      nextLesson: 'Bitcoin Integration',
      estimatedTime: '25 min'
    }
  ]);

  // Load courses from backend
  useEffect(() => {
    const loadCourses = async () => {
      if (isAuthenticated) {
        try {
          setCoursesLoading(true);
          const coursesResult = await listCourses(1, 6);
          if (coursesResult?.courses) {
            setCourses(coursesResult.courses);
            setStats(prev => ({
              ...prev,
              totalCourses: coursesResult.total || 0,
              activeCourses: Math.floor((coursesResult.total || 0) * 0.3),
              completedCourses: Math.floor((coursesResult.total || 0) * 0.2)
            }));
          }
        } catch (error) {
          console.error('Failed to load courses:', error);
        } finally {
          setCoursesLoading(false);
        }
      }
    };

    loadCourses();
  }, [isAuthenticated, listCourses]);

  const weeklyProgressPercentage = (stats.weeklyProgress / stats.weeklyGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Learning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 border-[#3B00B9]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Active Courses
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeCourses}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-[#3B00B9]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#ED1E79]/10 to-[#F15A24]/10 border-[#ED1E79]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Completed
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedCourses}
                </p>
              </div>
              <Trophy className="h-8 w-8 text-[#ED1E79]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#50C878]/10 to-[#32CD32]/10 border-[#50C878]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Learning Streak
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.currentStreak} days
                </p>
              </div>
              <Zap className="h-8 w-8 text-[#50C878]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#F15A24]/10 to-[#FF6B35]/10 border-[#F15A24]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Points
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user ? Number(user.total_points || 0).toLocaleString() : '0'}
                </p>
              </div>
              <Award className="h-8 w-8 text-[#F15A24]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Goal Progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 text-[#3B00B9] mr-2" />
              Weekly Goal
            </CardTitle>
            <CardDescription>
              Track your learning progress this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.weeklyProgress}h
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  of {stats.weeklyGoal}h goal
                </div>
              </div>
              
              <Progress value={weeklyProgressPercentage} className="h-3" />
              
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>65% complete</span>
                <span>{stats.weeklyGoal - stats.weeklyProgress}h remaining</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">This week's streak</span>
                  <Badge className="bg-[#50C878]/10 text-[#50C878] border-[#50C878]/20">
                    {stats.currentStreak} days
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="h-5 w-5 text-[#ED1E79] mr-2" />
              Continue Learning
            </CardTitle>
            <CardDescription>
              Pick up where you left off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProgress.map((course, index) => (
                <motion.div
                  key={course.courseId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Next: {course.nextLesson}
                    </p>
                    <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.estimatedTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {course.lastAccessed}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.progress}%
                      </div>
                      <Progress value={course.progress} className="w-16 h-2" />
                    </div>
                    <Button size="sm" className="bg-[#ED1E79] hover:bg-[#D1195E] text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 text-[#3B00B9] mr-2" />
            Available Courses
          </CardTitle>
          <CardDescription>
            Explore new learning opportunities in the ICP ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course, index) => (
                <CourseCard
                  key={course.id || index}
                  course={course}
                  progress={Math.random() * 100} // Will be replaced with real progress
                  isEnrolled={Math.random() > 0.5} // Will be replaced with real enrollment status
                  onEnroll={(courseId) => console.log('Enroll in:', courseId)}
                  onContinue={(courseId) => console.log('Continue:', courseId)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
