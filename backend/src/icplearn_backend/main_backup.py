from kybra import (Record, Variant, Vec, query, update, Opt, Principal, ic, StableBTreeMap, 
                   init, post_upgrade, pre_upgrade, void, nat64, float64, text, nat, int, float, bool, str)

# Candid type definitions for data structures

class User(Record):
    id: Principal
    username: str
    email: str
    btc_address: Opt[str]
    created_at: nat64

class Course(Record):
    id: str
    title: str
    description: str
    creator_id: Principal
    created_at: nat64
    updated_at: nat64
    content: str  # Could be markdown or JSON
    published: bool

class UserCourse(Record):
    id: str
    user_id: Principal
    course_id: str
    progress: int
    completed: bool
    started_at: nat64
    completed_at: Opt[nat64]

class Skill(Record):
    id: str
    name: str
    description: str
    category: str
    difficulty: str
    created_at: nat64

class UserSkill(Record):
    id: str
    user_id: Principal
    skill_id: str
    mastery_level: float64
    last_practiced_at: nat64
    nft_issued: bool

class NeuroStake(Record):
    id: str
    user_id: Principal
    amount: float64
    duration_days: int
    start_date: nat64
    end_date: nat64
    status: str  # e.g., 'active', 'completed', 'failed'
    streak: int
    last_check_in: nat64

class NftAttribute(Record):
    trait_type: str
    value: str

class GenesisNft(Record):
    id: str
    owner_id: Principal
    name: str
    description: str
    image_url: str
    attributes: Vec[NftAttribute]
    minted_at: nat64

class CombatArena(Record):
    id: str
    name: str
    description: str
    skill_id: str
    reward_pool: float64
    created_at: nat64

class Battle(Record):
    id: str
    arena_id: str
    player1_id: Principal
    player2_id: Opt[Principal]
    status: str  # e.g., 'pending', 'active', 'completed'
    winner_id: Opt[Principal]
    questions: Vec[str]
    player1_answers: str  # JSON string for answers
    player2_answers: str  # JSON string for answers
    created_at: nat64
    started_at: Opt[nat64]
    completed_at: Opt[nat64]

class Reward(Record):
    id: str
    user_id: Principal
    battle_id: str
    amount: float64
    claimed: bool
    created_at: nat64
    claimed_at: Opt[nat64]

class BitcoinReward(Record):
    id: str
    user_id: Principal
    amount: float64
    skill_ids: Vec[str]
    reward_metadata: str  # JSON string
    created_at: nat64
    status: str  # e.g., 'pending', 'completed', 'claimed'
    transaction_hash: Opt[str]
    processed_at: Opt[nat64]
    wallet_address: Opt[str]
    claimed_at: Opt[nat64]

class SkillNft(Record):
    id: str
    owner_id: Principal
    skill_id: str
    name: str
    description: str
    image_url: str
    rarity: str
    attributes: Vec[NftAttribute]
    minted_at: nat64

class Assessment(Record):
    id: str
    title: str
    description: str
    skill_id: str
    creator_id: Principal
    time_limit_minutes: int
    created_at: nat64

class Question(Record):
    id: str
    assessment_id: str
    text: str
    question_type: str  # e.g., 'multiple_choice', 'true_false'
    options: Vec[str]
    correct_answer: str
    skill_tag: str

class UserAnswer(Record):
    id: str
    user_id: Principal
    question_id: str
    answer: str
    is_correct: bool
    answered_at: nat64

class AssessmentResult(Record):
    id: str
    user_id: Principal
    assessment_id: str
    score: float64
    passed: bool
    started_at: nat64
    completed_at: nat64

class AIPrompt(Record):
    id: str
    user_id: Principal
    prompt_text: str
    context: str  # JSON string
    created_at: nat64

class AIResponse(Record):
    id: str
    prompt_id: str
    response_text: str
    model_used: str
    created_at: nat64

# Generic result types for returning either a success or error
class Error(Variant, aname='Error'):
    NotFound: str
    Unauthorized: str
    InvalidPayload: str
    Forbidden: str

class Result(Variant, aname='Result'):
    Ok: str  # Using a generic str for Ok, can be specialized if needed
    Err: Error


