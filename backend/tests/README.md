# 🧪 ICPlearn Backend Test Suite

[![Tests](https://img.shields.io/badge/Tests-23%2F23%20Passing-brightgreen)](./test_all_services.py)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-success)](./test_integration.py)
[![Integration](https://img.shields.io/badge/Integration-Real%20Canister-blue)](./test_current_deployment.py)

> 🎯 **Comprehensive testing suite for ICPlearn backend services**

This directory contains all test files for the ICPlearn backend, including unit tests, integration tests, and deployment verification tests.

## 📁 Test Structure

```
tests/
├── 📄 test_all_services.py         # Main comprehensive test suite (23 tests)
├── 📄 test_integration.py          # Real-time canister integration tests
├── 📄 test_current_deployment.py   # Deployment verification tests
├── 📄 test_user_management.py      # User service specific tests
├── 📄 test_gamification.py         # Gamification features tests
├── 📄 test_bitcoin_reward.py       # Bitcoin reward system tests
├── 📄 test_services.py             # Mock-based service tests
├── 📄 test_stable_storage.py       # Persistent storage tests
├── 📄 test_api.py                  # API endpoint tests
├── 📄 test_minimal.py              # Minimal functionality tests
├── 📄 run_all_tests.py             # Test runner script
├── 📄 run_tests.sh                 # Shell script test runner
└── 📄 README.md                    # This file
```

## 🚀 Quick Test Execution

### **Run All Tests (Recommended)**
```bash
# Navigate to backend directory
cd backend

# Run comprehensive test suite
python tests/test_all_services.py
```

### **Run Specific Test Categories**
```bash
# Integration tests (requires deployed canister)
python tests/test_integration.py

# User management tests
python tests/test_user_management.py

# Gamification tests
python tests/test_gamification.py

# Bitcoin reward tests
python tests/test_bitcoin_reward.py
```

### **Run Test Runner Scripts**
```bash
# Python test runner
python tests/run_all_tests.py

# Shell script runner
./tests/run_tests.sh
```

## 📊 Test Coverage

### **Service Coverage (23/23 Tests)**

| Service | Tests | Status | Coverage |
|---------|-------|--------|----------|
| **User Management** | 4 tests | ✅ Passing | 100% |
| **Assessment System** | 3 tests | ✅ Passing | 100% |
| **Course Management** | 4 tests | ✅ Passing | 100% |
| **Skill Tracking** | 4 tests | ✅ Passing | 100% |
| **AI Integration** | 3 tests | ✅ Passing | 100% |
| **Bitcoin Rewards** | 3 tests | ✅ Passing | 100% |
| **Legacy Functions** | 2 tests | ✅ Passing | 100% |

### **Test Types**

#### **1. Unit Tests** (`test_all_services.py`)
- ✅ **23 comprehensive function tests**
- ✅ **Parameter validation**
- ✅ **Response format verification**
- ✅ **Error handling validation**
- ✅ **Data structure compliance**

#### **2. Integration Tests** (`test_integration.py`)
- ✅ **Real canister deployment testing**
- ✅ **Live dfx command execution**
- ✅ **End-to-end workflow validation**
- ✅ **Persistent storage verification**

#### **3. Service-Specific Tests**
- ✅ **User Management**: Registration, updates, retrieval
- ✅ **Gamification**: Combat arena, battles, questions
- ✅ **Bitcoin Rewards**: Creation, processing, validation
- ✅ **Storage**: StableBTreeMap functionality

## 🔧 Test Requirements

### **Prerequisites**
- Python 3.11+
- Internet Computer SDK (`dfx`)
- Local IC replica running (`dfx start`)
- Backend canister deployed (`dfx deploy`)

### **Environment Setup**
```bash
# Ensure dfx is running
dfx start --background

# Deploy backend canister
dfx deploy icplearn_backend

# Verify canister is accessible
dfx canister call icplearn_backend get_greeting
```

## 📋 Test Descriptions

### **Primary Test Files**

#### **`test_all_services.py`** - Main Test Suite
- **Purpose**: Comprehensive testing of all 23 backend functions
- **Coverage**: All services with parameter validation
- **Execution Time**: ~30 seconds
- **Dependencies**: None (uses mock data)

#### **`test_integration.py`** - Integration Testing
- **Purpose**: Real-time canister testing with dfx calls
- **Coverage**: Core functions with live deployment
- **Execution Time**: ~60 seconds
- **Dependencies**: Deployed canister required

#### **`test_current_deployment.py`** - Deployment Verification
- **Purpose**: Verify current deployment status and functionality
- **Coverage**: Essential functions and canister health
- **Execution Time**: ~20 seconds
- **Dependencies**: Active canister deployment

### **Specialized Test Files**

#### **`test_user_management.py`** - User Service Testing
- **Focus**: User registration, updates, retrieval, listing
- **Features**: Persistent storage validation, pagination testing
- **Data**: Real user data with BTC addresses

#### **`test_gamification.py`** - Gamification Testing
- **Focus**: Combat arena, battles, questions, leaderboards
- **Features**: Game mechanics, scoring, battle logic
- **Data**: Mock battle scenarios and player interactions

#### **`test_bitcoin_reward.py`** - Reward System Testing
- **Focus**: Bitcoin reward creation, processing, distribution
- **Features**: Reward calculation, status tracking, user rewards
- **Data**: Mock Bitcoin transactions and reward scenarios

## 🎯 Test Execution Examples

### **Successful Test Output**
```bash
$ python tests/test_all_services.py

🧪 ICPlearn Backend Test Suite
==============================

✅ User Management Tests (4/4)
   ✓ register_user - User registration working
   ✓ update_user - User updates working  
   ✓ get_user_by_id - User retrieval working
   ✓ list_users - User listing working

✅ Assessment Tests (3/3)
   ✓ get_assessment_by_id - Assessment retrieval working
   ✓ list_assessments - Assessment listing working
   ✓ submit_assessment - Assessment submission working

... (additional test results)

🎉 All 23 tests passed successfully!
Backend is fully functional and ready for production.
```

### **Integration Test Output**
```bash
$ python tests/test_integration.py

🔗 ICPlearn Integration Tests
============================

Testing deployed canister: uxrrr-q7777-77774-qaaaq-cai

✅ get_greeting: "Hello from ICPlearn!"
✅ get_user_count: 3 users registered
✅ get_user_by_id: User data retrieved successfully
✅ register_user: New user registered with persistent storage

🎉 Integration tests completed successfully!
Canister is operational and responding correctly.
```

## 🐛 Troubleshooting

### **Common Issues**

#### **1. Canister Not Found**
```bash
Error: Cannot find canister id
```
**Solution**: Deploy the canister first
```bash
dfx deploy icplearn_backend
```

#### **2. DFX Not Running**
```bash
Error: Connection refused
```
**Solution**: Start the local replica
```bash
dfx start --background
```

#### **3. Import Errors**
```bash
ModuleNotFoundError: No module named 'kybra'
```
**Solution**: Install Kybra SDK
```bash
pip install kybra
```

### **Test Debugging**

#### **Verbose Test Output**
```bash
# Run tests with detailed output
python tests/test_all_services.py --verbose

# Run specific test with debugging
python -m pytest tests/test_user_management.py -v
```

#### **Check Canister Status**
```bash
# Verify canister is running
dfx canister status icplearn_backend

# Check canister logs
dfx canister logs icplearn_backend
```

## 📈 Test Performance

### **Execution Times**
- **Unit Tests**: ~30 seconds (all 23 tests)
- **Integration Tests**: ~60 seconds (with dfx calls)
- **Service Tests**: ~10-20 seconds each
- **Full Test Suite**: ~2-3 minutes total

### **Resource Usage**
- **Memory**: Minimal (<100MB)
- **CPU**: Low impact during execution
- **Network**: Local calls only (no external dependencies)

## 🔄 Continuous Testing

### **Automated Testing**
```bash
# Watch mode for development
while true; do
  python tests/test_all_services.py
  sleep 30
done
```

### **Pre-Deployment Testing**
```bash
# Run before any deployment
./tests/run_tests.sh && echo "✅ Ready for deployment"
```

## 🎯 Test Development Guidelines

### **Adding New Tests**
1. **Follow Naming Convention**: `test_[service_name].py`
2. **Include Documentation**: Clear test descriptions
3. **Mock External Dependencies**: Use mock data when possible
4. **Validate All Scenarios**: Success, failure, edge cases
5. **Update Test Count**: Maintain accurate test statistics

### **Test Structure Template**
```python
def test_new_function():
    """Test description and purpose"""
    # Arrange
    test_data = {...}
    
    # Act
    result = function_call(test_data)
    
    # Assert
    assert result is not None
    assert "expected_field" in result
    
    print("✅ test_new_function - Description")
```

---

**Test Suite Status**: ✅ **ALL TESTS PASSING (23/23)**  
**Coverage**: ✅ **100% SERVICE COVERAGE**  
**Integration**: ✅ **REAL CANISTER TESTING**  
**Maintenance**: ✅ **ACTIVELY MAINTAINED**

*Test suite last updated: July 25, 2024*
