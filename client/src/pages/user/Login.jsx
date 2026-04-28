import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier, // ✅ correct
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("USER DATA:", res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 rounded-2xl shadow-lg w-full max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Login
          </h1>

          {/* Identifier */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email or Username
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter your email or username"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="mr-2"
              />
              Remember me
            </label>

            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg 
            transition duration-200 shadow-sm"
            type="submit"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
