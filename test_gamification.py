#!/usr/bin/env python3
"""
Direct test for the gamification functionality in ICPlearn backend.
This script tests the Combat Arena, Neuro-Stake, and Genesis NFT implementations.
"""

import os
import sys
import json
from typing import Dict, Any, List, Optional

def check_combat_arena_implementation():
    """Check if the Combat Arena implementation is correct."""
    
    # Get the source code of the main.py file
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    with open(main_file_path, "r") as f:
        main_content = f.read()
    
    # Check for Combat Arena storage
    if "combat_arenas = StableBTreeMap" in main_content:
        print("✅ combat_arenas StableBTreeMap found")
    else:
        print("❌ combat_arenas StableBTreeMap not found")
        return False
    
    # Check for battles storage
    if "battles = StableBTreeMap" in main_content:
        print("✅ battles StableBTreeMap found")
    else:
        print("❌ battles StableBTreeMap not found")
        return False
    
    # Check for create_battle function
    if "def create_battle" in main_content:
        print("✅ create_battle function found")
        
        # Extract the function definition
        start_idx = main_content.find("def create_battle")
        end_idx = main_content.find("@", start_idx)
        if end_idx == -1:
            end_idx = len(main_content)
        
        function_def = main_content[start_idx:end_idx]
        print("\nFunction definition:")
        print(function_def)
        
        # Check if the function inserts into the battles StableBTreeMap
        if "battles.insert" in function_def:
            print("✅ battles.insert found in create_battle")
        else:
            print("❌ battles.insert not found in create_battle")
            return False
    else:
        print("❌ create_battle function not found")
        return False
    
    # Check for start_battle function
    if "def start_battle" in main_content:
        print("✅ start_battle function found")
    else:
        print("❌ start_battle function not found")
        return False
    
    # Check for submit_answer function
    if "def submit_answer" in main_content:
        print("✅ submit_answer function found")
    else:
        print("❌ submit_answer function not found")
        return False
    
    # Check for get_battle function
    if "def get_battle" in main_content:
        print("✅ get_battle function found")
    else:
        print("❌ get_battle function not found")
        return False
    
    # Check for get_user_battles function
    if "def get_user_battles" in main_content:
        print("✅ get_user_battles function found")
        
        # Extract the function definition
        start_idx = main_content.find("def get_user_battles")
        end_idx = main_content.find("@", start_idx)
        if end_idx == -1:
            end_idx = len(main_content)
        
        function_def = main_content[start_idx:end_idx]
        
        # Check if the function has pagination
        if "skip" in function_def and "limit" in function_def:
            print("✅ get_user_battles has pagination")
        else:
            print("❌ get_user_battles does not have pagination")
            return False
        
        # Check if the function has filtering
        if "status" in function_def:
            print("✅ get_user_battles has status filtering")
        else:
            print("❌ get_user_battles does not have status filtering")
            return False
    else:
        print("❌ get_user_battles function not found")
        return False
    
    return True

def check_neuro_stake_implementation():
    """Check if the Neuro-Stake implementation is correct."""
    
    # Get the source code of the main.py file
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    with open(main_file_path, "r") as f:
        main_content = f.read()
    
    # Check for Neuro-Stake storage
    if "neuro_stakes = StableBTreeMap" in main_content:
        print("✅ neuro_stakes StableBTreeMap found")
    else:
        print("❌ neuro_stakes StableBTreeMap not found")
        return False
    
    # Check for create_stake function
    if "def create_stake" in main_content:
        print("✅ create_stake function found")
        
        # Extract the function definition
        start_idx = main_content.find("def create_stake")
        end_idx = main_content.find("@", start_idx)
        if end_idx == -1:
            end_idx = len(main_content)
        
        function_def = main_content[start_idx:end_idx]
        print("\nFunction definition:")
        print(function_def)
        
        # Check if the function inserts into the neuro_stakes StableBTreeMap
        if "neuro_stakes.insert" in function_def:
            print("✅ neuro_stakes.insert found in create_stake")
        else:
            print("❌ neuro_stakes.insert not found in create_stake")
            return False
    else:
        print("❌ create_stake function not found")
        return False
    
    # Check for get_user_stake function
    if "def get_user_stake" in main_content:
        print("✅ get_user_stake function found")
    else:
        print("❌ get_user_stake function not found")
        return False
    
    # Check for update_stake function
    if "def update_stake" in main_content or "def update_user_stake" in main_content:
        print("✅ update_stake function found")
    else:
        print("❌ update_stake function not found")
        return False
    
    return True

def check_genesis_nft_implementation():
    """Check if the Genesis NFT implementation is correct."""
    
    # Get the source code of the main.py file
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    with open(main_file_path, "r") as f:
        main_content = f.read()
    
    # Check for Genesis NFT storage
    if "genesis_nfts = StableBTreeMap" in main_content:
        print("✅ genesis_nfts StableBTreeMap found")
    else:
        print("❌ genesis_nfts StableBTreeMap not found")
        return False
    
    # Check for mint_genesis_nft function
    if "def mint_genesis_nft" in main_content:
        print("✅ mint_genesis_nft function found")
        
        # Extract the function definition
        start_idx = main_content.find("def mint_genesis_nft")
        end_idx = main_content.find("@", start_idx)
        if end_idx == -1:
            end_idx = len(main_content)
        
        function_def = main_content[start_idx:end_idx]
        print("\nFunction definition:")
        print(function_def)
        
        # Check if the function inserts into the genesis_nfts StableBTreeMap
        if "genesis_nfts.insert" in function_def:
            print("✅ genesis_nfts.insert found in mint_genesis_nft")
        else:
            print("❌ genesis_nfts.insert not found in mint_genesis_nft")
            return False
    else:
        print("❌ mint_genesis_nft function not found")
        return False
    
    # Check for get_user_nfts function
    if "def get_user_nfts" in main_content:
        print("✅ get_user_nfts function found")
    else:
        print("❌ get_user_nfts function not found")
        return False
    
    return True

def main():
    """Main function to run the tests."""
    print("=== Testing Gamification Implementation ===\n")
    
    print("--- Combat Arena ---")
    combat_arena_check = check_combat_arena_implementation()
    print("\n--- Neuro-Stake ---")
    neuro_stake_check = check_neuro_stake_implementation()
    print("\n--- Genesis NFT ---")
    genesis_nft_check = check_genesis_nft_implementation()
    
    print("\n=== Test Summary ===")
    print(f"Combat Arena check: {'PASSED' if combat_arena_check else 'FAILED'}")
    print(f"Neuro-Stake check: {'PASSED' if neuro_stake_check else 'FAILED'}")
    print(f"Genesis NFT check: {'PASSED' if genesis_nft_check else 'FAILED'}")
    print(f"Overall: {'PASSED' if combat_arena_check and neuro_stake_check and genesis_nft_check else 'FAILED'}")

if __name__ == "__main__":
    main()
