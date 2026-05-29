import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";


export default function Analytics() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/workouts");
        setWorkouts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // =========================
  // PROCESS DATA
  // =========================
const navigate = useNavigate();
  const processed = useMemo(() => {
    return workouts.map((w) => {
      const volume = w.exercises.reduce((acc, ex) => {
        return (
          acc +
          ex.sets.reduce((s, set) => {
            return s + (Number(set.reps) * Number(set.weight) || 0);
          }, 0)
        );
      }, 0);

      return {
        ...w,
        date: new Date(w.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        volume,
      };
    });
  }, [workouts]);

  // =========================
  // TOTALS
  // =========================

  const totalVolume = processed.reduce((a, b) => a + b.volume, 0);

  const avgVolume =
    processed.length > 0 ? (totalVolume / processed.length).toFixed(0) : 0;

  const maxWorkout = processed.reduce(
    (max, w) => (w.volume > (max?.volume || 0) ? w : max),
    null
  );

  const streak = processed.length;

  // =========================
  // 🧠 PR SYSTEM
  // =========================

  const getPRs = (data) => {
    const prs = {};

    data.forEach((w) => {
      w.exercises.forEach((ex) => {
        ex.sets.forEach((set) => {
          const weight = Number(set.weight) || 0;

          if (!prs[ex.name] || weight > prs[ex.name]) {
            prs[ex.name] = weight;
          }
        });
      });
    });

    return prs;
  };

  const detectPRs = (data, prs) => {
    const events = [];

    data.forEach((w) => {
      w.exercises.forEach((ex) => {
        ex.sets.forEach((set) => {
          const weight = Number(set.weight) || 0;

          if (weight === prs[ex.name]) {
            events.push({
              exercise: ex.name,
              weight,
              date: new Date(w.createdAt).toLocaleDateString(),
            });
          }
        });
      });
    });

    return events.slice(0, 5);
  };

  const prs = getPRs(processed);
  const prEvents = detectPRs(processed, prs);

  // =========================
  // RADIAL DATA
  // =========================

  const radialData = [
    {
      name: "Progress",
      value: Math.min(processed.length * 10, 100),
      fill: "#3b82f6",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-8">

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
  
  <div>
    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      Analytics Dashboard
    </h1>
    <p className="text-gray-400 mt-2">
      Performance, progress & strength tracking
    </p>
  </div>

  <button
    onClick={() => navigate("/dashboard")}
    className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg hover:bg-black/50 transition"
  >
    ← Back to Dashboard
  </button>

</div>
        
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Workouts</p>
          <h2 className="text-3xl font-bold">{processed.length}</h2>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Volume</p>
          <h2 className="text-3xl font-bold text-green-400">
            {totalVolume}
          </h2>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Avg Volume</p>
          <h2 className="text-3xl font-bold text-blue-400">
            {avgVolume}
          </h2>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Streak</p>
          <h2 className="text-3xl font-bold text-purple-400">
            {streak} days
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* AREA CHART */}
        <div className="bg-black/20 p-6 rounded-xl border border-white/10 md:col-span-2">
          <h2 className="text-gray-300 mb-4">Volume Flow</h2>

          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={processed}>
              <defs>
                <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#333" />
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                fill="url(#vol)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

       {/* RADIAL */}
<div className="bg-black/20 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center">

  <h2 className="text-gray-300 mb-4">Progress Score</h2>

  <ResponsiveContainer width="100%" height={220}>
    <RadialBarChart
      innerRadius="70%"
      outerRadius="100%"
      data={radialData}
      startAngle={90}
      endAngle={-270}
    >
      <RadialBar dataKey="value" cornerRadius={10} />

      {/* CENTER TEXT (PERCENTAGE) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white text-3xl font-bold"
      >
        {radialData[0]?.value || 0}%
      </text>
    </RadialBarChart>
  </ResponsiveContainer>

  {/* EXPLANATION */}
  <p className="text-sm text-gray-400 mt-2 text-center">
    Based on workout consistency and training activity
  </p>

</div>

      </div>

      {/* INSIGHTS */}
      <div className="mt-10 bg-black/20 p-6 rounded-xl border border-white/10">
        <h2 className="text-lg mb-4 text-gray-300">AI Insights</h2>

        <p className="text-gray-400">• Total workouts: {processed.length}</p>
        <p className="text-gray-400">• Total volume: {totalVolume} kg</p>
        <p className="text-gray-400">
          • Best workout: {maxWorkout?.title || "N/A"}
        </p>
      </div>

      {/* 🏆 PR LEADERBOARD */}
      <div className="mt-10 bg-black/20 p-6 rounded-xl border border-white/10">
        <h2 className="text-lg mb-4 text-yellow-400">
          🏆 Personal Records
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(prs).map(([exercise, weight]) => (
            <div
              key={exercise}
              className="p-4 bg-black/30 rounded-xl border border-white/10"
            >
              <p className="text-gray-400 text-sm">{exercise}</p>
              <h3 className="text-2xl font-bold text-yellow-400">
                {weight} kg
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 PR EVENTS */}
      <div className="mt-6 bg-black/20 p-6 rounded-xl border border-white/10">
        <h2 className="text-lg mb-4 text-red-400">
          🔥 Recent PR Moments
        </h2>

        <div className="space-y-2">
          {prEvents.length === 0 && (
            <p className="text-gray-500">No PRs yet — keep pushing 💪</p>
          )}

          {prEvents.map((p, i) => (
            <div
              key={i}
              className="flex justify-between bg-black/30 p-3 rounded-lg"
            >
              <span>
                {p.exercise} — {p.weight} kg
              </span>
              <span className="text-gray-400">{p.date}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}