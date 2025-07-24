from kybra import query, update, ic
from typing import Dict, List, Any, Optional

# In-memory storage for skills (would use stable storage in production)
skills = {}

@update
def create_skill(name: str, description: str, level: int, parent_skill_id: Optional[str] = None, 
                course_ids: Optional[List[str]] = None) -> Dict[str, Any]:
    """Create a new skill."""
    # Validate level is between 1-5
    if level < 1 or level > 5:
        return {"error": "Skill level must be between 1 and 5"}
    
    # Validate parent skill exists if provided
    if parent_skill_id is not None and parent_skill_id not in skills:
        return {"error": "Parent skill not found"}
    
    skill_id = f"skill_{ic.time()}"
    
    skill = {
        "id": skill_id,
        "name": name,
        "description": description,
        "level": level,
        "parent_skill_id": parent_skill_id,
        "course_ids": course_ids or [],
        "created_at": ic.time(),
        "updated_at": ic.time()
    }
    
    skills[skill_id] = skill
    return skill

@update
def update_skill(skill_id: str, name: Optional[str] = None, description: Optional[str] = None,
                level: Optional[int] = None, parent_skill_id: Optional[str] = None,
                course_ids: Optional[List[str]] = None) -> Dict[str, Any]:
    """Update an existing skill."""
    if skill_id not in skills:
        return {"error": "Skill not found"}
    
    skill = skills[skill_id]
    
    if name is not None:
        skill["name"] = name
    if description is not None:
        skill["description"] = description
    if level is not None:
        # Validate level is between 1-5
        if level < 1 or level > 5:
            return {"error": "Skill level must be between 1 and 5"}
        skill["level"] = level
    if parent_skill_id is not None:
        # Validate parent skill exists
        if parent_skill_id not in skills and parent_skill_id != "":
            return {"error": "Parent skill not found"}
        # Prevent circular references
        if parent_skill_id == skill_id:
            return {"error": "A skill cannot be its own parent"}
        skill["parent_skill_id"] = parent_skill_id if parent_skill_id != "" else None
    if course_ids is not None:
        skill["course_ids"] = course_ids
    
    skill["updated_at"] = ic.time()
    skills[skill_id] = skill
    
    return skill

@update
def delete_skill(skill_id: str) -> Dict[str, Any]:
    """Delete a skill."""
    if skill_id not in skills:
        return {"error": "Skill not found"}
    
    # Check if any skills have this as a parent
    for other_skill in skills.values():
        if other_skill["parent_skill_id"] == skill_id:
            return {"error": "Cannot delete skill that is a parent to other skills"}
    
    deleted_skill = skills.pop(skill_id)
    return {"success": True, "deleted": deleted_skill["name"]}

@query
def get_skill(skill_id: str) -> Dict[str, Any]:
    """Get a specific skill by ID."""
    if skill_id not in skills:
        return {"error": "Skill not found"}
    
    return skills[skill_id]

@query
def list_skills(level: Optional[int] = None, parent_skill_id: Optional[str] = None, 
               course_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """List all skills, optionally filtered by level, parent, or course."""
    result = []
    
    for skill in skills.values():
        if level is not None and skill["level"] != level:
            continue
        if parent_skill_id is not None:
            if parent_skill_id == "" and skill["parent_skill_id"] is not None:
                continue
            if parent_skill_id != "" and skill["parent_skill_id"] != parent_skill_id:
                continue
        if course_id is not None and course_id not in skill["course_ids"]:
            continue
        result.append(skill)
    
    return result

@query
def get_skill_tree(root_skill_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get a hierarchical tree of skills starting from the specified root or all top-level skills."""
    def build_tree(parent_id):
        children = []
        for skill in skills.values():
            if skill["parent_skill_id"] == parent_id:
                skill_copy = skill.copy()
                skill_copy["children"] = build_tree(skill["id"])
                children.append(skill_copy)
        return children
    
    if root_skill_id is not None:
        if root_skill_id not in skills:
            return {"error": "Root skill not found"}
        root = skills[root_skill_id].copy()
        root["children"] = build_tree(root_skill_id)
        return [root]
    else:
        # Get all top-level skills (no parent)
        result = []
        for skill in skills.values():
            if skill["parent_skill_id"] is None:
                skill_copy = skill.copy()
                skill_copy["children"] = build_tree(skill["id"])
                result.append(skill_copy)
        return result
