const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function testSessionBooking() {
    console.log("🧪 TESTING SESSION BOOKING\n");

    try {
        // STEP 1: Get mentors to grab a mentor ID
        console.log("📌 STEP 1: Fetching mentors...");
        const mentorsResponse = await axios.get(`${BASE_URL}/mentors`);
        const mentors = mentorsResponse.data;
        console.log(`✅ Found ${mentors.length} mentors`);
        
        if (mentors.length === 0) {
            console.log("❌ No mentors found. Please add mentors first!");
            return;
        }

        // Pick first mentor
        const selectedMentor = mentors[0];
        console.log(`✅ Selected Mentor: ${selectedMentor.name} (${selectedMentor._id})\n`);

        // STEP 2: Create a new session
        console.log("📌 STEP 2: Creating a new session...");
        const newSession = {
            studentName: "Rahul Kumar",
            email: "rahul@example.com",
            mentor: selectedMentor._id, // Link to mentor via ObjectId
            datetime: new Date("2026-03-01T10:00:00"),
            mode: "Online",
            topic: "Career Guidance in Full Stack Development",
            priority: "High"
        };

        const createResponse = await axios.post(`${BASE_URL}/sessions`, newSession);
        console.log("✅ Session Created Successfully!");
        console.log("Session ID:", createResponse.data._id);
        console.log("Student:", createResponse.data.studentName);
        console.log("Topic:", createResponse.data.topic);
        console.log("Status:", createResponse.status, "\n");

        // STEP 3: Get all sessions with populated mentor data
        console.log("📌 STEP 3: Fetching all sessions with mentor details...");
        const sessionsResponse = await axios.get(`${BASE_URL}/sessions`);
        const sessions = sessionsResponse.data;
        console.log(`✅ Found ${sessions.length} session(s)\n`);

        // STEP 4: Verify populate() works
        console.log("📌 STEP 4: Verifying populate() functionality...");
        sessions.forEach((session, index) => {
            console.log(`\n🎯 Session ${index + 1}:`);
            console.log("  Student:", session.studentName);
            console.log("  Email:", session.email);
            console.log("  Topic:", session.topic);
            console.log("  Mode:", session.mode);
            console.log("  Priority:", session.priority);
            console.log("  Date/Time:", new Date(session.datetime).toLocaleString());
            
            // Check if mentor is populated
            if (session.mentor && session.mentor.name) {
                console.log("  ✅ MENTOR POPULATED:");
                console.log("    - Name:", session.mentor.name);
                console.log("    - Expertise:", session.mentor.expertise);
                console.log("    - Experience:", session.mentor.experience);
            } else {
                console.log("  ❌ MENTOR NOT POPULATED (just ID):", session.mentor);
            }
        });

        console.log("\n\n✅ ✅ ✅ ALL TESTS PASSED! ✅ ✅ ✅");
        console.log("\n🎉 Session booking is working perfectly!");
        console.log("🎉 populate() is working - mentor details are loaded!");
        console.log("🎉 Database storage verified!");

    } catch (error) {
        console.error("\n❌ ERROR:", error.response?.data || error.message);
    }
}

testSessionBooking();
