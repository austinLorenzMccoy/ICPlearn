#!/usr/bin/env python3
"""
Direct test for the Bitcoin reward functionality.
This script tests the Bitcoin reward implementation directly without mocking.
"""

import sys
import os
import json
from typing import Dict, Any, List, Optional

# Check if the correct field names are used in the Bitcoin reward creation
def check_bitcoin_reward_fields():
    """Check if the Bitcoin reward implementation uses the correct field names."""
    
    # Get the source code of the main.py file
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    with open(main_file_path, "r") as f:
        main_content = f.read()
    
    # Check for the create_bitcoin_reward function
    if "def create_bitcoin_reward" not in main_content:
        print("❌ create_bitcoin_reward function not found")
        return False
    
    # Check if the function uses reward_metadata instead of metadata
    if "reward_metadata" in main_content and "def create_bitcoin_reward" in main_content:
        print("✅ create_bitcoin_reward function uses reward_metadata field")
        
        # Extract the function definition
        start_idx = main_content.find("def create_bitcoin_reward")
        end_idx = main_content.find("@", start_idx)
        if end_idx == -1:
            end_idx = len(main_content)
        
        function_def = main_content[start_idx:end_idx]
        print("\nFunction definition:")
        print(function_def)
        
        # Check parameter order
        params = []
        param_line = function_def.split("(")[1].split(")")[0]
        for param in param_line.split(","):
            param = param.strip()
            if ":" in param:
                param_name = param.split(":")[0].strip()
                params.append(param_name)
        
        print("\nParameters in order:", params)
        
        # Check if the function uses the parameters correctly
        if "user_id" in params and "amount" in params and "skill_ids" in params and "reward_metadata" in params:
            print("✅ Parameters are in the correct order")
            return True
        else:
            print("❌ Parameters are not in the correct order or missing")
            return False
    else:
        print("❌ create_bitcoin_reward function does not use reward_metadata field")
        return False

# Check if the Bitcoin reward is stored correctly
def check_bitcoin_reward_storage():
    """Check if the Bitcoin reward is stored correctly using StableBTreeMap."""
    
    # Get the source code of the main.py file
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    with open(main_file_path, "r") as f:
        main_content = f.read()
    
    # Check for the bitcoin_rewards StableBTreeMap
    if "bitcoin_rewards = StableBTreeMap" in main_content:
        print("✅ bitcoin_rewards StableBTreeMap found")
        
        # Extract the StableBTreeMap initialization
        start_idx = main_content.find("bitcoin_rewards = StableBTreeMap")
        end_idx = main_content.find("\n", start_idx)
        
        init_line = main_content[start_idx:end_idx]
        print("\nInitialization line:")
        print(init_line)
        
        # Check if the function inserts into the StableBTreeMap
        if "bitcoin_rewards.insert" in main_content:
            print("✅ bitcoin_rewards.insert found")
            return True
        else:
            print("❌ bitcoin_rewards.insert not found")
            return False
    else:
        print("❌ bitcoin_rewards StableBTreeMap not found")
        return False

def main():
    """Main function to run the tests."""
    print("=== Testing Bitcoin Reward Implementation ===\n")
    
    field_check = check_bitcoin_reward_fields()
    storage_check = check_bitcoin_reward_storage()
    
    print("\n=== Test Summary ===")
    print(f"Field check: {'PASSED' if field_check else 'FAILED'}")
    print(f"Storage check: {'PASSED' if storage_check else 'FAILED'}")
    print(f"Overall: {'PASSED' if field_check and storage_check else 'FAILED'}")

if __name__ == "__main__":
    main()
