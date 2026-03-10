const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

// CORS configuration
const parseOrigins = (value) =>
    (value || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

const configuredOrigins = [
    ...parseOrigins(process.env.FRONTEND_URL),
    ...parseOrigins(process.env.FRONTEND_URLS),
];

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? configuredOrigins
        : ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow non-browser requests (health checks, curl, server-to-server)
        if (!origin) return callback(null, true);

        const isConfiguredOrigin = allowedOrigins.includes(origin);
        const isVercelPreview = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

        if (isConfiguredOrigin || isVercelPreview) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("MentorConnect API is running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/mentors", require("./routes/mentorRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
