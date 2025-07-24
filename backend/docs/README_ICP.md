# ICPlearn Backend on Internet Computer Protocol

This document provides instructions for deploying and testing the ICPlearn backend on the Internet Computer Protocol (ICP) using Kybra.

## Prerequisites

- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed
- [Node.js](https://nodejs.org/) (v14 or later)
- [Python](https://www.python.org/) (v3.9 or later)
- [Kybra](https://demergent-labs.github.io/kybra/) installed

## Project Structure

The ICPlearn backend is structured as follows:

- `src/icplearn_backend/`: Main backend code
  - `main.py`: Contains all the canister methods and stable storage
  - `models/`: Contains data models

## Deployment

### Local Deployment

1. Start the local ICP replica:

```bash
dfx start --clean --background
```

2. Deploy the canister:

```bash
dfx deploy
```

3. Note the canister ID for later use:

```bash
dfx canister id icplearn_backend
```

### Mainnet Deployment

1. Create a cycles wallet if you don't have one already.

2. Configure your `dfx.json` for mainnet deployment.

3. Deploy to mainnet:

```bash
dfx deploy --network ic
```

## Testing

### Using the Test Script

We've provided a test script (`test_api.py`) to test the API endpoints:

1. Make the script executable:

```bash
chmod +x test_api.py
```

2. Run the tests with your canister ID:

```bash
./test_api.py --canister-id $(dfx canister id icplearn_backend)
```

3. To run specific tests:

```bash
./test_api.py --test user
./test_api.py --test course
./test_api.py --test skill
./test_api.py --test assessment
./test_api.py --test combat
./test_api.py --test ai
./test_api.py --test bitcoin
```

### Manual Testing with DFX

You can also test individual endpoints using the `dfx` command:

```bash
# Create a user
dfx canister call icplearn_backend create_user '["username", "email@example.com", "Full Name"]'

# List users
dfx canister call icplearn_backend list_users '[null, 0, 10]' --query

# Create a course
dfx canister call icplearn_backend create_course '["Course Title", "Description", 2, 10, true]'
```

## API Endpoints

### User Management

- `create_user(username: str, email: str, full_name: str) -> Dict[str, Any]`
- `get_user(user_id: str) -> Dict[str, Any]`
- `update_user(user_id: str, username: Optional[str], email: Optional[str], full_name: Optional[str]) -> Dict[str, Any]`
- `list_users(search: Optional[str], skip: int, limit: int) -> Dict[str, Any]`
- `get_current_user() -> Dict[str, Any]`

### Course Management

- `create_course(title: str, description: str, difficulty: int, estimated_hours: int, published: bool) -> Dict[str, Any]`
- `update_course(course_id: str, title: Optional[str], description: Optional[str], difficulty: Optional[int], estimated_hours: Optional[int], published: Optional[bool]) -> Dict[str, Any]`
- `delete_course(course_id: str) -> Dict[str, Any]`
- `get_course(course_id: str) -> Dict[str, Any]`
- `list_courses(creator_id: Optional[str], published_only: Optional[bool], difficulty: Optional[int], skip: int, limit: int) -> Dict[str, Any]`

### Skill Management

- `create_skill(name: str, description: str, difficulty: int, parent_skill_id: Optional[str], dependencies: List[str]) -> Dict[str, Any]`
- `update_skill(skill_id: str, name: Optional[str], description: Optional[str], difficulty: Optional[int], parent_skill_id: Optional[str], dependencies: Optional[List[str]]) -> Dict[str, Any]`
- `delete_skill(skill_id: str) -> Dict[str, Any]`
- `get_skill(skill_id: str) -> Dict[str, Any]`
- `list_skills(parent_id: Optional[str], difficulty: Optional[int], has_dependencies: Optional[bool], skip: int, limit: int) -> Dict[str, Any]`
- `get_user_skills(user_id: Optional[str], min_mastery: Optional[int], has_nft: Optional[bool], skip: int, limit: int) -> Dict[str, Any]`
- `track_user_skill_mastery(user_id: str, skill_id: str, mastery_level: int) -> Dict[str, Any]`

### Assessment Management

- `create_assessment(title: str, description: str, course_id: str, skill_ids: List[str], time_limit_minutes: int, passing_score: int, ai_validation: bool) -> Dict[str, Any]`
- `add_question_to_assessment(assessment_id: str, question_text: str, question_type: str, options: Optional[List[str]], correct_option: Optional[int], correct_answer: Optional[str]) -> Dict[str, Any]`
- `get_assessment(assessment_id: str, include_questions: bool) -> Dict[str, Any]`
- `submit_assessment(assessment_id: str, answers: Dict[str, Any], time_taken_seconds: int) -> Dict[str, Any]`
- `get_user_assessment_results(user_id: Optional[str], assessment_id: Optional[str], passed: Optional[bool], min_score: Optional[int], skip: int, limit: int) -> Dict[str, Any]`
- `list_assessments(course_id: Optional[str], skill_id: Optional[str], creator_id: Optional[str], time_limit_max: Optional[int], skip: int, limit: int) -> Dict[str, Any]`

### Combat Arena

- `create_battle(stake_amount: int, skill_ids: List[str], time_limit_minutes: int) -> Dict[str, Any]`
- `start_battle(battle_id: str) -> Dict[str, Any]`
- `submit_answer(battle_id: str, question_id: str, answer_index: int) -> Dict[str, Any]`
- `get_battle(battle_id: str) -> Dict[str, Any]`
- `get_user_battles(user_id: Optional[str], status: Optional[str], skill_id: Optional[str], skip: int, limit: int) -> Dict[str, Any]`
- `claim_battle_reward(battle_id: str) -> Dict[str, Any]`

### AI Integration

- `generate_course_content(topic: str, difficulty: int) -> Dict[str, Any]`
- `get_ai_response(prompt_id: str) -> Dict[str, Any]`
- `list_user_ai_prompts(prompt_type: Optional[str], start_date: Optional[int], end_date: Optional[int], skip: int, limit: int) -> Dict[str, Any]`
- `generate_skill_nft_metadata(skill_id: str, mastery_level: int) -> Dict[str, Any]`

### Bitcoin Rewards

- `create_bitcoin_reward(user_id: str, amount: float, skill_ids: List[str], reward_metadata: Optional[Dict[str, Any]]) -> Dict[str, Any]`

## Stable Storage

The backend uses `StableBTreeMap` for persistent storage across canister upgrades. Each data type has its own storage map with a unique memory ID:

- Users: `USERS_MEMORY_ID = 1`
- User Courses: `USER_COURSES_MEMORY_ID = 2`
- User Skills: `USER_SKILLS_MEMORY_ID = 3`
- Neuro Stakes: `NEURO_STAKES_MEMORY_ID = 4`
- Genesis NFTs: `GENESIS_NFTS_MEMORY_ID = 5`
- Combat Arenas: `COMBAT_ARENAS_MEMORY_ID = 6`
- Battles: `BATTLES_MEMORY_ID = 7`
- Rewards: `REWARDS_MEMORY_ID = 8`
- Bitcoin Rewards: `BITCOIN_REWARDS_MEMORY_ID = 9`
- Courses: `COURSES_MEMORY_ID = 10`
- Skills: `SKILLS_MEMORY_ID = 11`
- Skill NFTs: `SKILL_NFTS_MEMORY_ID = 12`
- Assessments: `ASSESSMENTS_MEMORY_ID = 13`
- Questions: `QUESTIONS_MEMORY_ID = 14`
- User Answers: `USER_ANSWERS_MEMORY_ID = 15`
- Assessment Results: `ASSESSMENT_RESULTS_MEMORY_ID = 16`
- AI Prompts: `AI_PROMPTS_MEMORY_ID = 17`
- AI Responses: `AI_RESPONSES_MEMORY_ID = 18`

## Authentication

Authentication is handled using Internet Identity. The user's principal is obtained using `ic.caller()`.

## Limitations

- HTTPS outcalls are currently limited on ICP, so AI and Bitcoin wallet integrations are simulated.
- File uploads are not supported directly and would require a separate solution.

## Future Improvements

- Implement real AI integration when HTTPS outcalls are fully supported
- Add real Bitcoin wallet integration
- Implement file upload functionality
- Add comprehensive unit and integration tests
