const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes"); // ✅ ADD THIS

const protect = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes); // ✅ ADD THIS

// test route
app.get("/", (req, res) => {
  res.json({ message: "FitTrack Pro API is running 🚀" });
});

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "fittrack-pro-api" });
});

// protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected data 🔐",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});