import { useState } from "react";
import { Link } from "react-router-dom";

export default function CaloriePlanner() {

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("Moderately Active");

  const [maintenance, setMaintenance] = useState(0);
  const [fatLoss, setFatLoss] = useState(0);
  const [weightGain, setWeightGain] = useState(0);

  const [goal, setGoal] = useState("Fat Loss");
  const [protein, setProtein] = useState(0);
const [carbs, setCarbs] = useState(0);
const [fats, setFats] = useState(0);
  const calculateCalories = () => {

    if (!age || !height || !weight) {
      alert("Please fill all fields");
      return;
    }

    let bmr = 0;

    if (gender === "Male") {
      bmr =
        10 * weight +
        6.25 * height -
        5 * age +
        5;
    } else {
      bmr =
        10 * weight +
        6.25 * height -
        5 * age -
        161;
    }

    const activityLevels = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
      Athlete: 1.9,
    };

    const maintenanceCalories =
      bmr * activityLevels[activity];

    setMaintenance(Math.round(maintenanceCalories));

    // Goal Logic
    if (goal === "Fat Loss") {
      setFatLoss(
        Math.round(maintenanceCalories - 500)
      );

      setWeightGain(0);
    }

    if (goal === "Maintain") {
      setFatLoss(0);
      setWeightGain(0);
    }

    if (goal === "Lean Bulk") {
      setWeightGain(
        Math.round(maintenanceCalories + 300)
      );

      setFatLoss(0);
    }

    if (goal === "Aggressive Bulk") {
      setWeightGain(
        Math.round(maintenanceCalories + 600)
      );

      setFatLoss(0);
    }
   let p = 0;
let f = 0;
let c = 0;

let targetCalories = maintenanceCalories;

if (goal === "Fat Loss") {
  targetCalories = maintenanceCalories - 500;
  p = weight * 2.2;
  f = weight * 0.8;
}

if (goal === "Maintain") {
  targetCalories = maintenanceCalories;
  p = weight * 1.8;
  f = weight * 0.9;
}

if (goal === "Lean Bulk") {
  targetCalories = maintenanceCalories + 300;
  p = weight * 2.0;
  f = weight * 1.0;
}

if (goal === "Aggressive Bulk") {
  targetCalories = maintenanceCalories + 600;
  p = weight * 2.5;
  f = weight * 1.1;
}

// carbs ALWAYS fill remaining calories
let remainingCalories =
  targetCalories - (p * 4 + f * 9);

let carbsCalc = remainingCalories / 4;

// safety clamp (very important)
const maxCarbs = weight * 5; // realistic upper limit

if (carbsCalc < 0) carbsCalc = 0;
if (carbsCalc > maxCarbs) carbsCalc = maxCarbs;

c = carbsCalc;

// safety check (prevents negative carbs)
if (c < 0) c = 0;

// set values
setProtein(Math.round(p));
setFats(Math.round(f));
setCarbs(Math.round(c));  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold mb-2">
            🔥 Calorie Planner
          </h1>

          <p className="text-gray-400">
            Calculate calories for fat loss, maintenance, and muscle gain.
          </p>
        </div>

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-xl border border-white/10"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Side Form */}

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Enter Your Details
          </h2>

          <div className="space-y-4">

            {/* Age */}
            <div>
              <label className="block mb-2 text-gray-300">
                Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
                placeholder="22"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 text-gray-300">
                Gender
              </label>

              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
                className="w-full bg-[#111827] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block mb-2 text-gray-300">
                Height (cm)
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) =>
                  setHeight(e.target.value)
                }
                placeholder="175"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2 text-gray-300">
                Weight (kg)
              </label>

              <input
                type="number"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value)
                }
                placeholder="72"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label className="block mb-2 text-gray-300">
                Activity Level
              </label>

              <select
                value={activity}
                onChange={(e) =>
                  setActivity(e.target.value)
                }
                className="w-full bg-[#111827] text-white border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Sedentary</option>
                <option>Lightly Active</option>
                <option>Moderately Active</option>
                <option>Very Active</option>
                <option>Athlete</option>
              </select>
            </div>

            {/* Goal Selection */}
            <div>
              <label className="block mb-4 text-gray-300">
                Select Goal
              </label>

              <div className="grid grid-cols-2 gap-4">

                {/* Fat Loss */}
                <div
                  onClick={() => setGoal("Fat Loss")}
                  className={`cursor-pointer rounded-2xl p-4 border transition
${goal === "Fat Loss"
  ? "border-blue-500 bg-blue-500/20 shadow-lg scale-105"
  : "border-white/10 bg-white/5 hover:border-blue-400/40"
}`}
                >
                  <div className="text-3xl mb-2">🔥</div>

                  <h3 className="font-semibold text-lg">
                    Fat Loss
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Reduce body fat with calorie deficit.
                  </p>
                </div>

                {/* Maintain */}
                <div
                  onClick={() => setGoal("Maintain")}
                  className={`cursor-pointer rounded-2xl p-4 border transition
${goal === "Maintain"
  ? "border-blue-500 bg-blue-500/20 shadow-lg scale-105"
  : "border-white/10 bg-white/5 hover:border-blue-400/40"
}`}
                >
                  <div className="text-3xl mb-2">⚖️</div>

                  <h3 className="font-semibold text-lg">
                    Maintain
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Maintain current body weight.
                  </p>
                </div>

                {/* Lean Bulk */}
                <div
                  onClick={() => setGoal("Lean Bulk")}
                  className={`cursor-pointer rounded-2xl p-4 border transition
${goal === "Lean Bulk"
  ? "border-blue-500 bg-blue-500/20 shadow-lg scale-105"
  : "border-white/10 bg-white/5 hover:border-blue-400/40"
}`}
                >
                  <div className="text-3xl mb-2">💪</div>

                  <h3 className="font-semibold text-lg">
                    Lean Bulk
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Build muscle with minimal fat gain.
                  </p>
                </div>

                {/* Aggressive Bulk */}
                <div
                  onClick={() => setGoal("Aggressive Bulk")}
                  className={`cursor-pointer rounded-2xl p-4 border transition
${goal === "Aggressive Bulk"
  ? "border-blue-500 bg-blue-500/20 shadow-lg scale-105"
  : "border-white/10 bg-white/5 hover:border-blue-400/40"
}`}
                >
                  <div className="text-3xl mb-2">🚀</div>

                  <h3 className="font-semibold text-lg">
                    Aggressive Bulk
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Faster weight gain with higher surplus.
                  </p>
                </div>

              </div>
            </div>

            {/* Button */}
            <button
              onClick={calculateCalories}
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold mt-4"
            >
              Calculate Calories
            </button>

          </div>
        </div>
  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 space-y-3">

  <h3 className="text-blue-400 font-semibold text-lg">
    Smart Insight
  </h3>

  <p className="text-gray-300 text-sm leading-relaxed">
    {goal === "Fat Loss" && "Focus on high protein intake and maintain a consistent calorie deficit for sustainable fat loss."}
    {goal === "Maintain" && "Maintain balanced nutrition and stay consistent with your daily activity levels."}
    {goal === "Lean Bulk" && "Use a small calorie surplus to build lean muscle while minimizing fat gain."}
    {goal === "Aggressive Bulk" && "Higher calorie surplus for faster muscle and strength gains, expect some fat gain."}
  </p>

  {/* 🔥 MEAL SPLIT GENERATOR */}
    {maintenance > 0 && (
    <div className="border-t border-blue-500/20 pt-4 space-y-2">

      <h4 className="text-white font-semibold">
        Meal Split Generator
      </h4>

      <p className="text-gray-400 text-sm">
        Suggested daily calorie distribution
      </p>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Breakfast</span>
          <span className="text-blue-400 font-semibold">
            {Math.round(maintenance * 0.3)} kcal
          </span>
        </div>

        <div className="flex justify-between">
          <span>Lunch</span>
          <span className="text-green-400 font-semibold">
            {Math.round(maintenance * 0.35)} kcal
          </span>
        </div>

        <div className="flex justify-between">
          <span>Dinner</span>
          <span className="text-yellow-400 font-semibold">
            {Math.round(maintenance * 0.25)} kcal
          </span>
        </div>

        <div className="flex justify-between">
          <span>Snacks</span>
          <span className="text-purple-400 font-semibold">
            {Math.round(maintenance * 0.1)} kcal
          </span>
        </div>

      </div>

    </div>
  )}
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
    <h3 className="text-white font-semibold">
      🍽️ Sample Meal Plan
    </h3>

    {maintenance > 0 ? (
      <div className="text-sm text-gray-300 space-y-1">
        <p>Breakfast: Oats + Eggs + Banana</p>
        <p>Lunch: Rice + Chicken / Paneer + Veggies</p>
        <p>Dinner: Roti + Protein + Salad</p>
        <p>Snack: Fruits + Nuts / Protein shake</p>
      </div>
    ) : (
      <p className="text-gray-500 text-sm">
        Calculate calories to see meal plan
      </p>
    )}
  </div>

  {/* 2. INDIAN FOOD LIST */}
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
    <h3 className="text-white font-semibold">
      🛒 Indian Food Choices
    </h3>

    <div className="text-sm text-gray-300 space-y-1">
      <p><span className="text-blue-400">Protein:</span> Eggs, Chicken, Paneer</p>
      <p><span className="text-green-400">Carbs:</span> Rice, Roti, Oats</p>
      <p><span className="text-yellow-400">Fats:</span> Ghee, Peanuts, Almonds</p>
    </div>
  </div>

  {/* 3. DO & DON'T */}
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
    <h3 className="text-white font-semibold">
      ⚖️ Do & Don’t
    </h3>

    {goal === "Fat Loss" && (
      <ul className="text-sm text-gray-300 space-y-1">
        <li>✔ Eat high protein meals</li>
        <li>✔ Walk daily</li>
        <li>✖ Avoid sugary drinks</li>
        <li>✖ Avoid junk food</li>
      </ul>
    )}

    {goal === "Lean Bulk" && (
      <ul className="text-sm text-gray-300 space-y-1">
        <li>✔ Small calorie surplus</li>
        <li>✔ Strength training</li>
        <li>✖ Overeating junk food</li>
      </ul>
    )}

    {goal === "Aggressive Bulk" && (
      <ul className="text-sm text-gray-300 space-y-1">
        <li>✔ Eat calorie surplus</li>
        <li>✔ Heavy lifting</li>
        <li>✖ Skipping meals</li>
      </ul>
    )}

    {goal === "Maintain" && (
      <ul className="text-sm text-gray-300 space-y-1">
        <li>✔ Balanced diet</li>
        <li>✔ Consistent activity</li>
        <li>✖ Overeating weekends</li>
      </ul>
    )}
  </div>

  {/* 4. REPLACEMENT FOOD SWAPS */}
  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
    <h3 className="text-white font-semibold">
      🥗 Smart Food Swaps
    </h3>

    <div className="text-sm text-gray-300 space-y-1">
      <p>🍔 Burger → Chicken sandwich</p>
      <p>🥤 Cola → Water / Diet soda</p>
      <p>🍟 Fries → Roasted potatoes</p>
      <p>🍩 Sweets → Fruits / dark chocolate</p>
    </div>
  </div>

