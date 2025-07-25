/**
 * ICP Backend Integration Demo Component
 * Shows how to use the backend integration in React components
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useICPBackend, useCurrentUser } from '@/hooks/useICPBackend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function ICPBackendDemo() {
  const {
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    getUserCount,
    listUsers,
    listCourses,
    healthCheck,
    clearError,
  } = useICPBackend();

  const { user: currentUser, loading: userLoading } = useCurrentUser();

  const [userCount, setUserCount] = useState<number | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [backendHealth, setBackendHealth] = useState<boolean | null>(null);

  // Load initial data
  useEffect(() => {
    if (isInitialized && !isLoading) {
      loadDashboardData();
    }
  }, [isInitialized, isLoading]);

  const loadDashboardData = async () => {
    try {
      // Check backend health
      const health = await healthCheck();
      setBackendHealth(health);

      if (health) {
        // Load user count
        const count = await getUserCount();
        setUserCount(count);

        // Load users list
        const usersResult = await listUsers(1, 5);
        if (usersResult) {
          setUsers(usersResult.users);
        }

        // Load courses list
        const coursesResult = await listCourses(1, 5);
        if (coursesResult) {
          setCourses(coursesResult.courses);
        }
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Initializing ICP Backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ICP Backend Integration Demo</h1>
        <div className="flex items-center space-x-2">
          <Badge variant={backendHealth ? "default" : "destructive"}>
            {backendHealth ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Backend Online
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3 mr-1" />
                Backend Offline
              </>
            )}
          </Badge>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearError}
              className="ml-2"
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Authentication Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Authentication Status
          </CardTitle>
          <CardDescription>
            Internet Identity integration with your ICP backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </p>
                {currentUser && (
                  <p className="text-sm text-gray-600">
                    Principal: {currentUser.toString().slice(0, 20)}...
                  </p>
                )}
              </div>
              <Button
                onClick={isAuthenticated ? handleLogout : handleLogin}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isAuthenticated ? 'Logout' : 'Login with Internet Identity'}
              </Button>
            </div>

            {/* Current User Info */}
            {isAuthenticated && currentUser && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Current User Data:</h4>
                {userLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading user data...
                  </div>
                ) : currentUser ? (
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <pre>{JSON.stringify(currentUser, null, 2)}</pre>
                  </div>
                ) : (
                  <p className="text-gray-600">No user data found</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Backend Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Users ({userCount ?? 'Loading...'})
            </CardTitle>
            <CardDescription>
              Users registered in the backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div key={index} className="border p-2 rounded text-sm">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Level: {user.level?.toString()} | Points: {user.total_points?.toString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No users found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Courses ({courses.length})
            </CardTitle>
            <CardDescription>
              Available courses in the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <div key={index} className="border p-2 rounded text-sm">
                    <p className="font-medium">{course.title}</p>
                    <p className="text-gray-600">{course.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Difficulty: {course.difficulty}</span>
                      <span>Points: {course.points_reward?.toString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No courses found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Actions</CardTitle>
          <CardDescription>
            Test various backend operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button
              onClick={loadDashboardData}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Refresh Data
            </Button>
            <Button
              onClick={() => healthCheck().then(setBackendHealth)}
              variant="outline"
            >
              Check Backend Health
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Guide</CardTitle>
          <CardDescription>
            How to use the ICP backend in your components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">1. Import the hook:</h4>
              <code className="bg-gray-100 p-2 rounded block">
                {`import { useICPBackend } from '@/hooks/useICPBackend';`}
              </code>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">2. Use in your component:</h4>
              <code className="bg-gray-100 p-2 rounded block whitespace-pre">
{`const { 
  isAuthenticated, 
  login, 
  getUser, 
  listCourses 
} = useICPBackend();`}
              </code>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Call backend functions:</h4>
              <code className="bg-gray-100 p-2 rounded block">
                {`const courses = await listCourses(1, 10);`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