# Stable storage using StableBTreeMap
# Memory IDs for stable storage
USERS_MEMORY_ID = 1
USER_COURSES_MEMORY_ID = 2
USER_SKILLS_MEMORY_ID = 3
NEURO_STAKES_MEMORY_ID = 4
GENESIS_NFTS_MEMORY_ID = 5
COMBAT_ARENAS_MEMORY_ID = 6
BATTLES_MEMORY_ID = 7
REWARDS_MEMORY_ID = 8
BITCOIN_REWARDS_MEMORY_ID = 9
COURSES_MEMORY_ID = 10
SKILLS_MEMORY_ID = 11
SKILL_NFTS_MEMORY_ID = 12
ASSESSMENTS_MEMORY_ID = 13
QUESTIONS_MEMORY_ID = 14
USER_ANSWERS_MEMORY_ID = 15
ASSESSMENT_RESULTS_MEMORY_ID = 16
AI_PROMPTS_MEMORY_ID = 17
AI_RESPONSES_MEMORY_ID = 18

# User management
users = StableBTreeMap[str, User](memory_id=USERS_MEMORY_ID, max_key_size=100, max_value_size=4096)
user_courses = StableBTreeMap[str, UserCourse](memory_id=USER_COURSES_MEMORY_ID, max_key_size=100, max_value_size=4096)
user_skills = StableBTreeMap[str, UserSkill](memory_id=USER_SKILLS_MEMORY_ID, max_key_size=100, max_value_size=4096)

# Gamification
neuro_stakes = StableBTreeMap[str, NeuroStake](memory_id=NEURO_STAKES_MEMORY_ID, max_key_size=100, max_value_size=4096)
genesis_nfts = StableBTreeMap[str, GenesisNft](memory_id=GENESIS_NFTS_MEMORY_ID, max_key_size=100, max_value_size=4096)
combat_arenas = StableBTreeMap[str, CombatArena](memory_id=COMBAT_ARENAS_MEMORY_ID, max_key_size=100, max_value_size=4096)
battles = StableBTreeMap[str, Battle](memory_id=BATTLES_MEMORY_ID, max_key_size=100, max_value_size=4096)
rewards = StableBTreeMap[str, Reward](memory_id=REWARDS_MEMORY_ID, max_key_size=100, max_value_size=4096)
bitcoin_rewards = StableBTreeMap[str, BitcoinReward](memory_id=BITCOIN_REWARDS_MEMORY_ID, max_key_size=100, max_value_size=4096)

# Education
courses = StableBTreeMap[str, Course](memory_id=COURSES_MEMORY_ID, max_key_size=100, max_value_size=4096)
skills = StableBTreeMap[str, Skill](memory_id=SKILLS_MEMORY_ID, max_key_size=100, max_value_size=4096)
skill_nfts = StableBTreeMap[str, SkillNft](memory_id=SKILL_NFTS_MEMORY_ID, max_key_size=100, max_value_size=4096)
assessments = StableBTreeMap[str, Assessment](memory_id=ASSESSMENTS_MEMORY_ID, max_key_size=100, max_value_size=4096)
questions = StableBTreeMap[str, Question](memory_id=QUESTIONS_MEMORY_ID, max_key_size=100, max_value_size=4096)
user_answers = StableBTreeMap[str, UserAnswer](memory_id=USER_ANSWERS_MEMORY_ID, max_key_size=100, max_value_size=4096)
assessment_results = StableBTreeMap[str, AssessmentResult](memory_id=ASSESSMENT_RESULTS_MEMORY_ID, max_key_size=100, max_value_size=4096)

# AI Integration
ai_prompts = StableBTreeMap[str, AIPrompt](memory_id=AI_PROMPTS_MEMORY_ID, max_key_size=100, max_value_size=4096)
ai_responses = StableBTreeMap[str, AIResponse](memory_id=AI_RESPONSES_MEMORY_ID, max_key_size=100, max_value_size=4096)

# Helper functions for composite keys
def create_user_course_key(user_id: str, course_id: str) -> str:
    return f"{user_id}_{course_id}"

def create_user_skill_key(user_id: str, skill_id: str) -> str:
    return f"{user_id}_{skill_id}"

def create_question_key(assessment_id: str, question_id: str) -> str:
    return f"{assessment_id}_{question_id}"

def create_user_answer_key(user_id: str, question_id: str) -> str:
    return f"{user_id}_{question_id}"

# Timestamp helpers
def get_current_timestamp() -> int:
    """Get current timestamp in milliseconds"""
    return ic.time() // 1_000_000  # Convert nanoseconds to milliseconds

# Canister lifecycle hooks
@init
def init_function() -> void:
    """Initialize the canister state."""
    # This function is called once when the canister is deployed
    pass

