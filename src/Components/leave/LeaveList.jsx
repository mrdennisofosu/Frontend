// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const LeaveList = () => {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [employeeId, setEmployeeId] = useState("");

//   useEffect(() => {
//     const fetchLeaves = () => {
//       const user = JSON.parse(localStorage.getItem("loggedInUser"));
//       setLoggedInUser(user);

//       const employees = JSON.parse(localStorage.getItem("employees")) || [];
//       if (user) {
//         const employee = employees.find((emp) => emp.email === user.email);
//         if (employee) {
//           setEmployeeId(employee.employeeId);
//         }
//       }

//       const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];

//       if (user) {
//         const userLeaves = allLeaves.filter(
//           (leave) => leave.userId === user.id
//         );
//         setLeaveRequests(userLeaves);
//       }
//     };

//     fetchLeaves();

//     // Listen for storage changes
//     window.addEventListener("storage", fetchLeaves);

//     return () => {
//       window.removeEventListener("storage", fetchLeaves);
//     };
//   }, []); // Removed `leaveRequests` dependency
//   // Run effect when leaveRequests change

//   return (
//     <div className="p-6">
//       <div className="text-center">
//         <h3 className="text-2xl font-bold">Manage Leaves</h3>
//       </div>
//       <div className="flex justify-between items-center my-4">
//         <input
//           type="text"
//           placeholder="Search By Leave Type"
//           className="px-4 py-1 border rounded"
//         />
//         <Link
//           to="/employee-dashboard/add-leaves"
//           className="px-4 py-1 bg-teal-600 rounded text-white"
//         >
//           Add New Leave
//         </Link>
//       </div>

//       <table className="w-full text-sm  text-left text-gray-500 mt-6">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
//           <tr>
//             <th className="px-6 py-3">Serial No.</th>
//             <th className="px-6 py-3">Employee Name</th>
//             <th className="px-6 py-3">Employee ID</th>
//             <th className="px-6 py-3">Leave Type</th>
//             <th className="px-6 py-3">From</th>
//             <th className="px-6 py-3">To</th>
//             <th className="px-6 py-3">Description</th>
//             <th className="px-6 py-3">Applied Date</th>
//             <th className="px-6 py-3">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaveRequests.length > 0 ? (
//             leaveRequests.map((leave, index) => (
//               <tr
//                 key={leave.id}
//                 className="bg-white border-b dark:bg-gray-200 dark:border-gray-700"
//               >
//                 <td className="px-4 py-3">{index + 1}</td>
//                 <td className="px-4 py-3">{leave.name}</td>
//                 <td className="px-4 py-3">
//                   {leave.employeeId || employeeId}
//                 </td>{" "}
//                 {/* Display Correct Employee ID */}
//                 <td className="px-4 py-3">{leave.leaveType}</td>
//                 <td className="px-4 py-3">{leave.startDate}</td>
//                 <td className="px-4 py-3">{leave.endDate}</td>
//                 <td className="px-4 py-3">{leave.reason}</td>
//                 <td className="px-4 py-3">
//                   {new Date(leave.id).toLocaleDateString()}
//                 </td>
//                 <td
//                   className={`px-4 py-3 font-semibold ${
//                     leave.status === "Approved"
//                       ? "text-green-600"
//                       : leave.status === "Rejected"
//                       ? "text-red-600"
//                       : "text-blue-600"
//                   }`}
//                 >
//                   {leave.status ? leave.status : "Pending"}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="text-center py-4">
//                 No leave requests found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LeaveList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // NEW: Search term state

  useEffect(() => {
    const fetchLeaves = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);

      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      if (user) {
        const employee = employees.find((emp) => emp.email === user.email);
        if (employee) {
          setEmployeeId(employee.employeeId);
        }
      }

      const allLeaves = JSON.parse(localStorage.getItem("leaveRequests")) || [];

      if (user) {
        const userLeaves = allLeaves.filter(
          (leave) => leave.userId === user.id
        );
        setLeaveRequests(userLeaves);
      }
    };

    fetchLeaves();

    // Listen for storage changes
    window.addEventListener("storage", fetchLeaves);

    return () => {
      window.removeEventListener("storage", fetchLeaves);
    };
  }, []);

  // Filter leave requests based on the search term
  const filteredLeaves = leaveRequests.filter((leave) =>
    leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      {/* Search Input and Add Button */}
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Leave Type"
          className="px-4 py-1 border rounded"
          value={searchTerm} // NEW: Controlled input
          onChange={(e) => setSearchTerm(e.target.value)} // NEW: Update search term
        />
        <Link
          to="/employee-dashboard/add-leaves"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
      </div>

      {/* Leave Requests Table */}
      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">Serial No.</th>
            <th className="px-6 py-3">Employee Name</th>
            <th className="px-6 py-3">Employee ID</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Applied Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave, index) => (
              <tr
                key={leave.id}
                className="bg-white border-b dark:bg-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{leave.name}</td>
                <td className="px-4 py-3">{leave.employeeId || employeeId}</td>
                <td className="px-4 py-3">{leave.leaveType}</td>
                <td className="px-4 py-3">{leave.startDate}</td>
                <td className="px-4 py-3">{leave.endDate}</td>
                <td className="px-4 py-3">{leave.reason}</td>
                <td className="px-4 py-3">
                  {new Date(leave.id).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {leave.status ? leave.status : "Pending"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No leave requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
