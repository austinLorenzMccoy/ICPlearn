#!/usr/bin/env python3
"""
Test script specifically for the Bitcoin reward endpoint.
This script tests the create_bitcoin_reward endpoint which had issues previously.
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

def setup_test_data():
    """Set up test data for the Bitcoin reward test."""
    print("\n=== Setting up test data ===")
    
    # Create a user
    user_data = {
        "username": f"btcuser_{int(time.time())}",
        "email": f"btc_{int(time.time())}@example.com",
        "full_name": "BTC Test User"
    }
    
    print("\nCreating user...")
    user_result = run_dfx_command("create_user", [user_data["username"], user_data["email"], user_data["full_name"]])
    print(f"User created: {json.dumps(user_result, indent=2)}")
    user_id = user_result.get("id")
    
    # Create a skill
    skill_data = {
        "name": f"BTC Skill {int(time.time())}",
        "description": "This is a test skill for Bitcoin rewards",
        "difficulty": 2,
        "parent_skill_id": None,
        "dependencies": []
    }
    
    print("\nCreating skill...")
    skill_result = run_dfx_command("create_skill", [
        skill_data["name"], 
        skill_data["description"], 
        skill_data["difficulty"],
        skill_data["parent_skill_id"],
        skill_data["dependencies"]
    ])
    print(f"Skill created: {json.dumps(skill_result, indent=2)}")
    skill_id = skill_result.get("id")
    
    return user_id, skill_id

def test_bitcoin_reward(user_id: str, skill_id: str):
    """Test the Bitcoin reward endpoint."""
    print("\n=== Testing Bitcoin Reward Endpoint ===")
    
    # Test with reward_metadata as a parameter
    print("\nCreating Bitcoin reward with reward_metadata...")
    result1 = run_dfx_command("create_bitcoin_reward", [
        user_id,
        0.001,  # amount
        [skill_id],
        {"reason": "Test reward with metadata"}
    ])
    print(f"Result with metadata: {json.dumps(result1, indent=2)}")
    
    # Test without reward_metadata (should use default None)
    print("\nCreating Bitcoin reward without reward_metadata...")
    result2 = run_dfx_command("create_bitcoin_reward", [
        user_id,
        0.002,  # amount
        [skill_id],
        None
    ])
    print(f"Result without metadata: {json.dumps(result2, indent=2)}")
    
    return result1, result2

def main():
    """Main function to run the tests."""
    parser = argparse.ArgumentParser(description='Test Bitcoin reward endpoint')
    parser.add_argument('--canister-id', help='Canister ID to test')
    parser.add_argument('--identity', default='default', help='Identity to use for dfx commands')
    parser.add_argument('--user-id', help='Existing user ID to use (skips user creation)')
    parser.add_argument('--skill-id', help='Existing skill ID to use (skips skill creation)')
    
    args = parser.parse_args()
    
    global CANISTER_ID, IDENTITY
    if args.canister_id:
        CANISTER_ID = args.canister_id
    IDENTITY = args.identity
    
    print(f"Testing canister {CANISTER_ID} with identity {IDENTITY}")
    
    if args.user_id and args.skill_id:
        user_id = args.user_id
        skill_id = args.skill_id
        print(f"Using existing user ID: {user_id}")
        print(f"Using existing skill ID: {skill_id}")
    else:
        user_id, skill_id = setup_test_data()
    
    result1, result2 = test_bitcoin_reward(user_id, skill_id)
    
    print("\n=== Test Summary ===")
    print(f"Test with metadata: {'PASSED' if 'error' not in result1 else 'FAILED'}")
    print(f"Test without metadata: {'PASSED' if 'error' not in result2 else 'FAILED'}")

if __name__ == "__main__":
    main()
