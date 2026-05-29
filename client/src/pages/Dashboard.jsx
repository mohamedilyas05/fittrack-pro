import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const isNewUser = workouts.length === 0;
  useEffect(() => {
  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/workouts");
      setWorkouts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkouts();
}, []);
  // logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // stats
  const totalWorkouts = workouts.length;

  const totalVolume = workouts.reduce((total, w) => {
    return (
      total +
      w.exercises.reduce((exTotal, ex) => {
        return (
          exTotal +
          ex.sets.reduce((setTotal, s) => {
            return setTotal + (Number(s.reps) * Number(s.weight) || 0);
          }, 0)
        );
      }, 0)
    );
  }, 0);
if (loading) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-lg">
        Loading your fitness data...
      </div>
    </div>
  );
}
  return (
    <div className="flex min-h-screen bg-[#0b1220] text-white relative">
      <button
  onClick={() => setShowSidebar(true)}
  className="md:hidden fixed top-5 left-5 z-50 bg-black/40 p-2 rounded-lg"
>
  ☰
</button>
      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
>
  Logout
</button>
{showAbout && (
  <div
    onClick={() => setShowAbout(false)}
    className="fixed inset-0 bg-black/50 z-40"
  />
)}
      {/* Sidebar */}
     <div className={`fixed md:static z-50 h-full w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6
  transform transition-transform duration-300
  ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
`}>
        <h1 className="text-2xl font-bold text-blue-500 mb-8">
          FitTrack Pro
        </h1>

        <div className="space-y-4 text-gray-300">
          <button
  onClick={() => setShowSidebar(false)}
  className="md:hidden text-white mb-6"
>
  ✕ Close
</button>
       
          <p className="text-white font-semibold">
            Dashboard
          </p>

          <button
            onClick={() => navigate("/create-workout")}
            className="block hover:text-blue-400"
          >
            Create Workout
          </button>
          <button
  onClick={() => navigate("/analytics")}
  className="block hover:text-blue-400"
>
  Analytics
</button>
<button
  onClick={() => navigate("/calorie-planner")}
  className="block hover:text-blue-400 transition"
>
Calorie Planner
</button>
<button
  onClick={() => setShowAbout(true)}
  className="text-sm text-gray-300 hover:text-white"
>
  About
</button>

        </div>
      </div>
      {/* ABOUT SLIDE BAR */}
<div
  className={`fixed top-0 right-0 h-full w-80 bg-[#111827] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-50 ${
    showAbout ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-6">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-blue-400">About Project</h2>

      <button
        onClick={() => setShowAbout(false)}
        className="text-gray-400 hover:text-white"
      >
        ✕
      </button>
    </div>

    {/* Content */}
    <div className="space-y-4 text-gray-300">

      <p className="text-sm leading-relaxed">
  FitTrack Pro is a science-based fitness calculator designed to help you
  understand your daily calorie needs, macronutrient balance, and body
  transformation goals. Whether your aim is fat loss, maintenance, or muscle
  gain, the system adapts your nutrition plan based on your age, weight,
  height, activity level, and selected goal.

</p>

      <div className="bg-black/30 p-3 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">Created by</p>
        <p className="text-lg font-bold text-white">Mohamed Ilyas</p>
      </div>
       {/* CONTACT */}
<div className="bg-black/30 p-3 rounded-lg border border-gray-700">
  <p className="text-sm text-gray-400">Contact</p>

  <p className="text-sm mt-1">
    📧 mohamedilyas0005@gmail.com
  </p>

  <a
    href="mailto:mohamedilyas0005@gmail.com"
    className="text-blue-400 text-sm hover:underline"
  >
    Send Email
  </a>
</div>

<div className="bg-black/30 p-3 rounded-lg border border-gray-700">
  <p className="text-sm text-gray-400">GitHub</p>

  <a
    href="https://github.com/mohamedilyas05"
    target="_blank"
    rel="noreferrer"
    className="text-blue-400 text-sm hover:underline"
  >
    github.com/mohamedilyas05
  </a>
</div>
      <div className="bg-black/30 p-3 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">Stack</p>
        <p className="text-sm">MERN (MongoDB, Express, React, Node.js)</p>
      </div>

      <div className="bg-black/30 p-3 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">Version</p>
        <p className="text-sm">FitTrack Pro v1.0</p>
      </div>

    </div>
  </div>
</div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h2 className="text-3xl font-semibold mb-6 ml-6">
  {isNewUser ? "Welcome 👋" : "Welcome Back 👋"}
</h2>

{/* Cards */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Total Workouts */}
  <div className="group bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">

    <p className="text-gray-400 text-sm">
      Total Workouts
    </p>

    <h3 className="text-4xl font-bold mt-2 text-white group-hover:text-blue-400 transition">
      {totalWorkouts}
    </h3>

    <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
    </div>

  </div>

  {/* Total Volume */}
  <div className="group bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">

    <p className="text-gray-400 text-sm">
      Total Volume
    </p>

    <h3 className="text-4xl font-bold mt-2 text-white group-hover:text-green-400 transition">
      {totalVolume} <span className="text-lg text-gray-400">kg</span>
    </h3>

    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      Tracking strength progression
    </div>

  </div>

  {/* Latest Workout */}
  <div className="group bg-black/20 backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">

    <p className="text-gray-400 text-sm">
      Latest Workout
    </p>

    <h3 className="text-xl font-bold mt-2 text-white group-hover:text-purple-400 transition">
      {workouts[0]?.title || "No workouts yet"}
    </h3>

    <p className="text-xs text-gray-500 mt-3">
      {workouts.length > 0
        ? "Keep building consistency 🔥"
        : "Start your first workout today"}
    </p>

  </div>

</div>
        {/* Recent Workouts */}
        <div className="mt-10">

          <h2 className="text-xl font-bold mb-4">
            Recent Workouts
          </h2>

          {workouts.length === 0 ? (
            <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl text-gray-400">
              No workouts created yet
            </div>
          ) : (
            <div className="space-y-3">

              {workouts.length === 0 ? (
  <div className="text-center text-gray-400 p-10 border border-white/10 rounded-xl bg-black/20">
    <p className="text-lg">No workouts yet</p>
    <p className="text-sm mt-2">
      Create your first workout to start tracking 💪
    </p>
  </div>
) : (
  workouts.map((w) => (
    <div
      key={w._id}
      onClick={() => navigate(`/workout/${w._id}`)}
      className="bg-[#111827] border border-gray-800 p-4 rounded-xl cursor-pointer hover:bg-[#1a2233] transition"
    >
      <h3 className="font-semibold text-blue-400">
        {w.title}
      </h3>

      <p className="text-sm text-gray-400">
        {w.exercises.length} exercises
      </p>
    </div>
  ))
)}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}