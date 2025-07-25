/**
 * ICP Backend Integration for ICPlearn Frontend
 * Connects to the Kybra Python backend canister
 */

import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

// Backend canister configuration
const CANISTER_CONFIG = {
  // Local development
  LOCAL_CANISTER_ID: 'uxrrr-q7777-77774-qaaaq-cai',
  LOCAL_HOST: 'http://127.0.0.1:4943',
  
  // Production (when deployed to mainnet)
  MAINNET_HOST: 'https://ic0.app',
  
  // Current environment
  IS_LOCAL: process.env.NODE_ENV === 'development',
};

// Type definitions based on your Kybra backend
export interface User {
  id: Principal;
  username: string;
  email: string;
  btc_address?: string;
  total_points: bigint;
  level: bigint;
  created_at: bigint;
  updated_at: bigint;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_hours: bigint;
  points_reward: bigint;
  created_at: bigint;
}

export interface Assessment {
  id: string;
  course_id: string;
  title: string;
  questions: Question[];
  passing_score: bigint;
  points_reward: bigint;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer: bigint;
  explanation: string;
}

export interface BitcoinReward {
  id: string;
  user_id: string;
  amount: number;
  skill_ids: string[];
  status: string;
  created_at: bigint;
}

// Result types (matching your Kybra backend)
export type Result<T, E> = { Ok: T } | { Err: E };

// Candid interface definition (based on your backend)
const idlFactory = ({ IDL }: any) => {
  const User = IDL.Record({
    id: IDL.Principal,
    username: IDL.Text,
    email: IDL.Text,
    btc_address: IDL.Opt(IDL.Text),
    total_points: IDL.Nat64,
    level: IDL.Nat64,
    created_at: IDL.Nat64,
    updated_at: IDL.Nat64,
  });

  const RegisterUserParams = IDL.Record({
    user_id: IDL.Text,
    username: IDL.Text,
    email: IDL.Text,
    btc_address: IDL.Opt(IDL.Text),
  });

  const UpdateUserParams = IDL.Record({
    user_id: IDL.Text,
    username: IDL.Opt(IDL.Text),
    email: IDL.Opt(IDL.Text),
    btc_address: IDL.Opt(IDL.Text),
  });

  const ListUsersParams = IDL.Record({
    page: IDL.Nat64,
    limit: IDL.Nat64,
  });

  const ListUsersResponse = IDL.Record({
    users: IDL.Vec(User),
    total: IDL.Nat64,
    page: IDL.Nat64,
    limit: IDL.Nat64,
  });

  const Course = IDL.Record({
    id: IDL.Text,
    title: IDL.Text,
    description: IDL.Text,
    difficulty: IDL.Text,
    duration_hours: IDL.Nat64,
    points_reward: IDL.Nat64,
    created_at: IDL.Nat64,
  });

  const ListCoursesParams = IDL.Record({
    page: IDL.Nat64,
    limit: IDL.Nat64,
  });

  const ListCoursesResponse = IDL.Record({
    courses: IDL.Vec(Course),
    total: IDL.Nat64,
    page: IDL.Nat64,
    limit: IDL.Nat64,
  });

  const Error = IDL.Variant({
    NotFound: IDL.Text,
    AlreadyExists: IDL.Text,
    InvalidInput: IDL.Text,
    Unauthorized: IDL.Text,
  });

  const GetUserResult = IDL.Variant({
    Ok: User,
    Err: Error,
  });

  const RegisterUserResult = IDL.Variant({
    Ok: User,
    Err: Error,
  });

  const UpdateUserResult = IDL.Variant({
    Ok: User,
    Err: Error,
  });

  const ListUsersResult = IDL.Variant({
    Ok: ListUsersResponse,
    Err: Error,
  });

  const ListCoursesResult = IDL.Variant({
    Ok: ListCoursesResponse,
    Err: Error,
  });

  return IDL.Service({
    // User Management
    get_user_by_id: IDL.Func([IDL.Text], [GetUserResult], ['query']),
    register_user: IDL.Func([RegisterUserParams], [RegisterUserResult], []),
    update_user: IDL.Func([UpdateUserParams], [UpdateUserResult], []),
    list_users: IDL.Func([ListUsersParams], [ListUsersResult], ['query']),
    get_user_count: IDL.Func([], [IDL.Nat64], ['query']),
    
    // Course Management
    get_course_by_id: IDL.Func([IDL.Text], [IDL.Variant({ Ok: Course, Err: Error })], ['query']),
    list_courses: IDL.Func([ListCoursesParams], [ListCoursesResult], ['query']),
    
    // Assessment System
    get_assessment_by_id: IDL.Func([IDL.Text], [IDL.Variant({ Ok: IDL.Text, Err: Error })], ['query']),
    list_assessments: IDL.Func([ListCoursesParams], [IDL.Variant({ Ok: IDL.Text, Err: Error })], ['query']),
    
    // Legacy
    get_greeting: IDL.Func([], [IDL.Text], ['query']),
  });
};

