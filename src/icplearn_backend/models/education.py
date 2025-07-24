from typing import TypedDict, List, Dict, Any, Optional

# Course Models
class Course(TypedDict):
    id: str
    title: str
    description: str
    topic: str
    difficulty: int  # 1-5 scale
    content: str
    image_url: Optional[str]
    created_at: int
    updated_at: int
    creator_id: str
    is_published: bool
    dependencies: List[str]  # List of prerequisite course IDs

# User Course Progress
class UserCourse(TypedDict):
    user_id: str
    course_id: str
    progress: int  # Progress percentage (0-100)
    completed: bool
    started_at: int
    completed_at: Optional[int]

# Skill Models
class Skill(TypedDict):
    id: str
    name: str
    description: str
    concept_id: Optional[int]  # Reference to knowledge graph concept
    difficulty: int  # 1-5 indicating difficulty/expertise level
    parent_skill_id: Optional[str]  # For hierarchical skills
    course_ids: List[str]  # Courses this skill is part of
    dependencies: List[str]  # List of prerequisite skill IDs
    created_at: int
    updated_at: int

# User Skill Mastery
class UserSkill(TypedDict):
    user_id: str
    skill_id: str
    mastery_level: int  # 1-5 scale
    earned_at: int
    nft_token_id: Optional[str]  # NFT token ID if minted

# Skill NFT
class SkillNFT(TypedDict):
    id: str
    user_id: str
    skill_id: str
    token_id: str
    mastery_level: int
    metadata_uri: str
    minted_at: int

# Assessment Models
class Question(TypedDict):
    id: str
    assessment_id: str
    concept_id: Optional[int]  # Reference to knowledge graph concept
    format: str  # multiple-choice, code, fill-blank, etc.
    content: str
    options: Optional[Dict[str, str]]  # For multiple choice questions
    correct_answer: Optional[str]  # For simple validation
    ai_validator: bool  # Whether to use AI for validation

class Assessment(TypedDict):
    id: str
    course_id: str
    title: str
    description: str
    questions: List[Question]
    time_limit_minutes: int
    passing_score: int  # Minimum score to pass (percentage)
    created_at: int
    updated_at: int

class UserAnswer(TypedDict):
    id: str
    user_id: str
    question_id: str
    answer: str
    is_correct: bool
    submitted_at: int

class AssessmentResult(TypedDict):
    id: str
    user_id: str
    assessment_id: str
    score: int  # Percentage score
    passed: bool
    answers: List[int]  # Indices of selected answers
    time_taken_seconds: int
    completed_at: int

# AI Learning Models
class AIPrompt(TypedDict):
    id: str
    user_id: str
    skill_id: Optional[str]
    prompt: str
    created_at: int

class AIResponse(TypedDict):
    id: str
    prompt_id: str
    response: str
    model_used: str
    tokens_used: int
    created_at: int
