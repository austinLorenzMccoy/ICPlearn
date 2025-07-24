from kybra import (Record, Variant, Vec, query, update, Opt, Principal, ic, StableBTreeMap, 
                   init, post_upgrade, pre_upgrade, void, nat64, float64, text, nat, int, float, bool, str)

# Simple data structure
class User(Record):
    id: str
    name: str

# Simple result type
class GetUserResult(Variant, aname='GetUserResult'):
    Ok: 'User'
    Err: str

# Simple function with parameter
@query
def get_user_by_id(user_id: str) -> GetUserResult:
    """Get a user by ID."""
    return GetUserResult(Ok=User(id=user_id, name="Test User"))

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
