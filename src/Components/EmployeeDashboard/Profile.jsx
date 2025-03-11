import React, { useState, useEffect } from "react";

const Profile = () => {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Retrieve the logged-in user details
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (loggedInUser) {
      // Find the logged-in employee in the stored employee list
      const employee = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee) {
        setLoggedInEmployee(employee);
        setFormData(employee);
      }
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!loggedInEmployee) return;

    // Update the employee in local storage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedEmployees = employees.map((emp) =>
      emp.email === loggedInEmployee.email ? formData : emp
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setLoggedInEmployee(formData);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  if (!loggedInEmployee) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold text-gray-700">
          No user is logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="flex px-10 py-10">
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
          My Profile
        </h2>

        <div className="flex items-center gap-6 mb-6">
          {/* User Image */}
          {loggedInEmployee.image ? (
            <img
              src={loggedInEmployee.image}
              alt={loggedInEmployee.name}
              className="w-60 h-60 object-cover rounded-full border-2 border-gray-300"
            />
          ) : (
            <div className="w-60 h-60 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
              No Image
            </div>
          )}

          {/* User Details */}
          <div className="flex-1">
            {editMode ? (
              <form>
                <label className="block font-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                />

                <label className="block font-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="border p-2 rounded w-full mb-2 bg-gray-100"
                />

                <label className="block font-semibold">Employee ID:</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  disabled
                  className="border p-2 rounded w-full mb-2 bg-gray-100"
                />

                <label className="block font-semibold">DOB:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                />

                <label className="block font-semibold">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <label className="block font-semibold">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                />

                <label className="block font-semibold">Role:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  disabled
                  className="border p-2 rounded w-full mb-2 bg-gray-100"
                />

                <button
                  type="button"
                  onClick={handleSave}
                  className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  Name:{" "}
                  <span className="font-normal">{loggedInEmployee.name}</span>
                </p>
                <p className="text-lg font-semibold">
                  Email:{" "}
                  <span className="font-normal">{loggedInEmployee.email}</span>
                </p>
                <p className="text-lg font-semibold">
                  Employee ID:{" "}
                  <span className="font-normal">
                    {loggedInEmployee.employeeId}
                  </span>
                </p>
                <p className="text-lg font-semibold">
                  DOB:{" "}
                  <span className="font-normal">{loggedInEmployee.dob}</span>
                </p>
                <p className="text-lg font-semibold">
                  Gender:{" "}
                  <span className="font-normal">{loggedInEmployee.gender}</span>
                </p>
                <p className="text-lg font-semibold">
                  Phone Number:{" "}
                  <span className="font-normal">
                    {loggedInEmployee.phoneNumber}
                  </span>
                </p>
                <p className="text-lg font-semibold">
                  Role:{" "}
                  <span className="font-normal">{loggedInEmployee.role}</span>
                </p>

                <button
                  onClick={handleEdit}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
