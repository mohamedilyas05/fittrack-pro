import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-white">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-3 rounded-xl bg-[#0b1220] border border-gray-700 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-3 rounded-xl bg-[#0b1220] border border-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-3 rounded-xl bg-[#0b1220] border border-gray-700 text-white"
        />

        <button
          onClick={registerHandler}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have account?{" "}
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}