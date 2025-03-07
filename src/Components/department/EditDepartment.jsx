import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams(); // Get department ID from URL
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  useEffect(() => {
    // Retrieve departments from localStorage
    const departments = JSON.parse(localStorage.getItem("departments")) || [];

    console.log("Departments from localStorage:", departments);
    console.log("Editing Department with ID:", id);

    // Ensure ID type matches (convert to string or number)
    const selectedDepartment = departments.find(
      (dep) => String(dep._id) === String(id)
    );

    if (selectedDepartment) {
      setDepartment(selectedDepartment);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let departments = JSON.parse(localStorage.getItem("departments")) || [];

    console.log("Before Update:", departments);

    // Update only the department with the matching `_id`
    const updatedDepartments = departments.map((dep) =>
      String(dep._id) === String(id)
        ? {
            ...dep,
            dep_name: department.dep_name,
            description: department.description,
          }
        : dep
    );

    console.log("After Update:", updatedDepartments);

    // Save updated list to localStorage
    localStorage.setItem("departments", JSON.stringify(updatedDepartments));

    alert("Department updated successfully!");
    navigate("/admin-dashboard/departments");
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Edit Department</h2>

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
          className="w-full mt-6 bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
        >
          Edit Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
