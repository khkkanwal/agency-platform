import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const userData = {
      name,
      username,
      email,
      phone,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
      );

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 rounded-2xl shadow-lg w-full max-w-md bg-white">
        <form method="post" onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Create Account
          </h1>
          {/* name */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Username */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Email */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Phone */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
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
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          {/* Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 
            text-white font-medium py-2.5 rounded-lg 
            transition duration-200 shadow-sm"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