/**
 * Backend service class
 */
class ICPBackendService {
  private actor: any = null;
  private authClient: AuthClient | null = null;
  private agent: HttpAgent | null = null;

  /**
   * Initialize the backend service
   */
  async init(): Promise<void> {
    try {
      // Initialize auth client
      this.authClient = await AuthClient.create();
      
      // Create agent
      const host = CANISTER_CONFIG.IS_LOCAL 
        ? CANISTER_CONFIG.LOCAL_HOST 
        : CANISTER_CONFIG.MAINNET_HOST;
        
      this.agent = new HttpAgent({ host });
      
      // Fetch root key for local development
      if (CANISTER_CONFIG.IS_LOCAL) {
        await this.agent.fetchRootKey();
      }
      
      // Create actor
      this.actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId: CANISTER_CONFIG.LOCAL_CANISTER_ID,
      });
      
      console.log('ICP Backend service initialized');
    } catch (error) {
      console.error('Failed to initialize ICP backend service:', error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    if (!this.authClient) return false;
    return await this.authClient.isAuthenticated();
  }

  /**
   * Login with Internet Identity
   */
  async login(): Promise<void> {
    if (!this.authClient) {
      throw new Error('Auth client not initialized');
    }

    return new Promise((resolve, reject) => {
      this.authClient!.login({
        identityProvider: CANISTER_CONFIG.IS_LOCAL 
          ? `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`
          : 'https://identity.ic0.app',
        onSuccess: () => {
          console.log('Login successful');
          resolve();
        },
        onError: (error) => {
          console.error('Login failed:', error);
          reject(error);
        },
      });
    });
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (this.authClient) {
      await this.authClient.logout();
      console.log('Logged out');
    }
  }

  /**
   * Get current user identity
   */
  getCurrentUser(): Principal | null {
    if (!this.authClient) return null;
    const identity = this.authClient.getIdentity();
    return identity.getPrincipal();
  }

  // User Management Methods
  async getUser(userId: string): Promise<User> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.get_user_by_id(userId);
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to get user: ${JSON.stringify(result.Err)}`);
  }

  async registerUser(params: {
    user_id: string;
    username: string;
    email: string;
    btc_address?: string;
  }): Promise<User> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.register_user({
      user_id: params.user_id,
      username: params.username,
      email: params.email,
      btc_address: params.btc_address ? [params.btc_address] : [],
    });
    
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to register user: ${JSON.stringify(result.Err)}`);
  }

  async updateUser(params: {
    user_id: string;
    username?: string;
    email?: string;
    btc_address?: string;
  }): Promise<User> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.update_user({
      user_id: params.user_id,
      username: params.username ? [params.username] : [],
      email: params.email ? [params.email] : [],
      btc_address: params.btc_address ? [params.btc_address] : [],
    });
    
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to update user: ${JSON.stringify(result.Err)}`);
  }

  async listUsers(page: number = 1, limit: number = 10): Promise<{
    users: User[];
    total: bigint;
    page: bigint;
    limit: bigint;
  }> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.list_users({
      page: BigInt(page),
      limit: BigInt(limit),
    });
    
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to list users: ${JSON.stringify(result.Err)}`);
  }

  async getUserCount(): Promise<bigint> {
    if (!this.actor) throw new Error('Backend not initialized');
    return await this.actor.get_user_count();
  }

  // Course Management Methods
  async getCourse(courseId: string): Promise<Course> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.get_course_by_id(courseId);
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to get course: ${JSON.stringify(result.Err)}`);
  }

  async listCourses(page: number = 1, limit: number = 10): Promise<{
    courses: Course[];
    total: bigint;
    page: bigint;
    limit: bigint;
  }> {
    if (!this.actor) throw new Error('Backend not initialized');
    
    const result = await this.actor.list_courses({
      page: BigInt(page),
      limit: BigInt(limit),
    });
    
    if ('Ok' in result) {
      return result.Ok;
    }
    throw new Error(`Failed to list courses: ${JSON.stringify(result.Err)}`);
  }

  // Utility Methods
  async getGreeting(): Promise<string> {
    if (!this.actor) throw new Error('Backend not initialized');
    return await this.actor.get_greeting();
  }

  /**
   * Health check - verify backend is accessible
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.getGreeting();
      return true;
    } catch (error) {
      console.error('Backend health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const icpBackend = new ICPBackendService();

// Export utility functions
export const formatBigInt = (value: bigint): number => {
  return Number(value);
};

export const formatPrincipal = (principal: Principal): string => {
  return principal.toString();
};

// Initialize on import (for client-side only)
if (typeof window !== 'undefined') {
  icpBackend.init().catch(console.error);
}
