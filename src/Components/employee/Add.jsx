import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../Utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
const Add = () => {
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
    salary: "",
    password: "",
    role: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch stored departments from localStorage
    const storedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value, // Handle image separately
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing employees or initialize an empty array
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

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
      salary: formData.salary,
      password: formData.password,
      role: formData.role,
      image: formData.image ? URL.createObjectURL(formData.image) : null, // Convert file to URL
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
      salary: "",
      password: "",
      role: "",
      image: null,
    });

    // Show success alert
    alert("Employee added successfully!");
    navigate("/admin-dashboard/employees");
  };
  // const Add = () => {
  //   const [departments, setDepartments] = useState([]);
  //   const [formData, setFormData] = useState({});

  //   useEffect(() => {
  //     const storedDepartments =
  //       JSON.parse(localStorage.getItem("departments")) || [];
  //     setDepartments(storedDepartments);

  //     const getDepartments = () => {
  //       const response = fetchDepartments(); // No need for async/await since it's synchronous

  //       if (response.success) {
  //         setDepartments(response.data); // Use response.data instead of the entire object
  //       } else {
  //         console.error(response.error); // Handle potential errors
  //       }
  //     };

  //     getDepartments();
  //   }, []);

  //   const handleChange = (e) => {
  //     const { name, value, files } = e.targer;
  //     if (name === "image") {
  //       setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  //     } else {
  //       setFormData((prevData) => ({ ...prevData, [name]: value }));
  //     }
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     const formDataObj = new FormData();
  //     object.keys(formData).forEach((key) => {
  //       formDataObj.append(key, formData[key]);
  //     });

  //     // Get existing employees or initialize an empty array
  //     const employees = JSON.parse(localStorage.getItem("employees")) || [];
  //     formDataObj;
  //     // Create a new employee object
  //     const newEmployee = {
  //       id: employees.length + 1, // Generate unique ID
  //       name: employees.name,
  //       email: employees.email,
  //       employeeId: employees.employeeId,
  //       dob: employees.dob,
  //       gender: employees.gender,
  //       maritalStatus: employees.maritalStatus,
  //       designation: employees.designation,
  //       department: employees.department,
  //       salary: employees.salary,
  //       password: employees.password,
  //       role: employees.role,
  //       image: employees.image, // Assuming file is handled properly
  //     };

  //     // Add the new employee to the array
  //     employees.push(newEmployee);

  //     // Save updated list back to localStorage
  //     localStorage.setItem("employees", JSON.stringify(employees));

  //     // Reset input fields
  //     employees({
  //       name: "",
  //       email: "",
  //       employeeId: "",
  //       dob: "",
  //       gender: "",
  //       maritalStatus: "",
  //       designation: "",
  //       department: "",
  //       salary: "",
  //       password: "",
  //       role: "",
  //       image: "",
  //     });

  //     // Show success alert
  //     alert("Employee added successfully!");
  //     navigate("/admin-dashboard/employees"); // Redirect to employee list
  //   };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
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
              onchange={handleChange}
              placeholder="Insert Name..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/*Email*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onchange={handleChange}
              placeholder="Insert Email..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/*Employee ID*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              onchange={handleChange}
              placeholder="Employee ID..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/*Date of birth*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              onchange={handleChange}
              placeholder="DOB"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/*Gender*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              onchange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/*Marital Status*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onchange={handleChange}
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

          {/*Designation*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              onchange={handleChange}
              placeholder="Designation..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/*Department*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              onchange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name} {/* Corrected: Render the department name */}
                </option>
              ))}
            </select>
          </div>

          {/*Salary*/}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              onchange={handleChange}
              placeholder="Salary..."
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/*Password*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*******"
              onchange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* role*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              onchange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="">Admin</option>
              <option value="">Employee</option>
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
                onchange={handleChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
        {/* submit button */}

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md uppercase"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};
export default Add;
