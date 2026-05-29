import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkout() {
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);
const navigate = useNavigate();
  // add exercise
  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        name: "",
        sets: [{ reps: "", weight: "" }],
      },
    ]);
  };

  // update exercise name
  const updateExerciseName = (value, index) => {
    const updated = [...exercises];
    updated[index].name = value;
    setExercises(updated);
  };

  // update sets
  const updateSet = (exIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exIndex].sets[setIndex][field] = value;
    setExercises(updated);
  };

  // add set
  const addSet = (exIndex) => {
    const updated = [...exercises];
    updated[exIndex].sets.push({ reps: "", weight: "" });
    setExercises(updated);
  };

  // save workout
  const saveWorkout = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.post("/workouts", {
  title,
  exercises,
});

    const data = await res.json();
alert("Workout Saved!");
console.log(data);

navigate("/dashboard");
  }  catch (err) {
  console.log("ERROR:", err);
  console.log("RESPONSE DATA:", err?.response?.data);
  console.log("STATUS:", err?.response?.status);

  alert(
    err?.response?.data?.message ||
    err?.message ||
    "Error saving workout"
  );
}
};
  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">

      {/* TOP HEADER */}
<div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold text-blue-500">
    Create Workout
  </h1>

  <button
    onClick={() => navigate("/dashboard")}
    className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg 
               hover:bg-black/50 transition text-sm"
  >
    ← Back
  </button>

</div>

      {/* title */}
      <input
        className="w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700"
        placeholder="Workout Title (Push Day, Leg Day...)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {exercises.length === 0 && (
  <div className="text-center text-gray-400 mb-6 border border-white/10 p-6 rounded-xl bg-black/20">
    Start by adding your first exercise 💪
  </div>
)}
      {/* exercises */}
      <div className="space-y-6">

        {exercises.map((ex, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-gray-800 p-4 rounded-2xl"
          >

            {/* exercise name */}
            <input
              className="w-full p-2 mb-4 rounded bg-[#0b1220] border border-gray-700"
              placeholder="Exercise Name"
              value={ex.name}
              onChange={(e) => updateExerciseName(e.target.value, i)}
            />

            {/* sets */}
            {ex.sets.map((set, j) => (
              <div key={j} className="flex gap-3 mb-2">

                <input
                  className="w-full p-2 rounded bg-[#0b1220] border border-gray-700"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) =>
                    updateSet(i, j, "reps", e.target.value)
                  }
                />

                <input
                  className="w-full p-2 rounded bg-[#0b1220] border border-gray-700"
                  placeholder="Weight"
                  value={set.weight}
                  onChange={(e) =>
                    updateSet(i, j, "weight", e.target.value)
                  }
                />

              </div>
            ))}

            <button
              onClick={() => addSet(i)}
              className="text-blue-400 text-sm mt-2"
            >
              + Add Set
            </button>

          </div>
        ))}

      </div>

      {/* buttons */}
      <div className="flex gap-4 mt-8">

        <button
          onClick={addExercise}
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          + Add Exercise
        </button>

        <button
          onClick={saveWorkout}
          className="bg-green-600 px-4 py-2 rounded-xl"
        >
          Save Workout
        </button>
        
      </div>

    </div>
  );
}