#!/usr/bin/env python3
"""
Test script for User Management functionality
Tests the user registration and management functions
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

def test_register_user():
    """Test user registration function"""
    print("Testing register_user function...")
    
    # Test with basic user data
    result = run_dfx_command('dfx canister call icplearn_backend register_user \'(record { username = "alice_test"; email = "alice@test.com"; btc_address = null })\'')
    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'username = "alice_test"' in result["stdout"] and 'email = "alice@test.com"' in result["stdout"]:
        print("✅ register_user basic test passed")
        return True
    else:
        print(f"❌ register_user basic test failed: {result}")
        return False

def test_register_user_with_btc():
    """Test user registration with BTC address"""
    print("Testing register_user with BTC address...")
    
    # Test with BTC address
    result = run_dfx_command('dfx canister call icplearn_backend register_user \'(record { username = "bob_btc"; email = "bob@btc.com"; btc_address = opt "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" })\'')
    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'username = "bob_btc"' in result["stdout"] and 'btc_address = opt "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"' in result["stdout"]:
        print("✅ register_user with BTC address test passed")
        return True
    else:
        print(f"❌ register_user with BTC address test failed: {result}")
        return False

def test_user_data_structure():
    """Test that user data structure is complete"""
    print("Testing user data structure completeness...")
    
    result = run_dfx_command('dfx canister call icplearn_backend register_user \'(record { username = "structure_test"; email = "structure@test.com"; btc_address = null })\'')
    
    if result["success"]:
        stdout = result["stdout"]
        required_fields = [
            'id = principal',
            'username = "structure_test"',
            'email = "structure@test.com"',
            'created_at =',
            'updated_at =',
            'is_active = true',
            'btc_address = null'
        ]
        
        all_fields_present = all(field in stdout for field in required_fields)
        
        if all_fields_present:
            print("✅ user data structure test passed")
            return True
        else:
            missing_fields = [field for field in required_fields if field not in stdout]
            print(f"❌ user data structure test failed - missing fields: {missing_fields}")
            return False
    else:
        print(f"❌ user data structure test failed: {result}")
        return False

def test_timestamp_generation():
    """Test that timestamps are generated correctly"""
    print("Testing timestamp generation...")
    
    # Register two users with a small delay
    result1 = run_dfx_command('dfx canister call icplearn_backend register_user \'(record { username = "time_test1"; email = "time1@test.com"; btc_address = null })\'')
    
    import time
    time.sleep(1)  # Small delay
    
    result2 = run_dfx_command('dfx canister call icplearn_backend register_user \'(record { username = "time_test2"; email = "time2@test.com"; btc_address = null })\'')
    
    if result1["success"] and result2["success"]:
        # Extract timestamps (this is a basic check)
        if 'created_at =' in result1["stdout"] and 'created_at =' in result2["stdout"]:
            print("✅ timestamp generation test passed")
            return True
        else:
            print("❌ timestamp generation test failed - no timestamps found")
            return False
    else:
        print(f"❌ timestamp generation test failed: result1={result1}, result2={result2}")
        return False

def test_update_user():
    """Test user update function"""
    print("Testing update_user function...")
    
    # Test with all fields
    result = run_dfx_command('dfx canister call icplearn_backend update_user \'(record { username = opt "updated_alice"; email = opt "alice_updated@test.com"; btc_address = opt "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; is_active = opt true })\'')    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'username = "updated_alice"' in result["stdout"]:
        print("✅ update_user full update test passed")
        return True
    else:
        print(f"❌ update_user full update test failed: {result}")
        return False

def test_update_user_partial():
    """Test user update with partial data"""
    print("Testing update_user with partial data...")
    
    # Test with some null values
    result = run_dfx_command('dfx canister call icplearn_backend update_user \'(record { username = null; email = opt "partial@update.com"; btc_address = null; is_active = null })\'')    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'email = "partial@update.com"' in result["stdout"] and 'username = "Updated User"' in result["stdout"]:
        print("✅ update_user partial update test passed")
        return True
    else:
        print(f"❌ update_user partial update test failed: {result}")
        return False

def test_list_users():
    """Test list users function"""
    print("Testing list_users function...")
    
    # Test basic listing
    result = run_dfx_command('dfx canister call icplearn_backend list_users \'(record { skip = 0 : nat64; limit = 3 : nat64 })\'')    
    if result["success"] and 'Ok = record {' in result["stdout"] and 'total = 5 : nat64' in result["stdout"] and 'items = vec {' in result["stdout"]:
        print("✅ list_users basic test passed")
        return True
    else:
        print(f"❌ list_users basic test failed: {result}")
        return False

def test_list_users_pagination():
    """Test list users pagination"""
    print("Testing list_users pagination...")
    
    # Test pagination
    result = run_dfx_command('dfx canister call icplearn_backend list_users \'(record { skip = 2 : nat64; limit = 2 : nat64 })\'')    
    if result["success"] and 'skip = 2 : nat64' in result["stdout"] and 'limit = 2 : nat64' in result["stdout"] and 'User_2' in result["stdout"]:
        print("✅ list_users pagination test passed")
        return True
    else:
        print(f"❌ list_users pagination test failed: {result}")
        return False

def test_existing_functions_still_work():
    """Test that existing functions still work after adding user management"""
    print("Testing existing functions still work...")
    
    tests = [
        ('get_greeting', '("TestUser")', '"Hello, TestUser!"'),
        ('get_user_count', '("dummy")', '42 : nat64'),
        ('get_user_by_id', '("test123")', 'username = "Test User"')
    ]
    
    all_passed = True
    for func_name, args, expected in tests:
        result = run_dfx_command(f'dfx canister call icplearn_backend {func_name} \'{args}\'')        
        if not (result["success"] and expected in result["stdout"]):
            print(f"❌ {func_name} test failed: {result}")
            all_passed = False
    
    if all_passed:
        print("✅ existing functions compatibility test passed")
        return True
    else:
        return False

def main():
    """Run all user management tests"""
    print("=== Testing User Management Functionality ===")
    print()
    
    tests = [
        test_register_user,
        test_register_user_with_btc,
        test_user_data_structure,
        test_timestamp_generation,
        test_update_user,
        test_update_user_partial,
        test_list_users,
        test_list_users_pagination,
        test_existing_functions_still_work
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
        print("🎉 All user management tests passed!")
        return 0
    else:
        print("❌ Some tests failed.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
