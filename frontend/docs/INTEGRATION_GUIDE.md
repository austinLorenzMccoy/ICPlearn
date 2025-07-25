# 🔗 ICP Backend Integration Guide

## 🎉 **Integration Complete!**

The frontend now has full integration with your Kybra Python backend on the Internet Computer. Here's everything you need to know:

## 📁 **Files Added**

### **Core Integration**
- `lib/icp-backend.ts` - Main backend service with Candid interface
- `hooks/useICPBackend.ts` - React hooks for easy backend access
- `hooks/useCurrentUser.ts` - Hook for authenticated user data

### **Demo & Testing**
- `components/examples/ICPBackendDemo.tsx` - Complete integration example
- `app/icp-test/page.tsx` - Test page for backend connectivity

### **Dependencies**
- `@dfinity/agent` - ICP agent for canister calls
- `@dfinity/auth-client` - Internet Identity authentication
- `@dfinity/principal` - Principal type handling
- `@dfinity/candid` - Candid interface support

## 🚀 **Quick Start**

### **1. Start the Backend**
```bash
# In backend directory
cd backend
source /Users/a/Documents/ICP/EduStake/venv311/bin/activate
dfx start --background
dfx deploy
```

### **2. Start the Frontend**
```bash
# In frontend directory
cd frontend
npm run dev
```

### **3. Test the Integration**
- Visit: `http://localhost:3000/icp-test`
- Test authentication with Internet Identity
- View live backend data (users, courses, etc.)

## 🔧 **How to Use in Components**

### **Basic Usage**
```typescript
import { useICPBackend } from '@/hooks/useICPBackend';

function MyComponent() {
  const { 
    isAuthenticated, 
    login, 
    logout, 
    getUser, 
    listCourses,
    isLoading,
    error 
  } = useICPBackend();

  // Use the functions...
}
```

### **Authentication**
```typescript
// Login with Internet Identity
await login();

// Check authentication status
if (isAuthenticated) {
  // User is logged in
}

// Logout
await logout();
```

### **Backend Operations**
```typescript
// Get user data
const user = await getUser('user123');

// List courses with pagination
const courses = await listCourses(1, 10);

// Register new user
const newUser = await registerUser({
  user_id: 'user123',
  username: 'john_doe',
  email: 'john@example.com',
  btc_address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
});
```

### **Current User Hook**
```typescript
import { useCurrentUser } from '@/hooks/useICPBackend';

function UserProfile() {
  const { user, loading, isAuthenticated, principal } = useCurrentUser();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <p>Level: {user?.level}</p>
      <p>Points: {user?.total_points}</p>
    </div>
  );
}
```

## 🔍 **Available Backend Functions**

### **User Management**
- `getUser(userId: string)` - Get user by ID
- `registerUser(params)` - Register new user
- `updateUser(params)` - Update user data
- `listUsers(page, limit)` - List users with pagination
- `getUserCount()` - Get total user count

### **Course Management**
- `getCourse(courseId: string)` - Get course by ID
- `listCourses(page, limit)` - List courses with pagination

### **Authentication**
- `login()` - Login with Internet Identity
- `logout()` - Logout current user
- `isAuthenticated` - Authentication status
- `currentUser` - Current user's Principal

### **Utility**
- `healthCheck()` - Check backend connectivity
- `clearError()` - Clear error state

## 📊 **Data Types**

### **User**
```typescript
interface User {
  id: Principal;
  username: string;
  email: string;
  btc_address?: string;
  total_points: bigint;
  level: bigint;
  created_at: bigint;
  updated_at: bigint;
}
```

### **Course**
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_hours: bigint;
  points_reward: bigint;
  created_at: bigint;
}
```

## 🛠️ **Configuration**

### **Backend Configuration**
The integration automatically detects the environment:

```typescript
const CANISTER_CONFIG = {
  // Local development
  LOCAL_CANISTER_ID: 'uxrrr-q7777-77774-qaaaq-cai',
  LOCAL_HOST: 'http://127.0.0.1:4943',
  
  // Production
  MAINNET_HOST: 'https://ic0.app',
  
  // Auto-detect environment
  IS_LOCAL: process.env.NODE_ENV === 'development',
};
```

### **Internet Identity URLs**
- **Local**: `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`
- **Production**: `https://identity.ic0.app`

## 🔄 **State Management**

The hooks provide comprehensive state management:

```typescript
const {
  // Connection state
  isInitialized,    // Backend service initialized
  isAuthenticated,  // User authentication status
  currentUser,      // Current user's Principal
  
  // Loading states
  isLoading,        // Any operation in progress
  
  // Error handling
  error,            // Current error message
  clearError,       // Function to clear errors
  
  // Backend operations
  // ... all the functions
} = useICPBackend();
```

## 🚨 **Error Handling**

All backend operations include proper error handling:

```typescript
try {
  const user = await getUser('user123');
  // Success - use the user data
} catch (error) {
  // Error is automatically set in the hook state
  console.error('Failed to get user:', error);
}

// Or check the error state
if (error) {
  return <div>Error: {error}</div>;
}
```

## 🧪 **Testing**

### **Test Page**
Visit `/icp-test` to see a complete demo of all integration features:
- Authentication flow
- Backend health check
- Live data display
- Error handling
- Loading states

### **Backend Health Check**
```typescript
const isHealthy = await healthCheck();
if (!isHealthy) {
  console.log('Backend is not responding');
}
```

## 🔧 **Development Tips**

### **1. Backend Must Be Running**
Ensure your Kybra backend is deployed and running:
```bash
cd backend
dfx start --background
dfx deploy
dfx canister status icplearn_backend
```

### **2. Check Network Configuration**
- Local development uses `127.0.0.1:4943`
- Production uses `ic0.app`
- Internet Identity URLs are environment-specific

### **3. BigInt Handling**
Backend returns `bigint` values, use the helper:
```typescript
import { formatBigInt } from '@/lib/icp-backend';

const pointsNumber = formatBigInt(user.total_points);
```

### **4. Principal Handling**
```typescript
import { formatPrincipal } from '@/lib/icp-backend';

const principalString = formatPrincipal(user.id);
```

## 🎯 **Next Steps**

### **Immediate**
1. Test the integration at `/icp-test`
2. Integrate authentication into your existing components
3. Replace mock data with real backend calls

### **Development**
1. Add more backend functions as needed
2. Implement real-time data updates
3. Add caching for better performance
4. Implement optimistic updates

### **Production**
1. Deploy backend to mainnet
2. Update canister IDs in configuration
3. Test with production Internet Identity
4. Implement proper error monitoring

## 📞 **Support**

### **Backend Issues**
- Check backend deployment: `dfx canister status icplearn_backend`
- Test backend directly: `dfx canister call icplearn_backend get_greeting`
- Review backend logs: `dfx canister logs icplearn_backend`

### **Frontend Issues**
- Check browser console for errors
- Verify network requests in DevTools
- Test at `/icp-test` page first

### **Authentication Issues**
- Clear browser storage and cookies
- Try incognito/private browsing
- Check Internet Identity service status

---

**🎉 Your frontend is now fully integrated with the ICP backend!**

The integration provides a complete, production-ready connection between your Next.js frontend and Kybra Python backend on the Internet Computer.
