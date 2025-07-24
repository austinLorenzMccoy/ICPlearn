from kybra import (
    update, query, init, pre_upgrade, post_upgrade,
    StableBTreeMap, nat64, text, Record, Variant, Vec, void,
    ic
)

# Simple record for testing
class User(Record):
    id: text
    name: text
    created_at: nat64

# Result types
class GetUserResult(Variant):
    Ok: User
    Err: text

class CreateUserResult(Variant):
    Ok: User
    Err: text

# Test 1: Basic StableBTreeMap declaration with proper size parameters
users_storage = StableBTreeMap[text, User](
    memory_id=0,
    max_key_size=100,
    max_value_size=1000
)

# Test 3: Query function with StableBTreeMap
@query
def get_user_simple(user_id: text) -> GetUserResult:
    """Simple query function"""
    try:
        user_opt = users_storage.get(user_id)
        if user_opt is not None:
            return GetUserResult(Ok=user_opt)
        else:
            return GetUserResult(Err="User not found")
    except Exception as e:
        return GetUserResult(Err=f"Error: {str(e)}")

# Test 4: Update function with StableBTreeMap
@update
def create_user_simple(user_id: text, name: text) -> CreateUserResult:
    """Simple update function"""
    try:
        user = User(
            id=user_id,
            name=name,
            created_at=ic.time()
        )
        users_storage.insert(user_id, user)
        return CreateUserResult(Ok=user)
    except Exception as e:
        return CreateUserResult(Err=f"Error: {str(e)}")

# Test 5: Function using len() on StableBTreeMap
@query
def get_user_count() -> nat64:
    """Function that uses len() on StableBTreeMap"""
    try:
        return len(users_storage)
    except Exception as e:
        return 0

# Test 6: Function iterating over StableBTreeMap
@query
def list_all_users() -> Vec[User]:
    """Function that iterates over StableBTreeMap"""
    try:
        users = []
        for user_id, user in users_storage.items():
            users.append(user)
        return users
    except Exception as e:
        return []

# Test 7: Lifecycle functions with StableBTreeMap
@init
def init_canister() -> void:
    """Initialize canister with some test data"""
    test_user = User(id="init_user", name="Init User", created_at=ic.time())
    users_storage.insert("init_user", test_user)

@pre_upgrade
def pre_upgrade_hook() -> void:
    """Pre-upgrade hook"""
    pass

@post_upgrade
def post_upgrade_hook() -> void:
    """Post-upgrade hook"""
    pass
