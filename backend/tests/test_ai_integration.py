#!/usr/bin/env python3
"""
Comprehensive AI Integration Test for ICPlearn Backend
Tests all AI agent functionality end-to-end
"""

import subprocess
import json
import time

def run_dfx_call(function_name, params):
    """Run a dfx canister call and return the result"""
    cmd = f'dfx canister call icplearn_backend {function_name} \'{params}\''
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd='/Users/a/Documents/ICP/EduStake/icplearn_icp/backend')
        if result.returncode == 0:
            return {"success": True, "output": result.stdout.strip()}
        else:
            return {"success": False, "error": result.stderr.strip()}
    except Exception as e:
        return {"success": False, "error": str(e)}

def test_ai_integration():
    """Run comprehensive AI integration tests"""
    print("🧪 Starting AI Integration Tests for ICPlearn Backend\n")
    
    tests_passed = 0
    tests_total = 0
    
    # Test 1: Create AI Agent
    print("1️⃣ Testing AI Agent Creation...")
    tests_total += 1
    result = run_dfx_call('create_ai_agent', '''(record {
        name = "Python Tutor AI";
        agent_type = "tutor";
        model_type = "llama-3.1-8b";
        capabilities = vec { "python_programming"; "data_structures"; "algorithms" };
        personality = "encouraging and detailed";
        system_prompt = "You are an expert Python tutor who helps students learn programming concepts."
    })''')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Agent created successfully")
        tests_passed += 1
        # Extract agent ID for subsequent tests
        agent_id = "agent_test_python_tutor"  # Use a predictable ID for testing
    else:
        print(f"❌ AI Agent creation failed: {result.get('error', 'Unknown error')}")
        return
    
    # Test 2: List AI Agents
    print("\n2️⃣ Testing AI Agent Listing...")
    tests_total += 1
    result = run_dfx_call('list_ai_agents', '(0 : nat64, 10 : nat64)')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Agents listed successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Agent listing failed: {result.get('error', 'Unknown error')}")
    
    # Test 3: Chat with AI Agent
    print("\n3️⃣ Testing AI Chat Functionality...")
    tests_total += 1
    result = run_dfx_call('chat_with_agent', '''(record {
        agent_id = "agent_tutor_001";
        message = "Explain Python list comprehensions";
        context = opt "Student learning Python basics"
    })''')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Chat working successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Chat failed: {result.get('error', 'Unknown error')}")
    
    # Test 4: Generate Content
    print("\n4️⃣ Testing AI Content Generation...")
    tests_total += 1
    result = run_dfx_call('generate_content', '''(record {
        content_type = "quiz";
        topic = "Python Functions";
        difficulty = "intermediate";
        length = 5 : nat64;
        style = "multiple_choice";
        additional_params = "include code examples"
    })''')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Content generation working successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Content generation failed: {result.get('error', 'Unknown error')}")
    
    # Test 5: Start Tutor Session
    print("\n5️⃣ Testing AI Tutor Session...")
    tests_total += 1
    result = run_dfx_call('start_tutor_session', '''(record {
        agent_id = "agent_tutor_001";
        course_id = opt "python_fundamentals";
        skill_id = opt "functions";
        session_type = "interactive_coding";
        initial_message = "I need help with Python functions and parameters"
    })''')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Tutor session started successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Tutor session failed: {result.get('error', 'Unknown error')}")
    
    # Test 6: Generate Learning Path
    print("\n6️⃣ Testing AI Learning Path Generation...")
    tests_total += 1
    result = run_dfx_call('generate_learning_path', '''(record {
        user_skills = vec { "basic_python"; "variables" };
        learning_goals = vec { "web_development"; "data_science" };
        time_commitment = 15 : nat64;
        preferred_difficulty = "beginner";
        learning_style = "project_based"
    })''')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Learning path generated successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Learning path generation failed: {result.get('error', 'Unknown error')}")
    
    # Test 7: Get Learning Analytics
    print("\n7️⃣ Testing AI Learning Analytics...")
    tests_total += 1
    result = run_dfx_call('get_learning_analytics', '(principal "gqjkp-t6bxh-pljj2-5os6f-kq7mi-ffkvz-sxhyp-waqt3-y7jrw-ljfqj-fae")')
    
    if result["success"] and "Ok" in result["output"]:
        print("✅ AI Learning analytics retrieved successfully")
        tests_passed += 1
    else:
        print(f"❌ AI Learning analytics failed: {result.get('error', 'Unknown error')}")
    
    # Test Results Summary
    print(f"\n🎯 AI Integration Test Results:")
    print(f"   Tests Passed: {tests_passed}/{tests_total}")
    print(f"   Success Rate: {(tests_passed/tests_total)*100:.1f}%")
    
    if tests_passed == tests_total:
        print("\n🎉 All AI integration tests PASSED! ✅")
        print("   ✨ ICPlearn AI backend is fully functional and ready for production!")
        print("   🚀 Frontend team can now integrate with all AI features")
    else:
        print(f"\n⚠️  {tests_total - tests_passed} tests FAILED ❌")
        print("   🔧 Please check the backend implementation")
    
    return tests_passed == tests_total

if __name__ == "__main__":
    test_ai_integration()
