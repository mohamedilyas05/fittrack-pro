const express = require("express");
const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
   updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const protect = require("../middleware/authMiddleware");

// create workout
router.post("/", protect, createWorkout);

// get workouts
router.get("/", protect, getWorkouts);
router.get("/:id", protect, getWorkoutById);
router.put("/:id", protect, updateWorkout);

router.delete("/:id", protect, deleteWorkout);
module.exports = router;