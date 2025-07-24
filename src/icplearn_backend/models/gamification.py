from typing import TypedDict, List, Dict, Any, Optional
from enum import Enum, auto

# Enums for consistent status values
class BattleStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class NFTRarity(str, Enum):
    COMMON = "common"
    RARE = "rare"
    EPIC = "epic"
    LEGENDARY = "legendary"

class RewardType(str, Enum):
    TOKEN = "token"
    NFT = "nft"
    BITCOIN = "bitcoin"

# Neuro-Stake Models
class NeuroStake(TypedDict):
    id: str
    user_id: str
    amount: float
    streak_days: int
    multiplier: float
    is_active: bool
    created_at: int
    last_activity: int

# Genesis NFT Models
class GenesisNFT(TypedDict):
    id: str
    user_id: str
    course_id: str
    token_id: str
    image_uri: str
    metadata_uri: str
    rarity: str  # One of NFTRarity values
    attributes: Dict[str, Any]
    minted_at: int

# Combat Arena Models
class CombatArena(TypedDict):
    id: str
    name: str
    description: str
    difficulty: int  # 1-5 scale
    prize_pool: float
    is_active: bool
    created_at: int

class Question(TypedDict):
    id: str
    text: str
    options: List[str]
    correct_index: int

class Battle(TypedDict):
    id: str
    arena_id: str
    challenger_id: str
    opponent_id: str
    winner_id: Optional[str]
    status: str  # One of BattleStatus values
    prize_amount: float
    battle_data: Dict[str, Any]  # Store questions, answers, scores
    started_at: int
    completed_at: Optional[int]

# Bitcoin Reward Models
class Reward(TypedDict):
    id: str
    user_id: str
    reward_type: str  # One of RewardType values
    amount: Optional[float]  # For token rewards
    token_id: Optional[str]  # For NFT rewards
    tx_id: Optional[str]  # For Bitcoin rewards
    reward_metadata: Optional[Dict[str, Any]]
    created_at: int

class BitcoinReward(TypedDict):
    id: str
    user_id: str
    amount_satoshis: int
    tx_id: str
    address: str
    skill_ids: List[str]
    created_at: int
    status: str  # 'pending', 'completed', 'failed'
