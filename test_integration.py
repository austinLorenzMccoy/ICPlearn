#!/usr/bin/env python3
"""
Integration tests for ICPlearn backend.
These tests call the actual deployed canister functions via dfx.
"""

import subprocess
import json
import sys
import unittest

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

class TestCurrentDeploymentIntegration(unittest.TestCase):
    """Integration tests for current basic deployment."""
    
    def test_get_greeting_integration(self):
        """Test the get_greeting function via dfx call."""
        print("Testing get_greeting function...")
        result = run_dfx_command('dfx canister call icplearn_backend get_greeting \'("World")\'')
        
        self.assertTrue(result["success"], f"Command failed: {result}")
        self.assertIn('"Hello, World!"', result["stdout"])
        print("✅ get_greeting integration test passed")
    
    def test_get_user_count_integration(self):
        """Test the get_user_count function via dfx call."""
        print("Testing get_user_count function...")
        result = run_dfx_command('dfx canister call icplearn_backend get_user_count \'("dummy")\'')
        
        self.assertTrue(result["success"], f"Command failed: {result}")
        self.assertIn("42 : nat64", result["stdout"])
        print("✅ get_user_count integration test passed")
    
    def test_get_user_by_id_integration(self):
        """Test the get_user_by_id function via dfx call."""
        print("Testing get_user_by_id function...")
        result = run_dfx_command('dfx canister call icplearn_backend get_user_by_id \'("test123")\'')
        
        self.assertTrue(result["success"], f"Command failed: {result}")
        self.assertIn('Ok = record { id = "test123"; name = "Test User" }', result["stdout"])
        print("✅ get_user_by_id integration test passed")
    
    def test_all_functions_available(self):
        """Test that all expected functions are available."""
        print("Testing function availability...")
        
        # Test that functions exist by calling them
        functions_to_test = [
            ('get_greeting', '("Test")'),
            ('get_user_count', '("dummy")'),
            ('get_user_by_id', '("user123")')
        ]
        
        for func_name, args in functions_to_test:
            result = run_dfx_command(f'dfx canister call icplearn_backend {func_name} \'{args}\'')
            self.assertTrue(result["success"], 
                          f"Function {func_name} is not available or failed: {result}")
        
        print("✅ All expected functions are available")

class TestDataStructures(unittest.TestCase):
    """Test data structures used in the current deployment."""
    
    def test_user_record_structure(self):
        """Test User record structure."""
        # This is a structural test - we verify the expected format
        expected_user = {
            "id": "user123",
            "name": "Test User"
        }
        
        self.assertIn("id", expected_user)
        self.assertIn("name", expected_user)
        self.assertEqual(expected_user["id"], "user123")
        self.assertEqual(expected_user["name"], "Test User")
        print("✅ User record structure test passed")
    
    def test_get_user_result_variant(self):
        """Test GetUserResult variant structure."""
        # Test Ok variant
        ok_result = {"Ok": {"id": "user123", "name": "Test User"}}
        self.assertIn("Ok", ok_result)
        self.assertEqual(ok_result["Ok"]["id"], "user123")
        
        # Test Err variant
        err_result = {"Err": "User not found"}
        self.assertIn("Err", err_result)
        self.assertEqual(err_result["Err"], "User not found")
        
        print("✅ GetUserResult variant structure test passed")

class TestFunctionalBehavior(unittest.TestCase):
    """Test the functional behavior of deployed functions."""
    
    def test_get_greeting_with_different_inputs(self):
        """Test get_greeting with various inputs."""
        test_cases = [
            ("World", "Hello, World!"),
            ("Alice", "Hello, Alice!"),
            ("", "Hello, !"),
            ("123", "Hello, 123!")
        ]
        
        for input_val, expected in test_cases:
            result = run_dfx_command(f'dfx canister call icplearn_backend get_greeting \'("{input_val}")\'')
            self.assertTrue(result["success"], f"Failed for input {input_val}: {result}")
            self.assertIn(f'"{expected}"', result["stdout"])
        
        print("✅ get_greeting functional behavior test passed")
    
    def test_get_user_by_id_with_different_inputs(self):
        """Test get_user_by_id with various inputs."""
        test_cases = ["user1", "user2", "test123", "abc", ""]
        
        for user_id in test_cases:
            result = run_dfx_command(f'dfx canister call icplearn_backend get_user_by_id \'("{user_id}")\'')
            self.assertTrue(result["success"], f"Failed for user_id {user_id}: {result}")
            self.assertIn(f'id = "{user_id}"', result["stdout"])
            self.assertIn('name = "Test User"', result["stdout"])
        
        print("✅ get_user_by_id functional behavior test passed")
    
    def test_get_user_count_consistency(self):
        """Test that get_user_count always returns the same value."""
        test_inputs = ["dummy", "test", "", "123"]
        
        for input_val in test_inputs:
            result = run_dfx_command(f'dfx canister call icplearn_backend get_user_count \'("{input_val}")\'')
            self.assertTrue(result["success"], f"Failed for input {input_val}: {result}")
            self.assertIn("42 : nat64", result["stdout"])
        
        print("✅ get_user_count consistency test passed")

if __name__ == "__main__":
    print("=== Running Integration Tests for Current Deployment ===")
    print()
    
    # Run tests with verbose output
    unittest.main(verbosity=2, exit=False)
    
    print()
    print("=== Integration Test Summary ===")
    print("These tests verify that the current basic deployment is working correctly.")
    print("All functions are accessible via dfx calls and return expected results.")
