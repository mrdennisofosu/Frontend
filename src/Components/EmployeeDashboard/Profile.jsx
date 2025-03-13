// import React, { useState, useEffect } from "react";

// const Profile = () => {
//   const [loggedInEmployee, setLoggedInEmployee] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     const employees = JSON.parse(localStorage.getItem("employees")) || [];

//     if (loggedInUser) {
//       const employee = employees.find(
//         (emp) => emp.email === loggedInUser.email
//       );
//       if (employee) {
//         setLoggedInEmployee(employee);
//         setFormData(employee);
//       }
//     }
//   }, []);

//   const handleEdit = () => setEditMode(true);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     if (!loggedInEmployee) return;
//     const employees = JSON.parse(localStorage.getItem("employees")) || [];
//     const updatedEmployees = employees.map((emp) =>
//       emp.email === loggedInEmployee.email ? formData : emp
//     );

//     localStorage.setItem("employees", JSON.stringify(updatedEmployees));
//     setLoggedInEmployee(formData);
//     setEditMode(false);
//     alert("Profile updated successfully!");
//   };

//   if (!loggedInEmployee) {
//     return (
//       <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md text-center">
//         <p className="text-lg font-semibold text-gray-700">
//           No user is logged in.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto bg-gray-100 p-10 rounded-lg shadow-lg flex gap-10">
//       {/* Left Section: Image, Name, Contact Details */}
//       <div className="w-1/3 text-gray-900">
//         <div className="flex flex-col items-center">
//           {/* Profile Image */}
//           {loggedInEmployee.image ? (
//             <img
//               src={loggedInEmployee.image}
//               alt={loggedInEmployee.name}
//               className="w-40 h-40 object-cover rounded-full border-4 border-gray-300"
//             />
//           ) : (
//             <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//           <h1 className="text-2xl font-bold mt-4">{loggedInEmployee.name}</h1>
//         </div>
//       </div>

//       {/* Right Section: Details */}
//       <div className="w-2/3">
//         {/* Editable Info */}
//         {editMode ? (
//           <form className="space-y-3">
//             <label className="block font-semibold">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border p-2 rounded w-full mb-2"
//             />

//             <label className="block font-semibold">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               disabled
//               className="border p-2 rounded w-full mb-2 bg-gray-100"
//             />

//             <label className="block font-semibold">Employee ID:</label>
//             <input
//               type="text"
//               name="employeeId"
//               value={formData.employeeId}
//               disabled
//               className="border p-2 rounded w-full mb-2 bg-gray-100"
//             />

//             <label className="block font-semibold">DOB:</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="border p-2 rounded w-full mb-2"
//             />

//             <label className="block font-semibold">Gender:</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="border p-2 rounded w-full mb-2"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>

//             <label className="block font-semibold">Phone Number:</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="border p-2 rounded w-full mb-2"
//             />

//             <label className="block font-semibold">Role:</label>
//             <input
//               type="text"
//               name="role"
//               value={formData.role}
//               disabled
//               className="border p-2 rounded w-full mb-2 bg-gray-100"
//             />

//             <button
//               type="button"
//               onClick={() => setEditMode(false)}
//               className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSave}
//               className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Save Changes
//             </button>
//           </form>
//         ) : (
//           <>
//             <p className="text-lg font-semibold border-b-2 border-gray-300 pb-1">
//               Personal Information
//             </p>
//             <br />
//             <p>
//               <strong>Email:</strong> {loggedInEmployee.email}{" "}
//             </p>{" "}
//             <p>
//               <strong>Employee ID:</strong> {loggedInEmployee.employeeId}{" "}
//             </p>{" "}
//             <p>
//               <strong>DOB:</strong> {loggedInEmployee.dob}{" "}
//             </p>{" "}
//             <p>
//               <strong>Gender:</strong> {loggedInEmployee.gender}{" "}
//             </p>{" "}
//             <p>
//               <strong>Phone Number:</strong> {loggedInEmployee.phoneNumber}{" "}
//             </p>{" "}
//             <p>
//               <strong>Role:</strong> {loggedInEmployee.role}{" "}
//             </p>
//             <button
//               onClick={handleEdit}
//               className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             >
//               Edit
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";

const Profile = () => {
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    if (loggedInUser) {
      const employee = employees.find(
        (emp) => emp.email === loggedInUser.email
      );
      if (employee) {
        setLoggedInEmployee(employee);
      }
    }
  }, []);

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
    <div className="max-w-4xl mx-auto bg-gray-100 p-10 rounded-lg shadow-lg flex gap-10">
      {/* Left Section: Image, Name */}
      <div className="w-1/3 text-gray-900">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {loggedInEmployee.image ? (
            <img
              src={loggedInEmployee.image}
              alt={loggedInEmployee.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-gray-300"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <h1 className="text-2xl font-bold mt-4">{loggedInEmployee.name}</h1>
        </div>
      </div>

      {/* Right Section: Display-Only Details */}
      <div className="w-2/3">
        <p className="text-lg font-semibold border-b-2 border-gray-300 pb-1">
          Personal Information
        </p>
        <br />
        <p>
          <strong>Email:</strong> {loggedInEmployee.email}
        </p>
        <p>
          <strong>Employee ID:</strong> {loggedInEmployee.employeeId}
        </p>
        <p>
          <strong>DOB:</strong> {loggedInEmployee.dob}
        </p>
        <p>
          <strong>Gender:</strong> {loggedInEmployee.gender}
        </p>
        <p>
          <strong>Phone Number:</strong> {loggedInEmployee.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {loggedInEmployee.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
