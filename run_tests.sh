#!/bin/bash
# Script to run all tests for the ICPlearn backend on ICP

# Get the canister ID
CANISTER_ID=$(dfx canister id icplearn_backend)
if [ -z "$CANISTER_ID" ]; then
    echo "Error: Could not get canister ID. Make sure dfx is installed and the canister is deployed."
    exit 1
fi

echo "Using canister ID: $CANISTER_ID"

# Make test scripts executable
chmod +x test_api.py
chmod +x test_bitcoin_reward.py

# Run the general API tests
echo "=== Running general API tests ==="
./test_api.py --canister-id $CANISTER_ID

# Run the Bitcoin reward tests
echo "=== Running Bitcoin reward tests ==="
./test_bitcoin_reward.py --canister-id $CANISTER_ID

echo "All tests completed!"
