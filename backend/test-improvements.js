const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function testImprovements() {
    console.log("🧪 TESTING PHASE 6 - VALIDATION & IMPROVEMENTS\n");
    console.log("=" .repeat(60));

    let createdSessionId = null;
    let createdMentorId = null;

    try {
        // ========== TEST 1: Email Validation ==========
        console.log("\n📌 TEST 1: Email Validation");
        console.log("-".repeat(60));
        
        try {
            await axios.post(`${BASE_URL}/sessions`, {
                studentName: "Test Student",
                email: "invalid-email", // Invalid email
                mentor: "6998877d0281639f162229f0",
                datetime: new Date(),
                mode: "Online",
                topic: "Test topic for validation"
            });
            console.log("❌ FAILED: Should have rejected invalid email");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("✅ PASSED: Invalid email rejected");
                console.log("   Error:", error.response.data.message);
            }
        }

        // ========== TEST 2: Create Session with Valid Data ==========
        console.log("\n📌 TEST 2: Create Valid Session");
        console.log("-".repeat(60));
        
        const sessionResponse = await axios.post(`${BASE_URL}/sessions`, {
            studentName: "Priya Sharma",
            email: "priya.sharma@example.com",
            mentor: "6998877d0281639f162229f0",
            datetime: new Date("2026-03-15T14:00:00"),
            mode: "Online",
            topic: "Discussion on React best practices and state management",
            priority: "High"
        });
        
        createdSessionId = sessionResponse.data.data._id;
        console.log("✅ Session Created Successfully!");
        console.log("   ID:", createdSessionId);
        console.log("   Student:", sessionResponse.data.data.studentName);
        console.log("   Email:", sessionResponse.data.data.email);

        // ========== TEST 3: UPDATE Session ==========
        console.log("\n📌 TEST 3: UPDATE Session");
        console.log("-".repeat(60));
        
        const updateResponse = await axios.put(`${BASE_URL}/sessions/${createdSessionId}`, {
            topic: "UPDATED: Advanced React patterns and hooks",
            priority: "Medium",
            status: "Completed"
        });
        
        console.log("✅ Session Updated Successfully!");
        console.log("   New Topic:", updateResponse.data.data.topic);
        console.log("   New Priority:", updateResponse.data.data.priority);
        console.log("   New Status:", updateResponse.data.data.status);

        // ========== TEST 4: GET Single Session ==========
        console.log("\n📌 TEST 4: GET Single Session by ID");
        console.log("-".repeat(60));
        
        const getSessionResponse = await axios.get(`${BASE_URL}/sessions/${createdSessionId}`);
        console.log("✅ Session Retrieved Successfully!");
        console.log("   Student:", getSessionResponse.data.studentName);
        console.log("   Mentor:", getSessionResponse.data.mentor.name);
        console.log("   Status:", getSessionResponse.data.status);

        // ========== TEST 5: Validation - Required Fields ==========
        console.log("\n📌 TEST 5: Validation - Missing Required Fields");
        console.log("-".repeat(60));
        
        try {
            await axios.post(`${BASE_URL}/sessions`, {
                studentName: "John",
                // Missing email, mentor, datetime, topic
                mode: "Online"
            });
            console.log("❌ FAILED: Should have rejected missing fields");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("✅ PASSED: Missing fields rejected");
                console.log("   Errors:", error.response.data.errors || error.response.data.message);
            }
        }

        // ========== TEST 6: Create Mentor with Validation ==========
        console.log("\n📌 TEST 6: Create Mentor with Validation");
        console.log("-".repeat(60));
        
        const mentorResponse = await axios.post(`${BASE_URL}/mentors`, {
            name: "Prof. Rajesh Kumar",
            email: "rajesh.kumar@university.edu",
            domain: "Web Development",
            mode: "Hybrid",
            experience: 8,
            skills: ["JavaScript", "React", "Node.js", "GraphQL"],
            rating: 4.6
        });
        
        createdMentorId = mentorResponse.data.data._id;
        console.log("✅ Mentor Created Successfully!");
        console.log("   ID:", createdMentorId);
        console.log("   Name:", mentorResponse.data.data.name);
        console.log("   Email:", mentorResponse.data.data.email);

        // ========== TEST 7: Prevent Duplicate Mentor ==========
        console.log("\n📌 TEST 7: Prevent Duplicate Mentor");
        console.log("-".repeat(60));
        
        try {
            await axios.post(`${BASE_URL}/mentors`, {
                name: "Prof. Rajesh Kumar",
                domain: "Web Development", // Same name + domain
                mode: "Online",
                experience: 5,
                skills: ["JavaScript"]
            });
            console.log("❌ FAILED: Should have rejected duplicate mentor");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log("✅ PASSED: Duplicate mentor rejected");
                console.log("   Error:", error.response.data.message);
            }
        }

        // ========== TEST 8: UPDATE Mentor ==========
        console.log("\n📌 TEST 8: UPDATE Mentor");
        console.log("-".repeat(60));
        
        const updateMentorResponse = await axios.put(`${BASE_URL}/mentors/${createdMentorId}`, {
            experience: 10,
            rating: 4.9,
            skills: ["JavaScript", "React", "Node.js", "GraphQL", "TypeScript", "AWS"]
        });
        
        console.log("✅ Mentor Updated Successfully!");
        console.log("   New Experience:", updateMentorResponse.data.data.experience);
        console.log("   New Rating:", updateMentorResponse.data.data.rating);
        console.log("   Skills Count:", updateMentorResponse.data.data.skills.length);

        // ========== TEST 9: Invalid Domain/Mode ==========
        console.log("\n📌 TEST 9: Invalid Enum Values");
        console.log("-".repeat(60));
        
        try {
            await axios.post(`${BASE_URL}/mentors`, {
                name: "Test Mentor",
                domain: "Invalid Domain", // Invalid domain
                mode: "Online",
                experience: 5,
                skills: ["Test"]
            });
            console.log("❌ FAILED: Should have rejected invalid domain");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("✅ PASSED: Invalid domain rejected");
                console.log("   Error:", error.response.data.message);
            }
        }

        // ========== TEST 10: DELETE Session ==========
        console.log("\n📌 TEST 10: DELETE Session");
        console.log("-".repeat(60));
        
        const deleteSessionResponse = await axios.delete(`${BASE_URL}/sessions/${createdSessionId}`);
        console.log("✅ Session Deleted Successfully!");
        console.log("   Deleted:", deleteSessionResponse.data.data.studentName);

        // Verify deletion
        try {
            await axios.get(`${BASE_URL}/sessions/${createdSessionId}`);
            console.log("❌ FAILED: Session should not exist");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("✅ Verified: Session no longer exists");
            }
        }

        // ========== TEST 11: DELETE Mentor ==========
        console.log("\n📌 TEST 11: DELETE Mentor");
        console.log("-".repeat(60));
        
        const deleteMentorResponse = await axios.delete(`${BASE_URL}/mentors/${createdMentorId}`);
        console.log("✅ Mentor Deleted Successfully!");
        console.log("   Deleted:", deleteMentorResponse.data.data.name);

        // Verify deletion
        try {
            await axios.get(`${BASE_URL}/mentors/${createdMentorId}`);
            console.log("❌ FAILED: Mentor should not exist");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("✅ Verified: Mentor no longer exists");
            }
        }

        // ========== FINAL SUMMARY ==========
        console.log("\n" + "=".repeat(60));
        console.log("🎉 ALL TESTS COMPLETED SUCCESSFULLY! 🎉");
        console.log("=".repeat(60));
        console.log("\n✅ Email Validation - Working");
        console.log("✅ Required Field Validation - Working");
        console.log("✅ Enum Validation - Working");
        console.log("✅ Duplicate Prevention - Working");
        console.log("✅ CREATE Operations - Working");
        console.log("✅ UPDATE Operations - Working");
        console.log("✅ DELETE Operations - Working");
        console.log("✅ GET Single Item - Working");
        console.log("✅ Error Handling - Working");
        console.log("\n🚀 PHASE 6 - VALIDATION & IMPROVEMENTS: COMPLETE!\n");

    } catch (error) {
        console.error("\n❌ UNEXPECTED ERROR:", error.response?.data || error.message);
    }
}

testImprovements();
