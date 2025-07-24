#!/usr/bin/env python3
"""
Script to add the update_stake function to the ICPlearn backend.
"""

import os
import sys

def add_update_stake_function(file_path):
    """Add the missing update_stake function."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find the position to insert the new function
    # We'll add it after the update_streak function
    update_streak_end = content.find("    return stake", content.find("def update_streak")) + 16
    
    # Create the new function as a string
    update_stake_function = """

@update
def update_stake(stake_id: str, amount: Optional[float] = None, duration_days: Optional[int] = None) -> Dict[str, Any]:
    \"\"\"Update an existing stake with new amount or duration.\"\"\"
    principal = ic.caller()
    user_id = str(principal)
    
    if not neuro_stakes.contains_key(stake_id):
        return {"error": "Stake not found"}
    
    stake = neuro_stakes.get(stake_id)
    
    if stake["user_id"] != user_id:
        return {"error": "Unauthorized"}
    
    # Check if stake is still active
    if stake["status"] != "active":
        return {"error": f"Stake is {stake['status']}"}
    
    timestamp = get_current_timestamp()
    modified = False
    
    # Update amount if provided
    if amount is not None:
        if amount <= 0:
            return {"error": "Amount must be positive"}
        stake["amount"] = amount
        modified = True
    
    # Update duration if provided
    if duration_days is not None:
        if duration_days < 7:
            return {"error": "Minimum staking period is 7 days"}
        
        # Calculate new end date
        stake["duration_days"] = duration_days
        stake["end_date"] = timestamp + (duration_days * 24 * 60 * 60 * 1000)  # Convert days to milliseconds
        modified = True
    
    if modified:
        stake["updated_at"] = timestamp
        neuro_stakes.insert(stake_id, stake)
    
    return stake
"""
    
    # Insert the new function
    content = content[:update_streak_end] + update_stake_function + content[update_streak_end:]
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ Added update_stake function")

def main():
    """Main function to add the update_stake function."""
    main_file_path = os.path.join(os.path.dirname(__file__), "src", "icplearn_backend", "main.py")
    
    print("=== Adding update_stake Function ===\n")
    
    # Add update_stake function
    add_update_stake_function(main_file_path)
    
    print("\n=== update_stake Function Added ===")

if __name__ == "__main__":
    main()
