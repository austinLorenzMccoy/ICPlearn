from kybra import query, update, ic
from typing import Dict, List, Any, Optional

# In-memory storage for rewards (would use stable storage in production)
bitcoin_rewards = {}

@update
def create_bitcoin_reward(user_id: str, amount: float, skill_ids: List[str], reward_metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Create a new Bitcoin reward for a user based on their skills.
    
    Note: We're using reward_metadata instead of metadata as per our previous fix
    in the original codebase to avoid field name mismatches.
    """
    # In a real implementation, we would validate the user and skills
    # For now, we'll assume they exist
    
    reward_id = f"btc_reward_{user_id}_{ic.time()}"
    
    reward = {
        "id": reward_id,
        "user_id": user_id,
        "amount": amount,
        "skill_ids": skill_ids,
        "reward_metadata": reward_metadata or {},  # Use reward_metadata as the field name
        "created_at": ic.time(),
        "status": "pending"
    }
    
    bitcoin_rewards[reward_id] = reward
    return reward

@update
def process_bitcoin_reward(reward_id: str) -> Dict[str, Any]:
    """Process a pending Bitcoin reward."""
    if reward_id not in bitcoin_rewards:
        return {"error": "Reward not found"}
    
    reward = bitcoin_rewards[reward_id]
    
    # In a real implementation, this would interact with a Bitcoin wallet
    # For now, we'll just update the status
    reward["status"] = "completed"
    bitcoin_rewards[reward_id] = reward
    
    return reward

@query
def get_user_bitcoin_rewards(user_id: str) -> List[Dict[str, Any]]:
    """Get all Bitcoin rewards for a user."""
    return [reward for reward in bitcoin_rewards.values() if reward["user_id"] == user_id]

@query
def get_bitcoin_reward(reward_id: str) -> Dict[str, Any]:
    """Get a specific Bitcoin reward by ID."""
    if reward_id not in bitcoin_rewards:
        return {"error": "Reward not found"}
    
    return bitcoin_rewards[reward_id]
