from kybra import (Record, Variant, Vec, query, update, Opt, Principal, ic, StableBTreeMap, 
                   init, post_upgrade, pre_upgrade, void, nat64, float64, text, nat)

# Core data structures
class User(Record):
    id: Principal
    username: str
    email: str
    btc_address: Opt[str]
    created_at: nat64

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

# Storage
USERS_MEMORY_ID = 1
users = StableBTreeMap[str, User](memory_id=USERS_MEMORY_ID, max_key_size=100, max_value_size=4096)

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

# User management functions
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
        created_at=ic.time() // 1_000_000
    )

    users.insert(user_id, new_user)
    return RegisterUserResult(Ok=new_user)
