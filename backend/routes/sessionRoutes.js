const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const { optionalAuth } = require("../middleware/auth");

// GET all sessions
router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find().populate("mentor");
        res.json(sessions);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch sessions", 
            error: error.message 
        });
    }
});

// GET single session by ID
router.get("/:id", async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate("mentor");
        
        if (!session) {
            return res.status(404).json({ 
                success: false,
                message: "Session not found" 
            });
        }
        
        res.json(session);
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch session", 
            error: error.message 
        });
    }
});

// POST new session
router.post("/", optionalAuth, async (req, res) => {
    try {
        // If user is authenticated, attach their ID to the session
        const sessionData = {
            ...req.body,
            user: req.user ? req.user._id : undefined
        };

        const session = await Session.create(sessionData);
        const populatedSession = await Session.findById(session._id).populate("mentor");
        
        res.status(201).json({
            success: true,
            message: "Session created successfully",
            data: populatedSession
        });
    } catch (error) {
        console.error("Error creating session:", error);
        
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
            message: "Failed to create session", 
            error: error.message 
        });
    }
});

// PUT/UPDATE session
router.put("/:id", async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true, // Return updated document
                runValidators: true // Run validation on update
            }
        ).populate("mentor");
        
        if (!session) {
            return res.status(404).json({ 
                success: false,
                message: "Session not found" 
            });
        }
        
        res.json({
            success: true,
            message: "Session updated successfully",
            data: session
        });
    } catch (error) {
        console.error("Error updating session:", error);
        
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
            message: "Failed to update session", 
            error: error.message 
        });
    }
});

// DELETE session
router.delete("/:id", async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        
        if (!session) {
            return res.status(404).json({ 
                success: false,
                message: "Session not found" 
            });
        }
        
        res.json({
            success: true,
            message: "Session deleted successfully",
            data: session
        });
    } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ 
            success: false,
            message: "Failed to delete session", 
            error: error.message 
        });
    }
});

module.exports = router;