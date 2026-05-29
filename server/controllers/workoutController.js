const Workout = require("../models/Workout");

// CREATE WORKOUT
const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      user: req.user._id,
      title: req.body.title,
      exercises: req.body.exercises,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Error creating workout",
      error: error.message,
    });
  }
};

// GET WORKOUTS (USER ONLY)
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching workouts",
      error: error.message,
    });
  }
};
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    // security check (only owner can view)
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching workout",
      error: error.message,
    });
  }
};
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    workout.title = req.body.title || workout.title;
    workout.exercises = req.body.exercises || workout.exercises;

    const updated = await workout.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await workout.deleteOne();

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};