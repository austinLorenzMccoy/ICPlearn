/**
 * Course Card Component - Displays course information with ICP integration
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Trophy,
  Play,
  Lock,
  CheckCircle2,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useICPBackend } from '@/hooks/useICPBackend';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: string;
    modules: number;
    points_reward?: number;
    difficulty?: string;
    created_at?: bigint;
    creator_id?: string;
  };
  progress?: number;
  isEnrolled?: boolean;
  isCompleted?: boolean;
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
}

export default function CourseCard({
  course,
  progress = 0,
  isEnrolled = false,
  isCompleted = false,
  onEnroll,
  onContinue
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useICPBackend();

  const levelColors = {
    beginner: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-800'
    },
    intermediate: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-800'
    },
    advanced: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-200 dark:border-red-800'
    }
  };

  const levelColor = levelColors[course.level] || levelColors.beginner;

  const handleEnroll = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      await onEnroll?.(course.id);
    } catch (error) {
      console.error('Failed to enroll in course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    onContinue?.(course.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`
        group relative overflow-hidden border-2 transition-all duration-300
        ${isHovered ? 'border-[#3B00B9]/30 shadow-lg scale-[1.02]' : 'border-gray-200 dark:border-gray-700'}
        ${isCompleted ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10' : ''}
      `}>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B00B9]/5 to-[#29ABE2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </div>
          </div>
        )}

        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <Badge className={`${levelColor.bg} ${levelColor.text} ${levelColor.border} border`}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
            {course.points_reward && (
              <div className="flex items-center text-[#F15A24] font-medium text-sm">
                <Coins className="h-4 w-4 mr-1" />
                {course.points_reward} pts
              </div>
            )}
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#3B00B9] dark:group-hover:text-[#29ABE2] transition-colors duration-200">
            {course.title}
          </CardTitle>
          
          <CardDescription className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          {/* Course Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {course.modules} modules
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              4.8
            </div>
          </div>

          {/* Progress Bar (if enrolled) */}
          {isEnrolled && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-2">
            {!isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full"
                disabled
              >
                <Lock className="h-4 w-4 mr-2" />
                Sign in to Enroll
              </Button>
            ) : isCompleted ? (
              <Button 
                variant="outline" 
                className="w-full border-green-500 text-green-700 hover:bg-green-50"
                onClick={handleContinue}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
            ) : isEnrolled ? (
              <Button 
                className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8BB8] text-white"
                onClick={handleContinue}
              >
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full border-[#3B00B9] text-[#3B00B9] hover:bg-[#3B00B9] hover:text-white"
                onClick={handleEnroll}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Enrolling...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Enroll Now
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                1,234 enrolled
              </div>
              <div className="flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Earn while learning
              </div>
            </div>
          </div>
        </CardContent>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
}
