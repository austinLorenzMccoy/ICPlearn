#!/usr/bin/env python3
"""
Run all tests for the ICPlearn backend implementation.
This script runs all test files in the current directory.
"""

import os
import sys
import subprocess
import time

def print_header(text):
    """Print a header with the given text."""
    print("\n" + "=" * 80)
    print(f" {text} ".center(80, "="))
    print("=" * 80 + "\n")

def run_test(test_file):
    """Run a test file and return the result."""
    print(f"Running {test_file}...")
    
    start_time = time.time()
    result = subprocess.run(["python", test_file], capture_output=True, text=True)
    end_time = time.time()
    
    print(f"Completed in {end_time - start_time:.2f} seconds")
    
    if result.returncode == 0:
        print("✅ Test passed")
    else:
        print("❌ Test failed")
    
    print("\nOutput:")
    print(result.stdout)
    
    if result.stderr:
        print("\nErrors:")
        print(result.stderr)
    
    return result.returncode == 0

def main():
    """Main function to run all tests."""
    print_header("ICPlearn Backend Tests")
    
    # Get all test files
    test_files = [f for f in os.listdir(".") if f.startswith("test_") and f.endswith(".py")]
    
    if not test_files:
        print("No test files found.")
        return
    
    print(f"Found {len(test_files)} test files: {', '.join(test_files)}")
    
    # Run each test file
    results = {}
    for test_file in test_files:
        print_header(f"Running {test_file}")
        results[test_file] = run_test(test_file)
    
    # Print summary
    print_header("Test Summary")
    
    passed = sum(1 for result in results.values() if result)
    failed = len(results) - passed
    
    print(f"Total tests: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed > 0:
        print("\nFailed tests:")
        for test_file, result in results.items():
            if not result:
                print(f"- {test_file}")
    
    # Return non-zero exit code if any test failed
    return 1 if failed > 0 else 0

if __name__ == "__main__":
    sys.exit(main())
