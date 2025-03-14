import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    phoneNumber: "",
    password: "",
    role: "",
    image: null,
  });

  useEffect(() => {
    // Fetch stored departments from localStorage
    const storedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const base64 = await convertToBase64(file);

      // Save to localStorage
      localStorage.setItem("uploadedImage", base64);

      setFormData((prevData) => ({
        ...prevData,
        image: base64, // Store Base64 image in state
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Update other input fields
      }));
    }
  };

  // Convert image to Base64 function
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Check for duplicate Employee ID
    if (employees.some((emp) => emp.employeeId === formData.employeeId)) {
      alert("Employee ID already exists. Please use a unique ID.");
      return;
    }

    // Create a new employee object
    const newEmployee = {
      id: employees.length + 1,
      name: formData.name,
      email: formData.email,
      employeeId: formData.employeeId,
      dob: formData.dob,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      designation: formData.designation,
      department: formData.department,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
      image: formData.image,
    };

    // Add the new employee to the array
    employees.push(newEmployee);

    // Save updated list back to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Reset input fields
    setFormData({
      name: "",
      email: "",
      employeeId: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      designation: "",
      department: "",
      phoneNumber: "",
      password: "",
      role: "",
      image: null,
    });

    // Show success alert
    alert("Employee added successfully!");
    navigate("/admin-dashboard/employees");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Add New Employee</h2>
        <Link
          to="/admin-dashboard/employees"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Insert Name..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Insert Email..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Employee ID..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              placeholder="Marital Status"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="separated">Separated</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*********"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              placeholder="Role"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          {/* upload image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <label className="mt-1 flex items-center justify-between px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-300">
              <span>Choose File</span>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 rounded-md uppercase"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
