const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  reps: Number,
  weight: Number,
});

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: [setSchema],
});

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Workout Session",
    },
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);