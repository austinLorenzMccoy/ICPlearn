/**
 * Authentication Wrapper - Handles login flow and authentication state
 */

'use client';

import { useEffect } from 'react';
import { useICPBackend } from '@/hooks/useICPBackend';
import { motion } from 'framer-motion';
import { Shield, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export default function AuthWrapper({ 
  children, 
  requireAuth = false, 
  fallback 
}: AuthWrapperProps) {
  const {
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    login,
    clearError
  } = useICPBackend();

  // Show loading state while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#3B00B9]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Connecting to Internet Computer
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Initializing your decentralized learning experience...
          </p>
        </motion.div>
      </div>
    );
  }

  // Show error state if there's an initialization error
  if (error && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                <CardTitle className="text-red-700 dark:text-red-300">
                  Connection Error
                </CardTitle>
              </div>
              <CardDescription className="text-red-600 dark:text-red-400">
                Failed to connect to the Internet Computer backend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {error}
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={clearError}
                  variant="outline"
                  className="flex-1"
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show login prompt if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="border-[#3B00B9]/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 rounded-full bg-[#3B00B9]/10 border border-[#3B00B9]/20 w-fit">
                <Shield className="h-8 w-8 text-[#3B00B9]" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] bg-clip-text text-transparent">
                Welcome to ICPlearn
              </CardTitle>
              <CardDescription>
                Sign in with Internet Identity to access your personalized learning dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <Button 
                    onClick={login}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8BB8] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign in with Internet Identity
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Secure, decentralized authentication powered by the Internet Computer
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Why Internet Identity?
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• No passwords to remember</li>
                    <li>• Complete privacy protection</li>
                    <li>• Cryptographically secure</li>
                    <li>• Works across all ICP apps</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Render children if authenticated or authentication not required
  return <>{children}</>;
}
