import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing departments or initialize an empty array
    const departments = JSON.parse(localStorage.getItem("departments")) || [];

    // Create a new department object
    const newDepartment = {
      id: departments.length + 1, // Convert to string
      dep_name: department.dep_name,
      description: department.description,
    };

    // Add the new department to the array
    departments.push(newDepartment);

    // Save updated list back to localStorage
    localStorage.setItem("departments", JSON.stringify(departments));

    // Reset input fields
    setDepartment({ dep_name: "", description: "" });

    // Show success alert
    alert("Department added successfully!");
    navigate("/admin-dashboard/departments");
  };

  return (
    <div className="max-w-3xl font-jakarta mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl   font-bold mb-6 ">Add Department</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Descrition"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
