// import React, { useState } from "react";

// const AddLeave = () => {
//   const { user } = useAuth();
//   const [leave, setLeave] = useState({
//     userId: user._id,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLeave((prevState) => ({ ...prevState, [name]: value }));
//   };
//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
//       <form>
//         <div className="flex flex-col space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Leave Type
//             </label>
//             <select
//               name="leaveType"
//               onChange={handleChange}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               required
//             >
//               <option value="">Select Leave Type</option>
//               <option value="Sick Leave">Sick Leave</option>
//               <option value="Vacation Leave">Vacation Leave</option>
//               <option value="Maternity Leave">Maternity Leave</option>
//               <option value="Paternity Leave">Paternity Leave</option>
//               <option value="Emergency Leave">Emergency Leave</option>
//             </select>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="reason"
//               placeholder="Reason"
//               onChange={handleChange}
//               className="w-full border border-gray-300"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
//   // <div>Add</div>;
// };

// export default AddLeave;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [leave, setLeave] = useState({
    userId: "", // Will be set to logged-in user's ID
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Fetch the logged-in user from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setLeave((prevLeave) => ({
        ...prevLeave,
        userId: user.id, // Set userId in leave request
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      alert("No user is logged in.");
      return;
    }

    // Retrieve existing leave requests from local storage
    const existingLeaves =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];

    // Add new leave request
    const newLeaveRequest = { id: Date.now(), ...leave };
    const updatedLeaves = [...existingLeaves, newLeaveRequest];

    // Save updated leave requests to local storage
    localStorage.setItem("leaveRequests", JSON.stringify(updatedLeaves));

    alert("Leave request submitted successfully!");
    navigate("/employee-dashboard/leaves");

    // Reset form
    setLeave({
      userId: loggedInUser.id, // Keep user ID after reset

      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
        <Link
          to="/employee-dashboard/leaves"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Return
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Reason"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
