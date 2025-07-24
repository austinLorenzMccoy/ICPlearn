#!/usr/bin/env python3
"""
Script to fix the gamification implementation in the ICPlearn backend.
This script:
1. Updates the Neuro-Stake implementation to use neuro_stakes instead of stakes
2. Adds the missing Genesis NFT functionality
"""

import os
import re
import sys

def fix_neuro_stake_implementation(file_path):
    """Fix the Neuro-Stake implementation to use neuro_stakes instead of stakes."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace stakes.insert with neuro_stakes.insert in create_stake function
    # This was already fixed in a previous step
    
    # Replace stakes.insert with neuro_stakes.insert in update_streak function
    content = re.sub(r'stakes\.insert\(stake_id, stake\)\s+\s+return stake', 
                    'neuro_stakes.insert(stake_id, stake)\n    \n    return stake', 
                    content)
    
    # Replace stakes.items() with neuro_stakes.items() in get_user_stakes function
    content = re.sub(r'for _, stake in stakes\.items\(\):', 
                    'for _, stake in neuro_stakes.items():', 
                    content)
    
    # Replace stakes.insert with neuro_stakes.insert in get_user_stakes function
    content = re.sub(r'stakes\.insert\(stake\["id"\], stake\)', 
                    'neuro_stakes.insert(stake["id"], stake)', 
                    content)
    
    # Replace stakes.contains_key with neuro_stakes.contains_key in get_stake function
    content = re.sub(r'if not stakes\.contains_key\(stake_id\):', 
                    'if not neuro_stakes.contains_key(stake_id):', 
                    content)
    
    # Replace stakes.get with neuro_stakes.get in get_stake function
    content = re.sub(r'stake = stakes\.get\(stake_id\)', 
                    'stake = neuro_stakes.get(stake_id)', 
                    content)
    
    # Replace stakes.insert with neuro_stakes.insert in get_stake function
    content = re.sub(r'stakes\.insert\(stake_id, stake\)\s+\s+return stake', 
                    'neuro_stakes.insert(stake_id, stake)\n    \n    return stake', 
                    content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ Fixed Neuro-Stake implementation")

def add_genesis_nft_functionality(file_path):
    """Add the missing Genesis NFT functionality."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find the position to insert the new functions
    # We'll add them after the transfer_nft function
    transfer_nft_end = content.find("    return nft", content.find("def transfer_nft")) + 14
    
    # Add the new functions
    new_functions = """

@update
def mint_genesis_nft(course_id: str, image_uri: str, metadata_uri: str, rarity: str, attributes: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    \"\"\"Mint a new Genesis NFT for course completion.\"\"\"
    principal = ic.caller()
    user_id = str(principal)
    
    if not users.contains_key(user_id):
        return {"error": "User not found"}
    
    if not courses.contains_key(course_id):
        return {"error": "Course not found"}
    
    # Validate rarity
    valid_rarities = ["common", "rare", "epic", "legendary"]
    if rarity not in valid_rarities:
        return {"error": f"Invalid rarity. Must be one of: {', '.join(valid_rarities)}"}
    
    timestamp = get_current_timestamp()
    token_id = f"genesis_{user_id}_{course_id}_{timestamp}"
    
    nft = {
        "id": token_id,
        "user_id": user_id,
        "course_id": course_id,
        "token_id": token_id,
        "image_uri": image_uri,
        "metadata_uri": metadata_uri,
        "rarity": rarity,
        "attributes": attributes or {},
        "minted_at": timestamp
    }
    
    genesis_nfts.insert(token_id, nft)
    return nft

@query
def get_user_genesis_nfts(skip: int = 0, limit: int = 20) -> Dict[str, Any]:
    """Get all Genesis NFTs for the current user."""
    principal = ic.caller()
    user_id = str(principal)
    
    result = []
    count = 0
    total = 0
    
    for _, nft in genesis_nfts.items():
        if nft["user_id"] != user_id:
            continue
        
        total += 1
        
        if count < skip:
            count += 1
            continue
        
        if len(result) >= limit:
            continue
        
        result.append(nft)
    
    # Sort by minted date (newest first)
    result.sort(key=lambda x: x["minted_at"], reverse=True)
    
    return {
        "items": result,
        "total": total,
        "skip": skip,
        "limit": limit
    }

@query
def get_genesis_nft(nft_id: str) -> Dict[str, Any]:
    """Get a specific Genesis NFT by ID."""
    if not genesis_nfts.contains_key(nft_id):
        return {"error": "Genesis NFT not found"}
    
    return genesis_nfts.get(nft_id)
"""
    
    # Insert the new functions
    content = content[:transfer_nft_end] + new_functions + content[transfer_nft_end:]
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ Added Genesis NFT functionality")

def main():
    """Main function to fix the gamification implementation."""
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    print("=== Fixing Gamification Implementation ===\n")
    
    # Fix Neuro-Stake implementation
    fix_neuro_stake_implementation(main_file_path)
    
    # Add Genesis NFT functionality
    add_genesis_nft_functionality(main_file_path)
    
    print("\n=== Gamification Implementation Fixed ===")
    print("Run the gamification test to verify the fixes.")

if __name__ == "__main__":
    main()
