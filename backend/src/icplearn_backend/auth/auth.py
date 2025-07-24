from kybra import Principal, ic, query, update
from typing import Dict, Any, Optional

# This module handles authentication using Internet Identity
# Unlike the JWT-based auth in the original FastAPI backend,
# ICP uses principals for authentication

@query
def get_principal() -> str:
    """Get the caller's principal ID as a string."""
    return str(ic.caller())

@query
def is_anonymous() -> bool:
    """Check if the caller is anonymous."""
    return ic.caller() == Principal.anonymous()

@query
def is_authenticated() -> bool:
    """Check if the caller is authenticated (not anonymous)."""
    return ic.caller() != Principal.anonymous()

# Helper functions for authorization checks
def require_auth() -> None:
    """Require that the caller is authenticated."""
    if ic.caller() == Principal.anonymous():
        ic.trap("Authentication required")

def require_self_or_admin(user_id: str) -> None:
    """Require that the caller is either the user or an admin."""
    caller = str(ic.caller())
    if caller != user_id and not is_admin(caller):
        ic.trap("Unauthorized")

def is_admin(user_id: str) -> bool:
    """Check if the user is an admin."""
    # In a real implementation, this would check against a list of admin principals
    # For now, we'll use a simple hardcoded check
    admin_principals = [
        # Add admin principals here
    ]
    return user_id in admin_principals
