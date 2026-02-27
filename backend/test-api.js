// Test script to verify MentorConnect APIs
const baseURL = "http://localhost:5000";

// Test 1: Get all mentors
async function testGetMentors() {
    console.log("\n🔍 Testing GET /api/mentors...");
    try {
        const response = await fetch(`${baseURL}/api/mentors`);
        const data = await response.json();
        console.log("✅ Mentors fetched:", data.length, "mentors");
        console.log("First mentor:", data[0]?.name || "None");
        return data;
    } catch (error) {
        console.error("❌ Error:", error.message);
        return [];
    }
}

// Test 2: Create a new session
async function testCreateSession(mentorId) {
    console.log("\n📝 Testing POST /api/sessions...");
    const sessionData = {
        studentName: "Test Student",
        email: "test@sruniv.edu",
        mentor: mentorId,
        datetime: new Date(Date.now() + 86400000), // Tomorrow
        mode: "Online",
        topic: "Career guidance and project discussion",
        priority: "High"
    };

    try {
        const response = await fetch(`${baseURL}/api/sessions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sessionData)
        });
        const data = await response.json();
        console.log("✅ Session created successfully!");
        console.log("Session ID:", data._id);
        console.log("Student:", data.studentName);
        console.log("Topic:", data.topic);
        return data;
    } catch (error) {
        console.error("❌ Error:", error.message);
        return null;
    }
}

// Test 3: Get all sessions with populated mentor data
async function testGetSessions() {
    console.log("\n📋 Testing GET /api/sessions...");
    try {
        const response = await fetch(`${baseURL}/api/sessions`);
        const data = await response.json();
        console.log("✅ Sessions fetched:", data.length, "sessions");
        if (data.length > 0) {
            const session = data[0];
            console.log("First session:");
            console.log("  Student:", session.studentName);
            console.log("  Mentor:", session.mentor?.name || "Not populated");
            console.log("  Topic:", session.topic);
        }
        return data;
    } catch (error) {
        console.error("❌ Error:", error.message);
        return [];
    }
}

// Run all tests
async function runTests() {
    console.log("🚀 Starting MentorConnect API Tests...\n");
    console.log("=" .repeat(50));
    
    // Test 1: Get mentors
    const mentors = await testGetMentors();
    
    if (mentors.length === 0) {
        console.log("\n⚠️  No mentors found. Please add mentors first.");
        return;
    }
    
    // Test 2: Create session with first mentor
    const firstMentorId = mentors[0]._id;
    await testCreateSession(firstMentorId);
    
    // Test 3: Get all sessions
    await testGetSessions();
    
    console.log("\n" + "=".repeat(50));
    console.log("✅ All tests completed!");
}

// Run tests
runTests();
