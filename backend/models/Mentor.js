const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Mentor name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true, // allows multiple null values
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },
    domain: {
        type: String,
        required: [true, "Domain is required"],
        enum: {
            values: ["Web Development", "Data Science & ML", "Core CS / DSA", "Higher Studies / Research", "Career & Internships", "Cybersecurity", "Mobile Development", "Cloud Computing", "Other"],
            message: "{VALUE} is not a valid domain"
        }
    },
    mode: {
        type: String,
        required: [true, "Mode is required"],
        enum: {
            values: ["Online", "Offline", "Hybrid"],
            message: "{VALUE} is not a valid mode"
        }
    },
    experience: {
        type: Number,
        required: [true, "Experience is required"],
        min: [0, "Experience cannot be negative"],
        max: [50, "Experience seems too high"]
    },
    skills: {
        type: [String],
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: "At least one skill is required"
        }
    },
    rating: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"]
    }
}, { timestamps: true });

// Create a compound unique index on name + domain to prevent exact duplicates
mentorSchema.index({ name: 1, domain: 1 }, { unique: true });

module.exports = mongoose.model("Mentor", mentorSchema);