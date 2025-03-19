import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch departments from local storage
    const storedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleView = (department) => {
    setSelectedDepartment(department);
    setFormData(department); // Populate form data for editing
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Update the department in local storage
    const updatedDepartments = departments.map((dep) =>
      dep.id === selectedDepartment.id ? formData : dep
    );
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    setDepartments(updatedDepartments);
    setSelectedDepartment(formData); // Update the selected department details
    setEditMode(false); // Disable edit mode
    alert("Department details updated successfully!");
  };

  return (
    <div className="max-w-4xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {/* Header with Department Details and Return Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Department Details</h2>
        <Link
          to="/admin-dashboard/departments"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>

      {/* List of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((department) => (
          <div
            key={department.id}
            className="border p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{department.dep_name}</h3>
              <p className="text-sm">Description: {department.description}</p>
              <button
                onClick={() => handleView(department)}
                className="mt-3 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Department Details */}
      {selectedDepartment && (
        <div className="mt-10 border p-6 rounded-md bg-gray-50 shadow-md">
          <h3 className="text-xl font-bold">
            {editMode ? "Edit Department Details" : "Detailed Information"}
          </h3>

          {editMode ? (
            <form>
              <p>
                <label className="block text-sm font-medium text-gray-700">
                  Department Name:
                </label>
                <input
                  type="text"
                  name="dep_name"
                  value={formData.dep_name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </p>
              <p className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  rows="4"
                />
              </p>
              <button
                type="button"
                onClick={handleSave}
                className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <p>Name: {selectedDepartment.dep_name}</p>
              <p>Description: {selectedDepartment.description}</p>
              <button
                onClick={handleEdit}
                className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedDepartment(null)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Close
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewDepartment;