</div>
<div className="bg-white/5 border border-white/10 rounded-2xl p-4">
  <h3 className="text-white font-semibold mb-3">
    Goal Status
  </h3>

  <div className="space-y-2 text-sm">
    <p className="text-gray-300">
      Current Goal:
      <span className="text-blue-400 font-semibold ml-2">{goal}</span>
    </p>

    <p className="text-gray-300">
      Phase:
      <span className="text-white ml-2">
        {goal === "Fat Loss" && "Cutting Phase"}
        {goal === "Maintain" && "Maintenance Phase"}
        {goal === "Lean Bulk" && "Lean Bulk Phase"}
        {goal === "Aggressive Bulk" && "Bulking Phase"}
      </span>
    </p>
  </div>
</div>
<div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
  <h3 className="text-green-400 font-semibold mb-2">
    Quick Tips
  </h3>

  <ul className="text-gray-300 text-sm space-y-1">
    {goal === "Fat Loss" && (
      <>
        <li>• Eat high protein meals</li>
        <li>• Walk 8k–10k steps daily</li>
        <li>• Avoid liquid calories</li>
      </>
    )}

    {goal === "Lean Bulk" && (
      <>
        <li>• Increase protein intake</li>
        <li>• Add progressive overload</li>
        <li>• Sleep 7–8 hours</li>
      </>
    )}

    {goal === "Aggressive Bulk" && (
      <>
        <li>• Track weight weekly</li>
        <li>• Expect some fat gain</li>
        <li>• Train heavy compound lifts</li>
      </>
    )}

    {goal === "Maintain" && (
      <>
        <li>• Keep activity stable</li>
        <li>• Balanced diet daily</li>
        <li>• Avoid overeating weekends</li>
      </>
    )}
  </ul>