# Variables to store state during upgrade
users_backup: List[Tuple[str, Dict[str, Any]]] = []
user_courses_backup: List[Tuple[str, Dict[str, Any]]] = []
user_skills_backup: List[Tuple[str, Dict[str, Any]]] = []
neuro_stakes_backup: List[Tuple[str, Dict[str, Any]]] = []
genesis_nfts_backup: List[Tuple[str, Dict[str, Any]]] = []
combat_arenas_backup: List[Tuple[str, Dict[str, Any]]] = []
battles_backup: List[Tuple[str, Dict[str, Any]]] = []
rewards_backup: List[Tuple[str, Dict[str, Any]]] = []
bitcoin_rewards_backup: List[Tuple[str, Dict[str, Any]]] = []
courses_backup: List[Tuple[str, Dict[str, Any]]] = []
skills_backup: List[Tuple[str, Dict[str, Any]]] = []
skill_nfts_backup: List[Tuple[str, Dict[str, Any]]] = []
assessments_backup: List[Tuple[str, Dict[str, Any]]] = []
questions_backup: List[Tuple[str, Dict[str, Any]]] = []
user_answers_backup: List[Tuple[str, Dict[str, Any]]] = []
assessment_results_backup: List[Tuple[str, Dict[str, Any]]] = []
ai_prompts_backup: List[Tuple[str, Dict[str, Any]]] = []
ai_responses_backup: List[Tuple[str, Dict[str, Any]]] = []

@pre_upgrade
def pre_upgrade_function() -> void:
    """Save state before canister upgrade."""
    global users_backup, user_courses_backup, user_skills_backup
    global neuro_stakes_backup, genesis_nfts_backup, combat_arenas_backup, battles_backup
    global rewards_backup, bitcoin_rewards_backup
    global courses_backup, skills_backup, skill_nfts_backup
    global assessments_backup, questions_backup, user_answers_backup, assessment_results_backup
    global ai_prompts_backup, ai_responses_backup
    
    # Backup all data
    users_backup = [(k, v) for k, v in users.items()]
    user_courses_backup = [(k, v) for k, v in user_courses.items()]
    user_skills_backup = [(k, v) for k, v in user_skills.items()]
    neuro_stakes_backup = [(k, v) for k, v in neuro_stakes.items()]
    genesis_nfts_backup = [(k, v) for k, v in genesis_nfts.items()]
    combat_arenas_backup = [(k, v) for k, v in combat_arenas.items()]
    battles_backup = [(k, v) for k, v in battles.items()]
    rewards_backup = [(k, v) for k, v in rewards.items()]
    bitcoin_rewards_backup = [(k, v) for k, v in bitcoin_rewards.items()]
    courses_backup = [(k, v) for k, v in courses.items()]
    skills_backup = [(k, v) for k, v in skills.items()]
    skill_nfts_backup = [(k, v) for k, v in skill_nfts.items()]
    assessments_backup = [(k, v) for k, v in assessments.items()]
    questions_backup = [(k, v) for k, v in questions.items()]
    user_answers_backup = [(k, v) for k, v in user_answers.items()]
    assessment_results_backup = [(k, v) for k, v in assessment_results.items()]
    ai_prompts_backup = [(k, v) for k, v in ai_prompts.items()]
    ai_responses_backup = [(k, v) for k, v in ai_responses.items()]

@post_upgrade
def post_upgrade_function() -> void:
    """Restore state after canister upgrade."""
    global users_backup, user_courses_backup, user_skills_backup
    global neuro_stakes_backup, genesis_nfts_backup, combat_arenas_backup, battles_backup
    global rewards_backup, bitcoin_rewards_backup
    global courses_backup, skills_backup, skill_nfts_backup
    global assessments_backup, questions_backup, user_answers_backup, assessment_results_backup
    global ai_prompts_backup, ai_responses_backup
    
    # Restore all data
    for k, v in users_backup:
        users.insert(k, v)
    for k, v in user_courses_backup:
        user_courses.insert(k, v)
    for k, v in user_skills_backup:
        user_skills.insert(k, v)
    for k, v in neuro_stakes_backup:
        neuro_stakes.insert(k, v)
    for k, v in genesis_nfts_backup:
        genesis_nfts.insert(k, v)
    for k, v in combat_arenas_backup:
        combat_arenas.insert(k, v)
    for k, v in battles_backup:
        battles.insert(k, v)
    for k, v in rewards_backup:
        rewards.insert(k, v)
    for k, v in bitcoin_rewards_backup:
        bitcoin_rewards.insert(k, v)
    for k, v in courses_backup:
        courses.insert(k, v)
    for k, v in skills_backup:
        skills.insert(k, v)
    for k, v in skill_nfts_backup:
        skill_nfts.insert(k, v)
    for k, v in assessments_backup:
        assessments.insert(k, v)
    for k, v in questions_backup:
        questions.insert(k, v)
    for k, v in user_answers_backup:
        user_answers.insert(k, v)
    for k, v in assessment_results_backup:
        assessment_results.insert(k, v)
    for k, v in ai_prompts_backup:
        ai_prompts.insert(k, v)
    for k, v in ai_responses_backup:
        ai_responses.insert(k, v)
    
    # Clear backup variables
    users_backup = []
    user_courses_backup = []
    user_skills_backup = []
    neuro_stakes_backup = []
    genesis_nfts_backup = []
    combat_arenas_backup = []
    battles_backup = []
    rewards_backup = []
    bitcoin_rewards_backup = []
    courses_backup = []
    skills_backup = []
    skill_nfts_backup = []
    assessments_backup = []
    questions_backup = []
    user_answers_backup = []
    assessment_results_backup = []
    ai_prompts_backup = []
    ai_responses_backup = []

