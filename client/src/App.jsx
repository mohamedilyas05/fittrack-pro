import { Routes, Route } from "react-router-dom";

// Pages (we will create next)
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutDetails from "./pages/WorkoutDetails";
import EditWorkout from "./pages/EditWorkout";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./utils/ProtectedRoute";
import CaloriePlanner from "./pages/CaloriePlanner";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-workout"
  element={
    <ProtectedRoute>
      <CreateWorkout />
    </ProtectedRoute>
  }
/>
      <Route path="/workout/:id" element={<WorkoutDetails />} />
      <Route path="/edit-workout/:id" element={<EditWorkout />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/calorie-planner" element={<CaloriePlanner />} />
    </Routes>
  );
}

export default App;