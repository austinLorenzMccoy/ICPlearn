#!/usr/bin/env python3
"""
Test script for ICPlearn backend API endpoints.
This script tests the API endpoints by making requests to the local canister.
"""

import os
import json
import subprocess
import time
import argparse
from typing import Dict, Any, List, Optional

# Test configuration
CANISTER_ID = "be2us-64aaa-aaaaa-qaabq-cai"  # Replace with your actual canister ID
IDENTITY = "default"  # The identity to use for dfx commands

def run_dfx_command(method: str, args: List[Any] = None, update: bool = True) -> Dict[str, Any]:
    """Run a dfx command to call a canister method."""
    if args is None:
        args = []
    
    # Convert args to JSON string
    args_json = json.dumps(args)
    
    # Build the dfx command
    # Note: In dfx 0.28.0, --type is used for output format (idl, raw), not for query/update
    cmd = [
        "dfx", "canister", "call", 
        "--identity", IDENTITY,
        CANISTER_ID, 
        method,
        args_json
    ]
    
    # Add query flag if it's a query method
    if not update:
        cmd.append("--query")
    
    # Run the command
    print(f"Running command: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return {"error": result.stderr}
    
    # Parse the output
    try:
        # The output might have some extra text before the JSON
        json_start = result.stdout.find('{')
        if json_start == -1:
            json_start = result.stdout.find('[')
        
        if json_start != -1:
            json_str = result.stdout[json_start:]
            return json.loads(json_str)
        else:
            return {"result": result.stdout.strip()}
    except json.JSONDecodeError:
        return {"result": result.stdout.strip()}

def test_user_endpoints():
    """Test user-related endpoints."""
    print("\n=== Testing User Endpoints ===")
    
    # Test create_user
    user_data = {
        "username": f"testuser_{int(time.time())}",
        "email": f"test_{int(time.time())}@example.com",
        "full_name": "Test User"
    }
    
    print("\nCreating user...")
    result = run_dfx_command("create_user", [user_data["username"], user_data["email"], user_data["full_name"]])
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test get_user
    print("\nGetting user...")
    result = run_dfx_command("get_user", [result.get("id")], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test list_users
    print("\nListing users...")
    result = run_dfx_command("list_users", [None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return result

def test_course_endpoints():
    """Test course-related endpoints."""
    print("\n=== Testing Course Endpoints ===")
    
    # Test create_course
    course_data = {
        "title": f"Test Course {int(time.time())}",
        "description": "This is a test course",
        "difficulty": 2,
        "estimated_hours": 10,
        "published": True
    }
    
    print("\nCreating course...")
    result = run_dfx_command("create_course", [
        course_data["title"], 
        course_data["description"], 
        course_data["difficulty"],
        course_data["estimated_hours"],
        course_data["published"]
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    course_id = result.get("id")
    
    # Test get_course
    print("\nGetting course...")
    result = run_dfx_command("get_course", [course_id], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test list_courses
    print("\nListing courses...")
    result = run_dfx_command("list_courses", [None, None, None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return course_id

def test_skill_endpoints():
    """Test skill-related endpoints."""
    print("\n=== Testing Skill Endpoints ===")
    
    # Test create_skill
    skill_data = {
        "name": f"Test Skill {int(time.time())}",
        "description": "This is a test skill",
        "difficulty": 2,
        "parent_skill_id": None,
        "dependencies": []
    }
    
    print("\nCreating skill...")
    result = run_dfx_command("create_skill", [
        skill_data["name"], 
        skill_data["description"], 
        skill_data["difficulty"],
        skill_data["parent_skill_id"],
        skill_data["dependencies"]
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    skill_id = result.get("id")
    
    # Test get_skill
    print("\nGetting skill...")
    result = run_dfx_command("get_skill", [skill_id], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test list_skills
    print("\nListing skills...")
    result = run_dfx_command("list_skills", [None, None, None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return skill_id

def test_assessment_endpoints(course_id: str, skill_id: str):
    """Test assessment-related endpoints."""
    print("\n=== Testing Assessment Endpoints ===")
    
    # Test create_assessment
    assessment_data = {
        "title": f"Test Assessment {int(time.time())}",
        "description": "This is a test assessment",
        "course_id": course_id,
        "skill_ids": [skill_id],
        "time_limit_minutes": 30,
        "passing_score": 70,
        "ai_validation": False
    }
    
    print("\nCreating assessment...")
    result = run_dfx_command("create_assessment", [
        assessment_data["title"], 
        assessment_data["description"], 
        assessment_data["course_id"],
        assessment_data["skill_ids"],
        assessment_data["time_limit_minutes"],
        assessment_data["passing_score"],
        assessment_data["ai_validation"]
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    assessment_id = result.get("id")
    
    # Test add_question_to_assessment
    print("\nAdding question to assessment...")
    question_data = {
        "question_text": "What is 2+2?",
        "question_type": "multiple_choice",
        "options": ["3", "4", "5", "6"],
        "correct_option": 1  # 0-indexed, so 1 is the second option (4)
    }
    
    result = run_dfx_command("add_question_to_assessment", [
        assessment_id,
        question_data["question_text"],
        question_data["question_type"],
        question_data["options"],
        question_data["correct_option"],
        None  # correct_answer for short_answer questions
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test get_assessment
    print("\nGetting assessment...")
    result = run_dfx_command("get_assessment", [assessment_id, True], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test list_assessments
    print("\nListing assessments...")
    result = run_dfx_command("list_assessments", [course_id, None, None, None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return assessment_id

def test_combat_arena_endpoints(skill_id: str):
    """Test combat arena-related endpoints."""
    print("\n=== Testing Combat Arena Endpoints ===")
    
    # Test create_battle
    battle_data = {
        "stake_amount": 10,
        "skill_ids": [skill_id],
        "time_limit_minutes": 5
    }
    
    print("\nCreating battle...")
    result = run_dfx_command("create_battle", [
        battle_data["stake_amount"], 
        battle_data["skill_ids"], 
        battle_data["time_limit_minutes"]
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    battle_id = result.get("id")
    
    # Test get_battle
    print("\nGetting battle...")
    result = run_dfx_command("get_battle", [battle_id], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test get_user_battles
    print("\nGetting user battles...")
    result = run_dfx_command("get_user_battles", [None, None, None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return battle_id

def test_ai_endpoints(skill_id: str):
    """Test AI-related endpoints."""
    print("\n=== Testing AI Endpoints ===")
    
    # Test generate_course_content
    print("\nGenerating course content...")
    result = run_dfx_command("generate_course_content", ["Python Programming", 2])
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test generate_skill_nft_metadata
    print("\nGenerating skill NFT metadata...")
    result = run_dfx_command("generate_skill_nft_metadata", [skill_id, 50])
    print(f"Result: {json.dumps(result, indent=2)}")
    
    # Test list_user_ai_prompts
    print("\nListing user AI prompts...")
    result = run_dfx_command("list_user_ai_prompts", [None, None, None, 0, 10], update=False)
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return result

def test_bitcoin_reward_endpoints(skill_id: str):
    """Test Bitcoin reward-related endpoints."""
    print("\n=== Testing Bitcoin Reward Endpoints ===")
    
    # Get current user ID
    user_result = run_dfx_command("get_current_user", [], update=False)
    user_id = user_result.get("id")
    
    # Test create_bitcoin_reward
    print("\nCreating Bitcoin reward...")
    result = run_dfx_command("create_bitcoin_reward", [
        user_id,
        0.001,  # amount
        [skill_id],
        {"reason": "Test reward"}
    ])
    print(f"Result: {json.dumps(result, indent=2)}")
    
    return result

def main():
    """Main function to run the tests."""
    parser = argparse.ArgumentParser(description='Test ICPlearn backend API endpoints')
    parser.add_argument('--canister-id', help='Canister ID to test')
    parser.add_argument('--identity', default='default', help='Identity to use for dfx commands')
    parser.add_argument('--test', choices=['all', 'user', 'course', 'skill', 'assessment', 'combat', 'ai', 'bitcoin'], 
                        default='all', help='Which tests to run')
    
    args = parser.parse_args()
    
    global CANISTER_ID, IDENTITY
    if args.canister_id:
        CANISTER_ID = args.canister_id
    IDENTITY = args.identity
    
    print(f"Testing canister {CANISTER_ID} with identity {IDENTITY}")
    
    if args.test in ['all', 'user']:
        users_result = test_user_endpoints()
    
    if args.test in ['all', 'course']:
        course_id = test_course_endpoints()
    else:
        course_id = None
    
    if args.test in ['all', 'skill']:
        skill_id = test_skill_endpoints()
    else:
        skill_id = None
    
    if args.test in ['all', 'assessment'] and course_id and skill_id:
        assessment_id = test_assessment_endpoints(course_id, skill_id)
    
    if args.test in ['all', 'combat'] and skill_id:
        battle_id = test_combat_arena_endpoints(skill_id)
    
    if args.test in ['all', 'ai'] and skill_id:
        ai_result = test_ai_endpoints(skill_id)
    
    if args.test in ['all', 'bitcoin'] and skill_id:
        bitcoin_result = test_bitcoin_reward_endpoints(skill_id)
    
    print("\n=== All tests completed ===")

if __name__ == "__main__":
    main()
