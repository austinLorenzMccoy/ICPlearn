#!/usr/bin/env python3
"""
Script to fix the Neuro-Stake implementation in the ICPlearn backend.
"""

import os
import re
import sys

def fix_neuro_stake_implementation(file_path):
    """Fix the Neuro-Stake implementation to use neuro_stakes instead of stakes."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace all instances of stakes. with neuro_stakes. except those already using neuro_stakes.
    # This is a bit tricky because we need to make sure we don't replace neuro_stakes with neuro_neuro_stakes
    
    # Replace in update_streak function
    content = content.replace("    stakes.insert(stake_id, stake)\n    \n    return stake", 
                            "    neuro_stakes.insert(stake_id, stake)\n    \n    return stake")
    
    # Replace in get_user_stakes function
    content = content.replace("    for _, stake in stakes.items():", 
                            "    for _, stake in neuro_stakes.items():")
    
    content = content.replace("            stakes.insert(stake[\"id\"], stake)", 
                            "            neuro_stakes.insert(stake[\"id\"], stake)")
    
    # Replace in get_stake function
    content = content.replace("    if not stakes.contains_key(stake_id):", 
                            "    if not neuro_stakes.contains_key(stake_id):")
    
    content = content.replace("    stake = stakes.get(stake_id)", 
                            "    stake = neuro_stakes.get(stake_id)")
    
    content = content.replace("        stakes.insert(stake_id, stake)", 
                            "        neuro_stakes.insert(stake_id, stake)")
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ Fixed Neuro-Stake implementation")

def main():
    """Main function to fix the Neuro-Stake implementation."""
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    print("=== Fixing Neuro-Stake Implementation ===\n")
    
    # Fix Neuro-Stake implementation
    fix_neuro_stake_implementation(main_file_path)
    
    print("\n=== Neuro-Stake Implementation Fixed ===")

if __name__ == "__main__":
    main()
