// import React, { useState, useEffect } from 'react'

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//      useEffect(() => {
//         // Retrieve logged-in user from localStorage
//         const storedUser = localStorage.getItem("loggedInUser");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         }
//       }, []);
//   return (
//     <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
//           <p>Welcome {user?.name}</p>
//           <button className="px-4 py-1 bg-teal-700 hover:bg-teal-900 rounded">Logout</button>
//     </div>
//   )
// }

// export default Navbar

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
    <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
      <p>Welcome {user?.name}</p>
      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-teal-700 hover:bg-teal-900 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
