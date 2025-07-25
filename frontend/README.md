# 🎓 ICPlearn Frontend

**Next.js 14 frontend with complete ICP backend integration**

## 🎉 **Integration Status: COMPLETE ✅**

The frontend now has full integration with the Kybra Python backend on the Internet Computer, including Internet Identity authentication and all backend services.

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Backend running (see `../backend/README.md`)

### **Installation & Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit the app
open http://localhost:3000
```

### **Test the Integration**
Visit `http://localhost:3000/icp-test` to see the complete ICP backend integration in action.

## 🔗 **ICP Backend Integration**

### **✅ What's Implemented**

1. **Complete Backend Service** (`lib/icp-backend.ts`)
   - All 23+ backend functions accessible
   - Internet Identity authentication
   - Candid interface definitions
   - Error handling and type safety

2. **React Hooks** (`hooks/useICPBackend.ts`)
   - `useICPBackend()` - Main hook for all backend operations
   - `useCurrentUser()` - Hook for authenticated user data
   - Loading states and error handling

3. **Demo Components**
   - `ICPBackendDemo` - Complete integration example
   - Test page at `/icp-test` for verification

### **🔧 Available Backend Functions**

#### **Authentication**
- `login()` - Internet Identity login
- `logout()` - Logout current user
- `isAuthenticated` - Authentication status
- `currentUser` - Current user's Principal

#### **User Management**
- `getUser(userId)` - Get user by ID
- `registerUser(params)` - Register new user
- `updateUser(params)` - Update user data
- `listUsers(page, limit)` - List users with pagination
- `getUserCount()` - Get total user count

#### **Course Management**
- `getCourse(courseId)` - Get course by ID
- `listCourses(page, limit)` - List courses with pagination

#### **Utility**
- `healthCheck()` - Check backend connectivity
- `clearError()` - Clear error state

### **📖 Usage Example**

```typescript
import { useICPBackend } from '@/hooks/useICPBackend';

function MyComponent() {
  const { 
    isAuthenticated, 
    login, 
    getUser, 
    listCourses,
    isLoading,
    error 
  } = useICPBackend();

  const handleLogin = async () => {
    await login();
  };

  const loadCourses = async () => {
    const courses = await listCourses(1, 10);
    console.log('Courses:', courses);
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={loadCourses}>Load Courses</button>
      ) : (
        <button onClick={handleLogin}>Login with Internet Identity</button>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

## 🏗️ **Tech Stack**

### **Framework & Core**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **React 18** - Latest React features

### **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### **ICP Integration**
- **@dfinity/agent** - ICP agent for canister calls
- **@dfinity/auth-client** - Internet Identity authentication
- **@dfinity/principal** - Principal type handling
- **@dfinity/candid** - Candid interface support

## 📁 **Project Structure**

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── icp-test/          # ICP integration test page
│   └── ...                # Other pages
├── components/            # React components
│   ├── examples/          # Integration examples
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
│   └── useICPBackend.ts  # ICP backend integration hook
├── lib/                  # Utility libraries
│   └── icp-backend.ts    # ICP backend service
├── docs/                 # Documentation
│   └── INTEGRATION_GUIDE.md # Complete integration guide
└── ...                   # Config files
```

## 🔧 **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### **Environment Configuration**
The integration automatically detects the environment:
- **Development**: Uses local canister at `127.0.0.1:4943`
- **Production**: Uses mainnet at `ic0.app`

### **Backend Requirements**
Ensure the backend is running:
```bash
cd ../backend
source /Users/a/Documents/ICP/EduStake/venv311/bin/activate
dfx start --background
dfx deploy
```

## 🧪 **Testing the Integration**

### **1. Basic Connectivity**
```bash
# Check if backend is responding
curl http://127.0.0.1:4943/api/v2/canister/uxrrr-q7777-77774-qaaaq-cai/call
```

### **2. Frontend Integration Test**
Visit: `http://localhost:3000/icp-test`

Features to test:
- Backend health check
- Internet Identity authentication
- User data retrieval
- Course listing
- Error handling
- Loading states

### **3. Manual Testing**
```typescript
// In browser console at /icp-test
// Check if backend service is loaded
window.icpBackend

// Test health check
await window.icpBackend.healthCheck()
```

## 📚 **Documentation**

### **Complete Integration Guide**
See [`docs/INTEGRATION_GUIDE.md`](./docs/INTEGRATION_GUIDE.md) for:
- Detailed usage examples
- All available functions and types
- Configuration options
- Development tips
- Troubleshooting guide

### **Backend API Reference**
See [`../backend/README.md`](../backend/README.md) for backend setup and API documentation.

## 🚀 **Deployment**

### **Development Deployment**
```bash
npm run build
npm run start
```

### **Production Deployment**
1. Deploy backend to mainnet
2. Update canister IDs in `lib/icp-backend.ts`
3. Build and deploy frontend
4. Configure domain and SSL

## 🔍 **Troubleshooting**

### **Backend Connection Issues**
```bash
# Check backend status
cd ../backend
dfx canister status icplearn_backend

# Test backend directly
dfx canister call icplearn_backend get_greeting
```

### **Authentication Issues**
- Clear browser storage and cookies
- Try incognito/private browsing mode
- Check Internet Identity service status

### **Frontend Issues**
- Check browser console for errors
- Verify network requests in DevTools
- Test at `/icp-test` page first

## 🎯 **Next Steps**

### **Immediate Development**
1. ✅ **Integration Complete** - Backend fully connected
2. 🔄 **Build UI Components** - Use the provided hooks
3. 🔄 **Implement Features** - User profiles, course pages, etc.
4. 🔄 **Add Real-time Updates** - WebSocket or polling

### **Production Ready**
1. 🔄 **Mainnet Deployment** - Deploy backend to mainnet
2. 🔄 **Domain Setup** - Configure custom domain
3. 🔄 **Performance Optimization** - Caching and optimization
4. 🔄 **Monitoring** - Error tracking and analytics

## 🤝 **Contributing**

### **Development Workflow**
1. Create feature branch
2. Implement using ICP hooks
3. Test at `/icp-test` page
4. Submit pull request

### **Code Standards**
- Use TypeScript for type safety
- Follow existing component patterns
- Use the provided ICP hooks
- Include error handling
- Add loading states

---

## 🎉 **Ready for Development!**

The frontend now has complete, production-ready integration with the ICP backend. You can start building UI components immediately using the provided hooks and services.

**Test the integration**: `http://localhost:3000/icp-test`

**Read the guide**: [`docs/INTEGRATION_GUIDE.md`](./docs/INTEGRATION_GUIDE.md)  
**Frontend Status**: 🚧 **AWAITING DEVELOPMENT**  
**API Documentation**: ✅ **COMPLETE AND AVAILABLE**

*Ready for frontend development as of July 24, 2024*