# ===== User Management =====

class RegisterUserResult(Variant, aname='RegisterUserResult'):
    Ok: 'User'
    Err: 'Error'

@update
def register_user(username: str, email: str, btc_address: Opt[str]) -> RegisterUserResult:
    """Register a new user with the provided username, email, and optional BTC address."""
    principal = ic.caller()
    user_id = str(principal)

    if users.contains_key(user_id):
        return RegisterUserResult(Err=Error(InvalidPayload='User already registered'))

    new_user = User(
        id=principal,
        username=username,
        email=email,
        btc_address=btc_address,
        created_at=get_current_timestamp()
    )

    users.insert(user_id, new_user)
    return RegisterUserResult(Ok=new_user)

class UpdateUserResult(Variant, aname='UpdateUserResult'):
    Ok: 'User'
    Err: 'Error'

@update
def update_user(username: Opt[str], email: Opt[str], btc_address: Opt[str]) -> UpdateUserResult:
    """Update the current user's profile."""
    principal = ic.caller()
    user_id = str(principal)

    user_opt = users.get(user_id)
    if user_opt is None:
        return UpdateUserResult(Err=Error(NotFound='User not found'))

    user = user_opt
    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    if btc_address is not None:
        user.btc_address = btc_address

    users.insert(user_id, user)
    return UpdateUserResult(Ok=user)

class GetUserResult(Variant, aname='GetUserResult'):
    Ok: 'User'
    Err: 'Error'

@query
def get_user(dummy: Opt[str]) -> GetUserResult:
    """Get the current user's profile."""
    principal = ic.caller()
    user_id = str(principal)

    user_opt = users.get(user_id)
    if user_opt is None:
        return GetUserResult(Err=Error(NotFound='User not found'))
    
    return GetUserResult(Ok=user_opt)

@query
def get_user_by_id(user_id: str) -> Opt[User]:
    """Get a user by their ID."""
    return users.get(user_id)

class ListUsersResult(Record):
    items: Vec['User']
    total: nat64
    skip: nat64
    limit: nat64

@query
def list_users(skip: int, limit: int) -> ListUsersResult:
    """List all users with pagination."""
    all_users = [user for _, user in users.items()]
    all_users.sort(key=lambda x: x.created_at, reverse=True)
    
    paginated_users = all_users[skip : skip + limit]
    
    return ListUsersResult(
        items=paginated_users,
        total=len(all_users),
        skip=skip,
        limit=limit
    )

# ===== Assessment Service =====

class GetAssessmentResult(Record):
    assessment: 'Assessment'
    error: Opt['Error']

@query
def get_assessment(assessment_id: str) -> GetAssessmentResult:
    """Get an assessment by its ID."""
    assessment_opt = assessments.get(assessment_id)
    if assessment_opt is None:
        return GetAssessmentResult(error=Error(NotFound='Assessment not found'))
    return GetAssessmentResult(assessment=assessment_opt)

class SubmitAssessmentResult(Record):
    assessment_result: 'AssessmentResult'
    error: Opt['Error']

@update
def submit_assessment(assessment_id: str, answers: Vec[str]) -> SubmitAssessmentResult:
    """Submit answers for an assessment."""
    assessment_opt = assessments.get(assessment_id)
    if assessment_opt is None:
        return SubmitAssessmentResult(error=Error(NotFound='Assessment not found'))
    
    assessment = assessment_opt
    user_id = ic.caller()
    timestamp = get_current_timestamp()
    
    new_assessment_result = AssessmentResult(
        id=f"{assessment_id}_{user_id}_{timestamp}",
        assessment_id=assessment_id,
        user_id=user_id,
        answers=answers,
        submitted_at=timestamp
    )
    
    assessment_results.insert(new_assessment_result.id, new_assessment_result)
    return SubmitAssessmentResult(assessment_result=new_assessment_result)

