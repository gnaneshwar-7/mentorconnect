const express = require("express");
const router = express.Router();
const Mentor = require("../models/Mentor");

// GET all mentors
router.get("/", async (req, res) => {
    try {
        const mentors = await Mentor.find().sort({ createdAt: -1 });
        res.json(mentors);
    } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch mentors", 
            error: error.message 
        });
    }
});

// GET single mentor by ID
router.get("/:id", async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        
        if (!mentor) {
            return res.status(404).json({ 
                success: false,
                message: "Mentor not found" 
            });
        }
        
        res.json(mentor);
    } catch (error) {
        console.error("Error fetching mentor:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch mentor", 
            error: error.message 
        });
    }
});

// POST new mentor
router.post("/", async (req, res) => {
    try {
        const mentor = await Mentor.create(req.body);
        res.status(201).json({
            success: true,
            message: "Mentor created successfully",
            data: mentor
        });
    } catch (error) {
        console.error("Error creating mentor:", error);
        
        // Handle duplicate key error (unique index violation)
        if (error.code === 11000) {
            return res.status(409).json({ 
                success: false,
                message: "A mentor with this name and domain already exists",
                error: "Duplicate entry" 
            });
        }
        
        // Handle validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false,
                message: "Validation failed", 
                errors: messages 
            });
        }
        
        res.status(400).json({ 
            success: false,
            message: "Failed to create mentor", 
            error: error.message 
        });
    }
});

// PUT/UPDATE mentor
router.put("/:id", async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, // Return updated document
                runValidators: true // Run validation on update
            }
        );
        
        if (!mentor) {
            return res.status(404).json({ 
                success: false,
                message: "Mentor not found" 
            });
        }
        
        res.json({
            success: true,
            message: "Mentor updated successfully",
            data: mentor
        });
    } catch (error) {
        console.error("Error updating mentor:", error);
        
        if (error.code === 11000) {
            return res.status(409).json({ 
                success: false,
                message: "A mentor with this name and domain already exists",
                error: "Duplicate entry" 
            });
        }
        
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                success: false,
                message: "Validation failed", 
                errors: messages 
            });
        }
        
        res.status(400).json({ 
            success: false,
            message: "Failed to update mentor", 
            error: error.message 
        });
    }
});

// DELETE mentor
router.delete("/:id", async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndDelete(req.params.id);
        
        if (!mentor) {
            return res.status(404).json({ 
                success: false,
                message: "Mentor not found" 
            });
        }
        
        res.json({
            success: true,
            message: "Mentor deleted successfully",
            data: mentor
        });
    } catch (error) {
        console.error("Error deleting mentor:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to delete mentor", 
            error: error.message 
        });
    }
});

module.exports = router;