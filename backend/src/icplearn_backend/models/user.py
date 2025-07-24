from typing import TypedDict, Optional, List, Dict, Any
from kybra import StableBTreeMap, Principal, ic

# Define TypedDict for User data
class User(TypedDict):
    id: str
    principal: str
    username: str
    email: str
    created_at: int
    updated_at: int
    is_active: bool
    is_superuser: bool
    btc_address: Optional[str]

# User course progress tracking
class UserCourse(TypedDict):
    user_id: str
    course_id: str
    progress: int  # Progress percentage (0-100)
    completed: bool
    started_at: int
    completed_at: Optional[int]

# User skill mastery tracking
class UserSkill(TypedDict):
    user_id: str
    skill_id: str
    mastery_level: int  # 1-5 scale
    earned_at: int
    nft_token_id: Optional[str]  # NFT token ID if minted

# In a production environment, we would use StableBTreeMap for persistence
# user_store = StableBTreeMap[str, User](memory_id=1)
# user_course_store = StableBTreeMap[str, UserCourse](memory_id=2)  # Key: user_id + "_" + course_id
# user_skill_store = StableBTreeMap[str, UserSkill](memory_id=3)  # Key: user_id + "_" + skill_id

# For now, we'll use simple dictionaries in main.py
# This file serves as a reference for the data structure
