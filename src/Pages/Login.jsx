import React, { useState } from "react";
import { getUsers } from "../Data/mockData.js";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = getUsers();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      if (foundUser.role === "admin") {
        navigate("/admin-dashboard");
        alert("Successfully logged in");
      } else {
        navigate("/employee-dashboard");
        alert("Successfully logged in");
      }
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="relative flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-800 to-green-400 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 flex flex-wrap gap-8 p-12 opacity-25">
        {/* Cluster of books at bottom-left */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-3">
          <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg"></div>
          <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg"></div>
          <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-1 shadow-lg"></div>
        </div>

        {/* Scattered books */}
        <div className="w-32 h-16 bg-white border-4 border-gray-500 rotate-6 shadow-lg absolute top-16 right-14"></div>
        <div className="w-32 h-16 bg-white border-4 border-gray-500 -rotate-3 shadow-lg absolute top-40 left-28"></div>

        {/* Pens */}
        <div className="w-1 h-24 bg-red-600 rotate-12 shadow-lg absolute top-20 left-20"></div>
        <div className="w-1 h-24 bg-blue-700 -rotate-6 shadow-lg absolute top-60 right-16"></div>

        {/* Human Stickers */}
        <div className="w-16 h-16 bg-yellow-500 rounded-full shadow-lg absolute top-12 left-40"></div>
        <div className="w-20 h-20 bg-green-500 rounded-full shadow-lg absolute bottom-10 right-16"></div>
        <div className="w-12 h-12 bg-purple-600 rounded-full shadow-lg absolute bottom-24 left-14"></div>
      </div>

      {/* App Title */}
      <h2 className="font-plus jakarta text-3xl text-white mb-6">
        Mojo Employee Management System
      </h2>

      {/* Login Form */}
      <div className="relative border shadow-lg p-6 w-80 bg-white z-10">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email..."
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="*********"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sky-800">
              Forgot password?
            </Link>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-sky-700 hover:bg-sky-900 text-white py-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
