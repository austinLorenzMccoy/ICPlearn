# 🔧 Candid UI Access Guide

## ❌ Issue: "Cannot fetch candid file" Error

This error occurs when the Candid UI cannot access the canister's interface definition.

## ✅ Solutions

### Method 1: Direct Candid UI Access
**Try this URL instead:**
```
http://127.0.0.1:4943/?canisterId=uzt4z-lp777-77774-qaabq-cai&id=uxrrr-q7777-77774-qaaaq-cai
```

### Method 2: Alternative Candid UI URL
**If the above doesn't work, try:**
```
http://127.0.0.1:4943/?canisterId=uzt4z-lp777-77774-qaabq-cai
```
Then manually enter the canister ID: `uxrrr-q7777-77774-qaaaq-cai`

### Method 3: Command Line Testing (Always Works)
```bash
# Test basic function
dfx canister call icplearn_backend get_greeting '("World")'

# Test user registration
dfx canister call icplearn_backend register_user '(record { username = "test"; email = "test@example.com"; btc_address = null })'

# Test user listing
dfx canister call icplearn_backend list_users '(record { skip = 0 : nat64; limit = 10 : nat64 })'
```

### Method 4: Generate Fresh Candid Interface
```bash
# Regenerate the Candid interface
dfx generate icplearn_backend

# Then redeploy
dfx deploy icplearn_backend
```

## 🔍 Troubleshooting Steps

1. **Check if dfx is running:**
   ```bash
   dfx ping
   ```

2. **Verify canister is deployed:**
   ```bash
   dfx canister status icplearn_backend
   ```

3. **Check canister ID:**
   ```bash
   dfx canister id icplearn_backend
   ```

4. **Restart dfx (if needed):**
   ```bash
   dfx stop
   dfx start --clean
   dfx deploy
   ```

## 📋 Available Functions for Testing

### User Management
- `register_user(params: RegisterUserParams)`
- `update_user(params: UpdateUserParams)`
- `list_users(params: ListUsersParams)`
- `get_user_by_id(user_id: text)`

### Assessment System
- `create_assessment(params: CreateAssessmentParams)`
- `get_assessment_by_id(assessment_id: text)`
- `list_assessments(params: ListAssessmentsParams)`
- `submit_assessment(params: SubmitAssessmentParams)`

### Course Management
- `create_course(params: CreateCourseParams)`
- `get_course_by_id(course_id: text)`
- `list_courses(params: ListCoursesParams)`
- `enroll_course(params: EnrollCourseParams)`
- `update_course_progress(params: UpdateProgressParams)`

### AI Services
- `generate_course_content(params: GenerateCourseContentParams)`
- `validate_answer(params: ValidateAnswerParams)`
- `generate_nft_metadata(params: GenerateNFTMetadataParams)`

### Bitcoin Rewards
- `create_bitcoin_reward(params: CreateBitcoinRewardParams)`
- `process_bitcoin_reward(reward_id: text)`
- `get_bitcoin_reward(reward_id: text)`
- `get_user_bitcoin_rewards(user_id: Principal)`

## 🎯 For Frontend Integration

Even if Candid UI doesn't work, the backend is fully functional. Your frontend team can:

1. **Use the JavaScript Agent directly:**
   ```javascript
   const backend = Actor.createActor(idlFactory, {
     agent,
     canisterId: 'uxrrr-q7777-77774-qaaaq-cai',
   });
   ```

2. **Generate TypeScript declarations:**
   ```bash
   dfx generate icplearn_backend
   ```

3. **Use the generated files in `src/declarations/icplearn_backend/`**

## ✅ Backend Status
- ✅ **Deployed and Running**
- ✅ **All Functions Operational**
- ✅ **Persistent Storage Working**
- ✅ **Ready for Frontend Integration**

The Candid UI issue doesn't affect the backend functionality - it's just a convenience tool for testing!
