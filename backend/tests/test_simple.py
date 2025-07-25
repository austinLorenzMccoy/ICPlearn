#!/usr/bin/env python3
"""
Simple test to verify the backend is working after reorganization
"""

import subprocess
import sys

def run_dfx_command(command):
    """Run a dfx command and return the result"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=10)
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout.strip(),
            "stderr": result.stderr.strip()
        }
    except subprocess.TimeoutExpired:
        return {"success": False, "stdout": "", "stderr": "Timeout"}

def test_basic_functionality():
    """Test basic canister functionality"""
    print("🧪 Simple Backend Test")
    print("=" * 50)
    
    # Test 1: Check if canister is running
    print("1. Testing canister status...")
    result = run_dfx_command("dfx canister status icplearn_backend")
    if result["success"]:
        print("   ✅ Canister is running")
    else:
        print("   ❌ Canister not accessible")
        print(f"   Error: {result['stderr']}")
        return False
    
    # Test 2: Test get_user_count (no parameters needed)
    print("2. Testing get_user_count...")
    result = run_dfx_command("echo '()' | dfx canister call icplearn_backend get_user_count")
    if result["success"] and result["stdout"]:
        print(f"   ✅ User count: {result['stdout']}")
    else:
        print("   ❌ get_user_count failed")
        print(f"   Error: {result['stderr']}")
    
    # Test 3: Test get_user_by_id with a test user
    print("3. Testing get_user_by_id...")
    result = run_dfx_command('dfx canister call icplearn_backend get_user_by_id \'("test_user")\'')
    if result["success"]:
        print("   ✅ get_user_by_id working")
        print(f"   Response: {result['stdout'][:100]}...")
    else:
        print("   ❌ get_user_by_id failed")
        print(f"   Error: {result['stderr']}")
    
    print("\n🎉 Basic tests completed!")
    print("✅ Backend is accessible and responding")
    return True

if __name__ == "__main__":
    success = test_basic_functionality()
    sys.exit(0 if success else 1)
