/**
 * React Hook for ICP Backend Integration
 * Provides easy access to backend functions with loading states and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { icpBackend, User, Course, formatBigInt } from '@/lib/icp-backend';
import { Principal } from '@dfinity/principal';

interface UseICPBackendState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUser: Principal | null;
  isLoading: boolean;
  error: string | null;
}

interface UseICPBackendActions {
  // Authentication
  login: () => Promise<void>;
  logout: () => Promise<void>;
  
  // User Management
  getUser: (userId: string) => Promise<User | null>;
  registerUser: (params: {
    user_id: string;
    username: string;
    email: string;
    btc_address?: string;
  }) => Promise<User | null>;
  updateUser: (params: {
    user_id: string;
    username?: string;
    email?: string;
    btc_address?: string;
  }) => Promise<User | null>;
  listUsers: (page?: number, limit?: number) => Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  } | null>;
  getUserCount: () => Promise<number | null>;
  
  // Course Management
  getCourse: (courseId: string) => Promise<Course | null>;
  listCourses: (page?: number, limit?: number) => Promise<{
    courses: Course[];
    total: number;
    page: number;
    limit: number;
  } | null>;
  
  // Utility
  healthCheck: () => Promise<boolean>;
  clearError: () => void;
}

export function useICPBackend(): UseICPBackendState & UseICPBackendActions {
  const [state, setState] = useState<UseICPBackendState>({
    isInitialized: false,
    isAuthenticated: false,
    currentUser: null,
    isLoading: true,
    error: null,
  });

  // Initialize backend on mount
  useEffect(() => {
    const initializeBackend = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        await icpBackend.init();
        const isAuth = await icpBackend.isAuthenticated();
        const user = icpBackend.getCurrentUser();
        
        setState(prev => ({
          ...prev,
          isInitialized: true,
          isAuthenticated: isAuth,
          currentUser: user,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Failed to initialize ICP backend:', error);
        setState(prev => ({
          ...prev,
          isInitialized: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize backend',
        }));
      }
    };

    initializeBackend();
  }, []);

  // Authentication functions
  const login = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await icpBackend.login();
      const isAuth = await icpBackend.isAuthenticated();
      const user = icpBackend.getCurrentUser();
      
      setState(prev => ({
        ...prev,
        isAuthenticated: isAuth,
        currentUser: user,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await icpBackend.logout();
      
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        currentUser: null,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
      throw error;
    }
  }, []);

  // User management functions
  const getUser = useCallback(async (userId: string): Promise<User | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await icpBackend.getUser(userId);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return user;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get user',
      }));
      return null;
    }
  }, []);

  const registerUser = useCallback(async (params: {
    user_id: string;
    username: string;
    email: string;
    btc_address?: string;
  }): Promise<User | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await icpBackend.registerUser(params);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return user;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to register user',
      }));
      return null;
    }
  }, []);

  const updateUser = useCallback(async (params: {
    user_id: string;
    username?: string;
    email?: string;
    btc_address?: string;
  }): Promise<User | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const user = await icpBackend.updateUser(params);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return user;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to update user',
      }));
      return null;
    }
  }, []);

  const listUsers = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await icpBackend.listUsers(page, limit);
      
      setState(prev => ({ ...prev, isLoading: false }));
      
      return {
        users: result.users,
        total: formatBigInt(result.total),
        page: formatBigInt(result.page),
        limit: formatBigInt(result.limit),
      };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to list users',
      }));
      return null;
    }
  }, []);

  const getUserCount = useCallback(async (): Promise<number | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const count = await icpBackend.getUserCount();
      
      setState(prev => ({ ...prev, isLoading: false }));
      return formatBigInt(count);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get user count',
      }));
      return null;
    }
  }, []);

  // Course management functions
  const getCourse = useCallback(async (courseId: string): Promise<Course | null> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const course = await icpBackend.getCourse(courseId);
      
      setState(prev => ({ ...prev, isLoading: false }));
      return course;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to get course',
      }));
      return null;
    }
  }, []);

  const listCourses = useCallback(async (page: number = 1, limit: number = 10) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await icpBackend.listCourses(page, limit);
      
      setState(prev => ({ ...prev, isLoading: false }));
      
      return {
        courses: result.courses,
        total: formatBigInt(result.total),
        page: formatBigInt(result.page),
        limit: formatBigInt(result.limit),
      };
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to list courses',
      }));
      return null;
    }
  }, []);

  // Utility functions
  const healthCheck = useCallback(async (): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      const isHealthy = await icpBackend.healthCheck();
      
      if (!isHealthy) {
        setState(prev => ({
          ...prev,
          error: 'Backend health check failed',
        }));
      }
      
      return isHealthy;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Health check failed',
      }));
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    login,
    logout,
    getUser,
    registerUser,
    updateUser,
    listUsers,
    getUserCount,
    getCourse,
    listCourses,
    healthCheck,
    clearError,
  };
}

// Additional hook for specific user data
export function useCurrentUser() {
  const { currentUser, isAuthenticated, getUser } = useICPBackend();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && currentUser) {
        setLoading(true);
        try {
          const user = await getUser(currentUser.toString());
          setUserData(user);
        } catch (error) {
          console.error('Failed to fetch current user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [currentUser, isAuthenticated, getUser]);

  return {
    user: userData,
    loading,
    isAuthenticated,
    principal: currentUser,
  };
}
