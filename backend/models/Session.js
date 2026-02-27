const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"]
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
        required: [true, "Mentor is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false // Optional - allows sessions without login
    },
    datetime: {
        type: Date,
        required: [true, "Date and time are required"],
        validate: {
            validator: function(v) {
                // Optionally validate that session is not in the past
                // For now, we'll allow past dates for testing
                return v instanceof Date && !isNaN(v);
            },
            message: "Invalid date/time"
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
    topic: {
        type: String,
        required: [true, "Topic is required"],
        trim: true,
        minlength: [5, "Topic must be at least 5 characters"],
        maxlength: [500, "Topic is too long"]
    },
    priority: {
        type: String,
        default: "Medium",
        enum: {
            values: ["Low", "Medium", "High"],
            message: "{VALUE} is not a valid priority"
        }
    },
    status: {
        type: String,
        default: "Scheduled",
        enum: ["Scheduled", "Completed", "Cancelled"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);