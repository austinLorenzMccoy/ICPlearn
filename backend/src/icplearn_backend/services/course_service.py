from kybra import query, update, ic
from typing import Dict, List, Any, Optional

# In-memory storage for courses (would use stable storage in production)
courses = {}

@update
def create_course(title: str, description: str, image_url: Optional[str], creator_id: str, skills: List[str]) -> Dict[str, Any]:
    """Create a new course."""
    course_id = f"course_{ic.time()}"
    
    course = {
        "id": course_id,
        "title": title,
        "description": description,
        "image_url": image_url,
        "created_at": ic.time(),
        "updated_at": ic.time(),
        "creator_id": creator_id,
        "is_published": False,
        "skills": skills
    }
    
    courses[course_id] = course
    return course

@update
def update_course(course_id: str, title: Optional[str] = None, description: Optional[str] = None, 
                 image_url: Optional[str] = None, is_published: Optional[bool] = None, 
                 skills: Optional[List[str]] = None) -> Dict[str, Any]:
    """Update an existing course."""
    if course_id not in courses:
        return {"error": "Course not found"}
    
    course = courses[course_id]
    
    if title is not None:
        course["title"] = title
    if description is not None:
        course["description"] = description
    if image_url is not None:
        course["image_url"] = image_url
    if is_published is not None:
        course["is_published"] = is_published
    if skills is not None:
        course["skills"] = skills
    
    course["updated_at"] = ic.time()
    courses[course_id] = course
    
    return course

@update
def delete_course(course_id: str) -> Dict[str, Any]:
    """Delete a course."""
    if course_id not in courses:
        return {"error": "Course not found"}
    
    deleted_course = courses.pop(course_id)
    return {"success": True, "deleted": deleted_course["title"]}

@query
def get_course(course_id: str) -> Dict[str, Any]:
    """Get a specific course by ID."""
    if course_id not in courses:
        return {"error": "Course not found"}
    
    return courses[course_id]

@query
def list_courses(creator_id: Optional[str] = None, published_only: bool = False) -> List[Dict[str, Any]]:
    """List all courses, optionally filtered by creator or publication status."""
    result = []
    
    for course in courses.values():
        if creator_id is not None and course["creator_id"] != creator_id:
            continue
        if published_only and not course["is_published"]:
            continue
        result.append(course)
    
    return result

@query
def search_courses(query: str) -> List[Dict[str, Any]]:
    """Search courses by title or description."""
    query = query.lower()
    result = []
    
    for course in courses.values():
        if (query in course["title"].lower() or 
            query in course["description"].lower()):
            result.append(course)
    
    return result
