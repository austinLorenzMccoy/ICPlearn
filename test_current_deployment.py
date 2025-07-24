#!/usr/bin/env python3
"""
Test script for the current basic deployment
Tests the functions that are actually deployed and working
"""

import subprocess
import json
import sys

def run_dfx_command(command):
    """Run a dfx command and return the result"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
        return {
            "success": result.returncode == 0,
            "stdout": result.stdout.strip(),
            "stderr": result.stderr.strip(),
            "returncode": result.returncode
        }
    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "stdout": "",
            "stderr": "Command timed out",
            "returncode": -1
        }

def test_get_greeting():
    """Test the get_greeting function"""
    print("Testing get_greeting function...")
    result = run_dfx_command('dfx canister call icplearn_backend get_greeting \'("World")\'')
    
    if result["success"] and '"Hello, World!"' in result["stdout"]:
        print("✅ get_greeting test passed")
        return True
    else:
        print(f"❌ get_greeting test failed: {result}")
        return False

def test_get_user_count():
    """Test the get_user_count function"""
    print("Testing get_user_count function...")
    result = run_dfx_command('dfx canister call icplearn_backend get_user_count \'("dummy")\'')
    
    if result["success"] and "42 : nat64" in result["stdout"]:
        print("✅ get_user_count test passed")
        return True
    else:
        print(f"❌ get_user_count test failed: {result}")
        return False

def test_get_user_by_id():
    """Test the get_user_by_id function"""
    print("Testing get_user_by_id function...")
    result = run_dfx_command('dfx canister call icplearn_backend get_user_by_id \'("test123")\'')
    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'username = "Test User"' in result["stdout"] and 'email = "test@example.com"' in result["stdout"]:
        print("✅ get_user_by_id test passed")
        return True
    else:
        print(f"❌ get_user_by_id test failed: {result}")
        return False

def main():
    """Run all tests for the current deployment"""
    print("=== Testing Current Basic Deployment ===")
    print()
    
    tests = [
        test_get_greeting,
        test_get_user_count,
        test_get_user_by_id
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=== Test Summary ===")
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Current deployment is working correctly.")
        return 0
    else:
        print("❌ Some tests failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