</div>

        {/* Results */}
        <div className="space-y-6">

          {/* Maintenance */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

            <h3 className="text-xl font-semibold mb-2">
              Maintenance Calories
            </h3>

            <p className="text-4xl font-bold text-blue-400">
              {maintenance} kcal
            </p>

            <p className="text-gray-400 mt-2">
              Calories needed to maintain your current weight.
            </p>
          </div>

          {/* Fat Loss */}
          {goal === "Fat Loss" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-2">
                Fat Loss Calories
              </h3>

              <p className="text-3xl font-bold text-red-400">
                {fatLoss} kcal
              </p>

              <p className="text-gray-400 mt-2">
                ≈ 0.5kg loss/week
              </p>

              <p className="text-gray-500">
                ≈ 2kg/month
              </p>
            </div>
          )}

          {/* Maintain */}
          {goal === "Maintain" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-2">
                Maintenance Goal
              </h3>

              <p className="text-3xl font-bold text-yellow-400">
                {maintenance} kcal
              </p>

              <p className="text-gray-400 mt-2">
                Maintain your current physique.
              </p>
            </div>
          )}

          {/* Lean Bulk */}
          {goal === "Lean Bulk" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-2">
                Lean Bulk Calories
              </h3>

              <p className="text-3xl font-bold text-green-400">
                {weightGain} kcal
              </p>

              <p className="text-gray-400 mt-2">
                ≈ 0.25kg gain/week
              </p>

              <p className="text-gray-500">
                Mostly muscle-focused gain
              </p>
            </div>
          )}

          {/* Aggressive Bulk */}
          {goal === "Aggressive Bulk" && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-2">
                Aggressive Bulk Calories
              </h3>

              <p className="text-3xl font-bold text-purple-400">
                {weightGain} kcal
              </p>

              <p className="text-gray-400 mt-2">
                Faster size and strength gain.
              </p>

              <p className="text-gray-500">
                Higher fat gain possible.
              </p>
            </div>
          )}
          {/* Macros */}
<div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">

  <h3 className="text-xl font-semibold mb-4">
    Daily Macros
  </h3>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span className="text-gray-400">Protein</span>
      <span className="text-blue-400 font-bold">{protein} g</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Carbs</span>
      <span className="text-green-400 font-bold">{carbs} g</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-400">Fats</span>
      <span className="text-yellow-400 font-bold">{fats} g</span>
    </div>

  </div>
</div>

        </div>
      </div>
    </div>
  );
}