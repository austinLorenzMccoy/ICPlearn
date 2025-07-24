from kybra import (Record, Variant, Vec, query, update, Opt, Principal, ic, StableBTreeMap, 
                   init, post_upgrade, pre_upgrade, void, nat64, float64, text, nat)

# Simple data structure
class User(Record):
    id: str
    name: str

# Simple result type
class GetUserResult(Variant):
    Ok: 'User'
    Err: str

# Simple function with parameter
@query
def get_user_by_id(user_id: str) -> GetUserResult:
    """Get a user by ID."""
    return GetUserResult(Ok=User(id=user_id, name="Test User"))

# Add one more simple function
@query
def get_user_count(dummy: str) -> nat64:
    """Get the total number of users."""
    return 42

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
