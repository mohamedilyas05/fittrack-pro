import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await API.get(`/workouts/${id}`);
        setWorkout(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkout();
  }, [id]);

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
        Loading...
      </div>
    );
  }

  // stats
  const totalExercises = workout.exercises.length;

  const totalSets = workout.exercises.reduce(
    (acc, ex) => acc + ex.sets.length,
    0
  );

  const totalVolume = workout.exercises.reduce(
    (acc, ex) =>
      acc +
      ex.sets.reduce(
        (s, set) => s + (Number(set.reps) * Number(set.weight) || 0),
        0
      ),
    0
  );
  const deleteWorkout = async () => {
  try {
    await API.delete(`/workouts/${id}`);
    alert("Workout deleted");
    navigate("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#050814] text-white p-8">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 text-sm text-blue-400 hover:text-blue-300 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {workout.title}
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          {new Date(workout.createdAt).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

      </div>
          <div className="flex gap-3 mb-6">

  <button
    onClick={() => navigate(`/edit-workout/${id}`)}
    className="px-4 py-2 bg-blue-600 rounded-xl hover:scale-105 transition"
  >
    Edit
  </button>

  <button
    onClick={deleteWorkout}
    className="px-4 py-2 bg-red-600 rounded-xl hover:scale-105 transition"
  >
    Delete
  </button>

</div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm">Exercises</p>
          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            {totalExercises}
          </h2>
        </div>

        <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm">Total Sets</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {totalSets}
          </h2>
        </div>

        <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-5 rounded-2xl hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm">Total Volume</p>
          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            {totalVolume} kg
          </h2>
        </div>

      </div>
      

      {/* Exercises */}
      <div className="space-y-6">

        {workout.exercises.map((ex, i) => (
          <div
            key={i}
            className="bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:border-blue-500/40 transition"
          >

            {/* Exercise Name */}
            <h2 className="text-xl font-semibold text-white mb-4">
              {ex.name}
            </h2>

            {/* Table Header */}
            <div className="grid grid-cols-3 text-xs text-gray-400 mb-2">
              <span>Set</span>
              <span>Reps</span>
              <span>Weight</span>
            </div>

            {/* Sets */}
            {ex.sets.map((set, j) => (
              <div
                key={j}
                className="grid grid-cols-3 py-2 border-t border-white/5 text-gray-200"
              >
                <span>{j + 1}</span>
                <span>{set.reps}</span>
                <span>{set.weight} kg</span>
              </div>
            ))}

          </div>
        ))}

      </div>

    </div>
  );
}