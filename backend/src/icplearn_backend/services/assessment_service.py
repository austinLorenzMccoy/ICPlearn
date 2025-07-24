from kybra import query, update, ic
from typing import Dict, List, Any, Optional

# In-memory storage for assessments and results (would use stable storage in production)
assessments = {}
assessment_results = {}

@update
def create_assessment(title: str, description: str, skill_id: str, questions: List[Dict[str, Any]], 
                     time_limit_minutes: int, passing_score: int) -> Dict[str, Any]:
    """Create a new assessment."""
    # Validate passing score is between 0-100
    if passing_score < 0 or passing_score > 100:
        return {"error": "Passing score must be between 0 and 100"}
    
    # Validate questions format
    for question in questions:
        if "text" not in question or "options" not in question or "correct_index" not in question:
            return {"error": "Invalid question format"}
        if question["correct_index"] < 0 or question["correct_index"] >= len(question["options"]):
            return {"error": "Correct index out of range"}
    
    assessment_id = f"assessment_{ic.time()}"
    
    # Add IDs to questions if they don't have them
    for i, question in enumerate(questions):
        if "id" not in question:
            question["id"] = f"q_{assessment_id}_{i}"
    
    assessment = {
        "id": assessment_id,
        "title": title,
        "description": description,
        "skill_id": skill_id,
        "questions": questions,
        "time_limit_minutes": time_limit_minutes,
        "passing_score": passing_score,
        "created_at": ic.time(),
        "updated_at": ic.time()
    }
    
    assessments[assessment_id] = assessment
    return assessment

@update
def update_assessment(assessment_id: str, title: Optional[str] = None, description: Optional[str] = None,
                     skill_id: Optional[str] = None, questions: Optional[List[Dict[str, Any]]] = None,
                     time_limit_minutes: Optional[int] = None, passing_score: Optional[int] = None) -> Dict[str, Any]:
    """Update an existing assessment."""
    if assessment_id not in assessments:
        return {"error": "Assessment not found"}
    
    assessment = assessments[assessment_id]
    
    if title is not None:
        assessment["title"] = title
    if description is not None:
        assessment["description"] = description
    if skill_id is not None:
        assessment["skill_id"] = skill_id
    if questions is not None:
        # Validate questions format
        for question in questions:
            if "text" not in question or "options" not in question or "correct_index" not in question:
                return {"error": "Invalid question format"}
            if question["correct_index"] < 0 or question["correct_index"] >= len(question["options"]):
                return {"error": "Correct index out of range"}
            
        # Add IDs to questions if they don't have them
        for i, question in enumerate(questions):
            if "id" not in question:
                question["id"] = f"q_{assessment_id}_{i}"
                
        assessment["questions"] = questions
    if time_limit_minutes is not None:
        assessment["time_limit_minutes"] = time_limit_minutes
    if passing_score is not None:
        # Validate passing score is between 0-100
        if passing_score < 0 or passing_score > 100:
            return {"error": "Passing score must be between 0 and 100"}
        assessment["passing_score"] = passing_score
    
    assessment["updated_at"] = ic.time()
    assessments[assessment_id] = assessment
    
    return assessment

@update
def delete_assessment(assessment_id: str) -> Dict[str, Any]:
    """Delete an assessment."""
    if assessment_id not in assessments:
        return {"error": "Assessment not found"}
    
    deleted_assessment = assessments.pop(assessment_id)
    
    # Delete associated results
    results_to_delete = []
    for result_id, result in assessment_results.items():
        if result["assessment_id"] == assessment_id:
            results_to_delete.append(result_id)
    
    for result_id in results_to_delete:
        assessment_results.pop(result_id)
    
    return {"success": True, "deleted": deleted_assessment["title"]}

@query
def get_assessment(assessment_id: str, include_answers: bool = False) -> Dict[str, Any]:
    """Get a specific assessment by ID."""
    if assessment_id not in assessments:
        return {"error": "Assessment not found"}
    
    assessment = assessments[assessment_id].copy()
    
    # Remove correct answers if not requested
    if not include_answers:
        for question in assessment["questions"]:
            if "correct_index" in question:
                del question["correct_index"]
    
    return assessment

@query
def list_assessments(skill_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """List all assessments, optionally filtered by skill."""
    result = []
    
    for assessment in assessments.values():
        if skill_id is not None and assessment["skill_id"] != skill_id:
            continue
        
        # Create a copy without the questions for brevity
        assessment_copy = {k: v for k, v in assessment.items() if k != "questions"}
        assessment_copy["question_count"] = len(assessment["questions"])
        result.append(assessment_copy)
    
    return result

@update
def submit_assessment(user_id: str, assessment_id: str, answers: List[int], time_taken_seconds: int) -> Dict[str, Any]:
    """Submit an assessment with answers and calculate the score."""
    if assessment_id not in assessments:
        return {"error": "Assessment not found"}
    
    assessment = assessments[assessment_id]
    
    # Validate answers length matches questions
    if len(answers) != len(assessment["questions"]):
        return {"error": "Number of answers does not match number of questions"}
    
    # Calculate score
    correct_count = 0
    for i, question in enumerate(assessment["questions"]):
        if i < len(answers) and answers[i] == question["correct_index"]:
            correct_count += 1
    
    score = int((correct_count / len(assessment["questions"])) * 100)
    passed = score >= assessment["passing_score"]
    
    result_id = f"result_{user_id}_{assessment_id}_{ic.time()}"
    
    result = {
        "id": result_id,
        "user_id": user_id,
        "assessment_id": assessment_id,
        "score": score,
        "passed": passed,
        "answers": answers,
        "time_taken_seconds": time_taken_seconds,
        "completed_at": ic.time()
    }
    
    assessment_results[result_id] = result
    
    return result

@query
def get_assessment_result(result_id: str) -> Dict[str, Any]:
    """Get a specific assessment result by ID."""
    if result_id not in assessment_results:
        return {"error": "Assessment result not found"}
    
    return assessment_results[result_id]

@query
def get_user_assessment_results(user_id: str, assessment_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Get all assessment results for a user, optionally filtered by assessment."""
    result = []
    
    for assessment_result in assessment_results.values():
        if assessment_result["user_id"] != user_id:
            continue
        if assessment_id is not None and assessment_result["assessment_id"] != assessment_id:
            continue
        result.append(assessment_result)
    
    return result