class ListAssessmentsResult(Record):
    assessments: Vec['Assessment']
    total: nat64

@query
def list_assessments(skip: int, limit: int) -> ListAssessmentsResult:
    """List all assessments."""
    all_assessments = [a for _, a in assessments.items()]
    total = len(all_assessments)
    paginated_assessments = all_assessments[skip:skip+limit]
    return ListAssessmentsResult(assessments=paginated_assessments, total=total)

# ===== Bitcoin Reward Service =====

class CreateBitcoinRewardResult(Variant, aname='CreateBitcoinRewardResult'):
    Ok: 'BitcoinReward'
    Err: 'Error'

@update
def create_bitcoin_reward(user_id: str, amount: float64, skill_ids: Vec[str]) -> CreateBitcoinRewardResult:
    """Create a new Bitcoin reward for a user based on their skills."""
    try:
        user_principal = Principal.from_str(user_id)
    except Exception:
        return CreateBitcoinRewardResult(Err=Error(InvalidInput='Invalid user ID format'))

    if users.get(user_principal) is None:
        return CreateBitcoinRewardResult(Err=Error(NotFound='User not found'))
    
    timestamp = get_current_timestamp()
    reward_id = f"btc_reward_{user_id}_{timestamp}"
    
    new_reward = BitcoinReward(
        id=reward_id,
        user_id=user_principal,
        amount=amount,
        skill_ids=skill_ids,
        reward_metadata="{}",
        created_at=timestamp,
        status="pending",
        transaction_hash=Opt.Null,
        processed_at=Opt.Null,
        wallet_address=Opt.Null,
        claimed_at=Opt.Null
    )
    
    bitcoin_rewards.insert(reward_id, new_reward)
    return CreateBitcoinRewardResult(Ok=new_reward)

class ListBitcoinRewardsResult(Record):
    items: Vec['BitcoinReward']
    total: nat64

@query
def get_user_bitcoin_rewards(skip: int, limit: int, user_id: Opt[str], status: Opt[str]) -> ListBitcoinRewardsResult:
    """Get all Bitcoin rewards for a user, optionally filtered by status."""
    target_user_id_str = user_id if user_id is not None else str(ic.caller())
    try:
        target_user_id = Principal.from_str(target_user_id_str)
    except Exception:
        return ListBitcoinRewardsResult(items=[], total=0)

    user_rewards = [r for _, r in bitcoin_rewards.items() if r.user_id == target_user_id]
    if status is not None:
        user_rewards = [r for r in user_rewards if r.status == status]
    
    total = len(user_rewards)
    paginated_rewards = user_rewards[skip:skip+limit]
    
    return ListBitcoinRewardsResult(items=paginated_rewards, total=total)

class GetBitcoinRewardResult(Variant, aname='GetBitcoinRewardResult'):
    Ok: 'BitcoinReward'
    Err: 'Error'

@query
def get_bitcoin_reward(reward_id: str) -> GetBitcoinRewardResult:
    """Get a specific Bitcoin reward by ID."""
    reward_opt = bitcoin_rewards.get(reward_id)
    if reward_opt is None:
        return GetBitcoinRewardResult(Err=Error(NotFound='Reward not found'))
    return GetBitcoinRewardResult(Ok=reward_opt)

class ClaimBitcoinRewardResult(Variant, aname='ClaimBitcoinRewardResult'):
    Ok: 'BitcoinReward'
    Err: 'Error'

@update
def claim_bitcoin_reward(reward_id: str, wallet_address: str) -> ClaimBitcoinRewardResult:
    """Claim a Bitcoin reward by providing a wallet address."""
    reward_opt = bitcoin_rewards.get(reward_id)
    if reward_opt is None:
        return ClaimBitcoinRewardResult(Err=Error(NotFound='Reward not found'))
    
    reward = reward_opt
    if reward.user_id != ic.caller():
        return ClaimBitcoinRewardResult(Err=Error(Unauthorized='This reward belongs to another user'))
    if reward.status != "pending":
        return ClaimBitcoinRewardResult(Err=Error(InvalidInput=f'Reward is already {reward.status}'))
    
    reward.status = "claimed"
    reward.wallet_address = [wallet_address]
    reward.claimed_at = [get_current_timestamp()]
    bitcoin_rewards.insert(reward_id, reward)
    return ClaimBitcoinRewardResult(Ok=reward)

# ===== System Info =====

# Canister info endpoint removed to avoid parameter issues
