# ICPlearn Backend API Documentation

## 🚀 Deployment Information

**Backend Canister ID:** `uxrrr-q7777-77774-qaaaq-cai`

**Local Development URLs:**
- **Candid UI:** http://127.0.0.1:4943/?canisterId=uzt4z-lp777-77774-qaabq-cai&id=uxrrr-q7777-77774-qaaaq-cai
- **Frontend Assets:** http://u6s2n-gx777-77774-qaaba-cai.localhost:4943/

## 📋 Available Services

### 1. User Management Service
- ✅ **Persistent Storage Enabled**
- **Functions:**
  - `register_user(params: RegisterUserParams)` - Register new user
  - `update_user(params: UpdateUserParams)` - Update existing user
  - `list_users(params: ListUsersParams)` - List users with pagination
  - `get_user_by_id(user_id: text)` - Get user by ID

### 2. Assessment Service
- **Functions:**
  - `create_assessment(params: CreateAssessmentParams)` - Create assessment
  - `get_assessment_by_id(assessment_id: text)` - Get assessment
  - `list_assessments(params: ListAssessmentsParams)` - List assessments
  - `submit_assessment(params: SubmitAssessmentParams)` - Submit answers

### 3. Course Service
- **Functions:**
  - `create_course(params: CreateCourseParams)` - Create course
  - `get_course_by_id(course_id: text)` - Get course
  - `list_courses(params: ListCoursesParams)` - List courses
  - `enroll_course(params: EnrollCourseParams)` - Enroll in course
  - `update_course_progress(params: UpdateProgressParams)` - Update progress

### 4. Skill Service
- **Functions:**
  - `create_skill(params: CreateSkillParams)` - Create skill
  - `get_skill_by_id(skill_id: text)` - Get skill
  - `list_skills(params: ListSkillsParams)` - List skills
  - `update_skill_progress(params: UpdateSkillProgressParams)` - Update skill progress
  - `get_user_skills(params: GetUserSkillsParams)` - Get user skills

### 5. AI Service
- **Functions:**
  - `generate_course_content(params: GenerateCourseContentParams)` - Generate AI content
  - `validate_answer(params: ValidateAnswerParams)` - Validate answers with AI
  - `generate_nft_metadata(params: GenerateNFTMetadataParams)` - Generate NFT metadata

### 6. Reward Service
- **Functions:**
  - `create_bitcoin_reward(params: CreateBitcoinRewardParams)` - Create Bitcoin reward
  - `process_bitcoin_reward(reward_id: text)` - Process reward
  - `get_bitcoin_reward(reward_id: text)` - Get reward details
  - `get_user_bitcoin_rewards(user_id: Principal)` - Get user rewards

### 7. Legacy Functions
- **Functions:**
  - `get_greeting(name: text)` - Simple greeting function
  - `get_user_count(dummy: text)` - Get user count

## 🔧 Integration Guide for Frontend

### 1. Install Dependencies
```bash
npm install @dfinity/agent @dfinity/candid @dfinity/principal
```

### 2. Initialize Agent
```javascript
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/icplearn_backend';

const agent = new HttpAgent({
  host: 'http://127.0.0.1:4943', // Local development
});

// For local development only
agent.fetchRootKey();

const backend = Actor.createActor(idlFactory, {
  agent,
  canisterId: 'uxrrr-q7777-77774-qaaaq-cai',
});
```

### 3. Example API Calls

#### Register User
```javascript
const result = await backend.register_user({
  username: 'john_doe',
  email: 'john@example.com',
  btc_address: []  // null/empty for no BTC address
});
```

#### Get User
```javascript
const user = await backend.get_user_by_id('user_principal_id');
```

#### List Users with Pagination
```javascript
const users = await backend.list_users({
  skip: 0n,
  limit: 10n
});
```

## 📊 Data Structures

### User Record
```typescript
interface User {
  id: Principal;
  username: string;
  email: string;
  btc_address: string | null;
  created_at: bigint;
  updated_at: bigint;
  is_active: boolean;
}
```

### Error Handling
All functions return `Result<T, Error>` where Error can be:
- `NotFound: string`
- `Unauthorized: string`
- `InvalidPayload: string`
- `InvalidInput: string`
- `Forbidden: string`

## 🧪 Testing

### Test with dfx CLI
```bash
# Register user
dfx canister call icplearn_backend register_user '(record { username = "test"; email = "test@example.com"; btc_address = null })'

# Get user
dfx canister call icplearn_backend get_user_by_id '("user_id")'

# List users
dfx canister call icplearn_backend list_users '(record { skip = 0 : nat64; limit = 10 : nat64 })'
```

## 🔐 Authentication

The backend uses Internet Computer's built-in authentication via `ic.caller()`. Each user is identified by their Principal ID.

## 📈 Status

- ✅ **Deployed and Running**
- ✅ **Persistent Storage Working**
- ✅ **All 22 Functions Operational**
- ✅ **Ready for Frontend Integration**

## 🆘 Support

For issues or questions, check the Candid UI at the provided URL to explore all available functions and their parameters interactively.
