from kybra import (Record, Variant, Vec, query, update, Opt, Principal, ic, StableBTreeMap, 
                   init, post_upgrade, pre_upgrade, void, nat64, float64, text, nat)

# Core data structures
class User(Record):
    id: Principal
    username: str
    email: str
    btc_address: Opt[str]
    created_at: nat64

class BitcoinReward(Record):
    id: str
    user_id: Principal
    amount: float64
    skill_ids: Vec[str]
    reward_metadata: str
    created_at: nat64
    status: str
    transaction_hash: Opt[str]
    processed_at: Opt[nat64]
    wallet_address: Opt[str]
    claimed_at: Opt[nat64]

# Error handling
class Error(Variant):
    NotFound: str
    Unauthorized: str
    InvalidPayload: str
    InvalidInput: str
    Forbidden: str

# Result types
class RegisterUserResult(Variant):
    Ok: 'User'
    Err: 'Error'

class GetUserResult(Variant):
    Ok: 'User'
    Err: 'Error'

class CreateBitcoinRewardResult(Variant):
    Ok: 'BitcoinReward'
    Err: 'Error'

class GetBitcoinRewardResult(Variant):
    Ok: 'BitcoinReward'
    Err: 'Error'

# Storage
USERS_MEMORY_ID = 1
BITCOIN_REWARDS_MEMORY_ID = 9

users = StableBTreeMap[str, User](memory_id=USERS_MEMORY_ID, max_key_size=100, max_value_size=4096)
bitcoin_rewards = StableBTreeMap[str, BitcoinReward](memory_id=BITCOIN_REWARDS_MEMORY_ID, max_key_size=100, max_value_size=4096)

# Helper function
def get_current_timestamp() -> nat64:
    """Get current timestamp in milliseconds"""
    return ic.time() // 1_000_000

# Lifecycle functions
@init
def init_function() -> void:
    """Initialize the canister state."""
    pass

@pre_upgrade
def pre_upgrade_function() -> void:
    """Save state before canister upgrade."""
    pass

@post_upgrade
def post_upgrade_function() -> void:
    """Restore state after canister upgrade."""
    pass

# Core functions
@update
def register_user(username: str, email: str, btc_address: Opt[str]) -> RegisterUserResult:
    """Register a new user."""
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

@query
def get_current_user(dummy: Opt[str]) -> GetUserResult:
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

@update
def create_bitcoin_reward(user_id: str, amount: float64, skill_ids: Vec[str]) -> CreateBitcoinRewardResult:
    """Create a new Bitcoin reward for a user."""
    if users.get(user_id) is None:
        return CreateBitcoinRewardResult(Err=Error(NotFound='User not found'))
    
    timestamp = get_current_timestamp()
    reward_id = f"btc_reward_{user_id}_{timestamp}"
    
    try:
        user_principal = Principal.from_str(user_id)
    except Exception:
        return CreateBitcoinRewardResult(Err=Error(InvalidInput='Invalid user ID format'))
    
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

@query
def get_bitcoin_reward(reward_id: str) -> GetBitcoinRewardResult:
    """Get a specific Bitcoin reward by ID."""
    reward_opt = bitcoin_rewards.get(reward_id)
    if reward_opt is None:
        return GetBitcoinRewardResult(Err=Error(NotFound='Reward not found'))
    return GetBitcoinRewardResult(Ok=reward_opt)
