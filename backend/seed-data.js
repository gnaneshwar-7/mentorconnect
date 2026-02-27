// Seed script to populate mentors in the database
require("dotenv").config();
const mongoose = require("mongoose");
const Mentor = require("./models/Mentor");

const sampleMentors = [
    {
        name: "Dr. Ananya Rao",
        domain: "Data Science & ML",
        mode: "Online",
        experience: 6,
        skills: ["Python", "ML", "Deep Learning", "Research Papers"],
        rating: 4.9
    },
    {
        name: "Rahul Verma",
        domain: "Web Development",
        mode: "Hybrid",
        experience: 4,
        skills: ["React", "Node.js", "MongoDB", "REST APIs"],
        rating: 4.7
    },
    {
        name: "Prof. K. Meenakshi",
        domain: "Core CS / DSA",
        mode: "Offline",
        experience: 10,
        skills: ["DSA", "C++", "Competitive Programming", "GATE"],
        rating: 4.8
    },
    {
        name: "Sandeep Kulkarni",
        domain: "Career & Internships",
        mode: "Online",
        experience: 5,
        skills: ["Resume", "Interviews", "System Design", "Internships"],
        rating: 4.9
    },
    {
        name: "Dr. Nikhita Sharma",
        domain: "Higher Studies / Research",
        mode: "Online",
        experience: 7,
        skills: ["SOP Review", "Research Proposals", "MS Abroad", "Paper Writing"],
        rating: 4.8
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        // Clear existing mentors
        await Mentor.deleteMany({});
        console.log("🗑️  Cleared existing mentors");

        // Insert sample mentors
        const result = await Mentor.insertMany(sampleMentors);
        console.log(`✅ Inserted ${result.length} mentors successfully!`);

        // Display inserted mentors
        console.log("\n📋 Mentors in database:");
        result.forEach((mentor, index) => {
            console.log(`${index + 1}. ${mentor.name} - ${mentor.domain} (${mentor.experience}+ yrs)`);
        });

        mongoose.connection.close();
        console.log("\n✅ Database seeding completed!");
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

seedDatabase();
