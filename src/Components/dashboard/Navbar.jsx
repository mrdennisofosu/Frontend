import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve logged-in user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("loggedInUser");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center text-white justify-between h-16 bg-gradient-to-r from-teal-800 to-gray-700 px-6 shadow-md">
      <p className="text-lg font-medium tracking-wide">Welcome, {user?.name}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
