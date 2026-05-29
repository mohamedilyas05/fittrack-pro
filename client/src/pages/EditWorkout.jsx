import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditWorkout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await API.get(`/workouts/${id}`);
        setTitle(res.data.title);
        setExercises(res.data.exercises);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkout();
  }, [id]);

  // update exercise name
  const updateExerciseName = (value, i) => {
    const updated = [...exercises];
    updated[i].name = value;
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

  // add exercise
  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: [{ reps: "", weight: "" }] },
    ]);
  };

  // remove exercise
  const removeExercise = (index) => {
    const updated = [...exercises];
    updated.splice(index, 1);
    setExercises(updated);
  };

  // save
  const updateWorkout = async () => {
    try {
      await API.put(`/workouts/${id}`, {
        title,
        exercises,
      });

      alert("Workout updated");
      navigate(`/workout/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">

      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        Edit Workout
      </h1>

      {/* Title */}
      <input
        className="w-full p-3 mb-6 bg-gray-800 rounded-xl"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Exercises */}
      <div className="space-y-6">

        {exercises.map((ex, i) => (
          <div
            key={i}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >

            {/* Exercise Name */}
            <input
              className="w-full p-2 mb-3 bg-gray-800 rounded"
              value={ex.name}
              onChange={(e) => updateExerciseName(e.target.value, i)}
            />

            {/* Sets */}
            {ex.sets.map((set, j) => (
              <div key={j} className="flex gap-3 mb-2">

                <input
                  className="w-full p-2 bg-gray-800 rounded"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) =>
                    updateSet(i, j, "reps", e.target.value)
                  }
                />

                <input
                  className="w-full p-2 bg-gray-800 rounded"
                  placeholder="Weight"
                  value={set.weight}
                  onChange={(e) =>
                    updateSet(i, j, "weight", e.target.value)
                  }
                />

              </div>
            ))}

            <div className="flex gap-3 mt-3">

              <button
                onClick={() => addSet(i)}
                className="text-blue-400"
              >
                + Add Set
              </button>

              <button
                onClick={() => removeExercise(i)}
                className="text-red-400"
              >
                Remove Exercise
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">

        <button
          onClick={addExercise}
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          + Add Exercise
        </button>

        <button
          onClick={updateWorkout}
          className="bg-green-600 px-4 py-2 rounded-xl"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}