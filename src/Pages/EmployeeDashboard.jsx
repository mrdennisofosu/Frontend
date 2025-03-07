import React, { useState, useEffect } from 'react'

const EmployeeDashboard = () => {
     const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div>
      <h1>Employee Dashboard</h1>
      {user ? (
        <h2>Welcome, {user.name}!</h2>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  )
}

export default EmployeeDashboard
